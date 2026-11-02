import http from 'node:http';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { readFile, mkdir, writeFile, realpath } from 'node:fs/promises';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { parseArgs, styleText } from 'node:util';
import { cpus, platform, arch } from 'node:os';
import puppeteer from 'puppeteer-core';
import { cases, groups } from './benchmark-workloads.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Balance process slots and version orders over four samples.
const SAMPLE_CYCLE = 4;

export function sourceRoot(value) {
  if (/^\d+\.\d+\.\d+(?:-[\w.-]+)?$/.test(value)) {
    // A published version is installed once into the ignored results folder, so a run never reads the network again.
    const prefix = resolve(root, 'tests/results', `baseline-${value}`);
    const dir = resolve(prefix, 'node_modules/animejs/dist/modules');
    if (!existsSync(dir)) execFileSync('npm', ['install', '--prefix', prefix, `animejs@${value}`, '--no-save', '--no-package-lock', '--no-audit', '--no-fund', '--silent'], { stdio: 'inherit' });
    return dir;
  }
  return resolve(value);
}

export function options(args) {
  const { values } = parseArgs({ args, options: {
    baseline: { type: 'string', default: '4.5.0' },
    candidate: { type: 'string', default: './dist/modules' },
    cases: { type: 'string', default: 'matrix,features' },
    samples: { type: 'string', default: '8' },
    'warmup-constructions': { type: 'string', default: '8' },
    'setup-runs': { type: 'string', default: '8' },
    'fixed-setup-runs': { type: 'boolean', default: false },
    'update-runs': { type: 'string', default: '3' },
    // More fresh pairs with fewer samples each measured narrower identical-code ranges in less time, since run to run spread is as large as the spread inside one run.
    'browser-runs': { type: 'string', default: '6' },
    output: { type: 'string', default: 'tests/results/performance.json' },
    help: { type: 'boolean', default: false },
  } });
  const selected = values.cases.split(',').flatMap(name => Object.hasOwn(groups, name) ? groups[name] : [name]);
  if (selected.some(name => !cases.includes(name)) || new Set(selected).size !== selected.length) {
    throw new Error(`Choose unique cases from: ${cases.join(', ')}`);
  }
  const minimums = { samples: 1, 'warmup-constructions': 0, 'setup-runs': 1, 'update-runs': 1, 'browser-runs': 2 };
  for (const key in minimums) {
    const value = values[key].trim() ? +values[key] : NaN;
    if (!Number.isInteger(value) || value < minimums[key]) throw new Error(`Invalid --${key}`);
    values[key] = value;
  }
  if (values.samples % SAMPLE_CYCLE) throw new Error('Invalid --samples, use a multiple of four to balance process slots and version orders');
  return { ...values, cases: selected };
}

const NORMALIZED_ITERATIONS = 300;
// Each case gets about this much work per update pass and per setup sample, so heavy cases stop dominating the run.
const PASS_MS = 50;
const SETUP_MS = 150;
const MIN_SEEKS = 20;

/** @param {Record<string, Number|Number[]>[]} samples @param {String} operation */
const sampleMeans = (samples, operation) => samples.map(sample => Array.isArray(sample[operation]) ?
  sample[operation].reduce((total, value) => total + value, 0) / sample[operation].length : sample[operation]);

export function summarize(samples) {
  if (!samples.length || samples.some(n => !Number.isFinite(n) || n < 0)) throw new Error('Invalid timing samples');
  return { meanMs: samples.reduce((total, time) => total + time, 0) / samples.length, samplesMs: samples };
}

/** Sizes the measured work from one calibration so heavy cases stop dominating the run. */
export function sizeWork(cost, config) {
  return {
    // No seek cap: passes cut short by a cap of 300 or 3,000 seeks moved light rows by up to 20 points, reproducibly.
    iterations: cost.seekMs ? Math.max(MIN_SEEKS, Math.round(PASS_MS / cost.seekMs)) : 0,
    setupRuns: config['fixed-setup-runs'] ? config['setup-runs'] :
      Math.min(config['setup-runs'], Math.max(1, Math.ceil(SETUP_MS / cost.constructionMs))),
  };
}

/** Alternates the process pair and the version order so every four samples cover both equally. */
export const sampleOrder = repeat => ({ pair: repeat % 2, reversed: (repeat >> 1) % 2 === 1 });

/** Maps a request path to a file inside one of the served roots, or throws. */
export function modulePath(roots, url) {
  const [, version, ...parts] = decodeURIComponent(url.split('?')[0]).split('/');
  const base = roots[version];
  if (!base || parts.some(p => !p || p === '.' || p === '..' || p.includes('\\'))) throw new Error('Invalid module path');
  const file = resolve(base, parts.join('/'));
  if (!file.startsWith(base + sep)) throw new Error('Invalid module path');
  return file;
}

// Two sided 95% Student t critical values for 1 to 30 degrees of freedom, larger samples keep the last one.
const criticalT95 = [12.706, 4.303, 3.182, 2.776, 2.571, 2.447, 2.365, 2.306, 2.262, 2.228, 2.201, 2.179, 2.160, 2.145, 2.131,
  2.120, 2.110, 2.101, 2.093, 2.086, 2.080, 2.074, 2.069, 2.064, 2.060, 2.056, 2.052, 2.048, 2.045, 2.042];

/** Student t distribution function for a whole number of degrees of freedom, Abramowitz and Stegun 26.7.3 and 26.7.4. */
export function studentCdf(t, df) {
  const theta = Math.atan(t / Math.sqrt(df));
  const cos2 = Math.cos(theta) ** 2;
  const odd = df % 2;
  let term = odd ? Math.cos(theta) : 1;
  let sum = odd && df < 3 ? 0 : term;
  for (let k = odd ? 3 : 2; k <= df - 2; k += 2) sum += term *= cos2 * (k - 1) / k;
  return .5 + (odd ? (theta + Math.sin(theta) * sum) / Math.PI : Math.sin(theta) * sum / 2);
}

// Rows are flagged at a 5 percent false discovery rate over all rows of a run, by the Benjamini and Hochberg method.
// On 2026-09-29 a 95 percent range on each row flagged 2 to 17 of 175 identical-code rows by chance. The rate flagged
// none of them, and kept 121 to 126 of the 121 to 128 rows that the ranges flagged against 4.5.0.
const FALSE_DISCOVERY_RATE = .05;
/** The chance of a change at least this large, in either direction, on identical code. */
const pValue = confidence95 => 2 * Math.min(confidence95.slower, 1 - confidence95.slower);

/** The largest p-value that the false discovery rate flags among these rows, 0 when it flags none. */
export function discoveryThreshold(results) {
  const values = results.filter(result => result.confidence95).map(result => pValue(result.confidence95)).sort((a, b) => a - b);
  let threshold = 0;
  for (let i = 0; i < values.length; i++) if (values[i] <= (i + 1) / values.length * FALSE_DISCOVERY_RATE) threshold = values[i];
  return threshold;
}

export function confidence95(baselineSamples, candidateSamples, baselineMean) {
  if (baselineSamples.length !== candidateSamples.length || baselineSamples.length < 2) return null;
  const differences = baselineSamples.map((value, i) => candidateSamples[i] - value);
  const mean = differences.reduce((total, value) => total + value, 0) / differences.length;
  const variance = differences.reduce((total, value) => total + (value - mean) ** 2, 0) / (differences.length - 1);
  const count = differences.length;
  const standardError = Math.sqrt(variance / count);
  const marginMs = criticalT95[Math.min(count, 31) - 2] * standardError;
  const lowMs = mean - marginMs;
  const highMs = mean + marginMs;
  return { lowMs, highMs, marginMs,
    lowPercent: baselineMean > 0 ? lowMs / baselineMean * 100 : null,
    highPercent: baselineMean > 0 ? highMs / baselineMean * 100 : null,
    // The chance that the candidate is slower, from the same distribution as the range.
    slower: standardError > 0 ? studentCdf(mean / standardError, count - 1) : mean > 0 ? 1 : mean < 0 ? 0 : .5 };
}

export function compare(baseline, candidate, baselineSamples, candidateSamples) {
  const deltaMs = candidate.meanMs - baseline.meanMs;
  const changePercent = baseline.meanMs > 0 && candidate.meanMs > 0 ? deltaMs / baseline.meanMs * 100 : null;
  return { changePercent, deltaMs, confidence95: confidence95(baselineSamples, candidateSamples, baseline.meanMs) };
}

/** Sorts a report's rows by verdict at the false discovery rate, largest changes first, and names the unflagged row with the largest worst case. */
export function summarizeReport(report) {
  const threshold = discoveryThreshold(report.results);
  const name = row => `${row.case} / ${row.operation}`;
  const samples = {};
  for (const row of report.results) samples[row.baseline.samplesMs.length] = (samples[row.baseline.samplesMs.length] || 0) + 1;
  const rows = { faster: [], slower: [], '': [] };
  for (const row of report.results) rows[rowVerdict(row, threshold)].push(row);
  const worst = rows[''].filter(row => row.confidence95 && row.confidence95.highPercent !== null)
    .toSorted((a, b) => b.confidence95.highPercent - a.confidence95.highPercent)[0];
  return { rows: report.results.length, cases: new Set(report.results.map(row => row.case)).size, failed: report.failures.length,
    faster: rows.faster.length, slower: rows.slower.length, withinNoise: rows[''].length, threshold,
    elapsedSeconds: report.elapsedSeconds, samples,
    slowest: rows.slower.toSorted((a, b) => b.changePercent - a.changePercent).map(name),
    fastest: rows.faster.toSorted((a, b) => a.changePercent - b.changePercent).map(name),
    worstCase: worst ? name(worst) : null };
}

export function colorRow(text, color, stream = process.stdout) {
  // Scalar styles keep terminal checks correct on Node 22.12 too.
  if (color.startsWith('bg')) {
    return styleText('black', styleText(color, text.padEnd(stream.columns || text.length), { stream }), { stream });
  }
  return styleText(color, text, { stream });
}

/** 'faster' or 'slower' for a row that moves more than 1 percent with a p-value at most the threshold, '' for any other row. */
function rowVerdict({ changePercent, confidence95 }, threshold) {
  if (!confidence95 || confidence95.lowPercent === null || Math.abs(+changePercent.toFixed(1)) <= 1 || pValue(confidence95) > threshold) return '';
  return changePercent < 0 ? 'faster' : 'slower';
}

export const columnWidth = names => Math.max(36, ...names.map(name => name.length + 9));

// Whole percents from 100 keep every percent within six characters, so the columns stay aligned.
const digits = value => value.toFixed(Math.abs(value) < 99.95 ? 1 : 0);
const percent = value => value === null ? 'n/a' : `${+value.toFixed(1) > 0 ? '+' : ''}${digits(value)}%`;
// A multiplier reads like the changelog, 2× is the same work in half the time. Fewer decimals from 10 keep five characters.
const multiplier = ratio => `${ratio.toFixed(ratio < 9.995 ? 2 : ratio < 99.95 ? 1 : 0)}×`;

// Columns two spaces apart, each as wide as its widest value: averages below 10 s and six character percents.
const columns = (label, baseline, candidate, change, margin, verdict) =>
  `${label}  ${baseline.padStart(8)}  ${candidate.padStart(8)}  ${change.padStart(6)}  ${margin.padStart(6)}  ${verdict.padEnd(12)}`;

export const formatHeader = width => columns('Case / operation'.padEnd(width), 'baseline', 'new', 'change', 'margin', 'verdict');

/** Formats one row in the table columns, with its verdict and color at the threshold. The range is the change plus or minus the margin. */
export function formatRow(result, width, threshold) {
  const { confidence95 } = result;
  const margin = confidence95 && confidence95.lowPercent !== null ? `±${digits((confidence95.highPercent - confidence95.lowPercent) / 2)}%` : '';
  const verdict = rowVerdict(result, threshold);
  // The change is new over baseline minus one, so the multiplier always agrees with the change column.
  const ratio = 1 + result.changePercent / 100;
  const text = columns((result.case + ' / ' + result.operation).padEnd(width), result.baseline.meanMs.toFixed(3), result.candidate.meanMs.toFixed(3),
    percent(result.changePercent), margin, verdict && `${multiplier(verdict === 'faster' ? 1 / ratio : ratio)} ${verdict}`);
  return verdict ? colorRow(text, verdict === 'faster' ? 'bgGreen' : 'bgRed') : text;
}

export function formatSummary(report) {
  const { summary } = report;
  const seconds = summary.elapsedSeconds;
  const clock = seconds === undefined ? '' : ` in ${Math.floor(seconds / 60)}m${String(seconds % 60).padStart(2, '0')}s`;
  const lines = [colorRow(`Summary: ${summary.rows} rows over ${summary.cases} cases${clock}, flagged at a ${FALSE_DISCOVERY_RATE * 100}% false discovery rate`, 'bold'), ''];
  const line = (label, value, color, note = '') => {
    const text = `  ${label.padEnd(30)}${String(value).padStart(7)}${note}`;
    lines.push(color ? colorRow(text, color) : text);
  };
  const row = name => report.results.find(result => `${result.case} / ${result.operation}` === name);
  const best = summary.fastest[0];
  // Each count uses the background of the rows it counts.
  line('Faster', summary.faster, summary.faster ? 'bgGreen' : null, best ? `   best ${percent(row(best).changePercent)} ${best}` : '');
  const worst = summary.slowest[0];
  line('Slower', summary.slower, summary.slower ? 'bgRed' : null, worst ? `   worst ${percent(row(worst).changePercent)} ${worst}` : '');
  // The largest possible slowdown among the other rows, the right end of its range.
  const unclear = summary.worstCase;
  line('No clear change', summary.withinNoise, null, unclear ? `   up to ${percent(row(unclear).confidence95.highPercent)} ${unclear}` : '');
  line('Failed cases', summary.failed, summary.failed ? 'bgMagenta' : null);
  line('Samples per row', Object.keys(summary.samples).join(', '));
  // The lists repeat the rows in the columns of the main table.
  const width = columnWidth(report.config.cases);
  const list = (title, names) => {
    if (names.length) lines.push('', colorRow(title, 'bold'), formatHeader(width), ...names.map(name => formatRow(row(name), width, summary.threshold)));
  };
  list('Slower:', summary.slowest);
  return lines;
}

/** Adds the summary to a report, prints it, and writes the JSON file. */
export async function writeReport(report, output) {
  report.summary = summarizeReport(report);
  console.log('\n' + formatSummary(report).join('\n'));
  await mkdir(dirname(resolve(output)), { recursive: true });
  await writeFile(resolve(output), JSON.stringify(report, null, 2) + '\n');
  console.log(`Report: ${resolve(output)}`);
}

export async function run(config) {
  const started = Date.now();
  const roots = { baseline: sourceRoot(config.baseline), candidate: sourceRoot(config.candidate),
    tests: resolve(root, 'tests'), three: resolve(root, 'node_modules/three/build') };
  const server = http.createServer(async (req, res) => {
    // Cross origin isolation gives performance.now() 5 microsecond resolution instead of 100.
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    try {
      if (req.url === '/favicon.ico') { res.writeHead(204).end(); return; }
      if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.end('<!doctype html><script type="importmap">{"imports":{"three":"/three/three.module.js","three/webgpu":"/three/three.webgpu.js"}}</script><body></body>');
        return;
      }
      res.setHeader('Content-Type', 'text/javascript');
      res.end(await readFile(modulePath(roots, req.url)));
    } catch (error) {
      console.error(error.message);
      res.writeHead(404).end(error.message);
    }
  });
  const browsers = [];
  const report = { date: new Date().toISOString(), node: process.version, platform: `${platform()} ${arch()}`,
    cpu: cpus()[0]?.model, chrome: '', three: JSON.parse(await readFile(resolve(root, 'node_modules/three/package.json'))).version,
    measurement: { unit: 'milliseconds', statistic: 'meanMs', confidence: 'paired 95% Student t interval over independent page pairs, one sample each' },
    config, sources: { baseline: roots.baseline, candidate: roots.candidate }, results: [], failures: [] };
  try {
    await new Promise((resolve, reject) => { server.once('error', reject); server.listen(0, '127.0.0.1', resolve); });
    // Two separate processes keep one page's Three.js feedback and garbage collection out of the other.
    // Each version gets a page in both processes because the second launched process measured short
    // setups 4 to 20 percent slower on identical code, so a fixed process per version biased setup rows.
    for (let slot = 0; slot < 2; slot++) {
      // CHROME_FLAGS passes Chrome arguments separated by | to both processes, for controls such as a pinned nursery size.
      browsers.push(await puppeteer.launch({ headless: true, args: process.env.CHROME_FLAGS ? process.env.CHROME_FLAGS.split('|') : [], ...(process.env.CHROME_BIN ?
        { executablePath: process.env.CHROME_BIN } : { channel: 'chrome' }) }));
    }
    if (browsers[0].process().pid === browsers[1].process().pid) throw new Error('Benchmark versions share one Chrome process');
    report.chrome = await browsers[0].version();
    const width = columnWidth(config.cases);
    // A row printed during the run cannot see the rows after it, so it takes the stricter share of the rate for
    // one row among all of them. Every row it colors is also flagged in the summary.
    const rowThreshold = FALSE_DISCOVERY_RATE / (2 * config.cases.length);
    console.log(`Baseline ${config.baseline}, candidate ${config.candidate}, ${report.chrome}`);
    console.log(`${config.samples} samples, each on its own page pair, over 2 Chrome processes. Milliseconds, updates per ${NORMALIZED_ITERATIONS} seeks. Negative change is faster.\n`);
    console.log(formatHeader(width));
    const context = (version, slot) => ({ version, browser: browsers[slot], page: null, session: null, errors: [] });
    // Every sample gets its own page pair. Each page keeps its own speed, and on 2026-09-29 identical code measured
    // up to 9 percent apart between pages: four samples from one pair made the range too narrow.
    // Pair 0 hosts the baseline in the first process, pair 1 hosts it in the second.
    const pairs = Array.from({ length: config.samples }, (_, repeat) => {
      const { pair, reversed } = sampleOrder(repeat);
      const versions = [context('baseline', pair), context('candidate', 1 - pair)];
      return reversed ? versions.toReversed() : versions;
    });
    // A page that takes no samples calibrates, so no sample page runs more constructions than another.
    const calibration = context('baseline', 0);
    const contexts = [calibration, ...pairs.flat()];
    // The pages live for the whole run and load a fresh document for each case. A browser context per page and
    // case took minutes to create and dispose, and timed out. Each page keeps hosting one version. In the default
    // context every page still gets its own renderer process, and pages load three times faster than in their own contexts.
    await Promise.all(contexts.map(async context => {
      context.page = await context.browser.newPage();
      context.session = await context.page.createCDPSession();
      context.page.on('pageerror', error => context.errors.push(error.message));
      await context.page.setViewport({ width: 1200, height: 900 });
    }));
    for (const kind of config.cases) {
      const samples = { baseline: [], candidate: [] };
      let iterations, setupRuns;
      try {
        for (const context of contexts) context.errors.length = 0;
        // Opening and warming pages is not timed, so all of them run at once.
        await Promise.all(contexts.map(async ({ page, version }) => {
          await page.goto(`http://127.0.0.1:${server.address().port}`);
          await page.evaluate(async (version, kind) => {
            // A page that already carries a version marker shares its module graph with that version.
            if (globalThis.benchmarkVersion) throw new Error(`Page already hosts ${globalThis.benchmarkVersion}, cannot measure ${version}`);
            globalThis.benchmarkVersion = version;
            // Fix the engine origin so construction speed cannot change animation offsets.
            let clock = 1700000000000;
            Date.now = () => clock;
            const { prepare } = await import('/tests/benchmark-workloads.mjs');
            window.benchmark = await prepare('/' + version + '/', kind);
            clock += 1000;
          }, version, kind);
        }));
        await Promise.all(contexts.map(({ page }) => page.evaluate(count => globalThis.benchmark.warm(count), config['warmup-constructions'])));
        // The calibration page runs alone, the parallel warmups would inflate its costs and shrink every pass.
        ({ iterations, setupRuns } = sizeWork(await calibration.page.evaluate(() => globalThis.benchmark.calibrate()), config));
        for (let repeat = 0; repeat < config.samples; repeat++) {
          for (const { page, session, version } of pairs[repeat]) {
            await page.bringToFront();
            // Do not charge one sample for unreachable targets from earlier samples.
            await session.send('HeapProfiler.collectGarbage');
            const setup = await page.evaluate(runs => globalThis.benchmark.setup(runs), setupRuns);
            // Setup-only instances are unreachable. Collect them before update timing so their
            // allocations cannot cause collection during the update workload.
            await session.send('HeapProfiler.collectGarbage');
            // The first two repeats run each version in both processes, later samples skip the validation seeks.
            const times = await page.evaluate((iterations, updateRuns, validate) => globalThis.benchmark.sample(iterations, updateRuns, validate), iterations, config['update-runs'], repeat < 2);
            times.setup = setup;
            if (times.update) times.update = times.update.map(ms => ms * NORMALIZED_ITERATIONS / iterations);
            samples[version].push(times);
          }
        }
        const pageErrors = contexts.flatMap(context => context.errors);
        if (pageErrors.length) throw new Error(pageErrors.join('\n'));
        for (const operation of Object.keys(samples.baseline[0])) {
          // Each sample pairs its own mean with the other version's mean from the same page pair.
          const baseline = summarize(sampleMeans(samples.baseline, operation));
          const candidate = summarize(sampleMeans(samples.candidate, operation));
          const result = { case: kind, operation, setupRuns: operation === 'setup' ? setupRuns : undefined,
            iterations: operation === 'update' ? iterations : undefined, baseline, candidate, ...compare(baseline, candidate, baseline.samplesMs, candidate.samplesMs) };
          report.results.push(result);
          console.log(formatRow(result, width, rowThreshold));
        }
      } catch (error) {
        report.failures.push({ case: kind, error: error.message });
        console.error(colorRow(`FAIL ${kind}: ${error.message}`, 'bgMagenta', process.stderr));
      }
    }
  } finally {
    try {
      await Promise.all(browsers.map(browser => browser.close()));
    } finally {
      server.close();
      // Chrome's crash handler outlives the browser and keeps the output pipes it inherited open, which held
      // the process for about five minutes after a run on 2026-09-29.
      for (const browser of browsers) for (const stream of [browser.process()?.stdout, browser.process()?.stderr]) stream?.destroy();
    }
  }
  report.elapsedSeconds = Math.round((Date.now() - started) / 1000);
  await writeReport(report, config.output);
  return report;
}

if (process.argv[1] && process.argv[1] !== '-' && import.meta.url === pathToFileURL(await realpath(process.argv[1])).href) {
  const config = options(process.argv.slice(2));
  if (config.help) {
    console.log(`Usage: npm run test:perf -- [options]
  --baseline 4.5.0          Exact npm version, installed on first use, or a local module directory
  --candidate ./dist/modules  Local build by default, same choices as baseline
  --cases matrix,features   Named cases or groups: ${Object.keys(groups).join(', ')}
                           Example: js-objects/100/keyframes
  --samples 8              Fixed sample count, use a multiple of four to balance both process slots
  --warmup-constructions 8  Constructions each page executes before one page calibrates the work
  --setup-runs 8 --update-runs 3
                           Upper bound of setup runs and count of timed passes, each case sizes its passes to ${PASS_MS} ms and its setup samples to ${SETUP_MS} ms
  --fixed-setup-runs        Use the exact --setup-runs count instead of the adaptive setup bound
  --output tests/results/performance.json
Build local modules with npx rollup -c before running the comparison.
See tests/README.md for the measurement limits and full-suite command.`);
  } else {
    const report = await run(config);
    process.exitCode = report.failures.length ? 1 : 0;
  }
}

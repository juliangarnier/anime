import { realpath } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { options, summarize, compare, formatRow, formatHeader, columnWidth, discoveryThreshold, run, writeReport } from './benchmark-browser-pipeline.mjs';

export function aggregateReports(entries, config) {
  const report = { date: new Date().toISOString(), config, browserRuns: entries.length,
    measurement: { unit: 'milliseconds', statistic: 'meanMs', confidence: 'paired 95% Student t interval across fresh Chrome process pairs' },
    results: [], failures: entries.flatMap(({ report }, run) => report.failures.map(failure => ({ run: run + 1, ...failure }))) };
  const keys = new Map();
  for (const { report: runReport } of entries) {
    for (const result of runReport.results) keys.set(result.case + '/' + result.operation, [result.case, result.operation]);
  }
  for (const [caseName, operation] of keys.values()) {
    const baselineSamples = [];
    const candidateSamples = [];
    let setupRuns;
    for (const { report: runReport, reversed } of entries) {
      const result = runReport.results.find(result => result.case === caseName && result.operation === operation);
      // A pair whose browser died on this case is listed in failures, the surviving pairs still form a range.
      if (!result) continue;
      baselineSamples.push((reversed ? result.candidate : result.baseline).meanMs);
      candidateSamples.push((reversed ? result.baseline : result.candidate).meanMs);
      setupRuns = result.setupRuns;
    }
    if (baselineSamples.length < 2) continue;
    const baseline = summarize(baselineSamples);
    const candidate = summarize(candidateSamples);
    report.results.push({ case: caseName, operation, setupRuns, baseline, candidate, ...compare(baseline, candidate, baselineSamples, candidateSamples) });
  }
  return report;
}

async function runPrecise(args) {
  const started = Date.now();
  const config = options(args);
  if (config.help) {
    console.log('Usage: npm run test:perf:precise -- --cases replace [normal benchmark options]\n  --browser-runs 6       Fresh Chrome process pairs; library roles reverse on alternate runs');
    return 0;
  }
  const entries = [];
  for (let i = 0; i < config['browser-runs']; i++) {
    const reversed = i % 2 === 1;
    console.log(`\nBrowser run ${i + 1}/${config['browser-runs']}${reversed ? ' (versions reversed)' : ''}`);
    const report = await run({ ...config, baseline: reversed ? config.candidate : config.baseline,
      candidate: reversed ? config.baseline : config.candidate, output: config.output.replace(/\.json$/, '') + `-run-${i + 1}.json` });
    entries.push({ reversed, report });
  }
  const report = aggregateReports(entries, config);
  report.elapsedSeconds = Math.round((Date.now() - started) / 1000);
  const width = columnWidth(config.cases);
  console.log(`\nAggregate of ${entries.length} fresh Chrome process pairs\n${formatHeader(width)}`);
  const threshold = discoveryThreshold(report.results);
  for (const result of report.results) console.log(formatRow(result, width, threshold));
  await writeReport(report, config.output);
  return report.failures.length ? 1 : 0;
}

if (process.argv[1] && process.argv[1] !== '-' && import.meta.url === pathToFileURL(await realpath(process.argv[1])).href) {
  process.exitCode = await runPrecise(process.argv.slice(2));
}

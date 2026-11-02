// Quick update screen in Node for the cases without DOM targets, see tests/README.md.
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const self = fileURLToPath(import.meta.url);
const workloads = new URL('./benchmark-workloads.mjs', import.meta.url).href;
const defaultCases = [
  'js-objects/10000/stagger', 'js-objects/100/three-props', 'js-objects/100/keyframes', 'js-objects/100/stagger-keyframes',
  'js-objects/100/one-prop', 'three-object3d/1000/stagger', 'three-instances/100/one-prop',
  'replace', 'none', 'timeline', 'timeline-sequence', 'timeline-scrub', 'timeline-nested', 'blend', 'complex', 'adapter',
];

if (process.argv[2] === '--child') {
  const [, , , dir, name] = process.argv;
  const { prepare } = await import(workloads);
  const page = await prepare(pathToFileURL(dir).href + '/', name);
  page.warm(8);
  const { constructionMs, seekMs } = page.calibrate();
  const setupRuns = Math.max(1, Math.min(8, Math.round(150 / Math.max(constructionMs, .01))));
  const iterations = seekMs ? Math.max(20, Math.round(100 / seekMs)) : 0;
  gc();
  const setup = page.setup(setupRuns);
  gc();
  const times = page.sample(iterations, 5, false);
  // The median of five passes, normalized to 300 seeks like the browser report.
  const update = times.update ? [...times.update].sort((a, b) => a - b)[2] / iterations * 300 : null;
  console.log(JSON.stringify({ setup, update, remove: times.remove ?? null }));
  process.exit(0);
}

if (!process.argv[3]) throw new Error('Usage: node tests/benchmark-node.mjs <baseline dir> <candidate dir> [rounds] [cases]');
const dirs = [resolve(process.argv[2]), resolve(process.argv[3])];
const rounds = +(process.argv[4] || 6);
const cases = process.argv[5] ? process.argv[5].split(',') : defaultCases;
const run = (dir, name) => {
  const out = spawnSync(process.execPath, ['--expose-gc', self, '--child', dir, name], { encoding: 'utf8' });
  if (out.status) throw new Error(`${name} ${dir}\n${out.stderr}`);
  return JSON.parse(out.stdout.trim().split('\n').pop());
};
const median = list => {
  const sorted = [...list].sort((a, b) => a - b);
  const middle = sorted.length >> 1;
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};
const percent = x => (x >= 0 ? '+' : '') + (x * 100).toFixed(1) + '%';

console.log(`baseline  ${dirs[0]}\ncandidate ${dirs[1]}\n${rounds} rounds, change is the median of the per round ratios [min, max]\n`);
console.log('case'.padEnd(34) + 'metric'.padEnd(8) + 'base ms'.padStart(10) + 'new ms'.padStart(10) + 'change'.padStart(9) + '   range');
for (const name of cases) {
  const samples = [[], []];
  // Alternate the version order every round so neither version always runs on a warmer machine.
  for (let r = 0; r < rounds; r++) for (const v of r % 2 ? [1, 0] : [0, 1]) samples[v].push(run(dirs[v], name));
  for (const metric of ['setup', 'update', 'remove']) {
    if (samples[0][0][metric] === null) continue;
    const ratios = samples[0].map((s, i) => samples[1][i][metric] / s[metric] - 1);
    console.log(name.padEnd(34) + metric.padEnd(8) +
      median(samples[0].map(s => s[metric])).toFixed(2).padStart(10) + median(samples[1].map(s => s[metric])).toFixed(2).padStart(10) +
      percent(median(ratios)).padStart(9) + `   [${percent(Math.min(...ratios))}, ${percent(Math.max(...ratios))}]`);
  }
}

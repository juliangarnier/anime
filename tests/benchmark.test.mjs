import assert from 'node:assert/strict';
import test from 'node:test';
import { resolve } from 'node:path';
import { mkdtempSync, rmSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { execFileSync } from 'node:child_process';
import { options, sourceRoot, summarize, sizeWork, sampleOrder, modulePath, compare, confidence95, studentCdf, summarizeReport, formatSummary, formatRow, formatHeader } from './benchmark-browser-pipeline.mjs';
import { cases, groups, near, prepare, runSample, measureSetup, warm, calibrate, timeConstruction, buildWorkload } from './benchmark-workloads.mjs';
import { aggregateReports } from './benchmark-browser-precise.mjs';
import * as api from '../src/index.js';

const interval = (lowPercent, highPercent, slower) => ({ lowPercent, highPercent, slower });
const result = (changePercent, confidence95) => ({ case: 'case', operation: 'update', baseline: { meanMs: 10 }, candidate: { meanMs: 12 }, changePercent, confidence95 });

function renderRows(environment, columns = 0) {
  const env = { ...process.env };
  for (const name of ['NO_COLOR', 'NODE_DISABLE_COLORS', 'FORCE_COLOR']) delete env[name];
  Object.assign(env, environment);
  const results = [
    result(-25, interval(-30, -20, 0)),
    result(25, interval(20, 30, 1)),
    result(null),
    result(0),
    result(-1.04),
    result(1.04),
    result(5),
    result(-9, interval(-20, 2, .3)),
    result(-12, interval(-25, 1, .04)),
    result(4.6, interval(2.8, 6.3, .99)),
    result(4.6, interval(0, 6.3, .975)),
    result(15.7, interval(-0.5, 32, .97)),
    result(5.5, interval(-28, 39, .64)),
    result(0.01, interval(-5.4, 5.4, .5)),
    result(2, interval(-1.4, 5.3, .8996)),
  ];
  return JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', `
    import { formatRow, formatHeader, colorRow } from './tests/benchmark-browser-pipeline.mjs';
    Object.defineProperty(process.stdout, 'columns', { value: ${columns} });
    const results = ${JSON.stringify(results)};
    console.log(JSON.stringify([formatHeader(36), ...results.map(result => formatRow(result, 36, .05)), colorRow('FAIL example', 'bgMagenta', process.stderr)]));
  `], { env, encoding: 'utf8' }));
}

const header = 'Case / operation                      baseline       new  change  margin  verdict     ';
const plainRows = [
  header,
  'case / update                           10.000    12.000  -25.0%   ±5.0%  1.33× faster',
  'case / update                           10.000    12.000  +25.0%   ±5.0%  1.25× slower',
  'case / update                           10.000    12.000     n/a                      ',
  'case / update                           10.000    12.000    0.0%                      ',
  'case / update                           10.000    12.000   -1.0%                      ',
  'case / update                           10.000    12.000   +1.0%                      ',
  'case / update                           10.000    12.000   +5.0%                      ',
  'case / update                           10.000    12.000   -9.0%  ±11.0%              ',
  'case / update                           10.000    12.000  -12.0%  ±13.0%              ',
  'case / update                           10.000    12.000   +4.6%   ±1.8%  1.05× slower',
  'case / update                           10.000    12.000   +4.6%   ±3.1%              ',
  'case / update                           10.000    12.000  +15.7%  ±16.3%              ',
  'case / update                           10.000    12.000   +5.5%  ±33.5%              ',
  'case / update                           10.000    12.000    0.0%   ±5.4%              ',
  'case / update                           10.000    12.000   +2.0%   ±3.3%              ',
  'FAIL example'];

test('Colors only the gains and slowdowns flagged at the threshold', () => {
  const paint = (row, color) => `\x1b[30m\x1b[${color}m${row.padEnd(80)}\x1b[49m\x1b[39m`;
  // At a threshold of 5 percent, a chance slower of 97 percent is a p-value of 6 percent and stays plain.
  assert.deepEqual(renderRows({ FORCE_COLOR: '1' }, 80), [
    plainRows[0], paint(plainRows[1], 42), paint(plainRows[2], 41), plainRows[3], plainRows[4], plainRows[5], plainRows[6],
    plainRows[7], plainRows[8], plainRows[9], paint(plainRows[10], 41), plainRows[11],
    plainRows[12], plainRows[13], plainRows[14], plainRows[15], `\x1b[30m\x1b[45m${plainRows[16]}\x1b[49m\x1b[39m`,
  ]);
  for (const row of plainRows.slice(0, -1)) assert.equal(row.length, plainRows[0].length);
});

test('Prints percents from 100 as whole numbers', () => {
  const row = formatRow(result(140.25, interval(-103.4, 383.9, .5)), 36, .05);
  assert.equal(row, 'case / update                           10.000    12.000   +140%   ±244%              ');
  assert.equal(row.length, formatHeader(36).length);
});

test('Keeps redirected output and disabled colors plain', () => {
  for (const env of [{}, { NO_COLOR: '1' }, { NODE_DISABLE_COLORS: '1' }, { FORCE_COLOR: '0' }]) {
    assert.deepEqual(renderRows(env), plainRows);
  }
});

test('Matches the Student t critical values and the Cauchy case', () => {
  assert.equal(studentCdf(0, 7), .5);
  assert.equal(studentCdf(1, 1), .75);
  for (const [df, critical] of [[1, 12.706], [2, 4.303], [4, 2.776], [7, 2.365], [30, 2.042]]) {
    assert.ok(Math.abs(studentCdf(critical, df) - .975) < 1e-3, `df ${df}`);
    assert.ok(Math.abs(studentCdf(-critical, df) - .025) < 1e-3, `df ${df} lower tail`);
  }
});

test('Starts benchmark commands through symbolic paths', t => {
  const directory = mkdtempSync(resolve(tmpdir(), 'anime-perf-entry-'));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  for (const name of ['benchmark-browser-pipeline.mjs', 'benchmark-browser-precise.mjs']) {
    const entry = resolve(directory, name);
    symlinkSync(resolve('tests', name), entry);
    const output = execFileSync(process.execPath, [entry, '--help'], { encoding: 'utf8' });
    assert.match(output, /Usage: npm run test:perf/);
  }
});

test('Resolves installed versions and local directories to module directories', () => {
  assert.ok(sourceRoot('4.5.0').endsWith('/tests/results/baseline-4.5.0/node_modules/animejs/dist/modules'));
  assert.equal(sourceRoot('./src'), resolve('src'));
});

test('Imports benchmark helpers from standard input without starting a run', () => {
  const output = execFileSync(process.execPath, ['--input-type=module', '-'], {
    input: "await import('./tests/benchmark-browser-pipeline.mjs'); await import('./tests/benchmark-browser-precise.mjs'); console.log('Imported');",
    encoding: 'utf8',
  });
  assert.equal(output, 'Imported\n');
});

test('Parses benchmark options and rejects misspelled flags and invalid counts', () => {
  assert.equal(options([]).baseline, '4.5.0');
  assert.equal(options([]).candidate, './dist/modules');
  assert.equal(options(['--candidate', './src']).candidate, './src');
  assert.deepEqual(Object.fromEntries(['warmup-constructions', 'samples', 'setup-runs', 'update-runs', 'browser-runs'].map(key => [key, options([])[key]])),
    { 'warmup-constructions': 8, samples: 8, 'setup-runs': 8, 'update-runs': 3, 'browser-runs': 6 });
  assert.equal(options(['--samples', '12']).samples, 12);
  assert.equal(options(['--samples', '4', '--warmup-constructions', '0']).samples, 4);
  assert.equal(options(['--setup-runs', '5'])['setup-runs'], 5);
  assert.equal(options(['--browser-runs', '3'])['browser-runs'], 3);
  for (const args of [['--cases', ''], ['--cases', 'none,none'], ['--cases', 'missing'],
    ['--sample', '2'], ['--samples', '0'], ['--warmup-constructions', '-1'], ['--iterations', '300'],
    ['--samples', 'NaN'], ['--setup-runs', '0'], ['--setup-runs', '1.5'], ['--update-runs', '0'], ['--update-runs', ''], ['--browser-runs', '1'],
    ['--samples', '3'], ['--samples', '6'], ['--min-samples', '4'], ['--max-regression', '10']]) {
    assert.throws(() => options(args));
  }
});

test('Sizes passes to about 50 ms with no seek cap and setup samples to about 150 ms within the configured bound', () => {
  const config = options([]);
  assert.deepEqual(sizeWork({ seekMs: .5, constructionMs: 10 }, config), { iterations: 100, setupRuns: 8 });
  assert.deepEqual(sizeWork({ seekMs: 10, constructionMs: 100 }, config), { iterations: 20, setupRuns: 2 });
  assert.deepEqual(sizeWork({ seekMs: .01, constructionMs: 1 }, config), { iterations: 5000, setupRuns: 8 });
  assert.deepEqual(sizeWork({ seekMs: 0, constructionMs: 400 }, config), { iterations: 0, setupRuns: 1 });
});

test('Alternates process pairs and version orders so four samples cover every combination', () => {
  assert.deepEqual(Array.from({ length: 8 }, (_, repeat) => sampleOrder(repeat)), [
    { pair: 0, reversed: false }, { pair: 1, reversed: false }, { pair: 0, reversed: true }, { pair: 1, reversed: true },
    { pair: 0, reversed: false }, { pair: 1, reversed: false }, { pair: 0, reversed: true }, { pair: 1, reversed: true }]);
});

test('Serves module files inside the selected roots only', () => {
  const roots = { baseline: resolve('src'), tests: resolve('tests') };
  assert.equal(modulePath(roots, '/baseline/core/render.js?v=1'), resolve('src/core/render.js'));
  assert.equal(modulePath(roots, '/tests/benchmark-workloads.mjs'), resolve('tests/benchmark-workloads.mjs'));
  for (const url of ['/candidate/index.js', '/baseline/../package.json', '/baseline//index.js', '/baseline/', '/baseline/./index.js']) {
    assert.throws(() => modulePath(roots, url), /Invalid module path/);
  }
});

test('Lists the quick, matrix, and feature cases without duplicates', () => {
  assert.deepEqual(groups.quick, ['css-transforms/1000/stagger', 'js-objects/10000/stagger', 'css-properties/1000/stagger', 'three-object3d/10000/stagger']);
  assert.deepEqual(groups.features, ['keyframes-500', 'keyframes-playback-500', 'remove', 'none', 'replace', 'replace-partial', 'replace-sparse', 'timeline', 'timeline-sequence', 'timeline-scrub', 'timeline-nested', 'adapter', 'complex', 'blend']);
  assert.equal(groups.matrix.length, 80);
  assert.equal(new Set(cases).size, 97);
  assert.equal(options([]).cases.length, 94);
  assert.deepEqual(options(['--cases', 'quick']).cases, groups.quick);
  assert.deepEqual(options(['--cases', 'features']).cases, groups.features);
  assert.deepEqual(options(['--cases', 'matrix-js-objects']).cases, groups['matrix-js-objects']);
  const kinds = ['css-transforms', 'css-properties', 'colors', 'css-variables', 'svg-attributes', 'js-objects', 'three-object3d', 'three-instances'];
  for (const kind of kinds) {
    // DOM targets stop at 1,000, the other kinds reach 10,000.
    const large = kind.startsWith('js-') || kind.startsWith('three-') ? 10000 : 1000;
    for (const count of [10, 100, large]) {
      for (const variant of ['stagger', 'three-props']) assert.ok(groups.matrix.includes(`${kind}/${count}/${variant}`));
    }
    for (const variant of ['one-prop', 'from-to', 'keyframes', 'stagger-keyframes']) assert.ok(groups.matrix.includes(`${kind}/100/${variant}`));
    assert.equal(groups['matrix-' + kind].length, 10);
  }
  for (const value of ['matrix,matrix-js-objects', 'matrix-missing', 'js-objects/0/one-prop', 'js-objects/500/one-prop', 'js-objects/100/missing',
    'js-objects/10/keyframes', 'css-transforms/10000/stagger', 'pipeline']) {
    assert.throws(() => options(['--cases', value]));
  }
});

test('Creates the requested tweens per variant and cancels every instance', () => {
  api.engine.useDefaultMainLoop = false;
  for (const variant of ['one-prop', 'three-props', 'from-to', 'keyframes']) {
    const instances = [];
    const wrapped = { animate(target, params) {
      assert.ok(!Array.isArray(target));
      const animation = api.animate(target, params);
      instances.push(animation);
      let tweens = 0;
      for (let tween = animation._head; tween; tween = tween._next) tweens++;
      assert.equal(tweens, variant === 'one-prop' ? 1 : variant === 'keyframes' ? 12 : 3);
      assert.equal(animation.targets.length, 1);
      return animation;
    } };
    runSample(wrapped, {}, `js-objects/100/${variant}`, 20);
    assert.equal(instances.length, 100);
    for (const animation of instances) assert.equal(animation.cancelled, true);
  }
});

test('independent-animation checks catch a missed last target and still clean up every instance', () => {
  const instances = [];
  const broken = { animate(target, params) {
    const animation = api.animate(target, params);
    instances.push(animation);
    return instances.length === 100 ? { duration: animation.duration, seek() {}, cancel: () => animation.cancel() } : animation;
  } };
  assert.throws(() => runSample(broken, {}, 'js-objects/100/three-props', 20), /target 99.*expected 100, got 0/);
  assert.equal(instances.length, 100);
  assert.ok(instances.every(animation => animation.cancelled));
});

test('keyframe checks catch ignored intermediate frames even when the endpoint is correct', () => {
  const broken = { animate(target, params) {
    return api.animate(target, { ...params, x: 100, y: 200, z: 300 });
  } };
  assert.throws(() => runSample(broken, {}, 'js-objects/100/keyframes', 20), /at 125ms x: expected 40, got 23\.4375$/);
});

test('Measures 500-frame updates and catches a missing intermediate curve', () => {
  api.engine.useDefaultMainLoop = false;
  const setupOnly = buildWorkload(api, {}, 'keyframes-500');
  const playback = buildWorkload(api, {}, 'keyframes-playback-500');
  assert.equal(setupOnly.hasPasses, false);
  assert.equal(playback.hasPasses, true);
  assert.equal(runSample(api, {}, 'keyframes-playback-500', 20).update.length, 3);
  const broken = { animate: (targets, params) => api.animate(targets, {
    ...params, keyframes: undefined, x: 500, y: 1000, duration: 500,
  }) };
  assert.throws(() => runSample(broken, {}, 'keyframes-playback-500', 20), /expected.*got/);
});

test('Checks the untouched target in partial and sparse replacement updates', () => {
  api.engine.useDefaultMainLoop = false;
  for (const name of ['replace-partial', 'replace-sparse']) {
    assert.equal(runSample(api, {}, name, 20).update.length, 3);
    const broken = { animate(targets, params) {
      const animation = api.animate(targets, params);
      if (params.x === 100) {
        const seek = animation.seek;
        animation.seek = function(time, muteCallbacks, internalRender) {
          seek.call(this, time, muteCallbacks, internalRender);
          targets.at(-1).x = 0;
          return this;
        };
      }
      return animation;
    } };
    assert.throws(() => runSample(broken, {}, name, 20), /target 499.*expected.*got 0/);
  }
});

test('Catches a missing start value and a write to a property the variant does not animate', () => {
  const noFrom = { animate: (target, params) => api.animate(target, { ...params, x: params.x[1] }) };
  assert.throws(() => runSample(noFrom, {}, 'js-objects/100/from-to', 20), /at 125ms x: expected 28\.75, got 21\.09375$/);
  const extra = { animate: (target, params) => api.animate(target, { ...params, y: 200 }) };
  assert.throws(() => runSample(extra, {}, 'js-objects/100/one-prop', 20), /at 1000ms y: expected 0, got 200$/);
});

test('Skips both render shortcuts only in the keyframes variants', () => {
  const paths = {};
  for (const variant of ['stagger', 'three-props', 'keyframes', 'stagger-keyframes']) {
    const workload = buildWorkload(api, {}, `js-objects/100/${variant}`);
    workload.construct();
    paths[variant] = [workload.animation._hasSimpleTweens, workload.animation._hasSharedProgress];
    workload.cleanup();
  }
  assert.deepEqual(paths, { stagger: [true, false], 'three-props': [true, true], keyframes: [false, false], 'stagger-keyframes': [false, false] });
});

test('Catches a stagger in the wrong order', () => {
  api.engine.useDefaultMainLoop = false;
  assert.equal(runSample(api, {}, 'js-objects/100/stagger', 40).update.length, 3);
  assert.equal(runSample(api, {}, 'js-objects/100/stagger-keyframes', 40).update.length, 3);
  const reversed = { stagger: api.stagger, animate: (targets, params) => api.animate(targets, { ...params, delay: api.stagger(1000 / targets.length, { from: 'last' }) }) };
  assert.throws(() => runSample(reversed, {}, 'js-objects/100/stagger', 40), /target 0 at 248\.75ms x: expected 43\.56\d*, got 0$/);
  assert.throws(() => runSample(reversed, {}, 'js-objects/100/stagger-keyframes', 40), /target 0 at 248\.75ms x: expected 79\.6, got 0$/);
});

test('Catches a linear ease and a shared keyframe ease', () => {
  const linear = { animate: (target, params) => api.animate(target, { ...params, ease: 'linear' }) };
  assert.throws(() => runSample(linear, {}, 'none', 20), /at 125ms x: expected 23\.4375, got 12\.5$/);
  assert.throws(() => runSample(linear, {}, 'js-objects/100/three-props', 20), /at 125ms x: expected 23\.4375, got 12\.5$/);
  assert.throws(() => runSample(linear, {}, 'keyframes-500', 20), /at 62\.5ms x: expected 62\.75, got 62\.5$/);
  const shared = { animate(target, params) {
    return api.animate(target, { ...params, x: params.x.map(frame => ({ ...frame, ease: 'out(2)' })) });
  } };
  assert.throws(() => runSample(shared, {}, 'js-objects/100/keyframes', 20), /at 125ms x: expected 40, got 60$/);
});

test('Reads the replace start values from a running animation on every target', () => {
  const counts = countingApi();
  timeConstruction(counts.api, {}, 'replace');
  assert.equal(counts.constructions, 2, 'the running animation and its replacement');
  assert.ok(counts.instances.every(animation => animation.cancelled));
  const idle = { animate: (targets, params) => params.x === 50 ? { duration: 1000, seek() {}, cancel() {} } : api.animate(targets, params) };
  assert.throws(() => runSample(idle, {}, 'replace', 20), /target 0 at 125ms x: expected 52\.1484375, got 23\.4375$/);
  assert.equal(runSample(api, {}, 'replace', 20).update.length, 3);
});

test('Runs retained endpoint functions in the explicit function value workloads', () => {
  const names = ['js-objects/100/function-values', 'js-objects/10000/function-values'];
  assert.deepEqual(options(['--cases', names.join(',')]).cases, names);
  assert.ok(names.every(name => !groups.matrix.includes(name)));
  let calls = 0;
  const wrapped = { ...api, animate(target, params) {
    const tracked = { ...params };
    for (const property of ['x', 'y', 'z']) {
      assert.equal(typeof params[property], 'function');
      tracked[property] = (...args) => {
        calls++;
        return params[property](...args);
      };
    }
    return api.animate(target, tracked);
  } };
  const workload = buildWorkload(wrapped, {}, names[0]);
  try {
    workload.construct();
    assert.equal(calls, 300);
    for (const time of [250, 500, 1000]) {
      workload.seek(time);
      workload.check(time);
    }
    assert.equal(calls, 300);
    workload.animation.refresh();
    assert.equal(calls, 303);
  } finally {
    workload.cleanup();
  }
});

test('Keeps composition cases under the 1,000 targets where anime.js defaults to composition none', () => {
  api.engine.useDefaultMainLoop = false;
  const modes = {};
  for (const name of ['replace', 'none', 'timeline-sequence', 'timeline-scrub']) {
    const workload = buildWorkload(api, {}, name);
    workload.construct();
    const { _head } = workload.animation;
    // A timeline's head is its first child animation, an animation's head is its first tween.
    modes[name] = (_head._head || _head)._composition;
    workload.cleanup();
  }
  assert.deepEqual(modes, { replace: 0, none: 1, 'timeline-sequence': 0, 'timeline-scrub': 0 }, '0 is replace, 1 is none');
});

test('Catches a timeline sequence step that restarts from zero', () => {
  assert.equal(runSample(api, {}, 'timeline-sequence', 20).update.length, 3);
  const restart = { createTimeline(params) {
    const timeline = api.createTimeline(params);
    const add = timeline.add.bind(timeline);
    timeline.add = (targets, step) => add(targets, { ...step, x: [0, step.x] });
    return timeline;
  } };
  assert.throws(() => runSample(restart, {}, 'timeline-sequence', 20), /target 0 at 125ms x: expected 56\.25, got 0$/);
});

test('Sweeps timeline scrubs forward, back, and forward to the middle in equal steps', () => {
  const seeks = [];
  const recorded = { createTimeline(params) {
    const timeline = api.createTimeline(params);
    const seek = timeline.seek.bind(timeline);
    timeline.seek = (time, muted) => { seeks.push(time); return seek(time, muted); };
    return timeline;
  } };
  runSample(recorded, {}, 'timeline-scrub', 10, 1, false);
  assert.deepEqual(seeks.slice(0, 11), [0, 250, 500, 750, 1000, 750, 500, 250, 0, 250, 500]);
});

test('Catches nested child timelines synced in reverse order', () => {
  assert.equal(runSample(api, {}, 'timeline-nested', 20).update.length, 3);
  let created = 0;
  const reversed = { createTimeline(params) {
    const timeline = api.createTimeline(params);
    // The parent is created first, it syncs its children from the last offset to the first.
    if (!created++) {
      const sync = timeline.sync.bind(timeline);
      timeline.sync = (child, position) => sync(child, 900 - position);
    }
    return timeline;
  } };
  assert.throws(() => runSample(reversed, {}, 'timeline-nested', 20), /target 0 at 249\.875ms: expected [\d.]+, got 0$/);
});

test('Averages the samples with their slow outliers', () => {
  assert.deepEqual(summarize([9, 1, 3, 5]), { meanMs: 4.5, samplesMs: [9, 1, 3, 5] });
  assert.equal(summarize([1, 1, 28]).meanMs, 10);
  for (const values of [[], [NaN], [-1], [undefined]]) assert.throws(() => summarize(values));
});

test('Catches timeline loops that lose alternate playback', () => {
  assert.equal(runSample(api, {}, 'timeline-loop', 40).update.length, 3);
  const forward = { createTimeline(params) {
    return api.createTimeline({ ...params, alternate: false });
  } };
  assert.throws(() => runSample(forward, {}, 'timeline-loop', 40), /expected .*got/);
});

test('Reports the change of the averages with a paired range', () => {
  const result = (baseline, candidate) => compare(summarize(baseline), summarize(candidate), baseline, candidate);
  const slower = result([10, 10, 10, 10], [12, 12, 12, 12]);
  assert.equal(slower.changePercent, 20);
  assert.equal(slower.deltaMs, 2);
  assert.ok(slower.confidence95.lowPercent > 0);
  assert.equal(result([10, 10, 10, 10], [5, 5, 5, 5]).changePercent, -50);
  assert.equal(result([0, 0, 0, 0], [1, 1, 1, 1]).changePercent, null);
});

test('paired confidence uses the exact Student t value for four fresh browser pairs', () => {
  const { marginMs } = confidence95([10, 10, 10, 10], [11, 12, 13, 14], 10);
  assert.ok(Math.abs(marginMs - 3.182 * Math.sqrt(5 / 3) / 2) < 1e-9);
});

test('Separates stable changes from noise with paired confidence', () => {
  const stable = confidence95([10, 10, 10, 10, 10, 10, 10, 10], [12, 12, 12, 12, 12, 12, 12, 12], 10);
  assert.equal(stable.lowPercent, 20);
  assert.equal(stable.highPercent, 20);
  assert.equal(stable.slower, 1);
  const noisy = confidence95([10, 10, 10, 10, 10, 10, 10, 10], [9, 11, 9, 11, 9, 11, 9, 11], 10);
  assert.ok(noisy.lowPercent < 0 && noisy.highPercent > 0);
  assert.equal(noisy.slower, .5);
  const lopsided = confidence95([10, 10, 10, 10, 10, 10, 10, 10], [7, 12, 12, 12, 12, 12, 12, 12], 10);
  assert.ok(lopsided.lowPercent < 0, 'one flat sample keeps the range across zero');
  assert.ok(lopsided.slower > .95 && lopsided.slower < .975, 'and yet the slowdown is nearly certain');
  const wide = confidence95([10, 10, 10, 10, 10, 10, 10, 10], [4, 18, 4, 18, 4, 18, 4, 18], 10);
  assert.ok(wide.slower > .6 && wide.slower < .7, 'a symmetric spread around a small mean stays uncertain');
  assert.ok(lopsided.slower > wide.slower);
});

test('precise reports normalize reversed version runs before averaging', () => {
  const result = (baseline, candidate) => ({ case: 'replace', operation: 'update', setupRuns: undefined,
    baseline: summarize([baseline]), candidate: summarize([candidate]) });
  const report = aggregateReports([
    { reversed: false, report: { results: [result(10, 12)], failures: [] } },
    { reversed: true, report: { results: [result(12, 10)], failures: [] } },
    { reversed: false, report: { results: [result(10, 12)], failures: [] } },
    { reversed: true, report: { results: [], failures: [{ case: 'replace', error: 'Connection closed.' }] } },
  ], options(['--cases', 'replace']));
  assert.equal(report.browserRuns, 4);
  assert.equal(report.results.length, 1);
  assert.equal(report.results[0].baseline.samplesMs.length, 3);
  assert.equal(report.results[0].baseline.meanMs, 10);
  assert.equal(report.results[0].candidate.meanMs, 12);
  assert.equal(report.results[0].changePercent, 20);
  assert.deepEqual(report.failures, [{ run: 4, case: 'replace', error: 'Connection closed.' }]);
});

test('update passes reuse instances, restart at zero, and keep each timing', () => {
  let created = 0;
  const calls = [];
  const wrapped = { animate(targets, params) {
    created++;
    const animation = api.animate(targets, params);
    return { duration: animation.duration, seek(time, muted) { calls.push(time); animation.seek(time, muted); },
      cancel: () => animation.cancel() };
  } };
  const times = runSample(wrapped, {}, 'none', 2, 4);
  assert.equal(created, 1);
  assert.equal(times.update.length, 4);
  assert.deepEqual(calls.slice(0, 15), [0, 500, 1000, 0, 500, 1000, 0, 500, 1000, 0, 500, 1000, 0, 500, 1000]);
  assert.ok(times.update.every(time => Number.isFinite(time) && time >= 0));
});

test('setup runs construct and cancel on fresh targets each without any update work', () => {
  let seeks = 0;
  let cancels = 0;
  const seen = new Set();
  const wrapped = { animate(targets, params) {
    seen.add(targets);
    const animation = api.animate(targets, params);
    return { duration: animation.duration, seek() { seeks++; }, cancel() { cancels++; animation.cancel(); } };
  } };
  const mean = measureSetup(wrapped, {}, 'none', 3);
  assert.ok(Number.isFinite(mean) && mean >= 0);
  assert.equal(seen.size, 3, 'every construction gets fresh targets');
  assert.equal(seeks, 0);
  assert.equal(cancels, 3);
});

function countingApi() {
  const counts = { constructions: 0, seeks: 0, instances: [] };
  counts.api = { animate(targets, params) {
    counts.constructions++;
    const animation = api.animate(targets, params);
    counts.instances.push(animation);
    return { duration: animation.duration, seek(time, muted) { counts.seeks++; animation.seek(time, muted); }, cancel: () => animation.cancel() };
  } };
  return counts;
}

test('Warms up with exactly its count of constructions and no seeks', () => {
  const counts = countingApi();
  warm(counts.api, {}, 'none', 5);
  assert.equal(counts.constructions, 5);
  assert.equal(counts.seeks, 0);
  assert.ok(counts.instances.every(animation => animation.cancelled));
  warm(counts.api, {}, 'css-transforms/1000/stagger', 0);
  assert.equal(counts.constructions, 5);
});

test('Calibrates from one construction and one pass after a settle pass', () => {
  const counts = countingApi();
  const cost = calibrate(counts.api, {}, 'none');
  assert.ok(cost.constructionMs > 0 && cost.seekMs > 0, 'costs size the measured work');
  assert.equal(counts.constructions, 1);
  assert.equal(counts.seeks, 42, 'a settle pass and a timed pass, each a seek to zero and twenty seeks');
  assert.ok(counts.instances.every(animation => animation.cancelled));
});

test('Times one construction on fresh targets and cancels it', () => {
  const counts = countingApi();
  const ms = timeConstruction(counts.api, {}, 'none');
  assert.ok(Number.isFinite(ms) && ms > 0);
  assert.equal(counts.constructions, 1);
  assert.ok(counts.instances[0].cancelled);
});

test('Repeats the same 300 seeks for simple animations and keyframes after one settle pass', () => {
  const expected = [0, ...Array.from({ length: 300 }, (_, i) => (i + 1) * (1000 / 300))];
  for (const variant of ['one-prop', 'keyframes']) {
    const seeks = [];
    let count = 0;
    const wrapped = { animate(target, params) {
      const animation = api.animate(target, params);
      if (count++) return animation;
      return {
        duration: animation.duration,
        seek(time, muted) { seeks.push(time); animation.seek(time, muted); },
        cancel: () => animation.cancel(),
      };
    } };
    const times = runSample(wrapped, {}, `js-objects/100/${variant}`, 300, 5);
    assert.equal(times.update.length, 5);
    assert.equal(seeks.length, 6 * 301 + 17);
    for (let run = 0; run < 6; run++) {
      assert.deepEqual(seeks.slice(run * 301, (run + 1) * 301), expected);
    }
  }
});

test('Builds the instance adapters inside the timed construction', () => {
  let calls = 0;
  const instances = Array.from({ length: 100 }, () => ({}));
  const extras = { mesh: () => ({}), getInstances: () => { calls++; return instances; } };
  const workload = buildWorkload({ animate: () => ({ duration: 1000, cancel() {} }) }, extras, 'three-instances/100/one-prop');
  assert.equal(calls, 0, 'getInstances is Anime.js work and must not run while the targets are prepared');
  workload.construct();
  assert.equal(calls, 1);
  assert.equal(workload.targets, instances);
});

test('Skips the validation seeks when a sample does not validate', () => {
  let seeks = 0;
  let count = 0;
  const wrapped = { animate(target, params) {
    const animation = api.animate(target, params);
    if (count++) return animation;
    return { duration: animation.duration, seek(time, muted) { seeks++; animation.seek(time, muted); }, cancel: () => animation.cancel() };
  } };
  runSample(wrapped, {}, 'js-objects/100/one-prop', 300, 5, false);
  assert.equal(seeks, 6 * 301);
});

test('Repeats Three.js UUIDs from identical benchmark inputs', async () => {
  const { Object3D } = await import('three');
  const random = Math.random;
  try {
    await prepare(new URL('../src/', import.meta.url).href, 'none');
    const first = Array.from({ length: 16 }, () => new Object3D().uuid);
    await prepare(new URL('../src/', import.meta.url).href, 'none');
    const second = Array.from({ length: 16 }, () => new Object3D().uuid);
    assert.deepEqual(second, first);
    assert.equal(new Set(first).size, first.length);
  } finally {
    Math.random = random;
  }
});

test('Catches a missed middle target on the final pass', () => {
  let pass = 0;
  let index = 0;
  const broken = { animate(target, params) {
    const animation = api.animate(target, params);
    // The last seek of the last timed pass, after the settle pass, is dropped, so only a thorough final check sees the stale value.
    return index++ !== 50 ? animation : { duration: animation.duration, seek(time, muted) {
      if (time === 0) pass++;
      if (!(pass === 4 && time === 1000)) animation.seek(time, muted);
    }, cancel: () => animation.cancel() };
  } };
  assert.throws(() => runSample(broken, {}, 'js-objects/100/three-props', 20, 3), /target 50 at 1000ms.*expected 100, got 99.75/);
});

test('Flags summary rows at a 5 percent false discovery rate', () => {
  const row = (name, operation, change, low, high, slower, samples = 4) => ({ case: name, operation, changePercent: change,
    confidence95: interval(low, high, slower), baseline: { meanMs: 1, samplesMs: Array(samples).fill(1) }, candidate: { meanMs: 1 + change / 100, samplesMs: Array(samples).fill(1) } });
  // Two-sided p-values 0.001, 0.5, 0.18, 0.012, 0.045 and 0.02. The rate flags the three smallest; the setup of c
  // clears its own 95 percent range but not the rate among six rows.
  const report = { config: { cases: ['a', 'b', 'c', 'longer case b'] }, elapsedSeconds: 65, failures: [{ case: 'broken', error: 'x' }], results: [
    row('a', 'setup', -10.7, -17.2, -4.3, .0005), row('a', 'update', 1.5, -2.1, 5.2, .75, 8),
    row('b', 'setup', 2.4, -3.0, 4.8, .91), row('longer case b', 'update', 9.5, 2.0, 17.1, .994, 8),
    row('c', 'setup', 15.7, 0.5, 30.9, .9775, 2), row('c', 'update', 12, 4, 20, .99, 8),
  ] };
  report.summary = summarizeReport(report);
  const { threshold, ...summary } = report.summary;
  assert.ok(Math.abs(threshold - .02) < 1e-9);
  assert.deepEqual(summary, { rows: 6, cases: 4, failed: 1, faster: 1, slower: 2, withinNoise: 3, elapsedSeconds: 65,
    samples: { 2: 1, 4: 2, 8: 3 }, slowest: ['c / update', 'longer case b / update'], fastest: ['a / setup'], worstCase: 'c / setup' });
  assert.equal(summarizeReport({ ...report, results: [row('c', 'setup', 15.7, 0.5, 30.9, .9775, 2)] }).slower, 1, 'alone, the same row is flagged');
  assert.equal(summarizeReport({ ...report, results: report.results.map(result => ({ ...result, confidence95: interval(-1, 1, .5) })) }).threshold, 0);
  const script = `import { formatSummary } from './tests/benchmark-browser-pipeline.mjs';
    console.log(JSON.stringify(formatSummary(${JSON.stringify(report)})));`;
  const env = { ...process.env, FORCE_COLOR: '1' };
  delete env.NO_COLOR;
  delete env.NODE_DISABLE_COLORS;
  const lines = JSON.parse(execFileSync(process.execPath, ['--input-type=module', '-e', script], { env, encoding: 'utf8' }));
  const plain = lines.map(line => line.replace(/\x1b\[[0-9;]*m/g, ''));
  assert.deepEqual(plain, [
    'Summary: 6 rows over 4 cases in 1m05s, flagged at a 5% false discovery rate',
    '',
    '  Faster                              1   best -10.7% a / setup',
    '  Slower                              2   worst +12.0% c / update',
    '  No clear change                     3   up to +30.9% c / setup',
    '  Failed cases                        1',
    '  Samples per row               2, 4, 8',
    '',
    'Slower:',
    header,
    'c / update                               1.000     1.120  +12.0%   ±8.0%  1.12× slower',
    'longer case b / update                   1.000     1.095   +9.5%   ±7.6%  1.09× slower',
  ]);
  for (const line of plain.slice(8)) assert.ok(line.endsWith(':') || line.length === header.length, line);
  assert.match(lines[0], /^\x1b\[1mSummary:/);
  assert.match(lines[2], /^\x1b\[30m\x1b\[42m/);
  assert.match(lines[3], /^\x1b\[30m\x1b\[41m/);
  assert.doesNotMatch(lines[4], /\x1b\[/);
  assert.match(lines[5], /^\x1b\[30m\x1b\[45m/);
  assert.doesNotMatch(lines[9], /\x1b\[/);
  assert.match(lines[10], /^\x1b\[30m\x1b\[41m/);
  assert.match(lines[11], /^\x1b\[30m\x1b\[41m/);
});

test('a skipped middle update pass fails even when the next pass would work', () => {
  let pass = 0;
  const broken = { animate(targets, params) {
    const animation = api.animate(targets, params);
    return { duration: animation.duration, seek(time, muted) {
      if (time === 0) pass++;
      if (time === 0 || pass !== 2) animation.seek(time, muted);
    }, cancel: () => animation.cancel() };
  } };
  assert.throws(() => runSample(broken, {}, 'none', 300, 3), /target 0 at 1000ms x: expected 100, got 0$/);
  assert.equal(pass, 2);
});

test('value checks reject missing writes and invalid numbers', () => {
  near(1, 1, 'same');
  for (const value of [0, undefined, NaN, Infinity]) assert.throws(() => near(value, 1, 'value'), /expected 1/);
  assert.throws(() => near(0, NaN, 'invalid expected value'));
});

test('Preserves elapsed animation offsets when preparing a benchmark', async () => {
  const random = Math.random;
  const startTime = api.engine._startTime;
  const lastTickTime = api.engine._lastTickTime;
  let animation;
  try {
    await prepare(new URL('../src/', import.meta.url).href, 'none');
    animation = api.animate({ x: 0 }, { x: 100, autoplay: false });
    assert.ok(animation._offset < Date.now() - startTime + 100);
    assert.equal(api.engine._startTime, startTime);
  } finally {
    if (animation) animation.cancel();
    Math.random = random;
    api.engine._startTime = startTime;
    api.engine._lastTickTime = lastTickTime;
  }
});

test('the JS workload checks all targets and cancels even after a missed write', () => {
  api.engine.useDefaultMainLoop = false;
  let cancelled = false;
  const broken = { animate(targets, params) {
    const animation = api.animate(targets.slice(0, -1), params);
    return { duration: animation.duration, seek: (...args) => animation.seek(...args),
      cancel() { cancelled = true; animation.cancel(); } };
  } };
  assert.throws(() => runSample(broken, {}, 'none', 300), /target 499 at 1000ms x: expected 100, got 0$/);
  assert.equal(cancelled, true);
  const times = runSample(api, {}, 'none', 300);
  assert.ok(times.update.every(time => time > 0));
});

test('a missing timed update cannot be hidden by later validation seeks', () => {
  let seeks = 0;
  const broken = { animate(targets, params) {
    const animation = api.animate(targets, params);
    // Drops the last seek of the settle and timed passes, 301 seeks each; the validation seek to the end still renders.
    return { duration: animation.duration, seek(time, muted) { if (++seeks > 4 * 301 || time !== 1000) animation.seek(time, muted); },
      cancel: () => animation.cancel() };
  } };
  assert.throws(() => runSample(broken, {}, 'none', 300), /target 0 at 1000ms x: expected 100, got 99\.99/);
  seeks = 4 * 301;
  runSample(broken, {}, 'none', 300);
});

test('invalid durations cannot turn expected values into NaN and hide bad writes', () => {
  const broken = { animate() { return { duration: NaN, seek() {}, cancel() {} }; } };
  assert.throws(() => runSample(broken, {}, 'none', 300), /duration: expected 1000, got NaN/);
});

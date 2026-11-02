import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

if (!process.argv[2]) throw new Error('Usage: node tests/compare-pipeline.mjs <baseline src> [candidate src] [seeds]');
const roots = [resolve(process.argv[2]), resolve(process.argv[3] || 'src')];
const seeds = +(process.argv[4] || 10000);
if (!Number.isInteger(seeds) || seeds < 1) throw new Error('Use a positive integer seed count');
const baseline = await import(pathToFileURL(roots[0] + '/index.js'));
const candidate = await import(pathToFileURL(roots[1] + '/index.js'));
for (const api of [baseline, candidate]) {
  api.engine.useDefaultMainLoop = false;
  api.engine.reqId = 1;
  api.engine._startTime = api.engine._lastTickTime = 0;
}

function run(api, seed) {
  let state = seed;
  const random = n => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) % n);
  const scale = seed % 3 ? 1 : .001;
  api.engine.timeUnit = scale === 1 ? 'ms' : 's';
  api.engine._startTime = -(seed % 17) * 173.27 * scale;
  const targets = Array.from({ length: 3 }, () => ({ x: 0, y: 10 }));
  const calls = [];
  const callback = name => () => calls.push(name);
  const timeline = api.createTimeline({
    autoplay: false, loop: random(3), alternate: !!random(2), reversed: !!random(2),
    onBegin: callback('begin'), onLoop: callback('loop'), onComplete: callback('complete'),
    onRender: callback('render'), onUpdate: callback('update'),
  });
  for (let i = 0, count = 2 + random(7); i < count; i++) {
    const property = random(2) ? 'x' : 'y';
    const keyframes = Array.from({ length: 1 + random(4) }, () => {
      const key = { to: random(100), duration: (1 + random(8)) * 25 * scale, delay: (random(5) - 1) * 25 * scale };
      if (!random(4)) key.from = random(100);
      return key;
    });
    const params = {
      [property]: keyframes, ease: ['linear', 'inQuad', 'outQuad'][random(3)],
      onBegin: callback('begin' + i), onComplete: callback('complete' + i),
      onRender: callback('render' + i), onUpdate: callback('update' + i),
    };
    const selected = random(2) ? targets : targets[random(3)];
    timeline.add(selected, params, random(12) * 50 * scale);
  }
  timeline.init();
  const output = [];
  const times = [0, timeline.duration, 0];
  for (let i = 0; i < 40; i++) times.push(random(1201) / 1000 * timeline.duration);
  for (const time of times) {
    timeline.seek(time);
    output.push({ time, targets: structuredClone(targets), calls: calls.splice(0),
      duration: timeline.duration, completed: timeline.completed, iteration: timeline.currentIteration });
  }
  timeline.cancel();
  return output;
}

let mismatches = 0;
for (let seed = 1; seed <= seeds; seed++) {
  const expected = run(baseline, seed);
  const actual = run(candidate, seed);
  try { assert.deepEqual(actual, expected); }
  catch (error) {
    if (++mismatches <= 3) {
      const i = expected.findIndex((value, i) => JSON.stringify(value) !== JSON.stringify(actual[i]));
      console.log(JSON.stringify({ seed, index: i, expected: expected[i], actual: actual[i] }, null, 2));
    }
  }
}
console.log({ roots, seeds, mismatches });
process.exitCode = mismatches ? 1 : 0;

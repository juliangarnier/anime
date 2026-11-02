import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

if (!process.argv[2]) throw new Error('Usage: node tests/compare-seeks.mjs <baseline src> [candidate src] [seeds]');
const roots = [resolve(process.argv[2]), resolve(process.argv[3] || 'src')];
const seeds = +(process.argv[4] || 500);
if (!Number.isInteger(seeds) || seeds < 1) throw new Error('Use a positive integer seed count');
const apis = [];
for (const root of roots) {
  const api = await import(pathToFileURL(root + '/index.js'));
  api.engine.useDefaultMainLoop = false;
  api.engine.reqId = 1;
  apis.push(api);
}

const eases = ['linear', 'inQuad', 'outQuad', 'inOutSine', 'outBack', 'inOutExpo', 'outElastic'];
const props = ['x', 'y', 'z'];

// Timelines of one to three children on one target, with keyframes, from-to arrays, per property
// parameters, loops, and overlapping positions so children replace each other, then a random seek history.
function run(api, seed) {
  let state = seed;
  const rand = n => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) % n);
  const pick = a => a[rand(a.length)];
  const value = () => rand(201) - 100;
  const propValue = () => {
    const kind = rand(10);
    if (kind < 4) return Array.from({ length: 2 + rand(3) }, () => {
      const keyframe = { to: value(), duration: 20 + rand(200) };
      if (rand(3) === 0) keyframe.delay = rand(60);
      if (rand(3) === 0) keyframe.from = value();
      if (rand(2) === 0) keyframe.ease = pick(eases);
      return keyframe;
    });
    if (kind < 6) return [value(), value()];
    if (kind < 8) return { to: value(), duration: 50 + rand(300), delay: rand(100), ease: pick(eases) };
    return value();
  };
  api.engine._startTime = api.engine._lastTickTime = 0;
  const target = { x: 0, y: 0, z: 0 };
  const timeline = api.createTimeline({ autoplay: false, defaults: { ease: pick(eases) } });
  const children = 1 + rand(3);
  for (let i = 0; i < children; i++) {
    const params = { duration: 100 + rand(400), autoplay: false };
    if (rand(3) === 0) params.loop = 1 + rand(2);
    if (rand(3) === 0) params.alternate = true;
    if (rand(3) === 0) params.delay = rand(100);
    const used = props.filter(() => rand(10) < 7);
    for (const property of used.length ? used : ['x']) params[property] = propValue();
    timeline.add(target, params, i === 0 ? 0 : rand(600));
  }
  const results = [];
  const duration = timeline.duration;
  for (let i = 0; i < 40; i++) {
    timeline.seek(rand(duration + 41) - 20);
    results.push([target.x, target.y, target.z]);
  }
  timeline.cancel();
  return results;
}

let mismatches = 0;
for (let seed = 1; seed <= seeds; seed++) {
  const before = run(apis[0], seed);
  const after = run(apis[1], seed);
  try { assert.deepEqual(after, before); }
  catch {
    if (mismatches++ < 2) {
      const index = before.findIndex((v, i) => JSON.stringify(v) !== JSON.stringify(after[i]));
      console.log(JSON.stringify({ seed, index, before: before[index], after: after[index] }));
    }
  }
}
console.log({ seeds, mismatches });
if (mismatches) process.exitCode = 1;

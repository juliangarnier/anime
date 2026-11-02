import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

if (!process.argv[2]) throw new Error('Usage: node tests/compare-render-values.mjs <baseline src> [candidate src] [seeds]');
const roots = [resolve(process.argv[2]), resolve(process.argv[3] || 'src')];
const seeds = +(process.argv[4] || 1000);
if (!Number.isInteger(seeds) || seeds < 1) throw new Error('Use a positive integer seed count');
const apis = [];
for (const root of roots) {
  const api = { ...(await import(pathToFileURL(root + '/index.js'))) };
  api.engine.useDefaultMainLoop = false;
  api.engine.reqId = 1;
  apis.push(api);
}

const eases = ['linear', 'inQuad', 'outQuad', 'inOutSine', 'outBack'];
const props = ['x', 'y', 'z'];

// Timelines of one to three children on one target, with keyframes, explicit from values, loops, alternate
// playback and overlapping positions, then a history of 40 seeks. Composition none only runs alone.
function generate(seed) {
  let state = seed;
  const rand = n => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) % n);
  const pick = a => a[rand(a.length)];
  const value = () => rand(201) - 100;
  const propValue = () => {
    const kind = rand(10);
    if (kind < 5) return Array.from({ length: 2 + rand(3) }, () => {
      const keyframe = { to: value(), duration: 20 + rand(200) };
      if (rand(3) === 0) keyframe.delay = rand(60);
      if (rand(4) === 0) keyframe.from = value();
      if (rand(2) === 0) keyframe.ease = pick(eases);
      return keyframe;
    });
    if (kind < 7) return [value(), value()];
    if (kind < 8) return { to: value(), duration: 50 + rand(300), delay: rand(100), ease: pick(eases) };
    return value();
  };
  const timeline = { loop: rand(3) === 0 ? 2 : 0, alternate: rand(4) === 0, ease: pick(eases), children: [] };
  const children = 1 + rand(3);
  for (let i = 0; i < children; i++) {
    const params = { duration: 100 + rand(400) };
    if (rand(3) === 0) params.loop = 1 + rand(2);
    if (rand(3) === 0) params.alternate = true;
    if (rand(3) === 0) params.delay = rand(100);
    if (children === 1 && rand(3) === 0) params.composition = 'none';
    const used = props.filter(() => rand(10) < 7);
    for (const property of used.length ? used : ['x']) params[property] = propValue();
    timeline.children.push({ params, position: i === 0 ? 0 : rand(600) });
  }
  return { timeline, seeks: Array.from({ length: 40 }, () => rand(10000)) };
}

function build(api, { timeline: spec }) {
  api.engine._startTime = api.engine._lastTickTime = 0;
  const target = { x: 0, y: 0, z: 0 };
  const timeline = api.createTimeline({ autoplay: false, loop: spec.loop, alternate: spec.alternate, defaults: { ease: spec.ease } });
  for (const { params, position } of spec.children) timeline.add(target, structuredClone(params), position);
  return { timeline, target };
}

const read = target => [target.x, target.y, target.z].map(v => Math.round(v * 1e6) / 1e6);
const same = (a, b) => a.every((v, i) => v === b[i]);

// Forward playback in 10 ms steps, the path users see most.
function playback(api, spec) {
  const { timeline, target } = build(api, spec);
  const values = [];
  for (let t = 0; t <= timeline.duration + 10; t += 10) {
    timeline.seek(t);
    values.push(read(target));
  }
  timeline.cancel();
  return values;
}

function history(api, spec) {
  const { timeline, target } = build(api, spec);
  const duration = timeline.duration;
  timeline.seek(duration);
  const steps = spec.seeks.map(r => {
    const time = r % (duration + 41) - 20;
    timeline.seek(time);
    return { time, value: read(target) };
  });
  timeline.cancel();
  return steps;
}

// Replay the same seek history in 5 ms steps, the continuous motion a changed value is judged against.
function continuous(api, spec, steps, index) {
  const { timeline, target } = build(api, spec);
  let time = 0;
  const moveTo = to => {
    const step = to > time ? 5 : -5;
    while (Math.abs(to - time) > 5) timeline.seek(time += step);
    timeline.seek(time = to);
  };
  moveTo(timeline.duration);
  for (let i = 0; i <= index; i++) moveTo(steps[i].time);
  const value = read(target);
  timeline.cancel();
  return value;
}

const stats = { seeds, playbackMismatches: 0, historyMismatches: 0, fixed: 0, regressed: 0, motionDiffers: 0, neither: 0 };
for (let seed = 1; seed <= seeds; seed++) {
  const spec = generate(seed);
  const plays = apis.map(api => playback(api, spec));
  const playIndex = plays[0].findIndex((v, i) => !same(v, plays[1][i]));
  if (playIndex >= 0 && stats.playbackMismatches++ < 2) console.log(JSON.stringify({ seed, playback: playIndex * 10, before: plays[0][playIndex], after: plays[1][playIndex] }));
  const runs = apis.map(api => history(api, spec));
  const index = runs[0].findIndex((step, i) => !same(step.value, runs[1][i].value));
  if (index < 0) continue;
  stats.historyMismatches++;
  // Each version is judged against its own continuous motion, a baseline bug in smooth playback is no reference.
  const expected = apis.map((api, v) => continuous(api, spec, runs[v], index));
  const before = runs[0][index].value, after = runs[1][index].value;
  const beforeOk = same(before, expected[0]), afterOk = same(after, expected[1]);
  if (afterOk && beforeOk) stats.motionDiffers++;
  else if (afterOk) stats.fixed++;
  else if (beforeOk) {
    if (stats.regressed++ < 2) console.log(JSON.stringify({ seed, index, time: runs[0][index].time, expected: expected[1], before, after }));
  } else stats.neither++;
}
console.log(stats);
if (stats.playbackMismatches || stats.regressed) process.exitCode = 1;

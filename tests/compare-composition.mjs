import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

if (!process.argv[2]) throw new Error('Usage: node tests/compare-composition.mjs <baseline src> [candidate src] [seeds]');
const roots = [resolve(process.argv[2]), resolve(process.argv[3] || 'src')];
const seeds = +(process.argv[4] || 2000);
if (!Number.isInteger(seeds) || seeds < 1) throw new Error('Use a positive integer seed count');
const apis = [];
for (const root of roots) {
  const api = await import(pathToFileURL(root + '/index.js'));
  const { additive } = await import(pathToFileURL(root + '/animation/additive.js'));
  api.engine.useDefaultMainLoop = false;
  api.engine.reqId = 1;
  apis.push({ ...api, additive });
}

function run(api, seed, blend) {
  let state = seed;
  const rand = n => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) % n);
  api.engine._startTime = api.engine._lastTickTime = 0;
  const targets = Array.from({ length: 3 }, () => ({ x: 0, u: '0px', v: '0 0 0', c: 'rgba(0,0,0,1)' }));
  const instances = [];
  const results = [];
  const calls = [];
  const record = () => results.push({ values: targets.map(t => [t.x, t.u, t.v, t.c]), calls: calls.splice(0), states: instances.map(a => [a.cancelled, a.currentTime, a.completed]) });
  const names = ['x', 'u', 'v', 'c'];
  const value = (p, n) => p === 'x' ? n : p === 'u' ? `${n}px` : p === 'v' ? `${n} ${n * 2} ${n * 3}` : `rgba(${n},${n * 2},${n * 3},1)`;
  for (let i = 0; i < 7; i++) {
    api.engine._lastTickTime = rand(10) * 25;
    if (instances.length && rand(3) === 0) instances[rand(instances.length)].stretch(25 + rand(40) * 25);
    const p = names[rand(4)];
    const keys = Array.from({ length: 1 + rand(3) }, () => ({ to: value(p, 1 + rand(80)), duration: 25 + rand(5) * 25, delay: rand(3) * 25 }));
    const animation = api.animate(targets[rand(3)], {
      [p]: keys, autoplay: false,
      composition: blend ? 'blend' : 'replace',
      ease: rand(2) ? 'linear' : 'outQuad',
      loop: rand(3), alternate: !!rand(2),
      onBegin: () => calls.push('begin' + i), onComplete: () => calls.push('complete' + i),
    });
    instances.push(animation);
    if (blend) api.additive.update();
    record();
    for (let j = 0; j < 4; j++) {
      const a = instances[rand(instances.length)];
      a.seek(rand(15) * 25);
      if (blend) api.additive.update();
      record();
    }
  }
  for (let i = 0; i < 15; i++) {
    const a = instances[rand(instances.length)];
    const action = rand(4);
    if (action === 0) a.cancel();
    else if (action === 1) a.stretch(25 + rand(40) * 25);
    else a.seek(rand(20) * 25);
    if (blend) api.additive.update();
    record();
  }
  for (const a of instances) a.cancel();
  return results;
}

for (const blend of [false, true]) {
  let mismatches = 0;
  for (let seed = 1; seed <= seeds; seed++) {
    const before = run(apis[0], seed, blend);
    const after = run(apis[1], seed, blend);
    try { assert.deepEqual(after, before); }
    catch {
      if (mismatches++ < 2) {
        const index = before.findIndex((v, i) => JSON.stringify(v) !== JSON.stringify(after[i]));
        console.log(JSON.stringify({ blend, seed, index, before: before[index], after: after[index] }));
      }
    }
  }
  console.log({ blend, seeds, mismatches });
  if (mismatches) process.exitCode = 1;
}

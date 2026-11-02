import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

if (!process.argv[2]) throw new Error('Usage: node tests/compare-lifecycle.mjs <baseline src> [candidate src] [seeds]');
const roots = [resolve(process.argv[2]), resolve(process.argv[3] || 'src')];
const seeds = +(process.argv[4] || 3000);
if (!Number.isInteger(seeds) || seeds < 1) throw new Error('Use a positive integer seed count');
// restart() reads the clock, so a clock the script advances keeps every seed replayable.
let clock = 0;
Date.now = () => clock;
const apis = [];
for (const root of roots) {
  const api = await import(pathToFileURL(root + '/index.js'));
  api.engine.useDefaultMainLoop = false;
  api.engine.pause();
  apis.push(api);
}

// Creates, seeks, cancels, restarts, reverts and stretches number animations on shared targets,
// so delayed and revived animations link between existing siblings in any order.
function run({ engine, animate }, seed) {
  let state = seed;
  const rand = n => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) % n);
  const pick = list => list[rand(list.length)];
  clock = 0;
  const targets = [{ x: 0, y: 0 }, { x: 5, y: 5 }];
  const instances = [];
  const results = [];
  for (let step = 0; step < 14; step++) {
    clock += 16;
    const action = instances.length ? rand(9) : 0;
    if (action < 2) {
      engine._lastTickTime = rand(400);
      instances.push(animate(pick([targets[0], targets[1], targets]), {
        ...pick([{ x: 100 }, { y: 50 }, { x: 30, y: 80 }, { x: [10, 90] }]),
        duration: pick([200, 500, 1000]), delay: pick([0, 0, 100, 300]), ease: pick(['linear', 'out(2)', 'inOut(3)']),
        loop: rand(5) ? 0 : 1, composition: rand(5) ? 'replace' : 'none', autoplay: false,
      }));
    } else {
      const animation = pick(instances);
      if (action < 5) for (const a of rand(2) ? instances : [animation]) a.seek(rand(1800));
      else if (action === 5) animation.cancel();
      else if (action === 6) { animation.restart(); animation.pause(); }
      else if (action === 7) animation.revert();
      else animation.stretch(pick([100, 700, 1500]));
    }
    results.push(targets.map(t => [t.x, t.y]));
  }
  for (const a of instances) a.cancel();
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

import { performance } from 'node:perf_hooks';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(process.argv[2] || 'src');
const { animate, createTimeline, engine } = await import(pathToFileURL(root + '/index.js'));
engine.useDefaultMainLoop = false;
engine.reqId = 1;
engine._startTime = engine._lastTickTime = 0;

function measure(name, setup, run, repetitions = 7) {
  const times = [];
  for (let i = 0; i < repetitions + 2; i++) {
    const instance = setup();
    const start = performance.now();
    run(instance);
    const elapsed = performance.now() - start;
    instance.cancel();
    if (i >= 2) times.push(elapsed);
  }
  times.sort((a, b) => a - b);
  return { name, medianMs: +times[times.length >> 1].toFixed(3) };
}

const results = [];
results.push(measure('create 5000 transform targets (style stubs)', () => ({ cancel() {} }), () => {
  animate(
    Array.from({ length: 5000 }, () => ({ nodeType: 1, style: { transform: '' } })),
    { x: 100, y: 200, duration: 1000, ease: 'linear', autoplay: false },
  ).cancel();
}));

for (const composition of ['none', 'replace']) {
  results.push(measure('render ' + composition, () => animate(
    Array.from({ length: 5000 }, () => ({ x: 0, y: 0, z: 0 })),
    { x: 100, y: 200, z: 300, duration: 1000, ease: 'linear', autoplay: false, composition },
  ), animation => {
    for (let i = 0; i < 300; i++) animation.seek(i % 1000, true);
  }));
}

results.push(measure('create 1000 timeline children', () => createTimeline({ autoplay: false }), timeline => {
  for (let i = 0; i < 1000; i++) timeline.add({ x: 0 }, { x: 100, duration: 100, ease: 'linear' }, i * 10);
}));

results.push(measure('render 1000 timeline children', () => {
  const timeline = createTimeline({ autoplay: false });
  for (let i = 0; i < 1000; i++) timeline.add({ x: 0 }, { x: 100, duration: 1000, ease: 'linear' }, i);
  return timeline;
}, timeline => {
  for (let i = 0; i < 300; i++) timeline.seek(i * 5, true);
}));

console.log(JSON.stringify(results, null, 2));

import assert from 'node:assert/strict';
import { afterEach, test } from 'node:test';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// Control the host clock and callbacks so the real scheduler can run without wall clock delays.
let time = 1000000;
let requestId = 0;
const pending = new Map();
const original = { now: Date.now, setImmediate, clearImmediate };
Date.now = () => time;
globalThis.setImmediate = callback => { pending.set(++requestId, callback); return requestId; };
globalThis.clearImmediate = id => pending.delete(id);
let animate, engine;
try {
  ({ animate, engine } = await import(pathToFileURL(resolve(process.env.ANIME_TEST_SRC || 'src', 'index.js'))));
} finally {
  Date.now = original.now;
  globalThis.setImmediate = original.setImmediate;
  globalThis.clearImmediate = original.clearImmediate;
}

function frame(elapsed) {
  time += elapsed;
  const callbacks = [...pending.values()];
  pending.clear();
  callbacks.forEach(callback => callback());
}

afterEach(() => {
  engine.pause();
  for (let child = engine._head; child; child = child._next) child.cancel();
  time += 1000;
  engine.update();
  engine.useDefaultMainLoop = true;
  pending.clear();
});

test('Renders each supplied time and completes once', () => {
  engine.useDefaultMainLoop = false;
  const target = { x: 0 };
  const values = [];
  let completions = 0;
  const animation = animate(target, { x: 100, duration: 100, ease: 'linear',
    onRender: () => values.push(target.x), onComplete: () => completions++ });
  assert.equal(pending.size, 0, 'the engine does not schedule a default loop');
  // Use _startTime so the first host frame offset does not shift the expected values.
  for (let i = 1; i <= 4; i++) { time = animation._startTime + i * 25; engine.update(); }
  assert.deepEqual(values, [25, 50, 75, 100]);
  assert.equal(animation.currentTime, 100);
  assert.equal(animation.completed, true);
  assert.equal(completions, 1);
  time += 25;
  engine.update();
  assert.deepEqual(values, [25, 50, 75, 100]);
  assert.equal(completions, 1);
});

test('Renders the endpoint after a late host frame', () => {
  const target = { x: 0 };
  const values = [];
  let completions = 0;
  const animation = animate(target, { x: 100, duration: 50, ease: 'linear',
    onRender: () => values.push(target.x), onComplete: () => completions++ });
  frame(55);
  assert.deepEqual(values, [100]);
  assert.equal(animation.currentTime, 50);
  assert.equal(animation.completed, true);
  assert.equal(completions, 1);
});

test('Excludes paused time after the engine resumes', () => {
  const target = { x: 0 };
  const values = [];
  let completions = 0;
  const animation = animate(target, { x: 100, duration: 100, ease: 'linear',
    onRender: () => values.push(target.x), onComplete: () => completions++ });
  frame(animation._startTime + 25 - time);
  assert.deepEqual(values, [25]);
  engine.pause();
  assert.equal(pending.size, 0, 'pause cancels the host callback');
  frame(500);
  assert.equal(animation.currentTime, 25);
  assert.equal(animation.completed, false);
  assert.deepEqual(values, [25]);
  assert.equal(completions, 0);
  engine.resume();
  assert.equal(pending.size, 1, 'resume requests a host callback');
  frame(25);
  assert.deepEqual(values, [25, 50]);
  frame(50);
  assert.deepEqual(values, [25, 50, 100]);
  assert.equal(animation.currentTime, 100);
  assert.equal(animation.completed, true);
  assert.equal(completions, 1);
});

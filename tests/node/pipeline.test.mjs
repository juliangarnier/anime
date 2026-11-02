import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { beforeEach, test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(process.env.ANIME_TEST_SRC || 'src');
const { animate, createTimeline, engine, spring } = await import(pathToFileURL(root + '/index.js'));
const { additive } = await import(pathToFileURL(root + '/animation/additive.js'));
const { registerAdapter } = await import(pathToFileURL(root + '/adapters/index.js'));
const { composeComplexValue } = await import(pathToFileURL(root + '/core/values.js'));
engine.useDefaultMainLoop = false;
engine.reqId = 1;

class Vector {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

registerAdapter().registerTargetAdapter(t => t instanceof Vector).registerProperty('vector',
  t => `${t.x} ${t.y} ${t.z}`,
  (target, number, tween) => {
    target.x = tween._numbers[0];
    target.y = tween._numbers[1];
    target.z = tween._numbers[2];
  },
);

beforeEach(() => {
  engine._startTime = engine._lastTickTime = 0;
});

test('Preserves replacement siblings when cancelling a blend', () => {
  const target = { x: 0 };
  const params = { duration: 100, ease: 'linear', autoplay: false };
  const first = animate(target, { ...params, x: 100 });
  first.seek(25);
  engine._lastTickTime = 50;
  const blend = animate(target, { ...params, x: 200, composition: 'blend' });
  blend.cancel();
  assert.equal(first.cancelled, false);
  engine._lastTickTime = 75;
  const next = animate(target, { ...params, x: 300 });
  try {
    assert.equal(first.cancelled, true, 'the new replacement must find and cancel the fully replaced animation');
    next.seek(100);
    assert.equal(target.x, 300);
  } finally {
    first.cancel();
    next.cancel();
  }
});

test('Holds the delayed replacement handoff in both seek directions', () => {
  for (const scale of [1, .001]) {
    const target = { x: 0 };
    const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
      .add(target, { x: 100, duration: 1000 * scale })
      .add(target, { x: 200, duration: 500 * scale, delay: 300 * scale }, 500 * scale);
    for (const [time, value] of [[400, 40], [600, 50], [900, 80], [600, 50], [1300, 200], [650, 50], [400, 40]]) {
      timeline.seek(time * scale);
      assert.ok(Math.abs(target.x - value) < 1e-10, `time=${time}, value=${target.x}`);
    }
    timeline.cancel();
  }
});

test('Keeps sibling progress after one property is replaced', () => {
  const target = { x: 0, y: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, y: 100, duration: 1000 })
    .add(target, { x: 200, duration: 500 }, 500);
  for (const [time, x, y] of [[250, 25, 25], [750, 125, 75], [1000, 200, 100], [250, 25, 25]]) {
    timeline.seek(time);
    assert.deepEqual([target.x, target.y], [x, y], `time=${time}`);
  }
  timeline.cancel();
});

test('Cancels an animation only when all properties are replaced', () => {
  const target = { x: 0, y: 0 };
  const original = animate(target, { x: 100, y: 200, duration: 100, autoplay: false, ease: 'linear' });
  const replacementX = animate(target, { x: 300, duration: 100, autoplay: false, ease: 'linear' });
  assert.equal(original.cancelled, false);
  original.seek(50);
  replacementX.seek(50);
  assert.deepEqual([target.x, target.y], [150, 100]);
  const replacementY = animate(target, { y: 400, duration: 100, autoplay: false, ease: 'linear' });
  assert.equal(original.cancelled, true);
  replacementX.cancel();
  replacementY.cancel();
});

test('Preserves replacement start values after earlier insertions', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: [{ to: 100, duration: 100 }, { to: 200, duration: 100 }, { to: 300, duration: 100 }] })
    .add(target, { x: 400, duration: 100 }, 150)
    .add(target, { x: 500, duration: 100 }, 400);
  for (const [time, value] of [[50, 50], [200, 275], [450, 450], [425, 425], [100, 100]]) {
    timeline.seek(time);
    assert.equal(target.x, value, `time=${time}`);
  }
  assert.equal(timeline.cancelled, false);
  timeline.cancel();
});

test('Cancels a replaced loop without completing it', () => {
  const target = { x: 0 };
  let completed = 0;
  const original = animate(target, {
    x: [0, 100], loop: true, alternate: true, duration: 100, autoplay: false,
    onComplete: () => completed++,
  });
  const replacement = animate(target, { x: 200, duration: 100, autoplay: false });
  assert.equal(original.cancelled, true);
  assert.equal(original.completed, false);
  assert.equal(completed, 0);
  replacement.seek(100);
  assert.equal(target.x, 200);
  replacement.cancel();
});

test('Preserves sequential keyframes at nonzero engine offsets', () => {
  for (const offset of [0, 173.27, 5234.5]) {
    engine._startTime = -offset;
    const target = { x: 0 };
    const animation = animate(target, {
      autoplay: false, ease: 'linear',
      x: [{ to: 10, duration: 50, delay: -25 }, { to: 20, duration: 25, delay: 25 }],
    });
    for (const [time, value] of [[25, 5], [62.5, 10], [87.5, 15], [100, 20], [62.5, 10], [0, 0]]) {
      animation.seek(time);
      assert.equal(target.x, value, `offset=${offset}, time=${time}`);
    }
    animation.cancel();
  }
});

test('Preserves blend source values across forward and backward seeks', () => {
  const target = { vector: '0 0' };
  const first = animate(target, { vector: '100 200', duration: 100, ease: 'linear', composition: 'blend', autoplay: false });
  const second = animate(target, { vector: '200 400', duration: 100, ease: 'linear', composition: 'blend', autoplay: false });
  for (const [time, value] of [[25, '50 100'], [50, '100 200'], [75, '150 300'], [100, '200 400'], [25, '50 100']]) {
    first.seek(time, true);
    second.seek(time, true);
    additive.update();
    assert.equal(target.vector, value, `time=${time}`);
  }
  first.cancel();
  second.cancel();
});

test('Applies modifiers once per component when rendering strings and adapters', () => {
  for (const composition of ['none', 'replace']) {
    for (const native of [false, true]) {
      const target = native ? new Vector() : { vector: '0 0 0' };
      let calls = 0;
      const animation = animate(target, {
        vector: '100 200 300', composition,
        modifier: value => { calls++; return Math.floor(value / 5) * 5; },
        duration: 100, ease: 'linear', autoplay: false,
      });
      for (const [time, expected] of [[37, [35, 70, 110]], [100, [100, 200, 300]], [25, [25, 50, 75]], [0, [0, 0, 0]]]) {
        calls = 0;
        animation.seek(time);
        assert.deepEqual(native ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number), expected);
        assert.equal(calls, 3);
      }
      animation.revert();
      assert.deepEqual(native ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number), [0, 0, 0]);
    }
  }
});

test('Starts overlapping adapter tweens from the rendered value', () => {
  const target = new Vector();
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { vector: '100 200 300', duration: 100 }, 0)
    .add(target, { vector: '200 400 600', duration: 100 }, 50)
    .init();
  for (const [time, expected] of [[25, [25, 50, 75]], [50, [50, 100, 150]], [100, [125, 250, 375]], [150, [200, 400, 600]], [25, [25, 50, 75]]]) {
    timeline.seek(time);
    assert.deepEqual([target.x, target.y, target.z], expected);
  }
  timeline.revert();
  assert.deepEqual([target.x, target.y, target.z], [0, 0, 0]);
});

test('Combines independent blends and removes cancelled contributions', () => {
  for (const native of [false, true]) {
    const target = native ? new Vector() : { vector: '0 0 0' };
    const params = { ease: 'linear', composition: 'blend', autoplay: false };
    const first = animate(target, { ...params, vector: '100 200 300', duration: 100 });
    const second = animate(target, { ...params, vector: '200 400 600', duration: 50 });
    for (const [time, expected] of [[25, [75, 150, 225]], [50, [150, 300, 450]], [100, [200, 400, 600]], [25, [75, 150, 225]]]) {
      first.seek(time, true);
      second.seek(time, true);
      additive.update();
      assert.deepEqual(native ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number), expected);
    }
    first.cancel();
    second.seek(50, true);
    additive.update();
    assert.deepEqual(native ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number), [200, 400, 600]);
    second.cancel();
    if (native) target.x = target.y = target.z = 17;
    else target.vector = '17 17 17';
    additive.update();
    assert.deepEqual(native ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number), [17, 17, 17]);
    const next = animate(target, { ...params, vector: '37 57 77', duration: 100 });
    next.seek(50, true);
    additive.update();
    assert.deepEqual(native ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number), [27, 37, 47]);
    next.cancel();
  }
});

test('Renders the next keyframe when a stretched loop lands a float step past its start', () => {
  const target = { x: 0 };
  const animation = animate(target, { x: [{ to: 24, duration: 100, delay: 50 }, { to: 77, duration: 50, delay: 50 }, { to: 70, duration: 75, delay: 25 }], ease: 'linear', loop: 1, alternate: true, autoplay: false });
  animation.stretch(1000);
  animation.seek(100);
  animation.seek(250);
  assert.equal(animation._iterationTime, 250.00000000000003);
  assert.ok(Math.abs(target.x - 24) < 1e-10, `value=${target.x}`);
  animation.cancel();
});

test('Keeps the timer class when _currentTime becomes decimal in a fresh process', () => {
  // A fresh process runs the first field generalization, a long lived one already converged on doubles.
  const script = `const { createTimer, animate, Timer } = await import(${JSON.stringify(pathToFileURL(root + '/index.js').href)});
    const pairs = [
      [new Timer({ duration: 1000 }), new Timer({ duration: 1000 })],
      [createTimer({ duration: 1000, autoplay: false }), createTimer({ duration: 1000, autoplay: false })],
      [animate({ x: 0 }, { x: 100, duration: 1000, autoplay: false }), animate({ x: 0 }, { x: 100, duration: 1000, autoplay: false })],
    ];
    console.log(pairs.map(([changed, fresh]) => (changed._currentTime = 12.5, %HaveSameMap(changed, fresh))).join(' '));`;
  const result = spawnSync(process.execPath, ['--allow-natives-syntax', '--input-type=module', '-e', script], { encoding: 'utf8' });
  assert.equal(result.stdout.trim(), 'true true true', result.stderr);
});

test('Combines eased numeric and unit blends in both directions', () => {
  const target = { number: 0, unit: '0px' };
  const params = { ease: 'outQuad', composition: 'blend', autoplay: false };
  const first = animate(target, { ...params, number: 100, unit: '200px', duration: 100 });
  const second = animate(target, { ...params, number: 200, unit: '400px', duration: 50 });
  for (const [time, expected] of [[25, 118.75], [50, 175], [100, 200], [25, 118.75], [0, 0]]) {
    first.seek(time, true);
    second.seek(time, true);
    additive.update();
    assert.deepEqual([target.number, target.unit], [expected, `${expected * 2}px`]);
  }
  first.cancel();
  second.cancel();
});

test('Orders callbacks around rendering mixed blend properties', () => {
  const target = { x: 0, y: 0 };
  const calls = [];
  const animation = animate(target, {
    x: { to: 100, composition: 'blend' }, y: 200,
    duration: 100, ease: 'linear', autoplay: false,
    onBeforeUpdate: () => calls.push(['before', target.y]),
    onRender: () => calls.push(['render', target.y]),
    onUpdate: () => calls.push(['update', target.y]),
  });
  calls.length = 0;
  animation.seek(25);
  additive.update();
  assert.deepEqual(calls.splice(0), [['before', 0], ['render', 50], ['update', 50]]);
  assert.deepEqual([target.x, target.y], [25, 50]);
  animation.seek(75);
  additive.update();
  assert.deepEqual(calls, [['before', 50], ['render', 150], ['update', 150]]);
  assert.deepEqual([target.x, target.y], [75, 150]);
  animation.cancel();
});

test('Interpolates adapter components without building a string', () => {
  const animation = animate({ points: '0 0' }, { points: '100 200', duration: 100, autoplay: false });
  const tween = animation._head;
  assert.equal(composeComplexValue(tween, .5, 2, false), undefined);
  assert.deepEqual(tween._numbers, [50, 100]);
  assert.equal(composeComplexValue(tween, .5, 2), '50 100');
  animation.cancel();
});

test('Renders simple tweens through the short walk with the same values as the general loop', () => {
  const eases = ['linear', 'inQuad', 'outQuad', 'inOutSine', 'outBack', 'inOutExpo'];
  for (let seed = 1; seed <= 300; seed++) {
    let state = seed;
    const rand = n => ((state = (Math.imul(state, 1664525) + 1013904223) >>> 0) % n);
    const params = {
      duration: 50 + rand(400), delay: rand(100), ease: eases[rand(eases.length)], autoplay: false,
      loop: rand(3) === 0 ? 1 + rand(3) : 0, alternate: rand(2) === 0, reversed: rand(3) === 0,
      composition: rand(2) ? 'replace' : 'none',
      modifier: rand(3) === 0 ? v => Math.round(v * 10) / 10 : undefined,
    };
    for (const prop of ['x', 'y', 'z']) {
      params[prop] = rand(2) ? rand(201) - 100 : { to: rand(201) - 100, duration: 50 + rand(300), delay: rand(100), ease: eases[rand(eases.length)] };
    }
    const seeks = Array.from({ length: 12 }, () => rand(1200) - 100);
    const native = rand(2) === 0;
    const run = forceGeneral => {
      const target = native ? new Vector(1, 2, 3) : { x: 1, y: 2, z: 3 };
      const animation = animate(target, params);
      assert.equal(animation._hasSimpleTweens, true, `seed ${seed} is simple`);
      if (forceGeneral) animation._hasSimpleTweens = false;
      const out = [];
      for (const time of seeks) {
        animation.seek(time);
        let tween = animation._head;
        while (tween) { out.push(tween._currentTime); tween = tween._next; }
        out.push(target.x, target.y, target.z);
      }
      animation.cancel();
      return out;
    };
    assert.deepEqual(run(false), run(true), `seed ${seed}`);
  }
});

test('Leaves keyframes, blends and linked siblings on the general loop', () => {
  const target = { x: 0, y: 0 };
  const keyframes = animate(target, { x: [{ to: 50 }, { to: 100 }], duration: 100, autoplay: false });
  assert.equal(keyframes._hasSimpleTweens, false);
  keyframes.cancel();
  const blend = animate(target, { x: 100, composition: 'blend', duration: 100, autoplay: false });
  assert.equal(blend._hasSimpleTweens, false);
  blend.cancel();
  const timeline = createTimeline({ autoplay: false }).add(target, { x: 100, duration: 100 });
  assert.equal(timeline._head._hasSimpleTweens, true);
  timeline.seek(50);
  assert.equal(target.x, 75);
  timeline.cancel();
  engine._lastTickTime = 100;
  const first = animate(target, { x: 100, y: 100, duration: 1000, autoplay: false });
  assert.equal(first._hasSimpleTweens, true);
  engine._lastTickTime = 600;
  const overlapping = animate(target, { x: 200, duration: 1000, autoplay: false });
  assert.equal(first.cancelled, false, 'y keeps the first animation alive');
  assert.equal(first._hasSimpleTweens, false, 'the truncated x tween keeps its link');
  first.cancel();
  overlapping.cancel();
  engine._lastTickTime = 0;
  const overridden = animate(target, { x: 100, duration: 100, autoplay: false });
  const replacement = animate(target, { x: 200, duration: 100, autoplay: false });
  assert.equal(overridden.cancelled, true);
  assert.equal(replacement._hasSimpleTweens, true, 'an unlinked tween has nothing to consult');
  replacement.cancel();
  const unit = animate({ x: '0px' }, { x: '100px', duration: 100, autoplay: false });
  assert.equal(unit._hasSimpleTweens, false);
  unit.cancel();
});

test('Calls a shared spring ease only for tweens that render', () => {
  let completes = 0;
  const target = { a: 0, b: 0 };
  const timeline = createTimeline({ autoplay: false })
    .add(target, { a: 100, b: 100, ease: spring({ bounce: .2, duration: 400, onComplete: () => completes++ }) })
    .add(target, { a: -100, b: -100, duration: 1000, ease: 'linear' }, 100);
  for (let time = 0; time <= timeline.duration; time += 16) timeline.seek(time);
  assert.equal(completes, 0, 'the later child truncates both tweens before the spring settles');
  timeline.cancel();
});

test('Shares a progress equal to each tween own progress at a truncation boundary', () => {
  const renderAt = b => {
    engine._lastTickTime = 0;
    const target = { a: 0, b: 0 };
    let seen;
    const timeline = createTimeline({ autoplay: false })
      .add(target, { a: 100, b, duration: 600, delay: 7, ease: 'inQuad', onRender: () => { seen = target.a; } })
      .add(target, { a: -50, duration: 500, ease: 'linear' }, 16.1);
    const truncated = timeline._head._head;
    timeline.seek(truncated._absoluteStartTime + truncated._changeDuration);
    timeline.cancel();
    return seen;
  };
  assert.equal(renderAt(100), renderAt({ to: 100, ease: 'linear' }), 'the shared ease and a per tween ease render the same a');
});

test('Keeps spread, assigned and prototype copies of an animated object independent of it', () => {
  for (const copyOf of [source => ({ ...source }), source => Object.assign({}, source), source => Object.create(source)]) {
    engine._lastTickTime = 0;
    const source = { x: 0 };
    animate(source, { x: 1, duration: 1, autoplay: false }).cancel();
    const copy = copyOf(source);
    const first = animate(source, { x: 100, duration: 100, ease: 'linear', autoplay: false });
    engine._lastTickTime = 10;
    const second = animate(copy, { x: 50, duration: 100, ease: 'linear', autoplay: false });
    first.seek(50);
    second.seek(50);
    assert.equal(source.x, 50, 'the copy does not replace the source animation');
    first.cancel();
    second.cancel();
  }
});

test('Hands off replaced tweens on a proxy that wraps the objects it returns like on a plain object', () => {
  const wrap = object => new Proxy(object, {
    get: (target, key) => {
      const value = Reflect.get(target, key);
      return value && typeof value === 'object' ? wrap(value) : value;
    },
  });
  const valuesOf = target => {
    const timeline = createTimeline({ autoplay: false })
      .add(target, { x: [{ to: 30 }, { to: 60 }], duration: 100, ease: 'linear' })
      .add(target, { x: 90, duration: 100, ease: 'linear' }, 150);
    const values = [50, 120, 180, 250, 100, 0].map(time => { timeline.seek(time); return target.x; });
    timeline.cancel();
    return values;
  };
  assert.deepEqual(valuesOf(wrap({ x: 0 })), valuesOf({ x: 0 }));
  const animated = wrap({ x: 0 });
  animate(animated, { x: 1, duration: 1, autoplay: false }).cancel();
  assert.deepEqual(valuesOf({ ...animated, x: 0 }), valuesOf({ x: 0 }), 'a copy that carries the proxy marker registers its own lookups');
});

test('Keeps a proxy that forwards to its target apart from the target', () => {
  for (const proxyFirst of [false, true]) {
    engine._lastTickTime = 0;
    const target = { x: 0, y: 0 };
    const proxy = new Proxy(target, {});
    const onProxy = () => animate(proxy, { y: 100, duration: 100, ease: 'linear', autoplay: false });
    const onTarget = () => animate(target, { x: 100, duration: 100, ease: 'linear', autoplay: false });
    const [first, second] = proxyFirst ? [onProxy(), onTarget()] : [onTarget(), onProxy()];
    first.seek(50);
    second.seek(50);
    assert.deepEqual([target.x, target.y], [50, 50]);
    // A registration through one must not replace the lookups the other one's tweens are listed in.
    first.cancel();
    second.cancel();
    const direct = animate(target, { x: 200, duration: 100, autoplay: false });
    const forwarded = animate(proxy, { x: 300, duration: 100, autoplay: false });
    assert.equal(direct.cancelled, false, 'the proxy does not replace the target animation, as in 4.5');
    direct.revert();
    forwarded.revert();
  }
});

test('Keeps a wrapping proxy over an animated object apart from it', () => {
  const wrap = object => new Proxy(object, {
    get: (target, key) => {
      const value = Reflect.get(target, key);
      return value && typeof value === 'object' ? wrap(value) : value;
    },
  });
  const raw = { x: 0, y: 0 };
  const direct = animate(raw, { x: 100, duration: 100, ease: 'linear', autoplay: false });
  const wrapped = animate(wrap(raw), { y: 100, duration: 100, ease: 'linear', autoplay: false });
  direct.seek(50);
  wrapped.seek(50);
  assert.deepEqual([raw.x, raw.y], [50, 50]);
  direct.cancel();
  wrapped.cancel();
});

test('Rounds adapter values on DOM targets like the general loop', () => {
  registerAdapter().registerTargetAdapter(t => t.isFakeElement === true)
    .registerProperty('level', t => t._level, (t, v) => { t.writes.push(v); t._level = v; });
  const element = { isFakeElement: true, nodeType: 1, style: {}, _level: 0, writes: [], getAttribute() { return null; }, setAttribute() {} };
  const animation = animate(element, { level: 1, duration: 3000, ease: 'linear', autoplay: false });
  animation.seek(1000);
  animation.seek(1234);
  assert.equal(animation._hasSimpleTweens, false);
  assert.deepEqual(element.writes.slice(-2), [.3333, .4113]);
  animation.cancel();
});

test('Preserves simple values during a soft reset', () => {
  const target = { x: 10 };
  const animation = animate(target, { x: [10, 110], duration: 100, ease: 'linear', autoplay: false });
  try {
    animation.seek(50, true);
    assert.equal(target.x, 60);
    animation.reset(true);
    assert.equal(target.x, 60);
    assert.equal(animation._head._value, 10);
    animation.seek(25, true);
    assert.equal(target.x, 35);
  } finally {
    animation.cancel();
  }
});


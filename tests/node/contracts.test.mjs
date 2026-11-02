import assert from 'node:assert/strict';
import { beforeEach, test } from 'node:test';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const root = resolve(process.env.ANIME_TEST_SRC || 'src');
const { animate, createAnimatable, createTimeline, engine, cubicBezier, steps, linear, utils } = await import(pathToFileURL(root + '/index.js'));
const { tickModes } = await import(pathToFileURL(root + '/core/consts.js'));
const { additive } = await import(pathToFileURL(root + '/animation/additive.js'));
engine.useDefaultMainLoop = false;
engine.reqId = 1;

beforeEach(() => {
  engine._startTime = engine._lastTickTime = 0;
});

// A todo contract states the required behavior and fails on the current source.
// The change that makes it pass removes its todo option.

// Ownership

test('Renders an advancing replacement once and attributes onRender to its owner', () => {
  let x = 0;
  const writes = [];
  const target = { get x() { return x; }, set x(value) { writes.push(value); x = value; } };
  const callbacks = [];
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100, onRender: () => callbacks.push('first') })
    .add(target, { x: 200, duration: 100, onRender: () => callbacks.push('second') });
  try {
    for (const [from, to, value, owner] of [[90, 110, 110, 'second'], [110, 90, 90, 'first']]) {
      timeline.seek(from);
      writes.length = callbacks.length = 0;
      timeline.seek(to);
      assert.deepEqual(writes, [value]);
      assert.deepEqual(callbacks, [owner]);
    }
  } finally {
    timeline.cancel();
  }
});

test('Restores a replacement when its frame rate skips its own render', () => {
  for (const delay of [0, 50]) {
    const target = { x: 0 };
    const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
      .add(target, { x: 100, duration: 100 })
      .add(target, { x: 200, duration: 100, delay, frameRate: 1 });
    timeline._tail.requestTick = () => 0;
    try {
      timeline.seek(90);
      timeline.seek(110);
      assert.equal(target.x, delay ? 100 : 110);
      timeline.seek(120);
      assert.equal(target.x, delay ? 100 : 110);
    } finally {
      timeline.cancel();
    }
  }
});

test('Restores a held value when an alternate loop regains ownership', () => {
  const target = { y: 0, z: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, {
      y: { to: 100, delay: 50, duration: 50 },
      z: { to: 100, duration: 100 },
      loop: 1, alternate: true,
    }, 0)
    .add(target, { y: [200, 300], duration: 100 }, 250);
  try {
    timeline.seek(200);
    timeline.seek(350);
    assert.equal(target.y, 300);
    timeline.seek(175);
    assert.equal(target.y, 0);
  } finally {
    timeline.cancel();
  }
});

test('Selects the active keyframe across timeline loops without composition', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, loop: 2, defaults: { ease: 'linear' } })
    .add(target, {
      composition: 'none',
      x: [
        { from: -10, to: 100, duration: 100 },
        { from: 20, to: 200, duration: 100 },
        { from: 30, to: 300, duration: 100 },
      ],
    });
  try {
    for (const [time, value] of [[900, 300], [350, 45], [0, -10], [550, 165], [625, 17.5]]) {
      timeline.seek(time);
      assert.equal(target.x, value, `time=${time}`);
    }
  } finally {
    timeline.cancel();
  }
});

test('Restores a delayed child hold in small backward steps', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100, delay: 50 }, 0)
    .add(target, { x: [50, 200], duration: 100 }, 250);
  try {
    for (let time = 400; time >= 200; time -= 5) timeline.seek(time);
    assert.equal(target.x, 100);
  } finally {
    timeline.cancel();
  }
});

test('Renders the owner once at its endpoint', () => {
  const target = { x: 0 };
  const calls = [];
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 50, onRender: () => calls.push('first') }, 0)
    .add(target, { x: 200, duration: 50, onRender: () => calls.push('second') }, 100);
  try {
    calls.length = 0;
    timeline.seek(150);
    assert.equal(target.x, 200);
    assert.deepEqual(calls, ['second']);
  } finally { timeline.cancel(); }
});

test('Renders a completed replacement once in its own visit', () => {
  let x = 0;
  const writes = [];
  const target = { get x() { return x; }, set x(value) { writes.push(value); x = value; } };
  const calls = [];
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 50, onRender: () => calls.push('first') }, 0)
    .add(target, { x: 200, duration: 50, onRender: () => calls.push('second') }, 100)
    .add({ y: 0 }, { y: 100, duration: 300 }, 0);
  try {
    calls.length = writes.length = 0;
    timeline.seek(200);
    assert.equal(target.x, 200);
    assert.deepEqual(writes, [200]);
    assert.deepEqual(calls, ['second']);
  } finally { timeline.cancel(); }
});

test('Attributes a restored hold to the child that owns it', () => {
  const target = { x: 0 };
  const calls = [];
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100, onRender: () => calls.push('first') }, 0)
    .add(target, { x: [200, 300], duration: 100, onRender: () => calls.push('second') }, 250);
  try {
    timeline.seek(350);
    calls.length = 0;
    timeline.seek(200);
    assert.equal(target.x, 100);
    assert.deepEqual(calls, ['first']);
  } finally { timeline.cancel(); }
});

test('Restores a held owner after crossing a reversed loop', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, reversed: true, loop: 2, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0)
    .add(target, { x: [200, 300], duration: 100 }, 250);
  try {
    timeline.seek(200);
    assert.equal(target.x, 100);
    timeline.seek(500);
    assert.equal(target.x, 100);
  } finally { timeline.cancel(); }
});

test('Restores the earlier hold after discarding a future replacement', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0)
    .add(target, { x: [200, 300], duration: 100, delay: 50 }, 200)
    .add(target, { x: [400, 500], duration: 100, delay: 75 }, 200);
  try {
    timeline.seek(350).seek(260);
    assert.equal(target.x, 100);
  } finally { timeline.cancel(); }
});

test('Uses the parent clock at a replacement boundary with fractional playback rate', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100, playbackRate: 1 / 3 }, 0)
    .add(target, { x: [200, 300], duration: 100 }, 40);
  try {
    timeline.seek(100);
    timeline.seek(40);
    assert.equal(target.x, 200);
  } finally {
    timeline.cancel();
  }
});

test('Keeps the first timeline value before a replacement with a negative delay', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: [83, 83], duration: 175, delay: -25 }, 400)
    .add(target, { x: [11, 95], duration: 75, delay: -25 }, 400);
  try {
    timeline.seek(0);
    assert.equal(target.x, 83);
    timeline.seek(500);
    assert.equal(target.x, 95);
    timeline.seek(0);
    assert.equal(target.x, 83);
  } finally {
    timeline.cancel();
  }
});

test('Updates the direction of a completed child that no longer owns a value', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 50 }, 0)
    .add(target, { x: 200, duration: 100 }, 100);
  try {
    timeline.seek(200);
    const first = timeline._head;
    assert.equal(first.backwards, false);
    timeline.seek(150);
    assert.equal(first.backwards, true);
    assert.equal(target.x, 150);
  } finally { timeline.cancel(); }
});

test('Restores a final value after cancelling an earlier animation', () => {
  const target = { x: 0 };
  engine._lastTickTime = 125;
  const first = animate(target, {
    x: [{ to: 14, duration: 100 }, { to: 75, duration: 75, delay: 50 }],
    ease: 'linear', autoplay: false,
  });
  first.seek(125);
  engine._lastTickTime = 225;
  const second = animate(target, {
    x: 2, duration: 50, delay: 50, loop: 2, alternate: true,
    ease: 'linear', autoplay: false,
  });
  try {
    second.seek(50);
    assert.equal(target.x, 2);
    first.seek(125);
    first.cancel();
    assert.equal(target.x, 14);
    second.seek(225);
    assert.equal(target.x, 2);
  } finally {
    first.cancel();
    second.cancel();
  }
});

test('Keeps an active replacement after reviving an animation with no ownership interval', () => {
  const target = { y: 0 };
  engine._lastTickTime = 148;
  const first = animate(target, { y: 80, duration: 1000, ease: 'out(2)', autoplay: false });
  engine._lastTickTime = 155;
  const second = animate(target, { y: 50, duration: 1000, delay: 300, ease: 'linear', autoplay: false });
  first.cancel();
  engine._lastTickTime = 110;
  const next = animate(target, { y: 50, duration: 500, delay: 300, ease: 'out(2)', autoplay: false });
  try {
    first.seek(1202);
    next.seek(259).restart().pause();
    assert.equal(target.y, 0);
  } finally { first.cancel(); second.cancel(); next.cancel(); }
});

test('Begins a delayed zero-duration child after the timeline crosses zero', () => {
  for (const loop of [0, 1]) {
    const calls = [];
    const timeline = createTimeline({ delay: 1000, loop, autoplay: false,
      onBegin: () => calls.push('timeline.begin'),
      onComplete: () => calls.push('timeline.complete'),
    }).add({ x: 0 }, { x: 100, duration: 0,
      onBegin: () => calls.push('child.begin'),
      onComplete: () => calls.push('child.complete'),
    }).init();
    try {
      timeline.seek(-75).seek(0);
      assert.deepEqual(calls, []);
      timeline.seek(1);
      assert.deepEqual(calls, ['timeline.begin', 'child.begin', 'child.complete', 'timeline.complete']);
    } finally {
      timeline.cancel();
    }
  }
});

test('Begins a child with a negative delay after its timeline starts', () => {
  let begins = 0;
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false }).add(target, {
    x: [0, 100], duration: 100, delay: -25, ease: 'linear',
    onBegin: () => begins++,
  }, 0);
  try {
    timeline.seek(0);
    assert.equal(target.x, 25);
    assert.equal(begins, 0);
    timeline.seek(1).seek(2);
    assert.equal(target.x, 27);
    assert.equal(begins, 1);
  } finally {
    timeline.cancel();
  }
});

// Stretch

test('Inherits the unit of the previous sibling in time order when stretching changes replacement order', () => {
  const target = { x: '0px', y: 0 };
  engine._lastTickTime = 100;
  const first = animate(target, { x: '100px', y: 100, delay: 100, duration: 1000, autoplay: false });
  engine._lastTickTime = 200;
  target.x = '0em';
  const second = animate(target, { x: '200em', duration: 1000, autoplay: false });
  // The stretch scales the delay of the first animation, which now starts at 500, after the second one.
  first.stretch(4400);
  target.x = '9vh';
  engine._lastTickTime = 300;
  const replacement = animate(target, { x: [0, 300], duration: 1000, ease: 'linear', autoplay: false });
  replacement.seek(500);
  assert.equal(target.x, '150em');
  replacement.seek(1000);
  assert.equal(target.x, '300em');
  for (const instance of [first, second, replacement]) instance.cancel();
});

test('Inherits sibling units when stretching preserves replacement order', () => {
  const target = { x: '0px', y: 0 };
  engine._lastTickTime = 100;
  const first = animate(target, { x: '100px', y: 100, duration: 1000, autoplay: false });
  engine._lastTickTime = 200;
  target.x = '0em';
  const second = animate(target, { x: '200em', duration: 1000, autoplay: false });
  first.stretch(4000);
  target.x = '9vh';
  engine._lastTickTime = 300;
  const replacement = animate(target, { x: [0, 300], duration: 1000, ease: 'linear', autoplay: false });
  replacement.seek(500);
  assert.equal(target.x, '150em');
  replacement.seek(1000);
  assert.equal(target.x, '300em');
  for (const instance of [first, second, replacement]) instance.cancel();
});

test('Keeps the start of a standalone animation when it stretches', () => {
  const target = { x: 0 };
  engine._lastTickTime = 1000;
  const first = animate(target, { x: 100, duration: 1000, ease: 'linear', autoplay: false });
  engine._lastTickTime = 1200;
  const second = animate(target, { x: 50, duration: 500, delay: 1000, ease: 'linear', autoplay: false });
  first.stretch(2000);
  // The first animation still starts at 1000, so it owns the property until the second one takes it over at 1400.
  first.seek(300);
  assert.equal(target.x, 15);
  for (const instance of [first, second]) instance.cancel();
});

test('Moves the ownership end when stretch sorts an animation after its replacement', () => {
  const target = { x: 10 };
  engine._lastTickTime = 74;
  const first = animate(target, { x: 100, duration: 200, delay: 100, ease: 'out(2)', autoplay: false });
  engine._lastTickTime = 377;
  const next = animate(target, { x: [10, 90], duration: 1000, ease: 'linear', autoplay: false });
  try {
    first.seek(200).stretch(1500);
    next.stretch(100);
    first.seek(563);
    assert.ok(Math.abs(target.x - 64.88124) < 1e-9, `Expected 64.88124, got ${target.x}`);
  } finally { first.cancel(); next.cancel(); }
});

test('Renders an interior loop value after reducing its duration', () => {
  const target = { x: 0 };
  const animation = animate(target, { x: [10, 90], duration: 1000, loop: 1, ease: 'linear', autoplay: false });
  try {
    animation.seek(1628).stretch(1500).seek(1308);
    assert.equal(target.x, 69.52);
  } finally { animation.cancel(); }
});

test('Renders the final loop after stretch moves the clock past completion', () => {
  const target = { x: 0 };
  let completions = 0;
  const animation = animate(target, {
    x: [0, 100], duration: 1000, loop: 1, ease: 'linear', autoplay: false,
    onComplete: () => completions++,
  });
  try {
    animation.seek(657).stretch(100).seek(1000);
    assert.equal(target.x, 100);
    assert.equal(completions, 1);
    animation.seek(1000);
    assert.equal(target.x, 100);
    assert.equal(completions, 1);
  } finally {
    animation.cancel();
  }
});

for (const [name, initial, middle, end] of [
  ['number', 0, 77, 38],
  ['complex value', '0 0 0', '77 154 231', '38 76 114'],
]) {
  test(`Writes the final ${name} when a stretched loop completes`, () => {
    const target = { value: initial };
    const completed = [];
    const animation = animate(target, {
      value: [{ to: middle, duration: 75 }, { to: end, duration: 100, delay: 50 }],
      loop: 2, alternate: true, ease: 'linear', autoplay: false,
      onComplete: () => completed.push(target.value),
    });
    try {
      animation.seek(350).stretch(225).seek(300);
      assert.equal(target.value, end);
      animation.seek(400);
      assert.deepEqual(completed, [end]);
    } finally {
      animation.cancel();
    }
  });
}

for (const [name, initial, middle, end] of [
  ['number', 0, 77, 38],
  ['complex value', '0 0 0', '77 154 231', '38 76 114'],
]) {
  test(`Completes the final blended ${name} after stretching`, () => {
    const target = { value: initial };
    let completed = 0;
    const animation = animate(target, {
      value: [{ to: middle, duration: 75 }, { to: end, duration: 100, delay: 50 }],
      composition: 'blend', loop: 2, alternate: true, ease: 'linear', autoplay: false,
      onComplete: () => completed++,
    });
    try {
      animation.seek(350);
      additive.update();
      animation.stretch(225).seek(300);
      additive.update();
      assert.equal(target.value, end);
      animation.seek(400);
      assert.equal(completed, 1);
    } finally {
      animation.cancel();
    }
  });
}

// Construction

test('Composes the start value of an animatable when it is set', () => {
  const target = { x: 0 };
  const animatable = createAnimatable(target, { x: 200, ease: 'linear' });
  const animation = animatable.animations.x;
  try {
    // The reset of a set composes the value at the start of the new curve without a write, the getter reads it.
    animatable.x(100, 200, progress => .5 + progress / 2);
    animation.pause();
    assert.equal(animatable.x(), 50);
    assert.equal(target.x, 0);
    animation.seek(100);
    assert.equal(target.x, 75);
  } finally {
    animatable.revert();
  }
});
test('Adds an unrelated child without evaluating existing values', () => {
  let evaluations = 0;
  const first = { x: 0 };
  const second = { x: 0 };
  const timeline = createTimeline({ autoplay: false })
    .add(first, { x: 100, duration: 100, ease: 'linear', modifier: value => { evaluations++; return value; } });
  try {
    evaluations = 0;
    timeline.add(second, { x: 200, duration: 100, ease: 'linear' }, 50);
    assert.equal(evaluations, 0);
    timeline.seek(75);
    assert.deepEqual([first.x, second.x], [75, 50]);
  } finally {
    timeline.cancel();
  }
});

test('Samples before a later explicit start when inserting a delayed child', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0)
    .add(target, { x: [50, 60], duration: 100 }, 300)
    .add(target, { x: 200, duration: 100, delay: 50 }, 275);
  try {
    for (const [time, value] of [[250, 100], [275, 100], [300, 100], [375, 150], [250, 100]]) {
      timeline.seek(time);
      assert.equal(target.x, value, `time=${time}`);
    }
  } finally {
    timeline.cancel();
  }
});

test('Completes once when a later seek stays past the end', () => {
  const target = { x: 0 };
  let updates = 0;
  let completions = 0;
  const animation = animate(target, {
    x: 100, duration: 100, ease: 'linear', autoplay: false,
    onUpdate: () => updates++, onComplete: () => completions++,
  });
  try {
    animation.seek(200);
    animation.seek(300);
    assert.equal(target.x, 100);
    assert.equal(updates, 1);
    assert.equal(completions, 1);
  } finally {
    animation.cancel();
  }
});

test('Passes the modified color endpoint to the next value function', () => {
  const target = { color: 'rgba(0,0,0,1)' };
  let previousValue;
  const animation = animate(target, {
    autoplay: false,
    ease: 'linear',
    color: [
      { to: 'rgba(100,150,200,1)', duration: 100, modifier: value => value / 2 },
      { to: (target, index, total, previous) => {
        previousValue = previous._value;
        return 'rgba(200,200,200,1)';
      }, duration: 100 },
    ],
  });
  try {
    assert.equal(previousValue, 'rgba(50,75,100,0.5)');
    animation.seek(50);
    assert.equal(target.color, 'rgba(35,53,71,0.5)');
    animation.seek(200);
    assert.equal(target.color, 'rgba(200,200,200,1)');
  } finally {
    animation.cancel();
  }
});

// Guards

test('Moves a takeover when a child stretches alone', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 200 }, 0)
    .add(target, { x: [150, 200], duration: 100, delay: 50 }, 50);
  try {
    // The first child stops at the position of the second one and holds its value until the second one starts at 100.
    timeline.seek(80);
    assert.equal(target.x, 25);
    // The stretch scales the delay too, so the second child now starts at 62.5 and takes the property there.
    timeline._tail.stretch(25);
    timeline.seek(80);
    assert.equal(target.x, 185);
    timeline.seek(60);
    assert.equal(target.x, 25);
    timeline.seek(25);
    assert.equal(target.x, 12.5);
  } finally {
    timeline.cancel();
  }
});

test('Keeps the takeovers of a timeline that is cancelled and sought again', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0)
    .add(target, { x: [150, 200], duration: 100 }, 100);
  try {
    timeline.seek(150);
    assert.equal(target.x, 175);
    timeline.cancel();
    for (const [time, value] of [[50, 50], [150, 175], [50, 50], [100, 150]]) {
      timeline.seek(time);
      assert.equal(target.x, value, `time=${time}`);
    }
    assert.equal(timeline._takeovers.length, 1);
  } finally {
    timeline.cancel();
  }
});

test('Keeps a blend between replacement keyframes', () => {
  const target = { x: 0 };
  const animation = animate(target, {
    x: [
      { from: 0, to: 10, duration: 10 },
      { from: 10, to: 20, duration: 10, composition: 'blend' },
      { from: 20, to: 30, duration: 10 },
    ],
    ease: 'linear', autoplay: false,
  });
  try {
    animation.seek(15);
    assert.equal(target.x, 10, 'replacement holds while the blend accumulates separately');
    additive.update();
    assert.equal(target.x, 15);
    animation.seek(25);
    assert.equal(target.x, 25);
    additive.update();
    assert.equal(target.x, 20);
    animation.seek(15);
    additive.update();
    assert.equal(target.x, 15);
  } finally {
    animation.cancel();
  }
});

test('Keeps numeric writes when a setter replaces earlier properties', () => {
  let x = 0;
  let armed = false;
  let replacement;
  const target = {
    y: 0, z: 0,
    get x() { return x; },
    set x(value) {
      x = value;
      if (armed) {
        armed = false;
        replacement = animate(target, {
          x: [100, 200], y: [100, 200],
          duration: 100, ease: 'linear', autoplay: false,
        });
      }
    },
  };
  const first = animate(target, {
    x: 100, y: 100, z: 100,
    duration: 100, ease: 'linear', autoplay: false,
  });
  try {
    armed = true;
    first.seek(50);
    assert.deepEqual([target.x, target.y, target.z], [100, 100, 50]);
  } finally {
    first.cancel();
    replacement?.cancel();
  }
});

test('Keeps remaining writes when a setter replaces earlier properties', () => {
  let x = '0px';
  let armed = false;
  let replacement;
  const target = {
    y: '0px', z: '0px',
    get x() { return x; },
    set x(value) {
      x = value;
      if (armed) {
        armed = false;
        replacement = animate(target, {
          x: ['100px', '200px'], y: ['100px', '200px'],
          duration: 100, ease: 'linear', autoplay: false,
        });
      }
    },
  };
  const first = animate(target, {
    x: '100px', y: '100px', z: '100px',
    duration: 100, ease: 'linear', autoplay: false,
  });
  try {
    armed = true;
    first.seek(50);
    assert.deepEqual([target.x, target.y, target.z], ['100px', '100px', '50px']);
  } finally {
    first.cancel();
    replacement?.cancel();
  }
});

test('Keeps the other targets when a setter removes its current target', () => {
  for (const units of [false, true]) {
    const values = [0, 0, 0];
    let armed = false;
    let animation;
    const targets = values.map((_, index) => ({
      get x() { return units ? `${values[index]}px` : values[index]; },
      set x(value) {
        values[index] = parseFloat(value);
        if (armed && index === 0) {
          armed = false;
          utils.remove(targets[0], animation, 'x');
        }
      },
    }));
    animation = animate(targets, { x: units ? '100px' : 100, duration: 100, ease: 'linear', autoplay: false });
    try {
      armed = true;
      animation.seek(50);
      assert.deepEqual(values, [50, 0, 0]);
      animation.seek(75);
      assert.deepEqual(values, [50, 75, 75]);
    } finally {
      animation.cancel();
    }
  }
});

test('Keeps a replaced loop from writing after its replacement starts', () => {
  const target = { x: 0 };
  const first = animate(target, { x: 100, duration: 100, loop: 2, ease: 'linear', autoplay: false });
  engine._lastTickTime = 150;
  const next = animate(target, { x: [200, 300], duration: 100, ease: 'linear', autoplay: false });
  try {
    next.seek(50);
    assert.equal(target.x, 250);
    // The loop owns the property at its own times before the replacement, like an animation without a loop.
    first.seek(50);
    assert.equal(target.x, 50);
    first.seek(250);
    assert.equal(target.x, 50);
  } finally {
    first.cancel();
    next.cancel();
  }
});

test('Keeps a delayed replacement boundary when an earlier animation revives', () => {
  const target = { y: 5 };
  engine._lastTickTime = 248;
  const first = animate(target, { y: 80, duration: 1000, loop: 1, ease: 'linear', autoplay: false });
  first.cancel().stretch(100);
  engine._lastTickTime = 175;
  const next = animate(target, { y: 50, duration: 500, delay: 300, ease: 'linear', autoplay: false });
  try {
    first.seek(140);
    next.seek(1414).restart().pause();
    assert.equal(target.y, 5);
  } finally { first.cancel(); next.cancel(); }
});

test('Keeps a finished curve available when a later animation starts after its end', () => {
  engine._lastTickTime = 0;
  const target = { x: 0 };
  const first = animate(target, { x: 100, duration: 100, ease: 'linear', autoplay: false });
  engine._lastTickTime = 200;
  const next = animate(target, { x: 200, duration: 100, ease: 'linear', autoplay: false });
  try {
    assert.equal(first.cancelled, false);
    next.cancel();
    first.stretch(400).seek(300);
    assert.equal(target.x, 75);
  } finally { first.cancel(); next.cancel(); }
});

test('Keeps the later child active before an earlier child delay', () => {
  const target = { x: 0, y: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: { to: 100, duration: 100, delay: 50 }, y: 100, duration: 100 }, 0)
    .add(target, { x: 200, duration: 100 }, 0);
  try {
    for (const [time, x, y] of [[25, 50, 25], [75, 150, 75], [25, 50, 25]]) {
      timeline.seek(time);
      assert.deepEqual([target.x, target.y], [x, y]);
    }
  } finally { timeline.cancel(); }
});

test('Samples a delayed predecessor before its first keyframe', () => {
  for (const scale of [1, .001]) {
    const target = { x: 0 };
    const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
      .add(target, { x: [
        { to: 85, duration: 25 * scale, delay: 75 * scale },
        { to: 53, duration: 125 * scale, delay: -25 * scale },
      ] }, 0)
      .add(target, { x: 69, duration: 125 * scale, delay: 25 * scale }, 0);
    try {
      timeline.seek(50 * scale);
      assert.ok(Math.abs(target.x - 13.8) < 1e-9, `Expected 13.8, got ${target.x}`);
    } finally { timeline.cancel(); }
  }
});

test('Samples the latest owner at a shared timeline position', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: [10, 100], duration: 100 }, 0)
    .add(target, { x: [20, 200], duration: 100 }, 0)
    .add(target, { x: 300, duration: 100, delay: 50 }, 0);
  try {
    timeline.seek(100);
    assert.equal(target.x, 160);
  } finally { timeline.cancel(); }
});

test('Replaces a later curve with a new child that has a negative delay', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 100)
    .add(target, { x: 200, duration: 100, delay: -25 }, 100);
  try {
    for (const [time, value] of [[100, 50], [150, 150], [200, 200], [100, 50]]) {
      timeline.seek(time);
      assert.equal(target.x, value);
    }
  } finally { timeline.cancel(); }
});

test('Resets a delayed child when leaving its timeline offset', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, reversed: true, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100, delay: 50 }, 100)
    .add(target, { x: 200, duration: 100, delay: 25 }, 100);
  try {
    timeline.seek(timeline.duration - 140);
    assert.equal(target.x, 30);
    timeline.seek(timeline.duration);
    assert.equal(target.x, 0);
  } finally { timeline.cancel(); }
});

test('Keeps the authored child endpoint when calculating timeline duration', () => {
  const timeline = createTimeline({ autoplay: false }).add({ x: 0 }, { x: 1, duration: .1 }, .2);
  try {
    assert.equal(timeline.duration, .2 + .1);
  } finally { timeline.cancel(); }
});

test('Seeks a child from its own playback position', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0)
    .add(target, { x: 200, duration: 100 }, 100);
  try {
    timeline.seek(50);
    timeline._tail.seek(50);
    assert.equal(target.x, 150);
    assert.equal(timeline.currentTime, 50);
  } finally { timeline.cancel(); }
});

test('Keeps the requested timeline progress visible during loop callbacks', () => {
  const target = { x: 0 };
  const progress = [];
  const timeline = createTimeline({ autoplay: false, loop: 1, onLoop: self => progress.push(self.iterationProgress) })
    .add(target, { x: 100, duration: 100, ease: 'linear' });
  try {
    timeline.seek(150);
    assert.deepEqual(progress, [.5]);
    assert.equal(target.x, 50);
  } finally { timeline.cancel(); }
});

for (let callbackChild = 0; callbackChild < 2; callbackChild++) {
  test(`Preserves the outer render when child ${callbackChild} seeks its parent`, () => {
    const target = { x: 0 };
    let entered = false;
    const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } });
    const seekParent = () => {
      if (entered) return;
      entered = true;
      timeline.seek(100, true);
    };
    timeline.add(target, { x: [0, 100], duration: 1000,
      onBeforeUpdate: callbackChild === 0 ? seekParent : undefined }, 0);
    timeline.add(target, { x: [50, 200], duration: 1000,
      onBeforeUpdate: callbackChild === 1 ? seekParent : undefined }, 500);
    try {
      timeline.seek(750);
      assert.equal(entered, true);
      assert.equal(target.x, 87.5);
      assert.equal(timeline.currentTime, 100);
    } finally { timeline.cancel(); }
  });
}

test('Preserves the outer render when a callback seeks another child', () => {
  const target = { x: 0 };
  let entered = false;
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } });
  timeline.add(target, { x: [0, 100], duration: 1000 }, 0);
  timeline.add(target, {
    x: [50, 200], duration: 1000,
    onBeforeUpdate: () => {
      if (entered) return;
      entered = true;
      timeline._head.seek(100, true);
    },
  }, 500);
  try {
    timeline.seek(750);
    assert.equal(entered, true);
    assert.equal(target.x, 87.5);
    assert.equal(timeline.currentTime, 750);
  } finally { timeline.cancel(); }
});

for (let childSeek = 0; childSeek < 2; childSeek++) {
  test(`Restores the render clock after a nested ${childSeek ? 'child' : 'parent'} callback throws`, () => {
    const target = { x: 0 };
    const error = new Error('nested seek');
    let entered = false;
    let caught = false;
    const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } });
    timeline.add(target, {
      x: [0, 100], duration: 1000,
      onBeforeUpdate: () => { if (entered) throw error; },
    }, 0);
    timeline.add(target, {
      x: [50, 200], duration: 1000,
      onBeforeUpdate: () => {
        if (entered) return;
        entered = true;
        try { (childSeek ? timeline._head : timeline).seek(100); }
        catch (thrown) { assert.equal(thrown, error); caught = true; }
      },
    }, 500);
    try {
      timeline.seek(750);
      assert.equal(caught, true);
      assert.equal(target.x, 87.5);
    } finally { timeline.cancel(); }
  });
}

test('Keeps the current render time when a callback starts a nested seek', () => {
  const target = { x: '0px' };
  let seeking = false;
  const animation = animate(target, {
    x: '100px', duration: 100, ease: 'linear', autoplay: false,
    onBeforeUpdate: self => {
      if (!seeking) {
        seeking = true;
        self.seek(75);
        seeking = false;
      }
    },
  });
  try {
    animation.seek(25);
    assert.equal(target.x, '25px', 'the outer render finishes at its own time');
    assert.equal(animation.currentTime, 75, 'the nested seek updates the public clock');
  } finally {
    animation.cancel();
  }
});

test('Samples recomposed blend values before skipping a finished curve', () => {
  const values = [];
  for (const mode of [tickModes.FORCE, tickModes.AUTO]) {
    const target = { x: '0px 0px', y: 0 };
    const animation = animate(target, {
      x: { to: '100px 200px', duration: 100 },
      y: { to: 100, duration: 1000 },
      ease: 'linear', composition: 'blend', autoplay: false,
    });
    try {
      animation.seek(500);
      additive.update();
      assert.equal(target.x, '100px 200px');
      animation.cancel().seek(600, false, mode);
      additive.update();
      values.push([target.x, target.y]);
    } finally {
      animation.cancel();
    }
  }
  assert.deepEqual(values[1], values[0]);
});

for (const complex of [false, true]) {
  test(`Finishes a short ${complex ? 'complex' : 'numeric'} property after stretch`, () => {
    const target = { x: complex ? '0px 0px' : 0, y: 0 };
    const animation = animate(target, {
      x: { to: complex ? '100px 200px' : 100, duration: 100 },
      y: { to: 100, duration: 1000 }, ease: 'linear', autoplay: false,
    });
    try {
      animation.seek(50).stretch(500).seek(100);
      assert.equal(target.x, complex ? '100px 200px' : 100);
      assert.equal(target.y, 20);
    } finally {
      animation.cancel();
    }
  });
}

test('Keeps a new blended property when cancelling an old blend again', () => {
  const target = { x: 0, y: 0 };
  const params = { duration: 100, ease: 'linear', composition: 'blend', autoplay: false };
  const first = animate(target, { ...params, x: 100 });
  first.cancel();
  const second = animate(target, { ...params, y: 200 });
  try {
    first.cancel();
    second.seek(50);
    additive.update();
    assert.equal(target.y, 100);
  } finally {
    second.cancel();
  }
});

test('Keeps touching keyframes whole when a stretched animation composes again', () => {
  // About 1.7 hours after the engine started, the absolute times are large enough for floating point drift.
  engine._lastTickTime = 5954170.8100000005;
  const target = { x: 0 };
  const animation = animate(target, { x: [{ to: 50, duration: 25 }, { to: 100, duration: 200 }], ease: 'linear', autoplay: false });
  animation.stretch(130);
  animation.cancel();
  // The seek revives the animation, which composes its keyframes again; the first one ends where the second one starts.
  animation.seek(0);
  animation.seek(25 * 130 / 225);
  assert.ok(Math.abs(target.x - 50) < 1e-9);
  animation.cancel();
});

test('Evaluates factory eases for every property', () => {
  for (const [ease, value] of [[cubicBezier(.5, 0, .5, 1), 50], [steps(4), 50], [linear(0, .25, 1), 25]]) {
    const target = { x: 0, y: 0 };
    const animation = animate(target, { x: 100, y: 200, duration: 100, ease, autoplay: false });
    try {
      animation.seek(50);
      assert.deepEqual([target.x, target.y], [value, value * 2]);
    } finally {
      animation.cancel();
    }
  }
});

test('Refreshes mixed keyframes in authored order', () => {
  const calls = [];
  const target = { x: 0 };
  const animation = animate(target, {
    x: [
      { to: () => { calls.push(1); return 10; } },
      { to: () => { calls.push(2); return 20; }, composition: 'blend' },
      { to: () => { calls.push(3); return 30; } },
    ],
    duration: 300, ease: 'linear', autoplay: false,
  });
  try {
    calls.length = 0;
    animation.refresh();
    assert.deepEqual(calls, [1, 2, 3]);
  } finally {
    animation.cancel();
  }
});

test('Restores a held keyframe after cancelling its replacement', () => {
  const target = { x: 0 };
  engine._lastTickTime = 75;
  const first = animate(target, {
    x: [{ to: 71, duration: 50, delay: 50 }, { to: 72, duration: 125, delay: 50 }],
    ease: 'linear', autoplay: false,
  });
  first.seek(225);
  engine._lastTickTime = 200;
  const second = animate(target, { x: 100, duration: 100, delay: 25, ease: 'linear', autoplay: false });
  try {
    first.seek(100);
    first.stretch(200);
    second.seek(0);
    second.cancel();
    assert.equal(target.x, 72);
    // The seek revives the first animation, which takes the property back with all its keyframes.
    first.seek(225);
    assert.equal(target.x, 72);
  } finally {
    first.cancel();
    second.cancel();
  }
});

test('Keeps captured values before a delayed animation starts', () => {
  let x = 0;
  const writes = [];
  const target = { get x() { return x; }, set x(value) { writes.push(value); x = value; } };
  const timeline = createTimeline({ autoplay: false })
    .add(target, { x: 100, duration: 100, delay: 50, ease: 'linear' }, 0);
  try {
    timeline.seek(0);
    assert.deepEqual(writes, []);
    timeline.seek(100);
    assert.equal(target.x, 50);
  } finally {
    timeline.cancel();
  }
});

test('Keeps numeric playback when a middle property is replaced', () => {
  const targets = [{ x: 0 }, { x: 0 }, { x: 0 }];
  const first = animate(targets, { x: 100, duration: 100, ease: 'linear', autoplay: false });
  const second = animate(targets[1], { x: 200, duration: 100, ease: 'linear', autoplay: false });
  try {
    first.seek(50);
    assert.deepEqual(targets.map(target => target.x), [50, 0, 50]);
    second.seek(50);
    assert.deepEqual(targets.map(target => target.x), [50, 100, 50]);
    first.seek(25);
    assert.deepEqual(targets.map(target => target.x), [25, 100, 25]);
  } finally {
    first.cancel();
    second.cancel();
  }
});

test('Writes completed children when the first seek crosses loops', () => {
  const target = { x: 0, y: 0 };
  const timeline = createTimeline({ autoplay: false, loop: 2, defaults: { ease: 'linear' } })
    .add(target, { x: [0, 100], y: [-29, 26], duration: 100 }, 0)
    .add(target, { x: 200, duration: 200 }, 100);
  try {
    timeline.seek(timeline.duration);
    assert.deepEqual([target.x, target.y], [200, 26]);
  } finally {
    timeline.cancel();
  }
});

test('Renders a held curve when an alternate child regains ownership', () => {
  const target = { x: 0, z: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { z: 100, duration: 1000 }, 0)
    .add(target, { x: 1, z: { to: 200, duration: 100 }, duration: 300, loop: 2, alternate: true }, 200);
  try {
    timeline.seek(timeline.duration);
    timeline.seek(100);
    assert.equal(target.z, 10);
    timeline.seek(550);
    assert.equal(target.z, 200);
  } finally {
    timeline.cancel();
  }
});

test('Orders revived replacements by their start after the delay', () => {
  const target = { x: 0 };
  engine._lastTickTime = 200;
  const first = animate(target, { x: 80, duration: 200, ease: 'linear', autoplay: false });
  first.cancel();
  engine._lastTickTime = 0;
  const delayed = animate(target, { x: 50, duration: 200, delay: 300, ease: 'linear', autoplay: false });
  delayed.cancel();
  try {
    first.seek(100);
    assert.equal(target.x, 40);
    delayed.seek(200);
    assert.equal(target.x, 50);
  } finally {
    first.cancel();
    delayed.cancel();
  }
});

test('Renders a completed endpoint before a later replacement starts', () => {
  const target = { x: 0 };
  const first = animate(target, { x: 100, duration: 100, ease: 'linear', autoplay: false });
  engine._lastTickTime = 200;
  const next = animate(target, { x: 200, duration: 100, ease: 'linear', autoplay: false });
  try {
    first.seek(1000);
    assert.equal(target.x, 100);
    first.seek(50);
    assert.equal(target.x, 50);
    first.seek(1000);
    assert.equal(target.x, 100);
  } finally {
    first.cancel();
    next.cancel();
  }
});

test('Keeps the last value when a cancelled replacement leaves a discarded property', () => {
  const targets = [{ x: 0 }, { x: 0 }, { x: 0 }];
  const first = animate(targets, { x: 100, duration: 100, ease: 'linear', autoplay: false });
  const second = animate(targets[1], { x: 200, duration: 100, ease: 'linear', autoplay: false });
  try {
    first.seek(50);
    second.seek(50).cancel();
    first.seek(25);
    assert.deepEqual(targets.map(target => target.x), [25, 100, 25]);
  } finally {
    first.cancel();
    second.cancel();
  }
});

test('Refreshes every target in authored order after one is replaced', () => {
  const targets = [{ x: 0 }, { x: 0 }, { x: 0 }];
  const authored = [];
  const first = animate(targets, { x: target => { authored.push(target); return 100; }, duration: 100, autoplay: false });
  let second;
  try {
    second = animate(targets[1], { x: 200, duration: 100, autoplay: false });
    authored.length = 0;
    first.refresh();
    assert.deepEqual(authored, targets);
  } finally {
    first.cancel();
    second?.cancel();
  }
});

test('Gives the property to the animation that restarts last', () => {
  const target = { x: 0 };
  const first = animate(target, { x: 200, duration: 50, autoplay: false });
  const second = animate(target, { x: 200, duration: 50, delay: 10, autoplay: false });
  try {
    first.seek(100).cancel();
    second.seek(100).cancel();
    first.restart().pause();
    second.restart().pause();
    // The animation that restarts last takes the property, so the first one has nothing left to play.
    assert.equal(first.cancelled, true);
    assert.equal(second.cancelled, false);
  } finally {
    first.cancel();
    second.cancel();
  }
});

test('Keeps a stretched replacement active after an overridden loop seeks', () => {
  for (const values of [[0, 7, 19], ['0px', '7px', '19px'], ['0 0', '7 14', '19 38'], ['#000000', '#070e15', '#132639']]) {
    const [from, firstTo, secondTo] = values;
    const target = { x: from };
    engine._lastTickTime = 75;
    const first = animate(target, { x: firstTo, duration: 125, delay: 50, loop: 2, ease: 'out(2)', autoplay: false });
    first.seek(75);
    const reference = { x: target.x };
    engine._lastTickTime = 200;
    const second = animate(target, { x: secondTo, duration: 25, delay: 25, loop: 1, ease: 'out(2)', autoplay: false });
    const isolated = animate(reference, { x: secondTo, duration: 25, delay: 25, loop: 1, ease: 'out(2)', autoplay: false });
    try {
      first.seek(275);
      second.seek(50);
      second.stretch(925).seek(175);
      isolated.stretch(925).seek(175);
      assert.equal(target.x, reference.x);
    } finally {
      first.cancel();
      second.cancel();
      isolated.cancel();
    }
  }
});

test('Keeps authored tween timing local when stretching a timeline', () => {
  engine._lastTickTime = 5000;
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: [{ to: 100, duration: 100, delay: 50 }, { to: 200, duration: 100, delay: 50 }] }, 100);
  try {
    timeline.stretch(800);
    for (const [time, value] of [[400, 50], [600, 100], [700, 150], [400, 50]]) {
      timeline.seek(time);
      assert.equal(target.x, value);
    }
  } finally {
    timeline.cancel();
  }
});

test('Hands a property over to a child added inside an earlier child', () => {
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0);
  try {
    timeline.add(target, { x: 200, duration: 100 }, 50);
    for (const [time, value] of [[25, 25], [50, 50], [100, 125], [25, 25]]) {
      timeline.seek(time);
      assert.equal(target.x, value);
    }
  } finally {
    timeline.cancel();
  }
});

test('Keeps a child handoff at a negative engine start time and after a timeline stretch', () => {
  engine._startTime = -173.27;
  const target = { x: 0 };
  const timeline = createTimeline({ autoplay: false, defaults: { ease: 'linear' } })
    .add(target, { x: 100, duration: 100 }, 0)
    .add(target, { x: 200, duration: 100 }, 50);
  try {
    timeline.seek(25);
    assert.equal(target.x, 25);
    timeline.seek(100);
    assert.equal(target.x, 125);
    timeline.stretch(300);
    timeline.seek(200);
    assert.equal(target.x, 125);
  } finally { timeline.cancel(); }
});

test('Restores numeric rendering after the previous animation cancels', () => {
  const target = { x: 0, y: 0, z: 0 };
  const first = animate(target, { x: 100, y: 100, z: 100, duration: 1000, ease: 'linear', autoplay: false });
  first.seek(500);
  engine._lastTickTime = 500;
  const replacement = animate(target, { x: 200, y: 200, z: 200, duration: 1000, ease: 'linear', autoplay: false });
  try {
    assert.equal(first.cancelled, true);
    replacement.seek(500);
    assert.deepEqual([target.x, target.y, target.z], [125, 125, 125]);
  } finally {
    first.cancel();
    replacement.cancel();
  }
});

test('Keeps discarded history out of composition after stretching', () => {
  const target = { x: 0 };
  const first = animate(target, { x: 100, duration: 1000, loop: 1, ease: 'linear', autoplay: false });
  engine._lastTickTime = 500;
  const second = animate(target, { x: 200, duration: 1000, ease: 'linear', autoplay: false });
  try {
    first.seek(100);
    second.stretch(2000).seek(500);
    assert.equal(target.x, 50);
  } finally {
    first.cancel();
    second.cancel();
  }
});

// Colors

test('Parses every CSS color syntax to the same RGBA channels', () => {
  const colors = {
    'rgb(255, 168, 40)': [255, 168, 40, 1],
    'rgba(255, 168, 40, .2)': [255, 168, 40, .2],
    'rgb(255 168 40 / 20%)': [255, 168, 40, .2],
    'rgb(100%, 0%, 0%)': [255, 0, 0, 1],
    'hsl(44, 100%, 59%)': [255, 199, 46, 1],
    'hsla(44, 100%, 59%, .2)': [255, 199, 46, .2],
    'hsl(44deg 100% 59% / .2)': [255, 199, 46, .2],
    'hsl(0, 0%, 50%)': [128, 128, 128, 1],
    'oklch(0.628 0.2577 29.23 / 50%)': [255, 0, 0, .5],
    'color(srgb 1 0 0)': [255, 0, 0, 1],
    '#FF4B4B33': [255, 75, 75, .2],
    'red': [0, 0, 0, 1],
  };
  for (const color in colors) assert.deepEqual(utils.parseColor(color), colors[color], color);
});

test('Returns a color from get in the rgba form that animate writes', () => {
  const target = { color: 'hsl(0, 0%, 50%)', width: '10px', count: 3 };
  assert.equal(utils.get(target, 'color'), 'rgba(128,128,128,1)');
  assert.equal(utils.get(target, 'width'), '10px');
  assert.equal(utils.get(target, 'count'), 3);
});

// Editor

test('Gives the editor the name and arguments of each factory ease', async () => {
  const { globals } = await import(pathToFileURL(root + '/core/globals.js'));
  const { eases } = await import(pathToFileURL(root + '/easings/eases/parser.js'));
  const tweaks = [];
  globals.editor = /** @type {any} */({ createTweak: (result, type, name, args) => { tweaks.push([type, name, args]); return result; } });
  try {
    assert.equal(eases.out(3)(.5), .875);
    assert.equal(typeof eases.inOutBack(2)(.5), 'number');
    assert.equal(typeof eases.outInElastic()(.5), 'number');
    assert.equal(eases.outQuad(.5), .75);
    assert.deepEqual(tweaks, [['Ease', 'out', [3]], ['Ease', 'inOutBack', [2]], ['Ease', 'outInElastic', []]]);
  } finally {
    globals.editor = null;
  }
});

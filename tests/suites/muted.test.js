import {
  expect,
} from '../utils.js';

import {
  animate,
  createTimeline,
  createTimer,
} from '../../dist/modules/index.js';

import {
  additive,
} from '../../dist/modules/animation/additive.js';

suite('Muted', () => {
  const params = { duration: 200, ease: 'linear', autoplay: false };

  for (const array of [false, true]) {
    for (const muted of [undefined, false, true]) {
      test(`${muted === false ? 'Overrides' : 'Inherits'} the mute default for a synced ${array ? 'array' : 'target'} with muted ${muted}`, () => {
        const target = { x: 0 };
        let pauses = 0;
        const child = animate(target, { x: 100, duration: 200, ease: 'linear', onPause: () => pauses++ });
        const tl = createTimeline({ defaults: { muted: true }, autoplay: false });
        try {
          tl.sync({ target: array ? [child] : child, muted }, 0).seek(100, true);
          expect(target.x).to.equal(muted === false ? 50 : 0);
          expect(pauses).to.equal(muted === false ? 1 : 0);
          expect(child.paused).to.equal(muted === false);
        } finally { tl.cancel(); child.cancel(); }
      });
    }
  }

  test('Keeps muted tween targets untouched while a sibling runs', () => {
    const targets = [{ x: 10, y: 0 }, { x: 20, y: 0 }];
    let modifiers = 0;
    const animation = animate(targets, {
      x: { from: 0, to: 100, muted: true, modifier: value => { modifiers++; return value; } },
      y: 200, duration: 200, ease: 'linear', autoplay: false,
    });
    modifiers = 0;
    animation.seek(150);
    expect(targets.map(target => [target.x, target.y])).to.deep.equal([[10, 150], [20, 150]]);
    expect(modifiers).to.equal(0);
    animation.cancel();
  });

  for (const timeline of [false, true]) {
    test(`Applies ${timeline ? 'timeline' : 'animation'} property muting to every staggered target`, () => {
      const targets = [{ x: 0, y: 0 }, { x: 0, y: 0 }];
      for (const muted of [false, true, false]) {
        const props = {
          x: { to: 100, muted }, y: 200,
          delay: (_, index) => index * 50,
          duration: 200, ease: 'linear', autoplay: false,
        };
        const animation = timeline ? createTimeline({ autoplay: false }).add(targets, props) : animate(targets, props);
        animation.seek(150);
        expect(targets.map(target => [target.x, target.y])).to.deep.equal([[muted ? 0 : 75, 150], [muted ? 0 : 50, 100]]);
        animation.revert();
        expect(targets.map(target => [target.x, target.y])).to.deep.equal([[0, 0], [0, 0]]);
      }
    });
  }

  test('Restores active transforms when the last transform is muted', () => {
    const target = document.createElement('div');
    target.style.transform = 'rotate(20deg)';
    const animation = animate(target, {
      x: 100, rotate: { to: 90, muted: true },
      duration: 200, ease: 'linear', autoplay: false,
    });
    for (const [time, x] of [[100, 50], [150, 75], [50, 25]]) {
      animation.seek(time);
      expect(target.style.transform.trim()).to.equal(`translateX(${x}px) rotate(20deg)`);
    }
    animation.revert(false);
    expect(target.style.transform).to.equal('rotate(20deg)');
  });

  for (const timeline of [false, true]) {
    test(`Preserves ${timeline ? 'timeline' : 'animation'} time and suppresses callbacks when muted`, () => {
      const target = { x: 10 };
      const calls = [];
      const callbacks = Object.fromEntries(['onBegin', 'onBeforeUpdate', 'onUpdate', 'onRender', 'onLoop', 'onPause', 'onComplete']
        .map(name => [name, () => calls.push(name)]));
      const animation = timeline
        ? createTimeline({ muted: true, autoplay: false, loop: 1, alternate: true, ...callbacks }).add(target, { x: [0, 100], duration: 200, ease: 'linear', ...callbacks }, 0)
        : animate(target, { x: [0, 100], duration: 200, ease: 'linear', muted: true, autoplay: false, loop: 1, alternate: true, ...callbacks });
      animation.seek(150);
      expect(animation.currentTime).to.equal(150);
      expect(target.x).to.equal(10);
      animation.seek(250).seek(400).resume().pause();
      expect(animation.currentTime).to.equal(400);
      expect(target.x).to.equal(10);
      expect(calls).to.deep.equal([]);
      animation.cancel();
    });
  }

  test('Uses the same object fields for muted and active animations', () => {
    const target = { x: 0 };
    const animation = animate(target, { x: 100, duration: 200, ease: 'linear', autoplay: false });
    const muted = animate({ x: 0 }, { x: 100, muted: true, duration: 200, ease: 'linear', autoplay: false });
    expect(Object.keys(animation)).to.deep.equal(Object.keys(muted));
    expect(Object.keys(animation._head)).to.deep.equal(Object.keys(muted._head));
    animation.cancel();
    muted.cancel();
  });

  test('Leaves muted timer completion listeners pending', async () => {
    const timer = createTimer({ duration: 100, autoplay: false, muted: true });
    let completed = 0;
    timer.then(() => { completed++; });
    timer.seek(100);
    await Promise.resolve();
    expect(completed).to.equal(0);
    timer.cancel();
  });

  test('Skips the cached output of a fully muted blend', () => {
    let value = 0;
    let writes = 0;
    const target = { get x() { return value; }, set x(next) { value = next; writes++; } };
    const animation = animate(target, { x: 100, muted: true, composition: 'blend', duration: 200, ease: 'linear', autoplay: false });
    animation.seek(150, true);
    additive.update();
    expect(value).to.equal(0);
    expect(writes).to.equal(0);
    animation.cancel();
  });

  test('Skips the modifier of a muted property during construction', () => {
    let calls = 0;
    const animation = animate({ x: 0 }, { ...params, x: { to: 100, muted: true, modifier: value => { calls++; return value; } } });
    expect(calls).to.equal(0);
    animation.revert();
  });

  test('Cancels a fully replaced animation despite its muted properties', () => {
    const target = { x: 0, y: 0 };
    const animation = animate(target, { ...params, x: 100, y: { to: 100, muted: true } });
    const replacement = animate(target, { ...params, x: 200 });
    expect(animation.cancelled).to.equal(true);
    replacement.revert();
  });

  test('Keeps a muted call position without running its callback', () => {
    let calls = 0;
    const timeline = createTimeline({ autoplay: false })
      .add({ x: 0 }, { ...params, x: 100 }, 0)
      .call({ callback: () => calls++, muted: true }, 100);
    timeline.seek(200);
    expect(calls).to.equal(0);
    timeline.revert();
  });

  test('Leaves the user animation unpaused and unseeked on a muted sync', () => {
    const target = { x: 0 };
    const animation = animate(target, { ...params, x: 100 }).seek(100, true).resume();
    const timeline = createTimeline({ autoplay: false }).sync({ target: animation, muted: true }, 0);
    timeline.seek(150, true);
    expect(animation.paused).to.equal(false);
    expect(animation.currentTime).to.equal(100);
    expect(target.x).to.equal(50);
    timeline.revert();
    expect(target.x).to.equal(50);
    animation.revert();
  });

  for (const composition of ['replace', 'blend', 'none']) {
    for (const level of ['property', 'animation', 'timeline']) {
      test(`Ignores a muted ${level} under ${composition} composition`, () => {
        const target = { x: 0 };
        const active = animate(target, { ...params, x: 100, composition });
        const mutedParams = { ...params, composition, x: level === 'property' ? { to: 200, muted: true } : 200, muted: level === 'animation' };
        const muted = level === 'timeline' ? createTimeline({ autoplay: false, muted: true }).add(target, mutedParams, 0) : animate(target, mutedParams);
        for (const [time, expected] of [[100, 50], [150, 75], [50, 25]]) {
          active.seek(time, true);
          muted.seek(time, true);
          additive.update();
          expect(target.x).to.equal(expected);
        }
        muted.revert();
        expect(target.x, 'reverting an absent contribution must not erase the active output').to.equal(25);
        active.revert();
      });
    }
  }

  test('Keeps the previous child duration when a muted child follows', () => {
    const target = { x: 0 };
    const timeline = createTimeline({ autoplay: false })
      .add(target, { ...params, x: 100 }, 0)
      .add(target, { ...params, x: 200, muted: true }, 100);
    for (const [time, expected] of [[150, 75], [50, 25], [200, 100]]) {
      timeline.seek(time, true);
      expect(target.x).to.equal(expected);
    }
    timeline.revert();
    expect(target.x).to.equal(0);
  });

  test('Ignores a muted keyframe destination from an active keyframe', () => {
    const target = { x: 10 };
    const animation = animate(target, { ...params, x: [
      { to: 100, duration: 100, muted: true },
      { to: 200, duration: 100 },
    ] });
    animation.seek(150, true);
    expect(target.x).to.equal(105);
    animation.revert();
    expect(target.x).to.equal(10);
  });

});

import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import { animate, createTimeline, engine, stagger, utils } from '../../dist/modules/index.js';

import {
  valueTypes,
} from '../../dist/modules/core/consts.js';

suite('Keyframes', () => {
  test('An array of one raw value should be considered as a simple value', () => {
    const animation = animate('#target-id', {
      translateX: [50],
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(50);
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
  });

  test('An array of two raw values should be converted to "From To" values', () => {
    const animation = animate('#target-id', {
      translateX: [-100, 100],
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(-100);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
  });

  test('The first value of an array of more than two raw values should be used as a from value', () => {
    const animation = animate('#target-id', {
      translateX: [-100, 100, 50],
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(-100);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');

    expect(getChildAtIndex(animation, 1)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(100);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(50);
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');
  });

  test('An array of two object values should be converted to keyframes', () => {
    const animation = animate('#target-id', {
      translateX: [
        { to: -100 },
        { to: 100 }
      ],
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-100);
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');

    expect(getChildAtIndex(animation, 1)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(-100);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');
  });

  test('Unspecified keyframe duration should be inherited from instance duration and devided by the number of keyframes', () => {
    const animation = animate('#target-id', {
      translateX: [
        { to: -100 },
        { to: 100 },
        { to: 50 },
        { to: 0 }
      ],
      duration: 2000,
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(500); // 2000 / 4
    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(500); // 2000 / 4
    expect(getChildAtIndex(animation, 2)._changeDuration).to.equal(500); // 2000 / 4
    expect(getChildAtIndex(animation, 3)._changeDuration).to.equal(500); // 2000 / 4
  });

  test('Mixed unspecified keyframe duration should be inherited from instance duration and devided by the number of keyframes', () => {
    const animation = animate('#target-id', {
      translateX: [
        { to: -100, duration: 800 },
        { to: 100 },
        { to: 50 },
        { to: 0, duration: 1200 }
      ],
      duration: 2000,
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(800); // Specified duration
    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(500); // 2000 / 4
    expect(getChildAtIndex(animation, 2)._changeDuration).to.equal(500); // 2000 / 4
    expect(getChildAtIndex(animation, 3)._changeDuration).to.equal(1200); // Specified duration
  });

  test('Single keyframe duration should be normaly inherited when only one keyframe is set', () => {
    const animation = animate('#target-id', {
      translateX: [{ to: -100 }],
      duration: 2000,
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(2000); // 2000 / 4
  });

  test('First keyframe should be transfered in the _delay animation', () => {
    const animation = animate('#target-id', {
      translateX: [
        { to: -100 },
        { to: 100 },
      ],
      delay: 200,
      endDelay: 400,
      autoplay: false,
    });

    expect(animation._delay).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(0);
  });

  test('General keyframes instance parameters inheritance', () => {
    const roundModifier10 = v => utils.round(v, 10);
    const roundModifier05 = v => utils.round(v, 5);
    const animation = animate('#target-id', {
      translateX: [
        { to: -100 },
        { to: 100, duration: 100, delay: 300, ease: 'linear', modifier: roundModifier10 },
        { to: 50 },
      ],
      translateY: [
        { to: -200 },
        { to: 200 },
        { to: 100 },
      ],
      duration: 1500,
      delay: 200,
      modifier: roundModifier05,
      ease: 'outQuad',
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(500); // 1500 / 3
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getChildAtIndex(animation, 0)._ease(.5)).to.equal(.75);
    expect(getChildAtIndex(animation, 0)._modifier).to.equal(roundModifier05);

    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(100);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(300);
    expect(getChildAtIndex(animation, 1)._ease(.5)).to.equal(.5);
    expect(getChildAtIndex(animation, 1)._modifier).to.equal(roundModifier10);

    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-100);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(-100);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(100);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(50);

    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(-200);
    expect(getChildAtIndex(animation, 4)._fromNumber).to.equal(-200);
    expect(getChildAtIndex(animation, 4)._toNumber).to.equal(200);
    expect(getChildAtIndex(animation, 5)._fromNumber).to.equal(200);
    expect(getChildAtIndex(animation, 5)._toNumber).to.equal(100);
  });

  test('Array keyframes parameters inheritance', () => {
    const roundModifier10 = v => utils.round(v, 10);
    const roundModifier05 = v => utils.round(v, 5);
    const animation = animate('#target-id', {
      keyframes: [
        { translateY: -40 },
        { translateX: 250, duration: 100, delay: 300, ease: 'linear', modifier: roundModifier10 },
        { translateY: 40 },
        { translateX: 0 },
        { translateY: 0 }
      ],
      duration: 1500,
      delay: 200,
      modifier: roundModifier05,
      ease: 'outQuad',
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(300); // 1500 / 5
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0); // Inherited because its the first keyframe
    expect(getChildAtIndex(animation, 0)._ease(.5)).to.equal(.75);
    expect(getChildAtIndex(animation, 0)._modifier).to.equal(roundModifier05);

    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(100);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(300);
    expect(getChildAtIndex(animation, 1)._ease(.5)).to.equal(.5); // Linear ease
    expect(getChildAtIndex(animation, 1)._modifier).to.equal(roundModifier10);

    // translateY
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-40);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(-40);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(-40);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(-40);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(40);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(40);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(40);
    expect(getChildAtIndex(animation, 4)._fromNumber).to.equal(40);
    expect(getChildAtIndex(animation, 4)._toNumber).to.equal(0);

    // translateX
    expect(getChildAtIndex(animation, 5)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 5)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 6)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 6)._toNumber).to.equal(250);
    expect(getChildAtIndex(animation, 7)._fromNumber).to.equal(250);
    expect(getChildAtIndex(animation, 7)._toNumber).to.equal(250);
    expect(getChildAtIndex(animation, 8)._fromNumber).to.equal(250);
    expect(getChildAtIndex(animation, 8)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 9)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 9)._toNumber).to.equal(0);
  });

  test('Array keyframes units inheritance', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: [
        { to: [-20, -40] },
        { to: '5rem' },
        { to: '100%' },
        { to: 0 },
        { to: '10%' },
        { to: [50, 200] },
        { to: [25, '100px'] },
      ],
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 1)._unit).to.equal('rem'); // switch to rem
    expect(getChildAtIndex(animation, 2)._unit).to.equal('%'); // switch to %
    expect(getChildAtIndex(animation, 3)._unit).to.equal('%'); // inherit %
    expect(getChildAtIndex(animation, 4)._unit).to.equal('%'); // switch back to %
    expect(getChildAtIndex(animation, 5)._unit).to.equal('%');
    expect(getChildAtIndex(animation, 6)._unit).to.equal('px'); // switch to px

    expect($target.style.transform).to.equal('translateX(-20px)');

  });

  test('Array keyframes with playbackEase', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      keyframes: [
        { y: -40 },
        { x: 250 },
        { y: 40 },
        { x: 0, ease: 'outQuad' },
        { y: 0 }
      ],
      duration: 1000,
      playbackEase: 'inOutQuad',
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._ease(.5)).to.equal(.5); // All tweens should default to linear ease
    expect(getChildAtIndex(animation, 1)._ease(.5)).to.equal(.5);
    expect(getChildAtIndex(animation, 2)._ease(.5)).to.equal(.5);
    expect(getChildAtIndex(animation, 3)._ease(.5)).to.equal(.75); // Except when they have an ease parameter defined

    // Easing should be continuous throughout the sequence
    animation.seek(250);
    expect($target.style.transform).to.equal('translate(0px, -25px)');
    animation.seek(500);
    expect($target.style.transform).to.equal('translate(250px, 0px)');
    animation.seek(750);
    expect($target.style.transform).to.equal('translate(0px, 25px)');
  });

  test('Percentage based keyframes values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      keyframes: {
        '0%'  : { x: 100, y: 100 },
        '20%' : { x: -100 },
        '50%' : { x: 100 },
        '80%' : { x: -100 },
        '100%': { x: 100, y: -100 },
      },
      duration: 1000,
      ease: 'linear',
      autoplay: false,
    });

    // Easing should be continuous throughout the sequence
    animation.seek(0);
    expect($target.style.transform).to.equal('translate(100px, 100px)');
    animation.seek(200);
    expect($target.style.transform).to.equal('translate(-100px, 60px)');
    animation.seek(500);
    expect($target.style.transform).to.equal('translate(100px, 0px)');
    animation.seek(800);
    expect($target.style.transform).to.equal('translate(-100px, -60px)');
    animation.seek(1000);
    expect($target.style.transform).to.equal('translate(100px, -100px)');
  });

  test('Percentage based keyframes with float percentage values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      keyframes: {
        '0%'  : { x: 0 },
        '21.5%' : { x: 50 },
        '100%': { x: 100 },
      },
      duration: 1000,
      ease: 'linear',
      autoplay: false,
    });

    // Easing should be continuous throughout the sequence
    animation.seek(215);
    expect($target.style.transform).to.equal('translateX(50px)');
  });

  test('Array based keyframes with floating point durations', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: [100,200,300,400],
      ease: 'linear',
      duration: 4000, // each keyframes duration: utils.round(4000/3, 12)
      autoplay: false
    });

    const keyDuration = utils.round(4000/3, 12);

    expect(animation.duration).to.equal(keyDuration * 3);

    // Easing should be continuous throughout the sequence
    animation.seek(0);
    expect($target.style.transform).to.equal('translateX(100px)');
    animation.seek(keyDuration * 1);
    expect($target.style.transform).to.equal('translateX(200px)');
    animation.seek(keyDuration * 2);
    expect($target.style.transform).to.equal('translateX(300px)');
    animation.seek(keyDuration * 3);
    expect($target.style.transform).to.equal('translateX(400px)');
  });

  test('Forward seek skipping a short trailing keyframe restores the last keyframe\'s to value', () => {
    const a = { y: 0 };
    const b = { y: 0 };
    const tl = createTimeline({ autoplay: false })
      .add([a, b], {
        y: [
          { to: 1, duration: stagger([100, 50]) },
          { to: 2, duration: stagger([100, 50]) },
          { to: 3, duration: 10 },
        ],
        ease: 'linear',
      }, 0);

    // Saturate.
    tl.seek(250);
    expect(a.y).to.equal(3);
    expect(b.y).to.equal(3);

    // Backward into b's second keyframe range (also a's first).
    tl.seek(75);
    expect(b.y).to.equal(1.5);

    // Forward jumping over b's tiny last keyframe range [100, 110]. b's last keyframe must still write its to value.
    tl.seek(115);
    expect(b.y).to.equal(3);
  });

  test('Backward seek into the delay gap between two staggered keyframes restores the first keyframe\'s to value', () => {
    const N = 31;
    const targets = Array.from({ length: N }, () => ({ y: 1 }));
    const tl = createTimeline({ autoplay: false }).add(targets, {
      y: [
        { to: -1, duration: 300, delay: stagger([0, 196], { from: 'center' }) },
        { to: 2, duration: 200, delay: stagger(90, { from: 'center' }) },
      ],
      ease: 'linear',
    });

    const inGap = [];
    let i = 0;
    let tw = tl._head._head;
    while (tw) {
      const kf1End = tw._absoluteStartTime + tw._changeDuration;
      tw = tw._next;
      const kf2Start = tw._absoluteStartTime;
      if (kf1End < 700 && kf2Start > 700) inGap.push(i);
      tw = tw._next;
      i++;
    }

    tl.seek(tl.duration);
    tl.seek(700);
    for (const j of inGap) expect(targets[j].y).to.equal(-1);

    tl.seek(0);
    tl.seek(700);
    for (const j of inGap) expect(targets[j].y).to.equal(-1);
  });

  test('Sequential staggered keyframes stay non-overlapping under arbitrary engine offsets', () => {
    // The global setup.js pin keeps the offset at 0 by default. Sweep several non-zero offsets to make sure the precision-matched _absoluteUpdateStartTime holds for the values a long-running browser session can hit.
    const N = 31;
    for (const offset of [173.27, 1000, 5234.5, 17300, 50000]) {
      engine._startTime = engine._lastTickTime - offset;
      const targets = Array.from({ length: N }, () => ({ y: 1 }));
      const tl = createTimeline({ autoplay: false }).add(targets, {
        y: [
          { to: -1, duration: 300, delay: stagger([0, 196], { from: 'center' }) },
          { to: 2, duration: 200, delay: stagger(90, { from: 'center' }) },
        ],
      });
      let tw = tl._head._head;
      while (tw) {
        expect(tw._isOverlapped, `kf1 overlap at offset=${offset}`).to.equal(0);
        tw = tw._next;
        tw = tw._next;
      }
    }
  });

  test('Backward seek past the start of a keyframe sequence restores the first keyframe\'s from value', () => {
    const target = { y: 0 };
    const tl = createTimeline({ autoplay: false })
      .add(target, {
        y: [
          { to: 1, duration: 10 },
          { to: 0.5, duration: 200 },
        ],
        ease: 'linear',
      }, 100);

    // Forward past the entire sequence so both tween _currentTimes land at their ends.
    tl.seek(400);
    expect(target.y).to.equal(0.5);

    // Jump backward into the second keyframe's range (mid kf 1).
    tl.seek(150);
    expect(target.y).to.equal(0.9);

    // Jump backward across the first keyframe's tiny range to before its start.
    tl.seek(50);
    expect(target.y).to.equal(0);
  });

  test('Backward seek updates a single from-to keyframe inside a timeline with delay', () => {
    const target = { y: 0 };
    const tl = createTimeline({ autoplay: false })
      .label('START')
      .add(target, {
        y: [-8, 0],
        duration: 100,
        delay: 1763,
        ease: 'linear',
      });
    tl.seek(tl.duration);
    expect(target.y).to.equal(0);
    tl.seek(tl.duration - 50);
    expect(target.y).to.equal(-4);
    tl.seek(tl.duration - 100);
    expect(target.y).to.equal(-8);
  });

  test('Backward seek across loop iterations updates a delayed keyframe', () => {
    const target = { y: 0 };
    const tl = createTimeline({ autoplay: false }).add(target, {
      y: [-8, 0],
      duration: 100,
      delay: 100,
      loop: 2,
      ease: 'linear',
    });
    expect(tl.duration).to.equal(400);
    tl.seek(400);
    expect(target.y).to.equal(0);
    tl.seek(350); expect(target.y).to.equal(-4);
    tl.seek(300); expect(target.y).to.equal(-8);
    tl.seek(250); expect(target.y).to.equal(-4);
    tl.seek(200); expect(target.y).to.equal(-8);
    tl.seek(150); expect(target.y).to.equal(-4);
    tl.seek(100); expect(target.y).to.equal(-8);
  });

  test('Backward seek across alternate loop iterations updates a delayed keyframe', () => {
    const target = { y: 0 };
    const tl = createTimeline({ autoplay: false }).add(target, {
      y: [-8, 0],
      duration: 100,
      delay: 100,
      loop: 1,
      alternate: true,
      ease: 'linear',
    });
    expect(tl.duration).to.equal(300);
    tl.seek(300);
    expect(target.y).to.equal(-8);
    tl.seek(250); expect(target.y).to.equal(-4);
    tl.seek(200); expect(target.y).to.equal(0);
    tl.seek(150); expect(target.y).to.equal(-4);
    tl.seek(100); expect(target.y).to.equal(-8);
  });

  test('Backward seek updates a multi-keyframe property with delay', () => {
    const target = { y: 0 };
    const tl = createTimeline({ autoplay: false }).add(target, {
      y: [{ to: 50, duration: 50 }, { to: 0, duration: 50 }],
      delay: 100,
      ease: 'linear',
    });
    expect(tl.duration).to.equal(200);
    tl.seek(200);
    expect(target.y).to.equal(0);
    tl.seek(175); expect(target.y).to.equal(25);
    tl.seek(150); expect(target.y).to.equal(50);
    tl.seek(125); expect(target.y).to.equal(25);
    tl.seek(100); expect(target.y).to.equal(0);
  });

  test('Seeking past the end and back into a delayed keyframe restores the active value', () => {
    const target = { y: 0 };
    const tl = createTimeline({ autoplay: false }).add(target, {
      y: [-8, 0],
      duration: 100,
      delay: 100,
      ease: 'linear',
    });
    expect(tl.duration).to.equal(200);
    tl.seek(500);
    expect(target.y).to.equal(0);
    tl.seek(150);
    expect(target.y).to.equal(-4);
    tl.seek(100);
    expect(target.y).to.equal(-8);
  });

  test('Backward seek updates a single object-form keyframe in a timeline', () => {
    const target = { x: 0 };
    const tl = createTimeline({ autoplay: false })
      .add(target, { x: { to: 100 }, duration: 100, ease: 'linear' }, 100);
    tl.seek(200);
    expect(target.x).to.equal(100);
    tl.seek(150);
    expect(target.x).to.equal(50);
    tl.seek(50);
    expect(target.x).to.equal(0);
  });

  test('Backward seek updates a single object-form keyframe alongside a multi-keyframe property', () => {
    const target = { x: 0, y: 0 };
    const animation = animate(target, {
      x: { to: 100 },
      y: [
        { to: 50, duration: 50 },
        { to: 100, duration: 50 },
      ],
      duration: 100,
      ease: 'linear',
      autoplay: false,
    });
    animation.seek(100);
    expect(target.x).to.equal(100);
    expect(target.y).to.equal(100);
    animation.seek(50);
    expect(target.x).to.equal(50);
    expect(target.y).to.equal(50);
    animation.seek(0);
    expect(target.x).to.equal(0);
    expect(target.y).to.equal(0);
  });

});

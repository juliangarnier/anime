import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import { animate, utils } from '../../dist/modules/index.js';

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

});

import {
  expect,
  getChildAtIndex,
  forEachChildren,
} from '../utils.js';

import {
  testObject,
} from '../setup.js';

import {
  animate,
  createTimer,
  utils,
} from '../../dist/modules/index.js';

import {
  minValue,
  tweenTypes,
} from '../../dist/modules/core/consts.js';

suite('Animations', () => {

  // Animation types

  test('Get Attribute tween type with SVG attribute values', () => {
    const animation = animate('#svg-element path', {
      stroke: '#FFFFFF',
      d: 'M80 20c-30 0 0 30-30 30',
      duration: 100,
    });

    expect(getChildAtIndex(animation, 0)._tweenType).to.equal(tweenTypes.ATTRIBUTE);
    expect(getChildAtIndex(animation, 1)._tweenType).to.equal(tweenTypes.ATTRIBUTE);
  });

  test('Get CSS tween type with DOM attribute values', () => {
    const animation = animate('.with-width-attribute', {
      width: 100,
      duration: 100,
    });

    expect(getChildAtIndex(animation, 0)._tweenType).to.equal(tweenTypes.CSS);
    expect(getChildAtIndex(animation, 1)._tweenType).to.equal(tweenTypes.CSS);
  });

  test('Get CSS_VAR tween type with CSS variables properties', () => {
    const animation = animate(':root', {
      '--width': 200,
      duration: 100,
    });

    expect(getChildAtIndex(animation, 0)._tweenType).to.equal(tweenTypes.CSS_VAR);
  });

  test('Get Transform tween type with mixed transforms values', () => {
    const animation = animate('#target-id', {
      translateX: 100,
      translateY: 100,
      translateZ: 100,
      rotate: 100,
      rotateX: 100,
      rotateY: 100,
      rotateZ: 100,
      scale: 100,
      scaleX: 100,
      scaleY: 100,
      scaleZ: 100,
      skew: 100,
      skewX: 100,
      skewY: 100,
      perspective: 100,
      duration: 100,
    });

    forEachChildren(animation, tween => {
      expect(tween._tweenType).to.equal(tweenTypes.TRANSFORM);
    });
  });

  test('Get CSS tween type with mixed values', () => {
    const animation = animate('.with-inline-styles', {
      width: 50,
      height: 50,
      fontSize: 50,
      backgroundColor: '#FFF',
      duration: 100,
    });

    forEachChildren(animation, tween => {
      expect(tween._tweenType).to.equal(tweenTypes.CSS);
    });
  });

  test('Get Object tween type with input values', () => {
    const animation = animate('#input-number', {
      value: 50,
      duration: 100,
    });

    expect(getChildAtIndex(animation, 0)._tweenType).to.equal(tweenTypes.OBJECT);
  });

  test('Get Object tween type with plain JS object values', () => {
    const animation = animate(testObject, {
      plainValue: 20,
      valueWithUnit: '20px',
      multiplePLainValues: '32 64 128 256',
      multipleValuesWithUnits: '32px 64em 128% 25ch',
      duration: 100,
    });

    forEachChildren(animation, tween => {
      expect(tween._tweenType).to.equal(tweenTypes.OBJECT);
    });
  });

  test('Get Object tween type with DOM properties that can\'t be accessed with getAttribute()', () => {
    const animation = animate('#target-id', {
      innerHTML: 9999,
      duration: 100,
    });

    expect(getChildAtIndex(animation, 0)._tweenType).to.equal(tweenTypes.OBJECT);
  });

  test('Animation\'s tweens timing inheritance', () => {
    const animation = animate('#target-id', {
      translateX: [
        {
          to: 50,
          delay: 15,
          duration: 10,
        }, {
          to: 200,
          delay: 35,
          duration: 30,
        }, {
          to: 350,
          delay: 15,
          duration: 10,
        }
      ],
    });

    // The first delay is not counted in the calculation of the total duration
    expect(animation.duration).to.equal(10 + 35 + 30 + 15 + 10);
    expect(animation.iterationDuration).to.equal(10 + 35 + 30 + 15 + 10);
  });

  test('Animation\'s values should ends to their correct end position when seeked', resolve => {
    /** @type {NodeListOf<HTMLElement>} */
    const targetEls = document.querySelectorAll('.target-class');
    const animation = animate(targetEls, {
      translateX: 270,
      delay: function(el, i) { return i * 10; },
      ease: 'inOutSine',
      autoplay: false
    });

    const seeker = createTimer({
      duration: 35,
      onUpdate: self => {
        animation.seek(self.progress * animation.duration);
      },
      onComplete: () => {
        expect(targetEls[0].style.transform).to.equal('translateX(270px)');
        expect(targetEls[1].style.transform).to.equal('translateX(270px)');
        expect(targetEls[2].style.transform).to.equal('translateX(270px)');
        expect(targetEls[3].style.transform).to.equal('translateX(270px)');
        animation.pause();
        resolve();
      }
    });

    expect(targetEls[0].style.transform).to.equal('translateX(0px)');
    expect(targetEls[1].style.transform).to.equal('translateX(0px)');
    expect(targetEls[2].style.transform).to.equal('translateX(0px)');
    expect(targetEls[3].style.transform).to.equal('translateX(0px)');
  });

  test('Animation\'s values should end to their correct start position when seeked in reverse', resolve => {
    /** @type {NodeListOf<HTMLElement>} */
    const targetEls = document.querySelectorAll('.target-class');
    const animation = animate(targetEls, {
      translateX: 270,
      // direction: 'reverse',
      reversed: true,
      ease: 'linear',
      duration: 35,
      onComplete: () => {
        expect(targetEls[0].style.transform).to.equal('translateX(0px)');
        expect(targetEls[1].style.transform).to.equal('translateX(0px)');
        expect(targetEls[2].style.transform).to.equal('translateX(0px)');
        expect(targetEls[3].style.transform).to.equal('translateX(0px)');
        resolve();
      }
    });

    animation.seek(0);

    expect(targetEls[0].style.transform).to.equal('translateX(270px)');
    expect(targetEls[1].style.transform).to.equal('translateX(270px)');
    expect(targetEls[2].style.transform).to.equal('translateX(270px)');
    expect(targetEls[3].style.transform).to.equal('translateX(270px)');
  });

  test('Canceled tween should update', resolve => {
    /** @type {HTMLElement} */
    const targetEl = document.querySelector('#target-id');
    const animation1 = animate(targetEl, {
      translateX: [
        { to: [0, 200], duration: 20 },
        { to: 300, duration: 20 }
      ],
    });

    createTimer({
      duration: 20,
      onComplete: () => {
        const animation2 = animate(targetEl, {
          translateX: -100,
          duration: 20,
        })
      }
    })

    createTimer({
      duration: 80,
      onComplete: () => {
        expect(targetEl.style.transform).to.equal('translateX(-100px)');
        resolve();
      }
    })
  });

  test('Animate the progress of an animation with 0 duration tweens', resolve => {
    const anim1 = animate('.target-class', {
      opacity: [0, 1],
      duration: 0,
      delay: (_, i) => i * 10,
      autoplay: false,
    })

    animate(anim1, {
      progress: [0, 1],
      ease: 'linear',
      duration: 40,
      onComplete: self => {
        expect(self.progress).to.equal(1);
        expect(self.currentTime).to.equal(utils.round(self.duration, 6));
        expect(anim1.progress).to.equal(1);
        expect(anim1.currentTime).to.equal(utils.round(anim1.duration, 6));
        resolve();
      }
    });
  });

  test('Animations should have currentTime = 0 if not played', () => {
    const anim1 = animate('.target-class', {
      opacity: [0, 1],
      duration: 300,
      autoplay: false,
    });

    expect(anim1.currentTime).to.equal(0);
  });

  test('Animations should complete instantly if no animatable props provided', resolve => {
    const anim1 = animate('.target-class', {
      duration: 15,
      loop: true,
    });

    createTimer({
      duration: 30,
      onComplete: self => {
        expect(anim1.duration).to.equal(minValue);
        expect(anim1.paused).to.equal(true);
        expect(anim1.completed).to.equal(true);
        resolve();
      }
    });
  });

  test('Animations should have advanced by one frame imediatly after beeing played', resolve => {
    const anim1 = animate('.target-class', {
      frameRate: 60,
      opacity: [0, 1],
      duration: 300,
      autoplay: false,
    });

    anim1.play();

    createTimer({
      duration: 1,
      onComplete: () => {
        expect(anim1.currentTime).to.be.at.least(16);
        expect(anim1.currentTime).to.be.below(33);
        anim1.pause();
        resolve();
      }
    });
  });

});

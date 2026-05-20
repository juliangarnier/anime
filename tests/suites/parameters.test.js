import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import {
  testObject,
} from '../setup.js';

import { animate, createTimeline, createTimer, utils } from '../../dist/modules/index.js';
import { minValue } from '../../dist/modules/core/consts.js';

suite('Parameters', () => {
  const duration = 10;
  test('modifier', () => {
    const animation1 = animate(testObject, {
      plainValue: 3.14159265359,
      duration: duration,
      autoplay: false,
    });
    animation1.seek(duration);
    expect(testObject.plainValue).to.equal(3.14159265359);

    const animation2 = animate(testObject, {
      plainValue: 3.14159265359,
      duration: duration,
      modifier: utils.round(0),
      autoplay: false,
    });
    animation2.seek(duration);
    expect(testObject.plainValue).to.equal(3);

    const animation3 = animate(testObject, {
      valueWithUnit: '3.14159265359px',
      duration: duration,
      modifier: utils.round(0),
      autoplay: false,
    });
    animation3.seek(duration);
    expect(testObject.valueWithUnit).to.equal('3px');

    const animation4 = animate(testObject, {
      multiplePLainValues: '26.11111111 42.11111111 74.11111111 138.11111111',
      duration: duration,
      modifier: utils.round(0),
      autoplay: false,
    });
    animation4.seek(duration);
    expect(testObject.multiplePLainValues).to.equal('26 42 74 138');
  });

  test('frameRate', () => {
    let resolved = false;
    animate(testObject, {
      plainValue: [0, 100],
      frameRate: 1,
      duration: 10000,
      ease: 'linear',
      onUpdate: (animation) => {
        if (animation.progress >= .05 && !resolved) {
          resolved = true;
          expect(testObject.plainValue).to.be.closeTo(0, 2);
        }
      }
    });
  });

  test('playbackRate on Animation', resolve => {
    animate(testObject, {
      plainValue: [0, 100],
      playbackRate: .5,
      duration: 100,
      ease: 'linear',
    });

    createTimer({
      duration: 100,
      onComplete: () => {
        expect(testObject.plainValue).to.be.closeTo(50, 10);
        resolve();
      }
    })
  });

  test('playbackRate on Timeline', resolve => {
    createTimeline({
      playbackRate: .5,
    })
    .add(testObject, {
      plainValue: [0, 100],
      playbackRate: .5,
      duration: 100,
      ease: 'linear',
    });

    createTimer({
      duration: 100,
      onComplete: () => {
        expect(testObject.plainValue).to.be.closeTo(25, 10);
        resolve();
      }
    })
  });

  test('playbackEase on Animation', resolve => {
    animate(testObject, {
      plainValue: [0, 100],
      playbackEase: 'outQuad',
      duration: 100,
      ease: 'linear',
    });

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(testObject.plainValue).to.be.closeTo(80, 10);
        resolve();
      }
    })
  });

  test('playbackRate on Timeline', resolve => {
    createTimeline({
      playbackEase: 'outQuad',
    })
    .add(testObject, {
      plainValue: [0, 100],
      playbackEase: 'outQuad',
      duration: 100,
      ease: 'linear',
    });

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(testObject.plainValue).to.be.closeTo(95, 10);
        resolve();
      }
    })
  });

  test('delay', resolve => {
    const animation1 = animate(testObject, {
      plainValue: [0, 100],
      delay: 100,
      duration: 100,
    });

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(animation1.currentTime).to.be.closeTo(-40, 20);
      }
    });

    createTimer({
      duration: 150,
      onComplete: () => {
        expect(animation1.currentTime).to.be.closeTo(50, 20);
      }
    });

    createTimer({
      duration: 200,
      onComplete: () => {
        expect(animation1.currentTime).to.equal(100);
        resolve();
      }
    });
  });

  test('Specific property parameters', () => {
    /** @type {HTMLElement} */
    const targetEl = document.querySelector('#target-id');
    const roundModifier10 = utils.round(1);
    const roundModifier100 = utils.round(2);
    const animation = animate(targetEl, {
      translateX: {
        to: 100,
        ease: 'linear',
        modifier: roundModifier10,
        delay: duration * .25,
        duration: duration * .60,
      },
      rotate: {
        to: 360,
        duration: duration * .50,
      },
      translateY: 200,
      ease: 'outQuad',
      modifier: roundModifier100,
      delay: duration * .35,
      duration: duration * .70,
    });

    expect(getChildAtIndex(animation, 0)._ease(.5)).to.equal(0.5);
    expect(getChildAtIndex(animation, 0)._modifier).to.equal(roundModifier10);
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(duration * .60);

    expect(getChildAtIndex(animation, 1)._ease(.5)).to.equal(.75);
    expect(getChildAtIndex(animation, 1)._modifier).to.equal(roundModifier100);
    // delay = (duration * (.35 - .25))
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(duration * (.1));
    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(duration * .50);

    expect(getChildAtIndex(animation, 2)._ease(.5)).to.equal(.75);
    expect(getChildAtIndex(animation, 2)._modifier).to.equal(roundModifier100);
    // delay = (duration * (.35 - .25))
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(duration * (.1));
    expect(getChildAtIndex(animation, 2)._changeDuration).to.equal(duration * .70);

    expect(targetEl.style.transform).to.equal('translate(0px, 0px) rotate(0deg)');
    animation.pause();
    animation.seek(animation.duration * .5);
    expect(targetEl.style.transform).to.equal('translate(66.7px, 134.69px) rotate(302.4deg)');
  });

  test('Specific property parameters on transforms values when last transform value update after everything else', resolve => {
    /** @type {HTMLElement} */
    const targetEl = document.querySelector('#target-id');
    const animation = animate(targetEl, {
      translateX: {
        to: 250,
        duration: 400,
        ease: 'linear'
      },
      rotate: {
        to: 360,
        duration: 900,
        ease: 'linear'
      },
      scale: {
        to: 2,
        duration: 800,
        delay: 400,
        ease: 'inOutQuart'
      },
      delay: 100 // All properties except 'scale' inherit 250ms delay
    });

    createTimer({
      duration: 200,
      onComplete: () => {
        const transformString = targetEl.style.transform;
        const transformValues = transformString.match(/(?:\d*\.)?\d+/g);
        expect(parseFloat(transformValues[0])).to.be.closeTo(65, 10);
        expect(parseFloat(transformValues[1])).to.be.closeTo(40, 10);
        expect(parseFloat(transformValues[2])).to.be.closeTo(1, 1);
        animation.pause();
        resolve();
      }
    })
  });

  test('0 duration animation', () => {
    /** @type {HTMLElement} */
    const targetEl = document.querySelector('#target-id');
    animate(targetEl, {
      x: 100,
      duration: 0,
    });

    expect(targetEl.style.transform).to.equal('translateX(100px)');
  });

  test('0 duration timer with infinite loop', () => {
    const timer = createTimer({
      duration: 0,
      loop: true,
      autoplay: false
    });

    expect(timer.duration).to.equal(minValue);
  });

  test('0 duration animation with infinite loop', () => {
    /** @type {HTMLElement} */
    const targetEl = document.querySelector('#target-id');
    const animation = animate(targetEl, {
      x: [-100, 100],
      y: [-100, 100],
      duration: 0,
      loop: true,
    });

    expect(animation.duration).to.equal(minValue);
    expect(targetEl.style.transform).to.equal('translate(100px, 100px)');
  });

  test('0 duration timeline with infinite loop', () => {
    /** @type {HTMLElement} */
    const targetEl = document.querySelector('#target-id');
    const tl = createTimeline({
      loop: true,
      autoplay: false
    })
    .add(targetEl, {
      x: 100,
      duration: 0,
      loop: true,
    });

    expect(tl.duration).to.equal(minValue);
  });
});

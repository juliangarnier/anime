import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import { animate, stagger, utils } from '../../dist/modules/index.js';

import {
  valueTypes,
  minValue,
} from '../../dist/modules/core/consts.js';

suite('Function based values', () => {

  test('Basic function based values', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: (el, i, targets) => {
        return el.getAttribute('data-index');
      },
      duration: (el, i, targets) => {
        const index = parseFloat(el.dataset.index);
        return targets.length + ((i + index) * 100);
      },
      delay: (el, i, targets) => {
        const index = parseFloat(el.dataset.index);
        return targets.length + ((i + index) * 100);
      },
      ease: () => {
        return (/** @type {Number} */t) => t;
      },
    });

    // Property value

    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(0);

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 1)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 2)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 3)._valueType).to.equal(valueTypes.UNIT);

    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(1);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(2);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(3);

    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 2)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 3)._unit).to.equal('px');

    expect($targets[0].style.transform).to.equal('translateX(0px)');
    expect($targets[1].style.transform).to.equal('translateX(0px)');
    expect($targets[2].style.transform).to.equal('translateX(0px)');
    expect($targets[3].style.transform).to.equal('translateX(0px)');

    animation.seek(animation.duration);

    expect($targets[0].style.transform).to.equal('translateX(0px)');
    expect($targets[1].style.transform).to.equal('translateX(1px)');
    expect($targets[2].style.transform).to.equal('translateX(2px)');
    expect($targets[3].style.transform).to.equal('translateX(3px)');

    // Duration
    expect(getChildAtIndex(animation, 0)._changeDuration).to.equal(4);
    expect(getChildAtIndex(animation, 1)._changeDuration).to.equal(204);
    expect(getChildAtIndex(animation, 2)._changeDuration).to.equal(404);
    expect(getChildAtIndex(animation, 3)._changeDuration).to.equal(604);

    // Delay
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(400);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(600);
  });

  test('Function based keyframes values', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: [
        { to: el => el.getAttribute('data-index') * 100, duration: stagger(100), delay: stagger(100), ease: () => t => t },
        { to: el => el.getAttribute('data-index') * 50, duration: stagger(100), delay: stagger(100), ease: () => t => t }
      ],
    });

    // Values
    expect(getChildAtIndex(animation, 0 * 2)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1 * 2)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 2 * 2)._toNumber).to.equal(200);
    expect(getChildAtIndex(animation, 3 * 2)._toNumber).to.equal(300);

    expect(getChildAtIndex(animation, (0 * 2) + 1)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, (1 * 2) + 1)._toNumber).to.equal(50);
    expect(getChildAtIndex(animation, (2 * 2) + 1)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, (3 * 2) + 1)._toNumber).to.equal(150);

    // Duration
    expect(getChildAtIndex(animation, 0 * 2)._changeDuration).to.equal(minValue);
    expect(getChildAtIndex(animation, 1 * 2)._changeDuration).to.equal(100);
    expect(getChildAtIndex(animation, 2 * 2)._changeDuration).to.equal(200);
    expect(getChildAtIndex(animation, 3 * 2)._changeDuration).to.equal(300);

    expect(getChildAtIndex(animation, (0 * 2) + 1)._changeDuration).to.equal(minValue);
    expect(getChildAtIndex(animation, (1 * 2) + 1)._changeDuration).to.equal(100);
    expect(getChildAtIndex(animation, (2 * 2) + 1)._changeDuration).to.equal(200);
    expect(getChildAtIndex(animation, (3 * 2) + 1)._changeDuration).to.equal(300);

    // Delay
    expect(getTweenDelay(getChildAtIndex(animation, 0 * 2))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1 * 2))).to.equal(100);
    expect(getTweenDelay(getChildAtIndex(animation, 2 * 2))).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, 3 * 2))).to.equal(300);

    expect(getTweenDelay(getChildAtIndex(animation, (0 * 2) + 1))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, (1 * 2) + 1))).to.equal(100);
    expect(getTweenDelay(getChildAtIndex(animation, (2 * 2) + 1))).to.equal(200);
    expect(getTweenDelay(getChildAtIndex(animation, (3 * 2) + 1))).to.equal(300);
  });

  test('Function based string values -> number conversion', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: 10,
      delay: $el => $el.dataset.index,
    });

    // Delay
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(1);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(2);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(3);
  });

  test('Function based values returns from to Array values', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: ($el, i, targets) => [$el.dataset.index, (targets.length - 1) - i],
    });

    // From
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(2);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(3);

    // To
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(3);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(2);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(1);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(0);
  });

  test('Function based values in from to Array values', () => {
    const $targets = document.querySelectorAll('.target-class');
    const animation = animate($targets, {
      autoplay: false,
      translateX: [
        ($el, i, targets) => $el.dataset.index,
        ($el, i, targets) => (targets.length - 1) - i
      ],
    });

    // From
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(2);
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(3);

    // To
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(3);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(2);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(1);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(0);
  });

  // test('Function based values refresh', () => {
  //   const $targets = document.querySelectorAll('.target-class');
  //   const animation = animate($targets, {
  //     autoplay: false,
  //     translateX: [
  //       ($el, i, targets) => $el.dataset.index,
  //       ($el, i, targets) => utils.ran
  //     ],
  //   });

  //   console.log(animation._head._func());
  //   console.log(animation._head._next._func());
  //   console.log(animation._head._next._next._func());

  //   // From
  //   expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
  //   expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(1);
  //   expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(2);
  //   expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(3);

  //   // To
  //   expect(getChildAtIndex(animation, 0)._toNumber).to.equal(3);
  //   expect(getChildAtIndex(animation, 1)._toNumber).to.equal(2);
  //   expect(getChildAtIndex(animation, 2)._toNumber).to.equal(1);
  //   expect(getChildAtIndex(animation, 3)._toNumber).to.equal(0);
  // });

});

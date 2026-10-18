import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import { animate, stagger, createTimeline } from '../../dist/modules/index.js';

suite('Stagger', () => {
  test('Staggers delays by a fixed step per target', () => {
    const animation = animate('.target-class', {
      translateX: 100,
      duration: 10,
      delay: stagger(10),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(30);
  });

  test('Staggers values with a unit string', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const staggerEls = document.querySelectorAll('#stagger div');
    const animation = animate(staggerEls, {
      translateX: stagger('1rem'),
      duration: 10,
      autoplay: false
    });

    animation.seek(animation.duration);

    expect(staggerEls[0].style.transform).to.equal('translateX(0rem)');
    expect(staggerEls[1].style.transform).to.equal('translateX(1rem)');
    expect(staggerEls[2].style.transform).to.equal('translateX(2rem)');
    expect(staggerEls[3].style.transform).to.equal('translateX(3rem)');
    expect(staggerEls[4].style.transform).to.equal('translateX(4rem)');
  });

  test('Offsets stagger delays by the start option', () => {
    const animation = animate('.target-class', {
      translateX: 100,
      duration: 10,
      delay: stagger(10, { start: 5 }),
      autoplay: false,
    });
    // start option shifts the smallest absolute start time by 5, surfaced on the animation _delay
    expect(animation._delay).to.equal(5);
    // Per-tween delays normalize back to 0, preserving the spacing of 10
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(30);
  });

  test('Distributes values evenly across a numeric range', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const staggerEls = document.querySelectorAll('#stagger div');
    const animation = animate(staggerEls, {
      translateX: stagger([-10, 10]),
      duration: 10,
      autoplay: false,
    });

    animation.seek(animation.duration);

    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(-5);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(5);
    expect(getChildAtIndex(animation, 4)._toNumber).to.equal(10);

    expect(staggerEls[0].style.transform).to.equal('translateX(-10px)');
    expect(staggerEls[1].style.transform).to.equal('translateX(-5px)');
    expect(staggerEls[2].style.transform).to.equal('translateX(0px)');
    expect(staggerEls[3].style.transform).to.equal('translateX(5px)');
    expect(staggerEls[4].style.transform).to.equal('translateX(10px)');
  });

  test('Distributes values across a unit range', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const staggerEls = document.querySelectorAll('#stagger div');
    const animation = animate(staggerEls, {
      translateX: stagger(['-10rem', '10rem']),
      duration: 10,
      autoplay: false,
    });

    animation.seek(animation.duration);

    expect(staggerEls[0].style.transform).to.equal('translateX(-10rem)');
    expect(staggerEls[1].style.transform).to.equal('translateX(-5rem)');
    expect(staggerEls[2].style.transform).to.equal('translateX(0rem)');
    expect(staggerEls[3].style.transform).to.equal('translateX(5rem)');
    expect(staggerEls[4].style.transform).to.equal('translateX(10rem)');
  });

  test('Staggers from the center', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, {from: 'center'}),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(20);
  });

  test('Staggers from the last element', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, {from: 'last'}),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(40);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(30);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(0);
  });

  test('Staggers from a specific index', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, {from: 1}),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(30);
  });

  test('Reverses the stagger order', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, {from: 1, reversed: true}),
      autoplay: false
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(30);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(0);
  });

  test('Applies an ease function to stagger values', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, {ease: 'inOutQuad'}),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(5);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(35);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(40);
  });

  test('Reverses eased stagger values', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { ease: 'inOutQuad', reversed: true }),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(40);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(35);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(5);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(0);
  });

  test('Reproduces jitter delays for a given seed', () => {
    const a = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { jitter: 2, seed: 42 }),
      autoplay: false,
    });
    const b = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { jitter: 2, seed: 42 }),
      autoplay: false,
    });
    for (let i = 0; i < 5; i++) {
      expect(getTweenDelay(getChildAtIndex(a, i)))
        .to.equal(getTweenDelay(getChildAtIndex(b, i)));
    }
  });

  test('Ramps jitter magnitude across order', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { jitter: [0, 4], seed: 0 }),
      autoplay: false,
    });
    // First element progress is 0 so jitter contribution is 0
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    // Last element progress is 1 so magnitude reaches jitterEnd
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.be.closeTo(40, 4);
  });

  test('Handles use returning out-of-range index', () => {
    const animation = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { use: (_t, i) => i + 100 }),
      autoplay: false,
    });
    // Each target advertises a distinct (but out-of-range) custom index, so the
    // stagger should still produce distinct delays, not collapse every tween to 0
    const delays = [];
    for (let i = 0; i < 5; i++) delays.push(getTweenDelay(getChildAtIndex(animation, i)));
    const unique = new Set(delays);
    expect(unique.size).to.equal(5);
  });

  test('Applies stagger to zero-duration animations', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const staggerEls = document.querySelectorAll('#grid div');
    const animation = animate(staggerEls, {
      opacity: 0,
      duration: 0,
      autoplay: false,
      delay: stagger(100),
    });
    animation.seek(animation.duration);
    expect(staggerEls[0].style.opacity).to.equal('0');
    expect(staggerEls[1].style.opacity).to.equal('0');
    expect(staggerEls[2].style.opacity).to.equal('0');
    expect(staggerEls[3].style.opacity).to.equal('0');
    expect(staggerEls[4].style.opacity).to.equal('0');
    expect(staggerEls[5].style.opacity).to.equal('0');
    expect(staggerEls[6].style.opacity).to.equal('0');
    expect(staggerEls[7].style.opacity).to.equal('0');
    expect(staggerEls[8].style.opacity).to.equal('0');
    expect(staggerEls[9].style.opacity).to.equal('0');
    expect(staggerEls[10].style.opacity).to.equal('0');
    expect(staggerEls[11].style.opacity).to.equal('0');
    expect(staggerEls[12].style.opacity).to.equal('0');
    expect(staggerEls[13].style.opacity).to.equal('0');
    expect(staggerEls[14].style.opacity).to.equal('0');
  });

  test('Staggers across a 2D grid', () => {
    const animation = animate('#grid div', {
      scale: [1, 0],
      delay: stagger(10, {grid: [5, 3], from: 'center'}),
      autoplay: false
    });

    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.be.closeTo(22.4, .0001);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.be.closeTo(22.4, .0001);

    expect(getTweenDelay(getChildAtIndex(animation, 5))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 6))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 7))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 8))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 9))).to.equal(20);

    expect(getTweenDelay(getChildAtIndex(animation, 10))).to.be.closeTo(22.4, .0001);
    expect(getTweenDelay(getChildAtIndex(animation, 11))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 12))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 13))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 14))).to.be.closeTo(22.4, .0001);
  });

  test('Staggers across a 2D grid along an axis', () => {
    const animation = animate('#grid div', {
      translateX: stagger(10, {grid: [5, 3], from: 'center', axis: 'x'}),
      translateY: stagger(10, {grid: [5, 3], from: 'center', axis: 'y'}),
      autoplay: false
    });

    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-20);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 4)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 6)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 8)._toNumber).to.equal(20);

    expect(getChildAtIndex(animation, 10)._toNumber).to.equal(-20);
    expect(getChildAtIndex(animation, 12)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 14)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 16)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 18)._toNumber).to.equal(20);

    expect(getChildAtIndex(animation, 20)._toNumber).to.equal(-20);
    expect(getChildAtIndex(animation, 22)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 24)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 26)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 28)._toNumber).to.equal(20);

    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 5)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 7)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 9)._toNumber).to.equal(-10);

    expect(getChildAtIndex(animation, 11)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 13)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 15)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 17)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 19)._toNumber).to.equal(0);

    expect(getChildAtIndex(animation, 21)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 23)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 25)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 27)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 29)._toNumber).to.equal(10);
  });

  test('Mirrors stagger order when reversed along an axis', () => {
    const forward = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { grid: [5, 1], axis: 'x' }),
      autoplay: false,
    });
    const reverse = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { grid: [5, 1], axis: 'x', reversed: true }),
      autoplay: false,
    });
    for (let i = 0; i < 5; i++) {
      expect(getTweenDelay(getChildAtIndex(forward, i)))
        .to.equal(getTweenDelay(getChildAtIndex(reverse, 4 - i)));
    }
  });

  test('Mirrors stagger order when reversed along an axis from last', () => {
    const forward = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { grid: [5, 1], axis: 'x', from: 'last' }),
      autoplay: false,
    });
    const reverse = animate('#stagger div', {
      translateX: 10,
      delay: stagger(10, { grid: [5, 1], axis: 'x', from: 'last', reversed: true }),
      autoplay: false,
    });
    for (let i = 0; i < 5; i++) {
      expect(getTweenDelay(getChildAtIndex(forward, i)))
        .to.equal(getTweenDelay(getChildAtIndex(reverse, 4 - i)));
    }
  });

  test('Staggers from an [x, y] origin in a grid', () => {
    const animation = animate('#grid div', {
      scale: [1, 0],
      delay: stagger(10, {grid: [5, 3], from: [0.5, 0.5]}),
      autoplay: false
    });

    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.be.closeTo(22.4, .0001);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.be.closeTo(22.4, .0001);

    expect(getTweenDelay(getChildAtIndex(animation, 5))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 6))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 7))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 8))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 9))).to.equal(20);

    expect(getTweenDelay(getChildAtIndex(animation, 10))).to.be.closeTo(22.4, .0001);
    expect(getTweenDelay(getChildAtIndex(animation, 11))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 12))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 13))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 14))).to.be.closeTo(22.4, .0001);
  });

  test('Computes auto grid from DOM element positions', () => {
    const animation = animate('#grid div', {
      scale: [1, 0],
      delay: stagger(10, {grid: true, from: 'center'}),
      autoplay: false
    });

    // Center element should have delay 0
    expect(getTweenDelay(getChildAtIndex(animation, 7))).to.equal(0);

    // Symmetric elements should have equal delays
    // Middle row: left/right of center
    expect(getTweenDelay(getChildAtIndex(animation, 6))).to.equal(getTweenDelay(getChildAtIndex(animation, 8)));
    expect(getTweenDelay(getChildAtIndex(animation, 5))).to.equal(getTweenDelay(getChildAtIndex(animation, 9)));

    // Center column: top/bottom of center
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(getTweenDelay(getChildAtIndex(animation, 12)));

    // All four corners should have equal delays
    const cornerDelay = getTweenDelay(getChildAtIndex(animation, 0));
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(cornerDelay);
    expect(getTweenDelay(getChildAtIndex(animation, 10))).to.equal(cornerDelay);
    expect(getTweenDelay(getChildAtIndex(animation, 14))).to.equal(cornerDelay);

    // Corners should have the largest delay
    expect(cornerDelay).to.be.greaterThan(getTweenDelay(getChildAtIndex(animation, 6)));
    expect(cornerDelay).to.be.greaterThan(getTweenDelay(getChildAtIndex(animation, 2)));
  });

  test('Computes auto grid from JS object coordinates', () => {
    const targets = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        targets.push({ x: col, y: row, val: 1 });
      }
    }
    const animation = animate(targets, {
      val: 0,
      delay: stagger(10, { grid: true, from: 'center' }),
      autoplay: false,
    });

    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.be.closeTo(22.4, .0001);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.be.closeTo(22.4, .0001);

    expect(getTweenDelay(getChildAtIndex(animation, 5))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 6))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 7))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 8))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 9))).to.equal(20);

    expect(getTweenDelay(getChildAtIndex(animation, 10))).to.be.closeTo(22.4, .0001);
    expect(getTweenDelay(getChildAtIndex(animation, 11))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 12))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 13))).to.be.closeTo(14.1, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 14))).to.be.closeTo(22.4, .0001);
  });

  test('Computes auto grid from an [x, y] origin', () => {
    const targets = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        targets.push({ x: col, y: row, val: 1 });
      }
    }
    const animation = animate(targets, {
      val: 0,
      delay: stagger(10, { grid: true, from: [1, 1] }),
      autoplay: false,
    });

    expect(getTweenDelay(getChildAtIndex(animation, 14))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.be.closeTo(44.7, .01);
    expect(getTweenDelay(getChildAtIndex(animation, 4))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 10))).to.equal(40);
  });

  test('Computes auto grid along a single axis', () => {
    const targets = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 5; col++) {
        targets.push({ x: col, y: row, val: 0 });
      }
    }
    const animation = animate(targets, {
      val: stagger(10, { grid: true, from: 'center', axis: 'x' }),
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-20);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 2)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 4)._toNumber).to.equal(20);
    expect(getChildAtIndex(animation, 5)._toNumber).to.equal(-20);
    expect(getChildAtIndex(animation, 10)._toNumber).to.equal(-20);
  });

  test('Falls back to 1D auto grid without spatial data', () => {
    const targets = [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }];
    const animation = animate(targets, {
      val: 0,
      delay: stagger(10, { grid: true }),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(30);
  });

  test('Switches auto grid to 3D when targets expose z', () => {
    const targets = [];
    for (let z = 0; z < 2; z++) {
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          targets.push({ x, y, z, val: 1 });
        }
      }
    }
    const animation = animate(targets, {
      val: 0,
      delay: stagger(10, { grid: true, from: 'center' }),
      autoplay: false,
    });
    // All 8 corner cells of a 2x2x2 cube are equidistant from the center
    const cornerDelay = getTweenDelay(getChildAtIndex(animation, 0));
    for (let i = 1; i < 8; i++) {
      expect(getTweenDelay(getChildAtIndex(animation, i))).to.be.closeTo(cornerDelay, 0.01);
    }
  });

  test('Computes auto grid along the z axis', () => {
    const targets = [];
    for (let z = 0; z < 3; z++) {
      for (let y = 0; y < 2; y++) {
        for (let x = 0; x < 2; x++) {
          targets.push({ x, y, z, val: 0 });
        }
      }
    }
    const animation = animate(targets, {
      val: stagger(10, { grid: true, from: 'center', axis: 'z' }),
      autoplay: false,
    });
    // Cells with z=0: -10, z=1: 0, z=2: 10
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 3)._toNumber).to.equal(-10);
    expect(getChildAtIndex(animation, 4)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 7)._toNumber).to.equal(0);
    expect(getChildAtIndex(animation, 8)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 11)._toNumber).to.equal(10);
  });

  test('Staggers across a 3D grid', () => {
    const targets = [];
    for (let i = 0; i < 8; i++) targets.push({ val: 1 });
    const animation = animate(targets, {
      val: 0,
      delay: stagger(10, { grid: [2, 2, 2], from: 'center' }),
      autoplay: false,
    });
    // 2x2x2 grid, center is the midpoint between all 8 cells, so they share the same delay
    const d = getTweenDelay(getChildAtIndex(animation, 0));
    for (let i = 1; i < 8; i++) {
      expect(getTweenDelay(getChildAtIndex(animation, i))).to.be.closeTo(d, 0.01);
    }
  });

  test('Staggers from an [x, y, z] origin in a 3D grid', () => {
    const targets = [];
    for (let i = 0; i < 8; i++) targets.push({ val: 1 });
    const animation = animate(targets, {
      val: 0,
      delay: stagger(10, { grid: [2, 2, 2], from: [0, 0, 0] }),
      autoplay: false,
    });
    // Index 0 is at the origin corner, distance 0
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    // Index 7 is at the opposite corner (1, 1, 1), farthest
    expect(getTweenDelay(getChildAtIndex(animation, 7))).to.be.closeTo(17.32, 0.05);
  });

  test('Staggers timeline positions', () => {
    const tl = createTimeline({ defaults: { duration: 10 }, autoplay: false })
    .add('.target-class', { id: 'staggered', translateX: 50 }, stagger(100))

    expect(getChildAtIndex(tl, 0)._offset).to.equal(0);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(100);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(200);
    expect(getChildAtIndex(tl, 3)._offset).to.equal(300);
    expect(getChildAtIndex(tl, 0).id).to.equal('staggered-0');
    expect(getChildAtIndex(tl, 1).id).to.equal('staggered-1');
    expect(getChildAtIndex(tl, 2).id).to.equal('staggered-2');
    expect(getChildAtIndex(tl, 3).id).to.equal('staggered-3');
    expect(tl.duration).to.equal(310); // 300 + 10
  });

  test('Staggers timeline positions with a numeric start', () => {
    const tl = createTimeline({ defaults: { duration: 10 }, autoplay: false })
    .add('.target-class', { id: 'staggered', translateX: 50 }, stagger(100, { start: 100 }))

    expect(getChildAtIndex(tl, 0)._offset).to.equal(100);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(200);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(300);
    expect(getChildAtIndex(tl, 3)._offset).to.equal(400);
    expect(getChildAtIndex(tl, 0).id).to.equal('staggered-0');
    expect(getChildAtIndex(tl, 1).id).to.equal('staggered-1');
    expect(getChildAtIndex(tl, 2).id).to.equal('staggered-2');
    expect(getChildAtIndex(tl, 3).id).to.equal('staggered-3');
    expect(tl.duration).to.equal(410); // 400 + 10
  });

  test('Staggers timeline positions starting at a label', () => {
    const tl = createTimeline({ defaults: { duration: 10 }, autoplay: false })
    .label('LABEL', 100)
    .add('.target-class', { id: 'staggered', translateX: 50 }, stagger(100, { start: 'LABEL' }))

    expect(getChildAtIndex(tl, 0)._offset).to.equal(100);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(200);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(300);
    expect(getChildAtIndex(tl, 3)._offset).to.equal(400);
    expect(getChildAtIndex(tl, 0).id).to.equal('staggered-0');
    expect(getChildAtIndex(tl, 1).id).to.equal('staggered-1');
    expect(getChildAtIndex(tl, 2).id).to.equal('staggered-2');
    expect(getChildAtIndex(tl, 3).id).to.equal('staggered-3');
    expect(tl.duration).to.equal(410); // 400 + 10
  });

  test('Staggers a tween value in a timeline', () => {
    const tl = createTimeline({ defaults: { duration: 10 }, autoplay: false })
    .add('.target-class', { id: 'staggered', translateX: stagger(100, { from: 'last'}) }, stagger(100))

    expect(getChildAtIndex(tl, 0)._head._toNumber).to.equal(300);
    expect(getChildAtIndex(tl, 1)._head._toNumber).to.equal(200);
    expect(getChildAtIndex(tl, 2)._head._toNumber).to.equal(100);
    expect(getChildAtIndex(tl, 3)._head._toNumber).to.equal(0);
  });
});

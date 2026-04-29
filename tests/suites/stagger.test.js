import {
  expect,
  getChildAtIndex,
  getTweenDelay,
} from '../utils.js';

import { animate, stagger, createTimeline } from '../../dist/modules/index.js';

suite('Stagger', () => {
  test('Increase each values by a specific value for each elements', () => {
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

  test('Increase each values by a specific value with unit for each elements', () => {
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

  test('Starts the staggering effect from a specific value', () => {
    const animation = animate('.target-class', {
      translateX: 100,
      duration: 10,
      delay: stagger(10, { start: 5 }),
      autoplay: false,
    });
    expect(getTweenDelay(getChildAtIndex(animation, 0))).to.equal(0);
    expect(getTweenDelay(getChildAtIndex(animation, 1))).to.equal(10);
    expect(getTweenDelay(getChildAtIndex(animation, 2))).to.equal(20);
    expect(getTweenDelay(getChildAtIndex(animation, 3))).to.equal(30);
  });

  test('Distributes evenly values between two numbers', () => {
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

  test('Specific staggered ranged value unit', () => {
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

  test('Starts the stagger effect from the center', () => {
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

  test('Starts the stagger effect from the last element', () => {
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

  test('Starts the stagger effect from specific index', () => {
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

  test('Changes the order in which the stagger operates', () => {
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

  test('Stagger values using an ease function', () => {
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

  test('Stagger values on 0 duration animations', () => {
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

  test('Grid staggering with a 2D array', () => {
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

  test('Grid staggering with a 2D array and axis parameters', () => {
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

  test('Staggered timeline time positions', () => {
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

  test('Staggered timeline time positions with custom start value', () => {
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

  test('Staggered timeline time positions with a label as start value', () => {
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

  test('Staggered timeline values', () => {
    const tl = createTimeline({ defaults: { duration: 10 }, autoplay: false })
    .add('.target-class', { id: 'staggered', translateX: stagger(100, { from: 'last'}) }, stagger(100))

    expect(getChildAtIndex(tl, 0)._head._toNumber).to.equal(300);
    expect(getChildAtIndex(tl, 1)._head._toNumber).to.equal(200);
    expect(getChildAtIndex(tl, 2)._head._toNumber).to.equal(100);
    expect(getChildAtIndex(tl, 3)._head._toNumber).to.equal(0);
  });

  test('Grid staggering with from as [x, y] array', () => {
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

  test('Auto grid staggering with DOM elements', () => {
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

  test('Auto grid staggering with JS objects from center', () => {
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

  test('Auto grid staggering with from as [x, y] array', () => {
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

  test('Auto grid staggering with axis parameter', () => {
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

  test('Auto grid staggering fallback to 1D without spatial data', () => {
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
});

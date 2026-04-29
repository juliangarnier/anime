import {
  expect,
} from '../utils.js';

import {
  animate,
  utils,
} from '../../dist/modules/index.js';

suite('Transforms', () => {

  // --- Parsing inline shorthand transforms ---

  test('Parse inline translate(x, y) shorthand', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(20px, 30px)';
    expect(utils.get($target, 'translateX')).to.equal('20px');
    expect(utils.get($target, 'translateY')).to.equal('30px');
  });

  test('Parse inline translate(x) single value', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(15px)';
    expect(utils.get($target, 'translateX')).to.equal('15px');
  });

  test('Parse inline translate3d(x, y, z)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    expect(utils.get($target, 'translateX')).to.equal('10px');
    expect(utils.get($target, 'translateY')).to.equal('20px');
    expect(utils.get($target, 'translateZ')).to.equal('30px');
  });

  test('Parse inline translate3d with calc values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(calc(10px + 5vw), calc(20px - 3vh), 50px)';
    expect(utils.get($target, 'translateX')).to.equal('calc(10px + 5vw)');
    expect(utils.get($target, 'translateY')).to.equal('calc(20px - 3vh)');
    expect(utils.get($target, 'translateZ')).to.equal('50px');
  });

  test('Parse inline translate3d with nested calc parens', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(calc((100% - 50px) / 2), calc(var(--h) + 10px), 0px)';
    expect(utils.get($target, 'translateX')).to.equal('calc((100% - 50px) / 2)');
    expect(utils.get($target, 'translateY')).to.equal('calc(var(--h) + 10px)');
    expect(utils.get($target, 'translateZ')).to.equal('0px');
  });

  test('Parse inline translate with calc and clamp values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(clamp(10px, 50%, 200px), calc(100vh - 50px))';
    expect(utils.get($target, 'translateX')).to.equal('clamp(10px, 50%, 200px)');
    expect(utils.get($target, 'translateY')).to.equal('calc(-50px + 100vh)');
  });

  test('Parse inline scale(x, y) shorthand', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'scale(2, 3)';
    expect(utils.get($target, 'scaleX')).to.equal('2');
    expect(utils.get($target, 'scaleY')).to.equal('3');
  });

  test('Parse inline scale3d(x, y, z)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'scale3d(1.5, 2, 0.5)';
    expect(utils.get($target, 'scaleX')).to.equal('1.5');
    expect(utils.get($target, 'scaleY')).to.equal('2');
    expect(utils.get($target, 'scaleZ')).to.equal('0.5');
  });

  test('Parse mixed shorthand and individual inline transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(5px, 10px) rotate(30deg) scaleX(2)';
    expect(utils.get($target, 'translateX')).to.equal('5px');
    expect(utils.get($target, 'translateY')).to.equal('10px');
    expect(utils.get($target, 'rotate')).to.equal('30deg');
    expect(utils.get($target, 'scaleX')).to.equal('2');
  });

  test('Parse translate shorthand followed by other transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(40px, 60px) rotate(45deg) scale3d(2, 2, 1)';
    expect(utils.get($target, 'translateX')).to.equal('40px');
    expect(utils.get($target, 'translateY')).to.equal('60px');
    expect(utils.get($target, 'rotate')).to.equal('45deg');
    expect(utils.get($target, 'scaleX')).to.equal('2');
    expect(utils.get($target, 'scaleY')).to.equal('2');
    expect(utils.get($target, 'scaleZ')).to.equal('1');
  });

  test('Parse inline scale(single_value)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'scale(0.75)';
    expect(utils.get($target, 'scale')).to.equal('0.75');
  });

  test('Parse inline individual rotateX', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'rotateX(45deg)';
    expect(utils.get($target, 'rotateX')).to.equal('45deg');
  });

  test('Parse complex inline transform with all types combined', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'perspective(800px) translate3d(10px, 20px, 30px) rotate(45deg) rotateX(15deg) scale3d(1.5, 2, 1) skewX(10deg) skewY(5deg)';
    expect(utils.get($target, 'perspective')).to.equal('800px');
    expect(utils.get($target, 'translateX')).to.equal('10px');
    expect(utils.get($target, 'translateY')).to.equal('20px');
    expect(utils.get($target, 'translateZ')).to.equal('30px');
    expect(utils.get($target, 'rotate')).to.equal('45deg');
    expect(utils.get($target, 'rotateX')).to.equal('15deg');
    expect(utils.get($target, 'scaleX')).to.equal('1.5');
    expect(utils.get($target, 'scaleY')).to.equal('2');
    expect(utils.get($target, 'scaleZ')).to.equal('1');
    expect(utils.get($target, 'skewX')).to.equal('10deg');
    expect(utils.get($target, 'skewY')).to.equal('5deg');
  });

  test('Parse translate(x, y) with calc containing nested parens', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(calc((100vw - 300px) / 2), calc(var(--offset, 10px) * 2))';
    expect(utils.get($target, 'translateX')).to.equal('calc((100vw - 300px) / 2)');
    expect(utils.get($target, 'translateY')).to.equal('calc(var(--offset, 10px) * 2)');
  });

  // --- Anime.js x/y/z shorthand properties ---

  test('Render x shorthand as translateX', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: 50,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'translateX')).to.equal('50px');
    expect($target.style.transform).to.equal('translateX(50px)');
  });

  test('Render y shorthand as translateY', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      y: 100,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'translateY')).to.equal('100px');
    expect($target.style.transform).to.equal('translateY(100px)');
  });

  test('Render z shorthand as translateZ', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      z: 50,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'translateZ')).to.equal('50px');
    expect($target.style.transform).to.equal('translateZ(50px)');
  });

  test('Render x and y shorthands produce translate(x, y)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: 100,
      y: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(100px, 200px)');
  });

  test('Render x, y, z shorthands produce translate3d(x, y, z)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: 100,
      y: 200,
      z: 300,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 300px)');
  });

  test('Animate z with inline translate3d preserves x and y', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    const animation = animate($target, { z: 300, duration: 10 });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(10px, 20px, 300px)');
  });

  test('Animate x with inline translate3d preserves y and z', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    const animation = animate($target, { x: 100, duration: 10 });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 20px, 30px)');
  });

  test('Animate y with inline translate3d preserves x and z', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    const animation = animate($target, { y: 200, duration: 10 });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(10px, 200px, 30px)');
  });

  test('Animate x and y with inline translate3d preserves z', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    const animation = animate($target, { x: 100, y: 200, duration: 10 });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 30px)');
  });

  test('Animate z with inline translate3d and other transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px) rotate(45deg)';
    const animation = animate($target, { z: 300, duration: 10 });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(10px, 20px, 300px) rotate(45deg)');
  });

  test('Render x and z shorthands without y produce individual transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: 50,
      z: 100,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(50px) translateZ(100px)');
  });

  test('Render x/y shorthands with other transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: 50,
      y: 100,
      rotate: 45,
      scale: 1.5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(50px, 100px) rotate(45deg) scale(1.5)');
  });

  test('Render x shorthand with string unit value', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: '5rem',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'translateX')).to.equal('5rem');
  });

  test('Render x/y/z shorthands with from-to values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: [0, 100],
      y: [0, 200],
      z: [0, 300],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(0);
    expect($target.style.transform).to.equal('translate3d(0px, 0px, 0px)');
    animation.seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 300px)');
  });

  test('Transforms shorthand properties values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translateX(10px) translateY(calc(-100px + 10vh)) translateZ(50px) scale(0.75)';
    const animation = animate('#target-id', {
      x: 100,
      y: 100,
      z: 100,
      scale: 10,
      duration: 10,
    });
    expect(utils.get('#target-id', 'x')).to.equal('10px');
    expect(utils.get('#target-id', 'y')).to.equal('calc(-100px + 10vh)');
    expect(utils.get('#target-id', 'z')).to.equal('50px');
    expect(utils.get('#target-id', 'scale')).to.equal('0.75');
    animation.pause().seek(animation.duration);
    expect(utils.get('#target-id', 'x')).to.equal('100px');
    expect(utils.get('#target-id', 'y')).to.equal('calc(100px + 100vh)');
    expect(utils.get('#target-id', 'z')).to.equal('100px');
    expect(utils.get('#target-id', 'scale')).to.equal('10');
  });

  // --- Rendering individual transforms ---

  test('Render individual translateY alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateY: 75,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateY(75px)');
  });

  test('Render individual translateZ alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateZ: 100,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateZ(100px)');
  });

  test('Render individual skew alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      skew: 20,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('skew(20deg)');
  });

  test('Render translateY and translateZ without translateX', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateY: 50,
      translateZ: 100,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateY(50px) translateZ(100px)');
  });

  test('Render individual translateX when translateY is absent', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 50,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(50px)');
  });

  test('Render individual translateX and translateZ without translateY', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 50,
      translateZ: 100,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(50px) translateZ(100px)');
  });

  test('Render individual scaleX alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleX: 2,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'scaleX')).to.equal('2');
  });

  test('Render individual scaleY alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleY: 3,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'scaleY')).to.equal('3');
  });

  test('Render individual scaleZ alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleZ: 0.5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'scaleZ')).to.equal('0.5');
  });

  test('Render individual rotate alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      rotate: 90,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'rotate')).to.equal('90deg');
  });

  test('Render individual rotateX alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      rotateX: 45,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'rotateX')).to.equal('45deg');
  });

  test('Render individual rotateY alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      rotateY: 60,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'rotateY')).to.equal('60deg');
  });

  test('Render individual rotateZ alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      rotateZ: 180,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'rotateZ')).to.equal('180deg');
  });

  test('Render individual skewX alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      skewX: 30,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'skewX')).to.equal('30deg');
  });

  test('Render individual skewY alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      skewY: 15,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'skewY')).to.equal('15deg');
  });

  test('Render individual perspective alone', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      perspective: 500,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect(utils.get($target, 'perspective')).to.equal('500px');
  });

  // --- Rendering shorthand transforms ---

  test('Render translate(x, y) shorthand', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(100px, 200px)');
  });

  test('Render translate3d(x, y, z) shorthand', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      translateZ: 300,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 300px)');
  });

  test('Render translate3d shorthand with plain initial values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translateX(10px) translateY(20px) translateZ(30px)';
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      translateZ: 300,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 300px)');
  });

  test('Render scale(x, y) shorthand without standalone scale', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleX: 2,
      scaleY: 3,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale(2, 3)');
  });

  test('Render scale3d(x, y, z) shorthand', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleX: 1.5,
      scaleY: 2,
      scaleZ: 0.5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale3d(1.5, 2, 0.5)');
  });

  test('Render individual scaleX and scaleY when standalone scale is present', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scale: 1.5,
      scaleX: 2,
      scaleY: 3,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale(1.5) scaleX(2) scaleY(3)');
  });

  // --- Complex CSS values in transforms ---

  test('Render translateX with calc expression', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 'calc(calc(15px * 2) - 42rem)',
      duration: 10,
    });
    expect($target.style.transform).to.equal('translateX(calc(0px + 0rem))');
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(calc(30px - 42rem))');
  });

  test('Render translateX with calc containing mixed units', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 'calc(50px + 10vw)',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(calc(50px + 10vw))');
  });

  test('Render translateX and translateY with different calc expressions', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 'calc(50% - 20px)',
      translateY: 'calc(50px + 10vh)',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(calc(50% - 20px), calc(50px + 10vh))');
  });

  // --- Complex transform combinations ---

  test('Render perspective with translate3d and rotate', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      perspective: 800,
      translateX: 100,
      translateY: 50,
      translateZ: -200,
      rotate: 45,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('perspective(800px) translate3d(100px, 50px, -200px) rotate(45deg)');
  });

  test('Render translate with all rotation axes', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: 50,
      y: 100,
      rotate: 30,
      rotateX: 45,
      rotateY: 60,
      rotateZ: 90,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(50px, 100px) rotate(30deg) rotateX(45deg) rotateY(60deg) rotateZ(90deg)');
  });

  test('Render translate3d with scale3d and skew', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      translateZ: 50,
      scaleX: 1.5,
      scaleY: 2,
      scaleZ: 1,
      skewX: 10,
      skewY: 5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 50px) scale3d(1.5, 2, 1) skewX(10deg) skewY(5deg)');
  });

  test('Render perspective with x/y shorthand, rotate and scale', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      perspective: 1000,
      x: 50,
      y: -30,
      rotate: 15,
      scale: 1.2,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('perspective(1000px) translate(50px, -30px) rotate(15deg) scale(1.2)');
  });

  test('Render all transform types in correct order', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      perspective: 500,
      translateX: 10,
      translateY: 20,
      translateZ: 30,
      rotate: 45,
      rotateX: 10,
      rotateY: 20,
      rotateZ: 30,
      scale: 1.5,
      scaleX: 2,
      scaleY: 2,
      scaleZ: 1,
      skewX: 5,
      skewY: 10,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('perspective(500px) translate3d(10px, 20px, 30px) rotate(45deg) rotateX(10deg) rotateY(20deg) rotateZ(30deg) scale(1.5) scaleX(2) scaleY(2) scaleZ(1) skewX(5deg) skewY(10deg)');
  });

  test('Render x shorthand with skew and perspective', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      perspective: 600,
      x: 80,
      skewX: 15,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('perspective(600px) translateX(80px) skewX(15deg)');
  });

  test('Render translate(x, y) with rotate3d', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'rotate3d(1, 1, 0, 45deg)';
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(100px, 200px) rotate3d(1, 1, 0, 45deg)');
  });

  test('Render rotate3d before scale in correct order', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'rotate3d(1, 0, 0, 30deg)';
    const animation = animate($target, {
      scale: 2,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('rotate3d(1, 0, 0, 30deg) scale(2)');
  });

  test('Render with inline matrix preserved', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'matrix(1, 0, 0, 1, 50, 100)';
    const animation = animate($target, {
      translateX: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(200px) matrix(1, 0, 0, 1, 50, 100)');
  });

  test('Render with inline matrix3d preserved', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 100, 0, 1)';
    const animation = animate($target, {
      rotate: 45,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('rotate(45deg) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 50, 100, 0, 1)');
  });

  test('Render with inline rotate3d and matrix both preserved', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'rotate3d(0, 1, 0, 60deg) matrix(1, 0, 0, 1, 0, 0)';
    const animation = animate($target, {
      translateX: 100,
      translateY: 50,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(100px, 50px) rotate3d(0, 1, 0, 60deg) matrix(1, 0, 0, 1, 0, 0)');
  });

  // --- Zero value transforms ---

  test('Render all-zero transforms produce correct shorthands', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: [100, 0],
      translateY: [100, 0],
      translateZ: [100, 0],
      rotate: [90, 0],
      rotateX: [90, 0],
      rotateY: [90, 0],
      rotateZ: [90, 0],
      scale: [2, 0],
      scaleX: [2, 0],
      scaleY: [2, 0],
      scaleZ: [2, 0],
      skewX: [45, 0],
      skewY: [45, 0],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(0px, 0px, 0px) rotate(0deg) rotateX(0deg) rotateY(0deg) rotateZ(0deg) scale(0) scaleX(0) scaleY(0) scaleZ(0) skewX(0deg) skewY(0deg)');
  });

  test('Render translate3d(0, 0, 0) shorthand when all axes are zero', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: [50, 0],
      translateY: [50, 0],
      translateZ: [50, 0],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(0px, 0px, 0px)');
  });

  test('Render translate(0, 0) shorthand when X and Y are zero', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      translateX: [50, 0],
      translateY: [50, 0],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(0px, 0px)');
  });

  test('Render scale3d(0, 0, 0) shorthand when all axes are zero', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleX: [2, 0],
      scaleY: [2, 0],
      scaleZ: [2, 0],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale3d(0, 0, 0)');
  });

  test('Render scale(0, 0) shorthand when X and Y are zero', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      scaleX: [2, 0],
      scaleY: [2, 0],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale(0, 0)');
  });

  test('Render x/y shorthands from non-zero to zero', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      x: [100, 0],
      y: [200, 0],
      ease: 'linear',
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(0px, 0px)');
  });

  // --- Roundtrip (parse and re-render) ---

  test('Parse and re-render translate3d shorthand roundtrip', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      translateZ: 300,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 300px)');
  });

  test('Parse and re-render scale3d shorthand roundtrip', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'scale3d(1, 1, 1)';
    const animation = animate($target, {
      scaleX: 2,
      scaleY: 3,
      scaleZ: 4,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale3d(2, 3, 4)');
  });

  test('Parse and re-render translate(x, y) shorthand roundtrip', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translate(50px, 75px)';
    const animation = animate($target, {
      translateX: 200,
      translateY: 300,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translate(200px, 300px)');
  });

  test('Parse and re-render scale(x, y) shorthand roundtrip', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'scale(2, 3)';
    const animation = animate($target, {
      scaleX: 4,
      scaleY: 5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('scale(4, 5)');
  });

  test('Parse complex inline and animate to new values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'perspective(500px) translate(30px, 60px) rotate(10deg) scale3d(1.2, 1.5, 1)';
    const animation = animate($target, {
      perspective: 800,
      translateX: 100,
      translateY: 200,
      rotate: 45,
      scaleX: 2,
      scaleY: 3,
      scaleZ: 1.5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('perspective(800px) translate(100px, 200px) rotate(45deg) scale3d(2, 3, 1.5)');
  });

  // --- Aggregation (multiple animations on same target) ---

  test('Multiple animations on same target aggregate into translate(x, y)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      x: 100,
      duration: 10,
    });
    const anim2 = animate($target, {
      y: 200,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    expect($target.style.transform).to.equal('translate(100px, 200px)');
  });

  test('Multiple animations on same target aggregate into translate3d(x, y, z)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      x: 100,
      duration: 10,
    });
    const anim2 = animate($target, {
      y: 200,
      duration: 10,
    });
    const anim3 = animate($target, {
      z: 300,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    anim3.pause().seek(anim3.duration);
    expect($target.style.transform).to.equal('translate3d(100px, 200px, 300px)');
  });

  test('Multiple animations on same target aggregate into scale(x, y)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      scaleX: 2,
      duration: 10,
    });
    const anim2 = animate($target, {
      scaleY: 3,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    expect($target.style.transform).to.equal('scale(2, 3)');
  });

  test('Multiple animations on same target aggregate into scale3d(x, y, z)', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      scaleX: 1.5,
      duration: 10,
    });
    const anim2 = animate($target, {
      scaleY: 2,
      duration: 10,
    });
    const anim3 = animate($target, {
      scaleZ: 0.5,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    anim3.pause().seek(anim3.duration);
    expect($target.style.transform).to.equal('scale3d(1.5, 2, 0.5)');
  });

  test('Multiple animations mixing x/y shorthand and other transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      x: 50,
      rotate: 45,
      duration: 10,
    });
    const anim2 = animate($target, {
      y: 100,
      scale: 2,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    expect($target.style.transform).to.equal('translate(50px, 100px) rotate(45deg) scale(2)');
  });

  test('Multiple animations aggregate translate, rotate and skew', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      x: 100,
      y: 50,
      rotate: 30,
      duration: 10,
    });
    const anim2 = animate($target, {
      skewX: 15,
      skewY: 10,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    expect($target.style.transform).to.equal('translate(100px, 50px) rotate(30deg) skewX(15deg) skewY(10deg)');
  });

  test('Multiple animations aggregate perspective, translate3d and scale3d', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const anim1 = animate($target, {
      perspective: 800,
      x: 50,
      duration: 10,
    });
    const anim2 = animate($target, {
      y: 100,
      z: -50,
      duration: 10,
    });
    const anim3 = animate($target, {
      scaleX: 1.5,
      scaleY: 2,
      scaleZ: 1,
      duration: 10,
    });
    anim1.pause().seek(anim1.duration);
    anim2.pause().seek(anim2.duration);
    anim3.pause().seek(anim3.duration);
    expect($target.style.transform).to.equal('perspective(800px) translate3d(50px, 100px, -50px) scale3d(1.5, 2, 1)');
  });

  // --- Revert and clean inline styles ---

  test('Revert cleans translate(x, y) shorthand transforms', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation = animate($target, {
      translateX: 200,
      translateY: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.getAttribute('style')).to.equal('transform: translate(200px, 200px);');
    animation.revert();
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert cleans translate3d(x, y, z) shorthand transforms', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation = animate($target, {
      translateX: 100,
      translateY: 200,
      translateZ: 300,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.getAttribute('style')).to.equal('transform: translate3d(100px, 200px, 300px);');
    animation.revert();
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert cleans scale(x, y) shorthand transforms', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation = animate($target, {
      scaleX: 2,
      scaleY: 3,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.getAttribute('style')).to.equal('transform: scale(2, 3);');
    animation.revert();
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert cleans scale3d(x, y, z) shorthand transforms', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation = animate($target, {
      scaleX: 1.5,
      scaleY: 2,
      scaleZ: 0.5,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.getAttribute('style')).to.equal('transform: scale3d(1.5, 2, 0.5);');
    animation.revert();
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert cleans x/y shorthand transforms', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation = animate($target, {
      x: 150,
      y: 250,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    expect($target.getAttribute('style')).to.equal('transform: translate(150px, 250px);');
    animation.revert();
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert preserves existing inline translate shorthand', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.transform = 'translate(50px, 60px)';
    const animation = animate($target, {
      translateX: 200,
      translateY: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    animation.revert();
    expect($target.getAttribute('style')).to.equal('transform: translate(50px, 60px);');
  });

  test('Revert preserves existing inline translate3d shorthand', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.transform = 'translate3d(10px, 20px, 30px)';
    const animation = animate($target, {
      translateX: 200,
      translateY: 200,
      translateZ: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    animation.revert();
    expect($target.getAttribute('style')).to.equal('transform: translate3d(10px, 20px, 30px);');
  });

  test('Revert partially cleans transforms keeping non-animated ones', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.transform = 'translate(10px, 20px) rotate(45deg)';
    const animation = animate($target, {
      translateX: 200,
      translateY: 200,
      duration: 10,
    });
    animation.pause().seek(animation.duration);
    animation.revert();
    expect($target.getAttribute('style')).to.equal('transform: translate(10px, 20px) rotate(45deg);');
  });

});

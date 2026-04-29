import {
  expect,
  getChildAtIndex,
  forEachChildren,
} from '../utils.js';

import {
  animate,
  utils,
} from '../../dist/modules/index.js';

import {
  unitsExecRgx,
  valueTypes,
} from '../../dist/modules/core/consts.js';

suite('Values', () => {

  const numberTypeTestTarget = {
    number: 1,
    decimals: 1.2,
    exponent: 1.23456e-5,
    func: 1337,
    numberString: '1',
    decimalsString: '1.2',
    exponentString: '1.23456e-5',
    funcString: '1337',
  }

  test('Number type values from numbers', () => {
    const animation = animate(numberTypeTestTarget, {
      number: 42,
      decimals: 42,
      exponent: 42,
      func: () => 42,
      numberString: 42,
      decimalsString: 42,
      exponentString: 42,
      funcString: () => 42,
    });

    forEachChildren(animation, tween => {
      expect(tween._valueType).to.equal(valueTypes.NUMBER);
    });
    animation.pause();
  });

  test('Number type values from strings', () => {
    const animation = animate(numberTypeTestTarget, {
      number: '42',
      decimals: '42',
      exponent: '42',
      func: () => '42',
      numberString: '42',
      decimalsString: '42',
      exponentString: '42',
      funcString: () => '42',
    });

    forEachChildren(animation, tween => {
      expect(tween._valueType).to.equal(valueTypes.NUMBER);
    });
    animation.pause();
  });

  test('Number type values from relative values operators', resolve => {
    const results = {...numberTypeTestTarget};
    for (let prop in results) {
      results[prop] = +results[prop] + 42;
    }
    const animation = animate(numberTypeTestTarget, {
      number: '+=42',
      decimals: '+=42',
      exponent: '+=42',
      func: () => '+=42',
      numberString: '+=42',
      decimalsString: '+=42',
      exponentString: '+=42',
      funcString: () => '+=42',
      duration: 10,
      onComplete: () => {
        for (let prop in results) {
          expect(results[prop]).to.equal(numberTypeTestTarget[prop]);
        }
        resolve();
      }
    });

    forEachChildren(animation, tween => {
      expect(tween._valueType).to.equal(valueTypes.NUMBER);
    });
  });

  const shouldNotMatch = [
    'range', 'range1', 'range13.134', '10 10', '10px 10px', '10.1px 10.2px', '1.12E0px 1.12E0px',
    '1', '1234', '.1234', '0.1234', '1234.1234',
    '+1234.1234', '+.1234', '-1234.1234', '-.1234',
    '1e+100', '1e-100', '1234e+100', '1234e-100',
    '.1234e+100', '.1234e-100', '1234.1234e+100', '1234.1234e-100',
    '-1234.1234e+100', '+1234.1234e-100', '0.1234e+100', '0.1234e-100',
    '-.1234e+100', '+.1234e-100'
  ];

  const shouldMatch = [
    '1px', '1em', '1e', '1E', '1e+100px', '1e-100em', '1e+100e', '1e-100E', '1E+100e', '1E-100E',
    '1234px', '1234em', '1234e', '1234E', '1234e+100px', '1234e-100em', '1234e+100e', '1234e-100E', '1234E+100e', '1234E-100E',
    '.1234px', '.1234em', '.1234e', '.1234E', '.1234e+100px', '.1234e-100em', '.1234e+100e', '.1234e-100E', '.1234E+100e', '.1234E-100E',
    '0.1234px', '0.1234em', '0.1234e', '0.1234E', '0.1234e+100px', '0.1234e-100em', '0.1234e+100e', '0.1234e-100E', '0.1234E+100e', '0.1234E-100E',
    '1234.1234px', '1234.1234em', '1234.1234e', '1234.1234E', '1234.1234e+100px', '1234.1234e-100em', '1234.1234e+100e', '1234.1234e-100E', '1234.1234E+100e', '1234.1234E-100E',
    '-1234.1234px', '+1234.1234em', '-1234.1234e', '+1234.1234E', '-1234.1234e+100px', '+1234.1234e-100em', '-1234.1234e+100e', '+1234.1234e-100E', '-1234.1234E+100e', '+1234.1234E-100E',
    '-.1234px', '+.1234em', '-.1234e', '+.1234E', '-.1234e+100px', '+.1234e-100em', '-.1234e+100e', '+.1234e-100E', '-.1234E+100e', '+.1234E-100E'
  ];

  shouldNotMatch.forEach(value => {
    test(`Unit parsing should not match "${value}"`, () => {
      const match = unitsExecRgx.test(value);
      expect(match).to.be.false;
    });
  });

  shouldMatch.forEach(value => {
    test(`Unit parsing should match "${value}"`, () => {
      const match = unitsExecRgx.test(value);
      expect(match).to.be.true;
    });
  });

  // });

  test('Unit type values', () => {
    const unitTypeTestTarget = {
      number: 1,
      decimals: 1.2,
      exponent: 1.23456e-5,
      func: 1337,
      numberUnit: '1px',
      decimalsUnit: '1.2px',
      exponentUnit: '1.23456e-5px',
      funcUnit: '1337px',
    }

    const animation = animate(unitTypeTestTarget, {
      number: '42px',
      decimals: '42px',
      exponent: '42px',
      func: () => '42px',
      numberUnit: 42,
      decimalsUnit: 42,
      exponentUnit: 42,
      funcUnit: () => 42,
    });

    forEachChildren(animation, tween => {
      expect(tween._valueType).to.equal(valueTypes.UNIT);
      expect(tween._toNumber).to.equal(42);
      expect(tween._unit).to.equal('px');
    });

    animation.pause();
  });

  test('Tween end value types', resolve => {

    const from = {
      number: 1,
      decimals: 1.2,
      exponent: 1.10E+10,
      exponent2: 1.5e-10,
      numberUnit: '1px',
      decimalsUnit: '1.2px',
      exponentUnit: '1e-100px',
      exponentUnit2: '1.5E-10em',
      prefix1: '+1.5e-10em',
      prefix2: '-1.5E+100em',
    }

    const to = {
      number: 2,
      decimals: 2.2,
      exponent: 2.10E+10,
      exponent2: 2.5e-10,
      numberUnit: '2px',
      decimalsUnit: '2.2px',
      exponentUnit: '2e-100px',
      exponentUnit2: '2.5e-10em',
      prefix1: '2.5e-10em',
      prefix2: '-2.5e+100em',
    }

    animate(from, {
      number: to.number,
      decimals: to.decimals,
      exponent: to.exponent,
      exponent2: to.exponent2,
      numberUnit: to.numberUnit,
      decimalsUnit: to.decimalsUnit,
      exponentUnit: to.exponentUnit,
      exponentUnit2: to.exponentUnit2,
      prefix1: to.prefix1,
      prefix2: to.prefix2,
      duration: 10,
      onComplete: () => {
        for (let p in from) {
          expect(from[p]).to.equal(to[p]);
        }
        resolve();
      }
    });

  });

  const colorTypeTestTarget = {
    HEX3: '#f99',
    HEX6: '#ff9999',
    RGB: 'rgb(255, 153, 153)',
    HSL: 'hsl(0, 100%, 80%)',
    HEX3A: '#f999',
    HEX6A: '#ff999999',
    RGBA: 'rgba(255, 153, 153, .6)',
    HSLA: 'hsla(0, 100%, 80%, .6)',
    func: 'hsla(180, 100%, 50%, .8)',
  }

  test('Color type values', () => {
    const animation = animate(colorTypeTestTarget, {
      HEX3: 'hsla(180, 100%, 50%, .8)',
      HEX6: 'hsla(180, 100%, 50%, .8)',
      RGB: 'hsla(180, 100%, 50%, .8)',
      HSL: 'hsla(180, 100%, 50%, .8)',
      HEX3A: 'hsla(180, 100%, 50%, .8)',
      HEX6A: 'hsla(180, 100%, 50%, .8)',
      RGBA: 'hsla(180, 100%, 50%, .8)',
      HSLA: 'hsla(180, 100%, 50%, .8)',
      func: () => 'hsla(180, 100%, 50%, .8)',
    });

    forEachChildren(animation, tween => {
      expect(tween._valueType).to.equal(valueTypes.COLOR);
      expect(tween._toNumbers).to.deep.equal([0, 255, 255, .8]);
    });

    animation.pause();
  });

  test('Complex type values', () => {

    const complexTypeTestTarget = {
      whiteSpace: '0 1 2 1.234',
      mixedTypes: 'auto 20px auto 2rem',
      cssFilter: 'blur(100px) contrast(200)',
      func: 'blur(100px) contrast(200)',
      whiteSpaceFromNumber: 10,
      mixedTypesFromNumber: 10,
      cssFilterFromNumber: 10,
      funcFromNumber: 10,
    }

    const animation = animate(complexTypeTestTarget, {
      whiteSpace: '42 42 42 42',
      mixedTypes: 'auto 42px auto 42rem',
      cssFilter: 'blur(42px) contrast(42)',
      func: () => 'blur(42px) contrast(42)',
      whiteSpaceFromNumber: '42 42 42 42',
      mixedTypesFromNumber: 'auto 42px auto 42rem',
      cssFilterFromNumber: 'blur(42px) contrast(42)',
      funcFromNumber: () => 'blur(42px) contrast(42)',
    });

    forEachChildren(animation, tween => {
      expect(tween._valueType).to.equal(valueTypes.COMPLEX);
      if (tween._toNumbers.length === 4) {
        expect(tween._toNumbers).to.deep.equal([42, 42, 42, 42]);
      } else {
        expect(tween._toNumbers).to.deep.equal([42, 42]);
      }
    });

    animation.pause();
  });

  test('Get CSS computed values', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const $targets = document.querySelectorAll('.css-properties');
    const animation = animate($targets, {
      width: 100,
      fontSize: 10,
    });

    animation.pause().seek(animation.duration);

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 1)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(150);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(32);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(100);
    expect(getChildAtIndex(animation, 1)._toNumber).to.equal(10);
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');

    expect($targets[0].style.width).to.equal('100px');
    expect($targets[0].style.fontSize).to.equal('10px');
  });

  test('Get CSS inline values', () => {
    /** @type {NodeListOf<HTMLElement>} */
    const $targets = document.querySelectorAll('.with-inline-styles');
    const animation = animate($targets, {
      width: 100,
    });

    animation.pause().seek(animation.duration);

    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(200);
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(100);

    expect($targets[0].style.width).to.equal('100px');
  });

  test('Get default transforms values', () => {
    const animation = animate('#target-id', {
      translateX: 100,
      translateY: 100,
      translateZ: 100,
      rotate: 360,
      rotateX: 360,
      rotateY: 360,
      rotateZ: 360,
      skew: 45,
      skewX: 45,
      skewY: 45,
      scale: 10,
      scaleX: 10,
      scaleY: 10,
      scaleZ: 10,
      perspective: 1000,
    });

    animation.pause().seek(animation.duration);

    // Translate
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 2)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 1)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 2)._fromNumber).to.equal(0);
    // Rotate
    expect(getChildAtIndex(animation, 3)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 4)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 5)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 6)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 3)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 4)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 5)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 6)._fromNumber).to.equal(0);
    // Skew
    expect(getChildAtIndex(animation, 7)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 8)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 9)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 7)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 8)._fromNumber).to.equal(0);
    expect(getChildAtIndex(animation, 9)._fromNumber).to.equal(0);
    // Scale
    expect(getChildAtIndex(animation, 10)._unit).to.equal(null);
    expect(getChildAtIndex(animation, 11)._unit).to.equal(null);
    expect(getChildAtIndex(animation, 12)._unit).to.equal(null);
    expect(getChildAtIndex(animation, 13)._unit).to.equal(null);
    expect(getChildAtIndex(animation, 10)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 11)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 12)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 13)._fromNumber).to.equal(1);
    // Perspective
    expect(getChildAtIndex(animation, 14)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 14)._fromNumber).to.equal(0);

    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    expect($target.style.transform).to.equal('perspective(1000px) translate3d(100px, 100px, 100px) rotate(360deg) rotateX(360deg) rotateY(360deg) rotateZ(360deg) scale(10) scaleX(10) scaleY(10) scaleZ(10) skew(45deg) skewX(45deg) skewY(45deg)');
  });

  test('Get inline transforms values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');

    $target.style.transform = 'translateX(10px) translateY(calc(100px - 10vh)) scale(0.75)';

    animate($target, {
      translateX: 100,
      translateY: 100,
      scale: 10,
      duration: 10
    });

    expect(utils.get($target, 'translateX')).to.equal('10px');
    expect(utils.get($target, 'translateY')).to.equal('calc(100px - 10vh)');
    expect(utils.get($target, 'scale'     )).to.equal('0.75');

  });

  test('Values with white space', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const animation = animate($target, {
      backgroundSize: ['auto 100%', 'auto 200%'],
      duration: 10
    });

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.COMPLEX);
    expect(getChildAtIndex(animation, 0)._fromNumbers[0]).to.equal(100);
    expect(getChildAtIndex(animation, 0)._strings[0]).to.equal('auto ');
    expect(getChildAtIndex(animation, 0)._strings[1]).to.equal('%');

    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.COMPLEX);
    expect(getChildAtIndex(animation, 0)._toNumbers[0]).to.equal(200);

    expect($target.style.backgroundSize).to.equal('auto 100%');

    animation.pause().seek(animation.duration);

    expect($target.style.backgroundSize).to.equal('auto 200%');
  });

  test('Complex CSS values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.zIndex = 'auto'; // jsdom doesnt set auto to zIndex
    const animation = animate($target, {
      filter: 'blur(10px) contrast(200)',
      translateX: 'calc(calc(15px * 2) - 42rem)',
      zIndex: {to: 10, modifier: utils.round(1)},
      duration: 10
    });

    expect($target.style.zIndex).to.equal('0');
    expect($target.style.filter).to.equal('blur(0px) contrast(0)');
    expect($target.style.transform).to.equal('translateX(calc(0px + 0rem))');
    animation.pause().seek(animation.duration);
    expect($target.style.zIndex).to.equal('10');
    expect(getChildAtIndex(animation, 0)._toNumbers).to.deep.equal([10, 200]);
    expect($target.style.filter).to.equal('blur(10px) contrast(200)');
    expect(getChildAtIndex(animation, 1)._toNumbers).to.deep.equal([15, 2, 42]);
    expect($target.style.transform).to.equal('translateX(calc(30px - 42rem))');
  });

  test('CSS Variables', () => {
    const $target = document.querySelector(':root');
    expect(getComputedStyle($target).getPropertyValue('--width')).to.equal('100px');
    const animation = animate($target, {
      '--width': 200,
      duration: 10
    });

    expect(getComputedStyle($target).getPropertyValue('--width')).to.equal('100px'); // Anime.js removes the first white space to get a simpler (number + unit) animation type instead of commplex type (string + number + string)
    animation.pause().seek(animation.duration);
    expect(getComputedStyle($target).getPropertyValue('--width')).to.equal('200px'); // Anime.js removes the first white space to get a simpler (number + unit) animation type instead of commplex type (string + number + string)
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(100);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(200);
  });

  test('CSS Variables in Transforms', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    const x = '12rem';
    const rx = '45deg';
    const s = '2';
    // defined and set the variables in two different set() callS otherwise the values won't be properly computed
    utils.set($target, { '--x': x, '--rx': rx, '--s': s });
    const setter = utils.set($target, {
      translateX: 'var(--x)',
      rotateX: 'var(--rx)',
      scale: 'var(--s)'
    });
    expect(getComputedStyle($target).getPropertyValue('--x')).to.equal(x);
    expect(getComputedStyle($target).getPropertyValue('--rx')).to.equal(rx);
    expect(getComputedStyle($target).getPropertyValue('--s')).to.equal(s);
    let transforms = $target.style.transform;
    expect(transforms).to.equal(`translateX(${x}) rotateX(${rx}) scale(${s})`);
    const x2 = '19rem';
    const rx2 = '64deg';
    const s2 = '1.25';
    const animation = animate($target, {
      '--x': x2,
      '--rx': rx2,
      '--s': s2,
      duration: 10
    });

    animation.pause().seek(animation.duration);
    expect(getComputedStyle($target).getPropertyValue('--x')).to.equal(x2);
    expect(getComputedStyle($target).getPropertyValue('--rx')).to.equal(rx2);
    expect(getComputedStyle($target).getPropertyValue('--s')).to.equal(s2);
    // Setting css variables with utils.set() will convert the variable to a static computed value
    // So we need to refresh the setter in order to get the updated values from the animation
    setter.refresh();
    transforms = $target.style.transform;
    expect(transforms).to.equal(`translateX(${x2}) rotateX(${rx2}) scale(${s2})`);
  });

  test('From values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translateX(100px)';
    const animation = animate($target, {
      translateX: {from: 50},
      duration: 10,
    });

    expect($target.style.transform).to.equal('translateX(50px)');
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(100px)');
  });

  test('From To values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translateX(100px)';
    const animation = animate($target, {
      translateX: {from: 50, to: 150},
      duration: 10,
    });

    expect($target.style.transform).to.equal('translateX(50px)');
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(150px)');
  });

  test('From To values with 0 values', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translateX(100px)';
    const animation = animate($target, {
      translateX: {from: 50, to: 0},
      duration: 10,
    });

    expect($target.style.transform).to.equal('translateX(50px)');
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(0px)');
  });


  test('From To values shorthand', () => {
    /** @type {HTMLElement} */
    const $target = document.querySelector('#target-id');
    $target.style.transform = 'translateX(100px)';
    const animation = animate($target, {
      translateX: [50, 150],
      duration: 10,
    });

    expect($target.style.transform).to.equal('translateX(50px)');
    animation.pause().seek(animation.duration);
    expect($target.style.transform).to.equal('translateX(150px)');
  });

  test('Relative values with operators +=, -=, *=', () => {
    /** @type {HTMLElement} */
    const relativeEl = document.querySelector('#target-id');
    relativeEl.style.transform = 'translateX(100px)';
    relativeEl.style.width = '28px';
    const animation = animate(relativeEl, {
      translateX: '*=2.5', // 100px * 2.5 = '250px',
      width: '-=20px', // 28 - 20 = '8px',
      rotate: '+=2turn', // 0 + 2 = '2turn',
      duration: 10
    });

    expect(relativeEl.style.transform).to.equal('translateX(100px) rotate(0turn)');
    expect(relativeEl.style.width).to.equal('28px');

    animation.pause().seek(animation.duration);

    expect(relativeEl.style.transform).to.equal('translateX(250px) rotate(2turn)');
    expect(relativeEl.style.width).to.equal('8px');
  });

  test('Relative from values', () => {
    /** @type {HTMLElement} */
    const relativeEl = document.querySelector('#target-id');
    relativeEl.style.transform = 'translateX(100px) rotate(2turn)';
    relativeEl.style.width = '28px';
    const animation = animate(relativeEl, {
      translateX: { from: '*=2.5' },
      width: { from: '-=20px' },
      rotate: { from: '+=2turn' },
      duration: 10
    });

    expect(relativeEl.style.transform).to.equal('translateX(250px) rotate(4turn)');
    expect(relativeEl.style.width).to.equal('8px');

    animation.pause().seek(animation.duration);

    expect(relativeEl.style.transform).to.equal('translateX(100px) rotate(2turn)');
    expect(relativeEl.style.width).to.equal('28px');
  });

  test('Relative from to values', () => {
    /** @type {HTMLElement} */
    const relativeEl = document.querySelector('#target-id');
    relativeEl.style.transform = 'translateX(100px) rotate(2turn)';
    relativeEl.style.width = '28px';
    const animation = animate(relativeEl, {
      translateX: ['*=2.5', 10], // Relative from value
      width: [100, '-=20px'], // Relative to value
      rotate: ['+=2turn', '-=1turn'], // Relative from and to values
      duration: 10
    });

    expect(relativeEl.style.transform).to.equal('translateX(250px) rotate(4turn)');
    expect(relativeEl.style.width).to.equal('100px');

    animation.pause().seek(animation.duration);

    expect(relativeEl.style.transform).to.equal('translateX(10px) rotate(3turn)');
    expect(relativeEl.style.width).to.equal('80px');
  });

  test('Relative values inside keyframes', () => {
    /** @type {HTMLElement} */
    const relativeEl = document.querySelector('#target-id');
    relativeEl.style.transform = 'translateX(100px) rotate(2turn)';
    const animation = animate(relativeEl, {
      translateX: [{to: '+=10'}, {to: '-=10'}],
      rotate: [{from: '+=2turn', to: '-=1turn'}, {from: '+=5turn', to: '-=2turn'}],
      duration: 10,
      ease: 'linear',
    });

    expect(relativeEl.style.transform).to.equal('translateX(100px) rotate(4turn)');
    animation.seek(animation.duration * .25);
    expect(relativeEl.style.transform).to.equal('translateX(105px) rotate(3.5turn)');
    animation.seek(animation.duration * .5);
    expect(relativeEl.style.transform).to.equal('translateX(110px) rotate(8turn)');
    animation.pause().seek(animation.duration);
    expect(relativeEl.style.transform).to.equal('translateX(100px) rotate(6turn)');
  });

});

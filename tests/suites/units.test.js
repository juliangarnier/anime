import {
  expect,
  getChildAtIndex,
} from '../utils.js';

import {
  animate,
  utils,
} from '../../dist/modules/index.js';

import {
  valueTypes,
} from '../../dist/modules/core/consts.js';

const validUnits = ['cm','mm','in','pc','pt','px','em','ex','ch','rem','vw','vh','vmin','vmax','q','lh','rlh','vb','vi','svw','svh','lvw','lvh','dvw','dvh'];

suite('Units', () => {
  test('Default transform units', () => {
    const animation = animate('#target-id', {
      translateX: 100,
      translateY: 100,
      translateZ: 100,
      rotate: 360,
      rotateX: 360,
      rotateY: 360,
      rotateZ: 360,
      skew: 360,
      skewX: 360,
      skewY: 360,
      perspective: 1000,
      duration: 10,
    });

    // Translate
    expect(getChildAtIndex(animation, 0)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 1)._unit).to.equal('px');
    expect(getChildAtIndex(animation, 2)._unit).to.equal('px');
    // Rotate
    expect(getChildAtIndex(animation, 3)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 4)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 5)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 6)._unit).to.equal('deg');
    // Skew
    expect(getChildAtIndex(animation, 7)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 8)._unit).to.equal('deg');
    expect(getChildAtIndex(animation, 9)._unit).to.equal('deg');
    // Perspective
    expect(getChildAtIndex(animation, 10)._unit).to.equal('px');
  });

  test('Specified unit on a simple tween', () => {
    const animation = animate('#target-id', {
      translateX: '100%',
      duration: 10,
    });

    expect(getChildAtIndex(animation, 0)._unit).to.equal('%');
  });

  test('Units inheritance on From To Values', () => {
    const animation = animate('#target-id', {
      translateX: [-50, '50%'],
      duration: 10,
    });

    expect(getChildAtIndex(animation, 0)._unit).to.equal('%');
  });

  test('Should match any units from original values', () => {
    validUnits.forEach(unit => {
      utils.set('#target-id', { width: 99 + unit });
      const animation = animate('#target-id', {
        width: 999,
        duration: 10,
      });
      expect(getChildAtIndex(animation, 0)._unit).to.equal(unit);
    });
  });

  test('Should match any units set in the property value', () => {
    validUnits.forEach(unit => {
      utils.set('#target-id', { width: 99 + 'px' });
      const animation = animate('#target-id', {
        width: 999 + unit,
        duration: 10,
      });
      expect(getChildAtIndex(animation, 0)._unit).to.equal(unit);
    });
  });

  test('Values set with units should be properly applied', () => {
    validUnits.forEach(unit => {
      const el = /** @type {HTMLElement} */(document.querySelector('#target-id'));
      utils.set(el, {
        width: '.9' + unit,
        left: '-.099' + unit,
        top: '-1E37' + unit,
        right: '+1e38' + unit,
        bottom: '+0.099' + unit,
      });

      expect(el.style.width).to.equal('0.9' + unit);
      expect(el.style.left).to.equal('-0.099' + unit);
      expect(el.style.top).to.equal('-1e+37' + unit);
      expect(el.style.right).to.equal('1e+38' + unit);
      expect(el.style.bottom).to.equal('0.099' + unit);

    });
  });

  test('Should match any units from complex original values', () => {
    validUnits.forEach(unit => {
      const el = document.querySelector('#target-id');
      utils.set(el, {
        width: '.9' + unit,
        left: '-.099' + unit,
        top: '-1E37' + unit,
        right: '+1e38' + unit,
        bottom: '+0.099' + unit,
      });

      const animation = animate(el, {
        width: .99,
        left: -.0999,
        top: -1E3099,
        right: +1e3099,
        bottom: +0.0999,
        duration: 10,
      });

      expect(getChildAtIndex(animation, 0)._unit).to.equal(unit);
      expect(getChildAtIndex(animation, 1)._unit).to.equal(unit);
      expect(getChildAtIndex(animation, 2)._unit).to.equal(unit);
      expect(getChildAtIndex(animation, 3)._unit).to.equal(unit);
      expect(getChildAtIndex(animation, 4)._unit).to.equal(unit);

      expect(getChildAtIndex(animation, 0)._toNumber).to.equal(.99);
      expect(getChildAtIndex(animation, 1)._toNumber).to.equal(-.0999);
      expect(getChildAtIndex(animation, 2)._toNumber).to.equal(-1E3099);
      expect(getChildAtIndex(animation, 3)._toNumber).to.equal(+1e3099);
      expect(getChildAtIndex(animation, 4)._toNumber).to.equal(+0.0999);
    });
  });

  test('Basic unit conversion', () => {
    const el = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    utils.set(el, { fontSize: '20px' });
    utils.set(el, { width: '1em' });
    expect(el.offsetWidth).to.closeTo(20, 1); // 1em = 20px
    utils.set(el, { width: 2 }); // Should inherit the 'em' unit
    expect(el.offsetWidth).to.closeTo(40, 1); // 2em = 40px
    utils.set(el, { width: '100%' });
    expect(el.offsetWidth).to.closeTo(/** @type {HTMLElement} */(el.parentNode).offsetWidth - 2, 1); // -2 = (1px border * 2)
    utils.set(el, { width: 50 }); // Should inherit the 'em' unit
    expect(el.offsetWidth).to.closeTo(Math.round((/** @type {HTMLElement} */(el.parentNode).offsetWidth - 2) / 2), 1); // 50% of parent 100% -2
    utils.set(el, { width: '50px' }); // Should inherit the 'em' unit
    expect(el.offsetWidth).to.closeTo(50, 1);
    utils.set(el, { width: 'calc(100% - 2px)' }); // Calc should properly overiide from values
    expect(el.offsetWidth).to.closeTo(/** @type {HTMLElement} */(el.parentNode).offsetWidth - 4, 1); // -4 = (1px border * 2) - 2
  });

  const oneRad = (Math.PI * 2) + 'rad';
  const halfRad = (Math.PI * 1) + 'rad';

  test('Undefined to turn unit conversion', () => {
    let animation = animate('#target-id', { rotate: [360, '.5turn'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(.5);
  });

  test('Deg to turn unit conversion', () => {
    let animation = animate('#target-id', { rotate: ['360deg', '.5turn'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(.5);
  });

  test('Rad to turn unit conversion', () => {
    let animation = animate('#target-id', { rotate: [oneRad, '.5turn'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(1);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(.5);
  });

  test('Undefined to rad unit conversion', () => {
    let animation = animate('#target-id', { rotate: [360, halfRad], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(Math.PI * 2);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(Math.PI * 1);
  });

  test('Deg to rad unit conversion', () => {
    let animation = animate('#target-id', { rotate: ['360deg', halfRad], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(Math.PI * 2);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(Math.PI * 1);
  });

  test('Turn to rad unit conversion', () => {
    let animation = animate('#target-id', { rotate: ['1turn', halfRad], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(Math.PI * 2);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(Math.PI * 1);
  });

  test('Undefined to deg unit conversion', () => {
    let animation = animate('#target-id', { rotate: [360, '180deg'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(360);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(180);
  });

  test('Turn to deg unit conversion', () => {
    let animation = animate('#target-id', { rotate: ['1turn', '180deg'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(360);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(180);
  });

  test('Rad to turn unit conversion', () => {
    let animation = animate('#target-id', { rotate: [oneRad, '180deg'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumber).to.equal(360);
    expect(getChildAtIndex(animation, 0)._toNumber).to.equal(180);
  });

  test('Value type is set to UNIT after unit conversion (#1170)', () => {
    let animation = animate('#target-id', { rotate: ['360deg', '.5turn'], autoplay: false });
    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.UNIT);
  });

});

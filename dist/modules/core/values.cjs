/**
 * Anime.js - core - CJS
 * @version v4.4.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var helpers = require('./helpers.cjs');
var transforms = require('./transforms.cjs');
var colors = require('./colors.cjs');

/**
* @import {
*   Target,
*   DOMTarget,
*   Tween,
*   TweenPropValue,
*   TweenDecomposedValue,
*   TargetsArray,
* } from '../types/index.js'
*/

/**
 * @template T, D
 * @param {T|undefined} targetValue
 * @param {D} defaultValue
 * @return {T|D}
 */
const setValue = (targetValue, defaultValue) => {
  return helpers.isUnd(targetValue) ? defaultValue : targetValue;
};

/**
 * @param  {TweenPropValue} value
 * @param  {Target} target
 * @param  {Number} index
 * @param  {TargetsArray} targets
 * @param  {Object|null} store
 * @param  {Tween|null} prevTween
 * @return {any}
 */
const getFunctionValue = (value, target, index, targets, store, prevTween) => {
  let func;
  if (helpers.isFnc(value)) {
    func = () => {
      const computed = /** @type {Function} */(value)(target, index, targets, prevTween);
      // Fallback to 0 if the function returns undefined / NaN / null / false / 0
      return !isNaN(+computed) ? +computed : computed || 0;
    };
  } else if (helpers.isStr(value) && helpers.stringStartsWith(value, consts.cssVarPrefix)) {
    func = () => {
      const match = value.match(consts.cssVariableMatchRgx);
      const cssVarName = match[1];
      const fallbackValue = match[2];
      let computed = getComputedStyle(/** @type {HTMLElement} */(target))?.getPropertyValue(cssVarName);
      // Use fallback if CSS variable is not set or empty
      if ((!computed || computed.trim() === consts.emptyString) && fallbackValue) {
        computed = fallbackValue.trim();
      }
      return computed || 0;
    };
  } else {
    return value;
  }
  if (store) store.func = func;
  return func();
};

/**
 * @param  {Target} target
 * @param  {String} prop
 * @return {tweenTypes}
 */
const getTweenType = (target, prop) => {
  return !target[consts.isDomSymbol] ? consts.tweenTypes.OBJECT :
    // Handle SVG attributes
    target[consts.isSvgSymbol] && helpers.isValidSVGAttribute(target, prop) ? consts.tweenTypes.ATTRIBUTE :
    // Handle CSS Transform properties differently than CSS to allow individual animations
    consts.validTransforms.includes(prop) || consts.shortTransforms.get(prop) ? consts.tweenTypes.TRANSFORM :
    // CSS variables
    helpers.stringStartsWith(prop, '--') ? consts.tweenTypes.CSS_VAR :
    // All other CSS properties
    prop in /** @type {DOMTarget} */(target).style ? consts.tweenTypes.CSS :
    // Handle other DOM Attributes
    prop in target ? consts.tweenTypes.OBJECT :
    consts.tweenTypes.ATTRIBUTE;
};

/**
 * @param  {DOMTarget} target
 * @param  {String} propName
 * @param  {Object} animationInlineStyles
 * @return {String}
 */
const getCSSValue = (target, propName, animationInlineStyles) => {
  const inlineStyles = target.style[propName];
  if (inlineStyles && animationInlineStyles) {
    animationInlineStyles[propName] = inlineStyles;
  }
  const value = inlineStyles || getComputedStyle(target[consts.proxyTargetSymbol] || target).getPropertyValue(propName);
  return value === 'auto' ? '0' : value;
};

/**
 * @param {Target} target
 * @param {String} propName
 * @param {tweenTypes} [tweenType]
 * @param {Object|void} [animationInlineStyles]
 * @return {String|Number}
 */
const getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
  const type = !helpers.isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  if (type === consts.tweenTypes.OBJECT) {
    const value = target[propName];
    if (value && animationInlineStyles) animationInlineStyles[propName] = value;
    return value || 0;
  }
  if (type === consts.tweenTypes.ATTRIBUTE) {
    const value = /** @type {DOMTarget} */(target).getAttribute(propName);
    if (value && animationInlineStyles) animationInlineStyles[propName] = value;
    return value;
  }
  return type === consts.tweenTypes.TRANSFORM ? transforms.parseInlineTransforms(/** @type {DOMTarget} */(target), propName, animationInlineStyles) :
         type === consts.tweenTypes.CSS_VAR ? getCSSValue(/** @type {DOMTarget} */(target), propName, animationInlineStyles).trimStart() :
         getCSSValue(/** @type {DOMTarget} */(target), propName, animationInlineStyles);
};

/**
 * @param  {Number} x
 * @param  {Number} y
 * @param  {String} operator
 * @return {Number}
 */
const getRelativeValue = (x, y, operator) => {
  return operator === '-' ? x - y :
         operator === '+' ? x + y :
         x * y;
};

/** @return {TweenDecomposedValue} */
const createDecomposedValueTargetObject = () => {
  return {
    /** @type {valueTypes} */
    t: consts.valueTypes.NUMBER,
    n: 0,
    u: null,
    o: null,
    d: null,
    s: null,
  }
};

/**
 * @param  {String|Number} rawValue
 * @param  {TweenDecomposedValue} targetObject
 * @return {TweenDecomposedValue}
 */
const decomposeRawValue = (rawValue, targetObject) => {
  /** @type {valueTypes} */
  targetObject.t = consts.valueTypes.NUMBER;
  targetObject.n = 0;
  targetObject.u = null;
  targetObject.o = null;
  targetObject.d = null;
  targetObject.s = null;
  if (!rawValue) return targetObject;
  const num = +rawValue;
  if (!isNaN(num)) {
    // It's a number
    targetObject.n = num;
    return targetObject;
  } else {
    // let str = /** @type {String} */(rawValue).trim();
    let str = /** @type {String} */(rawValue);
    // Parsing operators (+=, -=, *=) manually is much faster than using regex here
    if (str[1] === '=') {
      targetObject.o = str[0];
      str = str.slice(2);
    }
    // Skip exec regex if the value type is complex or color to avoid long regex backtracking
    const unitMatch = str.includes(' ') ? false : consts.unitsExecRgx.exec(str);
    if (unitMatch) {
      // Has a number and a unit
      targetObject.t = consts.valueTypes.UNIT;
      targetObject.n = +unitMatch[1];
      targetObject.u = unitMatch[2];
      return targetObject;
    } else if (targetObject.o) {
      // Has an operator (+=, -=, *=)
      targetObject.n = +str;
      return targetObject;
    } else if (helpers.isCol(str)) {
      // Is a color
      targetObject.t = consts.valueTypes.COLOR;
      targetObject.d = colors.convertColorStringValuesToRgbaArray(str);
      return targetObject;
    } else {
      // Is a more complex string (generally svg coords, calc() or filters CSS values)
      const matchedNumbers = str.match(consts.digitWithExponentRgx);
      targetObject.t = consts.valueTypes.COMPLEX;
      targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
      targetObject.s = str.split(consts.digitWithExponentRgx) || [];
      return targetObject;
    }
  }
};

/**
 * @param  {Tween} tween
 * @param  {TweenDecomposedValue} targetObject
 * @return {TweenDecomposedValue}
 */
const decomposeTweenValue = (tween, targetObject) => {
  targetObject.t = tween._valueType;
  targetObject.n = tween._toNumber;
  targetObject.u = tween._unit;
  targetObject.o = null;
  targetObject.d = helpers.cloneArray(tween._toNumbers);
  targetObject.s = helpers.cloneArray(tween._strings);
  return targetObject;
};

const decomposedOriginalValue = createDecomposedValueTargetObject();

/**
 * @param  {Tween} tween
 * @param  {Number} progress
 * @param  {Number} precision
 * @return {String}
 */
const composeColorValue = (tween, progress, precision) => {
  const mod = tween._modifier;
  const fn = tween._fromNumbers;
  const tn = tween._toNumbers;
  const r = helpers.round(helpers.clamp(/** @type {Number} */(mod(helpers.lerp(fn[0], tn[0], progress))), 0, 255), 0);
  const g = helpers.round(helpers.clamp(/** @type {Number} */(mod(helpers.lerp(fn[1], tn[1], progress))), 0, 255), 0);
  const b = helpers.round(helpers.clamp(/** @type {Number} */(mod(helpers.lerp(fn[2], tn[2], progress))), 0, 255), 0);
  const a = helpers.clamp(/** @type {Number} */(mod(helpers.round(helpers.lerp(fn[3], tn[3], progress), precision))), 0, 1);
  if (tween._composition !== consts.compositionTypes.none) {
    const ns = tween._numbers;
    ns[0] = r;
    ns[1] = g;
    ns[2] = b;
    ns[3] = a;
  }
  return `rgba(${r},${g},${b},${a})`;
};

/**
 * @param  {Tween} tween
 * @param  {Number} progress
 * @param  {Number} precision
 * @return {String}
 */
const composeComplexValue = (tween, progress, precision) => {
  const mod = tween._modifier;
  const fn = tween._fromNumbers;
  const tn = tween._toNumbers;
  const ts = tween._strings;
  const hasComposition = tween._composition !== consts.compositionTypes.none;
  let v = ts[0];
  for (let j = 0, l = tn.length; j < l; j++) {
    const n = /** @type {Number} */(mod(helpers.round(helpers.lerp(fn[j], tn[j], progress), precision)));
    const s = ts[j + 1];
    v += `${s ? n + s : n}`;
    if (hasComposition) {
      tween._numbers[j] = n;
    }
  }
  return v;
};

exports.composeColorValue = composeColorValue;
exports.composeComplexValue = composeComplexValue;
exports.createDecomposedValueTargetObject = createDecomposedValueTargetObject;
exports.decomposeRawValue = decomposeRawValue;
exports.decomposeTweenValue = decomposeTweenValue;
exports.decomposedOriginalValue = decomposedOriginalValue;
exports.getFunctionValue = getFunctionValue;
exports.getOriginalAnimatableValue = getOriginalAnimatableValue;
exports.getRelativeValue = getRelativeValue;
exports.getTweenType = getTweenType;
exports.setValue = setValue;

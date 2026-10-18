/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { valueTypes, unitsExecRgx, digitWithExponentRgx, tweenTypes, isDomSymbol, isSvgSymbol, validTransforms, shortTransforms, proxyTargetSymbol, cssVariableMatchRgx, emptyString, cssVarPrefix } from './consts.js';
import { isUnd, isCol, isValidSVGAttribute, stringStartsWith, isFnc, isStr, round, lerp, cloneArray } from './helpers.js';
import { parseInlineTransforms } from './transforms.js';
import { resolveAdapterEntry } from '../adapters/registry.js';
import { convertColorStringValuesToRgbaArray } from './colors.js';

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
  return isUnd(targetValue) ? defaultValue : targetValue;
};

/**
 * Resolve against the target when it's a DOM element, otherwise fall back to :root so non-DOM targets like three.js meshes and custom adapters still pick up CSS variables defined on the document.
 *
 * @param  {String} value
 * @param  {Target} target
 * @return {String|Number}
 */
const resolveCssVar = (value, target) => {
  const match = value.match(cssVariableMatchRgx);
  const el = target[isDomSymbol] ? target : document.documentElement;
  let computed = getComputedStyle(/** @type {HTMLElement} */(el))?.getPropertyValue(match[1]);
  if ((!computed || computed.trim() === emptyString) && match[2]) computed = match[2].trim();
  return computed || 0;
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
  if (isFnc(value)) {
    if (!store) {
      const computed = /** @type {Function} */(value)(target, index, targets, prevTween);
      // Fallback to 0 if the function returns undefined, NaN, null, false or 0
      return !isNaN(+computed) ? +computed : computed || 0;
    }
    const func = () => {
      const computed = /** @type {Function} */(value)(target, index, targets, prevTween);
      return !isNaN(+computed) ? +computed : computed || 0;
    };
    store.func = func;
    return func();
  }
  if (isStr(value) && stringStartsWith(value, cssVarPrefix)) {
    if (!store) return resolveCssVar(/** @type {String} */(value), target);
    const func = () => resolveCssVar(/** @type {String} */(value), target);
    store.func = func;
    return func();
  }
  return value;
};

/**
 * @param  {Target} target
 * @param  {String} prop
 * @return {tweenTypes}
 */
const getTweenType = (target, prop) => {
  return !target[isDomSymbol] ? tweenTypes.OBJECT :
    // Handle SVG attributes
    target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE :
    // Handle CSS Transform properties differently than CSS to allow individual animations
    validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM :
    // CSS variables
    stringStartsWith(prop, '--') ? tweenTypes.CSS_VAR :
    // All other CSS properties
    prop in /** @type {DOMTarget} */(target).style ? tweenTypes.CSS :
    // Handle other DOM Attributes
    prop in target ? tweenTypes.OBJECT :
    tweenTypes.ATTRIBUTE;
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
  const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
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
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  const adapterProp = resolveAdapterEntry(target, propName);
  if (adapterProp) {
    const value = adapterProp.get(target);
    if (value && animationInlineStyles) animationInlineStyles[propName] = value;
    return value == null ? 0 : value;
  }
  if (type === tweenTypes.OBJECT) {
    const value = target[propName];
    if (value && animationInlineStyles) animationInlineStyles[propName] = value;
    return value || 0;
  }
  if (type === tweenTypes.ATTRIBUTE) {
    const value = /** @type {DOMTarget} */(target).getAttribute(propName);
    if (value && animationInlineStyles) animationInlineStyles[propName] = value;
    return value;
  }
  return type === tweenTypes.TRANSFORM ? parseInlineTransforms(/** @type {DOMTarget} */(target), propName, animationInlineStyles) :
         type === tweenTypes.CSS_VAR ? getCSSValue(/** @type {DOMTarget} */(target), propName, animationInlineStyles).trimStart() :
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
    t: valueTypes.NUMBER,
    n: 0,
    u: null,
    o: null,
    d: null,
    s: null,
  }
};

/**
 * @param  {String|Number|Object} rawValue
 * @param  {TweenDecomposedValue} targetObject
 * @return {TweenDecomposedValue}
 */
const decomposeRawValue = (rawValue, targetObject) => {
  /** @type {valueTypes} */
  targetObject.t = valueTypes.NUMBER;
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
  }
  // let str = /** @type {String} */(rawValue).trim();
  let str = /** @type {String} */(rawValue);
  // Parsing operators (+=, -=, *=) manually is much faster than using regex here
  if (str[1] === '=') {
    targetObject.o = str[0];
    str = str.slice(2);
  }
  // Skip exec regex if the value type is complex or color to avoid long regex backtracking
  const unitMatch = str.includes(' ') ? false : unitsExecRgx.exec(str);
  if (unitMatch) {
    // Has a number and a unit
    targetObject.t = valueTypes.UNIT;
    targetObject.n = +unitMatch[1];
    targetObject.u = unitMatch[2];
    return targetObject;
  } else if (targetObject.o) {
    // Has an operator (+=, -=, *=)
    targetObject.n = +str;
    return targetObject;
  } else if (isCol(str)) {
    // Color string
    targetObject.t = valueTypes.COLOR;
    targetObject.d = convertColorStringValuesToRgbaArray(str);
    return targetObject;
  } else {
    // Is a more complex string (generally svg coords, calc() or filters CSS values)
    const matchedNumbers = str.match(digitWithExponentRgx);
    targetObject.t = valueTypes.COMPLEX;
    targetObject.d = matchedNumbers ? matchedNumbers.map(Number) : [];
    targetObject.s = str.split(digitWithExponentRgx) || [];
    return targetObject;
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
  targetObject.d = cloneArray(tween._toNumbers);
  targetObject.s = cloneArray(tween._strings);
  return targetObject;
};

const decomposedOriginalValue = createDecomposedValueTargetObject();

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
  let v = ts[0];
  for (let j = 0, l = tn.length; j < l; j++) {
    const n = /** @type {Number} */(mod(round(lerp(fn[j], tn[j], progress), precision)));
    const s = ts[j + 1];
    v += `${s ? n + s : n}`;
    // Keep _numbers fresh for every tween, not only composed ones, so a non-composition setter that reads the lerped triplet such as three transformOrigin still animates.
    // Potential optimization, skip the write when nothing reads it: if (hasComposition || tween._setter) tween._numbers[j] = n;
    tween._numbers[j] = n;
  }
  return v;
};

export { composeComplexValue, createDecomposedValueTargetObject, decomposeRawValue, decomposeTweenValue, decomposedOriginalValue, getFunctionValue, getOriginalAnimatableValue, getRelativeValue, getTweenType, setValue };

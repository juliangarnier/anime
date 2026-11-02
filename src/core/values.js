import {
  shortTransforms,
  validTransforms,
  tweenTypes,
  valueTypes,
  digitWithExponentRgx,
  unitsExecRgx,
  isDomSymbol,
  isSvgSymbol,
  proxyTargetSymbol,
  cssVarPrefix,
  cssVariableMatchRgx,
  emptyString,
} from './consts.js';

import {
  stringStartsWith,
  cloneArray,
  isFnc,
  isUnd,
  isCol,
  isValidSVGAttribute,
  isStr,
  round,
  lerp,
} from './helpers.js';

import {
  parseInlineTransforms,
} from './transforms.js';

import {
  resolveAdapterEntry,
} from '../adapters/registry.js';

import {
  convertColorStringValuesToRgbaArray,
} from './colors.js';

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
 * @typedef {Object} InlineValueStore
 * @property {String|Number|null|undefined|Symbol} value
 */

/** @type {TweenDecomposedValue} */
export const decomposedOriginalValue = {
  t: valueTypes.NUMBER,
  n: 0,
  u: null,
  o: null,
  d: null,
  s: null,
}

/**
 * @template T, D
 * @param {T|undefined} targetValue
 * @param {D} defaultValue
 * @return {T|D}
 */
export const setValue = (targetValue, defaultValue) => {
  return isUnd(targetValue) ? defaultValue : targetValue;
}

/**
 * Read a CSS variable for a target, from the element itself or from the document root.
 *
 * @param  {String} value
 * @param  {Target} target
 * @return {String|Number}
 */
const resolveCssVar = (value, target) => {
  const match = value.match(cssVariableMatchRgx);
  // Fall back to the document root so non DOM targets like three.js meshes still read document CSS variables.
  const element = target[isDomSymbol] ? target : document.documentElement;
  let computed = getComputedStyle(/** @type {HTMLElement} */(element))?.getPropertyValue(match[1]);
  if ((!computed || computed.trim() === emptyString) && match[2]) computed = match[2].trim();
  return computed || 0;
}

/**
 * @param  {TweenPropValue} value
 * @param  {Target} target
 * @param  {Number} index
 * @param  {TargetsArray} targets
 * @param  {Tween|null} prevTween
 * @return {any}
 */
export const getFunctionValue = (value, target, index, targets, prevTween) => {
  if (isFnc(value)) {
    const computed = /** @type {Function} */(value)(target, index, targets, prevTween);
    // Fallback to 0 if the function returns undefined, NaN, null, false or 0
    return !isNaN(+computed) ? +computed : computed || 0;
  }
  if (isStr(value) && stringStartsWith(value, cssVarPrefix)) {
    return resolveCssVar(/** @type {String} */(value), target);
  }
  return value;
}

/**
 * @param  {TweenPropValue} value
 * @param  {Target} target
 * @param  {Number} index
 * @param  {TargetsArray} targets
 * @param  {Tween|null} prevTween
 * @return {Function|null}
 */
export const getValueResolver = (value, target, index, targets, prevTween) => {
  return isFnc(value) || isStr(value) && stringStartsWith(value, cssVarPrefix) ?
    () => getFunctionValue(value, target, index, targets, prevTween) : null;
}

/**
 * @param  {Target} target
 * @param  {String} prop
 * @return {tweenTypes}
 */
export const getTweenType = (target, prop) => {
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
}

/**
 * @param  {DOMTarget} target
 * @param  {String} propName
 * @param  {InlineValueStore} [inlineValueStore]
 * @return {String}
 */
const getCSSValue = (target, propName, inlineValueStore) => {
  const inlineStyles = target.style[propName];
  if (inlineStyles && inlineValueStore) {
    inlineValueStore.value = inlineStyles;
  }
  const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
  return value === 'auto' ? '0' : value;
}

/**
 * @param {Target} target
 * @param {String} propName
 * @param {tweenTypes} [tweenType]
 * @param {InlineValueStore} [inlineValueStore]
 * @return {String|Number}
 */
export const getOriginalAnimatableValue = (target, propName, tweenType, inlineValueStore) => {
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  const adapterProp = resolveAdapterEntry(target, propName);
  if (adapterProp) {
    const value = adapterProp.get(target);
    if (inlineValueStore) inlineValueStore.value = value;
    return value == null ? 0 : value;
  }
  if (type === tweenTypes.OBJECT) {
    const value = target[propName];
    if (inlineValueStore) inlineValueStore.value = value;
    return value || 0;
  }
  if (type === tweenTypes.ATTRIBUTE) {
    const value = /** @type {DOMTarget} */(target).getAttribute(propName);
    if (value && inlineValueStore) inlineValueStore.value = value;
    return value;
  }
  return type === tweenTypes.TRANSFORM ? parseInlineTransforms(/** @type {DOMTarget} */(target), propName, inlineValueStore) :
         type === tweenTypes.CSS_VAR ? getCSSValue(/** @type {DOMTarget} */(target), propName, inlineValueStore).trimStart() :
         getCSSValue(/** @type {DOMTarget} */(target), propName, inlineValueStore);
}

/**
 * @param  {Number} x
 * @param  {Number} y
 * @param  {String} operator
 * @return {Number}
 */
export const getRelativeValue = (x, y, operator) => {
  return operator === '-' ? x - y :
         operator === '+' ? x + y :
         x * y;
}

/**
 * @param  {String|Number|Object} rawValue
 * @return {TweenDecomposedValue}
 */
export const decomposeRawValue = rawValue => {
  /** @type {valueTypes} */
  let type = valueTypes.NUMBER;
  let number = 0;
  let unit = null;
  let operator = null;
  let numbers = null;
  let strings = null;
  if (rawValue) {
    const num = +rawValue;
    if (!isNaN(num)) {
      // It's a number
      number = num;
    } else {
      // let str = /** @type {String} */(rawValue).trim();
      let str = /** @type {String} */(rawValue);
      // Parsing operators (+=, -=, *=) manually is much faster than using regex here
      if (str[1] === '=') {
        operator = str[0];
        str = str.slice(2);
      }
      // Skip exec regex if the value type is complex or color to avoid long regex backtracking
      const unitMatch = str.includes(' ') ? false : unitsExecRgx.exec(str);
      if (unitMatch) {
        // Has a number and a unit
        type = valueTypes.UNIT;
        number = +unitMatch[1];
        unit = unitMatch[2];
      } else if (operator) {
        // Has an operator (+=, -=, *=)
        number = +str;
      } else if (isCol(str)) {
        // Color string
        type = valueTypes.COLOR;
        numbers = convertColorStringValuesToRgbaArray(str);
      } else {
        // Is a more complex string (generally svg coords, calc() or filters CSS values)
        const matchedNumbers = str.match(digitWithExponentRgx);
        type = valueTypes.COMPLEX;
        numbers = matchedNumbers ? matchedNumbers.map(Number) : [];
        strings = str.split(digitWithExponentRgx);
      }
    }
  }
  decomposedOriginalValue.t = type;
  decomposedOriginalValue.n = number;
  decomposedOriginalValue.u = unit;
  decomposedOriginalValue.o = operator;
  decomposedOriginalValue.d = numbers;
  decomposedOriginalValue.s = strings;
  return decomposedOriginalValue;
}

/**
 * @param  {Tween} tween
 * @return {TweenDecomposedValue}
 */
export const decomposeTweenValue = tween => {
  decomposedOriginalValue.t = tween._valueType;
  decomposedOriginalValue.n = tween._toNumber;
  decomposedOriginalValue.u = tween._unit;
  decomposedOriginalValue.o = null;
  decomposedOriginalValue.d = cloneArray(tween._toNumbers);
  decomposedOriginalValue.s = cloneArray(tween._strings);
  return decomposedOriginalValue;
}

/**
 * @param  {Tween} tween
 * @param  {Number} progress
 * @param  {Number} precision
 * @param  {Boolean} [stringify]
 * @return {String|undefined}
 */
export const composeComplexValue = (tween, progress, precision, stringify = true) => {
  const mod = tween._modifier;
  const fn = tween._fromNumbers;
  const tn = tween._toNumbers;
  const ns = tween._numbers;
  const l = tn.length;
  // Fill _numbers before the string so adapters read the numbers and skip the unused string.
  // Fill _numbers for every tween, not only composed ones, so setters that read them still animate.
  for (let j = 0; j < l; j++) {
    ns[j] = /** @type {Number} */(mod(round(lerp(fn[j], tn[j], progress), precision)));
  }
  if (!stringify) return;
  const ts = tween._strings;
  let v = ts[0];
  for (let j = 0; j < l; j++) {
    const n = ns[j];
    const s = ts[j + 1];
    v += `${s ? n + s : n}`;
  }
  return v;
}

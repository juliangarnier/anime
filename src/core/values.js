import {
  shortTransforms,
  validTransforms,
  tweenTypes,
  valueTypes,
  digitWithExponentRgx,
  unitsExecRgx,
  cssUrlFunctionRgx,
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
} from './helpers.js';

import {
  parseInlineTransforms,
} from './transforms.js';

import {
  convertColorStringValuesToRgbaArray
} from './colors.js';

/**
* @import {
*   Target,
*   DOMTarget,
*   Tween,
*   TweenPropValue,
*   TweenDecomposedValue,
* } from '../types/index.js'
*/

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
 * @param  {TweenPropValue} value
 * @param  {Target} target
 * @param  {Number} index
 * @param  {Number} total
 * @param  {Object} [store]
 * @return {any}
 */
export const getFunctionValue = (value, target, index, total, store) => {
  let func;
  if (isFnc(value)) {
    func = () => {
      const computed = /** @type {Function} */(value)(target, index, total);
      // Fallback to 0 if the function returns undefined / NaN / null / false / 0
      return !isNaN(+computed) ? +computed : computed || 0;
    }
  } else if (isStr(value) && stringStartsWith(value, cssVarPrefix)) {
    func = () => {
      const match = value.match(cssVariableMatchRgx);
      const cssVarName = match[1];
      const fallbackValue = match[2];
      let computed = getComputedStyle(/** @type {HTMLElement} */(target))?.getPropertyValue(cssVarName);
      // Use fallback if CSS variable is not set or empty
      if ((!computed || computed.trim() === emptyString) && fallbackValue) {
        computed = fallbackValue.trim();
      }
      return computed || 0;
    }
  } else {
    return value;
  }
  if (store) store.func = func;
  return func();
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
}

/**
 * @param {Target} target
 * @param {String} propName
 * @param {tweenTypes} [tweenType]
 * @param {Object|void} [animationInlineStyles]
 * @return {String|Number}
 */
export const getOriginalAnimatableValue = (target, propName, tweenType, animationInlineStyles) => {
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  return type === tweenTypes.OBJECT ? target[propName] || 0 :
         type === tweenTypes.ATTRIBUTE ? /** @type {DOMTarget} */(target).getAttribute(propName) :
         type === tweenTypes.TRANSFORM ? parseInlineTransforms(/** @type {DOMTarget} */(target), propName, animationInlineStyles) :
         type === tweenTypes.CSS_VAR ? getCSSValue(/** @type {DOMTarget} */(target), propName, animationInlineStyles).trimStart() :
         getCSSValue(/** @type {DOMTarget} */(target), propName, animationInlineStyles);
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

/** @return {TweenDecomposedValue} */
export const createDecomposedValueTargetObject = () => {
  return {
    /** @type {valueTypes} */
    t: valueTypes.NUMBER,
    n: 0,
    u: null,
    o: null,
    d: null,
    s: null,
  }
}

/**
 * @param {String} str
 * @param {TweenDecomposedValue} targetObject
 * @return {TweenDecomposedValue}
 */
const decomposeComplexStringValue = (str, targetObject) => {
  const numbers = targetObject.d;
  const strings = targetObject.s;
  let lastIndex = 0;

  const appendParsedSegment = segment => {
    const matchedNumbers = segment.match(digitWithExponentRgx);
    if (matchedNumbers) {
      const splitStrings = segment.split(digitWithExponentRgx);
      strings[strings.length - 1] += splitStrings[0];
      for (let i = 0, l = matchedNumbers.length; i < l; i++) {
        numbers.push(+matchedNumbers[i]);
        strings.push(splitStrings[i + 1]);
      }
    } else {
      strings[strings.length - 1] += segment;
    }
  }

  strings.push(emptyString);
  str.replace(cssUrlFunctionRgx, (urlToken, offset) => {
    appendParsedSegment(str.slice(lastIndex, offset));
    strings[strings.length - 1] += urlToken;
    lastIndex = offset + urlToken.length;
    return urlToken;
  });
  appendParsedSegment(str.slice(lastIndex));

  return targetObject;
}

/**
 * @param  {String|Number} rawValue
 * @param  {TweenDecomposedValue} targetObject
 * @return {TweenDecomposedValue}
 */
export const decomposeRawValue = (rawValue, targetObject) => {
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
  } else {
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
      // Is a color
      targetObject.t = valueTypes.COLOR;
      targetObject.d = convertColorStringValuesToRgbaArray(str);
      return targetObject;
    } else {
      // Is a more complex string (generally svg coords, calc() or filters CSS values)
      targetObject.t = valueTypes.COMPLEX;
      targetObject.d = [];
      targetObject.s = [];
      return decomposeComplexStringValue(str, targetObject);
    }
  }
}

/**
 * @param  {Tween} tween
 * @param  {TweenDecomposedValue} targetObject
 * @return {TweenDecomposedValue}
 */
export const decomposeTweenValue = (tween, targetObject) => {
  targetObject.t = tween._valueType;
  targetObject.n = tween._toNumber;
  targetObject.u = tween._unit;
  targetObject.o = null;
  targetObject.d = cloneArray(tween._toNumbers);
  targetObject.s = cloneArray(tween._strings);
  return targetObject;
}

export const decomposedOriginalValue = createDecomposedValueTargetObject();

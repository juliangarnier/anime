import {
  isBrowser,
  validRgbHslRgx,
  lowerCaseRgx,
  hexTestRgx,
  maxValue,
  minValue,
  noop,
  noopModifier,
} from './consts.js';

import {
  globals,
} from './globals.js';

/**
 * @import {
 *   Target,
 *   DOMTarget,
 * } from '../types/index.js'
 * @import { Timer } from '../timer/timer.js'
 * @import { WAAPIAnimation } from '../waapi/waapi.js'
*/

// Strings

/**
 * @param  {String} str
 * @return {String}
 */
export const toLowerCase = str => str.replace(lowerCaseRgx, '$1-$2').toLowerCase();

/**
 * Prioritize this method instead of regex when possible
 * @param  {String} str
 * @param  {String} sub
 * @return {Boolean}
 */
export const stringStartsWith = (str, sub) => str.indexOf(sub) === 0;

// Note: Date.now is used instead of performance.now since it is precise enough for timings calculations, performs slightly faster and works in Node.js environement.
export const now = Date.now;

// Types checkers

export const isArr = Array.isArray;
/**@param {any} a @return {a is Record<String, any>} */
export const isObj = a => a && a.constructor === Object;
/**@param {any} a @return {a is Number} */
export const isNum = a => typeof a === 'number' && !isNaN(a);
/**@param {any} a @return {a is String} */
export const isStr = a => typeof a === 'string';
/**@param {any} a @return {a is Function} */
export const isFnc = a => typeof a === 'function';
/**@param {any} a @return {a is undefined} */
export const isUnd = a => typeof a === 'undefined';
/**@param {any} a @return {a is null | undefined} */
export const isNil = a => a == null;
/**@param {any} a @return {a is SVGElement} */
export const isSvg = a => isBrowser && a instanceof SVGElement;
/**@param {any} a @return {Boolean} */
export const isHex = a => hexTestRgx.test(a);
/**@param {any} a @return {Boolean} */
export const isRgb = a => stringStartsWith(a, 'rgb');
/**@param {any} a @return {Boolean} */
export const isHsl = a => stringStartsWith(a, 'hsl');
/**@param {any} a @return {Boolean} */
export const isOklab = a => stringStartsWith(a, 'oklab(');
/**@param {any} a @return {Boolean} */
export const isOklch = a => stringStartsWith(a, 'oklch(');
/**@param {any} a @return {Boolean} */
export const isColorFn = a => stringStartsWith(a, 'color(');
/**@param {any} a @return {Boolean} */ // Make sure boxShadow syntax like 'rgb(255, 0, 0) 0px 0px 6px 0px' is not a valid color type
export const isCol = a => isHex(a) || ((isRgb(a) || isHsl(a) || isOklab(a) || isOklch(a) || isColorFn(a)) && (a[a.length - 1] === ')' || !validRgbHslRgx.test(a)));
/**@param {any} a @return {Boolean} */
export const isKey = a => !globals.defaults.hasOwnProperty(a);

// SVG

// Consider the following as CSS animation
// CSS opacity animation has better default values (opacity: 1 instead of 0))
// rotate is more commonly intended to be used as a transform
const svgCssReservedProperties = ['opacity', 'rotate', 'overflow', 'color'];

/**
 * @param  {Target} el
 * @param  {String} propertyName
 * @return {Boolean}
 */
export const isValidSVGAttribute = (el, propertyName) => {
  if (svgCssReservedProperties.includes(propertyName)) return false;
  if (el.getAttribute(propertyName) || propertyName in el) {
    if (propertyName === 'scale') { // Scale
      const elParentNode = /** @type {SVGGeometryElement} */(/** @type {DOMTarget} */(el).parentNode);
      // Only consider scale as a valid SVG attribute on filter element
      return elParentNode && elParentNode.tagName === 'filter';
    }
    return true;
  }
}

// Number

/**
 * @param  {Number|String} str
 * @return {Number}
 */
export const parseNumber = str => isStr(str) ?
  parseFloat(/** @type {String} */(str)) :
  /** @type {Number} */(str);

// Math

export const pow = Math.pow;
export const sqrt = Math.sqrt;
export const sin = Math.sin;
export const cos = Math.cos;
export const abs = Math.abs;
export const exp = Math.exp;
export const ceil = Math.ceil;
export const floor = Math.floor;
export const asin = Math.asin;
export const max = Math.max;
export const min = Math.min;
export const atan2 = Math.atan2;
export const PI = Math.PI;
export const _round = Math.round;

/**
 * Clamps a value between min and max bounds
 *
 * @param  {Number} v - Value to clamp
 * @param  {Number} min - Minimum boundary
 * @param  {Number} max - Maximum boundary
 * @return {Number}
 */
export const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

// Hold the multipliers round reads so it skips an exponentiation per call, which cost 8 to 13 percent on CSS updates.
const powersOfTen = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12];

/**
 * Rounds a number to specified decimal places
 *
 * @param  {Number} v - Value to round
 * @param  {Number} decimalLength - Number of decimal places
 * @return {Number}
 */
export const round = (v, decimalLength) => {
  if (decimalLength < 0) return v;
  if (!decimalLength) return _round(v);
  const p = powersOfTen[decimalLength] || 10 ** decimalLength;
  return _round(v * p) / p;
}

/**
 * Snaps a value to nearest increment or array value
 *
 * @param  {Number} v - Value to snap
 * @param  {Number|Array<Number>} increment - Step size or array of snap points
 * @return {Number}
 */
export const snap = (v, increment) => isArr(increment) ? increment.reduce((closest, cv) => (abs(cv - v) < abs(closest - v) ? cv : closest)) : increment ? _round(v / increment) * increment : v;

/**
 * Linear interpolation between two values
 *
 * @param  {Number} start - Starting value
 * @param  {Number} end - Ending value
 * @param  {Number} factor - Interpolation factor in the range [0, 1]
 * @return {Number} The interpolated value
 */
export const lerp = (start, end, factor) => factor === 1 ? end : factor === 0 ? start : start + (end - start) * factor;

/**
 * Replaces infinity with maximum safe value
 *
 * @param  {Number} v - Value to check
 * @return {Number}
 */
export const clampInfinity = v => v === Infinity ? maxValue : v === -Infinity ? -maxValue : v;

/**
 * Normalizes time value with minimum threshold
 *
 * @param  {Number} v - Time value to normalize
 * @return {Number}
 */
export const normalizeTime = v => v <= minValue ? minValue : clampInfinity(round(v, 11));

// Arrays

/**
 * @template T
 * @param    {T[]} a
 * @return   {T[]}
 */
export const cloneArray = a => isArr(a) ? [ ...a ] : a;

// Objects

/**
 * @template T
 * @template U
 * @param    {T} o1
 * @param    {U} o2
 * @return   {T & U}
 */
export const mergeObjects = (o1, o2) => {
  const merged = /** @type {T & U} */({ ...o1 });
  for (let p in o2) {
    const o1p = /** @type {T & U} */(o1)[p];
    merged[p] = isUnd(o1p) ? /** @type {T & U} */(o2)[p] : o1p;
  };
  return merged;
}

// Completion promises

let resolvingCompletion = null;

/**
 * @this {Timer|WAAPIAnimation}
 * @param {Function} [callback]
 * @return {Promise<unknown>}
 */
function completionThen(callback = noopModifier) {
  const instance = this;
  return new Promise((resolve, reject) => {
    // A muted instance never delivers completion, so its listeners stay pending like its callbacks.
    if (/** @type {Timer} */(instance).muted) return;
    const onResolve = () => {
      const previous = resolvingCompletion;
      // Mark instance as resolving so getCompletionThen hides then and the Promise does not call it again.
      resolvingCompletion = instance;
      try {
        resolve(callback(instance));
      } catch (error) {
        reject(error);
      }
      resolvingCompletion = previous;
    };
    if (instance.completed) {
      onResolve();
    } else {
      if (instance._resolve === noop) {
        const callbacks = [];
        // Queue and drain through the existing resolver so instances need no extra fields.
        instance._resolve = listener => {
          if (isFnc(listener)) {
            callbacks.push(listener);
          } else {
            instance._resolve = noop;
            for (let i = 0, l = callbacks.length; i < l; i++) callbacks[i]();
          }
        };
      }
      instance._resolve(onResolve);
    }
  });
}

// A Promise that resolves to an instance reads then again and would call it forever.
// Return null only during this second read so the loop stops without a temporary field on the instance.
/**
 * @param {Timer|WAAPIAnimation} instance
 * @return {Function|null}
 */
export const getCompletionThen = instance => resolvingCompletion === instance ? null : completionThen;

// Linked lists

/**
 * @param  {Object} parent
 * @param  {Function} callback
 * @param  {Boolean} [reverse]
 * @return {void}
 */
export const forEachChildren = (parent, callback, reverse) => {
  let next = reverse ? parent._tail : parent._head;
  while (next) {
    const currentNext = reverse ? next._prev : next._next;
    callback(next);
    next = currentNext;
  }
}

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @return {void}
 */
export const removeChild = (parent, child) => {
  const prev = child._prev;
  const next = child._next;
  prev ? prev._next = next : parent._head = next;
  next ? next._prev = prev : parent._tail = prev;
  child._prev = null;
  child._next = null;
}

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @param  {Function} [sortMethod]
 * @return {void}
 */
export const addChild = (parent, child, sortMethod) => {
  let prev = parent._tail;
  while (prev && sortMethod && sortMethod(prev, child)) prev = prev._prev;
  const next = prev ? prev._next : parent._head;
  prev ? prev._next = child : parent._head = child;
  next ? next._prev = child : parent._tail = child;
  child._prev = prev;
  child._next = next;
}

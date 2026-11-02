/**
 * Anime.js - core - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var globals = require('./globals.cjs');

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
const toLowerCase = str => str.replace(consts.lowerCaseRgx, '$1-$2').toLowerCase();

/**
 * Prioritize this method instead of regex when possible
 * @param  {String} str
 * @param  {String} sub
 * @return {Boolean}
 */
const stringStartsWith = (str, sub) => str.indexOf(sub) === 0;

// Note: Date.now is used instead of performance.now since it is precise enough for timings calculations, performs slightly faster and works in Node.js environement.
const now = Date.now;

// Types checkers

const isArr = Array.isArray;
/**@param {any} a @return {a is Record<String, any>} */
const isObj = a => a && a.constructor === Object;
/**@param {any} a @return {a is Number} */
const isNum = a => typeof a === 'number' && !isNaN(a);
/**@param {any} a @return {a is String} */
const isStr = a => typeof a === 'string';
/**@param {any} a @return {a is Function} */
const isFnc = a => typeof a === 'function';
/**@param {any} a @return {a is undefined} */
const isUnd = a => typeof a === 'undefined';
/**@param {any} a @return {a is null | undefined} */
const isNil = a => a == null;
/**@param {any} a @return {a is SVGElement} */
const isSvg = a => consts.isBrowser && a instanceof SVGElement;
/**@param {any} a @return {Boolean} */
const isHex = a => consts.hexTestRgx.test(a);
/**@param {any} a @return {Boolean} */
const isRgb = a => stringStartsWith(a, 'rgb');
/**@param {any} a @return {Boolean} */
const isHsl = a => stringStartsWith(a, 'hsl');
/**@param {any} a @return {Boolean} */
const isOklab = a => stringStartsWith(a, 'oklab(');
/**@param {any} a @return {Boolean} */
const isOklch = a => stringStartsWith(a, 'oklch(');
/**@param {any} a @return {Boolean} */
const isColorFn = a => stringStartsWith(a, 'color(');
/**@param {any} a @return {Boolean} */ // Make sure boxShadow syntax like 'rgb(255, 0, 0) 0px 0px 6px 0px' is not a valid color type
const isCol = a => isHex(a) || ((isRgb(a) || isHsl(a) || isOklab(a) || isOklch(a) || isColorFn(a)) && (a[a.length - 1] === ')' || !consts.validRgbHslRgx.test(a)));
/**@param {any} a @return {Boolean} */
const isKey = a => !globals.globals.defaults.hasOwnProperty(a);

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
const isValidSVGAttribute = (el, propertyName) => {
  if (svgCssReservedProperties.includes(propertyName)) return false;
  if (el.getAttribute(propertyName) || propertyName in el) {
    if (propertyName === 'scale') { // Scale
      const elParentNode = /** @type {SVGGeometryElement} */(/** @type {DOMTarget} */(el).parentNode);
      // Only consider scale as a valid SVG attribute on filter element
      return elParentNode && elParentNode.tagName === 'filter';
    }
    return true;
  }
};

// Number

/**
 * @param  {Number|String} str
 * @return {Number}
 */
const parseNumber = str => isStr(str) ?
  parseFloat(/** @type {String} */(str)) :
  /** @type {Number} */(str);

// Math

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const abs = Math.abs;
const exp = Math.exp;
const ceil = Math.ceil;
const floor = Math.floor;
const asin = Math.asin;
const max = Math.max;
const min = Math.min;
const atan2 = Math.atan2;
const PI = Math.PI;
const _round = Math.round;

/**
 * Clamps a value between min and max bounds
 *
 * @param  {Number} v - Value to clamp
 * @param  {Number} min - Minimum boundary
 * @param  {Number} max - Maximum boundary
 * @return {Number}
 */
const clamp = (v, min, max) => v < min ? min : v > max ? max : v;

// Hold the multipliers round reads so it skips an exponentiation per call, which cost 8 to 13 percent on CSS updates.
const powersOfTen = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12];

/**
 * Rounds a number to specified decimal places
 *
 * @param  {Number} v - Value to round
 * @param  {Number} decimalLength - Number of decimal places
 * @return {Number}
 */
const round = (v, decimalLength) => {
  if (decimalLength < 0) return v;
  if (!decimalLength) return _round(v);
  const p = powersOfTen[decimalLength] || 10 ** decimalLength;
  return _round(v * p) / p;
};

/**
 * Snaps a value to nearest increment or array value
 *
 * @param  {Number} v - Value to snap
 * @param  {Number|Array<Number>} increment - Step size or array of snap points
 * @return {Number}
 */
const snap = (v, increment) => isArr(increment) ? increment.reduce((closest, cv) => (abs(cv - v) < abs(closest - v) ? cv : closest)) : increment ? _round(v / increment) * increment : v;

/**
 * Linear interpolation between two values
 *
 * @param  {Number} start - Starting value
 * @param  {Number} end - Ending value
 * @param  {Number} factor - Interpolation factor in the range [0, 1]
 * @return {Number} The interpolated value
 */
const lerp = (start, end, factor) => factor === 1 ? end : factor === 0 ? start : start + (end - start) * factor;

/**
 * Replaces infinity with maximum safe value
 *
 * @param  {Number} v - Value to check
 * @return {Number}
 */
const clampInfinity = v => v === Infinity ? consts.maxValue : v === -Infinity ? -consts.maxValue : v;

/**
 * Normalizes time value with minimum threshold
 *
 * @param  {Number} v - Time value to normalize
 * @return {Number}
 */
const normalizeTime = v => v <= consts.minValue ? consts.minValue : clampInfinity(round(v, 11));

// Arrays

/**
 * @template T
 * @param    {T[]} a
 * @return   {T[]}
 */
const cloneArray = a => isArr(a) ? [ ...a ] : a;

// Objects

/**
 * @template T
 * @template U
 * @param    {T} o1
 * @param    {U} o2
 * @return   {T & U}
 */
const mergeObjects = (o1, o2) => {
  const merged = /** @type {T & U} */({ ...o1 });
  for (let p in o2) {
    const o1p = /** @type {T & U} */(o1)[p];
    merged[p] = isUnd(o1p) ? /** @type {T & U} */(o2)[p] : o1p;
  }  return merged;
};

// Completion promises

let resolvingCompletion = null;

/**
 * @this {Timer|WAAPIAnimation}
 * @param {Function} [callback]
 * @return {Promise<unknown>}
 */
function completionThen(callback = consts.noopModifier) {
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
      if (instance._resolve === consts.noop) {
        const callbacks = [];
        // Queue and drain through the existing resolver so instances need no extra fields.
        instance._resolve = listener => {
          if (isFnc(listener)) {
            callbacks.push(listener);
          } else {
            instance._resolve = consts.noop;
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
const getCompletionThen = instance => resolvingCompletion === instance ? null : completionThen;

// Linked lists

/**
 * @param  {Object} parent
 * @param  {Function} callback
 * @param  {Boolean} [reverse]
 * @return {void}
 */
const forEachChildren = (parent, callback, reverse) => {
  let next = reverse ? parent._tail : parent._head;
  while (next) {
    const currentNext = reverse ? next._prev : next._next;
    callback(next);
    next = currentNext;
  }
};

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @return {void}
 */
const removeChild = (parent, child) => {
  const prev = child._prev;
  const next = child._next;
  prev ? prev._next = next : parent._head = next;
  next ? next._prev = prev : parent._tail = prev;
  child._prev = null;
  child._next = null;
};

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @param  {Function} [sortMethod]
 * @return {void}
 */
const addChild = (parent, child, sortMethod) => {
  let prev = parent._tail;
  while (prev && sortMethod && sortMethod(prev, child)) prev = prev._prev;
  const next = prev ? prev._next : parent._head;
  prev ? prev._next = child : parent._head = child;
  next ? next._prev = child : parent._tail = child;
  child._prev = prev;
  child._next = next;
};

exports.PI = PI;
exports._round = _round;
exports.abs = abs;
exports.addChild = addChild;
exports.asin = asin;
exports.atan2 = atan2;
exports.ceil = ceil;
exports.clamp = clamp;
exports.clampInfinity = clampInfinity;
exports.cloneArray = cloneArray;
exports.cos = cos;
exports.exp = exp;
exports.floor = floor;
exports.forEachChildren = forEachChildren;
exports.getCompletionThen = getCompletionThen;
exports.isArr = isArr;
exports.isCol = isCol;
exports.isColorFn = isColorFn;
exports.isFnc = isFnc;
exports.isHex = isHex;
exports.isHsl = isHsl;
exports.isKey = isKey;
exports.isNil = isNil;
exports.isNum = isNum;
exports.isObj = isObj;
exports.isOklab = isOklab;
exports.isOklch = isOklch;
exports.isRgb = isRgb;
exports.isStr = isStr;
exports.isSvg = isSvg;
exports.isUnd = isUnd;
exports.isValidSVGAttribute = isValidSVGAttribute;
exports.lerp = lerp;
exports.max = max;
exports.mergeObjects = mergeObjects;
exports.min = min;
exports.normalizeTime = normalizeTime;
exports.now = now;
exports.parseNumber = parseNumber;
exports.pow = pow;
exports.removeChild = removeChild;
exports.round = round;
exports.sin = sin;
exports.snap = snap;
exports.sqrt = sqrt;
exports.stringStartsWith = stringStartsWith;
exports.toLowerCase = toLowerCase;

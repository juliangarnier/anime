/**
 * Anime.js - easings - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../../core/consts.cjs');
var helpers = require('../../core/helpers.cjs');
var none = require('../none.cjs');

/**
 * @import {
 *   EasingFunction,
 *   EasingFunctionWithParams,
 *   EasingParam,
 *   BackEasing,
 *   ElasticEasing,
 *   PowerEasing,
 * } from '../../types/index.js'
*/


/** @type {PowerEasing} */
const easeInPower = (p = 1.68) => t => helpers.pow(t, +p);

/**
 * @callback EaseType
 * @param {EasingFunction} Ease
 * @return {EasingFunction}
 */

/** @type {Record<String, EaseType>} */
const easeTypes = {
  in: easeIn => t => easeIn(t),
  out: easeIn => t => 1 - easeIn(1 - t),
  inOut: easeIn => t => t < .5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
  outIn: easeIn => t => t < .5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2,
};

/**
 * Easing functions adapted and simplified from https://robertpenner.com/easing/
 * (c) 2001 Robert Penner
 */

const halfPI = helpers.PI / 2;
const doublePI = helpers.PI * 2;

/** @type {Record<String, EasingFunctionWithParams|EasingFunction>} */
const easeInFunctions = {
  [consts.emptyString]: easeInPower,
  Quad: easeInPower(2),
  Cubic: easeInPower(3),
  Quart: easeInPower(4),
  Quint: easeInPower(5),
  /** @type {EasingFunction} */
  Sine: t => 1 - helpers.cos(t * halfPI),
  /** @type {EasingFunction} */
  Circ: t => 1 - helpers.sqrt(1 - t * t),
  /** @type {EasingFunction} */
  Expo: t => t ? helpers.pow(2, 10 * t - 10) : 0,
  /** @type {EasingFunction} */
  Bounce: t => {
    let pow2, b = 4;
    while (t < ((pow2 = helpers.pow(2, --b)) - 1) / 11);
    return 1 / helpers.pow(4, 3 - b) - 7.5625 * helpers.pow((pow2 * 3 - 2) / 22 - t, 2);
  },
  /** @type {BackEasing} */
  Back: (overshoot = 1.7) => t => (+overshoot + 1) * t * t * t - +overshoot * t * t,
  /** @type {ElasticEasing} */
  Elastic: (amplitude = 1, period = .3) => {
    const a = helpers.clamp(+amplitude, 1, 10);
    const p = helpers.clamp(+period, consts.minValue, 2);
    const s = (p / doublePI) * helpers.asin(1 / a);
    const e = doublePI / p;
    return t => t === 0 || t === 1 ? t : -a * helpers.pow(2, -10 * (1 - t)) * helpers.sin(((1 - t) - s) * e);
  }
};

/**
 * @typedef  {Object} EasesFunctions
 * @property {typeof none} linear
 * @property {typeof none} none
 * @property {PowerEasing} in
 * @property {PowerEasing} out
 * @property {PowerEasing} inOut
 * @property {PowerEasing} outIn
 * @property {EasingFunction} inQuad
 * @property {EasingFunction} outQuad
 * @property {EasingFunction} inOutQuad
 * @property {EasingFunction} outInQuad
 * @property {EasingFunction} inCubic
 * @property {EasingFunction} outCubic
 * @property {EasingFunction} inOutCubic
 * @property {EasingFunction} outInCubic
 * @property {EasingFunction} inQuart
 * @property {EasingFunction} outQuart
 * @property {EasingFunction} inOutQuart
 * @property {EasingFunction} outInQuart
 * @property {EasingFunction} inQuint
 * @property {EasingFunction} outQuint
 * @property {EasingFunction} inOutQuint
 * @property {EasingFunction} outInQuint
 * @property {EasingFunction} inSine
 * @property {EasingFunction} outSine
 * @property {EasingFunction} inOutSine
 * @property {EasingFunction} outInSine
 * @property {EasingFunction} inCirc
 * @property {EasingFunction} outCirc
 * @property {EasingFunction} inOutCirc
 * @property {EasingFunction} outInCirc
 * @property {EasingFunction} inExpo
 * @property {EasingFunction} outExpo
 * @property {EasingFunction} inOutExpo
 * @property {EasingFunction} outInExpo
 * @property {EasingFunction} inBounce
 * @property {EasingFunction} outBounce
 * @property {EasingFunction} inOutBounce
 * @property {EasingFunction} outInBounce
 * @property {BackEasing} inBack
 * @property {BackEasing} outBack
 * @property {BackEasing} inOutBack
 * @property {BackEasing} outInBack
 * @property {ElasticEasing} inElastic
 * @property {ElasticEasing} outElastic
 * @property {ElasticEasing} inOutElastic
 * @property {ElasticEasing} outInElastic
 */

const eases = (/*#__PURE__ */ (() => {
  const list = { linear: none.none, none: none.none };
  for (let type in easeTypes) {
    for (let name in easeInFunctions) {
      const easeIn = easeInFunctions[name];
      const easeType = easeTypes[type];
      list[type + name] = /** @type {EasingFunctionWithParams|EasingFunction} */(
        name === consts.emptyString || name === 'Back' || name === 'Elastic' ?
        (a, b) => easeType(/** @type {EasingFunctionWithParams} */(easeIn)(a, b)) :
        easeType(/** @type {EasingFunction} */(easeIn))
      );
    }
  }
  return /** @type {EasesFunctions} */(list);
})());

/** @type {Record<String, EasingFunction>} */
const easesLookups = { linear: none.none, none: none.none };

/**
 * @param  {String} string
 * @return {EasingFunction}
 */
const parseEaseString = (string) => {
  if (easesLookups[string]) return easesLookups[string];
  if (string.indexOf('(') <= -1) {
    const hasParams = easeTypes[string] || string.includes('Back') || string.includes('Elastic');
    const parsedFn = /** @type {EasingFunction} */(hasParams ? /** @type {EasingFunctionWithParams} */(eases[string])() : eases[string]);
    return parsedFn ? easesLookups[string] = parsedFn : none.none;
  } else {
    const split = string.slice(0, -1).split('(');
    const parsedFn = /** @type {EasingFunctionWithParams} */(eases[split[0]]);
    return parsedFn ? easesLookups[string] = parsedFn(...split[1].split(',')) : none.none;
  }
};

const deprecated = ['steps(', 'irregular(', 'linear(', 'cubicBezier('];

/**
 * @param  {EasingParam} ease
 * @return {EasingFunction}
 */
const parseEase = ease => {
  if (helpers.isStr(ease)) {
    for (let i = 0, l = deprecated.length; i < l; i++) {
      if (helpers.stringStartsWith(ease, deprecated[i])) {
        console.warn(`String syntax for \`ease: "${ease}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${ease}\``);
        return none.none;
      }
    }
  }
  const easeFunc = helpers.isFnc(ease) ? ease : helpers.isStr(ease) ? parseEaseString(/** @type {String} */(ease)) : none.none;
  return easeFunc;
};

exports.easeInPower = easeInPower;
exports.easeTypes = easeTypes;
exports.eases = eases;
exports.parseEase = parseEase;
exports.parseEaseString = parseEaseString;

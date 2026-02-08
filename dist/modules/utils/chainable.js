/**
 * Anime.js - utils - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { noop } from '../core/consts.js';
import * as number from './number.js';

// Chain-able utilities

const numberUtils = number; // Needed to keep the import when bundling

const chainables = {};

/**
 * @callback UtilityFunction
 * @param {...*} args
 * @return {Number|String}
 *
 * @param {UtilityFunction} fn
 * @param {Number} [last=0]
 * @return {function(...(Number|String)): function(Number|String): (Number|String)}
 */
const curry = (fn, last = 0) => (...args) => last ? v => fn(...args, v) : v => fn(v, ...args);

/**
 * @param {Function} fn
 * @return {function(...(Number|String))}
 */
const chain = fn => {
   return (...args) => {
    const result = fn(...args);
    return new Proxy(noop, {
      apply: (_, __, [v]) => result(v),
      get: (_, prop) => chain(/**@param {...Number|String} nextArgs */(...nextArgs) => {
        const nextResult = chainables[prop](...nextArgs);
        return (/**@type {Number|String} */v) => nextResult(result(v));
      })
    });
  }
};

/**
 * @param {UtilityFunction} fn
 * @param {String} name
 * @param {Number} [right]
 * @return {function(...(Number|String)): UtilityFunction}
 */
const makeChainable = (name, fn, right = 0) => {
  const chained = (...args) => (args.length < fn.length ? chain(curry(fn, right)) : fn)(...args);
  if (!chainables[name]) chainables[name] = chained;
  return chained;
};

/**
 * @typedef {Object} ChainablesMap
 * @property {ChainedClamp} clamp
 * @property {ChainedRound} round
 * @property {ChainedSnap} snap
 * @property {ChainedWrap} wrap
 * @property {ChainedLerp} lerp
 * @property {ChainedDamp} damp
 * @property {ChainedMapRange} mapRange
 * @property {ChainedRoundPad} roundPad
 * @property {ChainedPadStart} padStart
 * @property {ChainedPadEnd} padEnd
 * @property {ChainedDegToRad} degToRad
 * @property {ChainedRadToDeg} radToDeg
 */

/**
 * @callback ChainedUtilsResult
 * @param {Number} value - The value to process through the chained operations
 * @return {Number} The processed result
 */

/**
 * @typedef {ChainablesMap & ChainedUtilsResult} ChainableUtil
 */

// Chainable

/**
 * @callback ChainedRoundPad
 * @param {Number} decimalLength - Number of decimal places
 * @return {ChainableUtil}
 */
const roundPad = /** @type {typeof numberUtils.roundPad & ChainedRoundPad} */(makeChainable('roundPad', numberUtils.roundPad));

/**
 * @callback ChainedPadStart
 * @param {Number} totalLength - Target length
 * @param {String} padString - String to pad with
 * @return {ChainableUtil}
 */
const padStart = /** @type {typeof numberUtils.padStart & ChainedPadStart} */(makeChainable('padStart', numberUtils.padStart));

/**
 * @callback ChainedPadEnd
 * @param {Number} totalLength - Target length
 * @param {String} padString - String to pad with
 * @return {ChainableUtil}
 */
const padEnd = /** @type {typeof numberUtils.padEnd & ChainedPadEnd} */(makeChainable('padEnd', numberUtils.padEnd));

/**
 * @callback ChainedWrap
 * @param {Number} min - Minimum boundary
 * @param {Number} max - Maximum boundary
 * @return {ChainableUtil}
 */
const wrap = /** @type {typeof numberUtils.wrap & ChainedWrap} */(makeChainable('wrap', numberUtils.wrap));

/**
 * @callback ChainedMapRange
 * @param {Number} inLow - Input range minimum
 * @param {Number} inHigh - Input range maximum
 * @param {Number} outLow - Output range minimum
 * @param {Number} outHigh - Output range maximum
 * @return {ChainableUtil}
 */
const mapRange = /** @type {typeof numberUtils.mapRange & ChainedMapRange} */(makeChainable('mapRange', numberUtils.mapRange));

/**
 * @callback ChainedDegToRad
 * @return {ChainableUtil}
 */
const degToRad = /** @type {typeof numberUtils.degToRad & ChainedDegToRad} */(makeChainable('degToRad', numberUtils.degToRad));

/**
 * @callback ChainedRadToDeg
 * @return {ChainableUtil}
 */
const radToDeg = /** @type {typeof numberUtils.radToDeg & ChainedRadToDeg} */(makeChainable('radToDeg', numberUtils.radToDeg));

/**
 * @callback ChainedSnap
 * @param {Number|Array<Number>} increment - Step size or array of snap points
 * @return {ChainableUtil}
 */
const snap = /** @type {typeof numberUtils.snap & ChainedSnap} */(makeChainable('snap', numberUtils.snap));

/**
 * @callback ChainedClamp
 * @param {Number} min - Minimum boundary
 * @param {Number} max - Maximum boundary
 * @return {ChainableUtil}
 */
const clamp = /** @type {typeof numberUtils.clamp & ChainedClamp} */(makeChainable('clamp', numberUtils.clamp));

/**
 * @callback ChainedRound
 * @param {Number} decimalLength - Number of decimal places
 * @return {ChainableUtil}
 */
const round = /** @type {typeof numberUtils.round & ChainedRound} */(makeChainable('round', numberUtils.round));

/**
 * @callback ChainedLerp
 * @param {Number} start - Starting value
 * @param {Number} end - Ending value
 * @return {ChainableUtil}
 */
const lerp = /** @type {typeof numberUtils.lerp & ChainedLerp} */(makeChainable('lerp', numberUtils.lerp, 1));

/**
 * @callback ChainedDamp
 * @param {Number} start - Starting value
 * @param {Number} end - Target value
 * @param {Number} deltaTime - Delta time in ms
 * @return {ChainableUtil}
 */
const damp = /** @type {typeof numberUtils.damp & ChainedDamp} */(makeChainable('damp', numberUtils.damp, 1));

export { clamp, damp, degToRad, lerp, mapRange, padEnd, padStart, radToDeg, round, roundPad, snap, wrap };

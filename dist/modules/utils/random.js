/**
 * Anime.js - utils - ESM
 * @version v5.0.0-beta.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { makeTweakable } from '../core/globals.js';

/**
 * @typedef {Object} RandomParams
 * @property {Number} [min]
 * @property {Number} [max]
 * @property {Number} [decimals]
 * @property {Number|false} [seed] A number seeds a deterministic sequence, false or omitted is unseeded.
 * @property {Boolean} [perTarget] When true the call returns a generator anime invokes once per target.
 */

/**
 * A 2-arg numeric RNG, the form randomPick and shuffle call.
 * @callback RandomFunction
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */

let _seed = 0;

/**
 * Generates a random number between min and max (inclusive) with optional decimal precision.
 * @param  {Number} [min=0]
 * @param  {Number} [max=1]
 * @param  {Number} [decimalLength=0]
 * @return {Number}
 */
const randomNumber = (min = 0, max = 1, decimalLength = 0) => {
  const m = 10 ** decimalLength;
  return Math.floor((Math.random() * (max - min + (1 / m)) + min) * m) / m;
};

/**
 * Creates a seeded pseudorandom generator with the same API as random. Positional args draw a number,
 * a params object draws a number, or a per target generator with perTarget. min, max and decimals can
 * be overridden per call.
 *
 * @param  {Number} [seed] The seed value, undefined advances a shared counter.
 * @param  {Number} [seededMin=0] Default minimum of the returned generator.
 * @param  {Number} [seededMax=1] Default maximum of the returned generator.
 * @param  {Number} [seededDecimalLength=0] Default decimal places of the returned generator.
 */
const createSeededRandom = (seed, seededMin = 0, seededMax = 1, seededDecimalLength = 0) => {
  let t = seed === undefined ? _seed++ : seed;
  const draw = (min, max, decimalLength) => {
    t += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    const m = 10 ** decimalLength;
    return Math.floor(((((t ^ t >>> 14) >>> 0) / 4294967296) * (max - min + (1 / m)) + min) * m) / m;
  };
  /**
   * @overload
   * @param {Number} [min]
   * @param {Number} [max]
   * @param {Number} [decimalLength]
   * @return {Number}
   *
   * @overload
   * @param {RandomParams} opts
   * @return {Number|Function}
   *
   * @param {Number|RandomParams} [minOrOpts]
   * @param {Number} [max]
   * @param {Number} [decimalLength]
   * @return {Number|Function}
   */
  function rng(minOrOpts = seededMin, max = seededMax, decimalLength = seededDecimalLength) {
    if (minOrOpts !== null && typeof minOrOpts === 'object') {
      const opts = minOrOpts;
      const min = opts.min == null ? seededMin : opts.min;
      const mx = opts.max == null ? seededMax : opts.max;
      const d = opts.decimals == null ? seededDecimalLength : opts.decimals;
      return opts.perTarget ? () => draw(min, mx, d) : draw(min, mx, d);
    }
    return draw(minOrOpts, max, decimalLength);
  }
  return rng;
};

/**
 * Creates the per draw generator for a params object, seeded when seed is a number, unseeded otherwise.
 * @param  {RandomParams} opts
 * @return {() => Number}
 */
const createRandomGenerator = (opts) => {
  const min = opts.min == null ? 0 : opts.min;
  const max = opts.max == null ? 1 : opts.max;
  const decimals = opts.decimals || 0;
  if (opts.seed === undefined || opts.seed === false) return () => randomNumber(min, max, decimals);
  const rng = createSeededRandom(/** @type {Number} */(opts.seed), min, max, decimals);
  return () => /** @type {Number} */(rng());
};

/**
 * Draws one value, or returns a per target generator when perTarget is set.
 * @param {RandomParams} opts
 */
const resolveRandomFromOpts = (opts) => {
  const gen = createRandomGenerator(opts);
  return opts.perTarget ? gen : gen();
};

const randomTweakable = makeTweakable('Random', 'random', resolveRandomFromOpts);

/**
 * Generates a random number between min and max (inclusive) with optional decimal precision. Passing a
 * params object instead of positional args returns a value shared across targets, or a per target
 * generator when perTarget is true.
 *
 * @param  {Number|RandomParams} [min=0] The minimum value, or a params object.
 * @param  {Number} [max=1] The maximum value, inclusive.
 * @param  {Number} [decimalLength=0] Number of decimal places to round to.
 * @return {Number|Function|Object} A number, or a per target generator.
 */
const random = (min = 0, max = 1, decimalLength = 0) => {
  if (min !== null && typeof min === 'object') return randomTweakable(/** @type {RandomParams} */(min));
  return randomNumber(/** @type {Number} */(min), max, decimalLength);
};

/**
 * Picks a random element from an array or a string
 *
 * @template T
 * @param    {String|Array<T>} items - The array or string to pick from
 * @param    {RandomFunction} [rnd] - Optional RNG, defaults to random
 * @return   {String|T} A random element from the array or character from the string
 */
const randomPick = (items, rnd = /** @type {RandomFunction} */(random)) => items[rnd(0, items.length - 1)];

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm
 * Adapted from https://bost.ocks.org/mike/shuffle/
 *
 * @param  {Array} items - The array to shuffle (will be modified in-place)
 * @param  {RandomFunction} [rnd] - Optional RNG, defaults to random
 * @return {Array} The same array reference, now shuffled
 */
const shuffle = (items, rnd = /** @type {RandomFunction} */(random)) => {
  let m = items.length, t, i;
  while (m) { i = rnd(0, --m); t = items[m]; items[m] = items[i]; items[i] = t; }
  return items;
};

export { createSeededRandom, random, randomPick, shuffle };

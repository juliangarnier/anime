/**
 * Anime.js - utils - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

/**
 * Generate a random number between optional min and max (inclusive) and decimal precision
 *
 * @callback RandomNumberGenerator
 * @param    {Number} [min=0] - The minimum value (inclusive)
 * @param    {Number} [max=1] - The maximum value (inclusive)
 * @param    {Number} [decimalLength=0] - Number of decimal places to round to
 * @return   {Number} A random number between min and max
 */

/**
 * Generates a random number between min and max (inclusive) with optional decimal precision
 *
 * @type {RandomNumberGenerator}
 */
const random = (min = 0, max = 1, decimalLength = 0) => {
  const m = 10 ** decimalLength;
  return Math.floor((Math.random() * (max - min + (1 / m)) + min) * m) / m;
};

let _seed = 0;

/**
 * Creates a seeded pseudorandom number generator function
 *
 * @param  {Number} [seed] - The seed value for the random number generator
 * @param  {Number} [seededMin=0] - The minimum default value (inclusive) of the returned function
 * @param  {Number} [seededMax=1] - The maximum default value (inclusive) of the returned function
 * @param  {Number} [seededDecimalLength=0] - Default number of decimal places to round to of the returned function
 * @return {RandomNumberGenerator} A function to generate a random number between optional min and max (inclusive) and decimal precision
 */
const createSeededRandom = (seed, seededMin = 0, seededMax = 1, seededDecimalLength = 0) => {
  let t = seed === undefined ? _seed++ : seed;
  return (min = seededMin, max = seededMax, decimalLength = seededDecimalLength) => {
    t += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    const m = 10 ** decimalLength;
    return Math.floor(((((t ^ t >>> 14) >>> 0) / 4294967296) * (max - min + (1 / m)) + min) * m) / m;
  }
};

/**
 * Picks a random element from an array or a string
 *
 * @template T
 * @param    {String|Array<T>} items - The array or string to pick from
 * @return   {String|T} A random element from the array or character from the string
 */
const randomPick = items => items[random(0, items.length - 1)];

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm
 * Adapted from https://bost.ocks.org/mike/shuffle/
 *
 * @param  {Array} items - The array to shuffle (will be modified in-place)
 * @return {Array} The same array reference, now shuffled
 */
const shuffle = items => {
  let m = items.length, t, i;
  while (m) { i = random(0, --m); t = items[m]; items[m] = items[i]; items[i] = t; }
  return items;
};

exports.createSeededRandom = createSeededRandom;
exports.random = random;
exports.randomPick = randomPick;
exports.shuffle = shuffle;

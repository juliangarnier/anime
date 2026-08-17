/**
 * Anime.js - easings - CJS
 * @version v5.0.0-beta.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var helpers = require('../../core/helpers.cjs');
var factory = require('../linear/factory.cjs');
var globals = require('../../core/globals.cjs');

/**
 * @import {
 *   EasingFunction,
 * } from '../../types/index.js'
*/

/**
 * Generate random steps
 * @param  {Number} [length] - The number of steps
 * @param  {Number} [randomness] - How strong the randomness is
 * @return {EasingFunction}
 */
const irregularFactory = (length = 10, randomness = 1) => {
  const values = [0];
  const total = length - 1;
  for (let i = 1; i < total; i++) {
    const previousValue = values[i - 1];
    const spacing = i / total;
    const segmentEnd = (i + 1) / total;
    const randomVariation = spacing + (segmentEnd - spacing) * Math.random();
    // Mix the even spacing and random variation based on the randomness parameter
    const randomValue = spacing * (1 - randomness) + randomVariation * randomness;
    values.push(helpers.clamp(randomValue, previousValue, 1));
  }
  values.push(1);
  return factory.linearFactory(...values);
};

const irregular = /** @type {typeof irregularFactory} */(globals.makeTweakable('Ease', 'irregular', irregularFactory));

exports.irregular = irregular;

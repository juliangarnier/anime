/**
 * Anime.js - easings - ESM
 * @version v5.0.0-beta.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { clamp } from '../../core/helpers.js';
import { linearFactory } from '../linear/factory.js';
import { makeTweakable } from '../../core/globals.js';

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
    values.push(clamp(randomValue, previousValue, 1));
  }
  values.push(1);
  return linearFactory(...values);
};

const irregular = /** @type {typeof irregularFactory} */(makeTweakable('Ease', 'irregular', irregularFactory));

export { irregular };

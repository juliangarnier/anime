/**
 * Anime.js - easings - ESM
 * @version v5.0.0-beta.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { none } from '../none.js';
import { makeTweakable } from '../../core/globals.js';
import { linearFactory } from './factory.js';

/**
 * @import {
 *   EasingFunction,
 * } from '../../types/index.js'
*/

const taggedLinear = makeTweakable('Ease', 'linear', linearFactory);

/**
 * Without parameters, the linear function creates a non-eased transition.
 * Parameters, if used, creates a piecewise linear easing by interpolating linearly between the specified points.
 *
 * @param  {...(String|Number)} args - Points
 * @return {EasingFunction}
 */
const linear = (...args) => args.length ? /** @type {EasingFunction} */(taggedLinear.apply(null, args)) : none;

export { linear };

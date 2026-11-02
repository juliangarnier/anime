import {
  none,
} from '../none.js';

import {
  makeTweakable,
} from '../../core/globals.js';

import {
  linearFactory,
} from './factory.js';

/**
 * @import {
 *   EasingFunction,
 * } from '../../types/index.js'
*/

const tweakableLinear = makeTweakable('Ease', 'linear', linearFactory);

/**
 * Without parameters, the linear function creates a non-eased transition.
 * Parameters, if used, creates a piecewise linear easing by interpolating linearly between the specified points.
 *
 * @param  {...(String|Number)} args - Points
 * @return {EasingFunction}
 */
export const linear = (...args) => args.length ? /** @type {EasingFunction} */(tweakableLinear.apply(null, args)) : none;

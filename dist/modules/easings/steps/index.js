/**
 * Anime.js - easings - ESM
 * @version v5.0.0-beta.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { ceil, floor, clamp } from '../../core/helpers.js';
import { makeTweakable } from '../../core/globals.js';

/**
 * @import {
 *   EasingFunction,
 * } from '../../types/index.js'
*/

/**
 * Steps ease implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function
 * Only covers 'end' and 'start' jumpterms
 * @param  {Number} steps
 * @param  {Boolean} [fromStart]
 * @return {EasingFunction}
 */
const stepsFactory = (steps = 10, fromStart) => {
  const roundMethod = fromStart ? ceil : floor;
  return t => roundMethod(clamp(t, 0, 1) * steps) * (1 / steps);
};

const steps = /** @type {typeof stepsFactory} */(makeTweakable('Ease', 'steps', stepsFactory));

export { steps };

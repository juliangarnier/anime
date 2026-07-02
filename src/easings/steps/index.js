import {
  clamp,
  floor,
} from "../../core/helpers.js";

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
export const steps = (steps = 10, fromStart) => {
  return t => {
    const clampedT = clamp(t, 0, 1);
    // jump-start is left-continuous: the first jump happens as soon as the interpolation begins,
    // so its current step is always one ahead of jump-end's instead of merely rounding ties up.
    const currentStep = fromStart ? clamp(floor(clampedT * steps) + 1, 0, steps) : floor(clampedT * steps);
    return currentStep * (1 / steps);
  };
}

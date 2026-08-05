import {
  ceil,
  clamp,
  floor,
} from "../../core/helpers.js";

import {
  makeTweakable,
} from '../../core/globals.js';

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
}

export const steps = /** @type {typeof stepsFactory} */(makeTweakable('Ease', 'steps', stepsFactory));

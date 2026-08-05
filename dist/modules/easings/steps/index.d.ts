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
export function steps(steps?: number, fromStart?: boolean): EasingFunction;
import type { EasingFunction } from '../../types/index.js';

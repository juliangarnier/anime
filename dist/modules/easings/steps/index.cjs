/**
 * Anime.js - easings - CJS
 * @version v5.0.0-beta.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var helpers = require('../../core/helpers.cjs');
var globals = require('../../core/globals.cjs');

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
  const roundMethod = fromStart ? helpers.ceil : helpers.floor;
  return t => roundMethod(helpers.clamp(t, 0, 1) * steps) * (1 / steps);
};

const steps = /** @type {typeof stepsFactory} */(globals.makeTweakable('Ease', 'steps', stepsFactory));

exports.steps = steps;

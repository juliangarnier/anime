/**
 * Anime.js - easings - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var none = require('../none.cjs');
var globals = require('../../core/globals.cjs');
var factory = require('./factory.cjs');

/**
 * @import {
 *   EasingFunction,
 * } from '../../types/index.js'
*/

const tweakableLinear = globals.makeTweakable('Ease', 'linear', factory.linearFactory);

/**
 * Without parameters, the linear function creates a non-eased transition.
 * Parameters, if used, creates a piecewise linear easing by interpolating linearly between the specified points.
 *
 * @param  {...(String|Number)} args - Points
 * @return {EasingFunction}
 */
const linear = (...args) => args.length ? /** @type {EasingFunction} */(tweakableLinear.apply(null, args)) : none.none;

exports.linear = linear;

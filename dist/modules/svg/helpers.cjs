/**
 * Anime.js - svg - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var helpers = require('../core/helpers.cjs');
var targets = require('../core/targets.cjs');

/**
 * @import {
 *   TargetsParam,
 * } from '../types/index.js'
*/

/**
 * @param  {TargetsParam} path
 * @return {SVGGeometryElement|void}
 */
const getPath = path => {
  const parsedTargets = targets.parseTargets(path);
  const $parsedSvg = /** @type {SVGGeometryElement} */(parsedTargets[0]);
  if (!$parsedSvg || !helpers.isSvg($parsedSvg)) return console.warn(`${path} is not a valid SVGGeometryElement`);
  return $parsedSvg;
};

exports.getPath = getPath;

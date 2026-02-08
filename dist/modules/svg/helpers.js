/**
 * Anime.js - svg - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { isSvg } from '../core/helpers.js';
import { parseTargets } from '../core/targets.js';

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
  const parsedTargets = parseTargets(path);
  const $parsedSvg = /** @type {SVGGeometryElement} */(parsedTargets[0]);
  if (!$parsedSvg || !isSvg($parsedSvg)) return console.warn(`${path} is not a valid SVGGeometryElement`);
  return $parsedSvg;
};

export { getPath };

/**
 * Anime.js - svg - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var helpers$1 = require('../core/helpers.cjs');
var helpers = require('./helpers.cjs');

/**
 * @import {
 *   TargetsParam,
 *   FunctionValue
 * } from '../types/index.js'
*/

/**
 * @param  {TargetsParam} path2
 * @param  {Number} [precision]
 * @return {FunctionValue}
 */
const morphTo = (path2, precision = .33) => ($path1) => {
  const tagName1 = ($path1.tagName || '').toLowerCase();
  if (!tagName1.match(/^(path|polygon|polyline)$/)) {
    throw new Error(`Can't morph a <${$path1.tagName}> SVG element. Use <path>, <polygon> or <polyline>.`);
  }
  const $path2 = /** @type {SVGGeometryElement} */(helpers.getPath(path2));
  if (!$path2) {
    throw new Error("Can't morph to an invalid target. 'path2' must resolve to an existing <path>, <polygon> or <polyline> SVG element.");
  }
  const tagName2 = ($path2.tagName || '').toLowerCase();
  if (!tagName2.match(/^(path|polygon|polyline)$/)) {
    throw new Error(`Can't morph a <${$path2.tagName}> SVG element. Use <path>, <polygon> or <polyline>.`);
  }
  const isPath = $path1.tagName === 'path';
  const separator = isPath ? ' ' : ',';
  const previousPoints = $path1[consts.morphPointsSymbol];
  if (previousPoints) $path1.setAttribute(isPath ? 'd' : 'points', previousPoints);

  let v1 = '', v2 = '';

  if (!precision) {
    v1 = $path1.getAttribute(isPath ? 'd' : 'points');
    v2 = $path2.getAttribute(isPath ? 'd' : 'points');
  } else {
    const length1 = /** @type {SVGGeometryElement} */($path1).getTotalLength();
    const length2 = $path2.getTotalLength();
    const maxPoints = Math.max(Math.ceil(length1 * precision), Math.ceil(length2 * precision));
    for (let i = 0; i < maxPoints; i++) {
      const t = i / (maxPoints - 1);
      const pointOnPath1 = /** @type {SVGGeometryElement} */($path1).getPointAtLength(length1 * t);
      const pointOnPath2 = $path2.getPointAtLength(length2 * t);
      const prefix = isPath ? (i === 0 ? 'M' : 'L') : '';
      v1 += prefix + helpers$1.round(pointOnPath1.x, 3) + separator + pointOnPath1.y + ' ';
      v2 += prefix + helpers$1.round(pointOnPath2.x, 3) + separator + pointOnPath2.y + ' ';
    }
  }

  $path1[consts.morphPointsSymbol] = v2;

  return [v1, v2];
};

exports.morphTo = morphTo;

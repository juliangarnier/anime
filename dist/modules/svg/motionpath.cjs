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
 *   FunctionValue,
 *   TweenObjectValue,
 *   TweenModifier,
 * } from '../types/index.js'
*/

// Motion path animation

/**
 * @param {SVGGeometryElement} $path
 * @param {Number} totalLength
 * @param {Number} progress
 * @param {Number} lookup
 * @param {Boolean} shouldClamp
 * @return {DOMPoint}
 */
const getPathPoint = ($path, totalLength, progress, lookup, shouldClamp) => {
  const point = progress + lookup;
  const pointOnPath = shouldClamp
    ? Math.max(0, Math.min(point, totalLength)) // Clamp between 0 and totalLength
    : (point % totalLength + totalLength) % totalLength; // Wrap around
  return $path.getPointAtLength(pointOnPath);
};

/**
 * @param {SVGGeometryElement} $path
 * @param {String} pathProperty
 * @param {Number} [offset=0]
 * @return {FunctionValue}
 */
const getPathProgess = ($path, pathProperty, offset = 0) => {
  return $el => {
    const totalLength = +($path.getTotalLength());
    const inSvg = $el[consts.isSvgSymbol];
    const ctm = $path.getCTM();
    const shouldClamp = offset === 0;
    /** @type {TweenObjectValue} */
    return {
      from: 0,
      to: totalLength,
      /** @type {TweenModifier} */
      modifier: progress => {
        const offsetLength = offset * totalLength;
        const newProgress = progress + offsetLength;
        if (pathProperty === 'a') {
          const p0 = getPathPoint($path, totalLength, newProgress, -1, shouldClamp);
          const p1 = getPathPoint($path, totalLength, newProgress, 1, shouldClamp);
          return helpers$1.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / helpers$1.PI;
        } else {
          const p = getPathPoint($path, totalLength, newProgress, 0, shouldClamp);
          return pathProperty === 'x' ?
            inSvg || !ctm ? p.x : p.x * ctm.a + p.y * ctm.c + ctm.e :
            inSvg || !ctm ? p.y : p.x * ctm.b + p.y * ctm.d + ctm.f
        }
      }
    }
  }
};

/**
 * @param {TargetsParam} path
 * @param {Number} [offset=0]
 */
const createMotionPath = (path, offset = 0) => {
  const $path = helpers.getPath(path);
  if (!$path) return;
  return {
    translateX: getPathProgess($path, 'x', offset),
    translateY: getPathProgess($path, 'y', offset),
    rotate: getPathProgess($path, 'a', offset),
  }
};

exports.createMotionPath = createMotionPath;

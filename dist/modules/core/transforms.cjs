/**
 * Anime.js - core - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var helpers = require('./helpers.cjs');

/**
* @import { InlineValueStore } from './values.js'
* @import {
*   DOMTarget,
* } from '../types/index.js'
*/

/**
 * @param  {DOMTarget} target
 * @param  {String} propName
 * @param  {InlineValueStore} [inlineValueStore]
 * @return {String}
 */
const parseInlineTransforms = (target, propName, inlineValueStore) => {
  const inlineTransforms = target.style.transform;
  if (inlineTransforms) {
    const cachedTransforms = target[consts.transformsSymbol];
    let pos = 0;
    const len = inlineTransforms.length;
    while (pos < len) {
      // Skip whitespace
      while (pos < len && inlineTransforms.charCodeAt(pos) === 32) pos++;
      if (pos >= len) break;
      // Read function name
      const nameStart = pos;
      while (pos < len && inlineTransforms.charCodeAt(pos) !== 40) pos++;
      if (pos >= len) break;
      const name = inlineTransforms.substring(nameStart, pos);
      // Scan to closing paren, recording top-level comma positions
      let depth = 1;
      const valueStart = pos + 1;
      let c1 = -1, c2 = -1;
      pos++;
      while (pos < len && depth > 0) {
        const c = inlineTransforms.charCodeAt(pos);
        if (c === 40) depth++;
        else if (c === 41) depth--;
        else if (c === 44 && depth === 1) {
          if (c1 === -1) c1 = pos;
          else if (c2 === -1) c2 = pos;
        }
        pos++;
      }
      const valueEnd = pos - 1;
      // Decompose multi-arg functions into individual axis properties
      if (name === 'translate' || name === 'translate3d') {
        if (c1 === -1) {
          cachedTransforms.translateX = inlineTransforms.substring(valueStart, valueEnd).trim();
        } else {
          cachedTransforms.translateX = inlineTransforms.substring(valueStart, c1).trim();
          if (c2 === -1) {
            cachedTransforms.translateY = inlineTransforms.substring(c1 + 1, valueEnd).trim();
          } else {
            cachedTransforms.translateY = inlineTransforms.substring(c1 + 1, c2).trim();
            cachedTransforms.translateZ = inlineTransforms.substring(c2 + 1, valueEnd).trim();
          }
        }
      } else if (name === 'scale' || name === 'scale3d') {
        if (c1 === -1) {
          cachedTransforms.scale = inlineTransforms.substring(valueStart, valueEnd).trim();
        } else {
          cachedTransforms.scaleX = inlineTransforms.substring(valueStart, c1).trim();
          if (c2 === -1) {
            cachedTransforms.scaleY = inlineTransforms.substring(c1 + 1, valueEnd).trim();
          } else {
            cachedTransforms.scaleY = inlineTransforms.substring(c1 + 1, c2).trim();
            cachedTransforms.scaleZ = inlineTransforms.substring(c2 + 1, valueEnd).trim();
          }
        }
      } else {
        cachedTransforms[name] = inlineTransforms.substring(valueStart, valueEnd);
      }
    }
    // Resolve the requested property from the cache
    const cached = cachedTransforms[propName];
    if (!helpers.isUnd(cached)) {
      if (inlineValueStore) inlineValueStore.value = cached;
      return cached;
    }
  }
  return helpers.stringStartsWith(propName, 'scale') ? '1' :
    helpers.stringStartsWith(propName, 'rotate') || helpers.stringStartsWith(propName, 'skew') ? '0deg' : '0px';
};

/**
 * Builds a CSS transform string from the target's cached transform properties.
 * Emits properties in order (perspective > translate > rotate > scale > skew > matrix).
 * When adjacent axis properties are all present, emits a shorter shorthand (translateX + translateY -> translate(x, y))
 * Properties without a grouping partner (e.g. translateY alone, scaleZ alone) emit individually.
 *
 * @param {Record<String, String>} props
 * @return {String}
 */
const buildTransformString = (props) => {
  // Read each transform by name, a keyed loop over validTransforms cost 19 to 26 percent on CSS transform updates.
  let str = consts.emptyString;
  if (props.perspective !== undefined) str += `perspective(${props.perspective}) `;
  // Group translateX with adjacent translateY / translateZ
  const x = props.translateX;
  const y = props.translateY;
  const z = props.translateZ;
  if (x !== undefined && y !== undefined) {
    str += z !== undefined ? `translate3d(${x},${y},${z}) ` : `translate(${x},${y}) `;
  } else {
    if (x !== undefined) str += `translateX(${x}) `;
    if (y !== undefined) str += `translateY(${y}) `;
    if (z !== undefined) str += `translateZ(${z}) `;
  }
  if (props.rotate !== undefined) str += `rotate(${props.rotate}) `;
  if (props.rotateX !== undefined) str += `rotateX(${props.rotateX}) `;
  if (props.rotateY !== undefined) str += `rotateY(${props.rotateY}) `;
  if (props.rotateZ !== undefined) str += `rotateZ(${props.rotateZ}) `;
  // Preserve non-animatable rotate3d in correct position (after rotateZ, before scale)
  if (props.rotate3d !== undefined) str += `rotate3d(${props.rotate3d}) `;
  const scale = props.scale;
  const sx = props.scaleX;
  const sy = props.scaleY;
  const sz = props.scaleZ;
  if (scale !== undefined) str += `scale(${scale}) `;
  // Group scaleX with adjacent scaleY / scaleZ (only when standalone scale is absent)
  if (scale === undefined && sx !== undefined && sy !== undefined) {
    str += sz !== undefined ? `scale3d(${sx},${sy},${sz}) ` : `scale(${sx},${sy}) `;
  } else {
    if (sx !== undefined) str += `scaleX(${sx}) `;
    if (sy !== undefined) str += `scaleY(${sy}) `;
    if (sz !== undefined) str += `scaleZ(${sz}) `;
  }
  if (props.skew !== undefined) str += `skew(${props.skew}) `;
  if (props.skewX !== undefined) str += `skewX(${props.skewX}) `;
  if (props.skewY !== undefined) str += `skewY(${props.skewY}) `;
  // Preserve non-animatable matrix/matrix3d from inline styles
  if (props.matrix !== undefined) str += `matrix(${props.matrix}) `;
  if (props.matrix3d !== undefined) str += `matrix3d(${props.matrix3d}) `;
  return str;
};

exports.buildTransformString = buildTransformString;
exports.parseInlineTransforms = parseInlineTransforms;

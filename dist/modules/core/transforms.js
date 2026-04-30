/**
 * Anime.js - core - ESM
 * @version v4.4.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { transformsFragmentStrings, emptyString, validTransforms, transformsSymbol } from './consts.js';
import { isUnd, stringStartsWith } from './helpers.js';

/**
* @import {
*   DOMTarget,
* } from '../types/index.js'
*/

/**
 * @param  {DOMTarget} target
 * @param  {String} propName
 * @param  {Object} animationInlineStyles
 * @return {String}
 */
const parseInlineTransforms = (target, propName, animationInlineStyles) => {
  const inlineTransforms = target.style.transform;
  if (inlineTransforms) {
    const cachedTransforms = target[transformsSymbol];
    let pos = 0;
    const len = inlineTransforms.length;
    let fullTranslateValue;
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
        fullTranslateValue = inlineTransforms.substring(valueStart, valueEnd);
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
    if (propName === 'translate3d' && fullTranslateValue) {
      if (animationInlineStyles) animationInlineStyles[propName] = fullTranslateValue;
      return fullTranslateValue;
    }
    const cached = cachedTransforms[propName];
    if (!isUnd(cached)) {
      if (animationInlineStyles) animationInlineStyles[propName] = cached;
      return cached;
    }
  }
  return propName === 'translate3d' ? '0px, 0px, 0px' :
    propName === 'rotate3d' ? '0, 0, 0, 0deg' :
    stringStartsWith(propName, 'scale') ? '1' :
    stringStartsWith(propName, 'rotate') || stringStartsWith(propName, 'skew') ? '0deg' : '0px';
};

/**
 * Builds a CSS transform string from the target's cached transform properties.
 * Iterates validTransforms in order (perspective > translate > rotate > scale > skew > matrix).
 * When adjacent axis properties are all present, emits a shorter shorthand (translateX + translateY -> translate(x, y))
 * The index is advanced past consumed properties so they are not emitted twice.
 * Properties without a grouping partner (e.g. translateY alone, scaleZ alone) emit individually.
 *
 * @param  {Record<String, String>} props
 * @return {String}
 */
const buildTransformString = (props) => {
  let str = emptyString;
  for (let i = 0, l = validTransforms.length; i < l; i++) {
    const key = validTransforms[i];
    const val = props[key];
    if (val !== undefined) {
      // Group translateX with adjacent translateY / translateZ
      if (key === 'translateX') {
        const next = props.translateY;
        if (next !== undefined) {
          const next2 = props.translateZ;
          if (next2 !== undefined) {
            str += `translate3d(${val},${next},${next2}) `;
            i += 2;
          } else {
            str += `translate(${val},${next}) `;
            i += 1;
          }
          continue;
        }
      }
      // Group scaleX with adjacent scaleY / scaleZ (only when standalone scale is absent)
      if (key === 'scaleX' && props.scale === undefined) {
        const next = props.scaleY;
        if (next !== undefined) {
          const next2 = props.scaleZ;
          if (next2 !== undefined) {
            str += `scale3d(${val},${next},${next2}) `;
            i += 2;
          } else {
            str += `scale(${val},${next}) `;
            i += 1;
          }
          continue;
        }
      }
      // All other properties: emit individually using pre-built fragment string
      str += `${transformsFragmentStrings[key]}${val}) `;
    }
    // Preserve non-animatable rotate3d in correct position (after rotateZ, before scale)
    if (key === 'rotateZ') {
      if (props.rotate3d !== undefined) str += `rotate3d(${props.rotate3d}) `;
    }
  }
  // Preserve non-animatable matrix/matrix3d from inline styles
  if (props.matrix !== undefined) str += `matrix(${props.matrix}) `;
  if (props.matrix3d !== undefined) str += `matrix3d(${props.matrix3d}) `;
  return str;
};

export { buildTransformString, parseInlineTransforms };

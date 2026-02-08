/**
 * Anime.js - core - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var helpers = require('./helpers.cjs');

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
  let inlinedStylesPropertyValue;
  if (inlineTransforms) {
    const cachedTransforms = target[consts.transformsSymbol];
    let t; while (t = consts.transformsExecRgx.exec(inlineTransforms)) {
      const inlinePropertyName = t[1];
      // const inlinePropertyValue = t[2];
      const inlinePropertyValue = t[2].slice(1, -1);
      cachedTransforms[inlinePropertyName] = inlinePropertyValue;
      if (inlinePropertyName === propName) {
        inlinedStylesPropertyValue = inlinePropertyValue;
        // Store the new parsed inline styles if animationInlineStyles is provided
        if (animationInlineStyles) {
          animationInlineStyles[propName] = inlinePropertyValue;
        }
      }
    }
  }
  return inlineTransforms && !helpers.isUnd(inlinedStylesPropertyValue) ? inlinedStylesPropertyValue :
    helpers.stringStartsWith(propName, 'scale') ? '1' :
    helpers.stringStartsWith(propName, 'rotate') || helpers.stringStartsWith(propName, 'skew') ? '0deg' : '0px';
};

exports.parseInlineTransforms = parseInlineTransforms;

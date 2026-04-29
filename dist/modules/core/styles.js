/**
 * Anime.js - core - ESM
 * @version v4.4.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { tweenTypes, isDomSymbol, transformsSymbol, emptyString, shortTransforms } from './consts.js';
import { forEachChildren, toLowerCase, isNil, isSvg } from './helpers.js';
import { buildTransformString } from './transforms.js';

/**
 * @import {
 *   JSAnimation,
 * } from '../animation/animation.js'
*/

/**
* @import {
*   Target,
*   DOMTarget,
*   Renderable,
*   Tween,
* } from '../types/index.js'
*/

const propertyNamesCache = {};

/**
 * @param  {String} propertyName
 * @param  {Target} target
 * @param  {tweenTypes} tweenType
 * @return {String}
 */
const sanitizePropertyName = (propertyName, target, tweenType) => {
  if (tweenType === tweenTypes.TRANSFORM) {
    const t = shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (
    tweenType === tweenTypes.CSS ||
    // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
    // but properties like "baseFrequency" should stay in lowerCamelCase
    (tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */(target).style))
  ) {
    const cachedPropertyName = propertyNamesCache[propertyName];
    if (cachedPropertyName) {
      return cachedPropertyName;
    } else {
      const lowerCaseName = propertyName ? toLowerCase(propertyName) : propertyName;
      propertyNamesCache[propertyName] = lowerCaseName;
      return lowerCaseName;
    }
  } else {
    return propertyName;
  }
};

/**
 * @template {Renderable} T
 * @param {T} renderable
 * @param {Boolean} [inlineStylesOnly]
 * @return {T}
 */
const revertValues = (renderable, inlineStylesOnly = false) => {
  // Allow revertValues() to be called on timelines
  if (renderable._hasChildren) {
    forEachChildren(renderable, (/** @type {Renderable} */child) => revertValues(child, inlineStylesOnly), true);
  } else {
    const animation = /** @type {JSAnimation} */(renderable);
    animation.pause();
    forEachChildren(animation, (/** @type {Tween} */tween) => {
      const tweenProperty = tween.property;
      const tweenTarget = tween.target;
      const tweenType = tween._tweenType;
      const originalInlinedValue = tween._inlineValue;
      const tweenHadNoInlineValue = isNil(originalInlinedValue) || originalInlinedValue === emptyString;
      if (tweenType === tweenTypes.OBJECT) {
        if (!inlineStylesOnly && !tweenHadNoInlineValue) {
          tweenTarget[tweenProperty] = originalInlinedValue;
        }
      } else if (tweenTarget[isDomSymbol]) {
        if (tweenType === tweenTypes.ATTRIBUTE) {
          if (!inlineStylesOnly) {
            if (tweenHadNoInlineValue) {
              /** @type {DOMTarget} */(tweenTarget).removeAttribute(tweenProperty);
            } else {
              /** @type {DOMTarget} */(tweenTarget).setAttribute(tweenProperty, /** @type {String} */(originalInlinedValue));
            }
          }
        } else {
          const targetStyle = /** @type {DOMTarget} */(tweenTarget).style;
          if (tweenType === tweenTypes.TRANSFORM) {
            const cachedTransforms = tweenTarget[transformsSymbol];
            if (tweenHadNoInlineValue) {
              delete cachedTransforms[tweenProperty];
            } else {
              cachedTransforms[tweenProperty] = originalInlinedValue;
            }
            if (tween._renderTransforms) {
              if (!Object.keys(cachedTransforms).length) {
                targetStyle.removeProperty('transform');
              } else {
                targetStyle.transform = buildTransformString(cachedTransforms);
              }
            }
          } else {
            if (tweenHadNoInlineValue) {
              targetStyle.removeProperty(toLowerCase(tweenProperty));
            } else {
              targetStyle[tweenProperty] = originalInlinedValue;
            }
          }
        }
      }
      if (tweenTarget[isDomSymbol] && animation._tail === tween) {
        animation.targets.forEach(t => {
          if (t.getAttribute && t.getAttribute('style') === emptyString) {
            t.removeAttribute('style');
          }        });
      }
    });
  }
  return renderable;
};

/**
 * @template {Renderable} T
 * @param {T} renderable
 * @return {T}
 */
const cleanInlineStyles = renderable => revertValues(renderable, true);

export { cleanInlineStyles, revertValues, sanitizePropertyName };

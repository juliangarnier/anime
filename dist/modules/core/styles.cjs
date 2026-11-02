/**
 * Anime.js - core - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var helpers = require('./helpers.cjs');
var transforms = require('./transforms.cjs');
var values = require('./values.cjs');

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
  if (tweenType === consts.tweenTypes.TRANSFORM) {
    const t = consts.shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (
    tweenType === consts.tweenTypes.CSS ||
    // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
    // but properties like "baseFrequency" should stay in lowerCamelCase
    (tweenType === consts.tweenTypes.ATTRIBUTE && (helpers.isSvg(target) && propertyName in /** @type {DOMTarget} */(target).style))
  ) {
    return propertyNamesCache[propertyName] || (propertyNamesCache[propertyName] = helpers.toLowerCase(propertyName));
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
    helpers.forEachChildren(renderable, (/** @type {Renderable} */child) => revertValues(child, inlineStylesOnly), true);
  } else {
    const animation = /** @type {JSAnimation} */(renderable);
    animation.pause();
    // Restore each property from its first tween, later keyframes do not hold its original value.
    /** @type {Tween|null} */
    let previousTween = null;
    helpers.forEachChildren(animation, (/** @type {Tween} */tween) => {
      // A muted tween never wrote its target, so there is nothing to restore.
      if (tween._composition === consts.compositionTypes.muted) return;
      const tweenProperty = tween.property;
      const tweenTarget = tween.target;
      const restoresProperty = !previousTween || tweenTarget !== previousTween.target || tweenProperty !== previousTween.property;
      previousTween = tween;
      if (restoresProperty) {
        const tweenType = tween._tweenType;
        const originalInlinedValue = tween._inlineValue;
        const tweenHadNoInlineValue = originalInlinedValue === consts.noOriginalValueSymbol || helpers.isNil(originalInlinedValue) || originalInlinedValue === consts.emptyString;
        if (tween._setter) {
          if (!inlineStylesOnly && !tweenHadNoInlineValue) {
            // Re-seed the original value to the _number / _numbers props so the setter can write the original state instead of re-applying the current frame.
            const { d, n } = values.decomposeRawValue(originalInlinedValue);
            if (d) {
              const numbers = tween._numbers;
              for (let i = 0, l = d.length; i < l; i++) numbers[i] = d[i];
            } else {
              tween._number = n;
            }
            tween._setter(tweenTarget, tween._number, tween);
          }
        } else if (tweenType === consts.tweenTypes.OBJECT) {
          // Restore null and undefined on plain objects, only DOM styles treat them as missing values.
          if (!inlineStylesOnly && originalInlinedValue !== consts.noOriginalValueSymbol) {
            tweenTarget[tweenProperty] = originalInlinedValue;
          }
        } else if (tweenTarget[consts.isDomSymbol]) {
          if (tweenType === consts.tweenTypes.ATTRIBUTE) {
            if (!inlineStylesOnly) {
              if (tweenHadNoInlineValue) {
                /** @type {DOMTarget} */(tweenTarget).removeAttribute(tweenProperty);
              } else {
                /** @type {DOMTarget} */(tweenTarget).setAttribute(tweenProperty, /** @type {String} */(originalInlinedValue));
              }
            }
          } else {
            const targetStyle = /** @type {DOMTarget} */(tweenTarget).style;
            if (tweenType === consts.tweenTypes.TRANSFORM) {
              const cachedTransforms = tweenTarget[consts.transformsSymbol];
              if (tweenHadNoInlineValue) {
                delete cachedTransforms[tweenProperty];
              } else {
                cachedTransforms[tweenProperty] = originalInlinedValue;
              }
              if (!Object.keys(cachedTransforms).length) {
                targetStyle.removeProperty('transform');
              } else {
                targetStyle.transform = transforms.buildTransformString(cachedTransforms);
              }
            } else {
              if (tweenHadNoInlineValue) {
                targetStyle.removeProperty(helpers.toLowerCase(tweenProperty));
              } else {
                targetStyle[tweenProperty] = originalInlinedValue;
              }
            }
          }
        }
      }
      if (tweenTarget[consts.isDomSymbol] && animation._tail === tween) {
        animation.targets.forEach(t => {
          if (t.getAttribute && t.getAttribute('style') === consts.emptyString) {
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

exports.cleanInlineStyles = cleanInlineStyles;
exports.revertValues = revertValues;
exports.sanitizePropertyName = sanitizePropertyName;

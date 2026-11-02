import {
  tweenTypes,
  compositionTypes,
  shortTransforms,
  isDomSymbol,
  transformsSymbol,
  noOriginalValueSymbol,
  emptyString,
} from './consts.js';

import {
  forEachChildren,
  isNil,
  isSvg,
  toLowerCase,
} from './helpers.js';

import {
  buildTransformString,
} from './transforms.js';

import {
  decomposeRawValue,
} from './values.js';

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
export const sanitizePropertyName = (propertyName, target, tweenType) => {
  if (tweenType === tweenTypes.TRANSFORM) {
    const t = shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (
    tweenType === tweenTypes.CSS ||
    // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
    // but properties like "baseFrequency" should stay in lowerCamelCase
    (tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */(target).style))
  ) {
    return propertyNamesCache[propertyName] || (propertyNamesCache[propertyName] = toLowerCase(propertyName));
  } else {
    return propertyName;
  }
}

/**
 * @template {Renderable} T
 * @param {T} renderable
 * @param {Boolean} [inlineStylesOnly]
 * @return {T}
 */
export const revertValues = (renderable, inlineStylesOnly = false) => {
  // Allow revertValues() to be called on timelines
  if (renderable._hasChildren) {
    forEachChildren(renderable, (/** @type {Renderable} */child) => revertValues(child, inlineStylesOnly), true);
  } else {
    const animation = /** @type {JSAnimation} */(renderable);
    animation.pause();
    // Restore each property from its first tween, later keyframes do not hold its original value.
    /** @type {Tween|null} */
    let previousTween = null;
    forEachChildren(animation, (/** @type {Tween} */tween) => {
      // A muted tween never wrote its target, so there is nothing to restore.
      if (tween._composition === compositionTypes.muted) return;
      const tweenProperty = tween.property;
      const tweenTarget = tween.target;
      const restoresProperty = !previousTween || tweenTarget !== previousTween.target || tweenProperty !== previousTween.property;
      previousTween = tween;
      if (restoresProperty) {
        const tweenType = tween._tweenType;
        const originalInlinedValue = tween._inlineValue;
        const tweenHadNoInlineValue = originalInlinedValue === noOriginalValueSymbol || isNil(originalInlinedValue) || originalInlinedValue === emptyString;
        if (tween._setter) {
          if (!inlineStylesOnly && !tweenHadNoInlineValue) {
            // Re-seed the original value to the _number / _numbers props so the setter can write the original state instead of re-applying the current frame.
            const { d, n } = decomposeRawValue(originalInlinedValue);
            if (d) {
              const numbers = tween._numbers;
              for (let i = 0, l = d.length; i < l; i++) numbers[i] = d[i];
            } else {
              tween._number = n;
            }
            tween._setter(tweenTarget, tween._number, tween);
          }
        } else if (tweenType === tweenTypes.OBJECT) {
          // Restore null and undefined on plain objects, only DOM styles treat them as missing values.
          if (!inlineStylesOnly && originalInlinedValue !== noOriginalValueSymbol) {
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
              if (!Object.keys(cachedTransforms).length) {
                targetStyle.removeProperty('transform');
              } else {
                targetStyle.transform = buildTransformString(cachedTransforms);
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
      }
      if (tweenTarget[isDomSymbol] && animation._tail === tween) {
        animation.targets.forEach(t => {
          if (t.getAttribute && t.getAttribute('style') === emptyString) {
            t.removeAttribute('style');
          };
        });
      }
    })
  }
  return renderable;
}

/**
 * @template {Renderable} T
 * @param {T} renderable
 * @return {T}
 */
export const cleanInlineStyles = renderable => revertValues(renderable, true);

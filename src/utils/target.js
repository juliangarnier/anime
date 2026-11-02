import {
  globals,
} from '../core/globals.js';

import {
  minValue,
  compositionTypes,
  valueTypes,
  replaceLookupsSymbol,
} from '../core/consts.js';

import {
  isUnd,
  isStr,
  isCol,
  round,
} from '../core/helpers.js';

import {
  convertColorStringValuesToRgbaArray,
} from '../core/colors.js';

import {
  parseTargets,
  registerTargets,
} from '../core/targets.js';

import {
  sanitizePropertyName,
} from '../core/styles.js';

import {
  setValue,
  getTweenType,
  getOriginalAnimatableValue,
  decomposeRawValue,
} from '../core/values.js';

import {
  convertValueUnit,
} from '../core/units.js';

import {
  removeWAAPIAnimation,
} from '../waapi/composition.js';

import {
  removeTargetsFromRenderable,
} from '../animation/composition.js';

import {
  JSAnimation,
} from '../animation/animation.js';

export { registerTargets as $ };

/**
 * @import {
 *   Renderable,
 *   DOMTargetSelector,
 *   JSTargetsParam,
 *   DOMTargetsParam,
 *   TargetsParam,
 *   DOMTarget,
 *   Target,
 *   AnimationParams,
 *   TargetsArray,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   WAAPIAnimation
 * } from '../waapi/waapi.js'
*/

/**
 * @overload
 * @param  {DOMTargetSelector} targetSelector
 * @param  {String} propName
 * @return {String}
 *
 * @overload
 * @param  {JSTargetsParam} targetSelector
 * @param  {String} propName
 * @return {Number|String}
 *
 * @overload
 * @param  {DOMTargetsParam} targetSelector
 * @param  {String} propName
 * @param  {String} unit
 * @return {String}
 *
 * @overload
 * @param  {TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {Boolean} unit
 * @return {Number}
 *
 * @param  {TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {String|Boolean} [unit]
 */
export function get(targetSelector, propName, unit) {
  // Skip registerTargets for an already registered target so repeated reads like editor live values
  // stay allocation free.
  /** @type {Target|null} */
  let target = targetSelector && /** @type {Target} */(targetSelector)[replaceLookupsSymbol] ? /** @type {Target} */(targetSelector) : null;
  if (!target) {
    const targets = registerTargets(targetSelector);
    if (!targets.length) return;
    target = targets[0];
  }
  const tweenType = getTweenType(target, propName);
  const normalizePropName = sanitizePropertyName(propName, target, tweenType);
  let originalValue = getOriginalAnimatableValue(target, normalizePropName);
  if (isUnd(unit)) {
    // Return a color in the rgba form that animate writes, the browser computes some colors in oklab or color().
    if (isStr(originalValue) && isCol(originalValue)) {
      const [r, g, b, a] = convertColorStringValuesToRgbaArray(originalValue);
      return `rgba(${r},${g},${b},${a})`;
    }
    return originalValue;
  } else {
    const { t, n, u } = decomposeRawValue(originalValue);
    if (t === valueTypes.NUMBER || t === valueTypes.UNIT) {
      if (unit === false) {
        return n;
      } else {
        const convertedValue = convertValueUnit(/** @type {DOMTarget} */(target), n, u, /** @type {String} */(unit), t, false);
        return `${round(convertedValue, globals.precision)}${unit}`;
      }
    }
  }
}

/**
 * @param  {TargetsParam} targets
 * @param  {AnimationParams} parameters
 * @return {JSAnimation}
 */
export const set = (targets, parameters) => {
  if (isUnd(parameters)) return;
  if (globals.editor && globals.editor.addSet) {
    return globals.editor.addSet(targets, parameters);
  }
  parameters.duration = minValue;
  // Do not overrides currently active tweens by default
  parameters.composition = setValue(parameters.composition, compositionTypes.none);
  // Skip init() and force rendering by playing the animation
  return new JSAnimation(targets, parameters, null, 0, true).resume();
}

/**
 * @param  {TargetsParam} targets
 * @param  {Renderable|WAAPIAnimation} [renderable]
 * @param  {String} [propertyName]
 * @return {TargetsArray}
 */
export const remove = (targets, renderable, propertyName) => {
  const targetsArray = parseTargets(targets);
  for (let i = 0, l = targetsArray.length; i < l; i++) {
    removeWAAPIAnimation(
      /** @type {DOMTarget}  */(targetsArray[i]),
      propertyName,
      renderable && /** @type {WAAPIAnimation} */(renderable).controlAnimation && /** @type {WAAPIAnimation} */(renderable),
    )
  }
  removeTargetsFromRenderable(
    targetsArray,
    /** @type {Renderable} */(renderable),
    propertyName
  )
  return targetsArray;
}

export { cleanInlineStyles } from '../core/styles.js';

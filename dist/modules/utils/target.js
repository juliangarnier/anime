/**
 * Anime.js - utils - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { globals } from '../core/globals.js';
import { valueTypes, minValue, compositionTypes } from '../core/consts.js';
import { isUnd, round } from '../core/helpers.js';
import { registerTargets, parseTargets } from '../core/targets.js';
import { sanitizePropertyName } from '../core/styles.js';
export { cleanInlineStyles } from '../core/styles.js';
import { getTweenType, getOriginalAnimatableValue, decomposeRawValue, decomposedOriginalValue, setValue } from '../core/values.js';
import { convertValueUnit } from '../core/units.js';
import { removeWAAPIAnimation } from '../waapi/composition.js';
import { removeTargetsFromRenderable } from '../animation/composition.js';
import { JSAnimation } from '../animation/animation.js';

/**
 * @import {
 *   Renderable,
 *   DOMTargetSelector,
 *   JSTargetsParam,
 *   DOMTargetsParam,
 *   TargetsParam,
 *   DOMTarget,
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
function get(targetSelector, propName, unit) {
  const targets = registerTargets(targetSelector);
  if (!targets.length) return;
  const [ target ] = targets;
  const tweenType = getTweenType(target, propName);
  const normalizePropName = sanitizePropertyName(propName, target, tweenType);
  let originalValue = getOriginalAnimatableValue(target, normalizePropName);
  if (isUnd(unit)) {
    return originalValue;
  } else {
    decomposeRawValue(originalValue, decomposedOriginalValue);
    if (decomposedOriginalValue.t === valueTypes.NUMBER || decomposedOriginalValue.t === valueTypes.UNIT) {
      if (unit === false) {
        return decomposedOriginalValue.n;
      } else {
        const convertedValue = convertValueUnit(/** @type {DOMTarget} */(target), decomposedOriginalValue, /** @type {String} */(unit), false);
        return `${round(convertedValue.n, globals.precision)}${convertedValue.u}`;
      }
    }
  }
}

/**
 * @param  {TargetsParam} targets
 * @param  {AnimationParams} parameters
 * @return {JSAnimation}
 */
const set = (targets, parameters) => {
  if (isUnd(parameters)) return;
  parameters.duration = minValue;
  // Do not overrides currently active tweens by default
  parameters.composition = setValue(parameters.composition, compositionTypes.none);
  // Skip init() and force rendering by playing the animation
  return new JSAnimation(targets, parameters, null, 0, true).resume();
};

/**
 * @param  {TargetsParam} targets
 * @param  {Renderable|WAAPIAnimation} [renderable]
 * @param  {String} [propertyName]
 * @return {TargetsArray}
 */
const remove = (targets, renderable, propertyName) => {
  const targetsArray = parseTargets(targets);
  for (let i = 0, l = targetsArray.length; i < l; i++) {
    removeWAAPIAnimation(
      /** @type {DOMTarget}  */(targetsArray[i]),
      propertyName,
      renderable && /** @type {WAAPIAnimation} */(renderable).controlAnimation && /** @type {WAAPIAnimation} */(renderable),
    );
  }
  removeTargetsFromRenderable(
    targetsArray,
    /** @type {Renderable} */(renderable),
    propertyName
  );
  return targetsArray;
};

export { registerTargets as $, get, remove, set };

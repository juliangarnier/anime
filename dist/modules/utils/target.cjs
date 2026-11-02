/**
 * Anime.js - utils - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var globals = require('../core/globals.cjs');
var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var colors = require('../core/colors.cjs');
var targets = require('../core/targets.cjs');
var styles = require('../core/styles.cjs');
var values = require('../core/values.cjs');
var units = require('../core/units.cjs');
var composition = require('../waapi/composition.cjs');
var composition$1 = require('../animation/composition.cjs');
var animation = require('../animation/animation.cjs');

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
function get(targetSelector, propName, unit) {
  // Skip registerTargets for an already registered target so repeated reads like editor live values
  // stay allocation free.
  /** @type {Target|null} */
  let target = targetSelector && /** @type {Target} */(targetSelector)[consts.replaceLookupsSymbol] ? /** @type {Target} */(targetSelector) : null;
  if (!target) {
    const targets$1 = targets.registerTargets(targetSelector);
    if (!targets$1.length) return;
    target = targets$1[0];
  }
  const tweenType = values.getTweenType(target, propName);
  const normalizePropName = styles.sanitizePropertyName(propName, target, tweenType);
  let originalValue = values.getOriginalAnimatableValue(target, normalizePropName);
  if (helpers.isUnd(unit)) {
    // Return a color in the rgba form that animate writes, the browser computes some colors in oklab or color().
    if (helpers.isStr(originalValue) && helpers.isCol(originalValue)) {
      const [r, g, b, a] = colors.convertColorStringValuesToRgbaArray(originalValue);
      return `rgba(${r},${g},${b},${a})`;
    }
    return originalValue;
  } else {
    const { t, n, u } = values.decomposeRawValue(originalValue);
    if (t === consts.valueTypes.NUMBER || t === consts.valueTypes.UNIT) {
      if (unit === false) {
        return n;
      } else {
        const convertedValue = units.convertValueUnit(/** @type {DOMTarget} */(target), n, u, /** @type {String} */(unit), t, false);
        return `${helpers.round(convertedValue, globals.globals.precision)}${unit}`;
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
  if (helpers.isUnd(parameters)) return;
  if (globals.globals.editor && globals.globals.editor.addSet) {
    return globals.globals.editor.addSet(targets, parameters);
  }
  parameters.duration = consts.minValue;
  // Do not overrides currently active tweens by default
  parameters.composition = values.setValue(parameters.composition, consts.compositionTypes.none);
  // Skip init() and force rendering by playing the animation
  return new animation.JSAnimation(targets, parameters, null, 0, true).resume();
};

/**
 * @param  {TargetsParam} targets
 * @param  {Renderable|WAAPIAnimation} [renderable]
 * @param  {String} [propertyName]
 * @return {TargetsArray}
 */
const remove = (targets$1, renderable, propertyName) => {
  const targetsArray = targets.parseTargets(targets$1);
  for (let i = 0, l = targetsArray.length; i < l; i++) {
    composition.removeWAAPIAnimation(
      /** @type {DOMTarget}  */(targetsArray[i]),
      propertyName,
      renderable && /** @type {WAAPIAnimation} */(renderable).controlAnimation && /** @type {WAAPIAnimation} */(renderable),
    );
  }
  composition$1.removeTargetsFromRenderable(
    targetsArray,
    /** @type {Renderable} */(renderable),
    propertyName
  );
  return targetsArray;
};

exports.$ = targets.registerTargets;
exports.cleanInlineStyles = styles.cleanInlineStyles;
exports.get = get;
exports.remove = remove;
exports.set = set;

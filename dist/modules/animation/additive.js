/**
 * Anime.js - animation - ESM
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { compositionTypes, minValue, noop, valueTypes, tickModes } from '../core/consts.js';
import { cloneArray, addChild, removeChild } from '../core/helpers.js';
import { render } from '../core/render.js';

/**
 * @import {
 *   Tween,
 *   Target,
 * } from '../types/index.js'
 */

/**
 * @typedef AdditiveAnimation
 * @property {Number} duration
 * @property {Number} _offset
 * @property {Number} _delay
 * @property {Tween} _head
 * @property {Tween} _tail
 * @property {Boolean} _hasSharedProgress
 * @property {Boolean} _hasSimpleTweens
 */

/** @type {Map<Target, Record<String, Tween>>} */
// Keep a Map and delete the entries by hand, a WeakMap made the blend update 10 percent slower.
const additiveLookups = new Map();

const additive = {
  animation: null,
  update: noop,
};

const updateAdditive = () => {
  const animation = additive.animation;
  for (let lookupTween = animation._head; lookupTween; lookupTween = lookupTween._next) {
    const valueType = lookupTween._valueType;
    // Reset _toNumbers of lookupTween in place so no array is allocated per blended property per frame.
    const additiveValues = valueType === valueTypes.COMPLEX || valueType === valueTypes.COLOR ? lookupTween._toNumbers : null;
    if (additiveValues) {
      const fromNumbers = lookupTween._fromNumbers;
      for (let i = 0, l = additiveValues.length; i < l; i++) additiveValues[i] = fromNumbers[i];
    }
    let additiveValue = lookupTween._fromNumber;
    // Sum from the last added tween so floating point addition keeps its order.
    for (let tween = lookupTween._prevSibling; tween; tween = tween._prevSibling) {
      if (additiveValues) {
        for (let i = 0, l = tween._numbers.length; i < l; i++) additiveValues[i] += tween._numbers[i];
      } else {
        additiveValue += tween._number;
      }
    }
    lookupTween._toNumber = additiveValue;
  }
  // TODO: Avoid polymorphism here, idealy the additive animation should be a regular animation with a higher priority in the render loop
  render(animation, 1, 1, 0, tickModes.FORCE);
};

/**
 * @return {AdditiveAnimation}
 */
const addAdditiveAnimation = () => {
  let animation = additive.animation;
  if (!animation) {
    animation = {
      duration: minValue,
      computeDeltaTime: noop,
      _offset: 0,
      _delay: 0,
      _head: null,
      _tail: null,
      // Blend tweens need the general loop and a progress per tween, so both render shortcuts stay off.
      _hasSharedProgress: false,
      _hasSimpleTweens: false,
    };
    additive.animation = animation;
  }
  return animation;
};

/** @param {Tween} tween */
const addAdditiveTween = tween => {
  let properties = additiveLookups.get(tween.target);
  if (!properties) {
    properties = {};
    additiveLookups.set(tween.target, properties);
  }
  const animation = addAdditiveAnimation();
  let lookupTween = properties[tween.property];
  if (!lookupTween) {
    lookupTween = { ...tween };
    lookupTween._composition = compositionTypes.replace;
    lookupTween._updateDuration = minValue;
    lookupTween._startTime = 0;
    lookupTween._numbers = cloneArray(tween._fromNumbers);
    lookupTween._number = 0;
    lookupTween._next = null;
    lookupTween._prev = null;
    properties[tween.property] = lookupTween;
    addChild(animation, lookupTween);
  }

  // Convert the values of TO to FROM and set TO to 0

  const toNumber = tween._toNumber;
  tween._fromNumber = lookupTween._fromNumber - toNumber;
  tween._toNumber = 0;
  tween._numbers = cloneArray(tween._fromNumbers);
  tween._number = 0;
  lookupTween._fromNumber = toNumber;

  if (tween._toNumbers.length) {
    const toNumbers = cloneArray(tween._toNumbers);
    toNumbers.forEach((value, i) => {
      tween._fromNumbers[i] = lookupTween._fromNumbers[i] - value;
      tween._toNumbers[i] = 0;
    });
    lookupTween._fromNumbers = toNumbers;
    // Allocate the blend output array once so updateAdditive does not clone _fromNumbers on every frame.
    lookupTween._toNumbers = cloneArray(toNumbers);
  }

  // Link the blend tweens of a property from the last added to the first, the lookup tween heads the list.
  // One link shared with the timeline owners keeps two fields off every tween, the update measured equal.
  tween._prevSibling = lookupTween._prevSibling;
  lookupTween._prevSibling = tween;
  additive.update = updateAdditive;
};

/** @param {Tween} tween */
const removeAdditiveTween = tween => {
  const properties = additiveLookups.get(tween.target);
  const lookupTween = properties && properties[tween.property];
  // Find the tween that links to this one, a tween that already left the list has none.
  let linkingTween = lookupTween;
  while (linkingTween && linkingTween._prevSibling !== tween) linkingTween = linkingTween._prevSibling;
  if (!linkingTween) return;
  linkingTween._prevSibling = tween._prevSibling;
  tween._prevSibling = null;
  if (!lookupTween._prevSibling) {
    removeChild(additive.animation, lookupTween);
    delete properties[tween.property];
    if (!Object.keys(properties).length) additiveLookups.delete(tween.target);
    if (!additive.animation._head) additive.update = noop;
  }
};

export { addAdditiveTween, additive, removeAdditiveTween };

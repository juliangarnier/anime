/**
 * Anime.js - animation - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var targets = require('../core/targets.cjs');
var helpers = require('../core/helpers.cjs');
var styles = require('../core/styles.cjs');
var engine = require('../engine/engine.cjs');
var additive = require('./additive.cjs');

/**
 * @import {
 *   Tween,
 *   Target,
 *   TargetsArray,
 *   Renderable,
 * } from '../types/index.js'
 *
 * @import {
 *   JSAnimation,
 * } from '../animation/animation.js'
 *
 * @import {
 *   Timeline,
 * } from '../timeline/timeline.js'
*/

/**
 * @param  {Tween} tween
 * @return {Tween} The first keyframe of the property of the tween in its animation
 */
const getFirstKeyframe = tween => {
  let prevKeyframe = tween._prev;
  while (prevKeyframe && prevKeyframe.target === tween.target && prevKeyframe.property === tween.property) {
    tween = prevKeyframe;
    prevKeyframe = tween._prev;
  }
  return tween;
};

/**
 * Replaces the tweens of a property for good.
 * @param {Tween} tween
 */
const overrideTween = tween => {
  tween = getFirstKeyframe(tween);
  for (let keyframe = tween; keyframe && keyframe.target === tween.target && keyframe.property === tween.property; keyframe = keyframe._next) {
    keyframe._isOverridden = consts.overrideTypes.PERMANENT;
    // Set both times to minValue so a walk of simple tweens in progress stops writing the replaced tween.
    keyframe._changeDuration = keyframe._currentTime = consts.minValue;
  }
  // Clear _hasSimpleTweens so the animation takes the general gate that tests _isOverridden.
  tween.parent._hasSimpleTweens = false;
  const timeline = /** @type {Timeline} */(tween.parent.parent);
  if (timeline) timeline.removeTakeover(tween);
};

/**
 * Returns the tween that a new tween of an animation takes its property from, and replaces the tweens of its timeline that take over later.
 * @param  {Target} target
 * @param  {String} property
 * @param  {JSAnimation} animation
 * @param  {Number} tweenStartTime
 * @return {Tween}
 */
const getPreviousSibling = (target, property, animation, tweenStartTime) => {
  const lookups = targets.getReplaceLookups(target);
  const sibling = lookups[property];
  const timeline = animation.parent;
  if (!sibling || !timeline || sibling.parent.parent !== timeline) return sibling;
  return lookups[property] = /** @type {Timeline} */(timeline).getPreviousSibling(sibling, animation, tweenStartTime);
};

/**
 * @param {Renderable} renderable
 * @return {Boolean}
 */
const hasRenderingTweens = renderable => {
  // Return at the first tween that can still render so an animation that must stay alive is not scanned further.
  // Scan from the tail, a replacement overrides the tweens in list order so the tweens that can still render are at the end.
  // A scan from the head grew with each override, 5 ms instead of 0.5 ms to replace 500 objects.
  let child = renderable._tail;
  while (child) {
    if (renderable._hasChildren) {
      if (hasRenderingTweens(/** @type {Renderable} */(child))) return true;
    } else if (/** @type {Tween} */(child)._isOverridden !== consts.overrideTypes.PERMANENT) {
      return true;
    }
    child = child._prev;
  }
  return false;
};

/**
 * @param  {Tween} tween
 * @param  {Number} [tweenStartTime] The start of the tween in its animation, delay included
 */
const composeTween = (tween, tweenStartTime = tween._startTime) => {

  const tweenCompositionType = tween._composition;

  // Handle replaced tweens

  if (tweenCompositionType === consts.compositionTypes.replace) {

    // Read replace siblings from the target, a WeakMap scattered their tweens in memory when a hidden tab built them.
    const lookups = targets.getReplaceLookups(tween.target);
    const prevSibling = lookups[tween.property];
    const animation = tween.parent;

    lookups[tween.property] = tween;

    if (prevSibling) {

      const prevAnimation = prevSibling.parent;
      const timeline = /** @type {Timeline} */(animation.parent);

      if (prevAnimation === animation) {

        // Inherit _isOverridden from the previous keyframe so a replaced property stays replaced across its keyframes.
        tween._isOverridden = prevSibling._isOverridden;

      } else if (timeline && timeline === prevAnimation.parent) {

        /** @type {Timeline} */(timeline).composeTween(tween, prevSibling, tweenStartTime);

      } else {

        // Replace for good a previous tween outside a common timeline, if it can still play when the new one is created.
        const previous = prevAnimation.parent || prevAnimation;
        const previousEndTime = previous._offset + (previous._delay + previous.duration) / previous._speed;
        if (helpers.round(previousEndTime - (timeline || animation)._offset, 12) > 0) {
          overrideTween(prevSibling);
          if (!hasRenderingTweens(previous)) previous.cancel();
        }

      }

    }

  // Handle additive tweens composition

  } else if (tweenCompositionType === consts.compositionTypes.blend) {

    additive.addAdditiveTween(tween);

  }

};

/**
 * @param  {Tween} tween
 */
const removeTweenSliblings = tween => {
  const tweenComposition = tween._composition;
  if (tweenComposition === consts.compositionTypes.replace) {
    const tweenProperty = tween.property;
    const replaceTargetProps = targets.getReplaceLookups(tween.target);
    // Release only a replace tween, removing a blend tween from the lookups would disconnect an unrelated replace animation.
    // Release the property, the tween that this one replaced stays replaced.
    if (replaceTargetProps[tweenProperty] === tween) replaceTargetProps[tweenProperty] = null;
  } else if (tweenComposition === consts.compositionTypes.blend) {
    additive.removeAdditiveTween(tween);
  }
};

/**
 * @param  {Set} targetsSet
 * @param  {JSAnimation} animation
 * @param  {String} [propertyName]
 * @return {Boolean}
 */
const removeTargetsFromJSAnimation = (targetsSet, animation, propertyName) => {
  let tweensMatchesTargets = false;
  helpers.forEachChildren(animation, (/**@type {Tween} */tween) => {
    const tweenTarget = tween.target;
    if (targetsSet.has(tweenTarget)) {
      const tweenName = tween.property;
      const tweenType = tween._tweenType;
      if (!propertyName || styles.sanitizePropertyName(propertyName, tweenTarget, tweenType) === tweenName) {
        // Removes the tween from the selected animation
        helpers.removeChild(animation, tween);
        // Detach the tween from its siblings to make sure blended tweens are correctlly removed
        removeTweenSliblings(tween);
        tweensMatchesTargets = true;
      }
    }
  }, true);
  return tweensMatchesTargets;
};

/**
 * @param  {TargetsArray|Set} targets
 * @param  {Renderable} [renderable]
 * @param  {String} [propertyName]
 */
const removeTargetsFromRenderable = (targets, renderable, propertyName) => {
  // Accept the public array, or on recursion the Set already built, so target membership stays
  // constant time and large target lists do not make removal scan quadratically.
  const targetsSet = targets instanceof Set ? targets : new Set(targets);
  const parent = /** @type {Renderable|typeof engine} **/(renderable ? renderable : engine.engine);
  let removeMatches;
  if (parent._hasChildren) {
    let iterationDuration = 0;
    helpers.forEachChildren(parent, (/** @type {Renderable} */child) => {
      if (!child._hasChildren) {
        removeMatches = removeTargetsFromJSAnimation(targetsSet, /** @type {JSAnimation} */(child), propertyName);
        // Remove the child from its parent if no tweens and no children left after the removal
        if (removeMatches && !child._head) {
          child.cancel();
          helpers.removeChild(parent, child);
        } else {
          // Calculate the new iterationDuration value to handle onComplete with last child in render()
          const childTLOffset = child._offset + child._delay;
          const childDur = childTLOffset + child.duration;
          if (childDur > iterationDuration) {
            iterationDuration = childDur;
          }
        }
      } else if (child._head) {
        removeTargetsFromRenderable(targetsSet, child, propertyName);
      } else {
        child._hasChildren = false;
      }
    }, true);
    // Update iterationDuration value to handle onComplete with last child in render()
    if (!helpers.isUnd(/** @type {Renderable} */(parent).iterationDuration)) {
      /** @type {Renderable} */(parent).iterationDuration = iterationDuration;
    }
  } else {
    removeMatches = removeTargetsFromJSAnimation(
      targetsSet,
      /** @type {JSAnimation} */(parent),
      propertyName
    );
  }
  if (removeMatches && !parent._head) {
    parent._hasChildren = false;
    // Cancel the parent if there are no tweens and no children left after the removal
    // We have to check if the .cancel() method exist to handle cases where the parent is the engine itself
    if (/** @type {Renderable} */(parent).cancel) /** @type {Renderable} */(parent).cancel();
  }
};

exports.composeTween = composeTween;
exports.getFirstKeyframe = getFirstKeyframe;
exports.getPreviousSibling = getPreviousSibling;
exports.overrideTween = overrideTween;
exports.removeTargetsFromRenderable = removeTargetsFromRenderable;
exports.removeTweenSliblings = removeTweenSliblings;

import {
  overrideTypes,
  tickModes,
  compositionTypes,
  minValue,
} from '../core/consts.js';

import {
  round,
  forEachChildren,
} from '../core/helpers.js';

import {
  render,
} from '../core/render.js';

import {
  getFirstKeyframe,
  overrideTween,
  composeTween,
  getPreviousSibling,
} from '../animation/composition.js';

import {
  getReplaceLookups,
} from '../core/targets.js';

/**
 * @import {
 *   Tween,
 * } from '../types/index.js'
 *
 * @import {
 *   JSAnimation,
 * } from '../animation/animation.js'
 *
 * @import {
 *   Timeline,
 * } from './timeline.js'
*/

/**
 * @typedef {Object} Takeover
 * @property {Number} time
 * @property {Tween} tween The first keyframe that takes the property, its _prevSibling is the tween that it takes it from
 */

/**
 * The tweens that took a property in the current frame of a timeline.
 * @type {Array<Tween>}
 */
const changedOwners = [];

/** @type {JSAnimation} */
let sampledAnimation = null;
/** @type {JSAnimation} */
let sampledBy = null;
let sampledTime = 0;
let sampledAnimationTime = 0;

/**
 * Gives a property to the keyframes of an animation or takes it from them.
 * @param {Tween} tween The first keyframe of the property
 * @param {overrideTypes} isOverridden
 */
const setPropertyOwner = (tween, isOverridden) => {
  for (let keyframe = tween; keyframe && keyframe.target === tween.target && keyframe.property === tween.property; keyframe = keyframe._next) {
    keyframe._isOverridden = isOverridden;
    // Set NaN so the keyframe writes its value when it owns the property again.
    keyframe._currentTime = NaN;
  }
  // Clear _hasSimpleTweens so the animation takes the general gate that tests _isOverridden.
  tween.parent._hasSimpleTweens = false;
}

/**
 * Moves the properties of a timeline to the tweens that own them at a time.
 * @param {Timeline} timeline
 * @param {Number} time
 */
export const updateTimelineTakeovers = (timeline, time) => {
  const takeovers = timeline._takeovers;
  // Derive the owners from the time only, so a seek in any direction gives the same result.
  let index = timeline._takeoverIndex;
  while (index < takeovers.length && takeovers[index].time <= time) {
    const tween = takeovers[index++].tween;
    setPropertyOwner(tween._prevSibling, overrideTypes.TIMELINE);
    setPropertyOwner(tween, overrideTypes.NONE);
    changedOwners.push(tween);
  }
  while (index && takeovers[index - 1].time > time) {
    const tween = takeovers[--index].tween;
    setPropertyOwner(tween, overrideTypes.TIMELINE);
    setPropertyOwner(tween._prevSibling, overrideTypes.NONE);
    changedOwners.push(tween._prevSibling);
  }
  timeline._takeoverIndex = index;
}

/**
 * Composes the values of a timeline child at a time of its timeline, without a write, for a new child that reads them.
 * @param {JSAnimation} animation
 * @param {JSAnimation} newAnimation
 * @param {Number} time
 */
export const sampleAnimation = (animation, newAnimation, time) => {
  // Compose the values once for all the tweens of the new child that read them at the same time.
  if (sampledAnimation !== animation || sampledBy !== newAnimation || sampledTime !== time) {
    restoreSampledAnimation();
    sampledAnimation = animation;
    sampledBy = newAnimation;
    sampledTime = time;
    sampledAnimationTime = animation._currentTime;
    render(animation, (time - animation._offset) * animation._speed, 1, 1, tickModes.FORCE);
  }
}

/**
 * Puts the child that a new child sampled back at its own time.
 */
export const restoreSampledAnimation = () => {
  if (sampledAnimation) {
    render(sampledAnimation, sampledAnimationTime, 1, 1, tickModes.FORCE);
    sampledAnimation = null;
  }
}

/**
 * Removes the takeover of a tween that is replaced for good.
 * @param {Tween} tween The first keyframe of a property
 */
export const removeTimelineTakeover = tween => {
  const timeline = /** @type {Timeline} */(tween.parent.parent);
  const takeovers = timeline._takeovers;
  for (let i = takeovers.length; i--;) {
    const takeover = takeovers[i];
    if (takeover.tween === tween) {
      takeovers.splice(i, 1);
      if (i < timeline._takeoverIndex) timeline._takeoverIndex--;
    } else if (takeover.tween._prevSibling === tween) {
      // Link the tween that took the property from the replaced one to the one before it.
      takeover.tween._prevSibling = tween._prevSibling;
    }
  }
}

/**
 * Returns the tween that a new tween of a child takes its property from, and replaces the tweens of the timeline that take over later.
 * @param  {Tween} sibling The last tween of the timeline that took the property
 * @param  {JSAnimation} animation
 * @param  {Number} tweenStartTime
 * @return {Tween}
 */
export const getPreviousTimelineSibling = (sibling, animation, tweenStartTime) => {
  // Cut in at the position of the new animation, or at the start of the new tween with a negative delay.
  const cutTime = animation._offset + Math.min(tweenStartTime / animation._speed, 0);
  while (sibling) {
    sibling = getFirstKeyframe(sibling);
    const siblingAnimation = sibling.parent;
    const siblingStartTime = siblingAnimation._offset + (siblingAnimation._delay + sibling._startTime) / siblingAnimation._speed;
    // Keep a sibling that has time to change before the cut, a from value still shows at its start.
    if (round(cutTime - siblingStartTime, 12) >= (sibling._fromFunc ? 0 : minValue)) break;
    const prevSibling = sibling._prevSibling;
    overrideTween(sibling);
    sibling = prevSibling;
  }
  if (!sibling) return null;
  // Take the start value from the keyframe that plays at the cut.
  const siblingAnimation = sibling.parent;
  const cutIterationTime = (cutTime - siblingAnimation._offset) * siblingAnimation._speed - siblingAnimation._delay;
  sampleAnimation(siblingAnimation, animation, cutTime);
  let keyframe = sibling;
  while (keyframe._keyEnd <= cutIterationTime && keyframe._next && keyframe._next.target === keyframe.target && keyframe._next.property === keyframe.property) keyframe = keyframe._next;
  return keyframe;
}

/**
 * Records where a new tween of a child takes its property from the tween of an earlier child.
 * @param {Tween} tween
 * @param {Tween} prevSibling
 * @param {Number} tweenStartTime
 */
export const composeTimelineTween = (tween, prevSibling, tweenStartTime) => {
  const animation = tween.parent;
  const prevAnimation = prevSibling.parent;
  const timeline = /** @type {Timeline} */(animation.parent);
  // Take the property at the position of the animation, or at the start of the tween with a from value or a negative delay.
  const prevTween = getFirstKeyframe(prevSibling);
  const startTime = animation._offset + tweenStartTime / animation._speed;
  const cutTime = Math.min(animation._offset, startTime);
  const cutIterationTime = (cutTime - prevAnimation._offset) * prevAnimation._speed - prevAnimation._delay;
  const takeovers = timeline._takeovers;
  const takeoverTime = tween._fromFunc ? startTime : cutTime;
  let index = takeovers.length;
  while (index && takeovers[index - 1].time > takeoverTime) index--;
  // Undo the takeovers before the insertion, the next render moves the properties to their owners.
  updateTimelineTakeovers(timeline, -Infinity);
  takeovers.splice(index, 0, { time: takeoverTime, tween });
  tween._prevSibling = prevTween;
  tween._isOverridden = overrideTypes.TIMELINE;
  animation._hasSimpleTweens = false;
  // Stop the tweens before the new one at the cut, they hold their value until it takes over.
  for (let keyframe = prevTween; keyframe && keyframe.target === tween.target && keyframe.property === tween.property; keyframe = keyframe._next) {
    // Rounding is necessary here to minimize floating point errors when working in seconds
    const changeDuration = round(cutIterationTime - keyframe._startTime, 12);
    if (changeDuration < keyframe._changeDuration) {
      keyframe._changeDuration = changeDuration > 0 ? changeDuration : 0;
      // A truncated tween clamps to its own change duration, so its animation stops sharing one progress.
      prevAnimation._hasSharedProgress = false;
    }
  }
  prevAnimation._hasSimpleTweens = false;
}

/**
 * Renders a child that took a property in this frame and did not write it, its time stays past its end or before its start.
 * @param  {Number} muteCallbacks
 * @return {Number} The number of rendered children
 */
export const renderChangedOwners = muteCallbacks => {
  let hasRendered = 0;
  while (changedOwners.length) {
    const owner = changedOwners.pop();
    const ownerAnimation = owner.parent;
    if (isNaN(owner._currentTime) && !owner._isOverridden) {
      hasRendered += render(ownerAnimation, ownerAnimation._currentTime + ownerAnimation._delay, muteCallbacks, 0, tickModes.FORCE);
    }
  }
  return hasRendered;
}

/**
 * Composes a replace tween again after a time or a member of its timeline changes.
 * @param {Tween} tween
 */
const recomposeTimelineTween = tween => {
  if (tween._composition === compositionTypes.replace) {
    const animation = tween.parent;
    const tweenStartTime = animation._delay + tween._startTime;
    if (getFirstKeyframe(tween) === tween) getPreviousSibling(tween.target, tween.property, animation, tweenStartTime);
    composeTween(tween, tweenStartTime);
  }
}

/**
 * Releases the property of a replace tween and gives it back its full duration before its timeline composes it again.
 * @param {Tween} tween
 */
const releaseTimelineTween = tween => {
  if (tween._composition === compositionTypes.replace) {
    const lookups = getReplaceLookups(tween.target);
    const sibling = lookups[tween.property];
    if (sibling && sibling.parent.parent === tween.parent.parent) lookups[tween.property] = null;
    tween._isOverridden = overrideTypes.NONE;
    tween._changeDuration = tween._updateDuration;
    tween._prevSibling = null;
    tween._currentTime = NaN;
  }
}

/**
 * Builds the takeovers of a timeline again from its children, after a child stretches, leaves or comes back.
 * @param {Timeline} timeline
 */
export const rebuildTimelineTakeovers = timeline => {
  timeline._takeovers.length = timeline._takeoverIndex = 0;
  forEachChildren(timeline, (/** @type {JSAnimation} */child) => forEachChildren(child, releaseTimelineTween));
  forEachChildren(timeline, (/** @type {JSAnimation} */child) => forEachChildren(child, recomposeTimelineTween));
}

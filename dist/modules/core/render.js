/**
 * Anime.js - core - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { globals } from './globals.js';
import { minValue, tickModes, valueTypes, compositionTypes, tweenTypes, transformsSymbol } from './consts.js';
import { forEachChildren, round, now, clamp, lerp } from './helpers.js';
import { buildTransformString } from './transforms.js';
import { composeComplexValue } from './values.js';

/**
 * @import {
 *   Tickable,
 *   Renderable,
 *   CallbackArgument,
 *   Tween,
 *   DOMTarget,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   JSAnimation,
 * } from '../animation/animation.js'
*/

/**
 * @import {
 *   Timeline,
 * } from '../timeline/timeline.js'
*/

/**
 * @param  {Tickable} tickable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {tickModes} tickMode
 * @return {Number}
 */
const render = (tickable, time, muteCallbacks, internalRender, tickMode) => {

  const parent = tickable.parent;
  const duration = tickable.duration;
  const completed = tickable.completed;
  const iterationDuration = tickable.iterationDuration;
  const iterationCount = tickable.iterationCount;
  const _currentIteration = tickable._currentIteration;
  const _loopDelay = tickable._loopDelay;
  const _reversed = tickable._reversed;
  const _alternate = tickable._alternate;
  const _hasChildren = tickable._hasChildren;
  const tickableDelay = tickable._delay;
  const tickablePrevAbsoluteTime = tickable._currentTime; // TODO: rename ._currentTime to ._absoluteCurrentTime
  const tickableEndTime = tickableDelay + iterationDuration;
  const tickableAbsoluteTime = time - tickableDelay;
  const tickablePrevTime = clamp(tickablePrevAbsoluteTime, -tickableDelay, duration);
  const tickableCurrentTime = clamp(tickableAbsoluteTime, -tickableDelay, duration);
  const deltaTime = tickableAbsoluteTime - tickablePrevAbsoluteTime;
  const isCurrentTimeAboveZero = tickableCurrentTime > 0;
  const isCurrentTimeEqualOrAboveDuration = tickableCurrentTime >= duration;
  const isSetter = duration <= minValue;
  const forcedTick = tickMode === tickModes.FORCE;

  let isOdd = 0;
  let iterationElapsedTime = tickableAbsoluteTime;
  // Render checks
  // Used to also check if the children have rendered in order to trigger the onRender callback on the parent timer
  let hasRendered = 0;

  // Execute the "expensive" iterations calculations only when necessary
  if (iterationCount > 1) {
    // bitwise NOT operator seems to be generally faster than Math.floor() across browsers
    const period = iterationDuration + (isCurrentTimeEqualOrAboveDuration ? 0 : _loopDelay);
    const currentIteration = ~~(tickableCurrentTime / period);
    tickable._currentIteration = clamp(currentIteration, 0, iterationCount);
    // Prevent the iteration count to go above the max iterations when reaching the end of the animation
    if (isCurrentTimeEqualOrAboveDuration) tickable._currentIteration--;
    isOdd = tickable._currentIteration % 2;
    // Derive elapsed from the same `~~` truncation that gave currentIteration. Using `% period` here can disagree with `~~(/period)` under float drift at iteration boundaries and write the wrong end of the tween for one frame.
    iterationElapsedTime = tickableCurrentTime - currentIteration * period || 0;
  }

  // Checks if exactly one of _reversed and (_alternate && isOdd) is true
  const isReversed = _reversed ^ (_alternate && isOdd);
  const _ease = /** @type {Renderable} */(tickable)._ease;
  let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
  if (_ease) iterationTime = iterationDuration * _ease(iterationTime / iterationDuration) || 0;
  const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;

  tickable._currentTime = tickableAbsoluteTime;
  tickable._iterationTime = iterationTime;
  tickable.backwards = isRunningBackwards;

  if (isCurrentTimeAboveZero && !tickable.began) {
    tickable.began = true;
    if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
      tickable.onBegin(/** @type {CallbackArgument} */(tickable));
    }
  } else if (tickableAbsoluteTime <= 0) {
    tickable.began = false;
  }

  // Only triggers onLoop for tickable without children, otherwise call the the onLoop callback in the tick function
  // Make sure to trigger the onLoop before rendering to allow .refresh() to pickup the current values
  if (!muteCallbacks && !_hasChildren && isCurrentTimeAboveZero && tickable._currentIteration !== _currentIteration) {
    tickable.onLoop(/** @type {CallbackArgument} */(tickable));
  }

  if (
    forcedTick ||
    tickMode === tickModes.AUTO && (
      // Timeline children render from their offset instead of their delay so the gap left by a truncated sibling is covered on seek.
      time >= (parent && tickableDelay > 0 ? 0 : tickableDelay) && time <= tickableEndTime || // Normal render
      time <= tickableDelay && tickablePrevTime > tickableDelay || // Playhead is before the animation start time so make sure the animation is at its initial state
      time >= tickableEndTime && tickablePrevTime !== duration // Playhead is after the animation end time so make sure the animation is at its end state
    ) ||
    iterationTime >= tickableEndTime && tickablePrevTime !== duration ||
    // iterationTime is per-iteration, compared to the delay to catch a backward seek into a looped iteration's delay region. Exclude the final settled end, where iterationTime clamps to duration and would falsely match the delay region when the delay exceeds the duration.
    iterationTime <= tickableDelay && tickablePrevTime > 0 && !isCurrentTimeEqualOrAboveDuration ||
    time <= tickablePrevTime && tickablePrevTime === duration && completed || // Force a render if a seek occurs on an completed animation
    isCurrentTimeEqualOrAboveDuration && !completed && isSetter // This prevents 0 duration tickables to be skipped
  ) {

    if (isCurrentTimeAboveZero) {
      // Trigger onUpdate callback before rendering
      tickable.computeDeltaTime(tickablePrevTime);
      if (!muteCallbacks) tickable.onBeforeUpdate(/** @type {CallbackArgument} */(tickable));
    }

    // Start tweens rendering
    if (!_hasChildren) {

      // Time has jumped more than globals.tickThreshold so consider this tick manual
      const forcedRender = forcedTick || (isRunningBackwards ? deltaTime * -1 : deltaTime) >= globals.tickThreshold;
      // Round to match the precision of tween._absoluteStartTime so equal-time boundary checks compare cleanly without floating point drift from the unrounded _offset.
      const absoluteTime = round(tickable._offset + (parent ? parent._offset : 0) + tickableDelay + iterationTime, 12);

      // Only Animation can have tweens, Timer returns undefined
      let tween = /** @type {Tween} */(/** @type {JSAnimation} */(tickable)._head);
      let tweenTarget;
      let tweenStyle;
      let tweenTargetTransforms;
      let tweenTargetTransformsProperties;
      let tweenTransformsNeedUpdate = 0;

      while (tween) {

        const tweenComposition = tween._composition;
        const tweenCurrentTime = tween._currentTime;
        const tweenChangeDuration = tween._changeDuration;
        const tweenAbsEndTime = tween._absoluteStartTime + tween._changeDuration;
        const tweenNextRep = tween._nextRep;
        const tweenPrevRep = tween._prevRep;
        const tweenHasComposition = tweenComposition !== compositionTypes.none;
        // The previous sibling stops writing at its truncated end, so this tween takes over the hold from that point.
        const tweenPrevRepEndTime = tweenPrevRep ? tweenPrevRep._absoluteStartTime + tweenPrevRep._changeDuration : 0;
        const tweenPrevRepIsCrossParent = tweenPrevRep && tweenPrevRep.parent !== tween.parent;
        // Same parent keyframes take over at their own start, end plus delay equals the next start by construction.
        // Cross parent siblings take over at their update start.
        // Negative delay siblings take over at their own start instead.
        const tweenNextRepTakeover = !tweenNextRep || tweenNextRep._isOverridden ? tweenAbsEndTime :
          tweenNextRep.parent === tween.parent ? tweenAbsEndTime + tweenNextRep._delay :
          tweenNextRep._absoluteStartTime < tweenNextRep._absoluteUpdateStartTime ? tweenNextRep._absoluteStartTime : tweenNextRep._absoluteUpdateStartTime;

        if ((forcedRender || (
            // Tail keyframes always re-evaluate the gate so an earlier keyframe cannot leave the target stale by writing past its own range after a backward seek.
            (tweenCurrentTime !== tweenChangeDuration || absoluteTime <= tweenNextRepTakeover ||
            (tweenPrevRep && !tweenPrevRepIsCrossParent && (!tweenNextRep || tweenNextRep.parent !== tween.parent))) &&
            // A cross parent tween re-renders its from value from the previous sibling truncated end so the handoff gap holds.
            // A keyframe re-renders its from revert while the next keyframe time is stale so a backward jump over its range cannot leave the next value in place.
            (tweenCurrentTime !== 0 || absoluteTime >= tween._absoluteStartTime ||
            (tweenPrevRepIsCrossParent && !tween._hasFromValue && !tweenPrevRep._isOverridden && absoluteTime >= tweenPrevRepEndTime) ||
            (tweenNextRep && !tweenNextRep._isOverridden && tweenNextRep.parent === tween.parent && tweenNextRep._currentTime !== 0 && iterationTime < tweenNextRep._startTime))
          )) &&
          // Non-first keyframes wait until the iteration reaches their own start before rendering, so the previous keyframe can handle the from-revert when scrubbed backward past this tween's range.
          (!tweenPrevRep || tweenPrevRepIsCrossParent || iterationTime >= tween._startTime) &&
          (!tweenHasComposition || (
            !tween._isOverridden &&
            (!tween._isOverlapped || absoluteTime <= tweenAbsEndTime) &&
            // The next sibling owns the value past its takeover point, so yielding there keeps writes single owner in both directions.
            (!tweenNextRep || tweenNextRep._isOverridden || absoluteTime <= tweenNextRepTakeover) &&
            // The previous sibling owns the value up to its truncated end.
            // Cross parent tweens take over the hold from that point, explicit from values wait for their own start.
            (!tweenPrevRep || (tweenPrevRep._isOverridden || (!tweenPrevRepIsCrossParent ?
              absoluteTime >= tweenPrevRepEndTime + tween._delay :
              absoluteTime >= tween._absoluteStartTime || (!tween._hasFromValue && absoluteTime >= tweenPrevRepEndTime))))
          ))
        ) {

          const tweenNewTime = tween._currentTime = clamp(iterationTime - tween._startTime, 0, tweenChangeDuration);
          const tweenProgress = tween._ease(tweenNewTime / tween._updateDuration);
          const tweenModifier = tween._modifier;
          const tweenValueType = tween._valueType;
          const tweenType = tween._tweenType;
          const tweenIsObject = tweenType === tweenTypes.OBJECT;
          const tweenIsNumber = tweenValueType === valueTypes.NUMBER;
          // Only round the in-between frames values if the final value is a string. Object targets consume raw numbers, so rounding is dead work there.
          const tweenPrecision = (tweenIsNumber && tweenIsObject) || tweenProgress === 0 || tweenProgress === 1 ? -1 : globals.precision;

          // Recompose tween value
          /** @type {String|Number} */
          let value;
          /** @type {Number} */
          let number;

          if (tweenIsNumber) {
            value = number = /** @type {Number} */(tweenModifier(round(lerp(tween._fromNumber, tween._toNumber,  tweenProgress), tweenPrecision )));
          } else if (tweenValueType === valueTypes.UNIT) {
            // Rounding the values speed up string composition
            number = /** @type {Number} */(tweenModifier(round(lerp(tween._fromNumber, tween._toNumber,  tweenProgress), tweenPrecision)));
            value = `${number}${tween._unit}`;
          } else if (tweenValueType === valueTypes.COLOR) {
            const ns = tween._numbers;
            const fn = tween._fromNumbers;
            const tn = tween._toNumbers;
            const omt = 1 - tweenProgress;
            const fr = fn[0], fg = fn[1], fb = fn[2];
            const tr = tn[0], tg = tn[1], tb = tn[2];
            // RGB channels lerp in pseudo-linear space (square inputs, sqrt result) to approximate gamma-correct blending.
            // See https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear.
            ns[0] = /** @type {Number} */(tweenModifier(Math.sqrt(fr * fr * omt + tr * tr * tweenProgress)));
            ns[1] = /** @type {Number} */(tweenModifier(Math.sqrt(fg * fg * omt + tg * tg * tweenProgress)));
            ns[2] = /** @type {Number} */(tweenModifier(Math.sqrt(fb * fb * omt + tb * tb * tweenProgress)));
            ns[3] = /** @type {Number} */(tweenModifier(lerp(fn[3], tn[3], tweenProgress)));
            // The rgba string is built only for the dispatch path or the internalRender composition tick (setters handles the color comp)
            if (!tween._setter || internalRender) {
              value = `rgba(${round(ns[0], 0)},${round(ns[1], 0)},${round(ns[2], 0)},${ns[3]})`;
            }
          } else if (tweenValueType === valueTypes.COMPLEX) {
            value = composeComplexValue(tween, tweenProgress, tweenPrecision);
          }

          // For additive tweens and Animatables
          if (tweenHasComposition) {
            tween._number = number;
          }

          if (!internalRender && tweenComposition !== compositionTypes.blend) {

            const tweenProperty = tween.property;
            tweenTarget = tween.target;

            if (tween._setter) {
              tween._setter(tweenTarget, number, tween);
            } else if (tweenIsObject) {
              tweenTarget[tweenProperty] = value;
            } else if (tweenType === tweenTypes.ATTRIBUTE) {
              /** @type {DOMTarget} */(tweenTarget).setAttribute(tweenProperty, /** @type {String} */(value));
            } else {
              tweenStyle = /** @type {DOMTarget} */(tweenTarget).style;
              if (tweenType === tweenTypes.TRANSFORM) {
                if (tweenTarget !== tweenTargetTransforms) {
                  tweenTargetTransforms = tweenTarget;
                  // NOTE: Referencing the cachedTransforms in the tween property directly can be a little bit faster but appears to increase memory usage.
                  tweenTargetTransformsProperties = tweenTarget[transformsSymbol];
                }
                tweenTargetTransformsProperties[tweenProperty] = value;
                tweenTransformsNeedUpdate = 1;
              } else if (tweenType === tweenTypes.CSS) {
                tweenStyle[tweenProperty] = value;
              } else if (tweenType === tweenTypes.CSS_VAR) {
                tweenStyle.setProperty(tweenProperty,/** @type {String} */(value));
              }
            }

            if (isCurrentTimeAboveZero) hasRendered = 1;

          } else {
            // Used for composing timeline tweens without having to do a real render
            tween._value = value;
          }

        } else if (tweenCurrentTime && tweenPrevRep && !tweenPrevRepIsCrossParent && iterationTime < tween._startTime) {
          // Mark the keyframe as reverted when the playhead moves before its start, the previous keyframe owns the from revert and writes it once.
          tween._currentTime = 0;
        }

        if (tweenTransformsNeedUpdate && tween._renderTransforms) {
          tweenStyle.transform = buildTransformString(tweenTargetTransformsProperties);
          tweenTransformsNeedUpdate = 0;
        }

        tween = tween._next;
      }

      if (!muteCallbacks && hasRendered) {
        /** @type {JSAnimation} */(tickable).onRender(/** @type {JSAnimation} */(tickable));
      }
    }

    if (!muteCallbacks && isCurrentTimeAboveZero) {
      tickable.onUpdate(/** @type {CallbackArgument} */(tickable));
    }

  }

  // End tweens rendering

  // Handle setters on timeline differently and allow re-trigering the onComplete callback when seeking backwards
  if (parent && isSetter) {
    if (!muteCallbacks && (
      // (tickableAbsoluteTime > 0 instead) of (tickableAbsoluteTime >= duration) to prevent floating point precision issues
      // see: https://github.com/juliangarnier/anime/issues/1088
      (parent.began && !isRunningBackwards && tickableAbsoluteTime > 0 && !completed) ||
      (isRunningBackwards && tickableAbsoluteTime <= minValue && completed)
    )) {
      tickable.onComplete(/** @type {CallbackArgument} */(tickable));
      tickable.completed = !isRunningBackwards;
    }
  // If currentTime is both above 0 and at least equals to duration, handles normal onComplete or infinite loops
  } else if (isCurrentTimeAboveZero && isCurrentTimeEqualOrAboveDuration) {
    if (iterationCount === Infinity) {
      // Offset the tickable _startTime with its duration to reset _currentTime to 0 and continue the infinite timer
      tickable._startTime += tickable.duration;
    } else if (tickable._currentIteration >= iterationCount - 1) {
      // By setting paused to true, we tell the engine loop to not render this tickable and removes it from the list on the next tick
      tickable.paused = true;
      if (!completed && !_hasChildren) {
        // If the tickable has children, triggers onComplete() only when all children have completed in the tick function
        tickable.completed = true;
        if (!muteCallbacks && !(parent && (isRunningBackwards || !parent.began))) {
          tickable.onComplete(/** @type {CallbackArgument} */(tickable));
          tickable._resolve(/** @type {CallbackArgument} */(tickable));
        }
      }
    }
  // Otherwise set the completed flag to false
  } else {
    tickable.completed = false;
  }

  // NOTE: hasRendered * direction (negative for backwards) this way we can remove the tickable.backwards property completly ?
  return hasRendered;
};

/**
 * @param  {Tickable} tickable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {Number} tickMode
 * @return {void}
 */
const tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  const _currentIteration = tickable._currentIteration;
  render(tickable, time, muteCallbacks, internalRender, tickMode);
  if (tickable._hasChildren) {
    const tl = /** @type {Timeline} */(tickable);
    const tlIsRunningBackwards = tl.backwards;
    const tlChildrenTime = internalRender ? time : tl._iterationTime;
    const tlCildrenTickTime = now();

    let tlChildrenHasRendered = 0;
    let tlChildrenHaveCompleted = true;

    // If the timeline has looped forward, we need to manually triggers children skipped callbacks
    if (!internalRender && tl._currentIteration !== _currentIteration) {
      const tlIterationDuration = tl.iterationDuration;
      forEachChildren(tl, (/** @type {JSAnimation} */child) => {
        if (!tlIsRunningBackwards) {
          // Force an internal render to trigger the callbacks if the child has not completed on loop
          if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
            render(child, tlIterationDuration, muteCallbacks, 1, tickModes.FORCE);
          }
          // Reset their began and completed flags to allow retrigering callbacks on the next iteration
          child.began = false;
          child.completed = false;
        } else {
          const childDuration = child.duration;
          const childStartTime = child._offset + child._delay;
          const childEndTime = childStartTime + childDuration;
          // Triggers the onComplete callback on reverse for children on the edges of the timeline
          if (!muteCallbacks && childDuration <= minValue && (!childStartTime || childEndTime === tlIterationDuration)) {
            child.onComplete(child);
          }
        }
      });
      if (!muteCallbacks) tl.onLoop(/** @type {CallbackArgument} */(tl));
    }

    forEachChildren(tl, (/** @type {JSAnimation} */child) => {
      const childTime = round((tlChildrenTime - child._offset) * child._speed, 12); // Rounding is needed when using seconds
      // Skip past-end siblings on backward iteration so their progress=1 to-values don't render last and overwrite the active sibling's write. Compare against _delay + duration so children with a normalized delay are not skipped while still inside their active range.
      if (tlIsRunningBackwards && childTime > child._delay + child.duration) return;
      const childTickMode = child._fps < tl._fps ? child.requestTick(tlCildrenTickTime) : tickMode;
      tlChildrenHasRendered += render(child, childTime, muteCallbacks, internalRender, childTickMode);
      if (!child.completed && tlChildrenHaveCompleted) tlChildrenHaveCompleted = false;
    }, tlIsRunningBackwards);

    // Renders on timeline are triggered by its children so it needs to be set after rendering the children
    if (!muteCallbacks && tlChildrenHasRendered) tl.onRender(/** @type {CallbackArgument} */(tl));
    // Triggers the timeline onComplete() once all chindren all completed and the current time has reached the end
    if ((tlChildrenHaveCompleted || tlIsRunningBackwards) && tl._currentTime >= tl.duration) {
      // Make sure the paused flag is false in case it has been skipped in the render function
      tl.paused = true;
      if (!tl.completed) {
        tl.completed = true;
        if (!muteCallbacks) {
          tl.onComplete(/** @type {CallbackArgument} */(tl));
          tl._resolve(/** @type {CallbackArgument} */(tl));
        }
      }
    }
  }
};

export { render, tick };

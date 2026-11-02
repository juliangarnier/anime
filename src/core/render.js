import {
  globals,
} from './globals.js';

import {
  tweenTypes,
  valueTypes,
  tickModes,
  compositionTypes,
  transformsSymbol,
  minValue,
  noop,
} from './consts.js';

import {
  clamp,
  round,
  lerp,
} from './helpers.js';

import {
  buildTransformString,
} from './transforms.js';

import {
  composeComplexValue,
} from './values.js';

/**
 * @import {
 *   Renderable,
 *   Tween,
 *   DOMTarget,
 * } from '../types/index.js'
 * @import { Timer } from '../timer/timer.js'
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
 * Renders the tweens of an animation that all lerp a number into a JavaScript object, directly or through an adapter setter.
 * @param  {Tween} tween
 * @param  {Number} iterationTime
 * @param  {Boolean} forcedRender
 * @param  {Number} internalRender
 * @param  {Boolean} hasSharedProgress
 * @return {Number}
 */
const renderSimpleTweens = (tween, iterationTime, forcedRender, internalRender, hasSharedProgress) => {
  let hasRendered = 0;
  let sharedProgress = NaN;
  while (tween) {
    const tweenCurrentTime = tween._currentTime;
    const tweenChangeDuration = tween._changeDuration;
    const tweenStartTime = tween._startTime;
    // Test the general gate with no sibling, keyframe or override, DOM tween types stay on the general loop
    // which rounds their values to the global precision.
    // Keep the gate in this form, a rewrite of the walk cost 10 to 16 percent on one property updates.
    if (forcedRender || (
      (tweenCurrentTime !== tweenChangeDuration || iterationTime <= tweenStartTime + tweenChangeDuration) &&
      (tweenCurrentTime !== 0 || iterationTime >= tweenStartTime)
    )) {
      const tweenNewTime = clamp(iterationTime - tweenStartTime, 0, tweenChangeDuration);
      // Call a shared ease once per frame at the first rendered tween, NaN means not called yet.
      // Call common eases directly, a cache check and update per tween costs more.
      const tweenProgress = !hasSharedProgress ? tween._ease(tweenNewTime / tween._updateDuration) :
        sharedProgress === sharedProgress ? sharedProgress : (sharedProgress = tween._ease(tweenNewTime / tween._updateDuration));
      const value = /** @type {Number} */(tween._modifier(lerp(tween._fromNumber, tween._toNumber, tweenProgress)));
      if (tween._composition !== compositionTypes.none) tween._number = value;
      if (internalRender) {
        tween._value = value;
      } else {
        // Move the tween time only with a write, an internal render composes a value without one.
        // Write it in this branch, a test of internalRender on the walk branch cost 5 percent on timelines.
        tween._currentTime = tweenNewTime;
        if (tween._setter) tween._setter(tween.target, value, tween);
        else tween.target[tween.property] = value;
        hasRendered = 1;
      }
    }
    tween = tween._next;
  }
  return hasRendered;
}

/**
 * @param  {Timer} tickable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {tickModes} tickMode
 * @return {Number}
 */
export const render = (tickable, time, muteCallbacks, internalRender, tickMode) => {

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
    // Derive the elapsed time from the truncation that gave currentIteration,
    // so a modulo under float drift at an iteration boundary cannot write the wrong end of the tween for one frame.
    iterationElapsedTime = tickableCurrentTime - currentIteration * period || 0;
  }

  // Checks if exactly one of _reversed and (_alternate && isOdd) is true
  const isReversed = _reversed ^ (_alternate && isOdd);
  const _ease = /** @type {Renderable} */(tickable)._ease;
  let iterationTime = isCurrentTimeEqualOrAboveDuration ? isReversed ? 0 : duration : isReversed ? iterationDuration - iterationElapsedTime : iterationElapsedTime;
  // Ease only a time inside the iteration, a symmetric ease would mirror a time that sits before the start during a delay.
  if (_ease && iterationTime > 0 && iterationTime < iterationDuration) iterationTime = iterationDuration * _ease(iterationTime / iterationDuration) || 0;
  const isRunningBackwards = (parent ? parent.backwards : tickableAbsoluteTime < tickablePrevAbsoluteTime) ? !isReversed : !!isReversed;

  tickable._currentTime = tickableAbsoluteTime;
  tickable._iterationTime = iterationTime;
  tickable.backwards = isRunningBackwards;

  // Wait for parent.began before a child begins, so onBegin runs when the timeline starts after the child time passed zero.
  if (isCurrentTimeAboveZero && !tickable.began && !(parent && !parent.began)) {
    tickable.began = true;
    if (!muteCallbacks && !(parent && isRunningBackwards)) {
      tickable.onBegin(tickable);
    }
  } else if (tickableAbsoluteTime <= 0) {
    tickable.began = false;
  }

  // Only triggers onLoop for tickable without children, otherwise call the the onLoop callback in the tick function
  // Make sure to trigger the onLoop before rendering to allow .refresh() to pickup the current values
  if (!muteCallbacks && !_hasChildren && isCurrentTimeAboveZero && tickable._currentIteration !== _currentIteration) {
    tickable.onLoop(tickable);
  }

  // Render a timeline child from its offset instead of its delay so a seek covers the gap left by a truncated sibling.
  const renderStartTime = parent && tickableDelay > 0 ? -tickableDelay : 0;
  const tickableLaterTime = tickableAbsoluteTime > tickablePrevAbsoluteTime ? tickableAbsoluteTime : tickablePrevAbsoluteTime;
  const tickableEarlierTime = tickableAbsoluteTime < tickablePrevAbsoluteTime ? tickableAbsoluteTime : tickablePrevAbsoluteTime;
  if (
    forcedTick ||
    // Skip a move that stays before the start or past the end, it changes no value.
    // Render the end also on a frame that the frame rate skips.
    (tickMode === tickModes.AUTO || isCurrentTimeEqualOrAboveDuration) &&
    tickableLaterTime >= renderStartTime && tickableEarlierTime <= duration ||
    isCurrentTimeEqualOrAboveDuration && !completed && isSetter // This prevents 0 duration tickables to be skipped
  ) {

    if (isCurrentTimeAboveZero) {
      // Trigger onUpdate callback before rendering
      tickable.computeDeltaTime(tickablePrevTime);
      // Skip the call while the slot still holds noop, a page with one real callback makes this call site polymorphic for every animation.
      if (!muteCallbacks && tickable.onBeforeUpdate !== noop) {
        tickable.onBeforeUpdate(tickable);
        // Update the owners again, the callback can seek the timeline or another child.
        if (parent) /** @type {Timeline} */(parent).updateTakeovers(tickable._offset + time / tickable._speed);
      }
    }

    // Start tweens rendering
    if (!_hasChildren) {

      // Time has jumped more than globals.tickThreshold so consider this tick manual
      const forcedRender = forcedTick || (isRunningBackwards ? deltaTime * -1 : deltaTime) >= globals.tickThreshold;

      // Only Animation can have tweens, Timer returns undefined
      let tween = /** @type {Tween} */(/** @type {JSAnimation} */(tickable)._head);
      let tweenTarget;
      let tweenStyle;
      let tweenTargetTransforms;
      let tweenTargetTransformsProperties;
      let tweenTargetTransformsStyle;
      let tweenTransformsNeedUpdate = 0;
      // Call a shared ease once per frame instead of once per tween, at the first rendered tween,
      // so a frame where every tween is gated never runs an ease with side effects.
      const hasSharedProgress = /** @type {JSAnimation} */(tickable)._hasSharedProgress;

      // Take the short walk when every tween is simple so render skips the sibling gate and the value type switch.
      if (/** @type {JSAnimation} */(tickable)._hasSimpleTweens) {
        if (renderSimpleTweens(tween, iterationTime, forcedRender, internalRender, hasSharedProgress) && isCurrentTimeAboveZero) hasRendered = 1;
      } else {

        let sharedProgress = NaN;

        for (; tween; tween = tween._next) {

          // Skip a tween that does not own its property, composition decides the animation and the iteration time decides the keyframe.
          // Compose the value of every tween on an internal render.
          if (!internalRender && (tween._isOverridden || iterationTime < tween._keyStart || iterationTime >= tween._keyEnd)) {
            // Set NaN so the tween writes its value when it owns the property again, another tween writes it meanwhile.
            // A flag field tested in both walks cost 3 percent on replace updates, NaN costs nothing in the time compare.
            tween._currentTime = NaN;
            continue;
          }

          const tweenComposition = tween._composition;
          const tweenHasComposition = tweenComposition !== compositionTypes.none;
          const tweenTimeFromStart = iterationTime - tween._startTime;
          const tweenNewTime = clamp(tweenTimeFromStart, 0, tween._changeDuration);

          // Skip a value that is already on the target, and write the from value of a tween that sits on its start.
          // A broader write clause cost 23 percent on color updates.
          if (internalRender || forcedRender || tweenNewTime !== tween._currentTime || tweenTimeFromStart === 0) {

            if (!internalRender) tween._currentTime = tweenNewTime;
            // Call a shared ease once per frame at the first rendered tween, NaN means not called yet.
            // Call common eases directly, a cache check and update per tween costs more.
            const tweenProgress = !hasSharedProgress ? tween._ease(tweenNewTime / tween._updateDuration) :
              sharedProgress === sharedProgress ? sharedProgress : (sharedProgress = tween._ease(tweenNewTime / tween._updateDuration));
            const tweenModifier = tween._modifier;
            const tweenValueType = tween._valueType;
            const tweenType = tween._tweenType;
            const tweenIsObject = tweenType === tweenTypes.OBJECT;
            const tweenIsNumber = tweenValueType === valueTypes.NUMBER;
            // Only round the in-between frames values if the final value is a string
            // Object targets use the raw numbers, so rounding them is wasted work.
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
              const tweenNumbers = tween._numbers;
              const tweenFromNumbers = tween._fromNumbers;
              const tweenToNumbers = tween._toNumbers;
              const tweenRemaining = 1 - tweenProgress;
              const fromRed = tweenFromNumbers[0], fromGreen = tweenFromNumbers[1], fromBlue = tweenFromNumbers[2];
              const toRed = tweenToNumbers[0], toGreen = tweenToNumbers[1], toBlue = tweenToNumbers[2];
              // Lerp the RGB channels in pseudo linear space, square the inputs and take the square root of the result.
              // See https://developer.nvidia.com/gpugems/gpugems3/part-iv-image-effects/chapter-24-importance-being-linear.
              tweenNumbers[0] = /** @type {Number} */(tweenModifier(Math.sqrt(fromRed * fromRed * tweenRemaining + toRed * toRed * tweenProgress)));
              tweenNumbers[1] = /** @type {Number} */(tweenModifier(Math.sqrt(fromGreen * fromGreen * tweenRemaining + toGreen * toGreen * tweenProgress)));
              tweenNumbers[2] = /** @type {Number} */(tweenModifier(Math.sqrt(fromBlue * fromBlue * tweenRemaining + toBlue * toBlue * tweenProgress)));
              tweenNumbers[3] = /** @type {Number} */(tweenModifier(lerp(tweenFromNumbers[3], tweenToNumbers[3], tweenProgress)));
              // Build the rgba string only for the dispatch path or an internal render, a setter composes the color from _numbers.
              if (!tween._setter || internalRender) {
                value = `rgba(${round(tweenNumbers[0], 0)},${round(tweenNumbers[1], 0)},${round(tweenNumbers[2], 0)},${tweenNumbers[3]})`;
              }
            } else if (tweenValueType === valueTypes.COMPLEX) {
              // Build the text only when it is used so an adapter that reads _numbers skips the string formatting.
              value = composeComplexValue(tween, tweenProgress, tweenPrecision, !tween._setter || !!internalRender || tweenComposition === compositionTypes.blend);
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
                    // Flush the previous target here and once after the loop, so each target builds its transform string once per frame without a per tween flag.
                    if (tweenTransformsNeedUpdate) {
                      tweenTargetTransformsStyle.transform = buildTransformString(tweenTargetTransformsProperties);
                      tweenTransformsNeedUpdate = 0;
                    }
                    tweenTargetTransforms = tweenTarget;
                    tweenTargetTransformsStyle = tweenStyle;
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

          }
        }

        if (tweenTransformsNeedUpdate) tweenTargetTransformsStyle.transform = buildTransformString(tweenTargetTransformsProperties);
      }

      // Same noop test as onBeforeUpdate, one real callback on the page makes this call site polymorphic.
      if (!muteCallbacks && hasRendered && /** @type {JSAnimation} */(tickable).onRender !== noop) {
        /** @type {JSAnimation} */(tickable).onRender(/** @type {JSAnimation} */(tickable));
      }
    }

    // Same noop test as onBeforeUpdate, one real callback on the page makes this call site polymorphic.
    if (!muteCallbacks && isCurrentTimeAboveZero && tickable.onUpdate !== noop) {
      tickable.onUpdate(tickable);
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
      tickable.onComplete(tickable);
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
          tickable.onComplete(tickable);
          tickable._resolve(tickable);
        }
      }
    }
  // Otherwise set the completed flag to false
  } else {
    tickable.completed = false;
  }

  // NOTE: hasRendered * direction (negative for backwards) this way we can remove the tickable.backwards property completly ?
  return hasRendered;
}

/**
 * @param  {Timer} tickable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {Number} tickMode
 * @return {void}
 */
export const tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  // Keep tick small so V8 inlines it, the timeline code inside it cost 10 percent on one property updates.
  const previousIteration = tickable._currentIteration;
  render(tickable, time, muteCallbacks, internalRender, tickMode);
  if (tickable._hasChildren) /** @type {Timeline} */(tickable).renderChildren(time, muteCallbacks, internalRender, tickMode, previousIteration);
}

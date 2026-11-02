import {
  overrideTypes,
  K,
  minValue,
  emptyArray,
  tweenTypes,
  valueTypes,
  compositionTypes,
  compositionNames,
  isDomSymbol,
  noOriginalValueSymbol,
  noop,
} from '../core/consts.js';

import {
  mergeObjects,
  cloneArray,
  isArr,
  isObj,
  isUnd,
  isKey,
  addChild,
  forEachChildren,
  clampInfinity,
  normalizeTime,
  isNum,
  round,
  isFnc,
  isStr,
} from '../core/helpers.js';

import {
  globals,
} from '../core/globals.js';

import {
  registerTargets,
  getReplaceLookups,
} from '../core/targets.js';

import {
  resolveAdapterEntry,
} from '../adapters/registry.js';

import {
  getRelativeValue,
  getFunctionValue,
  getValueResolver,
  getOriginalAnimatableValue,
  getTweenType,
  setValue,
  decomposeRawValue,
  decomposeTweenValue,
  decomposedOriginalValue,
  composeComplexValue,
} from '../core/values.js';

import {
  sanitizePropertyName,
  revertValues,
} from '../core/styles.js';

import {
  convertValueUnit,
} from '../core/units.js';

import {
  none,
} from '../easings/none.js';

import {
  parseEase,
} from '../easings/eases/parser.js';

import {
  Timer,
} from '../timer/timer.js';

import {
  composeTween,
  getPreviousSibling,
} from './composition.js';

/**
 * @import { InlineValueStore } from '../core/values.js'
 * @import {
 *   Tween,
 *   TweenDecomposedValue,
 *   TweenKeyValue,
 *   TweenParamsOptions,
 *   TweenValues,
 *   DurationKeyframes,
 *   PercentageKeyframes,
 *   AnimationParams,
 *   TweenPropValue,
 *   ArraySyntaxValue,
 *   TargetsParam,
 *   TimerParams,
 *   DOMTarget,
 *   TargetsArray,
 *   Callback,
 *   EasingFunction,
 * } from '../types/index.js'
 *
 * @import {
 *   Timeline,
 * } from '../timeline/timeline.js'
 *
 * @import {
 *   Spring,
 * } from '../easings/spring/index.js'
 */

// Use a named slot for inlineValueStore so numeric originals do not slow later updates.
/** @type {InlineValueStore} */
const inlineValueStore = Object.create(null);
// Seed value with noOriginalValueSymbol so revert leaves a property whose start value came from a sibling
// to that sibling instead of restoring undefined.
inlineValueStore.value = noOriginalValueSymbol;

// Jump to the to value at any time past the start, floating point cannot resolve minValue after a delay
// so a ramp over a duration 0 tween stops short of the to value.
/** @type {EasingFunction} */
const jumpEase = t => t > 0 ? 1 : 0;

let JSAnimationId = 0;

/**
 * @param {DurationKeyframes | PercentageKeyframes} keyframes
 * @param {AnimationParams} parameters
 * @return {AnimationParams}
 */
const generateKeyframes = (keyframes, parameters) => {
  /** @type {AnimationParams} */
  const properties = {};
  if (isArr(keyframes)) {
    const frames = /** @type {DurationKeyframes} */(keyframes);
    // Store the names in properties directly instead of a filtered array and a Set.
    for (let i = 0, l = frames.length; i < l; i++) {
      const frame = frames[i];
      for (let name in frame) {
        if (isKey(name)) properties[name] = null;
      }
    }
    for (let propName in properties) {
      const propArray = frames.map(key => {
        /** @type {TweenKeyValue} */
        const newKey = {};
        for (let p in key) {
          const keyValue = /** @type {TweenPropValue} */(key[p]);
          if (isKey(p)) {
            if (p === propName) {
              newKey.to = keyValue;
            }
          } else {
            newKey[p] = keyValue;
          }
        }
        return newKey;
      });
      properties[propName] = /** @type {ArraySyntaxValue} */(propArray);
    }

  } else {
    const totalDuration = /** @type {Number} */(setValue(parameters.duration, globals.defaults.duration));
    const keys = Object.keys(keyframes)
    .map(key => { return {o: parseFloat(key) / 100, p: keyframes[key]} })
    .sort((a, b) => a.o - b.o);
    keys.forEach(key => {
      const offset = key.o;
      const prop = key.p;
      for (let name in prop) {
        if (isKey(name)) {
          let propArray = /** @type {Array} */(properties[name]);
          if (!propArray) propArray = properties[name] = [];
          const duration = offset * totalDuration;
          const length = propArray.length;
          const prevKey = propArray[length - 1];
          const keyObj = { to: prop[name] };
          let durProgress = 0;
          for (let i = 0; i < length; i++) {
            durProgress += propArray[i].duration;
          }
          if (length === 1) {
            keyObj.from = prevKey.to;
          }
          if (prop.ease) {
            keyObj.ease = prop.ease;
          }
          keyObj.duration = duration - (length ? durProgress : 0);
          propArray.push(keyObj);
        }
      }
    });

    for (let name in properties) {
      const propArray = /** @type {Array} */(properties[name]);
      let prevEase;
      // let durProgress = 0
      for (let i = 0, l = propArray.length; i < l; i++) {
        const prop = propArray[i];
        // Emulate WAPPI easing parameter position
        const currentEase = prop.ease;
        prop.ease = prevEase ? prevEase : undefined;
        prevEase = currentEase;
        // durProgress += prop.duration;
        // if (i === l - 1 && durProgress !== totalDuration) {
        //   propArray.push({ from: prop.to, ease: prop.ease, duration: totalDuration - durProgress })
        // }
      }
      if (!propArray[0].duration) {
        propArray.shift();
      }
    }

  }

  return properties;
}

/**
 * Sets _hasSharedProgress and _hasSimpleTweens from the tween list.
 * @param {JSAnimation} animation
 */
const classifyTweens = (animation) => {
  const head = animation._head;
  // Share the ease when every tween has one timing, the identity ease has no call to save.
  // Shared progress holds while every tween keeps _changeDuration equal to _updateDuration,
  // so the timeline composition clears it when it shortens one.
  let shared = !!(head && head._next && head._ease !== none);
  // Simple tweens lerp a number into a JavaScript object, directly or through an adapter setter, with no keyframe,
  // sibling or blend, so they take renderSimpleTweens and skip the gate clauses of the general loop.
  let simple = !!head;
  let previous = null;
  let tween = head;
  while (tween && (shared || simple)) {
    if (shared && (
      tween._ease !== head._ease ||
      tween._startTime !== head._startTime ||
      tween._updateDuration !== head._updateDuration
    )) shared = false;
    if (simple && (
      tween._valueType !== valueTypes.NUMBER ||
      tween._tweenType !== tweenTypes.OBJECT ||
      tween._composition === compositionTypes.blend ||
      tween._isOverridden ||
      (previous && previous.target === tween.target && previous.property === tween.property)
    )) simple = false;
    previous = tween;
    tween = tween._next;
  }
  animation._hasSharedProgress = shared;
  animation._hasSimpleTweens = simple;
}

export class JSAnimation extends Timer {
  /**
   * @param {TargetsParam} targets
   * @param {AnimationParams} parameters
   * @param {Timeline} [parent]
   * @param {Number} [parentPosition]
   * @param {Boolean} [fastSet=false]
   * @param {Number} [index=0]
   * @param {TargetsArray} [allTargets]
   */
  constructor(
    targets,
    parameters,
    parent,
    parentPosition,
    fastSet = false,
    index = 0,
    allTargets
  ) {

    super(/** @type {TimerParams & AnimationParams} */(parameters), parent, parentPosition);

    /** @type {Tween} */
    this._head;
    /** @type {Tween} */
    this._tail;
    // Define both flags before the loop, composition clears them while the tweens are created.
    /** @type {Boolean} */
    this._hasSharedProgress = false;
    /** @type {Boolean} */
    this._hasSimpleTweens = false;

    ++JSAnimationId;

    const parsedTargets = registerTargets(targets);
    const targetsLength = parsedTargets.length;

    // If the parameters object contains a "keyframes" property, convert all the keyframes values to regular properties

    const kfParams = /** @type {AnimationParams} */(parameters).keyframes;
    const params = /** @type {AnimationParams} */(kfParams ? mergeObjects(generateKeyframes(/** @type {DurationKeyframes} */(kfParams), parameters), parameters) : parameters);

    const {
      id,
      delay,
      duration,
      ease,
      playbackEase,
      modifier,
      composition,
      onRender,
    } = params;

    const animDefaults = parent ? parent.defaults : globals.defaults;
    const animEase = setValue(ease, animDefaults.ease);
    const animPlaybackEase = setValue(playbackEase, animDefaults.playbackEase);
    const parsedAnimPlaybackEase = animPlaybackEase ? parseEase(animPlaybackEase) : null;
    const hasSpring = !isUnd(/** @type {Spring} */(animEase).ease);
    const tEasing = hasSpring ? /** @type {Spring} */(animEase).ease : setValue(ease, parsedAnimPlaybackEase ? 'linear' : animDefaults.ease);
    const tDuration = hasSpring ? /** @type {Spring} */(animEase).settlingDuration : setValue(duration, animDefaults.duration);
    const tDelay = setValue(delay, animDefaults.delay);
    const tModifier = modifier || animDefaults.modifier;
    // If no composition is defined and the targets length is high (>= 1000) set the composition to 'none' (0) for faster tween creation
    const tComposition = isUnd(composition) && targetsLength >= K ? compositionTypes.none : !isUnd(composition) ? composition : animDefaults.composition;
    // This allows targeting the current animation in the spring onComplete callback
    if (hasSpring) /** @type {Spring} */(animEase).parent = this;

    const animationMuted = this.muted;

    let iterationDuration = NaN;
    let iterationDelay = NaN;
    let shouldTriggerRender = 0;

    const tl = allTargets || parsedTargets;

    for (let targetIndex = 0; targetIndex < targetsLength; targetIndex++) {

      const target = parsedTargets[targetIndex];
      const ti = index || targetIndex;

      for (let p in params) {

        if (isKey(p)) {

          const tweenType = getTweenType(target, p);
          const adapterProp = resolveAdapterEntry(target, p);

          const propName = sanitizePropertyName(p, target, tweenType);

          const propValue = /** @type {TweenPropValue} */(params[p]);
          const isPropValueArray = isArr(propValue);

          /** @type {Array<TweenPropValue>} */
          let keyframes = null;
          let firstFromValue;
          let firstToValue;
          let hasFirstFrameValues = false;

          if (fastSet && !isPropValueArray) {
            firstFromValue = firstToValue = propValue;
            hasFirstFrameValues = true;
          }

          // TODO: Allow nested keyframes inside ObjectValue value (prop: { to: [.5, 1, .75, 2, 3] })
          if (isPropValueArray) {
            const arrayLength = /** @type {Array} */(propValue).length;
            const isNotObjectValue = !isObj(propValue[0]);
            if (arrayLength > 2 && isNotObjectValue) {
              // Read propValue before resolving frames so its getters keep their original order.
              keyframes = [];
              /** @type {Array.<Number>} */(propValue).forEach((v, i) => {
                if (!i) {
                  firstFromValue = v;
                } else if (i === 1) {
                  firstToValue = v;
                  hasFirstFrameValues = true;
                  keyframes.push(v);
                } else {
                  keyframes.push(v);
                }
              });
            } else if (arrayLength !== 2 || !isNotObjectValue) {
              keyframes = /** @type {Array.<TweenPropValue>} */(propValue);
            }
          }

          let prevTween = null;
          let prevKeyTween = null;
          let lastTweenChangeEndTime = 0;
          let tweenIndex = 0;
          let firstTween = null;

          for (let l = keyframes ? keyframes.length : 1; tweenIndex < l; tweenIndex++) {

            const keyframe = keyframes ? keyframes[tweenIndex] : propValue;
            const isFirstFrameValues = !tweenIndex && hasFirstFrameValues;
            /** @type {TweenParamsOptions & TweenValues} */
            let key = !isFirstFrameValues && isObj(keyframe) ?
              /** @type {TweenParamsOptions & TweenValues} */(keyframe) : null;

            const computedComposition = getFunctionValue(setValue(key?.composition, tComposition), target, ti, tl, null);
            let tweenComposition = isNum(computedComposition) ? computedComposition : compositionNames[computedComposition];
            const tweenMuted = animationMuted || !!key?.muted;
            // A muted tween keeps its timing and its place in the tween list but joins no sibling list.
            if (tweenMuted) tweenComposition = compositionTypes.none;
            // Timelines pass the last sibling tween if it belongs to the same timeline
            // Standalone animations only pass prevTween when the property has multiple keyframes
            const tailTween = tweenComposition !== compositionTypes.none ? getReplaceLookups(target)[propName] : null;
            const prevSiblingTween = parent && tailTween && tailTween.parent.parent === parent ? tailTween : prevTween;
            // Sample the previous child at the position of the new one, a function value can read its value.
            if (prevSiblingTween && prevSiblingTween !== prevTween && prevSiblingTween.parent !== this) parent.sampleChild(prevSiblingTween.parent, this, this._offset);
            const rawToValue = isFirstFrameValues ? firstToValue : key ? key.to : keyframe;
            let toFunc = isFirstFrameValues ? null : getValueResolver(rawToValue, target, ti, tl, prevSiblingTween);
            const computedToValue = toFunc ? toFunc() : rawToValue;

            let tweenToValue;
            // Allows function based values to return an object syntax value ({to: v})
            if (!isFirstFrameValues && isObj(computedToValue) && !isUnd(computedToValue.to)) {
              key = computedToValue;
              tweenToValue = computedToValue.to;
            } else {
              tweenToValue = computedToValue;
            }
            const rawFromValue = key?.from;
            let fromFunc = getValueResolver(rawFromValue, target, ti, tl, prevSiblingTween);
            const tweenFromValue = fromFunc ? fromFunc() : rawFromValue;
            const easeToParse = key?.ease || tEasing;

            const easeFunctionResult = getFunctionValue(easeToParse, target, ti, tl, prevSiblingTween);
            const keyEasing = isFnc(easeFunctionResult) || isStr(easeFunctionResult) ? easeFunctionResult : easeToParse;

            const hasSpring = !isUnd(keyEasing) && !isUnd(/** @type {Spring} */(keyEasing).ease);
            const tweenEasing = hasSpring ? /** @type {Spring} */(keyEasing).ease : keyEasing;
            // Calculate default individual keyframe duration by dividing the tl of keyframes
            const tweenDuration = hasSpring ? /** @type {Spring} */(keyEasing).settlingDuration : getFunctionValue(setValue(key?.duration, (l > 1 ? getFunctionValue(tDuration, target, ti, tl, prevSiblingTween) / l : tDuration)), target, ti, tl, prevSiblingTween);
            // Default delay value should only be applied to the first tween
            const tweenDelay = getFunctionValue(setValue(key?.delay, (!tweenIndex ? tDelay : 0)), target, ti, tl, prevSiblingTween);
            // Modifiers are treated differently and don't accept function based value to prevent having to pass a function wrapper
            const tweenModifier = key?.modifier || tModifier;
            const hasFromvalue = !isUnd(tweenFromValue);
            const hasToValue = isFirstFrameValues || !isUnd(tweenToValue);
            const isFromToArray = isArr(tweenToValue);
            const isFromToValue = isFirstFrameValues || isFromToArray || (hasFromvalue && hasToValue);
            // prevTween skips muted keyframes, so only the index tells a first keyframe from a later one.
            const tweenStartTime = tweenIndex ? lastTweenChangeEndTime + tweenDelay : tweenDelay;

            // Force a onRender callback if the animation contains at least one from value and autoplay is set to false
            if (!shouldTriggerRender && !tweenMuted && (hasFromvalue || isFromToArray || isFirstFrameValues)) shouldTriggerRender = 1;

            let prevSibling = prevTween;
            if (!prevTween && tweenComposition !== compositionTypes.none) prevSibling = getPreviousSibling(target, propName, this, tweenStartTime);

            // Decompose values
            /** @type {valueTypes} */
            let fromType, toType;
            /** @type {Number} */
            let fromNumber, toNumber;
            /** @type {String} */
            let fromUnit, toUnit, fromOperator, toOperator;
            /** @type {TweenDecomposedValue['d']} */
            let fromNumbers, toNumbers;
            /** @type {TweenDecomposedValue['s']} */
            let fromStrings, toStrings;
            /** @type {InlineValueStore['value']} */
            let inlineValue = noOriginalValueSymbol;
            if (isFromToValue) {
              const fromValue = isFirstFrameValues ? firstFromValue : isFromToArray ? tweenToValue[0] : tweenFromValue;
              const fromValueFunc = isFirstFrameValues || isFromToArray ? getValueResolver(fromValue, target, ti, tl, prevSiblingTween) : null;
              if (fromValueFunc) fromFunc = fromValueFunc;
              ({ t: fromType, n: fromNumber, u: fromUnit, o: fromOperator, d: fromNumbers, s: fromStrings } = decomposeRawValue(fromValueFunc ? fromValueFunc() : fromValue));
              const toValue = isFirstFrameValues ? firstToValue : isFromToArray ? tweenToValue[1] : tweenToValue;
              const toValueFunc = isFirstFrameValues || isFromToArray ? getValueResolver(toValue, target, ti, tl, prevSiblingTween) : null;
              if (toValueFunc) toFunc = toValueFunc;
              ({ t: toType, n: toNumber, u: toUnit, o: toOperator, d: toNumbers, s: toStrings } = decomposeRawValue(toValueFunc ? toValueFunc() : toValue));
              // Needed to force an inline style registration
              // Capture originalValue only once so later keyframes do not replace the value used for restoration.
              const originalValue = prevTween ? undefined : getOriginalAnimatableValue(target, propName, tweenType, inlineValueStore);
              if (!prevTween) {
                inlineValue = inlineValueStore.value;
                inlineValueStore.value = noOriginalValueSymbol;
              }
              if (fromType === valueTypes.NUMBER) {
                if (!prevSibling) decomposeRawValue(originalValue);
                if ((prevSibling ? prevSibling._valueType : decomposedOriginalValue.t) === valueTypes.UNIT) {
                  fromType = valueTypes.UNIT;
                  fromUnit = prevSibling ? prevSibling._unit : decomposedOriginalValue.u;
                }
              }
            } else {
              if (hasToValue) {
                decomposeRawValue(tweenToValue);
              } else if (prevTween) {
                decomposeTweenValue(prevTween);
              } else {
                // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                const useSibling = parent && prevSibling && prevSibling.parent.parent === parent;
                const originalValue = useSibling ? prevSibling._value : getOriginalAnimatableValue(target, propName, tweenType, inlineValueStore);
                if (!useSibling) {
                  inlineValue = inlineValueStore.value;
                  inlineValueStore.value = noOriginalValueSymbol;
                }
                decomposeRawValue(originalValue);
              }
              ({ t: toType, n: toNumber, u: toUnit, o: toOperator, d: toNumbers, s: toStrings } = decomposedOriginalValue);
              if (hasFromvalue) {
                decomposeRawValue(tweenFromValue);
              } else if (prevTween) {
                decomposeTweenValue(prevTween);
              } else {
                // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                const useSibling = parent && prevSibling && prevSibling.parent.parent === parent;
                const originalValue = useSibling ? prevSibling._value : getOriginalAnimatableValue(target, propName, tweenType, inlineValueStore);
                if (!useSibling) {
                  inlineValue = inlineValueStore.value;
                  inlineValueStore.value = noOriginalValueSymbol;
                }
                decomposeRawValue(originalValue);
              }
              ({ t: fromType, n: fromNumber, u: fromUnit, o: fromOperator, d: fromNumbers, s: fromStrings } = decomposedOriginalValue);
            }

            // Apply operators
            if (fromOperator) {
              let originalNumber;
              if (!prevSibling) {
                const originalValue = getOriginalAnimatableValue(target, propName, tweenType, inlineValueStore);
                inlineValue = inlineValueStore.value;
                inlineValueStore.value = noOriginalValueSymbol;
                originalNumber = decomposeRawValue(originalValue).n;
              } else {
                originalNumber = prevSibling._toNumber;
              }
              fromNumber = getRelativeValue(originalNumber, fromNumber, fromOperator);
            }

            if (toOperator) {
              toNumber = getRelativeValue(fromNumber, toNumber, toOperator);
            }

            // Values omogenisation in cases of type difference between "from" and "to"
            if (fromType !== toType) {
              if (fromType === valueTypes.COMPLEX || toType === valueTypes.COMPLEX) {
                if (fromType === valueTypes.COMPLEX) {
                  toStrings = cloneArray(fromStrings);
                  toNumbers = fromNumbers.map(() => toNumber);
                } else {
                  fromStrings = cloneArray(toStrings);
                  fromNumbers = toNumbers.map(() => fromNumber);
                }
                fromType = toType = valueTypes.COMPLEX;
              } else if (fromType === valueTypes.UNIT || toType === valueTypes.UNIT) {
                if (fromType === valueTypes.UNIT) toUnit = fromUnit;
                else fromUnit = toUnit;
                fromType = toType = valueTypes.UNIT;
              } else {
                // Default to opaque black so a number side never drags alpha to transparent.
                if (fromType === valueTypes.COLOR) toNumbers = [0, 0, 0, 1];
                else fromNumbers = [0, 0, 0, 1];
                fromType = toType = valueTypes.COLOR;
              }
            }

            // Unit conversion
            if (fromUnit !== toUnit) {
              if (toUnit) {
                fromNumber = convertValueUnit(/** @type {DOMTarget} */(target), fromNumber, fromUnit, toUnit, fromType);
                fromUnit = toUnit;
              } else {
                toNumber = convertValueUnit(/** @type {DOMTarget} */(target), toNumber, toUnit, fromUnit, toType);
                toUnit = fromUnit;
              }
            }

            // Fill in non existing complex values
            if (toNumbers && fromNumbers && (toNumbers.length !== fromNumbers.length)) {
              // TODO: Check if n should be used instead of 0 for default complex values
              if (fromNumbers.length > toNumbers.length) {
                toNumbers = fromNumbers.map((/** @type {Number} */_, /** @type {Number} */i) => isUnd(toNumbers[i]) ? 0 : toNumbers[i]);
                toStrings = cloneArray(fromStrings);
              } else {
                fromNumbers = toNumbers.map((/** @type {Number} */_, /** @type {Number} */i) => isUnd(fromNumbers[i]) ? 0 : fromNumbers[i]);
                fromStrings = cloneArray(toStrings);
              }
            }

            // Tween factory

            // Rounding is necessary here to minimize floating point errors when working in seconds
            const tweenUpdateDuration = round(+tweenDuration || minValue, 12);

            // Resolve the adapter setter once so render skips the lookup per frame.
            const tweenSetter = adapterProp ? adapterProp.set : null;

            // Rounding is necessary here to minimize floating point errors when working in seconds
            lastTweenChangeEndTime = round(tweenStartTime + tweenUpdateDuration, 12);

            /** @type {Tween} */
            const tween = {
              parent: this,
              property: propName,
              target: target,
              _value: null,
              _toFunc: toFunc,
              // Store noop in _fromFunc for a literal start value so no tween needs a _hasFromValue field.
              _fromFunc: fromFunc || (hasFromvalue || isFromToArray || isFirstFrameValues ? noop : null),
              _ease: tweenUpdateDuration === minValue ? jumpEase : parseEase(tweenEasing),
              _fromNumbers: fromNumbers ? cloneArray(fromNumbers) : emptyArray,
              _toNumbers: toNumbers ? cloneArray(toNumbers) : emptyArray,
              _strings: toStrings ? cloneArray(toStrings) : emptyArray,
              _fromNumber: fromNumber,
              _toNumber: toNumber,
              _numbers: fromNumbers ? cloneArray(fromNumbers) : emptyArray, // For additive tween and animatables
              _number: fromNumber, // For additive tween and animatables
              _unit: toUnit,
              _modifier: tweenModifier,
              _currentTime: 0,
              _startTime: tweenStartTime,
              _updateDuration: tweenUpdateDuration,
              _changeDuration: tweenUpdateDuration,
              // NOTE: Investigate bit packing to stores ENUM / BOOL
              _tweenType: tweenType,
              _setter: tweenSetter,
              _valueType: toType,
              // Encode muting in fields the render gate reads, so render needs no mute check.
              _composition: tweenMuted ? compositionTypes.muted : tweenComposition,
              _isOverridden: tweenMuted ? overrideTypes.PERMANENT : overrideTypes.NONE,
              _keyStart: prevKeyTween && tweenComposition !== compositionTypes.blend ? tweenStartTime : -Infinity,
              _keyEnd: Infinity,
              _prevSibling: null, // The previous owner of the property in a timeline, or the blend tween added before this one
              _inlineValue: inlineValue,
              _prev: null,
              _next: null,
            }

            if (tweenComposition !== compositionTypes.none) {
              composeTween(tween);
            }

            // Pre-compute the tween end value for function-based value chaining (ie morphTo / scrambleText in keyframe arrays and timelines)
            if (!tweenMuted) {
              const vt = tween._valueType;
              if (vt === valueTypes.COMPLEX) {
                tween._value = composeComplexValue(tween, 1, -1);
              } else if (vt === valueTypes.UNIT) {
                tween._value = `${tweenModifier(tween._toNumber)}${tween._unit}`;
              } else if (vt === valueTypes.COLOR) {
                tween._value = `rgba(${round(tweenModifier(toNumbers[0]), 0)},${round(tweenModifier(toNumbers[1]), 0)},${round(tweenModifier(toNumbers[2]), 0)},${tweenModifier(toNumbers[3])})`;
              } else {
                tween._value = tweenModifier(tween._toNumber);
              }
            }

            if (!firstTween) firstTween = tween;

            if (!tweenMuted) {
              prevTween = tween;
              // Hold the keyframe before a blend keyframe until the next one that replaces it, a blend adds to the property at every time.
              if (tweenComposition !== compositionTypes.blend) {
                if (prevKeyTween) prevKeyTween._keyEnd = tweenStartTime;
                prevKeyTween = tween;
              }
            }

            addChild(this, tween);

          }

          // Update animation timings with the added tweens properties

          if (firstTween && (isNaN(iterationDelay) || firstTween._startTime < iterationDelay)) {
            iterationDelay = firstTween._startTime;
          }

          if (isNaN(iterationDuration) || lastTweenChangeEndTime > iterationDuration) {
            iterationDuration = lastTweenChangeEndTime;
          }

        }

      }

    }

    if (!targetsLength) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }

    if (iterationDelay) {
      forEachChildren(this, (/** @type {Tween} */tween) => {
        tween._startTime -= iterationDelay;
        tween._keyStart -= iterationDelay;
        tween._keyEnd -= iterationDelay;
      });
      iterationDuration -= iterationDelay;
    } else {
      iterationDelay = 0;
    }

    // Prevents iterationDuration to be NaN if no valid animatable props have been provided
    // Prevents _iterationCount to be NaN if no valid animatable props have been provided
    if (!iterationDuration) {
      iterationDuration = minValue;
      this.iterationCount = 0;
    }
    /** @type {TargetsArray} */
    this.targets = parsedTargets;
    /** @type {String|Number} */
    this.id = !isUnd(id) ? id : JSAnimationId;
    /** @type {Number} */
    this.duration = iterationDuration === minValue ? minValue : clampInfinity(((iterationDuration + this._loopDelay) * this.iterationCount) - this._loopDelay) || minValue;
    // Swap onRender for noop once so render never tests a mute flag.
    /** @type {Callback<this>} */
    this.onRender = animationMuted ? noop : onRender || animDefaults.onRender;
    /** @type {EasingFunction} */
    this._ease = parsedAnimPlaybackEase;
    // Classify in a module function, more constructor code can move setup to a slower V8 tier.
    classifyTweens(this);
    /** @type {Number} */
    this._delay = iterationDelay;
    // NOTE: I'm keeping delay values separated from offsets in timelines because delays can override previous tweens and it could be confusing to debug a timeline with overridden tweens and no associated visible delays.
    // this._delay = parent ? 0 : iterationDelay;
    // this._offset += parent ? iterationDelay : 0;
    /** @type {Number} */
    this.iterationDuration = iterationDuration;

    if (!this._autoplay && shouldTriggerRender) this.onRender(this);
  }

  /**
   * @param  {Number} newDuration
   * @param  {Boolean} [isParentStretch]
   * @return {this}
   */
  stretch(newDuration, isParentStretch) {
    const currentDuration = this.duration;
    if (currentDuration === normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    // NOTE: Find a better way to handle the stretch of an animation after stretch = 0
    forEachChildren(this, (/** @type {Tween} */tween) => {
      // Rounding is necessary here to minimize floating point errors
      tween._updateDuration = normalizeTime(tween._updateDuration * timeScale);
      tween._changeDuration = normalizeTime(tween._changeDuration * timeScale);
      tween._currentTime *= timeScale;
      tween._startTime *= timeScale;
      tween._keyStart *= timeScale;
      tween._keyEnd *= timeScale;
    });
    return super.stretch(newDuration, isParentStretch);
  }

  /**
   * @return {this}
   */
  refresh() {
    forEachChildren(this, (/** @type {Tween} */tween) => {
      const toFunc = tween._toFunc;
      const fromFunc = tween._fromFunc;
      // Treat noop as a literal start value so only a real _fromFunc runs again.
      const hasFromFunc = fromFunc && fromFunc !== noop;
      if (toFunc || hasFromFunc) {
        // Set NaN so the tween writes its new values at the next render.
        tween._currentTime = NaN;
        if (hasFromFunc) {
          const { t, n, u, d } = decomposeRawValue(fromFunc());
          let number = n;
          if (u !== tween._unit && tween.target[isDomSymbol]) {
            number = convertValueUnit(/** @type {DOMTarget} */(tween.target), n, u, tween._unit, t, true);
          }
          tween._fromNumbers = cloneArray(d);
          tween._fromNumber = number;
        } else if (toFunc) {
          // When only toFunc exists, get from value from target
          const { d, n } = decomposeRawValue(getOriginalAnimatableValue(tween.target, tween.property, tween._tweenType));
          tween._fromNumbers = cloneArray(d);
          tween._fromNumber = n;
        }
        if (toFunc) {
          const computedToValue = toFunc();
          const toValue = isObj(computedToValue) && !isUnd(computedToValue.to) ? computedToValue.to : computedToValue;
          if (isArr(toValue)) {
            const { t, n, u, o, d } = decomposeRawValue(toValue[0]);
            let number = n;
            if (u !== tween._unit && tween.target[isDomSymbol]) {
              number = convertValueUnit(/** @type {DOMTarget} */(tween.target), n, u, tween._unit, t, true);
            }
            tween._fromNumbers = cloneArray(d);
            tween._fromNumber = o ? getRelativeValue(tween._fromNumber, number, o) : number;
            decomposeRawValue(toValue[1]);
          } else {
            decomposeRawValue(toValue);
          }
          const { d, s, o, n } = decomposedOriginalValue;
          tween._toNumbers = cloneArray(d);
          tween._strings = cloneArray(s);
          // Make sure to apply relative operators https://github.com/juliangarnier/anime/issues/1025
          tween._toNumber = o ? getRelativeValue(tween._fromNumber, n, o) : n;
        }
      }
    });
    // This forces setter animations to render once
    if (this.duration === minValue) this.restart();
    return this;
  }

  /**
   * Cancel the animation and revert all the values affected by this animation to their original state
   * @param {Boolean} [render] Pass false to restore the values without rendering the animation at 0
   * @return {this}
   */
  revert(render = true) {
    super.revert(render);
    return revertValues(this);
  }

}

/**
 * @param {TargetsParam} targets
 * @param {AnimationParams} parameters
 * @return {JSAnimation}
 */
export const animate = (targets, parameters) => {
  if (globals.editor) {
    return globals.editor.addAnimation(targets, parameters);
  } else {
    return new JSAnimation(targets, parameters).init();
  }
};

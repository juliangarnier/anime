/**
 * Anime.js - animation - CJS
 * @version v4.4.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var globals = require('../core/globals.cjs');
var targets = require('../core/targets.cjs');
var values = require('../core/values.cjs');
var styles = require('../core/styles.cjs');
var units = require('../core/units.cjs');
var parser = require('../easings/eases/parser.cjs');
var timer = require('../timer/timer.cjs');
var composition = require('./composition.cjs');
var additive = require('./additive.cjs');

/**
 * @import {
 *   Tween,
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
 *   TweenParamValue,
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

// Defines decomposed values target objects only once and mutate their properties later to avoid GC
// TODO: Maybe move the objects creation to values.js and use the decompose function to create the base object
const fromTargetObject = values.createDecomposedValueTargetObject();
const toTargetObject = values.createDecomposedValueTargetObject();
const inlineStylesStore = {};
const toFunctionStore = { func: null };
const fromFunctionStore = { func: null };
const keyframesTargetArray = [null];
const fastSetValuesArray = [null, null];
/** @type {TweenKeyValue} */
const keyObjectTarget = { to: null };

let tweenId = 0;
let JSAnimationId = 0;
let keyframes;
/** @type {TweenParamsOptions & TweenValues} */
let key;

/**
 * @param {DurationKeyframes | PercentageKeyframes} keyframes
 * @param {AnimationParams} parameters
 * @return {AnimationParams}
 */
const generateKeyframes = (keyframes, parameters) => {
  /** @type {AnimationParams} */
  const properties = {};
  if (helpers.isArr(keyframes)) {
    const propertyNames = [].concat(.../** @type {DurationKeyframes} */(keyframes).map(key => Object.keys(key))).filter(helpers.isKey);
    for (let i = 0, l = propertyNames.length; i < l; i++) {
      const propName = propertyNames[i];
      const propArray = /** @type {DurationKeyframes} */(keyframes).map(key => {
        /** @type {TweenKeyValue} */
        const newKey = {};
        for (let p in key) {
          const keyValue = /** @type {TweenPropValue} */(key[p]);
          if (helpers.isKey(p)) {
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
    const totalDuration = /** @type {Number} */(values.setValue(parameters.duration, globals.globals.defaults.duration));
    const keys = Object.keys(keyframes)
    .map(key => { return {o: parseFloat(key) / 100, p: keyframes[key]} })
    .sort((a, b) => a.o - b.o);
    keys.forEach(key => {
      const offset = key.o;
      const prop = key.p;
      for (let name in prop) {
        if (helpers.isKey(name)) {
          let propArray = /** @type {Array} */(properties[name]);
          if (!propArray) propArray = properties[name] = [];
          const duration = offset * totalDuration;
          let length = propArray.length;
          let prevKey = propArray[length - 1];
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
      return key;
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
};

class JSAnimation extends timer.Timer {
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
    targets$1,
    parameters,
    parent,
    parentPosition,
    fastSet = false,
    index = 0,
    allTargets
  ) {

    super(/** @type {TimerParams & AnimationParams} */(parameters), parent, parentPosition);

    ++JSAnimationId;

    const parsedTargets = targets.registerTargets(targets$1);
    const targetsLength = parsedTargets.length;

    // If the parameters object contains a "keyframes" property, convert all the keyframes values to regular properties

    const kfParams = /** @type {AnimationParams} */(parameters).keyframes;
    const params = /** @type {AnimationParams} */(kfParams ? helpers.mergeObjects(generateKeyframes(/** @type {DurationKeyframes} */(kfParams), parameters), parameters) : parameters);

    const {
      id,
      delay,
      duration,
      ease,
      playbackEase,
      modifier,
      composition: composition$1,
      onRender,
    } = params;

    const animDefaults = parent ? parent.defaults : globals.globals.defaults;
    const animEase = values.setValue(ease, animDefaults.ease);
    const animPlaybackEase = values.setValue(playbackEase, animDefaults.playbackEase);
    const parsedAnimPlaybackEase = animPlaybackEase ? parser.parseEase(animPlaybackEase) : null;
    const hasSpring = !helpers.isUnd(/** @type {Spring} */(animEase).ease);
    const tEasing = hasSpring ? /** @type {Spring} */(animEase).ease : values.setValue(ease, parsedAnimPlaybackEase ? 'linear' : animDefaults.ease);
    const tDuration = hasSpring ? /** @type {Spring} */(animEase).settlingDuration : values.setValue(duration, animDefaults.duration);
    const tDelay = values.setValue(delay, animDefaults.delay);
    const tModifier = modifier || animDefaults.modifier;
    // If no composition is defined and the targets length is high (>= 1000) set the composition to 'none' (0) for faster tween creation
    const tComposition = helpers.isUnd(composition$1) && targetsLength >= consts.K ? consts.compositionTypes.none : !helpers.isUnd(composition$1) ? composition$1 : animDefaults.composition;
    // const absoluteOffsetTime = this._offset;
    const absoluteOffsetTime = this._offset + (parent ? parent._offset : 0);
    // This allows targeting the current animation in the spring onComplete callback
    if (hasSpring) /** @type {Spring} */(animEase).parent = this;

    let iterationDuration = NaN;
    let iterationDelay = NaN;
    let animationAnimationLength = 0;
    let shouldTriggerRender = 0;

    for (let targetIndex = 0; targetIndex < targetsLength; targetIndex++) {

      const target = parsedTargets[targetIndex];
      const ti = index || targetIndex;
      const tl = allTargets || parsedTargets;

      let lastTransformGroupIndex = NaN;
      let lastTransformGroupLength = NaN;

      for (let p in params) {

        if (helpers.isKey(p)) {

          const tweenType = values.getTweenType(target, p);

          const propName = styles.sanitizePropertyName(p, target, tweenType);

          let propValue = params[p];

          const isPropValueArray = helpers.isArr(propValue);

          if (fastSet && !isPropValueArray) {
            fastSetValuesArray[0] = propValue;
            fastSetValuesArray[1] = propValue;
            propValue = fastSetValuesArray;
          }

          // TODO: Allow nested keyframes inside ObjectValue value (prop: { to: [.5, 1, .75, 2, 3] })
          // Normalize property values to valid keyframe syntax:
          // [x, y] to [{to: [x, y]}] or {to: x} to [{to: x}] or keep keys syntax [{}, {}, {}...]
          // const keyframes = isArr(propValue) ? propValue.length === 2 && !isObj(propValue[0]) ? [{ to: propValue }] : propValue : [propValue];
          if (isPropValueArray) {
            const arrayLength = /** @type {Array} */(propValue).length;
            const isNotObjectValue = !helpers.isObj(propValue[0]);
            // Convert [x, y] to [{to: [x, y]}]
            if (arrayLength === 2 && isNotObjectValue) {
              keyObjectTarget.to = /** @type {TweenParamValue} */(/** @type {unknown} */(propValue));
              keyframesTargetArray[0] = keyObjectTarget;
              keyframes = keyframesTargetArray;
            // Convert [x, y, z] to [[x, y], z]
            } else if (arrayLength > 2 && isNotObjectValue) {
              keyframes = [];
              /** @type {Array.<Number>} */(propValue).forEach((v, i) => {
                if (!i) {
                  fastSetValuesArray[0] = v;
                } else if (i === 1) {
                  fastSetValuesArray[1] = v;
                  keyframes.push(fastSetValuesArray);
                } else {
                  keyframes.push(v);
                }
              });
            } else {
              keyframes = /** @type {Array.<TweenKeyValue>} */(propValue);
            }
          } else {
            keyframesTargetArray[0] = propValue;
            keyframes = keyframesTargetArray;
          }

          let siblings = null;
          let prevTween = null;
          let firstTweenChangeStartTime = NaN;
          let lastTweenChangeEndTime = 0;
          let tweenIndex = 0;

          for (let l = keyframes.length; tweenIndex < l; tweenIndex++) {

            const keyframe = keyframes[tweenIndex];

            if (helpers.isObj(keyframe)) {
              key = keyframe;
            } else {
              keyObjectTarget.to = /** @type {TweenParamValue} */(keyframe);
              key = keyObjectTarget;
            }

            toFunctionStore.func = null;
            fromFunctionStore.func = null;

            const computedComposition = values.getFunctionValue(values.setValue(key.composition, tComposition), target, ti, tl, null, null);
            const tweenComposition = helpers.isNum(computedComposition) ? computedComposition : consts.compositionTypes[computedComposition];
            if (!siblings && tweenComposition !== consts.compositionTypes.none) siblings = composition.getTweenSiblings(target, propName);
            // Timelines pass the last sibling tween if it belongs to the same timeline
            // Standalone animations only pass prevTween when the property has multiple keyframes
            const tailTween = siblings ? siblings._tail : null;
            const prevSiblingTween = parent && tailTween && tailTween.parent.parent === parent ? tailTween : prevTween;
            const computedToValue = values.getFunctionValue(key.to, target, ti, tl, toFunctionStore, prevSiblingTween);

            let tweenToValue;
            // Allows function based values to return an object syntax value ({to: v})
            if (helpers.isObj(computedToValue) && !helpers.isUnd(computedToValue.to)) {
              key = computedToValue;
              tweenToValue = computedToValue.to;
            } else {
              tweenToValue = computedToValue;
            }
            const tweenFromValue = values.getFunctionValue(key.from, target, ti, tl, null, prevSiblingTween);
            const easeToParse = key.ease || tEasing;

            const easeFunctionResult = values.getFunctionValue(easeToParse, target, ti, tl, null, prevSiblingTween);
            const keyEasing = helpers.isFnc(easeFunctionResult) || helpers.isStr(easeFunctionResult) ? easeFunctionResult : easeToParse;

            const hasSpring = !helpers.isUnd(keyEasing) && !helpers.isUnd(/** @type {Spring} */(keyEasing).ease);
            const tweenEasing = hasSpring ? /** @type {Spring} */(keyEasing).ease : keyEasing;
            // Calculate default individual keyframe duration by dividing the tl of keyframes
            const tweenDuration = hasSpring ? /** @type {Spring} */(keyEasing).settlingDuration : values.getFunctionValue(values.setValue(key.duration, (l > 1 ? values.getFunctionValue(tDuration, target, ti, tl, null, prevSiblingTween) / l : tDuration)), target, ti, tl, null, prevSiblingTween);
            // Default delay value should only be applied to the first tween
            const tweenDelay = values.getFunctionValue(values.setValue(key.delay, (!tweenIndex ? tDelay : 0)), target, ti, tl, null, prevSiblingTween);
            // Modifiers are treated differently and don't accept function based value to prevent having to pass a function wrapper
            const tweenModifier = key.modifier || tModifier;
            const hasFromvalue = !helpers.isUnd(tweenFromValue);
            const hasToValue = !helpers.isUnd(tweenToValue);
            const isFromToArray = helpers.isArr(tweenToValue);
            const isFromToValue = isFromToArray || (hasFromvalue && hasToValue);
            const tweenStartTime = prevTween ? lastTweenChangeEndTime + tweenDelay : tweenDelay;
            // Rounding is necessary here to minimize floating point errors when working in seconds
            const absoluteStartTime = helpers.round(absoluteOffsetTime + tweenStartTime, 12);

            // Force a onRender callback if the animation contains at least one from value and autoplay is set to false
            if (!shouldTriggerRender && (hasFromvalue || isFromToArray)) shouldTriggerRender = 1;

            let prevSibling = prevTween;

            if (tweenComposition !== consts.compositionTypes.none) {
              let nextSibling = siblings._head;
              // Iterate trough all the next siblings until we find a sibling with an equal or inferior start time
              while (nextSibling && !nextSibling._isOverridden && nextSibling._absoluteStartTime <= absoluteStartTime) {
                prevSibling = nextSibling;
                nextSibling = nextSibling._nextRep;
                // Overrides all the next siblings if the next sibling starts at the same time of after as the new tween start time
                if (nextSibling && nextSibling._absoluteStartTime >= absoluteStartTime) {
                  while (nextSibling) {
                    composition.overrideTween(nextSibling);
                    // This will ends both the current while loop and the upper one once all the next sibllings have been overriden
                    nextSibling = nextSibling._nextRep;
                  }
                }
              }
            }

            // Decompose values
            if (isFromToValue) {
              values.decomposeRawValue(isFromToArray ? values.getFunctionValue(tweenToValue[0], target, ti, tl, fromFunctionStore, prevSiblingTween) : tweenFromValue, fromTargetObject);
              values.decomposeRawValue(isFromToArray ? values.getFunctionValue(tweenToValue[1], target, ti, tl, toFunctionStore, prevSiblingTween) : tweenToValue, toTargetObject);
              // Needed to force an inline style registration
              const originalValue = values.getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore);
              if (fromTargetObject.t === consts.valueTypes.NUMBER) {
                if (prevSibling) {
                  if (prevSibling._valueType === consts.valueTypes.UNIT) {
                    fromTargetObject.t = consts.valueTypes.UNIT;
                    fromTargetObject.u = prevSibling._unit;
                  }
                } else {
                  values.decomposeRawValue(
                    originalValue,
                    values.decomposedOriginalValue
                  );
                  if (values.decomposedOriginalValue.t === consts.valueTypes.UNIT) {
                    fromTargetObject.t = consts.valueTypes.UNIT;
                    fromTargetObject.u = values.decomposedOriginalValue.u;
                  }
                }
              }
            } else {
              if (hasToValue) {
                values.decomposeRawValue(tweenToValue, toTargetObject);
              } else {
                if (prevTween) {
                  values.decomposeTweenValue(prevTween, toTargetObject);
                } else {
                  // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                  values.decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value :
                  values.getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore), toTargetObject);
                }
              }
              if (hasFromvalue) {
                values.decomposeRawValue(tweenFromValue, fromTargetObject);
              } else {
                if (prevTween) {
                  values.decomposeTweenValue(prevTween, fromTargetObject);
                } else {
                  values.decomposeRawValue(parent && prevSibling && prevSibling.parent.parent === parent ? prevSibling._value :
                  // No need to get and parse the original value if the tween is part of a timeline and has a previous sibling part of the same timeline
                  values.getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore), fromTargetObject);
                }
              }
            }

            // Apply operators
            if (fromTargetObject.o) {
              fromTargetObject.n = values.getRelativeValue(
                !prevSibling ? values.decomposeRawValue(
                  values.getOriginalAnimatableValue(target, propName, tweenType, inlineStylesStore),
                  values.decomposedOriginalValue
                ).n : prevSibling._toNumber,
                fromTargetObject.n,
                fromTargetObject.o
              );
            }

            if (toTargetObject.o) {
              toTargetObject.n = values.getRelativeValue(fromTargetObject.n, toTargetObject.n, toTargetObject.o);
            }

            // Values omogenisation in cases of type difference between "from" and "to"
            if (fromTargetObject.t !== toTargetObject.t) {
              if (fromTargetObject.t === consts.valueTypes.COMPLEX || toTargetObject.t === consts.valueTypes.COMPLEX) {
                const complexValue = fromTargetObject.t === consts.valueTypes.COMPLEX ? fromTargetObject : toTargetObject;
                const notComplexValue = fromTargetObject.t === consts.valueTypes.COMPLEX ? toTargetObject : fromTargetObject;
                notComplexValue.t = consts.valueTypes.COMPLEX;
                notComplexValue.s = helpers.cloneArray(complexValue.s);
                notComplexValue.d = complexValue.d.map(() => notComplexValue.n);
              } else if (fromTargetObject.t === consts.valueTypes.UNIT || toTargetObject.t === consts.valueTypes.UNIT) {
                const unitValue = fromTargetObject.t === consts.valueTypes.UNIT ? fromTargetObject : toTargetObject;
                const notUnitValue = fromTargetObject.t === consts.valueTypes.UNIT ? toTargetObject : fromTargetObject;
                notUnitValue.t = consts.valueTypes.UNIT;
                notUnitValue.u = unitValue.u;
              } else if (fromTargetObject.t === consts.valueTypes.COLOR || toTargetObject.t === consts.valueTypes.COLOR) {
                const colorValue = fromTargetObject.t === consts.valueTypes.COLOR ? fromTargetObject : toTargetObject;
                const notColorValue = fromTargetObject.t === consts.valueTypes.COLOR ? toTargetObject : fromTargetObject;
                notColorValue.t = consts.valueTypes.COLOR;
                notColorValue.s = colorValue.s;
                notColorValue.d = [0, 0, 0, 1];
              }
            }

            // Unit conversion
            if (fromTargetObject.u !== toTargetObject.u) {
              let valueToConvert = toTargetObject.u ? fromTargetObject : toTargetObject;
              valueToConvert = units.convertValueUnit(/** @type {DOMTarget} */(target), valueToConvert, toTargetObject.u ? toTargetObject.u : fromTargetObject.u, false);
              // TODO:
              // convertValueUnit(target, to.u ? from : to, to.u ? to.u : from.u);
            }

            // Fill in non existing complex values
            if (toTargetObject.d && fromTargetObject.d && (toTargetObject.d.length !== fromTargetObject.d.length)) {
              const longestValue = fromTargetObject.d.length > toTargetObject.d.length ? fromTargetObject : toTargetObject;
              const shortestValue = longestValue === fromTargetObject ? toTargetObject : fromTargetObject;
              // TODO: Check if n should be used instead of 0 for default complex values
              shortestValue.d = longestValue.d.map((/** @type {Number} */_, /** @type {Number} */i) => helpers.isUnd(shortestValue.d[i]) ? 0 : shortestValue.d[i]);
              shortestValue.s = helpers.cloneArray(longestValue.s);
            }

            // Tween factory

            // Rounding is necessary here to minimize floating point errors when working in seconds
            const tweenUpdateDuration = helpers.round(+tweenDuration || consts.minValue, 12);

            // Copy the value of the iniline style if it exist and imediatly nullify it to prevents false positive on other targets
            let inlineValue = inlineStylesStore[propName];
            if (!helpers.isNil(inlineValue)) inlineStylesStore[propName] = null;

            /** @type {Tween} */
            const tween = {
              parent: this,
              id: tweenId++,
              property: propName,
              target: target,
              _value: null,
              _toFunc: toFunctionStore.func,
              _fromFunc: fromFunctionStore.func,
              _ease: parser.parseEase(tweenEasing),
              _fromNumbers: helpers.cloneArray(fromTargetObject.d),
              _toNumbers: helpers.cloneArray(toTargetObject.d),
              _strings: helpers.cloneArray(toTargetObject.s),
              _fromNumber: fromTargetObject.n,
              _toNumber: toTargetObject.n,
              _numbers: helpers.cloneArray(fromTargetObject.d), // For additive tween and animatables
              _number: fromTargetObject.n, // For additive tween and animatables
              _unit: toTargetObject.u,
              _modifier: tweenModifier,
              _currentTime: 0,
              _startTime: tweenStartTime,
              _delay: +tweenDelay,
              _updateDuration: tweenUpdateDuration,
              _changeDuration: tweenUpdateDuration,
              _absoluteStartTime: absoluteStartTime,
              // NOTE: Investigate bit packing to stores ENUM / BOOL
              _tweenType: tweenType,
              _valueType: toTargetObject.t,
              _composition: tweenComposition,
              _isOverlapped: 0,
              _isOverridden: 0,
              _renderTransforms: 0,
              _inlineValue: inlineValue,
              _prevRep: null, // For replaced tween
              _nextRep: null, // For replaced tween
              _prevAdd: null, // For additive tween
              _nextAdd: null, // For additive tween
              _prev: null,
              _next: null,
            };

            if (tweenComposition !== consts.compositionTypes.none) {
              composition.composeTween(tween, siblings);
            }

            // Pre-compute the tween end value for function-based value chaining (ie morphTo / scrambleText in keyframe arrays and timelines)
            const vt = tween._valueType;
            if (vt === consts.valueTypes.COMPLEX) {
              tween._value = values.composeComplexValue(tween, 1, -1);
            } else if (vt === consts.valueTypes.COLOR) {
              tween._value = values.composeColorValue(tween, 1, -1);
            } else if (vt === consts.valueTypes.UNIT) {
              tween._value = `${tweenModifier(tween._toNumber)}${tween._unit}`;
            } else {
              tween._value = tweenModifier(tween._toNumber);
            }

            if (isNaN(firstTweenChangeStartTime)) {
              firstTweenChangeStartTime = tween._startTime;
            }
            // Rounding is necessary here to minimize floating point errors when working in seconds
            lastTweenChangeEndTime = helpers.round(tweenStartTime + tweenUpdateDuration, 12);
            prevTween = tween;
            animationAnimationLength++;

            helpers.addChild(this, tween);

          }

          // Update animation timings with the added tweens properties

          if (isNaN(iterationDelay) || firstTweenChangeStartTime < iterationDelay) {
            iterationDelay = firstTweenChangeStartTime;
          }

          if (isNaN(iterationDuration) || lastTweenChangeEndTime > iterationDuration) {
            iterationDuration = lastTweenChangeEndTime;
          }

          // TODO: Find a way to inline tween._renderTransforms = 1 here
          if (tweenType === consts.tweenTypes.TRANSFORM) {
            lastTransformGroupIndex = animationAnimationLength - tweenIndex;
            lastTransformGroupLength = animationAnimationLength;
          }

        }

      }

      // Set _renderTransforms to last transform property to correctly render the transforms list
      if (!isNaN(lastTransformGroupIndex)) {
        let i = 0;
        helpers.forEachChildren(this, (/** @type {Tween} */tween) => {
          if (i >= lastTransformGroupIndex && i < lastTransformGroupLength) {
            tween._renderTransforms = 1;
            if (tween._composition === consts.compositionTypes.blend) {
              helpers.forEachChildren(additive.additive.animation, (/** @type {Tween} */additiveTween) => {
                if (additiveTween.id === tween.id) {
                  additiveTween._renderTransforms = 1;
                }
              });
            }
          }
          i++;
        });
      }

    }

    if (!targetsLength) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }

    if (iterationDelay) {
      helpers.forEachChildren(this, (/** @type {Tween} */tween) => {
        // If (startTime - delay) equals 0, this means the tween is at the begining of the animation so we need to trim the delay too
        if (!(tween._startTime - tween._delay)) {
          tween._delay -= iterationDelay;
        }
        tween._startTime -= iterationDelay;
      });
      iterationDuration -= iterationDelay;
    } else {
      iterationDelay = 0;
    }

    // Prevents iterationDuration to be NaN if no valid animatable props have been provided
    // Prevents _iterationCount to be NaN if no valid animatable props have been provided
    if (!iterationDuration) {
      iterationDuration = consts.minValue;
      this.iterationCount = 0;
    }
    /** @type {TargetsArray} */
    this.targets = parsedTargets;
    /** @type {String|Number} */
    this.id = !helpers.isUnd(id) ? id : JSAnimationId;
    /** @type {Number} */
    this.duration = iterationDuration === consts.minValue ? consts.minValue : helpers.clampInfinity(((iterationDuration + this._loopDelay) * this.iterationCount) - this._loopDelay) || consts.minValue;
    /** @type {Callback<this>} */
    this.onRender = onRender || animDefaults.onRender;
    /** @type {EasingFunction} */
    this._ease = parsedAnimPlaybackEase;
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
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === helpers.normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    // NOTE: Find a better way to handle the stretch of an animation after stretch = 0
    helpers.forEachChildren(this, (/** @type {Tween} */tween) => {
      // Rounding is necessary here to minimize floating point errors
      tween._updateDuration = helpers.normalizeTime(tween._updateDuration * timeScale);
      tween._changeDuration = helpers.normalizeTime(tween._changeDuration * timeScale);
      tween._currentTime *= timeScale;
      tween._startTime *= timeScale;
      tween._absoluteStartTime *= timeScale;
    });
    return super.stretch(newDuration);
  }

  /**
   * @return {this}
   */
  refresh() {
    helpers.forEachChildren(this, (/** @type {Tween} */tween) => {
      const toFunc = tween._toFunc;
      const fromFunc = tween._fromFunc;
      if (toFunc || fromFunc) {
        if (fromFunc) {
          values.decomposeRawValue(fromFunc(), fromTargetObject);
          if (fromTargetObject.u !== tween._unit && tween.target[consts.isDomSymbol]) {
            units.convertValueUnit(/** @type {DOMTarget} */(tween.target), fromTargetObject, tween._unit, true);
          }
          tween._fromNumbers = helpers.cloneArray(fromTargetObject.d);
          tween._fromNumber = fromTargetObject.n;
        } else if (toFunc) {
          // When only toFunc exists, get from value from target
          values.decomposeRawValue(values.getOriginalAnimatableValue(tween.target, tween.property, tween._tweenType), values.decomposedOriginalValue);
          tween._fromNumbers = helpers.cloneArray(values.decomposedOriginalValue.d);
          tween._fromNumber = values.decomposedOriginalValue.n;
        }
        if (toFunc) {
          values.decomposeRawValue(toFunc(), toTargetObject);
          tween._toNumbers = helpers.cloneArray(toTargetObject.d);
          tween._strings = helpers.cloneArray(toTargetObject.s);
          // Make sure to apply relative operators https://github.com/juliangarnier/anime/issues/1025
          tween._toNumber = toTargetObject.o ? values.getRelativeValue(tween._fromNumber, toTargetObject.n, toTargetObject.o) : toTargetObject.n;
        }
      }
    });
    // This forces setter animations to render once
    if (this.duration === consts.minValue) this.restart();
    return this;
  }

  /**
   * Cancel the animation and revert all the values affected by this animation to their original state
   * @return {this}
   */
  revert() {
    super.revert();
    return styles.revertValues(this);
  }

  /**
   * @typedef {this & {then: null}} ResolvedJSAnimation
   */

  /**
   * @param  {Callback<ResolvedJSAnimation>} [callback]
   * @return Promise<this>
   */
  then(callback) {
    return super.then(callback);
  }

}

/**
 * @param {TargetsParam} targets
 * @param {AnimationParams} parameters
 * @return {JSAnimation}
 */
const animate = (targets, parameters) => {
  if (globals.globals.editor) {
    return globals.globals.editor.addAnimation(targets, parameters);
  } else {
    return new JSAnimation(targets, parameters, null, 0, false).init();
  }
};

exports.JSAnimation = JSAnimation;
exports.animate = animate;

/* #__PURE__ */

/* Private */

/** @typedef {import('./animation.js').JSAnimation} JSAnimation */
/** @typedef {import('./waapi.js').WAAPIAnimation} WAAPIAnimation */
/** @typedef {import('./timer.js').Timer} Timer */
/** @typedef {import('./timeline.js').Timeline} Timeline */
/** @typedef {import('./draggable.js').Draggable} Draggable */
/** @typedef {import('./scroll.js').ScrollObserver} ScrollObserver */
/** @typedef {import('./scope.js').Scope} Scope */
/** @typedef {import('./spring.js').Spring} Spring */

/* Exports */

/**
 * @typedef {Object} DefaultsParams
 * @property {Number|String} [id]
 * @property {PercentageKeyframes|DurationKeyframes} [keyframes]
 * @property {EasingParam} [playbackEase]
 * @property {Number} [playbackRate]
 * @property {Number} [frameRate]
 * @property {Number|Boolean} [loop]
 * @property {Boolean} [reversed]
 * @property {Boolean} [alternate]
 * @property {Boolean|ScrollObserver} [autoplay]
 * @property {Number|FunctionValue} [duration]
 * @property {Number|FunctionValue} [delay]
 * @property {Number} [loopDelay]
 * @property {EasingParam} [ease]
 * @property {'none'|'replace'|'blend'|import('./consts.js').compositionTypes} [composition]
 * @property {(v: any) => any} [modifier]
 * @property {(tickable: Tickable) => void} [onBegin]
 * @property {(tickable: Tickable) => void} [onBeforeUpdate]
 * @property {(tickable: Tickable) => void} [onUpdate]
 * @property {(tickable: Tickable) => void} [onLoop]
 * @property {(tickable: Tickable) => void} [onPause]
 * @property {(tickable: Tickable) => void} [onComplete]
 * @property {(renderable: Renderable) => void} [onRender]
 */

/** @typedef {JSAnimation|Timeline} Renderable */
/** @typedef {Timer|Renderable} Tickable */
/** @typedef {Timer&JSAnimation&Timeline} CallbackArgument */
/** @typedef {import('./animatable.js').Animatable|Tickable|Draggable|ScrollObserver|Scope} Revertible */

/**
 * @typedef {Object} DraggableAxisParam
 * @property {String} [mapTo]
 * @property {TweenModifier} [modifier]
 * @property {TweenComposition} [composition]
 * @property {Number|Array<Number>|((draggable: Draggable) => Number|Array<Number>)} [snap]
 */

/**
 * @typedef {Object} DraggableCursorParams
 * @property {String} [onHover]
 * @property {String} [onGrab]
 */

/**
 * @typedef {Object} DraggableParams
 * @property {DOMTargetSelector} [trigger]
 * @property {DOMTargetSelector|Array<Number>|((draggable: Draggable) => DOMTargetSelector|Array<Number>)} [container]
 * @property {Boolean|DraggableAxisParam} [x]
 * @property {Boolean|DraggableAxisParam} [y]
 * @property {TweenModifier} [modifier]
 * @property {Number|Array<Number>|((draggable: Draggable) => Number|Array<Number>)} [snap]
 * @property {Number|Array<Number>|((draggable: Draggable) => Number|Array<Number>)} [containerPadding]
 * @property {Number|((draggable: Draggable) => Number)} [containerFriction]
 * @property {Number|((draggable: Draggable) => Number)} [releaseContainerFriction]
 * @property {Number|((draggable: Draggable) => Number)} [dragSpeed]
 * @property {Number|((draggable: Draggable) => Number)} [scrollSpeed]
 * @property {Number|((draggable: Draggable) => Number)} [scrollThreshold]
 * @property {Number|((draggable: Draggable) => Number)} [minVelocity]
 * @property {Number|((draggable: Draggable) => Number)} [maxVelocity]
 * @property {Number|((draggable: Draggable) => Number)} [velocityMultiplier]
 * @property {Number} [releaseMass]
 * @property {Number} [releaseStiffness]
 * @property {Number} [releaseDamping]
 * @property {Boolean} [releaseDamping]
 * @property {EasingParam} [releaseEase]
 * @property {Boolean|DraggableCursorParams|((draggable: Draggable) => Boolean|DraggableCursorParams)} [cursor]
 * @property {Callback<Draggable>} [onGrab]
 * @property {Callback<Draggable>} [onDrag]
 * @property {Callback<Draggable>} [onRelease]
 * @property {Callback<Draggable>} [onUpdate]
 * @property {Callback<Draggable>} [onSettle]
 * @property {Callback<Draggable>} [onSnap]
 * @property {Callback<Draggable>} [onResize]
 * @property {Callback<Draggable>} [onAfterResize]
 */

/**
 * @typedef {SVGGeometryElement & {
*   setAttribute(name: 'draw', value: `${number} ${number}`): void;
*   draw: `${number} ${number}`;
* }} DrawableSVGGeometry
*/

/**
* @callback EasingFunction
* @param {Number} time
* @return {Number}
*/

/**
* @typedef {('linear'|'linear(x1, x2 25%, x3)'|'in'|'out'|'inOut'|'inQuad'|'outQuad'|'inOutQuad'|'inCubic'|'outCubic'|'inOutCubic'|'inQuart'|'outQuart'|'inOutQuart'|'inQuint'|'outQuint'|'inOutQuint'|'inSine'|'outSine'|'inOutSine'|'inCirc'|'outCirc'|'inOutCirc'|'inExpo'|'outExpo'|'inOutExpo'|'inBounce'|'outBounce'|'inOutBounce'|'inBack'|'outBack'|'inOutBack'|'inElastic'|'outElastic'|'inOutElastic'|'irregular'|'cubicBezier'|'steps'|'in(p = 1.675)'|'out(p = 1.675)'|'inOut(p = 1.675)'|'inBack(overshoot = 1.70158)'|'outBack(overshoot = 1.70158)'|'inOutBack(overshoot = 1.70158)'|'inElastic(amplitude = 1, period = .3)'|'outElastic(amplitude = 1, period = .3)'|'inOutElastic(amplitude = 1, period = .3)'|'irregular(length = 10, randomness = 1)'|'cubicBezier(x1, y1, x2, y2)'|'steps(steps = 10)')} EaseStringParamNames
*/

// A hack to get both ease names suggestions AND allow any strings
// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-460346421
/** @typedef {(String & {})|EaseStringParamNames|EasingFunction|Spring} EasingParam */

/** @typedef {HTMLElement|SVGElement} DOMTarget */
/** @typedef {Record<String, any>} JSTarget */
/** @typedef {DOMTarget|JSTarget} Target */
/** @typedef {Target|NodeList|String} TargetSelector */
/** @typedef {DOMTarget|NodeList|String} DOMTargetSelector */
/** @typedef {Array.<DOMTargetSelector>|DOMTargetSelector} DOMTargetsParam */
/** @typedef {Array.<DOMTarget>} DOMTargetsArray */
/** @typedef {Array.<JSTarget>|JSTarget} JSTargetsParam */
/** @typedef {Array.<JSTarget>} JSTargetsArray */
/** @typedef {Array.<TargetSelector>|TargetSelector} TargetsParam */
/** @typedef {Array.<Target>} TargetsArray */

/**
* @callback FunctionValue
* @param {Target} target - The animated target
* @param {Number} index - The target index
* @param {Number} length - The total number of animated targets
* @return {Number|String|TweenObjectValue|Array.<Number|String|TweenObjectValue>}
*/

/**
* @callback TweenModifier
* @param {Number} value - The animated value
* @return {Number|String}
*/

/** @typedef {[Number, Number, Number, Number]} ColorArray */

/**
* @template T
* @callback Callback
* @param {T} self - Returns itself
* @param {PointerEvent} [e]
* @return {*}
*/

/**
* @template {object} T
* @typedef {Object} TickableCallbacks
* @property {Callback<T>} [onBegin]
* @property {Callback<T>} [onBeforeUpdate]
* @property {Callback<T>} [onUpdate]
* @property {Callback<T>} [onLoop]
* @property {Callback<T>} [onPause]
* @property {Callback<T>} [onComplete]
*/

/**
* @template {object} T
* @typedef {Object} RenderableCallbacks
* @property {Callback<T>} [onRender]
*/

/**
* @typedef {Object} Tween
* @property {Number} id
* @property {JSAnimation} parent
* @property {String} property
* @property {Target} target
* @property {String|Number} _value
* @property {Function|null} _func
* @property {EasingFunction} _ease
* @property {Array.<Number>} _fromNumbers
* @property {Array.<Number>} _toNumbers
* @property {Array.<String>} _strings
* @property {Number} _fromNumber
* @property {Number} _toNumber
* @property {Array.<Number>} _numbers
* @property {Number} _number
* @property {String} _unit
* @property {TweenModifier} _modifier
* @property {Number} _currentTime
* @property {Number} _delay
* @property {Number} _updateDuration
* @property {Number} _startTime
* @property {Number} _changeDuration
* @property {Number} _absoluteStartTime
* @property {import('./consts.js').tweenTypes} _tweenType
* @property {import('./consts.js').valueTypes} _valueType
* @property {Number} _composition
* @property {Number} _isOverlapped
* @property {Number} _isOverridden
* @property {Number} _renderTransforms
* @property {Tween} _prevRep
* @property {Tween} _nextRep
* @property {Tween} _prevAdd
* @property {Tween} _nextAdd
* @property {Tween} _prev
* @property {Tween} _next
*/

/**
* @typedef TweenDecomposedValue
* @property {Number} t - Type
* @property {Number} n - Single number value
* @property {String} u - Value unit
* @property {String} o - Value operator
* @property {Array.<Number>} d - Array of Numbers (in case of complex value type)
* @property {Array.<String>} s - Strings (in case of complex value type)
*/

/** @typedef {{_head: null|Tween, _tail: null|Tween}} TweenPropertySiblings */
/** @typedef {Record<String, TweenPropertySiblings>} TweenLookups */
/** @typedef {WeakMap.<Target, TweenLookups>} TweenReplaceLookups */
/** @typedef {Map.<Target, TweenLookups>} TweenAdditiveLookups */

/**
* @typedef {Object} TimerOptions
* @property {Number|String} [id]
* @property {TweenParamValue} [duration]
* @property {TweenParamValue} [delay]
* @property {Number} [loopDelay]
* @property {Boolean} [reversed]
* @property {Boolean} [alternate]
* @property {Boolean|Number} [loop]
* @property {Boolean|ScrollObserver} [autoplay]
* @property {Number} [frameRate]
* @property {Number} [playbackRate]
*/

/**

/**
* @typedef {TimerOptions & TickableCallbacks<Timer>} TimerParams
*/

/**
* @typedef {Number|String|FunctionValue} TweenParamValue
*/

/**
* @typedef {TweenParamValue|[TweenParamValue, TweenParamValue]} TweenPropValue
*/

/**
* @typedef {(String & {})|'none'|'replace'|'blend'|import('./consts.js').compositionTypes} TweenComposition
*/

/**
* @typedef {Object} TweenParamsOptions
* @property {TweenParamValue} [duration]
* @property {TweenParamValue} [delay]
* @property {EasingParam} [ease]
* @property {TweenModifier} [modifier]
* @property {TweenComposition} [composition]
*/

/**
* @typedef {Object} TweenValues
* @property {TweenParamValue} [from]
* @property {TweenPropValue} [to]
* @property {TweenPropValue} [fromTo]
*/

/**
* @typedef {TweenParamsOptions & TweenValues} TweenKeyValue
*/

/**
* @typedef {Array.<TweenKeyValue|TweenPropValue>} ArraySyntaxValue
*/

/**
* @typedef {TweenParamValue|ArraySyntaxValue|TweenKeyValue} TweenOptions
*/

/**
* @typedef {Partial<{to: TweenParamValue|Array.<TweenParamValue>; from: TweenParamValue|Array.<TweenParamValue>; fromTo: TweenParamValue|Array.<TweenParamValue>;}>} TweenObjectValue
*/

/**
* @typedef {Object} PercentageKeyframeOptions
* @property {EasingParam} [ease]
*/

/**
* @typedef {Record<String, TweenParamValue>} PercentageKeyframeParams
*/

/**
* @typedef {Record<String, PercentageKeyframeParams & PercentageKeyframeOptions>} PercentageKeyframes
*/

/**
* @typedef {Array<Record<String, TweenOptions | TweenModifier | boolean> & TweenParamsOptions>} DurationKeyframes
*/

/**
* @typedef {Object} AnimationOptions
* @property {PercentageKeyframes|DurationKeyframes} [keyframes]
* @property {EasingParam} [playbackEase]
*/

// TODO: Currently setting TweenModifier to the intersected Record<> makes the FunctionValue type target param any if only one parameter is set
/**
* @typedef {Record<String, TweenOptions | Callback<JSAnimation> | TweenModifier | boolean | PercentageKeyframes | DurationKeyframes | ScrollObserver> & TimerOptions & AnimationOptions & TweenParamsOptions & TickableCallbacks<JSAnimation> & RenderableCallbacks<JSAnimation>} AnimationParams
*/

/**
* @typedef {Object} TimelineOptions
* @property {DefaultsParams} [defaults]
* @property {EasingParam} [playbackEase]
*/

/**
* @typedef {TimerOptions & TimelineOptions & TickableCallbacks<Timeline> & RenderableCallbacks<Timeline>} TimelineParams
*/

/**
* @callback AnimatablePropertySetter
* @param  {Number|Array.<Number>} to
* @param  {Number} [duration]
* @param  {EasingParam} [ease]
* @return {AnimatableObject}
*/

/**
* @callback AnimatablePropertyGetter
* @return {Number|Array.<Number>}
*/

/**
* @typedef {AnimatablePropertySetter & AnimatablePropertyGetter} AnimatableProperty
*/

/**
* @typedef {import('./animatable.js').Animatable & Record<String, AnimatableProperty>} AnimatableObject
*/

/**
* @typedef {Object} AnimatablePropertyParamsOptions
* @property {String} [unit]
* @property {TweenParamValue} [duration]
* @property {EasingParam} [ease]
* @property {TweenModifier} [modifier]
* @property {TweenComposition} [composition]
*/

/**
* @typedef {Record<String, TweenParamValue | EasingParam | TweenModifier | TweenComposition | AnimatablePropertyParamsOptions> & AnimatablePropertyParamsOptions} AnimatableParams
*/

/**
* @typedef {import('./waapi.js').WAAPIAnimationParams} WAAPIAnimationParams
* @export
*/

/** 
* @typedef {import('./timeline.js').TimePosition} TimePosition 
* @export
*/


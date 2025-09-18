// Needed to transform this file as an valid ESM module

export {}

// Private types

/**
 * @import { ScrollObserver } from '../events/scroll.js';
 * @import { JSAnimation } from '../animation/animation.js';
 * @import { Animatable } from '../animatable/animatable.js';
 * @import { Timeline } from '../timeline/timeline.js';
 * @import { Timer } from '../timer/timer.js';
 * @import { WAAPIAnimation } from '../waapi/waapi.js';
 * @import { Draggable } from '../draggable/draggable.js';
 * @import { TextSplitter } from '../text/split.js';
 * @import { Scope } from '../scope/scope.js';
 * @import { Spring } from '../spring/spring.js';
 * @import { compositionTypes, tweenTypes, valueTypes } from '../core/consts.js';
 */

// Exported types

// Global types

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
 * @property {String} [fill]
 * @property {Number} [loopDelay]
 * @property {EasingParam} [ease]
 * @property {'none'|'replace'|'blend'|compositionTypes} [composition]
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
/** @typedef {Animatable|Tickable|WAAPIAnimation|Draggable|ScrollObserver|TextSplitter|Scope} Revertible */

// Stagger types

/**
 * @template T
 * @callback StaggerFunction
 * @param {Target} [target]
 * @param {Number} [index]
 * @param {Number} [length]
 * @param {Timeline} [tl]
 * @return {T}
 */

/**
 * @typedef  {Object} StaggerParams
 * @property {Number|String} [start]
 * @property {Number|'first'|'center'|'last'|'random'} [from]
 * @property {Boolean} [reversed]
 * @property {Array.<Number>} [grid]
 * @property {('x'|'y')} [axis]
 * @property {String|((target: Target, i: Number, length: Number) => Number)} [use]
 * @property {Number} [total]
 * @property {EasingParam} [ease]
 * @property {TweenModifier} [modifier]
 */

// Targets types

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

// Eases types

/**
 * @callback EasingFunction
 * @param {Number} time
 * @return {Number}
 */

/**
 * @typedef {('linear'|'linear(x1, x2 25%, x3)'|'in'|'out'|'inOut'|'inQuad'|'outQuad'|'inOutQuad'|'inCubic'|'outCubic'|'inOutCubic'|'inQuart'|'outQuart'|'inOutQuart'|'inQuint'|'outQuint'|'inOutQuint'|'inSine'|'outSine'|'inOutSine'|'inCirc'|'outCirc'|'inOutCirc'|'inExpo'|'outExpo'|'inOutExpo'|'inBounce'|'outBounce'|'inOutBounce'|'inBack'|'outBack'|'inOutBack'|'inElastic'|'outElastic'|'inOutElastic'|'irregular'|'cubicBezier'|'steps'|'in(p = 1.675)'|'out(p = 1.675)'|'inOut(p = 1.675)'|'inBack(overshoot = 1.70158)'|'outBack(overshoot = 1.70158)'|'inOutBack(overshoot = 1.70158)'|'inElastic(amplitude = 1, period = .3)'|'outElastic(amplitude = 1, period = .3)'|'inOutElastic(amplitude = 1, period = .3)'|'irregular(length = 10, randomness = 1)'|'cubicBezier(x1, y1, x2, y2)'|'steps(steps = 10)')} EaseStringParamNames
 */

/**
 * @callback PowerEasing
 * @param {Number|String} [power=1.675]
 * @return {EasingFunction}
 */

/**
 * @callback BackEasing
 * @param {Number|String} [overshoot=1.70158]
 * @return {EasingFunction}
 */

/**
 * @callback ElasticEasing
 * @param {Number|String} [amplitude=1]
 * @param {Number|String} [period=.3]
 * @return {EasingFunction}
 */

/** @typedef {PowerEasing|BackEasing|ElasticEasing} EasingFunctionWithParams */

// A hack to get both ease names suggestions AND allow any strings
// https://github.com/microsoft/TypeScript/issues/29729#issuecomment-460346421
/** @typedef {(String & {})|EaseStringParamNames|EasingFunction|Spring} EasingParam */

// Spring types

/**
 * @typedef {Object} SpringParams
 * @property {Number} [mass=1] - Mass, default 1
 * @property {Number} [stiffness=100] - Stiffness, default 100
 * @property {Number} [damping=10] - Damping, default 10
 * @property {Number} [velocity=0] - Initial velocity, default 0
 */

 // Callback types

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

// Timer types

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
 * @typedef {TimerOptions & TickableCallbacks<Timer>} TimerParams
 */

// Tween types

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
 * @property {tweenTypes} _tweenType
 * @property {valueTypes} _valueType
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

// JSAnimation types

/**
 * @typedef {Number|String|FunctionValue} TweenParamValue
 */

/**
 * @typedef {TweenParamValue|[TweenParamValue, TweenParamValue]} TweenPropValue
 */

/**
 * @typedef {(String & {})|'none'|'replace'|'blend'|compositionTypes} TweenComposition
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

// Timeline types

/**
 * Accepts:<br>
 * - `Number` - Absolute position in milliseconds (e.g., `500` places element at exactly 500ms)<br>
 * - `'+=Number'` - Addition: Position element X ms after the last element (e.g., `'+=100'`)<br>
 * - `'-=Number'` - Subtraction: Position element X ms before the last element's end (e.g., `'-=100'`)<br>
 * - `'*=Number'` - Multiplier: Position element at a fraction of the total duration (e.g., `'*=.5'` for halfway)<br>
 * - `'<'` - Previous end: Position element at the end position of the previous element<br>
 * - `'<<'` - Previous start: Position element at the start position of the previous element<br>
 * - `'<<+=Number'` - Combined: Position element relative to previous element's start (e.g., `'<<+=250'`)<br>
 * - `'label'` - Label: Position element at a named label position (e.g., `'My Label'`)
 *
 * @typedef {Number|`+=${Number}`|`-=${Number}`|`*=${Number}`|'<'|'<<'|`<<+=${Number}`|`<<-=${Number}`|String} TimelinePosition
 */

/**
 * Accepts:<br>
 * - `Number` - Absolute position in milliseconds (e.g., `500` places animation at exactly 500ms)<br>
 * - `'+=Number'` - Addition: Position animation X ms after the last animation (e.g., `'+=100'`)<br>
 * - `'-=Number'` - Subtraction: Position animation X ms before the last animation's end (e.g., `'-=100'`)<br>
 * - `'*=Number'` - Multiplier: Position animation at a fraction of the total duration (e.g., `'*=.5'` for halfway)<br>
 * - `'<'` - Previous end: Position animation at the end position of the previous animation<br>
 * - `'<<'` - Previous start: Position animation at the start position of the previous animation<br>
 * - `'<<+=Number'` - Combined: Position animation relative to previous animation's start (e.g., `'<<+=250'`)<br>
 * - `'label'` - Label: Position animation at a named label position (e.g., `'My Label'`)<br>
 * - `stagger(String|Nummber)` - Stagger multi-elements animation positions (e.g., 10, 20, 30...)
 *
 * @typedef {TimelinePosition | StaggerFunction<Number|String>} TimelineAnimationPosition
 */

/**
 * @typedef {Object} TimelineOptions
 * @property {DefaultsParams} [defaults]
 * @property {EasingParam} [playbackEase]
 */

/**
 * @typedef {TimerOptions & TimelineOptions & TickableCallbacks<Timeline> & RenderableCallbacks<Timeline>} TimelineParams
 */

// WAAPIAnimation types

/**
 * @typedef {String|Number|Array<String>|Array<Number>} WAAPITweenValue
 */

/**
 * @callback WAAPIFunctionValue
 * @param {DOMTarget} target - The animated target
 * @param {Number} index - The target index
 * @param {Number} length - The total number of animated targets
 * @return {WAAPITweenValue}
 */

/**
 * @typedef {WAAPITweenValue|WAAPIFunctionValue|Array<String|Number|WAAPIFunctionValue>} WAAPIKeyframeValue
 */

/**
 * @typedef {(animation: WAAPIAnimation) => void} WAAPICallback
 */

/**
 * @typedef {Object} WAAPITweenOptions
 * @property {WAAPIKeyframeValue} [to]
 * @property {WAAPIKeyframeValue} [from]
 * @property {Number|WAAPIFunctionValue} [duration]
 * @property {Number|WAAPIFunctionValue} [delay]
 * @property {EasingParam} [ease]
 * @property {CompositeOperation} [composition]
 */

/**
 * @typedef {Object} WAAPIAnimationOptions
 * @property {Number|Boolean} [loop]
 * @property {Boolean} [Reversed]
 * @property {Boolean} [Alternate]
 * @property {Boolean|ScrollObserver} [autoplay]
 * @property {Number} [playbackRate]
 * @property {Number|WAAPIFunctionValue} [duration]
 * @property {Number|WAAPIFunctionValue} [delay]
 * @property {EasingParam} [ease]
 * @property {CompositeOperation} [composition]
 * @property {WAAPICallback} [onComplete]
 */

/**
 * @typedef {Record<String, WAAPIKeyframeValue | WAAPIAnimationOptions | Boolean | ScrollObserver | WAAPICallback | EasingParam | WAAPITweenOptions> & WAAPIAnimationOptions} WAAPIAnimationParams
 */

// Animatable types

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
 * @typedef {Animatable & Record<String, AnimatableProperty>} AnimatableObject
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

// Scope types

/**
 * @typedef {Object} ReactRef
 * @property {HTMLElement|SVGElement|null} [current]
 */

/**
 * @typedef {Object} AngularRef
 * @property {HTMLElement|SVGElement} [nativeElement]
 */

/**
 * @typedef {Object} ScopeParams
 * @property {DOMTargetSelector|ReactRef|AngularRef} [root]
 * @property {DefaultsParams} [defaults]
 * @property {Record<String, String>} [mediaQueries]
 */

/**
 * @template T
 * @callback ScopedCallback
 * @param {Scope} scope
 * @return {T}
 */

/**
 * @callback ScopeCleanupCallback
 * @param {Scope} [scope]
 */

/**
 * @callback ScopeConstructorCallback
 * @param {Scope} [scope]
 * @return {ScopeCleanupCallback|void}
 */

/**
 * @callback ScopeMethod
 * @param {...*} args
 * @return {ScopeCleanupCallback|void}
 */

// Scroll types

/**
 * @typedef {String|Number} ScrollThresholdValue
 */

/**
 * @typedef {Object} ScrollThresholdParam
 * @property {ScrollThresholdValue} [target]
 * @property {ScrollThresholdValue} [container]
 */

/**
 * @callback ScrollObserverAxisCallback
 * @param {ScrollObserver} self
 * @return {'x'|'y'}
 */

/**
 * @callback ScrollThresholdCallback
 * @param {ScrollObserver} self
 * @return {ScrollThresholdValue|ScrollThresholdParam}
 */

/**
 * @typedef {Object} ScrollObserverParams
 * @property {Number|String} [id]
 * @property {Boolean|Number|String|EasingParam} [sync]
 * @property {TargetsParam} [container]
 * @property {TargetsParam} [target]
 * @property {'x'|'y'|ScrollObserverAxisCallback|((observer: ScrollObserver) => 'x'|'y'|ScrollObserverAxisCallback)} [axis]
 * @property {ScrollThresholdValue|ScrollThresholdParam|ScrollThresholdCallback|((observer: ScrollObserver) => ScrollThresholdValue|ScrollThresholdParam|ScrollThresholdCallback)} [enter]
 * @property {ScrollThresholdValue|ScrollThresholdParam|ScrollThresholdCallback|((observer: ScrollObserver) => ScrollThresholdValue|ScrollThresholdParam|ScrollThresholdCallback)} [leave]
 * @property {Boolean|((observer: ScrollObserver) => Boolean)} [repeat]
 * @property {Boolean} [debug]
 * @property {Callback<ScrollObserver>} [onEnter]
 * @property {Callback<ScrollObserver>} [onLeave]
 * @property {Callback<ScrollObserver>} [onEnterForward]
 * @property {Callback<ScrollObserver>} [onLeaveForward]
 * @property {Callback<ScrollObserver>} [onEnterBackward]
 * @property {Callback<ScrollObserver>} [onLeaveBackward]
 * @property {Callback<ScrollObserver>} [onUpdate]
 * @property {Callback<ScrollObserver>} [onSyncComplete]
 */

// Draggable types

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

// Text types

/**
 * @typedef {Object} SplitTemplateParams
 * @property {false|String} [class]
 * @property {Boolean|'hidden'|'clip'|'visible'|'scroll'|'auto'} [wrap]
 * @property {Boolean|'top'|'right'|'bottom'|'left'|'center'} [clone]
 */

/**
 * @typedef {Boolean|String} SplitValue
 */

/**
 * @callback SplitFunctionValue
 * @param {Node|HTMLElement} [value]
 * @return String
 */

/**
 * @typedef {Object} TextSplitterParams
 * @property {SplitValue|SplitTemplateParams|SplitFunctionValue} [lines]
 * @property {SplitValue|SplitTemplateParams|SplitFunctionValue} [words]
 * @property {SplitValue|SplitTemplateParams|SplitFunctionValue} [chars]
 * @property {Boolean} [accessible]
 * @property {Boolean} [includeSpaces]
 * @property {Boolean} [debug]
 */

// SVG types

/**
 * @typedef {SVGGeometryElement & {
 *   setAttribute(name: 'draw', value: `${number} ${number}`): void;
 *   draw: `${number} ${number}`;
 * }} DrawableSVGGeometry
 */

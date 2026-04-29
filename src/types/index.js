// Needed to transform this file into a valid ESM module

export {}

// Private types

/**
 * @import { TweakRegister } from 'tweaks';
 * @import { ScrollObserver } from '../events/scroll.js';
 * @import { JSAnimation } from '../animation/animation.js';
 * @import { Animatable } from '../animatable/animatable.js';
 * @import { Timeline } from '../timeline/timeline.js';
 * @import { Timer } from '../timer/timer.js';
 * @import { WAAPIAnimation } from '../waapi/waapi.js';
 * @import { Draggable } from '../draggable/draggable.js';
 * @import { TextSplitter } from '../text/split.js';
 * @import { Scope } from '../scope/scope.js';
 * @import { AutoLayout } from '../layout/layout.js';
 * @import { Spring } from '../easings/spring/index.js';
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
 * @property {Boolean} [persist]
 * @property {Boolean|ScrollObserver} [autoplay]
 * @property {Number|FunctionValue} [duration]
 * @property {Number|FunctionValue} [delay]
 * @property {Number} [loopDelay]
 * @property {EasingParam|FunctionValue} [ease]
 * @property {'none'|'replace'|'blend'|compositionTypes} [composition]
 * @property {(v: any) => any} [modifier]
 * @property {Callback<Tickable>} [onBegin]
 * @property {Callback<Tickable>} [onBeforeUpdate]
 * @property {Callback<Tickable>} [onUpdate]
 * @property {Callback<Tickable>} [onLoop]
 * @property {Callback<Tickable>} [onPause]
 * @property {Callback<Tickable>} [onComplete]
 * @property {Callback<Renderable>} [onRender]
 */

/** @typedef {JSAnimation|Timeline} Renderable */
/** @typedef {Timer|Renderable} Tickable */
/** @typedef {Timer&JSAnimation&Timeline} CallbackArgument */
/** @typedef {Animatable|Tickable|WAAPIAnimation|Draggable|ScrollObserver|TextSplitter|Scope|AutoLayout} Revertible */

// Stagger types

/**
 * @template T
 * @callback StaggerFunction
 * @param {Target} [target]
 * @param {Number} [index]
 * @param {TargetsArray} [targets]
 * @param {Tween|null} [prevTween]
 * @param {Timeline} [tl]
 * @return {T}
 */

/**
 * @typedef  {Object} StaggerParams
 * @property {Number|String} [start]
 * @property {Number|'first'|'center'|'last'|'random'|Array.<Number>} [from]
 * @property {Boolean} [reversed]
 * @property {Array.<Number>|Boolean} [grid]
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
 * @typedef {('linear'|'none'|'in'|'out'|'inOut'|'inQuad'|'outQuad'|'inOutQuad'|'inCubic'|'outCubic'|'inOutCubic'|'inQuart'|'outQuart'|'inOutQuart'|'inQuint'|'outQuint'|'inOutQuint'|'inSine'|'outSine'|'inOutSine'|'inCirc'|'outCirc'|'inOutCirc'|'inExpo'|'outExpo'|'inOutExpo'|'inBounce'|'outBounce'|'inOutBounce'|'inBack'|'outBack'|'inOutBack'|'inElastic'|'outElastic'|'inOutElastic'|'out(p = 1.675)'|'inOut(p = 1.675)'|'inBack(overshoot = 1.7)'|'outBack(overshoot = 1.7)'|'inOutBack(overshoot = 1.7)'|'inElastic(amplitude = 1, period = .3)'|'outElastic(amplitude = 1, period = .3)'|'inOutElastic(amplitude = 1, period = .3)')} EaseStringParamNames
 */

/**
 * @typedef {('ease'|'ease-in'|'ease-out'|'ease-in-out'|'linear(0, 0.25, 1)'|'steps'|'steps(6, start)'|'step-start'|'step-end'|'cubic-bezier(0.42, 0, 1, 1)') } WAAPIEaseStringParamNames
 */

/**
 * @callback PowerEasing
 * @param {Number|String} [power=1.675]
 * @return {EasingFunction}
 */

/**
 * @callback BackEasing
 * @param {Number|String} [overshoot=1.7]
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
/** @typedef {(String & {})|EaseStringParamNames|EasingFunction|Spring|TweakRegister} EasingParam */
/** @typedef {(String & {})|EaseStringParamNames|WAAPIEaseStringParamNames|EasingFunction|Spring|TweakRegister} WAAPIEasingParam */

// Spring types

/**
 * @typedef {Object} SpringParams
 * @property {Number} [mass=1] - Mass, default 1
 * @property {Number} [stiffness=100] - Stiffness, default 100
 * @property {Number} [damping=10] - Damping, default 10
 * @property {Number} [velocity=0] - Initial velocity, default 0
 * @property {Number} [bounce=0] - Initial bounce, default 0
 * @property {Number} [duration=0] - The perceived duration, default 0
 * @property {Callback<JSAnimation>} [onComplete] - Callback function called when the spring currentTime hits the perceived duration
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
 * @property {Number} [priority]
 */

/**
 * @typedef {TimerOptions & TickableCallbacks<Timer>} TimerParams
 */

// Tween types

/**
 * @callback FunctionValue
 * @param {Target} [target] - The animated target
 * @param {Number} [index] - The target index
 * @param {TargetsArray} [targets] - The array of all animated targets
 * @param {Tween|null} [prevTween] - The previous sibling tween for the same target and property
 * @return {Number|String|TweenObjectValue|EasingParam|Array.<Number|String|TweenObjectValue>}
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
 * @property {Function|null} _toFunc
 * @property {Function|null} _fromFunc
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
 * @property {String} _inlineValue
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
 * @typedef {Number|String|FunctionValue|EasingParam} TweenParamValue
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
 * @property {EasingParam|FunctionValue} [ease]
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
 * @typedef {TimelinePosition | StaggerFunction<Number|String> | TweakRegister} TimelineAnimationPosition
 */

/**
 * @typedef {Object} TimelineOptions
 * @property {DefaultsParams} [defaults]
 * @property {EasingParam} [playbackEase]
 * @property {Boolean} [composition]
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
 * @param {DOMTargetsArray} targets - The array of all animated targets
 * @return {WAAPITweenValue|WAAPIEasingParam}
 */

/**
 * @typedef {WAAPITweenValue|WAAPIFunctionValue|Array<String|Number|WAAPIFunctionValue>} WAAPIKeyframeValue
 */

/**
 * @typedef {Object} WAAPITweenOptions
 * @property {WAAPIKeyframeValue} [to]
 * @property {WAAPIKeyframeValue} [from]
 * @property {Number|WAAPIFunctionValue} [duration]
 * @property {Number|WAAPIFunctionValue} [delay]
 * @property {WAAPIEasingParam} [ease]
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
 * @property {WAAPIEasingParam|WAAPIFunctionValue} [ease]
 * @property {CompositeOperation} [composition]
 * @property {Boolean} [persist]
 * @property {Callback<WAAPIAnimation>} [onComplete]
 */

/**
 * @typedef {Record<String, WAAPIKeyframeValue | WAAPIAnimationOptions | Boolean | ScrollObserver | Callback<WAAPIAnimation> | WAAPIEasingParam | WAAPITweenOptions> & WAAPIAnimationOptions} WAAPIAnimationParams
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
 * @property {Callback<ScrollObserver>} [onResize]
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
 * @typedef {Object} DraggableDragThresholdParams
 * @property {Number} [mouse]
 * @property {Number} [touch]
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
 * @property {Number|DraggableDragThresholdParams|((draggable: Draggable) => Number|DraggableDragThresholdParams)} [dragThreshold]
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

/**
 * @typedef {Object} ScrambleTextParams
 * @property {String|function(Target, Number, TargetsArray): String} [text] - the text to transition to, otherwise uses the original text
 * @property {String|function(Target, Number, TargetsArray): String} [chars] - the characters used for scramble; named sets: 'lowercase', 'uppercase', 'numbers', 'symbols', 'braille', 'blocks', 'shades'; range syntax: 'A-Z', 'a-z0-9'; defaults to 'a-zA-Z0-9!%#_'
 * @property {EasingParam} [ease] - the easing applied to the scramble animation
 * @property {Number|'left'|'center'|'right'|'random'|'auto'} [from] - where the reveal wave starts from, 'auto' (default) uses 'left' when text grows and 'right' when it shrinks
 * @property {Boolean} [reversed] - reverses the reveal order, so 'center' reveals from edges inward instead of center outward
 * @property {Boolean|Number|String} [cursor] - characters displayed at the leading edge of the reveal wave; true uses '_', a number is a char code, a string is used directly
 * @property {Number} [perturbation] - adds random timing offsets to each character's start and end, creating a more organic reveal
 * @property {Number} [seed] - a seed for the random number generator to produce reproducible scramble sequences
 * @property {Boolean|String} [override] - controls the starting appearance: false shows original text, true scrambles it (default), '' starts from blank, ' ' replaces characters with spaces, a custom string (supports range syntax like 'A-Z') uses its characters as scramble set
 * @property {Number} [revealRate] - characters per second entering the active zone; higher values make the reveal wave move faster (default: 60)
 * @property {Number} [settleDuration] - time in ms each character spends scrambling before settling into its final glyph (default: 300)
 * @property {Number} [settleRate] - how many times per second scramble characters cycle in the active zone (default: 30)
 * @property {Number|function(Target, Number, TargetsArray): Number} [duration] - if set to a value greater than 0, overrides the computed duration from interval and settle; if unset or 0, duration is calculated automatically from text length and timing parameters
 * @property {Number|function(Target, Number, TargetsArray): Number} [revealDelay] - delay in ms before the reveal wave starts within the scramble animation
 * @property {Number|function(Target, Number, TargetsArray): Number} [delay] - delay in ms before the entire scramble animation starts
 * @property {function(String, Number): void} [onChange] - callback fired each time a character changes during scramble; receives the current scrambled text and the eased progress (0-1)
 */

// SVG types

/**
 * @typedef {SVGGeometryElement & {
 *   setAttribute(name: 'draw', value: `${number} ${number}`): void;
 *   draw: `${number} ${number}`;
 * }} DrawableSVGGeometry
 */

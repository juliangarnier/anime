/**
 * Anime.js - ESM bundle
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

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
 * @property {Boolean} [muted]
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

/**
 * @typedef {Object} TweakRegister
 * @property {String} type
 * @property {*} defaultValue
 */

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
 * @property {('x'|'y'|'z')} [axis]
 * @property {String | { method(target: Target, i: Number, length: Number): Number }['method']} [use]
 * @property {Number} [total]
 * @property {EasingParam} [ease]
 * @property {TweenModifier} [modifier]
 * @property {Number|[Number, Number]} [jitter] Random offset added to each staggered value, a pair ramps the offset from the first to the last value
 * @property {Boolean|Number} [seed] Seed of the random draws of jitter and from random, true seeds with 0 and false uses Math.random
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
 * @property {Callback<JSAnimation, Spring>} [onComplete] - Callback function called when the spring currentTime hits the perceived duration
 */

 // Callback types

// Type self and this apart, a callback can receive an animation and bind this to another object or to nothing.
/**
 * @template T
 * @template [This=T]
 * @typedef {{ method(this: This, self: T): * }['method']} Callback
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
 * @property {Boolean} [muted]
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
 * @typedef {Number|String|TweenKeyValue|EasingParam|Array.<Number|String|TweenKeyValue>} FunctionValueReturn
 */

/**
 * @template [T=FunctionValueReturn]
 * @callback FunctionValue
 * @param {Target} [target] - The animated target
 * @param {Number} [index] - The target index
 * @param {TargetsArray} [targets] - The array of all animated targets
 * @param {Tween|null} [prevTween] - The previous sibling tween for the same target and property
 * @return {T}
 */

/**
 * @callback TweenModifier
 * @param {Number} value - The animated value
 * @return {Number|String}
 */

/** @typedef {[Number, Number, Number, Number]} ColorArray */

/**
 * @typedef {Object} Tween
 * @property {JSAnimation} parent
 * @property {String} property
 * @property {Target} target
 * @property {String|Number|Object} _value
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
 * @property {Number} _updateDuration
 * @property {Number} _startTime
 * @property {Number} _changeDuration
 * @property {tweenTypes} _tweenType
 * @property {((target: Target, value: Number, tween: Tween) => void) | null} _setter
 * @property {valueTypes} _valueType
 * @property {Number} _composition
 * @property {Number} _isOverridden
 * @property {Number} _keyStart
 * @property {Number} _keyEnd
 * @property {Tween} _prevSibling
 * @property {String|Number|null|undefined|Symbol} _inlineValue
 * @property {Tween} _prev
 * @property {Tween} _next
 */

/**
 * @typedef TweenDecomposedValue
 * @property {Number} t - Type
 * @property {Number} n - Single number value
 * @property {String} u - Value unit
 * @property {String} o - Value operator
 * @property {Array.<Number>} d - Array of Numbers (complex / color value type)
 * @property {Array.<String>} s - Strings (complex value type)
 */

/**
 * @typedef {{
 *   [property: string]: Tween,
 *   [owner: symbol]: Target,
 * }} TweenLookups
 */

// JSAnimation types

/**
 * @typedef {Number|String|FunctionValue|EasingParam|TweakRegister} TweenParamValue
 */

/**
 * @typedef {TweenParamValue|[TweenParamValue, TweenParamValue]} TweenPropValue
 */

/**
 * @typedef {(String & {})|'none'|'replace'|'blend'|compositionTypes} TweenComposition
 */

/**
 * @typedef {Object} TweenParamsOptions
 * @property {Boolean} [muted]
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
 * @typedef {Record<String, TweenParamValue | EasingParam | TweenModifier | TweenComposition | AnimatablePropertyParamsOptions | Callback<JSAnimation>> & AnimatablePropertyParamsOptions & TickableCallbacks<JSAnimation> & RenderableCallbacks<JSAnimation>} AnimatableParams
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
 * @return {*}
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

/**
 * Identity of one timeline call or sync statement.
 * @typedef {Object} TimelineMarkerParams
 * @property {String|Number} [id]
 * @property {Boolean} [muted]
 */

/**
 * @template {Timer} [T=Timer]
 * @typedef {TimelineMarkerParams & {
 *   callback: Callback<T, void>
 * }} TimelineCallParams
 */

/** @typedef {Omit<Tickable, 'then'>|Omit<WAAPIAnimation, 'then'>|globalThis.Animation} TimelineSyncTarget */

/**
 * @typedef {TimelineMarkerParams & {
 *   target: TimelineSyncTarget|Array<TimelineSyncTarget>
 * }} TimelineSyncParams
 */


// Environments

// TODO: Do we need to check if we're running inside a worker ?
const isBrowser = typeof window !== 'undefined';

/** @typedef {Window & {AnimeJS: Array}|null} AnimeJSWindow

/** @type {AnimeJSWindow} */
const win = isBrowser ? /** @type {AnimeJSWindow} */(/** @type {unknown} */(window)) : null;

/** @type {Document|null} */
const doc = isBrowser ? document : null;

// Enums

/** @enum {Number} */
const tweenTypes = {
  OBJECT: 0,
  ATTRIBUTE: 1,
  CSS: 2,
  TRANSFORM: 3,
  CSS_VAR: 4,
};

/** @enum {Number} */
const valueTypes = {
  NUMBER: 0,
  UNIT: 1,
  COLOR: 2,
  COMPLEX: 3,
};

/** @enum {Number} */
const tickModes = {
  NONE: 0,
  AUTO: 1,
  FORCE: 2,
};

/** @enum {Number} */
const overrideTypes = {
  NONE: 0,
  // A timeline child that waits for its property or has given it to a later child
  TIMELINE: 1,
  // Replaced for good by a later animation, or muted
  PERMANENT: 2,
};

/** @enum {Number} */
const compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2,
  // Mark a muted tween, it joins no sibling list and render skips it through _isOverridden.
  // Keep the mute check out of render, which runs on every frame.
  muted: 3,
};

// Map the public composition names so a minifier can inline every read of compositionTypes.
const compositionNames = {
  replace: compositionTypes.replace,
  none: compositionTypes.none,
  blend: compositionTypes.blend,
};

// Cache symbols

const isDomSymbol = Symbol();
const isSvgSymbol = Symbol();
const transformsSymbol = Symbol();
const proxyTargetSymbol = Symbol();
// Hold the replace sibling lookups of a registered target, its presence marks the registration.
// A module WeakMap made setup slower and doubled render time after a hidden tab load.
const replaceLookupsSymbol = Symbol();
// Hold the owner of a lookups object so a copy or proxy that carries it keeps its own apart.
const lookupsOwnerSymbol = Symbol();
// Mark a tween that read no original value so revert leaves its property to the sibling that did.
const noOriginalValueSymbol = Symbol();

// Numbers

const minValue = 1e-11;
const maxValue = 1e12;
const K = 1e3;
const maxFps = 240;

// Strings

const emptyString = '';
const cssVarPrefix = 'var(';

// Arrays

// Share one empty array for tween slots without array data, never mutate it.
// COMPLEX and COLOR tweens replace the slot before they write.
const emptyArray = [];

const shortTransforms = /*#__PURE__*/ new Map([['x', 'translateX'], ['y', 'translateY'], ['z', 'translateZ']]);

const validTransforms = [
  'perspective',
  'translateX',
  'translateY',
  'translateZ',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skew',
  'skewX',
  'skewY',
];

const transformsFragmentStrings = /*#__PURE__*/ validTransforms.reduce((a, v) => ({...a, [v]: v + '('}), {});

// Functions

/** @return {void} */
const noop = () => {};

/**
 * @template T
 * @param  {T} v
 * @return {T}
 */
const noopModifier = v => v;

// Regex

const validRgbHslRgx = /\)\s*[-.\d]/;
const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
// Match the first three to five tokens of a color function, split on spaces, commas or a slash.
const colorFunctionExecRgx = /\(\s*([^\s,/]+)[\s,]+([^\s,/]+)[\s,]+([^\s,/)]+)(?:[\s,/]+([^\s,/)]+))?(?:[\s,/]+([^\s,/)]+))?/;
// export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
// export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i;
const unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
const lowerCaseRgx = /([a-z])([A-Z])/g;
const relativeValuesExecRgx = /(\*=|\+=|-=)/;
const cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;



/**
 * @typedef {Object} EditorGlobals
 * @property {Function} addAnimation
 * @property {Function|null} addSet
 * @property {Function} addTimeline
 * @property {Function} addTimelineChild
 * @property {Function} addTimelineLabel
 * @property {Function} addTimelineCall
 * @property {Function} addTimelineSync
 * @property {Function|null} addTimelineTimer
 * @property {Function} addLayout
 * @property {Function} addLayoutTransition
 * @property {Function} createTweak
 */

/** @type {DefaultsParams} */
const defaults = {
  id: null,
  keyframes: null,
  playbackEase: null,
  playbackRate: 1,
  frameRate: maxFps,
  loop: 0,
  reversed: false,
  alternate: false,
  autoplay: true,
  muted: false,
  persist: false,
  duration: K,
  delay: 0,
  loopDelay: 0,
  ease: 'out(2)',
  composition: compositionTypes.replace,
  modifier: noopModifier,
  onBegin: noop,
  onBeforeUpdate: noop,
  onUpdate: noop,
  onLoop: noop,
  onPause: noop,
  onComplete: noop,
  onRender: noop,
};

const scope = {
  /** @type {Scope} */
  current: null,
  /** @type {Document|DOMTarget} */
  root: doc,
};

const globals = {
  /** @type {DefaultsParams} */
  defaults,
  /** @type {Number} */
  precision: 4,
  /** @type {Number} equals 1 in ms mode, 0.001 in s mode */
  timeScale: 1,
  /** @type {Number} */
  tickThreshold: 200,
  /** @type {EditorGlobals|null} */
  editor: null,
};

/**
 * Wraps a factory so the editor can turn its result into an editable tweak when one is active, and
 * returns the result untouched otherwise. Used by the eases registry, stagger and random.
 *
 * @param {String} type The tweak type, for example Ease or Stagger.
 * @param {String} name The registry key the editor serializes back to a call.
 * @param {Function} fn The factory whose result is the live anime value.
 * @return {Function} A function with the same call signature as fn.
 */
const makeTweakable = (type, name, fn) => function() {
  const result = fn.apply(null, arguments);
  const editor = globals.editor;
  // Build the args array only for the editor, the no editor path stays allocation free.
  return editor ? editor.createTweak(result, type, name, Array.prototype.slice.call(arguments)) : result;
};

// The build writes the package version in place of the placeholder, the type stays a string.
/** @type {string} */
const version = '5.0.0-beta.3';

const globalVersions = { version, engine: null };

if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push(globalVersions);
}



// Strings

/**
 * @param  {String} str
 * @return {String}
 */
const toLowerCase = str => str.replace(lowerCaseRgx, '$1-$2').toLowerCase();

/**
 * Prioritize this method instead of regex when possible
 * @param  {String} str
 * @param  {String} sub
 * @return {Boolean}
 */
const stringStartsWith = (str, sub) => str.indexOf(sub) === 0;

// Note: Date.now is used instead of performance.now since it is precise enough for timings calculations, performs slightly faster and works in Node.js environement.
const now = Date.now;

// Types checkers

const isArr = Array.isArray;
/**@param {any} a @return {a is Record<String, any>} */
const isObj = a => a && a.constructor === Object;
/**@param {any} a @return {a is Number} */
const isNum = a => typeof a === 'number' && !isNaN(a);
/**@param {any} a @return {a is String} */
const isStr = a => typeof a === 'string';
/**@param {any} a @return {a is Function} */
const isFnc = a => typeof a === 'function';
/**@param {any} a @return {a is undefined} */
const isUnd = a => typeof a === 'undefined';
/**@param {any} a @return {a is null | undefined} */
const isNil = a => a == null;
/**@param {any} a @return {a is SVGElement} */
const isSvg = a => isBrowser && a instanceof SVGElement;
/**@param {any} a @return {Boolean} */
const isHex = a => hexTestRgx.test(a);
/**@param {any} a @return {Boolean} */
const isRgb = a => stringStartsWith(a, 'rgb');
/**@param {any} a @return {Boolean} */
const isHsl = a => stringStartsWith(a, 'hsl');
/**@param {any} a @return {Boolean} */
const isOklab = a => stringStartsWith(a, 'oklab(');
/**@param {any} a @return {Boolean} */
const isOklch = a => stringStartsWith(a, 'oklch(');
/**@param {any} a @return {Boolean} */
const isColorFn = a => stringStartsWith(a, 'color(');
/**@param {any} a @return {Boolean} */ // Make sure boxShadow syntax like 'rgb(255, 0, 0) 0px 0px 6px 0px' is not a valid color type
const isCol = a => isHex(a) || ((isRgb(a) || isHsl(a) || isOklab(a) || isOklch(a) || isColorFn(a)) && (a[a.length - 1] === ')' || !validRgbHslRgx.test(a)));
/**@param {any} a @return {Boolean} */
const isKey = a => !globals.defaults.hasOwnProperty(a);

// SVG

// Consider the following as CSS animation
// CSS opacity animation has better default values (opacity: 1 instead of 0))
// rotate is more commonly intended to be used as a transform
const svgCssReservedProperties = ['opacity', 'rotate', 'overflow', 'color'];

/**
 * @param  {Target} el
 * @param  {String} propertyName
 * @return {Boolean}
 */
const isValidSVGAttribute = (el, propertyName) => {
  if (svgCssReservedProperties.includes(propertyName)) return false;
  if (el.getAttribute(propertyName) || propertyName in el) {
    if (propertyName === 'scale') { // Scale
      const elParentNode = /** @type {SVGGeometryElement} */(/** @type {DOMTarget} */(el).parentNode);
      // Only consider scale as a valid SVG attribute on filter element
      return elParentNode && elParentNode.tagName === 'filter';
    }
    return true;
  }
};

// Number

/**
 * @param  {Number|String} str
 * @return {Number}
 */
const parseNumber = str => isStr(str) ?
  parseFloat(/** @type {String} */(str)) :
  /** @type {Number} */(str);

// Math

const pow = Math.pow;
const sqrt = Math.sqrt;
const sin = Math.sin;
const cos = Math.cos;
const abs = Math.abs;
const exp = Math.exp;
const ceil = Math.ceil;
const floor = Math.floor;
const asin = Math.asin;
const max = Math.max;
const min = Math.min;
const atan2 = Math.atan2;
const PI = Math.PI;
const _round = Math.round;

/**
 * Clamps a value between min and max bounds
 *
 * @param  {Number} v - Value to clamp
 * @param  {Number} min - Minimum boundary
 * @param  {Number} max - Maximum boundary
 * @return {Number}
 */
const clamp$1 = (v, min, max) => v < min ? min : v > max ? max : v;

// Hold the multipliers round reads so it skips an exponentiation per call, which cost 8 to 13 percent on CSS updates.
const powersOfTen = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12];

/**
 * Rounds a number to specified decimal places
 *
 * @param  {Number} v - Value to round
 * @param  {Number} decimalLength - Number of decimal places
 * @return {Number}
 */
const round$1 = (v, decimalLength) => {
  if (decimalLength < 0) return v;
  if (!decimalLength) return _round(v);
  const p = powersOfTen[decimalLength] || 10 ** decimalLength;
  return _round(v * p) / p;
};

/**
 * Snaps a value to nearest increment or array value
 *
 * @param  {Number} v - Value to snap
 * @param  {Number|Array<Number>} increment - Step size or array of snap points
 * @return {Number}
 */
const snap$1 = (v, increment) => isArr(increment) ? increment.reduce((closest, cv) => (abs(cv - v) < abs(closest - v) ? cv : closest)) : increment ? _round(v / increment) * increment : v;

/**
 * Linear interpolation between two values
 *
 * @param  {Number} start - Starting value
 * @param  {Number} end - Ending value
 * @param  {Number} factor - Interpolation factor in the range [0, 1]
 * @return {Number} The interpolated value
 */
const lerp$1 = (start, end, factor) => factor === 1 ? end : factor === 0 ? start : start + (end - start) * factor;

/**
 * Replaces infinity with maximum safe value
 *
 * @param  {Number} v - Value to check
 * @return {Number}
 */
const clampInfinity = v => v === Infinity ? maxValue : v === -Infinity ? -maxValue : v;

/**
 * Normalizes time value with minimum threshold
 *
 * @param  {Number} v - Time value to normalize
 * @return {Number}
 */
const normalizeTime = v => v <= minValue ? minValue : clampInfinity(round$1(v, 11));

// Arrays

/**
 * @template T
 * @param    {T[]} a
 * @return   {T[]}
 */
const cloneArray = a => isArr(a) ? [ ...a ] : a;

// Objects

/**
 * @template T
 * @template U
 * @param    {T} o1
 * @param    {U} o2
 * @return   {T & U}
 */
const mergeObjects = (o1, o2) => {
  const merged = /** @type {T & U} */({ ...o1 });
  for (let p in o2) {
    const o1p = /** @type {T & U} */(o1)[p];
    merged[p] = isUnd(o1p) ? /** @type {T & U} */(o2)[p] : o1p;
  }  return merged;
};

// Completion promises

let resolvingCompletion = null;

/**
 * @this {Timer|WAAPIAnimation}
 * @param {Function} [callback]
 * @return {Promise<unknown>}
 */
function completionThen(callback = noopModifier) {
  const instance = this;
  return new Promise((resolve, reject) => {
    // A muted instance never delivers completion, so its listeners stay pending like its callbacks.
    if (/** @type {Timer} */(instance).muted) return;
    const onResolve = () => {
      const previous = resolvingCompletion;
      // Mark instance as resolving so getCompletionThen hides then and the Promise does not call it again.
      resolvingCompletion = instance;
      try {
        resolve(callback(instance));
      } catch (error) {
        reject(error);
      }
      resolvingCompletion = previous;
    };
    if (instance.completed) {
      onResolve();
    } else {
      if (instance._resolve === noop) {
        const callbacks = [];
        // Queue and drain through the existing resolver so instances need no extra fields.
        instance._resolve = listener => {
          if (isFnc(listener)) {
            callbacks.push(listener);
          } else {
            instance._resolve = noop;
            for (let i = 0, l = callbacks.length; i < l; i++) callbacks[i]();
          }
        };
      }
      instance._resolve(onResolve);
    }
  });
}

// A Promise that resolves to an instance reads then again and would call it forever.
// Return null only during this second read so the loop stops without a temporary field on the instance.
/**
 * @param {Timer|WAAPIAnimation} instance
 * @return {Function|null}
 */
const getCompletionThen = instance => resolvingCompletion === instance ? null : completionThen;

// Linked lists

/**
 * @param  {Object} parent
 * @param  {Function} callback
 * @param  {Boolean} [reverse]
 * @return {void}
 */
const forEachChildren = (parent, callback, reverse) => {
  let next = reverse ? parent._tail : parent._head;
  while (next) {
    const currentNext = reverse ? next._prev : next._next;
    callback(next);
    next = currentNext;
  }
};

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @return {void}
 */
const removeChild = (parent, child) => {
  const prev = child._prev;
  const next = child._next;
  prev ? prev._next = next : parent._head = next;
  next ? next._prev = prev : parent._tail = prev;
  child._prev = null;
  child._next = null;
};

/**
 * @param  {Object} parent
 * @param  {Object} child
 * @param  {Function} [sortMethod]
 * @return {void}
 */
const addChild = (parent, child, sortMethod) => {
  let prev = parent._tail;
  while (prev && sortMethod && sortMethod(prev, child)) prev = prev._prev;
  const next = prev ? prev._next : parent._head;
  prev ? prev._next = child : parent._head = child;
  next ? next._prev = child : parent._tail = child;
  child._prev = prev;
  child._next = next;
};



/**
 * @param  {DOMTarget} target
 * @param  {String} propName
 * @param  {InlineValueStore} [inlineValueStore]
 * @return {String}
 */
const parseInlineTransforms = (target, propName, inlineValueStore) => {
  const inlineTransforms = target.style.transform;
  if (inlineTransforms) {
    const cachedTransforms = target[transformsSymbol];
    let pos = 0;
    const len = inlineTransforms.length;
    while (pos < len) {
      // Skip whitespace
      while (pos < len && inlineTransforms.charCodeAt(pos) === 32) pos++;
      if (pos >= len) break;
      // Read function name
      const nameStart = pos;
      while (pos < len && inlineTransforms.charCodeAt(pos) !== 40) pos++;
      if (pos >= len) break;
      const name = inlineTransforms.substring(nameStart, pos);
      // Scan to closing paren, recording top-level comma positions
      let depth = 1;
      const valueStart = pos + 1;
      let c1 = -1, c2 = -1;
      pos++;
      while (pos < len && depth > 0) {
        const c = inlineTransforms.charCodeAt(pos);
        if (c === 40) depth++;
        else if (c === 41) depth--;
        else if (c === 44 && depth === 1) {
          if (c1 === -1) c1 = pos;
          else if (c2 === -1) c2 = pos;
        }
        pos++;
      }
      const valueEnd = pos - 1;
      // Decompose multi-arg functions into individual axis properties
      if (name === 'translate' || name === 'translate3d') {
        if (c1 === -1) {
          cachedTransforms.translateX = inlineTransforms.substring(valueStart, valueEnd).trim();
        } else {
          cachedTransforms.translateX = inlineTransforms.substring(valueStart, c1).trim();
          if (c2 === -1) {
            cachedTransforms.translateY = inlineTransforms.substring(c1 + 1, valueEnd).trim();
          } else {
            cachedTransforms.translateY = inlineTransforms.substring(c1 + 1, c2).trim();
            cachedTransforms.translateZ = inlineTransforms.substring(c2 + 1, valueEnd).trim();
          }
        }
      } else if (name === 'scale' || name === 'scale3d') {
        if (c1 === -1) {
          cachedTransforms.scale = inlineTransforms.substring(valueStart, valueEnd).trim();
        } else {
          cachedTransforms.scaleX = inlineTransforms.substring(valueStart, c1).trim();
          if (c2 === -1) {
            cachedTransforms.scaleY = inlineTransforms.substring(c1 + 1, valueEnd).trim();
          } else {
            cachedTransforms.scaleY = inlineTransforms.substring(c1 + 1, c2).trim();
            cachedTransforms.scaleZ = inlineTransforms.substring(c2 + 1, valueEnd).trim();
          }
        }
      } else {
        cachedTransforms[name] = inlineTransforms.substring(valueStart, valueEnd);
      }
    }
    // Resolve the requested property from the cache
    const cached = cachedTransforms[propName];
    if (!isUnd(cached)) {
      if (inlineValueStore) inlineValueStore.value = cached;
      return cached;
    }
  }
  return stringStartsWith(propName, 'scale') ? '1' :
    stringStartsWith(propName, 'rotate') || stringStartsWith(propName, 'skew') ? '0deg' : '0px';
};

/**
 * Builds a CSS transform string from the target's cached transform properties.
 * Emits properties in order (perspective > translate > rotate > scale > skew > matrix).
 * When adjacent axis properties are all present, emits a shorter shorthand (translateX + translateY -> translate(x, y))
 * Properties without a grouping partner (e.g. translateY alone, scaleZ alone) emit individually.
 *
 * @param {Record<String, String>} props
 * @return {String}
 */
const buildTransformString = (props) => {
  // Read each transform by name, a keyed loop over validTransforms cost 19 to 26 percent on CSS transform updates.
  let str = emptyString;
  if (props.perspective !== undefined) str += `perspective(${props.perspective}) `;
  // Group translateX with adjacent translateY / translateZ
  const x = props.translateX;
  const y = props.translateY;
  const z = props.translateZ;
  if (x !== undefined && y !== undefined) {
    str += z !== undefined ? `translate3d(${x},${y},${z}) ` : `translate(${x},${y}) `;
  } else {
    if (x !== undefined) str += `translateX(${x}) `;
    if (y !== undefined) str += `translateY(${y}) `;
    if (z !== undefined) str += `translateZ(${z}) `;
  }
  if (props.rotate !== undefined) str += `rotate(${props.rotate}) `;
  if (props.rotateX !== undefined) str += `rotateX(${props.rotateX}) `;
  if (props.rotateY !== undefined) str += `rotateY(${props.rotateY}) `;
  if (props.rotateZ !== undefined) str += `rotateZ(${props.rotateZ}) `;
  // Preserve non-animatable rotate3d in correct position (after rotateZ, before scale)
  if (props.rotate3d !== undefined) str += `rotate3d(${props.rotate3d}) `;
  const scale = props.scale;
  const sx = props.scaleX;
  const sy = props.scaleY;
  const sz = props.scaleZ;
  if (scale !== undefined) str += `scale(${scale}) `;
  // Group scaleX with adjacent scaleY / scaleZ (only when standalone scale is absent)
  if (scale === undefined && sx !== undefined && sy !== undefined) {
    str += sz !== undefined ? `scale3d(${sx},${sy},${sz}) ` : `scale(${sx},${sy}) `;
  } else {
    if (sx !== undefined) str += `scaleX(${sx}) `;
    if (sy !== undefined) str += `scaleY(${sy}) `;
    if (sz !== undefined) str += `scaleZ(${sz}) `;
  }
  if (props.skew !== undefined) str += `skew(${props.skew}) `;
  if (props.skewX !== undefined) str += `skewX(${props.skewX}) `;
  if (props.skewY !== undefined) str += `skewY(${props.skewY}) `;
  // Preserve non-animatable matrix/matrix3d from inline styles
  if (props.matrix !== undefined) str += `matrix(${props.matrix}) `;
  if (props.matrix3d !== undefined) str += `matrix3d(${props.matrix3d}) `;
  return str;
};

/**
 * Anime.js adapter API. Each library or class group that wants to extend `animate()` and `utils.set()` calls `registerAdapter()` to create its own `Adapter`. The returned `Adapter` exposes `registerTargetAdapter(detect)` for per-class detection and `registerPropertyResolver(fn)` for global Color / Vector / pattern-based fallbacks.
 *
 *   import { registerAdapter } from 'animejs/adapters';
 *
 *   const myAdapter = registerAdapter();
 *   const widget = myAdapter.registerTargetAdapter((t) => t instanceof MyWidget);
 *   widget.registerProperty('value',
 *     (t) => t.getValue(),
 *     (target, value) => target.setValue(value),
 *   );
 *
 * For scalar tweens, value is the interpolated number. For color and complex tweens it is undefined, read tween._numbers instead.
 *
 * Resolution order: the target adapters of every Adapter in registration order, first match wins, then the property resolvers of every Adapter, first non null wins, then the engine property path.
 */



/**
 * @typedef TargetAdapterEntry
 * @property {(t: any) => any} get
 * @property {(target: any, value: number, tween: Tween) => void} set
 * @property {(t: any) => boolean} [gate]
 */

/** @typedef {(target: any, name: string) => TargetAdapterEntry | null} PropertyResolver */

/** @type {Adapter[]} */
const adapters = [];

/**
 * Internal resolution. Tries every Adapter's target adapters first (in registration order, first match wins), then every Adapter's property resolvers.
 *
 * @param {any} target
 * @param {string} name
 * @return {TargetAdapterEntry | null}
 */
function resolveAdapterEntry(target, name) {
  if (!target) return null;
  const adapterCount = adapters.length;
  outer: for (let i = 0; i < adapterCount; i++) {
    const adapter = adapters[i];
    if (adapter.detect && !adapter.detect(target)) continue;
    const targetAdapters = adapter.targetAdapters;
    for (let j = 0, m = targetAdapters.length; j < m; j++) {
      const targetAdapter = targetAdapters[j];
      if (targetAdapter.detect(target)) {
        const entry = targetAdapter.props[name];
        if (entry && (!entry.gate || entry.gate(target))) return entry;
        break outer;
      }
    }
  }
  for (let i = 0; i < adapterCount; i++) {
    const adapter = adapters[i];
    if (adapter.detect && !adapter.detect(target)) continue;
    const resolvers = adapter.propertyResolvers;
    for (let j = 0, m = resolvers.length; j < m; j++) {
      const entry = resolvers[j](target, name);
      if (entry) return entry;
    }
  }
  return null;
}



/**
 * HEX3 / HEX3A / HEX6 / HEX6A Color value string -> RGBA values array
 * @param  {String} hexValue
 * @return {ColorArray}
 */
const hexToRgba = hexValue => {
  const hexLength = hexValue.length;
  const isShort = hexLength === 4 || hexLength === 5;
  return [
    +('0x' + hexValue[1] + hexValue[isShort ? 1 : 2]),
    +('0x' + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
    +('0x' + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
    ((hexLength === 5 || hexLength === 9) ? +(+('0x' + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1)
  ]
};

/**
 * @param  {Number} p
 * @param  {Number} q
 * @param  {Number} t
 * @return {Number}
 */
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  return t < 1 / 6 ? p + (q - p) * 6 * t :
         t < 1 / 2 ? q :
         t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 :
         p;
};

/**
 * HSL channels 0-1 -> RGBA values array
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} l
 * @param  {Number} alpha
 * @return {ColorArray}
 */
const hslChannelsToRgba = (h, s, l, alpha) => {
  const q = l < .5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    round$1(hue2rgb(p, q, h + 1 / 3) * 255, 0),
    round$1(hue2rgb(p, q, h) * 255, 0),
    round$1(hue2rgb(p, q, h - 1 / 3) * 255, 0),
    alpha,
  ];
};

/**
 * Gamma encoded sRGB channel 0-1 -> channel 0-255, clipped to the sRGB gamut
 * @param  {Number} c
 * @return {Number}
 */
const srgbChannel = c => round$1(clamp$1(c, 0, 1) * 255, 0);

/**
 * Linear sRGB channel 0-1 -> gamma encoded sRGB channel 0-255, clipped to the sRGB gamut
 * @param  {Number} linear
 * @return {Number}
 */
const linearToSrgbChannel = linear => {
  const c = clamp$1(linear, 0, 1);
  return srgbChannel(c <= .0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - .055);
};

/**
 * Gamma encoded channel 0-1 -> linear channel 0-1, the transfer sRGB and Display P3 share
 * @param  {Number} c
 * @return {Number}
 */
const srgbToLinear = c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;

/**
 * Oklab channels -> RGBA values array
 * @param  {Number} L
 * @param  {Number} a
 * @param  {Number} b
 * @param  {Number} alpha
 * @return {ColorArray}
 */
const oklabChannelsToRgba = (L, a, b, alpha) => {
  const l = (L + .3963377774 * a + .2158037573 * b) ** 3;
  const m = (L - .1055613458 * a - .0638541728 * b) ** 3;
  const s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
  return [
    linearToSrgbChannel(4.0767416621 * l - 3.3077115913 * m + .2309699292 * s),
    linearToSrgbChannel(-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s),
    linearToSrgbChannel(-0.0041960863 * l - .7034186147 * m + 1.707614701 * s),
    alpha,
  ];
};

/**
 * A channel token -> number. 'none' reads as zero and a percentage maps to its reference value
 * @param  {String} token
 * @param  {Number} percentReference
 * @return {Number}
 */
const parseChannel = (token, percentReference) => token === 'none' ? 0 : token[token.length - 1] === '%' ? parseFloat(token) / 100 * percentReference : parseFloat(token);

/**
 * All in one color converter that converts a color string value into an array of RGBA values
 * @param  {String} colorString
 * @return {ColorArray}
 */
const convertColorStringValuesToRgbaArray = colorString => {
  // Read the channel tokens, a color function starts them with its color space name.
  // One exec with capture groups, a global match of the tokens cost 11 percent on color setup.
  const tokens = colorFunctionExecRgx.exec(colorString);
  if (!tokens) return isHex(colorString) ? hexToRgba(colorString) : [0, 0, 0, 1];
  const first = isColorFn(colorString) ? 2 : 1;
  const t0 = tokens[first], t1 = tokens[first + 1], t2 = tokens[first + 2], t3 = tokens[first + 3];
  const alpha = isUnd(t3) ? 1 : parseChannel(t3, 1);
  if (isRgb(colorString)) return [parseChannel(t0, 255), parseChannel(t1, 255), parseChannel(t2, 255), alpha];
  if (isHsl(colorString)) return hslChannelsToRgba(parseChannel(t0, 360) / 360, parseChannel(t1, 100) / 100, parseChannel(t2, 100) / 100, alpha);
  // Scale a, b and chroma percentages to .4, their peak in oklab and oklch.
  if (isOklab(colorString)) return oklabChannelsToRgba(parseChannel(t0, 1), parseChannel(t1, .4), parseChannel(t2, .4), alpha);
  if (isOklch(colorString)) {
    const chroma = parseChannel(t1, .4);
    const hue = parseChannel(t2, 360) * Math.PI / 180;
    return oklabChannelsToRgba(parseChannel(t0, 1), chroma * Math.cos(hue), chroma * Math.sin(hue), alpha);
  }
  if (first === 2) {
    const space = tokens[1];
    const c0 = parseChannel(t0, 1), c1 = parseChannel(t1, 1), c2 = parseChannel(t2, 1);
    if (space === 'srgb') return [srgbChannel(c0), srgbChannel(c1), srgbChannel(c2), alpha];
    if (space === 'srgb-linear') return [linearToSrgbChannel(c0), linearToSrgbChannel(c1), linearToSrgbChannel(c2), alpha];
    if (space === 'display-p3') {
      const r = srgbToLinear(c0), g = srgbToLinear(c1), b = srgbToLinear(c2);
      return [
        linearToSrgbChannel(1.2249401762805 * r - .2249401762805 * g),
        linearToSrgbChannel(-0.042056954709 * r + 1.042056954709 * g),
        linearToSrgbChannel(-0.01963755459 * r - .07863604555 * g + 1.09827360014 * b),
        alpha,
      ];
    }
  }
  return [0, 0, 0, 1];
};



/**
 * @typedef {Object} InlineValueStore
 * @property {String|Number|null|undefined|Symbol} value
 */

/** @type {TweenDecomposedValue} */
const decomposedOriginalValue = {
  t: valueTypes.NUMBER,
  n: 0,
  u: null,
  o: null,
  d: null,
  s: null,
};

/**
 * @template T, D
 * @param {T|undefined} targetValue
 * @param {D} defaultValue
 * @return {T|D}
 */
const setValue = (targetValue, defaultValue) => {
  return isUnd(targetValue) ? defaultValue : targetValue;
};

/**
 * Read a CSS variable for a target, from the element itself or from the document root.
 *
 * @param  {String} value
 * @param  {Target} target
 * @return {String|Number}
 */
const resolveCssVar = (value, target) => {
  const match = value.match(cssVariableMatchRgx);
  // Fall back to the document root so non DOM targets like three.js meshes still read document CSS variables.
  const element = target[isDomSymbol] ? target : document.documentElement;
  let computed = getComputedStyle(/** @type {HTMLElement} */(element))?.getPropertyValue(match[1]);
  if ((!computed || computed.trim() === emptyString) && match[2]) computed = match[2].trim();
  return computed || 0;
};

/**
 * @param  {TweenPropValue} value
 * @param  {Target} target
 * @param  {Number} index
 * @param  {TargetsArray} targets
 * @param  {Tween|null} prevTween
 * @return {any}
 */
const getFunctionValue = (value, target, index, targets, prevTween) => {
  if (isFnc(value)) {
    const computed = /** @type {Function} */(value)(target, index, targets, prevTween);
    // Fallback to 0 if the function returns undefined, NaN, null, false or 0
    return !isNaN(+computed) ? +computed : computed || 0;
  }
  if (isStr(value) && stringStartsWith(value, cssVarPrefix)) {
    return resolveCssVar(/** @type {String} */(value), target);
  }
  return value;
};

/**
 * @param  {TweenPropValue} value
 * @param  {Target} target
 * @param  {Number} index
 * @param  {TargetsArray} targets
 * @param  {Tween|null} prevTween
 * @return {Function|null}
 */
const getValueResolver = (value, target, index, targets, prevTween) => {
  return isFnc(value) || isStr(value) && stringStartsWith(value, cssVarPrefix) ?
    () => getFunctionValue(value, target, index, targets, prevTween) : null;
};

/**
 * @param  {Target} target
 * @param  {String} prop
 * @return {tweenTypes}
 */
const getTweenType = (target, prop) => {
  return !target[isDomSymbol] ? tweenTypes.OBJECT :
    // Handle SVG attributes
    target[isSvgSymbol] && isValidSVGAttribute(target, prop) ? tweenTypes.ATTRIBUTE :
    // Handle CSS Transform properties differently than CSS to allow individual animations
    validTransforms.includes(prop) || shortTransforms.get(prop) ? tweenTypes.TRANSFORM :
    // CSS variables
    stringStartsWith(prop, '--') ? tweenTypes.CSS_VAR :
    // All other CSS properties
    prop in /** @type {DOMTarget} */(target).style ? tweenTypes.CSS :
    // Handle other DOM Attributes
    prop in target ? tweenTypes.OBJECT :
    tweenTypes.ATTRIBUTE;
};

/**
 * @param  {DOMTarget} target
 * @param  {String} propName
 * @param  {InlineValueStore} [inlineValueStore]
 * @return {String}
 */
const getCSSValue = (target, propName, inlineValueStore) => {
  const inlineStyles = target.style[propName];
  if (inlineStyles && inlineValueStore) {
    inlineValueStore.value = inlineStyles;
  }
  const value = inlineStyles || getComputedStyle(target[proxyTargetSymbol] || target).getPropertyValue(propName);
  return value === 'auto' ? '0' : value;
};

/**
 * @param {Target} target
 * @param {String} propName
 * @param {tweenTypes} [tweenType]
 * @param {InlineValueStore} [inlineValueStore]
 * @return {String|Number}
 */
const getOriginalAnimatableValue = (target, propName, tweenType, inlineValueStore) => {
  const type = !isUnd(tweenType) ? tweenType : getTweenType(target, propName);
  const adapterProp = resolveAdapterEntry(target, propName);
  if (adapterProp) {
    const value = adapterProp.get(target);
    if (inlineValueStore) inlineValueStore.value = value;
    return value == null ? 0 : value;
  }
  if (type === tweenTypes.OBJECT) {
    const value = target[propName];
    if (inlineValueStore) inlineValueStore.value = value;
    return value || 0;
  }
  if (type === tweenTypes.ATTRIBUTE) {
    const value = /** @type {DOMTarget} */(target).getAttribute(propName);
    if (value && inlineValueStore) inlineValueStore.value = value;
    return value;
  }
  return type === tweenTypes.TRANSFORM ? parseInlineTransforms(/** @type {DOMTarget} */(target), propName, inlineValueStore) :
         type === tweenTypes.CSS_VAR ? getCSSValue(/** @type {DOMTarget} */(target), propName, inlineValueStore).trimStart() :
         getCSSValue(/** @type {DOMTarget} */(target), propName, inlineValueStore);
};

/**
 * @param  {Number} x
 * @param  {Number} y
 * @param  {String} operator
 * @return {Number}
 */
const getRelativeValue = (x, y, operator) => {
  return operator === '-' ? x - y :
         operator === '+' ? x + y :
         x * y;
};

/**
 * @param  {String|Number|Object} rawValue
 * @return {TweenDecomposedValue}
 */
const decomposeRawValue = rawValue => {
  /** @type {valueTypes} */
  let type = valueTypes.NUMBER;
  let number = 0;
  let unit = null;
  let operator = null;
  let numbers = null;
  let strings = null;
  if (rawValue) {
    const num = +rawValue;
    if (!isNaN(num)) {
      // It's a number
      number = num;
    } else {
      // let str = /** @type {String} */(rawValue).trim();
      let str = /** @type {String} */(rawValue);
      // Parsing operators (+=, -=, *=) manually is much faster than using regex here
      if (str[1] === '=') {
        operator = str[0];
        str = str.slice(2);
      }
      // Skip exec regex if the value type is complex or color to avoid long regex backtracking
      const unitMatch = str.includes(' ') ? false : unitsExecRgx.exec(str);
      if (unitMatch) {
        // Has a number and a unit
        type = valueTypes.UNIT;
        number = +unitMatch[1];
        unit = unitMatch[2];
      } else if (operator) {
        // Has an operator (+=, -=, *=)
        number = +str;
      } else if (isCol(str)) {
        // Color string
        type = valueTypes.COLOR;
        numbers = convertColorStringValuesToRgbaArray(str);
      } else {
        // Is a more complex string (generally svg coords, calc() or filters CSS values)
        const matchedNumbers = str.match(digitWithExponentRgx);
        type = valueTypes.COMPLEX;
        numbers = matchedNumbers ? matchedNumbers.map(Number) : [];
        strings = str.split(digitWithExponentRgx);
      }
    }
  }
  decomposedOriginalValue.t = type;
  decomposedOriginalValue.n = number;
  decomposedOriginalValue.u = unit;
  decomposedOriginalValue.o = operator;
  decomposedOriginalValue.d = numbers;
  decomposedOriginalValue.s = strings;
  return decomposedOriginalValue;
};

/**
 * @param  {Tween} tween
 * @return {TweenDecomposedValue}
 */
const decomposeTweenValue = tween => {
  decomposedOriginalValue.t = tween._valueType;
  decomposedOriginalValue.n = tween._toNumber;
  decomposedOriginalValue.u = tween._unit;
  decomposedOriginalValue.o = null;
  decomposedOriginalValue.d = cloneArray(tween._toNumbers);
  decomposedOriginalValue.s = cloneArray(tween._strings);
  return decomposedOriginalValue;
};

/**
 * @param  {Tween} tween
 * @param  {Number} progress
 * @param  {Number} precision
 * @param  {Boolean} [stringify]
 * @return {String|undefined}
 */
const composeComplexValue = (tween, progress, precision, stringify = true) => {
  const mod = tween._modifier;
  const fn = tween._fromNumbers;
  const tn = tween._toNumbers;
  const ns = tween._numbers;
  const l = tn.length;
  // Fill _numbers before the string so adapters read the numbers and skip the unused string.
  // Fill _numbers for every tween, not only composed ones, so setters that read them still animate.
  for (let j = 0; j < l; j++) {
    ns[j] = /** @type {Number} */(mod(round$1(lerp$1(fn[j], tn[j], progress), precision)));
  }
  if (!stringify) return;
  const ts = tween._strings;
  let v = ts[0];
  for (let j = 0; j < l; j++) {
    const n = ns[j];
    const s = ts[j + 1];
    v += `${s ? n + s : n}`;
  }
  return v;
};







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
      const tweenNewTime = clamp$1(iterationTime - tweenStartTime, 0, tweenChangeDuration);
      // Call a shared ease once per frame at the first rendered tween, NaN means not called yet.
      // Call common eases directly, a cache check and update per tween costs more.
      const tweenProgress = !hasSharedProgress ? tween._ease(tweenNewTime / tween._updateDuration) :
        sharedProgress === sharedProgress ? sharedProgress : (sharedProgress = tween._ease(tweenNewTime / tween._updateDuration));
      const value = /** @type {Number} */(tween._modifier(lerp$1(tween._fromNumber, tween._toNumber, tweenProgress)));
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
};

/**
 * @param  {Timer} tickable
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
  const tickableAbsoluteTime = time - tickableDelay;
  const tickablePrevTime = clamp$1(tickablePrevAbsoluteTime, -tickableDelay, duration);
  const tickableCurrentTime = clamp$1(tickableAbsoluteTime, -tickableDelay, duration);
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
    tickable._currentIteration = clamp$1(currentIteration, 0, iterationCount);
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
          const tweenNewTime = clamp$1(tweenTimeFromStart, 0, tween._changeDuration);

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
              value = number = /** @type {Number} */(tweenModifier(round$1(lerp$1(tween._fromNumber, tween._toNumber,  tweenProgress), tweenPrecision )));
            } else if (tweenValueType === valueTypes.UNIT) {
              // Rounding the values speed up string composition
              number = /** @type {Number} */(tweenModifier(round$1(lerp$1(tween._fromNumber, tween._toNumber,  tweenProgress), tweenPrecision)));
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
              tweenNumbers[3] = /** @type {Number} */(tweenModifier(lerp$1(tweenFromNumbers[3], tweenToNumbers[3], tweenProgress)));
              // Build the rgba string only for the dispatch path or an internal render, a setter composes the color from _numbers.
              if (!tween._setter || internalRender) {
                value = `rgba(${round$1(tweenNumbers[0], 0)},${round$1(tweenNumbers[1], 0)},${round$1(tweenNumbers[2], 0)},${tweenNumbers[3]})`;
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
};

/**
 * @param  {Timer} tickable
 * @param  {Number} time
 * @param  {Number} muteCallbacks
 * @param  {Number} internalRender
 * @param  {Number} tickMode
 * @return {void}
 */
const tick = (tickable, time, muteCallbacks, internalRender, tickMode) => {
  // Keep tick small so V8 inlines it, the timeline code inside it cost 10 percent on one property updates.
  const previousIteration = tickable._currentIteration;
  render(tickable, time, muteCallbacks, internalRender, tickMode);
  if (tickable._hasChildren) /** @type {Timeline} */(tickable).renderChildren(time, muteCallbacks, internalRender, tickMode, previousIteration);
};



// Hold lookups for proxies that return new lookups per read and for copies that forward to a target.
// A WeakMap for all targets slowed setup and render, so only those keep their lookups here.
/** @type {WeakMap<Target, TweenLookups>} */
const proxyLookups = new WeakMap();

/**
 * @param  {Target} target
 * @return {TweenLookups}
 */
const getReplaceLookups = target => {
  const lookups = target[replaceLookupsSymbol];
  // A spread, Object.assign, or prototype copy carries the lookups or proxy marker of its source.
  // The owner and WeakMap checks cost less setup time than a non-enumerable defineProperty.
  if (lookups !== true && lookups[lookupsOwnerSymbol] === target) return lookups;
  // Copies and proxies never write the slot, a forwarding proxy would replace the lookups of its target.
  // Each keeps its own apart, as 4.5 kept every object apart.
  let own = proxyLookups.get(target);
  if (!own) proxyLookups.set(target, own = Object.create(null));
  return own;
};

// Promote to a Set at 128 items, the linear scan benchmarks faster than Set lookups below that.
const dedupeSetThreshold = 128;

/**
 * @param  {DOMTargetsParam|TargetsParam} v
 * @return {NodeList|HTMLCollection}
 */
function getNodeList(v) {
  const n = isStr(v) ? scope.root.querySelectorAll(v) : v;
  if (n instanceof NodeList || n instanceof HTMLCollection) return n;
}

/**
 * @overload
 * @param  {DOMTargetsParam} targets
 * @return {DOMTargetsArray}
 *
 * @overload
 * @param  {JSTargetsParam} targets
 * @return {JSTargetsArray}
 *
 * @overload
 * @param  {TargetsParam} targets
 * @return {TargetsArray}
 *
 * @param  {DOMTargetsParam|JSTargetsParam|TargetsParam} targets
 */
function parseTargets(targets) {
  if (isNil(targets)) return /** @type {TargetsArray} */([]);
  if (!isBrowser) return /** @type {JSTargetsArray} */(isArr(targets) && targets.flat(Infinity) || [targets]);
  if (isArr(targets)) {
    const flattened = /** @type {TargetSelector[]} */(targets.flat(Infinity));
    /** @type {TargetsArray} */
    const parsed = [];
    // Dedupe by identity, promote to a Set past dedupeSetThreshold so large lists stay linear.
    /** @type {Set<Target>|null} */
    let seen = null;
    for (let i = 0, l = flattened.length; i < l; i++) {
      const item = flattened[i];
      if (isNil(item)) continue;
      const nodeList = getNodeList(item);
      if (nodeList) {
        for (let j = 0, jl = nodeList.length; j < jl; j++) {
          const subItem = nodeList[j];
          if (isNil(subItem) || (seen ? seen.has(subItem) : parsed.includes(subItem))) continue;
          parsed.push(subItem);
          if (seen) seen.add(subItem);
          else if (parsed.length > dedupeSetThreshold) seen = new Set(parsed);
        }
      } else {
        const target = /** @type {Target} */(item);
        if (seen ? seen.has(target) : parsed.includes(target)) continue;
        parsed.push(target);
        if (seen) seen.add(target);
        else if (parsed.length > dedupeSetThreshold) seen = new Set(parsed);
      }
    }
    return parsed;
  }
  const nodeList = getNodeList(targets);
  if (nodeList) return /** @type {DOMTargetsArray} */(Array.from(nodeList));
  return /** @type {TargetsArray} */([targets]);
}

/**
 * @overload
 * @param  {DOMTargetsParam} targets
 * @return {DOMTargetsArray}
 *
 * @overload
 * @param  {JSTargetsParam} targets
 * @return {JSTargetsArray}
 *
 * @overload
 * @param  {TargetsParam} targets
 * @return {TargetsArray}
 *
 * @param  {DOMTargetsParam|JSTargetsParam|TargetsParam} targets
 */
function registerTargets(targets) {
  const parsedTargetsArray = parseTargets(targets);
  for (let i = 0, l = parsedTargetsArray.length; i < l; i++) {
    const target = parsedTargetsArray[i];
    if (!target[replaceLookupsSymbol]) {
      // Create lookups without a prototype so a property name like toString reads no inherited value.
      /** @type {TweenLookups} */
      const lookups = Object.create(null);
      lookups[lookupsOwnerSymbol] = target;
      target[replaceLookupsSymbol] = lookups;
      if (target[replaceLookupsSymbol] !== lookups) {
        target[replaceLookupsSymbol] = true;
        proxyLookups.set(target, lookups);
      }
      const isSvgType = isSvg(target);
      const isDom = /** @type {DOMTarget} */(target).nodeType || isSvgType;
      if (isDom) {
        target[isDomSymbol] = true;
        target[isSvgSymbol] = isSvgType;
        target[transformsSymbol] = {};
      }
    }
  }
  return parsedTargetsArray;
}





const propertyNamesCache = {};

/**
 * @param  {String} propertyName
 * @param  {Target} target
 * @param  {tweenTypes} tweenType
 * @return {String}
 */
const sanitizePropertyName = (propertyName, target, tweenType) => {
  if (tweenType === tweenTypes.TRANSFORM) {
    const t = shortTransforms.get(propertyName);
    return t ? t : propertyName;
  } else if (
    tweenType === tweenTypes.CSS ||
    // Handle special cases where properties like "strokeDashoffset" needs to be set as "stroke-dashoffset"
    // but properties like "baseFrequency" should stay in lowerCamelCase
    (tweenType === tweenTypes.ATTRIBUTE && (isSvg(target) && propertyName in /** @type {DOMTarget} */(target).style))
  ) {
    return propertyNamesCache[propertyName] || (propertyNamesCache[propertyName] = toLowerCase(propertyName));
  } else {
    return propertyName;
  }
};

/**
 * @template {Renderable} T
 * @param {T} renderable
 * @param {Boolean} [inlineStylesOnly]
 * @return {T}
 */
const revertValues = (renderable, inlineStylesOnly = false) => {
  // Allow revertValues() to be called on timelines
  if (renderable._hasChildren) {
    forEachChildren(renderable, (/** @type {Renderable} */child) => revertValues(child, inlineStylesOnly), true);
  } else {
    const animation = /** @type {JSAnimation} */(renderable);
    animation.pause();
    // Restore each property from its first tween, later keyframes do not hold its original value.
    /** @type {Tween|null} */
    let previousTween = null;
    forEachChildren(animation, (/** @type {Tween} */tween) => {
      // A muted tween never wrote its target, so there is nothing to restore.
      if (tween._composition === compositionTypes.muted) return;
      const tweenProperty = tween.property;
      const tweenTarget = tween.target;
      const restoresProperty = !previousTween || tweenTarget !== previousTween.target || tweenProperty !== previousTween.property;
      previousTween = tween;
      if (restoresProperty) {
        const tweenType = tween._tweenType;
        const originalInlinedValue = tween._inlineValue;
        const tweenHadNoInlineValue = originalInlinedValue === noOriginalValueSymbol || isNil(originalInlinedValue) || originalInlinedValue === emptyString;
        if (tween._setter) {
          if (!inlineStylesOnly && !tweenHadNoInlineValue) {
            // Re-seed the original value to the _number / _numbers props so the setter can write the original state instead of re-applying the current frame.
            const { d, n } = decomposeRawValue(originalInlinedValue);
            if (d) {
              const numbers = tween._numbers;
              for (let i = 0, l = d.length; i < l; i++) numbers[i] = d[i];
            } else {
              tween._number = n;
            }
            tween._setter(tweenTarget, tween._number, tween);
          }
        } else if (tweenType === tweenTypes.OBJECT) {
          // Restore null and undefined on plain objects, only DOM styles treat them as missing values.
          if (!inlineStylesOnly && originalInlinedValue !== noOriginalValueSymbol) {
            tweenTarget[tweenProperty] = originalInlinedValue;
          }
        } else if (tweenTarget[isDomSymbol]) {
          if (tweenType === tweenTypes.ATTRIBUTE) {
            if (!inlineStylesOnly) {
              if (tweenHadNoInlineValue) {
                /** @type {DOMTarget} */(tweenTarget).removeAttribute(tweenProperty);
              } else {
                /** @type {DOMTarget} */(tweenTarget).setAttribute(tweenProperty, /** @type {String} */(originalInlinedValue));
              }
            }
          } else {
            const targetStyle = /** @type {DOMTarget} */(tweenTarget).style;
            if (tweenType === tweenTypes.TRANSFORM) {
              const cachedTransforms = tweenTarget[transformsSymbol];
              if (tweenHadNoInlineValue) {
                delete cachedTransforms[tweenProperty];
              } else {
                cachedTransforms[tweenProperty] = originalInlinedValue;
              }
              if (!Object.keys(cachedTransforms).length) {
                targetStyle.removeProperty('transform');
              } else {
                targetStyle.transform = buildTransformString(cachedTransforms);
              }
            } else {
              if (tweenHadNoInlineValue) {
                targetStyle.removeProperty(toLowerCase(tweenProperty));
              } else {
                targetStyle[tweenProperty] = originalInlinedValue;
              }
            }
          }
        }
      }
      if (tweenTarget[isDomSymbol] && animation._tail === tween) {
        animation.targets.forEach(t => {
          if (t.getAttribute && t.getAttribute('style') === emptyString) {
            t.removeAttribute('style');
          }        });
      }
    });
  }
  return renderable;
};

/**
 * @template {Renderable} T
 * @param {T} renderable
 * @return {T}
 */
const cleanInlineStyles = renderable => revertValues(renderable, true);



/*
 * Base class to control framerate and playback rate.
 * Inherited by Engine, Timer, Animation and Timeline.
 */
class Clock {

  /** @param {Number} [initTime] */
  constructor(initTime = 0) {
    /** @type {Number} */
    this.deltaTime = 0;
    /** @type {Number} */
    this._currentTime = initTime;
    /** @type {Number} */
    this._lastTickTime = initTime;
    /** @type {Number} */
    this._startTime = initTime;
    /** @type {Number} */
    this._lastTime = initTime;
    /** @type {Number} */
    this._frameDuration = K / maxFps;
    /** @type {Number} */
    this._fps = maxFps;
    /** @type {Number} */
    this._speed = 1;
    /** @type {Boolean} */
    this._hasChildren = false;
    /** @type {Tickable|Tween} */
    this._head = null;
    /** @type {Tickable|Tween} */
    this._tail = null;
  }

  get fps() {
    return this._fps;
  }

  set fps(frameRate) {
    const fr = +frameRate;
    const fps = fr < minValue ? minValue : fr;
    const frameDuration = K / fps;
    if (fps > defaults.frameRate) defaults.frameRate = fps;
    this._fps = fps;
    this._frameDuration = frameDuration;
  }

  get speed() {
    return this._speed;
  }

  set speed(playbackRate) {
    const pbr = +playbackRate;
    this._speed = pbr < minValue ? minValue : pbr;
  }

  /**
   * @param  {Number} time
   * @return {tickModes}
   */
  requestTick(time) {
    const frameDuration = this._frameDuration;
    const elapsed = time - this._lastTickTime;
    const quarterFrame = frameDuration * .25;
    const tolerance = quarterFrame < 4 ? quarterFrame : 4;
    // Tick frames that arrive a little early so requestAnimationFrame jitter drops none.
    // Cap the tolerance at 4ms so it stays small at high fps.
    if (elapsed + tolerance < frameDuration) return tickModes.NONE;
    this._lastTickTime = elapsed >= frameDuration ? time - (elapsed % frameDuration) : time;
    return tickModes.AUTO;
  }

  /**
   * @param  {Number} time
   * @return {Number}
   */
  computeDeltaTime(time) {
    const delta = time - this._lastTime;
    this.deltaTime = delta;
    this._lastTime = time;
    return delta;
  }

}



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





const engineTickMethod = /*#__PURE__*/ (() => isBrowser ? requestAnimationFrame : setImmediate)();
const engineCancelMethod = /*#__PURE__*/ (() => isBrowser ? cancelAnimationFrame : clearImmediate)();

class Engine extends Clock {

  /** @param {Number} [initTime] */
  constructor(initTime) {
    super(initTime);
    this.useDefaultMainLoop = true;
    this.pauseOnDocumentHidden = true;
    /** @type {DefaultsParams} */
    this.defaults = defaults;
    // this.paused = isBrowser && doc.hidden ? true  : false;
    this.paused = true;
    /** @type {Number|NodeJS.Immediate} */
    this.reqId = 0;
  }

  update() {
    const time = this._currentTime = now();
    if (this.requestTick(time)) {
      this.computeDeltaTime(time);
      const engineSpeed = this._speed;
      const engineFps = this._fps;
      let activeTickable = /** @type {Tickable} */(this._head);
      while (activeTickable) {
        const nextTickable = activeTickable._next;
        if (!activeTickable.paused) {
          tick(
            activeTickable,
            (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
            0, // !muteCallbacks
            0, // !internalRender
            activeTickable._fps < engineFps ? activeTickable.requestTick(time) : tickModes.AUTO
          );
        } else {
          removeChild(this, activeTickable);
          this._hasChildren = !!this._tail;
          activeTickable._running = false;
          if (activeTickable.completed && !activeTickable._cancelled) {
            activeTickable.cancel();
          }
        }
        activeTickable = nextTickable;
      }
      additive.update();
    }
  }

  wake() {
    if (this.useDefaultMainLoop && !this.reqId) {
      // Imediatly request a tick to update engine._lastTickTime and get accurate offsetPosition calculation in timer.js
      this.requestTick(now());
      this.reqId = engineTickMethod(tickEngine);
    }
    return this;
  }

  pause() {
    if (!this.reqId) return;
    this.paused = true;
    engineCancelMethod(/** @type {NodeJS.Immediate & Number} */(this.reqId));
    this.reqId = 0;
    return this;
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    forEachChildren(this, (/** @type {Tickable} */child) => child.resetTime());
    return this.wake();
  }

  // Getter and setter for speed
  get speed() {
    return this._speed * (globals.timeScale === 1 ? 1 : K);
  }

  set speed(playbackRate) {
    const speed = playbackRate * globals.timeScale;
    if (this._speed === speed) return;
    this._speed = speed;
    forEachChildren(this, (/** @type {Tickable} */child) => child.speed = child._speed);
  }

  // Getter and setter for timeUnit
  get timeUnit() {
    return globals.timeScale === 1 ? 'ms' : 's';
  }

  set timeUnit(unit) {
    const secondsScale = 0.001;
    const isSecond = unit === 's';
    const newScale = isSecond ? secondsScale : 1;
    if (globals.timeScale !== newScale) {
      globals.timeScale = newScale;
      globals.tickThreshold = 200 * newScale;
      const scaleFactor = isSecond ? secondsScale : K;
      /** @type {Number} */
      (this.defaults.duration) *= scaleFactor;
      this._speed *= scaleFactor;
    }
  }

  // Getter and setter for precision
  get precision() {
    return globals.precision;
  }

  set precision(precision) {
    globals.precision = precision;
  }

}

const engine = /*#__PURE__*/(() => {
  const engine = new Engine(now());
  if (isBrowser) {
    globalVersions.engine = engine;
    doc.addEventListener('visibilitychange', () => {
      if (!engine.pauseOnDocumentHidden) return;
      doc.hidden ? engine.pause() : engine.resume();
    });
  }
  return engine;
})();

const tickEngine = () => {
  if (engine._head) {
    engine.reqId = engineTickMethod(tickEngine);
    engine.update();
  } else {
    engine.reqId = 0;
  }
};



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
    keyframe._isOverridden = overrideTypes.PERMANENT;
    // Set both times to minValue so a walk of simple tweens in progress stops writing the replaced tween.
    keyframe._changeDuration = keyframe._currentTime = minValue;
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
  const lookups = getReplaceLookups(target);
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
    } else if (/** @type {Tween} */(child)._isOverridden !== overrideTypes.PERMANENT) {
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

  if (tweenCompositionType === compositionTypes.replace) {

    // Read replace siblings from the target, a WeakMap scattered their tweens in memory when a hidden tab built them.
    const lookups = getReplaceLookups(tween.target);
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
        if (round$1(previousEndTime - (timeline || animation)._offset, 12) > 0) {
          overrideTween(prevSibling);
          if (!hasRenderingTweens(previous)) previous.cancel();
        }

      }

    }

  // Handle additive tweens composition

  } else if (tweenCompositionType === compositionTypes.blend) {

    addAdditiveTween(tween);

  }

};

/**
 * @param  {Tween} tween
 */
const removeTweenSliblings = tween => {
  const tweenComposition = tween._composition;
  if (tweenComposition === compositionTypes.replace) {
    const tweenProperty = tween.property;
    const replaceTargetProps = getReplaceLookups(tween.target);
    // Release only a replace tween, removing a blend tween from the lookups would disconnect an unrelated replace animation.
    // Release the property, the tween that this one replaced stays replaced.
    if (replaceTargetProps[tweenProperty] === tween) replaceTargetProps[tweenProperty] = null;
  } else if (tweenComposition === compositionTypes.blend) {
    removeAdditiveTween(tween);
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
  forEachChildren(animation, (/**@type {Tween} */tween) => {
    const tweenTarget = tween.target;
    if (targetsSet.has(tweenTarget)) {
      const tweenName = tween.property;
      const tweenType = tween._tweenType;
      if (!propertyName || sanitizePropertyName(propertyName, tweenTarget, tweenType) === tweenName) {
        // Removes the tween from the selected animation
        removeChild(animation, tween);
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
  const parent = /** @type {Renderable|typeof engine} **/(renderable ? renderable : engine);
  let removeMatches;
  if (parent._hasChildren) {
    let iterationDuration = 0;
    forEachChildren(parent, (/** @type {Renderable} */child) => {
      if (!child._hasChildren) {
        removeMatches = removeTargetsFromJSAnimation(targetsSet, /** @type {JSAnimation} */(child), propertyName);
        // Remove the child from its parent if no tweens and no children left after the removal
        if (removeMatches && !child._head) {
          child.cancel();
          removeChild(parent, child);
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
    if (!isUnd(/** @type {Renderable} */(parent).iterationDuration)) {
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







/**
 * @param  {Timer} timer
 * @return {Timer}
 */
const resetTimerProperties = timer => {
  timer.paused = true;
  timer.began = false;
  timer.completed = false;
  return timer;
};

/**
 * @param  {Timer} timer
 * @return {Timer}
 */
const reviveTimer = timer => {
  if (!timer._cancelled) return timer;
  if (timer._hasChildren) {
    forEachChildren(timer, reviveTimer);
    /** @type {Timeline} */(timer).rebuildTakeovers();
  } else {
    forEachChildren(timer, (/** @type {Tween} tween */tween) => {
      // Set NaN so a revived tween writes its value at the next render.
      // Keep the time of a blend tween that rests on one of its ends, its composition sets its number.
      if (tween._composition !== compositionTypes.blend || tween._currentTime > 0 && tween._currentTime < tween._changeDuration) tween._currentTime = NaN;
      if (tween._composition === compositionTypes.blend) {
        composeTween(tween);
      } else if (tween._composition === compositionTypes.replace && !timer.parent) {
        // Leave the replace tweens of a child to its timeline, which composes them again when it is revived.
        tween._isOverridden = overrideTypes.NONE;
        tween._changeDuration = tween._updateDuration;
        composeTween(tween);
      }
    });
  }
  timer._cancelled = 0;
  return timer;
};

let timerId = 0;

/** @param {Timer} prev @param {Timer} child */
const sortByPriority = (prev, child) => prev._priority > child._priority;

/**
 * Base class used to create Timers, Animations and Timelines
 */
class Timer extends Clock {
  /**
   * @param {TimerParams} [parameters]
   * @param {Timeline} [parent]
   * @param {Number} [parentPosition]
   */
  constructor(parameters = {}, parent = null, parentPosition = 0) {

    // Start _currentTime as negative zero so V8 stores it as a double, then reset it to zero for the public getters.
    // An integer start moves each timer to a new class at its first decimal time, which makes the reads in render megamorphic.
    super(-0);
    this._currentTime = 0;

    ++timerId;

    const {
      id,
      delay,
      duration,
      reversed,
      alternate,
      loop,
      loopDelay,
      autoplay,
      muted,
      frameRate,
      playbackRate,
      priority,
      onComplete,
      onLoop,
      onPause,
      onBegin,
      onBeforeUpdate,
      onUpdate,
    } = parameters;

    if (scope.current) scope.current.register(this);

    const timerInitTime = parent ? 0 : engine._lastTickTime;
    const timerDefaults = parent ? parent.defaults : globals.defaults;
    const timerDelay = /** @type {Number} */(isFnc(delay) || isUnd(delay) ? timerDefaults.delay : +delay);
    const timerDuration = isFnc(duration) || isUnd(duration) ? Infinity : +duration;
    const timerLoop = setValue(loop, timerDefaults.loop);
    const timerLoopDelay = setValue(loopDelay, timerDefaults.loopDelay);
    let timerIterationCount = timerLoop === true ||
                              timerLoop === Infinity ||
                              /** @type {Number} */(timerLoop) < 0 ? Infinity :
                              /** @type {Number} */(timerLoop) + 1;

    let offsetPosition = 0;

    if (parent) {
      offsetPosition = parentPosition;
    } else {
      // Make sure to tick the engine once if not currently running to get up to date engine._lastTickTime
      // to avoid big gaps with the following offsetPosition calculation
      if (!engine.reqId) engine.requestTick(now());
      // Make sure to scale the offset position with globals.timeScale to properly handle seconds unit
      offsetPosition = (engine._lastTickTime - engine._startTime) * globals.timeScale;
    }

    // Timer's parameters
    /** @type {String|Number} */
    this.id = !isUnd(id) ? id : timerId;
    /** @type {Timeline} */
    this.parent = parent;
    // Total duration of the timer
    this.duration = clampInfinity(((timerDuration + timerLoopDelay) * timerIterationCount) - timerLoopDelay) || minValue;
    /** @type {Boolean} */
    this.backwards = false;
    /** @type {Boolean} */
    this.paused = true;
    /** @type {Boolean} */
    this.muted = !!(parent && parent.muted) || !!setValue(muted, timerDefaults.muted);
    /** @type {Boolean} */
    this.began = false;
    /** @type {Boolean} */
    this.completed = false;
    /** @type {Callback<this>} */
    this.onBegin = onBegin || timerDefaults.onBegin;
    /** @type {Callback<this>} */
    this.onBeforeUpdate = onBeforeUpdate || timerDefaults.onBeforeUpdate;
    /** @type {Callback<this>} */
    this.onUpdate = onUpdate || timerDefaults.onUpdate;
    /** @type {Callback<this>} */
    this.onLoop = onLoop || timerDefaults.onLoop;
    /** @type {Callback<this>} */
    this.onPause = onPause || timerDefaults.onPause;
    /** @type {Callback<this>} */
    this.onComplete = onComplete || timerDefaults.onComplete;
    // Swap the callbacks for noop once so render and pause never test a mute flag.
    if (this.muted) this.onBegin = this.onBeforeUpdate = this.onUpdate = this.onLoop = this.onPause = this.onComplete = noop;
    /** @type {Number} */
    this.iterationDuration = timerDuration; // Duration of one loop
    /** @type {Number} */
    this.iterationCount = timerIterationCount; // Number of loops
    /** @type {Boolean|ScrollObserver} */
    this._autoplay = parent ? false : setValue(autoplay, timerDefaults.autoplay);
    /** @type {Number} */
    this._offset = offsetPosition;
    /** @type {Number} */
    this._delay = timerDelay;
    /** @type {Number} */
    this._loopDelay = timerLoopDelay;
    /** @type {Number} */
    this._iterationTime = 0;
    /** @type {Number} */
    this._currentIteration = 0; // Current loop index
    /** @type {Function} */
    this._resolve = noop; // Used by .then()
    /** @type {Boolean} */
    this._running = false;
    /** @type {Number} */
    this._reversed = +setValue(reversed, timerDefaults.reversed);
    /** @type {Number} */
    this._reverse = this._reversed;
    /** @type {Number} */
    this._cancelled = 0;
    /** @type {Boolean} */
    this._alternate = setValue(alternate, timerDefaults.alternate);
    /** @type {Renderable} */
    this._prev = null;
    /** @type {Renderable} */
    this._next = null;

    // Clock's parameters
    /** @type {Number} */
    this._lastTickTime = timerInitTime;
    /** @type {Number} */
    this._startTime = timerInitTime;
    /** @type {Number} */
    this._fps = setValue(frameRate, timerDefaults.frameRate);
    /** @type {Number} */
    this._speed = setValue(playbackRate, timerDefaults.playbackRate);
    /** @type {Number} */
    this._priority = +setValue(priority, 1);
  }

  get cancelled() {
    return !!this._cancelled;
  }

  set cancelled(cancelled) {
    cancelled ? this.cancel() : this.reset(true).play();
  }

  get currentTime() {
    return clamp$1(round$1(this._currentTime, globals.precision), -this._delay, this.duration);
  }

  set currentTime(time) {
    const paused = this.paused;
    // Pausing the timer is necessary to avoid time jumps on a running instance
    this.pause().seek(+time);
    if (!paused) this.resume();
  }

  get iterationCurrentTime() {
    return clamp$1(round$1(this._iterationTime, globals.precision), 0, this.iterationDuration);
  }

  set iterationCurrentTime(time) {
    this.currentTime = (this.iterationDuration * this._currentIteration) + time;
  }

  get progress() {
    return clamp$1(round$1(this._currentTime / this.duration, 10), 0, 1);
  }

  set progress(progress) {
    this.currentTime = this.duration * progress;
  }

  get iterationProgress() {
    return clamp$1(round$1(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }

  set iterationProgress(progress) {
    this.iterationCurrentTime = this.iterationDuration * progress;
  }

  get currentIteration() {
    return this._currentIteration;
  }

  set currentIteration(iterationCount) {
    this.currentTime = (this.iterationDuration * clamp$1(+iterationCount, 0, this.iterationCount - 1));
  }

  get reversed() {
    return !!this._reversed;
  }

  set reversed(reverse) {
    reverse ? this.reverse() : this.play();
  }

  get speed() {
    return super.speed;
  }

  set speed(playbackRate) {
    super.speed = playbackRate;
    this.resetTime();
  }

  /**
   * @param  {Boolean} [softReset]
   * @return {this}
   */
  reset(softReset = false) {
    // If cancelled, revive the timer before rendering in order to have propertly composed tweens siblings
    reviveTimer(this);
    if (this._reversed && !this._reverse) this.reversed = false;
    // Rendering before updating the completed flag to prevent skips and to make sure the properties are not overridden
    // Setting the iterationTime at the end to force the rendering to happend backwards, otherwise calling .reset() on Timelines might not render children in the right order
    // NOTE: This is only required for Timelines and might be better to move to the Timeline class?
    this._iterationTime = this.iterationDuration;
    // Set tickMode to tickModes.FORCE to force rendering
    tick(this, 0, 1, ~~softReset, tickModes.FORCE);
    // Reset timer properties after revive / render to make sure the props are not updated again
    resetTimerProperties(this);
    // Also reset children properties
    if (this._hasChildren) {
      forEachChildren(this, resetTimerProperties);
    }
    return this;
  }

  /**
   * @param  {Boolean} internalRender
   * @return {this}
   */
  init(internalRender = false) {
    this.fps = this._fps;
    this.speed = this._speed;
    // Manually calling .init() on timelines should render all children intial state
    // Forces all children to render once then render to 0 when reseted
    if (!internalRender && this._hasChildren) {
      tick(this, this.duration, 1, ~~internalRender, tickModes.FORCE);
    }
    this.reset(internalRender);
    // Make sure to set autoplay to false to child timers so it doesn't attempt to autoplay / link
    const autoplay = this._autoplay;
    if (autoplay === true) {
      this.resume();
    } else if (autoplay && !isUnd(/** @type {ScrollObserver} */(autoplay).linked)) {
      /** @type {ScrollObserver} */(autoplay).link(this);
    }
    return this;
  }

  /** @return {this} */
  resetTime() {
    const timeScale = 1 / (this._speed * engine._speed);
    // TODO: See if we can safely use engine._lastTickTime here
    // if (!engine.reqId) engine.requestTick(now())
    // this._startTime = engine._lastTickTime - (this._currentTime + this._delay) * timeScale;
    this._startTime = now() - (this._currentTime + this._delay) * timeScale;
    return this;
  }

  /** @return {this} */
  pause() {
    if (this.paused) return this;
    this.paused = true;
    this.onPause(this);
    return this;
  }

  /** @return {this} */
  resume() {
    if (!this.paused) return this;
    this.paused = false;
    // We can safely imediatly render a timer that has no duration and no children
    if (this.duration <= minValue && !this._hasChildren) {
      tick(this, minValue, 0, 0, tickModes.FORCE);
    } else {
      if (!this._running) {
        addChild(engine, this, sortByPriority);
        engine._hasChildren = true;
        this._running = true;
      }
      this.resetTime();
      // Forces the timer to advance by at least one frame when the next tick occurs
      this._startTime -= 12;
      engine.wake();
    }
    return this;
  }

  /** @return {this} */
  restart() {
    return this.reset().resume();
  }

  /**
   * @param  {Number} time
   * @param  {Boolean|Number} [muteCallbacks]
   * @param  {Boolean|Number} [internalRender]
   * @return {this}
   */
  seek(time, muteCallbacks = 0, internalRender = 0) {
    // Recompose the tween siblings in case the timer has been cancelled
    reviveTimer(this);
    // If you seek a completed animation, otherwise the next play will starts at 0
    // Keep it completed on a seek that stays at or past the end, so onComplete does not run again.
    if (time < this.duration) this.completed = false;
    const isPaused = this.paused;
    this.paused = true;
    // Give a child that seeks alone the properties that it owns at this time in its timeline.
    if (this.parent && !internalRender) /** @type {Timeline} */(this.parent).updateTakeovers(this._offset + (time + this._delay) / this._speed);
    // timer, time, muteCallbacks, internalRender, tickMode
    tick(this, time + this._delay, ~~muteCallbacks, ~~internalRender, tickModes.AUTO);
    return isPaused ? this : this.resume();
  }

  /** @return {this} */
  alternate() {
    const reversed = this._reversed;
    const count = this.iterationCount;
    const duration = this.iterationDuration;
    // Calculate the maximum iterations possible given the iteration duration
    const iterations = count === Infinity ? floor(maxValue / duration) : count;
    this._reversed = +(this._alternate && !(iterations % 2) ? reversed : !reversed);
    if (count === Infinity) {
      // Handle infinite loops to loop on themself
      this.iterationProgress = this._reversed ? 1 - this.iterationProgress : this.iterationProgress;
    } else {
      this.seek((duration * iterations) - this._currentTime);
    }
    this.resetTime();
    return this;
  }

  /** @return {this} */
  play() {
    if (this._reversed) this.alternate();
    return this.resume();
  }

  /** @return {this} */
  reverse() {
    if (!this._reversed) this.alternate();
    return this.resume();
  }

  // TODO: Move all the animation / tweens / children related code to Animation / Timeline

  /** @return {this} */
  cancel() {
    // Skip the removal when already cancelled, the tweens already left their lookups.
    if (this._cancelled) return this.pause();
    if (this._hasChildren) {
      forEachChildren(this, (/** @type {Renderable} */child) => child.cancel(), true);
    } else {
      forEachChildren(this, removeTweenSliblings);
    }
    this._cancelled = 1;
    // Pausing the timer removes it from the engine
    return this.pause();
  }

  /**
   * @param  {Number} newDuration
   * @param  {Boolean} [isParentStretch]
   * @return {this}
   */
  stretch(newDuration, isParentStretch) {
    const currentDuration = this.duration;
    const normlizedDuration = normalizeTime(newDuration);
    if (currentDuration === normlizedDuration) return this;
    const timeScale = newDuration / currentDuration;
    this.duration = normlizedDuration;
    this.iterationDuration = normalizeTime(this.iterationDuration * timeScale);
    // Scale the time of the last render, so the next render compares times of the same scale.
    this._currentTime *= timeScale;
    // Scale the position of a child of a stretched timeline, a timer that stretches alone keeps its start.
    if (isParentStretch) this._offset *= timeScale;
    this._delay *= timeScale;
    this._loopDelay *= timeScale;
    // Update the timeline of a child that stretches alone, a stretched timeline updates itself after its children.
    if (this.parent && !isParentStretch) /** @type {Timeline} */(this.parent).updateStretchedChild();
    return this;
  }

 /**
   * Cancels the timer by seeking it back to 0 and reverting the attached scroller if necessary
   * @param {Boolean} [render] Pass false to skip the seek to 0 and leave the clock where it is
   * @return {this}
   */
  revert(render = true) {
    if (render) tick(this, 0, 1, 0, tickModes.AUTO);
    const ap = /** @type {ScrollObserver} */(this._autoplay);
    if (ap && ap.linked && ap.linked === this) ap.revert();
    return this.cancel();
  }

 /**
   * Imediatly completes the timer, cancels it and triggers the onComplete callback
   * @param  {Boolean|Number} [muteCallbacks]
   * @return {this}
   */
  complete(muteCallbacks = 0) {
    return this.seek(this.duration, muteCallbacks).cancel();
  }

  // Define then as a getter so getCompletionThen can hide it during resolution without a field on each Timer.
  /** @return {<T = Omit<this, 'then'>>(callback?: (this: void, self: Omit<this, 'then'>) => T) => Promise<Awaited<T>>} */
  get then() {
    return /** @type {any} */(getCompletionThen(this));
  }

}

/**
 * @param {TimerParams} [parameters]
 * @return {Timer}
 */
const createTimer = parameters => new Timer(parameters, null, 0).init();

const angleUnitsMap = { 'deg': 1, 'rad': 180 / PI, 'turn': 360 };
const convertedValuesCache = {};



/**
 * @param  {DOMTarget} el
 * @param  {Number} currentNumber
 * @param  {String} currentUnit
 * @param  {String} unit
 * @param  {valueTypes} type
 * @param  {Boolean} [force]
 * @return {Number}
 */
const convertValueUnit = (el, currentNumber, currentUnit, unit, type, force = false) => {
  if (type === valueTypes.UNIT && currentUnit === unit) { // TODO: Check if checking against the same unit string is necessary
    return currentNumber;
  }
  const cachedKey = currentNumber + currentUnit + unit;
  const cached = convertedValuesCache[cachedKey];
  if (!isUnd(cached) && !force) {
    return cached;
  } else {
    let convertedValue;
    if (currentUnit in angleUnitsMap) {
      convertedValue = currentNumber * angleUnitsMap[currentUnit] / angleUnitsMap[unit];
    } else {
      const baseline = 100;
      const tempEl = /** @type {DOMTarget} */(el.cloneNode());
      const parentNode = el.parentNode;
      const parentEl = (parentNode && (parentNode !== doc)) ? parentNode : doc.body;
      parentEl.appendChild(tempEl);
      const elStyle = tempEl.style;
      elStyle.width = baseline + currentUnit;
      const currentUnitWidth = /** @type {HTMLElement} */(tempEl).offsetWidth || baseline;
      elStyle.width = baseline + unit;
      const newUnitWidth = /** @type {HTMLElement} */(tempEl).offsetWidth || baseline;
      const factor = currentUnitWidth / newUnitWidth;
      parentEl.removeChild(tempEl);
      convertedValue = factor * currentNumber;
    }
    convertedValuesCache[cachedKey] = convertedValue;
    return convertedValue;
  }
};



/** @type {EasingFunction} */
const none = t => t;



/** @type {PowerEasing} */
const easeInPower = (p = 1.68) => t => pow(t, +p);

/**
 * @callback EaseType
 * @param {EasingFunction} Ease
 * @return {EasingFunction}
 */

/** @type {Record<String, EaseType>} */
const easeTypes = {
  in: easeIn => t => easeIn(t),
  out: easeIn => t => 1 - easeIn(1 - t),
  inOut: easeIn => t => t < .5 ? easeIn(t * 2) / 2 : 1 - easeIn(t * -2 + 2) / 2,
  outIn: easeIn => t => t < .5 ? (1 - easeIn(1 - t * 2)) / 2 : (easeIn(t * 2 - 1) + 1) / 2,
};

/**
 * Easing functions adapted and simplified from https://robertpenner.com/easing/
 * (c) 2001 Robert Penner
 */

const halfPI = PI / 2;
const doublePI = PI * 2;

/** @type {Record<String, EasingFunctionWithParams|EasingFunction>} */
const easeInFunctions = {
  [emptyString]: easeInPower,
  Quad: easeInPower(2),
  Cubic: easeInPower(3),
  Quart: easeInPower(4),
  Quint: easeInPower(5),
  /** @type {EasingFunction} */
  Sine: t => 1 - cos(t * halfPI),
  /** @type {EasingFunction} */
  Circ: t => 1 - sqrt(1 - t * t),
  /** @type {EasingFunction} */
  Expo: t => t ? pow(2, 10 * t - 10) : 0,
  /** @type {EasingFunction} */
  Bounce: t => {
    let pow2, b = 4;
    while (t < ((pow2 = pow(2, --b)) - 1) / 11);
    return 1 / pow(4, 3 - b) - 7.5625 * pow((pow2 * 3 - 2) / 22 - t, 2);
  },
  /** @type {BackEasing} */
  Back: (overshoot = 1.7) => t => (+overshoot + 1) * t * t * t - +overshoot * t * t,
  /** @type {ElasticEasing} */
  Elastic: (amplitude = 1, period = .3) => {
    const a = clamp$1(+amplitude, 1, 10);
    const p = clamp$1(+period, minValue, 2);
    const s = (p / doublePI) * asin(1 / a);
    const e = doublePI / p;
    return t => t === 0 || t === 1 ? t : -a * pow(2, -10 * (1 - t)) * sin(((1 - t) - s) * e);
  }
};

/**
 * @typedef  {Object} EasesFunctions
 * @property {EasingFunction} linear
 * @property {EasingFunction} none
 * @property {PowerEasing} in
 * @property {PowerEasing} out
 * @property {PowerEasing} inOut
 * @property {PowerEasing} outIn
 * @property {EasingFunction} inQuad
 * @property {EasingFunction} outQuad
 * @property {EasingFunction} inOutQuad
 * @property {EasingFunction} outInQuad
 * @property {EasingFunction} inCubic
 * @property {EasingFunction} outCubic
 * @property {EasingFunction} inOutCubic
 * @property {EasingFunction} outInCubic
 * @property {EasingFunction} inQuart
 * @property {EasingFunction} outQuart
 * @property {EasingFunction} inOutQuart
 * @property {EasingFunction} outInQuart
 * @property {EasingFunction} inQuint
 * @property {EasingFunction} outQuint
 * @property {EasingFunction} inOutQuint
 * @property {EasingFunction} outInQuint
 * @property {EasingFunction} inSine
 * @property {EasingFunction} outSine
 * @property {EasingFunction} inOutSine
 * @property {EasingFunction} outInSine
 * @property {EasingFunction} inCirc
 * @property {EasingFunction} outCirc
 * @property {EasingFunction} inOutCirc
 * @property {EasingFunction} outInCirc
 * @property {EasingFunction} inExpo
 * @property {EasingFunction} outExpo
 * @property {EasingFunction} inOutExpo
 * @property {EasingFunction} outInExpo
 * @property {EasingFunction} inBounce
 * @property {EasingFunction} outBounce
 * @property {EasingFunction} inOutBounce
 * @property {EasingFunction} outInBounce
 * @property {BackEasing} inBack
 * @property {BackEasing} outBack
 * @property {BackEasing} inOutBack
 * @property {BackEasing} outInBack
 * @property {ElasticEasing} inElastic
 * @property {ElasticEasing} outElastic
 * @property {ElasticEasing} inOutElastic
 * @property {ElasticEasing} outInElastic
 */

/**
 * The built in easing functions, used by name like eases.outQuad or called like eases.out(2). The
 * standalone easings spring, cubicBezier, steps, irregular and linear are imported individually.
 * @type {EasesFunctions}
 */
const eases = (/*#__PURE__ */ (() => {
  /** @type {Record<String, Function>} */
  const list = { linear: none, none: none };
  for (let type in easeTypes) {
    for (let name in easeInFunctions) {
      const easeIn = easeInFunctions[name];
      const easeType = easeTypes[type];
      // Wrap the factory eases for the editor, the wrapper runs at the call so the curve stays raw.
      // Use the plain eases directly so they stay raw.
      list[type + name] = /** @type {EasingFunctionWithParams|EasingFunction} */(
        name === emptyString || name === 'Back' || name === 'Elastic' ?
        makeTweakable('Ease', type + name, (a, b) => easeType(/** @type {EasingFunctionWithParams} */(easeIn)(a, b))) :
        easeType(/** @type {EasingFunction} */(easeIn))
      );
    }
  }
  return /** @type {EasesFunctions} */(list);
})());

/** @type {Record<String, EasingFunction>} */
const easesLookups = { linear: none, none: none };

/**
 * @param  {String} string
 * @return {EasingFunction}
 */
const parseEaseString = (string) => {
  if (easesLookups[string]) return easesLookups[string];
  if (string.indexOf('(') <= -1) {
    const hasParams = easeTypes[string] || string.includes('Back') || string.includes('Elastic');
    const parsedFn = /** @type {EasingFunction} */(hasParams ? /** @type {EasingFunctionWithParams} */(eases[string])() : eases[string]);
    return parsedFn ? easesLookups[string] = parsedFn : none;
  } else {
    const split = string.slice(0, -1).split('(');
    const parsedFn = /** @type {EasingFunctionWithParams} */(eases[split[0]]);
    return parsedFn ? easesLookups[string] = parsedFn(...split[1].split(',')) : none;
  }
};

const deprecated = ['steps(', 'irregular(', 'linear(', 'cubicBezier('];

/**
 * @param  {EasingParam} ease
 * @return {EasingFunction}
 */
const parseEase = ease => {
  if (isStr(ease)) {
    for (let i = 0, l = deprecated.length; i < l; i++) {
      if (stringStartsWith(ease, deprecated[i])) {
        console.warn(`String syntax for \`ease: "${ease}"\` has been removed from the core and replaced by importing and passing the easing function directly: \`ease: ${ease}\``);
        return none;
      }
    }
  }
  const easeFunc = isFnc(ease) ? ease : isStr(ease) ? parseEaseString(/** @type {String} */(ease)) : none;
  return easeFunc;
};



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
};

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
};

class JSAnimation extends Timer {
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
            const tweenUpdateDuration = round$1(+tweenDuration || minValue, 12);

            // Resolve the adapter setter once so render skips the lookup per frame.
            const tweenSetter = adapterProp ? adapterProp.set : null;

            // Rounding is necessary here to minimize floating point errors when working in seconds
            lastTweenChangeEndTime = round$1(tweenStartTime + tweenUpdateDuration, 12);

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
            };

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
                tween._value = `rgba(${round$1(tweenModifier(toNumbers[0]), 0)},${round$1(tweenModifier(toNumbers[1]), 0)},${round$1(tweenModifier(toNumbers[2]), 0)},${tweenModifier(toNumbers[3])})`;
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
const animate = (targets, parameters) => {
  if (globals.editor) {
    return globals.editor.addAnimation(targets, parameters);
  } else {
    return new JSAnimation(targets, parameters).init();
  }
};





/**
 * @param {Timeline} timeline
 * @param {Number} [duration]
 */
const updateTimelineDuration = (timeline, duration) => {
  if (isUnd(duration)) {
    duration = 0;
    for (let child = /** @type {Renderable} */(timeline._head); child; child = child._next) {
      const end = child._offset + child._delay + child.duration;
      if (end > duration) duration = end;
    }
  }
  timeline.iterationDuration = duration;
  timeline.duration = clampInfinity(((duration + timeline._loopDelay) * timeline.iterationCount) - timeline._loopDelay) || minValue;
  if (timeline.parent) updateTimelineDuration(timeline.parent);
};

/**
 * Timeline's children offsets positions parser
 * @param  {Timeline} timeline
 * @param  {String} timePosition
 * @return {Number}
 */
const getPrevChildOffset = (timeline, timePosition) => {
  if (stringStartsWith(timePosition, '<')) {
    const goToPrevAnimationOffset = timePosition[1] === '<';
    const prevAnimation = /** @type {Tickable} */(timeline._tail);
    const prevOffset = prevAnimation ? prevAnimation._offset + prevAnimation._delay : 0;
    return goToPrevAnimationOffset ? prevOffset : prevOffset + prevAnimation.duration;
  }
};

/**
 * @param  {Timeline} timeline
 * @param  {TimelinePosition} [timePosition]
 * @return {Number}
 */
const parseTimelinePosition = (timeline, timePosition) => {
  let tlDuration = timeline.iterationDuration;
  if (tlDuration === minValue) tlDuration = 0;
  if (isUnd(timePosition)) return tlDuration;
  if (isNum(+timePosition)) return +timePosition;
  const timePosStr = /** @type {String} */(timePosition);
  const tlLabels = timeline ? timeline.labels : null;
  const hasLabels = !isNil(tlLabels);
  const prevOffset = getPrevChildOffset(timeline, timePosStr);
  const hasSibling = !isUnd(prevOffset);
  const matchedRelativeOperator = relativeValuesExecRgx.exec(timePosStr);
  if (matchedRelativeOperator) {
    const fullOperator = matchedRelativeOperator[0];
    const split = timePosStr.split(fullOperator);
    const labelOffset = hasLabels && split[0] ? tlLabels[split[0]] : tlDuration;
    const parsedOffset = hasSibling ? prevOffset : hasLabels ? labelOffset : tlDuration;
    const parsedNumericalOffset = +split[1];
    return getRelativeValue(parsedOffset, parsedNumericalOffset, fullOperator[0]);
  } else {
    return hasSibling ? prevOffset :
           hasLabels ? !isUnd(tlLabels[timePosStr]) ? tlLabels[timePosStr] :
           tlDuration : tlDuration;
  }
};



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
};

/**
 * Moves the properties of a timeline to the tweens that own them at a time.
 * @param {Timeline} timeline
 * @param {Number} time
 */
const updateTimelineTakeovers = (timeline, time) => {
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
};

/**
 * Composes the values of a timeline child at a time of its timeline, without a write, for a new child that reads them.
 * @param {JSAnimation} animation
 * @param {JSAnimation} newAnimation
 * @param {Number} time
 */
const sampleAnimation = (animation, newAnimation, time) => {
  // Compose the values once for all the tweens of the new child that read them at the same time.
  if (sampledAnimation !== animation || sampledBy !== newAnimation || sampledTime !== time) {
    restoreSampledAnimation();
    sampledAnimation = animation;
    sampledBy = newAnimation;
    sampledTime = time;
    sampledAnimationTime = animation._currentTime;
    render(animation, (time - animation._offset) * animation._speed, 1, 1, tickModes.FORCE);
  }
};

/**
 * Puts the child that a new child sampled back at its own time.
 */
const restoreSampledAnimation = () => {
  if (sampledAnimation) {
    render(sampledAnimation, sampledAnimationTime, 1, 1, tickModes.FORCE);
    sampledAnimation = null;
  }
};

/**
 * Removes the takeover of a tween that is replaced for good.
 * @param {Tween} tween The first keyframe of a property
 */
const removeTimelineTakeover = tween => {
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
};

/**
 * Returns the tween that a new tween of a child takes its property from, and replaces the tweens of the timeline that take over later.
 * @param  {Tween} sibling The last tween of the timeline that took the property
 * @param  {JSAnimation} animation
 * @param  {Number} tweenStartTime
 * @return {Tween}
 */
const getPreviousTimelineSibling = (sibling, animation, tweenStartTime) => {
  // Cut in at the position of the new animation, or at the start of the new tween with a negative delay.
  const cutTime = animation._offset + Math.min(tweenStartTime / animation._speed, 0);
  while (sibling) {
    sibling = getFirstKeyframe(sibling);
    const siblingAnimation = sibling.parent;
    const siblingStartTime = siblingAnimation._offset + (siblingAnimation._delay + sibling._startTime) / siblingAnimation._speed;
    // Keep a sibling that has time to change before the cut, a from value still shows at its start.
    if (round$1(cutTime - siblingStartTime, 12) >= (sibling._fromFunc ? 0 : minValue)) break;
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
};

/**
 * Records where a new tween of a child takes its property from the tween of an earlier child.
 * @param {Tween} tween
 * @param {Tween} prevSibling
 * @param {Number} tweenStartTime
 */
const composeTimelineTween = (tween, prevSibling, tweenStartTime) => {
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
    const changeDuration = round$1(cutIterationTime - keyframe._startTime, 12);
    if (changeDuration < keyframe._changeDuration) {
      keyframe._changeDuration = changeDuration > 0 ? changeDuration : 0;
      // A truncated tween clamps to its own change duration, so its animation stops sharing one progress.
      prevAnimation._hasSharedProgress = false;
    }
  }
  prevAnimation._hasSimpleTweens = false;
};

/**
 * Renders a child that took a property in this frame and did not write it, its time stays past its end or before its start.
 * @param  {Number} muteCallbacks
 * @return {Number} The number of rendered children
 */
const renderChangedOwners = muteCallbacks => {
  let hasRendered = 0;
  while (changedOwners.length) {
    const owner = changedOwners.pop();
    const ownerAnimation = owner.parent;
    if (isNaN(owner._currentTime) && !owner._isOverridden) {
      hasRendered += render(ownerAnimation, ownerAnimation._currentTime + ownerAnimation._delay, muteCallbacks, 0, tickModes.FORCE);
    }
  }
  return hasRendered;
};

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
};

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
};

/**
 * Builds the takeovers of a timeline again from its children, after a child stretches, leaves or comes back.
 * @param {Timeline} timeline
 */
const rebuildTimelineTakeovers = timeline => {
  timeline._takeovers.length = timeline._takeoverIndex = 0;
  forEachChildren(timeline, (/** @type {JSAnimation} */child) => forEachChildren(child, releaseTimelineTween));
  forEachChildren(timeline, (/** @type {JSAnimation} */child) => forEachChildren(child, recomposeTimelineTween));
};





/**
 * @overload
 * @param  {TimerParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @return {Timer|JSAnimation}
 *
 * @overload
 * @param  {AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} targets
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 * @return {Timer|JSAnimation}
 *
 * @param  {TimerParams|AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} [targets]
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 */
function addTlChild(childParams, tl, timePosition, targets, index, allTargets) {
  const isSetter = isNum(childParams.duration) && /** @type {Number} */(childParams.duration) <= minValue;
  // Offset the tl position with -minValue for 0 duration animations or .set() calls in order to align their end value with the defined position
  const adjustedPosition = isSetter ? timePosition - minValue : timePosition;
  const tlChild = targets ?
    new JSAnimation(targets,/** @type {AnimationParams} */(childParams), tl, adjustedPosition, false, index, allTargets) :
    new Timer(/** @type {TimerParams} */(childParams), tl, adjustedPosition);
  restoreSampledAnimation();
  if (tl.composition) tlChild.init(true);
  // Render the from value of a tween that owns its property first, so it shows before the timeline reaches it.
  for (let tween = targets ? /** @type {JSAnimation} */(tlChild)._head : null; tween; tween = tween._next) {
    if (tween._fromFunc && !tween._isOverridden && tween._keyStart === -Infinity) {
      render(tlChild, 0, 1, 0, tickModes.FORCE);
      break;
    }
  }
  // TODO: Might be better to insert at a position relative to startTime?
  addChild(tl, tlChild);
  updateTimelineDuration(tl, Math.max(tl.iterationDuration, tlChild._offset + tlChild._delay + tlChild.duration));
  return tlChild;
}

/**
 * The first add starts the timeline, and an add after the timeline began plays it again from the start.
 * An init on every add rendered all the children each time, 50 times slower to add 1,000 children.
 * A stagger position adds one child per target, so the first add can leave more than one child.
 * @param {Timeline} tl
 * @param {Timer|null} [firstAdded]
 */
function initAfterAdd(tl, firstAdded) {
  if (tl.composition && (tl.began || tl._head === firstAdded)) tl.init(true);
}

/**
 * Adds an animation without the editor registration hook.
 * @param {Timeline} tl
 * @param {TargetsParam} targets
 * @param {AnimationParams} childParams
 * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} position
 * @param {Timer[]} [added]
 * @return {Timer|null} The first added child
 */
function addTlAnimation(tl, targets, childParams, position, added) {
  // Expand a function position to one child per target, a tagged stagger resolves itself.
  const staggeredPosition = isFnc(position) ? position : null;
  if (staggeredPosition) {
    const parsedTargetsArray = parseTargets(targets);
    // Store initial duration before adding new children that will change the duration
    const tlDuration = tl.duration;
    // Store initial _iterationDuration before adding new children that will change the duration
    const tlIterationDuration = tl.iterationDuration;
    // Store the original id in order to add specific indexes to the new animations ids
    const id = childParams.id;
    let i = 0;
    // Stays null without targets, the empty timeline then starts as before.
    let firstAdded = null;
    parsedTargetsArray.forEach((/** @type {Target} */target) => {
      // Create a new parameter object for each staggered children
      const staggeredChildParams = { ...childParams };
      // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
      tl.duration = tlDuration;
      tl.iterationDuration = tlIterationDuration;
      if (!isUnd(id)) staggeredChildParams.id = id + '-' + i;
      const staggeredTimePosition = parseTimelinePosition(tl, staggeredPosition(target, i, parsedTargetsArray, null, tl));
      const child = addTlChild(
        staggeredChildParams,
        tl,
        staggeredTimePosition,
        target,
        i,
        parsedTargetsArray,
      );
      if (added) added.push(child);
      if (!i) firstAdded = child;
      i++;
    });
    // Scan the duration once at the end, position callbacks ran on the original duration and can stretch or add children.
    updateTimelineDuration(tl);
    return firstAdded;
  } else {
    // A tweak register position resolves to its default value
    const resolvedPosition = position && /** @type {TweakRegister} */(position).type ? /** @type {TweakRegister} */(position).defaultValue : position;
    const child = addTlChild(
      childParams,
      tl,
      parseTimelinePosition(tl, resolvedPosition),
      targets,
    );
    if (added) added.push(child);
    return child;
  }
}

/**
 * Adds one synced child.
 * @param {Timeline} tl
 * @param {Tickable|WAAPIAnimation|globalThis.Animation} child
 * @param {TimelinePosition|StaggerFunction<Number|String>} position
 * @param {Boolean} muted
 * @param {String|Number} [id]
 * @param {Timer[]} [added]
 */
function syncChild(tl, child, position, muted, id, added) {
  if (isUnd(child) || child && isUnd(child.pause)) return;
  muted = tl.muted || setValue(muted, tl.defaults.muted);
  if (!muted) child.pause();
  const duration = +(/** @type {globalThis.Animation} */(child).effect ? /** @type {globalThis.Animation} */(child).effect.getTiming().duration : /** @type {Tickable} */(child).duration);
  // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
  if (!muted && !isUnd(/** @type {WAAPIAnimation} */(child).persist)) /** @type {WAAPIAnimation} */(child).persist = true;
  tl._hasChildren = true;
  initAfterAdd(tl, addTlAnimation(tl, child, { id, muted, currentTime: [0, duration], duration, delay: 0, ease: 'linear', playbackEase: 'linear' }, position, added));
}

/**
 * Adds a timer without the editor registration hook.
 * @param {Timeline} tl
 * @param {TimerParams} parameters
 * @param {TimelinePosition} position
 */
function addTlTimer(tl, parameters, position) {
  tl._hasChildren = true;
  const child = addTlChild(parameters, tl, parseTimelinePosition(tl, position));
  initAfterAdd(tl, child);
  return child;
}

let TLId = 0;

class Timeline extends Timer {

  /**
   * @param {TimelineParams} [parameters]
   */
  constructor(parameters = {}) {
    super(/** @type {TimerParams&TimelineParams} */(parameters), null, 0);
    /** @type {Tickable} */
    this._head;
    /** @type {Tickable} */
    this._tail;
    ++TLId;
    /** @type {String|Number} */
    this.id = !isUnd(parameters.id) ? parameters.id : TLId;
    /** @type {Number} */
    this.duration = 0; // TL duration starts at 0 and grows when adding children
    /** @type {Record<String, Number>} */
    this.labels = Object.create(null);
    const defaultsParams = parameters.defaults;
    const globalDefaults = globals.defaults;
    /** @type {DefaultsParams} */
    this.defaults = defaultsParams ? mergeObjects(defaultsParams, globalDefaults) : globalDefaults;
    /** @type {Boolean} */
    this.composition = setValue(parameters.composition, true);
    // Swap onRender for noop once so render never tests a mute flag.
    /** @type {Callback<this>} */
    this.onRender = this.muted ? noop : parameters.onRender || globalDefaults.onRender;
    const tlPlaybackEase = setValue(parameters.playbackEase, globalDefaults.playbackEase);
    this._ease = tlPlaybackEase ? parseEase(tlPlaybackEase) : null;
    /** @type {Array<Takeover>} */
    this._takeovers = [];
    /** @type {Number} */
    this._takeoverIndex = 0;
    /** @type {Number} */
    this.iterationDuration = 0;
  }

  /**
   * @overload
   * @param {TargetsParam} a1
   * @param {AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [a3]
   * @return {this}
   *
   * @overload
   * @param {TimerParams} a1
   * @param {TimelinePosition} [a2]
   * @return {this}
   *
   * @param {TargetsParam|TimerParams} a1
   * @param {TimelinePosition|AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [a3]
   */
  add(a1, a2, a3) {
    const isAnim = isObj(a2);
    const isTimer = isObj(a1);
    if (isAnim || isTimer) {
      this._hasChildren = true;
      if (isAnim) {
        const childParams = /** @type {AnimationParams} */(a2);
        const editorHook = globals.editor && globals.editor.addTimelineChild;
        // Let the editor add the child from its records when it answers true, its builder calls addTlAnimation itself.
        if (editorHook && editorHook(this, /** @type {TargetsParam} */(a1), childParams, a3, (targets, params, position) => {
          const added = [];
          initAfterAdd(this, addTlAnimation(this, targets, params, position, added));
          return added;
        })) return this;
        initAfterAdd(this, addTlAnimation(this, /** @type {TargetsParam} */(a1), childParams, a3));
      } else {
        // It's a Timer
        const editorHook = globals.editor && globals.editor.addTimelineTimer;
        const timerPosition = /** @type {TimelinePosition} */(a2);
        if (editorHook) editorHook(a1, timerPosition, this, (params, position = timerPosition) => [addTlTimer(this, params, position)]);
        else addTlTimer(this, /** @type {TimerParams} */(a1), timerPosition);
      }
      return this;
    }
  }

  /**
   * Schedules a timer or animation on this timeline. Pass a target, an array of targets,
   * or an object with `target`, optional `id`, and optional `muted` properties.
   * @param {TimelineSyncTarget|Array<TimelineSyncTarget>|TimelineSyncParams} [synced]
   * @param {TimelinePosition|StaggerFunction<Number|String>} [position]
   * @return {this}
   */
  sync(synced, position) {
    const parameters = /** @type {TimelineSyncParams} */(
      isObj(synced) && Object.hasOwn(synced, 'target') && !isFnc(/** @type {TimelineSyncTarget} */(synced).pause)
        ? synced : { target: synced }
    );
    const target = parameters.target;
    const multiple = isArr(target);
    if (isUnd(target) || !multiple && target && isUnd(target.pause)) return this;
    /**
     * @param {TimelinePosition|StaggerFunction<Number|String>} resolved
     * @param {TimelineSyncParams} [options]
     */
    const build = (resolved, options = parameters) => {
      /** @type {Timer[]} */
      const added = [];
      if (multiple) {
        const children = /** @type {Array<Tickable|WAAPIAnimation|globalThis.Animation>} */(target);
        // Resolve a function position per synced child against this timeline.
        for (let i = 0, l = children.length; i < l; i++) {
          const child = /** @type {Tickable} */(children[i]);
          const childPosition = /** @type {TimelinePosition} */(isFnc(resolved) ? resolved(child, i, children, null, this) : resolved);
          syncChild(this, child, childPosition, options.muted, undefined, added);
        }
      } else {
        syncChild(this, /** @type {Tickable|WAAPIAnimation|globalThis.Animation} */(target), resolved, options.muted, options.id, added);
      }
      return added;
    };
    const editor = globals.editor;
    const syncHook = editor && editor.addTimelineSync;
    if (syncHook) syncHook(target, parameters, position, this, build);
    else build(position);
    return this;
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {AnimationParams} parameters
   * @param  {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [position]
   * @return {this}
   */
  set(targets, parameters, position) {
    if (isUnd(parameters)) return this;
    parameters.duration = minValue;
    parameters.composition = compositionTypes.replace;
    return this.add(targets, parameters, position);
  }

  /**
   * Schedules a callback at a timeline position. Pass a callback directly or an object
   * with `callback`, optional `id`, and optional `muted` properties.
   * @param {Callback<this, void>|TimelineCallParams<this>} callback
   * @param {TimelinePosition} [position]
   * @return {this}
   */
  call(callback, position) {
    const parameters = /** @type {TimelineCallParams<this>} */(isObj(callback) ? callback : {});
    const onComplete = isFnc(callback) ? callback : parameters.callback;
    if (!isFnc(onComplete)) return this;
    /**
     * @param {TimelinePosition} resolved
     * @param {TimelineMarkerParams} [options]
     */
    const build = (resolved, options = parameters) => [addTlTimer(this, {
      id: options.id, muted: options.muted, duration: 0, delay: 0, onComplete: () => onComplete(this),
    }, resolved)];
    const editor = globals.editor;
    if (editor && editor.addTimelineCall) editor.addTimelineCall(onComplete, parameters, position, this, build);
    else build(position);
    return this;
  }

  /**
   * Names a timeline position for use in later additions. Reusing a name updates its position.
   * @param {String} labelName
   * @param {TimelinePosition} [position]
   * @return {this}
   */
  label(labelName, position) {
    if (isUnd(labelName) || labelName && !isStr(labelName)) return this;
    const editor = globals.editor;
    if (editor && editor.addTimelineLabel) position = editor.addTimelineLabel(labelName, position, this);
    this.labels[labelName] = parseTimelinePosition(this, position);
    return this;
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {String} [propertyName]
   * @return {this}
   */
  remove(targets, propertyName) {
    removeTargetsFromRenderable(parseTargets(targets), this, propertyName);
    // Rebuild the takeovers when the removal can change which child owns a shared property.
    // A rebuild on every removal made remove 2.3 times slower on 1,000 children.
    if (this._takeovers.length) rebuildTimelineTakeovers(this);
    return this;
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
    const labels = this.labels;
    forEachChildren(this, (/** @type {JSAnimation} */child) => child.stretch(child.duration * timeScale, true));
    for (let labelName in labels) labels[labelName] *= timeScale;
    for (let i = 0, takeovers = this._takeovers, l = takeovers.length; i < l; i++) takeovers[i].time *= timeScale;
    return super.stretch(newDuration, isParentStretch);
  }

  // The core reaches the timeline code through these methods so an import of animate alone leaves it out.

  /**
   * @internal
   * @param {Number} time
   * @param {Number} muteCallbacks
   * @param {Number} internalRender
   * @param {tickModes} tickMode
   * @param {Number} previousIteration The iteration of the timeline before its own render
   */
  renderChildren(time, muteCallbacks, internalRender, tickMode, previousIteration) {
    const tlIsRunningBackwards = this.backwards;
    const tlChildrenTime = internalRender ? time : this._iterationTime;
    const tlChildrenTickTime = now();

    let tlChildrenHasRendered = 0;
    let tlChildrenHaveCompleted = true;

    // If the timeline has looped forward, we need to manually triggers children skipped callbacks
    if (!internalRender && this._currentIteration !== previousIteration) {
      const tlIterationDuration = this.iterationDuration;
      forEachChildren(this, (/** @type {JSAnimation} */child) => {
        if (!tlIsRunningBackwards) {
          // Force a render to trigger the callbacks and write the end values if the child has not completed on loop
          if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
            render(child, tlIterationDuration, muteCallbacks, 0, tickModes.FORCE);
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
      if (!muteCallbacks) this.onLoop(this);
    }

    // Give each property to the tween that owns it at this time before the children render.
    if (!internalRender && this._takeovers.length) updateTimelineTakeovers(this, tlChildrenTime);
    const tlTakeoverIndex = this._takeoverIndex;

    // Save next before the render, a render can remove the current child.
    let child = /** @type {JSAnimation} */(tlIsRunningBackwards ? this._tail : this._head);
    while (child) {
      const next = /** @type {JSAnimation} */(tlIsRunningBackwards ? child._prev : child._next);
      const childTime = round$1((tlChildrenTime - child._offset) * child._speed, 12); // Rounding is needed when using seconds
      const childTickMode = child._fps < this._fps ? child.requestTick(tlChildrenTickTime) : tickMode;
      // Update the owners again after a callback of a child that seeks the timeline or another child.
      if (this._takeoverIndex !== tlTakeoverIndex) updateTimelineTakeovers(this, tlChildrenTime);
      tlChildrenHasRendered += render(child, childTime, muteCallbacks, internalRender, childTickMode);
      if (!child.completed) tlChildrenHaveCompleted = false;
      child = next;
    }

    tlChildrenHasRendered += renderChangedOwners(muteCallbacks);


    // Renders on timeline are triggered by its children so it needs to be set after rendering the children
    if (!muteCallbacks && tlChildrenHasRendered) this.onRender(this);
    // Triggers the timeline onComplete() once all chindren all completed and the current time has reached the end
    if ((tlChildrenHaveCompleted || tlIsRunningBackwards) && this._currentTime >= this.duration) {
      // Make sure the paused flag is false in case it has been skipped in the render function
      this.paused = true;
      if (!this.completed) {
        this.completed = true;
        if (!muteCallbacks) {
          this.onComplete(this);
          this._resolve(this);
        }
      }
    }
  }

  /**
   * @internal
   * @param {Number} time
   */
  updateTakeovers(time) {
    updateTimelineTakeovers(this, time);
  }

  /**
   * @internal
   * @param  {Tween} sibling
   * @param  {JSAnimation} animation
   * @param  {Number} tweenStartTime
   * @return {Tween}
   */
  getPreviousSibling(sibling, animation, tweenStartTime) {
    return getPreviousTimelineSibling(sibling, animation, tweenStartTime);
  }

  /**
   * @internal
   * @param {JSAnimation} child
   * @param {JSAnimation} newChild
   * @param {Number} time
   */
  sampleChild(child, newChild, time) {
    sampleAnimation(child, newChild, time);
  }

  /**
   * @internal
   * @param {Tween} tween
   * @param {Tween} prevSibling
   * @param {Number} tweenStartTime
   */
  composeTween(tween, prevSibling, tweenStartTime) {
    composeTimelineTween(tween, prevSibling, tweenStartTime);
  }

  /**
   * @internal
   * @param {Tween} tween
   */
  removeTakeover(tween) {
    removeTimelineTakeover(tween);
  }

  /** @internal */
  rebuildTakeovers() {
    rebuildTimelineTakeovers(this);
  }

  /**
   * Updates the duration and the takeovers after a child stretches alone.
   * @internal
   */
  updateStretchedChild() {
    updateTimelineDuration(this);
    rebuildTimelineTakeovers(this);
  }

  /**
   * @return {this}
   */
  refresh() {
    forEachChildren(this, (/** @type {JSAnimation|Timer} */child) => {
      if (/** @type {JSAnimation} */(child).refresh) /** @type {JSAnimation} */(child).refresh();
    });
    return this;
  }

  /**
   * @param {Boolean} [render] Pass false to restore the values without rendering the timeline at 0
   * @return {this}
   */
  revert(render = true) {
    super.revert(render);
    // Traverse the children once with revertValues, it restores every child value.
    return revertValues(this);
  }
}

/**
 * @param {TimelineParams} [parameters]
 * @return {Timeline}
 */
const createTimeline = parameters => {
  if (globals.editor) {
    return /** @type {Timeline} */(/** @type {unknown} */(globals.editor.addTimeline(parameters)));
  }
  return new Timeline(parameters).init();
};



class Animatable {
  /**
   * @param {TargetsParam} targets
   * @param {AnimatableParams} parameters
   */
  constructor(targets, parameters) {
    if (scope.current) scope.current.register(this);
    const beginHandler = () => {
      if (this.callbacks.completed) this.callbacks.reset();
      this.callbacks.play();
    };
    const pauseHandler = () => {
      if (this.callbacks.completed) return;
      let paused = true;
      for (let name in this.animations) {
        const anim = this.animations[name];
        if (!anim.paused && paused) {
          paused = false;
          break;
        }
      }
      if (paused) {
        this.callbacks.complete();
      }
    };
    /** @type {AnimationParams} */
    const globalParams = {
      onBegin: beginHandler,
      onComplete: pauseHandler,
      onPause: pauseHandler,
    };
    /** @type {AnimationParams} */
    const callbacksAnimationParams = { v: 1, autoplay: false };
    const properties = {};
    this.targets = [];
    /** @type {Record<String, JSAnimation>} */
    this.animations = {};
    /** @type {JSAnimation|null} */
    this.callbacks = null;
    if (isUnd(targets) || isUnd(parameters)) return;
    for (let propName in parameters) {
      const paramValue = parameters[propName];
      if (isKey(propName)) {
        properties[propName] = paramValue;
      } else if (stringStartsWith(propName, 'on')) {
        callbacksAnimationParams[propName] = paramValue;
      } else {
        globalParams[propName] = paramValue;
      }
    }
    this.callbacks = new JSAnimation({ v: 0 }, callbacksAnimationParams);
    for (let propName in properties) {
      const propValue = properties[propName];
      const isObjValue = isObj(propValue);
      /** @type {TweenParamsOptions} */
      let propParams = {};
      let to = '+=0';
      if (isObjValue) {
        const unit = propValue.unit;
        if (isStr(unit)) to += unit;
      } else {
        propParams.duration = propValue;
      }
      propParams[propName] = isObjValue ? mergeObjects({ to }, propValue) : to;
      const animParams = mergeObjects(globalParams, propParams);
      animParams.composition = compositionTypes.replace;
      animParams.autoplay = false;
      const animation = this.animations[propName] = new JSAnimation(targets, animParams, null, 0, false).init();
      if (!this.targets.length) this.targets.push(...animation.targets);
      /** @type {AnimatableProperty} */
      this[propName] = (to, duration, ease) => {
        const tween = /** @type {Tween} */(animation._head);
        if (isUnd(to) && tween) {
          const numbers = tween._numbers;
          if (numbers && numbers.length) {
            return numbers;
          } else {
            return tween._modifier(tween._number);
          }
        } else {
          forEachChildren(animation, (/** @type {Tween} */tween) => {
            if (isArr(to)) {
              for (let i = 0, l = /** @type {Array} */(to).length; i < l; i++) {
                if (!isUnd(tween._numbers[i])) {
                  tween._fromNumbers[i] = /** @type {Number} */(tween._modifier(tween._numbers[i]));
                  tween._toNumbers[i] = to[i];
                }
              }
            } else {
              tween._fromNumber = /** @type {Number} */(tween._modifier(tween._number));
              tween._toNumber = /** @type {Number} */(to);
            }
            if (!isUnd(ease)) tween._ease = parseEase(ease);
            tween._currentTime = 0;
          });
          if (!isUnd(duration)) animation.stretch(duration);
          animation.reset(true).resume();
          return this;
        }
      };
    }
  }

  revert() {
    for (let propName in this.animations) {
      this[propName] = noop;
      this.animations[propName].revert();
    }
    this.animations = {};
    this.targets.length = 0;
    if (this.callbacks) this.callbacks.revert();
    return this;
  }
}

/**
 * @param {TargetsParam} targets
 * @param {AnimatableParams} parameters
 * @return {AnimatableObject}
 */
const createAnimatable = (targets, parameters) => /** @type {AnimatableObject} */ (new Animatable(targets, parameters));

/**
 * Rounds a number to fixed decimal places
 * @param  {Number|String} v - Value to round
 * @param  {Number} decimalLength - Number of decimal places
 * @return {String}
 */
const roundPad$1 = (v, decimalLength) => (+v).toFixed(decimalLength);

/**
 * Pads the start of a value with a string
 * @param  {Number} v - Value to pad
 * @param  {Number} totalLength - Target length
 * @param  {String} padString - String to pad with
 * @return {String}
 */
const padStart$1 = (v, totalLength, padString) => `${v}`.padStart(totalLength, padString);

/**
 * Pads the end of a value with a string
 * @param  {Number} v - Value to pad
 * @param  {Number} totalLength - Target length
 * @param  {String} padString - String to pad with
 * @return {String}
 */
const padEnd$1 = (v, totalLength, padString) => `${v}`.padEnd(totalLength, padString);

/**
 * Wraps a value within a range
 * @param  {Number} v - Value to wrap
 * @param  {Number} min - Minimum boundary
 * @param  {Number} max - Maximum boundary
 * @return {Number}
 */
const wrap$1 = (v, min, max) => (((v - min) % (max - min) + (max - min)) % (max - min)) + min;

/**
 * Maps a value from one range to another
 * @param  {Number} value - Input value
 * @param  {Number} inLow - Input range minimum
 * @param  {Number} inHigh - Input range maximum
 * @param  {Number} outLow - Output range minimum
 * @param  {Number} outHigh - Output range maximum
 * @return {Number}
 */
const mapRange$1 = (value, inLow, inHigh, outLow, outHigh) => outLow + ((value - inLow) / (inHigh - inLow)) * (outHigh - outLow);

/**
 * Converts degrees to radians
 * @param  {Number} degrees - Angle in degrees
 * @return {Number}
 */
const degToRad$1 = degrees => degrees * Math.PI / 180;

/**
 * Converts radians to degrees
 * @param  {Number} radians - Angle in radians
 * @return {Number}
 */
const radToDeg$1 = radians => radians * 180 / Math.PI;

/**
 * Frame rate independent damped lerp
 * Based on: https://www.rorydriscoll.com/2016/03/07/frame-rate-independent-damping-using-lerp/
 *
 * @param  {Number} start - Starting value
 * @param  {Number} end - Target value
 * @param  {Number} deltaTime - Delta time in ms
 * @param  {Number} factor - Interpolation factor in the range [0, 1]
 * @return {Number} The interpolated value
 */
const damp$1 = (start, end, deltaTime, factor) => {
  return !factor ? start : factor === 1 ? end : lerp$1(start, end, 1 - Math.exp(-factor * deltaTime * .1));
};

var numberImports = /*#__PURE__*/Object.freeze({
  __proto__: null,
  clamp: clamp$1,
  damp: damp$1,
  degToRad: degToRad$1,
  lerp: lerp$1,
  mapRange: mapRange$1,
  padEnd: padEnd$1,
  padStart: padStart$1,
  radToDeg: radToDeg$1,
  round: round$1,
  roundPad: roundPad$1,
  snap: snap$1,
  wrap: wrap$1
});





/*
 * Spring easing solver adapted from https://webkit.org/demos/spring/spring.js
 * (c) 2016 Webkit - Apple Inc
 */

// K * K puts the ceiling where the w0 clamp saturates, so a stretch can compress any
// spring down to its rest window instead of stalling on an artificial parameter bound.
const maxSpringParamValue = K * K;

class Spring {
  /**
   * @param {SpringParams} [parameters]
   */
  constructor(parameters = {}) {
    const hasBounceOrDuration = !isUnd(parameters.bounce) || !isUnd(parameters.duration);
    this.timeStep = .02; // Interval fed to the solver to calculate duration
    this.restThreshold = .0005; // Values below this threshold are considered resting position
    this.restDuration = 200; // Duration in ms used to check if the spring is resting after reaching restThreshold
    this.maxDuration = 60000; // The maximum allowed spring duration in ms (default 1 min)
    this.maxRestSteps = this.restDuration / this.timeStep / K; // How many steps allowed after reaching restThreshold before stopping the duration calculation
    this.maxIterations = this.maxDuration / this.timeStep / K; // Calculate the maximum iterations allowed based on maxDuration
    this.bn = clamp$1(setValue(parameters.bounce, .5), -1, 1); // The bounce percentage between -1 and 1.
    this.pd = clamp$1(setValue(parameters.duration, 628), 10 * globals.timeScale, maxSpringParamValue * globals.timeScale); // The perceived duration
    this.m = clamp$1(setValue(parameters.mass, 1), 1, maxSpringParamValue);
    this.s = clamp$1(setValue(parameters.stiffness, 100), minValue, maxSpringParamValue);
    this.d = clamp$1(setValue(parameters.damping, 10), minValue, maxSpringParamValue);
    this.v = clamp$1(setValue(parameters.velocity, 0), -maxSpringParamValue, maxSpringParamValue);
    this.w0 = 0;
    this.zeta = 0;
    this.wd = 0;
    this.b = 0;
    this.completed = false;
    this.solverDuration = 0;
    this.settlingDuration = 0;
    /** @type {JSAnimation} */
    this.parent = null;
    /** @type {Callback<JSAnimation, this>} */
    this.onComplete = parameters.onComplete || noop;
    if (hasBounceOrDuration) this.calculateSDFromBD();
    this.compute();
    /** @type {EasingFunction} */
    this.ease = t => {
      const currentTime = t * this.settlingDuration;
      const completed = this.completed;
      const perceivedTime = this.pd;
      if (currentTime >= perceivedTime && !completed) {
        this.completed = true;
        this.onComplete(this.parent);
      }
      if (currentTime < perceivedTime && completed) {
        this.completed = false;
      }
      return t === 0 || t === 1 ? t : this.solve(t * this.solverDuration);
    };
  }

  /** @type {EasingFunction} */
  solve(time) {
    const { zeta, w0, wd, b } = this;
    let t = time;
    if (zeta < 1) {
      // Underdamped
      t = exp(-t * zeta * w0) * (1 * cos(wd * t) + b * sin(wd * t));
    } else if (zeta === 1) {
      // Critically damped
      t = (1 + b * t) * exp(-t * w0);
    } else {
      // Overdamped
      // Using exponential instead of cosh and sinh functions to prevent Infinity
      // Original exp(-zeta * w0 * t) * (cosh(wd * t) + b * sinh(wd * t))
      t = ((1 + b) * exp((-zeta * w0 + wd) * t) + (1 - b) * exp((-zeta * w0 - wd) * t)) / 2;
    }
    return 1 - t;
  }

  calculateSDFromBD() {
    // Apple's SwiftUI perceived spring duration implementation https://developer.apple.com/videos/play/wwdc2023/10158/?time=1010
    // Equations taken from Kevin Grajeda's article https://www.kvin.me/posts/effortless-ui-spring-animations
    const pds = globals.timeScale === 1 ? this.pd / K : this.pd;
    // Mass and velocity should be set to their default values
    this.m = 1;
    this.v = 0;
    // Stiffness = (2π ÷ perceptualDuration)²
    this.s = pow((2 * PI) / pds, 2);
    if (this.bn >= 0) {
      // For bounce ≥ 0 (critically damped to underdamped)
      // damping = ((1 - bounce) × 4π) ÷ perceptualDuration
      this.d = ((1 - this.bn) * 4 * PI) / pds;
    } else {
      // For bounce < 0 (overdamped)
      // damping = 4π ÷ (perceptualDuration × (1 + bounce))
      // Note: (1 + bounce) is positive since bounce is negative
      this.d = (4 * PI) / (pds * (1 + this.bn));
    }
    this.s = round$1(clamp$1(this.s, minValue, maxSpringParamValue), 3);
    this.d = round$1(clamp$1(this.d, minValue, 300), 3); // Clamping to 300 is needed to prevent insane values in the solver
  }

  calculateBDFromSD() {
    // Calculate perceived duration and bounce from stiffness and damping
    // Note: We assumes m = 1 and v = 0 for these calculations
    const pds = (2 * PI) / sqrt(this.s);
    this.pd = pds * (globals.timeScale === 1 ? K : 1);
    const zeta = this.d / (2 * sqrt(this.s));
    if (zeta <= 1) {
      // Critically damped to underdamped
      this.bn = 1 - (this.d * pds) / (4 * PI);
    } else {
      // Overdamped
      this.bn = (4 * PI) / (this.d * pds) - 1;
    }
    this.bn = round$1(clamp$1(this.bn, -1, 1), 3);
    this.pd = round$1(clamp$1(this.pd, 10 * globals.timeScale, maxSpringParamValue * globals.timeScale), 3);
  }

  compute() {
    const { maxRestSteps, maxIterations, restThreshold, timeStep, m, d, s, v } = this;
    const w0 = this.w0 = clamp$1(sqrt(s / m), minValue, K);
    const bouncedZeta = this.zeta = d / (2 * sqrt(s * m));
    // Calculate wd based on damping type
    if (bouncedZeta < 1) {
      // Underdamped
      this.wd = w0 * sqrt(1 - bouncedZeta * bouncedZeta);
      this.b = (bouncedZeta * w0 + -v) / this.wd;
    } else if (bouncedZeta === 1) {
      // Critically damped
      this.wd = 0;
      this.b = -v + w0;
    } else {
      // Overdamped
      this.wd = w0 * sqrt(bouncedZeta * bouncedZeta - 1);
      this.b = (bouncedZeta * w0 + -v) / this.wd;
    }

    let solverTime = 0;
    let restSteps = 0;
    let iterations = 0;
    while (restSteps <= maxRestSteps && iterations <= maxIterations) {
      if (abs(1 - this.solve(solverTime)) < restThreshold) {
        restSteps++;
      } else {
        restSteps = 0;
      }
      this.solverDuration = solverTime;
      solverTime += timeStep;
      iterations++;
    }
    this.settlingDuration = round$1(this.solverDuration * K, 0) * globals.timeScale;
  }

  /**
   * Lowest settlingDuration stretch can reach, the rest detection window scaled to the current
   * time unit. stretch refuses any target at or below it.
   * @return {Number}
   */
  get minSettlingDuration() {
    return this.restDuration * globals.timeScale;
  }

  /**
   * Retunes stiffness, damping and velocity so the spring settles at the given duration,
   * keeping its bounce and curve shape. Targets at or below minSettlingDuration are refused,
   * and a target below what the parameter bounds allow lands on that reachable floor instead.
   * @param {Number} duration The target settlingDuration
   * @return {this}
   */
  stretch(duration) {
    // Derive the factor from the response part and refine against the solver,
    // the constant restDuration window makes rest detection not scale invariant.
    const rest = this.minSettlingDuration;
    const tolerance = this.timeStep * K * globals.timeScale;
    if (!(duration > rest)) return this;
    for (let i = 0; i < 8; i++) {
      const previous = this.settlingDuration;
      if (abs(previous - duration) <= tolerance) break;
      // Bound the factor so no parameter clamps on its own, a lone clamp would break zeta and
      // turn the retune into a different spring.
      const lowest = max(sqrt(this.s / maxSpringParamValue), this.d / maxSpringParamValue, abs(this.v) / maxSpringParamValue);
      const highest = min(sqrt(this.s / minValue), this.d / minValue);
      const factor = clamp$1((duration - rest) / (previous - rest), lowest, highest);
      if (!(factor > 0) || factor === Infinity || factor === 1) break;
      // Scale each parameter by its time dimension so zeta holds and the response time scales exactly.
      this.s = clamp$1(round$1(this.s / (factor * factor), 6), minValue, maxSpringParamValue);
      this.d = clamp$1(round$1(this.d / factor, 6), minValue, maxSpringParamValue);
      this.v = clamp$1(round$1(this.v / factor, 6), -maxSpringParamValue, maxSpringParamValue);
      this.pd = clamp$1(round$1(this.pd * factor, 3), 10 * globals.timeScale, maxSpringParamValue * globals.timeScale);
      this.compute();
      if (this.settlingDuration === previous) break;
    }
    return this;
  }

  get bounce() {
    return this.bn;
  }

  set bounce(v) {
    this.bn = clamp$1(setValue(v, 1), -1, 1);
    this.calculateSDFromBD();
    this.compute();
  }

  get duration() {
    return this.pd;
  }

  set duration(v) {
    this.pd = clamp$1(setValue(v, 1), 10 * globals.timeScale, maxSpringParamValue * globals.timeScale);
    this.calculateSDFromBD();
    this.compute();
  }

  get stiffness() {
    return this.s;
  }

  set stiffness(v) {
    this.s = clamp$1(setValue(v, 100), minValue, maxSpringParamValue);
    this.calculateBDFromSD();
    this.compute();
  }

  get damping() {
    return this.d;
  }

  set damping(v) {
    this.d = clamp$1(setValue(v, 10), minValue, maxSpringParamValue);
    this.calculateBDFromSD();
    this.compute();
  }

  get mass() {
    return this.m;
  }

  set mass(v) {
    this.m = clamp$1(setValue(v, 1), 1, maxSpringParamValue);
    this.compute();
  }

  get velocity() {
    return this.v;
  }

  set velocity(v) {
    this.v = clamp$1(setValue(v, 0), -maxSpringParamValue, maxSpringParamValue);
    this.compute();
  }
}

/**
 * @param {SpringParams} [parameters]
 * @returns {Spring}
 */
const springFactory = (parameters) => new Spring(parameters);

/** Creates a spring easing from its physical parameters. */
const spring = /** @type {typeof springFactory} */(makeTweakable('Ease', 'spring', springFactory));

/**
 * @deprecated createSpring() is deprecated use spring() instead
 *
 * @param {SpringParams} [parameters]
 * @returns {Spring}
 */
const createSpring = (parameters) => {
  console.warn('createSpring() is deprecated use spring() instead');
  return new Spring(parameters);
};





const WAAPIAnimationsLookups = {
  _head: null,
  _tail: null,
};

/**
 * @param {DOMTarget} $el
 * @param {String} [property]
 * @param {WAAPIAnimation} [parent]
 * @return {globalThis.Animation}
 */
const removeWAAPIAnimation = ($el, property, parent) => {
  let nextLookup = WAAPIAnimationsLookups._head;
  let anim;
  while (nextLookup) {
    const next = nextLookup._next;
    const matchTarget = nextLookup.$el === $el;
    const matchProperty = !property || nextLookup.property === property;
    const matchParent = !parent || nextLookup.parent === parent;
    if (matchTarget && matchProperty && matchParent) {
      anim = nextLookup.animation;
      try { anim.commitStyles(); } catch {}      anim.cancel();
      removeChild(WAAPIAnimationsLookups, nextLookup);
      const lookupParent = nextLookup.parent;
      if (lookupParent) {
        lookupParent._completed++;
        if (lookupParent.animations.length === lookupParent._completed) {
          lookupParent.completed = true;
          lookupParent.paused = true;
          if (!lookupParent.muteCallbacks) {
            lookupParent.onComplete(lookupParent);
            lookupParent._resolve(lookupParent);
          }
        }
      }
    }
    nextLookup = next;
  }
  return anim;
};

/**
 * @param {WAAPIAnimation} parent
 * @param {DOMTarget} $el
 * @param {String} property
 * @param {PropertyIndexedKeyframes} keyframes
 * @param {KeyframeAnimationOptions} params
 * @retun {globalThis.Animation}
 */
const addWAAPIAnimation = (parent, $el, property, keyframes, params) => {
  const animation = $el.animate(keyframes, params);
  const animTotalDuration = params.delay + (+params.duration * params.iterations);
  animation.playbackRate = parent._speed;
  if (parent.paused) animation.pause();
  if (parent.duration < animTotalDuration) {
    parent.duration = animTotalDuration;
    parent.controlAnimation = animation;
  }
  parent.animations.push(animation);
  removeWAAPIAnimation($el, property);
  addChild(WAAPIAnimationsLookups, { parent, animation, $el, property, _next: null, _prev: null });
  const handleRemove = event => {
    // Drop a queued finish that outlives a seek, a normal pause at the finished time still completes.
    if (event.type === 'finish' && animation.playState !== 'finished' &&
        (parent.completed || animation.currentTime !== event.currentTime)) return;
    removeWAAPIAnimation($el, property, parent);
  };
  animation.oncancel = handleRemove;
  animation.onremove = handleRemove;
  if (!parent.persist) {
    animation.onfinish = handleRemove;
  }
  return animation;
};





/**
 * @overload
 * @param  {DOMTargetSelector} targetSelector
 * @param  {String} propName
 * @return {String}
 *
 * @overload
 * @param  {JSTargetsParam} targetSelector
 * @param  {String} propName
 * @return {Number|String}
 *
 * @overload
 * @param  {DOMTargetsParam} targetSelector
 * @param  {String} propName
 * @param  {String} unit
 * @return {String}
 *
 * @overload
 * @param  {TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {Boolean} unit
 * @return {Number}
 *
 * @param  {TargetsParam} targetSelector
 * @param  {String} propName
 * @param  {String|Boolean} [unit]
 */
function get(targetSelector, propName, unit) {
  // Skip registerTargets for an already registered target so repeated reads like editor live values
  // stay allocation free.
  /** @type {Target|null} */
  let target = targetSelector && /** @type {Target} */(targetSelector)[replaceLookupsSymbol] ? /** @type {Target} */(targetSelector) : null;
  if (!target) {
    const targets = registerTargets(targetSelector);
    if (!targets.length) return;
    target = targets[0];
  }
  const tweenType = getTweenType(target, propName);
  const normalizePropName = sanitizePropertyName(propName, target, tweenType);
  let originalValue = getOriginalAnimatableValue(target, normalizePropName);
  if (isUnd(unit)) {
    // Return a color in the rgba form that animate writes, the browser computes some colors in oklab or color().
    if (isStr(originalValue) && isCol(originalValue)) {
      const [r, g, b, a] = convertColorStringValuesToRgbaArray(originalValue);
      return `rgba(${r},${g},${b},${a})`;
    }
    return originalValue;
  } else {
    const { t, n, u } = decomposeRawValue(originalValue);
    if (t === valueTypes.NUMBER || t === valueTypes.UNIT) {
      if (unit === false) {
        return n;
      } else {
        const convertedValue = convertValueUnit(/** @type {DOMTarget} */(target), n, u, /** @type {String} */(unit), t, false);
        return `${round$1(convertedValue, globals.precision)}${unit}`;
      }
    }
  }
}

/**
 * @param  {TargetsParam} targets
 * @param  {AnimationParams} parameters
 * @return {JSAnimation}
 */
const set = (targets, parameters) => {
  if (isUnd(parameters)) return;
  if (globals.editor && globals.editor.addSet) {
    return globals.editor.addSet(targets, parameters);
  }
  parameters.duration = minValue;
  // Do not overrides currently active tweens by default
  parameters.composition = setValue(parameters.composition, compositionTypes.none);
  // Skip init() and force rendering by playing the animation
  return new JSAnimation(targets, parameters, null, 0, true).resume();
};

/**
 * @param  {TargetsParam} targets
 * @param  {Renderable|WAAPIAnimation} [renderable]
 * @param  {String} [propertyName]
 * @return {TargetsArray}
 */
const remove = (targets, renderable, propertyName) => {
  const targetsArray = parseTargets(targets);
  for (let i = 0, l = targetsArray.length; i < l; i++) {
    removeWAAPIAnimation(
      /** @type {DOMTarget}  */(targetsArray[i]),
      propertyName,
      renderable && /** @type {WAAPIAnimation} */(renderable).controlAnimation && /** @type {WAAPIAnimation} */(renderable),
    );
  }
  removeTargetsFromRenderable(
    targetsArray,
    /** @type {Renderable} */(renderable),
    propertyName
  );
  return targetsArray;
};



/**
 * @param {Event} e
 */
const preventDefault = e => {
  if (e.cancelable) e.preventDefault();
};

class DOMProxy {
  /** @param {Object} el */
  constructor(el) {
    this.el = el;
    this.zIndex = 0;
    this.parentElement = null;
    this.classList = {
      add: noop,
      remove: noop,
    };
  }

  get x() { return this.el.x || 0 };
  set x(v) { this.el.x = v; };

  get y() { return this.el.y || 0 };
  set y(v) { this.el.y = v; };

  get width() { return this.el.width || 0 };
  set width(v) { this.el.width = v; };

  get height() { return this.el.height || 0 };
  set height(v) { this.el.height = v; };

  getBoundingClientRect() {
    return {
      top: this.y,
      right: this.x,
      bottom: this.y + this.height,
      left: this.x + this.width,
    }
  }
}

class Transforms {
  /**
   * @param {DOMTarget|DOMProxy} $el
   */
  constructor($el) {
    this.$el = $el;
    this.inlineTransforms = [];
    this.point = new DOMPoint();
    this.inversedMatrix = this.getMatrix().inverse();
  }

  /**
   * @param {Number} x
   * @param {Number} y
   * @return {DOMPoint}
   */
  normalizePoint(x, y) {
    this.point.x = x;
    this.point.y = y;
    return this.point.matrixTransform(this.inversedMatrix);
  }

  /**
   * @callback TraverseParentsCallback
   * @param {DOMTarget} $el
   * @param {Number} i
   */

  /**
   * @param {TraverseParentsCallback} cb
   */
  traverseUp(cb) {
    let $el = /** @type {DOMTarget|Document} */(this.$el.parentElement), i = 0;
    while ($el && $el !== doc) {
      cb(/** @type {DOMTarget} */($el), i);
      $el = /** @type {DOMTarget} */($el.parentElement);
      i++;
    }
  }

  getMatrix() {
    const matrix = new DOMMatrix();
    this.traverseUp($el => {
      const transformValue = getComputedStyle($el).transform;
      if (transformValue) {
        const elMatrix = new DOMMatrix(transformValue);
        matrix.preMultiplySelf(elMatrix);
      }
    });
    return matrix;
  }

  remove() {
    this.traverseUp(($el, i) => {
      this.inlineTransforms[i] = $el.style.transform;
      $el.style.transform = 'none';
    });
  }

  revert() {
    this.traverseUp(($el, i) => {
      const ct = this.inlineTransforms[i];
      if (ct === '') {
        $el.style.removeProperty('transform');
      } else {
        $el.style.transform = ct;
      }
    });
  }
}

/**
 * @template {Array<Number>|DOMTargetSelector|String|Number|Boolean|Function|DraggableCursorParams|DraggableDragThresholdParams} T
 * @param {T | ((draggable: Draggable) => T)} value
 * @param {Draggable} draggable
 * @return {T}
 */
const parseDraggableFunctionParameter = (value, draggable) => value && isFnc(value) ? /** @type {Function} */(value)(draggable) : /** @type {T} */(value);

let zIndex = 0;

class Draggable {
  /**
   * @param {TargetsParam} target
   * @param {DraggableParams} [parameters]
   */
  constructor(target, parameters = {}) {
    if (!target) return;
    if (scope.current) scope.current.register(this);
    const paramX = parameters.x;
    const paramY = parameters.y;
    const trigger = parameters.trigger;
    const modifier = parameters.modifier;
    const ease = parameters.releaseEase;
    const customEase = ease && parseEase(ease);
    const hasSpring = !isUnd(ease) && !isUnd(/** @type {Spring} */(ease).ease);
    const xProp = /** @type {String} */(isObj(paramX) && !isUnd(/** @type {Object} */(paramX).mapTo) ? /** @type {Object} */(paramX).mapTo : 'translateX');
    const yProp = /** @type {String} */(isObj(paramY) && !isUnd(/** @type {Object} */(paramY).mapTo) ? /** @type {Object} */(paramY).mapTo : 'translateY');
    const container = parseDraggableFunctionParameter(parameters.container, this);
    this.containerArray = isArr(container) ? container : null;
    this.$container = /** @type {HTMLElement} */(container && !this.containerArray ? parseTargets(/** @type {DOMTarget} */(container))[0] : doc.body);
    this.useWin = this.$container === doc.body;
    /** @type {Window | HTMLElement} */
    this.$scrollContainer = this.useWin ? win : this.$container;
    this.$target = /** @type {HTMLElement} */(isObj(target) ? new DOMProxy(target) : parseTargets(target)[0]);
    this.$trigger = /** @type {HTMLElement} */(parseTargets(trigger ? trigger : target)[0]);
    this.fixed = get(this.$target, 'position') === 'fixed';
    // Refreshable parameters
    this.isFinePointer = true;
    /** @type {[Number, Number, Number, Number]} */
    this.containerPadding = [0, 0, 0, 0];
    /** @type {Number} */
    this.containerFriction = 0;
    /** @type {Number} */
    this.releaseContainerFriction = 0;
    /** @type {Number|Array<Number>} */
    this.snapX = 0;
    /** @type {Number|Array<Number>} */
    this.snapY = 0;
    /** @type {Number} */
    this.scrollSpeed = 0;
    /** @type {Number} */
    this.scrollThreshold = 0;
    /** @type {Number} */
    this.dragSpeed = 0;
    /** @type {Number} */
    this.dragThreshold = 3;
    /** @type {Number} */
    this.maxVelocity = 0;
    /** @type {Number} */
    this.minVelocity = 0;
    /** @type {Number} */
    this.velocityMultiplier = 0;
    /** @type {Boolean|DraggableCursorParams} */
    this.cursor = false;
    /** @type {Spring} */
    this.releaseXSpring = hasSpring ? /** @type {Spring} */(ease) : new Spring({
      mass: setValue(parameters.releaseMass, 1),
      stiffness: setValue(parameters.releaseStiffness, 80),
      damping: setValue(parameters.releaseDamping, 20),
    });
    /** @type {Spring} */
    this.releaseYSpring = hasSpring ? /** @type {Spring} */(ease) : new Spring({
      mass: setValue(parameters.releaseMass, 1),
      stiffness: setValue(parameters.releaseStiffness, 80),
      damping: setValue(parameters.releaseDamping, 20),
    });
    /** @type {EasingFunction} */
    this.releaseEase = customEase || eases.outQuint;
    /** @type {Boolean} */
    this.hasReleaseSpring = hasSpring;
    /** @type {Callback<this>} */
    this.onGrab = parameters.onGrab || noop;
    /** @type {Callback<this>} */
    this.onDrag = parameters.onDrag || noop;
    /** @type {Callback<this>} */
    this.onRelease = parameters.onRelease || noop;
    /** @type {Callback<this>} */
    this.onUpdate = parameters.onUpdate || noop;
    /** @type {Callback<this>} */
    this.onSettle = parameters.onSettle || noop;
    /** @type {Callback<this>} */
    this.onSnap = parameters.onSnap || noop;
    /** @type {Callback<this>} */
    this.onResize = parameters.onResize || noop;
    /** @type {Callback<this>} */
    this.onAfterResize = parameters.onAfterResize || noop;
    /** @type {[Number, Number]} */
    this.disabled = [0, 0];
    /** @type {AnimatableParams} */
    const animatableParams = {};
    if (modifier) animatableParams.modifier = modifier;
    if (isUnd(paramX) || paramX === true) {
      animatableParams[xProp] = 0;
    } else if (isObj(paramX)) {
      const paramXObject = /** @type {DraggableAxisParam} */(paramX);
      const animatableXParams = {};
      if (paramXObject.modifier) animatableXParams.modifier = paramXObject.modifier;
      if (paramXObject.composition) animatableXParams.composition = paramXObject.composition;
      animatableParams[xProp] = animatableXParams;
    } else if (paramX === false) {
      animatableParams[xProp] = 0;
      this.disabled[0] = 1;
    }
    if (isUnd(paramY) || paramY === true) {
      animatableParams[yProp] = 0;
    } else if (isObj(paramY)) {
      const paramYObject = /** @type {DraggableAxisParam} */(paramY);
      const animatableYParams = {};
      if (paramYObject.modifier) animatableYParams.modifier = paramYObject.modifier;
      if (paramYObject.composition) animatableYParams.composition = paramYObject.composition;
      animatableParams[yProp] = animatableYParams;
    } else if (paramY === false) {
      animatableParams[yProp] = 0;
      this.disabled[1] = 1;
    }
    /** @type {AnimatableObject} */
    this.animate = /** @type {AnimatableObject} */(new Animatable(this.$target, animatableParams));
    // Internal props
    this.xProp = xProp;
    this.yProp = yProp;
    this.destX = 0;
    this.destY = 0;
    this.deltaX = 0;
    this.deltaY = 0;
    this.scroll = {x: 0, y: 0};
    /** @type {[Number, Number, Number, Number]} */
    this.coords = [this.x, this.y, 0, 0]; // x, y, temp x, temp y
    /** @type {[Number, Number]} */
    this.snapped = [0, 0]; // x, y
    /** @type {[Number, Number, Number, Number, Number, Number, Number, Number]} */
    this.pointer = [0, 0, 0, 0, 0, 0, 0, 0]; // x1, y1, x2, y2, temp x1, temp y1, temp x2, temp y2
    /** @type {[Number, Number]} */
    this.scrollView = [0, 0]; // w, h
    /** @type {[Number, Number, Number, Number]} */
    this.dragArea = [0, 0, 0, 0]; // x, y, w, h
    /** @type {[Number, Number, Number, Number]} */
    this.containerBounds = [-maxValue, maxValue, maxValue, -maxValue]; // t, r, b, l
    /** @type {[Number, Number, Number, Number]} */
    this.scrollBounds = [0, 0, 0, 0]; // t, r, b, l
    /** @type {[Number, Number, Number, Number]} */
    this.targetBounds = [0, 0, 0, 0]; // t, r, b, l
    /** @type {[Number, Number]} */
    this.window = [0, 0]; // w, h
    /** @type {[Number, Number, Number]} */
    this.velocityStack = [0, 0, 0];
    /** @type {Number} */
    this.velocityStackIndex = 0;
    /** @type {Number} */
    this.velocityTime = now();
    /** @type {Number} */
    this.velocity = 0;
    /** @type {Number} */
    this.angle = 0;
    /** @type {JSAnimation} */
    this.cursorStyles = null;
    /** @type {JSAnimation} */
    this.triggerStyles = null;
    /** @type {JSAnimation} */
    this.bodyStyles = null;
    /** @type {JSAnimation} */
    this.targetStyles = null;
    /** @type {JSAnimation} */
    this.touchActionStyles = null;
    this.transforms = new Transforms(this.$target);
    this.overshootCoords = { x: 0, y: 0 };
    this.overshootTicker = new Timer({
      autoplay: false,
      onUpdate: () => {
        this.updated = true;
        this.manual = true;
        // Use a duration of 1 to prevent the animatable from completing immediately to prevent issues with onSettle()
        // https://github.com/juliangarnier/anime/issues/1045
        if (!this.disabled[0]) this.animate[this.xProp](this.overshootCoords.x, 1);
        if (!this.disabled[1]) this.animate[this.yProp](this.overshootCoords.y, 1);
      },
      onComplete: () => {
        this.manual = false;
        if (!this.disabled[0]) this.animate[this.xProp](this.overshootCoords.x, 0);
        if (!this.disabled[1]) this.animate[this.yProp](this.overshootCoords.y, 0);
      },
    }, null, 0).init();
    this.updateTicker = new Timer({ autoplay: false, onUpdate: () => this.update() }, null,0,).init();
    this.contained = !isUnd(container);
    this.manual = false;
    this.grabbed = false;
    this.dragged = false;
    this.updated = false;
    this.released = false;
    this.canScroll = false;
    this.enabled = false;
    this.initialized = false;
    this.activeProp = this.disabled[1] ? xProp : yProp;
    this.animate.callbacks.onRender = () => {
      const hasUpdated = this.updated;
      const hasMoved = this.grabbed && hasUpdated;
      const hasReleased = !hasMoved && this.released;
      const x = this.x;
      const y = this.y;
      const dx = x - this.coords[2];
      const dy = y - this.coords[3];
      this.deltaX = dx;
      this.deltaY = dy;
      this.coords[2] = x;
      this.coords[3] = y;
      // Check if dx or dy are not 0 to check if the draggable has actually moved
      // https://github.com/juliangarnier/anime/issues/1032
      if (hasUpdated && (dx || dy)) {
        this.onUpdate(this);
      }
      if (!hasReleased) {
        this.updated = false;
      } else {
        this.computeVelocity(dx, dy);
        this.angle = atan2(dy, dx);
      }
    };
    this.animate.callbacks.onComplete = () => {
      if ((!this.grabbed && this.released)) {
        // Set released to false before calling onSettle to avoid recursion
        this.released = false;
      }
      if (!this.manual) {
        this.deltaX = 0;
        this.deltaY = 0;
        this.velocity = 0;
        this.velocityStack[0] = 0;
        this.velocityStack[1] = 0;
        this.velocityStack[2] = 0;
        this.velocityStackIndex = 0;
        this.onSettle(this);
      }
    };
    this.resizeTicker = new Timer({
      autoplay: false,
      duration: 150 * globals.timeScale,
      onComplete: () => {
        this.onResize(this);
        this.refresh();
        this.onAfterResize(this);
      },
    }).init();
    this.parameters = parameters;
    this.resizeObserver = new ResizeObserver(() => {
      if (this.initialized) {
        this.resizeTicker.restart();
      } else {
        this.initialized = true;
      }
    });
    this.enable();
    this.refresh();
    this.resizeObserver.observe(this.$container);
    if (!isObj(target)) this.resizeObserver.observe(this.$target);
  }

  /**
   * @param  {Number} dx
   * @param  {Number} dy
   * @return {Number}
   */
  computeVelocity(dx, dy) {
    const prevTime = this.velocityTime;
    const curTime = now();
    const elapsed = curTime - prevTime;
    if (elapsed < 17) return this.velocity;
    this.velocityTime = curTime;
    const velocityStack = this.velocityStack;
    const vMul = this.velocityMultiplier;
    const minV = this.minVelocity;
    const maxV = this.maxVelocity;
    const vi = this.velocityStackIndex;
    velocityStack[vi] = round$1(clamp$1((sqrt(dx * dx + dy * dy) / elapsed) * vMul, minV, maxV), 5);
    const velocity = max(velocityStack[0], velocityStack[1], velocityStack[2]);
    this.velocity = velocity;
    this.velocityStackIndex = (vi + 1) % 3;
    return velocity;
  }

  /**
   * @param {Number}  x
   * @param {Boolean} [muteUpdateCallback]
   * @return {this}
   */
  setX(x, muteUpdateCallback = false) {
    if (this.disabled[0]) return;
    const v = round$1(x, 5);
    this.overshootTicker.pause();
    this.manual = true;
    this.updated = !muteUpdateCallback;
    this.destX = v;
    this.snapped[0] = snap$1(v, this.snapX);
    this.animate[this.xProp](v, 0);
    this.manual = false;
    return this;
  }

  /**
   * @param {Number}  y
   * @param {Boolean} [muteUpdateCallback]
   * @return {this}
   */
  setY(y, muteUpdateCallback = false) {
    if (this.disabled[1]) return;
    const v = round$1(y, 5);
    this.overshootTicker.pause();
    this.manual = true;
    this.updated = !muteUpdateCallback;
    this.destY = v;
    this.snapped[1] = snap$1(v, this.snapY);
    this.animate[this.yProp](v, 0);
    this.manual = false;
    return this;
  }

  get x() {
    return round$1(/** @type {Number} */(this.animate[this.xProp]()), globals.precision);
  }

  set x(x) {
    this.setX(x, false);
  }

  get y() {
    return round$1(/** @type {Number} */(this.animate[this.yProp]()), globals.precision);
  }

  set y(y) {
    this.setY(y, false);
  }

  get progressX() {
    return mapRange$1(this.x, this.containerBounds[3], this.containerBounds[1], 0, 1);
  }

  set progressX(x) {
    this.setX(mapRange$1(x, 0, 1, this.containerBounds[3], this.containerBounds[1]), false);
  }

  get progressY() {
    return mapRange$1(this.y, this.containerBounds[0], this.containerBounds[2], 0, 1);
  }

  set progressY(y) {
    this.setY(mapRange$1(y, 0, 1, this.containerBounds[0], this.containerBounds[2]), false);
  }

  updateScrollCoords() {
    const sx = round$1(this.useWin ? win.scrollX : this.$container.scrollLeft, 0);
    const sy = round$1(this.useWin ? win.scrollY : this.$container.scrollTop, 0);
    const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
    const threshold = this.scrollThreshold;
    this.scroll.x = sx;
    this.scroll.y = sy;
    this.scrollBounds[0] = sy - this.targetBounds[0] + cpt - threshold;
    this.scrollBounds[1] = sx - this.targetBounds[1] - cpr + threshold;
    this.scrollBounds[2] = sy - this.targetBounds[2] - cpb + threshold;
    this.scrollBounds[3] = sx - this.targetBounds[3] + cpl - threshold;
  }

  updateBoundingValues() {
    const $container = this.$container;
    // Return early if no $container defined to prevents error when reading scrollWidth / scrollHeight
    // https://github.com/juliangarnier/anime/issues/1064
    if (!$container) return;
    const cx = this.x;
    const cy = this.y;
    const cx2 = this.coords[2];
    const cy2 =  this.coords[3];
    // Prevents interfering with the scroll area in cases the target is outside of the container
    // Make sure the temp coords are also adjuset to prevents wrong delta calculation on updates
    this.coords[2] = 0;
    this.coords[3] = 0;
    this.setX(0, true);
    this.setY(0, true);
    this.transforms.remove();
    const iw = this.window[0] = win.innerWidth;
    const ih = this.window[1] = win.innerHeight;
    const uw = this.useWin;
    const sw = $container.scrollWidth;
    const sh = $container.scrollHeight;
    const fx = this.fixed;
    const transformContainerRect = $container.getBoundingClientRect();
    const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
    this.dragArea[0] = uw ? 0 : transformContainerRect.left;
    this.dragArea[1] = uw ? 0 : transformContainerRect.top;
    this.scrollView[0] = uw ? clamp$1(sw, iw, sw) : sw;
    this.scrollView[1] = uw ? clamp$1(sh, ih, sh) : sh;
    this.updateScrollCoords();
    const { width, height, left, top, right, bottom } = $container.getBoundingClientRect();
    this.dragArea[2] = round$1(uw ? clamp$1(width, iw, iw) : width, 0);
    this.dragArea[3] = round$1(uw ? clamp$1(height, ih, ih) : height, 0);
    const containerOverflow = get($container, 'overflow');
    const visibleOverflow = containerOverflow === 'visible';
    const hiddenOverflow = containerOverflow === 'hidden';
    this.canScroll = fx ? false :
      this.contained &&
      (($container === doc.body && visibleOverflow) || (!hiddenOverflow && !visibleOverflow)) &&
      (sw > this.dragArea[2] + cpl - cpr || sh > this.dragArea[3] + cpt - cpb) &&
      (!this.containerArray || (this.containerArray && !isArr(this.containerArray)));
    if (this.contained) {
      const sx = this.scroll.x;
      const sy = this.scroll.y;
      const canScroll = this.canScroll;
      const targetRect = this.$target.getBoundingClientRect();
      const hiddenLeft = canScroll ? uw ? 0 : $container.scrollLeft : 0;
      const hiddenTop = canScroll ? uw ? 0 : $container.scrollTop : 0;
      const hiddenRight = canScroll ? this.scrollView[0] - hiddenLeft - width : 0;
      const hiddenBottom = canScroll ? this.scrollView[1] - hiddenTop - height : 0;
      this.targetBounds[0] = round$1((targetRect.top + sy) - (uw ? 0 : top), 0);
      this.targetBounds[1] = round$1((targetRect.right + sx) - (uw ? iw : right), 0);
      this.targetBounds[2] = round$1((targetRect.bottom + sy) - (uw ? ih : bottom), 0);
      this.targetBounds[3] = round$1((targetRect.left + sx) - (uw ? 0 : left), 0);
      if (this.containerArray) {
        this.containerBounds[0] = this.containerArray[0] + cpt;
        this.containerBounds[1] = this.containerArray[1] - cpr;
        this.containerBounds[2] = this.containerArray[2] - cpb;
        this.containerBounds[3] = this.containerArray[3] + cpl;
      } else {
        this.containerBounds[0] = -round$1(targetRect.top - (fx ? clamp$1(top, 0, ih) : top) + hiddenTop - cpt, 0);
        this.containerBounds[1] = -round$1(targetRect.right - (fx ? clamp$1(right, 0, iw) : right) - hiddenRight + cpr, 0);
        this.containerBounds[2] = -round$1(targetRect.bottom - (fx ? clamp$1(bottom, 0, ih) : bottom) - hiddenBottom + cpb, 0);
        this.containerBounds[3] = -round$1(targetRect.left - (fx ? clamp$1(left, 0, iw) : left) + hiddenLeft - cpl, 0);
      }
    }
    this.transforms.revert();
    // Restore coordinates
    this.coords[2] = cx2;
    this.coords[3] = cy2;
    this.setX(cx, true);
    this.setY(cy, true);
  }

  /**
   * @param  {Array} bounds
   * @param  {Number} x
   * @param  {Number} y
   * @return {Number}
   */
  isOutOfBounds(bounds, x, y) {
    // Returns 0 if not OB, 1 if x is OB, 2 if y is OB, 3 if both x and y are OB
    if (!this.contained) return 0;
    const [ bt, br, bb, bl ] = bounds;
    const [ dx, dy ] = this.disabled;
    const obx = !dx && x < bl || !dx && x > br;
    const oby = !dy && y < bt || !dy && y > bb;
    return obx && !oby ? 1 : !obx && oby ? 2 : obx && oby ? 3 : 0;
  }

  refresh() {
    const params = this.parameters;
    const paramX = params.x;
    const paramY = params.y;
    const container = parseDraggableFunctionParameter(params.container, this);
    const cp = parseDraggableFunctionParameter(params.containerPadding, this) || 0;
    const containerPadding = /** @type {[Number, Number, Number, Number]} */(isArr(cp) ? cp : [cp, cp, cp, cp]);
    const cx = this.x;
    const cy = this.y;
    const parsedCursorStyles = parseDraggableFunctionParameter(params.cursor, this);
    const cursorStyles = { onHover: 'grab', onGrab: 'grabbing' };
    if (parsedCursorStyles) {
      const { onHover, onGrab } = /** @type {DraggableCursorParams} */(parsedCursorStyles);
      if (onHover) cursorStyles.onHover = onHover;
      if (onGrab) cursorStyles.onGrab = onGrab;
    }
    const parsedDragThreshold = parseDraggableFunctionParameter(params.dragThreshold, this);
    const dragThreshold = { mouse: 3, touch: 7 };
    if (isNum(parsedDragThreshold)) {
      dragThreshold.mouse = parsedDragThreshold;
      dragThreshold.touch = parsedDragThreshold;
    } else if (parsedDragThreshold) {
      const { mouse, touch } = parsedDragThreshold;
      if (!isUnd(mouse)) dragThreshold.mouse = mouse;
      if (!isUnd(touch)) dragThreshold.touch = touch;
    }
    this.containerArray = isArr(container) ? container : null;
    this.$container = /** @type {HTMLElement} */(container && !this.containerArray ? parseTargets(/** @type {DOMTarget} */(container))[0] : doc.body);
    this.useWin = this.$container === doc.body;
    /** @type {Window | HTMLElement} */
    this.$scrollContainer = this.useWin ? win : this.$container;
    this.isFinePointer = matchMedia('(pointer:fine)').matches;
    this.containerPadding = setValue(containerPadding, [0, 0, 0, 0]);
    this.containerFriction = clamp$1(setValue(parseDraggableFunctionParameter(params.containerFriction, this), .8), 0, 1);
    this.releaseContainerFriction = clamp$1(setValue(parseDraggableFunctionParameter(params.releaseContainerFriction, this), this.containerFriction), 0, 1);
    this.snapX = parseDraggableFunctionParameter(isObj(paramX) && !isUnd(paramX.snap) ? paramX.snap : params.snap, this);
    this.snapY = parseDraggableFunctionParameter(isObj(paramY) && !isUnd(paramY.snap) ? paramY.snap : params.snap, this);
    this.scrollSpeed = setValue(parseDraggableFunctionParameter(params.scrollSpeed, this), 1.5);
    this.scrollThreshold = setValue(parseDraggableFunctionParameter(params.scrollThreshold, this), 20);
    this.dragSpeed = setValue(parseDraggableFunctionParameter(params.dragSpeed, this), 1);
    this.dragThreshold = this.isFinePointer ? dragThreshold.mouse : dragThreshold.touch;
    this.minVelocity = setValue(parseDraggableFunctionParameter(params.minVelocity, this), 0);
    this.maxVelocity = setValue(parseDraggableFunctionParameter(params.maxVelocity, this), 50);
    this.velocityMultiplier = setValue(parseDraggableFunctionParameter(params.velocityMultiplier, this), 1);
    this.cursor = parsedCursorStyles === false ? false : cursorStyles;
    this.updateBoundingValues();

    // const ob = this.isOutOfBounds(this.containerBounds, this.x, this.y);
    // if (ob === 1 || ob === 3) this.progressX = px;
    // if (ob === 2 || ob === 3) this.progressY = py;

    // if (this.initialized && this.contained) {
    //   if (this.progressX !== px) this.progressX = px;
    //   if (this.progressY !== py) this.progressY = py;
    // }

    const [ bt, br, bb, bl ] = this.containerBounds;
    this.setX(clamp$1(cx, bl, br), true);
    this.setY(clamp$1(cy, bt, bb), true);
  }

  update() {
    this.updateScrollCoords();
    if (this.canScroll) {
      const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
      const [ sw, sh ] = this.scrollView;
      const daw = this.dragArea[2];
      const dah = this.dragArea[3];
      const csx = this.scroll.x;
      const csy = this.scroll.y;
      const nsw = this.$container.scrollWidth;
      const nsh = this.$container.scrollHeight;
      const csw = this.useWin ? clamp$1(nsw, this.window[0], nsw) : nsw;
      const csh = this.useWin ? clamp$1(nsh, this.window[1], nsh) : nsh;
      const swd = sw - csw;
      const shd = sh - csh;
      // Handle cases where the scrollarea dimensions changes during drag
      if (this.dragged && swd > 0) {
        this.coords[0] -= swd;
        this.scrollView[0] = csw;
      }
      if (this.dragged && shd > 0) {
        this.coords[1] -= shd;
        this.scrollView[1] = csh;
      }
      // Handle autoscroll when target is at the edges of the scroll bounds
      const s = this.scrollSpeed * 10;
      const threshold = this.scrollThreshold;
      const [ x, y ] = this.coords;
      const [ st, sr, sb, sl ] = this.scrollBounds;
      const t = round$1(clamp$1((y - st + cpt) / threshold, -1, 0) * s, 0);
      const r = round$1(clamp$1((x - sr - cpr) / threshold, 0, 1) * s, 0);
      const b = round$1(clamp$1((y - sb - cpb) / threshold, 0, 1) * s, 0);
      const l = round$1(clamp$1((x - sl + cpl) / threshold, -1, 0) * s, 0);
      if (t || b || l || r) {
        const [nx, ny] = this.disabled;
        let scrollX = csx;
        let scrollY = csy;
        if (!nx) {
          scrollX = round$1(clamp$1(csx + (l || r), 0, sw - daw), 0);
          this.coords[0] -= csx - scrollX;
        }
        if (!ny) {
          scrollY = round$1(clamp$1(csy + (t || b), 0, sh - dah), 0);
          this.coords[1] -= csy - scrollY;
        }
        // Note: Safari mobile requires to use different scroll methods depending if using the window or not
        if (this.useWin) {
          this.$scrollContainer.scrollBy(-(csx - scrollX), -(csy - scrollY));
        } else {
          this.$scrollContainer.scrollTo(scrollX, scrollY);
        }
      }
    }
    const [ ct, cr, cb, cl ] = this.containerBounds;
    const [ px1, py1, px2, py2, px3, py3 ] = this.pointer;
    this.coords[0] += (px1 - px3) * this.dragSpeed;
    this.coords[1] += (py1 - py3) * this.dragSpeed;
    this.pointer[4] = px1;
    this.pointer[5] = py1;
    const [ cx, cy ] = this.coords;
    const [ sx, sy ] = this.snapped;
    const cf = (1 - this.containerFriction) * this.dragSpeed;
    this.setX(cx > cr ? cr + (cx - cr) * cf : cx < cl ? cl + (cx - cl) * cf : cx, false);
    this.setY(cy > cb ? cb + (cy - cb) * cf : cy < ct ? ct + (cy - ct) * cf : cy, false);
    this.computeVelocity(px1 - px3, py1 - py3);
    this.angle = atan2(py1 - py2, px1 - px2);
    const [ nsx, nsy ] = this.snapped;
    if (nsx !== sx && this.snapX || nsy !== sy && this.snapY) {
      this.onSnap(this);
    }
  }

  stop() {
    this.updateTicker.pause();
    this.overshootTicker.pause();
    // Pauses the in bounds onRelease animations
    for (let prop in this.animate.animations) this.animate.animations[prop].pause();
    removeTargetsFromRenderable([this], null, 'x');
    removeTargetsFromRenderable([this], null, 'y');
    removeTargetsFromRenderable([this], null, 'progressX');
    removeTargetsFromRenderable([this], null, 'progressY');
    removeTargetsFromRenderable([this.scroll]); // Removes any active animations on the container scroll
    removeTargetsFromRenderable([this.overshootCoords]); // Removes active overshoot animations
    return this;
  }

  /**
   * @param {Number} [duration]
   * @param {Number} [gap]
   * @param {EasingParam} [ease]
   * @return {this}
   */
  scrollInView(duration, gap = 0, ease = eases.inOutQuad) {
    this.updateScrollCoords();
    const x = this.destX;
    const y = this.destY;
    const scroll = this.scroll;
    const scrollBounds = this.scrollBounds;
    const canScroll = this.canScroll;
    if (!this.containerArray && this.isOutOfBounds(scrollBounds, x, y)) {
      const [ st, sr, sb, sl ] = scrollBounds;
      const t = round$1(clamp$1(y - st, -maxValue, 0), 0);
      const r = round$1(clamp$1(x - sr, 0, maxValue), 0);
      const b = round$1(clamp$1(y - sb, 0, maxValue), 0);
      const l = round$1(clamp$1(x - sl, -maxValue, 0), 0);
      new JSAnimation(scroll, {
        x: round$1(scroll.x + (l ? l - gap : r ? r + gap : 0), 0),
        y: round$1(scroll.y + (t ? t - gap : b ? b + gap : 0), 0),
        duration: isUnd(duration) ? 350 * globals.timeScale : duration,
        ease,
        onUpdate: () => {
          this.canScroll = false;
          this.$scrollContainer.scrollTo(scroll.x, scroll.y);
        }
      }).init().then(() => {
        this.canScroll = canScroll;
      });
    }
    return this;
  }

  handleHover() {
    if (this.isFinePointer && this.cursor && !this.cursorStyles) {
      this.cursorStyles = set(this.$trigger, {
        cursor: /** @type {DraggableCursorParams} */(this.cursor).onHover
      });
    }
  }

  /**
   * @param  {Number} [duration]
   * @param  {Number} [gap]
   * @param  {EasingParam} [ease]
   * @return {this}
   */
  animateInView(duration, gap = 0, ease = eases.inOutQuad) {
    this.stop();
    this.updateBoundingValues();
    const x = this.x;
    const y = this.y;
    const [ cpt, cpr, cpb, cpl ] = this.containerPadding;
    const bt = this.scroll.y - this.targetBounds[0] + cpt + gap;
    const br = this.scroll.x - this.targetBounds[1] - cpr - gap;
    const bb = this.scroll.y - this.targetBounds[2] - cpb - gap;
    const bl = this.scroll.x - this.targetBounds[3] + cpl + gap;
    const ob = this.isOutOfBounds([bt, br, bb, bl], x, y);
    if (ob) {
      const [ disabledX, disabledY ] = this.disabled;
      const destX = clamp$1(snap$1(x, this.snapX), bl, br);
      const destY = clamp$1(snap$1(y, this.snapY), bt, bb);
      const dur = isUnd(duration) ? 350 * globals.timeScale : duration;
      if (!disabledX && (ob === 1 || ob === 3)) this.animate[this.xProp](destX, dur, ease);
      if (!disabledY && (ob === 2 || ob === 3)) this.animate[this.yProp](destY, dur, ease);
    }
    return this;
  }

  /**
   * @param {MouseEvent|TouchEvent} e
   */
  handleDown(e) {
    const $eTarget = /** @type {HTMLElement} */(e.target);
    if (this.grabbed || /** @type {HTMLInputElement} */($eTarget).type === 'range') return;

    e.stopPropagation();

    this.grabbed = true;
    this.released = false;
    this.stop();
    this.updateBoundingValues();
    const touches = /** @type {TouchEvent} */(e).changedTouches;
    const eventX = touches ? touches[0].clientX : /** @type {MouseEvent} */(e).clientX;
    const eventY = touches ? touches[0].clientY : /** @type {MouseEvent} */(e).clientY;
    const { x, y } = this.transforms.normalizePoint(eventX, eventY);
    const [ ct, cr, cb, cl ] = this.containerBounds;
    const cf = (1 - this.containerFriction) * this.dragSpeed;
    const cx = this.x;
    const cy = this.y;
    this.coords[0] = this.coords[2] = !cf ? cx : cx > cr ? cr + (cx - cr) / cf : cx < cl ? cl + (cx - cl) / cf : cx;
    this.coords[1] = this.coords[3] = !cf ? cy : cy > cb ? cb + (cy - cb) / cf : cy < ct ? ct + (cy - ct) / cf : cy;
    this.pointer[0] = x;
    this.pointer[1] = y;
    this.pointer[2] = x;
    this.pointer[3] = y;
    this.pointer[4] = x;
    this.pointer[5] = y;
    this.pointer[6] = x;
    this.pointer[7] = y;
    this.deltaX = 0;
    this.deltaY = 0;
    this.velocity = 0;
    this.velocityStack[0] = 0;
    this.velocityStack[1] = 0;
    this.velocityStack[2] = 0;
    this.velocityStackIndex = 0;
    this.angle = 0;
    if (this.targetStyles) {
      this.targetStyles.revert();
      this.targetStyles = null;
    }
    const z = /** @type {Number} */(get(this.$target, 'zIndex', false));
    zIndex = (z > zIndex ? z : zIndex) + 1;
    this.targetStyles = set(this.$target, { zIndex });
    if (this.triggerStyles) {
      this.triggerStyles.revert();
      this.triggerStyles = null;
    }
    if (this.cursorStyles) {
      this.cursorStyles.revert();
      this.cursorStyles = null;
    }
    if (this.isFinePointer && this.cursor) {
      this.bodyStyles = set(doc.body, {
        cursor: /** @type {DraggableCursorParams} */(this.cursor).onGrab
      });
    }
    this.scrollInView(100, 0, eases.out(3));
    this.onGrab(this);

    doc.addEventListener('touchmove', this);
    doc.addEventListener('touchend', this);
    doc.addEventListener('touchcancel', this);
    doc.addEventListener('mousemove', this);
    doc.addEventListener('mouseup', this);
    doc.addEventListener('selectstart', this);
  }

  /**
   * @param {MouseEvent|TouchEvent} e
   */
  handleMove(e) {
    if (!this.grabbed) return;
    const touches = /** @type {TouchEvent} */(e).changedTouches;
    const eventX = touches ? touches[0].clientX : /** @type {MouseEvent} */(e).clientX;
    const eventY = touches ? touches[0].clientY : /** @type {MouseEvent} */(e).clientY;
    const { x, y } = this.transforms.normalizePoint(eventX, eventY);
    const movedX = x - this.pointer[6];
    const movedY = y - this.pointer[7];

    let $parent = /** @type {HTMLElement} */(e.target);
    let isAtTop = false;
    let isAtBottom = false;
    let canTouchScroll = false;

    while (touches && $parent && $parent !== this.$trigger) {
      const overflowY = get($parent, 'overflow-y');
      if (overflowY !== 'hidden' && overflowY !== 'visible') {
        const { scrollTop, scrollHeight, clientHeight } = $parent;
        if (scrollHeight > clientHeight) {
          canTouchScroll = true;
          isAtTop = scrollTop <= 3;
          isAtBottom = scrollTop >= (scrollHeight - clientHeight) - 3;
          break;
        }
      }
      $parent = $parent.parentElement;
    }

    if (canTouchScroll && ((!isAtTop && !isAtBottom) || (isAtTop && movedY < 0) || (isAtBottom && movedY > 0))) {

      this.pointer[0] = x;
      this.pointer[1] = y;
      this.pointer[2] = x;
      this.pointer[3] = y;
      this.pointer[4] = x;
      this.pointer[5] = y;
      this.pointer[6] = x;
      this.pointer[7] = y;

    } else {

      preventDefault(e);

      // Needed to prevents click on handleUp
      if (!this.triggerStyles) this.triggerStyles = set(this.$trigger, { pointerEvents: 'none' });
      // Needed to prevent page scroll while dragging on touch devvice
      this.$trigger.addEventListener('touchstart', preventDefault, { passive: false });
      this.$trigger.addEventListener('touchmove', preventDefault, { passive: false });
      this.$trigger.addEventListener('touchend', preventDefault);

      // Don't check for a miminim distance move if already dragging
      if (this.dragged || (!this.disabled[0] && abs(movedX) > this.dragThreshold) || (!this.disabled[1] && abs(movedY) > this.dragThreshold)) {
        this.updateTicker.resume();
        this.pointer[2] = this.pointer[0];
        this.pointer[3] = this.pointer[1];
        this.pointer[0] = x;
        this.pointer[1] = y;
        this.dragged = true;
        this.released = false;
        this.onDrag(this);
      }
    }
  }

  handleUp() {

    if (!this.grabbed) return;

    this.updateTicker.pause();

    if (this.triggerStyles) {
      this.triggerStyles.revert();
      this.triggerStyles = null;
    }

    if (this.bodyStyles) {
      this.bodyStyles.revert();
      this.bodyStyles = null;
    }

    const [ disabledX, disabledY ] = this.disabled;
    const [ px1, py1, px2, py2, px3, py3 ] = this.pointer;
    const [ ct, cr, cb, cl ] = this.containerBounds;
    const [ sx, sy ] = this.snapped;
    const springX = this.releaseXSpring;
    const springY = this.releaseYSpring;
    const releaseEase = this.releaseEase;
    const hasReleaseSpring = this.hasReleaseSpring;
    const overshootCoords = this.overshootCoords;
    const cx = this.x;
    const cy = this.y;
    const pv = this.computeVelocity(px1 - px3, py1 - py3);
    const pa = this.angle = atan2(py1 - py2, px1 - px2);
    const ds = pv * 150;
    const cf = (1 - this.releaseContainerFriction) * this.dragSpeed;
    const nx = cx + (cos(pa) * ds);
    const ny = cy + (sin(pa) * ds);
    const bx = nx > cr ? cr + (nx - cr) * cf : nx < cl ? cl + (nx - cl) * cf : nx;
    const by = ny > cb ? cb + (ny - cb) * cf : ny < ct ? ct + (ny - ct) * cf : ny;
    const dx = this.destX = clamp$1(round$1(snap$1(bx, this.snapX), 5), cl, cr);
    const dy = this.destY = clamp$1(round$1(snap$1(by, this.snapY), 5), ct, cb);
    const ob = this.isOutOfBounds(this.containerBounds, nx, ny);

    let durationX = 0;
    let durationY = 0;
    let easeX = releaseEase;
    let easeY = releaseEase;
    let longestReleaseDuration = 0;

    overshootCoords.x = cx;
    overshootCoords.y = cy;

    if (!disabledX) {
      const directionX = dx === cr ? cx > cr ? -1 : 1 : cx < cl ? -1 : 1;
      const distanceX = round$1(cx - dx, 0);
      springX.velocity = disabledY && hasReleaseSpring ? distanceX ? (ds * directionX) / abs(distanceX) : 0 : pv;
      const { ease, settlingDuration, restDuration } = springX;
      durationX = cx === dx ? 0 : hasReleaseSpring ? settlingDuration : settlingDuration - (restDuration * globals.timeScale);
      if (hasReleaseSpring) easeX = ease;
      if (durationX > longestReleaseDuration) longestReleaseDuration = durationX;
    }

    if (!disabledY) {
      const directionY = dy === cb ? cy > cb ? -1 : 1 : cy < ct ? -1 : 1;
      const distanceY = round$1(cy - dy, 0);
      springY.velocity = disabledX && hasReleaseSpring ? distanceY ? (ds * directionY) / abs(distanceY) : 0 : pv;
      const { ease, settlingDuration, restDuration } = springY;
      durationY = cy === dy ? 0 : hasReleaseSpring ? settlingDuration : settlingDuration - (restDuration * globals.timeScale);
      if (hasReleaseSpring) easeY = ease;
      if (durationY > longestReleaseDuration) longestReleaseDuration = durationY;
    }

    if (!hasReleaseSpring && ob && cf && (durationX || durationY)) {

        const composition = compositionTypes.blend;

        new JSAnimation(overshootCoords, {
          x: { to: bx, duration: durationX * .65 },
          y: { to: by, duration: durationY * .65 },
          ease: releaseEase,
          composition,
        }).init();

        new JSAnimation(overshootCoords, {
          x: { to: dx, duration: durationX },
          y: { to: dy, duration: durationY },
          ease: releaseEase,
          composition,
        }).init();

        this.overshootTicker.stretch(max(durationX, durationY)).restart();

    } else {

      if (!disabledX) this.animate[this.xProp](dx, durationX, easeX);
      if (!disabledY) this.animate[this.yProp](dy, durationY, easeY);

    }

    this.scrollInView(longestReleaseDuration, this.scrollThreshold, releaseEase);

    let hasSnapped = false;

    if (dx !== sx) {
      this.snapped[0] = dx;
      if (this.snapX) hasSnapped = true;
    }

    if (dy !== sy && this.snapY) {
      this.snapped[1] = dy;
      if (this.snapY) hasSnapped = true;
    }

    if (hasSnapped) this.onSnap(this);

    this.grabbed = false;
    this.dragged = false;
    this.updated = true;
    this.released = true;

    // It's important to trigger the callback after the release animations to be able to cancel them
    this.onRelease(this);

    this.$trigger.removeEventListener('touchstart', preventDefault);
    this.$trigger.removeEventListener('touchmove', preventDefault);
    this.$trigger.removeEventListener('touchend', preventDefault);

    doc.removeEventListener('touchmove', this);
    doc.removeEventListener('touchend', this);
    doc.removeEventListener('touchcancel', this);
    doc.removeEventListener('mousemove', this);
    doc.removeEventListener('mouseup', this);
    doc.removeEventListener('selectstart', this);
  }

  reset() {
    this.stop();
    this.resizeTicker.pause();
    this.grabbed = false;
    this.dragged = false;
    this.updated = false;
    this.released = false;
    this.canScroll = false;
    this.setX(0, true);
    this.setY(0, true);
    this.coords[0] = 0;
    this.coords[1] = 0;
    this.pointer[0] = 0;
    this.pointer[1] = 0;
    this.pointer[2] = 0;
    this.pointer[3] = 0;
    this.pointer[4] = 0;
    this.pointer[5] = 0;
    this.pointer[6] = 0;
    this.pointer[7] = 0;
    this.velocity = 0;
    this.velocityStack[0] = 0;
    this.velocityStack[1] = 0;
    this.velocityStack[2] = 0;
    this.velocityStackIndex = 0;
    this.angle = 0;
    return this;
  }

  enable() {
    if (!this.enabled) {
      this.enabled = true;
      this.$target.classList.remove('is-disabled');
      this.touchActionStyles = set(this.$trigger, {
        touchAction: this.disabled[0] ? 'pan-x' : this.disabled[1] ? 'pan-y' : 'none'
      });
      this.$trigger.addEventListener('touchstart', this, { passive: true });
      this.$trigger.addEventListener('mousedown', this, { passive: true });
      this.$trigger.addEventListener('mouseenter', this);
    }
    return this;
  }

  disable() {
    this.enabled = false;
    this.grabbed = false;
    this.dragged = false;
    this.updated = false;
    this.released = false;
    this.canScroll = false;
    this.touchActionStyles.revert();
    if (this.cursorStyles) {
      this.cursorStyles.revert();
      this.cursorStyles = null;
    }
    if (this.triggerStyles) {
      this.triggerStyles.revert();
      this.triggerStyles = null;
    }
    if (this.bodyStyles) {
      this.bodyStyles.revert();
      this.bodyStyles = null;
    }
    if (this.targetStyles) {
      this.targetStyles.revert();
      this.targetStyles = null;
    }
    this.$target.classList.add('is-disabled');
    this.$trigger.removeEventListener('touchstart', this);
    this.$trigger.removeEventListener('mousedown', this);
    this.$trigger.removeEventListener('mouseenter', this);
    doc.removeEventListener('touchmove', this);
    doc.removeEventListener('touchend', this);
    doc.removeEventListener('touchcancel', this);
    doc.removeEventListener('mousemove', this);
    doc.removeEventListener('mouseup', this);
    doc.removeEventListener('selectstart', this);
    return this;
  }

  revert() {
    this.reset();
    this.disable();
    this.$target.classList.remove('is-disabled');
    this.updateTicker.revert();
    this.overshootTicker.revert();
    this.resizeTicker.revert();
    this.animate.revert();
    this.resizeObserver.disconnect();
    return this;
  }

  /**
   * @param {Event} e
   */
  handleEvent(e) {
    switch (e.type) {
      case 'mousedown':
        this.handleDown(/** @type {MouseEvent} */(e));
        break;
      case 'touchstart':
        this.handleDown(/** @type {TouchEvent} */(e));
        break;
      case 'mousemove':
        this.handleMove(/** @type {MouseEvent} */(e));
        break;
      case 'touchmove':
        this.handleMove(/** @type {TouchEvent} */(e));
        break;
      case 'mouseup':
        this.handleUp();
        break;
      case 'touchend':
        this.handleUp();
        break;
      case 'touchcancel':
        this.handleUp();
        break;
      case 'mouseenter':
        this.handleHover();
        break;
      case 'selectstart':
        preventDefault(e);
        break;
    }
  }
}

/**
 * @param {TargetsParam} target
 * @param {DraggableParams} [parameters]
 * @return {Draggable}
 */
const createDraggable = (target, parameters) => new Draggable(target, parameters);



/**
 * @param  {Callback<Timer>} [callback]
 * @return {Timer}
 */
const sync = (callback = noop) => {
  return new Timer({ duration: 1 * globals.timeScale, onComplete: callback }, null, 0).resume();
};

/**
 * @template {Tickable | ((...args: any[]) => void) | void} T
 * @param  {(...args: any[]) => T} constructor
 * @return {(...args: any[]) => T extends void ? () => void : T}
 */
const keepTime = constructor => {
  /** @type {Tickable} */
  let tracked;
  return /** @type {(...args: any[]) => T extends void ? () => void : T} */(/** @type {*} */((...args) => {
    let currentIteration, currentIterationProgress, reversed, alternate, startTime;
    if (tracked) {
      currentIteration = tracked.currentIteration;
      currentIterationProgress = tracked.iterationProgress;
      reversed = tracked.reversed;
      alternate = tracked._alternate;
      startTime = tracked._startTime;
      tracked.revert();
    }
    const cleanup = constructor(...args);
    if (cleanup && !isFnc(cleanup) && cleanup.revert) tracked = cleanup;
    if (!isUnd(currentIterationProgress)) {
      /** @type {Tickable} */(tracked).currentIteration = currentIteration;
      /** @type {Tickable} */(tracked).iterationProgress = (alternate ? !(currentIteration % 2) ? reversed : !reversed : reversed) ? 1 - currentIterationProgress : currentIterationProgress;
      /** @type {Tickable} */(tracked)._startTime = startTime;
    }
    return cleanup || noop;
  }));
};



class Scope {
  /** @param {ScopeParams} [parameters] */
  constructor(parameters = {}) {
    if (scope.current) scope.current.register(this);
    const rootParam = parameters.root;
    /** @type {Document|DOMTarget} */
    let root = doc;
    if (rootParam) {
      root = /** @type {ReactRef} */(rootParam).current ||
             /** @type {AngularRef} */(rootParam).nativeElement ||
             parseTargets(/** @type {DOMTargetSelector} */(rootParam))[0] ||
             doc;
    }
    const scopeDefaults = parameters.defaults;
    const globalDefault = globals.defaults;
    const mediaQueries = parameters.mediaQueries;
    /** @type {DefaultsParams} */
    this.defaults = scopeDefaults ? mergeObjects(scopeDefaults, globalDefault) : globalDefault;
    /** @type {Document|DOMTarget} */
    this.root = root;
    /** @type {Array<ScopeConstructorCallback>} */
    this.constructors = [];
    /** @type {Array<ScopeCleanupCallback>} */
    this.revertConstructors = [];
    /** @type {Array<Revertible>} */
    this.revertibles = [];
    /** @type {Array<ScopeConstructorCallback | ((scope: this) => Tickable)>} */
    this.constructorsOnce = [];
    /** @type {Array<ScopeCleanupCallback>} */
    this.revertConstructorsOnce = [];
    /** @type {Array<Revertible>} */
    this.revertiblesOnce = [];
    /** @type {Boolean} */
    this.once = false;
    /** @type {Number} */
    this.onceIndex = 0;
    /** @type {Record<String, ScopeMethod>} */
    this.methods = {};
    /** @type {Record<String, Boolean>} */
    this.matches = {};
    /** @type {Record<String, MediaQueryList>} */
    this.mediaQueryLists = {};
    /** @type {Record<String, any>} */
    this.data = {};
    if (mediaQueries) {
      for (let mq in mediaQueries) {
        const _mq = win.matchMedia(mediaQueries[mq]);
        this.mediaQueryLists[mq] = _mq;
        _mq.addEventListener('change', this);
      }
    }
  }

  /**
   * @param {Revertible} revertible
   */
  register(revertible) {
    const store = this.once ? this.revertiblesOnce : this.revertibles;
    store.push(revertible);
  }

  /**
   * @template T
   * @param {ScopedCallback<T>} cb
   * @return {T}
   */
  execute(cb) {
    let activeScope = scope.current;
    let activeRoot = scope.root;
    let activeDefaults = globals.defaults;
    scope.current = this;
    scope.root = this.root;
    globals.defaults = this.defaults;
    const mqs = this.mediaQueryLists;
    for (let mq in mqs) this.matches[mq] = mqs[mq].matches;
    // Restore the outer scope even when cb throws, so later objects never register to this scope.
    try {
      return cb(this);
    } finally {
      scope.current = activeScope;
      scope.root = activeRoot;
      globals.defaults = activeDefaults;
    }
  }

  /**
   * @return {this}
   */
  refresh() {
    this.onceIndex = 0;
    this.execute(() => {
      let i = this.revertibles.length;
      let y = this.revertConstructors.length;
      while (i--) this.revertibles[i].revert();
      while (y--) this.revertConstructors[y](this);
      this.revertibles.length = 0;
      this.revertConstructors.length = 0;
      this.constructors.forEach((/** @type {ScopeConstructorCallback} */constructor) => {
        const revertConstructor = constructor(this);
        if (isFnc(revertConstructor)) {
          this.revertConstructors.push(revertConstructor);
        }
      });
    });
    return this;
  }

  /**
   * @overload
   * @param {String} a1
   * @param {ScopeMethod} a2
   * @return {this}
   *
   * @overload
   * @param {ScopeConstructorCallback} a1
   * @return {this}
   *
   * @param {String|ScopeConstructorCallback} a1
   * @param {ScopeMethod} [a2]
   */
  add(a1, a2) {
    this.once = false;
    if (isFnc(a1)) {
      const constructor = /** @type {ScopeConstructorCallback} */(a1);
      this.constructors.push(constructor);
      this.execute(() => {
        const revertConstructor = constructor(this);
        if (isFnc(revertConstructor)) {
          this.revertConstructors.push(revertConstructor);
        }
      });
    } else {
      this.methods[/** @type {String} */(a1)] = (/** @type {any} */...args) => this.execute(() => a2(...args));
    }
    return this;
  }

  /**
   * @param {ScopeConstructorCallback} scopeConstructorCallback
   * @return {this}
   */
  addOnce(scopeConstructorCallback) {
    this.once = true;
    if (isFnc(scopeConstructorCallback)) {
      const currentIndex = this.onceIndex++;
      const tracked = this.constructorsOnce[currentIndex];
      if (tracked) return this;
      const constructor = /** @type {ScopeConstructorCallback} */(scopeConstructorCallback);
      this.constructorsOnce[currentIndex] = constructor;
      this.execute(() => {
        const revertConstructor = constructor(this);
        if (isFnc(revertConstructor)) {
          this.revertConstructorsOnce.push(revertConstructor);
        }
      });
    }
    return this;
  }

  /**
   * @param  {(scope: this) => Tickable} cb
   * @return {Tickable}
   */
  keepTime(cb) {
    this.once = true;
    const currentIndex = this.onceIndex++;
    const tracked = /** @type {(scope: this) => Tickable} */(this.constructorsOnce[currentIndex]);
    if (isFnc(tracked)) return tracked(this);
    const constructor = /** @type {(scope: this) => Tickable} */(keepTime(cb));
    this.constructorsOnce[currentIndex] = constructor;
    let trackedTickable;
    this.execute(() => {
      trackedTickable = constructor(this);
    });
    return trackedTickable;
  }

  /**
   * @param {Event} e
   */
  handleEvent(e) {
    switch (e.type) {
      case 'change':
        this.refresh();
        break;
    }
  }

  revert() {
    const revertibles = this.revertibles;
    const revertConstructors = this.revertConstructors;
    const revertiblesOnce = this.revertiblesOnce;
    const revertConstructorsOnce = this.revertConstructorsOnce;
    const mqs = this.mediaQueryLists;
    let i = revertibles.length;
    let j = revertConstructors.length;
    let k = revertiblesOnce.length;
    let l = revertConstructorsOnce.length;
    while (i--) revertibles[i].revert();
    while (j--) revertConstructors[j](this);
    while (k--) revertiblesOnce[k].revert();
    while (l--) revertConstructorsOnce[l](this);
    for (let mq in mqs) mqs[mq].removeEventListener('change', this);
    revertibles.length = 0;
    revertConstructors.length = 0;
    this.constructors.length = 0;
    revertiblesOnce.length = 0;
    revertConstructorsOnce.length = 0;
    this.constructorsOnce.length = 0;
    this.onceIndex = 0;
    this.matches = {};
    this.methods = {};
    this.mediaQueryLists = {};
    this.data = {};
  }
}

/**
 * @param {ScopeParams} [params]
 * @return {Scope}
 */
const createScope = params => new Scope(params);









/**
 * @return {Number}
 */
const getMaxViewHeight = () => {
  const $el = doc.createElement('div');
  doc.body.appendChild($el);
  $el.style.height = '100lvh';
  const height = $el.offsetHeight;
  doc.body.removeChild($el);
  return height;
};

/**
 * @template {ScrollThresholdValue|String|Number|Boolean|Function|Object} T
 * @param {T | ((observer: ScrollObserver) => T)} value
 * @param {ScrollObserver} scroller
 * @return {T}
 */
const parseScrollObserverFunctionParameter = (value, scroller) => value && isFnc(value) ? /** @type {Function} */(value)(scroller) : /** @type {T} */(value);

const scrollContainers = new Map();

class ScrollContainer {
  /**
   * @param {HTMLElement} $el
   */
  constructor($el) {
    /** @type {HTMLElement} */
    this.element = $el;
    /** @type {Boolean} */
    this.useWin = this.element === doc.body;
    /** @type {Number} */
    this.winWidth = 0;
    /** @type {Number} */
    this.winHeight = 0;
    /** @type {Number} */
    this.width = 0;
    /** @type {Number} */
    this.height = 0;
    /** @type {Number} */
    this.left = 0;
    /** @type {Number} */
    this.top = 0;
    /** @type {Number} */
    this.scale = 1;
    /** @type {Number} */
    this.zIndex = 0;
    /** @type {Number} */
    this.scrollX = 0;
    /** @type {Number} */
    this.scrollY = 0;
    /** @type {Number} */
    this.prevScrollX = 0;
    /** @type {Number} */
    this.prevScrollY = 0;
    /** @type {Number} */
    this.scrollWidth = 0;
    /** @type {Number} */
    this.scrollHeight = 0;
    /** @type {Number} */
    this.velocity = 0;
    /** @type {Boolean} */
    this.backwardX = false;
    /** @type {Boolean} */
    this.backwardY = false;
    /** @type {Timer} */
    this.scrollTicker = new Timer({
      autoplay: false,
      onBegin: () => this.dataTimer.resume(),
      onUpdate: () => {
        const backwards = this.backwardX || this.backwardY;
        forEachChildren(this, (/** @type {ScrollObserver} */child) => child.handleScroll(), backwards);
      },
      onComplete: () => this.dataTimer.pause()
    }).init();
    /** @type {Timer} */
    this.dataTimer = new Timer({
      autoplay: false,
      frameRate: 30,
      onUpdate: (/** @type {Timer} */self) => {
        const dt = self.deltaTime;
        const px = this.prevScrollX;
        const py = this.prevScrollY;
        const nx = this.scrollX;
        const ny = this.scrollY;
        const dx = px - nx;
        const dy = py - ny;
        this.prevScrollX = nx;
        this.prevScrollY = ny;
        if (dx) this.backwardX = px > nx;
        if (dy) this.backwardY = py > ny;
        this.velocity = round$1(dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0, 5);
      }
    }).init();
    /** @type {Timer} */
    this.resizeTicker = new Timer({
      autoplay: false,
      duration: 250 * globals.timeScale,
      onComplete: () => {
        this.updateWindowBounds();
        this.refreshScrollObservers();
        this.handleScroll();
      }
    }).init();
    /** @type {Timer} */
    this.wakeTicker = new Timer({
      autoplay: false,
      duration: 500 * globals.timeScale,
      onBegin: () => {
        this.scrollTicker.resume();
      },
      onComplete: () => {
        this.scrollTicker.pause();
      }
    }).init();
    /** @type {ScrollObserver} */
    this._head = null;
    /** @type {ScrollObserver} */
    this._tail = null;
    this.updateScrollCoords();
    this.updateWindowBounds();
    this.updateBounds();
    this.refreshScrollObservers();
    this.handleScroll();
    this.resizeObserver = new ResizeObserver(() => this.resizeTicker.restart());
    this.resizeObserver.observe(this.element);
    (this.useWin ? win : this.element).addEventListener('scroll', this, false);
  }

  updateScrollCoords() {
    const useWin = this.useWin;
    const $el = this.element;
    this.scrollX = round$1(useWin ? win.scrollX : $el.scrollLeft, 0);
    this.scrollY = round$1(useWin ? win.scrollY : $el.scrollTop, 0);
  }

  updateWindowBounds() {
    this.winWidth = win.innerWidth;
    this.winHeight = getMaxViewHeight();
  }

  updateBounds() {
    const style = getComputedStyle(this.element);
    const $el = this.element;
    this.scrollWidth = $el.scrollWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    this.scrollHeight = $el.scrollHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    this.updateWindowBounds();
    let width, height;
    if (this.useWin) {
      width = this.winWidth;
      height = this.winHeight;
    } else {
      const elRect = $el.getBoundingClientRect();
      width = $el.clientWidth;
      height = $el.clientHeight;
      this.top = elRect.top;
      this.left = elRect.left;
      this.scale = elRect.width ? width / elRect.width : (elRect.height ? height / elRect.height : 1);
    }
    this.width = width;
    this.height = height;
  }

  refreshScrollObservers() {
    forEachChildren(this, (/** @type {ScrollObserver} */child) => {
      if (!child.ready) return;
      if (child._debug && child.$debug) child.$debug.style.display = 'none';
    });
    this.updateBounds();
    forEachChildren(this, (/** @type {ScrollObserver} */child) => {
      if (!child.ready) return;
      child.refresh();
      child.onResize(child);
    });
  }

  refresh() {
    this.updateWindowBounds();
    this.updateBounds();
    this.refreshScrollObservers();
    this.handleScroll();
  }

  handleScroll() {
    this.updateScrollCoords();
    this.wakeTicker.restart();
  }

  /**
   * @param {Event} e
   */
  handleEvent(e) {
    switch (e.type) {
      case 'scroll':
        this.handleScroll();
        break;
    }
  }

  revert() {
    this.scrollTicker.cancel();
    this.dataTimer.cancel();
    this.resizeTicker.cancel();
    this.wakeTicker.cancel();
    this.resizeObserver.disconnect();
    (this.useWin ? win : this.element).removeEventListener('scroll', this);
    scrollContainers.delete(this.element);
  }
}

/**
 * @param {TargetsParam} target
 * @return {ScrollContainer}
 */
const registerAndGetScrollContainer = target => {
  const $el = /** @type {HTMLElement} */(target ? parseTargets(target)[0] || doc.body : doc.body);
  let scrollContainer = scrollContainers.get($el);
  if (!scrollContainer) {
    scrollContainer = new ScrollContainer($el);
    scrollContainers.set($el, scrollContainer);
  }
  return scrollContainer;
};

/**
 * @param {HTMLElement} $el
 * @param {Number|string} v
 * @param {Number} size
 * @param {Number} [under]
 * @param {Number} [over]
 * @return {Number}
 */
const convertValueToPx = ($el, v, size, under, over) => {
  const clampMin = v === 'min';
  const clampMax = v === 'max';
  const value = v === 'top' || v === 'left' || v === 'start' || clampMin ? 0 :
                v === 'bottom' || v === 'right' || v === 'end' || clampMax ? '100%' :
                v === 'center' ? '50%' :
                v;
  const { t, n, u } = decomposeRawValue(value);
  let px = n;
  if (u === '%') {
    px = (n / 100) * size;
  } else if (u) {
    px = convertValueUnit($el, n, u, 'px', t, true);
  }
  if (clampMax && under < 0) px += under;
  if (clampMin && over > 0) px += over;
  return px;
};

/**
 * @param {HTMLElement} $el
 * @param {ScrollThresholdValue} v
 * @param {Number} size
 * @param {Number} [under]
 * @param {Number} [over]
 * @return {Number}
 */
const parseBoundValue = ($el, v, size, under, over) => {
  /** @type {Number} */
  let value;
  if (isStr(v)) {
    const matchedOperator = relativeValuesExecRgx.exec(/** @type {String} */(v));
    if (matchedOperator) {
      const splitter = matchedOperator[0];
      const operator = splitter[0];
      const splitted = /** @type {String} */(v).split(splitter);
      const clampMin = splitted[0] === 'min';
      const clampMax = splitted[0] === 'max';
      const valueAPx = convertValueToPx($el, splitted[0], size, under, over);
      const valueBPx = convertValueToPx($el, splitted[1], size, under, over);
      if (clampMin) {
        const min = getRelativeValue(convertValueToPx($el, 'min', size), valueBPx, operator);
        value = min < valueAPx ? valueAPx : min;
      } else if (clampMax) {
        const max = getRelativeValue(convertValueToPx($el, 'max', size), valueBPx, operator);
        value = max > valueAPx ? valueAPx : max;
      } else {
        value = getRelativeValue(valueAPx, valueBPx, operator);
      }
    } else {
      value = convertValueToPx($el, v, size, under, over);
    }
  } else {
    value = /** @type {Number} */(v);
  }
  return round$1(value, 0);
};

/**
 * @param {JSAnimation} linked
 * @return {HTMLElement}
 */
const getAnimationDomTarget = linked => {
  let $linkedTarget;
  const linkedTargets = linked.targets;
  for (let i = 0, l = linkedTargets.length; i < l; i++) {
    const target = linkedTargets[i];
    if (target[isDomSymbol]) {
      $linkedTarget = /** @type {HTMLElement} */(target);
      break;
    }
  }
  return $linkedTarget;
};

let scrollerIndex = 0;

const debugColors$1 = ['#B7FF54', '#FF4B4B'];

class ScrollObserver {
  /**
   * @param {ScrollObserverParams} parameters
   */
  constructor(parameters = {}) {
    if (scope.current) scope.current.register(this);
    const syncMode = setValue(parameters.sync, 'play pause');
    const ease = syncMode ? parseEase(/** @type {EasingParam} */(syncMode)) : null;
    const isLinear = syncMode && (syncMode === 'linear' || syncMode === none);
    const isEase = syncMode && !(ease === none && !isLinear);
    const isSmooth = syncMode && (isNum(syncMode) || syncMode === true || isLinear);
    const isMethods = syncMode && (isStr(syncMode) && !isEase && !isSmooth);
    const syncMethods = isMethods ? /** @type {String} */(syncMode).split(' ').map(
      (/** @type {String} */m) => () => {
        const linked = this.linked;
        return linked && linked[m] ? linked[m]() : null;
      }
    ) : null;
    const biDirSync = isMethods && syncMethods.length > 2;
    /** @type {Number} */
    this.index = scrollerIndex++;
    /** @type {String|Number} */
    this.id = !isUnd(parameters.id) ? parameters.id : this.index;
    /** @type {ScrollContainer} */
    this.container = registerAndGetScrollContainer(parameters.container);
    /** @type {HTMLElement} */
    this.target = null;
    /** @type {Tickable|WAAPIAnimation} */
    this.linked = null;
    /** @type {Boolean} */
    this.repeat = null;
    /** @type {Boolean} */
    this.horizontal = null;
    /** @type {ScrollThresholdParam|ScrollThresholdValue|ScrollThresholdCallback} */
    this.enter = null;
    /** @type {ScrollThresholdParam|ScrollThresholdValue|ScrollThresholdCallback} */
    this.leave = null;
    /** @type {Boolean} */
    this.sync = isEase || isSmooth || !!syncMethods;
    /** @type {EasingFunction} */
    this.syncEase = isEase ? ease : null;
    /** @type {Number} */
    this.syncSmooth = isSmooth ? syncMode === true || isLinear ? 1 : /** @type {Number} */(syncMode) : null;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnter = syncMethods && !biDirSync && syncMethods[0] ? syncMethods[0] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeave = syncMethods && !biDirSync && syncMethods[1] ? syncMethods[1] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnterForward = syncMethods && biDirSync && syncMethods[0] ? syncMethods[0] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeaveForward = syncMethods && biDirSync && syncMethods[1] ? syncMethods[1] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnterBackward = syncMethods && biDirSync && syncMethods[2] ? syncMethods[2] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeaveBackward = syncMethods && biDirSync && syncMethods[3] ? syncMethods[3] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnter = parameters.onEnter || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeave = parameters.onLeave || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnterForward = parameters.onEnterForward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeaveForward = parameters.onLeaveForward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnterBackward = parameters.onEnterBackward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeaveBackward = parameters.onLeaveBackward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onUpdate = parameters.onUpdate || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onResize = parameters.onResize || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncComplete = parameters.onSyncComplete || noop;
    /** @type {Boolean} */
    this.reverted = false;
    /** @type {Boolean} */
    this.ready = false;
    /** @type {Boolean} */
    this.completed = false;
    /** @type {Boolean} */
    this.began = false;
    /** @type {Boolean} */
    this.isInView = false;
    /** @type {Boolean} */
    this.forceEnter = false;
    /** @type {Boolean} */
    this.hasEntered = false;
    /** @type {Number} */
    this.offset = 0;
    /** @type {Number} */
    this.offsetStart = 0;
    /** @type {Number} */
    this.offsetEnd = 0;
    /** @type {Number} */
    this.distance = 0;
    /** @type {Number} */
    this.prevProgress = 0;
    /** @type {Array} */
    this.thresholds = ['start', 'end', 'end', 'start'];
    /** @type {[Number, Number, Number, Number]} */
    this.coords = [0, 0, 0, 0];
    /** @type {JSAnimation} */
    this.debugStyles = null;
    /** @type {HTMLElement} */
    this.$debug = null;
    /** @type {ScrollObserverParams} */
    this._params = parameters;
    /** @type {Boolean} */
    this._debug = setValue(parameters.debug, false);
    /** @type {ScrollObserver} */
    this._next = null;
    /** @type {ScrollObserver} */
    this._prev = null;
    addChild(this.container, this);
    // Wait for the next frame to add to the container in order to handle calls to link()
    sync(() => {
      if (this.reverted) return;
      if (!this.target) {
        const target = /** @type {HTMLElement} */(parseTargets(parameters.target)[0]);
        this.target = target || doc.body;
        this.refresh();
      }
    });
  }

  /**
   * @param {Tickable|WAAPIAnimation} linked
   */
  link(linked) {
    if (linked) {
      // Make sure to pause the linked object in case it's added later
      linked.pause();
      this.linked = linked;
      // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
      if (!isUnd(linked) && !isUnd(/** @type {WAAPIAnimation} */(linked).persist)) {
        /** @type {WAAPIAnimation} */(linked).persist = true;
      }
      // Try to use a target of the linked object if no target parameters specified
      if (!this._params.target) {
        /** @type {HTMLElement} */
        let $linkedTarget;
        if (!isUnd(/** @type {JSAnimation} */(linked).targets)) {
          $linkedTarget = getAnimationDomTarget(/** @type {JSAnimation} */(linked));
        } else {
          forEachChildren(/** @type {Timeline} */(linked), (/** @type {JSAnimation} */child) => {
            if (child.targets && !$linkedTarget) {
              $linkedTarget = getAnimationDomTarget(/** @type {JSAnimation} */(child));
            }
          });
        }
        // Fallback to body if no target found
        this.target = $linkedTarget || doc.body;
        this.refresh();
      }
    }
    return this;
  }

  get velocity() {
    return this.container.velocity;
  }

  get backward() {
    return this.horizontal ? this.container.backwardX : this.container.backwardY;
  }

  get scroll() {
    return this.horizontal ? this.container.scrollX : this.container.scrollY;
  }

  get progress() {
    const p = (this.scroll - this.offsetStart) / this.distance;
    return p === Infinity || isNaN(p) ? 0 : round$1(clamp$1(p, 0, 1), 6);
  }

  refresh() {
    // This flag is used to prevent running handleScroll() outside of this.refresh() with values not yet calculated
    this.ready = true;
    this.reverted = false;
    const params = this._params;
    this.repeat = setValue(parseScrollObserverFunctionParameter(params.repeat, this), true);
    this.horizontal = setValue(parseScrollObserverFunctionParameter(params.axis, this), 'y') === 'x';
    this.enter = setValue(parseScrollObserverFunctionParameter(params.enter, this), 'end start');
    this.leave = setValue(parseScrollObserverFunctionParameter(params.leave, this), 'start end');
    this.updateBounds();
    this.handleScroll();
    return this;
  }

  removeDebug() {
    if (this.$debug) {
      this.$debug.parentNode.removeChild(this.$debug);
      this.$debug = null;
    }
    if (this.debugStyles) {
      this.debugStyles.revert();
      this.debugStyles = null;
    }
    return this;
  }

  /**
   * Rebuilds the debug overlay. Pass the previous observer to reuse its overlay element.
   * @param {ScrollObserver} [previous]
   * @return {this}
   */
  refreshDebug(previous) {
    if (previous && !this._debug) return this;
    if (previous && !this.$debug && previous.$debug
      && previous.container.element === this.container.element) {
      this.$debug = previous.$debug;
      this.debugStyles = previous.debugStyles;
      previous.$debug = null;
      previous.debugStyles = null;
    }
    if (!this.ready) return this;
    const container = this.container;
    const isHori = this.horizontal;
    let $debug = this.$debug;
    /** @type {HTMLElement} */
    let $containerMarkers;
    /** @type {HTMLElement} */
    let $targetMarkers;
    if (!$debug) {
      $debug = doc.createElement('div');
      $containerMarkers = doc.createElement('div');
      $targetMarkers = doc.createElement('div');
      $debug.classList.add('animejs-onscroll-debug');
      for (let i = 0; i < 4; i++) {
        const $marker = doc.createElement('div');
        const $line = doc.createElement('div');
        const $text = doc.createElement('div');
        $marker.appendChild($line);
        $marker.appendChild($text);
        (i > 1 ? $containerMarkers : $targetMarkers).appendChild($marker);
      }
      $debug.appendChild($containerMarkers);
      $debug.appendChild($targetMarkers);
      this.$debug = $debug;
    } else {
      $containerMarkers = /** @type {HTMLElement} */($debug.children[0]);
      $targetMarkers = /** @type {HTMLElement} */($debug.children[1]);
    }
    const inset = 10;
    const containerSize = isHori ? container.width : container.height;
    const scrollSize = isHori ? container.scrollWidth : container.scrollHeight;
    const crossSize = Math.max(0, (isHori ? container.height : container.width) - inset * 2);
    const zIndex = $debug.style.zIndex || container.zIndex++;
    /**
     * @param {String} p
     * @param {Number} l
     * @param {Number} t
     * @param {Number} w
     * @param {Number} h
     * @return {String}
     */
    const baseCSS = (p, l, t, w, h) => `position:${p};left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    $debug.style.cssText = `${baseCSS('absolute', isHori ? 0 : inset, isHori ? inset : 0, isHori ? scrollSize : crossSize, isHori ? crossSize : scrollSize)}
      pointer-events: none;
      z-index: ${zIndex};
    `;
    $containerMarkers.style.cssText = `${baseCSS('sticky', 0, 0, isHori ? containerSize : crossSize, isHori ? crossSize : containerSize)}`;
    $targetMarkers.style.cssText = `${baseCSS('absolute', 0, 0, isHori ? scrollSize : crossSize, isHori ? crossSize : scrollSize)}`;
    this.coords.forEach((v, i) => {
      const isContainer = i > 1;
      const isLeave = i % 2 === 1;
      const value = (isContainer ? 0 : this.offset) + v;
      const axisSize = isContainer ? containerSize : scrollSize;
      const alignBefore = value > axisSize / 2;
      const lineOffset = value === 0 ? 1 : alignBefore ? -1 : 0;
      const color = debugColors$1[+isLeave];
      const crossCSS = isHori
        ? isContainer ? 'top:0;' : 'bottom:0;'
        : isContainer ? 'left:0;' : 'right:0;';
      const axisCSS = isHori
        ? alignBefore ? `right:${-lineOffset}px;` : `left:${lineOffset}px;`
        : alignBefore ? `bottom:${-lineOffset}px;` : `top:${lineOffset}px;`;
      const $layer = isContainer ? $containerMarkers : $targetMarkers;
      const $marker = /** @type {HTMLElement} */($layer.children[+isLeave]);
      const $line = /** @type {HTMLElement} */($marker.children[0]);
      const $text = /** @type {HTMLElement} */($marker.children[1]);
      $marker.style.cssText = isHori
        ? baseCSS('absolute', value, 0, 0, crossSize)
        : baseCSS('absolute', 0, value, crossSize, 0);
      $line.style.cssText = isHori
        ? `position:absolute;left:${lineOffset}px;top:0;width:1px;height:100%;background-image:repeating-linear-gradient(${color} 0 2px,transparent 2px 4px);background-position-y:${isContainer ? 0 : 2}px;`
        : `position:absolute;left:0;top:${lineOffset}px;width:100%;height:1px;background-image:repeating-linear-gradient(90deg,${color} 0 2px,transparent 2px 4px);background-position-x:${isContainer ? 0 : 2}px;`;
      $text.textContent = `${isContainer ? 'container' : 'target'}: ${this.thresholds[i]}`;
      $text.style.cssText = `
        position: absolute;
        ${crossCSS}
        ${axisCSS}
        max-width: 140px;
        overflow: hidden;
        padding: 2px 3px;
        border-radius: 2px;
        background-color: ${color};
        color: #000;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: -.025em;
        line-height: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    });

    if (!$debug.isConnected) container.element.appendChild($debug);
    if (!this.debugStyles && get(container.element, 'position') === 'static') {
      this.debugStyles = set(container.element, { position: 'relative '});
    }
    return this;
  }

  /** @return {this} */
  debug() {
    return this.refreshDebug();
  }

  updateBounds() {
    if (this._debug && this.$debug) this.$debug.style.display = 'none';
    let stickys;
    const $target = this.target;
    const container = this.container;
    const isHori = this.horizontal;
    const linked = this.linked;
    let linkedTime;
    let $el = $target;
    // let offsetX = 0;
    // let offsetY = 0;
    // let $offsetParent = $el;
    if (linked) {
      linkedTime = linked.currentTime;
      linked.seek(0, true);
    }
    // Old implementation to get offset and targetSize before fixing https://github.com/juliangarnier/anime/issues/1021
    // const isContainerStatic = get(container.element, 'position') === 'static' ? set(container.element, { position: 'relative '}) : false;
    // while ($el && $el !== container.element && $el !== doc.body) {
    //   const isSticky = get($el, 'position') === 'sticky' ?
    //                    set($el, { position: 'static' }) :
    //                    false;
    //   if ($el === $offsetParent) {
    //     offsetX += $el.offsetLeft || 0;
    //     offsetY += $el.offsetTop || 0;
    //     $offsetParent = $el.offsetParent;
    //   }
    //   $el = /** @type {HTMLElement} */($el.parentElement);
    //   if (isSticky) {
    //     if (!stickys) stickys = [];
    //     stickys.push(isSticky);
    //   }
    // }
    // if (isContainerStatic) isContainerStatic.revert();
    // const offset = isHori ? offsetX : offsetY;
    // const targetSize = isHori ? $target.offsetWidth : $target.offsetHeight;

    while ($el && $el !== container.element && $el !== doc.body) {
      const isSticky = get($el, 'position') === 'sticky' ? set($el, { position: 'static' }) : false;
      $el = $el.parentElement;
      if (isSticky) {
        if (!stickys) stickys = [];
        stickys.push(isSticky);
      }
    }
    const rect = $target.getBoundingClientRect();
    const scale = container.scale;
    const offset = (isHori ? rect.left + container.scrollX - container.left : rect.top + container.scrollY - container.top) * scale;
    const targetSize = (isHori ? rect.width : rect.height) * scale;
    const containerSize = isHori ? container.width : container.height;
    const scrollSize = isHori ? container.scrollWidth : container.scrollHeight;
    const maxScroll = scrollSize - containerSize;
    const enter = this.enter;
    const leave = this.leave;

    /** @type {ScrollThresholdValue} */
    let enterTarget = 'start';
    /** @type {ScrollThresholdValue} */
    let leaveTarget = 'end';
    /** @type {ScrollThresholdValue} */
    let enterContainer = 'end';
    /** @type {ScrollThresholdValue} */
    let leaveContainer = 'start';

    if (isStr(enter)) {
      const splitted = /** @type {String} */(enter).split(' ');
      enterContainer = splitted[0];
      enterTarget = splitted.length > 1 ? splitted[1] : enterTarget;
    } else if (isObj(enter)) {
      const e = /** @type {ScrollThresholdParam} */(enter);
      if (!isUnd(e.container)) enterContainer = e.container;
      if (!isUnd(e.target)) enterTarget = e.target;
    } else if (isNum(enter)) {
      enterContainer = /** @type {Number} */(enter);
    }

    if (isStr(leave)) {
      const splitted = /** @type {String} */(leave).split(' ');
      leaveContainer = splitted[0];
      leaveTarget = splitted.length > 1 ? splitted[1] : leaveTarget;
    } else if (isObj(leave)) {
      const t = /** @type {ScrollThresholdParam} */(leave);
      if (!isUnd(t.container)) leaveContainer = t.container;
      if (!isUnd(t.target)) leaveTarget = t.target;
    } else if (isNum(leave)) {
      leaveContainer = /** @type {Number} */(leave);
    }

    const parsedEnterTarget = parseBoundValue($target, enterTarget, targetSize);
    const parsedLeaveTarget = parseBoundValue($target, leaveTarget, targetSize);
    const under = (parsedEnterTarget + offset) - containerSize;
    const over = (parsedLeaveTarget + offset) - maxScroll;
    const parsedEnterContainer = parseBoundValue($target, enterContainer, containerSize, under, over);
    const parsedLeaveContainer = parseBoundValue($target, leaveContainer, containerSize, under, over);
    const offsetStart = parsedEnterTarget + offset - parsedEnterContainer;
    const offsetEnd = parsedLeaveTarget + offset - parsedLeaveContainer;
    const scrollDelta = offsetEnd - offsetStart;
    this.offset = offset;
    this.offsetStart = offsetStart;
    this.offsetEnd = offsetEnd;
    this.distance = scrollDelta <= 0 ? 0 : scrollDelta;
    this.thresholds = [enterTarget, leaveTarget, enterContainer, leaveContainer];
    this.coords = [parsedEnterTarget, parsedLeaveTarget, parsedEnterContainer, parsedLeaveContainer];
    if (stickys) {
      stickys.forEach(sticky => sticky.revert());
    }
    if (linked) {
      linked.seek(linkedTime, true);
    }
    if (this._debug) {
      this.debug();
    }
  }

  handleScroll() {
    if (!this.ready) return;
    const linked = this.linked;
    const sync = this.sync;
    const syncEase = this.syncEase;
    const syncSmooth = this.syncSmooth;
    const shouldSeek = linked && (syncEase || syncSmooth);
    const isHori = this.horizontal;
    const container = this.container;
    const scroll = this.scroll;
    const isBefore = scroll <= this.offsetStart;
    const isAfter = scroll >= this.offsetEnd;
    const isInView = !isBefore && !isAfter;
    const isOnTheEdge = scroll === this.offsetStart || scroll === this.offsetEnd;
    const forceEnter = !this.hasEntered && isOnTheEdge;
    const $debug = this._debug && this.$debug;
    let hasUpdated = false;
    let syncCompleted = false;
    let p = this.progress;

    if (isBefore && this.began) {
      this.began = false;
    }

    if (p > 0 && !this.began) {
      this.began = true;
    }

    if (shouldSeek) {
      const lp = linked.progress;
      if (syncSmooth && isNum(syncSmooth)) {
        if (/** @type {Number} */(syncSmooth) < 1) {
          const step = 0.0001;
          const snap = lp < p && p === 1 ? step : lp > p && !p ? -step : 0;
          const deltaTime = container.scrollTicker.deltaTime / globals.timeScale;
          p = round$1(damp$1(lp, p, deltaTime, lerp$1(.006, .134, /** @type {Number} */(syncSmooth))) + snap, 6);
        }
      } else if (syncEase) {
        p = syncEase(p);
      }
      hasUpdated = p !== this.prevProgress;
      syncCompleted = lp === 1;
      if (hasUpdated && !syncCompleted && (syncSmooth && lp)) {
        container.wakeTicker.restart();
      }
    }

    if ($debug) {
      const sticky = isHori ? container.scrollY : container.scrollX;
      $debug.style[isHori ? 'top' : 'left'] = sticky + 10 + 'px';
    }

    // Trigger enter callbacks if already in view or when entering the view
    if ((isInView && !this.isInView) || (forceEnter && !this.forceEnter && !this.hasEntered)) {
      if (isInView) this.isInView = true;
      if (!this.forceEnter || !this.hasEntered) {
        if ($debug && isInView) $debug.style.zIndex = `${this.container.zIndex++}`;
        this.onSyncEnter(this);
        this.onEnter(this);
        if (this.backward) {
          this.onSyncEnterBackward(this);
          this.onEnterBackward(this);
        } else {
          this.onSyncEnterForward(this);
          this.onEnterForward(this);
        }
        this.hasEntered = true;
        if (forceEnter) this.forceEnter = true;
      } else if (isInView) {
        this.forceEnter = false;
      }
    }

    if (isInView || !isInView && this.isInView) {
      hasUpdated = true;
    }

    if (hasUpdated) {
      if (shouldSeek) linked.seek(linked.duration * p);
      this.onUpdate(this);
    }

    if (!isInView && this.isInView) {
      this.isInView = false;
      this.onSyncLeave(this);
      this.onLeave(this);
      if (this.backward) {
        this.onSyncLeaveBackward(this);
        this.onLeaveBackward(this);
      } else {
        this.onSyncLeaveForward(this);
        this.onLeaveForward(this);
      }
      if (sync && !syncSmooth) {
        syncCompleted = true;
      }
    }

    if (p >= 1 && this.began && !this.completed && (sync && syncCompleted || !sync)) {
      if (sync) {
        this.onSyncComplete(this);
      }
      this.completed = true;
      if ((!this.repeat && !linked) || (!this.repeat && linked && linked.completed)) {
        this.revert();
      }
    }

    if (p < 1 && this.completed) {
      this.completed = false;
    }

    this.prevProgress = p;
  }

  revert() {
    if (this.reverted) return;
    const container = this.container;
    removeChild(container, this);
    if (!container._head) {
      container.revert();
    }
    if (this._debug) {
      this.removeDebug();
    }
    this.reverted = true;
    this.ready = false;
    return this;
  }

}

/**
 * @param {ScrollObserverParams} [parameters={}]
 * @return {ScrollObserver}
 */
const onScrollFactory = (parameters = {}) => new ScrollObserver(parameters);

/**
 * Creates a scroll observer, linking a scroll position to an animation's playback.
 * @type {typeof onScrollFactory}
 */
const onScroll = /** @type {typeof onScrollFactory} */(makeTweakable('OnScroll', 'onScroll', onScrollFactory));



/**
 * Cubic Bezier solver adapted from https://github.com/gre/bezier-easing
 * (c) 2014 Gaëtan Renaudeau
 */

/**
 * @param  {Number} aT
 * @param  {Number} aA1
 * @param  {Number} aA2
 * @return {Number}
 */
const calcBezier = (aT, aA1, aA2) => (((1 - 3 * aA2 + 3 * aA1) * aT + (3 * aA2 - 6 * aA1)) * aT + (3 * aA1)) * aT;

/**
 * @param  {Number} aX
 * @param  {Number} mX1
 * @param  {Number} mX2
 * @return {Number}
 */
const binarySubdivide = (aX, mX1, mX2) => {
  let aA = 0, aB = 1, currentX, currentT, i = 0;
  do {
    currentT = aA + (aB - aA) / 2;
    currentX = calcBezier(currentT, mX1, mX2) - aX;
    if (currentX > 0) {
      aB = currentT;
    } else {
      aA = currentT;
    }
  } while (abs(currentX) > .0000001 && ++i < 100);
  return currentT;
};

/**
 * @param  {Number} [mX1] The x coordinate of the first point
 * @param  {Number} [mY1] The y coordinate of the first point
 * @param  {Number} [mX2] The x coordinate of the second point
 * @param  {Number} [mY2] The y coordinate of the second point
 * @return {EasingFunction}
 */

const cubicBezierFactory = (mX1, mY1, mX2, mY2) =>
  t => t === 0 || t === 1 ? t :
  calcBezier(binarySubdivide(t, mX1, mX2), mY1, mY2);

const tweakableCubicBezier = makeTweakable('Ease', 'cubicBezier', cubicBezierFactory);

const cubicBezier = (mX1 = 0.5, mY1 = 0.0, mX2 = 0.5, mY2 = 1.0) =>
  (mX1 === mY1 && mX2 === mY2) ? none :
  /** @type {EasingFunction} */(tweakableCubicBezier(mX1, mY1, mX2, mY2));



/**
 * Steps ease implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function
 * Only covers 'end' and 'start' jumpterms
 * @param  {Number} steps
 * @param  {Boolean} [fromStart]
 * @return {EasingFunction}
 */
const stepsFactory = (steps = 10, fromStart) => {
  const roundMethod = fromStart ? ceil : floor;
  return t => roundMethod(clamp$1(t, 0, 1) * steps) * (1 / steps);
};

/** Creates an easing that moves in equal steps. */
const steps = /** @type {typeof stepsFactory} */(makeTweakable('Ease', 'steps', stepsFactory));



/**
 * Builds the piecewise linear ease, returns none without points. irregular reuses it for its curve.
 * @param  {...(String|Number)} args - Points
 * @return {EasingFunction}
 */
const linearFactory = (...args) => {
  const argsLength = args.length;
  if (!argsLength) return none;
  const totalPoints = argsLength - 1;
  const firstArg = args[0];
  const lastArg = args[totalPoints];
  const xPoints = [0];
  const yPoints = [parseNumber(firstArg)];
  for (let i = 1; i < totalPoints; i++) {
    const arg = args[i];
    const splitValue = isStr(arg) ?
    /** @type {String} */(arg).trim().split(' ') :
    [arg];
    const value = splitValue[0];
    const percent = splitValue[1];
    xPoints.push(!isUnd(percent) ? parseNumber(percent) / 100 : i / totalPoints);
    yPoints.push(parseNumber(value));
  }
  yPoints.push(parseNumber(lastArg));
  xPoints.push(1);
  return function easeLinear(t) {
    for (let i = 1, l = xPoints.length; i < l; i++) {
      const currentX = xPoints[i];
      if (t <= currentX) {
        const prevX = xPoints[i - 1];
        const prevY = yPoints[i - 1];
        return prevY + (yPoints[i] - prevY) * (t - prevX) / (currentX - prevX);
      }
    }
    return yPoints[yPoints.length - 1];
  }
};



const tweakableLinear = makeTweakable('Ease', 'linear', linearFactory);

/**
 * Without parameters, the linear function creates a non-eased transition.
 * Parameters, if used, creates a piecewise linear easing by interpolating linearly between the specified points.
 *
 * @param  {...(String|Number)} args - Points
 * @return {EasingFunction}
 */
const linear = (...args) => args.length ? /** @type {EasingFunction} */(tweakableLinear.apply(null, args)) : none;



/**
 * Generate random steps
 * @param  {Number} [length] - The number of steps
 * @param  {Number} [randomness] - How strong the randomness is
 * @return {EasingFunction}
 */
const irregularFactory = (length = 10, randomness = 1) => {
  const values = [0];
  const total = length - 1;
  for (let i = 1; i < total; i++) {
    const previousValue = values[i - 1];
    const spacing = i / total;
    const segmentEnd = (i + 1) / total;
    const randomVariation = spacing + (segmentEnd - spacing) * Math.random();
    // Mix the even spacing and random variation based on the randomness parameter
    const randomValue = spacing * (1 - randomness) + randomVariation * randomness;
    values.push(clamp$1(randomValue, previousValue, 1));
  }
  values.push(1);
  return linearFactory(...values);
};

/** Creates an easing that moves in random steps. */
const irregular = /** @type {typeof irregularFactory} */(makeTweakable('Ease', 'irregular', irregularFactory));

var index$3 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  Spring: Spring,
  createSpring: createSpring,
  cubicBezier: cubicBezier,
  eases: eases,
  irregular: irregular,
  linear: linear,
  spring: spring,
  steps: steps
});







/**
 * Converts an easing function into a valid CSS linear() timing function string
 * @param {EasingFunction} fn
 * @param {number} [samples=100]
 * @returns {string} CSS linear() timing function
 */
const easingToLinear = (fn, samples = 100) => {
  const points = [];
  for (let i = 0; i <= samples; i++) points.push(round$1(fn(i / samples), 4));
  return `linear(${points.join(', ')})`;
};

const WAAPIEasesLookups = {};

/**
 * @param  {EasingParam} ease
 * @return {String}
 */
const parseWAAPIEasing = (ease) => {
  let parsedEase = WAAPIEasesLookups[ease];
  if (parsedEase) return parsedEase;
  parsedEase = 'linear';
  if (isStr(ease)) {
    if (
      stringStartsWith(ease, 'linear') ||
      stringStartsWith(ease, 'cubic-') ||
      stringStartsWith(ease, 'steps') ||
      stringStartsWith(ease, 'ease')
    ) {
      parsedEase = ease;
    } else if (stringStartsWith(ease, 'cubicB')) {
      parsedEase = toLowerCase(ease);
    } else {
      const parsed = parseEaseString(ease);
      if (isFnc(parsed)) parsedEase = parsed === none ? 'linear' : easingToLinear(parsed);
    }
    // Only cache string based easing name, otherwise function arguments get lost
    WAAPIEasesLookups[ease] = parsedEase;
  } else if (isFnc(ease)) {
    const easing = easingToLinear(ease);
    if (easing) parsedEase = easing;
  } else if (/** @type {Spring} */(ease).ease) {
    parsedEase = easingToLinear(/** @type {Spring} */(ease).ease);
  }
  return parsedEase;
};

const transformsShorthands = ['x', 'y', 'z'];
const commonDefaultPXProperties = [
  'perspective',
  'width',
  'height',
  'margin',
  'padding',
  'top',
  'right',
  'bottom',
  'left',
  'borderWidth',
  'fontSize',
  'borderRadius',
  ...transformsShorthands
];

const validIndividualTransforms = /*#__PURE__*/ (() => [...transformsShorthands, ...validTransforms.filter(t => ['X', 'Y', 'Z'].some(axis => t.endsWith(axis)))])();

let transformsPropertiesRegistered = null;

/**
 * @param  {String} propName
 * @param  {WAAPIKeyframeValue} value
 * @param  {DOMTarget} $el
 * @param  {Number} i
 * @param  {DOMTargetsArray} parsedTargets
 * @return {String}
 */
const normalizeTweenValue = (propName, value, $el, i, parsedTargets) => {
  // Do not try to compute strings with getFunctionValue otherwise it will convert CSS variables
  let v = isStr(value) ? value : getFunctionValue(/** @type {any} */(value), $el, i, parsedTargets, null);
  if (!isNum(v)) return v;
  if (commonDefaultPXProperties.includes(propName) || stringStartsWith(propName, 'translate')) return `${v}px`;
  if (stringStartsWith(propName, 'rotate') || stringStartsWith(propName, 'skew')) return `${v}deg`;
  return `${v}`;
};

/**
 * @param  {DOMTarget} $el
 * @param  {String} propName
 * @param  {WAAPIKeyframeValue} from
 * @param  {WAAPIKeyframeValue} to
 * @param  {Number} i
 * @param  {DOMTargetsArray} parsedTargets
 * @return {WAAPITweenValue}
 */
const parseIndividualTweenValue = ($el, propName, from, to, i, parsedTargets) => {
  /** @type {WAAPITweenValue} */
  let tweenValue = '0';
  const computedTo = !isUnd(to) ? normalizeTweenValue(propName, to, $el, i, parsedTargets) : getComputedStyle($el)[propName];
  if (!isUnd(from)) {
    const computedFrom = normalizeTweenValue(propName, from, $el, i, parsedTargets);
    tweenValue = [computedFrom, computedTo];
  } else {
    tweenValue = isArr(to) ? to.map((/** @type {any} */v) => normalizeTweenValue(propName, v, $el, i, parsedTargets)) : computedTo;
  }
  return tweenValue;
};

class WAAPIAnimation {
/**
 * @param {DOMTargetsParam} targets
 * @param {WAAPIAnimationParams} params
 */
  constructor(targets, params) {

    if (scope.current) scope.current.register(this);

    // Skip the registration and fallback to no animation in case CSS.registerProperty is not supported
    if (isNil(transformsPropertiesRegistered)) {
      if (isBrowser && (isUnd(CSS) || !Object.hasOwnProperty.call(CSS, 'registerProperty'))) {
        transformsPropertiesRegistered = false;
      } else {
        validTransforms.forEach(t => {
          const isSkew = stringStartsWith(t, 'skew');
          const isScale = stringStartsWith(t, 'scale');
          const isRotate = stringStartsWith(t, 'rotate');
          const isTranslate = stringStartsWith(t, 'translate');
          const isAngle = isRotate || isSkew;
          const syntax = isAngle ? '<angle>' : isScale ? "<number>" : isTranslate ? "<length-percentage>" : "*";
          try {
            CSS.registerProperty({
              name: '--' + t,
              syntax,
              inherits: false,
              initialValue: isTranslate ? '0px' : isAngle ? '0deg' : isScale ? '1' : '0',
            });
          } catch {}        });
        transformsPropertiesRegistered = true;
      }
    }

    const parsedTargets = registerTargets(targets);

    if (!parsedTargets.length) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }

    const autoplay = setValue(params.autoplay, globals.defaults.autoplay);
    const scroll = autoplay && /** @type {ScrollObserver} */(autoplay).link ? autoplay : false;
    const alternate = params.alternate && /** @type {Boolean} */(params.alternate) === true;
    const reversed = params.reversed && /** @type {Boolean} */(params.reversed) === true;
    const loop = setValue(params.loop, globals.defaults.loop);
    const iterations = /** @type {Number} */((loop === true || loop === Infinity) ? Infinity : isNum(loop) ? loop + 1 : 1);
    /** @type {PlaybackDirection} */
    const direction = alternate ? reversed ? 'alternate-reverse' : 'alternate' : reversed ? 'reverse' : 'normal';
    /** @type {FillMode} */
    const fill = 'both'; // We use 'both' here because the animation can be reversed during playback
    const timeScale = (globals.timeScale === 1 ? 1 : K);

    /** @type {DOMTargetsArray}] */
    this.targets = parsedTargets;
    /** @type {Array<globalThis.Animation>}] */
    this.animations = [];
    /** @type {globalThis.Animation}] */
    this.controlAnimation = null;
    /** @type {Callback<this>} */
    this.onComplete = params.onComplete || /** @type {Callback<WAAPIAnimation>} */(/** @type {unknown} */(globals.defaults.onComplete));
    /** @type {Number} */
    this.duration = 0;
    /** @type {Boolean} */
    this.muteCallbacks = false;
    /** @type {Boolean} */
    this.completed = false;
    /** @type {Boolean} */
    this.paused = !autoplay || scroll !== false;
    /** @type {Boolean} */
    this.reversed = reversed;
    /** @type {Boolean} */
    this.persist = setValue(params.persist, globals.defaults.persist);
    /** @type {Boolean|ScrollObserver} */
    this.autoplay = autoplay;
    /** @type {Number} */
    this._speed = setValue(params.playbackRate, globals.defaults.playbackRate);
    /** @type {Function} */
    this._resolve = noop; // Used by .then()
    /** @type {Number} */
    this._completed = 0;
    /** @type {Array.<Object>} */
    this._inlineStyles = [];

    parsedTargets.forEach(($el, i) => {

      const cachedTransforms = $el[transformsSymbol];
      const hasIndividualTransforms = validIndividualTransforms.some(t => params.hasOwnProperty(t));
      const elStyle = $el.style;
      const inlineStyles = this._inlineStyles[i] = {};

      const easeToParse = setValue(params.ease, globals.defaults.ease);

      const easeFunctionResult = getFunctionValue(easeToParse, $el, i, parsedTargets, null);
      const keyEasing = isFnc(easeFunctionResult) || isStr(easeFunctionResult) ? easeFunctionResult : easeToParse;

      const spring = /** @type {Spring} */(easeToParse).ease && easeToParse;
      /** @type {String} */
      const easing = parseWAAPIEasing(keyEasing);

      /** @type {Number} */
      const duration = (spring ? /** @type {Spring} */(spring).settlingDuration : getFunctionValue(setValue(params.duration, globals.defaults.duration), $el, i, parsedTargets, null)) * timeScale;
      /** @type {Number} */
      const delay = getFunctionValue(setValue(params.delay, globals.defaults.delay), $el, i, parsedTargets, null) * timeScale;
      /** @type {CompositeOperation} */
      const composite = /** @type {CompositeOperation} */(setValue(params.composition, 'replace'));

      for (let name in params) {
        if (!isKey(name)) continue;
        /** @type {PropertyIndexedKeyframes} */
        const keyframes = {};
        /** @type {KeyframeAnimationOptions} */
        const tweenParams = { iterations, direction, fill, easing, duration, delay, composite };
        const propertyValue = params[name];
        const individualTransformProperty = hasIndividualTransforms ? validTransforms.includes(name) ? name : shortTransforms.get(name) : false;

        const styleName = individualTransformProperty ? 'transform' : name;
        if (!inlineStyles[styleName]) {
          inlineStyles[styleName] = elStyle[styleName];
        }

        let parsedPropertyValue;
        if (isObj(propertyValue)) {
          const tweenOptions = /** @type {WAAPITweenOptions} */(propertyValue);
          const tweenOptionsEase = setValue(tweenOptions.ease, easing);
          const tweenOptionsSpring = /** @type {Spring} */(tweenOptionsEase).ease && tweenOptionsEase;
          const to = /** @type {WAAPITweenOptions} */(tweenOptions).to;
          const from = /** @type {WAAPITweenOptions} */(tweenOptions).from;
          /** @type {Number} */
          tweenParams.duration = (tweenOptionsSpring ? /** @type {Spring} */(tweenOptionsSpring).settlingDuration : getFunctionValue(setValue(tweenOptions.duration, duration), $el, i, parsedTargets, null)) * timeScale;
          /** @type {Number} */
          tweenParams.delay = getFunctionValue(setValue(tweenOptions.delay, delay), $el, i, parsedTargets, null) * timeScale;
          /** @type {CompositeOperation} */
          tweenParams.composite = /** @type {CompositeOperation} */(setValue(tweenOptions.composition, composite));
          /** @type {String} */
          tweenParams.easing = parseWAAPIEasing(tweenOptionsEase);
          parsedPropertyValue = parseIndividualTweenValue($el, name, from, to, i, parsedTargets);
          if (individualTransformProperty) {
            keyframes[`--${individualTransformProperty}`] = parsedPropertyValue;
            cachedTransforms[individualTransformProperty] = parsedPropertyValue;
          } else {
            keyframes[name] = parseIndividualTweenValue($el, name, from, to, i, parsedTargets);
          }
          addWAAPIAnimation(this, $el, name, keyframes, tweenParams);
          if (!isUnd(from)) {
            if (!individualTransformProperty) {
              elStyle[name] = keyframes[name][0];
            } else {
              const key = `--${individualTransformProperty}`;
              elStyle.setProperty(key, keyframes[key][0]);
            }
          }
        } else {
          parsedPropertyValue = isArr(propertyValue) ?
                                propertyValue.map((/** @type {any} */v) => normalizeTweenValue(name, v, $el, i, parsedTargets)) :
                                normalizeTweenValue(name, /** @type {any} */(propertyValue), $el, i, parsedTargets);
          if (individualTransformProperty) {
            keyframes[`--${individualTransformProperty}`] = parsedPropertyValue;
            cachedTransforms[individualTransformProperty] = parsedPropertyValue;
          } else {
            keyframes[name] = parsedPropertyValue;
          }
          addWAAPIAnimation(this, $el, name, keyframes, tweenParams);
        }
      }
      if (hasIndividualTransforms) {
        let transforms = emptyString;
        for (let t in cachedTransforms) {
          transforms += `${transformsFragmentStrings[t]}var(--${t})) `;
        }
        elStyle.transform = transforms;
      }
    });

    if (scroll) {
      /** @type {ScrollObserver} */(this.autoplay).link(this);
    }
  }

  /**
   * @callback forEachCallback
   * @param {globalThis.Animation} animation
   */

  /**
   * @param  {forEachCallback|String} callback
   * @return {this}
   */
  forEach(callback) {
    try {
      const cb = isStr(callback) ? (/** @type {globalThis.Animation} */a) => a[callback]() : callback;
      this.animations.forEach(cb);
    } catch {}    return this;
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = +speed;
    this.forEach(anim => anim.playbackRate = speed);
  }

  get currentTime() {
    const controlAnimation = this.controlAnimation;
    const timeScale = globals.timeScale;
    if (this.completed) return controlAnimation && controlAnimation.playbackRate < 0 ? 0 : this.duration;
    return controlAnimation ? +controlAnimation.currentTime * (timeScale === 1 ? 1 : timeScale) : 0;
  }

  set currentTime(time) {
    const t = time * (globals.timeScale === 1 ? 1 : K);
    const mutedBoundary = !this.persist && this.muteCallbacks && (t <= 0 || t >= this.duration);
    this.forEach(anim => {
      // Pause before the seek so no finish event fires and a pending reverse applies on assignment.
      if (mutedBoundary) {
        anim.pause();
      } else if (!this.persist && (t >= this.duration || anim.playbackRate < 0 && t <= 0)) {
        // Paused native animations do not emit finish events, even at the end.
        anim.play();
      }
      anim.currentTime = t;
      if (mutedBoundary) {
        if (anim.playbackRate < 0 ? t <= 0 : t >= this.duration) {
          this.completed = this.paused = true;
        } else if (!this.paused) {
          anim.play();
          // Restore the requested time, play can rewind a negative time.
          anim.currentTime = t;
        }
      }
    });
  }

  get progress() {
    return this.currentTime / this.duration;
  }

  set progress(progress) {
    this.forEach(anim => anim.currentTime = progress * this.duration || 0);
  }

  resume() {
    if (!this.paused) return this;
    this.paused = false;
    this.completed = false;
    // TODO: Store the current time, and seek back to the last position
    return this.forEach('play');
  }

  pause() {
    if (this.paused) return this;
    this.paused = true;
    return this.forEach('pause');
  }

  alternate() {
    this.reversed = !this.reversed;
    this.forEach('reverse');
    if (this.paused) this.forEach('pause');
    return this;
  }

  play() {
    if (this.reversed) this.alternate();
    return this.resume();
  }

  reverse() {
    if (!this.reversed) this.alternate();
    return this.resume();
  }

 /**
  * @param {Number} time
  * @param {Boolean} muteCallbacks
  */
  seek(time, muteCallbacks = false) {
    this.muteCallbacks = muteCallbacks;
    if (time < this.duration) this.completed = false;
    this.currentTime = time;
    this.muteCallbacks = false;
    if (this.paused) this.pause();
    return this;
  }

  restart() {
    this.completed = false;
    return this.seek(0, true).resume();
  }

  commitStyles() {
    return this.forEach('commitStyles');
  }

  complete() {
    return this.seek(this.duration);
  }

  cancel() {
    this.muteCallbacks = true; // This prevents triggering the onComplete callback and resolving the Promise
    this.commitStyles().forEach('cancel');
    this.animations.length = 0; // Needed to release all animations from memory
    requestAnimationFrame(() => {
      this.targets.forEach(($el) => { // Needed to avoid unecessary inline transorms
        if ($el.style.transform === 'none') $el.style.removeProperty('transform');
      });
    });
    return this;
  }

  revert() {
    // NOTE: We need a better way to revert the transforms, since right now the entire transform property value is reverted,
    // This means if you have multiple animations animating different transforms on the same target,
    // reverting one of them will also override the transform property of the other animations.
    // A better approach would be to store the original custom property values if they exist instead of the entire transform value,
    // and update the CSS variables with the orignal value
    this.cancel().targets.forEach(($el, i) => {
      const targetStyle = $el.style;
      const targetInlineStyles = this._inlineStyles[i];
      for (let name in targetInlineStyles) {
        const originalInlinedValue = targetInlineStyles[name];
        if (isUnd(originalInlinedValue) || originalInlinedValue === emptyString) {
          targetStyle.removeProperty(toLowerCase(name));
        } else {
          $el.style[name] = originalInlinedValue;
        }
      }
      // Remove style attribute if empty
      if ($el.getAttribute('style') === emptyString) $el.removeAttribute('style');
    });
    return this;
  }

  // Define then as a getter so getCompletionThen can hide it during resolution without a field on each WAAPIAnimation.
  /** @return {<T = Omit<this, 'then'>>(callback?: (this: void, self: Omit<this, 'then'>) => T) => Promise<Awaited<T>>} */
  get then() {
    return /** @type {any} */(getCompletionThen(this));
  }
}

const waapi = {
/**
 * @param {DOMTargetsParam} targets
 * @param {WAAPIAnimationParams} params
 * @return {WAAPIAnimation}
 */
  animate: (targets, params) => new WAAPIAnimation(targets, params),
  convertEase: easingToLinear
};













/**
 * @typedef {DOMTargetSelector|Array<DOMTargetSelector>} LayoutChildrenParam
 */

/**
 * @typedef {Object} LayoutAnimationTimingsParams
 * @property {Number|FunctionValue} [delay]
 * @property {Number|FunctionValue} [duration]
 * @property {EasingParam|FunctionValue} [ease]
 */

/**
 * @typedef {Record<String, Number|String|FunctionValue>} LayoutStateAnimationProperties
 */

/**
 * @typedef {LayoutStateAnimationProperties & LayoutAnimationTimingsParams} LayoutStateParams
 */

/**
 * @typedef {Object} LayoutSpecificAnimationParams
 * @property {Number|String} [id]
 * @property {Number|FunctionValue} [delay]
 * @property {Number|FunctionValue} [duration]
 * @property {EasingParam|FunctionValue} [ease]
 * @property {EasingParam} [playbackEase]
 * @property {LayoutStateParams} [swapAt]
 * @property {LayoutStateParams} [enterFrom]
 * @property {LayoutStateParams} [leaveTo]
 * @property {Callback<Timeline, void>} [onComplete]
 * @property {Callback<Timeline, void>} [onPause]
 */

/**
 * @typedef {LayoutSpecificAnimationParams & Omit<TimerOptions, 'muted'> & Omit<TickableCallbacks<Timeline>, 'onComplete' | 'onPause'> & RenderableCallbacks<Timeline>} LayoutAnimationParams
 */

/**
 * @typedef {Object} LayoutOptions
 * @property {LayoutChildrenParam} [children]
 * @property {Array<String>} [properties]
 */

/**
 * @typedef {LayoutAnimationParams & LayoutOptions} AutoLayoutParams
 */

/**
 * @typedef {Record<String, Number|String|FunctionValue> & {
 *   transform: String,
 *   x: Number,
 *   y: Number,
 *   left: Number,
 *   top: Number,
 *   clientLeft: Number,
 *   clientTop: Number,
 *   width: Number,
 *   height: Number,
 * }} LayoutNodeProperties
 */

/**
 * @typedef {Object} LayoutNode
 * @property {String} id
 * @property {DOMTarget} $el
 * @property {Number} index
 * @property {Array<DOMTarget>} targets
 * @property {Number} delay
 * @property {Number} duration
 * @property {EasingParam} ease
 * @property {DOMTarget} $measure
 * @property {LayoutSnapshot} state
 * @property {AutoLayout} layout
 * @property {LayoutNode|null} parentNode
 * @property {Boolean} isTarget
 * @property {Boolean} isEntering
 * @property {Boolean} isLeaving
 * @property {Boolean} hasTransform
 * @property {Array<String>} inlineStyles
 * @property {String|null} inlineTransforms
 * @property {String|null} inlineTransition
 * @property {Boolean} branchAdded
 * @property {Boolean} branchRemoved
 * @property {Boolean} branchNotRendered
 * @property {Boolean} sizeChanged
 * @property {Boolean} isInlined
 * @property {Boolean} hasVisibilitySwap
 * @property {Boolean} hasDisplayNone
 * @property {Boolean} hasVisibilityHidden
 * @property {String|null} measuredInlineTransform
 * @property {String|null} measuredInlineTransition
 * @property {String|null} measuredDisplay
 * @property {String|null} measuredVisibility
 * @property {String|null} measuredPosition
 * @property {Boolean} measuredHasDisplayNone
 * @property {Boolean} measuredHasVisibilityHidden
 * @property {Boolean} measuredIsVisible
 * @property {Boolean} measuredIsRemoved
 * @property {Boolean} measuredIsInsideRoot
 * @property {LayoutNodeProperties} properties
 * @property {LayoutNode|null} _head
 * @property {LayoutNode|null} _tail
 * @property {LayoutNode|null} _prev
 * @property {LayoutNode|null} _next
 */

/**
 * @callback LayoutNodeIterator
 * @param {LayoutNode} node
 * @param {Number} index
 * @return {void}
 */

/**
 * @typedef {Object} LayoutTransitionStates
 * @property {LayoutSnapshot} oldState
 * @property {LayoutSnapshot} newState
 */

let layoutId = 0;
let nodeId = 0;

/** @type {LayoutTransitionStates|null} */
let activeLayoutTransition = null;

/**
 * Creates a transition builder that owns its captured layout states.
 * @param {AutoLayout} layout
 * @return {(params: LayoutAnimationParams) => Timeline}
 */
function createLayoutTransitionBuilder(layout) {
  const transition = {
    oldState: layout.oldState,
    newState: layout.newState,
  };
  return params => {
    const editor = globals.editor;
    const previousTransition = activeLayoutTransition;
    globals.editor = null;
    activeLayoutTransition = transition;
    try {
      return layout.animate(params);
    } finally {
      activeLayoutTransition = previousTransition;
      globals.editor = editor;
    }
  };
}

/**
 * @param {DOMTarget} root
 * @param {DOMTarget} $el
 * @return {Boolean}
 */
const isElementInRoot = (root, $el) => {
  if (!root || !$el) return false;
  return root === $el || root.contains($el);
};

/**
 * @param {DOMTarget|null} $el
 * @return {String|null}
 */
const muteElementTransition = $el => {
  if (!$el) return null;
  const style = $el.style;
  const transition = style.transition || '';
  style.setProperty('transition', 'none', 'important');
  return transition;
};

/**
 * @param {DOMTarget|null} $el
 * @param {String|null} transition
 */
const restoreElementTransition = ($el, transition) => {
  if (!$el) return;
  const style = $el.style;
  if (transition) {
    style.transition = transition;
  } else {
    style.removeProperty('transition');
  }
};

/**
 * @param {LayoutNode} node
 */
const muteNodeTransition = node => {
  const store = node.layout.transitionMuteStore;
  const $el = node.$el;
  const $measure = node.$measure;
  if ($el && !store.has($el)) store.set($el, muteElementTransition($el));
  if ($measure && !store.has($measure)) store.set($measure, muteElementTransition($measure));
};

/**
 * @param {Map<DOMTarget, String|null>} store
 */
const restoreLayoutTransition = store => {
  store.forEach((value, $el) => restoreElementTransition($el, value));
  store.clear();
};

const hiddenComputedStyle = /** @type {CSSStyleDeclaration} */({
  display: 'none',
  visibility: 'hidden',
  opacity: '0',
  transform: 'none',
  position: 'static',
});

/**
 * @param {LayoutNode|null} node
 */
const detachNode = node => {
  if (!node) return;
  const parent = node.parentNode;
  if (!parent) return;
  if (parent._head === node) parent._head = node._next;
  if (parent._tail === node) parent._tail = node._prev;
  if (node._prev) node._prev._next = node._next;
  if (node._next) node._next._prev = node._prev;
  node._prev = null;
  node._next = null;
  node.parentNode = null;
};

/**
 * @param {DOMTarget} $el
 * @param {LayoutNode|null} parentNode
 * @param {LayoutSnapshot} state
 * @param {LayoutNode} recycledNode
 * @return {LayoutNode}
 */
const createNode = ($el, parentNode, state, recycledNode) => {
  let dataId = $el.dataset.layoutId;
  if (!dataId) dataId = $el.dataset.layoutId = `node-${nodeId++}`;
  const node = recycledNode ? recycledNode : /** @type {LayoutNode} */({});
  node.$el = $el;
  node.$measure = $el;
  node.id = dataId;
  node.index = 0;
  node.targets = null;
  node.delay = 0;
  node.duration = 0;
  node.ease = null;
  node.state = state;
  node.layout = state.layout;
  node.parentNode = parentNode || null;
  node.isTarget = false;
  node.isEntering = false;
  node.isLeaving = false;
  node.isInlined = false;
  node.hasTransform = false;
  node.inlineStyles = [];
  node.inlineTransforms = null;
  node.inlineTransition = null;
  node.branchAdded = false;
  node.branchRemoved = false;
  node.branchNotRendered = false;
  node.sizeChanged = false;
  node.hasVisibilitySwap = false;
  node.hasDisplayNone = false;
  node.hasVisibilityHidden = false;
  node.measuredInlineTransform = null;
  node.measuredInlineTransition = null;
  node.measuredDisplay = null;
  node.measuredVisibility = null;
  node.measuredPosition = null;
  node.measuredHasDisplayNone = false;
  node.measuredHasVisibilityHidden = false;
  node.measuredIsVisible = false;
  node.measuredIsRemoved = false;
  node.measuredIsInsideRoot = false;
  node.properties = /** @type {LayoutNodeProperties} */({
    transform: 'none',
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    clientLeft: 0,
    clientTop: 0,
    width: 0,
    height: 0,
  });
  node.layout.properties.forEach(prop => node.properties[prop] = 0);
  node._head = null;
  node._tail = null;
  node._prev = null;
  node._next = null;
  return node;
};

/**
 * @param {LayoutNode} node
 * @param {DOMTarget} $measure
 * @param {CSSStyleDeclaration} computedStyle
 * @param {Boolean} skipMeasurements
 * @return {LayoutNode}
 */
const recordNodeState = (node, $measure, computedStyle, skipMeasurements) => {
  const $el = node.$el;
  const root = node.layout.root;
  const isRoot = root === $el;
  const properties = node.properties;
  const rootNode = node.state.rootNode;
  const parentNode = node.parentNode;
  const computedTransforms = computedStyle.transform;
  const inlineTransforms = $el.style.transform;
  const parentNotRendered = parentNode ? parentNode.measuredIsRemoved : false;
  const position = computedStyle.position;
  if (isRoot) node.layout.absoluteCoords = position === 'fixed' || position === 'absolute';
  node.$measure = $measure;
  node.inlineTransforms = inlineTransforms;
  node.hasTransform = computedTransforms && computedTransforms !== 'none';
  node.measuredIsInsideRoot = isElementInRoot(root, $measure);
  node.measuredInlineTransform = null;
  node.measuredDisplay = computedStyle.display;
  node.measuredVisibility = computedStyle.visibility;
  node.measuredPosition = position;
  node.measuredHasDisplayNone = computedStyle.display === 'none';
  node.measuredHasVisibilityHidden = computedStyle.visibility === 'hidden';
  node.measuredIsVisible = !(node.measuredHasDisplayNone || node.measuredHasVisibilityHidden);
  node.measuredIsRemoved = node.measuredHasDisplayNone || node.measuredHasVisibilityHidden || parentNotRendered;
  // Check if element has adjacent text that would reflow when taken out of flow
  let hasAdjacentText = false;
  let s = $el.previousSibling;
  while (s && (s.nodeType === Node.COMMENT_NODE || (s.nodeType === Node.TEXT_NODE && !s.textContent.trim()))) s = s.previousSibling;
  if (s && s.nodeType === Node.TEXT_NODE) {
    hasAdjacentText = true;
  } else {
    s = $el.nextSibling;
    while (s && (s.nodeType === Node.COMMENT_NODE || (s.nodeType === Node.TEXT_NODE && !s.textContent.trim()))) s = s.nextSibling;
    hasAdjacentText = s !== null && s.nodeType === Node.TEXT_NODE;
  }
  node.isInlined = hasAdjacentText;

  // Mute transforms (and transition to avoid triggering an animation) before the position calculation
  if (node.hasTransform && !skipMeasurements) {
    const transitionMuteStore = node.layout.transitionMuteStore;
    if (!transitionMuteStore.get($el)) node.inlineTransition = muteElementTransition($el);
    if ($measure === $el) {
      $el.style.transform = 'none';
    } else {
      if (!transitionMuteStore.get($measure)) node.measuredInlineTransition = muteElementTransition($measure);
      node.measuredInlineTransform = $measure.style.transform;
      $measure.style.transform = 'none';
    }
  }

  let left = 0;
  let top = 0;
  let width = 0;
  let height = 0;

  if (!skipMeasurements) {
    const rect = $measure.getBoundingClientRect();
    left = rect.left;
    top = rect.top;
    width = rect.width;
    height = rect.height;
  }

  for (let name in properties) {
    const computedProp = name === 'transform' ? computedTransforms : computedStyle[name] || (computedStyle.getPropertyValue && computedStyle.getPropertyValue(name));
    if (!isUnd(computedProp)) properties[name] = computedProp;
  }

  properties.left = left;
  properties.top = top;
  properties.clientLeft = skipMeasurements ? 0 : $measure.clientLeft;
  properties.clientTop = skipMeasurements ? 0 : $measure.clientTop;
  // Compute local x/y relative to parent
  let absoluteLeft, absoluteTop;
  if (isRoot) {
    if (!node.layout.absoluteCoords) {
      absoluteLeft = 0;
      absoluteTop = 0;
    } else {
      absoluteLeft = left;
      absoluteTop = top;
    }
  } else {
    const p = parentNode || rootNode;
    const parentLeft = p.properties.left;
    const parentTop = p.properties.top;
    const borderLeft = p.properties.clientLeft;
    const borderTop = p.properties.clientTop;
    if (!node.layout.absoluteCoords) {
      if (p === rootNode) {
        const rootLeft = rootNode.properties.left;
        const rootTop = rootNode.properties.top;
        const rootBorderLeft = rootNode.properties.clientLeft;
        const rootBorderTop = rootNode.properties.clientTop;
        absoluteLeft = left - rootLeft - rootBorderLeft;
        absoluteTop = top - rootTop - rootBorderTop;
      } else {
        absoluteLeft = left - parentLeft - borderLeft;
        absoluteTop = top - parentTop - borderTop;
      }
    } else {
      absoluteLeft = left - parentLeft - borderLeft;
      absoluteTop = top - parentTop - borderTop;
    }
  }
  properties.x = absoluteLeft;
  properties.y = absoluteTop;
  properties.width = width;
  properties.height = height;
  return node;
};

/**
 * @param {LayoutNode} node
 * @param {LayoutStateAnimationProperties} [props]
 */
const updateNodeProperties = (node, props) => {
  if (!props) return;
  for (let name in props) {
    node.properties[name] = props[name];
  }
};

/**
 * @param  {LayoutNode} node
 * @param  {LayoutAnimationTimingsParams} params
 */
const updateNodeTimingParams = (node, params) => {
  const easeFunctionResult = getFunctionValue(params.ease, node.$el, node.index, node.targets, null);
  const keyEasing = isFnc(easeFunctionResult) ? easeFunctionResult : params.ease;
  const hasSpring = !isUnd(keyEasing) && !isUnd(/** @type {Spring} */(keyEasing).ease);
  node.ease = hasSpring ? /** @type {Spring} */(keyEasing).ease : keyEasing;
  node.duration = hasSpring ? /** @type {Spring} */(keyEasing).settlingDuration : getFunctionValue(params.duration, node.$el, node.index, node.targets, null);
  node.delay = getFunctionValue(params.delay, node.$el, node.index, node.targets, null);
};

/**
 * @param {LayoutNode} node
 */
const recordNodeInlineStyles = node => {
  const style = node.$el.style;
  const stylesStore = node.inlineStyles;
  stylesStore.length = 0;
  node.layout.recordedProperties.forEach(prop => {
    stylesStore.push(prop, style[prop] || '');
  });
};

/**
 * @param {LayoutNode} node
 */
const restoreNodeInlineStyles = node => {
  const style = node.$el.style;
  const stylesStore = node.inlineStyles;
  for (let i = 0, l = stylesStore.length; i < l; i += 2) {
    const property = stylesStore[i];
    const styleValue = stylesStore[i + 1];
    if (styleValue && styleValue !== '') {
      style[property] = styleValue;
    } else {
      style[property] = '';
      style.removeProperty(property);
    }
  }
};

/**
 * @param {LayoutNode} node
 */
const restoreNodeTransform = node => {
  const inlineTransforms = node.inlineTransforms;
  const nodeStyle = node.$el.style;
  if (!node.hasTransform || !inlineTransforms || (node.hasTransform && nodeStyle.transform === 'none') || (inlineTransforms && inlineTransforms === 'none')) {
    nodeStyle.removeProperty('transform');
  } else if (inlineTransforms) {
    nodeStyle.transform = inlineTransforms;
  }
  const $measure = node.$measure;
  if (node.hasTransform && $measure !== node.$el) {
    const measuredStyle = $measure.style;
    const measuredInline = node.measuredInlineTransform;
    if (measuredInline && measuredInline !== '') {
      measuredStyle.transform = measuredInline;
    } else {
      measuredStyle.removeProperty('transform');
    }
  }
  node.measuredInlineTransform = null;
  if (node.inlineTransition !== null) {
    restoreElementTransition(node.$el, node.inlineTransition);
    node.inlineTransition = null;
  }
  if ($measure !== node.$el && node.measuredInlineTransition !== null) {
    restoreElementTransition($measure, node.measuredInlineTransition);
    node.measuredInlineTransition = null;
  }
};

/**
 * @param {LayoutNode} node
 */
const restoreNodeVisualState = node => {
  if (node.measuredIsRemoved || node.hasVisibilitySwap) {
    node.$el.style.removeProperty('display');
    node.$el.style.removeProperty('visibility');
    if (node.hasVisibilitySwap) {
      node.$measure.style.removeProperty('display');
      node.$measure.style.removeProperty('visibility');
    }
  }
  // if (node.measuredIsRemoved) {
  node.layout.pendingRemoval.delete(node.$el);
  // }
};

/**
 * @param {LayoutNode} node
 * @param {LayoutNode} targetNode
 * @param {LayoutSnapshot} newState
 * @return {LayoutNode}
 */
const cloneNodeProperties = (node, targetNode, newState) => {
  targetNode.properties = /** @type {LayoutNodeProperties} */({ ...node.properties });
  targetNode.state = newState;
  targetNode.isTarget = node.isTarget;
  targetNode.hasTransform = node.hasTransform;
  targetNode.inlineTransforms = node.inlineTransforms;
  targetNode.measuredIsVisible = node.measuredIsVisible;
  targetNode.measuredDisplay = node.measuredDisplay;
  targetNode.measuredIsRemoved = node.measuredIsRemoved;
  targetNode.measuredHasDisplayNone = node.measuredHasDisplayNone;
  targetNode.measuredHasVisibilityHidden = node.measuredHasVisibilityHidden;
  targetNode.hasDisplayNone = node.hasDisplayNone;
  targetNode.isInlined = node.isInlined;
  targetNode.hasVisibilityHidden = node.hasVisibilityHidden;
  return targetNode;
};

class LayoutSnapshot {
  /**
   * @param {AutoLayout} layout
   */
  constructor(layout) {
    /** @type {AutoLayout} */
    this.layout = layout;
    /** @type {LayoutNode|null} */
    this.rootNode = null;
    /** @type {Set<LayoutNode>} */
    this.rootNodes = new Set();
    /** @type {Map<String, LayoutNode>} */
    this.nodes = new Map();
    /** @type {Number} */
    this.scrollX = 0;
    /** @type {Number} */
    this.scrollY = 0;
  }

  /**
   * @return {this}
   */
  revert() {
    this.forEachNode(node => {
      this.layout.pendingRemoval.delete(node.$el);
      node.$el.removeAttribute('data-layout-id');
      node.$measure.removeAttribute('data-layout-id');
    });
    this.rootNode = null;
    this.rootNodes.clear();
    this.nodes.clear();
    return this;
  }

  /**
   * @param {DOMTarget} $el
   * @return {LayoutNode}
   */
  getNode($el) {
    if (!$el || !$el.dataset) return;
    return this.nodes.get($el.dataset.layoutId);
  }

  /**
   * @param {DOMTarget} $el
   * @param {String} prop
   * @return {Number|String}
   */
  getComputedValue($el, prop) {
    const node = this.getNode($el);
    if (!node) return;
    return /** @type {Number|String} */(node.properties[prop]);
  }

  /**
   * @param {LayoutNode|null} rootNode
   * @param {LayoutNodeIterator} cb
   */
  forEach(rootNode, cb) {
    let node = rootNode;
    let i = 0;
    while (node) {
      cb(node, i++);
      if (node._head) {
        node = node._head;
      } else if (node._next) {
        node = node._next;
      } else {
        while (node && !node._next) {
          node = node.parentNode;
        }
        if (node) node = node._next;
      }
    }
  }

  /**
   * @param {LayoutNodeIterator} cb
   */
  forEachRootNode(cb) {
    this.forEach(this.rootNode, cb);
  }

  /**
   * @param {LayoutNodeIterator} cb
   */
  forEachNode(cb) {
    for (const rootNode of this.rootNodes) {
      this.forEach(rootNode, cb);
    }
  }

  /**
   * @param {DOMTarget} $el
   * @param {LayoutNode|null} parentNode
   * @return {LayoutNode|null}
   */
  registerElement($el, parentNode) {
    if (!$el || $el.nodeType !== 1) return null;

    if (!this.layout.transitionMuteStore.has($el)) this.layout.transitionMuteStore.set($el, muteElementTransition($el));

    /** @type {Array<DOMTarget|LayoutNode|null>} */
    const stack = [$el, parentNode];
    const root = this.layout.root;
    let firstNode = null;

    while (stack.length) {
      /** @type {LayoutNode|null} */
      const $parent = /** @type {LayoutNode|null} */(stack.pop());
      /** @type {DOMTarget|null} */
      const $current = /** @type {DOMTarget|null} */(stack.pop());

      if (!$current || $current.nodeType !== 1 || isSvg($current)) continue;

      const skipMeasurements = $parent ? $parent.measuredIsRemoved : false;
      const computedStyle = skipMeasurements ? hiddenComputedStyle : getComputedStyle($current);
      const hasDisplayNone = skipMeasurements ? true : computedStyle.display === 'none';
      const hasVisibilityHidden = skipMeasurements ? true : computedStyle.visibility === 'hidden';
      const isVisible = !hasDisplayNone && !hasVisibilityHidden;
      const existingId = $current.dataset.layoutId;
      const isInsideRoot = isElementInRoot(root, $current);

      let node = existingId ? this.nodes.get(existingId) : null;

      if (node && node.$el !== $current) {
        const nodeInsideRoot = isElementInRoot(root, node.$el);
        const measuredVisible = node.measuredIsVisible;
        const shouldReassignNode = !nodeInsideRoot && (isInsideRoot || (!isInsideRoot && !measuredVisible && isVisible));
        const shouldReuseMeasurements = nodeInsideRoot && !measuredVisible && isVisible;
        // Rebind nodes that move into the root or whose detached twin just became visible
        if (shouldReassignNode) {
          detachNode(node);
          node = createNode($current, $parent, this, node);
        // for hidden element with in-root sibling, keep the hidden node but borrow measurements from its visible in-root twin element
        } else if (shouldReuseMeasurements) {
          recordNodeState(node, $current, computedStyle, skipMeasurements);
          let $child = $current.lastElementChild;
          while ($child) {
            stack.push(/** @type {DOMTarget} */($child), node);
            $child = $child.previousElementSibling;
          }
          if (!firstNode) firstNode = node;
          continue;
        // No reassignment needed so keep walking descendants under the current parent
        } else {
          let $child = $current.lastElementChild;
          while ($child) {
            stack.push(/** @type {DOMTarget} */($child), $parent);
            $child = $child.previousElementSibling;
          }
          if (!firstNode) firstNode = node;
          continue;
        }
      } else {
        node = createNode($current, $parent, this, node);
      }

      node.branchAdded = false;
      node.branchRemoved = false;
      node.branchNotRendered = false;
      node.isTarget = false;
      node.sizeChanged = false;
      node.hasVisibilityHidden = hasVisibilityHidden;
      node.hasDisplayNone = hasDisplayNone;
      node.hasVisibilitySwap = (hasVisibilityHidden && !node.measuredHasVisibilityHidden) || (hasDisplayNone && !node.measuredHasDisplayNone);

      this.nodes.set(node.id, node);

      node.parentNode = $parent || null;
      node._prev = null;
      node._next = null;

      if ($parent) {
        this.rootNodes.delete(node);
        if (!$parent._head) {
          $parent._head = node;
          $parent._tail = node;
        } else {
          $parent._tail._next = node;
          node._prev = $parent._tail;
          $parent._tail = node;
        }
      } else {
        // Each disconnected subtree becomes its own root in the snapshot graph
        this.rootNodes.add(node);
      }

      recordNodeState(node, node.$el, computedStyle, skipMeasurements);

      let $child = $current.lastElementChild;
      while ($child) {
        stack.push(/** @type {DOMTarget} */($child), node);
        $child = $child.previousElementSibling;
      }

      if (!firstNode) firstNode = node;
    }

    return firstNode;
  }

  /**
   * @param {DOMTarget} $el
   * @param {Set<DOMTarget>} candidates
   * @return {LayoutNode|null}
   */
  ensureDetachedNode($el, candidates) {
    if (!$el || $el === this.layout.root) return null;
    const existingId = $el.dataset.layoutId;
    const existingNode = existingId ? this.nodes.get(existingId) : null;
    if (existingNode && existingNode.$el === $el) return existingNode;
    let parentNode = null;
    let $ancestor = $el.parentElement;
    while ($ancestor && $ancestor !== this.layout.root) {
      if (candidates.has($ancestor)) {
        parentNode = this.ensureDetachedNode($ancestor, candidates);
        break;
      }
      $ancestor = $ancestor.parentElement;
    }
    return this.registerElement($el, parentNode);
  }

  /**
   * @return {this}
   */
  record() {
    const layout = this.layout;
    const children = layout.children;
    const root = layout.root;
    const toParse = isArr(children) ? children : [children];
    const scoped = [];
    const scopeRoot = children === '*' ? root : scope.root;

    // Mute transition and transforms of root ancestors before recording the state

    /** @type {Array<DOMTarget|String|null>} */
    const rootAncestorTransformStore = [];
    let $ancestor = root.parentElement;
    while ($ancestor && $ancestor.nodeType === 1) {
      const computedStyle = getComputedStyle($ancestor);
      if (computedStyle.transform && computedStyle.transform !== 'none') {
        const inlineTransform = $ancestor.style.transform || '';
        const inlineTransition = muteElementTransition($ancestor);
        rootAncestorTransformStore.push($ancestor, inlineTransform, inlineTransition);
        $ancestor.style.transform = 'none';
      }
      $ancestor = $ancestor.parentElement;
    }

    for (let i = 0, l = toParse.length; i < l; i++) {
      const child = toParse[i];
      scoped[i] = isStr(child) ? scopeRoot.querySelectorAll(child) : child;
    }

    const parsedChildren = registerTargets(scoped);

    this.nodes.clear();
    this.rootNodes.clear();

    const rootNode = this.registerElement(root, null);
    // Root node are always targets
    rootNode.isTarget = true;
    this.rootNode = rootNode;

    const inRootNodeIds = new Set();
    // Update index and total for inital timing calculation
    let index = 0;
    const allNodeTargets = [];
    this.nodes.forEach((node) => { allNodeTargets.push(node.$el); });
    this.nodes.forEach((node, id) => {
      node.index = index++;
      node.targets = allNodeTargets;
      // Track ids of nodes that belong to the current root to filter detached matches
      if (node && node.measuredIsInsideRoot) {
        inRootNodeIds.add(id);
      }
    });

    // Elements with a layout id outside the root that match the children selector
    const detachedElementsLookup = new Set();
    const orderedDetachedElements = [];

    for (let i = 0, l = parsedChildren.length; i < l; i++) {
      const $el = parsedChildren[i];
      if (!$el || $el.nodeType !== 1 || $el === root) continue;
      const insideRoot = isElementInRoot(root, $el);
      if (!insideRoot) {
        const layoutNodeId = $el.dataset.layoutId;
        if (!layoutNodeId || !inRootNodeIds.has(layoutNodeId)) continue;
      }
      if (!detachedElementsLookup.has($el)) {
        detachedElementsLookup.add($el);
        orderedDetachedElements.push($el);
      }
    }

    for (let i = 0, l = orderedDetachedElements.length; i < l; i++) {
      this.ensureDetachedNode(orderedDetachedElements[i], detachedElementsLookup);
    }

    for (let i = 0, l = parsedChildren.length; i < l; i++) {
      const $el = parsedChildren[i];
      const node = this.getNode($el);
      if (node) {
        let cur = node;
        while (cur) {
          if (cur.isTarget) break;
          cur.isTarget = true;
          cur = cur.parentNode;
        }
      }
    }

    this.scrollX = window.scrollX;
    this.scrollY = window.scrollY;

    this.forEachNode(restoreNodeTransform);

    // Restore transition and transforms of root ancestors

    for (let i = 0, l = rootAncestorTransformStore.length; i < l; i += 3) {
      const $el = /** @type {DOMTarget} */(rootAncestorTransformStore[i]);
      const inlineTransform = /** @type {String} */(rootAncestorTransformStore[i + 1]);
      const inlineTransition = /** @type {String|null} */(rootAncestorTransformStore[i + 2]);
      if (inlineTransform && inlineTransform !== '') {
        $el.style.transform = inlineTransform;
      } else {
        $el.style.removeProperty('transform');
      }
      restoreElementTransition($el, inlineTransition);
    }

    return this;
  }
}

/**
 * @param  {LayoutStateParams} params
 * @return {[LayoutStateAnimationProperties, LayoutAnimationTimingsParams]}
 */
function splitPropertiesFromParams(params) {
  /** @type {LayoutStateAnimationProperties} */
  const properties = {};
  /** @type {LayoutAnimationTimingsParams} */
  const parameters = {};
  for (let name in params) {
    const value = params[name];
    const isEase = name === 'ease';
    const isTiming = name === 'duration' || name === 'delay';
    if (isTiming || isEase) {
      if (isEase) {
        parameters[name] = /** @type {EasingParam} */(value);
      } else {
        parameters[name] = /** @type {Number|FunctionValue} */(value);
      }
    } else {
      properties[name] = /** @type {Number|String} */(value);
    }
  }
  return [properties, parameters];
}

class AutoLayout {
  /**
   * @param {DOMTargetSelector} root
   * @param {AutoLayoutParams} [params]
   */
  constructor(root, params = {}) {
    if (scope.current) scope.current.register(this);
    const swapAtSplitParams = splitPropertiesFromParams(params.swapAt);
    const enterFromSplitParams = splitPropertiesFromParams(params.enterFrom);
    const leaveToSplitParams = splitPropertiesFromParams(params.leaveTo);
    const transitionProperties = params.properties;
    /** @type {Number|FunctionValue} */
    params.duration = setValue(params.duration, 350);
    /** @type {Number|FunctionValue} */
    params.delay = setValue(params.delay, 0);
    /** @type {EasingParam|FunctionValue} */
    params.ease = setValue(params.ease, 'inOut(3.5)');
    /** @type {AutoLayoutParams} */
    this.params = params;
    /** @type {DOMTarget} */
    this.root = /** @type {DOMTarget} */(registerTargets(root)[0]);
    /** @type {Number|String} */
    this.id = params.id || layoutId++;
    /** @type {LayoutChildrenParam} */
    this.children = params.children || '*';
    /** @type {Boolean} */
    this.absoluteCoords = false;
    /** @type {LayoutStateParams} */
    this.swapAtParams = mergeObjects(params.swapAt || { opacity: 0 }, { ease: 'inOut(1.75)' });
    /** @type {LayoutStateParams} */
    this.enterFromParams = params.enterFrom || { opacity: 0 };
    /** @type {LayoutStateParams} */
    this.leaveToParams = params.leaveTo || { opacity: 0 };
    /** @type {Set<String>} */
    this.properties = new Set([
      'opacity',
      'fontSize',
      'color',
      'backgroundColor',
      'borderRadius',
      'border',
      'filter',
      'clipPath',
    ]);
    if (swapAtSplitParams[0]) for (let name in swapAtSplitParams[0]) this.properties.add(name);
    if (enterFromSplitParams[0]) for (let name in enterFromSplitParams[0]) this.properties.add(name);
    if (leaveToSplitParams[0]) for (let name in leaveToSplitParams[0]) this.properties.add(name);
    if (transitionProperties) for (let i = 0, l = transitionProperties.length; i < l; i++) this.properties.add(transitionProperties[i]);
    /** @type {Set<String>} */
    this.recordedProperties = new Set([
      'display',
      'visibility',
      'translate',
      'position',
      'left',
      'top',
      'marginLeft',
      'marginTop',
      'width',
      'height',
      'maxWidth',
      'maxHeight',
      'minWidth',
      'minHeight',
    ]);
    this.properties.forEach(prop => this.recordedProperties.add(prop));
    /** @type {WeakSet<DOMTarget>} */
    this.pendingRemoval = new WeakSet();
    /** @type {Map<DOMTarget, String|null>} */
    this.transitionMuteStore = new Map();
    /** @type {LayoutSnapshot} */
    this.oldState = new LayoutSnapshot(this);
    /** @type {LayoutSnapshot} */
    this.newState = new LayoutSnapshot(this);
    /** @type {Timeline} */
    this.timeline = null;
    /** @type {WAAPIAnimation} */
    this.transformAnimation = null;
    /** @type {Array<DOMTarget>} */
    this.animating = [];
    /** @type {Array<DOMTarget>} */
    this.swapping = [];
    /** @type {Array<DOMTarget>} */
    this.leaving = [];
    /** @type {Array<DOMTarget>} */
    this.entering = [];
    // Record the current state as the old state to init the data attributes and allow imediate .animate()
    this.oldState.record();
    // And all layout transition muted during the record
    restoreLayoutTransition(this.transitionMuteStore);
  }

  /**
   * @return {this}
   */
  revert() {
    this.root.classList.remove('is-animated');
    if (this.timeline) {
      this.timeline.complete();
      this.timeline = null;
    }
    if (this.transformAnimation) {
      this.transformAnimation.complete();
      this.transformAnimation = null;
    }
    this.animating.length = this.swapping.length = this.leaving.length = this.entering.length = 0;
    this.oldState.revert();
    this.newState.revert();
    requestAnimationFrame(() => restoreLayoutTransition(this.transitionMuteStore));
    return this;
  }

  /**
   * @return {this}
   */
  record() {
    // Commit transforms before measuring
    if (this.transformAnimation) {
      this.transformAnimation.cancel();
      this.transformAnimation = null;
    }
    const useFreshSnapshots = !!(globals.editor && globals.editor.addLayoutTransition);
    if (useFreshSnapshots) this.oldState = new LayoutSnapshot(this);
    this.oldState.record();
    // Cancel any running timeline
    if (this.timeline) {
      this.timeline.cancel();
      this.timeline = null;
    }
    // Restore previously captured inline styles
    this.newState.forEachRootNode(restoreNodeInlineStyles);
    if (useFreshSnapshots) this.newState = new LayoutSnapshot(this);
    return this;
  }

  /**
   * @param {LayoutAnimationParams} [params]
   * @return {Timeline}
   */
  animate(params = {}) {
    const editor = globals.editor;
    if (editor && editor.addLayoutTransition) return editor.addLayoutTransition(this, params, 'animate', createLayoutTransitionBuilder(this));
    const editorTransition = activeLayoutTransition && activeLayoutTransition.oldState.layout === this
      ? activeLayoutTransition : null;
    const editorControlled = !!(editorTransition && !isUnd(params.id));
    const oldState = editorTransition ? editorTransition.oldState : this.oldState;
    const newState = editorTransition ? editorTransition.newState : this.newState;
    if (editorTransition && newState.rootNode) {
      // A rebuild uses the recorded layout, not the temporary styles of its previous frame.
      if (this.transformAnimation) {
        this.transformAnimation.cancel();
        this.transformAnimation = null;
      }
      newState.forEachRootNode(restoreNodeInlineStyles);
      newState.forEachNode(restoreNodeTransform);
      this.root.classList.remove('is-animated');
    }
    /** @type {WAAPIAnimation} */
    let transformAnimation = null;
    /** @type {Timeline} */
    let timeline = null;
    /** @type { LayoutAnimationTimingsParams } */
    const animationTimings = {
      ease: setValue(params.ease, this.params.ease),
      delay: setValue(params.delay, this.params.delay),
      duration: setValue(params.duration, this.params.duration),
    };
    /** @type {TimelineParams} */
    const tlParams = {
      id: this.id
    };
    const onComplete = setValue(params.onComplete, this.params.onComplete);
    const onPause = setValue(params.onPause, this.params.onPause);
    for (let name in defaults) {
      if (name !== 'ease' && name !== 'duration' && name !== 'delay') {
        if (!isUnd(params[name])) {
          tlParams[name] = params[name];
        } else if (!isUnd(this.params[name])) {
          tlParams[name] = this.params[name];
        }
      }
    }
    tlParams.muted = false;
    tlParams.onComplete = () => {
      const ap = /** @type {ScrollObserver} */(params.autoplay);
      if (ap && ap.linked) {
        if (onComplete) onComplete(timeline);
        return;
      }
      // Make sure to call .cancel() after restoreNodeInlineStyles(node); otehrwise the commited styles get reverted
      if (transformAnimation) transformAnimation.cancel();
      newState.forEachRootNode(node => {
        restoreNodeVisualState(node);
        restoreNodeInlineStyles(node);
      });
      for (let i = 0, l = transformed.length; i < l; i++) {
        const $el = transformed[i];
        $el.style.transform = newState.getComputedValue($el, 'transform');
      }
      if (this.root.classList.contains('is-animated')) {
        this.root.classList.remove('is-animated');
        if (onComplete) onComplete(timeline);
      }
      // Avoid CSS transitions at the end of the animation by restoring them on the next frame
      requestAnimationFrame(() => {
        if (this.root.classList.contains('is-animated')) return;
        restoreLayoutTransition(this.transitionMuteStore);
      });
    };
    tlParams.onPause = () => {
      const ap = /** @type {ScrollObserver} */(params.autoplay);
      const isScrollLinked = ap && ap.linked;
      if (isScrollLinked) {
        if (onComplete) onComplete(timeline);
        if (onPause) onPause(timeline);
        return;
      }
      if (editorControlled) {
        // Report onPause only when is-animated is set, so this branch matches the native one below.
        if (onPause && this.root.classList.contains('is-animated')) onPause(timeline);
        return;
      }
      if (!this.root.classList.contains('is-animated')) return;
      if (transformAnimation) transformAnimation.cancel();
      newState.forEachRootNode(restoreNodeVisualState);
      this.root.classList.remove('is-animated');
      if (onComplete) onComplete(timeline);
      if (onPause) onPause(timeline);
    };
    tlParams.composition = false;

    const swapAtParams = mergeObjects(mergeObjects(params.swapAt || {}, this.swapAtParams), animationTimings);
    const enterFromParams = mergeObjects(mergeObjects(params.enterFrom || {}, this.enterFromParams), animationTimings);
    const leaveToParams = mergeObjects(mergeObjects(params.leaveTo || {}, this.leaveToParams), animationTimings);
    const [ swapAtProps, swapAtTimings ] = splitPropertiesFromParams(swapAtParams);
    const [ enterFromProps, enterFromTimings ] = splitPropertiesFromParams(enterFromParams);
    const [ leaveToProps, leaveToTimings ] = splitPropertiesFromParams(leaveToParams);

    const animating = this.animating;
    const swapping = this.swapping;
    const entering = this.entering;
    const leaving = this.leaving;
    const pendingRemoval = this.pendingRemoval;

    animating.length = swapping.length = entering.length = leaving.length = 0;

    // Mute old state CSS transitions to prevent wrong properties calculation
    oldState.forEachRootNode(muteNodeTransition);
    // Capture the new state before animation
    if (!editorTransition || !newState.rootNode) {
      newState.record();
      newState.forEachRootNode(recordNodeInlineStyles);
    }
    if (editorControlled) {
      this.oldState = oldState;
      this.newState = newState;
    }

    const targets = [];
    const animated = [];
    const transformed = [];
    const animatedSwap = [];
    const rootNode = newState.rootNode;
    const $root = rootNode.$el;

    newState.forEachRootNode(node => {

      const $el = node.$el;
      const id = node.id;
      const parent = node.parentNode;
      const parentAdded = parent ? parent.branchAdded : false;
      const parentRemoved = parent ? parent.branchRemoved : false;
      const parentNotRendered = parent ? parent.branchNotRendered : false;

      let oldStateNode = oldState.nodes.get(id);

      const hasNoOldState = !oldStateNode;

      if (hasNoOldState) {
        oldStateNode = cloneNodeProperties(node, /** @type {LayoutNode} */({}), oldState);
        oldState.nodes.set(id, oldStateNode);
        oldStateNode.measuredIsRemoved = true;
      } else if (oldStateNode.measuredIsRemoved && !node.measuredIsRemoved) {
        cloneNodeProperties(node, oldStateNode, oldState);
        oldStateNode.measuredIsRemoved = true;
      }

      const oldParentNode = oldStateNode.parentNode;
      const oldParentId = oldParentNode ? oldParentNode.id : null;
      const newParentId = parent ? parent.id : null;
      const parentChanged = oldParentId !== newParentId;
      const elementChanged = oldStateNode.$el !== node.$el;
      const wasRemovedBefore = oldStateNode.measuredIsRemoved;
      const isRemovedNow = node.measuredIsRemoved;

      // Recalculate postion relative to their parent for elements that have been moved
      if (!oldStateNode.measuredIsRemoved && !isRemovedNow && !hasNoOldState && (parentChanged || elementChanged)) {
        const oldAbsoluteLeft = oldStateNode.properties.left;
        const oldAbsoluteTop = oldStateNode.properties.top;
        const newParent = parent || newState.rootNode;
        const oldParent = newParent.id ? oldState.nodes.get(newParent.id) : null;
        const parentLeft = oldParent ? oldParent.properties.left : newParent.properties.left;
        const parentTop = oldParent ? oldParent.properties.top : newParent.properties.top;
        const borderLeft = oldParent ? oldParent.properties.clientLeft : newParent.properties.clientLeft;
        const borderTop = oldParent ? oldParent.properties.clientTop : newParent.properties.clientTop;
        oldStateNode.properties.x = oldAbsoluteLeft - parentLeft - borderLeft;
        oldStateNode.properties.y = oldAbsoluteTop - parentTop - borderTop;
      }

      if (node.hasVisibilitySwap) {
        if (node.hasVisibilityHidden) {
          node.$el.style.visibility = 'visible';
          node.$measure.style.visibility = 'hidden';
        }
        if (node.hasDisplayNone) {
          node.$el.style.display = oldStateNode.measuredDisplay || node.measuredDisplay || '';
          // Setting visibility 'hidden' instead of display none to avoid calculation issues
          node.$measure.style.visibility = 'hidden';
          // @TODO: check why setting display here can cause calculation issues
          // node.$measure.style.display = 'none';
        }
      }

      const wasPendingRemoval = pendingRemoval.has($el);
      const wasVisibleBefore = oldStateNode.measuredIsVisible;
      const isVisibleNow = node.measuredIsVisible;
      const becomeVisible = !wasVisibleBefore && isVisibleNow && !parentNotRendered;
      const topLevelAdded = !isRemovedNow && (wasRemovedBefore || wasPendingRemoval) && !parentAdded;
      const newlyRemoved = isRemovedNow && !wasRemovedBefore && !parentRemoved;
      const topLevelRemoved = newlyRemoved || isRemovedNow && wasPendingRemoval && !parentRemoved;

      node.branchAdded = parentAdded || topLevelAdded;
      node.branchRemoved = parentRemoved || topLevelRemoved;
      node.branchNotRendered = parentNotRendered || isRemovedNow;

      if (isRemovedNow && wasVisibleBefore) {
        node.$el.style.display = oldStateNode.measuredDisplay;
        node.$el.style.visibility = 'visible';
        cloneNodeProperties(oldStateNode, node, newState);
      }

      // Node is leaving
      if (newlyRemoved) {
        if (node.isTarget) {
          leaving.push($el);
          node.isLeaving = true;
        }
        pendingRemoval.add($el);
      } else if (!isRemovedNow && wasPendingRemoval) {
        pendingRemoval.delete($el);
      }

      // Node is entering
      if ((topLevelAdded && !parentNotRendered) || becomeVisible) {
        updateNodeProperties(oldStateNode, enterFromProps);
        if (node.isTarget) {
          entering.push($el);
          node.isEntering = true;
        }
      // Node is leaving
      } else if (topLevelRemoved && !parentNotRendered) {
        updateNodeProperties(node, leaveToProps);
      }

      // Node is animating
      // The animating array is used only to calculate delays and duration on root children
      if (node !== rootNode && node.isTarget && !node.isEntering && !node.isLeaving) {
        animating.push($el);
      }

      targets.push($el);

    });

    let enteringIndex = 0;
    let leavingIndex = 0;
    let animatingIndex = 0;

    newState.forEachRootNode(node => {

      const $el = node.$el;
      const parent = node.parentNode;
      const oldStateNode = oldState.nodes.get(node.id);
      const nodeProperties = node.properties;
      const oldStateNodeProperties = oldStateNode.properties;

      // Use closest animated parent index and total values so that children staggered delays are in sync with their parent
      let animatedParent = parent !== rootNode && parent;
      while (animatedParent && !animatedParent.isTarget && animatedParent !== rootNode) {
        animatedParent = animatedParent.parentNode;
      }

      // Root is always animated first in sync with the first child (animating.length is the total of children)
      if (node === rootNode) {
        node.index = 0;
        node.targets = animating;
        updateNodeTimingParams(node, animationTimings);
      } else if (node.isEntering) {
        node.index = animatedParent ? animatedParent.index : enteringIndex;
        node.targets = animatedParent ? animating : entering;
        updateNodeTimingParams(node, enterFromTimings);
        enteringIndex++;
      } else if (node.isLeaving) {
        node.index = animatedParent ? animatedParent.index : leavingIndex;
        node.targets = animatedParent ? animating : leaving;
        leavingIndex++;
        updateNodeTimingParams(node, leaveToTimings);
      } else if (node.isTarget) {
        node.index = animatingIndex++;
        node.targets = animating;
        updateNodeTimingParams(node, animationTimings);
      } else {
        node.index = animatedParent ? animatedParent.index : 0;
        node.targets = animating;
        updateNodeTimingParams(node, swapAtTimings);
      }

      // Make sure the old state node has its inex and total values up to date for valid "from" function values calculation
      oldStateNode.index = node.index;
      oldStateNode.targets = node.targets;

      // Computes all values up front so we can check for changes and we don't have to re-compute them inside the animation props
      for (let prop in nodeProperties) {
        nodeProperties[prop] = getFunctionValue(nodeProperties[prop], $el, node.index, node.targets, null);
        oldStateNodeProperties[prop] = getFunctionValue(oldStateNodeProperties[prop], $el, oldStateNode.index, oldStateNode.targets, null);
      }

      // Use a 1px tolerance to detect dimensions changes to prevent width / height animations on barelly visible elements
      const sizeTolerance = 1;
      const widthChanged = Math.abs(nodeProperties.width - oldStateNodeProperties.width) > sizeTolerance;
      const heightChanged = Math.abs(nodeProperties.height - oldStateNodeProperties.height) > sizeTolerance;

      node.sizeChanged = (widthChanged || heightChanged);

      // const hiddenStateChanged = (topLevelAdded || newlyRemoved) && wasRemovedBefore !== isRemovedNow;

      if (node.isTarget && (!node.measuredIsRemoved && oldStateNode.measuredIsVisible || node.measuredIsRemoved && node.measuredIsVisible)) {
        if (nodeProperties.transform !== 'none' || oldStateNodeProperties.transform !== 'none') {
          node.hasTransform = true;
          transformed.push($el);
        }
        for (let prop in nodeProperties) {
          // if (prop !== 'transform' && (nodeProperties[prop] !== oldStateNodeProperties[prop] || hiddenStateChanged)) {
          if (prop !== 'transform' && (nodeProperties[prop] !== oldStateNodeProperties[prop])) {
            animated.push($el);
            break;
          }
        }
      }

      if (!node.isTarget) {
        swapping.push($el);
        if (node.sizeChanged && parent && parent.isTarget && parent.sizeChanged) {
          if (swapAtProps.transform) {
            node.hasTransform = true;
            transformed.push($el);
          }
          animatedSwap.push($el);
        }
      }

    });

    const timingParams = {
      // Keep the child animations unmuted so a muted global default does not stop the layout.
      muted: false,
      delay: (/** @type {HTMLElement} */$el) => newState.getNode($el).delay,
      duration: (/** @type {HTMLElement} */$el) => newState.getNode($el).duration,
      ease: (/** @type {HTMLElement} */$el) => newState.getNode($el).ease,
    };

    tlParams.defaults = timingParams;

    timeline = this.timeline = createTimeline(tlParams);

    // Imediatly return the timeline if no layout changes detected
    if (!animated.length && !transformed.length && !swapping.length) {
      // Make sure to restore all CSS transition if no animation
      restoreLayoutTransition(this.transitionMuteStore);
      return this.timeline.complete();
    }

    if (targets.length) {

      this.root.classList.add('is-animated');

      for (let i = 0, l = targets.length; i < l; i++) {
        const $el = targets[i];
        const id = $el.dataset.layoutId;
        const oldNode = oldState.nodes.get(id);
        const newNode = newState.nodes.get(id);
        const oldNodeState = oldNode.properties;

        // muteNodeTransition(newNode);

        // Don't animate positions of inlined elements (to avoid text reflow)
        if (!newNode.isInlined) {
          // Display grid can mess with the absolute positioning, so set it to block during transition
          if (oldNode.measuredDisplay === 'grid' || newNode.measuredDisplay === 'grid') $el.style.setProperty('display', 'block', 'important');
          // All children must be in position absolute or fixed
          if ($el !== $root || this.absoluteCoords) {
            $el.style.position = this.absoluteCoords ? 'fixed' : 'absolute';
            $el.style.left = '0px';
            $el.style.top = '0px';
            $el.style.marginLeft = '0px';
            $el.style.marginTop = '0px';
            $el.style.translate = `${oldNodeState.x}px ${oldNodeState.y}px`;
          }
          if ($el === $root && newNode.measuredPosition === 'static') {
            $el.style.position = 'relative';
            // Cancel left / trop in case the static element had muted values now activated by potision relative
            $el.style.left = '0px';
            $el.style.top = '0px';
          }
        }
        // Animate dimensions for all elements (including inlined)
        $el.style.width = `${oldNodeState.width}px`;
        $el.style.height = `${oldNodeState.height}px`;
        // Overrides user defined min and max to prevents width and height clamping
        $el.style.minWidth = `auto`;
        $el.style.minHeight = `auto`;
        $el.style.maxWidth = `none`;
        $el.style.maxHeight = `none`;
      }

      // Restore the scroll position if the oldState differs from the current state
      if (oldState.scrollX !== window.scrollX || oldState.scrollY !== window.scrollY) {
        // Restoring in the next frame avoids race conditions if for example a waapi animation commit styles that affect the root height
        requestAnimationFrame(() => window.scrollTo(oldState.scrollX, oldState.scrollY));
      }

      for (let i = 0, l = animated.length; i < l; i++) {
        const $el = animated[i];
        const id = $el.dataset.layoutId;
        const oldNode = oldState.nodes.get(id);
        const newNode = newState.nodes.get(id);
        const oldNodeState = oldNode.properties;
        const newNodeState = newNode.properties;
        let nodeHasChanged = false;
        /** @type {AnimationParams} */
        const animatedProps = {
          composition: 'none',
        };
        if (oldNodeState.width !== newNodeState.width) {
          animatedProps.width = [oldNodeState.width, newNodeState.width];
          nodeHasChanged = true;
        }
        if (oldNodeState.height !== newNodeState.height) {
          animatedProps.height = [oldNodeState.height, newNodeState.height];
          nodeHasChanged = true;
        }
        // If the node has transforms we handle the translate animation in waapi otherwise translate and other transforms can be out of sync
        // And we don't animate the position of inlined elements
        if (!newNode.hasTransform && !newNode.isInlined) {
          animatedProps.translate = [`${oldNodeState.x}px ${oldNodeState.y}px`, `${newNodeState.x}px ${newNodeState.y}px`];
          nodeHasChanged = true;
        }
        this.properties.forEach(prop => {
          const oldVal = oldNodeState[prop];
          const newVal = newNodeState[prop];
          if (prop !== 'transform' && oldVal !== newVal) {
            animatedProps[prop] = [oldVal, newVal];
            nodeHasChanged = true;
          }
        });
        if (nodeHasChanged) {
          this.timeline.add($el, animatedProps, 0);
        }
      }

    }

    if (swapping.length) {

      for (let i = 0, l = swapping.length; i < l; i++) {
        const $el = swapping[i];
        const oldNode = oldState.getNode($el);
        const oldNodeProps = oldNode.properties;
        $el.style.width = `${oldNodeProps.width}px`;
        $el.style.height = `${oldNodeProps.height}px`;
        // Overrides user defined min and max to prevents width and height clamping
        $el.style.minWidth = `auto`;
        $el.style.minHeight = `auto`;
        $el.style.maxWidth = `none`;
        $el.style.maxHeight = `none`;
        // We don't animate the position of inlined elements
        if (!oldNode.isInlined) {
          $el.style.translate = `${oldNodeProps.x}px ${oldNodeProps.y}px`;
        }
        this.properties.forEach(prop => {
          if (prop !== 'transform') {
            $el.style[prop] = `${oldState.getComputedValue($el, prop)}`;
          }
        });
      }

      for (let i = 0, l = swapping.length; i < l; i++) {
        const $el = swapping[i];
        const newNode = newState.getNode($el);
        const newNodeProps = newNode.properties;
        this.timeline.call(() => {
          $el.style.width = `${newNodeProps.width}px`;
          $el.style.height = `${newNodeProps.height}px`;
          // Overrides user defined min and max to prevents width and height clamping
          $el.style.minWidth = `auto`;
          $el.style.minHeight = `auto`;
          $el.style.maxWidth = `none`;
          $el.style.maxHeight = `none`;
          // Don't set translate for inlined elements (to avoid text reflow)
          if (!newNode.isInlined) {
            $el.style.translate = `${newNodeProps.x}px ${newNodeProps.y}px`;
          }
          this.properties.forEach(prop => {
            if (prop !== 'transform') {
              $el.style[prop] = `${newState.getComputedValue($el, prop)}`;
            }
          });
        }, newNode.delay + newNode.duration / 2);
      }

      if (animatedSwap.length) {
        const ease = parseEase(newState.nodes.get(animatedSwap[0].dataset.layoutId).ease);
        const inverseEased = t => 1 - ease(1 - t);
        const animatedSwapParams = /** @type {AnimationParams} */({});
        if (swapAtProps) {
          for (let prop in swapAtProps) {
            if (prop !== 'transform') {
              animatedSwapParams[prop] = [
                { from: (/** @type {HTMLElement} */$el) => oldState.getComputedValue($el, prop), to: swapAtProps[prop] },
                { from: swapAtProps[prop], to: (/** @type {HTMLElement} */$el) => newState.getComputedValue($el, prop), ease: inverseEased }
              ];
            }
          }
        }
        this.timeline.add(animatedSwap, animatedSwapParams, 0);
      }

    }

    const transformedLength = transformed.length;

    if (transformedLength) {
      // We only need to set the transform property here since translate is already defined in the targets loop
      for (let i = 0; i < transformedLength; i++) {
        const $el = transformed[i];
        const node = newState.getNode($el);
        // Don't set translate for inlined elements (to avoid text reflow)
        if (!node.isInlined) {
          $el.style.translate = `${oldState.getComputedValue($el, 'x')}px ${oldState.getComputedValue($el, 'y')}px`;
        }
        $el.style.transform = oldState.getComputedValue($el, 'transform');
        if (animatedSwap.includes($el)) {
          node.ease = getFunctionValue(swapAtParams.ease, $el, node.index, node.targets, null);
          node.duration = getFunctionValue(swapAtParams.duration, $el, node.index, node.targets, null);
        }
      }
      transformAnimation = this.transformAnimation = waapi.animate(transformed, {
        translate: (/** @type {HTMLElement} */$el) => {
          const node = newState.getNode($el);
          // Don't animate translate for inlined elements (to avoid text reflow)
          if (node.isInlined) return '0px 0px';
          return `${newState.getComputedValue($el, 'x')}px ${newState.getComputedValue($el, 'y')}px`;
        },
        transform: (/** @type {HTMLElement} */$el) => {
          const newValue = newState.getComputedValue($el, 'transform');
          if (!animatedSwap.includes($el)) return newValue;
          const oldValue = oldState.getComputedValue($el, 'transform');
          const node = newState.getNode($el);
          return [oldValue, getFunctionValue(swapAtProps.transform, $el, node.index, node.targets, null), newValue]
        },
        autoplay: false,
        // persist: true,
        ...timingParams,
      });
      this.timeline.sync(transformAnimation, 0);
    }

    return this.timeline.init();
  }

  /**
   * @param {(layout: this) => void} callback
   * @param {LayoutAnimationParams} [params]
   * @return {Timeline}
   */
  update(callback, params = {}) {
    this.record();
    callback(this);
    const editor = globals.editor;
    if (editor && editor.addLayoutTransition) return editor.addLayoutTransition(this, params, 'update', createLayoutTransitionBuilder(this));
    return this.animate(params);
  }
}

/**
 * @param {DOMTargetSelector} root
 * @param {AutoLayoutParams} [params]
 * @return {AutoLayout}
 */
const createLayout = (root, params) => {
  const editor = globals.editor;
  return editor && editor.addLayout ? editor.addLayout(root, params) : new AutoLayout(root, params);
};

// Chain-able utilities

const numberUtils = numberImports; // Needed to keep the import when bundling

const chainables = {};

/**
 * @callback UtilityFunction
 * @param {...*} args
 * @return {Number|String}
 *
 * @param {UtilityFunction} fn
 * @param {Number} [last=0]
 * @return {function(...(Number|String)): function(Number|String): (Number|String)}
 */
const curry = (fn, last = 0) => (...args) => last ? v => fn(...args, v) : v => fn(v, ...args);

/**
 * @param {Function} fn
 * @return {function(...(Number|String))}
 */
const chain = fn => {
   return (...args) => {
    const result = fn(...args);
    return new Proxy(noop, {
      apply: (_, __, [v]) => result(v),
      get: (_, prop) => {
        if (!chainables[prop]) return undefined;
        return chain(/**@param {...Number|String} nextArgs */(...nextArgs) => {
          const nextResult = chainables[prop](...nextArgs);
          return (/**@type {Number|String} */v) => nextResult(result(v));
        })
      }
    });
  }
};

/**
 * @param {UtilityFunction} fn
 * @param {String} name
 * @param {Number} [right]
 * @return {function(...(Number|String)): UtilityFunction}
 */
const makeChainable = (name, fn, right = 0) => {
  const chained = (...args) => (args.length < fn.length ? chain(curry(fn, right)) : fn)(...args);
  if (!chainables[name]) chainables[name] = chained;
  return chained;
};

/**
 * @typedef {Object} ChainablesMap
 * @property {ChainedClamp} clamp
 * @property {ChainedRound} round
 * @property {ChainedSnap} snap
 * @property {ChainedWrap} wrap
 * @property {ChainedLerp} lerp
 * @property {ChainedDamp} damp
 * @property {ChainedMapRange} mapRange
 * @property {ChainedRoundPad} roundPad
 * @property {ChainedPadStart} padStart
 * @property {ChainedPadEnd} padEnd
 * @property {ChainedDegToRad} degToRad
 * @property {ChainedRadToDeg} radToDeg
 */

/**
 * @callback ChainedUtilsResult
 * @param {Number} value - The value to process through the chained operations
 * @return {Number} The processed result
 */

/**
 * @typedef {ChainablesMap & ChainedUtilsResult} ChainableUtil
 */

// Chainable

/**
 * @callback ChainedRoundPad
 * @param {Number} decimalLength - Number of decimal places
 * @return {ChainableUtil}
 */
const roundPad = /** @type {typeof numberUtils.roundPad & ChainedRoundPad} */(makeChainable('roundPad', numberUtils.roundPad));

/**
 * @callback ChainedPadStart
 * @param {Number} totalLength - Target length
 * @param {String} padString - String to pad with
 * @return {ChainableUtil}
 */
const padStart = /** @type {typeof numberUtils.padStart & ChainedPadStart} */(makeChainable('padStart', numberUtils.padStart));

/**
 * @callback ChainedPadEnd
 * @param {Number} totalLength - Target length
 * @param {String} padString - String to pad with
 * @return {ChainableUtil}
 */
const padEnd = /** @type {typeof numberUtils.padEnd & ChainedPadEnd} */(makeChainable('padEnd', numberUtils.padEnd));

/**
 * @callback ChainedWrap
 * @param {Number} min - Minimum boundary
 * @param {Number} max - Maximum boundary
 * @return {ChainableUtil}
 */
const wrap = /** @type {typeof numberUtils.wrap & ChainedWrap} */(makeChainable('wrap', numberUtils.wrap));

/**
 * @callback ChainedMapRange
 * @param {Number} inLow - Input range minimum
 * @param {Number} inHigh - Input range maximum
 * @param {Number} outLow - Output range minimum
 * @param {Number} outHigh - Output range maximum
 * @return {ChainableUtil}
 */
const mapRange = /** @type {typeof numberUtils.mapRange & ChainedMapRange} */(makeChainable('mapRange', numberUtils.mapRange));

/**
 * @callback ChainedDegToRad
 * @return {ChainableUtil}
 */
const degToRad = /** @type {typeof numberUtils.degToRad & ChainedDegToRad} */(makeChainable('degToRad', numberUtils.degToRad));

/**
 * @callback ChainedRadToDeg
 * @return {ChainableUtil}
 */
const radToDeg = /** @type {typeof numberUtils.radToDeg & ChainedRadToDeg} */(makeChainable('radToDeg', numberUtils.radToDeg));

/**
 * @callback ChainedSnap
 * @param {Number|Array<Number>} increment - Step size or array of snap points
 * @return {ChainableUtil}
 */
const snap = /** @type {typeof numberUtils.snap & ChainedSnap} */(makeChainable('snap', numberUtils.snap));

/**
 * @callback ChainedClamp
 * @param {Number} min - Minimum boundary
 * @param {Number} max - Maximum boundary
 * @return {ChainableUtil}
 */
const clamp = /** @type {typeof numberUtils.clamp & ChainedClamp} */(makeChainable('clamp', numberUtils.clamp));

/**
 * @callback ChainedRound
 * @param {Number} decimalLength - Number of decimal places
 * @return {ChainableUtil}
 */
const round = /** @type {typeof numberUtils.round & ChainedRound} */(makeChainable('round', numberUtils.round));

/**
 * @callback ChainedLerp
 * @param {Number} start - Starting value
 * @param {Number} end - Ending value
 * @return {ChainableUtil}
 */
const lerp = /** @type {typeof numberUtils.lerp & ChainedLerp} */(makeChainable('lerp', numberUtils.lerp, 1));

/**
 * @callback ChainedDamp
 * @param {Number} start - Starting value
 * @param {Number} end - Target value
 * @param {Number} deltaTime - Delta time in ms
 * @return {ChainableUtil}
 */
const damp = /** @type {typeof numberUtils.damp & ChainedDamp} */(makeChainable('damp', numberUtils.damp, 1));

/**
 * @typedef {Object} RandomParams
 * @property {Number} [min]
 * @property {Number} [max]
 * @property {Number} [decimals]
 * @property {Number|false} [seed] A number seeds a deterministic sequence, false or omitted is unseeded.
 * @property {Boolean} [perTarget] When true the call returns a generator anime invokes once per target.
 */

/**
 * A 2-arg numeric RNG, the form randomPick and shuffle call.
 * @callback RandomFunction
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 */

let _seed = 0;

/**
 * Generates a random number between min and max (inclusive) with optional decimal precision.
 * @param  {Number} [min=0]
 * @param  {Number} [max=1]
 * @param  {Number} [decimalLength=0]
 * @return {Number}
 */
const randomNumber = (min = 0, max = 1, decimalLength = 0) => {
  const m = 10 ** decimalLength;
  return Math.floor((Math.random() * (max - min + (1 / m)) + min) * m) / m;
};

/**
 * Creates a seeded pseudorandom generator with the same API as random. Positional args draw a number,
 * a params object draws a number, or a per target generator with perTarget. min, max and decimals can
 * be overridden per call.
 *
 * @param  {Number} [seed] The seed value, undefined advances a shared counter.
 * @param  {Number} [seededMin=0] Default minimum of the returned generator.
 * @param  {Number} [seededMax=1] Default maximum of the returned generator.
 * @param  {Number} [seededDecimalLength=0] Default decimal places of the returned generator.
 */
const createSeededRandom = (seed, seededMin = 0, seededMax = 1, seededDecimalLength = 0) => {
  let t = seed === undefined ? _seed++ : seed;
  const draw = (min, max, decimalLength) => {
    t += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    const m = 10 ** decimalLength;
    return Math.floor(((((t ^ t >>> 14) >>> 0) / 4294967296) * (max - min + (1 / m)) + min) * m) / m;
  };
  /**
   * @overload
   * @param {Number} [min]
   * @param {Number} [max]
   * @param {Number} [decimalLength]
   * @return {Number}
   *
   * @overload
   * @param {RandomParams & {
   *   perTarget: true,
   * }} opts
   * @return {() => Number}
   *
   * @overload
   * @param {RandomParams & {
   *   perTarget?: false,
   * }} opts
   * @return {Number}
   *
   * @overload
   * @param {RandomParams} opts
   * @return {Number | (() => Number)}
   *
   * @param {Number|RandomParams} [minOrOpts]
   * @param {Number} [max]
   * @param {Number} [decimalLength]
   * @return {Number | (() => Number)}
   */
  function rng(minOrOpts = seededMin, max = seededMax, decimalLength = seededDecimalLength) {
    if (minOrOpts !== null && typeof minOrOpts === 'object') {
      const opts = minOrOpts;
      const optsMin = opts.min == null ? seededMin : opts.min;
      const optsMax = opts.max == null ? seededMax : opts.max;
      const optsDecimals = opts.decimals == null ? seededDecimalLength : opts.decimals;
      return opts.perTarget ? () => draw(optsMin, optsMax, optsDecimals) : draw(optsMin, optsMax, optsDecimals);
    }
    return draw(minOrOpts, max, decimalLength);
  }
  return rng;
};

/**
 * Creates the per draw generator for a params object, seeded when seed is a number, unseeded otherwise.
 * @param  {RandomParams} opts
 * @return {() => Number}
 */
const createRandomGenerator = (opts) => {
  const min = opts.min == null ? 0 : opts.min;
  const max = opts.max == null ? 1 : opts.max;
  const decimals = opts.decimals == null ? 0 : opts.decimals;
  if (opts.seed === undefined || opts.seed === false) return () => randomNumber(min, max, decimals);
  const rng = createSeededRandom(/** @type {Number} */(opts.seed), min, max, decimals);
  return () => /** @type {Number} */(rng());
};

/**
 * Draws one value, or returns a per target generator when perTarget is set.
 * @param {RandomParams} opts
 */
const resolveRandomFromOpts = (opts) => {
  const generator = createRandomGenerator(opts);
  return opts.perTarget ? generator : generator();
};

const randomTweakable = makeTweakable('Random', 'random', resolveRandomFromOpts);

/**
 * Generates a random number between min and max (inclusive) with optional decimal precision. Passing a
 * params object instead of positional args returns a value shared across targets, or a per target
 * generator when perTarget is true.
 *
 * @overload
 * @param {Number} [min]
 * @param {Number} [max]
 * @param {Number} [decimalLength]
 * @return {Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget: true,
 * }} opts
 * @return {() => Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget?: false,
 * }} opts
 * @return {Number}
 *
 * @overload
 * @param {RandomParams} opts
 * @return {Number | (() => Number)}
 *
 * @param  {Number|RandomParams} [min=0] The minimum value, or a params object.
 * @param  {Number} [max=1] The maximum value, inclusive.
 * @param  {Number} [decimalLength=0] Number of decimal places to round to.
 * @return {Number | (() => Number)} A number, or a per target generator.
 */
function random(min = 0, max = 1, decimalLength = 0) {
  if (min !== null && typeof min === 'object') return randomTweakable(/** @type {RandomParams} */(min));
  return randomNumber(/** @type {Number} */(min), max, decimalLength);
}

/**
 * Picks a random element from an array or a string
 *
 * @template T
 * @overload
 * @param {readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {T}
 *
 * @overload
 * @param {String} items
 * @param {RandomFunction} [rnd]
 * @return {String}
 *
 * @template T
 * @overload
 * @param {String | readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {String | T}
 *
 * @template T
 * @param    {String | readonly T[]} items - The array or string to pick from
 * @param    {RandomFunction} [rng] - Optional RNG, defaults to random
 * @return   {String | T} A random element from the array or character from the string
 */
const randomPick = (items, rng = /** @type {RandomFunction} */(random)) => items[rng(0, items.length - 1)];

/**
 * Shuffles an array in-place using the Fisher-Yates algorithm
 * Adapted from https://bost.ocks.org/mike/shuffle/
 *
 * @param  {Array} items - The array to shuffle (will be modified in-place)
 * @param  {RandomFunction} [rng] - Optional RNG, defaults to random
 * @return {Array} The same array reference, now shuffled
 */
const shuffle = (items, rng = /** @type {RandomFunction} */(random)) => {
  let m = items.length, t, i;
  while (m) { i = rng(0, --m); t = items[m]; items[m] = items[i]; items[i] = t; }
  return items;
};





/**
 * @overload
 * @param {Number} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */

/**
 * @overload
 * @param {String} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */

/**
 * @overload
 * @param {[Number, Number]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */

/**
 * @overload
 * @param {[String, String]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */

/**
 * @param {Number|String|[Number, Number]|[String, String]} val The staggered value or range
 * @param {StaggerParams} [params] The stagger parameters
 * @return {StaggerFunction<Number|String>}
 */
const staggerFactory = (val, params = {}) => {
  let values = [];
  let maxValue = 0;
  let cachedOffset;
  let jitterSamples = null;
  const from = params.from;
  const reversed = params.reversed;
  const ease = params.ease;
  const hasEasing = !isUnd(ease);
  const hasSpring = hasEasing && !isUnd(/** @type {Spring} */(ease).ease);
  const staggerEase = hasSpring ? /** @type {Spring} */(ease).ease : hasEasing ? parseEase(ease) : null;
  const grid = params.grid;
  const autoGrid = grid === true;
  const axis = params.axis;
  const customTotal = params.total;
  const fromFirst = isUnd(from) || from === 0 || from === 'first';
  const fromCenter = from === 'center';
  const fromLast = from === 'last';
  const fromRandom = from === 'random';
  const fromArr = isArr(from);
  const isRange = isArr(val);
  const useProp = params.use;
  const val1 = isRange ? parseNumber(val[0]) : parseNumber(val);
  const val2 = isRange ? parseNumber(val[1]) : 0;
  const timelineRangeOffset = isRange && val1 > val2 ? val1 - val2 : 0;
  const unitMatch = unitsExecRgx.exec((isRange ? val[1] : val) + emptyString);
  const start = params.start || 0 + (isRange ? val1 : 0);
  const seed = params.seed;
  const hasSeed = !isUnd(seed) && seed !== false;
  const rng = hasSeed ? createSeededRandom(seed === true ? 0 : /** @type {Number} */(seed)) : random;
  const jitter = params.jitter;
  const hasJitter = !isUnd(jitter);
  const jitterIsArr = isArr(jitter);
  const jitterStart = jitterIsArr ? /** @type {[Number,Number]} */(jitter)[0] : /** @type {Number} */(jitter) || 0;
  const jitterEnd = jitterIsArr ? /** @type {[Number,Number]} */(jitter)[1] : /** @type {Number} */(jitter) || 0;
  let fromIndex = fromFirst ? 0 : isNum(from) ? from : 0;
  return (target, i, t, _, tl) => {
    const [ registeredTarget ] = registerTargets(target);
    const total = isUnd(customTotal) ? t.length : customTotal;
    const customIndex = !isUnd(useProp) ? isFnc(useProp) ? useProp(registeredTarget, i, total) : getOriginalAnimatableValue(registeredTarget, useProp) : false;
    const resolvedIndex = isNum(customIndex) || isStr(customIndex) && isNum(+customIndex) ? +customIndex : i;
    // Fall back to i when resolvedIndex is outside total so values never reads undefined.
    const staggerIndex = resolvedIndex >= 0 && resolvedIndex < total ? resolvedIndex : i;
    if (fromCenter) fromIndex = (total - 1) / 2;
    if (fromLast) fromIndex = total - 1;
    if (!values.length) {
      if (autoGrid) {
        let hasPositions = true;
        let has3D = false;
        let minPosX = Infinity;
        let minPosY = Infinity;
        let minPosZ = Infinity;
        let maxPosX = -Infinity;
        let maxPosY = -Infinity;
        let maxPosZ = -Infinity;
        const pxArr = [];
        const pyArr = [];
        const pzArr = [];
        for (let index = 0; index < total; index++) {
          const el = t[index];
          let px = 0;
          let py = 0;
          let pz = 0;
          let found = false;
          if (el && isFnc(el.getBoundingClientRect)) {
            const rect = el.getBoundingClientRect();
            px = rect.left + rect.width / 2;
            py = rect.top + rect.height / 2;
            found = true;
          } else {
            const obj = /** @type {JSTarget} */(el);
            if (obj && isNum(obj.x) && isNum(obj.y)) {
              px = obj.x;
              py = obj.y;
              if (isNum(obj.z)) {
                pz = obj.z;
                has3D = true;
              }
              found = true;
            }
          }
          if (!found) {
            hasPositions = false;
            break;
          }
          pxArr.push(px);
          pyArr.push(py);
          pzArr.push(pz);
          if (px < minPosX) minPosX = px;
          if (py < minPosY) minPosY = py;
          if (pz < minPosZ) minPosZ = pz;
          if (px > maxPosX) maxPosX = px;
          if (py > maxPosY) maxPosY = py;
          if (pz > maxPosZ) maxPosZ = pz;
        }
        if (hasPositions) {
          let fX = pxArr[0];
          let fY = pyArr[0];
          let fZ = pzArr[0];
          if (fromArr) {
            fX = minPosX + from[0] * (maxPosX - minPosX);
            fY = minPosY + from[1] * (maxPosY - minPosY);
            fZ = has3D ? minPosZ + (from.length >= 3 ? from[2] : .5) * (maxPosZ - minPosZ) : 0;
          } else if (fromCenter) {
            fX = (minPosX + maxPosX) / 2;
            fY = (minPosY + maxPosY) / 2;
            fZ = (minPosZ + maxPosZ) / 2;
          } else if (fromLast) {
            fX = pxArr[total - 1];
            fY = pyArr[total - 1];
            fZ = pzArr[total - 1];
          } else if (isNum(from)) {
            fX = pxArr[from];
            fY = pyArr[from];
            fZ = pzArr[from];
          }
          for (let index = 0; index < total; index++) {
            const distanceX = fX - pxArr[index];
            const distanceY = fY - pyArr[index];
            const distanceZ = fZ - pzArr[index];
            let value = sqrt(distanceX * distanceX + distanceY * distanceY + (has3D ? distanceZ * distanceZ : 0));
            if (axis === 'x') value = -distanceX;
            if (axis === 'y') value = -distanceY;
            if (axis === 'z') value = -distanceZ;
            values.push(value);
          }
          let minDist = Infinity;
          for (let index = 0; index < total; index++) {
            const absVal = abs(values[index]);
            if (absVal > 0 && absVal < minDist) minDist = absVal;
          }
          if (minDist > 0 && minDist < Infinity) {
            for (let index = 0; index < total; index++) {
              values[index] = values[index] / minDist;
            }
          }
        } else {
          for (let index = 0; index < total; index++) {
            values.push(abs(fromIndex - index));
          }
        }
      } else {
        for (let index = 0; index < total; index++) {
          if (!grid) {
            values.push(abs(fromIndex - index));
          } else {
            const is3D = grid.length === 3;
            const layerSize = grid[0] * grid[1];
            let fromX, fromY, fromZ;
            if (fromArr) {
              fromX = from[0] * (grid[0] - 1);
              fromY = from[1] * (grid[1] - 1);
              fromZ = is3D ? (from.length >= 3 ? from[2] : .5) * (grid[2] - 1) : 0;
            } else if (fromCenter) {
              fromX = (grid[0] - 1) / 2;
              fromY = (grid[1] - 1) / 2;
              fromZ = is3D ? (grid[2] - 1) / 2 : 0;
            } else {
              fromX = fromIndex % grid[0];
              fromY = floor(fromIndex / grid[0]) % grid[1];
              fromZ = is3D ? floor(fromIndex / layerSize) : 0;
            }
            const toX = index % grid[0];
            const toY = floor(index / grid[0]) % grid[1];
            const toZ = is3D ? floor(index / layerSize) : 0;
            const distanceX = fromX - toX;
            const distanceY = fromY - toY;
            const distanceZ = fromZ - toZ;
            let value = sqrt(distanceX * distanceX + distanceY * distanceY + (is3D ? distanceZ * distanceZ : 0));
            if (axis === 'x') value = -distanceX;
            if (axis === 'y') value = -distanceY;
            if (axis === 'z') value = -distanceZ;
            values.push(value);
          }
        }
      }
      maxValue = values[0];
      for (let k = 1; k < total; k++) if (values[k] > maxValue) maxValue = values[k];
      if (staggerEase || reversed) {
        for (let k = 0; k < total; k++) {
          let v = values[k];
          if (staggerEase) v = staggerEase(v / maxValue) * maxValue;
          if (reversed) v = axis ? -v : abs(maxValue - v);
          values[k] = v;
        }
      }
      if (hasJitter) {
        jitterSamples = new Array(total);
        for (let k = 0; k < total; k++) jitterSamples[k] = rng(-1, 1, 4);
      }
      if (fromRandom) values = shuffle(values, rng);
    }
    const spacing = isRange ? (val2 - val1) / maxValue : val1;
    if (isUnd(cachedOffset)) {
      cachedOffset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl.iterationDuration + timelineRangeOffset : start) : /** @type {Number} */(start);
    }
    /** @type {String|Number} */
    let output = cachedOffset + ((spacing * round$1(values[staggerIndex], 2)) || 0);
    if (hasJitter) {
      const progress = maxValue ? values[staggerIndex] / maxValue : 0;
      const jitterMagnitude = jitterStart + (jitterEnd - jitterStart) * progress;
      output = /** @type {Number} */(output) + jitterSamples[staggerIndex] * jitterMagnitude;
    }
    if (params.modifier) output = params.modifier(/** @type {Number} */(output));
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  }
};

/** Creates a stagger function that distributes a value across the targets of an animation. */
const stagger = /** @type {typeof staggerFactory} */(makeTweakable('Stagger', 'stagger', staggerFactory));

var index$2 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $: registerTargets,
  addChild: addChild,
  clamp: clamp,
  cleanInlineStyles: cleanInlineStyles,
  createSeededRandom: createSeededRandom,
  damp: damp,
  degToRad: degToRad,
  forEachChildren: forEachChildren,
  get: get,
  keepTime: keepTime,
  lerp: lerp,
  mapRange: mapRange,
  padEnd: padEnd,
  padStart: padStart,
  parseColor: convertColorStringValuesToRgbaArray,
  radToDeg: radToDeg,
  random: random,
  randomPick: randomPick,
  remove: remove,
  removeChild: removeChild,
  round: round,
  roundPad: roundPad,
  set: set,
  shuffle: shuffle,
  snap: snap,
  stagger: stagger,
  sync: sync,
  wrap: wrap
});



/**
 * @param  {TargetsParam} path
 * @return {SVGGeometryElement|void}
 */
const getPath = path => {
  const parsedTargets = parseTargets(path);
  const $parsedSvg = /** @type {SVGGeometryElement} */(parsedTargets[0]);
  if (!$parsedSvg || !isSvg($parsedSvg)) return console.warn(`${path} is not a valid SVGGeometryElement`);
  return $parsedSvg;
};



// Motion path animation

/**
 * @param {SVGGeometryElement} $path
 * @param {Number} totalLength
 * @param {Number} progress
 * @param {Number} lookup
 * @param {Boolean} shouldClamp
 * @return {DOMPoint}
 */
const getPathPoint = ($path, totalLength, progress, lookup, shouldClamp) => {
  const point = progress + lookup;
  const pointOnPath = shouldClamp
    ? Math.max(0, Math.min(point, totalLength)) // Clamp between 0 and totalLength
    : (point % totalLength + totalLength) % totalLength; // Wrap around
  return $path.getPointAtLength(pointOnPath);
};

/**
 * @param {SVGGeometryElement} $path
 * @param {String} pathProperty
 * @param {Number} [offset=0]
 * @return {FunctionValue}
 */
const getPathProgess = ($path, pathProperty, offset = 0) => {
  return $el => {
    const totalLength = +($path.getTotalLength());
    const inSvg = $el[isSvgSymbol];
    const ctm = $path.getCTM();
    const shouldClamp = offset === 0;
    /** @type {TweenObjectValue} */
    return {
      from: 0,
      to: totalLength,
      /** @type {TweenModifier} */
      modifier: progress => {
        const offsetLength = offset * totalLength;
        const newProgress = progress + offsetLength;
        if (pathProperty === 'a') {
          const p0 = getPathPoint($path, totalLength, newProgress, -1, shouldClamp);
          const p1 = getPathPoint($path, totalLength, newProgress, 1, shouldClamp);
          return atan2(p1.y - p0.y, p1.x - p0.x) * 180 / PI;
        } else {
          const p = getPathPoint($path, totalLength, newProgress, 0, shouldClamp);
          return pathProperty === 'x' ?
            inSvg || !ctm ? p.x : p.x * ctm.a + p.y * ctm.c + ctm.e :
            inSvg || !ctm ? p.y : p.x * ctm.b + p.y * ctm.d + ctm.f
        }
      }
    }
  }
};

/**
 * @param {TargetsParam} path
 * @param {Number} [offset=0]
 */
const createMotionPath = (path, offset = 0) => {
  const $path = getPath(path);
  if (!$path) return;
  return {
    translateX: getPathProgess($path, 'x', offset),
    translateY: getPathProgess($path, 'y', offset),
    rotate: getPathProgess($path, 'a', offset),
  }
};



/**
 * @param {SVGGeometryElement} [$el]
 * @return {Number}
 */
const getScaleFactor = $el => {
  let scaleFactor = 1;
  if ($el && $el.getCTM) {
    const ctm = $el.getCTM();
    if (ctm) {
      const scaleX = sqrt(ctm.a * ctm.a + ctm.b * ctm.b);
      const scaleY = sqrt(ctm.c * ctm.c + ctm.d * ctm.d);
      scaleFactor = (scaleX + scaleY) / 2;
    }
  }
  return scaleFactor;
};

/**
 * Creates a proxy that wraps an SVGGeometryElement and adds drawing functionality.
 * @param {SVGGeometryElement} $el - The SVG element to transform into a drawable
 * @param {number} start - Starting position (0-1)
 * @param {number} end - Ending position (0-1)
 * @return {DrawableSVGGeometry} - Returns a proxy that preserves the original element's type with additional 'draw' attribute functionality
 */
const createDrawableProxy = ($el, start, end) => {
  const pathLength = K;
  const computedStyles = getComputedStyle($el);
  const strokeLineCap = computedStyles.strokeLinecap;
  // @ts-ignore
  const $scalled = computedStyles.vectorEffect === 'non-scaling-stroke' ? $el : null;
  let currentCap = strokeLineCap;

  const proxy = new Proxy($el, {
    get(target, property) {
      const value = target[property];
      if (property === proxyTargetSymbol) return target;
      if (property === 'setAttribute') {
        return (...args) => {
          if (args[0] === 'draw') {
            const value = args[1];
            const values = value.split(' ');
            const v1 = +values[0];
            const v2 = +values[1];
            // TOTO: Benchmark if performing two slices is more performant than one split
            // const spaceIndex = value.indexOf(' ');
            // const v1 = round(+value.slice(0, spaceIndex), precision);
            // const v2 = round(+value.slice(spaceIndex + 1), precision);
            const scaleFactor = getScaleFactor($scalled);
            const os = v1 * -pathLength * scaleFactor;
            const d1 = (v2 * pathLength * scaleFactor) + os;
            const d2 = (pathLength * scaleFactor +
                      ((v1 === 0 && v2 === 1) || (v1 === 1 && v2 === 0) ? 0 : 10 * scaleFactor) - d1);
            if (strokeLineCap !== 'butt') {
              const newCap = v1 === v2 ? 'butt' : strokeLineCap;
              if (currentCap !== newCap) {
                target.style.strokeLinecap = `${newCap}`;
                currentCap = newCap;
              }
            }
            target.setAttribute('stroke-dashoffset', `${os}`);
            target.setAttribute('stroke-dasharray', `${d1} ${d2}`);
          }
          return Reflect.apply(value, target, args);
        };
      }

      if (isFnc(value)) {
        return (...args) => Reflect.apply(value, target, args);
      } else {
        return value;
      }
    }
  });

  if ($el.getAttribute('pathLength') !== `${pathLength}`) {
    $el.setAttribute('pathLength', `${pathLength}`);
    proxy.setAttribute('draw', `${start} ${end}`);
  }

  return /** @type {DrawableSVGGeometry} */(proxy);
};

/**
 * Creates drawable proxies for multiple SVG elements.
 * @param {TargetsParam} selector - CSS selector, SVG element, or array of elements and selectors
 * @param {number} [start=0] - Starting position (0-1)
 * @param {number} [end=0] - Ending position (0-1)
 * @return {Array<DrawableSVGGeometry>} - Array of proxied elements with drawing functionality
 */
const createDrawable = (selector, start = 0, end = 0) => {
  const els = parseTargets(selector);
  return els.map($el => createDrawableProxy(
    /** @type {SVGGeometryElement} */($el),
    start,
    end
  ));
};



/**
 * @param  {TargetsParam} path2
 * @param  {Number} [precision]
 * @return {FunctionValue}
 */
const morphTo = (path2, precision = .33) => ($path1, index, total, prevTween) => {
  const tagName1 = ($path1.tagName || '').toLowerCase();
  if (!tagName1.match(/^(path|polygon|polyline)$/)) {
    throw new Error(`Can't morph a <${$path1.tagName}> SVG element. Use <path>, <polygon> or <polyline>.`);
  }
  const $path2 = /** @type {SVGGeometryElement} */(getPath(path2));
  if (!$path2) {
    throw new Error("Can't morph to an invalid target. 'path2' must resolve to an existing <path>, <polygon> or <polyline> SVG element.");
  }
  const tagName2 = ($path2.tagName || '').toLowerCase();
  if (!tagName2.match(/^(path|polygon|polyline)$/)) {
    throw new Error(`Can't morph a <${$path2.tagName}> SVG element. Use <path>, <polygon> or <polyline>.`);
  }
  const isPath = $path1.tagName === 'path';
  const separator = isPath ? ' ' : ',';
  const previousPoints = prevTween ? prevTween._value : null;
  if (previousPoints) $path1.setAttribute(isPath ? 'd' : 'points', previousPoints);

  let v1 = '', v2 = '';

  if (!precision) {
    v1 = $path1.getAttribute(isPath ? 'd' : 'points');
    v2 = $path2.getAttribute(isPath ? 'd' : 'points');
  } else {
    const length1 = /** @type {SVGGeometryElement} */($path1).getTotalLength();
    const length2 = $path2.getTotalLength();
    const maxPoints = Math.max(Math.ceil(length1 * precision), Math.ceil(length2 * precision));
    for (let i = 0; i < maxPoints; i++) {
      const t = i / (maxPoints - 1);
      const pointOnPath1 = /** @type {SVGGeometryElement} */($path1).getPointAtLength(length1 * t);
      const pointOnPath2 = $path2.getPointAtLength(length2 * t);
      const prefix = isPath ? (i === 0 ? 'M' : 'L') : '';
      v1 += prefix + round$1(pointOnPath1.x, 3) + separator + pointOnPath1.y + ' ';
      v2 += prefix + round$1(pointOnPath2.x, 3) + separator + pointOnPath2.y + ' ';
    }
  }

  return [v1, v2];
};

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  createDrawable: createDrawable,
  createMotionPath: createMotionPath,
  morphTo: morphTo
});



const segmenter = (typeof Intl !== 'undefined') && Intl.Segmenter;
const valueRgx = /\{value\}/g;
const indexRgx = /\{i\}/g;
const whiteSpaceGroupRgx = /(\s+)/;
const whiteSpaceRgx = /^\s+$/;
const lineType = 'line';
const wordType = 'word';
const charType = 'char';
const dataLine = `data-line`;

/**
 * @typedef {Object} Segment
 * @property {String} segment
 * @property {Boolean} [isWordLike]
 */

/**
 * @typedef {Object} Segmenter
 * @property {function(String): Iterable<Segment>} segment
 */

/** @type {Segmenter} */
let wordSegmenter = null;
/** @type {Segmenter} */
let graphemeSegmenter = null;
let $splitTemplate = null;

/**
 * @param  {Segment} seg
 * @return {Boolean}
 */
const isSegmentWordLike = seg => {
  return seg.isWordLike ||
         seg.segment === ' ' || // Consider spaces as words first, then handle them diffrently later
         isNum(+seg.segment);   // Safari doesn't considers numbers as words
};

/**
 * @param {HTMLElement} $el
 */
const setAriaHidden = $el => $el.setAttribute('aria-hidden', 'true');

/**
 * @param {DOMTarget} $el
 * @param {String} type
 * @return {Array<HTMLElement>}
 */
const getAllTopLevelElements = ($el, type) => [.../** @type {*} */($el.querySelectorAll(`[data-${type}]:not([data-${type}] [data-${type}])`))];

const debugColors = { line: '#00D672', word: '#FF4B4B', char: '#5A87FF' };

/**
 * @param {HTMLElement} $el
 */
const filterEmptyElements = $el => {
  if (!$el.childElementCount && !$el.textContent.trim()) {
    const $parent = $el.parentElement;
    $el.remove();
    if ($parent) filterEmptyElements($parent);
  }
};

/**
 * @param {HTMLElement} $el
 * @param {Number} lineIndex
 * @param {Set<HTMLElement|Node>} bin
 * @returns {Set<HTMLElement|Node>}
 */
const filterLineElements = ($el, lineIndex, bin) => {
  const dataLineAttr = $el.getAttribute(dataLine);
  if (dataLineAttr !== null && +dataLineAttr !== lineIndex || $el.tagName === 'BR') {
    bin.add($el);
    // Also remove adjacent whitespace-only text nodes
    const prev = $el.previousSibling;
    const next = $el.nextSibling;
    if (prev && prev.nodeType === 3 && whiteSpaceRgx.test(prev.textContent)) {
      bin.add(prev);
    }
    if (next && next.nodeType === 3 && whiteSpaceRgx.test(next.textContent)) {
      bin.add(next);
    }
  }
  let i = $el.childElementCount;
  while (i--) filterLineElements(/** @type {HTMLElement} */($el.children[i]), lineIndex, bin);
  return bin;
};

/**
 * @param  {'line'|'word'|'char'} type
 * @param  {SplitTemplateParams} params
 * @return {String}
 */
const generateTemplate = (type, params = {}) => {
  let template = ``;
  if (!params) params = {};
  const classString = isStr(params.class) ? ` class="${params.class}"` : '';
  const cloneType = setValue(params.clone, false);
  const wrapType = setValue(params.wrap, false);
  const overflow = wrapType ? wrapType === true ? 'clip' : wrapType : cloneType ? 'clip' : false;
  if (wrapType) template += `<span${overflow ? ` style="overflow:${overflow};"` : ''}>`;
  template += `<span${classString}${cloneType ? ` style="position:relative;"` : ''} data-${type}="{i}">`;
  if (cloneType) {
    const left = cloneType === 'left' ? '-100%' : cloneType === 'right' ? '100%' : '0';
    const top = cloneType === 'top' ? '-100%' : cloneType === 'bottom' ? '100%' : '0';
    template += `<span>{value}</span>`;
    template += `<span inert style="position:absolute;top:${top};left:${left};white-space:nowrap;">{value}</span>`;
  } else {
    template += `{value}`;
  }
  template += `</span>`;
  if (wrapType) template += `</span>`;
  return template;
};

/**
 * @param  {String|SplitFunctionValue} htmlTemplate
 * @param  {Array<HTMLElement>} store
 * @param  {Node|HTMLElement} node
 * @param  {DocumentFragment} $parentFragment
 * @param  {'line'|'word'|'char'} type
 * @param  {Boolean} debug
 * @param  {Number} lineIndex
 * @param  {Number} [wordIndex]
 * @param  {Number} [charIndex]
 * @return {HTMLElement}
 */
const processHTMLTemplate = (htmlTemplate, store, node, $parentFragment, type, debug, lineIndex, wordIndex, charIndex) => {
  const isLine = type === lineType;
  const isChar = type === charType;
  const className = `_${type}_`;
  const template = isFnc(htmlTemplate) ? htmlTemplate(node) : htmlTemplate;
  const displayStyle = isLine ? 'block' : 'inline-block';
  $splitTemplate.innerHTML = template
    .replace(valueRgx, `<i class="${className}"></i>`)
    .replace(indexRgx, `${isChar ? charIndex : isLine ? lineIndex : wordIndex}`);
  const $content = $splitTemplate.content;
  const $highestParent = /** @type {HTMLElement} */($content.firstElementChild);
  const $split = /** @type {HTMLElement} */($content.querySelector(`[data-${type}]`)) || $highestParent;
  const $replacables = /** @type {NodeListOf<HTMLElement>} */($content.querySelectorAll(`i.${className}`));
  const replacablesLength = $replacables.length;
  if (replacablesLength) {
    $highestParent.style.display = displayStyle;
    $split.style.display = displayStyle;
    $split.setAttribute(dataLine, `${lineIndex}`);
    if (!isLine) {
      $split.setAttribute('data-word', `${wordIndex}`);
      if (isChar) $split.setAttribute('data-char', `${charIndex}`);
    }
    let i = replacablesLength;
    while (i--) {
      const $replace = $replacables[i];
      const $closestParent = $replace.parentElement;
      $closestParent.style.display = displayStyle;
      if (isLine) {
        $closestParent.innerHTML = /** @type {HTMLElement} */(node).innerHTML;
      } else {
        $closestParent.replaceChild(node.cloneNode(true), $replace);
      }
    }
    store.push($split);
    $parentFragment.appendChild($content);
  } else {
    console.warn(`The expression "{value}" is missing from the provided template.`);
  }
  if (debug) $highestParent.style.outline = `1px dotted ${debugColors[type]}`;
  return $highestParent;
};

/**
 * A class that splits text into words and wraps them in span elements while preserving the original HTML structure.
 * @class
 */
class TextSplitter {
  /**
   * @param  {Element|NodeList|String|Array<Element>} target
   * @param  {TextSplitterParams} [parameters]
   */
  constructor(target, parameters = {}) {
    // Only init segmenters when needed
    if (!wordSegmenter) wordSegmenter = segmenter ? new segmenter([], { granularity: wordType }) : {
      segment: (text) => {
        const segments = [];
        const words = text.split(whiteSpaceGroupRgx);
        for (let i = 0, l = words.length; i < l; i++) {
          const segment = words[i];
          segments.push({
            segment,
            isWordLike: !whiteSpaceRgx.test(segment), // Consider non-whitespace as word-like
          });
        }
        return segments;
      }
    };
    if (!graphemeSegmenter) graphemeSegmenter = segmenter ? new segmenter([], { granularity: 'grapheme' }) : {
      segment: text => [...text].map(char => ({ segment: char }))
    };
    if (!$splitTemplate && isBrowser) $splitTemplate = doc.createElement('template');
    if (scope.current) scope.current.register(this);
    const { words, chars, lines, accessible, includeSpaces, debug } = parameters;
    const $target = /** @type {HTMLElement} */((target = isArr(target) ? target[0] : target) && /** @type {Node} */(target).nodeType ? target : (getNodeList(target) || [])[0]);
    const lineParams = lines === true ? {} : lines;
    const wordParams = words === true || isUnd(words) ? {} : words;
    const charParams = chars === true ? {} : chars;
    this.debug = setValue(debug, false);
    this.includeSpaces = setValue(includeSpaces, false);
    this.accessible = setValue(accessible, true);
    this.linesOnly = lineParams && (!wordParams && !charParams);
    /** @type {String|false|SplitFunctionValue} */
    this.lineTemplate = isObj(lineParams) ? generateTemplate(lineType, /** @type {SplitTemplateParams} */(lineParams)) : lineParams;
    /** @type {String|false|SplitFunctionValue} */
    this.wordTemplate = isObj(wordParams) || this.linesOnly ? generateTemplate(wordType, /** @type {SplitTemplateParams} */(wordParams)) : wordParams;
    /** @type {String|false|SplitFunctionValue} */
    this.charTemplate = isObj(charParams) ? generateTemplate(charType, /** @type {SplitTemplateParams} */(charParams)) : charParams;
    this.$target = $target;
    this.html = $target && $target.innerHTML;
    this.lines = [];
    this.words = [];
    this.chars = [];
    this.effects = [];
    this.effectsCleanups = [];
    this.cache = null;
    this.ready = false;
    this.width = 0;
    this.resizeTimeout = null;
    const handleSplit = () => this.html && (lineParams || wordParams || charParams) && this.split();
    // Make sure this is declared before calling handleSplit() in case revert() is called inside an effect callback
    this.resizeObserver = new ResizeObserver(() => {
      // Use a setTimeout instead of a Timer for better tree shaking
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        const currentWidth = /** @type {HTMLElement} */($target).offsetWidth;
        if (currentWidth === this.width) return;
        this.width = currentWidth;
        handleSplit();
      }, 150);
    });
    // Only declare the font ready promise when splitting by lines and not alreay split
    if (this.lineTemplate && !this.ready) {
      doc.fonts.ready.then(handleSplit);
    } else {
      handleSplit();
    }
    $target ? this.resizeObserver.observe($target) : console.warn('No Text Splitter target found.');
  }

  /**
   * @param  {(...args: any[]) => Tickable | (() => void) | void} effect
   * @return this
   */
  addEffect(effect) {
    if (!isFnc(effect)) { console.warn('Effect must return a function.'); return this; }
    const refreshableEffect = keepTime(effect);
    this.effects.push(refreshableEffect);
    if (this.ready) this.effectsCleanups[this.effects.length - 1] = refreshableEffect(this);
    return this;
  }

  revert() {
    clearTimeout(this.resizeTimeout);
    this.lines.length = this.words.length = this.chars.length = 0;
    this.resizeObserver.disconnect();
    // Make sure to revert the effects after disconnecting the resizeObserver to avoid triggering it in the process
    this.effectsCleanups.forEach(cleanup => isFnc(cleanup) ? cleanup(this) : cleanup.revert && cleanup.revert());
    this.$target.innerHTML = this.html;
    return this;
  }

  /**
   * Recursively processes a node and its children
   * @param {Node} node
   */
  splitNode(node) {
    const wordTemplate = this.wordTemplate;
    const charTemplate = this.charTemplate;
    const includeSpaces = this.includeSpaces;
    const debug = this.debug;
    const nodeType = node.nodeType;
    if (nodeType === 3) {
      const nodeText = node.nodeValue;
      // If the nodeText is only whitespace, leave it as is
      if (nodeText.trim()) {
        const tempWords = [];
        const words = this.words;
        const chars = this.chars;
        const wordSegments = wordSegmenter.segment(nodeText);
        const $wordsFragment = doc.createDocumentFragment();
        let prevSeg = null;
        for (const wordSegment of wordSegments) {
          const segment = wordSegment.segment;
          const isWordLike = isSegmentWordLike(wordSegment);
          // Determine if this segment should be a new word, first segment always becomes a new word
          if (!prevSeg || (isWordLike && (prevSeg && (isSegmentWordLike(prevSeg))))) {
            tempWords.push(segment);
          } else {
            // Only concatenate if both current and previous are non-word-like and don't contain spaces
            const lastWordIndex = tempWords.length - 1;
            const lastWord = tempWords[lastWordIndex];
            if (!whiteSpaceGroupRgx.test(lastWord) && !whiteSpaceGroupRgx.test(segment)) {
              tempWords[lastWordIndex] += segment;
            } else {
              tempWords.push(segment);
            }
          }
          prevSeg = wordSegment;
        }

        for (let i = 0, l = tempWords.length; i < l; i++) {
          const word = tempWords[i];
          if (!word.trim()) {
            // Preserve whitespace only if includeSpaces is false and if the current space is not the first node
            if (i && includeSpaces) continue;
            $wordsFragment.appendChild(doc.createTextNode(word));
          } else {
            const nextWord = tempWords[i + 1];
            const hasWordFollowingSpace = includeSpaces && nextWord && !nextWord.trim();
            const wordToProcess = word;
            const charSegments = charTemplate ? graphemeSegmenter.segment(wordToProcess) : null;
            const $charsFragment = charTemplate ? doc.createDocumentFragment() : doc.createTextNode(hasWordFollowingSpace ? word + '\xa0' : word);
            if (charTemplate) {
              const charSegmentsArray = [...charSegments];
              for (let j = 0, jl = charSegmentsArray.length; j < jl; j++) {
                const charSegment = charSegmentsArray[j];
                const isLastChar = j === jl - 1;
                // If this is the last character and includeSpaces is true with a following space, append the space
                const charText = isLastChar && hasWordFollowingSpace ? charSegment.segment + '\xa0' : charSegment.segment;
                const $charNode = doc.createTextNode(charText);
                processHTMLTemplate(charTemplate, chars, $charNode, /** @type {DocumentFragment} */($charsFragment), charType, debug, -1, words.length, chars.length);
              }
            }
            if (wordTemplate) {
              processHTMLTemplate(wordTemplate, words, $charsFragment, $wordsFragment, wordType, debug, -1, words.length, chars.length);
              // Chars elements must be re-parsed in the split() method if both words and chars are parsed
            } else if (charTemplate) {
              $wordsFragment.appendChild($charsFragment);
            } else {
              $wordsFragment.appendChild(doc.createTextNode(word));
            }
            // Skip the next iteration if we included a space
            if (hasWordFollowingSpace) i++;
          }
        }
        node.parentNode.replaceChild($wordsFragment, node);
      }
    } else if (nodeType === 1) {
      // Converting to an array is necessary to work around childNodes pottential mutation
      const childNodes = /** @type {Array<Node>} */([.../** @type {*} */(node.childNodes)]);
      for (let i = 0, l = childNodes.length; i < l; i++) this.splitNode(childNodes[i]);
    }
  }

  /**
   * @param {Boolean} clearCache
   * @return {this}
   */
  split(clearCache = false) {
    const $el = this.$target;
    const isCached = !!this.cache && !clearCache;
    const lineTemplate = this.lineTemplate;
    const wordTemplate = this.wordTemplate;
    const charTemplate = this.charTemplate;
    const fontsReady = doc.fonts.status !== 'loading';
    const canSplitLines = lineTemplate && fontsReady;
    this.ready = !lineTemplate || fontsReady;
    if (canSplitLines || clearCache) {
      // No need to revert effects animations here since it's already taken care by the refreshable
      this.effectsCleanups.forEach(cleanup => isFnc(cleanup) && cleanup(this));
    }
    if (!isCached) {
      if (clearCache) {
        $el.innerHTML = this.html;
        this.words.length = this.chars.length = 0;
      }
      this.splitNode($el);
      this.cache = $el.innerHTML;
    }
    if (canSplitLines) {
      if (isCached) $el.innerHTML = this.cache;
      this.lines.length = 0;
      if (wordTemplate) this.words = getAllTopLevelElements($el, wordType);
    }
    // Always reparse characters after a line reset or if both words and chars are activated
    if (charTemplate && (canSplitLines || wordTemplate)) {
      this.chars = getAllTopLevelElements($el, charType);
    }
    // Words are used when lines only and prioritized over chars
    const elementsArray = this.words.length ? this.words : this.chars;
    let y, linesCount = 0;
    for (let i = 0, l = elementsArray.length; i < l; i++) {
      const $el = elementsArray[i];
      const { top, height } = $el.getBoundingClientRect();
      if (!isUnd(y) && top - y > height * .5) linesCount++;
      $el.setAttribute(dataLine, `${linesCount}`);
      const nested = $el.querySelectorAll(`[${dataLine}]`);
      let c = nested.length;
      while (c--) nested[c].setAttribute(dataLine, `${linesCount}`);
      y = top;
    }
    if (canSplitLines) {
      const linesFragment = doc.createDocumentFragment();
      const parents = new Set();
      const clones = [];
      for (let lineIndex = 0; lineIndex < linesCount + 1; lineIndex++) {
        const $clone = /** @type {HTMLElement} */($el.cloneNode(true));
        filterLineElements($clone, lineIndex, new Set()).forEach($el => {
          const $parent = $el.parentNode;
          if ($parent) {
            if ($el.nodeType === 1) parents.add(/** @type {HTMLElement} */($parent));
            $parent.removeChild($el);
          }
        });
        clones.push($clone);
      }
      parents.forEach(filterEmptyElements);
      for (let cloneIndex = 0, clonesLength = clones.length; cloneIndex < clonesLength; cloneIndex++) {
        processHTMLTemplate(lineTemplate, this.lines, clones[cloneIndex], linesFragment, lineType, this.debug, cloneIndex);
      }
      $el.innerHTML = '';
      $el.appendChild(linesFragment);
      if (wordTemplate) this.words = getAllTopLevelElements($el, wordType);
      if (charTemplate) this.chars = getAllTopLevelElements($el, charType);
    }

    // Remove the word wrappers and clear the words array if lines split only
    if (this.linesOnly) {
      const words = this.words;
      let w = words.length;
      while (w--) {
        const $word = words[w];
        $word.replaceWith($word.textContent);
      }
      words.length = 0;
    }
    if (this.accessible && (canSplitLines || !isCached)) {
      const $accessible = doc.createElement('span');
      // Make the accessible element visually-hidden (https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html)
      $accessible.style.cssText = `position:absolute;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;white-space:nowrap;`;
      // $accessible.setAttribute('tabindex', '-1');
      $accessible.innerHTML = this.html;
      $el.insertBefore($accessible, $el.firstChild);
      this.lines.forEach(setAriaHidden);
      this.words.forEach(setAriaHidden);
      this.chars.forEach(setAriaHidden);
    }
    this.width = /** @type {HTMLElement} */($el).offsetWidth;
    if (canSplitLines || clearCache) {
      this.effects.forEach((effect, i) => this.effectsCleanups[i] = effect(this));
    }
    return this;
  }

  refresh() {
    this.split(true);
  }
}

/**
 * @param  {Element|NodeList|String|Array<Element>} target
 * @param  {TextSplitterParams} [parameters]
 * @return {TextSplitter}
 */
const splitText = (target, parameters) => new TextSplitter(target, parameters);

/**
 * @deprecated text.split() is deprecated, import splitText() directly, or text.splitText()
 *
 * @param  {HTMLElement|NodeList|String|Array<HTMLElement>} target
 * @param  {TextSplitterParams} [parameters]
 * @return {TextSplitter}
 */
const split = (target, parameters) => {
  console.warn('text.split() is deprecated, import splitText() directly, or text.splitText()');
  return new TextSplitter(target, parameters);
};



/**
 * @typedef {Object} ScrambleTextTween
 * @property {Number} from
 * @property {Number} to
 * @property {Number} duration
 * @property {Number} delay
 * @property {String} ease
 * @property {(v: Number) => String} modifier
 */

/**
 * '-' is the range operator; place it at the start or end of the string to use it as a literal (e.g. '-abc' or 'abc-')
 * @param {String} str
 * @return {String}
 */
const expandCharRanges = (str) => {
  let result = '';
  for (let i = 0, l = str.length; i < l; i++) {
    if (i + 2 < l && str[i + 1] === '-' && str.charCodeAt(i) < str.charCodeAt(i + 2)) {
      const start = str.charCodeAt(i);
      const end = str.charCodeAt(i + 2);
      for (let c = start; c <= end; c++) result += String.fromCharCode(c);
      i += 2;
    } else {
      result += str[i];
    }
  }
  return result;
};

const charSets = {
  lowercase: 'a-z',
  uppercase: 'A-Z',
  numbers: '0-9',
  symbols: '!%#_|*+=',
  braille: '⠀-⣿',
  blocks: '▀-▟',
  shades: '░-▓',
};

const originalTexts = new WeakMap();

/**
 * Returns a function-based tween value that scrambles the target's text content,
 * progressively revealing the original text.
 *
 * @param {ScrambleTextParams} [params]
 * @return {FunctionValue<ScrambleTextTween>}
 */
const scrambleText = (params = {}) => {
  if (!params) params = {};
  const charsParam = params.chars;
  const easeFn = parseEase(params.ease || 'linear');
  const text = params.text;
  const fromParam = params.from;
  const reversed = params.reversed || false;
  const perturbation = params.perturbation || 0;
  const cursorParam = params.cursor;
  const cursorChars = cursorParam === true ? '_'
                    : typeof cursorParam === 'number' ? String.fromCharCode(cursorParam)
                    : typeof cursorParam === 'string' ? cursorParam
                    : '';
  const cursorLen = cursorChars.length;
  const seed = params.seed || 0;
  const override = params.override !== undefined ? params.override : true;
  const revealRate = params.revealRate || 60;
  const interval = 1000 * globals.timeScale / revealRate;
  const settleDuration = params.settleDuration || 300 * globals.timeScale;
  const settleRate = params.settleRate || 30;
  const durationParam = params.duration;
  const revealDelayParam = params.revealDelay;
  const delayParam = params.delay;
  const onChange = params.onChange || noop;

  return (target, index, targets, prevTween) => {
    const rawChars = typeof charsParam === 'function' ? charsParam(target, index, targets) : (charsParam || 'a-zA-Z0-9!%#_');
    const characters = expandCharRanges(charSets[rawChars] || rawChars);
    const totalChars = characters.length - 1;
    const duration = typeof durationParam === 'function' ? durationParam(target, index, targets) : durationParam;
    const revealDelay = typeof revealDelayParam === 'function' ? revealDelayParam(target, index, targets) : (revealDelayParam || 0);
    const delay = typeof delayParam === 'function' ? delayParam(target, index, targets) : (delayParam || 0);
    const rng = seed ? createSeededRandom(seed) : createSeededRandom();
    if (!originalTexts.has(target)) originalTexts.set(target, target.textContent);
    const startingText = prevTween ? prevTween._value : target.textContent;
    const targetText = text !== undefined
                       ? (typeof text === 'function' ? text(target, index, targets) : text)
                       : prevTween ? prevTween._value
                       : originalTexts.get(target);
    const settledText = targetText === ' ' || targetText === '&nbsp;' ? ' ' : targetText;
    const startLength = startingText === ' ' ? 0 : startingText.length;
    const endLength = settledText.length;
    const overrideChars = override === true ? characters
                        : typeof override === 'string' && override.length > 0 ? expandCharRanges(charSets[/** @type {String} */(override)] || /** @type {String} */(override))
                        : null;
    const totalOverrideChars = overrideChars ? overrideChars.length - 1 : 0;
    // Space override uses &nbsp; so the browser doesn't collapse consecutive spaces in innerHTML
    const overrideChar = override === ' ' ? ' ' : null;
    // When starting from blank, only animate the target text length to avoid padding beyond it
    const animLength = override === '' ? endLength : Math.max(startLength, endLength);
    // Compute total duration from interval spacing and settle time, or use the explicit duration
    const animDuration = duration > 0 ? duration : (animLength - 1) * interval + settleDuration;
    const computedDuration = round$1((animDuration + revealDelay) / globals.timeScale, 0) * globals.timeScale;
    const revealDelayRatio = revealDelay > 0 ? round$1(revealDelay / computedDuration, 12) : 0;
    // Auto-resolve reveal direction: shrinking text reveals from right, growing from left
    const resolvedFrom = fromParam === undefined || fromParam === 'auto' ? (endLength < startLength ? 'right' : 'left') : fromParam;
    const charOrder = new Int32Array(animLength);
    if (resolvedFrom === 'random') {
      for (let i = 0; i < animLength; i++) charOrder[i] = i;
      for (let i = animLength - 1; i > 0; i--) {
        const j = rng(0, i);
        const t = charOrder[i]; charOrder[i] = charOrder[j]; charOrder[j] = t;
      }
    } else {
      const ref = resolvedFrom === 'right' ? (override === '' || !startLength ? animLength : startLength) - 1
                : resolvedFrom === 'center' ? ((override === '' || !startLength ? animLength : startLength) - 1) / 2
                : typeof resolvedFrom === 'number' ? resolvedFrom
                : 0;
      const abs = Math.abs;
      const indices = new Array(animLength);
      for (let i = 0; i < animLength; i++) indices[i] = i;
      indices.sort((a, b) => abs(a - ref) - abs(b - ref));
      for (let i = 0; i < animLength; i++) charOrder[indices[i]] = i;
    }
    if (reversed) {
      const last = animLength - 1;
      for (let i = 0; i < animLength; i++) charOrder[i] = last - charOrder[i];
    }
    // settleRatio is the fraction of the animation each character spends in the active scrambling zone
    const settleRatio = round$1(settleDuration / animDuration, 12);
    // settleSpacing is the time gap between consecutive characters entering the active zone
    const settleSpacing = round$1((1 - settleRatio) / animLength, 12);
    const cursorZone = cursorLen * settleSpacing;
    // stepRatio controls how often scramble characters refresh (based on settleRate)
    const stepRatio = round$1(1000 * globals.timeScale / (settleRate * computedDuration), 12);
    // Pre-compute per-character start and settle times
    const charStarts = new Float32Array(animLength);
    const charEnds = new Float32Array(animLength);
    const scale = perturbation > 0 ? perturbation * settleRatio : 0;
    for (let c = 0; c < animLength; c++) {
      const so = scale > 0 ? (rng(0, 2000) - 1000) / 1000 * scale : 0;
      const eo = scale > 0 ? (rng(0, 2000) - 1000) / 1000 * scale : 0;
      charStarts[c] = charOrder[c] * settleSpacing + so;
      charEnds[c] = Math.ceil((charStarts[c] + settleRatio + eo) / stepRatio) * stepRatio;
    }
    // When text shrinks with non-sequential from modes, delay target settle times past all extras
    if (endLength < animLength && resolvedFrom !== 'left' && resolvedFrom !== 'right' && resolvedFrom !== 'random') {
      let maxExtraEnd = 0;
      for (let c = endLength; c < animLength; c++) {
        if (charEnds[c] > maxExtraEnd) maxExtraEnd = charEnds[c];
      }
      const targets = new Array(endLength);
      for (let c = 0; c < endLength; c++) targets[c] = c;
      targets.sort((a, b) => charOrder[a] - charOrder[b]);
      const targetSpacing = (1 - maxExtraEnd) / endLength;
      for (let i = 0; i < endLength; i++) {
        const revealTime = maxExtraEnd + i * targetSpacing;
        if (revealTime > charEnds[targets[i]]) {
          charEnds[targets[i]] = revealTime;
        }
      }
    }
    // charCache holds the current scramble character for each position, refreshed at settleRate
    const charCache = new Array(animLength);
    for (let c = 0; c < animLength; c++) {
      charCache[c] = characters[rng(0, totalChars)];
    }
    // overrideCache holds scramble characters for the starting text (override: true or custom string)
    const overrideCache = overrideChars ? (overrideChars === characters ? charCache : new Array(animLength)) : null;
    if (overrideCache && overrideCache !== charCache) {
      for (let c = 0; c < animLength; c++) {
        overrideCache[c] = overrideChar || /** @type {String} */(overrideChars)[rng(0, overrideChars.length - 1)];
      }
    }
    // Build the initial display text based on override mode
    let fillStartText = startingText;
    if (!prevTween) {
      if (override === '') {
        fillStartText = '';
      } else if (overrideChars) {
        fillStartText = '';
        for (let c = 0; c < startLength; c++) {
          fillStartText += startingText[c] === ' ' ? ' ' : /** @type {Array<String>} */(overrideCache)[c];
        }
      }
    }

    let lastValue = -1;
    let lastStep = -1;
    let scrambled = '';
    const hasOverride = override !== '';
    const hasOverrideChars = !!overrideChars;
    const hasCursor = cursorLen > 0;

    return {
      from: 0,
      to: 1,
      duration: computedDuration,
      delay: delay,
      ease: 'linear',
      modifier: (v) => {
        if (v === lastValue) return scrambled;
        lastValue = v;
        if (delay > 0 && v <= 0) { scrambled = startingText; return startingText; }
        if (v <= 0) { scrambled = fillStartText; return fillStartText; }
        if (v >= 1) { scrambled = settledText; return settledText; }
        scrambled = '';
        // Only refresh scramble characters when we cross a settleRate step boundary
        const currentStep = (v / stepRatio) | 0;
        const refreshChars = currentStep !== lastStep;
        if (refreshChars) lastStep = currentStep;
        // Subtract delay ratio to get the effective animation progress
        const linear = revealDelayRatio > 0 ? (v - revealDelayRatio) / (1 - revealDelayRatio) : v;
        const t = linear > 0 ? easeFn(linear) : 0;
        for (let c = 0; c < animLength; c++) {
          // Each character has its own start/end window based on its reveal order
          const charStart = charStarts[c];
          const charEnd = charEnds[c];
          // Settled zone: character has finished its transition
          if (t >= charEnd) {
            if (c < endLength) scrambled += settledText[c];
            continue;
          }
          // Pre-transition zone: reveal wave hasn't reached this character yet
          if (t <= 0 || t < charStart) {
            if (hasOverride && c < startLength) {
              if (hasOverrideChars) {
                if (startingText[c] === ' ') {
                  scrambled += ' ';
                } else {
                  if (refreshChars) /** @type {Array<String>} */(overrideCache)[c] = overrideChar || /** @type {String} */(overrideChars)[rng(0, totalOverrideChars)];
                  scrambled += /** @type {Array<String>} */(overrideCache)[c];
                }
              } else {
                // Default (override: false): show the original starting text
                scrambled += startingText[c];
              }
            }
            continue;
          }
          // Active zone: character is between charStart and charEnd
          const isSpace = (c < endLength && settledText[c] === ' ') || (c < startLength && startingText[c] === ' ');
          if (isSpace) {
            scrambled += ' ';
          } else if (hasCursor && t - charStart < cursorZone) {
            // Cursor sub-zone: show cursor character based on position within cursor width
            scrambled += cursorChars[cursorLen - 1 - (((t - charStart) / settleSpacing) | 0)];
          } else {
            // Scramble zone: show cycling random characters
            if (refreshChars) charCache[c] = characters[rng(0, totalChars)];
            scrambled += charCache[c];
          }
        }
        if (refreshChars) onChange(scrambled, t);
        return scrambled;
      }
    }
  }
};

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  TextSplitter: TextSplitter,
  scrambleText: scrambleText,
  split: split,
  splitText: splitText
});

export { registerTargets as $, Animatable, AutoLayout, Draggable, JSAnimation, Scope, ScrollObserver, Spring, TextSplitter, Timeline, Timer, WAAPIAnimation, addChild, animate, clamp, cleanInlineStyles, createAnimatable, createDraggable, createDrawable, createLayout, createMotionPath, createScope, createSeededRandom, createSpring, createTimeline, createTimer, cubicBezier, damp, degToRad, eases, index$3 as easings, engine, forEachChildren, get, globals, irregular, keepTime, lerp, linear, mapRange, morphTo, onScroll, padEnd, padStart, convertColorStringValuesToRgbaArray as parseColor, radToDeg, random, randomPick, remove, removeChild, round, roundPad, scrambleText, scrollContainers, set, shuffle, snap, split, splitText, spring, stagger, steps, index$1 as svg, sync, index as text, index$2 as utils, version, waapi, wrap };

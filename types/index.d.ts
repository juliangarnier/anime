/// <reference types="node" />
declare class Engine extends Clock {
    useDefaultMainLoop: boolean;
    pauseOnDocumentHidden: boolean;
    defaults: DefaultsParams;
    paused: boolean;
    reqId: number | NodeJS.Immediate;
    update(): void;
    wake(): this;
    pause(): Engine;
    resume(): this;
    set timeUnit(arg: "ms" | "s");
    get timeUnit(): "ms" | "s";
    set precision(arg: number);
    get precision(): number;
}
declare const engine: Engine;
declare class Clock {
    constructor(initTime?: number);
    deltaTime: number;
    _currentTime: number;
    _elapsedTime: number;
    _startTime: number;
    _lastTime: number;
    _scheduledTime: number;
    _frameDuration: number;
    _fps: number;
    _speed: number;
    _hasChildren: boolean;
    _head: Tickable | Tween;
    _tail: Tickable | Tween;
    set fps(arg: number);
    get fps(): number;
    set speed(arg: number);
    get speed(): number;
    requestTick(time: number): tickModes;
    computeDeltaTime(time: number): number;
}
type tweenTypes = number;
declare namespace tweenTypes {
    let OBJECT: number;
    let ATTRIBUTE: number;
    let CSS: number;
    let TRANSFORM: number;
    let CSS_VAR: number;
}
type valueTypes = number;
declare namespace valueTypes {
    let NUMBER: number;
    let UNIT: number;
    let COLOR: number;
    let COMPLEX: number;
}
type tickModes = number;
declare namespace tickModes {
    let NONE: number;
    let AUTO: number;
    let FORCE: number;
}
type compositionTypes = number;
declare namespace compositionTypes {
    let replace: number;
    let none: number;
    let blend: number;
}
declare function getTargetValue(targetSelector: DOMTargetSelector, propName: string): string;
declare function getTargetValue(targetSelector: JSTargetsParam, propName: string): number | string;
declare function getTargetValue(targetSelector: DOMTargetsParam, propName: string, unit: string): string;
declare function getTargetValue(targetSelector: TargetsParam, propName: string, unit: boolean): number;
declare function sync(callback?: Callback<Timer>): Timer;
declare function setTargetValues(targets: TargetsParam, parameters: AnimationParams): JSAnimation;
declare function remove(targets: TargetsParam, renderable?: Renderable | WAAPIAnimation, propertyName?: string): TargetsArray;
declare function lerp(start: number, end: number, amount: number, renderable?: Renderable | boolean): number;
declare namespace utils {
    export { registerTargets as $ };
    export { getTargetValue as get };
    export { setTargetValues as set };
    export { remove };
    export { cleanInlineStyles };
    export { random };
    export { randomPick };
    export { shuffle };
    export { lerp };
    export { sync };
    export let clamp: ((v: number, min: number, max: number) => number) & ChainedClamp;
    export let round: ((v: number, decimalLength: number) => number) & ChainedRound;
    export let snap: ((v: number, increment: number | number[]) => number) & ChainedSnap;
    export let wrap: ((v: number, min: number, max: number) => number) & ChainedWrap;
    export let interpolate: ((start: number, end: number, progress: number) => number) & ChainedInterpolate;
    export let mapRange: ((value: number, inLow: number, inHigh: number, outLow: number, outHigh: number) => number) & ChainedMapRange;
    export let roundPad: ((v: string | number, decimalLength: number) => string) & ChainedRoundPad;
    export let padStart: ((v: number, totalLength: number, padString: string) => string) & ChainedPadStart;
    export let padEnd: ((v: number, totalLength: number, padString: string) => string) & ChainedPadEnd;
    export let degToRad: ((degrees: number) => number) & ChainedDegToRad;
    export let radToDeg: ((radians: number) => number) & ChainedRadToDeg;
}
type ChainedUtilsResult = (value: number) => number;
type ChainableUtils = {
    clamp: ChainedClamp;
    round: ChainedRound;
    snap: ChainedSnap;
    wrap: ChainedWrap;
    interpolate: ChainedInterpolate;
    mapRange: ChainedMapRange;
    roundPad: ChainedRoundPad;
    padStart: ChainedPadStart;
    padEnd: ChainedPadEnd;
    degToRad: ChainedDegToRad;
    radToDeg: ChainedRadToDeg;
};
type ChainableUtil = ChainableUtils & ChainedUtilsResult;
type ChainedClamp = (min: number, max: number) => ChainableUtil;
type ChainedRound = (decimalLength: number) => ChainableUtil;
type ChainedSnap = (increment: number) => ChainableUtil;
type ChainedWrap = (min: number, max: number) => ChainableUtil;
type ChainedInterpolate = (start: number, end: number) => ChainableUtil;
type ChainedMapRange = (inLow: number, inHigh: number, outLow: number, outHigh: number) => ChainableUtil;
type ChainedRoundPad = (decimalLength: number) => ChainableUtil;
type ChainedPadStart = (totalLength: number, padString: string) => ChainableUtil;
type ChainedPadEnd = (totalLength: number, padString: string) => ChainableUtil;
type ChainedDegToRad = () => ChainableUtil;
type ChainedRadToDeg = () => ChainableUtil;
declare class Timer extends Clock {
    constructor(parameters?: TimerParams, parent?: Timeline, parentPosition?: number);
    id: string | number;
    parent: Timeline;
    duration: number;
    backwards: boolean;
    paused: boolean;
    began: boolean;
    completed: boolean;
    onBegin: Callback<this>;
    onBeforeUpdate: Callback<this>;
    onUpdate: Callback<this>;
    onLoop: Callback<this>;
    onPause: Callback<this>;
    onComplete: Callback<this>;
    iterationDuration: number;
    iterationCount: number;
    _autoplay: boolean | ScrollObserver;
    _offset: number;
    _delay: number;
    _loopDelay: number;
    _iterationTime: number;
    _currentIteration: number;
    _resolve: Function;
    _running: boolean;
    _reversed: number;
    _reverse: number;
    _cancelled: number;
    _alternate: boolean;
    _prev: Renderable;
    _next: Renderable;
    set cancelled(arg: boolean);
    get cancelled(): boolean;
    set currentTime(arg: number);
    get currentTime(): number;
    set iterationCurrentTime(arg: number);
    get iterationCurrentTime(): number;
    set progress(arg: number);
    get progress(): number;
    set iterationProgress(arg: number);
    get iterationProgress(): number;
    set currentIteration(arg: number);
    get currentIteration(): number;
    set reversed(arg: boolean);
    get reversed(): boolean;
    reset(internalRender?: number): this;
    init(internalRender?: number): this;
    resetTime(): this;
    pause(): this;
    resume(): this;
    restart(): this;
    seek(time: number, muteCallbacks?: boolean | number, internalRender?: boolean | number): this;
    alternate(): this;
    play(): this;
    reverse(): this;
    cancel(): this;
    stretch(newDuration: number): this;
    revert(): this;
    complete(): this;
    then(callback?: Callback<this>): Promise<any>;
}
declare function createTimer(parameters?: TimerParams): Timer;
declare function cleanInlineStyles<T extends Renderable>(renderable: T): T;
declare class JSAnimation extends Timer {
    constructor(targets: TargetsParam, parameters: AnimationParams, parent?: Timeline, parentPosition?: number, fastSet?: boolean, index?: number, length?: number);
    targets: TargetsArray;
    onRender: Callback<this>;
    _ease: EasingFunction;
    _inlineStyles: {};
    stretch(newDuration: number): this;
    refresh(): this;
    revert(): this;
    then(callback?: Callback<this>): Promise<any>;
}
declare function animate(targets: TargetsParam, parameters: AnimationParams): JSAnimation;
declare function registerTargets(targets: DOMTargetsParam): DOMTargetsArray;
declare function registerTargets(targets: JSTargetsParam): JSTargetsArray;
declare function registerTargets(targets: TargetsParam): TargetsArray;
declare function random(min: number, max: number, decimalLength?: number): number;
declare function randomPick(items: string | any[]): any;
declare function shuffle(items: any[]): any[];
declare namespace svg {
    export { morphTo };
    export { createMotionPath };
    export { createDrawable };
}
declare function morphTo(path2: TargetsParam, precision?: number): FunctionValue;
declare function createMotionPath(path: TargetsParam): {
    translateX: FunctionValue;
    translateY: FunctionValue;
    rotate: FunctionValue;
};
declare function createDrawable(selector: TargetsParam, start?: number, end?: number): Array<ProxyConstructor>;
declare function stagger(val: number | string | [
    number | string,
    number | string
], params?: StaggerParameters): StaggerFunction;
type StaggerParameters = {
    start?: number | string;
    from?: number | "first" | "center" | "last";
    reversed?: boolean;
    grid?: Array<number>;
    axis?: ("x" | "y");
    ease?: EasingParam;
    modifier?: TweenModifier;
};
type StaggerFunction = (target?: Target, index?: number, length?: number, tl?: Timeline) => number | string;
declare class Timeline extends Timer {
    constructor(parameters?: TimelineParams);
    labels: Record<string, number>;
    defaults: DefaultsParams;
    onRender: Callback<this>;
    _ease: EasingFunction;
    add(a1: TargetsParam, a2: AnimationParams, a3?: TimePosition): this;
    add(a1: TimerParams, a2?: TimePosition): this;
    sync(synced?: Tickable, position?: TimePosition): this;
    sync(synced?: globalThis.Animation, position?: TimePosition): this;
    sync(synced?: WAAPIAnimation, position?: TimePosition): this;
    set(targets: TargetsParam, parameters: AnimationParams, position?: TimePosition): this;
    call(callback: Callback<Timer>, position?: TimePosition): this;
    label(labelName: string, position?: TimePosition): this;
    remove(targets: TargetsParam, propertyName?: string): this;
    stretch(newDuration: number): this;
    refresh(): this;
    revert(): this;
    then(callback?: Callback<this>): Promise<any>;
}
declare function createTimeline(parameters?: TimelineParams): Timeline;
type TimePosition = number | string | Function;
declare namespace eases {
    export let linear: (...args?: (string | number)[]) => EasingFunction;
    export let irregular: (length?: number, randomness?: number) => EasingFunction;
    export let steps: (steps?: number, fromStart?: boolean) => EasingFunction;
    export let cubicBezier: (mX1?: number, mY1?: number, mX2?: number, mY2?: number) => EasingFunction;
    let _in: PowerEasing;
    export { _in as in };
    export let out: PowerEasing;
    export let inOut: PowerEasing;
    export let outIn: PowerEasing;
    export let inQuad: EasingFunction;
    export let outQuad: EasingFunction;
    export let inOutQuad: EasingFunction;
    export let outInQuad: EasingFunction;
    export let inCubic: EasingFunction;
    export let outCubic: EasingFunction;
    export let inOutCubic: EasingFunction;
    export let outInCubic: EasingFunction;
    export let inQuart: EasingFunction;
    export let outQuart: EasingFunction;
    export let inOutQuart: EasingFunction;
    export let outInQuart: EasingFunction;
    export let inQuint: EasingFunction;
    export let outQuint: EasingFunction;
    export let inOutQuint: EasingFunction;
    export let outInQuint: EasingFunction;
    export let inSine: EasingFunction;
    export let outSine: EasingFunction;
    export let inOutSine: EasingFunction;
    export let outInSine: EasingFunction;
    export let inCirc: EasingFunction;
    export let outCirc: EasingFunction;
    export let inOutCirc: EasingFunction;
    export let outInCirc: EasingFunction;
    export let inExpo: EasingFunction;
    export let outExpo: EasingFunction;
    export let inOutExpo: EasingFunction;
    export let outInExpo: EasingFunction;
    export let inBounce: EasingFunction;
    export let outBounce: EasingFunction;
    export let inOutBounce: EasingFunction;
    export let outInBounce: EasingFunction;
    export let inBack: BackEasing;
    export let outBack: BackEasing;
    export let inOutBack: BackEasing;
    export let outInBack: BackEasing;
    export let inElastic: ElasticEasing;
    export let outElastic: ElasticEasing;
    export let inOutElastic: ElasticEasing;
    export let outInElastic: ElasticEasing;
}
type PowerEasing = (power?: number | string) => EasingFunction;
type BackEasing = (overshoot?: number | string) => EasingFunction;
type ElasticEasing = (amplitude?: number | string, period?: number | string) => EasingFunction;
type DefaultsParams = {
    id?: number | string;
    keyframes?: PercentageKeyframes | DurationKeyframes;
    playbackEase?: EasingParam;
    playbackRate?: number;
    frameRate?: number;
    loop?: number | boolean;
    reversed?: boolean;
    alternate?: boolean;
    autoplay?: boolean | ScrollObserver;
    duration?: number | FunctionValue;
    delay?: number | FunctionValue;
    loopDelay?: number;
    ease?: EasingParam;
    composition?: 'none' | 'replace' | 'blend' | compositionTypes;
    modifier?: (v: any) => any;
    onBegin?: (tickable: Tickable) => void;
    onBeforeUpdate?: (tickable: Tickable) => void;
    onUpdate?: (tickable: Tickable) => void;
    onLoop?: (tickable: Tickable) => void;
    onPause?: (tickable: Tickable) => void;
    onComplete?: (tickable: Tickable) => void;
    onRender?: (renderable: Renderable) => void;
};
type Renderable = JSAnimation | Timeline;
type Tickable = Timer | Renderable;
type CallbackArgument = Timer & JSAnimation & Timeline;
declare class Animatable {
    constructor(targets: TargetsParam, parameters: AnimatableParams);
    targets: (HTMLElement | SVGElement | JSTarget)[];
    animations: {};
    revert(): this;
}
declare function createAnimatable(targets: TargetsParam, parameters: AnimatableParams): AnimatableObject;
type Revertible = Animatable | Tickable | Draggable | ScrollObserver | Scope;
type EasingFunction = (time: number) => number;
type EaseStringParamNames = ('linear' | 'linear(x1, x2 25%, x3)' | 'in' | 'out' | 'inOut' | 'inQuad' | 'outQuad' | 'inOutQuad' | 'inCubic' | 'outCubic' | 'inOutCubic' | 'inQuart' | 'outQuart' | 'inOutQuart' | 'inQuint' | 'outQuint' | 'inOutQuint' | 'inSine' | 'outSine' | 'inOutSine' | 'inCirc' | 'outCirc' | 'inOutCirc' | 'inExpo' | 'outExpo' | 'inOutExpo' | 'inBounce' | 'outBounce' | 'inOutBounce' | 'inBack' | 'outBack' | 'inOutBack' | 'inElastic' | 'outElastic' | 'inOutElastic' | 'irregular' | 'cubicBezier' | 'steps' | 'in(p = 1.675)' | 'out(p = 1.675)' | 'inOut(p = 1.675)' | 'inBack(overshoot = 1.70158)' | 'outBack(overshoot = 1.70158)' | 'inOutBack(overshoot = 1.70158)' | 'inElastic(amplitude = 1, period = .3)' | 'outElastic(amplitude = 1, period = .3)' | 'inOutElastic(amplitude = 1, period = .3)' | 'irregular(length = 10, randomness = 1)' | 'cubicBezier(x1, y1, x2, y2)' | 'steps(steps = 10)');
type EasingParam = (string & {}) | EaseStringParamNames | EasingFunction | Spring;
type DOMTarget = HTMLElement | SVGElement;
type JSTarget = Record<string, any>;
type Target = DOMTarget | JSTarget;
type TargetSelector = Target | NodeList | string;
type DOMTargetSelector = DOMTarget | NodeList | string;
type DOMTargetsParam = Array<DOMTargetSelector> | DOMTargetSelector;
type DOMTargetsArray = Array<DOMTarget>;
type JSTargetsParam = Array<JSTarget> | JSTarget;
type JSTargetsArray = Array<JSTarget>;
type TargetsParam = Array<TargetSelector> | TargetSelector;
type TargetsArray = Array<Target>;
type FunctionValue = (target: Target, index: number, length: number) => number | string | TweenObjectValue | Array<number | string | TweenObjectValue>;
type TweenModifier = (value: number) => number | string;
type ColorArray = [number, number, number, number];
type Callback<T> = (self: T, e?: PointerEvent) => any;
type TickableCallbacks<T extends unknown> = {
    onBegin?: Callback<T>;
    onBeforeUpdate?: Callback<T>;
    onUpdate?: Callback<T>;
    onLoop?: Callback<T>;
    onPause?: Callback<T>;
    onComplete?: Callback<T>;
};
type RenderableCallbacks<T extends unknown> = {
    onRender?: Callback<T>;
};
type Tween = {
    id: number;
    parent: JSAnimation;
    property: string;
    target: Target;
    _value: string | number;
    _func: Function | null;
    _ease: EasingFunction;
    _fromNumbers: Array<number>;
    _toNumbers: Array<number>;
    _strings: Array<string>;
    _fromNumber: number;
    _toNumber: number;
    _numbers: Array<number>;
    _number: number;
    _unit: string;
    _modifier: TweenModifier;
    _currentTime: number;
    _delay: number;
    _updateDuration: number;
    _startTime: number;
    _changeDuration: number;
    _absoluteStartTime: number;
    _tweenType: tweenTypes;
    _valueType: valueTypes;
    _composition: number;
    _isOverlapped: number;
    _isOverridden: number;
    _renderTransforms: number;
    _prevRep: Tween;
    _nextRep: Tween;
    _prevAdd: Tween;
    _nextAdd: Tween;
    _prev: Tween;
    _next: Tween;
};
type TweenDecomposedValue = {
    /**
     * - Type
     */
    t: number;
    /**
     * - Single number value
     */
    n: number;
    /**
     * - Value unit
     */
    u: string;
    /**
     * - Value operator
     */
    o: string;
    /**
     * - Array of Numbers (in case of complex value type)
     */
    d: Array<number>;
    /**
     * - Strings (in case of complex value type)
     */
    s: Array<string>;
};
type TweenPropertySiblings = {
    _head: null | Tween;
    _tail: null | Tween;
};
type TweenLookups = Record<string, TweenPropertySiblings>;
type TweenReplaceLookups = WeakMap<Target, TweenLookups>;
type TweenAdditiveLookups = Map<Target, TweenLookups>;
type TimerOptions = {
    id?: number | string;
    duration?: TweenParamValue;
    delay?: TweenParamValue;
    loopDelay?: number;
    reversed?: boolean;
    alternate?: boolean;
    loop?: boolean | number;
    autoplay?: boolean | ScrollObserver;
    frameRate?: number;
    playbackRate?: number;
};
/**
 *
 * /**
 */
type TimerParams = TimerOptions & TickableCallbacks<Timer>;
type TweenParamValue = number | string | FunctionValue;
type TweenPropValue = TweenParamValue | [TweenParamValue, TweenParamValue];
type TweenComposition = (string & {}) | 'none' | 'replace' | 'blend' | compositionTypes;
type TweenParamsOptions = {
    duration?: TweenParamValue;
    delay?: TweenParamValue;
    ease?: EasingParam;
    modifier?: TweenModifier;
    composition?: TweenComposition;
};
type TweenValues = {
    from?: TweenParamValue;
    to?: TweenPropValue;
    fromTo?: TweenPropValue;
};
type TweenKeyValue = TweenParamsOptions & TweenValues;
type ArraySyntaxValue = Array<TweenKeyValue | TweenPropValue>;
type TweenOptions = TweenParamValue | (TweenPropValue | TweenKeyValue)[] | TweenKeyValue;
type TweenObjectValue = Partial<{
    to: TweenParamValue | Array<TweenParamValue>;
    from: TweenParamValue | Array<TweenParamValue>;
    fromTo: TweenParamValue | Array<TweenParamValue>;
}>;
type PercentageKeyframeOptions = {
    ease?: EasingParam;
};
type PercentageKeyframeParams = Record<string, TweenParamValue>;
type PercentageKeyframes = Record<string, PercentageKeyframeParams & PercentageKeyframeOptions>;
type DurationKeyframes = Array<Record<string, TweenOptions | TweenModifier | boolean> & TweenParamsOptions>;
type AnimationOptions = {
    keyframes?: PercentageKeyframes | DurationKeyframes;
    playbackEase?: EasingParam;
};
type AnimationParams = Record<string, TweenOptions | Callback<JSAnimation> | TweenModifier | boolean | PercentageKeyframes | (Record<string, boolean | TweenModifier | TweenOptions> & TweenParamsOptions)[] | ScrollObserver> & TimerOptions & AnimationOptions & TweenParamsOptions & TickableCallbacks<JSAnimation> & RenderableCallbacks<JSAnimation>;
type TimelineOptions = {
    defaults?: DefaultsParams;
    playbackEase?: EasingParam;
};
type TimelineParams = TimerOptions & TimelineOptions & TickableCallbacks<Timeline> & RenderableCallbacks<Timeline>;
type AnimatablePropertySetter = (to: number | Array<number>, duration?: number, ease?: EasingParam) => AnimatableObject;
type AnimatablePropertyGetter = () => number | Array<number>;
type AnimatableProperty = AnimatablePropertySetter & AnimatablePropertyGetter;
type AnimatableObject = Animatable & Record<string, AnimatableProperty>;
type AnimatablePropertyParamsOptions = {
    unit?: string;
    duration?: TweenParamValue;
    ease?: EasingParam;
    modifier?: TweenModifier;
    composition?: TweenComposition;
};
type AnimatableParams = Record<string, TweenParamValue | EasingParam | TweenModifier | TweenComposition | AnimatablePropertyParamsOptions> & AnimatablePropertyParamsOptions;
declare class Draggable {
    constructor(target: TargetsParam, parameters?: DraggableParams);
    containerArray: number[];
    $container: HTMLElement;
    useWin: boolean;
    $scrollContainer: Window | HTMLElement;
    $target: HTMLElement;
    $trigger: HTMLElement;
    fixed: boolean;
    isFinePointer: boolean;
    containerPadding: [
        number,
        number,
        number,
        number
    ];
    containerFriction: number;
    releaseContainerFriction: number;
    snapX: number | Array<number>;
    snapY: number | Array<number>;
    scrollSpeed: number;
    scrollThreshold: number;
    dragSpeed: number;
    maxVelocity: number;
    minVelocity: number;
    velocityMultiplier: number;
    cursor: boolean | DraggableCursorParams;
    releaseXSpring: Spring;
    releaseYSpring: Spring;
    releaseEase: EasingFunction;
    hasReleaseSpring: boolean;
    onGrab: Callback<this>;
    onDrag: Callback<this>;
    onRelease: Callback<this>;
    onUpdate: Callback<this>;
    onSettle: Callback<this>;
    onSnap: Callback<this>;
    onResize: Callback<this>;
    onAfterResize: Callback<this>;
    disabled: [
        number,
        number
    ];
    animate: AnimatableObject;
    xProp: string;
    yProp: string;
    destX: number;
    destY: number;
    deltaX: number;
    deltaY: number;
    scroll: {
        x: number;
        y: number;
    };
    coords: [
        number,
        number,
        number,
        number
    ];
    snapped: [
        number,
        number
    ];
    pointer: [
        number,
        number,
        number,
        number,
        number,
        number,
        number,
        number
    ];
    scrollView: [
        number,
        number
    ];
    dragArea: [
        number,
        number,
        number,
        number
    ];
    containerBounds: [
        number,
        number,
        number,
        number
    ];
    scrollBounds: [
        number,
        number,
        number,
        number
    ];
    targetBounds: [
        number,
        number,
        number,
        number
    ];
    window: [
        number,
        number
    ];
    velocityStack: [
        number,
        number,
        number
    ];
    velocityStackIndex: number;
    velocityTime: number;
    velocity: number;
    angle: number;
    cursorStyles: JSAnimation;
    triggerStyles: JSAnimation;
    bodyStyles: JSAnimation;
    targetStyles: JSAnimation;
    touchActionStyles: JSAnimation;
    transforms: Transforms;
    overshootCoords: {
        x: number;
        y: number;
    };
    overshootXTicker: Timer;
    overshootYTicker: Timer;
    updateTicker: Timer;
    updated: boolean;
    manual: boolean;
    contained: boolean;
    grabbed: boolean;
    dragged: boolean;
    released: boolean;
    canScroll: boolean;
    enabled: boolean;
    initialized: boolean;
    activeProp: string;
    resizeTicker: Timer;
    parameters: DraggableParams;
    resizeObserver: ResizeObserver;
    computeVelocity(dx: number, dy: number): number;
    setX(x: number, muteUpdateCallback?: boolean): this;
    setY(y: number, muteUpdateCallback?: boolean): this;
    set x(arg: number);
    get x(): number;
    set y(arg: number);
    get y(): number;
    set progressX(arg: number);
    get progressX(): number;
    set progressY(arg: number);
    get progressY(): number;
    updateScrollCoords(): void;
    updateBoundingValues(): void;
    isOutOfBounds(bounds: any[], x: number, y: number): number;
    refresh(): void;
    update(): void;
    stop(): this;
    scrollInView(duration?: number, gap?: number, ease?: EasingParam): this;
    handleHover(): void;
    animateInView(duration?: number, gap?: number, ease?: EasingParam): this;
    handleDown(e: MouseEvent | TouchEvent): void;
    handleMove(e: MouseEvent | TouchEvent): void;
    handleUp(): void;
    reset(): this;
    enable(): this;
    disable(): this;
    revert(): this;
    handleEvent(e: Event): void;
}
declare function createDraggable(target: TargetsParam, parameters?: DraggableParams): Draggable;
type DraggableCursorParams = {
    onHover?: string;
    onGrab?: string;
};
type DraggableAxisParam = {
    mapTo?: string;
    modifier?: TweenModifier;
    composition?: TweenComposition;
    snap?: number | number[] | ((draggable: Draggable) => number | Array<number>);
};
type DraggableParams = {
    trigger?: DOMTargetSelector;
    container?: number[] | DOMTargetSelector | ((draggable: Draggable) => DOMTargetSelector | Array<number>);
    x?: boolean | DraggableAxisParam;
    y?: boolean | DraggableAxisParam;
    modifier?: TweenModifier;
    snap?: number | number[] | ((draggable: Draggable) => number | Array<number>);
    containerPadding?: number | number[] | ((draggable: Draggable) => number | Array<number>);
    containerFriction?: number | ((draggable: Draggable) => number);
    releaseContainerFriction?: number | ((draggable: Draggable) => number);
    dragSpeed?: number | ((draggable: Draggable) => number);
    scrollSpeed?: number | ((draggable: Draggable) => number);
    scrollThreshold?: number | ((draggable: Draggable) => number);
    minVelocity?: number | ((draggable: Draggable) => number);
    maxVelocity?: number | ((draggable: Draggable) => number);
    velocityMultiplier?: number | ((draggable: Draggable) => number);
    releaseMass?: number;
    releaseStiffness?: number;
    releaseDamping?: number;
    releaseEase?: EasingParam;
    cursor?: boolean | DraggableCursorParams | ((draggable: Draggable) => boolean | DraggableCursorParams);
    onGrab?: Callback<Draggable>;
    onDrag?: Callback<Draggable>;
    onRelease?: Callback<Draggable>;
    onUpdate?: Callback<Draggable>;
    onSettle?: Callback<Draggable>;
    onSnap?: Callback<Draggable>;
    onResize?: Callback<Draggable>;
    onAfterResize?: Callback<Draggable>;
};
declare class Transforms {
    constructor($el: DOMTarget | DOMProxy);
    $el: DOMTarget | DOMProxy;
    inlineTransforms: any[];
    point: DOMPoint;
    inversedMatrix: DOMMatrix;
    normalizePoint(x: number, y: number): DOMPoint;
    traverseUp(cb: ($el: DOMTarget, i: number) => any): void;
    getMatrix(): DOMMatrix;
    remove(): void;
    revert(): void;
}
declare class DOMProxy {
    constructor(el: any);
    el: any;
    zIndex: number;
    parentElement: any;
    classList: {
        add: () => void;
        remove: () => void;
    };
    set x(arg: any);
    get x(): any;
    set y(arg: any);
    get y(): any;
    set width(arg: any);
    get width(): any;
    set height(arg: any);
    get height(): any;
    getBoundingClientRect(): {
        top: any;
        right: any;
        bottom: any;
        left: any;
    };
}
declare class Scope {
    constructor(parameters?: ScopeParams);
    defaults: DefaultsParams;
    root: Document | DOMTarget;
    constructors: Array<ScopeConstructor>;
    revertConstructors: Array<Function>;
    revertibles: Array<Revertible>;
    methods: Record<string, Function>;
    matches: Record<string, boolean>;
    mediaQueryLists: Record<string, MediaQueryList>;
    data: Record<string, any>;
    execute(cb: (scope: this) => any): this;
    refresh(): this;
    add(a1: string, a2: ScopeMethod): this;
    add(a1: (self: this) => any): this;
    handleEvent(e: Event): void;
    revert(): void;
}
declare function createScope(params?: ScopeParams): Scope;
type ReactRef = {
    current?: HTMLElement | SVGElement | null;
};
type AngularRef = {
    nativeElement?: HTMLElement | SVGElement;
};
type ScopeParams = {
    root?: DOMTargetSelector | ReactRef | AngularRef;
    defaults?: DefaultsParams;
    mediaQueries?: Record<string, string>;
};
type ScopeCleanup = (scope?: Scope) => any;
type ScopeConstructor = (scope?: Scope) => ScopeCleanup | void;
type ScopeMethod = (...args: any[]) => ScopeCleanup | void;
declare const scrollContainers: Map<any, any>;
declare class ScrollObserver {
    constructor(parameters?: ScrollObserverParams);
    index: number;
    id: string | number;
    container: ScrollContainer;
    target: HTMLElement;
    linked: Tickable | WAAPIAnimation;
    repeat: boolean;
    horizontal: boolean;
    enter: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback;
    leave: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback;
    sync: boolean;
    syncEase: EasingFunction;
    syncSmooth: number;
    onSyncEnter: Callback<ScrollObserver>;
    onSyncLeave: Callback<ScrollObserver>;
    onSyncEnterForward: Callback<ScrollObserver>;
    onSyncLeaveForward: Callback<ScrollObserver>;
    onSyncEnterBackward: Callback<ScrollObserver>;
    onSyncLeaveBackward: Callback<ScrollObserver>;
    onEnter: Callback<ScrollObserver>;
    onLeave: Callback<ScrollObserver>;
    onEnterForward: Callback<ScrollObserver>;
    onLeaveForward: Callback<ScrollObserver>;
    onEnterBackward: Callback<ScrollObserver>;
    onLeaveBackward: Callback<ScrollObserver>;
    onUpdate: Callback<ScrollObserver>;
    onSyncComplete: Callback<ScrollObserver>;
    reverted: boolean;
    completed: boolean;
    began: boolean;
    isInView: boolean;
    forceEnter: boolean;
    hasEntered: boolean;
    offsets: Array<number>;
    offset: number;
    offsetStart: number;
    offsetEnd: number;
    distance: number;
    prevProgress: number;
    thresholds: any[];
    coords: [
        number,
        number,
        number,
        number
    ];
    debugStyles: JSAnimation;
    $debug: HTMLElement;
    _params: ScrollObserverParams;
    _debug: boolean;
    _next: ScrollObserver;
    _prev: ScrollObserver;
    link(linked: Tickable | WAAPIAnimation): this;
    get velocity(): number;
    get backward(): boolean;
    get scroll(): number;
    get progress(): number;
    refresh(): this;
    removeDebug(): this;
    debug(): void;
    updateBounds(): void;
    handleScroll(): void;
    revert(): this;
}
declare function onScroll(parameters?: ScrollObserverParams): ScrollObserver;
type ScrollThresholdValue = string | number;
type ScrollThresholdParam = {
    target?: ScrollThresholdValue;
    container?: ScrollThresholdValue;
};
type ScrollObserverAxisCallback = (self: ScrollObserver) => "x" | "y";
type ScrollThresholdCallback = (self: ScrollObserver) => ScrollThresholdValue | ScrollThresholdParam;
type ScrollObserverParams = {
    id?: number | string;
    sync?: boolean | number | string | EasingParam;
    container?: TargetsParam;
    target?: TargetsParam;
    axis?: "x" | "y" | ScrollObserverAxisCallback | ((observer: ScrollObserver) => "x" | "y" | ScrollObserverAxisCallback);
    enter?: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback | ((observer: ScrollObserver) => ScrollThresholdValue | ScrollThresholdParam | ScrollThresholdCallback);
    leave?: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback | ((observer: ScrollObserver) => ScrollThresholdValue | ScrollThresholdParam | ScrollThresholdCallback);
    repeat?: boolean | ((observer: ScrollObserver) => boolean);
    debug?: boolean;
    onEnter?: Callback<ScrollObserver>;
    onLeave?: Callback<ScrollObserver>;
    onEnterForward?: Callback<ScrollObserver>;
    onLeaveForward?: Callback<ScrollObserver>;
    onEnterBackward?: Callback<ScrollObserver>;
    onLeaveBackward?: Callback<ScrollObserver>;
    onUpdate?: Callback<ScrollObserver>;
    onSyncComplete?: Callback<ScrollObserver>;
};
declare class ScrollContainer {
    constructor($el: HTMLElement);
    element: HTMLElement;
    useWin: boolean;
    winWidth: number;
    winHeight: number;
    width: number;
    height: number;
    left: number;
    top: number;
    zIndex: number;
    scrollX: number;
    scrollY: number;
    prevScrollX: number;
    prevScrollY: number;
    scrollWidth: number;
    scrollHeight: number;
    velocity: number;
    backwardX: boolean;
    backwardY: boolean;
    scrollTicker: Timer;
    dataTimer: Timer;
    resizeTicker: Timer;
    wakeTicker: Timer;
    _head: ScrollObserver;
    _tail: ScrollObserver;
    resizeObserver: ResizeObserver;
    updateScrollCoords(): void;
    updateWindowBounds(): void;
    updateBounds(): void;
    refreshScrollObservers(): void;
    refresh(): void;
    handleScroll(): void;
    handleEvent(e: Event): void;
    revert(): void;
}
declare class Spring {
    constructor(parameters?: SpringParams);
    timeStep: number;
    restThreshold: number;
    restDuration: number;
    maxDuration: number;
    maxRestSteps: number;
    maxIterations: number;
    m: number;
    s: number;
    d: number;
    v: number;
    w0: number;
    zeta: number;
    wd: number;
    b: number;
    solverDuration: number;
    duration: number;
    ease: EasingFunction;
    solve(time: number): number;
    compute(): void;
    set mass(arg: number);
    get mass(): number;
    set stiffness(arg: number);
    get stiffness(): number;
    set damping(arg: number);
    get damping(): number;
    set velocity(arg: number);
    get velocity(): number;
}
declare function createSpring(parameters?: SpringParams): Spring;
type SpringParams = {
    mass?: number;
    stiffness?: number;
    damping?: number;
    velocity?: number;
};
declare class WAAPIAnimation {
    constructor(targets: DOMTargetsParam, params: WAAPIAnimationParams);
    targets: DOMTargetsArray;
    animations: Array<globalThis.Animation>;
    controlAnimation: globalThis.Animation;
    onComplete: Callback<this>;
    duration: number;
    muteCallbacks: boolean;
    completed: boolean;
    paused: boolean;
    reversed: boolean;
    autoplay: boolean | ScrollObserver;
    _speed: number;
    _resolve: Function;
    _completed: number;
    _inlineStyles: Array<any>;
    forEach(callback: string | ((animation: globalThis.Animation) => any)): this;
    set speed(arg: number);
    get speed(): number;
    set currentTime(arg: number);
    get currentTime(): number;
    set progress(arg: number);
    get progress(): number;
    resume(): this;
    pause(): this;
    alternate(): this;
    play(): this;
    reverse(): this;
    seek(time: number, muteCallbacks?: boolean): this;
    restart(): this;
    commitStyles(): this;
    complete(): this;
    cancel(): this;
    revert(): this;
    then(callback?: WAAPICallback): Promise<any>;
}
declare namespace waapi {
    export function animate(targets: DOMTargetsParam, params: WAAPIAnimationParams): WAAPIAnimation;
    export { easingToLinear as convertEase };
}
type WAAPITweenValue = string | number | Array<string> | Array<number>;
type WAAPIFunctionvalue = (target: DOMTarget, index: number, length: number) => WAAPITweenValue;
type WAAPIKeyframeValue = WAAPITweenValue | WAAPIFunctionvalue | Array<string | number | WAAPIFunctionvalue>;
type WAAPICallback = (animation: WAAPIAnimation) => void;
type WAAPITweenOptions = {
    to?: WAAPIKeyframeValue;
    from?: WAAPIKeyframeValue;
    duration?: number | WAAPIFunctionvalue;
    delay?: number | WAAPIFunctionvalue;
    ease?: EasingParam;
    composition?: CompositeOperation;
};
type WAAPIAnimationOptions = {
    loop?: number | boolean;
    Reversed?: boolean;
    Alternate?: boolean;
    autoplay?: boolean | ScrollObserver;
    playbackRate?: number;
    duration?: number | WAAPIFunctionvalue;
    delay?: number | WAAPIFunctionvalue;
    ease?: EasingParam;
    composition?: CompositeOperation;
    onComplete?: WAAPICallback;
};
type WAAPIAnimationParams = Record<string, WAAPIKeyframeValue | WAAPIAnimationOptions | boolean | ScrollObserver | WAAPICallback | EasingParam | WAAPITweenOptions> & WAAPIAnimationOptions;
declare function easingToLinear(fn: EasingFunction, samples?: number): string;
export { engine, utils, svg, stagger, eases, DefaultsParams, Renderable, Tickable, CallbackArgument, Revertible, EasingFunction, EaseStringParamNames, EasingParam, DOMTarget, JSTarget, Target, TargetSelector, DOMTargetSelector, DOMTargetsParam, DOMTargetsArray, JSTargetsParam, JSTargetsArray, TargetsParam, TargetsArray, FunctionValue, TweenModifier, ColorArray, Callback, TickableCallbacks, RenderableCallbacks, Tween, TweenDecomposedValue, TweenPropertySiblings, TweenLookups, TweenReplaceLookups, TweenAdditiveLookups, TimerOptions, TimerParams, TweenParamValue, TweenPropValue, TweenComposition, TweenParamsOptions, TweenValues, TweenKeyValue, ArraySyntaxValue, TweenOptions, TweenObjectValue, PercentageKeyframeOptions, PercentageKeyframeParams, PercentageKeyframes, DurationKeyframes, AnimationOptions, AnimationParams, TimelineOptions, TimelineParams, AnimatablePropertySetter, AnimatablePropertyGetter, AnimatableProperty, AnimatableObject, AnimatablePropertyParamsOptions, AnimatableParams, createTimer, Timer, animate, JSAnimation, createTimeline, Timeline, createAnimatable, Animatable, createDraggable, Draggable, createScope, Scope, onScroll, ScrollObserver, scrollContainers, createSpring, Spring, waapi, WAAPIAnimation };

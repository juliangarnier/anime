export class Draggable {
    /**
     * @param {TargetsParam} target
     * @param {DraggableParams} [parameters]
     */
    constructor(target: TargetsParam, parameters?: DraggableParams);
    containerArray: number[];
    $container: HTMLElement;
    useWin: boolean;
    /** @type {Window | HTMLElement} */
    $scrollContainer: Window | HTMLElement;
    $target: HTMLElement;
    $trigger: HTMLElement;
    fixed: boolean;
    isFinePointer: boolean;
    /** @type {[Number, Number, Number, Number]} */
    containerPadding: [number, number, number, number];
    /** @type {Number} */
    containerFriction: number;
    /** @type {Number} */
    releaseContainerFriction: number;
    /** @type {Number|Array<Number>} */
    snapX: number | Array<number>;
    /** @type {Number|Array<Number>} */
    snapY: number | Array<number>;
    /** @type {Number} */
    scrollSpeed: number;
    /** @type {Number} */
    scrollThreshold: number;
    /** @type {Number} */
    dragSpeed: number;
    /** @type {Number} */
    dragThreshold: number;
    /** @type {Number} */
    maxVelocity: number;
    /** @type {Number} */
    minVelocity: number;
    /** @type {Number} */
    velocityMultiplier: number;
    /** @type {Boolean|DraggableCursorParams} */
    cursor: boolean | DraggableCursorParams;
    /** @type {Spring} */
    releaseXSpring: Spring;
    /** @type {Spring} */
    releaseYSpring: Spring;
    /** @type {EasingFunction} */
    releaseEase: EasingFunction;
    /** @type {Boolean} */
    hasReleaseSpring: boolean;
    /** @type {Callback<this>} */
    onGrab: Callback<this>;
    /** @type {Callback<this>} */
    onDrag: Callback<this>;
    /** @type {Callback<this>} */
    onRelease: Callback<this>;
    /** @type {Callback<this>} */
    onUpdate: Callback<this>;
    /** @type {Callback<this>} */
    onSettle: Callback<this>;
    /** @type {Callback<this>} */
    onSnap: Callback<this>;
    /** @type {Callback<this>} */
    onResize: Callback<this>;
    /** @type {Callback<this>} */
    onAfterResize: Callback<this>;
    /** @type {[Number, Number]} */
    disabled: [number, number];
    /** @type {AnimatableObject} */
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
    /** @type {[Number, Number, Number, Number]} */
    coords: [number, number, number, number];
    /** @type {[Number, Number]} */
    snapped: [number, number];
    /** @type {[Number, Number, Number, Number, Number, Number, Number, Number]} */
    pointer: [number, number, number, number, number, number, number, number];
    /** @type {[Number, Number]} */
    scrollView: [number, number];
    /** @type {[Number, Number, Number, Number]} */
    dragArea: [number, number, number, number];
    /** @type {[Number, Number, Number, Number]} */
    containerBounds: [number, number, number, number];
    /** @type {[Number, Number, Number, Number]} */
    scrollBounds: [number, number, number, number];
    /** @type {[Number, Number, Number, Number]} */
    targetBounds: [number, number, number, number];
    /** @type {[Number, Number]} */
    window: [number, number];
    /** @type {[Number, Number, Number]} */
    velocityStack: [number, number, number];
    /** @type {Number} */
    velocityStackIndex: number;
    /** @type {Number} */
    velocityTime: number;
    /** @type {Number} */
    velocity: number;
    /** @type {Number} */
    angle: number;
    /** @type {JSAnimation} */
    cursorStyles: JSAnimation;
    /** @type {JSAnimation} */
    triggerStyles: JSAnimation;
    /** @type {JSAnimation} */
    bodyStyles: JSAnimation;
    /** @type {JSAnimation} */
    targetStyles: JSAnimation;
    /** @type {JSAnimation} */
    touchActionStyles: JSAnimation;
    transforms: Transforms;
    overshootCoords: {
        x: number;
        y: number;
    };
    overshootTicker: Timer;
    updated: boolean;
    manual: boolean;
    updateTicker: Timer;
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
    /**
     * @param  {Number} dx
     * @param  {Number} dy
     * @return {Number}
     */
    computeVelocity(dx: number, dy: number): number;
    /**
     * @param {Number}  x
     * @param {Boolean} [muteUpdateCallback]
     * @return {this}
     */
    setX(x: number, muteUpdateCallback?: boolean): this;
    /**
     * @param {Number}  y
     * @param {Boolean} [muteUpdateCallback]
     * @return {this}
     */
    setY(y: number, muteUpdateCallback?: boolean): this;
    set x(x: number);
    get x(): number;
    set y(y: number);
    get y(): number;
    set progressX(x: number);
    get progressX(): number;
    set progressY(y: number);
    get progressY(): number;
    updateScrollCoords(): void;
    updateBoundingValues(): void;
    /**
     * @param  {Array} bounds
     * @param  {Number} x
     * @param  {Number} y
     * @return {Number}
     */
    isOutOfBounds(bounds: any[], x: number, y: number): number;
    refresh(): void;
    update(): void;
    stop(): this;
    /**
     * @param {Number} [duration]
     * @param {Number} [gap]
     * @param {EasingParam} [ease]
     * @return {this}
     */
    scrollInView(duration?: number, gap?: number, ease?: EasingParam): this;
    handleHover(): void;
    /**
     * @param  {Number} [duration]
     * @param  {Number} [gap]
     * @param  {EasingParam} [ease]
     * @return {this}
     */
    animateInView(duration?: number, gap?: number, ease?: EasingParam): this;
    /**
     * @param {MouseEvent|TouchEvent} e
     */
    handleDown(e: MouseEvent | TouchEvent): void;
    /**
     * @param {MouseEvent|TouchEvent} e
     */
    handleMove(e: MouseEvent | TouchEvent): void;
    handleUp(): void;
    reset(): this;
    enable(): this;
    disable(): this;
    revert(): this;
    /**
     * @param {Event} e
     */
    handleEvent(e: Event): void;
}
export function createDraggable(target: TargetsParam, parameters?: DraggableParams): Draggable;
import type { DraggableCursorParams } from '../types/index.js';
import { Spring } from '../easings/spring/index.js';
import type { EasingFunction } from '../types/index.js';
import type { Callback } from '../types/index.js';
import type { AnimatableObject } from '../types/index.js';
import { JSAnimation } from '../animation/animation.js';
declare class Transforms {
    /**
     * @param {DOMTarget|DOMProxy} $el
     */
    constructor($el: DOMTarget | DOMProxy);
    $el: DOMTarget | DOMProxy;
    inlineTransforms: any[];
    point: DOMPoint;
    inversedMatrix: DOMMatrix;
    /**
     * @param {Number} x
     * @param {Number} y
     * @return {DOMPoint}
     */
    normalizePoint(x: number, y: number): DOMPoint;
    /**
     * @callback TraverseParentsCallback
     * @param {DOMTarget} $el
     * @param {Number} i
     */
    /**
     * @param {TraverseParentsCallback} cb
     */
    traverseUp(cb: ($el: DOMTarget, i: number) => any): void;
    getMatrix(): DOMMatrix;
    remove(): void;
    revert(): void;
}
import { Timer } from '../timer/timer.js';
import type { DraggableParams } from '../types/index.js';
import type { EasingParam } from '../types/index.js';
import type { TargetsParam } from '../types/index.js';
import type { DOMTarget } from '../types/index.js';
declare class DOMProxy {
    /** @param {Object} el */
    constructor(el: any);
    el: any;
    zIndex: number;
    parentElement: any;
    classList: {
        add: () => void;
        remove: () => void;
    };
    set x(v: any);
    get x(): any;
    set y(v: any);
    get y(): any;
    set width(v: any);
    get width(): any;
    set height(v: any);
    get height(): any;
    getBoundingClientRect(): {
        top: any;
        right: any;
        bottom: any;
        left: any;
    };
}
export {};

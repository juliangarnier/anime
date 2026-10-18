export class AutoLayout {
    /**
     * @param {DOMTargetSelector} root
     * @param {AutoLayoutParams} [params]
     */
    constructor(root: DOMTargetSelector, params?: AutoLayoutParams);
    /** @type {AutoLayoutParams} */
    params: AutoLayoutParams;
    /** @type {DOMTarget} */
    root: DOMTarget;
    /** @type {Number|String} */
    id: number | string;
    /** @type {LayoutChildrenParam} */
    children: LayoutChildrenParam;
    /** @type {Boolean} */
    absoluteCoords: boolean;
    /** @type {LayoutStateParams} */
    swapAtParams: LayoutStateParams;
    /** @type {LayoutStateParams} */
    enterFromParams: LayoutStateParams;
    /** @type {LayoutStateParams} */
    leaveToParams: LayoutStateParams;
    /** @type {Set<String>} */
    properties: Set<string>;
    /** @type {Set<String>} */
    recordedProperties: Set<string>;
    /** @type {WeakSet<DOMTarget>} */
    pendingRemoval: WeakSet<DOMTarget>;
    /** @type {Map<DOMTarget, String|null>} */
    transitionMuteStore: Map<DOMTarget, string | null>;
    /** @type {LayoutSnapshot} */
    oldState: LayoutSnapshot;
    /** @type {LayoutSnapshot} */
    newState: LayoutSnapshot;
    /** @type {Timeline} */
    timeline: Timeline;
    /** @type {WAAPIAnimation} */
    transformAnimation: WAAPIAnimation;
    /** @type {Array<DOMTarget>} */
    animating: Array<DOMTarget>;
    /** @type {Array<DOMTarget>} */
    swapping: Array<DOMTarget>;
    /** @type {Array<DOMTarget>} */
    leaving: Array<DOMTarget>;
    /** @type {Array<DOMTarget>} */
    entering: Array<DOMTarget>;
    /**
     * @return {this}
     */
    revert(): this;
    /**
     * @return {this}
     */
    record(): this;
    /**
     * @param {LayoutAnimationParams} [params]
     * @return {Timeline}
     */
    animate(params?: LayoutAnimationParams): Timeline;
    /**
     * @param {(layout: this) => void} callback
     * @param {LayoutAnimationParams} [params]
     * @return {Timeline}
     */
    update(callback: (layout: this) => void, params?: LayoutAnimationParams): Timeline;
}
export function createLayout(root: DOMTargetSelector, params?: AutoLayoutParams): AutoLayout;
export type LayoutChildrenParam = DOMTargetSelector | Array<DOMTargetSelector>;
export type LayoutAnimationTimingsParams = {
    delay?: number | FunctionValue;
    duration?: number | FunctionValue;
    ease?: EasingParam | FunctionValue;
};
export type LayoutStateAnimationProperties = Record<string, number | string | FunctionValue>;
export type LayoutStateParams = LayoutStateAnimationProperties & LayoutAnimationTimingsParams;
export type LayoutSpecificAnimationParams = {
    id?: number | string;
    delay?: number | FunctionValue;
    duration?: number | FunctionValue;
    ease?: EasingParam | FunctionValue;
    playbackEase?: EasingParam;
    swapAt?: LayoutStateParams;
    enterFrom?: LayoutStateParams;
    leaveTo?: LayoutStateParams;
};
export type LayoutAnimationParams = LayoutSpecificAnimationParams & TimerParams & TickableCallbacks<Timeline> & RenderableCallbacks<Timeline>;
export type LayoutOptions = {
    children?: LayoutChildrenParam;
    properties?: Array<string>;
};
export type AutoLayoutParams = LayoutAnimationParams & LayoutOptions;
export type LayoutNodeProperties = Record<string, number | string | FunctionValue> & {
    transform: string;
    x: number;
    y: number;
    left: number;
    top: number;
    clientLeft: number;
    clientTop: number;
    width: number;
    height: number;
};
export type LayoutNode = {
    id: string;
    $el: DOMTarget;
    index: number;
    targets: Array<DOMTarget>;
    delay: number;
    duration: number;
    ease: EasingParam;
    $measure: DOMTarget;
    state: LayoutSnapshot;
    layout: AutoLayout;
    parentNode: LayoutNode | null;
    isTarget: boolean;
    isEntering: boolean;
    isLeaving: boolean;
    hasTransform: boolean;
    inlineStyles: Array<string>;
    inlineTransforms: string | null;
    inlineTransition: string | null;
    branchAdded: boolean;
    branchRemoved: boolean;
    branchNotRendered: boolean;
    sizeChanged: boolean;
    isInlined: boolean;
    hasVisibilitySwap: boolean;
    hasDisplayNone: boolean;
    hasVisibilityHidden: boolean;
    measuredInlineTransform: string | null;
    measuredInlineTransition: string | null;
    measuredDisplay: string | null;
    measuredVisibility: string | null;
    measuredPosition: string | null;
    measuredHasDisplayNone: boolean;
    measuredHasVisibilityHidden: boolean;
    measuredIsVisible: boolean;
    measuredIsRemoved: boolean;
    measuredIsInsideRoot: boolean;
    properties: LayoutNodeProperties;
    _head: LayoutNode | null;
    _tail: LayoutNode | null;
    _prev: LayoutNode | null;
    _next: LayoutNode | null;
};
export type LayoutNodeIterator = (node: LayoutNode, index: number) => void;
import type { DOMTarget } from '../types/index.js';
declare class LayoutSnapshot {
    /**
     * @param {AutoLayout} layout
     */
    constructor(layout: AutoLayout);
    /** @type {AutoLayout} */
    layout: AutoLayout;
    /** @type {LayoutNode|null} */
    rootNode: LayoutNode | null;
    /** @type {Set<LayoutNode>} */
    rootNodes: Set<LayoutNode>;
    /** @type {Map<String, LayoutNode>} */
    nodes: Map<string, LayoutNode>;
    /** @type {Number} */
    scrollX: number;
    /** @type {Number} */
    scrollY: number;
    /**
     * @return {this}
     */
    revert(): this;
    /**
     * @param {DOMTarget} $el
     * @return {LayoutNode}
     */
    getNode($el: DOMTarget): LayoutNode;
    /**
     * @param {DOMTarget} $el
     * @param {String} prop
     * @return {Number|String}
     */
    getComputedValue($el: DOMTarget, prop: string): number | string;
    /**
     * @param {LayoutNode|null} rootNode
     * @param {LayoutNodeIterator} cb
     */
    forEach(rootNode: LayoutNode | null, cb: LayoutNodeIterator): void;
    /**
     * @param {LayoutNodeIterator} cb
     */
    forEachRootNode(cb: LayoutNodeIterator): void;
    /**
     * @param {LayoutNodeIterator} cb
     */
    forEachNode(cb: LayoutNodeIterator): void;
    /**
     * @param {DOMTarget} $el
     * @param {LayoutNode|null} parentNode
     * @return {LayoutNode|null}
     */
    registerElement($el: DOMTarget, parentNode: LayoutNode | null): LayoutNode | null;
    /**
     * @param {DOMTarget} $el
     * @param {Set<DOMTarget>} candidates
     * @return {LayoutNode|null}
     */
    ensureDetachedNode($el: DOMTarget, candidates: Set<DOMTarget>): LayoutNode | null;
    /**
     * @return {this}
     */
    record(): this;
}
import type { Timeline } from '../timeline/timeline.js';
import type { WAAPIAnimation } from '../waapi/waapi.js';
import type { DOMTargetSelector } from '../types/index.js';
import type { FunctionValue } from '../types/index.js';
import type { EasingParam } from '../types/index.js';
import type { TimerParams } from '../types/index.js';
import type { TickableCallbacks } from '../types/index.js';
import type { RenderableCallbacks } from '../types/index.js';
export {};

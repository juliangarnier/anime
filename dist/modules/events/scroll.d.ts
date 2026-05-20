export const scrollContainers: Map<any, any>;
export class ScrollObserver {
    /**
     * @param {ScrollObserverParams} parameters
     */
    constructor(parameters?: ScrollObserverParams);
    /** @type {Number} */
    index: number;
    /** @type {String|Number} */
    id: string | number;
    /** @type {ScrollContainer} */
    container: ScrollContainer;
    /** @type {HTMLElement} */
    target: HTMLElement;
    /** @type {Tickable|WAAPIAnimation} */
    linked: Tickable | WAAPIAnimation;
    /** @type {Boolean} */
    repeat: boolean;
    /** @type {Boolean} */
    horizontal: boolean;
    /** @type {ScrollThresholdParam|ScrollThresholdValue|ScrollThresholdCallback} */
    enter: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback;
    /** @type {ScrollThresholdParam|ScrollThresholdValue|ScrollThresholdCallback} */
    leave: ScrollThresholdParam | ScrollThresholdValue | ScrollThresholdCallback;
    /** @type {Boolean} */
    sync: boolean;
    /** @type {EasingFunction} */
    syncEase: EasingFunction;
    /** @type {Number} */
    syncSmooth: number;
    /** @type {Callback<ScrollObserver>} */
    onSyncEnter: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onSyncLeave: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onSyncEnterForward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onSyncLeaveForward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onSyncEnterBackward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onSyncLeaveBackward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onEnter: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onLeave: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onEnterForward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onLeaveForward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onEnterBackward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onLeaveBackward: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onUpdate: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onResize: Callback<ScrollObserver>;
    /** @type {Callback<ScrollObserver>} */
    onSyncComplete: Callback<ScrollObserver>;
    /** @type {Boolean} */
    reverted: boolean;
    /** @type {Boolean} */
    ready: boolean;
    /** @type {Boolean} */
    completed: boolean;
    /** @type {Boolean} */
    began: boolean;
    /** @type {Boolean} */
    isInView: boolean;
    /** @type {Boolean} */
    forceEnter: boolean;
    /** @type {Boolean} */
    hasEntered: boolean;
    /** @type {Number} */
    offset: number;
    /** @type {Number} */
    offsetStart: number;
    /** @type {Number} */
    offsetEnd: number;
    /** @type {Number} */
    distance: number;
    /** @type {Number} */
    prevProgress: number;
    /** @type {Array} */
    thresholds: any[];
    /** @type {[Number, Number, Number, Number]} */
    coords: [number, number, number, number];
    /** @type {JSAnimation} */
    debugStyles: JSAnimation;
    /** @type {HTMLElement} */
    $debug: HTMLElement;
    /** @type {ScrollObserverParams} */
    _params: ScrollObserverParams;
    /** @type {Boolean} */
    _debug: boolean;
    /** @type {ScrollObserver} */
    _next: ScrollObserver;
    /** @type {ScrollObserver} */
    _prev: ScrollObserver;
    /**
     * @param {Tickable|WAAPIAnimation} linked
     */
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
export function onScroll(parameters?: ScrollObserverParams): ScrollObserver;
declare class ScrollContainer {
    /**
     * @param {HTMLElement} $el
     */
    constructor($el: HTMLElement);
    /** @type {HTMLElement} */
    element: HTMLElement;
    /** @type {Boolean} */
    useWin: boolean;
    /** @type {Number} */
    winWidth: number;
    /** @type {Number} */
    winHeight: number;
    /** @type {Number} */
    width: number;
    /** @type {Number} */
    height: number;
    /** @type {Number} */
    left: number;
    /** @type {Number} */
    top: number;
    /** @type {Number} */
    scale: number;
    /** @type {Number} */
    zIndex: number;
    /** @type {Number} */
    scrollX: number;
    /** @type {Number} */
    scrollY: number;
    /** @type {Number} */
    prevScrollX: number;
    /** @type {Number} */
    prevScrollY: number;
    /** @type {Number} */
    scrollWidth: number;
    /** @type {Number} */
    scrollHeight: number;
    /** @type {Number} */
    velocity: number;
    /** @type {Boolean} */
    backwardX: boolean;
    /** @type {Boolean} */
    backwardY: boolean;
    /** @type {Timer} */
    scrollTicker: Timer;
    /** @type {Timer} */
    dataTimer: Timer;
    /** @type {Timer} */
    resizeTicker: Timer;
    /** @type {Timer} */
    wakeTicker: Timer;
    /** @type {ScrollObserver} */
    _head: ScrollObserver;
    /** @type {ScrollObserver} */
    _tail: ScrollObserver;
    resizeObserver: ResizeObserver;
    updateScrollCoords(): void;
    updateWindowBounds(): void;
    updateBounds(): void;
    refreshScrollObservers(): void;
    refresh(): void;
    handleScroll(): void;
    /**
     * @param {Event} e
     */
    handleEvent(e: Event): void;
    revert(): void;
}
import type { Tickable } from '../types/index.js';
import type { WAAPIAnimation } from '../waapi/waapi.js';
import type { ScrollThresholdParam } from '../types/index.js';
import type { ScrollThresholdValue } from '../types/index.js';
import type { ScrollThresholdCallback } from '../types/index.js';
import type { EasingFunction } from '../types/index.js';
import type { Callback } from '../types/index.js';
import type { JSAnimation } from '../animation/animation.js';
import type { ScrollObserverParams } from '../types/index.js';
import { Timer } from '../timer/timer.js';
export {};

/**
 * Base class used to create Timers, Animations and Timelines
 */
export class Timer extends Clock {
    /**
     * @param {TimerParams} [parameters]
     * @param {Timeline} [parent]
     * @param {Number} [parentPosition]
     */
    constructor(parameters?: TimerParams, parent?: Timeline, parentPosition?: number);
    id: string | number;
    /** @type {Timeline} */
    parent: Timeline;
    duration: number;
    /** @type {Boolean} */
    backwards: boolean;
    /** @type {Boolean} */
    paused: boolean;
    /** @type {Boolean} */
    began: boolean;
    /** @type {Boolean} */
    completed: boolean;
    /** @type {Callback<this>} */
    onBegin: Callback<this>;
    /** @type {Callback<this>} */
    onBeforeUpdate: Callback<this>;
    /** @type {Callback<this>} */
    onUpdate: Callback<this>;
    /** @type {Callback<this>} */
    onLoop: Callback<this>;
    /** @type {Callback<this>} */
    onPause: Callback<this>;
    /** @type {Callback<this>} */
    onComplete: Callback<this>;
    /** @type {Callback<this>} */
    onStop: Callback<this>;
    /** @type {Number} */
    iterationDuration: number;
    /** @type {Number} */
    iterationCount: number;
    /** @type {Boolean|ScrollObserver} */
    _autoplay: boolean | ScrollObserver;
    /** @type {Number} */
    _offset: number;
    /** @type {Number} */
    _delay: number;
    /** @type {Number} */
    _loopDelay: number;
    /** @type {Number} */
    _iterationTime: number;
    /** @type {Number} */
    _currentIteration: number;
    /** @type {Function} */
    _resolve: Function;
    /** @type {Boolean} */
    _running: boolean;
    /** @type {Number} */
    _reversed: number;
    /** @type {Number} */
    _reverse: number;
    /** @type {Number} */
    _cancelled: number;
    /** @type {Boolean} */
    _alternate: boolean;
    /** @type {Renderable} */
    _prev: Renderable;
    /** @type {Renderable} */
    _next: Renderable;
    set cancelled(cancelled: boolean);
    get cancelled(): boolean;
    set currentTime(time: number);
    get currentTime(): number;
    set iterationCurrentTime(time: number);
    get iterationCurrentTime(): number;
    set progress(progress: number);
    get progress(): number;
    set iterationProgress(progress: number);
    get iterationProgress(): number;
    set currentIteration(iterationCount: number);
    get currentIteration(): number;
    set reversed(reverse: boolean);
    get reversed(): boolean;
    /**
     * @param  {Boolean} [softReset]
     * @return {this}
     */
    reset(softReset?: boolean): this;
    /**
     * @param  {Boolean} internalRender
     * @return {this}
     */
    init(internalRender?: boolean): this;
    /** @return {this} */
    resetTime(): this;
    /** @return {this} */
    pause(): this;
    /** @return {this} */
    resume(): this;
    /** @return {this} */
    restart(): this;
    /**
     * @param  {Number} time
     * @param  {Boolean|Number} [muteCallbacks]
     * @param  {Boolean|Number} [internalRender]
     * @return {this}
     */
    seek(time: number, muteCallbacks?: boolean | number, internalRender?: boolean | number): this;
    /** @return {this} */
    alternate(): this;
    /** @return {this} */
    play(): this;
    /** @return {this} */
    reverse(): this;
    /** @return {this} */
    cancel(): this;
    /**
     * @param  {Number} newDuration
     * @return {this}
     */
    stretch(newDuration: number): this;
    /**
      * Cancels the timer by seeking it back to 0 and reverting the attached scroller if necessary
      * @return {this}
      */
    revert(): this;
    /**
      * Imediatly completes the timer, cancels it and triggers the onComplete callback
      * @return {this}
      */
    complete(): this;
    /**
     * @typedef {this & {then: null}} ResolvedTimer
     */
    /**
     * @param  {Callback<ResolvedTimer>} [callback]
     * @return Promise<this>
     */
    then(callback?: Callback<this & {
        then: null;
    }>): Promise<any>;
}
export function createTimer(parameters?: TimerParams): Timer;
import { Clock } from '../core/clock.js';
import type { Timeline } from '../timeline/timeline.js';
import type { Callback } from '../types/index.js';
import type { ScrollObserver } from '../events/scroll.js';
import type { Renderable } from '../types/index.js';
import type { TimerParams } from '../types/index.js';

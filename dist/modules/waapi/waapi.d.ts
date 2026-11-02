export class WAAPIAnimation {
    /**
     * @param {DOMTargetsParam} targets
     * @param {WAAPIAnimationParams} params
     */
    constructor(targets: DOMTargetsParam, params: WAAPIAnimationParams);
    /** @type {DOMTargetsArray}] */
    targets: DOMTargetsArray;
    /** @type {Array<globalThis.Animation>}] */
    animations: Array<globalThis.Animation>;
    /** @type {globalThis.Animation}] */
    controlAnimation: globalThis.Animation;
    /** @type {Callback<this>} */
    onComplete: Callback<this>;
    /** @type {Number} */
    duration: number;
    /** @type {Boolean} */
    muteCallbacks: boolean;
    /** @type {Boolean} */
    completed: boolean;
    /** @type {Boolean} */
    paused: boolean;
    /** @type {Boolean} */
    reversed: boolean;
    /** @type {Boolean} */
    persist: boolean;
    /** @type {Boolean|ScrollObserver} */
    autoplay: boolean | ScrollObserver;
    /** @type {Number} */
    _speed: number;
    /** @type {Function} */
    _resolve: Function;
    /** @type {Number} */
    _completed: number;
    /** @type {Array.<Object>} */
    _inlineStyles: Array<any>;
    /**
     * @callback forEachCallback
     * @param {globalThis.Animation} animation
     */
    /**
     * @param  {forEachCallback|String} callback
     * @return {this}
     */
    forEach(callback: ((animation: globalThis.Animation) => any) | string): this;
    set speed(speed: number);
    get speed(): number;
    set currentTime(time: number);
    get currentTime(): number;
    set progress(progress: number);
    get progress(): number;
    resume(): this;
    pause(): this;
    alternate(): this;
    play(): this;
    reverse(): this;
    /**
     * @param {Number} time
     * @param {Boolean} muteCallbacks
     */
    seek(time: number, muteCallbacks?: boolean): this;
    restart(): this;
    commitStyles(): this;
    complete(): this;
    cancel(): this;
    revert(): this;
    /** @return {<T = Omit<this, 'then'>>(callback?: (this: void, self: Omit<this, 'then'>) => T) => Promise<Awaited<T>>} */
    get then(): <T = Omit<this, "then">>(callback?: (this: void, self: Omit<this, "then">) => T) => Promise<Awaited<T>>;
}
export namespace waapi {
    export function animate(targets: DOMTargetsParam, params: WAAPIAnimationParams): WAAPIAnimation;
    export { easingToLinear as convertEase };
}
import type { DOMTargetsArray } from '../types/index.js';
import type { Callback } from '../types/index.js';
import type { ScrollObserver } from '../events/scroll.js';
import type { DOMTargetsParam } from '../types/index.js';
import type { WAAPIAnimationParams } from '../types/index.js';
/**
 * @import {
 *   Callback,
 *   EasingFunction,
 *   EasingParam,
 *   DOMTarget,
 *   DOMTargetsParam,
 *   DOMTargetsArray,
 *   WAAPIAnimationParams,
 *   WAAPITweenOptions,
 *   WAAPIKeyframeValue,
 *   WAAPITweenValue
 * } from '../types/index.js'
*/
/**
 * @import {
 *   Spring,
 * } from '../easings/spring/index.js'
*/
/**
 * @import {
 *   ScrollObserver,
 * } from '../events/scroll.js'
*/
/**
 * Converts an easing function into a valid CSS linear() timing function string
 * @param {EasingFunction} fn
 * @param {number} [samples=100]
 * @returns {string} CSS linear() timing function
 */
declare function easingToLinear(fn: EasingFunction, samples?: number): string;
import type { EasingFunction } from '../types/index.js';
export {};

/**
 * @import {
 *   Tickable,
 *   Tween,
 * } from '../types/index.js'
*/
export class Clock {
    /** @param {Number} [initTime] */
    constructor(initTime?: number);
    /** @type {Number} */
    deltaTime: number;
    /** @type {Number} */
    _currentTime: number;
    /** @type {Number} */
    _lastTickTime: number;
    /** @type {Number} */
    _startTime: number;
    /** @type {Number} */
    _lastTime: number;
    /** @type {Number} */
    _scheduledTime: number;
    /** @type {Number} */
    _frameDuration: number;
    /** @type {Number} */
    _fps: number;
    /** @type {Number} */
    _speed: number;
    /** @type {Boolean} */
    _hasChildren: boolean;
    /** @type {Tickable|Tween} */
    _head: Tickable | Tween;
    /** @type {Tickable|Tween} */
    _tail: Tickable | Tween;
    set fps(frameRate: number);
    get fps(): number;
    set speed(playbackRate: number);
    get speed(): number;
    /**
     * @param  {Number} time
     * @return {tickModes}
     */
    requestTick(time: number): tickModes;
    /**
     * @param  {Number} time
     * @return {Number}
     */
    computeDeltaTime(time: number): number;
}
import type { Tickable } from '../types/index.js';
import type { Tween } from '../types/index.js';
import { tickModes } from './consts.js';

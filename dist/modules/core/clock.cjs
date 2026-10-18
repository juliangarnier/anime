/**
 * Anime.js - core - CJS
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var globals = require('./globals.cjs');

/**
 * @import {
 *   Tickable,
 *   Tween,
 * } from '../types/index.js'
*/

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
    this._frameDuration = consts.K / consts.maxFps;
    /** @type {Number} */
    this._fps = consts.maxFps;
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
    const fps = fr < consts.minValue ? consts.minValue : fr;
    const frameDuration = consts.K / fps;
    if (fps > globals.defaults.frameRate) globals.defaults.frameRate = fps;
    this._fps = fps;
    this._frameDuration = frameDuration;
  }

  get speed() {
    return this._speed;
  }

  set speed(playbackRate) {
    const pbr = +playbackRate;
    this._speed = pbr < consts.minValue ? consts.minValue : pbr;
  }

  /**
   * @param  {Number} time
   * @return {tickModes}
   */
  requestTick(time) {
    const frameDuration = this._frameDuration;
    const elapsed = time - this._lastTickTime;
    const scaled = frameDuration * .25;
    const tolerance = scaled < 4 ? scaled : 4;
    // Tolerance prevents dropping frames that arrive a bit early due to RAF jitter
    // typically <= ~25% of frame duration and capped at 4ms so it doesn't dominate at high fps.
    // e.g. at 60fps (frameDuration=16.667ms) a frame arriving after 15ms:
    // - without tolerance: 15 < 16.667 -> skip
    // - with tolerance: 15 + 4 >= 16.667 -> tick
    if (elapsed + tolerance < frameDuration) return consts.tickModes.NONE;
    this._lastTickTime = elapsed >= frameDuration ? time - (elapsed % frameDuration) : time;
    return consts.tickModes.AUTO;
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

exports.Clock = Clock;

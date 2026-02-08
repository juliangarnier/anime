/**
 * Anime.js - engine - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var globals = require('../core/globals.cjs');
var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var clock = require('../core/clock.cjs');
var render = require('../core/render.cjs');
var additive = require('../animation/additive.cjs');

/**
 * @import {
 *   DefaultsParams,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   Tickable,
 * } from '../types/index.js'
*/

const engineTickMethod = /*#__PURE__*/ (() => consts.isBrowser ? requestAnimationFrame : setImmediate)();
const engineCancelMethod = /*#__PURE__*/ (() => consts.isBrowser ? cancelAnimationFrame : clearImmediate)();

class Engine extends clock.Clock {

  /** @param {Number} [initTime] */
  constructor(initTime) {
    super(initTime);
    this.useDefaultMainLoop = true;
    this.pauseOnDocumentHidden = true;
    /** @type {DefaultsParams} */
    this.defaults = globals.defaults;
    // this.paused = isBrowser && doc.hidden ? true  : false;
    this.paused = true;
    /** @type {Number|NodeJS.Immediate} */
    this.reqId = 0;
  }

  update() {
    const time = this._currentTime = helpers.now();
    if (this.requestTick(time)) {
      this.computeDeltaTime(time);
      const engineSpeed = this._speed;
      const engineFps = this._fps;
      let activeTickable = /** @type {Tickable} */(this._head);
      while (activeTickable) {
        const nextTickable = activeTickable._next;
        if (!activeTickable.paused) {
          render.tick(
            activeTickable,
            (time - activeTickable._startTime) * activeTickable._speed * engineSpeed,
            0, // !muteCallbacks
            0, // !internalRender
            activeTickable._fps < engineFps ? activeTickable.requestTick(time) : consts.tickModes.AUTO
          );
        } else {
          helpers.removeChild(this, activeTickable);
          this._hasChildren = !!this._tail;
          activeTickable._running = false;
          if (activeTickable.completed && !activeTickable._cancelled) {
            activeTickable.cancel();
          }
        }
        activeTickable = nextTickable;
      }
      additive.additive.update();
    }
  }

  wake() {
    if (this.useDefaultMainLoop && !this.reqId) {
      // Imediatly request a tick to update engine._elapsedTime and get accurate offsetPosition calculation in timer.js
      this.requestTick(helpers.now());
      this.reqId = engineTickMethod(tickEngine);
    }
    return this;
  }

  pause() {
    if (!this.reqId) return;
    this.paused = true;
    return killEngine();
  }

  resume() {
    if (!this.paused) return;
    this.paused = false;
    helpers.forEachChildren(this, (/** @type {Tickable} */child) => child.resetTime());
    return this.wake();
  }

  // Getter and setter for speed
  get speed() {
    return this._speed * (globals.globals.timeScale === 1 ? 1 : consts.K);
  }

  set speed(playbackRate) {
    this._speed = playbackRate * globals.globals.timeScale;
    helpers.forEachChildren(this, (/** @type {Tickable} */child) => child.speed = child._speed);
  }

  // Getter and setter for timeUnit
  get timeUnit() {
    return globals.globals.timeScale === 1 ? 'ms' : 's';
  }

  set timeUnit(unit) {
    const secondsScale = 0.001;
    const isSecond = unit === 's';
    const newScale = isSecond ? secondsScale : 1;
    if (globals.globals.timeScale !== newScale) {
      globals.globals.timeScale = newScale;
      globals.globals.tickThreshold = 200 * newScale;
      const scaleFactor = isSecond ? secondsScale : consts.K;
      /** @type {Number} */
      (this.defaults.duration) *= scaleFactor;
      this._speed *= scaleFactor;
    }
  }

  // Getter and setter for precision
  get precision() {
    return globals.globals.precision;
  }

  set precision(precision) {
    globals.globals.precision = precision;
  }

}

const engine = /*#__PURE__*/(() => {
  const engine = new Engine(helpers.now());
  if (consts.isBrowser) {
    globals.globalVersions.engine = engine;
    consts.doc.addEventListener('visibilitychange', () => {
      if (!engine.pauseOnDocumentHidden) return;
      consts.doc.hidden ? engine.pause() : engine.resume();
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

const killEngine = () => {
  engineCancelMethod(/** @type {NodeJS.Immediate & Number} */(engine.reqId));
  engine.reqId = 0;
  return engine;
};

exports.engine = engine;

/**
 * Anime.js - timer - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var globals = require('../core/globals.cjs');
var values = require('../core/values.cjs');
var render = require('../core/render.cjs');
var composition = require('../animation/composition.cjs');
var clock = require('../core/clock.cjs');
var engine = require('../engine/engine.cjs');

/**
 * @import {
 *   Callback,
 *   TimerParams,
 *   Renderable,
 *   Tween,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   ScrollObserver,
 * } from '../events/scroll.js'
*/

/**
 * @import {
 *   Timeline,
 * } from '../timeline/timeline.js'
*/

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
    helpers.forEachChildren(timer, reviveTimer);
    /** @type {Timeline} */(timer).rebuildTakeovers();
  } else {
    helpers.forEachChildren(timer, (/** @type {Tween} tween */tween) => {
      // Set NaN so a revived tween writes its value at the next render.
      // Keep the time of a blend tween that rests on one of its ends, its composition sets its number.
      if (tween._composition !== consts.compositionTypes.blend || tween._currentTime > 0 && tween._currentTime < tween._changeDuration) tween._currentTime = NaN;
      if (tween._composition === consts.compositionTypes.blend) {
        composition.composeTween(tween);
      } else if (tween._composition === consts.compositionTypes.replace && !timer.parent) {
        // Leave the replace tweens of a child to its timeline, which composes them again when it is revived.
        tween._isOverridden = consts.overrideTypes.NONE;
        tween._changeDuration = tween._updateDuration;
        composition.composeTween(tween);
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
class Timer extends clock.Clock {
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

    if (globals.scope.current) globals.scope.current.register(this);

    const timerInitTime = parent ? 0 : engine.engine._lastTickTime;
    const timerDefaults = parent ? parent.defaults : globals.globals.defaults;
    const timerDelay = /** @type {Number} */(helpers.isFnc(delay) || helpers.isUnd(delay) ? timerDefaults.delay : +delay);
    const timerDuration = helpers.isFnc(duration) || helpers.isUnd(duration) ? Infinity : +duration;
    const timerLoop = values.setValue(loop, timerDefaults.loop);
    const timerLoopDelay = values.setValue(loopDelay, timerDefaults.loopDelay);
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
      if (!engine.engine.reqId) engine.engine.requestTick(helpers.now());
      // Make sure to scale the offset position with globals.timeScale to properly handle seconds unit
      offsetPosition = (engine.engine._lastTickTime - engine.engine._startTime) * globals.globals.timeScale;
    }

    // Timer's parameters
    /** @type {String|Number} */
    this.id = !helpers.isUnd(id) ? id : timerId;
    /** @type {Timeline} */
    this.parent = parent;
    // Total duration of the timer
    this.duration = helpers.clampInfinity(((timerDuration + timerLoopDelay) * timerIterationCount) - timerLoopDelay) || consts.minValue;
    /** @type {Boolean} */
    this.backwards = false;
    /** @type {Boolean} */
    this.paused = true;
    /** @type {Boolean} */
    this.muted = !!(parent && parent.muted) || !!values.setValue(muted, timerDefaults.muted);
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
    if (this.muted) this.onBegin = this.onBeforeUpdate = this.onUpdate = this.onLoop = this.onPause = this.onComplete = consts.noop;
    /** @type {Number} */
    this.iterationDuration = timerDuration; // Duration of one loop
    /** @type {Number} */
    this.iterationCount = timerIterationCount; // Number of loops
    /** @type {Boolean|ScrollObserver} */
    this._autoplay = parent ? false : values.setValue(autoplay, timerDefaults.autoplay);
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
    this._resolve = consts.noop; // Used by .then()
    /** @type {Boolean} */
    this._running = false;
    /** @type {Number} */
    this._reversed = +values.setValue(reversed, timerDefaults.reversed);
    /** @type {Number} */
    this._reverse = this._reversed;
    /** @type {Number} */
    this._cancelled = 0;
    /** @type {Boolean} */
    this._alternate = values.setValue(alternate, timerDefaults.alternate);
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
    this._fps = values.setValue(frameRate, timerDefaults.frameRate);
    /** @type {Number} */
    this._speed = values.setValue(playbackRate, timerDefaults.playbackRate);
    /** @type {Number} */
    this._priority = +values.setValue(priority, 1);
  }

  get cancelled() {
    return !!this._cancelled;
  }

  set cancelled(cancelled) {
    cancelled ? this.cancel() : this.reset(true).play();
  }

  get currentTime() {
    return helpers.clamp(helpers.round(this._currentTime, globals.globals.precision), -this._delay, this.duration);
  }

  set currentTime(time) {
    const paused = this.paused;
    // Pausing the timer is necessary to avoid time jumps on a running instance
    this.pause().seek(+time);
    if (!paused) this.resume();
  }

  get iterationCurrentTime() {
    return helpers.clamp(helpers.round(this._iterationTime, globals.globals.precision), 0, this.iterationDuration);
  }

  set iterationCurrentTime(time) {
    this.currentTime = (this.iterationDuration * this._currentIteration) + time;
  }

  get progress() {
    return helpers.clamp(helpers.round(this._currentTime / this.duration, 10), 0, 1);
  }

  set progress(progress) {
    this.currentTime = this.duration * progress;
  }

  get iterationProgress() {
    return helpers.clamp(helpers.round(this._iterationTime / this.iterationDuration, 10), 0, 1);
  }

  set iterationProgress(progress) {
    this.iterationCurrentTime = this.iterationDuration * progress;
  }

  get currentIteration() {
    return this._currentIteration;
  }

  set currentIteration(iterationCount) {
    this.currentTime = (this.iterationDuration * helpers.clamp(+iterationCount, 0, this.iterationCount - 1));
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
    render.tick(this, 0, 1, ~~softReset, consts.tickModes.FORCE);
    // Reset timer properties after revive / render to make sure the props are not updated again
    resetTimerProperties(this);
    // Also reset children properties
    if (this._hasChildren) {
      helpers.forEachChildren(this, resetTimerProperties);
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
      render.tick(this, this.duration, 1, ~~internalRender, consts.tickModes.FORCE);
    }
    this.reset(internalRender);
    // Make sure to set autoplay to false to child timers so it doesn't attempt to autoplay / link
    const autoplay = this._autoplay;
    if (autoplay === true) {
      this.resume();
    } else if (autoplay && !helpers.isUnd(/** @type {ScrollObserver} */(autoplay).linked)) {
      /** @type {ScrollObserver} */(autoplay).link(this);
    }
    return this;
  }

  /** @return {this} */
  resetTime() {
    const timeScale = 1 / (this._speed * engine.engine._speed);
    // TODO: See if we can safely use engine._lastTickTime here
    // if (!engine.reqId) engine.requestTick(now())
    // this._startTime = engine._lastTickTime - (this._currentTime + this._delay) * timeScale;
    this._startTime = helpers.now() - (this._currentTime + this._delay) * timeScale;
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
    if (this.duration <= consts.minValue && !this._hasChildren) {
      render.tick(this, consts.minValue, 0, 0, consts.tickModes.FORCE);
    } else {
      if (!this._running) {
        helpers.addChild(engine.engine, this, sortByPriority);
        engine.engine._hasChildren = true;
        this._running = true;
      }
      this.resetTime();
      // Forces the timer to advance by at least one frame when the next tick occurs
      this._startTime -= 12;
      engine.engine.wake();
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
    render.tick(this, time + this._delay, ~~muteCallbacks, ~~internalRender, consts.tickModes.AUTO);
    return isPaused ? this : this.resume();
  }

  /** @return {this} */
  alternate() {
    const reversed = this._reversed;
    const count = this.iterationCount;
    const duration = this.iterationDuration;
    // Calculate the maximum iterations possible given the iteration duration
    const iterations = count === Infinity ? helpers.floor(consts.maxValue / duration) : count;
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
      helpers.forEachChildren(this, (/** @type {Renderable} */child) => child.cancel(), true);
    } else {
      helpers.forEachChildren(this, composition.removeTweenSliblings);
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
    const normlizedDuration = helpers.normalizeTime(newDuration);
    if (currentDuration === normlizedDuration) return this;
    const timeScale = newDuration / currentDuration;
    this.duration = normlizedDuration;
    this.iterationDuration = helpers.normalizeTime(this.iterationDuration * timeScale);
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
  revert(render$1 = true) {
    if (render$1) render.tick(this, 0, 1, 0, consts.tickModes.AUTO);
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
    return /** @type {any} */(helpers.getCompletionThen(this));
  }

}

/**
 * @param {TimerParams} [parameters]
 * @return {Timer}
 */
const createTimer = parameters => new Timer(parameters, null, 0).init();

exports.Timer = Timer;
exports.createTimer = createTimer;

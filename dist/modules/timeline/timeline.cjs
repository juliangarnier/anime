/**
 * Anime.js - timeline - CJS
 * @version v4.4.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var globals = require('../core/globals.cjs');
var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var values = require('../core/values.cjs');
var targets = require('../core/targets.cjs');
var render = require('../core/render.cjs');
var styles = require('../core/styles.cjs');
var timer = require('../timer/timer.cjs');
var composition = require('../animation/composition.cjs');
var animation = require('../animation/animation.cjs');
var parser = require('../easings/eases/parser.cjs');
var position = require('./position.cjs');

/**
 * @import {
 *   TargetsParam,
 *   Callback,
 *   Tickable,
 *   TimerParams,
 *   AnimationParams,
 *   Target,
 *   Renderable,
 *   TimelineParams,
 *   DefaultsParams,
 *   TimelinePosition,
 *   StaggerFunction,
 *   TargetsArray,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   WAAPIAnimation,
 * } from '../waapi/waapi.js'
*/

/** @import {TweakRegister} from 'tweaks' */

/**
 * @param {Timeline} tl
 * @return {Number}
 */
function getTimelineTotalDuration(tl) {
  return helpers.clampInfinity(((tl.iterationDuration + tl._loopDelay) * tl.iterationCount) - tl._loopDelay) || consts.minValue;
}

/**
 * @overload
 * @param  {TimerParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @return {Timeline}
 *
 * @overload
 * @param  {AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} targets
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 * @return {Timeline}
 *
 * @param  {TimerParams|AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} [targets]
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 */
function addTlChild(childParams, tl, timePosition, targets, index, allTargets) {
  const isSetter = helpers.isNum(childParams.duration) && /** @type {Number} */(childParams.duration) <= consts.minValue;
  // Offset the tl position with -minValue for 0 duration animations or .set() calls in order to align their end value with the defined position
  const adjustedPosition = isSetter ? timePosition - consts.minValue : timePosition;
  if (tl.composition) render.tick(tl, adjustedPosition, 1, 1, consts.tickModes.AUTO);
  const tlChild = targets ?
    new animation.JSAnimation(targets,/** @type {AnimationParams} */(childParams), tl, adjustedPosition, false, index, allTargets) :
    new timer.Timer(/** @type {TimerParams} */(childParams), tl, adjustedPosition);
  if (tl.composition) tlChild.init(true);
  // TODO: Might be better to insert at a position relative to startTime?
  helpers.addChild(tl, tlChild);
  helpers.forEachChildren(tl, (/** @type {Renderable} */child) => {
    const childTLOffset = child._offset + child._delay;
    const childDur = childTLOffset + child.duration;
    if (childDur > tl.iterationDuration) tl.iterationDuration = childDur;
  });
  tl.duration = getTimelineTotalDuration(tl);
  return tl;
}

let TLId = 0;

class Timeline extends timer.Timer {

  /**
   * @param {TimelineParams} [parameters]
   */
  constructor(parameters = {}) {
    super(/** @type {TimerParams&TimelineParams} */(parameters), null, 0);
    ++TLId;
    /** @type {String|Number} */
    this.id = !helpers.isUnd(parameters.id) ? parameters.id : TLId;
    /** @type {Number} */
    this.duration = 0; // TL duration starts at 0 and grows when adding children
    /** @type {Record<String, Number>} */
    this.labels = {};
    const defaultsParams = parameters.defaults;
    const globalDefaults = globals.globals.defaults;
    /** @type {DefaultsParams} */
    this.defaults = defaultsParams ? helpers.mergeObjects(defaultsParams, globalDefaults) : globalDefaults;
    /** @type {Boolean} */
    this.composition = values.setValue(parameters.composition, true);
    /** @type {Callback<this>} */
    this.onRender = parameters.onRender || globalDefaults.onRender;
    const tlPlaybackEase = values.setValue(parameters.playbackEase, globalDefaults.playbackEase);
    this._ease = tlPlaybackEase ? parser.parseEase(tlPlaybackEase) : null;
    /** @type {Number} */
    this.iterationDuration = 0;
  }

  /**
   * @overload
   * @param {TargetsParam} a1
   * @param {AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [a3]
   * @return {this}
   *
   * @overload
   * @param {TimerParams} a1
   * @param {TimelinePosition} [a2]
   * @return {this}
   *
   * @param {TargetsParam|TimerParams} a1
   * @param {TimelinePosition|AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [a3]
   */
  add(a1, a2, a3) {
    const isAnim = helpers.isObj(a2);
    const isTimer = helpers.isObj(a1);
    if (isAnim || isTimer) {
      this._hasChildren = true;
      if (isAnim) {
        const childParams = /** @type {AnimationParams} */(a2);
        const editorHook = globals.globals.editor && globals.globals.editor.addTimelineChild;
        const isStaggerType = a3 && /** @type {TweakRegister} */(a3).type === 'Stagger' && globals.globals.editor;
        // Check for function or Stagger type children positions
        const staggeredPosition = helpers.isFnc(a3) ? a3 : null;
        if (staggeredPosition || isStaggerType) {
          const parsedTargetsArray = targets.parseTargets(/** @type {TargetsParam} */(a1));
          // Store initial duration before adding new children that will change the duration
          const tlDuration = this.duration;
          // Store initial _iterationDuration before adding new children that will change the duration
          const tlIterationDuration = this.iterationDuration;
          // Store the original id in order to add specific indexes to the new animations ids
          const id = childParams.id;
          let i = 0;
          /** @type {Number} */
          const parsedLength = (parsedTargetsArray.length);
          // Call editor hook once for the entire stagger group instead of per target
          const resolvedParams = editorHook ? editorHook(/** @type {TargetsParam} */(a1), childParams, this.id, a3, parsedLength) : null;
          // Resolve stagger AFTER editor hook so tweaked position value (a3.defaultValue) is used
          const staggerFn = staggeredPosition || globals.globals.editor.resolveStagger(/** @type {TweakRegister} */(a3).defaultValue);
          parsedTargetsArray.forEach((/** @type {Target} */target) => {
            // Create a new parameter object for each staggered children
            const staggeredChildParams = { ...(resolvedParams || childParams) };
            // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
            this.duration = tlDuration;
            this.iterationDuration = tlIterationDuration;
            if (!helpers.isUnd(id)) staggeredChildParams.id = id + '-' + i;
            const staggeredTimePosition = position.parseTimelinePosition(this, staggerFn(target, i, parsedTargetsArray, null, this));
            addTlChild(
              staggeredChildParams,
              this,
              staggeredTimePosition,
              target,
              i,
              parsedTargetsArray,
            );
            i++;
          });
        } else {
          // Call editor hook before resolving position so tweaked values are applied
          const resolvedChildParams = editorHook ? editorHook(/** @type {TargetsParam} */(a1), childParams, this.id, a3) : childParams;
          const resolvedPosition = a3 && /** @type {*} */(a3).type ? /** @type {*} */(a3).defaultValue : a3;
          addTlChild(
            resolvedChildParams,
            this,
            position.parseTimelinePosition(this, resolvedPosition),
            /** @type {TargetsParam} */(a1),
          );
        }
      } else {
        // It's a Timer
        addTlChild(
          /** @type TimerParams */(a1),
          this,
          position.parseTimelinePosition(this,a2),
        );
      }
      if (this.composition) this.init(true);
      return this;
    }
  }

  /**
   * @overload
   * @param {Tickable} [synced]
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   * @overload
   * @param {globalThis.Animation} [synced]
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   * @overload
   * @param {WAAPIAnimation} [synced]
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   * @param {Tickable|WAAPIAnimation|globalThis.Animation} [synced]
   * @param {TimelinePosition} [position]
   */
  sync(synced, position) {
    if (helpers.isUnd(synced) || synced && helpers.isUnd(synced.pause)) return this;
    synced.pause();
    const duration = +(/** @type {globalThis.Animation} */(synced).effect ? /** @type {globalThis.Animation} */(synced).effect.getTiming().duration : /** @type {Tickable} */(synced).duration);
    // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
    if (!helpers.isUnd(synced) && !helpers.isUnd(/** @type {WAAPIAnimation} */(synced).persist)) {
      /** @type {WAAPIAnimation} */(synced).persist = true;
    }
    return this.add(synced, { currentTime: [0, duration], duration, delay: 0, ease: 'linear', playbackEase: 'linear' }, position);
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {AnimationParams} parameters
   * @param  {TimelinePosition} [position]
   * @return {this}
   */
  set(targets, parameters, position) {
    if (helpers.isUnd(parameters)) return this;
    parameters.duration = consts.minValue;
    parameters.composition = consts.compositionTypes.replace;
    return this.add(targets, parameters, position);
  }

  /**
   * @param {Callback<Timer>} callback
   * @param {TimelinePosition} [position]
   * @return {this}
   */
  call(callback, position) {
    if (helpers.isUnd(callback) || callback && !helpers.isFnc(callback)) return this;
    return this.add({ duration: 0, delay: 0, onComplete: () => callback(this) }, position);
  }

  /**
   * @param {String} labelName
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   */
  label(labelName, position$1) {
    if (helpers.isUnd(labelName) || labelName && !helpers.isStr(labelName)) return this;
    this.labels[labelName] = position.parseTimelinePosition(this, position$1);
    return this;
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {String} [propertyName]
   * @return {this}
   */
  remove(targets$1, propertyName) {
    composition.removeTargetsFromRenderable(targets.parseTargets(targets$1), this, propertyName);
    return this;
  }

  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === helpers.normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    const labels = this.labels;
    helpers.forEachChildren(this, (/** @type {JSAnimation} */child) => child.stretch(child.duration * timeScale));
    for (let labelName in labels) labels[labelName] *= timeScale;
    return super.stretch(newDuration);
  }

  /**
   * @return {this}
   */
  refresh() {
    helpers.forEachChildren(this, (/** @type {JSAnimation|Timer} */child) => {
      if (/** @type {JSAnimation} */(child).refresh) /** @type {JSAnimation} */(child).refresh();
    });
    return this;
  }

  /**
   * @return {this}
   */
  revert() {
    super.revert();
    helpers.forEachChildren(this, (/** @type {JSAnimation|Timer} */child) => child.revert, true);
    return styles.revertValues(this);
  }

  /**
   * @typedef {this & {then: null}} ResolvedTimeline
   */

  /**
   * @param  {Callback<ResolvedTimeline>} [callback]
   * @return Promise<this>
   */
  then(callback) {
    return super.then(callback);
  }
}

/**
 * @param {TimelineParams} [parameters]
 * @return {Timeline}
 */
const createTimeline = parameters => {
  if (globals.globals.editor) {
    return /** @type {Timeline} */(/** @type {unknown} */(globals.globals.editor.addTimeline(parameters)));
  }
  return new Timeline(parameters).init();
};

exports.Timeline = Timeline;
exports.createTimeline = createTimeline;

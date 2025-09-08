import {
  globals,
} from '../core/globals.js';

import {
  minValue,
  tickModes,
  compositionTypes,
} from '../core/consts.js';

import {
  isObj,
  isFnc,
  isUnd,
  isNum,
  isStr,
  addChild,
  forEachChildren,
  mergeObjects,
  clampInfinity,
  normalizeTime,
} from '../core/helpers.js';

import {
  setValue,
} from '../core/values.js';

import {
  parseTargets,
} from '../core/targets.js';

import {
  tick,
} from '../core/render.js';

import {
  cleanInlineStyles,
} from '../utils/target.js';

import {
  Timer,
} from '../timer/timer.js';

import {
  removeTargetsFromRenderable,
} from '../animation/composition.js';

import {
  JSAnimation,
} from '../animation/animation.js';

import {
  parseEase,
} from '../easings/eases.js';

import {
  parseTimelinePosition,
} from './position.js';

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
 * } from '../types/index.js'
*/

/**
 * @import {
 *   WAAPIAnimation,
 * } from '../waapi/waapi.js'
*/

/**
 * @param {Timeline} tl
 * @return {Number}
 */
function getTimelineTotalDuration(tl) {
  return clampInfinity(((tl.iterationDuration + tl._loopDelay) * tl.iterationCount) - tl._loopDelay) || minValue;
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
 * @param  {Number} [length]
 * @return {Timeline}
 *
 * @param  {TimerParams|AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} [targets]
 * @param  {Number} [index]
 * @param  {Number} [length]
 */
function addTlChild(childParams, tl, timePosition, targets, index, length) {
  const isSetter = isNum(childParams.duration) && /** @type {Number} */(childParams.duration) <= minValue;
  // Offset the tl position with -minValue for 0 duration animations or .set() calls in order to align their end value with the defined position
  const adjustedPosition = isSetter ? timePosition - minValue : timePosition;
  tick(tl, adjustedPosition, 1, 1, tickModes.AUTO);
  const tlChild = targets ?
    new JSAnimation(targets,/** @type {AnimationParams} */(childParams), tl, adjustedPosition, false, index, length) :
    new Timer(/** @type {TimerParams} */(childParams), tl, adjustedPosition);
  tlChild.init(1);
  // TODO: Might be better to insert at a position relative to startTime?
  addChild(tl, tlChild);
  forEachChildren(tl, (/** @type {Renderable} */child) => {
    const childTLOffset = child._offset + child._delay;
    const childDur = childTLOffset + child.duration;
    if (childDur > tl.iterationDuration) tl.iterationDuration = childDur;
  });
  tl.duration = getTimelineTotalDuration(tl);
  return tl;
}

export class Timeline extends Timer {

  /**
   * @param {TimelineParams} [parameters]
   */
  constructor(parameters = {}) {
    super(/** @type {TimerParams&TimelineParams} */(parameters), null, 0);
    /** @type {Number} */
    this.duration = 0; // TL duration starts at 0 and grows when adding children
    /** @type {Record<String, Number>} */
    this.labels = {};
    const defaultsParams = parameters.defaults;
    const globalDefaults = globals.defaults;
    /** @type {DefaultsParams} */
    this.defaults = defaultsParams ? mergeObjects(defaultsParams, globalDefaults) : globalDefaults;
    /** @type {Callback<this>} */
    this.onRender = parameters.onRender || globalDefaults.onRender;
    const tlPlaybackEase = setValue(parameters.playbackEase, globalDefaults.playbackEase);
    this._ease = tlPlaybackEase ? parseEase(tlPlaybackEase) : null;
    /** @type {Number} */
    this.iterationDuration = 0;
  }

  /**
   * @overload
   * @param {TargetsParam} a1
   * @param {AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>} [a3]
   * @return {this}
   *
   * @overload
   * @param {TimerParams} a1
   * @param {TimelinePosition} [a2]
   * @return {this}
   *
   * @param {TargetsParam|TimerParams} a1
   * @param {TimelinePosition|AnimationParams} a2
   * @param {TimelinePosition|StaggerFunction<Number|String>} [a3]
   */
  add(a1, a2, a3) {
    const isAnim = isObj(a2);
    const isTimer = isObj(a1);
    if (isAnim || isTimer) {
      this._hasChildren = true;
      if (isAnim) {
        const childParams = /** @type {AnimationParams} */(a2);
        // Check for function for children stagger positions
        if (isFnc(a3)) {
          const staggeredPosition = a3;
          const parsedTargetsArray = parseTargets(/** @type {TargetsParam} */(a1));
          // Store initial duration before adding new children that will change the duration
          const tlDuration = this.duration;
          // Store initial _iterationDuration before adding new children that will change the duration
          const tlIterationDuration = this.iterationDuration;
          // Store the original id in order to add specific indexes to the new animations ids
          const id = childParams.id;
          let i = 0;
          /** @type {Number} */
          const parsedLength = (parsedTargetsArray.length);
          parsedTargetsArray.forEach((/** @type {Target} */target) => {
            // Create a new parameter object for each staggered children
            const staggeredChildParams = { ...childParams };
            // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
            this.duration = tlDuration;
            this.iterationDuration = tlIterationDuration;
            if (!isUnd(id)) staggeredChildParams.id = id + '-' + i;
            addTlChild(
              staggeredChildParams,
              this,
              parseTimelinePosition(this, staggeredPosition(target, i, parsedLength, this)),
              target,
              i,
              parsedLength
            );
            i++;
          });
        } else {
          addTlChild(
            childParams,
            this,
            parseTimelinePosition(this, a3),
            /** @type {TargetsParam} */(a1),
          );
        }
      } else {
        // It's a Timer
        addTlChild(
          /** @type TimerParams */(a1),
          this,
          parseTimelinePosition(this,a2),
        );
      }
      return this.init(1); // 1 = internalRender
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
    if (isUnd(synced) || synced && isUnd(synced.pause)) return this;
    synced.pause();
    const duration = +(/** @type {globalThis.Animation} */(synced).effect ? /** @type {globalThis.Animation} */(synced).effect.getTiming().duration : /** @type {Tickable} */(synced).duration);
    return this.add(synced, { currentTime: [0, duration], duration, ease: 'linear' }, position);
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {AnimationParams} parameters
   * @param  {TimelinePosition} [position]
   * @return {this}
   */
  set(targets, parameters, position) {
    if (isUnd(parameters)) return this;
    parameters.duration = minValue;
    parameters.composition = compositionTypes.replace;
    return this.add(targets, parameters, position);
  }

  /**
   * @param {Callback<Timer>} callback
   * @param {TimelinePosition} [position]
   * @return {this}
   */
  call(callback, position) {
    if (isUnd(callback) || callback && !isFnc(callback)) return this;
    return this.add({ duration: 0, onComplete: () => callback(this) }, position);
  }

  /**
   * @param {String} labelName
   * @param {TimelinePosition} [position]
   * @return {this}
   *
   */
  label(labelName, position) {
    if (isUnd(labelName) || labelName && !isStr(labelName)) return this;
    this.labels[labelName] = parseTimelinePosition(this, position);
    return this;
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {String} [propertyName]
   * @return {this}
   */
  remove(targets, propertyName) {
    removeTargetsFromRenderable(parseTargets(targets), this, propertyName);
    return this;
  }

  /**
   * @param  {Number} newDuration
   * @return {this}
   */
  stretch(newDuration) {
    const currentDuration = this.duration;
    if (currentDuration === normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    const labels = this.labels;
    forEachChildren(this, (/** @type {JSAnimation} */child) => child.stretch(child.duration * timeScale));
    for (let labelName in labels) labels[labelName] *= timeScale;
    return super.stretch(newDuration);
  }

  /**
   * @return {this}
   */
  refresh() {
    forEachChildren(this, (/** @type {JSAnimation} */child) => {
      if (child.refresh) child.refresh();
    });
    return this;
  }

  /**
   * @return {this}
   */
  revert() {
    super.revert();
    forEachChildren(this, (/** @type {JSAnimation} */child) => child.revert, true);
    return cleanInlineStyles(this);
  }

  /**
   * @param  {(value?: any) => any} [callback]
   * @return {PromiseLike<any>}
   */
  then(callback) {
    return super.then(callback);
  }
}

/**
 * @param {TimelineParams} [parameters]
 * @return {Timeline}
 */
export const createTimeline = parameters => new Timeline(parameters).init();

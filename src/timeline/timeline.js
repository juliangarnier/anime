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
  revertValues,
} from '../core/styles.js';

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
} from '../easings/eases/parser.js';

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
  const isSetter = isNum(childParams.duration) && /** @type {Number} */(childParams.duration) <= minValue;
  // Offset the tl position with -minValue for 0 duration animations or .set() calls in order to align their end value with the defined position
  const adjustedPosition = isSetter ? timePosition - minValue : timePosition;
  if (tl.composition) tick(tl, adjustedPosition, 1, 1, tickModes.AUTO);
  const tlChild = targets ?
    new JSAnimation(targets,/** @type {AnimationParams} */(childParams), tl, adjustedPosition, false, index, allTargets) :
    new Timer(/** @type {TimerParams} */(childParams), tl, adjustedPosition);
  if (tl.composition) tlChild.init(true);
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

let TLId = 0;

export class Timeline extends Timer {

  /**
   * @param {TimelineParams} [parameters]
   */
  constructor(parameters = {}) {
    super(/** @type {TimerParams&TimelineParams} */(parameters), null, 0);
    ++TLId;
    /** @type {String|Number} */
    this.id = !isUnd(parameters.id) ? parameters.id : TLId;
    /** @type {Number} */
    this.duration = 0; // TL duration starts at 0 and grows when adding children
    /** @type {Record<String, Number>} */
    this.labels = {};
    const defaultsParams = parameters.defaults;
    const globalDefaults = globals.defaults;
    /** @type {DefaultsParams} */
    this.defaults = defaultsParams ? mergeObjects(defaultsParams, globalDefaults) : globalDefaults;
    /** @type {Boolean} */
    this.composition = setValue(parameters.composition, true);
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
    const isAnim = isObj(a2);
    const isTimer = isObj(a1);
    if (isAnim || isTimer) {
      this._hasChildren = true;
      if (isAnim) {
        const childParams = /** @type {AnimationParams} */(a2);
        const editorHook = globals.editor && globals.editor.addTimelineChild;
        const isStaggerType = a3 && /** @type {TweakRegister} */(a3).type === 'Stagger' && globals.editor;
        // Check for function or Stagger type children positions
        const staggeredPosition = isFnc(a3) ? a3 : null;
        if (staggeredPosition || isStaggerType) {
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
          // Call editor hook once for the entire stagger group instead of per target
          const resolvedParams = editorHook ? editorHook(/** @type {TargetsParam} */(a1), childParams, this.id, a3, parsedLength) : null;
          // Resolve stagger AFTER editor hook so tweaked position value (a3.defaultValue) is used
          const staggerFn = staggeredPosition || globals.editor.resolveStagger(/** @type {TweakRegister} */(a3).defaultValue);
          parsedTargetsArray.forEach((/** @type {Target} */target) => {
            // Create a new parameter object for each staggered children
            const staggeredChildParams = { ...(resolvedParams || childParams) };
            // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
            this.duration = tlDuration;
            this.iterationDuration = tlIterationDuration;
            if (!isUnd(id)) staggeredChildParams.id = id + '-' + i;
            const staggeredTimePosition = parseTimelinePosition(this, staggerFn(target, i, parsedTargetsArray, null, this));
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
            parseTimelinePosition(this, resolvedPosition),
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
    if (isUnd(synced) || synced && isUnd(synced.pause)) return this;
    synced.pause();
    const duration = +(/** @type {globalThis.Animation} */(synced).effect ? /** @type {globalThis.Animation} */(synced).effect.getTiming().duration : /** @type {Tickable} */(synced).duration);
    // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
    if (!isUnd(synced) && !isUnd(/** @type {WAAPIAnimation} */(synced).persist)) {
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
    return this.add({ duration: 0, delay: 0, onComplete: () => callback(this) }, position);
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
    forEachChildren(this, (/** @type {JSAnimation|Timer} */child) => {
      if (/** @type {JSAnimation} */(child).refresh) /** @type {JSAnimation} */(child).refresh();
    });
    return this;
  }

  /**
   * @return {this}
   */
  revert() {
    super.revert();
    forEachChildren(this, (/** @type {JSAnimation|Timer} */child) => child.revert, true);
    return revertValues(this);
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
export const createTimeline = parameters => {
  if (globals.editor) {
    return /** @type {Timeline} */(/** @type {unknown} */(globals.editor.addTimeline(parameters)));
  }
  return new Timeline(parameters).init();
};

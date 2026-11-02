/**
 * Anime.js - timeline - CJS
 * @version v5.0.0-beta.3
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
var composition$1 = require('./composition.cjs');

/**
 * @import {
 *   TargetsParam,
 *   Tween,
 *   Callback,
 *   Tickable,
 *   TimerParams,
 *   AnimationParams,
 *   Target,
 *   TimelineParams,
 *   TimelineMarkerParams,
 *   TimelineCallParams,
 *   TimelineSyncParams,
 *   TimelineSyncTarget,
 *   DefaultsParams,
 *   TimelinePosition,
 *   StaggerFunction,
 *   TargetsArray,
 *   TweakRegister,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   WAAPIAnimation,
 * } from '../waapi/waapi.js'
 *
 * @import {
 *   Takeover,
 * } from './composition.js'
*/

/**
 * @overload
 * @param  {TimerParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @return {Timer|JSAnimation}
 *
 * @overload
 * @param  {AnimationParams} childParams
 * @param  {Timeline} tl
 * @param  {Number} timePosition
 * @param  {TargetsParam} targets
 * @param  {Number} [index]
 * @param  {TargetsArray} [allTargets]
 * @return {Timer|JSAnimation}
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
  const tlChild = targets ?
    new animation.JSAnimation(targets,/** @type {AnimationParams} */(childParams), tl, adjustedPosition, false, index, allTargets) :
    new timer.Timer(/** @type {TimerParams} */(childParams), tl, adjustedPosition);
  composition$1.restoreSampledAnimation();
  if (tl.composition) tlChild.init(true);
  // Render the from value of a tween that owns its property first, so it shows before the timeline reaches it.
  for (let tween = targets ? /** @type {JSAnimation} */(tlChild)._head : null; tween; tween = tween._next) {
    if (tween._fromFunc && !tween._isOverridden && tween._keyStart === -Infinity) {
      render.render(tlChild, 0, 1, 0, consts.tickModes.FORCE);
      break;
    }
  }
  // TODO: Might be better to insert at a position relative to startTime?
  helpers.addChild(tl, tlChild);
  position.updateTimelineDuration(tl, Math.max(tl.iterationDuration, tlChild._offset + tlChild._delay + tlChild.duration));
  return tlChild;
}

/**
 * The first add starts the timeline, and an add after the timeline began plays it again from the start.
 * An init on every add rendered all the children each time, 50 times slower to add 1,000 children.
 * A stagger position adds one child per target, so the first add can leave more than one child.
 * @param {Timeline} tl
 * @param {Timer|null} [firstAdded]
 */
function initAfterAdd(tl, firstAdded) {
  if (tl.composition && (tl.began || tl._head === firstAdded)) tl.init(true);
}

/**
 * Adds an animation without the editor registration hook.
 * @param {Timeline} tl
 * @param {TargetsParam} targets
 * @param {AnimationParams} childParams
 * @param {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} position
 * @param {Timer[]} [added]
 * @return {Timer|null} The first added child
 */
function addTlAnimation(tl, targets$1, childParams, position$1, added) {
  // Expand a function position to one child per target, a tagged stagger resolves itself.
  const staggeredPosition = helpers.isFnc(position$1) ? position$1 : null;
  if (staggeredPosition) {
    const parsedTargetsArray = targets.parseTargets(targets$1);
    // Store initial duration before adding new children that will change the duration
    const tlDuration = tl.duration;
    // Store initial _iterationDuration before adding new children that will change the duration
    const tlIterationDuration = tl.iterationDuration;
    // Store the original id in order to add specific indexes to the new animations ids
    const id = childParams.id;
    let i = 0;
    // Stays null without targets, the empty timeline then starts as before.
    let firstAdded = null;
    parsedTargetsArray.forEach((/** @type {Target} */target) => {
      // Create a new parameter object for each staggered children
      const staggeredChildParams = { ...childParams };
      // Reset the duration of the timeline iteration before each stagger to prevent wrong start value calculation
      tl.duration = tlDuration;
      tl.iterationDuration = tlIterationDuration;
      if (!helpers.isUnd(id)) staggeredChildParams.id = id + '-' + i;
      const staggeredTimePosition = position.parseTimelinePosition(tl, staggeredPosition(target, i, parsedTargetsArray, null, tl));
      const child = addTlChild(
        staggeredChildParams,
        tl,
        staggeredTimePosition,
        target,
        i,
        parsedTargetsArray,
      );
      if (added) added.push(child);
      if (!i) firstAdded = child;
      i++;
    });
    // Scan the duration once at the end, position callbacks ran on the original duration and can stretch or add children.
    position.updateTimelineDuration(tl);
    return firstAdded;
  } else {
    // A tweak register position resolves to its default value
    const resolvedPosition = position$1 && /** @type {TweakRegister} */(position$1).type ? /** @type {TweakRegister} */(position$1).defaultValue : position$1;
    const child = addTlChild(
      childParams,
      tl,
      position.parseTimelinePosition(tl, resolvedPosition),
      targets$1,
    );
    if (added) added.push(child);
    return child;
  }
}

/**
 * Adds one synced child.
 * @param {Timeline} tl
 * @param {Tickable|WAAPIAnimation|globalThis.Animation} child
 * @param {TimelinePosition|StaggerFunction<Number|String>} position
 * @param {Boolean} muted
 * @param {String|Number} [id]
 * @param {Timer[]} [added]
 */
function syncChild(tl, child, position, muted, id, added) {
  if (helpers.isUnd(child) || child && helpers.isUnd(child.pause)) return;
  muted = tl.muted || values.setValue(muted, tl.defaults.muted);
  if (!muted) child.pause();
  const duration = +(/** @type {globalThis.Animation} */(child).effect ? /** @type {globalThis.Animation} */(child).effect.getTiming().duration : /** @type {Tickable} */(child).duration);
  // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
  if (!muted && !helpers.isUnd(/** @type {WAAPIAnimation} */(child).persist)) /** @type {WAAPIAnimation} */(child).persist = true;
  tl._hasChildren = true;
  initAfterAdd(tl, addTlAnimation(tl, child, { id, muted, currentTime: [0, duration], duration, delay: 0, ease: 'linear', playbackEase: 'linear' }, position, added));
}

/**
 * Adds a timer without the editor registration hook.
 * @param {Timeline} tl
 * @param {TimerParams} parameters
 * @param {TimelinePosition} position
 */
function addTlTimer(tl, parameters, position$1) {
  tl._hasChildren = true;
  const child = addTlChild(parameters, tl, position.parseTimelinePosition(tl, position$1));
  initAfterAdd(tl, child);
  return child;
}

let TLId = 0;

class Timeline extends timer.Timer {

  /**
   * @param {TimelineParams} [parameters]
   */
  constructor(parameters = {}) {
    super(/** @type {TimerParams&TimelineParams} */(parameters), null, 0);
    /** @type {Tickable} */
    this._head;
    /** @type {Tickable} */
    this._tail;
    ++TLId;
    /** @type {String|Number} */
    this.id = !helpers.isUnd(parameters.id) ? parameters.id : TLId;
    /** @type {Number} */
    this.duration = 0; // TL duration starts at 0 and grows when adding children
    /** @type {Record<String, Number>} */
    this.labels = Object.create(null);
    const defaultsParams = parameters.defaults;
    const globalDefaults = globals.globals.defaults;
    /** @type {DefaultsParams} */
    this.defaults = defaultsParams ? helpers.mergeObjects(defaultsParams, globalDefaults) : globalDefaults;
    /** @type {Boolean} */
    this.composition = values.setValue(parameters.composition, true);
    // Swap onRender for noop once so render never tests a mute flag.
    /** @type {Callback<this>} */
    this.onRender = this.muted ? consts.noop : parameters.onRender || globalDefaults.onRender;
    const tlPlaybackEase = values.setValue(parameters.playbackEase, globalDefaults.playbackEase);
    this._ease = tlPlaybackEase ? parser.parseEase(tlPlaybackEase) : null;
    /** @type {Array<Takeover>} */
    this._takeovers = [];
    /** @type {Number} */
    this._takeoverIndex = 0;
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
        // Let the editor add the child from its records when it answers true, its builder calls addTlAnimation itself.
        if (editorHook && editorHook(this, /** @type {TargetsParam} */(a1), childParams, a3, (targets, params, position) => {
          const added = [];
          initAfterAdd(this, addTlAnimation(this, targets, params, position, added));
          return added;
        })) return this;
        initAfterAdd(this, addTlAnimation(this, /** @type {TargetsParam} */(a1), childParams, a3));
      } else {
        // It's a Timer
        const editorHook = globals.globals.editor && globals.globals.editor.addTimelineTimer;
        const timerPosition = /** @type {TimelinePosition} */(a2);
        if (editorHook) editorHook(a1, timerPosition, this, (params, position = timerPosition) => [addTlTimer(this, params, position)]);
        else addTlTimer(this, /** @type {TimerParams} */(a1), timerPosition);
      }
      return this;
    }
  }

  /**
   * Schedules a timer or animation on this timeline. Pass a target, an array of targets,
   * or an object with `target`, optional `id`, and optional `muted` properties.
   * @param {TimelineSyncTarget|Array<TimelineSyncTarget>|TimelineSyncParams} [synced]
   * @param {TimelinePosition|StaggerFunction<Number|String>} [position]
   * @return {this}
   */
  sync(synced, position) {
    const parameters = /** @type {TimelineSyncParams} */(
      helpers.isObj(synced) && Object.hasOwn(synced, 'target') && !helpers.isFnc(/** @type {TimelineSyncTarget} */(synced).pause)
        ? synced : { target: synced }
    );
    const target = parameters.target;
    const multiple = helpers.isArr(target);
    if (helpers.isUnd(target) || !multiple && target && helpers.isUnd(target.pause)) return this;
    /**
     * @param {TimelinePosition|StaggerFunction<Number|String>} resolved
     * @param {TimelineSyncParams} [options]
     */
    const build = (resolved, options = parameters) => {
      /** @type {Timer[]} */
      const added = [];
      if (multiple) {
        const children = /** @type {Array<Tickable|WAAPIAnimation|globalThis.Animation>} */(target);
        // Resolve a function position per synced child against this timeline.
        for (let i = 0, l = children.length; i < l; i++) {
          const child = /** @type {Tickable} */(children[i]);
          const childPosition = /** @type {TimelinePosition} */(helpers.isFnc(resolved) ? resolved(child, i, children, null, this) : resolved);
          syncChild(this, child, childPosition, options.muted, undefined, added);
        }
      } else {
        syncChild(this, /** @type {Tickable|WAAPIAnimation|globalThis.Animation} */(target), resolved, options.muted, options.id, added);
      }
      return added;
    };
    const editor = globals.globals.editor;
    const syncHook = editor && editor.addTimelineSync;
    if (syncHook) syncHook(target, parameters, position, this, build);
    else build(position);
    return this;
  }

  /**
   * @param  {TargetsParam} targets
   * @param  {AnimationParams} parameters
   * @param  {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [position]
   * @return {this}
   */
  set(targets, parameters, position) {
    if (helpers.isUnd(parameters)) return this;
    parameters.duration = consts.minValue;
    parameters.composition = consts.compositionTypes.replace;
    return this.add(targets, parameters, position);
  }

  /**
   * Schedules a callback at a timeline position. Pass a callback directly or an object
   * with `callback`, optional `id`, and optional `muted` properties.
   * @param {Callback<this, void>|TimelineCallParams<this>} callback
   * @param {TimelinePosition} [position]
   * @return {this}
   */
  call(callback, position) {
    const parameters = /** @type {TimelineCallParams<this>} */(helpers.isObj(callback) ? callback : {});
    const onComplete = helpers.isFnc(callback) ? callback : parameters.callback;
    if (!helpers.isFnc(onComplete)) return this;
    /**
     * @param {TimelinePosition} resolved
     * @param {TimelineMarkerParams} [options]
     */
    const build = (resolved, options = parameters) => [addTlTimer(this, {
      id: options.id, muted: options.muted, duration: 0, delay: 0, onComplete: () => onComplete(this),
    }, resolved)];
    const editor = globals.globals.editor;
    if (editor && editor.addTimelineCall) editor.addTimelineCall(onComplete, parameters, position, this, build);
    else build(position);
    return this;
  }

  /**
   * Names a timeline position for use in later additions. Reusing a name updates its position.
   * @param {String} labelName
   * @param {TimelinePosition} [position]
   * @return {this}
   */
  label(labelName, position$1) {
    if (helpers.isUnd(labelName) || labelName && !helpers.isStr(labelName)) return this;
    const editor = globals.globals.editor;
    if (editor && editor.addTimelineLabel) position$1 = editor.addTimelineLabel(labelName, position$1, this);
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
    // Rebuild the takeovers when the removal can change which child owns a shared property.
    // A rebuild on every removal made remove 2.3 times slower on 1,000 children.
    if (this._takeovers.length) composition$1.rebuildTimelineTakeovers(this);
    return this;
  }

  /**
   * @param  {Number} newDuration
   * @param  {Boolean} [isParentStretch]
   * @return {this}
   */
  stretch(newDuration, isParentStretch) {
    const currentDuration = this.duration;
    if (currentDuration === helpers.normalizeTime(newDuration)) return this;
    const timeScale = newDuration / currentDuration;
    const labels = this.labels;
    helpers.forEachChildren(this, (/** @type {JSAnimation} */child) => child.stretch(child.duration * timeScale, true));
    for (let labelName in labels) labels[labelName] *= timeScale;
    for (let i = 0, takeovers = this._takeovers, l = takeovers.length; i < l; i++) takeovers[i].time *= timeScale;
    return super.stretch(newDuration, isParentStretch);
  }

  // The core reaches the timeline code through these methods so an import of animate alone leaves it out.

  /**
   * @internal
   * @param {Number} time
   * @param {Number} muteCallbacks
   * @param {Number} internalRender
   * @param {tickModes} tickMode
   * @param {Number} previousIteration The iteration of the timeline before its own render
   */
  renderChildren(time, muteCallbacks, internalRender, tickMode, previousIteration) {
    const tlIsRunningBackwards = this.backwards;
    const tlChildrenTime = internalRender ? time : this._iterationTime;
    const tlChildrenTickTime = helpers.now();

    let tlChildrenHasRendered = 0;
    let tlChildrenHaveCompleted = true;

    // If the timeline has looped forward, we need to manually triggers children skipped callbacks
    if (!internalRender && this._currentIteration !== previousIteration) {
      const tlIterationDuration = this.iterationDuration;
      helpers.forEachChildren(this, (/** @type {JSAnimation} */child) => {
        if (!tlIsRunningBackwards) {
          // Force a render to trigger the callbacks and write the end values if the child has not completed on loop
          if (!child.completed && !child.backwards && child._currentTime < child.iterationDuration) {
            render.render(child, tlIterationDuration, muteCallbacks, 0, consts.tickModes.FORCE);
          }
          // Reset their began and completed flags to allow retrigering callbacks on the next iteration
          child.began = false;
          child.completed = false;
        } else {
          const childDuration = child.duration;
          const childStartTime = child._offset + child._delay;
          const childEndTime = childStartTime + childDuration;
          // Triggers the onComplete callback on reverse for children on the edges of the timeline
          if (!muteCallbacks && childDuration <= consts.minValue && (!childStartTime || childEndTime === tlIterationDuration)) {
            child.onComplete(child);
          }
        }
      });
      if (!muteCallbacks) this.onLoop(this);
    }

    // Give each property to the tween that owns it at this time before the children render.
    if (!internalRender && this._takeovers.length) composition$1.updateTimelineTakeovers(this, tlChildrenTime);
    const tlTakeoverIndex = this._takeoverIndex;

    // Save next before the render, a render can remove the current child.
    let child = /** @type {JSAnimation} */(tlIsRunningBackwards ? this._tail : this._head);
    while (child) {
      const next = /** @type {JSAnimation} */(tlIsRunningBackwards ? child._prev : child._next);
      const childTime = helpers.round((tlChildrenTime - child._offset) * child._speed, 12); // Rounding is needed when using seconds
      const childTickMode = child._fps < this._fps ? child.requestTick(tlChildrenTickTime) : tickMode;
      // Update the owners again after a callback of a child that seeks the timeline or another child.
      if (this._takeoverIndex !== tlTakeoverIndex) composition$1.updateTimelineTakeovers(this, tlChildrenTime);
      tlChildrenHasRendered += render.render(child, childTime, muteCallbacks, internalRender, childTickMode);
      if (!child.completed) tlChildrenHaveCompleted = false;
      child = next;
    }

    tlChildrenHasRendered += composition$1.renderChangedOwners(muteCallbacks);


    // Renders on timeline are triggered by its children so it needs to be set after rendering the children
    if (!muteCallbacks && tlChildrenHasRendered) this.onRender(this);
    // Triggers the timeline onComplete() once all chindren all completed and the current time has reached the end
    if ((tlChildrenHaveCompleted || tlIsRunningBackwards) && this._currentTime >= this.duration) {
      // Make sure the paused flag is false in case it has been skipped in the render function
      this.paused = true;
      if (!this.completed) {
        this.completed = true;
        if (!muteCallbacks) {
          this.onComplete(this);
          this._resolve(this);
        }
      }
    }
  }

  /**
   * @internal
   * @param {Number} time
   */
  updateTakeovers(time) {
    composition$1.updateTimelineTakeovers(this, time);
  }

  /**
   * @internal
   * @param  {Tween} sibling
   * @param  {JSAnimation} animation
   * @param  {Number} tweenStartTime
   * @return {Tween}
   */
  getPreviousSibling(sibling, animation, tweenStartTime) {
    return composition$1.getPreviousTimelineSibling(sibling, animation, tweenStartTime);
  }

  /**
   * @internal
   * @param {JSAnimation} child
   * @param {JSAnimation} newChild
   * @param {Number} time
   */
  sampleChild(child, newChild, time) {
    composition$1.sampleAnimation(child, newChild, time);
  }

  /**
   * @internal
   * @param {Tween} tween
   * @param {Tween} prevSibling
   * @param {Number} tweenStartTime
   */
  composeTween(tween, prevSibling, tweenStartTime) {
    composition$1.composeTimelineTween(tween, prevSibling, tweenStartTime);
  }

  /**
   * @internal
   * @param {Tween} tween
   */
  removeTakeover(tween) {
    composition$1.removeTimelineTakeover(tween);
  }

  /** @internal */
  rebuildTakeovers() {
    composition$1.rebuildTimelineTakeovers(this);
  }

  /**
   * Updates the duration and the takeovers after a child stretches alone.
   * @internal
   */
  updateStretchedChild() {
    position.updateTimelineDuration(this);
    composition$1.rebuildTimelineTakeovers(this);
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
   * @param {Boolean} [render] Pass false to restore the values without rendering the timeline at 0
   * @return {this}
   */
  revert(render = true) {
    super.revert(render);
    // Traverse the children once with revertValues, it restores every child value.
    return styles.revertValues(this);
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

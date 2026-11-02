export class Timeline extends Timer {
    /**
     * @param {TimelineParams} [parameters]
     */
    constructor(parameters?: TimelineParams);
    /** @type {Tickable} */
    _head: Tickable;
    /** @type {Tickable} */
    _tail: Tickable;
    /** @type {Record<String, Number>} */
    labels: Record<string, number>;
    /** @type {DefaultsParams} */
    defaults: DefaultsParams;
    /** @type {Boolean} */
    composition: boolean;
    /** @type {Callback<this>} */
    onRender: Callback<this>;
    _ease: import("../types/index.js").EasingFunction;
    /** @type {Array<Takeover>} */
    _takeovers: Array<Takeover>;
    /** @type {Number} */
    _takeoverIndex: number;
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
    add(a1: TargetsParam, a2: AnimationParams, a3?: TimelinePosition | StaggerFunction<number | string> | TweakRegister): this;
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
    add(a1: TimerParams, a2?: TimelinePosition): this;
    /**
     * Schedules a timer or animation on this timeline. Pass a target, an array of targets,
     * or an object with `target`, optional `id`, and optional `muted` properties.
     * @param {TimelineSyncTarget|Array<TimelineSyncTarget>|TimelineSyncParams} [synced]
     * @param {TimelinePosition|StaggerFunction<Number|String>} [position]
     * @return {this}
     */
    sync(synced?: TimelineSyncTarget | Array<TimelineSyncTarget> | TimelineSyncParams, position?: TimelinePosition | StaggerFunction<number | string>): this;
    /**
     * @param  {TargetsParam} targets
     * @param  {AnimationParams} parameters
     * @param  {TimelinePosition|StaggerFunction<Number|String>|TweakRegister} [position]
     * @return {this}
     */
    set(targets: TargetsParam, parameters: AnimationParams, position?: TimelinePosition | StaggerFunction<number | string> | TweakRegister): this;
    /**
     * Schedules a callback at a timeline position. Pass a callback directly or an object
     * with `callback`, optional `id`, and optional `muted` properties.
     * @param {Callback<this, void>|TimelineCallParams<this>} callback
     * @param {TimelinePosition} [position]
     * @return {this}
     */
    call(callback: Callback<this, void> | TimelineCallParams<this>, position?: TimelinePosition): this;
    /**
     * Names a timeline position for use in later additions. Reusing a name updates its position.
     * @param {String} labelName
     * @param {TimelinePosition} [position]
     * @return {this}
     */
    label(labelName: string, position?: TimelinePosition): this;
    /**
     * @param  {TargetsParam} targets
     * @param  {String} [propertyName]
     * @return {this}
     */
    remove(targets: TargetsParam, propertyName?: string): this;
    /**
     * @param  {Number} newDuration
     * @param  {Boolean} [isParentStretch]
     * @return {this}
     */
    stretch(newDuration: number, isParentStretch?: boolean): this;
    /**
     * @internal
     * @param {Number} time
     * @param {Number} muteCallbacks
     * @param {Number} internalRender
     * @param {tickModes} tickMode
     * @param {Number} previousIteration The iteration of the timeline before its own render
     */
    renderChildren(time: number, muteCallbacks: number, internalRender: number, tickMode: tickModes, previousIteration: number): void;
    /**
     * @internal
     * @param {Number} time
     */
    updateTakeovers(time: number): void;
    /**
     * @internal
     * @param  {Tween} sibling
     * @param  {JSAnimation} animation
     * @param  {Number} tweenStartTime
     * @return {Tween}
     */
    getPreviousSibling(sibling: Tween, animation: JSAnimation, tweenStartTime: number): Tween;
    /**
     * @internal
     * @param {JSAnimation} child
     * @param {JSAnimation} newChild
     * @param {Number} time
     */
    sampleChild(child: JSAnimation, newChild: JSAnimation, time: number): void;
    /**
     * @internal
     * @param {Tween} tween
     * @param {Tween} prevSibling
     * @param {Number} tweenStartTime
     */
    composeTween(tween: Tween, prevSibling: Tween, tweenStartTime: number): void;
    /**
     * @internal
     * @param {Tween} tween
     */
    removeTakeover(tween: Tween): void;
    /** @internal */
    rebuildTakeovers(): void;
    /**
     * Updates the duration and the takeovers after a child stretches alone.
     * @internal
     */
    updateStretchedChild(): void;
    /**
     * @return {this}
     */
    refresh(): this;
    /**
     * @param {Boolean} [render] Pass false to restore the values without rendering the timeline at 0
     * @return {this}
     */
    revert(render?: boolean): this;
}
export function createTimeline(parameters?: TimelineParams): Timeline;
import { Timer } from '../timer/timer.js';
import type { Tickable } from '../types/index.js';
import type { DefaultsParams } from '../types/index.js';
import type { Callback } from '../types/index.js';
import type { Takeover } from './composition.js';
import type { TargetsParam } from '../types/index.js';
import type { AnimationParams } from '../types/index.js';
import type { TimelinePosition } from '../types/index.js';
import type { StaggerFunction } from '../types/index.js';
import type { TweakRegister } from '../types/index.js';
import type { TimerParams } from '../types/index.js';
import type { TimelineSyncTarget } from '../types/index.js';
import type { TimelineSyncParams } from '../types/index.js';
import type { TimelineCallParams } from '../types/index.js';
import { tickModes } from '../core/consts.js';
import type { Tween } from '../types/index.js';
import { JSAnimation } from '../animation/animation.js';
import type { TimelineParams } from '../types/index.js';

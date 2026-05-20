export class Timeline extends Timer {
    /**
     * @param {TimelineParams} [parameters]
     */
    constructor(parameters?: TimelineParams);
    /** @type {Record<String, Number>} */
    labels: Record<string, number>;
    /** @type {DefaultsParams} */
    defaults: DefaultsParams;
    /** @type {Boolean} */
    composition: boolean;
    /** @type {Callback<this>} */
    onRender: Callback<this>;
    _ease: import("../types/index.js").EasingFunction;
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
    sync(synced?: Tickable, position?: TimelinePosition): this;
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
    sync(synced?: globalThis.Animation, position?: TimelinePosition): this;
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
    sync(synced?: WAAPIAnimation, position?: TimelinePosition): this;
    /**
     * @param  {TargetsParam} targets
     * @param  {AnimationParams} parameters
     * @param  {TimelinePosition} [position]
     * @return {this}
     */
    set(targets: TargetsParam, parameters: AnimationParams, position?: TimelinePosition): this;
    /**
     * @param {Callback<Timer>} callback
     * @param {TimelinePosition} [position]
     * @return {this}
     */
    call(callback: Callback<Timer>, position?: TimelinePosition): this;
    /**
     * @param {String} labelName
     * @param {TimelinePosition} [position]
     * @return {this}
     *
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
     * @return {this}
     */
    stretch(newDuration: number): this;
    /**
     * @return {this}
     */
    refresh(): this;
    /**
     * @return {this}
     */
    revert(): this;
    /**
     * @typedef {this & {then: null}} ResolvedTimeline
     */
    /**
     * @param  {Callback<ResolvedTimeline>} [callback]
     * @return Promise<this>
     */
    then(callback?: Callback<this & {
        then: null;
    }>): Promise<any>;
}
export function createTimeline(parameters?: TimelineParams): Timeline;
import { Timer } from '../timer/timer.js';
import type { DefaultsParams } from '../types/index.js';
import type { Callback } from '../types/index.js';
import type { TargetsParam } from '../types/index.js';
import type { AnimationParams } from '../types/index.js';
import type { TimelinePosition } from '../types/index.js';
import type { StaggerFunction } from '../types/index.js';
import type { TweakRegister } from 'tweaks';
import type { TimerParams } from '../types/index.js';
import type { Tickable } from '../types/index.js';
import type { WAAPIAnimation } from '../waapi/waapi.js';
import type { TimelineParams } from '../types/index.js';

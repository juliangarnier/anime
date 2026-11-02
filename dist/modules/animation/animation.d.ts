export class JSAnimation extends Timer {
    /**
     * @param {TargetsParam} targets
     * @param {AnimationParams} parameters
     * @param {Timeline} [parent]
     * @param {Number} [parentPosition]
     * @param {Boolean} [fastSet=false]
     * @param {Number} [index=0]
     * @param {TargetsArray} [allTargets]
     */
    constructor(targets: TargetsParam, parameters: AnimationParams, parent?: Timeline, parentPosition?: number, fastSet?: boolean, index?: number, allTargets?: TargetsArray);
    /** @type {Tween} */
    _head: Tween;
    /** @type {Tween} */
    _tail: Tween;
    /** @type {Boolean} */
    _hasSharedProgress: boolean;
    /** @type {Boolean} */
    _hasSimpleTweens: boolean;
    /** @type {TargetsArray} */
    targets: TargetsArray;
    /** @type {Callback<this>} */
    onRender: Callback<this>;
    /** @type {EasingFunction} */
    _ease: EasingFunction;
    /**
     * @param  {Number} newDuration
     * @param  {Boolean} [isParentStretch]
     * @return {this}
     */
    stretch(newDuration: number, isParentStretch?: boolean): this;
    /**
     * @return {this}
     */
    refresh(): this;
    /**
     * Cancel the animation and revert all the values affected by this animation to their original state
     * @param {Boolean} [render] Pass false to restore the values without rendering the animation at 0
     * @return {this}
     */
    revert(render?: boolean): this;
}
export function animate(targets: TargetsParam, parameters: AnimationParams): JSAnimation;
import { Timer } from '../timer/timer.js';
import type { Tween } from '../types/index.js';
import type { TargetsArray } from '../types/index.js';
import type { Callback } from '../types/index.js';
import type { EasingFunction } from '../types/index.js';
import type { TargetsParam } from '../types/index.js';
import type { AnimationParams } from '../types/index.js';
import type { Timeline } from '../timeline/timeline.js';

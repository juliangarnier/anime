/**
 * @import {
 *   EasingFunction,
 *   EasingFunctionWithParams,
 *   EasingParam,
 *   BackEasing,
 *   ElasticEasing,
 *   PowerEasing,
 * } from '../../types/index.js'
*/
/** @type {PowerEasing} */
export const easeInPower: PowerEasing;
/**
 * @callback EaseType
 * @param {EasingFunction} Ease
 * @return {EasingFunction}
 */
/** @type {Record<String, EaseType>} */
export const easeTypes: Record<string, EaseType>;
/**
 * @typedef  {Object} EasesFunctions
 * @property {EasingFunction} linear
 * @property {EasingFunction} none
 * @property {PowerEasing} in
 * @property {PowerEasing} out
 * @property {PowerEasing} inOut
 * @property {PowerEasing} outIn
 * @property {EasingFunction} inQuad
 * @property {EasingFunction} outQuad
 * @property {EasingFunction} inOutQuad
 * @property {EasingFunction} outInQuad
 * @property {EasingFunction} inCubic
 * @property {EasingFunction} outCubic
 * @property {EasingFunction} inOutCubic
 * @property {EasingFunction} outInCubic
 * @property {EasingFunction} inQuart
 * @property {EasingFunction} outQuart
 * @property {EasingFunction} inOutQuart
 * @property {EasingFunction} outInQuart
 * @property {EasingFunction} inQuint
 * @property {EasingFunction} outQuint
 * @property {EasingFunction} inOutQuint
 * @property {EasingFunction} outInQuint
 * @property {EasingFunction} inSine
 * @property {EasingFunction} outSine
 * @property {EasingFunction} inOutSine
 * @property {EasingFunction} outInSine
 * @property {EasingFunction} inCirc
 * @property {EasingFunction} outCirc
 * @property {EasingFunction} inOutCirc
 * @property {EasingFunction} outInCirc
 * @property {EasingFunction} inExpo
 * @property {EasingFunction} outExpo
 * @property {EasingFunction} inOutExpo
 * @property {EasingFunction} outInExpo
 * @property {EasingFunction} inBounce
 * @property {EasingFunction} outBounce
 * @property {EasingFunction} inOutBounce
 * @property {EasingFunction} outInBounce
 * @property {BackEasing} inBack
 * @property {BackEasing} outBack
 * @property {BackEasing} inOutBack
 * @property {BackEasing} outInBack
 * @property {ElasticEasing} inElastic
 * @property {ElasticEasing} outElastic
 * @property {ElasticEasing} inOutElastic
 * @property {ElasticEasing} outInElastic
 */
/**
 * The built in easing functions, used by name like eases.outQuad or called like eases.out(2). The
 * standalone easings spring, cubicBezier, steps, irregular and linear are imported individually.
 * @type {EasesFunctions}
 */
export const eases: EasesFunctions;
export function parseEaseString(string: string): EasingFunction;
export function parseEase(ease: EasingParam): EasingFunction;
export type EaseType = (Ease: EasingFunction) => EasingFunction;
export type EasesFunctions = {
    linear: EasingFunction;
    none: EasingFunction;
    in: PowerEasing;
    out: PowerEasing;
    inOut: PowerEasing;
    outIn: PowerEasing;
    inQuad: EasingFunction;
    outQuad: EasingFunction;
    inOutQuad: EasingFunction;
    outInQuad: EasingFunction;
    inCubic: EasingFunction;
    outCubic: EasingFunction;
    inOutCubic: EasingFunction;
    outInCubic: EasingFunction;
    inQuart: EasingFunction;
    outQuart: EasingFunction;
    inOutQuart: EasingFunction;
    outInQuart: EasingFunction;
    inQuint: EasingFunction;
    outQuint: EasingFunction;
    inOutQuint: EasingFunction;
    outInQuint: EasingFunction;
    inSine: EasingFunction;
    outSine: EasingFunction;
    inOutSine: EasingFunction;
    outInSine: EasingFunction;
    inCirc: EasingFunction;
    outCirc: EasingFunction;
    inOutCirc: EasingFunction;
    outInCirc: EasingFunction;
    inExpo: EasingFunction;
    outExpo: EasingFunction;
    inOutExpo: EasingFunction;
    outInExpo: EasingFunction;
    inBounce: EasingFunction;
    outBounce: EasingFunction;
    inOutBounce: EasingFunction;
    outInBounce: EasingFunction;
    inBack: BackEasing;
    outBack: BackEasing;
    inOutBack: BackEasing;
    outInBack: BackEasing;
    inElastic: ElasticEasing;
    outElastic: ElasticEasing;
    inOutElastic: ElasticEasing;
    outInElastic: ElasticEasing;
};
import type { PowerEasing } from '../../types/index.js';
import type { EasingFunction } from '../../types/index.js';
import type { EasingParam } from '../../types/index.js';
import type { BackEasing } from '../../types/index.js';
import type { ElasticEasing } from '../../types/index.js';

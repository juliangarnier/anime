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
export namespace eases {
    export let linear: EasingFunction;
    export let none: EasingFunction;
    let _in: PowerEasing;
    export { _in as in };
    export let out: PowerEasing;
    export let inOut: PowerEasing;
    export let outIn: PowerEasing;
    export let inQuad: EasingFunction;
    export let outQuad: EasingFunction;
    export let inOutQuad: EasingFunction;
    export let outInQuad: EasingFunction;
    export let inCubic: EasingFunction;
    export let outCubic: EasingFunction;
    export let inOutCubic: EasingFunction;
    export let outInCubic: EasingFunction;
    export let inQuart: EasingFunction;
    export let outQuart: EasingFunction;
    export let inOutQuart: EasingFunction;
    export let outInQuart: EasingFunction;
    export let inQuint: EasingFunction;
    export let outQuint: EasingFunction;
    export let inOutQuint: EasingFunction;
    export let outInQuint: EasingFunction;
    export let inSine: EasingFunction;
    export let outSine: EasingFunction;
    export let inOutSine: EasingFunction;
    export let outInSine: EasingFunction;
    export let inCirc: EasingFunction;
    export let outCirc: EasingFunction;
    export let inOutCirc: EasingFunction;
    export let outInCirc: EasingFunction;
    export let inExpo: EasingFunction;
    export let outExpo: EasingFunction;
    export let inOutExpo: EasingFunction;
    export let outInExpo: EasingFunction;
    export let inBounce: EasingFunction;
    export let outBounce: EasingFunction;
    export let inOutBounce: EasingFunction;
    export let outInBounce: EasingFunction;
    export let inBack: BackEasing;
    export let outBack: BackEasing;
    export let inOutBack: BackEasing;
    export let outInBack: BackEasing;
    export let inElastic: ElasticEasing;
    export let outElastic: ElasticEasing;
    export let inOutElastic: ElasticEasing;
    export let outInElastic: ElasticEasing;
}
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
import type { BackEasing } from '../../types/index.js';
import type { ElasticEasing } from '../../types/index.js';
import type { EasingParam } from '../../types/index.js';

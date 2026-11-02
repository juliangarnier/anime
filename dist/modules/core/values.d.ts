/**
* @import {
*   Target,
*   DOMTarget,
*   Tween,
*   TweenPropValue,
*   TweenDecomposedValue,
*   TargetsArray,
* } from '../types/index.js'
*/
/**
 * @typedef {Object} InlineValueStore
 * @property {String|Number|null|undefined|Symbol} value
 */
/** @type {TweenDecomposedValue} */
export const decomposedOriginalValue: TweenDecomposedValue;
export function setValue<T, D>(targetValue: T | undefined, defaultValue: D): T | D;
export function getFunctionValue(value: TweenPropValue, target: Target, index: number, targets: TargetsArray, prevTween: Tween | null): any;
export function getValueResolver(value: TweenPropValue, target: Target, index: number, targets: TargetsArray, prevTween: Tween | null): Function | null;
export function getTweenType(target: Target, prop: string): tweenTypes;
export function getOriginalAnimatableValue(target: Target, propName: string, tweenType?: tweenTypes, inlineValueStore?: InlineValueStore): string | number;
export function getRelativeValue(x: number, y: number, operator: string): number;
export function decomposeRawValue(rawValue: string | number | any): TweenDecomposedValue;
export function decomposeTweenValue(tween: Tween): TweenDecomposedValue;
export function composeComplexValue(tween: Tween, progress: number, precision: number, stringify?: boolean): string | undefined;
export type InlineValueStore = {
    value: string | number | null | undefined | Symbol;
};
import type { TweenDecomposedValue } from '../types/index.js';
import type { TweenPropValue } from '../types/index.js';
import type { Target } from '../types/index.js';
import type { TargetsArray } from '../types/index.js';
import type { Tween } from '../types/index.js';
import { tweenTypes } from './consts.js';

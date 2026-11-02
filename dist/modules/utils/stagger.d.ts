/**
 * @overload
 * @param {Number} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */
export function stagger(val: number, params?: StaggerParams): StaggerFunction<number>;
/**
 * @overload
 * @param {String} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */
export function stagger(val: string, params?: StaggerParams): StaggerFunction<string>;
/**
 * @overload
 * @param {[Number, Number]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */
export function stagger(val: [number, number], params?: StaggerParams): StaggerFunction<number>;
/**
 * @overload
 * @param {[String, String]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */
export function stagger(val: [string, string], params?: StaggerParams): StaggerFunction<string>;
import type { StaggerParams } from '../types/index.js';
import type { StaggerFunction } from '../types/index.js';

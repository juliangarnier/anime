/**
 * Creates a stagger function that distributes a value across an animation's targets.
 * @type {typeof staggerFactory}
 */
export const stagger: typeof staggerFactory;
/**
 * @overload
 * @param {Number} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */
declare function staggerFactory(val: number, params?: StaggerParams): StaggerFunction<number>;
/**
 * @overload
 * @param {String} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */
declare function staggerFactory(val: string, params?: StaggerParams): StaggerFunction<string>;
/**
 * @overload
 * @param {[Number, Number]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */
declare function staggerFactory(val: [number, number], params?: StaggerParams): StaggerFunction<number>;
/**
 * @overload
 * @param {[String, String]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */
declare function staggerFactory(val: [string, string], params?: StaggerParams): StaggerFunction<string>;
import type { StaggerParams } from '../types/index.js';
import type { StaggerFunction } from '../types/index.js';
export {};

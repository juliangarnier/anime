/**
 * Generates a random number between min and max (inclusive) with optional decimal precision. Passing a
 * params object instead of positional args returns a value shared across targets, or a per target
 * generator when perTarget is true.
 *
 * @overload
 * @param {Number} [min]
 * @param {Number} [max]
 * @param {Number} [decimalLength]
 * @return {Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget: true,
 * }} opts
 * @return {() => Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget?: false,
 * }} opts
 * @return {Number}
 *
 * @overload
 * @param {RandomParams} opts
 * @return {Number | (() => Number)}
 *
 * @param  {Number|RandomParams} [min=0] The minimum value, or a params object.
 * @param  {Number} [max=1] The maximum value, inclusive.
 * @param  {Number} [decimalLength=0] Number of decimal places to round to.
 * @return {Number | (() => Number)} A number, or a per target generator.
 */
export function random(min?: number, max?: number, decimalLength?: number): number;
/**
 * Generates a random number between min and max (inclusive) with optional decimal precision. Passing a
 * params object instead of positional args returns a value shared across targets, or a per target
 * generator when perTarget is true.
 *
 * @overload
 * @param {Number} [min]
 * @param {Number} [max]
 * @param {Number} [decimalLength]
 * @return {Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget: true,
 * }} opts
 * @return {() => Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget?: false,
 * }} opts
 * @return {Number}
 *
 * @overload
 * @param {RandomParams} opts
 * @return {Number | (() => Number)}
 *
 * @param  {Number|RandomParams} [min=0] The minimum value, or a params object.
 * @param  {Number} [max=1] The maximum value, inclusive.
 * @param  {Number} [decimalLength=0] Number of decimal places to round to.
 * @return {Number | (() => Number)} A number, or a per target generator.
 */
export function random(opts: RandomParams & {
    perTarget: true;
}): () => number;
/**
 * Generates a random number between min and max (inclusive) with optional decimal precision. Passing a
 * params object instead of positional args returns a value shared across targets, or a per target
 * generator when perTarget is true.
 *
 * @overload
 * @param {Number} [min]
 * @param {Number} [max]
 * @param {Number} [decimalLength]
 * @return {Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget: true,
 * }} opts
 * @return {() => Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget?: false,
 * }} opts
 * @return {Number}
 *
 * @overload
 * @param {RandomParams} opts
 * @return {Number | (() => Number)}
 *
 * @param  {Number|RandomParams} [min=0] The minimum value, or a params object.
 * @param  {Number} [max=1] The maximum value, inclusive.
 * @param  {Number} [decimalLength=0] Number of decimal places to round to.
 * @return {Number | (() => Number)} A number, or a per target generator.
 */
export function random(opts: RandomParams & {
    perTarget?: false;
}): number;
/**
 * Generates a random number between min and max (inclusive) with optional decimal precision. Passing a
 * params object instead of positional args returns a value shared across targets, or a per target
 * generator when perTarget is true.
 *
 * @overload
 * @param {Number} [min]
 * @param {Number} [max]
 * @param {Number} [decimalLength]
 * @return {Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget: true,
 * }} opts
 * @return {() => Number}
 *
 * @overload
 * @param {RandomParams & {
 *   perTarget?: false,
 * }} opts
 * @return {Number}
 *
 * @overload
 * @param {RandomParams} opts
 * @return {Number | (() => Number)}
 *
 * @param  {Number|RandomParams} [min=0] The minimum value, or a params object.
 * @param  {Number} [max=1] The maximum value, inclusive.
 * @param  {Number} [decimalLength=0] Number of decimal places to round to.
 * @return {Number | (() => Number)} A number, or a per target generator.
 */
export function random(opts: RandomParams): number | (() => number);
export function createSeededRandom(seed?: number, seededMin?: number, seededMax?: number, seededDecimalLength?: number): {
    /**
     * @overload
     * @param {Number} [min]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget: true,
     * }} opts
     * @return {() => Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget?: false,
     * }} opts
     * @return {Number}
     *
     * @overload
     * @param {RandomParams} opts
     * @return {Number | (() => Number)}
     *
     * @param {Number|RandomParams} [minOrOpts]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number | (() => Number)}
     */
    (min?: number, max?: number, decimalLength?: number): number;
    /**
     * @overload
     * @param {Number} [min]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget: true,
     * }} opts
     * @return {() => Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget?: false,
     * }} opts
     * @return {Number}
     *
     * @overload
     * @param {RandomParams} opts
     * @return {Number | (() => Number)}
     *
     * @param {Number|RandomParams} [minOrOpts]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number | (() => Number)}
     */
    (opts: RandomParams & {
        perTarget: true;
    }): () => number;
    /**
     * @overload
     * @param {Number} [min]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget: true,
     * }} opts
     * @return {() => Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget?: false,
     * }} opts
     * @return {Number}
     *
     * @overload
     * @param {RandomParams} opts
     * @return {Number | (() => Number)}
     *
     * @param {Number|RandomParams} [minOrOpts]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number | (() => Number)}
     */
    (opts: RandomParams & {
        perTarget?: false;
    }): number;
    /**
     * @overload
     * @param {Number} [min]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget: true,
     * }} opts
     * @return {() => Number}
     *
     * @overload
     * @param {RandomParams & {
     *   perTarget?: false,
     * }} opts
     * @return {Number}
     *
     * @overload
     * @param {RandomParams} opts
     * @return {Number | (() => Number)}
     *
     * @param {Number|RandomParams} [minOrOpts]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number | (() => Number)}
     */
    (opts: RandomParams): number | (() => number);
};
/**
 * Picks a random element from an array or a string
 *
 * @template T
 * @overload
 * @param {readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {T}
 *
 * @overload
 * @param {String} items
 * @param {RandomFunction} [rnd]
 * @return {String}
 *
 * @template T
 * @overload
 * @param {String | readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {String | T}
 *
 * @template T
 * @param    {String | readonly T[]} items - The array or string to pick from
 * @param    {RandomFunction} [rng] - Optional RNG, defaults to random
 * @return   {String | T} A random element from the array or character from the string
 */
export function randomPick<T>(items: readonly T[], rnd?: RandomFunction): T;
/**
 * Picks a random element from an array or a string
 *
 * @template T
 * @overload
 * @param {readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {T}
 *
 * @overload
 * @param {String} items
 * @param {RandomFunction} [rnd]
 * @return {String}
 *
 * @template T
 * @overload
 * @param {String | readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {String | T}
 *
 * @template T
 * @param    {String | readonly T[]} items - The array or string to pick from
 * @param    {RandomFunction} [rng] - Optional RNG, defaults to random
 * @return   {String | T} A random element from the array or character from the string
 */
export function randomPick<T>(items: string, rnd?: RandomFunction): string;
/**
 * Picks a random element from an array or a string
 *
 * @template T
 * @overload
 * @param {readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {T}
 *
 * @overload
 * @param {String} items
 * @param {RandomFunction} [rnd]
 * @return {String}
 *
 * @template T
 * @overload
 * @param {String | readonly T[]} items
 * @param {RandomFunction} [rnd]
 * @return {String | T}
 *
 * @template T
 * @param    {String | readonly T[]} items - The array or string to pick from
 * @param    {RandomFunction} [rng] - Optional RNG, defaults to random
 * @return   {String | T} A random element from the array or character from the string
 */
export function randomPick<T>(items: string | readonly T[], rnd?: RandomFunction): string | T;
export function shuffle(items: any[], rng?: RandomFunction): any[];
export type RandomParams = {
    min?: number;
    max?: number;
    decimals?: number;
    /**
     * A number seeds a deterministic sequence, false or omitted is unseeded.
     */
    seed?: number | false;
    /**
     * When true the call returns a generator anime invokes once per target.
     */
    perTarget?: boolean;
};
/**
 * A 2-arg numeric RNG, the form randomPick and shuffle call.
 */
export type RandomFunction = (min: number, max: number) => number;

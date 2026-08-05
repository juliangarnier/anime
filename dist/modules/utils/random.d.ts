export function createSeededRandom(seed?: number, seededMin?: number, seededMax?: number, seededDecimalLength?: number): {
    /**
     * @overload
     * @param {Number} [min]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number}
     *
     * @overload
     * @param {RandomParams} opts
     * @return {Number|Function}
     *
     * @param {Number|RandomParams} [minOrOpts]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number|Function}
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
     * @param {RandomParams} opts
     * @return {Number|Function}
     *
     * @param {Number|RandomParams} [minOrOpts]
     * @param {Number} [max]
     * @param {Number} [decimalLength]
     * @return {Number|Function}
     */
    (opts: RandomParams): number | Function;
};
export function random(min?: number | RandomParams, max?: number, decimalLength?: number): number | Function | any;
export function randomPick<T>(items: string | Array<T>, rnd?: RandomFunction): string | T;
export function shuffle(items: any[], rnd?: RandomFunction): any[];
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

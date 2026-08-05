export class Spring {
    /**
     * @param {SpringParams} [parameters]
     */
    constructor(parameters?: SpringParams);
    timeStep: number;
    restThreshold: number;
    restDuration: number;
    maxDuration: number;
    maxRestSteps: number;
    maxIterations: number;
    bn: number;
    pd: number;
    m: number;
    s: number;
    d: number;
    v: number;
    w0: number;
    zeta: number;
    wd: number;
    b: number;
    completed: boolean;
    solverDuration: number;
    settlingDuration: number;
    /** @type {JSAnimation} */
    parent: JSAnimation;
    /** @type {Callback<JSAnimation>} */
    onComplete: Callback<JSAnimation>;
    /** @type {EasingFunction} */
    ease: EasingFunction;
    solve(time: number): number;
    calculateSDFromBD(): void;
    calculateBDFromSD(): void;
    compute(): void;
    /**
     * Lowest settlingDuration stretch can reach, the constant rest detection window scaled to the
     * current time unit. stretch refuses any target at or below it since a shorter settle would no
     * longer describe a resting motion.
     * @return {Number}
     */
    get minSettlingDuration(): number;
    /**
     * Retunes stiffness, damping and velocity so the spring settles at the given duration,
     * keeping its bounce and curve shape. Targets at or below minSettlingDuration are refused,
     * and a target below what the parameter bounds allow lands on that reachable floor instead.
     * @param {Number} duration The target settlingDuration
     * @return {this}
     */
    stretch(duration: number): this;
    set bounce(v: number);
    get bounce(): number;
    set duration(v: number);
    get duration(): number;
    set stiffness(v: number);
    get stiffness(): number;
    set damping(v: number);
    get damping(): number;
    set mass(v: number);
    get mass(): number;
    set velocity(v: number);
    get velocity(): number;
}
/**
 * @param {SpringParams} [parameters]
 * @returns {Spring}
 */
export function spring(parameters?: SpringParams): Spring;
export function createSpring(parameters?: SpringParams): Spring;
import type { JSAnimation } from '../../animation/animation.js';
import type { Callback } from '../../types/index.js';
import type { EasingFunction } from '../../types/index.js';
import type { SpringParams } from '../../types/index.js';

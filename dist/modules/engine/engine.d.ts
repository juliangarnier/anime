export const engine: Engine;
declare class Engine extends Clock {
    useDefaultMainLoop: boolean;
    pauseOnDocumentHidden: boolean;
    /** @type {DefaultsParams} */
    defaults: DefaultsParams;
    paused: boolean;
    /** @type {Number|NodeJS.Immediate} */
    reqId: number | NodeJS.Immediate;
    update(): void;
    wake(): this;
    pause(): this;
    resume(): this;
    set timeUnit(unit: "ms" | "s");
    get timeUnit(): "ms" | "s";
    set precision(precision: number);
    get precision(): number;
}
import { Clock } from '../core/clock.js';
import type { DefaultsParams } from '../types/index.js';
export {};

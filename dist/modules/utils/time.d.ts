export function sync(callback?: Callback<Timer>): Timer;
export function keepTime<T extends Tickable | ((...args: any[]) => void) | void>(constructor: (...args: any[]) => T): (...args: any[]) => T extends void ? () => void : T;
import { Timer } from '../timer/timer.js';
import type { Callback } from '../types/index.js';
import type { Tickable } from '../types/index.js';

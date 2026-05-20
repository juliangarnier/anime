export function sync(callback?: Callback<Timer>): Timer;
export function keepTime(constructor: (...args: any[]) => Tickable | ((...args: any[]) => void) | void): (...args: any[]) => Tickable | ((...args: any[]) => void);
import { Timer } from '../timer/timer.js';
import type { Callback } from '../types/index.js';
import type { Tickable } from '../types/index.js';

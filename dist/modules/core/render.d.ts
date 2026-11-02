export function render(tickable: Timer, time: number, muteCallbacks: number, internalRender: number, tickMode: tickModes): number;
export function tick(tickable: Timer, time: number, muteCallbacks: number, internalRender: number, tickMode: number): void;
import type { Timer } from '../timer/timer.js';
import { tickModes } from './consts.js';

import {
  noop,
} from '../core/consts.js';

import {
  globals,
} from '../core/globals.js';

import {
  isFnc,
  isUnd,
} from '../core/helpers.js';

import {
  Timer,
} from '../timer/timer.js';

/**
 * @import {
 *   Callback,
 *   Tickable,
 * } from '../types/index.js'
*/

/**
 * @param  {Callback<Timer>} [callback]
 * @return {Timer}
 */
export const sync = (callback = noop) => {
  return new Timer({ duration: 1 * globals.timeScale, onComplete: callback }, null, 0).resume();
}

/**
 * @param  {(...args: any[]) => Tickable | ((...args: any[]) => void) | void} constructor
 * @return {(...args: any[]) => Tickable | ((...args: any[]) => void)}
 */
export const keepTime = constructor => {
  /** @type {Tickable} */
  let tracked;
  return (...args) => {
    let currentIteration, currentIterationProgress, reversed, alternate, startTime;
    if (tracked) {
      currentIteration = tracked.currentIteration;
      currentIterationProgress = tracked.iterationProgress;
      reversed = tracked.reversed;
      alternate = tracked._alternate;
      startTime = tracked._startTime;
      tracked.revert();
    }
    const cleanup = constructor(...args);
    if (cleanup && !isFnc(cleanup) && cleanup.revert) tracked = cleanup;
    if (!isUnd(currentIterationProgress)) {
      /** @type {Tickable} */(tracked).currentIteration = currentIteration;
      /** @type {Tickable} */(tracked).iterationProgress = (alternate ? !(currentIteration % 2) ? reversed : !reversed : reversed) ? 1 - currentIterationProgress : currentIterationProgress;
      /** @type {Tickable} */(tracked)._startTime = startTime;
    }
    return cleanup || noop;
  }
}

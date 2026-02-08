/**
 * Anime.js - utils - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { noop } from '../core/consts.js';
import { globals } from '../core/globals.js';
import { isFnc, isUnd } from '../core/helpers.js';
import { Timer } from '../timer/timer.js';

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
const sync = (callback = noop) => {
  return new Timer({ duration: 1 * globals.timeScale, onComplete: callback }, null, 0).resume();
};

/**
 * @param  {(...args: any[]) => Tickable | ((...args: any[]) => void)} constructor
 * @return {(...args: any[]) => Tickable | ((...args: any[]) => void)}
 */
const keepTime = constructor => {
  /** @type {Tickable} */
  let tracked;
  return (...args) => {
    let currentIteration, currentIterationProgress, reversed, alternate;
    if (tracked) {
      currentIteration = tracked.currentIteration;
      currentIterationProgress = tracked.iterationProgress;
      reversed = tracked.reversed;
      alternate = tracked._alternate;
      tracked.revert();
    }
    const cleanup = constructor(...args);
    if (cleanup && !isFnc(cleanup) && cleanup.revert) tracked = cleanup;
    if (!isUnd(currentIterationProgress)) {
      /** @type {Tickable} */(tracked).currentIteration = currentIteration;
      /** @type {Tickable} */(tracked).iterationProgress = (alternate ? !(currentIteration % 2) ? reversed : !reversed : reversed) ? 1 - currentIterationProgress : currentIterationProgress;
    }
    return cleanup || noop;
  }
};

export { keepTime, sync };

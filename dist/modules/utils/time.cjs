/**
 * Anime.js - utils - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var globals = require('../core/globals.cjs');
var helpers = require('../core/helpers.cjs');
var timer = require('../timer/timer.cjs');

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
const sync = (callback = consts.noop) => {
  return new timer.Timer({ duration: 1 * globals.globals.timeScale, onComplete: callback }, null, 0).resume();
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
    if (cleanup && !helpers.isFnc(cleanup) && cleanup.revert) tracked = cleanup;
    if (!helpers.isUnd(currentIterationProgress)) {
      /** @type {Tickable} */(tracked).currentIteration = currentIteration;
      /** @type {Tickable} */(tracked).iterationProgress = (alternate ? !(currentIteration % 2) ? reversed : !reversed : reversed) ? 1 - currentIterationProgress : currentIterationProgress;
    }
    return cleanup || consts.noop;
  }
};

exports.keepTime = keepTime;
exports.sync = sync;

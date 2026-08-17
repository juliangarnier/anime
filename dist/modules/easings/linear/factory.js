/**
 * Anime.js - easings - ESM
 * @version v5.0.0-beta.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { isStr, parseNumber, isUnd } from '../../core/helpers.js';
import { none } from '../none.js';

/**
 * @import {
 *   EasingFunction,
 * } from '../../types/index.js'
*/

/**
 * Builds the piecewise linear ease, returns none without points. irregular reuses it for its curve.
 * @param  {...(String|Number)} args - Points
 * @return {EasingFunction}
 */
const linearFactory = (...args) => {
  const argsLength = args.length;
  if (!argsLength) return none;
  const totalPoints = argsLength - 1;
  const firstArg = args[0];
  const lastArg = args[totalPoints];
  const xPoints = [0];
  const yPoints = [parseNumber(firstArg)];
  for (let i = 1; i < totalPoints; i++) {
    const arg = args[i];
    const splitValue = isStr(arg) ?
    /** @type {String} */(arg).trim().split(' ') :
    [arg];
    const value = splitValue[0];
    const percent = splitValue[1];
    xPoints.push(!isUnd(percent) ? parseNumber(percent) / 100 : i / totalPoints);
    yPoints.push(parseNumber(value));
  }
  yPoints.push(parseNumber(lastArg));
  xPoints.push(1);
  return function easeLinear(t) {
    for (let i = 1, l = xPoints.length; i < l; i++) {
      const currentX = xPoints[i];
      if (t <= currentX) {
        const prevX = xPoints[i - 1];
        const prevY = yPoints[i - 1];
        return prevY + (yPoints[i] - prevY) * (t - prevX) / (currentX - prevX);
      }
    }
    return yPoints[yPoints.length - 1];
  }
};

export { linearFactory };

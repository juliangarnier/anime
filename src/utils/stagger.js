import {
  emptyString,
  unitsExecRgx,
} from '../core/consts.js';

import {
  isArr,
  isUnd,
  isNum,
  parseNumber,
  round,
  abs,
  floor,
  sqrt,
  max,
  isStr,
  isFnc,
} from '../core/helpers.js';

import {
  parseEase,
} from '../easings/eases/parser.js';

import {
  parseTimelinePosition,
} from '../timeline/position.js';

import {
  getOriginalAnimatableValue,
} from '../core/values.js';

import {
  registerTargets,
} from '../core/targets.js';

import {
  shuffle,
} from './random.js';

/**
 * @import {
 *   StaggerParams,
 *   StaggerFunction,
 *   JSTarget,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   Spring,
 * } from '../easings/spring/index.js'
*/

/**
 * @overload
 * @param {Number} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */

/**
 * @overload
 * @param {String} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */

/**
 * @overload
 * @param {[Number, Number]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<Number>}
 */

/**
 * @overload
 * @param {[String, String]} val
 * @param {StaggerParams} [params]
 * @return {StaggerFunction<String>}
 */

/**
 * @param {Number|String|[Number, Number]|[String, String]} val The staggered value or range
 * @param {StaggerParams} [params] The stagger parameters
 * @return {StaggerFunction<Number|String>}
 */
export const stagger = (val, params = {}) => {
  let values = [];
  let maxValue = 0;
  let cachedOffset;
  const from = params.from;
  const reversed = params.reversed;
  const ease = params.ease;
  const hasEasing = !isUnd(ease);
  const hasSpring = hasEasing && !isUnd(/** @type {Spring} */(ease).ease);
  const staggerEase = hasSpring ? /** @type {Spring} */(ease).ease : hasEasing ? parseEase(ease) : null;
  const grid = params.grid;
  const autoGrid = grid === true;
  const axis = params.axis;
  const customTotal = params.total;
  const fromFirst = isUnd(from) || from === 0 || from === 'first';
  const fromCenter = from === 'center';
  const fromLast = from === 'last';
  const fromRandom = from === 'random';
  const fromArr = isArr(from);
  const isRange = isArr(val);
  const useProp = params.use;
  const val1 = isRange ? parseNumber(val[0]) : parseNumber(val);
  const val2 = isRange ? parseNumber(val[1]) : 0;
  const unitMatch = unitsExecRgx.exec((isRange ? val[1] : val) + emptyString);
  const start = params.start || 0 + (isRange ? val1 : 0);
  let fromIndex = fromFirst ? 0 : isNum(from) ? from : 0;
  return (target, i, t, _, tl) => {
    const [ registeredTarget ] = registerTargets(target);
    const total = isUnd(customTotal) ? t.length : customTotal;
    const customIndex = !isUnd(useProp) ? isFnc(useProp) ? useProp(registeredTarget, i, total) : getOriginalAnimatableValue(registeredTarget, useProp) : false;
    const staggerIndex = isNum(customIndex) || isStr(customIndex) && isNum(+customIndex) ? +customIndex : i;
    if (fromCenter) fromIndex = (total - 1) / 2;
    if (fromLast) fromIndex = total - 1;
    if (!values.length) {
      if (autoGrid) {
        let hasPositions = true;
        let minPosX = Infinity;
        let minPosY = Infinity;
        let maxPosX = -Infinity;
        let maxPosY = -Infinity;
        const pxArr = [];
        const pyArr = [];
        for (let index = 0; index < total; index++) {
          const el = t[index];
          let px = 0;
          let py = 0;
          let found = false;
          if (el && isFnc(el.getBoundingClientRect)) {
            const rect = el.getBoundingClientRect();
            px = rect.left + rect.width / 2;
            py = rect.top + rect.height / 2;
            found = true;
          } else {
            const obj = /** @type {JSTarget} */(el);
            if (obj && isNum(obj.x) && isNum(obj.y)) {
              px = obj.x;
              py = obj.y;
              found = true;
            }
          }
          if (!found) {
            hasPositions = false;
            break;
          }
          pxArr.push(px);
          pyArr.push(py);
          if (px < minPosX) minPosX = px;
          if (py < minPosY) minPosY = py;
          if (px > maxPosX) maxPosX = px;
          if (py > maxPosY) maxPosY = py;
        }
        if (hasPositions) {
          let fX = pxArr[0];
          let fY = pyArr[0];
          if (fromArr) {
            fX = minPosX + from[0] * (maxPosX - minPosX);
            fY = minPosY + from[1] * (maxPosY - minPosY);
          } else if (fromCenter) {
            fX = (minPosX + maxPosX) / 2;
            fY = (minPosY + maxPosY) / 2;
          } else if (fromLast) {
            fX = pxArr[total - 1];
            fY = pyArr[total - 1];
          } else if (isNum(from)) {
            fX = pxArr[from];
            fY = pyArr[from];
          }
          for (let index = 0; index < total; index++) {
            const distanceX = fX - pxArr[index];
            const distanceY = fY - pyArr[index];
            let value = sqrt(distanceX * distanceX + distanceY * distanceY);
            if (axis === 'x') value = -distanceX;
            if (axis === 'y') value = -distanceY;
            values.push(value);
          }
          let minDist = Infinity;
          for (let index = 0, l = values.length; index < l; index++) {
            const absVal = abs(values[index]);
            if (absVal > 0 && absVal < minDist) minDist = absVal;
          }
          if (minDist > 0 && minDist < Infinity) {
            for (let index = 0, l = values.length; index < l; index++) {
              values[index] = values[index] / minDist;
            }
          }
        } else {
          for (let index = 0; index < total; index++) {
            values.push(abs(fromIndex - index));
          }
        }
      } else {
        for (let index = 0; index < total; index++) {
          if (!grid) {
            values.push(abs(fromIndex - index));
          } else {
            let fromX, fromY;
            if (fromArr) {
              fromX = from[0] * (grid[0] - 1);
              fromY = from[1] * (grid[1] - 1);
            } else if (fromCenter) {
              fromX = (grid[0] - 1) / 2;
              fromY = (grid[1] - 1) / 2;
            } else {
              fromX = fromIndex % grid[0];
              fromY = floor(fromIndex / grid[0]);
            }
            const toX = index % grid[0];
            const toY = floor(index / grid[0]);
            const distanceX = fromX - toX;
            const distanceY = fromY - toY;
            let value = sqrt(distanceX * distanceX + distanceY * distanceY);
            if (axis === 'x') value = -distanceX;
            if (axis === 'y') value = -distanceY;
            values.push(value);
          }
        }
      }
      maxValue = max(...values);
      if (staggerEase) values = values.map(val => staggerEase(val / maxValue) * maxValue);
      if (reversed) values = values.map(val => axis ? (val < 0) ? val * -1 : -val : abs(maxValue - val));
      if (fromRandom) values = shuffle(values);
    }
    const spacing = isRange ? (val2 - val1) / maxValue : val1;
    if (isUnd(cachedOffset)) {
      cachedOffset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl.iterationDuration : start) : /** @type {Number} */(start);
    }
    /** @type {String|Number} */
    let output = cachedOffset + ((spacing * round(values[staggerIndex], 2)) || 0);
    if (params.modifier) output = params.modifier(/** @type {Number} */(output));
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  }
}

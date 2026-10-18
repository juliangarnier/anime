/**
 * Anime.js - utils - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { unitsExecRgx, emptyString } from '../core/consts.js';
import { isUnd, parseNumber, isFnc, isNum, sqrt, abs, floor, round, isArr, isStr } from '../core/helpers.js';
import { parseEase } from '../easings/eases/parser.js';
import { parseTimelinePosition } from '../timeline/position.js';
import { getOriginalAnimatableValue } from '../core/values.js';
import { registerTargets } from '../core/targets.js';
import { createSeededRandom, random, shuffle } from './random.js';

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
const stagger = (val, params = {}) => {
  let values = [];
  let maxValue = 0;
  let cachedOffset;
  let jitterSamples = null;
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
  const seed = params.seed;
  const hasSeed = !isUnd(seed) && seed !== false;
  const rng = hasSeed ? createSeededRandom(seed === true ? 0 : /** @type {Number} */(seed)) : random;
  const jitter = params.jitter;
  const hasJitter = !isUnd(jitter);
  const jitterIsArr = isArr(jitter);
  const jitterStart = jitterIsArr ? /** @type {[Number,Number]} */(jitter)[0] : /** @type {Number} */(jitter) || 0;
  const jitterEnd = jitterIsArr ? /** @type {[Number,Number]} */(jitter)[1] : /** @type {Number} */(jitter) || 0;
  let fromIndex = fromFirst ? 0 : isNum(from) ? from : 0;
  return (target, i, t, _, tl) => {
    const [ registeredTarget ] = registerTargets(target);
    const total = isUnd(customTotal) ? t.length : customTotal;
    const customIndex = !isUnd(useProp) ? isFnc(useProp) ? useProp(registeredTarget, i, total) : getOriginalAnimatableValue(registeredTarget, useProp) : false;
    const customIdx = isNum(customIndex) || isStr(customIndex) && isNum(+customIndex) ? +customIndex : i;
    // Fall back to the natural index when the resolved value lands outside [0, total) so values[staggerIndex] never reads undefined.
    const staggerIndex = customIdx >= 0 && customIdx < total ? customIdx : i;
    if (fromCenter) fromIndex = (total - 1) / 2;
    if (fromLast) fromIndex = total - 1;
    if (!values.length) {
      if (autoGrid) {
        let hasPositions = true;
        let has3D = false;
        let minPosX = Infinity;
        let minPosY = Infinity;
        let minPosZ = Infinity;
        let maxPosX = -Infinity;
        let maxPosY = -Infinity;
        let maxPosZ = -Infinity;
        const pxArr = [];
        const pyArr = [];
        const pzArr = [];
        for (let index = 0; index < total; index++) {
          const el = t[index];
          let px = 0;
          let py = 0;
          let pz = 0;
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
              if (isNum(obj.z)) {
                pz = obj.z;
                has3D = true;
              }
              found = true;
            }
          }
          if (!found) {
            hasPositions = false;
            break;
          }
          pxArr.push(px);
          pyArr.push(py);
          pzArr.push(pz);
          if (px < minPosX) minPosX = px;
          if (py < minPosY) minPosY = py;
          if (pz < minPosZ) minPosZ = pz;
          if (px > maxPosX) maxPosX = px;
          if (py > maxPosY) maxPosY = py;
          if (pz > maxPosZ) maxPosZ = pz;
        }
        if (hasPositions) {
          let fX = pxArr[0];
          let fY = pyArr[0];
          let fZ = pzArr[0];
          if (fromArr) {
            fX = minPosX + from[0] * (maxPosX - minPosX);
            fY = minPosY + from[1] * (maxPosY - minPosY);
            fZ = has3D ? minPosZ + (from.length >= 3 ? from[2] : 0.5) * (maxPosZ - minPosZ) : 0;
          } else if (fromCenter) {
            fX = (minPosX + maxPosX) / 2;
            fY = (minPosY + maxPosY) / 2;
            fZ = (minPosZ + maxPosZ) / 2;
          } else if (fromLast) {
            fX = pxArr[total - 1];
            fY = pyArr[total - 1];
            fZ = pzArr[total - 1];
          } else if (isNum(from)) {
            fX = pxArr[from];
            fY = pyArr[from];
            fZ = pzArr[from];
          }
          for (let index = 0; index < total; index++) {
            const distanceX = fX - pxArr[index];
            const distanceY = fY - pyArr[index];
            const distanceZ = fZ - pzArr[index];
            let value = sqrt(distanceX * distanceX + distanceY * distanceY + (has3D ? distanceZ * distanceZ : 0));
            if (axis === 'x') value = -distanceX;
            if (axis === 'y') value = -distanceY;
            if (axis === 'z') value = -distanceZ;
            values.push(value);
          }
          let minDist = Infinity;
          for (let index = 0; index < total; index++) {
            const absVal = abs(values[index]);
            if (absVal > 0 && absVal < minDist) minDist = absVal;
          }
          if (minDist > 0 && minDist < Infinity) {
            for (let index = 0; index < total; index++) {
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
            const dims = grid.length;
            const wh = grid[0] * grid[1];
            let fromX, fromY, fromZ;
            if (fromArr) {
              fromX = from[0] * (grid[0] - 1);
              fromY = from[1] * (grid[1] - 1);
              fromZ = dims === 3 ? (from.length >= 3 ? from[2] : 0.5) * (grid[2] - 1) : 0;
            } else if (fromCenter) {
              fromX = (grid[0] - 1) / 2;
              fromY = (grid[1] - 1) / 2;
              fromZ = dims === 3 ? (grid[2] - 1) / 2 : 0;
            } else {
              fromX = fromIndex % grid[0];
              fromY = floor(fromIndex / grid[0]) % grid[1];
              fromZ = dims === 3 ? floor(fromIndex / wh) : 0;
            }
            const toX = index % grid[0];
            const toY = floor(index / grid[0]) % grid[1];
            const toZ = dims === 3 ? floor(index / wh) : 0;
            const distanceX = fromX - toX;
            const distanceY = fromY - toY;
            const distanceZ = fromZ - toZ;
            let value = sqrt(distanceX * distanceX + distanceY * distanceY + (dims === 3 ? distanceZ * distanceZ : 0));
            if (axis === 'x') value = -distanceX;
            if (axis === 'y') value = -distanceY;
            if (axis === 'z') value = -distanceZ;
            values.push(value);
          }
        }
      }
      maxValue = values[0];
      for (let k = 1; k < total; k++) if (values[k] > maxValue) maxValue = values[k];
      if (staggerEase || reversed) {
        for (let k = 0; k < total; k++) {
          let v = values[k];
          if (staggerEase) v = staggerEase(v / maxValue) * maxValue;
          if (reversed) v = axis ? -v : abs(maxValue - v);
          values[k] = v;
        }
      }
      if (hasJitter) {
        jitterSamples = new Array(total);
        for (let k = 0; k < total; k++) jitterSamples[k] = rng(-1, 1, 4);
      }
      if (fromRandom) values = shuffle(values, rng);
    }
    const spacing = isRange ? (val2 - val1) / maxValue : val1;
    if (isUnd(cachedOffset)) {
      cachedOffset = tl ? parseTimelinePosition(tl, isUnd(params.start) ? tl.iterationDuration : start) : /** @type {Number} */(start);
    }
    /** @type {String|Number} */
    let output = cachedOffset + ((spacing * round(values[staggerIndex], 2)) || 0);
    if (hasJitter) {
      const progress = maxValue ? values[staggerIndex] / maxValue : 0;
      const mag = jitterStart + (jitterEnd - jitterStart) * progress;
      output = /** @type {Number} */(output) + jitterSamples[staggerIndex] * mag;
    }
    if (params.modifier) output = params.modifier(/** @type {Number} */(output));
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  }
};

export { stagger };

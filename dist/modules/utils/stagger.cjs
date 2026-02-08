/**
 * Anime.js - utils - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var parser = require('../easings/eases/parser.cjs');
var position = require('../timeline/position.cjs');
var values = require('../core/values.cjs');
var targets = require('../core/targets.cjs');
var random = require('./random.cjs');

/**
 * @import {
 *   StaggerParams,
 *   StaggerFunction,
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
  let values$1 = [];
  let maxValue = 0;
  const from = params.from;
  const reversed = params.reversed;
  const ease = params.ease;
  const hasEasing = !helpers.isUnd(ease);
  const hasSpring = hasEasing && !helpers.isUnd(/** @type {Spring} */(ease).ease);
  const staggerEase = hasSpring ? /** @type {Spring} */(ease).ease : hasEasing ? parser.parseEase(ease) : null;
  const grid = params.grid;
  const axis = params.axis;
  const customTotal = params.total;
  const fromFirst = helpers.isUnd(from) || from === 0 || from === 'first';
  const fromCenter = from === 'center';
  const fromLast = from === 'last';
  const fromRandom = from === 'random';
  const isRange = helpers.isArr(val);
  const useProp = params.use;
  const val1 = isRange ? helpers.parseNumber(val[0]) : helpers.parseNumber(val);
  const val2 = isRange ? helpers.parseNumber(val[1]) : 0;
  const unitMatch = consts.unitsExecRgx.exec((isRange ? val[1] : val) + consts.emptyString);
  const start = params.start || 0 + (isRange ? val1 : 0);
  let fromIndex = fromFirst ? 0 : helpers.isNum(from) ? from : 0;
  return (target, i, t, tl) => {
    const [ registeredTarget ] = targets.registerTargets(target);
    const total = helpers.isUnd(customTotal) ? t : customTotal;
    const customIndex = !helpers.isUnd(useProp) ? helpers.isFnc(useProp) ? useProp(registeredTarget, i, total) : values.getOriginalAnimatableValue(registeredTarget, useProp) : false;
    const staggerIndex = helpers.isNum(customIndex) || helpers.isStr(customIndex) && helpers.isNum(+customIndex) ? +customIndex : i;
    if (fromCenter) fromIndex = (total - 1) / 2;
    if (fromLast) fromIndex = total - 1;
    if (!values$1.length) {
      for (let index = 0; index < total; index++) {
        if (!grid) {
          values$1.push(helpers.abs(fromIndex - index));
        } else {
          const fromX = !fromCenter ? fromIndex % grid[0] : (grid[0] - 1) / 2;
          const fromY = !fromCenter ? helpers.floor(fromIndex / grid[0]) : (grid[1] - 1) / 2;
          const toX = index % grid[0];
          const toY = helpers.floor(index / grid[0]);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let value = helpers.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') value = -distanceX;
          if (axis === 'y') value = -distanceY;
          values$1.push(value);
        }
        maxValue = helpers.max(...values$1);
      }
      if (staggerEase) values$1 = values$1.map(val => staggerEase(val / maxValue) * maxValue);
      if (reversed) values$1 = values$1.map(val => axis ? (val < 0) ? val * -1 : -val : helpers.abs(maxValue - val));
      if (fromRandom) values$1 = random.shuffle(values$1);
    }
    const spacing = isRange ? (val2 - val1) / maxValue : val1;
    const offset = tl ? position.parseTimelinePosition(tl, helpers.isUnd(params.start) ? tl.iterationDuration : start) : /** @type {Number} */(start);
    /** @type {String|Number} */
    let output = offset + ((spacing * helpers.round(values$1[staggerIndex], 2)) || 0);
    if (params.modifier) output = params.modifier(output);
    if (unitMatch) output = `${output}${unitMatch[2]}`;
    return output;
  }
};

exports.stagger = stagger;

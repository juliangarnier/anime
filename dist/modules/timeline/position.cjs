/**
 * Anime.js - timeline - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var helpers = require('../core/helpers.cjs');
var values = require('../core/values.cjs');

/**
 * @import {
 *   Tickable,
 *   Renderable,
 *   TimelinePosition,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   Timeline,
 * } from './timeline.js'
*/

/**
 * @param {Timeline} timeline
 * @param {Number} [duration]
 */
const updateTimelineDuration = (timeline, duration) => {
  if (helpers.isUnd(duration)) {
    duration = 0;
    for (let child = /** @type {Renderable} */(timeline._head); child; child = child._next) {
      const end = child._offset + child._delay + child.duration;
      if (end > duration) duration = end;
    }
  }
  timeline.iterationDuration = duration;
  timeline.duration = helpers.clampInfinity(((duration + timeline._loopDelay) * timeline.iterationCount) - timeline._loopDelay) || consts.minValue;
  if (timeline.parent) updateTimelineDuration(timeline.parent);
};

/**
 * Timeline's children offsets positions parser
 * @param  {Timeline} timeline
 * @param  {String} timePosition
 * @return {Number}
 */
const getPrevChildOffset = (timeline, timePosition) => {
  if (helpers.stringStartsWith(timePosition, '<')) {
    const goToPrevAnimationOffset = timePosition[1] === '<';
    const prevAnimation = /** @type {Tickable} */(timeline._tail);
    const prevOffset = prevAnimation ? prevAnimation._offset + prevAnimation._delay : 0;
    return goToPrevAnimationOffset ? prevOffset : prevOffset + prevAnimation.duration;
  }
};

/**
 * @param  {Timeline} timeline
 * @param  {TimelinePosition} [timePosition]
 * @return {Number}
 */
const parseTimelinePosition = (timeline, timePosition) => {
  let tlDuration = timeline.iterationDuration;
  if (tlDuration === consts.minValue) tlDuration = 0;
  if (helpers.isUnd(timePosition)) return tlDuration;
  if (helpers.isNum(+timePosition)) return +timePosition;
  const timePosStr = /** @type {String} */(timePosition);
  const tlLabels = timeline ? timeline.labels : null;
  const hasLabels = !helpers.isNil(tlLabels);
  const prevOffset = getPrevChildOffset(timeline, timePosStr);
  const hasSibling = !helpers.isUnd(prevOffset);
  const matchedRelativeOperator = consts.relativeValuesExecRgx.exec(timePosStr);
  if (matchedRelativeOperator) {
    const fullOperator = matchedRelativeOperator[0];
    const split = timePosStr.split(fullOperator);
    const labelOffset = hasLabels && split[0] ? tlLabels[split[0]] : tlDuration;
    const parsedOffset = hasSibling ? prevOffset : hasLabels ? labelOffset : tlDuration;
    const parsedNumericalOffset = +split[1];
    return values.getRelativeValue(parsedOffset, parsedNumericalOffset, fullOperator[0]);
  } else {
    return hasSibling ? prevOffset :
           hasLabels ? !helpers.isUnd(tlLabels[timePosStr]) ? tlLabels[timePosStr] :
           tlDuration : tlDuration;
  }
};

exports.parseTimelinePosition = parseTimelinePosition;
exports.updateTimelineDuration = updateTimelineDuration;

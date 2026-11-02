/**
 * Anime.js - core - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');
var helpers = require('./helpers.cjs');

const angleUnitsMap = { 'deg': 1, 'rad': 180 / helpers.PI, 'turn': 360 };
const convertedValuesCache = {};

/**
* @import {
*   DOMTarget,
* } from '../types/index.js'
*/

/**
 * @param  {DOMTarget} el
 * @param  {Number} currentNumber
 * @param  {String} currentUnit
 * @param  {String} unit
 * @param  {valueTypes} type
 * @param  {Boolean} [force]
 * @return {Number}
 */
const convertValueUnit = (el, currentNumber, currentUnit, unit, type, force = false) => {
  if (type === consts.valueTypes.UNIT && currentUnit === unit) { // TODO: Check if checking against the same unit string is necessary
    return currentNumber;
  }
  const cachedKey = currentNumber + currentUnit + unit;
  const cached = convertedValuesCache[cachedKey];
  if (!helpers.isUnd(cached) && !force) {
    return cached;
  } else {
    let convertedValue;
    if (currentUnit in angleUnitsMap) {
      convertedValue = currentNumber * angleUnitsMap[currentUnit] / angleUnitsMap[unit];
    } else {
      const baseline = 100;
      const tempEl = /** @type {DOMTarget} */(el.cloneNode());
      const parentNode = el.parentNode;
      const parentEl = (parentNode && (parentNode !== consts.doc)) ? parentNode : consts.doc.body;
      parentEl.appendChild(tempEl);
      const elStyle = tempEl.style;
      elStyle.width = baseline + currentUnit;
      const currentUnitWidth = /** @type {HTMLElement} */(tempEl).offsetWidth || baseline;
      elStyle.width = baseline + unit;
      const newUnitWidth = /** @type {HTMLElement} */(tempEl).offsetWidth || baseline;
      const factor = currentUnitWidth / newUnitWidth;
      parentEl.removeChild(tempEl);
      convertedValue = factor * currentNumber;
    }
    convertedValuesCache[cachedKey] = convertedValue;
    return convertedValue;
  }
};

exports.convertValueUnit = convertValueUnit;

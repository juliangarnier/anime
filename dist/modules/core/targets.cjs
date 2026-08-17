/**
 * Anime.js - core - CJS
 * @version v5.0.0-beta.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var globals = require('./globals.cjs');
var consts = require('./consts.cjs');
var helpers = require('./helpers.cjs');

/**
* @import {
*   DOMTarget,
*   DOMTargetsParam,
*   JSTargetsArray,
*   TargetsParam,
*   JSTargetsParam,
*   TargetsArray,
*   DOMTargetsArray,
* } from '../types/index.js'
*/

/**
 * @param  {DOMTargetsParam|TargetsParam} v
 * @return {NodeList|HTMLCollection}
 */
function getNodeList(v) {
  const n = helpers.isStr(v) ? globals.scope.root.querySelectorAll(v) : v;
  if (n instanceof NodeList || n instanceof HTMLCollection) return n;
}

// The linear duplicate scan benchmarks faster than Set lookups up to somewhere between 32 and
// 128 items, so promoting at 128 keeps small target lists on the fastest path.
const dedupeSetThreshold = 128;

/**
 * @overload
 * @param  {DOMTargetsParam} targets
 * @return {DOMTargetsArray}
 *
 * @overload
 * @param  {JSTargetsParam} targets
 * @return {JSTargetsArray}
 *
 * @overload
 * @param  {TargetsParam} targets
 * @return {TargetsArray}
 *
 * @param  {DOMTargetsParam|JSTargetsParam|TargetsParam} targets
 */
function parseTargets(targets) {
  if (helpers.isNil(targets)) return /** @type {TargetsArray} */([]);
  if (!consts.isBrowser) return /** @type {JSTargetsArray} */(helpers.isArr(targets) && targets.flat(Infinity) || [targets]);
  if (helpers.isArr(targets)) {
    const flattened = targets.flat(Infinity);
    /** @type {TargetsArray} */
    const parsed = [];
    // Dedupe by identity, scan parsed linearly for small results to skip the Set allocation, then
    // promote to a Set so large target lists stay linear instead of quadratic.
    /** @type {Set|null} */
    let seen = null;
    for (let i = 0, l = flattened.length; i < l; i++) {
      const item = flattened[i];
      if (helpers.isNil(item)) continue;
      const nodeList = getNodeList(item);
      if (nodeList) {
        for (let j = 0, jl = nodeList.length; j < jl; j++) {
          const subItem = nodeList[j];
          if (helpers.isNil(subItem) || (seen ? seen.has(subItem) : parsed.includes(subItem))) continue;
          parsed.push(subItem);
          if (seen) seen.add(subItem);
          else if (parsed.length > dedupeSetThreshold) seen = new Set(parsed);
        }
      } else if (!(seen ? seen.has(item) : parsed.includes(item))) {
        parsed.push(item);
        if (seen) seen.add(item);
        else if (parsed.length > dedupeSetThreshold) seen = new Set(parsed);
      }
    }
    return parsed;
  }
  const nodeList = getNodeList(targets);
  if (nodeList) return /** @type {DOMTargetsArray} */(Array.from(nodeList));
  return /** @type {TargetsArray} */([targets]);
}

/**
 * @overload
 * @param  {DOMTargetsParam} targets
 * @return {DOMTargetsArray}
 *
 * @overload
 * @param  {JSTargetsParam} targets
 * @return {JSTargetsArray}
 *
 * @overload
 * @param  {TargetsParam} targets
 * @return {TargetsArray}
 *
 * @param  {DOMTargetsParam|JSTargetsParam|TargetsParam} targets
 */
function registerTargets(targets) {
  const parsedTargetsArray = parseTargets(targets);
  const parsedTargetsLength = parsedTargetsArray.length;
  for (let i = 0; i < parsedTargetsLength; i++) {
    const target = parsedTargetsArray[i];
    if (!target[consts.isRegisteredTargetSymbol]) {
      target[consts.isRegisteredTargetSymbol] = true;
      const isSvgType = helpers.isSvg(target);
      const isDom = /** @type {DOMTarget} */(target).nodeType || isSvgType;
      if (isDom) {
        target[consts.isDomSymbol] = true;
        target[consts.isSvgSymbol] = isSvgType;
        target[consts.transformsSymbol] = {};
      }
    }
  }
  return parsedTargetsArray;
}

exports.getNodeList = getNodeList;
exports.parseTargets = parseTargets;
exports.registerTargets = registerTargets;

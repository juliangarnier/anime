/**
 * Anime.js - core - ESM
 * @version v5.0.0-beta.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { scope } from './globals.js';
import { isRegisteredTargetSymbol, isDomSymbol, isSvgSymbol, transformsSymbol, isBrowser } from './consts.js';
import { isSvg, isNil, isArr, isStr } from './helpers.js';

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
  const n = isStr(v) ? scope.root.querySelectorAll(v) : v;
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
  if (isNil(targets)) return /** @type {TargetsArray} */([]);
  if (!isBrowser) return /** @type {JSTargetsArray} */(isArr(targets) && targets.flat(Infinity) || [targets]);
  if (isArr(targets)) {
    const flattened = targets.flat(Infinity);
    /** @type {TargetsArray} */
    const parsed = [];
    // Dedupe by identity, scan parsed linearly for small results to skip the Set allocation, then
    // promote to a Set so large target lists stay linear instead of quadratic.
    /** @type {Set|null} */
    let seen = null;
    for (let i = 0, l = flattened.length; i < l; i++) {
      const item = flattened[i];
      if (isNil(item)) continue;
      const nodeList = getNodeList(item);
      if (nodeList) {
        for (let j = 0, jl = nodeList.length; j < jl; j++) {
          const subItem = nodeList[j];
          if (isNil(subItem) || (seen ? seen.has(subItem) : parsed.includes(subItem))) continue;
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
    if (!target[isRegisteredTargetSymbol]) {
      target[isRegisteredTargetSymbol] = true;
      const isSvgType = isSvg(target);
      const isDom = /** @type {DOMTarget} */(target).nodeType || isSvgType;
      if (isDom) {
        target[isDomSymbol] = true;
        target[isSvgSymbol] = isSvgType;
        target[transformsSymbol] = {};
      }
    }
  }
  return parsedTargetsArray;
}

export { getNodeList, parseTargets, registerTargets };

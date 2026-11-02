/**
 * Anime.js - core - ESM
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { scope } from './globals.js';
import { replaceLookupsSymbol, lookupsOwnerSymbol, isDomSymbol, isSvgSymbol, transformsSymbol, isBrowser } from './consts.js';
import { isNil, isArr, isSvg, isStr } from './helpers.js';

/**
* @import {
*   Target,
*   TargetSelector,
*   DOMTarget,
*   DOMTargetsParam,
*   JSTargetsArray,
*   TargetsParam,
*   JSTargetsParam,
*   TargetsArray,
*   DOMTargetsArray,
*   TweenLookups,
* } from '../types/index.js'
*/

// Hold lookups for proxies that return new lookups per read and for copies that forward to a target.
// A WeakMap for all targets slowed setup and render, so only those keep their lookups here.
/** @type {WeakMap<Target, TweenLookups>} */
const proxyLookups = new WeakMap();

/**
 * @param  {Target} target
 * @return {TweenLookups}
 */
const getReplaceLookups = target => {
  const lookups = target[replaceLookupsSymbol];
  // A spread, Object.assign, or prototype copy carries the lookups or proxy marker of its source.
  // The owner and WeakMap checks cost less setup time than a non-enumerable defineProperty.
  if (lookups !== true && lookups[lookupsOwnerSymbol] === target) return lookups;
  // Copies and proxies never write the slot, a forwarding proxy would replace the lookups of its target.
  // Each keeps its own apart, as 4.5 kept every object apart.
  let own = proxyLookups.get(target);
  if (!own) proxyLookups.set(target, own = Object.create(null));
  return own;
};

// Promote to a Set at 128 items, the linear scan benchmarks faster than Set lookups below that.
const dedupeSetThreshold = 128;

/**
 * @param  {DOMTargetsParam|TargetsParam} v
 * @return {NodeList|HTMLCollection}
 */
function getNodeList(v) {
  const n = isStr(v) ? scope.root.querySelectorAll(v) : v;
  if (n instanceof NodeList || n instanceof HTMLCollection) return n;
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
function parseTargets(targets) {
  if (isNil(targets)) return /** @type {TargetsArray} */([]);
  if (!isBrowser) return /** @type {JSTargetsArray} */(isArr(targets) && targets.flat(Infinity) || [targets]);
  if (isArr(targets)) {
    const flattened = /** @type {TargetSelector[]} */(targets.flat(Infinity));
    /** @type {TargetsArray} */
    const parsed = [];
    // Dedupe by identity, promote to a Set past dedupeSetThreshold so large lists stay linear.
    /** @type {Set<Target>|null} */
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
      } else {
        const target = /** @type {Target} */(item);
        if (seen ? seen.has(target) : parsed.includes(target)) continue;
        parsed.push(target);
        if (seen) seen.add(target);
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
  for (let i = 0, l = parsedTargetsArray.length; i < l; i++) {
    const target = parsedTargetsArray[i];
    if (!target[replaceLookupsSymbol]) {
      // Create lookups without a prototype so a property name like toString reads no inherited value.
      /** @type {TweenLookups} */
      const lookups = Object.create(null);
      lookups[lookupsOwnerSymbol] = target;
      target[replaceLookupsSymbol] = lookups;
      if (target[replaceLookupsSymbol] !== lookups) {
        target[replaceLookupsSymbol] = true;
        proxyLookups.set(target, lookups);
      }
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

export { getNodeList, getReplaceLookups, parseTargets, registerTargets };

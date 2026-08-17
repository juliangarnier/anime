/**
 * Anime.js - core - ESM
 * @version v5.0.0-beta.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { isBrowser, win, noop, noopModifier, compositionTypes, K, maxFps, doc } from './consts.js';

/**
 * @import {
 *   DefaultsParams,
 *   DOMTarget,
 * } from '../types/index.js'
 *
 * @import {
 *   Scope,
 * } from '../scope/index.js'
*/

/**
 * @typedef {Object} EditorGlobals
 * @property {boolean} showPanel
 * @property {Function} addAnimation
 * @property {Function} addSet
 * @property {Function} addTimeline
 * @property {Function} addTimelineChild
 * @property {Function} addTimelineLabel
 * @property {Function} addTimelineCall
 * @property {Function} addTimelineSync
 * @property {Function|null} addTimelineTimer
 * @property {Function} createTweak
 * @property {Object|null} _head
 * @property {Object|null} _tail
 */

/** @type {DefaultsParams} */
const defaults = {
  id: null,
  keyframes: null,
  playbackEase: null,
  playbackRate: 1,
  frameRate: maxFps,
  loop: 0,
  reversed: false,
  alternate: false,
  autoplay: true,
  persist: false,
  duration: K,
  delay: 0,
  loopDelay: 0,
  ease: 'out(2)',
  composition: compositionTypes.replace,
  modifier: noopModifier,
  onBegin: noop,
  onBeforeUpdate: noop,
  onUpdate: noop,
  onLoop: noop,
  onPause: noop,
  onComplete: noop,
  onRender: noop,
};

const scope = {
  /** @type {Scope} */
  current: null,
  /** @type {Document|DOMTarget} */
  root: doc,
};

const globals = {
  /** @type {DefaultsParams} */
  defaults,
  /** @type {Number} */
  precision: 4,
  /** @type {Number} equals 1 in ms mode, 0.001 in s mode */
  timeScale: 1,
  /** @type {Number} */
  tickThreshold: 200,
  /** @type {EditorGlobals|null} */
  editor: null,
};

/**
 * Wraps a factory so the editor can turn its result into an editable tweak when one is active, and
 * returns the result untouched otherwise. Used by the eases registry, stagger and random.
 *
 * @param {String} type The tweak type, for example Ease or Stagger.
 * @param {String} name The registry key the editor serializes back to a call.
 * @param {Function} fn The factory whose result is the live anime value.
 * @return {Function} A function with the same call signature as fn.
 */
const makeTweakable = (type, name, fn) => function() {
  const result = fn.apply(null, arguments);
  const editor = globals.editor;
  // Build the args array only for the editor, the no editor path stays allocation free.
  return editor ? editor.createTweak(result, type, name, Array.prototype.slice.call(arguments)) : result;
};

const globalVersions = { version: '5.0.0-beta.2', engine: null };

if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push(globalVersions);
}

export { defaults, globalVersions, globals, makeTweakable, scope };

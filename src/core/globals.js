import {
  K,
  noop,
  noopModifier,
  maxFps,
  compositionTypes,
  win,
  doc,
  isBrowser,
} from './consts.js';

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
 * @property {Function} resolveStagger
 * @property {Object|null} _head
 * @property {Object|null} _tail
 */

/** @type {DefaultsParams} */
export const defaults = {
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
}

export const scope = {
  /** @type {Scope} */
  current: null,
  /** @type {Document|DOMTarget} */
  root: doc,
}

export const globals = {
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
}

export const globalVersions = { version: '__packageVersion__', engine: null };

if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push(globalVersions);
}

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
 * @property {Function} addAnimation
 * @property {Function|null} addSet
 * @property {Function} addTimeline
 * @property {Function} addTimelineChild
 * @property {Function} addTimelineLabel
 * @property {Function} addTimelineCall
 * @property {Function} addTimelineSync
 * @property {Function|null} addTimelineTimer
 * @property {Function} addLayout
 * @property {Function} addLayoutTransition
 * @property {Function} createTweak
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
  muted: false,
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

/**
 * Wraps a factory so the editor can turn its result into an editable tweak when one is active, and
 * returns the result untouched otherwise. Used by the eases registry, stagger and random.
 *
 * @param {String} type The tweak type, for example Ease or Stagger.
 * @param {String} name The registry key the editor serializes back to a call.
 * @param {Function} fn The factory whose result is the live anime value.
 * @return {Function} A function with the same call signature as fn.
 */
export const makeTweakable = (type, name, fn) => function() {
  const result = fn.apply(null, arguments);
  const editor = globals.editor;
  // Build the args array only for the editor, the no editor path stays allocation free.
  return editor ? editor.createTweak(result, type, name, Array.prototype.slice.call(arguments)) : result;
}

// The build writes the package version in place of the placeholder, the type stays a string.
/** @type {string} */
export const version = '__packageVersion__';

export const globalVersions = { version, engine: null };

if (isBrowser) {
  if (!win.AnimeJS) win.AnimeJS = [];
  win.AnimeJS.push(globalVersions);
}

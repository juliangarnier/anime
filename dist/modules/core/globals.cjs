/**
 * Anime.js - core - CJS
 * @version v4.4.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('./consts.cjs');

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
 * @property {boolean} synced
 * @property {Function} addAnimation
 * @property {Function} addTimeline
 * @property {Function} addTimelineChild
 * @property {Function} resolveStagger
 * @property {Object|null} _head
 * @property {Object|null} _tail
 */

/** @type {DefaultsParams} */
const defaults = {
  id: null,
  keyframes: null,
  playbackEase: null,
  playbackRate: 1,
  frameRate: consts.maxFps,
  loop: 0,
  reversed: false,
  alternate: false,
  autoplay: true,
  persist: false,
  duration: consts.K,
  delay: 0,
  loopDelay: 0,
  ease: 'out(2)',
  composition: consts.compositionTypes.replace,
  modifier: v => v,
  onBegin: consts.noop,
  onBeforeUpdate: consts.noop,
  onUpdate: consts.noop,
  onLoop: consts.noop,
  onPause: consts.noop,
  onComplete: consts.noop,
  onRender: consts.noop,
};

const scope = {
  /** @type {Scope} */
  current: null,
  /** @type {Document|DOMTarget} */
  root: consts.doc,
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

const globalVersions = { version: '4.4.0', engine: null };

if (consts.isBrowser) {
  if (!consts.win.AnimeJS) consts.win.AnimeJS = [];
  consts.win.AnimeJS.push(globalVersions);
}

exports.defaults = defaults;
exports.globalVersions = globalVersions;
exports.globals = globals;
exports.scope = scope;

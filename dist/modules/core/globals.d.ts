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
export const defaults: DefaultsParams;
export namespace scope {
    export let current: Scope;
    export { doc as root };
}
export namespace globals {
    export { defaults };
    export let precision: number;
    export let timeScale: number;
    export let tickThreshold: number;
    export let editor: EditorGlobals | null;
}
export function makeTweakable(type: string, name: string, fn: Function): Function;
/** @type {string} */
export const version: string;
export namespace globalVersions {
    export { version };
    export let engine: any;
}
export type EditorGlobals = {
    addAnimation: Function;
    addSet: Function | null;
    addTimeline: Function;
    addTimelineChild: Function;
    addTimelineLabel: Function;
    addTimelineCall: Function;
    addTimelineSync: Function;
    addTimelineTimer: Function | null;
    addLayout: Function;
    addLayoutTransition: Function;
    createTweak: Function;
};
import type { DefaultsParams } from '../types/index.js';
import type { Scope } from '../scope/index.js';
import { doc } from './consts.js';

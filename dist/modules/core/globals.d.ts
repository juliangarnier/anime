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
export namespace globalVersions {
    let version: string;
    let engine: any;
}
export type EditorGlobals = {
    showPanel: boolean;
    addAnimation: Function;
    addSet: Function;
    addTimeline: Function;
    addTimelineChild: Function;
    addTimelineLabel: Function;
    addTimelineCall: Function;
    addTimelineSync: Function;
    resolveStagger: Function;
    _head: any | null;
    _tail: any | null;
};
import type { DefaultsParams } from '../types/index.js';
import type { Scope } from '../scope/index.js';
import { doc } from './consts.js';

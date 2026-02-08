/**
 * Anime.js - utils - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

export { clamp, damp, degToRad, lerp, mapRange, padEnd, padStart, radToDeg, round, roundPad, snap, wrap } from './chainable.js';
export { createSeededRandom, random, randomPick, shuffle } from './random.js';
export { keepTime, sync } from './time.js';
export { get, remove, set } from './target.js';
export { stagger } from './stagger.js';
export { cleanInlineStyles } from '../core/styles.js';
export { registerTargets as $ } from '../core/targets.js';

/**
 * Anime.js - utils - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var chainable = require('./chainable.cjs');
var random = require('./random.cjs');
var time = require('./time.cjs');
var target = require('./target.cjs');
var stagger = require('./stagger.cjs');
var styles = require('../core/styles.cjs');
var targets = require('../core/targets.cjs');



exports.clamp = chainable.clamp;
exports.damp = chainable.damp;
exports.degToRad = chainable.degToRad;
exports.lerp = chainable.lerp;
exports.mapRange = chainable.mapRange;
exports.padEnd = chainable.padEnd;
exports.padStart = chainable.padStart;
exports.radToDeg = chainable.radToDeg;
exports.round = chainable.round;
exports.roundPad = chainable.roundPad;
exports.snap = chainable.snap;
exports.wrap = chainable.wrap;
exports.createSeededRandom = random.createSeededRandom;
exports.random = random.random;
exports.randomPick = random.randomPick;
exports.shuffle = random.shuffle;
exports.keepTime = time.keepTime;
exports.sync = time.sync;
exports.get = target.get;
exports.remove = target.remove;
exports.set = target.set;
exports.stagger = stagger.stagger;
exports.cleanInlineStyles = styles.cleanInlineStyles;
exports.$ = targets.registerTargets;

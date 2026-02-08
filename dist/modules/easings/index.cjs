/**
 * Anime.js - easings - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var index = require('./cubic-bezier/index.cjs');
var index$1 = require('./steps/index.cjs');
var index$2 = require('./linear/index.cjs');
var index$3 = require('./irregular/index.cjs');
var index$4 = require('./spring/index.cjs');
var parser = require('./eases/parser.cjs');



exports.cubicBezier = index.cubicBezier;
exports.steps = index$1.steps;
exports.linear = index$2.linear;
exports.irregular = index$3.irregular;
exports.Spring = index$4.Spring;
exports.createSpring = index$4.createSpring;
exports.spring = index$4.spring;
exports.eases = parser.eases;

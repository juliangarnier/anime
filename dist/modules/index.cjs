/**
 * Anime.js - CJS
 * @version v4.3.6
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var timer = require('./timer/timer.cjs');
var animation = require('./animation/animation.cjs');
var timeline = require('./timeline/timeline.cjs');
var animatable = require('./animatable/animatable.cjs');
var draggable = require('./draggable/draggable.cjs');
var scope = require('./scope/scope.cjs');
var scroll = require('./events/scroll.cjs');
var engine = require('./engine/engine.cjs');
var index$2 = require('./easings/index.cjs');
var layout = require('./layout/layout.cjs');
var index$8 = require('./utils/index.cjs');
var index$6 = require('./svg/index.cjs');
var index$7 = require('./text/index.cjs');
var waapi = require('./waapi/waapi.cjs');
var targets = require('./core/targets.cjs');
var index = require('./easings/spring/index.cjs');
var split = require('./text/split.cjs');
var chainable = require('./utils/chainable.cjs');
var styles = require('./core/styles.cjs');
var drawable = require('./svg/drawable.cjs');
var motionpath = require('./svg/motionpath.cjs');
var random = require('./utils/random.cjs');
var index$1 = require('./easings/cubic-bezier/index.cjs');
var parser = require('./easings/eases/parser.cjs');
var target = require('./utils/target.cjs');
var index$3 = require('./easings/irregular/index.cjs');
var time = require('./utils/time.cjs');
var index$4 = require('./easings/linear/index.cjs');
var morphto = require('./svg/morphto.cjs');
var stagger = require('./utils/stagger.cjs');
var index$5 = require('./easings/steps/index.cjs');



exports.Timer = timer.Timer;
exports.createTimer = timer.createTimer;
exports.JSAnimation = animation.JSAnimation;
exports.animate = animation.animate;
exports.Timeline = timeline.Timeline;
exports.createTimeline = timeline.createTimeline;
exports.Animatable = animatable.Animatable;
exports.createAnimatable = animatable.createAnimatable;
exports.Draggable = draggable.Draggable;
exports.createDraggable = draggable.createDraggable;
exports.Scope = scope.Scope;
exports.createScope = scope.createScope;
exports.ScrollObserver = scroll.ScrollObserver;
exports.onScroll = scroll.onScroll;
exports.scrollContainers = scroll.scrollContainers;
exports.engine = engine.engine;
exports.easings = index$2;
exports.AutoLayout = layout.AutoLayout;
exports.createLayout = layout.createLayout;
exports.utils = index$8;
exports.svg = index$6;
exports.text = index$7;
exports.WAAPIAnimation = waapi.WAAPIAnimation;
exports.waapi = waapi.waapi;
exports.$ = targets.registerTargets;
exports.Spring = index.Spring;
exports.createSpring = index.createSpring;
exports.spring = index.spring;
exports.TextSplitter = split.TextSplitter;
exports.split = split.split;
exports.splitText = split.splitText;
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
exports.cleanInlineStyles = styles.cleanInlineStyles;
exports.createDrawable = drawable.createDrawable;
exports.createMotionPath = motionpath.createMotionPath;
exports.createSeededRandom = random.createSeededRandom;
exports.random = random.random;
exports.randomPick = random.randomPick;
exports.shuffle = random.shuffle;
exports.cubicBezier = index$1.cubicBezier;
exports.eases = parser.eases;
exports.get = target.get;
exports.remove = target.remove;
exports.set = target.set;
exports.irregular = index$3.irregular;
exports.keepTime = time.keepTime;
exports.sync = time.sync;
exports.linear = index$4.linear;
exports.morphTo = morphto.morphTo;
exports.stagger = stagger.stagger;
exports.steps = index$5.steps;

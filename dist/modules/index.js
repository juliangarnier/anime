/**
 * Anime.js - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

export { Timer, createTimer } from './timer/timer.js';
export { JSAnimation, animate } from './animation/animation.js';
export { Timeline, createTimeline } from './timeline/timeline.js';
export { Animatable, createAnimatable } from './animatable/animatable.js';
export { Draggable, createDraggable } from './draggable/draggable.js';
export { Scope, createScope } from './scope/scope.js';
export { ScrollObserver, onScroll, scrollContainers } from './events/scroll.js';
export { engine } from './engine/engine.js';
import * as index from './easings/index.js';
export { index as easings };
import * as index$1 from './utils/index.js';
export { index$1 as utils };
import * as index$2 from './svg/index.js';
export { index$2 as svg };
import * as index$3 from './text/index.js';
export { index$3 as text };
export { WAAPIAnimation, waapi } from './waapi/waapi.js';
export { cubicBezier } from './easings/cubic-bezier/index.js';
export { steps } from './easings/steps/index.js';
export { linear } from './easings/linear/index.js';
export { irregular } from './easings/irregular/index.js';
export { Spring, createSpring, spring } from './easings/spring/index.js';
export { eases } from './easings/eases/parser.js';
export { clamp, damp, degToRad, lerp, mapRange, padEnd, padStart, radToDeg, round, roundPad, snap, wrap } from './utils/chainable.js';
export { createSeededRandom, random, randomPick, shuffle } from './utils/random.js';
export { keepTime, sync } from './utils/time.js';
export { cleanInlineStyles } from './core/styles.js';
export { registerTargets as $ } from './core/targets.js';
export { get, remove, set } from './utils/target.js';
export { stagger } from './utils/stagger.js';
export { createMotionPath } from './svg/motionpath.js';
export { createDrawable } from './svg/drawable.js';
export { morphTo } from './svg/morphto.js';
export { TextSplitter, split, splitText } from './text/split.js';

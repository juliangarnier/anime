---
name: anime-core
description: >
  Core anime.js v4 animation API. Use when animating DOM elements, SVG, or plain
  JS objects: tweening transforms (x, y, scale, rotate, opacity), CSS properties,
  attributes, and numeric values; setting duration, delay, ease, loop, alternate;
  keyframes; from/to and relative values; function-based values; callbacks; and
  controlling playback (play, pause, restart, reverse, seek). anime.js v4 uses
  NAMED ES module imports and the signature animate(targets, params). It has NO
  default export and NO anime() function. If you write `import anime from
  'animejs'` or `anime({ targets })` that is the deprecated v3 API and it is
  wrong for v4; load the anime-migration-v3-v4 skill instead. Triggers: anime.js,
  animejs, animate, tween, animation, x, y, translate, scale, rotate, opacity,
  duration, delay, ease, loop, alternate, autoplay, keyframes, from, to,
  onComplete, onUpdate, onBegin, play, pause, restart, reverse, seek, timer,
  createTimer.
license: MIT
---

# anime.js v4: Core animation

anime.js v4 is an ES module with **named exports**. The main entry is
`animate(targets, params)`. There is **no default export** and **no `anime()`
function**. Writing `import anime from 'animejs'` or `anime({ targets, ... })`
is the deprecated **v3** API. See the `anime-migration-v3-v4` skill.

## Import

```js
import { animate } from 'animejs';
// A subpath import also works: import { animate } from 'animejs/animation';
```

## Basic animation

```js
import { animate, stagger } from 'animejs';

animate('.square', {
  x: 320,                                   // transform shorthand, not translateX
  rotate: { from: -180 },                   // object form: { from, to }
  scale: [0.5, 1],                          // array form: [from, to]
  opacity: 0.5,                             // single value: animates to 0.5
  duration: 1250,                           // milliseconds
  delay: stagger(65, { from: 'center' }),   // per-target delay
  ease: 'inOutQuint',                       // key is `ease`; value has no prefix
  loop: true,
  alternate: true,
});
```

`targets` accepts a CSS selector string, a DOM element, an array/NodeList of
elements, or a plain JS object (animate its numeric properties directly).

## Values: from/to, relative, function-based

```js
animate('.box', {
  opacity: [0, 1],              // [from, to]
  scale: { from: 0.5, to: 1 },  // { from, to }
  x: '+=100',                   // relative to the current value ('+=', '-=', '*=')
  rotate: () => utils.random(-90, 90),       // function evaluated per target
  width: (el, i) => `${100 + i * 20}px`,     // receives (target, index, length)
});
```

## Keyframes

```js
// Per-property keyframes (array of { to, duration, ease, ... })
animate('.box', {
  y: [
    { to: -40, duration: 300 },
    { to: 0,   duration: 300, ease: 'outBounce' },
  ],
});

// Shared keyframes via the `keyframes` array
animate('.box', {
  keyframes: [
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0,   y: 100 },
  ],
  duration: 3000,
  ease: 'inOut(2)',
});
```

## Callbacks

```js
animate('.box', {
  x: 200,
  onBegin:        self => {},
  onUpdate:       self => {},   // every frame
  onBeforeUpdate: self => {},
  onLoop:         self => {},
  onComplete:     self => {},   // self is the animation instance
});
```

`animate()` also returns a thenable, so `await animate(...)` resolves on complete.

## Playback control

```js
const animation = animate('.box', { x: 200, autoplay: false });

animation.play();
animation.pause();
animation.restart();
animation.reverse();
animation.alternate();
animation.resume();
animation.seek(500);          // jump to 500ms
animation.cancel();
animation.completed;          // boolean
animation.currentTime;        // ms
```

## Timers (a clock with no targets)

Use `createTimer` when you need looped/timed callbacks without animating a
property.

```js
import { createTimer } from 'animejs';

createTimer({
  duration: 1000,
  loop: true,
  onUpdate: self => { /* self.currentTime, self.iterationCurrentTime */ },
  onLoop:   self => {},
});
```

## Rules

- Durations and delays are in **milliseconds** by default.
- Use transform shorthands `x`, `y`, `scale`, `rotate`, `skew`, not
  `translateX` / `translateY` (those are v3).
- `ease` is a string like `'inOutQuint'`, `'out(4)'`, `'inOutSine'`, `'linear'`,
  `'steps(5)'`, or a spring or cubic-bezier. See `anime-utils-easings`.
- `loop` is a boolean or a number; `alternate: true` replaces v3
  `direction: 'alternate'`.
- To sequence multiple animations, use `createTimeline`. See `anime-timeline`.
- In React / Vue / Svelte, wrap animations in `createScope` and revert on
  unmount. See `anime-react` and `anime-frameworks`.

<!-- source: README.md usage example; examples/animejs-v4-logo-animation, examples/onscroll-sticky, examples/timeline-seamless-loop (dev branch, animejs 4.2.2) -->

---
name: anime-timeline
description: >
  anime.js v4 timelines for sequencing and choreographing multiple animations.
  Use when chaining animations in order, overlapping them with a position
  parameter, sharing defaults across many tweens, adding labels, calls, or
  syncing nested timers/animations. The v4 API is createTimeline(params) which
  returns a Timeline you build with .add(targets, params, position). It
  replaces the deprecated v3 anime.timeline(). Position accepts absolute ms, a
  relative string like '+=100' / '-=250', or the '<' / '<<' previous-animation
  anchors. Triggers: timeline, createTimeline, sequence, sequencing, choreograph,
  multi-step animation, animation order, position parameter, .add, defaults,
  labels, loop timeline, stagger timeline, nested timeline, sync.
license: MIT
---

# anime.js v4: Timelines

Create a timeline with `createTimeline()` and add animations to it with
`.add(targets, params, position)`. This replaces the v3 `anime.timeline()`.

## Import

```js
import { createTimeline, stagger } from 'animejs';
// Subpath: import { createTimeline } from 'animejs/timeline';
```

## Basic timeline

```js
import { createTimeline } from 'animejs';

const tl = createTimeline({
  defaults: {            // applied to every .add() unless overridden
    duration: 500,
    ease: 'inOutSine',
  },
  loop: true,
  alternate: true,
});

tl.add('.a', { x: 100 })
  .add('.b', { y: 100 })          // starts after .a finishes (default: end of previous)
  .add('.c', { rotate: 360 });
```

## Position parameter

The third argument to `.add()` controls when the animation starts.

```js
const tl = createTimeline();

tl.add('.a', { x: 100 }, 0)        // absolute: start at 0ms
  .add('.b', { x: 100 }, '+=250')  // relative: 250ms after the previous ends
  .add('.c', { x: 100 }, '-=100')  // overlap: 100ms before the previous ends
  .add('.d', { x: 100 }, '<')      // start at the same time as the previous animation
  .add('.e', { x: 100 }, '<<');    // start at the start of the previous animation
```

## Labels, sets and calls

```js
const tl = createTimeline();

tl.label('intro', 0)
  .add('.title', { opacity: [0, 1] }, 'intro')
  .set('.subtitle', { opacity: 0 })          // instant set, no tween
  .add('.subtitle', { opacity: 1 })
  .call(() => console.log('done'), '+=100'); // run a function at a position
```

## Staggered timeline

```js
import { createTimeline, stagger } from 'animejs';

createTimeline({ defaults: { duration: 750, ease: 'outElastic' } })
  .add('.item', {
    y: [40, 0],
    opacity: [0, 1],
    delay: stagger(80),     // each target offset by 80ms within this add
  });
```

## Playback control

A timeline exposes the same controls as an animation.

```js
const tl = createTimeline({ autoplay: false });
tl.add('.box', { x: 200 });

tl.play();
tl.pause();
tl.restart();
tl.reverse();
tl.seek(1000);
```

## Rules

- Build with `createTimeline()` then `.add()`, never `anime.timeline()` (v3).
- Put shared options in `defaults: {}`; per-`.add()` params override them.
- The position parameter is the **third** arg of `.add()`: absolute number,
  relative `'+='`/`'-='` string, or `'<'`/`'<<'` anchors.
- A per-`.add()` `delay: stagger(...)` staggers the targets within that add.
- Timelines are tickable like animations: `play/pause/restart/reverse/seek`.

<!-- source: examples/onscroll-sticky, examples/timeline-seamless-loop, examples/animejs-v4-logo-animation (dev branch, animejs 4.2.2) -->

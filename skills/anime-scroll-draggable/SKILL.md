---
name: anime-scroll-draggable
description: >
  anime.js v4 interactivity: scroll-driven animation, draggable elements, the
  animatable cursor-follow pattern, and scopes. Use onScroll({ target, enter,
  leave, sync }) as an animation's `autoplay` value to scrub/trigger it with
  scroll; createDraggable(target, { container, x, y, snap }) to make elements
  draggable; createAnimatable(targets, props) for high-frequency setter-style
  updates (mouse/pointer follow); and createScope({ mediaQueries, root }).add(fn)
  to bind responsive, revertible animations. Triggers: onScroll, scroll
  animation, scroll trigger, scrub, sync scroll, scroll-driven, createDraggable,
  draggable, drag, drag and drop, snap, createAnimatable, animatable, follow
  cursor, pointer follow, createScope, scope, responsive animation, mediaQueries,
  revert.
license: MIT
---

# anime.js v4: Scroll, Draggable, Animatable, Scope

```js
import {
  animate, createTimeline, onScroll,
  createDraggable, createAnimatable, createScope, utils, stagger,
} from 'animejs';
// Subpaths: animejs/events (onScroll), animejs/draggable, animejs/animatable, animejs/scope
```

## Scroll-driven: `onScroll` as `autoplay`

`onScroll({ ... })` is passed as the `autoplay` value of an animation or
timeline. Use `sync` to scrub progress to scroll position.

```js
import { animate, onScroll } from 'animejs';

animate('.box', {
  x: 320,
  rotate: 360,
  autoplay: onScroll({
    target: '.box',          // element whose scroll position drives playback
    enter: 'bottom top',     // when target bottom hits viewport top
    leave: 'top bottom',
    sync: true,              // scrub to scroll; or a number for smoothing
  }),
});
```

On a timeline:

```js
createTimeline({
  defaults: { ease: 'linear', duration: 500 },
  autoplay: onScroll({
    target: '.sticky-container',
    enter: 'top top',
    leave: 'bottom bottom',
    sync: 0.5,
  }),
})
.add('.stack', { rotateY: [-180, 0] }, 0)
.add('.card', { rotate: 0 });
```

## Draggable: `createDraggable`

```js
import { createDraggable } from 'animejs';

createDraggable('.box', {
  container: document.body,        // bounds
  containerPadding: 20,
  snap: 50,                        // snap to a 50px grid (or [..] / function)
  onDrag:    self => {},
  onRelease: self => {},
});

// Constrain to one axis with x/y objects:
createDraggable('.slider', { x: true, y: false, snap: 10 });
```

## Animatable: `createAnimatable` (cursor follow, high-frequency setters)

`createAnimatable` registers properties as callable setters that animate toward
the value you pass each frame. Great for pointer-follow.

```js
import { createAnimatable, utils } from 'animejs';

const follower = createAnimatable('.dot', {
  x: 500,                 // duration in ms to ease toward new values
  y: 500,
  ease: 'out(3)',
});

window.onpointermove = e => {
  follower.x(e.clientX);  // call the property as a function to set+animate
  follower.y(e.clientY);
};
```

## Scope: `createScope` (responsive + revertible)

`createScope({ mediaQueries, defaults, root }).add(scope => {...})` groups
animations so they can react to media queries and be reverted together. Inside,
check `scope.matches.<name>`.

```js
import { animate, createScope, stagger } from 'animejs';

const scope = createScope({
  mediaQueries: { landscape: '(orientation: landscape)' },
  defaults: { ease: 'out(3)', duration: 500 },
}).add(scope => {
  if (scope.matches.landscape) {
    animate('.card', { y: stagger(['-40vh', '40vh'], { from: 'center' }) });
  } else {
    animate('.card', { opacity: [0, 1], delay: stagger(60) });
  }

  // optional cleanup returned from the add callback
  return () => {};
});

// Later (e.g. on unmount): scope.revert();
```

## Rules

- `onScroll(...)` is the **value of `autoplay`**, not a standalone call. Attach
  it to an `animate()` or `createTimeline()`.
- Use `sync: true` (or a number) to scrub the animation to scroll position;
  omit it for enter/leave triggering.
- `createAnimatable` properties are **functions you call each frame**
  (`anim.x(value)`), not regular tweens.
- Wrap responsive/conditional animation in `createScope(...).add(fn)` and call
  `scope.revert()` to clean up. This is essential in React/Vue (see those skills).

<!-- source: examples/onscroll-sticky, examples/onscroll-responsive-scope, examples/draggable-playground, examples/animatable-follow-cursor; src/draggable/draggable.js, src/scope/scope.js (dev branch, animejs 4.2.2) -->

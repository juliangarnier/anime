---
name: anime-waapi
description: >
  anime.js v4 Web Animations API (WAAPI) helper, exposed as waapi.animate. Use
  when you want hardware-accelerated animations that run on the browser's native
  compositor (transforms and opacity that keep moving smoothly even when the main
  thread is busy). waapi.animate(targets, params) has the same shape as the main
  animate() but compiles to a native WAAPI animation, with anime's nicer defaults:
  multiple targets, default units, function-based values, individual transforms,
  and spring or custom easings via waapi.convertEase. Triggers: waapi, web
  animations api, hardware acceleration, hardware accelerated, compositor, native
  animation, performance animation, waapi.animate, convertEase, off main thread,
  GPU animation.
license: MIT
---

# anime.js v4: Web Animations API (WAAPI)

`waapi.animate` compiles to a native Web Animations API animation, so transforms
and opacity run on the compositor and stay smooth even when the main thread is
busy. It takes the same kind of params as the main `animate`, plus anime's nicer
defaults.

```js
import { waapi } from 'animejs';
// Subpath: import { waapi } from 'animejs/waapi';
```

## Basic WAAPI animation

```js
import { waapi } from 'animejs';

waapi.animate('.box', {
  translate: '100px',
  rotate: '1turn',
  opacity: [0, 1],
  duration: 1000,
  ease: 'out(3)',
});
```

## What anime adds on top of native WAAPI

```js
import { waapi, stagger } from 'animejs';

waapi.animate('.item', {
  scale: [0.5, 1],            // arrays work as [from, to]
  x: (el, i) => i * 20,       // function-based values
  delay: stagger(60),         // multiple targets + stagger
  ease: 'outElastic',         // spring/custom eases via convertEase under the hood
});
```

## Custom and spring easings

For eases the native WAAPI does not understand, convert them first.

```js
import { waapi, createSpring } from 'animejs';

waapi.animate('.box', {
  x: 200,
  ease: waapi.convertEase(createSpring({ stiffness: 120, damping: 10 })),
});
```

## When to use WAAPI vs the JS animate

- Use `waapi.animate` for transforms and opacity you want offloaded to the
  compositor (smooth under load, good for many elements).
- Use the JS `animate` (see `anime-core`) when you need to animate non-compositor
  properties, fine playback control, timelines, or callbacks per frame.

## Rules

- Go through the `waapi` namespace: `waapi.animate`, `waapi.convertEase`.
- The params look like `animate`'s, but this is a native WAAPI animation, so
  per-frame `onUpdate` and JS-only features differ. See the docs for WAAPI
  differences (iterations, direction, easing, finished).
- For spring or custom eases, wrap them in `waapi.convertEase`.

<!-- source: src/waapi/waapi.js (waapi.animate, waapi.convertEase); dist exports waapi = { animate, convertEase } and WAAPIAnimation (dev branch, animejs 4.2.2) -->

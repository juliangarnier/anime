---
name: anime-migration-v3-v4
description: >
  Convert deprecated anime.js v3 code to v4, and recognize/fix v3 syntax an AI
  might emit by mistake. READ THIS whenever you see the v3 default export `import
  anime from 'animejs'`, a call to `anime({ targets: ... })`, `translateX` /
  `translateY`, `easing:` with `easeInOutQuad`-style values, `anime.timeline()`,
  `anime.stagger()`, `anime.random/set/get`, `direction: 'alternate'`, the
  `value:` property key, or callbacks named `update`/`begin`/`complete`/`change`.
  v4 is ESM named imports with animate(targets, params). This skill is the
  canonical before/after mapping. Triggers: v3, v4, migration, migrate, upgrade,
  deprecated, anime is not a function, default export, anime(), targets,
  translateX, translateY, easing, easeInOut, anime.timeline, anime.stagger,
  anime.random, direction, convert anime, old anime syntax.
license: MIT
---

# anime.js v3 → v4 migration

If you encounter v3 syntax (below), convert it. v4 has **no default export** and
**no `anime()` function**.

## Imports & the main call

```js
// v3 (WRONG for v4)
import anime from 'animejs';
anime({ targets: 'div', translateX: 100, easing: 'easeInOutQuad' });

// v4 (CORRECT)
import { animate } from 'animejs';
animate('div', { x: 100, ease: 'inOutQuad' });
```

## Mapping table

| v3 | v4 |
| --- | --- |
| `import anime from 'animejs'` | `import { animate } from 'animejs'` (named) |
| `anime({ targets: '.x', ... })` | `animate('.x', { ... })` |
| `translateX`, `translateY` | `x`, `y` |
| `easing: 'easeInOutQuad'` | `ease: 'inOutQuad'` (key `ease`; drop the `ease` prefix) |
| `opacity: { value: .5 }` | `opacity: { to: .5 }` |
| `direction: 'alternate'` | `alternate: true` |
| `direction: 'reverse'` | `reversed: true` |
| `round: 100` | `modifier: utils.round(2)` |
| `anime.timeline()` | `createTimeline()` |
| `anime.timeline({ easing, duration })` | `createTimeline({ defaults: { ease, duration } })` |
| `update`, `begin`, `complete` | `onUpdate`, `onBegin`, `onComplete` |
| `loopBegin` / `loopComplete` | `onLoop` |
| `change` | `onRender` |
| `.finished.then(...)` | `.then(...)` (the animation is thenable) |
| `anime.stagger(100)` | `stagger(100)` (named import) |
| `anime.random()` | `utils.random()` |
| `anime.set()` | `utils.set()` |
| `anime.get()` | `utils.get()` |
| `animation.remove()` | `utils.remove()` |
| `anime.path()` | `svg.createMotionPath()` |
| `anime.setDashoffset()` | `svg.createDrawable()` (animate the `draw` property) |
| motion path returns `{ x, y, angle }` | returns `{ translateX, translateY, rotate }` |
| `easing: 'spring(1, 80, 10, 0)'` | `ease: createSpring({ mass: 1, stiffness: 80, damping: 10, velocity: 0 })` |
| `anime.suspendWhenDocumentHidden` | `engine.pauseOnDocumentHidden` |
| `animation.tick()` | `engine.useDefaultMainLoop = false; engine.update()` |

> `loop` semantics changed: in v4, `loop: 1` means **repeat once** (2 total
> iterations), not "run once".

## Worked example

```js
// v3
import anime from 'animejs';
anime({
  targets: '.box',
  translateX: 250,
  rotate: '1turn',
  easing: 'easeInOutQuad',
  direction: 'alternate',
  loop: true,
  update: () => {},
  complete: () => {},
});

// v4
import { animate } from 'animejs';
animate('.box', {
  x: 250,
  rotate: '1turn',
  ease: 'inOutQuad',
  alternate: true,
  loop: true,
  onUpdate: () => {},
  onComplete: () => {},
});
```

## Timeline migration

```js
// v3
const tl = anime.timeline({ easing: 'easeOutExpo', duration: 750 });
tl.add({ targets: '.a', translateX: 250 })
  .add({ targets: '.b', translateX: 250 }, '-=600');

// v4
import { createTimeline } from 'animejs';
const tl = createTimeline({ defaults: { ease: 'outExpo', duration: 750 } });
tl.add('.a', { x: 250 })
  .add('.b', { x: 250 }, '-=600');
```

## Quick checklist when fixing AI-written v3

1. Default import → named `{ animate }`.
2. `anime({ targets, ... })` → `animate(targets, { ... })`.
3. `translateX/Y` → `x/y`.
4. `easing: 'easeX'` → `ease: 'x'`.
5. `direction` → `alternate` / `reversed`.
6. `update/begin/complete/change` → `onUpdate/onBegin/onComplete/onRender`.
7. `anime.timeline/stagger/random/set/get` → `createTimeline` / `stagger` /
   `utils.*`.

<!-- source: official "Migrating from v3 to v4" wiki guide; verified against dev branch src/index.js exports (animejs 4.2.2) -->

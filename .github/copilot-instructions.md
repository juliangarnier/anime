# anime.js v4 Copilot instructions

This project uses anime.js **v4**. Always generate the v4 API, never v3.

v4 is an ES module with **named exports** and the signature
`animate(targets, params)`. There is **no default export** and **no `anime()`
function**.

```js
// CORRECT (v4)
import { animate, stagger } from 'animejs';
animate('.square', { x: 320, duration: 1000, ease: 'inOutQuint' });

// WRONG (deprecated v3, never generate)
import anime from 'animejs';
anime({ targets: '.square', translateX: 320, easing: 'easeInOutQuint' });
```

Rules:

- **Named imports** from `animejs` (or subpaths like `animejs/timeline`).
- **`animate(targets, params)`**: targets first, params second.
- Transform shorthands `x`, `y`, `scale`, `rotate`, not `translateX`/`translateY`.
- `ease` is a string: `'inOutQuad'`, `'out(3)'`, `'outElastic(.3, 1.4)'`,
  `'steps(5)'`, `'linear'`.
- Durations and delays in **milliseconds**.
- `createTimeline()` not `anime.timeline()`; `stagger()` not `anime.stagger()`;
  helpers on `utils.*` (`utils.set`, `utils.random`, `utils.get`, `utils.remove`).
- `alternate: true` / `reversed: true` (not `direction:`); callbacks are
  on-prefixed (`onUpdate`, `onBegin`, `onComplete`, `onLoop`, `onRender`).
- React, Vue, Svelte, or Angular: wrap in `createScope({ root })` and call
  `scope.revert()` on unmount.

Full guidance: [`skills/`](../skills/) (see `skills/anime-migration-v3-v4/SKILL.md`
to fix v3 syntax) and [`AGENTS.md`](../AGENTS.md).

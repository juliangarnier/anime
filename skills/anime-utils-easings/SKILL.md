---
name: anime-utils-easings
description: >
  anime.js v4 utility helpers (utils namespace) and easing system (easings
  namespace + ease strings). Use for staggering animations with stagger(value,
  { from, grid, axis, modifier }); selecting/getting/setting DOM via utils.$,
  utils.get, utils.set, utils.remove; math/animation helpers like utils.clamp,
  round, lerp, mapRange, snap, wrap, damp, random; and choosing easing, either
  string forms ('inOutQuad', 'out(3)', 'outElastic(.3, 1.4)', 'steps(5)',
  'linear') or builders cubicBezier(x1,y1,x2,y2), spring/createSpring, steps,
  irregular, and the eases object. Triggers: utils, stagger, random, utils.set,
  utils.get, utils.$, remove, clamp, round, lerp, mapRange, snap, wrap, damp,
  ease, easing, easings, cubicBezier, spring, createSpring, steps, irregular,
  eases, inOutQuad, outElastic, easing function, stagger grid.
license: MIT
---

# anime.js v4: Utils & Easings

```js
import { animate, stagger, utils, easings, createSpring, cubicBezier, eases } from 'animejs';
// Subpaths: animejs/utils, animejs/easings
```

## Stagger: `stagger`

`stagger(value, options)` returns a function that spreads a value across
targets. Use it for `delay`, or any property value.

```js
import { animate, stagger } from 'animejs';

animate('.item', {
  y: [40, 0],
  delay: stagger(80),                              // 0, 80, 160, ...
});

animate('.item', {
  x: stagger(['-20%', '20%']),                     // interpolate across a range
  delay: stagger(60, { from: 'center' }),          // 'first' | 'last' | 'center' | index
});

// Grid stagger (rows x cols), per-axis, with a modifier
const brightness = v => `brightness(${v})`;
animate('.cell', {
  delay: stagger(50, { grid: [10, 10], axis: 'x', from: 'center' }),
  filter: stagger([0.75, 1], { modifier: brightness }),
});
```

Stagger options: `from` (`'first' | 'last' | 'center' | number`), `grid`
(`[cols, rows]`), `axis` (`'x' | 'y'`), `reversed`, `start`, `ease`, `modifier`,
`total`.

## DOM utils: `$`, `get`, `set`, `remove`

```js
import { utils } from 'animejs';

const [ $el ] = utils.$('#box');           // query → array of elements
utils.set('.box', { opacity: 0, x: 0 });   // instant set (no tween)
const value = utils.get($el, 'opacity');   // read an animated/computed value
utils.remove('.box');                      // remove running animations from targets
utils.cleanInlineStyles($el);              // strip inline styles anime added
```

## Math / animation helpers

```js
import { utils } from 'animejs';

utils.clamp(120, 0, 100);          // 100
utils.round(3.14159, 2);           // 3.14
utils.lerp(0, 100, 0.5);           // 50
utils.mapRange(50, 0, 100, -1, 1); // 0
utils.snap(43, 10);                // 40
utils.wrap(12, 0, 10);             // wraps into [0,10)
utils.damp(current, target, 0.1);  // frame-rate independent damping
utils.random(0, 100, 2);           // random with optional decimal length
utils.randomPick(['a', 'b', 'c']);
utils.shuffle([1, 2, 3]);

// Chainable: utils.round(0) returns a chainable number modifier
const r = utils.round(0).clamp(0, 100);
```

## Easing: strings (preferred)

Pass `ease` as a string. Named eases and parametrized forms:

```js
animate('.box', { x: 100, ease: 'inOutQuad' });      // named
animate('.box', { x: 100, ease: 'out(3)' });          // power: in/out/inOut(p)
animate('.box', { x: 100, ease: 'outElastic(.3, 1.4)' }); // elastic(amplitude, period)
animate('.box', { x: 100, ease: 'steps(5)' });        // stepped
animate('.box', { x: 100, ease: 'linear' });
```

Built-in names include `linear`, `in/out/inOut/outIn` + `Quad`, `Cubic`,
`Quart`, `Quint`, `Sine`, `Circ`, `Expo`, `Bounce`, `Back`, `Elastic`.

## Easing: builders

```js
import { animate, cubicBezier, createSpring, steps, eases } from 'animejs';

animate('.box', { x: 100, ease: cubicBezier(0.225, 1, 0.915, 0.98) });
animate('.box', { x: 100, ease: createSpring({ stiffness: 120, damping: 10 }) });
animate('.box', { x: 100, ease: steps(10) });
animate('.box', { x: 100, ease: eases.outElastic(1.1, 0.9) });  // eases.* factories
```

## Rules

- Prefer **string eases** (`'inOutQuint'`, `'out(3)'`, `'outElastic(.3,1.4)'`);
  reach for `cubicBezier` / `createSpring` / `steps` only when a string can't
  express it.
- `stagger()` returns a function. Pass it as `delay` or as a property value, do
  not call it yourself.
- Use `utils.set` for instant changes and `utils.$` to query; `utils.remove` to
  stop animations on targets.
- Helpers like `clamp`, `round`, `lerp`, `mapRange`, `snap`, `wrap`, `damp`,
  `random` live on `utils.*` (in v3 several were `anime.*`).

<!-- source: examples/onscroll-sticky, examples/easings-visualizer, examples/animatable-follow-cursor, examples/advanced-grid-staggering; src/utils/stagger.js, src/easings (dev branch, animejs 4.2.2) -->

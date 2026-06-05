---
name: anime-svg
description: >
  anime.js v4 SVG animation utilities, exposed under the svg namespace. Use when
  animating SVG line drawing / stroke reveal (svg.createDrawable + the `draw`
  property), moving an element along a path (svg.createMotionPath), or morphing
  one shape into another (svg.morphTo). Import them as `import { svg } from
  'animejs'` and call svg.createDrawable(selector, start, end),
  svg.createMotionPath(path, offset), or svg.morphTo(targetPath, precision).
  Triggers: svg, svg animation, line drawing, stroke, stroke-dashoffset, draw,
  createDrawable, drawable, motion path, createMotionPath, follow path, morph,
  morphTo, shape morphing, path animation, animate svg.
license: MIT
---

# anime.js v4: SVG

The SVG helpers live on the `svg` namespace. Import it and combine with
`animate` or `createTimeline`.

```js
import { animate, createTimeline, svg } from 'animejs';
// Subpath: import { svg } from 'animejs/svg';
```

## Line drawing: `svg.createDrawable` + `draw`

`svg.createDrawable(selector, start = 0, end = 0)` returns drawable proxy
target(s). Animate the special `draw` property with `'start end'` strings (0 to 1).

```js
import { animate, svg } from 'animejs';

const line = svg.createDrawable('.line');

animate(line, {
  draw: ['0 0', '0 1'],   // from fully hidden to fully drawn
  duration: 2000,
  ease: 'inOutQuad',
});
```

In a timeline:

```js
import { createTimeline, svg } from 'animejs';

createTimeline()
  .add(svg.createDrawable('.line-v'), {
    draw: ['0 0', '0 1', '1 1'],   // draw in, then retract
    duration: 1000,
  })
  .add(svg.createDrawable('.circle'), {
    draw: ['0 0.5', '0 1'],
  });
```

## Motion path: `svg.createMotionPath`

`svg.createMotionPath(path, offset = 0)` returns
`{ translateX, translateY, rotate }` property functions. Spread them into the
animation so the target follows the path (auto-rotating along it).

```js
import { animate, svg } from 'animejs';

animate('.dot', {
  ...svg.createMotionPath('#path'),   // translateX, translateY, rotate
  duration: 4000,
  ease: 'inOutQuad',
  loop: true,
});
```

## Morphing: `svg.morphTo`

`svg.morphTo(targetPathOrSelector, precision = 0.33)` returns a function used as
a tween value (typically as a `{ to: ... }` keyframe) to morph one `<path>` into
another.

```js
import { animate, svg } from 'animejs';

// Morph #shape's `d` toward the path of #shape-b
animate('#shape', {
  d: svg.morphTo('#shape-b'),
  duration: 500,
  ease: 'inOutQuad',
});

// As keyframes between several shapes
animate('#line path', {
  d: [
    { to: svg.morphTo('#line-1'), duration: 340, ease: 'inOutQuad' },
    { to: svg.morphTo('#line-2'), duration: 260 },
  ],
});
```

## Rules

- Always go through the `svg` namespace: `svg.createDrawable`,
  `svg.createMotionPath`, `svg.morphTo`.
- For line drawing, animate the `draw` property (a `'start end'` string, values
  0 to 1) on a target returned by `svg.createDrawable`. Do not hand-animate
  `stroke-dashoffset`.
- `svg.createMotionPath` returns properties to **spread** into the animation
  params, not call directly.
- `svg.morphTo` requires both shapes to be `<path>` elements; pass the target as
  a selector or element.

<!-- source: examples/svg-line-drawing, examples/svg-graph, examples/animejs-v4-logo-animation; src/svg/{drawable,motionpath,morphto}.js (dev branch, animejs 4.2.2) -->

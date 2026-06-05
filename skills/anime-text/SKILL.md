---
name: anime-text
description: >
  anime.js v4 text splitting and per-character / per-word / per-line text
  animation, exposed via splitText and the text namespace. Use when animating
  text by breaking it into lines, words, or characters and staggering an
  animation across the pieces (typewriter reveals, word-by-word fades, character
  bounces). The v4 API is splitText(target, { lines, words, chars }) which
  returns a TextSplitter exposing .lines, .words, .chars arrays plus
  .addEffect(fn) and .revert(). Animate those arrays with animate() or a
  timeline, usually with stagger(). Triggers: text animation, split text,
  splitText, TextSplitter, split into characters, per-character, per-word,
  per-line, words, chars, lines, typewriter, text reveal, stagger text, animate
  letters, text effect.
license: MIT
---

# anime.js v4: Text

Split text into animatable pieces with `splitText`, then animate the resulting
`.chars` / `.words` / `.lines` arrays.

```js
import { animate, createTimeline, stagger, splitText } from 'animejs';
// Subpath: import { splitText } from 'animejs/text';
```

> Note: this `dev` build (animejs 4.2.2) exposes `splitText` / `split` /
> `TextSplitter`. There is no `scrambleText` export here.

## Split and animate

`splitText(target, { lines, words, chars })` returns a `TextSplitter` with
`.lines`, `.words`, and `.chars` element arrays (whichever you enabled).

```js
import { animate, stagger, splitText } from 'animejs';

const split = splitText('.headline', { chars: true });

animate(split.chars, {
  y: [40, 0],
  opacity: [0, 1],
  duration: 600,
  delay: stagger(30),     // each character offset by 30ms
  ease: 'out(3)',
});
```

## Words and lines

```js
const split = splitText('p', { words: true, lines: true });

animate(split.words, {
  opacity: [0, 1],
  delay: stagger(50),
});
```

## Effects that re-run on resize: `addEffect`

When splitting by `lines`, line boundaries change on resize. `addEffect`
re-applies your animation each time the text is re-split. Returning a timeline
syncs it with the splitter.

```js
import { createTimeline, splitText } from 'animejs';

const split = splitText('p', { lines: true });

split.addEffect(split => {
  return createTimeline({
    defaults: { duration: 1500, ease: 'inOutQuad', loop: true, alternate: true },
  })
  .add(split.lines, {
    y: [20, 0],
    opacity: [0, 1],
    delay: stagger(100),
  });
});
```

## Revert

```js
split.revert();   // restores the original, un-split markup
```

## Rules

- Use `splitText(target, { lines, words, chars })` and animate the returned
  `.lines` / `.words` / `.chars` arrays. These are real DOM elements.
- Pair with `stagger()` (see `anime-utils-easings`) for sequential reveals.
- For line-based effects that must survive resize, use `.addEffect()`; return a
  timeline to sync it with re-splitting.
- Call `.revert()` to restore the original text (and always revert on unmount in
  React / Vue, see `anime-react` / `anime-frameworks`).

<!-- source: examples/text/split-effects, examples/text/split-playground; src/text/split.js (dev branch, animejs 4.2.2) -->

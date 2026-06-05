---
applyTo: "**/*.{js,ts,mjs,cjs}"
---

When writing anime.js in JavaScript/TypeScript files, follow
[`skills/anime-core/SKILL.md`](../../skills/anime-core/SKILL.md):

- Named imports from `animejs`; `animate(targets, params)`.
- Transform shorthands `x`/`y`/`scale`/`rotate` (not `translateX`/`translateY`).
- `ease` string (`'inOutQuint'`, `'out(3)'`); durations in milliseconds.
- `createTimeline()`, `stagger()`, `utils.*`, never `anime.timeline/stagger/random`.

If you see v3 syntax (`import anime from 'animejs'`, `anime({ targets })`),
convert it per [`skills/anime-migration-v3-v4/SKILL.md`](../../skills/anime-migration-v3-v4/SKILL.md).

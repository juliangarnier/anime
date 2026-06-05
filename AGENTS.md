# AGENTS.md: anime.js v4

Guidance for AI coding agents (Claude Code, Cursor, Copilot, Gemini, and others)
working with anime.js. The detailed skills for each area live in [`skills/`](skills/).
This file is the front door and the rules you must follow.

## The one rule that matters

**This is anime.js v4. Generate the v4 API, never v3.**

v4 is an ES module with **named exports** and the signature
`animate(targets, params)`. There is **no default export** and **no `anime()`
function**.

```js
// CORRECT (v4)
import { animate, stagger } from 'animejs';
animate('.square', { x: 320, duration: 1000, ease: 'inOutQuint' });

// WRONG (deprecated v3, never generate this)
import anime from 'animejs';
anime({ targets: '.square', translateX: 320, easing: 'easeInOutQuint' });
```

## Core conventions

- **Named imports** from `animejs` (or subpaths like `animejs/timeline`).
- **`animate(targets, params)`**: targets first (selector, element, array, or
  object), params second.
- Transform **shorthands**: `x`, `y`, `scale`, `rotate`, `skew`. Not
  `translateX` or `translateY`.
- The easing key is **`ease`**, and its value is a string with no prefix:
  `'inOutQuad'`, `'out(3)'`, `'outElastic(.3, 1.4)'`, `'steps(5)'`, `'linear'`.
- **Milliseconds** for `duration` and `delay`.
- Use `createTimeline()`, not `anime.timeline()`. Use `stagger()` as a named
  import, not `anime.stagger()`. Helpers live on `utils.*` (`utils.set`,
  `utils.random`, `utils.get`, `utils.remove`).
- Use `alternate: true` and `reversed: true`, not `direction:`. Callbacks are
  on-prefixed (`onUpdate`, `onBegin`, `onComplete`, `onLoop`, `onRender`).
- In React, Vue, Svelte, or Angular: wrap animations in
  `createScope({ root })` and call `scope.revert()` on unmount.

## Skills (read the one matching the task)

| Skill | When |
| --- | --- |
| [anime-core](skills/anime-core/SKILL.md) | animate(), timers, transforms, keyframes, callbacks, playback |
| [anime-timeline](skills/anime-timeline/SKILL.md) | sequencing with createTimeline + position parameter |
| [anime-svg](skills/anime-svg/SKILL.md) | line drawing, motion path, morphing |
| [anime-text](skills/anime-text/SKILL.md) | splitText into lines/words/chars |
| [anime-scroll-draggable](skills/anime-scroll-draggable/SKILL.md) | onScroll, createDraggable, createAnimatable, createScope |
| [anime-utils-easings](skills/anime-utils-easings/SKILL.md) | utils.* helpers, stagger, easing |
| [anime-waapi](skills/anime-waapi/SKILL.md) | hardware-accelerated Web Animations API |
| [anime-engine](skills/anime-engine/SKILL.md) | global defaults, time unit, speed, custom loop |
| [anime-react](skills/anime-react/SKILL.md) | React (useRef + useEffect + scope.revert) |
| [anime-frameworks](skills/anime-frameworks/SKILL.md) | Vue / Svelte / Angular |
| [anime-migration-v3-v4](skills/anime-migration-v3-v4/SKILL.md) | converting or fixing v3 syntax |

## Skills or MCP?

Use the **skills**. They are the main thing and cover almost every case. Install
them with `npx skills add https://github.com/juliangarnier/anime` and your agent
reads them as plain files. No server to run.

There is also an optional [MCP server](mcp/) that serves the same skills as
resources and adds a `check_anime_v4_syntax` tool. It is only worth it if your
client is MCP-native and you want those exposed as callable tools. It runs no
code and fetches nothing, so it is a convenience, not a requirement. When in
doubt, use the skills.

## Editing these skills

Each skill is `skills/<name>/SKILL.md` with YAML frontmatter (`name` must equal
the folder name, `description` must be 1024 chars or fewer and written in the
third person, `license: MIT`). Keep bodies focused and under about 500 lines,
with code examples in fenced ` ```js ` blocks. Every code example must be valid
v4. Running `node scripts/validate-skills.mjs` checks that every documented
symbol is a real export of the built library and that no v3 token leaks outside
the migration skill.

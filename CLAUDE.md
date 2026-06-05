# CLAUDE.md: anime.js v4

This is **anime.js v4**. Generate the v4 API, never v3.

v4 uses **named ES imports** and `animate(targets, params)`. There is no default
export and no `anime()` function.

```js
// CORRECT (v4)
import { animate } from 'animejs';
animate('.square', { x: 320, duration: 1000, ease: 'inOutQuint' });

// WRONG (deprecated v3)
import anime from 'animejs';
anime({ targets: '.square', translateX: 320, easing: 'easeInOutQuint' });
```

Full conventions and skills for each area are in [AGENTS.md](AGENTS.md) and
[`skills/`](skills/). When writing or fixing anime.js code, load the matching
`skills/<name>/SKILL.md` (for example `anime-core`, `anime-timeline`, `anime-svg`,
`anime-react`, `anime-migration-v3-v4`).

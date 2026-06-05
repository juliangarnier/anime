---
applyTo: "**/*.{vue,svelte}"
---

When writing anime.js in Vue or Svelte files, follow
[`skills/anime-frameworks/SKILL.md`](../../skills/anime-frameworks/SKILL.md):

- Build animations on mount (Vue `onMounted`, Svelte `onMount`) inside
  `createScope({ root })` bound to a template ref.
- Call `scope.revert()` on destroy (`onUnmounted` / `onDestroy`).
- Use the v4 API: named imports, `animate(targets, params)`, `x`/`y` shorthands,
  `ease` strings, `stagger()`, `utils.*`. Never the v3 `anime({ targets })`.

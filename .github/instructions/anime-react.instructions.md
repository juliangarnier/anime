---
applyTo: "**/*.{jsx,tsx}"
---

When writing anime.js in React files, follow
[`skills/anime-react/SKILL.md`](../../skills/anime-react/SKILL.md):

- Create animations inside `useEffect` (or event handlers), never during render.
- Wrap them in `createScope({ root })` where `root` is a `useRef` to the
  component container; scoped selectors resolve within that subtree.
- **Always** `return () => scope.current.revert()` from the effect (StrictMode-
  and unmount-safe).
- Use the v4 API: named imports, `animate(targets, params)`, `x`/`y` shorthands,
  `ease` strings, `stagger()`, `utils.*`.

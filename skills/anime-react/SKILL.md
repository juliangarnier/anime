---
name: anime-react
description: >
  anime.js v4 in React. Use when animating inside React components: scope every
  animation with createScope({ root }) where root is a useRef to the component's
  container, run it inside useEffect, and call scope.revert() in the cleanup
  function so animations and inline styles are torn down on unmount. Scope's root
  natively understands a React ref (it reads ref.current), so selectors inside
  the scope are resolved within that subtree. This avoids leaks, double-runs
  under StrictMode, and SSR issues. Triggers: react, react animation, useEffect,
  useRef, ref, createScope, scope, cleanup, revert, unmount, StrictMode, next.js,
  nextjs, hooks, component animation, animate in react.
license: MIT
---

# anime.js v4: React

Always animate through a **scope** tied to a ref, created in `useEffect`, and
reverted in the cleanup. `createScope({ root })` accepts a React ref directly
(it reads `root.current`).

```jsx
import { useEffect, useRef } from 'react';
import { animate, createScope, stagger } from 'animejs';

export const Cards = () => {
  const root = useRef(null);
  const scope = useRef(null);

  useEffect(() => {
    scope.current = createScope({ root }).add(self => {
      // selectors resolve within `root` (the ref's subtree)
      animate('.card', {
        y: [40, 0],
        opacity: [0, 1],
        delay: stagger(80),
        duration: 600,
        ease: 'out(3)',
      });

      // register named methods you can call later (optional)
      self.add('pulse', () => {
        animate('.card', { scale: [1, 1.1, 1], duration: 400 });
      });
    });

    return () => scope.current.revert();   // cleanup: revert ALL scoped animations
  }, []);

  return (
    <section ref={root}>
      <article className="card">A</article>
      <article className="card">B</article>
    </section>
  );
};
```

## Triggering scoped methods from handlers

```jsx
const onPulse = () => scope.current.methods.pulse();
// <button onClick={onPulse}>Pulse</button>
```

## Animating a single ref'd element

You can also animate a specific element ref without selectors:

```jsx
const boxRef = useRef(null);

useEffect(() => {
  const animation = animate(boxRef.current, { x: 200, duration: 500 });
  return () => animation.cancel();
}, []);
```

## Rules

- Create animations inside `useEffect` (or an event handler), never during
  render.
- Wrap them in `createScope({ root })` with `root` = a `useRef`; this scopes
  selectors and makes teardown one call.
- **Always** `return () => scope.current.revert()` from the effect. This makes
  the component safe under React StrictMode's double-invoke and prevents leaks.
- Use named scope methods (`self.add('name', fn)` then `scope.methods.name()`) to
  drive animations from event handlers.
- Next.js / SSR: animation code only runs in `useEffect` (client), so it is
  SSR-safe by construction. Mark interactive components `"use client"`.

<!-- source: src/scope/scope.js (root accepts ReactRef.current; .add()/.revert()/.methods), dev branch, animejs 4.2.2 -->

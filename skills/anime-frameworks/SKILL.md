---
name: anime-frameworks
description: >
  anime.js v4 in Vue, Svelte, and Angular. Use when animating inside components
  of these frameworks: create animations on mount, scope them with createScope({
  root }) bound to a template ref (Vue ref / Svelte element binding / Angular
  ElementRef), and revert on destroy. Scope's root natively understands an
  Angular ref (reads nativeElement) and any element/selector, so teardown is a
  single scope.revert() call. Triggers: vue, vue animation, nuxt, onMounted,
  onUnmounted, template ref, svelte, svelte animation, onMount, onDestroy,
  angular, angular animation, ElementRef, ngOnInit, ngOnDestroy, ViewChild,
  createScope, scope, revert, framework animation.
license: MIT
---

# anime.js v4: Vue / Svelte / Angular

The pattern is identical across frameworks: build animations on mount inside a
`createScope({ root })` bound to the component's root element, and call
`scope.revert()` on destroy.

## Vue (`<script setup>`)

```vue
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { animate, createScope, stagger } from 'animejs';

const root = ref(null);
let scope;

onMounted(() => {
  scope = createScope({ root }).add(() => {
    animate('.card', {
      y: [40, 0],
      opacity: [0, 1],
      delay: stagger(80),
      ease: 'out(3)',
    });
  });
});

onUnmounted(() => scope.revert());
</script>

<template>
  <section ref="root">
    <article class="card">A</article>
    <article class="card">B</article>
  </section>
</template>
```

## Svelte

```svelte
<script>
  import { onMount, onDestroy } from 'svelte';
  import { animate, createScope, stagger } from 'animejs';

  let root;
  let scope;

  onMount(() => {
    scope = createScope({ root }).add(() => {
      animate('.card', { y: [40, 0], opacity: [0, 1], delay: stagger(80) });
    });
  });

  onDestroy(() => scope?.revert());
</script>

<section bind:this={root}>
  <article class="card">A</article>
  <article class="card">B</article>
</section>
```

## Angular

`createScope({ root })` accepts an Angular ref directly (it reads
`root.nativeElement`).

```ts
import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { animate, createScope, stagger } from 'animejs';

@Component({
  selector: 'app-cards',
  template: `
    <section #root>
      <article class="card">A</article>
      <article class="card">B</article>
    </section>
  `,
})
export class CardsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('root') root!: ElementRef;
  private scope: any;

  ngAfterViewInit() {
    this.scope = createScope({ root: this.root }).add(() => {
      animate('.card', { y: [40, 0], opacity: [0, 1], delay: stagger(80) });
    });
  }

  ngOnDestroy() {
    this.scope.revert();
  }
}
```

## Rules

- Build animations in the **mount** lifecycle (Vue `onMounted`, Svelte
  `onMount`, Angular `ngAfterViewInit`), never during setup/render.
- Bind `root` to the component's container ref so scoped selectors resolve inside
  it; `createScope` understands Vue refs, Svelte element bindings, and Angular
  `ElementRef`.
- **Always** `scope.revert()` on destroy (`onUnmounted` / `onDestroy` /
  `ngOnDestroy`).
- Same animate/timeline/stagger API as vanilla. See `anime-core`,
  `anime-timeline`, `anime-utils-easings`.

<!-- source: src/scope/scope.js (root accepts AngularRef.nativeElement and selectors; .add()/.revert()), dev branch, animejs 4.2.2 -->

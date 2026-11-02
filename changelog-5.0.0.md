# Changelog 5.0.0

## Breaking Changes

- **Completion promises**
  - `.then()` now resolves with the callback result, so `await animation.then(() => 42)` returns `42` instead of `undefined`
  - Promises and animations returned from `.then()` callbacks are now awaited. This now waits for both animations instead of only the intro:
    ```js
    await intro.then(() => outro.play());
    ```
  - Errors thrown by `.then()` callbacks or promises they return now reject the completion promise. In 4.5 this promise never settled:
    ```js
    await animation.then(() => { throw new Error('boom') });
    // 4.5: never resolves or rejects
    // 5.0: rejects with the error
    ```
  - `.then()` without a callback now resolves to the original instance instead of `undefined`, like `await animation`
- **Timeline**
  - `timeline.labels` no longer inherits from `Object`: check a label with `'intro' in timeline.labels` instead of `timeline.labels.hasOwnProperty('intro')`
  - A child with a `from` value now shows that value as soon as it is added, when no earlier child animates the same property. In 4.x, the element kept its current value until the timeline reached the child, then jumped to the `from` value unless the timeline called `.init()`:
    ```js
    // el is visible, with an opacity of 1
    const tl = createTimeline({ autoplay: false })
      .add(title, { y: [20, 0], duration: 500 })
      .add(el, { opacity: [0, 1], duration: 300 }, 500);
    // 4.5: el.style.opacity is 1 until 500 ms, then 0
    // 5.0: el.style.opacity is 0 from the .add() call
    ```
  - `.init()` at the end of a timeline is no longer needed to show the `from` values of its children. The targets have these values after the last `.add()`:
    ```js
    const tl = createTimeline({ autoplay: false })
      .add(a, { opacity: [0, 1], duration: 300 }, 500)
      .add(b, { y: [50, 0], duration: 300 }, 800);
    // 4.5: a.opacity is 1 and b.y is unchanged, until tl.init() is called
    // 5.0: a.opacity is 0 and b.y is 50, with or without tl.init()
    ```
- **Transforms**
  - When one animation sets both `transform` and individual transform properties like `x` or `rotate` on an element, the individual properties now always win, whatever their order:
    ```js
    animate(el, { x: 100, transform: 'rotate(45deg)' });
    // 4.5: rotate(45deg)
    // 5.0: translateX(100px)
    ```
  - An element's `transform` is now written after its other animated styles in each frame. The result on screen is the same, but the order of declarations in its `style` attribute and of `MutationObserver` records changes:
    ```js
    animate(el, { x: 100, opacity: .5 });
    // 4.5, at half time: style="transform: translateX(50px); opacity: 0.75;"
    // 5.0, at half time: style="opacity: 0.75; transform: translateX(50px);"
    ```
- **Composition**
  - A new animation now replaces the animations of the same property that are scheduled to start after it, instead of letting them take over when they start:
    ```js
    animate(el, { x: 200, delay: 200 });
    animate(el, { x: 300 });
    // 4.5: ends at 200
    // 5.0: ends at 300
    ```
  - `.restart()`, `.play()` and `.seek()` on an animation that another animation replaced now give its properties back to it, and cancel the other animation if it has no property left. In 4.5 the animation created last kept the property, so two animations that are kept and restarted in turn did not work:
    ```js
    const enter = animate(el, { scale: 1.5, duration: 300, autoplay: false });
    const leave = animate(el, { scale: 1, duration: 300, autoplay: false });
    enter.restart();
    // 4.5: scale stays at 1, and leave keeps the property
    // 5.0: scale animates to 1.5, and leave is cancelled without running onComplete
    ```
  - An animation that lost a property to a newer animation no longer writes that property when it is sought to a time before the newer animation was created:
    ```js
    const a = animate(el, { x: 100, y: 100, duration: 1000 });
    // 400 ms later
    const b = animate(el, { x: 300, duration: 2000 });
    a.seek(100);
    // 4.5: x is 10, the value of a, and y is 10
    // 5.0: x keeps the value of b, and y is 10
    ```
- **Color**
  - `utils.get()` now returns a color in the `rgba()` form that `animate()` writes, whatever form the browser computes it in. `utils.get(el, 'color')` on an element styled `color: oklch(70% 0.2 30)` returns `rgba(255,97,77,1)` instead of `oklch(0.7 0.2 30)`, and on an inline `#ff0000` returns `rgba(255,0,0,1)` instead of `#ff0000`
 as colors in sRGB and written as `rgba()`. 4.5 did not support them, but animated the numbers inside the string when both values used the same format, which kept colors outside sRGB, like `color(display-p3 0 1 0)`, that 5.0 now clips
  - Use `waapi.animate()` to keep colors outside sRGB or to animate color syntaxes that `animate()` does not support, like named colors: the browser interpolates them natively
- **Easing**
  - A custom `ease` function now runs once per frame for all properties and targets of an animation that share the same ease, delay, and duration, instead of once per property and target, so an ease that uses random numbers or counts its calls gives them all the same result
- **Utilities**
  - `utils.forEachChildren()`, `utils.addChild()`, and `utils.removeChild()` no longer accept custom link property names, and always use `_prev` and `_next`. `utils.addChild(list, item, null, '_before', '_after')` now links `item` through `item._prev` and `item._next`
- **Three.js adapter**
  - A scale or opacity above `0` now shows only a mesh that a scale or opacity of `0` hid. In 4.5 every write set `visible`, so it also showed a mesh hidden with `mesh.visible = false` or a `visible: false` tween:
    ```js
    mesh.visible = false;
    animate(mesh, { scale: [1, 2] });
    // 4.5: mesh.visible is true from the first frame
    // 5.0: mesh.visible stays false
    ```
  - `utils.get(mesh, 'visible')` now returns `true` for a mesh that only a scale or opacity of `0` hides, like `true` instead of `false` after `utils.set(mesh, { scale: 0 })`
- **TypeScript**
  - The `RandomNumberGenerator` type is removed, so `import type { RandomNumberGenerator } from 'animejs'` no longer compiles: use `ReturnType<typeof utils.createSeededRandom>`

## New Features

- **Muting animations and properties**
  - New `muted` parameter for instances created with `animate()`, `createTimeline()`, and `createTimer()` to disable value updates, callbacks, and completion promises while keeping their timing. Individual animation properties can also be muted. Set `muted` at creation; recreate the instance to change it. Layout animations do not support muting.
  - `muted` is reserved as a parameter name, so a target property named `muted` can no longer be animated or set with `animate()`, `utils.set()`, or `createAnimatable()`
- **Soft revert**
  - New `.revert(false)` option for timers, animations, and timelines to cancel without seeking back to the start. Animations and timelines still restore their targets' original values.
    Use it when recreating an animation with new settings to skip applying its starting values and running its modifiers before restoring the originals.
- **Timeline**
  - New `.call({ id, callback, muted }, position)` and `.sync({ id, target, muted }, position)` forms to name callbacks and synced animations in the editor or disable them with `muted`
  - New array support in `.sync()` to schedule several animations, e.g. `timeline.sync([intro, outro], stagger(200))`
  - Synced animations inherit `defaults.muted`; `muted: false` overrides the default unless the timeline itself is muted
- **Random**
  - New options object for `utils.random()`, e.g. `utils.random({ min: 0, max: 100, decimals: 2 })`
  - New `seed` option to repeat a random sequence and `perTarget` option to draw a fresh value for each animated target
  - Generators from `utils.createSeededRandom()` now accept an options object, e.g. `utils.createSeededRandom(42)({ min: 10, max: 20 })`
  - New optional second argument in `utils.randomPick()` for repeatable selections, e.g. `utils.randomPick(['red', 'blue'], utils.createSeededRandom(42))`
- **Spring**
  - New `stretch()` method to make a spring settle in a given time while keeping its bounce and curve shape, e.g. `spring({ bounce: .5 }).stretch(1000)`
  - New `minSettlingDuration` getter to check the duration limit; `stretch()` leaves the spring unchanged at or below it
- **Color**
  - New support for animating `oklab()`, `oklch()`, and `color()` values in the `srgb`, `srgb-linear`, and `display-p3` spaces, including mixed formats, converted to sRGB:
    `animate('.box', { color: ['oklch(70% 0.2 30)', 'color(display-p3 0 0.8 1)'] })`
  - New `utils.parseColor()` to convert hex, `rgb()`, `hsl()`, `oklab()`, `oklch()`, and `color()` strings to `[r, g, b, a]`, e.g. `utils.parseColor('#ff0000')` returns `[255, 0, 0, 1]`
- **Version**
  - New `version` export, the package version, e.g. `import { version } from 'animejs'`
- **Editor**
  - New visual editor to edit animations and timelines, including easing, stagger, random values, and layout animations
  - The editor is the `@animatorkit/editor` package, `npx @animatorkit/editor` sets it up in a project

## Bug Fixes and improvements

- **Performance**
  - Measured against 4.5.0 in Chrome, in 6 pairs of fresh browser processes: 2× means anime.js does the same work in half the time. Playback is the time to render a frame or seek, setup the time to create animations
  - The largest setup gains are for one animation on many targets with a stagger, and for staggered keyframes
  - The frame rate gain depends on how much of each frame anime.js uses, the rest being your own code and the browser's rendering
  - CSS transforms: 1.25 to 1.5× faster playback, 1.85× with keyframes and 2.2× with staggered keyframes, and up to 5.8× faster setup for one staggered animation on 1,000 elements
  - CSS properties, CSS variables, and SVG attributes: 1.05 to 1.15× faster playback, and 1.3 to 1.5× with staggered keyframes. Colors play back at the same speed as in 4.5, except 1.4× faster with staggered keyframes
  - JavaScript objects: 1.1 to 1.3× faster playback, 1.5× with keyframes and 1.8× with staggered keyframes, and up to 2.85× faster setup for one staggered animation on 10,000 objects
  - Three.js `Object3D`: 1.1 to 1.3× faster playback, 1.3× with keyframes and 1.65× with staggered keyframes, and up to 3.9× faster setup for one staggered animation on 10,000 objects
  - Three.js `InstancedMesh`: 2.8 to 3.2× faster playback with a stagger, 1.9 to 2.85× with one animation per instance, 2.3× with keyframes, and 1.1 to 3.6× faster setup, with less memory per instance
  - Staggered keyframe animations: 3.3 to 5.2× faster setup on every target type
  - Long keyframe lists: 36× faster setup, like 0.5 ms instead of 19 ms for 500 keyframes
  - Timelines: 3.8× faster playback with many overlapping steps, 3.0× with nested timelines, 1.5× with steps chained on the same targets or scroll-driven scrubbing, and 2.2 to 48× faster setup, like 1 ms instead of 51 ms to add 1,000 children
  - Animations that replace running ones: 1.6× faster playback and 17 to 30× faster setup, like 0.5 ms instead of 16 ms to replace 1,500 running values
  - Animations with `composition: 'none'`: 1.3× faster playback and 1.1× faster setup
  - Blended animations: 1.2× faster playback and 1.4× faster setup, with less temporary memory
  - Values with several numbers, like SVG points or 3D vectors: 1.2× faster playback and setup, and 3.9× faster playback through adapters
  - `timeline.remove()`: 4.4× faster
- **Animation**
  - Fix a looping animation with a `delay` keeping its final value after a seek backward from its end, like `100` instead of `95` after `.seek(200).seek(195)` with `duration: 100`, `delay: 20` and `loop: 1`
  - Fix a `reversed` animation keeping a later value after a seek back into its `delay`, like `90` instead of `100` after `.seek(10).seek(-10)` with `x: 100` and `delay: 100`
  - Fix a function value that creates another animation changing the duration or the keyframes of its own animation, like `x: () => { animate(other, { y: { to: 100, duration: 10 } }); return 200 }` with `duration: 100` giving a duration of `10`
  - Fix a function value, getter or numeric conversion that creates another animation changing the start, end or original values of its own animation, like `x: [10, () => { animate(other, { y: [300, 400] }); return 110 }]` starting from `300` instead of `10`
  - Fix `.refresh()` keeping the old value of a function value that creates another animation, like `100` instead of `200` after the function result changes to `200`
  - Fix `.refresh()` throwing an error when a function value returns an options object or a from-to array, like `x: () => ({ to: 100, duration: 100 })` or `x: () => [0, 100]`
  - Fix `.revert()` removing original inline styles after keyframe animations, like an element with `style="opacity: 0.5"` left with no inline style after `animate(el, { opacity: [{ to: 0 }, { to: 1 }] }).revert()`
  - Fix `.revert()` failing to restore original values of `0`, `null`, `undefined`, or an empty string, like `{ x: null }` reverted to `0` instead of `null`, or an inline `width: 0px` removed after a keyframes animation
  - Fix an empty keyframe array on a transform property, like `y: []`, stopping the other transform properties of the same animation
  - Fix a property with three or more keyframes keeping a later keyframe value instead of returning to its first value when a looping timeline restarts or a short backward seek passes its start
  - Fix a property with `duration: 0` and a delay ending slightly off its final value, like `7.9e-9` instead of `0`, which a boolean property such as a Three.js `visible` read as `true`
  - Fix `playbackEase` showing a value from the middle of an animation during its delay, like `100` instead of `0` with `playbackEase: 'inOutSine'`
  - Fix `.stretch()` on a looping animation leaving its value in the middle when the next seek goes past the new duration, like `65.7` instead of `100` after `.seek(657).stretch(100).seek(1000)`
  - Fix `onComplete` running again when a seek stays past the end of an animation, like two calls after `.seek(200).seek(300)` with `duration: 100`
  - Fix a function value reading the color of the previous keyframe without its `modifier`, like `rgba(100,150,200,1)` instead of `rgba(50,75,100,0.5)` with `modifier: v => v / 2`
- **Timer**
  - Fix `deltaTime` reporting a huge negative value on the first frames of a timer, like `-1792765068160` instead of `16`
- **Timeline**
  - Fix `.call(null)` and other non-function values adding a step that throws an error when the timeline reaches it, like `createTimeline().call(null, 5)` throwing `callback is not a function` on a seek past `5`
  - Fix `.stretch()` on a child not updating the duration of its timeline, so the next `.add()` used the old end: after a child of `100` stretches to `200`, `timeline.duration` is now `200` instead of `100`
  - Faster construction when adding many timeline children
  - Less work when removing targets from timelines
  - Fix a looping timeline not running `onUpdate` on a seek backward from its end, like `.seek(200).seek(195)` with one child of `duration: 100` and `loop: 1`
  - Fix a seek backward leaving a property on the value of a later child when an earlier child with `loop` and `alternate` owns it again, like `300` instead of `0`
  - Fix a seek backward before the start of a delayed child with a `from` value showing that `from` value when the child replaced another delayed child, like `400` instead of the `100` of the earlier child
  - Fix a seek backward in small steps leaving the `from` value of a later child on a property before that child starts, like `50` instead of the `100` of the earlier child
  - Fix a seek back before a child with a `from` value keeping its value and not running `onRender` on the earlier child that shows again, like `300` instead of `100`
  - Fix a seek that jumps over a child running its `onRender` when a later child writes the same property, like `onRender` on both children instead of the later one only
  - Fix keyframes with `composition: 'none'` in a looping timeline showing the wrong keyframe after a seek, like `0` instead of `300` on a seek to the end
  - Fix a `reversed` timeline not showing the value of an earlier child between two children of the same property, like `0` instead of `100` on the first seek
  - Fix a child with a `playbackRate` writing a property after a later child with a `from` value took it, like `13.33` instead of `200` at the position of the later child
  - Fix a child with a negative `delay` at the start of a timeline never running `onBegin`
  - Fix a child with `duration: 0` in a timeline that has a `delay` running `onComplete` without `onBegin`
- **Promises**
  - Fix only the last `.then()` callback running when several are registered on the same instance, like `animation.then(first); animation.then(second)` running only `second`
- **WAAPI**
  - Fix completion callbacks running and promises resolving after `.seek(time, true)`, including during reverse playback, like `onComplete` running after `waapi.animate(el, { opacity: 0, duration: 100 }).seek(100, true)`
  - Fix animations completing or being removed after seeking backward from the end, like `animation.complete()` followed by `animation.seek(100)` running `onComplete` and removing the animation from the element
  - Fix animations reversed with `.reverse()` reporting their duration as `currentTime` after completion instead of `0`
- **Composition**
  - Fix blended transforms no longer updating after one of the blended animations is cancelled or completes, like `x` staying still after `animate(el, { x: 100, rotate: 90, composition: 'blend' })` ends while `animate(el, { x: 50, composition: 'blend' })` still plays
  - Fix cancelled animations using `composition: 'blend'` affecting later animations of the same property, like a new `animate(el, { x: 300 })` no longer replacing an earlier `animate(el, { x: 100 })` after a blend animation of `x` is cancelled
  - Fix `.cancel()` on an animation that a newer one already replaced breaking later animations of the same property, like a third animation of `x` no longer replacing the second after `first.cancel()`
  - Fix `.stretch()` moving an animation in time, so a new animation of the same property took its start value and unit from the wrong earlier animation, like `150vh` instead of `150em`
- **Targets**
  - Fix the other transforms of an element no longer updating after `utils.remove()` removes one of its transform properties from an animation with several targets, like `x` staying at `0` on the first element after `utils.remove(firstElement, animation, 'y')`
- **Three.js adapter**
  - Fix target detection and `getInstances()` when an application loads multiple copies of Three.js, like `utils.set(object3D, { z: 2 })` throwing an error for an object created by the other copy
  - Fix errors on every render after deleting an animated `BatchedMesh` instance and calling `getInstances()` again, like `Invalid instanceId 1` after `mesh.deleteInstance(1)` while its animation still plays
  - Fix a `visible: false` tween undone by a scale or opacity animation of the same mesh, like a mesh hidden at 50 ms shown again at 70 ms by `scale: [1, 2]` over 100 ms, or shown on the last frame of a looping timeline paused at its end
- **Spring**
  - Fix `spring()` parameters above 10,000, like `duration: 20000`, being silently capped
- **Stagger**
  - Fix descending `stagger()` ranges used as timeline positions starting before the timeline's end, like `stagger([200, 0])` on three targets at the end of a timeline of `1000` giving positions `1000`, `900`, `800` instead of `1200`, `1100`, `1000`
- **Color**
  - Fix gray `hsl()` colors animating to black, like `animate(target, { color: 'hsl(0, 0%, 50%)' })` ending on `rgba(1,1,1,1)` instead of `rgba(128,128,128,1)`
  - Fix `rgb()` and `hsl()` values written with spaces, a slash alpha, or percentages throwing an error, like `animate(target, { color: 'rgb(255 0 0 / 50%)' })` now ending on `rgba(255,0,0,0.5)`
  - Fix colors fading to transparent when animating from or to a number, like `color: ['#FF0000', 0]` giving `rgba(180,0,0,0.5)` instead of `rgba(180,0,0,1)` at half time
- **Scroll**
  - Clearer enter and leave markers for `onScroll({ debug: true })`, with less flicker when refreshing the overlay
  - Fix `onScroll({ sync: 0.5 })` smoothing speed depending on the frame rate, like twice as fast on a 120 Hz screen and slower when frames drop, it now takes the same time at any frame rate
- **Scope**
  - Fix an error thrown in a scope callback leaving the scope active, so later animations took its `defaults` and `scope.revert()` cancelled them, like an `animate()` call made after a failing `scope.add()`
- **TypeScript**
  - More accurate callback and `.then()` types, including async results and animation subclasses
  - Fix `utils.randomPick()` result types so arrays return their element type, like `utils.randomPick([1, 2, 3])` typed as `number` instead of `string | number`

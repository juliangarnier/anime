---
name: anime-engine
description: >
  anime.js v4 engine, the global clock and main loop that drives every animation.
  Use when you need to set global defaults for all animations (engine.defaults),
  switch the time unit between milliseconds and seconds (engine.timeUnit), change
  global speed or frame rate (engine.speed, engine.fps), control how the document
  hidden state pauses animations (engine.pauseOnDocumentHidden), or drive the loop
  yourself (engine.useDefaultMainLoop = false; engine.update()). Triggers: engine,
  global defaults, engine.defaults, timeUnit, seconds vs milliseconds, engine.speed,
  global speed, slow motion, engine.fps, frame rate, pauseOnDocumentHidden,
  useDefaultMainLoop, manual tick, engine.update, engine.pause, engine.resume,
  precision.
license: MIT
---

# anime.js v4: Engine

`engine` is the global clock that runs every animation. Import it to set global
defaults and control timing for the whole app.

```js
import { engine } from 'animejs';
// Subpath: import { engine } from 'animejs/engine';
```

## Global defaults

Set defaults applied to every animation unless overridden.

```js
import { engine } from 'animejs';

engine.defaults.ease = 'out(2)';
engine.defaults.duration = 800;
```

## Time unit: ms or seconds

```js
engine.timeUnit = 'ms';   // default; durations/delays in milliseconds
engine.timeUnit = 's';    // switch the whole app to seconds
```

## Global speed and frame rate

```js
engine.speed = 0.5;   // half speed (slow motion) for all animations
engine.speed = 2;     // double speed
engine.fps = 30;      // cap the global frame rate
```

## Pause when the tab is hidden

```js
engine.pauseOnDocumentHidden = true;   // default: pause animations when the tab is hidden
engine.pauseOnDocumentHidden = false;  // keep running in the background
```

## Drive the loop yourself

By default anime runs its own requestAnimationFrame loop. Turn it off to tick the
engine from your own loop (for example a game loop or a canvas renderer).

```js
import { engine } from 'animejs';

engine.useDefaultMainLoop = false;

function myLoop() {
  engine.update();        // advance all animations one tick
  requestAnimationFrame(myLoop);
}
myLoop();
```

## Pause and resume everything

```js
engine.pause();    // pause every animation
engine.resume();   // resume
```

## Rules

- `engine.defaults` sets app-wide defaults; per-animation params still override it.
- `engine.timeUnit` changes the unit for the whole app, so set it once at startup.
- Use `engine.speed` for global slow motion or fast forward, not per animation.
- For a custom render loop, set `engine.useDefaultMainLoop = false` and call
  `engine.update()` yourself. This replaces the v3 `animation.tick()`.

<!-- source: src/engine/engine.js (timeUnit, speed, fps, precision, defaults, useDefaultMainLoop, pauseOnDocumentHidden, update/pause/resume); engine.timeUnit used in examples/draggable-playground (dev branch, animejs 4.2.2) -->

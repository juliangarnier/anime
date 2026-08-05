# Changelog 5.0.0

## New Features

- **Random**
  - `utils.random()` now accepts a params object, `random({ min, max, decimals, seed, perTarget })`, alongside the positional `random(min, max, decimals)` form
  - New `perTarget` option returns a generator that draws a fresh value for each animated target instead of one value shared across targets
  - New `seed` option makes a `random({})` reproducible, any number seeds a deterministic sequence while `false` or omitting it stays unseeded
  - `utils.createSeededRandom()` now shares the `random()` API, its generator accepts a params object and `perTarget`, and its `min`, `max` and `decimals` can still be overridden per call
  - `utils.randomPick()` now takes an optional random number generator as its second argument, matching `utils.shuffle()`, so picks can be seeded
- **Timeline**
  - `.sync()` now accepts an array of timers, animations or WAAPI animations, with an optional `stagger()` or function based position resolved per synced child
- **Spring**
  - New `stretch()` method on `spring()` to retune a spring to settle at a given duration while keeping its bounce and curve shape
  - New `minSettlingDuration` getter on `spring()` returning the shortest settling duration `stretch()` can reach, so a caller can clamp a stretch target to a reachable value instead of guessing the rest threshold

## Bug Fixes and improvements

- **Render**
  - Faster rendering of animations where multiple properties share the same ease and timing
- **Three.js adapter**
  - Much faster `InstancedMesh` and `BatchedMesh` instance animations, with lower memory use per instance
- **Targets**
  - Faster target parsing and `utils.remove()` on large target lists

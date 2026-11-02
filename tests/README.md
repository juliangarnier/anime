# Terminal tests

Engine coverage has two parts: the browser suite checks real frame scheduling, external
updates, and pause/resume; `tests/node/engine-scheduler.test.mjs` supplies exact clock times to check
intermediate values, completion counts, and delayed frames. Both use Anime's real engine
and renderer. The full runner tests the controlled clock against source and built modules.

`tests/node/pipeline.test.mjs` checks constructor, composition, and rendering together,
including replacement handoffs, blend accumulation, adapter values, and engine offsets.
Feature behavior belongs in the corresponding browser suite under `tests/suites`, including
regression checks added during refactors. These suites use real DOM elements where needed.

`tests/node/contracts.test.mjs` holds the behavior contracts of composition, timelines, seeking,
and stretching that a refactor must keep. A contract marked `{ todo: '<area>' }` states a required
behavior that the source does not meet yet: it is reported and does not fail the run. The change that
makes it pass removes the `todo` option. `npm run test:pipeline` runs it with the pipeline and
scheduler tests.

Use Node.js 22.12 or newer, install the project dependencies with `npm ci`, and install Chrome. Set `CHROME_BIN=/path/to/chrome` to use a different Chrome or Chromium executable. A published version is installed once by npm into `tests/results/baseline-<version>` on first use, so later runs need no network and nothing is added to `package.json`.

## Full suite

```sh
npm test
```

`npm run test:all` does the same thing. The command builds fresh modules, bundles, and declarations, then runs source types, test/playground types, example types, benchmark-tool tests, pipeline and scheduling against source and built modules, consumer types with and without strict mode, Node/V8 tests, all browser tests, and the performance comparison against Anime.js 4.5.0.

Checks run in sequence so they do not compete with the benchmark for CPU time. A failed check does not hide later results. The summary and exit code report all failures. If the build or declaration generation fails, checks that need those files are blocked; stale build output is not tested.

V8 optimization status depends on the Node version. The legacy Node suite leaves its render optimization probe skipped; browser comparisons measure rendering performance. The full runner reports any build, type, or behavior failure instead of treating it as a performance result.

The v5 behavior and type suites run against this checkout. **Every benchmark runs against both selected versions and checks their output.** The v5-specific tests are not used as a v4.5 contract: for example, v5 deliberately changes completion promise results.

## Performance comparison

Both runners compare the published `4.5.0` modules with `./dist/modules` by default.
Build local changes before running the comparison; the benchmark does not rebuild them.
Use `--candidate ./src` to compare unbuilt source explicitly.

```sh
npx rollup -c
npm run test:perf:quick
npm run test:perf
npm run test:perf -- --baseline 4.5.0 --candidate ./dist/modules
npm run test:perf -- --baseline /path/to/previous/src --candidate ./src
npm run test:perf -- --baseline 4.5.0 --candidate 4.5.0
npm run test:perf -- --cases features
npm run test:perf -- --cases matrix
npm run test:perf -- --cases matrix-js-objects --update-runs 5
npm run test:perf -- --cases matrix-css-transforms --setup-runs 20
npm run test:perf -- --cases timeline --setup-runs 20 --fixed-setup-runs
npm run test:perf -- --cases js-objects/100/keyframes,js-objects/100/stagger-keyframes
```

`npm run test:perf:quick` runs four common cases: one staggered animation over 1,000 CSS transform or CSS property targets, or over 10,000 JavaScript objects or Three.js Object3D targets. It uses the normal warmups, samples, repeated updates, version comparison, value checks, and report. Pass other benchmark options after `--`, for example `npm run test:perf:quick -- --baseline ./dist/modules --samples 12`.

For a first answer in about 100 seconds, screen the update rows in Node:

```sh
npm run test:perf:node -- /path/to/previous/src ./src
npm run test:perf:node -- ./tests/results/baseline-4.5.0/node_modules/animejs/dist/modules ./src 8 blend,replace
```

It runs the 16 cases that need no DOM, each version in a fresh process per round with the order alternated, and prints the median of the per round ratios with their range. On identical code the update rows stayed within about 2 percent over 6 rounds; setup rows spread up to 30 percent, so judge setup in the browser. Node runs early JIT tiers and has no DOM, so a row it flags still needs the browser runners, and a CSS or SVG change needs them from the start.

For a performance claim about a focused case, use the precise runner:

```sh
npm run test:perf:precise -- --cases replace
npm run test:perf:precise -- --cases three-object3d/10000/stagger --browser-runs 6
```

It uses six fresh pairs of Chrome processes by default, each with the normal 8 samples and 3 update passes, and reverses the version roles on alternate runs. Run to run spread is as large as the spread inside one run, so more pairs with fewer samples each give narrower ranges: on identical code, six pairs of 8 samples measured ranges 35 percent narrower than four pairs of 12 samples and 5 passes, in 22 percent less time. Within each pair, both versions run in both processes and both orders. The final 95% range is calculated from the independent browser-pair averages, so one unusual V8 optimization result cannot look like many independent confirmations. Measurements run sequentially, not concurrently. This command is intentionally slower and is best used for selected cases, not the complete 94-case suite.

Both version options accept an exact npm version, installed on first use, or a local directory containing `index.js`. Each version needs one consistent module graph for its engine, composition code, and adapters; the two versions never share a JavaScript runtime or Three.js module instance. A missing module or unsupported API is an error, not a skipped benchmark.

The existing benchmark script now uses named options instead of positional paths. Use `--help` for all options. The older Node-only `benchmark-pipeline.mjs` remains a separate diagnostic with style stubs; it is not the DOM performance test.

The default run includes all 94 cases: 80 matrix cases over eight target kinds, and 14 feature cases. Use `--cases quick` for the four common cases, or `--cases matrix` or `--cases features` for one part. Every case eases with `out(2)` and checks its values against that curve, so the ease call is part of every row.

### Matrix

Each target kind animates three properties:

| Kind | Targets and properties |
| --- | --- |
| `css-transforms` | Attached DOM elements: x, y, rotateZ |
| `css-properties` | Attached DOM elements: left, top, opacity |
| `colors` | Attached DOM elements: background, text, and border colors |
| `css-variables` | Attached DOM elements: three custom properties with units |
| `svg-attributes` | SVG circles: cx, cy, r |
| `js-objects` | Plain objects: x, y, z |
| `three-object3d` | Real Three.js Object3D targets: position x/y and rotation, through each version's adapter |
| `three-instances` | Instances of one `InstancedMesh`: position x/y and rotation, through `getInstances()`, with the matrix flush after every seek |

Each kind runs ten cases, named like `js-objects/100/keyframes`. Large is 1,000 targets for DOM kinds and 10,000 for the others.

| Variant | Targets | Shape and values |
| --- | --- | --- |
| `stagger` | 10, 100, large | One animation over all targets with `delay: stagger()`, so the starts spread over one second and each target has its own timing, as in most real pages. Three properties with to values |
| `three-props` | 10, 100, large | One animation per target, three properties with to values |
| `one-prop` | 100 | One animation per target, the first property only; the other two must stay unchanged |
| `from-to` | 100 | One animation per target, three `[from, to]` pairs with a non-zero start value |
| `keyframes` | 100 | One animation per target, three properties with four to keyframes each, chained from the current value: 12 tweens per animation. Some segments move backward, and the ease alternates between linear and `out(2)` so every tween pays its own ease call |
| `stagger-keyframes` | 100 | The `stagger` shape with the `keyframes` values. Keyframe siblings and a timing per target turn off both render shortcuts, the simple tween walk and the shared progress, so this case measures the general render path |

`stagger` and `three-props` show how the cost grows with the count in both shapes. The value forms run once, at 100 targets, next to the `three-props` case of the same count. Setup times all the `animate()` calls; one update step seeks every animation. Targets and the shared parameter object are prepared outside setup timing; setup creates the animation instances.

Use `--cases matrix` for all 80 cases, or `matrix-` and a kind, such as `matrix-colors`, for the ten cases of one kind.

### Features

| Case | Work |
| --- | --- |
| `keyframes-500` | Setup of one animation with the `keyframes` parameter: 500 duration keyframes with repeated property names, which shows how setup grows with the list length |
| `keyframes-playback-500` | The same 500-keyframe animation with measured seeks and intermediate value checks |
| `remove` | Setup of 1,000 timeline children; removal of x from 200 targets |
| `none` | 500 objects with three properties and `composition: 'none'`, which skips the composition lookups |
| `replace` | 500 objects with three properties replacing a running animation, so setup pays the sibling lookups and the first update the overrides |
| `replace-partial` | Replace 499 of 500 targets and update both animations, checking the untouched target too |
| `replace-sparse` | Replace one of 500 targets and update both animations, checking the 499 untouched targets too |
| `timeline` | Setup and seeking of 1,000 overlapping timeline children |
| `timeline-sequence` | Ten 100 ms steps appended on the same 500 objects: every step chains from the one before it, so setup pays the sibling composition and playback the hand-offs between steps |
| `timeline-scrub` | Fifty 20 ms steps appended on the same 100 objects, seeked forward, back, and forward to the middle in every pass, as a timeline driven by scrolling is |
| `timeline-nested` | The `timeline` case split into ten child timelines joined with `sync()`: it renders the same values, so the difference from `timeline` is the cost of nesting |
| `adapter`, `complex` | 1,000 numeric-adapter vectors or string vectors |
| `blend` | Two blended animations on 1,000 targets, on a number and a string vector, including the final blended writes |

The optional `timeline-loop` case uses the 1,000-child timeline through five alternating iterations.
It is selected explicitly with `--cases timeline-loop` and uses the same paired runner, warmup and
value checks. Expected values come from the authored iteration length and direction, independently
of the animation's internal clocks. The tooling suite verifies that disabling alternate playback
fails those checks. This case measures loop transitions as well as ordinary updates.

An animation of 1,000 targets or more defaults to `composition: 'none'` in both versions, so the cases that measure composition use 500 targets or fewer. Until 2026-09-29 the `replace` case used 1,000 and 5,000 targets and measured composition none, and its value checks passed either way, because both modes start from the running animation's current value. The matrix rows at 1,000 and 10,000 targets use that default too, as real code with that many targets does.

Three.js is pinned to the installed project version for both sides. The Three.js cases measure adapter writes and, for instances, the matrix flush that runs before each render, not WebGL drawing.

Every update pass covers the full duration in equal steps. Checks cover every target at segment boundaries, inside each segment, at the start and end, and during backward seeks.

Set `CHROME_FLAGS` to pass Chrome arguments to both processes, separated by `|`, for example `CHROME_FLAGS='--js-flags=--max-semi-space-size=1'` to pin V8's nursery when a long update row must be checked against garbage collector sizing effects.

### What the numbers mean

- Each sample runs on its own pair of pages, one for each version, in the two Chrome processes. The pages stay open for the whole run and load a fresh document for each case. Every four samples cover both process slots and both version orders equally. Each run uses 8 samples, so 16 sample pages. `--samples` must be a multiple of four. There is no early stopping.
- Measurements are sequential. On 2026-09-29, measuring both pages of a pair at the same time was 35 percent faster, but shared memory and caches made the 10,000 Object3D update 13 percent slower on 4.5.0 and 18 percent slower on the current version, which moved the comparison by about 5 points. For the same reason, do not run two benchmarks at the same time: two identical-code runs started together flagged 17 rows beyond their range.
- Each page uses the same random seed and a fixed engine clock. Library import starts at the same epoch, then the clock advances by 1,000 ms before construction. Animation offsets and Three.js UUIDs do not depend on how long imports or prior samples took. Timing still uses the real `performance.now()` clock.
- All pages warm at the same time with the same count of constructions, 8 by default, so V8 settles equally on every page. A separate page that takes no samples then times one construction and one short pass alone, and those costs size the case. When a sample page calibrated, its extra construction made the other version's setup measure 1.6 percent slower on identical code. The sizes are: a setup sample averages enough constructions for about 150 ms, at most 8, on fresh targets. `--setup-runs` changes that upper bound; add `--fixed-setup-runs` to execute the exact configured count regardless of calibrated construction cost, for example `--setup-runs 20 --fixed-setup-runs` for twenty constructions per sample. Update passes retain their adaptive sizing. Set `--setup-runs 1 --warmup-constructions 0` to check the result without that warmup. Targets, parameters, downloads, validation and cleanup are outside the timed work, except `getInstances()` in the instance cases: it builds the Anime.js adapters, and 4.5.0 decomposes every instance matrix there while the current version defers that work to the first rotation or scale write.
- Update timing uses a separate construction, one untimed settle pass, then 3 timed passes. The first pass after a construction also promotes the new objects out of V8's nursery, which made it up to twice as slow and changed from sample to sample. Each pass starts with an untimed seek to zero and uses enough seeks for about 50 ms, at least 20. A cap of 300 or 3,000 seeks cut the light cases short and moved their rows by up to 20 points on 2026-09-29, the same way in repeated runs, so there is no cap; both versions of a run use the same count and the report normalizes times to 300 seeks. `--update-runs` changes the number of timed passes.
- Garbage collection runs right before setup and again before the update workload is constructed. Collecting every page at once after the warmup, then leaving the pages idle until their sample, widened the setup ranges from about 7 to about 16 percent. Collection during the measured work remains part of the result. These numbers describe that allocation state; they are not interchangeable with measurements immediately after page startup or after prolonged playback.
- Value checks run after every timed pass, and validation seeks run in the first two samples, which place each version in both processes. The first and last passes check every target; intermediate passes check the first and last target. A skipped write, wrong value or missing module fails the case. Failed cases remain in the report and make the command fail.
- Constructing a timeline no longer renders it, so the warmup constructions do not warm the render code of the timeline cases, and their update rows start on colder code than the other rows. On 2026-10-05 `timeline-nested` measured 16 to 73 percent slower than the previous beta in this runner with identical writes and ease calls, while a direct measurement in fresh Chrome processes gave 20 µs per frame against 22 µs, and the Node screen gave 9 percent faster. Check a timeline update row that disagrees with `npm run test:perf:node` by timing `timeline.seek()` in a page of its own before treating it as a regression.
- These are synchronous CPU measurements. They exclude browser paint, compositing and GPU drawing. Dividing an update row by 300 gives the average time for one seek step, not a screen frame. Sized passes cut the full run from about 12 to about 5 minutes; on identical code they measured narrower ranges and no false slowdowns where the fixed 300 seeks measured three. The 88-case grid of 2026-09-29, with no seek cap and one page pair per sample, ran in about 4 minutes 40 seconds; the three timeline cases added later take about 10 seconds more. A per-target step seeks every animation; a blend step seeks both animations and applies their combined values.

Reports retain each sample mean, the arithmetic mean, the paired confidence interval, source paths,
configuration and browser version. They are saved to `tests/results/performance.json`; use
`--output path.json` to keep separate runs.

Negative change means faster. The percentage comes from the two displayed averages. Each sample comes
from its own page pair, so the range includes the offset each page keeps from its own V8 state. On
2026-09-29 a full identical-code run flagged 2 of 175 rows beyond their range. The former design, with
four samples from each of two page pairs, flagged 15, mostly as slowdowns. The precise runner uses the independent pair averages. Repeated positive averages still warrant investigation when individual intervals cross
zero. An interval that crosses zero does not prove equal performance. Use identical versions as a
control, and check allocation-sensitive differences with both 1 MB and 64 MB nursery settings before
attributing them to library work. Instrumentation can change V8 optimization and collection decisions.

Each row shows the baseline and `new` candidate averages, the change, its `margin`, and its `verdict`.
The change plus or minus the margin is the paired 95% range, from a Student t distribution over the page
pairs. The change plus the margin is the worst case: `+4.4% ±5.6%` can be up to 10% slower, `+0.9% ±1.0%`
at most 1.9%. The verdict is `faster` or `slower` for a flagged row, and stays empty for every other row,
as Criterion and pyperf report no change when the evidence is too weak. A former `P(slower)` column showed
the chance of any slowdown; it did not show the size, so a 0.9% and a 4.4% change both read 95%.

A run tests every row at once, so it flags rows at a 5% false discovery rate over all of them, by the
Benjamini and Hochberg method, not by each row's own range. On identical code, 175 ranges crossed zero
on 2 to 17 rows by chance in 2026-09-29 runs; the rate flagged none of them. Against 4.5.0 it kept 121 to
126 of the 121 to 128 rows that the ranges flagged. A flagged row fills green for a gain and red for a
slowdown; changes from -1.0% to +1.0% stay unflagged. While the run prints rows, the others are not known yet,
so a row takes the stricter share of the rate for one row among all of them: every row colored during the
run is also flagged in the summary. Failures use purple. Both runners end with the counts of flagged rows,
the unflagged row with the largest worst case, and the red rows, largest slowdown first, in the same columns
and colors. The worst case is named, not listed: in a clean control 93 of 175 rows could be more than 3%
slower, mostly setups with wide margins, so a list would flag noise again.
Redirected output is plain unless `FORCE_COLOR=1` is set. `NO_COLOR=1` or `FORCE_COLOR=0` disables colors.

The precise runner retains surviving pairs when another pair fails, and reports the failure. Fewer
pairs mean a wider interval. Use `--browser-runs 8` for more independent measurements. Older reports
that used a shared page for both versions must be rerun because their Three.js optimization state
was not isolated.

### Failures

Performance differences are reported without failing. Value errors, missing modules, browser errors, invalid options, and unfinished test runs fail the command. This keeps local timing noise separate from behavior failures. The full-suite command accepts the same benchmark options. A zero time on either side cannot support a percentage comparison and shows `n/a`; increase the work or select longer cases in that situation.

## Editor integration

`tests/suites/markers.test.js` checks the timeline hook contract:

| Hook | Arguments | Editor action |
| --- | --- | --- |
| `addTimelineChild` | `(timeline, targets, parameters, position, build)` | Call `build(targets, parameters, position)` and return `true` when handled |
| `addTimelineTimer` | `(parameters, position, timeline, build)` | Call `build(parameters, position)` |
| `addTimelineCall` | `(callback, parameters, position, timeline, build)` | Call `build(position, parameters)` |
| `addTimelineSync` | `(target, parameters, position, timeline, build)` | Call `build(position, parameters)` |
| `addTimelineLabel` | `(name, position, timeline)` | Return the resolved position |

Each builder returns only the children created by that call. Call and sync builders use the
original parameters when the second argument is omitted; the timer builder keeps the original
position when its second argument is omitted. An array sync invokes its hook once for the whole
array. Nested additions keep their own hooks, and editor updates finish before the timeline
method returns so an immediate `.seek()` uses the edited values.

IDs identify editor registrations. Repeated IDs keep native playback; the editor decides whether
those registrations are editable. Reusing a label name replaces its position, including inside
a callback. Editors change `muted` by reverting and rebuilding at the current playhead.
`revert(false)` restores original values without rendering time `0` or running modifiers.

## Individual checks

```sh
npm run test:pipeline
ANIME_TEST_SRC=dist/modules npm run test:pipeline
npm run test:api-types
npm run test:api-types:strict
npm run test:tooling
npm run test:headless
npm run test:node
```

The browser and consumer-type commands use existing build output. Use `npm test` when you need a fresh build and all checks.

The randomized comparisons take a copy of the source from before a change as their baseline:

```sh
node tests/compare-pipeline.mjs /path/to/previous/src ./src 10000
node tests/compare-composition.mjs /path/to/previous/src ./src 2000
node tests/compare-seeks.mjs /path/to/previous/src ./src 1000
node tests/compare-lifecycle.mjs /path/to/previous/src ./src 3000
node tests/compare-render-values.mjs /path/to/previous/src ./src 1000
```

`compare-render-values.mjs` is for a change meant to fix seek history results, so it expects differences. It fails when forward playback from the start differs in 10 ms steps, or when a changed value leaves the continuous motion that the same seek history gives in 5 ms steps while the old value matched its own. Each version is judged against its own replay, because a baseline bug in smooth playback, like keyframes kept at their end value after a loop wrap, is no reference. Differences where both versions match their own replay are counted apart.

These compare behavior, not performance. They are not part of `npm test`, which must not depend on a source copy outside the repository.

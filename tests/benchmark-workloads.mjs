// Every case eases with out(2) so the checks cover the ease call, and the keyframes variant alternates it with linear per segment.
const outQuad = progress => 1 - (1 - progress) ** 2;
const degrees = radians => radians * 180 / Math.PI;
const RED = [255, 0, 0];

/** A number property that moves from `from` at point 0 to `to` at point 1, written with an optional unit. */
function number(name, from, to, read, unit = '') {
  const at = point => [from + (to - from) * point];
  return { name, at, tolerance: .001, read: target => [read(target)],
    param: point => unit ? at(point)[0] + unit : at(point)[0],
    mix: (start, end, eased) => [start[0] + (end[0] - start[0]) * eased] };
}

/** A color property whose red, green and blue channels move from `from` at point 0 to `to` at point 1. */
function color(name, from, to) {
  const at = point => from.map((channel, i) => Math.round(channel + (to[i] - channel) * point));
  // Channels blend in squared space and are written as whole numbers.
  return { name, at, tolerance: .501, read: target => target.style[name].match(/[\d.]+/g).slice(0, 3).map(Number),
    param: point => `rgb(${at(point).join(', ')})`,
    mix: (start, end, eased) => start.map((channel, i) => Math.sqrt(channel ** 2 * (1 - eased) + end[i] ** 2 * eased)) };
}

const transform = target => new DOMMatrix(target.style.transform);

// The three properties of each target kind, the one-prop variant animates only the first.
const kinds = {
  'css-transforms': [number('x', 0, 100, target => transform(target).m41), number('y', 0, 200, target => transform(target).m42),
    number('rotateZ', 0, 90, target => { const { m11, m12 } = transform(target); return degrees(Math.atan2(m12, m11)); })],
  'css-properties': [number('left', 0, 100, target => parseFloat(target.style.left), 'px'),
    number('top', 0, 200, target => parseFloat(target.style.top), 'px'), number('opacity', 1, .5, target => parseFloat(target.style.opacity))],
  colors: [color('backgroundColor', RED, [0, 0, 255]), color('color', RED, [0, 255, 0]), color('borderColor', RED, [255, 255, 0])],
  'css-variables': ['--x', '--y', '--z'].map((name, i) => number(name, 0, 100 * (i + 1), target => parseFloat(target.style.getPropertyValue(name)), 'px')),
  'svg-attributes': ['cx', 'cy', 'r'].map((name, i) => number(name, 0, 100 * (i + 1), target => parseFloat(target.getAttribute(name)))),
  'js-objects': ['x', 'y', 'z'].map((name, i) => number(name, 0, 100 * (i + 1), target => target[name])),
  'three-object3d': [number('x', 0, 100, target => target.position.x), number('y', 0, 200, target => target.position.y),
    number('rotateZ', 0, 90, target => degrees(target.rotation.z))],
  'three-instances': [number('x', 0, 100, target => target.x), number('y', 0, 200, target => target.y),
    number('rotateZ', 0, 90, target => target.rotateZ)],
};
const isDom = kind => kind.startsWith('css-') || kind === 'colors' || kind === 'svg-attributes';

// Features the target kinds do not cover, each on one animation without a stagger.
const features = ['keyframes-500', 'keyframes-playback-500', 'remove', 'none', 'replace', 'replace-partial', 'replace-sparse', 'timeline', 'timeline-sequence', 'timeline-scrub', 'timeline-nested', 'adapter', 'complex', 'blend'];

export const groups = { quick: ['css-transforms/1000/stagger', 'js-objects/10000/stagger', 'css-properties/1000/stagger', 'three-object3d/10000/stagger'],
  matrix: [], features };
for (const kind of Object.keys(kinds)) {
  // The stagger variants use one animation over many targets with stagger(), the most common use, where each target has its own timing.
  // The other variants create one animation per target. Both shapes run at three counts, the value forms once at 100 targets.
  // Keyframes add siblings and a timing per segment, so stagger-keyframes skips both render shortcuts, the simple tween walk and the shared progress.
  groups['matrix-' + kind] = [10, 100, isDom(kind) ? 1000 : 10000].flatMap(count => ['stagger', 'three-props',
    ...(count === 100 ? ['one-prop', 'from-to', 'keyframes', 'stagger-keyframes'] : [])].map(variant => `${kind}/${count}/${variant}`));
  groups.matrix.push(...groups['matrix-' + kind]);
}
export const cases = [...groups.matrix, ...features, 'js-objects/100/function-values', 'js-objects/10000/function-values', 'timeline-loop'];

const BASE_STYLE = 'position:absolute;left:0px;top:0px;width:1px;height:1px;opacity:1;background-color:rgb(255,0,0);color:rgb(255,0,0);border-color:rgb(255,0,0);--x:0px;--y:0px;--z:0px';
const SVG_NS = 'http://www.w3.org/2000/svg';
const CALIBRATION_SEEKS = 20;

export function near(actual, expected, label, tolerance = .001) {
  if (!Number.isFinite(actual) || !Number.isFinite(expected) || Math.abs(actual - expected) > tolerance) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

export async function prepare(base, name) {
  // Seed Math.random so Three.js creates the same UUIDs in every benchmark page.
  let randomSeed = 123456789;
  Math.random = () => {
    randomSeed = (Math.imul(randomSeed, 1664525) + 1013904223) >>> 0;
    return randomSeed / 4294967296;
  };
  const kind = name.split('/')[0];
  const api = await import(base + 'index.js');
  const extras = { additive: null, Object3D: null, mesh: null, getInstances: null, commitChanges: null };
  if (kind === 'blend') extras.additive = (await import(base + 'animation/additive.js')).additive;
  if (kind === 'adapter') {
    const { registerAdapter } = await import(base + 'adapters/index.js');
    registerAdapter().registerTargetAdapter(t => t.nativeVector === true).registerProperty('vector',
      t => t.vector,
      (t, number, tween) => { t.x = tween._numbers[0]; t.y = tween._numbers[1]; t.z = tween._numbers[2]; });
  }
  if (kind === 'three-object3d') {
    await import(base + 'adapters/three/index.js');
    extras.Object3D = (await import('three')).Object3D;
  }
  if (kind === 'three-instances') {
    const { getInstances, commitChanges } = await import(base + 'adapters/three/index.js');
    const { InstancedMesh, BoxGeometry, MeshBasicMaterial } = await import('three');
    // One mesh with an instance per target; the per-instance adapters are the animation targets.
    extras.mesh = count => new InstancedMesh(new BoxGeometry(), new MeshBasicMaterial(), count);
    extras.getInstances = getInstances;
    extras.commitChanges = commitChanges;
  }
  api.engine.useDefaultMainLoop = false;
  api.engine.pause();
  return {
    workload: () => buildWorkload(api, extras, name),
    sample: (iterations, updateRuns, validate) => runSample(api, extras, name, iterations, updateRuns, validate),
    setup: runs => measureSetup(api, extras, name, runs),
    warm: constructions => warm(api, extras, name, constructions),
    calibrate: () => calibrate(api, extras, name),
  };
}

/**
 * Builds the targets and parameters of one case once. Construction, seeking, checking, and cleanup are
 * separate steps so setup runs, warmups, cold constructions, and samples compose them differently.
 */
export function buildWorkload({ animate, createTimeline, stagger }, extras, name) {
  const [kind, countName, variant] = name.split('/');
  const properties = kinds[kind];
  const staggered = !!variant && variant.startsWith('stagger');
  const independent = !!variant && !staggered;
  const keyframed = !!variant && variant.endsWith('keyframes');
  const keyframeCount = kind === 'keyframes-playback-500' ? 500 : kind.startsWith('keyframes-') ? +kind.slice(10) : 0;
  const blend = kind === 'blend';
  const partial = kind === 'replace-partial' || kind === 'replace-sparse';
  // A sequence appends steps on the same targets, so each step chains from the one before it.
  const sequence = kind === 'timeline-sequence' ? { steps: 10, duration: 100, yStep: 10 } : kind === 'timeline-scrub' ? { steps: 50, duration: 20, yStep: 2 } : null;
  const scrub = kind === 'timeline-scrub';
  const nested = kind === 'timeline-nested';
  const looped = kind === 'timeline-loop';
  const timeline = kind === 'timeline' || looped;
  const vector = kind === 'complex' || kind === 'adapter' || blend;
  const nativeVector = kind === 'adapter';
  const svg = kind === 'svg-attributes';
  const dom = isDom(kind);
  // An animation of 1,000 targets or more defaults to composition 'none', so the cases that measure composition stay
  // below it: at 1,000 the replace case never replaced and sequence steps did not chain. The none case matches replace.
  const count = variant ? +countName : keyframeCount ? 1 : scrub ? 100 : sequence || kind === 'replace' || partial || kind === 'none' ? 500 : 1000;
  const params = { duration: 1000, ease: 'out(2)', autoplay: false };
  // The stagger spreads the target starts over one second, whatever the count.
  const staggerStep = staggered ? 1000 / count : 0;
  const mesh = kind === 'three-instances' ? extras.mesh(count) : null;
  let targets = mesh ? null : Array.from({ length: count }, () => svg ? document.createElementNS(SVG_NS, 'circle') :
    dom ? document.createElement('div') :
    kind === 'three-object3d' ? new extras.Object3D() :
    vector ? { nativeVector, vector: '0 0 0', x: 0, y: 0, z: 0 } :
    { x: kind === 'remove' ? 10 : 0, y: kind === 'remove' ? 20 : 0, z: kind === 'remove' ? 30 : 0 });
  let container = null;
  if (dom) {
    container = svg ? document.createElementNS(SVG_NS, 'svg') : document.createElement('div');
    for (const target of targets) {
      if (svg) for (const attribute of ['cx', 'cy', 'r']) target.setAttribute(attribute, '0');
      else target.style.cssText = BASE_STYLE;
      container.appendChild(target);
    }
    document.body.appendChild(container);
    // Initial style/layout work is not animation setup work.
    container.getBoundingClientRect();
  }
  // The replace case starts with a running animation on every target, so construction pays the sibling lookups and overrides.
  const running = kind === 'replace' ? animate(targets, { ...params, x: 50, y: 50, z: 50 }) : null;
  if (running) running.seek(500);
  const replaced = 50 * outQuad(.5);
  const keyframes = keyframeCount ? Array.from({ length: keyframeCount }, (_, i) => ({ x: i + 1, y: (i + 1) * 2, duration: 1 })) : null;
  // Each value follows a path through points, 0 is the initial value and 1 the final one. Some keyframe segments move backward.
  const points = variant === 'from-to' ? [.1, .9] : keyframed ? [0, .8, .2, .6, 1] : [0, 1];
  const animated = variant === 'one-prop' ? 1 : 3;
  // One shared params object per child keeps object spreads out of the timed timeline setup.
  const childParams = { ...params, ...(kind === 'remove' ? { x: 100, y: 200, z: 300 } : { x: 100 }) };
  // Even steps move x to 100 and odd steps back to 0 while y climbs, so a step that starts from the wrong value shows.
  const xTo = step => step % 2 ? 0 : 100;
  const steps = sequence ? Array.from({ length: sequence.steps }, (_, k) => ({ x: xTo(k), y: (k + 1) * sequence.yStep, duration: sequence.duration, ease: 'out(2)' })) : null;
  const nestedChildren = [];
  // The other cases also build their parameters here, so the timed construction only creates the animations.
  const animationParams = keyframeCount ? { keyframes, ease: 'out(2)', autoplay: false } :
    { ...params, ...(properties ? null : vector ? { vector: '100 200 300' } : { x: 100, y: 200, z: 300 }) };
  if (properties) {
    for (let p = 0; p < animated; p++) {
      const { name: property, param } = properties[p];
      // Keyframes chain from the current value, the usual way to write them.
      animationParams[property] = keyframed ? points.slice(1).map((point, i) => ({ to: param(point), duration: 250, ease: i % 2 ? 'out(2)' : 'linear' })) :
        variant === 'from-to' ? points.map(point => param(point)) : param(1);
      if (variant === 'function-values') {
        const value = animationParams[property];
        animationParams[property] = () => value;
      }
    }
    if (staggered) animationParams.delay = stagger(staggerStep);
  }
  if (blend) Object.assign(animationParams, { x: 100, composition: 'blend' });
  if (kind === 'none') animationParams.composition = 'none';
  const blendParams = blend ? { ...params, x: 200, vector: '200 400 600', composition: 'blend' } : null;
  const partialTargets = partial ? targets.slice(0, kind === 'replace-sparse' ? 1 : count - 1) : null;
  const partialParams = partial ? { ...params, x: 200, y: 400, z: 600 } : null;
  const animations = independent ? [] : null;
  let animation = null;
  let second = null;
  const construct = () => {
    // getInstances builds the Anime.js instance adapters, so it is construction work, the mesh is not.
    if (mesh) targets = extras.getInstances(mesh);
    if (independent) {
      for (let i = 0; i < count; i++) animations.push(animate(targets[i], animationParams));
      animation = animations[0];
    } else if (timeline || kind === 'remove') {
      animation = createTimeline(looped ? { autoplay: false, loop: 4, alternate: true } : { autoplay: false });
      for (let i = 0; i < count; i++) animation.add(targets[i], childParams, timeline ? i : 0);
    } else if (sequence) {
      animation = createTimeline({ autoplay: false });
      for (let k = 0; k < steps.length; k++) animation.add(targets, steps[k]);
    } else if (nested) {
      // The timeline case split into ten child timelines, synced 100 ms apart, renders the same values.
      animation = createTimeline({ autoplay: false });
      for (let j = 0; j < 10; j++) {
        const child = createTimeline({ autoplay: false });
        for (let m = 0; m < 100; m++) child.add(targets[j * 100 + m], childParams, m);
        nestedChildren.push(child);
        animation.sync(child, j * 100);
      }
    } else {
      animation = animate(targets, animationParams);
      if (blend) second = animate(targets, blendParams);
      else if (partial) second = animate(partialTargets, partialParams);
    }
    near(animation.duration, keyframeCount || (looped ? 9995 : timeline || nested ? 1999 : sequence ? sequence.steps * sequence.duration : 1000 + (count - 1) * staggerStep), kind + ' duration');
  };
  const cancel = () => {
    if (independent) {
      for (const instance of animations) instance.cancel();
      animations.length = 0;
    } else if (animation) animation.cancel();
    if (second) second.cancel();
    for (const child of nestedChildren) child.cancel();
    nestedChildren.length = 0;
    animation = second = null;
  };
  const hasPasses = (!keyframeCount || kind === 'keyframes-playback-500') && kind !== 'remove';
  // The flush composes the instance matrices, it is the adapter's work on every frame like the writes.
  const seek = independent ? time => {
      for (let i = 0; i < count; i++) animations[i].seek(time, true);
      if (mesh) extras.commitChanges(mesh);
    } : time => {
      animation.seek(time, true);
      if (mesh) extras.commitChanges(mesh);
      if (second) {
        second.seek(time, true);
        if (blend) extras.additive.update();
      }
    };

  /** The expected value of a target kind property at a time local to its target, out(2) on every segment but the even keyframes. */
  function valueAt(property, time) {
    const segments = points.length - 1;
    const position = Math.min(segments, Math.max(0, time / 1000 * segments));
    const segment = Math.min(segments - 1, Math.floor(position));
    const progress = position - segment;
    return property.mix(property.at(points[segment]), property.at(points[segment + 1]), keyframed && !(segment % 2) ? progress : outQuad(progress));
  }

  /** The progress of every property in the feature cases. */
  function featureProgress(time) {
    if (keyframeCount) {
      // Each keyframe moves one unit in one millisecond on its own out(2) curve.
      const frame = Math.min(keyframeCount - 1, Math.floor(time));
      return (frame + outQuad(time - frame)) / keyframeCount;
    }
    return outQuad(Math.min(1, Math.max(0, time / 1000)));
  }

  // A thorough check reads every target, a quick one the first and the last.
  function check(time, thorough = true) {
    const progress = properties ? 0 : featureProgress(time);
    let timelineTime = time;
    if (looped) {
      const iteration = Math.min(4, Math.floor(Math.max(0, time) / 1999));
      const elapsed = Math.min(1999, Math.max(0, time - iteration * 1999));
      timelineTime = iteration % 2 ? 1999 - elapsed : elapsed;
    }
    for (let k = 0, l = thorough ? count : 2; k < l; k++) {
      const i = thorough ? k : k ? count - 1 : 0;
      const target = targets[i];
      const label = `${name} target ${i} at ${time}ms`;
      if (properties) {
        if (independent) near(animations[i].duration, 1000, label + ' duration');
        for (let p = 0; p < 3; p++) {
          const property = properties[p];
          // A property the variant does not animate must keep its initial value.
          const expected = p < animated ? valueAt(property, time - i * staggerStep) : property.at(0);
          const actual = property.read(target);
          for (let c = 0; c < expected.length; c++) {
            near(actual[c], expected[c], `${label} ${property.name}${expected.length > 1 ? ' channel ' + c : ''}`, property.tolerance);
          }
        }
      } else if (vector) {
        const numbers = nativeVector ? [target.x, target.y, target.z] : target.vector.split(' ').map(Number);
        for (let j = 0; j < 3; j++) near(numbers[j], (blend ? 200 : 100) * (j + 1) * progress, label + ' vector ' + j);
        if (blend) near(target.x, 200 * progress, label + ' x');
      } else if (timeline || nested) {
        near(target.x, 100 * outQuad(Math.max(0, Math.min(1, (timelineTime - i) / 1000))), label);
      } else if (sequence) {
        const position = Math.min(sequence.steps, Math.max(0, time / sequence.duration));
        const k = Math.min(sequence.steps - 1, Math.floor(position));
        const eased = outQuad(position - k);
        const xFrom = k ? xTo(k - 1) : 0;
        near(target.x, xFrom + (xTo(k) - xFrom) * eased, label + ' x');
        near(target.y, (k + eased) * sequence.yStep, label + ' y');
      } else if (kind === 'remove') {
        near(target.x, i < 200 ? 10 + 90 * outQuad(.5) : 10 + 90 * progress, label + ' x');
        near(target.y, 20 + 180 * progress, label + ' y');
        near(target.z, 30 + 270 * progress, label + ' z');
      } else if (partial) {
        const end = i < partialTargets.length ? 200 : 100;
        near(target.x, end * progress, label + ' x');
        near(target.y, end * 2 * progress, label + ' y');
        near(target.z, end * 3 * progress, label + ' z');
      } else if (kind === 'replace') {
        near(target.x, replaced + (100 - replaced) * progress, label + ' x');
        near(target.y, replaced + (200 - replaced) * progress, label + ' y');
        near(target.z, replaced + (300 - replaced) * progress, label + ' z');
      } else {
        near(target.x, (keyframeCount || 100) * progress, label + ' x');
        near(target.y, (keyframeCount || 100) * 2 * progress, label + ' y');
        if (!keyframeCount) near(target.z, 300 * progress, label + ' z');
      }
    }
  }

  // One pass of seeks over the duration, every timed update changes progress.
  // Every pass covers the whole duration, so every target moves during it as in real playback.
  // A scrub sweeps forward, back, and forward to the middle in equal steps, as a timeline driven by scrolling does.
  const pass = scrub ? iterations => {
    const duration = animation.duration;
    const step = 2.5 * duration / iterations;
    const at = distance => distance <= duration ? distance : distance <= 2 * duration ? 2 * duration - distance : distance - 2 * duration;
    for (let i = 1; i <= iterations; i++) seek(at(i * step));
    return at(iterations * step);
  } : iterations => {
    const step = animation.duration / iterations;
    for (let i = 1; i <= iterations; i++) seek(i * step);
    return iterations * step;
  };
  const cleanup = () => {
    cancel();
    if (running) running.cancel();
    if (container) container.remove();
  };
  return { kind, hasPasses, construct, seek, pass, check, cleanup, get targets() { return targets; }, get animation() { return animation; } };
}

/** One measured sample: a construction, the timed passes, and the value checks around them. */
export function runSample(api, extras, name, iterations, updateRuns = 3, validate = true) {
  const workload = buildWorkload(api, extras, name);
  const { kind, targets, seek, pass, check } = workload;
  const times = {};
  try {
    workload.construct();
    const animation = workload.animation;
    if (kind === 'remove') {
      seek(500);
      const start = performance.now();
      for (let i = 0; i < 200; i++) animation.remove(targets[i], 'x');
      times.remove = performance.now() - start;
    } else if (workload.hasPasses) {
      times.update = [];
      // Settle one untimed pass first, the first pass after a construction also promotes the new objects out of the nursery.
      seek(0);
      pass(iterations);
      for (let run = 0; run < updateRuns; run++) {
        seek(0);
        const start = performance.now();
        const end = pass(iterations);
        times.update.push(performance.now() - start);
        // Check each measured run before a later run can hide a missed write, every target on the first and last run.
        check(end, run === 0 || run === updateRuns - 1);
      }
    }
    // Validation seeks check behavior, which does not change between samples of one page.
    const fractions = validate ? [.125, .25, .375, .5, .625, .75, .875, 1, .875, .75, .625, .5, .375, .25, .125, 0, 1] : [];
    for (let f = 0, l = fractions.length; f < l; f++) {
      const time = fractions[f] * animation.duration;
      seek(time);
      check(time, f === 0 || f === l - 1);
    }
    return times;
  } finally {
    workload.cleanup();
  }
}

/**
 * One timed construction on fresh targets. Targets anime has already animated construct about half again
 * slower, so every measured construction gets its own.
 */
export function timeConstruction(api, extras, name) {
  const workload = buildWorkload(api, extras, name);
  try {
    const start = performance.now();
    workload.construct();
    return performance.now() - start;
  } finally {
    workload.cleanup();
  }
}

/** Mean construction time over runs, each on fresh targets. */
export function measureSetup(api, extras, name, runs) {
  let total = 0;
  for (let i = 0; i < runs; i++) total += timeConstruction(api, extras, name);
  return total / runs;
}

/** Executes the same count of constructions on every page of a pair, so V8 settles equally before any measurement. */
export function warm(api, extras, name, constructions) {
  for (let i = 0; i < constructions; i++) timeConstruction(api, extras, name);
}

/**
 * Times one construction and one short pass on a page that runs alone, and returns the costs in
 * milliseconds so the runner can size the measured work without contention from the other pages.
 */
export function calibrate(api, extras, name) {
  const workload = buildWorkload(api, extras, name);
  try {
    let start = performance.now();
    workload.construct();
    const constructionMs = performance.now() - start;
    let seekMs = 0;
    if (workload.hasPasses) {
      // Time the second pass, the first after a construction also promotes the new objects out of the nursery.
      workload.seek(0);
      workload.pass(CALIBRATION_SEEKS);
      workload.seek(0);
      start = performance.now();
      workload.pass(CALIBRATION_SEEKS);
      seekMs = (performance.now() - start) / CALIBRATION_SEEKS;
    }
    return { constructionMs, seekMs };
  } finally {
    workload.cleanup();
  }
}

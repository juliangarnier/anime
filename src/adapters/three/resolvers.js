/**
 * Global property resolvers for three.js targets. Auto-detect `Color`-typed properties, `Vector2/3/4` axis components, shader uniforms, and TSL `UniformNode` slots on any three.js object. For mesh-like targets, a second resolver walks to `target.material` and runs the same detection there.
 */

import { threeAdapter } from './adapter.js';
import { degToRad, radToDeg } from '../../utils/number.js';
import {
  AXIS_MAP,
  PATH_DIRECT,
  KIND_COLOR,
  KIND_SCALAR,
  classifyTargetProp,
  readColorAt,
  writeColorAt,
  readScalar,
  writeScalar,
  readVectorAt,
  writeVectorAt,
} from './helpers.js';

/** @import { PropDescriptor } from './helpers.js' */

const identity = (t) => t;
const getMaterial = (t) => t.material;

const directColorCache = [{}, {}, {}];
const directScalarCache = [{}, {}, {}];
const directVectorCache = [{}, {}, {}];

const materialColorCache = [{}, {}, {}];
const materialScalarCache = [{}, {}, {}];
const materialVectorCache = [{}, {}, {}];

const ANGLE_NAMES = { rotation: 1, angle: 1 };
const angleEntryCache = {};
const eulerAxisEntryCache = {};

/**
 * @param {String} name
 * @param {PropDescriptor} descriptor
 */
const buildEntry = (name, descriptor, getHost, colorCaches, scalarCaches, vectorCaches) => {
  const path = descriptor.path;
  if (descriptor.kind === KIND_COLOR) {
    const cache = colorCaches[path];
    return cache[name] || (cache[name] = {
      get: (t) => readColorAt(getHost(t), name, path),
      set: (t, _, tw) => writeColorAt(getHost(t), name, tw._numbers, path),
    });
  }
  if (descriptor.kind === KIND_SCALAR) {
    const cache = scalarCaches[path];
    return cache[name] || (cache[name] = {
      get: (t) => readScalar(getHost(t), name, path),
      set: (t, v) => writeScalar(getHost(t), name, v, path),
    });
  }
  // KIND_VECTOR
  const base = descriptor.base;
  const axis = descriptor.axis;
  const cache = vectorCaches[path];
  return cache[name] || (cache[name] = {
    get: (t) => readVectorAt(getHost(t), base, axis, path),
    set: (t, v) => writeVectorAt(getHost(t), base, axis, v, path),
  });
};

// Detect direct Color, Vector axis, uniforms, and UniformNode slots on the target.
// Numeric or boolean direct fields fall through to the engine OBJECT path.
threeAdapter.registerPropertyResolver((target, name) => {
  const descriptor = classifyTargetProp(target, name);
  if (!descriptor) return null;
  if (descriptor.kind === KIND_SCALAR && descriptor.path === PATH_DIRECT) return null;
  return buildEntry(name, descriptor, identity, directColorCache, directScalarCache, directVectorCache);
});

// Walk to target.material for meshes and other Object3D subclasses with a material field.
// Skip when the target already exposes the name directly so a mesh-level mapping wins.
threeAdapter.registerPropertyResolver((target, name) => {
  if (target[name] !== undefined) return null;
  const m = target.material;
  if (!m) return null;
  const first = Array.isArray(m) ? m[0] : m;
  if (!first) return null;
  const descriptor = classifyTargetProp(first, name);
  if (!descriptor) return null;
  return buildEntry(name, descriptor, getMaterial, materialColorCache, materialScalarCache, materialVectorCache);
});

// Convert angle named scalar fields between degrees and radians so users animate in degrees.
// Skip the Object3D rotation since Euler is not a number, rotateX, rotateY and rotateZ handle it.
threeAdapter.registerPropertyResolver((target, name) => {
  if (!ANGLE_NAMES[name]) return null;
  if (typeof target[name] !== 'number') return null;
  return angleEntryCache[name] || (angleEntryCache[name] = {
    get: (t) => radToDeg(t[name]),
    set: (t, v) => { t[name] = degToRad(v); },
  });
});

// Decompose an Euler angle field into axis components in degrees, like rotationX on a non Object3D.
// Object3D keeps its rotateX, rotateY and rotateZ mappings since static props beat resolvers.
threeAdapter.registerPropertyResolver((target, name) => {
  const axis = AXIS_MAP[name[name.length - 1]];
  if (!axis) return null;
  const base = name.slice(0, -1);
  if (!ANGLE_NAMES[base]) return null;
  const v = target[base];
  if (!v || !v.isEuler) return null;
  return eulerAxisEntryCache[name] || (eulerAxisEntryCache[name] = {
    get: (t) => radToDeg(t[base][axis]),
    set: (t, v) => { t[base][axis] = degToRad(v); },
  });
});

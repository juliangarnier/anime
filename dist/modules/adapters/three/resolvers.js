/**
 * Anime.js - adapters - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { threeAdapter } from './adapter.js';
import { radToDeg, degToRad } from '../../utils/number.js';
import { classifyTargetProp, KIND_SCALAR, PATH_DIRECT, AXIS_MAP, KIND_COLOR, writeColorAt, readColorAt, writeScalar, readScalar, writeVectorAt, readVectorAt } from './helpers.js';

/**
 * Global property resolvers for three.js targets. Auto-detect `Color`-typed properties, `Vector2/3/4` axis components, shader uniforms, and TSL `UniformNode` slots on any three.js object. For mesh-like targets, a second resolver walks to `target.material` and runs the same detection there.
 */


const identity = (t) => t;
const getMaterial = (t) => t.material;

const directColorCache = [{}, {}, {}];
const directScalarCache = [{}, {}, {}];
const directVectorCache = [{}, {}, {}];

const materialColorCache = [{}, {}, {}];
const materialScalarCache = [{}, {}, {}];
const materialVectorCache = [{}, {}, {}];

const buildEntry = (name, d, getHost, colorCaches, scalarCaches, vectorCaches) => {
  const path = d.path;
  if (d.kind === KIND_COLOR) {
    const cache = colorCaches[path];
    return cache[name] || (cache[name] = {
      get: (t) => readColorAt(getHost(t), name, path),
      set: (t, _, tw) => writeColorAt(getHost(t), name, tw._numbers, path),
    });
  }
  if (d.kind === KIND_SCALAR) {
    const cache = scalarCaches[path];
    return cache[name] || (cache[name] = {
      get: (t) => readScalar(getHost(t), name, path),
      set: (t, v) => writeScalar(getHost(t), name, v, path),
    });
  }
  // KIND_VECTOR
  const base = d.base;
  const axis = d.axis;
  const cache = vectorCaches[path];
  return cache[name] || (cache[name] = {
    get: (t) => readVectorAt(getHost(t), base, axis, path),
    set: (t, v) => writeVectorAt(getHost(t), base, axis, v, path),
  });
};

// Detect direct Color, Vector axis, uniforms, and UniformNode slots on the target.
// Numeric or boolean direct fields fall through to the engine OBJECT path.
threeAdapter.registerPropertyResolver((target, name) => {
  const d = classifyTargetProp(target, name);
  if (!d) return null;
  if (d.kind === KIND_SCALAR && d.path === PATH_DIRECT) return null;
  return buildEntry(name, d, identity, directColorCache, directScalarCache, directVectorCache);
});

// Walk to target.material for meshes and other Object3D subclasses with a material field.
// Skip when the target already exposes the name directly so a mesh-level mapping wins.
threeAdapter.registerPropertyResolver((target, name) => {
  if (target[name] !== undefined) return null;
  const m = target.material;
  if (!m) return null;
  const first = Array.isArray(m) ? m[0] : m;
  if (!first) return null;
  const d = classifyTargetProp(first, name);
  if (!d) return null;
  return buildEntry(name, d, getMaterial, materialColorCache, materialScalarCache, materialVectorCache);
});

// Convert angle-named scalar fields between degrees and radians so users animate in degrees on any three.js target.
// Object3D Euler rotation is excluded because Euler is not a number, the rotateX/Y/Z mappings handle it.
const ANGLE_NAMES = { rotation: 1, angle: 1 };
const angleEntries = {};
threeAdapter.registerPropertyResolver((target, name) => {
  if (!ANGLE_NAMES[name]) return null;
  if (typeof target[name] !== 'number') return null;
  return angleEntries[name] || (angleEntries[name] = {
    get: (t) => radToDeg(t[name]),
    set: (t, v) => { t[name] = degToRad(v); },
  });
});

// Decompose Euler-typed angle fields to axis components in degrees, like rotationX, rotationY, rotationZ when rotation is an Euler.
// Object3D mappings win because static adapter props beat resolvers, so this only catches non-Object3D targets with an Euler rotation field.
const eulerAxisEntries = {};
threeAdapter.registerPropertyResolver((target, name) => {
  const axis = AXIS_MAP[name[name.length - 1]];
  if (!axis) return null;
  const base = name.slice(0, -1);
  if (!ANGLE_NAMES[base]) return null;
  const v = target[base];
  if (!v || !v.isEuler) return null;
  return eulerAxisEntries[name] || (eulerAxisEntries[name] = {
    get: (t) => radToDeg(t[base][axis]),
    set: (t, v) => { t[base][axis] = degToRad(v); },
  });
});

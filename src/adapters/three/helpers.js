/**
 * Read and write helpers for the three.js adapters. Each one takes a target or a target array and a PATH constant that selects the leaf, target[name] for PATH_DIRECT, target.uniforms[name].value for PATH_UNIFORM, target[name].value for PATH_NODE.
 * Each call site passes its constant, so the JIT folds the branch of leafAt and writeLeafScalar.
 */

import { SRGBColorSpace } from 'three';
import { degToRad } from '../../utils/number.js';

/**
 * @typedef {Object} PropDescriptor
 * @property {Number} kind
 * @property {Number} path
 * @property {String} base
 * @property {'x' | 'y' | 'z' | 'w'} axis
 */

export const COLOR_NORM = 1 / 255;

export const AXIS_MAP = /** @type {Record<string, 'x' | 'y' | 'z' | 'w'>} */({ X: 'x', Y: 'y', Z: 'z', W: 'w' });

export const PATH_DIRECT = 0;
const PATH_UNIFORM = 1;
const PATH_NODE = 2;

export const KIND_COLOR = 0;
export const KIND_SCALAR = 1;
export const KIND_VECTOR = 2;

// Reuse one mutable descriptor across calls, callers must consume immediately since the next call mutates it.
/** @type {PropDescriptor} */
const descriptor = { kind: 0, path: 0, base: '', axis: 'x' };

/**
 * Patches a column-major `Matrix4.elements` array in place with CSS-style `skewX(α)` / `skewY(β)`, the 3D extension `skewZ(γ)` (shears z by x), and a `transform-origin` shift.
 *
 * @param {number[]} e
 * @param {number} skewX
 * @param {number} skewY
 * @param {number} skewZ
 * @param {number} ox
 * @param {number} oy
 * @param {number} oz
 */
export function applySkewOrigin(e, skewX, skewY, skewZ, ox, oy, oz) {
  if (skewX !== 0) {
    const t = Math.tan(degToRad(skewX));
    e[4] += e[0] * t;
    e[5] += e[1] * t;
    e[6] += e[2] * t;
  }
  if (skewY !== 0) {
    const t = Math.tan(degToRad(skewY));
    e[0] += e[4] * t;
    e[1] += e[5] * t;
    e[2] += e[6] * t;
  }
  if (skewZ !== 0) {
    const t = Math.tan(degToRad(skewZ));
    e[0] += e[8]  * t;
    e[1] += e[9]  * t;
    e[2] += e[10] * t;
  }
  if (ox !== 0 || oy !== 0 || oz !== 0) {
    e[12] += ox - (e[0] * ox + e[4] * oy + e[8] * oz);
    e[13] += oy - (e[1] * ox + e[5] * oy + e[9] * oz);
    e[14] += oz - (e[2] * ox + e[6] * oy + e[10] * oz);
  }
}

/**
 * @param {any} c
 * @return {String | null}
 */
export function readColorHex(c) {
  return c ? `#${c.getHexString(SRGBColorSpace)}` : null;
}

/**
 * Returns true when v is a Vector2, Vector3 or Vector4 whose dimension covers axis. Quaternion and plain objects return false.
 *
 * @param {any} v
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @return {boolean}
 */
export function isVectorWith(v, axis) {
  if (!v) return false;
  if (axis === 'x' || axis === 'y') return !!(v.isVector2 || v.isVector3 || v.isVector4);
  if (axis === 'z') return !!(v.isVector3 || v.isVector4);
  return !!v.isVector4;
}

/**
 * Classifies target[name] and returns the shared descriptor with kind, path, base and axis, or null when no adapter path matches.
 *
 * @param {any} target
 * @param {string} name
 * @return {PropDescriptor | null}
 */
export function classifyTargetProp(target, name) {
  const value = target[name];
  if (value !== undefined) {
    if (value && value.isColor) {
      descriptor.kind = KIND_COLOR;
      descriptor.path = PATH_DIRECT;
      return descriptor;
    }
    if (value && value.isUniformNode) {
      // Route TSL slot writes through node value, booleans share the scalar entry.
      const v = value.value;
      if (v && v.isColor) {
        descriptor.kind = KIND_COLOR;
        descriptor.path = PATH_NODE;
        return descriptor;
      }
      if (typeof v === 'number' || typeof v === 'boolean') {
        descriptor.kind = KIND_SCALAR;
        descriptor.path = PATH_NODE;
        return descriptor;
      }
      return null;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      descriptor.kind = KIND_SCALAR;
      descriptor.path = PATH_DIRECT;
      return descriptor;
    }
    return null;
  }
  const uniforms = target.uniforms;
  const uniform = uniforms && uniforms[name];
  if (uniform) {
    const uniformValue = uniform.value;
    if (uniformValue && uniformValue.isColor) {
      descriptor.kind = KIND_COLOR;
      descriptor.path = PATH_UNIFORM;
      return descriptor;
    }
    if (typeof uniformValue === 'number') {
      descriptor.kind = KIND_SCALAR;
      descriptor.path = PATH_UNIFORM;
      return descriptor;
    }
  }
  // Decompose vector axis for names like posX, uOffsetY, uVec4W, colorNodeX.
  const axis = AXIS_MAP[name[name.length - 1]];
  if (axis) {
    const base = name.slice(0, -1);
    if (isVectorWith(target[base], axis)) {
      descriptor.kind = KIND_VECTOR;
      descriptor.path = PATH_DIRECT;
      descriptor.base = base;
      descriptor.axis = axis;
      return descriptor;
    }
    const baseSlot = target[base];
    if (baseSlot && baseSlot.isUniformNode && isVectorWith(baseSlot.value, axis)) {
      descriptor.kind = KIND_VECTOR;
      descriptor.path = PATH_NODE;
      descriptor.base = base;
      descriptor.axis = axis;
      return descriptor;
    }
    const baseUniform = uniforms && uniforms[base];
    if (baseUniform && isVectorWith(baseUniform.value, axis)) {
      descriptor.kind = KIND_VECTOR;
      descriptor.path = PATH_UNIFORM;
      descriptor.base = base;
      descriptor.axis = axis;
      return descriptor;
    }
  }
  return null;
}

function leafAt(target, name, path) {
  if (path === PATH_DIRECT) return target[name];
  if (path === PATH_UNIFORM) {
    const uniforms = target.uniforms;
    const entry = uniforms && uniforms[name];
    return entry ? entry.value : null;
  }
  const node = target[name];
  return node ? node.value : null;
}

function writeLeafScalar(target, name, v, path) {
  if (path === PATH_DIRECT) {
    target[name] = v;
    return;
  }
  if (path === PATH_UNIFORM) {
    const uniforms = target.uniforms;
    const entry = uniforms && uniforms[name];
    if (entry) entry.value = v;
    return;
  }
  const node = target[name];
  if (node) node.value = v;
}

/**
 * @param {any} target
 * @param {string} name
 * @param {number} path
 * @param {number} [defaultValue]
 * @return {number}
 */
export function readScalar(target, name, path, defaultValue = 0) {
  const first = Array.isArray(target) ? target[0] : target;
  if (!first) return defaultValue;
  const v = leafAt(first, name, path);
  return v === undefined || v === null ? defaultValue : v;
}

/**
 * @param {any} target
 * @param {string} name
 * @param {number} v
 * @param {number} path
 */
export function writeScalar(target, name, v, path) {
  if (!target) return;
  if (Array.isArray(target)) {
    for (let i = 0, l = target.length; i < l; i++) writeLeafScalar(target[i], name, v, path);
  } else {
    writeLeafScalar(target, name, v, path);
  }
}

/**
 * @param {any} target
 * @param {string} name
 * @param {number} path
 * @return {String | null}
 */
export function readColorAt(target, name, path) {
  const first = Array.isArray(target) ? target[0] : target;
  return readColorHex(first ? leafAt(first, name, path) : null);
}

/**
 * @param {any} target
 * @param {string} name
 * @param {Array.<Number>} ns
 * @param {number} path
 */
export function writeColorAt(target, name, ns, path) {
  if (!target) return;
  const r = ns[0] * COLOR_NORM;
  const g = ns[1] * COLOR_NORM;
  const b = ns[2] * COLOR_NORM;
  if (Array.isArray(target)) {
    for (let i = 0, l = target.length; i < l; i++) {
      const c = leafAt(target[i], name, path);
      if (c) c.setRGB(r, g, b, SRGBColorSpace);
    }
  } else {
    const c = leafAt(target, name, path);
    if (c) c.setRGB(r, g, b, SRGBColorSpace);
  }
}

/**
 * @param {any} target
 * @param {string} base
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @param {number} path
 * @return {number}
 */
export function readVectorAt(target, base, axis, path) {
  const first = Array.isArray(target) ? target[0] : target;
  const vec = first ? leafAt(first, base, path) : null;
  return vec ? vec[axis] : 0;
}

/**
 * @param {any} target
 * @param {string} base
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @param {number} v
 * @param {number} path
 */
export function writeVectorAt(target, base, axis, v, path) {
  if (!target) return;
  if (Array.isArray(target)) {
    for (let i = 0, l = target.length; i < l; i++) {
      const vec = leafAt(target[i], base, path);
      if (vec) vec[axis] = v;
    }
  } else {
    const vec = leafAt(target, base, path);
    if (vec) vec[axis] = v;
  }
}

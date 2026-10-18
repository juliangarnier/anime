/**
 * Anime.js - adapters - CJS
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var three = require('three');
var number = require('../../utils/number.cjs');

/**
 * Generic read/write helpers for the three.js bindings. Each operates on a target (or target array) and walks to the leaf via a path tag - direct (`target[name]`), uniform (`target.uniforms[name].value`), or TSL node (`target[name].value`). Adapter and resolver files pass the matching `PATH_*` constant; the JIT specializes each call site so the branch in `leafAt` / `writeLeafScalar` constant-folds.
 */


const COLOR_NORM = 1 / 255;

const AXIS_MAP = /** @type {Record<string, 'x' | 'y' | 'z' | 'w'>} */({ X: 'x', Y: 'y', Z: 'z', W: 'w' });

const PATH_DIRECT = 0;
const PATH_UNIFORM = 1;
const PATH_NODE = 2;

const KIND_COLOR = 0;
const KIND_SCALAR = 1;
const KIND_VECTOR = 2;

// Reuse one mutable descriptor across calls, callers must consume immediately since the next call mutates it.
const desc = { kind: 0, path: 0, base: '', axis: /** @type {'x' | 'y' | 'z' | 'w'} */('x') };

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
function applySkewOrigin(e, skewX, skewY, skewZ, ox, oy, oz) {
  if (skewX !== 0) {
    const t = Math.tan(number.degToRad(skewX));
    e[4] += e[0] * t;
    e[5] += e[1] * t;
    e[6] += e[2] * t;
  }
  if (skewY !== 0) {
    const t = Math.tan(number.degToRad(skewY));
    e[0] += e[4] * t;
    e[1] += e[5] * t;
    e[2] += e[6] * t;
  }
  if (skewZ !== 0) {
    const t = Math.tan(number.degToRad(skewZ));
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
function readColorHex(c) {
  return c ? `#${c.getHexString(three.SRGBColorSpace)}` : null;
}

/**
 * Returns `true` when `v` is a `Vector2/3/4` instance whose dimension covers `axis`. `Quaternion` and plain `{x,y,z,w}`-shaped objects are intentionally rejected.
 *
 * @param {any} v
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @return {boolean}
 */
function isVectorWith(v, axis) {
  if (!v) return false;
  if (axis === 'x' || axis === 'y') return !!(v.isVector2 || v.isVector3 || v.isVector4);
  if (axis === 'z') return !!(v.isVector3 || v.isVector4);
  return !!v.isVector4;
}

/**
 * Classifies `target[name]` and returns a descriptor `{ kind, path, base, axis }` (or `null`). Used by the resolver entries in `resolvers.js` and by the `Object3D` adapter to build the matching access pattern for any three.js target (Object3D, Material, Texture, Fog, UniformNode).
 *
 * @param {any} target
 * @param {string} name
 * @return {{ kind: number, path: number, base: string, axis: 'x' | 'y' | 'z' | 'w' } | null}
 */
function classifyTargetProp(target, name) {
  const value = target[name];
  if (value !== undefined) {
    if (value && value.isColor) {
      desc.kind = KIND_COLOR; desc.path = PATH_DIRECT;
      return desc;
    }
    if (value && value.isUniformNode) {
      // Route TSL slot writes through node value, booleans share the scalar entry.
      const v = value.value;
      if (v && v.isColor) {
        desc.kind = KIND_COLOR; desc.path = PATH_NODE;
        return desc;
      }
      if (typeof v === 'number' || typeof v === 'boolean') {
        desc.kind = KIND_SCALAR; desc.path = PATH_NODE;
        return desc;
      }
      return null;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
      desc.kind = KIND_SCALAR; desc.path = PATH_DIRECT;
      return desc;
    }
    return null;
  }
  const uniforms = target.uniforms;
  const u = uniforms && uniforms[name];
  if (u) {
    const uv = u.value;
    if (uv && uv.isColor) {
      desc.kind = KIND_COLOR; desc.path = PATH_UNIFORM;
      return desc;
    }
    if (typeof uv === 'number') {
      desc.kind = KIND_SCALAR; desc.path = PATH_UNIFORM;
      return desc;
    }
  }
  // Decompose vector axis for names like posX, uOffsetY, uVec4W, colorNodeX.
  const axis = AXIS_MAP[name[name.length - 1]];
  if (axis) {
    const base = name.slice(0, -1);
    if (isVectorWith(target[base], axis)) {
      desc.kind = KIND_VECTOR; desc.path = PATH_DIRECT; desc.base = base; desc.axis = axis;
      return desc;
    }
    const baseSlot = target[base];
    if (baseSlot && baseSlot.isUniformNode && isVectorWith(baseSlot.value, axis)) {
      desc.kind = KIND_VECTOR; desc.path = PATH_NODE; desc.base = base; desc.axis = axis;
      return desc;
    }
    const ub = uniforms && uniforms[base];
    if (ub && isVectorWith(ub.value, axis)) {
      desc.kind = KIND_VECTOR; desc.path = PATH_UNIFORM; desc.base = base; desc.axis = axis;
      return desc;
    }
  }
  return null;
}

function leafAt(target, name, path) {
  if (path === PATH_DIRECT) return target[name];
  if (path === PATH_UNIFORM) {
    const u = target.uniforms;
    const e = u && u[name];
    return e ? e.value : null;
  }
  const n = target[name];
  return n ? n.value : null;
}

function writeLeafScalar(target, name, v, path) {
  if (path === PATH_DIRECT) { target[name] = v; return; }
  if (path === PATH_UNIFORM) {
    const u = target.uniforms;
    const e = u && u[name];
    if (e) e.value = v;
    return;
  }
  const n = target[name];
  if (n) n.value = v;
}

/**
 * @param {any} target
 * @param {string} name
 * @param {number} path
 * @param {number} [defaultValue]
 * @return {number}
 */
function readScalar(target, name, path, defaultValue) {
  if (defaultValue === undefined) defaultValue = 0;
  if (!target) return defaultValue;
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
function writeScalar(target, name, v, path) {
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
function readColorAt(target, name, path) {
  if (!target) return null;
  const first = Array.isArray(target) ? target[0] : target;
  return readColorHex(first ? leafAt(first, name, path) : null);
}

/**
 * @param {any} target
 * @param {string} name
 * @param {Array.<Number>} ns
 * @param {number} path
 */
function writeColorAt(target, name, ns, path) {
  if (!target) return;
  const r = ns[0] * COLOR_NORM;
  const g = ns[1] * COLOR_NORM;
  const b = ns[2] * COLOR_NORM;
  if (Array.isArray(target)) {
    for (let i = 0, l = target.length; i < l; i++) {
      const c = leafAt(target[i], name, path);
      if (c) c.setRGB(r, g, b, three.SRGBColorSpace);
    }
  } else {
    const c = leafAt(target, name, path);
    if (c) c.setRGB(r, g, b, three.SRGBColorSpace);
  }
}

/**
 * @param {any} target
 * @param {string} base
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @param {number} path
 * @return {number}
 */
function readVectorAt(target, base, axis, path) {
  if (!target) return 0;
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
function writeVectorAt(target, base, axis, v, path) {
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

exports.AXIS_MAP = AXIS_MAP;
exports.COLOR_NORM = COLOR_NORM;
exports.KIND_COLOR = KIND_COLOR;
exports.KIND_SCALAR = KIND_SCALAR;
exports.KIND_VECTOR = KIND_VECTOR;
exports.PATH_DIRECT = PATH_DIRECT;
exports.applySkewOrigin = applySkewOrigin;
exports.classifyTargetProp = classifyTargetProp;
exports.isVectorWith = isVectorWith;
exports.readColorAt = readColorAt;
exports.readColorHex = readColorHex;
exports.readScalar = readScalar;
exports.readVectorAt = readVectorAt;
exports.writeColorAt = writeColorAt;
exports.writeScalar = writeScalar;
exports.writeVectorAt = writeVectorAt;

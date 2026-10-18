/**
 * Anime.js - adapters - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { SRGBColorSpace, Vector3, Euler, Matrix4, Quaternion, Color, BatchedMesh } from 'three';
import { radToDeg, degToRad } from '../../utils/number.js';
import { threeAdapter } from './adapter.js';
import { readColorHex, COLOR_NORM, applySkewOrigin, readScalar, PATH_DIRECT, writeScalar } from './helpers.js';

const hasSkewOrigin = (t) => !!(t._skewX || t._skewY || t._skewZ || t._originX || t._originY || t._originZ);

/**
 * @import { Object3D, InstancedMesh } from 'three'
 *
 * @typedef {InstancedMesh | BatchedMesh} InstanceParent
 */

const DIRTY_POS = 1;
const DIRTY_ROT = 2;
const DIRTY_SCALE = 4;
const DIRTY_SKEW = 8;

/** @type {WeakMap<InstanceParent, InstanceBinding>} */
const bindings = new WeakMap();

/**
 * Per-mesh state for `InstancedMesh` / `BatchedMesh` animations. Holds the instance array, the dirty queue, and the chained `onBeforeRender` closure.
 */
class InstanceBinding {

  /** @param {InstanceParent} mesh */
  constructor(mesh) {
    this.mesh = mesh;
    this.hasInstanceMatrix = 'instanceMatrix' in mesh;
    /** @type {(Instance | null)[]} */
    this.instances = [];
    /** @type {Instance[]} */
    this.dirtyList = [];
    /** @type {Object3D['onBeforeRender'] | null} */
    this.userOnBeforeRender = mesh.onBeforeRender || null;
    this.chainedHandler = makeChainedHandler(this);
    Object.defineProperty(mesh, 'onBeforeRender', {
      configurable: true,
      get: () => this.chainedHandler,
      set: (fn) => { this.userOnBeforeRender = fn; },
    });
  }

  flush() {
    const list = this.dirtyList;
    if (list.length === 0) return;
    for (let i = 0, l = list.length; i < l; i++) list[i]._flush();
    if (this.hasInstanceMatrix) /** @type {InstancedMesh} */(this.mesh).instanceMatrix.needsUpdate = true;
    list.length = 0;
  }

}

/**
 * @param {InstanceBinding} binding
 * @return {Object3D['onBeforeRender']}
 */
function makeChainedHandler(binding) {
  return function (renderer, scene, camera, geometry, material, group) {
    binding.flush();
    const u = binding.userOnBeforeRender;
    if (u) u.call(binding.mesh, renderer, scene, camera, geometry, material, group);
  };
}

/**
 * Per-instance adapter for `InstancedMesh` or `BatchedMesh`. Returned by `getInstances(mesh)`. Exposes the same flat properties as the mesh adapter, applied to a single instance id. Writes are coalesced and flushed before each render via `onBeforeRender`; call `commitChanges(mesh)` if you need to read `mesh.instanceMatrix` between a tick and a render.
 *
 * Caveats:
 * - `opacity` writes the parent's shared material, every instance is affected.
 * - `visible` is backed by `BatchedMesh.setVisibleAt`. On `InstancedMesh` it is a no-op, use `scale = 0` to hide an instance.
 */
class Instance {

  /**
   * @param {InstanceBinding} binding
   * @param {number} id
   */
  constructor(binding, id) {
    this.isAnimejsInstanceProxy = true;
    this.parent = binding.mesh;
    this.id = id;
    this._position = new Vector3();
    this._rotation = new Euler(0, 0, 0, 'XYZ');
    this._scale = new Vector3(1, 1, 1);
    this._matrix = new Matrix4();
    this._quat = new Quaternion();
    // Pre-allocate _color so the hidden class stays stable, set color mutates it in place rather than re-binding the field.
    this._color = new Color();
    this._dirty = 0;
    // Skew in degrees and transform-origin in object-space.
    // applySkewOrigin computes Math.tan inline per non-zero axis, so we only carry the user-facing angle here.
    this._skewX = 0;
    this._skewY = 0;
    this._skewZ = 0;
    this._originX = 0;
    this._originY = 0;
    this._originZ = 0;
    // Skip the position-only fast path in _flush whenever any skew or origin is non-zero, since both modify the matrix beyond pure translation.
    this._hasSkewOrigin = false;
    // Cache the binding dirty queue once so per-frame setters skip a property hop.
    /** @type {Instance[]} */
    this._dirtyList = binding.dirtyList;
    // Cache parent capability flags once so per-frame setters skip prototype-chain in checks.
    const parent = binding.mesh;
    this._hasSetColor = 'setColorAt' in parent;
    this._hasSetVisible = 'setVisibleAt' in parent;
    this._hasGetVisible = 'getVisibleAt' in parent;

    parent.getMatrixAt(id, this._matrix);
    if (this._matrix.elements[15] === 0) this._matrix.identity();
    this._matrix.decompose(this._position, this._quat, this._scale);
    this._rotation.setFromQuaternion(this._quat, 'XYZ');

    if ('getColorAt' in parent && 'instanceColor' in parent && parent.instanceColor) {
      parent.getColorAt(id, this._color);
    }
  }

  /**
   * @param {number} flag
   */
  _markDirty(flag) {
    // Enqueue once per frame, later flags only OR into _dirty without re-pushing to the queue.
    if (this._dirty === 0) this._dirtyList.push(this);
    this._dirty |= flag;
  }

  _flush() {
    const d = this._dirty;
    if (!d) return;
    const m = this._matrix;
    const p = this._position;
    if (d === DIRTY_POS && !this._hasSkewOrigin) {
      const e = m.elements;
      e[12] = p.x; e[13] = p.y; e[14] = p.z;
    } else {
      const q = this._quat;
      if (d & DIRTY_ROT) q.setFromEuler(this._rotation);
      m.compose(p, q, this._scale);
      if (this._hasSkewOrigin) {
        applySkewOrigin(m.elements, this._skewX, this._skewY, this._skewZ, this._originX, this._originY, this._originZ);
      }
    }
    this.parent.setMatrixAt(this.id, m);
    this._dirty = 0;
  }

  get x() { return this._position.x; }
  set x(v) { this._position.x = v; this._markDirty(DIRTY_POS); }

  get y() { return this._position.y; }
  set y(v) { this._position.y = v; this._markDirty(DIRTY_POS); }

  get z() { return this._position.z; }
  set z(v) { this._position.z = v; this._markDirty(DIRTY_POS); }

  get rotateX() { return radToDeg(this._rotation.x); }
  set rotateX(v) { this._rotation.x = degToRad(v); this._markDirty(DIRTY_ROT); }

  get rotateY() { return radToDeg(this._rotation.y); }
  set rotateY(v) { this._rotation.y = degToRad(v); this._markDirty(DIRTY_ROT); }

  get rotateZ() { return radToDeg(this._rotation.z); }
  set rotateZ(v) { this._rotation.z = degToRad(v); this._markDirty(DIRTY_ROT); }

  get scaleX() { return this._scale.x; }
  set scaleX(v) { this._scale.x = v; this._markDirty(DIRTY_SCALE); }

  get scaleY() { return this._scale.y; }
  set scaleY(v) { this._scale.y = v; this._markDirty(DIRTY_SCALE); }

  get scaleZ() { return this._scale.z; }
  set scaleZ(v) { this._scale.z = v; this._markDirty(DIRTY_SCALE); }

  get scale() { return this._scale.x; }
  set scale(v) {
    const s = this._scale;
    s.x = v; s.y = v; s.z = v;
    this._markDirty(DIRTY_SCALE);
  }

  get skewX() { return this._skewX; }
  set skewX(v) {
    this._skewX = v;
    this._hasSkewOrigin = hasSkewOrigin(this);
    this._markDirty(DIRTY_SKEW);
  }

  get skewY() { return this._skewY; }
  set skewY(v) {
    this._skewY = v;
    this._hasSkewOrigin = hasSkewOrigin(this);
    this._markDirty(DIRTY_SKEW);
  }

  get skewZ() { return this._skewZ; }
  set skewZ(v) {
    this._skewZ = v;
    this._hasSkewOrigin = hasSkewOrigin(this);
    this._markDirty(DIRTY_SKEW);
  }

  get transformOriginX() { return this._originX; }
  set transformOriginX(v) {
    this._originX = v;
    this._hasSkewOrigin = hasSkewOrigin(this);
    this._markDirty(DIRTY_SKEW);
  }

  get transformOriginY() { return this._originY; }
  set transformOriginY(v) {
    this._originY = v;
    this._hasSkewOrigin = hasSkewOrigin(this);
    this._markDirty(DIRTY_SKEW);
  }

  get transformOriginZ() { return this._originZ; }
  set transformOriginZ(v) {
    this._originZ = v;
    this._hasSkewOrigin = hasSkewOrigin(this);
    this._markDirty(DIRTY_SKEW);
  }

  get opacity() {
    return readScalar(/** @type {any} */(this.parent).material, 'opacity', PATH_DIRECT, 1);
  }
  /** @param {number} v */
  set opacity(v) {
    writeScalar(/** @type {any} */(this.parent).material, 'opacity', v, PATH_DIRECT);
  }

  get visible() {
    return this._hasGetVisible ? /** @type {any} */(this.parent).getVisibleAt(this.id) : true;
  }
  /** @param {boolean} v */
  set visible(v) {
    if (this._hasSetVisible) /** @type {any} */(this.parent).setVisibleAt(this.id, v);
  }

}

/**
 * Flushes pending matrix writes for every dirty instance of `mesh`.
 * Called automatically before each render. Call it yourself if you read
 * `mesh.instanceMatrix` between an animation tick and the next render.
 *
 * @param {InstanceParent} mesh
 */
function commitChanges(mesh) {
  const binding = bindings.get(mesh);
  if (binding) binding.flush();
}

/**
 * Returns an array of per-instance adapters for `mesh`. Index by id, deleted slots on `BatchedMesh` are `null`. Pass the array (or a slice / a single element) to `animate()`.
 *
 * animate(getInstances(mesh), { x: 100, delay: stagger(5) });
 * animate(getInstances(mesh)[42], { scale: 2 });
 *
 * The same array reference is preserved across `mesh.count` / `addInstance` / `deleteInstance` calls. Entries are pushed, nulled, or truncated in place. Animations bound to an outdated reference keep tweening their original adapters.
 *
 * `mesh.onBeforeRender` is replaced with an accessor that flushes
 * pending instance writes before each render and forwards to your
 * handler. Assigning your own `mesh.onBeforeRender = fn` keeps the
 * auto-flush, but reading `mesh.onBeforeRender` afterwards returns the
 * chained dispatcher rather than `fn` itself, so identity checks
 * (`mesh.onBeforeRender === fn`) will not match.
 *
 * @param {InstanceParent} mesh
 * @return {(Instance | null)[]}
 */
function getInstances(mesh) {
  let binding = bindings.get(mesh);
  if (!binding) {
    binding = new InstanceBinding(mesh);
    bindings.set(mesh, binding);
  }
  if (mesh instanceof BatchedMesh) {
    return refreshBatched(binding);
  }
  return refreshInstanced(binding);
}

/**
 * @param {InstanceBinding} binding
 * @return {(Instance | null)[]}
 */
function refreshInstanced(binding) {
  const mesh = /** @type {InstancedMesh} */(binding.mesh);
  const count = mesh.count;
  const arr = binding.instances;
  if (arr.length === 0 && count > 0) {
    arr.length = count;
    for (let i = 0; i < count; i++) arr[i] = new Instance(binding, i);
    return arr;
  }
  if (arr.length < count) {
    for (let i = arr.length; i < count; i++) arr.push(new Instance(binding, i));
  } else if (arr.length > count) {
    arr.length = count;
  }
  return arr;
}

/**
 * @param {InstanceBinding} binding
 * @return {(Instance | null)[]}
 */
function refreshBatched(binding) {
  const mesh = /** @type {BatchedMesh} */(binding.mesh);
  const arr = binding.instances;
  // Read three internal _instanceInfo to skip slots marked inactive by deleteInstance.
  // Iterate the full slot count, not instanceCount, since deleted slots leave gaps but live ids past them must still be visited.
  const instanceInfo = /** @type {{ _instanceInfo?: { active: boolean }[] }} */(mesh)._instanceInfo ?? [];
  const len = instanceInfo.length;
  if (arr.length < len) arr.length = len;
  for (let i = 0; i < len; i++) {
    const info = instanceInfo[i];
    const inactive = info && info.active === false;
    if (inactive) {
      arr[i] = null;
    } else if (!arr[i]) {
      arr[i] = new Instance(binding, i);
    }
  }
  if (arr.length > len) arr.length = len;
  return arr;
}

const instanceAdapter = threeAdapter.registerTargetAdapter((t) => t instanceof Instance);
instanceAdapter.registerProperty('color',
  (t) => readColorHex(t._color),
  (t, _, tw) => {
    if (!t._hasSetColor) return;
    const ns = tw._numbers;
    t._color.setRGB(ns[0] * COLOR_NORM, ns[1] * COLOR_NORM, ns[2] * COLOR_NORM, SRGBColorSpace);
    const p = /** @type {any} */(t.parent);
    p.setColorAt(t.id, t._color);
    if (p.instanceColor) p.instanceColor.needsUpdate = true;
  },
);
// Shorthand 3-token string x y z routed via the engine COMPLEX path.
// The setter reads tween _numbers for the per-frame lerped triplet.
instanceAdapter.registerProperty('transformOrigin',
  (t) => `${t._originX} ${t._originY} ${t._originZ}`,
  (t, _, tw) => {
    const ns = tw._numbers;
    t._originX = ns[0];
    t._originY = ns[1];
    t._originZ = ns[2];
    t._hasSkewOrigin = hasSkewOrigin(t);
    t._markDirty(DIRTY_SKEW);
  },
);

export { commitChanges, getInstances };

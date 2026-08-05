/**
 * Anime.js - adapters - CJS
 * @version v5.0.0-beta.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var three = require('three');
var number = require('../../utils/number.cjs');
var adapter = require('./adapter.cjs');
var helpers = require('./helpers.cjs');

/** @import { Object3D, InstancedMesh } from 'three' */

/** @typedef {InstancedMesh | BatchedMesh} InstanceParent */

const DIRTY_POS = 1;
const DIRTY_ROT = 2;
const DIRTY_SCALE = 4;
const DIRTY_SKEW = 8;

// Translation occupies elements 12, 13, 14 of every 16 float column major matrix.
const M_X = 12;
const M_Y = 13;
const M_Z = 14;

// Reused scratch for compose and decompose, never held across a call.
const scratchMatrix = new three.Matrix4();
const scratchPosition = new three.Vector3();
const scratchEuler = new three.Euler(0, 0, 0, 'XYZ');
const scratchQuat = new three.Quaternion();
const scratchScale = new three.Vector3();

/** @type {WeakMap<InstanceParent, InstanceBinding>} */
const bindings = new WeakMap();

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

// Enqueue a composed instance for the next flush, coalescing repeated writes into one entry.
const markDirty = (t, flag) => {
  const b = t._binding;
  const id = t.id;
  if (b.dirty[id] === 0) b.dirtyIds[b.dirtyCount++] = id;
  b.dirty[id] |= flag;
};

// Promote to composed mode, seeding position, rotation, and scale from the current
// matrix so applied translation and scale survive the switch.
const enterComposed = (t) => {
  if (t._composed) return;
  const b = t._binding;
  if (!b.pos) b.allocateComposed();
  const m = scratchMatrix;
  if (t._array) m.fromArray(t._array, t._base);
  else t.parent.getMatrixAt(t.id, m);
  if (m.elements[15] === 0) m.identity();
  m.decompose(scratchPosition, scratchQuat, scratchScale);
  scratchEuler.setFromQuaternion(scratchQuat, 'XYZ');
  const b3 = t._base3;
  const pos = b.pos, rot = b.rot, scl = b.scl;
  pos[b3] = scratchPosition.x; pos[b3 + 1] = scratchPosition.y; pos[b3 + 2] = scratchPosition.z;
  rot[b3] = scratchEuler.x; rot[b3 + 1] = scratchEuler.y; rot[b3 + 2] = scratchEuler.z;
  scl[b3] = scratchScale.x; scl[b3 + 1] = scratchScale.y; scl[b3 + 2] = scratchScale.z;
  t._composed = true;
};

// Flag the binding as skewed and allocate the skew and origin rows on first use.
const enableSkew = (b) => {
  b.hasSkew = 1;
  if (b.skew) return;
  const n = b.capacity * 3;
  b.skew = new Float64Array(n);
  b.origin = new Float64Array(n);
};

// Read rotation or scale from the buffer without switching to composed mode, so a
// getter never downgrades an instance off the fast position path.
const scratchEulerOf = (t) => {
  scratchMatrix.fromArray(t._array, t._base);
  scratchMatrix.decompose(scratchPosition, scratchQuat, scratchScale);
  scratchEuler.setFromQuaternion(scratchQuat, 'XYZ');
  return scratchEuler;
};
const scratchScaleOf = (t) => {
  scratchMatrix.fromArray(t._array, t._base);
  scratchMatrix.decompose(scratchPosition, scratchQuat, scratchScale);
  return scratchScale;
};

// Shared transform read and write, used by the prototype accessor for direct writes
// and the registered adapter setter so the engine skips a keyed store per frame.
const getX = (t) => t._composed ? t._binding.pos[t._base3] : t._array[t._base + M_X];
const setX = (t, v) => { if (t._composed) { t._binding.pos[t._base3] = v; markDirty(t, DIRTY_POS); } else { t._array[t._base + M_X] = v; t._binding.touched = 1; } };
const getY = (t) => t._composed ? t._binding.pos[t._base3 + 1] : t._array[t._base + M_Y];
const setY = (t, v) => { if (t._composed) { t._binding.pos[t._base3 + 1] = v; markDirty(t, DIRTY_POS); } else { t._array[t._base + M_Y] = v; t._binding.touched = 1; } };
const getZ = (t) => t._composed ? t._binding.pos[t._base3 + 2] : t._array[t._base + M_Z];
const setZ = (t, v) => { if (t._composed) { t._binding.pos[t._base3 + 2] = v; markDirty(t, DIRTY_POS); } else { t._array[t._base + M_Z] = v; t._binding.touched = 1; } };

const getRotateX = (t) => number.radToDeg(t._composed ? t._binding.rot[t._base3] : scratchEulerOf(t).x);
const setRotateX = (t, v) => { enterComposed(t); t._binding.rot[t._base3] = number.degToRad(v); markDirty(t, DIRTY_ROT); };
const getRotateY = (t) => number.radToDeg(t._composed ? t._binding.rot[t._base3 + 1] : scratchEulerOf(t).y);
const setRotateY = (t, v) => { enterComposed(t); t._binding.rot[t._base3 + 1] = number.degToRad(v); markDirty(t, DIRTY_ROT); };
const getRotateZ = (t) => number.radToDeg(t._composed ? t._binding.rot[t._base3 + 2] : scratchEulerOf(t).z);
const setRotateZ = (t, v) => { enterComposed(t); t._binding.rot[t._base3 + 2] = number.degToRad(v); markDirty(t, DIRTY_ROT); };

const getScaleX = (t) => t._composed ? t._binding.scl[t._base3] : scratchScaleOf(t).x;
const setScaleX = (t, v) => { enterComposed(t); t._binding.scl[t._base3] = v; markDirty(t, DIRTY_SCALE); };
const getScaleY = (t) => t._composed ? t._binding.scl[t._base3 + 1] : scratchScaleOf(t).y;
const setScaleY = (t, v) => { enterComposed(t); t._binding.scl[t._base3 + 1] = v; markDirty(t, DIRTY_SCALE); };
const getScaleZ = (t) => t._composed ? t._binding.scl[t._base3 + 2] : scratchScaleOf(t).z;
const setScaleZ = (t, v) => { enterComposed(t); t._binding.scl[t._base3 + 2] = v; markDirty(t, DIRTY_SCALE); };
const getScale = (t) => t._composed ? t._binding.scl[t._base3] : scratchScaleOf(t).x;
const setScale = (t, v) => { enterComposed(t); const b3 = t._base3, scl = t._binding.scl; scl[b3] = v; scl[b3 + 1] = v; scl[b3 + 2] = v; markDirty(t, DIRTY_SCALE); };

const getSkewX = (t) => t._composed && t._binding.skew ? t._binding.skew[t._base3] : 0;
const setSkewX = (t, v) => { enterComposed(t); const b = t._binding; enableSkew(b); b.skew[t._base3] = v; markDirty(t, DIRTY_SKEW); };
const getSkewY = (t) => t._composed && t._binding.skew ? t._binding.skew[t._base3 + 1] : 0;
const setSkewY = (t, v) => { enterComposed(t); const b = t._binding; enableSkew(b); b.skew[t._base3 + 1] = v; markDirty(t, DIRTY_SKEW); };
const getSkewZ = (t) => t._composed && t._binding.skew ? t._binding.skew[t._base3 + 2] : 0;
const setSkewZ = (t, v) => { enterComposed(t); const b = t._binding; enableSkew(b); b.skew[t._base3 + 2] = v; markDirty(t, DIRTY_SKEW); };

const getOriginX = (t) => t._composed && t._binding.origin ? t._binding.origin[t._base3] : 0;
const setOriginX = (t, v) => { enterComposed(t); const b = t._binding; enableSkew(b); b.origin[t._base3] = v; markDirty(t, DIRTY_SKEW); };
const getOriginY = (t) => t._composed && t._binding.origin ? t._binding.origin[t._base3 + 1] : 0;
const setOriginY = (t, v) => { enterComposed(t); const b = t._binding; enableSkew(b); b.origin[t._base3 + 1] = v; markDirty(t, DIRTY_SKEW); };
const getOriginZ = (t) => t._composed && t._binding.origin ? t._binding.origin[t._base3 + 2] : 0;
const setOriginZ = (t, v) => { enterComposed(t); const b = t._binding; enableSkew(b); b.origin[t._base3 + 2] = v; markDirty(t, DIRTY_SKEW); };

/**
 * Per-mesh state for an InstancedMesh or BatchedMesh. Position-only instances write
 * the matrix buffer directly; instances that animate rotation, scale, or skew store
 * their transform in the flat pos / rot / scl rows and recompose during flush.
 */
class InstanceBinding {

  /** @param {InstanceParent} mesh */
  constructor(mesh) {
    this.mesh = mesh;
    this.hasInstanceMatrix = 'instanceMatrix' in mesh;
    // Direct writes target this buffer for InstancedMesh, null for BatchedMesh whose instances stay composed.
    /** @type {Float32Array | null} */
    this.array = this.hasInstanceMatrix ? /** @type {Float32Array} */(/** @type {InstancedMesh} */(mesh).instanceMatrix.array) : null;
    this.capacity = this.hasInstanceMatrix ? /** @type {InstancedMesh} */(mesh).instanceMatrix.count : /** @type {BatchedMesh} */(mesh).maxInstanceCount;
    /** @type {(Instance | null)[]} */
    this.instances = [];
    // Fast path writes set this so flush raises instanceMatrix.needsUpdate once per render.
    this.touched = 0;
    // Composed transform rows and dirty queue, allocated on the first rotation, scale, or skew write.
    /** @type {Float64Array | null} */
    this.pos = null;
    /** @type {Float64Array | null} */
    this.rot = null;
    /** @type {Float64Array | null} */
    this.scl = null;
    /** @type {Float64Array | null} */
    this.skew = null;
    /** @type {Float64Array | null} */
    this.origin = null;
    this.hasSkew = 0;
    /** @type {Uint8Array | null} */
    this.dirty = null;
    /** @type {Int32Array | null} */
    this.dirtyIds = null;
    this.dirtyCount = 0;
    // Shared mesh capability flags kept here so each Instance object stays small.
    this.hasSetColor = 'setColorAt' in mesh;
    this.hasSetVisible = 'setVisibleAt' in mesh;
    this.hasGetVisible = 'getVisibleAt' in mesh;
    /** @type {Object3D['onBeforeRender'] | null} */
    this.userOnBeforeRender = mesh.onBeforeRender || null;
    this.chainedHandler = makeChainedHandler(this);
    Object.defineProperty(mesh, 'onBeforeRender', {
      configurable: true,
      get: () => this.chainedHandler,
      set: (fn) => { this.userOnBeforeRender = fn; },
    });
  }

  allocateComposed() {
    const n = this.capacity * 3;
    this.pos = new Float64Array(n);
    this.rot = new Float64Array(n);
    this.scl = new Float64Array(n);
    this.dirty = new Uint8Array(this.capacity);
    this.dirtyIds = new Int32Array(this.capacity);
  }

  flush() {
    const count = this.dirtyCount;
    if (count) {
      const ids = this.dirtyIds, pos = this.pos, rot = this.rot, scl = this.scl, dirty = this.dirty;
      const out = this.array, mesh = this.mesh, hasSkew = this.hasSkew, skew = this.skew, origin = this.origin;
      const sp = scratchPosition, se = scratchEuler, sq = scratchQuat, ss = scratchScale, sm = scratchMatrix;
      for (let k = 0; k < count; k++) {
        const id = ids[k];
        const b3 = id * 3;
        // Overwrite the translation columns in place when only position changed, so flush skips the
        // setFromEuler and compose that the unchanged rotation and scale rows would otherwise redo.
        if (dirty[id] === DIRTY_POS && out && !hasSkew) {
          const o = id * 16;
          out[o + M_X] = pos[b3];
          out[o + M_Y] = pos[b3 + 1];
          out[o + M_Z] = pos[b3 + 2];
        } else {
          sp.set(pos[b3], pos[b3 + 1], pos[b3 + 2]);
          se.set(rot[b3], rot[b3 + 1], rot[b3 + 2]);
          sq.setFromEuler(se);
          ss.set(scl[b3], scl[b3 + 1], scl[b3 + 2]);
          sm.compose(sp, sq, ss);
          if (hasSkew) helpers.applySkewOrigin(sm.elements, skew[b3], skew[b3 + 1], skew[b3 + 2], origin[b3], origin[b3 + 1], origin[b3 + 2]);
          if (out) sm.toArray(out, id * 16);
          else mesh.setMatrixAt(id, sm);
        }
        dirty[id] = 0;
      }
      this.dirtyCount = 0;
      this.touched = 1;
    }
    if (this.touched) {
      if (this.hasInstanceMatrix) /** @type {InstancedMesh} */(this.mesh).instanceMatrix.needsUpdate = true;
      this.touched = 0;
    }
  }

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
    this._array = binding.array;
    this._base = id * 16;
    this._base3 = id * 3;
    this._composed = false;
    this._binding = binding;
    /** @type {Color | null} */
    this._color = null;
    this.parent = binding.mesh;
    this.id = id;
    this.isAnimejsInstanceProxy = true;

    if (this._array) {
      // Seed empty slots with identity so a bare translation write yields a valid matrix.
      const e = this._array;
      const b = this._base;
      if (e[b + 15] === 0) { e[b] = 1; e[b + 5] = 1; e[b + 10] = 1; e[b + 15] = 1; }
    } else {
      enterComposed(this);
    }
  }

  _ensureColor() {
    let c = this._color;
    if (c) return c;
    c = this._color = new three.Color();
    const p = /** @type {any} */(this.parent);
    if ('getColorAt' in p && 'instanceColor' in p && p.instanceColor) p.getColorAt(this.id, c);
    return c;
  }

  get opacity() {
    return helpers.readScalar(/** @type {any} */(this.parent).material, 'opacity', helpers.PATH_DIRECT, 1);
  }
  /** @param {number} v */
  set opacity(v) {
    helpers.writeScalar(/** @type {any} */(this.parent).material, 'opacity', v, helpers.PATH_DIRECT);
  }

  get visible() {
    return this._binding.hasGetVisible ? /** @type {any} */(this.parent).getVisibleAt(this.id) : true;
  }
  /** @param {boolean} v */
  set visible(v) {
    if (this._binding.hasSetVisible) /** @type {any} */(this.parent).setVisibleAt(this.id, v);
  }

}

// Each transform property maps to a read and write pair backing both a prototype
// accessor for direct writes and a registered adapter property the engine uses.
const TRANSFORM_PROPS = {
  x: [getX, setX], y: [getY, setY], z: [getZ, setZ],
  rotateX: [getRotateX, setRotateX], rotateY: [getRotateY, setRotateY], rotateZ: [getRotateZ, setRotateZ],
  scaleX: [getScaleX, setScaleX], scaleY: [getScaleY, setScaleY], scaleZ: [getScaleZ, setScaleZ], scale: [getScale, setScale],
  skewX: [getSkewX, setSkewX], skewY: [getSkewY, setSkewY], skewZ: [getSkewZ, setSkewZ],
  transformOriginX: [getOriginX, setOriginX], transformOriginY: [getOriginY, setOriginY], transformOriginZ: [getOriginZ, setOriginZ],
};

const instanceAdapter = adapter.threeAdapter.registerTargetAdapter((t) => t instanceof Instance);

for (const name in TRANSFORM_PROPS) {
  const [read, write] = TRANSFORM_PROPS[name];
  Object.defineProperty(Instance.prototype, name, {
    configurable: true,
    get() { return read(this); },
    set(v) { write(this, v); },
  });
  instanceAdapter.registerProperty(name, read, write);
}

instanceAdapter.registerProperty('color',
  (t) => helpers.readColorHex(t._ensureColor()),
  (t, _, tw) => {
    if (!t._binding.hasSetColor) return;
    const c = t._ensureColor();
    const ns = tw._numbers;
    c.setRGB(ns[0] * helpers.COLOR_NORM, ns[1] * helpers.COLOR_NORM, ns[2] * helpers.COLOR_NORM, three.SRGBColorSpace);
    const p = /** @type {any} */(t.parent);
    p.setColorAt(t.id, c);
    if (p.instanceColor) p.instanceColor.needsUpdate = true;
  },
);
// Shorthand 3-token string x y z routed via the engine COMPLEX path.
// The setter reads tween _numbers for the per-frame lerped triplet.
instanceAdapter.registerProperty('transformOrigin',
  (t) => { enterComposed(t); const b = t._binding; const o = b.origin, b3 = t._base3; return o ? `${o[b3]} ${o[b3 + 1]} ${o[b3 + 2]}` : '0 0 0'; },
  (t, _, tw) => {
    enterComposed(t);
    const b = t._binding;
    enableSkew(b);
    const ns = tw._numbers, b3 = t._base3;
    b.origin[b3] = ns[0];
    b.origin[b3 + 1] = ns[1];
    b.origin[b3 + 2] = ns[2];
    markDirty(t, DIRTY_SKEW);
  },
);

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
  if (mesh instanceof three.BatchedMesh) {
    return refreshBatched(binding);
  }
  return refreshInstanced(binding);
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

exports.commitChanges = commitChanges;
exports.getInstances = getInstances;

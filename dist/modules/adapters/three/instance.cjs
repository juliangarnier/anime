/**
 * Anime.js - adapters - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var three = require('three');
var number = require('../../utils/number.cjs');
var adapter = require('./adapter.cjs');
var helpers = require('./helpers.cjs');

/** @import { Object3D, InstancedMesh, BatchedMesh } from 'three' */

/** @typedef {InstancedMesh | BatchedMesh} InstanceParent */
/** @typedef {Instance & Record<keyof typeof TRANSFORM_PROPS, number>} InstanceTarget */

/**
 * @typedef {Object} BatchedMeshInternals
 * @property {{ active: Boolean }[]} [_instanceInfo]
 */

const DIRTY_POS = 1;
const DIRTY_ROT = 2;
const DIRTY_SCALE = 4;
const DIRTY_SKEW = 8;

// Translation occupies elements 12, 13, 14 of every 16 float column major matrix.
const M_X = 12;
const M_Y = 13;
const M_Z = 14;

// Reused scratch for compose and decompose, never held across a call.
// One shared set lets flush allocate nothing per frame.
const scratchMatrix = new three.Matrix4();
const scratchPosition = new three.Vector3();
const scratchEuler = new three.Euler(0, 0, 0, 'XYZ');
const scratchQuat = new three.Quaternion();
const scratchScale = new three.Vector3();

/** @type {WeakMap<InstanceParent, InstanceBinding>} */
const bindings = new WeakMap();

// Promote to composed mode, seeding position, rotation, and scale from the current
// matrix so applied translation and scale survive the switch.
const promoteToComposed = (t) => {
  const b = t._binding;
  if (!b.pos) b.allocateComposed();
  const m = scratchMatrix;
  if (t._array) m.fromArray(t._array, t._base);
  else t.parent.getMatrixAt(t.id, m);
  if (m.elements[15] === 0) m.identity();
  m.decompose(scratchPosition, scratchQuat, scratchScale);
  scratchEuler.setFromQuaternion(scratchQuat, 'XYZ');
  const b3 = t._base3;
  const pos = b.pos;
  const rot = b.rot;
  const scl = b.scl;
  pos[b3] = scratchPosition.x;
  pos[b3 + 1] = scratchPosition.y;
  pos[b3 + 2] = scratchPosition.z;
  rot[b3] = scratchEuler.x;
  rot[b3 + 1] = scratchEuler.y;
  rot[b3 + 2] = scratchEuler.z;
  scl[b3] = scratchScale.x;
  scl[b3 + 1] = scratchScale.y;
  scl[b3 + 2] = scratchScale.z;
  t._composed = true;
};

// Flag the binding as skewed and allocate the skew and origin rows on first use.
// Until then flush keeps its translation only path, and a mesh without skew allocates no rows.
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
  scratchEulerOf(t);
  return scratchScale;
};

// Share each transform read and write between the prototype accessor and the adapter setter,
// so the engine skips a keyed store per frame.
const getX = (t) => t._composed ? t._binding.pos[t._base3] : t._array[t._base + M_X];
const getY = (t) => t._composed ? t._binding.pos[t._base3 + 1] : t._array[t._base + M_Y];
const getZ = (t) => t._composed ? t._binding.pos[t._base3 + 2] : t._array[t._base + M_Z];

const getRotateX = (t) => number.radToDeg(t._composed ? t._binding.rot[t._base3] : scratchEulerOf(t).x);
const getRotateY = (t) => number.radToDeg(t._composed ? t._binding.rot[t._base3 + 1] : scratchEulerOf(t).y);
const getRotateZ = (t) => number.radToDeg(t._composed ? t._binding.rot[t._base3 + 2] : scratchEulerOf(t).z);

const getScaleX = (t) => t._composed ? t._binding.scl[t._base3] : scratchScaleOf(t).x;
const getScaleY = (t) => t._composed ? t._binding.scl[t._base3 + 1] : scratchScaleOf(t).y;
const getScaleZ = (t) => t._composed ? t._binding.scl[t._base3 + 2] : scratchScaleOf(t).z;
const getScale = (t) => t._composed ? t._binding.scl[t._base3] : scratchScaleOf(t).x;

// Rows a makeSetter closure writes, scale writes all three axes.
const ROW_POS = 0;
const ROW_ROT = 1;
const ROW_SCALE_AXIS = 2;
const ROW_SCALE = 3;

// Build position, rotation, and scale setters from one closure so render inlines its setter call,
// distinct functions make that call megamorphic and box every value every frame.
const makeSetter = (row, axis) => (t, v) => {
  const b = t._binding;
  if (!t._composed) {
    // Write translation straight into the matrix buffer, so position only animations skip
    // the composed rows and the compose in flush.
    if (row === ROW_POS) {
      t._array[t._base + M_X + axis] = v;
      b.touched = 1;
      return;
    }
    promoteToComposed(t);
  }
  const id = t.id;
  const i = t._base3 + axis;
  if (row === ROW_POS) {
    b.pos[i] = v;
    b.dirty[id] |= DIRTY_POS;
  } else if (row === ROW_ROT) {
    b.rot[i] = number.degToRad(v);
    b.dirty[id] |= DIRTY_ROT;
  } else if (row === ROW_SCALE_AXIS) {
    b.scl[i] = v;
    b.dirty[id] |= DIRTY_SCALE;
  } else {
    const scl = b.scl;
    scl[i] = v;
    scl[i + 1] = v;
    scl[i + 2] = v;
    b.dirty[id] |= DIRTY_SCALE;
  }
  b.hasDirty = 1;
};

// Keep skew and origin setters separate, inlining their enableSkew path slows every render write.
const getSkewX = (t) => t._composed && t._binding.skew ? t._binding.skew[t._base3] : 0;
const setSkewX = (t, v) => {
  if (!t._composed) promoteToComposed(t);
  const b = t._binding;
  enableSkew(b);
  b.skew[t._base3] = v;
  b.dirty[t.id] |= DIRTY_SKEW;
  b.hasDirty = 1;
};
const getSkewY = (t) => t._composed && t._binding.skew ? t._binding.skew[t._base3 + 1] : 0;
const setSkewY = (t, v) => {
  if (!t._composed) promoteToComposed(t);
  const b = t._binding;
  enableSkew(b);
  b.skew[t._base3 + 1] = v;
  b.dirty[t.id] |= DIRTY_SKEW;
  b.hasDirty = 1;
};
const getSkewZ = (t) => t._composed && t._binding.skew ? t._binding.skew[t._base3 + 2] : 0;
const setSkewZ = (t, v) => {
  if (!t._composed) promoteToComposed(t);
  const b = t._binding;
  enableSkew(b);
  b.skew[t._base3 + 2] = v;
  b.dirty[t.id] |= DIRTY_SKEW;
  b.hasDirty = 1;
};

const getOriginX = (t) => t._composed && t._binding.origin ? t._binding.origin[t._base3] : 0;
const setOriginX = (t, v) => {
  if (!t._composed) promoteToComposed(t);
  const b = t._binding;
  enableSkew(b);
  b.origin[t._base3] = v;
  b.dirty[t.id] |= DIRTY_SKEW;
  b.hasDirty = 1;
};
const getOriginY = (t) => t._composed && t._binding.origin ? t._binding.origin[t._base3 + 1] : 0;
const setOriginY = (t, v) => {
  if (!t._composed) promoteToComposed(t);
  const b = t._binding;
  enableSkew(b);
  b.origin[t._base3 + 1] = v;
  b.dirty[t.id] |= DIRTY_SKEW;
  b.hasDirty = 1;
};
const getOriginZ = (t) => t._composed && t._binding.origin ? t._binding.origin[t._base3 + 2] : 0;
const setOriginZ = (t, v) => {
  if (!t._composed) promoteToComposed(t);
  const b = t._binding;
  enableSkew(b);
  b.origin[t._base3 + 2] = v;
  b.dirty[t.id] |= DIRTY_SKEW;
  b.hasDirty = 1;
};

/**
 * Per mesh state of the instances of an InstancedMesh or BatchedMesh.
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
    // Composed transform rows, allocated on the first rotation, scale, or skew write.
    // An InstancedMesh that animates only position never allocates them.
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
    // Dirty flags per instance, indexed by id, so an animation that still holds an instance
    // dropped by a refresh keeps its row composed.
    /** @type {Uint8Array | null} */
    this.dirty = null;
    this.hasSkew = 0;
    // Setters raise this so flush scans the dirty rows only after a composed write.
    this.hasDirty = 0;
    // Shared mesh capability flags kept here so each Instance object stays small.
    this.hasSetColor = 'setColorAt' in mesh;
    this.hasSetVisible = 'setVisibleAt' in mesh;
    this.hasGetVisible = 'getVisibleAt' in mesh;
    /** @type {Object3D['onBeforeRender'] | null} */
    this.userOnBeforeRender = mesh.onBeforeRender || null;
    const chainedHandler = (renderer, scene, camera, geometry, material, group) => {
      this.flush();
      const userHandler = this.userOnBeforeRender;
      if (userHandler) userHandler.call(mesh, renderer, scene, camera, geometry, material, group);
    };
    // Chain flush before the user handler, so mesh.onBeforeRender reads back the chained handler.
    Object.defineProperty(mesh, 'onBeforeRender', {
      configurable: true,
      get: () => chainedHandler,
      set: (fn) => { this.userOnBeforeRender = fn; },
    });
  }

  allocateComposed() {
    const n = this.capacity * 3;
    this.pos = new Float64Array(n);
    this.rot = new Float64Array(n);
    this.scl = new Float64Array(n);
    this.dirty = new Uint8Array(this.capacity);
  }

  // Recompose each dirty row once per render, so an instance that animates several
  // properties pays one compose instead of one per write.
  flush() {
    if (this.hasDirty) {
      const pos = this.pos;
      const rot = this.rot;
      const scl = this.scl;
      const dirty = this.dirty;
      const instances = this.instances;
      const out = this.array;
      const mesh = this.mesh;
      const hasSkew = this.hasSkew;
      const skew = this.skew;
      const origin = this.origin;
      const sp = scratchPosition;
      const se = scratchEuler;
      const sq = scratchQuat;
      const ss = scratchScale;
      const sm = scratchMatrix;
      for (let id = 0, b3 = 0, l = dirty.length; id < l; id++, b3 += 3) {
        const flags = dirty[id];
        if (flags === 0) continue;
        dirty[id] = 0;
        // A deleted BatchedMesh slot has no matrix to write.
        if (instances[id] === null) continue;
        // Overwrite the translation columns in place when only position changed, so flush skips the
        // setFromEuler and compose that the unchanged rotation and scale rows would otherwise redo.
        if (flags === DIRTY_POS && out && !hasSkew) {
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
      }
      this.hasDirty = 0;
      this.touched = 1;
    }
    if (this.touched) {
      if (this.hasInstanceMatrix) /** @type {InstancedMesh} */(this.mesh).instanceMatrix.needsUpdate = true;
      this.touched = 0;
    }
  }

}

/**
 * Per instance adapter for an InstancedMesh or BatchedMesh, returned by getInstances. Exposes the same flat properties as the mesh adapter for one instance id. opacity writes the shared material of the parent, visible is a no-op on InstancedMesh, use scale 0 to hide an instance.
 */
class Instance {

  /**
   * @param {InstanceBinding} binding
   * @param {number} id
   */
  constructor(binding, id) {
    // Cache the buffer and precompute the offsets, so getters and setters reach the matrix
    // in one load and index it without a multiply by the id.
    this._array = binding.array;
    this._base = id * 16;
    this._base3 = id * 3;
    this._composed = false;
    this._binding = binding;
    // Declare _color null for a fixed shape and create it on first color use, so getInstances
    // skips a Color allocation and a getColorAt read per instance.
    /** @type {Color | null} */
    this._color = null;
    this.parent = binding.mesh;
    this.id = id;
    this.isAnimejsInstanceProxy = true;

    if (this._array) {
      // Seed empty slots with identity so a bare translation write yields a valid matrix.
      const e = this._array;
      const b = this._base;
      if (e[b + 15] === 0) {
        e[b] = 1;
        e[b + 5] = 1;
        e[b + 10] = 1;
        e[b + 15] = 1;
      }
    } else {
      promoteToComposed(this);
    }
  }

  _ensureColor() {
    let c = this._color;
    if (c) return c;
    c = this._color = new three.Color();
    const p = this.parent;
    if ('getColorAt' in p && 'instanceColor' in p && p.instanceColor) p.getColorAt(this.id, c);
    return c;
  }

  get opacity() {
    return helpers.readScalar(this.parent.material, 'opacity', helpers.PATH_DIRECT, 1);
  }
  /** @param {number} v */
  set opacity(v) {
    helpers.writeScalar(this.parent.material, 'opacity', v, helpers.PATH_DIRECT);
  }

  get visible() {
    return this._binding.hasGetVisible ? /** @type {BatchedMesh} */(this.parent).getVisibleAt(this.id) : true;
  }
  /** @param {boolean} v */
  set visible(v) {
    if (this._binding.hasSetVisible) /** @type {BatchedMesh} */(this.parent).setVisibleAt(this.id, v);
  }

}

// Each transform property maps to a read and write pair backing both a prototype
// accessor for direct writes and a registered adapter property the engine uses.
const TRANSFORM_PROPS = {
  x: [getX, makeSetter(ROW_POS, 0)], y: [getY, makeSetter(ROW_POS, 1)], z: [getZ, makeSetter(ROW_POS, 2)],
  rotateX: [getRotateX, makeSetter(ROW_ROT, 0)], rotateY: [getRotateY, makeSetter(ROW_ROT, 1)], rotateZ: [getRotateZ, makeSetter(ROW_ROT, 2)],
  scaleX: [getScaleX, makeSetter(ROW_SCALE_AXIS, 0)], scaleY: [getScaleY, makeSetter(ROW_SCALE_AXIS, 1)], scaleZ: [getScaleZ, makeSetter(ROW_SCALE_AXIS, 2)], scale: [getScale, makeSetter(ROW_SCALE, 0)],
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
    const p = t.parent;
    p.setColorAt(t.id, c);
    if (p.instanceColor) p.instanceColor.needsUpdate = true;
  },
);
// Expose transformOrigin as a space separated string so the engine lerps its three numbers.
instanceAdapter.registerProperty('transformOrigin',
  (t) => {
    if (!t._composed) promoteToComposed(t);
    const b = t._binding;
    const o = b.origin;
    const b3 = t._base3;
    return o ? `${o[b3]} ${o[b3 + 1]} ${o[b3 + 2]}` : '0 0 0';
  },
  (t, _, tw) => {
    if (!t._composed) promoteToComposed(t);
    const b = t._binding;
    enableSkew(b);
    const ns = tw._numbers;
    const b3 = t._base3;
    b.origin[b3] = ns[0];
    b.origin[b3 + 1] = ns[1];
    b.origin[b3 + 2] = ns[2];
    b.dirty[t.id] |= DIRTY_SKEW;
    b.hasDirty = 1;
  },
);

/**
 * @param {InstanceBinding} binding
 * @return {(Instance | null)[]}
 */
function refreshInstanced(binding) {
  const mesh = /** @type {InstancedMesh} */(binding.mesh);
  const count = mesh.count;
  const instances = binding.instances;
  if (instances.length < count) {
    for (let i = instances.length; i < count; i++) instances.push(new Instance(binding, i));
  } else if (instances.length > count) {
    instances.length = count;
  }
  return instances;
}

/**
 * @param {InstanceBinding} binding
 * @return {(Instance | null)[]}
 */
function refreshBatched(binding) {
  const mesh = /** @type {BatchedMesh} */(binding.mesh);
  const instances = binding.instances;
  // Read the three internal _instanceInfo so a slot deleted by deleteInstance becomes null.
  // Walk every slot instead of instanceCount so live ids past a deleted slot stay reachable.
  const instanceInfo = /** @type {BatchedMeshInternals} */(mesh)._instanceInfo ?? [];
  const len = instanceInfo.length;
  instances.length = len;
  for (let i = 0; i < len; i++) {
    const info = instanceInfo[i];
    if (info && info.active === false) {
      instances[i] = null;
    } else if (!instances[i]) {
      instances[i] = new Instance(binding, i);
    }
  }
  return instances;
}

/**
 * Returns the per instance adapters of mesh indexed by id, a deleted BatchedMesh slot is null. Pass the array, a slice or one element to animate(). The same array is updated in place after count, addInstance and deleteInstance changes.
 *
 * animate(getInstances(mesh), { x: 100, delay: stagger(5) });
 * animate(getInstances(mesh)[42], { scale: 2 });
 *
 * @param {InstanceParent} mesh
 * @return {(InstanceTarget | null)[]}
 */
function getInstances(mesh) {
  let binding = bindings.get(mesh);
  if (!binding) {
    binding = new InstanceBinding(mesh);
    bindings.set(mesh, binding);
  }
  return /** @type {(InstanceTarget | null)[]} */(binding.hasInstanceMatrix ? refreshInstanced(binding) : refreshBatched(binding));
}

/**
 * Flushes the pending instance writes of mesh. Call it to read mesh.instanceMatrix between an animation tick and the next render.
 *
 * @param {InstanceParent} mesh
 */
function commitChanges(mesh) {
  const binding = bindings.get(mesh);
  if (binding) binding.flush();
}

exports.commitChanges = commitChanges;
exports.getInstances = getInstances;

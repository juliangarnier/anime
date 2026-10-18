/**
 * Flushes pending matrix writes for every dirty instance of `mesh`.
 * Called automatically before each render. Call it yourself if you read
 * `mesh.instanceMatrix` between an animation tick and the next render.
 *
 * @param {InstanceParent} mesh
 */
export function commitChanges(mesh: InstanceParent): void;
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
export function getInstances(mesh: InstanceParent): (Instance | null)[];
export type InstanceParent = InstancedMesh | BatchedMesh;
/**
 * Per-instance adapter for `InstancedMesh` or `BatchedMesh`. Returned by `getInstances(mesh)`. Exposes the same flat properties as the mesh adapter, applied to a single instance id. Writes are coalesced and flushed before each render via `onBeforeRender`; call `commitChanges(mesh)` if you need to read `mesh.instanceMatrix` between a tick and a render.
 *
 * Caveats:
 * - `opacity` writes the parent's shared material, every instance is affected.
 * - `visible` is backed by `BatchedMesh.setVisibleAt`. On `InstancedMesh` it is a no-op, use `scale = 0` to hide an instance.
 */
declare class Instance {
    /**
     * @param {InstanceBinding} binding
     * @param {number} id
     */
    constructor(binding: InstanceBinding, id: number);
    isAnimejsInstanceProxy: boolean;
    parent: InstanceParent;
    id: number;
    _position: Vector3;
    _rotation: Euler;
    _scale: Vector3;
    _matrix: Matrix4;
    _quat: Quaternion;
    _color: Color;
    _dirty: number;
    _skewX: number;
    _skewY: number;
    _skewZ: number;
    _originX: number;
    _originY: number;
    _originZ: number;
    _hasSkewOrigin: boolean;
    /** @type {Instance[]} */
    _dirtyList: Instance[];
    _hasSetColor: boolean;
    _hasSetVisible: boolean;
    _hasGetVisible: boolean;
    /**
     * @param {number} flag
     */
    _markDirty(flag: number): void;
    _flush(): void;
    set x(v: number);
    get x(): number;
    set y(v: number);
    get y(): number;
    set z(v: number);
    get z(): number;
    set rotateX(v: number);
    get rotateX(): number;
    set rotateY(v: number);
    get rotateY(): number;
    set rotateZ(v: number);
    get rotateZ(): number;
    set scaleX(v: number);
    get scaleX(): number;
    set scaleY(v: number);
    get scaleY(): number;
    set scaleZ(v: number);
    get scaleZ(): number;
    set scale(v: number);
    get scale(): number;
    set skewX(v: number);
    get skewX(): number;
    set skewY(v: number);
    get skewY(): number;
    set skewZ(v: number);
    get skewZ(): number;
    set transformOriginX(v: number);
    get transformOriginX(): number;
    set transformOriginY(v: number);
    get transformOriginY(): number;
    set transformOriginZ(v: number);
    get transformOriginZ(): number;
    /** @param {number} v */
    set opacity(v: number);
    get opacity(): number;
    /** @param {boolean} v */
    set visible(v: boolean);
    get visible(): boolean;
}
import type { InstancedMesh } from 'three';
import { BatchedMesh } from 'three';
import { Vector3 } from 'three';
import { Euler } from 'three';
import { Matrix4 } from 'three';
import { Quaternion } from 'three';
import { Color } from 'three';
/**
 * Per-mesh state for `InstancedMesh` / `BatchedMesh` animations. Holds the instance array, the dirty queue, and the chained `onBeforeRender` closure.
 */
declare class InstanceBinding {
    /** @param {InstanceParent} mesh */
    constructor(mesh: InstanceParent);
    mesh: InstanceParent;
    hasInstanceMatrix: boolean;
    /** @type {(Instance | null)[]} */
    instances: (Instance | null)[];
    /** @type {Instance[]} */
    dirtyList: Instance[];
    /** @type {Object3D['onBeforeRender'] | null} */
    userOnBeforeRender: Object3D["onBeforeRender"] | null;
    chainedHandler: (renderer: import("three").WebGLRenderer, scene: import("three").Scene, camera: import("three").Camera, geometry: import("three").BufferGeometry, material: import("three").Material, group: import("three").Group) => void;
    flush(): void;
}
import type { Object3D } from 'three';
export {};

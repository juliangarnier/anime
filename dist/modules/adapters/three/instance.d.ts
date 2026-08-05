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
/**
 * Flushes pending matrix writes for every dirty instance of `mesh`.
 * Called automatically before each render. Call it yourself if you read
 * `mesh.instanceMatrix` between an animation tick and the next render.
 *
 * @param {InstanceParent} mesh
 */
export function commitChanges(mesh: InstanceParent): void;
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
    _array: Float32Array<ArrayBufferLike>;
    _base: number;
    _base3: number;
    _composed: boolean;
    _binding: InstanceBinding;
    /** @type {Color | null} */
    _color: Color | null;
    parent: InstanceParent;
    id: number;
    isAnimejsInstanceProxy: boolean;
    _ensureColor(): Color;
    /** @param {number} v */
    set opacity(v: number);
    get opacity(): number;
    /** @param {boolean} v */
    set visible(v: boolean);
    get visible(): boolean;
}
import type { InstancedMesh } from 'three';
import { BatchedMesh } from 'three';
/**
 * Per-mesh state for an InstancedMesh or BatchedMesh. Position-only instances write
 * the matrix buffer directly; instances that animate rotation, scale, or skew store
 * their transform in the flat pos / rot / scl rows and recompose during flush.
 */
declare class InstanceBinding {
    /** @param {InstanceParent} mesh */
    constructor(mesh: InstanceParent);
    mesh: InstanceParent;
    hasInstanceMatrix: boolean;
    /** @type {Float32Array | null} */
    array: Float32Array | null;
    capacity: number;
    /** @type {(Instance | null)[]} */
    instances: (Instance | null)[];
    touched: number;
    /** @type {Float64Array | null} */
    pos: Float64Array | null;
    /** @type {Float64Array | null} */
    rot: Float64Array | null;
    /** @type {Float64Array | null} */
    scl: Float64Array | null;
    /** @type {Float64Array | null} */
    skew: Float64Array | null;
    /** @type {Float64Array | null} */
    origin: Float64Array | null;
    hasSkew: number;
    /** @type {Uint8Array | null} */
    dirty: Uint8Array | null;
    /** @type {Int32Array | null} */
    dirtyIds: Int32Array | null;
    dirtyCount: number;
    hasSetColor: boolean;
    hasSetVisible: boolean;
    hasGetVisible: boolean;
    /** @type {Object3D['onBeforeRender'] | null} */
    userOnBeforeRender: Object3D["onBeforeRender"] | null;
    chainedHandler: (renderer: import("three").WebGLRenderer, scene: import("three").Scene, camera: import("three").Camera, geometry: import("three").BufferGeometry, material: import("three").Material, group: import("three").Group) => void;
    allocateComposed(): void;
    flush(): void;
}
import { Color } from 'three';
import type { Object3D } from 'three';
export {};

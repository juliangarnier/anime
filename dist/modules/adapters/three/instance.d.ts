/**
 * Returns the per instance adapters of mesh indexed by id, a deleted BatchedMesh slot is null. Pass the array, a slice or one element to animate(). The same array is updated in place after count, addInstance and deleteInstance changes.
 *
 * animate(getInstances(mesh), { x: 100, delay: stagger(5) });
 * animate(getInstances(mesh)[42], { scale: 2 });
 *
 * @param {InstanceParent} mesh
 * @return {(InstanceTarget | null)[]}
 */
export function getInstances(mesh: InstanceParent): (InstanceTarget | null)[];
/**
 * Flushes the pending instance writes of mesh. Call it to read mesh.instanceMatrix between an animation tick and the next render.
 *
 * @param {InstanceParent} mesh
 */
export function commitChanges(mesh: InstanceParent): void;
export type InstanceParent = InstancedMesh | BatchedMesh;
export type InstanceTarget = Instance & Record<keyof typeof TRANSFORM_PROPS, number>;
export type BatchedMeshInternals = {
    _instanceInfo?: {
        active: boolean;
    }[];
};
import type { InstancedMesh } from 'three';
import type { BatchedMesh } from 'three';
/**
 * Per instance adapter for an InstancedMesh or BatchedMesh, returned by getInstances. Exposes the same flat properties as the mesh adapter for one instance id. opacity writes the shared material of the parent, visible is a no-op on InstancedMesh, use scale 0 to hide an instance.
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
declare namespace TRANSFORM_PROPS {
    let x: ((t: any, v: any) => void)[];
    let y: ((t: any, v: any) => void)[];
    let z: ((t: any, v: any) => void)[];
    let rotateX: ((t: any, v: any) => void)[];
    let rotateY: ((t: any, v: any) => void)[];
    let rotateZ: ((t: any, v: any) => void)[];
    let scaleX: ((t: any, v: any) => void)[];
    let scaleY: ((t: any, v: any) => void)[];
    let scaleZ: ((t: any, v: any) => void)[];
    let scale: ((t: any, v: any) => void)[];
    let skewX: ((t: any, v: any) => void)[];
    let skewY: ((t: any, v: any) => void)[];
    let skewZ: ((t: any, v: any) => void)[];
    let transformOriginX: ((t: any, v: any) => void)[];
    let transformOriginY: ((t: any, v: any) => void)[];
    let transformOriginZ: ((t: any, v: any) => void)[];
}
/**
 * Per mesh state of the instances of an InstancedMesh or BatchedMesh.
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
    /** @type {Uint8Array | null} */
    dirty: Uint8Array | null;
    hasSkew: number;
    hasDirty: number;
    hasSetColor: boolean;
    hasSetVisible: boolean;
    hasGetVisible: boolean;
    /** @type {Object3D['onBeforeRender'] | null} */
    userOnBeforeRender: Object3D["onBeforeRender"] | null;
    allocateComposed(): void;
    flush(): void;
}
import { Color } from 'three';
import type { Object3D } from 'three';
export {};

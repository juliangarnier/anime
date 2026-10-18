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
export function applySkewOrigin(e: number[], skewX: number, skewY: number, skewZ: number, ox: number, oy: number, oz: number): void;
/**
 * @param {any} c
 * @return {String | null}
 */
export function readColorHex(c: any): string | null;
/**
 * Returns `true` when `v` is a `Vector2/3/4` instance whose dimension covers `axis`. `Quaternion` and plain `{x,y,z,w}`-shaped objects are intentionally rejected.
 *
 * @param {any} v
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @return {boolean}
 */
export function isVectorWith(v: any, axis: "x" | "y" | "z" | "w"): boolean;
/**
 * Classifies `target[name]` and returns a descriptor `{ kind, path, base, axis }` (or `null`). Used by the resolver entries in `resolvers.js` and by the `Object3D` adapter to build the matching access pattern for any three.js target (Object3D, Material, Texture, Fog, UniformNode).
 *
 * @param {any} target
 * @param {string} name
 * @return {{ kind: number, path: number, base: string, axis: 'x' | 'y' | 'z' | 'w' } | null}
 */
export function classifyTargetProp(target: any, name: string): {
    kind: number;
    path: number;
    base: string;
    axis: "x" | "y" | "z" | "w";
} | null;
/**
 * @param {any} target
 * @param {string} name
 * @param {number} path
 * @param {number} [defaultValue]
 * @return {number}
 */
export function readScalar(target: any, name: string, path: number, defaultValue?: number): number;
/**
 * @param {any} target
 * @param {string} name
 * @param {number} v
 * @param {number} path
 */
export function writeScalar(target: any, name: string, v: number, path: number): void;
/**
 * @param {any} target
 * @param {string} name
 * @param {number} path
 * @return {String | null}
 */
export function readColorAt(target: any, name: string, path: number): string | null;
/**
 * @param {any} target
 * @param {string} name
 * @param {Array.<Number>} ns
 * @param {number} path
 */
export function writeColorAt(target: any, name: string, ns: Array<number>, path: number): void;
/**
 * @param {any} target
 * @param {string} base
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @param {number} path
 * @return {number}
 */
export function readVectorAt(target: any, base: string, axis: "x" | "y" | "z" | "w", path: number): number;
/**
 * @param {any} target
 * @param {string} base
 * @param {'x' | 'y' | 'z' | 'w'} axis
 * @param {number} v
 * @param {number} path
 */
export function writeVectorAt(target: any, base: string, axis: "x" | "y" | "z" | "w", v: number, path: number): void;
export const COLOR_NORM: number;
export const AXIS_MAP: Record<string, "x" | "y" | "z" | "w">;
export const PATH_DIRECT: 0;
export const KIND_COLOR: 0;
export const KIND_SCALAR: 1;
export const KIND_VECTOR: 2;

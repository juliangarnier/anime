/**
 * Anime.js - adapters - ESM
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { SRGBColorSpace } from 'three';
import { threeAdapter } from './adapter.js';
import { readColorHex, COLOR_NORM, isVectorWith } from './helpers.js';

/**
 * Bare `UniformNode` adapter. Auto-detects `UniformNode` instances and exposes their `.value` for animation. Scalars and booleans animate via `value`, `Color` uniforms via `color`, and `Vector2/3/4` uniforms via `x` / `y` / `z` / `w` axes.
 *
 *   import 'animejs/bindings/three';
 *   import { uniform } from 'three/tsl';
 *   animate(uniform(0),              { value: 1 });
 *   animate(uniform(new Color()),    { color: '#0f0' });
 *   animate(uniform(new Vector3()),  { x: 1, y: 0.5 });
 *
 * `UniformNode` slots assigned to `NodeMaterial` (`material.colorNode`, `material.offsetNode`, ...) are auto-detected by the shared resolvers in `resolvers.js`. Non-uniform nodes (`mix`, `add`, computed expressions), `Matrix3/4` and `Texture` valued uniforms, and `UniformArrayNode` / `BufferNode` are out of scope and fall through to the engine's direct property path.
 */


const uniformNode = threeAdapter.registerTargetAdapter((t) => !!(t && t.isUniformNode));

// Scalar and bool uniforms animate via the engine OBJECT fallthrough on value, no adapter prop needed since the engine writes uniform value natively.
uniformNode.registerProperty('color',
  (t) => readColorHex(t.value),
  (t, _, tw) => {
    const ns = tw._numbers;
    t.value.setRGB(ns[0] * COLOR_NORM, ns[1] * COLOR_NORM, ns[2] * COLOR_NORM, SRGBColorSpace);
  },
  (t) => !!(t.value && t.value.isColor),
);
uniformNode.registerProperty('x', (t) => t.value.x, (t, v) => { t.value.x = v; }, (t) => isVectorWith(t.value, 'x'));
uniformNode.registerProperty('y', (t) => t.value.y, (t, v) => { t.value.y = v; }, (t) => isVectorWith(t.value, 'y'));
uniformNode.registerProperty('z', (t) => t.value.z, (t, v) => { t.value.z = v; }, (t) => isVectorWith(t.value, 'z'));
uniformNode.registerProperty('w', (t) => t.value.w, (t, v) => { t.value.w = v; }, (t) => isVectorWith(t.value, 'w'));

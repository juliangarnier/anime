/**
 * anime.js / three.js bindings. Side-effect import: registers adapters so `animate()` and `utils.set()` accept raw three.js objects.
 *
 *   import 'animejs/adapters/three';
 *   import { animate } from 'animejs';
 *   animate(mesh,    { x: 100, rotateY: 360, opacity: 0.3, color: '#f0a' });
 *   animate(camera,  { fov: [50, 30], focalLength: 35 });
 *   animate(light,   { intensity: [0, 2], color: '#f0a' });
 *
 * Mapped properties:
 *   x / y / z, rotateX / Y / Z (degrees), scaleX / Y / Z, scale (uniform), opacity, color, visible
 *
 * Class-specific:
 *   groundColor       (HemisphereLight)
 *   volume            (Audio, PositionalAudio)
 *   refDistance / rolloffFactor / maxDistance (PositionalAudio)
 *   focalLength       (PerspectiveCamera)
 *   fov / aspect / near / far / zoom (PerspectiveCamera)
 *   left / right / top / bottom / near / far / zoom (OrthographicCamera)
 *
 * Unmapped names on a mesh are auto-detected against `target.material` at tween creation. Numeric, boolean, and `Color`-typed props on the material (e.g. `metalness`, `roughness`, `emissive`, `wireframe`) become animatable on the mesh directly without a static registration. Material instances can also be animated directly via the `Material` adapter. Use `getInstances(mesh)` for per-instance animation of `InstancedMesh` / `BatchedMesh`.
 *
 * TSL `NodeMaterial` slots assigned a `UniformNode` are auto-detected the same way. Number, boolean, `Color`, and `Vector2/3/4` uniforms become animatable on the mesh and on the material directly. Bare uniforms accept `value` (scalar / bool), `color`, and `x` / `y` / `z` / `w` axes.
 *
 *   const mat = new MeshStandardNodeMaterial();
 *   mat.colorNode = uniform(new Color('#f00'));
 *   mat.offsetNode = uniform(new Vector3());
 *   animate(mesh, { colorNode: '#0ff', offsetNodeY: 0.5 });
 *   animate(mat.colorNode, { color: '#0f0' });
 *   animate(uniform(0), { value: 1 });
 *
 * Caveats:
 * - Rotation assumes Euler order `'XYZ'`.
 * - `opacity` writes `material.opacity`. Set `material.transparent = true` on materials meant to fade. `opacity = 0` flips `visible = false`.
 * - `scaleX` / `Y` / `Z` / `scale` = 0 flips `visible = false`. Direct mutation of `mesh.scale.x` does not.
 * - Material-routed writes target `mesh.material` only (single material or array). Group / nested-mesh fades are not propagated, animate the materials directly or pass an array of meshes.
 * - Auto-detected names that also exist on the mesh itself (e.g. `mesh.foo = 1` and `mesh.material.foo = 2`) take the mesh value, leaving the material untouched.
 */

export { threeAdapter } from './adapter.js';

import './resolvers.js';
import './uniform.js';
import './object3d.js';
import './instance.js';

export { getInstances, commitChanges } from './instance.js';
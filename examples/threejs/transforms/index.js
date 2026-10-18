import {
  Scene, WebGLRenderer, PerspectiveCamera, GridHelper,
  Mesh, BoxGeometry, MeshStandardMaterial, InstancedMesh,
  AmbientLight, DirectionalLight,
} from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { animate, createTimer, utils } from '../../../dist/modules/index.js';

// Side-effect import: registers the Object3D / Material / Instance adapters so
// animate() / utils.set() accept raw three.js meshes and per-instance adapters.
import { getInstances } from '../../../dist/modules/adapters/three/index.js';

import { syncTweaks } from 'tweaks';
import { GUI } from 'tweaks/gui';

syncTweaks('localStorage');

// Scene + renderer. Colors come from the shared `examples/assets/css/styles.css` palette via `utils.set` and the engine's `var()` resolution path.

const scene = new Scene();
utils.set(scene, { background: 'var(--bg-1)' });

const camera = new PerspectiveCamera(45, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 7, 14);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(window.devicePixelRatio || 1);
document.body.appendChild(renderer.domElement);
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.enableDamping = true;
controls.update();

// Floor: 20x20 grid, 1 unit per square. Vertex colors are white so `material.color` acts as the effective color (it multiplies vertex colors in the shader).
// Offset by 0.5 in x and z so the grid lines align with the cube faces.
const grid = new GridHelper(20, 20, 0xffffff, 0xffffff);
grid.position.set(0.5, -0.5, 0.5);
scene.add(grid);
utils.set(grid, { color: 'var(--fg-4)' });

// Lights
scene.add(new AmbientLight(0xffffff, 0.5));
const dir = new DirectionalLight(0xffffff, 1.4);
dir.position.set(6, 12, 8);
scene.add(dir);

// Shared animation defaults
const D = { duration: 2000, loop: true, alternate: true, ease: 'inOutSine' };
const ROT_D = { duration: 3000, loop: true, ease: 'linear' };

const SHOWCASE_ANIM = {
  x: [0, -1, 1, 0],
  y: [3, 2, 4, 3],
  z: [0, -1, 1, 0],
  rotateX: [0, -180, 180, 0],
  rotateY: [0, -180, 180, 0],
  rotateZ: [0, -180, 180, 0],
  scaleX: [1, 2, -2, 1],
  scaleY: [1, 2, -2, 1],
  scaleZ: [1, 2, -2, 1],
  skewX: [0, -30, 30, 0],
  skewY: [0, -30, 30, 0],
  skewZ: [0, -30, 30, 0],
  transformOrigin: ['0 0 0', '-0.5 -0.5 -0.5', '0.5 0.5 0.5', '0 0 0'],
  color: ['var(--orange-1)', 'var(--red-1)', 'var(--lime-1)', 'var(--orange-1)'],
  duration: 4000,
  loop: true,
  ease: 'inOutSine',
};

// Cube specs: one entry per cube. Used identically by both modes; only the
// underlying target type (Mesh vs Instance) differs.
const cubeSpecs = [
  // Row 1 (z = -4): position x / y / z / all
  { pos: [-3, 0, -4], color: '--red-1', anim: { x: [-4, -2], ...D } },
  { pos: [-1, 0, -4], color: '--red-1', anim: { y: [0, 2], ...D } },
  { pos: [ 1, 0, -4], color: '--red-1', anim: { z: [-5, -3], ...D } },
  { pos: [ 3, 0, -4], color: '--red-1', anim: { x: [2, 4], y: [0, 2], z: [-5, -3], ...D } },

  // Row 2 (z = -2): rotateX / rotateY / rotateZ / all
  { pos: [-3, 0, -2], color: '--red-1', anim: { rotateX: 360, ...ROT_D } },
  { pos: [-1, 0, -2], color: '--red-1', anim: { rotateY: 360, ...ROT_D } },
  { pos: [ 1, 0, -2], color: '--red-1', anim: { rotateZ: 360, ...ROT_D } },
  { pos: [ 3, 0, -2], color: '--red-1', anim: { rotateX: 360, rotateY: 360, rotateZ: 360, ...ROT_D } },

  // Row 3 (z = 0): scaleX / scaleY / scaleZ / scale
  { pos: [-3, 0, 0], color: '--red-1', anim: { scaleX: [0.5, 1.5], ...D } },
  { pos: [-1, 0, 0], color: '--red-1', anim: { scaleY: [0.5, 1.5], ...D } },
  { pos: [ 1, 0, 0], color: '--red-1', anim: { scaleZ: [0.5, 1.5], ...D } },
  { pos: [ 3, 0, 0], color: '--red-1', anim: { scale:  [0.5, 1.5], ...D } },

  // Row 4 (z = 2): skewX / skewY / skewZ / all
  { pos: [-3, 0, 2], color: '--red-1', anim: { skewX: [-30, 30], ...D } },
  { pos: [-1, 0, 2], color: '--red-1', anim: { skewY: [-30, 30], ...D } },
  { pos: [ 1, 0, 2], color: '--red-1', anim: { skewZ: [-30, 30], ...D } },
  { pos: [ 3, 0, 2], color: '--red-1', anim: { skewX: [-30, 30], skewY: [30, -30], skewZ: [-30, 30], ...D } },

  // Row 5 (z = 4): transformOrigin in combination with scale
  { pos: [-3, 0, 4], color: '--red-1', staticOrigin: [-0.5, 0, 0], anim: { scaleX: [0.2, 1.2], ...D } },
  { pos: [-1, 0, 4], color: '--red-1', staticOrigin: [0, -0.5, 0], anim: { scaleY: [0.2, 1.2], ...D } },
  { pos: [ 1, 0, 4], color: '--red-1', staticOrigin: [0, 0, -0.5], anim: { scaleZ: [0.2, 1.2], ...D } },
  { pos: [ 3, 0, 4], color: '--red-1', staticScale: 0.5, anim: { transformOriginX: [-1, 1], ...D } },

  // Showcase (above the grid): combines every transform.
  { pos: [0, 3, 0], color: '--orange-1', anim: SHOWCASE_ANIM },
];

// Per-spec target setup. `target` is either a Mesh or an Instance; both expose
// the same flat properties through the adapter system.
const setupTarget = (target, spec) => {
  utils.set(target, {
    x: spec.pos[0],
    y: spec.pos[1],
    z: spec.pos[2],
    color: `var(${spec.color})`,
  });
  if (spec.staticOrigin) {
    utils.set(target, {
      transformOriginX: spec.staticOrigin[0],
      transformOriginY: spec.staticOrigin[1],
      transformOriginZ: spec.staticOrigin[2],
    });
  }
  if (spec.staticScale != null) {
    utils.set(target, { scale: spec.staticScale });
  }
};

// Per-mode scene state. Holds whatever was added to the scene + the live tween
// handles, so `tearDown()` can dispose / cancel cleanly between mode swaps.
const state = {
  added: /** @type {import('three').Object3D[]} */([]),
  geometries: /** @type {import('three').BufferGeometry[]} */([]),
  materials: /** @type {import('three').Material[]} */([]),
  animations: /** @type {Array<ReturnType<typeof animate>>} */([]),
};

const tearDown = () => {
  for (let i = 0; i < state.animations.length; i++) state.animations[i].cancel();
  state.animations.length = 0;
  for (let i = 0; i < state.added.length; i++) scene.remove(state.added[i]);
  state.added.length = 0;
  for (let i = 0; i < state.geometries.length; i++) state.geometries[i].dispose();
  state.geometries.length = 0;
  for (let i = 0; i < state.materials.length; i++) state.materials[i].dispose();
  state.materials.length = 0;
};

const buildMeshMode = () => {
  for (let i = 0; i < cubeSpecs.length; i++) {
    const spec = cubeSpecs[i];
    const geo = new BoxGeometry(1, 1, 1);
    // Fresh material per mesh so `utils.set(cube, { color })` writes don't collide.
    const mat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.05 });
    const cube = new Mesh(geo, mat);
    scene.add(cube);
    state.added.push(cube);
    state.geometries.push(geo);
    state.materials.push(mat);
    setupTarget(cube, spec);
    state.animations.push(animate(cube, spec.anim));
  }
};

const buildInstancedMode = () => {
  // Single InstancedMesh hosts every cube. Geometry and material shared; per-instance
  // colors flow through `instanceColor` (uploaded via setColorAt by the Instance adapter).
  const geo = new BoxGeometry(1, 1, 1);
  const mat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.5, metalness: 0.05 });
  const im = new InstancedMesh(geo, mat, cubeSpecs.length);
  scene.add(im);
  state.added.push(im);
  state.geometries.push(geo);
  state.materials.push(mat);
  const instances = getInstances(im);
  for (let i = 0; i < cubeSpecs.length; i++) {
    setupTarget(instances[i], cubeSpecs[i]);
    state.animations.push(animate(instances[i], cubeSpecs[i].anim));
  }
};

const setMode = (mode) => {
  tearDown();
  if (mode === 'InstancedMesh') buildInstancedMode();
  else buildMeshMode();
};

let activeMode = 'Mesh';
setMode(activeMode);

GUI.render(() => {
  if (!GUI.BeginPanel('Transforms')) return;
  const modeRef = GUI.Ref('@mode', 'Mesh');
  const next = modeRef();
  GUI.BeginToggleGroup('mode::.width_full', modeRef);
    GUI.ToggleButtonInput('Mesh');
    GUI.ToggleButtonInput('InstancedMesh');
  GUI.EndToggleGroup();
  if (next !== activeMode) {
    activeMode = next;
    setMode(activeMode);
  }
  GUI.EndPanel();
});

createTimer({
  priority: 0,
  onUpdate: () => {
    controls.update();
    renderer.render(scene, camera);
  },
});

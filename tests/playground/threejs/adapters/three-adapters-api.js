/**
 * Comparison: animating a three.js mesh with vs. without the
 * `animejs/three` adapter.
 *
 * Two cubes run identical animations side by side. Read the two code
 * blocks below for the syntactic comparison.
 */

import {
  Scene, WebGLRenderer,
  BoxGeometry, MeshStandardMaterial, Mesh,
  PerspectiveCamera, AmbientLight, DirectionalLight,
} from 'three';

import { animate, createTimeline, createTimer, utils } from '../../../../dist/modules/index.js';

// Side-effect import: registers the three.js adapter so animate() and
// createTimeline() recognize raw three.js objects with flat properties.
import '../../../../dist/modules/adapters/three/index.js';

// scene setup

const scene = new Scene();
const camera = new PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild(renderer.domElement);
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

scene.add(new AmbientLight(0xffffff, 0.4));
const dir = new DirectionalLight(0xffffff, 1);
dir.position.set(3, 5, 4);
scene.add(dir);

// two cubes side by side

function makeCube(x) {
  const mesh = new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshStandardMaterial({ color: 0xffffff, transparent: true }),
  );
  mesh.position.x = x;
  scene.add(mesh);
  return mesh;
}

const leftCube  = makeCube(-2);
const rightCube = makeCube(2);

// 1. without the adapters

createTimeline({
  defaults: {
    duration: 350,
    ease: 'inOutSine',
  },
})
.add(leftCube.position, { y: -1 }, 0)
.add(leftCube.rotation, { x: utils.degToRad(90), y: utils.degToRad(180) }, 0)
.add(leftCube.scale, { x: 1.5, y: 1.5, z: 1.5 }, 0)
.add(leftCube.material, { opacity: 0.3 }, 0)
.add(leftCube.material.color, { r: 1, g: 0.4, b: 0.66 }, 0)

// 2. with the adapters

animate(rightCube, {
  y: -1,
  rotateX: 90,
  rotateY: 180,
  scaleAll: 1.5,
  opacity: 0.3,
  color: '#ff66aa',
  duration: 350,
  ease: 'inOutSine',
});

// render loop

createTimer({
  onUpdate: () => renderer.render(scene, camera),
});

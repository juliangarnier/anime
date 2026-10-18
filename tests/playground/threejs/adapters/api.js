import {
  Scene, WebGLRenderer, PCFShadowMap,
  Mesh, Group, Sprite, Points, Line,
  PerspectiveCamera, AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight,
  InstancedMesh, BatchedMesh,
  BoxGeometry, SphereGeometry, ConeGeometry, PlaneGeometry, BufferGeometry, BufferAttribute,
  MeshStandardMaterial, PointsMaterial, LineBasicMaterial, SpriteMaterial,
  CanvasTexture, MathUtils,
  DirectionalLightHelper, PointLightHelper, SpotLightHelper, HemisphereLightHelper,
} from 'three';

import { animate, createTimer, stagger, utils } from '../../../../dist/modules/index.js';

// Side-effect import: registers the Object3D adapter so animate() and
// utils.set() accept raw three.js objects with flat properties
// (x, rotateY, scale, opacity, color, ...).
import { getInstances, commitChanges } from '../../../../dist/modules/adapters/three/index.js';

// renderer + camera
const scene = new Scene();

const camera = new PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
utils.set(camera, { x: 0, y: 6, z: 22 });
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
document.body.appendChild(renderer.domElement);
addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// lights + helpers
const ambient = new AmbientLight(0xffffff, 0.25);
scene.add(ambient);

const dir = new DirectionalLight(0xffffff, 1.4);
utils.set(dir, { x: 6, y: 10, z: 6 });
dir.castShadow = true;
dir.shadow.mapSize.set(1024, 1024);
dir.shadow.camera.left   = -12;
dir.shadow.camera.right  =  12;
dir.shadow.camera.top    =  12;
dir.shadow.camera.bottom = -12;
dir.shadow.camera.near = 1;
dir.shadow.camera.far = 40;
scene.add(dir);
const dirHelper = new DirectionalLightHelper(dir, 1.5, 0xffffff);
scene.add(dirHelper);

const point = new PointLight(0xff66aa, 80, 30, 1.6);
utils.set(point, { x: 0, y: 4, z: 4 });
scene.add(point);
const pointHelper = new PointLightHelper(point, 0.4);
scene.add(pointHelper);

const spot = new SpotLight(0x66ddff, 60, 40, Math.PI / 6, 0.4, 1.5);
utils.set(spot, { x: -8, y: 8, z: 4 });
spot.target.position.set(0, 0, 0);
scene.add(spot);
scene.add(spot.target);
const spotHelper = new SpotLightHelper(spot);
scene.add(spotHelper);

const hemi = new HemisphereLight(0x88aaff, 0x442200, 0.4);
utils.set(hemi, { x: 0, y: 12, z: 0 });
scene.add(hemi);
const hemiHelper = new HemisphereLightHelper(hemi, 1);
scene.add(hemiHelper);

// floor (receives shadows)
const floor = new Mesh(
  new PlaneGeometry(40, 40),
  new MeshStandardMaterial({ color: 0x222233, roughness: 1, metalness: 0 })
);
utils.set(floor, { rotateX: -90, y: -3 });
floor.receiveShadow = true;
scene.add(floor);

// root group (everything that moves together)
const root = new Group();
scene.add(root);

// animated cube
const cube = new Mesh(
  new BoxGeometry(1.2, 1.2, 1.2),
  new MeshStandardMaterial({ color: 0xff4b4b, transparent: true })
);
utils.set(cube, { x: -7 });
cube.castShadow = true;
cube.receiveShadow = true;
root.add(cube);

// scale = 0 and opacity = 0 mid-tween exercise the visibility flip.
animate(cube, {
  rotateY: 360,
  rotateX: [0, 180],
  scale: [{ to: 1.6 }, { to: 0 }, { to: 1 }],
  color: ['#fff', '#f0a', '#fff'],
  opacity: [1, 0, 1],
  duration: 3000,
  loop: true,
});

// sprite billboard
const spriteCanvas = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  const grad = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
  grad.addColorStop(0, '#fff');
  grad.addColorStop(0.4, '#fc0');
  grad.addColorStop(1, '#f000');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);
  return c;
})();

const sprite = new Sprite(new SpriteMaterial({
  map: new CanvasTexture(spriteCanvas),
  transparent: true,
  depthWrite: false,
}));
utils.set(sprite, { x: 7, y: 1, scale: 1.5 });
root.add(sprite);

animate(sprite, {
  y: [1, 3, 1],
  scale: [1.5, 2.5, 1.5],
  opacity: [0.5, 1, 0.5],
  color: ['#ffcc00', '#ff66ff', '#66ffff', '#ffcc00'],
  duration: 3000,
  loop: true,
  ease: 'inOutSine',
});

// points cloud
const POINTS_COUNT = 600;
const pointsGeo = new BufferGeometry();
const pointsPos = new Float32Array(POINTS_COUNT * 3);
for (let i = 0; i < POINTS_COUNT; i++) {
  const a = (i / POINTS_COUNT) * Math.PI * 2;
  const r = 9 + Math.random() * 1.5;
  pointsPos[i * 3]     = Math.cos(a) * r;
  pointsPos[i * 3 + 1] = (Math.random() - 0.5) * 0.6;
  pointsPos[i * 3 + 2] = Math.sin(a) * r;
}
pointsGeo.setAttribute('position', new BufferAttribute(pointsPos, 3));
const pointsCloud = new Points(
  pointsGeo,
  new PointsMaterial({ color: 0xffffff, size: 0.08, transparent: true, opacity: 0.9 })
);
root.add(pointsCloud);

animate(pointsCloud, {
  rotateY: 360,
  color: ['#fff', '#ff7', '#7ff', '#fff'],
  duration: 8000,
  loop: true,
  ease: 'linear',
});

// line (orbit ring)
const RING_SEGMENTS = 128;
const ringGeo = new BufferGeometry();
const ringPos = new Float32Array((RING_SEGMENTS + 1) * 3);
for (let i = 0; i <= RING_SEGMENTS; i++) {
  const a = (i / RING_SEGMENTS) * Math.PI * 2;
  ringPos[i * 3]     = Math.cos(a) * 6;
  ringPos[i * 3 + 1] = 0;
  ringPos[i * 3 + 2] = Math.sin(a) * 6;
}
ringGeo.setAttribute('position', new BufferAttribute(ringPos, 3));
const ring = new Line(
  ringGeo,
  new LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.6 })
);
utils.set(ring, { rotateX: 90 });
root.add(ring);

animate(ring, {
  rotateZ: 360,
  color: ['#fff', '#88f', '#fff'],
  opacity: [0.3, 0.8, 0.3],
  duration: 4000,
  loop: true,
  ease: 'inOutSine',
});

// instanced mesh grid
const instanced = new InstancedMesh(
  new BoxGeometry(0.3, 0.3, 0.3),
  new MeshStandardMaterial({ color: 0x42a5ff }),
  4000
);
instanced.castShadow = true;
utils.set(instanced, { y: 5 });
root.add(instanced);

const instancedInstances = getInstances(instanced);
utils.set(instancedInstances, {
  x: stagger(0.45, { grid: [80, 50], from: 'center', axis: 'x' }),
  y: stagger(0.45, { grid: [80, 50], from: 'center', axis: 'y' }),
});

animate(instancedInstances, {
  z: () => utils.random(-10, 10),
  rotateX: () => utils.random(-180, 180),
  rotateY: () => utils.random(-180, 180),
  duration: 3000,
  delay: stagger([0, 1000], { grid: true, from: 'center' }),
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

// User onBeforeRender chains transparently with the auto-flush; commit
// any pending instance writes happens before this runs.
// Assigning your own onBeforeRender keeps the auto-flush chain (the
// adapter installs an accessor that stores user handlers separately);
// no need to capture and call any previous handler.
instanced.onBeforeRender = function () {
  instanced.position.y = 5 + Math.sin(performance.now() * 0.0015) * 0.6;
};

// BatchedMesh ring with three different geometries sharing one material
// and one draw call (the whole point of BatchedMesh).
const BATCH_COUNT = 24;
const batchedMat = new MeshStandardMaterial({ color: 0x88ffaa });
const batched = new BatchedMesh(BATCH_COUNT, 2000, 4000, batchedMat);
const geoIds = [
  batched.addGeometry(new BoxGeometry(0.7, 0.7, 0.7)),
  batched.addGeometry(new SphereGeometry(0.45, 12, 8)),
  batched.addGeometry(new ConeGeometry(0.45, 0.9, 6)),
];
for (let i = 0; i < BATCH_COUNT; i++) batched.addInstance(geoIds[i % geoIds.length]);
batched.castShadow = true;
utils.set(batched, { y: 2 });
scene.add(batched);

// arrange instances around a ring
const batchedInstances = getInstances(batched);
for (let i = 0; i < BATCH_COUNT; i++) {
  const inst = batchedInstances[i];
  if (!inst) continue;
  const a = (i / BATCH_COUNT) * Math.PI * 2;
  utils.set(inst, { x: Math.cos(a) * 6, z: Math.sin(a) * 6 });
}

// scale crosses 0 -> exercises the per-instance visibility flip path
animate(batchedInstances, {
  scale: [1, 0, 1],
  rotateY: 360,
  color: ['#88ffaa', '#ffaa88', '#88ffaa'],
  duration: 3000,
  delay: stagger(80),
  loop: true,
  ease: 'inOutSine',
});

// per-instance visibility flicker -> exercises BatchedMesh.setVisibleAt
// (no-op on InstancedMesh, see Instance.visible).
createTimer({
  duration: 600,
  loop: true,
  onLoop: () => {
    for (let i = 0, l = batchedInstances.length; i < l; i++) {
      const inst = batchedInstances[i];
      if (inst) inst.visible = Math.random() > 0.18;
    }
  },
});

// light animations
animate(ambient, {
  intensity: [0.15, 2],
  color: ['#fff', '#ffe0b3', '#fff'],
  duration: 5000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

animate(dir, {
  intensity: [0.6, 2.6],
  color: ['#ffffff', '#ffd0b0', '#ffffff'],
  rotateY: 360,
  duration: 6000,
  loop: true,
  ease: 'linear',
});

animate(point, {
  x: [-6, 6],
  z: [-4, 4],
  intensity: [40, 120],
  color: ['#ff66aa', '#aa66ff', '#ff66aa'],
  duration: 3500,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

animate(spot, {
  intensity: [30, 90],
  color: ['#66ddff', '#66ffaa', '#66ddff'],
  duration: 2800,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

animate(hemi, {
  intensity: [0.2, 0.8],
  color: ['#88aaff', '#ffaa88', '#88aaff'],
  duration: 7000,
  loop: true,
  ease: 'linear',
});

// camera fov breathe (fov setter on the adapter auto-calls
// updateProjectionMatrix)
animate(camera, {
  fov: [50, 38],
  duration: 6000,
  loop: true,
  alternate: true,
  ease: 'inOutQuad',
});

// root rotation
animate(root, {
  rotateY: 360,
  duration: 30000,
  loop: true,
  ease: 'linear',
});

// render + helper updates
createTimer({
  priority: 0,
  onUpdate: () => {
    // Helpers don't update themselves - call update() each frame.
    dirHelper.update();
    pointHelper.update();
    spotHelper.update();
    hemiHelper.update();
    renderer.render(scene, camera);
  },
});

// Touch unused imports the linter/types might flag. (MathUtils is reserved
// for direct degree conversions outside animate(); commitChanges is
// available if you ever read instanceMatrix between a tick and a render.)
void MathUtils; void commitChanges;

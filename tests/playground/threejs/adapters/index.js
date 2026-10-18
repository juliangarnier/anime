import {
  Scene, WebGLRenderer, PCFShadowMap,
  Mesh, Group, Sprite, Points, Line,
  PerspectiveCamera, AmbientLight, DirectionalLight, PointLight, SpotLight, HemisphereLight,
  InstancedMesh, BatchedMesh,
  BoxGeometry, SphereGeometry, ConeGeometry, TorusKnotGeometry, IcosahedronGeometry, PlaneGeometry, BufferGeometry, BufferAttribute,
  MeshStandardMaterial, MeshPhysicalMaterial, ShaderMaterial, PointsMaterial, LineBasicMaterial, SpriteMaterial,
  CanvasTexture, MathUtils, Vector2, Vector3, Color,
  DirectionalLightHelper, PointLightHelper, SpotLightHelper, HemisphereLightHelper,
} from 'three';

import { uniform } from 'three/tsl';
import { MeshStandardNodeMaterial } from 'three/webgpu';

import { engine, animate, createTimeline, createTimer, stagger, utils } from '../../../../dist/modules/index.js';

// Side-effect import: registers the Object3D adapter so animate() and
// utils.set() accept raw three.js objects with flat properties
// (x, rotateY, scale, opacity, color, ...).
import { getInstances, commitChanges } from '../../../../dist/modules/adapters/three/index.js';

engine.fps = 60;
// renderer + camera
const scene = new Scene();

const camera = new PerspectiveCamera(50, innerWidth / innerHeight, 0.1, 1000);
utils.set(camera, { x: 0, y: 6, z: 22 });
camera.lookAt(0, 0, 0);

const renderer = new WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(1);
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
// Material is white so per-instance colors uploaded via `instanceColor` render at full intensity (the material color multiplies them).
const instancePalette = ['#ff4b4b', '#ff8f42', '#ffc730', '#a4ff4f', '#3cffec', '#5a87ff', '#8453e3', '#fb89fb'];
const instanced = new InstancedMesh(
  new BoxGeometry(0.3, 0.3, 0.3),
  new MeshStandardMaterial({ color: 0xffffff }),
  4000
);
instanced.castShadow = true;
utils.set(instanced, { y: 5 });
root.add(instanced);

const instancedInstances = getInstances(instanced);
utils.set(instancedInstances, {
  x: stagger(0.45, { grid: [80, 50], from: 'center', axis: 'x' }),
  y: stagger(0.45, { grid: [80, 50], from: 'center', axis: 'y' }),
  color: () => utils.randomPick(instancePalette),
});

animate(instancedInstances, {
  z: () => utils.random(-10, 10),
  rotateX: () => utils.random(-180, 180),
  rotateY: () => utils.random(-180, 180),
  color: () => [utils.randomPick(instancePalette), utils.randomPick(instancePalette)],
  duration: 3000,
  delay: stagger([0, 1000], { grid: true, from: 'center' }),
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

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

// Skew + transformOrigin demos
// Two single meshes (Object3D adapter path) and two InstancedMesh grids (Instance adapter path),
// one of each pair animating skewX / skewY, the other animating transformOrigin around a fixed pivot.

const skewMesh = new Mesh(
  new BoxGeometry(1.2, 1.2, 1.2),
  new MeshStandardMaterial({ color: '#ff66aa' }),
);
skewMesh.castShadow = true;
utils.set(skewMesh, { x: -8, y: 1, z: 6 });
root.add(skewMesh);
animate(skewMesh, {
  skewX: [-30, 30],
  skewY: [20, -20],
  rotateY: 360,
  duration: 4000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

const originMesh = new Mesh(
  new BoxGeometry(1.2, 1.2, 1.2),
  new MeshStandardMaterial({ color: '#66ffaa' }),
);
originMesh.castShadow = true;
utils.set(originMesh, { x: -5, y: 1, z: 6 });
root.add(originMesh);
animate(originMesh, {
  // Off-center pivot pulls the visible position as scale/rotation animate.
  transformOriginY: [-1, 1],
  scale: [1, 2.2],
  rotateZ: 360,
  duration: 4000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

const skewInstanced = new InstancedMesh(
  new BoxGeometry(0.4, 0.4, 0.4),
  new MeshStandardMaterial({ color: '#ffaa66' }),
  16,
);
skewInstanced.castShadow = true;
utils.set(skewInstanced, { x: 4, y: 1, z: 6 });
root.add(skewInstanced);
const skewInstances = getInstances(skewInstanced);
utils.set(skewInstances, {
  x: stagger(0.55, { from: 'center' }),
});
animate(skewInstances, {
  skewX: () => utils.random(-45, 45),
  skewY: () => utils.random(-30, 30),
  duration: 2500,
  delay: stagger(80),
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

const originInstanced = new InstancedMesh(
  new BoxGeometry(0.4, 0.4, 0.4),
  new MeshStandardMaterial({ color: '#aa66ff' }),
  16,
);
originInstanced.castShadow = true;
utils.set(originInstanced, { x: 11, y: 1, z: 6 });
root.add(originInstanced);
const originInstances = getInstances(originInstanced);
utils.set(originInstances, {
  x: stagger(0.55, { from: 'center' }),
});
animate(originInstances, {
  // Per-instance pivot offsets make rotateY swing each cube around a different point.
  transformOriginX: () => utils.random(-1, 1),
  transformOriginY: () => utils.random(-1, 1),
  rotateY: 360,
  duration: 3000,
  delay: stagger(50),
  loop: true,
  ease: 'linear',
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

// Procedural tangent-space normal map: a grid of round bumps. Encoded as RGB where
// r/g = (nx/ny + 1) * 0.5, b = (nz + 1) * 0.5. CanvasTexture defaults to NoColorSpace,
// which is what three's normal-map shader expects (no sRGB decoding).
const normalMapCanvas = (() => {
  const N = 256;
  const cells = 6;
  const strength = 4;
  const c = document.createElement('canvas');
  c.width = c.height = N;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(N, N);
  const data = img.data;
  const heightAt = (u, v) => {
    const fu = u * cells, fv = v * cells;
    const dx = (fu - Math.floor(fu)) - 0.5;
    const dy = (fv - Math.floor(fv)) - 0.5;
    const r = Math.sqrt(dx * dx + dy * dy);
    return Math.max(0, 1 - r * 2.5);
  };
  const eps = 1 / N;
  for (let y = 0; y < N; y++) {
    for (let x = 0; x < N; x++) {
      const u = x / N, v = y / N;
      const dhdu = (heightAt(u + eps, v) - heightAt(u - eps, v)) * 0.5;
      const dhdv = (heightAt(u, v + eps) - heightAt(u, v - eps)) * 0.5;
      const nx = -dhdu * strength;
      const ny = -dhdv * strength;
      const nz = 1;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
      const i = (y * N + x) * 4;
      data[i]     = ((nx / len) + 1) * 127.5;
      data[i + 1] = ((ny / len) + 1) * 127.5;
      data[i + 2] = ((nz / len) + 1) * 127.5;
      data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
})();
const normalMapTexture = new CanvasTexture(normalMapCanvas);

// MeshPhysicalMaterial: animate built-in material props through the mesh
// (metalness / roughness / emissive / clearcoat / iridescence are auto-detected
// on mesh.material at tween creation time). normalMap + normalScale demonstrate
// the X / Y axis decomposition of a Vector2 material prop, with the bump strength
// visibly growing, flattening at zero, then inverting as the values swing.
const physicalKnot = new Mesh(
  new TorusKnotGeometry(0.7, 0.22, 96, 12),
  new MeshPhysicalMaterial({
    color: 0xeeeeee,
    metalness: 0,
    roughness: 1,
    clearcoat: 0,
    clearcoatRoughness: 0.1,
    iridescence: 0,
    iridescenceIOR: 1.3,
    emissive: new Color(0x000000),
    normalMap: normalMapTexture,
    normalScale: new Vector2(1, 1),
  })
);
physicalKnot.castShadow = true;
physicalKnot.receiveShadow = true;
utils.set(physicalKnot, { x: -3, y: 3 });
root.add(physicalKnot);

animate(physicalKnot, {
  metalness: [0, 1],
  roughness: [1, 0.05],
  clearcoat: [0, 1],
  iridescence: [0, 1],
  emissive: ['#000000', '#3300aa', '#000000'],
  rotateY: 360,
  duration: 5000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

animate(physicalKnot, {
  normalScaleX: [-1.5, 1.5],
  normalScaleY: [1.5, -1.5],
  duration: 4000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

// ShaderMaterial: animate user-defined uniforms through the mesh.
// uTime (scalar), uTint (Color), uIntensity (scalar) are auto-routed
// to material.uniforms[name].value by the threeObject3D adapter.

const sharderMaterial = new ShaderMaterial({
  uniforms: {
    uTime:      { value: 0 },
    uTint:      { value: new Color('#0033ff') },
    uIntensity: { value: 0.4 },
    uOffset:    { value: new Vector3(0, 0, 0) },
  },
  vertexShader: /* glsl */`
    uniform float uTime;
    uniform vec3  uOffset;
    varying vec3  vNormal;
    varying vec3  vPos;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec3 p = position + uOffset + normal * sin(uTime + position.y * 2.0) * 0.08;
      vPos = p;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  fragmentShader: /* glsl */`
    uniform vec3  uTint;
    uniform float uIntensity;
    uniform float uTime;
    varying vec3  vNormal;
    varying vec3  vPos;
    void main() {
      float fresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.0);
      float pulse = 0.5 + 0.5 * sin(uTime * 1.4 + vPos.y * 3.0);
      vec3 col = uTint * (uIntensity + fresnel * 1.5) * pulse;
      gl_FragColor = vec4(col, 1.0);
    }
  `,
});
const shaderMesh = new Mesh(new IcosahedronGeometry(0.9, 4), sharderMaterial);
utils.set(shaderMesh, { x: 3, y: 3 });
root.add(shaderMesh);

animate(shaderMesh, {
  uTime: [0, 60],
  uTint: ['#0033ff', '#ff0066', '#33ff88', '#0033ff'],
  uIntensity: [0.2, 1.4],
  uOffsetX: [-0.25, 0.25], // uOffsetX / uOffsetY / uOffsetZ routed to uniform.uOffset.value.x / .y / .z
  uOffsetY: [-0.3, 0.3],
  uOffsetZ: [-0.15, 0.15],
  duration: 12000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

// TSL: animate UniformNode slots on a NodeMaterial and bare uniforms.
// The playground uses WebGLRenderer so TSL is not rendered visibly here,
// but the adapter wiring is exercised through `animate()`. Inspect the
// uniforms in devtools to confirm `.value` ticks each frame.
const tslMat = new MeshStandardNodeMaterial();
tslMat.colorNode     = uniform(new Color('#ff0066'));
tslMat.metalnessNode = uniform(0);
tslMat.opacityNode   = uniform(1);
tslMat.offsetNode    = uniform(new Vector3());

animate(tslMat, {
  colorNode: ['#ff0066', '#33ff88', '#0033ff', '#ff0066'],
  metalnessNode: [0, 1],
  opacityNode: [1, 0.4],
  offsetNodeX: [-0.5, 0.5],
  offsetNodeY: [-0.3, 0.3],
  duration: 8000,
  loop: true,
  alternate: true,
  ease: 'inOutSine',
});

// Bare uniforms: scalar via `value`, color via `color`, vector via axis keys.
const uTimeNode = uniform(0);
const uTintNode = uniform(new Color('#000'));
const uOffNode  = uniform(new Vector3());

animate(uTimeNode, { value: [0, 60], duration: 12000, loop: true, ease: 'linear' });
animate(uTintNode, { color: ['#0033ff', '#33ff88', '#ff0066', '#0033ff'], duration: 9000, loop: true, ease: 'inOutSine' });
animate(uOffNode,  { x: [-1, 1], y: [-0.5, 0.5], z: [0, 0.25], duration: 7000, loop: true, alternate: true, ease: 'inOutQuad' });

window.tslMat = tslMat;
window.tslUniforms = { uTimeNode, uTintNode, uOffNode };

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

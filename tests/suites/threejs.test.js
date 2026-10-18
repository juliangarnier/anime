import {
  Object3D,
  Mesh,
  Texture,
  InstancedMesh,
  BatchedMesh,
  BoxGeometry,
  MeshBasicMaterial,
  MeshStandardMaterial,
  AmbientLight,
  PointLight,
  SpotLight,
  DirectionalLight,
  HemisphereLight,
  PerspectiveCamera,
  OrthographicCamera,
  Vector2,
  Vector3,
  Vector4,
  Quaternion,
  Matrix4,
  Color,
  ShaderMaterial,
} from 'three';

import { uniform } from 'three/tsl';
import { MeshStandardNodeMaterial } from 'three/webgpu';

import {
  expect,
} from '../utils.js';

import {
  animate,
  createTimeline,
  utils,
} from '../../dist/modules/index.js';

import {
  getInstances,
  commitChanges,
} from '../../dist/modules/adapters/three/index.js';

import { registerAdapter } from '../../dist/modules/adapters/index.js';
import { resolveAdapterEntry } from '../../dist/modules/adapters/registry.js';

const testAdapter = registerAdapter();

const TAU = Math.PI * 2;

// Mirrors the engine's color pipeline: render's sqrt-lerp on sRGB 0-255 channels, then the three.js adapter's setRGB(SRGBColorSpace) converting to linear-sRGB working space. Use this in assertions instead of hard-coded magic numbers.
const sRGBToLinear = (c) => c < 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
const expectedChannel = (from255, to255, t) => sRGBToLinear(Math.sqrt(from255 * from255 * (1 - t) + to255 * to255 * t) / 255);

const createMesh = (color = '#ff0000') => {
  return new Mesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ transparent: true, color }),
  );
};

const createInstanced = (count) => {
  return new InstancedMesh(
    new BoxGeometry(1, 1, 1),
    new MeshBasicMaterial({ transparent: true }),
    count,
  );
};

class Widget {
  constructor() { this.foo = 0; this.bar = 0; this.locked = false; }
}

const widgetAdapter = testAdapter.registerTargetAdapter((t) => t instanceof Widget);
let lastWidgetTween = null;
let barSetterRan = false;
widgetAdapter.registerProperty('foo',
  (t) => t.foo,
  (target, value, tween) => { lastWidgetTween = tween; target.foo = value; },
);
widgetAdapter.registerProperty('bar',
  (t) => t.bar,
  (target, value) => { barSetterRan = true; target.bar = value; },
  (t) => !t.locked,
);

suite('Three.js adapter', () => {

  // Adapter machinery

  test('First target adapter to detect wins, later adapters cannot claim unmapped names', () => {
    let secondCalled = false;
    const overrideX = testAdapter.registerTargetAdapter((t) => t instanceof Object3D);
    overrideX.registerProperty('x', () => 0, () => { secondCalled = true; });
    const mesh = createMesh();
    animate(mesh, { x: 10, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.position.x).to.equal(10);
    expect(secondCalled).to.equal(false);
    const foobarAdapter = testAdapter.registerTargetAdapter((t) => t instanceof Object3D);
    foobarAdapter.registerProperty('foobar', () => 0, () => {});
    expect(resolveAdapterEntry(new Object3D(), 'foobar')).to.equal(null);
  });

  test('Gates conditional props per target type', () => {
    expect(resolveAdapterEntry(new AmbientLight(), 'opacity')).to.equal(null);
    const hemi = new HemisphereLight();
    expect(resolveAdapterEntry(hemi, 'groundColor')).to.not.equal(null);
    expect(resolveAdapterEntry(new PointLight(), 'groundColor')).to.equal(null);
    const ortho = new OrthographicCamera(-1, 1, 1, -1);
    const persp = new PerspectiveCamera();
    expect(resolveAdapterEntry(ortho, 'left')).to.not.equal(null);
    expect(resolveAdapterEntry(ortho, 'right')).to.not.equal(null);
    expect(resolveAdapterEntry(ortho, 'top')).to.not.equal(null);
    expect(resolveAdapterEntry(ortho, 'bottom')).to.not.equal(null);
    expect(resolveAdapterEntry(persp, 'left')).to.equal(null);
    expect(resolveAdapterEntry(persp, 'right')).to.equal(null);
    expect(resolveAdapterEntry(persp, 'top')).to.equal(null);
    expect(resolveAdapterEntry(persp, 'bottom')).to.equal(null);
    const audioLike = new Object3D();
    audioLike.setVolume = () => {};
    audioLike.getVolume = () => 0;
    expect(resolveAdapterEntry(audioLike, 'volume')).to.not.equal(null);
    expect(resolveAdapterEntry(new Object3D(), 'volume')).to.equal(null);
    const positionalLike = new Object3D();
    positionalLike.setRefDistance = () => {};
    positionalLike.setRolloffFactor = () => {};
    positionalLike.setMaxDistance = () => {};
    expect(resolveAdapterEntry(positionalLike, 'refDistance')).to.not.equal(null);
    expect(resolveAdapterEntry(positionalLike, 'rolloffFactor')).to.not.equal(null);
    expect(resolveAdapterEntry(positionalLike, 'maxDistance')).to.not.equal(null);
    expect(resolveAdapterEntry(new Object3D(), 'refDistance')).to.equal(null);
  });

  test('Passes tween with target, property, _number to custom adapter setter', () => {
    const w = new Widget();
    animate(w, { foo: 42, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(w.foo).to.equal(42);
    expect(lastWidgetTween.target).to.equal(w);
    expect(lastWidgetTween.property).to.equal('foo');
    expect(lastWidgetTween._number).to.equal(42);
  });

  test('Falls through to direct write when custom adapter appliesTo rejects target', () => {
    const unlocked = new Widget();
    const locked = new Widget();
    locked.locked = true;
    expect(resolveAdapterEntry(unlocked, 'bar')).to.not.equal(null);
    expect(resolveAdapterEntry(locked, 'bar')).to.equal(null);
    barSetterRan = false;
    animate(locked, { bar: 5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(locked.bar).to.equal(5);
    expect(barSetterRan).to.equal(false);
  });

  test('Property resolver claims runtime-matched names', () => {
    let calls = 0;
    testAdapter.registerPropertyResolver((t, name) => {
      calls++;
      if (t && t.kind === 'probe' && name === 'dynamic') {
        return {
          get: (x) => x.value,
          set: (target, value) => { target.value = value; },
        };
      }
      return null;
    });
    const target = { kind: 'probe', value: 0 };
    animate(target, { dynamic: 42, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(target.value).to.equal(42);
    expect(calls).to.be.greaterThan(0);
  });

  // Object3D adapter

  // Transform

  test('Animates position x, y, z', () => {
    const mesh = createMesh();
    mesh.position.x = 25;
    const animation = animate(mesh, { x: 75, y: 50, z: -25, duration: 100, ease: 'linear', autoplay: false });
    animation.seek(0);
    expect(mesh.position.x).to.equal(25);
    expect(mesh.position.y).to.equal(0);
    expect(mesh.position.z).to.equal(0);
    animation.seek(50);
    expect(mesh.position.x).to.equal(50);
    expect(mesh.position.y).to.equal(25);
    expect(mesh.position.z).to.equal(-12.5);
    animation.seek(100);
    expect(mesh.position.x).to.equal(75);
    expect(mesh.position.y).to.equal(50);
    expect(mesh.position.z).to.equal(-25);
  });

  test('Animates rotation in degrees, supports multiple revolutions', () => {
    const mesh = createMesh();
    mesh.rotation.x = Math.PI;
    mesh.rotation.y = Math.PI / 2;
    mesh.rotation.z = -Math.PI / 4;
    animate(mesh, { rotateX: 360, duration: 100, ease: 'linear', autoplay: false }).seek(0);
    expect(mesh.rotation.x).to.equal(Math.PI);
    animate(mesh, { rotateY: 180, duration: 100, ease: 'linear', autoplay: false }).seek(0);
    expect(mesh.rotation.y).to.equal(Math.PI / 2);
    animate(mesh, { rotateZ: 90, duration: 100, ease: 'linear', autoplay: false }).seek(0);
    expect(mesh.rotation.z).to.equal(-Math.PI / 4);
    const fresh = createMesh();
    animate(fresh, { rotateX: 90, duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(fresh.rotation.x).to.equal(Math.PI / 4);
    animate(fresh, { rotateY: 90, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(fresh.rotation.y).to.equal(Math.PI / 2);
    animate(fresh, { rotateZ: 720, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(fresh.rotation.z).to.equal(2 * TAU);
  });

  test('Auto-converts degrees to radians on rotation and angle fields', () => {
    // 1. Object3D rotateX, rotateY, rotateZ via the static Object3D adapter mappings.
    const mesh = createMesh();
    animate(mesh, { rotateX: 90, rotateY: 180, rotateZ: 45, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.rotation.x).to.be.closeTo(Math.PI / 2, 1e-6);
    expect(mesh.rotation.y).to.be.closeTo(Math.PI, 1e-6);
    expect(mesh.rotation.z).to.be.closeTo(Math.PI / 4, 1e-6);

    // 2. Texture rotation as a scalar number via the angle resolver.
    const texture = new Texture();
    animate(texture, { rotation: 90, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(texture.rotation).to.be.closeTo(Math.PI / 2, 1e-6);

    // 3. SpotLight angle as a scalar number via the angle resolver.
    const spot = new SpotLight();
    animate(spot, { angle: 30, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(spot.angle).to.be.closeTo(Math.PI / 6, 1e-6);

    // 4. Mesh rotationX, rotationY, rotationZ via the Euler axis resolver, alternate spelling of rotateX/Y/Z.
    const fresh = createMesh();
    animate(fresh, { rotationX: 90, rotationY: 180, rotationZ: 45, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(fresh.rotation.x).to.be.closeTo(Math.PI / 2, 1e-6);
    expect(fresh.rotation.y).to.be.closeTo(Math.PI, 1e-6);
    expect(fresh.rotation.z).to.be.closeTo(Math.PI / 4, 1e-6);
  });

  test('Uniform scale writes all axes, per-axis writes stay independent', () => {
    const mesh = createMesh();
    const uniform = animate(mesh, { scale: 2, duration: 100, ease: 'linear', autoplay: false });
    uniform.seek(50);
    expect(mesh.scale.x).to.equal(1.5);
    expect(mesh.scale.y).to.equal(1.5);
    expect(mesh.scale.z).to.equal(1.5);
    uniform.seek(100);
    expect(mesh.scale.x).to.equal(2);
    expect(mesh.scale.y).to.equal(2);
    expect(mesh.scale.z).to.equal(2);
    animate(mesh, { scaleX: 5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.scale.x).to.equal(5);
    expect(mesh.scale.y).to.equal(2);
    expect(mesh.scale.z).to.equal(2);
    animate(mesh, { scaleY: 4, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.scale.x).to.equal(5);
    expect(mesh.scale.y).to.equal(4);
    expect(mesh.scale.z).to.equal(2);
    animate(mesh, { scaleZ: 3, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.scale.x).to.equal(5);
    expect(mesh.scale.y).to.equal(4);
    expect(mesh.scale.z).to.equal(3);
  });

  test('Toggles visible based on scale being zero', () => {
    const mesh = createMesh();
    mesh.visible = false;
    const animation = animate(mesh, { scale: [1, 0], duration: 100, ease: 'linear', autoplay: false });
    animation.seek(0);
    expect(mesh.visible).to.equal(true);
    animation.seek(100);
    expect(mesh.visible).to.equal(false);
  });

  test('Animates visible from truthy to falsy', () => {
    const mesh = createMesh();
    mesh.visible = false;
    const animation = animate(mesh, { visible: [1, 0], duration: 100, ease: 'linear', autoplay: false });
    animation.seek(50);
    expect(mesh.visible).to.equal(true);
    animation.seek(100);
    expect(mesh.visible).to.equal(false);
  });

  // Opacity

  test('Writes opacity to material and toggles visible at zero', () => {
    const mesh = createMesh();
    mesh.material.opacity = 0.3;
    mesh.visible = false;
    const animation = animate(mesh, { opacity: [1, 0], duration: 100, ease: 'linear', autoplay: false });
    animation.seek(0);
    expect(mesh.material.opacity).to.equal(1);
    expect(mesh.visible).to.equal(true);
    animation.seek(50);
    expect(mesh.material.opacity).to.equal(0.5);
    expect(mesh.visible).to.equal(true);
    animation.seek(100);
    expect(mesh.material.opacity).to.equal(0);
    expect(mesh.visible).to.equal(false);
  });

  test('Writes opacity to every entry in material array', () => {
    const m1 = new MeshBasicMaterial({ transparent: true });
    const m2 = new MeshBasicMaterial({ transparent: true });
    const multi = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(multi, { opacity: 0.5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.opacity).to.equal(0.5);
    expect(m2.opacity).to.equal(0.5);
  });

  // Color

  test('Animates color and reads from-value off material', () => {
    const mesh = createMesh('#888888');
    const animation = animate(mesh, { color: ['#000000', '#ff0000'], duration: 100, ease: 'linear', autoplay: false });
    animation.seek(50);
    expect(mesh.material.color.r).to.be.closeTo(expectedChannel(0, 255, 0.5), 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(0, 1e-6);
    animation.seek(100);
    expect(mesh.material.color.r).to.be.closeTo(1, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(0, 1e-6);
    const fromMesh = createMesh('#ff0000');
    const fromAnim = animate(fromMesh, { color: '#0000ff', duration: 100, ease: 'linear', autoplay: false });
    fromAnim.seek(50);
    expect(fromMesh.material.color.r).to.be.closeTo(expectedChannel(255, 0, 0.5), 1e-6);
    expect(fromMesh.material.color.b).to.be.closeTo(expectedChannel(0, 255, 0.5), 1e-6);
    fromAnim.seek(100);
    expect(fromMesh.material.color.r).to.be.closeTo(0, 1e-6);
    expect(fromMesh.material.color.b).to.be.closeTo(1, 1e-6);
  });

  test('Animates color across all channels between explicit from-to endpoints', () => {
    const mesh = createMesh('#888888');
    const animation = animate(mesh, { color: ['#000000', '#ffffff'], duration: 100, ease: 'linear', autoplay: false });
    animation.seek(0);
    expect(mesh.material.color.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(0, 1e-6);
    animation.seek(50);
    const mid = expectedChannel(0, 255, 0.5);
    expect(mesh.material.color.r).to.be.closeTo(mid, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(mid, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(mid, 1e-6);
    animation.seek(100);
    expect(mesh.material.color.r).to.be.closeTo(1, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(1, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(1, 1e-6);
  });

  test('Chains color through multi-keyframe steps', () => {
    const mesh = createMesh('#888888');
    const animation = animate(mesh, {
      color: ['#ff0000', '#00ff00', '#0000ff'],
      duration: 200,
      ease: 'linear',
      autoplay: false,
    });
    animation.seek(0);
    expect(mesh.material.color.r).to.be.closeTo(1, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(0, 1e-6);
    animation.seek(100);
    expect(mesh.material.color.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(1, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(0, 1e-6);
    animation.seek(200);
    expect(mesh.material.color.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(1, 1e-6);
  });

  test('Writes color to light.color, leaves HemisphereLight groundColor alone', () => {
    const point = new PointLight(0x000000);
    animate(point, { color: '#00ff00', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(point.color.r).to.be.closeTo(0, 1e-6);
    expect(point.color.g).to.be.closeTo(1, 1e-6);
    expect(point.color.b).to.be.closeTo(0, 1e-6);
    const hemi = new HemisphereLight(0x000000, 0xffffff);
    const groundR0 = hemi.groundColor.r;
    animate(hemi, { color: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(hemi.color.r).to.be.closeTo(1, 1e-6);
    expect(hemi.color.g).to.be.closeTo(0, 1e-6);
    expect(hemi.color.b).to.be.closeTo(0, 1e-6);
    expect(hemi.groundColor.r).to.be.closeTo(groundR0, 1e-6);
  });

  test('Writes color to every entry in material array', () => {
    const ma = new MeshBasicMaterial({ color: '#000000' });
    const mb = new MeshBasicMaterial({ color: '#000000' });
    const multi = new Mesh(new BoxGeometry(1, 1, 1), [ma, mb]);
    animate(multi, { color: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(ma.color.r).to.be.closeTo(1, 1e-6);
    expect(mb.color.r).to.be.closeTo(1, 1e-6);
  });

  test('Animates HemisphereLight groundColor as a color tween', () => {
    const hemi = new HemisphereLight(0xffffff, 0x000000);
    const animation = animate(hemi, { groundColor: '#00ff00', duration: 100, ease: 'linear', autoplay: false });
    animation.seek(0);
    expect(hemi.groundColor.r).to.be.closeTo(0, 1e-6);
    expect(hemi.groundColor.g).to.be.closeTo(0, 1e-6);
    expect(hemi.groundColor.b).to.be.closeTo(0, 1e-6);
    animation.seek(100);
    expect(hemi.groundColor.r).to.be.closeTo(0, 1e-6);
    expect(hemi.groundColor.g).to.be.closeTo(1, 1e-6);
    expect(hemi.groundColor.b).to.be.closeTo(0, 1e-6);
  });

  // Audio (method-bridged)

  test('Bridges volume, refDistance, rolloffFactor, maxDistance via setX and getX', () => {
    const audio = new Object3D();
    let v = 0.5;
    let getterCalls = 0;
    audio.setVolume = (val) => { v = val; };
    audio.getVolume = () => { getterCalls++; return v; };
    animate(audio, { volume: 1, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(v).to.equal(1);
    expect(getterCalls).to.be.greaterThan(0);
    const positional = new Object3D();
    let rd = 1, rf = 1, md = 1000;
    positional.setRefDistance = (val) => { rd = val; };
    positional.setRolloffFactor = (val) => { rf = val; };
    positional.setMaxDistance = (val) => { md = val; };
    positional.getRefDistance = () => rd;
    positional.getRolloffFactor = () => rf;
    positional.getMaxDistance = () => md;
    animate(positional, { refDistance: 10, rolloffFactor: 2, maxDistance: 500, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(rd).to.equal(10);
    expect(rf).to.equal(2);
    expect(md).to.equal(500);
  });

  // Camera

  test('Updates projection matrix on Perspective and Orthographic camera writes', () => {
    const persp = new PerspectiveCamera(50, 1, 0.1, 1000);
    let perspCount = 0;
    const perspOrig = persp.updateProjectionMatrix.bind(persp);
    persp.updateProjectionMatrix = () => { perspCount++; perspOrig(); };
    animate(persp, { fov: 80, aspect: 2, near: 5, far: 500, zoom: 2, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(persp.fov).to.equal(80);
    expect(persp.aspect).to.equal(2);
    expect(persp.near).to.equal(5);
    expect(persp.far).to.equal(500);
    expect(persp.zoom).to.equal(2);
    expect(perspCount).to.be.greaterThan(0);
    const focal = new PerspectiveCamera(50, 1, 0.1, 1000);
    let focalCount = 0;
    const focalOrig = focal.updateProjectionMatrix.bind(focal);
    focal.updateProjectionMatrix = () => { focalCount++; focalOrig(); };
    animate(focal, { focalLength: 35, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(focal.getFocalLength()).to.be.closeTo(35, 1e-3);
    expect(focalCount).to.be.greaterThan(0);
    const ortho = new OrthographicCamera(-1, 1, 1, -1, 0.1, 1000);
    let orthoCount = 0;
    const orthoOrig = ortho.updateProjectionMatrix.bind(ortho);
    ortho.updateProjectionMatrix = () => { orthoCount++; orthoOrig(); };
    animate(ortho, { left: -2, right: 2, top: 2, bottom: -2, near: 4, far: 400, zoom: 3, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(ortho.left).to.equal(-2);
    expect(ortho.right).to.equal(2);
    expect(ortho.top).to.equal(2);
    expect(ortho.bottom).to.equal(-2);
    expect(ortho.near).to.equal(4);
    expect(ortho.far).to.equal(400);
    expect(ortho.zoom).to.equal(3);
    expect(orthoCount).to.be.greaterThan(0);
  });

  // Direct property fall-through (unmapped names)

  test('Animates intensity on Point, Spot, Directional, Hemisphere lights', () => {
    const lights = [
      new PointLight(0xffffff, 0.5),
      new SpotLight(0xffffff, 0.5),
      new DirectionalLight(0xffffff, 0.5),
      new HemisphereLight(0xffffff, 0xffffff, 0.5),
    ];
    for (let i = 0, l = lights.length; i < l; i++) {
      const light = lights[i];
      const animation = animate(light, { intensity: 2, duration: 100, ease: 'linear', autoplay: false });
      animation.seek(0);
      expect(light.intensity).to.equal(0.5);
      animation.seek(100);
      expect(light.intensity).to.equal(2);
    }
  });

  // utils.set / revert / edge

  test('Routes utils.set through three adapter', () => {
    const mesh = createMesh();
    utils.set(mesh, { x: 100, opacity: 0.4 });
    expect(mesh.position.x).to.equal(100);
    expect(mesh.material.opacity).to.equal(0.4);
  });

  test('Reverts numeric adapter props to pre-animation value', () => {
    const mesh = createMesh();
    mesh.position.x = 5;
    mesh.rotation.y = 0.5;
    mesh.scale.set(1.5, 1.5, 1.5);
    mesh.material.opacity = 0.7;
    const meshAnim = animate(mesh, { x: 100, rotateY: 90, scale: 3, opacity: 0.1, duration: 100, autoplay: false });
    meshAnim.seek(meshAnim.duration);
    meshAnim.revert();
    expect(mesh.position.x).to.equal(5);
    expect(mesh.rotation.y).to.be.closeTo(0.5, 1e-9);
    expect(mesh.scale.x).to.equal(1.5);
    expect(mesh.scale.y).to.equal(1.5);
    expect(mesh.scale.z).to.equal(1.5);
    expect(mesh.material.opacity).to.equal(0.7);
    const camera = new PerspectiveCamera(45, 1, 0.1, 1000);
    const camAnim = animate(camera, { fov: 80, duration: 100, autoplay: false });
    camAnim.seek(camAnim.duration);
    camAnim.revert();
    expect(camera.fov).to.equal(45);
  });

  test('Reverts material color to pre-animation value', () => {
    const mesh = createMesh('#ff8800');
    const r0 = mesh.material.color.r;
    const g0 = mesh.material.color.g;
    const b0 = mesh.material.color.b;
    const colorAnim = animate(mesh, { color: '#0000ff', duration: 100, autoplay: false });
    colorAnim.seek(colorAnim.duration);
    expect(mesh.material.color.b).to.be.closeTo(1, 1e-6);
    colorAnim.revert();
    expect(mesh.material.color.r).to.be.closeTo(r0, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(g0, 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(b0, 1e-6);
  });

  test('Animates opacity and color on bare Object3D without throwing', () => {
    const opacityObj = new Object3D();
    expect(() => animate(opacityObj, { opacity: 0, duration: 100, ease: 'linear', autoplay: false }).seek(100)).to.not.throw();
    expect(opacityObj.visible).to.equal(false);
    const colorObj = new Object3D();
    expect(() => animate(colorObj, { color: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100)).to.not.throw();
  });

  // Material adapter

  // Direct material props

  test('Decomposes material emissive via Material adapter', () => {
    const mat = new MeshStandardMaterial({ emissive: '#888888' });
    animate(mat, { emissive: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.emissive.r).to.be.closeTo(1, 1e-6);
    expect(mat.emissive.g).to.be.closeTo(0, 1e-6);
    expect(mat.emissive.b).to.be.closeTo(0, 1e-6);
  });

  test('Animates numeric prop directly on material', () => {
    const mat = new MeshStandardMaterial();
    animate(mat, { metalness: 0.8, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.metalness).to.equal(0.8);
  });

  test('Routes material color and scalar props on mesh via property resolver', () => {
    const mesh = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshStandardMaterial({ emissive: '#888888', metalness: 0, roughness: 1 }),
    );
    animate(mesh, {
      emissive: '#00ff00',
      metalness: 0.7,
      roughness: 0.3,
      duration: 100,
      ease: 'linear',
      autoplay: false,
    }).seek(100);
    expect(mesh.material.emissive.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.emissive.g).to.be.closeTo(1, 1e-6);
    expect(mesh.material.emissive.b).to.be.closeTo(0, 1e-6);
    expect(mesh.material.metalness).to.equal(0.7);
    expect(mesh.material.roughness).to.equal(0.3);
  });

  test('Routes utils.set bool write to material prop', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ wireframe: false }));
    expect(resolveAdapterEntry(mesh, 'wireframe')).to.not.equal(null);
    utils.set(mesh, { wireframe: true });
    expect(mesh.material.wireframe).to.equal(1);
    utils.set(mesh, { wireframe: false });
    expect(mesh.material.wireframe).to.equal(0);
  });

  test('Writes mesh material props to every entry in array', () => {
    const m1 = new MeshStandardMaterial({ emissive: '#000000', metalness: 0 });
    const m2 = new MeshStandardMaterial({ emissive: '#000000', metalness: 0 });
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { emissive: '#ff0000', metalness: 0.5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.emissive.r).to.be.closeTo(1, 1e-6);
    expect(m2.emissive.r).to.be.closeTo(1, 1e-6);
    expect(m1.metalness).to.equal(0.5);
    expect(m2.metalness).to.equal(0.5);
  });

  test('Mesh-owned prop wins over material prop on name collision', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ metalness: 0.1 }));
    /** @type {any} */(mesh).metalness = 5;
    animate(mesh, { metalness: 10, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(/** @type {any} */(mesh).metalness).to.equal(10);
    expect(mesh.material.metalness).to.equal(0.1);
  });

  // ShaderMaterial uniforms

  const makeShaderMaterial = () => new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uIntensity: { value: 1 },
      uTint: { value: new Color('#000000') },
      uOffset: { value: new Vector3(0, 0, 0) },
    },
    vertexShader: 'void main() { gl_Position = vec4(0.0); }',
    fragmentShader: 'void main() { gl_FragColor = vec4(0.0); }',
  });

  test('Routes scalar uniform via uniforms value on material', () => {
    const mat = makeShaderMaterial();
    animate(mat, { uTime: 5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.uniforms.uTime.value).to.equal(5);
  });

  test('Interpolates scalar uniform linearly', () => {
    const mat = makeShaderMaterial();
    animate(mat, { uIntensity: [0, 10], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(mat.uniforms.uIntensity.value).to.equal(5);
  });

  test('Routes color uniform from hex input via uniforms value', () => {
    const mat = makeShaderMaterial();
    animate(mat, { uTint: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.uniforms.uTint.value.r).to.be.closeTo(1, 1e-6);
    expect(mat.uniforms.uTint.value.g).to.be.closeTo(0, 1e-6);
    expect(mat.uniforms.uTint.value.b).to.be.closeTo(0, 1e-6);
  });

  test('Auto-detects scalar uniform on mesh material', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), makeShaderMaterial());
    animate(mesh, { uTime: [0, 10], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(mesh.material.uniforms.uTime.value).to.equal(5);
  });

  test('Auto-detects color uniform on mesh material', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), makeShaderMaterial());
    animate(mesh, { uTint: '#00ff00', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.material.uniforms.uTint.value.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.uniforms.uTint.value.g).to.be.closeTo(1, 1e-6);
    expect(mesh.material.uniforms.uTint.value.b).to.be.closeTo(0, 1e-6);
  });

  test('Animates vector uniform via OBJECT path on uniforms value', () => {
    const mat = makeShaderMaterial();
    animate(mat.uniforms.uOffset.value, { x: 5, y: -2, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.uniforms.uOffset.value.x).to.equal(5);
    expect(mat.uniforms.uOffset.value.y).to.equal(-2);
    expect(mat.uniforms.uOffset.value.z).to.equal(0);
  });

  test('Writes scalar uniform to every entry in material array', () => {
    const m1 = makeShaderMaterial();
    const m2 = makeShaderMaterial();
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { uIntensity: [1, 0], duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.uniforms.uIntensity.value).to.equal(0);
    expect(m2.uniforms.uIntensity.value).to.equal(0);
  });

  test('Writes color uniform to every entry in material array', () => {
    const m1 = makeShaderMaterial();
    const m2 = makeShaderMaterial();
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { uTint: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.uniforms.uTint.value.r).to.be.closeTo(1, 1e-6);
    expect(m2.uniforms.uTint.value.r).to.be.closeTo(1, 1e-6);
  });

  test('Direct material prop wins over uniform with same name', () => {
    const mat = makeShaderMaterial();
    /** @type {any} */(mat).uTime = 99;
    animate(mat, { uTime: [0, 10], duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(/** @type {any} */(mat).uTime).to.equal(10);
    expect(mat.uniforms.uTime.value).to.equal(0);
  });

  test('Direct material prop wins over uniform with same name via mesh', () => {
    const mat = makeShaderMaterial();
    /** @type {any} */(mat).uTime = 99;
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), mat);
    animate(mesh, { uTime: [0, 10], duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(/** @type {any} */(mat).uTime).to.equal(10);
    expect(mat.uniforms.uTime.value).to.equal(0);
  });

  // Vector axis decomposition (X / Y / Z / W suffix)

  const makeVectorShaderMaterial = () => new ShaderMaterial({
    uniforms: {
      uOffset: { value: new Vector3(0, 0, 0) },
      uPair:   { value: new Vector2(0, 0) },
      uVec4:   { value: new Vector4(0, 0, 0, 0) },
    },
    vertexShader: 'void main() { gl_Position = vec4(0.0); }',
    fragmentShader: 'void main() { gl_FragColor = vec4(0.0); }',
  });

  test('Decomposes Vector2 material prop normalScale to X, Y axes', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshStandardMaterial({ normalScale: new Vector2(1, 1) }));
    const ref = mesh.material.normalScale;
    animate(mesh, { normalScaleX: 0.5, normalScaleY: -0.5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.material.normalScale.x).to.equal(0.5);
    expect(mesh.material.normalScale.y).to.equal(-0.5);
    expect(mesh.material.normalScale).to.equal(ref);
  });

  test('Decomposes Vector3 uniform to X, Y, Z axes via material', () => {
    const mat = makeVectorShaderMaterial();
    const ref = mat.uniforms.uOffset.value;
    animate(mat, { uOffsetX: 5, uOffsetY: -2, uOffsetZ: 7, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.uniforms.uOffset.value.x).to.equal(5);
    expect(mat.uniforms.uOffset.value.y).to.equal(-2);
    expect(mat.uniforms.uOffset.value.z).to.equal(7);
    expect(mat.uniforms.uOffset.value).to.equal(ref);
  });

  test('Decomposes Vector3 uniform via mesh and lerps linearly', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), makeVectorShaderMaterial());
    animate(mesh, { uOffsetX: [0, 10], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(mesh.material.uniforms.uOffset.value.x).to.equal(5);
  });

  test('Writes Vector4 uniform W axis to w', () => {
    const mat = makeVectorShaderMaterial();
    animate(mat, { uVec4W: 9, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.uniforms.uVec4.value.w).to.equal(9);
  });

  test('Falls through OBJECT path on out-of-dim axis suffix', () => {
    const mat = makeVectorShaderMaterial();
    animate(mat, { uPairZ: 99, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.uniforms.uPair.value.x).to.equal(0);
    expect(mat.uniforms.uPair.value.y).to.equal(0);
    expect(/** @type {any} */(mat).uPairZ).to.equal(99);
  });

  test('Skips Quaternion decomposition to preserve unit-length invariant', () => {
    const mat = new MeshStandardMaterial();
    /** @type {any} */(mat).qrot = new Quaternion(0, 0, 0, 1);
    animate(mat, { qrotW: 0.5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(/** @type {any} */(mat).qrot.w).to.equal(1);
    expect(/** @type {any} */(mat).qrotW).to.equal(0.5);
  });

  test('Writes vector axis direct prop to every entry in material array', () => {
    const m1 = new MeshStandardMaterial({ normalScale: new Vector2(1, 1) });
    const m2 = new MeshStandardMaterial({ normalScale: new Vector2(1, 1) });
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { normalScaleX: 0.25, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.normalScale.x).to.equal(0.25);
    expect(m2.normalScale.x).to.equal(0.25);
  });

  test('Writes vector axis uniform to every entry in material array', () => {
    const m1 = makeVectorShaderMaterial();
    const m2 = makeVectorShaderMaterial();
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { uOffsetX: 3, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.uniforms.uOffset.value.x).to.equal(3);
    expect(m2.uniforms.uOffset.value.x).to.equal(3);
  });

  // TSL

  // Bare UniformNode

  test('Animates scalar UniformNode via value', () => {
    const u = uniform(0);
    animate(u, { value: [0, 10], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(u.value).to.equal(5);
  });

  test('Routes utils.set bool UniformNode via OBJECT fallthrough', () => {
    const u = uniform(false);
    utils.set(u, { value: true });
    expect(u.value).to.equal(1);
    utils.set(u, { value: false });
    expect(u.value).to.equal(0);
  });

  test('Animates color UniformNode via color', () => {
    const u = uniform(new Color('#000000'));
    animate(u, { color: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(u.value.r).to.be.closeTo(1, 1e-6);
    expect(u.value.g).to.be.closeTo(0, 1e-6);
    expect(u.value.b).to.be.closeTo(0, 1e-6);
  });

  test('Animates Vector3 UniformNode via x, y, z axes', () => {
    const u = uniform(new Vector3());
    animate(u, { x: 5, y: -2, z: 1, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(u.value.x).to.equal(5);
    expect(u.value.y).to.equal(-2);
    expect(u.value.z).to.equal(1);
  });

  test('Writes Vector4 UniformNode w axis to w', () => {
    const u = uniform(new Vector4());
    animate(u, { w: 7, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(u.value.w).to.equal(7);
  });

  // NodeMaterial slots

  const makeNodeMaterial = () => {
    const mat = new MeshStandardNodeMaterial();
    mat.colorNode     = uniform(new Color('#000000'));
    mat.metalnessNode = uniform(0);
    mat.opacityNode   = uniform(1);
    mat.offsetNode    = uniform(new Vector3(0, 0, 0));
    mat.flagNode      = uniform(false);
    return mat;
  };

  test('Animates NodeMaterial scalar slot via metalnessNode value', () => {
    const mat = makeNodeMaterial();
    animate(mat, { metalnessNode: [0, 1], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(mat.metalnessNode.value).to.equal(0.5);
  });

  test('Routes utils.set bool write to NodeMaterial slot value', () => {
    const mat = makeNodeMaterial();
    expect(resolveAdapterEntry(mat, 'flagNode')).to.not.equal(null);
    utils.set(mat, { flagNode: true });
    expect(mat.flagNode.value).to.equal(1);
    utils.set(mat, { flagNode: false });
    expect(mat.flagNode.value).to.equal(0);
  });

  test('Animates NodeMaterial color slot from hex via colorNode value', () => {
    const mat = makeNodeMaterial();
    animate(mat, { colorNode: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.colorNode.value.r).to.be.closeTo(1, 1e-6);
    expect(mat.colorNode.value.g).to.be.closeTo(0, 1e-6);
    expect(mat.colorNode.value.b).to.be.closeTo(0, 1e-6);
  });

  test('Decomposes NodeMaterial vector slot to X, Y, Z axes', () => {
    const mat = makeNodeMaterial();
    animate(mat, { offsetNodeX: 3, offsetNodeY: -1, offsetNodeZ: 2, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mat.offsetNode.value.x).to.equal(3);
    expect(mat.offsetNode.value.y).to.equal(-1);
    expect(mat.offsetNode.value.z).to.equal(2);
  });

  test('Auto-detects NodeMaterial scalar slot via mesh', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), makeNodeMaterial());
    animate(mesh, { metalnessNode: [0, 1], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(mesh.material.metalnessNode.value).to.equal(0.5);
  });

  test('Auto-detects NodeMaterial color slot via mesh', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), makeNodeMaterial());
    animate(mesh, { colorNode: '#00ff00', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.material.colorNode.value.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.colorNode.value.g).to.be.closeTo(1, 1e-6);
    expect(mesh.material.colorNode.value.b).to.be.closeTo(0, 1e-6);
  });

  test('Auto-detects NodeMaterial vector slot axis via mesh', () => {
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), makeNodeMaterial());
    animate(mesh, { offsetNodeY: 4, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.material.offsetNode.value.y).to.equal(4);
  });

  test('Writes NodeMaterial scalar slot to every entry in material array', () => {
    const m1 = makeNodeMaterial();
    const m2 = makeNodeMaterial();
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { metalnessNode: [0, 1], duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.metalnessNode.value).to.equal(1);
    expect(m2.metalnessNode.value).to.equal(1);
  });

  test('Writes NodeMaterial vector slot axis to every entry in material array', () => {
    const m1 = makeNodeMaterial();
    const m2 = makeNodeMaterial();
    const mesh = new Mesh(new BoxGeometry(1, 1, 1), [m1, m2]);
    animate(mesh, { offsetNodeY: 5, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(m1.offsetNode.value.y).to.equal(5);
    expect(m2.offsetNode.value.y).to.equal(5);
  });

  // Instance adapter

  test('Enumerates instances with stable ids, grows and shrinks in place, skips deleted BatchedMesh slots', () => {
    const m1 = createInstanced(3);
    const a = getInstances(m1);
    expect(a.length).to.equal(3);
    expect(a[0].id).to.equal(0);
    expect(a[1].id).to.equal(1);
    expect(a[2].id).to.equal(2);
    expect(getInstances(m1)).to.equal(a);
    const m2 = new InstancedMesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial(), 10);
    m2.count = 2;
    const grown = getInstances(m2);
    expect(grown.length).to.equal(2);
    m2.count = 4;
    const after = getInstances(m2);
    expect(after).to.equal(grown);
    expect(after.length).to.equal(4);
    expect(after[3]).to.not.equal(null);
    m2.count = 1;
    expect(getInstances(m2).length).to.equal(1);
    const bm = new BatchedMesh(4, 100, 100, new MeshBasicMaterial());
    const geomId = bm.addGeometry(new BoxGeometry(1, 1, 1));
    const bid1 = bm.addInstance(geomId);
    const bid2 = bm.addInstance(geomId);
    bm.deleteInstance(bid1);
    const bins = getInstances(bm);
    expect(bins[bid1]).to.equal(null);
    expect(bins[bid2]).to.not.equal(null);
    expect(bins[bid2].id).to.equal(bid2);
  });

  test('Writes instance matrix and decomposes seeded matrix, dirty flag coalesces', () => {
    const mesh = createInstanced(2);
    const seeded = new Matrix4().compose(new Vector3(5, 10, 15), new Quaternion(), new Vector3(2, 2, 2));
    mesh.setMatrixAt(0, seeded);
    const instances = getInstances(mesh);
    expect(instances[0].x).to.equal(5);
    expect(instances[0].y).to.equal(10);
    expect(instances[0].z).to.equal(15);
    expect(instances[0].scale).to.equal(2);
    animate(instances[1], { x: 5, y: 6, z: 7, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    commitChanges(mesh);
    const m = new Matrix4();
    mesh.getMatrixAt(1, m);
    expect(m.elements[12]).to.equal(5);
    expect(m.elements[13]).to.equal(6);
    expect(m.elements[14]).to.equal(7);
    instances[1]._dirty = 0;
    instances[1].x = 1;
    instances[1].y = 2;
    instances[1].z = 3;
    expect(instances[1]._dirty).to.equal(1);
    instances[1].rotateY = 30;
    expect(instances[1]._dirty).to.equal(1 | 2);
    instances[1].scaleX = 2;
    expect(instances[1]._dirty).to.equal(1 | 2 | 4);
    animate(instances[0], { scale: 0, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    commitChanges(mesh);
    const zero = new Matrix4();
    mesh.getMatrixAt(0, zero);
    expect(zero.elements[0]).to.equal(0);
    expect(zero.elements[5]).to.equal(0);
    expect(zero.elements[10]).to.equal(0);
  });

  test('Flushes instance writes via commitChanges and onBeforeRender, chains user handler', () => {
    const mesh = createInstanced(1);
    const instances = getInstances(mesh);
    const v0 = mesh.instanceMatrix.version;
    instances[0].x = 7;
    expect(mesh.instanceMatrix.version).to.equal(v0);
    commitChanges(mesh);
    expect(mesh.instanceMatrix.version).to.be.greaterThan(v0);
    const m = new Matrix4();
    mesh.getMatrixAt(0, m);
    expect(m.elements[12]).to.equal(7);
    const v1 = mesh.instanceMatrix.version;
    instances[0].x = 11;
    let userCalled = false;
    mesh.onBeforeRender = () => { userCalled = true; };
    mesh.onBeforeRender(null, null, null, null, null, null);
    expect(mesh.instanceMatrix.version).to.be.greaterThan(v1);
    expect(userCalled).to.equal(true);
    const m2 = new Matrix4();
    mesh.getMatrixAt(0, m2);
    expect(m2.elements[12]).to.equal(11);
    const fn = () => {};
    mesh.onBeforeRender = fn;
    expect(mesh.onBeforeRender).to.not.equal(fn);
  });

  test('Composes rotated matrix from instance rotation', () => {
    const mesh = createInstanced(1);
    const instances = getInstances(mesh);
    animate(instances[0], { rotateY: 90, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    commitChanges(mesh);
    const m = new Matrix4();
    mesh.getMatrixAt(0, m);
    // 90 deg Y rotation matrix: m00 = cos = 0, m02 = sin = 1, m20 = -sin = -1, m22 = cos = 0.
    expect(m.elements[0]).to.be.closeTo(0, 1e-6);
    expect(m.elements[2]).to.be.closeTo(-1, 1e-6);
    expect(m.elements[8]).to.be.closeTo(1, 1e-6);
    expect(m.elements[10]).to.be.closeTo(0, 1e-6);
  });

  test('Writes instance opacity to parent shared material', () => {
    const mesh = createInstanced(2);
    const instances = getInstances(mesh);
    animate(instances[0], { opacity: 0.25, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.material.opacity).to.equal(0.25);
  });

  test('Writes instance color to InstancedMesh instanceColor', () => {
    const mesh = createInstanced(2);
    const instances = getInstances(mesh);
    animate(instances[0], { color: '#ff0000', duration: 100, ease: 'linear', autoplay: false }).seek(100);
    expect(mesh.instanceColor).to.not.equal(null);
    expect(mesh.instanceColor.version).to.be.greaterThan(0);
    const c = new Color();
    mesh.getColorAt(0, c);
    expect(c.r).to.be.closeTo(1, 1e-6);
    expect(c.g).to.be.closeTo(0, 1e-6);
    expect(c.b).to.be.closeTo(0, 1e-6);
  });

  test('Writes BatchedMesh instance visible via setVisibleAt and getVisibleAt', () => {
    const bm = new BatchedMesh(2, 100, 100, new MeshBasicMaterial());
    const geomId = bm.addGeometry(new BoxGeometry(1, 1, 1));
    const bid = bm.addInstance(geomId);
    const bins = getInstances(bm);
    bins[bid].visible = false;
    expect(bm.getVisibleAt(bid)).to.equal(false);
    bins[bid].visible = true;
    expect(bm.getVisibleAt(bid)).to.equal(true);
  });

  test('Writes slot matrix from BatchedMesh instance position', () => {
    const bm = new BatchedMesh(2, 100, 100, new MeshBasicMaterial());
    const geomId = bm.addGeometry(new BoxGeometry(1, 1, 1));
    const bid = bm.addInstance(geomId);
    const bins = getInstances(bm);
    animate(bins[bid], { x: 9, y: -3, z: 4, duration: 100, ease: 'linear', autoplay: false }).seek(100);
    commitChanges(bm);
    const m = new Matrix4();
    bm.getMatrixAt(bid, m);
    expect(m.elements[12]).to.equal(9);
    expect(m.elements[13]).to.equal(-3);
    expect(m.elements[14]).to.equal(4);
  });

  test('Applies stagger offsets per instance', () => {
    const mesh = createInstanced(3);
    const instances = getInstances(mesh);
    const animation = animate(instances, {
      x: 10,
      delay: utils.stagger(100),
      duration: 100,
      ease: 'linear',
      autoplay: false,
    });
    animation.seek(100);
    expect(instances[0].x).to.equal(10);
    expect(instances[1].x).to.equal(0);
    expect(instances[2].x).to.equal(0);
    animation.seek(200);
    expect(instances[1].x).to.equal(10);
    expect(instances[2].x).to.equal(0);
    animation.seek(300);
    expect(instances[2].x).to.equal(10);
  });

  // Timeline composition

  test('Chains color across sibling timeline adds from previous end-color', () => {
    const mesh = createMesh('#000000');
    const tl = createTimeline({ autoplay: false, defaults: { duration: 100, ease: 'linear' } })
      .add(mesh, { color: '#ff0000' })
      .add(mesh, { color: '#00ff00' })
      .add(mesh, { color: '#0000ff' });
    tl.seek(100);
    expect(mesh.material.color.r).to.be.closeTo(1, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    tl.seek(150);
    expect(mesh.material.color.r).to.be.closeTo(expectedChannel(255, 0, 0.5), 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(expectedChannel(0, 255, 0.5), 1e-6);
    tl.seek(200);
    expect(mesh.material.color.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(1, 1e-6);
    tl.seek(250);
    expect(mesh.material.color.g).to.be.closeTo(expectedChannel(255, 0, 0.5), 1e-6);
    expect(mesh.material.color.b).to.be.closeTo(expectedChannel(0, 255, 0.5), 1e-6);
    tl.seek(300);
    expect(mesh.material.color.b).to.be.closeTo(1, 1e-6);
  });

  test('Overlapping color add overrides previous in timeline', () => {
    const mesh = createMesh('#000000');
    const tl = createTimeline({ autoplay: false, defaults: { duration: 200, ease: 'linear' } })
      .add(mesh, { color: '#ff0000' })
      .add(mesh, { color: '#00ff00', duration: 100 }, '-=100');
    // First add at 25% of its 200ms updateDuration before the override kicks in.
    tl.seek(50);
    expect(mesh.material.color.r).to.be.closeTo(expectedChannel(0, 255, 0.25), 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(0, 1e-6);
    // Override boundary at t=100 snapshots the first tween's mid-frame value as the second tween's from-color. The render path composes the snapshot through `rgba(${round(...,0)},...)`, so the channel is rounded to an integer before chaining.
    tl.seek(150);
    const overrideFromR = Math.round(Math.sqrt(255 * 255 * 0.5));
    expect(mesh.material.color.r).to.be.closeTo(expectedChannel(overrideFromR, 0, 0.5), 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(expectedChannel(0, 255, 0.5), 1e-6);
    tl.seek(tl.duration);
    expect(mesh.material.color.r).to.be.closeTo(0, 1e-6);
    expect(mesh.material.color.g).to.be.closeTo(1, 1e-6);
  });

  test('transformOrigin animates under any composition mode', () => {
    const readOrigin = (t) => resolveAdapterEntry(t, 'transformOrigin').get(t).split(' ').map(Number);
    // Control: default composition replace interpolates the origin triplet.
    const meshReplace = createMesh();
    animate(meshReplace, { transformOrigin: ['0 0 0', '10 20 30'], duration: 100, ease: 'linear', autoplay: false }).seek(50);
    expect(readOrigin(meshReplace)).to.deep.equal([5, 10, 15]);
    // composition none must interpolate identically. The setter reads tween _numbers, which
    // composeComplexValue only refreshes when composition is not none, so the origin freezes at its from triplet.
    const meshNone = createMesh();
    animate(meshNone, { transformOrigin: ['0 0 0', '10 20 30'], duration: 100, ease: 'linear', autoplay: false, composition: 'none' }).seek(50);
    expect(readOrigin(meshNone)).to.deep.equal([5, 10, 15]);
  });

});

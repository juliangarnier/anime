import { waapi, animate, createTimer, utils, engine } from '../../../dist/modules/index.js';

import {
  Object3D,
  Vector3,
  Color,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  InstancedMesh,
  Scene,
  WebGLRenderer,
} from '../../../node_modules/three/build/three.module.min.js';

// engine.frameRate = 30;

// engine.suspendWhenHidden = false;

const noop = () => {};
const url = new URL(window.location.href);
const urlParams = url.searchParams;
const $particlesContainer = /** @type {HTMLElement} */ (document.querySelector('#particles-container'));
const $countRange = /** @type {HTMLInputElement} */ (document.querySelector('#count-range'));
const $restartButton = /** @type {HTMLButtonElement} */ (document.querySelector('#restart-button'));
const $activeTweens = document.querySelector('#active-tweens');
const $configItems = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('.config-item'));
const startedSymbol = Symbol();
const reversedSymbol = Symbol();
const duration = 4000;
const ease = 'linear';
const particleDiameter = 10;

const AnimeTransformMode = {
  minCount: 500,
  maxCount: 10000,
  defaultCount: 1500,
  step: 500,
};

const AnimeWAAPITransformMode = {
  minCount: 500,
  maxCount: 10000,
  defaultCount: 1500,
  step: 500,
};

const WAAPITransformMode = {
  minCount: 500,
  maxCount: 10000,
  defaultCount: 1500,
  step: 500,
};

const webglThreejsMode = {
  minCount: 5000,
  maxCount: 100000,
  defaultCount: 10000,
  step: 5000,
};

const renderModes = {
  'css-transform': AnimeTransformMode,
  'anime-waapi-css-transform': AnimeWAAPITransformMode,
  'wappi-css-transform': WAAPITransformMode,
  'webgl-threejs': webglThreejsMode,
};

const config = {
  mode: urlParams.get('mode') || 'css-transform',
  count: urlParams.get('count') !== null ? +urlParams.get('count') : 1500,
  x: urlParams.get('x') !== null ? urlParams.get('x') === 'true' : true,
  y: urlParams.get('y') !== null ? urlParams.get('y') === 'true' : true,
  rotation: urlParams.get('rotation') !== null ? urlParams.get('rotation') === 'true' : false,
  scale: urlParams.get('scale') !== null ? urlParams.get('scale') === 'true' : false,
}

let containerRect = $particlesContainer.getBoundingClientRect();
let containerW = containerRect.width;
let containerH = containerRect.height;
let W = containerW;
let H = containerH;
let halfW = W * .5;
let halfH = H * .5;
let maxScale = 1;

// Tweens values factories

function getRandomX(el) {
  return el[reversedSymbol] || el.reversed ? Math.random() > .5 ? -halfW : halfW : -halfW + Math.random() * W;
}

function getRandomY(el) {
  return el[reversedSymbol] || el.reversed ? -halfH + Math.random() * H : Math.random() > .5 ? -halfH : halfH;
}

function getRandomScale() {
  return (.25 + (Math.random() * .75)) * maxScale;
}

function getRandomRad() {
  return -Math.PI + (Math.random() * (2 * Math.PI));
}

function getRandomDeg() {
  return -180 + (Math.random() * 360);
}

function getBeginOffset(i) {
  return i * ((duration) / config.count);
}


// Anime.js CSS Transform mode

AnimeTransformMode.init = () => {

  if (AnimeTransformMode.isInitialized) return;

  AnimeTransformMode.isInitialized = true;

  function createParticule() {
    const $el = document.createElement('div');
    $el.classList.add('particle');
    $el.classList.add(`color${(1 + (Math.random() * 2)).toFixed()}`);
    $el[reversedSymbol] = !!utils.random(0, 1);
    return $el;
  }

  function animateParticle($el, i) {
    let delay = 0;
    $el[reversedSymbol] = !$el[reversedSymbol];
    if (!$el[startedSymbol]) {
      $el[startedSymbol] = true;
      delay = getBeginOffset(i);
    }
    const params = {
      delay,
      duration,
      ease,
      composition: 'none',
      onComplete: () => animateParticle($el, i),
    };
    if (config.x) params.x = getRandomX($el);
    if (config.y) params.y = getRandomY($el);
    if (config.rotation) params.rotate = getRandomDeg();
    if (config.scale) params.scale = getRandomScale();
    animate($el, params);
  }

  AnimeTransformMode.cancel = () => {
    const $particles = document.querySelectorAll('.particle');
    utils.remove($particles);
    $particlesContainer.innerHTML = '';
  }

  AnimeTransformMode.refresh = () => {
    maxScale = utils.clamp(AnimeTransformMode.maxCount / config.count, .125, 5);
    for (let i = 0; i < config.count; i++) {
      const $el = createParticule();
      $particlesContainer.appendChild($el);
      animateParticle($el, i);
    }
  }

  AnimeTransformMode.resize = () => {
    W = containerW;
    H = containerH;
    halfW = W * .5;
    halfH = H * .5;
  }
}

// Anime.js + WAAPI CSS Transform mode

AnimeWAAPITransformMode.init = () => {

  if (AnimeWAAPITransformMode.isInitialized) return;

  AnimeWAAPITransformMode.isInitialized = true;

  function createParticule() {
    const $el = document.createElement('div');
    $el.classList.add('particle');
    $el.classList.add(`color${(1 + (Math.random() * 2)).toFixed()}`);
    $el[reversedSymbol] = !!utils.random(0, 1);
    return $el;
  }

  function animateParticle($el, i) {
    let delay = 0;
    $el[reversedSymbol] = !$el[reversedSymbol];
    if (!$el[startedSymbol]) {
      $el[startedSymbol] = true;
      delay = getBeginOffset(i);
    }
    const params = {
      delay,
      duration,
      ease,
      onComplete: () => animateParticle($el, i),
    };
    let transform = ``;

    if (config.x) transform += `translateX(${getRandomX($el)}px) `;
    if (config.y) transform += `translateY(${getRandomY($el)}px) `;
    if (config.rotation) transform += `rotate(${getRandomDeg()}deg) `;
    if (config.scale) transform += `scale(${getRandomScale()}) `;

    params.transform = transform;

    waapi.animate($el, params);
  }

  AnimeWAAPITransformMode.cancel = () => {
    const animations = document.getAnimations();
    animations.forEach(animation => { animation.cancel() });
    $particlesContainer.innerHTML = '';
  }

  AnimeWAAPITransformMode.refresh = () => {
    maxScale = utils.clamp(AnimeWAAPITransformMode.maxCount / config.count, .125, 5);
    for (let i = 0; i < config.count; i++) {
      const $el = createParticule();
      $particlesContainer.appendChild($el);
      animateParticle($el, i);
    }
  }

  AnimeWAAPITransformMode.resize = () => {
    W = containerW;
    H = containerH;
    halfW = W * .5;
    halfH = H * .5;
  }
}

// WAAPI CSS Transform mode

WAAPITransformMode.init = () => {

  if (WAAPITransformMode.isInitialized) return;

  WAAPITransformMode.isInitialized = true;

  function createParticule() {
    const $el = document.createElement('div');
    $el.classList.add('particle');
    $el.classList.add(`color${(1 + (Math.random() * 2)).toFixed()}`);
    $el[reversedSymbol] = !!utils.random(0, 1);
    return $el;
  }

  function animateParticle($el, i) {
    let delay = 0;
    $el[reversedSymbol] = !$el[reversedSymbol];
    if (!$el[startedSymbol]) {
      $el[startedSymbol] = true;
      delay = getBeginOffset(i);
    }

    let transform = ``;

    if (config.x) transform += `translateX(${getRandomX($el)}px) `;
    if (config.y) transform += `translateY(${getRandomY($el)}px) `;
    if (config.rotation) transform += `rotate(${getRandomDeg()}deg) `;
    if (config.scale) transform += `scale(${getRandomScale()}) `;

    const anim = $el.animate({ transform }, {
      delay,
      duration,
      easing: ease,
      fill: 'forwards',
    });
    anim.onfinish = () => {
      // $el.style.transform = transform;

      // commitStyles() and cancel() have a huge impact on performance, but it simulates a real world usecase where you want to make sure the animations are properly removed
      anim.commitStyles();
      anim.cancel();
      animateParticle($el, i);
    }
  }

  WAAPITransformMode.cancel = () => {
    const animations = document.getAnimations();
    animations.forEach(animation => { animation.cancel() });
    $particlesContainer.innerHTML = '';
  }

  WAAPITransformMode.refresh = () => {
    maxScale = utils.clamp(WAAPITransformMode.maxCount / config.count, .125, 5);
    for (let i = 0; i < config.count; i++) {
      const $el = createParticule();
      $particlesContainer.appendChild($el);
      animateParticle($el, i);
    }
  }

  WAAPITransformMode.resize = () => {
    W = containerW;
    H = containerH;
    halfW = W * .5;
    halfH = H * .5;
  }
}

// WebGL Three.js mode

webglThreejsMode.init = () => {

  if (webglThreejsMode.isInitialized) return;

  webglThreejsMode.isInitialized = true;

  class InstancedMeshProxy {
    constructor(count) {
      this.index = 0;
      this._x = new Float32Array(count);
      this._y = new Float32Array(count);
      this._rotation = new Float32Array(count);
      this._scale = new Float32Array(count);
      this._started = new Int8Array(count);
      this._reversed = new Int8Array(count);
    }
    set x(v) { this._x[this.index] = v; }
    get x()  { return this._x[this.index]; }
    set y(v) { this._y[this.index] = v; }
    get y()  { return this._y[this.index]; }
    set rotation(v) { this._rotation[this.index] = v; }
    get rotation()  { return this._rotation[this.index]; }
    set scale(v) { this._scale[this.index] = v; }
    get scale()  { return this._scale[this.index]; }
    set started(v) { this._started[this.index] = v; }
    get started()  { return this._started[this.index]; }
    set reversed(v) { this._reversed[this.index] = v; }
    get reversed()  { return this._reversed[this.index]; }
  }

  const dummy = new Object3D();

  const camera = new PerspectiveCamera(60, containerW / containerH, 1, 150);
  camera.position.set(0, 0, -150);
  camera.lookAt(0, 0, 0);

  const geometry = new BoxGeometry(1, 1, 1);
  // const geometry = new SphereGeometry(1, 6, 3);
  const material = new MeshBasicMaterial();
  const mesh = new InstancedMesh(geometry, material, webglThreejsMode.maxCount);
  const meshProxy = new InstancedMeshProxy(webglThreejsMode.maxCount);

  const scene = new Scene();
  scene.add(mesh);

  const renderer = new WebGLRenderer({
    antialias: false,
    powerPreference: 'high-performance',
  });

  renderer.setPixelRatio(1);
  renderer.setSize(containerW, containerH);

  const renderLoop = createTimer({
    onUpdate: () => renderer.render(scene, camera),
    autoplay: false,
  });

  const screenCoords = new Vector3();
  const worldCoords = new Vector3();

  const colors = [new Color('#FF4B4B'), new Color('#9F3A39'), new Color('#CF4242')];

  function renderMesh(i) {
    meshProxy.index = i;
    dummy.position.set(meshProxy.x, meshProxy.y, 0);
    const r = meshProxy.rotation;
    dummy.rotation.set(r, r, r);
    const s = meshProxy.scale;
    dummy.scale.set(s, s, s);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.instanceMatrix.needsUpdate = true;
  }

  function animateParticle(i, l) {
    meshProxy.index = i;
    meshProxy.reversed = ~~!meshProxy.reversed;
    let delay = 0;
    const started = meshProxy.started;
    if (!started) {
      meshProxy.started = 1;
      delay = getBeginOffset(i);
    }
    const params = {
      composition: 'none', // Needed to avoid overiding proxy tweens
      delay,
      duration,
      ease,
      onRender: () => renderMesh(i),
      onUpdate: () => meshProxy.index = i,
      onComplete: self => {
        animateParticle(i, l);
      },
    };
    if (config.x) params.x = getRandomX(meshProxy);
    if (config.y) params.y = getRandomY(meshProxy);
    if (config.rotation) params.rotation = getRandomRad();
    if (config.scale) params.scale = getRandomScale();
    animate(meshProxy, params);
  }

  webglThreejsMode.cancel = () => {
    for (let i = 0; i < webglThreejsMode.maxCount; i++) {
      meshProxy.index = i;
      meshProxy.x = 0;
      meshProxy.y = 0;
      meshProxy.rotation = 0;
      meshProxy.scale = 0;
      meshProxy.started = 0;
      meshProxy.reversed = 0;
      renderMesh(i);
    }
    utils.remove(meshProxy);
    renderLoop.pause();
  }

  webglThreejsMode.refresh = () => {
    if (!$particlesContainer.querySelector('canvas')) {
      $particlesContainer.appendChild(renderer.domElement);
    }
    maxScale = utils.clamp(webglThreejsMode.maxCount / config.count, .25, 2);
    for (let i = 0; i < config.count; i++) {
      meshProxy.index = i;
      meshProxy.scale = maxScale;
      meshProxy.rotation = Math.PI * .2;
      meshProxy.reversed = utils.random(0, 1);
      mesh.setColorAt(i, utils.randomPick(colors));
      animateParticle(i, config.count);
    }
    mesh.instanceColor.needsUpdate = true;
    renderLoop.play();
  }

  webglThreejsMode.resize = () => {
    camera.aspect = containerW / containerH;
    camera.updateProjectionMatrix();
    renderer.setSize(containerW, containerH);
    screenCoords.set(2, 2, .5);
    screenCoords.unproject(camera);
    screenCoords.sub(camera.position).normalize();
    worldCoords.copy(camera.position).add(screenCoords.multiplyScalar(-camera.position.z / screenCoords.z));
    W = worldCoords.x;
    H = worldCoords.y;
    halfW = W * .5;
    halfH = H * .5;
  }
}


// Init and controls

function updateTweensCount() {
  $activeTweens.textContent = `
    ${config.count * (~~config.x + ~~config.y + ~~config.rotation + ~~config.scale)}
  `;
}

function updateUI() {
  $configItems.forEach($item => {
    if ($item.name === 'mode') {
      $item.checked = $item.value === config[$item.name];
    }
    if ($item.name === 'count') {
      $item.value = `${config.count}`;
    }
    if ($item.name === 'tween') {
      $item.checked = config[$item.value];
    }
  });
  updateTweensCount();
}

function restartActiveDemo() {
  const activeMode = renderModes[config.mode];
  activeMode.init();
  activeMode.cancel();
  activeMode.resize();
  activeMode.refresh();
}

function activateMode(modeName) {
  const selectedMode = renderModes[config.mode];
  if (selectedMode && selectedMode.isInitialized) {
    selectedMode.cancel();
  }
  config.mode = modeName;
  const activeMode = renderModes[modeName];
  if (config.count > activeMode.maxCount || config.count < activeMode.minCount) {
    config.count = activeMode.defaultCount;
  }
  $countRange.setAttribute('min', activeMode.minCount);
  $countRange.setAttribute('max', activeMode.maxCount);
  $countRange.setAttribute('step', activeMode.step);
  restartActiveDemo();
  updateUI();
}

function updateUrl() {
  for (let name in config) {
    url.searchParams.set(name, config[name]);
  }
  window.history.replaceState(null, null, url);
}

function onLoad() {
  activateMode(config.mode);
  updateUI();
  updateUrl();
}

function onConfigItemChange() {
  if (this.name === 'mode') {
    activateMode(this.value);
  }
  if (this.name === 'count') {
    config.count = this.value;
    renderModes[config.mode].cancel();
    renderModes[config.mode].refresh();
    updateUI();
  }
  if (this.name === 'tween') {
    config[this.value] = this.checked;
    updateTweensCount();
  }
  updateUrl();
  resetAverageFps();
}

function onRangeInput() {
  config.count = +$countRange.value;
  updateUrl();
  updateUI();
}

function onResize() {
  containerRect = $particlesContainer.getBoundingClientRect();
  containerW = containerRect.width;
  containerH = containerRect.height;
  renderModes[config.mode].resize();
}

$configItems.forEach($item => $item.onchange = onConfigItemChange);
$countRange.oninput = onRangeInput;
$restartButton.onclick = restartActiveDemo;
window.onload = onLoad;
window.onresize = onResize;


// MONITOR
// Calculating FPS past requestAnimationFrame limit with requestIdleCallback
// https://www.clicktorelease.com/blog/calculating-fps-with-requestIdleCallback/

const $fps = /** @type {HTMLInputElement} */ (document.getElementById('fps'));
const $avg = /** @type {HTMLInputElement} */ (document.getElementById('avg'));

let t = Date.now();
let hasrICBeenCalledForThisFrame = null;
let frames = 0;
let rICFPS = 0;
let fps = 0;
let activateAverage = false;
let averageFPS = null;
let mixedFPS = 0;
let previousMixedFPS = 0;
let maxScreenRefreshRate = 60;

function fpsCallback(d) {
  const goal = 1000 / maxScreenRefreshRate;
  const elapsed = goal - d.timeRemaining();
  rICFPS = goal * maxScreenRefreshRate / elapsed;
  hasrICBeenCalledForThisFrame = true;
}

function updateFpsMeter(fps) {
  $fps.value = fps.toFixed(2);
  if (!activateAverage) return;
  if (averageFPS === null) {
    averageFPS = mixedFPS;
  } else {
    averageFPS += (previousMixedFPS - averageFPS) * .1;
  }
  previousMixedFPS = mixedFPS;
}

function updateAverageFpsMeter(fps) {
  if (!activateAverage) return;
  $avg.value = averageFPS.toFixed(2);
}

const reqIdleCallback = window.requestIdleCallback ? requestIdleCallback : () => {};

function updateFps() {
  const dt = Date.now() - t;
  if (dt > 1000) {
    fps = frames * 1000 / dt;
    frames = 0;
    t = Date.now();
  }
  mixedFPS = hasrICBeenCalledForThisFrame ? rICFPS : fps;
  hasrICBeenCalledForThisFrame = false;
  requestAnimationFrame(updateFps);
  reqIdleCallback(fpsCallback);
  frames++;
}

updateFps();

setInterval(() => { updateFpsMeter(mixedFPS) }, 500);
setInterval(() => { updateAverageFpsMeter(mixedFPS) }, 2000);

function resetAverageFps() {
  averageFPS = null;
  activateAverage = false;
  $avg.value = '00.00';
  setTimeout(() => { activateAverage = true; }, 2000);
}

resetAverageFps();


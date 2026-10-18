/**
 * Anime.js - adapters - CJS
 * @version v4.5.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var three = require('three');
var number = require('../../utils/number.cjs');
var adapter = require('./adapter.cjs');
var helpers = require('./helpers.cjs');

/**
 * `Object3D` adapter. Maps flat properties (position, rotation, scale, opacity, color, visible, light / audio / camera specifics) onto the matching three.js fields, and auto-detects material props (direct / uniform / TSL `UniformNode`) on the target's `material` at tween creation.
 */


const colorTarget = (t) => t.isLight ? t : t.material;

// Per-mesh skew and transformOrigin state, stored under a private symbol so we add one hidden property instead of polluting the Object3D surface with seven underscored fields.
const skewSymbol = Symbol('animejs.skewOrigin');

// Fallback opacity storage for Object3D targets without a material such as Groups or CSS2DObjects.
// Without it reads always return the default 1, so reverse-direction tweens between two non-default values collapse to a no-op delta and the visibility flip never fires on the way back.
const opacitySymbol = Symbol('animejs.opacity');

/**
 * Sets `o.visible` based on opacity and current scale. If `opacity` is omitted, reads it from `o.material` (defaults to `1` when no material is present).
 *
 * @param {Object3D & { material?: import('three').Material | import('three').Material[] }} o
 * @param {number} [opacity]
 */
function setVisibility(o, opacity) {
  if (opacity === undefined) {
    if (o.material) {
      opacity = helpers.readScalar(o.material, 'opacity', helpers.PATH_DIRECT, 1);
    } else {
      const v = o[opacitySymbol];
      opacity = v === undefined ? 1 : v;
    }
  }
  const s = o.scale;
  o.visible = !!(opacity && s.x && s.y && s.z);
}

/**
 * Installs a per-mesh `updateMatrix` override on first skew / transformOrigin write. The override calls the original three.js compose, then patches the result with `applySkewOrigin` whenever any axis is non-zero. Idempotent.
 *
 * @param {any} mesh
 * @return {{ skewX: number, skewY: number, skewZ: number, originX: number, originY: number, originZ: number }}
 */
function installSkewMatrix(mesh) {
  let s = mesh[skewSymbol];
  if (s) return s;
  s = mesh[skewSymbol] = { skewX: 0, skewY: 0, skewZ: 0, originX: 0, originY: 0, originZ: 0 };
  const original = mesh.updateMatrix;
  mesh.updateMatrix = function () {
    original.call(this);
    const st = this[skewSymbol];
    if (st.skewX !== 0 || st.skewY !== 0 || st.skewZ !== 0 || st.originX !== 0 || st.originY !== 0 || st.originZ !== 0) {
      helpers.applySkewOrigin(this.matrix.elements, st.skewX, st.skewY, st.skewZ, st.originX, st.originY, st.originZ);
    }
  };
  return s;
}

const threeObject3D = adapter.threeAdapter.registerTargetAdapter((t) => t instanceof three.Object3D);

// Position
threeObject3D.registerProperty('x', (t) => t.position.x, (t, v) => { t.position.x = v; });
threeObject3D.registerProperty('y', (t) => t.position.y, (t, v) => { t.position.y = v; });
threeObject3D.registerProperty('z', (t) => t.position.z, (t, v) => { t.position.z = v; });

// Rotation in degrees
threeObject3D.registerProperty('rotateX', (t) => number.radToDeg(t.rotation.x), (t, v) => { t.rotation.x = number.degToRad(v); });
threeObject3D.registerProperty('rotateY', (t) => number.radToDeg(t.rotation.y), (t, v) => { t.rotation.y = number.degToRad(v); });
threeObject3D.registerProperty('rotateZ', (t) => number.radToDeg(t.rotation.z), (t, v) => { t.rotation.z = number.degToRad(v); });

// Scale per-axis and uniform
threeObject3D.registerProperty('scaleX', (t) => t.scale.x, (t, v) => { t.scale.x = v; setVisibility(t); });
threeObject3D.registerProperty('scaleY', (t) => t.scale.y, (t, v) => { t.scale.y = v; setVisibility(t); });
threeObject3D.registerProperty('scaleZ', (t) => t.scale.z, (t, v) => { t.scale.z = v; setVisibility(t); });
threeObject3D.registerProperty('scale',
  (t) => t.scale.x,
  (t, v) => {
    t.scale.x = v; t.scale.y = v; t.scale.z = v;
    setVisibility(t);
  },
);

// Material
threeObject3D.registerProperty('visible', (t) => t.visible, (t, v) => { t.visible = !!v; });
threeObject3D.registerProperty('opacity',
  (t) => {
    if (t.material) return helpers.readScalar(t.material, 'opacity', helpers.PATH_DIRECT, 1);
    const v = t[opacitySymbol];
    return v === undefined ? 1 : v;
  },
  (t, v) => {
    if (t.material) helpers.writeScalar(t.material, 'opacity', v, helpers.PATH_DIRECT);
    else t[opacitySymbol] = v;
    setVisibility(t, v);
  },
  (t) => !t.isLight,
);
threeObject3D.registerProperty('color',
  (t) => helpers.readColorAt(colorTarget(t), 'color', helpers.PATH_DIRECT),
  (t, _, tw) => helpers.writeColorAt(colorTarget(t), 'color', tw._numbers, helpers.PATH_DIRECT),
);

// HemisphereLight
threeObject3D.registerProperty('groundColor',
  (t) => helpers.readColorAt(t, 'groundColor', helpers.PATH_DIRECT),
  (t, _, tw) => helpers.writeColorAt(t, 'groundColor', tw._numbers, helpers.PATH_DIRECT),
  (t) => !!t.groundColor,
);

// Scene background, lazily initializes scene background to a Color on first write so the user does not have to set one upfront.
threeObject3D.registerProperty('background',
  (t) => {
    const bg = /** @type {any} */(t).background;
    return bg && bg.isColor ? helpers.readColorHex(bg) : '#000000';
  },
  (t, _, tw) => {
    const scene = /** @type {any} */(t);
    let bg = scene.background;
    if (!bg || !bg.isColor) {
      bg = new three.Color();
      scene.background = bg;
    }
    const ns = tw._numbers;
    bg.setRGB(ns[0] * helpers.COLOR_NORM, ns[1] * helpers.COLOR_NORM, ns[2] * helpers.COLOR_NORM, three.SRGBColorSpace);
  },
  (t) => !!t.isScene,
);

// Method-bridged props for Audio and PerspectiveCamera focalLength, read via getXxx and write via setXxx.
const registerMethodProp = (apiName, getter, setter, gate) => {
  threeObject3D.registerProperty(apiName,
    (t) => t[getter](),
    (t, v) => { t[setter](v); },
    (t) => !!t[gate],
  );
};
registerMethodProp('volume', 'getVolume', 'setVolume', 'setVolume');
// PositionalAudio
registerMethodProp('refDistance', 'getRefDistance', 'setRefDistance', 'setRefDistance');
registerMethodProp('rolloffFactor', 'getRolloffFactor', 'setRolloffFactor', 'setRefDistance');
registerMethodProp('maxDistance', 'getMaxDistance', 'setMaxDistance', 'setRefDistance');
// PerspectiveCamera
registerMethodProp('focalLength', 'getFocalLength', 'setFocalLength', 'setFocalLength');

// Camera projection-update props, setter writes the value then calls updateProjectionMatrix.
const registerCameraProp = (apiName, gate) => {
  threeObject3D.registerProperty(apiName,
    (t) => t[apiName],
    (t, v) => { t[apiName] = v; t.updateProjectionMatrix(); },
    gate,
  );
};
const isPersp = (t) => !!t.isPerspectiveCamera;
const isOrtho = (t) => !!t.isOrthographicCamera;
registerCameraProp('fov', isPersp);
registerCameraProp('aspect', isPersp);
registerCameraProp('left', isOrtho);
registerCameraProp('right', isOrtho);
registerCameraProp('top', isOrtho);
registerCameraProp('bottom', isOrtho);

// Skew in degrees and transform-origin in object-space.
// Patches mesh updateMatrix on first write so the standard PRS compose is followed by an in-place skew and origin shift.
// Reads default to 0 for meshes that have never been written.
/**
 * @param {String} apiName
 * @param {String} key
 */
const registerSkewProp = (apiName, key) => {
  threeObject3D.registerProperty(apiName,
    (t) => { const s = /** @type {any} */(t)[skewSymbol]; return s ? s[key] : 0; },
    (t, v) => { installSkewMatrix(t)[key] = v; },
  );
};
registerSkewProp('skewX', 'skewX');
registerSkewProp('skewY', 'skewY');
registerSkewProp('skewZ', 'skewZ');
registerSkewProp('transformOriginX', 'originX');
registerSkewProp('transformOriginY', 'originY');
registerSkewProp('transformOriginZ', 'originZ');

// Shorthand 3-token string x y z or 2-string from-to array routed via the engine COMPLEX path.
// The setter reads tween _numbers for the per-frame lerped triplet.
threeObject3D.registerProperty('transformOrigin',
  (t) => {
    const s = /** @type {any} */(t)[skewSymbol];
    return s ? `${s.originX} ${s.originY} ${s.originZ}` : '0 0 0';
  },
  (t, _, tw) => {
    const s = installSkewMatrix(t);
    const ns = tw._numbers;
    s.originX = ns[0];
    s.originY = ns[1];
    s.originZ = ns[2];
  },
);

// Shared by both camera types.
const isCamera = (t) => !!t.isPerspectiveCamera || !!t.isOrthographicCamera;
registerCameraProp('near', isCamera);
registerCameraProp('far', isCamera);
registerCameraProp('zoom', isCamera);

// Auto-detection for material props on meshes and direct Vector / Color fields on the target is provided by the shared resolvers in resolvers.js.

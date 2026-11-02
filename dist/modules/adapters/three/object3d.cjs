/**
 * Anime.js - adapters - CJS
 * @version v5.0.0-beta.3
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


/** @import { Object3D, Material, Vector3 } from 'three' */

/**
 * @typedef {Object} SkewOriginState
 * @property {Number} skewX
 * @property {Number} skewY
 * @property {Number} skewZ
 * @property {Number} originX
 * @property {Number} originY
 * @property {Number} originZ
 */

const colorTarget = (t) => t.isLight ? t : t.material;

// Store the skew and transformOrigin state under one symbol so the Object3D keeps its own surface.
const skewSymbol = Symbol('animejs.skewOrigin');

// Store the opacity of a target without material such as a Group or a CSS2DObject, so reads return
// the written value instead of the default 1.
const opacitySymbol = Symbol('animejs.opacity');

// Mark a target that a scale or opacity of 0 hid, so only such a target shows again when both leave 0, and its
// visible property reads true.
const isAutoHiddenSymbol = Symbol('animejs.isAutoHidden');

/**
 * Reads the opacity of `o` from its material, or the stored value when it has none.
 *
 * @param {Object3D & { material?: Material | Material[] }} o
 * @return {number}
 */
function getOpacity(o) {
  if (o.material) return helpers.readScalar(o.material, 'opacity', helpers.PATH_DIRECT, 1);
  const v = o[opacitySymbol];
  return v === undefined ? 1 : v;
}

/**
 * @param {Vector3} s
 * @return {boolean}
 */
const hasScale = (s) => !!(s.x && s.y && s.z);

/**
 * Hides `o` for a scale or opacity of 0, unless a visible tween or the user already hid it.
 *
 * @param {Object3D} o
 */
function autoHide(o) {
  if (!o.visible) return;
  o.visible = false;
  o[isAutoHiddenSymbol] = true;
}

/**
 * @param {Object3D} o
 */
function autoShow(o) {
  o.visible = true;
  o[isAutoHiddenSymbol] = false;
}

/**
 * Hides `o` when its scale is 0 and shows it again when `autoHide` hid it and its scale and opacity are above 0.
 *
 * @param {Object3D & { material?: Material | Material[] }} o
 */
function updateScaleVisibility(o) {
  if (!hasScale(o.scale)) autoHide(o);
  else if (!o.visible && o[isAutoHiddenSymbol] && getOpacity(o)) autoShow(o);
}

/**
 * Returns the skew and origin state of mesh and overrides mesh.updateMatrix on the first call.
 *
 * @param {any} mesh
 * @return {SkewOriginState}
 */
function installSkewMatrix(mesh) {
  let state = mesh[skewSymbol];
  if (state) return state;
  state = mesh[skewSymbol] = { skewX: 0, skewY: 0, skewZ: 0, originX: 0, originY: 0, originZ: 0 };
  const original = mesh.updateMatrix;
  mesh.updateMatrix = function () {
    original.call(this);
    const state = this[skewSymbol];
    if (state.skewX !== 0 || state.skewY !== 0 || state.skewZ !== 0 || state.originX !== 0 || state.originY !== 0 || state.originZ !== 0) {
      helpers.applySkewOrigin(this.matrix.elements, state.skewX, state.skewY, state.skewZ, state.originX, state.originY, state.originZ);
    }
  };
  return state;
}

// Detect with isObject3D so targets built by a second copy of three still match.
const threeObject3D = adapter.threeAdapter.registerTargetAdapter((t) => !!(t && t.isObject3D));

// Position
threeObject3D.registerProperty('x', (t) => t.position.x, (t, v) => { t.position.x = v; });
threeObject3D.registerProperty('y', (t) => t.position.y, (t, v) => { t.position.y = v; });
threeObject3D.registerProperty('z', (t) => t.position.z, (t, v) => { t.position.z = v; });

// Rotation in degrees
threeObject3D.registerProperty('rotateX', (t) => number.radToDeg(t.rotation.x), (t, v) => { t.rotation.x = number.degToRad(v); });
threeObject3D.registerProperty('rotateY', (t) => number.radToDeg(t.rotation.y), (t, v) => { t.rotation.y = number.degToRad(v); });
threeObject3D.registerProperty('rotateZ', (t) => number.radToDeg(t.rotation.z), (t, v) => { t.rotation.z = number.degToRad(v); });

// Scale per-axis and uniform
// A scale or opacity of 0 hides the target so three skips drawing it, and both above 0 show it again.
// A target that a visible tween or the user hid stays hidden.
threeObject3D.registerProperty('scaleX', (t) => t.scale.x, (t, v) => { t.scale.x = v; updateScaleVisibility(t); });
threeObject3D.registerProperty('scaleY', (t) => t.scale.y, (t, v) => { t.scale.y = v; updateScaleVisibility(t); });
threeObject3D.registerProperty('scaleZ', (t) => t.scale.z, (t, v) => { t.scale.z = v; updateScaleVisibility(t); });
threeObject3D.registerProperty('scale',
  (t) => t.scale.x,
  (t, v) => {
    t.scale.x = v;
    t.scale.y = v;
    t.scale.z = v;
    updateScaleVisibility(t);
  },
);

// Material
threeObject3D.registerProperty('visible',
  (t) => t.visible || !!t[isAutoHiddenSymbol],
  (t, v) => {
    // A true write keeps a shown target shown, so each frame of a visible tween skips the scale and opacity reads.
    if (v && t.visible) return;
    const canShow = hasScale(t.scale) && !!getOpacity(t);
    t.visible = !!v && canShow;
    t[isAutoHiddenSymbol] = !!v && !canShow;
  },
);
threeObject3D.registerProperty('opacity',
  getOpacity,
  (t, v) => {
    if (t.material) helpers.writeScalar(t.material, 'opacity', v, helpers.PATH_DIRECT);
    else t[opacitySymbol] = v;
    if (!v) autoHide(t);
    else if (!t.visible && t[isAutoHiddenSymbol] && hasScale(t.scale)) autoShow(t);
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

// Scene background
// Create a Color on the first write so the user does not have to set scene.background upfront.
threeObject3D.registerProperty('background',
  (t) => {
    const bg = t.background;
    return bg && bg.isColor ? helpers.readColorHex(bg) : '#000000';
  },
  (t, _, tw) => {
    const scene = t;
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
const registerMethodProp = (apiName, getter, setter, detectMethod) => {
  threeObject3D.registerProperty(apiName,
    (t) => t[getter](),
    (t, v) => { t[setter](v); },
    (t) => !!t[detectMethod],
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
const isPerspective = (t) => !!t.isPerspectiveCamera;
const isOrthographic = (t) => !!t.isOrthographicCamera;
registerCameraProp('fov', isPerspective);
registerCameraProp('aspect', isPerspective);
registerCameraProp('left', isOrthographic);
registerCameraProp('right', isOrthographic);
registerCameraProp('top', isOrthographic);
registerCameraProp('bottom', isOrthographic);
// Register the props that both camera types share.
const isCamera = (t) => !!t.isPerspectiveCamera || !!t.isOrthographicCamera;
registerCameraProp('near', isCamera);
registerCameraProp('far', isCamera);
registerCameraProp('zoom', isCamera);

// Skew in degrees and transformOrigin in object space, a mesh that was never written reads 0.
/**
 * @param {String} apiName
 * @param {String} key
 */
const registerSkewProp = (apiName, key) => {
  threeObject3D.registerProperty(apiName,
    (t) => {
      const s = t[skewSymbol];
      return s ? s[key] : 0;
    },
    (t, v) => { installSkewMatrix(t)[key] = v; },
  );
};
registerSkewProp('skewX', 'skewX');
registerSkewProp('skewY', 'skewY');
registerSkewProp('skewZ', 'skewZ');
registerSkewProp('transformOriginX', 'originX');
registerSkewProp('transformOriginY', 'originY');
registerSkewProp('transformOriginZ', 'originZ');

// Expose transformOrigin as a space separated string so the engine lerps its three numbers.
threeObject3D.registerProperty('transformOrigin',
  (t) => {
    const s = t[skewSymbol];
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

// Material props on meshes and direct Vector or Color fields on the target come from the shared resolvers in resolvers.js.

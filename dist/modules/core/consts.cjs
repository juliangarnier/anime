/**
 * Anime.js - core - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

// Environments

// TODO: Do we need to check if we're running inside a worker ?
const isBrowser = typeof window !== 'undefined';

/** @type {Window & {AnimeJS: Array}|null} */
const win = isBrowser ? /** @type {Window & {AnimeJS: Array}} */(/** @type {unknown} */(window)) : null;

/** @type {Document|null} */
const doc = isBrowser ? document : null;

// Enums

/** @enum {Number} */
const tweenTypes = {
  OBJECT: 0,
  ATTRIBUTE: 1,
  CSS: 2,
  TRANSFORM: 3,
  CSS_VAR: 4,
};

/** @enum {Number} */
const valueTypes = {
  NUMBER: 0,
  UNIT: 1,
  COLOR: 2,
  COMPLEX: 3,
};

/** @enum {Number} */
const tickModes = {
  NONE: 0,
  AUTO: 1,
  FORCE: 2,
};

/** @enum {Number} */
const compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2,
};

// Cache symbols

const isRegisteredTargetSymbol = Symbol();
const isDomSymbol = Symbol();
const isSvgSymbol = Symbol();
const transformsSymbol = Symbol();
const morphPointsSymbol = Symbol();
const proxyTargetSymbol = Symbol();

// Numbers

const minValue = 1e-11;
const maxValue = 1e12;
const K = 1e3;
const maxFps = 120;

// Strings

const emptyString = '';
const cssVarPrefix = 'var(';

const shortTransforms = /*#__PURE__*/ (() => {
  const map = new Map();
  map.set('x', 'translateX');
  map.set('y', 'translateY');
  map.set('z', 'translateZ');
  return map;
})();

const validTransforms = [
  'translateX',
  'translateY',
  'translateZ',
  'rotate',
  'rotateX',
  'rotateY',
  'rotateZ',
  'scale',
  'scaleX',
  'scaleY',
  'scaleZ',
  'skew',
  'skewX',
  'skewY',
  'matrix',
  'matrix3d',
  'perspective',
];

const transformsFragmentStrings = /*#__PURE__*/ validTransforms.reduce((a, v) => ({...a, [v]: v + '('}), {});

// Functions

/** @return {void} */
const noop = () => {};

// Regex

const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
const rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i;
const rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
const hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
const hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
// export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
// export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i;
const unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
const lowerCaseRgx = /([a-z])([A-Z])/g;
const transformsExecRgx = /(\w+)(\([^)]+\)+)/g; // Match inline transforms with cacl() values, returns the value wrapped in ()
const relativeValuesExecRgx = /(\*=|\+=|-=)/;
const cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;

exports.K = K;
exports.compositionTypes = compositionTypes;
exports.cssVarPrefix = cssVarPrefix;
exports.cssVariableMatchRgx = cssVariableMatchRgx;
exports.digitWithExponentRgx = digitWithExponentRgx;
exports.doc = doc;
exports.emptyString = emptyString;
exports.hexTestRgx = hexTestRgx;
exports.hslExecRgx = hslExecRgx;
exports.hslaExecRgx = hslaExecRgx;
exports.isBrowser = isBrowser;
exports.isDomSymbol = isDomSymbol;
exports.isRegisteredTargetSymbol = isRegisteredTargetSymbol;
exports.isSvgSymbol = isSvgSymbol;
exports.lowerCaseRgx = lowerCaseRgx;
exports.maxFps = maxFps;
exports.maxValue = maxValue;
exports.minValue = minValue;
exports.morphPointsSymbol = morphPointsSymbol;
exports.noop = noop;
exports.proxyTargetSymbol = proxyTargetSymbol;
exports.relativeValuesExecRgx = relativeValuesExecRgx;
exports.rgbExecRgx = rgbExecRgx;
exports.rgbaExecRgx = rgbaExecRgx;
exports.shortTransforms = shortTransforms;
exports.tickModes = tickModes;
exports.transformsExecRgx = transformsExecRgx;
exports.transformsFragmentStrings = transformsFragmentStrings;
exports.transformsSymbol = transformsSymbol;
exports.tweenTypes = tweenTypes;
exports.unitsExecRgx = unitsExecRgx;
exports.validTransforms = validTransforms;
exports.valueTypes = valueTypes;
exports.win = win;

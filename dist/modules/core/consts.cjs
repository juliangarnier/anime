/**
 * Anime.js - core - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

// Environments

// TODO: Do we need to check if we're running inside a worker ?
const isBrowser = typeof window !== 'undefined';

/** @typedef {Window & {AnimeJS: Array}|null} AnimeJSWindow

/** @type {AnimeJSWindow} */
const win = isBrowser ? /** @type {AnimeJSWindow} */(/** @type {unknown} */(window)) : null;

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
const overrideTypes = {
  NONE: 0,
  // A timeline child that waits for its property or has given it to a later child
  TIMELINE: 1,
  // Replaced for good by a later animation, or muted
  PERMANENT: 2,
};

/** @enum {Number} */
const compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2,
  // Mark a muted tween, it joins no sibling list and render skips it through _isOverridden.
  // Keep the mute check out of render, which runs on every frame.
  muted: 3,
};

// Map the public composition names so a minifier can inline every read of compositionTypes.
const compositionNames = {
  replace: compositionTypes.replace,
  none: compositionTypes.none,
  blend: compositionTypes.blend,
};

// Cache symbols

const isDomSymbol = Symbol();
const isSvgSymbol = Symbol();
const transformsSymbol = Symbol();
const proxyTargetSymbol = Symbol();
// Hold the replace sibling lookups of a registered target, its presence marks the registration.
// A module WeakMap made setup slower and doubled render time after a hidden tab load.
const replaceLookupsSymbol = Symbol();
// Hold the owner of a lookups object so a copy or proxy that carries it keeps its own apart.
const lookupsOwnerSymbol = Symbol();
// Mark a tween that read no original value so revert leaves its property to the sibling that did.
const noOriginalValueSymbol = Symbol();

// Numbers

const minValue = 1e-11;
const maxValue = 1e12;
const K = 1e3;
const maxFps = 240;

// Strings

const emptyString = '';
const cssVarPrefix = 'var(';

// Arrays

// Share one empty array for tween slots without array data, never mutate it.
// COMPLEX and COLOR tweens replace the slot before they write.
const emptyArray = [];

const shortTransforms = /*#__PURE__*/ new Map([['x', 'translateX'], ['y', 'translateY'], ['z', 'translateZ']]);

const validTransforms = [
  'perspective',
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
];

const transformsFragmentStrings = /*#__PURE__*/ validTransforms.reduce((a, v) => ({...a, [v]: v + '('}), {});

// Functions

/** @return {void} */
const noop = () => {};

/**
 * @template T
 * @param  {T} v
 * @return {T}
 */
const noopModifier = v => v;

// Regex

const validRgbHslRgx = /\)\s*[-.\d]/;
const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
// Match the first three to five tokens of a color function, split on spaces, commas or a slash.
const colorFunctionExecRgx = /\(\s*([^\s,/]+)[\s,]+([^\s,/]+)[\s,]+([^\s,/)]+)(?:[\s,/]+([^\s,/)]+))?(?:[\s,/]+([^\s,/)]+))?/;
// export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
// export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i;
const unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i;
const lowerCaseRgx = /([a-z])([A-Z])/g;
const relativeValuesExecRgx = /(\*=|\+=|-=)/;
const cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;

exports.K = K;
exports.colorFunctionExecRgx = colorFunctionExecRgx;
exports.compositionNames = compositionNames;
exports.compositionTypes = compositionTypes;
exports.cssVarPrefix = cssVarPrefix;
exports.cssVariableMatchRgx = cssVariableMatchRgx;
exports.digitWithExponentRgx = digitWithExponentRgx;
exports.doc = doc;
exports.emptyArray = emptyArray;
exports.emptyString = emptyString;
exports.hexTestRgx = hexTestRgx;
exports.isBrowser = isBrowser;
exports.isDomSymbol = isDomSymbol;
exports.isSvgSymbol = isSvgSymbol;
exports.lookupsOwnerSymbol = lookupsOwnerSymbol;
exports.lowerCaseRgx = lowerCaseRgx;
exports.maxFps = maxFps;
exports.maxValue = maxValue;
exports.minValue = minValue;
exports.noOriginalValueSymbol = noOriginalValueSymbol;
exports.noop = noop;
exports.noopModifier = noopModifier;
exports.overrideTypes = overrideTypes;
exports.proxyTargetSymbol = proxyTargetSymbol;
exports.relativeValuesExecRgx = relativeValuesExecRgx;
exports.replaceLookupsSymbol = replaceLookupsSymbol;
exports.shortTransforms = shortTransforms;
exports.tickModes = tickModes;
exports.transformsFragmentStrings = transformsFragmentStrings;
exports.transformsSymbol = transformsSymbol;
exports.tweenTypes = tweenTypes;
exports.unitsExecRgx = unitsExecRgx;
exports.validRgbHslRgx = validRgbHslRgx;
exports.validTransforms = validTransforms;
exports.valueTypes = valueTypes;
exports.win = win;

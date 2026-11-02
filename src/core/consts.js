// Environments

// TODO: Do we need to check if we're running inside a worker ?
export const isBrowser = typeof window !== 'undefined';

/** @typedef {Window & {AnimeJS: Array}|null} AnimeJSWindow

/** @type {AnimeJSWindow} */
export const win = isBrowser ? /** @type {AnimeJSWindow} */(/** @type {unknown} */(window)) : null;

/** @type {Document|null} */
export const doc = isBrowser ? document : null;

// Enums

/** @enum {Number} */
export const tweenTypes = {
  OBJECT: 0,
  ATTRIBUTE: 1,
  CSS: 2,
  TRANSFORM: 3,
  CSS_VAR: 4,
}

/** @enum {Number} */
export const valueTypes = {
  NUMBER: 0,
  UNIT: 1,
  COLOR: 2,
  COMPLEX: 3,
}

/** @enum {Number} */
export const tickModes = {
  NONE: 0,
  AUTO: 1,
  FORCE: 2,
}

/** @enum {Number} */
export const overrideTypes = {
  NONE: 0,
  // A timeline child that waits for its property or has given it to a later child
  TIMELINE: 1,
  // Replaced for good by a later animation, or muted
  PERMANENT: 2,
}

/** @enum {Number} */
export const compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2,
  // Mark a muted tween, it joins no sibling list and render skips it through _isOverridden.
  // Keep the mute check out of render, which runs on every frame.
  muted: 3,
}

// Map the public composition names so a minifier can inline every read of compositionTypes.
export const compositionNames = {
  replace: compositionTypes.replace,
  none: compositionTypes.none,
  blend: compositionTypes.blend,
}

// Cache symbols

export const isDomSymbol = Symbol();
export const isSvgSymbol = Symbol();
export const transformsSymbol = Symbol();
export const proxyTargetSymbol = Symbol();
// Hold the replace sibling lookups of a registered target, its presence marks the registration.
// A module WeakMap made setup slower and doubled render time after a hidden tab load.
export const replaceLookupsSymbol = Symbol();
// Hold the owner of a lookups object so a copy or proxy that carries it keeps its own apart.
export const lookupsOwnerSymbol = Symbol();
// Mark a tween that read no original value so revert leaves its property to the sibling that did.
export const noOriginalValueSymbol = Symbol();

// Numbers

export const minValue = 1e-11;
export const maxValue = 1e12;
export const K = 1e3;
export const maxFps = 240;

// Strings

export const emptyString = '';
export const cssVarPrefix = 'var(';

// Arrays

// Share one empty array for tween slots without array data, never mutate it.
// COMPLEX and COLOR tweens replace the slot before they write.
export const emptyArray = [];

export const shortTransforms = /*#__PURE__*/ new Map([['x', 'translateX'], ['y', 'translateY'], ['z', 'translateZ']]);

export const validTransforms = [
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

export const transformsFragmentStrings = /*#__PURE__*/ validTransforms.reduce((a, v) => ({...a, [v]: v + '('}), {});

// Functions

/** @return {void} */
export const noop = () => {};

/**
 * @template T
 * @param  {T} v
 * @return {T}
 */
export const noopModifier = v => v;

// Regex

export const validRgbHslRgx = /\)\s*[-.\d]/;
export const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
// Match the first three to five tokens of a color function, split on spaces, commas or a slash.
export const colorFunctionExecRgx = /\(\s*([^\s,/]+)[\s,]+([^\s,/]+)[\s,]+([^\s,/)]+)(?:[\s,/]+([^\s,/)]+))?(?:[\s,/]+([^\s,/)]+))?/;
// export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
// export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i;
export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i
export const lowerCaseRgx = /([a-z])([A-Z])/g;
export const relativeValuesExecRgx = /(\*=|\+=|-=)/;
export const cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;

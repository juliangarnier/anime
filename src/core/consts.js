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
export const compositionTypes = {
  replace: 0,
  none: 1,
  blend: 2,
}

// Cache symbols

export const isRegisteredTargetSymbol = Symbol();
export const isDomSymbol = Symbol();
export const isSvgSymbol = Symbol();
export const transformsSymbol = Symbol();
export const proxyTargetSymbol = Symbol();

// Numbers

export const minValue = 1e-11;
export const maxValue = 1e12;
export const K = 1e3;
export const maxFps = 240;

// Strings

export const emptyString = '';
export const cssVarPrefix = 'var(';

export const shortTransforms = /*#__PURE__*/ (() => {
  const map = new Map();
  map.set('x', 'translateX');
  map.set('y', 'translateY');
  map.set('z', 'translateZ');
  return map;
})();

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

// Regex

export const validRgbHslRgx = /\)\s*[-.\d]/;
export const hexTestRgx = /(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i;
export const rgbExecRgx = /rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i
export const rgbaExecRgx = /rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i
export const hslExecRgx = /hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i;
export const hslaExecRgx = /hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i;
// export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g;
export const digitWithExponentRgx = /[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi;
// export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:[eE][-+]?\d+)?)+([a-z]+|%)$/i;
export const unitsExecRgx = /^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i
export const lowerCaseRgx = /([a-z])([A-Z])/g;
export const relativeValuesExecRgx = /(\*=|\+=|-=)/;
export const cssVariableMatchRgx = /var\(\s*(--[\w-]+)(?:\s*,\s*([^)]+))?\s*\)/;

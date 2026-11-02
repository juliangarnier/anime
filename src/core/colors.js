import {
  colorFunctionExecRgx,
} from './consts.js';

import {
  round,
  clamp,
  isRgb,
  isHex,
  isHsl,
  isOklab,
  isOklch,
  isColorFn,
  isUnd,
} from './helpers.js';

/**
 * @import {
 *   ColorArray,
 * } from '../types/index.js'
*/

/**
 * HEX3 / HEX3A / HEX6 / HEX6A Color value string -> RGBA values array
 * @param  {String} hexValue
 * @return {ColorArray}
 */
const hexToRgba = hexValue => {
  const hexLength = hexValue.length;
  const isShort = hexLength === 4 || hexLength === 5;
  return [
    +('0x' + hexValue[1] + hexValue[isShort ? 1 : 2]),
    +('0x' + hexValue[isShort ? 2 : 3] + hexValue[isShort ? 2 : 4]),
    +('0x' + hexValue[isShort ? 3 : 5] + hexValue[isShort ? 3 : 6]),
    ((hexLength === 5 || hexLength === 9) ? +(+('0x' + hexValue[isShort ? 4 : 7] + hexValue[isShort ? 4 : 8]) / 255).toFixed(3) : 1)
  ]
}

/**
 * @param  {Number} p
 * @param  {Number} q
 * @param  {Number} t
 * @return {Number}
 */
const hue2rgb = (p, q, t) => {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  return t < 1 / 6 ? p + (q - p) * 6 * t :
         t < 1 / 2 ? q :
         t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 :
         p;
}

/**
 * HSL channels 0-1 -> RGBA values array
 * @param  {Number} h
 * @param  {Number} s
 * @param  {Number} l
 * @param  {Number} alpha
 * @return {ColorArray}
 */
const hslChannelsToRgba = (h, s, l, alpha) => {
  const q = l < .5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  return [
    round(hue2rgb(p, q, h + 1 / 3) * 255, 0),
    round(hue2rgb(p, q, h) * 255, 0),
    round(hue2rgb(p, q, h - 1 / 3) * 255, 0),
    alpha,
  ];
}

/**
 * Gamma encoded sRGB channel 0-1 -> channel 0-255, clipped to the sRGB gamut
 * @param  {Number} c
 * @return {Number}
 */
const srgbChannel = c => round(clamp(c, 0, 1) * 255, 0);

/**
 * Linear sRGB channel 0-1 -> gamma encoded sRGB channel 0-255, clipped to the sRGB gamut
 * @param  {Number} linear
 * @return {Number}
 */
const linearToSrgbChannel = linear => {
  const c = clamp(linear, 0, 1);
  return srgbChannel(c <= .0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - .055);
}

/**
 * Gamma encoded channel 0-1 -> linear channel 0-1, the transfer sRGB and Display P3 share
 * @param  {Number} c
 * @return {Number}
 */
const srgbToLinear = c => c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;

/**
 * Oklab channels -> RGBA values array
 * @param  {Number} L
 * @param  {Number} a
 * @param  {Number} b
 * @param  {Number} alpha
 * @return {ColorArray}
 */
const oklabChannelsToRgba = (L, a, b, alpha) => {
  const l = (L + .3963377774 * a + .2158037573 * b) ** 3;
  const m = (L - .1055613458 * a - .0638541728 * b) ** 3;
  const s = (L - .0894841775 * a - 1.291485548 * b) ** 3;
  return [
    linearToSrgbChannel(4.0767416621 * l - 3.3077115913 * m + .2309699292 * s),
    linearToSrgbChannel(-1.2684380046 * l + 2.6097574011 * m - .3413193965 * s),
    linearToSrgbChannel(-.0041960863 * l - .7034186147 * m + 1.707614701 * s),
    alpha,
  ];
}

/**
 * A channel token -> number. 'none' reads as zero and a percentage maps to its reference value
 * @param  {String} token
 * @param  {Number} percentReference
 * @return {Number}
 */
const parseChannel = (token, percentReference) => token === 'none' ? 0 : token[token.length - 1] === '%' ? parseFloat(token) / 100 * percentReference : parseFloat(token);

/**
 * All in one color converter that converts a color string value into an array of RGBA values
 * @param  {String} colorString
 * @return {ColorArray}
 */
export const convertColorStringValuesToRgbaArray = colorString => {
  // Read the channel tokens, a color function starts them with its color space name.
  // One exec with capture groups, a global match of the tokens cost 11 percent on color setup.
  const tokens = colorFunctionExecRgx.exec(colorString);
  if (!tokens) return isHex(colorString) ? hexToRgba(colorString) : [0, 0, 0, 1];
  const first = isColorFn(colorString) ? 2 : 1;
  const t0 = tokens[first], t1 = tokens[first + 1], t2 = tokens[first + 2], t3 = tokens[first + 3];
  const alpha = isUnd(t3) ? 1 : parseChannel(t3, 1);
  if (isRgb(colorString)) return [parseChannel(t0, 255), parseChannel(t1, 255), parseChannel(t2, 255), alpha];
  if (isHsl(colorString)) return hslChannelsToRgba(parseChannel(t0, 360) / 360, parseChannel(t1, 100) / 100, parseChannel(t2, 100) / 100, alpha);
  // Scale a, b and chroma percentages to .4, their peak in oklab and oklch.
  if (isOklab(colorString)) return oklabChannelsToRgba(parseChannel(t0, 1), parseChannel(t1, .4), parseChannel(t2, .4), alpha);
  if (isOklch(colorString)) {
    const chroma = parseChannel(t1, .4);
    const hue = parseChannel(t2, 360) * Math.PI / 180;
    return oklabChannelsToRgba(parseChannel(t0, 1), chroma * Math.cos(hue), chroma * Math.sin(hue), alpha);
  }
  if (first === 2) {
    const space = tokens[1];
    const c0 = parseChannel(t0, 1), c1 = parseChannel(t1, 1), c2 = parseChannel(t2, 1);
    if (space === 'srgb') return [srgbChannel(c0), srgbChannel(c1), srgbChannel(c2), alpha];
    if (space === 'srgb-linear') return [linearToSrgbChannel(c0), linearToSrgbChannel(c1), linearToSrgbChannel(c2), alpha];
    if (space === 'display-p3') {
      const r = srgbToLinear(c0), g = srgbToLinear(c1), b = srgbToLinear(c2);
      return [
        linearToSrgbChannel(1.2249401762805 * r - .2249401762805 * g),
        linearToSrgbChannel(-.042056954709 * r + 1.042056954709 * g),
        linearToSrgbChannel(-.01963755459 * r - .07863604555 * g + 1.09827360014 * b),
        alpha,
      ];
    }
  }
  return [0, 0, 0, 1];
}

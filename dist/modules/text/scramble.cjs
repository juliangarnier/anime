/**
 * Anime.js - text - CJS
 * @version v4.4.0
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var random = require('../utils/random.cjs');
var globals = require('../core/globals.cjs');
var helpers = require('../core/helpers.cjs');
var parser = require('../easings/eases/parser.cjs');
var consts = require('../core/consts.cjs');

/**
 * @import {
 *   ScrambleTextParams,
 *   FunctionValue,
 * } from '../types/index.js'
*/

/**
 * '-' is the range operator; place it at the start or end of the string to use it as a literal (e.g. '-abc' or 'abc-')
 * @param {String} str
 * @return {String}
 */
const expandCharRanges = (str) => {
  let result = '';
  for (let i = 0, l = str.length; i < l; i++) {
    if (i + 2 < l && str[i + 1] === '-' && str.charCodeAt(i) < str.charCodeAt(i + 2)) {
      const start = str.charCodeAt(i);
      const end = str.charCodeAt(i + 2);
      for (let c = start; c <= end; c++) result += String.fromCharCode(c);
      i += 2;
    } else {
      result += str[i];
    }
  }
  return result;
};

const charSets = {
  lowercase: 'a-z',
  uppercase: 'A-Z',
  numbers: '0-9',
  symbols: '!%#_|*+=',
  braille: '⠀-⣿',
  blocks: '▀-▟',
  shades: '░-▓',
};

const originalTexts = new WeakMap();

/**
 * Returns a function-based tween value that scrambles the target's text content,
 * progressively revealing the original text.
 *
 * @param {ScrambleTextParams} [params]
 * @return {FunctionValue}
 */
const scrambleText = (params = {}) => {
  if (!params) params = {};
  const charsParam = params.chars;
  const easeFn = parser.parseEase(params.ease || 'linear');
  const text = params.text;
  const fromParam = params.from;
  const reversed = params.reversed || false;
  const perturbation = params.perturbation || 0;
  const cursorParam = params.cursor;
  const cursorChars = cursorParam === true ? '_'
                    : typeof cursorParam === 'number' ? String.fromCharCode(cursorParam)
                    : typeof cursorParam === 'string' ? cursorParam
                    : '';
  const cursorLen = cursorChars.length;
  const seed = params.seed || 0;
  const override = params.override !== undefined ? params.override : true;
  const revealRate = params.revealRate || 60;
  const interval = 1000 * globals.globals.timeScale / revealRate;
  const settleDuration = params.settleDuration || 300 * globals.globals.timeScale;
  const settleRate = params.settleRate || 30;
  const durationParam = params.duration;
  const revealDelayParam = params.revealDelay;
  const delayParam = params.delay;
  const onChange = params.onChange || consts.noop;

  return (target, index, targets, prevTween) => {
    const rawChars = typeof charsParam === 'function' ? charsParam(target, index, targets) : (charsParam || 'a-zA-Z0-9!%#_');
    const characters = expandCharRanges(charSets[rawChars] || rawChars);
    const totalChars = characters.length - 1;
    const duration = typeof durationParam === 'function' ? durationParam(target, index, targets) : durationParam;
    const revealDelay = typeof revealDelayParam === 'function' ? revealDelayParam(target, index, targets) : (revealDelayParam || 0);
    const delay = typeof delayParam === 'function' ? delayParam(target, index, targets) : (delayParam || 0);
    const rng = seed ? random.createSeededRandom(seed) : random.createSeededRandom();
    if (!originalTexts.has(target)) originalTexts.set(target, target.textContent);
    const startingText = prevTween ? prevTween._value : target.textContent;
    const targetText = text !== undefined
                       ? (typeof text === 'function' ? text(target, index, targets) : text)
                       : prevTween ? prevTween._value
                       : originalTexts.get(target);
    const settledText = targetText === ' ' || targetText === '&nbsp;' ? ' ' : targetText;
    const startLength = startingText === ' ' ? 0 : startingText.length;
    const endLength = settledText.length;
    const overrideChars = override === true ? characters
                        : typeof override === 'string' && override.length > 0 ? expandCharRanges(charSets[/** @type {String} */(override)] || /** @type {String} */(override))
                        : null;
    const totalOverrideChars = overrideChars ? overrideChars.length - 1 : 0;
    // Space override uses &nbsp; so the browser doesn't collapse consecutive spaces in innerHTML
    const overrideChar = override === ' ' ? ' ' : null;
    // When starting from blank, only animate the target text length to avoid padding beyond it
    const animLength = override === '' ? endLength : Math.max(startLength, endLength);
    // Compute total duration from interval spacing and settle time, or use the explicit duration
    const animDuration = duration > 0 ? duration : (animLength - 1) * interval + settleDuration;
    const computedDuration = helpers.round((animDuration + revealDelay) / globals.globals.timeScale, 0) * globals.globals.timeScale;
    const revealDelayRatio = revealDelay > 0 ? helpers.round(revealDelay / computedDuration, 12) : 0;
    // Auto-resolve reveal direction: shrinking text reveals from right, growing from left
    const resolvedFrom = fromParam === undefined || fromParam === 'auto' ? (endLength < startLength ? 'right' : 'left') : fromParam;
    const charOrder = new Int32Array(animLength);
    if (resolvedFrom === 'random') {
      for (let i = 0; i < animLength; i++) charOrder[i] = i;
      for (let i = animLength - 1; i > 0; i--) {
        const j = rng(0, i);
        const t = charOrder[i]; charOrder[i] = charOrder[j]; charOrder[j] = t;
      }
    } else {
      const ref = resolvedFrom === 'right' ? (override === '' || !startLength ? animLength : startLength) - 1
                : resolvedFrom === 'center' ? ((override === '' || !startLength ? animLength : startLength) - 1) / 2
                : typeof resolvedFrom === 'number' ? resolvedFrom
                : 0;
      const abs = Math.abs;
      const indices = new Array(animLength);
      for (let i = 0; i < animLength; i++) indices[i] = i;
      indices.sort((a, b) => abs(a - ref) - abs(b - ref));
      for (let i = 0; i < animLength; i++) charOrder[indices[i]] = i;
    }
    if (reversed) {
      const last = animLength - 1;
      for (let i = 0; i < animLength; i++) charOrder[i] = last - charOrder[i];
    }
    // settleRatio is the fraction of the animation each character spends in the active scrambling zone
    const settleRatio = helpers.round(settleDuration / animDuration, 12);
    // settleSpacing is the time gap between consecutive characters entering the active zone
    const settleSpacing = helpers.round((1 - settleRatio) / animLength, 12);
    const cursorZone = cursorLen * settleSpacing;
    // stepRatio controls how often scramble characters refresh (based on settleRate)
    const stepRatio = helpers.round(1000 * globals.globals.timeScale / (settleRate * computedDuration), 12);
    // Pre-compute per-character start and settle times
    const charStarts = new Float32Array(animLength);
    const charEnds = new Float32Array(animLength);
    const scale = perturbation > 0 ? perturbation * settleRatio : 0;
    for (let c = 0; c < animLength; c++) {
      const so = scale > 0 ? (rng(0, 2000) - 1000) / 1000 * scale : 0;
      const eo = scale > 0 ? (rng(0, 2000) - 1000) / 1000 * scale : 0;
      charStarts[c] = charOrder[c] * settleSpacing + so;
      charEnds[c] = Math.ceil((charStarts[c] + settleRatio + eo) / stepRatio) * stepRatio;
    }
    // When text shrinks with non-sequential from modes, delay target settle times past all extras
    if (endLength < animLength && resolvedFrom !== 'left' && resolvedFrom !== 'right' && resolvedFrom !== 'random') {
      let maxExtraEnd = 0;
      for (let c = endLength; c < animLength; c++) {
        if (charEnds[c] > maxExtraEnd) maxExtraEnd = charEnds[c];
      }
      const targets = new Array(endLength);
      for (let c = 0; c < endLength; c++) targets[c] = c;
      targets.sort((a, b) => charOrder[a] - charOrder[b]);
      const targetSpacing = (1 - maxExtraEnd) / endLength;
      for (let i = 0; i < endLength; i++) {
        const revealTime = maxExtraEnd + i * targetSpacing;
        if (revealTime > charEnds[targets[i]]) {
          charEnds[targets[i]] = revealTime;
        }
      }
    }
    // charCache holds the current scramble character for each position, refreshed at settleRate
    const charCache = new Array(animLength);
    for (let c = 0; c < animLength; c++) {
      charCache[c] = characters[rng(0, totalChars)];
    }
    // overrideCache holds scramble characters for the starting text (override: true or custom string)
    const overrideCache = overrideChars ? (overrideChars === characters ? charCache : new Array(animLength)) : null;
    if (overrideCache && overrideCache !== charCache) {
      for (let c = 0; c < animLength; c++) {
        overrideCache[c] = overrideChar || /** @type {String} */(overrideChars)[rng(0, overrideChars.length - 1)];
      }
    }
    // Build the initial display text based on override mode
    let fillStartText = startingText;
    if (!prevTween) {
      if (override === '') {
        fillStartText = '';
      } else if (overrideChars) {
        fillStartText = '';
        for (let c = 0; c < startLength; c++) {
          fillStartText += startingText[c] === ' ' ? ' ' : /** @type {Array<String>} */(overrideCache)[c];
        }
      }
    }

    let lastValue = -1;
    let lastStep = -1;
    let scrambled = '';
    const hasOverride = override !== '';
    const hasOverrideChars = !!overrideChars;
    const hasCursor = cursorLen > 0;

    return {
      from: 0,
      to: 1,
      duration: computedDuration,
      delay: delay,
      ease: 'linear',
      modifier: (v) => {
        if (v === lastValue) return scrambled;
        lastValue = v;
        if (delay > 0 && v <= 0) { scrambled = startingText; return startingText; }
        if (v <= 0) { scrambled = fillStartText; return fillStartText; }
        if (v >= 1) { scrambled = settledText; return settledText; }
        scrambled = '';
        // Only refresh scramble characters when we cross a settleRate step boundary
        const currentStep = (v / stepRatio) | 0;
        const refreshChars = currentStep !== lastStep;
        if (refreshChars) lastStep = currentStep;
        // Subtract delay ratio to get the effective animation progress
        const linear = revealDelayRatio > 0 ? (v - revealDelayRatio) / (1 - revealDelayRatio) : v;
        const t = linear > 0 ? easeFn(linear) : 0;
        for (let c = 0; c < animLength; c++) {
          // Each character has its own start/end window based on its reveal order
          const charStart = charStarts[c];
          const charEnd = charEnds[c];
          // Settled zone: character has finished its transition
          if (t >= charEnd) {
            if (c < endLength) scrambled += settledText[c];
            continue;
          }
          // Pre-transition zone: reveal wave hasn't reached this character yet
          if (t <= 0 || t < charStart) {
            if (hasOverride && c < startLength) {
              if (hasOverrideChars) {
                if (startingText[c] === ' ') {
                  scrambled += ' ';
                } else {
                  if (refreshChars) /** @type {Array<String>} */(overrideCache)[c] = overrideChar || /** @type {String} */(overrideChars)[rng(0, totalOverrideChars)];
                  scrambled += /** @type {Array<String>} */(overrideCache)[c];
                }
              } else {
                // Default (override: false): show the original starting text
                scrambled += startingText[c];
              }
            }
            continue;
          }
          // Active zone: character is between charStart and charEnd
          const isSpace = (c < endLength && settledText[c] === ' ') || (c < startLength && startingText[c] === ' ');
          if (isSpace) {
            scrambled += ' ';
          } else if (hasCursor && t - charStart < cursorZone) {
            // Cursor sub-zone: show cursor character based on position within cursor width
            scrambled += cursorChars[cursorLen - 1 - (((t - charStart) / settleSpacing) | 0)];
          } else {
            // Scramble zone: show cycling random characters
            if (refreshChars) charCache[c] = characters[rng(0, totalChars)];
            scrambled += charCache[c];
          }
        }
        if (refreshChars) onChange(scrambled, t);
        return scrambled;
      }
    }
  }
};

exports.scrambleText = scrambleText;

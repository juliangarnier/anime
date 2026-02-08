/**
 * Anime.js - text - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var globals = require('../core/globals.cjs');
var helpers = require('../core/helpers.cjs');
var targets = require('../core/targets.cjs');
var values = require('../core/values.cjs');
var time = require('../utils/time.cjs');

/**
 * @import {
 *   Tickable,
 *   DOMTarget,
 *   SplitTemplateParams,
 *   SplitFunctionValue,
 *   TextSplitterParams,
 * } from '../types/index.js'
*/

const segmenter = (typeof Intl !== 'undefined') && Intl.Segmenter;
const valueRgx = /\{value\}/g;
const indexRgx = /\{i\}/g;
const whiteSpaceGroupRgx = /(\s+)/;
const whiteSpaceRgx = /^\s+$/;
const lineType = 'line';
const wordType = 'word';
const charType = 'char';
const dataLine = `data-line`;

/**
 * @typedef {Object} Segment
 * @property {String} segment
 * @property {Boolean} [isWordLike]
 */

/**
 * @typedef {Object} Segmenter
 * @property {function(String): Iterable<Segment>} segment
 */

/** @type {Segmenter} */
let wordSegmenter = null;
/** @type {Segmenter} */
let graphemeSegmenter = null;
let $splitTemplate = null;

/**
 * @param  {Segment} seg
 * @return {Boolean}
 */
const isSegmentWordLike = seg => {
  return seg.isWordLike ||
         seg.segment === ' ' || // Consider spaces as words first, then handle them diffrently later
         helpers.isNum(+seg.segment);   // Safari doesn't considers numbers as words
};

/**
 * @param {HTMLElement} $el
 */
const setAriaHidden = $el => $el.setAttribute('aria-hidden', 'true');

/**
 * @param {DOMTarget} $el
 * @param {String} type
 * @return {Array<HTMLElement>}
 */
const getAllTopLevelElements = ($el, type) => [.../** @type {*} */($el.querySelectorAll(`[data-${type}]:not([data-${type}] [data-${type}])`))];

const debugColors = { line: '#00D672', word: '#FF4B4B', char: '#5A87FF' };

/**
 * @param {HTMLElement} $el
 */
const filterEmptyElements = $el => {
  if (!$el.childElementCount && !$el.textContent.trim()) {
    const $parent = $el.parentElement;
    $el.remove();
    if ($parent) filterEmptyElements($parent);
  }
};

/**
 * @param {HTMLElement} $el
 * @param {Number} lineIndex
 * @param {Set<HTMLElement>} bin
 * @returns {Set<HTMLElement>}
 */
const filterLineElements = ($el, lineIndex, bin) => {
  const dataLineAttr = $el.getAttribute(dataLine);
  if (dataLineAttr !== null && +dataLineAttr !== lineIndex || $el.tagName === 'BR') bin.add($el);
  let i = $el.childElementCount;
  while (i--) filterLineElements(/** @type {HTMLElement} */($el.children[i]), lineIndex, bin);
  return bin;
};

/**
 * @param  {'line'|'word'|'char'} type
 * @param  {SplitTemplateParams} params
 * @return {String}
 */
const generateTemplate = (type, params = {}) => {
  let template = ``;
  const classString = helpers.isStr(params.class) ? ` class="${params.class}"` : '';
  const cloneType = values.setValue(params.clone, false);
  const wrapType = values.setValue(params.wrap, false);
  const overflow = wrapType ? wrapType === true ? 'clip' : wrapType : cloneType ? 'clip' : false;
  if (wrapType) template += `<span${overflow ? ` style="overflow:${overflow};"` : ''}>`;
  template += `<span${classString}${cloneType ? ` style="position:relative;"` : ''} data-${type}="{i}">`;
  if (cloneType) {
    const left = cloneType === 'left' ? '-100%' : cloneType === 'right' ? '100%' : '0';
    const top = cloneType === 'top' ? '-100%' : cloneType === 'bottom' ? '100%' : '0';
    template += `<span>{value}</span>`;
    template += `<span inert style="position:absolute;top:${top};left:${left};white-space:nowrap;">{value}</span>`;
  } else {
    template += `{value}`;
  }
  template += `</span>`;
  if (wrapType) template += `</span>`;
  return template;
};

/**
 * @param  {String|SplitFunctionValue} htmlTemplate
 * @param  {Array<HTMLElement>} store
 * @param  {Node|HTMLElement} node
 * @param  {DocumentFragment} $parentFragment
 * @param  {'line'|'word'|'char'} type
 * @param  {Boolean} debug
 * @param  {Number} lineIndex
 * @param  {Number} [wordIndex]
 * @param  {Number} [charIndex]
 * @return {HTMLElement}
 */
const processHTMLTemplate = (htmlTemplate, store, node, $parentFragment, type, debug, lineIndex, wordIndex, charIndex) => {
  const isLine = type === lineType;
  const isChar = type === charType;
  const className = `_${type}_`;
  const template = helpers.isFnc(htmlTemplate) ? htmlTemplate(node) : htmlTemplate;
  const displayStyle = isLine ? 'block' : 'inline-block';
  $splitTemplate.innerHTML = template
    .replace(valueRgx, `<i class="${className}"></i>`)
    .replace(indexRgx, `${isChar ? charIndex : isLine ? lineIndex : wordIndex}`);
  const $content = $splitTemplate.content;
  const $highestParent = /** @type {HTMLElement} */($content.firstElementChild);
  const $split = /** @type {HTMLElement} */($content.querySelector(`[data-${type}]`)) || $highestParent;
  const $replacables = /** @type {NodeListOf<HTMLElement>} */($content.querySelectorAll(`i.${className}`));
  const replacablesLength = $replacables.length;
  if (replacablesLength) {
    $highestParent.style.display = displayStyle;
    $split.style.display = displayStyle;
    $split.setAttribute(dataLine, `${lineIndex}`);
    if (!isLine) {
      $split.setAttribute('data-word', `${wordIndex}`);
      if (isChar) $split.setAttribute('data-char', `${charIndex}`);
    }
    let i = replacablesLength;
    while (i--) {
      const $replace = $replacables[i];
      const $closestParent = $replace.parentElement;
      $closestParent.style.display = displayStyle;
      if (isLine) {
        $closestParent.innerHTML = /** @type {HTMLElement} */(node).innerHTML;
      } else {
        $closestParent.replaceChild(node.cloneNode(true), $replace);
      }
    }
    store.push($split);
    $parentFragment.appendChild($content);
  } else {
    console.warn(`The expression "{value}" is missing from the provided template.`);
  }
  if (debug) $highestParent.style.outline = `1px dotted ${debugColors[type]}`;
  return $highestParent;
};

/**
 * A class that splits text into words and wraps them in span elements while preserving the original HTML structure.
 * @class
 */
class TextSplitter {
  /**
   * @param  {HTMLElement|NodeList|String|Array<HTMLElement>} target
   * @param  {TextSplitterParams} [parameters]
   */
  constructor(target, parameters = {}) {
    // Only init segmenters when needed
    if (!wordSegmenter) wordSegmenter = segmenter ? new segmenter([], { granularity: wordType }) : {
      segment: (text) => {
        const segments = [];
        const words = text.split(whiteSpaceGroupRgx);
        for (let i = 0, l = words.length; i < l; i++) {
          const segment = words[i];
          segments.push({
            segment,
            isWordLike: !whiteSpaceRgx.test(segment), // Consider non-whitespace as word-like
          });
        }
        return segments;
      }
    };
    if (!graphemeSegmenter) graphemeSegmenter = segmenter ? new segmenter([], { granularity: 'grapheme' }) : {
      segment: text => [...text].map(char => ({ segment: char }))
    };
    if (!$splitTemplate && consts.isBrowser) $splitTemplate = consts.doc.createElement('template');
    if (globals.scope.current) globals.scope.current.register(this);
    const { words, chars, lines, accessible, includeSpaces, debug } = parameters;
    const $target = /** @type {HTMLElement} */((target = helpers.isArr(target) ? target[0] : target) && /** @type {Node} */(target).nodeType ? target : (targets.getNodeList(target) || [])[0]);
    const lineParams = lines === true ? {} : lines;
    const wordParams = words === true || helpers.isUnd(words) ? {} : words;
    const charParams = chars === true ? {} : chars;
    this.debug = values.setValue(debug, false);
    this.includeSpaces = values.setValue(includeSpaces, false);
    this.accessible = values.setValue(accessible, true);
    this.linesOnly = lineParams && (!wordParams && !charParams);
    /** @type {String|false|SplitFunctionValue} */
    this.lineTemplate = helpers.isObj(lineParams) ? generateTemplate(lineType, /** @type {SplitTemplateParams} */(lineParams)) : lineParams;
    /** @type {String|false|SplitFunctionValue} */
    this.wordTemplate = helpers.isObj(wordParams) || this.linesOnly ? generateTemplate(wordType, /** @type {SplitTemplateParams} */(wordParams)) : wordParams;
    /** @type {String|false|SplitFunctionValue} */
    this.charTemplate = helpers.isObj(charParams) ? generateTemplate(charType, /** @type {SplitTemplateParams} */(charParams)) : charParams;
    this.$target = $target;
    this.html = $target && $target.innerHTML;
    this.lines = [];
    this.words = [];
    this.chars = [];
    this.effects = [];
    this.effectsCleanups = [];
    this.cache = null;
    this.ready = false;
    this.width = 0;
    this.resizeTimeout = null;
    const handleSplit = () => this.html && (lineParams || wordParams || charParams) && this.split();
    // Make sure this is declared before calling handleSplit() in case revert() is called inside an effect callback
    this.resizeObserver = new ResizeObserver(() => {
      // Use a setTimeout instead of a Timer for better tree shaking
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        const currentWidth = /** @type {HTMLElement} */($target).offsetWidth;
        if (currentWidth === this.width) return;
        this.width = currentWidth;
        handleSplit();
      }, 150);
    });
    // Only declare the font ready promise when splitting by lines and not alreay split
    if (this.lineTemplate && !this.ready) {
      consts.doc.fonts.ready.then(handleSplit);
    } else {
      handleSplit();
    }
    $target ? this.resizeObserver.observe($target) : console.warn('No Text Splitter target found.');
  }

  /**
   * @param  {(...args: any[]) => Tickable | (() => void)} effect
   * @return this
   */
  addEffect(effect) {
    if (!helpers.isFnc(effect)) return console.warn('Effect must return a function.');
    const refreshableEffect = time.keepTime(effect);
    this.effects.push(refreshableEffect);
    if (this.ready) this.effectsCleanups[this.effects.length - 1] = refreshableEffect(this);
    return this;
  }

  revert() {
    clearTimeout(this.resizeTimeout);
    this.lines.length = this.words.length = this.chars.length = 0;
    this.resizeObserver.disconnect();
    // Make sure to revert the effects after disconnecting the resizeObserver to avoid triggering it in the process
    this.effectsCleanups.forEach(cleanup => helpers.isFnc(cleanup) ? cleanup(this) : cleanup.revert && cleanup.revert());
    this.$target.innerHTML = this.html;
    return this;
  }

  /**
   * Recursively processes a node and its children
   * @param {Node} node
   */
  splitNode(node) {
    const wordTemplate = this.wordTemplate;
    const charTemplate = this.charTemplate;
    const includeSpaces = this.includeSpaces;
    const debug = this.debug;
    const nodeType = node.nodeType;
    if (nodeType === 3) {
      const nodeText = node.nodeValue;
      // If the nodeText is only whitespace, leave it as is
      if (nodeText.trim()) {
        const tempWords = [];
        const words = this.words;
        const chars = this.chars;
        const wordSegments = wordSegmenter.segment(nodeText);
        const $wordsFragment = consts.doc.createDocumentFragment();
        let prevSeg = null;
        for (const wordSegment of wordSegments) {
          const segment = wordSegment.segment;
          const isWordLike = isSegmentWordLike(wordSegment);
          // Determine if this segment should be a new word, first segment always becomes a new word
          if (!prevSeg || (isWordLike && (prevSeg && (isSegmentWordLike(prevSeg))))) {
            tempWords.push(segment);
          } else {
            // Only concatenate if both current and previous are non-word-like and don't contain spaces
            const lastWordIndex = tempWords.length - 1;
            const lastWord = tempWords[lastWordIndex];
            if (!lastWord.includes(' ') && !segment.includes(' ')) {
              tempWords[lastWordIndex] += segment;
            } else {
              tempWords.push(segment);
            }
          }
          prevSeg = wordSegment;
        }

        for (let i = 0, l = tempWords.length; i < l; i++) {
          const word = tempWords[i];
          if (!word.trim()) {
            // Preserve whitespace only if includeSpaces is false and if the current space is not the first node
            if (i && includeSpaces) continue;
            $wordsFragment.appendChild(consts.doc.createTextNode(word));
          } else {
            const nextWord = tempWords[i + 1];
            const hasWordFollowingSpace = includeSpaces && nextWord && !nextWord.trim();
            const wordToProcess = word;
            const charSegments = charTemplate ? graphemeSegmenter.segment(wordToProcess) : null;
            const $charsFragment = charTemplate ? consts.doc.createDocumentFragment() : consts.doc.createTextNode(hasWordFollowingSpace ? word + '\xa0' : word);
            if (charTemplate) {
              const charSegmentsArray = [...charSegments];
              for (let j = 0, jl = charSegmentsArray.length; j < jl; j++) {
                const charSegment = charSegmentsArray[j];
                const isLastChar = j === jl - 1;
                // If this is the last character and includeSpaces is true with a following space, append the space
                const charText = isLastChar && hasWordFollowingSpace ? charSegment.segment + '\xa0' : charSegment.segment;
                const $charNode = consts.doc.createTextNode(charText);
                processHTMLTemplate(charTemplate, chars, $charNode, /** @type {DocumentFragment} */($charsFragment), charType, debug, -1, words.length, chars.length);
              }
            }
            if (wordTemplate) {
              processHTMLTemplate(wordTemplate, words, $charsFragment, $wordsFragment, wordType, debug, -1, words.length, chars.length);
              // Chars elements must be re-parsed in the split() method if both words and chars are parsed
            } else if (charTemplate) {
              $wordsFragment.appendChild($charsFragment);
            } else {
              $wordsFragment.appendChild(consts.doc.createTextNode(word));
            }
            // Skip the next iteration if we included a space
            if (hasWordFollowingSpace) i++;
          }
        }
        node.parentNode.replaceChild($wordsFragment, node);
      }
    } else if (nodeType === 1) {
      // Converting to an array is necessary to work around childNodes pottential mutation
      const childNodes = /** @type {Array<Node>} */([.../** @type {*} */(node.childNodes)]);
      for (let i = 0, l = childNodes.length; i < l; i++) this.splitNode(childNodes[i]);
    }
  }

  /**
   * @param {Boolean} clearCache
   * @return {this}
   */
  split(clearCache = false) {
    const $el = this.$target;
    const isCached = !!this.cache && !clearCache;
    const lineTemplate = this.lineTemplate;
    const wordTemplate = this.wordTemplate;
    const charTemplate = this.charTemplate;
    const fontsReady = consts.doc.fonts.status !== 'loading';
    const canSplitLines = lineTemplate && fontsReady;
    this.ready = !lineTemplate || fontsReady;
    if (canSplitLines || clearCache) {
      // No need to revert effects animations here since it's already taken care by the refreshable
      this.effectsCleanups.forEach(cleanup => helpers.isFnc(cleanup) && cleanup(this));
    }
    if (!isCached) {
      if (clearCache) {
        $el.innerHTML = this.html;
        this.words.length = this.chars.length = 0;
      }
      this.splitNode($el);
      this.cache = $el.innerHTML;
    }
    if (canSplitLines) {
      if (isCached) $el.innerHTML = this.cache;
      this.lines.length = 0;
      if (wordTemplate) this.words = getAllTopLevelElements($el, wordType);
    }
    // Always reparse characters after a line reset or if both words and chars are activated
    if (charTemplate && (canSplitLines || wordTemplate)) {
      this.chars = getAllTopLevelElements($el, charType);
    }
    // Words are used when lines only and prioritized over chars
    const elementsArray = this.words.length ? this.words : this.chars;
    let y, linesCount = 0;
    for (let i = 0, l = elementsArray.length; i < l; i++) {
      const $el = elementsArray[i];
      const { top, height } = $el.getBoundingClientRect();
      if (y && top - y > height * .5) linesCount++;
      $el.setAttribute(dataLine, `${linesCount}`);
      const nested = $el.querySelectorAll(`[${dataLine}]`);
      let c = nested.length;
      while (c--) nested[c].setAttribute(dataLine, `${linesCount}`);
      y = top;
    }
    if (canSplitLines) {
      const linesFragment = consts.doc.createDocumentFragment();
      const parents = new Set();
      const clones = [];
      for (let lineIndex = 0; lineIndex < linesCount + 1; lineIndex++) {
        const $clone = /** @type {HTMLElement} */($el.cloneNode(true));
        filterLineElements($clone, lineIndex, new Set()).forEach($el => {
          const $parent = $el.parentElement;
          if ($parent) parents.add($parent);
          $el.remove();
        });
        clones.push($clone);
      }
      parents.forEach(filterEmptyElements);
      for (let cloneIndex = 0, clonesLength = clones.length; cloneIndex < clonesLength; cloneIndex++) {
        processHTMLTemplate(lineTemplate, this.lines, clones[cloneIndex], linesFragment, lineType, this.debug, cloneIndex);
      }
      $el.innerHTML = '';
      $el.appendChild(linesFragment);
      if (wordTemplate) this.words = getAllTopLevelElements($el, wordType);
      if (charTemplate) this.chars = getAllTopLevelElements($el, charType);
    }
    // Remove the word wrappers and clear the words array if lines split only
    if (this.linesOnly) {
      const words = this.words;
      let w = words.length;
      while (w--) {
        const $word = words[w];
        $word.replaceWith($word.textContent);
      }
      words.length = 0;
    }
    if (this.accessible && (canSplitLines || !isCached)) {
      const $accessible = consts.doc.createElement('span');
      // Make the accessible element visually-hidden (https://www.scottohara.me/blog/2017/04/14/inclusively-hidden.html)
      $accessible.style.cssText = `position:absolute;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;white-space:nowrap;`;
      // $accessible.setAttribute('tabindex', '-1');
      $accessible.innerHTML = this.html;
      $el.insertBefore($accessible, $el.firstChild);
      this.lines.forEach(setAriaHidden);
      this.words.forEach(setAriaHidden);
      this.chars.forEach(setAriaHidden);
    }
    this.width = /** @type {HTMLElement} */($el).offsetWidth;
    if (canSplitLines || clearCache) {
      this.effects.forEach((effect, i) => this.effectsCleanups[i] = effect(this));
    }
    return this;
  }

  refresh() {
    this.split(true);
  }
}

/**
 * @param  {HTMLElement|NodeList|String|Array<HTMLElement>} target
 * @param  {TextSplitterParams} [parameters]
 * @return {TextSplitter}
 */
const splitText = (target, parameters) => new TextSplitter(target, parameters);

/**
 * @deprecated text.split() is deprecated, import splitText() directly, or text.splitText()
 *
 * @param  {HTMLElement|NodeList|String|Array<HTMLElement>} target
 * @param  {TextSplitterParams} [parameters]
 * @return {TextSplitter}
 */
const split = (target, parameters) => {
  console.warn('text.split() is deprecated, import splitText() directly, or text.splitText()');
  return new TextSplitter(target, parameters);
};

exports.TextSplitter = TextSplitter;
exports.split = split;
exports.splitText = splitText;

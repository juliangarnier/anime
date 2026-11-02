/**
 * Anime.js - events - CJS
 * @version v5.0.0-beta.3
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var globals = require('../core/globals.cjs');
var helpers = require('../core/helpers.cjs');
var targets = require('../core/targets.cjs');
var values = require('../core/values.cjs');
var units = require('../core/units.cjs');
var timer = require('../timer/timer.cjs');
var target = require('../utils/target.cjs');
var time = require('../utils/time.cjs');
var number = require('../utils/number.cjs');
var none = require('../easings/none.cjs');
var parser = require('../easings/eases/parser.cjs');

/**
 * @import {
 *   TargetsParam,
 *   EasingFunction,
 *   Callback,
 *   EasingParam,
 *   ScrollThresholdValue,
 *   ScrollObserverParams,
 *   Tickable,
 *   ScrollThresholdParam,
 *   ScrollThresholdCallback,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   JSAnimation,
 * } from '../animation/animation.js'
*/

/**
 * @import {
 *   WAAPIAnimation,
 * } from '../waapi/waapi.js'
*/

/**
 * @import {
 *   Timeline,
 * } from '../timeline/timeline.js'
*/

/**
 * @return {Number}
 */
const getMaxViewHeight = () => {
  const $el = consts.doc.createElement('div');
  consts.doc.body.appendChild($el);
  $el.style.height = '100lvh';
  const height = $el.offsetHeight;
  consts.doc.body.removeChild($el);
  return height;
};

/**
 * @template {ScrollThresholdValue|String|Number|Boolean|Function|Object} T
 * @param {T | ((observer: ScrollObserver) => T)} value
 * @param {ScrollObserver} scroller
 * @return {T}
 */
const parseScrollObserverFunctionParameter = (value, scroller) => value && helpers.isFnc(value) ? /** @type {Function} */(value)(scroller) : /** @type {T} */(value);

const scrollContainers = new Map();

class ScrollContainer {
  /**
   * @param {HTMLElement} $el
   */
  constructor($el) {
    /** @type {HTMLElement} */
    this.element = $el;
    /** @type {Boolean} */
    this.useWin = this.element === consts.doc.body;
    /** @type {Number} */
    this.winWidth = 0;
    /** @type {Number} */
    this.winHeight = 0;
    /** @type {Number} */
    this.width = 0;
    /** @type {Number} */
    this.height = 0;
    /** @type {Number} */
    this.left = 0;
    /** @type {Number} */
    this.top = 0;
    /** @type {Number} */
    this.scale = 1;
    /** @type {Number} */
    this.zIndex = 0;
    /** @type {Number} */
    this.scrollX = 0;
    /** @type {Number} */
    this.scrollY = 0;
    /** @type {Number} */
    this.prevScrollX = 0;
    /** @type {Number} */
    this.prevScrollY = 0;
    /** @type {Number} */
    this.scrollWidth = 0;
    /** @type {Number} */
    this.scrollHeight = 0;
    /** @type {Number} */
    this.velocity = 0;
    /** @type {Boolean} */
    this.backwardX = false;
    /** @type {Boolean} */
    this.backwardY = false;
    /** @type {Timer} */
    this.scrollTicker = new timer.Timer({
      autoplay: false,
      onBegin: () => this.dataTimer.resume(),
      onUpdate: () => {
        const backwards = this.backwardX || this.backwardY;
        helpers.forEachChildren(this, (/** @type {ScrollObserver} */child) => child.handleScroll(), backwards);
      },
      onComplete: () => this.dataTimer.pause()
    }).init();
    /** @type {Timer} */
    this.dataTimer = new timer.Timer({
      autoplay: false,
      frameRate: 30,
      onUpdate: (/** @type {Timer} */self) => {
        const dt = self.deltaTime;
        const px = this.prevScrollX;
        const py = this.prevScrollY;
        const nx = this.scrollX;
        const ny = this.scrollY;
        const dx = px - nx;
        const dy = py - ny;
        this.prevScrollX = nx;
        this.prevScrollY = ny;
        if (dx) this.backwardX = px > nx;
        if (dy) this.backwardY = py > ny;
        this.velocity = helpers.round(dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0, 5);
      }
    }).init();
    /** @type {Timer} */
    this.resizeTicker = new timer.Timer({
      autoplay: false,
      duration: 250 * globals.globals.timeScale,
      onComplete: () => {
        this.updateWindowBounds();
        this.refreshScrollObservers();
        this.handleScroll();
      }
    }).init();
    /** @type {Timer} */
    this.wakeTicker = new timer.Timer({
      autoplay: false,
      duration: 500 * globals.globals.timeScale,
      onBegin: () => {
        this.scrollTicker.resume();
      },
      onComplete: () => {
        this.scrollTicker.pause();
      }
    }).init();
    /** @type {ScrollObserver} */
    this._head = null;
    /** @type {ScrollObserver} */
    this._tail = null;
    this.updateScrollCoords();
    this.updateWindowBounds();
    this.updateBounds();
    this.refreshScrollObservers();
    this.handleScroll();
    this.resizeObserver = new ResizeObserver(() => this.resizeTicker.restart());
    this.resizeObserver.observe(this.element);
    (this.useWin ? consts.win : this.element).addEventListener('scroll', this, false);
  }

  updateScrollCoords() {
    const useWin = this.useWin;
    const $el = this.element;
    this.scrollX = helpers.round(useWin ? consts.win.scrollX : $el.scrollLeft, 0);
    this.scrollY = helpers.round(useWin ? consts.win.scrollY : $el.scrollTop, 0);
  }

  updateWindowBounds() {
    this.winWidth = consts.win.innerWidth;
    this.winHeight = getMaxViewHeight();
  }

  updateBounds() {
    const style = getComputedStyle(this.element);
    const $el = this.element;
    this.scrollWidth = $el.scrollWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
    this.scrollHeight = $el.scrollHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
    this.updateWindowBounds();
    let width, height;
    if (this.useWin) {
      width = this.winWidth;
      height = this.winHeight;
    } else {
      const elRect = $el.getBoundingClientRect();
      width = $el.clientWidth;
      height = $el.clientHeight;
      this.top = elRect.top;
      this.left = elRect.left;
      this.scale = elRect.width ? width / elRect.width : (elRect.height ? height / elRect.height : 1);
    }
    this.width = width;
    this.height = height;
  }

  refreshScrollObservers() {
    helpers.forEachChildren(this, (/** @type {ScrollObserver} */child) => {
      if (!child.ready) return;
      if (child._debug && child.$debug) child.$debug.style.display = 'none';
    });
    this.updateBounds();
    helpers.forEachChildren(this, (/** @type {ScrollObserver} */child) => {
      if (!child.ready) return;
      child.refresh();
      child.onResize(child);
    });
  }

  refresh() {
    this.updateWindowBounds();
    this.updateBounds();
    this.refreshScrollObservers();
    this.handleScroll();
  }

  handleScroll() {
    this.updateScrollCoords();
    this.wakeTicker.restart();
  }

  /**
   * @param {Event} e
   */
  handleEvent(e) {
    switch (e.type) {
      case 'scroll':
        this.handleScroll();
        break;
    }
  }

  revert() {
    this.scrollTicker.cancel();
    this.dataTimer.cancel();
    this.resizeTicker.cancel();
    this.wakeTicker.cancel();
    this.resizeObserver.disconnect();
    (this.useWin ? consts.win : this.element).removeEventListener('scroll', this);
    scrollContainers.delete(this.element);
  }
}

/**
 * @param {TargetsParam} target
 * @return {ScrollContainer}
 */
const registerAndGetScrollContainer = target => {
  const $el = /** @type {HTMLElement} */(target ? targets.parseTargets(target)[0] || consts.doc.body : consts.doc.body);
  let scrollContainer = scrollContainers.get($el);
  if (!scrollContainer) {
    scrollContainer = new ScrollContainer($el);
    scrollContainers.set($el, scrollContainer);
  }
  return scrollContainer;
};

/**
 * @param {HTMLElement} $el
 * @param {Number|string} v
 * @param {Number} size
 * @param {Number} [under]
 * @param {Number} [over]
 * @return {Number}
 */
const convertValueToPx = ($el, v, size, under, over) => {
  const clampMin = v === 'min';
  const clampMax = v === 'max';
  const value = v === 'top' || v === 'left' || v === 'start' || clampMin ? 0 :
                v === 'bottom' || v === 'right' || v === 'end' || clampMax ? '100%' :
                v === 'center' ? '50%' :
                v;
  const { t, n, u } = values.decomposeRawValue(value);
  let px = n;
  if (u === '%') {
    px = (n / 100) * size;
  } else if (u) {
    px = units.convertValueUnit($el, n, u, 'px', t, true);
  }
  if (clampMax && under < 0) px += under;
  if (clampMin && over > 0) px += over;
  return px;
};

/**
 * @param {HTMLElement} $el
 * @param {ScrollThresholdValue} v
 * @param {Number} size
 * @param {Number} [under]
 * @param {Number} [over]
 * @return {Number}
 */
const parseBoundValue = ($el, v, size, under, over) => {
  /** @type {Number} */
  let value;
  if (helpers.isStr(v)) {
    const matchedOperator = consts.relativeValuesExecRgx.exec(/** @type {String} */(v));
    if (matchedOperator) {
      const splitter = matchedOperator[0];
      const operator = splitter[0];
      const splitted = /** @type {String} */(v).split(splitter);
      const clampMin = splitted[0] === 'min';
      const clampMax = splitted[0] === 'max';
      const valueAPx = convertValueToPx($el, splitted[0], size, under, over);
      const valueBPx = convertValueToPx($el, splitted[1], size, under, over);
      if (clampMin) {
        const min = values.getRelativeValue(convertValueToPx($el, 'min', size), valueBPx, operator);
        value = min < valueAPx ? valueAPx : min;
      } else if (clampMax) {
        const max = values.getRelativeValue(convertValueToPx($el, 'max', size), valueBPx, operator);
        value = max > valueAPx ? valueAPx : max;
      } else {
        value = values.getRelativeValue(valueAPx, valueBPx, operator);
      }
    } else {
      value = convertValueToPx($el, v, size, under, over);
    }
  } else {
    value = /** @type {Number} */(v);
  }
  return helpers.round(value, 0);
};

/**
 * @param {JSAnimation} linked
 * @return {HTMLElement}
 */
const getAnimationDomTarget = linked => {
  let $linkedTarget;
  const linkedTargets = linked.targets;
  for (let i = 0, l = linkedTargets.length; i < l; i++) {
    const target = linkedTargets[i];
    if (target[consts.isDomSymbol]) {
      $linkedTarget = /** @type {HTMLElement} */(target);
      break;
    }
  }
  return $linkedTarget;
};

let scrollerIndex = 0;

const debugColors = ['#B7FF54', '#FF4B4B'];

class ScrollObserver {
  /**
   * @param {ScrollObserverParams} parameters
   */
  constructor(parameters = {}) {
    if (globals.scope.current) globals.scope.current.register(this);
    const syncMode = values.setValue(parameters.sync, 'play pause');
    const ease = syncMode ? parser.parseEase(/** @type {EasingParam} */(syncMode)) : null;
    const isLinear = syncMode && (syncMode === 'linear' || syncMode === none.none);
    const isEase = syncMode && !(ease === none.none && !isLinear);
    const isSmooth = syncMode && (helpers.isNum(syncMode) || syncMode === true || isLinear);
    const isMethods = syncMode && (helpers.isStr(syncMode) && !isEase && !isSmooth);
    const syncMethods = isMethods ? /** @type {String} */(syncMode).split(' ').map(
      (/** @type {String} */m) => () => {
        const linked = this.linked;
        return linked && linked[m] ? linked[m]() : null;
      }
    ) : null;
    const biDirSync = isMethods && syncMethods.length > 2;
    /** @type {Number} */
    this.index = scrollerIndex++;
    /** @type {String|Number} */
    this.id = !helpers.isUnd(parameters.id) ? parameters.id : this.index;
    /** @type {ScrollContainer} */
    this.container = registerAndGetScrollContainer(parameters.container);
    /** @type {HTMLElement} */
    this.target = null;
    /** @type {Tickable|WAAPIAnimation} */
    this.linked = null;
    /** @type {Boolean} */
    this.repeat = null;
    /** @type {Boolean} */
    this.horizontal = null;
    /** @type {ScrollThresholdParam|ScrollThresholdValue|ScrollThresholdCallback} */
    this.enter = null;
    /** @type {ScrollThresholdParam|ScrollThresholdValue|ScrollThresholdCallback} */
    this.leave = null;
    /** @type {Boolean} */
    this.sync = isEase || isSmooth || !!syncMethods;
    /** @type {EasingFunction} */
    this.syncEase = isEase ? ease : null;
    /** @type {Number} */
    this.syncSmooth = isSmooth ? syncMode === true || isLinear ? 1 : /** @type {Number} */(syncMode) : null;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnter = syncMethods && !biDirSync && syncMethods[0] ? syncMethods[0] : consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeave = syncMethods && !biDirSync && syncMethods[1] ? syncMethods[1] : consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnterForward = syncMethods && biDirSync && syncMethods[0] ? syncMethods[0] : consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeaveForward = syncMethods && biDirSync && syncMethods[1] ? syncMethods[1] : consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnterBackward = syncMethods && biDirSync && syncMethods[2] ? syncMethods[2] : consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeaveBackward = syncMethods && biDirSync && syncMethods[3] ? syncMethods[3] : consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnter = parameters.onEnter || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeave = parameters.onLeave || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnterForward = parameters.onEnterForward || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeaveForward = parameters.onLeaveForward || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnterBackward = parameters.onEnterBackward || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeaveBackward = parameters.onLeaveBackward || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onUpdate = parameters.onUpdate || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onResize = parameters.onResize || consts.noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncComplete = parameters.onSyncComplete || consts.noop;
    /** @type {Boolean} */
    this.reverted = false;
    /** @type {Boolean} */
    this.ready = false;
    /** @type {Boolean} */
    this.completed = false;
    /** @type {Boolean} */
    this.began = false;
    /** @type {Boolean} */
    this.isInView = false;
    /** @type {Boolean} */
    this.forceEnter = false;
    /** @type {Boolean} */
    this.hasEntered = false;
    /** @type {Number} */
    this.offset = 0;
    /** @type {Number} */
    this.offsetStart = 0;
    /** @type {Number} */
    this.offsetEnd = 0;
    /** @type {Number} */
    this.distance = 0;
    /** @type {Number} */
    this.prevProgress = 0;
    /** @type {Array} */
    this.thresholds = ['start', 'end', 'end', 'start'];
    /** @type {[Number, Number, Number, Number]} */
    this.coords = [0, 0, 0, 0];
    /** @type {JSAnimation} */
    this.debugStyles = null;
    /** @type {HTMLElement} */
    this.$debug = null;
    /** @type {ScrollObserverParams} */
    this._params = parameters;
    /** @type {Boolean} */
    this._debug = values.setValue(parameters.debug, false);
    /** @type {ScrollObserver} */
    this._next = null;
    /** @type {ScrollObserver} */
    this._prev = null;
    helpers.addChild(this.container, this);
    // Wait for the next frame to add to the container in order to handle calls to link()
    time.sync(() => {
      if (this.reverted) return;
      if (!this.target) {
        const target = /** @type {HTMLElement} */(targets.parseTargets(parameters.target)[0]);
        this.target = target || consts.doc.body;
        this.refresh();
      }
    });
  }

  /**
   * @param {Tickable|WAAPIAnimation} linked
   */
  link(linked) {
    if (linked) {
      // Make sure to pause the linked object in case it's added later
      linked.pause();
      this.linked = linked;
      // Forces WAAPI Animation to persist; otherwise, they will stop syncing on finish.
      if (!helpers.isUnd(linked) && !helpers.isUnd(/** @type {WAAPIAnimation} */(linked).persist)) {
        /** @type {WAAPIAnimation} */(linked).persist = true;
      }
      // Try to use a target of the linked object if no target parameters specified
      if (!this._params.target) {
        /** @type {HTMLElement} */
        let $linkedTarget;
        if (!helpers.isUnd(/** @type {JSAnimation} */(linked).targets)) {
          $linkedTarget = getAnimationDomTarget(/** @type {JSAnimation} */(linked));
        } else {
          helpers.forEachChildren(/** @type {Timeline} */(linked), (/** @type {JSAnimation} */child) => {
            if (child.targets && !$linkedTarget) {
              $linkedTarget = getAnimationDomTarget(/** @type {JSAnimation} */(child));
            }
          });
        }
        // Fallback to body if no target found
        this.target = $linkedTarget || consts.doc.body;
        this.refresh();
      }
    }
    return this;
  }

  get velocity() {
    return this.container.velocity;
  }

  get backward() {
    return this.horizontal ? this.container.backwardX : this.container.backwardY;
  }

  get scroll() {
    return this.horizontal ? this.container.scrollX : this.container.scrollY;
  }

  get progress() {
    const p = (this.scroll - this.offsetStart) / this.distance;
    return p === Infinity || isNaN(p) ? 0 : helpers.round(helpers.clamp(p, 0, 1), 6);
  }

  refresh() {
    // This flag is used to prevent running handleScroll() outside of this.refresh() with values not yet calculated
    this.ready = true;
    this.reverted = false;
    const params = this._params;
    this.repeat = values.setValue(parseScrollObserverFunctionParameter(params.repeat, this), true);
    this.horizontal = values.setValue(parseScrollObserverFunctionParameter(params.axis, this), 'y') === 'x';
    this.enter = values.setValue(parseScrollObserverFunctionParameter(params.enter, this), 'end start');
    this.leave = values.setValue(parseScrollObserverFunctionParameter(params.leave, this), 'start end');
    this.updateBounds();
    this.handleScroll();
    return this;
  }

  removeDebug() {
    if (this.$debug) {
      this.$debug.parentNode.removeChild(this.$debug);
      this.$debug = null;
    }
    if (this.debugStyles) {
      this.debugStyles.revert();
      this.debugStyles = null;
    }
    return this;
  }

  /**
   * Rebuilds the debug overlay. Pass the previous observer to reuse its overlay element.
   * @param {ScrollObserver} [previous]
   * @return {this}
   */
  refreshDebug(previous) {
    if (previous && !this._debug) return this;
    if (previous && !this.$debug && previous.$debug
      && previous.container.element === this.container.element) {
      this.$debug = previous.$debug;
      this.debugStyles = previous.debugStyles;
      previous.$debug = null;
      previous.debugStyles = null;
    }
    if (!this.ready) return this;
    const container = this.container;
    const isHori = this.horizontal;
    let $debug = this.$debug;
    /** @type {HTMLElement} */
    let $containerMarkers;
    /** @type {HTMLElement} */
    let $targetMarkers;
    if (!$debug) {
      $debug = consts.doc.createElement('div');
      $containerMarkers = consts.doc.createElement('div');
      $targetMarkers = consts.doc.createElement('div');
      $debug.classList.add('animejs-onscroll-debug');
      for (let i = 0; i < 4; i++) {
        const $marker = consts.doc.createElement('div');
        const $line = consts.doc.createElement('div');
        const $text = consts.doc.createElement('div');
        $marker.appendChild($line);
        $marker.appendChild($text);
        (i > 1 ? $containerMarkers : $targetMarkers).appendChild($marker);
      }
      $debug.appendChild($containerMarkers);
      $debug.appendChild($targetMarkers);
      this.$debug = $debug;
    } else {
      $containerMarkers = /** @type {HTMLElement} */($debug.children[0]);
      $targetMarkers = /** @type {HTMLElement} */($debug.children[1]);
    }
    const inset = 10;
    const containerSize = isHori ? container.width : container.height;
    const scrollSize = isHori ? container.scrollWidth : container.scrollHeight;
    const crossSize = Math.max(0, (isHori ? container.height : container.width) - inset * 2);
    const zIndex = $debug.style.zIndex || container.zIndex++;
    /**
     * @param {String} p
     * @param {Number} l
     * @param {Number} t
     * @param {Number} w
     * @param {Number} h
     * @return {String}
     */
    const baseCSS = (p, l, t, w, h) => `position:${p};left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    $debug.style.cssText = `${baseCSS('absolute', isHori ? 0 : inset, isHori ? inset : 0, isHori ? scrollSize : crossSize, isHori ? crossSize : scrollSize)}
      pointer-events: none;
      z-index: ${zIndex};
    `;
    $containerMarkers.style.cssText = `${baseCSS('sticky', 0, 0, isHori ? containerSize : crossSize, isHori ? crossSize : containerSize)}`;
    $targetMarkers.style.cssText = `${baseCSS('absolute', 0, 0, isHori ? scrollSize : crossSize, isHori ? crossSize : scrollSize)}`;
    this.coords.forEach((v, i) => {
      const isContainer = i > 1;
      const isLeave = i % 2 === 1;
      const value = (isContainer ? 0 : this.offset) + v;
      const axisSize = isContainer ? containerSize : scrollSize;
      const alignBefore = value > axisSize / 2;
      const lineOffset = value === 0 ? 1 : alignBefore ? -1 : 0;
      const color = debugColors[+isLeave];
      const crossCSS = isHori
        ? isContainer ? 'top:0;' : 'bottom:0;'
        : isContainer ? 'left:0;' : 'right:0;';
      const axisCSS = isHori
        ? alignBefore ? `right:${-lineOffset}px;` : `left:${lineOffset}px;`
        : alignBefore ? `bottom:${-lineOffset}px;` : `top:${lineOffset}px;`;
      const $layer = isContainer ? $containerMarkers : $targetMarkers;
      const $marker = /** @type {HTMLElement} */($layer.children[+isLeave]);
      const $line = /** @type {HTMLElement} */($marker.children[0]);
      const $text = /** @type {HTMLElement} */($marker.children[1]);
      $marker.style.cssText = isHori
        ? baseCSS('absolute', value, 0, 0, crossSize)
        : baseCSS('absolute', 0, value, crossSize, 0);
      $line.style.cssText = isHori
        ? `position:absolute;left:${lineOffset}px;top:0;width:1px;height:100%;background-image:repeating-linear-gradient(${color} 0 2px,transparent 2px 4px);background-position-y:${isContainer ? 0 : 2}px;`
        : `position:absolute;left:0;top:${lineOffset}px;width:100%;height:1px;background-image:repeating-linear-gradient(90deg,${color} 0 2px,transparent 2px 4px);background-position-x:${isContainer ? 0 : 2}px;`;
      $text.textContent = `${isContainer ? 'container' : 'target'}: ${this.thresholds[i]}`;
      $text.style.cssText = `
        position: absolute;
        ${crossCSS}
        ${axisCSS}
        max-width: 140px;
        overflow: hidden;
        padding: 2px 3px;
        border-radius: 2px;
        background-color: ${color};
        color: #000;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        font-weight: 600;
        letter-spacing: -.025em;
        line-height: 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
      `;
    });

    if (!$debug.isConnected) container.element.appendChild($debug);
    if (!this.debugStyles && target.get(container.element, 'position') === 'static') {
      this.debugStyles = target.set(container.element, { position: 'relative '});
    }
    return this;
  }

  /** @return {this} */
  debug() {
    return this.refreshDebug();
  }

  updateBounds() {
    if (this._debug && this.$debug) this.$debug.style.display = 'none';
    let stickys;
    const $target = this.target;
    const container = this.container;
    const isHori = this.horizontal;
    const linked = this.linked;
    let linkedTime;
    let $el = $target;
    // let offsetX = 0;
    // let offsetY = 0;
    // let $offsetParent = $el;
    if (linked) {
      linkedTime = linked.currentTime;
      linked.seek(0, true);
    }
    // Old implementation to get offset and targetSize before fixing https://github.com/juliangarnier/anime/issues/1021
    // const isContainerStatic = get(container.element, 'position') === 'static' ? set(container.element, { position: 'relative '}) : false;
    // while ($el && $el !== container.element && $el !== doc.body) {
    //   const isSticky = get($el, 'position') === 'sticky' ?
    //                    set($el, { position: 'static' }) :
    //                    false;
    //   if ($el === $offsetParent) {
    //     offsetX += $el.offsetLeft || 0;
    //     offsetY += $el.offsetTop || 0;
    //     $offsetParent = $el.offsetParent;
    //   }
    //   $el = /** @type {HTMLElement} */($el.parentElement);
    //   if (isSticky) {
    //     if (!stickys) stickys = [];
    //     stickys.push(isSticky);
    //   }
    // }
    // if (isContainerStatic) isContainerStatic.revert();
    // const offset = isHori ? offsetX : offsetY;
    // const targetSize = isHori ? $target.offsetWidth : $target.offsetHeight;

    while ($el && $el !== container.element && $el !== consts.doc.body) {
      const isSticky = target.get($el, 'position') === 'sticky' ? target.set($el, { position: 'static' }) : false;
      $el = $el.parentElement;
      if (isSticky) {
        if (!stickys) stickys = [];
        stickys.push(isSticky);
      }
    }
    const rect = $target.getBoundingClientRect();
    const scale = container.scale;
    const offset = (isHori ? rect.left + container.scrollX - container.left : rect.top + container.scrollY - container.top) * scale;
    const targetSize = (isHori ? rect.width : rect.height) * scale;
    const containerSize = isHori ? container.width : container.height;
    const scrollSize = isHori ? container.scrollWidth : container.scrollHeight;
    const maxScroll = scrollSize - containerSize;
    const enter = this.enter;
    const leave = this.leave;

    /** @type {ScrollThresholdValue} */
    let enterTarget = 'start';
    /** @type {ScrollThresholdValue} */
    let leaveTarget = 'end';
    /** @type {ScrollThresholdValue} */
    let enterContainer = 'end';
    /** @type {ScrollThresholdValue} */
    let leaveContainer = 'start';

    if (helpers.isStr(enter)) {
      const splitted = /** @type {String} */(enter).split(' ');
      enterContainer = splitted[0];
      enterTarget = splitted.length > 1 ? splitted[1] : enterTarget;
    } else if (helpers.isObj(enter)) {
      const e = /** @type {ScrollThresholdParam} */(enter);
      if (!helpers.isUnd(e.container)) enterContainer = e.container;
      if (!helpers.isUnd(e.target)) enterTarget = e.target;
    } else if (helpers.isNum(enter)) {
      enterContainer = /** @type {Number} */(enter);
    }

    if (helpers.isStr(leave)) {
      const splitted = /** @type {String} */(leave).split(' ');
      leaveContainer = splitted[0];
      leaveTarget = splitted.length > 1 ? splitted[1] : leaveTarget;
    } else if (helpers.isObj(leave)) {
      const t = /** @type {ScrollThresholdParam} */(leave);
      if (!helpers.isUnd(t.container)) leaveContainer = t.container;
      if (!helpers.isUnd(t.target)) leaveTarget = t.target;
    } else if (helpers.isNum(leave)) {
      leaveContainer = /** @type {Number} */(leave);
    }

    const parsedEnterTarget = parseBoundValue($target, enterTarget, targetSize);
    const parsedLeaveTarget = parseBoundValue($target, leaveTarget, targetSize);
    const under = (parsedEnterTarget + offset) - containerSize;
    const over = (parsedLeaveTarget + offset) - maxScroll;
    const parsedEnterContainer = parseBoundValue($target, enterContainer, containerSize, under, over);
    const parsedLeaveContainer = parseBoundValue($target, leaveContainer, containerSize, under, over);
    const offsetStart = parsedEnterTarget + offset - parsedEnterContainer;
    const offsetEnd = parsedLeaveTarget + offset - parsedLeaveContainer;
    const scrollDelta = offsetEnd - offsetStart;
    this.offset = offset;
    this.offsetStart = offsetStart;
    this.offsetEnd = offsetEnd;
    this.distance = scrollDelta <= 0 ? 0 : scrollDelta;
    this.thresholds = [enterTarget, leaveTarget, enterContainer, leaveContainer];
    this.coords = [parsedEnterTarget, parsedLeaveTarget, parsedEnterContainer, parsedLeaveContainer];
    if (stickys) {
      stickys.forEach(sticky => sticky.revert());
    }
    if (linked) {
      linked.seek(linkedTime, true);
    }
    if (this._debug) {
      this.debug();
    }
  }

  handleScroll() {
    if (!this.ready) return;
    const linked = this.linked;
    const sync = this.sync;
    const syncEase = this.syncEase;
    const syncSmooth = this.syncSmooth;
    const shouldSeek = linked && (syncEase || syncSmooth);
    const isHori = this.horizontal;
    const container = this.container;
    const scroll = this.scroll;
    const isBefore = scroll <= this.offsetStart;
    const isAfter = scroll >= this.offsetEnd;
    const isInView = !isBefore && !isAfter;
    const isOnTheEdge = scroll === this.offsetStart || scroll === this.offsetEnd;
    const forceEnter = !this.hasEntered && isOnTheEdge;
    const $debug = this._debug && this.$debug;
    let hasUpdated = false;
    let syncCompleted = false;
    let p = this.progress;

    if (isBefore && this.began) {
      this.began = false;
    }

    if (p > 0 && !this.began) {
      this.began = true;
    }

    if (shouldSeek) {
      const lp = linked.progress;
      if (syncSmooth && helpers.isNum(syncSmooth)) {
        if (/** @type {Number} */(syncSmooth) < 1) {
          const step = 0.0001;
          const snap = lp < p && p === 1 ? step : lp > p && !p ? -step : 0;
          const deltaTime = container.scrollTicker.deltaTime / globals.globals.timeScale;
          p = helpers.round(number.damp(lp, p, deltaTime, helpers.lerp(.006, .134, /** @type {Number} */(syncSmooth))) + snap, 6);
        }
      } else if (syncEase) {
        p = syncEase(p);
      }
      hasUpdated = p !== this.prevProgress;
      syncCompleted = lp === 1;
      if (hasUpdated && !syncCompleted && (syncSmooth && lp)) {
        container.wakeTicker.restart();
      }
    }

    if ($debug) {
      const sticky = isHori ? container.scrollY : container.scrollX;
      $debug.style[isHori ? 'top' : 'left'] = sticky + 10 + 'px';
    }

    // Trigger enter callbacks if already in view or when entering the view
    if ((isInView && !this.isInView) || (forceEnter && !this.forceEnter && !this.hasEntered)) {
      if (isInView) this.isInView = true;
      if (!this.forceEnter || !this.hasEntered) {
        if ($debug && isInView) $debug.style.zIndex = `${this.container.zIndex++}`;
        this.onSyncEnter(this);
        this.onEnter(this);
        if (this.backward) {
          this.onSyncEnterBackward(this);
          this.onEnterBackward(this);
        } else {
          this.onSyncEnterForward(this);
          this.onEnterForward(this);
        }
        this.hasEntered = true;
        if (forceEnter) this.forceEnter = true;
      } else if (isInView) {
        this.forceEnter = false;
      }
    }

    if (isInView || !isInView && this.isInView) {
      hasUpdated = true;
    }

    if (hasUpdated) {
      if (shouldSeek) linked.seek(linked.duration * p);
      this.onUpdate(this);
    }

    if (!isInView && this.isInView) {
      this.isInView = false;
      this.onSyncLeave(this);
      this.onLeave(this);
      if (this.backward) {
        this.onSyncLeaveBackward(this);
        this.onLeaveBackward(this);
      } else {
        this.onSyncLeaveForward(this);
        this.onLeaveForward(this);
      }
      if (sync && !syncSmooth) {
        syncCompleted = true;
      }
    }

    if (p >= 1 && this.began && !this.completed && (sync && syncCompleted || !sync)) {
      if (sync) {
        this.onSyncComplete(this);
      }
      this.completed = true;
      if ((!this.repeat && !linked) || (!this.repeat && linked && linked.completed)) {
        this.revert();
      }
    }

    if (p < 1 && this.completed) {
      this.completed = false;
    }

    this.prevProgress = p;
  }

  revert() {
    if (this.reverted) return;
    const container = this.container;
    helpers.removeChild(container, this);
    if (!container._head) {
      container.revert();
    }
    if (this._debug) {
      this.removeDebug();
    }
    this.reverted = true;
    this.ready = false;
    return this;
  }

}

/**
 * @param {ScrollObserverParams} [parameters={}]
 * @return {ScrollObserver}
 */
const onScrollFactory = (parameters = {}) => new ScrollObserver(parameters);

/**
 * Creates a scroll observer, linking a scroll position to an animation's playback.
 * @type {typeof onScrollFactory}
 */
const onScroll = /** @type {typeof onScrollFactory} */(globals.makeTweakable('OnScroll', 'onScroll', onScrollFactory));

exports.ScrollObserver = ScrollObserver;
exports.onScroll = onScroll;
exports.scrollContainers = scrollContainers;

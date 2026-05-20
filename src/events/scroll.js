import {
  win,
  doc,
  noop,
  isDomSymbol,
  relativeValuesExecRgx,
} from '../core/consts.js';

import {
  scope,
  globals,
} from '../core/globals.js';

import {
  addChild,
  removeChild,
  forEachChildren,
  lerp,
  clamp,
  round,
  isFnc,
  isNum,
  isObj,
  isStr,
  isUnd,
} from '../core/helpers.js';

import {
  parseTargets,
} from '../core/targets.js';

import {
  decomposeRawValue,
  decomposedOriginalValue,
  getRelativeValue,
  setValue,
} from '../core/values.js';

import {
  convertValueUnit,
} from '../core/units.js';

import {
  Timer,
} from '../timer/timer.js';

import {
  get,
  set,
} from '../utils/target.js';

import {
  sync,
} from '../utils/time.js';

import {
  none,
} from '../easings/none.js';

import {
  parseEase,
} from '../easings/eases/parser.js';

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
  const $el = doc.createElement('div');
  doc.body.appendChild($el);
  $el.style.height = '100lvh';
  const height = $el.offsetHeight;
  doc.body.removeChild($el);
  return height;
}

/**
 * @template {ScrollThresholdValue|String|Number|Boolean|Function|Object} T
 * @param {T | ((observer: ScrollObserver) => T)} value
 * @param {ScrollObserver} scroller
 * @return {T}
 */
const parseScrollObserverFunctionParameter = (value, scroller) => value && isFnc(value) ? /** @type {Function} */(value)(scroller) : /** @type {T} */(value);

export const scrollContainers = new Map();

class ScrollContainer {
  /**
   * @param {HTMLElement} $el
   */
  constructor($el) {
    /** @type {HTMLElement} */
    this.element = $el;
    /** @type {Boolean} */
    this.useWin = this.element === doc.body;
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
    this.scrollTicker = new Timer({
      autoplay: false,
      onBegin: () => this.dataTimer.resume(),
      onUpdate: () => {
        const backwards = this.backwardX || this.backwardY;
        forEachChildren(this, (/** @type {ScrollObserver} */child) => child.handleScroll(), backwards);
      },
      onComplete: () => this.dataTimer.pause()
    }).init();
    /** @type {Timer} */
    this.dataTimer = new Timer({
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
        this.velocity = round(dt > 0 ? Math.sqrt(dx * dx + dy * dy) / dt : 0, 5);
      }
    }).init();
    /** @type {Timer} */
    this.resizeTicker = new Timer({
      autoplay: false,
      duration: 250 * globals.timeScale,
      onComplete: () => {
        this.updateWindowBounds();
        this.refreshScrollObservers();
        this.handleScroll();
      }
    }).init();
    /** @type {Timer} */
    this.wakeTicker = new Timer({
      autoplay: false,
      duration: 500 * globals.timeScale,
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
    (this.useWin ? win : this.element).addEventListener('scroll', this, false);
  }

  updateScrollCoords() {
    const useWin = this.useWin;
    const $el = this.element;
    this.scrollX = round(useWin ? win.scrollX : $el.scrollLeft, 0);
    this.scrollY = round(useWin ? win.scrollY : $el.scrollTop, 0);
  }

  updateWindowBounds() {
    this.winWidth = win.innerWidth;
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
    forEachChildren(this, (/** @type {ScrollObserver} */child) => {
      if (child._debug) {
        child.removeDebug();
      }
    });
    this.updateBounds();
    forEachChildren(this, (/** @type {ScrollObserver} */child) => {
      child.refresh();
      child.onResize(child);
      if (child._debug) {
        child.debug();
      }
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
    (this.useWin ? win : this.element).removeEventListener('scroll', this);
    scrollContainers.delete(this.element);
  }
}

/**
 * @param {TargetsParam} target
 * @return {ScrollContainer}
 */
const registerAndGetScrollContainer = target => {
  const $el = /** @type {HTMLElement} */(target ? parseTargets(target)[0] || doc.body : doc.body);
  let scrollContainer = scrollContainers.get($el);
  if (!scrollContainer) {
    scrollContainer = new ScrollContainer($el);
    scrollContainers.set($el, scrollContainer);
  }
  return scrollContainer;
}

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
  const { n, u } = decomposeRawValue(value, decomposedOriginalValue);
  let px = n;
  if (u === '%') {
    px = (n / 100) * size;
  } else if (u) {
    px = convertValueUnit($el, decomposedOriginalValue, 'px', true).n;
  }
  if (clampMax && under < 0) px += under;
  if (clampMin && over > 0) px += over;
  return px;
}

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
  if (isStr(v)) {
    const matchedOperator = relativeValuesExecRgx.exec(/** @type {String} */(v));
    if (matchedOperator) {
      const splitter = matchedOperator[0];
      const operator = splitter[0];
      const splitted = /** @type {String} */(v).split(splitter);
      const clampMin = splitted[0] === 'min';
      const clampMax = splitted[0] === 'max';
      const valueAPx = convertValueToPx($el, splitted[0], size, under, over);
      const valueBPx = convertValueToPx($el, splitted[1], size, under, over);
      if (clampMin) {
        const min = getRelativeValue(convertValueToPx($el, 'min', size), valueBPx, operator);
        value = min < valueAPx ? valueAPx : min;
      } else if (clampMax) {
        const max = getRelativeValue(convertValueToPx($el, 'max', size), valueBPx, operator);
        value = max > valueAPx ? valueAPx : max;
      } else {
        value = getRelativeValue(valueAPx, valueBPx, operator);
      }
    } else {
      value = convertValueToPx($el, v, size, under, over);
    }
  } else {
    value = /** @type {Number} */(v);
  }
  return round(value, 0);
}

/**
 * @param {JSAnimation} linked
 * @return {HTMLElement}
 */
const getAnimationDomTarget = linked => {
  let $linkedTarget;
  const linkedTargets = linked.targets;
  for (let i = 0, l = linkedTargets.length; i < l; i++) {
    const target = linkedTargets[i];
    if (target[isDomSymbol]) {
      $linkedTarget = /** @type {HTMLElement} */(target);
      break;
    }
  }
  return $linkedTarget;
}

let scrollerIndex = 0;

const debugColors = ['#FF4B4B','#FF971B','#FFC730','#F9F640','#7AFF5A','#18FF74','#17E09B','#3CFFEC','#05DBE9','#33B3F1','#638CF9','#C563FE','#FF4FCF','#F93F8A'];

export class ScrollObserver {
  /**
   * @param {ScrollObserverParams} parameters
   */
  constructor(parameters = {}) {
    if (scope.current) scope.current.register(this);
    const syncMode = setValue(parameters.sync, 'play pause');
    const ease = syncMode ? parseEase(/** @type {EasingParam} */(syncMode)) : null;
    const isLinear = syncMode && (syncMode === 'linear' || syncMode === none);
    const isEase = syncMode && !(ease === none && !isLinear);
    const isSmooth = syncMode && (isNum(syncMode) || syncMode === true || isLinear);
    const isMethods = syncMode && (isStr(syncMode) && !isEase && !isSmooth);
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
    this.id = !isUnd(parameters.id) ? parameters.id : this.index;
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
    this.onSyncEnter = syncMethods && !biDirSync && syncMethods[0] ? syncMethods[0] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeave = syncMethods && !biDirSync && syncMethods[1] ? syncMethods[1] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnterForward = syncMethods && biDirSync && syncMethods[0] ? syncMethods[0] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeaveForward = syncMethods && biDirSync && syncMethods[1] ? syncMethods[1] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncEnterBackward = syncMethods && biDirSync && syncMethods[2] ? syncMethods[2] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncLeaveBackward = syncMethods && biDirSync && syncMethods[3] ? syncMethods[3] : noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnter = parameters.onEnter || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeave = parameters.onLeave || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnterForward = parameters.onEnterForward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeaveForward = parameters.onLeaveForward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onEnterBackward = parameters.onEnterBackward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onLeaveBackward = parameters.onLeaveBackward || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onUpdate = parameters.onUpdate || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onResize = parameters.onResize || noop;
    /** @type {Callback<ScrollObserver>} */
    this.onSyncComplete = parameters.onSyncComplete || noop;
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
    this._debug = setValue(parameters.debug, false);
    /** @type {ScrollObserver} */
    this._next = null;
    /** @type {ScrollObserver} */
    this._prev = null;
    addChild(this.container, this);
    // Wait for the next frame to add to the container in order to handle calls to link()
    sync(() => {
      if (this.reverted) return;
      if (!this.target) {
        const target = /** @type {HTMLElement} */(parseTargets(parameters.target)[0]);
        this.target = target || doc.body;
        this.refresh();
      }
      if (this._debug) this.debug();
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
      if (!isUnd(linked) && !isUnd(/** @type {WAAPIAnimation} */(linked).persist)) {
        /** @type {WAAPIAnimation} */(linked).persist = true;
      }
      // Try to use a target of the linked object if no target parameters specified
      if (!this._params.target) {
        /** @type {HTMLElement} */
        let $linkedTarget;
        if (!isUnd(/** @type {JSAnimation} */(linked).targets)) {
          $linkedTarget = getAnimationDomTarget(/** @type {JSAnimation} */(linked));
        } else {
          forEachChildren(/** @type {Timeline} */(linked), (/** @type {JSAnimation} */child) => {
            if (child.targets && !$linkedTarget) {
              $linkedTarget = getAnimationDomTarget(/** @type {JSAnimation} */(child));
            }
          });
        }
        // Fallback to body if no target found
        this.target = $linkedTarget || doc.body;
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
    return p === Infinity || isNaN(p) ? 0 : round(clamp(p, 0, 1), 6);
  }

  refresh() {
    // This flag is used to prevent running handleScroll() outside of this.refresh() with values not yet calculated
    this.ready = true;
    this.reverted = false;
    const params = this._params;
    this.repeat = setValue(parseScrollObserverFunctionParameter(params.repeat, this), true);
    this.horizontal = setValue(parseScrollObserverFunctionParameter(params.axis, this), 'y') === 'x';
    this.enter = setValue(parseScrollObserverFunctionParameter(params.enter, this), 'end start');
    this.leave = setValue(parseScrollObserverFunctionParameter(params.leave, this), 'start end');
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
      this.$debug = null;
    }
    return this;
  }

  debug() {
    this.removeDebug();
    const container = this.container;
    const isHori = this.horizontal;
    const $existingDebug = container.element.querySelector(':scope > .animejs-onscroll-debug');
    const $debug = doc.createElement('div');
    const $thresholds = doc.createElement('div');
    const $triggers = doc.createElement('div');
    const color = debugColors[this.index % debugColors.length];
    const useWin = container.useWin;
    const containerWidth = useWin ? container.winWidth : container.width;
    const containerHeight = useWin ? container.winHeight : container.height;
    const scrollWidth = container.scrollWidth;
    const scrollHeight = container.scrollHeight;
    const size = this.container.width > 360 ? 320 : 260;
    const offLeft = isHori ? 0 : 10;
    const offTop = isHori ? 10 : 0;
    const half = isHori ? 24 : size / 2;
    const labelHeight = isHori ? half : 15;
    const labelWidth = isHori ? 60 : half;
    const labelSize = isHori ? labelWidth : labelHeight;
    const repeat = isHori ? 'repeat-x' : 'repeat-y';
    /**
     * @param {Number} v
     * @return {String}
     */
    const gradientOffset = v => isHori ? '0px '+(v)+'px' : (v)+'px'+' 2px';
    /**
     * @param {String} c
     * @return {String}
     */
    const lineCSS = (c) => `linear-gradient(${isHori ? 90 : 0}deg, ${c} 2px, transparent 1px)`;
    /**
     * @param {String} p
     * @param {Number} l
     * @param {Number} t
     * @param {Number} w
     * @param {Number} h
     * @return {String}
     */
    const baseCSS = (p, l, t, w, h) => `position:${p};left:${l}px;top:${t}px;width:${w}px;height:${h}px;`;
    $debug.style.cssText = `${baseCSS('absolute', offLeft, offTop, isHori ? scrollWidth : size, isHori ? size : scrollHeight)}
      pointer-events: none;
      z-index: ${this.container.zIndex++};
      display: flex;
      flex-direction: ${isHori ? 'column' : 'row'};
      filter: drop-shadow(0px 1px 0px rgba(0,0,0,.75));
    `;
    $thresholds.style.cssText = `${baseCSS('sticky', 0, 0, isHori ? containerWidth : half, isHori ? half : containerHeight)}`;
    if (!$existingDebug) {
      $thresholds.style.cssText += `background:
        ${lineCSS('#FFFF')}${gradientOffset(half-10)} / ${isHori ? '100px 100px' : '100px 100px'} ${repeat},
        ${lineCSS('#FFF8')}${gradientOffset(half-10)} / ${isHori ? '10px 10px' : '10px 10px'} ${repeat};
      `;
    }
    $triggers.style.cssText = `${baseCSS('relative', 0, 0, isHori ? scrollWidth : half, isHori ? half : scrollHeight)}`;
    if (!$existingDebug) {
      $triggers.style.cssText += `background:
        ${lineCSS('#FFFF')}${gradientOffset(0)} / ${isHori ? '100px 10px' : '10px 100px'} ${repeat},
        ${lineCSS('#FFF8')}${gradientOffset(0)} / ${isHori ? '10px 0px' : '0px 10px'} ${repeat};
      `;
    }
    const labels = [' enter: ', ' leave: '];
    this.coords.forEach((v, i) => {
      const isView = i > 1;
      const value = (isView ? 0 : this.offset) + v;
      const isTail = i % 2;
      const isFirst = value < labelSize;
      const isOver = value > (isView ? isHori ? containerWidth : containerHeight : isHori ? scrollWidth : scrollHeight) - labelSize;
      const isFlip = (isView ? isTail && !isFirst : !isTail && !isFirst) || isOver;
      const $label = doc.createElement('div');
      const $text = doc.createElement('div');
      const dirProp = isHori ? isFlip ? 'right' : 'left' : isFlip ? 'bottom' : 'top';
      const flipOffset = isFlip ? (isHori ? labelWidth : labelHeight) + (!isView ? isHori ? -1 : -2 : isHori ? -1 : isOver ? 0 : -2) : !isView ? isHori ? 1 : 0 : isHori ? 1 : 0;
      // $text.innerHTML = `${!isView ? '' : labels[isTail] + ' '}${this.id}: ${this.thresholds[i]} ${isView ? '' : labels[isTail]}`;
      $text.innerHTML = `${this.id}${labels[isTail]}${this.thresholds[i]}`;
      $label.style.cssText = `${baseCSS('absolute', 0, 0, labelWidth, labelHeight)}
        display: flex;
        flex-direction: ${isHori ? 'column' : 'row'};
        justify-content: flex-${isView ? 'start' : 'end'};
        align-items: flex-${isFlip ? 'end' : 'start'};
        border-${dirProp}: 2px ${isTail ? 'solid' : 'solid'} ${color};
      `;
      $text.style.cssText = `
        overflow: hidden;
        max-width: ${(size / 2) - 10}px;
        height: ${labelHeight};
        margin-${isHori ? isFlip ? 'right' : 'left' : isFlip ? 'bottom' : 'top'}: -2px;
        padding: 1px;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: -.025em;
        line-height: 9px;
        font-weight: 600;
        text-align: ${isHori && isFlip || !isHori && !isView ? 'right' : 'left'};
        white-space: pre;
        text-overflow: ellipsis;
        color: ${isTail ? color : 'rgba(0,0,0,.75)'};
        background-color: ${isTail ? 'rgba(0,0,0,.65)' : color};
        border: 2px solid ${isTail ? color : 'transparent'};
        border-${isHori ? isFlip ? 'top-left' : 'top-right' : isFlip ? 'top-left' : 'bottom-left'}-radius: 5px;
        border-${isHori ? isFlip ? 'bottom-left' : 'bottom-right' : isFlip ? 'top-right' : 'bottom-right'}-radius: 5px;
      `;
      $label.appendChild($text);
      let position = value - flipOffset + (isHori ? 1 : 0);
      $label.style[isHori ? 'left' : 'top'] = `${position}px`;
      // $label.style[isHori ? 'left' : 'top'] = value - flipOffset + (!isFlip && isFirst && !isView ? 1 : isFlip ? 0 : -2) + 'px';
      (isView ? $thresholds : $triggers).appendChild($label);
    });

    $debug.appendChild($thresholds);
    $debug.appendChild($triggers);
    container.element.appendChild($debug);

    if (!$existingDebug) $debug.classList.add('animejs-onscroll-debug');
    this.$debug = $debug;
    const containerPosition = get(container.element, 'position');
    if (containerPosition === 'static') {
      this.debugStyles = set(container.element, { position: 'relative '});
    }

  }

  updateBounds() {
    if (this._debug) {
      this.removeDebug();
    }
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

    while ($el && $el !== container.element && $el !== doc.body) {
      const isSticky = get($el, 'position') === 'sticky' ? set($el, { position: 'static' }) : false;
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

    if (isStr(enter)) {
      const splitted = /** @type {String} */(enter).split(' ');
      enterContainer = splitted[0];
      enterTarget = splitted.length > 1 ? splitted[1] : enterTarget;
    } else if (isObj(enter)) {
      const e = /** @type {ScrollThresholdParam} */(enter);
      if (!isUnd(e.container)) enterContainer = e.container;
      if (!isUnd(e.target)) enterTarget = e.target;
    } else if (isNum(enter)) {
      enterContainer = /** @type {Number} */(enter);
    }

    if (isStr(leave)) {
      const splitted = /** @type {String} */(leave).split(' ');
      leaveContainer = splitted[0];
      leaveTarget = splitted.length > 1 ? splitted[1] : leaveTarget;
    } else if (isObj(leave)) {
      const t = /** @type {ScrollThresholdParam} */(leave);
      if (!isUnd(t.container)) leaveContainer = t.container;
      if (!isUnd(t.target)) leaveTarget = t.target;
    } else if (isNum(leave)) {
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
      if (syncSmooth && isNum(syncSmooth)) {
        if (/** @type {Number} */(syncSmooth) < 1) {
          const step = 0.0001;
          const snap = lp < p && p === 1 ? step : lp > p && !p ? -step : 0;
          p = round(lerp(lp, p, lerp(.01, .2, /** @type {Number} */(syncSmooth))) + snap, 6);
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
    removeChild(container, this);
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
export const onScroll = (parameters = {}) => new ScrollObserver(parameters);

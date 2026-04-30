/**
 * Anime.js - layout - CJS
 * @version v4.4.1
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var helpers = require('../core/helpers.cjs');
var targets = require('../core/targets.cjs');
var parser = require('../easings/eases/parser.cjs');
var values = require('../core/values.cjs');
var timeline = require('../timeline/timeline.cjs');
var waapi = require('../waapi/waapi.cjs');
var globals = require('../core/globals.cjs');

/**
 * @import {
 *   AnimationParams,
 *   RenderableCallbacks,
 *   TickableCallbacks,
 *   TimelineParams,
 *   TimerParams,
 * } from '../types/index.js'
*/

/**
 * @import {
 *   ScrollObserver,
 * } from '../events/scroll.js'
*/

/**
 * @import {
 *   Timeline,
 * } from '../timeline/timeline.js'
*/

/**
 * @import {
 *   WAAPIAnimation
 * } from '../waapi/waapi.js'
*/

/**
 * @import {
 *   Spring,
 } from '../easings/spring/index.js'
*/

/**
 * @import {
 *   DOMTarget,
 *   DOMTargetSelector,
 *   FunctionValue,
 *   EasingParam,
 } from '../types/index.js'
*/

/**
 * @typedef {DOMTargetSelector|Array<DOMTargetSelector>} LayoutChildrenParam
 */

/**
 * @typedef {Object} LayoutAnimationTimingsParams
 * @property {Number|FunctionValue} [delay]
 * @property {Number|FunctionValue} [duration]
 * @property {EasingParam|FunctionValue} [ease]
 */

/**
 * @typedef {Record<String, Number|String|FunctionValue>} LayoutStateAnimationProperties
 */

/**
 * @typedef {LayoutStateAnimationProperties & LayoutAnimationTimingsParams} LayoutStateParams
 */

/**
 * @typedef {Object} LayoutSpecificAnimationParams
 * @property {Number|String} [id]
 * @property {Number|FunctionValue} [delay]
 * @property {Number|FunctionValue} [duration]
 * @property {EasingParam|FunctionValue} [ease]
 * @property {EasingParam} [playbackEase]
 * @property {LayoutStateParams} [swapAt]
 * @property {LayoutStateParams} [enterFrom]
 * @property {LayoutStateParams} [leaveTo]
 */

/**
 * @typedef {LayoutSpecificAnimationParams & TimerParams & TickableCallbacks<Timeline> & RenderableCallbacks<Timeline>} LayoutAnimationParams
 */

/**
 * @typedef {Object} LayoutOptions
 * @property {LayoutChildrenParam} [children]
 * @property {Array<String>} [properties]
 */

/**
 * @typedef {LayoutAnimationParams & LayoutOptions} AutoLayoutParams
 */

/**
 * @typedef {Record<String, Number|String|FunctionValue> & {
 *   transform: String,
 *   x: Number,
 *   y: Number,
 *   left: Number,
 *   top: Number,
 *   clientLeft: Number,
 *   clientTop: Number,
 *   width: Number,
 *   height: Number,
 * }} LayoutNodeProperties
 */

/**
 * @typedef {Object} LayoutNode
 * @property {String} id
 * @property {DOMTarget} $el
 * @property {Number} index
 * @property {Array<DOMTarget>} targets
 * @property {Number} delay
 * @property {Number} duration
 * @property {EasingParam} ease
 * @property {DOMTarget} $measure
 * @property {LayoutSnapshot} state
 * @property {AutoLayout} layout
 * @property {LayoutNode|null} parentNode
 * @property {Boolean} isTarget
 * @property {Boolean} isEntering
 * @property {Boolean} isLeaving
 * @property {Boolean} hasTransform
 * @property {Array<String>} inlineStyles
 * @property {String|null} inlineTransforms
 * @property {String|null} inlineTransition
 * @property {Boolean} branchAdded
 * @property {Boolean} branchRemoved
 * @property {Boolean} branchNotRendered
 * @property {Boolean} sizeChanged
 * @property {Boolean} isInlined
 * @property {Boolean} hasVisibilitySwap
 * @property {Boolean} hasDisplayNone
 * @property {Boolean} hasVisibilityHidden
 * @property {String|null} measuredInlineTransform
 * @property {String|null} measuredInlineTransition
 * @property {String|null} measuredDisplay
 * @property {String|null} measuredVisibility
 * @property {String|null} measuredPosition
 * @property {Boolean} measuredHasDisplayNone
 * @property {Boolean} measuredHasVisibilityHidden
 * @property {Boolean} measuredIsVisible
 * @property {Boolean} measuredIsRemoved
 * @property {Boolean} measuredIsInsideRoot
 * @property {LayoutNodeProperties} properties
 * @property {LayoutNode|null} _head
 * @property {LayoutNode|null} _tail
 * @property {LayoutNode|null} _prev
 * @property {LayoutNode|null} _next
 */

/**
 * @callback LayoutNodeIterator
 * @param {LayoutNode} node
 * @param {Number} index
 * @return {void}
 */

let layoutId = 0;
let nodeId = 0;

/**
 * @param {DOMTarget} root
 * @param {DOMTarget} $el
 * @return {Boolean}
 */
const isElementInRoot = (root, $el) => {
  if (!root || !$el) return false;
  return root === $el || root.contains($el);
};

/**
 * @param {DOMTarget|null} $el
 * @return {String|null}
 */
const muteElementTransition = $el => {
  if (!$el) return null;
  const style = $el.style;
  const transition = style.transition || '';
  style.setProperty('transition', 'none', 'important');
  return transition;
};

/**
 * @param {DOMTarget|null} $el
 * @param {String|null} transition
 */
const restoreElementTransition = ($el, transition) => {
  if (!$el) return;
  const style = $el.style;
  if (transition) {
    style.transition = transition;
  } else {
    style.removeProperty('transition');
  }
};

/**
 * @param {LayoutNode} node
 */
const muteNodeTransition = node => {
  const store = node.layout.transitionMuteStore;
  const $el = node.$el;
  const $measure = node.$measure;
  if ($el && !store.has($el)) store.set($el, muteElementTransition($el));
  if ($measure && !store.has($measure)) store.set($measure, muteElementTransition($measure));
};

/**
 * @param {Map<DOMTarget, String|null>} store
 */
const restoreLayoutTransition = store => {
  store.forEach((value, $el) => restoreElementTransition($el, value));
  store.clear();
};

const hiddenComputedStyle = /** @type {CSSStyleDeclaration} */({
  display: 'none',
  visibility: 'hidden',
  opacity: '0',
  transform: 'none',
  position: 'static',
});

/**
 * @param {LayoutNode|null} node
 */
const detachNode = node => {
  if (!node) return;
  const parent = node.parentNode;
  if (!parent) return;
  if (parent._head === node) parent._head = node._next;
  if (parent._tail === node) parent._tail = node._prev;
  if (node._prev) node._prev._next = node._next;
  if (node._next) node._next._prev = node._prev;
  node._prev = null;
  node._next = null;
  node.parentNode = null;
};

/**
 * @param {DOMTarget} $el
 * @param {LayoutNode|null} parentNode
 * @param {LayoutSnapshot} state
 * @param {LayoutNode} recycledNode
 * @return {LayoutNode}
 */
const createNode = ($el, parentNode, state, recycledNode) => {
  let dataId = $el.dataset.layoutId;
  if (!dataId) dataId = $el.dataset.layoutId = `node-${nodeId++}`;
  const node = recycledNode ? recycledNode : /** @type {LayoutNode} */({});
  node.$el = $el;
  node.$measure = $el;
  node.id = dataId;
  node.index = 0;
  node.targets = null;
  node.delay = 0;
  node.duration = 0;
  node.ease = null;
  node.state = state;
  node.layout = state.layout;
  node.parentNode = parentNode || null;
  node.isTarget = false;
  node.isEntering = false;
  node.isLeaving = false;
  node.isInlined = false;
  node.hasTransform = false;
  node.inlineStyles = [];
  node.inlineTransforms = null;
  node.inlineTransition = null;
  node.branchAdded = false;
  node.branchRemoved = false;
  node.branchNotRendered = false;
  node.sizeChanged = false;
  node.hasVisibilitySwap = false;
  node.hasDisplayNone = false;
  node.hasVisibilityHidden = false;
  node.measuredInlineTransform = null;
  node.measuredInlineTransition = null;
  node.measuredDisplay = null;
  node.measuredVisibility = null;
  node.measuredPosition = null;
  node.measuredHasDisplayNone = false;
  node.measuredHasVisibilityHidden = false;
  node.measuredIsVisible = false;
  node.measuredIsRemoved = false;
  node.measuredIsInsideRoot = false;
  node.properties = /** @type {LayoutNodeProperties} */({
    transform: 'none',
    x: 0,
    y: 0,
    left: 0,
    top: 0,
    clientLeft: 0,
    clientTop: 0,
    width: 0,
    height: 0,
  });
  node.layout.properties.forEach(prop => node.properties[prop] = 0);
  node._head = null;
  node._tail = null;
  node._prev = null;
  node._next = null;
  return node;
};

/**
 * @param {LayoutNode} node
 * @param {DOMTarget} $measure
 * @param {CSSStyleDeclaration} computedStyle
 * @param {Boolean} skipMeasurements
 * @return {LayoutNode}
 */
const recordNodeState = (node, $measure, computedStyle, skipMeasurements) => {
  const $el = node.$el;
  const root = node.layout.root;
  const isRoot = root === $el;
  const properties = node.properties;
  const rootNode = node.state.rootNode;
  const parentNode = node.parentNode;
  const computedTransforms = computedStyle.transform;
  const inlineTransforms = $el.style.transform;
  const parentNotRendered = parentNode ? parentNode.measuredIsRemoved : false;
  const position = computedStyle.position;
  if (isRoot) node.layout.absoluteCoords = position === 'fixed' || position === 'absolute';
  node.$measure = $measure;
  node.inlineTransforms = inlineTransforms;
  node.hasTransform = computedTransforms && computedTransforms !== 'none';
  node.measuredIsInsideRoot = isElementInRoot(root, $measure);
  node.measuredInlineTransform = null;
  node.measuredDisplay = computedStyle.display;
  node.measuredVisibility = computedStyle.visibility;
  node.measuredPosition = position;
  node.measuredHasDisplayNone = computedStyle.display === 'none';
  node.measuredHasVisibilityHidden = computedStyle.visibility === 'hidden';
  node.measuredIsVisible = !(node.measuredHasDisplayNone || node.measuredHasVisibilityHidden);
  node.measuredIsRemoved = node.measuredHasDisplayNone || node.measuredHasVisibilityHidden || parentNotRendered;
  // Check if element has adjacent text that would reflow when taken out of flow
  let hasAdjacentText = false;
  let s = $el.previousSibling;
  while (s && (s.nodeType === Node.COMMENT_NODE || (s.nodeType === Node.TEXT_NODE && !s.textContent.trim()))) s = s.previousSibling;
  if (s && s.nodeType === Node.TEXT_NODE) {
    hasAdjacentText = true;
  } else {
    s = $el.nextSibling;
    while (s && (s.nodeType === Node.COMMENT_NODE || (s.nodeType === Node.TEXT_NODE && !s.textContent.trim()))) s = s.nextSibling;
    hasAdjacentText = s !== null && s.nodeType === Node.TEXT_NODE;
  }
  node.isInlined = hasAdjacentText;

  // Mute transforms (and transition to avoid triggering an animation) before the position calculation
  if (node.hasTransform && !skipMeasurements) {
    const transitionMuteStore = node.layout.transitionMuteStore;
    if (!transitionMuteStore.get($el)) node.inlineTransition = muteElementTransition($el);
    if ($measure === $el) {
      $el.style.transform = 'none';
    } else {
      if (!transitionMuteStore.get($measure)) node.measuredInlineTransition = muteElementTransition($measure);
      node.measuredInlineTransform = $measure.style.transform;
      $measure.style.transform = 'none';
    }
  }

  let left = 0;
  let top = 0;
  let width = 0;
  let height = 0;

  if (!skipMeasurements) {
    const rect = $measure.getBoundingClientRect();
    left = rect.left;
    top = rect.top;
    width = rect.width;
    height = rect.height;
  }

  for (let name in properties) {
    const computedProp = name === 'transform' ? computedTransforms : computedStyle[name] || (computedStyle.getPropertyValue && computedStyle.getPropertyValue(name));
    if (!helpers.isUnd(computedProp)) properties[name] = computedProp;
  }

  properties.left = left;
  properties.top = top;
  properties.clientLeft = skipMeasurements ? 0 : $measure.clientLeft;
  properties.clientTop = skipMeasurements ? 0 : $measure.clientTop;
  // Compute local x/y relative to parent
  let absoluteLeft, absoluteTop;
  if (isRoot) {
    if (!node.layout.absoluteCoords) {
      absoluteLeft = 0;
      absoluteTop = 0;
    } else {
      absoluteLeft = left;
      absoluteTop = top;
    }
  } else {
    const p = parentNode || rootNode;
    const parentLeft = p.properties.left;
    const parentTop = p.properties.top;
    const borderLeft = p.properties.clientLeft;
    const borderTop = p.properties.clientTop;
    if (!node.layout.absoluteCoords) {
      if (p === rootNode) {
        const rootLeft = rootNode.properties.left;
        const rootTop = rootNode.properties.top;
        const rootBorderLeft = rootNode.properties.clientLeft;
        const rootBorderTop = rootNode.properties.clientTop;
        absoluteLeft = left - rootLeft - rootBorderLeft;
        absoluteTop = top - rootTop - rootBorderTop;
      } else {
        absoluteLeft = left - parentLeft - borderLeft;
        absoluteTop = top - parentTop - borderTop;
      }
    } else {
      absoluteLeft = left - parentLeft - borderLeft;
      absoluteTop = top - parentTop - borderTop;
    }
  }
  properties.x = absoluteLeft;
  properties.y = absoluteTop;
  properties.width = width;
  properties.height = height;
  return node;
};

/**
 * @param {LayoutNode} node
 * @param {LayoutStateAnimationProperties} [props]
 */
const updateNodeProperties = (node, props) => {
  if (!props) return;
  for (let name in props) {
    node.properties[name] = props[name];
  }
};

/**
 * @param  {LayoutNode} node
 * @param  {LayoutAnimationTimingsParams} params
 */
const updateNodeTimingParams = (node, params) => {
  const easeFunctionResult = values.getFunctionValue(params.ease, node.$el, node.index, node.targets, null, null);
  const keyEasing = helpers.isFnc(easeFunctionResult) ? easeFunctionResult : params.ease;
  const hasSpring = !helpers.isUnd(keyEasing) && !helpers.isUnd(/** @type {Spring} */(keyEasing).ease);
  node.ease = hasSpring ? /** @type {Spring} */(keyEasing).ease : keyEasing;
  node.duration = hasSpring ? /** @type {Spring} */(keyEasing).settlingDuration : values.getFunctionValue(params.duration, node.$el, node.index, node.targets, null, null);
  node.delay = values.getFunctionValue(params.delay, node.$el, node.index, node.targets, null, null);
};

/**
 * @param {LayoutNode} node
 */
const recordNodeInlineStyles = node => {
  const style = node.$el.style;
  const stylesStore = node.inlineStyles;
  stylesStore.length = 0;
  node.layout.recordedProperties.forEach(prop => {
    stylesStore.push(prop, style[prop] || '');
  });
};

/**
 * @param {LayoutNode} node
 */
const restoreNodeInlineStyles = node => {
  const style = node.$el.style;
  const stylesStore = node.inlineStyles;
  for (let i = 0, l = stylesStore.length; i < l; i += 2) {
    const property = stylesStore[i];
    const styleValue = stylesStore[i + 1];
    if (styleValue && styleValue !== '') {
      style[property] = styleValue;
    } else {
      style[property] = '';
      style.removeProperty(property);
    }
  }
};

/**
 * @param {LayoutNode} node
 */
const restoreNodeTransform = node => {
  const inlineTransforms = node.inlineTransforms;
  const nodeStyle = node.$el.style;
  if (!node.hasTransform || !inlineTransforms || (node.hasTransform && nodeStyle.transform === 'none') || (inlineTransforms && inlineTransforms === 'none')) {
    nodeStyle.removeProperty('transform');
  } else if (inlineTransforms) {
    nodeStyle.transform = inlineTransforms;
  }
  const $measure = node.$measure;
  if (node.hasTransform && $measure !== node.$el) {
    const measuredStyle = $measure.style;
    const measuredInline = node.measuredInlineTransform;
    if (measuredInline && measuredInline !== '') {
      measuredStyle.transform = measuredInline;
    } else {
      measuredStyle.removeProperty('transform');
    }
  }
  node.measuredInlineTransform = null;
  if (node.inlineTransition !== null) {
    restoreElementTransition(node.$el, node.inlineTransition);
    node.inlineTransition = null;
  }
  if ($measure !== node.$el && node.measuredInlineTransition !== null) {
    restoreElementTransition($measure, node.measuredInlineTransition);
    node.measuredInlineTransition = null;
  }
};

/**
 * @param {LayoutNode} node
 */
const restoreNodeVisualState = node => {
  if (node.measuredIsRemoved || node.hasVisibilitySwap) {
    node.$el.style.removeProperty('display');
    node.$el.style.removeProperty('visibility');
    if (node.hasVisibilitySwap) {
      node.$measure.style.removeProperty('display');
      node.$measure.style.removeProperty('visibility');
    }
  }
  // if (node.measuredIsRemoved) {
  node.layout.pendingRemoval.delete(node.$el);
  // }
};

/**
 * @param {LayoutNode} node
 * @param {LayoutNode} targetNode
 * @param {LayoutSnapshot} newState
 * @return {LayoutNode}
 */
const cloneNodeProperties = (node, targetNode, newState) => {
  targetNode.properties = /** @type {LayoutNodeProperties} */({ ...node.properties });
  targetNode.state = newState;
  targetNode.isTarget = node.isTarget;
  targetNode.hasTransform = node.hasTransform;
  targetNode.inlineTransforms = node.inlineTransforms;
  targetNode.measuredIsVisible = node.measuredIsVisible;
  targetNode.measuredDisplay = node.measuredDisplay;
  targetNode.measuredIsRemoved = node.measuredIsRemoved;
  targetNode.measuredHasDisplayNone = node.measuredHasDisplayNone;
  targetNode.measuredHasVisibilityHidden = node.measuredHasVisibilityHidden;
  targetNode.hasDisplayNone = node.hasDisplayNone;
  targetNode.isInlined = node.isInlined;
  targetNode.hasVisibilityHidden = node.hasVisibilityHidden;
  return targetNode;
};

class LayoutSnapshot {
  /**
   * @param {AutoLayout} layout
   */
  constructor(layout) {
    /** @type {AutoLayout} */
    this.layout = layout;
    /** @type {LayoutNode|null} */
    this.rootNode = null;
    /** @type {Set<LayoutNode>} */
    this.rootNodes = new Set();
    /** @type {Map<String, LayoutNode>} */
    this.nodes = new Map();
    /** @type {Number} */
    this.scrollX = 0;
    /** @type {Number} */
    this.scrollY = 0;
  }

  /**
   * @return {this}
   */
  revert() {
    this.forEachNode(node => {
      this.layout.pendingRemoval.delete(node.$el);
      node.$el.removeAttribute('data-layout-id');
      node.$measure.removeAttribute('data-layout-id');
    });
    this.rootNode = null;
    this.rootNodes.clear();
    this.nodes.clear();
    return this;
  }

  /**
   * @param {DOMTarget} $el
   * @return {LayoutNode}
   */
  getNode($el) {
    if (!$el || !$el.dataset) return;
    return this.nodes.get($el.dataset.layoutId);
  }

  /**
   * @param {DOMTarget} $el
   * @param {String} prop
   * @return {Number|String}
   */
  getComputedValue($el, prop) {
    const node = this.getNode($el);
    if (!node) return;
    return /** @type {Number|String} */(node.properties[prop]);
  }

  /**
   * @param {LayoutNode|null} rootNode
   * @param {LayoutNodeIterator} cb
   */
  forEach(rootNode, cb) {
    let node = rootNode;
    let i = 0;
    while (node) {
      cb(node, i++);
      if (node._head) {
        node = node._head;
      } else if (node._next) {
        node = node._next;
      } else {
        while (node && !node._next) {
          node = node.parentNode;
        }
        if (node) node = node._next;
      }
    }
  }

  /**
   * @param {LayoutNodeIterator} cb
   */
  forEachRootNode(cb) {
    this.forEach(this.rootNode, cb);
  }

  /**
   * @param {LayoutNodeIterator} cb
   */
  forEachNode(cb) {
    for (const rootNode of this.rootNodes) {
      this.forEach(rootNode, cb);
    }
  }

  /**
   * @param {DOMTarget} $el
   * @param {LayoutNode|null} parentNode
   * @return {LayoutNode|null}
   */
  registerElement($el, parentNode) {
    if (!$el || $el.nodeType !== 1) return null;

    if (!this.layout.transitionMuteStore.has($el)) this.layout.transitionMuteStore.set($el, muteElementTransition($el));

    /** @type {Array<DOMTarget|LayoutNode|null>} */
    const stack = [$el, parentNode];
    const root = this.layout.root;
    let firstNode = null;

    while (stack.length) {
      /** @type {LayoutNode|null} */
      const $parent = /** @type {LayoutNode|null} */(stack.pop());
      /** @type {DOMTarget|null} */
      const $current = /** @type {DOMTarget|null} */(stack.pop());

      if (!$current || $current.nodeType !== 1 || helpers.isSvg($current)) continue;

      const skipMeasurements = $parent ? $parent.measuredIsRemoved : false;
      const computedStyle = skipMeasurements ? hiddenComputedStyle : getComputedStyle($current);
      const hasDisplayNone = skipMeasurements ? true : computedStyle.display === 'none';
      const hasVisibilityHidden = skipMeasurements ? true : computedStyle.visibility === 'hidden';
      const isVisible = !hasDisplayNone && !hasVisibilityHidden;
      const existingId = $current.dataset.layoutId;
      const isInsideRoot = isElementInRoot(root, $current);

      let node = existingId ? this.nodes.get(existingId) : null;

      if (node && node.$el !== $current) {
        const nodeInsideRoot = isElementInRoot(root, node.$el);
        const measuredVisible = node.measuredIsVisible;
        const shouldReassignNode = !nodeInsideRoot && (isInsideRoot || (!isInsideRoot && !measuredVisible && isVisible));
        const shouldReuseMeasurements = nodeInsideRoot && !measuredVisible && isVisible;
        // Rebind nodes that move into the root or whose detached twin just became visible
        if (shouldReassignNode) {
          detachNode(node);
          node = createNode($current, $parent, this, node);
        // for hidden element with in-root sibling, keep the hidden node but borrow measurements from its visible in-root twin element
        } else if (shouldReuseMeasurements) {
          recordNodeState(node, $current, computedStyle, skipMeasurements);
          let $child = $current.lastElementChild;
          while ($child) {
            stack.push(/** @type {DOMTarget} */($child), node);
            $child = $child.previousElementSibling;
          }
          if (!firstNode) firstNode = node;
          continue;
        // No reassignment needed so keep walking descendants under the current parent
        } else {
          let $child = $current.lastElementChild;
          while ($child) {
            stack.push(/** @type {DOMTarget} */($child), $parent);
            $child = $child.previousElementSibling;
          }
          if (!firstNode) firstNode = node;
          continue;
        }
      } else {
        node = createNode($current, $parent, this, node);
      }

      node.branchAdded = false;
      node.branchRemoved = false;
      node.branchNotRendered = false;
      node.isTarget = false;
      node.sizeChanged = false;
      node.hasVisibilityHidden = hasVisibilityHidden;
      node.hasDisplayNone = hasDisplayNone;
      node.hasVisibilitySwap = (hasVisibilityHidden && !node.measuredHasVisibilityHidden) || (hasDisplayNone && !node.measuredHasDisplayNone);

      this.nodes.set(node.id, node);

      node.parentNode = $parent || null;
      node._prev = null;
      node._next = null;

      if ($parent) {
        this.rootNodes.delete(node);
        if (!$parent._head) {
          $parent._head = node;
          $parent._tail = node;
        } else {
          $parent._tail._next = node;
          node._prev = $parent._tail;
          $parent._tail = node;
        }
      } else {
        // Each disconnected subtree becomes its own root in the snapshot graph
        this.rootNodes.add(node);
      }

      recordNodeState(node, node.$el, computedStyle, skipMeasurements);

      let $child = $current.lastElementChild;
      while ($child) {
        stack.push(/** @type {DOMTarget} */($child), node);
        $child = $child.previousElementSibling;
      }

      if (!firstNode) firstNode = node;
    }

    return firstNode;
  }

  /**
   * @param {DOMTarget} $el
   * @param {Set<DOMTarget>} candidates
   * @return {LayoutNode|null}
   */
  ensureDetachedNode($el, candidates) {
    if (!$el || $el === this.layout.root) return null;
    const existingId = $el.dataset.layoutId;
    const existingNode = existingId ? this.nodes.get(existingId) : null;
    if (existingNode && existingNode.$el === $el) return existingNode;
    let parentNode = null;
    let $ancestor = $el.parentElement;
    while ($ancestor && $ancestor !== this.layout.root) {
      if (candidates.has($ancestor)) {
        parentNode = this.ensureDetachedNode($ancestor, candidates);
        break;
      }
      $ancestor = $ancestor.parentElement;
    }
    return this.registerElement($el, parentNode);
  }

  /**
   * @return {this}
   */
  record() {
    const layout = this.layout;
    const children = layout.children;
    const root = layout.root;
    const toParse = helpers.isArr(children) ? children : [children];
    const scoped = [];
    const scopeRoot = children === '*' ? root : globals.scope.root;

    // Mute transition and transforms of root ancestors before recording the state

    /** @type {Array<DOMTarget|String|null>} */
    const rootAncestorTransformStore = [];
    let $ancestor = root.parentElement;
    while ($ancestor && $ancestor.nodeType === 1) {
      const computedStyle = getComputedStyle($ancestor);
      if (computedStyle.transform && computedStyle.transform !== 'none') {
        const inlineTransform = $ancestor.style.transform || '';
        const inlineTransition = muteElementTransition($ancestor);
        rootAncestorTransformStore.push($ancestor, inlineTransform, inlineTransition);
        $ancestor.style.transform = 'none';
      }
      $ancestor = $ancestor.parentElement;
    }

    for (let i = 0, l = toParse.length; i < l; i++) {
      const child = toParse[i];
      scoped[i] = helpers.isStr(child) ? scopeRoot.querySelectorAll(child) : child;
    }

    const parsedChildren = targets.registerTargets(scoped);

    this.nodes.clear();
    this.rootNodes.clear();

    const rootNode = this.registerElement(root, null);
    // Root node are always targets
    rootNode.isTarget = true;
    this.rootNode = rootNode;

    const inRootNodeIds = new Set();
    // Update index and total for inital timing calculation
    let index = 0;
    const allNodeTargets = [];
    this.nodes.forEach((node) => { allNodeTargets.push(node.$el); });
    this.nodes.forEach((node, id) => {
      node.index = index++;
      node.targets = allNodeTargets;
      // Track ids of nodes that belong to the current root to filter detached matches
      if (node && node.measuredIsInsideRoot) {
        inRootNodeIds.add(id);
      }
    });

    // Elements with a layout id outside the root that match the children selector
    const detachedElementsLookup = new Set();
    const orderedDetachedElements = [];

    for (let i = 0, l = parsedChildren.length; i < l; i++) {
      const $el = parsedChildren[i];
      if (!$el || $el.nodeType !== 1 || $el === root) continue;
      const insideRoot = isElementInRoot(root, $el);
      if (!insideRoot) {
        const layoutNodeId = $el.dataset.layoutId;
        if (!layoutNodeId || !inRootNodeIds.has(layoutNodeId)) continue;
      }
      if (!detachedElementsLookup.has($el)) {
        detachedElementsLookup.add($el);
        orderedDetachedElements.push($el);
      }
    }

    for (let i = 0, l = orderedDetachedElements.length; i < l; i++) {
      this.ensureDetachedNode(orderedDetachedElements[i], detachedElementsLookup);
    }

    for (let i = 0, l = parsedChildren.length; i < l; i++) {
      const $el = parsedChildren[i];
      const node = this.getNode($el);
      if (node) {
        let cur = node;
        while (cur) {
          if (cur.isTarget) break;
          cur.isTarget = true;
          cur = cur.parentNode;
        }
      }
    }

    this.scrollX = window.scrollX;
    this.scrollY = window.scrollY;

    this.forEachNode(restoreNodeTransform);

    // Restore transition and transforms of root ancestors

    for (let i = 0, l = rootAncestorTransformStore.length; i < l; i += 3) {
      const $el = /** @type {DOMTarget} */(rootAncestorTransformStore[i]);
      const inlineTransform = /** @type {String} */(rootAncestorTransformStore[i + 1]);
      const inlineTransition = /** @type {String|null} */(rootAncestorTransformStore[i + 2]);
      if (inlineTransform && inlineTransform !== '') {
        $el.style.transform = inlineTransform;
      } else {
        $el.style.removeProperty('transform');
      }
      restoreElementTransition($el, inlineTransition);
    }

    return this;
  }
}

/**
 * @param  {LayoutStateParams} params
 * @return {[LayoutStateAnimationProperties, LayoutAnimationTimingsParams]}
 */
function splitPropertiesFromParams(params) {
  /** @type {LayoutStateAnimationProperties} */
  const properties = {};
  /** @type {LayoutAnimationTimingsParams} */
  const parameters = {};
  for (let name in params) {
    const value = params[name];
    const isEase = name === 'ease';
    const isTiming = name === 'duration' || name === 'delay';
    if (isTiming || isEase) {
      if (isEase) {
        parameters[name] = /** @type {EasingParam} */(value);
      } else {
        parameters[name] = /** @type {Number|FunctionValue} */(value);
      }
    } else {
      properties[name] = /** @type {Number|String} */(value);
    }
  }
  return [properties, parameters];
}

class AutoLayout {
  /**
   * @param {DOMTargetSelector} root
   * @param {AutoLayoutParams} [params]
   */
  constructor(root, params = {}) {
    if (globals.scope.current) globals.scope.current.register(this);
    const swapAtSplitParams = splitPropertiesFromParams(params.swapAt);
    const enterFromSplitParams = splitPropertiesFromParams(params.enterFrom);
    const leaveToSplitParams = splitPropertiesFromParams(params.leaveTo);
    const transitionProperties = params.properties;
    /** @type {Number|FunctionValue} */
    params.duration = values.setValue(params.duration, 350);
    /** @type {Number|FunctionValue} */
    params.delay = values.setValue(params.delay, 0);
    /** @type {EasingParam|FunctionValue} */
    params.ease = values.setValue(params.ease, 'inOut(3.5)');
    /** @type {AutoLayoutParams} */
    this.params = params;
    /** @type {DOMTarget} */
    this.root = /** @type {DOMTarget} */(targets.registerTargets(root)[0]);
    /** @type {Number|String} */
    this.id = params.id || layoutId++;
    /** @type {LayoutChildrenParam} */
    this.children = params.children || '*';
    /** @type {Boolean} */
    this.absoluteCoords = false;
    /** @type {LayoutStateParams} */
    this.swapAtParams = helpers.mergeObjects(params.swapAt || { opacity: 0 }, { ease: 'inOut(1.75)' });
    /** @type {LayoutStateParams} */
    this.enterFromParams = params.enterFrom || { opacity: 0 };
    /** @type {LayoutStateParams} */
    this.leaveToParams = params.leaveTo || { opacity: 0 };
    /** @type {Set<String>} */
    this.properties = new Set([
      'opacity',
      'fontSize',
      'color',
      'backgroundColor',
      'borderRadius',
      'border',
      'filter',
      'clipPath',
    ]);
    if (swapAtSplitParams[0]) for (let name in swapAtSplitParams[0]) this.properties.add(name);
    if (enterFromSplitParams[0]) for (let name in enterFromSplitParams[0]) this.properties.add(name);
    if (leaveToSplitParams[0]) for (let name in leaveToSplitParams[0]) this.properties.add(name);
    if (transitionProperties) for (let i = 0, l = transitionProperties.length; i < l; i++) this.properties.add(transitionProperties[i]);
    /** @type {Set<String>} */
    this.recordedProperties = new Set([
      'display',
      'visibility',
      'translate',
      'position',
      'left',
      'top',
      'marginLeft',
      'marginTop',
      'width',
      'height',
      'maxWidth',
      'maxHeight',
      'minWidth',
      'minHeight',
    ]);
    this.properties.forEach(prop => this.recordedProperties.add(prop));
    /** @type {WeakSet<DOMTarget>} */
    this.pendingRemoval = new WeakSet();
    /** @type {Map<DOMTarget, String|null>} */
    this.transitionMuteStore = new Map();
    /** @type {LayoutSnapshot} */
    this.oldState = new LayoutSnapshot(this);
    /** @type {LayoutSnapshot} */
    this.newState = new LayoutSnapshot(this);
    /** @type {Timeline} */
    this.timeline = null;
    /** @type {WAAPIAnimation} */
    this.transformAnimation = null;
    /** @type {Array<DOMTarget>} */
    this.animating = [];
    /** @type {Array<DOMTarget>} */
    this.swapping = [];
    /** @type {Array<DOMTarget>} */
    this.leaving = [];
    /** @type {Array<DOMTarget>} */
    this.entering = [];
    // Record the current state as the old state to init the data attributes and allow imediate .animate()
    this.oldState.record();
    // And all layout transition muted during the record
    restoreLayoutTransition(this.transitionMuteStore);
  }

  /**
   * @return {this}
   */
  revert() {
    this.root.classList.remove('is-animated');
    if (this.timeline) {
      this.timeline.complete();
      this.timeline = null;
    }
    if (this.transformAnimation) {
      this.transformAnimation.complete();
      this.transformAnimation = null;
    }
    this.animating.length = this.swapping.length = this.leaving.length = this.entering.length = 0;
    this.oldState.revert();
    this.newState.revert();
    requestAnimationFrame(() => restoreLayoutTransition(this.transitionMuteStore));
    return this;
  }

  /**
   * @return {this}
   */
  record() {
    // Commit transforms before measuring
    if (this.transformAnimation) {
      this.transformAnimation.cancel();
      this.transformAnimation = null;
    }
    // Record the old state
    this.oldState.record();
    // Cancel any running timeline
    if (this.timeline) {
      this.timeline.cancel();
      this.timeline = null;
    }
    // Restore previously captured inline styles
    this.newState.forEachRootNode(restoreNodeInlineStyles);
    return this;
  }

  /**
   * @param {LayoutAnimationParams} [params]
   * @return {Timeline}
   */
  animate(params = {}) {
    /** @type { LayoutAnimationTimingsParams } */
    const animationTimings = {
      ease: values.setValue(params.ease, this.params.ease),
      delay: values.setValue(params.delay, this.params.delay),
      duration: values.setValue(params.duration, this.params.duration),
    };
    /** @type {TimelineParams} */
    const tlParams = {
      id: this.id
    };
    const onComplete = values.setValue(params.onComplete, this.params.onComplete);
    const onPause = values.setValue(params.onPause, this.params.onPause);
    for (let name in globals.defaults) {
      if (name !== 'ease' && name !== 'duration' && name !== 'delay') {
        if (!helpers.isUnd(params[name])) {
          tlParams[name] = params[name];
        } else if (!helpers.isUnd(this.params[name])) {
          tlParams[name] = this.params[name];
        }
      }
    }
    tlParams.onComplete = () => {
      const ap = /** @type {ScrollObserver} */(params.autoplay);
      const ed = globals.globals.editor;
      const isScrollControled = (ap && ap.linked) || (ed && ed.showPanel);
      if (isScrollControled) {
        if (onComplete) onComplete(this.timeline);
        return;
      }
      // Make sure to call .cancel() after restoreNodeInlineStyles(node); otehrwise the commited styles get reverted
      if (this.transformAnimation) this.transformAnimation.cancel();
      newState.forEachRootNode(node => {
        restoreNodeVisualState(node);
        restoreNodeInlineStyles(node);
      });
      for (let i = 0, l = transformed.length; i < l; i++) {
        const $el = transformed[i];
        $el.style.transform = newState.getComputedValue($el, 'transform');
      }
      if (this.root.classList.contains('is-animated')) {
        this.root.classList.remove('is-animated');
        if (onComplete) onComplete(this.timeline);
      }
      // Avoid CSS transitions at the end of the animation by restoring them on the next frame
      requestAnimationFrame(() => {
        if (this.root.classList.contains('is-animated')) return;
        restoreLayoutTransition(this.transitionMuteStore);
      });
    };
    tlParams.onPause = () => {
      const ap = /** @type {ScrollObserver} */(params.autoplay);
      const isScrollControled = ap && ap.linked;
      if (isScrollControled) {
        if (onComplete) onComplete(this.timeline);
        if (onPause) onPause(this.timeline);
        return;
      }
      if (!this.root.classList.contains('is-animated')) return;
      if (this.transformAnimation) this.transformAnimation.cancel();
      newState.forEachRootNode(restoreNodeVisualState);
      this.root.classList.remove('is-animated');
      if (onComplete) onComplete(this.timeline);
      if (onPause) onPause(this.timeline);
    };
    tlParams.composition = false;

    const swapAtParams = helpers.mergeObjects(helpers.mergeObjects(params.swapAt || {}, this.swapAtParams), animationTimings);
    const enterFromParams = helpers.mergeObjects(helpers.mergeObjects(params.enterFrom || {}, this.enterFromParams), animationTimings);
    const leaveToParams = helpers.mergeObjects(helpers.mergeObjects(params.leaveTo || {}, this.leaveToParams), animationTimings);
    const [ swapAtProps, swapAtTimings ] = splitPropertiesFromParams(swapAtParams);
    const [ enterFromProps, enterFromTimings ] = splitPropertiesFromParams(enterFromParams);
    const [ leaveToProps, leaveToTimings ] = splitPropertiesFromParams(leaveToParams);

    const oldState = this.oldState;
    const newState = this.newState;
    const animating = this.animating;
    const swapping = this.swapping;
    const entering = this.entering;
    const leaving = this.leaving;
    const pendingRemoval = this.pendingRemoval;

    animating.length = swapping.length = entering.length = leaving.length = 0;

    // Mute old state CSS transitions to prevent wrong properties calculation
    oldState.forEachRootNode(muteNodeTransition);
    // Capture the new state before animation
    newState.record();
    newState.forEachRootNode(recordNodeInlineStyles);

    const targets = [];
    const animated = [];
    const transformed = [];
    const animatedSwap = [];
    const rootNode = newState.rootNode;
    const $root = rootNode.$el;

    newState.forEachRootNode(node => {

      const $el = node.$el;
      const id = node.id;
      const parent = node.parentNode;
      const parentAdded = parent ? parent.branchAdded : false;
      const parentRemoved = parent ? parent.branchRemoved : false;
      const parentNotRendered = parent ? parent.branchNotRendered : false;

      let oldStateNode = oldState.nodes.get(id);

      const hasNoOldState = !oldStateNode;

      if (hasNoOldState) {
        oldStateNode = cloneNodeProperties(node, /** @type {LayoutNode} */({}), oldState);
        oldState.nodes.set(id, oldStateNode);
        oldStateNode.measuredIsRemoved = true;
      } else if (oldStateNode.measuredIsRemoved && !node.measuredIsRemoved) {
        cloneNodeProperties(node, oldStateNode, oldState);
        oldStateNode.measuredIsRemoved = true;
      }

      const oldParentNode = oldStateNode.parentNode;
      const oldParentId = oldParentNode ? oldParentNode.id : null;
      const newParentId = parent ? parent.id : null;
      const parentChanged = oldParentId !== newParentId;
      const elementChanged = oldStateNode.$el !== node.$el;
      const wasRemovedBefore = oldStateNode.measuredIsRemoved;
      const isRemovedNow = node.measuredIsRemoved;

      // Recalculate postion relative to their parent for elements that have been moved
      if (!oldStateNode.measuredIsRemoved && !isRemovedNow && !hasNoOldState && (parentChanged || elementChanged)) {
        const oldAbsoluteLeft = oldStateNode.properties.left;
        const oldAbsoluteTop = oldStateNode.properties.top;
        const newParent = parent || newState.rootNode;
        const oldParent = newParent.id ? oldState.nodes.get(newParent.id) : null;
        const parentLeft = oldParent ? oldParent.properties.left : newParent.properties.left;
        const parentTop = oldParent ? oldParent.properties.top : newParent.properties.top;
        const borderLeft = oldParent ? oldParent.properties.clientLeft : newParent.properties.clientLeft;
        const borderTop = oldParent ? oldParent.properties.clientTop : newParent.properties.clientTop;
        oldStateNode.properties.x = oldAbsoluteLeft - parentLeft - borderLeft;
        oldStateNode.properties.y = oldAbsoluteTop - parentTop - borderTop;
      }

      if (node.hasVisibilitySwap) {
        if (node.hasVisibilityHidden) {
          node.$el.style.visibility = 'visible';
          node.$measure.style.visibility = 'hidden';
        }
        if (node.hasDisplayNone) {
          node.$el.style.display = oldStateNode.measuredDisplay || node.measuredDisplay || '';
          // Setting visibility 'hidden' instead of display none to avoid calculation issues
          node.$measure.style.visibility = 'hidden';
          // @TODO: check why setting display here can cause calculation issues
          // node.$measure.style.display = 'none';
        }
      }

      const wasPendingRemoval = pendingRemoval.has($el);
      const wasVisibleBefore = oldStateNode.measuredIsVisible;
      const isVisibleNow = node.measuredIsVisible;
      const becomeVisible = !wasVisibleBefore && isVisibleNow && !parentNotRendered;
      const topLevelAdded = !isRemovedNow && (wasRemovedBefore || wasPendingRemoval) && !parentAdded;
      const newlyRemoved = isRemovedNow && !wasRemovedBefore && !parentRemoved;
      const topLevelRemoved = newlyRemoved || isRemovedNow && wasPendingRemoval && !parentRemoved;

      node.branchAdded = parentAdded || topLevelAdded;
      node.branchRemoved = parentRemoved || topLevelRemoved;
      node.branchNotRendered = parentNotRendered || isRemovedNow;

      if (isRemovedNow && wasVisibleBefore) {
        node.$el.style.display = oldStateNode.measuredDisplay;
        node.$el.style.visibility = 'visible';
        cloneNodeProperties(oldStateNode, node, newState);
      }

      // Node is leaving
      if (newlyRemoved) {
        if (node.isTarget) {
          leaving.push($el);
          node.isLeaving = true;
        }
        pendingRemoval.add($el);
      } else if (!isRemovedNow && wasPendingRemoval) {
        pendingRemoval.delete($el);
      }

      // Node is entering
      if ((topLevelAdded && !parentNotRendered) || becomeVisible) {
        updateNodeProperties(oldStateNode, enterFromProps);
        if (node.isTarget) {
          entering.push($el);
          node.isEntering = true;
        }
      // Node is leaving
      } else if (topLevelRemoved && !parentNotRendered) {
        updateNodeProperties(node, leaveToProps);
      }

      // Node is animating
      // The animating array is used only to calculate delays and duration on root children
      if (node !== rootNode && node.isTarget && !node.isEntering && !node.isLeaving) {
        animating.push($el);
      }

      targets.push($el);

    });

    let enteringIndex = 0;
    let leavingIndex = 0;
    let animatingIndex = 0;

    newState.forEachRootNode(node => {

      const $el = node.$el;
      const parent = node.parentNode;
      const oldStateNode = oldState.nodes.get(node.id);
      const nodeProperties = node.properties;
      const oldStateNodeProperties = oldStateNode.properties;

      // Use closest animated parent index and total values so that children staggered delays are in sync with their parent
      let animatedParent = parent !== rootNode && parent;
      while (animatedParent && !animatedParent.isTarget && animatedParent !== rootNode) {
        animatedParent = animatedParent.parentNode;
      }

      // Root is always animated first in sync with the first child (animating.length is the total of children)
      if (node === rootNode) {
        node.index = 0;
        node.targets = animating;
        updateNodeTimingParams(node, animationTimings);
      } else if (node.isEntering) {
        node.index = animatedParent ? animatedParent.index : enteringIndex;
        node.targets = animatedParent ? animating : entering;
        updateNodeTimingParams(node, enterFromTimings);
        enteringIndex++;
      } else if (node.isLeaving) {
        node.index = animatedParent ? animatedParent.index : leavingIndex;
        node.targets = animatedParent ? animating : leaving;
        leavingIndex++;
        updateNodeTimingParams(node, leaveToTimings);
      } else if (node.isTarget) {
        node.index = animatingIndex++;
        node.targets = animating;
        updateNodeTimingParams(node, animationTimings);
      } else {
        node.index = animatedParent ? animatedParent.index : 0;
        node.targets = animating;
        updateNodeTimingParams(node, swapAtTimings);
      }

      // Make sure the old state node has its inex and total values up to date for valid "from" function values calculation
      oldStateNode.index = node.index;
      oldStateNode.targets = node.targets;

      // Computes all values up front so we can check for changes and we don't have to re-compute them inside the animation props
      for (let prop in nodeProperties) {
        nodeProperties[prop] = values.getFunctionValue(nodeProperties[prop], $el, node.index, node.targets, null, null);
        oldStateNodeProperties[prop] = values.getFunctionValue(oldStateNodeProperties[prop], $el, oldStateNode.index, oldStateNode.targets, null, null);
      }

      // Use a 1px tolerance to detect dimensions changes to prevent width / height animations on barelly visible elements
      const sizeTolerance = 1;
      const widthChanged = Math.abs(nodeProperties.width - oldStateNodeProperties.width) > sizeTolerance;
      const heightChanged = Math.abs(nodeProperties.height - oldStateNodeProperties.height) > sizeTolerance;

      node.sizeChanged = (widthChanged || heightChanged);

      // const hiddenStateChanged = (topLevelAdded || newlyRemoved) && wasRemovedBefore !== isRemovedNow;

      if (node.isTarget && (!node.measuredIsRemoved && oldStateNode.measuredIsVisible || node.measuredIsRemoved && node.measuredIsVisible)) {
        if (nodeProperties.transform !== 'none' || oldStateNodeProperties.transform !== 'none') {
          node.hasTransform = true;
          transformed.push($el);
        }
        for (let prop in nodeProperties) {
          // if (prop !== 'transform' && (nodeProperties[prop] !== oldStateNodeProperties[prop] || hiddenStateChanged)) {
          if (prop !== 'transform' && (nodeProperties[prop] !== oldStateNodeProperties[prop])) {
            animated.push($el);
            break;
          }
        }
      }

      if (!node.isTarget) {
        swapping.push($el);
        if (node.sizeChanged && parent && parent.isTarget && parent.sizeChanged) {
          if (swapAtProps.transform) {
            node.hasTransform = true;
            transformed.push($el);
          }
          animatedSwap.push($el);
        }
      }

    });

    const timingParams = {
      delay: (/** @type {HTMLElement} */$el) => newState.getNode($el).delay,
      duration: (/** @type {HTMLElement} */$el) => newState.getNode($el).duration,
      ease: (/** @type {HTMLElement} */$el) => newState.getNode($el).ease,
    };

    tlParams.defaults = timingParams;

    this.timeline = timeline.createTimeline(tlParams);

    // Imediatly return the timeline if no layout changes detected
    if (!animated.length && !transformed.length && !swapping.length) {
      // Make sure to restore all CSS transition if no animation
      restoreLayoutTransition(this.transitionMuteStore);
      return this.timeline.complete();
    }

    if (targets.length) {

      this.root.classList.add('is-animated');

      for (let i = 0, l = targets.length; i < l; i++) {
        const $el = targets[i];
        const id = $el.dataset.layoutId;
        const oldNode = oldState.nodes.get(id);
        const newNode = newState.nodes.get(id);
        const oldNodeState = oldNode.properties;

        // muteNodeTransition(newNode);

        // Don't animate positions of inlined elements (to avoid text reflow)
        if (!newNode.isInlined) {
          // Display grid can mess with the absolute positioning, so set it to block during transition
          if (oldNode.measuredDisplay === 'grid' || newNode.measuredDisplay === 'grid') $el.style.setProperty('display', 'block', 'important');
          // All children must be in position absolute or fixed
          if ($el !== $root || this.absoluteCoords) {
            $el.style.position = this.absoluteCoords ? 'fixed' : 'absolute';
            $el.style.left = '0px';
            $el.style.top = '0px';
            $el.style.marginLeft = '0px';
            $el.style.marginTop = '0px';
            $el.style.translate = `${oldNodeState.x}px ${oldNodeState.y}px`;
          }
          if ($el === $root && newNode.measuredPosition === 'static') {
            $el.style.position = 'relative';
            // Cancel left / trop in case the static element had muted values now activated by potision relative
            $el.style.left = '0px';
            $el.style.top = '0px';
          }
        }
        // Animate dimensions for all elements (including inlined)
        $el.style.width = `${oldNodeState.width}px`;
        $el.style.height = `${oldNodeState.height}px`;
        // Overrides user defined min and max to prevents width and height clamping
        $el.style.minWidth = `auto`;
        $el.style.minHeight = `auto`;
        $el.style.maxWidth = `none`;
        $el.style.maxHeight = `none`;
      }

      // Restore the scroll position if the oldState differs from the current state
      if (oldState.scrollX !== window.scrollX || oldState.scrollY !== window.scrollY) {
        // Restoring in the next frame avoids race conditions if for example a waapi animation commit styles that affect the root height
        requestAnimationFrame(() => window.scrollTo(oldState.scrollX, oldState.scrollY));
      }

      for (let i = 0, l = animated.length; i < l; i++) {
        const $el = animated[i];
        const id = $el.dataset.layoutId;
        const oldNode = oldState.nodes.get(id);
        const newNode = newState.nodes.get(id);
        const oldNodeState = oldNode.properties;
        const newNodeState = newNode.properties;
        let nodeHasChanged = false;
        /** @type {AnimationParams} */
        const animatedProps = {
          composition: 'none',
        };
        if (oldNodeState.width !== newNodeState.width) {
          animatedProps.width = [oldNodeState.width, newNodeState.width];
          nodeHasChanged = true;
        }
        if (oldNodeState.height !== newNodeState.height) {
          animatedProps.height = [oldNodeState.height, newNodeState.height];
          nodeHasChanged = true;
        }
        // If the node has transforms we handle the translate animation in waapi otherwise translate and other transforms can be out of sync
        // And we don't animate the position of inlined elements
        if (!newNode.hasTransform && !newNode.isInlined) {
          animatedProps.translate = [`${oldNodeState.x}px ${oldNodeState.y}px`, `${newNodeState.x}px ${newNodeState.y}px`];
          nodeHasChanged = true;
        }
        this.properties.forEach(prop => {
          const oldVal = oldNodeState[prop];
          const newVal = newNodeState[prop];
          if (prop !== 'transform' && oldVal !== newVal) {
            animatedProps[prop] = [oldVal, newVal];
            nodeHasChanged = true;
          }
        });
        if (nodeHasChanged) {
          this.timeline.add($el, animatedProps, 0);
        }
      }

    }

    if (swapping.length) {

      for (let i = 0, l = swapping.length; i < l; i++) {
        const $el = swapping[i];
        const oldNode = oldState.getNode($el);
        const oldNodeProps = oldNode.properties;
        $el.style.width = `${oldNodeProps.width}px`;
        $el.style.height = `${oldNodeProps.height}px`;
        // Overrides user defined min and max to prevents width and height clamping
        $el.style.minWidth = `auto`;
        $el.style.minHeight = `auto`;
        $el.style.maxWidth = `none`;
        $el.style.maxHeight = `none`;
        // We don't animate the position of inlined elements
        if (!oldNode.isInlined) {
          $el.style.translate = `${oldNodeProps.x}px ${oldNodeProps.y}px`;
        }
        this.properties.forEach(prop => {
          if (prop !== 'transform') {
            $el.style[prop] = `${oldState.getComputedValue($el, prop)}`;
          }
        });
      }

      for (let i = 0, l = swapping.length; i < l; i++) {
        const $el = swapping[i];
        const newNode = newState.getNode($el);
        const newNodeProps = newNode.properties;
        this.timeline.call(() => {
          $el.style.width = `${newNodeProps.width}px`;
          $el.style.height = `${newNodeProps.height}px`;
          // Overrides user defined min and max to prevents width and height clamping
          $el.style.minWidth = `auto`;
          $el.style.minHeight = `auto`;
          $el.style.maxWidth = `none`;
          $el.style.maxHeight = `none`;
          // Don't set translate for inlined elements (to avoid text reflow)
          if (!newNode.isInlined) {
            $el.style.translate = `${newNodeProps.x}px ${newNodeProps.y}px`;
          }
          this.properties.forEach(prop => {
            if (prop !== 'transform') {
              $el.style[prop] = `${newState.getComputedValue($el, prop)}`;
            }
          });
        }, newNode.delay + newNode.duration / 2);
      }

      if (animatedSwap.length) {
        const ease = parser.parseEase(newState.nodes.get(animatedSwap[0].dataset.layoutId).ease);
        const inverseEased = t => 1 - ease(1 - t);
        const animatedSwapParams = /** @type {AnimationParams} */({});
        if (swapAtProps) {
          for (let prop in swapAtProps) {
            if (prop !== 'transform') {
              animatedSwapParams[prop] = [
                { from: (/** @type {HTMLElement} */$el) => oldState.getComputedValue($el, prop), to: swapAtProps[prop] },
                { from: swapAtProps[prop], to: (/** @type {HTMLElement} */$el) => newState.getComputedValue($el, prop), ease: inverseEased }
              ];
            }
          }
        }
        this.timeline.add(animatedSwap, animatedSwapParams, 0);
      }

    }

    const transformedLength = transformed.length;

    if (transformedLength) {
      // We only need to set the transform property here since translate is already defined in the targets loop
      for (let i = 0; i < transformedLength; i++) {
        const $el = transformed[i];
        const node = newState.getNode($el);
        // Don't set translate for inlined elements (to avoid text reflow)
        if (!node.isInlined) {
          $el.style.translate = `${oldState.getComputedValue($el, 'x')}px ${oldState.getComputedValue($el, 'y')}px`;
        }
        $el.style.transform = oldState.getComputedValue($el, 'transform');
        if (animatedSwap.includes($el)) {
          node.ease = values.getFunctionValue(swapAtParams.ease, $el, node.index, node.targets, null, null);
          node.duration = values.getFunctionValue(swapAtParams.duration, $el, node.index, node.targets, null, null);
        }
      }
      this.transformAnimation = waapi.waapi.animate(transformed, {
        translate: (/** @type {HTMLElement} */$el) => {
          const node = newState.getNode($el);
          // Don't animate translate for inlined elements (to avoid text reflow)
          if (node.isInlined) return '0px 0px';
          return `${newState.getComputedValue($el, 'x')}px ${newState.getComputedValue($el, 'y')}px`;
        },
        transform: (/** @type {HTMLElement} */$el) => {
          const newValue = newState.getComputedValue($el, 'transform');
          if (!animatedSwap.includes($el)) return newValue;
          const oldValue = oldState.getComputedValue($el, 'transform');
          const node = newState.getNode($el);
          return [oldValue, values.getFunctionValue(swapAtProps.transform, $el, node.index, node.targets, null, null), newValue]
        },
        autoplay: false,
        // persist: true,
        ...timingParams,
      });
      this.timeline.sync(this.transformAnimation, 0);
    }

    return this.timeline.init();
  }

  /**
   * @param {(layout: this) => void} callback
   * @param {LayoutAnimationParams} [params]
   * @return {Timeline}
   */
  update(callback, params = {}) {
    this.record();
    callback(this);
    return this.animate(params);
  }
}

/**
 * @param {DOMTargetSelector} root
 * @param {AutoLayoutParams} [params]
 * @return {AutoLayout}
 */
const createLayout = (root, params) => new AutoLayout(root, params);

exports.AutoLayout = AutoLayout;
exports.createLayout = createLayout;

/**
 * Anime.js - waapi - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var helpers = require('../core/helpers.cjs');
var globals = require('../core/globals.cjs');
var targets = require('../core/targets.cjs');
var values = require('../core/values.cjs');
var consts = require('../core/consts.cjs');
var none = require('../easings/none.cjs');
var parser = require('../easings/eases/parser.cjs');
var composition = require('./composition.cjs');

/**
 * @import {
 *   Callback,
 *   EasingFunction,
 *   EasingParam,
 *   DOMTarget,
 *   DOMTargetsParam,
 *   DOMTargetsArray,
 *   WAAPIAnimationParams,
 *   WAAPITweenOptions,
 *   WAAPIKeyframeValue,
 *   WAAPITweenValue
 * } from '../types/index.js'
*/

/**
 * @import {
 *   Spring,
 * } from '../easings/spring/index.js'
*/

/**
 * @import {
 *   ScrollObserver,
 * } from '../events/scroll.js'
*/

/**
 * Converts an easing function into a valid CSS linear() timing function string
 * @param {EasingFunction} fn
 * @param {number} [samples=100]
 * @returns {string} CSS linear() timing function
 */
const easingToLinear = (fn, samples = 100) => {
  const points = [];
  for (let i = 0; i <= samples; i++) points.push(helpers.round(fn(i / samples), 4));
  return `linear(${points.join(', ')})`;
};

const WAAPIEasesLookups = {};

/**
 * @param  {EasingParam} ease
 * @return {String}
 */
const parseWAAPIEasing = (ease) => {
  let parsedEase = WAAPIEasesLookups[ease];
  if (parsedEase) return parsedEase;
  parsedEase = 'linear';
  if (helpers.isStr(ease)) {
    if (
      helpers.stringStartsWith(ease, 'linear') ||
      helpers.stringStartsWith(ease, 'cubic-') ||
      helpers.stringStartsWith(ease, 'steps') ||
      helpers.stringStartsWith(ease, 'ease')
    ) {
      parsedEase = ease;
    } else if (helpers.stringStartsWith(ease, 'cubicB')) {
      parsedEase = helpers.toLowerCase(ease);
    } else {
      const parsed = parser.parseEaseString(ease);
      if (helpers.isFnc(parsed)) parsedEase = parsed === none.none ? 'linear' : easingToLinear(parsed);
    }
    // Only cache string based easing name, otherwise function arguments get lost
    WAAPIEasesLookups[ease] = parsedEase;
  } else if (helpers.isFnc(ease)) {
    const easing = easingToLinear(ease);
    if (easing) parsedEase = easing;
  } else if (/** @type {Spring} */(ease).ease) {
    parsedEase = easingToLinear(/** @type {Spring} */(ease).ease);
  }
  return parsedEase;
};

const transformsShorthands = ['x', 'y', 'z'];
const commonDefaultPXProperties = [
  'perspective',
  'width',
  'height',
  'margin',
  'padding',
  'top',
  'right',
  'bottom',
  'left',
  'borderWidth',
  'fontSize',
  'borderRadius',
  ...transformsShorthands
];

const validIndividualTransforms = /*#__PURE__*/ (() => [...transformsShorthands, ...consts.validTransforms.filter(t => ['X', 'Y', 'Z'].some(axis => t.endsWith(axis)))])();

let transformsPropertiesRegistered = null;

/**
 * @param  {String} propName
 * @param  {WAAPIKeyframeValue} value
 * @param  {DOMTarget} $el
 * @param  {Number} i
 * @param  {Number} targetsLength
 * @return {String}
 */
const normalizeTweenValue = (propName, value, $el, i, targetsLength) => {
  // Do not try to compute strings with getFunctionValue otherwise it will convert CSS variables
  let v = helpers.isStr(value) ? value : values.getFunctionValue(/** @type {any} */(value), $el, i, targetsLength);
  if (!helpers.isNum(v)) return v;
  if (commonDefaultPXProperties.includes(propName) || helpers.stringStartsWith(propName, 'translate')) return `${v}px`;
  if (helpers.stringStartsWith(propName, 'rotate') || helpers.stringStartsWith(propName, 'skew')) return `${v}deg`;
  return `${v}`;
};

/**
 * @param  {DOMTarget} $el
 * @param  {String} propName
 * @param  {WAAPIKeyframeValue} from
 * @param  {WAAPIKeyframeValue} to
 * @param  {Number} i
 * @param  {Number} targetsLength
 * @return {WAAPITweenValue}
 */
const parseIndividualTweenValue = ($el, propName, from, to, i, targetsLength) => {
  /** @type {WAAPITweenValue} */
  let tweenValue = '0';
  const computedTo = !helpers.isUnd(to) ? normalizeTweenValue(propName, to, $el, i, targetsLength) : getComputedStyle($el)[propName];
  if (!helpers.isUnd(from)) {
    const computedFrom = normalizeTweenValue(propName, from, $el, i, targetsLength);
    tweenValue = [computedFrom, computedTo];
  } else {
    tweenValue = helpers.isArr(to) ? to.map((/** @type {any} */v) => normalizeTweenValue(propName, v, $el, i, targetsLength)) : computedTo;
  }
  return tweenValue;
};

class WAAPIAnimation {
/**
 * @param {DOMTargetsParam} targets
 * @param {WAAPIAnimationParams} params
 */
  constructor(targets$1, params) {

    if (globals.scope.current) globals.scope.current.register(this);

    // Skip the registration and fallback to no animation in case CSS.registerProperty is not supported
    if (helpers.isNil(transformsPropertiesRegistered)) {
      if (consts.isBrowser && (helpers.isUnd(CSS) || !Object.hasOwnProperty.call(CSS, 'registerProperty'))) {
        transformsPropertiesRegistered = false;
      } else {
        consts.validTransforms.forEach(t => {
          const isSkew = helpers.stringStartsWith(t, 'skew');
          const isScale = helpers.stringStartsWith(t, 'scale');
          const isRotate = helpers.stringStartsWith(t, 'rotate');
          const isTranslate = helpers.stringStartsWith(t, 'translate');
          const isAngle = isRotate || isSkew;
          const syntax = isAngle ? '<angle>' : isScale ? "<number>" : isTranslate ? "<length-percentage>" : "*";
          try {
            CSS.registerProperty({
              name: '--' + t,
              syntax,
              inherits: false,
              initialValue: isTranslate ? '0px' : isAngle ? '0deg' : isScale ? '1' : '0',
            });
          } catch {}        });
        transformsPropertiesRegistered = true;
      }
    }

    const parsedTargets = targets.registerTargets(targets$1);
    const targetsLength = parsedTargets.length;

    if (!targetsLength) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }

    const ease = values.setValue(params.ease, parseWAAPIEasing(globals.globals.defaults.ease));
    const spring = /** @type {Spring} */(ease).ease && ease;
    const autoplay = values.setValue(params.autoplay, globals.globals.defaults.autoplay);
    const scroll = autoplay && /** @type {ScrollObserver} */(autoplay).link ? autoplay : false;
    const alternate = params.alternate && /** @type {Boolean} */(params.alternate) === true;
    const reversed = params.reversed && /** @type {Boolean} */(params.reversed) === true;
    const loop = values.setValue(params.loop, globals.globals.defaults.loop);
    const iterations = /** @type {Number} */((loop === true || loop === Infinity) ? Infinity : helpers.isNum(loop) ? loop + 1 : 1);
    /** @type {PlaybackDirection} */
    const direction = alternate ? reversed ? 'alternate-reverse' : 'alternate' : reversed ? 'reverse' : 'normal';
    /** @type {FillMode} */
    const fill = 'both'; // We use 'both' here because the animation can be reversed during playback
    /** @type {String} */
    const easing = parseWAAPIEasing(ease);
    const timeScale = (globals.globals.timeScale === 1 ? 1 : consts.K);

    /** @type {DOMTargetsArray}] */
    this.targets = parsedTargets;
    /** @type {Array<globalThis.Animation>}] */
    this.animations = [];
    /** @type {globalThis.Animation}] */
    this.controlAnimation = null;
    /** @type {Callback<this>} */
    this.onComplete = params.onComplete || /** @type {Callback<WAAPIAnimation>} */(/** @type {unknown} */(globals.globals.defaults.onComplete));
    /** @type {Number} */
    this.duration = 0;
    /** @type {Boolean} */
    this.muteCallbacks = false;
    /** @type {Boolean} */
    this.completed = false;
    /** @type {Boolean} */
    this.paused = !autoplay || scroll !== false;
    /** @type {Boolean} */
    this.reversed = reversed;
    /** @type {Boolean} */
    this.persist = values.setValue(params.persist, globals.globals.defaults.persist);
    /** @type {Boolean|ScrollObserver} */
    this.autoplay = autoplay;
    /** @type {Number} */
    this._speed = values.setValue(params.playbackRate, globals.globals.defaults.playbackRate);
    /** @type {Function} */
    this._resolve = consts.noop; // Used by .then()
    /** @type {Number} */
    this._completed = 0;
    /** @type {Array.<Object>} */
    this._inlineStyles = [];

    parsedTargets.forEach(($el, i) => {

      const cachedTransforms = $el[consts.transformsSymbol];
      const hasIndividualTransforms = validIndividualTransforms.some(t => params.hasOwnProperty(t));
      const elStyle = $el.style;
      const inlineStyles = this._inlineStyles[i] = {};

      /** @type {Number} */
      const duration = (spring ? /** @type {Spring} */(spring).settlingDuration : values.getFunctionValue(values.setValue(params.duration, globals.globals.defaults.duration), $el, i, targetsLength)) * timeScale;
      /** @type {Number} */
      const delay = values.getFunctionValue(values.setValue(params.delay, globals.globals.defaults.delay), $el, i, targetsLength) * timeScale;
      /** @type {CompositeOperation} */
      const composite = /** @type {CompositeOperation} */(values.setValue(params.composition, 'replace'));

      for (let name in params) {
        if (!helpers.isKey(name)) continue;
        /** @type {PropertyIndexedKeyframes} */
        const keyframes = {};
        /** @type {KeyframeAnimationOptions} */
        const tweenParams = { iterations, direction, fill, easing, duration, delay, composite };
        const propertyValue = params[name];
        const individualTransformProperty = hasIndividualTransforms ? consts.validTransforms.includes(name) ? name : consts.shortTransforms.get(name) : false;

        const styleName = individualTransformProperty ? 'transform' : name;
        if (!inlineStyles[styleName]) {
          inlineStyles[styleName] = elStyle[styleName];
        }

        let parsedPropertyValue;
        if (helpers.isObj(propertyValue)) {
          const tweenOptions = /** @type {WAAPITweenOptions} */(propertyValue);
          const tweenOptionsEase = values.setValue(tweenOptions.ease, ease);
          const tweenOptionsSpring = /** @type {Spring} */(tweenOptionsEase).ease && tweenOptionsEase;
          const to = /** @type {WAAPITweenOptions} */(tweenOptions).to;
          const from = /** @type {WAAPITweenOptions} */(tweenOptions).from;
          /** @type {Number} */
          tweenParams.duration = (tweenOptionsSpring ? /** @type {Spring} */(tweenOptionsSpring).settlingDuration : values.getFunctionValue(values.setValue(tweenOptions.duration, duration), $el, i, targetsLength)) * timeScale;
          /** @type {Number} */
          tweenParams.delay = values.getFunctionValue(values.setValue(tweenOptions.delay, delay), $el, i, targetsLength) * timeScale;
          /** @type {CompositeOperation} */
          tweenParams.composite = /** @type {CompositeOperation} */(values.setValue(tweenOptions.composition, composite));
          /** @type {String} */
          tweenParams.easing = parseWAAPIEasing(tweenOptionsEase);
          parsedPropertyValue = parseIndividualTweenValue($el, name, from, to, i, targetsLength);
          if (individualTransformProperty) {
            keyframes[`--${individualTransformProperty}`] = parsedPropertyValue;
            cachedTransforms[individualTransformProperty] = parsedPropertyValue;
          } else {
            keyframes[name] = parseIndividualTweenValue($el, name, from, to, i, targetsLength);
          }
          composition.addWAAPIAnimation(this, $el, name, keyframes, tweenParams);
          if (!helpers.isUnd(from)) {
            if (!individualTransformProperty) {
              elStyle[name] = keyframes[name][0];
            } else {
              const key = `--${individualTransformProperty}`;
              elStyle.setProperty(key, keyframes[key][0]);
            }
          }
        } else {
          parsedPropertyValue = helpers.isArr(propertyValue) ?
                                propertyValue.map((/** @type {any} */v) => normalizeTweenValue(name, v, $el, i, targetsLength)) :
                                normalizeTweenValue(name, /** @type {any} */(propertyValue), $el, i, targetsLength);
          if (individualTransformProperty) {
            keyframes[`--${individualTransformProperty}`] = parsedPropertyValue;
            cachedTransforms[individualTransformProperty] = parsedPropertyValue;
          } else {
            keyframes[name] = parsedPropertyValue;
          }
          composition.addWAAPIAnimation(this, $el, name, keyframes, tweenParams);
        }
      }
      if (hasIndividualTransforms) {
        let transforms = consts.emptyString;
        for (let t in cachedTransforms) {
          transforms += `${consts.transformsFragmentStrings[t]}var(--${t})) `;
        }
        elStyle.transform = transforms;
      }
    });

    if (scroll) {
      /** @type {ScrollObserver} */(this.autoplay).link(this);
    }
  }

  /**
   * @callback forEachCallback
   * @param {globalThis.Animation} animation
   */

  /**
   * @param  {forEachCallback|String} callback
   * @return {this}
   */
  forEach(callback) {
    const cb = helpers.isStr(callback) ? (/** @type {globalThis.Animation} */a) => a[callback]() : callback;
    this.animations.forEach(cb);
    return this;
  }

  get speed() {
    return this._speed;
  }

  set speed(speed) {
    this._speed = +speed;
    this.forEach(anim => anim.playbackRate = speed);
  }

  get currentTime() {
    const controlAnimation = this.controlAnimation;
    const timeScale = globals.globals.timeScale;
    return this.completed ? this.duration : controlAnimation ? +controlAnimation.currentTime * (timeScale === 1 ? 1 : timeScale) : 0;
  }

  set currentTime(time) {
    const t = time * (globals.globals.timeScale === 1 ? 1 : consts.K);
    this.forEach(anim => {
      // Make sure the animation playState is not 'paused' in order to properly trigger an onfinish callback.
      // The "paused" play state supersedes the "finished" play state; if the animation is both paused and finished, the "paused" state is the one that will be reported.
      // https://developer.mozilla.org/en-US/docs/Web/API/Animation/finish_event
      // This is not needed for persisting animations since they never finish.
      if (!this.persist && t >= this.duration) anim.play();
      anim.currentTime = t;
    });
  }

  get progress() {
    return this.currentTime / this.duration;
  }

  set progress(progress) {
    this.forEach(anim => anim.currentTime = progress * this.duration || 0);
  }

  resume() {
    if (!this.paused) return this;
    this.paused = false;
    // TODO: Store the current time, and seek back to the last position
    return this.forEach('play');
  }

  pause() {
    if (this.paused) return this;
    this.paused = true;
    return this.forEach('pause');
  }

  alternate() {
    this.reversed = !this.reversed;
    this.forEach('reverse');
    if (this.paused) this.forEach('pause');
    return this;
  }

  play() {
    if (this.reversed) this.alternate();
    return this.resume();
  }

  reverse() {
    if (!this.reversed) this.alternate();
    return this.resume();
  }

 /**
  * @param {Number} time
  * @param {Boolean} muteCallbacks
  */
  seek(time, muteCallbacks = false) {
    if (muteCallbacks) this.muteCallbacks = true;
    if (time < this.duration) this.completed = false;
    this.currentTime = time;
    this.muteCallbacks = false;
    if (this.paused) this.pause();
    return this;
  }

  restart() {
    this.completed = false;
    return this.seek(0, true).resume();
  }

  commitStyles() {
    return this.forEach('commitStyles');
  }

  complete() {
    return this.seek(this.duration);
  }

  cancel() {
    this.muteCallbacks = true; // This prevents triggering the onComplete callback and resolving the Promise
    return this.commitStyles().forEach('cancel');
  }

  revert() {
    // NOTE: We need a better way to revert the transforms, since right now the entire transform property value is reverted,
    // This means if you have multiple animations animating different transforms on the same target,
    // reverting one of them will also override the transform property of the other animations.
    // A better approach would be to store the original custom property values is they exist instead of the entire transform value,
    // and update the CSS variables with the orignal value
    this.cancel().targets.forEach(($el, i) => {
      const targetStyle = $el.style;
      const targetInlineStyles = this._inlineStyles[i];
      for (let name in targetInlineStyles) {
        const originalInlinedValue = targetInlineStyles[name];
        if (helpers.isUnd(originalInlinedValue) || originalInlinedValue === consts.emptyString) {
          targetStyle.removeProperty(helpers.toLowerCase(name));
        } else {
          targetStyle[name] = originalInlinedValue;
        }
      }
      // Remove style attribute if empty
      if ($el.getAttribute('style') === consts.emptyString) $el.removeAttribute('style');
    });
    return this;
  }

  /**
   * @typedef {this & {then: null}} ResolvedWAAPIAnimation
   */

  /**
   * @param  {Callback<ResolvedWAAPIAnimation>} [callback]
   * @return Promise<this>
   */
  then(callback = consts.noop) {
    const then = this.then;
    const onResolve = () => {
      this.then = null;
      callback(/** @type {ResolvedWAAPIAnimation} */(this));
      this.then = then;
      this._resolve = consts.noop;
    };
    return new Promise(r => {
      this._resolve = () => r(onResolve());
      if (this.completed) this._resolve();
      return this;
    });
  }
}

const waapi = {
/**
 * @param {DOMTargetsParam} targets
 * @param {WAAPIAnimationParams} params
 * @return {WAAPIAnimation}
 */
  animate: (targets, params) => new WAAPIAnimation(targets, params),
  convertEase: easingToLinear
};

exports.WAAPIAnimation = WAAPIAnimation;
exports.waapi = waapi;

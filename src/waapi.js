/// <reference path='./types.js' />

import {
  isArr,
  isKey,
  isNum,
  isObj,
  isStr,
  isUnd,
  isFnc,
  addChild,
  removeChild,
  stringStartsWith,
  toLowerCase,
  isNil,
} from './helpers.js';

import {
  scope,
  globals,
} from './globals.js';

import {
  registerTargets,
} from './targets.js';

import {
  getFunctionValue,
  setValue,
} from './values.js';

import {
  none,
  easeTypes,
  easeInPower,
  parseEaseString,
} from './eases.js';

import {
  isBrowser,
  K,
  noop,
  emptyString,
  shortTransforms,
  transformsFragmentStrings,
  transformsSymbol,
  validTransforms,
} from './consts.js';

/**
 * Converts an easing function into a valid CSS linear() timing function string
 * @param {EasingFunction} fn
 * @param {number} [samples=100]
 * @returns {string} CSS linear() timing function
 */
const easingToLinear = (fn, samples = 100) => {
  const points = [];
  for (let i = 0; i <= samples; i++) points.push(fn(i / samples));
  return `linear(${points.join(', ')})`;
}

const WAAPIEasesLookups = {
  in: 'ease-in',
  out: 'ease-out',
  inOut: 'ease-in-out',
}

const WAAPIeases = /*#__PURE__*/(() => {
  const list = {};
  for (let type in easeTypes) list[type] = (/** @type {String|Number} */p) => easeTypes[type](easeInPower(p));
  return /** @type {Record<String, EasingFunction>} */(list);
})();

/**
 * @param  {EasingParam} ease
 * @return {String}
 */
const parseWAAPIEasing = (ease) => {
  let parsedEase = WAAPIEasesLookups[ease];
  if (parsedEase) return parsedEase;
  parsedEase = 'linear';
  if (isStr(ease)) {
    if (
      stringStartsWith(ease, 'linear') ||
      stringStartsWith(ease, 'cubic-') ||
      stringStartsWith(ease, 'steps') ||
      stringStartsWith(ease, 'ease')
    ) {
      parsedEase = ease;
    } else if (stringStartsWith(ease, 'cubicB')) {
      parsedEase = toLowerCase(ease);
    } else {
      const parsed = parseEaseString(ease, WAAPIeases, WAAPIEasesLookups);
      if (isFnc(parsed)) parsedEase = parsed === none ? 'linear' : easingToLinear(parsed);
    }
    WAAPIEasesLookups[ease] = parsedEase;
  } else if (isFnc(ease)) {
    const easing = easingToLinear(ease);
    if (easing) parsedEase = easing;
  } else if (/** @type {Spring} */(ease).ease) {
    parsedEase = easingToLinear(/** @type {Spring} */(ease).ease);
  }
  return parsedEase;
}

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
]

const validIndividualTransforms = /*#__PURE__*/ (() => [...transformsShorthands, ...validTransforms.filter(t => ['X', 'Y', 'Z'].some(axis => t.endsWith(axis)))])();

let transformsPropertiesRegistered = null;

const WAAPIAnimationsLookups = {
  _head: null,
  _tail: null,
};

/**
 * @param {DOMTarget} $el
 * @param {String} [property]
 * @param {WAAPIAnimation} [parent]
 */
export const removeWAAPIAnimation = ($el, property, parent) => {
  let nextLookup = WAAPIAnimationsLookups._head;
  while (nextLookup) {
    const next = nextLookup._next;
    const matchTarget = nextLookup.$el === $el;
    const matchProperty = !property || nextLookup.property === property;
    const matchParent = !parent || nextLookup.parent === parent;
    if (matchTarget && matchProperty && matchParent) {
      const anim = nextLookup.animation;
      try { anim.commitStyles(); } catch {};
      anim.cancel();
      removeChild(WAAPIAnimationsLookups, nextLookup);
      const lookupParent = nextLookup.parent;
      if (lookupParent) {
        lookupParent._completed++;
        if (lookupParent.animations.length === lookupParent._completed) {
          lookupParent.completed = true;
          if (!lookupParent.muteCallbacks) {
            lookupParent.paused = true;
            lookupParent.onComplete(lookupParent);
            lookupParent._resolve(lookupParent);
          }
        }
      }
    }
    nextLookup = next;
  }
}

/**
 * @param {WAAPIAnimation} parent
 * @param {DOMTarget} $el
 * @param {String} property
 * @param {PropertyIndexedKeyframes} keyframes
 * @param {KeyframeAnimationOptions} params
 * @retun {Animation}
 */
const addWAAPIAnimation = (parent, $el, property, keyframes, params) => {
  const animation = $el.animate(keyframes, params);
  const animTotalDuration = params.delay + (+params.duration * params.iterations);
  animation.playbackRate = parent._speed;
  if (parent.paused) animation.pause();
  if (parent.duration < animTotalDuration) {
    parent.duration = animTotalDuration;
    parent.controlAnimation = animation;
  }
  parent.animations.push(animation);
  removeWAAPIAnimation($el, property);
  addChild(WAAPIAnimationsLookups, { parent, animation, $el, property, _next: null, _prev: null });
  const handleRemove = () => { removeWAAPIAnimation($el, property, parent); };
  animation.onremove = handleRemove;
  animation.onfinish = handleRemove;
  return animation;
}

/**
 * @param  {String} propName
 * @param  {WAAPIKeyframeValue} value
 * @param  {DOMTarget} $el
 * @param  {Number} i
 * @param  {Number} targetsLength
 * @return {String}
 */
const normalizeTweenValue = (propName, value, $el, i, targetsLength) => {
  let v = getFunctionValue(/** @type {any} */(value), $el, i, targetsLength);
  if (!isNum(v)) return v;
  if (commonDefaultPXProperties.includes(propName) || stringStartsWith(propName, 'translate')) return `${v}px`;
  if (stringStartsWith(propName, 'rotate') || stringStartsWith(propName, 'skew')) return `${v}deg`;
  return `${v}`;
}

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
  const computedTo = !isUnd(to) ? normalizeTweenValue(propName, to, $el, i, targetsLength) : getComputedStyle($el)[propName];
  if (!isUnd(from)) {
    const computedFrom = normalizeTweenValue(propName, from, $el, i, targetsLength);
    tweenValue = [computedFrom, computedTo];
  } else {
    tweenValue = isArr(to) ? to.map((/** @type {any} */v) => normalizeTweenValue(propName, v, $el, i, targetsLength)) : computedTo;
  }
  return tweenValue;
}

export class WAAPIAnimation {
/**
 * @param {DOMTargetsParam} targets
 * @param {WAAPIAnimationParams} params
 */
  constructor(targets, params) {

    if (scope.current) scope.current.register(this);

    // Skip the registration and fallback to no animation in case CSS.registerProperty is not supported
    if (isNil(transformsPropertiesRegistered)) {
      if (isBrowser && (isUnd(CSS) || !Object.hasOwnProperty.call(CSS, 'registerProperty'))) {
        transformsPropertiesRegistered = false;
      } else {
        validTransforms.forEach(t => {
          const isSkew = stringStartsWith(t, 'skew');
          const isScale = stringStartsWith(t, 'scale');
          const isRotate = stringStartsWith(t, 'rotate');
          const isTranslate = stringStartsWith(t, 'translate');
          const isAngle = isRotate || isSkew;
          const syntax = isAngle ? '<angle>' : isScale ? "<number>" : isTranslate ? "<length-percentage>" : "*";
          try {
            CSS.registerProperty({
              name: '--' + t,
              syntax,
              inherits: false,
              initialValue: isTranslate ? '0px' : isAngle ? '0deg' : isScale ? '1' : '0',
            });
          } catch {};
        });
        transformsPropertiesRegistered = true;
      }
    }

    const parsedTargets = registerTargets(targets);
    const targetsLength = parsedTargets.length;

    if (!targetsLength) {
      console.warn(`No target found. Make sure the element you're trying to animate is accessible before creating your animation.`);
    }

    const ease = setValue(params.ease, parseWAAPIEasing(globals.defaults.ease));
    const spring = /** @type {Spring} */(ease).ease && ease;
    const autoplay = setValue(params.autoplay, globals.defaults.autoplay);
    const scroll = autoplay && /** @type {ScrollObserver} */(autoplay).link ? autoplay : false;
    const alternate = params.alternate && /** @type {Boolean} */(params.alternate) === true;
    const reversed = params.reversed && /** @type {Boolean} */(params.reversed) === true;
    const loop = setValue(params.loop, globals.defaults.loop);
    const iterations = /** @type {Number} */((loop === true || loop === Infinity) ? Infinity : isNum(loop) ? loop + 1 : 1);
    /** @type {PlaybackDirection} */
    const direction = alternate ? reversed ? 'alternate-reverse' : 'alternate' : reversed ? 'reverse' : 'normal';
    /** @type {FillMode} */
    const fill = 'forwards';
    /** @type {String} */
    const easing = parseWAAPIEasing(ease);
    const timeScale = (globals.timeScale === 1 ? 1 : K);

    /** @type {DOMTargetsArray}] */
    this.targets = parsedTargets;
    /** @type {Array<globalThis.Animation>}] */
    this.animations = [];
    /** @type {globalThis.Animation}] */
    this.controlAnimation = null;
    /** @type {Callback<this>} */
    this.onComplete = params.onComplete || noop;
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
    /** @type {Boolean|ScrollObserver} */
    this.autoplay = autoplay;
    /** @type {Number} */
    this._speed = setValue(params.playbackRate, globals.defaults.playbackRate);
    /** @type {Function} */
    this._resolve = noop; // Used by .then()
    /** @type {Number} */
    this._completed = 0;
    /** @type {Array<Object>}] */
    this._inlineStyles = parsedTargets.map($el => $el.getAttribute('style'));

    parsedTargets.forEach(($el, i) => {

      const cachedTransforms = $el[transformsSymbol];

      const hasIndividualTransforms = validIndividualTransforms.some(t => params.hasOwnProperty(t));

      /** @type {Number} */
      const duration = (spring ? /** @type {Spring} */(spring).duration : getFunctionValue(setValue(params.duration, globals.defaults.duration), $el, i, targetsLength)) * timeScale;
      /** @type {Number} */
      const delay = getFunctionValue(setValue(params.delay, globals.defaults.delay), $el, i, targetsLength) * timeScale;
      /** @type {CompositeOperation} */
      const composite = /** @type {CompositeOperation} */(setValue(params.composition, 'replace'));

      for (let name in params) {
        if (!isKey(name)) continue;
        /** @type {PropertyIndexedKeyframes} */
        const keyframes = {};
        /** @type {KeyframeAnimationOptions} */
        const tweenParams = { iterations, direction, fill, easing, duration, delay, composite };
        const propertyValue = params[name];
        const individualTransformProperty = hasIndividualTransforms ? validTransforms.includes(name) ? name : shortTransforms.get(name) : false;
        let parsedPropertyValue;
        if (isObj(propertyValue)) {
          const tweenOptions = /** @type {WAAPITweenOptions} */(propertyValue);
          const tweenOptionsEase = setValue(tweenOptions.ease, ease);
          const tweenOptionsSpring = /** @type {Spring} */(tweenOptionsEase).ease && tweenOptionsEase;
          const to = /** @type {WAAPITweenOptions} */(tweenOptions).to;
          const from = /** @type {WAAPITweenOptions} */(tweenOptions).from;
          /** @type {Number} */
          tweenParams.duration = (tweenOptionsSpring ? /** @type {Spring} */(tweenOptionsSpring).duration : getFunctionValue(setValue(tweenOptions.duration, duration), $el, i, targetsLength)) * timeScale;
          /** @type {Number} */
          tweenParams.delay = getFunctionValue(setValue(tweenOptions.delay, delay), $el, i, targetsLength) * timeScale;
          /** @type {CompositeOperation} */
          tweenParams.composite = /** @type {CompositeOperation} */(setValue(tweenOptions.composition, composite));
          /** @type {FillMode} */
          tweenParams.fill = !isUnd(tweenOptions.from) ? /** @type {FillMode} */'both' : fill;
          /** @type {String} */
          tweenParams.easing = parseWAAPIEasing(tweenOptionsEase);
          parsedPropertyValue = parseIndividualTweenValue($el, name, from, to, i, targetsLength);
          if (individualTransformProperty) {
            keyframes[`--${individualTransformProperty}`] = parsedPropertyValue;
            cachedTransforms[individualTransformProperty] = parsedPropertyValue;
          } else {
            keyframes[name] = parseIndividualTweenValue($el, name, from, to, i, targetsLength);
          }
          addWAAPIAnimation(this, $el, name, keyframes, tweenParams);
          if (!isUnd(from)) {
            if (!individualTransformProperty) {
              $el.style[name] = keyframes[name][0];
            } else {
              const key = `--${individualTransformProperty}`;
              $el.style.setProperty(key, keyframes[key][0]);
            }
          }
        } else {
          parsedPropertyValue = isArr(propertyValue) ?
                                propertyValue.map((/** @type {any} */v) => normalizeTweenValue(name, v, $el, i, targetsLength)) :
                                normalizeTweenValue(name, /** @type {any} */(propertyValue), $el, i, targetsLength);
          if (individualTransformProperty) {
            keyframes[`--${individualTransformProperty}`] = parsedPropertyValue;
            cachedTransforms[individualTransformProperty] = parsedPropertyValue;
          } else {
            keyframes[name] = parsedPropertyValue;
          }
          addWAAPIAnimation(this, $el, name, keyframes, tweenParams);
        }
      }
      if (hasIndividualTransforms) {
        let transforms = emptyString;
        for (let t in cachedTransforms) {
          transforms += `${transformsFragmentStrings[t]}var(--${t})) `;
        }
        $el.style.transform = transforms;
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
    const cb = isStr(callback) ? (/** @type {globalThis.Animation} */a) => a[callback]() : callback;
    this.animations.forEach(cb);
    return this;
  }

  get speed() {
    return this._speed;
  }

  /** @param {Number} speed */
  set speed(speed) {
    this._speed = +speed;
    this.forEach(anim => anim.playbackRate = speed);
  }

  get currentTime() {
    const controlAnimation = this.controlAnimation;
    const timeScale = globals.timeScale;
    return this.completed ? this.duration : controlAnimation ? +controlAnimation.currentTime * (timeScale === 1 ? 1 : timeScale) : 0;
  }

  /** @param {Number} time */
  set currentTime(time) {
    const t = time * (globals.timeScale === 1 ? 1 : K);

    this.forEach((anim) => {
      // Make sure the animation playState is not 'paused' in order to properly trigger an onfinish callback.
      // The "paused" play state supersedes the "finished" play state; if the animation is both paused and finished, the "paused" state is the one that will be reported.
      // https://developer.mozilla.org/en-US/docs/Web/API/Animation/finish_event
      if (t >= this.duration) anim.play();
      anim.currentTime = t;
    });
  }

  get progress() {
    return this.currentTime / this.duration;
  }

  /** @param {Number} progress */
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
    this.forEach('cancel');
    return this.pause();
  }

  revert() {
    this.cancel();
    this.targets.forEach(($el, i) => $el.setAttribute('style', this._inlineStyles[i]) );
    return this;
  }

  /**
   * @param  {WAAPICallback} [callback]
   * @return {Promise}
   */
  then(callback = noop) {
    const then = this.then;
    const onResolve = () => {
      this.then = null;
      callback(this);
      this.then = then;
      this._resolve = noop;
    }
    return new Promise(r => {
      this._resolve = () => r(onResolve());
      if (this.completed) this._resolve();
      return this;
    });
  }
}

export const waapi = {
/**
 * @param {DOMTargetsParam} targets
 * @param {WAAPIAnimationParams} params
 * @return {WAAPIAnimation}
 */
  animate: (targets, params) => new WAAPIAnimation(targets, params),
  convertEase: easingToLinear
}

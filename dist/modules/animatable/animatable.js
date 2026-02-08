/**
 * Anime.js - animatable - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { compositionTypes, noop } from '../core/consts.js';
import { scope } from '../core/globals.js';
import { isUnd, isKey, stringStartsWith, isObj, mergeObjects, forEachChildren, isStr, isArr } from '../core/helpers.js';
import { JSAnimation } from '../animation/animation.js';
import { parseEase } from '../easings/eases/parser.js';

/**
 * @import {
 * TargetsParam,
 * AnimatableParams,
 * AnimationParams,
 * TweenParamsOptions,
 * Tween,
 * AnimatableProperty,
 * AnimatableObject,
 * } from '../types/index.js';
 */

class Animatable {
  /**
   * @param {TargetsParam} targets
   * @param {AnimatableParams} parameters
   */
  constructor(targets, parameters) {
    if (scope.current) scope.current.register(this);
    const beginHandler = () => {
      if (this.callbacks.completed) this.callbacks.reset();
      this.callbacks.play();
    };
    const pauseHandler = () => {
      if (this.callbacks.completed) return;
      let paused = true;
      for (let name in this.animations) {
        const anim = this.animations[name];
        if (!anim.paused && paused) {
          paused = false;
          break;
        }
      }
      if (paused) {
        this.callbacks.complete();
      }
    };
    /** @type {AnimationParams} */
    const globalParams = {
      onBegin: beginHandler,
      onComplete: pauseHandler,
      onPause: pauseHandler,
    };
    /** @type {AnimationParams} */
    const callbacksAnimationParams = { v: 1, autoplay: false };
    const properties = {};
    this.targets = [];
    this.animations = {};
    /** @type {JSAnimation|null} */
    this.callbacks = null;
    if (isUnd(targets) || isUnd(parameters)) return;
    for (let propName in parameters) {
      const paramValue = parameters[propName];
      if (isKey(propName)) {
        properties[propName] = paramValue;
      } else if (stringStartsWith(propName, 'on')) {
        callbacksAnimationParams[propName] = paramValue;
      } else {
        globalParams[propName] = paramValue;
      }
    }
    this.callbacks = new JSAnimation({ v: 0 }, callbacksAnimationParams);
    for (let propName in properties) {
      const propValue = properties[propName];
      const isObjValue = isObj(propValue);
      /** @type {TweenParamsOptions} */
      let propParams = {};
      let to = '+=0';
      if (isObjValue) {
        const unit = propValue.unit;
        if (isStr(unit)) to += unit;
      } else {
        propParams.duration = propValue;
      }
      propParams[propName] = isObjValue ? mergeObjects({ to }, propValue) : to;
      const animParams = mergeObjects(globalParams, propParams);
      animParams.composition = compositionTypes.replace;
      animParams.autoplay = false;
      const animation = this.animations[propName] = new JSAnimation(targets, animParams, null, 0, false).init();
      if (!this.targets.length) this.targets.push(...animation.targets);
      /** @type {AnimatableProperty} */
      this[propName] = (to, duration, ease) => {
        const tween = /** @type {Tween} */(animation._head);
        if (isUnd(to) && tween) {
          const numbers = tween._numbers;
          if (numbers && numbers.length) {
            return numbers;
          } else {
            return tween._modifier(tween._number);
          }
        } else {
          forEachChildren(animation, (/** @type {Tween} */tween) => {
            if (isArr(to)) {
              for (let i = 0, l = /** @type {Array} */(to).length; i < l; i++) {
                if (!isUnd(tween._numbers[i])) {
                  tween._fromNumbers[i] = /** @type {Number} */(tween._modifier(tween._numbers[i]));
                  tween._toNumbers[i] = to[i];
                }
              }
            } else {
              tween._fromNumber = /** @type {Number} */(tween._modifier(tween._number));
              tween._toNumber = /** @type {Number} */(to);
            }
            if (!isUnd(ease)) tween._ease = parseEase(ease);
            tween._currentTime = 0;
          });
          if (!isUnd(duration)) animation.stretch(duration);
          animation.reset(true).resume();
          return this;
        }
      };
    }
  }

  revert() {
    for (let propName in this.animations) {
      this[propName] = noop;
      this.animations[propName].revert();
    }
    this.animations = {};
    this.targets.length = 0;
    if (this.callbacks) this.callbacks.revert();
    return this;
  }
}

/**
 * @param {TargetsParam} targets
 * @param {AnimatableParams} parameters
 * @return {AnimatableObject}
 */
const createAnimatable = (targets, parameters) => /** @type {AnimatableObject} */ (new Animatable(targets, parameters));

export { Animatable, createAnimatable };

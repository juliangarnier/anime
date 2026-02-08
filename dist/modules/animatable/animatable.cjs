/**
 * Anime.js - animatable - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../core/consts.cjs');
var globals = require('../core/globals.cjs');
var helpers = require('../core/helpers.cjs');
var animation = require('../animation/animation.cjs');
var parser = require('../easings/eases/parser.cjs');

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
    if (globals.scope.current) globals.scope.current.register(this);
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
    if (helpers.isUnd(targets) || helpers.isUnd(parameters)) return;
    for (let propName in parameters) {
      const paramValue = parameters[propName];
      if (helpers.isKey(propName)) {
        properties[propName] = paramValue;
      } else if (helpers.stringStartsWith(propName, 'on')) {
        callbacksAnimationParams[propName] = paramValue;
      } else {
        globalParams[propName] = paramValue;
      }
    }
    this.callbacks = new animation.JSAnimation({ v: 0 }, callbacksAnimationParams);
    for (let propName in properties) {
      const propValue = properties[propName];
      const isObjValue = helpers.isObj(propValue);
      /** @type {TweenParamsOptions} */
      let propParams = {};
      let to = '+=0';
      if (isObjValue) {
        const unit = propValue.unit;
        if (helpers.isStr(unit)) to += unit;
      } else {
        propParams.duration = propValue;
      }
      propParams[propName] = isObjValue ? helpers.mergeObjects({ to }, propValue) : to;
      const animParams = helpers.mergeObjects(globalParams, propParams);
      animParams.composition = consts.compositionTypes.replace;
      animParams.autoplay = false;
      const animation$1 = this.animations[propName] = new animation.JSAnimation(targets, animParams, null, 0, false).init();
      if (!this.targets.length) this.targets.push(...animation$1.targets);
      /** @type {AnimatableProperty} */
      this[propName] = (to, duration, ease) => {
        const tween = /** @type {Tween} */(animation$1._head);
        if (helpers.isUnd(to) && tween) {
          const numbers = tween._numbers;
          if (numbers && numbers.length) {
            return numbers;
          } else {
            return tween._modifier(tween._number);
          }
        } else {
          helpers.forEachChildren(animation$1, (/** @type {Tween} */tween) => {
            if (helpers.isArr(to)) {
              for (let i = 0, l = /** @type {Array} */(to).length; i < l; i++) {
                if (!helpers.isUnd(tween._numbers[i])) {
                  tween._fromNumbers[i] = /** @type {Number} */(tween._modifier(tween._numbers[i]));
                  tween._toNumbers[i] = to[i];
                }
              }
            } else {
              tween._fromNumber = /** @type {Number} */(tween._modifier(tween._number));
              tween._toNumber = /** @type {Number} */(to);
            }
            if (!helpers.isUnd(ease)) tween._ease = parser.parseEase(ease);
            tween._currentTime = 0;
          });
          if (!helpers.isUnd(duration)) animation$1.stretch(duration);
          animation$1.reset(true).resume();
          return this;
        }
      };
    }
  }

  revert() {
    for (let propName in this.animations) {
      this[propName] = consts.noop;
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

exports.Animatable = Animatable;
exports.createAnimatable = createAnimatable;

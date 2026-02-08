/**
 * Anime.js - easings - CJS
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

'use strict';

var consts = require('../../core/consts.cjs');
var globals = require('../../core/globals.cjs');
var helpers = require('../../core/helpers.cjs');
var values = require('../../core/values.cjs');

/**
 * @import {
 *   JSAnimation,
 * } from '../../animation/animation.js'
 */

/**
 * @import {
 *   EasingFunction,
 *   SpringParams,
 *   Callback,
 * } from '../../types/index.js'
*/

/*
 * Spring easing solver adapted from https://webkit.org/demos/spring/spring.js
 * (c) 2016 Webkit - Apple Inc
 */

const maxSpringParamValue = consts.K * 10;

class Spring {
  /**
   * @param {SpringParams} [parameters]
   */
  constructor(parameters = {}) {
    const hasBounceOrDuration = !helpers.isUnd(parameters.bounce) || !helpers.isUnd(parameters.duration);
    this.timeStep = .02; // Interval fed to the solver to calculate duration
    this.restThreshold = .0005; // Values below this threshold are considered resting position
    this.restDuration = 200; // Duration in ms used to check if the spring is resting after reaching restThreshold
    this.maxDuration = 60000; // The maximum allowed spring duration in ms (default 1 min)
    this.maxRestSteps = this.restDuration / this.timeStep / consts.K; // How many steps allowed after reaching restThreshold before stopping the duration calculation
    this.maxIterations = this.maxDuration / this.timeStep / consts.K; // Calculate the maximum iterations allowed based on maxDuration
    this.bn = helpers.clamp(values.setValue(parameters.bounce, .5), -1, 1); // The bounce percentage between -1 and 1.
    this.pd = helpers.clamp(values.setValue(parameters.duration, 628), 10 * globals.globals.timeScale, maxSpringParamValue * globals.globals.timeScale); // The perceived duration
    this.m = helpers.clamp(values.setValue(parameters.mass, 1), 1, maxSpringParamValue);
    this.s = helpers.clamp(values.setValue(parameters.stiffness, 100), consts.minValue, maxSpringParamValue);
    this.d = helpers.clamp(values.setValue(parameters.damping, 10), consts.minValue, maxSpringParamValue);
    this.v = helpers.clamp(values.setValue(parameters.velocity, 0), -maxSpringParamValue, maxSpringParamValue);
    this.w0 = 0;
    this.zeta = 0;
    this.wd = 0;
    this.b = 0;
    this.completed = false;
    this.solverDuration = 0;
    this.settlingDuration = 0;
    /** @type {JSAnimation} */
    this.parent = null;
    /** @type {Callback<JSAnimation>} */
    this.onComplete = parameters.onComplete || consts.noop;
    if (hasBounceOrDuration) this.calculateSDFromBD();
    this.compute();
    /** @type {EasingFunction} */
    this.ease = t => {
      const currentTime = t * this.settlingDuration;
      const completed = this.completed;
      const perceivedTime = this.pd;
      if (currentTime >= perceivedTime && !completed) {
        this.completed = true;
        this.onComplete(this.parent);
      }
      if (currentTime < perceivedTime && completed) {
        this.completed = false;
      }
      return t === 0 || t === 1 ? t : this.solve(t * this.solverDuration);
    };
  }

  /** @type {EasingFunction} */
  solve(time) {
    const { zeta, w0, wd, b } = this;
    let t = time;
    if (zeta < 1) {
      // Underdamped
      t = helpers.exp(-t * zeta * w0) * (1 * helpers.cos(wd * t) + b * helpers.sin(wd * t));
    } else if (zeta === 1) {
      // Critically damped
      t = (1 + b * t) * helpers.exp(-t * w0);
    } else {
      // Overdamped
      // Using exponential instead of cosh and sinh functions to prevent Infinity
      // Original exp(-zeta * w0 * t) * (cosh(wd * t) + b * sinh(wd * t))
      t = ((1 + b) * helpers.exp((-zeta * w0 + wd) * t) + (1 - b) * helpers.exp((-zeta * w0 - wd) * t)) / 2;
    }
    return 1 - t;
  }

  calculateSDFromBD() {
    // Apple's SwiftUI perceived spring duration implementation https://developer.apple.com/videos/play/wwdc2023/10158/?time=1010
    // Equations taken from Kevin Grajeda's article https://www.kvin.me/posts/effortless-ui-spring-animations
    const pds = globals.globals.timeScale === 1 ? this.pd / consts.K : this.pd;
    // Mass and velocity should be set to their default values
    this.m = 1;
    this.v = 0;
    // Stiffness = (2π ÷ perceptualDuration)²
    this.s = helpers.pow((2 * helpers.PI) / pds, 2);
    if (this.bn >= 0) {
      // For bounce ≥ 0 (critically damped to underdamped)
      // damping = ((1 - bounce) × 4π) ÷ perceptualDuration
      this.d = ((1 - this.bn) * 4 * helpers.PI) / pds;
    } else {
      // For bounce < 0 (overdamped)
      // damping = 4π ÷ (perceptualDuration × (1 + bounce))
      // Note: (1 + bounce) is positive since bounce is negative
      this.d = (4 * helpers.PI) / (pds * (1 + this.bn));
    }
    this.s = helpers.round(helpers.clamp(this.s, consts.minValue, maxSpringParamValue), 3);
    this.d = helpers.round(helpers.clamp(this.d, consts.minValue, 300), 3); // Clamping to 300 is needed to prevent insane values in the solver
  }

  calculateBDFromSD() {
    // Calculate perceived duration and bounce from stiffness and damping
    // Note: We assumes m = 1 and v = 0 for these calculations
    const pds = (2 * helpers.PI) / helpers.sqrt(this.s);
    this.pd = pds * (globals.globals.timeScale === 1 ? consts.K : 1);
    const zeta = this.d / (2 * helpers.sqrt(this.s));
    if (zeta <= 1) {
      // Critically damped to underdamped
      this.bn = 1 - (this.d * pds) / (4 * helpers.PI);
    } else {
      // Overdamped
      this.bn = (4 * helpers.PI) / (this.d * pds) - 1;
    }
    this.bn = helpers.round(helpers.clamp(this.bn, -1, 1), 3);
    this.pd = helpers.round(helpers.clamp(this.pd, 10 * globals.globals.timeScale, maxSpringParamValue * globals.globals.timeScale), 3);
  }

  compute() {
    const { maxRestSteps, maxIterations, restThreshold, timeStep, m, d, s, v } = this;
    const w0 = this.w0 = helpers.clamp(helpers.sqrt(s / m), consts.minValue, consts.K);
    const bouncedZeta = this.zeta = d / (2 * helpers.sqrt(s * m));
    // Calculate wd based on damping type
    if (bouncedZeta < 1) {
      // Underdamped
      this.wd = w0 * helpers.sqrt(1 - bouncedZeta * bouncedZeta);
      this.b = (bouncedZeta * w0 + -v) / this.wd;
    } else if (bouncedZeta === 1) {
      // Critically damped
      this.wd = 0;
      this.b = -v + w0;
    } else {
      // Overdamped
      this.wd = w0 * helpers.sqrt(bouncedZeta * bouncedZeta - 1);
      this.b = (bouncedZeta * w0 + -v) / this.wd;
    }

    let solverTime = 0;
    let restSteps = 0;
    let iterations = 0;
    while (restSteps <= maxRestSteps && iterations <= maxIterations) {
      if (helpers.abs(1 - this.solve(solverTime)) < restThreshold) {
        restSteps++;
      } else {
        restSteps = 0;
      }
      this.solverDuration = solverTime;
      solverTime += timeStep;
      iterations++;
    }
    this.settlingDuration = helpers.round(this.solverDuration * consts.K, 0) * globals.globals.timeScale;
  }

  get bounce() {
    return this.bn;
  }

  set bounce(v) {
    this.bn = helpers.clamp(values.setValue(v, 1), -1, 1);
    this.calculateSDFromBD();
    this.compute();
  }

  get duration() {
    return this.pd;
  }

  set duration(v) {
    this.pd = helpers.clamp(values.setValue(v, 1), 10 * globals.globals.timeScale, maxSpringParamValue * globals.globals.timeScale);
    this.calculateSDFromBD();
    this.compute();
  }

  get stiffness() {
    return this.s;
  }

  set stiffness(v) {
    this.s = helpers.clamp(values.setValue(v, 100), consts.minValue, maxSpringParamValue);
    this.calculateBDFromSD();
    this.compute();
  }

  get damping() {
    return this.d;
  }

  set damping(v) {
    this.d = helpers.clamp(values.setValue(v, 10), consts.minValue, maxSpringParamValue);
    this.calculateBDFromSD();
    this.compute();
  }

  get mass() {
    return this.m;
  }

  set mass(v) {
    this.m = helpers.clamp(values.setValue(v, 1), 1, maxSpringParamValue);
    this.compute();
  }

  get velocity() {
    return this.v;
  }

  set velocity(v) {
    this.v = helpers.clamp(values.setValue(v, 0), -maxSpringParamValue, maxSpringParamValue);
    this.compute();
  }
}

/**
 * @param {SpringParams} [parameters]
 * @returns {Spring}
 */
const spring = (parameters) => new Spring(parameters);

/**
 * @deprecated createSpring() is deprecated use spring() instead
 *
 * @param {SpringParams} [parameters]
 * @returns {Spring}
 */
const createSpring = (parameters) => {
  console.warn('createSpring() is deprecated use spring() instead');
  return new Spring(parameters);
};

exports.Spring = Spring;
exports.createSpring = createSpring;
exports.spring = spring;

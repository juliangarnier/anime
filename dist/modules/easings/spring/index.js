/**
 * Anime.js - easings - ESM
 * @version v4.2.2
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { K, minValue, noop } from '../../core/consts.js';
import { globals } from '../../core/globals.js';
import { isUnd, clamp, pow, PI, round, sqrt, abs, exp, cos, sin } from '../../core/helpers.js';
import { setValue } from '../../core/values.js';

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

const maxSpringParamValue = K * 10;

class Spring {
  /**
   * @param {SpringParams} [parameters]
   */
  constructor(parameters = {}) {
    const hasBounceOrDuration = !isUnd(parameters.bounce) || !isUnd(parameters.duration);
    this.timeStep = .02; // Interval fed to the solver to calculate duration
    this.restThreshold = .0005; // Values below this threshold are considered resting position
    this.restDuration = 200; // Duration in ms used to check if the spring is resting after reaching restThreshold
    this.maxDuration = 60000; // The maximum allowed spring duration in ms (default 1 min)
    this.maxRestSteps = this.restDuration / this.timeStep / K; // How many steps allowed after reaching restThreshold before stopping the duration calculation
    this.maxIterations = this.maxDuration / this.timeStep / K; // Calculate the maximum iterations allowed based on maxDuration
    this.bn = clamp(setValue(parameters.bounce, .5), -1, 1); // The bounce percentage between -1 and 1.
    this.pd = clamp(setValue(parameters.duration, 628), 10 * globals.timeScale, maxSpringParamValue * globals.timeScale); // The perceived duration
    this.m = clamp(setValue(parameters.mass, 1), 1, maxSpringParamValue);
    this.s = clamp(setValue(parameters.stiffness, 100), minValue, maxSpringParamValue);
    this.d = clamp(setValue(parameters.damping, 10), minValue, maxSpringParamValue);
    this.v = clamp(setValue(parameters.velocity, 0), -maxSpringParamValue, maxSpringParamValue);
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
    this.onComplete = parameters.onComplete || noop;
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
      t = exp(-t * zeta * w0) * (1 * cos(wd * t) + b * sin(wd * t));
    } else if (zeta === 1) {
      // Critically damped
      t = (1 + b * t) * exp(-t * w0);
    } else {
      // Overdamped
      // Using exponential instead of cosh and sinh functions to prevent Infinity
      // Original exp(-zeta * w0 * t) * (cosh(wd * t) + b * sinh(wd * t))
      t = ((1 + b) * exp((-zeta * w0 + wd) * t) + (1 - b) * exp((-zeta * w0 - wd) * t)) / 2;
    }
    return 1 - t;
  }

  calculateSDFromBD() {
    // Apple's SwiftUI perceived spring duration implementation https://developer.apple.com/videos/play/wwdc2023/10158/?time=1010
    // Equations taken from Kevin Grajeda's article https://www.kvin.me/posts/effortless-ui-spring-animations
    const pds = globals.timeScale === 1 ? this.pd / K : this.pd;
    // Mass and velocity should be set to their default values
    this.m = 1;
    this.v = 0;
    // Stiffness = (2π ÷ perceptualDuration)²
    this.s = pow((2 * PI) / pds, 2);
    if (this.bn >= 0) {
      // For bounce ≥ 0 (critically damped to underdamped)
      // damping = ((1 - bounce) × 4π) ÷ perceptualDuration
      this.d = ((1 - this.bn) * 4 * PI) / pds;
    } else {
      // For bounce < 0 (overdamped)
      // damping = 4π ÷ (perceptualDuration × (1 + bounce))
      // Note: (1 + bounce) is positive since bounce is negative
      this.d = (4 * PI) / (pds * (1 + this.bn));
    }
    this.s = round(clamp(this.s, minValue, maxSpringParamValue), 3);
    this.d = round(clamp(this.d, minValue, 300), 3); // Clamping to 300 is needed to prevent insane values in the solver
  }

  calculateBDFromSD() {
    // Calculate perceived duration and bounce from stiffness and damping
    // Note: We assumes m = 1 and v = 0 for these calculations
    const pds = (2 * PI) / sqrt(this.s);
    this.pd = pds * (globals.timeScale === 1 ? K : 1);
    const zeta = this.d / (2 * sqrt(this.s));
    if (zeta <= 1) {
      // Critically damped to underdamped
      this.bn = 1 - (this.d * pds) / (4 * PI);
    } else {
      // Overdamped
      this.bn = (4 * PI) / (this.d * pds) - 1;
    }
    this.bn = round(clamp(this.bn, -1, 1), 3);
    this.pd = round(clamp(this.pd, 10 * globals.timeScale, maxSpringParamValue * globals.timeScale), 3);
  }

  compute() {
    const { maxRestSteps, maxIterations, restThreshold, timeStep, m, d, s, v } = this;
    const w0 = this.w0 = clamp(sqrt(s / m), minValue, K);
    const bouncedZeta = this.zeta = d / (2 * sqrt(s * m));
    // Calculate wd based on damping type
    if (bouncedZeta < 1) {
      // Underdamped
      this.wd = w0 * sqrt(1 - bouncedZeta * bouncedZeta);
      this.b = (bouncedZeta * w0 + -v) / this.wd;
    } else if (bouncedZeta === 1) {
      // Critically damped
      this.wd = 0;
      this.b = -v + w0;
    } else {
      // Overdamped
      this.wd = w0 * sqrt(bouncedZeta * bouncedZeta - 1);
      this.b = (bouncedZeta * w0 + -v) / this.wd;
    }

    let solverTime = 0;
    let restSteps = 0;
    let iterations = 0;
    while (restSteps <= maxRestSteps && iterations <= maxIterations) {
      if (abs(1 - this.solve(solverTime)) < restThreshold) {
        restSteps++;
      } else {
        restSteps = 0;
      }
      this.solverDuration = solverTime;
      solverTime += timeStep;
      iterations++;
    }
    this.settlingDuration = round(this.solverDuration * K, 0) * globals.timeScale;
  }

  get bounce() {
    return this.bn;
  }

  set bounce(v) {
    this.bn = clamp(setValue(v, 1), -1, 1);
    this.calculateSDFromBD();
    this.compute();
  }

  get duration() {
    return this.pd;
  }

  set duration(v) {
    this.pd = clamp(setValue(v, 1), 10 * globals.timeScale, maxSpringParamValue * globals.timeScale);
    this.calculateSDFromBD();
    this.compute();
  }

  get stiffness() {
    return this.s;
  }

  set stiffness(v) {
    this.s = clamp(setValue(v, 100), minValue, maxSpringParamValue);
    this.calculateBDFromSD();
    this.compute();
  }

  get damping() {
    return this.d;
  }

  set damping(v) {
    this.d = clamp(setValue(v, 10), minValue, maxSpringParamValue);
    this.calculateBDFromSD();
    this.compute();
  }

  get mass() {
    return this.m;
  }

  set mass(v) {
    this.m = clamp(setValue(v, 1), 1, maxSpringParamValue);
    this.compute();
  }

  get velocity() {
    return this.v;
  }

  set velocity(v) {
    this.v = clamp(setValue(v, 0), -maxSpringParamValue, maxSpringParamValue);
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

export { Spring, createSpring, spring };

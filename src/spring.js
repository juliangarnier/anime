/// <reference path='./types.js' />

import {
  minValue,
  K,
} from './consts.js';

import {
  globals,
} from './globals.js';

import {
  round,
  clamp,
  sqrt,
  exp,
  cos,
  sin,
  abs,
} from './helpers.js';

import {
  setValue,
} from './values.js';

/*
 * Spring ease solver adapted from https://webkit.org/demos/spring/spring.js
 * Webkit Copyright © 2016 Apple Inc
 */

/**
 * @typedef {Object} SpringParams
 * @property {Number} [mass=1] - Mass, default 1
 * @property {Number} [stiffness=100] - Stiffness, default 100
 * @property {Number} [damping=10] - Damping, default 10
 * @property {Number} [velocity=0] - Initial velocity, default 0
 */

export class Spring {
  /**
   * @param {SpringParams} [parameters]
   */
  constructor(parameters = {}) {
    this.timeStep = .02; // Interval fed to the solver to calculate duration
    this.restThreshold = .0005; // Values below this threshold are considered resting position
    this.restDuration = 200; // Duration in ms used to check if the spring is resting after reaching restThreshold
    this.maxDuration = 60000; // The maximum allowed spring duration in ms (default 1 min)
    this.maxRestSteps = this.restDuration / this.timeStep / K; // How many steps allowed after reaching restThreshold before stopping the duration calculation
    this.maxIterations = this.maxDuration / this.timeStep / K; // Calculate the maximum iterations allowed based on maxDuration
    this.m = clamp(setValue(parameters.mass, 1), 0, K);
    this.s = clamp(setValue(parameters.stiffness, 100), 1, K * 10);
    this.d = clamp(setValue(parameters.damping, 10), .1, K);
    this.v = clamp(setValue(parameters.velocity, 0), -K * 10, K * 10);
    this.w0 = 0;
    this.zeta = 0;
    this.wd = 0;
    this.b = 0;
    this.solverDuration = 0;
    this.duration = 0;
    this.compute();
    /** @type {EasingFunction} */
    this.ease = t => t === 0 || t === 1 ? t : this.solve(t * this.solverDuration);
  }

  /** @type {EasingFunction} */
  solve(time) {
    const { zeta, w0, wd, b } = this;
    let t = time;
    if (zeta < 1) {
      t = exp(-t * zeta * w0) * (1 * cos(wd * t) + b * sin(wd * t));
    } else {
      t = (1 + b * t) * exp(-t * w0);
    }
    return 1 - t;
  }

  compute() {
    const { maxRestSteps, maxIterations, restThreshold, timeStep, m, d, s, v } = this;
    const w0 = this.w0 = clamp(sqrt(s / m), minValue, K);
    const zeta = this.zeta = d / (2 * sqrt(s * m));
    const wd = this.wd = zeta < 1 ? w0 * sqrt(1 - zeta * zeta) : 0;
    this.b = zeta < 1 ? (zeta * w0 + -v) / wd : -v + w0;
    let solverTime = 0;
    let restSteps = 0;
    let iterations = 0;
    while (restSteps < maxRestSteps && iterations < maxIterations) {
      if (abs(1 - this.solve(solverTime)) < restThreshold) {
        restSteps++;
      } else {
        restSteps = 0;
      }
      this.solverDuration = solverTime;
      solverTime += timeStep;
      iterations++;
    }
    this.duration = round(this.solverDuration * K, 0) * globals.timeScale;
  }

  get mass() {
    return this.m;
  }

  set mass(v) {
    this.m = clamp(setValue(v, 1), 0, K);
    this.compute();
  }

  get stiffness() {
    return this.s;
  }

  set stiffness(v) {
    this.s = clamp(setValue(v, 100), 1, K * 10);
    this.compute();
  }

  get damping() {
    return this.d;
  }

  set damping(v) {
    this.d = clamp(setValue(v, 10), .1, K);
    this.compute();
  }

  get velocity() {
    return this.v;
  }

  set velocity(v) {
    this.v = clamp(setValue(v, 0), -K * 10, K * 10);
    this.compute();
  }
}

/**
 * @param {SpringParams} [parameters]
 * @returns {Spring}
 */
export const createSpring = (parameters) => new Spring(parameters);

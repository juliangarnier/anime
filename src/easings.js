import {
  easingsExecRgx
} from './consts.js';

import {
  clamp,
  is,
  applyArguments
} from './helpers.js';

import { cache } from './cache.js';

// Easings

function parseEasingParameters(string) {
  const match = easingsExecRgx.exec(string);
  return match ? match[1].split(',').map(p => parseFloat(p)) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {
  const params = parseEasingParameters(string);
  const mass = clamp(is.und(params[0]) ? 1 : params[0], .1, 100);
  const stiffness = clamp(is.und(params[1]) ? 100 : params[1], .1, 100);
  const damping = clamp(is.und(params[2]) ? 10 : params[2], .1, 100);
  const velocity =  clamp(is.und(params[3]) ? 0 : params[3], .1, 100);

  const w0 = Math.sqrt(stiffness / mass);
  const zeta = damping / (2 * Math.sqrt(stiffness * mass));
  const wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  const a = 1;
  const b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    let progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) return t;
    return 1 - progress;
  }

  function getDuration() {
    const cached = cache.springs[string];
    if (cached) return cached;
    const frame = 1/6;
    let elapsed = 0;
    let rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) break;
      } else {
        rest = 0;
      }
    }
    const duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;
}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps = 10) {
  return t => Math.ceil((clamp(t, 0.000001, 1)) * steps) * (1 / steps);
}

// BezierEasing https://github.com/gre/bezier-easing

const bezier = (() => {
  const kSplineTableSize = 11;
  const kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 };
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 };
  function C(aA1)      { return 3.0 * aA1 };

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT };
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) };

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    let currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT } else { aA = currentT };
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) return aGuessT;
      const currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {
    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) return;
    let sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (let i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {
      let intervalStart = 0;
      let currentSample = 1;
      const lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      const dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      const guessForT = intervalStart + dist * kSampleStepSize;
      const initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }
    }

    return x => {
      if (mX1 === mY1 && mX2 === mY2) return x;
      if (x === 0 || x === 1) return x;
      return calcBezier(getTForX(x), mY1, mY2);
    }
  }

  return bezier;
})();

const penner = (() => {
  // Based on jQuery UI's implementation of easing equations from Robert Penner (http://www.robertpenner.com/easing)
  const eases = { linear: () => t => t };

  const functionEasings = {
    Sine: () => t => 1 - Math.cos(t * Math.PI / 2),
    Circ: () => t => 1 - Math.sqrt(1 - t * t),
    Back: () => t => t * t * (3 * t - 2),
    Bounce: () => t => {
      let pow2, b = 4;
      while (t < (( pow2 = Math.pow(2, --b)) - 1) / 11) {};
      return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow(( pow2 * 3 - 2 ) / 22 - t, 2)
    },
    Elastic: (amplitude = 1, period = .5) => {
      const a = clamp(amplitude, 1, 10);
      const p = clamp(period, .1, 2);
      return t => {
        return (t === 0 || t === 1) ? t : 
          -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
      }
    }
  }

  const baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];

  baseEasings.forEach((name, i) => {
    functionEasings[name] = () => t => Math.pow(t, i + 2);
  });

  Object.keys(functionEasings).forEach(name => {
    const easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;
    eases['easeOut' + name] = (a, b) => t => 1 - easeIn(a, b)(1 - t);
    eases['easeInOut' + name] = (a, b) => t => t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 1 - easeIn(a, b)(t * -2 + 2) / 2;
    eases['easeOutIn' + name] = (a, b) => t => t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : (easeIn(a, b)(t * 2 - 1) + 1) / 2;
  });

  return eases;
})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) return easing;
  const name = easing.split('(')[0];
  const ease = penner[name];
  const args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return applyArguments(ease, args);
  }
}

export {
  parseEasings,
  penner,
  spring
}

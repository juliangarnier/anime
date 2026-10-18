import '../node_modules/chai/chai.js';

import {
  addChild,
  removeChild,
  forEachChildren,
} from '../dist/modules/core/helpers.js';

export const { expect } = /** @type {any} */(globalThis).chai;

export const getChildAtIndex = (parent, index) => {
  let next = parent._head;
  let i = 0;
  while (next) {
    const currentNext = next._next;
    if (i === index) break;
    next = currentNext;
    i++;
  }
  return next;
}

export const getChildLength = (parent) => {
  let next = parent._head;
  let i = 0;
  while (next) {
    next = next._next;
    i++;
  }
  return i;
}

export const browserIs = {
  firefox: /firefox|fxios/i.test(navigator.userAgent) && !/seamonkey/i.test(navigator.userAgent),
}

// export const getTweenDelay = t => (t.parent._offset + t._startTime) - t._absoluteStartTime;

// export const getTweenDelay = t => {
//   return t._startTime + ((t._startTime - ((t._prev && t._prev.property === t.property) ? t._prev._startTime + t._prev._updateDuration : 0)) - t.parent._delay);
// }

export const getTweenDelay = t => t._delay;

export {
  addChild,
  removeChild,
  forEachChildren,
}

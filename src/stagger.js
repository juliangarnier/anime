import {
  parseEasings,
} from './easings.js';

import {
  unitsExecRgx,
} from './consts.js';

import {
  is,
} from './helpers.js';

export function stagger(val, params = {}) {
  const direction = params.direction || 'normal';
  const easing = params.easing ? parseEasings(params.easing) : null;
  const grid = params.grid;
  const axis = params.axis;
  let fromIndex = params.from || 0;
  const fromFirst = fromIndex === 'first';
  const fromCenter = fromIndex === 'center';
  const fromLast = fromIndex === 'last';
  const isRange = is.arr(val);
  const val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  const val2 = isRange ? parseFloat(val[1]) : 0;
  const unitMatch = unitsExecRgx.exec(isRange ? val[1] : val);
  const unit = unitMatch ? unitMatch[2] : 0;
  const start = params.start || 0 + (isRange ? val1 : 0);
  let values = [];
  let maxValue = 0;
  return (el, i, t) => {
    if (fromFirst) fromIndex = 0;
    if (fromCenter) fromIndex = (t - 1) / 2;
    if (fromLast) fromIndex = t - 1;
    if (!values.length) {
      for (let index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          const fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          const fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          const toX = index%grid[0];
          const toY = Math.floor(index/grid[0]);
          const distanceX = fromX - toX;
          const distanceY = fromY - toY;
          let value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') value = -distanceX;
          if (axis === 'y') value = -distanceY;
          values.push(value);
        }
        maxValue = Math.max(...values);
      }
      if (easing) values = values.map(val => easing(val / maxValue) * maxValue);
      if (direction === 'reverse') values = values.map(val => axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val));
    }
    const spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

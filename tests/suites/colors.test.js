import {
  expect,
  getChildAtIndex,
} from '../utils.js';

import {
  animate,
  utils,
} from '../../dist/modules/index.js';

import {
  valueTypes,
} from '../../dist/modules/core/consts.js';

const colors = {
  from: {
    rgb: {
      input: {
        HEX3: '#f99',
        HEX6: '#ff9999',
        RGB: 'rgb(255, 153, 153)',
        HSL: 'hsl(0, 100%, 80%)',
      },
      output: [255, 153, 153, 1]
    },
    rgba: {
      input: {
        HEX3A: '#f999',
        HEX6A: '#ff999999',
        RGBA: 'rgba(255, 153, 153, .6)',
        HSLA: 'hsla(0, 100%, 80%, .6)',
      },
      output: [255, 153, 153, .6]
    }
  },
  to: {
    rgb: {
      input: {
        HEX3: '#0FF',
        HEX6: '#00FFFF',
        RGB: 'rgb(0, 255, 255)',
        HSL: 'hsl(180, 100%, 50%)',
      },
      output: [0, 255, 255, 1]
    },
    rgba: {
      input: {
        HEX3A: '#0FFC',
        HEX6A: '#00FFFFCC',
        RGBA: 'rgba(0, 255, 255, .8)',
        HSLA: 'hsla(180, 100%, 50%, .8)',
      },
      output: [0, 255, 255, .8]
    }
  },
}

function createColorTest(testName, inFrom, inTo, outFrom, outTo, fromType, toType) {
  return test(testName, () => {
    const [ targetEl ] = utils.$('#target-id');
    const animation = animate(targetEl, { color: [inFrom, inTo], autoplay: false });
    expect(getChildAtIndex(animation, 0)._fromNumbers).to.deep.equal(outFrom);
    expect(getChildAtIndex(animation, 0)._valueType).to.deep.equal(valueTypes.COLOR);
    expect(getChildAtIndex(animation, 0)._toNumbers).to.deep.equal(outTo);
    if (fromType === 'rgba') {
      expect(targetEl.style.color).to.equal(`rgba(${outFrom[0]}, ${outFrom[1]}, ${outFrom[2]}, ${outFrom[3]})`);
    } else {
      expect(targetEl.style.color).to.equal(`rgb(${outFrom[0]}, ${outFrom[1]}, ${outFrom[2]})`);
    }
    animation.seek(animation.duration);
    if (toType === 'rgba') {
      expect(targetEl.style.color).to.equal(`rgba(${outTo[0]}, ${outTo[1]}, ${outTo[2]}, ${outTo[3]})`);
    } else {
      expect(targetEl.style.color).to.equal(`rgb(${outTo[0]}, ${outTo[1]}, ${outTo[2]})`);
    }
  });
}

function createColorTestsByType(fromType, toType) {
  for (let inputFromName in colors.from[fromType].input) {
    const inputFromValue = colors.from[fromType].input[inputFromName];
    const outputFromValue = colors.from[fromType].output;
    for (let inputToName in colors.to[toType].input) {
      const inputToValue = colors.to[toType].input[inputToName];
      const outputToValue = colors.to[toType].output;
      const testName = 'Convert ' + inputFromName + ' to ' + inputToName;
      createColorTest(testName, inputFromValue, inputToValue, outputFromValue, outputToValue, fromType, toType);
    }
  }
}

suite('Colors', () => {

  createColorTest('Convert achromatic HSL from black to white',
    'hsl(0, 0%, 0%)', 'hsl(240, 0%, 100%)',
    [0, 0, 0, 1], [255, 255, 255, 1], 'rgb', 'rgb');

  createColorTest('Convert achromatic HSL from gray to white',
    'hsl(120, 0%, 50%)', 'hsl(240, 0%, 100%)',
    [128, 128, 128, 1], [255, 255, 255, 1], 'rgb', 'rgb');

  createColorTest('Convert achromatic HSLA with transparency',
    'hsla(60, 0%, 25%, .4)', 'hsla(180, 0%, 75%, .8)',
    [64, 64, 64, .4], [191, 191, 191, .8], 'rgba', 'rgba');

  test('Properly apply transparency from computed styles', resolve => {
    const [ targetEl ] = utils.$('#target-id');
    animate(targetEl, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 10,
      onComplete: () => {
        expect(targetEl.style.backgroundColor).to.equal('rgba(0, 0, 0, 0)');
        resolve();
      }
    });
  });

  createColorTestsByType('rgb', 'rgb');
  createColorTestsByType('rgb', 'rgba');
  createColorTestsByType('rgba', 'rgb');
  createColorTestsByType('rgba', 'rgba');
});

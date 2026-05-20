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

const domColorInputs = {
  rgb: {
    HEX: { input: '#FF4B4B', output: [255, 75, 75, 1] },
    RGB: { input: 'rgb(255, 168, 40)', output: [255, 168, 40, 1] },
    HSL: { input: 'hsl(44, 100%, 59%)', output: [255, 199, 46, 1] },
  },
  rgba: {
    HEXA: { input: '#FF4B4B33', output: [255, 75, 75, .2] },
    RGBA: { input: 'rgba(255, 168, 40, .2)', output: [255, 168, 40, .2] },
    HSLA: { input: 'hsla(44, 100%, 59%, .2)', output: [255, 199, 46, .2] },
  },
};

const domColorProperties = ['background', 'color', 'backgroundColor', 'borderColor'];

function createColorConversionFromDOMTest(property, colorType, colorName) {
  const { input, output } = domColorInputs[colorType][colorName];
  const testName = `Animate ${property} to ${colorName}`;
  return test(testName, () => {
    const [ targetEl ] = utils.$('#target-id');
    const animation = animate(targetEl, { [property]: input, autoplay: false });
    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.COLOR);
    expect(getChildAtIndex(animation, 0)._toNumbers).to.deep.equal(output);
    animation.seek(animation.duration);
    if (colorType === 'rgba') {
      expect(targetEl.style[property]).to.equal(`rgba(${output[0]}, ${output[1]}, ${output[2]}, ${output[3]})`);
    } else {
      expect(targetEl.style[property]).to.equal(`rgb(${output[0]}, ${output[1]}, ${output[2]})`);
    }
  });
}

function createColorConversionFromDOMTests() {
  domColorProperties.forEach(property => {
    for (let colorType in domColorInputs) {
      for (let colorName in domColorInputs[colorType]) {
        createColorConversionFromDOMTest(property, colorType, colorName);
      }
    }
  });
}

suite('Colors', () => {
  test('boxShadow should not be parsed as color value', () => {
    const [ targetEl ] = utils.$('#target-id');
    targetEl.style.boxShadow = `0px 0px 6px red`;
    const computedShadowA = getComputedStyle(targetEl).boxShadow;
    targetEl.style.boxShadow = `inset 0px 0px 20px yellow`;
    const computedShadowB = getComputedStyle(targetEl).boxShadow;
    // computedShadowA: 'rgb(255, 0, 0) 0px 0px 6px 0px'; computedShadowB: 'rgb(255, 255, 0) 0px 0px 20px 0px inset';
    const animation = animate(targetEl, { boxShadow: [computedShadowA, computedShadowB], autoplay: false });
    expect(getChildAtIndex(animation, 0)._valueType).to.equal(valueTypes.COMPLEX); // Fails and return valueTypes.COLOR
  });
  createColorConversionFromDOMTests();
  createColorTestsByType('rgb', 'rgb');
  createColorTestsByType('rgb', 'rgba');
  createColorTestsByType('rgba', 'rgb');
  createColorTestsByType('rgba', 'rgba');
});

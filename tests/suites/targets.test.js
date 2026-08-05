import {
  expect,
  getChildLength,
} from '../utils.js';

import {
  testObject,
  anOtherTestObject,
} from '../setup.js';

import {
  animate,
} from '../../dist/modules/index.js';

suite('Targets', () => {
  test('Single element from CSS selector', () => {
    const animation = animate('#target-id', {
      x: 100,
      duration: 100
    });

    const targetEl = document.querySelector('#target-id');
    expect(getChildLength(animation)).to.equal(1);
    expect(animation.targets.includes(targetEl)).to.equal(true);
    expect(animation.targets.length).to.equal(1);
  });

  test('Multiple elements from CSS selector', () => {
    const animation = animate('.target-class', {
      x: 100,
      duration: 100
    });

    const targetEls = document.querySelectorAll('.target-class');
    expect(getChildLength(animation)).to.equal(4);
    let i = 0;
    animation.targets.forEach( el => {
      expect(targetEls[i++]).to.equal(el);
    });
  });

  test('Single element from domNode', () => {
    const targetEl = document.querySelector('#target-id');
    const animation = animate(targetEl, {
      x: 100,
      duration: 100
    });

    expect(getChildLength(animation)).to.equal(1);
    expect(animation.targets.includes(targetEl)).to.equal(true);
    expect(animation.targets.length).to.equal(1);
  });

  test('Multiple elements from nodeList', () => {
    const targetEls = document.querySelectorAll('.target-class');
    const animation = animate(targetEls, {
      x: 100,
      duration: 100
    });

    expect(getChildLength(animation)).to.equal(4);
    let i = 0;
    animation.targets.forEach( el => {
      expect(targetEls[i++]).to.equal(el);
    });
  });

  test('Single object from JS Object', () => {
    const animation = animate(testObject, {
      plainValue: 200,
      duration: 100
    });

    expect(getChildLength(animation)).to.equal(1);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.length).to.equal(1);
  });

  test('Multiple elements from an Array of mixed CSS selectors', () => {
    const animation = animate(['#target-id', '.target-class', 'div[data-index="0"]'], {
      x: 100,
      duration: 100
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(getChildLength(animation)).to.equal(4);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.includes(targetDataEl)).to.equal(true);
    let i = 0;
    animation.targets.forEach( el => {
      expect(targetClassEls[i++]).to.equal(el);
    });
  });

  test('Multiple elements and object from an Array of mixed target types', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const animation = animate([testObject, '#target-id', targetClassEls, 'div[data-index="0"]'], {
      x: 100,
      duration: 100
    });

    const targetIdEl = document.querySelector('#target-id');
    const targetDataEl = document.querySelector('div[data-index="0"]');
    expect(getChildLength(animation)).to.equal(5);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.includes(targetDataEl)).to.equal(true);
    expect(animation.targets.length).to.equal(5);
  });

  test('Multiple elements in nested arrays', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetIdEl = document.querySelector('#target-id');
    const animation = animate([targetClassEls, targetIdEl, [testObject, anOtherTestObject]], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(6);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(anOtherTestObject)).to.equal(true);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.length).to.equal(6);
  });

  test('Multiple elements in arrays with null or undefined values', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetIdEl = document.querySelector('#target-id');
    const animation = animate([testObject, anOtherTestObject, null, undefined], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(2);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(anOtherTestObject)).to.equal(true);
    expect(animation.targets.length).to.equal(2);
  });

  test('Multiple elements in nested arrays with null or undefined values', () => {
    const targetClassEls = document.querySelectorAll('.target-class');
    const targetIdEl = document.querySelector('#target-id');
    const animation = animate([targetClassEls, targetIdEl, [testObject, anOtherTestObject, null, undefined], null, undefined], {
      x: 100,
      duration: 100
    });
    expect(getChildLength(animation)).to.equal(6);
    expect(animation.targets.includes(testObject)).to.equal(true);
    expect(animation.targets.includes(anOtherTestObject)).to.equal(true);
    expect(animation.targets.includes(targetIdEl)).to.equal(true);
    expect(animation.targets.length).to.equal(6);
  });

  test('Dedupes duplicated targets in large arrays', () => {
    const objects = [];
    for (let i = 0; i < 200; i++) objects.push({ x: 0 });
    const animation = animate([objects, objects], {
      x: 100,
      duration: 100
    });
    expect(animation.targets.length).to.equal(200);
    expect(getChildLength(animation)).to.equal(200);
  });

  test('Properly handle animations without targets', () => {
    const animation = animate(undefined, { duration: 10 });
    expect(animation.targets).to.deep.equal([]);
  });
});

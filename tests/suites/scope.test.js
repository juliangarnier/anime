import {
  expect,
} from '../utils.js';

import {
  animate,
  createScope,
  createTimer,
} from '../../dist/modules/index.js';

suite('Scope', () => {

  test('Default to global root with no params', () => {
    const $root = document;
    const scope = createScope();
    expect(scope.root).to.equal($root);
  });

  test('Default to global root with non existing selector', () => {
    const $root = document;
    const scope = createScope({ root: '#i-dont-exit' });
    expect(scope.root).to.equal($root);
  });

  test('Default to global root with undefined selector', () => {
    const $root = document;
    const scope = createScope({ root: undefined });
    expect(scope.root).to.equal($root);
  });

  test('DOM root', () => {
    const $root = document.querySelector('#stagger-tests');
    const scope = createScope({ root: '#stagger-tests' });
    expect(scope.root).to.equal($root);
  });

  test('React ref root', () => {
    const $root = /** @type {HTMLElement} */(document.querySelector('#stagger-tests'));
    const ref = { current: $root };
    const scope = createScope({ root: ref });
    expect(scope.root).to.equal($root);
  });

  test('Angular ref root', () => {
    const $root = /** @type {HTMLElement} */(document.querySelector('#stagger-tests'));
    const ref = { nativeElement: $root };
    const scope = createScope({ root: ref });
    expect(scope.root).to.equal($root);
  });

  test('Keeps later timers out of a scope whose callback threw', () => {
    const scope = createScope();
    expect(() => scope.add(() => { throw new Error('Scope callback error') })).to.throw('Scope callback error');
    const timer = createTimer({ duration: 1000, autoplay: false }).seek(500);
    scope.revert();
    expect(timer.currentTime).to.equal(500);
  });

  test('Restores the global defaults when a scope callback threw', () => {
    const before = animate('#square', { x: 10, autoplay: false });
    const scope = createScope({ defaults: { duration: 123 } });
    expect(() => scope.add(() => { throw new Error('Scope callback error') })).to.throw('Scope callback error');
    const after = animate('#square', { x: 10, autoplay: false });
    scope.revert();
    expect(after.duration).to.equal(before.duration);
    before.revert();
    after.revert();
  });

});

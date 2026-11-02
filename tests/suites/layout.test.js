import {
  expect,
} from '../utils.js';

import {
  createLayout,
  globals,
  utils,
} from '../../dist/modules/index.js';

/** @import { LayoutAnimationParams } from '../../dist/modules/layout/layout.js' */
/** @import { Timeline } from '../../dist/modules/timeline/timeline.js' */

suite('Layouts', () => {
  let $fixture;
  let previousMuted;
  const layouts = [];

  setup(() => {
    previousMuted = globals.defaults.muted;
  });

  function mount(markup) {
    $fixture = document.createElement('div');
    $fixture.innerHTML = markup;
    document.body.appendChild($fixture);
    return /** @type {HTMLElement} */($fixture.firstElementChild);
  }

  function createTestLayout(root, params) {
    const layout = createLayout(root, params);
    layouts.push(layout);
    return layout;
  }

  teardown(() => {
    while (layouts.length) layouts.pop().revert();
    if ($fixture) $fixture.remove();
    $fixture = null;
    globals.defaults.muted = previousMuted;
  });

  for (const level of ['definition', 'transition']) test(`Ignores unsupported muting on the layout ${level}`, () => {
    const $root = mount('<div style="width:100px;height:100px"></div>');
    // Pass an unsupported option to check JavaScript callers.
    const unsupported = { muted: true };
    const layout = createTestLayout($root, level === 'definition' ? unsupported : {});
    const transition = layout.update(() => { $root.style.width = '200px'; }, {
      ...(level === 'transition' ? unsupported : {}), autoplay: false, ease: 'linear', duration: 100,
    });
    transition.seek(50, true);
    expect(parseFloat($root.style.width)).to.equal(150);
    expect(globals.defaults.muted).to.equal(previousMuted);
  });

  test('Renders layout transitions when global defaults mute animations', () => {
    globals.defaults.muted = true;
    const $root = mount('<div style="display:flex;width:100px;height:100px"><div class="item" style="width:40px;height:40px"></div><div class="item" style="width:40px;height:40px"></div></div>');
    const [$first, $second] = /** @type {HTMLElement[]} */(Array.from($root.querySelectorAll('.item')));
    const layout = createTestLayout($root, { children: ['.item'], ease: 'linear' });
    const startX = $second.getBoundingClientRect().x;
    const transition = layout.update(() => { $root.style.width = '200px'; $root.appendChild($first); }, { autoplay: false, duration: 100 });
    transition.seek(50, true);
    expect(parseFloat($root.style.width)).to.equal(150);
    const midX = $second.getBoundingClientRect().x;
    transition.complete();
    const endX = $second.getBoundingClientRect().x;
    expect((midX - startX) * (midX - endX)).to.be.below(0);
  });

  test('Preserves layout endpoints after editing the duration', () => {
    const $root = mount('<div style="width:100px;height:100px"><div class="item" style="width:40px;height:40px;transform:rotate(0deg)"></div></div>');
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const layout = createTestLayout($root, { children: ['.item'], ease: 'linear' });
    const editor = globals.editor;
    /** @type {(params: LayoutAnimationParams) => Timeline} */
    let rebuild = () => { throw new Error('the editor hook did not run'); };
    globals.editor = { ...editor, addLayoutTransition: (_, params, method, build) => {
      rebuild = build;
      return build(params);
    } };
    try {
      const transition = layout.update(() => {
        $root.style.width = '200px';
        $item.style.width = '80px';
        $item.style.transform = 'rotate(90deg)';
      }, { id: 'duration edit', autoplay: false, duration: 100 });
      transition.seek(50, true);
      expect(parseFloat($root.style.width)).to.equal(150);
      const effects = $item.getAnimations().length;
      expect(effects).to.be.above(0);
      const rebuilt = rebuild({ id: 'duration edit', autoplay: false, duration: 200 });
      transition.cancel();
      expect($item.getAnimations().length).to.equal(effects);
      rebuilt.seek(100, true);
      expect(parseFloat($root.style.width)).to.equal(150);
      expect(parseFloat($item.style.width)).to.equal(60);
      const matrix = new DOMMatrix(getComputedStyle($item).transform);
      expect(Math.atan2(matrix.b, matrix.a) * 180 / Math.PI).to.be.closeTo(45, .01);
      rebuilt.complete();
      expect($root.style.width).to.equal('200px');
      expect($item.style.width).to.equal('80px');
      expect($root.classList.contains('is-animated')).to.equal(false);
      expect($item.getAnimations().length).to.equal(0);
    } finally {
      globals.editor = editor;
    }
  });

  test('Layout callbacks receive the transition with the correct this value', () => {
    const $root = mount('<div style="width:100px;height:100px"></div>');
    const layout = createTestLayout($root, { ease: 'linear' });
    const calls = [];
    const transition = layout.update(() => { $root.style.width = '200px'; }, {
      autoplay: false,
      duration: 100,
      onUpdate(self) { calls.push(['update', this, self]); },
      onComplete(self) { calls.push(['complete', this, self]); },
      onPause(self) { calls.push(['pause', this, self]); },
    });
    calls.length = 0;
    transition.seek(50);
    expect(calls).to.deep.equal([['update', transition, transition]]);
    calls.length = 0;
    transition.resume().pause();
    expect(calls).to.deep.equal([['complete', undefined, transition], ['pause', undefined, transition]]);
  });

  test('Skips callbacks for unchanged editor layouts', () => {
    const $root = mount('<div style="width:100px;height:100px"></div>');
    const layout = createTestLayout($root, { ease: 'linear' });
    const calls = [];
    const previousEditor = globals.editor;
    // A transition built through the editor hook forwards onPause on its own branch, the native branch gates it on is-animated.
    globals.editor = { ...previousEditor, addLayoutTransition: (layout, params, method, build) => build(params) };
    try {
      layout.record();
      const transition = layout.animate({
        id: 'no-change',
        autoplay: true,
        duration: 100,
        onPause: () => calls.push('pause'),
        onComplete: () => calls.push('complete'),
      });
      expect(calls).to.deep.equal([]);
      expect(transition.paused).to.equal(true);
      expect($root.classList.contains('is-animated')).to.equal(false);
    } finally {
      globals.editor = previousEditor;
    }
  });

  test('Restores stylesheet transforms after interrupting a transition', () => {
    const $root = mount(`
      <div style="width:100px;height:100px">
        <style>.spin { transform: rotate(45deg); } .open .spin { transform: rotate(0deg); }</style>
        <div class="item spin" style="width:40px;height:40px"></div>
      </div>
    `);
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const layout = createTestLayout($root, { children: ['.item'], ease: 'linear' });
    const opening = layout.update(() => $root.classList.add('open'), { autoplay: false, duration: 100 });
    opening.seek(50);
    // record() commits the running transform animation into the inline style before measuring,
    // the committed frame must not survive into the next state.
    const closing = layout.update(() => $root.classList.remove('open'), { autoplay: false, duration: 100 });
    closing.complete();
    expect(getComputedStyle($item).transform).to.equal('matrix(0.707107, 0.707107, -0.707107, 0.707107, 0, 0)');
  });

  test('Keeps unitless transforms after a transition with units', () => {
    const $root = mount('<div style="width:200px;height:200px"><div class="item" style="width:40px;height:40px"></div></div>');
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const layout = createTestLayout($root, { children: ['.item'], ease: 'linear' });
    // The global-mute suite variant would silence utils.set itself, the unit behavior is the subject here.
    layout.update(() => utils.set($item, { y: '10vh', muted: false }), { autoplay: false, duration: 100 }).complete();
    layout.update(() => utils.set($item, { y: 30, muted: false }), { autoplay: false, duration: 100 }).complete();
    expect(getComputedStyle($item).transform).to.equal('matrix(1, 0, 0, 1, 0, 30)');
  });

  test('Layout update should animate nested geometry and restore authored styles', () => {
    const $root = mount(`
      <div style="position:relative;width:100px;height:100px">
        <div class="item" style="width:40px;height:40px"><span>Item</span></div>
      </div>
    `);
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const layout = createTestLayout($root, { children: ['.item', '.item > span'], ease: 'linear' });
    let updates = 0;
    let completes = 0;
    const transition = layout.update(() => {
      updates++;
      $root.style.width = '200px';
      $item.style.width = '80px';
    }, {
      autoplay: false,
      duration: 100,
      onComplete: () => { completes++; },
    });

    transition.seek(50, true);
    expect(updates).to.equal(1);
    expect(parseFloat($root.style.width)).to.equal(150);
    expect(parseFloat($item.style.width)).to.equal(60);
    transition.complete();
    expect(completes).to.equal(1);
    expect($root.classList.contains('is-animated')).to.equal(false);
    expect($root.style.width).to.equal('200px');
    expect($item.style.width).to.equal('80px');
    expect($root.style.minWidth).to.equal('');
    expect($item.style.position).to.equal('');
  });

  test('Layout update should animate display and visibility changes in both directions', () => {
    const $root = mount(`
      <div style="position:relative;width:100px;height:100px">
        <div class="item" style="display:block;width:50px;height:50px"><span>Item</span></div>
      </div>
    `);
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const layout = createTestLayout($root, {
      children: ['.item', '.item > span'],
      ease: 'linear',
      enterFrom: { opacity: 0 },
      leaveTo: { opacity: 0 },
    });

    const leave = layout.update(() => { $item.style.display = 'none'; }, { autoplay: false, duration: 100 });
    leave.seek(50, true);
    expect($item.style.display).to.equal('block');
    expect(parseFloat($item.style.opacity)).to.equal(.5);
    leave.complete();
    expect($item.style.display).to.equal('none');
    expect($item.style.opacity).to.equal('');

    const enter = layout.update(() => { $item.style.display = 'block'; }, { autoplay: false, duration: 100 });
    enter.seek(50, true);
    expect(parseFloat($item.style.opacity)).to.equal(.5);
    enter.complete();
    expect($item.style.display).to.equal('block');
    expect($item.style.opacity).to.equal('');

    const hide = layout.update(() => { $item.style.visibility = 'hidden'; }, { autoplay: false, duration: 100 });
    hide.seek(50, true);
    expect($item.style.visibility).to.equal('visible');
    expect(parseFloat($item.style.opacity)).to.equal(.5);
    hide.complete();
    expect($item.style.visibility).to.equal('hidden');

    const show = layout.update(() => { $item.style.visibility = 'visible'; }, { autoplay: false, duration: 100 });
    show.seek(50, true);
    expect(parseFloat($item.style.opacity)).to.equal(.5);
    show.complete();
    expect($item.style.visibility).to.equal('visible');
  });

  test('Layout update should animate an element reparented inside the root', () => {
    const $root = mount(`
      <div style="position:relative;width:400px;height:100px">
        <div class="column-a" style="position:absolute;left:0;width:100px;height:100px">
          <div class="item" style="width:50px;height:50px"></div>
        </div>
        <div class="column-b" style="position:absolute;left:200px;width:100px;height:100px"></div>
      </div>
    `);
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const $destination = /** @type {HTMLElement} */($root.querySelector('.column-b'));
    const layout = createTestLayout($root, { children: ['.column-a', '.column-b', '.item'], ease: 'linear' });
    const transition = layout.update(() => { $destination.appendChild($item); }, { autoplay: false, duration: 100 });

    transition.seek(50, true);
    expect($item.parentElement).to.equal($destination);
    expect(parseFloat($item.style.translate)).to.equal(-100);
    transition.complete();
    expect($item.parentElement).to.equal($destination);
    expect($item.style.position).to.equal('');
    expect($item.style.translate).to.equal('');
  });

  test('Layout update should animate a replacement that keeps the recorded layout ids', () => {
    const $root = mount(`
      <div style="position:relative;width:400px;height:100px">
        <div class="slot-a" style="position:absolute;left:0;width:100px;height:100px">
          <div class="card" style="width:50px;height:50px"><span>Card</span></div>
        </div>
        <div class="slot-b" style="position:absolute;left:200px;width:100px;height:100px"></div>
      </div>
    `);
    const $card = /** @type {HTMLElement} */($root.querySelector('.card'));
    const $destination = /** @type {HTMLElement} */($root.querySelector('.slot-b'));
    const layout = createTestLayout($root, { children: ['.slot-a', '.slot-b', '.card', '.card > span'], ease: 'linear' });
    const $clone = /** @type {HTMLElement} */($card.cloneNode(true));
    const transition = layout.update(() => {
      $destination.appendChild($clone);
      $card.remove();
    }, { autoplay: false, duration: 100 });

    transition.seek(50, true);
    expect($clone.parentElement).to.equal($destination);
    expect(parseFloat($clone.style.translate)).to.equal(-100);
    transition.complete();
    expect($clone.style.position).to.equal('');
    expect($clone.style.translate).to.equal('');
  });

  test('Layout update should preserve authored transforms after playback', () => {
    const $fixtureRoot = mount(`
      <div style="transform:scale(.9)">
        <div class="layout-root" style="position:relative;width:200px;height:100px">
          <div class="item" style="width:50px;height:50px;transform:rotate(10deg)"></div>
        </div>
      </div>
    `);
    const $root = /** @type {HTMLElement} */($fixtureRoot.querySelector('.layout-root'));
    const $item = /** @type {HTMLElement} */($root.querySelector('.item'));
    const layout = createTestLayout($root, { children: '.item', ease: 'linear' });
    const transition = layout.update(() => {
      $root.style.width = '300px';
      $item.style.transform = 'rotate(30deg)';
    }, { autoplay: false, duration: 100 });

    transition.seek(50, true);
    expect(getComputedStyle($item).transform).to.not.equal('none');
    transition.complete();
    expect($fixtureRoot.style.transform).to.equal('scale(0.9)');
    const matrix = new DOMMatrix(getComputedStyle($item).transform);
    expect(Math.atan2(matrix.b, matrix.a) * 180 / Math.PI).to.be.closeTo(30, .01);
  });

  test('Layout update should capture the rendered state when interrupting a transition', () => {
    const $root = mount('<div style="position:relative;width:100px;height:100px"></div>');
    const layout = createTestLayout($root, { ease: 'linear' });
    const first = layout.update(() => { $root.style.width = '200px'; }, { autoplay: false, duration: 100 });
    first.seek(50, true);

    const second = layout.update(() => { $root.style.width = '300px'; }, { autoplay: false, duration: 100 });
    second.seek(50, true);
    expect(parseFloat($root.style.width)).to.equal(225);
    second.complete();
    expect($root.style.width).to.equal('300px');
  });

  test('Layout record and animate should swap non-target children at the timing midpoint', () => {
    const $root = mount(`
      <div style="position:relative;width:200px;height:100px">
        <div class="card" style="width:100px;height:100px">
          <div class="content" style="width:80px;height:20px"></div>
        </div>
      </div>
    `);
    const $card = /** @type {HTMLElement} */($root.querySelector('.card'));
    const $content = /** @type {HTMLElement} */($root.querySelector('.content'));
    const layout = createTestLayout($root, { children: '.card', ease: 'linear', swapAt: { opacity: 0, ease: 'linear' } });

    layout.record();
    $card.style.width = '160px';
    $content.style.width = '120px';
    const transition = layout.animate({ autoplay: false, duration: 100 });

    transition.seek(25);
    expect(parseFloat($card.style.width)).to.equal(115);
    expect(parseFloat($content.style.width)).to.equal(80);
    expect(parseFloat($content.style.opacity)).to.equal(.5);
    transition.seek(75);
    expect(parseFloat($content.style.width)).to.equal(120);
    expect(parseFloat($content.style.opacity)).to.equal(.5);
    transition.complete();
    expect($card.style.width).to.equal('160px');
    expect($content.style.width).to.equal('120px');
    expect($content.style.opacity).to.equal('');
    expect($content.style.translate).to.equal('');
  });
});

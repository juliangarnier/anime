import {
  expect,
} from '../utils.js';

import {
  onScroll,
  scrollContainers,
  animate,
  createTimeline,
  utils
} from '../../dist/modules/index.js';

suite('Scroll', () => {
  test('ScrollObserver with custom id', () => {
    const observer = onScroll({
      target: '#target-id',
      id: 'my-scroll-observer',
    });
    expect(observer.id).to.equal('my-scroll-observer');
    observer.revert();
  });

  test('ScrollObserver horizontal axis', resolve => {
    const observer = onScroll({
      target: '#target-id',
      axis: 'x',
    });
    utils.sync(() => {
      expect(observer.horizontal).to.equal(true);
      observer.revert();
      resolve();
    });
  });

  test('ScrollObserver with sync mode', () => {
    const observer = onScroll({
      target: '#target-id',
      sync: true,
    });
    expect(observer.sync).to.equal(true);
    expect(observer.syncSmooth).to.equal(1);
    observer.revert();
  });

  test('ScrollObserver with sync smooth value', () => {
    const observer = onScroll({
      target: '#target-id',
      sync: 0.5,
    });
    expect(observer.sync).to.equal(true);
    expect(observer.syncSmooth).to.equal(0.5);
    observer.revert();
  });

  test('ScrollObserver with sync linear', () => {
    const observer = onScroll({
      target: '#target-id',
      sync: 'linear',
    });
    expect(observer.sync).to.equal(true);
    expect(observer.syncSmooth).to.equal(1);
    observer.revert();
  });

  test('ScrollObserver callbacks are assigned', () => {
    let enterCalled = false;
    let leaveCalled = false;
    let updateCalled = false;
    let resizeCalled = false;
    const observer = onScroll({
      target: '#target-id',
      onEnter: () => { enterCalled = true; },
      onLeave: () => { leaveCalled = true; },
      onUpdate: () => { updateCalled = true; },
      onResize: () => { resizeCalled = true; },
    });
    expect(typeof observer.onEnter).to.equal('function');
    expect(typeof observer.onLeave).to.equal('function');
    expect(typeof observer.onUpdate).to.equal('function');
    expect(typeof observer.onResize).to.equal('function');
    observer.revert();
  });

  test('ScrollObserver link() method', () => {
    const animation = animate('#target-id', {
      x: 100,
      autoplay: false,
    });
    const observer = onScroll({
      target: '#target-id',
    }).link(animation);
    expect(observer.linked).to.equal(animation);
    expect(animation.paused).to.equal(true);
    observer.revert();
    animation.revert();
  });

  test('ScrollObserver linked via autoplay', () => {
    const observer = onScroll({
      target: '#target-id',
    });
    const animation = animate('#target-id', {
      x: 100,
      autoplay: observer,
    });
    expect(observer.linked).to.equal(animation);
    observer.revert();
    animation.revert();
  });

  test('ScrollObserver linked timeline via autoplay', () => {
    const observer = onScroll({
      target: '#target-id',
    });
    const tl = createTimeline({
      autoplay: observer,
    })
    .add('#target-id', { x: 100 })
    .add('#target-id', { y: 100 });
    expect(observer.linked).to.equal(tl);
    observer.revert();
    tl.revert();
  });

  test('ScrollObserver repeat false should revert after completion', resolve => {
    const observer = onScroll({
      target: '#target-id',
      repeat: false,
    });
    utils.sync(() => {
      expect(observer.repeat).to.equal(false);
      observer.revert();
      resolve();
    });
  });

  test('ScrollObserver refresh() updates bounds', resolve => {
    const observer = onScroll({
      target: '#target-id',
    });
    utils.sync(() => {
      observer.refresh();
      expect(observer.offset).to.be.a('number');
      expect(observer.offsetStart).to.be.a('number');
      expect(observer.offsetEnd).to.be.a('number');
      expect(observer.distance).to.be.a('number');
      observer.revert();
      resolve();
    });
  });

  test('ScrollObserver onResize callback is triggered on container refresh', resolve => {
    let resizeCount = 0;
    const observer = onScroll({
      target: '#target-id',
      onResize: () => { resizeCount++; },
    });
    utils.sync(() => {
      expect(resizeCount).to.equal(0);
      observer.container.refreshScrollObservers();
      expect(resizeCount).to.equal(1);
      observer.container.refreshScrollObservers();
      expect(resizeCount).to.equal(2);
      observer.revert();
      resolve();
    });
  });

  test('Reverting an animation with onScroll should also revert the ScrollObserver', () => {
    const [ $container ] = utils.$('#css-tests');
    const animation = animate('#target-id', {
      rotate: 360,
      autoplay: onScroll({
        container: '#css-tests',
      })
    });
    expect(scrollContainers.get($container)).to.not.equal(undefined);
    $container.remove();
    $container.style.width = '100px';
    animation.revert();
    expect(scrollContainers.get($container)).to.equal(undefined);
  });
});

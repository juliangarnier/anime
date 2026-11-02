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
  /** @param {import('../../dist/modules/events/scroll.js').ScrollObserver} observer */
  const debugElements = observer => {
    const root = observer.$debug;
    const markers = Array.from(root.children).flatMap(layer => Array.from(layer.children));
    return {
      root,
      markers: markers.map(marker => /** @type {HTMLElement} */(marker)),
      lines: markers.map(marker => /** @type {HTMLElement} */(marker.firstElementChild)),
      labels: markers.map(marker => /** @type {HTMLElement} */(marker.lastElementChild)),
    };
  };

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

  test('ScrollObserver debug uses full-span compact markers', resolve => {
    const observer = onScroll({
      target: '#target-id',
      debug: true,
    });
    utils.sync(() => {
      try {
        const { root: $debug, markers: $markers, lines: $lines, labels: $labels } = debugElements(observer);
        expect($markers).to.have.length(4);
        expect($markers.map($marker => $marker.children.length)).to.deep.equal([2, 2, 2, 2]);
        expect($lines.map($line => $line.style.width)).to.deep.equal(['100%', '100%', '100%', '100%']);
        expect($lines.map($line => $line.style.height)).to.deep.equal(['1px', '1px', '1px', '1px']);
        expect($lines.map($line => $line.style.backgroundImage.includes('repeating-linear-gradient')))
          .to.deep.equal([true, true, true, true]);
        expect($lines.map($line => $line.style.backgroundPositionX)).to.deep.equal(['0px', '0px', '2px', '2px']);
        expect($labels.map($label => $label.textContent)).to.deep.equal([
          'container: end', 'container: start', 'target: start', 'target: end'
        ]);
        expect($labels.slice(0, 2).map($label => $label.style.left)).to.deep.equal(['0px', '0px']);
        expect($labels.slice(2).map($label => $label.style.right)).to.deep.equal(['0px', '0px']);
        expect($labels.every($label => ['0px', '1px'].includes($label.style.top || $label.style.bottom))).to.equal(true);
        expect($labels.map($label => $label.style.borderRadius)).to.deep.equal(['2px', '2px', '2px', '2px']);
        expect($lines[0].getBoundingClientRect().bottom)
          .to.be.at.most($markers[0].parentElement.getBoundingClientRect().bottom);
        $markers.forEach(($marker, i) => {
          const lineRect = $lines[i].getBoundingClientRect();
          const labelRect = $labels[i].getBoundingClientRect();
          expect(Math.abs(($labels[i].style.bottom ? labelRect.bottom : labelRect.top) - lineRect.top)).to.be.below(.01);
        });
        expect(/** @type {HTMLElement} */($debug.children[1]).style.position).to.equal('absolute');
        expect($debug.style.filter).to.equal('');
      } finally {
        observer.revert();
        resolve();
      }
    });
  });

  test('ScrollObserver horizontal debug uses full-height markers', resolve => {
    const observer = onScroll({
      target: '#target-id',
      axis: 'x',
      debug: true,
    });
    utils.sync(() => {
      try {
        const { markers: $markers, lines: $lines, labels: $labels } = debugElements(observer);
        expect($lines.map($line => $line.style.width)).to.deep.equal(['1px', '1px', '1px', '1px']);
        expect($lines.map($line => $line.style.height)).to.deep.equal(['100%', '100%', '100%', '100%']);
        expect($lines.map($line => $line.style.backgroundImage.includes('repeating-linear-gradient')))
          .to.deep.equal([true, true, true, true]);
        expect($lines.map($line => $line.style.backgroundPositionY)).to.deep.equal(['0px', '0px', '2px', '2px']);
        expect($labels.slice(0, 2).map($label => $label.style.top)).to.deep.equal(['0px', '0px']);
        expect($labels.slice(2).map($label => $label.style.bottom)).to.deep.equal(['0px', '0px']);
        expect($labels.every($label => ['0px', '1px'].includes($label.style.left || $label.style.right))).to.equal(true);
        expect($lines[0].getBoundingClientRect().right)
          .to.be.at.most($markers[0].parentElement.getBoundingClientRect().right);
        expect($lines[1].getBoundingClientRect().left)
          .to.be.above($markers[1].parentElement.getBoundingClientRect().left);
        $markers.forEach(($marker, i) => {
          const lineRect = $lines[i].getBoundingClientRect();
          const labelRect = $labels[i].getBoundingClientRect();
          expect(Math.abs(($labels[i].style.right ? labelRect.right : labelRect.left) - lineRect.left)).to.be.below(.01);
        });
      } finally {
        observer.revert();
        resolve();
      }
    });
  });

  test('ScrollObserver debug refresh preserves marker DOM across a replacement', resolve => {
    const observer = onScroll({
      target: '#target-id',
      debug: true,
    });
    utils.sync(() => {
      const { root: $debug, markers: $markers } = debugElements(observer);
      const replacement = onScroll({
        target: '#target-id',
        enter: 'center center',
        debug: true,
      });
      replacement.refreshDebug(observer);
      observer.revert();
      expect($debug.isConnected).to.equal(true);
      utils.sync(() => {
        try {
          expect(replacement.$debug).to.equal($debug);
          const replacementElements = debugElements(replacement);
          expect(replacementElements.markers).to.deep.equal($markers);
          const $labels = replacementElements.labels;
          expect($labels.map($label => $label.textContent)).to.deep.equal([
            'container: center', 'container: start', 'target: center', 'target: end'
          ]);
        } finally {
          replacement.revert();
          resolve();
        }
      });
    });
  });

  test('ScrollObserver updates debug once per geometry refresh', resolve => {
    const observer = onScroll({
      target: '#target-id',
      debug: true,
    });
    const refreshDebug = observer.refreshDebug;
    let updates = 0;
    observer.refreshDebug = function(previous) {
      updates++;
      return refreshDebug.call(this, previous);
    };
    utils.sync(() => {
      try {
        expect(updates).to.equal(1);
        updates = 0;
        const zIndex = observer.container.zIndex;
        observer.container.refresh();
        expect(updates).to.equal(1);
        expect(observer.container.zIndex).to.equal(zIndex);
      } finally {
        observer.revert();
        resolve();
      }
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

  test('Smooths sync by elapsed time instead of frame count', resolve => {
    const observer = onScroll({
      target: '#target-id',
      sync: 0.5,
    });
    const animation = animate({ x: 0 }, {
      x: 100,
      ease: 'linear',
      autoplay: observer,
    });
    utils.sync(() => {
      const container = observer.container;
      const catchUp = (frames, deltaTime) => {
        animation.seek(0);
        observer.offsetStart = 0;
        observer.offsetEnd = 100;
        observer.distance = 100;
        container.scrollY = 50;
        container.scrollTicker.deltaTime = deltaTime;
        for (let i = 0; i < frames; i++) observer.handleScroll();
        return animation.progress;
      };
      const oneFrameAt60fps = catchUp(1, 1000 / 60);
      const twoFramesAt120fps = catchUp(2, 1000 / 120);
      observer.revert();
      animation.revert();
      expect(oneFrameAt60fps).to.be.above(0);
      expect(twoFramesAt120fps).to.be.closeTo(oneFrameAt60fps, .0001);
      resolve();
    });
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

  test('ScrollObserver resizeTicker completing before target is resolved should not throw', () => {
    const observer = onScroll({
      target: '#target-id',
    });
    expect(observer.target).to.equal(null);
    expect(() => observer.container.resizeTicker.complete()).to.not.throw();
    observer.revert();
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

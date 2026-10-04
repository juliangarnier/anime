import {
  expect,
} from '../utils.js';

import {
  onScroll,
  scrollContainers,
  animate,
  utils
} from '../../dist/modules/index.js';

suite('Scroll', () => {
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
    $container.width = '100px';
    animation.revert();
    expect(scrollContainers.get($container)).to.equal(undefined);
  });

  test('Window ScrollContainer restarts its resize ticker on window resize events until reverted', () => {
    const observer = onScroll({ target: '#target-id' });
    const container = observer.container;
    const originalRestart = container.resizeTicker.restart;
    let restarts = 0;
    container.resizeTicker.restart = () => { restarts++; };
    try {
      expect(container.useWin).to.equal(true);
      window.dispatchEvent(new Event('resize'));
      expect(restarts).to.equal(1);
      container.revert();
      window.dispatchEvent(new Event('resize'));
      expect(restarts).to.equal(1);
    } finally {
      container.resizeTicker.restart = originalRestart;
      observer.revert();
    }
  });
});

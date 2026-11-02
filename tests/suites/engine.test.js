import {
  expect,
} from '../utils.js';

import {
  animate,
  engine,
  utils,
} from '../../dist/modules/index.js';

// A broken scheduler must reject before Mocha times out, so each test can still clean up.
/** @param {import('../../dist/modules/index.js').JSAnimation} animation */
async function waitForCompletion(animation) {
  let timeout;
  try {
    await Promise.race([
      animation.then(),
      new Promise((_, reject) => { timeout = setTimeout(() => reject(new Error('Animation did not complete')), 1000); }),
    ]);
  } finally {
    clearTimeout(timeout);
  }
}

suite('Engine', () => {

  test('Initial offset position should be properly calculated on cold start', resolve => {

    setTimeout(() => {
      const animation1 = animate('#target-id', {
        x: 100,
        duration: 20,
        onComplete: () => {
          const animation2 = animate('#target-id', {
            x: 100,
            duration: 20,
          });
          expect(animation1._offset).to.be.above(50); // Above the setTimeout value
          expect(animation1._offset).to.be.below(animation2._offset); // Below animation2._offset
          expect(animation2._offset).to.be.above(animation1._offset);
          resolve();
        }
      });
    }, 50);

  });

  test('Set useDefaultMainLoop to false should prevent animations from running', async () => {
    engine.pause();
    const defaultLoop = engine.useDefaultMainLoop;
    engine.useDefaultMainLoop = false;
    let renders = 0;
    const animation = animate('#target-id', { x: 100, duration: 50, onRender: () => renders++ });
    try {
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      expect(animation.began).to.equal(false);
      expect(animation.currentTime).to.equal(0);
      expect(renders).to.equal(0);
    } finally {
      animation.cancel();
      engine.useDefaultMainLoop = defaultLoop;
      engine.resume();
    }
  });

  test('Manually tick the engine with an external loop', async () => {
    engine.pause();
    const defaultLoop = engine.useDefaultMainLoop;
    engine.useDefaultMainLoop = false;
    let raf = 0;
    let renders = 0;
    const animation = animate('#target-id', { translateX: 100, duration: 50, onRender: () => renders++ });
    function customLoop() {
      raf = requestAnimationFrame(customLoop);
      engine.update();
    }
    try {
      customLoop();
      await waitForCompletion(animation);
      expect(animation.began).to.equal(true);
      expect(animation.completed).to.equal(true);
      expect(animation.currentTime).to.equal(50);
      expect(/** @type {HTMLElement} */(document.querySelector('#target-id')).style.transform).to.equal('translateX(100px)');
      // Exact per-frame counts are checked with controlled time in engine-scheduler.test.mjs.
      expect(renders).to.be.above(0);
    } finally {
      cancelAnimationFrame(raf);
      animation.cancel();
      engine.useDefaultMainLoop = defaultLoop;
      engine.resume();
    }
  });

  test('Pause and resume the engine', async () => {
    let renders = 0;
    const animation = animate('#target-id', { translateX: 100, duration: 50, onRender: () => renders++ });
    try {
      engine.pause();
      await new Promise(requestAnimationFrame);
      await new Promise(requestAnimationFrame);
      expect(animation.began).to.equal(false);
      expect(animation.completed).to.equal(false);
      expect(animation.currentTime).to.equal(0);
      expect(renders).to.equal(0);
      engine.resume();
      await waitForCompletion(animation);
      expect(animation.began).to.equal(true);
      expect(animation.completed).to.equal(true);
      expect(animation.currentTime).to.equal(50);
      expect(/** @type {HTMLElement} */(document.querySelector('#target-id')).style.transform).to.equal('translateX(100px)');
      expect(renders).to.be.above(0);
    } finally {
      animation.cancel();
      engine.resume();
    }
  });

  test('Default precision should be 4', () => {

    const [ $target ] = utils.$('#target-id');

    const initialTransformString = 'translateX(0.12345px) scale(0.12345)';

    $target.style.transform = initialTransformString;

    const animation = animate($target, {
      x: 2.12345,
      scale: 2.12345,
      ease: 'linear',
      autoplay: false,
      duration: 500,
    });

    expect($target.style.transform).to.equal(initialTransformString);
    animation.seek(250);
    expect($target.style.transform).to.equal('translateX(1.1235px) scale(1.1235)');
    animation.seek(500);
    expect($target.style.transform).to.equal('translateX(2.12345px) scale(2.12345)');

  });

  test('Changing precision should affect only animated values', () => {

    const defaultPrecision = engine.precision;

    engine.precision = 1;

    const [ $target ] = utils.$('#target-id');

    const initialTransformString = 'translateX(0.12345px) scale(0.12345)';

    $target.style.transform = initialTransformString;

    const animation = animate($target, {
      x: 2.12345,
      scale: 2.12345,
      ease: 'linear',
      autoplay: false,
      duration: 500,
    });

    expect($target.style.transform).to.equal(initialTransformString);
    animation.seek(250);
    expect($target.style.transform).to.equal('translateX(1.1px) scale(1.1)');
    animation.seek(500);
    expect($target.style.transform).to.equal('translateX(2.12345px) scale(2.12345)');

    engine.precision = defaultPrecision;

  });

  test('Changing the time unit should affect duration values', resolve => {

    const defaultUnit = engine.timeUnit;
    const defaultDuration = /** @type {Number}  */(engine.defaults.duration);

    engine.timeUnit = 's';

    expect(engine.defaults.duration).to.equal(defaultDuration * .001);

    const animation = animate('#target-id', {
      x: 100,
      ease: 'linear',
      duration: .75,
    });

    setTimeout(() => {
      expect(animation.currentTime).to.be.above(.1);
      expect(animation.currentTime).to.be.below(.75);
      resolve();
      engine.timeUnit = defaultUnit;
    }, 150)

  });
});

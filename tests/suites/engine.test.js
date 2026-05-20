import {
  expect,
} from '../utils.js';

import {
  animate,
  engine,
  utils,
} from '../../dist/modules/index.js';

const defaultEnginePauseState = engine.paused;
const defaultEngineReqId = engine.reqId;

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

  test('Set useDefaultMainLoop to false should prevent animations from running', resolve => {

    // Needed to kill the engine
    engine.pause();

    // Needed to reset engine to its original state
    engine.paused = defaultEnginePauseState;
    engine.reqId = defaultEngineReqId;

    engine.useDefaultMainLoop = false;

    let renderCheck = 0;

    const animation = animate('#target-id', {
      x: 100,
      duration: 20,
      onUpdate: () => {
        renderCheck++;
      },
    });

    setTimeout(() => {
      expect(animation.began).to.equal(false);
      expect(animation.currentTime).to.equal(0);
      expect(renderCheck).to.equal(0);
      engine.useDefaultMainLoop = true; // Reset
      resolve();
    }, 70);
  });

  test('Manually tick the engine with an external loop', resolve => {

    engine.useDefaultMainLoop = false;

    let raf = 0;

    function customLoop() {
      raf = requestAnimationFrame(customLoop);
      engine.update();
    }

    customLoop();

    let renderCheck = 0;

    const animation = animate('#target-id', {
      translateX: 100,
      onRender: () => {
        renderCheck++;
      },
      duration: 50,
    });

    setTimeout(() => {
      expect(animation.began).to.equal(true);
      expect(animation.completed).to.equal(true);
      expect(animation.currentTime).to.equal(50);
      expect(renderCheck).to.be.above(2);
      cancelAnimationFrame(raf);
      engine.useDefaultMainLoop = true; // Reset
      resolve();
    }, 70);
  });

  test('Pause and resume the engine', resolve => {

    let renderCheck = 0;

    const animation = animate('#target-id', {
      translateX: 100,
      onRender: () => {
        renderCheck++;
      },
      duration: 50,
    });

    engine.pause();

    setTimeout(() => {
      expect(animation.began).to.equal(false);
      expect(animation.completed).to.equal(false);
      expect(animation.currentTime).to.equal(0);
      expect(renderCheck).to.equal(0);
      engine.resume();
      setTimeout(() => {
        expect(animation.began).to.equal(true);
        expect(animation.completed).to.equal(true);
        expect(animation.currentTime).to.equal(50);
        expect(renderCheck).to.be.above(2);
        resolve();
      }, 100);
    }, 50);
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

import {
  removeChild,
  expect,
  getChildAtIndex,
} from '../utils.js';

import {
  utils,
  stagger,
  animate,
  createTimer,
  createTimeline,
  engine,
} from '../../dist/modules/index.js';

import {
  compositionTypes,
  valueTypes,
} from '../../dist/modules/core/consts.js';

/** @import { Tween, JSAnimation } from '../../dist/modules/index.js' */

suite('Tweens', () => {
  test('Single tween timings', () => {
    const delay = 200;
    const duration = 300;

    const animation = animate('#target-id', {
      translateX: '100%',
      delay: delay,
      duration: duration,
      autoplay: false,
    });

    const firstTween = getChildAtIndex(animation, 0);
    const firstTweenChangeEndTime = firstTween._updateDuration + firstTween._startTime;

    expect(firstTween._startTime).to.equal(0);
    expect(firstTweenChangeEndTime).to.equal(duration);

    expect(animation.duration).to.equal(duration);
  });

  test('Keyframes tween timings', () => {
    const delay1 = 200;
    const duration1 = 300;

    const delay2 = 300;
    const duration2 = 400;

    const animation = animate('#target-id', {
      translateX: [
        {to: '100%', delay: delay1, duration: duration1},
        {to: '200%', delay: delay2, duration: duration2}
      ],
      autoplay: false,
    });

    const firstTween = getChildAtIndex(animation, 0);
    const firstTweenChangeEndTime = firstTween._updateDuration + firstTween._startTime;

    expect(firstTween._startTime).to.equal(0);
    expect(firstTweenChangeEndTime).to.equal(duration1);

    const secondTween = getChildAtIndex(animation, 1);
    const secondTweenChangeEndTime = secondTween._updateDuration + secondTween._startTime;

    expect(secondTween._startTime).to.equal(duration1 + delay2);
    expect(secondTweenChangeEndTime).to.equal(duration1 + (delay2 + duration2));

    expect(animation.duration).to.equal(duration1 + delay2 + duration2);
  });

  test('Simple tween ease', () => {
    const animation = animate('#target-id', {
      translateX: '100%',
      ease: 'linear',
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 0)._ease(.5)).to.equal(.5);
  });

  test('Color tween', () => {
    const animation = animate('#target-id', {
      translateX: '100%',
      backgroundColor: '#000',
      autoplay: false,
    });

    expect(getChildAtIndex(animation, 1)._valueType).to.equal(valueTypes.COLOR);
  });

  test('Canceled tween should not update after the next sibling has been cancelled', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      autoplay: false,
      defaults: { ease: 'linear' },
    })
    .add($target, {
      translateX: [0, 100],
      duration: 20
    })
    .add($target, {
      translateX: -100,
      duration: 5,
      onComplete: self => {
        removeChild(self, self._tail);
      }
    }, 10);

    tl.seek(5);
    expect($target.style.transform).to.equal('translateX(25px)');

    tl.seek(10);
    expect($target.style.transform).to.equal('translateX(50px)');

    tl.seek(15);
    expect($target.style.transform).to.equal('translateX(-100px)');

    tl.seek(20);
    expect($target.style.transform).to.equal('translateX(-100px)');
  });

  test('Do not remove tween siblings on animation pause', resolve => {
    const animation1 = animate('#target-id', {
      translateX: [{to: -50}, {to: 200}],
      duration: 100,
    });
    const animation2 = animate('#target-id', {
      translateX: [{to: 100}, {to: -100}],
      duration: 100,
      delay: 50,
    });
    createTimer({
      duration: 50,
      onComplete: () => {
        animation1.pause();
        animation2.pause();
        expect(animation1.paused).to.equal(true);
        // This one should be null since the first should have been cancel
        expect(animation1._head._nextRep).to.be.null;
        expect(animation2.paused).to.equal(true);
        expect(animation2._head._nextRep).to.not.be.null;
        resolve();
      }
    });
  });

  test('Remove tween siblings on animation complete', resolve => {
    const animation1 = animate('#target-id', { translateX: 200, duration: 50 });
    const animation2 = animate('#target-id', { translateX: 200, duration: 50, delay: 10 });
    createTimer({
      duration: 100,
      onComplete: () => {
        expect(animation1.paused).to.equal(true);
        expect(animation1._cancelled).to.equal(1);
        expect(animation1._head._prevRep).to.be.null;

        expect(animation2.paused).to.equal(true);
        expect(animation2._cancelled).to.equal(1);
        expect(animation2._head._nextRep).to.be.null;
        resolve();
      }
    });
  });

  test('Re-add tween siblings on restart after animation completes', resolve => {
    const animation1 = animate('#target-id', { translateX: 200, duration: 50 });
    const animation2 = animate('#target-id', { translateX: 200, duration: 50, delay: 10 });
    createTimer({
      duration: 100,
      onComplete: () => {
        expect(animation1._cancelled).to.equal(1);
        expect(animation2._cancelled).to.equal(1);
        animation1.restart();
        animation2.restart();
        createTimer({
          duration: 20,
          onComplete: () => {
            animation1.pause();
            animation2.pause();
            expect(animation1.paused).to.equal(true);
            expect(animation1._cancelled).to.equal(0);
            expect(animation1._head._prevRep).to.not.be.null;
            expect(animation2.paused).to.equal(true);
            expect(animation2._cancelled).to.equal(0);
            expect(animation2._head._nextRep).to.not.be.null;
            resolve();
          }
        });
      }
    });
  });

  test('Re-add tween siblings on restart after animation completes in seconds', resolve => {
    engine.timeUnit = 's';
    const animation1 = animate('#target-id', { translateX: 200, duration: .05 });
    const animation2 = animate('#target-id', { translateX: 200, duration: .05, delay: .01 });
    createTimer({
      duration: .1,
      onComplete: () => {
        expect(animation1._cancelled).to.equal(1);
        expect(animation2._cancelled).to.equal(1);
        animation1.restart();
        animation2.restart();
        createTimer({
          duration: .02,
          onComplete: () => {
            animation1.pause();
            animation2.pause();
            expect(animation1.paused).to.equal(true);
            expect(animation1._cancelled).to.equal(0);
            expect(animation1._head._prevRep).to.not.be.null;
            expect(animation2.paused).to.equal(true);
            expect(animation2._cancelled).to.equal(0);
            expect(animation2._head._nextRep).to.not.be.null;
            resolve();
            engine.timeUnit = 'ms';
          }
        });
      }
    });
  });

  test('Properly override looped tween', resolve => {
    const anim1 = animate('#target-id', {
      scale: 2,
      alternate: true,
      loop: true,
      duration: 100,
      composition: 'replace',
    });

    const anim2 = animate('#target-id', {
      scale: 4,
      duration: 40,
      composition: 'replace',
      onComplete: () => {
        expect(anim1.completed).to.equal(false);
        expect(anim1._cancelled).to.equal(1);
        resolve();
      }
    });
  });

  test('Properly override timeline tweens', resolve => {
    const tl1 = createTimeline()
    .add('#target-id', {
      x: 200,
      duration: 60,
    }, 0)
    .add('#target-id', {
      y: 200,
      duration: 60,
    }, 0)
    createTimeline({
      delay: 10,
    })
    .add('#target-id', {
      x: 100,
      duration: 30,
    }, 0)
    .add('#target-id', {
      y: 100,
      duration: 30,
    }, 0)
    .then(() => {
      expect(tl1._cancelled).to.equal(1);
      resolve();
    });
  });

  test('Do not pause animation with partially overriden tweens', resolve => {
    const anim1 = animate('#target-id', {
      x: 100,
      scale: 2,
      alternate: true,
      loop: true,
      duration: 80,
      composition: 'replace',
    });

    animate('#target-id', {
      scale: 4,
      duration: 40,
      composition: 'replace',
      onComplete: () => {
        expect(anim1.completed).to.equal(false);
        expect(anim1._cancelled).to.equal(0);
        anim1.pause();
        resolve();
      }
    });
  });

  test('Do not pause timeline with partially overriden tweens', resolve => {
    const tl1 = createTimeline()
    .add('#target-id', {
      x: 200,
      duration: 60,
    }, 0)
    .add('#target-id', {
      y: 200,
      duration: 60,
    }, 0)
    createTimeline({
      delay: 10,
    })
    .add('#target-id', {
      x: 100,
      duration: 30,
    }, 0)
    .then(() => {
      expect(tl1._cancelled).to.equal(0);
      tl1.pause();
      resolve();
    });
  });

  test('Do not override tweens with composition none', resolve => {
    const anim1 = animate('#target-id', {
      x: 100,
      scale: 2,
      duration: 80,
      composition: 'none',
      onComplete: () => {
        expect(utils.get('#target-id', 'x', false)).to.equal(100);
        expect(utils.get('#target-id', 'scale', false)).to.equal(2);
        resolve();
      }
    });

    animate('#target-id', {
      scale: 4,
      duration: 40,
      composition: 'none',
      onComplete: () => {
        expect(anim1.completed).to.equal(false);
        expect(anim1._cancelled).to.equal(0);
        expect(utils.get('#target-id', 'scale', false)).to.equal(4);
      }
    });
  });

  test('Properly blend tweens with composition blend', resolve => {
    const anim1 = animate('#target-id', {
      x: 100,
      scale: 2,
      duration: 200,
      composition: 'blend',
      ease: 'linear',
      onComplete: () => {
        expect(utils.get('#target-id', 'x', false)).to.be.above(180);
        expect(utils.get('#target-id', 'scale', false)).to.be.above(3.9);
        resolve();
      }
    });

    animate('#target-id', {
      x: 200,
      scale: 4,
      duration: 100,
      composition: 'blend',
      ease: 'linear',
      onComplete: () => {
        expect(anim1.completed).to.equal(false);
        expect(anim1._cancelled).to.equal(0);
        expect(utils.get('#target-id', 'x', false)).to.be.above(120);
        expect(utils.get('#target-id', 'x', false)).to.be.below(150);
        expect(utils.get('#target-id', 'scale', false)).to.be.above(3);
        expect(utils.get('#target-id', 'scale', false)).to.be.below(3.5);
      }
    });
  });

  test('Properly assign specific tween properties', () => {

    const easeA = t => t;
    const easeB = t => t * 2;

    const modifierA = v => v;
    const modifierB = v => v * 2;

    const anim1 = animate('#target-id', {
      x: {
        to: 100,
        modifier: modifierA,
        composition: 'blend',
        ease: easeA,
      },
      y: 100,
      composition: 'none',
      ease: easeB,
      modifier: modifierB,
      autoplay: false,
    });

    const tweenX = /** @type {Tween} */(anim1._head);
    const tweenY = /** @type {Tween} */(tweenX._next);

    expect(tweenX._modifier).to.equal(modifierA);
    expect(tweenX._ease).to.equal(easeA);
    expect(tweenX._composition).to.equal(compositionTypes.blend);

    expect(tweenY._modifier).to.equal(modifierB);
    expect(tweenY._ease).to.equal(easeB);
    expect(tweenY._composition).to.equal(compositionTypes.none);
  });

  test('Seeking inside the delay of a tween should correctly render the previous tween to value', () => {

    const anim = createTimeline({
      autoplay: false
    })
    .add('#target-id', {
      scale: [
        { to: [0, 1], duration: 200, ease: 'outBack' },
        { to: [0, 0], duration: 100, delay: 500, ease: 'inQuart' },
      ],
      delay: 200
    })
    .init()

    anim.seek(404); // Seek after [0, 1] inside the delay of [0, 0]
    expect(utils.get('#target-id', 'scale', false)).to.equal(1);
  });

  test('Correct tweens override and from value definition', () => {

    const duration = 1000;
    const $els = utils.$('.target-class');

    const tl = createTimeline({
      loop: 3,
      alternate: true,
      autoplay: false,
    })
    .add($els[0], {
      translateX: [{to: -50}, {to: 200}],
      duration: 1000,
    }, 0)
    .add($els[0], {
      translateX: [{to: 100}, {to: -100}],
      duration: 1000,
      delay: 500,
    }, 0)
    .add([$els[0], $els[1], $els[2]], {
      translateY: el => el.id == 'square-1' ? -50 : el.id == 'square-2' ? -100 : -150,
      duration: 1600,
      delay: 1250,
    }, stagger(500, {start: '-=250'}))
    .add([$els[0], $els[1], $els[2]], {
      translateY: [
        { to: 50, duration: 500, delay: stagger(250, {start: 0}) },
        { to: 75, duration: 500, delay: 1000 },
        { to: 100, duration: 500, delay: 1000 }
      ],
    }, '-=1250')
    .add($els[0], {
      id: 'TEST A',
      translateY: 50,
    }, '-=' + (duration))
    .add($els[1], {
      translateY: 50,
    }, '-=' + duration)
    .add($els[2], {
      translateY: 50,
    }, '-=' + duration)
    .add([$els[0], $els[1], $els[2]], {
      rotate: '-=180',
      duration: duration * 2,
      delay: stagger(100),
    }, '-=' + duration * .75)
    .add([$els[0], $els[1], $els[2]], {
      id: 'TEST B',
      translateY: 0,
      delay: stagger(100),
    }, '-=' + duration)

    const animA = /** @type {JSAnimation} */(tl._head._next._next._next._next._next._next);
    const animB = /** @type {JSAnimation} */(animA._next._next._next._next);

    expect(animA._head._fromNumber).to.equal(75);
    expect(animB._head._fromNumber).to.equal(50);

  });

});

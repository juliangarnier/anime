import {
  expect,
} from '../utils.js';

import {
  waapi,
  utils,
  stagger,
  eases,
  createTimeline,
} from '../../dist/modules/index.js';

suite('WAAPI', () => {

  CSS.registerProperty({
    name: '--translateX',
    syntax: '<length-percentage>',
    inherits: false,
    initialValue: '0px'
  });

  test('Calling registerProperty on transforms should not conflict with the built-in one', resolve => {
    waapi.animate('#target-id', {
      scale: 1.5,
      duration: 10,
      onComplete: self => {
        expect(self.completed).to.equal(true);
        resolve();
      }
    })
  });

  test('Calling .complete() on an animation should trigger the .then() Promise', resolve => {
    const instance = waapi.animate('#target-id', {
      scale: 1.5,
      duration: 500,
      autoplay: false,
    });
    instance.then(self => {
      expect(self.completed).to.equal(true);
      resolve();
    });
    setTimeout(() => {
      instance.complete();
    }, 10);
  });

  test('Animate multiple elements', resolve => {
    const targets = utils.$('.target-class');
    waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: 10,
      onComplete: anim => {
        expect(anim.duration).to.equal(10);
        expect(utils.get(targets[0], 'x')).to.equal('100px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('100px');
        expect(utils.get(targets[3], 'x')).to.equal('100px');
        resolve();
      },
    });
  });

  test('Animate multiple elements with stagger', resolve => {
    const targets = utils.$('.target-class');
    waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: 10,
      delay: stagger(1),
      onComplete: anim => {
        expect(anim.duration).to.equal(13);
        expect(utils.get(targets[0], 'x')).to.equal('100px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('100px');
        expect(utils.get(targets[3], 'x')).to.equal('100px');
        resolve();
      },
    });
  });

  test('Animate with function based values', resolve => {
    const targets = utils.$('.target-class');
    waapi.animate(targets, {
      transform: (_, i) => `translateX(${i * 100}px)`,
      duration: 10,
      delay: stagger(1),
      onComplete: anim => {
        expect(utils.get(targets[0], 'x')).to.equal('0px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('200px');
        expect(utils.get(targets[3], 'x')).to.equal('300px');
        resolve();
      },
    });
  });

  test('Animate with function based properties', () => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      transform: `translateX(100px)`,
      duration: (_, i) => i * 20,
      delay: (_, i) => i * 5,
      ease: () => (t) => t,
      autoplay: false
    });
    animation.seek(20).commitStyles();
    expect(utils.get(targets[0], 'x')).to.equal('100px');
    expect(utils.get(targets[1], 'x')).to.equal('75px');
    expect(utils.get(targets[2], 'x')).to.equal('25px');
    expect(utils.get(targets[3], 'x')).to.equal('8.33333px');
  });

  test('Animate with function based keyframes value', resolve => {
    const targets = utils.$('.target-class');
    waapi.animate(targets, {
      transform: ['translateX(200px)', (_, i) => `translateX(${i * 100}px)`],
      duration: 10,
      delay: stagger(1),
      onComplete: anim => {
        expect(utils.get(targets[0], 'x')).to.equal('0px');
        expect(utils.get(targets[1], 'x')).to.equal('100px');
        expect(utils.get(targets[2], 'x')).to.equal('200px');
        expect(utils.get(targets[3], 'x')).to.equal('300px');
        resolve();
      },
    });
  });

  test('Seek an animation', () => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      translate: `100px`,
      duration: 10,
      autoplay: false,
      ease: 'linear',
    });
    expect(animation.currentTime).to.equal(0);
    animation.seek(5).commitStyles();
    expect(utils.get(targets[0], 'translate')).to.equal('50px');
    expect(animation.currentTime).to.equal(5);
    animation.seek(animation.duration).commitStyles();
    expect(animation.currentTime).to.equal(animation.duration);
    expect(utils.get(targets[0], 'translate')).to.equal('100px');
  });

  test('Set and get progress on an animation', () => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
      translate: `100px`,
      duration: 10,
      autoplay: false,
      ease: 'linear',
    });
    expect(animation.progress).to.equal(0);
    animation.progress = .5;
    animation.commitStyles();
    expect(utils.get(targets[0], 'translate')).to.equal('50px');
    expect(animation.progress).to.equal(.5);
    animation.progress = 1;
    animation.commitStyles();
    expect(utils.get(targets[0], 'translate')).to.equal('100px');
  });

  test('Individual transforms', resolve => {
    const target = utils.$('#target-id');
    const animation = waapi.animate(target, {
      x: 100,
      y: 200,
      rotate: 45,
      scale: 2,
      duration: 10,
      ease: 'linear',
      onComplete: anim => {
        expect(anim.duration).to.equal(10);
        expect(utils.get(target, '--translateX')).to.equal('100px');
        expect(utils.get(target, '--translateY')).to.equal('200px');
        expect(utils.get(target, '--rotate')).to.equal('45deg');
        expect(utils.get(target, '--scale')).to.equal('2');
        resolve();
      },
    });
  });

  test('revert() an animation', resolve => {
    const targets = utils.$('.target-class');
    utils.set(targets, {
      backgroundColor: '#FF0000',
      opacity: .5,
    });
    const animation = waapi.animate(targets, {
      opacity: 1,
      backgroundColor: '#0000FF',
      x: 100,
      y: 200,
      rotate: 45,
      scale: 2,
      duration: 10,
      ease: 'linear',
      onComplete: () => {
        targets.forEach($el => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'backgroundColor')).to.equal('rgb(0, 0, 255)');
        });
        animation.revert();
        targets.forEach($el => {
          expect(utils.get($el, 'opacity')).to.equal('0.5');
          expect(utils.get($el, 'backgroundColor')).to.equal('rgb(255, 0, 0)');
          expect(utils.get($el, 'transform')).to.equal('none');
          // expect(utils.get($el, '--translateX')).to.equal('0px');
          // expect(utils.get($el, '--translateY')).to.equal('0px');
          // expect(utils.get($el, '--rotate')).to.equal('0deg');
          // expect(utils.get($el, '--scale')).to.equal('1');
        });
        resolve();
      },
    });
  });

  test('utils.remove() a single target', resolve => {
    const targets = utils.$('.target-class');
    waapi.animate(targets, {
      opacity: .5,
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal(!i ? '1' : '0.5');
        });
        resolve();
      },
    });

    utils.remove(targets[0]);
  });

  test('utils.remove() on a specific animation', resolve => {
    const targets = utils.$('.target-class');
    const anim1 = waapi.animate(targets, {
      opacity: .5,
      duration: 10,
    });
    waapi.animate(targets, {
      width: ['0px', '100px'],
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'width')).to.equal('100px');
        });
        resolve();
      },
    });

    utils.remove(targets, anim1);
  });

  test('utils.remove() on a specific property', resolve => {
    const targets = utils.$('.target-class');
    const anim1 = waapi.animate(targets, {
      opacity: .5,
      duration: 10,
    });
    waapi.animate(targets, {
      width: ['0px', '100px'],
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'width')).to.equal('100px');
        });
        resolve();
      },
    });

    utils.remove(targets, null, 'opacity');
  });

  test('utils.remove() on a specific animation and property', resolve => {
    const targets = utils.$('.target-class');
    const anim1 = waapi.animate(targets, {
      opacity: .5,
      height: ['0px', '200px'],
      duration: 10,
    });
    waapi.animate(targets, {
      width: ['0px', '100px'],
      duration: 10,
      onComplete: () => {
        targets.forEach(($el, i) => {
          expect(utils.get($el, 'opacity')).to.equal('1');
          expect(utils.get($el, 'height')).to.equal('200px');
          expect(utils.get($el, 'width')).to.equal('100px');
        });
        resolve();
      },
    });

    utils.remove(targets, null, 'opacity');
  });

  test('WAAPI ease cache should not cache functions', () => {
    const [ $target1, $target2 ] = utils.$('.target-class');
    const animation1 = waapi.animate($target1, {
      opacity: 0,
      autoplay: false,
      duration: 10,
      ease: eases.out(1),
    });
    const animation2 = waapi.animate($target2, {
      opacity: 0,
      autoplay: false,
      duration: 10,
      ease: eases.out(4),
    });
    animation1.seek(5);
    animation2.seek(5);
    expect(utils.get($target1, 'opacity')).to.not.equal(utils.get($target2, 'opacity'));
  });

  test('WAAPI ease cache should cache strings', () => {
    const [ $target1, $target2 ] = utils.$('.target-class');
    const animation1 = waapi.animate($target1, {
      opacity: 0,
      autoplay: false,
      duration: 10,
      ease: 'out(1)',
    });
    const animation2 = waapi.animate($target2, {
      opacity: 0,
      autoplay: false,
      duration: 10,
      ease: 'out(4)',
    });
    animation1.seek(5);
    animation2.seek(5);
    expect(utils.get($target1, 'opacity')).to.not.equal(utils.get($target2, 'opacity'));
  });

  test('Looped timeline syncing a WAAPI animation updates values correctly after initial loop', () => {
    const [ $target1, $target2 ] = utils.$('.target-class');
    const waapiAnimA = waapi.animate($target1, {
      opacity: [0, 1],
      duration: 100,
      autoplay: false,
      ease: 'linear',
    });
    const waapiAnimB = waapi.animate($target2, {
      opacity: [0, 1],
      duration: 100,
      autoplay: false,
      ease: 'linear',
    });
    const tl = createTimeline({
      autoplay: false,
      loop: 1,
    })
    .sync(waapiAnimA)
    .sync(waapiAnimB, 50); // This caused syncing of the first waapi anim to fail before forcing persist
    tl.seek(0);
    expect(utils.get($target1, 'opacity')).to.equal('0');
    expect(utils.get($target2, 'opacity')).to.equal('0');
    tl.seek(50);
    expect(utils.get($target1, 'opacity')).to.equal('0.5');
    expect(utils.get($target2, 'opacity')).to.equal('0');
    tl.seek(100);
    expect(utils.get($target1, 'opacity')).to.equal('1');
    expect(utils.get($target2, 'opacity')).to.equal('0.5');
    tl.seek(149);
    expect(utils.get($target1, 'opacity')).to.equal('1');
    expect(utils.get($target2, 'opacity')).to.equal('0.99');
    tl.seek(150);
    expect(utils.get($target1, 'opacity')).to.equal('0'); // value goes back to 0 when currrent time is the begining of the second loop
    expect(utils.get($target2, 'opacity')).to.equal('0');
    tl.seek(200);
    expect(utils.get($target1, 'opacity')).to.equal('0.5');
    expect(utils.get($target2, 'opacity')).to.equal('0');
    tl.seek(250);
    expect(utils.get($target1, 'opacity')).to.equal('1');
    expect(utils.get($target2, 'opacity')).to.equal('0.5');
    tl.seek(299);
    expect(utils.get($target1, 'opacity')).to.equal('1');
    expect(utils.get($target2, 'opacity')).to.equal('0.99');
    tl.seek(300);
    expect(utils.get($target1, 'opacity')).to.equal('1');
    expect(utils.get($target2, 'opacity')).to.equal('1');
  });

});

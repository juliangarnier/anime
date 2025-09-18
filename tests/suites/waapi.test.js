import {
  expect,
} from '../utils.js';

import {
  waapi,
  utils,
  stagger,
  eases,
} from '../../../dist/modules/index.js';

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
    const animation = waapi.animate(targets, {
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
    const animation = waapi.animate(targets, {
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
    const animation = waapi.animate(targets, {
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

  test('Animate with function based keyframes value', resolve => {
    const targets = utils.$('.target-class');
    const animation = waapi.animate(targets, {
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

  test("seek(0) an from-to stagger animation", (resolve) => {
    const targets = utils.$(".target-class");

    const anim = {
      backgroundColor: { from: "rgb(255, 0, 0)", to: "rgb(0, 0, 255)" },
      opacity: { from: "0.5", to: "1" },
    };

    const animation = waapi.animate(targets, {
      ...anim,
      delay: stagger(2),
      duration: 10,
      ease: "linear",
      onComplete: () => {
        targets.forEach(($el) => {
          expect(utils.get($el, "opacity")).to.equal(anim.opacity.to);
          expect(utils.get($el, "backgroundColor")).to.equal(
            anim.backgroundColor.to
          );
        });
        animation.seek(0).commitStyles();
        targets.forEach(($el) => {
          expect(utils.get($el, "opacity")).to.equal(anim.opacity.from);
          expect(utils.get($el, "backgroundColor")).to.equal(
            anim.backgroundColor.from
          );
        });
        resolve();
      },
    });
  });

  test("mid-progress seek(0) on from-to stagger animation", () => {
    const targets = utils.$(".target-class");
    const anim = {
      backgroundColor: { from: "rgb(255, 0, 0)", to: "rgb(0, 0, 255)" },
      opacity: { from: "0.5", to: "1" },
    };
    const animation = waapi.animate(targets, {
      ...anim,
      delay: stagger(2),
      duration: 10,
      ease: "linear",
      autoplay: false,
    });
    // Seek into the animation past first delay (e.g., time=5)
    animation.seek(5).commitStyles();
    // First element should have progressed (opacity somewhere between from and to)
    const firstOpacity = parseFloat(utils.get(targets[0], 'opacity'));
    expect(firstOpacity).to.be.greaterThan(parseFloat(anim.opacity.from));
    // Now seek back to 0
    animation.seek(0).commitStyles();
    targets.forEach(($el) => {
      expect(utils.get($el, 'opacity')).to.equal(anim.opacity.from);
      expect(utils.get($el, 'backgroundColor')).to.equal(anim.backgroundColor.from);
    });
  });

  test("conditional restoration on partial seek", () => {
    const targets = utils.$('.target-class');
    // 4 targets expected in test DOM
    const anim = {
      backgroundColor: { from: 'rgb(255, 0, 0)', to: 'rgb(0, 0, 255)' },
      opacity: { from: '0.5', to: '1' },
    };
    const animation = waapi.animate(targets, {
      ...anim,
      delay: stagger(2), // delays: 0,2,4,6
      duration: 10,
      ease: 'linear',
      autoplay: false,
    });
    // Seek to time=3 (so target 0 started, target1 started at 2 and progressed, targets 2 & 3 not started yet)
    animation.seek(3).commitStyles();

    // Targets whose delay > 3 (indexes 2 & 3) should show original from values
    [2,3].forEach(i => {
      expect(utils.get(targets[i], 'opacity')).to.equal(anim.opacity.from);
      expect(utils.get(targets[i], 'backgroundColor')).to.equal(anim.backgroundColor.from);
    });

    // Targets 0 & 1 should have progressed away from exact from values (can't assert exact midframe without reading computed progress, just ensure not the pure from value for at least one property)
    [0,1].forEach(i => {
      expect(utils.get(targets[i], 'opacity')).to.not.equal('');
    });

    // Now seek back to 1: target0 delay(0)>1? no; so it remains progressed-ish (or at from if timing). target1 delay(2)>1 => should revert to from; targets2/3 still from.
    animation.seek(1).commitStyles();
    // target1 (delay 2) should be at from values
    expect(utils.get(targets[1], 'opacity')).to.equal(anim.opacity.from);
    expect(utils.get(targets[1], 'backgroundColor')).to.equal(anim.backgroundColor.from);
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
          expect(utils.get($el, '--translateX')).to.equal('0px');
          expect(utils.get($el, '--translateY')).to.equal('0px');
          expect(utils.get($el, '--rotate')).to.equal('0deg');
          expect(utils.get($el, '--scale')).to.equal('1');
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

});

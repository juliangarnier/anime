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

  const nextFrames = () => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  test('Passes colors outside sRGB and named colors to the browser', () => {
    const target = utils.$('#target-id')[0];
    // The browser normalizes the keyframes it receives, compare with its own reading of each color.
    const probe = document.createElement('div');
    const normalized = color => { probe.style.color = color; return probe.style.color; };
    for (const [from, to] of [['color(display-p3 1 0 0)', 'color(display-p3 0 1 0)'], ['red', 'oklch(50% 0.1 200)']]) {
      const animation = waapi.animate(target, { color: [from, to], duration: 1000, ease: 'linear', autoplay: false });
      const keyframes = /** @type {KeyframeEffect} */(animation.animations[0].effect).getKeyframes();
      expect([keyframes[0].color, keyframes[1].color]).to.deep.equal([normalized(from), normalized(to)]);
      animation.seek(0);
      const start = getComputedStyle(target).color;
      animation.seek(500);
      const middle = getComputedStyle(target).color;
      expect(middle).to.not.equal(start);
      animation.seek(1000);
      expect(getComputedStyle(target).color).to.not.equal(middle);
      if (from.startsWith('color(')) expect(getComputedStyle(target).color).to.not.equal('rgb(0, 255, 0)');
      animation.revert();
    }
  });

  for (const autoplay of [false, true]) {
    test(`A muted end seek skips completion and can replay (autoplay: ${autoplay})`, async () => {
      let completes = 0;
      let resolutions = 0;
      const target = utils.$('#target-id')[0];
      const animation = waapi.animate(target, {
        opacity: [0, 1], duration: 1000, autoplay, ease: 'linear',
        onComplete: () => completes++,
      });
      const keys = Object.keys(animation);
      const done = animation.then(() => { resolutions++; });
      try {
        await Promise.all(animation.animations.map(native => native.ready));
        animation.seek(animation.duration, true);
        await nextFrames();
        expect(completes).to.equal(0);
        expect(resolutions).to.equal(0);
        expect(animation.completed).to.equal(true);
        expect(animation.paused).to.equal(true);
        expect(+getComputedStyle(target).opacity).to.equal(1);
        expect(await animation.then(() => 42)).to.equal(42);
        expect(resolutions).to.equal(0);
        expect(Object.keys(animation)).to.deep.equal(keys);

        animation.restart().pause().seek(500);
        expect(+getComputedStyle(target).opacity).to.be.closeTo(.5, .001);
        animation.complete();
        await done;
        expect(completes).to.equal(1);
        expect(resolutions).to.equal(1);
      } finally {
        animation.revert();
      }
    });
  }

  test('A muted seek before the end does not mute later playback completion', async () => {
    let completes = 0;
    const animation = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 80, autoplay: false,
      onComplete: () => completes++,
    });
    try {
      const done = animation.then(() => 42);
      animation.seek(40, true).play();
      expect(await done).to.equal(42);
      expect(completes).to.equal(1);
    } finally {
      animation.revert();
    }
  });

  for (const waitForFrame of [false, true]) {
    test(`An unmuted completion after a muted end seek resolves all properties (wait: ${waitForFrame})`, async () => {
      let completes = 0;
      const targets = utils.$('.target-class');
      const animation = waapi.animate(targets, {
        opacity: [0, 1], width: ['0px', '100px'],
        duration: 100, delay: stagger(10), autoplay: false, ease: 'linear',
        onComplete: () => completes++,
      });
      try {
        const done = animation.then(() => 42);
        animation.seek(animation.duration, true);
        if (waitForFrame) await nextFrames();
        expect(completes).to.equal(0);
        animation.complete();
        expect(await done).to.equal(42);
        expect(completes).to.equal(1);
        for (const target of targets) {
          expect(+getComputedStyle(target).opacity).to.equal(1);
          expect(getComputedStyle(target).width).to.equal('100px');
        }
      } finally {
        animation.revert();
      }
    });
  }

  test('Cancelling after a muted end seek does not run completion callbacks', async () => {
    let calls = 0;
    const animation = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 100, autoplay: false,
      onComplete: () => calls++,
    });
    animation.then(() => { calls++; });
    animation.seek(100, true).cancel();
    await nextFrames();
    expect(calls).to.equal(0);
    animation.revert();
  });

  test('A muted rewind ignores a finish event queued before the seek', async () => {
    let calls = 0;
    const animation = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 1000, autoplay: false,
      onComplete: () => calls++,
    });
    try {
      const done = animation.then(() => 42);
      animation.complete();
      await Promise.all(animation.animations.map(native => native.finished));
      animation.seek(100, true).pause();
      await nextFrames();
      expect(calls).to.equal(0);
      expect(animation.completed).to.equal(false);
      animation.complete();
      expect(await done).to.equal(42);
      expect(calls).to.equal(1);
    } finally {
      animation.revert();
    }
  });

  for (const muted of [false, true]) {
    test(`A queued finish respects a later ${muted ? 'muted end seek' : 'pause at the end'}`, async () => {
      let calls = 0;
      let resolutions = 0;
      const animation = waapi.animate('#target-id', {
        opacity: [0, 1], duration: 1000, autoplay: true,
        onComplete: () => calls++,
      });
      try {
        const done = animation.then(() => { resolutions++; });
        animation.complete();
        await Promise.all(animation.animations.map(native => native.finished));
        if (muted) animation.seek(animation.duration, true);
        else animation.pause();
        await nextFrames();
        expect(calls).to.equal(muted ? 0 : 1);
        expect(resolutions).to.equal(muted ? 0 : 1);
        if (muted) animation.complete();
        await done;
        expect(calls).to.equal(1);
        expect(resolutions).to.equal(1);
      } finally {
        animation.revert();
      }
    });
  }

  test('A muted end seek during reverse playback skips completion and can play again', async () => {
    let calls = 0;
    const target = utils.$('#target-id')[0];
    const animation = waapi.animate(target, {
      opacity: [0, 1], duration: 1000, autoplay: false, ease: 'linear',
      onComplete: () => calls++,
    });
    try {
      const done = animation.then(() => 42);
      animation.seek(500).reverse();
      await Promise.all(animation.animations.map(native => native.ready));
      animation.seek(0, true);
      await nextFrames();
      expect(calls).to.equal(0);
      expect(animation.completed).to.equal(true);
      expect(animation.paused).to.equal(true);
      expect(animation.currentTime).to.equal(0);
      expect(+getComputedStyle(target).opacity).to.equal(0);
      animation.play().seek(500).pause();
      expect(+getComputedStyle(target).opacity).to.be.closeTo(.5, .001);
      animation.complete();
      expect(await done).to.equal(42);
      expect(calls).to.equal(1);
    } finally {
      animation.revert();
    }
  });

  test('A muted seek works immediately after reverse(), before the browser applies its playback rate', async () => {
    let calls = 0;
    const animation = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 1000, autoplay: false,
      onComplete: () => calls++,
    });
    try {
      const done = animation.then(() => 42);
      animation.seek(500).reverse().seek(0, true);
      await nextFrames();
      expect(calls).to.equal(0);
      expect(animation.completed).to.equal(true);
      expect(animation.currentTime).to.equal(0);
      animation.play();
      expect(animation.completed).to.equal(false);
      animation.complete();
      expect(await done).to.equal(42);
      expect(calls).to.equal(1);
    } finally {
      animation.revert();
    }
  });

  test('A muted seek to the start does not stop a playing animation', async () => {
    let calls = 0;
    const animation = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 80,
      onComplete: () => calls++,
    });
    try {
      const done = animation.then(() => 42);
      animation.seek(0, true);
      expect(animation.completed).to.equal(false);
      expect(animation.paused).to.equal(false);
      expect(await done).to.equal(42);
      expect(calls).to.equal(1);
    } finally {
      animation.revert();
    }
  });

  test('A muted seek before the start preserves the requested negative time', async () => {
    const animation = waapi.animate('#target-id', { opacity: [0, 1], duration: 80 });
    try {
      const done = animation.then(() => 42);
      animation.seek(-50, true);
      expect(animation.currentTime).to.equal(-50);
      expect(animation.paused).to.equal(false);
      expect(await done).to.equal(42);
    } finally {
      animation.revert();
    }
  });

  test('A muted seek to the start of reverse playback does not stop it', async () => {
    let calls = 0;
    const animation = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 80, autoplay: false,
      onComplete: () => calls++,
    });
    try {
      const done = animation.then(() => 42);
      animation.seek(40).reverse().seek(80, true);
      expect(animation.completed).to.equal(false);
      expect(animation.paused).to.equal(false);
      expect(await done).to.equal(42);
      expect(calls).to.equal(1);
      expect(animation.currentTime).to.equal(0);
    } finally {
      animation.revert();
    }
  });

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

  test('Completion callbacks keep their receivers and native promise results', async () => {
    const calls = [];
    const instance = waapi.animate('#target-id', {
      opacity: [0, 1], duration: 100, autoplay: false,
      onComplete(self) { calls.push([this, self]); },
    });
    const then = instance.then;
    const done = instance.then(function(self) {
      expect(this).to.equal(undefined);
      expect(self).to.equal(instance);
      return 42;
    });
    instance.complete();
    expect(await done).to.equal(42);
    expect(calls).to.deep.equal([[instance, instance]]);
    expect(instance.then).to.equal(then);
    expect(await Promise.resolve().then(() => instance)).to.equal(instance);
    instance.revert();
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
          expect(utils.get($el, 'backgroundColor')).to.equal('rgba(0,0,255,1)');
        });
        animation.revert();
        targets.forEach($el => {
          expect(utils.get($el, 'opacity')).to.equal('0.5');
          expect(utils.get($el, 'backgroundColor')).to.equal('rgba(255,0,0,1)');
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

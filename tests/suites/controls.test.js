import {
  expect,
  getChildAtIndex,
  forEachChildren,
} from '../utils.js';

import {
  animate,
  createTimeline,
  createTimer,
  utils,
} from '../../dist/modules/index.js';

import {
  minValue,
} from '../../dist/modules/core/consts.js';

suite('Controls', () => {
  test('Alternate the direction of an animation', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    let hasReversed = false;
    animate($target, {
      translateX: 100,
      duration: 100,
      delay: 50,
      onUpdate: self => {
        if (self.currentTime >= 100 * .75 && !hasReversed) {
          hasReversed = true;
          const timeStamp = self.currentTime;
          self.alternate();
          setTimeout(() => {
            expect(self.currentTime).to.be.below(timeStamp);
            resolve();
          }, 33);
        }
      },
    });
  });

  test('Alternate the direction of a reversed animation', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    let hasReversed = false;
    animate($target, {
      translateX: 100,
      duration: 100,
      delay: 50,
      reversed: true,
      onUpdate: self => {
        if (!hasReversed) {
          hasReversed = true;
          const timeStamp = self.currentTime;
          self.alternate();
          setTimeout(() => {
            expect(self.currentTime).to.be.above(timeStamp);
            resolve();
          }, 33);
        }
      },
    });
  });

  test('Alternate the direction of a looped animation', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    let hasReversed = false;
    animate($target, {
      translateX: 100,
      duration: 100,
      delay: 50,
      loop: 3,
      onUpdate: self => {
        if (self.currentTime >= (100 * 2.5) && !hasReversed) {
          hasReversed = true;
          const timeStamp = self.currentTime;
          self.alternate();
          setTimeout(() => {
            expect(self.currentTime).to.be.below(timeStamp);
            expect(self.currentIteration).to.equal(1);
            resolve();
          }, 33);
        }
      },
    });
  });

  test('Alternate the direction of a looped alternate animation', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    let hasReversed = false;
    animate($target, {
      translateX: 100,
      duration: 100,
      delay: 50,
      loop: 3,
      alternate: true,
      onUpdate: self => {
        if (self.currentTime >= (100 * 2.5) && !hasReversed) {
          hasReversed = true;
          const timeStamp = self.currentTime;
          self.alternate();
          setTimeout(() => {
            expect(self.currentTime).to.be.below(timeStamp);
            expect(self.currentIteration).to.equal(1);
            resolve();
          }, 33);
        }
      },
    });
  });

  test('Alternate the direction of a looped alternate reversed animation with odd iteration count', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    let hasReversed = false;
    animate($target, {
      translateX: 100,
      duration: 100,
      delay: 50,
      loop: 3,
      alternate: true,
      reversed: true,
      onUpdate: self => {
        if (self.currentTime >= (100 * 2.5) && !hasReversed) {
          hasReversed = true;
          const timeStamp = self.currentTime;
          self.alternate();
          setTimeout(() => {
            expect(self.currentTime).to.be.below(timeStamp);
            expect(self.currentIteration).to.equal(1);
            resolve();
          }, 33);
        }
      },
    });
  });

  test('Alternate the direction of a looped alternate reversed animation with even iteration count', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    let hasReversed = false;
    animate($target, {
      translateX: 100,
      duration: 100,
      delay: 100,
      loop: 2,
      alternate: true,
      reversed: true,
      onUpdate: self => {
        if (self.currentTime >= (100 * 1.5) && !hasReversed) {
          hasReversed = true;
          const timeStamp = self.currentTime;
          self.alternate();
          setTimeout(() => {
            expect(self.currentTime).to.be.above(timeStamp);
            expect(self.currentIteration).to.equal(1);
            resolve();
          }, 40);
        }
      },
    });
  });

  test('Complete a timer', () => {
    const timer1 = createTimer({ duration: 1000 });
    timer1.complete();
    expect(timer1._cancelled).to.equal(1);
    expect(timer1.paused).to.equal(true);
    expect(timer1.currentTime).to.equal(1000);
  });

  test('Complete an animation', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.height = '100px';
    const animation1 = animate($target, {
      width: 32,
      height: 200,
      ease: 'linear',
    });
    animation1.complete();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.paused).to.equal(true);
    expect(animation1.currentTime).to.equal(1000);
    expect($target.getAttribute('style')).to.equal('height: 200px; width: 32px;');
  });

  test('Complete a timeline', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.height = '100px';
    $target.style.transform = 'translateY(100px)';
    const tl = createTimeline({defaults: {ease: 'linear'}})
    .add($target, {
      width: 32,
      height: 200,
    })
    .add($target, {
      width: 64,
      height: 400,
      translateX: 200,
      translateY: 200,
    });
    tl.complete();
    expect(tl._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 0)._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 1)._cancelled).to.equal(1);
    expect(tl.paused).to.equal(true);
    expect(getChildAtIndex(tl, 0).paused).to.equal(true);
    expect(getChildAtIndex(tl, 1).paused).to.equal(true);
    expect(tl.currentTime).to.equal(tl.duration);
    expect(getChildAtIndex(tl, 0).currentTime).to.equal(getChildAtIndex(tl, 0).duration);
    expect(getChildAtIndex(tl, 1).currentTime).to.equal(getChildAtIndex(tl, 1).duration);
    expect($target.getAttribute('style')).to.equal('height: 400px; transform: translate(200px, 200px); width: 64px;');
  });

  test('Cancel a timer', () => {
    const timer1 = createTimer({ duration: 1000 });
    timer1.seek(500).cancel();
    expect(timer1._cancelled).to.equal(1);
    expect(timer1.paused).to.equal(true);
  });

  test('Cancel an animation', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.height = '100px';
    const animation1 = animate($target, {
      width: 32,
      height: 200,
      ease: 'linear',
    });
    animation1.seek(500).cancel();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.paused).to.equal(true);
    expect($target.getAttribute('style')).to.equal('height: 150px; width: 24px;');
  });

  test('Cancel a timeline', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.height = '100px';
    $target.style.transform = 'translateY(100px)';
    const tl = createTimeline({defaults: {ease: 'linear'}})
    .add($target, {
      width: 32,
      height: 200,
    })
    .add($target, {
      width: 64,
      height: 400,
      translateX: 200,
      translateY: 200,
    });
    tl.seek(1000);
    tl.cancel();
    expect(tl._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 0)._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 1)._cancelled).to.equal(1);
    expect(tl.paused).to.equal(true);
    expect(getChildAtIndex(tl, 0).paused).to.equal(true);
    expect(getChildAtIndex(tl, 1).paused).to.equal(true);
    expect($target.getAttribute('style')).to.equal('height: 200px; transform: translate(0px, 100px); width: 32px;');
  });

  test('Revert a timeline', () => {
    const timer1 = createTimer({ duration: 1000 });
    timer1.seek(500);
    timer1.revert();
    expect(timer1._cancelled).to.equal(1);
    expect(timer1.paused).to.equal(true);
  });

  test('Revert an animation with CSS properties', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      width: 200,
      height: 200,
    });
    animation1.seek(500);
    animation1.revert();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.paused).to.equal(true);
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert an animation with Transforms properties', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      translateX: 200,
      translateY: 200,
    });
    animation1.seek(500);
    animation1.revert();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.paused).to.equal(true);
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert an animation with CSS properties with existing inline styles and clean newly added inline styles', () => {
    const targets = document.querySelectorAll('.target-class');
    const cssText = [];
    targets.forEach(($target, i) => {
      const targetStyle = /** @type {HTMLElement} */($target).style;
      targetStyle.borderRadius = `${i * 10}%`;
      cssText[i] = targetStyle.cssText;
    });
    const animation1 = animate(targets, {
      borderRadius: '50%',
      width: 200,
      height: 200,
    });
    animation1.seek(500);
    animation1.revert();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.paused).to.equal(true);
    targets.forEach(($target, i) => {
      const targetStyle = /** @type {HTMLElement} */($target).style;
      expect(targetStyle.cssText).to.equal(cssText[i]);
    });
  });

  test('Revert an animation with transform properties with existing inline styles and clean newly added inline styles', () => {
    const targets = document.querySelectorAll('.target-class');
    const cssText = [];
    targets.forEach(($target, i) => {
      const targetStyle = /** @type {HTMLElement} */($target).style;
      targetStyle.borderRadius = `${i * 10}%`;
      cssText[i] = targetStyle.cssText;
    });
    const animation1 = animate(targets, {
      translateX: 200,
      translateY: 200,
    });
    animation1.seek(500);
    animation1.revert();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.paused).to.equal(true);
    targets.forEach(($target, i) => {
      const targetStyle = /** @type {HTMLElement} */($target).style;
      expect(targetStyle.cssText).to.equal(cssText[i]);
    });
  });

  test('Revert a timeline and and clean inline styles', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const tl = createTimeline({defaults: {ease: 'linear'}})
    .add($target, {
      width: 32,
      height: 200,
    })
    .add($target, {
      width: 64,
      height: 400,
      translateX: 200,
      translateY: 200,
    });
    tl.seek(1500);
    tl.revert();
    expect(tl._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 0)._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 1)._cancelled).to.equal(1);
    expect(tl.paused).to.equal(true);
    expect(getChildAtIndex(tl, 0).paused).to.equal(true);
    expect(getChildAtIndex(tl, 1).paused).to.equal(true);
    expect($target.getAttribute('style')).to.equal(null);
  });

  test('Revert a timeline with existing inline styles and clean newly added inline styles', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.style.height = '100px';
    $target.style.transform = 'translateY(100px)';
    const tl = createTimeline({defaults: {ease: 'linear'}})
    .add($target, {
      width: 32,
      height: 200,
    })
    .add($target, {
      width: 64,
      height: 400,
      translateX: 200,
      translateY: 200,
    });
    tl.seek(1500);
    tl.revert();
    expect(tl._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 0)._cancelled).to.equal(1);
    expect(getChildAtIndex(tl, 1)._cancelled).to.equal(1);
    expect(tl.paused).to.equal(true);
    expect(getChildAtIndex(tl, 0).paused).to.equal(true);
    expect(getChildAtIndex(tl, 1).paused).to.equal(true);
    expect($target.getAttribute('style')).to.equal('transform: translateY(100px); height: 100px;');
  });

  test('Reset a playing animation', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      translateX: 200,
      translateY: 200,
      autoplay: false,
      duration: 1000,
      loop: 1
    });
    expect(animation1.currentTime).to.equal(0);
    // expect(animation1.progress).to.equal(0);
    expect(animation1.paused).to.equal(true);
    expect(animation1.began).to.equal(false);
    expect(animation1.completed).to.equal(false);
    expect(animation1.currentIteration).to.equal(0);
    animation1.seek(1500);
    animation1.resume();
    expect(animation1.currentTime).to.equal(1500);
    // expect(animation1.progress).to.equal(.75);
    expect(animation1.paused).to.equal(false);
    expect(animation1.began).to.equal(true);
    expect(animation1.completed).to.equal(false);
    expect(animation1.currentIteration).to.equal(1);
    animation1.pause();
    animation1.seek(2000);
    expect(animation1.currentTime).to.equal(2000);
    // expect(animation1.progress).to.equal(1);
    expect(animation1.paused).to.equal(true);
    expect(animation1.began).to.equal(true);
    expect(animation1.completed).to.equal(true);
    expect(animation1.currentIteration).to.equal(1);
    animation1.seek(500);
    animation1.resume();
    animation1.reset();
    expect(animation1.currentTime).to.equal(0);
    // expect(animation1.progress).to.equal(0);
    expect(animation1.paused).to.equal(true);
    expect(animation1.began).to.equal(false);
    expect(animation1.completed).to.equal(false);
    expect(animation1.currentIteration).to.equal(0);
    animation1.pause();
  });

  test('Reset a playing timeline', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const tl = createTimeline({
      autoplay: false,
      duration: 1000,
      loop: 1
    })
    .add($target, {
      width: 32,
      height: 200,
    })
    .add($target, {
      width: 64,
      height: 400,
      translateX: 200,
      translateY: 200,
    });

    expect(tl.currentTime).to.equal(0);
    expect(tl.progress).to.equal(0);
    expect(tl.paused).to.equal(true);
    expect(tl.began).to.equal(false);
    expect(tl.completed).to.equal(false);
    expect(tl.currentIteration).to.equal(0);
    forEachChildren(tl, child => {
      expect(child.currentTime).to.equal(0);
      expect(child.progress).to.equal(0);
      expect(child.paused).to.equal(true);
      expect(child.began).to.equal(false);
      expect(child.completed).to.equal(false);
      expect(child.currentIteration).to.equal(0);
    });
    tl.seek(3000);
    tl.resume();
    expect(tl.currentTime).to.equal(3000);
    expect(tl.progress).to.equal(.75);
    expect(tl.paused).to.equal(false);
    expect(tl.began).to.equal(true);
    expect(tl.completed).to.equal(false);
    expect(tl.currentIteration).to.equal(1);
    tl.pause();
    tl.seek(4000);
    expect(tl.currentTime).to.equal(4000);
    expect(tl.progress).to.equal(1);
    expect(tl.paused).to.equal(true);
    expect(tl.began).to.equal(true);
    expect(tl.completed).to.equal(true);
    expect(tl.currentIteration).to.equal(1);
    forEachChildren(tl, child => {
      expect(child.paused).to.equal(true);
      expect(child.began).to.equal(true);
      expect(child.completed).to.equal(true);
    });
    tl.seek(500);
    tl.resume();
    tl.reset();
    expect(tl.currentTime).to.equal(0);
    expect(tl.progress).to.equal(0);
    expect(tl.paused).to.equal(true);
    expect(tl.began).to.equal(false);
    expect(tl.completed).to.equal(false);
    expect(tl.currentIteration).to.equal(0);
    forEachChildren(tl, child => {
      expect(child.currentTime).to.equal(0);
      expect(child.progress).to.equal(0);
      expect(child.paused).to.equal(true);
      expect(child.began).to.equal(false);
      expect(child.completed).to.equal(false);
      expect(child.currentIteration).to.equal(0);
    });
    tl.pause();
  });

  test('Reseting an animation should set its values back to their initial states', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const ogY = utils.get($target, 'y');
    animate($target, {
      y: -100,
      autoplay: false,
      duration: 1000,
      loop: 1,
    })
    .reset();
    const newY = utils.get($target, 'y');
    expect(newY).to.equal(ogY);
  });

  test('Reseting a timeline should set its values back to their initial states', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const ogY = utils.get($target, 'y');
    const tl = createTimeline({ autoplay: false })
    .add($target, { y: -100, duration: 500 }, 1000)
    .add($target, { y: 100, duration: 500 }, 2000)
    .reset();
    const newY = utils.get($target, 'y');
    expect(newY).to.equal(ogY);
  });

  test('Reset a cancelled animation', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      translateX: 200,
      translateY: 200,
      duration: 1000,
      loop: 1
    });
    expect(animation1._cancelled).to.equal(0);
    expect(animation1.currentTime).to.equal(0);
    // expect(animation1.progress).to.equal(0);
    expect(animation1.paused).to.equal(false);
    expect(animation1.began).to.equal(false);
    expect(animation1.completed).to.equal(false);
    expect(animation1.currentIteration).to.equal(0);
    animation1.seek(1500);
    animation1.cancel();
    expect(animation1._cancelled).to.equal(1);
    expect(animation1.currentTime).to.equal(1500);
    // expect(animation1.progress).to.equal(.75);
    expect(animation1.paused).to.equal(true);
    expect(animation1.began).to.equal(true);
    expect(animation1.completed).to.equal(false);
    expect(animation1.currentIteration).to.equal(1);
    animation1.reset();
    expect(animation1._cancelled).to.equal(0);
    expect(animation1.currentTime).to.equal(0);
    // expect(animation1.progress).to.equal(0);
    expect(animation1.paused).to.equal(true);
    expect(animation1.began).to.equal(false);
    expect(animation1.completed).to.equal(false);
    expect(animation1.currentIteration).to.equal(0);
    animation1.pause();
  });

  test('Reset a cancelled timeline', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const tl = createTimeline({
      duration: 1000,
      loop: 1
    })
    .add($target, {
      width: 32,
      height: 200,
    })
    .add($target, {
      width: 64,
      height: 400,
      translateX: 200,
      translateY: 200,
    });

    expect(tl._cancelled).to.equal(0);
    expect(tl.currentTime).to.equal(0);
    expect(tl.progress).to.equal(0);
    expect(tl.paused).to.equal(false);
    expect(tl.began).to.equal(false);
    expect(tl.completed).to.equal(false);
    expect(tl.currentIteration).to.equal(0);
    forEachChildren(tl, child => {
      expect(child._cancelled).to.equal(0);
      expect(child.currentTime).to.equal(0);
      expect(child.progress).to.equal(0);
      expect(child.paused).to.equal(true);
      expect(child.began).to.equal(false);
      expect(child.completed).to.equal(false);
    });
    tl.seek(3000);
    tl.cancel();
    expect(tl._cancelled).to.equal(1);
    expect(tl.currentTime).to.equal(3000);
    expect(tl.progress).to.equal(.75);
    expect(tl.paused).to.equal(true);
    expect(tl.began).to.equal(true);
    expect(tl.completed).to.equal(false);
    expect(tl.currentIteration).to.equal(1);
    forEachChildren(tl, child => {
      expect(child._cancelled).to.equal(1);
      expect(child.paused).to.equal(true);
    });
    tl.reset();
    expect(tl._cancelled).to.equal(0);
    expect(tl.currentTime).to.equal(0);
    expect(tl.progress).to.equal(0);
    expect(tl.paused).to.equal(true);
    expect(tl.began).to.equal(false);
    expect(tl.completed).to.equal(false);
    expect(tl.currentIteration).to.equal(0);
    forEachChildren(tl, child => {
      expect(child._cancelled).to.equal(0);
      expect(child.currentTime).to.equal(0);
      expect(child.progress).to.equal(0);
      expect(child.paused).to.equal(true);
      expect(child.began).to.equal(false);
      expect(child.completed).to.equal(false);
    });
    tl.pause();
  });

  test('Refresh an animation', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.setAttribute('data-width', '128px');
    const animation1 = animate($target, {
      width: $el => $el.dataset.width,
      duration: 100,
      autoplay: false
    });
    animation1.seek(100);
    expect($target.style.width).to.equal('128px');
    $target.setAttribute('data-width', '256px');
    animation1.refresh().restart().seek(100);
    expect($target.style.width).to.equal('256px');
  });

  test('Refresh an animation with relative values', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      x: '+=50',
      rotate: () => '+=10',
      duration: 100,
      autoplay: false
    });
    animation1.seek(100);
    expect(utils.get($target, 'x')).to.equal('50px');
    expect(utils.get($target, 'rotate')).to.equal('10deg');
    animation1.refresh().restart().seek(100);
    // Only function based value should refresh
    expect(utils.get($target, 'x')).to.equal('50px');
    expect(utils.get($target, 'rotate')).to.equal('20deg');
  });

  test('Refresh an animation from value', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.setAttribute('data-width', '200px');
    const animation1 = animate($target, {
      width: [() => $target.dataset.width, '400px'],
      duration: 100,
      ease: 'linear',
      autoplay: false
    });
    animation1.seek(0);
    expect($target.style.width).to.equal('200px');
    animation1.seek(50);
    expect($target.style.width).to.equal('300px');
    animation1.seek(100);
    expect($target.style.width).to.equal('400px');
    $target.setAttribute('data-width', '100px');
    animation1.refresh().restart().seek(0);
    expect($target.style.width).to.equal('100px');
    animation1.seek(50);
    expect($target.style.width).to.equal('250px');
    animation1.seek(100);
    expect($target.style.width).to.equal('400px');
  });

  test('Refresh an animation from value with unit conversion', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.setAttribute('data-width', '50vw');
    const animation1 = animate($target, {
      width: [() => $target.dataset.width, '400px'],
      duration: 100,
      ease: 'linear',
      autoplay: false
    });
    const initialFromWidth = parseFloat($target.style.width);
    animation1.seek(100);
    expect($target.style.width).to.equal('400px');
    $target.setAttribute('data-width', '25vw');
    animation1.refresh().restart().seek(0);
    const refreshedFromWidth = parseFloat($target.style.width);
    // After refresh, from value should be recalculated (25vw converted to px)
    expect(refreshedFromWidth).to.be.below(initialFromWidth);
    animation1.seek(100);
    expect($target.style.width).to.equal('400px');
  });

  test('Refresh an animation with from / to values', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.setAttribute('data-from', '100px');
    $target.setAttribute('data-to', '200px');
    const animation1 = animate($target, {
      width: [() => $target.dataset.from, () => $target.dataset.to],
      duration: 100,
      ease: 'linear',
      autoplay: false
    });
    animation1.seek(0);
    expect($target.style.width).to.equal('100px');
    animation1.seek(100);
    expect($target.style.width).to.equal('200px');
    $target.setAttribute('data-from', '50px');
    $target.setAttribute('data-to', '150px');
    animation1.refresh().restart().seek(0);
    expect($target.style.width).to.equal('50px');
    animation1.seek(50);
    expect($target.style.width).to.equal('100px');
    animation1.seek(100);
    expect($target.style.width).to.equal('150px');
  });

  test('Refresh an animation with from, to, unit conversion and relative operator', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.setAttribute('data-from', '10vw');
    const animation1 = animate($target, {
      width: [() => $target.dataset.from, () => '+=100'],
      duration: 100,
      ease: 'linear',
      autoplay: false
    });
    animation1.seek(0);
    const initialFromWidth = parseFloat($target.style.width);
    animation1.seek(100);
    const initialToWidth = parseFloat($target.style.width);
    // To value should be from + 100px
    expect(initialToWidth).to.equal(initialFromWidth + 100);
    $target.setAttribute('data-from', '20vw');
    animation1.refresh().restart().seek(0);
    const refreshedFromWidth = parseFloat($target.style.width);
    // After refresh, from value should be larger (20vw > 10vw)
    expect(refreshedFromWidth).to.be.above(initialFromWidth);
    animation1.seek(100);
    const refreshedToWidth = parseFloat($target.style.width);
    // To value should still be from + 100px (relative operator applied to new from)
    expect(refreshedToWidth).to.equal(refreshedFromWidth + 100);
  });

  test('Refresh a timeline', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    $target.setAttribute('data-width', '128px');
    const tl = createTimeline();
    tl.add($target, {
      width: $el => $el.dataset.width,
      duration: 100,
      autoplay: false
    }).add({
      duration: 100
    });
    tl.seek(200);
    expect($target.style.width).to.equal('128px');
    $target.setAttribute('data-width', '256px');
    tl.refresh().restart().seek(200);
    expect($target.style.width).to.equal('256px');
  });

  test('Stretch a timer', () => {
    const timer1 = createTimer({
      duration: 1273,
      autoplay: false,
    });
    expect(timer1.duration).to.equal(1273);
    for (let i = 0, l = 9999; i < l; i++) {
      const newTime = 1 + i;
      timer1.stretch(newTime);
      expect(timer1.duration).to.equal(newTime);
      expect(timer1.iterationDuration).to.equal(newTime);
    }
    timer1.stretch(0);
    expect(timer1.duration).to.equal(minValue);
    expect(timer1.iterationDuration).to.equal(minValue);
  });

  test('Stretch a looped timer', () => {
    const timer1 = createTimer({
      duration: 1273,
      autoplay: false,
      loop: 3,
    });
    expect(timer1.duration).to.equal(1273 * 4);
    for (let i = 0, l = 9999; i < l; i++) {
      const newTime = 1 + i;
      timer1.stretch(newTime);
      expect(timer1.duration).to.equal(newTime);
      expect(timer1.iterationDuration).to.equal(newTime / timer1.iterationCount);
    }
    timer1.stretch(0);
    expect(timer1.duration).to.equal(minValue);
    expect(timer1.iterationDuration).to.equal(minValue);
  });

  test('Stretch an animation', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      width: [{to: 100, duration: 100}, {to: 100, duration: 200}],
      duration: 100,
      autoplay: false
    });
    expect(animation1.duration).to.equal(300);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(100);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(200);
    animation1.stretch(600);
    expect(animation1.duration).to.equal(600);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(200);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(400);
    animation1.stretch(30);
    expect(animation1.duration).to.equal(30);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(10);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(20);
    animation1.stretch(0);
    expect(animation1.duration).to.equal(minValue);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(minValue);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(minValue);
    // NOTE: Once an animation duration has been stretched to 0, all tweens are set to 0
    animation1.stretch(30);
    expect(animation1.duration).to.equal(30);
    expect(getChildAtIndex(animation1, 0)._updateDuration).to.equal(30);
    expect(getChildAtIndex(animation1, 1)._updateDuration).to.equal(30);
  });

  test('Stretch an timeline', () => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const tl = createTimeline()
    .add($target, {
      width: [{to: 100, duration: 100}, {to: 100, duration: 200}],
    })
    .add($target, {
      width: [{to: 100, duration: 100}, {to: 100, duration: 200}],
    })
    expect(tl.duration).to.equal(600);
    expect(getChildAtIndex(tl, 0).duration).to.equal(300);
    expect(getChildAtIndex(tl, 1).duration).to.equal(300);
    tl.stretch(1200);
    expect(tl.duration).to.equal(1200);
    expect(getChildAtIndex(tl, 0).duration).to.equal(600);
    expect(getChildAtIndex(tl, 1).duration).to.equal(600);
    tl.stretch(300);
    expect(tl.duration).to.equal(300);
    expect(getChildAtIndex(tl, 0).duration).to.equal(150);
    expect(getChildAtIndex(tl, 1).duration).to.equal(150);
  });

  test('Seek an animation', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const animation1 = animate($target, {
      width: 200,
      duration: 200,
      autoplay: false
    });
    expect(animation1.currentTime).to.equal(0);
    expect(animation1.progress).to.equal(0);
    expect(animation1.began).to.equal(false);
    expect(animation1.completed).to.equal(false);
    animation1.seek(100);
    expect(animation1.currentTime).to.equal(100);
    expect(animation1.progress).to.equal(.5);
    expect(animation1.began).to.equal(true);
    expect(animation1.completed).to.equal(false);
    animation1.seek(200);
    expect(animation1.currentTime).to.equal(200);
    expect(animation1.progress).to.equal(1);
    expect(animation1.began).to.equal(true);
    expect(animation1.completed).to.equal(true);
    animation1.seek(150);
    expect(animation1.currentTime).to.equal(150);
    expect(animation1.progress).to.equal(.75);
    expect(animation1.began).to.equal(true);
    expect(animation1.completed).to.equal(false);
    animation1.resume();
    createTimer({
      duration: 65,
      onComplete: () => {
        animation1.pause();
        expect(animation1.currentTime).to.equal(200);
        expect(animation1.progress).to.equal(1);
        expect(animation1.completed).to.equal(true);
        resolve();
      }
    });
  });

  test('Seek a timeline', resolve => {
    const $target = /** @type {HTMLElement} */(document.querySelector('#target-id'));
    const tl = createTimeline({ autoplay: false })
      .add($target, { width: 200, duration: 100 })
      .add($target, { width: 400, duration: 100 });
    expect(tl.currentTime).to.equal(0);
    expect(tl.progress).to.equal(0);
    expect(tl.began).to.equal(false);
    expect(tl.completed).to.equal(false);
    tl.seek(100);
    expect(tl.currentTime).to.equal(100);
    expect(tl.progress).to.equal(.5);
    expect(tl.began).to.equal(true);
    expect(tl.completed).to.equal(false);
    tl.seek(200);
    expect(tl.currentTime).to.equal(200);
    expect(tl.progress).to.equal(1);
    expect(tl.began).to.equal(true);
    expect(tl.completed).to.equal(true);
    tl.seek(150);
    expect(tl.currentTime).to.equal(150);
    expect(tl.progress).to.equal(.75);
    expect(tl.began).to.equal(true);
    expect(tl.completed).to.equal(false);
    tl.resume();
    createTimer({
      duration: 65,
      onComplete: () => {
        tl.pause();
        expect(tl.currentTime).to.equal(200);
        expect(tl.progress).to.equal(1);
        expect(tl.completed).to.equal(true);
        resolve();
      }
    });
  });

});

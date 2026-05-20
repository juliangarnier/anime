import {
  expect,
  getChildAtIndex,
} from '../utils.js';

import {
  createTimeline,
  eases,
  steps,
  utils,
  createTimer,
  animate,
} from '../../dist/modules/index.js';

import {
  compositionTypes,
  minValue,
} from '../../dist/modules/core/consts.js';

suite('Timelines', () => {
  function createTL() {
    return createTimeline({
      id: 'Test',
      defaults: {
        duration: 50, // Can be inherited
        ease: 'outExpo', // Can be inherited
        delay: function(_, i) { return 10 + (i * 20) }, // Can be inherited
      },
      alternate: true, // Is not inherited
      loop: 1 // Is not inherited
    })
    .add('.target-class', {
      translateX: 250,
    })
    .add('.target-class', {
      opacity: .5,
      scale: 2
    })
    .add('#target-id', {
      rotate: 180
    })
    .add('.target-class', {
      translateX: 0,
      scale: 1
    });
  }

  test('Timeline children position should be added to their delay', () => {
    const tl = createTimeline({
      autoplay: false,
      defaults: {
        duration: 50
      }
    })
    .add('#target-id', {
      translateX: 100,
      delay: 200
    })
    .add('#target-id', {
      translateX: -100,
      delay: 300
    })
    .add('#target-id', {
      translateX: 0,
      delay: 50
    }, '+=150')
    .add('#target-id', {
      translateX: 100,
    }, '+=50')

    expect(getChildAtIndex(tl, 0)._offset + getChildAtIndex(tl, 0)._delay).to.equal(200);
    expect(getChildAtIndex(tl, 1)._offset + getChildAtIndex(tl, 1)._delay).to.equal(550);
    expect(getChildAtIndex(tl, 2)._offset + getChildAtIndex(tl, 2)._delay).to.equal(800);
    expect(getChildAtIndex(tl, 3)._offset + getChildAtIndex(tl, 3)._delay).to.equal(900);
  });

  test('Timeline duration should be equal to the sum of all the animation absoluteEndTime multiply by the iterations count', () => {
    const parameterInheritanceTL = createTL();
    expect(parameterInheritanceTL.duration).to.equal(420 * 2);
  });

  test('Timeline default parameters', () => {
    const tl = createTimeline({
      loop: 1,
      reversed: true,
      defaults: {
        duration: 10,
        ease: 'inOut',
        alternate: true,
        loop: 3,
        composition: 'none',
      }
    })
    .add('#target-id', {
      translateX: 100,
      duration: 15
    })
    .add('#target-id', {
      translateX: 200,
      reversed: false,
      ease: 'outExpo',
      composition: 'blend'
    })

    expect(getChildAtIndex(tl, 0)._reversed).to.equal(0);
    expect(getChildAtIndex(tl, 1)._reversed).to.equal(0);
    expect(tl.duration).to.equal(200); // (( 15 * 4 ) + ( 10 * 4 )) * 2 = 200
    expect(getChildAtIndex(tl, 0)._head._ease(.75)).to.equal(eases.inOut()(.75));
    expect(getChildAtIndex(tl, 1)._head._ease(.75)).to.equal(eases.outExpo(.75));
    expect(getChildAtIndex(tl, 0)._head._composition).to.equal(compositionTypes['none']);
    expect(getChildAtIndex(tl, 1)._head._composition).to.equal(compositionTypes['blend']);
  });

  test('Basic timeline time positions', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 })
    .add('#target-id', { translateX: 200 })
    .add('#target-id', { translateX: 300 });

    expect(getChildAtIndex(tl, 0)._offset).to.equal(0);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(10);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(20);
    expect(tl.duration).to.equal(30);
  });

  test('Abslolute timeline time positions', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, 50)
    .add('#target-id', { translateX: 200 }, 25)
    .add('#target-id', { translateX: 300 }, 100);

    expect(getChildAtIndex(tl, 0)._offset).to.equal(50);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(25);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(100);
    expect(tl.duration).to.equal(110);
  });

  test('Abslolute timeline time positions with shared child params object', () => {
    const childParams = { translateX: 100 };
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', childParams, 50)
    .add('#target-id', childParams, 25)
    .add('#target-id', childParams, 100);

    expect(getChildAtIndex(tl, 0)._offset).to.equal(50);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(25);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(100);
    expect(tl.duration).to.equal(110);
  });

  test('Relative timeline time positions', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, '+=20') // 0 + 20 = 20
    .add('#target-id', { translateX: 200 }, '*=2') // (20 + 10) * 2 = 60
    .add('#target-id', { translateX: 300 }, '-=50'); // (60 + 10) - 50 = 20

    expect(getChildAtIndex(tl, 0)._offset).to.equal(20);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(60);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(20);
    expect(tl.duration).to.equal(70); // 60 + 10
  });

  test('Previous operator with relative values should be properly parsed', () => {
    const $target = document.querySelector('#target-id');
    const tl = createTimeline({ defaults: { duration: 10 } }).add($target, {
      translateX: 100
    }).add($target, {
      rotate: 100
    }, '<<+=100')

    expect(getChildAtIndex(tl, 1)._offset).to.equal(100);
  });

  test('Previous animation end position', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, '+=40')
    .add('#target-id', { translateX: 200 }, '-=30') // 40 + 10 - 30 = 20
    .add('#target-id', { translateX: 300 }, '<'); // 20 + 10 = 30

    expect(getChildAtIndex(tl, 0)._offset).to.equal(40);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(20);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(30);
    expect(tl.duration).to.equal(50);
  });

  test('Previous animation end position with relative value', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, '+=40')
    .add('#target-id', { translateX: 200 }, '-=30') // 40 + 10 - 30 = 20
    .add('#target-id', { translateX: 300 }, '<+=5'); // 20 + 10 + 5 = 35

    expect(getChildAtIndex(tl, 2)._offset).to.equal(35);
  });

  test('Previous animation start position', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, '+=40')
    .add('#target-id', { translateX: 200 }, '-=30') // 40 + 10 - 30 = 20
    .add('#target-id', { translateX: 300 }, '<<'); // 20 = 20

    expect(getChildAtIndex(tl, 0)._offset).to.equal(40);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(20);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(20);
    expect(tl.duration).to.equal(50);
  });

  test('Previous animation start position with relative values', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, '+=40')
    .add('#target-id', { translateX: 200 }, '-=30') // 40 + 10 - 30 = 20
    .add('#target-id', { translateX: 300 }, '<<+=5'); // 20 + 5 = 25

    expect(getChildAtIndex(tl, 0)._offset).to.equal(40);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(20);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(25);
    expect(tl.duration).to.equal(50);
  });

  test('Mixed timeline time positions types', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .add('#target-id', { translateX: 100 }, 50)
    .add('#target-id', { translateX: 200 }, '-=20') // (50 + 10) - 20 = 40
    .add('#target-id', { translateX: 300 }, 0);

    expect(getChildAtIndex(tl, 0)._offset).to.equal(50);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(40);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(0);
    expect(tl.duration).to.equal(60); // 50 + 10
  });

  test('Timeline labels positions', () => {
    const tl = createTimeline({ defaults: { duration: 10 } })
    .label('A starts', 50)
    .label('B starts', 100)
    .label('C') // Added without a position before any animations
    .add('#target-id', { translateX: 50 }, 'A starts')
    .label('A ends', '<')
    .label('D') // Added without a position after an animation
    .add('#target-id', { translateX: -50 }, 'B starts')
    .add('#target-id', { translateX: 0 }, 'A ends')
    .add('#target-id', { translateX: 100 }, 'C')
    .add('#target-id', { translateX: 150 }, 'D')

    expect(tl.labels['A starts']).to.equal(50);
    expect(tl.labels['B starts']).to.equal(100);
    expect(tl.labels['A ends']).to.equal(50 + 10);
    expect(tl.labels['C']).to.equal(0);
    expect(tl.labels['D']).to.equal(50 + 10);
    expect(getChildAtIndex(tl, 0)._offset).to.equal(tl.labels['A starts']);
    expect(getChildAtIndex(tl, 1)._offset).to.equal(tl.labels['B starts']);
    expect(getChildAtIndex(tl, 2)._offset).to.equal(tl.labels['A ends']);
    expect(getChildAtIndex(tl, 3)._offset).to.equal(tl.labels['C']);
    expect(getChildAtIndex(tl, 4)._offset).to.equal(tl.labels['D']);
    expect(tl.duration).to.equal(110); // 100 + 10
  });

  test('Correct tween overiding when adding an animation before multiple keyframe start time on the same property', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      autoplay: false,
      defaults: {
        duration: 100,
        ease: 'linear',
      }
    })
    .add($target, { translateX: 100, top: 100 })
    .add($target, {
      translateX: [
        { to: 250, duration: 50, delay: 50 },
        { to: 350, duration: 100 },
        { to: 150, duration: 150 }
      ]
    })
    .add($target, { translateX: 15, duration: 200 }, '-=275')
    .add($target, { top: 25, duration: 50 }, 0)

    // expect($target.style.transform).to.equal('translateX(0px)');
    // expect($target.style.top).to.equal('0px');
    expect($target.style.transform).to.equal('');
    expect($target.style.top).to.equal('');
    tl.seek(175);
    expect($target.style.transform).to.equal('translateX(175px)');
    // expect($target.style.top).to.equal('25px');
    expect($target.style.top).to.equal('');
    tl.seek(275);
    expect($target.style.transform).to.equal('translateX(95px)');
    tl.seek(375);
    expect($target.style.transform).to.equal('translateX(15px)');
    tl.seek(tl.duration);
    expect($target.style.transform).to.equal('translateX(15px)');
    tl.seek(275);
    expect($target.style.transform).to.equal('translateX(95px)');
  });

  test('Correct tween composition with multiple timelines', () => {
    const [ $target ] = utils.$('#target-id');
    const tl1 = createTimeline({
      autoplay: false,
      defaults: {
        duration: 100,
        ease: 'linear',
      }
    })
    .add($target, { x: 100 })
    .add($target, { x: 200 })
    .init();

    tl1.seek(200);

    const tl2 = createTimeline({
      autoplay: false,
      defaults: {
        duration: 100,
        ease: 'linear',
      }
    })
    .add($target, { x: -100 })
    .init();

    tl2.seek(0);

    // TL 2 should correctly starts at 200px
    expect($target.style.transform).to.equal('translateX(200px)');
  });

  test('Correct initial tween value on loop', () => {
    const [ $target1, $target2 ] = utils.$('.target-class');
    const tl = createTimeline({
      autoplay: false,
      loop: 2,
      defaults: {
        duration: 100,
        ease: 'linear',
      }
    })
    .add($target1, { translateX: 100 })
    .add($target1, { opacity: 0 })
    .add($target2, { translateX: 100 })
    .add($target2, { opacity: 0 })

    expect($target1.style.transform).to.equal('');
    expect($target1.style.top).to.equal('');
    expect($target2.style.transform).to.equal('');
    expect($target2.style.top).to.equal('');
    tl.seek(50);
    expect($target1.style.transform).to.equal('translateX(50px)');
    expect($target1.style.opacity).to.equal('');
    expect($target2.style.transform).to.equal('');
    expect($target2.style.opacity).to.equal('');
    tl.seek(100);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('1');
    expect($target2.style.transform).to.equal('');
    expect($target2.style.opacity).to.equal('');
    tl.seek(150);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('0.5');
    expect($target2.style.transform).to.equal('');
    expect($target2.style.opacity).to.equal('');
    tl.seek(200);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('0');
    expect($target2.style.transform).to.equal('translateX(0px)');
    expect($target2.style.opacity).to.equal('');
    tl.seek(250);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('0');
    expect($target2.style.transform).to.equal('translateX(50px)');
    expect($target2.style.opacity).to.equal('');
    tl.seek(300);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('0');
    expect($target2.style.transform).to.equal('translateX(100px)');
    expect($target2.style.opacity).to.equal('1');
    tl.seek(350);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('0');
    expect($target2.style.transform).to.equal('translateX(100px)');
    expect($target2.style.opacity).to.equal('0.5');
    tl.seek(400);
    expect($target1.style.transform).to.equal('translateX(0px)');
    expect($target1.style.opacity).to.equal('1');
    expect($target2.style.transform).to.equal('translateX(0px)');
    expect($target2.style.opacity).to.equal('1');
    tl.seek(550);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target1.style.opacity).to.equal('0.5');
    expect($target2.style.transform).to.equal('translateX(0px)');
    expect($target2.style.opacity).to.equal('1');
  });

  test('Correct tween playback with multiple timelines', resolve => {
    const target = {x: 0};

    setTimeout(() => {
      const tl1 = createTimeline({
        defaults: {
          duration: 100,
          ease: 'linear',
        }
      })
      .add(target, { x: 100 })
      .init();
    }, 50)

    setTimeout(() => {
      const tl2 = createTimeline({
        defaults: {
          duration: 100,
          ease: 'linear',
        }
      })
      .add(target, { x: -100 })
      .init();
    }, 100)

    setTimeout(() => {
      expect(target.x).to.lessThan(0);
      resolve();
    }, 150)
  });

  test('Timeline values', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      autoplay: false,
      defaults: {
        duration: 100,
        ease: 'linear',
      }
    })
    .add($target, { translateX: 100 })
    .add($target, { translateX: 200 }, '-=50')
    .add($target, { translateX: 300 }, '-=50')
    .add($target, {
      translateX: [
        { to: 250, duration: 50, delay: 50 },
        { to: 350, duration: 100 },
        { to: 150, duration: 150 }
      ]
    });

    expect($target.style.transform).to.equal('');
    tl.seek(25);
    expect($target.style.transform).to.equal('translateX(25px)');
    tl.seek(100);
    expect($target.style.transform).to.equal('translateX(125px)');
    tl.seek(150);
    expect($target.style.transform).to.equal('translateX(212.5px)');
    tl.seek(tl.duration);
    expect($target.style.transform).to.equal('translateX(150px)');
  });

  test('Alternate direction timeline children should correctly render on seek after the animation end', resolve => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      loop: 2,
      alternate: true,
      onComplete: self => {
        self.seek(40);
        expect($target.style.transform).to.equal('translateX(175px)');
        resolve();
      }
    })
    .add($target, {
      translateX: -100,
      duration: 10,
      loop: 2,
      alternate: true,
      ease: 'linear',
    })
    .add($target, {
      translateX: 400,
      duration: 10,
      loop: 2,
      alternate: true,
      ease: 'linear',
    }, '-=5')
  });

  test('Alternate direction timeline children should correctly render on seek midway', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      loop: 1,
      alternate: true,
      autoplay: false,
    })
    .add($target, {
      translateX: 100,
      duration: 10,
      alternate: true,
      ease: 'linear',
    })
    .add($target, {
      translateX: 200,
      translateY: 100,
      duration: 10,
      alternate: true,
      ease: 'linear',
    }, '-=5')

    tl.seek(15)
    expect($target.style.transform).to.equal('translate(200px, 100px)');
    tl.seek(16)
    expect($target.style.transform).to.equal('translate(185px, 90px)');
    tl.seek(15)
    expect($target.style.transform).to.equal('translate(200px, 100px)');
    tl.seek(14)
    expect($target.style.transform).to.equal('translate(185px, 90px)');
  });

  test('Previous tween before last shouln\'t render on loop', resolve => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      loop: 3,
      onLoop: self => {
        self.pause();
        expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.be.above(39);
        resolve();
      }
    })
    .add($target, {
      translateY: -100,
      duration: 100,
    })
    .add($target, {
      translateY: 50,
      duration: 100,
    })
  });

  test('Nested timelines', resolve => {
    const [ $target ] = utils.$('#target-id');
    let timerLog = false;

    const timer = createTimer({
      duration: 30,
      onUpdate: () => { timerLog = true }
    });

    const animation = animate($target, {
      x: 100,
      duration: 30,
    });

    createTimeline({
      onComplete: self => {
        expect(self.duration).to.equal(50);
        expect(timerLog).to.equal(true);
        expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(100);
        resolve();
      }
    })
    .sync(timer)
    .sync(animation, 20);

    expect(timerLog).to.equal(false);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(0);
  });

  test('Add animation and timers as targets', resolve => {
    const [ $target ] = utils.$('#target-id');
    let timerLog = false;

    const timer = createTimer({
      onUpdate: () => { timerLog = true }
    });

    const animation = animate($target, {
      x: 100,
    });

    createTimeline({
      onComplete: self => {
        expect(self.duration).to.equal(50);
        expect(timerLog).to.equal(true);
        expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(100);
        resolve();
      }
    })
    .add(timer, {
      currentTime: timer.duration,
      duration: 30,
    })
    .add(animation, {
      currentTime: animation.duration,
      duration: 30,
    }, 20);

    expect(timerLog).to.equal(false);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(0);
  });

  test('Add timers', resolve => {
    let timer1Log = false;
    let timer2Log = false;
    createTimeline({
      onComplete: () => {
        expect(timer1Log).to.equal(true);
        expect(timer2Log).to.equal(true);
        resolve();
      }
    })
    .add({
      duration: 30,
      onUpdate: () => { timer1Log = true }
    })
    .add({
      duration: 30,
      onUpdate: () => { timer2Log = true }
    }, 20)
  });

  test('Timeline .add() 0 duration animation', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({ autoplay: false })
    .add($target, {
      y: -100,
      duration: 0,
    }, 2000)
    .seek(2000) // y should be -100
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(-100);
  });

  test('Timeline .set()', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      autoplay: false
    })
    .set($target, {
      y: -300,
    }, 2000)
    .seek(2000)
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(-300);
  });

  test('Timeline mix .set() and .add()', () => {
    const [ $target ] = utils.$('#target-id');
    const tl = createTimeline({
      autoplay: false,
      defaults: {
        ease: 'linear',
      }
    })
    .set($target, { translateX: 50 })
    .add($target, {
      duration: 200,
      translateX: 100,
    })
    .set($target, { translateX: 200 })
    .add($target, {
      duration: 200,
      translateX: 400,
    })
    .set($target, {
      translateX: -100,
    }, 800)
    tl.seek(0);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(50);
    tl.seek(100);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(75);
    tl.seek(200);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(200);
    tl.seek(300);
    expect(Math.round(+$target.style.transform.replace(/[^\d.-]/g, ''))).to.equal(300);
    tl.seek(800);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(-100);
  });

  test('Call callbacks', resolve => {
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    const tl = createTimeline({
      onComplete: self => {
        expect(timer1Log).to.equal(1);
        expect(timer2Log).to.equal(1);
        expect(timer3Log).to.equal(1);
        expect(self.duration).to.equal(40);
        resolve();
      }
    })
    .call(() => {
      timer1Log += 1;
    }, 0)
    .call(() => {
      timer2Log += 1;
    }, 20)
    .call(() => {
      timer3Log += 1;
    }, 40);
  });

  test('Call callbacks on a 0 duration timeline', resolve => {
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    const tl = createTimeline({
      onComplete: self => {
        expect(timer1Log).to.equal(1);
        expect(timer2Log).to.equal(1);
        expect(timer3Log).to.equal(1);
        expect(self.duration).to.equal(minValue);
        resolve();
      }
    })
    .call(() => {
      timer1Log += 1;
    }, 0)
    .call(() => {
      timer2Log += 1;
    }, 0)
    .call(() => {
      timer3Log += 1;
    }, 0)
  });

  test('Call callbaks multiple time via seek', () => {
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    const tl = createTimeline({ autoplay: false })
    .call(() => { timer1Log += 1; }, 0)
    .call(() => { timer2Log += 1; }, 1000)
    .call(() => { timer3Log += 1; }, 2000);

    expect(timer1Log).to.equal(0);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);

    tl.seek(500);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);

    tl.seek(1000);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(1);
    expect(timer3Log).to.equal(0);

    tl.seek(2000);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(1);
    expect(timer3Log).to.equal(1);

    tl.seek(1000);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(2);
    expect(timer3Log).to.equal(2);

    tl.seek(0);

    expect(timer1Log).to.equal(2);
    expect(timer2Log).to.equal(2);
    expect(timer3Log).to.equal(2);

  });

  test('Call callbaks with alternate loops', () => {
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    const tl = createTimeline({ autoplay: false, alternate: true, loop: 3 })
    .call(() => { timer1Log += 1; }, 0)
    .call(() => { timer2Log += 1; }, 1000)
    .call(() => { timer3Log += 1; }, 2000);

    expect(timer1Log).to.equal(0);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);

    tl.seek(500);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);

    tl.seek(1500);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(1);
    expect(timer3Log).to.equal(0);

    tl.seek(2000);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(1);
    expect(timer3Log).to.equal(1);

    tl.seek(3000);

    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(2);
    expect(timer3Log).to.equal(1);

    tl.seek(4000);

    expect(timer1Log).to.equal(2);
    expect(timer2Log).to.equal(2);
    expect(timer3Log).to.equal(1);

  });

  test('Mixed .call and .add', () => {
    const $targets = utils.$(['.target-class:nth-child(1)', '.target-class:nth-child(2)', '.target-class:nth-child(3)']);
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    const tl = createTimeline({
      loop: 2,
      autoplay: false
    })
    .set($targets, {
      opacity: .5,
    }, 0)
    .add($targets, {
      id: 'test',
      duration: 500,
      opacity: [1, .5],
      delay: (el, i) => i * 500,
      ease: steps(1),
    }, 0)
    .call(() => { timer1Log += 1; }, 0)
    .call(() => { timer2Log += 1; }, 500)
    .call(() => { timer3Log += 1; }, 1000)
    .init()

    expect(timer1Log).to.equal(0);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);
    tl.seek(50);
    expect($targets[2].style.opacity).to.equal('0.5');
    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(0);
    expect(timer3Log).to.equal(0);
    tl.seek(600);
    expect($targets[2].style.opacity).to.equal('0.5');
    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(1);
    expect(timer3Log).to.equal(0);
    tl.seek(1000);
    expect(timer1Log).to.equal(1);
    expect(timer2Log).to.equal(1);
    expect(timer3Log).to.equal(1);
    expect($targets[2].style.opacity).to.equal('1');
  });

  test('.call with odd floating points values A', resolve => {
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    let timer4Log = 0;
    const tl = createTimeline({
      onComplete: () => {
        expect(timer1Log).to.equal(1);
        expect(timer2Log).to.equal(1);
        expect(timer3Log).to.equal(1);
        expect(timer4Log).to.equal(1);
        resolve();
      }
    })
    .call(() => ++timer1Log, 0)
    .call(() => ++timer2Log, 800)
    .call(() => ++timer3Log, 8700)
    .call(() => ++timer4Log, 8650)
    .seek(8650);
  });

  test('.call with odd floating points values B', resolve => {
    let timer1Log = 0;
    let timer2Log = 0;
    let timer3Log = 0;
    let timer4Log = 0;
    const tl = createTimeline({
      onComplete: () => {
        expect(timer1Log).to.equal(1);
        expect(timer2Log).to.equal(1);
        expect(timer3Log).to.equal(1);
        expect(timer4Log).to.equal(1);
        resolve();
      }
    })
    .call(() => ++timer1Log, 0)
    .call(() => ++timer2Log, 800)
    .call(() => ++timer3Log, 8000)
    .call(() => ++timer4Log, 8450)
    .seek(8400);
  });

  test('Set values should properly update on loop', () => {
    const $targets = utils.$(['.target-class:nth-child(1)', '.target-class:nth-child(2)', '.target-class:nth-child(3)']);
    const tl = createTimeline({
      loop: 2,
      autoplay: false
    })
    .set($targets, {
      opacity: .5,
    }, 0)
    .add($targets, {
      id: 'test',
      duration: 500,
      opacity: [1, .5],
      delay: (el, i) => i * 500,
      ease: steps(1),
    }, 0)
    .init()

    tl.seek(1250);
    expect($targets[2].style.opacity).to.equal('1');
    tl.seek(1750);
    expect($targets[2].style.opacity).to.equal('0.5');
  });

  test('Remove nested animations', resolve => {
    const [ $target ] = utils.$('#target-id');
    let timerLog = false;

    const timer = createTimer({
      duration: 30,
      onUpdate: () => { timerLog = true }
    });

    const animation = animate($target, {
      x: 100,
      duration: 30,
    });

    const tl = createTimeline({
      onComplete: self => {
        expect(self.duration).to.equal(50);
        expect(timerLog).to.equal(true);
        expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(0);
        resolve();
      }
    })
    .sync(timer)
    .sync(animation, 20);

    expect(timerLog).to.equal(false);
    expect(+$target.style.transform.replace(/[^\d.-]/g, '')).to.equal(0);

    tl.remove(animation);
  });

  test('Animating a child timeline progress should not corrupt parent render state via nested tick', () => {
    const [ $target1, $target2 ] = utils.$('.target-class');

    const innerTL = createTimeline({
      autoplay: false,
      defaults: { duration: 100, ease: 'linear' },
    })
    .add($target1, { translateX: 200 });

    let call1Count = 0;
    let call2Count = 0;

    const parentTL = createTimeline({
      autoplay: false,
      defaults: { ease: 'linear' },
    })
    .call(() => { call1Count += 1; }, 0)
    .add(innerTL, { progress: 1, duration: 200 })
    .add($target2, { translateY: 200, duration: 200 }, 0)
    .call(() => { call2Count += 1; }, 200);

    parentTL.seek(100);
    expect(call1Count).to.equal(1);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target2.style.transform).to.equal('translateY(100px)');

    parentTL.seek(200);
    expect(call2Count).to.equal(1);
    expect($target1.style.transform).to.equal('translateX(200px)');
    expect($target2.style.transform).to.equal('translateY(200px)');

    parentTL.seek(100);
    expect($target1.style.transform).to.equal('translateX(100px)');
    expect($target2.style.transform).to.equal('translateY(100px)');
    expect(call2Count).to.equal(2);

    parentTL.seek(0);
    expect(call1Count).to.equal(2);
  });

});


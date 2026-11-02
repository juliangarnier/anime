import {
  expect,
} from '../utils.js';

import {
  animate,
  createTimeline,
  createTimer,
  Timeline,
  utils,
} from '../../dist/modules/index.js';

function setupAnimationCallBack(callbackName, callbackFunc) {
  const parameters = {
    translateX: 100,
    autoplay: false,
    delay: 10,
    duration: 80,
  }
  parameters[callbackName] = callbackFunc;
  return parameters;
}

suite('Callbacks', () => {
  test('onBegin on animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', setupAnimationCallBack('onBegin', () => { callbackCheck += 1; }));

    expect(callbackCheck).to.equal(0);
    expect(animation.began).to.equal(false);
    // delay is not taken into account with seek(), so seek(10) actually move the playhead to 10ms + 10ms of delay
    animation.seek(5);
    expect(callbackCheck).to.equal(1);
    expect(animation.began).to.equal(true);
    animation.seek(80);
    expect(callbackCheck).to.equal(1);
    expect(animation.began).to.equal(true);
    animation.seek(0);
    expect(callbackCheck).to.equal(1);
    expect(animation.began).to.equal(false);
    animation.seek(5);
    expect(callbackCheck).to.equal(2);
    expect(animation.began).to.equal(true);
  });

  test('onBegin on looped animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', { loop: 2, ...setupAnimationCallBack('onBegin', () => { callbackCheck += 1; }) });

    expect(callbackCheck).to.equal(0);
    expect(animation.began).to.equal(false);
    animation.seek(5);
    expect(callbackCheck).to.equal(1);
    expect(animation.began).to.equal(true);
    animation.seek(80);
    expect(callbackCheck).to.equal(1);
    expect(animation.began).to.equal(true);
    animation.seek(85);
    expect(callbackCheck).to.equal(1);
    expect(animation.began).to.equal(true);
    animation.seek(240);
    expect(animation.began).to.equal(true);
    expect(callbackCheck).to.equal(1);
    animation.seek(100);
    expect(animation.began).to.equal(true);
    expect(callbackCheck).to.equal(1);
    animation.seek(0);
    expect(animation.began).to.equal(false);
    expect(callbackCheck).to.equal(1);
    animation.seek(5);
    expect(animation.began).to.equal(true);
    expect(callbackCheck).to.equal(2);
  });

  test('onBegin on timeline', () => {
    let tlCallbackCheck = 0;
    let tlAnim1CallbackCheck = 0;
    let tlAnim2CallbackCheck = 0;

    const tl = createTimeline(setupAnimationCallBack('onBegin', () => { tlCallbackCheck += 1; }));
    tl.add('#target-id', setupAnimationCallBack('onBegin', () => { tlAnim1CallbackCheck += 1; }))
    tl.add('#target-id', setupAnimationCallBack('onBegin', () => { tlAnim2CallbackCheck += 1; }))

    expect(tlCallbackCheck).to.equal(0);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(5);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(10);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(11);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(100);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(101);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(95);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(0);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(5);
    expect(tlCallbackCheck).to.equal(2);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(11);
    expect(tlCallbackCheck).to.equal(2);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(101);
    expect(tlCallbackCheck).to.equal(2);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(2);
  });

  test('onBegin on looped timeline', () => {
    let tlCallbackCheck = 0;
    let tlAnim1CallbackCheck = 0;
    let tlAnim2CallbackCheck = 0;

    const tl = createTimeline({loop: 2, ...setupAnimationCallBack('onBegin', () => { tlCallbackCheck += 1; })})
    .add('#target-id', setupAnimationCallBack('onBegin', () => { tlAnim1CallbackCheck += 1; }))
    .add('#target-id', setupAnimationCallBack('onBegin', () => { tlAnim2CallbackCheck += 1; }))
    .init();

    expect(tlCallbackCheck).to.equal(0);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(5);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(10);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(11);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(101);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1)
    tl.seek(191);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(160);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(10);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(11);
    expect(tlAnim1CallbackCheck).to.equal(3);
    expect(tlAnim2CallbackCheck).to.equal(1);
  });

  test('onBegin and onComplete on delayed timeline', resolve => {
    let tlBeginCheck = 0;
    let tlCompleteCheck = 0;
    let tlAnim1BeginCheck = 0;
    let tlAnim1CompleteCheck = 0;

    const startTime = new Date().getTime();

    const tl = createTimeline({
      delay: 1000,
      loop: 1,
      autoplay: false,
      onBegin: () => { tlBeginCheck += 1; },
      onComplete: () => {
        const endTime = new Date().getTime();
        tlCompleteCheck += 1;
        // Using a range between 50 and 100 instead of 75 because of time calculation inconsistencies
        expect(endTime - startTime).to.be.above(50);
        expect(endTime - startTime).to.be.below(100);
        expect(tlBeginCheck).to.equal(1);
        expect(tlCompleteCheck).to.equal(1);
        expect(tlAnim1BeginCheck).to.equal(1);
        expect(tlAnim1CompleteCheck).to.equal(1);
        resolve();
      },
    })
    .add('#target-id', {
      x: 100,
      duration: 0,
      onBegin: () => { tlAnim1BeginCheck += 1; },
      onComplete: () => { tlAnim1CompleteCheck += 1; },
    })
    .init();

    tl.seek(-75);

    expect(tlBeginCheck).to.equal(0);
    expect(tlCompleteCheck).to.equal(0);
    expect(tlAnim1BeginCheck).to.equal(0);
    expect(tlAnim1CompleteCheck).to.equal(0);

    tl.play();
  });

  test('onComplete on animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', setupAnimationCallBack('onComplete', () => { callbackCheck += 1; }));
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(50);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(0);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(100);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(true);
    animation.seek(50);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(false);
    animation.seek(100);
    expect(callbackCheck).to.equal(2);
    expect(animation.completed).to.equal(true);
  });

  test('onComplete on looped animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', { loop: 2, ...setupAnimationCallBack('onComplete', () => { callbackCheck += 1; }) });
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(10);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(80);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(240);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(true);
    animation.seek(0);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(false);
    animation.seek(80);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(false);
    animation.seek(240);
    expect(callbackCheck).to.equal(2);
    expect(animation.completed).to.equal(true);
  });

  test('onComplete on looped alternate animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', { loop: 1, alternate: true, ...setupAnimationCallBack('onComplete', () => { callbackCheck += 1; }) });
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(10);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(80);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(140);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(160);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(true);
  });

  test('onComplete on reversed animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', { reversed: true, ...setupAnimationCallBack('onComplete', () => { callbackCheck += 1; }) });
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(10);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(80);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(true);
  });

  test('onComplete after caling animation.reverse()', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', { reversed: true, ...setupAnimationCallBack('onComplete', () => { callbackCheck += 1; }) });
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(20);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.reverse();
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(80);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(true);
  });

  test('onComplete on looped reversed alternate animation', () => {
    let callbackCheck = 0;
    const animation = animate('#target-id', { loop: 1, alternate: true, reversed: true, ...setupAnimationCallBack('onComplete', () => { callbackCheck += 1; }) });
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(10);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(80);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(140);
    expect(callbackCheck).to.equal(0);
    expect(animation.completed).to.equal(false);
    animation.seek(160);
    expect(callbackCheck).to.equal(1);
    expect(animation.completed).to.equal(true);
  });

  test('onComplete on timeline', () => {
    let tlCallbackCheck = 0;
    let tlAnim1CallbackCheck = 0;
    let tlAnim2CallbackCheck = 0;

    const tl = createTimeline(setupAnimationCallBack('onComplete', () => { tlCallbackCheck += 1; }))
    .add('#target-id', setupAnimationCallBack('onComplete', () => { tlAnim1CallbackCheck += 1; }))
    .add('#target-id', setupAnimationCallBack('onComplete', () => { tlAnim2CallbackCheck += 1; }))
    .init();

    expect(tlCallbackCheck).to.equal(0);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(50);
    expect(tlCallbackCheck).to.equal(0);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(150);
    expect(tlCallbackCheck).to.equal(0);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(200);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(0);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(150);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(200);
    expect(tlCallbackCheck).to.equal(2);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(2);
  });

  test('onComplete on looped timeline', () => {
    let tlCallbackCheck = 0;
    let tlAnim1CallbackCheck = 0;
    let tlAnim2CallbackCheck = 0;

    const tl = createTimeline({loop: 2, ...setupAnimationCallBack('onComplete', () => { tlCallbackCheck += 1; })})
    .add('#target-id', setupAnimationCallBack('onComplete', () => { tlAnim1CallbackCheck += 1; }))
    .add('#target-id', setupAnimationCallBack('onComplete', () => { tlAnim2CallbackCheck += 1; }))
    .init();

    expect(tlCallbackCheck).to.equal(0);
    expect(tlAnim1CallbackCheck).to.equal(0);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(90);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(0);
    tl.seek(180);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(200);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(160);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1)
    tl.seek(90);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(0);
    expect(tlAnim1CallbackCheck).to.equal(1);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(90);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(1);
    tl.seek(180);
    expect(tlAnim1CallbackCheck).to.equal(2);
    expect(tlAnim2CallbackCheck).to.equal(2);
    tl.seek(540);
    expect(tlCallbackCheck).to.equal(1);
    expect(tlAnim1CallbackCheck).to.equal(4);
    expect(tlAnim2CallbackCheck).to.equal(4);
  });

  test('onBegin and onComplete on looped timeline', () => {
    let tlOnBeginCheck = 0;
    let tlOnCompleteCheck = 0;
    let childOnBeginCheck = 0;
    let childOnCompleteCheck = 0;

    const tl = createTimeline({
      loop: 2,
      onBegin: () => { tlOnBeginCheck += 1; },
      onComplete: () => { tlOnCompleteCheck += 1; },
      loopDelay: 10
    })
    .add({
      delay: 10,
      duration: 80,
      onBegin: () => { childOnBeginCheck += 1; },
      onComplete: () => { childOnCompleteCheck += 1; }
    });

    expect(tlOnBeginCheck).to.equal(0);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(childOnBeginCheck).to.equal(0);
    expect(childOnCompleteCheck).to.equal(0);
    tl.seek(5);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(childOnBeginCheck).to.equal(0);
    expect(childOnCompleteCheck).to.equal(0);
    tl.seek(11); // Delay 10
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(childOnBeginCheck).to.equal(1);
    expect(childOnCompleteCheck).to.equal(0);
    tl.seek(100);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(childOnBeginCheck).to.equal(1);
    expect(childOnCompleteCheck).to.equal(1);
    tl.seek(200);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(childOnBeginCheck).to.equal(2);
    expect(childOnCompleteCheck).to.equal(2);
    tl.seek(300);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(1);
    expect(childOnBeginCheck).to.equal(3);
    expect(childOnCompleteCheck).to.equal(3);
  });

  test('onBegin and onComplete on alternate timeline', () => {
    let tlOnBeginCheck = 0;
    let tlOnCompleteCheck = 0;
    let child1OnBeginCheck = 0;
    let child1OnCompleteCheck = 0;
    let child2OnBeginCheck = 0;
    let child2OnCompleteCheck = 0;

    const tl = createTimeline({
      loop: 2,
      alternate: true,
      onBegin: () => { tlOnBeginCheck += 1; },
      onComplete: () => { tlOnCompleteCheck += 1; },
    })
    .add({
      duration: 100,
      onBegin: () => { child1OnBeginCheck += 1; },
      onComplete: () => { child1OnCompleteCheck += 1; }
    })
    .add({
      duration: 100,
      onBegin: () => { child2OnBeginCheck += 1; },
      onComplete: () => { child2OnCompleteCheck += 1; }
    })

    expect(tlOnBeginCheck).to.equal(0);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(5);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(10);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(100);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(110);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(200);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    console.warn('Edge case where the onComplete won\'t fire before an alternate loop');
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(210); // Loop once and alternate to reversed playback, so no callback triggers should happen
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(400); // Loop twice and alternate back to forward playback
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(410);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(2);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(600);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(1);
    expect(child1OnBeginCheck).to.equal(2);
    expect(child1OnCompleteCheck).to.equal(2);
    expect(child2OnBeginCheck).to.equal(2);
    expect(child2OnCompleteCheck).to.equal(1);
  });

  test('onComplete on reversed timeline should complete and ignore children', () => {
    let tlOnBeginCheck = 0;
    let tlOnCompleteCheck = 0;
    let child1OnBeginCheck = 0;
    let child1OnCompleteCheck = 0;
    let child2OnBeginCheck = 0;
    let child2OnCompleteCheck = 0;

    const tl = createTimeline({
      reversed: true,
      defaults: {
        ease: 'linear',
        duration: 100
      },
      onBegin: () => { tlOnBeginCheck += 1; },
      onComplete: () => { tlOnCompleteCheck += 1; },
    })
    .add('.target-class:nth-child(1)', {
      y: 100,
      onBegin: () => { child1OnBeginCheck += 1; },
      onComplete: () => { child1OnCompleteCheck += 1; }
    })
    .add('.target-class:nth-child(2)', {
      y: 100,
      onBegin: () => { child2OnBeginCheck += 1; },
      onComplete: () => { child2OnCompleteCheck += 1; }
    })
    // .init();

    expect(tlOnBeginCheck).to.equal(0);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(5);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(10);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(100);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(110);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(200);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(1);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
  });

  test('onComplete on timeline after caling reverse()', () => {
    let tlOnBeginCheck = 0;
    let tlOnCompleteCheck = 0;
    let child1OnBeginCheck = 0;
    let child1OnCompleteCheck = 0;
    let child2OnBeginCheck = 0;
    let child2OnCompleteCheck = 0;

    const tl = createTimeline({
      defaults: {
        ease: 'linear',
        duration: 100
      },
      // autoplay: false,
      onBegin: () => { tlOnBeginCheck += 1; },
      onComplete: () => { tlOnCompleteCheck += 1; },
    })
    .add('.target-class:nth-child(1)', {
      y: 100,
      onBegin: () => { child1OnBeginCheck += 1; },
      onComplete: () => { child1OnCompleteCheck += 1; }
    })
    .add('.target-class:nth-child(2)', {
      y: 100,
      onBegin: () => { child2OnBeginCheck += 1; },
      onComplete: () => { child2OnCompleteCheck += 1; }
    })
    // .init();

    expect(tlOnBeginCheck).to.equal(0);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(5);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(10);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(100);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(110);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.reverse();
    tl.seek(200);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(1);
    expect(child1OnBeginCheck).to.equal(1);
    expect(child1OnCompleteCheck).to.equal(1);
    expect(child2OnBeginCheck).to.equal(1);
    expect(child2OnCompleteCheck).to.equal(0);
  });

  test('onBegin and onComplete on alternate timeline with reversed children', () => {
    let tlOnBeginCheck = 0;
    let tlOnCompleteCheck = 0;
    let child1OnBeginCheck = 0;
    let child1OnCompleteCheck = 0;
    let child2OnBeginCheck = 0;
    let child2OnCompleteCheck = 0;

    const tl = createTimeline({
      loop: 2,
      alternate: true,
      defaults: {
        ease: 'linear',
        reversed: true,
        duration: 100
      },
      // autoplay: false,
      onBegin: () => { tlOnBeginCheck += 1; },
      onComplete: () => { tlOnCompleteCheck += 1; },
    })
    .add('.target-class:nth-child(1)', {
      y: 100,
      onBegin: () => { child1OnBeginCheck += 1; },
      onComplete: () => { child1OnCompleteCheck += 1; }
    })
    .add('.target-class:nth-child(2)', {
      y: 100,
      onBegin: () => { child2OnBeginCheck += 1; },
      onComplete: () => { child2OnCompleteCheck += 1; }
    })
    // .init();

    expect(tlOnBeginCheck).to.equal(0);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(5);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(10);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(100);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(110);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(210); // Loop once and alternate to reversed playback, so no callback triggers should happen
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(380);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(0);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
    tl.seek(600);
    expect(tlOnBeginCheck).to.equal(1);
    expect(tlOnCompleteCheck).to.equal(1);
    expect(child1OnBeginCheck).to.equal(0);
    expect(child1OnCompleteCheck).to.equal(0);
    expect(child2OnBeginCheck).to.equal(0);
    expect(child2OnCompleteCheck).to.equal(0);
  });

  test('onComplete on timeline with animations of the same duration as the timeline', resolve => {
    let tlCallbackCheck = 0;
    let tlAnim1CallbackCheck = 0;
    let tlAnim2CallbackCheck = 0;
    let tlAnim3CallbackCheck = 0;
    let tlAnim4CallbackCheck = 0;

    const target = { value: 1 };

    const tl = createTimeline({
      onComplete: () => { tlCallbackCheck += 1 },
    })
    .add(target, {
      value: 0,
      duration: 1.8,
      onComplete: () => { tlAnim1CallbackCheck += 1; },
    }, 0)
    .add(target,{
      value: 1,
      duration: 1.4,
      onComplete: () => { tlAnim2CallbackCheck += 1; },
    }, .4)
    .add(target, {
      value: 2,
      duration: 1,
      onComplete: () => { tlAnim3CallbackCheck += 1; },
    }, .8)
    .add(target, {
      value: 3,
      duration: 1,
      onComplete: () => { tlAnim4CallbackCheck += 1; },
    }, .8);

    tl.then(() => {
      expect(tlCallbackCheck).to.equal(1);
      expect(tlAnim1CallbackCheck).to.equal(1);
      expect(tlAnim2CallbackCheck).to.equal(1);
      expect(tlAnim3CallbackCheck).to.equal(1);
      expect(tlAnim4CallbackCheck).to.equal(1);
      expect(tl.completed).to.equal(true);
      resolve();
    });
  });

  test('onBeforeUpdate on animation', () => {
    let callbackCheck = false;
    let ticks = 0;

    const animation = animate('#target-id', setupAnimationCallBack('onBeforeUpdate', () => { ticks++; callbackCheck = true; }));

    expect(callbackCheck).to.equal(false);
    animation.seek(5);
    expect(ticks).to.equal(1);
    expect(callbackCheck).to.equal(true);
    animation.seek(9); // delay: 10
    expect(ticks).to.equal(2);
    expect(callbackCheck).to.equal(true);
    animation.seek(10); // delay: 10
    expect(callbackCheck).to.equal(true);
    expect(ticks).to.equal(3);
    animation.seek(15);
    expect(ticks).to.equal(4);
  });

  test('onBeforeUpdate on timeline', () => {
    let tlCallbackCheck = false;
    let tlAnim1CallbackCheck = false;
    let tlAnim2CallbackCheck = false;
    let ticks = 0;

    const tl = createTimeline(setupAnimationCallBack('onBeforeUpdate', () => { ticks++; tlCallbackCheck = true; }))
    .add('#target-id', setupAnimationCallBack('onBeforeUpdate', () => { ticks++; tlAnim1CallbackCheck = true; }))
    .add('#target-id', setupAnimationCallBack('onBeforeUpdate', () => { ticks++; tlAnim2CallbackCheck = true; }))
    .init();

    expect(tlCallbackCheck).to.equal(false);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(5);
    expect(ticks).to.equal(1);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(9); // delay: 10
    expect(ticks).to.equal(2);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(10); // delay: 10
    expect(ticks).to.equal(3);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(11); // delay: 10
    expect(ticks).to.equal(5);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(150);
    expect(ticks).to.equal(8);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(true);
    tl.seek(250);
    expect(ticks).to.equal(10);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(true);
  });

  test('onUpdate on animation', () => {
    let callbackCheck = false;
    let ticks = 0;

    const animation = animate('#target-id', setupAnimationCallBack('onUpdate', () => { ticks++; callbackCheck = true; }));

    expect(callbackCheck).to.equal(false);
    animation.seek(5);
    expect(ticks).to.equal(1);
    expect(callbackCheck).to.equal(true);
    animation.seek(9); // delay: 10
    expect(ticks).to.equal(2);
    expect(callbackCheck).to.equal(true);
    animation.seek(10); // delay: 10
    expect(callbackCheck).to.equal(true);
    expect(ticks).to.equal(3);
    animation.seek(15);
    expect(ticks).to.equal(4);
  });

  test('onUpdate on timeline', () => {
    let tlCallbackCheck = false;
    let tlAnim1CallbackCheck = false;
    let tlAnim2CallbackCheck = false;
    let ticks = 0;

    const tl = createTimeline(setupAnimationCallBack('onUpdate', () => { ticks++; tlCallbackCheck = true; }))
    .add('#target-id', setupAnimationCallBack('onUpdate', () => { ticks++; tlAnim1CallbackCheck = true; }))
    .add('#target-id', setupAnimationCallBack('onUpdate', () => { ticks++; tlAnim2CallbackCheck = true; }))
    .init();

    expect(tlCallbackCheck).to.equal(false);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(5);
    expect(ticks).to.equal(1);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(9); // delay: 10
    expect(ticks).to.equal(2);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(10); // delay: 10
    expect(ticks).to.equal(3);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(11); // delay: 10
    expect(ticks).to.equal(5);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(150);
    expect(ticks).to.equal(8);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(true);
    tl.seek(250);
    expect(ticks).to.equal(10);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(true);
  });

  test('onRender with autoplay: false', () => {
    let callbackCheck = false;
    let renders = 0;

    animate('#target-id', {
      opacity: [.5, 1],
      x: 100,
      scale: 2,
      autoplay: false,
      onRender: () => {
        renders++;
        callbackCheck = true;
      },
    });

    expect(utils.$('#target-id')[0].style.opacity).to.equal('0.5');
    expect(callbackCheck).to.equal(true);
  });

  test('onRender on animation', () => {
    let callbackCheck = false;
    let renders = 0;

    const animation = animate('#target-id', setupAnimationCallBack('onRender', () => { renders++; callbackCheck = true; }));

    expect(callbackCheck).to.equal(false);
    animation.seek(5);
    expect(renders).to.equal(1);
    expect(callbackCheck).to.equal(true);
    animation.seek(9); // delay: 10
    expect(renders).to.equal(2);
    expect(callbackCheck).to.equal(true);
    animation.seek(10); // delay: 10
    expect(renders).to.equal(3);
    expect(callbackCheck).to.equal(true);
    animation.seek(15);
    expect(callbackCheck).to.equal(true);
    expect(renders).to.equal(4);
  });

  test('onRender on timeline', () => {
    let tlCallbackCheck = false;
    let tlAnim1CallbackCheck = false;
    let tlAnim2CallbackCheck = false;

    const tl = createTimeline(setupAnimationCallBack('onRender', () => { tlCallbackCheck = true; }))
    .add('#target-id', setupAnimationCallBack('onRender', () => { tlAnim1CallbackCheck = true; }))
    .add('#target-id', setupAnimationCallBack('onRender', () => { tlAnim2CallbackCheck = true; }))
    .init();

    expect(tlCallbackCheck).to.equal(false);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(5);
    expect(tlCallbackCheck).to.equal(false);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(9); // delay: 10
    expect(tlCallbackCheck).to.equal(false);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(10); // delay: 10
    expect(tlCallbackCheck).to.equal(false);
    expect(tlAnim1CallbackCheck).to.equal(false);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(50);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(false);
    tl.seek(150);
    expect(tlCallbackCheck).to.equal(true);
    expect(tlAnim1CallbackCheck).to.equal(true);
    expect(tlAnim2CallbackCheck).to.equal(true);
  });

  test('onLoop on animation', () => {
    let loops = 0;

    const animation = animate('#target-id', {
      x: 100,
      duration: 80,
      loop: 2,
      loopDelay: 20,
      autoplay: false,
      onLoop: () => loops++,
    });

    animation.seek(5);
    expect(loops).to.equal(0);
    animation.seek(80);
    expect(loops).to.equal(0);
    animation.seek(100);
    expect(loops).to.equal(1);
    animation.seek(180);
    expect(loops).to.equal(1);
    animation.seek(200);
    expect(loops).to.equal(2);
    animation.seek(280);
    expect(loops).to.equal(2);
  });

  test('refresh() inside an onLoop on animation', () => {
    let loops = 0;
    let data = { x: 0 };

    const animation = animate(data, {
      x: () => loops * 10,
      duration: 80,
      loop: 2,
      ease: 'linear',
      loopDelay: 20,
      autoplay: false,
      onLoop: self => {
        loops++;
        self.refresh();
      },
    });

    animation.seek(5);
    expect(loops).to.equal(0);
    expect(data.x).to.equal(0);
    animation.seek(100);
    expect(loops).to.equal(1);
    expect(data.x).to.equal(0);
    animation.seek(140);
    expect(loops).to.equal(1);
    expect(data.x).to.equal(5);
    animation.seek(199);
    expect(loops).to.equal(1);
    expect(data.x).to.equal(10);
    animation.seek(200);
    expect(loops).to.equal(2);
    expect(data.x).to.equal(10);
    animation.seek(240);
    expect(loops).to.equal(2);
    expect(data.x).to.equal(15);
  });

  test('onLoop on timeline', () => {
    let loops = 0;

    const animation = createTimeline({
      loop: 1,
      loopDelay: 20,
      autoplay: false,
      onLoop: () => {loops++},
    })
    .add('#target-id', {
      x: 100,
      duration: 80,
      loop: 1,
      loopDelay: 20,
      onLoop: () => {loops++},
    })
    .init();

    animation.seek(5);
    expect(loops).to.equal(0);
    animation.seek(100);
    expect(loops).to.equal(1);
    animation.seek(180);
    expect(loops).to.equal(1);
    animation.seek(200);
    expect(loops).to.equal(2);
    animation.seek(300);
    expect(loops).to.equal(3);
    animation.seek(380);
    expect(loops).to.equal(3);
    animation.seek(400);
    expect(loops).to.equal(3);
    animation.seek(401);
    expect(loops).to.equal(3);
  });

  test('onPause on animation tween override', resolve => {
    let paused = 0;
    animate('#target-id', {
      y: 200,
      duration: 30,
      onPause: () => paused++,
    })
    animate('#target-id', {
      y: 100,
      duration: 30,
      delay: 10
    })
    .then(() => {
      expect(paused).to.equal(1);
      resolve();
    });
  });

  test('onPause on timeline tween override', resolve => {
    let paused = 0;
    createTimeline({
      onPause: () => paused++,
    })
    .add('#target-id', {
      x: 200,
      duration: 30,
    }, 0)
    .add('#target-id', {
      y: 200,
      duration: 30,
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
      expect(paused).to.equal(1);
      resolve();
    });
  });

  test('then() on animation', resolve => {
    animate('#target-id', {
      y: 100,
      duration: 30,
    })
    .then(anim => {
      expect(anim.currentTime).to.equal(30);
      resolve();
    });
  });

  test('then() on timeline', resolve => {
    createTimeline()
    .add('#target-id', {
      x: 100,
      duration: 15,
    })
    .add('#target-id', {
      y: 100,
      duration: 15,
    })
    .then(tl => {
      expect(tl.currentTime).to.equal(30);
      resolve();
    });
  });

  test('onBegin, onBeforeUpdate, onUpdate, onRender, onComplete should trigger on 0 duration animation', resolve => {
    let onBeginCheck = false;
    let onBeforeUpdateCheck = false;
    let onUpdateCheck = false;
    let onRenderCheck = false;
    let onCompleteCheck = false;
    let onLoopCheck = false;

    animate('#target-id', {
      translateX: 100,
      duration: 0,
      onBegin: () => { onBeginCheck = true; },
      onBeforeUpdate: () => { onBeforeUpdateCheck = true; },
      onUpdate: () => { onUpdateCheck = true; },
      onRender: () => { onRenderCheck = true; },
      onLoop: () => { onLoopCheck = true; },
      onComplete: () => { onCompleteCheck = true; },
    })
    .then(anim => {
      expect(onBeginCheck).to.equal(true);
      expect(onBeforeUpdateCheck).to.equal(true);
      expect(onUpdateCheck).to.equal(true);
      expect(onRenderCheck).to.equal(true);
      expect(onLoopCheck).to.equal(false);
      expect(onCompleteCheck).to.equal(true);
      expect(anim.began).to.equal(true);
      expect(anim.completed).to.equal(true);
      resolve();
    })
  });

  test('onBegin, onBeforeUpdate, onUpdate, onRender, onComplete should trigger on 0 duration timeline', resolve => {
    let onBeginCheck = 0;
    let onBeforeUpdateCheck = 0;
    let onUpdateCheck = 0;
    let onRenderCheck = 0;
    let onCompleteCheck = 0;
    let onLoopCheck = 0;

    let a1onBeginCheck = 0;
    let a1onBeforeUpdateCheck = 0;
    let a1onUpdateCheck = 0;
    let a1onRenderCheck = 0;
    let a1onCompleteCheck = 0;
    let a1onLoopCheck = 0;

    let a2onBeginCheck = 0;
    let a2onBeforeUpdateCheck = 0;
    let a2onUpdateCheck = 0;
    let a2onRenderCheck = 0;
    let a2onCompleteCheck = 0;
    let a2onLoopCheck = 0;

    createTimeline({
      defaults: { duration: 0 },
      id: 'TL',
      onBegin: () => { onBeginCheck++; },
      onBeforeUpdate: () => { onBeforeUpdateCheck++; },
      onUpdate: () => { onUpdateCheck++; },
      onRender: () => { onRenderCheck++; },
      onLoop: () => { onLoopCheck++; },
      onComplete: () => { onCompleteCheck++; },
    })
    .add('#target-id', {
      translateX: 100,
      id: 'A1',
      onBegin: () => { a1onBeginCheck++; },
      onBeforeUpdate: () => { a1onBeforeUpdateCheck++; },
      onUpdate: () => { a1onUpdateCheck++; },
      onRender: () => { a1onRenderCheck++; },
      onLoop: () => { a1onLoopCheck++; },
      onComplete: () => { a1onCompleteCheck++; },
    })
    .add('#target-id', {
      translateY: 100,
      id: 'A2',
      onBegin: () => { a2onBeginCheck++; },
      onBeforeUpdate: () => { a2onBeforeUpdateCheck++; },
      onUpdate: () => { a2onUpdateCheck++; },
      onRender: () => { a2onRenderCheck++; },
      onLoop: () => { a2onLoopCheck++; },
      onComplete: () => { a2onCompleteCheck++; },
    })
    .then(tl => {
      expect(onBeginCheck).to.equal(1);
      expect(onBeforeUpdateCheck).to.equal(1);
      expect(onUpdateCheck).to.equal(1);
      expect(onRenderCheck).to.equal(1);
      expect(onLoopCheck).to.equal(0);
      expect(onCompleteCheck).to.equal(1);
      expect(tl.began).to.equal(true);
      expect(tl.completed).to.equal(true);

      expect(a1onBeginCheck).to.equal(1);
      expect(a1onBeforeUpdateCheck).to.equal(1);
      expect(a1onUpdateCheck).to.equal(1);
      expect(a1onRenderCheck).to.equal(1);
      expect(a1onLoopCheck).to.equal(0);
      expect(a1onCompleteCheck).to.equal(1);

      expect(a2onBeginCheck).to.equal(1);
      expect(a2onBeforeUpdateCheck).to.equal(1);
      expect(a2onUpdateCheck).to.equal(1);
      expect(a2onRenderCheck).to.equal(1);
      expect(a2onLoopCheck).to.equal(0);
      expect(a2onCompleteCheck).to.equal(1);
      resolve();
    })

  });

  test('Callbacks order execution', () => {

    let value = 0;

    const animation = animate('#target-id', {
      translateX: 100,
      autoplay: false,
      onBegin: () => { value = 2; },
      onBeforeUpdate: () => { value *= 3; },
      onRender: () => { value += 4; },
      onUpdate: () => { value += 10; },
      onComplete: () => { value /= 20; },
    });

    expect(value).to.equal(0);

    animation.seek(animation.duration);

    expect(value).to.equal(1);

  });

  test('Orders timeline callbacks across forward and backward seeks', () => {
    const calls = [];
    const target = { x: 0 };
    const timeline = createTimeline({ autoplay: false })
      .add(target, { x: 100, duration: 100, ease: 'linear' })
      .call(() => calls.push('first'), 25)
      .call(() => calls.push('second'), 75);
    timeline.seek(100);
    expect(calls.splice(0)).to.deep.equal(['first', 'second']);
    timeline.seek(50);
    expect(calls.splice(0)).to.deep.equal(['second']);
    expect(target.x).to.equal(50);
    timeline.seek(0);
    expect(calls.splice(0)).to.deep.equal(['first']);
    timeline.seek(100);
    calls.length = 0;
    timeline.seek(0);
    expect(calls.splice(0)).to.deep.equal(['second', 'first']);
    timeline.cancel();
  });

  test('Passes the instance as callback context and argument', () => {
    const calls = [];
    function onUpdate(self) { calls.push([this, self]); }
    const timer = createTimer({ duration: 100, autoplay: false, onUpdate });
    const animation = animate({ x: 0 }, { x: 100, duration: 100, autoplay: false, onUpdate });
    const timeline = createTimeline({ autoplay: false, onUpdate }).add({ x: 0 }, { x: 100, duration: 100 });
    calls.length = 0;
    for (const instance of [timer, animation, timeline]) {
      instance.seek(50);
      const [context, argument] = calls.pop();
      expect(context).to.equal(instance);
      expect(argument).to.equal(instance);
      instance.cancel();
    }
  });

  test('Passes the containing timeline to an unbound call callback', () => {
    class CustomTimeline extends Timeline { customValue = 42; }
    const timeline = new CustomTimeline({ autoplay: false });
    let calls = 0;
    timeline.call(function(self) {
      expect(this).to.equal(undefined);
      expect(self).to.equal(timeline);
      expect(self.customValue).to.equal(42);
      calls++;
    }, 50).seek(100);
    expect(calls).to.equal(1);
    timeline.cancel();
  });

  for (const kind of ['timer', 'animation', 'timeline']) {
    for (const reversed of [false, true]) {
      test(`Mutes ${kind} callbacks across alternating seeks starting ${reversed ? 'reversed' : 'forward'}`, async () => {
        const calls = [];
        const callbacks = Object.fromEntries(['onBegin', 'onBeforeUpdate', 'onUpdate', 'onRender', 'onLoop', 'onComplete', 'onPause']
          .map(name => [name, () => calls.push(name)]));
        const target = { x: 0 };
        const params = { autoplay: false, duration: 100, loop: 2, alternate: true, reversed, ...callbacks };
        const instance = kind === 'timer' ? createTimer(params) : kind === 'animation' ?
          animate(target, { ...params, x: [0, 100], ease: 'linear' }) :
          createTimeline(params).add(target, { x: [0, 100], duration: 100, ease: 'linear', ...callbacks });
        calls.length = 0;
        let resolutions = 0;
        const done = instance.then(() => { resolutions++; });
        try {
          for (const [time, value] of [[25, 25], [125, 75], [225, 25], [300, 100]]) {
            instance.seek(time, true);
            expect(calls).to.deep.equal([]);
            expect(instance.currentTime).to.equal(time);
            if (kind !== 'timer') expect(target.x).to.equal(reversed ? 100 - value : value);
          }
          expect(instance.completed).to.equal(true);
          expect(resolutions).to.equal(0);
          instance.seek(125, true).seek(0, true);
          expect(calls).to.deep.equal([]);
          expect(instance.completed).to.equal(false);
          instance.seek(25);
          expect(calls.includes('onBegin')).to.equal(true);
          if (kind !== 'timer') expect(target.x).to.equal(reversed ? 75 : 25);
          instance.seek(instance.duration);
          await done;
          expect(resolutions).to.equal(1);
          expect(calls.includes('onComplete')).to.equal(true);
        } finally {
          instance.cancel();
        }
      });
    }
  }

});

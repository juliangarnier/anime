import {
  expect,
} from '../utils.js';

import {
  animate,
  utils,
  eases,
  cubicBezier,
  spring,
  linear,
  steps,
} from '../../dist/modules/index.js';

function createEasingParam(ease) {
  return {
    opacity: [0, 1],
    ease: ease,
    autoplay: false,
    duration: 100,
  }
}

function getOpacityValue() {
  return utils.round(parseFloat(utils.get('#target-id', 'opacity')), 2);
}

suite('Eases', () => {

  test("'linear' / eases.linear", () => {
    const anim1 = animate('#target-id', createEasingParam('linear'));
    anim1.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim1.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim1.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
    utils.set('#target-id', { opacity: 0 });
    const anim2 = animate('#target-id', createEasingParam(eases.linear));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("'none' / eases.none", () => {
    const anim1 = animate('#target-id', createEasingParam('none'));
    anim1.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim1.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim1.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
    utils.set('#target-id', { opacity: 0 });
    const anim2 = animate('#target-id', createEasingParam(eases.none));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("linear(0, 1)", () => {
    const anim2 = animate('#target-id', createEasingParam(linear(0, 1)));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("Custom linear linear(0, 0.25, 1)", () => {
    const anim2 = animate('#target-id', createEasingParam(linear(0, 0.25, 1)));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.25);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("Custom uneven linear linear(0, '0.25 75%', 1)", () => {
    const anim2 = animate('#target-id', createEasingParam(linear(0, '0.25 75%', 1)));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(75);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.25);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  const builtInNames = ['', 'Quad', 'Cubic', 'Quart', 'Quint', 'Sine', 'Circ', 'Expo', 'Bounce', 'Back', 'Elastic'];
  const fnTypes = ['in', 'out', 'inOut'];

  builtInNames.forEach(name => {
    fnTypes.forEach(type => {
      const easeFunctionName = type + name;
      const hasParams = (name === '' || name === 'Back' || name === 'Elastic');
      test("'" + easeFunctionName + "' / eases." + easeFunctionName + (hasParams ? '()' : ''), () => {
        let fn = eases[easeFunctionName];
        if (hasParams) fn = fn();
        const anim1 = animate('#target-id', createEasingParam(easeFunctionName));
        anim1.seek(50);
        if (type === 'in') {
          expect(getOpacityValue()).to.be.below(.5);
        }
        if (type === 'out') {
          expect(getOpacityValue()).to.be.above(.5);
        }
        if (type === 'inOut') {
          expect(getOpacityValue()).to.be.equal(.5);
        }
        utils.set('#target-id', { opacity: 0 });
        const anim2 = animate('#target-id', createEasingParam(fn));
        anim2.seek(50);
        if (type === 'in') {
          expect(getOpacityValue()).to.be.below(.5);
        }
        if (type === 'out') {
          expect(getOpacityValue()).to.be.above(.5);
        }
        if (type === 'inOut') {
          expect(getOpacityValue()).to.be.equal(.5);
        }
      });
    });
  });

  test('Custom power ease: in(x), out(x), inOut(x)', () => {
    const anim1 = animate('#target-id', createEasingParam('in(1)'));
    anim1.seek(50);
    expect(getOpacityValue()).to.equal(.50);
    utils.set('#target-id', {opacity: 0});
    const anim2 = animate('#target-id', createEasingParam('in(1.5)'));
    anim2.seek(50);
    expect(getOpacityValue()).to.equal(.35);
    utils.set('#target-id', {opacity: 0});
    const anim3 = animate('#target-id', createEasingParam('in(2)'));
    anim3.seek(50);
    expect(getOpacityValue()).to.equal(.25);
  });

  test('Custom elastic ease: inElastic(x, y), outElastic(x, y), inOutElastic(x, y)', () => {
    const anim1 = animate('#target-id', createEasingParam('in(1)'));
    anim1.seek(50);
    expect(getOpacityValue()).to.equal(.50);
    utils.set('#target-id', {opacity: 0});
    const anim2 = animate('#target-id', createEasingParam('in(1.5)'));
    anim2.seek(50);
    expect(getOpacityValue()).to.equal(.35);
    utils.set('#target-id', {opacity: 0});
    const anim3 = animate('#target-id', createEasingParam('in(2)'));
    anim3.seek(50);
    expect(getOpacityValue()).to.equal(.25);
  });

  test('Spring ease overrides animation\'s duration parameter', () => {
    const animationParams = createEasingParam(spring());
    animationParams.duration = 500;
    const animation = animate('#target-id', animationParams);
    expect(animation.duration).to.be.above(1000);
  });

  test('Spring ease overrides tween\'s duration parameter', () => {
    const animation = animate('#target-id', {
      opacity: [0, 1],
      translateX: {
        to: 100,
        ease: spring(),
        duration: 500
      },
      duration: 400,
      autoplay: false
    });
    expect(animation.duration).to.be.above(1000);
  });

  test('Spring ease parameters affect animation\'s duration', () => {
    const target = '#target-id';
    expect(animate(target, createEasingParam(spring())).duration).to.equal(1760);
    expect(animate(target, createEasingParam(spring({ mass: 10 }))).duration).to.equal(13700);
    expect(animate(target, createEasingParam(spring({ stiffness: 50 }))).duration).to.equal(1760);
    expect(animate(target, createEasingParam(spring({ damping: 50 }))).duration).to.equal(3880);
    expect(animate(target, createEasingParam(spring({ velocity: 10 }))).duration).to.equal(1700);
  });

  test('Spring stiffness and damping set the perceived duration at creation', () => {
    let completed = 0;
    const springEasing = spring({
      stiffness: 30,
      damping: 20,
      mass: 1,
      onComplete: () => completed++
    });

    expect(springEasing.duration).to.equal(1147.147);
    springEasing.ease(628 / springEasing.settlingDuration);
    expect(completed).to.equal(0);
    springEasing.ease(springEasing.duration / springEasing.settlingDuration);
    expect(completed).to.equal(1);
  });

  test('Setting a Spring parameter after creation should update its duration', () => {
    const springEasing = spring();
    expect(springEasing.settlingDuration).to.equal(1760);
    springEasing.mass = 10;
    expect(springEasing.settlingDuration).to.equal(13700);
    expect(springEasing.mass).to.equal(10);
    springEasing.mass = 1;
    springEasing.stiffness = 50;
    expect(springEasing.mass).to.equal(1);
    expect(springEasing.stiffness).to.equal(50);
    expect(springEasing.settlingDuration).to.equal(1760);
    springEasing.stiffness = 100;
    springEasing.damping = 50;
    expect(springEasing.stiffness).to.equal(100);
    expect(springEasing.damping).to.equal(50);
    expect(springEasing.settlingDuration).to.equal(3880);
    springEasing.damping = 10;
    springEasing.velocity = 10;
    expect(springEasing.damping).to.equal(10);
    expect(springEasing.velocity).to.equal(10);
    expect(springEasing.settlingDuration).to.equal(1700);
  });

  test('Spring parameters must be clamped at 10000', () => {
    const springEasing = spring({
      mass: 15000,
      stiffness: 15000,
      damping: 15000,
      velocity: 15000,
    });
    expect(springEasing.mass).to.equal(10000);
    expect(springEasing.stiffness).to.equal(10000);
    expect(springEasing.damping).to.equal(10000);
    expect(springEasing.velocity).to.equal(10000);
    expect(springEasing.settlingDuration).to.be.above(0);

    springEasing.mass = 20000;
    springEasing.stiffness = 20000;
    springEasing.damping = 20000;
    springEasing.velocity = 20000;

    expect(springEasing.mass).to.equal(10000);
    expect(springEasing.stiffness).to.equal(10000);
    expect(springEasing.damping).to.equal(10000);
    expect(springEasing.velocity).to.equal(10000);
    expect(springEasing.settlingDuration).to.be.above(0);
  });

  test('Spring velocity can be negative', () => {
    const springEasing = spring({
      velocity: -15000,
    });
    expect(springEasing.velocity).to.equal(-10000);
    expect(springEasing.settlingDuration).to.be.above(0);
    springEasing.velocity = -20000;
    expect(springEasing.velocity).to.equal(-10000);
    expect(springEasing.settlingDuration).to.be.above(0);
  });

  test('Cubic bézier in: cubicBezier(1,0,1,0)', () => {
    const cubicBezierIn = animate('#target-id', createEasingParam(cubicBezier(1,0,1,0)));
    cubicBezierIn.seek(50);
    expect(getOpacityValue()).to.be.below(.5);
  });

  test('Cubic bézier out: cubicBezier(0,1,0,1)', () => {
    const cubicBezierOut = animate('#target-id', createEasingParam(cubicBezier(0,1,0,1)));
    cubicBezierOut.seek(50);
    expect(getOpacityValue()).to.be.above(.5);
  });

  test('Cubic bézier inOut: cubicBezier(1,0,0,1)', () => {
    const cubicBezierInOut = animate('#target-id', createEasingParam(cubicBezier(1,0,0,1)));
    cubicBezierInOut.seek(50);
    expect(getOpacityValue()).to.be.equal(.5);
  });

  test('Steps from end (default)', () => {
    const cubicBezierIn = animate('#target-id', createEasingParam(steps(4)));
    cubicBezierIn.seek(0);
    expect(getOpacityValue()).to.equal(0);
    cubicBezierIn.seek(24);
    expect(getOpacityValue()).to.equal(0);
    cubicBezierIn.seek(25);
    expect(getOpacityValue()).to.equal(.25);
    cubicBezierIn.seek(49);
    expect(getOpacityValue()).to.equal(.25);
    cubicBezierIn.seek(50);
    expect(getOpacityValue()).to.equal(.5);
    cubicBezierIn.seek(74);
    expect(getOpacityValue()).to.equal(.5);
    cubicBezierIn.seek(75);
    expect(getOpacityValue()).to.equal(.75);
    cubicBezierIn.seek(99);
    expect(getOpacityValue()).to.equal(.75);
    cubicBezierIn.seek(100);
    expect(getOpacityValue()).to.equal(1);
  });

  test('Steps from start', () => {
    const cubicBezierIn = animate('#target-id', createEasingParam(steps(4, true)));
    cubicBezierIn.seek(0);
    expect(getOpacityValue()).to.equal(0);
    cubicBezierIn.seek(1);
    expect(getOpacityValue()).to.equal(.25);
    cubicBezierIn.seek(24);
    expect(getOpacityValue()).to.equal(.25);
    cubicBezierIn.seek(25);
    expect(getOpacityValue()).to.equal(.25);
    cubicBezierIn.seek(49);
    expect(getOpacityValue()).to.equal(.5);
    cubicBezierIn.seek(50);
    expect(getOpacityValue()).to.equal(.5);
    cubicBezierIn.seek(74);
    expect(getOpacityValue()).to.equal(.75);
    cubicBezierIn.seek(75);
    expect(getOpacityValue()).to.equal(.75);
    cubicBezierIn.seek(99);
    expect(getOpacityValue()).to.equal(1);
    cubicBezierIn.seek(100);
    expect(getOpacityValue()).to.equal(1);
  });
});

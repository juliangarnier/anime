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

  test('Stretches a spring to settle at the given duration', () => {
    const springEasing = spring();
    expect(springEasing.settlingDuration).to.equal(1760);
    springEasing.stretch(880);
    expect(springEasing.settlingDuration).to.be.closeTo(880, 25);
    springEasing.stretch(3520);
    expect(springEasing.settlingDuration).to.be.closeTo(3520, 25);
    springEasing.stretch(0);
    expect(springEasing.settlingDuration).to.be.closeTo(3520, 25);
  });

  test('Exposes minSettlingDuration as the floor stretch refuses to cross', () => {
    const springEasing = spring();
    expect(springEasing.minSettlingDuration).to.equal(200);
    // A target at or below the floor is refused, the settling stays above it.
    springEasing.stretch(springEasing.minSettlingDuration);
    expect(springEasing.settlingDuration).to.be.above(springEasing.minSettlingDuration);
  });

  test('Keeps bounce, mass and damping ratio when stretched', () => {
    const springEasing = spring({ mass: 10, velocity: 5 });
    const zeta = springEasing.zeta;
    springEasing.stretch(2000);
    expect(springEasing.settlingDuration).to.be.closeTo(2000, 25);
    expect(springEasing.mass).to.equal(10);
    expect(springEasing.zeta).to.be.closeTo(zeta, .0001);
    const bounced = spring({ bounce: .3, duration: 500 });
    bounced.stretch(2000);
    expect(bounced.settlingDuration).to.be.closeTo(2000, 25);
    expect(bounced.bounce).to.equal(.3);
    const clamped = spring();
    const clampedZeta = clamped.zeta;
    clamped.stretch(240);
    expect(clamped.zeta).to.be.closeTo(clampedZeta, .0001);
    // Targets above minSettlingDuration are reachable, the parameter ceiling sits past the w0 clamp.
    expect(clamped.settlingDuration).to.be.closeTo(240, 25);
  });

  test('Spring parameters must be clamped at 1000000', () => {
    const springEasing = spring({
      mass: 1500000,
      stiffness: 1500000,
      damping: 1500000,
      velocity: 1500000,
    });
    expect(springEasing.mass).to.equal(1000000);
    expect(springEasing.stiffness).to.equal(1000000);
    expect(springEasing.damping).to.equal(1000000);
    expect(springEasing.velocity).to.equal(1000000);
    expect(springEasing.settlingDuration).to.be.above(0);

    springEasing.mass = 2000000;
    springEasing.stiffness = 2000000;
    springEasing.damping = 2000000;
    springEasing.velocity = 2000000;

    expect(springEasing.mass).to.equal(1000000);
    expect(springEasing.stiffness).to.equal(1000000);
    expect(springEasing.damping).to.equal(1000000);
    expect(springEasing.velocity).to.equal(1000000);
    expect(springEasing.settlingDuration).to.be.above(0);
  });

  test('Spring velocity can be negative', () => {
    const springEasing = spring({
      velocity: -1500000,
    });
    expect(springEasing.velocity).to.equal(-1000000);
    expect(springEasing.settlingDuration).to.be.above(0);
    springEasing.velocity = -2000000;
    expect(springEasing.velocity).to.equal(-1000000);
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

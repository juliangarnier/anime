import {
  expect,
} from '../utils.js';

import {
  animate,
  utils,
  eases,
  createSpring,
} from '../../src/anime.js';

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

  test("'linear' / eases.linear()", () => {
    const anim1 = animate('#target-id', createEasingParam('linear'));
    anim1.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim1.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim1.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
    utils.set('#target-id', { opacity: 0 });
    const anim2 = animate('#target-id', createEasingParam(eases.linear()));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("'linear(0, 1)' / eases.linear(0, 1)", () => {
    const anim1 = animate('#target-id', createEasingParam('linear(0, 1)'));
    anim1.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim1.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim1.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
    utils.set('#target-id', { opacity: 0 });
    const anim2 = animate('#target-id', createEasingParam(eases.linear(0, 1)));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.5);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("Custom linear 'linear(0, 0.25, 1)' / eases.linear(0, 0.25, 1)", () => {
    const anim1 = animate('#target-id', createEasingParam('linear(0, 0.25, 1)'));
    anim1.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim1.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.25);
    anim1.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
    utils.set('#target-id', { opacity: 0 });
    const anim2 = animate('#target-id', createEasingParam(eases.linear(0, 0.25, 1)));
    anim2.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim2.seek(50);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.25);
    anim2.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
  });

  test("Custom uneven linear 'linear(0, 0.25 75%, 1)' / eases.linear(0, '0.25 75%', 1)", () => {
    const anim1 = animate('#target-id', createEasingParam('linear(0, 0.25 75%, 1)'));
    anim1.seek(0);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(0);
    anim1.seek(75);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(.25);
    anim1.seek(100);
    expect(parseFloat(utils.get('#target-id', 'opacity'))).to.equal(1);
    utils.set('#target-id', { opacity: 0 });
    const anim2 = animate('#target-id', createEasingParam(eases.linear(0, '0.25 75%', 1)));
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
    const animationParams = createEasingParam(createSpring());
    animationParams.duration = 500;
    const animation = animate('#target-id', animationParams);
    expect(animation.duration).to.be.above(1000);
  });

  test('Spring ease overrides tween\'s duration parameter', () => {
    const animation = animate('#target-id', {
      opacity: [0, 1],
      translateX: {
        to: 100,
        ease: createSpring(),
        duration: 500
      },
      duration: 400,
      autoplay: false
    });
    expect(animation.duration).to.be.above(1000);
  });

  test('Spring ease parameters affect animation\'s duration', () => {
    const target = '#target-id';
    expect(animate(target, createEasingParam(createSpring())).duration).to.equal(1740);
    expect(animate(target, createEasingParam(createSpring({ mass: 10 }))).duration).to.equal(13680);
    expect(animate(target, createEasingParam(createSpring({ stiffness: 50 }))).duration).to.equal(1740);
    expect(animate(target, createEasingParam(createSpring({ damping: 50 }))).duration).to.equal(1180);
    expect(animate(target, createEasingParam(createSpring({ velocity: 10 }))).duration).to.equal(1680);
  });

  test('Setting a Spring parameter after creation should update its duration', () => {
    const spring = createSpring();
    expect(spring.duration).to.equal(1740);
    spring.mass = 10;
    expect(spring.duration).to.equal(13680);
    expect(spring.mass).to.equal(10);
    spring.mass = 1;
    spring.stiffness = 50;
    expect(spring.mass).to.equal(1);
    expect(spring.stiffness).to.equal(50);
    expect(spring.duration).to.equal(1740);
    spring.stiffness = 100;
    spring.damping = 50;
    expect(spring.stiffness).to.equal(100);
    expect(spring.damping).to.equal(50);
    expect(spring.duration).to.equal(1180);
    spring.damping = 10;
    spring.velocity = 10;
    expect(spring.damping).to.equal(10);
    expect(spring.velocity).to.equal(10);
    expect(spring.duration).to.equal(1680);
  });

  test('Spring stiffness accepts increased limits up to 10,000', () => {
    const spring1 = createSpring({ stiffness: 5000 });
    expect(spring1.stiffness).to.equal(5000);
    expect(spring1.duration).to.be.above(0);

    const spring2 = createSpring({ stiffness: 10000 });
    expect(spring2.stiffness).to.equal(10000);
    expect(spring2.duration).to.be.above(0);

    // Test that values above 10,000 are clamped
    const spring3 = createSpring({ stiffness: 15000 });
    expect(spring3.stiffness).to.equal(10000);

    // Test setting stiffness after creation
    const spring4 = createSpring();
    spring4.stiffness = 7500;
    expect(spring4.stiffness).to.equal(7500);
    spring4.stiffness = 12000;
    expect(spring4.stiffness).to.equal(10000);
  });

  test('Spring velocity accepts increased limits up to ±10,000', () => {
    const spring1 = createSpring({ velocity: 5000 });
    expect(spring1.velocity).to.equal(5000);
    expect(spring1.duration).to.be.above(0);

    const spring2 = createSpring({ velocity: -5000 });
    expect(spring2.velocity).to.equal(-5000);
    expect(spring2.duration).to.be.above(0);

    const spring3 = createSpring({ velocity: 10000 });
    expect(spring3.velocity).to.equal(10000);
    expect(spring3.duration).to.be.above(0);

    const spring4 = createSpring({ velocity: -10000 });
    expect(spring4.velocity).to.equal(-10000);
    expect(spring4.duration).to.be.above(0);

    // Test that values above ±10,000 are clamped
    const spring5 = createSpring({ velocity: 15000 });
    expect(spring5.velocity).to.equal(10000);

    const spring6 = createSpring({ velocity: -15000 });
    expect(spring6.velocity).to.equal(-10000);

    // Test setting velocity after creation
    const spring7 = createSpring();
    spring7.velocity = 7500;
    expect(spring7.velocity).to.equal(7500);
    spring7.velocity = -7500;
    expect(spring7.velocity).to.equal(-7500);
    spring7.velocity = 12000;
    expect(spring7.velocity).to.equal(10000);
    spring7.velocity = -12000;
    expect(spring7.velocity).to.equal(-10000);
  });

  test('Spring with high stiffness and velocity values produces valid animations', () => {
    const target = '#target-id';
    
    // Test high stiffness animation
    const highStiffnessAnim = animate(target, {
      opacity: [0, 1],
      ease: createSpring({ stiffness: 8000 }),
      autoplay: false
    });
    expect(highStiffnessAnim.duration).to.be.above(0);
    
    // Test high velocity animation  
    const highVelocityAnim = animate(target, {
      opacity: [0, 1],
      ease: createSpring({ velocity: 8000 }),
      autoplay: false
    });
    expect(highVelocityAnim.duration).to.be.above(0);
    
    // Test combined high values
    const combinedHighAnim = animate(target, {
      opacity: [0, 1],
      ease: createSpring({ stiffness: 5000, velocity: 5000 }),
      autoplay: false
    });
    expect(combinedHighAnim.duration).to.be.above(0);
  });

  test('Cubic bézier in: "cubicBezier(1,0,1,0)" / eases.cubicBezier(1,0,1,0)', () => {
    const cubicBezierIn = animate('#target-id', createEasingParam(eases.cubicBezier(1,0,1,0)));
    cubicBezierIn.seek(50);
    expect(getOpacityValue()).to.be.below(.5);
    const cubicBezierInString = animate('#target-id', createEasingParam('cubicBezier(1,0,1,0)'));
    cubicBezierInString.seek(50);
    expect(getOpacityValue()).to.be.below(.5);
  });

  test('Cubic bézier out: "cubicBezier(0,1,0,1)" / eases.cubicBezier(0,1,0,1)', () => {
    const cubicBezierOut = animate('#target-id', createEasingParam(eases.cubicBezier(0,1,0,1)));
    cubicBezierOut.seek(50);
    expect(getOpacityValue()).to.be.above(.5);
    const cubicBezierOutString = animate('#target-id', createEasingParam('cubicBezier(0,1,0,1)'));
    cubicBezierOutString.seek(50);
    expect(getOpacityValue()).to.be.above(.5);
  });

  test('Cubic bézier inOut: "cubicBezier(1,0,0,1)" / eases.cubicBezier(1,0,0,1)', () => {
    const cubicBezierInOut = animate('#target-id', createEasingParam(eases.cubicBezier(1,0,0,1)));
    cubicBezierInOut.seek(50);
    expect(getOpacityValue()).to.be.equal(.5);
    const cubicBezierInOutString = animate('#target-id', createEasingParam('cubicBezier(1,0,0,1)'));
    cubicBezierInOutString.seek(50);
    expect(getOpacityValue()).to.be.equal(.5);
  });

  test('Steps from end (default)', () => {
    const cubicBezierIn = animate('#target-id', createEasingParam('steps(4)'));
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
    const cubicBezierIn = animate('#target-id', createEasingParam('steps(4, true)'));
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

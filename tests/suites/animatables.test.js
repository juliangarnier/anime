import {
  expect,
} from '../utils.js';

import {
  createAnimatable,
  createTimer,
  utils,
} from '../../dist/modules/index.js';

suite('Animatables', () => {

  test('Get and animate animatable values', resolve => {
    const animatable = createAnimatable('#target-id', {
      x: 20,
      y: 30,
      rotate: 40,
    });

    expect(animatable.x()).to.equal(0);
    expect(animatable.y()).to.equal(0);
    expect(animatable.rotate()).to.equal(0);

    const x = animatable.x(100);
    const y = animatable.y(150);
    const rotate = animatable.rotate(45);

    expect(animatable.animations.x.duration).to.equal(20);
    expect(animatable.animations.y.duration).to.equal(30);
    expect(animatable.animations.rotate.duration).to.equal(40);

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(animatable.x()).to.equal(100);
        expect(animatable.y()).to.equal(150);
        expect(animatable.rotate()).to.equal(45);
        resolve();
      }
    });
  });

  test('Get and animate animatable complex values', resolve => {
    const animatable = createAnimatable('#target-id', {
      backgroundColor: 20,
    });

    expect(animatable.backgroundColor()).deep.equal([0, 214, 114, 1]);

    const bg = animatable.backgroundColor([100, 200, 0, 1]);

    expect(animatable.animations.backgroundColor.duration).to.equal(20);

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(animatable.backgroundColor()).deep.equal([100, 200, 0, 1]);
        resolve();
      }
    });
  });

  test('Keeps alpha opaque when setting a color with three values', resolve => {
    const animatable = createAnimatable('#target-id', {
      backgroundColor: 20,
    });

    animatable.backgroundColor([100, 200, 0]);

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(animatable.backgroundColor()).deep.equal([100, 200, 0, 1]);
        resolve();
      }
    });
  });

  test('Get and set animatable values', () => {
    const animatable = createAnimatable('#target-id', {
      x: 0,
      y: 0,
      rotate: 0,
    });

    expect(animatable.x()).to.equal(0);
    expect(animatable.y()).to.equal(0);
    expect(animatable.rotate()).to.equal(0);

    animatable.x(100);
    animatable.y(150);
    animatable.rotate(45);

    expect(animatable.x()).to.equal(100);
    expect(animatable.y()).to.equal(150);
    expect(animatable.rotate()).to.equal(45);
  });

  test('Defines custom units for animatable values', resolve => {
    const animatable = createAnimatable('#target-id', {
      x: { unit: 'em' },
      y: { unit: 'rem' },
      rotate: { unit: 'rad', duration: 50 },
      duration: 40
    });

    expect(animatable.x()).to.equal(0);
    expect(animatable.y()).to.equal(0);
    expect(animatable.rotate()).to.equal(0);

    animatable.x(10);
    animatable.y(15);
    animatable.rotate(1);

    createTimer({
      duration: 50,
      onComplete: () => {
        expect(animatable.x()).to.equal(10);
        expect(animatable.y()).to.equal(15);
        expect(animatable.rotate()).to.equal(1);
        expect(utils.get('#target-id', 'x')).to.equal('10em');
        expect(utils.get('#target-id', 'y')).to.equal('15rem');
        expect(utils.get('#target-id', 'rotate')).to.equal('1rad');
        resolve();
      }
    });
  });

  test('Animatable onBegin callbacks', resolve => {
    let began = 0;
    const animatable = createAnimatable('#target-id', {
      x: 10,
      y: 10,
      rotate: 5,
      onBegin: () => {
        began++;
      },
    });
    animatable.x(100).y(100).rotate(100);
    createTimer({
      duration: 20,
      onComplete: () => {
        animatable.x(-100).y(-100).rotate(-100);
        createTimer({
          duration: 20,
          onComplete: () => {
            expect(began).to.equal(2);
            animatable.revert();
            resolve();
          }
        });
      }
    });
  });

  test('Animatable onComplete callbacks', resolve => {
    let completes = 0;
    const animatable = createAnimatable('#target-id', {
      x: 40,
      y: 40,
      rotate: 5,
      onComplete: () => {
        completes++;
      },
    });
    animatable.x(100).y(100).rotate(100);
    createTimer({
      duration: 20,
      onComplete: () => {
        animatable.x(-100).y(-100).rotate(-100);
        createTimer({
          duration: 60,
          onComplete: () => {
            animatable.x(-50).y(-50).rotate(-50);
            createTimer({
              duration: 60,
              onComplete: () => {
                expect(completes).to.equal(2);
                animatable.revert();
                resolve();
              }
            });
          }
        });
      }
    });
  });

  test('Animatable onUpdate callbacks', resolve => {
    let updates = 0;
    const animatable = createAnimatable('#target-id', {
      x: 20,
      y: 20,
      rotate: 5,
      onUpdate: () => {
        updates++;
      },
    });
    animatable.x(100).y(100).rotate(100);
    createTimer({
      duration: 20,
      onComplete: () => {
        animatable.x(-100).y(-100).rotate(-100);
      }
    });
    createTimer({
      duration: 40,
      onComplete: () => {
        expect(updates).to.be.above(1);
        expect(updates).to.be.below(6);
        animatable.revert();
        resolve();
      }
    });
  });

  test('Revert an animatable', () => {
    const animatable = createAnimatable('#target-id', {
      x: { unit: 'em' },
      y: { unit: 'rem' },
      rotate: { unit: 'rad', duration: 50 },
      duration: 40
    });

    expect(animatable.targets.length).to.equal(1);

    animatable.revert();

    expect(animatable.targets.length).to.equal(0);
    expect(animatable.animations.x).to.equal(undefined);
    expect(animatable.animations.y).to.equal(undefined);
    expect(animatable.animations.rotate).to.equal(undefined);
  });

});

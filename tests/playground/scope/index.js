import {
  animate,
  utils,
  createScope,
} from '../../../dist/modules/index.js';

const scope = createScope({
  mediaQueries: { isSmall: '(max-width: 800px)' },
  defaults: { ease: 'linear' },
  root: '.scoped',
})
.add(self => {

  const squares = utils.$('.square');

  self.addOnce((scope) => {
    console.log('ADDED ONCE');
    // Everything declared here will be only called once and won't be reverted on mediaquery changes
    animate('.square', {
      y: [0, -50, 0, 50, 0],
      loop: true,
      ease: 'inOut(2)',
      duration: 2500
    });
  })

  self.addOnce(() => {
    console.log('ADDED ONCE');
    // Everything declared here will be only called once and won't be reverted on mediaquery changes
    animate('.square', {
      x: [0, -100, 0, 100, 0],
      loop: true,
      ease: 'inOut(2)',
      duration: 2500
    });
  })

  const rotationAnimation = self.keepTime(() => animate('.square', {
    rotate: 360,
    duration: 2000,
    loop: true,
    alternate: true
  }));

  // Recreate the animation while keeping track of its current time between mediaquery changes
  // self.keepTime(() => animate('.square', {
  //   scale: self.matches.isSmall ? .5 : 1.5,
  //   rotate: 360,
  //   duration: 2000,
  //   loop: true,
  //   alternate: true
  // }));

  function handlePointerEnter() {
    animate(this, {
      scale: 1.5,
      ease: 'out(3)',
      duration: 500
    });
  }

  function handlePointerLeave() {
    animate(this, {
      scale: 1,
      ease: 'out(3)',
      duration: 500
    });
  }

  self.keepTime(() => animate('.square', {
    background: ($el) => utils.get($el, utils.randomPick(['--cyan-1', '--lavender-1', '--pink-1'])),
    loop: true,
    ease: 'inOut(2)',
    alternate: true,
    duration: 2000,
  }));

  squares.forEach($square => $square.addEventListener('pointerenter', handlePointerEnter));
  squares.forEach($square => $square.addEventListener('pointerleave', handlePointerLeave));

  return () => {
    squares.forEach($square => $square.removeEventListener('pointerenter', handlePointerEnter));
    squares.forEach($square => $square.removeEventListener('pointerleave', handlePointerLeave));
  }

});

document.body.addEventListener('click', () => {
  console.log('REVERT');
  scope.revert();
});

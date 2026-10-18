import { animate, createTimer, utils } from '../../dist/modules/index.js';

const $animationWrapper = /** @type {HTMLElement} */ (document.querySelector('#animation-wrapper'));
const $circle = /** @type {HTMLElement} */ (document.querySelector('#circle'));
const viewport = {w: window.innerWidth * .5, h: window.innerHeight * .5};
const rows = 15;
const baseRadius = $circle.offsetWidth / 1.85;
const activeRadius = $circle.offsetWidth / .75;
const pointer = {x: 0, y: 0, isDown: false, radius: baseRadius};
const radiusTimeOut = createTimer({
  duration: 150,
  onComplete: () => pointer.radius = baseRadius
});

function animateParticule($el) {
  createTimer({
    frameRate: 4,
    onUpdate: () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = pointer.isDown ? activeRadius : baseRadius;
      animate($el, {
        x: { to: (Math.cos(angle) * radius) + pointer.x, duration: () => utils.random(1000, 2000) },
        y: { to: (Math.sin(angle) * radius) + pointer.y, duration: () => utils.random(1000, 2000) },
        backgroundColor: '#FF0000',
        scale: .5 + utils.random(.1, 1, 2),
        duration: () => utils.random(1000, 1500),
        ease: `inOut(${utils.random(1, 5)})`,
        composition: 'blend'
      });
    }
  })
}

document.addEventListener('mousemove', e => {
  pointer.x = e.pageX - viewport.w;
  pointer.y = e.pageY - viewport.h;
  pointer.radius = (pointer.isDown ? activeRadius : baseRadius * 1.25);
  radiusTimeOut.restart();
  utils.set($circle, { translateX: pointer.x, translateY: pointer.y });
});

document.addEventListener('mousedown', e => {
  pointer.isDown = true;
  animate($circle, { scale: .5, opacity: 1, filter: 'saturate(1.25)' });
});

document.addEventListener('mouseup', e => {
  pointer.isDown = false;
  animate($circle, { scale: 1, opacity: .3, filter: 'saturate(1)' });
});

const colors = ['red-1', 'corail-1', 'orange-1'];

for (let i = 0; i < (rows * rows); i++) {
  const $particle = document.createElement('div');
  $particle.classList.add('particle');
  utils.set($particle, { color: `var(--${colors[utils.random(0, colors.length - 1)]})` });
  $animationWrapper.appendChild($particle);
  animateParticule($particle);
}

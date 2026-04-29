import { createTimeline, stagger, utils } from '../../dist/modules/index.js';

const totalColors = 14;
const totalDots = 1000;
const w = window.innerWidth;
const h = window.innerHeight;

for (let i = 0; i < totalDots; i++) {
  const el = document.createElement('div');
  el.classList.add('dot');
  el.dataset.color = String(utils.random(0, totalColors - 1));
  document.body.appendChild(el);
}

const dots = document.querySelectorAll('.dot');

utils.set(dots, {
  x: () => utils.random(0, w - 16),
  y: () => utils.random(0, h - 16),
  rotate: () => utils.random(-180, 180),
  scale: () => utils.random(.2, 2, 3),
});

createTimeline({ composition: false })
  .add(dots, {
    scale: [{ from: '-=1', to: '+=2' }],
    rotate: [{ from: '-=180', to: '+=180' }],
    background: [{ from: '#FFF' }],
    duration: 1000,
    ease: 'inOut(3)',
    loop: true,
  }, stagger([0, 2000], { grid: true, from: 'center', axis: 'x' }))
  .init();
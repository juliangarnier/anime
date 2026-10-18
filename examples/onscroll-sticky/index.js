import {
  utils,
  stagger,
  onScroll,
  createTimeline,
  animate,
} from '../../dist/modules/index.js';

const $cards = utils.$('.card');
const $spinners = $cards.map($card => {
  const $spinner = document.createElement('div');
  $spinner.className = 'spinner';
  $spinner.style.position = 'absolute';
  $spinner.style.top = '0';
  $spinner.style.left = '0';
  $spinner.style.width = '100%';
  $spinner.style.height = '100%';
  $spinner.style.transformStyle = 'preserve-3d';
  $card.parentElement?.insertBefore($spinner, $card);
  $spinner.appendChild($card);
  return $spinner;
});

$spinners.forEach(($spinner, i) => {
  const rotate = utils.random(-1, 1, 2);
  const rotateZ = utils.random(-1, 1, 2);
  const yOffset = -.5 * ($spinners.length - 1 - i);
  utils.set($spinner, { rotate, rotateZ, z: i });
  utils.set($cards[i], { translateY: yOffset });
});

const brightness = v => `brightness(${v})`;

utils.set('.front', { filter: stagger([.75, 1], { modifier: brightness }) });
utils.set('.back',  { filter: stagger([1, .75], { modifier: brightness }) });

createTimeline({
  defaults: {
    ease: 'linear',
    duration: 500,
    composition: 'blend',
  },
  autoplay: onScroll({
    target: '.sticky-container',
    enter: 'top top',
    leave: 'bottom bottom',
    sync: .5,
    debug: true,
  }),
})
.add('.stack', {
  rotateY: [-180, 0],
  ease: 'in(2)',
}, 0)
.add('.spinner', {
  rotate: 0,
  rotateZ: { to: stagger([0, -360], { from: 'last' }), ease: 'inOut(2)' },
  transformOrigin: ['50% 100%', '50% 50%'],
  delay: stagger(1, { from: 'first' }),
}, 0)
.add('.card', {
  y: { to: '-60%', duration: 400 },
  delay: stagger(1, { from: 'first' }),
}, 0)
.init()

$cards.forEach($card => {
  $card.onmouseenter = () => animate($card, {
    y: '-70%', duration: 350, composition: 'blend',
  });
  $card.onmouseleave = () => animate($card, {
    y: '-60%', duration: 750, composition: 'blend', delay: 75,
  });
})

import {
  createTimeline,
  stagger,
  utils,
} from '../../dist/modules/index.js';

/**
 * @import {
 *   JSAnimation,
 * } from '../../dist/modules/index.js'
 */

const { random, cos, sin, sqrt, PI } = Math;
const count = 2500;
const duration = 3000;
const win = { w: window.innerWidth * .26, h: window.innerHeight * .26 };
const target = { x: 0, y: 0, r: win.w * .25 };
const radius = Symbol();
const theta = Symbol();

for (let i = 0; i < count; i++) {
  const $el = document.createElement('div');
  const h = utils.random(15, 25);
  const l = utils.random(10, 18);
  utils.set($el, { background: `hsl(${h}, 60%, ${l}%)` });
  $el[theta] = random() * PI * 2;
  $el[radius] = target.r * sqrt(random());
  document.body.appendChild($el);
}

const tl = createTimeline({
  defaults: {
    loop: true,
    ease: 'inOut(1.3)',
    onLoop: self => /** @type {JSAnimation} */(self).refresh(),
  },
});

tl.add('div', {
  x: $el => target.x + ($el[radius] * cos($el[theta])),
  y: $el => target.y + ($el[radius] * sin($el[theta])),
  duration: () => duration + utils.random(-100, 100),
  ease: 'inOut(1.5)',
  onLoop: self => {
    const t = self.targets[0];
    t[theta] = random() * PI * 2;
    t[radius] = target.r * sqrt(random());
    self.refresh();
  },
}, stagger((duration / count) * 1.125))
.add(target, {
  r: () => win.w * utils.random(.05, .5, 2),
  duration: 1250,
}, 0)
.add(target, {
  x: () => utils.random(-win.w, win.w),
  modifier: x => x + sin(tl.currentTime * .0007) * (win.w * .65),
  duration: 2800,
}, 0)
.add(target, {
  y: () => utils.random(-win.h, win.h),
  modifier: y => y + cos(tl.currentTime * .00012) * (win.h * .65),
  duration: 1800,
}, 0);

tl.seek(20000)
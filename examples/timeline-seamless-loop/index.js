import { createTimeline, utils, stagger } from '../../dist/modules/index.js';

const wrapperEl = document.querySelector('#test-wrapper');
const numberOfEls = 500;
const loopDuration = 6000;
const animDuration = loopDuration * .2;
const delay = loopDuration / numberOfEls;
const RADIUS_VH = 26;

const posOnCircle = (angleDeg, radiusVh) => {
  const a = utils.degToRad(angleDeg);
  return {
    x: radiusVh * Math.sin(a),
    y: -radiusVh * Math.cos(a),
  };
};

const els = [];
for (let i = 0; i < numberOfEls; i++) {
  const el = document.createElement('div');
  el.classList.add('el');
  wrapperEl.appendChild(el);
  els.push(el);
}

const strengthFn = stagger([0, 1], { ease: 'inOutSine', reversed: true, from: 'center' });
const angles = els.map((_, i) => (360 / numberOfEls) * i);
const hues = els.map((_, i) => utils.round(360 / numberOfEls * i, 2));
const strengths = els.map((el, i) => utils.round(+strengthFn(el, i, els), 100));
const restPositions = angles.map(a => posOnCircle(a, RADIUS_VH));
const peakPositions = angles.map((a, i) => posOnCircle(a + 10 * strengths[i], RADIUS_VH * 1.1));

els.forEach((el, i) => {
  utils.set(el, {
    backgroundColor: `hsl(${hues[i]},40%,60%)`,
    translateX: restPositions[i].x + 'vh',
    translateY: restPositions[i].y + 'vh',
    rotate: angles[i],
    scale: 1,
  });
});

const tl = createTimeline({
  defaults: {
    ease: 'inOut(2)',
    loopDelay: loopDuration - animDuration,
    duration: animDuration,
  },
})
.add(wrapperEl, {
  // rotate: -360,
  loop: true,
  duration: 24000,
  ease: 'linear',
})
.add(els, {
  backgroundColor: [
    { to: (_, i) => `hsl(${hues[i]},${40 + 20 * strengths[i]}%,${60 + 20 * strengths[i]}%)` },
    { to: (_, i) => `hsl(${hues[i]},40%,60%)` },
  ],
  translateX: [
    { to: (_, i) => peakPositions[i].x + 'vh' },
    { to: (_, i) => restPositions[i].x + 'vh' },
  ],
  translateY: [
    { to: (_, i) => peakPositions[i].y + 'vh' },
    { to: (_, i) => restPositions[i].y + 'vh' },
  ],
  rotate: [
    { to: (_, i) => angles[i] + 10 * strengths[i] },
    { to: (_, i) => angles[i] },
  ],
  scale: [
    { to: (_, i) => [1, 1 + .25 * strengths[i]] },
    { to: 1 },
  ],
  loop: -1,
}, stagger(delay, { start: 0 }));

tl.seek(0);

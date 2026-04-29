import { animate, createTimeline, scrambleText, stagger } from '../../../dist/modules/index.js';

const demos = [
  { id: 'default', params: null },
  { id: 'from-end', params: { from: 'right' } },
  { id: 'from-center', params: { from: 'center' } },
  { id: 'from-random', params: { from: 'random' } },
  { id: 'binary', params: { chars: '01' } },
  { id: 'eased', params: { ease: 'inOut(2)' } },
  { id: 'staggered', params: {}, animParams: { delay: stagger(200) } },
  { id: 'low-cps', params: { settleRate: 5 } },
  { id: 'from-index', params: { from: 20 } },
  { id: 'cursor', params: { cursor: true } },
  { id: 'cursor-pattern', params: { cursor: '░▒▓█' } },
  { id: 'low-perturbation', params: { perturbation: 0.4 } },
  { id: 'seeded', params: { seed: 42 } },
  { id: 'combined', params: { cursor: true, perturbation: 0.5, from: 'center' } },
  { id: 'text-longer', params: { text: 'This text is significantly longer than the original short text, growing smoothly with a scramble transition effect' } },
  { id: 'text-shorter', params: { text: 'Short' } },
  { id: 'text-longer-space', params: { text: 'This text grows with space override padding to maintain consistent width during the transition', override: ' ' } },
  { id: 'text-shorter-end', params: { text: 'End', from: 'right' } },
  { id: 'reversed', params: { from: 'center', reversed: true } },
  { id: 'blank-start', params: { override: '' } },
  { id: 'duration-short', params: { duration: 500 } },
  { id: 'duration-long', params: { duration: 3000 } },
  { id: 'settle-short', params: { settleDuration: 100 } },
  { id: 'settle-long', params: { settleDuration: 800 } },
  { id: 'interval-short', params: { revealRate: 100 } },
  { id: 'interval-long', params: { revealRate: 10 } },
];

for (let i = 0, l = demos.length; i < l; i++) {
  const demo = demos[i];
  const $test = document.getElementById(demo.id);
  const $els = $test.querySelectorAll('.scramble');
  const anim = animate($els, {
    innerHTML: scrambleText(demo.params),
    duration: 1500,
    ...demo.animParams,
  });
  const replay = () => anim.restart();
  $test.addEventListener('pointerenter', replay);
  $test.addEventListener('pointerdown', replay);
}

const resizeTexts = [
  'Hi',
  'Hello World',
  'The quick brown fox jumps over the lazy dog and keeps on running',
  'Pack my box with five dozen liquor jugs and then add a few more for good measure',
  'Nope',
  'The five boxing wizards jump quickly over the lazy dog while the crowd watches in stunned silence',
  'Done',
];

const $resizeEl = document.querySelector('#resize-loop .scramble');
const resizeTl = createTimeline({ loop: true });
for (let i = 1, l = resizeTexts.length; i < l; i++) {
  resizeTl.add($resizeEl, {
    innerHTML: scrambleText({ text: resizeTexts[i], override: false }),
    duration: 1500,
  }, '+=800');
}
resizeTl.init();

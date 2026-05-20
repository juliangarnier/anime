import { createTimeline, scrambleText, stagger } from '../../../dist/modules/index.js';
import { showGUI } from '../../../../../animatorkit/editor/gui/index.js';

showGUI();

const tl = createTimeline();

tl.add('.slide:nth-child(1)', {
  opacity: {to: 1, duration: 250, ease: 'linear' },
  scale: [{from: .75, to: 1, duration: 1500, ease: 'inOut(3.5)'}],
  ease: 'inOut(3)',
});
tl.add('.slide:nth-child(1) p.center', {
  scale: { from: 3 },
  color: { from: 'var(--yellow-1)', to: 'var(--orange-1)' },
  innerHTML: scrambleText({
    override: ' ',
    ease: 'inQuad',
    duration: 500,
    from: 'center',
    cursor: '░▒▓█',
  }),
}, '<<');
tl.add('body', {
  background: 'var(--red-5)',
}, '<<+=50');
tl.add('.slide:nth-child(1) p:not(.center)', {
  scale: { from: .75 },
  color: { to: 'var(--red-1)' },
  innerHTML: scrambleText({
    override: ' ',
    from: 'center',
    duration: 500,
    revealDelay: 250,
    cursor: '░▒▓',
    perturbation: .25,
  }),
}, stagger([250, 750], { grid: true, from: 'center', ease: 'out(3)', start: '<<' }));
tl.add('.slide:nth-child(1) p:not(.center)', {
  innerHTML: scrambleText({
    text: '',
    override: false,
    from: 'center',
    ease: 'outQuad',
    reversed: true,
    duration: 800,
    cursor: '░▒▓',
  })
}, '<+=150');
tl.add('body', {
  background: 'var(--black-1)',
}, '<-=600');
tl.add('.slide:nth-child(1) p.center', {
  scale: 1.5,
  color: { to: 'var(--lime-1)' },
  ease: 'inOutExpo',
  duration: 1500,
  innerHTML: scrambleText({
    text: 'Anime.js Scramble Text',
    ease: 'inQuad',
    override: false,
    from: 'center',
    duration: 1000,
    perturbation: .25,
  }),
}, '<<');
tl.add('.slide:nth-child(1) p.center', {
  scale: 1,
  color: 'var(--white-1)',
  ease: 'inOutExpo',
  duration: 1150,
  innerHTML: scrambleText({
    override: false,
    text: 'Scramble text animations made easy.',
    from: 'right',
    duration: 950,
    settleDuration: 500,
    ease: 'inOut'
  }),
}, '<+=250');
tl.add('.slide:nth-child(1) p.center', {
  innerHTML: scrambleText({
    text: '',
    override: false,
    from: 'random',
    reversed: true,
    duration: 850,
    perturbation: .5,
  }),
}, '<+=500');
tl.set('.slide:nth-child(2)', {
  opacity: 1,
}, '<<');
tl.add('.slide:nth-child(2) p', {
  innerHTML: scrambleText({
    override: ' ',
    from: 'center',
    duration: 500,
    revealDelay: 250,
    cursor: '░▒▓',
    perturbation: .5,
  }),
}, stagger([0, 1000], { grid: true, from: 'center', ease: 'out(3)', start: '<<+=250', reversed: true }));
tl.add('.slide:nth-child(2) p', {
  scale: [.8, 1],
}, stagger([0, 150], { grid: true, from: 'center', ease: 'out(3)', start: '<<', reversed: true }));
tl.add('.slide:nth-child(2) p', {
  innerHTML: scrambleText({
    text: '&nbsp;',
    override: false,
    from: 'center',
    reversed: true,
    duration: 500,
    cursor: '░▒▓',
  })
}, stagger([0, 750], { grid: true, from: 'center', ease: 'out(3)', start: '<+=500' }));
tl.set('.slide:nth-child(3)', {
  opacity: 1,
}, '<<');
tl.add('.slide:nth-child(3) p', {
  color: 'var(--white-1)',
  scale: 1.5,
  ease: 'inOutExpo',
  innerHTML: scrambleText({
    override: ' ',
    from: 'center',
    settleDuration: 500,
    revealRate: 33,
    perturbation: .2,
  }),
}, '-=250')
tl.add('.slide:nth-child(3) p', {
  color: { to: 'var(--orange-1)', duration: 750 },
  ease: 'inOutExpo',
  duration: 1250,
  innerHTML: scrambleText({
    text: 'Anime.js v4.4.0',
    override: false,
    from: 'right',
    cursor: '░▒▓',
    duration: 750,
    ease: 'inOut',
  }),
}, '<+=750')
tl.add('.slide:nth-child(3) p', {
  color: 'var(--yellow-1)',
  scale: 2,
  ease: 'inOutExpo',
  duration: 750,
  innerHTML: scrambleText({
    text: ' ',
    chars: '#!%░▒▓_01',
    override: false,
    // cursor: '░▒▓',
    duration: 750,
    ease: 'out(2)',
    from: 'right',
  }),
}, '<+=1000')
tl.add('body', {
  background: 'var(--orange-5)',
  duration: 750,
}, '<<');
tl.init();

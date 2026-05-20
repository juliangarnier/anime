import { createTimeline, stagger, svg, utils, cubicBezier, eases } from '../../dist/modules/index.js';

const [ $dot1 ] = utils.$('#dot-1');
const onions = [];

for (let i = 0; i < 4; i++) {
  const $clone = $dot1.cloneNode();
  $clone.id = 'dot-1-' + i;
  utils.set($clone, { opacity: 0 });
  $dot1.parentNode.appendChild($clone);
  onions.push($clone);
}

utils.set(onions, {
  transformOrigin: '100% 50% 0px'
});
utils.set(['#a-1', '#n-1', '#i-1', '#m-1', '#e-1', '#dot-1', '#line', '#line-0'], {
  transformOrigin: '50% 100% 0px',
});
utils.set('#four', {
  transformOrigin: '50% 50% 0px',
});
utils.set('#dot-1', {
  translateY: 70,
  scaleY: 3.5,
});
utils.set(['#dot-1', '#line path', '#four', ...onions], {
  opacity: 0,
});
utils.set(['#line', '#line-0'], {
  opacity: 1,
});

const splashCurve = cubicBezier(0.225, 1, 0.915, 0.980);
const sweechCurve = eases.outElastic(1.1, 0.9);

const tl = createTimeline({
  // autoplay: false
  // loop: 3,
  // loopDelay: 2000,
});
tl.label('FALL')
tl.add('#line-0', {
  id: 'line-0 wiggle',
  translateY: {to: [-280, 19], ease: 'inQuart', duration: 320 },
  scaleY: { to: [3, 1.75], ease: 'outElastic(1, 1.4)', duration: 300, delay: 320 },
  scaleX: { to: [.8, 1], ease: 'outElastic(1, 1.4)', duration: 650, delay: 320 },
  d: [
    { to: svg.morphTo('#line-0-1', 0), delay: 320, duration: 60, ease: 'inQuad' },
    { to: svg.morphTo('#line-0-2', 0), duration: 80 },
    { to: svg.morphTo('#line-0-3', 0), duration: 90 },
    { to: svg.morphTo('#line-0-4', 0), duration: 90 },
    { to: svg.morphTo('#line-0-6', 0), duration: 140 },
  ],
  ease: 'inOutQuad',
})
.label('WIGGLE')
.add('#line-0', {
  d: [
    { to: svg.morphTo('#line-1', 0), duration: 340, ease: 'inOutQuad' },
    { to: svg.morphTo('#line-2', 0), duration: 260 },
    { to: svg.morphTo('#line-3', 0), duration: 180 },
    { to: svg.morphTo('#line-4', 0), duration: 180 },
    { to: svg.morphTo('#line-5', 0), duration: 340, ease: 'outSine' }
  ],
  translateY: { to: 0, duration: 500 },
  scaleX: { to: .9, delay: 750, duration: 550, ease: 'outQuad' },
  scaleY: 1,
  duration: 900,
})
.label('POP')
.set('#line', { opacity: 0 }, 'POP')
.set('#dot-1', { opacity: 1, transformOrigin: '50% 50% 0px' }, 'POP')
.add(['#a-1', '#n-1', '#i-1', '#m-1', '#e-1'], {
  translateY: [
    { to: [35, -80], duration: 190, ease: splashCurve },
    { to: 4, duration: 120, delay: 20, ease: 'inQuad' },
    { to: 0, duration: 120, ease: 'outQuad' }
  ],
  scaleX: [
    { to: [.25, .85], duration: 190, ease: 'outQuad' },
    { to: 1.08, duration: 120, delay: 85, ease: 'inOutSine' },
    { to: 1, duration: 260, delay: 25, ease: 'outQuad' }
  ],
  scaleY: [
    { to: [.4, 1.5], duration: 120, ease: 'outSine' },
    { to: .6, duration: 120, delay: 180, ease: 'inOutSine' },
    { to: 1.2, duration: 180, delay: 25, ease: 'outQuad' },
    { to: 1, duration: 190, delay: 15, ease: 'outQuad' }
  ],
  duration: 400,
  ease: 'outSine',
}, stagger(80, { from: 'center' }))
.add('#dot-1', {
  translateY: [
    { to: [30, -170], duration: 240, ease: splashCurve },
    { to: 35, duration: 180, delay: 120, ease: 'inQuad' },
    { to: -50, duration: 250, ease: splashCurve },
    { to: 5, duration: 170, delay: 20, ease: 'inQuad' },
    { to: 0, duration: 120, ease: 'outQuad' }
  ],
  scaleX: { to: [1.1, 1], duration: 260, ease: 'outQuad' },
  scaleY: { to: [4, 1], duration: 190, ease: 'outQuad' },
  rotate: [
    { to: '+=.75turn', duration: 480, ease: 'outSine' },
    { to: '+=.25turn', duration: 420, delay: 160, ease: 'outSine' },
  ],
  ease: 'outSine',
}, 'POP')
.add('#logo', {
  scale: [1.3, 1],
  translateY: [-23, 0],
  duration: 1000,
  ease: 'outExpo',
}, 'POP')
.add('#i-1', {
  scaleY: [
    { to: .25, duration: 150, ease: 'outExpo' },
    { to: 1, duration: 700, delay: 0, ease: 'outElastic(2.11, 0.61)' },
  ],
  scaleX: [
    { to: 1.5, duration: 50, ease: 'outSine' },
    { to: 1, duration: 900, delay: 0, ease: 'outElastic(2.11, 0.61)' },
  ],
}, '<<+=380')
.label('SWEECH', '-=290')
.add('#dot-1', {
  ease: sweechCurve,
  duration: 900,
  points: svg.morphTo('#dot-2', 0),
}, 'SWEECH')
.add(onions, {
  opacity: stagger([1, .4]),
  ease: sweechCurve,
  scaleX: [4, 1],
  duration: 900,
  points: svg.morphTo('#dot-2', 0),
  delay: stagger(18)
}, 'SWEECH');

const sweechParams = {
  ease: sweechCurve,
  duration: 900,
}

tl
.add('#a-1', { d: svg.morphTo('#a-2', 0), ...sweechParams }, 'SWEECH+=00')
.add('#n-1', { d: svg.morphTo('#n-2', 0), ...sweechParams }, 'SWEECH+=10')
.add('#i-1', { points: svg.morphTo('#i-2', 0), ...sweechParams }, 'SWEECH+=20')
.add('#m-1', { d: svg.morphTo('#m-2', 0), ...sweechParams }, 'SWEECH+=30')
.add('#e-1', { d: svg.morphTo('#e-2', 0), ...sweechParams }, 'SWEECH+=40')
.add(svg.createDrawable(['#j-line', '#s-line']), {
  opacity: [.25, 1],
  draw: '0 1',
  duration: 620,
  ease: 'outQuint',
  delay: stagger(40)
}, 'SWEECH+=250')
.label('FOUR', '<+=80')
.add('#four', {
  fill: { from: '#FFF', delay: 600, ease: 'out(2)', duration: 900 },
  opacity: { to: [0, 1], duration: 350, ease: 'out(1)' },
  scale: { to: [1.75, 1], duration: 1400, ease: 'inOutExpo' },
}, 'FOUR')
.add('#blur feGaussianBlur', {
  stdDeviation: ['15,15', '0,0'],
  ease: 'out(2)',
  duration: 1000,
}, '<<')
.set(['#j', '#s'], { opacity: 1 }, '<<')
.set(['#j-line', '#s-line', ...onions], { opacity: 0 }, '<<')
.add(['#a-1', '#n-1', '#i-1', '#m-1', '#e-1', '#j', '#s', '#dot-1'],  {
  translateX: '-=68',
  ease: 'inOutQuint',
  duration: 1250,
  delay: stagger(14),
}, '<<')

const chars = ' !#%&"()*+×,.:;-_=><?@[]^/{|}.-~—0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const charsLength = chars.length;

function wrapInSpan(targetDiv) {
  let target = document.querySelector(targetDiv);
  let text = target.textContent;
  let wrappedText = '';

  for (let char of text) {
    wrappedText += `<span>${char === ' ' ? '&nbsp;' : char}</span>`;
  }

  target.innerHTML = wrappedText;
}

wrapInSpan('#sub-text');

tl.label('TEXT', '<-=600')
.add('#sub-text span', {
  opacity: [
    { to: .9, duration: 200 },
    // { to: .9, duration: 1000 }
  ],
  textContent: {
    to: $el => [0, chars.indexOf($el.textContent)],
    modifier: v => { const c = chars[utils.round(v, 0)]; return c ? c : ' ' },
  },
  duration: 800,
  ease: 'inOutExpo',
  delay: stagger(30, { from: 'center', ease: 'inOut(2)' }),
}, 'TEXT')

// .add('#sub-text span', {
//   opacity: [
//     { to: 1, duration: 100 },
//     { to: .7, duration: 1000 }
//   ],
//   ease: 'out(3)',
//   delay: stagger(20, { ease: 'inQuad' }),
// }, '<-=800')

.label('OUTRO', '+=1000')

.add('#four',  {
  translateX: '-=250',
  ease: 'inOutExpo',
  duration: 750,
}, 'OUTRO')

.add(['#j', '#s', '#dot-1'], {
  opacity: 0,
  duration: 620,
  ease: 'outQuint',
}, 'OUTRO')

.add(['#a-1', '#n-1', '#i-1', '#m-1', '#e-1'],  {
  id: 'a n i m e',
  translateY: 80,
  duration: 300,
  ease: 'outQuint',
  delay: stagger(30, { start: 300, from: 'last' }),
}, 'OUTRO')

.add('#sub-text span', {
  textContent: {
    to: $el => [chars.indexOf($el.textContent), 0],
    modifier: v => { const c = chars[utils.round(v, 0)]; return c ? c : ' ' },
  },
  duration: 800,
  ease: 'inOutExpo',
  delay: stagger(30, { from: 'center', reversed: true, ease: 'inOut(2)' }),
}, '<<+=200')
.add('#four', {
  opacity: { to: 0, duration: 650, ease: 'out(1)' },
}, '<<+=750')
.add('#blur feGaussianBlur', {
  stdDeviation: '15,15',
  ease: 'out(2)',
  duration: 750,
}, '<<')

.init();

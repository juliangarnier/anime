import { animate, createTimer, createTimeline, utils } from '../../dist/modules/index.js';

animate('.anime-css', {
  keyframes: {
    '0%' : {
      a: 100,
      b: 'string',
      c0: (el) => el.dataset.index,
      c1: (el, i) => el.dataset.index + i,
      c2: (el, i, targets) => targets.length - (el.dataset.index + i),
    },
    '20%' : { x: '0rem', y: '-2.5rem', rotate: 45, ease: 'out' },
    '40%' : { x: '17rem', y: '-2.5rem' },
    '50%' : { x: '17rem', y: '2.5rem', rotate: 90 },
    '75%' : { x: '0rem', y: '2.5rem' },
    '100%': { x: '0rem', y: '0rem', rotate: 180 }
  },
  duration: 4000,
  ease: 'linear',
  loop: true,
});

animate('.anime-css', {
  keyframes: [
    {x: 100, duration: 1000},
    {y: 100, duration: 1000},
  ],
  duration: 4000,
  ease: 'linear',
  loop: true,
});

const animation = animate('#target-id', {
  a: 100,
  b: 'string',
  c0: (el) => el.dataset.index, // el should be of type target
  c1: (el, i) => el.dataset.index + i,
  c2: (el, i, targets) => { targets.length - (el.dataset.index + i) }, // Should throw because not returing a valid value
  d: {
    to: 100,
    duration: 10,
  },
  e: {
    from: (el, i, targets) => targets.length - (el.dataset.index + i),
    delay: 10,
  },
  f: [0, 100],
  g: [0, [0, 100], 0, '10px', () => utils.random(100, 200, 3), 0],
  scale: [
    { to: [0, 1], duration: 200, ease: 'outBack' },
    { to: 1, duration: 100, delay: 500, ease: 'inQuart' },
  ],
  delay: (_, i, targets) => i * targets.length,
  duration: (_, i, targets) => i * targets.length,
  modifier: v => v * 100,
  loopDelay: 100,
  loop: true,
  alternate: true,
  autoplay: false,
  ease: 'inOut',
  frameRate: 30,
  playbackRate: 1.5,
  playbackEase: 'cubicBezier(0.1, 0.2, 0.3, 0.4)',
  composition: 'none',
  onBegin: self => console.log(self.currentTime),
  onUpdate: self => console.log(self.currentTime),
  onRender: self => console.log(self.currentTime),
  onLoop: self => console.log(self.currentTime),
  onComplete: self => console.log(self.currentTime),
})

const timer = createTimer({
  delay: () => 100,
  duration: () => 100,
  loopDelay: 100,
  loop: true,
  alternate: true,
  autoplay: false,
  frameRate: 30,
  playbackRate: 1.5,
  onBegin: self => console.log(self.currentTime),
  onUpdate: self => console.log(self.currentTime),
  onLoop: self => console.log(self.currentTime),
  onComplete: self => console.log(self.currentTime),
})

const tl = createTimeline({
  defaults: {
    duration: 100
  }
})
.add('label', 10000)
.add('#target-id', {
  a: 100,
  b: 'string',
  c: (el, i, targets) => { targets.length - (el.dataset.index + i) }, // Should throw
  d: {
    to: 100,
    duration: 10,
  },
  e: {
    from: (el, i, targets) => targets.length - (el.dataset.index + i),
    delay: 10,
  },
  f: [0, 100],
  g: (el) => el.dataset.index, // el should be of type target
  delay: (_, i, targets) => i * targets.length,
  duration: (_, i, targets) => i * targets.length,
  modifier: v => v * 100,
  loopDelay: 100,
  loop: true,
  alternate: true,
  autoplay: false,
  ease: 'inOut',
  frameRate: 30,
  playbackRate: 1.5,
  composition: 'none',
  onBegin: self => console.log(self.currentTime),
  onUpdate: self => console.log(self.currentTime),
  onRender: self => console.log(self.currentTime),
  onLoop: self => console.log(self.currentTime),
  onComplete: self => console.log(self.currentTime),
}, 'label')
.add({
  delay: () => 100,
  duration: () => 100,
  loopDelay: 100,
  loop: true,
  alternate: true,
  autoplay: false,
  frameRate: 30,
  playbackRate: 1.5,
  onBegin: self => console.log(self.currentTime),
  onUpdate: self => console.log(self.currentTime),
  onLoop: self => console.log(self.currentTime),
  onComplete: self => console.log(self.currentTime),
}, 10000)
.add(self => {
  console.log(self.currentTime)
}, 10000)


/** @param {String} v */
animation.onComplete = (v) => v;

/** @param {Animation} v */
timer.onComplete = (v) => v;

/** @param {Timeline} v */
tl.onComplete = (v) => v;

/** @param {Timeline} v */
tl.onComplete = (v) => v;

/** @param {Timer} v */
timer.onComplete = (v) => v;

animation.then
timer.then
tl.then

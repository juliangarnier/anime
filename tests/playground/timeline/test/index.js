import { createTimeline, stagger } from '../../../../dist/modules/index.js';
// import { inspect } from '../../../lib/gui/index.js';

const duration = 1000;

const red = '#F64E4D';
const blue = '#61C3FF';
const green = '#18FF74';
const yellow = '#F6FF56';

const tl = createTimeline({
  // beginDelay: 2000,
  loop: 3,
  alternate: true,
})
.add('.square', {
  translateY: el => el.id == 'square-1' ? -50 : el.id == 'square-2' ? -100 : -150,
  backgroundColor: green,
  duration: 1600,
  delay: 1250,
  beginDelay: 500,
}, stagger(500, {start: '-=250'}))
// .add(//   '#square-1', {
//   translateY: -50,
//   backgroundColor: green,
//   duration: 1600,
//   delay: 500,
// })
// .add(//   '#square-2', {
//   translateY: -100,
//   backgroundColor: green,
//   duration: 1600,
// })
// .add(//   '#square-3', {
//   translateY: -150,
//   backgroundColor: green,
//   duration: 1600,
// })
.add('.square', {
  translateX: [
    { to: stagger([-100, 100]), duration: 1000, delay: 500 },
    { to: 0, duration: 1000, delay: 500 }
  ],
  translateY: [
    { to: 50, duration: 500, delay: stagger(250, {start: 0}) },
    { to: 75, duration: 500, delay: 1000 },
    { to: 100, duration: 500, delay: 1000 }
  ],
  scaleX: [
    { to: .25, duration: 500, delay: stagger(250, {start: 0}), ease: 'easeInOutExpo' },
    { to: 1, duration: 1000 },
    { to: .5, duration: 500, ease: 'easeInOutExpo' },
    { to: 1, duration: 500 }
  ],
  scaleY: [
    { to: 1, duration: 500, delay: stagger(250, {start: 0}) },
    { to: 1.5, duration: 500, delay: 500, ease: 'easeInOutExpo' },
    { to: 1, duration: 500 },
    { to: 2, duration: 500, delay: 500, ease: 'easeInOutExpo' },
    { to: 1, duration: 500 }
  ],
  rotate: [
    { to: 90, duration: 500, delay: stagger(250, {start: 0}), ease: 'easeInOutExpo' },
    { to: 180, duration: 1000, delay: 500, ease: 'easeInOutExpo' },
    { to: 45, duration: 500, delay: 250, ease: 'easeInOutExpo' },
    { to: 180, duration: 500 }
  ],
}, '-=1250')
.add('.square', {
  rotate: -180,
  scale: .5,
  backgroundColor: red,
  duration: 3000,
  delay: stagger(250),
}, '-=3250')
.add('#square-1', {
  translateY: 50,
  backgroundColor: blue,
  left: -200,
}, '-=' + duration)
.add('#square-2', {
  translateY: 50,
  backgroundColor: blue,
  left: -150,
}, '-=' + duration)
.add('#square-3', {
  translateY: 50,
  backgroundColor: blue,
  left: -100,
}, '-=' + duration)
.add('.square', {
  rotate: '-=180',
  scale: 1,
  backgroundColor: yellow,
  left: 100,
  opacity: .5,
  duration: duration * 2,
  delay: stagger(100),
}, '-=' + duration * .75)
.add('.square', {
  translateY: 0,
  backgroundColor: red,
  delay: stagger(100),
}, '-=' + duration)
.add('.square', {
  translateX: '-=100',
  duration: 1000,
// }, stagger(1000, {start: '-=10000'}))
}, 0)
.add('.square', {
  translateX: '+=100',
  duration: 1000,
}, stagger(250, {start: 500}))


// if (tl.children) {
//   tl.children.forEach(child => {
//     child.tweens.forEach(tween => {
//       if (tween.property === 'rotate') {
//         console.log(tween._nx);
//       }
//     });
//   });
// } else {
//   forEachChildren(tl, child => {
//     forEachChildren(child, tween => {
//       if (tween.property === 'rotate') {
//         console.log(tween._nextSibling);
//       }
//     })
//   })
// }

// inspect(tl);


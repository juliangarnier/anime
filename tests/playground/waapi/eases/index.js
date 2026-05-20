import { waapi, animate, stagger, createSpring, utils } from '../../../../dist/modules/index.js';

const $animation = document.querySelector('.animation');
const total = 36;

for (let i = 0; i < total; i++) {
  const $square = document.createElement('div');
  $square.classList.add('square', 'red');
  utils.set($square, { rotate: (i / total) * 360, translateY: 250 })
  $animation.appendChild($square);
}

// WAAPI

// const targets = document.querySelectorAll('.square');
// const animations = [];

// targets.forEach(($el, i) => {
//   animations[i] = $el.animate({
//     transform: `rotate(${(i / total) * 360}deg) translateY(200px) scaleX(.25)`,
//     backgroundColor: [`var(--orange-1)`, `var(--red-1)`],
//   }, {
//     easing: 'linear(0, 0.02, 0.0749, 0.1573, 0.2596, 0.3749, 0.4966, 0.6191, 0.7374, 0.8476, 0.9467, 1.0325, 1.1038, 1.16, 1.2014, 1.2285, 1.2425, 1.245, 1.2376, 1.222, 1.2003, 1.1742, 1.1453, 1.1152, 1.0854, 1.0568, 1.0304, 1.007, 0.9869, 0.9704, 0.9576, 0.9484, 0.9427, 0.9401, 0.9402, 0.9426, 0.9468, 0.9525, 0.9592, 0.9664, 0.9737, 0.981, 0.9879, 0.9942, 0.9997, 1.0044, 1.0082, 1.0111, 1.0131, 1.0143, 1.0148, 1.0146, 1.0138, 1.0127, 1.0112, 1.0095, 1.0078, 1.0059, 1.0042, 1.0025, 1.001, 0.9997, 0.9986, 0.9978, 0.9971, 0.9967, 0.9964, 0.9965, 0.9967, 0.997, 0.9974, 0.9978, 0.9982, 0.9987, 0.9991, 0.9995, 0.9998, 1.0001, 1.0004, 1.0006, 1.0007, 1.0008, 1.0009, 1.0008, 1.0007, 1.0006, 1.0005, 1.0004, 1.0003, 1.0002, 1.0001, 1, 0.9999, 0.9998, 1)',
//     iterations: Infinity,
//     direction: 'alternate',
//     fill: 'forwards',
//     delay: i * 95,
//     duration: 1680,
//   })
// });

// animations.forEach(anim => {
//   anim.currentTime += 10000;
// });

// Anime.js WAAPI wrapper

waapi.animate('.square', {
  transform: (_, i) => `rotate(${(i / total) * 360}deg) translateY(200px) scaleX(.25)`,
  backgroundColor: {
    to: [`var(--orange-1)`, `var(--red-1)`],
    ease: 'linear',
    duration: 3000,
  },
  ease: createSpring({ stiffness: 150 }),
  loop: true,
  alternate: true,
  delay: stagger(95),
}).seek(10000)
























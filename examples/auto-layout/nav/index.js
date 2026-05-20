import { createLayout, spring, $ } from '../../../dist/modules/index.js';

const nav = createLayout('nav ul', {
  ease: spring({ bounce: .2, duration: 350 }),
});

const content = createLayout('.content', {
  enterFrom: {
    opacity: 0,
    duration: 500,
    delay: 200,
    ease: 'inOut(3)'
  },
  leaveTo: {
    opacity: 0,
    duration: 500,
    ease: 'out(3)'
  },
});

document.onclick = e => {
  const $button = e.target.closest('button');
  if ($button) {
    nav.update(() => {
      content.record();
      $button.appendChild($('.button-bg')[0]);
      $('section').forEach($section => $section.classList.remove('is-active'));
      $(`section[data-color="${$button.dataset.color}"]`)[0].classList.add('is-active');
      content.animate();
    });
  }
}

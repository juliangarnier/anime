import { createLayout, spring } from '../../../dist/modules/index.js';

const accordion = createLayout('.accordion', {
  properties: ['background-color'],
  ease: spring({ bounce: .2, duration: 450 }),
  added: { opacity: 0, filter: 'blur(5px)' },
  removed: { opacity: 0, filter: 'blur(5px)' }
});

document.addEventListener('click', event => {
  const $toggled = event.target.closest('.accordion button');
  if ($toggled) accordion.update(() => $toggled.parentElement.classList.toggle('is-open'))
});

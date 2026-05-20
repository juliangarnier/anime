import { createLayout, utils } from '../../../dist/modules/index.js';

const layout = createLayout('.container', {
  properties: ['color'],
  duration: 1000
});

const moveCard = $card => {
  const $parent = $card.parentElement;
  const $nextParent = $parent.nextElementSibling || $parent.previousElementSibling;
  $parent.style.zIndex = '0';
  $nextParent.style.zIndex = '1';
  $nextParent.appendChild($card);
}

document.addEventListener('click', e => {
  const $card = e.target.closest('.card');
  console.log($card);
  if ($card) layout.update(() => moveCard($card));
});

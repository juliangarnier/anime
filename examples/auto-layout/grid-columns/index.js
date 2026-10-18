import { createLayout, utils, stagger } from '../../../dist/modules/index.js';

const $cards = /** @type {HTMLElement} */(document.getElementById('cards'));
const $buttons = utils.$('.controls fieldset button');

const colors = [
  'Red', 'Corail', 'Orange', 'Yellow',
  'Citrus', 'Lime', 'Green', 'Emerald',
  'Turquoise', 'Aqua', 'Cyan', 'Sky',
  'Indigo', 'Lavender', 'Purple', 'Magenta',
];

const lorem = [
  'Lorem ipsum dolor sit amet.',
  'Sed do eiusmod tempor incididunt.',
  'Ut enim ad minim veniam.',
  'Duis aute irure dolor.',
];

for (let i = 0; i < colors.length; i++) {
  $cards.innerHTML += `
    <div class="card" data-color="${i}">
      <h3>${colors[i]}</h3>
      <p>${lorem[i % lorem.length]}</p>
    </div>
  `;
}

const layout = createLayout($cards, {
  duration: 750,
  ease: 'inOutExpo',
});

let currentCols = 4;

$buttons.forEach($btn => {
  $btn.onclick = () => {
    const newCols = $btn.dataset.cols ? +$btn.dataset.cols : 0;
    const reversed = newCols < currentCols;
    currentCols = newCols;
    layout.update(() => {
      $buttons.forEach($b => $b.classList.remove('is-active'));
      $btn.classList.add('is-active');
      $cards.style.setProperty('--cols', String(newCols));
      $cards.classList.remove('cols-3', 'cols-4', 'cols-5');
      $cards.classList.add(`cols-${newCols}`);
    }, {
      delay: stagger([0, 500], { reversed }),
    });
  };
});

import { createLayout, utils, stagger } from '../../../dist/modules/index.js';

const $cards = /** @type {HTMLElement} */(document.getElementById('cards'));
const $buttons = utils.$('.controls fieldset button');

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Duis aute irure dolor in reprehenderit in voluptate velit.',
  'Excepteur sint occaecat cupidatat non proident sunt in culpa.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.',
];

for (let i = 1; i <= 12; i++) {
  $cards.innerHTML += `
    <div class="card">
      <img src="https://picsum.photos/400/300?random=${i}" alt="Photo ${i}">
      <div class="info">
        <h3>Card Title ${i}</h3>
        <p>${lorem[i % lorem.length]}</p>
      </div>
    </div>
  `;
}

const layout = createLayout($cards, {
  duration: 750,
  ease: 'inOutExpo',
});

const views = ['tiles', 'list', 'uniform'];
let currentView = views.indexOf('list');

$buttons.forEach($btn => {
  $btn.onclick = () => {
    const newView = views.indexOf($btn.dataset.view || '');
    if (newView === -1 || newView === currentView) return;
    const reversed = newView < currentView;
    currentView = newView;
    layout.update(() => {
      $buttons.forEach($b => $b.classList.remove('is-active'));
      $btn.classList.add('is-active');
      $cards.classList.remove(...views);
      $cards.classList.add(views[newView]);
    }, {
      delay: stagger([0, 500], { reversed }),
    });
  };
});

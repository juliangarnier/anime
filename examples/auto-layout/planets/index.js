import { createLayout, utils, stagger } from '../../../dist/modules/index.js';

const planetTypes = [
  "Rocky planet",
  "Gas giant",
  "Ice giant"
];

const planets = [
  60, "Mercury", "Smallest planet and closest to the Sun.", 0, 3, 3, 1, [],
  90, "Venus", "Slow-spinning world with runaway greenhouse heat.", 0, 4, 3, 2, [],
  100, "Earth", "It's apparently pretty nice over there.", 0, 5, 3, 6, [],
  80, "Mars", "Cold desert planet with canyons and polar ice.", 0, 6, 3, 0, [],
  250, "Jupiter", "Gigantic gas giant with a powerful magnetic field.", 1, 8, 3, 3, [],
  150, "Saturn", "Ringed gas giant with dozens of icy moons.", 1, 9, 3, 4, [180, 200, 220, 240],
  120, "Uranus", "An ice giant tipped almost completely on its side.", 2, 10, 3, 8, [150],
  110, "Neptune", "Distant ice giant with supersonic winds.", 2, 11, 3, 10, [],
];

const latin = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et",
  "dolore", "magna", "aliqua", "enim", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea",
  "commodo", "consequat", "duis", "aute", "irure", "dolor", "in", "reprehenderit", "voluptate"
]

function loremIpsum(words = 100) {
  let text = [];
  for (let i = 0; i < words; i++) {
    text.push(latin[Math.floor(Math.random() * latin.length)]);
  }
  let sentence = text.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

let nextPlanetIndex = 0;
const initialPlanets = 4;
const toggles = utils.$('.controls button.toggle');
const [ $root ] = utils.$('#root');
const [ $overlay ] = utils.$('#overlay');

const actions = {
  add: () => {
    const $visibleCards = utils.$('#root .card:not(.is-removed)');
    const visibleCardsLength = $visibleCards.length;
    if (visibleCardsLength) utils.set($visibleCards, { '--total': visibleCardsLength + 1 });
    nextPlanetIndex = visibleCardsLength * 8;
    if (nextPlanetIndex >= planets.length) return;
    const template = utils.$('#card')[0];
    const $removed = utils.$('#root .card.is-removed')[0];
    let $cardTarget = $removed;
    if (!$cardTarget) {
      const clone = template.content.cloneNode(true);
      const $card = clone.querySelector('.card');
      if (!$card) return;
      const $image = $card.querySelector('.card-image');
      const $title = $card.querySelector('.card-title');
      const $type = $card.querySelector('.card-type');
      const $intro = $card.querySelector('.card-intro-description');
      const $description = $card.querySelector('.card-more-info');
      $image.innerHTML += `
        <svg class="planet" viewBox="0 0 600 600"><circle cx="300" cy="300" r="${planets[nextPlanetIndex]}"/></svg>
      `;
      $image.innerHTML += `
        <svg class="rings" viewBox="0 0 600 600">
          ${planets[nextPlanetIndex + 7].map(r => `<circle cx="300" cy="300" r="${r}"/>`).join('')}
        </svg>
      `;
      utils.set($card, { '--index': visibleCardsLength + 1 });
      $card.dataset.title = $title.textContent = planets[nextPlanetIndex + 1];
      $type.textContent = planetTypes[planets[nextPlanetIndex + 3]];
      $intro.textContent = planets[nextPlanetIndex + 2];
      $card.dataset.color = planets[nextPlanetIndex + 6];
      $description.textContent = loremIpsum(utils.random(100, 150));
      $cardTarget = $card;
      $root.appendChild(clone);
    }
    $cardTarget.classList.remove('is-removed');
  },
  remove: () => {
    const $lastCard = utils.$('#root .card:not(.is-removed)').pop();
    if ($lastCard) $lastCard.classList.add('is-removed');
  },
  shuffle: () => {
    utils.shuffle(utils.$('.card:not(.is-removed)')).forEach($el => $el.parentElement.appendChild($el));
  }
}

for (let i = 0; i < initialPlanets; i++) {
  actions.add();
}

const cardsLayout = createLayout($root, {
  properties: ['font-size'],
  enterFrom: {
    opacity: $el => $el.classList.contains('card') ? `1` : '0',
    transform: $el => $el.classList.contains('card') ? `translateY(150%) scale(.5)` : 'none',
  },
  leaveTo: {
    opacity: 0,
    transform: ($el) => {
      const i = [...$el.parentElement.children].indexOf($el);
      const d = i % 2 ? -1 : 1;
      return $el.classList.contains('card') ? `translate(${50 * d}%, 50%) rotate(${20 * d}deg) scale(.5)` : 'none';
    },
  },
});

const modalLayout = createLayout($overlay, {
  children: ['.card', '.card-image', '.card-image-grid', '.card-title', '.card-type', '.close-overlay'],
  properties: ['--overlay-alpha'],
  duration: 500,
});

const closeModal = () => {
  let $card;
  modalLayout.update(() => {
    $overlay.close();
    $card = utils.$('#root .card.is-open')[0];
    $card.classList.remove('is-open');
    $card.focus({ preventScroll: true });
  }).then(() => {
    $card.focus({ preventScroll: true });
  })
};

const handleClick = e => {
  const $target = e.target;
  const $card = $target.closest('#root .card');
  if ($card) {
    e.preventDefault();
    const $clone = document.createElement('div');
    $clone.innerHTML = $card.cloneNode(true).innerHTML;
    $clone.classList = $card.classList;
    $clone.dataset.layoutId = $card.dataset.layoutId;
    $clone.dataset.color = $card.dataset.color;
    $overlay.innerHTML = '';
    const cloneChildren = $clone.querySelectorAll('*');
    cloneChildren.forEach($el => $el.removeAttribute('style'));
    $overlay.appendChild($clone);
    modalLayout.update(() => {
      $overlay.showModal();
      $clone.querySelector('button').disabled = false;
      $card.classList.add('is-open');
    });
  }
  if ($target.closest('#overlay .close-overlay') || $target.id === 'overlay') {
    closeModal();
  }
  const $button = $target.closest('.controls button');
  if ($button) {
    const isToggle = $button.classList.contains('toggle');
    const isAction = $button.classList.contains('action');
    const buttonId = $button.id;
    cardsLayout.update(() => {
      if (isToggle) {
        toggles.forEach(toggle => toggle.classList.remove('is-active'));
        $button.classList.add('is-active');
      } else if (isAction) {
        actions[buttonId]();
      }
      const cards = utils.$('#root .card:not(.is-removed)');
      const layoutType = utils.$('button.is-active')[0].id;
      $root.dataset.layout = layoutType;
      if (cards.length) {
        if (layoutType === 'stack') {
          utils.set(cards, {
            x: 0,
            y: stagger(10, { reversed: true}),
            z: stagger(-20, { reversed: true}),
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
          });
        } else if (layoutType === 'chaos') {
          utils.set(cards, {
            x: () => utils.random(-10, 10) + 'vw',
            y: () => utils.random(-10, 10) + 'vh',
            z: () => utils.random(600, 750),
            rotateX: () => utils.random(-45, 45),
            rotateY: () => utils.random(-45, 45),
            rotateZ: () => utils.random(-45, 45),
            scale: () => utils.random(.2, .3, 2),
          });
        } else {
          utils.set(cards, { transform: 'none' });
        }
      }
    }, {
      duration: isAction ? 350 : 450,
      ease: isAction ? 'out(3)' : 'inOut(3)',
      delay: isAction ? 0 : stagger([0, 350])
    });
  }
}

document.addEventListener('click', handleClick);
$overlay.addEventListener('cancel',  closeModal);

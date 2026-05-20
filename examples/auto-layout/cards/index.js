import { createLayout } from '../../../dist/modules/index.js';

const cards = document.getElementById('cards')

const lorem = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Sed do eiusmod tempor incididunt ut labore et dolore magna.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
  'Duis aute irure dolor in reprehenderit in voluptate velit.',
  'Excepteur sint occaecat cupidatat non proident sunt in culpa.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut.',
]

// Generate 12 cards
for (let i = 1; i <= 12; i++) {
  cards.innerHTML += `
    <div class="card">
      <img src="https://picsum.photos/400/300?random=${i}" alt="Photo ${i}">
      <div class="info">
        <h3>Card Title ${i}</h3>
        <p>${lorem[i % lorem.length]}</p>
      </div>
    </div>
  `
}

const layout = createLayout('#cards', {
  duration: 1000
});

document.querySelectorAll('nav button').forEach(btn => {
  btn.onclick = () => {
    layout.update(() => {
      cards.className = btn.dataset.view;
    })
  }
})

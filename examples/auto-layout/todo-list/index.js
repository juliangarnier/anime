import { createLayout, spring, stagger, $ } from '../../../dist/modules/index.js';

const layout = createLayout($container, {
  properties: ['backgroundColor', 'color', 'accent-color'],
  ease: spring({ bounce: .3, duration: 450 }),
  leaveTo: {
    opacity: 0,
    transform: 'translateY(.5rem) scale(.9)',
  }
});

const createItem = (text) => {
  const $item = /** @type {HTMLLIElement} */($todoTemplate.content.firstElementChild.cloneNode(true));
  const $checkbox = $item.querySelector('input[type="checkbox"]');
  const $labelText = $item.querySelector('.text');
  $labelText.textContent = text;
  $checkbox.addEventListener('change', handleToggle);
  return $item;
}

const handleToggle = event => {
  const $checkbox = /** @type {HTMLInputElement} */(event.currentTarget);
  const $item = $checkbox.closest('.item');
  if (!$item) return;
  const $targetList = $checkbox.checked ? $completed : $pending;
  $('.list').forEach($el => $el.classList.toggle('is-active', $el === $targetList));
  $('.item').forEach($el => $el.classList.toggle('is-floating', $el === $item));
  layout.update(() => $targetList.insertBefore($item, $targetList.firstElementChild), { ease: 'inOutExpo' });
}

const addItem = () => {
  const value = $addInput.value.trim();
  if (!value) return;
  const $item = createItem(value);
  // debugger;
  $new.appendChild($item);
  layout.update(() => $pending.insertBefore($item, $pending.firstElementChild));
  $addInput.value = '';
}

const handleAction = event => {
  const $button = /** @type {HTMLButtonElement} */(event.target);
  const $item = $button.closest('.item');
  if (!$item) return;
  const $parent = $item.parentElement;
  if ($parent.id === '$createForm') {
    addItem();
  } else {
    layout.update(() => {
      $item.classList.add('is-removed');
    }, {
      ease: 'out(3.5)',
      onComplete: () => {
        if ($parent.children.length > 1) { // If there are more than one element left remove the element directly
          $item.remove();
        } else { // Otherwise wrap the removal into a layout.update() to avoid abrupt list resizing
          layout.update(() => $item.remove())
        }
      }
    });
  }
}

$createForm.addEventListener('submit', event => {
  event.preventDefault();
  addItem();
});

document.addEventListener('click', event => {
  if (event.target.classList.contains('action')) handleAction(event);
});
var path = anime.path('path');

anime({
  targets: 'rect',
  translate: path,
  rotate: path,
  duration: 3000,
  loop: true,
  easing: 'linear'
});

anime({
  targets: 'path',
  opacity: 0,
  duration: 6000,
  loop: true,
  direction: 'alternate',
  easing: 'easeInOutExpo'
});
import {
  utils,
  createScope,
  createTimeline,
  stagger
} from '../../../dist/modules/index.js';

createScope({
  mediaQueries: { minM: '(min-width: 800px)' }
}).add(self => {
  self.keepTime(scope => {
    const isMinM = scope.matches.minM;
    document.body.classList.toggle('is-min-m', isMinM);
    return createTimeline().add('.square', {
      x: isMinM ? 0 : [-50, 50],
      y: isMinM ? [-50, 50] : 0,
      rotate: -90,
      scale: .75,
      alternate: true,
      loop: true,
      ease: 'inOutQuad',
    });
  });
});

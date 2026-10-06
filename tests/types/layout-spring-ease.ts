import { createLayout, spring } from '../../dist/modules/index.js';

// Spring must be accepted on layout state ease (enterFrom / leaveTo / swapAt).
// If LayoutStateParams's index signature excludes Spring, this file fails typecheck.
createLayout(document.createElement('div'), {
  enterFrom: {
    opacity: 0,
    ease: spring({ bounce: 0.38, duration: 280 }),
  },
  leaveTo: {
    opacity: 0,
    ease: spring({ bounce: 0.2, duration: 200 }),
  },
  swapAt: {
    ease: spring(),
  },
});

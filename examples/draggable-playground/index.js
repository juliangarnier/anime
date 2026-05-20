import {
  animate,
  createTimer,
  createDraggable,
  createAnimatable,
  utils,
  stagger,
  eases,
  createSpring,
  createTimeline,
  engine,
} from '../../dist/modules/index.js';

engine.timeUnit = 'ms';
// engine.timeUnit = 's';

const [ $log ] = utils.$('#log');

createDraggable('#fixed', {
  container: document.body,
  releaseStiffness: 200,
  releaseDamping: 8,
  velocityMultiplier: 4,
  onDrag: self => {
    $log.innerHTML = `${utils.round(self.velocity, 3)}`;
  },
  onUpdate: self => {
    console.log(self.x);
  }
});

let scrollTop, scrollStyles;

function blockScrolling() {
  if (scrollStyles) return;
  const $scroll = document.scrollingElement;
  scrollTop = $scroll.scrollTop;
  scrollStyles = utils.set([document.documentElement, $scroll], {
    overflow: 'hidden', position: 'sticky', height: window.innerHeight - 1 + 'px'
  });
}

function enableScrolling() {
  if (!scrollStyles) return;
  scrollStyles.revert();
  scrollStyles = null;
  window.scrollTo({ top: scrollTop, behavior: 'instant' });
}

const [ $drawer ] = /** @type {Array<HTMLElement>} */(utils.$('.drawer'));

const drawerOpenAnim = createTimeline({
  autoplay: false,
  defaults: { ease: 'linear' }
})
.add('#draggables', {
  y: [10, 0],
  scale: $el => [1 - (20 / $el.offsetWidth), 1],
  borderRadius: ['.5rem', 0],
  opacity: [.5, 1],
}, 0)
.add(document.body, {
  backgroundColor: { from: '#000' },
}, 0)
.add($drawer, {
  opacity: [1, 0],
  duration: 10,
  delay: 990,
  ease: 'out(4)',
}, 0);

const drawer = createDraggable($drawer, {
  container: () => [0, $drawer.offsetWidth, $drawer.offsetHeight, 0],
  y: { snap: ({ $target }) => $target.offsetHeight },
  x: false,
  velocityMultiplier: 4,
  containerFriction: 1,
  onUpdate: (self) => {
    drawerOpenAnim.progress = self.progressY;
    self.progressY < .95 ? blockScrolling() : enableScrolling();
  },
  onResize: (self) => {
    self.progressY = self.progressY > .5 ? 1 : 0
  }
});

utils.$('#toggle-drawer')[0].onclick = () => {
  drawer.stop();
  animate(drawer, {
    progressY: drawer.y < 100 ? 1 : 0,
    duration: 375,
    ease: 'out(4)',
  });
}

drawer.progressY = 1;

createDraggable('#nested-draggable', {
  container: '.drawer',
});

createDraggable('#body-snap', {
  container: document.body,
  x: { snap: 200 },
  y: { snap: 100 },
});

const [ $rangeX ] = utils.$('.range-x .draggable');

const rangeX = createDraggable($rangeX, {
  container: '.range-x',
  containerPadding: 10,
  snap: 200,
  y: false,
  onGrab: () => animateRangeX.pause(), // Here we manually pause the animation animating the draggable
  onSettle: () => {
    animateRangeX.refresh().restart();
  }
});

const animateRangeX = animate(rangeX, {
  progressX: el => el.progressX > .5 ? 0 : 1,
  // loop: true,
  duration: 1500,
  ease: 'inOut(3)',
  onLoop: self => self.refresh()
});

const rangeY = createDraggable('.range-y .draggable', {
  container: '.range-y',
  containerPadding: 10,
  snap: 200,
  x: false,
  // containerFriction: 0,
  // minVelocity: 2,
  // minVelocity: 2,
  cursor: { onHover: 'ns-resize', onGrab: 'move' },
  // cursor: false,
  releaseEase: createSpring({
    mass: 1,
    stiffness: 400,
    damping: 30
  }),
});

createDraggable('#container-no-scroll .draggable', {
  container: '#container-no-scroll',
  containerPadding: 10,
});

createDraggable('#container-scroll .draggable', {
  container: '#container-scroll',
  containerPadding: 10,
  scrollThreshold: 10,
});

createDraggable('#transformed-container .draggable', {
  container: '#transformed-container',
  containerPadding: 10,
});

createDraggable('#array-container .draggable', {
  container: [0, 200, 200, 0],
  containerPadding: 50,
});

// Bounded flick carousel

const boundedFlickLength = utils.$('#bounded-flick .carousel-item').length;
const boundedFlickWidth = 290;

const boundedFlicker = createDraggable('#bounded-flick .carousel', {
  container: [0, 0, 0, -boundedFlickWidth * (boundedFlickLength - 1)],
  y: false,
  snap: boundedFlickWidth,
});

utils.set('#bounded-flick .carousel', {
  width: `${boundedFlickLength * boundedFlickWidth - 10}`
});

// Snap carousel
const [ $snapCarousel ] = utils.$('#snap-carousel .carousel');
const snapCarouselItems = /** @type {Array<HTMLElement>} */(utils.$('#snap-carousel .carousel-item'));

const snapTo = snapCarouselItems.map($el => -$el.offsetLeft);

createDraggable($snapCarousel, {
  trigger: '#snap-carousel',
  x: { modifier: utils.wrap(snapTo[snapTo.length / 2], 0) },
  y: false,
  snap: snapTo,
  // containerFriction: 1,
});

// Object target

const [ $flickCarousel ] = utils.$('#infinite-flick .carousel');
const flickLength = utils.$('#infinite-flick .carousel-item').length;
const flickData = { width: 290, speedX: 2, wheelY: 0 };

utils.set($flickCarousel, { width: `${flickLength * flickData.width - 10}` });

const flickAnimatable = createAnimatable($flickCarousel, {
  x: 0,
  modifier: utils.wrap(-flickData.width * (flickLength / 2), 0),
});

const flickDraggable = createDraggable(flickData, {
  trigger: '#infinite-flick',
  y: false,
  onGrab: () => animate(flickData, { speedX: 0, duration: 500 }),
  onRelease: () => animate(flickData, { speedX: 2, duration: 500 }),
  releaseStiffness: 10,
});

createTimer({
  onUpdate: () => {
    const { x } = flickAnimatable;
    x(/** @type {Number} */(x()) - flickData.speedX + flickDraggable.deltaX - flickData.wheelY);
  }
});

// Support mousewheel

const wheelDeltaAnim = animate(flickData, {
  wheelY: () => 0,
  duration: 500,
  autoplay: false,
});

/**
 * @type {EventListener}
 * @param {WheelEvent} e
 */
function onWheel(e) {
  e.preventDefault();
  flickData.wheelY = utils.lerp(flickData.wheelY, e.deltaY, .2);
  wheelDeltaAnim.refresh().restart()
}

$flickCarousel.addEventListener('wheel', onWheel, { passive: false });

// Draggable list

const list = [];
const snap = 60;
let bodySticky;

utils.$('#onsnap-callback .draggable').forEach(($listItem, itemIndex) => {
  const draggable = createDraggable($listItem, {
    container: '#onsnap-callback',
    x: false,
    containerPadding: 10,
    snap,
    onGrab: self => {
      animate(self.$target, { scale: 1.05, duration: 350 });
      bodySticky = utils.set(document.scrollingElement, { position: 'sticky' }) // Hack for Safari mobile
    },
    onRelease: self => {
      animate(self.$target, { scale: 1.00, duration: 450 });
      bodySticky.revert();
    },
    onSnap: self => {
      const fromIndex = list.indexOf(self);
      const toIndex = utils.round(0).clamp(0, list.length - 1)(self.destY / snap);
      if (toIndex !== fromIndex) {
        list.splice(fromIndex, 1);
        list.splice(toIndex, 0, self);
        list.forEach((item, i) => {
          if (i !== toIndex) {
            animate(item, {
              y: i * snap,
              duration: 750,
              ease: eases.outElastic(.8, 1)
            });
          }
        });
      }
    }
  });
  draggable.y = itemIndex * snap;
  utils.set($listItem, { willChange: 'transform', z: 10 });
  list.push(draggable);
});

utils.set('#onsnap-callback .list', { height: `${list.length * snap - 10}` });

// Map value carousel

const carouselItems = utils.$('#map-props .carousel-item');
const itemAngle = 360 / carouselItems.length;

utils.set('#map-props .carousel-item', {
  top: '50%',
  left: '50%',
  x: '-50%',
  y: '-50%',
  rotateY: stagger(itemAngle),
  z: 'min(40vw, 200px)',
});

const carousel = createDraggable('#map-props .carousel', {
  trigger: '#map-props',
  x: { mapTo: 'rotateY' },
  y: false,
  snap: itemAngle,
  dragSpeed: .4,
  releaseStiffness: 10,
  containerPadding: 10,
});

const [ $prev, $next ] = utils.$('.carousel-buttons .button');

const prev = e => {
  e.preventDefault();
  animate(carousel, { x: utils.snap(carousel.x + 40, itemAngle), duration: 500, ease: 'out(4)' });
}
const next = e => {
  e.preventDefault();
  animate(carousel, { x: utils.snap(carousel.x - 40, itemAngle), duration: 500, ease: 'out(4)' });
}

$prev.addEventListener('click', prev);
$next.addEventListener('click', next);

// Dynamic values

const dynamicDraggables = utils.$('.dynamic .draggable').map($el => {
  return createDraggable($el, {
    container: '.dynamic',
    containerPadding: 10,
    snap: 1,
    containerFriction: 1,
  });
});

const [ left, right, center ] = dynamicDraggables;

// Set the initial padding values
left.containerPadding[1] = 100;
right.containerPadding[3] = 100;
center.parameters.containerPadding = () => [10, Math.abs(right.x - 10), 10, left.x + 10];
center.refresh();

// Update center and right padding on left drag
left.onUpdate = ({ x }) => {
  right.containerPadding[3] = x + 90;
  center.refresh();
}

// Update center and left padding on right drag
right.onUpdate = ({ x }) => {
  left.containerPadding[1] = Math.abs(x - 90);
  center.refresh();
}

// left.animateInView();
// center.animateInView();
// right.animateInView();

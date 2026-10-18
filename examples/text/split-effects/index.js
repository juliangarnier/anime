import {
  animate,
  createTimeline,
  stagger,
  splitText,
  utils,
} from '../../../dist/modules/index.js';

import { GUI } from 'tweaks/gui';

const coords = [];

let split;
let isSplit = false;
let canReorder = false;

const splitAndAnimate = (debug = false) => {
  isSplit = true;
  canReorder = false;

  split = splitText('p', {
    lines: true,
    debug,
  });

  split.addEffect(split => {
    return createTimeline({
      defaults: {
        alternate: true,
        loop: true,
        loopDelay: 75,
        duration: 1500,
        ease: 'inOutQuad',
      },
    })
    .add(split.lines, {
      color: { from: 'var(--sega-1)' },
      y: -10,
      scale: 1.1,
    }, stagger(100, { start: 0 }))
    .add(split.words, {
      scale: [.98, 1.04],
    }, stagger(100, { use: 'data-line', start: 0 }))
    .init()
  });

  split.addEffect(split => {
    split.words.forEach(($el, i) => {
      const c = coords[i];
      if (c) utils.set($el, { x: c.x, y: c.y });
      $el.addEventListener('pointerenter', () => {
        canReorder = true;
        animate($el, {
          x: utils.random(-50, 50),
          y: utils.random(-50, 50),
        })
      });
    });
    return () => {
      split.words.forEach((w, i) => coords[i] = { x: utils.get(w, 'x'), y: utils.get(w, 'y') });
    }
  });
};

const revert = () => {
  if (!split) return;
  split.revert();
  coords.length = 0;
  isSplit = false;
  canReorder = false;
};

const reorder = () => {
  if (!split) return;
  animate(split.words, { x: 0, y: 0, ease: 'inOutExpo' });
  canReorder = false;
};

splitAndAnimate();

GUI.render(() => {
  if (!GUI.BeginPanel('Split effects')) return;
  const debugRef = GUI.Ref('debug', false);
  GUI.BeginGroup('actions', 'div.row');
    if (isSplit) {
      if (GUI.ButtonInput('Revert')) revert();
    } else {
      if (GUI.ButtonInput('Split')) splitAndAnimate(debugRef());
    }
    if (canReorder) {
      if (GUI.ButtonInput('Tidy up')) reorder();
    }
    if (GUI.ToggleButtonInput('Debug', debugRef) && split) {
      split.debug = debugRef();
      split.refresh();
    }
  GUI.EndGroup('actions');
  GUI.EndPanel();
});

import {
  animate,
  stagger,
  splitText,
} from '../../../dist/modules/index.js';
import { createTweaks, syncTweaks, Bool, Select } from 'tweaks';
import { GUI } from 'tweaks/gui';

syncTweaks('localStorage');

const wrapOptions = ['false', 'clip', 'visible'];
const cloneOptions = ['false', 'top', 'right', 'bottom', 'left'];
const animateOptions = ['false', '250', '500', '750', '1000'];
const staggerOptions = ['10', '50', '200', 'random'];

const typeSchema = (enabled) => ({
  enabled: Bool(enabled),
  wrap: Select(wrapOptions),
  clone: Select(cloneOptions),
  animate: Select(animateOptions),
  stagger: Select(staggerOptions),
});

const splitTweaks = createTweaks('Split', {
  lines: typeSchema(false),
  words: typeSchema(true),
  chars: typeSchema(false),
  config: {
    includeSpaces: Bool(false),
    accessible: Bool(true),
    debug: Bool(true),
  }
});

let split;

const animateSplit = (targets, opts) => {
  const dir = opts.clone;
  const randomStagger = opts.stagger === 'random';
  return animate(targets, {
    x: dir === 'left' ? '100%' : dir === 'right' ? '-100%' : 0,
    y: dir === 'top' ? '100%' : dir === 'bottom' ? '-100%' : !dir ? '-100%' : 0,
    loop: true,
    alternate: true,
    duration: opts.duration,
    delay: stagger(randomStagger ? 10 : +opts.stagger, { from: randomStagger ? 'random' : 0 }),
  });
};

const buildTypeOptions = (group) => {
  if (!group.enabled) return false;
  const wrap = group.wrap;
  const clone = group.clone;
  return {
    wrap: wrap === 'false' ? false : wrap,
    clone: clone === 'false' ? false : clone,
  };
};

const buildAnimOptions = (group) => {
  if (!group.enabled || group.animate === 'false') return false;
  return {
    duration: +group.animate,
    stagger: group.stagger,
    clone: group.clone === 'false' ? false : group.clone,
  };
};

const apply = () => {
  if (split) split.revert();
  const params = {
    lines: buildTypeOptions(splitTweaks.lines),
    words: buildTypeOptions(splitTweaks.words),
    chars: buildTypeOptions(splitTweaks.chars),
    includeSpaces: splitTweaks.includeSpaces,
    accessible: splitTweaks.accessible,
    debug: splitTweaks.debug,
  };
  split = splitText('article', params);
  const linesAnim = buildAnimOptions(splitTweaks.lines);
  const wordsAnim = buildAnimOptions(splitTweaks.words);
  const charsAnim = buildAnimOptions(splitTweaks.chars);
  if (linesAnim) split.addEffect(self => self.lines.length && animateSplit(self.lines, linesAnim));
  if (wordsAnim) split.addEffect(self => self.words.length && animateSplit(self.words, wordsAnim));
  if (charsAnim) split.addEffect(self => self.chars.length && animateSplit(self.chars, charsAnim));
};

document.fonts.ready.then(() => {
  document.body.classList.add('is-ready');
  apply();
  const serialize = () => JSON.stringify(splitTweaks);
  let lastKey = serialize();
  function tick() {
    const key = serialize();
    if (key !== lastKey) {
      lastKey = key;
      apply();
    }
    requestAnimationFrame(tick);
  }
  tick();
});

GUI.render(() => {
  if (!GUI.BeginPanel('Split playground')) return;
  GUI.Tweaks(splitTweaks);
  GUI.BeginGroup('actions', 'div.row');
    if (GUI.ButtonInput('Revert')) {
      if (split) split.revert();
    }
    if (GUI.ButtonInput('Re-split')) apply();
  GUI.EndGroup('actions');
  GUI.EndPanel();
});

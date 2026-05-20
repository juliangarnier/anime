import { animate, createTimer, createTimeline, scrambleText, $ } from '../../../dist/modules/index.js';
import { createTweaks, syncTweaks, Float, Int, Str, Bool, Select, registerType, registerTypeGUI } from 'tweaks';
import { GUI } from 'tweaks/gui';

// Debug panel start

syncTweaks('localStorage');

const Override = registerType('Override', false);
const overrideModes = { false: 0, true: 0, string: 0 };

registerTypeGUI('Override', (prop, labelKey) => {
  if (!prop.list) prop.list = { mode: 'false', text: '', src: undefined };
  const s = prop.list;
  if (s.src !== prop.value) {
    s.src = prop.value;
    if (prop.value === false) s.mode = 'false';
    else if (prop.value === true) s.mode = 'true';
    else { s.mode = 'string'; s.text = prop.value; }
  }
  let changed = GUI.Select(s, 'mode::"override"', overrideModes);
  if (changed) {
    prop.value = s.mode === 'true' ? true : s.mode === 'string' ? s.text : false;
    s.src = prop.value;
  }
  if (s.mode === 'string') {
    if (GUI.Text(s, 'text::"override chars"')) {
      prop.value = s.text;
      s.src = prop.value;
      changed = true;
    }
  }
  return changed;
});

const scrambleParams = createTweaks('Scramble', {
  text: Str(),
  from: Select(['auto', 'left', 'right', 'center', 'random']),
  reversed: Bool(false),
  ease: Select(['linear', 'in(2)', 'out(2)', 'inOut(2)', 'steps(10)']),
  chars: Select(['', 'lowercase', 'uppercase', 'numbers', 'symbols', 'braille', 'blocks', 'shades'], 0),
  cursor: Str('░▒▓█'),
  override: Override(false),
  perturbation: Float(0, 0, 1, 0.01),
  duration: Int(500),
  delay: Int(0, 0, 2000),
  revealDelay: Int(0, 0, 2000),
  revealRate: Int(50),
  settleDuration: Int(250),
  settleRate: Int(30),
});

const audioParams = { sound: false };

GUI.render(() => {
  if (GUI.BeginPanel('Scramble config')) {
    GUI.Tweaks(scrambleParams);
    if (GUI.Checkbox(audioParams, 'sound')) ctx.resume();
    GUI.EndPanel();
  }
});

// Debug panel ends

const ctx = new AudioContext();
let allowSound = false;
const tickSound = () => {
  if (!audioParams.sound || !allowSound) return;
  allowSound = false;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sine';
  o.frequency.setValueAtTime(4000 + Math.random() * 400, t);
  g.gain.setValueAtTime(0.001, t);
  g.gain.linearRampToValueAtTime(0.035, t + 0.001);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.003);
  o.connect(g).connect(ctx.destination);
  o.start(t);
  o.stop(t + 0.003);
}

const sound = createTimer({ onUpdate: () => allowSound = true, frameRate: 30 });
const intro = createTimeline({ delay: 500 });

$('.scramble').forEach($el => {
  const replay = () => animate($el, { innerHTML: scrambleText({ ...scrambleParams, text: scrambleParams.text || undefined, onChange: tickSound }) });
  intro.add($el, {
    innerHTML: scrambleText({
      override: '',
      duration: 750,
      settleDuration: 250,
      perturbation: .2,
      cursor: '░▒▓█',
    }),
  }, '-=620');
  $el.addEventListener('pointerenter', replay);
  $el.addEventListener('pointerdown', replay);
});

intro.init();

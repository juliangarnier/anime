import { animate, createTimeline, utils, cubicBezier } from '../../dist/modules/index.js';

const [ $digitalClock ] = utils.$('#digital');

const s = 1000;
const m = 60*s;
const h = 60*m;
const oneday = h * 24;

const masterTL = createTimeline({ defaults: { ease: 'linear' }, autoplay: false });

[h * 10, h, 0, m * 10, m, 0, s * 10, s, 0, 100, 10].forEach(d => {
  const $el = document.createElement('div');
  $digitalClock.appendChild($el);
  $el.classList.add('slot');
  if (!d) {
    $el.classList.add('colon');
    $el.textContent = ':';
  } else {
    $el.classList.add('numbers');
    for (let i = 0; i < 10; i++) {
      const $num = document.createElement('div');
      $num.textContent = `${i}`;
      const angle = i * 36;
      const a = utils.degToRad(angle);
      utils.set($num, {
        translateY: -3 * Math.sin(a) + 'ch',
        z: 3 * Math.cos(a) + 'ch',
        rotateX: angle,
      });
      $el.appendChild($num);
    }
    const canStop = d > 100;
    const ease = canStop ? cubicBezier(1,0,.6,1.2) : 'linear';
    const duration = canStop ? 650 : d;
    const position = `+=${canStop ? d - 650 : 0}`;
    const numTL = createTimeline({ defaults: { ease }, loop: true });
    const t = d === h*10 ? 4 : d === h ? 25 : d === m*10 || d === s*10 ? 7 : 11;
    for (let i = 1; i < t; i++) {
      const rotateX = -((i * 36) + (i === t - 1 ? (360 - i * 36) : 0));
      numTL.add($el, { rotateX, duration }, d === h*10 && i === t - 1 ? '+=' + ((h * 4) - 650) : position);
    }
    masterTL.sync(numTL, 0);
  }
});

masterTL.duration = oneday;
masterTL.iterationDuration = oneday;

const getNow = () => new Date().getTime() % oneday;

const [ $currentTimeRange ] = /** @type {Array<HTMLInputElement>} */(utils.$('#currentTime .range'));
const [ $currentTimeValue ] = /** @type {Array<HTMLInputElement>} */(utils.$('#currentTime .value'));

const [ $speedRange ] = /** @type {Array<HTMLInputElement>} */(utils.$('#speed .range'));
const [ $speedValue ] = /** @type {Array<HTMLInputElement>} */(utils.$('#speed .value'));

masterTL.currentTime = getNow();
// masterTL.currentTime = oneday - 3000;

masterTL.onUpdate = ({currentTime, speed}) => {
  $currentTimeRange.value = `${currentTime}`;
  $currentTimeValue.value = `${currentTime}`;
  $speedRange.value = `${speed}`;
  $speedValue.value = `${utils.round(speed, 0)}`;
}

utils.$('#controls button').forEach($button => {
  const id = $button.id;
  $button.onclick = () => {
    if (id === 'seek') {
      animate(masterTL, {
        currentTime: getNow(),
        ease: 'inOut(3)',
        duration: 1500
      })
    } else if (id === 'slowmo') {
      animate(masterTL, {
        speed: .1,
        ease: 'out(3)',
        duration: 1500
      })
    } else if (id === 'speedup') {
      animate(masterTL, {
        speed: 5,
        ease: 'out(3)',
        duration: 1500
      })
    } else if (id === 'normalspeed') {
      animate(masterTL, {
        speed: 1,
        ease: 'out(3)',
        duration: 1500
      })
    } else {
      masterTL[id]();
    }
  }
});

utils.$('fieldset').forEach($el => {
  const $range = /** @type {HTMLInputElement} */($el.querySelector('.range'));
  const $value = /** @type {HTMLInputElement} */($el.querySelector('.value'));
  const prop = $el.id;
  const value = masterTL[prop];
  $range.value = value;
  $value.value = masterTL[prop];
  $range.oninput = () => {
    const newValue = prop === 'currentTime' ? +$range.value % oneday : +$range.value;
    utils.sync(() => masterTL[prop] = newValue);
    $value.value = `${utils.round(newValue, 0)}`;
  };
});
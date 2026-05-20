import {
  waapi,
  stagger,
  utils,
  createTimer,
  createScope,
  onScroll
} from '../../../../dist/modules/index.js';

const [$animResume] = utils.$('#animation-resume');
const [$animPlay] = utils.$('#animation-play');
const [$animPause] = utils.$('#animation-pause');
const [$animReverse] = utils.$('#animation-reverse');
const [$animAlternate] = utils.$('#animation-alternate');
const [$animCancel] = utils.$('#animation-cancel');
const [$animRestart] = utils.$('#animation-restart');
const [$animRevert] = utils.$('#animation-revert');

const [$animProgress] = utils.$('#animation-progress');
const [$animCurrentTime] = utils.$('#animation-currentTime');

const [$animPlaybackrate] = utils.$('#animation-playbackRate');
const [$animSpeed] = utils.$('#animation-speed');

const [$animTimeDrift] = utils.$('#animation-time-drift');

const scope = createScope({
  mediaQueries: { 'm': '(min-width: 800px)' }
})
.add(self => {
  const y = self.matches.m ? -10 : 10;
  const animation = waapi.animate('.square', {
    scale: 2,
    backgroundColor: 'var(--bg)',
    delay: stagger(70),
    loop: 1,
    alternate: true,
    ease: 'inOut(4)',
    duration: 750,
  })

  const scrollAnim = waapi.animate('.square', {
    translate: ($el, i, targets) => `0px ${stagger([-20, 20])($el, i, targets)}rem`,
    rotate: `90deg`,
    delay: stagger(100),
    reversed: true,
    autoplay: onScroll({
      target: document.body,
      sync: 1,
      enter: 'max',
      leave: 'min',
      debug: true,
    })
  })

  const startTime = Date.now();

  $animPlay.onclick = () => animation.play();
  $animPause.onclick = () => animation.pause();
  $animReverse.onclick = () => animation.reverse();
  $animAlternate.onclick = () => animation.alternate();
  $animResume.onclick = () => animation.resume();
  $animCancel.onclick = () => animation.cancel();
  $animRestart.onclick = () => animation.restart();
  $animCancel.onclick = () => animation.cancel();
  $animRevert.onclick = () => animation.revert();


  ($animProgress).oninput = v => {
    animation.seek(+/** @type {HTMLInputElement} */(v.target).value * animation.duration);
  }


  ($animPlaybackrate).oninput = v => {
    const speed = /** @type {HTMLInputElement} */(v.target).value;
    animation.speed = +speed;
    /** @type {HTMLInputElement} */
    ($animSpeed).value = speed;
  }

  createTimer({
    onUpdate: () => {
      const elapsed = Date.now() - startTime;
      /** @type {HTMLInputElement} */
      ($animTimeDrift).value = (animation.currentTime - elapsed) + 'ms';
      /** @type {HTMLInputElement} */
      ($animCurrentTime).value = `${animation.currentTime}`;
      /** @type {HTMLInputElement} */
      ($animProgress).value = `${animation.progress}`;
    }
  })

})

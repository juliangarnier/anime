import anime from '../../../src/index.js';

function animePlayer(instance, containerEl) {

  function createEl(type, className, parentEl) {
    var el = document.createElement(type);
    if (className) el.classList.add(className);
    if (parentEl) parentEl.appendChild(el);
    return el;
  }

  function createButton(value, prentEl, action) {
    var el = createEl('button', 'ap-button');
    if (parentEl) parentEl.appendChild(el);
    if (action) el.addEventListener('click', action);
    return el;
  }

  var parentEl = containerEl || document.body;
  var timelineEl = createEl('div', 'ap-timeline', parentEl);
  var needleEl = createEl('div', 'ap-needle', timelineEl);
  var animations = [];
  var colors = ['#FF1461','#FF7C72','#FBF38C','#A6FF8F','#18FF92','#1CE2B2','#5EF3FB','#61C3FF','#5A87FF','#8453E3','#C26EFF','#FB89FB'];
  var colorIndex = 0;

  anime.setValue(timelineEl, {
    overflow: 'auto',
    display: 'block',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    maxHeight: '50vh',
    paddingTop: 4
  });

  function convertMStoEM(ms) { return ms / 100; }
  function convertEMtoMS(em) { return parseFloat(em) * 250; }

  function createAnimationLog(animObj, timelineOffset) {
    var anim = animObj;
    anim.player = {};
    anim.player.trackEl = createEl('div', 'ap-track', timelineEl);
    anim.player.animationEl = createEl('div', 'ap-animation', anim.player.trackEl);
    anim.player.delayEl = createEl('div', 'ap-delay', anim.player.animationEl);
    anim.player.endDelayEl = createEl('div', 'ap-delay', anim.player.animationEl);
    anime.setValue(anim.player.trackEl, {
      position: 'relative',
      width: '100%',
      height: 4,
      marginBottom: 2,
    });
    anime.setValue(anim.player.animationEl, {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      width: 'auto',
      height: '100%',
      backgroundColor: 'currentColor',
      borderRadius: '.5rem'
    });
    anime.setValue([anim.player.delayEl, anim.player.endDelayEl], {
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,.5)'
    });
    anim.update = function() {
      anime.setValue(anim.player.animationEl, {
        left: convertMStoEM(timelineOffset) + 'em',
        width: convertMStoEM(anim.duration) + 'em'
      });
      anime.setValue(anim.player.delayEl, {width: (anim.delay / anim.duration) * 100 + '%'});
      anime.setValue(anim.player.endDelayEl, {width: (anim.endDelay / anim.duration) * 100 + '%'});
    }
    anime.setValue(anim.player.animationEl, {color: colors[colorIndex]});
    colorIndex++;
    if (!colors[colorIndex]) colorIndex = 0;
    anim.update();
    animations.push(anim);
    return anim;
  }

  instance.pause();

  var playerAnimation = anime({
    targets: needleEl,
    translateX: convertMStoEM(instance.duration) + 'em',
    duration: instance.duration,
    direction: instance.direction,
    loop: instance.loop,
    easing: 'linear',
    update: function(a) {
      instance.seek(a.currentTime);
    }
  });

  if (instance.children.length) {
    instance.children.forEach(function(child) {
      console.log(child.timelineOffset);
      child.animations.forEach(function(anim) {
        createAnimationLog(anim, child.timelineOffset);
      });
    })
  } else {
    instance.animations.forEach(function(anim) {
      createAnimationLog(anim);
    });
  }

  anime.setValue(needleEl, {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0,
    width: 2,
    height: timelineEl.scrollHeight,
    marginLeft: -1,
    backgroundColor: '#FFF'
  });

}

export default animePlayer;
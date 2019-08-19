// import anime from '../../../lib/anime.es.js';

/* Ontersection observer */

!function(t,e){"use strict";function n(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||a(),this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,i=this.intersectionRect,o=i.width*i.height;n?this.intersectionRatio=o/n:this.intersectionRatio=this.isIntersecting?1:0}function i(t,e){var n=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(n.root&&1!=n.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=r(this._checkForIntersections.bind(this),this.THROTTLE_TIMEOUT),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(n.rootMargin),this.thresholds=this._initThresholds(n.threshold),this.root=n.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function o(){return t.performance&&performance.now&&performance.now()}function r(t,e){var n=null;return function(){n||(n=setTimeout(function(){t(),n=null},e))}}function s(t,e,n,i){"function"==typeof t.addEventListener?t.addEventListener(e,n,i||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function h(t,e,n,i){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,i||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function c(t,e){var n=Math.max(t.top,e.top),i=Math.min(t.bottom,e.bottom),o=Math.max(t.left,e.left),r=Math.min(t.right,e.right),s=r-o,h=i-n;return s>=0&&h>=0&&{top:n,bottom:i,left:o,right:r,width:s,height:h}}function u(t){var e;try{e=t.getBoundingClientRect()}catch(n){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):a()}function a(){return{top:0,bottom:0,left:0,right:0,width:0,height:0}}function l(t,e){for(var n=e;n;){if(n==t)return!0;n=p(n)}return!1}function p(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e}if("IntersectionObserver"in t&&"IntersectionObserverEntry"in t&&"intersectionRatio"in t.IntersectionObserverEntry.prototype)return void("isIntersecting"in t.IntersectionObserverEntry.prototype||Object.defineProperty(t.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}}));var f=[];i.prototype.THROTTLE_TIMEOUT=100,i.prototype.POLL_INTERVAL=null,i.prototype.observe=function(t){var e=this._observationTargets.some(function(e){return e.element==t});if(!e){if(!t||1!=t.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:t,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},i.prototype.unobserve=function(t){this._observationTargets=this._observationTargets.filter(function(e){return e.element!=t}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},i.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},i.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},i.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||0>t||t>1)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},i.prototype._parseRootMargin=function(t){var e=t||"0px",n=e.split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return n[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n},i.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(s(t,"resize",this._checkForIntersections,!0),s(e,"scroll",this._checkForIntersections,!0),"MutationObserver"in t&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(e,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},i.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,h(t,"resize",this._checkForIntersections,!0),h(e,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},i.prototype._checkForIntersections=function(){var t=this._rootIsInDom(),e=t?this._getRootRect():a();this._observationTargets.forEach(function(i){var r=i.element,s=u(r),h=this._rootContainsTarget(r),c=i.entry,a=t&&h&&this._computeTargetAndRootIntersection(r,e),l=i.entry=new n({time:o(),target:r,boundingClientRect:s,rootBounds:e,intersectionRect:a});c?t&&h?this._hasCrossedThreshold(c,l)&&this._queuedEntries.push(l):c&&c.isIntersecting&&this._queuedEntries.push(l):this._queuedEntries.push(l)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},i.prototype._computeTargetAndRootIntersection=function(n,i){if("none"!=t.getComputedStyle(n).display){for(var o=u(n),r=o,s=p(n),h=!1;!h;){var a=null,l=1==s.nodeType?t.getComputedStyle(s):{};if("none"==l.display)return;if(s==this.root||s==e?(h=!0,a=i):s!=e.body&&s!=e.documentElement&&"visible"!=l.overflow&&(a=u(s)),a&&(r=c(a,r),!r))break;s=p(s)}return r}},i.prototype._getRootRect=function(){var t;if(this.root)t=u(this.root);else{var n=e.documentElement,i=e.body;t={top:0,left:0,right:n.clientWidth||i.clientWidth,width:n.clientWidth||i.clientWidth,bottom:n.clientHeight||i.clientHeight,height:n.clientHeight||i.clientHeight}}return this._expandRectByRootMargin(t)},i.prototype._expandRectByRootMargin=function(t){var e=this._rootMarginValues.map(function(e,n){return"px"==e.unit?e.value:e.value*(n%2?t.width:t.height)/100}),n={top:t.top-e[0],right:t.right+e[1],bottom:t.bottom+e[2],left:t.left-e[3]};return n.width=n.right-n.left,n.height=n.bottom-n.top,n},i.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,i=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==i)for(var o=0;o<this.thresholds.length;o++){var r=this.thresholds[o];if(r==n||r==i||n>r!=i>r)return!0}},i.prototype._rootIsInDom=function(){return!this.root||l(e,this.root)},i.prototype._rootContainsTarget=function(t){return l(this.root||e,t)},i.prototype._registerInstance=function(){f.indexOf(this)<0&&f.push(this)},i.prototype._unregisterInstance=function(){var t=f.indexOf(this);-1!=t&&f.splice(t,1)},t.IntersectionObserver=i,t.IntersectionObserverEntry=n}(window,document);

/* Helpers */

function dragElement(el, events) {

  function getPointer(e) {
    var x = 'clientX';
    var y = 'clientY';
    var evt = e.touches ? e.touches[0] : e;
    return { x: evt[x], y: evt[y] };
  }

  var drag = { x: 0, y: 0, deltaX: 0, deltaY: 0, active: true, events: events || {} };
  var originalX = 0;
  var originalY = 0;
  var pointerX = 0;
  var pointerY = 0;

  function move(e) {
    if (drag.active) return;
    drag.deltaX = pointerX - getPointer(e).x;
    drag.deltaY = pointerY - getPointer(e).y;
    drag.x = originalX - drag.deltaX;
    drag.y = originalY - drag.deltaY;
    if (drag.events.move) drag.events.move(drag);
  }

  function release(e) {
    drag.active = true;
    if (drag.events.release) drag.events.release(drag);
    document.removeEventListener('mousemove', move, false);
    document.removeEventListener('mouseup', release, false);
    document.removeEventListener('touchmove', move, false);
    document.removeEventListener('touchend', release, false);
  }

  function start(e) {
    if (!drag.active) return;
    e.preventDefault();
    drag.active = false;
    pointerX = getPointer(e).x;
    pointerY = getPointer(e).y;
    originalX = drag.x;
    originalY = drag.y;
    if (drag.events.begin) drag.events.begin(drag);
    document.addEventListener('mousemove', move, false);
    document.addEventListener('mouseup', release, false);
    document.addEventListener('touchmove', move, false);
    document.addEventListener('touchend', release, false);
  }

  el.addEventListener('mousedown', start, false);
  el.addEventListener('touchstart', start, false);

  return drag;

}

// Better scroll events

function onScroll(cb) {
  var isTicking = false;
  var scrollY = 0;
  var body = document.body;
  var html = document.documentElement;
  var scrollHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
  function scroll() {
    scrollY = window.scrollY;
    if (cb) cb(scrollY, scrollHeight);
    requestTick();
  }
  function requestTick() {
    if (!isTicking) requestAnimationFrame(updateScroll);
    isTicking = true;
  }
  function updateScroll() {
    isTicking = false;
    var currentScrollY = scrollY;
  }
  scroll();
  window.onscroll = scroll;
}

// Scroll to element

function scrollToElement(el, offset) {
  var off = offset || 0;
  var rect = el.getBoundingClientRect();
  var top = rect.top + off;
  var animation = anime({
    targets: [document.body, document.documentElement],
    scrollTop: '+='+top,
    easing: 'easeInOutSine',
    duration: 1500
  });
  // onScroll(animation.pause);
}

// Check if element is in viewport

function isElementInViewport(el, inCB, outCB, rootMargin) {
  var margin = rootMargin || '-10%';
  function handleIntersect(entries, observer) {
    var entry = entries[0];
    if (entry.isIntersecting) {
      if (inCB && typeof inCB === 'function') inCB(el, entry);
    } else {
      if (outCB && typeof outCB === 'function') outCB(el, entry);
    }
  }
  var observer = new IntersectionObserver(handleIntersect, {rootMargin: margin});
  observer.observe(el);
}

function fitElementToParent(el, padding) {
  var timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, {scale: 1});
    var pad = padding || 0;
    var parentEl = el.parentNode;
    var elOffsetWidth = el.offsetWidth - pad;
    var parentOffsetWidth = parentEl.offsetWidth;
    var ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, {scale: ratio}), 100);
  }
  resize();
  window.addEventListener('resize', resize);
}

// Update date and version number

var versionNumerEls = document.querySelectorAll('.version-number');

for (var i = 0; i < versionNumerEls.length; i++) {
  versionNumerEls[i].innerHTML = anime.version;
}

var dateEl = document.querySelector('.date');
var date = new Date();

dateEl.innerHTML = date.getFullYear();

// main logo animation

var logoAnimation = (function() {

  var logoAnimationEl = document.querySelector('.logo-animation');
  var bouncePath = anime.path('.bounce path');

  fitElementToParent(logoAnimationEl, 0);

  anime.set(['.letter-a', '.letter-n', '.letter-i'], {translateX: 70});
  anime.set('.letter-e', {translateX: -70});
  anime.set('.dot', { translateX: 630, translateY: -200 });

  var logoAnimationTL = anime.timeline({
    autoplay: false,
    easing: 'easeOutSine'
  })
  .add({
    targets: '.letter-i .line',
    duration: 0,
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, 0)
  .add({
    targets: '.bounced',
    transformOrigin: ['50% 100% 0px', '50% 100% 0px'],
    translateY: [
      {value: [150, -160], duration: 190, endDelay: 20, easing: 'cubicBezier(0.225, 1, 0.915, 0.980)'},
      {value: 4, duration: 120, easing: 'easeInQuad'},
      {value: 0, duration: 120, easing: 'easeOutQuad'}
    ],
    scaleX: [
      {value: [.25, .85], duration: 190, easing: 'easeOutQuad'},
      {value: 1.08, duration: 120, delay: 85, easing: 'easeInOutSine'},
      {value: 1, duration: 260, delay: 25, easing: 'easeOutQuad'}
    ],
    scaleY: [
      {value: [.3, .8], duration: 120, easing: 'easeOutSine'},
      {value: .35, duration: 120, delay: 180, easing: 'easeInOutSine'},
      {value: .57, duration: 180, delay: 25, easing: 'easeOutQuad'},
      {value: .5, duration: 190, delay: 15, easing: 'easeOutQuad'}
    ],
    delay: anime.stagger(80)
  })
  .add({
    targets: '.dot',
    opacity: { value: 1, duration: 100 },
    translateY: 250,
    scaleY: [4, .7],
    scaleX: { value: 1.3, delay: 100, duration: 200},
    duration: 280,
    easing: 'cubicBezier(0.350, 0.560, 0.305, 1)'
  }, '-=290')
  .add({
    targets: '.letter-m .line',
    easing: 'easeOutElastic(1, .8)',
    duration: 600,
    d: function(el) { return el.dataset.d2 },
    begin: function(a) { a.animatables[0].target.removeAttribute('stroke-dasharray'); }
  }, '-=140')
  .add({
    targets: ['.letter-a', '.letter-n', '.letter-i', '.letter-e'],
    translateX: 0,
    easing: 'easeOutElastic(1, .6)',
    duration: 800,
    delay: anime.stagger(40, {from: 2.5}),
    change: function(a) { a.animatables[2].target.removeAttribute('stroke-dasharray'); }
  }, '-=600')
  .add({
    targets: '.letter-m .line',
    d: function(el) { return el.dataset.d3 },
    easing: 'spring(.2, 200, 3, 60)',
  }, '-=680')
  .add({
    targets: '.dot',
    translateX: bouncePath('x'),
    translateY: bouncePath('y'),
    rotate: {value: '1turn', duration: 790},
    scaleX: { value: 1, duration: 50, easing: 'easeOutSine' },
    scaleY: [
      { value: [1, 1.5], duration: 50, easing: 'easeInSine' },
      { value: 1, duration: 50, easing: 'easeOutExpo' }
    ],
    easing: 'cubicBezier(0, .74, 1, .255)',
    duration: 800
  }, '-=1273')
  .add({
    targets: '.dot',
    scale: 1,
    rotate: '1turn',
    scaleY: {value: .5, duration: 150, delay: 230},
    translateX: 430,
    translateY: [
      {value: 244, duration: 100},
      {value: 204, duration: 200, delay: 130},
      {value: 224, duration: 225, easing: 'easeOutQuad', delay: 25}
    ],
    duration: 200,
    easing: 'easeOutSine'
  }, '-=474')
  .add({
    targets: '.letter-i .line',
    transformOrigin: ['50% 100% 0', '50% 100% 0'],
    d: function(el) { return el.dataset.d2 },
    easing: 'cubicBezier(0.400, 0.530, 0.070, 1)',
    duration: 80
  }, '-=670')
  .add({
    targets: '.logo-letter',
    translateY: [
      {value: 40, duration: 150, easing: 'easeOutQuart'},
      {value: 0, duration: 800, easing: 'easeOutElastic(1, .5)'}
    ],
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: anime.stagger(60, {from: 'center'})
  }, '-=670')
  .add({
    targets: '.bounced',
    scaleY: [
      {value: .4, duration: 150, easing: 'easeOutQuart'},
      {value: .5, duration: 800, easing: 'easeOutElastic(1, .5)'}
    ],
    delay: anime.stagger(60, {from: 'center'})
  }, '-=1090')

  return logoAnimationTL;

})();

var headerIntroAnimation = anime.timeline({
  easing: 'easeOutSine',
  autoplay: false
})
.add({
  targets: ['.header a', '.secondary-menu a', '.section-intro .feature-description-text'],
  opacity: {value: [0.001, 1], easing: 'linear', duration: 300},
  translateY: [40, 0],
  translateZ: 0,
  duration: 500,
  delay: anime.stagger(40, {start: 400, from: 'last'}),
  begin: function(anim) {
    anim.animatables.forEach(function(a) {
      anime.set(a.target, {
        transition: 'transform 0s ease'
      });
    });
  },
  complete: function(anim) {
    logoAnimation.play();
    anim.animatables.forEach(function(a) {
      a.target.style = '';
      anime.set(a.target, {
        opacity: 1,
        transition: 'transform .225s ease'
      });
    });
  }
}, 0);

var introEasingsAnimation = (function() {

  var easingVisualizerEl = document.querySelector('.easing-visualizer');
  var barsWrapperEl = easingVisualizerEl.querySelector('.bars-wrapper');
  var dotsWrapperEl = easingVisualizerEl.querySelector('.dots-wrapper');
  var barsFragment = document.createDocumentFragment();
  var dotsFragment = document.createDocumentFragment();
  var numberOfBars = 91;
  var duration = 450;
  var animation;
  var paused = true;

  fitElementToParent(easingVisualizerEl);

  for (var i = 0; i < numberOfBars; i++) {
    var barEl = document.createElement('div');
    var dotEl = document.createElement('div');
    barEl.classList.add('bar');
    dotEl.classList.add('dot');
    dotEl.classList.add('color-red');
    barsFragment.appendChild(barEl);
    dotsFragment.appendChild(dotEl);
  }

  barsWrapperEl.appendChild(barsFragment);
  dotsWrapperEl.appendChild(dotsFragment);

  var defaultEase = 'easeOutElastic';

  function play() {

    paused = false;

    if (animation) animation.pause();

    var easings = [];
    for (let ease in anime.penner) easings.push(ease);
    easings.push('steps('+anime.random(5, 20)+')');
    easings.push('steps('+anime.random(5, 20)+')');
    easings.push('cubicBezier(0.545, 0.475, 0.145, 1)');
    var ease = easings[anime.random(0, easings.length - 1)];

    animation = anime.timeline({
      duration: duration,
      easing: ease,
      complete: play
    })
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 44], {easing: ease, from: 'center', direction: 'reverse'}),
      delay: anime.stagger(7, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-160px', '160px'], {easing: ease, from: 'last'}),
      delay: anime.stagger(7, {from: 'center'})
    }, 0);

  }

  function pause() {

    if (paused) return;
    paused = true;
    if (animation) animation.pause();

    animation = anime.timeline({
      easing: 'easeInOutQuad'
    })
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 44], {easing: defaultEase, from: 'center', direction: 'reverse'}),
      duration: duration,
      delay: anime.stagger(7, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-144px', '144px'], {easing: defaultEase, from: 'last'}),
      duration: duration,
      delay: anime.stagger(7, {from: 'center'})
    }, 0);

  }

  function init() {

    animation = anime.timeline({
      duration: 600,
      easing: 'easeInOutQuad',
      complete: function() {
        isElementInViewport(easingVisualizerEl, play, pause);
      }
    })
    .add({
      targets: '.easing-visualizer .bar',
      scale: [0, 1],
      delay: anime.stagger(8, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      scale: [0, 1],
      delay: anime.stagger(8, {from: 'center'}),
      complete: function() {
        headerIntroAnimation.play();
      }
    }, 0)
    .add({
      targets: '.easing-visualizer .bar',
      scaleY: anime.stagger([1, 44], {easing: 'easeInOutQuad', from: 'center', direction: 'reverse'}),
      duration: duration,
      easing: 'easeInOutQuad',
      delay: anime.stagger(7, {from: 'center'})
    })
    .add({
      targets: '.easing-visualizer .dot',
      translateY: anime.stagger(['-144px', '144px'], {easing: 'easeInOutQuad', from: 'last'}),
      duration: duration,
      easing: 'easeInOutQuad',
      delay: anime.stagger(7, {from: 'center'})
    }, '-=600');


  }

  return {
    init: init,
    play: play,
    pause: pause
  }

})();

var sphereAnimation = (function() {

  var sphereEl = document.querySelector('.sphere-animation');
  var spherePathEls = sphereEl.querySelectorAll('.sphere path');
  var pathLength = spherePathEls.length;
  var hasStarted = false;
  var aimations = [];

  fitElementToParent(sphereEl);

  var breathAnimation = anime({
    begin: function() {
      for (var i = 0; i < pathLength; i++) {
        aimations.push(anime({
          targets: spherePathEls[i],
          stroke: {value: ['rgba(255,75,75,1)', 'rgba(80,80,80,.35)'], duration: 500},
          translateX: [2, -4],
          translateY: [2, -4],
          easing: 'easeOutQuad',
          autoplay: false
        }));
      }
    },
    update: function(ins) {
      aimations.forEach(function(animation, i) {
        var percent = (1 - Math.sin((i * .35) + (.0022 * ins.currentTime))) / 2;
        animation.seek(animation.duration * percent);
      });
    },
    duration: Infinity,
    autoplay: false
  });

  var introAnimation = anime.timeline({
    autoplay: false
  })
  .add({
    targets: sphereEl,
    opacity: [.001, 1],
    translateY: [60, 0],
    duration: 2000,
    easing: 'easeOutSine',
  }, 0)
  .add({
    targets: spherePathEls,
    strokeDashoffset: {
      value: [anime.setDashoffset, 0],
      duration: 3900,
      easing: 'easeInOutCirc',
      delay: anime.stagger(190, {direction: 'reverse'})
    },
    duration: 2000,
    delay: anime.stagger(60, {direction: 'reverse'}),
    easing: 'linear'
  }, 0);

  var shadowAnimation = anime({
      targets: '#sphereGradient',
      x1: '25%',
      x2: '25%',
      y1: '0%',
      y2: '75%',
      duration: 30000,
      easing: 'easeOutQuint',
      autoplay: false
    }, 0);

  function play() {
    introAnimation.play();
    breathAnimation.play();
    shadowAnimation.play();
  }

  function pause() {
    breathAnimation.pause();
    shadowAnimation.pause();
  }

  isElementInViewport(sphereEl, play, pause);

})();

var advancedStaggeringAnimation = (function() {

  var staggerVisualizerEl = document.querySelector('.stagger-visualizer');
  var dotsWrapperEl = staggerVisualizerEl.querySelector('.dots-wrapper');
  var dotsFragment = document.createDocumentFragment();
  var grid = [20, 10];
  var cell = 55;
  var numberOfElements = grid[0] * grid[1];
  var animation;
  var paused = true;

  fitElementToParent(staggerVisualizerEl);

  for (var i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement('div');
    dotEl.classList.add('dot');
    dotsFragment.appendChild(dotEl);
  }

  dotsWrapperEl.appendChild(dotsFragment);

  var index = anime.random(0, numberOfElements-1);
  var nextIndex = 0;

  anime.set('.stagger-visualizer .cursor', {
    translateX: anime.stagger(-cell, {grid: grid, from: index, axis: 'x'}),
    translateY: anime.stagger(-cell, {grid: grid, from: index, axis: 'y'}),
    translateZ: 0,
    scale: 1.5,
  });

  function play() {

    paused = false;
    if (animation) animation.pause();

    nextIndex = anime.random(0, numberOfElements-1);

    animation = anime.timeline({
      easing: 'easeInOutQuad',
      complete: play
    })
    .add({
      targets: '.stagger-visualizer .cursor',
      keyframes: [
        { scale: .75, duration: 120}, 
        { scale: 2.5, duration: 220},
        { scale: 1.5, duration: 450},
      ],
      duration: 300
    })
    .add({
      targets: '.stagger-visualizer .dot',
      keyframes: [
        {
          translateX: anime.stagger('-2px', {grid: grid, from: index, axis: 'x'}),
          translateY: anime.stagger('-2px', {grid: grid, from: index, axis: 'y'}),
          duration: 100
        }, {
          translateX: anime.stagger('4px', {grid: grid, from: index, axis: 'x'}),
          translateY: anime.stagger('4px', {grid: grid, from: index, axis: 'y'}),
          scale: anime.stagger([2.6, 1], {grid: grid, from: index}),
          duration: 225
        }, {
          translateX: 0,
          translateY: 0,
          scale: 1,
          duration: 1200,
        }
      ],
      delay: anime.stagger(80, {grid: grid, from: index})
    }, 30)
    .add({
      targets: '.stagger-visualizer .cursor',
      translateX: { value: anime.stagger(-cell, {grid: grid, from: nextIndex, axis: 'x'}) },
      translateY: { value: anime.stagger(-cell, {grid: grid, from: nextIndex, axis: 'y'}) },
      scale: 1.5,
      easing: 'cubicBezier(.075, .2, .165, 1)'
    }, '-=800')

    index = nextIndex;

  }

  function pause() {

    if (paused) return;
    paused = true;
    if (animation) animation.pause();

    animation = anime.timeline({
      easing: 'easeInOutQuad',
      duration: 100
    })
    .add({
      targets: '.cursor',
      translateX: { value: anime.stagger(-cell, {grid: grid, from: index, axis: 'x'}) },
      translateY: { value: anime.stagger(-cell, {grid: grid, from: index, axis: 'y'}) },
      scale: 1,
    })
    .add({
      targets: '.stagger-visualizer .dot',
      translateX: 0,
      translateY: 0,
      scale: 1,
      delay: anime.stagger(50, {grid: grid, from: index})
    }, 0)

  }

  isElementInViewport(staggerVisualizerEl, play, pause);

  return {
    play: play,
    pause: pause
  }

})();

var timeControlAnimation = (function() {

  var timeControlEl = document.querySelector('.time-control');
  var rullerEl = document.querySelector('.ruller');
  var timeCursorEl = document.querySelector('.time-cursor');
  var timeEl = document.querySelector('.time-cursor input');
  var infoEls = document.querySelectorAll('.info');
  var fragment = document.createDocumentFragment();
  var numberOfElements = 271;
  var controlAnimationCanMove = false;

  for (let i = 0; i < numberOfElements; i++) {
    var dotEl = document.createElement('div');
    dotEl.classList.add('line');
    fragment.appendChild(dotEl);
  }

  rullerEl.appendChild(fragment);

  var animationPXOffset = (timeControlEl.offsetWidth - (timeControlEl.parentNode.offsetWidth - 20)) / 2;
  if (animationPXOffset < 0) animationPXOffset = 0;

  function pxToTime(px) {
    var width = window.innerWidth > rullerEl.offsetWidth ? rullerEl.offsetWidth + 180 : window.innerWidth;
    var percent = px / (width);
    return percent * (timelineAnimation.duration);
  }

  var time = {
    anim: null,
    start: 0,
    end: 0
  };

  var drag = dragElement(timeCursorEl, {
    begin: function(e) {
      anime.remove(time);
      time.start = timelineAnimation.currentTime;
      controlAnimationCanMove = false;
    },
    move: function(e) {
      timelineAnimation.seek(time.start + pxToTime(-e.deltaX));
    },
    release: function(e) {
      time.end = timelineAnimation.currentTime;
      anime.remove(time);
      time.anim = anime({
        targets: time,
        end: time.start,
        easing: 'spring(.3, 200, 5, 1)',
        update: function() { timelineAnimation.seek(time.end); },
        complete: function() { 
          controlAnimationCanMove = true;
          moveControlAnimation();
        }
      });
    }
  });

  var timelineAnimation = anime.timeline({
    easing: 'linear',
    autoplay: false
  })
  .add({
    targets: timeControlEl,
    translateX: [animationPXOffset, -animationPXOffset],
    duration: 1500
  }, 0)
  .add({
    targets: timeCursorEl,
    translateZ: 0,
    keyframes: [
      { translateY: [-24, 0], duration: 100, easing: 'easeInQuad' },
      { translateX: 1080, duration: 1500 },
      { translateY: -24, duration: 100, easing: 'easeOutQuad' }
    ],
    duration: 1500
  }, -100)
  .add({
    targets: '.ruller .line',
    translateY: [ {value: 24}, {value: 0} ],
    duration: 160,
    delay: anime.stagger([0, 1500]),
    easing: 'easeInOutSine'
  }, -80)
  .add({
    targets: timeEl,
    value: [ {value: [0, 100]}, {value: 0}, {value: 100} ],
    duration: 1500,
    round: 1,
    easing: 'linear'
  }, 0)

  for (var i = 0; i < infoEls.length; i++) {
    var infoEl = infoEls[i];
    var delay = parseFloat(anime.get(infoEl, 'data-delay'));
    var direction = infoEl.classList.contains('info-bottom') ? -1 : 1;
    timelineAnimation
    .add({
      targets: infoEl.querySelector('.info-bar'),
      scaleY: [0, 1],
      duration: 250,
      easing: 'easeOutCirc'
    }, delay)
    .add({
      targets: infoEl.querySelectorAll('.info .feature-caption'),
      opacity: [0, 1],
      translateY: [direction * 10, 0],
      duration: 50,
      delay: anime.stagger(50, {start: 10, direction: direction > 0 ? 'reverse' : 'normal'}),
      easing: 'easeOutSine'
    }, delay)
  }

  var windowHeight = window.innerHeight;
  var scrollAnim;

  function moveControlAnimation() {
    var rect = timeControlEl.getBoundingClientRect();
    var top = rect.top;
    var height = rect.height;
    var scrolled = (top - windowHeight + 100) * -1.5;
    timelineAnimation.seek(scrolled * 2);
    if (controlAnimationCanMove) scrollAnim = requestAnimationFrame(moveControlAnimation);
  }

  isElementInViewport(timeControlEl, function(el, entry) {
    windowHeight = window.innerHeight;
    controlAnimationCanMove = true;
    moveControlAnimation();
  }, function(el, entry) {
    controlAnimationCanMove = false;
  }, '50px');

  onScroll(function() {
    if (time.anim && !time.anim.paused) {
      time.anim.pause();
      controlAnimationCanMove = true;
      moveControlAnimation();
    }
  });

})();

var layeredAnimation = (function() {

  var transformEls = document.querySelectorAll('.transform-progress');
  var layeredAnimationEl = document.querySelector('.layered-animations');
  var shapeEls = layeredAnimationEl.querySelectorAll('.shape');
  var triangleEl = layeredAnimationEl.querySelector('polygon');
  var trianglePoints = triangleEl.getAttribute('points').split(' ');
  var easings = ['easeInOutQuad', 'easeInOutCirc', 'easeInOutSine', 'spring'];

  fitElementToParent(layeredAnimationEl);

  function createKeyframes(value) {
    var keyframes = [];
    for (var i = 0; i < 30; i++) keyframes.push({ value: value });
    return keyframes;
  }

  function animateShape(el) {

    var circleEl = el.querySelector('circle');
    var rectEl = el.querySelector('rect');
    var polyEl = el.querySelector('polygon');

    var animation = anime.timeline({
      targets: el,
      duration: function() { return anime.random(600, 2200); },
      easing: function() { return easings[anime.random(0, easings.length - 1)]; },
      complete: function(anim) { animateShape(anim.animatables[0].target); },
    })
    .add({
      translateX: createKeyframes(function(el) { 
        return el.classList.contains('large') ? anime.random(-300, 300) : anime.random(-520, 520);
      }),
      translateY: createKeyframes(function(el) { 
        return el.classList.contains('large') ? anime.random(-110, 110) : anime.random(-280, 280);
      }),
      rotate: createKeyframes(function() { return anime.random(-180, 180); }),
    }, 0);
    if (circleEl) {
      animation.add({
        targets: circleEl,
        r: createKeyframes(function() { return anime.random(32, 72); }),
      }, 0);
    }
    if (rectEl) {
      animation.add({
        targets: rectEl,
        width: createKeyframes(function() { return anime.random(64, 120); }),
        height: createKeyframes(function() { return anime.random(64, 120); }),
      }, 0);
    }
    if (polyEl) {
      animation.add({
        targets: polyEl,
        points: createKeyframes(function() { 
          var scale = anime.random(72, 180) / 100;
          return trianglePoints.map(function(p) { return p * scale; }).join(' ');
        }),
      }, 0);
    }

    isElementInViewport(layeredAnimationEl, animation.play, animation.pause);

  }

  for (var i = 0; i < shapeEls.length; i++) {
    animateShape(shapeEls[i]);
  }

  function animateProgress(el) {
    var animation = anime.timeline({
      targets: el,
      duration: function() { return anime.random(400, 1800); },
      easing: function() { return easings[anime.random(0, easings.length - 2)]; },
      complete: function(anim) { animateProgress(anim.animatables[0].target); },
    })
    .add({
      transformOrigin: createKeyframes(function(el) { 
        return anime.random(0, 100) + '%';
      })
    }, 0)
    .add({
      scaleX: createKeyframes(function(el) { 
        return anime.random(10, 100) / 100;
      })
    }, 0);
    isElementInViewport(layeredAnimationEl, animation.play, animation.pause);
  }

  for (var i = 0; i < transformEls.length; i++) {
    animateProgress(transformEls[i]);
  }

})();

var scrollToGettingStartedLink = document.querySelector('.scroll-to-getting-started');

scrollToGettingStartedLink.addEventListener('click', function(e) {
  e.preventDefault();
  scrollToElement(document.querySelector('#getting-started'));
})

window.onload = introEasingsAnimation.init;
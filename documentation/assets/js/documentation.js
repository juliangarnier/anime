var navigationEl = document.querySelector('.navigation');
var demosEl = document.querySelector('.demos');
var articleEls = document.querySelectorAll('article');
var demoInfoEl = document.querySelector('.demo-info');
var descriptionEl = document.querySelector('.info-output');
var descriptionTitleEl = document.querySelector('.demo-info h2');
var demos = [];

function getScrollTop() {
  return document.body.scrollTop || document.documentElement.scrollTop;
}

function scrollTo(selector, offset, cb) {
  var offset = offset || 0;
  var el = document.querySelector(selector);
  var scrollAnim = anime({
    targets: {scroll: demosEl.scrollTop},
    scroll: el.offsetTop - offset,
    duration: 500,
    easing: 'easeInOutQuart',
    update: function(a) { demosEl.scrollTop = a.animations[0].currentValue; },
    complete: function() { if (cb) cb(); }
  });
}

function parseJS(demoCode) {
  var split = demoCode.split('/*DEMO*/\n');
  return split[1] || '';
}

function createCodePreview(code) {
  var previewEl = document.createElement('div');
  var preEl = document.createElement('pre');
  var codeEl = document.createElement('code');
  previewEl.classList.add('code-preview');
  previewEl.innerHTML = '<h2>Code example</h2>';
  codeEl.appendChild(code);
  preEl.appendChild(codeEl);
  previewEl.appendChild(preEl);
  return previewEl;
}

function outputCode(demoCode, demoTitle, demoDecription, demoColorClass) {
  var js = document.createTextNode(parseJS(demoCode));
  demoInfoEl.classList.remove(demoInfoEl.classList[2]);
  demoInfoEl.classList.add(demoColorClass);
  descriptionEl.innerHTML = demoDecription;
  descriptionEl.appendChild(createCodePreview(js));
  descriptionTitleEl.innerHTML = demoTitle;
  codeEls = descriptionEl.querySelectorAll('code');
  for (var i = 0; i < codeEls.length; i++) {
    hljs.highlightBlock(codeEls[i]);
  }
}

function toggleSectionLink(ulEl) {
  var ulEls = document.querySelectorAll('.navigation ul');
  var ulLiEls = ulEl.querySelectorAll('.li');
  for (var i = 0; i < ulEls.length; i++) ulEls[i].classList.remove('active');
  ulEl.classList.add('active');
  anime.remove(ulEls);
  anime({
    targets: '.navigation ul:not(.active)',
    height: 30,
    duration: 400,
    easing: 'easeOutQuart'
  });
  anime({
    targets: ulEl,
    height: function(el) {
      var height = 0;
      var childNodes = el.childNodes;
      for (var i = 0; i < childNodes.length; i++) height += childNodes[i].offsetHeight;
      return height;
    },
    duration: 600,
    delay: 400,
    easing: 'easeInOutQuart'
  });
}

function resetDemo() {
  var els = document.querySelectorAll('.el');
  for (var i = 0; i < els.length; i++) {
    anime.remove(els[i]);
    els[i].style = '';
  }
}

function resetDemos() {
  for (var i = 0; i < anime.running.length; i++) {
    var anim = anime.running[i];
    anim.pause();
    anim.seek(0);
  }
  document.body.classList.add('ready');
}

function createDemo(el) {
  var demo = {};
  var demoColorClass = el.parentNode.classList[0];
  var scriptEl = el.querySelector('script');
  var demoContentEl = el.querySelector('.demo-content');
  var descriptionContentEl = el.querySelector('.demo-description');
  var demoTitle = el.querySelector('h3').innerHTML;
  var id = el.id;
  var demoAnim = window[id];
  var demoCode = scriptEl ? scriptEl.innerHTML : '';
  var demoDescription = descriptionContentEl ? descriptionContentEl.innerHTML : '';
  function restart() {
    resetDemo();
    demoAnim();
  }
  function highlightDemo(e, push) {
    var canRestart = !el.classList.contains('controls');
    if (e) {
      e.preventDefault();
      if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT') {
        canRestart = false;
      }
    }
    if (!el.classList.contains('active')) {
      resetDemos();
      var linkEls = document.querySelectorAll('.demo-link');
      for (var i = 0; i < demos.length; i++) {
        var d = demos[i];
        d.el.classList.remove('active');
        linkEls[i].parentNode.classList.remove('active');
        //d.anim.pause();
      }
      outputCode(demoCode, demoTitle, demoDescription, demoColorClass);
      var linkEl = document.querySelector('a[href="#'+id+'"]');
      var ulEl = linkEl.parentNode.parentNode;
      linkEl.parentNode.classList.add('active');
      el.classList.add('active');
      scrollTo('#'+id, 60, function() {
        toggleSectionLink(ulEl);
        if (canRestart) restart();
      });
      if (push) history.pushState(null, null, '#'+id);
    } else {
      if (canRestart) restart();
    }
  }
  function enterDemo() {
    if (!el.classList.contains('active')) {
      restart();
    }
  }
  function leaveDemo() {
    if (!el.classList.contains('active')) {
      resetDemo();
    }
  }
  el.addEventListener('click', function(e) {
    highlightDemo(e, true);
  });
  resetDemos();
  return {
    el: el,
    title: demoTitle,
    id: id,
    anim: demoAnim,
    highlight: highlightDemo
  }
}

function getDemoById(id) {
  return demos.filter(function(a) { return a.id === id})[0];
}

function createLinksSection(articleEl) {
  var articleId = articleEl.id;
  var articleTitle = articleEl.querySelector('h2').innerHTML;
  var colorClass = articleEl.classList[0];
  var ulEl = document.createElement('ul');
  var liEl = document.createElement('li');
  var sectionLinkEl = document.createElement('a');
  sectionLinkEl.setAttribute('href', '#'+articleId);
  sectionLinkEl.innerHTML = articleTitle;
  sectionLinkEl.addEventListener('click', function(e) {
    e.preventDefault();
    var firstDemoId = articleEl.querySelector('.demo').id;
    var firstDemo = getDemoById(firstDemoId);
    firstDemo.highlight(e, true);
  });
  liEl.appendChild(sectionLinkEl);
  ulEl.appendChild(liEl);
  ulEl.classList.add(colorClass);
  return ulEl;
}

function createDemoLink(demo) {
  var liEl = document.createElement('li');
  var demoLinkEl = document.createElement('a');
  demoLinkEl.setAttribute('href', '#'+demo.id);
  demoLinkEl.innerHTML = demo.title;
  demoLinkEl.classList.add('demo-link');
  demoLinkEl.addEventListener('click', function(e) {
    demo.highlight(e, true);
  });
  liEl.appendChild(demoLinkEl);
  return liEl;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < articleEls.length; i++) {
  var articleEl = articleEls[i];
  var linksSectionEl = createLinksSection(articleEl);
  var demoEls = articleEl.querySelectorAll('.demo');
  for (var d = 0; d < demoEls.length; d++) {
    var demo = createDemo(demoEls[d]);
    var demoLinkEl = createDemoLink(demo);
    linksSectionEl.appendChild(demoLinkEl);
    demos.push(demo);
  }
  fragment.appendChild(linksSectionEl);
}

navigationEl.appendChild(fragment);

function updateDemos() {
  var hash = window.location.hash;
  if (hash) {
    var id = hash.replace('#','');
    var demo = getDemoById(id);
    if (demo) demo.highlight();
  } else {
    demos[0].highlight();
  }
}

function keyboardNavigation(e) {
  var activeDemoEl = document.querySelector('.demo.active');
  switch (e.keyCode) {
    case 38:
      var prevEl = activeDemoEl.previousElementSibling;
      while (prevEl && !prevEl.classList.contains('demo') && prevEl.parentNode.previousElementSibling) {
        prevEl = prevEl.parentNode.previousElementSibling.lastElementChild;
      }
      if (prevEl && prevEl.classList.contains('demo')) getDemoById(prevEl.id).highlight(e, true);
      break;
    case 40:
      var nextEl = activeDemoEl.nextElementSibling;
      if (!nextEl && activeDemoEl.parentNode.nextElementSibling) {
        nextEl = activeDemoEl.parentNode.nextElementSibling.querySelector('.demo');
      }
      if (nextEl && nextEl.classList.contains('demo')) getDemoById(nextEl.id).highlight(e, true);
      break;
  }
}

// Update date and version number

var versionNumerEls = document.querySelectorAll('.version-number');
var dateEl = document.querySelector('.date');
var date = new Date();

for (var i = 0; i < versionNumerEls.length; i++) {
  versionNumerEls[i].innerHTML = anime.version;
}

// Init

updateDemos();
window.onhashchange = updateDemos;
document.onkeydown = keyboardNavigation;

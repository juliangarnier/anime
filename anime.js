/*
 * Anime v1.2.0 - experimental
 * http://anime-js.com
 * JavaScript animation engine
 * Copyright (c) 2016 Julian Garnier
 * http://juliangarnier.com
 * Released under the MIT license
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.anime = factory();
  }
}(this, function () {
  // Defaults

  var defaultSettings = {
    duration: 1000,
    delay: 0,
    loop: false,
    autoplay: true,
    direction: 'normal',
    easing: 'easeOutElastic',
    elasticity: 400,
    round: false,
  }

  var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];

  // Utils

   // an undefined variable saves some space in minification
   var undef = undefined,
   getProp = Object.getOwnPropertyDescriptor,
   deffProp = Object.defineProperty;

  var is = (function() {
    return {
      array:  function(a) { return Array.isArray(a) },
      object: function(a) { return Object.prototype.toString.call(a).indexOf('Object') > -1 },
      html:   function(a) { return (a instanceof NodeList || a instanceof HTMLCollection) },
      node:   function(a) { return a.nodeType },
      svg:    function(a) { return a instanceof SVGElement },
      number: function(a) { return !isNaN(parseInt(a)) },
      bool:   function(a) { return typeof a === 'boolean'},
      string: function(a) { return typeof a === 'string' },
      func:   function(a) { return typeof a === 'function' },
      undef:  function(a) { return typeof a === 'undefined' },
      null:   function(a) { return typeof a === 'null' },
      hex:    function(a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a) },
      rgb:    function(a) { return /^rgb/.test(a) },
      rgba:   function(a) { return /^rgba/.test(a) },
      hsl:    function(a) { return /^hsl/.test(a) },
      color:  function(a) { return (is.hex(a) || is.rgb(a) || is.rgba(a) || is.hsl(a))}
    }
  })();

  function includes(arr, searchElement) {
      if (arr.includes) return arr.includes(searchElement);
      if (!is.array(arr)) arr = [].slice.call(arr);
      return !arr.length ? false : arr.some(function(a){ return a === searchElement;});
  }

  // Easings functions adapted from http://jqueryui.com/

  var easings = (function() {
    var eases = {};
    var names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
    var functions = {
      Sine: function(t) { return 1 - Math.cos( t * Math.PI / 2 ); },
      Circ: function(t) { return 1 - Math.sqrt( 1 - t * t ); },
      Elastic: function(t, m) {
        if( t === 0 || t === 1 ) return t;
        var p = (1 - Math.min(m, 998) / 1000), st = t / 1, st1 = st - 1, s = p / ( 2 * Math.PI ) * Math.asin( 1 );
        return -( Math.pow( 2, 10 * st1 ) * Math.sin( ( st1 - s ) * ( 2 * Math.PI ) / p ) );
      },
      Back: function(t) { return t * t * ( 3 * t - 2 ); },
      Bounce: function(t) {
        var pow2, bounce = 4;
        while ( t < ( ( pow2 = Math.pow( 2, --bounce ) ) - 1 ) / 11 ) {}
        return 1 / Math.pow( 4, 3 - bounce ) - 7.5625 * Math.pow( ( pow2 * 3 - 2 ) / 22 - t, 2 );
      }
    }
    names.forEach(function(name, i) {
      functions[name] = function(t) {
        return Math.pow( t, i + 2 );
      }
    });
    for (var name in functions) {
      var easeIn = functions[name];
      eases['easeIn' + name] = easeIn;
      eases['easeOut' + name] = function(t, m) { return 1 - easeIn(1 - t, m); };
      eases['easeInOut' + name] = function(t, m) { return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2; };
    }
    eases.linear = function(t) { return t; };
    return eases;
  })();

  // Strings

  var numberToString = function(val) {
    return (is.string(val)) ? val : val + '';
  }

  var stringToHyphens = function(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  var selectString = function(str) {
    if (is.color(str)) return false;
    try {
      return document.querySelectorAll(str);
    } catch(e) {
      return false;
    }
  }

  // Numbers

  var random = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Arrays
  var flattenArray = function(arr) {
    return arr.reduce(function(a, b) {
      return a.concat(is.array(b) ? flattenArray(b) : b);
    }, []);
  }

  var toArray = function(o) {
    if (is.array(o)) return o;
    if (is.string(o)) o = selectString(o) || o; // this is very hacky
    return is.html(o) ? [].slice.call(o) : [o];
  }

  var groupArrayByProps = function(arr, propsArr) {
    var groups = {};
    arr.forEach(function(o) {
      var group = JSON.stringify(propsArr.map(function(p) { return o[p]; }));
      groups[group] = groups[group] || [];
      groups[group].push(o);
    });
    return Object.keys(groups).map(function(group) {
      return groups[group];
    });
  }

  var dropArrDupes = function(ar) {
    return ar.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
  }

  // Objects

  var cloneObject = function(o) {
    var newObject = {};
    for (var p in o) deffProp(newObject,p,getProp(o,p));
    return newObject;
  }

  var mergeObjects = function(o1, o2) {
    for (var p in o2) o1[p] = !is.undef(o1[p]) ? o1[p] : o2[p];
    return o1;
  }

  var eventsys = function(obj) {
      if(!obj) obj = {};
      var options = {
          evtlisteners: new Set,
          __stop: false,
          on:function(type, func) {
              if (!is.func(func)) throw new TypeError('.on() needs a function');
              func.etype = type;
              func.ehandle = {
                  on:function() {
                      func.etype = type;
                      options.evtlisteners.add(func);
                      return func.ehandle;
                  },
                  off:function() {
                    options.off(func);
                    return func.ehandle;
                  },
              };
              options.evtlisteners.add(func);
              return func.ehandle;
          },
          once:function(type, func) {
              if (is.func(func)) {
                  var funcwrapper = function() {
                      func.apply(obj, arguments);
                      options.off(funcwrapper);
                  }
                  return options.on(type, funcwrapper);
              }
              throw new TypeError('.once needs a function');
          },
          off:function(func) {
              if (options.evtlisteners.has(func)) options.evtlisteners.delete(func);
              return options;
          },
          emit:function(type) {
              if (!options.stop && options.evtlisteners.size > 0) {
                  var args = [].slice.call(arguments,1);
                  options.evtlisteners.forEach(function(ln) {
                      if (ln.etype == type && !options.__stop) ln.apply(obj, args.concat(ln.ehandle));
                  });
              }
              return options;
          },
          stopall:function(stop) {
              options.__stop = is.bool(stop) ? stop : true;
          },
      };
      return mergeObjects(obj,options);
  }

  // Colors

  var hexToRgb = function(hex) {
    var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    var hex = hex.replace(rgx, function(m, r, g, b) { return r + r + g + g + b + b; });
    var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    var r = parseInt(rgb[1], 16);
    var g = parseInt(rgb[2], 16);
    var b = parseInt(rgb[3], 16);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  var hslToRgb = function(hsl) {
    var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
    var h = parseInt(hsl[1]) / 360;
    var s = parseInt(hsl[2]) / 100;
    var l = parseInt(hsl[3]) / 100;
    var hue2rgb = function(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }
    var r, g, b;
    if (s == 0) {
      r = g = b = l;
    } else {
      var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      var p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
  }

  var colorToRgb = function(val) {
    if (is.rgb(val) || is.rgba(val)) return val;
    if (is.hex(val)) return hexToRgb(val);
    if (is.hsl(val)) return hslToRgb(val);
  }

  // Units

  var getUnit = function(val) {
    return /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2];
  }

  var addDefaultTransformUnit = function(prop, val, intialVal) {
    if (getUnit(val)) return val;
    if (prop.indexOf('translate') > -1) return getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px';
    if (prop.indexOf('rotate') > -1 || prop.indexOf('skew') > -1) return val + 'deg';
    return val;
  }

  // Values

  var getAnimationType = function(el, prop) {
    if ((is.node(el) || is.svg(el)) && includes(validTransforms, prop)) return 'transform';
    if ((is.node(el) || is.svg(el)) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
    if ((is.node(el) || is.svg(el)) && (el.getAttribute(prop) || (is.svg(el) && el[prop]))) return 'attribute';
    if (!is.null(el[prop]) && !is.undef(el[prop])) return 'object';
  }

  var getCSSValue = function(el, prop) {
    // First check if prop is a valid CSS property
    // Then return the property value or fallback to '0' when getPropertyValue fails
    if (prop in el.style) return getComputedStyle(el).getPropertyValue(stringToHyphens(prop)) || '0';
  }

  var getTransformValue = function(el, prop) {
    var defaultVal = includes(prop,'scale') ? 1 : 0;
    var str = el.style.transform;
    if (!str) return defaultVal;
    var rgx = /(\w+)\((.+?)\)/g;
    var match = [];
    var props = [];
    var values = [];
    while (match = rgx.exec(str)) {
      props.push(match[1]);
      values.push(match[2]);
    }
    var val = values.filter(function(f, i) { return props[i] === prop; });
    return val.length ? val[0] : defaultVal;
  }

  var getInitialTargetValue = function(target, prop) {
    var animtype = getAnimationType(target, prop);
    // a necessary evil for space
    return animtype === 'transform' ? getTransformValue(target, prop) :
        animtype === 'css' ? getCSSValue(target, prop) :
        animtype === 'attribute' ? target.getAttribute(prop) :
        target[prop] || 0;
  }

  var getValidValue = function(values, val, originalCSS) {
    if (is.color(val)) return colorToRgb(val);
    if (getUnit(val)) return val;
    var unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
    if (!unit && originalCSS) unit = getUnit(originalCSS);
    return unit ? val + unit : val;
  }

  var decomposeValue = function(val) {
    var rgx = /-?\d*\.?\d+/g;
    return {
      original: val,
      numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
      strings: numberToString(val).split(rgx)
    }
  }

  var recomposeValue = function(numbers, strings, initialStrings) {
    return strings.reduce(function(a, b, i) {
      return a + numbers[i - 1] + (b || initialStrings[i - 1]);
    });
  }

  // Animatables

  var filterTargets = function(targets) {
    return targets ? flattenArray(is.array(targets) ? targets.map(toArray) : toArray(targets)) : []
  }

  var getAnimatables = function(targets) {
    return filterTargets(targets).map(function(t, i) {
      return { target: t, id: i };
    });
  }

  // Properties
  var getProperties = function(params, settings) {
    var props = [];
    for (var p in params) {
      if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
        var prop = is.object(params[p]) ? cloneObject(params[p]) : {value: params[p]};
        prop.name = p;
        props.push(mergeObjects(prop, settings));
      }
    }
    return props;
  }

  var getPropertiesValues = function(target, prop, value, i) {
    var values = toArray( is.func(value) ? value(target, i) : value);
    return {
      from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
      to: (values.length > 1) ? values[1] : values[0]
    }
  }

  var getTweenValues = function(prop, values, type, target) {
    var valid = {};
    if (type === 'transform') {
      valid.from = prop + '(' + addDefaultTransformUnit(prop, values.from, values.to) + ')';
      valid.to = prop + '(' + addDefaultTransformUnit(prop, values.to) + ')';
    } else {
      var originalCSS = (type === 'css') ? getCSSValue(target, prop) :undef;
      valid.from = getValidValue(values, values.from, originalCSS);
      valid.to = getValidValue(values, values.to, originalCSS);
    }
    return { from: decomposeValue(valid.from), to: decomposeValue(valid.to) };
  }

  var getTweensProps = function(animatables, props) {
    var tweensProps = [];
    animatables.forEach(function(animatable, i) {
      var target = animatable.target;
      return props.forEach(function(prop) {
        var animType = getAnimationType(target, prop.name);
        if (animType) {
          var values = getPropertiesValues(target, prop.name, prop.value, i);
          var tween = cloneObject(prop);
          tween.animatables = animatable;
          tween.type = animType;
          tween.from = getTweenValues(prop.name, values, tween.type, target).from;
          tween.to = getTweenValues(prop.name, values, tween.type, target).to;
          tween.round = (is.color(values.from) || tween.round) ? 1 : 0;
          tween.delay = (is.func(tween.delay) ? tween.delay(target, i, animatables.length) : tween.delay) / animation.speed;
          tween.duration = (is.func(tween.duration) ? tween.duration(target, i, animatables.length) : tween.duration) / animation.speed;
          tweensProps.push(tween);
        }
      });
    });
    return tweensProps;
  }

  // Tweens

  var getTweens = function(animatables, props) {
    var tweensProps = getTweensProps(animatables, props);
    var splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
    return splittedProps.map(function(tweenProps) {
      var tween = cloneObject(tweenProps[0]);
      tween.animatables = tweenProps.map(function(p) { return p.animatables });
      tween.totalDuration = tween.delay + tween.duration;
      return tween;
    });
  }

  var reverseTweens = function(anim, delays) {
    anim.tweens.forEach(function(tween) {
      var toVal = tween.to;
      var fromVal = tween.from;
      var delayVal = anim.duration - (tween.delay + tween.duration);
      tween.from = toVal;
      tween.to = fromVal;
      if (delays) tween.delay = delayVal;
    });
    anim.reversed = !!anim.reversed;
  }

  // will-change

  var getWillChange = function(anim) {
    var els = [], props = [];
    anim.tweens.forEach(function(tween) {
      if (tween.type === 'css' || tween.type === 'transform' ) {
        props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
        tween.animatables.forEach(function(animatable) { els.push(animatable.target); });
      }
    });
    return {
      properties: dropArrDupes(props).join(', '),
      elements: dropArrDupes(els)
    }
  }

  var setWillChange = function(anim) {
    var willChange = getWillChange(anim);
    willChange.elements.forEach(function(element) {
      element.style.willChange = willChange.properties;
    });
  }

  var removeWillChange = function(anim) {
    getWillChange(anim).elements.forEach(function(element) {
      element.style.removeProperty('will-change');
    });
  }

  /* Svg path */

  var getPathProps = function(path) {
    var el = is.string(path) ? selectString(path)[0] : path;
    return {
      path: el,
      value: el.getTotalLength()
    }
  }

  // saves space, sorry I know it looks ugly
  var snapProgressToPath = function(tween, progress) {
    var pathEl = tween.path;
    var pathProgress = tween.value * progress;
    var point = function(offset) {
      return pathEl.getPointAtLength((progress > 1 ? tween.value : pathProgress) + (offset || 0));
    }
    var p = point();
    var p0 = point(-1);
    var p1 = point(+1);
    var twnm = tween.name;
    return twnm === 'translateX' ? p.x : twnm === 'translateY' ? p.y : twnm === 'rotate' ? Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI : undef;
  }

  // Progress

  var getTweenProgress = function(tween, time) {
    var elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration);
    var percent = elapsed / tween.duration;
    var progress = tween.to.numbers.map(function(number, p) {
      var start = tween.from.numbers[p];
      var eased = easings[tween.easing](percent, tween.elasticity);
      var val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
      return (tween.round ? Math.round(val * tween.round) / tween.round : val);
    });
    return recomposeValue(progress, tween.to.strings, tween.from.strings);
  }

  var setAnimationProgress = function(anim, time) {
    var transforms =undef;
    anim.time = Math.min(time, anim.duration);
    anim.progress = (anim.time / anim.duration) * 100;
    for (var t = 0; t < anim.tweens.length; t++) {
      var tween = anim.tweens[t];
      tween.currentValue = getTweenProgress(tween, time);
      var progress = tween.currentValue;
      for (var a = 0; a < tween.animatables.length; a++) {
        var animatable = tween.animatables[a];
        var id = animatable.id;
        switch (tween.type) {
          case 'css': animatable.target.style[tween.name] = progress; break;
          case 'attribute': animatable.target.setAttribute(tween.name, progress); break;
          case 'object': animatable.target[tween.name] = progress; break;
          case 'transform':
          if (!transforms) transforms = {};
          if (!transforms[id]) transforms[id] = [];
          transforms[id].push(progress);
          break;
        }
      }
    }
    if (transforms) for (var t in transforms) anim.animatables[t].target.style.transform = transforms[t].join(' ');
    anim.emit('update', anim);
  }

  // Animation

  var createAnimation = function(params) {
    var anim = {
      time : 0,
      progress : 0,
      running : false,
      ended : false,
      started : false,
      animatables : getAnimatables(params.targets),
      settings : mergeObjects(params, defaultSettings),
    };
    anim.properties = getProperties(params, anim.settings);
    anim.tweens = getTweens(anim.animatables, anim.properties);
    anim.duration = anim.tweens.length ? Math.max.apply(Math, anim.tweens.map(function(tween){ return tween.totalDuration; })) : params.duration / animation.speed;
    return eventsys(anim);
  }

  // Public
  var raf = 0, animations = [];

  var engine = (function() {
    var play = function() { raf = requestAnimationFrame(step); }
    var step = function(time) {
      for (var i = 0; i < animations.length; i++) animations[i].tick(time);
      play();
    }
    return {
      play: play,
      pause: function() { cancelAnimationFrame(raf); raf = 0; }
    }
  })();

  var animation = function(params) {
    var time = {}, anim = createAnimation(params);

    ['complete', 'begin', 'update'].forEach(function(type) {
        if (is.func(anim.settings[type])) anim[type == 'update' ? 'on':'once'](type, anim.settings[type]);
    });

    anim.tick = function(now) {
      if (anim.running) {
        anim.ended = false;
        time.current = time.last + now - time.start;
        setAnimationProgress(anim, time.current);
        var s = anim.settings;
        if (time.current >= s.delay) {
          if (!anim.started) anim.emit('begin', anim);
          anim.started = true;
        };
        if (time.current >= anim.duration) {
          if (s.loop) {
            time.start = now;
            if (s.direction === 'alternate') reverseTweens(anim, true);
            if (is.number(s.loop)) s.loop--;
          } else {
            anim.ended = true;
            anim.started = false;
            anim.emit('complete', anim);
            anim.pause();
          }
          time.last = 0;
        }
      }
    }

    anim.seek = function(progress) {
      setAnimationProgress(anim, (progress / 100) * anim.duration);
    }

    anim.pause = function() {
      anim.running = false;
      anim.emit('pause', anim);
      removeWillChange(anim);
      var i = animations.indexOf(anim);
      if (i > -1) animations.splice(i, 1);
      if (!animations.length) engine.pause();
    }

    anim.play = function(params) {
      if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
      anim.pause();
      anim.running = true;
      time.start = performance.now();
      time.last = anim.ended ? 0 : anim.time;
      var s = anim.settings;
      if (s.direction === 'reverse') reverseTweens(anim);
      if (s.direction === 'alternate' && !s.loop) s.loop = 1;
      setWillChange(anim);
      animations.push(anim);
      if (!raf) engine.play();
    }

    anim.restart = function() {
      if (anim.reversed) reverseTweens(anim);
      anim.emit('restart', anim);
      anim.pause();
      anim.seek(0);
      anim.play();
    }

    var callbacks = function(type,isupdate) {
      anim[type] = function(fn) {
        if (is.func(fn)) anim[isupdate ? 'on' :'once'](type , fn);
        else if(typeof Promise != "undefined") return new Promise(function(pass) {
            anim.once(type, pass);
        });
      }
   }
   callbacks("complete");
   callbacks("begin");
   callbacks("update",true);


    if (anim.settings.autoplay) anim.play();

    return anim;
  }

  // Remove on one or multiple targets from all active animations.
  animation.remove = function(targets) {
    targets = filterTargets(targets);
    for (var i = animations.length-1; i >= 0; i--) {
      var animation = animations[i];
      for (var t = animation.tweens.length-1; t >= 0; t--) {
        var tween = animation.tweens[t];
        for (var a = tween.animatables.length-1; a >= 0; a--) {
          if (includes(targets, tween.animatables[a].target)) {
            tween.animatables.splice(a, 1);
            if (!tween.animatables.length) animation.tweens.splice(t, 1);
            if (!animation.tweens.length) animation.pause();
          }
        }
      }
    }
  }

  animation.speed = 1;
  animation.list = animations;
  animation.easings = easings;
  animation.getValue = getInitialTargetValue;
  animation.path = getPathProps;
  animation.random = random;
  animation.play = engine.play;
  animation.pause = engine.pause;

  return animation;

}));

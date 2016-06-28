/*
 * Anime v1.0.0 - ES6 version
 * http://anime-js.com
 * JavaScript animation engine
 * Copyright (c) 2016 Julian Garnier
 * http://juliangarnier.com
 * Released under the MIT license
 */
(function (root, factory) {
    // AMD. Register as an anonymous module.
    typeof define === 'function' && define.amd ? define([], factory) :
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        typeof module === 'object' && module.exports ? module.exports = factory() :
        // Browser globals (root is window)
        root.anime = factory();
}(this, () => {
    // Defaults
    const undef = void 0;

    let defaultSettings = {
            duration: 1000,
            delay: 0,
            loop: false,
            autoplay: true,
            direction: 'normal',
            easing: 'easeOutElastic',
            elasticity: 400,
            round: false,
            begin: undef,
            update: undef,
            complete: undef
        },
        validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skewX', 'skewY'];

    // Utils

    function includes(arr, searchElement) {
        if(arr.includes) return arr.includes(searchElement);
        if (!Array.isArray(arr)) arr = Array.prototype.slice.call(arr);
        return arr.length == 0 ? false : arr.some(item => item === searchitem);
    }

    const is = (() => ({
        array: Array.isArray,
        object: a => includes(Object.prototype.toString.call(a),'Object'),
        html: a => (a instanceof NodeList || a instanceof HTMLCollection),
        node: a => a.nodeType,
        svg: a => a instanceof SVGElement,
        number: a => !isNaN(parseInt(a)),
        string: a => typeof a === 'string',
        func: a => typeof a === 'function',
        undef: a => typeof a === 'undefined',
        null: a => typeof a === 'null',
        hex: a => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a),
        rgb: a => /^rgb/.test(a),
        rgba: a => /^rgba/.test(a),
        hsl: a => /^hsl/.test(a),
        color: a => (is.hex(a) || is.rgb(a) || is.rgba(a) || is.hsl(a))
    }))();

    // Easings functions adapted from http://jqueryui.com/

    const easings = (() => {
        let eases = {},
            names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'],
            functions = {
                Sine: t => 1 - Math.cos(t * Math.PI / 2),
                Circ: t => 1 - Math.sqrt(1 - t * t),
                Elastic(t, m) {
                    if (t === 0 || t === 1) return t;
                    let p = (1 - Math.min(m, 998) / 1000),
                        st = t / 1,
                        st1 = st - 1,
                        s = p / (2 * Math.PI) * Math.asin(1);
                    return -(Math.pow(2, 10 * st1) * Math.sin((st1 - s) * (2 * Math.PI) / p));
                },
                Back: t => t * t * (3 * t - 2),
                Bounce(t) {
                    let pow2, bounce = 4;
                    while (t < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
                    return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
                }
            }
        names.forEach((name, i) => {
            functions[name] = t => Math.pow(t, i + 2);
        });
        Object.keys(functions).forEach(name => {
            let easeIn = functions[name];
            eases['easeIn' + name] = easeIn;
            eases['easeOut' + name] = (t, m) => 1 - easeIn(1 - t, m);
            eases['easeInOut' + name] = (t, m) => t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2;
        });
        eases.linear = t => t;
        return eases;
    })();

    // Strings

    const numberToString = val => (is.string(val)) ? val : val + '',
        stringToHyphens = str => str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase(),
        selectString = str => {
            if (is.color(str)) return false;
            try {
                return document.querySelectorAll(str);
            } catch (e) {
                return false;
            }
        },

        // Numbers
        random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min,

        // Arrays
        toArray = o => {
            if (is.array(o)) return o;
            if (is.string(o)) o = selectString(o) || o;
            if (is.html(o)) return [].slice.call(o);
            return [o];
        },

        flattenArray = arr => Array.prototype.reduce.call(arr, (a, b) => a.concat(is.array(b) ? flattenArray(b) : b), []),

        groupArrayByProps = (arr, propsArr) => {
            let groups = {};
            arr.forEach(o => {
                let group = JSON.stringify(propsArr.map(p => o[p]));
                groups[group] = groups[group] || [];
                groups[group].push(o);
            });
            return Object.keys(groups).map(group => groups[group]);
        },

        removeArrayDuplicates = arr => arr.filter((item, pos, context) => context.indexOf(item) === pos),

        // Objects
        cloneObject = o => {
            let newObject = {};
            for (let p in o) newObject[p] = o[p];
            return newObject;
        },

        mergeObjects = (o1, o2) => {
            for (let p in o2) o1[p] = !is.undef(o1[p]) ? o1[p] : o2[p];
            return o1;
        },

        // Colors
        hexToRgb = hex => {
            hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => r + r + g + g + b + b);
            let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
                r = parseInt(rgb[1], 16),
                g = parseInt(rgb[2], 16),
                b = parseInt(rgb[3], 16);
            return 'rgb(' + r + ',' + g + ',' + b + ')';
        },
        hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            return t < 1 / 6 ? p + (q - p) * 6 * t : t < 1 / 2 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p;
        },
        hslToRgb = hsl => {
            hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hsl);
            let h = parseInt(hsl[1]) / 360,
                s = parseInt(hsl[2]) / 100,
                l = parseInt(hsl[3]) / 100,
                r, g, b;

            if (s == 0) r = g = b = l;
            else {
                let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
                    p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return 'rgb(' + r * 255 + ',' + g * 255 + ',' + b * 255 + ')';
        },
        colorToRgb = val => is.rgb(val) || is.rgba(val) ? val : is.hex(val) ? hexToRgb(val) : is.hsl(val) ? hslToRgb(val) : undef,

        // Units
        getUnit = val => /([\+\-]?[0-9|auto\.]+)(%|px|pt|em|rem|in|cm|mm|ex|pc|vw|vh|deg)?/.exec(val)[2],

        addDefaultTransformUnit = (prop, val, intialVal) => getUnit(val) ? val :
        includes(prop,'translate') ? getUnit(intialVal) ? val + getUnit(intialVal) : val + 'px' :
        includes(prop,'rotate') || includes(prop,'skew') ? val + 'deg' : val,

        // Values
        getAnimationType = (el, prop) => {
            if ((is.node(el) || is.svg(el)) && includes(validTransforms, prop)) return 'transform';
            if ((is.node(el) || is.svg(el)) && (prop !== 'transform' && getCSSValue(el, prop))) return 'css';
            if ((is.node(el) || is.svg(el)) && (el.getAttribute(prop) || el[prop])) return 'attribute';
            if (!is.null(el[prop]) && !is.undef(el[prop])) return 'object';
        },

        getCSSValue = (el, prop) => getComputedStyle(el).getPropertyValue(stringToHyphens(prop)),

        getTransformValue = (el, prop) => {
            let defaultVal = includes(prop,'scale') ? 1 : 0,
                str = el.style.transform;
            if (!str) return defaultVal;
            let rgx = /(\w+)\((.+?)\)/g,
                match = [],
                props = [],
                values = [];
            while (match = rgx.exec(str)) {
                props.push(match[1]);
                values.push(match[2]);
            }
            let val = values.filter((f, i) => props[i] === prop);
            return val.length ? val[0] : defaultVal;
        },

        getInitialTargetValue = (target, prop) => {
            let animtype = getAnimationType(target, prop);
            return animtype == 'transform' ? getTransformValue(target, prop) :
                animtype == 'css' ? getCSSValue(target, prop) :
                animtype == 'attribute' ? target.getAttribute(prop) :
                target[prop] || 0;
        },

        getValidValue = (values, val, originalCSS) => {
            if (is.color(val)) return colorToRgb(val);
            if (getUnit(val)) return val;
            let unit = getUnit(values.to) ? getUnit(values.to) : getUnit(values.from);
            if (!unit && originalCSS) unit = getUnit(originalCSS);
            return unit ? val + unit : val;
        },

        decomposeValue = val => {
            let rgx = /-?\d*\.?\d+/g;
            return {
                original: val,
                numbers: numberToString(val).match(rgx) ? numberToString(val).match(rgx).map(Number) : [0],
                strings: numberToString(val).split(rgx)
            }
        },

        recomposeValue = (numbers, strings, initialStrings) => strings.reduce((a, b, i) => (a + numbers[i - 1] + (b ? b : initialStrings[i - 1]))),

        // Animatables

        getAnimatables = targets => (targets ? (flattenArray(is.array(targets) ? targets.map(toArray) : toArray(targets))) : [])
        .map((t, i) => ({
            target: t,
            id: i
        })),

        // Properties

        getProperties = (params, settings) => {
            let props = [];
            for (let p in params) {
                if (!defaultSettings.hasOwnProperty(p) && p !== 'targets') {
                    let prop = is.object(params[p]) ? cloneObject(params[p]) : {
                        value: params[p]
                    };
                    prop.name = p;
                    props.push(mergeObjects(prop, settings));
                }
            }
            return props;
        },

        getPropertiesValues = (target, prop, value, i) => {
            let values = toArray(is.func(value) ? value(target, i) : value);
            return {
                from: (values.length > 1) ? values[0] : getInitialTargetValue(target, prop),
                to: (values.length > 1) ? values[1] : values[0]
            }
        },

        getTweenValues = (prop, values, type, target) => {
            let valid = {};
            if (type === 'transform') {
                valid.from = prop + `(${addDefaultTransformUnit(prop, values.from, values.to)})`;
                valid.to = prop + `(${addDefaultTransformUnit(prop, values.to)})`;
            } else {
                let originalCSS = (type === 'css') ? getCSSValue(target, prop) : undef;
                valid.from = getValidValue(values, values.from, originalCSS);
                valid.to = getValidValue(values, values.to, originalCSS);
            }
            return {
                from: decomposeValue(valid.from),
                to: decomposeValue(valid.to)
            };
        },

        getTweensProps = (animatables, props) => {
            let tweensProps = [];
            animatables.forEach((animatable, i) => {
                let target = animatable.target;
                return props.forEach(prop => {
                    let animType = getAnimationType(target, prop.name);
                    if (animType) {
                        let values = getPropertiesValues(target, prop.name, prop.value, i),
                            tween = cloneObject(prop);
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
        },

        // Tweens
        getTweens = (animatables, props) => {
            let tweensProps = getTweensProps(animatables, props);
            let splittedProps = groupArrayByProps(tweensProps, ['name', 'from', 'to', 'delay', 'duration']);
            return splittedProps.map((tweenProps) => {
                let tween = cloneObject(tweenProps[0]);
                tween.animatables = tweenProps.map(p => p.animatables);
                tween.totalDuration = tween.delay + tween.duration;
                return tween;
            });
        },


        reverseTweens = (anim, delays) => {
            anim.tweens.forEach(tween => {
                let toVal = tween.to,
                    fromVal = tween.from,
                    delayVal = anim.duration - (tween.delay + tween.duration);
                tween.from = toVal;
                tween.to = fromVal;
                if (delays) tween.delay = delayVal;
            });
            anim.reversed = anim.reversed ? false : true; // what??? why
        },

        // will-change

        getWillChange = anim => {
            let props = [],
                els = [];
            anim.tweens.forEach(tween => {
                if (tween.type === 'css' || tween.type === 'transform') {
                    props.push(tween.type === 'css' ? stringToHyphens(tween.name) : 'transform');
                    tween.animatables.forEach(animatable => els.push(animatable.target));
                }
            });
            return {
                properties: removeArrayDuplicates(props).join(', '),
                elements: removeArrayDuplicates(els)
            }
        },

        setWillChange = anim => {
            let willChange = getWillChange(anim);
            willChange.elements.forEach(element => (element.style.willChange = willChange.properties));
        },

        removeWillChange = anim => {
            getWillChange(anim).elements.forEach(element => element.style.removeProperty('will-change'));
        },

        /* Svg path */

        getPathProps = path => {
            let el = is.string(path) ? selectString(path)[0] : path;
            return {
                path: el,
                value: el.getTotalLength()
            }
        },

        snapProgressToPath = (tween, progress) => {
            let pathEl = tween.path,
                pathProgress = tween.value * progress,
                point = offset => pathEl.getPointAtLength(progress > 1 ? tween.value + (offset || 0) : pathProgress + (offset || 0)),
                p = point(),
                p0 = point(-1),
                p1 = point(+1),
                twnm = tween.name;
            return twnm == 'translateX' ? p.x : twnm == 'translateY' ? p.y : twnm == 'rotate' ? Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI : undef;
        },

        // Progress

        getTweenProgress = (tween, time) => {
            let elapsed = Math.min(Math.max(time - tween.delay, 0), tween.duration),
                percent = elapsed / tween.duration,
                progress = tween.to.numbers.map((number, p) => {
                    let start = tween.from.numbers[p],
                        eased = easings[tween.easing](percent, tween.elasticity),
                        val = tween.path ? snapProgressToPath(tween, eased) : start + eased * (number - start);
                    return (tween.round ? Math.round(val * tween.round) / tween.round : val);
                });
            return recomposeValue(progress, tween.to.strings, tween.from.strings);
        },

        setAnimationProgress = (anim, time) => {
            let transforms;
            anim.time = Math.min(time, anim.duration);
            anim.progress = (anim.time / anim.duration) * 100;
            anim.tweens.forEach(tween => {
                tween.currentValue = getTweenProgress(tween, time);
                let progress = tween.currentValue;
                tween.animatables.forEach(animatable => {
                    let id = animatable.id;
                    switch (tween.type) {
                        case 'css':
                            animatable.target.style[tween.name] = progress;
                            break;
                        case 'attribute':
                            animatable.target.setAttribute(tween.name, progress);
                            break;
                        case 'object':
                            animatable.target[tween.name] = progress;
                            break;
                        case 'transform':
                            if (!transforms) transforms = {};
                            if (!transforms[id]) transforms[id] = [];
                            transforms[id].push(progress);
                            break;
                    }
                });
            });
            if (transforms)
                for (let t in transforms) anim.animatables[t].target.style.transform = transforms[t].join(' ');
            if (anim.settings.update) anim.settings.update(anim);
        },

        // Animation

        createAnimation = params => {
            let anim = {
                animatables: getAnimatables(params.targets),
                settings: mergeObjects(params, defaultSettings),
                time: 0,
                progress: 0,
                running: false,
                ended: false
            };
            anim.properties = getProperties(params, anim.settings);
            anim.tweens = getTweens(anim.animatables, anim.properties);
            anim.duration = anim.tweens.length ? Math.max.apply(Math, anim.tweens.map(tween => tween.totalDuration)) : params.duration / animation.speed;
            return anim;
        };

    // Public

    let animations = [];

    const animation = params => {
            let time = {},
                anim = createAnimation(params);

            time.tick = () => {
                if (anim.running) {
                    anim.ended = false;
                    time.now = +new Date();
                    time.current = time.last + time.now - time.start;
                    setAnimationProgress(anim, time.current);
                    let s = anim.settings;
                    if (s.begin && time.current >= s.delay) {
                        s.begin(anim);
                        s.begin = undef;
                    };
                    if (time.current >= anim.duration) {
                        if (s.loop) {
                            time.start = +new Date();
                            if (s.direction === 'alternate') reverseTweens(anim, true);
                            if (is.number(s.loop)) s.loop--;
                            time.raf = requestAnimationFrame(time.tick);
                        } else {
                            anim.ended = true;
                            if (s.complete) s.complete(anim);
                            anim.pause();
                        }
                        time.last = 0;
                    } else time.raf = requestAnimationFrame(time.tick);
                }
            }

            anim.seek = progress => setAnimationProgress(anim, (progress / 100) * anim.duration);


            anim.pause = () => {
                anim.running = false;
                cancelAnimationFrame(time.raf);
                removeWillChange(anim);
                let i = animations.indexOf(anim);
                if (i > -1) animations.splice(i, 1);
            }

            anim.play = params => {
                if (params) anim = mergeObjects(createAnimation(mergeObjects(params, anim.settings)), anim);
                anim.pause();
                anim.running = true;
                time.start = +new Date();
                time.last = anim.ended ? 0 : anim.time;
                let s = anim.settings;
                if (s.direction === 'reverse') reverseTweens(anim);
                if (s.direction === 'alternate' && !s.loop) s.loop = 1;
                setWillChange(anim);
                animations.push(anim);
                time.raf = requestAnimationFrame(time.tick);
            }

            anim.restart = () => {
                if (anim.reversed) reverseTweens(anim);
                anim.pause();
                anim.seek(0);
                anim.play();
            }

            if (anim.settings.autoplay) anim.play();

            return anim;
        },

        // Remove on one or multiple targets from all active animations.

        remove = elements => {
            let targets = flattenArray(is.array(elements) ? elements.map(toArray) : toArray(elements));
            for (let animation, i = animations.length - 1; i >= 0; i--) {
                animation = animations[i];
                for (let tween, t = animation.tweens.length - 1; t >= 0; t--) {
                    tween = animation.tweens[t];
                    for (let a = tween.animatables.length - 1; a >= 0; a--) {
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
    animation.remove = remove;
    animation.easings = easings;
    animation.getValue = getInitialTargetValue;
    animation.path = getPathProps;
    animation.random = random;
    animation.includes = includes;
    animation.cloneObject = cloneObject;
    animation.mergeObjects = mergeObjects;
    animation.flattenArray = flattenArray;
    animation.removeArrayDuplicates = removeWillChange;

    return animation;

}));

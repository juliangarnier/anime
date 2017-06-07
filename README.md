# [anime.js](http://animejs.com) ![](http://img.badgesize.io/juliangarnier/anime/v2.0/anime.min.js.svg?style=flat&color=18FF92) [![CDNJS](https://img.shields.io/cdnjs/v/animejs.svg)](https://cdnjs.com/libraries/animejs) [![npm](https://img.shields.io/npm/v/animejs.svg)](https://www.npmjs.com/package/animejs)

<img src="http://animejs.com/documentation/assets/img/readme/animejs-logo.gif" width="100%" />

>*Anime* `(/ˈæn.ə.meɪ/)` is a lightweight JavaScript animation library. It works with any CSS Properties, individual CSS transforms, SVG or any DOM attributes, and JavaScript Objects.

⚠️ **Migrating from v1.x ? Make sure to read the [changelog](https://github.com/juliangarnier/anime/releases/tag/v2.0.0)** ⚠️

### Main features

* [Keyframes](#keyframes): Chain multiple animation properties.
* [Timeline](#timeline): Synchronize multiple instances together.
* [Playback controls](#playback-controls): Play, pause, restart, seek animations or timelines.
* [CSS transforms](#individual-CSS-transforms): Animate CSS transforms individually.
* [Function based values](#function-based-values): Multiple animated targets can have individual value.
* [SVG Animations](#svg): Motion path, line drawing and morphing animations.
* [Easing functions](#easing-functions): Use the built in functions or create your own Cubic Bézier curve easing.

### Demos and examples

* [CodePen demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)
* [juliangarnier.com](http://juliangarnier.com)
* [animejs.com](http://animejs.com)
* [kenzo.com/en/thejunglebook](https://kenzo.com/en/thejunglebook)
* [Stress test](http://codepen.io/juliangarnier/pen/9aea7f045d7db301eab41bc09dcfc04d?editors=0010)

### Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 6+ | 10+ | 32+ | 15+ |

## Usage

```bash
$ npm install animejs
# OR
$ bower install animejs
```

```javascript
import anime from 'animejs'
```

Or manually [download](https://github.com/juliangarnier/anime/archive/master.zip) and link `anime.min.js` in your HTML:

```html
<script src="anime.min.js"></script>
```

Then start animating:

```javascript
anime({
  targets: 'div',
  translateX: [
    { value: 100, duration: 1200 },
    { value: 0, duration: 800 }
  ],
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 2000,
  loop: true
});
```

# API

## Targets

The `targets` property defines the elements or JS `Object`s to animate.

| Types | Examples
| --- | ---
| CSS Selectors | `'div'`, `'.item'`, `'path'`, `'#el path'` ...
| DOM Element | `document.querySelector('.item')`
| NodeList | `document.querySelectorAll('.item')`
| `Object` | `{prop1: 100, prop2: 200}`
| `Array` | `['div', '.item', domNode]`

➜ [Targets examples](http://animejs.com/documentation/#cssSelector)

## Animatable properties

| Types | Examples
| --- | ---
| CSS | `opacity`, `backgroundColor`, `fontSize` ...
| Transforms | `translateX`, `rotate`, `scale` ...
| Object properties | Any `Object` property containing numerical values
| DOM attributes | Any DOM attributes containing numerical values
| SVG attributes | Any SVG attributes containing numerical values

➜ [Animatable properties examples](http://animejs.com/documentation/#cssProperties)

### CSS

<img src="http://animejs.com/documentation/assets/img/readme/prop-css.gif" width="332" />

Any CSS properties can be animated:

```javascript
anime({
  targets: 'div',
  left: '80%', // Animate all divs left position to 80%
  opacity: .8, // Animate all divs opacity to .8
  backgroundColor: '#FFF' // Animate all divs background color to #FFF
});
```

➜ [CSS properties example](http://animejs.com/documentation/#cssProperties)

### Individual CSS transforms

<img src="http://animejs.com/documentation/assets/img/readme/prop-transforms.gif" width="332" />

CSS transforms can be animated individually:

```javascript
anime({
  targets: 'div',
  translateX: 250, // Animate all divs translateX property to 250px
  scale: 2, // Animate all divs scale to 2
  rotate: '1turn' // Animate all divs rotation to 1 turn
});
```

➜ [CSS Transforms example](http://animejs.com/documentation/#CSStransforms)

### JavaScript Object properties

<img src="http://animejs.com/documentation/assets/img/readme/prop-js-obj.gif" width="332" />

Any `Object` property containing a numerical value can be animated:

```javascript
var myObject = {
  prop1: 0,
  prop2: '0%'
}

anime({
  targets: myObject,
  prop1: 50, // Animate the 'prop1' property from myObject to 50
  prop2: '100%' // Animate the 'prop2' property from myObject to 100%
});
```

➜ [Object properties example](http://animejs.com/documentation/#JSobjectProp)

### DOM Attributes

<img src="http://animejs.com/documentation/assets/img/readme/prop-dom-attr.gif" width="332" />

Any DOM Attribute containing a numerical values can be animated:

```html
<input value="0">
```

```javascript
anime({
  targets: input,
  value: 1000 // Animate the input value to 1000
  round: 1 // Remove decimals by rounding the value
});
```

➜ [DOM Attributes example](http://animejs.com/documentation/#domAttributes)

### SVG Attributes

<img src="http://animejs.com/documentation/assets/img/readme/prop-svg-attr.gif" width="332" />

Any SVG Attribute containing a numerical values can be animated:

```html
<svg width="128" height="128" viewBox="0 0 128 128">
  <polygon points="64 68.73508918222262 8.574 99.9935923731656 63.35810017508558 67.62284396863708 64 3.993592373165592 64.64189982491442 67.62284396863708 119.426 99.9935923731656"></polygon>
</svg>
```

```javascript
anime({
  targets: 'polygon',
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
});
```

➜ [SVG Attributes example](http://animejs.com/documentation/#svgAttributes)

## Property parameters

<img src="http://animejs.com/documentation/assets/img/readme/prop-parameters.gif" width="332" />

Defines duration, delay and easing for each property animations.<br>
Can be set globally, or individually to each properties:

| Names | Defaults | Types | Info
| --- | --- | --- | ---
| duration | `1000` | `number`, `function`  | millisecond
| delay | `0` | `number`, `function`   | millisecond
| easing | `'easeOutElastic'` | `function`  | [See Easing functions](#easing-functions)
| elasticity | `500` | `number`, `function` | Range [0 - 1000]
| round | `false` | `number`, `boolean`, `function` | Power of 10

```javascript
anime({
  translateX: {
    value: 250,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 2,
    duration: 1600,
    delay: 800,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});
```

➜ [Property parameters examples](http://animejs.com/documentation/#duration)

## Function based property parameters

<img src="http://animejs.com/documentation/assets/img/readme/fb-parameters.gif" width="332" />

Get different property parameters for every target of the animation.<br>
The function accepts 3 arguments: `target`, `index`, `targetsLength`.

```javascript
anime({
  targets: 'div',
  translateX: 250,
  rotate: 180,
  duration: function(target) {
    // Duration based on every div 'data-duration' attribute
    return target.getAttribute('data-duration');
  },
  delay: function(target, index) {
    // 100ms delay multiplied by every div index, in ascending order
    return index * 100;
  },
  elasticity: function(target, index, totalTargets) {
    // Elasticity multiplied by every div index, in descending order
    return 200 + ((totalTargets - index) * 200);
  }
});
```

➜ [Function based parameters examples](http://animejs.com/documentation/#functionBasedDuration)

## Animation parameters

<img src="http://animejs.com/documentation/assets/img/readme/anim-parameters.gif" width="332" />

Parameters relative to the animation to specify the direction, the number of loops or autoplay.

| Names | Defaults | Types
| --- | --- | ---
| loop | `false` | `number`, `boolean`
| direction | `'normal'` | `'normal'`, `'reverse'`, `'alternate'`
| autoplay | `true` | `boolean`

```javascript
anime({
  targets: 'div',
  translateX: 100,
  duration: 2000,
  loop: 3, // Play the animation 3 times
  direction: 'reverse' // Play the animation in reverse
  autoplay: false // Animation paused by default
});
```

➜ [Animation parameters examples](http://animejs.com/documentation/#alternate)

## Property values

### Single value

Defines the end value of the animation.<br>
Start value is the original target value, or default transforms value.

| Types | Examples | Infos
| --- | --- | ---
| Number | `100` | Automatically add original or default unit if needed
| String | `'10em'`, `'1turn'`, `'M21 1v160'`, `'50%'` | Must contains at least one numerical value
| Relative values | `'+=100px'`, `'-=20em'`, `'*=4'` | Add, subtract or multiply the original property value
| Colors | `'#FFF'`, `'rgb(255,0,0)'`, `'hsl(100, 20%, 80%)'` | Accepts 3 or 6 hex digit, rgb, or hsl values

➜ [Values examples](http://animejs.com/documentation/#unitlessValue)

```javascript
anime({
  targets: 'div',
  translateX: 100, // Add 'px' by default (from 0px to 100px)
  rotate: '1turn', // Use 'turn' as unit (from 0turn to 1turn)
  scale: '*=2', // Multiply the current scale value by 2 (from 1 to (1 * 2))
  backgroundColor: '#FFF', // Animate the background color to #FFF (from 'rgb(0,0,0)' to 'rgb(255,255,255)')
  duration: 1500
});
```

### From > To values

<img src="http://animejs.com/documentation/assets/img/readme/value-from-to.gif" width="332" />

Force the animation to start at a certain value.

```javascript
anime({
  targets: 'div',
  translateX: [100, 200], // Translate X from 100 to 200
  rotate: ['.5turn', '1turn'], // Rotate from 180deg to 360deg
  scale: ['*=2', 1], // Scale from 2 times the original value to 1,
  backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
  duration: 1500
});
```

➜ [Specific initial value example](http://animejs.com/documentation/#specificInitialValue)

### Function based values

<img src="http://animejs.com/documentation/assets/img/readme/value-fb.gif" width="332" />

Same as [function based property parameters](#function-based-property-parameters).<br>
Get different values for every target of the animation.<br>
The function accepts 3 arguments: `target`, `index`, `targetsLength`.

```javascript
anime({
  targets: 'div',
  translateX: function(el) {
    return el.getAttribute('data-x');
  },
  translateY: function(el, i) {
    return 50 + (-50 * i);
  },
  scale: function(el, i, l) {
    return (l - i) + .25;
  },
  rotate: function() { return anime.random(-360, 360); },
  duration: function() { return anime.random(800, 1600); },
  delay: function() { return anime.random(0, 1000); }
});
```

➜ [Function based value example](http://animejs.com/documentation/#functionBasedPropVal)

### Keyframes

<img src="http://animejs.com/documentation/assets/img/readme/value-keyframes.gif" width="332" />

Keyframes are defined using an `Array` of property Object.<br>
Instance's `duration` is divided by the number of keyframes of each properties if not specified.

```javascript
anime({
  targets: 'div',
  translateX: [
    { value: 250, duration: 1000, delay: 500, elasticity: 0 },
    { value: 0, duration: 1000, delay: 500, elasticity: 0 }
  ],
  translateY: [
    { value: -40, duration: 500, elasticity: 100 },
    { value: 40, duration: 500, delay: 1000, elasticity: 100 },
    { value: 0, duration: 500, delay: 1000, elasticity: 100 }
  ],
  scaleX: [
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900, elasticity: 300 },
    { value: 4, duration: 100, delay: 500, easing: 'easeOutExpo' },
    { value: 1, duration: 900, elasticity: 300 }
  ],
  scaleY: [
    { value: [1.75, 1], duration: 500 },
    { value: 2, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 },
    { value: 1.75, duration: 50, delay: 1000, easing: 'easeOutExpo' },
    { value: 1, duration: 450 }
  ]
});
```

➜ [Specific keyframes properties example](http://animejs.com/documentation/#keyframes)

## Timeline

### Basic timeline

<img src="http://animejs.com/documentation/assets/img/readme/timeline.gif" width="332" />

Play animations in sequence by creating a timeline:

```javascript
var myTimeline = anime.timeline();
```

A timeline accepts the same parameters as an animation: `direction`, `loop` and `autoplay`.

```javascript
var myTimeline = anime.timeline({
  direction: 'alternate',
  loop: 3,
  autoplay: false
});
```

Add animations to the timeline with `.add()` :

```javascript
myTimeline
  .add({
    targets: '.square',
    translateX: 250
  })
  .add({
    targets: '.circle',
    translateX: 250
  })
  .add({
    targets: '.triangle',
    translateX: 250
  });
```

Access timeline children animations with `myTimeline.children`

➜ [Basic timeline example](http://animejs.com/documentation/#basicTimeline)

### Timeline animations offsets

`offset` defines the starting time of an animation on the timeline.

#### Relative offset

<img src="http://animejs.com/documentation/assets/img/readme/timeline-relative.gif" width="332" />

Defines starting time relative to the previous animations duration.

| Types | Examples | Infos
| --- | --- | ---
| `+=` | `'+=100'` | Starts 100ms after the previous animation ends
| `-=` | `'-=100'` | Starts 100ms before the previous animation ends
| `*=` | `'*=2'` | Starts at 2 times the previous animations duration

```javascript
myTimeline
  .add({
    targets: '.square',
    translateX: 250
  })
  .add({
    targets: '.circle',
    translateX: 250,
    offset: '-=600' // Starts 600ms before the previous animation ends
  })
  .add({
    targets: '.triangle',
    translateX: 250,
    offset: '-=800' // Starts 800ms before the previous animation ends
  });
```

➜ [Relative offset example](http://animejs.com/documentation/#relativeOffset)

#### Absolute offset

<img src="http://animejs.com/documentation/assets/img/readme/timeline-absolute.gif" width="332" />

Defines an absolute starting time on the timeline with a number.

```javascript
myTimeline
  .add({
    targets: '.square',
    translateX: 250,
    offset: 1000 // Starts at 1000ms
  })
  .add({
    targets: '.circle',
    translateX: 250,
    offset: 500 // Starts at 500ms
  })
  .add({
    targets: '.triangle',
    translateX: 250,
    offset: 0 // Starts at 0ms
  });
```

➜ [Absolute offset example](http://animejs.com/documentation/absoluteOffset)

## Playback controls

Play, pause, restart, seek animations or timelines.

### Play / Pause

<img src="http://animejs.com/documentation/assets/img/readme/playback-play-pause.gif" width="332" />

```javascript
var playPauseAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  autoplay: false // prevent the instance from playing
});

playPauseAnim.play(); //  Manually play
playPauseAnim.pause(); //  Manually pause
```

➜ [Play / Pause example](http://animejs.com/documentation/#playPause)

### Restart

<img src="http://animejs.com/documentation/assets/img/readme/playback-restart.gif" width="332" />

```javascript
var restartAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true,
  autoplay: false
});

restartAnim.restart(); // Restart the animation and reset the loop count / current direction
```

➜ [Restart example](http://animejs.com/documentation/#restartAnim)

### Reverse

<img src="http://animejs.com/documentation/assets/img/readme/playback-reverse.gif" width="332" />

```javascript
var reverseAnim = anime({
  targets: 'div',
  translateX: 250,
  direction: 'alternate',
  loop: true
});

reverseAnim.reverse(); // Change the animation direction
```

➜ [Reverse example](http://animejs.com/documentation/#reverseAnim)

### Seek

<img src="http://animejs.com/documentation/assets/img/readme/playback-seek.gif" width="332" />

Change animations or timelines current time.

```javascript
var seekAnim = anime({
  targets: 'div',
  translateX: 250,
  delay: function(el, i, l) { return i * 100; },
  elasticity: 200,
  autoplay: false
});

seekAnim.seek(500); // Set the animation current time to 500ms
```

➜ [Seek example](http://animejs.com/documentation/#seekAnim)

## Callbacks

<img src="http://animejs.com/documentation/assets/img/readme/callbacks-all.gif" width="332" />

Execute a function at the beginning, during or when an animation or timeline is completed.

| Names | Types | Arguments | Info
| --- | --- | --- | ---
| update | `function`| animation `Object` | Called at time = 0
| begin | `function` | animation `Object` | Called after animation delay is over
| complete | `function` | animation `Object` | Called only after all the loops are completed

➜ [Callbacks examples](http://animejs.com/documentation/#allCallbacks)

### Update

`update()` is called on every frame while the instance is playing.

```javascript
var myAnimation = anime({
  targets: '#update .el',
  translateX: 250,
  delay: 1000,
  update: function(anim) {
    console.log(anim.currentTime + 'ms'); // Get current animation time with `myAnimation.currentTime`, return value in ms.
    console.log(anim.progress + '%'); // Get current animation progress with `myAnimation.progress`, return value in %
  }
});
```

➜ [Update example](http://animejs.com/documentation/#update)

### Begin

`begin()` is called once after the delay is finished.

```javascript
var myAnimation = anime({
  targets: '#begin .el',
  translateX: 250,
  delay: 1000,
  begin: function(anim) {
    console.log(anim.began); // true after 1000ms
  }
});
```

Check if the animation has begun with `myAnimation.began`, return `true` or `false`.

➜ [Begin example](http://animejs.com/documentation/#begin)

### Run

`run()` is called every frame after the delay is finished.

```javascript
var myAnimation = anime({
  targets: '#run .el',
  translateX: 250,
  delay: 1000,
  run: function(anim) {
    console.log(anim.currentTime);
  }
});
```

➜ [Run example](http://animejs.com/documentation/#run)

### Complete

`complete()` is called once after the animation is finished.

```javascript
var myAnimation = anime({
  targets: '#complete .el',
  translateX: 250,
  complete: function(anim) {
    console.log(anim.completed);
  }
});
```

Check if the animation has finished with `myAnimation.completed`, return `true` or `false`.

➜ [Complete example](http://animejs.com/documentation/#complete)

## Promises

`myAnimation.finished` returns a Promise object which will resolve once the animation has finished running.

➜ [Promises example](http://animejs.com/documentation/#finishedPromise)

## SVG

### Motion path

<img src="http://animejs.com/documentation/assets/img/readme/svg-motion-path.gif" width="332" />

Translate and rotate DOM elements along an SVG path:

```javascript
// Create a path `Object`
var path = anime.path('#motionPath path');

var motionPath = anime({
  targets: '#motionPath .el',
  translateX: path('x'), // Follow the x values from the path `Object`
  translateY: path('y'), // Follow the y values from the path `Object`
  rotate: path('angle')  // Follow the angle values from the path `Object`
});
```

➜ [Motion path example](http://animejs.com/documentation/#motionPath)

### Morphing

<img src="http://animejs.com/documentation/assets/img/readme/svg-morphing.gif" width="332" />

Animate the transition between two SVG shapes:

```html
<svg class="shape" width="128" height="128" viewBox="0 0 128 128">
  <polygon points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100"></polygon>
</svg>
```

```javascript
var svgAttributes = anime({
  targets: '.shape polygon',
  points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96'
});
```

Shapes need to have the same number of points.

➜ [Morphing example](http://animejs.com/documentation/#morphing)

### Line drawing

<img src="http://animejs.com/documentation/assets/img/readme/svg-line-drawing.gif" width="332" />

Line drawing animation of an SVG shape:

```javascript
anime({
  targets: '.shape path',
  strokeDashoffset: [anime.setDashoffset, 0]
});
```

➜ [Line drawing example](http://animejs.com/documentation/#lineDrawing)

## Easing functions

The `easing` parameter can accept either a string or a custom Bézier curve coordinates (array).

| Types | Examples | Infos
| --- | --- | ---
| String | `'easeOutExpo'` | Built in function names
| `Array` | [.91,-0.54,.29,1.56] | Custom Bézier curve coordinates ([x1, y1, x2, y2])

### Built in functions

Linear easing: `'linear'`

Penner's equations:

| easeIn | easeOut | easeInOut
| --- | --- | ---
| easeInQuad | easeOutQuad | easeInOutQuad |
| easeInCubic | easeOutCubic | easeInOutCubic
| easeInQuart | easeOutQuart | easeInOutQuart
| easeInQuint | easeOutQuint | easeInOutQuint
| easeInSine | easeOutSine | easeInOutSine
| easeInExpo | easeOutExpo | easeInOutExpo
| easeInCirc | easeOutCirc | easeInOutCirc
| easeInBack | easeOutBack | easeInOutBack
| easeInElastic | easeOutElastic | easeInOutElastic

➜ [Built in easing functions examples](http://animejs.com/documentation/#penner)

Usage:

```javascript
anime({
  targets: 'div',
  translateX: 100,
  easing: 'easeOutExpo' // Default 'easeOutElastic'
});
```

Elasticity of Elastic easings can be configured with the `elasticity` parameters:

```javascript
anime({
  targets: 'div',
  translateX: 100,
  easing: 'easeOutElastic',
  elasticity: 600 // Default 500, range [0-1000]
});
```

➜ [Elasticity examples](http://animejs.com/documentation/#elasticity)

### Custom Bézier curves

Define a Bézier curve with an `Array` of 4 coordinates:

```javascript
anime({
  targets: 'div',
  translateX: 100,
  easing: [.91,-0.54,.29,1.56]
});
```

Custom Bézier curves coordinates can be generated here <https://matthewlein.com/ceaser/>

➜ [Custom Bézier curves example](http://animejs.com/documentation/#customBezier)

### Defining custom functions

Expand the built in easing functions from `anime.easings`.

```javascript
// Add custom function
anime.easings['myCustomEasingName'] = function(t) {
  return Math.pow(Math.sin(t * 3), 3);
}

// Usage
anime({
  targets: 'div',
  translateX: 100,
  easing: 'myCustomEasingName'
});

// add custom Bézier curve function
anime.easings['myCustomCurve'] = anime.bezier([.91,-0.54,.29,1.56]);

// Usage
anime({
  targets: 'div',
  translateX: 100,
  easing: 'myCustomCurve'
});
```

➜ [Custom easing functions example](http://animejs.com/documentation/#customEasingFunction)

## Helpers

### anime.speed = x

Change all animations speed (from 0 to 1).

```javascript
anime.speed = .5; // Slow down all animations by half of their original speed
```

### anime.running

Return an `Array` of all active Anime instances.

```javascript
anime.running;
```

### anime.remove(target)

Remove one or multiple targets from the animation.

```javascript
anime.remove('.item-2'); // Remove all elements with the class 'item-2'
```

### anime.getValue(target, property)

Get current valid value from an element.

```javascript
anime.getValue('div', 'translateX'); // Return '100px'
```

### anime.path(pathEl)

Create a path Function for motion path animation.<br>
Accepts either a DOM node or CSS selector.

```javascript
var path = anime.path('svg path', 'translateX'); // Return path(attribute)
```

➜ [Motion path example](http://animejs.com/documentation/#motionPath)

### anime.setDashoffset(pathEl)

An helper for line drawing animation.<br>
Sets the 'stroke-dasharray' to the total path length and return its value.

```javascript
anime({
  targets: '.shape path',
  strokeDashoffset: [anime.pathDashoffset, 0]
});
```

➜ [Line drawing example](http://animejs.com/documentation/#lineDrawing)

### anime.easings

Return the complete list of built in easing functions

```javascript
anime.easings;
```

### anime.bezier(x1, x2, y1, y2)

Return a custom Bézier curve easing function

```javascript
anime.bezier(x1, x2, y1, y2); // Return function(t)
```

### anime.timeline()

Create a timeline to synchronise other Anime instances.

```javascript
var timeline = anime.timeline();
timeline.add([instance1, instance2, ...]);
```

➜ [Timeline examples](http://animejs.com/documentation/#basicTimeline)

### anime.random(x, y)

Generate a random number between two numbers.

```javascript
anime.random(10, 40); // Will return a random number between 10 and 40
```

====

[MIT License](LICENSE.md). © 2017 [Julian Garnier](http://juliangarnier.com).

Thanks to [Animate Plus](https://github.com/bendc/animateplus) and [Velocity](https://github.com/julianshapiro/velocity) that inspired `anime.js` API, [BezierEasing](https://github.com/gre/bezier-easing) and [jQuery UI](https://jqueryui.com/) for the easing system. [Tim Branyen](https://github.com/tbranyen) For the Promise implementation.

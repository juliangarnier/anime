<h1 align="center">
  <a href="https://animejs.com"><img src="/documentation/assets/img/animejs-v3-header-animation.gif" width="250"/></a>
  <br>
  anime.js
</h1>

<h4 align="center">JavaScript animation engine | <a href="https://animejs.com" target="_blank">animejs.com</a></h4>

<p align="center">
  <a href="https://www.npmjs.com/package/animejs" rel="nofollow"><img src="https://camo.githubusercontent.com/011820ee25bf1d3ddaf635d869903b98eccaeae7/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f762f616e696d656a732e7376673f7374796c653d666c61742d737175617265" alt="npm version" data-canonical-src="https://img.shields.io/npm/v/animejs.svg?style=flat-square" style="max-width:100%;"></a>
  <a href="https://www.npmjs.com/package/animejs" rel="nofollow"><img src="https://camo.githubusercontent.com/3e9b69d51aee25fad784a3097676696096621d47/68747470733a2f2f696d672e736869656c64732e696f2f6e706d2f646d2f616e696d656a732e7376673f7374796c653d666c61742d737175617265" alt="npm downloads" data-canonical-src="https://img.shields.io/npm/dm/animejs.svg?style=flat-square" style="max-width:100%;"></a>
</p>

<blockquote align="center">
  <em>Anime.js</em> (<code>/ˈæn.ə.meɪ/</code>) is a lightweight JavaScript animation library with a simple, yet powerful API.<br>
  It works with CSS properties, SVG, DOM attributes and JavaScript Objects.
</blockquote>

<p align="center">
  <a href="#getting-started">Getting started</a>&nbsp;|&nbsp;<a href="#documentation">Documentation</a>&nbsp;|&nbsp;<a href="#demos-and-examples">Demos and examples</a>&nbsp;|&nbsp;<a href="#browser-support">Browser support</a>
</p>

## Getting started

### Download

Via npm

```bash
$ npm install animejs --save
```

or manual [download](https://github.com/juliangarnier/anime/archive/master.zip).

### Usage

#### ES6 modules

```javascript
import anime from 'lib/anime.es.js';
```

#### CommonJS

```javascript
const anime = require('lib/anime.js');
```

#### File include

Link `anime.min.js` in your HTML :

```html
<script src="anime.min.js"></script>
```

### Hello world

```javascript
anime({
  targets: 'div',
  translateX: 250,
  rotate: '1turn',
  backgroundColor: '#FFF',
  duration: 800
});
```

## [Documentation](https://animejs.com/documentation/)

* [Targets](https://animejs.com/documentation/#cssSelector)
* [Properties](https://animejs.com/documentation/#cssProperties)
* [Property parameters](https://animejs.com/documentation/#duration)
* [Animation parameters](https://animejs.com/documentation/#direction)
* [Values](https://animejs.com/documentation/#unitlessValue)
* [Keyframes](https://animejs.com/documentation/#animationKeyframes)
* [Stagering](https://animejs.com/documentation/#staggeringBasics)
* [Timeline](https://animejs.com/documentation/#timelineBasics)
* [Controls](https://animejs.com/documentation/#playPause)
* [Callbacks and promises](https://animejs.com/documentation/#update)
* [SVG Animations](https://animejs.com/documentation/#motionPath)
* [Easing functions](https://animejs.com/documentation/#linearEasing)
* [Helpers](https://animejs.com/documentation/#remove)

## [Demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)

* [CodePen demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/)
* [juliangarnier.com](http://juliangarnier.com)
* [animejs.com](https://animejs.com)
* [Moving letters](http://tobiasahlin.com/moving-letters/) by [@tobiasahlin](https://twitter.com/tobiasahlin)
* [Gradient topography animation](https://tympanus.net/Development/GradientTopographyAnimation/) by [@crnacura](https://twitter.com/crnacura)
* [Organic shape animations](https://tympanus.net/Development/OrganicShapeAnimations/) by [@crnacura](https://twitter.com/crnacura)
* [Pieces slider](https://tympanus.net/Tutorials/PiecesSlider/) by [@lmgonzalves](https://twitter.com/lmgonzalves)
* [Staggering animations](https://codepen.io/juliangarnier/pen/4fe31bbe8579a256e828cd4d48c86182?editors=0100)
* [Easings animations](https://codepen.io/juliangarnier/pen/444ed909fd5de38e3a77cc6e95fc1884)
* [Sphere animation](https://codepen.io/juliangarnier/pen/b3bb8ca599ad0f9d00dd044e56cbdea5?editors=0010)
* [Layered animations](https://codepen.io/juliangarnier/pen/6ca836535cbea42157d1b8d56d00be84?editors=0010)
* [anime.js logo animation](https://codepen.io/juliangarnier/pen/d43e8ec355c30871cbe775193255d6f6?editors=0010)


## Browser support

| Chrome | Safari | IE / Edge | Firefox | Opera |
| --- | --- | --- | --- | --- |
| 24+ | 8+ | 11+ | 32+ | 15+ |

## <a href="https://animejs.com"><img src="/documentation/assets/img/animejs-v3-logo-animation.gif" width="150" alt="anime-js-v3-logo"/></a>

[Website](https://animejs.com/) | [Documentation](https://animejs.com/documentation/) | [Demos and examples](http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/) | [MIT License](LICENSE.md) | © 2019 [Julian Garnier](http://juliangarnier.com).

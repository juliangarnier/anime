<h1 style="text-align:center;">Foku</h1>
<blockquote style="text-align:center;">
a fork of <strong>animejs@3.2.1</strong> - a lightweight JavaScript library with a simple API, with a few small improvements like animation markers, and some minor bug fixes.
</blockquote>
<p style="text-align:center;">
  <a href="https://animejs.com/">Website</a>&nbsp;|&nbsp;
  <a href="https://animejs.com/documentation/">Documentation</a>&nbsp;|&nbsp;
  <a href="http://codepen.io/collection/b392d3a52d6abf5b8d9fda4e4cab61ab/">Demos and examples</a>&nbsp;|&nbsp;
  <a href="">Upstream repository</a>&nbsp;|&nbsp;
  <a href="https://juliangarnier.com">Julian Garnier (Anime's author)</a>
</p>

### Motivation

The current version of the upstream package - animejs@3.2.1 doesn not seem to be getting any new development presumably because it is fairly stable and because all efforts are focused on rewriting the library for its next major version.

This fork is aimed at introducing small non-breaking bug fixes and imrpovements until they are ported upstream or this project develops into anything bigger.

### Getting started

#### Download

Install npm package :

```bash
npm install --save foku
```

or manually [download](https://github.com/diegolealco/foku/archive/master.zip).

#### Import

###### ES6 modules

```javascript
import foku from "foku";
```

###### CommonJS

```javascript
const foku = require("foku");
```

###### Script tag

```html
<script src="foku.min.js"></script>
```

### Foku-specific features

##### Markers

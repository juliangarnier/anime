# Anime.js  



<p align="center">
  <picture align="center">
    <source media="(prefers-color-scheme: dark)" srcset="./assets/images/animejs-v4-logo-animation-dark.gif">
    <img align="center" alt="Anime.js V4 logo animation" src="./assets/images/animejs-v4-logo-animation.gif" width="560">
  </picture>
</p>

<p align="center">
  <strong>
  <em>Anime.js</em> is a fast, multipurpose and lightweight JavaScript animation library with a simple, yet powerful API.<br>
  It works with CSS properties, SVG, DOM attributes and JavaScript Objects.
  </strong>
</p>


<p align="center">
  <img alt="NPM Downloads" src="https://img.shields.io/npm/dm/animejs?style=flat-square&logo=npm">
  <img alt="jsDelivr hits (npm)" src="https://img.shields.io/jsdelivr/npm/hm/animejs?style=flat-square&logo=jsdeliver">
  <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/juliangarnier?style=flat-square&logo=github">
</p>

## Sponsors

Anime.js is 100% free and is only made possible with the help of our sponsors.
Help the project become sustainable by sponsoring us on <a target="_blank" href="https://github.com/sponsors/juliangarnier">GitHub Sponsors</a>.

### Platinum sponsors

<p>
<a target="_blank" href="https://ice.io/?ref=animejs">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/sponsors/ice-open-network-logomark.png">
    <img align="center" src="./assets/sponsors/ice-open-network-logomark-dark.png" width="250">
  </picture>
</a>
<a target="_blank" href="https://go.warp.dev/anime">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/sponsors/warp-logomark.png">
    <img align="center" src="./assets/sponsors/warp-logomark-dark.png" width="250">
  </picture>
</a>
</p>

### Silver sponsors

<p>
<a target="_blank" href="https://www.lambdatest.com?utm_source=animeJS&utm_medium=organic&utm_campaign=july_08&utm_term=sk&utm_content=opensource">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/sponsors/lambdatest-logomark.png">
    <img align="center" src="./assets/sponsors/lambdatest-logomark-dark.png" width="150">
  </picture>
</a>
<a target="_blank" href="https://inspatialapp.com/?ref=animejs">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./assets/sponsors/inspatial-logomark.png">
    <img align="center" src="./assets/sponsors/inspatial-logomark-dark.png" width="150">
  </picture>
</a>
</p>


## Usage

Anime.js V4 works by importing ES modules like so:


<table>
<tr>
  <td>

```javascript
import {
  animate,
  stagger,
} from 'animejs';

animate('.square', {
  x: 320,
  rotate: { from: -180 },
  duration: 1250,
  delay: stagger(65, { from: 'center' }),
  ease: 'inOutQuint',
  loop: true,
  alternate: true
});
```

  </td>
  <td>
    <img align="center" alt="Anime.js code example" src="./assets/images/usage-example-result.gif">
  </td>
</tr>
</table>

## V4 Documentation

The full documentation is available [here](https://animejs.com/documentation).

## V3 Migration guide

You can find the v3 to v4 migration guide [here](https://github.com/juliangarnier/anime/wiki/Migrating-from-v3-to-v4).

## NPM development scripts

First, run `npm i` to install all the necessary packages.
Then, execute the following scripts with `npm run <script>`.

| script | action |
| ------ | ------ |
| `dev` | Watches for changes in `src/**/*.js`, bundles the ESM version to `lib/` and creates type declarations in `types/` |
| `dev:test` | Runs `dev` and `test:browser` concurrently |
| `build` | Bundles ESM / UMD / CJS / IIFE versions to `lib/` and creates type declarations in `types/` |
| `test:browser` | Starts a local server and runs all browser-related tests |
| `test:node` | Starts Node-related tests |
| `open:examples` | Starts a local server to browse the examples locally |

© [Julian Garnier](http://juliangarnier.com) | [MIT License](LICENSE.md)

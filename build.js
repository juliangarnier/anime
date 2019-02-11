const fs = require('fs');
const { rollup } = require('rollup');
const { minify } = require('uglify-js');
const pretty = require('pretty-bytes');
const sizer = require('gzip-size');
const pkg = require('./package');

const umd = pkg['umd:main'];
const date = new Date();

const banner = `/*
 * anime.js v${ pkg.version }
 * (c) ${ date.getFullYear() } Julian Garnier
 * Released under the MIT license
 * animejs.com
 */
`;

console.info('Compiling... 😤');

rollup({
  input: 'src/index.js',
  plugins: [
    require('rollup-plugin-buble')({
      transforms: {
        modules: false,
        dangerousForOf: true
      },
      targets: {
        firefox: 32,
        chrome: 24,
        safari: 6,
        opera: 15,
        edge: 10,
        ie: 10
      }
    })
  ]
}).then(bun => {
  bun.write({
    banner,
    format: 'cjs',
    file: pkg.main
  });

  bun.write({
    banner,
    format: 'es',
    file: pkg.module
  });

  bun.write({
    banner,
    file: umd,
    format: 'umd',
    name: pkg['umd:name']
  }).then(_ => {
    const data = fs.readFileSync(umd, 'utf8');

    // produce minified output
    const { code } = minify(data);
    fs.writeFileSync(umd, `${banner}\n${code}`); // with banner

    // output gzip size
    const int = sizer.sync(code);
    console.info('Compilation was a success! 👍');
    console.info(`~> gzip size: ${ pretty(int) }`);
  }).catch(console.error);
}).catch(console.error);

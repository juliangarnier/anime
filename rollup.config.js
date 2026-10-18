import terser from '@rollup/plugin-terser';
import fs from 'fs';

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

const banner = (format, content = '') => chunk => {
  const date = new Date();
  const moduleName = chunk.fileName.split('/')[0] || '';
  return `/**
 * Anime.js${ moduleName.includes('.') ? '' : ' - ' + moduleName } - ${ format }
 * @version v${ pkg.version }
 * @license MIT
 * @copyright ${ date.getFullYear() } - Julian Garnier
 */${content}
`
}

const replace = (rgx, string = '') => {
  return {
    name: 'replace',
    generateBundle(_, bundle) {
      Object.keys(bundle).forEach((fileName) => {
        const file = bundle[fileName];
        let code = file.code;
        code = code.replace(rgx, string);
        file.code = code;
      });
    }
  }
}

const updatePackageVersion = replace(/__packageVersion__/g, pkg.version);

// Extracts module input paths from the package.json 'exports' field
const inputs = Object.keys(pkg.exports).filter(k => k !== './package.json').map(k => `src${k.replace('.', '')}/index.js`);

console.log(inputs);

const tasks = [{
  input: inputs,
  external: ['three'],
  output: [
    {
      dir: 'dist/modules/',
      format: 'esm',
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner: banner('ESM'),
    },
    {
      dir: 'dist/modules/',
      format: 'cjs',
      entryFileNames: '[name].cjs',
      preserveModules: true,
      preserveModulesRoot: 'src',
      banner: banner('CJS'),
    }
  ],
  plugins: [updatePackageVersion],
}];

if (process.env.build) {

  // Gets global JSDoc type definitions from src/types to be inserted in the banner of the bundles after tree shaking
  const JSDocTypes = fs.readFileSync('./src/types/index.js', 'utf-8').split('// Exported types')[1];

  // Removes comments containing JSDoc @import tags to avoid duplicated type definitions in bundles
  const cleanupJSDocImports = replace(/\/\*\*(?:(?!\*\/|\/\*\*)[\s\S])*?@import(?:(?!\*\/|\/\*\*)[\s\S])*?\*\//g);

  const minify = terser({
    compress: { passes: 10, module: false },
    mangle: true,
  });

  tasks.push({
    input: 'src/index.js',
    output: [
      { file: 'dist/bundles/anime.esm.js', format: 'esm', name: 'anime', banner: banner('ESM bundle', JSDocTypes) },
      { file: 'dist/bundles/anime.umd.js', format: 'umd', name: 'anime', banner: banner('UMD bundle', JSDocTypes) }
    ],
    plugins: [updatePackageVersion, cleanupJSDocImports]
  });

  tasks.push({
    input: 'src/index.js',
    output: [
      { file: 'dist/bundles/anime.esm.min.js', format: 'esm', name: 'anime', banner: banner('ESM minified bundle') },
      { file: 'dist/bundles/anime.umd.min.js', format: 'umd', name: 'anime', banner: banner('UMD minified bundle') }
    ],
    plugins: [updatePackageVersion, minify]
  });

}

export default tasks;

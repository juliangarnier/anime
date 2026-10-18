import {
  expect,
} from '../utils.js';

import * as esmModules from '../../dist/modules/index.js';
import * as esmBundle from '../../dist/bundles/anime.esm.js';
import * as minifiedEsmBundle from '../../dist/bundles/anime.esm.min.js';

const apiExports = [
  'animate',
  'createTimer',
  'createTimeline',
  'createAnimatable',
  'createDraggable',
  'createScope',
  'createSpring',
  'onScroll',
  'engine',
  'easings',
  'utils', 'stagger',
  'svg', 'createDrawable', 'createMotionPath', 'morphTo',
  'text', 'splitText', 'split',
  'waapi',
]

suite('Build', () => {

  test('ESM modules exports', () => {
    apiExports.forEach(exportName => {
      expect(esmModules[exportName]).to.exist;
    });
  });

  test('ESM bundle exports', () => {
    apiExports.forEach(exportName => {
      expect(esmBundle[exportName]).to.exist;
    })
  });

  test('ESM bundle minified exports', () => {
    apiExports.forEach(exportName => {
      expect(minifiedEsmBundle[exportName]).to.exist;
    })
  });

  test('UMD bundle exports', () => {
    apiExports.forEach(exportName => {
      expect(window.anime[exportName]).to.exist;
    })
  });

  test('ESM sub modules exports', resolve => {
    fetch('../../../package.json')
      .then((response) => response.json())
      .then((data) => {
        const inputs = Object.keys(data.exports)
          .filter(k => k !== './package.json')
          .map(k => `../../../dist/modules${k.replace('.', '')}/index.js`);

        const fetchPromises = inputs.map(path =>
          fetch(path)
            .then((response) => {
              expect(response.ok).to.equal(true, `Failed to fetch ${path}`);
              return response.text();
            })
            .then((content) => {
              expect(content).to.exist;
              expect(content).to.not.be.empty;
              const hasExport = content.includes('export');
              expect(hasExport).to.equal(true, `Module at ${path} has no exports`);
              return { path, success: true };
            })
            .catch((error) => {
              throw new Error(`Error loading module ${path}: ${error.message}`);
            })
        );
        return Promise.all(fetchPromises);
      })
      .then((results) => {
        expect(results).to.have.length.greaterThan(0);
        resolve();
      })
      .catch((error) => {
        resolve(error);
      });
  });

  test('CJS sub modules exports', resolve => {
    fetch('../../../package.json')
      .then((response) => response.json())
      .then((data) => {
        const inputs = Object.keys(data.exports)
          .filter(k => k !== './package.json')
          .map(k => `../../../dist/modules${k.replace('.', '')}/index.cjs`);

        const fetchPromises = inputs.map(path =>
          fetch(path)
            .then((response) => {
              expect(response.ok).to.equal(true, `Failed to fetch ${path}`);
              return response.text();
            })
            .then((content) => {
              expect(content).to.exist;
              expect(content).to.not.be.empty;
              const hasExport = content.includes('exports.');
              expect(hasExport).to.equal(true, `Module at ${path} has no exports`);
              return { path, success: true };
            })
            .catch((error) => {
              throw new Error(`Error loading module ${path}: ${error.message}`);
            })
        );
        return Promise.all(fetchPromises);
      })
      .then((results) => {
        expect(results).to.have.length.greaterThan(0);
        resolve();
      })
      .catch((error) => {
        resolve(error);
      });
  });

  test('Package version', () => {
    window.AnimeJS.forEach(instance => {
      expect(instance.version).to.not.equal('__packageVersion__');
    })
  });

});

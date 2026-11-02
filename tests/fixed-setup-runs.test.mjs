import assert from 'node:assert/strict';
import test from 'node:test';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { options, sizeWork } from './benchmark-browser-pipeline.mjs';

test('Setup sizing remains adaptive by default for a heavy construction', () => {
  const config = options(['--setup-runs', '20']);
  assert.equal(config['fixed-setup-runs'], false);
  assert.deepEqual(sizeWork({ constructionMs: 32, seekMs: .5 }, config), { setupRuns: 5, iterations: 100 });
});

test('Fixed setup sizing executes all twenty configured constructions despite cost', () => {
  const config = options(['--fixed-setup-runs', '--setup-runs', '20']);
  assert.equal(config['fixed-setup-runs'], true);
  assert.deepEqual(sizeWork({ constructionMs: 32, seekMs: .5 }, config), { setupRuns: 20, iterations: 100 });
});

test('A fixed one-construction control leaves update sizing unchanged', () => {
  const config = options(['--fixed-setup-runs', '--setup-runs', '1']);
  assert.deepEqual(sizeWork({ constructionMs: 400, seekMs: 0 }, config), { setupRuns: 1, iterations: 0 });
});

test('CLI help explains exact setup counts', () => {
  const command = fileURLToPath(new URL('./benchmark-browser-pipeline.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [command, '--help'], { encoding: 'utf8' });
  assert.match(output, /--fixed-setup-runs\s+Use the exact --setup-runs count/);
});

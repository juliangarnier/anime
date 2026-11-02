import { spawn } from 'node:child_process';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { options } from './benchmark-browser-pipeline.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
// Reject invalid benchmark options before starting the longer test suites.
options(args);
if (args.includes('--help')) {
  console.log('Usage: npm test -- [benchmark options]\nRuns build, source/types, Node, browser, and performance checks. See tests/README.md.');
  process.exit(0);
}

const results = [];

async function run(name, command, args, env = {}) {
  console.log(`\n--- ${name} ---`);
  const code = await new Promise(resolve => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', env: { ...process.env, ...env } });
    child.on('error', error => { console.error(error.message); resolve(1); });
    child.on('exit', code => resolve(code ?? 1));
  });
  results.push({ name, passed: code === 0 });
  return code === 0;
}

const node = process.execPath;
const tsc = 'node_modules/typescript/bin/tsc';
const built = await run('Build modules and bundles', node, ['node_modules/rollup/dist/bin/rollup', '-c'], { build: 'true' });
const typed = await run('Generate declarations', node, [tsc, '-p', 'tsconfig.types.json']);
await run('Source types', node, [tsc, '-p', '.']);
await run('Test and playground types', node, [tsc, '-p', 'tests']);
await run('Example types', node, [tsc, '-p', 'examples']);
await run('Benchmark tooling', node, ['--test', 'tests/benchmark.test.mjs', 'tests/fixed-setup-runs.test.mjs']);
await run('Source pipeline and scheduling', node, ['--test', 'tests/node/pipeline.test.mjs', 'tests/node/contracts.test.mjs', 'tests/node/engine-scheduler.test.mjs'], { ANIME_TEST_SRC: resolve(root, 'src') });
if (built && typed) {
  await run('Built pipeline and scheduling', node, ['--test', 'tests/node/pipeline.test.mjs', 'tests/node/contracts.test.mjs', 'tests/node/engine-scheduler.test.mjs'], { ANIME_TEST_SRC: resolve(root, 'dist/modules') });
  for (const strict of [false, true]) {
    await run(`Consumer types${strict ? ' (strict)' : ''}`, node, [tsc, '--noEmit', '--module', 'esnext',
      '--moduleResolution', 'bundler', '--target', 'esnext', 'tests/api-types.ts', ...(strict ? ['--strict'] : [])]);
  }
  await run('Node behavior and V8 optimization', node, ['--allow-natives-syntax', 'node_modules/mocha/bin/mocha.js',
    '-u', 'tdd', '--timeout', '20000', './tests/suites/node.test.js']);
  await run('Full browser suite', node, ['tests/headless-runner.mjs']);
  // The stage runs after the build, so it compares the built modules with the built baseline unless told otherwise.
  const candidate = args.some(arg => arg === '--candidate' || arg.startsWith('--candidate=')) ? [] : ['--candidate', 'dist/modules'];
  await run('Browser performance comparison', node, ['tests/benchmark-browser-pipeline.mjs', ...args, ...candidate]);
} else {
  console.error('Built-code checks blocked: build or declaration generation failed. Stale output will not be tested.');
}
console.log('\nFull suite summary:');
for (const result of results) console.log(`${result.passed ? 'PASS' : 'FAIL'} ${result.name}`);
process.exitCode = results.every(r => r.passed) ? 0 : 1;

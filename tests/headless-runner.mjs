// Headless acceptance runner: runs the full browser mocha suite (tests/index.html) in headless
// Chrome and reports pass/fail with a CI-friendly exit code. Used to verify behavior is unchanged.
//
//   npm run test:headless                 # uses an installed Chrome (channel: 'chrome')
//   CHROME_BIN=/path/to/chrome npm run test:headless
//
// Requires a local Chrome/Chromium (puppeteer-core does not bundle one).

import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const MIME = { '.js': 'text/javascript', '.mjs': 'text/javascript', '.html': 'text/html', '.css': 'text/css',
  '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.map': 'application/json' };

// Serve the repo; rewrite the three CDN importmap to local files (same-origin, no network/CORS).
const server = http.createServer(async (req, res) => {
  try {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let data = await readFile(ROOT + url);
    if (url === '/tests/index.html') {
      data = Buffer.from(String(data).replaceAll(/https:\/\/unpkg\.com\/three@[^/]+\/build\//g, '/node_modules/three/build/'));
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(url)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('404 ' + req.url); }
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--use-gl=angle', '--ignore-gpu-blocklist'],
  ...(process.env.CHROME_BIN ? { executablePath: process.env.CHROME_BIN } : { channel: 'chrome' }) });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(e.message));

try {
  await page.goto(`http://localhost:${port}/tests/index.html`, { waitUntil: 'load', timeout: 90000 });
  // A quiet test is not a finished test. Wait for Mocha's actual end state.
  let timeout;
  const s = await Promise.race([
    page.evaluate(async () => {
      const { runner } = await import('/tests/run.js');
      return new Promise(resolve => {
        const finish = () => resolve({ ...runner.stats, total: runner.total });
        if (runner.stats.end) finish();
        else runner.once('end', finish);
      });
    }),
    new Promise((_, reject) => {
      timeout = setTimeout(() => reject(new Error('Mocha did not finish within 90 seconds')), 90000);
    }),
  ]).finally(() => clearTimeout(timeout));
  const fails = await page.evaluate(() => [...document.querySelectorAll('#mocha .test.fail')].map(t => ({
    title: (t.querySelector('h2')?.textContent || '').trim(),
    err: (t.querySelector('.error')?.textContent || '').split('\n')[0].trim(),
  })));

  console.log(`\nMocha: ${s.passes} passing, ${s.failures} failing (${s.tests}/${s.total} tests finished)`);
  for (const f of fails.slice(0, 40)) console.log(`  ✗ ${f.title}\n      ${f.err}`);
  if (pageErrors.length) console.log(`\npage errors: ${[...new Set(pageErrors)].slice(0, 5).join(' | ')}`);
  process.exitCode = s.tests > 0 && s.tests === s.total && s.failures === 0 && !pageErrors.length ? 0 : 1;
} finally {
  await browser.close();
  server.close();
}

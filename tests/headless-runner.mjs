// Headless acceptance runner: runs the full browser mocha suite (tests/index.html) in headless
// Chrome and reports pass/fail with a CI-friendly exit code. Used to verify behavior is unchanged.
//
//   npm run test:headless                 # uses an installed Chrome (channel: 'chrome')
//   CHROME_BIN=/path/to/chrome npm run test:headless
//
// Requires a local Chrome/Chromium (puppeteer-core does not bundle one).

import http from 'http';
import { readFile } from 'fs/promises';
import { extname, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
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
      data = Buffer.from(String(data).replaceAll('https://unpkg.com/three@0.184.0/build/', '/node_modules/three/build/'));
    }
    res.writeHead(200, { 'Content-Type': MIME[extname(url)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  } catch { res.writeHead(404); res.end('404 ' + req.url); }
});
await new Promise(r => server.listen(0, r));
const port = server.address().port;

async function launch() {
  const args = ['--no-sandbox', '--use-gl=angle', '--ignore-gpu-blocklist'];
  if (process.env.CHROME_BIN) return puppeteer.launch({ headless: 'new', args, executablePath: process.env.CHROME_BIN });
  try { return await puppeteer.launch({ headless: 'new', args, channel: 'chrome' }); }
  catch { return puppeteer.launch({ headless: 'new', args, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' }); }
}

const browser = await launch();
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 900 });
const pageErrors = [];
page.on('pageerror', e => pageErrors.push(e.message));

await page.goto(`http://localhost:${port}/tests/index.html`, { waitUntil: 'load', timeout: 90000 });

// Poll mocha's stats until they stop changing (suite finished).
const stat = () => page.evaluate(() => {
  const num = (sel) => { const el = document.querySelector(sel); return el ? +el.textContent : -1; };
  return { passes: num('#mocha-stats .passes em'), failures: num('#mocha-stats .failures em'),
    tests: document.querySelectorAll('#mocha .test').length };
});
let last = '', stable = 0, start = Date.now();
while (stable < 4 && Date.now() - start < 90000) {
  await new Promise(r => setTimeout(r, 500));
  const s = await stat();
  const key = `${s.passes}/${s.failures}/${s.tests}`;
  if (s.tests > 0 && key === last) stable++; else { stable = 0; last = key; }
}
const s = await stat();
const fails = await page.evaluate(() => [...document.querySelectorAll('#mocha .test.fail')].map(t => ({
  title: (t.querySelector('h2')?.textContent || '').trim(),
  err: (t.querySelector('.error')?.textContent || '').split('\n')[0].trim(),
})));

console.log(`\nMocha: ${s.passes} passing, ${s.failures} failing (${s.tests} tests)`);
for (const f of fails.slice(0, 40)) console.log(`  ✗ ${f.title}\n      ${f.err}`);

await browser.close();
server.close();
const ok = s.tests > 0 && s.failures === 0;
if (!ok && pageErrors.length) console.log(`\npage errors: ${[...new Set(pageErrors)].slice(0, 5).join(' | ')}`);
process.exit(ok ? 0 : 1);

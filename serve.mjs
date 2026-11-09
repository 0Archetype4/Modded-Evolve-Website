/*
 * Zero-dependency local preview server.
 *
 *   node serve.mjs            http://localhost:8080
 *   node serve.mjs 3000       custom port
 *   set PORT=3000 && node serve.mjs   (PowerShell: $env:PORT=3000)
 *   node serve.mjs --no-watch disable auto-rebuild
 *
 * Watches src/ and assets/ and rebuilds index.html on save.
 */
import { createServer } from 'node:http';
import { createReadStream, existsSync, watch } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from './build.mjs';

const ROOT = fileURLToPath(new URL('.', import.meta.url));
const args = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const PORT = Number(process.env.PORT || args[0] || 8080);
const WATCH = !process.argv.includes('--no-watch');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    let pathname = decodeURIComponent(url.pathname);
    if (pathname.endsWith('/')) pathname += 'index.html';

    const file = resolve(ROOT, '.' + pathname);
    if (!file.startsWith(ROOT)) {
      res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Forbidden');
      return;
    }

    let info;
    try {
      info = await stat(file);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
      return;
    }
    if (info.isDirectory()) {
      res.writeHead(302, { Location: url.pathname.replace(/\/?$/, '/') + 'index.html' }).end();
      return;
    }

    res.writeHead(200, {
      'Content-Type': MIME[extname(file).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    if (req.method === 'HEAD') {
      res.end();
      return;
    }
    createReadStream(file).pipe(res);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }).end(String(err));
  }
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try: node serve.mjs 3000`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`Serving ${ROOT}`);
  console.log(`  ->  http://localhost:${PORT}`);

  if (!existsSync(join(ROOT, 'index.html'))) {
    console.log('index.html missing, building...');
    build();
  }

  if (!WATCH) return;

  let timer = null;
  const rebuild = () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        const { kb } = build();
        console.log(`[rebuilt] index.html (${kb} KB)`);
      } catch (err) {
        console.error('[build failed]', err.message);
      }
    }, 150);
  };

  for (const dir of ['src', 'assets']) {
    watch(join(ROOT, dir), { recursive: true }, rebuild);
  }
  console.log('Watching src/ and assets/ for changes (Ctrl+C to stop).');
});

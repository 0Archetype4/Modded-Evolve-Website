/*
 * Builds index.html from src/ partials and assets/.
 *
 *   node build.mjs           regenerate index.html
 *   node build.mjs --check   exit 1 if index.html is out of date
 *
 * No dependencies, no bundling: CSS and JS stay as separate files, which is
 * what GitHub Pages serves. Commit the generated index.html after editing.
 */
import { readFileSync, writeFileSync, renameSync, existsSync, unlinkSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = dirname(fileURLToPath(import.meta.url));
const EOL = '\r\n';
const OUT = join(ROOT, 'index.html');

/* Order matters: it is the original cascade / execution order. */
const CSS = [
  'assets/css/base.css',
  'assets/css/home.css',
  'assets/css/history.css',
  'assets/css/characters.css',
  'assets/css/ranked.css',
  'assets/css/systems.css',
  'assets/css/footer.css',
  'assets/css/gallery.css',
  'assets/css/voices.css',
  'assets/css/history-responsive.css',
  'assets/css/mobile.css',
  'assets/css/systems-extras.css',
  'assets/css/editor.css',
];

const PAGES = [
  'src/pages/home.html',
  'src/overlays.html',        // char history / patch / glossary modals
  'src/pages/history.html',
  'src/pages/characters.html',
  'src/pages/systems.html',
  'src/pages/download.html',
  'src/pages/ranked.html',
  'src/pages/gallery.html',
  'src/pages/gallery-images.html',
  'src/pages/gallery-videos.html',
  'src/pages/gallery-music.html',
  'src/pages/gallery-maps.html',
  'src/pages/voices.html',
];

const JS = [
  'assets/js/url.js',
  'assets/js/game-modes.js',
  'assets/js/images.js',
  'assets/js/skins.js',
  'assets/js/ranked.js',
  'assets/js/data/patch-icons.js',
  'assets/js/history.js',
  'assets/js/nav.js',
  'assets/js/characters.js',
  'assets/js/data/voice-lines.js',
  'assets/js/voices.js',
  'assets/js/gallery.js',
  'assets/js/music.js',
  'assets/js/character-ranks.js',
  'assets/js/ability-ranks.js',
  'assets/js/patch-version.js',
  'assets/js/home.js',
  'assets/js/image-loader.js',
  'assets/js/character-editor.js',
  'assets/js/perks.js',
  'assets/js/image-editor.js',
  'assets/js/ability-cards.js',
  'assets/js/movement-units.js',
];

function read(rel) {
  const abs = join(ROOT, rel);
  if (!existsSync(abs)) throw new Error(`missing file: ${rel}`);
  return readFileSync(abs, 'utf8').replace(/\r\n/g, '\n').split('\n').join(EOL);
}

/** Reject structurally broken markup: every checked tag must open and close once. */
function assertBalanced(html) {
  const clean = html
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script\b[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[\s\S]*?<\/style>/gi, '');
  for (const tag of ['div', 'section', 'nav', 'footer', 'ul', 'ol', 'li', 'table', 'tr', 'td', 'th', 'button', 'a', 'span']) {
    const open = (clean.match(new RegExp(`<${tag}\\b`, 'gi')) || []).length;
    const close = (clean.match(new RegExp(`</${tag}\\s*>`, 'gi')) || []).length;
    if (open !== close) {
      throw new Error(`unbalanced <${tag}> in generated HTML: ${open} open, ${close} close`);
    }
  }
}

function buildHtml() {
  const out = [];

  out.push(read('src/head.html'));
  out.push('<!-- Built from src/ and assets/ by build.mjs. Edit those files, then run: node build.mjs -->');
  for (const href of CSS) out.push(`<link rel="stylesheet" href="${href}">`);
  out.push('</head>');
  out.push('<body>');

  out.push(read('src/nav.html'));
  for (const page of PAGES) out.push(read(page));
  out.push(read('src/footer.html'));
  out.push(read('src/video-lightbox.html'));

  for (const src of JS) out.push(`<script defer src="${src}"></script>`);

  out.push('</body>');
  out.push('</html>');
  const html = out.join(EOL) + EOL;
  assertBalanced(html);
  return html;
}

/** Assemble and write index.html. Reused by serve.mjs for live rebuilds. */
export function build() {
  const html = buildHtml();
  // Write to a temp file and replace, so the new file picks up the folder's
  // inherited permissions (a plain overwrite keeps the old file's ACL on Windows).
  const tmp = `${OUT}.tmp`;
  writeFileSync(tmp, html);
  try {
    renameSync(tmp, OUT);
  } catch (err) {
    try { unlinkSync(tmp); } catch { /* ignore */ }
    throw err;
  }
  return { kb: (Buffer.byteLength(html) / 1024).toFixed(1), lines: html.split(EOL).length - 1 };
}

const invokedDirectly =
  !!process.argv[1] &&
  fileURLToPath(import.meta.url).toLowerCase() === resolve(process.argv[1]).toLowerCase();

if (invokedDirectly) {
  if (process.argv.includes('--check')) {
    const current = existsSync(OUT) ? readFileSync(OUT, 'utf8') : '';
    if (current !== buildHtml()) {
      console.error('index.html is out of date. Run: node build.mjs');
      process.exit(1);
    }
    console.log('index.html is up to date.');
  } else {
    const { kb, lines } = build();
    console.log(`Wrote index.html (${kb} KB, ${lines} lines).`);
  }
}

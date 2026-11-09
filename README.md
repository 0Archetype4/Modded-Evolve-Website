# Modded Evolve Website

Static site for [modded-evolve.com](https://modded-evolve.com), deployed from this
branch by GitHub Pages.

`index.html` is **generated**. Edit the partials in `src/` and the files in
`assets/`, then rebuild. Do not edit `index.html` by hand — the next build
overwrites it.

## Build

Requires Node 18+ (no dependencies, no `npm install`).

```powershell
node build.mjs          # regenerate index.html
node build.mjs --check  # exit code 1 if index.html is out of date
```

Commit the regenerated `index.html` along with your changes: GitHub Pages serves
the committed file and does not run a build.

## Preview locally

```powershell
node serve.mjs          # http://localhost:8080
node serve.mjs 3000     # different port
```

The server rebuilds `index.html` whenever anything under `src/` or `assets/`
changes — just save and refresh. Use `node serve.mjs --no-watch` to turn that off.
`npm start` and `npm run build` do the same things.

Opening `index.html` directly also works. If a browser blocks `history.pushState`
on `file://`, `assets/js/url.js` falls back to a plain hash update, so page
navigation keeps working.

## Layout

```
index.html                     generated: head + nav + pages + footer + script tags
build.mjs                      assembler; CSS/JS/page order lives at the top

src/
  head.html                    everything up to (but not including) </head>
  nav.html                     scroll bar, scroll-to-top button, navigation
  overlays.html                char-history, patch and glossary modals
  footer.html
  video-lightbox.html
  pages/
    home.html                  <section id="home">
    history.html               patch history (filled from patches.json)
    characters.html            character cards (the biggest partial)
    systems.html
    download.html
    ranked.html
    gallery.html               gallery hub
    gallery-images.html        includes the image lightbox
    gallery-videos.html
    gallery-music.html
    gallery-maps.html
    voices.html                hunter dialogue page + label overrides
assets/
  css/                         one file per feature, split at the old section banners
  js/                          one file per feature, split at the old script blocks
  js/data/                     large data tables: voice-lines.js (~3 MB), patch-icons.js
```

## Editing

| What | Where |
| --- | --- |
| Colors, fonts, radii | `:root` in `assets/css/base.css` |
| Nav links / labels | `src/nav.html` |
| Home page | `src/pages/home.html` |
| Character cards | `src/pages/characters.html` |
| Gallery pages | `src/pages/gallery-*.html` |
| Footer / Discord link | `src/footer.html` |
| Image URL map (`IMAGES`) | `assets/js/images.js` |
| Patch rendering / glossary | `assets/js/history.js` |
| Ranked + stats | `assets/js/ranked.js` |
| Voice-line player | `assets/js/voices.js` + `assets/js/data/voice-lines.js` |
| Hidden in-page editors (`?edit=1`, `?portrait=1`) | `character-editor.js`, `image-editor.js` |

**Order matters.** `CSS` and `JS` at the top of `build.mjs` are loaded in that
exact order, matching the original single-file cascade and execution order. When
you add a stylesheet or script, add its path to the matching array. New scripts
are emitted with `defer`, so inline `onclick="..."` handlers keep working as long
as the function is declared at the top level of a classic script.

### Adding a page

1. Create `src/pages/yourpage.html` containing a `<section id="yourpage">`.
2. Add the path to `PAGES` in `build.mjs` (before `voices.html` / footer).
3. Add a nav link in `src/nav.html` — use `showPage('yourpage')`.
4. Run `node build.mjs`.

That is the same convention the old file documented: a nav `<li>` id
`nav-PAGENAME` plus a matching `<section id="PAGENAME">`.

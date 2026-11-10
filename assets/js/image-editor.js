/* Image editor: open the page with ?portrait=1. Click a portrait or a weapon icon to select it, then drag to move,
   scroll wheel to zoom, or use the sliders. Save writes CARD_PORTRAIT_TWEAKS and CARD_ICON_TWEAKS into index.html
   through tools/serve.py. */
(function () {
  if (!/[?&]portrait=1/.test(location.search)) return;
  const names = [...document.querySelectorAll('.char-card')].map(c => c.dataset.name);
  const panel = document.createElement('div');
  panel.style.cssText = 'position:fixed;right:16px;bottom:16px;z-index:100000;background:#111;color:#fff;border:1px solid #8b1a1a;border-radius:8px;padding:12px 14px;font:13px/1.5 sans-serif;width:320px;box-shadow:0 8px 30px #000';
  panel.innerHTML = '<div style="font-weight:700;letter-spacing:.1em;margin-bottom:6px">IMAGE EDITOR</div>'
    + '<select id="pe-name" style="width:100%;margin-bottom:6px;background:#222;color:#fff;border:1px solid #444;padding:4px">' + names.map(n => `<option>${n}</option>`).join('') + '</select>'
    + '<div id="pe-target" style="margin-bottom:6px;color:#e8a">portrait</div>'
    + ['s|Scale|0.4|3|0.005', 'x|Shift X %|-80|80|0.5', 'y|Shift Y %|-80|80|0.5'].map(r => { const [k, l, mn, mx, st] = r.split('|');
        return `<label style="display:block">${l} <span id="pe-${k}v" style="float:right"></span><input id="pe-${k}" type="range" min="${mn}" max="${mx}" step="${st}" style="width:100%"></label>`; }).join('')
    + '<div style="display:flex;gap:6px;margin-top:8px"><button id="pe-reset">Reset</button><button id="pe-save" style="flex:1;background:#8b1a1a;color:#fff;border:0;padding:6px;font-weight:700">Save to index.html</button></div>'
    + '<div id="pe-status" style="margin-top:6px;color:#aaa;font-size:12px">click portrait or icon, drag = move, wheel = zoom</div>';
  document.body.appendChild(panel);
  const $ = id => panel.querySelector('#' + id);
  let cur = null, target = { type: 'portrait', key: null, img: null };
  const card = () => document.querySelector(`.char-card[data-name="${cur}"]`);
  const store = () => target.type === 'portrait' ? CARD_PORTRAIT_TWEAKS : CARD_ICON_TWEAKS;
  const get = () => store()[target.key] || (store()[target.key] = { s: 1, x: 0, y: 0 });
  function show() { const t = get(); ['s', 'x', 'y'].forEach(k => { $('pe-' + k).value = t[k]; $('pe-' + k + 'v').textContent = t[k]; }); $('pe-target').textContent = target.type === 'portrait' ? 'portrait: ' + cur : 'icon: ' + target.key; }
  function apply() { if (target.type === 'portrait') { const c = card(); if (c) applyCardPortraitTweak(c); } else if (target.img) applyCardIconTweak(target.img, target.key); show(); }
  function selectChar(n, scroll) { cur = n; $('pe-name').value = n; target = { type: 'portrait', key: n, img: null }; const c = card();
    if (c && scroll) { if (typeof navigateToCharacter === 'function') navigateToCharacter(n); c.scrollIntoView({ block: 'start' }); } show(); }
  function selectIcon(img) { const c = img.closest('.char-card'), col = img.closest('.char-item-col'); cur = c.dataset.name; $('pe-name').value = cur;
    target = { type: 'icon', key: cur + ' -- ' + col.querySelector('.item-name').textContent.trim(), img }; show(); }
  $('pe-name').onchange = e => selectChar(e.target.value, true);
  ['s', 'x', 'y'].forEach(k => $('pe-' + k).oninput = e => { get()[k] = parseFloat(e.target.value); apply(); });
  $('pe-reset').onclick = () => { store()[target.key] = { s: 1, x: 0, y: 0 }; apply(); };
  $('pe-save').onclick = () => { $('pe-status').textContent = 'saving...';
    fetch('/save-tweaks', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ portraits: CARD_PORTRAIT_TWEAKS, icons: CARD_ICON_TWEAKS }) })
      .then(r => r.json()).then(j => { $('pe-status').textContent = j.ok ? 'saved ' + j.saved + ' tweak(s) into index.html' : 'error: ' + j.error; })
      .catch(e => { $('pe-status').textContent = 'save failed: run tools/serve.py (' + e + ')'; }); };
  const pick = el => { const p = el.closest('.char-portrait-col img'); if (p) { selectChar(p.closest('.char-card').dataset.name, false); return p; }
    const i = el.closest('.char-icon-frame img'); if (i) { selectIcon(i); return i; } return null; };
  document.addEventListener('pointerdown', e => {
    const img = pick(e.target); if (!img) return; e.preventDefault();
    const t = get(), sx = e.clientX, sy = e.clientY, ox = t.x, oy = t.y, w = img.clientWidth, h = img.clientHeight;
    const move = ev => { t.x = Math.round((ox + (ev.clientX - sx) / w * 100) * 2) / 2; t.y = Math.round((oy + (ev.clientY - sy) / h * 100) * 2) / 2; apply(); };
    const up = () => { document.removeEventListener('pointermove', move); document.removeEventListener('pointerup', up); };
    document.addEventListener('pointermove', move); document.addEventListener('pointerup', up);
  });
  document.addEventListener('wheel', e => {
    const img = pick(e.target); if (!img) return; e.preventDefault();
    const t = get(); t.s = Math.round(Math.min(3, Math.max(0.4, t.s * (e.deltaY < 0 ? 1.03 : 1 / 1.03))) * 1000) / 1000; apply();
  }, { passive: false });
  const m = location.hash.match(/#characters\/(.+)/); selectChar(m ? decodeURIComponent(m[1]) : names[0], false);
})();

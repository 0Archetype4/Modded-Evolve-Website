/* ── Character text editor ────────────────────────────────────────────────
   Activate by appending ?edit=1 to the URL. Invisible to normal visitors.
   Edits are in-memory; use "Export index.html" to download a patched file. */
(function () {

  const CLS_VAR = { monster:'--cl-monster', assault:'--cl-assault', medic:'--cl-medic',
                    support:'--cl-support', trapper:'--cl-trapper' };
  const original = new Map();   // eid -> original innerHTML
  const changes  = new Map();   // eid -> new innerHTML
  let lastFocused = null;

  const $ = (s, r) => (r || document).querySelector(s);
  const fields = () => document.querySelectorAll('[data-eid]');

  function toast(msg) {
    const t = $('#ce-toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 1900);
  }

  function markDirty(el) {
    const eid = el.dataset.eid;
    const now = el.innerHTML;
    if (now === original.get(eid)) { changes.delete(eid); el.classList.remove('ce-dirty'); }
    else { changes.set(eid, now); el.classList.add('ce-dirty'); }
    refreshCount();
  }

  function refreshCount() {
    $('#ce-count').textContent = changes.size ? changes.size + ' unsaved change' + (changes.size > 1 ? 's' : '') : 'No changes';
    renderList();
  }

  function renderList() {
    const box = $('#ce-list');
    if (!changes.size) { box.innerHTML = '<div style="color:#666;padding:.4rem">No edits yet.</div>'; return; }
    box.innerHTML = '';
    changes.forEach((_, eid) => {
      const row = document.createElement('div'); row.className = 'ce-row';
      const s = document.createElement('span'); s.textContent = eid; row.appendChild(s);
      const go = document.createElement('button'); go.textContent = 'go'; go.title = 'Scroll to field';
      go.onclick = () => {
        const el = document.querySelector('[data-eid="' + CSS.escape(eid) + '"]');
        if (el) { el.scrollIntoView({ behavior:'smooth', block:'center' }); el.focus(); }
      };
      const rv = document.createElement('button'); rv.textContent = '↺'; rv.title = 'Revert this field';
      rv.onclick = () => revert(eid);
      row.appendChild(go); row.appendChild(rv); box.appendChild(row);
    });
  }

  function revert(eid) {
    const el = document.querySelector('[data-eid="' + CSS.escape(eid) + '"]');
    if (el) { el.innerHTML = original.get(eid); el.classList.remove('ce-dirty'); }
    changes.delete(eid); refreshCount(); toast('Reverted ' + eid);
  }

  function revertAll() {
    if (!changes.size) return;
    if (!confirm('Revert all ' + changes.size + ' edits?')) return;
    Array.from(changes.keys()).forEach(eid => {
      const el = document.querySelector('[data-eid="' + CSS.escape(eid) + '"]');
      if (el) { el.innerHTML = original.get(eid); el.classList.remove('ce-dirty'); }
    });
    changes.clear(); refreshCount(); toast('All edits reverted');
  }

  function enable() {
    document.body.classList.add('ce-on');
    fields().forEach(el => {
      const eid = el.dataset.eid;
      if (!original.has(eid)) original.set(eid, el.innerHTML);
      el.setAttribute('contenteditable', 'true');
      el.setAttribute('spellcheck', 'true');
      el.title = eid;
      if (el.dataset.ceBound) return;      // don't re-bind on re-entry
      el.dataset.ceBound = '1';
      el.addEventListener('input', () => markDirty(el));
      el.addEventListener('focus', () => { lastFocused = el; });
      el.addEventListener('keydown', e => { if (e.key === 'Escape') el.blur(); });
    });
    refreshCount();
  }

  function exec(cmd, val) {
    if (!lastFocused) { toast('Click into a field first'); return; }
    lastFocused.focus();
    document.execCommand(cmd, false, val || null);
    markDirty(lastFocused);
  }

  function insertHTML(html) {
    if (!lastFocused) { toast('Click into a field first'); return; }
    lastFocused.focus();
    document.execCommand('insertHTML', false, html);
    markDirty(lastFocused);
  }

  function insertRankValues() {
    insertHTML('<span class="rank-values-group">' +
      '<span class="rank-val" data-rank="0">0</span><span class="rank-sep">|</span>' +
      '<span class="rank-val" data-rank="1">0</span><span class="rank-sep">|</span>' +
      '<span class="rank-val" data-rank="2">0</span></span>');
  }

  function insertMastery() {
    let v = '--cl-monster';
    if (lastFocused) {
      const card = lastFocused.closest('.char-card');
      if (card && CLS_VAR[card.dataset.class]) v = CLS_VAR[card.dataset.class];
    }
    insertHTML('<span style="background:var(' + v + ');color:#fff;padding:0.1rem 0.4rem;border-radius:3px;' +
      'font-size:0.7rem;font-weight:700;letter-spacing:0.1em;">MASTERY</span>&nbsp;');
  }

  /* ── raw HTML editing ─────────────────────────────────────── */
  function openRaw() {
    if (!lastFocused) { toast('Click into a field first'); return; }
    const el = lastFocused;
    $('#ce-modal-title').textContent = 'Edit HTML — ' + el.dataset.eid;
    $('#ce-raw').value = el.innerHTML;
    $('#ce-modal').classList.add('open');
    $('#ce-raw-save').onclick = () => {
      el.innerHTML = $('#ce-raw').value;
      markDirty(el);
      $('#ce-modal').classList.remove('open');
      toast('HTML applied');
    };
  }

  /* ── export / import ──────────────────────────────────────── */
  function download(name, text, type) {
    const b = new Blob([text], { type: type || 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(b); a.download = name; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }

  function exportJSON() {
    if (!changes.size) { toast('Nothing to export'); return; }
    download('character-text.json', JSON.stringify(Object.fromEntries(changes), null, 2), 'application/json');
    toast('Exported ' + changes.size + ' change(s)');
  }

  function importJSON() {
    const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.json,application/json';
    inp.onchange = () => {
      const f = inp.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        let data;
        try { data = JSON.parse(r.result); }
        catch (e) { toast('Invalid JSON'); return; }
        let n = 0;
        Object.entries(data).forEach(([eid, html]) => {
          const el = document.querySelector('[data-eid="' + CSS.escape(eid) + '"]');
          if (el) { if (!original.has(eid)) original.set(eid, el.innerHTML); el.innerHTML = html; markDirty(el); n++; }
        });
        toast('Applied ' + n + ' change(s)');
      };
      r.readAsText(f);
    };
    inp.click();
  }

  // Get the pristine page source: try fetch, else ask for the file.
  function getSource() {
    return fetch(location.pathname, { cache: 'no-store' })
      .then(r => { if (!r.ok) throw 0; return r.text(); })
      .catch(() => new Promise((res, rej) => {
        toast('Select your index.html to patch');
        const inp = document.createElement('input'); inp.type = 'file'; inp.accept = '.html';
        inp.onchange = () => {
          const f = inp.files[0]; if (!f) return rej();
          const r = new FileReader(); r.onload = () => res(r.result); r.readAsText(f);
        };
        inp.click();
      }));
  }

  async function exportHTML() {
    if (!changes.size) { toast('No changes to export'); return; }
    let src;
    try { src = await getSource(); } catch (e) { toast('Export cancelled'); return; }
    // Parse the ORIGINAL file so runtime-generated DOM never gets baked in.
    const doc = new DOMParser().parseFromString(src, 'text/html');
    let applied = 0, missing = [];
    changes.forEach((html, eid) => {
      const el = doc.querySelector('[data-eid="' + CSS.escape(eid) + '"]');
      if (el) { el.innerHTML = html; applied++; } else { missing.push(eid); }
    });
    if (missing.length) { alert('Could not find these fields in the source file:\n' + missing.join('\n')); }
    download('index.html', '<!DOCTYPE html>\n' + doc.documentElement.outerHTML, 'text/html');
    toast('Exported index.html (' + applied + ' change(s))');
  }

  // Save straight into index.html through tools/serve.py (local preview only); the reply is the evidence check
  // for the touched cards, so a changed number that no longer matches its ledger row shows up as MISMATCH.
  function saveToFile() {
    if (!changes.size) { toast('No changes to save'); return; }
    toast('Saving…');
    fetch('/save-text', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(changes)) })
      .then(r => r.json()).then(j => {
        if (!j.ok) { alert('Save failed: ' + j.error); return; }
        changes.forEach((_, eid) => { const el = document.querySelector('[data-eid="' + CSS.escape(eid) + '"]'); if (!el) return;
          el.innerHTML = j.cleaned[eid]; el.querySelectorAll('li').forEach(highlightNumbers);      // show what was written (server strips baked styles)
          original.set(eid, el.innerHTML); el.classList.remove('ce-dirty'); });
        changes.clear(); refreshCount(); toast('Saved ' + j.saved + ' field(s) into index.html');
      })
      .catch(e => alert('Save failed: is tools/serve.py running? (' + e + ')'));
  }

  /* ── UI ───────────────────────────────────────────────────── */
  function buildBar() {
    const bar = document.createElement('div'); bar.id = 'ce-bar';
    bar.innerHTML =
      '<strong style="color:var(--color-accent)">EDIT MODE</strong>' +
      '<span class="ce-sep"></span>' +
      '<button data-c="bold" title="Bold (Ctrl+B)"><b>B</b></button>' +
      '<button data-c="italic" title="Italic (Ctrl+I)"><i>I</i></button>' +
      '<button data-c="insertUnorderedList" title="Bullet list">• List</button>' +
      '<button data-c="removeFormat" title="Clear formatting">Clear</button>' +
      '<span class="ce-sep"></span>' +
      '<button id="ce-rank" title="Insert a Rank 1|2|3 value group">Rank vals</button>' +
      '<button id="ce-mastery" title="Insert a MASTERY badge">Mastery</button>' +
      '<button id="ce-raw-btn" title="Edit the raw HTML of the focused field">&lt;/&gt; HTML</button>' +
      '<span class="ce-sep"></span>' +
      '<button id="ce-save" class="ce-primary" title="Write the edits into index.html via tools/serve.py (Ctrl+S)">💾 Save to index.html</button>' +
      '<button id="ce-html" title="Download a patched index.html">⇩ Export index.html</button>' +
      '<button id="ce-json" title="Export just the changed fields as JSON">⇩ JSON</button>' +
      '<button id="ce-import" title="Apply a previously exported JSON">⇧ Import</button>' +
      '<span class="ce-sep"></span>' +
      '<button id="ce-toggle-list" title="Show changed fields">Changes</button>' +
      '<button id="ce-revert" class="ce-danger" title="Revert everything">Revert all</button>' +
      '<button id="ce-exit" title="Leave edit mode">Exit</button>' +
      '<span class="ce-count" id="ce-count">No changes</span>' +
      '<span class="ce-hint">Ctrl+S save · Esc leave field</span>';
    document.body.appendChild(bar);

    bar.querySelectorAll('button[data-c]').forEach(b => b.onclick = () => exec(b.dataset.c));
    $('#ce-rank').onclick    = insertRankValues;
    $('#ce-mastery').onclick = insertMastery;
    $('#ce-raw-btn').onclick = openRaw;
    $('#ce-save').onclick    = saveToFile;
    $('#ce-html').onclick    = exportHTML;
    $('#ce-json').onclick    = exportJSON;
    $('#ce-import').onclick  = importJSON;
    $('#ce-revert').onclick  = revertAll;
    $('#ce-toggle-list').onclick = () => $('#ce-list').classList.toggle('open');
    $('#ce-exit').onclick = disable;

    const list = document.createElement('div'); list.id = 'ce-list'; document.body.appendChild(list);

    const modal = document.createElement('div'); modal.id = 'ce-modal';
    modal.innerHTML = '<div class="ce-box"><h4 id="ce-modal-title">Edit HTML</h4>' +
      '<textarea id="ce-raw" spellcheck="false"></textarea>' +
      '<div class="ce-mrow"><button id="ce-raw-cancel">Cancel</button>' +
      '<button id="ce-raw-save" class="ce-primary">Apply</button></div></div>';
    document.body.appendChild(modal);
    $('#ce-raw-cancel').onclick = () => modal.classList.remove('open');
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('open'); });

  }

  function disable() {
    if (changes.size && !confirm('You have ' + changes.size + ' unexported change(s). Leave edit mode? (They stay in the page until you refresh.)')) return;
    document.body.classList.remove('ce-on');
    fields().forEach(el => { el.removeAttribute('contenteditable'); el.removeAttribute('title'); });
    $('#ce-list').classList.remove('open');
    $('#ce-bar').style.display = 'none';
  }

  function activate() {
    if (!$('#ce-bar')) buildBar();
    $('#ce-bar').style.display = 'flex';
    enable();
  }

  function boot() {
    const t = document.createElement('div'); t.id = 'ce-toast'; document.body.appendChild(t);

    // Editor is hidden from visitors. Append ?edit=1 to the URL to enable it.
    if (!new URLSearchParams(location.search).has('edit')) return;
    activate();

    document.addEventListener('keydown', e => {
      if (!document.body.classList.contains('ce-on')) return;
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); saveToFile(); }
    });
    window.addEventListener('beforeunload', e => {
      if (changes.size) { e.preventDefault(); e.returnValue = ''; }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();

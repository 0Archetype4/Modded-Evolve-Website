/* ============================================================
   PATCH HISTORY — rendered from patches.json
   Source of truth: https://assets.modded-evolve.com/data/patches.json
   Edit with patch-editor.html (Save JSON), then upload the file.
   ============================================================ */
const PATCH_DATA_URL = 'https://assets.modded-evolve.com/data/Stage%202/patches.json';
const CHAR_STATS_URL = 'https://assets.modded-evolve.com/data/Stage%202/character-stats.json';
// Character stats live in character-stats.json on the bucket. Every stat element carries data-stat="<id>" (added by
// tools/tag_char_stats.py); its numbers are replaced in order by the JSON values, so editing the JSON updates the site.
function applyCharacterStats(data) {
  const lines = [];
  for (const ch of Object.values((data && data.characters) || {})) {
    for (const sec of ['general', 'traversal']) for (const g of Object.values((ch[sec] && ch[sec].groups) || {})) lines.push(...g);
    for (const ab of Object.values(ch.abilities || {})) for (const g of Object.values(ab.groups || {})) lines.push(...g);
  }
  const NUM = /\d[\d,]*(?:\.\d+)?/g, SLOT = /\d[\d,]*(?:\.\d+)?|\u2026/g; let changed = 0;   // index.html holds … placeholders, not numbers
  const filled = new Set();
  for (const line of lines) {
    const el = document.querySelector('[data-stat="' + line.id + '"]');
    if (!el || !Array.isArray(line.values)) continue;
    const vals = line.values.map(v => (String(v).match(NUM) || [''])[0]).filter(Boolean);
    el.normalize();                                                          // streaming parse can split a number across text nodes
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let k = 0, node;
    const head = el.tagName === 'TR' ? el.firstElementChild : null;        // a table row's first cell is its label
    while (k < vals.length && (node = walker.nextNode())) {
      if (head && head.contains(node)) continue;
      const before = node.nodeValue;
      node.nodeValue = before.replace(SLOT, m => k < vals.length ? vals[k++] : m);
      if (node.nodeValue !== before) { changed++; filled.add(el); if (location.search.includes('statsdebug')) console.debug('stat', line.id, JSON.stringify(before), '->', JSON.stringify(node.nodeValue)); }
    }
  }
  if (typeof highlightNumbers === 'function') filled.forEach(el => { if (el.tagName === 'LI' && el.closest('.item-notes')) highlightNumbers(el); });   // the bold-number pass ran before the JSON arrived
  if (typeof condenseIdenticalRankGroups === 'function') condenseIdenticalRankGroups();
  if (typeof refreshAbilityPreviews === 'function') refreshAbilityPreviews();
  return changed;
}

/* Show a single value when all stage entries truly match AFTER JSON populates. */
function condenseIdenticalRankGroups(){
  document.querySelectorAll('#characters .item-notes .rank-values-group').forEach(function(group){
    var values=Array.from(group.querySelectorAll('.rank-val')).map(function(v){return v.textContent.trim();});
    var valid=values.length===3 && values.every(function(v){return v && !/[.…—]/.test(v);});
    group.classList.toggle('stages-identical',valid && values.every(function(v){return v===values[0];}));
  });
}

function loadCharacterStats() {
  fetch(CHAR_STATS_URL, { cache: 'no-cache' }).then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(d => {
      console.log('character stats: ' + applyCharacterStats(d) + ' nodes updated from JSON');
      const status = document.getElementById('character-json-status');
      if (status) status.hidden = true;
    })
    .catch(e => {
      console.warn('character stats JSON not loaded, values unavailable', e);
      const status = document.getElementById('character-json-status');
      if (status) status.hidden = false;
    });
}
document.addEventListener('DOMContentLoaded', loadCharacterStats);
function patchClassOf(name){ return PATCH_ICONS.classOf[name] || 'assault'; }
function patchGeneralIcon(charName, abilityName){
  if (/^Note\b/i.test(abilityName) || /^(All )?Trappers?\b/i.test(abilityName)) {   // Note blocks and the shared Trapper block show the class icon
    const c = /Trappers/i.test(abilityName) ? 'trapper' : patchClassOf(charName);
    return 'https://assets.modded-evolve.com/images/ui/lcdbackground' + (c === 'trapper' ? 'tracker' : c) + '.png';
  }
  if (charName !== 'General' && patchClassOf(charName) !== 'monster' && PATCH_ICONS.thumbs[charName]) return PATCH_ICONS.thumbs[charName];
  if (PATCH_ICONS.general[abilityName]) return PATCH_ICONS.general[abilityName];
  return patchClassOf(charName) === 'monster' ? PATCH_ICONS.perkSections.monster : PATCH_ICONS.perkSections.hunter;
}
function patchAbilityIcon(charName, abilityName, general){
  if (general || charName === 'General') return patchGeneralIcon(charName, abilityName);
  abilityName = ({'Living Fortress (passive)': 'Living Fortress', 'Repulser': 'Repulsor', 'Healing Buoys': 'Healing Buoy', 'Mechanised Recharge': 'Mechanized Recharge'})[abilityName] || abilityName;   // headings as the notes spell them
  const m = PATCH_ICONS.abilities[charName] || {};
  if (m[abilityName]) return m[abilityName];
  if (/^Traversal/i.test(abilityName) && m['Traversal']) return m['Traversal'];
  return patchGeneralIcon(charName, abilityName);
}
function patchExpandTags(t){
  t = t.replace(/\{undoc\}/gi, '<span class="tag-undocumented" title="This change was never documented in the patch notes">Undocumented</span>');
  t = t.replace(/\{origin:\s*([A-Za-z0-9]+)\s*:\s*([^}]+?)\s*\}/gi, function(m, pid, label){ return '<span class="tag-origin" onclick="openOriginal(event,\'' + pid + '\')" title="Open the original Patch ' + label + ' entry">' + label + '</span>'; });
  // numbers stand out: 385, 1,600, 0.75, 45%, x1.35, 316/316/349, -30% (text only, never inside a tag)
  t = t.split(/(<[^>]+>)/).map(function(seg){ return seg.charAt(0) === '<' ? seg : seg.replace(/(^|[^A-Za-z0-9_])((?:x)?[+\-−]?\d[\d,]*(?:\.\d+)?(?:\s?%|x)?(?:\/[+\-−]?\d[\d,]*(?:\.\d+)?%?)*)(?![A-Za-z0-9_])/g, function(m, pre, num){ return pre + '<strong class="pn-num">' + num.replace(/\//g, '<span class="rank-sep">|</span>') + '</strong>'; }); }).join('');
  return t;
}
function patchRankStyle(html, on){
  if (on === false) return html;
  return html.replace(/<span class="rank-token">[\s\S]*?<\/span>|\b(Rank|Stage)\s+(\d+)\b/g, function(full, w, n){ return w ? '<span class="rank-token">' + w + ' ' + n + '</span>' : full; });
}
function patchBulletsHTML(bullets, rankOn){
  return (bullets || []).filter(b => b.replace(/^\t+/, '').trim()).map(b => {
    const im = b.match(/^(\t+)/); const lvl = im ? Math.min(im[1].length, 3) : 0;
    const text = b.replace(/^\t+/, '');
    return '\n<li' + (lvl ? ' class="indent-' + lvl + '"' : '') + '>' + patchRankStyle(patchExpandTags(text), rankOn) + '</li>';
  }).join('');
}
function patchPerksHTML(perks, rankOn){
  if (!perks) return '';
  const sec = (key, heading) => {
    const items = (perks[key] || []).filter(p => p.name); const note = perks[key + 'Note'];
    if (!items.length && !note) return '';
    const noteHTML = note ? '\n<div class="perk-section-note">' + patchExpandTags(note) + '</div>' : '';
    const itemsHTML = items.map(p => '\n<div class="perk-item"><span class="perk-item-icon"><img src="' + ((PATCH_ICONS.perks[key] && PATCH_ICONS.perks[key][p.name]) || '') + '" alt="' + p.name + '"' + (PATCH_ICONS.perkStyle && PATCH_ICONS.perkStyle[PATCH_ICONS.perks[key] && PATCH_ICONS.perks[key][p.name]] ? ' style="' + PATCH_ICONS.perkStyle[PATCH_ICONS.perks[key][p.name]] + '"' : '') + '></span><div class="perk-item-name">' + p.name + '</div><ul class="change-list perk-item-changes">' + patchBulletsHTML(p.bullets, rankOn) + '</ul></div>').join('');
    return '\n<div class="perk-section perk-section-' + key + '">\n<div class="perk-section-heading"><img src="' + PATCH_ICONS.perkSections[key] + '" alt="' + heading + '" class="perk-section-icon"><span>' + heading + ' Perks</span></div>' + noteHTML + itemsHTML + '\n</div>';
  };
  const m = sec('monster', 'Monster'), h = sec('hunter', 'Hunter');
  if (!m && !h) return '';
  return '\n<div class="perk-block perk-block-v2">\n<div class="perk-block-header"><div class="ability-icon-wrap"><img src="' + PATCH_ICONS.perkSections.main + '" alt="Perks" class="perk-main-icon"></div><div class="perk-block-title">Perks</div></div>' + m + h + '\n</div>';
}
function patchEntryHTML(p, isLatest){
  const rankOn = p.rankStyle !== false;
  let perksHTML = patchPerksHTML(p.perks, rankOn);
  let entries = '';
  (p.characters || []).forEach(ch => {
    const cls = ch.name === 'General' ? 'general' : patchClassOf(ch.name);
    const trapBlock = ch.name === 'General' && (ch.abilities || []).some(a => /^(All )?Trappers?\b/i.test(a.name || '')) && (ch.abilities || []).every(a => /^(All )?Trappers?\b|^Note\b/i.test(a.name || ''));   // a block shared by every Trapper
    const abilities = (ch.abilities || []).filter(a => a.name).map(a => {
      const isGen = a.general || ch.name === 'General';
      const icon = trapBlock ? 'https://assets.modded-evolve.com/images/ui/lcdbackgroundtracker.png' : patchAbilityIcon(ch.name, a.name, isGen);
      const ttl = (isGen && a.name === 'Global — Hunters') ? 'hunter' : (isGen && a.name === 'Global — Monsters') ? 'monster' : '';
      const nameHTML = ttl ? '<span class="ttl-' + ttl + '">' + a.name + '</span>' : a.name;
      return '\n<div class="ability-block"' + (ttl ? ' data-title-type="' + ttl + '"' : '') + '><div class="ability-icon-wrap"><img loading="lazy" decoding="async" src="' + icon + '" alt="' + a.name + '"' + (PATCH_ICONS.iconStyle && PATCH_ICONS.iconStyle[icon] ? ' style="' + PATCH_ICONS.iconStyle[icon] + '"' : '') + '></div><div class="ability-changes"><div class="ability-name">' + nameHTML + '</div><ul class="change-list">' + patchBulletsHTML(a.bullets, rankOn) + '\n</ul></div></div>';
    }).join('');
    if (ch.name === 'General') {
      if (trapBlock) entries += '\n          <div class="sub-entry cat-trapper"><div class="sub-abilities-col">' + abilities + '</div></div>';
      else { entries += '\n          <div class="sub-entry cat-general"><div class="sub-abilities-col">' + abilities + perksHTML + '</div></div>'; perksHTML = ''; }
    } else {
      const portrait = PATCH_ICONS.portraits[ch.name] || '';
      const pstyle = PATCH_ICONS.portraitStyle && PATCH_ICONS.portraitStyle[ch.name] ? ' style="' + PATCH_ICONS.portraitStyle[ch.name] + '"' : '';
      entries += '\n          <div class="sub-entry cat-' + cls + '"><div class="sub-portrait-col"><img loading="lazy" decoding="async" class="fullbody" src="' + portrait + '" alt="' + ch.name + '"' + pstyle + '><div class="sub-char-label"><span class="sub-char-name">' + ch.name + '</span><span class="sub-char-cls">' + cls.charAt(0).toUpperCase() + cls.slice(1) + '</span></div></div><div class="sub-abilities-col">' + abilities + '</div></div>';
    }
  });
  if (perksHTML) entries = '\n          <div class="sub-entry cat-general"><div class="sub-abilities-col">' + perksHTML + '</div></div>' + entries;
  const count = (p.characters || []).reduce((s, ch) => s + (ch.abilities || []).filter(a => !/^Note\b/i.test(a.name || '')).reduce((t, a) => t + (a.bullets || []).filter((b, i, arr) => b.trim() && !(!/^\t/.test(b) && !/\d/.test(b) && arr[i + 1] && /^\t/.test(arr[i + 1]))).length, 0), 0);   // a label bullet above indented changes is not itself a change
  let preface = '';
  if (p.title || p.preface) {
    const paras = (p.preface || '').split(/\n\s*\n|\n/).map(x => x.trim()).filter(Boolean).map(x => '<p>' + patchExpandTags(x) + '</p>').join('');
    preface = '\n          <div class="patch-preface"><span class="patch-preface-label">' + (p.title || '') + '</span>' + paras + '</div>';
  }
  return '<div class="patch-entry' + (isLatest ? ' latest' : '') + '" id="' + p.id + '">\n  <div class="patch-header" onclick="openPatchModal(this.parentElement)">\n    <span class="version-badge">' + p.version + '</span>\n    <span class="patch-date">' + p.date + '</span>\n    <div class="patch-change-count">' + count + ' change' + (count !== 1 ? 's' : '') + '</div>\n  </div>\n  <div class="patch-body">' + preface + entries + '\n  </div>\n</div>';
}
function renderPatchHistory(data){
  const grid = document.getElementById('patch-list-grid'); if (!grid) return;
  const patches = (data && data.patches) || [];
  if (!patches.length) {
    grid.innerHTML = '<div class="muted" style="padding:2rem;text-align:center;">No patches yet. The first Stage 2 patch notes will show up here.</div>';
    return;
  }
  grid.innerHTML = patches.map((p, i) => patchEntryHTML(p, i === 0)).join('\n');
  document.dispatchEvent(new CustomEvent('patches:rendered'));
}
let patchHistoryPromise = null;
function loadPatchHistory() {
  if (patchHistoryPromise) return patchHistoryPromise;
  patchHistoryPromise = fetch(PATCH_DATA_URL, { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(renderPatchHistory)
    .catch(err => { const g = document.getElementById('patch-list-grid'); if (g) g.innerHTML = '<div class="muted" style="padding:2rem;text-align:center;">Patch history unavailable (' + err.message + ').</div>'; });
  return patchHistoryPromise;
}
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('history')?.classList.contains('active')) {
    loadPatchHistory();
  } else if ('requestIdleCallback' in window) {
    requestIdleCallback(loadPatchHistory, { timeout: 2500 });
  } else {
    setTimeout(loadPatchHistory, 1200);
  }
});

/* ── PATCH MODAL STATE ── */
var _patchModalEntry = null;
var _patchModalActiveClass = null;

const CLASS_META = {
  monster: { label: 'Monster', color: '#8b1a1a', icon: 'https://assets.modded-evolve.com/images/ui/lcdbackgroundmonster.png' },
  assault: { label: 'Assault', color: '#ab2d16', icon: 'https://assets.modded-evolve.com/images/ui/lcdbackgroundassault.png' },
  medic:   { label: 'Medic',   color: '#387672', icon: 'https://assets.modded-evolve.com/images/ui/lcdbackgroundmedic.png' },
  support: { label: 'Support', color: '#c87a05', icon: 'https://assets.modded-evolve.com/images/ui/lcdbackgroundsupport.png' },
  trapper: { label: 'Trapper', color: '#807921', icon: 'https://assets.modded-evolve.com/images/ui/lcdbackgroundtracker.png' },
};

const CHAR_THUMBS = IMAGES.heads;

function openReconciled(e){ if(e){ e.stopPropagation(); } var el=document.getElementById('p19'); if(el){ openPatchModal(el); } }
function openOriginal(e,id){ if(e){ e.stopPropagation(); } var el=document.getElementById(id); if(el){ openPatchModal(el); } }
function openPatchModal(entry) {
  _patchModalEntry = entry;
  _patchModalActiveClass = null;

  const badge = entry.querySelector('.version-badge');
  const title = entry.querySelector('.patch-title');
  const date  = entry.querySelector('.patch-date');
  const body  = entry.querySelector('.patch-body');

  document.getElementById('patch-modal-badge').textContent = badge ? badge.textContent : '';
  document.getElementById('patch-modal-title').textContent = title ? title.textContent : '';
  document.getElementById('patch-modal-date').textContent  = date  ? date.textContent  : '';
  document.getElementById('patch-modal').scrollTop = 0;

  _patchModalEntry._bodyHTML = body ? body.innerHTML : '';

  /* Build class picker */
  const picker = document.getElementById('patch-modal-class-picker');
  picker.innerHTML = '';

  const bodyTemp = document.createElement('div');
  bodyTemp.innerHTML = _patchModalEntry._bodyHTML;

  const availableClasses = [];
  Object.keys(CLASS_META).forEach(cls => {
    if (bodyTemp.querySelector('.sub-entry.cat-' + cls)) availableClasses.push(cls);
  });
  const hasGeneral = !!bodyTemp.querySelector('.sub-entry.cat-general');

  availableClasses.forEach(cls => {
    const meta = CLASS_META[cls];
    const btn = document.createElement('button');
    btn.className = 'modal-class-btn';
    btn.dataset.cls = cls;
    btn.style.setProperty('--cls-color', meta.color);
    btn.innerHTML = '<img loading="lazy" decoding="async" src="' + meta.icon + '" alt="' + meta.label + '"><span>' + meta.label + '</span>';
    btn.addEventListener('click', () => {
      if (_patchModalActiveClass === cls) {
        /* clicking active class again → show all */
        _patchModalActiveClass = null;
        document.querySelectorAll('.modal-class-btn').forEach(b => b.classList.remove('active'));
        renderModalEntries(null);
      } else {
        showClassInModal(cls);
      }
    });
    picker.appendChild(btn);
  });

  if (hasGeneral) {
    const btn = document.createElement('button');
    btn.className = 'modal-class-btn';
    btn.dataset.cls = 'general';
    btn.style.setProperty('--cls-color', '#a0a0b0');
    btn.innerHTML = '<img loading="lazy" decoding="async" src="https://assets.modded-evolve.com/images/icons/generalicon.png" alt="General"><span>General</span>';
    btn.addEventListener('click', () => {
      if (_patchModalActiveClass === 'general') {
        _patchModalActiveClass = null;
        document.querySelectorAll('.modal-class-btn').forEach(b => b.classList.remove('active'));
        renderModalEntries(null);
      } else {
        showClassInModal('general');
      }
    });
    picker.appendChild(btn);
  }

  /* Show all entries on open */
  renderModalEntries(null);

  document.getElementById('patch-modal-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderModalEntries(filterCls) {
  const bodyTemp = document.createElement('div');
  bodyTemp.innerHTML = _patchModalEntry._bodyHTML;

  const charPicker = document.getElementById('patch-modal-char-picker');
  const detail = document.getElementById('patch-modal-char-detail');

  /* Get entries — filtered or all */
  let entries;
  if (filterCls) {
    entries = Array.from(bodyTemp.querySelectorAll('.sub-entry.cat-' + filterCls));
  } else {
    entries = Array.from(bodyTemp.querySelectorAll('.sub-entry'));
  }

  /* Only show char thumbnails when a class is selected */
  charPicker.innerHTML = '';
  if (filterCls) {
    const namedEntries = entries.filter(e => e.querySelector('.sub-char-name'));
    if (namedEntries.length > 0) {
      const meta = CLASS_META[filterCls] || { color: '#888' };
      namedEntries.forEach((entry, i) => {
        const nameEl = entry.querySelector('.sub-char-name');
        const name = nameEl ? nameEl.textContent.trim() : '';
        const thumb = CHAR_THUMBS[name] || '';
        const btn = document.createElement('button');
        btn.className = 'modal-char-btn';
        btn.style.setProperty('--cls-color', meta.color);
        btn.innerHTML = '<img loading="lazy" decoding="async" src="' + thumb + '" alt="' + name + '"><span>' + name + '</span>';
        btn.addEventListener('click', () => {
          const anchor = document.getElementById('modal-char-anchor-' + i);
          if (!anchor) return;
          const modal = document.getElementById('patch-modal');
          const header = document.getElementById('patch-modal-header');
          const classPicker = document.getElementById('patch-modal-class-picker');
          const charPicker = document.getElementById('patch-modal-char-picker');
          const stickyHeight = (header ? header.offsetHeight : 0)
                             + (classPicker ? classPicker.offsetHeight : 0)
                             + (charPicker ? charPicker.offsetHeight : 0);
          const modalRect = modal.getBoundingClientRect();
          const anchorRect = anchor.getBoundingClientRect();
          const scrollTo = modal.scrollTop + anchorRect.top - modalRect.top - stickyHeight;
          modal.scrollTo({ top: scrollTo, behavior: 'smooth' });
        });
        charPicker.appendChild(btn);
      });
      charPicker.classList.add('visible');
    } else {
      charPicker.classList.remove('visible');
    }
  } else {
    charPicker.classList.remove('visible');
  }

  /* Render entries */
  detail.innerHTML = '';
  const preface = bodyTemp.querySelector('.patch-preface');
  if (preface && (!filterCls || filterCls === 'general')) {
    detail.appendChild(preface.cloneNode(true));
  }
  let anchorIdx = 0;
  entries.forEach(entry => {
    if (entry.querySelector('.sub-char-name')) {
      const anchor = document.createElement('div');
      anchor.id = 'modal-char-anchor-' + anchorIdx;
      anchorIdx++;
      detail.appendChild(anchor);
    }
    detail.appendChild(entry.cloneNode(true));
  });

  /* Apply portrait tweaks */
  detail.querySelectorAll('.sub-portrait-col img.fullbody').forEach(img => {
    const name = img.getAttribute('alt');
    if (!name) return;
    const id = Object.keys(VL_NAMES).find(k => VL_NAMES[k] === name);
    if (id && VL_PORTRAITS[id]) { img.src = VL_PORTRAITS[id]; }
    else { const path = IMAGES.portraits[name]; if (path) img.src = path; }
    const tw = PH_PORTRAIT_TWEAKS[name] || {s:1.0, x:0, y:0};
    img.style.transform = 'translate(' + (tw.x||0) + '%, ' + (tw.y||0) + '%) scale(' + (tw.s||1.0) + ')' + (name === 'Elder Kraken' ? ' translateX(35px)' : '');
    img.style.transformOrigin = 'center center';
  });

  /* The image-loader leaves these cloned images stuck at opacity:0 (il-img with no
     il-done), since the clones are never finished by its observer. Fade them in once
     their src has loaded (or immediately if already cached). */
  detail.querySelectorAll('img.il-img:not(.il-done)').forEach(function(img){
    if (img.complete && img.naturalWidth > 0) { img.classList.add('il-done'); return; }
    img.addEventListener('load',  function(){ img.classList.add('il-done'); }, { once: true });
    img.addEventListener('error', function(){ img.classList.add('il-done'); }, { once: true });
  });

  detail.classList.add('visible');
  document.getElementById('patch-modal').scrollTop = 0;

  /* Apply number highlighting to modal content */
  detail.querySelectorAll('.change-list li').forEach(function(li) {
    applyRankStageTokens(li);
    highlightNumbers(li);
  });
}

function showClassInModal(cls) {
  _patchModalActiveClass = cls;
  document.querySelectorAll('.modal-class-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.cls === cls);
  });
  renderModalEntries(cls);
}

function closePatchModal(e) {
  if (e && e.target !== document.getElementById('patch-modal-overlay') && !e.target.closest('#patch-modal-close')) return;
  document.getElementById('patch-modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    if (document.getElementById('glossary-overlay').classList.contains('open')) { closeGlossary(); return; }
    document.getElementById('patch-modal-overlay').classList.remove('open');
    document.getElementById('char-history-overlay').classList.remove('open');
    document.body.style.overflow = '';
  }
});

function togglePatch(header) {
  openPatchModal(header.closest('.patch-entry'));
}

function toggleSub(header) {
  header.parentElement.classList.toggle('open');
}

function jumpToPatch(id) {
  const target = document.getElementById(id);
  if (!target) { document.addEventListener('patches:rendered', () => jumpToPatch(id), { once: true }); return; }
  // Scroll the history page into view first, then open the modal
  showPage('history');
  setTimeout(() => {
    openPatchModal(target);
  }, 50);
}

// ── GLOSSARY ──
const GLOSSARY = [
  { section: 'Movement', term: 'Sprint Speed', def: 'Movement speed while Sprinting<br><br>Hunter: Sprinting is when the Hunter holds the forward movement input without shooting<br><br>Monster: Sprinting is when the Monster holds the forward movement input without meleeing' },
  { section: 'Movement', term: 'Run Speed', def: 'Movement speed while Running<br><br>Hunter: Running is when the Hunter moves while shooting, or when they are moving in a direction they are not facing<br><br>Monster: Running is when the Monster moves while meleeing, or when they are moving in a direction they are not facing' },
  { section: 'Movement', term: 'Walk Speed', def: 'The slowest movement state<br><br>Only achievable on controller by lightly pushing the analog stick forward<br><br>Not possible on PC as keyboard input does not support gradual input' },
  { section: 'Movement', term: 'Max Speed', def: 'The maximum allowed movement speed regardless of movement state' },
  { section: 'Traversal / Stamina', term: 'Height Boundary', def: 'The altitude limit above which Kraken and Elder Kraken are unable to burst upward' },
  { section: 'Traversal / Stamina', term: 'Drag Coefficient', def: 'The drag force, or air resistance, acting against Kraken and Elder Kraken while they are airborne' },
  { section: 'Traversal / Stamina', term: 'Gravity Growth Rate', def: 'The rate at which the strength of gravity increases the longer Kraken and Elder Kraken remain airborne' },
  { section: 'Traversal / Stamina', term: 'Extra Drag Above Boundary', def: 'The amount of additional air resistance applied to Kraken and Elder Kraken above the altitude limit' },
  { section: 'Traversal / Stamina', term: 'Automatic Descent To Boundary Acceleration', def: 'The acceleration at which Kraken and Elder Kraken descend toward the altitude limit when above it' },
  { section: 'Traversal / Stamina', term: 'Automatic Descent To Boundary Max Speed', def: 'The maximum descent speed of Kraken and Elder Kraken when above the altitude limit' },
  { section: 'Weapon', term: 'Effective Cone Angle', def: 'The angle within which the Repulsor is considered effective' },
  { section: 'Weapon', term: 'Arm Time', def: 'The time before an item becomes active after being placed' },
  { section: 'Weapon', term: 'Homing Delay', def: 'The delay before a projectile homes in on its target' },
  { section: 'Weapon', term: 'Spawn Delay', def: 'The delay before an ability is spawned after being cast' },
  { section: 'Weapon', term: 'Growth Rate', def: 'The rate at which the radius of an ability grows over time' },
  { section: 'Weapon', term: 'Update Tick Frequency', def: 'Controls how the damage or healing of an ability is distributed over time<br><br>The total damage or healing per second remains constant regardless of the frequency<br><br>Damage:<br><br>A lower value distributes the damage into more frequent, smaller instances<br><br>A higher value distributes the damage into less frequent, larger instances<br><br>Healing:<br><br>A lower value distributes the healing into less frequent, larger instances<br><br>A higher value distributes the healing into more frequent, smaller instances' },
  { section: 'Weapon', term: 'Strict Homing Range', def: 'Unknown effect<br><br>No observable impact found despite testing' },
  { section: 'Weapon', term: 'Minimum Fly Clearance', def: 'Unknown effect<br><br>No observable impact found despite testing' },
  { section: 'Weapon', term: 'Aim State', def: 'The duration of the aiming phase of Lightning Strike, during which the player can move and position the ability' },
  { section: 'Weapon', term: 'Strike Delay', def: 'The delay between the end of the Aim State and the actual lightning strike hitting the ground' },
  { section: 'Weapon', term: 'Maintain Angle', def: 'The maximum angle a beam can be held at before it disconnects from the target' },
  { section: 'Weapon', term: 'Acceleration Direction', def: 'How quickly Behemoth accelerates toward a new direction when changing movement input while rolling' },
  { section: 'Healing / Shield', term: 'Maximum Hunter Shield', def: 'Maximum total shield: 800 for most Hunters and 1,000 for Lennox, regardless of source' },
  { section: 'Healing / Shield', term: 'Normal Healing', def: 'The amount of healing applied to hunters who are not incapacitated' },
  { section: 'Healing / Shield', term: 'Incapacitated Healing', def: 'The amount of healing applied to hunters who are incapacitated' },
  { section: 'Spread', term: 'Minimum Spread', def: 'Minimum spread a gun can have' },
  { section: 'Spread', term: 'Maximum Spread', def: 'Maximum spread the gun can reach' },
  { section: 'Spread', term: 'Attack Spread', def: 'How much spread is gained per shot fired' },
  { section: 'Spread', term: 'Spread Decay', def: 'How fast spread decays to minimum after the cooldown window expires' },
  { section: 'Spread', term: 'Movement Spread', def: 'Multiplier that increases spread based on movement' },
  { section: 'Spread', term: 'Jump Spread', def: 'Multiplier that increases spread when jumping' },
  { section: 'Spread', term: 'Jetpack Spread', def: 'Multiplier that increases spread when using jetpack — sustains max spread for entire duration of being airborne, returns to minimum on landing' },
  { section: 'Spread', term: 'Rotation Spread', def: 'Unknown effect<br><br>No observable impact found despite extreme values' },
  { section: 'Spread', term: 'Radial Falloff Exponent', def: 'Unknown effect<br><br>No observable impact found despite extreme values' },
  { section: 'Spread', term: 'Cooldown Time', def: 'The duration of Phase 1 decay after stopping fire<br><br>During this phase, spread decays at the rate defined by Decay During Cooldown rather than the default Spread Decay rate' },
  { section: 'Spread', term: 'Decay During Cooldown', def: 'How fast spread decays during the first decay phase<br><br>Once Cooldown Time expires, the spread switches to decaying at the default Spread Decay rate' },
  { section: 'Aim Down Sights Modifiers', term: 'Aim Down Sights Modifiers', def: 'These are multipliers applied to their respective base spread values while aiming down sights<br><br>A value of 1 means no change, 0 removes the effect entirely while aiming, and values above 1 amplify it' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Minimum Spread Modifier', def: 'Multiplier applied to Minimum Spread while aiming down sights' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Maximum Spread Modifier', def: 'Multiplier applied to Maximum Spread while aiming down sights' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Attack Spread Modifier', def: 'Multiplier applied to Attack Spread while aiming down sights' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Spread Decay Modifier', def: 'Multiplier applied to Spread Decay while aiming down sights' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Movement Spread Modifier', def: 'Multiplier applied to Movement Spread while aiming down sights' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Rotation Spread Modifier', def: 'Multiplier applied to Rotation Spread while aiming down sights' },
  { section: 'Aim Down Sights Modifiers', term: 'ADS Jump Spread Modifier', def: 'Multiplier applied to Jump Spread while aiming down sights' },
  { section: 'Miscellaneous', term: 'Monster Senses', def: 'Smell: 60 meters; automatic Hunter detection: 20 meters; hearing: up to 50 meters' },
  { section: 'Miscellaneous', term: 'Weapon Swap Time', def: 'Varies by weapon and character; there is no single base swap time' },
  { section: 'Miscellaneous', term: 'Energy', def: 'The resource monsters gain by eating other organisms<br><br>As Energy accumulates it fills the Evolve Meter, allowing the monster to evolve to the next stage' },
  { section: 'Miscellaneous', term: 'Battery Weapon', def: 'A type of Hunter weapon that uses beams<br><br>Reloads without an animation but has a reload delay after the battery is depleted' },
  { section: 'Miscellaneous', term: 'Gun Weapon', def: 'A type of Hunter weapon that fires bullets<br><br>Has a reload animation but no reload delay' },
];

// The source list above remains unchanged; the dialog builds on first use.
let glossaryBuilt = false;
let glossaryCategory = 'All';
let glossaryReturnFocus = null;
let glossaryIndex = [];

function buildGlossary() {
  if (glossaryBuilt) return;
  const container = document.getElementById('glossary-content');
  const filters = document.getElementById('glossary-filters');
  const grouped = new Map();
  GLOSSARY.forEach(entry => {
    if (!grouped.has(entry.section)) grouped.set(entry.section, []);
    grouped.get(entry.section).push(entry);
  });

  ['All', ...grouped.keys()].forEach(section => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'glossary-filter' + (section === 'All' ? ' active' : '');
    button.textContent = section;
    button.setAttribute('aria-pressed', String(section === 'All'));
    button.addEventListener('click', () => {
      glossaryCategory = section;
      filters.querySelectorAll('.glossary-filter').forEach(el => {
        const selected = el === button;
        el.classList.toggle('active', selected);
        el.setAttribute('aria-pressed', String(selected));
      });
      filterGlossary();
    });
    filters.appendChild(button);
  });

  grouped.forEach((entries, section) => {
    // Site-wide section styles apply to <section>, so use an ordinary div.
    const wrapper = document.createElement('div');
    wrapper.className = 'glossary-section';
    wrapper.dataset.section = section;
    const heading = document.createElement('h3');
    heading.className = 'glossary-section-title';
    heading.appendChild(document.createTextNode(section));
    const count = document.createElement('span');
    count.className = 'glossary-section-count';
    heading.appendChild(count);
    const grid = document.createElement('div');
    grid.className = 'glossary-grid';
    wrapper.append(heading, grid);
    container.appendChild(wrapper);

    entries.forEach(entry => {
      const card = document.createElement('article');
      card.className = 'glossary-entry';
      const title = document.createElement('h4');
      title.className = 'glossary-term';
      title.textContent = entry.term;
      card.appendChild(title);
      const segments = entry.def.split(/<br\s*\/?>(?:\s*<br\s*\/?>)+/i)
        .map(text => text.replace(/<br\s*\/?>/gi, '\n').trim()).filter(Boolean);
      const short = document.createElement('p');
      short.className = 'glossary-def';
      short.textContent = segments[0] || '';
      card.appendChild(short);
      let details = null;
      if (segments.length > 1) {
        details = document.createElement('details');
        details.className = 'glossary-details';
        const summary = document.createElement('summary');
        summary.textContent = 'More details';
        const more = document.createElement('div');
        more.className = 'glossary-def';
        segments.slice(1).forEach((part, index) => {
          if (index) more.appendChild(document.createElement('br'));
          const para = document.createElement('p');
          para.textContent = part;
          para.style.marginBottom = index === segments.length - 2 ? '0' : '.55rem';
          more.appendChild(para);
        });
        details.append(summary, more);
        card.appendChild(details);
      }
      grid.appendChild(card);
      glossaryIndex.push({ section, card, preview: (entry.term + ' ' + segments[0]).toLowerCase(),
        extra: segments.slice(1).join(' ').toLowerCase(),
        full: (section + ' ' + entry.term + ' ' + segments.join(' ')).toLowerCase(), details });
    });
  });
  glossaryBuilt = true;
  filterGlossary();
}

function toggleGlossary() {
  const overlay = document.getElementById('glossary-overlay');
  if (overlay.classList.contains('open')) { closeGlossary(); return; }
  glossaryReturnFocus = document.activeElement;
  buildGlossary();
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.querySelector('.glossary-toggle-btn').setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  document.getElementById('glossary-search').focus();
}

function closeGlossary(event) {
  const overlay = document.getElementById('glossary-overlay');
  if (event && event.target !== overlay) return; // Only backdrop clicks close it.
  if (!overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  overlay.setAttribute('aria-hidden', 'true');
  document.querySelector('.glossary-toggle-btn').setAttribute('aria-expanded', 'false');
  if (!document.querySelector('#patch-modal-overlay.open, #char-history-overlay.open')) document.body.style.overflow = '';
  if (glossaryReturnFocus && glossaryReturnFocus.isConnected) glossaryReturnFocus.focus();
}

function clearGlossarySearch() {
  const search = document.getElementById('glossary-search');
  search.value = '';
  filterGlossary();
  search.focus();
}

function filterGlossary(query) {
  if (!glossaryBuilt) return;
  const q = String(query === undefined ? document.getElementById('glossary-search').value : query).trim().toLowerCase();
  document.getElementById('glossary-clear').hidden = !q;
  let visible = 0;
  document.querySelectorAll('.glossary-section').forEach(group => {
    const matchesSection = glossaryCategory === 'All' || group.dataset.section === glossaryCategory;
    let groupCount = 0;
    glossaryIndex.filter(item => item.section === group.dataset.section).forEach(item => {
      const match = matchesSection && (!q || item.full.includes(q));
      item.card.hidden = !match;
      if (match) {
        groupCount++;
        visible++;
        // Reveal hidden paragraphs when those are the part that matched the search.
        if (item.details && q) item.details.open = !item.preview.includes(q) && item.extra.includes(q);
        else if (item.details && !q) item.details.open = false;
      }
    });
    group.hidden = groupCount === 0;
    group.querySelector('.glossary-section-count').textContent = groupCount + ' terms';
  });
  document.getElementById('glossary-empty').hidden = visible !== 0;
  document.getElementById('glossary-result-count').textContent = `${visible} ${visible === 1 ? 'term' : 'terms'}${glossaryCategory === 'All' ? '' : ' in ' + glossaryCategory}`;
}

// Keep keyboard navigation inside the open dialog, and close on Escape.
document.getElementById('glossary-overlay').addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeGlossary(); return; }
  if (event.key !== 'Tab') return;
  const dialog = document.getElementById('glossary-dialog');
  const focusables = [...dialog.querySelectorAll('button:not([hidden]),input:not([disabled]),summary,[tabindex="0"]')]
    .filter(el => el.getClientRects().length && !el.closest('[hidden]'));
  const first = focusables[0], last = focusables[focusables.length - 1];
  if (!first) return;
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

function showSystemsTab(tab) {
  document.querySelectorAll('.systems-content').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.systems-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('systems-' + tab).classList.add('active');
  event.target.classList.add('active');
}

function updateSidebarActive() {
  const open = document.querySelector('.patch-entry.open');
  const openId = open ? open.id : null;
  document.querySelectorAll('.patch-sidebar-btn').forEach(btn => {
    const match = btn.getAttribute('onclick').match(/([']+)/);
    const id = btn.getAttribute('onclick').replace("jumpToPatch('", '').replace("')", '');
    btn.classList.toggle('active', id === openId);
  });
}

function searchHistory(query) {
  const q = query.trim().toLowerCase();
  if (!q) {
    document.querySelectorAll('.change-list li').forEach(li => li.classList.remove('hidden-by-search'));
    document.querySelectorAll('.sub-entry').forEach(s => { s.style.display = ''; });
    document.querySelectorAll('.patch-entry').forEach(e => { e.style.display = ''; e.classList.remove('open'); });
    document.querySelector('.patch-list-grid').classList.remove('search-active');
    updateSidebarActive();
    return;
  }
  const grid = document.querySelector('.patch-list-grid');
  grid.classList.add('search-active');
  document.querySelectorAll('.patch-entry').forEach(entry => {
    let entryMatch = false;
    entry.querySelectorAll('.sub-entry').forEach(sub => {
      const nameEl = sub.querySelector('.sub-char-name');
      const nameMatch = nameEl && nameEl.textContent.trim().toLowerCase().includes(q);
      let abilityNameMatch = false;
      sub.querySelectorAll('.ability-name').forEach(a => {
        if (a.textContent.toLowerCase().includes(q)) abilityNameMatch = true;
      });
      const subMatch = nameMatch || abilityNameMatch;
      sub.style.display = subMatch ? '' : 'none';
      if (subMatch) entryMatch = true;
    });
    entry.style.display = entryMatch ? '' : 'none';
    if (entryMatch) entry.classList.add('open'); else entry.classList.remove('open');
  });
  updateSidebarActive();
}

function filterClass(cls, btn) {
  const clsColors = { monster:'#8b1a1a', assault:'#ab2d16', medic:'#387672', support:'#c87a05', trapper:'#807921', all:'#8b1a1a' };
  document.querySelectorAll('.char-card').forEach(c => c.style.display = 'none');
  document.querySelectorAll('.char-roster-pick .mh-class').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  const subnav = document.getElementById('char-subnav');
  subnav.innerHTML = '';
  subnav.style.setProperty('--cls-color', clsColors[cls] || '#8b1a1a');
  if (cls === 'all') {
    document.querySelectorAll('.char-card').forEach(c => c.style.display = 'block');
    subnav.classList.remove('visible');
    return;
  }
  const cards = document.querySelectorAll('.char-card[data-class="' + cls + '"]');
  if (!cards.length) { subnav.classList.remove('visible'); return; }
  let firstBtn = null;
  cards.forEach((card, i) => {
    const b = document.createElement('button');
    b.className = 'char-btn';
    b.textContent = card.dataset.name || 'Character';
    b.onclick = () => showChar(card, b);
    subnav.appendChild(b);
    if (i === 0) firstBtn = b;
  });
  subnav.classList.add('visible');
  if (firstBtn) firstBtn.click();
}

function showChar(card, btn) {
  document.querySelectorAll('.char-card').forEach(c => c.style.display = 'none');
  card.style.display = 'block';
  document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  applyImages();
  buildSkinsStrip(card);
  window.scrollTo({ top: document.getElementById('characters').offsetTop - 70, behavior: 'smooth' });
}

document.querySelectorAll('a[onclick]').forEach(a => a.addEventListener('click', e => e.preventDefault()));

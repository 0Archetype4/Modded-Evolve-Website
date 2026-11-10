/* ============================================================
   VOICE LINES PAGE — THEATRE MODE
   ============================================================ */
let vlAudio = new Audio();
vlAudio.volume = 0.3;
let vlQueue = [], vlQueueIdx = 0, vlLoop = false;
let vlActiveSource = null, vlActiveCharFilter = null, vlSearchVal = '';
let vlCurrentConv = null, vlLastPlayedId = null;

vlAudio.addEventListener('timeupdate', () => {
  if (!vlAudio.duration) return;
  const pct = vlAudio.currentTime / vlAudio.duration * 100;
  const fill = document.getElementById('vl-progress-fill');
  const time = document.getElementById('vl-ctrl-time');
  if (fill) fill.style.width = pct + '%';
  if (time) time.textContent = vlFmt(vlAudio.currentTime) + ' / ' + vlFmt(vlAudio.duration);
});

vlAudio.addEventListener('ended', () => {
  if (vlLoop) { vlAudio.play(); return; }
  if (vlQueueIdx < vlQueue.length - 1) {
    vlQueueIdx++;
    vlPlayFile(vlQueue[vlQueueIdx].file, vlQueue[vlQueueIdx].char, vlQueue[vlQueueIdx].path);
  } else {
    const pb = document.getElementById('vl-btn-play');
    if (pb) pb.textContent = '▶';
  }
});

vlAudio.addEventListener('error', () => {
  const sub = document.getElementById('vl-sub-text');
  if (sub && vlQueue[vlQueueIdx]) sub.textContent = '[File not found: ' + vlQueue[vlQueueIdx].file + ']';
});

function vlPlayFile(filename, charKey, pathOverride) {
  vlAudio.pause();
  const filePath = pathOverride || VL_FILE_PATHS[filename.toLowerCase()] || filename.toLowerCase();
  vlAudio.src = 'https://assets.modded-evolve.com/audio/hunterdialogue/' + filePath + '.wav';
  vlAudio.play().catch(() => {});
  const pb = document.getElementById('vl-btn-play');
  if (pb) pb.textContent = '▐▐';
  const color = VL_COLORS[charKey] || '#ab2d16';
          const subChar = document.getElementById('vl-sub-char');
          const subText = document.getElementById('vl-sub-text');
          if (subChar) { subChar.textContent = ''; subChar.style.display = 'none'; }
          if (subText) {
            var _st = (typeof VL_SUBTITLES !== 'undefined' && VL_SUBTITLES[filename]) ? VL_SUBTITLES[filename] : null;
            var _nm = (VL_NAMES[charKey] || charKey);
            var _body = _st || '';
            subText.innerHTML = '';
            var _ns = document.createElement('span');
            _ns.className = 'vl-sub-name';
            _ns.style.color = color;
            _ns.textContent = _nm + ': ';
            subText.appendChild(_ns);
            subText.appendChild(document.createTextNode(_body));
          }
  // Progress bar colour matches speaker
  const progressFill = document.getElementById('vl-progress-fill');
  if (progressFill) progressFill.style.setProperty('--vl-speaker-color', color);
  // Volume slider colour matches speaker
  const volSlider = document.getElementById('vl-volume');
  if (volSlider) {
    volSlider.style.setProperty('--vl-speaker-color', color);
    volSlider.style.setProperty('--vol-pct', Math.round(vlAudio.volume * 100) + '%');
  }
  // Spotlight actor
  document.querySelectorAll('.vl-actor').forEach(el => {
    el.classList.toggle('speaking', el.dataset.char === charKey);
  });
  // Highlight line
  document.querySelectorAll('.vl-conv-line').forEach(el => {
    el.classList.toggle('playing', el.dataset.file === filename);
  });
}

function vlTogglePlay() {
  const pb = document.getElementById('vl-btn-play');
  if (vlAudio.paused) { vlAudio.play(); if (pb) pb.textContent = '▐▐'; }
  else { vlAudio.pause(); if (pb) pb.textContent = '▶'; }
}
function vlPlayNext() {
  if (vlQueueIdx < vlQueue.length - 1) { vlQueueIdx++; vlPlayFile(vlQueue[vlQueueIdx].file, vlQueue[vlQueueIdx].char, vlQueue[vlQueueIdx].path); }
}
function vlPlayPrev() {
  if (vlQueueIdx > 0) { vlQueueIdx--; vlPlayFile(vlQueue[vlQueueIdx].file, vlQueue[vlQueueIdx].char, vlQueue[vlQueueIdx].path); }
}
function vlToggleLoop() {
  vlLoop = !vlLoop;
  const b = document.getElementById('vl-btn-loop');
  if (b) b.classList.toggle('active', vlLoop);
}
function vlSetVolume(val) {
  vlAudio.volume = parseFloat(val);
  const icon = document.querySelector('.vl-vol-icon');
  if (icon) icon.textContent = parseFloat(val) === 0 ? '🔇' : parseFloat(val) < 0.5 ? '🔉' : '🔊';
  const volSlider = document.getElementById('vl-volume');
  if (volSlider) volSlider.style.setProperty('--vol-pct', Math.round(parseFloat(val) * 100) + '%');
}
function vlToggleMute() {
  const slider = document.getElementById('vl-volume');
  if (vlAudio.volume > 0) {
    vlAudio._prevVol = vlAudio.volume;
    vlAudio.volume = 0;
    if (slider) slider.value = 0;
  } else {
    vlAudio.volume = vlAudio._prevVol || 1;
    if (slider) slider.value = vlAudio.volume;
  }
  vlSetVolume(vlAudio.volume);
}
function vlFmt(s) {
  if (!s || isNaN(s)) return '0:00';
  return Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
}

function vlBuildStage(conv) {
  const stage = document.getElementById('vl-stage');
  const theatre = document.getElementById('vl-theatre');
  const titleEl = document.getElementById('vl-theatre-title');
  if (!stage || !theatre) return;

  // Set title
  if (titleEl) {
    const labelEl = document.querySelector('[data-conv-label="' + conv.id + '"]');
    titleEl.textContent = (labelEl && labelEl.textContent.trim()) || conv.label;
  }
  const uniqueChars = [...new Set(conv.lines.map(l => l.char))];
  stage.innerHTML = '';
  for (const ch of uniqueChars) {
    const actor = document.createElement('div');
    actor.className = 'vl-actor';
    actor.dataset.char = ch;
    actor.style.setProperty('--vl-actor-color', VL_COLORS[ch] || '#ab2d16');
    const img = document.createElement('img');
    img.src = VL_PORTRAITS[ch] || '';
    img.alt = VL_NAMES[ch] || ch;
    const tw = VL_PORTRAIT_TWEAKS[ch] || {s:1.0, x:0, y:0};
    img.style.transform = 'translate(' + (tw.x||0) + '%, ' + (tw.y||0) + '%) scale(' + (tw.s||1.0) + ')';
    img.style.transformOrigin = 'center center';
    img.onerror = function() { this.parentElement.style.background = '#0a0a0a'; this.style.display = 'none'; };
    const glow = document.createElement('div');
    glow.className = 'vl-actor-glow';
    actor.appendChild(img);
    actor.appendChild(glow);
    stage.appendChild(actor);
  }
  theatre.classList.add('active');
}

function vlBuildTabs() {
  const tabs = document.getElementById('vl-source-tabs');
  if (!tabs) return;
  tabs.innerHTML = '';

  const groups = [
    { key:'story',      label:'Story Scenes',           color:'#867088' },
    { key:'dropship',   label:'Dropship',               color:'#ab2d16' },
    { key:'armory',     label:'Map: Armory',            color:'#c87a05' },
    { key:'aviary',     label:'Map: Aviary',            color:'#c87a05' },
    { key:'barracks',   label:'Map: Barracks',          color:'#c87a05' },
    { key:'medlab',     label:'Map: Medlab',            color:'#c87a05' },
    { key:'distillery', label:'Map: Distillery',        color:'#c87a05' },
    { key:'finale',     label:'Map: Finale',            color:'#c87a05' },
  ];

  for (const g of groups) {
    const btn = document.createElement('button');
    btn.className = 'vl-source-tab' + (g.key === vlActiveSource ? ' active' : '');
    btn.dataset.src = g.key;
    btn.style.setProperty('--vl-tab-color', g.color);
    btn.textContent = g.label;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.vl-source-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      vlActiveSource = g.key;
      vlClearTheatre();
      vlRenderConvs();
    });
    tabs.appendChild(btn);
  }
}

function vlExitTheatre() {
  if (vlCurrentConv) vlLastPlayedId = vlCurrentConv.id;
  vlAudio.pause();
  vlAudio.currentTime = 0;
  vlClearTheatre();
  document.querySelectorAll('.vl-conv-card').forEach(c => c.classList.remove('active-conv', 'open'));
  // Update last-played indicator
  document.querySelectorAll('.vl-conv-card').forEach(c => {
    c.classList.toggle('last-played', c.dataset.convId === vlLastPlayedId);
  });
}

function vlClearTheatre() {
  vlCurrentConv = null;
  vlAudio.pause();
  const theatre = document.getElementById('vl-theatre');
  const stage = document.getElementById('vl-stage');
  const main = document.querySelector('.vl-main');
  if (theatre) theatre.classList.remove('active');
  if (stage) stage.innerHTML = '';
  if (main) main.classList.remove('theatre-active');
  const subText = document.getElementById('vl-sub-text');
  if (subText) subText.textContent = 'Select a conversation below and press Play All';
}

function vlSelectSource(src) {
  vlActiveSource = src;
  vlActiveCharFilter = null;
  vlClearTheatre();
  document.querySelectorAll('.vl-char-btn[data-src]').forEach(b => b.classList.remove('active'));
  const btn = document.querySelector('.vl-char-btn[data-src="' + src + '"]');
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.vl-char-btn[data-filter-char]').forEach(b => b.classList.remove('active'));
  const allBtn = document.getElementById('vl-filter-all');
  if (allBtn) allBtn.classList.add('active');
  vlRenderConvs();
}

function vlFilterChar(charKey) {
  vlActiveCharFilter = charKey;
  vlClearTheatre();
  document.querySelectorAll('.vl-char-btn[data-filter-char]').forEach(b => b.classList.remove('active'));
  const allBtn = document.getElementById('vl-filter-all');
  if (!charKey) { if (allBtn) allBtn.classList.add('active'); }
  else {
    const btn = document.querySelector('.vl-char-btn[data-filter-char="' + charKey + '"]');
    if (btn) btn.classList.add('active');
    if (allBtn) allBtn.classList.remove('active');
  }
  vlRenderConvs();
}

function vlRenderConvs() {
  const area = document.getElementById('vl-content');
  if (!area) return;

  let convs = VL_CONVS;
  const npcKeys = ['science agent','colony technician 3','ebonstarlieutenant','ebonstarpilot'];
  if (vlActiveCharFilter === 'NPC') {
    convs = convs.filter(c => c.chars.some(ch => npcKeys.includes(ch)));
  } else if (vlActiveCharFilter) {
    convs = convs.filter(c => c.chars.includes(vlActiveCharFilter));
  }
  if (vlSearchVal) {
    const s = vlSearchVal.toLowerCase();
    convs = convs.filter(c => c.label.toLowerCase().includes(s) || c.chars.some(ch => (VL_NAMES[ch]||ch).toLowerCase().includes(s)));
  }

  area.innerHTML = '';

  const filterRow = document.createElement('div');
  filterRow.style.cssText = 'display:flex;gap:0.4rem;flex-wrap:wrap;padding:1rem 1.5rem 0.5rem;';
  const activeColor = '#867088';

  const allBtn = document.createElement('button');
  allBtn.style.cssText = 'padding:0.3rem 0.85rem;border:1px solid ' + (!vlActiveCharFilter ? activeColor : '#2a2a2a') + ';background:' + (!vlActiveCharFilter ? activeColor+'22' : '#000') + ';color:' + (!vlActiveCharFilter ? activeColor : '#555') + ';font-family:var(--font-body);font-size:0.65rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border-radius:var(--radius);cursor:pointer;';
  allBtn.textContent = 'All';
  allBtn.addEventListener('click', () => { vlActiveCharFilter = null; vlClearTheatre(); vlRenderConvs(); });
  filterRow.appendChild(allBtn);

  const npcActive = vlActiveCharFilter === 'NPC';
  const npcBtn = document.createElement('button');
  npcBtn.style.cssText = 'padding:0.3rem 0.85rem;border:1px solid ' + (npcActive ? activeColor : '#2a2a2a') + ';background:' + (npcActive ? activeColor+'22' : '#000') + ';color:' + (npcActive ? activeColor : '#555') + ';font-family:var(--font-body);font-size:0.65rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border-radius:var(--radius);cursor:pointer;';
  npcBtn.textContent = 'NPC';
  npcBtn.addEventListener('click', () => { vlActiveCharFilter = 'NPC'; vlClearTheatre(); vlRenderConvs(); });
  filterRow.appendChild(npcBtn);

  const charOrder = ['markov','hyde','parnell','torvald','lennox','maggie','griffin','abe','crow','scrap','hank','bucket','cabot','sunny','tech','val','lazarus','caira','slim','emet'];
  for (const ck of charOrder) {
    const col = VL_COLORS[ck] || '#555';
    const isActive = vlActiveCharFilter === ck;
    const fb = document.createElement('button');
    fb.style.cssText = 'padding:0.3rem 0.85rem;border:1px solid ' + (isActive ? col : '#2a2a2a') + ';background:' + (isActive ? col+'22' : '#000') + ';color:' + (isActive ? col : '#555') + ';font-family:var(--font-body);font-size:0.65rem;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;border-radius:var(--radius);cursor:pointer;';
    fb.textContent = VL_NAMES[ck] || ck;
    fb.addEventListener('click', () => { vlActiveCharFilter = ck; vlClearTheatre(); vlRenderConvs(); });
    filterRow.appendChild(fb);
  }
  area.appendChild(filterRow);

  // Group convs into sections
  const sections = [
    { label: 'Story Scenes',        filter: c => c.id.startsWith('s') },
    { label: 'Dropship',            filter: c => c.id.startsWith('dropship') },
    { label: 'Map Conversations',   filter: c => !c.id.startsWith('s') && !c.id.startsWith('dropship') },
  ];

  let globalIdx = 0;

  for (const section of sections) {
    const sectionConvs = convs.filter(section.filter);
    if (!sectionConvs.length) continue;

    const sectionEl = document.createElement('div');
    sectionEl.className = 'vl-row-section';

    const labelEl = document.createElement('div');
    labelEl.className = 'vl-row-label';
    labelEl.textContent = section.label + ' (' + sectionConvs.length + ')';
    sectionEl.appendChild(labelEl);

    const rowEl = document.createElement('div');
    rowEl.className = 'vl-row-scroll';

    for (const conv of sectionConvs) {
      const card = document.createElement('div');
      card.className = 'vl-conv-card';
      card.id = 'vlconv-' + conv.id;
      card.dataset.convId = conv.id;
      if (vlLastPlayedId === conv.id) card.classList.add('last-played');

      // Faint portrait background
      const uniqueChars = [...new Set(conv.lines.map(l => l.char))];
      if (uniqueChars[0] && VL_PORTRAITS[uniqueChars[0]]) {
        const bg = document.createElement('div');
        bg.className = 'vl-card-bg';
        bg.style.backgroundImage = 'url(' + VL_PORTRAITS[uniqueChars[0]] + ')';
        card.appendChild(bg);
      }

      // Large faded index number
      const numEl = document.createElement('div');
      numEl.className = 'vl-card-num';
      numEl.textContent = String(globalIdx + 1).padStart(2,'0');
      card.appendChild(numEl);

      // Header
      const header = document.createElement('div');
      header.className = 'vl-conv-header';

      const headerTop = document.createElement('div');
      headerTop.className = 'vl-conv-header-top';

      const title = document.createElement('div');
      title.className = 'vl-conv-title';
      const labelEl2 = document.querySelector('[data-conv-label="' + conv.id + '"]');
      title.textContent = (labelEl2 && labelEl2.textContent.trim()) || conv.label;
      title.title = 'ID: ' + conv.id;

      const copyBtn = document.createElement('button');
      copyBtn.style.cssText = 'background:none;border:1px solid #2a2a2a;border-radius:3px;color:#444;font-size:0.55rem;padding:1px 5px;cursor:pointer;flex-shrink:0;font-family:var(--font-body);letter-spacing:0.05em;transition:all 0.15s;';
      copyBtn.textContent = 'ID';
      copyBtn.title = 'Copy conversation ID';
      copyBtn.addEventListener('click', e => {
        e.stopPropagation();
        navigator.clipboard.writeText(conv.id).then(() => {
          copyBtn.textContent = '✓';
          copyBtn.style.color = '#387672';
          copyBtn.style.borderColor = '#387672';
          setTimeout(() => { copyBtn.textContent = 'ID'; copyBtn.style.color = '#444'; copyBtn.style.borderColor = '#2a2a2a'; }, 1500);
        });
      });

      const playAll = document.createElement('button');
      playAll.className = 'vl-play-conv-btn';
      playAll.textContent = '▶';
      playAll.style.marginLeft = 'auto';
      playAll.title = 'Play All';

      headerTop.appendChild(title);
      headerTop.appendChild(playAll);
      header.appendChild(headerTop);

      // Thumbnails
      const thumbStrip = document.createElement('div');
      thumbStrip.className = 'vl-conv-thumbs';
      for (const ch of uniqueChars) {
        if (!VL_THUMBS[ch]) continue;
        const timg = document.createElement('img');
        timg.className = 'vl-conv-thumb';
        timg.loading = 'lazy';
        timg.decoding = 'async';
        timg.src = VL_THUMBS[ch];
        timg.alt = VL_NAMES[ch] || ch;
        timg.title = VL_NAMES[ch] || ch;
        timg.onerror = function() { this.style.display='none'; };
        thumbStrip.appendChild(timg);
      }
      header.appendChild(thumbStrip);

      playAll.addEventListener('click', e => {
        e.stopPropagation();
        card.classList.add('open');
        vlCurrentConv = conv;
        vlBuildStage(conv);
        vlQueue = conv.lines.map(l => ({ file: l.file, char: l.char, path: l._path || null }));
        vlQueueIdx = 0;
        if (vlQueue.length) vlPlayFile(vlQueue[0].file, vlQueue[0].char);
        document.querySelectorAll('.vl-conv-card').forEach(c => c.classList.remove('active-conv'));
        card.classList.add('active-conv');
        document.querySelector('.vl-main')?.classList.add('theatre-active');
      });

      header.addEventListener('click', () => card.classList.toggle('open'));

      const linesEl = document.createElement('div');
      linesEl.className = 'vl-conv-lines';
      for (const l of conv.lines) {
        const line = document.createElement('div');
        line.className = 'vl-conv-line';
        line.dataset.file = l.file;
        const charSpan = document.createElement('span');
        charSpan.className = 'vl-conv-char';
        charSpan.style.color = VL_COLORS[l.char] || '#ab2d16';
        charSpan.textContent = VL_NAMES[l.char] || l.char;
        const fileSpan = document.createElement('span');
        fileSpan.className = 'vl-conv-file';
        fileSpan.textContent = l.file;
        const pb = document.createElement('button');
        pb.className = 'vl-play-btn';
        pb.textContent = '▶';
        line.appendChild(charSpan);
        line.appendChild(fileSpan);
        line.appendChild(pb);
        if (l.variants && l.variants.length) {
          const varWrap = document.createElement('div');
          varWrap.style.cssText = 'display:flex;gap:3px;margin-left:4px;flex-shrink:0;';
          l.variants.forEach(v => {
            const vbtn = document.createElement('button');
            vbtn.className = 'vl-play-btn';
            vbtn.style.cssText = 'width:18px;height:18px;font-size:0.45rem;opacity:0.55;flex-shrink:0;';
            vbtn.title = v.file;
            vbtn.textContent = v.label;
            vbtn.addEventListener('click', e => { e.stopPropagation(); vlPlayFile(v.file, l.char); });
            varWrap.appendChild(vbtn);
          });
          line.appendChild(varWrap);
        }
        line.addEventListener('click', () => {
          if (!vlCurrentConv || vlCurrentConv.id !== conv.id) {
            vlCurrentConv = conv;
            vlBuildStage(conv);
            document.querySelectorAll('.vl-conv-card').forEach(c => c.classList.remove('active-conv'));
            card.classList.add('active-conv');
            document.querySelector('.vl-main')?.classList.add('theatre-active');
          }
          vlQueue = conv.lines.map(li => ({ file: li.file, char: li.char }));
          vlQueueIdx = conv.lines.indexOf(l);
          vlPlayFile(l.file, l.char, l._path || null);
        });
        linesEl.appendChild(line);
      }

      card.appendChild(header);
      card.appendChild(linesEl);
      rowEl.appendChild(card);
      globalIdx++;
    }

    sectionEl.appendChild(rowEl);
    area.appendChild(sectionEl);
  }

  // Stagger cards into view using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('card-visible'), i * 40);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.vl-conv-card').forEach(card => observer.observe(card));
}

function vlOnSearch(val) { vlSearchVal = val; vlRenderConvs(); }

let vlPageInitialized = false;
function vlInitPage() {
  if (vlPageInitialized) return;
  vlPageInitialized = true;
  vlActiveSource = 'story';
  vlBuildTabs();
  vlRenderConvs();
}

/* ============================================================
   SKINS CAROUSEL
   ============================================================ */
// Per-monster thumbnail focal point overrides (transform-origin). Default is 'center 10%'.
const MONSTER_THUMB_ORIGIN = { 'Gorgon': '20% 80%' };
// Per-monster crop pan. Positive x pans right, positive y pans up.
const MONSTER_THUMB_SHIFT_DEFAULT = { x: 10, y: 13 };
const MONSTER_THUMB_SHIFT = {
  'Kraken':   { x: 80, y: 6 },
  'Gorgon':   { x: 80, y: 33 },   // panned right + up
  'Behemoth': { x: 10, y: -7 },   // default panned down 20%
  'Glacial Behemoth': { x: 10, y: -7 },
};

function buildSkinsStrip(card) {
  const name = card.dataset.name;
  if (!name) return;
  const skins = IMAGES.skins && IMAGES.skins[name];
  if (!skins || skins.length === 0) return;
  const strip = card.querySelector('[data-char-skins]');
  if (!strip || strip.dataset.built) return;
  strip.dataset.built = '1';
  const portraitImg = card.querySelector('.char-portrait-col img');
  const originalPortrait = portraitImg ? portraitImg.src : '';

  const makeBtn = (skin, active) => {
    const btn = document.createElement('button');
    btn.className = 'skin-thumb-btn' + (active ? ' active' : '');
    btn.title = skin.name;

    if (skin.thumb) {
      const img = document.createElement('img');
      const isMonster = card.dataset.class === 'monster';
      // Monster skins uniformly use the zoomed-in background image as the thumbnail;
      // hunters only do so for skins that lack a dedicated thumbnail.
      const zoomThumb = isMonster && !skin.isDefault && !skin.isHeadshot;   // hunters never use the monster zoom
      img.src = (zoomThumb && skin.portrait) ? skin.portrait : skin.thumb;
      img.alt = skin.name;
      if (zoomThumb) {
        // shiftX/shiftY pan the visible crop: positive X pans right, positive Y pans up.
        // (The image itself moves the opposite way, hence the negated translate.)
        const pan = MONSTER_THUMB_SHIFT[card.dataset.name] || MONSTER_THUMB_SHIFT_DEFAULT;
        const sx = (skin.shiftX !== undefined) ? skin.shiftX : pan.x;
        const sy = (skin.shiftY !== undefined) ? skin.shiftY : pan.y;
        img.style.transform = 'translate(' + (-sx) + '%, ' + sy + '%) scale(' + (skin.zoom || 4.5) + ')';   // art is trimmed now, so less zoom
        img.style.transformOrigin = skin.zoomOrigin || MONSTER_THUMB_ORIGIN[card.dataset.name] || 'center 10%';
      }
      btn.appendChild(img);
    } else {
      btn.style.background = '#0a0a0a';
    }

    const label = document.createElement('div');
    label.className = 'skin-thumb-label';
    label.textContent = (skin.isHeadshot || skin.isDefault) ? 'Default' : skin.name;
    if (!skin.body && !skin.isDefault && !skin.isHeadshot) btn.dataset.weapon = '1';   // the placement editor keys weapons separately
    btn.appendChild(label);

    btn.addEventListener('click', () => {
      strip.querySelectorAll('.skin-thumb-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (portraitImg) {
        if (skin.isHeadshot) {
          portraitImg.src = originalPortrait;
          portraitImg.style.transform = 'none';
          portraitImg.style.objectFit = 'contain';
        } else {
          portraitImg.src = skin.portrait || originalPortrait;
          portraitImg.style.objectFit = skin.fit || 'contain';
          const tweakKey = name + ' -- ' + skin.name + (skin.body || skin.isDefault ? '' : ' (weapon)');   // weapon and body skins can share a name
          const tweak = CARD_SKIN_TWEAKS[tweakKey];
          if (tweak) {                                   // placement set with ?skinpos=1 wins over the defaults below
            portraitImg.style.transform = 'translate(' + (tweak.x || 0) + '%, ' + (tweak.y || 0) + '%) scale(' + (tweak.s || 1) + ')';
            portraitImg.style.transformOrigin = 'center center';
            return;
          }
          const isMonster = card.dataset.class === 'monster';
          if (isMonster) {
            portraitImg.style.transform = 'none';          // skin art is trimmed, so it already fills the frame
            portraitImg.style.transformOrigin = 'center center';
          } else if (skin.body) {
            portraitImg.style.transform = 'none';          // character skins are full-body art: show it whole
            portraitImg.style.transformOrigin = 'center center';
          } else {
            portraitImg.style.transform = 'none';          // skin art is full height: fit it, do not zoom
            portraitImg.style.transformOrigin = 'center center';
          }
        }
      }
    });
    return btn;
  };
  const isMonsterCard = card.dataset.class === 'monster';
  const outfits = skins.filter(s => s.body);
  const rows = (!isMonsterCard && outfits.length)
    ? [{ label: 'Character Skins', items: skins.filter(s => s.isHeadshot || s.body) },
       { label: 'Weapon Skins', items: skins.filter(s => !s.isHeadshot && !s.body) }]
    : [{ label: '', items: skins }];
  if (rows.length > 1) strip.classList.add('skins-rows');
  rows.forEach((row, ri) => {
    if (!row.items.length) return;
    let host = strip;
    if (rows.length > 1) {
      const wrap = document.createElement('div'); wrap.className = 'skins-subrow';
      const lab = document.createElement('div'); lab.className = 'skins-row-label'; lab.textContent = row.label; wrap.appendChild(lab);
      const sc = document.createElement('div'); sc.className = 'skins-scroll'; wrap.appendChild(sc);
      sc.addEventListener('wheel', e => { e.preventDefault(); sc.scrollLeft += e.deltaY; }, { passive: false });
      strip.appendChild(wrap); host = sc;
    }
    row.items.forEach((skin, i) => host.appendChild(makeBtn(skin, ri === 0 && i === 0)));
  });

  strip.addEventListener('wheel', e => { e.preventDefault(); strip.scrollLeft += e.deltaY; }, { passive: false });
}

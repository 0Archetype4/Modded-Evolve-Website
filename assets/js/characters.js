/* ============================================================
   CLICKABLE THUMBNAILS -> CHARACTER PAGE
   ============================================================ */
function wirePatchPortraits(){
  // Make patch history full-body portraits clickable
  document.querySelectorAll('.sub-portrait-col img.fullbody').forEach(img => {
    const subEntry = img.closest('.sub-entry');
    if (!subEntry) return;
    const nameEl = subEntry.querySelector('.sub-char-name');
    if (!nameEl) return;
    const charName = nameEl.textContent.trim();
    img.style.cursor = 'pointer';
    img.addEventListener('click', () => navigateToCharacter(charName));
  });

}
document.addEventListener('patches:rendered', wirePatchPortraits);
document.addEventListener('DOMContentLoaded', () => {
  // Make ranked mains thumbnails clickable
  document.getElementById('ranked-tbody')?.addEventListener('click', e => {
    const img = e.target.closest('img[title]');
    if (!img) return;
    const charName = img.getAttribute('title');
    if (!charName) return;
    const card = document.querySelector('.char-card[data-name="' + charName + '"]');
    if (card) navigateToCharacter(charName);
  });
});

function navigateToCharacter(charName) {
  const card = document.querySelector('.char-card[data-name="' + charName + '"]');
  if (!card) return;
  const cls = card.dataset.class;
  const filterBtn = document.querySelector('.char-roster-pick .mh-class[data-cls="' + cls + '"]');

  showPage('characters');
  if (filterBtn) filterClass(cls, filterBtn);

  setTimeout(() => {
    const charBtn = Array.from(document.querySelectorAll('.char-btn'))
      .find(b => b.textContent.trim() === charName);
    if (charBtn) charBtn.click();
  }, 50);

  setUrlHash('#characters/' + encodeURIComponent(charName));
}

/* ============================================================
   PER-CHARACTER PATCH HISTORY
   ============================================================ */
/* ============================================================
   PATCH HISTORY — ABILITY BLOCK REORDER
   Ensures each sub-entry shows:
     Monsters: General → Traversal → Ability 1–4
     Hunters:  General → Primary → Secondary → Special → Class
   Orders sourced directly from character card pages.
   ============================================================ */
function reorderAbilityBlocks() {
  // Exact order from character pages (Ability 1 → 2 → 3 → 4)
  const MONSTER_ORDER = {
    'Goliath':          ['Rock Throw','Leap Smash','Fire Breath','Charge'],
    'Meteor Goliath':   ['Rock Throw','Leap Smash','Flame Blast','Charge'],
    'Kraken':           ['Lightning Strike','Banshee Mines','Aftershock','Vortex'],
    'Elder Kraken':     ['Lightning Strike','Banshee Missile','Chain Lightning','Death Spiral'],
    'Wraith':           ['Warp Blast','Abduction','Phantom','Supernova'],
    'Behemoth':         ['Lava Bomb','Tongue Grab','Fissure','Rock Wall'],
    'Glacial Behemoth': ['Killing Frost', 'Ice Spear', 'Frozen Monolith', 'Deep Freeze'],
    'Gorgon':           ['Web Snare','Spider Trap','Acid Spit','Mimic'],
  };

  // Exact order from character pages (Primary → Secondary → Special → Class)
  const HUNTER_ORDER = {
    // Assaults
    'Markov':             ['Lightning Gun','Assault Rifle','Arc Mines','Defense Matrix'],
    'Blitz Markov':       ['Tesla Gun','Assault Rifle','Tesla Mine','Defense Matrix'],
    'Hyde':               ['Flamethrower','Minigun','Toxic Grenades','Defense Matrix'],
    'Parnell':            ['Combat Shotgun','Multifire Rocket Launcher','Super Soldier','Defense Matrix'],
    'Torvald':            ['Autofire Shotgun','Mortar Cannon','Shrapnel Grenade','Defense Matrix'],
    'Lennox':             ['Plasma Lance','Autocannon','Thunder Strike','Defense Matrix'],
    // Medics
    'Val':                ['Armor-Piercing Sniper Rifle','MedGun','Tranquilizer Gun','Healing Burst'],
    'Rogue Val':          ['Sniper Rifle','Chain MedGun','Poison Dart Gun','Healing Field'],
    'Lazarus':            ['Silenced Sniper Rifle','Lazarus Device','Personal Cloak','Healing Burst'],
    'Caira':              ['Napalm Grenade Launcher','Healing Grenade Launcher','Acceleration Field','Healing Burst'],
    'Quantum Caira': ['Proton Field', 'Regeneration Field', 'Neutron Barrier', 'Generyst II Field'],
    'Slim':               ['Leech Gun','Mutated Adrenal Gland','Healing Drone','Heal Burst'],
    'Emet':               ['Replay Cannon','Healing Buoy','Boost Buoy','Healing Burst'],
    'Paladin Parnell': ['Mutagen Shotgun', 'Generyst Rockets', 'Righteous Fury', 'Heal Burst'],
    // Supports
    'Hank':               ['Laser Cutter','Shield Projector','Shield Charger','Orbital Barrage','Shield Burst'],
    'Tech Sergeant Hank': ['Laser Cannon','Shield Charger','Orbital Drill','Shield Burst'],
    'Bucket':             ['Guided Missile Launcher','Sentry Guns','Mechanized Recharge','Shield Burst'],
    'Cabot':              ['Rail Cannon','Damage Amplifier','Dust Tagging','Dust Tag','Shield Burst'],
    'Battle Cabot':       ['Photon Cannon','Solar Blast','Orbital Concealment','Projected Shield Burst'],
    'Sunny':              ['Mininuke Grenade Launcher','Jetpack Booster','Shield Drone','Shield Burst'],
    'Kala':               ['Siren Missiles','Armor Reducer','Teleport Pads','Shield Burst'],
    // Trappers
    'Maggie':             ['Machine Pistol','Harpoon Traps','Pet Trapjaw','Planet Scanner'],
    'Wasteland Maggie':   ['Burst Pistol','Flame Snare','Combat Trapjaw','Planet Scanner'],
    'Griffin':            ['Gauss SMG','Harpoon Gun','Sound Spikes','Planet Scanner'],
    'Electro Griffin': ['The Laser Storm', 'The Final Lockdown', 'Sound Spikes', 'Planet Scanner'],
    'Abe':                ['Custom Shotgun','Stasis Grenades','Tracking Dart Pistol','Tracking Darts','Planet Scanner'],
    'Renegade Abe':       ['Custom Shotgun','Stasis Grenades','Tracking Dart Pistol','Tracking Darts','Planet Scanner'],
    'Crow':               ['Kinetic Long Rifle','Stasis Gun','Pet Batray','Planet Scanner'],
    'Jack':               ['Dual Pistols','Burst Pistol','Repulsor','Survey Satellite','Planet Scanner'],
  };

  const GENERAL_ICONS = new Set([
    'LcdBackgroundMonster.png','generalicon.png',
    'hunterandmonstericon.png','defaulthunter.png',
    'patchhistoryiconforall.png','wildlifeicon.png'
  ]);
  const GENERAL_NAMES = new Set([
    'Health','Contextual Combat','Feeding Speed','Air Projectile',
    'General','Global — Monsters','Global — Hunters','Wildlife',
    'Progression','Jack Passive'
  ]);

  function blockPriority(block, isMonster, order) {
    const nameEl = block.querySelector('.ability-name');
    const iconEl = block.querySelector('.ability-icon-wrap img');
    if (!nameEl) return 99;
    const name = nameEl.textContent.trim();
    const icon = iconEl ? iconEl.getAttribute('src').split('/').pop() : '';

    if (GENERAL_ICONS.has(icon) || GENERAL_NAMES.has(name)) return 0;
    if (isMonster && /^Traversal/.test(name)) return 1;
    if (order) {
      const idx = order.indexOf(name);
      if (idx !== -1) return 2 + idx;
    }
    return 50;
  }

  document.querySelectorAll('.sub-entry').forEach(function(sub) {
    const charNameEl = sub.querySelector('.sub-char-name');
    if (!charNameEl) return;
    const charName  = charNameEl.textContent.trim();
    const isMonster = sub.classList.contains('cat-monster');
    const col       = sub.querySelector('.sub-abilities-col');
    if (!col) return;

    const order  = isMonster ? MONSTER_ORDER[charName] : HUNTER_ORDER[charName];
    const blocks = Array.from(col.querySelectorAll(':scope > .ability-block'));
    const perks  = Array.from(col.querySelectorAll(':scope > .perk-block'));
    if (blocks.length < 2) return;

    const sorted = blocks.slice().sort(function(a, b) {
      return blockPriority(a, isMonster, order) - blockPriority(b, isMonster, order);
    });

    let changed = false;
    for (let i = 0; i < blocks.length; i++) {
      if (blocks[i] !== sorted[i]) { changed = true; break; }
    }
    if (!changed) return;

    sorted.forEach(function(b) { col.appendChild(b); });
    perks.forEach(function(p)  { col.appendChild(p); });
  });
}
document.addEventListener('patches:rendered', reorderAbilityBlocks);

function viewCharHistory(charName) {
  // Collect all sub-entries for this character across every patch
  const patches = document.querySelectorAll('.patch-entry');
  const results = [];

  patches.forEach(patch => {
    const badge = patch.querySelector('.version-badge');
    const dateEl = patch.querySelector('.patch-date');
    const patchLabel = badge ? badge.textContent : '';
    const patchDate  = dateEl ? dateEl.textContent : '';

    const entries = patch.querySelectorAll('.sub-entry');
    const matched = [];
    entries.forEach(entry => {
      const nameEl = entry.querySelector('.sub-char-name');
      if (nameEl && nameEl.textContent.trim() === charName) {
        matched.push(entry.cloneNode(true));
      }
    });
    if (matched.length) {
      results.push({ patchLabel, patchDate, entries: matched });
    }
  });

  // Build modal content
  const body = document.getElementById('char-history-body');
  body.innerHTML = '';

  if (!results.length) {
    body.innerHTML = '<div class="ch-empty">No patch history found for ' + charName + '.</div>';
  } else {
    results.forEach(r => {
      const block = document.createElement('div');
      block.className = 'ch-patch-block';

      const label = document.createElement('div');
      label.className = 'ch-patch-label';
      label.innerHTML = '<span class="version-badge">' + r.patchLabel + '</span>'
        + '<span class="ch-patch-date">' + r.patchDate + '</span>';
      block.appendChild(label);

      const entriesWrap = document.createElement('div');
      entriesWrap.className = 'ch-patch-entries';
      r.entries.forEach(e => {
        // Remove toggle behaviour from cloned entries — show them open by default
        e.classList.add('open');
        const hdr = e.querySelector('.sub-header');
        if (hdr) hdr.style.cursor = 'default';
        entriesWrap.appendChild(e);
      });
      block.appendChild(entriesWrap);
      body.appendChild(block);
    });
  }

  // Populate header — find portrait from the character card
  const nameEl = document.getElementById('char-history-name');
  const subtitleEl = document.getElementById('char-history-subtitle');
  const portraitEl = document.getElementById('char-history-portrait');

  nameEl.textContent = charName;
  subtitleEl.textContent = results.length
    ? results.length + ' patch' + (results.length !== 1 ? 'es' : '') + ' with changes'
    : 'No changes recorded';

  // Prefer the character's full-body portrait from a matched patch entry;
  // fall back to the character card's portrait image.
  let found = false;
  if (results.length) {
    const fb = results[0].entries[0].querySelector('img.fullbody, .fullbody, img');
    if (fb && fb.src) { portraitEl.src = fb.src; found = true; }
  }
  if (!found) {
    document.querySelectorAll('.char-card').forEach(card => {
      if (card.getAttribute('data-name') === charName) {
        const img = card.querySelector('.char-portrait, .char-img, .fullbody, img');
        if (img) { portraitEl.src = img.src; found = true; }
      }
    });
  }
  if (!found) portraitEl.src = '';

  document.getElementById('char-history-overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCharHistory(e) {
  if (e && e.target !== document.getElementById('char-history-overlay') && !e.target.closest('#char-history-close')) return;
  document.getElementById('char-history-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

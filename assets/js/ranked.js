/* ============================================================
   RANKED PAGE
   ============================================================ */
const TIER_ORDER = [
  'Gold Destroyer','Gold Elite','Gold Master','Gold Expert','Gold Skilled',
  'Silver Destroyer','Silver Elite','Silver Master','Silver Expert','Silver Skilled',
  'Bronze Destroyer','Bronze Elite','Bronze Master','Bronze Expert','Bronze Skilled'
];
const TIER_CLASS = {
  'Bronze Skilled':'tier-bronze','Bronze Expert':'tier-bronze','Bronze Master':'tier-bronze','Bronze Elite':'tier-bronze','Bronze Destroyer':'tier-bronze-d',
  'Silver Skilled':'tier-silver','Silver Expert':'tier-silver','Silver Master':'tier-silver','Silver Elite':'tier-silver','Silver Destroyer':'tier-silver-d',
  'Gold Skilled':'tier-gold','Gold Expert':'tier-gold','Gold Master':'tier-gold','Gold Elite':'tier-gold','Gold Destroyer':'tier-gold-d',
};
const TIER_ICONS = {
  'Bronze Skilled':'https://assets.modded-evolve.com/images/ranks/bronzeskilled.png',
  'Bronze Expert':'https://assets.modded-evolve.com/images/ranks/bronzeexpert.png','Bronze Master':'https://assets.modded-evolve.com/images/ranks/bronzemaster.png',
  'Bronze Elite':'https://assets.modded-evolve.com/images/ranks/bronzeelite.png','Bronze Destroyer':'https://assets.modded-evolve.com/images/ranks/bronzedestroyer.png',
  'Silver Skilled':'https://assets.modded-evolve.com/images/ranks/silverskilled.png',
  'Silver Expert':'https://assets.modded-evolve.com/images/ranks/silverexpert.png','Silver Master':'https://assets.modded-evolve.com/images/ranks/silvermaster.png',
  'Silver Elite':'https://assets.modded-evolve.com/images/ranks/silverelite.png','Silver Destroyer':'https://assets.modded-evolve.com/images/ranks/silverdestroyer.png',
  'Gold Skilled':'https://assets.modded-evolve.com/images/ranks/goldskilled.png',
  'Gold Expert':'https://assets.modded-evolve.com/images/ranks/goldexpert.png','Gold Master':'https://assets.modded-evolve.com/images/ranks/goldmaster.png',
  'Gold Elite':'https://assets.modded-evolve.com/images/ranks/goldelite.png','Gold Destroyer':'https://assets.modded-evolve.com/images/ranks/golddestroyer.png',
};
const CLASS_COLOR = { monster:'#8b1a1a', assault:'#ab2d16', medic:'#387672', support:'#c87a05', trapper:'#807921' };
const CLASS_COLOR_BRIGHT = { monster:'#e24a4a', assault:'#ef6a40', medic:'#4fbab0', support:'#f0a838', trapper:'#cdbb3e' };
const CLASS_ICONS = { monster:'https://assets.modded-evolve.com/images/ui/lcdbackgroundmonster.png', assault:'https://assets.modded-evolve.com/images/ui/lcdbackgroundassault.png', medic:'https://assets.modded-evolve.com/images/ui/lcdbackgroundmedic.png', support:'https://assets.modded-evolve.com/images/ui/lcdbackgroundsupport.png', trapper:'https://assets.modded-evolve.com/images/ui/lcdbackgroundtracker.png' };
const MAP_IMAGES = { "The Dam": "https://assets.modded-evolve.com/images/gallery/maps/load_desert_canyon.png", "Armory": "https://assets.modded-evolve.com/images/gallery/maps/load_desert_harsh.png", "Wraith Trap": "https://assets.modded-evolve.com/images/gallery/maps/load_desert_mountains.png", "Weather Control": "https://assets.modded-evolve.com/images/gallery/maps/load_forest_cliffs.png", "Refueling Tower": "https://assets.modded-evolve.com/images/gallery/maps/load_forest_rapids.png", "Fusion Plant": "https://assets.modded-evolve.com/images/gallery/maps/load_forest_ruins.png", "Broken Hill Foundry": "https://assets.modded-evolve.com/images/gallery/maps/load_forest_slagtown.png", "Aviary": "https://assets.modded-evolve.com/images/gallery/maps/load_ice_alpine.png", "Distillery": "https://assets.modded-evolve.com/images/gallery/maps/load_ice_crashsite.png", "MedLab": "https://assets.modded-evolve.com/images/gallery/maps/load_ice_lake.png", "Medlab": "https://assets.modded-evolve.com/images/gallery/maps/load_ice_lake.png", "Barracks": "https://assets.modded-evolve.com/images/gallery/maps/load_lava_depths.png", "Rendering Plant": "https://assets.modded-evolve.com/images/gallery/maps/load_lava_paths.png", "Orbital Drill": "https://assets.modded-evolve.com/images/gallery/maps/load_lava_rivers.png", "Salveron Industries": "https://assets.modded-evolve.com/images/gallery/maps/load_desert_defend.png", "New Calico": "https://assets.modded-evolve.com/images/gallery/maps/load_forest_gulch.png", "King's Fort": "https://assets.modded-evolve.com/images/gallery/maps/load_ice_peak.png", "Colonial Water & Power": "https://assets.modded-evolve.com/images/gallery/maps/load_lava_valley.png", "Broken Hill Mine": "https://assets.modded-evolve.com/images/gallery/maps/load_desert_mine.png", "Broken Hill Murder Pits": "https://assets.modded-evolve.com/images/gallery/maps/arena_murder_pits.png" };

let RK_CLASS='all', RK_TIER='all', STATS_CLS='all', RK_SEARCH='', RK_SORT='tier', STATS_SORT='tier', RK_VIEW='overall';

/* Leaderboard + stats are rendered from ranked.json, written by the Discord bot's /exportdata. */
const RANKED_DATA_URL = 'https://assets.modded-evolve.com/data/Stage%202/ranked.json';
let RANKED_PLAYERS = [];
function getRankedPlayers() { return RANKED_PLAYERS; }
function normalizeRankedPlayers(list) {
  return (list || []).map(p => {
    const mains = (Array.isArray(p.mains) ? p.mains : []).map(m => {
      const name = typeof m === 'object' ? m.name : m;
      const thumb = (typeof m === 'object' && m.thumb) ? m.thumb : ((typeof IMAGES !== 'undefined' && IMAGES.heads && IMAGES.heads[name]) || '');
      return { name, thumb };
    });
    return Object.assign({}, p, { mains });
  });
}
let rankedLoadPromise = null;
function loadRankedData() {
  if (rankedLoadPromise) return rankedLoadPromise;
  rankedLoadPromise = fetch(RANKED_DATA_URL, { cache: 'no-cache' })
    .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(d => {
      RANKED_PLAYERS = normalizeRankedPlayers(d.data_players);
      if (d.stats_data) STATS_DATA = Object.assign(STATS_DATA, d.stats_data);
      const gen = document.getElementById('ranked-generated');
      if (gen && d.generated) gen.textContent = 'Updated ' + new Date(d.generated).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
      renderRanked(RK_CLASS); renderStats(STATS_CLS);
    })
    .catch(err => { const t = document.getElementById('ranked-tbody'); if (t) t.innerHTML = '<tr><td colspan="9" class="muted" style="text-align:center;padding:2rem;">Leaderboard unavailable (' + err.message + ').</td></tr>'; });
  return rankedLoadPromise;
}

// Resolve which ladder a player is shown by for the current view.
// Real bot data carries per-role `monster`/`hunter` objects; demo data (flat,
// one class per player) falls back to their main class so the split still demos.
function ladderOf(p) {
  if (RK_VIEW === 'monster') {
    const l = p.monster;
    if (l) return { tier: l.tier, wins: l.wins, losses: l.losses, has: (l.wins + l.losses) > 0 };
    return { tier: p.tier, wins: p.wins, losses: p.losses, has: p.class === 'monster' };
  }
  if (RK_VIEW === 'hunter') {
    const l = p.hunter;
    if (l) return { tier: l.tier, wins: l.wins, losses: l.losses, has: (l.wins + l.losses) > 0 };
    return { tier: p.tier, wins: p.wins, losses: p.losses, has: p.class !== 'monster' };
  }
  return { tier: p.tier, wins: p.wins, losses: p.losses, has: true };
}

function setRankView(view, btn) {
  RK_VIEW = view;
  document.querySelectorAll('.rank-view-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  // The character-class filter only makes sense on the combined Overall board.
  const cf = document.getElementById('ranked-class-filter');
  if (cf) cf.style.display = view === 'overall' ? '' : 'none';
  renderRanked();
}

// Ranked sub-nav tab switching
function showRankedTab(tab, btn) {
  document.getElementById('ranked-tab-leaderboard').style.display = tab === 'leaderboard' ? '' : 'none';
  document.getElementById('ranked-tab-stats').style.display = tab === 'stats' ? '' : 'none';
  document.querySelectorAll('.ranked-subnav-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (tab === 'stats') renderStats(STATS_CLS);
}

const CHAR_TIER_ORDER = ['Goliath','Meteor Goliath','Kraken','Elder Kraken','Wraith','Behemoth','Glacial Behemoth','Gorgon','Markov','Blitz Markov','Hyde','Parnell','Torvald','Lennox','Val','Rogue Val','Lazarus','Caira','Quantum Caira','Slim','Emet','Paladin Parnell','Hank','Tech Sergeant Hank','Bucket','Cabot','Sunny','Kala','Maggie','Wasteland Maggie','Griffin','Electro Griffin','Abe','Crow','Jack'];

const MODE_IMAGES = { hunt:'https://assets.modded-evolve.com/images/icons/mode_hunt.png', nest:'https://assets.modded-evolve.com/images/icons/mode_nest.png', rescue:'https://assets.modded-evolve.com/images/icons/mode_rescue.png', defend:'https://assets.modded-evolve.com/images/icons/mode_defend.png', arena:'https://assets.modded-evolve.com/images/icons/mode_arena.png', evacuation:'https://assets.modded-evolve.com/images/icons/mode_campaign.png' };
let STATS_DATA = { totalMatches: 0, hunterWins: 0, monsterWins: 0, avgDuration: null, modes: [], characters: [], maps: [], perks: [] };


const PERK_IMAGES = { "Assassin": "https://assets.modded-evolve.com/images/icons/monstertraversalregenperk.png", "Brawler": "https://assets.modded-evolve.com/images/icons/monsterarmorregenperk.png", "Caster": "https://assets.modded-evolve.com/images/icons/monsterabilitycooldownperk.png", "Heavy Hitter": "https://assets.modded-evolve.com/images/icons/monsternewdamageincreaseperkicon.png", "Damage Bonus": "https://assets.modded-evolve.com/images/icons/monsterdamageincreaseperk.png", "Infected": "https://assets.modded-evolve.com/images/icons/monsterdamageincreaseperk.png", "Ironhide": "https://assets.modded-evolve.com/images/icons/monsterdamagereductionperk.png", "Fleetfoot": "https://assets.modded-evolve.com/images/icons/monstermovementspeedperk.png", "Scout": "https://assets.modded-evolve.com/images/icons/monstersmellrangeperk.png", "Smell Range": "https://assets.modded-evolve.com/images/icons/monstersmellrangeperk.png", "Strongarm": "https://assets.modded-evolve.com/images/icons/monsterclimbspeedperk.png", "Feeding Speed": "https://assets.modded-evolve.com/images/icons/monsterfeedingspeedperk.png", "Capacity": "https://assets.modded-evolve.com/images/icons/huntercapacityperk.png", "Poison Bullets": "https://assets.modded-evolve.com/images/icons/hunterdamageincreaseperk.png", "Vanguard": "https://assets.modded-evolve.com/images/icons/hunterdamagereductionperk.png", "Health Regen": "https://assets.modded-evolve.com/images/icons/hunterhealthregenperk.png", "Jetpack Recharge": "https://assets.modded-evolve.com/images/icons/hunterjetpackrechargeperk.png", "Jump Height": "https://assets.modded-evolve.com/images/icons/hunterjumpheightperk.png", "Movespeed": "https://assets.modded-evolve.com/images/icons/huntermovespeedperk.png", "Movement Speed": "https://assets.modded-evolve.com/images/icons/huntermovespeedperk.png", "Quick Switch": "https://assets.modded-evolve.com/images/icons/hunterquickswtichperk.png", "Gun Slinger": "https://assets.modded-evolve.com/images/icons/hunterquickswtichperk.png", "Health Regeneration": "https://assets.modded-evolve.com/images/icons/hunterhealthregenperk.png", "Reload Speed": "https://assets.modded-evolve.com/images/icons/hunterreloadspeedperk.png" };
const PERK_FALLBACK_ICON = "https://assets.modded-evolve.com/images/icons/hunterandmonstericon.png";
const PERK_CLASS = { "Assassin":"monster","Brawler":"monster","Caster":"monster","Heavy Hitter":"monster","Damage Bonus":"monster","Infected":"monster","Ironhide":"monster","Fleetfoot":"monster","Scout":"monster","Smell Range":"monster","Strongarm":"monster","Feed Speed":"monster","Feeding Speed":"monster","Traversal Regeneration":"monster","Capacity":"hunter","Poison Bullets":"hunter","Vanguard":"hunter","Health Regeneration":"hunter","Health Regen":"hunter","Jetpack Recharge":"hunter","Jump Height":"hunter","Movement Speed":"hunter","Movespeed":"hunter","Gun Slinger":"hunter","Quick Switch":"hunter","Reload Speed":"hunter" };
const PERK_PANELS = {
  monster: { label:'Monster Perks', cls:'mon', icon:'https://assets.modded-evolve.com/images/ui/lcdbackgroundmonster.png' },
  hunter:  { label:'Hunter Perks',  cls:'hun', icon:'https://assets.modded-evolve.com/images/icons/defaulthunter.png' },
};
const STATS_CLS_COLORS = {
  monster: 'var(--cl-monster)',
  assault: 'var(--cl-assault)',
  medic:   'var(--cl-medic)',
  support: 'var(--cl-support)',
  trapper: 'var(--cl-trapper)',
};

function filterStats(cls, btn) {
  if (STATS_CLS === cls) { STATS_CLS = 'all'; if (btn) btn.classList.remove('active'); }
  else { STATS_CLS = cls; document.querySelectorAll('.stats-cls-btn').forEach(b => b.classList.remove('active')); if (btn) btn.classList.add('active'); }
  renderStats(STATS_CLS);
}

function renderStats(cls) {
  const total = STATS_DATA.totalMatches;
  const hwr = total ? Math.round(STATS_DATA.hunterWins / total * 100) : 0;
  const set = (id,v) => { const el=document.getElementById(id); if(el) el.textContent=v; };
  set('stat-total-matches', total || '\u2014');
  set('stat-avg-duration', STATS_DATA.avgDuration || '\u2014');
  set('bal-hunter', total ? hwr+'%' : '\u2014');
  set('bal-monster', total ? (100-hwr)+'%' : '\u2014');
  const fh=document.getElementById('bal-fill-h'), fm=document.getElementById('bal-fill-m');
  if(fh&&fm){ fh.style.width=(total?hwr:50)+'%'; fm.style.width=(total?100-hwr:50)+'%'; }

  const tbody = document.getElementById('stats-tbody');
  const chars = STATS_DATA.characters.filter(c => cls === 'all' || c.cls === cls);
  const totalPicks = chars.reduce((s, c) => s + c.matches, 0);
  if (!total) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;padding:2rem;color:var(--color-muted);font-size:0.85rem;">No match data yet \u2014 submit matches via Discord bot to populate stats.</td></tr>';
    const mg = document.getElementById('stats-map-grid'); if (mg) mg.innerHTML = '<div class="stats-placeholder">No map data yet.</div>';
    const pg = document.getElementById('stats-perk-grid'); if (pg) pg.innerHTML = '<div class="stats-placeholder">No perk data yet.</div>';
    return;
  }
  const sorted = chars.slice().sort((a,b) => {
    if (STATS_SORT==='winrate') return (b.wins/(b.matches||1))-(a.wins/(a.matches||1));
    if (STATS_SORT==='wins') return b.wins-a.wins;
    if (STATS_SORT==='pickrate' || STATS_SORT==='matches') return b.matches-a.matches;
    return CHAR_TIER_ORDER.indexOf(a.name) - CHAR_TIER_ORDER.indexOf(b.name);
  });
  tbody.innerHTML = '';
  sorted.forEach((c, i) => {
    const wr = c.matches ? Math.round(c.wins / c.matches * 100) : 0;
    const pr = totalPicks ? Math.round(c.matches / totalPicks * 100) : 0;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td style="color:var(--color-muted);font-size:0.75rem;">${i+1}</td>
      <td><div style="display:flex;align-items:center;gap:0.7rem;"><img loading="lazy" decoding="async" src="${IMAGES.heads[c.name]||''}" alt="${c.name}" loading="lazy" style="width:112px;height:64px;border-radius:4px;object-fit:cover;border:1px solid #222;background:#0a0a0a;"><strong>${c.name}</strong></div></td>
      <td><span class="cls-chip" style="background:#000;"><img loading="lazy" decoding="async" src="${CLASS_ICONS[c.cls]||''}" alt="${c.cls}" title="${c.cls}" style="width:100%;height:100%;object-fit:cover;display:block;"></span></td>
      <td class="right"><div class="stats-winrate-bar"><div class="stats-winrate-track"><div class="stats-winrate-fill" style="width:${wr}%;background:${CLASS_COLOR[c.cls]};"></div></div><strong style="min-width:40px;text-align:right;">${wr}%</strong></div></td>
      <td class="right"><span style="color:#7a7a7a;">${pr}%</span></td>
      <td class="right">${c.matches}</td>
      <td class="right">${c.wins}</td>
    `;
    tbody.appendChild(tr);
  });
  const modeWrap = document.getElementById('stats-mode-grid');
  if (modeWrap) {
    const modes = (STATS_DATA.modes || []);
    if (!modes.length) {
      modeWrap.innerHTML = '<div class="stats-placeholder">No mode data yet.</div>';
    } else {
      const sorted = modes.slice().sort((a,b) => b.count - a.count);
      const totC = sorted.reduce((s,m) => s + m.count, 0) || 1;
      modeWrap.innerHTML = sorted.map(m => {
        const pct = Math.round(m.count / totC * 100);
        const img = MODE_IMAGES[m.key] ? `<img loading="lazy" decoding="async" class="mode-tile-img" src="${MODE_IMAGES[m.key]}" alt="${m.name}" loading="lazy">` : '';
        return `<div class="mode-tile">${img}<div class="mode-tile-info"><div class="mode-tile-name">${m.name}</div><div class="mode-tile-count">${m.count} matches</div><div class="mode-tile-pct">${pct}% of matches</div></div></div>`;
      }).join('');
    }
  }
  const mapGrid = document.getElementById('stats-map-grid');
  if (!STATS_DATA.maps.length) {
    mapGrid.innerHTML = '<div class="stats-placeholder">No map data yet.</div>';
  } else {
    mapGrid.innerHTML = '';
    const mTot = STATS_DATA.maps.reduce((s,x) => s + x.count, 0) || 1;
    STATS_DATA.maps.slice().sort((a,b) => b.count - a.count).forEach(m => {
      const div = document.createElement('div');
      div.className = 'map-tile';
      const pct = Math.round(m.count / mTot * 100);
      const mi = MAP_IMAGES[m.name] ? `<img loading="lazy" decoding="async" class="map-tile-img" src="${MAP_IMAGES[m.name]}" alt="${m.name}" loading="lazy">` : '';
      div.innerHTML = `${mi}<div class="map-tile-info"><div class="map-tile-name">${m.name}</div><div class="map-tile-count"><span class="map-tile-num">${m.count}</span>matches · ${pct}% of all</div></div>`;
      mapGrid.appendChild(div);
    });
  }
  const perkGrid = document.getElementById('stats-perk-grid');
  if (perkGrid) {
    const perks = STATS_DATA.perks || [];
    if (!perks.length) {
      perkGrid.innerHTML = '<div class="stats-placeholder">No perk data yet.</div>';
    } else {
      const panel = (side) => {
        const meta = PERK_PANELS[side];
        const rows = perks.filter(p => (PERK_CLASS[p.name] || 'hunter') === side)
                          .sort((a, b) => b.matches - a.matches);
        const gTot = rows.reduce((s, p) => s + p.matches, 0) || 1;
        const maxM = rows.length ? rows[0].matches : 1;
        const body = rows.length
          ? rows.map((p, i) => {
              const share = Math.round(p.matches / gTot * 100);      // % of this side's picks
              const bar   = Math.round(p.matches / maxM * 100);      // bar relative to top perk
              const wr    = p.matches ? Math.round((p.wins || 0) / p.matches * 100) : 0;
              const icon  = PERK_IMAGES[p.name] || PERK_FALLBACK_ICON;
              return `<div class="perk-row">
                <div class="perk-rank">${i + 1}</div>
                <img loading="lazy" decoding="async" class="perk-ico" src="${icon}" alt="${p.name}" loading="lazy">
                <div class="perk-main">
                  <div class="perk-name">${p.name}</div>
                  <div class="perk-bar-track"><div class="perk-bar-fill" style="width:${bar}%;"></div></div>
                </div>
                <div class="perk-meta"><span class="perk-pct">${share}%</span><span class="perk-wr">${wr}% win</span></div>
              </div>`;
            }).join('')
          : '<div class="stats-placeholder" style="border:none;padding:1.5rem;">No picks yet.</div>';
        return `<div class="perk-panel ${meta.cls}">
          <div class="perk-panel-head"><img loading="lazy" decoding="async" src="${meta.icon}" alt=""><div class="perk-panel-title">${meta.label}<span>${rows.reduce((s,p)=>s+p.matches,0)} picks</span></div></div>
          <div class="perk-panel-body">${body}</div>
        </div>`;
      };
      perkGrid.innerHTML = panel('monster') + panel('hunter');
    }
  }
}

function renderRanked(filter) {
  const tbody = document.getElementById('ranked-tbody');
  if (!tbody) return;
  let players = getRankedPlayers()
    .map(p => { const v = ladderOf(p); return v.has ? Object.assign({}, p, { tier: v.tier, wins: v.wins, losses: v.losses }) : null; })
    .filter(Boolean);
  if (RK_VIEW === 'overall' && RK_CLASS !== 'all') players = players.filter(p => p.class === RK_CLASS);
  if (RK_TIER !== 'all') players = players.filter(p => p.tier.toLowerCase().split(' ')[0] === RK_TIER);
  if (RK_SEARCH) players = players.filter(p => p.name.toLowerCase().includes(RK_SEARCH));
  const wrOf = p => (p.wins + p.losses > 0 ? p.wins/(p.wins+p.losses) : 0);
  players.sort((a,b) => {
    if (RK_SORT === 'winrate') return wrOf(b) - wrOf(a);
    if (RK_SORT === 'wins') return b.wins - a.wins;
    const ta = TIER_ORDER.indexOf(a.tier), tb = TIER_ORDER.indexOf(b.tier);
    if (ta !== tb) return ta - tb;
    return wrOf(b) - wrOf(a);
  });
  const tierGlow = {
    'Gold Destroyer':'#ffd700','Gold Elite':'#f0c040','Gold Master':'#d4a820','Gold Expert':'#c8a030','Gold Skilled':'#a88020',
    'Silver Destroyer':'#e8e8e8','Silver Elite':'#d0d0d0','Silver Master':'#bbbbbb','Silver Expert':'#aaaaaa','Silver Skilled':'#888888',
    'Bronze Destroyer':'#ff9944','Bronze Elite':'#e07030','Bronze Master':'#c86020','Bronze Expert':'#b05018','Bronze Skilled':'#883808',
  };
  const podium = document.getElementById('ranked-podium');
  if (podium) {
    podium.innerHTML = players.slice(0,3).map((p,idx) => {
      const rank = idx+1;
      const wr = p.wins+p.losses>0 ? Math.round(p.wins/(p.wins+p.losses)*100) : 0;
      const crest = TIER_ICONS[p.tier] || '';
      const medal = ['#ffd700','#cfd2d4','#cd7f3a'][idx] || '#888';
      return `<div class="podium-card"><div class="podium-rank" style="color:${medal};">#${rank}</div><img loading="lazy" decoding="async" class="podium-crest" src="${crest}" alt="${p.tier}" title="${p.tier}"><div class="podium-name">${p.name}</div><div class="podium-wr">${wr}%</div><div class="podium-rec">${p.wins}-${p.losses} \u00b7 ${p.tier}</div></div>`;
    }).join('');
    podium.style.display = players.length ? 'grid' : 'none';
  }
  tbody.innerHTML = '';
  if (!players.length) { tbody.innerHTML = '<tr><td colspan="6" class="ranked-empty">No players found.</td></tr>'; return; }
  players.forEach((p, i) => {
    const rank = i + 1;
    const numClass = rank === 1 ? 'gold' : rank === 2 ? 'silver' : rank === 3 ? 'bronze' : '';
    const wr = p.wins + p.losses > 0 ? Math.round(p.wins / (p.wins + p.losses) * 100) : 0;
    const tierIcon = TIER_ICONS[p.tier] || '';
    const glow = tierGlow[p.tier] || '#888';
    const isDestroyer = p.tier.includes('Destroyer');
    const rowTier = p.tier.toLowerCase().includes('gold') ? 'row-gold' : p.tier.toLowerCase().includes('silver') ? 'row-silver' : 'row-bronze';
    const rowClass = rowTier + (isDestroyer ? ' row-destroyer' : '');
    const barCol = '#ffffff';
    const nameCol = rowTier === 'row-gold' ? '#d9b84a' : rowTier === 'row-silver' ? '#cfcfcf' : '#c8823c';
    const mains = (Array.isArray(p.mains) ? p.mains : []).slice(0, 3);
    const mainsHtml = mains.map(m => {
      const thumb = typeof m === 'object' ? m.thumb : '';
      const name = typeof m === 'object' ? m.name : m;
      return thumb
        ? `<img loading="lazy" decoding="async" src="${thumb}" alt="${name}" title="${name}" style="width:112px;height:64px;border-radius:4px;object-fit:cover;border:1px solid #222;">`
        : `<div style="width:112px;height:64px;border-radius:4px;background:#1a1a1a;border:1px solid #222;" title="${name}"></div>`;
    }).join('');
    const tierHtml = tierIcon
      ? `<div class="tier-icon-wrap${isDestroyer?' destroyer':''}" style="--tier-glow:${glow};"><img loading="lazy" decoding="async" src="${tierIcon}" alt="${p.tier}" title="${p.tier}"><div class="tier-icon-label">${p.tier}</div></div>`
      : `<span>${p.tier}</span>`;
    const tr = document.createElement('tr');
    tr.className = rowClass;
    tr.style.setProperty('--tier-glow', glow);
    tr.dataset.class = p.class;
    tr.innerHTML = `
      <td>${tierHtml}</td>
      <td><div class="rank-num ${numClass}">${rank}</div></td>
      <td><strong style="color:${nameCol};">${p.name}</strong></td>
      <td><div style="display:flex;gap:4px;align-items:center;">${mainsHtml}</div></td>
      <td class="right"><span style="color:var(--color-muted);">${p.wins}-${p.losses}</span></td>
      <td class="right"><div class="stats-winrate-bar"><div class="stats-winrate-track"><div class="stats-winrate-fill" style="width:${wr}%;background:${barCol};"></div></div><strong style="min-width:40px;text-align:right;">${wr}%</strong></div></td>
    `;
    tbody.appendChild(tr);
  });
}

function filterRanked(filter, btn) {
  if (RK_CLASS === filter) { RK_CLASS = 'all'; if (btn) btn.classList.remove('active'); }
  else { RK_CLASS = filter; document.querySelectorAll('.ranked-filter-btn').forEach(b => b.classList.remove('active')); if (btn) btn.classList.add('active'); }
  renderRanked();
}
function filterRankedTier(tier, btn) {
  if (RK_TIER === tier) { RK_TIER = 'all'; if (btn) btn.classList.remove('active'); }
  else { RK_TIER = tier; document.querySelectorAll('.ranked-tier-btn').forEach(b => b.classList.remove('active')); if (btn) btn.classList.add('active'); }
  renderRanked();
}

function searchRanked(v){ RK_SEARCH=(v||'').trim().toLowerCase(); renderRanked(); }
function sortRanked(v){ RK_SORT=v; renderRanked(); }
function sortStats(k){ STATS_SORT=k; renderStats(STATS_CLS); }
function toggleRankLegend(btn){ const b=document.getElementById('rank-legend-body'); const open=(b.style.display==='none'||!b.style.display); b.style.display=open?'block':'none'; btn.setAttribute('aria-expanded', open?'true':'false'); }
// Ranked table is rendered when its page is opened, not during homepage startup.


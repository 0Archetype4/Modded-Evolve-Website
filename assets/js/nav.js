/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
window.addEventListener('scroll', () => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  const scrolled = window.scrollY;
  const total = document.documentElement.scrollHeight - window.innerHeight;
  bar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';

  // Scroll-to-top button visibility
  const btn = document.getElementById('scroll-top');
  if (btn) btn.classList.toggle('visible', scrolled > 300);
}, { passive: true });

/* ============================================================
   PAGE TRANSITIONS
   ============================================================ */
const HIDDEN_PAGES = ['ranked'];        // built, but not for the public yet

function activateSiteSection(name) {
  if (name === 'gallery-music') {
    if (typeof musicActivatePage === 'function') musicActivatePage();
  } else if (typeof musicDeactivatePage === 'function') {
    musicDeactivatePage();
  }
  if (name === 'voices' && typeof vlInitPage === 'function') vlInitPage();
  if (name === 'ranked' && typeof loadRankedData === 'function') loadRankedData();
  if (name === 'history' && typeof loadPatchHistory === 'function') loadPatchHistory();
  if (name === 'characters' && typeof applyImages === 'function') applyImages();
}

function toggleNav() {
  var links = document.querySelector('.nav-links'), btn = document.getElementById('nav-toggle');
  var open = links.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
function showPage(name) {
  var navLinks = document.querySelector('.nav-links'); if (navLinks) navLinks.classList.remove('open');
  if (HIDDEN_PAGES.includes(name)) return false;
  const current = document.querySelector('section.active');
  const next = document.getElementById(name);
  if (!next || next === current) return false;

  if (current) {
    current.classList.remove('active');
  }

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));

  // Gallery sub-pages all highlight the "Gallery" nav link
  const galleryPages = ['gallery', 'gallery-images', 'gallery-videos', 'gallery-music', 'gallery-maps', 'voices'];
  if (galleryPages.includes(name)) {
    const navGallery = document.getElementById('nav-gallery');
    if (navGallery) navGallery.classList.add('active');
  } else {
    const navLink = document.getElementById('nav-' + name);
    if (navLink) navLink.classList.add('active');
  }

  next.classList.add('active');
  next.classList.remove('page-enter');
  void next.offsetWidth; // force reflow
  next.classList.add('page-enter');

  // Show/hide Hunter Dialogue back bar — now inline, nothing to do here

  activateSiteSection(name);

  window.scrollTo(0, 0);

  // Update URL hash
  setUrlHash('#' + name);
  return false;
}

/* ============================================================
   URL HASH ROUTING
   ============================================================ */
function handleHash() {
  const hash = window.location.hash.slice(1);
  if (!hash) {
    document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    document.getElementById('home')?.classList.add('active');
    document.getElementById('nav-home')?.classList.add('active');
    activateSiteSection('home');
    return;
  }
  const parts = hash.split('/');
  const page = parts[0];
  const sub = parts[1];
  const section = document.getElementById(page);
  if (!section || HIDDEN_PAGES.includes(page)) return;

  // Navigate to the page
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  section.classList.add('active');
  activateSiteSection(page);
  const navLink = document.getElementById('nav-' + page);
  if (navLink) navLink.classList.add('active');

  // If characters page with a character specified
  if (page === 'characters' && sub) {
    const card = document.querySelector('.char-card[data-name="' + decodeURIComponent(sub) + '"]');
    if (card) {
      const cls = card.dataset.class;
      const filterBtn = document.querySelector('.char-roster-pick .mh-class[data-cls="' + cls + '"]');
      if (filterBtn) filterClass(cls, filterBtn);
      // Find and click the character's sub-nav button
      setTimeout(() => {
        const charBtn = Array.from(document.querySelectorAll('.char-btn'))
          .find(b => b.textContent.trim() === decodeURIComponent(sub));
        if (charBtn) charBtn.click();
      }, 50);
    }
  }

  // If history page with a patch specified
  if (page === 'history' && sub) {
    const ready = loadPatchHistory();
    if (ready && typeof ready.then === 'function') {
      ready.then(() => jumpToPatch(sub));
    } else {
      setTimeout(() => jumpToPatch(sub), 50);
    }
  }
}

window.addEventListener('popstate', handleHash);
document.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    handleHash();
  } else {
    // Activate home page by default
    const home = document.getElementById('home');
    const navHome = document.getElementById('nav-home');
    if (home) home.classList.add('active');
    if (navHome) navHome.classList.add('active');
  }
});

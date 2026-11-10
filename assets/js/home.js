(function () {
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  function syncHomeLatestPatch() {
    try {
      var p = document.querySelector('#history .patch-entry.latest') || document.querySelector('#history .patch-entry');
      if (p) {
        var v = p.querySelector('.version-badge'),
            d = p.querySelector('.patch-date'),
            desc = p.querySelector('.patch-preface p') || p.querySelector('.patch-preface');
        if (v && document.getElementById('mh-patch-v')) document.getElementById('mh-patch-v').textContent = v.textContent.trim();
        if (d && document.getElementById('mh-patch-d')) document.getElementById('mh-patch-d').textContent = d.textContent.trim();
        if (desc && document.getElementById('mh-patch-desc')) document.getElementById('mh-patch-desc').textContent = desc.textContent.trim();
      }
    } catch (e) {}
  }
  document.addEventListener('patches:rendered', syncHomeLatestPatch);
  ready(function () {
    syncHomeLatestPatch();

    // Reveal sections on scroll
    var els = document.querySelectorAll('#home .mh-reveal');
    if ('IntersectionObserver' in window && els.length) {
      var io = new IntersectionObserver(function (rows) {
        rows.forEach(function (r) { if (r.isIntersecting) { r.target.classList.add('in'); io.unobserve(r.target); } });
      }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
      els.forEach(function (e) { io.observe(e); });
    } else { els.forEach(function (e) { e.classList.add('in'); }); }

    // Keep the nav solid (black) on the home page
    var nav = document.querySelector('nav');
    if (nav) nav.classList.remove('nav-transparent');
  });
})();

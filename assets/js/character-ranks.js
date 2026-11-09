/* Mirror the selected ability rank in the detailed Link Damage table.
   Replaces the per-card inline scripts that used to live in index.html. */
(function () {
  document.querySelectorAll('.char-item-col').forEach(function (col) {
    var cells = col.querySelectorAll('.ek-col');
    if (!cells.length) return;

    function applyRank(activeIdx) {
      cells.forEach(function (el) {
        var match = el.className.match(/ek-col-(\d)/);
        var elIdx = match ? parseInt(match[1], 10) : -1;
        if (activeIdx === -1) {
          el.style.opacity = '1';
          el.style.background = 'transparent';
        } else if (elIdx === activeIdx) {
          el.style.opacity = '1';
          el.style.background = 'rgba(139,26,26,0.15)';
        } else {
          el.style.opacity = '0.2';
          el.style.background = 'transparent';
        }
      });
    }

    // setAbilityRank already controls the selected rank. This listener
    // only mirrors the state in the detailed Link Damage table; toggling
    // buttons again here would cancel the user's selection.
    col.querySelectorAll('.rank-btn').forEach(function (btn, i) {
      btn.addEventListener('click', function () {
        applyRank(btn.classList.contains('active') ? i : -1);
      });
    });
  });
})();

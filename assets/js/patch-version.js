// Auto-update download patch version from latest patch in history
(function() {
  function updatePatchVersion() {
    var latest = document.querySelector('.patch-entry.latest .version-badge');
    var target = document.getElementById('latest-patch-version');
    if (latest && target) {
      target.textContent = latest.textContent.trim();
    }
  }
  document.addEventListener('patches:rendered', updatePatchVersion);
})();

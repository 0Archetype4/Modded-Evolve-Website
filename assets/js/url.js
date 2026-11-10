/* Keeps the address bar in sync with the current page.
   Some browsers reject history.pushState on file:// URLs with a SecurityError.
   Falling back to a plain hash update keeps navigation working there too. */
function setUrlHash(hash) {
  if (!hash) return;
  try {
    history.pushState(null, '', hash);
    return;
  } catch (err) {
    /* fall through to the hash fallback */
  }
  try {
    location.hash = hash;
  } catch (err) {
    /* the page already switched; only the URL cannot be updated */
  }
}

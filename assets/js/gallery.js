function openVideo(src, title) {
  const lb = document.getElementById('video-lightbox');
  const player = document.getElementById('video-lightbox-player');
  const titleEl = document.getElementById('video-lightbox-title');
  player.src = src;
  titleEl.textContent = title.replace(/_/g, ' ');
  lb.classList.add('active');
  player.play().catch(() => {});
}
function closeVideo() {
  const lb = document.getElementById('video-lightbox');
  const player = document.getElementById('video-lightbox-player');
  player.pause();
  player.src = '';
  lb.classList.remove('active');
}
document.getElementById('video-lightbox').addEventListener('click', function(e) {
  if (e.target === this) closeVideo();
});
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeVideo();
});

// Map biome filter
function filterMaps(biome, btn) {
  document.querySelectorAll('.map-biome-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.map-card').forEach(card => {
    card.style.display = (biome === 'all' || card.dataset.biome === biome) ? '' : 'none';
  });
}

// Image lightbox
function openImage(src, alt) {
  const lb = document.getElementById('img-lightbox');
  const img = document.getElementById('img-lightbox-img');
  img.src = src;
  img.alt = alt;
  lb.classList.add('active');
}
function closeImage() {
  document.getElementById('img-lightbox').classList.remove('active');
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeImage();
});

// Gallery dropdown toggle
function toggleGalleryDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  const menu = document.getElementById('gallery-dropdown-menu');
  menu.classList.toggle('open');
}

document.addEventListener('click', function(e) {
  const menu = document.getElementById('gallery-dropdown-menu');
  if (menu && !menu.closest('.nav-dropdown').contains(e.target)) {
    menu.classList.remove('open');
  }
});

// Close dropdown when a sub-page is selected
document.querySelectorAll('#gallery-dropdown-menu a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('gallery-dropdown-menu').classList.remove('open');
  });
});

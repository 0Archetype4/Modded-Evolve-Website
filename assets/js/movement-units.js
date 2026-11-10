(function(){
  function applyMovementUnits(){
    document.querySelectorAll('#characters [data-stat*=".traversal."]').forEach(function(node){
      var id=node.getAttribute('data-stat')||'';
      if(!/(?:\.|-)(?:glide-speed(?:-tranquilized|-stasis)?|horizontal-speed|vertical-speed|top-speed|minimum-speed|sling-jump-velocity|leap-takeoff-speed)$/.test(id)) return;
      if(node.nextElementSibling && node.nextElementSibling.classList.contains('traversal-unit')) return;
      if(node.closest('.traversal-stage-values')?.querySelector('.traversal-unit')) return;
      if(/m\s*\/\s*s/.test(node.textContent)) return;
      node.appendChild(document.createTextNode(' m/s'));
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyMovementUnits);
  else applyMovementUnits();
})();

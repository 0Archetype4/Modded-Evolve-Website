function togglePerkRole(role){
  var panel=document.getElementById('perks-panel-'+role);
  if(!panel)return;
  var willOpen=!panel.classList.contains('expanded');
  ['monster','hunter'].forEach(function(r){
    var p=document.getElementById('perks-panel-'+r);
    var b=document.querySelector('.perks-toggle.sec-'+r);
    var open=(r===role)&&willOpen;
    if(p) p.classList.toggle('expanded',open);
    if(b) b.setAttribute('aria-expanded',open?'true':'false');
  });
  var bar=document.getElementById('perk-tierbar');
  if(bar) bar.hidden=!willOpen;
}
function selectPerkTier(tier){
  document.getElementById('systems-perks').dataset.tier=tier;
  document.querySelectorAll('.perk-tierbtn').forEach(function(b){
    b.classList.toggle('active',b.dataset.tier===tier);
  });
}

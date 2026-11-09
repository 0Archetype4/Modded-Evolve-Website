/* Universal image loader: shows the loading wheel in each image's container
   while it loads, then fades the image in. No wrappers -> no layout shift. */
(function(){
  var WHEEL='https://assets.modded-evolve.com/images/icons/loadingwheelicon.webp';
  function eligible(img){
    if(img.dataset.il) return false;
    if(img.classList.contains('loader-wheel')) return false;
    if(img.closest && img.closest('.il-overlay')) return false;
    var s=img.getAttribute('src')||'';
    if(s.indexOf('loadingwheelicon')>-1) return false;
    if(s.indexOf('data:')===0) return false;
    return true;
  }
  var io=('IntersectionObserver' in window) ? new IntersectionObserver(function(en){
    en.forEach(function(e){ if(e.isIntersecting){ io.unobserve(e.target); engage(e.target); } });
  },{rootMargin:'300px'}) : null;
  function setup(img){
    if(!eligible(img)) return;
    img.dataset.il='1';
    if(img.complete && img.naturalWidth>0){ img.classList.add('il-img','il-done'); return; }
    img.classList.add('il-img');
    if(io) io.observe(img); else engage(img);
  }
  function engage(img){
    if(img.classList.contains('il-done')) return;
    if(img.complete && img.naturalWidth>0){ img.classList.add('il-done'); return; }
    var parent=img.parentElement;
    if(!parent){ img.classList.add('il-done'); return; }
    if(getComputedStyle(parent).position==='static') parent.classList.add('il-relctx');
    var ov=null;
    var t=setTimeout(function(){
      if(img.classList.contains('il-done')) return;
      ov=document.createElement('span'); ov.className='il-overlay';
      var w=document.createElement('img'); w.src=WHEEL; w.alt=''; w.setAttribute('aria-hidden','true');
      ov.appendChild(w); parent.appendChild(ov);
    },110);
    function done(){
      clearTimeout(t); img.classList.add('il-done');
      if(ov){ ov.classList.add('il-hide'); setTimeout(function(){ if(ov&&ov.parentNode) ov.parentNode.removeChild(ov); },320); }
    }
    img.addEventListener('load',done,{once:true});
    img.addEventListener('error',done,{once:true});
    setTimeout(function(){ if(!img.classList.contains('il-done')) done(); },12000);
  }
  function scan(root){ (root||document).querySelectorAll('img').forEach(setup); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){scan();});
  else scan();
  new MutationObserver(function(muts){
    for(var i=0;i<muts.length;i++){
      var a=muts[i].addedNodes;
      for(var j=0;j<a.length;j++){
        var n=a[j]; if(n.nodeType!==1) continue;
        if(n.tagName==='IMG') setup(n);
        else if(n.querySelectorAll) n.querySelectorAll('img').forEach(setup);
      }
    }
  }).observe(document.documentElement,{childList:true,subtree:true});
})();

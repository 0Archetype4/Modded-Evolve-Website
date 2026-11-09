  var GM_MODES={"hunt": {"desc": "Hunters must find and kill the Monster before the Monster kills them. When the Monster reaches Stage 3, it can destroy the power relay.", "monster": "Evade the Hunters and feed to evolve. At Stage 3, kill the Hunters or destroy the power relay.", "hunters": "Track down the Monster and kill it before it reaches Stage 3 and destroys the power relay."}, "nest": {"desc": "The Monster must kill the Hunters before they destroy all the eggs and minions. The Monster can hatch an egg to spawn a minion, but at the cost of the egg.", "monster": "Guard your eggs and kill the Hunters. Hatch an egg to spawn a minion, but you lose that egg.", "hunters": "Destroy every egg and minion before time runs out, or kill the Monster."}, "rescue": {"desc": "Hunters must revive and evacuate 5 survivors before the Monster kills 5 of them.", "monster": "Reach the survivors first and kill 5 of them before they can be evacuated.", "hunters": "Revive and evacuate 5 survivors before the Monster kills 5 of them."}, "defend": {"desc": "Monsters must destroy the transport ship's power source before time expires. Hunters must defend for the remaining time or kill the Monster.", "monster": "Lead your minions through the generators and destroy the ship's power source before time runs out.", "hunters": "Hold the line and defend the power source until time expires, or kill the Monster."}, "arena": {"desc": "Hunters and Monsters battle in a 'Best-of' series of Mobile Arenas.", "monster": "Kill all four Hunters before they bring you down.", "hunters": "Corner and kill the Monster before it kills the team."}, "evacuation": {"desc": "Play 5 missions in a dynamic campaign where different game modes are played and players affect the environment by winning and losing.", "monster": "Win each day to tilt the planet in your favor, then destroy the colonists' escape ship in the Day 5 finale.", "hunters": "Win each day to earn advantages, then protect the evacuation ship in the Day 5 finale.", "note": "Evacuation strings Hunt, Nest, Rescue and Defend across five days; the side objectives above summarize the campaign arc."}};
  var gmCurrent='hunt', gmLocked=false;
  function gmApplyText(key){
    var d=GM_MODES[key]||{};
    document.getElementById('gm-desc').textContent=d.desc||'';
    document.getElementById('gm-monster-text').textContent=d.monster||'';
    document.getElementById('gm-hunter-text').textContent=d.hunters||'';
    var n=document.getElementById('gm-note');
    if(d.note){n.textContent=d.note;n.style.display='';}else{n.style.display='none';}
  }
  function gmLock(){
    var st=document.getElementById('gm-stage');
    if(!st||st.offsetParent===null) return;
    st.style.minHeight=''; var mx=0,k;
    for(k in GM_MODES){gmApplyText(k); if(st.offsetHeight>mx) mx=st.offsetHeight;}
    gmApplyText(gmCurrent);
    st.style.minHeight=mx+'px';
    gmLocked=true;
  }
  function gmSelect(btn,name,vk,key){
    document.querySelectorAll('.gm-crest').forEach(function(c){c.classList.remove('active');});
    btn.classList.add('active');
    gmCurrent=key;
    var t=document.getElementById('gm-stage-thumb');
    t.setAttribute('data-video','https://assets.modded-evolve.com/videos/legacyevolve/'+vk+'.mp4');
    t.setAttribute('data-name',name);
    var img=document.getElementById('gm-stage-img');
    img.src='https://assets.modded-evolve.com/images/videothumbs/legacyevolve/'+vk+'.jpg'; img.alt=name;
    gmApplyText(key);
    if(!gmLocked) gmLock();
  }
  function gmPlay(){
    var t=document.getElementById('gm-stage-thumb');
    openVideo(t.getAttribute('data-video'), t.getAttribute('data-name'));
  }
  window.addEventListener('resize',function(){var st=document.getElementById('gm-stage');if(st&&st.offsetParent!==null){gmLocked=false;gmLock();}});
  window.addEventListener('load',function(){setTimeout(gmLock,80);});

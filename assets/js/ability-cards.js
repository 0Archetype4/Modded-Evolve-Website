/* Compact ability cards: no duplicate data-stat bindings and no external dependencies. */
(function () {
  'use strict';
  var compactSources=[];
  var compactCards=[];
  var selectedLabels=/\b(damage|dps|healing|shield|cooldown|rate of fire|range|speed|ammo capacity|maximum|radius|duration|pellet|tick|respawn)\b/i;
  var excludeLabels=/\b(spread|rotation|angle|reload delay|movement modifier|jetpack|acquire|maintain|minimum ammo|decay during cooldown)\b/i;
  // Preserve inline markup (including Tesla Mine's colored stage names)
  // while excluding the verbose stat lists and other block content.
  function firstLine(notes){
    var fragment=document.createDocumentFragment();
    for(var n=notes.firstChild;n;n=n.nextSibling){
      if(n.nodeType===1 && /^(UL|OL|DETAILS|P|DIV|TABLE|H[1-6])$/.test(n.tagName)) break;
      if(n.nodeType===3 || n.nodeType===1) fragment.appendChild(n.cloneNode(true));
    }
    return fragment;
  }
  function statRank(li,position){
    var s=(li.textContent||'').toLowerCase();
    if(excludeLabels.test(s)) return -100;
    var score=0;
    if(/damage.*per second|healing.*per second|shield.*per second/.test(s)) score+=125;
    else if(/damage|healing|shield/.test(s)) score+=110;
    else if(/cooldown|rate of fire|tick rate|tick frequency/.test(s)) score+=93;
    else if(/range|maximum|radius|speed/.test(s)) score+=70;
    else if(/ammo capacity|pellet|duration/.test(s)) score+=60;
    else score+=20;
    if(!selectedLabels.test(s)) score-=60;
    return score - position*.5;
  }
  // Some stat templates keep the % symbol outside the numeric span.
  // Read the source row as well as its value so compact cards never lose
  // percentage units when stats are populated from the external JSON.
  function sourceUsesPercent(li){
    return /(?:\d|…|—)\s*%/.test(li.textContent||'');
  }
  function ensurePercentUnit(value, expected){
    var text=String(value||'').trim().replace(/\s+%/g,'%');
    if(!expected || !text || /[…—]/.test(text)) return text;
    // Retain explicit signs, preserve already-formatted values, and don't
    // add % to multipliers, seconds, or other non-numeric values.
    return text.split(/\s*\/\s*/).map(function(piece){
      return /^[+−-]?\d[\d,]*(?:\.\d+)?%?$/.test(piece)
        ? piece.replace(/%?$/,'%') : piece;
    }).join(' / ');
  }
  function formattedStat(li){
    var text=(li.textContent||'').replace(/\s+/g,' ').trim();
    // A Stage/Rank legend describes the columns, not the stat itself.
    var body=text.replace(/\(\s*(?:Stage|Rank)\s*1\s*\|\s*2\s*\|\s*3\s*\)/gi,'').trim();
    var rankNodes=Array.from(li.querySelectorAll('.rank-val'));
    var values=rankNodes.length
      ? rankNodes.map(function(e){return e.textContent.trim();})
      : (body.match(/[+−-]?\d[\d,]*(?:\.\d+)?%?|…/g)||[]).slice(0,1);
    var unknown=values.length===0 || values.some(function(v){return v.includes('…') || v==='—';}) || /:\s*—/.test(body);
    // The detail row and compact caption use the same stat name and units.
    // Many source labels read like "Damage of 30 per tick". The compact
    // tile puts 30 above its caption, so remove the connecting "of" *before*
    // removing the numeric value (also handles unknown JSON placeholders).
    // This leaves natural captions such as "Damage per tick", "Cooldown",
    // "Damage to deployables in the cloud", and "Damage Reduction".
    var captionBody=body.replace(/\bof\s+(?=[+−-]?(?:\d|…|—))/gi,'');
    var label=captionBody.replace(/[+−-]?\d[\d,]*(?:\.\d+)?%?|…|—/g,' ')
      .replace(/\s*\|\s*/g,' ')
      .replace(/%/g,' ') // Percentage symbol belongs with the number above.
      .replace(/\s+/g,' ').trim();
    // The weak-point multiplier's symbol belongs with its numeric value,
    // not the compact stat description (e.g. '... by ×').
    label=label.replace(/\s+by\s*×\s*$/i,'');
    // Also remove dangling connectors if any dynamic stat uses a different
    // text shape, without stripping meaningful phrases like "Number of mines".
    label=label.replace(/\bof\b(?=\s*(?:per\b|to\b|upon\b|on\b|when\b|while\b|before\b|after\b|$))/gi,'')
      .replace(/\s+/g,' ').trim();
    // Units appear with the value, not twice in the compact card.
    var units='';
    if(/\bshots? per minute\b/i.test(label)) {
      units=' shots/min'; label=label.replace(/\bshots? per minute\b/gi,'');
    } else if(/\bper second\b/i.test(label)) {
      units='/s'; label=label.replace(/\bper second\b/gi,'');
    } else if(/\bseconds?\b/i.test(label)) units='s';
    else if(/\bmeters?\b/i.test(label)) units='m';
    else if(/\bdegrees?\b/i.test(label)) units='°';
    label=label.replace(/\bseconds?\b|\bmeters?\b|\bdegrees?\b/gi,'').replace(/\s+/g,' ').trim();
    if(!label) label='Statistic';
    if(unknown) return {value:'—',label:label};
    var numeric=values.map(function(v){
      return ensurePercentUnit(v.replace(/\s/g,''),sourceUsesPercent(li));
    });
    var value=numeric.join(' / ');
    if(numeric.length===1 && units && !/[a-z°%]/i.test(value)) value+=units;
    return {value:value,label:label};
  }
  // Multi-stage abilities use one base-damage highlight plus their useful
  // gameplay stats. Values are read from existing JSON-bound detailed rows;
  // no stat values are hardcoded or fetched separately.
  var compactStatSelections = {
    'Blitz Markov::item0.notes': [
      {id:'blitz-markov.abilities.tesla-gun.blue-beam.damage-of-per-second', label:'Base damage / second'},
      {id:'blitz-markov.abilities.tesla-gun.main.range-of-meters', label:'Range'},
      {id:'blitz-markov.abilities.tesla-gun.main.ammo-capacity-of', label:'Ammo capacity'},
      {id:'blitz-markov.abilities.tesla-gun.main.time-to-progress-through-each-beam-of-seconds', label:'Beam stage time'}
    ],
    'Blitz Markov::item2.notes': [
      {id:'blitz-markov.abilities.tesla-mine.blue-mine.damage-of-per-explosion', label:'Base damage'},
      {id:'blitz-markov.abilities.tesla-mine.main.explosion-radius-of-meters', label:'Explosion radius'},
      {id:'blitz-markov.abilities.tesla-mine.main.maximum-of-tesla-mine-in-the-world', label:'Maximum active mines'},
      {id:'blitz-markov.abilities.tesla-mine.main.arm-time-of-seconds', label:'Arm time'}
    ]
  };
  // The two Rock Throws use different primary compact stats. This changes
  // presentation only; the underlying detailed values remain untouched.
  var primaryMonsterDamageOverrides = {
    'Goliath::item0.notes': 'goliath.abilities.rock-throw.splash-damage.damage-of',
    'Meteor Goliath::item0.notes': 'meteor-goliath.abilities.rock-throw.direct-damage.damage-of'
  };
  // Compact-only secondary stats, kept in a fixed order instead of relying
  // on the global priority ranking (which otherwise selects throw speed/tick frequency).
  var rockThrowCompactStats = {
    'Goliath::item0.notes': [
      {id:'goliath.abilities.rock-throw.direct-damage.damage-of',label:'Direct damage'},
      {id:'goliath.abilities.rock-throw.main.cooldown-of-seconds',label:'Cooldown'},
      {id:'goliath.abilities.rock-throw.splash-damage.maximum-radius-of-meters',label:'Maximum splash radius'}
    ],
    'Meteor Goliath::item0.notes': [
      {id:'meteor-goliath.abilities.rock-throw.splash-damage.damage-of',label:'Splash damage'},
      {id:'meteor-goliath.abilities.rock-throw.main.cooldown-of-seconds',label:'Cooldown'},
      {id:'meteor-goliath.abilities.rock-throw.goliath-meteor-burn-dot.damage-of-per-second',
       durationId:'meteor-goliath.abilities.rock-throw.goliath-meteor-burn-dot.duration-of-seconds',
       burn:true,label:'Meteor Burn'}
    ]
  };
  // Other monster abilities retain the default primary-damage scoring.
  function isDamageLine(li){
    var slug=(li.getAttribute('data-stat')||'').split('.').pop().replace(/-/g,' ');
    return /\bdamage\b/i.test(slug);
  }
  function monsterDamageScore(li){
    var id=li.getAttribute('data-stat')||'';
    var group=id.split('.').slice(-2,-1)[0]||'';
    var slug=id.split('.').pop()||'';
    var score=0;
    if(li.querySelectorAll('.rank-val').length===3) score+=200;
    if(/^(main|direct-damage|main-projectile)$/.test(group)) score+=40;
    if(/(?:^|-)direct(?:-|$)|(?:^|-)impact(?:-|$)|(?:^|-)initial(?:-|$)/.test(slug)) score+=20;
    if(/(?:^|-)damage-of$/.test(slug)) score+=10;
    if(/splash|burn|dot|acid-pool|blizzard|frost|poison/.test(group)) score-=30;
    if(/per-second|per-tick/.test(slug)) score-=8;
    return score;
  }
  function stageDamageLabel(li){
    var slug=(li.getAttribute('data-stat')||'').split('.').pop();
    var label=/impact-damage/.test(slug)?'Impact damage':
      /initial-grapple-damage/.test(slug)?'Initial grapple damage':
      /explosion-damage/.test(slug)?'Explosion damage':
      /direct-damage/.test(slug)?'Direct damage':'Damage';
    if(/per-second/.test(slug)) label+=' per second';
    else if(/per-tick/.test(slug)) label+=' per tick';
    return label;
  }
  function updateOne(m){
    if(m.burn){
      // The burn has two independent JSON-bound fields. Combine them only
      // for this compact card; neither update tick frequency nor static
      // values belong in the compact summary.
      var damage=formattedStat(m.source).value.replace(/\/s$/,'').trim();
      var duration=formattedStat(m.burn.duration).value.replace(/s$/,'').trim();
      m.label.textContent='Meteor Burn';
      m.value.textContent='Damage of '+damage+' per second for '+duration+' seconds';
      return;
    }
    if(m.stages){
      var ranks=m.source.querySelectorAll('.rank-val');
      var buttons=m.source.closest('.char-item-col').querySelectorAll('.rank-btn');
      var selected=Array.from(buttons).findIndex(function(b){return b.classList.contains('active');});
      m.stages.forEach(function(stage,i){
        var raw=ranks[i] ? ranks[i].textContent.trim() : '';
        // Values are sourced from the very same JSON-filled rank elements as
        // the detailed view. Never invent fallback damage numbers.
        var value=raw && !/[…—]/.test(raw)
          ? ensurePercentUnit(raw,sourceUsesPercent(m.source)) : '—';
        stage.value.textContent=value;
        stage.node.setAttribute('aria-label','Stage '+(i+1)+': '+value);
        stage.node.classList.toggle('is-selected',selected===i);
      });
      m.label.textContent=m.overrideLabel || stageDamageLabel(m.source);
      return;
    }
    var result=formattedStat(m.source);
    m.value.textContent=result.value;
    m.label.textContent=m.overrideLabel || result.label;
  }
  function refreshRankUpgradeCards(){
    compactCards.forEach(function(card){
      var upgrades=[];
      card.notes.querySelectorAll('li[data-stat]').forEach(function(li){
        if(card.primary.has(li.getAttribute('data-stat'))) return;
        var values=Array.from(li.querySelectorAll('.rank-val')).map(function(v){return v.textContent.trim();});
        if(!values.length){
          // Some legacy detail rows use plain 'rank 1 | rank 2 | rank 3' text
          // rather than rank-val spans. Only interpret explicit three-part rows.
          var plain=li.textContent.replace(/\(\s*(?:Stage|Rank)\s+1\s*\|\s*2\s*\|\s*3\s*\)/gi,'');
          var matches=plain.match(/([+−-]?\d[\d,]*(?:\.\d+)?%?)\s*\|\s*([+−-]?\d[\d,]*(?:\.\d+)?%?)\s*\|\s*([+−-]?\d[\d,]*(?:\.\d+)?%?)/);
          if(matches) values=matches.slice(1);
        }
        if(values.length!==3 || values.some(function(v){return !v || /[…—]/.test(v);}) || values.every(function(v){return v===values[0];})) return;
        var firstText=li.firstChild && li.firstChild.nodeType===3 ? li.firstChild.nodeValue : '';
        var label=firstText.replace(/\bof\s*$/i,'').replace(/[:\s]+$/,'').trim();
        if(!label) label=(li.getAttribute('data-stat')||'').split('.').pop().replace(/-/g,' ');
        upgrades.push({label:label, values:values.join(' / ')});
      });
      var host=card.block.querySelector('.ability-rank-upgrades');
      if(!upgrades.length){if(host) host.hidden=true;return;}
      if(!host){
        host=document.createElement('div');host.className='ability-rank-upgrades';
        var title=document.createElement('div');title.className='ability-rank-upgrades-title';title.textContent='Also changes by rank (1 / 2 / 3)';
        var list=document.createElement('div');list.className='ability-rank-upgrades-list';
        host.append(title,list);
        card.block.insertBefore(host,card.block.querySelector('.ability-show-details'));
      }
      host.hidden=false;
      var list=host.querySelector('.ability-rank-upgrades-list');list.replaceChildren();
      upgrades.forEach(function(u){
        var pill=document.createElement('div');pill.className='ability-rank-upgrade';
        pill.append(document.createTextNode(u.label+': '));
        var val=document.createElement('strong');val.textContent=u.values;pill.appendChild(val);list.appendChild(pill);
      });
    });
  }
  // Chain Lightning's four target hits live in a detailed-view table,
  // rather than individual li[data-stat] rows. Mirror the existing cells
  // instead of inventing damage values or maintaining a second data source.
  var chainLightningCompactTables=[];
  function refreshChainLightningDamage(){
    chainLightningCompactTables.forEach(function(entry){
      var selected=Array.from(entry.col.querySelectorAll('.rank-btn')).findIndex(function(btn){
        return btn.classList.contains('active');
      });
      entry.cells.forEach(function(cell){
        var source=cell.source.textContent.trim();
        cell.value.textContent=source && !/[.…—]/.test(source) ? source : '—';
        cell.value.classList.toggle('is-selected',cell.rank===selected);
      });
      entry.headers.forEach(function(header,rank){
        header.classList.toggle('is-selected',rank===selected);
      });
    });
  }
  function refreshAbilityPreviews(){ compactSources.forEach(updateOne); refreshChainLightningDamage(); refreshRankUpgradeCards(); }
  window.refreshAbilityPreviews=refreshAbilityPreviews;
  function setAbilityView(mode){
    mode=mode==='detailed'?'detailed':'compact';
    document.body.dataset.abilityView=mode;
    document.querySelectorAll('[data-ability-mode]').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.abilityMode===mode));});
    try {localStorage.setItem('evolve-ability-stat-view',mode);} catch(e) {}
    if(mode==='compact') refreshAbilityPreviews();
  }
  window.setAbilityView=setAbilityView;
  function setup(){
    var cols=document.querySelectorAll('#characters .char-card .char-item-col');
    cols.forEach(function(col){
      var notes=col.querySelector('.item-notes');
      if(!notes || col.querySelector('.ability-card-preview')) return;
      var block=document.createElement('div');block.className='ability-card-preview';
      var intro=document.createElement('p');intro.className='ability-blurb';
      intro.appendChild(firstLine(notes));
      if(!intro.textContent.trim()) intro.textContent='See the complete ability details.';
      block.appendChild(intro);
      var choices=Array.from(notes.querySelectorAll('li[data-stat]')).filter(function(li){return !li.closest('details') && !li.classList.contains('bucket-fire-rate-raw');});
      choices=choices.map(function(li,i){return {li:li,score:statRank(li,i),i:i};}).filter(function(x){return x.score>0;});
      choices.sort(function(a,b){return b.score-a.score;});
      choices=choices.slice(0,4);
      var curated=compactStatSelections[notes.getAttribute('data-eid')];
      if(curated){
        choices=curated.map(function(spec){
          var li=Array.from(notes.querySelectorAll('li[data-stat]')).find(function(candidate){
            return candidate.getAttribute('data-stat')===spec.id;
          });
          if(!li) throw new Error('Missing curated ability stat row: '+spec.id);
          return {li:li, overrideLabel:spec.label};
        });
      }
      // A monster ability can expose several damage rows (e.g. direct,
      // splash, burn). Show the best three-rank damage row once, displaying
      // stages 1/2/3 within the same tile; reserve other tiles for utility.
      var monsterDamage=null;
      if(col.closest('.char-card[data-class="monster"]')){
        var rankedDamage=Array.from(notes.querySelectorAll('li[data-stat]')).filter(function(li){
          return !li.closest('details') && !li.classList.contains('bucket-fire-rate-raw') &&
            isDamageLine(li) && li.querySelectorAll('.rank-val').length===3;
        });
        rankedDamage.sort(function(a,b){return monsterDamageScore(b)-monsterDamageScore(a);});
        if(rankedDamage.length){
          var preferredDamageId=primaryMonsterDamageOverrides[notes.getAttribute('data-eid')];
          monsterDamage=rankedDamage.find(function(li){
            return li.getAttribute('data-stat')===preferredDamageId;
          }) || rankedDamage[0];
          var utility=Array.from(notes.querySelectorAll('li[data-stat]')).filter(function(li){
            return !li.closest('details') && !li.classList.contains('bucket-fire-rate-raw') && !isDamageLine(li);
          }).map(function(li,i){return {li:li,score:statRank(li,i)};})
            .filter(function(x){return x.score>0;});
          utility.sort(function(a,b){return b.score-a.score;});
          choices=[{li:monsterDamage,stageDamage:true,
            overrideLabel:preferredDamageId && monsterDamage.getAttribute('data-stat')===preferredDamageId
              ? (notes.getAttribute('data-eid')==='Goliath::item0.notes' ? 'Splash damage' : 'Direct damage')
              : undefined}].concat(utility.slice(0,3));
        }
      }
      // Fire Breath spread grows by rank, so it deserves a compact stat alongside
      // range and cooldown rather than being filtered out as a generic angle.
      if(notes.getAttribute('data-eid')==='Goliath::item2.notes' && monsterDamage){
        var spreadLine=notes.querySelector('li[data-stat="goliath.abilities.fire-breath.main.angle-of-degrees"]');
        if(spreadLine){
          var others=choices.slice(1).filter(function(x){return x.li!==spreadLine;});
          choices=[choices[0], {li:spreadLine,overrideLabel:'Flame spread (degrees)'}].concat(others.slice(0,2));
        }
      }
      var rockSpecs=rockThrowCompactStats[notes.getAttribute('data-eid')];
      if(rockSpecs && monsterDamage){
        function rockStat(id){
          var li=notes.querySelector('li[data-stat="'+id+'"]');
          if(!li) throw new Error('Missing Rock Throw compact stat: '+id);
          return li;
        }
        choices=[choices[0]].concat(rockSpecs.map(function(spec){
          return {li:rockStat(spec.id),overrideLabel:spec.label,
            burn:spec.burn ? {duration:rockStat(spec.durationId)} : null};
        }));
      }
      compactCards.push({notes:notes,block:block,primary:new Set(choices.flatMap(function(x){
        return [x.li.getAttribute('data-stat')].concat(x.burn ? [x.burn.duration.getAttribute('data-stat')] : []);
      }))});
      if(choices.length){
        var subtitle=document.createElement('div');subtitle.className='ability-key-label';subtitle.textContent='Key stats';block.appendChild(subtitle);
        var grid=document.createElement('div');grid.className='ability-key-stats';
        if(monsterDamage) grid.classList.add('ability-key-stats--monster-stages');
        choices.forEach(function(choice){
          var tile=document.createElement('div');tile.className='ability-key-stat';
          var label=document.createElement('span');label.className='ability-key-desc';
          if(choice.stageDamage){
            tile.classList.add('ability-key-stat--stages');
            var stageRow=document.createElement('div');stageRow.className='ability-stage-values';
            var stages=[];
            for(var rank=0;rank<3;rank++){
              var stage=document.createElement('div');stage.className='ability-stage';
              var heading=document.createElement('span');heading.className='ability-stage-number';
              heading.textContent='STAGE '+(rank+1);
              var number=document.createElement('span');number.className='ability-stage-value';
              number.textContent='—';
              stage.append(heading,number);stageRow.appendChild(stage);
              stages.push({node:stage,value:number});
            }
            tile.append(label,stageRow);grid.appendChild(tile);
            compactSources.push({source:choice.li,label:label,stages:stages,overrideLabel:choice.overrideLabel});
          } else {
            var val=document.createElement('span');val.className='ability-key-value';
            if(choice.burn){
              tile.classList.add('ability-key-stat--burn');
              tile.append(label,val);
            } else {
              tile.append(val,label);
            }
            grid.appendChild(tile);
            compactSources.push({source:choice.li,value:val,label:label,overrideLabel:choice.overrideLabel,burn:choice.burn});
          }
        });
        block.appendChild(grid);
      }
      if(notes.getAttribute('data-eid')==='Elder Kraken::item2.notes'){
        var sourceRows=Array.from(notes.querySelectorAll('tr[data-stat^="elder-kraken.abilities.chain-lightning.table-values.target"]'));
        if(sourceRows.length===4){
          var damagePanel=document.createElement('div');damagePanel.className='ability-chain-damage';
          var damageTitle=document.createElement('div');damageTitle.className='ability-chain-damage-title';
          damageTitle.textContent='Link Damage';damagePanel.appendChild(damageTitle);
          var damageTable=document.createElement('table');damageTable.className='ability-chain-damage-table';
          damageTable.setAttribute('aria-label','Chain Lightning damage by target and rank');
          var damageHead=document.createElement('thead');var headRow=document.createElement('tr');
          var targetHeading=document.createElement('th');targetHeading.scope='col';targetHeading.textContent='Target';headRow.appendChild(targetHeading);
          var headers=[];
          for(var r=0;r<3;r++){
            var rankHeading=document.createElement('th');rankHeading.scope='col';rankHeading.textContent='Rank '+(r+1);
            headRow.appendChild(rankHeading);headers.push(rankHeading);
          }
          damageHead.appendChild(headRow);damageTable.appendChild(damageHead);
          var damageBody=document.createElement('tbody');var cells=[];
          sourceRows.forEach(function(sourceRow,i){
            var tr=document.createElement('tr');var th=document.createElement('th');th.scope='row';th.textContent='Target '+(i+1);tr.appendChild(th);
            for(var rank=0;rank<3;rank++){
              var sourceCell=sourceRow.querySelector('.ek-col-'+rank);
              if(!sourceCell) throw new Error('Missing Chain Lightning rank '+(rank+1)+' for target '+(i+1));
              var td=document.createElement('td');td.textContent='—';tr.appendChild(td);
              cells.push({source:sourceCell,value:td,rank:rank});
            }
            damageBody.appendChild(tr);
          });
          damageTable.appendChild(damageBody);damagePanel.appendChild(damageTable);block.appendChild(damagePanel);
          chainLightningCompactTables.push({col:col,cells:cells,headers:headers});
        }
      }
      var btn=document.createElement('button');btn.type='button';btn.className='ability-show-details';btn.textContent='View all stats →';
      btn.setAttribute('aria-label','View detailed stats for '+(col.querySelector('.item-name')?.textContent.trim()||'this ability'));
      btn.addEventListener('click',function(){setAbilityView('detailed');});
      block.appendChild(btn);
      notes.parentNode.insertBefore(block,notes);
    });
    var viewTrigger=document.getElementById('ability-view-trigger');
    var viewPanel=document.getElementById('ability-view-panel');
    var viewDock=document.getElementById('ability-view-dock');
    function closeViewPanel(restoreFocus){
      if(!viewPanel || viewPanel.hidden) return;
      viewPanel.hidden=true;
      viewTrigger.setAttribute('aria-expanded','false');
      if(restoreFocus) viewTrigger.focus();
    }
    if(viewTrigger && viewPanel){
      viewTrigger.addEventListener('click',function(){
        var willOpen=viewPanel.hidden;
        viewPanel.hidden=!willOpen;
        viewTrigger.setAttribute('aria-expanded',String(willOpen));
        if(willOpen){
          var selected=viewPanel.querySelector('[aria-pressed="true"]');
          (selected||viewPanel.querySelector('button'))?.focus();
        }
      });
      document.addEventListener('pointerdown',function(evt){
        if(!viewPanel.hidden && !viewDock.contains(evt.target)) closeViewPanel(false);
      });
      document.addEventListener('keydown',function(evt){
        if(evt.key==='Escape' && !viewPanel.hidden){
          evt.preventDefault();
          closeViewPanel(true);
        }
      });
    }
    document.querySelectorAll('[data-ability-mode]').forEach(function(b){
      b.addEventListener('click',function(){
        setAbilityView(b.dataset.abilityMode);
        closeViewPanel(true);
      });
    });
    var wanted='compact';try{wanted=localStorage.getItem('evolve-ability-stat-view')||'compact';}catch(e){}
    setAbilityView(wanted);
    document.body.classList.add('ability-view-ready');
    document.addEventListener('click',function(evt){
      if(evt.target.closest('#characters .rank-btn')) queueMicrotask(refreshAbilityPreviews);
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup);
  else setup();
})();

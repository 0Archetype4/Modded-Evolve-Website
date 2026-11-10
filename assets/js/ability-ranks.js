function setAbilityRank(btn, abilityId, rank) {
  const col = btn.closest('.char-item-col');
  const isActive = btn.classList.contains('active');
  col.querySelectorAll('.rank-btn').forEach(b => b.classList.remove('active'));
  if (isActive) {
    col.querySelectorAll('.rank-val').forEach(el => el.classList.remove('dimmed'));
    col.querySelectorAll('.rank-sep').forEach(el => el.classList.remove('dimmed'));
  } else {
    btn.classList.add('active');
    col.querySelectorAll('.rank-val').forEach(el => {
      el.classList.toggle('dimmed', parseInt(el.dataset.rank) !== rank);
    });
    col.querySelectorAll('.rank-sep').forEach(el => el.classList.add('dimmed'));
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.item-notes li').forEach(function(li) {
    highlightNumbers(li);
  });
});

function applyRankStageTokens(node) {
  if (node.nodeType === 3) {
    const text = node.textContent;
    if (/\b(Rank|Stage)\s+\d+\b/.test(text)) {
      const span = document.createElement('span');
      span.innerHTML = text.replace(/\b(Rank|Stage)\s+(\d+)\b/g, '<span class="rank-token">$1 $2</span>');
      node.parentNode.replaceChild(span, node);
    }
  } else if (node.nodeType === 1 && !['SCRIPT','STYLE'].includes(node.tagName) && !node.classList.contains('rank-token')) {
    Array.from(node.childNodes).forEach(applyRankStageTokens);
  }
}
function highlightNumbers(node) {
  if (node.nodeType === 3) {
    const text = node.textContent;
    if (/\d/.test(text)) {
      const span = document.createElement('span');
      span.innerHTML = text.replace(/(\d+(?:,\d{3})*(?:\.\d+)?%?)/g, '<span class="stat-num">$1</span>');   // one span per whole number (the old pattern cut 1600 into 160 + 0)
      node.parentNode.replaceChild(span, node);
    }
  } else if (node.nodeType === 1 && !['SCRIPT','STYLE'].includes(node.tagName) && !node.classList.contains('rank-val') && !node.classList.contains('rank-sep') && !node.classList.contains('rank-token')) {
    Array.from(node.childNodes).forEach(highlightNumbers);
  }
}

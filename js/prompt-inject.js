// ═══════════════════════════════════════════
//  36计文章页 — AI 提示词区块自动注入
//  在每篇文章底部渲染：场景+提示词+预期效果
// ═══════════════════════════════════════════

(function() {
  // Only run on article detail pages
  const pnNav = document.querySelector('nav.pn');
  if (!pnNav || typeof PROMPTS_36 === 'undefined') return;

  // Extract slug from URL
  const pathParts = location.pathname.split('/').filter(Boolean);
  const slug = pathParts[pathParts.length - 1] || pathParts[pathParts.length - 2];
  const data = PROMPTS_36[slug];
  if (!data) return;

  // Create prompt block
  const section = document.createElement('section');
  section.className = 'section';
  section.innerHTML = `
    <div class="container">
      <article class="glass" style="border-left:3px solid #00d4aa;position:relative">
        <h2 style="display:flex;align-items:center;gap:8px">
          <span style="font-size:24px">🤖</span>
          AI 提示词 · 第${data.num}计「${data.name}」
        </h2>
        <p style="margin:8px 0 16px;font-size:14px;opacity:.7">
          <strong>场景：</strong>${data.scene}
        </p>
        <div style="position:relative;background:#0d1117;border-radius:12px;padding:18px;border:1px solid rgba(255,255,255,.1)">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px">
            <span style="font-size:11px;color:#fbbf24;font-weight:700;letter-spacing:.05em">💬 可直接复制给 AI / 龙虾使用</span>
            <button id="copyPromptBtn" onclick="copyArticlePrompt()" style="background:#00d4aa;color:#000;border:none;padding:5px 14px;border-radius:6px;font-size:12px;font-weight:700;cursor:pointer">📋 复制提示词</button>
          </div>
          <pre id="promptText" style="white-space:pre-wrap;font-family:'JetBrains Mono','Fira Code','Consolas',monospace;font-size:13px;line-height:1.7;color:rgba(230,238,250,.85);margin:0;max-height:400px;overflow-y:auto">${escapeHtml(data.prompt)}</pre>
        </div>
        <div style="margin-top:14px;padding:12px 16px;background:rgba(34,197,94,.08);border-radius:8px;border-left:3px solid #22c55e">
          <span style="font-size:12px;color:#22c55e;font-weight:600">✅ 预期效果：</span>
          <span style="font-size:13px;color:rgba(230,238,250,.8)">${data.effect}</span>
        </div>
        <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
          <a href="/game/" style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;background:rgba(0,212,170,.1);border:1px solid rgba(0,212,170,.2);border-radius:6px;font-size:12px;color:#00d4aa;font-weight:600">🎮 在游戏中解锁此技能</a>
          <a href="/36/" style="display:inline-flex;align-items:center;gap:4px;padding:6px 14px;background:rgba(77,143,250,.1);border:1px solid rgba(77,143,250,.2);border-radius:6px;font-size:12px;color:#4d8ffa;font-weight:600">📖 查看全部36计</a>
        </div>
      </article>
    </div>
  `;

  // Insert before prev/next nav
  pnNav.parentNode.insertBefore(section, pnNav);

  // Copy function
  window.copyArticlePrompt = function() {
    const text = data.prompt;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('copyPromptBtn');
      btn.textContent = '✅ 已复制';
      btn.style.background = '#22c55e';
      setTimeout(() => { btn.textContent = '📋 复制提示词'; btn.style.background = '#00d4aa'; }, 2000);
    }).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      const btn = document.getElementById('copyPromptBtn');
      btn.textContent = '✅ 已复制';
      setTimeout(() => btn.textContent = '📋 复制提示词', 2000);
    });
  };

  function escapeHtml(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
  }
})();

// ═══════════════════════════════════════════
//  SingClaw Subscribe Component
//  Formspree + localStorage backup
// ═══════════════════════════════════════════

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpznqkdl'; // Replace with real Formspree form ID
const LS_KEY = 'singclaw_subscribers';
const LS_WALLET_KEY = 'singclaw_wallet_address';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSubscribers() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}

function saveSubscriber(email, source) {
  const subs = getSubscribers();
  const entry = {
    email,
    source,
    wallet: localStorage.getItem(LS_WALLET_KEY) || null,
    time: new Date().toISOString()
  };
  // Dedupe by email
  if (!subs.find(s => s.email === email)) {
    subs.push(entry);
    localStorage.setItem(LS_KEY, JSON.stringify(subs));
  }
  return entry;
}

function saveWalletAddress(address) {
  if (address) localStorage.setItem(LS_WALLET_KEY, address);
}

async function handleSubscribe(form, source) {
  const emailInput = form.querySelector('input[type="email"]');
  const btn = form.querySelector('button[type="submit"]');
  const msg = form.querySelector('.sub-msg');
  const email = emailInput?.value?.trim();

  if (!email || !EMAIL_RE.test(email)) {
    if (msg) { msg.textContent = '请输入有效的邮箱地址'; msg.style.color = '#ef4444'; }
    return;
  }

  // Check duplicate
  const existing = getSubscribers();
  if (existing.find(s => s.email === email)) {
    if (msg) { msg.textContent = '✅ 你已经订阅过了！每周攻略会准时送达 🦐'; msg.style.color = '#00d4aa'; }
    emailInput.value = '';
    return;
  }

  btn.disabled = true;
  btn.textContent = '提交中...';

  // Save to localStorage first (backup)
  saveSubscriber(email, source);

  // Submit to Formspree
  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        email,
        source,
        wallet: localStorage.getItem(LS_WALLET_KEY) || '',
        _subject: `SingClaw新订阅 - ${source}`
      })
    });
    if (res.ok) {
      if (msg) { msg.textContent = '🎉 订阅成功！每周一计，准时送达你的邮箱 🦐'; msg.style.color = '#00d4aa'; }
    } else {
      if (msg) { msg.textContent = '✅ 已记录！（邮件服务稍后同步）'; msg.style.color = '#fbbf24'; }
    }
  } catch {
    if (msg) { msg.textContent = '✅ 已记录！（邮件服务稍后同步）'; msg.style.color = '#fbbf24'; }
  }

  emailInput.value = '';
  btn.disabled = false;
  btn.textContent = '订阅';
}

// Auto-inject subscribe CTA into article pages (36计)
function injectArticleCTA() {
  // Only inject on article detail pages (has .pn nav)
  const pnNav = document.querySelector('nav.pn');
  if (!pnNav) return;

  const cta = document.createElement('section');
  cta.className = 'section';
  cta.innerHTML = `
    <div class="container">
      <div class="glass subscribe-cta-article">
        <div style="text-align:center">
          <div style="font-size:36px;margin-bottom:8px">📬</div>
          <h2 style="margin:0 0 6px;font-size:22px;color:#00d4aa">不错过任何一计</h2>
          <p style="color:rgba(230,238,250,.72);font-size:14px;margin-bottom:16px">订阅后每周推送一计攻略，附带实战案例 + 可复制的AI提示词。免费，无垃圾邮件。</p>
          <form class="sub-form-inline">
            <div style="display:flex;gap:8px;max-width:440px;margin:0 auto">
              <input type="email" placeholder="你的邮箱" required
                style="flex:1;padding:10px 14px;border-radius:8px;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:#f5f8ff;font-size:14px;outline:none">
              <button type="submit"
                style="padding:10px 20px;border-radius:8px;border:none;background:linear-gradient(135deg,#00d4aa,#00ff88);color:#000;font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap">订阅</button>
            </div>
            <div class="sub-msg" style="margin-top:8px;font-size:12px;min-height:18px"></div>
          </form>
        </div>
      </div>
    </div>
  `;

  // Insert before the prev/next nav
  pnNav.parentNode.insertBefore(cta, pnNav);

  const subForm = cta.querySelector('.sub-form-inline');
  if (subForm) {
    const source = `article-${location.pathname}`;
    subForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handleSubscribe(subForm, source);
    });
  }
}

// Auto-run on article pages
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectArticleCTA);
} else {
  injectArticleCTA();
}

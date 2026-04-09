// Social Share Buttons - Auto-inject on all pages
(function() {
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const desc = encodeURIComponent(
    document.querySelector('meta[name="description"]')?.content || 
    document.querySelector('meta[property="og:description"]')?.content || 
    ''
  );

  const container = document.createElement('div');
  container.className = 'sc-share';
  container.innerHTML = `
    <div class="sc-share-label">分享到</div>
    <div class="sc-share-buttons">
      <a href="https://twitter.com/intent/tweet?text=${title}&url=${url}" target="_blank" rel="noopener" title="分享到 Twitter/X" class="sc-share-btn sc-share-twitter">𝕏</a>
      <a href="https://service.weibo.com/share/share.php?url=${url}&title=${title}" target="_blank" rel="noopener" title="分享到微博" class="sc-share-btn sc-share-weibo">微博</a>
      <a href="javascript:void(0)" onclick="navigator.clipboard.writeText(window.location.href).then(()=>{this.textContent='已复制 ✓';setTimeout(()=>{this.textContent='复制链接'},1500)})" title="复制链接" class="sc-share-btn sc-share-copy">复制链接</a>
    </div>
  `;

  // Style
  const style = document.createElement('style');
  style.textContent = `
    .sc-share{margin:32px 0;padding:20px 0;border-top:1px solid rgba(255,255,255,.08);text-align:center}
    .sc-share-label{font-size:13px;color:rgba(255,255,255,.4);margin-bottom:12px;letter-spacing:1px}
    .sc-share-buttons{display:flex;gap:10px;justify-content:center;flex-wrap:wrap}
    .sc-share-btn{display:inline-flex;align-items:center;justify-content:center;padding:8px 18px;border-radius:8px;font-size:14px;font-weight:600;text-decoration:none;transition:all .2s;cursor:pointer;border:1px solid rgba(255,255,255,.1);color:#e8ecf4;background:rgba(255,255,255,.04)}
    .sc-share-btn:hover{background:rgba(0,212,170,.12);border-color:rgba(0,212,170,.3);color:#00d4aa}
    .sc-share-twitter{min-width:48px}
    .sc-share-copy{min-width:80px}
  `;
  document.head.appendChild(style);

  // Insert before footer or at end of main
  const footer = document.querySelector('footer');
  const main = document.querySelector('main');
  if (footer) {
    footer.parentNode.insertBefore(container, footer);
  } else if (main) {
    main.appendChild(container);
  } else {
    document.body.appendChild(container);
  }
})();

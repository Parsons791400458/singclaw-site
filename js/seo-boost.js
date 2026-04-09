// SEO Boost - Auto-inject JSON-LD structured data
(function() {
  const path = window.location.pathname;
  
  // Skip non-article pages
  if (!path.startsWith('/36/') && !path.startsWith('/24/')) return;
  if (path === '/36/' || path === '/24/') return; // skip index pages
  
  const title = document.querySelector('h1')?.textContent || document.title;
  const desc = document.querySelector('meta[name="description"]')?.content || 
               document.querySelector('meta[property="og:description"]')?.content || '';
  const url = window.location.href;
  const ogImage = document.querySelector('meta[property="og:image"]')?.content || 'https://singclaw.xyz/assets/og-image.png';
  
  // Determine article section
  const section = path.startsWith('/36/') ? '养虾36计' : '虾24章经';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": desc,
    "url": url,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": "马星克 Maxink",
      "url": "https://singclaw.xyz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SingClaw",
      "url": "https://singclaw.xyz",
      "logo": {
        "@type": "ImageObject",
        "url": "https://singclaw.xyz/favicon.svg"
      }
    },
    "articleSection": section,
    "inLanguage": "zh-CN",
    "datePublished": "2026-04-04",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(jsonLd);
  document.head.appendChild(script);
})();

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 读取 markdown 文件
const mdContent = fs.readFileSync(path.join(__dirname, '启动完整指南.md'), 'utf-8');

// 简单的 markdown 转 HTML
function mdToHtml(md) {
  let html = md
    // 标题
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    // 代码块
    .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // 行内代码
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // 粗体
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 列表
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/^\[ \] (.*$)/gim, '<li>⬜ $1</li>')
    .replace(/^\[x\] (.*$)/gim, '<li>✅ $1</li>')
    // 链接
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // 段落
    .replace(/\n\n/g, '</p><p>');
  
  return `<html><body>${html}</body></html>`;
}

const htmlContent = `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>SingClaw 启动完整指南</title>
  <style>
    @page {
      margin: 2cm;
      size: A4;
    }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #00D4AA;
      border-bottom: 3px solid #00D4AA;
      padding-bottom: 10px;
      font-size: 28px;
    }
    h2 {
      color: #00A080;
      border-left: 4px solid #00D4AA;
      padding-left: 12px;
      margin-top: 30px;
      font-size: 22px;
    }
    h3 {
      color: #333;
      font-size: 18px;
      margin-top: 20px;
    }
    pre {
      background: #1a1a2e;
      color: #00ff9d;
      padding: 15px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 13px;
    }
    code {
      background: #f0f0f0;
      padding: 2px 6px;
      border-radius: 3px;
      font-family: "Menlo", "Consolas", monospace;
      font-size: 13px;
    }
    pre code {
      background: none;
      padding: 0;
      color: inherit;
    }
    strong {
      color: #00A080;
    }
    li {
      margin: 8px 0;
    }
    a {
      color: #00D4AA;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    .page-break {
      page-break-before: always;
    }
    hr {
      border: none;
      border-top: 2px solid #e0e0e0;
      margin: 30px 0;
    }
  </style>
</head>
<body>
${mdToHtml(mdContent)}
</body>
</html>
`;

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
  
  const outputPath = path.join(__dirname, 'docs', 'SingClaw 启动完整指南.pdf');
  
  await page.pdf({
    path: outputPath,
    format: 'A4',
    margin: {
      top: '2cm',
      right: '2cm',
      bottom: '2cm',
      left: '2cm'
    },
    printBackground: true
  });
  
  await browser.close();
  
  console.log('✅ PDF 生成成功:', outputPath);
}

generatePDF().catch(console.error);

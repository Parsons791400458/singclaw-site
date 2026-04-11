#!/usr/bin/env node
/**
 * 为 36 计文章页批量生成并注入 JSON-LD (Article 类型)
 */

const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://singclaw.xyz';
const THIRTY_SIX_DIR = path.join(__dirname, '..', '36');

// 36 计元数据
const thirtySixStratagems = {
  'man-tian-guo-hai': { title: '瞒天过海', position: '第一计' },
  'wei-wei-jiu-zhao': { title: '围魏救赵', position: '第二计' },
  'jie-dao-sha-ren': { title: '借刀杀人', position: '第三计' },
  'yi-yi-dai-lao': { title: '以逸待劳', position: '第四计' },
  'chen-huo-da-jie': { title: '趁火打劫', position: '第五计' },
  'sheng-dong-ji-xi': { title: '声东击西', position: '第六计' },
  'wu-zhong-sheng-you': { title: '无中生有', position: '第七计' },
  'an-du-chen-cang': { title: '暗度陈仓', position: '第八计' },
  'ge-an-guan-huo': { title: '隔岸观火', position: '第九计' },
  'xiao-li-cang-dao': { title: '笑里藏刀', position: '第十计' },
  'li-dai-tao-jiang': { title: '李代桃僵', position: '第十一计' },
  'shun-shou-qian-yang': { title: '顺手牵羊', position: '第十二计' },
  'da-cao-jing-she': { title: '打草惊蛇', position: '第十三计' },
  'jie-shi-huan-hun': { title: '借尸还魂', position: '第十四计' },
  'tiao-hu-li-shan': { title: '调虎离山', position: '第十五计' },
  'yu-qin-gu-zong': { title: '欲擒故纵', position: '第十六计' },
  'pao-zhuan-yu-yin': { title: '抛砖引玉', position: '第十七计' },
  'qin-zei-qin-wang': { title: '擒贼擒王', position: '第十八计' },
  'fu-di-chou-xin': { title: '釜底抽薪', position: '第十九计' },
  'hun-shui-mo-yu': { title: '浑水摸鱼', position: '第二十计' },
  'jin-chan-tuo-qiao': { title: '金蝉脱壳', position: '第二十一计' },
  'guan-men-zhuo-zei': { title: '关门捉贼', position: '第二十二计' },
  'yuan-jiao-jin-gong': { title: '远交近攻', position: '第二十三计' },
  'jia-dao-fa-guo': { title: '假道伐虢', position: '第二十四计' },
  'tou-liang-huan-zhu': { title: '偷梁换柱', position: '第二十五计' },
  'zhi-sang-ma-huai': { title: '指桑骂槐', position: '第二十六计' },
  'jia-chi-bu-dian': { title: '假痴不癫', position: '第二十七计' },
  'shang-wu-chou-ti': { title: '上屋抽梯', position: '第二十八计' },
  'shu-shang-kai-hua': { title: '树上开花', position: '第二十九计' },
  'fan-ke-wei-zhu': { title: '反客为主', position: '第三十计' },
  'mei-ren-ji': { title: '美人计', position: '第三十一计' },
  'kong-cheng-ji': { title: '空城计', position: '第三十二计' },
  'fan-jian-ji': { title: '反间计', position: '第三十三计' },
  'ku-rou-ji': { title: '苦肉计', position: '第三十四计' },
  'lian-huan-ji': { title: '连环计', position: '第三十五计' },
  'zou-wei-shang-ji': { title: '走为上计', position: '第三十六计' },
};

function generateJSONLD(slug, data) {
  const url = `${BASE_URL}/36/${slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${data.title}｜养虾 36 计`,
    "description": `养虾 36 计${data.position}：${data.title}。把虾的能力无声嵌入日常流程，让协作自然发生。`,
    "url": url,
    "author": {
      "@type": "Person",
      "name": "马星克 Maxink",
      "url": "https://singclaw.xyz"
    },
    "publisher": {
      "@type": "Organization",
      "name": "SingClaw",
      "logo": {
        "@type": "ImageObject",
        "url": "https://singclaw.xyz/favicon.svg"
      }
    },
    "datePublished": "2026-04-03",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": "养虾 36 计",
    "keywords": ["养虾", "36 计", "AI 助手", "效率工具", "马星克", "SingClaw"]
  };
}

function injectJSONLD(filePath, jsonldString) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否已存在 JSON-LD
  if (content.includes('"@type": "Article"')) {
    console.log(`  ⚠️  ${path.basename(path.dirname(filePath))} - 已存在 JSON-LD，跳过`);
    return false;
  }
  
  // 在 </head> 前插入 JSON-LD
  const injection = `    <script type="application/ld+json">\n${jsonldString}\n    </script>\n  </head>`;
  content = content.replace('</head>', injection);
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`  ✅ ${path.basename(path.dirname(filePath))} - JSON-LD 注入成功`);
  return true;
}

// 主执行逻辑
let count = 0;
for (const [slug, data] of Object.entries(thirtySixStratagems)) {
  const articleDir = path.join(THIRTY_SIX_DIR, slug);
  const indexPath = path.join(articleDir, 'index.html');
  
  if (fs.existsSync(indexPath)) {
    const jsonld = generateJSONLD(slug, data);
    const jsonldString = JSON.stringify(jsonld, null, 2);
    if (injectJSONLD(indexPath, jsonldString)) {
      count++;
    }
  } else {
    console.log(`  ❌ ${slug} - index.html 不存在`);
  }
}

console.log(`\n📊 完成：${count}/${Object.keys(thirtySixStratagems).length} 篇文章注入 JSON-LD`);

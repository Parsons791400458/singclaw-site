#!/usr/bin/env node
/**
 * SEO Audit Script for SingClaw 36 Strategies
 * Checks: meta tags, JSON-LD, internal links
 */

import { readFile } from 'fs/promises';
import { writeFileSync } from 'fs';
import { join } from 'path';

const STRATEGIES_DIR = join(process.cwd(), '36');

// All 36 strategy slugs from index.html
const strategies = [
  'man-tian-guo-hai', 'wei-wei-jiu-zhao', 'jie-dao-sha-ren', 'yi-yi-dai-lao', 'chen-huo-da-jie', 'sheng-dong-ji-xi',
  'wu-zhong-sheng-you', 'an-du-chen-cang', 'ge-an-guan-huo', 'xiao-li-cang-dao', 'li-dai-tao-jiang', 'shun-shou-qian-yang',
  'da-cao-jing-she', 'jie-shi-huan-hun', 'tiao-hu-li-shan', 'yu-qin-gu-zong', 'pao-zhuan-yu-yin', 'qin-zei-qin-wang',
  'fu-di-chou-xin', 'hun-shui-mo-yu', 'jin-chan-tuo-qiao', 'guan-men-zhuo-zei', 'yuan-jiao-jin-gong', 'jia-dao-fa-guo',
  'tou-liang-huan-zhu', 'zhi-sang-ma-huai', 'jia-chi-bu-dian', 'shang-wu-chou-ti', 'shu-shang-kai-hua', 'fan-ke-wei-zhu',
  'mei-ren-ji', 'kong-cheng-ji', 'fan-jian-ji', 'ku-rou-ji', 'lian-huan-ji', 'zou-wei-shang-ji'
];

const strategyNames = {
  'man-tian-guo-hai': '瞒天过海', 'wei-wei-jiu-zhao': '围魏救赵', 'jie-dao-sha-ren': '借刀杀人', 'yi-yi-dai-lao': '以逸待劳', 'chen-huo-da-jie': '趁火打劫', 'sheng-dong-ji-xi': '声东击西',
  'wu-zhong-sheng-you': '无中生有', 'an-du-chen-cang': '暗渡陈仓', 'ge-an-guan-huo': '隔岸观火', 'xiao-li-cang-dao': '笑里藏刀', 'li-dai-tao-jiang': '李代桃僵', 'shun-shou-qian-yang': '顺手牵羊',
  'da-cao-jing-she': '打草惊蛇', 'jie-shi-huan-hun': '借尸还魂', 'tiao-hu-li-shan': '调虎离山', 'yu-qin-gu-zong': '欲擒故纵', 'pao-zhuan-yu-yin': '抛砖引玉', 'qin-zei-qin-wang': '擒贼擒王',
  'fu-di-chou-xin': '釜底抽薪', 'hun-shui-mo-yu': '浑水摸鱼', 'jin-chan-tuo-qiao': '金蝉脱壳', 'guan-men-zhuo-zei': '关门捉贼', 'yuan-jiao-jin-gong': '远交近攻', 'jia-dao-fa-guo': '假道伐虢',
  'tou-liang-huan-zhu': '偷梁换柱', 'zhi-sang-ma-huai': '指桑骂槐', 'jia-chi-bu-dian': '假痴不癫', 'shang-wu-chou-ti': '上屋抽梯', 'shu-shang-kai-hua': '树上开花', 'fan-ke-wei-zhu': '反客为主',
  'mei-ren-ji': '美人计', 'kong-cheng-ji': '空城计', 'fan-jian-ji': '反间计', 'ku-rou-ji': '苦肉计', 'lian-huan-ji': '连环计', 'zou-wei-shang-ji': '走为上计'
};

async function auditStrategy(slug) {
  const filePath = join(STRATEGIES_DIR, slug, 'index.html');
  try {
    const content = await readFile(filePath, 'utf-8');
    
    const checks = {
      slug,
      name: strategyNames[slug],
      hasMetaDescription: content.includes('<meta name="description"'),
      hasOgTitle: content.includes('<meta property="og:title"'),
      hasOgDescription: content.includes('<meta property="og:description"'),
      hasOgType: content.includes('<meta property="og:type"'),
      hasCanonical: content.includes('<link rel="canonical"'),
      hasJsonLd: content.includes('<script type="application/ld+json">'),
      hasInternalLinks: content.includes('🔗 相关计策') || content.includes('<article class="glass"><h2>🔗'),
      internalLinkCount: (content.match(/<a href="\/36\/[^"]+\/">/g) || []).length
    };
    
    checks.passed = checks.hasMetaDescription && checks.hasOgTitle && checks.hasOgDescription && 
                    checks.hasOgType && checks.hasCanonical && checks.hasJsonLd && 
                    checks.hasInternalLinks && checks.internalLinkCount >= 2;
    
    return checks;
  } catch (err) {
    return { slug, name: strategyNames[slug], error: err.message };
  }
}

async function main() {
  console.log('🔍 SingClaw 36 计 SEO Audit\n');
  console.log('=' .repeat(60));
  
  const results = [];
  for (const slug of strategies) {
    const result = await auditStrategy(slug);
    results.push(result);
    const status = result.error ? '❌ ERR' : result.passed ? '✅ OK' : '⚠️  NEEDS FIX';
    console.log(`${status} ${result.name} (${slug})`);
    if (!result.passed && !result.error) {
      const issues = [];
      if (!result.hasMetaDescription) issues.push('meta description');
      if (!result.hasOgTitle) issues.push('og:title');
      if (!result.hasOgDescription) issues.push('og:description');
      if (!result.hasOgType) issues.push('og:type');
      if (!result.hasCanonical) issues.push('canonical');
      if (!result.hasJsonLd) issues.push('JSON-LD');
      if (!result.hasInternalLinks || result.internalLinkCount < 2) issues.push(`internal links (${result.internalLinkCount})`);
      console.log(`   └─ Missing: ${issues.join(', ')}`);
    }
  }
  
  console.log('=' .repeat(60));
  const passed = results.filter(r => r.passed).length;
  const needsFix = results.filter(r => !r.passed && !r.error).length;
  const errors = results.filter(r => r.error).length;
  console.log(`\n📊 Summary: ${passed}/36 passed, ${needsFix} need fixes, ${errors} errors`);
  
  // Write results to JSON for further processing
  writeFileSync(join(process.cwd(), 'scripts', 'audit-results.json'), JSON.stringify(results, null, 2));
  console.log('\n💾 Results saved to scripts/audit-results.json');
}

main().catch(console.error);

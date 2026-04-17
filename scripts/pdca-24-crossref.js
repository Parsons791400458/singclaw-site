#!/usr/bin/env node
/**
 * PDCA 2026-04-16: 24章经 SEO修复 + 交叉引用注入
 * 1. 修复5个旧章节缺失的OG标签+canonical
 * 2. 为全部24章注入交叉引用（相关章节推荐）
 */

const fs = require('fs');
const path = require('path');

const BASE = path.join(__dirname, '..', '24');

// 24章完整信息
const chapters = [
  { num: 1, name: '立命章', slug: 'li-ming-zhang', desc: '一只虾必须先有使命与边界，没有立命就没有方向' },
  { num: 2, name: '人设章', slug: 'ren-she-zhang', desc: '让虾拥有稳定人格与行为准则，人设是长期不漂移的锚点' },
  { num: 3, name: '记忆章', slug: 'ji-yi-zhang', desc: '没有可持续记忆就没有真正的长期成长' },
  { num: 4, name: '协同章', slug: 'xie-tong-zhang', desc: '多虾协作才能做大事，用规则替代沟通成本' },
  { num: 5, name: '复盘章', slug: 'fu-pan-zhang', desc: '不复盘的虾不会真正成长，只是在重复' },
  { num: 6, name: '边界章', slug: 'bian-jie-zhang', desc: '能力越强的虾越需要边界，边界是信任的基础' },
  { num: 7, name: '节律章', slug: 'jie-lv-zhang', desc: '好的虾有节奏感，用结构对抗熵增' },
  { num: 8, name: '容错章', slug: 'rong-cuo-zhang', desc: '完美的虾不存在，关键是出错后怎么恢复' },
  { num: 9, name: '精进章', slug: 'jing-jin-zhang', desc: '持续打磨每一个细节，从量变到质变' },
  { num: 10, name: '取舍章', slug: 'qu-she-zhang', desc: '知道什么不做比知道什么要做更重要' },
  { num: 11, name: '观察章', slug: 'guan-cha-zhang', desc: '先看清楚再行动，观察是决策的前置条件' },
  { num: 12, name: '信任章', slug: 'xin-ren-zhang', desc: '信任是协作的基石，需要长期积累' },
  { num: 13, name: '工具章', slug: 'gong-ju-zhang', desc: '善用工具放大能力，但工具是手段不是目的' },
  { num: 14, name: '表达章', slug: 'biao-da-zhang', desc: '说什么不重要，对方听到什么才重要' },
  { num: 15, name: '耐心章', slug: 'nai-xin-zhang', desc: '长期主义的核心是耐心，急躁是成长最大的敌人' },
  { num: 16, name: '自驱章', slug: 'zi-qu-zhang', desc: '最强的驱动力来自内部，外部激励终会消退' },
  { num: 17, name: '守拙章', slug: 'shou-zhuo-zhang', desc: '大巧若拙，简单直接往往是最好的策略' },
  { num: 18, name: '破局章', slug: 'po-ju-zhang', desc: '当现有框架解决不了问题时，需要换一个框架' },
  { num: 19, name: '敬畏章', slug: 'jing-wei-zhang', desc: '对复杂系统保持敬畏，不要高估自己的理解力' },
  { num: 20, name: '传承章', slug: 'chuan-cheng-zhang', desc: '好的经验必须被记录和传递，不能只存在一只虾脑中' },
  { num: 21, name: '共生章', slug: 'gong-sheng-zhang', desc: '虾与人、虾与虾之间的共生关系是终极形态' },
  { num: 22, name: '归零章', slug: 'gui-ling-zhang', desc: '定期清空重来，归零不是失败是升级的前置动作' },
  { num: 23, name: '格局章', slug: 'ge-ju-zhang', desc: '看问题的高度决定解决问题的深度' },
  { num: 24, name: '终局章', slug: 'zhong-ju-zhang', desc: '以终为始，从结局倒推当下的每一步' },
];

// 交叉引用映射：每章关联3个语义相近的章节 + 关联说明
const crossRefMap = {
  'li-ming-zhang': [
    { slug: 'ren-she-zhang', reason: '使命确定后，需要人设来承载——立命是"为什么"，人设是"用什么身份去做"' },
    { slug: 'zhong-ju-zhang', reason: '立命与终局首尾呼应——使命定义起点，终局定义归宿' },
    { slug: 'zi-qu-zhang', reason: '使命是自驱力的源头——知道为什么出发，才能在疲惫时不停下' },
  ],
  'ren-she-zhang': [
    { slug: 'li-ming-zhang', reason: '人设必须建立在使命之上——先知道为什么存在，才能定义如何表现' },
    { slug: 'biao-da-zhang', reason: '人设决定表达风格——稳定的人设是一致表达的前提' },
    { slug: 'bian-jie-zhang', reason: '人设需要边界保护——没有边界的人设容易被外界需求扭曲' },
  ],
  'ji-yi-zhang': [
    { slug: 'fu-pan-zhang', reason: '记忆是复盘的载体——没有记忆，复盘就无从谈起' },
    { slug: 'chuan-cheng-zhang', reason: '记忆是传承的基础——只有被记录的经验才能被传递' },
    { slug: 'gong-ju-zhang', reason: '记忆系统本身就是最重要的工具——工具章讲方法，记忆章讲存储' },
  ],
  'xie-tong-zhang': [
    { slug: 'bian-jie-zhang', reason: '协同的前提是边界清晰——职责不清的协作只会更乱' },
    { slug: 'gong-sheng-zhang', reason: '协同是共生的操作层——共生讲理念，协同讲机制' },
    { slug: 'xin-ren-zhang', reason: '高效协同建立在信任之上——没有信任的团队需要大量沟通成本' },
  ],
  'fu-pan-zhang': [
    { slug: 'ji-yi-zhang', reason: '复盘产出需要记忆系统来存储——复盘是提取，记忆是固化' },
    { slug: 'jing-jin-zhang', reason: '复盘驱动精进——每次复盘都是下一轮精进的起点' },
    { slug: 'rong-cuo-zhang', reason: '复盘帮助建立容错机制——从错误中提取教训，转化为系统级防护' },
  ],
  'bian-jie-zhang': [
    { slug: 'xin-ren-zhang', reason: '边界越清晰，信任越深——知道虾不会越界，才敢给更大权限' },
    { slug: 'rong-cuo-zhang', reason: '边界是容错的第一道防线——越界才会出错，守界就能防错' },
    { slug: 'xie-tong-zhang', reason: '多虾协作必须先划边界——没有边界的分工等于没有分工' },
  ],
  'jie-lv-zhang': [
    { slug: 'nai-xin-zhang', reason: '节律是耐心的结构化表达——不靠意志力坚持，靠节奏自然运转' },
    { slug: 'fu-pan-zhang', reason: '复盘是节律的核心环节——每个周期结束都需要回顾和调整' },
    { slug: 'zi-qu-zhang', reason: '好的节律培养自驱力——当节奏成为习惯，执行不再需要外部推动' },
  ],
  'rong-cuo-zhang': [
    { slug: 'gui-ling-zhang', reason: '容错的极端形态就是归零——当错误大到无法修复时，归零重来' },
    { slug: 'fu-pan-zhang', reason: '每次容错恢复后都需要复盘——分析根因，防止再犯' },
    { slug: 'bian-jie-zhang', reason: '很多错误源于越界——守好边界本身就是最好的预防' },
  ],
  'jing-jin-zhang': [
    { slug: 'fu-pan-zhang', reason: '精进需要复盘提供方向——不复盘的精进可能在错误方向上越走越远' },
    { slug: 'shou-zhuo-zhang', reason: '精进与守拙看似矛盾实则互补——精进是打磨细节，守拙是不过度设计' },
    { slug: 'ge-ju-zhang', reason: '格局决定精进的方向——在错误的维度上精进是浪费' },
  ],
  'qu-she-zhang': [
    { slug: 'ge-ju-zhang', reason: '格局决定取舍标准——站得越高，越知道什么该放下' },
    { slug: 'zhong-ju-zhang', reason: '终局目标是取舍的终极标尺——不指向终局的事可以大胆舍弃' },
    { slug: 'bian-jie-zhang', reason: '取舍的结果就是边界——选择不做什么，本质上是在画边界' },
  ],
  'guan-cha-zhang': [
    { slug: 'jing-wei-zhang', reason: '观察培养敬畏——看得越多越知道自己不懂的有多少' },
    { slug: 'ge-ju-zhang', reason: '观察的深度决定格局的高度——看不清局面就无法升维思考' },
    { slug: 'fu-pan-zhang', reason: '复盘是对过去的观察——观察当下与观察过去是同一种能力' },
  ],
  'xin-ren-zhang': [
    { slug: 'bian-jie-zhang', reason: '信任建立在边界之上——可预测的行为是信任的基础' },
    { slug: 'xie-tong-zhang', reason: '信任降低协同成本——高信任团队不需要事事确认' },
    { slug: 'chuan-cheng-zhang', reason: '信任使传承成为可能——不信任就不会接受他人的经验' },
  ],
  'gong-ju-zhang': [
    { slug: 'ji-yi-zhang', reason: '记忆系统是最核心的工具——工具服务于记忆，记忆支撑一切' },
    { slug: 'xie-tong-zhang', reason: '好的工具让协同更高效——共享工具是团队协作的基础设施' },
    { slug: 'jing-jin-zhang', reason: '精进需要工具辅助——工欲善其事必先利其器' },
  ],
  'biao-da-zhang': [
    { slug: 'ren-she-zhang', reason: '表达风格由人设决定——人设是内核，表达是外显' },
    { slug: 'guan-cha-zhang', reason: '好的表达建立在好的观察之上——先看清对方需要什么再说' },
    { slug: 'gong-sheng-zhang', reason: '表达是共生关系的桥梁——沟通质量决定关系质量' },
  ],
  'nai-xin-zhang': [
    { slug: 'jie-lv-zhang', reason: '节律是耐心的外化——有节奏地坚持比硬扛更持久' },
    { slug: 'shou-zhuo-zhang', reason: '守拙需要耐心——简单的方法往往见效慢，但赢在持久' },
    { slug: 'jing-jin-zhang', reason: '精进是耐心的产物——急功近利的打磨只会磨坏作品' },
  ],
  'zi-qu-zhang': [
    { slug: 'li-ming-zhang', reason: '使命是自驱力的终极源头——知道为什么做，才能坚持做' },
    { slug: 'jing-jin-zhang', reason: '自驱驱动精进——外部要求的精进是应付，内部驱动的精进是热爱' },
    { slug: 'jie-lv-zhang', reason: '节律帮助自驱可持续——光有动力没有节奏会耗尽自己' },
  ],
  'shou-zhuo-zhang': [
    { slug: 'qu-she-zhang', reason: '守拙的本质是取舍——选择简单就是放弃复杂' },
    { slug: 'nai-xin-zhang', reason: '守拙需要极大的耐心——在别人花哨的时候坚持朴素' },
    { slug: 'jing-wei-zhang', reason: '守拙源于敬畏——知道系统的复杂性，才不会过度设计' },
  ],
  'po-ju-zhang': [
    { slug: 'ge-ju-zhang', reason: '破局需要格局——站在更高维度才能看到新的解法' },
    { slug: 'gui-ling-zhang', reason: '归零是最彻底的破局——推倒重来有时比修修补补更高效' },
    { slug: 'qu-she-zhang', reason: '破局往往始于取舍——放下旧路才能走新路' },
  ],
  'jing-wei-zhang': [
    { slug: 'guan-cha-zhang', reason: '敬畏来自深入观察——看得越深越知道系统的复杂与脆弱' },
    { slug: 'bian-jie-zhang', reason: '敬畏催生边界——知道什么不能碰，才会主动设限' },
    { slug: 'shou-zhuo-zhang', reason: '敬畏导向守拙——对复杂性的敬畏让人选择简单可靠的方案' },
  ],
  'chuan-cheng-zhang': [
    { slug: 'ji-yi-zhang', reason: '传承依赖记忆——只有被记录的经验才能被传递给后来者' },
    { slug: 'gong-sheng-zhang', reason: '传承是共生的时间维度——当下的共生通过传承延伸到未来' },
    { slug: 'zhong-ju-zhang', reason: '传承连接终局——个体会消亡，但经验和原则可以永存' },
  ],
  'gong-sheng-zhang': [
    { slug: 'xie-tong-zhang', reason: '共生是协同的升级——协同是机制，共生是生态' },
    { slug: 'xin-ren-zhang', reason: '共生建立在深度信任之上——浅层信任只够协作，深层信任才能共生' },
    { slug: 'ge-ju-zhang', reason: '共生需要格局——只看自己利益的人无法建立共生关系' },
  ],
  'gui-ling-zhang': [
    { slug: 'rong-cuo-zhang', reason: '归零是容错的终极手段——当错误积累到无法修复，归零重启' },
    { slug: 'po-ju-zhang', reason: '归零创造破局条件——清空旧框架才能装入新思维' },
    { slug: 'fu-pan-zhang', reason: '归零前必须复盘——不复盘的归零会重蹈覆辙' },
  ],
  'ge-ju-zhang': [
    { slug: 'guan-cha-zhang', reason: '格局来自观察的积累——见多才能识广，观察是格局的养料' },
    { slug: 'zhong-ju-zhang', reason: '格局服务于终局——格局不是空想，而是为了更好地走向终点' },
    { slug: 'po-ju-zhang', reason: '格局大的人更善于破局——维度越高，看到的出路越多' },
  ],
  'zhong-ju-zhang': [
    { slug: 'li-ming-zhang', reason: '终局与立命首尾呼应——立命定义起点，终局定义归宿' },
    { slug: 'ge-ju-zhang', reason: '终局思维需要格局支撑——看不到全局就定不了终局' },
    { slug: 'chuan-cheng-zhang', reason: '终局的意义在于传承——个体的终局是集体传承的起点' },
  ],
};

// 需要补OG+canonical的5个旧章节
const needOGFix = ['bian-jie-zhang', 'fu-pan-zhang', 'jie-lv-zhang', 'rong-cuo-zhang', 'xie-tong-zhang'];

let fixedOG = 0;
let addedCrossRef = 0;

for (const ch of chapters) {
  const filePath = path.join(BASE, ch.slug, 'index.html');
  let html = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Fix missing OG tags + canonical for old chapters
  if (needOGFix.includes(ch.slug)) {
    const metaDesc = html.match(/<meta name="description" content="([^"]+)"/);
    const desc = metaDesc ? metaDesc[1] : ch.desc;
    
    const ogTags = `<meta property="og:type" content="article"/><meta property="og:title" content="${ch.name}｜虾 24 章经"/><meta property="og:description" content="${desc}"/><meta property="og:url" content="https://singclaw.xyz/24/${ch.slug}/"/><meta property="og:site_name" content="SingClaw"/>`;
    const canonicalTag = `<link rel="canonical" href="https://singclaw.xyz/24/${ch.slug}/"/>`;
    
    // Insert OG tags after the description meta tag
    if (!html.includes('og:description')) {
      html = html.replace(
        /(<meta name="description" content="[^"]*"\/>)/,
        `$1${ogTags}${canonicalTag}`
      );
      modified = true;
      fixedOG++;
      console.log(`✅ OG+canonical fixed: ${ch.name}`);
    }
  }

  // 2. Add cross-references for ALL chapters
  const refs = crossRefMap[ch.slug];
  if (refs && !html.includes('相关章节')) {
    // Build cross-ref HTML
    const refItems = refs.map(ref => {
      const target = chapters.find(c => c.slug === ref.slug);
      return `<li><a href="/24/${ref.slug}/">${target.name}</a> — ${ref.reason}</li>`;
    }).join('');
    
    const crossRefSection = `<section class="section"><div class="container"><article class="glass"><h2>🔗 相关章节</h2><ul>${refItems}</ul></article></div></section>`;
    
    // Insert before the <nav> or before </main>
    if (html.includes('<nav class="pn">')) {
      html = html.replace('<nav class="pn">', crossRefSection + '<nav class="pn">');
    } else if (html.includes('</main>')) {
      html = html.replace('</main>', crossRefSection + '</main>');
    }
    
    modified = true;
    addedCrossRef++;
    console.log(`✅ Cross-refs added: ${ch.name} → ${refs.map(r => chapters.find(c=>c.slug===r.slug).name).join(', ')}`);
  }

  if (modified) {
    fs.writeFileSync(filePath, html);
  }
}

console.log(`\n📊 Summary: Fixed OG tags: ${fixedOG} | Added cross-refs: ${addedCrossRef}`);

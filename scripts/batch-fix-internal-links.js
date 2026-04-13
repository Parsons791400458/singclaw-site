#!/usr/bin/env node
/**
 * Batch fix internal links for all 36 strategies
 * Standardizes the related strategies section to use glass card style with 🔗 icon
 */

import { readFile, writeFile } from 'fs/promises';
import { writeFileSync } from 'fs';
import { join } from 'path';

const STRATEGIES_DIR = join(process.cwd(), '36');

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

// Related strategies with descriptive text
const relatedStrategies = {
  'man-tian-guo-hai': [['an-du-chen-cang', '暗渡陈仓', '表面不动背后切换，与瞒天过海的无声嵌入都强调"不声张"的部署策略'], ['sheng-dong-ji-xi', '声东击西', '用多方向试探分散注意力，与瞒天过海的日常嵌入形成互补'], ['hun-shui-mo-yu', '浑水摸鱼', '在复杂环境中无声行动，两者都追求"不被察觉"的效果']],
  'wei-wei-jiu-zhao': [['yuan-jiao-jin-gong', '远交近攻', '都是间接策略——围魏救赵攻其必救，远交近攻分化敌人'], ['shun-shou-qian-yang', '顺手牵羊', '围魏救赵创造机会，顺手牵羊抓住机会'], ['jin-chan-tuo-qiao', '金蝉脱壳', '围魏救赵是转移战场，金蝉脱壳是优雅退出']],
  'jie-dao-sha-ren': [['yi-yi-dai-lao', '以逸待劳', '借刀杀人是借外力，以逸待劳是让虾值守——都追求省力高效'], ['pao-zhuan-yu-yin', '抛砖引玉', '都是"先给后得"的策略——抛砖引玉先示范，借刀杀人先借力'], ['lian-huan-ji', '连环计', '借刀杀人借一次力，连环计借多次力形成系统']],
  'yi-yi-dai-lao': [['an-du-chen-cang', '暗渡陈仓', '以逸待劳让虾值守人决策，暗渡陈仓让新旧平行验证——都追求系统稳定'], ['jin-chan-tuo-qiao', '金蝉脱壳', '以逸待劳是人虾分工，金蝉脱壳是切换退出——配合完成优雅交接'], ['zou-wei-shang-ji', '走为上计', '以逸待劳是日常省力，走为上计是危机止损']],
  'chen-huo-da-jie': [['hun-shui-mo-yu', '浑水摸鱼', '趁火打劫是抓住混乱机会，浑水摸鱼是在混乱中筛选——都利用"乱局"'], ['shun-shou-qian-yang', '顺手牵羊', '都是机会主义——趁火打劫抓大机会，顺手牵羊抓小机会'], ['guan-men-zhuo-zei', '关门捉贼', '趁火打劫是进攻，关门捉贼是围歼——形成完整战术']],
  'sheng-dong-ji-xi': [['man-tian-guo-hai', '瞒天过海', '声东击西是多方向试探，瞒天过海是无声嵌入——一动一静配合'], ['tiao-hu-li-shan', '调虎离山', '都是调动策略——声东击西调动注意力，调虎离山调动对手'], ['shu-shang-kai-hua', '树上开花', '声东击西用实验数据决策，树上开花借力造势——都追求低成本高影响']],
  'wu-zhong-sheng-you': [['jie-shi-huan-hun', '借尸还魂', '无中生有是从零创建，借尸还魂是旧物新用——两种创建路径'], ['shu-shang-kai-hua', '树上开花', '无中生有是凭空造物，树上开花是借力放大——虚实结合'], ['fan-jian-ji', '反间计', '无中生有创造新事物，反间计创造新关系——都是"创造"策略']],
  'an-du-chen-cang': [['man-tian-guo-hai', '瞒天过海', '暗渡陈仓是表面不动背后切换，瞒天过海是无声嵌入流程——都强调"不声张"'], ['yi-yi-dai-lao', '以逸待劳', '暗渡陈仓让新旧平行跑，以逸待劳让虾值守人决策——都追求省力高效'], ['jin-chan-tuo-qiao', '金蝉脱壳', '暗渡陈仓是切换前平行验证，金蝉脱壳是切换后优雅退出——配合完成零风险迁移']],
  'ge-an-guan-huo': [['yi-yi-dai-lao', '以逸待劳', '隔岸观火是冷静观察，以逸待劳是让人虾分工——都追求"不盲目行动"'], ['yu-qin-gu-zong', '欲擒故纵', '都是心理策略——隔岸观火观察局势，欲擒故纵控制节奏'], ['zou-wei-shang-ji', '走为上计', '隔岸观火是不介入，走为上计是主动撤退——都是"不硬刚"策略']],
  'xiao-li-cang-dao': [['jia-chi-bu-dian', '假痴不癫', '笑里藏刀是表面友好内心算计，假痴不癫是装傻保真——都是"伪装"策略'], ['fan-jian-ji', '反间计', '笑里藏刀是隐藏意图，反间计是制造假象——都追求信息不对称'], ['kou-mi-fu-jian', '口蜜腹剑', '同义策略——表面甜蜜内心有害，提醒警惕虚伪协作']],
  'li-dai-tao-jiang': [['jin-chan-tuo-qiao', '金蝉脱壳', '李代桃僵是牺牲次要保全主要，金蝉脱壳是优雅退出——都是"舍小保大"'], ['zhi-sang-ma-huai', '指桑骂槐', '李代桃僵是替代，指桑骂槐是间接——都避免直接冲突'], ['ku-rou-ji', '苦肉计', '都是牺牲策略——李代桃僵牺牲物，苦肉计牺牲自己']],
  'shun-shou-qian-yang': [['chen-huo-da-jie', '趁火打劫', '顺手牵羊是抓小机会，趁火打劫是抓大机会——机会主义组合'], ['hun-shui-mo-yu', '浑水摸鱼', '都是利用混乱——浑水摸鱼创造混乱，顺手牵羊利用混乱'], ['guan-men-zhuo-zei', '关门捉贼', '顺手牵羊是游击，关门捉贼是围歼——战术互补']],
  'da-cao-jing-she': [['xu-shi-tan-ce', '虚实探测', '打草惊蛇是主动试探，虚实探测是被动观察——两种探测方式'], ['qin-zei-qin-wang', '擒贼擒王', '打草惊蛇是试探反应，擒贼擒王是直接打击核心——由浅入深'], ['pao-zhuan-yu-yin', '抛砖引玉', '打草惊蛇是试探，抛砖引玉是示范——都是"先出手"策略']],
  'jie-shi-huan-hun': [['wu-zhong-sheng-you', '无中生有', '借尸还魂是旧物新用，无中生有是从零创建——两种创新路径'], ['tou-liang-huan-zhu', '偷梁换柱', '都是替换策略——借尸还魂替换载体，偷梁换柱替换核心'], ['fan-jian-ji', '反间计', '借尸还魂是借旧壳，反间计是借敌人——都是"借力"策略']],
  'tiao-hu-li-shan': [['sheng-dong-ji-xi', '声东击西', '调虎离山是调动对手，声东击西是分散注意——都是调动策略'], ['yuan-jiao-jin-gong', '远交近攻', '调虎离山是空间调动，远交近攻是关系分化——战略配合'], ['shang-wu-chou-ti', '上屋抽梯', '调虎离山是引敌离开，上屋抽梯是断敌后路——形成围困']],
  'yu-qin-gu-zong': [['ge-an-guan-huo', '隔岸观火', '欲擒故纵是控制节奏，隔岸观火是冷静观察——都追求"不急躁"'], ['qi-zong-qin-huo', '七纵七擒', '欲擒故纵是放一次，七纵七擒是放多次——程度不同'], ['zou-wei-shang-ji', '走为上计', '欲擒故纵是战术性放，走为上计是战略性退——都是"不硬刚"']],
  'pao-zhuan-yu-yin': [['jie-dao-sha-ren', '借刀杀人', '抛砖引玉是先示范后得玉，借刀杀人是先借力后成事——都是"先给后得"'], ['da-cao-jing-she', '打草惊蛇', '抛砖引玉是示范输入，打草惊蛇是试探反应——都是"先出手"'], ['lian-huan-ji', '连环计', '抛砖引玉是单次交换，连环计是多次交换——系统升级']],
  'qin-zei-qin-wang': [['da-cao-jing-she', '打草惊蛇', '擒贼擒王是直接打击核心，打草惊蛇是先试探——由浅入深'], ['pao-zhuan-yu-yin', '抛砖引玉', '擒贼擒王是抓核心，抛砖引玉是换核心——都聚焦"关键"'], ['fu-di-chou-xin', '釜底抽薪', '擒贼擒王是抓人，釜底抽薪是断粮——都打击根本']],
  'fu-di-chou-xin': [['qin-zei-qin-wang', '擒贼擒王', '釜底抽薪是断根本，擒贼擒王是抓核心——都打击要害'], ['hun-shui-mo-yu', '浑水摸鱼', '釜底抽薪是制造混乱，浑水摸鱼是利用混乱——因果配合'], ['shang-wu-chou-ti', '上屋抽梯', '釜底抽薪是断资源，上屋抽梯是断退路——都是"断"策略']],
  'hun-shui-mo-yu': [['chen-huo-da-jie', '趁火打劫', '浑水摸鱼是制造混乱，趁火打劫是利用混乱——乱局组合'], ['shun-shou-qian-yang', '顺手牵羊', '浑水摸鱼是创造机会，顺手牵羊是抓住机会——机会链'], ['man-tian-guo-hai', '瞒天过海', '浑水摸鱼是主动制造混乱，瞒天过海是被动融入日常——动静结合']],
  'jin-chan-tuo-qiao': [['an-du-chen-cang', '暗渡陈仓', '金蝉脱壳是切换后退出，暗渡陈仓是切换前验证——完整迁移流程'], ['yi-yi-dai-lao', '以逸待劳', '金蝉脱壳是退出旧角色，以逸待劳是建立新分工——交接配合'], ['zou-wei-shang-ji', '走为上计', '金蝉脱壳是优雅退出，走为上计是危机撤退——两种退出策略']],
  'guan-men-zhuo-zei': [['chen-huo-da-jie', '趁火打劫', '关门捉贼是围歼，趁火打劫是进攻——战术组合'], ['shun-shou-qian-yang', '顺手牵羊', '关门捉贼是围歼，顺手牵羊是游击——大小配合'], ['qin-zei-qin-wang', '擒贼擒王', '关门捉贼是围歼群体，擒贼擒王是打击核心——目标不同']],
  'yuan-jiao-jin-gong': [['wei-wei-jiu-zhao', '围魏救赵', '远交近攻是分化，围魏救赵是间接——都是间接策略'], ['tiao-hu-li-shan', '调虎离山', '远交近攻是关系分化，调虎离山是空间调动——战略配合'], ['ge-an-guan-huo', '隔岸观火', '远交近攻是主动分化，隔岸观火是被动观察——主动被动配合']],
  'jia-dao-fa-guo': [['yuan-jiao-jin-gong', '远交近攻', '假道伐虢是借路灭敌，远交近攻是分化打击——都涉及"借"和"攻"'], ['chen-huo-da-jie', '趁火打劫', '假道伐虢是借机灭敌，趁火打劫是借机获利——借机策略'], ['shun-shou-qian-yang', '顺手牵羊', '假道伐虢是大借机，顺手牵羊是小借机——程度不同']],
  'tou-liang-huan-zhu': [['jie-shi-huan-hun', '借尸还魂', '偷梁换柱是替换核心，借尸还魂是替换载体——替换策略组合'], ['fan-jian-ji', '反间计', '偷梁换柱是暗中替换，反间计是制造假象——都是"欺骗"策略'], ['li-dai-tao-jiang', '李代桃僵', '偷梁换柱是替换物，李代桃僵是替换人——人物配合']],
  'zhi-sang-ma-huai': [['li-dai-tao-jiang', '李代桃僵', '指桑骂槐是间接批评，李代桃僵是替代牺牲——都避免直接'], ['ku-rou-ji', '苦肉计', '指桑骂槐是间接表达，苦肉计是极端表达——表达方式不同'], ['fan-jian-ji', '反间计', '指桑骂槐是制造误解，反间计是制造假象——信息操控']],
  'jia-chi-bu-dian': [['xiao-li-cang-dao', '笑里藏刀', '假痴不癫是装傻，笑里藏刀是装友好——都是伪装'], ['fan-jian-ji', '反间计', '假痴不癫是装糊涂，反间计是造假象——信息策略'], ['kong-cheng-ji', '空城计', '假痴不癫是装弱，空城计是装空——心理战术']],
  'shang-wu-chou-ti': [['fu-di-chou-xin', '釜底抽薪', '上屋抽梯是断退路，釜底抽薪是断资源——都是"断"策略'], ['tiao-hu-li-shan', '调虎离山', '上屋抽梯是诱敌深入，调虎离山是引敌离开——空间操控'], ['yuan-jiao-jin-gong', '远交近攻', '上屋抽梯是战术陷阱，远交近攻是战略布局——战术战略配合']],
  'shu-shang-kai-hua': [['wu-zhong-sheng-you', '无中生有', '树上开花是借力造势，无中生有是从零创建——虚实结合'], ['sheng-dong-ji-xi', '声东击西', '树上开花是造势，声东击西是试探——都是"虚"策略'], ['fan-ke-wei-zhu', '反客为主', '树上开花是借力，反客为主是夺权——都追求影响力']],
  'fan-ke-wei-zhu': [['shu-shang-kai-hua', '树上开花', '反客为主是夺权，树上开花是造势——影响力策略'], ['fan-jian-ji', '反间计', '反客为主是地位反转，反间计是关系反转——反转策略'], ['lian-huan-ji', '连环计', '反客为主是单次反转，连环计是多次反转——系统升级']],
  'mei-ren-ji': [['pao-zhuan-yu-yin', '抛砖引玉', '美人计是给虾人设，抛砖引玉是给虾示范——都是"输入"策略'], ['lian-huan-ji', '连环计', '美人计是单一人设，连环计是多人协作——系统扩展'], ['kou-mi-fu-jian', '口蜜腹剑', '美人计是吸引人，口蜜腹剑是警惕人——人际两面']],
  'kong-cheng-ji': [['xu-shi-tan-ce', '虚实探测', '空城计是装空，虚实探测是辨空——攻防配合'], ['yi-yi-dai-lao', '以逸待劳', '空城计是心理战术，以逸待劳是系统设计——虚实结合'], ['zou-wei-shang-ji', '走为上计', '空城计是冒险守，走为上计是安全退——风险选择']],
  'fan-jian-ji': [['jie-shi-huan-hun', '借尸还魂', '反间计是制造假关系，借尸还魂是借旧壳——都是"借"策略'], ['tou-liang-huan-zhu', '偷梁换柱', '反间计是信息替换，偷梁换柱是实体替换——替换策略'], ['li-dai-tao-jiang', '李代桃僵', '反间计是关系替代，李代桃僵是人物替代——替代策略']],
  'ku-rou-ji': [['li-dai-tao-jiang', '李代桃僵', '苦肉计是牺牲自己，李代桃僵是牺牲他人——牺牲策略'], ['zhi-sang-ma-huai', '指桑骂槐', '苦肉计是极端表达，指桑骂槐是间接表达——表达方式'], ['lian-huan-ji', '连环计', '苦肉计是单次牺牲，连环计是多次牺牲——系统升级']],
  'lian-huan-ji': [['jie-dao-sha-ren', '借刀杀人', '连环计是多次借力，借刀杀人是单次借力——系统扩展'], ['pao-zhuan-yu-yin', '抛砖引玉', '连环计是多次交换，抛砖引玉是单次交换——交换策略'], ['ku-rou-ji', '苦肉计', '连环计是多次牺牲，苦肉计是单次牺牲——牺牲策略']],
  'zou-wei-shang-ji': [['jin-chan-tuo-qiao', '金蝉脱壳', '走为上计是撤退，金蝉脱壳是优雅退出——退出策略'], ['yi-yi-dai-lao', '以逸待劳', '走为上计是危机撤退，以逸待劳是日常省力——风险应对'], ['ge-an-guan-huo', '隔岸观火', '走为上计是主动撤退，隔岸观火是被动观察——都不硬刚']]
};

// Standard glass card related section template
function generateRelatedSection(slug) {
  const related = relatedStrategies[slug];
  if (!related) return '';
  
  return `
      <section class="section"><div class="container">
        <article class="glass"><h2>🔗 相关计策</h2><ul>${related.map(([rSlug, rName, rDesc]) => 
          `<li><a href="/36/${rSlug}/">${rName}</a> — ${rDesc}</li>`
        ).join('')}</ul></article>
      </div></section>`;
}

async function fixStrategy(slug) {
  const filePath = join(STRATEGIES_DIR, slug, 'index.html');
  try {
    let content = await readFile(filePath, 'utf-8');
    
    // Check if already has the standard glass card format
    if (content.includes('<article class="glass"><h2>🔗 相关计策</h2>')) {
      return { slug, status: 'already-fixed', name: strategyNames[slug] };
    }
    
    // Remove old related section if exists (section.related or similar patterns)
    content = content.replace(
      /<section class="section related">[\s\S]*?<\/section>/,
      ''
    );
    
    // Remove any standalone "相关计策" h3 sections
    content = content.replace(
      /<section class="section"><div class="container">\s*<h3>相关计策<\/h3>[\s\S]*?<\/div><\/section>/,
      ''
    );
    
    // Insert new related section before the nav.pn element
    const relatedSection = generateRelatedSection(slug);
    content = content.replace(
      /(<nav class="pn">)/,
      relatedSection + '\n    $1'
    );
    
    await writeFile(filePath, content, 'utf-8');
    return { slug, status: 'fixed', name: strategyNames[slug] };
  } catch (err) {
    return { slug, status: 'error', name: strategyNames[slug], error: err.message };
  }
}

async function main() {
  console.log('🔧 Batch fixing internal links for all 36 strategies\n');
  console.log('=' .repeat(60));
  
  const results = [];
  for (const slug of strategies) {
    const result = await fixStrategy(slug);
    results.push(result);
    const icon = result.status === 'already-fixed' ? '✅' : result.status === 'fixed' ? '🔧' : '❌';
    console.log(`${icon} ${result.name} (${slug}) - ${result.status}`);
  }
  
  console.log('=' .repeat(60));
  const fixed = results.filter(r => r.status === 'fixed').length;
  const alreadyFixed = results.filter(r => r.status === 'already-fixed').length;
  const errors = results.filter(r => r.status === 'error').length;
  console.log(`\n📊 Summary: ${fixed} fixed, ${alreadyFixed} already OK, ${errors} errors`);
}

main().catch(console.error);

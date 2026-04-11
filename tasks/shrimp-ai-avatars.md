# 🎨 三国虾角色视觉升级 - AI 生成任务

**任务 ID**: S1-Visual-002
**优先级**: P0 (阻塞用户体验)
**创建时间**: 2026-04-11 00:50
**执行方式**: AI 图像生成

---

## 🎯 目标

用 AI 生成 12 个三国人物扁平插画，替换现有 emoji。

---

## 📐 设计规范

**风格**: 三国人物 + 现代扁平插画
**色调**: 与角色性格匹配（见下表）
**尺寸**: 512x512px
**格式**: PNG（透明背景）
**输出路径**: `/assets/shrimp-characters/`

---

## 🎭 12 角色设计说明

| 角色 | 人物 | 特征描述 | 主色 | AI Prompt 关键词 |
|------|------|----------|------|-----------------|
| 诸葛虾 | 诸葛亮 | 羽扇纶巾，从容淡定，绿色系 | #00D4AA | wise strategist, feather fan, calm expression, green robe |
| 司马虾 | 司马懿 | 隐忍深邃，灰色系，眼神锐利 | #4A5568 | patient schemer, dark gray, sharp eyes, hidden ambition |
| 凤雏虾 | 庞统 | 连环计谋，橙色系，锁链元素 | #FF6B35 | chain strategist, orange theme, interconnected patterns |
| 武圣虾 | 关羽 | 青龙刀，红脸绿袍，威武 | #10B981 | red face, green armor, dragon blade, warrior |
| 猛飞虾 | 张飞 | 蛇矛，黑脸紫色，暴躁 | #7C3AED | fierce warrior, black face, purple armor, spear |
| 子龙虾 | 赵云 | 银枪白甲，银色系，英勇 | #E5E7EB | silver armor, white robe, brave general, spear |
| 玄德虾 | 刘备 | 双股剑，绿色仁德，温和 | #059669 | benevolent leader, green robe, dual swords, kind expression |
| 孟德虾 | 曹操 | 倚天剑，紫色霸气，威严 | #7C3AED | ambitious warlord, purple robe, imperial sword, commanding |
| 仲谋虾 | 孙权 | 紫髯蓝色，平衡稳重 | #6366F1 | balanced ruler, blue robe, purple beard, strategic |
| 奉先虾 | 吕布 | 方天戟，粉色爆裂，狂野 | #EC4899 | fierce fighter, pink armor, halberd, wild energy |
| 公瑾虾 | 周瑜 | 火攻橙色，风流倜傥 | #F59E0B | brilliant strategist, fire attack, orange theme, elegant |
| 逍遥虾 | 逍遥子 | 粉色佛系，飘逸 | #F472B6 | carefree sage, pink robe, flowing clothes, peaceful |

---

## 🛠️ 执行步骤

### Step 1: 批量生成（20 分钟）
用 AI 图像工具生成 12 个角色

### Step 2: 统一处理（10 分钟）
- 裁剪为 512x512
- 统一背景（透明或深色）
- 检查风格一致性

### Step 3: 集成测试（10 分钟）
- 替换页面中的 emoji
- 微信浏览器测试
- 调整尺寸/对比度

---

## 📦 交付物

1. `/assets/shrimp-characters/shrimp-zhugeliang.png`
2. `/assets/shrimp-characters/shrimp-sima.png`
3. ... (12 个角色)
4. 更新 `shrimp-config/index.html` 中的 avatar 字段

---

*生成完成后立即集成并部署*

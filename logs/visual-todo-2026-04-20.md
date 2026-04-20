# 🎨 小美 P1 视觉诊断报告 — 2026-04-20

> **时间:** 2026-04-20 01:37 UTC (09:37 UTC+8)
> **模式:** 纯诊断 · 零修改零部署
> **检查范围:** 首页 `/home/` + 思享录 `/blog/` + 详情页 `/36/wei-wei-jiu-zhao/` + Watchlist `/crypto/watchlist.html`
> **参照:** 上轮诊断 `visual-todo-2026-04-19.md`（01:00 UTC 4/19）

---

## 与上轮报告对比

| 上轮发现 | 当前状态 |
|----------|----------|
| #1 Blog Footer inline style / 无渐变线（第三轮） 🟡 | ✅ **已修复** — Blog footer 现已使用标准 CSS 组件（`footer-links` + `footer::before` 渐变线 + `sc-w` 容器），8 项标准链接，commit 136edd1 |
| #2 Watchlist Footer JS onmouseover 模拟 hover 🟡 | ⚠️ **部分修复后回归** — JS hover 已移除，改用 `footer-links` class + 8 项链接，但管线覆写导致 CSS 规则缺失 |

> 🎉 Blog footer 修复确认：`footer::before` 渐变光线 ✅、`footer-links` flex 布局 ✅、`.footer-links a` dim→hover 绿 ✅、8 项标准链接 ✅。评分 82→88。

---

## 🚨 TOP 2 视觉改进点

### 改进 #1：Watchlist Footer CSS 规则缺失 — 管线覆写持续回归（严重度 🟡 中）

**现状（crypto/watchlist.html）：**

Footer HTML 已升级至 `footer-links` 结构 + 8 项标准链接 ✅，但 CSS 层存在三处与全站标准不一致：

| 属性 | 全站标准（Blog/首页/详情页） | Watchlist 当前 |
|------|---------------------------|---------------|
| **`::before` 渐变线** | ✅ `background:linear-gradient(90deg,transparent,var(--sc-accent),transparent)` | ❌ 无 |
| **Footer padding** | `48px 0 36px` | `32px 0`（矮 16px，视觉上底部更拥挤） |
| **链接 hover CSS** | `.footer-links a{color:var(--sc-dim)} .footer-links a:hover{color:var(--sc-accent)}` | ❌ 无 CSS 规则，仅靠每个 `<a>` 的 inline `style="color:var(--sc-dim)"` |
| **容器 class** | `sc-w` | `wrap` |
| **链接 font-size** | `13px`（CSS 管理） | `12px`（inline 硬编码） |
| **Footer text color** | `var(--sc-dim)` | `var(--sc-muted)`（变量不同） |

**体验影响：**
- 无 hover 反馈：用户鼠标移到链接上无颜色变化，与其他所有页面 footer 的交互反馈不一致
- 无渐变光线：从首页/Blog 跳到 Watchlist 时底部装饰突然消失，精致度下降
- padding 更紧凑：底部呼吸感不足

**根因：** 数据管线每 4h 全量覆写 HTML，CSS `<style>` 块被重置为管线模板（仅含基础 footer 样式）。代码层修复无效——需管线侧限定写入至 `<main>` 内。

---

### 改进 #2：Blog Footer hover 存在双重效果叠加（严重度 🟢 低）

**现状（blog/index.html CSS 第 44-48 行）：**
```css
/* 第一层：全局 footer a 规则 */
footer a { color: var(--sc-accent); transition: opacity .2s }
footer a:hover { opacity: .7 }

/* 第二层：footer-links 专属规则 */
.footer-links a { color: var(--sc-dim); transition: color .2s }
.footer-links a:hover { color: var(--sc-accent) }
```

**问题：** 当 hover `.footer-links a` 时，两层规则同时生效：
1. 颜色从 `--sc-dim` 灰 → `--sc-accent` 绿 ✅（正确）
2. 透明度从 1.0 → 0.7 ❌（额外效果，其他页面 footer 无此行为）

**对比：**

| 页面 | Hover 行为 |
|------|-----------|
| **首页/详情页/Stars/Crypto** | 颜色变绿，透明度不变 |
| **Blog** | 颜色变绿 + 透明度降至 70%（双重叠加） |

**体验影响：**
- Blog footer 链接 hover 时比其他页面 footer 略显暗淡（绿色 × 0.7 透明度）
- 差异微妙但可感知，尤其在深色背景下

**建议方案：**
移除 `footer a:hover { opacity: .7 }` 规则，或限定为 `footer > .sc-w > p a:hover`（仅作用于版权行链接），避免与 `.footer-links a:hover` 叠加。

---

## ✅ 已确认正常项

1. **首页 Footer** — 8 项标准集 + `::before` 渐变光线 + `footer-links` flex 布局 ✅
2. **Blog Footer** — 已升级至标准 CSS 组件，8 项链接 ✅（本轮确认修复）
3. **详情页 Footer** — 标准链接 + 渐变光线 ✅
4. **Stars/index Footer** — `footer-links` + CSS hover + 标准链接 ✅（上轮 commit f851c7e 修复）
5. **Crypto/index Footer** — `footer-links` + CSS hover + 标准链接 ✅（上轮 commit f851c7e 修复）
6. **首页 Hero 动效** — Orb 光球 + 网格 + badge 脉冲 + 虾浮动 + CTA hover ✅
7. **Design Tokens** — 全站 `design-tokens.css` 引用正常 ✅
8. **36 计详情页（围魏救赵）** — 导航/内容/交叉引用/上下计链接均正常 ✅
9. **Watchlist 数据区** — 表格/场景标签/颜色区分/4h 更新 ✅
10. **SEO 结构** — 核心页面连续第 14 天满分 ✅

---

## 📊 全站视觉一致性评分

| 页面类型 | 上轮评分 | 当前评分 | 变化 | 瓶颈 |
|----------|:--------:|:--------:|:----:|------|
| **首页** | 96 | **96** | — | — |
| 36 计目录 | 88 | 88 | — | — |
| 24 章经目录 | 88 | 88 | — | — |
| 36 计详情页 | 82 | 82 | — | — |
| 游戏页 | 85 | 85 | — | nav 独立风格 |
| **思享录** | 82 | **88** | **+6** | hover 双重叠加（微） |
| Watchlist | 80 | **80** | — | footer CSS 缺失（管线覆写） |
| Stars 索引 | — | **90** | new | 标准化完成 |
| Crypto 索引 | — | **90** | new | 标准化完成 |
| **全站均分** | **~87** | **~88** | **+1** | Watchlist 管线覆写 = 唯一阻塞 |

> 📌 **核心结论：** Blog footer 修复确认 ✅，Stars/Crypto 索引页 footer 标准化完成 ✅。Footer 组件化覆盖率已从 ~75% 提升至 **~94%**（仅剩 Watchlist 未达标）。当前唯一视觉阻塞是 **Watchlist 管线覆写问题**——这是架构层问题（管线限定 `<main>` 写入），代码层修复已无意义。Blog hover 双重叠加为低优先级可选优化。

---

*诊断完成 · 零修改零部署 · 小美 P1 签收 🎨*

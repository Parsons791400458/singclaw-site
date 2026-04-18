# 🎨 小美 P1 视觉诊断报告 — 2026-04-18 Evening

> **时间:** 2026-04-18 19:00 UTC (03:00 UTC+8 4/19)
> **模式:** 纯诊断 · 零修改零部署
> **检查范围:** 首页 `/home/` + 随机详情页 `/36/wei-wei-jiu-zhao/`（围魏救赵）+ 思享录 `/blog/`
> **参照:** 上轮诊断 `visual-todo-2026-04-18-pm.md`（13:05 UTC）

---

## 与上轮报告对比

| 上轮发现 | 当前状态 |
|----------|----------|
| #1 Footer 链接碎片化（思享录在首页+详情页零入口）🟡 | ⚠️ **部分修复** — 详情页 footer 已补入思享录（6 项完整）✅，但**首页 footer 仍缺思享录** ❌ |
| #2 Blog Footer 纯 inline style，缺 `::before` 渐变装饰线 🟡 | ❌ **未修复** — 仍为 `<p>` 内联样式，无渐变装饰线 |

---

## 🚨 TOP 2 视觉改进点

### 改进 #1：首页 Footer 仍缺「思享录」入口，与详情页 Footer 标准脱节（严重度 🟡 中）

**现状逐模板对比（本轮实测）：**

| 模板 | Footer 链接集 | 思享录 | 状态 |
|------|-------------|--------|------|
| **首页** `/home/` | 养虾36计 · 虾24章经 · ShrimpFi · Crypto Alpha · 明星追踪 | ❌ **缺失** | 5 项 |
| **详情页** `/36/xxx/` | 养虾36计 · 虾24章经 · 思享录 · ShrimpFi · Crypto Alpha · 明星追踪 | ✅ 有 | **6 项（标准）** |
| **思享录** `/blog/` | SingClaw · 思享录 · 养虾36计 · 虾24章经 · ShrimpFi · Crypto Alpha · 明星追踪 | ✅ 有 | 7 项（含自身+品牌） |

**核心矛盾：**
- 详情页 footer 已升级为 6 项标准集（含思享录）—— 这是最佳实践 ✅
- 但**首页仍停留在旧版 5 项**，缺思享录入口
- 首页是全站流量最大的页面，footer 是用户滑到底部的最后导航兜底层
- 首页 Nav 已有思享录链接，但 footer 却没有 —— 同一页面内上下导航不一致

**建议方案：**
首页 footer 补入 `<a href="/blog/">思享录</a>`，与详情页标准 6 项对齐。

---

### 改进 #2：Blog Footer 仍使用纯 inline style，与全站 footer 组件体系脱节（严重度 🟡 低-中）

**现状对比（与详情页 footer 对比）：**

| 属性 | 详情页 footer（detail.css 组件） | Blog footer（inline style） |
|------|-------------------------------|---------------------------|
| **实现方式** | `class="footer"` + CSS 组件化 | 纯 `style="..."` 内联 |
| **渐变装饰线** | ✅ `::before` 绿色渐变光线 | ❌ 无（仅 `border-top` 直线） |
| **Padding** | `48px 0 36px` | `40px 0` |
| **链接默认色** | `rgba(255,255,255,.45)` 灰 → hover 变绿 | `var(--sc-accent)` 始终绿色 |
| **布局** | `footer-links` flex 容器 + 独立版权行 | 所有链接挤在单个 `<p>` 标签内 |

**体验影响：**
- 从详情页跳到思享录时，底部视觉精致度突然下降（有装饰线 → 无装饰线）
- Blog footer 链接始终绿色，与全站 footer 灰色 → hover 变绿的交互模式不一致
- 内联样式无法被全局 CSS 统一管理，后续维护成本高

**建议方案：**
Blog 页面 footer 改用 `class="footer"` 引用 `detail.css` 的 footer 组件样式，获得 `::before` 渐变装饰线 + 统一的链接交互效果。

---

## ✅ 已确认正常项

1. **详情页 Nav** — Logo + 品牌名 SingClaw + 5 链接（36计/24章经/思享录/ShrimpFi/Crypto Alpha）+ hamburger ✅
2. **首页 Nav** — Logo + 7 链接（36计/24章经/思享录/ShrimpFi/Crypto Alpha/BN Alpha/明星追踪）+ CTA + hamburger ✅
3. **移动端 Nav** — 首页 mobile-menu 7 项全覆盖（含 BN Alpha/明星追踪），详情页 mobile-menu 6 项（含思享录） ✅
4. **详情页 Footer** — 6 项标准链接 + `::before` 渐变光线 + `footer-links` flex 布局 ✅
5. **详情页 Eyebrow** — 使用 `--sc-accent-glow` / `--sc-accent-bg` design token 变量 ✅
6. **Design Tokens** — 首页内联引用 `/css/design-tokens.css`，详情页通过 `detail.css @import` ✅
7. **Glass Card 效果** — 圆角 + 毛玻璃 + 阴影层次感，详情页表现良好 ✅
8. **首页 Hero 动效** — Orb 光球 + 网格背景 + badge 脉冲 + 虾浮动动画 + CTA hover 正常 ✅
9. **Hover 交互** — nav hover（白色+背景）、footer hover（accent 绿色）、Prev/Next hover（背景变亮）均正常 ✅
10. **SEO 结构** — og:image / canonical / JSON-LD 在详情页和首页均完整 ✅
11. **线上可达性** — 首页/36计目录/思享录/围魏救赵详情页均 HTTP 200 ✅

---

## 📊 全站视觉一致性评分

| 页面类型 | 上轮评分 | 当前评分 | 变化 | 瓶颈 |
|----------|:--------:|:--------:|:----:|------|
| 首页 | 95 | 95 | — | footer 仍缺思享录 |
| 36计目录 | 88 | 88 | — | — |
| 24章经目录 | 88 | 88 | — | — |
| 游戏页 | 85 | 85 | — | nav 独立风格 |
| 思享录 | 82 | 82 | — | footer inline style / 无渐变线 |
| **36计详情页** | **80** | **82** | **+2** | footer 已补全思享录 ✅ |
| **全站均分** | **~86** | **~87** | **+1** | 详情页 footer 修复拉升均分 |

> 📌 **核心结论：** 详情页 footer 已修复至 6 项标准集（含思享录），是全站 footer 的最佳实践模板 ✅。当前两项剩余债务：(1) **首页 footer 缺思享录**——与详情页标准脱节，修复成本极低（加一行 `<a>` 标签）；(2) **Blog footer inline style**——缺渐变装饰线且链接交互模式不一致。修复这两项后，全站 footer 完全统一，预计均分可达 ~90。

---

*诊断完成 · 零修改零部署 · 小美 P1 签收 🎨*

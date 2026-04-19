# 🎨 小美 P1 视觉诊断报告 — 2026-04-19 AM

> **时间:** 2026-04-19 07:00 UTC (15:00 UTC+8)
> **模式:** 纯诊断 · 零修改零部署
> **检查范围:** 首页 `/home/` + 子页面 `/crypto/watchlist.html`
> **参照:** 上轮诊断 `visual-todo-2026-04-19.md`（01:00 UTC 4/19）

---

## 与上轮报告对比

| 上轮发现 | 当前状态 |
|----------|----------|
| #1 Blog Footer 纯 inline style（第三轮连续） 🟡 | ✅ **已修复** — commit 136edd1，现为 CSS 组件 + `footer-links` + `::before` 渐变线 + 6 项标准链接 |
| #2 Watchlist Footer JS `onmouseover` 模拟 hover 🟡 | ⚠️ **回归恶化** — 7 项导航链接 + JS hover 全部消失，退化为纯文本 2 行（见下方详情） |

> 🎉 上轮 #1 修复确认：Blog footer 现已使用 `footer-links` CSS 组件 + `::before` 渐变装饰线 + 灰→绿 hover，与首页/详情页完全一致。

---

## 🚨 TOP 2 视觉改进点

### 改进 #1：Watchlist Footer 导航链接回归丢失（严重度 🔴 高）

**背景：** commit aabeb36（4/19 04:00 UTC）将 Watchlist footer 升级为 7 项内链组件。但当前文件中 footer 已退化为纯文本，疑似被数据管线自动更新（每 4h 重写 HTML）覆盖。

**当前状态（watchlist.html L613-616）：**
```html
<footer><div class="wrap">
    <p>SingClaw · Crypto Watchlist · 每4h自动更新 · 数据来源 Binance</p>
    <p style="margin-top:6px">⚠️ 仅供研究参考，不构成投资建议</p>
</div></footer>
```

**当前 footer CSS（L83）：**
```css
footer{padding:32px 0;border-top:1px solid var(--sc-border);text-align:center;color:var(--sc-muted);font-size:11px}
```

**与首页 footer 标准对比：**

| 属性 | 首页（标准） | Watchlist（当前） |
|------|-------------|------------------|
| **导航链接** | ✅ 6 项（养虾36计/虾24章经/思享录/ShrimpFi/Crypto Alpha/明星追踪） | ❌ **0 项** — 纯文本 |
| **渐变装饰线** | ✅ `footer::before` 绿色渐变 | ❌ 无 |
| **CSS 组件** | ✅ `footer-links` class | ❌ 无 |
| **Padding** | `48px 0 36px` | `32px 0`（偏小） |
| **字体大小** | `13px` | `11px`（偏小） |
| **文字颜色** | `var(--sc-dim)` | `var(--sc-muted)`（更暗） |
| **Hover 效果** | ✅ CSS `:hover` | ❌ 无链接可 hover |

**根因分析：**
数据管线 cron（每 4h 更新 watchlist 数据）很可能在重写 HTML 时使用了旧模板，覆盖了 aabeb36 的 footer 升级。这是一个**系统性问题**——每次数据更新都会回归。

**建议方案：**
1. 将 footer 组件抽为独立模板片段，数据管线在生成 HTML 时引用标准 footer 模板
2. 或：数据管线仅更新 `<main>` 内的表格数据区域，不重写 `<footer>` 部分

---

### 改进 #2：Watchlist 页面缺少标准 `footer-links` / `::before` CSS 定义（严重度 🟡 中）

**现状：** 即使修复了 HTML 中的 footer 链接，watchlist.html 的 `<style>` 中也缺少 `footer-links` 和 `footer::before` 的 CSS 定义（L83 仅有基础 footer 样式）。

**首页有但 Watchlist 缺少的 CSS 规则：**
```css
/* 缺少 */
footer::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:200px;height:1px;background:linear-gradient(90deg,transparent,var(--sc-accent),transparent)}
.footer-links{display:flex;justify-content:center;gap:24px;margin-bottom:14px;font-size:13px}
.footer-links a{color:var(--sc-dim);transition:color .2s}
.footer-links a:hover{color:var(--sc-accent)}
```

**体验影响：**
- 缺少渐变装饰线，footer 顶部视觉精致度低于首页/Blog/详情页
- 没有 `footer-links` 样式定义，即使恢复导航链接也无法正确渲染 flex 布局和 hover 效果

**建议方案：**
在 watchlist.html 的 `<style>` 中补充标准 footer CSS 规则（`footer::before` + `footer-links` + `position:relative`），与首页保持一致。

---

## ✅ 已确认正常项

1. **首页 Footer** — 6 项标准集 + `::before` 渐变光线 + `footer-links` flex 布局 ✅
2. **Blog Footer** — ✅ **本轮修复确认**（commit 136edd1）：6 项标准链接 + CSS 组件 + 渐变线 + 灰→绿 hover
3. **详情页 Footer** — 6 项标准链接 + 渐变光线 ✅
4. **首页 Nav** — Logo + 链接 + CTA + hamburger ✅
5. **首页 Hero** — Orb 光球 + 网格 + badge 脉冲 + 虾浮动动画 + CTA hover ✅
6. **Design Tokens** — 首页引用 `/css/design-tokens.css` ✅
7. **Hover 交互** — nav/footer/card hover 均正常 ✅
8. **Watchlist 数据表** — 表格渲染正常、场景标签颜色区分清晰、每 4h 自动更新 ✅

---

## 📊 全站视觉一致性评分

| 页面类型 | 上轮评分 | 当前评分 | 变化 | 瓶颈 |
|----------|:--------:|:--------:|:----:|------|
| **首页** | 96 | **96** | — | ✅ 标准 |
| 36计目录 | 88 | 88 | — | — |
| 24章经目录 | 88 | 88 | — | — |
| 36计详情页 | 82 | 82 | — | — |
| 游戏页 | 85 | 85 | — | nav 独立风格 |
| **思享录** | 82 | **88** | **+6** | footer 修复完成 ✅ |
| **Watchlist** | 80 | **72** | **-8** | ⚠️ footer 导航回归丢失 |
| **全站均分** | ~87 | **~86** | **-1** | Watchlist footer 回归拖低 |

> 📌 **核心结论：**
> - Blog footer 修复确认 ✅，思享录评分 82→88
> - **Watchlist footer 发生回归**：aabeb36 的 7 项导航链接被数据管线覆盖为纯文本。这不是简单的"未修复"，而是**系统性回归**——数据管线每 4h 重写整个 HTML，会持续覆盖手工修复
> - **根治建议：** 数据管线需改为仅更新数据区域（`<main>` 内容），或引用标准 footer 模板，否则 footer 修复将反复回归
> - 全站 footer 组件化覆盖率：首页 ✅ / 详情页 ✅ / Blog ✅ / Watchlist ❌（回归）

---

*诊断完成 · 零修改零部署 · 小美 P1 签收 🎨*

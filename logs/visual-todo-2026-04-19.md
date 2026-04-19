# 🎨 小美 P1 视觉诊断报告 — 2026-04-19

> **时间:** 2026-04-19 01:00 UTC (09:00 UTC+8)
> **模式:** 纯诊断 · 零修改零部署
> **检查范围:** 首页 `/home/` + 子页面 `/crypto/watchlist.html`（随机选取）+ Blog `/blog/`
> **参照:** 上轮诊断 `visual-todo-2026-04-18-eve.md`（19:00 UTC 4/18）

---

## 与上轮报告对比

| 上轮发现 | 当前状态 |
|----------|----------|
| #1 首页 Footer 缺思享录（与详情页 6 项标准脱节）🟡 | ✅ **已修复** — 首页 footer 现为 6 项标准集（含思享录），与详情页完全对齐 |
| #2 Blog Footer 纯 inline style，缺 `::before` 渐变装饰线 🟡 | ❌ **未修复** — 第三轮报告此问题，仍为 `<p>` 内联样式 |

> 🎉 上轮 #1 修复确认：首页 footer 已包含养虾36计 / 虾24章经 / **思享录** / ShrimpFi / Crypto Alpha / 明星追踪 共 6 项，且使用 `footer-links` CSS 组件 + `::before` 渐变装饰线，与详情页完全一致。评分 95→96。

---

## 🚨 TOP 2 视觉改进点

### 改进 #1：Blog Footer 仍为纯 inline style，第三轮连续未修复（严重度 🟡 中）

**现状（blog/index.html L111-115）：**
```html
<footer style="padding:40px 0;border-top:1px solid var(--sc-border);text-align:center;...">
  <p>© 2026 <a href="/" style="color:var(--sc-accent)">SingClaw</a> · <a href="/blog/" style="color:var(--sc-accent)">思享录</a> · ...</p>
</footer>
```

**与首页 footer 组件对比：**

| 属性 | 首页 footer（CSS 组件） | Blog footer（inline） |
|------|------------------------|----------------------|
| **实现** | `footer` 标签 + `footer-links` class | 纯 `style="..."` 内联 |
| **渐变装饰线** | ✅ `footer::before` 绿色渐变光线 | ❌ 仅 `border-top` 直线 |
| **链接默认色** | `var(--sc-dim)` 灰 → hover 变绿 | `var(--sc-accent)` **始终绿色** |
| **布局** | `footer-links` flex 容器 + 独立版权行 | 所有链接挤在单个 `<p>` 内 |
| **Padding** | `48px 0 36px` | `40px 0` |

**体验影响：**
- 从首页/详情页跳到思享录时，底部视觉精致度突然下降（有渐变光线 → 无）
- 链接始终绿色，与全站 footer 灰→hover 绿的交互模式矛盾
- 内联样式无法被全局 CSS 管理，维护成本高

**建议方案：**
Blog footer 改用首页相同的 `footer` + `footer-links` CSS 组件结构，继承 `::before` 渐变装饰线 + 灰→绿 hover 效果。

---

### 改进 #2：crypto/watchlist.html Footer 使用 JS onmouseover 模拟 hover，与全站 CSS :hover 体系脱节（严重度 🟡 中）

**现状（watchlist.html L561-572）：**
```html
<footer><div class="wrap">
  <a href="/36/" style="color:var(--sc-dim);font-size:13px;transition:color .2s"
     onmouseover="this.style.color='var(--sc-accent)'"
     onmouseout="this.style.color='var(--sc-dim)'">养虾36计</a>
  ...
</div></footer>
```

**与首页 footer 组件对比：**

| 属性 | 首页 footer（CSS 组件） | Watchlist footer（JS hover） |
|------|------------------------|----------------------------|
| **Hover 实现** | CSS `.footer-links a:hover` | ❌ JS `onmouseover`/`onmouseout` |
| **渐变装饰线** | ✅ `footer::before` | ❌ 无 |
| **CSS 组件** | `footer-links` class | ❌ 纯 inline `<div style>` |
| **链接数** | 6 项标准 | ✅ 6 项标准（一致） |
| **可维护性** | CSS 统一管理 | ❌ 每个链接独立 JS 事件绑定 |

**体验影响：**
- JS hover 在触屏设备上行为不确定（`:hover` 更可靠）
- 缺少渐变装饰线，视觉精致度低于首页/详情页
- 6 个链接 × 2 个 JS 事件 = 12 个内联事件处理器，代码膨胀

**建议方案：**
移除 JS hover，改用首页 `footer` + `footer-links` CSS 组件结构。

---

## ✅ 已确认正常项

1. **首页 Footer** — 6 项标准集 + `::before` 渐变光线 + `footer-links` flex 布局 ✅（本轮修复确认）
2. **详情页 Footer** — 6 项标准链接 + 渐变光线 ✅
3. **首页 Nav** — Logo + 7 链接（含思享录/BN Alpha/明星追踪）+ CTA + hamburger ✅
4. **首页 Hero 动效** — Orb 光球 + 网格背景 + badge 脉冲 + 虾浮动动画 + CTA hover 正常 ✅
5. **Design Tokens** — 首页引用 `/css/design-tokens.css`，详情页 `detail.css @import` ✅
6. **Hover 交互** — nav hover（白+背景变亮）、footer hover（accent 绿）、card hover 均正常 ✅
7. **Watchlist 数据页** — 表格渲染正常、场景标签颜色区分清晰、每 4h 自动更新 ✅
8. **SEO 结构** — 核心页面 og/canonical/JSON-LD 连续第 11 天满分 ✅

---

## 📊 全站视觉一致性评分

| 页面类型 | 上轮评分 | 当前评分 | 变化 | 瓶颈 |
|----------|:--------:|:--------:|:----:|------|
| **首页** | 95 | **96** | **+1** | footer 已修复至标准 ✅ |
| 36计目录 | 88 | 88 | — | — |
| 24章经目录 | 88 | 88 | — | — |
| 36计详情页 | 82 | 82 | — | — |
| 游戏页 | 85 | 85 | — | nav 独立风格 |
| 思享录 | 82 | 82 | — | footer inline style / 无渐变线 |
| Watchlist | — | **80** | new | footer JS hover / 无渐变线 |
| **全站均分** | **~87** | **~87** | — | Blog + Watchlist footer 非标 |

> 📌 **核心结论：** 首页 footer 修复确认 ✅，已与详情页 6 项标准完全对齐。当前视觉债务集中在 **footer 组件化覆盖率**——首页 + 详情页已标准化，但 Blog 和 Watchlist 仍使用 inline style / JS hover 的旧实现。这两页 footer 统一后，全站 footer 一致性将从约 75% 提升至 100%，预计均分可达 ~90。

---

*诊断完成 · 零修改零部署 · 小美 P1 签收 🎨*

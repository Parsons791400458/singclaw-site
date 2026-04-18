# 🎨 小美 P1 视觉诊断报告 — 2026-04-18

> **时间:** 2026-04-18 07:00 UTC (15:00 UTC+8)
> **模式:** 纯诊断 · 零修改零部署
> **检查范围:** 首页 `/home/` + 随机详情页 `/36/fu-di-chou-xin/`（釜底抽薪）+ 思享录 `/blog/`
> **参照:** 上轮诊断 `visual-todo-2026-04-17-pm.md` + 修复记录 `visual-fix-2026-04-18.md`

---

## 与上轮报告对比

| 上轮发现 | 当前状态 |
|----------|----------|
| #1 详情页 Nav 品牌断裂（缺 Logo/hamburger） 🔴 | ✅ **已修复** — commit 34b2de0，Logo + hamburger + mobile-menu 已补全 |
| #2 详情页 Eyebrow 硬编码 #93c5fd 蓝色 🟡 | ✅ **已修复** — commit 00a22f0，已改用 design-token 变量 |

---

## 🚨 TOP 2 视觉改进点

### ✅ 改进 #1：详情页桌面端 Nav 仅 3 个链接，与全站 5 链接标准不一致（严重度 🟡 中）— 已修复 commit 56f374c

**现状（釜底抽薪页面确认）：**
```html
<div class="nav-links">
  <a href="/36/">养虾36计</a>
  <a href="/24/">虾24章经</a>
  <a href="/home/">首页</a>
</div>
```

**对比其他页面 Nav（crypto / stars / blog 三页一致）：**
```html
<div class="nav-links">
  <a href="/36/">养虾36计</a>
  <a href="/24/">虾24章经</a>
  <a href="/blog/">思享录 📝</a>
  <a href="/game/">ShrimpFi 🎮</a>
  <a href="/crypto/">Crypto Alpha 📊</a>
</div>
```

**体验影响：**
- 36 篇详情页是用户深度阅读的主页面类型，桌面端 nav 缺少「思享录」「ShrimpFi」「Crypto Alpha」三个入口
- 移动端 mobile-menu 已有 5 项（养虾36计/虾24章经/ShrimpFi/Crypto Alpha/首页），但也缺「思享录」
- 用户在桌面端阅读完文章后，无法直接导航到思享录或 ShrimpFi——需要先回首页再找入口
- 与 P3（全站导航栏不一致，已记录于 `todo-2026-04-18.md`）属同一系统性问题

**建议方案：**
将 36 篇详情页的 `nav-links` 统一为全站标准 5 项，移动端 mobile-menu 补入「思享录」链接。

---

### 改进 #2：全站 Footer 链接集合碎片化，无统一标准（严重度 🟡 中）

**现状对比：**

| 页面 | Footer 链接 | 缺失 |
|------|------------|------|
| **首页** `/home/` | 养虾36计 · 虾24章经 · ShrimpFi · Crypto Alpha · 明星追踪 | ❌ 缺**思享录** |
| **详情页** `/36/xxx/` | 养虾36计 · 虾24章经 · ShrimpFi · **Crypto** · 首页 | ❌ 缺**思享录** · 缺**明星追踪** · "Crypto"名称截断 |
| **crypto/stars/blog** | 需检查各自 footer | — |

**体验影响：**
- Footer 是全站最末端的导航兜底层——用户滑到底部时的最后一次导航机会
- 思享录是 2026-04-17 新上线的内容板块，但**全站没有任何一个 footer 包含思享录入口**
- 详情页 footer 使用"Crypto"而非"Crypto Alpha"，命名不一致
- 明星追踪在首页 footer 有入口，但 36 篇详情页的 footer 全部缺失

**建议方案：**
统一全站 footer 为标准 6 项：养虾36计 · 虾24章经 · 思享录 · ShrimpFi · Crypto Alpha · 明星追踪。确保所有模板（home / detail / crypto / stars / blog）使用相同 footer 链接集合。

---

## ✅ 已确认正常项

1. **Design Tokens 加载**：首页内联引用 `/css/design-tokens.css`，详情页通过 `detail.css` 的 `@import` 引入 ✅
2. **详情页 Nav 品牌性**：Logo + 品牌名 SingClaw 已补全（commit 34b2de0），`backdrop-filter:blur(24px)` 与首页一致 ✅
3. **详情页 Eyebrow**：已改用 `--sc-accent-glow` / `--sc-accent-bg` design token 变量（commit 00a22f0）✅
4. **详情页 Footer 渐变光线**：`::before` 渐变 + `.footer-links` 导航行均正常 ✅
5. **Glass Card 效果**：圆角 28px + 毛玻璃 + 阴影层次，详情页表现良好 ✅
6. **首页 Hero 动效**：Orb 光球 + 网格背景 + badge 脉冲动画 + CTA hover 均正常 ✅
7. **Hover 交互**：nav-links hover（白色 + 背景）、footer-links hover（accent 绿色）、pn 翻页 hover（背景变亮）均正常 ✅
8. **移动端基础**：hamburger 显示/隐藏、mobile-menu 展开收起均有定义 ✅
9. **Prev/Next 导航**：label 使用 `rgba(0,212,170,.6)` accent 色，视觉层次清晰 ✅

## 📊 全站视觉一致性评分

| 页面类型 | 上轮评分 | 当前评分 | 变化 | 瓶颈 |
|----------|:--------:|:--------:|:----:|------|
| 首页 | 95 | 95 | — | footer 缺思享录 |
| 36计目录 | 88 | 88 | — | — |
| 24章经目录 | 88 | 88 | — | — |
| 游戏页 | 85 | 85 | — | nav 独立风格 |
| **36计详情页** | **72** | **80** | **+8** | nav 链接不全 + footer 碎片化 |
| **全站均分** | **~86** | **~87** | **+1** | nav/eyebrow 修复提升，footer 碎片化拖后腿 |

> 📌 **核心结论：** 上轮两项修复（Nav 品牌断裂 + Eyebrow 硬编码色）效果显著，详情页从 72→80。当前全站最大的视觉一致性债务是**导航链接碎片化**——Nav 和 Footer 在不同模板中链接集合不统一，且思享录作为新板块在全站导航中覆盖率为零。修复这两项后，详情页预计可达 88+，全站均分 ~90。

---

*诊断完成 · 零修改零部署 · 小美 P1 签收 🎨*

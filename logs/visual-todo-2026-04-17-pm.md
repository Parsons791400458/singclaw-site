# 🎨 小美 P1 视觉诊断报告 — 2026-04-17 PM

> **时间:** 2026-04-17 13:01 UTC (21:01 UTC+8)
> **模式:** 纯诊断 · 零修改零部署
> **检查范围:** 首页 `/home/` + 随机子页面 `/36/wei-wei-jiu-zhao/`（围魏救赵）+ `/crypto/bn-alpha.html`
> **参照:** 今日早间诊断 `visual-todo-2026-04-17.md`

---

## 与早间报告对比

| 早间发现 | 当前状态 |
|----------|----------|
| #1 详情页 nav 缺品牌统一性 🔴 | ❌ **未修复** — 仍然只有两个纯文字链接 |
| #2 详情页 footer 视觉收尾缺失 🟡 | ✅ **已修复** — `detail.css` 已有 `::before` 渐变光线 + `.footer-links` 导航行，HTML 中 footer 含 5 个导航链接 |

---

## 🚨 TOP 2 视觉改进点

### 改进 #1：详情页 Nav 仍缺品牌统一性（严重度 🔴 高）⬆️ 持续未修

**现状（围魏救赵页面确认）：**
```html
<header class="nav">
  <div class="container nav-inner">
    <a href="/36/">← 返回养虾36计</a>
    <a href="/home/">首页</a>
  </div>
</header>
```

**对比首页 Nav：**
- 首页：Logo 图标 + 品牌名 + 6 个导航链接 + CTA 按钮 + 移动端 hamburger + `backdrop-filter:blur(24px)`
- 详情页：仅 2 个纯文字链接，无 Logo、无品牌色、无 hamburger、`backdrop-filter:blur(20px)` 略弱

**体验影响：**
36 计有 36 篇文章，是用户深度停留最久的页面类型。用户从首页进入详情页后，导航栏从精致品牌级突变为极简文字链——**品牌辨识度断裂**。移动端更严重：首页有完整 hamburger 菜单，详情页完全没有，用户无法导航到 24 章经、游戏、Crypto 等板块。

**建议方案：**
为 detail 模板引入 mini-nav 组件：左侧 Logo + 品牌名（复用首页 `.logo` 样式），右侧保留返回链接 + 增加 hamburger（移动端），CTA 可省略以保持轻量。

---

### 改进 #2（🆕）：详情页 Eyebrow 标签使用硬编码蓝色，未引用 Design Token（严重度 🟡 中）

**现状（detail.css 确认）：**
```css
.eyebrow {
  border: 1px solid rgba(147,197,253,.18);   /* #93c5fd 淡蓝 */
  background: rgba(147,197,253,.06);          /* #93c5fd 淡蓝 */
}
```

**对比首页 Badge：**
```css
.badge {
  background: rgba(0,212,170,.08);    /* --sc-accent 绿色 */
  border: 1px solid rgba(0,212,170,.18);
  color: var(--sc-accent);
}
```

**问题分析：**
- 首页 badge 使用 `--sc-accent`（#00d4aa 绿色），这是 design-tokens.css 定义的品牌主色
- 详情页 eyebrow 使用硬编码 `rgba(147,197,253,...)` 即 `#93c5fd` 淡蓝色，**这个颜色不存在于 design-tokens.css 中**
- Design Tokens 中蓝色定义为 `--sc-blue: #4d8ffa`，与 `#93c5fd` 也不一致
- 结果：首页标签是绿色系，详情页标签是蓝色系，品牌色语义不统一

**建议方案：**
将 eyebrow 改为引用 design token 变量：
```css
.eyebrow {
  border: 1px solid rgba(var(--sc-accent-rgb, 0,212,170), .18);
  background: rgba(var(--sc-accent-rgb, 0,212,170), .06);
  color: var(--sc-accent);
}
```
或者如果36计系列确实要用蓝色区分，应将 `#93c5fd` 注册为 `--sc-article-accent` token 纳入设计系统管理。

---

## ✅ 已确认正常项

1. **Design Tokens 加载**：首页和详情页均正确引用 `/css/design-tokens.css`，CSS 变量在页面中生效
2. **首页视觉质量**：Hero 动画（虾浮动 `float 4s`）、卡片 hover（上浮 + 阴影 + 色变）、`.sc-reveal` 滚动动画、渐变光效均运行正常
3. **详情页 Footer**：已修复 ✅ — 现有渐变光线 `::before`（使用 `--sc-accent`）+ 5 个导航链接，与首页风格对齐
4. **BN Alpha 页**：内容数据丰富（537 合约 / 169 Alpha 币 / 30 天排行），页面正常加载
5. **详情页 Glass Card**：圆角 28px + 毛玻璃效果 + 阴影层次感良好
6. **首页移动端**：hamburger + 768px/480px 双断点覆盖完整

## 📊 全站视觉一致性评分（更新）

| 页面类型 | 上午评分 | 当前评分 | 变化 | 瓶颈 |
|----------|:--------:|:--------:|:----:|------|
| 首页 | 95 | 95 | — | — |
| 36计目录 | 88 | 88 | — | — |
| 24章经目录 | 88 | 88 | — | — |
| 游戏页 | 85 | 85 | — | nav 独立风格 |
| **36计详情页** | **68** | **72** | **+4** | **nav 品牌断裂 + eyebrow 硬编码色** |
| **全站均分** | **~85** | **~86** | **+1** | footer 修复带来微幅提升 |

> 📌 **核心结论：** 早间 #2（footer）已修复，详情页评分从 68→72。但 #1（nav 品牌断裂）仍是全站视觉一致性最大短板。新发现 #2（eyebrow 硬编码色）属于设计系统治理层面的债务——虽不影响用户体验，但随着页面增多会导致维护困难。修复这两项后，详情页预计可达 85+，全站均分 ~90。

---

*诊断完成 · 零修改零部署 · 小美 P1 签收 🎨*

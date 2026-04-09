# 🚀 Sprint 1 执行指南（20 分钟完成）

> **创建时间**: 2026-04-09 11:47 GMT+8  
> **目标**: 完成 GSC 注册 + Umami 注册 + 首条社交帖  
> **总耗时**: 约 20 分钟

---

## 📋 S1-01: Google Search Console 注册（10 分钟）

### 步骤 1: 访问 GSC
```
https://search.google.com/search-console
```
- 用星哥的 Google 账号登录（s791400458@gmail.com）
- 点击"立即开始"

### 步骤 2: 添加网站
```
选择"URL 前缀"（不是域名）
输入：https://singclaw.xyz
```
- ⚠️ 注意：必须带 `https://` 前缀
- 点击"继续"

### 步骤 3: 验证所有权（3 种方式选 1）

#### 方式 A: HTML 标记（推荐，最快）
1. 选择"HTML 标记"
2. 复制 `<meta>` 标签，长这样：
   ```html
   <meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxx" />
   ```
3. 发给柯维，5 秒注入到 singclaw.xyz 首页
4. 回到 GSC 点击"验证" ✅

#### 方式 B: DNS 记录（如果你有 DNSPod 控制权）
1. 选择"DNS 提供商"
2. 复制 TXT 记录值
3. 登录 DNSPod 添加 TXT 记录
4. 等待 5 分钟生效后点击"验证"

#### 方式 C: HTML 文件上传（不推荐，Vercel 不支持）
- 跳过此方式

### 步骤 4: 提交 Sitemap
```
验证成功后 → 左侧菜单"站点地图"
输入：sitemap.xml
点击"提交"
```

### ✅ 完成标志
- GSC 显示"已验证"
- Sitemap 状态显示"成功"
- 48 小时内 Google 开始收录 48 个页面

---

## 📊 S1-02: Umami 统计注册（5 分钟）

### 步骤 1: 访问 Umami Cloud
```
https://cloud.umami.is
```
- 点击"Get Started"或"Sign Up"
- 用 GitHub 账号登录（推荐）或用邮箱注册

### 步骤 2: 创建网站
1. 登录后点击"+ Add Website"
2. 填写信息：
   ```
   Name: SingClaw
   Domain: singclaw.xyz
   ```
3. 点击"Create"

### 步骤 3: 获取 Website ID
1. 创建成功后，点击网站名称进入详情
2. 找到"Data Website ID"或"Tracking Code"
3. 复制那串 UUID，长这样：
   ```
   xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
   ```

### 步骤 4: 发给柯维
```
把 UUID 发给柯维，格式：
Umami Website ID: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

柯维会在 5 秒内注入代码到全站，然后你就能在 Umami 后台看到：
- 实时访客数
- 流量来源（Google/直接访问/社交）
- 热门页面（哪篇 36 计最受欢迎）
- 用户地理位置

### ✅ 完成标志
- Umami 后台显示 singclaw.xyz
- 能看到 Tracking Code
- 柯维确认代码已注入

---

## 📱 S1-03: 第一条社交帖子（5 分钟）

### 推荐文案（3 个版本任选）

#### 版本 A: 朋友圈（熟人社交）
```
做了个养虾方法论网站 singclaw.xyz 
用 36 计教你怎么养 AI 虾，完全免费。

从"瞒天过海"到"走为上计"，每计都有：
- 真实案例
- AI 提示词
- 举一反三

顺便做了个养成小游戏，养数字虾挺上瘾的😂

求反馈！
```

#### 版本 B: 即刻（技术社区）
```
独立开发 | 做了个「养虾方法论 + 养成游戏」网站

核心是 36 计养虾方法论，每篇都有：
- 5 Why 分析
- 真实案例
- 可复制的 AI 提示词

顺便游戏化了，用 36 计知识养数字虾，进化解锁技能树。

技术栈：Vercel + Base 网络
地址：singclaw.xyz

求大佬们提意见 🙏
```

#### 版本 C: Twitter/X（Web3 圈）
```
Built a shrimp farming methodology + idle game 🦐

36 strategies with:
- Real cases
- AI prompts
- Gamified progression

Free to play, own your shrimp as digital collectibles.

Check it out: singclaw.xyz

#indiedev #web3 #Base
```

### 发布渠道（至少选 1 个）
- ✅ 朋友圈（最快，熟人反馈）
- ✅ 即刻（技术圈，精准用户）
- ✅ Twitter/X（Web3 圈，国际化）
- 可选：V2EX 创造区（需注册账号）

### ✅ 完成标志
- 帖子已发布
- 有第一个点击（Umami 会显示）
- 有第一个评论或点赞

---

## 🎯 执行顺序建议

```
第 1-10 分钟：GSC 注册（需要思考验证方式）
第 11-15 分钟：Umami 注册（5 分钟搞定）
第 16-20 分钟：发社交帖（文案已备好，复制粘贴）
```

---

## 📞 需要柯维协助的地方

**GSC 验证**:
- 如果选 HTML 标记方式，把 `<meta>` 标签发给柯维
- 柯维 5 秒注入到首页 `<head>`

**Umami 代码注入**:
- 把 Website ID 发给柯维
- 柯维 5 秒注入到全站

**其他**:
- 任何问题随时问
- 遇到报错截图发过来

---

## ✅ 完成后告诉我

完成任意一项后，在微信里说一声：
- "GSC 搞定了" → 我立即注入验证代码
- "Umami ID 是 xxx" → 我立即注入统计代码
- "帖子发了" → 我帮你监控第一波流量

**今晚 20:00 前完成的话，明天晨检就能看到第一份流量数据。**

---

*Scrum Master 柯维 | Sprint 1 倒计时开始*

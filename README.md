# SingClaw Site

静态首页 MVP，面向 `singclaw.xyz`。

## 本地结构
- `index.html`：首页
- `vercel.json`：Vercel 基础配置

## 一键部署（需先完成 Vercel 登录）

```bash
cd /root/.openclaw/workspace/singclaw-site
vercel link --yes
vercel --prod --yes
```

## 绑定域名

```bash
vercel domains add singclaw.xyz
vercel domains add www.singclaw.xyz
```

然后按 Vercel 提示补 DNS 记录。

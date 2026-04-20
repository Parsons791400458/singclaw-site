# 🚀 NPDP自动部署管线

> 2026-04-20 星哥指令：**产出即发布，Review不阻塞部署**

## 原则
1. Agent产出文档 → 自动同步到singclaw-site → git push → Vercel部署
2. Review改为**异步**，上线后再审
3. 每次Sprint Cron执行后自动检查并部署

## 同步映射
| 源目录 | → 目标 |
|--------|--------|
| specs/prd/ | singclaw-site/docs/prd/ |
| specs/competitive/ | singclaw-site/docs/competitive/ |
| specs/user-research/ | singclaw-site/docs/research/ |
| specs/rules/ | singclaw-site/docs/rules/ |
| specs/gtm/ | singclaw-site/docs/gtm/ |
| specs/user-stories/ | singclaw-site/docs/user-stories/ |
| artifacts/dashboards/ | singclaw-site/docs/dashboards/ |
| artifacts/backtest/ | singclaw-site/docs/backtest/ |
| artifacts/sprints/ | singclaw-site/docs/sprints/ |
| artifacts/reports/ | singclaw-site/docs/reports/ |
| artifacts/learning/ | singclaw-site/docs/learning/ |
| SPRINT.md | singclaw-site/docs/SPRINT.md |
| BACKLOG.md | singclaw-site/docs/BACKLOG.md |
| DEPLOY_LOG.md | singclaw-site/docs/DEPLOY_LOG.md |

## 部署脚本
```bash
#!/bin/bash
WORKSPACE="/root/.openclaw/workspace"
NPDP="$WORKSPACE/shared/npdp-pm-team"
SITE="$WORKSPACE/singclaw-site"

# 同步文档
mkdir -p $SITE/docs/{prd,competitive,research,rules,gtm,user-stories,dashboards,backtest,sprints,reports,learning}
cp -r $NPDP/specs/prd/* $SITE/docs/prd/ 2>/dev/null
cp -r $NPDP/specs/competitive/* $SITE/docs/competitive/ 2>/dev/null
cp -r $NPDP/specs/user-research/* $SITE/docs/research/ 2>/dev/null
cp -r $NPDP/specs/rules/* $SITE/docs/rules/ 2>/dev/null
cp -r $NPDP/specs/gtm/* $SITE/docs/gtm/ 2>/dev/null
cp -r $NPDP/specs/user-stories/* $SITE/docs/user-stories/ 2>/dev/null
cp -r $NPDP/artifacts/dashboards/* $SITE/docs/dashboards/ 2>/dev/null
cp -r $NPDP/artifacts/backtest/* $SITE/docs/backtest/ 2>/dev/null
cp -r $NPDP/artifacts/sprints/* $SITE/docs/sprints/ 2>/dev/null
cp -r $NPDP/artifacts/reports/* $SITE/docs/reports/ 2>/dev/null
cp -r $NPDP/artifacts/learning/* $SITE/docs/learning/ 2>/dev/null
cp $NPDP/SPRINT.md $SITE/docs/SPRINT.md 2>/dev/null
cp $NPDP/BACKLOG.md $SITE/docs/BACKLOG.md 2>/dev/null
cp $NPDP/DEPLOY_LOG.md $SITE/docs/DEPLOY_LOG.md 2>/dev/null

# Git操作
cd $SITE
git add docs/
if git diff --cached --quiet; then
  echo "NO_CHANGES"
  exit 0
fi
git commit -m "🤖 NPDP自动部署 $(date '+%Y-%m-%d %H:%M CST')"
git push origin main
echo "DEPLOYED"
```

## 部署日志
| 时间 | 变更摘要 | 状态 |
|------|---------|------|
| 2026-04-20 11:21 | 管线建立，首次全量同步 | ⏳ 执行中 |

#!/bin/bash
# 自动从 docs/ 目录生成 _sidebar.md
DOCS_DIR="../docs"
SIDEBAR_FILE="../docs/_sidebar.md"

cat > "$SIDEBAR_FILE" << 'EOF'
- **🏠 首页**
  - [项目总览](/)
  - [Sprint看板](SPRINT.md)
  - [Backlog](BACKLOG.md)
  - [团队协作](TEAM_PROTOCOL.md)

EOF

# 遍历子目录生成导航
for dir in $(ls -d "$DOCS_DIR"/*/ 2>/dev/null | sort); do
  dirname=$(basename "$dir")
  # 跳过backtest（可能有二进制）
  [ "$dirname" = "backtest" ] && continue
  
  # 首字母大写+emoji映射
  case $dirname in
    sprints) label="🏃 Sprint日志" ;;
    prd) label="📋 产品需求" ;;
    competitive) label="🔍 竞品分析" ;;
    research) label="🧪 用户研究" ;;
    rules) label="📏 规则文档" ;;
    gtm) label="🚀 Go-To-Market" ;;
    dashboards) label="📊 数据看板" ;;
    reports) label="📝 报告" ;;
    learning) label="📚 学习材料" ;;
    user-stories) label="👤 用户故事" ;;
    *) label="$dirname" ;;
  esac
  
  echo "- **${label}**" >> "$SIDEBAR_FILE"
  
  # 列出该目录下的md文件
  for f in $(find "$dir" -maxdepth 1 -name "*.md" | sort); do
    fname=$(basename "$f")
    title=$(head -5 "$f" | grep "^#" | head -1 | sed 's/^#\+ *//')
    [ -z "$title" ] && title="${fname%.md}"
    echo "  - [${title}](${dirname}/${fname})" >> "$SIDEBAR_FILE"
  done
  
  echo "" >> "$SIDEBAR_FILE"
done

echo "_sidebar.md 生成完成: $(wc -l < "$SIDEBAR_FILE") 行"

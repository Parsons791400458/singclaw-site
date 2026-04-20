# 📋 Product Backlog
> **维护人**: 明哥(CPO) | **上次更新**: 2026-04-17
> **排序规则**: RICE评分降序 | **容量**: 38点/Sprint

---

## 产品组合总览（四条产品线 × Stage-Gate定位）

| 产品线 | 创新类型 | 当前Stage-Gate | 北极星指标 |
|--------|---------|---------------|-----------|
| SingClaw | 平台式 | Development→Test | 日活用户(DAU) |
| ShrimpFi | 突破式 | Discovery | NFT铸造数 |
| 加密v6.0 | 衍生式 | Discovery | 月收益率 |
| A股v1.1 | 衍生式 | Testing | 策略胜率 |

---

## 🔴 P0 — Sprint 1（本Sprint必须完成）

### [SC-001] SingClaw用户获取基建三件套
- **类型**: Epic
- **创新类型**: 平台式（衍生）
- **Stage-Gate**: Development
- **RICE**: R=8 I=3 C=100% E=2 → **12.0**
- **负责人**: 小增(GTM) + 小度(埋点)
- **验收标准**:
  - [ ] Google Search Console注册+sitemap提交
  - [ ] Umami统计部署+核心事件埋点定义
  - [ ] 首条社交帖子发布+渠道策略文档
- **状态**: Inbox
- **Story Points**: 5
- **备注**: 已拖延8天(原Sprint S1-01~03)，升级为P0

### [AS-001] A股v1.1止损规则分级升级
- **类型**: Story
- **创新类型**: 衍生式
- **Stage-Gate**: Testing
- **RICE**: R=3 I=3 C=80% E=1 → **7.2**
- **负责人**: 小验(规则定义) + 小度(回测数据)
- **验收标准**:
  - [ ] AND止损→分级止损规则PRD（含灰色地带处理）
  - [ ] 历史回测验证（≥20个交易日）
  - [ ] v1.2规则文档产出
- **状态**: Inbox
- **Story Points**: 5
- **备注**: 04-17实盘暴露AND逻辑半触发灰色地带

### [CR-001] 加密v6.0 Discovery用户研究
- **类型**: Spike(技术调研)
- **创新类型**: 衍生式
- **Stage-Gate**: Discovery
- **RICE**: R=5 I=2 C=50% E=2 → **2.5**
- **负责人**: 小洞(用户研究)
- **验收标准**:
  - [ ] 策略交易工具竞品矩阵（≥10个产品）
  - [ ] 目标用户画像(Persona)
  - [ ] JTBD分析（用户雇佣交易工具完成什么任务）
  - [ ] 机会评估报告
- **状态**: Inbox
- **Story Points**: 8
- **备注**: v5.3双Key延误两周零实盘，需重新评估产品方向

### [SF-001] ShrimpFi Discovery用户研究+竞品分析
- **类型**: Spike(技术调研)
- **创新类型**: 突破式
- **Stage-Gate**: Discovery
- **RICE**: R=6 I=2 C=50% E=3 → **2.0**
- **负责人**: 小洞(竞品分析)
- **验收标准**:
  - [ ] GameFi赛道竞品矩阵（≥15个项目，含Base链）
  - [ ] 目标用户画像
  - [ ] Kano需求分类（基本/期望/兴奋）
  - [ ] TAM/SAM/SOM估算
- **状态**: Inbox
- **Story Points**: 8

### [SC-002] SingClaw数据度量体系搭建
- **类型**: Story
- **创新类型**: 平台式
- **Stage-Gate**: Development
- **RICE**: R=8 I=2 C=80% E=2 → **6.4**
- **负责人**: 小度
- **验收标准**:
  - [ ] AARRR漏斗指标定义
  - [ ] 健康度评分体系（含SEO/内容/流量/转化四维）
  - [ ] 数据看板模板
  - [ ] 告警阈值设定
- **状态**: Inbox
- **Story Points**: 5

---

## 🟡 P1 — Sprint 2候选

### [SC-003] SingClaw内容SEO长尾优化
- **RICE**: R=8 I=1 C=80% E=2 → **3.2**
- **负责人**: 小验(关键词PRD) + 小增(执行)
- **Stage-Gate**: Development
- **Story Points**: 5

### [SF-002] ShrimpFi商业论证(Business Case)
- **RICE**: R=6 I=2 C=50% E=3 → **2.0**
- **负责人**: 小度(财务模型) + 小洞(概念测试)
- **Stage-Gate**: Business Case（需Gate 1通过）
- **Story Points**: 8

### [AS-002] A股v1.1情绪周期完整回测报告
- **RICE**: R=3 I=2 C=80% E=2 → **2.4**
- **负责人**: 小度(回测) + 小验(验证标准)
- **Stage-Gate**: Testing
- **Story Points**: 5

### [CR-002] 加密社交动量引擎Scoping
- **RICE**: R=5 I=2 C=50% E=2 → **2.5**
- **负责人**: 明哥(范围定义)
- **Stage-Gate**: Scoping（需Gate 1通过）
- **Story Points**: 3

---

## 🟢 P2 — Backlog储备

### [SC-004] SingClaw邮箱订阅自动化
- **Stage-Gate**: Development | **Story Points**: 3

### [SF-003] ShrimpFi NFT艺术风格定义
- **Stage-Gate**: Development（需Gate 3通过）| **Story Points**: 5

### [CR-003] 加密v6.0策略回测框架
- **Stage-Gate**: Development（需Gate 3通过）| **Story Points**: 8

### [SC-005] SingClaw多平台内容分发
- **Stage-Gate**: Launch | **Story Points**: 5

---

## 🧊 Icebox

*(暂无)*

---

*明哥备注：Sprint 1总点数=31/38容量，留7点buffer给突发。ShrimpFi和加密v6.0的Discovery各占8点，由小洞串行执行（先ShrimpFi后加密，或并行分割时间）。*

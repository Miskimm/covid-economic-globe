# Prototype Options + Focused Validation (Evidence-Aligned)

## Option Set (Max 2, as planned)

## Option A — Guided Comparison Dashboard (Interpretation-first)

### Purpose
Prioritize metric meaning and country/time comparison clarity for primary users.

### Core Interaction
1. Select country pair.
2. Select time pair.
3. Read auto-generated comparison statement with evidence chips.
4. Confirm interpretation in one sentence.

### Requirement Mapping
- R1 Interpretation clarity: inline metric definitions and examples.
- R2 Preference-understanding separation: comprehension task shown before preference question.
- R3 Trust transparency: visible source/method/uncertainty block per panel.
- R4 Cognitive load control: one core analysis task per screen.

## Option B — Narrative Evidence Flow (Guided story mode)

### Purpose
Reduce cognitive overload by sequencing interpretation into guided steps.

### Core Interaction
1. Step 1: Health trend signal.
2. Step 2: Economic trend signal.
3. Step 3: Linked interpretation and boundary note ("correlation, not automatic causation").
4. Step 4: User confidence rating + explanation.

### Requirement Mapping
- R1: stepwise meaning prompts.
- R2: separate confidence and correctness capture.
- R3: source state shown at each step.
- R4: constrained interaction to reduce navigation burden.

## Why only these two options
- Directly addresses tutor feedback: problem-first, user-specific understanding, and justification.
- Covers both major uncertainty branches from gap matrix:
  - free comparison support (A),
  - guided interpretation support (B).

---

## Focused Validation Test Plan

## Participants
- Primary user group only for this cycle (students requiring evidence-based interpretation in coursework).

## Tasks (Correctness-first)
1. Explain "GDP vs 2019" in plain language.
2. Explain "recovery vs 2020" in plain language.
3. Compare two countries across two time points and cite evidence from the interface.
4. Distinguish one observed pattern from one unsupported causal claim.

## Measures
- Interpretation correctness (0/1 per task criterion).
- Completion time.
- Confidence score (1-5).
- Confidence-correctness alignment.
- Trust score with source-awareness check.
- Preference score (collected last, not first).

## Pass/Fail thresholds (cycle gate)
- >= 70% participants correctly complete tasks 1-3 without facilitator correction.
- >= 60% participants correctly identify correlation-vs-causation boundary.
- Preference and comprehension results reported separately.

---

## Validation Run v0 (Completed with current artifacts)

### What was executed
- Comparative questionnaire analysis baseline from `survey_result.md` (n=4).
- Requirement-task mapping completed for Option A and Option B.
- Focused interpretation test script finalized for next participant round.

### Baseline observations
- Prototype preference signal exists but cannot stand in for comprehension evidence.
- Users repeatedly indicate interest in economy-health linkage; this supports interpretation-centered tasks.
- Current sample is too small for directional claims; next round must prioritize correctness tasks.

### Decision
- Move both Option A and B to low/mid-fidelity build for controlled comparison.
- Do not expand feature scope until correctness and trust criteria are met.

---

## 中文译本

### 原型方案 + 聚焦验证（与证据对齐）

#### 方案集（按计划最多 2 个）

**方案 A — 引导式对比仪表盘（解读优先）**

- **目的**：为主要用户强化指标含义与国家/时间比较的清晰度。
- **核心交互**：选国家对 → 选时间点对 → 阅读自动生成的比较陈述与证据标签 → 用一句话确认自己的理解。
- **需求映射**：R1 解读清晰度（内联定义与示例）；R2 偏好与理解分离（偏好题前先做理解任务）；R3 信任透明（每块面板可见来源/方法/不确定性）；R4 认知负荷（每屏一个核心分析任务）。

**方案 B — 叙事式证据流（引导故事模式）**

- **目的**：将解读拆成有序步骤，降低认知过载。
- **核心交互**：步骤 1 健康趋势 → 步骤 2 经济趋势 → 步骤 3 联动解读与边界说明（“相关，非自动因果”）→ 步骤 4 自信度评分与解释。
- **需求映射**：R1 分步含义提示；R2 分开捕捉自信与正确性；R3 每步显示来源状态；R4 约束交互、减轻导航负担。

#### 为何只保留这两个方案

- 直接回应导师反馈：问题优先、用户具体、可辩护。
- 覆盖差距矩阵中两条主要不确定分支：自由比较支撑（A）与引导式解读支撑（B）。

---

### 聚焦验证测试计划

**参与者**：本轮仅主要用户群（需要在课业中用证据解读的学生）。

**任务（正确性优先）**

1. 用通俗语言解释“相较 2019 年的 GDP”。
2. 用通俗语言解释“相较 2020 年低谷的复苏”。
3. 比较两国、两个时间点，并引用界面上的证据。
4. 区分一条已观察到的模式与一条无依据的因果断言。

**测量指标**：解读正确性（每任务 0/1）、完成时间、自信度（1–5）、自信—正确性对齐、信任评分（含来源意识检查）、偏好评分（最后收集，不最先问）。

**通过/本轮门槛**：≥70% 参与者能在无引导员纠正下完成任务 1–3；≥60% 能正确区分相关与因果边界；偏好与理解结果分开报告。

---

### 验证运行 v0（与当前材料已完成）

**已执行**：基于 `survey_result.md` 的比较问卷基线（n=4）；方案 A/B 的需求—任务映射；面向下一轮参与者的聚焦解读测试脚本定稿。

**基线观察**：存在原型偏好信号，但不能代替理解证据；用户反复关心健康—经济联动，支撑以解读为中心的任务；当前样本过小，不宜做方向性断言，下一轮应优先正确性任务。

**决策**：将方案 A、B 推进到低/中保真构建以便对照；在正确性与信任标准达标前不扩大功能范围。

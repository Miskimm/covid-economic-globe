# Next Iteration Plan

## Goal

Use the low-fi testing findings to build and test a mid-fidelity prototype that improves interpretation accuracy, trust calibration, and evidence-based comparison.

## Research Question for Next Iteration

How might a guided comparison dashboard with narrative evidence flow help non-expert users correctly interpret COVID-19 and economic indicators, cite visible evidence, and avoid unsupported causal claims?

## Hypotheses

### H1 — Glossary and worked examples improve metric interpretation

If the interface explains `pp`, `baseline`, and `trough` through glossary chips and examples, then more users will correctly explain the GDP and recovery indicators.

### H2 — Guided comparison improves evidence citation

If users are prompted to compare countries through evidence chips, then more users will cite specific values instead of making impression-based claims.

### H3 — Active boundary checks reduce false causation

If users must choose between supported and unsupported claims, then fewer users will treat correlation as direct causation.

### H4 — Method traceability improves calibrated trust

If users can see formulas, source links, update dates, and limitations, then trust scores will better align with source awareness.

## Prototype to Build

### Mid-fi Prototype: Guided Comparison Dashboard

Recommended screens:

1. **Metric primer**
   - metric definitions;
   - glossary chips;
   - worked examples;
   - quick comprehension check.

2. **Country-time comparison**
   - UK vs Australia;
   - 2020 vs 2023;
   - separate health and economy sections;
   - evidence chips.

3. **Interpretation builder**
   - "Observed pattern" field;
   - "Evidence used" field;
   - "What this does not prove" field.

4. **Trust and source panel**
   - source names;
   - formulas;
   - update date;
   - limitations;
   - confidence and trust scores.

## Test Method

Use a short task-based session with 5-8 primary users.

### Task 1 — Metric explanation

Ask participants to explain:

- `GDP gap from 2019 baseline`;
- `Economic recovery from 2020 trough`;
- `pp`.

### Task 2 — Country comparison

Ask participants:

> Which country had the deeper economic shock, and what value supports your answer?

### Task 3 — Causal boundary

Ask participants:

> Which statement is supported by the data?
>
> A. High COVID cases directly caused GDP decline.  
> B. COVID cases and GDP decline moved together, but this data alone does not prove direct causation.

### Task 4 — Trust and citation

Ask participants:

> Would you cite this tool in an assignment? What source or method information would you need?

## Measures

| Measure | Purpose |
| --- | --- |
| Metric explanation correctness | Tests H1 |
| Evidence citation correctness | Tests H2 |
| Boundary task correctness | Tests H3 |
| Trust score | Tests perceived credibility |
| Confidence score | Tests confidence-correctness alignment |
| Source awareness | Tests H4 |
| Preference score | Collected last, separated from understanding |

## Pass Criteria

The next prototype is considered improved if:

1. at least 70% of users correctly explain both economic metrics;
2. at least 70% cite a specific evidence value in the country comparison;
3. at least 60% correctly identify correlation rather than direct causation;
4. at least 60% mention source or method information when explaining trust;
5. preference and correctness are reported separately.

## Data Recording Template

| Session | Metric score (0-2) | Comparison score (0-2) | Boundary score (0-2) | Trust (1-5) | Confidence (1-5) | Source mentioned? | Main issue |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| S01 | | | | | | | |
| S02 | | | | | | | |
| S03 | | | | | | | |

## Expected Output After Testing

After the next iteration test, produce:

- updated key insights;
- validated/invalidated hypotheses;
- remaining unknowns;
- design requirement update;
- final direction for the Team Collaboration Showcase prototype.

## Reflection Statement

This iteration responds directly to the Week 9 reframing decision. The project no longer treats interaction complexity as automatically valuable. Instead, the prototype is used as a research artifact to test whether users can understand, justify, and appropriately limit claims from COVID-19 and economic data.

---

# 中文译本：下一轮迭代计划

## 目标

使用低保真测试发现，构建并测试一个中保真原型，以提升解读准确性、信任校准和基于证据的比较能力。

## 下一轮研究问题

引导式对比仪表盘结合叙事式证据流，如何帮助非专家用户正确解读 COVID-19 与经济指标，引用可见证据，并避免无依据的因果主张？

## 假设

### H1 — 术语标签和示例能提升指标解读

如果界面通过术语标签和示例解释 `pp`、`baseline` 和 `trough`，那么更多用户将能正确解释 GDP 和 recovery 指标。

### H2 — 引导式比较能提升证据引用

如果用户通过证据标签被引导进行国家比较，那么更多用户会引用具体数值，而不是凭印象作出判断。

### H3 — 主动边界检查能减少虚假因果

如果用户必须在“有支持”和“无支持”的主张之间做选择，那么更少用户会把相关性当作直接因果。

### H4 — 方法可追溯性提升校准后的信任

如果用户能看到公式、来源链接、更新日期和限制，那么信任评分会更好地与来源意识对齐。

## 要构建的原型

### 中保真原型：引导式对比仪表盘

推荐屏幕：

1. **指标入门**
   - 指标定义；
   - 术语标签；
   - 示例；
   - 快速理解检查。

2. **国家-时间对比**
   - 英国 vs 澳大利亚；
   - 2020 vs 2023；
   - 分开展示健康与经济部分；
   - 证据标签。

3. **解释构建器**
   - “观察到的模式”字段；
   - “使用的证据”字段；
   - “这不能证明什么”字段。

4. **信任与来源面板**
   - 来源名称；
   - 公式；
   - 更新日期；
   - 限制；
   - 自信与信任评分。

## 测试方法

使用短任务式测试，招募 5-8 名主要用户。

### 任务 1 — 指标解释

请参与者解释：

- `GDP gap from 2019 baseline`；
- `Economic recovery from 2020 trough`；
- `pp`。

### 任务 2 — 国家比较

向参与者提问：

> 哪个国家遭受了更深的经济冲击？哪个数值支持你的答案？

### 任务 3 — 因果边界

向参与者提问：

> 哪个说法受到数据支持？
>
> A. 高 COVID 病例直接导致 GDP 下降。  
> B. COVID 病例和 GDP 下降同时出现，但仅凭这些数据不能证明直接因果。

### 任务 4 — 信任与引用

向参与者提问：

> 你会在作业中引用这个工具吗？你还需要哪些来源或方法信息？

## 测量指标

| 指标 | 目的 |
| --- | --- |
| 指标解释正确性 | 测试 H1 |
| 证据引用正确性 | 测试 H2 |
| 边界任务正确性 | 测试 H3 |
| 信任评分 | 测试感知可信度 |
| 自信评分 | 测试自信-正确性对齐 |
| 来源意识 | 测试 H4 |
| 偏好评分 | 最后收集，并与理解分开 |

## 通过标准

如果下一版原型达到以下结果，则可视为有改进：

1. 至少 70% 用户能正确解释两个经济指标；
2. 至少 70% 用户在国家比较中引用具体证据值；
3. 至少 60% 用户能正确识别相关性而非直接因果；
4. 至少 60% 用户在解释信任时提到来源或方法信息；
5. 偏好和正确性分开报告。

## 数据记录模板

| Session | 指标分数 (0-2) | 比较分数 (0-2) | 边界分数 (0-2) | 信任 (1-5) | 自信 (1-5) | 是否提到来源 | 主要问题 |
| --- | ---: | ---: | ---: | ---: | ---: | --- | --- |
| S01 | | | | | | | |
| S02 | | | | | | | |
| S03 | | | | | | | |

## 测试后的预期产出

下一轮迭代测试后，需要产出：

- 更新后的关键洞察；
- 被验证/推翻的假设；
- 剩余未知；
- 设计需求更新；
- Team Collaboration Showcase 原型的最终方向。

## 反思陈述

这一轮迭代直接回应 Week 9 的重新定义问题决策。项目不再默认交互复杂度本身有价值，而是将原型作为研究产物，测试用户是否能理解、论证并适当地限制他们从 COVID-19 与经济数据中得出的主张。


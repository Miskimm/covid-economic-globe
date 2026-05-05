# Design Brief After Low-fi Validation

## Project

DECO7180 — COVID-19 and Global Economic Impact

## Current Stage

This brief updates `design_brief_v2.md` after low-fidelity validation of the indicator explanation, country-time comparison, and source/trust cards.

## Design Challenge

Help non-expert readers with learning or explanation needs interpret COVID-19 and economic indicators across countries and time periods, while understanding metric meaning, source limitations, and the boundary between correlation and causation.

## Target Users

### Primary

Students in policy, economics-adjacent, design, communication, or related coursework contexts who need to interpret and justify claims about COVID-19 and economic impact.

### Secondary

General informed readers who want understandable cross-country and time-based comparisons without expert data tools.

## Refined Problem Statement

The problem is not that COVID-19 and economic data cannot be visualized. The problem is that non-expert users can see patterns but still misinterpret what the indicators mean, over-trust or under-trust the data, and make causal claims that the data does not support.

## Low-fi Evidence Summary

1. Users can often identify the deeper economic shock when the comparison is structured side by side.
2. Users still misunderstand key metric semantics such as `pp`, `baseline`, and `trough`.
3. `Recovery vs 2020` can be misread as health recovery rather than economic recovery.
4. Source names improve initial trust, but users need method traceability before citing the tool.
5. A passive correlation warning does not fully prevent causal overclaiming.
6. Preference and confidence do not reliably indicate understanding.

## Updated Design Requirements

### R1. Metric Meaning Scaffolding

Every core indicator must include:

- a plain-language definition;
- a visible baseline explanation;
- an example value;
- a note explaining what the metric does not mean.

Required metric wording updates:

- `GDP vs 2019` should become `GDP gap from 2019 baseline`.
- `Recovery vs 2020` should become `Economic recovery from 2020 trough`.
- `pp` should be explained as `percentage points`.

### R2. Guided Evidence-Based Comparison

The interface must keep country-time comparison as the core task. Users should be guided to:

1. select or view two countries;
2. compare two time points;
3. cite at least one visible evidence value;
4. write or select a supported interpretation.

### R3. Active Correlation-Causation Boundary

The interface must not rely only on a warning banner. It should include an active check such as:

> Which statement is supported by the data?
>
> A. COVID cases directly caused GDP decline.  
> B. COVID cases and GDP decline moved together, but the data alone does not prove direct causation.

### R4. Source and Method Traceability

Each analytical panel should expose:

- data source names;
- source links or source labels;
- snapshot/update date;
- calculation formula;
- missing-data or reporting-difference note;
- limitation statement.

### R5. Preference-Understanding Separation

Testing must continue to collect:

- interpretation correctness;
- confidence score;
- trust score;
- preference score.

Preference must be collected after comprehension tasks.

### R6. Cognitive Load Control

Each screen should focus on one main analytical action:

- understand metric;
- compare countries;
- check trust/source;
- identify causal boundary.

Avoid returning to a dense globe-first interface until these tasks are understood reliably.

## Non-goals

- Predicting future economic outcomes.
- Recommending government policy.
- Proving causal effects of COVID-19 on GDP.
- Building a full production dashboard at this stage.
- Maximizing visual spectacle before interpretation is validated.

## Success Metrics for Next Iteration

1. At least 70% of primary users correctly explain `GDP gap from 2019 baseline`.
2. At least 70% correctly explain `Economic recovery from 2020 trough`.
3. At least 70% identify the deeper economic shock using visible evidence.
4. At least 60% correctly distinguish observed correlation from causal proof.
5. At least 60% can identify at least one source or method limitation.
6. Preference and interpretation results are reported separately.

## Recommended Prototype Direction

Build a mid-fidelity guided comparison dashboard with narrative evidence flow.

The next prototype should combine:

- the structured comparison strength of a dashboard;
- the step-by-step explanation strength of a narrative flow;
- the transparency cues from the source/trust card;
- an active boundary check to reduce false causation.

---

# 中文译本：低保真验证后的设计简报

## 项目

DECO7180 —— COVID-19 与全球经济影响

## 当前阶段

本设计简报是在完成指标解释、国家-时间对比、来源/信任卡片的低保真验证后，对 `design_brief_v2.md` 的更新。

## 设计挑战

帮助有学习或解释需求的非专家读者，在跨国家、跨时间情境中理解 COVID-19 与经济指标，同时理解指标含义、来源限制，以及相关性与因果性的边界。

## 目标用户

### 主要用户

政策、经济相关、设计、传播或相近课程背景的学生，他们需要解释并论证 COVID-19 与经济影响之间的关系。

### 次要用户

希望在无专家数据工具的情况下理解跨国、跨时间比较的普通知情读者。

## 修订后的问题陈述

问题不在于 COVID-19 和经济数据无法被可视化。真正的问题是，非专家用户即使能看到模式，仍可能误解指标含义，过度信任或低估数据，并提出数据本身不支持的因果主张。

## 低保真证据总结

1. 当比较以并排结构呈现时，用户通常能识别更深的经济冲击。
2. 用户仍会误解 `pp`、`baseline` 和 `trough` 等关键指标语义。
3. `Recovery vs 2020` 可能被误读为健康恢复，而不是经济恢复。
4. 来源名称能提升初始信任，但用户在引用工具前需要方法可追溯性。
5. 被动的相关性警告不能完全阻止因果过度推断。
6. 偏好和自信不能可靠代表理解。

## 更新后的设计需求

### R1. 指标含义支撑

每个核心指标必须包含：

- 通俗语言定义；
- 可见的基线解释；
- 示例数值；
- 说明该指标“不代表什么”的注释。

必要的指标措辞更新：

- `GDP vs 2019` 应改为 `GDP gap from 2019 baseline`。
- `Recovery vs 2020` 应改为 `Economic recovery from 2020 trough`。
- `pp` 应解释为 `percentage points`。

### R2. 引导式证据比较

界面必须保留国家-时间对比作为核心任务。用户应被引导完成：

1. 选择或查看两个国家；
2. 比较两个时间点；
3. 引用至少一个可见证据值；
4. 写出或选择一个有证据支持的解释。

### R3. 主动的相关-因果边界检查

界面不能只依赖警告横幅。它应包含主动检查，例如：

> 哪个说法受到数据支持？
>
> A. COVID 病例直接导致 GDP 下降。  
> B. COVID 病例和 GDP 下降同时出现，但仅凭这些数据不能证明直接因果。

### R4. 来源与方法可追溯性

每个分析面板应展示：

- 数据来源名称；
- 来源链接或来源标签；
- 快照/更新时间；
- 计算公式；
- 缺失数据或上报差异说明；
- 限制说明。

### R5. 偏好与理解分离

测试必须继续收集：

- 解读正确性；
- 自信评分；
- 信任评分；
- 偏好评分。

偏好必须在理解任务之后收集。

### R6. 认知负荷控制

每个屏幕应聚焦一个主要分析动作：

- 理解指标；
- 比较国家；
- 检查信任/来源；
- 识别因果边界。

在这些任务被可靠理解之前，应避免回到信息密集的 globe-first 界面。

## 非目标

- 预测未来经济结果。
- 推荐政府政策。
- 证明 COVID-19 对 GDP 的因果影响。
- 在此阶段构建完整生产级 dashboard。
- 在解释能力被验证前最大化视觉效果。

## 下一轮成功指标

1. 至少 70% 的主要用户能正确解释 `GDP gap from 2019 baseline`。
2. 至少 70% 能正确解释 `Economic recovery from 2020 trough`。
3. 至少 70% 能使用可见证据识别更深的经济冲击。
4. 至少 60% 能正确区分观察到的相关性与因果证明。
5. 至少 60% 能指出至少一个来源或方法限制。
6. 偏好结果和解释结果分开报告。

## 推荐原型方向

构建一个中保真的引导式对比仪表盘，并结合叙事式证据流。

下一版原型应结合：

- dashboard 的结构化比较优势；
- 叙事流程的分步解释优势；
- 来源/信任卡片中的透明线索；
- 用于减少虚假因果判断的主动边界检查。


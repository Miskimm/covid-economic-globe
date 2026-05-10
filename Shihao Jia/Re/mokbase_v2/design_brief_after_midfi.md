# Design Brief After Mid-fi Validation

## Project

DECO7180 — COVID-19 and Global Economic Impact

## Current Stage

This brief updates `mokbase_v1/design_brief_after_lowfi.md` after mid-fidelity validation of the four-screen guided comparison dashboard (tool: `mid-fi/interview-en.html`, sessions: `mid-fi/result.md`, n=8, 2026-05-07 to 2026-05-08). It carries forward all requirements from v1 and refines them based on mid-fi evidence.

## Design Challenge

Help non-expert readers — specifically students in policy, economics-adjacent, design, or communication contexts — correctly interpret COVID-19 and economic indicators across countries and time periods, build evidence-based comparisons, maintain accurate correlation-causation boundaries, and develop calibrated trust in the data source, within an interface that does not require sequential compliance to function.

## Target Users

### Primary (Refined After Mid-fi Evidence and Tutor Feedback)

Students in policy, economics-adjacent, design, or communication programmes who need to interpret and justify claims about COVID-19 and economic impact, and who have **varying prior knowledge of economic metrics** — from minimal (design/communication background) to partial (economics-adjacent background). The interface must prioritise accessibility for the lower-knowledge end of this range without removing depth for the higher-knowledge end.

> Note: "Non-expert" has been identified as too broad a category through mid-fi testing. The user group is narrowed to students with an active explanation or learning task, with a specific design priority given to those **without prior economics training**. This is consistent with tutor feedback received 2026-05-06, which requested more specific articulation of the primary user.

### Secondary

General informed readers who want understandable cross-country, cross-time comparisons without expert data tools. The interface should remain usable for this group, but is not optimised for it.

## Refined Problem Statement

Non-expert users with learning or explanation needs can often identify broad patterns in COVID-19 and economic data when comparisons are structured — but they continue to misread indicator semantics, fail to transfer evidence-citation behaviour to open-ended contexts, treat a structured boundary task as demonstrating understanding when it may only demonstrate recognition, and calibrate trust on visual design quality rather than source awareness. The interface must solve for each of these failure modes, not only pattern identification.

## Mid-fi Evidence Summary

1. Domain anchoring in the Metric Primer prevented "Recovery vs 2020" misreads for all 5 users who read it (≥30 s); both users who got the recovery indicator wrong (S03 health misread, S07 domain uncertainty) had dismissed the primer in < 15 s.
2. Evidence chips drove citation in structured tasks (6/8); citation did not transfer to open-ended interpretation fields — S06, S07, and S08 all used impression-based language in Task 3 despite citing specific values in Task 2.
3. The multiple-choice boundary task (3d) produced 7/8 correct selections, but 3 of those 7 reverted to causal language in the open-ended question 3e (S03, S06, S05 mild) — recognising a correct option is not internalising the principle.
4. Method traceability expanded source awareness for 5/8 users; S03 and S06 gave trust 5/5 based on brand recognition (World Bank/WHO) without opening the formula panel — trust-correctness mismatch replicated.
5. S07 and S08 explicitly named the 4-screen sequential structure as friction; S06 skipped to Screen 2 without reading Screen 1 at all.
6. Economics/policy students (S01, S02, S04, S05) correctly explained both indicators and bounded claims in 3e; design/communication students (S03, S06, S07) each made at least one major error across metric, citation, or boundary tasks.

## Updated Design Requirements

### R1. Embedded Metric Meaning (replaces separate primer screen)

Domain anchoring and indicator disambiguation must be embedded directly within the comparison interface, not confined to a prerequisite screen that can be dismissed.

Every core indicator must always display:

- a **colour-coded domain badge** (`ECONOMIC` or `HEALTH`) positioned before the indicator name;
- a **plain-language label** (no technical abbreviations as primary label);
- an **inline expandable definition chip** — visible but not expanded by default, activated by tapping/clicking the label or a `?` icon;
- a **"What this is NOT" line** within the expanded chip.

Indicator wording remains:

- `GDP gap from 2019 baseline` (economic, percentage points below pre-pandemic level)
- `Economic recovery from 2020 trough` (economic, percentage points of growth since lowest point)

### R2. Sustained Evidence Citation

Evidence citation must be scaffolded at every point where the user is expected to reason from data — not only in structured tasks.

- Evidence chips remain on the comparison panel throughout the session.
- The Interpretation Builder replaces blank fields with **sentence-starter templates** that require users to complete a citation structure:
  - "The data shows that [country] had a [value] [metric] in [year], compared to [value] for [country]."
  - "This pattern suggests [observation], but does not prove [causal claim] because [limitation]."

### R3. Constructed-Response Boundary Check

The multiple-choice boundary task is retired. The new mechanism asks users to:

1. Write one claim about what the data shows (free text, max 2 sentences).
2. Evaluate whether their own claim crosses the correlation-causation boundary (self-assessment: "Does my claim imply direct causation? Yes / No / I am unsure").
3. If yes or unsure, the interface prompts: "Revise your claim to say what the data can support."

This replaces recognition with construction and self-correction — two steps that more reliably indicate understanding.

### R4. Source Awareness Micro-task (added)

Before the trust/confidence score input is revealed, users must complete one source awareness step:

- "What is one limitation of this dataset?" (free text, minimum 10 characters, or select from a list)

This prevents trust scores from being submitted without any source engagement, and provides a data-quality check on calibration.

### R5. Persistent Glossary Panel

A collapsible glossary panel must be accessible at all times throughout the session, not only on a primer screen. It should contain:

- `pp` = percentage points (not a proportion; a unit of absolute change)
- `baseline` = the reference value the change is measured against (here: 2019 GDP level)
- `trough` = the lowest point in an economic cycle (here: the sharpest GDP contraction, in 2020)
- `correlation` = two variables moving together without proven causal mechanism
- `causation` = one variable directly producing change in another, proven through controlled evidence

### R6. Progressive Architecture (replaces 4-screen sequence)

The showcase prototype should consolidate the four screens into a **single progressive guided canvas** with contextual layers:

- **Main canvas**: country comparison panel with domain badges, evidence chips, and sentence-starter interpretation field — visible immediately.
- **On first interaction with any metric**: expandable definition chip activates automatically.
- **After comparison input**: boundary self-check task appears.
- **Before trust score**: source awareness micro-task appears.
- **At any time**: persistent glossary and source/method panels are accessible via sidebar.

This allows exploratory users to reach the comparison panel without a gated flow, while preserving the full guided sequence for users who need it.

### R7. Preference-Understanding Separation (carried from v1)

Preference and trust scores must continue to be collected after comprehension tasks, not before.

## Non-goals (updated)

- Predicting future economic outcomes.
- Recommending government policy.
- Proving causal effects of COVID-19 on GDP.
- Serving professional data analysts or economists as primary users.
- Maximising visual novelty before interpretation accuracy is validated.
- Building a comprehensive multi-country tool at showcase stage (scope remains UK vs Australia as primary comparison case).

## Success Metrics for Showcase Iteration

1. At least 70% of primary users correctly explain `GDP gap from 2019 baseline` with a domain-correct interpretation.
2. At least 70% correctly explain `Economic recovery from 2020 trough` as an economic (not health) indicator.
3. At least 70% cite a specific evidence value in their comparison interpretation.
4. At least 65% correctly identify the correlation-causation boundary in the constructed-response task.
5. At least 65% complete the source awareness micro-task before submitting a trust score.
6. Less than 20% of users show a severe preference-correctness mismatch (trust ≥ 4 while answering 0/2 on metric explanation).
7. Preference and interpretation results are reported separately.

## Recommended Prototype Direction for Showcase

Build a **hi-fi progressive guided dashboard** that:

- opens directly to the comparison canvas (no gated prerequisite screen);
- embeds domain anchoring, terminology, and disambiguation contextually within the comparison interface;
- structures evidence citation through sentence-starter templates rather than blank fields;
- replaces the multiple-choice boundary task with a constructed-response and self-evaluation mechanism;
- gates the trust score behind a source awareness micro-task;
- provides a persistent glossary panel accessible at all times;
- maintains a clean enough visual design to be engaging in a public showcase context without letting visual quality become a confound for trust measurement.

---

# 中文译本：中保真验证后的设计简报

## 项目

DECO7180 —— COVID-19 与全球经济影响

## 当前阶段

本设计简报在完成中保真四屏引导式对比仪表盘的验证后，对 `mokbase_v1/design_brief_after_lowfi.md` 进行更新。继承 v1 全部需求，并基于中保真证据进行修订。

## 设计挑战

帮助非专家读者——尤其是政策、经济相关、设计或传播课程背景的学生——正确解读跨国家、跨时间的 COVID-19 与经济指标，建立基于证据的比较，维持准确的相关-因果边界，并对数据来源形成校准后的信任，且这一切应在一个**无需顺序顺从才能使用**的界面中实现。

## 目标用户

### 主要用户（经中保真证据与 tutor 反馈后修订）

需要解释和论证 COVID-19 与经济影响关系的政策、经济相关、设计或传播课程学生，其经济指标先验知识差异显著——从极少（设计/传播背景）到部分（经济相关背景）。界面必须优先服务知识水平较低的一端，同时不移除对知识水平较高用户有用的深度。

> 注：中保真测试证明"非专家"过于宽泛，主要用户群收窄为有主动解释或学习任务的学生，设计优先级明确给予**无经济学训练背景**的用户。这与 2026-05-06 tutor 反馈一致。

### 次要用户

希望在没有专家数据工具的情况下理解跨国、跨时间比较的普通知情读者。界面对此群体可用，但不为其优化。

## 修订后的问题陈述

有学习或解释需求的非专家用户在比较结构清晰时，通常能识别广泛的模式——但他们仍会误读指标语义、无法将证据引用行为延续到开放字段、将结构化边界任务中的正确选择等同于理解，并基于视觉设计质量而非来源意识来校准信任。界面必须针对每一种失效模式进行解决，而不仅仅是模式识别。

## 中保真证据总结

1. 指标入门中的领域锚定防止了"Recovery vs 2020"健康恢复误读——但仅对完整阅读入门的用户有效；3/8 用户跳过太快无法受益。
2. 证据标签在结构化任务中驱动了引用；引用行为未延续到开放字段。
3. 选择题边界任务产生了正确选择，但未产生正确的开放式推理——识别正确选项不等于内化原则。
4. 方法可追溯性扩大了多数用户的来源意识，但未阻止 2/8 用户的信任评分由视觉质量驱动。
5. 4 屏顺序流程产生摩擦和跳过行为；有经济背景的用户感到被过度管理；无经济背景的用户即便有入门屏，若跳过则仍会挣扎。
6. 经济/政策背景学生与设计/传播背景学生的指标解读准确率差异显著，确认群体内异质性是设计相关变量。

## 更新后的设计需求

### R1. 内嵌指标含义（替代独立入门屏）

领域锚定和指标消歧义必须直接嵌入比较界面，不能局限于可被跳过的前置屏。

每个核心指标必须始终显示：
- 指标名称前的**彩色领域标签**（`ECONOMIC` 或 `HEALTH`）；
- **通俗标签**（主标签不使用技术缩写）；
- **内联可展开定义标签**——默认不展开，点击标签或 `?` 图标激活；
- 展开后包含**"这不代表什么"行**。

### R2. 持续的证据引用

证据引用必须在用户需要从数据推理的每个环节提供支撑，而不仅在结构化任务中。

- 证据标签在整个会话过程中保持可见。
- 解释构建器以**句子起头模板**替换空白字段，要求用户完成引用结构。

### R3. 构建式回答边界检查

选择题边界任务退役。新机制要求用户：
1. 写出一个关于数据说明了什么的主张（自由文本，最多 2 句）。
2. 自我评估该主张是否越过了相关-因果边界。
3. 若越过，界面提示修改主张。

### R4. 来源意识微任务（新增）

在信任/自信评分输入出现之前，用户必须完成一个来源意识步骤：
- "这个数据集的一个限制是什么？"（自由文本或选择列表）

### R5. 持久术语面板

整个会话期间随时可访问的可折叠术语面板，包含 `pp`、`baseline`、`trough`、`correlation`、`causation` 的通俗定义。

### R6. 渐进式架构（替代 4 屏顺序）

Showcase 原型应将四屏整合为**单一渐进引导画布**，含情境覆盖层：
- **主画布**：国家比较面板，含领域标签、证据标签、句子起头解释字段——立即可见。
- **首次与指标交互时**：可展开定义标签自动激活。
- **完成比较输入后**：边界自检任务出现。
- **提交信任评分前**：来源意识微任务出现。
- **任何时候**：持久术语面板和来源/方法面板通过侧边栏可访问。

### R7. 偏好-理解分离（从 v1 延续）

偏好和信任评分必须在理解任务完成后收集。

## 非目标（更新）

- 预测未来经济结果。
- 推荐政府政策。
- 证明 COVID-19 对 GDP 的因果影响。
- 以专业数据分析师或经济学家为主要用户。
- 在解释准确性验证前最大化视觉新奇感。
- 在 showcase 阶段构建多国综合工具（范围保持为英国 vs 澳大利亚）。

## Showcase 迭代成功指标

1. 至少 70% 的主要用户正确解释 `GDP gap from 2019 baseline`（领域正确）。
2. 至少 70% 将 `Economic recovery from 2020 trough` 正确解释为经济指标（非健康）。
3. 至少 70% 在比较解释中引用具体证据值。
4. 至少 65% 在构建式回答任务中正确识别相关-因果边界。
5. 至少 65% 在提交信任评分前完成来源意识微任务。
6. 不足 20% 的用户出现严重的偏好-正确性背离（信任≥4 但指标解释 0/2 正确）。
7. 偏好与解释结果分开报告。

## Showcase 推荐原型方向

构建**高保真渐进式引导仪表盘**，直接开启至比较画布，将领域锚定和术语说明情境内嵌，以句子起头模板替代空白字段，以构建式+自评机制替代选择题边界任务，在信任评分前设置来源意识微任务，提供全程持久术语面板，并在保持公开展示吸引力的同时，不让视觉质量成为信任测量的混淆变量。

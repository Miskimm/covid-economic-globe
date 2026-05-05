# Solution 8: Evidence Synthesis After Low-fi Testing

> Stage: `research_problem_plan_checklist.md` Step 8  
> Inputs: `low-fi wireframe/result.md`, `low-fi wireframe/result_interview.md`, `plan/design_brief_v2.md`, `plan/prototype_options_and_validation.md`  
> Purpose: synthesize the low-fi validation evidence into design insights, invalidated assumptions, remaining unknowns, and a prototype direction decision.

---

## 1. What Was Tested

The low-fi test used three interpretation cards:

1. **Indicator meaning card** — tested whether users could explain `GDP vs 2019` and `Recovery vs 2020`.
2. **Country-time comparison card** — tested whether users could compare the United Kingdom and Australia across 2020 and 2023 using visible evidence.
3. **Source and trust card** — tested whether source/method/limitation notes changed user trust and causal interpretation.

The test targeted the project's primary user group: non-expert readers with learning or explanation needs, especially students in policy, economics-adjacent, design, communication, or related contexts.

---

## 2. Key Insights

### Insight 1 — Users can often identify the deeper economic shock when the comparison is structured

Most participants could identify the United Kingdom as having the deeper economic shock when they attended to the GDP values. In the self-fill responses, 7 out of 10 participants correctly identified the UK using the `-12.0pp` vs `-3.7pp` evidence.

**Design implication:** The country-time comparison task is useful and should remain in the next prototype. Users benefit from having two countries, two time points, and evidence values presented side by side.

### Insight 2 — Metric semantics are still the main comprehension barrier

Several users misunderstood `pp`, `baseline`, and `trough`. Some interpreted `GDP vs 2019` as total GDP or a single-year GDP percentage drop. Some interpreted `Recovery vs 2020` as health recovery rather than economic recovery.

**Design implication:** The next prototype needs stronger inline explanations, glossary chips, and worked examples for each metric. Labels alone are not enough.

### Insight 3 — Preference and understanding still diverge

Some participants gave high preference or confidence scores while misunderstanding key concepts. This confirms the earlier concern that visual liking is not a valid proxy for interpretation quality.

**Design implication:** The evaluation protocol must continue to collect comprehension correctness before preference questions.

### Insight 4 — Source names increase initial trust, but method traceability is still required

Participants responded positively to visible sources such as World Bank, OWID, and WHO. However, many still asked for exact formulas, source links, missing-data notes, and explanation of how datasets were combined.

**Design implication:** Trust transparency should include not only source names, but also method explanations, update state, calculation notes, and limitations.

### Insight 5 — Correlation-causation confusion remains a high-risk issue

Several lower-familiarity users inferred that high COVID cases directly caused GDP decline, even when a correlation warning was present.

**Design implication:** A passive warning is not enough. The interface should actively ask users to distinguish an observed pattern from an unsupported causal claim.

---

## 3. Invalidated or Weakened Assumptions

### A1. "Users will naturally connect health and economy correctly"

**Status:** Invalidated.  
Some users focused mainly on cases/deaths and treated GDP as secondary or assumed the health data directly explained the economic data.

### A2. "Clear source names are enough for trust"

**Status:** Weakened.  
Source names helped, but users still wanted formulas, source links, update dates, and missing-data notes.

### A3. "Preference indicates comprehension"

**Status:** Invalidated.  
Several participants liked the cards or trusted them while misunderstanding metric meanings or causal boundaries.

### A4. "A visible correlation warning prevents causal overclaiming"

**Status:** Weakened.  
The warning helped careful users, but some users still concluded that COVID directly caused GDP decline.

### A5. "Metric labels are understandable if they are short"

**Status:** Invalidated.  
Short labels such as `Recovery vs 2020` created ambiguity. Users need precise but plain-language labels.

---

## 4. Remaining Unknowns

1. Would glossary chips for `pp`, `baseline`, and `trough` reduce metric misunderstandings?
2. Would a guided narrative flow reduce false causation more effectively than static cards?
3. Would economics/policy students remain more accurate than general informed readers in a larger sample?
4. How much source/method detail is enough before users feel confident citing the tool in coursework?
5. Should the next prototype prioritize a dashboard structure, a narrative flow, or a merged guided comparison interface?

---

## 5. Evidence-to-Requirement Mapping

| Evidence from low-fi test | Updated requirement |
| --- | --- |
| Users confused `pp`, `baseline`, and `trough` | Add glossary chips and example-based metric definitions |
| Users confused economic recovery with health recovery | Rename `Recovery vs 2020` to `Economic recovery from 2020 trough` |
| Some users inferred direct causation | Add active correlation-vs-causation check, not only a passive warning |
| Users wanted exact formulas and source links | Add source/method expandable details at point-of-use |
| Preference did not equal understanding | Keep comprehension tasks before preference questions |
| Side-by-side comparison helped users identify economic shock | Keep country-time comparison as the core task |

---

## 6. Prototype Direction Decision

### Decision: Merge Option A and Option B

The next prototype should merge:

- **Option A: Guided Comparison Dashboard** — because users need side-by-side evidence for country/time comparison.
- **Option B: Narrative Evidence Flow** — because users need staged explanation to avoid metric confusion and causal overclaiming.

### Rationale

The low-fi evidence suggests that users can complete comparison tasks when the evidence is structured, but they still need stronger interpretation scaffolding before and during comparison. A pure dashboard may still allow users to skip meaning. A pure narrative may reduce exploration too much. A merged direction gives users guided interpretation first, then structured comparison with evidence chips.

### Short decision statement

The project should pivot away from a globe-first or visual-spectacle-first interface and move toward a guided comparison dashboard with narrative evidence flow. The next prototype should prioritize metric meaning, source/method traceability, and active correlation-causation boundary checks before adding richer interaction.

---

## 7. Next Design Questions

1. How can metric definitions be shown without overloading the interface?
2. Can an active "observed pattern vs causal claim" task reduce false causation?
3. Which explanation format works better: glossary chips, worked examples, or step-by-step narrative?
4. How much source transparency is enough for users to cite the tool confidently?
5. Can the interface preserve engagement from the globe concept while reducing interpretation errors?

---

# 中文译本：低保真测试后的证据综合

> 阶段：`research_problem_plan_checklist.md` 第 8 步  
> 输入：`low-fi wireframe/result.md`、`low-fi wireframe/result_interview.md`、`plan/design_brief_v2.md`、`plan/prototype_options_and_validation.md`  
> 目的：将低保真验证证据综合为设计洞察、被推翻的假设、剩余未知，以及下一步原型方向决策。

---

## 1. 测试了什么

低保真测试使用了三张解释卡片：

1. **指标含义卡片**：测试用户能否解释 `GDP vs 2019` 和 `Recovery vs 2020`。
2. **国家-时间对比卡片**：测试用户能否使用可见证据，对英国和澳大利亚在 2020 与 2023 年之间进行比较。
3. **来源与信任卡片**：测试来源、方法和限制说明是否影响用户信任与因果判断。

本次测试面向项目的主要用户群：有学习或解释需求的非专家读者，尤其是政策、经济相关、设计、传播或相近课程背景的学生。

---

## 2. 关键洞察

### 洞察 1：当比较结构清晰时，用户通常能识别更深的经济冲击

多数参与者在关注 GDP 数值时，能够识别英国遭受了更深的经济冲击。在自填问卷中，10 名参与者中有 7 名能使用 `-12.0pp` 与 `-3.7pp` 的证据正确识别英国。

**设计含义：** 国家-时间对比任务是有效的，应保留到下一版原型中。用户受益于并排呈现两个国家、两个时间点和证据数值。

### 洞察 2：指标语义仍然是主要理解障碍

部分用户误解了 `pp`、`baseline` 和 `trough`。有人把 `GDP vs 2019` 理解成 GDP 总量或单一年份 GDP 百分比下降，也有人把 `Recovery vs 2020` 理解成健康恢复，而不是经济恢复。

**设计含义：** 下一版原型需要为每个指标提供更强的内联解释、术语标签和示例。仅靠标签本身不够。

### 洞察 3：偏好和理解仍然会背离

部分参与者给出了较高偏好或自信评分，但仍误解了关键概念。这验证了此前的担忧：视觉喜好不能作为解释质量的有效替代指标。

**设计含义：** 评估流程必须继续先收集理解正确性，再收集偏好问题。

### 洞察 4：来源名称能提升初始信任，但仍需要方法可追溯性

参与者对 World Bank、OWID 和 WHO 等可见来源有正面反应。然而，许多人仍要求看到精确公式、来源链接、缺失数据说明，以及数据集如何合并的解释。

**设计含义：** 信任透明不应只包括来源名称，还应包括方法解释、更新时间、计算说明和限制。

### 洞察 5：相关性与因果性的混淆仍然是高风险问题

一些熟悉度较低的用户即使看到相关性警示，仍推断高 COVID 病例直接导致 GDP 下降。

**设计含义：** 被动警告不够。界面应主动要求用户区分“观察到的模式”和“无依据的因果断言”。

---

## 3. 被推翻或削弱的假设

### A1：“用户会自然且正确地连接健康与经济”

**状态：被推翻。**  
部分用户主要关注病例/死亡，并把 GDP 放在次要位置，或认为健康数据能直接解释经济数据。

### A2：“清楚标出来源名称就足以建立信任”

**状态：被削弱。**  
来源名称有帮助，但用户仍需要公式、来源链接、更新日期和缺失数据说明。

### A3：“偏好代表理解”

**状态：被推翻。**  
一些参与者喜欢卡片或信任卡片，但仍误解指标含义或因果边界。

### A4：“可见的相关性警告能防止因果过度推断”

**状态：被削弱。**  
警告能帮助谨慎用户，但仍有用户认为 COVID 直接导致 GDP 下降。

### A5：“指标标签只要短就容易理解”

**状态：被推翻。**  
`Recovery vs 2020` 这样的短标签会造成歧义。用户需要准确但通俗的标签。

---

## 4. 剩余未知

1. 为 `pp`、`baseline` 和 `trough` 添加术语标签是否能减少指标误解？
2. 引导式叙事流程是否比静态卡片更能减少虚假因果判断？
3. 在更大样本中，经济/政策背景学生是否仍比普通读者更准确？
4. 用户在课业中有信心引用工具前，需要多少来源/方法细节？
5. 下一版原型应优先采用 dashboard 结构、叙事流程，还是合并式引导比较界面？

---

## 5. 证据到需求的映射

| 低保真测试证据 | 更新后的需求 |
| --- | --- |
| 用户混淆 `pp`、`baseline` 和 `trough` | 添加术语标签和基于示例的指标定义 |
| 用户把经济恢复误解为健康恢复 | 将 `Recovery vs 2020` 改为 `Economic recovery from 2020 trough` |
| 部分用户推断直接因果 | 增加主动的相关/因果判断任务，而不是仅放被动警告 |
| 用户需要精确公式和来源链接 | 在使用点加入可展开的来源/方法细节 |
| 偏好不等于理解 | 保持理解任务在偏好问题之前 |
| 并排比较帮助用户识别经济冲击 | 将国家-时间对比保留为核心任务 |

---

## 6. 原型方向决策

### 决策：合并方案 A 和方案 B

下一版原型应合并：

- **方案 A：引导式对比仪表盘**，因为用户需要并排证据来完成国家/时间比较。
- **方案 B：叙事式证据流**，因为用户需要分阶段解释，以避免指标混淆和因果过度推断。

### 理由

低保真证据显示，当证据结构清晰时，用户可以完成比较任务，但他们在比较前和比较过程中仍需要更强的解释支撑。纯 dashboard 可能仍让用户跳过含义理解；纯叙事可能过度限制探索。合并方向可以先提供引导式解释，再用证据标签支持结构化比较。

### 简短决策陈述

项目应从以 globe 或视觉效果优先的界面转向“引导式对比仪表盘 + 叙事式证据流”。下一版原型在加入更丰富交互之前，应优先处理指标含义、来源/方法可追溯性，以及主动的相关-因果边界检查。

---

## 7. 下一步设计问题

1. 如何在不增加界面负担的情况下展示指标定义？
2. 主动的“观察到的模式 vs 因果断言”任务能否减少虚假因果？
3. 哪种解释格式更有效：术语标签、示例，还是分步叙事？
4. 多少来源透明度足以让用户有信心在课业中引用该工具？
5. 界面能否保留 globe 概念的吸引力，同时减少解释错误？


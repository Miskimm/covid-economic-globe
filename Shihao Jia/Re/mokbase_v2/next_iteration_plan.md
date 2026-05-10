# Next Iteration Plan — Showcase Prototype (Hi-fi)

## Goal

Build and test a hi-fi progressive guided dashboard that addresses the failure modes identified in mid-fi testing (`mid-fi/result.md`): primer dismissal (S03, S06, S07), citation decay in open fields (S06, S07, S08), boundary recognition without internalisation (S03, S06 selected B but reverted to causal in 3e), and trust-score calibration without source engagement (S03, S06 gave trust 5 without opening Screen 4). The prototype must be demonstrable in a public showcase context (Week 13, 2026-05-25) and must support the team's narrative of a complete, evidence-driven design process.

## Research Question for This Iteration

Does a single progressive guided canvas — embedding domain anchoring, evidence-citation scaffolding, constructed-response boundary checking, and source-gated trust scoring within one integrated interface — produce higher interpretation accuracy and better trust calibration than the 4-screen sequential prototype, while also reducing friction for users with partial prior knowledge?

## Hypotheses

### H5 — Progressive canvas reduces primer dismissal

If domain badges and indicator definition chips are embedded persistently within the comparison panel (rather than on a prerequisite screen), then fewer users will encounter the comparison without having been exposed to the domain context, because the context is present regardless of whether they choose to expand the chip.

**Measurable as**: proportion of users who read zero indicator context before beginning the comparison task (target: < 15%).

### H6 — Sentence-starter templates sustain evidence citation across all interpretation fields

If every interpretation field uses a sentence-starter template that requires the user to complete a citation structure, then evidence citation will not decay between structured task moments and open-ended fields.

**Measurable as**: proportion of interpretation field submissions that include at least one specific numerical value (target: ≥ 70%).

### H7 — Constructed-response boundary self-check produces genuine boundary internalisation

If users write their own claim and then self-evaluate whether it implies causation — rather than selecting from pre-written options — then the boundary principle will be better retained in unstructured follow-up questions.

**Measurable as**: proportion of users who also use non-causal language in an unstructured follow-up question after completing the boundary task (target: ≥ 65%).

### H8 — Source awareness micro-task reduces trust-correctness mismatch

If users must complete a source limitation task before the trust score input is revealed, then fewer users will submit maximum trust scores without source engagement.

**Measurable as**: proportion of users with trust ≥ 4 who can also name at least one source or limitation (target: ≥ 80%).

---

## Prototype to Build

### Hi-fi Prototype: Progressive Guided Dashboard

**Format**: Interactive web page (HTML/CSS/JS, no installation required), or Figma clickable prototype with hotspot logic. Recommended: web page for showcase (live demo, no Figma viewer required).

**Scope**: UK vs Australia, 2020 vs 2023, two economic indicators (`GDP gap from 2019 baseline`, `Economic recovery from 2020 trough`), two COVID indicators (confirmed cases trajectory, stringency index if available).

### Canvas Layers and Interaction Logic

**Layer 1 — Comparison panel** (loads immediately)

- Side-by-side country cards: United Kingdom | Australia
- Time toggle: 2020 / 2023
- Indicators displayed with domain badge, plain-language label, evidence chip
- Economic indicators in one colour zone; COVID indicators in another
- Persistent collapsible glossary button in corner
- Persistent `?` icon on each indicator label

**Layer 2 — Indicator definition** (triggered on first tap/hover of any metric label or `?` icon)

- Expandable chip slides open below the indicator row
- Contains: plain-language definition / worked example / "What this does NOT mean" line
- Domain badge (`ECONOMIC` / `HEALTH`) always remains visible after chip is collapsed
- Auto-expands on first encounter, does not auto-expand on subsequent encounters

**Layer 3 — Interpretation field** (appears after user selects a comparison focus or clicks "I'm ready to interpret")

- Sentence-starter template pre-filled in field:
  > "The data shows that [country] had a [value] [metric] in [year], compared to [value] for [country]. This pattern suggests [observation], but does not prove [causal claim] because [limitation]."
- User replaces bracketed segments
- Minimum content check: at least one numerical value must be present (validated on submit attempt)

**Layer 4 — Boundary self-check** (appears after interpretation field is submitted)

- User's own interpretation text is displayed back to them
- Prompt: "Does your interpretation imply that COVID directly caused the economic change? Yes / No / Unsure"
- If Yes or Unsure: guided revision prompt — "Try revising your interpretation to describe what moved together, rather than what caused what."
- If No: proceed to Layer 5
- Confidence score collected (1–5)

**Layer 5 — Source and trust** (appears after boundary check is completed)

- Source awareness micro-task: "Before rating your trust, name one limitation of this dataset." (free text, minimum 8 characters, or select from: "Cross-country reporting differences / Economic data lag / No controlled experiment / Dataset may be updated")
- After micro-task completed: source panel expands (source names, snapshot date, formula note, missing-data caveat)
- Trust score (1–5) input revealed
- Preference score (1–5) collected last ("How useful did you find this tool for building an argument?")

---

## Test Method

Short task-based sessions, 4–6 participants from primary user group, ~20 minutes each.

Moderator script follows the same bias-reduction rules as low-fi and mid-fi sessions:
- Same task sequence for all participants
- No correction of answers; only probe "why do you say that?"
- Record direct quotes for all interpretation field and boundary self-check responses
- Comprehension tasks before preference questions

### Task 1 — Metric explanation (tests H5)

Without expanding any chips, ask: "Looking at the comparison panel right now, what does the `ECONOMIC` label on the first indicator tell you?"

Then: "Expand the indicator chip and read it. Now how would you explain that indicator to a classmate in one sentence?"

### Task 2 — Evidence-based comparison (tests H6)

Ask participant to complete the interpretation field for the UK vs Australia comparison. Observe whether they include a numerical value without being prompted.

### Task 3 — Boundary self-check (tests H7)

After participant completes the boundary self-check task, ask one unstructured follow-up: "If you were presenting this to your class, what would you say about why the UK economy changed more?"

Record whether their answer uses causal or correlation language.

### Task 4 — Source and trust (tests H8)

After trust score is submitted, ask: "What made you choose that score? What would make you trust it more or less?"

Observe whether their reasoning references any source or limitation they encountered in the tool.

---

## Measures

| Measure | Hypothesis | Pass target |
| --- | --- | --- |
| % users who encountered indicator context before comparing | H5 | ≥ 85% |
| % interpretation fields containing at least one numerical value | H6 | ≥ 70% |
| % users using non-causal language in unstructured follow-up | H7 | ≥ 65% |
| % users with trust ≥ 4 who name a source or limitation | H8 | ≥ 80% |
| % users correctly explaining `GDP gap from 2019 baseline` | Carry from v1/v2 | ≥ 70% |
| % users correctly explaining `Economic recovery from 2020 trough` as economic | Carry from v1/v2 | ≥ 70% |
| Confidence-correctness alignment (no severe mismatch) | Calibration | < 20% severe mismatch |
| Preference score (collected separately from all above) | — | Reported, not used as success criterion |

---

## Data Recording Template

| Session | Metric (0-2) | Evidence cited? | Boundary self-check correct | Unstructured follow-up causal? | Trust | Source named? | Confidence | Preference | Main observation |
| --- | ---: | --- | --- | --- | ---: | --- | ---: | ---: | --- |
| S01 | | | | | | | | | |
| S02 | | | | | | | | | |
| S03 | | | | | | | | | |
| S04 | | | | | | | | | |
| S05 | | | | | | | | | |
| S06 | | | | | | | | | |

---

## Timeline

| Week | Action |
| --- | --- |
| Week 10 (now) | Begin hi-fi build; assign screens to team members |
| Week 11 | Complete interactive prototype; internal walkthrough |
| Week 11–12 | Run 4–6 test sessions; record responses |
| Week 12 | Synthesise results; produce `mokbase_v3/` documents |
| Week 13 (2026-05-25) | Team Collaboration Showcase |

---

## Expected Output After Testing

After the showcase iteration test, produce `mokbase_v3/` containing:

- `solution8_evidence_synthesis.md` — final evidence synthesis; verdict on H5–H8; full hypothesis chain from H1–H8 summarised
- `design_brief_after_hifi.md` — final design brief; confirmed requirements and success metric outcomes
- `prototype_direction_decision.md` — decision on whether the progressive canvas architecture should be carried forward, modified, or documented as the final research artefact
- `next_iteration_plan.md` — post-showcase reflection and recommendations for future work (not another prototype; identifies remaining open questions)

---

## Showcase Presentation Narrative

The showcase presentation should walk through the full design process story:

1. **Starting point**: Globe-first prototype; high visual engagement; no validated problem definition.
2. **Reframing decision (Week 9)**: A01 tutor feedback identified solution-first problem, undefined users, weak evidence chain. Team returned to problem definition.
3. **Low-fi validation**: Three indicator cards + 10-session pilot revealed misread patterns, preference-understanding mismatch, and causal overclaiming.
4. **Mid-fi iteration**: 4-screen sequential guided dashboard; addressed semantic issues but introduced primer dismissal, citation decay, and flow friction.
5. **Hi-fi iteration**: Progressive canvas; each design change directly traceable to a specific mid-fi failure mode.
6. **Known limitations**: Synthetic pilot data in low-fi; small n in mid-fi and hi-fi; UK–Australia scope only; user group narrowed but still partially heterogeneous.
7. **Design argument**: The prototype tests a research claim — not a product claim. The claim is: guided interpretation scaffolding embedded contextually within a comparison interface produces more accurate and better-bounded reasoning than unscaffolded exploration.

All team members must be able to:
- explain their individual research line;
- describe what each team member contributed and why;
- speak to the full process, not only their own piece.

---

## Reflection Statement

This iteration responds to the compounded evidence from two validation rounds. The low-fi round showed what users fail to understand without scaffolding. The mid-fi round showed that scaffolding on a separate screen does not protect users who skip it. The hi-fi round tests whether scaffolding embedded within the tool itself — present at every moment of use, not only in designated teaching moments — produces durable interpretation improvement. The design argument is not that the interface makes users expert. It is that the interface makes the right interpretive frame available at every point of contact, so users who engage with it have less opportunity to construct an incorrect one.

---

# 中文译本：下一轮迭代计划 — Showcase 原型（高保真）

## 目标

构建并测试高保真渐进式引导仪表盘，解决中保真测试中识别的失效模式：入门跳过、引用衰减、边界识别而非内化、信任评分与来源参与脱钩。原型必须能在 Week 13 公开 showcase（2026-05-25）中演示，并支持团队完整、证据驱动的设计过程叙事。

## 本轮研究问题

单一渐进式引导画布——将领域锚定、证据引用支撑、构建式回答边界检查和来源门控信任评分整合在一个界面中——与 4 屏顺序原型相比，能否产生更高的解读准确性和更好的信任校准，同时减少对部分知识用户的摩擦？

## 假设

### H5 — 渐进画布减少入门跳过

若领域标签和定义标签持续内嵌于比较面板中（而非在前置屏上），则较少用户会在未接触领域情境的情况下开始比较任务。

**可测量为**：开始比较任务前未阅读任何指标情境的用户比例（目标：< 15%）。

### H6 — 句子起头模板在所有解释字段中延续证据引用

若每个解释字段均使用要求完成引用结构的句子起头模板，则证据引用不会在结构化任务与开放字段之间衰减。

**可测量为**：包含至少一个具体数值的解释字段提交比例（目标：≥ 70%）。

### H7 — 构建式回答边界自检产生真正的边界内化

若用户写出自己的主张再自评是否暗示因果——而非从预设选项中选择——则边界原则在无结构追问中将得到更好保留。

**可测量为**：完成边界任务后在无结构追问中使用非因果语言的用户比例（目标：≥ 65%）。

### H8 — 来源意识微任务减少信任-正确性背离

若用户在信任评分输入出现前必须完成来源限制任务，则较少用户会在未参与来源的情况下提交高信任评分。

**可测量为**：信任≥4 且能说出至少一项来源或限制的用户比例（目标：≥ 80%）。

---

## 时间线

| 周次 | 行动 |
| --- | --- |
| Week 10（当前） | 开始高保真构建；按团队成员分配模块 |
| Week 11 | 完成可交互原型；内部走查 |
| Week 11-12 | 运行 4-6 次测试；记录响应 |
| Week 12 | 综合结果；生成 `mokbase_v3/` 文档 |
| Week 13（2026-05-25） | Team Collaboration Showcase |

---

## 测试后预期产出

Showcase 迭代测试后，生成 `mokbase_v3/` 包含：

- `solution8_evidence_synthesis.md` — 最终证据综合；H5-H8 结论；H1-H8 完整假设链摘要
- `design_brief_after_hifi.md` — 最终设计简报；确认的需求和成功指标结果
- `prototype_direction_decision.md` — 关于是否延续、修改或将渐进画布架构记录为最终研究产物的决策
- `next_iteration_plan.md` — 展后反思与未来工作建议（不再是新原型；识别剩余开放问题）

---

## Showcase 展示叙事

展示应完整讲述设计过程故事：

1. **出发点**：Globe-first 原型；视觉参与度高；无经验证的问题定义。
2. **重新定义（Week 9）**：A01 tutor 反馈识别了 solution-first 问题、用户未定义、证据链薄弱。团队回到问题定义。
3. **低保真验证**：三张指标卡片 + 10 次 pilot 揭示误读模式、偏好-理解背离和因果过度推断。
4. **中保真迭代**：4 屏顺序引导仪表盘；解决了语义问题，但引入了入门跳过、引用衰减和流程摩擦。
5. **高保真迭代**：渐进画布；每项设计变更都直接可追溯到特定的中保真失效模式。
6. **已知局限**：低保真为模拟数据；中保真和高保真样本量小；范围限于英国-澳大利亚；用户群已收窄但仍存在异质性。
7. **设计论证**：原型测试的是研究主张，不是产品主张。主张是：情境内嵌于比较界面的引导式解释支撑，比无支撑探索产生更准确、边界更清晰的推理。

## 反思陈述

本轮迭代回应了两轮验证积累的证据。低保真轮揭示了用户在没有支撑时无法理解什么。中保真轮揭示了独立屏上的支撑无法保护跳过它的用户。高保真轮测试的是：将支撑内嵌于工具本身——在每个使用时刻都存在，而不仅在指定的"教学时刻"——是否能产生持久的解读改善。设计论证不是界面使用户成为专家，而是界面让正确的解释框架在每个接触点都可获得，使参与其中的用户较少有机会构建错误的框架。

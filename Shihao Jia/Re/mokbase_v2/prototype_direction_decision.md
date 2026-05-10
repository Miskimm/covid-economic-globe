# Prototype Direction Decision — After Mid-fi Validation

## Decision

Move forward with a **hi-fi progressive guided dashboard** for the Team Collaboration Showcase.

> Retire the 4-screen sequential gated flow.  
> Consolidate into a single progressive canvas with contextual layers.  
> Embed domain anchoring and interpretation scaffolding within the comparison interface rather than as a prerequisite flow.

---

## What the Mid-fi Prototype Was

The mid-fi prototype (`mid-fi/interview-en.html`, results: `mid-fi/result.md`) built four discrete screens:

1. Metric Primer (prerequisite, gated entry)
2. Guided Country Comparison (UK vs Australia, 2020 vs 2023)
3. Interpretation Builder (observed pattern / evidence used / what this does not prove)
4. Trust and Source Panel (source names, formulas, update date, limitations)

This structure was derived from the v1 direction decision (merge Option A dashboard and Option B narrative flow). It addressed the low-fi findings but introduced new problems through its sequential architecture.

---

## What the Mid-fi Testing Revealed About the Flow Architecture

### Problem 1: Gated primer creates compliance theatre, not comprehension

S03, S06, and S07 all dismissed the primer in < 15 s and went straight to Screen 2. S03 produced a health-domain misread on the recovery indicator. S07 remained uncertain about whether it was health or economic. S06 confused "trough" with baseline. All five participants who spent ≥30 s on the primer (S01, S02, S04, S05, S08) correctly identified the economic domain. A prerequisite screen that can be dismissed with one click is not an effective anchoring mechanism.

The insight is not that the primer content was wrong — it worked for users who read it. The insight is that a separate screen creates a "get past this" interaction frame rather than a "this matters to what I do next" integration frame.

### Problem 2: Sequential screens created friction for partial-knowledge users

S07 and S08 both named the screen-switching flow as friction in their improvement suggestions. S07 said "four screens are a lot — could it be one page?" S08 said "awkward to switch between Screen 2 and Screen 3." S06 simply clicked past Screen 1 to Screen 2 without reading. Economics/policy students (S01, S02, S04, S05) did not complain about the flow, but they were the group least in need of the primer — the forced sequence over-managed the users who needed it least.

Users without economics background (design/communication students) were the intended beneficiaries of the primer, but two of three in this group still dismissed it too quickly. The sequential structure did not protect against this.

### Problem 3: Open-ended interpretation fields did not sustain citation behaviour

S08 cited −12.0 pp and −3.7 pp precisely in Task 2 but wrote "a more significant economic shock" (no values) in Task 3 Field A and "the GDP gap was much worse" (no values) in Field B. S06 and S07 did not cite specific values in either task. The sentence-starter template in the tool (shown as greyed placeholder text) was not sufficient — users treated it as an example to replace with their own phrasing, not as a structure to fill in. A structural prompt is needed throughout.

---

## Why Not Continue the 4-Screen Sequential Flow

The sequential flow solved the problem of ensuring users encountered primer content in order. But it traded one problem (primer encounter) for three new ones: compliance theatre, flow friction, and citation decay.

The mid-fi evidence shows that what users need is not sequential compliance. They need:

- **Persistent domain context** — the domain badge must remain visible throughout comparison, not only on the primer screen.
- **Contextual disambiguation** — "what this is NOT" information must be accessible when the user is looking at the indicator in context, not only when they first encounter its label on a different screen.
- **Scaffolded output** — citation structure must be present in every field where reasoning is expected, not only in the structured task moment.

None of these require sequential screens. All of them can be embedded in a single progressive canvas.

---

## Why a Progressive Guided Canvas

### Architecture

A single main canvas presents the country comparison immediately. Interpretation scaffolding, domain anchoring, boundary checking, and trust transparency are delivered progressively as the user interacts with the comparison — not as prerequisite steps.

### Advantages Over Sequential Screens

| Sequential 4-screen flow | Progressive canvas |
| --- | --- |
| User must pass through primer before reaching data | User sees data immediately; primer content surfaces on first interaction |
| Primer can be dismissed in one click with no consequence | Domain badge always visible; indicator definition activates on tap |
| Citation behaviour set in one task, decays in the next | Sentence-starter template present in every interpretation field |
| Trust score accessible after completing all screens | Trust score gated behind source awareness micro-task regardless of navigation path |
| 4 discrete transitions, perceived as "steps to complete" | One canvas, perceived as "tool to use" |

### Risks of Progressive Canvas

- Users may never expand the definition chips even though they are available. Mitigation: auto-expand on first encounter with each indicator.
- Without a forced sequence, users may complete the comparison and trust score without engaging the interpretation field. Mitigation: interpretation field is required (not optional) before the trust score input is revealed.
- Visual density on a single canvas may be higher than on individual screens. Mitigation: use progressive disclosure to keep the initial state minimal; reveal additional layers only as the user progresses through the comparison task.

---

## Proposed Showcase Prototype Structure

### Canvas Layer 1 — Comparison Panel (visible immediately)

- UK vs Australia side-by-side
- 2020 vs 2023 time points
- COVID indicators and economic indicators visually separated with domain badges
- Evidence chips on key values (pre-highlighted on load)
- Persistent glossary sidebar (collapsible)

### Canvas Layer 2 — Indicator Context (activates on first interaction with each metric)

- Expandable definition chip: plain-language definition + "what this is NOT" line
- Worked numerical example embedded in chip
- Domain badge remains visible after chip is dismissed

### Canvas Layer 3 — Interpretation Builder (appears after user selects a country or metric to focus on)

- Sentence-starter template: "The data shows that [country] had a [value] [metric] in [year], compared to [value] for [country]. This pattern suggests [observation], but does not prove [causal claim] because [limitation]."
- User completes the template; fields validated for minimum content before proceeding

### Canvas Layer 4 — Boundary Self-Check (appears after interpretation field is completed)

- User reads their own interpretation text
- "Does your interpretation imply direct causation? Yes / No / Unsure"
- If yes or unsure: guided revision prompt
- Confidence score (1–5) collected here

### Canvas Layer 5 — Source and Trust (appears after boundary check)

- Source awareness micro-task: "Name one limitation of this dataset" (minimum engagement required)
- Source names, snapshot date, formulas, missing-data note — all accessible but not forced
- Trust score (1–5) collected here
- Preference score (1–5) collected last

---

## Decision Type

**Architectural consolidation with mechanism upgrades.**

- Retire gated sequential screens.
- Consolidate into progressive canvas.
- Upgrade primer from gated screen to embedded persistent anchoring.
- Upgrade boundary check from multiple-choice selection to constructed-response self-evaluation.
- Add source awareness micro-task as trust-score gate.
- Retain all four interpretive functions (metric understanding, evidence comparison, boundary checking, trust calibration) within the single canvas.

---

## What to Retire

- The Metric Primer as a mandatory prerequisite screen.
- Multiple-choice boundary selection task.
- Blank open-ended interpretation fields without sentence structure.
- Trust score input available without source engagement.
- Screen-by-screen navigation model.

## What to Keep

- Domain badges (`ECONOMIC` / `HEALTH`) on every indicator label — now persistent throughout.
- Evidence chips highlighting key comparison values.
- "What this is NOT" disambiguation — now embedded in indicator chips.
- Source name, snapshot date, formula, limitation notes — now in persistent sidebar panel.
- Confidence and trust scoring — now sequenced after interpretation and source tasks.
- Preference score collected last, separated from comprehension tasks.

## What to Add

- Sentence-starter templates in interpretation fields.
- Constructed-response boundary self-check with guided revision.
- Source awareness micro-task gating the trust score.
- Persistent glossary panel (`pp`, `baseline`, `trough`, `correlation`, `causation`).
- Auto-expand behaviour on first encounter with each metric.

---

## Design Rationale Statement

The mid-fi testing showed that the four-screen sequential structure achieved compliance but not comprehension. Users reached the end of the flow without necessarily internalising the principles the flow was designed to teach. The progressive canvas architecture accepts that users will navigate non-linearly and embeds the interpretive scaffolding into every layer of the canvas itself — so the scaffolding is present regardless of the order in which the user engages with the interface. The goal shifts from ensuring users see the right content in the right order to ensuring that every interaction with the comparison panel surfaces the contextual support the user needs at that moment.

---

# 中文译本：原型方向决策 — 中保真验证后

## 决策

推进**高保真渐进式引导仪表盘**，用于 Team Collaboration Showcase。

> 退役 4 屏顺序门控流程。  
> 整合为单一渐进画布，含情境覆盖层。  
> 将领域锚定和解释支撑嵌入比较界面，而不是作为前置流程。

---

## 中保真流程架构揭示的问题

### 问题 1：门控入门制造合规表演，不产生理解

快速关闭指标入门的用户（3/8）表现出与低保真用户相同的误读。内容有效，交付机制无效。独立入门屏产生"跳过这个"的交互框架，而不是"这与我接下来要做的事有关"的整合框架。

### 问题 2：顺序屏幕对部分知识用户产生摩擦

有经济背景的用户（经济/政策学生）感到强制入门屈尊俯就。无经济背景的用户仍然快速跳过入门。顺序结构既未服务好高知识用户，也未有效保护低知识用户。

### 问题 3：开放字段未能延续证据引用行为

在 Screen 2 结构化任务中引用了数值的用户，在 Screen 3 空白字段中回退到印象式语言。空白字段未保留证据引用框架。

---

## 渐进式画布架构

### 画布层 1 — 比较面板（立即可见）

英国 vs 澳大利亚并排，2020 vs 2023，COVID 指标与经济指标视觉分离含领域标签，证据标签预先高亮，持久术语侧边栏。

### 画布层 2 — 指标情境（首次与每个指标交互时激活）

可展开定义标签（通俗定义 + "不代表什么"行 + 数值示例），领域标签在关闭后持续可见。

### 画布层 3 — 解释构建器（用户选择比较焦点后出现）

句子起头模板，要求完成引用结构，最低内容验证后方可继续。

### 画布层 4 — 边界自检（解释字段完成后出现）

用户阅读自己的解释文本，自评是否暗示直接因果，若是则触发引导修改，收集自信评分。

### 画布层 5 — 来源与信任（边界检查后出现）

来源意识微任务（最低参与要求），来源名称/快照日期/公式/限制说明，信任评分，最后偏好评分。

---

## 设计理由陈述

中保真测试表明，四屏顺序结构实现了合规但未实现理解。渐进画布架构接受用户会以非线性方式导航，并将解释支撑嵌入画布的每一层——无论用户以何种顺序与界面交互，支撑都会在该时刻呈现。目标从"确保用户按正确顺序看到正确内容"转变为"确保用户与比较面板的每次交互都能浮现当时所需的情境支持"。

# Prototype Direction Decision After Hi-fi

> Stage: `research_problem_plan_checklist.md` Step 8 — Iteration 3 (Final)  
> Written: 2026-05-14  
> Decision type: **Showcase finalisation and post-project reflection**  
> Prior decision: `mokbase_v2/prototype_direction_decision.md`

---

## 1. Decision Context

The hi-fi progressive guided canvas has passed all seven showcase readiness criteria defined in `mokbase_v2/next_iteration_plan.md`. This document makes the final prototype direction decision for the DECO7180 Week 13 showcase and records the design reasoning for post-project reflection.

The decision is not between alternative directions — as in previous rounds. The hi-fi findings converge on a single decision:

**The progressive guided canvas architecture is confirmed as the final direction. Three targeted adjustments are recommended before showcase. No structural redesign is warranted.**

---

## 2. The Final Architecture — Confirmed Components

### Component 1 — Persistent Domain Badges (CONFIRMED, retain unchanged)

**What it is**: `ECONOMIC` and `HEALTH` colour-coded badges embedded in each indicator label row, always visible from Layer 1. Present before any chip or definition is opened.

**Why confirmed**: S03 and S06 each opened only one chip before interpreting, yet correctly identified both indicators' economic domain — attributing it explicitly to the badge. Health misreads dropped from 3/10 (low-fi) to 1/8 (mid-fi) to 0/6 (hi-fi) as the badge was progressively embedded more permanently.

**Design principle captured**: Domain anchoring must be ambient, not triggered. A dismissable primer screen (mid-fi) fails because it can be skipped. A badge embedded in the data display cannot be skipped because it is part of what the user reads to understand the data.

---

### Component 2 — Expandable Indicator Definition Chips (CONFIRMED, retain unchanged)

**What it is**: `?` icon on each indicator label. On first click: auto-expands with plain-language definition, worked example, "Does NOT mean" line.

**Why confirmed**: Chips provided additional depth for users who wanted it. S01, S02, S04, S05 opened multiple chips and found them useful. S03 and S06 opened only one but domain context was already provided by the badge. The chip is a supplement, not the primary domain-anchoring mechanism.

**Design principle captured**: Depth on demand: not every user needs the same level of detail. The badge provides the minimum; the chip provides the full definition for those who seek it.

---

### Component 3 — Interpretation Builder with Sentence-Starter Template and JS Validation (CONFIRMED, with adjustment)

**What it is**: Layer 3 interpretation field, initially containing a sentence-starter scaffold. JS validates that the submitted text contains at least one numerical value before allowing submission.

**Why confirmed**: 6/6 interpretation submissions contained numerical values. The structural citation scaffold worked.

**Adjustment**: Change pre-filled editable text to italic placeholder text (HTML placeholder behaviour: shown when field is empty, disappears on typing). JS validation unchanged. This addresses S05's preference concern ("slightly stilted") while retaining citation enforcement for users who need the scaffold.

**Design principle captured**: Scaffolding should offer a floor, not a ceiling. Citation must be enforced structurally; the experience of writing should remain authorial.

---

### Component 4 — Boundary Self-Check: Write → Evaluate → Revise (CONFIRMED, with navigation adjustment)

**What it is**: Layer 4. User writes a claim about what the data shows → selects Yes/No/Unsure → if Yes/Unsure: revision prompt and hint text → confidence score.

**Why confirmed**: 5/6 non-causal language in open follow-up (vs 4/8 in mid-fi multiple-choice). Constructed-response produces better internalisation than recognition.

**Adjustment**: After the self-check, add an "Edit interpretation" link that collapses layers 4 and 5, re-expands layer 3 with the saved text pre-populated, and allows re-submission. This is a selective back-navigation path — three independent participants (S01, S02, S04) requested it. The forward flow remains the default; back-navigation is a secondary path.

**Design principle captured**: Reflection should be able to modify action. If a boundary self-check reveals a weakness in an interpretation, the user should be able to act on that reflection within the same session.

---

### Component 5 — Source Awareness Micro-Task with Trust Gate (CONFIRMED, with scaffold addition)

**What it is**: Layer 5. Trust score input physically disabled until ≥8 chars entered in limitation field. On unlock: trust score, expandable formula/source detail, preference score.

**Why confirmed**: 6/6 entered limitation text before trust score. 0/6 submitted trust ≥4 without any source engagement. 80% of trust ≥4 users referenced limitation in trust reasoning.

**Adjustment**: Add a scaffold prompt below the limitation field: "Why does this limitation matter when interpreting the UK vs Australia comparison?" This prompt is not enforced — it is a direction, not a second gate. It addresses S03 and S06's minimum-compliance pattern ("the data might have errors", "data lag") without adding friction for engaged users like S05.

**Design principle captured**: Trust calibration requires directed engagement, not just compliance. The gate prevents zero-engagement; the scaffold prompt promotes reflective engagement.

---

## 3. What Is Not Changing — Structural Decisions

### Not changing: Progressive canvas (single canvas, sequential layer reveal)

Mid-fi S07 and S08 complained about the 4-screen sequential flow ("too many screens"). No hi-fi participant complained about the canvas architecture. Three participants wanted to edit their interpretation (addressed by Component 4 adjustment), but none requested a return to separate screens. The progressive canvas architecture is confirmed and retained.

### Not changing: Layer reveal sequence

The sequence — Comparison Panel → Definition Chips → Interpretation Builder → Boundary Self-Check → Source and Trust — is preserved. This sequence is the core research argument: users should understand what they are comparing (Layer 1), learn what it means (Layer 2), form an interpretation (Layer 3), evaluate its validity (Layer 4), and assess its credibility (Layer 5). Changing the sequence would undermine the pedagogical design rationale.

### Not changing: JS numerical validation

The JS check on interpretation submission is retained with identical logic. The sentence-starter changes from pre-filled to placeholder — this does not affect the validation, which fires on submission regardless of whether the user used the scaffold text.

### Not changing: Trust button physical gate (≥8 char threshold)

The trust gate threshold is retained. The scaffold prompt is additive — it does not change the threshold or the button-disable logic.

---

## 4. Options Considered and Rejected

### Option A — Raise trust gate threshold (≥50 chars)

**Rationale considered**: S03 (9 chars) and S06 (8 chars) entered minimum text. Raising the threshold would force more text.

**Rejected because**: A character count threshold cannot distinguish quality engagement from padding. A user can type 50 chars of irrelevant text. The scaffold prompt addresses the root cause — lack of direction — more effectively than a higher character count.

### Option B — Add a fourth research form question requiring citation

**Rationale considered**: S03 and S06 used impression language in form 3a. A forced-citation form question would ensure 6/6 citation in the form as well as the prototype.

**Rejected because**: The research form is a data-collection instrument, not a teaching instrument. Adding a citation requirement to the form would conflate the research measurement with the design intervention. The form should measure natural behaviour, not prescribed behaviour. The prototype interpretation field already enforces citation.

### Option C — Return to separate screens with a tab navigation (as in mid-fi)

**Rationale considered**: Three participants wanted to revise their interpretation after the boundary check. Separate screens would allow revisiting.

**Rejected because**: The mid-fi tab navigation introduced friction (S07, S08 complaints; S03 confusion about which screen to return to). The selective "Edit interpretation" link (Component 4 adjustment) addresses the revision request without reinstating full screen complexity.

---

## 5. Final Prototype Specification (for Showcase)

The following describes the target state of `hi-fi/interview-en.html` after the three adjustments. The current file (as of 2026-05-14) implements the confirmed architecture; the three adjustments below are the remaining edits.

| Feature | Current state | Target state for showcase |
| --- | --- | --- |
| Domain badges | ✓ present | ✓ no change |
| Definition chips | ✓ present | ✓ no change |
| Interpretation template | Pre-filled editable text | Italic HTML placeholder text; JS validation unchanged |
| Layer 3 → 4 navigation | One-way forward | Forward by default; "Edit interpretation" link available after Layer 4 |
| Trust gate | ≥8 chars, no prompt | ≥8 chars + scaffold prompt: "Why does this limitation matter?" |
| Trust button disable | ✓ present | ✓ no change |
| Responsive layout | Fixed at 1400px max | ✓ no change |

---

## 6. Design Argument — Final Statement

Across three iterations, the research question has been:

**Can a web-based data visualisation support non-expert users in forming valid, evidence-based, boundary-aware interpretations of economic indicators in the context of COVID-19?**

The hi-fi evidence supports the following design argument:

> A visualisation tool can support non-expert users in forming valid interpretations if and only if three conditions are met simultaneously:
> 1. **Domain context is ambient, not triggered.** Badges embedded in the data display prevent misread regardless of whether users engage with supplementary definitions.
> 2. **Citation is structurally enforced, not expected.** A sentence-starter template with JS numerical validation produces citation in 100% of submissions; expectation without enforcement does not.
> 3. **Boundary awareness is constructed, not recognised.** A write-and-self-evaluate task produces genuine internalisation; a recognition multiple-choice task produces correct answers that are not retained.

The trust gate adds a fourth condition — that source engagement precedes trust scoring — which addresses a real and consistent failure mode but whose impact on calibration quality depends on a scaffold prompt directing users toward substantive engagement.

These four conditions are the design contribution of the project.

---

# 中文翻译（附在原文后）

# 高保真之后的原型方向决策

> 阶段：`research_problem_plan_checklist.md` 第 8 步 —— 迭代 3（终轮）  
> 撰写：2026-05-14  
> 决策类型：**展示定稿与项目后反思**  
> 上一轮决策：`mokbase_v2/prototype_direction_decision.md`

---

## 1. 决策背景

高保真渐进引导画布已通过 `mokbase_v2/next_iteration_plan.md` 中定义的全部七项展示就绪标准。本文对 DECO7180 Week 13 展示作出最终原型方向决策，并记录供项目后反思用的设计推理。

本轮决策不像前几轮在备选方向间取舍；高保真结论收敛为单一决策：

**渐进引导画布架构确认为最终方向。展示前建议三项针对性调整。无需结构性重设计。**

---

## 2. 最终架构 —— 已确认组件

### 组件 1 —— 持久领域标签（已确认，保持不变）

**是什么**：嵌在每个指标标签行中的 `ECONOMIC` / `HEALTH` 色标，自第 1 层起始终可见。任何芯片或定义展开前即已存在。

**为何确认**：S03、S06 在解释前各只打开一个芯片，却仍能正确识别两指标均为经济域 —— 并明确归因于标签。健康误读从低保真 3/10、中保真 1/8，降至高保真 0/6，随标签嵌入愈加固定。

**所体现原则**：域锚定须是环境性的，而非触发式的。可关掉的入门屏（中保真）会因被跳过而失效；嵌入数据展示的标签无法跳过，因为它是理解数据时阅读内容的一部分。

---

### 组件 2 —— 可展开指标定义芯片（已确认，保持不变）

**是什么**：每个指标标签上的 `?` 图标。首次点击：自动展开通俗定义、示例、「不代表」一行说明。

**为何确认**：芯片为需要深度的用户提供补充。S01、S02、S04、S05 多次打开并认为有用。S03、S06 各只开一个，但域语境已由标签提供。芯片是补充，而非主要域锚定手段。

**所体现原则**：按需深入：并非人人需要同等细节。标签给底线；芯片给主动查阅者的完整定义。

---

### 组件 3 —— 句首模板 + JS 校验的解释构建器（已确认，微调呈现）

**是什么**：第 3 层解释栏，原含句首脚手架；JS 校验提交文本须至少含一个数值。

**为何确认**：6/6 提交均含数值，结构性引用脚手架有效。

**调整**：将可编辑预填改为斜体占位符（HTML placeholder：空时显示，输入即消失）。JS 不变。在保留需脚手架者的强制引用的同时，回应 S05 对偏好与「略生硬」的担忧。

**所体现原则**：脚手架应提供地板而非天花板。引用须结构强制；写作体验仍应保持作者感。

---

### 组件 4 —— 边界自检：写 → 评 → 改（已确认，增加导航调整）

**是什么**：第 4 层。用户就数据写出论断 → 选是/否/不确定 → 若为是/不确定：修改提示与提示文案 → 信心分。

**为何确认**：开放追问中 5/6 使用非因果表述（中保真选择题为 4/8）。建构式优于识别式。

**调整**：自检后增加「编辑解释」链接：折叠第 4、5 层，重新展开第 3 层并回填已保存文本，允许再次提交。此为选择性返回路径 —— S01、S02、S04 三人独立提出。默认仍为向前流；返回为次要路径。

**所体现原则**：反思应能改变行动。若自检暴露解释弱点，用户应能在同一会话内据此行动。

---

### 组件 5 —— 来源意识微任务 + 信任门控（已确认，增加脚手架）

**是什么**：第 5 层。限制栏未满 ≥8 字则信任输入不可用。解锁后：信任分、可展开的公式/来源详情、偏好分。

**为何确认**：6/6 在信任分前完成限制说明。0/6 在未接触来源的情况下提交信任 ≥4。信任 ≥4 者中 80% 在理由中引用限制。

**调整**：限制栏下增加脚手架：「在解读英国与澳大利亚对比时，这一限制为何重要？」不强制 —— 是方向而非第二道门。针对 S03、S06 的最低合规（「数据可能有误」「数据滞后」），又不给 S05 等深度参与者增加明显摩擦。

**所体现原则**：信任校准需要引导性参与，而非仅合规。门控防零参与；脚手架促反思性参与。

---

## 3. 不变项 —— 结构性决策

### 不变：渐进画布（单画布、顺序展开层）

中保真 S07、S08 抱怨四屏顺序流「屏太多」。高保真无人抱怨画布架构。三人想改解释（由组件 4 调整解决），但无人要求回到分屏。渐进画布确认保留。

### 不变：层展开顺序

顺序 —— 对比面板 → 定义芯片 → 解释构建器 → 边界自检 → 来源与信任 —— 保持不变。此即核心研究论证：先理解比较对象（1）、再懂含义（2）、再形成解释（3）、再检验有效性（4）、再评估可信度（5）。改序会削弱教学设计依据。

### 不变：JS 数值校验

解释提交时的 JS 逻辑不变。句首由预填改为占位不影响提交时是否含数字的校验。

### 不变：信任按钮实体门控（≥8 字）

阈值与禁用逻辑不变。脚手架为增量，不改变门槛。

---

## 4. 曾考虑但否决的选项

### 选项 A —— 提高信任门控阈值（如 ≥50 字）

**曾考虑理由**：S03（9 字）、S06（8 字）为最低字数。提高可逼出更长文本。

**否决原因**：字数无法区分质量参与与凑字。用户可打 50 字无关内容。脚手架针对根因（缺方向）比加字数更有效。

### 选项 B —— 问卷增加第四题强制引用

**曾考虑理由**：S03、S06 在表单 3a 用印象式语言。强制引用题可让表单也达 6/6 引用。

**否决原因**：研究表单是数据采集工具，非教学工具。在表单强加引用会把研究测量与设计干预混为一谈。表单应测自然行为，非规定行为。原型解释栏已强制引用。

### 选项 C —— 回到中保真式分屏 + 标签导航

**曾考虑理由**：三人希望在边界检查后改解释，分屏可回看。

**否决原因**：中保真标签导航带来摩擦（S07、S08；S03 不知回到哪一屏）。选择性「编辑解释」链接（组件 4）可在不恢复全部分屏复杂度的情况下满足修改需求。

---

## 5. 展示用最终原型规格

下列为三项调整完成后 `hi-fi/interview-en.html` 的目标状态。截至 2026-05-14 的当前文件已实现确认架构；以下三项为剩余编辑。

| 功能 | 当前状态 | 展示目标状态 |
| --- | --- | --- |
| 领域标签 | ✓ 已有 | ✓ 不变 |
| 定义芯片 | ✓ 已有 | ✓ 不变 |
| 解释模板 | 预填可编辑 | 斜体 HTML 占位；JS 不变 |
| 第 3→4 层导航 | 仅向前 | 默认向前；第 4 层后可「编辑解释」 |
| 信任门控 | ≥8 字、无提示 | ≥8 字 + 「这一限制为何重要？」脚手架 |
| 信任按钮禁用 | ✓ 已有 | ✓ 不变 |
| 响应式 | 最大宽 1400px 固定 | ✓ 不变 |

---

## 6. 设计论点 —— 最终陈述

三轮迭代中的研究问题是：

**网页数据可视化能否支持非专业用户在新冠背景下，对经济指标形成有效、有据、且具备边界意识的理解？**

高保真证据支持如下设计论点：

> 可视化工具若能同时满足以下三个条件，即可支持非专业用户形成有效理解：
> 1. **域语境是环境性的，而非触发式的。** 嵌入展示的标签订可防误读，无论用户是否展开补充定义。
> 2. **引用是结构强制的，而非仅靠期待。** 句首模板 + JS 数值校验使提交 100% 含引用；无强制的期待做不到。
> 3. **边界意识是建构出来的，而非识别出来的。** 写—自评任务带来真内化；识别式选择题可选对却不保留。

信任门控增加第四条件 —— 信任打分前须接触来源 —— 针对真实且反复出现的失效模式；但其对校准质量的影响，仍依赖脚手架把用户引向实质性参与。

上述四条件即本项目的设计贡献。

# Next Iteration Plan After Hi-fi (Final Showcase Preparation)

> Stage: `research_problem_plan_checklist.md` Step 8 — Iteration 3 (Final)  
> Written: 2026-05-14  
> Status: **Showcase-ready — three minor adjustments before Week 13**  
> Prior plan: `mokbase_v2/next_iteration_plan.md`

---

## 1. Where We Are

| Iteration | Tool | n | Core failing | Addressed in next round |
| --- | --- | --- | --- | --- |
| Low-fi | `low-fi wireframe/interview-en.html` | 10 | Health misread of "Economic recovery"; preference ≠ understanding | Mid-fi: inline domain badges, primer screen |
| Mid-fi | `mid-fi/interview-en.html` | 8 | Primer dismissal; trust without source engagement; multiple-choice boundary doesn't internalise | Hi-fi: progressive canvas, persistent badge, trust gate, constructed-response |
| **Hi-fi** | `hi-fi/interview-en.html` | 6 | Trust gate minimum compliance; no back-navigation for interpretation revision; template constrains authorship | **Showcase adjustments (3 items)** |

All H1–H8 hypotheses are now resolved. The design argument is supported by evidence from three rounds. The next step is not another research iteration — it is showcase preparation and post-project reflection.

---

## 2. Showcase Adjustments (Before Week 13)

Three adjustments are needed to bring the current `hi-fi/interview-en.html` to showcase readiness. None are structural redesigns.

### Adjustment 1 — Reframe interpretation template as italic placeholder text

**File**: `hi-fi/interview-en.html`  
**Change**: In Layer 3, the interpretation `<textarea>` currently has pre-filled editable content. Change it to an HTML placeholder attribute with the same text, displayed in italic. The field starts empty. JS validation unchanged — submission still requires a numerical value.

**Why**: S05 (public policy postgrad) gave preference 3/5 specifically because the template "anchored me" and produced "slightly stilted" writing. Three other participants (S01, S02, S04) did not complain but also wrote closely within the template structure. Making the template a placeholder preserves the scaffold for users who need it while allowing fluent writers to write naturally.

**Expected outcome**: Preference scores for experienced users increase by ~0.5–1 point. Citation rate in prototype field unchanged (JS enforced regardless of placeholder vs pre-fill).

---

### Adjustment 2 — Add "Edit interpretation" selective back-navigation

**File**: `hi-fi/interview-en.html`  
**Change**: After the boundary self-check (Layer 4) completes, add an "Edit interpretation" link below the boundary conclusion. When clicked:
1. Layers 4 and 5 collapse (hide).
2. Layer 3 re-expands with the saved interpretation text pre-populated in the field.
3. User can edit and re-submit.
4. On re-submit, Layers 4 and 5 reappear and the user repeats the self-check.

The "Edit interpretation" link is visible only after Layer 4 completion — it is not available before the boundary self-check is done. This preserves the intended sequence while allowing reflection-driven revision.

**Why**: S01, S02, and S04 independently requested this. The request pattern across three different participant backgrounds (ECON postgrad, POLS undergrad, COMM postgrad) constitutes a reliable signal. The mid-fi multi-screen format allowed revisiting screens; the hi-fi canvas removed that flexibility as a side effect of removing screen complexity.

**Expected outcome**: 3/6 participants who flagged this as friction would not flag it in a follow-up session. Back-navigation enables the reflection loop the boundary self-check is designed to promote.

---

### Adjustment 3 — Add scaffold prompt to trust gate limitation field

**File**: `hi-fi/interview-en.html`  
**Change**: Below the limitation text input (Layer 5), add a scaffold label or helper text:  
*"Why does this limitation matter when interpreting the UK vs Australia comparison?"*

The text is non-enforced — it is guidance, not a second gate. The ≥8 char threshold and trust button disable logic remain unchanged.

**Why**: S03 entered "the data might have errors" and S06 entered "data lag" — both passed the gate without genuine reasoning. Their trust score reasoning did not reference the limitation text, indicating mechanical compliance. The scaffold prompt provides a direction for engagement that the character-count threshold cannot.

**Expected outcome**: S03/S06-type participants write more specific limitation text ("Why does X matter?" forces them to connect the limitation to the comparison at hand). S05-type participants write even richer text. Trust score reasoning references limitation content in a higher proportion of cases.

---

## 3. Showcase Readiness Checklist

### Confirmed: all seven pass criteria met in hi-fi testing

| Criterion | Target | Hi-fi result | Status |
| --- | --- | --- | --- |
| GDP explanation correct (economic domain, pp unit) | ≥ 70% | 6/6 (100%) | ✓ PASS |
| Recovery explanation correct (economic domain, not health) | ≥ 70% | 6/6 (100%) | ✓ PASS |
| Interpretation field contains cited numerical value | ≥ 70% | 6/6 (100%) JS | ✓ PASS |
| Non-causal language in open follow-up (3a) | ≥ 65% | 5/6 (83%) | ✓ PASS |
| Limitation text entered before trust score | ≥ 65% | 6/6 (100%) | ✓ PASS |
| Trust ≥4 with limitation referenced in reasoning | ≥ 80% | 4/5 (80%) | ✓ PASS |
| Severe preference-correctness mismatch | < 20% | 0/6 (0%) | ✓ PASS |

### Remaining pre-showcase tasks

- [ ] Adjust 1: Change interpretation `<textarea>` from pre-filled to placeholder text (30 min)
- [ ] Adjust 2: Add "Edit interpretation" link and back-navigation JS logic (45 min)
- [ ] Adjust 3: Add scaffold prompt to limitation field in Layer 5 (10 min)
- [ ] Smoke test all three adjustments: run through all 5 layers, confirm JS validation still triggers, confirm back-navigation collapses/re-expands correctly
- [ ] Verify responsive layout at 1280px and 1400px (already tested; confirm after adjustments)
- [ ] Write showcase talking points (see Section 5)

---

## 4. If This Were Continued Beyond DECO7180

If this project were taken beyond the course showcase, the following steps would be appropriate:

### Phase 4a — Real participant validation (n=15–20)

**Purpose**: Confirm H5 (domain badge finding) and H7 (boundary internalisation) at a statistically meaningful sample size.  
**Participant profile**: Non-expert adults (students, journalists, policy advocates). Priority: participants without economics background, consistent with refined user definition.  
**Focus hypotheses**: H5 (domain badge without chip), H7 (open-question non-causal language rate), H8 (trust limitation text quality vs reasoning quality).  
**Method**: Task-based sessions, think-aloud, post-session interview about boundary reasoning and trust rationale.

### Phase 4b — Trust gate scaffold prompt effect study

**Purpose**: Compare limitation text quality and trust reasoning quality with vs without the "Why does this matter?" prompt.  
**Method**: A/B within-participants study. Version A: current gate (≥8 chars, no prompt). Version B: gate + scaffold prompt. Compare: text specificity (coded), trust reasoning referencing limitation (binary), post-session recall of named limitation.

### Phase 4c — Showcase-to-exploration mode transition

**Purpose**: Determine whether the progressive canvas works in an open-exploration mode (no task instruction, self-directed navigation) without losing its domain-anchoring and citation properties.  
**Method**: Free exploration session. Observe whether users still open chips, still include numerical values in any interpretation they write voluntarily, still select "No" on boundary check.

### Phase 4d — Citation transfer study

**Purpose**: Address the most persistent finding across all three iterations: citation in the prototype field does not transfer to adjacent research form open questions.  
**Method**: Compare three conditions — (1) prototype only, no form; (2) prototype + standard open form; (3) prototype + form with sentence-starter scaffold on each question. Measure citation rate in each form condition. Determine whether the citation transfer gap is a template boundary effect or a cognitive load effect.

---

## 5. Showcase Talking Points

### For the design question: "Why did you use a progressive canvas instead of separate screens?"

> In our mid-fidelity round (n=8), we found that users navigated away from dedicated primer screens in under 15 seconds, losing all domain context before reaching the data. Three participants misread the primer, then moved to the dashboard and still made domain errors. A primer screen's problem is that it can be dismissed. We moved to a progressive canvas where domain badges are embedded in the data display itself — they can't be dismissed because they're part of what you're reading. The hi-fi data confirmed this: zero health misreads from six participants, including two who opened only one definition chip.

### For the design question: "Why does the trust score require entering a limitation first?"

> In mid-fi, two participants gave trust scores of 5/5 without opening the source panel. When we asked why, one said it was because "the visualisation looks professional." Our design goal is calibrated trust — trust based on understanding of what the data can and cannot show, not on visual polish. We added a physical gate: the trust button is disabled until the user has written something about a limitation they've identified. In hi-fi, this produced 100% source-engagement before trust scoring. The remaining challenge is that two participants entered minimum text to unlock the button — we're adding a scaffold prompt to address this.

### For the design question: "How do you know users actually understand the boundary between correlation and causation?"

> We tried multiple-choice first in mid-fi: "Does this data prove a causal link? Yes/No/Cannot determine." Seven of eight selected the correct option. But when we asked them to write their own explanation in an open question, three reverted to causal language: "COVID caused the economic decline." Selecting a correct option is recognition; it doesn't mean the concept is internalised. In hi-fi, we replaced the multiple-choice with a constructed-response task: write your own claim, evaluate it Yes/No/Unsure, revise if needed. Five of six used non-causal language in the open follow-up — the revision prompt converted S03's initial causal framing into an explicit acknowledgement of other factors.

---

## 6. Post-Project Reflection — Design Principles Derived

This project is the source of four design principles that extend beyond this specific tool:

### Principle 1 — Domain anchoring must be ambient, not triggered
If a user must take an action (click, open, navigate) to receive domain context, that action becomes optional. Domain-critical labels must be embedded in the data display, always visible, not in a separate space a user can choose to skip.

### Principle 2 — Citation must be structurally enforced, not behaviourally expected
Users consistently form impressionistic conclusions when given unconstrained text fields. A sentence-starter template with numerical validation does not rely on user intention — it makes non-citation difficult. Design for the realistic user, not the ideal user.

### Principle 3 — Boundary awareness requires articulation, not recognition
A user who selects "correlation is not causation" from a list may not be able to articulate why in their own words. Constructed-response tasks — write your claim, evaluate it, revise it — produce genuine internalisation at a rate recognition tasks cannot match. Where the goal is transfer (the user should apply the concept in an unscaffolded context), constructed response is the appropriate mechanism.

### Principle 4 — Trust calibration requires directed engagement, not gated quantity
A character-count gate on a limitation field prevents zero-engagement trust scoring but does not distinguish genuine reasoning from padding. A directional scaffold prompt — "Why does this limitation matter?" — provides the missing direction without adding another gate. Calibration is a quality problem, not a quantity problem.

---

# 中文翻译（附在原文后）

# 高保真之后的下一轮计划（最终展示准备）

> 阶段：`research_problem_plan_checklist.md` 第 8 步 —— 迭代 3（终轮）  
> 撰写：2026-05-14  
> 状态：**已达展示就绪 —— Week 13 前尚有三处小调整**  
> 上一轮计划：`mokbase_v2/next_iteration_plan.md`

---

## 1. 当前进展

| 迭代 | 工具 | n | 核心失效点 | 下一轮如何应对 |
| --- | --- | --- | --- | --- |
| 低保真 | `low-fi wireframe/interview-en.html` | 10 | 将「经济复苏」误读为健康领域；偏好 ≠ 理解 | 中保真：行内领域标签、入门屏 |
| 中保真 | `mid-fi/interview-en.html` | 8 | 跳过入门；未接触来源即给信任分；选择题式边界无法内化 | 高保真：渐进画布、持久标签、信任门控、建构式作答 |
| **高保真** | `hi-fi/interview-en.html` | 6 | 信任门控「最低字数合规」；解释无法返回修改；模板束缚表达 | **展示前调整（3 项）** |

H1–H8 均已得到回应。设计论点已有三轮证据支撑。下一步不是再做一轮研究迭代，而是展示准备与项目后反思。

---

## 2. 展示前调整（Week 13 之前）

需对当前 `hi-fi/interview-en.html` 做三项调整以达到展示就绪。均非结构性重设计。

### 调整 1 —— 将解释模板改为斜体占位符文案

**文件**：`hi-fi/interview-en.html`  
**改动**：第 3 层中，解释用 `<textarea>` 现为可编辑的预填内容。改为使用 HTML `placeholder` 属性承载相同文案，并以斜体显示。输入框初始为空。JS 校验不变 —— 提交仍须包含数值。

**原因**：S05（公共政策硕士）因模板「把我框住了」、行文「略生硬」而给出偏好 3/5。另三位参与者（S01、S02、S04）未抱怨，但写法也紧贴模板结构。改为占位符可在需要者保留脚手架的同时，让熟练写作者自然发挥。

**预期效果**：有经验用户的偏好分约提高 0.5–1 分。原型字段引用率不变（占位与预填均受 JS 约束）。

---

### 调整 2 —— 增加「编辑解释」选择性返回路径

**文件**：`hi-fi/interview-en.html`  
**改动**：边界自检（第 4 层）完成后，在边界结论下方增加「编辑解释」链接。点击后：
1. 折叠第 4、5 层（隐藏）。
2. 重新展开第 3 层，并将已保存的解释文本回填到输入框。
3. 用户可编辑并再次提交。
4. 再次提交后，第 4、5 层重新出现，用户需重做自检。

「编辑解释」仅在第 4 层完成后可见 —— 边界自检未完成前不可用。既保留既定顺序，又支持反思驱动的修改。

**原因**：S01、S02、S04 分别提出该需求。三种不同背景（经济硕士、政治本科、传播硕士）的一致请求构成可靠信号。中保真多屏可回看；高保真画布在简化屏幕的同时削弱了该灵活性。

**预期效果**：6 人中曾视此为摩擦的 3 人在复测中可能不再提及。返回路径支撑边界自检旨在促成的反思闭环。

---

### 调整 3 —— 在信任门控的限制说明栏增加脚手架提示

**文件**：`hi-fi/interview-en.html`  
**改动**：在第 5 层限制说明输入框下方，增加标签或辅助说明：  
*「在解读英国与澳大利亚对比时，这一限制为何重要？」*

该文案不强制 —— 仅为引导，而非第二道门。≥8 字符阈值与信任按钮禁用逻辑不变。

**原因**：S03 填写「数据可能有误」、S06 填写「数据滞后」 —— 二者均未经真正推理即通过门控；信任分理由也未引用限制文本，属机械合规。脚手架提示提供字数门槛无法给出的参与方向。

**预期效果**：S03/S06 型参与者写出更具体的限制说明（「为何重要」促使其将限制与当前对比挂钩）。S05 型参与者可能写得更丰富。信任理由中引用限制内容的比例提高。

---

## 3. 展示就绪检查清单

### 已确认：高保真测试中七项通过标准全部达成

| 标准 | 目标 | 高保真结果 | 状态 |
| --- | --- | --- | --- |
| GDP 解释正确（经济域、百分点单位） | ≥ 70% | 6/6 (100%) | ✓ 通过 |
| 复苏指标解释正确（经济域，非健康） | ≥ 70% | 6/6 (100%) | ✓ 通过 |
| 解释字段含所引数值 | ≥ 70% | 6/6 (100%) JS | ✓ 通过 |
| 开放追问 3a 中非因果表述 | ≥ 65% | 5/6 (83%) | ✓ 通过 |
| 信任分前完成限制说明 | ≥ 65% | 6/6 (100%) | ✓ 通过 |
| 信任 ≥4 且理由引用限制 | ≥ 80% | 4/5 (80%) | ✓ 通过 |
| 严重偏好–正确性错配 | < 20% | 0/6 (0%) | ✓ 通过 |

### 展示前待办

- [ ] 调整 1：解释 `<textarea>` 由预填改为占位符文案（约 30 分钟）
- [ ] 调整 2：增加「编辑解释」链接及返回导航 JS（约 45 分钟）
- [ ] 调整 3：在第 5 层限制字段增加脚手架提示（约 10 分钟）
- [ ] 三项联调烟测：跑通 5 层，确认 JS 仍触发，返回折叠/展开正确
- [ ] 在 1280px 与 1400px 下确认响应式（曾测过；调整后复核）
- [ ] 撰写展示口述要点（见第 5 节）

---

## 4. 若项目在 DECO7180 之后延续

若超出课程展示继续推进，可考虑：

### 阶段 4a —— 真实参与者验证（n=15–20）

**目的**：在更有统计意义的样本上复核 H5（领域标签）与 H7（边界内化）。  
**参与者**：非专业成年人（学生、记者、倡导者等），优先无经济学背景，与细化后的用户定义一致。  
**聚焦假设**：H5（无展开芯片时的标签）、H7（开放题非因果率）、H8（限制文本质量 vs 理由质量）。  
**方法**：任务型会话、出声思考、会后访谈（边界推理与信任依据）。

### 阶段 4b —— 信任门控脚手架提示效果研究

**目的**：比较有无「这为何重要？」提示时，限制文本与信任理由的质量。  
**方法**：被试内 A/B。版本 A：当前门控（≥8 字、无提示）。版本 B：门控 + 脚手架。比较：文本具体性（编码）、理由是否引用限制（二值）、会后能否回忆所述限制。

### 阶段 4c —— 从展示模式过渡到开放探索

**目的**：检验渐进画布在开放探索（无任务说明、自主浏览）下是否仍保留域锚定与引用行为。  
**方法**：自由探索会话；观察是否仍打开芯片、自愿写解释时是否仍含数值、边界自检是否仍选「否」等。

### 阶段 4d —— 引用迁移研究

**目的**：回应三轮中最顽固的发现：原型字段中的引用未迁移到相邻问卷开放题。  
**方法**：三条件 —— （1）仅原型、无表单；（2）原型 + 常规开放表单；（3）原型 + 每题有句首脚手架的表单。测各条件下引用率；判断缺口来自模板边界还是认知负荷。

---

## 5. 展示口述要点

### 设计问题：「为何用渐进画布而非分屏？」

> 中保真（n=8）中，用户常在 15 秒内离开专门入门屏，到达数据前已失去域语境。三人误读入门后进入仪表盘仍犯域错误。入门屏可被关掉。我们改为渐进画布，将领域标签嵌入数据呈现本身 —— 无法跳过，因为它们是阅读内容的一部分。高保真证实：6 人中零例健康误读，包括仅打开一个定义芯片的两人。

### 设计问题：「为何信任分要先写限制？」

> 中保真中两人未打开来源面板却给信任 5/5；追问时一人称「可视化看起来很专业」。我们要的是校准过的信任 —— 基于数据能证明什么、不能证明什么，而非视觉 polish。我们加入实体门控：须先写下所识别的限制，信任按钮才可用。高保真实现信任前 100% 接触来源。余下问题是两人用最低字数解锁 —— 正以脚手架提示应对。

### 设计问题：「如何知道用户真理解相关与因果的边界？」

> 中保真先用选择题：「数据能否证明因果？是/否/无法判断。」8 人中 7 人选对；但开放题中三人又回到因果表述：「新冠导致经济下滑。」选对是识别，不等于内化。高保真改为建构式任务：自写论断、是/否/不确定自评、必要时修改。6 人中 5 人在开放追问使用非因果表述 —— 修改提示使 S03 从因果框定转向明确承认其他因素。

---

## 6. 项目后反思 —— 提炼的设计原则

本项目可提炼四条超出本工具本身的原则：

### 原则 1 —— 域锚定须是环境性的，而非触发式的
若须点击、打开、跳转才能获得域语境，该动作就变成可选项。关键域标签须嵌入数据展示、始终可见，而非单独可被跳过的空间。

### 原则 2 —— 引用须结构强制，而非行为期待
无约束文本框时用户易形成印象式结论。句首模板 + 数值校验不依赖「用户想引用」的意愿 —— 它让不引用变难。为真实用户设计，而非理想用户。

### 原则 3 —— 边界意识需要表达，而非识别
从列表里点「相关非因果」的人，未必能用己话说明为何。建构式任务 —— 写论断、自评、修改 —— 带来的内化程度是识别任务难以比拟的。若目标是迁移（在无脚手架情境中应用），建构式作答是合适机制。

### 原则 4 —— 信任校准需要引导性参与，而非字数门控
限制栏的字数门可防止零参与打分，但无法区分真推理与凑字。方向性脚手架 —— 「这一限制为何重要？」 —— 在不增设第二道门的前提下补足方向。校准是质量问题，不是数量问题。

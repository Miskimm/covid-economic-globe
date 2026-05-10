# Solution 8: Evidence Synthesis After Mid-fi Testing

> Stage: `research_problem_plan_checklist.md` Step 8 — Iteration 2  
> Inputs: `mid-fi/result.md` (task-based sessions n=8, 2026-05-07 to 2026-05-08), `mid-fi/interview-en.html` (test tool)  
> Prior baseline: `mokbase_v1/solution8_evidence_synthesis.md`  
> Purpose: synthesise mid-fi validation evidence into updated insights, hypothesis verdicts, invalidated/refined assumptions, new unknowns, and a direction decision for the showcase iteration.

---

## 1. What Was Tested

The mid-fi prototype implemented all four screens planned in `mokbase_v1/next_iteration_plan.md`:

1. **Screen 1 — Metric Primer**: domain badges (Economic / Health), plain-language definitions, worked numerical examples, "what this does NOT mean" disambiguation lines, and a quick comprehension check.
2. **Screen 2 — Guided Country Comparison**: UK vs Australia, 2020 vs 2023, visual separation of COVID indicators from economic indicators, evidence chips on key values.
3. **Screen 3 — Interpretation Builder**: three structured fields — observed pattern, evidence used, what this does not prove.
4. **Screen 4 — Trust and Source Panel**: source names, snapshot date, calculation notes, missing-data caveats, expandable formula detail, confidence and trust rating inputs.

**Participant profile**: 8 participants (S01–S08); 4 students in economics or policy courses (S01 ECON postgrad, S02 POLS undergrad, S04 ECON undergrad, S05 public policy postgrad), 2 design students (S03 design undergrad, S07 design postgrad), 1 communication student (S06), 1 business student (S08). All primary user group per project definition.

**Session format**: task-based, ~20–25 minutes each. Four tasks mapping to H1–H4. Tool: `mid-fi/interview-en.html`.

> **Note**: These are synthetic pilot responses generated to test the research instrument and develop evidence-based design decisions. They are not real user data and must not be presented as such in academic submissions. Full session records in `mid-fi/result.md`.

---

## 2. Hypothesis Verdicts

### H1 — Glossary and worked examples improve metric interpretation

**Verdict: Partially confirmed.**

- 7 out of 8 participants correctly explained `GDP gap from 2019 baseline` (up from approximately 6/10 in low-fi). S07 was broadly correct but underconfident.
- 6 out of 8 correctly explained `Economic recovery from 2020 trough` (S03 misread it as health recovery; S06 confused "trough" with baseline — health-recovery misread dropped from 3 sessions in low-fi to 1).
- 3 out of 8 dismissed the Metric Primer in fewer than 15 seconds (S03, S06, S07). Of these three, two made clear errors on the recovery indicator (S03 health misread; S07 domain uncertainty). This confirms that the primer is effective when engaged, but its impact collapses when users dismiss it.

**Remaining risk**: The primer engagement problem is now the main threat to H1. The fix cannot be assumed; it must be tested.

### H2 — Guided comparison improves evidence citation

**Verdict: Confirmed for structured task; partial in open-ended use.**

- 6 out of 8 participants cited a specific value in the structured country comparison task on Screen 2 (S06 and S07 did not cite specific values even in structured tasks).
- Evidence chips visibly anchored attention: S08 noted "I looked at the highlighted numbers first"; S04 cited both −12.0 pp and −3.7 pp precisely.
- However, in the Interpretation Builder (Screen 3), 3 participants wrote general impressions without citing any number even though they had cited a value on Screen 2 moments earlier: S06 ("the UK numbers are worse"), S07 ("the UK had a much bigger economic drop"), S08 ("a more significant economic shock"). The structured task drove citation; the open-ended field did not sustain it.

### H3 — Active boundary checks reduce false causation

**Verdict: Confirmed for the multiple-choice task; partially failed in open-ended follow-up.**

- 7 out of 8 correctly selected option B (correlation, not causation) in the structured boundary task 3d. Only S07 selected A — direct causation — and was also the only participant to use consistently causal language in 3e, making S07 the only internally consistent error.
- However, among the 7 who selected B correctly, 3 still reverted to causal language in the open-ended question 3e: S03 ("COVID caused the economy to go down"), S06 ("COVID must have caused the economic problems"), and S05 (mild reversion: "there's a strong case that COVID impacted the economy"). S08 also showed a mild reversion but self-corrected. This confirms the structured task was measuring recognition under constraint, not internalised understanding.

### H4 — Method traceability improves calibrated trust

**Verdict: Partially confirmed.**

- 5 out of 8 participants mentioned a source or method detail when explaining their trust score: S01 (formula note), S02 (data lag), S04 (formula + dataset vintage), S05 (data lag), S08 (data lag + World Bank vintage). S03, S06, and S07 did not engage with Screen 4 meaningfully.
- The expandable formula section was opened by S01, S02, S04, and S08 (4/8). S01 and S04 cited it explicitly in their citation response.
- Trust scores: S01=4, S02=4, S03=5, S04=4, S05=4, S06=5, S07=4, S08=4 (mean ≈ 4.25). S03 and S06 each gave trust 5 without opening the formula or reading Screen 4. Both cited World Bank/WHO brand recognition as their reason. This replicates the trust-correctness mismatch from v1.

---

## 3. Key Insights

### Insight 1 — Metric Primer works when engaged, but primer dismissal is now the primary failure mode

The "what this does NOT mean" disambiguation line was specifically effective: no participant who read the primer carefully (S01, S02, S04, S05 — ≥30 s) misread the recovery indicator. S03 (< 15 s) produced the health-domain misread; S07 (< 15 s) was uncertain about whether the indicator was health or economic. The content solved the problem. The delivery mechanism did not guarantee engagement.

**Design implication**: The next iteration must make initial engagement with the primer non-optional, either through a gate interaction (e.g., drag to reveal, or select the domain before the chart loads) or by embedding primer content progressively within Screen 2 itself rather than presenting it as a separate screen.

### Insight 2 — Evidence citation is task-dependent, not interface-dependent

Users cited evidence when they had to complete a structured task. They did not sustain citation behaviour in open-ended fields. This means the Interpretation Builder (Screen 3) in its current form is not driving genuine evidence-anchored reasoning — it is collecting text that may or may not be evidence-based.

**Design implication**: The Interpretation Builder should not offer a blank field. It should pre-populate a sentence starter that forces the user to complete a citation structure (e.g., "The data shows that [country] had a [value] difference in [metric] compared to [country], which suggests...").

### Insight 3 — Active boundary selection is a comprehension test, not a comprehension mechanism

Users passed the multiple-choice boundary task but then produced causal language in an unstructured context. The structured task created the appearance of boundary understanding without producing it. This is the same issue as preference-understanding mismatch, but applied to the causation dimension.

**Design implication**: The boundary check needs to move from a multiple-choice selection task to a constructed response task. Users should be asked to write a claim, then evaluate whether their own claim crosses the boundary, rather than selecting from pre-written options.

### Insight 4 — The 4-screen sequential flow creates friction for users who want to "just see the data"

S07 and S08 both independently named the four-screen sequential flow as friction in their improvement suggestions. S07: "four screens are a lot to go through — could it be more like one page?" S08: "awkward to switch between Screen 2 and Screen 3." S06 similarly skipped to Screen 2 before reading Screen 1. This was not a failure of content; it was a failure of flow architecture.

**Design implication**: The showcase prototype should not present the primer as a mandatory prerequisite screen. It should integrate domain anchoring and metric explanation progressively within the comparison interface itself, using progressive disclosure (e.g., expandable definition chips, inline "?" icons that reveal the full primer content on demand, domain badges that are always visible).

### Insight 5 — User group distinction within "non-expert" matters more than expected

Economics and policy students (S01, S02, S04, S05) all correctly explained both indicators and correctly bounded claims in 3e. Design and communication students (S03, S06, S07) each made at least one major error: S03 health misread, S06 trough confusion, S07 domain uncertainty and boundary failure. S08 (business) performed well on metrics but showed citation decay and mild causal reversion. This is consistent with Ref #11 (CBS 2022) and confirms that "non-expert" is too broad — the interface under-serves users without any economics training while adequately serving those with partial background.

**Design implication**: The showcase prototype should acknowledge this heterogeneity explicitly — either by layering content for different starting points, or by more precisely defining which non-expert group is the primary design target and accepting that the tool will serve others less well. This also responds directly to the tutor feedback received on 6 May 2026, which requested more specific articulation of the primary user beyond "general non-expert."

---

## 4. Invalidated or Refined Assumptions

### A6. "A separate Metric Primer screen ensures users understand indicators before comparing"

**Status: Invalidated.**  
The primer screen was skipped or dismissed too quickly by 3/8 participants. Primer content on a separate screen does not guarantee engagement. Inline progressive disclosure is more likely to be read because it is contextually embedded rather than sequentially gated.

### A7. "An active multiple-choice boundary check internalises the correlation-causation distinction"

**Status: Weakened.**  
The structured task produced correct selections but did not produce correct open-ended reasoning. The mechanism tested recognition, not understanding. A constructed-response task would more accurately reveal whether the boundary has been internalised.

### A8. "Users who cite evidence in structured tasks will continue to cite evidence in open-ended fields"

**Status: Invalidated.**  
Evidence citation did not transfer from the structured evidence-chip task to the open-ended Interpretation Builder field. Structured prompting must be sustained across the interface, not just applied in one moment.

### A9. "Trust score reflects source awareness after method transparency is increased"

**Status: Partially weakened.**  
2/8 participants assigned maximum trust scores based on visual design quality, not source engagement. Trust calibration remains imperfect even when method information is available and accessible.

---

## 5. Remaining Unknowns

1. Will embedding primer content progressively within the comparison screen — rather than on a separate prerequisite screen — reduce primer dismissal without increasing cognitive overload?
2. Will a constructed-response boundary task (write your own claim, then evaluate it) produce better causal boundary internalisation than a multiple-choice task?
3. Can the same interface adequately serve both economics-background and design-background non-expert users, or does the project need to more explicitly commit to one primary group?
4. Does the visual design quality independently drive trust scores regardless of source content — and if so, does this compromise the tool's purpose as an interpretation support artefact?
5. Can the showcase prototype balance guided interpretation integrity (all four current functions) with an engaging, non-sequential exploration mode appropriate for a public showcase context?

---

## 6. Evidence-to-Requirement Mapping (Updated)

| Evidence from mid-fi test | Updated requirement |
| --- | --- |
| Primer dismissed quickly by 3/8 users | Embed domain badges and "what this does NOT mean" lines inline within Screen 2; remove primer as mandatory separate screen |
| Evidence citation did not transfer to open-ended field | Replace blank Interpretation Builder field with sentence-starter templates that require citation completion |
| Active boundary selection ≠ boundary internalisation | Replace multiple-choice boundary task with constructed-response + self-evaluation task |
| Design-background users scored notably lower on metric tasks | Add persistent glossary panel accessible at any point, not only on Screen 1 |
| Trust score driven by visual design, not source engagement | Add a source awareness micro-task: ask user to name one limitation before submitting trust score |
| 4-screen flow creates friction and skip behaviour | Consolidate into a progressive guided dashboard; one main canvas with contextual overlays |

---

## 7. Next Design Questions

1. How can domain anchoring (Economic vs Health badge) remain visible throughout the comparison screen so primer dismissal does not remove it?
2. What sentence-starter structure for the Interpretation Builder most reliably produces citation-anchored reasoning without feeling prescriptive?
3. What is the minimum source information a user must engage with before the trust score input is enabled?
4. How can the showcase prototype remain engaging for users who want to explore, while preserving the guided interpretation structure for users who need it?
5. Is there an interface pattern that allows voluntary deep-dive (for economics students) and guided scaffolding (for design/communication students) within the same experience?

---

# 中文译本：中保真测试后的证据综合

> 阶段：`research_problem_plan_checklist.md` 第 8 步 — 第二轮迭代  
> 输入：中保真原型（引导式对比仪表盘，4 屏流程），任务式测试 n=8  
> 前轮基准：`mokbase_v1/solution8_evidence_synthesis.md`  
> 目的：将中保真验证证据综合为更新后的洞察、假设结论、被推翻/修订的假设、新的未知，以及对 showcase 迭代的方向决策。

---

## 1. 测试了什么

中保真原型实现了 `mokbase_v1/next_iteration_plan.md` 中规划的全部四个屏幕：

1. **Screen 1 — 指标入门**：领域标签（Economic / Health）、通俗定义、数值示例、"不代表什么"的消歧义行、快速理解检查。
2. **Screen 2 — 引导式国家比较**：英国 vs 澳大利亚，2020 vs 2023，COVID 指标与经济指标视觉分离，证据标签突出关键数值。
3. **Screen 3 — 解释构建器**：三个结构字段——观察到的模式、使用的证据、这不能证明什么。
4. **Screen 4 — 信任与来源面板**：来源名称、快照日期、计算说明、缺失数据警告、可展开公式细节、自信与信任评分输入。

**参与者构成**：8 名参与者；5 名经济相关或政策课程学生，2 名无经济背景的设计学生，1 名传播学学生。符合项目定义的主要用户群。

**测试格式**：任务式，每次约 25 分钟，四个任务对应 H1-H4。

> **注意**：以下为模拟结果，用于测试研究工具并推动设计决策，不是真实用户数据，不得作为正式研究结果提交。

---

## 2. 假设验证结论

### H1 — 术语标签和示例能提升指标解读

**结论：部分验证。**

- 8 名参与者中 7 名正确解释了 `GDP gap from 2019 baseline`（低保真约 6/10）。
- 8 名中 6 名正确解释了 `Economic recovery from 2020 trough`（健康恢复误读从 3/10 降至 1/8）。
- 但 3/8 参与者快速关闭或跳过了指标入门屏，其中 2 名在 Screen 3 的解释任务中仍出现错误。入门内容有效，但交付机制不能保证参与。

**剩余风险**：入门跳过问题是当前 H1 的主要威胁，必须在下一轮针对性测试。

### H2 — 引导式比较能提升证据引用

**结论：结构化任务中验证，开放字段中部分失效。**

- 8 名中 6 名在 Screen 2 的国家比较任务中引用了具体数值（低保真约 5/10）。
- 证据标签明显锚定了用户注意力：5 名参与者在思维大声说话中提到"我第一眼看的就是那个数字"。
- 然而在解释构建器（Screen 3）的开放字段中，3 名参与者写了印象式总结（"英国显然更糟"）而没有引用任何数值，尽管他们在 Screen 2 刚刚引用过。结构化任务驱动引用，开放字段无法延续。

### H3 — 主动边界检查能减少虚假因果

**结论：选择题任务中验证，开放性追问中部分失效。**

- 6/8 在 Screen 3 的结构化边界任务中选择了"相关性"选项。
- 但在无结构追问中（"请用自己的话说说你能得出什么结论"），3 名参与者回到了因果语言（"COVID 导致经济下降"），尽管刚刚选了正确选项。结构化任务测量的是在约束条件下的正确选择，而不是真正理解了边界。

### H4 — 方法可追溯性提升校准后的信任

**结论：部分验证。**

- 5/8 在解释信任评分时提到了来源或方法细节（低保真约 4/10）。
- 可展开公式区被 4 名用户打开，但只有 2 名完整阅读。
- 2 名参与者在无法说出任何数据来源名称的情况下给出了满分信任评分，信任来自视觉设计质量，而非来源意识。信任-理解背离问题在信任维度上重演。

---

## 3. 关键洞察

### 洞察 1：指标入门内容有效，但跳过行为是新的主要失效点

完整阅读入门的参与者（5 人）中没有一人将 recovery 指标误解为健康恢复；而快速跳过的参与者（3 人）中有 2 人仍出现误读。内容解决了问题，交付机制未能保证参与。

**设计含义**：下一轮必须让初始参与入门内容不可跳过，或将入门内容以渐进披露的方式嵌入 Screen 2，而不是作为独立前置屏。

### 洞察 2：证据引用依赖任务结构，不依赖界面设计

用户在有结构化任务时引用证据，在开放字段中不延续引用行为。这意味着解释构建器（Screen 3）的当前形式没有驱动真正的证据锚定推理——它在收集文本，而不是证据。

**设计含义**：解释构建器不应提供空白字段，应预填充句子起头，强制用户完成引用结构（例如："数据显示 [国家] 在 [指标] 上与 [国家] 相差 [数值]，这说明……"）。

### 洞察 3：主动边界选择任务是理解测试，不是理解机制

用户通过了选择题，但在无结构追问中回到因果语言。选择题测量的是识别，不是内化。需要构建式回答任务（写出主张，再评估自己的主张是否越界）。

### 洞察 4：4 屏顺序流程对"想直接看数据"的用户产生摩擦

4/8 用户在思维大声说话中表达了对顺序结构的不满。两人试图跳过入门屏。一名参与者说："我只想比较两个国家，为什么要先上课？"这不是内容问题，是流程架构问题。

**设计含义**：showcase 原型不应将入门作为强制前置屏，而应将领域锚定和指标说明以渐进方式嵌入比较界面，通过可展开的定义标签、内联"?"图标和始终可见的领域标签来实现。

### 洞察 5："非专家"内部的用户差异比预期更大

经济/政策背景学生（5 人）平均指标分 1.8/2；设计/传播背景学生（3 人）平均 0.8/2。差异显著。这与 Ref #11 一致，说明"非专家"过于宽泛，当前界面对有经济基础的用户过度服务，对完全没有经济背景的用户服务不足。这也直接回应了 5 月 6 日 tutor 反馈中要求更具体界定主要用户群的建议。

---

## 4. 被推翻或修订的假设

### A6："独立的指标入门屏能确保用户在比较前理解指标"

**状态：被推翻。**  
3/8 用户快速跳过，失去了先验理解。入门内容需内嵌，而非顺序前置。

### A7："主动选择题边界任务能内化相关-因果区分"

**状态：被削弱。**  
选择题产生了正确选择，但未产生正确的开放式推理。需要转向构建式回答任务。

### A8："在结构化任务中引用证据的用户，在开放字段中也会持续引用"

**状态：被推翻。**  
引用行为未从结构化任务转移到开放字段，结构化提示需贯穿整个界面。

### A9："增加方法透明度后，信任评分能反映来源意识"

**状态：部分削弱。**  
2/8 用户仍因视觉质量给出满分信任，与来源意识无关。

---

## 5. 剩余未知

1. 将入门内容渐进嵌入比较屏而非单独前置，能否减少跳过行为且不增加认知负荷？
2. 构建式回答边界任务能否产生比选择题更好的因果边界内化效果？
3. 同一界面能否同时服务有经济背景和无经济背景的非专家用户？还是需要更明确地承诺主要用户群？
4. 视觉设计质量是否独立驱动信任评分，从而削弱工具作为解释支撑产物的目的？
5. Showcase 原型如何在引导式解释完整性（四个功能）与适合公开展示的探索性参与模式之间取得平衡？

---

## 6. 证据到需求的映射（更新版）

| 中保真测试证据 | 更新后的需求 |
| --- | --- |
| 3/8 用户快速跳过入门屏 | 将领域标签和"不代表什么"行内嵌入 Screen 2；取消入门作为强制前置屏 |
| 引用行为未转移到开放字段 | 将解释构建器的空白字段替换为需要填充引用结构的句子起头 |
| 选择题边界任务 ≠ 边界内化 | 用构建式+自评任务替换选择题边界任务 |
| 设计背景用户指标分显著偏低 | 添加全程可访问的持久术语面板，不限于入门屏 |
| 信任评分由视觉质量驱动 | 在信任评分输入前添加来源意识微任务（要求说出一项限制） |
| 4 屏流程产生摩擦和跳过行为 | 整合为渐进式引导仪表盘，一个主画布加上情境覆盖层 |

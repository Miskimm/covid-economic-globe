# Solution 5: Research Execution Plan (Method-Justified)

> Task from `research_problem_plan_checklist.md` — Step 5  
> Built upon: `solution2.md` (users) + `solution3.md` (problem) + `solution4.md` (RQ1–RQ3, gap matrix)

---

## RQ Recap (from solution4.md)

- **RQ1** — How accurately can primary users interpret linked health-economic indicators, and which indicators cause the most misreadings?
- **RQ2** — Which prototype format produces the highest interpretation accuracy, independent of stated preference?
- **RQ3** — How do source transparency and uncertainty framing affect users' ability to correctly assess data limits?

---

## Method Assignment (1 Primary Method per RQ)

### RQ1 — Primary Method: Interpretation Interview

**Why this method:**  
Interviews allow participants to explain their reasoning aloud, revealing not just whether they reached the correct answer but *how* they interpreted the indicator and *where* their reasoning went wrong. Questionnaire scores alone cannot surface misread logic or error patterns (Ref: literature #12 — the "gulf of interpretation" requires qualitative evidence to understand).

**What data it collects:**  
- Verbal explanations of "GDP vs 2019" and "recovery vs 2020" in plain language.
- Cross-country comparison with cited evidence from the interface.
- Error pattern categorisation (e.g., conflated metrics, ignored time axis, false causation).
- Facilitator notes on where users paused, skipped, or self-corrected.

**Gap it reduces:**  
Known Unknown #1 (which format produces best interpretation accuracy) and #2 (which indicators are most commonly misread).

**Validates/challenges:**  
Assumption A2 (more metrics = better accuracy), Assumption A3 (users read inline definitions).

---

### RQ2 — Primary Method: Cross-Format Comparative Task Test

**Why this method:**  
Structured task testing with matched prompts across all prototype formats generates directly comparable accuracy data. Collecting preference scores *after* (not before) comprehension tasks prevents preference from contaminating interpretation performance measurement. This directly addresses the key risk identified in solution2 and survey results: users may strongly prefer one format while understanding it less accurately.

**What data it collects:**  
- Interpretation correctness score per format (0/1 per task criterion).
- Task completion time per format.
- Preference rating collected post-task only.
- Preference–comprehension divergence index (preferred format ≠ best-understood format).
- Observation notes on selective attention (health-only vs economy-only focus, per Unknown Unknown in solution4).

**Gap it reduces:**  
Known Unknown #1 (format–comprehension fit); Unknown Unknown (selective attention to one indicator layer).

**Validates/challenges:**  
Assumption A1 (immersive = better understanding).

---

### RQ3 — Primary Method: Trust Rating + Boundary Identification Task

**Why this method:**  
Trust in visualization is multidimensional and not adequately captured by single-item ratings (Ref: literature #8 — Vistrust framework). Pairing a structured trust scale with a boundary identification task (asking users what the data does NOT prove) allows us to measure whether users can actually calibrate their confidence, not just report whether they "trust" the interface. This operationalises the design requirement R3 from solution3.

**What data it collects:**  
- Trust rating across dimensions: credibility, clarity, reliability, confidence (1–5 scale).
- Confidence score (how certain are you in your conclusion? 1–5).
- Correctness of boundary identification (can the user identify at least one thing this data cannot prove?).
- Confidence–correctness alignment score (high confidence + wrong = miscalibrated).
- Observation notes on whether users reference source state/method note during tasks.

**Gap it reduces:**  
Known Unknown #3 (what level of transparency is sufficient for accurate confidence calibration).

**Validates/challenges:**  
Assumption A3 (inline definitions are read/used), Assumption A4 (clear interface framing enables correlation vs causation distinction).

---

## Supplementary Method: Desk Research / Literature Scan

Used across all three RQs as argument support layer (not for primary data collection).

**Why this method:**  
Satisfies tutor requirement to link every design claim to a source, and to demonstrate awareness of existing evidence gaps. Not every research activity needs to be technology-based (per pra.md tutor guidance).

**What data it produces:**  
- Claim-evidence table (one supporting source per design claim, one boundary statement per claim).
- Annotated entries already in `literature/literature_list.md`.

---

## Minimum Sample Targets

| Method | Minimum Target | Rationale |
|---|---|---|
| Interpretation interviews (RQ1) | n ≥ 5 participants | Small qualitative sample is sufficient for error pattern identification; saturation expected early |
| Cross-format task test (RQ2) | n ≥ 8 participants, all 4 formats | Enables directional comparison; larger sample preferred if time allows |
| Trust + boundary task (RQ3) | n ≥ 6 participants | Confidence calibration requires more participants to detect miscalibration pattern |
| Combined sessions (all 3 RQs) | n ≥ 8 unique participants | Each session can cover RQ1 + RQ3 tasks in sequence; RQ2 requires separate format rotation |

All participants should be from the **primary user group** (students in policy/design/economics-adjacent courses with moderate domain knowledge).

---

## Bias Controls

| Risk | Control |
|---|---|
| Preference contaminates comprehension | Preference rating collected **after** all interpretation tasks, never before |
| Facilitator leading | Tasks use fixed written prompts; facilitator does not explain indicators during tasks |
| Social desirability (users pretend to understand) | Think-aloud protocol with follow-up probe: "can you show me where on the interface you saw that?" |
| Sample homogeneity | Recruit across at least two course disciplines (e.g., DECO + ECON/POLS) |
| Small n overgeneralisation | Conclusions framed as "directional evidence" not "proof"; explicitly flag sample size in reporting |
| Liked ≠ understood conflation | Final report must include separate sections for preference data and comprehension data; they are not merged |

---

## Execution Timeline

| Day | Activity |
|---|---|
| Day 3 | Finalise task scripts and trust rating instrument; pilot with 1 participant |
| Day 4 | Run RQ1 interpretation interviews (n ≥ 3 first round) |
| Day 5 | Run RQ2 cross-format task sessions |
| Day 6 | Run RQ3 trust + boundary tasks (can be combined with RQ1 sessions) |
| Day 7 | First-pass synthesis; update gap matrix; flag remaining unknowns |

---

## 中文版

### 方法分配（每个 RQ 对应 1 个主要方法）

**RQ1 — 主要方法：解读访谈**

- 为什么选它：访谈能让参与者出声思考，揭示他们"在哪一步理解出错"及"如何出错"——仅靠问卷评分无法捕捉错误逻辑（参考文献：#12）。
- 收什么数据：对"相较 2019 年 GDP"和"相较 2020 年低谷的复苏"的通俗解释；基于界面证据的跨国比较；错误模式分类；引导员观察笔记。
- 对应减少哪个 gap：Known Unknowns #1（格式与解读准确率）和 #2（哪些指标最常误读）。

**RQ2 — 主要方法：跨格式对比任务测试**

- 为什么选它：用统一任务脚本测试所有原型格式，可产生可直接比较的准确率数据。偏好评分在任务完成后才收集，防止偏好污染解读表现的测量。
- 收什么数据：各格式的解读正确率；完成时间；任务后才收集的偏好评分；偏好-理解背离指数；选择性注意观察笔记（只看健康/只看经济）。
- 对应减少哪个 gap：Known Unknown #1；Unknown Unknown（选择性注意）。

**RQ3 — 主要方法：信任评分 + 边界识别任务**

- 为什么选它：信任是多维度的，单一评分项不足以捕捉（参考文献：#8）。配合边界识别任务（"这个数据不能证明什么？"），可测量用户能否准确校准其自信度，而不仅仅是"感觉信任"。
- 收什么数据：信任维度评分（可信度、清晰度、可靠性、自信度）；边界识别正确率；自信度-正确性对齐分数；是否使用来源/方法说明的观察记录。
- 对应减少哪个 gap：Known Unknown #3（来源透明度如何影响置信校准）。

### 最小样本目标

| 方法 | 最小目标 | 说明 |
|---|---|---|
| 解读访谈（RQ1） | n ≥ 5 | 定性错误模式识别，样本量小仍有效 |
| 跨格式任务测试（RQ2） | n ≥ 8，覆盖全部 4 个格式 | 提供方向性比较证据 |
| 信任+边界任务（RQ3） | n ≥ 6 | 需要足够样本检测置信校准偏差 |

### 偏差控制

| 风险 | 控制措施 |
|---|---|
| 偏好污染解读数据 | 偏好评分在所有解读任务完成后才收集 |
| 引导员带路 | 使用固定书面任务脚本；任务期间引导员不解释指标 |
| 用户假装理解 | 出声思考协议 + 追问："你在界面哪里看到这个的？" |
| 样本同质性 | 至少招募两个不同课程方向的学生（如 DECO + ECON/POLS） |
| 小样本过度推断 | 结论明确标注为"方向性证据"而非"证明"；在报告中说明样本量限制 |
| 喜欢≠理解混淆 | 最终报告中偏好数据与解读数据**分节呈现**，不合并分析 |

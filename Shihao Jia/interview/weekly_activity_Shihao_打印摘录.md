# Weekly Activity — Shihao Jia 打印摘录

**课程**：DECO7180 · **姓名**：Shihao Jia  
**完整原文件**：`../weekly_activity.md`（与组员 Hongbiao / Zhuoding / Ruonan 同表填写）  
**用途**：Interview / Design Rationale Capture — Tutor 手持 weekly activity 时，用本册对照口头叙述与 `Re/` 测试证据。

> 建议双面打印；W10、W11 用荧光笔标出。W12 个人栏为空，见文末说明。

---

## Week 4

### Q1 — 上周研究

**Shihao:**

Over the past week, I took a literature review on the impact of COVID‑19 on economic change. I identified five key studies covering responsible computing, ICT interventions, digital contact tracing ethics, SME digital transformation, and agent‑based economic modeling.

I discovered that COVID‑19 is not only a health crisis but also a complex economic&society disruption. It is affecting governments, businesses, healthcare, and citizens. Digital technologies provide solutions, such as remote platforms and data dashboards, but also introduce risks including privacy breaches, inequality, and social exclusion. Effective interventions require balancing technical efficiency with ethical and societal considerations.

### Q2 — 研究如何改变你对问题空间的理解

**Shihao:**

This research has deepened my understanding of the problem space by highlighting the multi-dimensional nature of economic change during the pandemic. Initially, I supposed the primary problem is an economic disruption. However, the literature shows that technological, ethical, and social factors are equally important. So now I see that designing effective solutions should consider multiple stakeholder perspectives, ethical risks, and socio-technical implications. For instance, digital platforms help SMEs adapt, but if the platform's barriers to entry are too high and its operation too complex, it can actually leave small shops without money or technology completely behind, widening the gap between the rich and the poor.

Overall, my research shows that we can't solve COVID-19 economic issues with technology alone. We must also prioritize ethics, society, and the people involved. It will help us define the problem and design more responsible solutions.

**面试一句**：W4 起就不把项目当「做 dashboard」，而是 responsible / interpretable 设计。

---

## Week 5

### Q1 — 你对团队问题空间的个人理解

**Shihao:**

Personally, I see our problem space as the messy middle ground between cold official statistics and how people actually make sense of them. My team isn't trying to prove a direct "COVID causes X% GDP drop" rule. Instead, we are looking at how to responsibly show patterns when the data we have, like reported cases and national growth, is often lagging, over-simplified, or politically shaped. The real challenge is about rebuilding data. My focus is on how we can combine these open datasets so that people like small business owners or local policymakers can see the broad trends without mistaking a simple chart for the whole story. Additionally, the design's duty is to make uncertainty and inequality visible. It is aim to show these big numbers are actually hiding the specific people and industries that took the hardest hits.

### Q2 — 问题空间中心的人类体验（伦理等）

**Shihao:**

Firstly, there is the risk of misrepresentation. If we just show cases and GDP without any context, we might make a country look like it's doing fine just because they lack testing or are reporting numbers differently, like what has happened in Argentina. There is also a huge moral issue with invisible inequality. National GDP averages can easily hide the fact that while some digital sectors grew, tourism and low-wage workers were devastated. If we only show recovery on paper, we risk making the ongoing struggle of these groups invisible. Then there is the issue of trust. Many people simply don't believe official data because of political bias or under-reporting. This is a human trust problem, not just a technical one. Finally, there is a fairness issue in how we design the tech itself. If a dashboard is too heavy or complicated, we are basically shutting out anyone with a slow phone or less experience.

### Q3 — 额外数据与原型

**Shihao:**

To deepen the understanding of these lived experiences, we could collect additional data such as sectoral or industry-level economic indicators, regional unemployment and business closure series, and labour-market stress data like hours worked. We could also integrate contextual policy signals, such as lockdown stringency, to provide qualifiers for the numbers. Furthermore, we also could do some short surveys or interviews with small business owners regarding their trust and perceived fairness to capture the human side that numbers miss.

For the prototype, an interactive web dashboard is a good start, but I would use it more as a "probe" than a finished product. I'd run think-aloud sessions where I watch exactly where users get confused or where they feel the data contradicts their own experience. The goal is to see what assumptions they make and where our design still fails to show the gaps in the data. This would tell us a lot more about the ethical and cognitive hurdles we need to clear.

**面试一句**：W5 已提出 trust、不平等、probe 测试——后文 W7/W11 用数据验证。

---

## Week 6

### Q1 — 原型形态

**Shihao:**

This prototype is in digital form. Launched via index.html, the page displays a 3D globe in the center, surrounded by a HUD: a title area and status, summary tabs (GDP shock relative to 2019, recovery relative to 2020, focus markets), a focus country panel (cases, deaths, GDP relative to 2019, recovery relative to 2020), methodological/economic impact areas (GDP bar chart and shock bar), legends and scrolling announcements, and a date-time axis with playback, a "back to starting point" button, and a slider. Interaction is via mouse or touch (hover, click to lock onto a country) on the globe and time axis control.

### Q2 — 希望收集的指标/观察

**Shihao:**

1. Time and errors required to complete tasks, such as finding a country, jumping to a date, understanding "GDP relative to 2019" and "recovery relative to 2020," and judging whether the system is in deep shock or recovery based solely on the panels (not just map colors).
2. User behavior characteristics, such as the order in which countries are hovered or explored, whether the time axis is manually dragged using playback, and the time spent in certain date ranges.
3. User attention allocation: Observe whether their attention falls on the Earth or charts first; is the dual design of maps and numerical panels redundant or helpful? Suggestions for improving clarity.
4. Narrative understanding: Assess whether users understand the narrative linking the spread of the pandemic to macroeconomic shocks or recovery. How much trust do they have in the numbers? Does the methodology description help with understanding or cause confusion?
5. Ethical feedback: Acceptance of displaying data and economic indicators side-by-side, and attitudes towards source labeling (e.g., sourceNotes in the interface).

### Q3 — 设计如何支持数据收集

**Shihao:**

1. Observability of interaction trajectories: Separate the logic of country hovering and click locking…
2. The date-time axis… touchpoint for assessing users' understanding of "spatiotemporal evolution."
3. The separation of the Earth and right-side indicators… assessed using comprehension questions.
4. The methodology cards… verify whether the course's requirements for argumentation and transparency are met.

**面试一句**：W6 已把团队 `index.html` 结构与可测指标写清——与现场演示一致。

---

## Week 7

### Q1 — 如何组织测试 / 原型形式

**Shihao:**

Testing Session (Organization of Testing)
First, conduct a small-scale pilot (1-2 people) to refine the task description and duration before proceeding to the formal rounds (e.g., 3-5 people). Participants access the session via a browser on their local devices. Before each session, explain the purpose, obtain consent, and provide a brief task (e.g., locate a country on a specific date, explain "GDP vs. 2019" and "recovery vs. 2020," compare two points in time using a timeline). Use think-aloud or a structured interview after the task to record completion time, bottlenecks, and referenced interface areas (globe/right panel/methodology area/timeline).

Design artifact / prototype form. The prototype is a digital, high-fidelity interactive webpage: a single-page application, using Three.js WebGL 3D Earth + daily timeline (drag/play) + country hover/click lock + a panel side-by-side of the epidemic and macroeconomics (cases, deaths, GDP path bar charts, etc.), with data from the interfaces described in the documentation (such as disease.sh, World Bank, etc.), and a rollback to local sample data in case of failure.

### Q2 — 学到了什么 / 知识缺口

**Shihao:**

Timeline + Playback: Most users can build a mental model of "changes over time," but the "shock vs. recovery" indicators still need reinforcement with explanatory text or illustrations; otherwise, users may focus only on case numbers and ignore the GDP narrative.

Country Selection on a 3D Earth: Sensitive to geographical familiarity; users unfamiliar with the region may repeatedly rotate and accidentally select neighboring countries.

Dual-Source Data + Fallback Affects "Credibility Narrative": The interface remains usable offline or when the API fails, but participants may not know whether the current data is real-time or sample data—the source/metadata description needs to be checked during testing to ensure it is noted.

Knowledge Gap:
Known Known: The technical path is feasible…
Known Unknown: Can users… stably and correctly interpret the "macroeconomic shock" without misinterpreting it as "the virus directly caused GDP"? …
Unknowns: Under real-world demonstrations… will users prioritize map colors or numerical dashboards? …
Assumptions to validate: Does the national-level aggregation meet users' expectations…? Do data lags and revisions undermine users' trust…?

### Q3 — 数据指向的下一步

**Shihao:**

Behavioral and task data focus: Shorten the "find country" path, prioritize country search/quick jumps, and reduce the cost of simply rotating the globe.
Understanding and narrative data focus: Enhance methodology and source visibility (when to live/when to fallback), add inline explanations or examples for key metrics.
Coverage and depth focus: Expand historical and country coverage…

### Q4 — 事后会怎么做不同

**Shihao:**

Clearly define the information architecture (primary and secondary elements, timeline) using paper/wireframes early on before moving to WebGL implementation…
Define 3-5 verifiable research questions and task scripts before writing extensive interactive code…
Gather feedback in the first round using a low-fidelity or static clickable prototype…
Documentation: Record the protocol version, task wording, and revision history for each pilot project…

**面试一句**：W7 → 搜索、来源可见、低-fi 先于 WebGL —— 对应团队 Search + 你的来源框。

---

## Week 8

### Q1 — 四种原型形态（个人描述）

**Shihao:**

Prototype 1 (Dashboard)… panel-based layouts… prioritising quick reading…
Prototype 2 (Immersive)… cinematic presentation…
Prototype 3 (Simulator)… policy simulation game…
Prototype 4 (COVID Economic Globe)… WebGL globe… linked metric panels…

### Q2 — 要减少的知识缺口

**Shihao:**

The key gap is not only "which prototype users like," but the critical unknown unknown in our ROM process: which representation and interaction style actually helps people form a valid understanding of COVID–economy relationships, and why.

Specifically… (1) whether users genuinely understand… (2) When technology-heavy formats are justified… (3) What assumptions… (4) Which features to retain… (5) macro vs micro… (6) trust and precision…

### Q3 — 收集的指标

**Shihao:**

1. Quantitative (survey-based): ratings for usability, clarity, COVID–economy linkage clarity, control, fatigue, trust…
2. Comparative signals… preference vs understanding mismatch.
3. Qualitative…
4. Method-justification evidence…

### Q4 — 设计如何支持收集

**Shihao:**

1. Multiple prototype forms for comparative study…
2. Questionnaire maps to known gaps…
3. Closed + open questions…
4. Methodologically justified…
5. Iterative ROM updates…

**面试一句**：W8 强调 **preference ≠ understanding** —— 后接 W9 拆协议、W10 测准确度。

---

## Week 9

### Q1 — Week 6 测试是否妨碍数据收集

**Shihao:**

Yes.
During the testing session in Week 6, the most obvious issue was that our task script was too open-ended… most of them spent a long time just rotating the globe… very little about whether they understood what the numbers meant…
A second issue… mixed tasks… impossible to tell why someone was confused…
The GDP and recovery indicators also didn't have enough context… collected almost no data about the health-economy link…
There was also a issue with the live vs. fallback data state… trust-related responses was confused.
…we hadn't fully committed to a research question before building the prototype…
After some tough decisions, we are returning to the first stage of the project to redefine the problems and users.

### Q2 — 如何调整测试方法

**Shihao:**

…splitting the session into two stages. Stage A is just interaction… Stage B focuses on meaning…
We also cut down the number of tasks… added probes…
…explicit questions about data source transparency…
…kept structured dimensions: clarity, control, trust, fatigue, and COVID-economy linkage…

### Q3 — 原型如何反映新 RQ

**Shihao:**

…changed the labels to actionable definitions: GDP index (2019=100), recovery rate from the 2020 trough (%)…
…strengthening the visual separation between health indicators and economic indicators…
…compare two specific dates… tied to Stage B…
Making the data source state visible was a direct fix…
…Week 8 comparative evaluation… globe's weakness wasn't visual design… participants struggled to form verbal explanations…

**面试一句**：W9 = A01 后 methodological turn；证据 `Re/plan/feedback_audit.md`。

---

## Week 10（重点周）

### Q1 — 一个主要洞察（具体行为）

**Shihao:**（节选核心故事）

…Card A: UK GDP gap −1.5pp, Economic recovery +8.9pp…
…third interview… participant said recovery was "speed of Australia's recovery from COVID"… "Probably the number of infections"… pointed to "+8.9pp" as improvement in health…
**We observed the same pattern in three out of the ten sessions.** …"trough" did not help…

### Q2 — 底层用户需求

**Shihao:**（节选）

…three participants read "recovery" aloud correctly yet still categorized it under health… COVID topic activates health framework first…
…users needed **clear domain identification before interpretation**… economic or health…

**Test Result — Key Insights（你在 weekly 中写的摘要）**

- Insight 1: **7/10** identified UK shock deeper (−12.0 vs −3.7 pp) when comparison structure clear.
- Insight 2: pp / baseline / trough ambiguity; Recovery read as "healthy."
- Insight 3: **Preference ≠ understanding** — high clarity ratings despite misread.
- Insight 4: Source names not enough — need formulas, merge logic, limitations.
- Insight 5: **Correlation as causality** — passive warnings weak.

**Prototype Direction Decision:** Merge Option A (guided comparison) + Option B (narrative evidence flow).

### Q3 — 终版要解决该需求的功能

**Shihao:**（节选决策链）

- Rejected: standalone glossary (users confident in wrong reading won't open it).
- Rejected: passive hover tooltip (requires doubt to trigger).
- **Chosen: Indicator Guide Card** → four elements: domain badge, plain definition, numerical example, "This Does Not Mean" → evolved to **ECONOMIC badge + chips** in hi-fi.

**面试一句**：W10 书面记录 = `Re/1st_test/` n=10；打印 `result_interview.md` Summary。

---

## Week 11（重点周 · 个人分工）

### Q1 — 前几轮测试如何进入终版

**Shihao:**（节选）

Our iterative testing programme moved from low-fi cards to mid-fi… then hi-fi…
…recovery confused with health / general "getting better"…
…co-moved → causal over-claim…
…trust score ≠ reading provenance…
We translated these findings into: domain badges, chips, constrained AI layer, multi-slot comparison, citation string, **four-layer provenance drawer**, trust gate, search, 3D/2D switch…
…**My own scope, the source panel and multi-region comparison**, directly maps to cross-round findings on traceability and numeric argumentation.

### Q2 — Week 13 前具体行动（Tutor 可逐条对照）

**Shihao:**

1. Upgrade source drawer to **four layers** + trust gate (limitation required before trust score).
2. **Multi-region comparison** MVP: two slots, aligned years, highlight 2020 GDP gap, copyable citation string; migrate ECONOMIC/HEALTH badges to post-click sidebar.
3. Allow **back-navigation** to revise country/year/draft after limits/causation reflection.
4. Team **AI governance** one-pager; per-feature sheet: RQ → test → design → screenshot.
5. Short session with 3–5 participants if time permits.

**团队分工（同周 Ruonan 所写）**：Jia leads **data source disclosure and comparing regions**.

**面试一句**：W11 Q2 = 现场演示来源框 + 对比的 checklist；证据 `3rd_test/result.md`、`5.8meeting/meeting-summary.md`。

---

## Week 12

> 本周在 `weekly_activity.md` 中为 **Your Answer**（无 `Shihao:` 标签），内容为你个人撰写。全文约 **915–1567 行**；本摘录为面试可翻页的压缩版。

### Q1 — 多方向分叉：选了哪条路？对不对？

**决策点（Week 8 后）**

四原型：P1 Dashboard / P2 Immersive / P3 Simulator / **P4 3D Globe**。

三条路径：

- **Path A**：继续 globe-first（P4）  
- **Path B**：interpretation-first，合并 **Option A（guided comparison）+ Option B（narrative evidence flow）**；globe **降为主研究仪器**  
- **Path C**：四原型并行打磨 → **拒绝**（稀释验证、RQ2 无法回答）

**你选：Path B**（个人研究线 mokbase）；团队终版仍保留地球作展示入口（见 `06_团队方案vs个人迭代.md`）。

**迫使选择的证据**

| 来源 | 要点 |
| --- | --- |
| W6 | 开放任务「探索地球」→ 导航数据多、含义数据少；混合任务无法归因 |
| W8 问卷 n=4 | 多人给 P4 高分；**Respondent 3：favorite=P1，best for relationship=P4** → **偏好≠理解** |
| A01 + 文献 | 问题从 visualization → **interpretation + traceability** |
| Gap matrix | 「更交互=更理解」等假设 **未被** 偏好分数验证 |

**Path B 内二次分叉**

- v1：**四屏顺序流**（Primer → 对比 → 解释 → 信任）→ 2nd test：**primer 可被 <15s 跳过**、换屏摩擦、开放题引用衰减 → **拒绝**  
- v2：**单页渐进画布** + 常驻 **ECONOMIC/HEALTH badge** + chip → 3rd test：**0/6 健康误读**，**6/6** 解释含数字，**6/6** trust 前先写局限

**是否选对？（你文中的判断）**

- **对**：对齐 tutor、W6 失败模式、W8 分叉、文献；可测 RQ1–RQ3。  
- **保留不确定性**：未充分测「globe 总览 + 引导面板」混合；Week 8 n=4 仅为方向性；样本多为课程同伴。  
- **结论句**：interpretation-first 作为**主验证载体**是对的；不等于永久抛弃空间探索。

---

### Q2 — 考虑过但拒绝的方案（速查表）

**Stage 1（四原型后）**

| 拒绝 | 主要原因 |
| --- | --- |
| Globe-first 主产品 | W6 缺解读证据；A01 solution-first；偏好≠理解 |
| Immersive-only | 弱可追溯、难引用数字 |
| Simulator-only | 易暗示因果；与「解读公开数据」任务不符 |
| 纯静态 dashboard | 无强制边界/来源/引用 |
| 四原型并行 showcase | 资源与 RQ2 |
| 只选 A 或只选 B 不合并 | 缺对比结构或缺分步反思 |

**Stage 2–3（mid/hi-fi）**

| 拒绝 | 证据 |
| --- | --- |
| 四屏 + 可跳过 Primer 门 | 2nd test n=8：合规剧场、S07「四屏太多」 |
| 仅改 Primer 文案 | 机制错而非措辞错 |
| 纯选择题边界 | 选对但开放题仍写因果 |
| 无门槛 trust 分 | 与来源阅读脱钩 |
| 空白开放题 | 结构化任务有数字、开放题变模糊 |
| 信任门槛仅 50 字 | 长度≠质量 |
| 研究表强制引用 | 混淆测量与干预 |
| 回到多屏 Tab | 2nd test 已证摩擦 |
| 被动因果警告 | 易被忽略 |
| 预测/自动政策建议 | 超出 scope |

**最终接受（一句）**：interpretation-first **渐进引导画布** — 域标签、按需定义、强制数字引用、建构式边界自检、**来源门控 trust**、**偏好最后收集**。

---

### Q3 — 谁受益 / 谁受损 / 如何缓解

**主要受益**

- 非专家学生（DECO/POLS/ECON 等）：需 **有依据地论证** COVID–经济联动。  
- 证据：recovery 误读 **3/10 → 0/6**；**6/6** 含数字；**5/6** 非因果用语（3rd test）。  
- 中等熟悉度、愿跟流程者（S01/S02/S05 类）受益最大。

**可能受损或排除**

- 计量/流行病**专家**（scope 外，脚手架显啰嗦）  
- **极低数据素养**（S03：跳过 primer、trust=5 看品牌；gate 后仍最短局限）  
- **无障碍/色觉/前庭**（徽章色、分层、曾报 3D 不适）  
- **ESL**（全英学术模板）  
- **仅国家聚合**掩盖行业/劳工不平等（英澳固定对比）  
- **低带宽/旧设备**（W5 已写重界面排斥）  
- **只想快速浏览**的用户（强制写局限与解释）

**已在设计中的缓解**

- 偏好与理解分离；域 badge + chip；建构式边界；trust gate；明确不做预测/政策自动化；渐进披露（R4）。

**建议后续（你文中 Part 3）**

- 无障碍审计、非色编码、简化模式、多语言/plain language  
- 自适应路径、局限 scaffold（非 50 字凑数）  
- 扩展国家/报告质量标记、不平等提示  
- 横幅：仅用于课程学习、非医疗/政策决策  
- 扩大样本与 ESL/低素养子组分析  

**面试一句**：Week 12 把 W4–5 伦理担忧和 W10–11 测试数字，收束成 **公平的受益/伤害分析**，不是只讲功能列表。

---

**打印建议**：Q1+Q2 摘要各 1 页；Q3 受益/受损表 1 页；若 tutor 深挖某条「拒绝方案」，翻 `weekly_activity.md` **L1029–1331** 原文。

---

## 附：面试「对齐句」模板

> Week __ 我在 weekly activity 里写的是 ______；之后用 ______（测试/文献）验证了这一点；所以在终版里做了 ______；原始记录在夹册第 __ 页。

| 主题 | Week | 打印页 |
| --- | --- | --- |
| Recovery 健康误读 | W10 | 本册 W10 + `1st_test/result_interview.md` |
| 7/10 比较 UK 更深 | W10 | 本册 W10 + 同上 |
| 旋转 / 搜索 | W7 | 本册 W7 + `5.8meeting` |
| 来源 + trust gate | W11 | 本册 W11 + `3rd_test/result.md` |
| 个人分工 | W11 | `5.8meeting` + 团队截图 |

---

*生成说明：摘自 `weekly_activity.md` 中 **Shihao:** / **Shihao** 段落；与 [10_每周作业与学习轨迹](./10_每周作业与学习轨迹（weekly_activity）.md) 及 `Re/` 证据库交叉索引。*

# Solution 6: Literature + Argument Chain (Claim-Evidence Table)

> Task from `research_problem_plan_checklist.md` — Step 6  
> Built upon: `solution2.md` (users) + `solution3.md` (problem) + `solution4.md` (RQs) + `solution5.md` (methods)  
> Evidence sources: `literature/literature_list.md`

---

## Coverage Check

| Required Coverage                                         | Covered by     | References                   |
| --------------------------------------------------------- | -------------- | ---------------------------- |
| COVID and economy linkage background                      | Category 1     | #1, #2, #3                   |
| Data comprehension / risk communication problems          | Category 2     | #4, #5, #6, #7               |
| Target user information understanding behaviour           | Category 4 + 5 | #11, #12, #13, #14, #15, #16 |
| Methodological justification (why these research methods) | Category 2 + 3 | #7, #8, #10                  |

All four required coverage areas are addressed. ✓

---

## Claim-Evidence Table

Each row contains:

- **Claim** — a specific argument used in our problem framing, user definition, or design justification
- **Source** — specific reference (number from `literature_list.md`)
- **What this source supports** — one sentence
- **Boundary** — one sentence on what it does NOT prove

---

### Block A: Background — COVID-Economy Linkage Is Real and Complex

| #   | Claim                                                                                                                | Source                                    | What it supports                                                                                                                           | Boundary                                                                                                      |
| --- | -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| A1  | COVID-19 caused nationally differentiated economic shocks and recovery trajectories                                  | Ref #1 (Chetty et al., NBER/QJE, 2024)    | Cross-country economic impact data is valid, complex, and non-uniform, justifying multi-country comparison as a meaningful analytical task | Does not prove users can interpret this complexity without scaffolding                                        |
| A2  | Different countries and sectors experienced divergent economic impact from COVID-19                                  | Ref #2 (Frontiers in Public Health, 2024) | Supports the need for country-level and sector-level breakdown in the design                                                               | Does not cover subjective user perception of these differences                                                |
| A3  | Economic recovery metrics vary because of structural factors (labour productivity, policy), not only infection rates | Ref #3 (OECD, 2022)                       | Justifies showing multiple economic indicators rather than a single GDP line                                                               | Does not support the claim that users can distinguish these structural factors from visual presentation alone |

---

### Block B: User Pain — Non-Expert Users Systematically Misread This Data

| #   | Claim                                                                                                                                          | Source                            | What it supports                                                                                       | Boundary                                                                                                                      |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| B1  | Users, including educated ones, misread dynamic COVID time-series data — particularly conflating daily new cases with cumulative/active levels | Ref #4 (Scientific Reports, 2021) | Directly evidences the specific misreading pattern most relevant to our time-series interface          | Study focused on risk perception and public health attitude change, not academic argument quality or student coursework tasks |
| B2  | Information-source habits correlate with systematic COVID misperception                                                                        | Ref #5 (PMC/PubMed, 2023)         | Supports secondary user pain: trust and source framing affect understanding quality                    | Correlation, not causation; does not prove that better source labelling alone fixes misperception                             |
| B3  | Non-expert users require scaffolded interpretation, not raw data; widespread numerical misunderstanding exists across user groups              | Ref #6 (Europe PMC, 2021)         | Directly supports the core problem reframe: the issue is interpretation support, not data availability | Study focused on numerical/statistical concepts broadly; not specifically on health-economy linkage or visualisation tools    |
| B4  | Format choice (graphic vs numeric) materially affects cognitive load and decision quality for non-experts                                      | Ref #7 (PMC, 2023)                | Justifies why design format matters for our primary user; different representations are not equivalent | Study used statistical representations generally; results may not transfer directly to complex cross-indicator dashboards     |

---

### Block C: User Definition — Primary User Group Is Evidenced

| #   | Claim                                                                                                                | Source                                        | What it supports                                                                                           | Boundary                                                                                                    |
| --- | -------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| C1  | Lower domain knowledge increases cognitive load and reduces decision quality when processing economic visualisations | Ref #11 (CBS Research, 2022)                  | Directly evidences the primary user's core weakness in the interpretation task                             | Study used financial (not epidemiological) data; effect sizes may differ for health-economy linked displays |
| C2  | Current economic visualisation tools lack analytical interaction for novice users, creating an interpretation gap    | Ref #12 (FHP, 2022)                           | Supports the design opportunity argument: existing tools do not solve the interpretation gap for our users | Based on general public, not students specifically; coursework context may differ from casual exploration   |
| C3  | Visualisation + guided text outperforms text-only in improving economic comprehension for general users              | Ref #13 (ERIC, 2021)                          | Supports the necessity of visual design intervention over text-only approaches                             | Study context was financial literacy education, not COVID-economy narrative understanding                   |
| C4  | Students in economics-adjacent courses develop stronger analytical argument skills through visual tasks              | Ref #14 (Journal of Economics Teaching, 2022) | Validates the primary user group and their specific need: producing evidence-backed arguments              | Infographic assignment context; transfer to interactive dashboard use is not directly demonstrated          |

---

### Block D: Design Justification — Guided/Narrative Structure Improves Student Outcomes

| #   | Claim                                                                                                          | Source                                        | What it supports                                                                                     | Boundary                                                                                                   |
| --- | -------------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| D1  | Narrative + data structures improve student confidence and motivation when engaging with complex economic data | Ref #15 (Journal of Economics Teaching, 2023) | Supports prototype Option B (narrative evidence flow) as a justified design direction                | Improvement measured in coursework context; does not prove superiority over dashboard format for all users |
| D2  | Interactive model visualisation helps students approach economic problems more like experts                    | Ref #16 (IREE, 2024)                          | Supports design requirement R1 (interpretation clarity) and justifies interactive format over static | Effect is scaffolded and course-specific; requires deliberate task design, not just adding interactivity   |

---

### Block E: Trust and Transparency — Source Framing Affects User Judgement

| #   | Claim                                                                                                                      | Source                              | What it supports                                                                                    | Boundary                                                                                                       |
| --- | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| E1  | Trust in visualisation is multidimensional: cognitive + affective, design-specific + data-specific                         | Ref #8 (Vistrust, IEEE/arXiv, 2023) | Justifies multi-dimensional trust measurement in RQ3 and design requirement R3                      | Framework is empirical but not domain-specific to COVID-economy data; trust dimensions may vary in our context |
| E2  | Specific design choices (colour, bar style, font) shift perceived credibility independently of data accuracy               | Ref #9 (PubMed/IEEE VIS, 2025)      | Directly supports design requirement R3: visual design decisions have measurable trust consequences | Context-dependent; effect sizes vary with data type and audience prior knowledge                               |
| E3  | Trust dimensions framework (credibility, clarity, reliability, familiarity, confidence) can structure prototype evaluation | Ref #10 (arXiv, 2023)               | Provides measurement structure for trust-related testing in RQ3                                     | Framework developed for general visualisation; adaptation needed for health-economy specific trust signals     |

---

### Block F: Method Justification — Why These Research Methods

| #   | Claim                                                                                           | Source                                          | What it supports                                                                                       | Boundary                                                                                                              |
| --- | ----------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| F1  | Interpretation correctness cannot be reliably captured by preference ratings alone              | Ref #7 (PMC, 2023) + Ref #12 (FHP, 2022)        | Justifies using interpretation tasks (not just surveys) as the primary evidence method for RQ1 and RQ2 | Does not prescribe a specific task format; task design choices remain a methodological decision                       |
| F2  | Trust calibration requires paired confidence + correctness measurement, not single-item ratings | Ref #8 (Vistrust, 2023) + Ref #10 (arXiv, 2023) | Justifies the boundary identification task paired with trust rating in RQ3                             | Multi-item trust instruments require validation; our adapted instrument is not yet validated in this specific context |

---

## How to Use This Table in Submission

- When writing a design claim, cite the specific row (e.g., "Claim B1") and include the boundary sentence.
- Do NOT cite multiple references together in one sentence without explaining what each contributes.
- Format: "[Claim], supported by [Author, Year]. Note: this does not prove [boundary statement]."
- Every major argument in the final report must trace to at least one row in this table.

---

## 中文版

### 核心使用规则

- **不要**把多篇文献堆在一句话里，每篇文献只支持一个具体主张。
- 每条主张必须附带"边界说明"——它不支持什么。
- 格式：「[主张]，由[作者，年份]支持。注意：这不能证明[边界]。」

### Block A 背景——COVID-经济联动真实且复杂

| 主张                                                                    | 来源                              | 支持内容                                                           | 边界                                           |
| ----------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------- |
| A1 COVID-19 引发了各国差异化的经济冲击与复苏                            | 参考文献 #1 (Chetty et al., 2024) | 跨国经济影响数据真实、复杂且不均匀，支持将跨国比较设为核心用户任务 | 不能证明用户无需支撑就能解读这种复杂性         |
| A2 不同国家和行业的经济影响差异显著                                     | 参考文献 #2 (Frontiers, 2024)     | 支持在设计中提供国家和行业层级的分解                               | 不涉及用户对这些差异的主观感知                 |
| A3 经济复苏指标受结构性因素影响（劳动生产率、政策），而非仅由感染率决定 | 参考文献 #3 (OECD, 2022)          | 支持展示多个经济指标而非单一 GDP 折线                              | 不支持用户仅凭可视化展示就能区分这些结构性因素 |

### Block B 用户痛点——非专业用户系统性地误读数据

| 主张                                                                                  | 来源                                   | 支持内容                                               | 边界                                                       |
| ------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------ | ---------------------------------------------------------- |
| B1 用户（包括受过教育的用户）误读动态 COVID 时序数据，尤其混淆每日新增与累计/现存病例 | 参考文献 #4 (Scientific Reports, 2021) | 直接证明与我们时间轴界面最相关的具体误读模式           | 研究聚焦风险认知，而非学术论证质量或学生课程任务           |
| B2 信息来源习惯与系统性 COVID 误解相关                                                | 参考文献 #5 (PMC, 2023)                | 支持次要用户痛点：来源框架影响理解质量                 | 是相关性而非因果关系；不能证明更好的来源标注能单独解决误解 |
| B3 非专业用户需要解读支撑而非原始数据                                                 | 参考文献 #6 (Europe PMC, 2021)         | 直接支持核心问题重构：关键在于解读支撑，而非数据可用性 | 研究聚焦统计数字理解，而非健康-经济联动可视化              |
| B4 图形与数字呈现方式的选择，会实质影响非专业人士的认知负荷与决策质量                 | 参考文献 #7 (PMC, 2023)                | 支持设计格式对我们主要用户的重要性                     | 研究使用统计呈现（非复杂跨指标仪表盘），效应大小可能不同   |

### C 部分：用户定义 — 主要用户组已得到证实

| # | 论点 | 来源 | 支持内容 | 边界 |

|---|---|---|---|---|---|

| C1 | 领域知识水平较低会增加认知负荷，降低处理经济可视化图表时的决策质量 | 参考文献 #11 (CBS Research, 2022) | 直接证明了主要用户在解读任务中的核心弱点 | 该研究使用了金融数据（而非流行病学数据）；对于与健康经济相关的图表，效应量可能有所不同 |

| C2 | 当前的经济可视化工具缺乏针对新手用户的分析交互，造成了解读上的鸿沟 | 参考文献 #12 (FHP, 2022) | 支持设计机会论点：现有工具无法解决我们用户的解读鸿沟 | 基于普通公众，而非专门针对学生；课程作业环境可能与休闲探索有所不同 |

| C3 | 对于普通用户而言，可视化+引导式文本在提升经济理解方面优于纯文本 | 参考文献 #13 (ERIC, 2021) |支持视觉设计干预的必要性，而非仅依赖文本的方法 | 研究背景为金融素养教育，而非对新冠疫情经济叙事的理解 |

| C4 | 经济学相关课程的学生通过视觉任务培养更强的分析论证能力 | 参考文献 #14（《经济学教学杂志》，2022） | 验证了主要用户群体及其具体需求：生成有证据支持的论证 | 信息图表作业背景；未直接展示其向交互式仪表板使用的迁移 |

### D 部分：设计论证——引导式/叙事式结构提升学生学习成果

| # | 论点 | 来源 | 支持内容 | 范围 |

|---|---|---|---|---|

| D1 | 叙事式数据结构提升学生在处理复杂经济数据时的信心和积极性 | 参考文献 #15（《经济学教学期刊》，2023） | 支持原型方案 B（叙事式证据流）作为合理的设计方向 | 改进效果在课程作业情境中衡量；但并未证明其对所有用户都优于仪表盘格式 |

| D2 | 交互式模型可视化帮助学生更像专家一样解决经济问题 | 参考文献 #16（IREE，2024） | 支持设计要求 R1（清晰的解释），并证明交互式格式优于静态格式 | 效果是分阶段的，且与课程相关；需要精心设计任务，而不仅仅是增加交互性 |

---

### 模块 E：信任与透明度 — 信息来源框架影响用户判断

| # | 主张 | 来源 | 支持内容 | 边界 |

|---|---|---|---|---|

| E1 | 对可视化的信任是多维的：认知 + 情感，设计相关 + 数据相关 | 参考文献 #8 (Vistrust, IEEE/arXiv, 2023) | 为研究问题 3 中的多维信任测量和设计要求 R3 提供了依据 | 该框架基于经验，但并非专门针对 COVID-19 经济数据；信任维度在我们的情境中可能有所不同 |

| E2 | 特定的设计选择（颜色、条形样式、字体）会独立于数据准确性而改变用户感知的可信度 | 参考文献 #9 (PubMed/IEEE VIS, 2025) | 直接支持设计要求 R3：视觉设计决策具有可衡量的信任后果 | 取决于情境；效应量随数据类型和受众先验知识而变化 |

| E3 |信任维度框架（可信度、清晰度、可靠性、熟悉度、信心）可用于构建原型评估 | 参考文献 #10 (arXiv, 2023) | 为研究问题 3 中的信任相关测试提供测量结构 | 该框架为通用可视化而开发；需要针对卫生经济特定信任信号进行调整 |

### F 部分：方法论证——为何选择这些研究方法

| # | 主张 | 来源 | 支持的研究内容 | 边界 |

|---|---|---|---|---|---|

| F1 | 仅凭偏好评级无法可靠地捕捉解释的正确性 | 参考文献 #7 (PMC, 2023) + 参考文献 #12 (FHP, 2022) | 论证了使用解释任务（而不仅仅是调查问卷）作为研究问题 1 和 2 的主要证据方法的合理性 | 未规定具体的任务形式；任务设计选择仍属于方法论决策 |

| F2 | 信任校准需要配对的置信度 + 正确性测量，而非单项评级 | 参考文献 #8 (Vistrust, 2023) + 参考文献 #10 (arXiv, 2023) | 论证了在研究问题 3 中将边界识别任务与信任评级相结合的合理性 | 多项信任工具需要验证；我们改编的工具尚未在此特定背景下进行验证 |

---

## 如何在提交中使用此表格

- 撰写设计主张时，请引用具体行（例如，“主张 B1”），并包含边界语句。

- 请勿在未解释每条参考文献贡献的情况下，将多个参考文献放在同一句话中。

- 格式：[主张]，由[作者，年份]支持。注意：这并不证明[边界语句]。

- 最终报告中的每个主要论点都必须至少与此表格中的一行相对应。

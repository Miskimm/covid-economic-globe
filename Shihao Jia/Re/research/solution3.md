# Solution 3: Problem Statement v2 (Evidence-Based)

> Task from `research_problem_plan_checklist.md` — Step 3  
> Built upon: `solution2.md` (user and context definition)  
> Evidence sources: `literature/literature_list.md`

---

## Background

The COVID-19 pandemic triggered unprecedented, globally differentiated health and economic consequences. National GDP growth rates shifted by 5–10 percentage points within a single year, while infection trajectories varied sharply across countries and time periods (Ref: #1, #3). This created a unique situation where understanding the relationship between health shocks and economic outcomes became directly relevant to students, citizens, and policy-adjacent learners.

Despite the availability of public datasets and online dashboards, research consistently shows that non-expert users — including university students in economics, policy, and design courses — struggle to correctly interpret cross-indicator, cross-country, and time-series data (Ref: #4, #6, #12). Existing tools prioritise raw data access or visual spectacle but provide insufficient scaffolding for interpretation, argument formation, and uncertainty awareness.

---

## Target Users

**Primary:** Students in policy, economics-adjacent, and design courses (e.g., DECO, POLS, ECON, COMM) with moderate domain knowledge but limited systematic data literacy training. They are expected to produce evidence-backed claims about COVID-economy relationships in coursework and presentations.

**Secondary:** General informed public who want to compare countries and time periods without expert tools, but whose trust judgments are susceptible to visual design and source framing (Ref: #8, #9).

*(For detailed user breakdown, see `solution2.md`.)*

---

## Core Problem

**The problem is not that COVID-economic data lacks visualization.**

The core problem is:

> Students with moderate economics background lack the scaffolding to correctly interpret linked health-economic indicators, form evidence-backed cross-country and cross-time comparisons, and distinguish observable correlations from causal claims — leading to weak, unsupported, or incorrect academic arguments.

This problem is evidence-grounded:
- Users systematically misread dynamic COVID time-series data, especially when shifting between daily and cumulative metrics (Ref: #4).
- The "gulf of interpretation" between data designer intent and user understanding is well-documented for non-expert economic data users (Ref: #12).
- Cognitive load from unfamiliar multi-variable displays reduces decision quality, particularly for students with lower domain expertise (Ref: #11).
- Users frequently over-express confidence in conclusions not supported by the data they actually viewed (Ref: #6).

---

## Why Design Intervention Is Necessary

Current approaches fail primary users in specific, testable ways:

| Current Tool Type | Specific Failure for Primary User |
|---|---|
| Raw data dashboards (e.g., World Bank, OWID) | No interpretation scaffolding; overwhelming for non-experts |
| News-style charts | Simplified to the point of removing nuance; no source or uncertainty framing |
| Academic datasets | Require prior econometric knowledge to interpret correctly |
| General visualization tools | Not designed for health-economy linkage interpretation or argument support |

A design intervention is justified if and only if it directly addresses:
1. interpretation scaffolding (help users understand what indicators mean);
2. comparison support (structure for cross-country, cross-time tasks);
3. evidence traceability (link between claim and visible data);
4. uncertainty framing (distinguish what can and cannot be concluded).

This is supported by evidence that guided visualization structures improve student economic comprehension and analytical confidence (Ref: #13, #15, #16).

---

## Scope Boundary

**In scope:**
- Interpretation support for health-economic indicators across countries and time periods.
- Evidence traceability for comparative claims.
- Source state and uncertainty visibility.
- Testing whether users can correctly explain indicators and comparisons.

**Out of scope:**
- Epidemiological forecasting or modelling.
- Automated policy recommendation.
- Causal inference claims beyond observed dataset patterns.
- High-fidelity production build at this stage.

---

## Success Criteria (Measurable, Pre-Prototype)

1. At least 70% of primary users can correctly explain a key metric (e.g., "GDP vs 2019 baseline") in plain language without facilitator correction.
2. At least 60% of primary users can compare two countries across two time points with traceable evidence from the interface.
3. At least 60% of primary users correctly identify that observed health-economy alignment is correlation, not automatic causation.
4. User "interface preference" ratings and "interpretation correctness" scores are collected and reported separately — not conflated.

---

## Problem Statement (One-Sentence Summary)

> Students with moderate domain knowledge lack reliable tools to interpret linked COVID-19 health and economic indicators, form evidence-backed comparative arguments, and understand data uncertainty — resulting in weak and often incorrect claims in academic and professional contexts.

---

## 中文版

### 背景

COVID-19 疫情引发了全球性、差异化的健康与经济后果。各国 GDP 增速在单一年度内出现 5–10 个百分点的急剧变化，而感染轨迹也因国家和时间段的不同而差异显著（参考文献：#1、#3）。在此背景下，理解健康冲击与经济结果之间的关系，对于学生、公众以及政策学习者而言变得尤为重要。

尽管公开数据集和在线数据看板已广泛可得，但研究持续表明，非专业用户——包括就读于经济、政策和设计类课程的大学生——在正确解读跨指标、跨国家、跨时序数据方面仍存在系统性困难（参考文献：#4、#6、#12）。现有工具偏重原始数据展示或视觉效果，但在解读支撑、论证形成和不确定性认知方面支持不足。

### 核心问题

**问题不在于缺乏可视化工具。**

核心问题是：

> 具备一定经济学背景的学生，缺乏可靠的辅助机制来正确解读健康与经济的联动指标，形成有证据支撑的跨国、跨时间比较，并区分可观察到的相关性与因果关系——最终导致学术论证薄弱、缺乏依据甚至出现错误。

### 机会点

当且仅当设计方案能直接解决以下四点时，介入才有意义：
1. **解读支撑**：帮助用户理解指标含义；
2. **比较结构**：为跨国、跨时间任务提供框架；
3. **证据可追溯性**：论点与可见数据之间有清晰关联；
4. **不确定性框架**：明确区分"可以得出的结论"与"不能得出的结论"。

### 范围边界

**纳入范围：** 跨国、跨时间的健康-经济指标解读支持；比较性论据的证据追溯；数据来源与不确定性可见性；解读正确性测试。

**不纳入范围：** 流行病学预测建模；自动政策推荐；超出数据集范围的因果推断；高保真生产级构建。

### 成功标准（可测量）

1. 至少 70% 的主要用户能在没有引导员纠正的情况下，用通俗语言正确解释核心指标（如"相较 2019 年基准的 GDP 变化"）。
2. 至少 60% 的主要用户能利用界面中的可见证据，对两个国家在两个时间点进行有依据的比较。
3. 至少 60% 的主要用户能正确识别：健康与经济的同向变化是相关性，而非必然的因果关系。
4. 用户的"界面偏好"评分与"解读正确性"得分需分开收集与报告，不可混淆。

### 一句话总结

> 具备一定领域知识的学生缺乏可靠工具来解读 COVID-19 健康与经济联动指标、形成有证据支持的比较性论点并理解数据的不确定性——导致其在学术和专业情境中的论证薄弱且常出现错误。

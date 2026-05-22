好，下面给你一份可以直接照着画的 **Low-fi Wireframe 文本草图**（3页），对应你刚才的 pre-prototype 访谈流程。

---

## Screen 1 — Indicator Meaning Page（指标解释页）

**目的**：先让用户正确理解两个核心指标，避免后面任务都建立在误读上。

**布局（从上到下）**

1. Title: `COVID-19 x Economy: How to Read the Metrics`
2. Block A: `GDP vs 2019`
    - One-line meaning: “Current GDP growth compared with pre-pandemic baseline (2019).”
    - Example row:
        - `Country X: -4.5pp`
        - `Interpretation: 4.5 percentage points lower than 2019 growth.`
3. Block B: `Recovery vs 2020`
    - One-line meaning: “Current GDP growth compared with 2020 trough year.”
    - Example row:
        - `Country X: +6.2pp`
        - `Interpretation: 6.2 percentage points higher than 2020 level.`
4. Block C: `What this DOES NOT mean`
    - “Does not prove direct causation between cases and GDP.”
    - “Does not represent total GDP size.”
5. Quick check question area:
    - `Q1: Which metric tells pre-pandemic gap?`
    - `Q2: Which metric tells post-trough rebound?`

---

## Screen 2 — Country-Time Comparison Page（对比任务页）

**目的**：测试用户是否能“用证据比较”，而不是只给主观看法。

**布局（左右两列 + 底部结论区）**

1. Top controls (static in low-fi):
    - `Country A` dropdown (mock)
    - `Country B` dropdown (mock)
    - `Time 1` and `Time 2` labels
2. Left panel: Country A snapshot
    - Cases (T1/T2)
    - GDP vs 2019 (T1/T2)
    - Recovery vs 2020 (T1/T2)
3. Right panel: Country B snapshot
    - same structure
4. Bottom: `Evidence-based conclusion box`
    - Prompt 1: “Which country had deeper economic shock?”
    - Prompt 2: “Which value supports your answer?”
    - Prompt 3: “What can’t be concluded from this comparison?”

**访谈观察重点**

- 用户是否引用具体数值
- 是否混淆“相关 vs 因果”
- 是否只看健康或只看经济一侧

---

## Screen 3 — Trust & Source Transparency Page（来源与可信度页）

**目的**：测用户信任是否“有依据”，不是“看着舒服就信”。

**布局**

1. Title: `Before You Trust the Conclusion`
2. Source card
    - Data source list (mock): `WHO / World Bank / OurWorldInData`
    - Last updated date
    - Missing data note
3. Method card
    - “How indicators are computed” (1-2 lines each)
    - “Limitations” section (bullet)
4. Boundary reminder banner
    - “Observed alignment ≠ proven causation”
5. User check section
    - Trust score 1–5
    - “What additional information would you need to trust this?”

---

## 低保真制作规范（你们组直接执行）

- 每页只保留一个主任务（不要混很多功能）
- 每个页面最多 3 种视觉层级（标题/关键值/说明）
- 所有文本先用 plain language，避免术语堆叠
- 每页必须有 `What this does not mean` 或同等边界提示

---

## 你们做完后可以立刻测的 3 个问题

1. 用户能否在 30 秒内说对两个指标的差别？
2. 用户做比较时是否能引用“具体证据值”？
3. 用户是否能说出至少 1 条“这个数据不能证明什么”？

---

如果你要，我下一条可以给你这三页的 **ASCII 草图版本**（像方框布局图），你可以直接照搬到 Figma。

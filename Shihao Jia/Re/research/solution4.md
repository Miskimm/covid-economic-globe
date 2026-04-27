# Solution 4: Map-the-Gap / Rumsfeld Matrix + Research Questions

> Task from `research_problem_plan_checklist.md` — Step 4  
> Built upon: `solution2.md` (user & context) + `solution3.md` (problem statement)  
> Evidence sources: `literature/literature_list.md`

---

## Known Knowns（已知事实）

Things we can state with evidence:

- COVID-19 caused nationally differentiated GDP shocks and recovery trajectories (Ref: #1, #2, #3).
- Non-expert users, including students with moderate economics background, systematically misread dynamic time-series COVID data (Ref: #4).
- The "gulf of interpretation" — gap between data designer intent and user understanding — exists for non-expert economic data users (Ref: #12).
- Cognitive load from multi-variable visualizations reduces decision quality in non-experts (Ref: #11).
- Users over-express confidence in unsupported conclusions when using data visualization tools (Ref: #6).
- Trust in visualizations is multidimensional and influenced by both design features and source attribution (Ref: #8, #9).
- Guided and narrative-structured visualizations improve student comprehension of economic data (Ref: #15, #16).
- Our survey (n=4) shows prototype preference varies across formats, but preference data alone cannot confirm comprehension quality.

---

## Known Unknowns（已知但缺证据的问题）

We know these gaps exist but do not yet have evidence for our specific user group and context:

- Which prototype format (dashboard / narrative / simulator / globe) produces the **highest interpretation accuracy** — not just preference — for our primary user?
- Which specific indicators (e.g., "GDP vs 2019 baseline" vs "recovery vs 2020 trough") are most commonly misunderstood, and in what ways?
- What level of source transparency and uncertainty framing is sufficient for users to accurately calibrate their confidence?
- Do students conflate health-economy correlation with causation more in free-exploration interfaces versus guided-narrative ones?

---

## Unknown Unknowns（潜在未知风险）

Things we have not yet identified as problems but may emerge in testing:

- Students may impose their own prior assumptions (e.g., from news media) onto the visualization, bypassing the designed interpretation scaffolding entirely.
- Certain visual interaction patterns (e.g., 3D globe rotation) may introduce spatial confusion that is invisible to designers but significant to users.
- Cultural or linguistic variation in interpreting economic terms like "shock" or "recovery" may produce systematic misreadings we have not anticipated.
- Users may selectively attend to only one indicator (health OR economic) and construct a false sense of full understanding from partial data.

---

## Assumptions to Validate（关键假设）

| # | Assumption | Risk if Wrong | How to Validate |
|---|---|---|---|
| A1 | More immersive/interactive interfaces produce better understanding | High — we may over-invest in 3D/simulation features that don't improve comprehension | Separate "preferred" and "correctly understood" measures in testing |
| A2 | Showing more metrics increases analytical confidence and accuracy | Medium — cognitive overload may actually reduce accuracy | Compare interpretation quality in rich-panel vs simplified views |
| A3 | Inline metric definitions are read and used by users | High — if users skip them, our interpretation scaffolding is ineffective | Track whether users reference definitions before answering comprehension tasks |
| A4 | Users can identify correlation vs causation if the interface frames it clearly | Medium — prior media exposure may override interface framing | Include explicit boundary identification tasks in test protocol |
| A5 | Primary users' needs generalise across DECO, POLS, ECON, COMM courses | Low-medium — discipline differences in argument culture may affect what "evidence-backed" means | Sample across at least two course types |

---

## Derived Research Questions (RQ1–RQ3)

All three are verifiable through controlled testing and structured data collection.

### RQ1 — Interpretation Validity
**How accurately can primary users explain the relationship between selected health and economic indicators across country and time comparisons, and which indicator types produce the most frequent misreadings?**

- Addresses: Known Unknown #1 and #2
- Invalidates/validates: Assumption A1, A2
- Method: Interpretation task (explain "GDP vs 2019," "recovery vs 2020" in plain language; compare two countries with cited evidence)
- Metric: Correctness score (per-task 0/1 criteria); error pattern categorisation

### RQ2 — Format-Comprehension Fit
**Which prototype interaction format produces the highest interpretation accuracy for primary users, independent of stated preference?**

- Addresses: Known Unknown #1; Unknown Unknown (selective attention)
- Invalidates/validates: Assumption A1, A2
- Method: Cross-format comparative testing with matched tasks; preference score collected after (not before) comprehension tasks
- Metric: Comprehension score per format; preference-comprehension divergence index

### RQ3 — Trust and Uncertainty Calibration
**How do source transparency cues and uncertainty framing affect users' ability to accurately assess the limits of the data they are interpreting?**

- Addresses: Known Unknown #3
- Invalidates/validates: Assumption A3, A4
- Method: Trust rating + confidence score + boundary identification task (can users identify what the data does NOT prove?)
- Metric: Trust score; confidence-correctness alignment; boundary identification accuracy

---

## RQ–Gap–Method Summary Table

| RQ | Gap Addressed | Key Assumption Tested | Method | Output Metric |
|---|---|---|---|---|
| RQ1 | Known Unknowns #1 #2 | A1, A2 | Interpretation task + error analysis | Correctness score; error categories |
| RQ2 | Known Unknown #1; Unknown Unknown (selective attention) | A1, A2 | Cross-format task test; preference collected last | Comprehension score; divergence index |
| RQ3 | Known Unknown #3 | A3, A4 | Trust rating + boundary identification task | Trust score; confidence-accuracy alignment |

---

## 中文版

### Known Knowns（已知事实）

- COVID-19 导致各国 GDP 冲击与复苏轨迹高度分化（参考文献：#1、#2、#3）。
- 包括具备一定经济学背景的学生在内，非专业用户在解读动态时序 COVID 数据时存在系统性错误（参考文献：#4）。
- 数据设计者意图与用户实际理解之间的"解读鸿沟"在非专业经济数据用户中已有充分记录（参考文献：#12）。
- 多变量可视化带来的认知负荷会降低非专业人士的决策质量（参考文献：#11）。
- 用户在使用数据可视化工具时，常对数据实际不支持的结论表现出过度自信（参考文献：#6）。
- 可视化的信任度受设计特征和来源归属的双重影响（参考文献：#8、#9）。
- 引导式与叙事结构的可视化能提升学生对经济数据的理解（参考文献：#15、#16）。
- 我们的问卷（n=4）表明不同原型格式的偏好存在差异，但偏好数据本身无法证明理解质量。

### Known Unknowns（已知但缺证据的问题）

- 哪种原型格式的**解读准确率**最高（不是偏好）？
- 哪些指标（如"相较 2019 年的 GDP"vs"相较 2020 年低谷的复苏"）最常被误解，以何种方式误解？
- 达到什么程度的来源透明度和不确定性框架，才足以让用户准确校准其自信度？
- 在自由探索界面与引导叙事界面中，学生是否更容易将相关性误判为因果关系？

### Unknown Unknowns（潜在未知风险）

- 学生可能将媒体中的先入为主叠加在可视化上，从而完全绕过设计的解读支撑。
- 某些交互模式（如 3D 地球旋转）可能引入设计者未察觉但对用户显著的空间混乱。
- 对"shock""recovery"等经济术语的文化或语言理解差异，可能导致系统性误读。
- 用户可能只关注一个指标（健康或经济），却误以为自己已全面理解了数据。

### 关键假设（需验证）

| # | 假设 | 若假设错误的风险 | 验证方式 |
|---|---|---|---|
| A1 | 更沉浸/更交互的界面带来更好的理解 | 高——可能在不提升理解的功能上过度投入 | 将"偏好"与"正确理解"分开衡量 |
| A2 | 展示更多指标提升分析自信和准确性 | 中——认知超载可能实际上降低准确性 | 对比信息丰富与简化视图的解读质量 |
| A3 | 用户会阅读并使用内联指标定义 | 高——如果跳过，解读支撑将失效 | 追踪用户是否在回答理解任务前参考了定义 |
| A4 | 如果界面明确标注边界，用户能识别相关vs因果 | 中——媒体先入为主的认知可能覆盖界面框架 | 在测试协议中加入明确的边界识别任务 |

### 研究问题（RQ1–RQ3）

**RQ1 解读有效性**：主要用户能多准确地解释所选健康与经济指标在跨国、跨时间比较中的关系？哪类指标最常出现误读？

**RQ2 格式与理解匹配度**：在不考虑偏好的前提下，哪种原型交互格式能为主要用户带来最高的解读准确率？

**RQ3 信任与不确定性校准**：来源透明度线索和不确定性框架，如何影响用户对数据边界的准确判断？

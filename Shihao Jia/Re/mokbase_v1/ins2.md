下面把 `mokbase` 里这四个文件，和你在 DECO7180 里“已经做到哪一步、接下来课程要的是什么”对齐说明。你可以把它们理解成：**把 low-fi 测试结果翻译成课程真正评分的东西：design rationale、证据链、迭代决策、下一轮可测计划**。

---

## 1. 先对齐：DECO7180 这门课真正在追什么进度

根据你 `od/course_profile_summary.md` 和 `od/lec_summary.md` 的总结，这门课的核心进度不是“写代码”，而是：

1. **Problem framing**：用至少两个 dataset 把问题空间讲清楚，而不是直接跳到可视化方案。
2. **Research question + hypothesis**：问题要可验证，方法要能支撑主张。
3. **Prototype / design artifact**：原型不是最终产品，是用来收集证据的工具。
4. **Testing + reflection**：每周 Design Rationale Capture 要你证明“我为什么这么做、证据是什么、下一步怎么改”。
5. **Showcase**：最后要有一个可交互的 web artifact，但评分重点仍是 rationale 和过程证据。

你现在个人工作里，已经走过：

- A01 后回到 problem define（`plan/`、`research/solution1-7`）
- low-fi 卡片 + `interview-en.html` 自填问卷 + `result*.md` 测试结果

**课程进度的关键转折点**就在这里：你已经从“做 globe”进入“用低保真工具验证解释问题”。

---

## 2. `mokbase/solution8_evidence_synthesis.md` 对应课程进度的哪一段？

它对应 `research_problem_plan_checklist.md` 里你标出的 **Step 8：Synthesize evidence**。

在 DECO7180 的语言里，这一步就是：

> 把测试结果变成“可辩护的设计结论”，而不是一堆用户原话。

它解决 tutor 最常批评的点：**weak evidence-to-claim chain**。  
你这份文件做的事是：

- 把 low-fi 里反复出现的模式总结成 **Key insights**
- 把你之前隐含假设写出来并标记 **Invalidated / weakened**
- 写出 **Remaining unknowns**（下一轮还要测什么）
- 把证据映射成 **Updated requirements**（下一步界面必须改什么）
- 给出 **Prototype direction decision**（继续 / pivot / merge）

所以它和课程进度的关系是：

- 直接支撑 **Design Rationale Capture** 的“本周我学到了什么、证据是什么”
- 也支撑 **Problem Framing / Final report** 里“为什么我们要改方向”
- 更是 **Showcase 前** 你必须能说清楚的“设计决策依据”

一句话：  
**`solution8` 是把 low-fi 从“活动记录”升级成“研究结论”。**

---

## 3. `mokbase/design_brief_after_lowfi.md` 和课程进度有什么关系？

它对应 **Design brief 的迭代版本**：`plan/design_brief_v2.md` 是 tutor 反馈后第一版，而 `design_brief_after_lowfi.md` 是 **加入 low-fi 证据后的第二版**。

在 DECO7180 里，design brief 的角色是：

> 把研究证据翻译成“下一轮必须满足的设计要求”，让团队知道接下来做什么 prototype。

它和课程进度的关系：

- 这是 **从 research 回到 design** 的桥梁文件
- 它把 low-fi 暴露的问题写成 **R1-R6 需求**（指标解释、主动边界检查、来源可追溯、偏好与理解分离等）
- 它直接决定你下一轮 mid-fi 的页面结构和测试任务

一句话：  
**它是“下一轮原型规格说明书”，不是论文背景介绍。**

---

## 4. `mokbase/prototype_direction_decision.md` 和课程进度有什么关系？

这是 **团队层面的方向决策记录**，回答一个非常 DECO7180 的问题：

> 我们下一步到底继续 globe，还是 pivot？

你这份文件的核心结论是：

- **不再以 globe-first 作为主路径**
- **合并 dashboard + narrative flow**
- 解释清楚为什么：low-fi 证明“比较结构有用”，但“指标语义和因果边界仍是最大风险”

它和课程进度的关系：

- 对应 lecture 里强调的 **iteration + rationale**
- 对应 tutor 批评过的 **solution-first** 风险：你现在用证据说明为什么要换方向
- 对应 showcase 前必须有的 **major design decision with justification**

一句话：  
**这是“我们为什么从炫交互转向解释优先”的官方叙事版本。**

---

## 5. `mokbase/next_iteration_plan.md` 和课程进度有什么关系？

这是 **下一轮 iteration 的执行计划**，对应 lecture 里说的：

> hypothesis -> prototype -> test -> new question

它把下一轮变成可执行项目：

- 下一轮 **research question**
- 可验证 **hypotheses H1-H4**
- 明确的 **tasks + measures + pass criteria**
- 一个 **data recording template**（方便你写 weekly rationale）

它和课程进度的关系：

- 直接对接 **Design Rationale Capture** 的每周写作结构：本周测什么、结果是什么、催生什么新问题
- 对接 **mid-fi prototype** 和后续 **showcase** 的工程任务分解
- 让你 interview 时能回答：**“你下一步怎么验证？”**

一句话：  
**这是“下一周团队该干什么”的操作手册。**

---

## 6. 这四个文件和你现在 repo 里其它文件夹怎么拼起来？

你可以把整个 repo 理解成一条证据链：

| 阶段 | 你 repo 里的材料 | 课程意义 |
| --- | --- | --- |
| Tutor 反馈驱动的问题重构 | `plan/feedback_audit.md`、`plan/problem_statement_v2.md` | 证明你不是 solution-first |
| 研究问题与方法 | `research/solution1-7`、`plan/gap_matrix_rumsfeld.md` | 证明 RQ 可验证 |
| low-fi 证据收集 | `low-fi wireframe/*`、`result*.md` | 证明你在测 interpretation |
| 证据综合与方向决策 | `mokbase/*`（本次生成） | 证明你能从数据推出设计决策 |
| 下一轮原型与测试 | 你接下来要做的 mid-fi + 新测试 | 走向 showcase |

`mokbase` 四个文件就是 **把 low-fi 结果接到下一轮 prototype 的“齿轮组”**。

---

## 7. 你现在在课程时间线上的位置（用一句话定位）

你已经完成：

> **Problem reframing + research scaffolding + low-fi validation**

你现在进入：

> **Evidence synthesis -> updated design brief -> prototype direction decision -> next iteration testing plan**

这正是 DECO7180 想要的“studio 迭代节奏”，而不是继续堆功能。

---

如果你愿意，我可以用你课程 assessment 的四个大项（Problem Framing / Design Rationale / Showcase / Impact report）逐条对照，告诉你每个 `mokbase` 文件最适合粘贴进哪一份作业里、每一段该怎么引用 `result_interview.md` 的证据编号。
# Agent Context Summary — Session 1

> 读取本文件后，你应该掌握等同于上一个 agent 窗口积累的全部背景知识。  
> 本文件记录的是 Shihao Jia 在 UQ DECO7180（2026 S1）课程的当前项目状态，包括背景、文件结构、已完成工作、当前位置和下一步计划。

---

## 1. 课程背景

- **课程：** Design Computing Studio 1 — Interactive Technology (DECO7180)
- **学校：** University of Queensland (UQ)，Semester 1, 2026（2026-02-23 至 2026-06-20）
- **授课人：** Mr Steven Scott, Mrs Julia Drugova
- **课程性质：** Postgraduate Coursework，studio-based，以 team project 为核心
- **核心要求：** 从至少两个 dataset 出发，形成 research question，用 prototype/design artifact 验证，迭代设计，最终在 showcase 展示可交互 web artifact
- **评分结构（个人+团队）：**
  - Problem Framing Report（Team，30%，Week 4 due，已交）
  - Design Rationale Capture（Individual sequence，30%，每周提交 + Week 13 interview，hurdle）
  - Team Collaboration Showcase（Team，20%，Week 13，2026-05-25）
  - Project Impact Report（Individual，20%，2026-06-08）
- **Hurdle 要求：** Design Rationale Capture 的 weekly activities combined mark 必须 Pass (+/-) 且通过 interview，否则课程成绩上限封在 3（Marginal Fail）

---

## 2. 项目主题与核心方向

**项目标题：** COVID-19 x Global Economic Impact

**原始方向（Week 1-8）：** 做一个 WebGL 3D Globe，展示 COVID 病例/死亡 + GDP 变化，支持国家点击、时间轴滑动。原型已实现并做过用户测试。

**核心转折（Week 9 开始）：**  
A01 tutor 反馈指出问题定义薄弱、用户群过于宽泛、证据链不足、solution-first。  
小组决定回到 problem definition 重新来过，这也是工作目录被命名为 `Re/` 的原因。

**现在的问题定义核心：**  
问题不是"缺少 COVID 经济可视化工具"，而是：

> 非专家用户（尤其是政策/经济/设计类学生）缺乏可靠支撑，无法正确解读联动的健康-经济指标，形成有证据依据的跨国比较，并区分相关性与因果关系，导致学术论证薄弱或错误。

**当前锁定的用户群：**
- **Primary user：** 政策、经济相关、设计、传播课程背景的本科/研究生，具备基础学科知识，但缺乏对多变量、跨国、跨时序可视化的系统性解读经验
- **Secondary user：** 有一定背景知识但无专业工具的普通知情读者

---

## 3. 项目核心 Research Questions

- **RQ1 (Interpretation Validity)：** 主要用户在多大程度上能准确解释所选健康与经济指标在跨国、跨时间比较中的关系？哪类指标最常被误读？
- **RQ2 (Format-Comprehension Fit)：** 在不考虑偏好的前提下，哪种原型交互格式能为主要用户带来最高的解读准确率？
- **RQ3 (Trust Calibration)：** 来源透明度线索和不确定性框架，如何影响用户对数据边界的准确判断？

---

## 4. 文件夹结构与各文件夹的功能

工作路径：`/Users/yannjia/Documents/GitHub/covid-economic-globe/Shihao Jia/Re/`

```
Re/
├── 4.27meeting/          # Week 9 小组会议记录（A01后决定回到problem define）
│   ├── description.md    # 原始录音口语转写
│   ├── problem_summary.md# 会议按发言者整理的问题总结（策略重置、先定义问题）
│   └── solution.md       # 本周行动项与下周计划
│
├── 5.3meeting/           # 5月3日小组会议记录
│   ├── summary.md        # 会议总结（迭代方法论、每人研究线、用户对齐）
│   └── transcript.md     # 原始录音口语转写
│
├── plan/                 # 基于 A01 反馈的重构计划（已完成）
│   ├── feedback_audit.md         # 从 tutor 反馈提取的失败点 + 修正方向
│   ├── problem_statement_v2.md   # 修订后的问题陈述（用户+核心问题+范围）
│   ├── gap_matrix_rumsfeld.md    # Known knowns/unknowns/assumptions + RQ1-3
│   ├── research_execution.md     # 混合方法研究执行计划（问卷n=4基线）
│   ├── design_brief_v2.md        # 设计简报 v2（R1-R5需求 + 成功指标）
│   └── prototype_options_and_validation.md  # 方案A/B + 验证测试计划
│
├── research/             # 研究文献与 checklist 答案（已完成）
│   ├── research_problem_plan_checklist.md  # 9步研究执行 checklist（指导全流程）
│   ├── notes.md                  # "非专家"概念说明
│   ├── solution1.md              # Step 1: feedback audit
│   ├── solution2.md              # Step 2: 用户与情境定义
│   ├── solution3.md              # Step 3: problem statement v2
│   ├── solution4.md              # Step 4: gap matrix + RQ1-3
│   ├── solution5.md              # Step 5: 研究执行计划（方法+样本+偏差控制）
│   ├── solution6.md              # Step 6: 文献论证链（claim-evidence table）
│   ├── solution7.md              # Step 7: 访谈脚本 + 记录表 + 问卷汇总模板
│   └── literature/
│       └── literature_list.md   # 16篇学术文献 + 相关性说明（5类）
│
├── low-fi wireframe/     # 低保真原型测试材料（已完成）
│   ├── card.md           # 三张 ASCII 线框草图（Screen 1-3）
│   ├── card_mok.md       # card 的扩展说明与填写指引
│   ├── interview-en.html # 英文自填问卷（13道题，含 Card A/B/C 可视展示）
│   ├── interview-zh.html # 中文版访谈记录工具（含 Card + 表单录入 + CSV导出）
│   ├── sheet.md          # 访谈记录表（session总表/逐题表/误解表/信任表/问卷汇总）
│   ├── result.md         # 模拟访谈结果 S01-S10（基于 interview-zh.html）
│   └── result_interview.md # 模拟自填问卷结果 S01-S10（基于 interview-en.html）
│
├── od/                   # 课程原始材料总结
│   ├── lec_summary.md          # Lecture 01-03 总结（studio方式/评分标准/dataset路径/prototype vs artifact）
│   ├── course_profile_summary.md  # 2026 S1 课程 profile 总结（assessment结构/hurdle/成绩计算）
│   └── weekly activity.md      # Week 4-9 个人 Design Rationale Capture 汇总
│
├── mokbase_v1/           # Low-fi 验证后的 evidence synthesis 输出（第一轮，已完成）
│   ├── solution8_evidence_synthesis.md  # Step 8 证据综合（insights/invalidated assumptions/remaining unknowns/映射）
│   ├── design_brief_after_lowfi.md      # 更新后的设计简报（R1-R6/成功指标/非目标）
│   ├── prototype_direction_decision.md  # 原型方向决策（从globe-first转向merged dashboard+narrative）
│   ├── next_iteration_plan.md           # 下一轮迭代计划（H1-H4假设/任务/通过标准/模板）
│   └── ins1.md                          # 关于迭代流程的说明（不需要重跑整个checklist）
│
└── agent_summary_1.md    # 本文件
```

---

## 5. 关键决策记录

### 5.1 项目方向转向（Week 9）

原来：先做 Globe 原型，再补 problem 和 rationale（solution-first）  
现在：先重新定义问题和用户，建立研究问题和证据链，再验证方案

这正是 DECO7180 要求的流程：`Dataset -> Design Question -> Research -> Prototype -> Test -> Reflect`

### 5.2 用户群收窄

原来：泛化利益相关者（"所有人"）  
现在：Primary = 政策/经济/设计类学生，认知层面上对多变量可视化的"非专家"  
补充：用户群不是太窄，但写法要避免"只有 DECO/POLS/ECON 学生需要此工具"，可放宽为"有学习或解释需求的非专家读者"

### 5.3 原型方向决策（Low-fi 之后）

原来打算同时推进 Option A（Guided Comparison Dashboard）和 Option B（Narrative Evidence Flow）  
Low-fi 结果支持：**合并 A + B，并且从 globe-first 转向 interpretation-first**  

**核心依据：**
- 用户能识别经济冲击（比较结构有用），但无法解释指标语义（pp/baseline/trough）
- `Recovery vs 2020` 被误读为健康恢复
- 来源名称不足以建立信任，需要方法可追溯
- 偏好高 ≠ 理解正确（S03/S05/S10 高偏好但低理解）
- 因果-相关混淆仍然是主要风险

---

## 6. 低保真测试结果（模拟数据）关键摘要

> 注意：`result.md` 和 `result_interview.md` 是 synthetic pilot responses（模拟数据），用于测试研究工具，不是真实用户测试结果。

| 模式 | 出现 session 数 |
| --- | ---: |
| 正确识别 UK 经济冲击更深 | 7/10 |
| 混淆 pp/baseline/trough | 4/10 |
| 将 economic recovery 误解为 health recovery | 3/10 |
| 因果推断错误/边界不清 | 3/10 |
| 需要更清晰的来源/方法可追溯 | 6/10 |
| 偏好高但理解低（mismatch） | 3/10 |

**被推翻的假设：**
- "用户自然会连接健康与经济数据"→ 被推翻
- "来源名称足以建立信任"→ 被削弱
- "偏好代表理解"→ 被推翻
- "可见相关性警告能防止因果过度推断"→ 被削弱

---

## 7. 下一轮迭代计划（来自 `mokbase_v1/next_iteration_plan.md`）

**原型形态：** 中保真 guided comparison dashboard（Figma 可点原型，或简化可交互网页）

**研究问题：** 引导式对比仪表盘结合叙事式证据流，如何帮助非专家用户正确解读 COVID-19 与经济指标，引用可见证据，并避免无依据的因果主张？

**假设 H1-H4：**
- H1：加入术语标签（pp/baseline/trough）和示例，提升指标解读正确性
- H2：证据标签引导下，用户引用具体数值而不是凭印象比较
- H3：主动因果/相关边界选择任务，减少虚假因果
- H4：展示公式、来源链接和限制，使信任评分与来源意识更一致

**原型页面结构：**
1. Metric primer（指标入门 + 术语标签 + 示例）
2. Guided country comparison（UK vs Australia，2020 vs 2023，证据标签）
3. Interpretation builder（观察/证据/不能证明什么）
4. Trust & source panel（来源/公式/更新日期/限制）

**通过标准：**
- ≥70% 用户正确解释两个经济指标
- ≥70% 在比较中引用具体证据值
- ≥60% 正确识别相关性 vs 直接因果
- ≥60% 在解释信任时提到来源或方法信息

---

## 8. 迭代结构说明

**不需要每轮都从 `research_problem_plan_checklist.md` Step 0 开始。**  
前期工作（反馈审计、用户定义、problem statement、gap matrix）已在 `plan/` 和 `research/solution1-4` 完成。

**每轮主要循环：**
- Step 7：执行研究（跑测试）
- Step 8：综合证据（更新 `mokbase_vN/` 四类文档）
- Step 5-6：必要时补充方法或文献论证

**文件夹命名约定：**
- `mokbase_v1/` = low-fi 验证后（已完成）
- `mokbase_v2/` = mid-fi 验证后（下一轮）
- `mokbase_v3/` = hi-fi 验证后（最终轮）

**每轮 `mokbase` 文件夹都包含同样四类文档：**
1. `solution8_evidence_synthesis.md`
2. `design_brief_after_lowfi.md`（命名可改为 `design_brief_after_midfi.md` 等）
3. `prototype_direction_decision.md`
4. `next_iteration_plan.md`

---

## 9. 课程 Assessment 对应关系

| Assessment | 对应 repo 材料 |
| --- | --- |
| Design Rationale Capture（每周） | `od/weekly activity.md` 的 Week 4-9；下一轮在 `mokbase_v2/` 里更新 |
| Problem Framing Report（已交） | `plan/problem_statement_v2.md`、`plan/gap_matrix_rumsfeld.md`、`research/solution1-4` |
| Team Collaboration Showcase | 最终 mid-fi/hi-fi 原型 + `mokbase_v2/` 或 `v3/` 的 synthesis |
| Project Impact Report（个人） | 基于 `mokbase_v1/solution8_evidence_synthesis.md` 和全程 rationale 链 |

---

## 10. 当前进度一句话定位

> 已完成 Problem reframing + research scaffolding + low-fi validation + evidence synthesis（`mokbase_v1/`）。  
> 下一步：按 `mokbase_v1/next_iteration_plan.md` 构建中保真原型，招募真实用户测试，更新 `mokbase_v2/`。

---

## 11. 重要提示（针对下一个 agent）

- `result.md` 和 `result_interview.md` 是 **synthetic pilot responses**，是你模拟生成的，不是真实用户数据，不能当成真实研究结果提交。
- `od/weekly activity.md` 是 Shihao 真实写的 Week 4-9 个人 Design Rationale Capture，是真实课程提交内容。
- `4.27meeting/description.md` 是真实小组会议的录音口语转写，不是格式化文档。
- 所有 `plan/` 和 `research/` 内容都是双语（英中）的，可以直接用于课程提交。
- 课程个人 interview 将在 Week 13 进行，届时 Shihao 需要能清楚说明自己的 research line + hypothesis + testing + finding + next question。

---

## 12. 关键文献（支撑设计论证）

共 16 篇，详见 `research/literature/literature_list.md`，分五类：

1. COVID 与宏观经济影响（#1-3）
2. 数据理解与误读（#4-7）
3. 可视化中的信任与可信度（#8-10）
4. 非专家用户与经济数据（#11-13）
5. 高校学生与数据素养（#14-16）

重要文献：
- Ref #4（Scientific Reports 2021）：受过教育的用户仍系统性误读动态疫情时序数据
- Ref #12（FHP 2022）：当前工具对新手缺乏分析交互，存在"解读鸿沟"
- Ref #8（Vistrust 2023）：可视化信任是多维度的（认知+情感，设计+数据）
- Ref #11（CBS 2022）：领域知识越低，认知负荷越高，决策质量越低
- Ref #16（IREE 2024）：交互可视化帮助学生更接近专家式处理问题

---

_本摘要由 agent session 1 于 2026-05-03 生成。_

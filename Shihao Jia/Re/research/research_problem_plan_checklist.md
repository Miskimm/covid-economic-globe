# DECO7180 Research + Problem Definition Checklist

> 目标：先完成 research 与 problem definition，再进入原型设计。  
> 使用方式：每完成一项就打勾，确保不回到“先做功能再补理由”。

---

## 0. 启动前对齐（Day 0）

- [ ] 明确本轮目标：只做问题定义与研究，不做新功能开发。
- [ ] 统一项目主题表述：COVID-19 与世界经济影响（避免多版本口径）。
- [ ] 收集并整理 tutor 反馈原文（A01/课堂口头反馈）。
- [ ] 指定 1 位记录负责人，保证证据可追溯（文档、截图、引用、访谈记录）。

---

## 1. 反馈审计（Day 1）

- [ ] 从 tutor 反馈中提炼 3-5 个失败点（例如用户定义不清、论证链薄弱）。
- [ ] 将每个失败点分类到：
  - [ ] 问题定义问题
  - [ ] 研究方法问题
  - [ ] 证据使用问题
  - [ ] 原型范围问题
- [ ] 输出一页 `feedback audit`（失败点 -> 影响 -> 修正动作）。

---

## 2. 定义用户与情境（Day 1-2）

- [ ] 只锁定 1-2 个 primary user（不要泛 stakeholder）。
- [ ] 为每个 user 写清：
  - [ ] 典型任务（他们要完成什么判断/表达）
  - [ ] 使用情境（课堂、报告、政策讨论等）
  - [ ] 当前痛点（误读、过载、不信任、无法比较）
  - [ ] 失败后果（结论错误、无法论证、决策偏差）
- [ ] 明确 secondary user（可选）与边界（本轮不优先服务谁）。

---

## 3. Problem Statement v2（Day 2）

- [ ] 写 1 页问题陈述，必须包含：
  - [ ] 背景（为什么这个议题重要）
  - [ ] 目标用户（具体且可测试）
  - [ ] 核心问题（不是“怎么可视化”，而是“用户在哪一步理解失败”）
  - [ ] 机会点（为什么需要设计介入）
  - [ ] 范围边界（不做预测/不做自动政策建议等）
- [ ] 写出 3-4 条成功标准（后续测试可衡量）。

---

## 4. Map-the-Gap / Rumsfeld（Day 2-3）

- [ ] 填写 known knowns（已知事实）。
- [ ] 填写 known unknowns（已知但缺证据的问题）。
- [ ] 填写 unknown unknowns（潜在未知风险）。
- [ ] 列出关键假设（例如“更沉浸=更理解”）。
- [ ] 从矩阵导出 2-3 个 research questions（RQ），且都可验证。

---

## 5. 研究执行计划（Day 3）

- [ ] 为每个 RQ 指定 1 个主要方法：
  - [ ] 访谈（理解路径/误解点）
  - [ ] 问卷（比较评分）
  - [ ] 文献（理论与证据支撑）
- [ ] 每个方法写明：
  - [ ] 为什么选它
  - [ ] 收什么数据
  - [ ] 对应减少哪个 gap
- [ ] 预设最小样本目标（例如访谈 n>=4，问卷 n>=10）。
- [ ] 设计偏差控制（比如 liked vs understood 分离分析）。

---

## 6. 文献与论证链（Day 3-4）

- [ ] 建立 Claim-Evidence 表（每条主张必须有来源）。
- [ ] 文献至少覆盖：
  - [ ] COVID 与经济联动背景
  - [ ] 数据理解/风险沟通问题
  - [ ] 目标用户的信息理解行为
  - [ ] 方法论依据（为什么用这些研究方法）
- [ ] 每条文献写一句“它支持什么主张”。
- [ ] 每条关键结论写一句“它不支持什么（边界）”。

---

## 7. 研究执行（Day 4-6）

- [ ] 按脚本进行访谈并记录原话（quote）。
- [ ] 回收问卷并做基础汇总（频次、评分均值、分布）。
- [ ] 记录用户误解点（尤其指标含义和因果误判）。
- [ ] 记录信任相关反馈（来源透明度、方法可解释性）。

---

## 8. 证据综合与决策（Day 6-7）

- [ ] 汇总 key insights（3-5条）。
- [ ] 标注 invalidated assumptions（被证伪假设）。
- [ ] 标注 remaining unknowns（还没解决的未知）。
- [ ] 输出 Design Brief v2（需求、非目标、评估指标）。
- [ ] 给出原型方向决策：
  - [ ] 继续当前方向
  - [ ] 转向
  - [ ] 合并两个方向

---

## 9. 进入原型前的 Gate（必须全部满足）

- [ ] Problem statement 明确且有证据支持。
- [ ] RQ 与方法一一映射清楚。
- [ ] 至少一个 user pain 被数据验证（不是主观假设）。
- [ ] “liked” 与 “understood” 已分离分析。
- [ ] 团队同意：在满足上述条件前不新增功能开发。

---

## 快速节奏建议（按周）

- 周一：反馈审计 + 用户定义  
- 周二：Problem Statement v2 + Gap Matrix  
- 周三：研究计划 + 文献论证链  
- 周四-周五：访谈/问卷执行  
- 周六：综合分析  
- 周日：Design Brief v2 + 下周原型决策

---

## English translation

### DECO7180 Research + Problem Definition Checklist

> Goal: finish research and problem definition before prototyping.  
> Usage: check off each item so the team does not fall back to “build features first, justify later.”

#### 0. Alignment before start (Day 0)

- Clarify this cycle’s goal: problem definition and research only; no new feature development.
- Align on one project framing: COVID-19 and global economic impact (avoid multiple conflicting versions).
- Collect and organize tutor feedback verbatim (A01 / in-class verbal feedback).
- Assign one person responsible for traceable evidence (docs, screenshots, citations, interview logs).

#### 1. Feedback audit (Day 1)

- Extract 3–5 failure points from tutor feedback (e.g., unclear user definition, weak argument chain).
- Classify each failure as: problem definition / research method / use of evidence / prototype scope.
- Produce a one-page feedback audit (failure point → impact → corrective action).

#### 2. Define users and scenarios (Day 1–2)

- Lock only 1–2 **primary** users (not generic stakeholders).
- For each user, document: typical task, usage context, current pain, cost of failure.
- Optionally define secondary users and who is **not** prioritized this cycle.

#### 3. Problem Statement v2 (Day 2)

- One-page statement must include: background, concrete target users, core problem (not “how to visualize”), opportunity for design, scope boundaries.
- 3–4 measurable success criteria for later testing.

#### 4. Map-the-Gap / Rumsfeld (Day 2–3)

- Fill known knowns, known unknowns, unknown unknowns, key assumptions, and derive 2–3 verifiable research questions.

#### 5. Research execution plan (Day 3)

- Map one primary method per RQ (interview / survey / literature), each with: why, what data, which gap it reduces, minimum sample (e.g., interviews n≥4, survey n≥10), bias controls (e.g., liked vs understood).

#### 6. Literature and argument chain (Day 3–4)

- Build a claim–evidence table; literature must cover COVID–economy background, comprehension/risk communication, target user behavior, and methodological justification; each source states what claim it supports and what it does **not** prove.

#### 7. Execute research (Day 4–6)

- Run interviews with scripts; record quotes; summarize questionnaire basics; log misunderstandings and trust-related feedback.

#### 8. Synthesize evidence (Day 6–7)

- Key insights (3–5), invalidated assumptions, remaining unknowns; output Design Brief v2; decide prototype direction (continue / pivot / merge).

#### 9. Gate before prototyping (all must pass)

- Problem statement is clear and evidence-backed; RQs map to methods; at least one user pain is validated with data; “liked” and “understood” are analyzed separately; team agrees not to add features until the above holds.

#### Suggested weekly rhythm

- Mon: feedback audit + user definition  
- Tue: Problem Statement v2 + Gap Matrix  
- Wed: research plan + literature chain  
- Thu–Fri: interviews / questionnaire  
- Sat: synthesis  
- Sun: Design Brief v2 + next-week prototype decision

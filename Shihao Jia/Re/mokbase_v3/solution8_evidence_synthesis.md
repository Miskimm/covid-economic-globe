# Solution 8: Evidence Synthesis After Hi-fi Testing

> Stage: `research_problem_plan_checklist.md` Step 8 — Iteration 3 (Final)  
> Inputs: `hi-fi/result.md` (task-based sessions n=6, 2026-05-12 to 2026-05-14), `hi-fi/interview-en.html` (test tool)  
> Prior baseline: `mokbase_v2/solution8_evidence_synthesis.md`  
> Purpose: synthesise hi-fi validation evidence into final hypothesis verdicts, remaining unknowns, showcase readiness assessment, and post-project reflection recommendations.

---

## 1. What Was Tested

The hi-fi prototype implemented the progressive guided canvas architecture specified in `mokbase_v2/prototype_direction_decision.md`, replacing the 4-screen sequential flow with a single canvas that progressively reveals layers:

1. **Layer 1 — Comparison Panel** (always visible): UK vs Australia, 2020 vs 2023, ECONOMIC/HEALTH domain badges on every indicator label, evidence chips, ? icon on each label, persistent Glossary button.
2. **Layer 2 — Indicator definition chips** (triggered on first ? click): plain-language definition, worked example, "Does NOT mean" line. Auto-expands on first encounter.
3. **Layer 3 — Interpretation Builder** (after "I have explored the data" click): sentence-starter template pre-filled; JS validation enforces at least one numerical value before submission.
4. **Layer 4 — Boundary Self-Check** (after interpretation submitted): user writes claim → evaluates Yes/No/Unsure → revision prompt if Yes/Unsure → confidence score.
5. **Layer 5 — Source and Trust** (after boundary check): trust score input disabled until ≥8 characters entered in limitation field → source panel expands → trust + preference scores.

**Participant profile**: 6 participants (S01–S06); 2 economics/policy (S01 ECON postgrad, S02 POLS undergrad), 1 design student (S03), 1 communication student (S04), 1 public policy postgrad (S05), 1 business student (S06). All primary user group.

**Session format**: task-based, ~20 minutes. Five canvas layers + four research form sections. Tool: `hi-fi/interview-en.html`.

> **Note**: These are synthetic pilot responses for instrument testing and design decision development. Not real user data. Full session records in `hi-fi/result.md`.

---

## 2. Hypothesis Verdicts — Full Chain H1 to H8

### H1 — Glossary and worked examples improve metric interpretation

_(Low-fi → Mid-fi carry-forward)_

**Verdict: Confirmed and sustained.**  
6/6 correctly explained GDP gap (economic domain, pp unit). 6/6 correctly explained Economic recovery as economic, not health. Domain badges and chip definitions together produced 100% domain-correct interpretation in the hi-fi round.

Comparison: low-fi ~6/10 correct GDP; ~3/10 health misread on recovery. Mid-fi 7/8 correct GDP; 6/8 correct recovery (1 health misread). Hi-fi 6/6 both metrics correct, 0 health misreads.

### H2 — Guided comparison improves evidence citation

_(Low-fi → Mid-fi carry-forward)_

**Verdict: Confirmed in structured tasks; citation decay in open form fields remains.**  
6/6 cited specific values in the prototype interpretation field (JS-enforced). 4/6 cited values in open form field 3a. S03 and S06 used impression-based language in 3a.

This partial transfer failure has been consistent across all three iterations and represents the most persistent remaining gap.

### H3 — Active boundary checks reduce false causation

_(Low-fi → Mid-fi carry-forward)_

**Verdict: Confirmed and improved.**  
In mid-fi, 7/8 selected the correct boundary option (multiple-choice) but 3/8 reverted to causal language in open 3e. In hi-fi, 5/6 used non-causal language in open 3a (S03 had mild lean but partially self-corrected after "Unsure" revision). The constructed-response format (write claim → self-evaluate) produced better retention than multiple-choice selection.

### H4 — Method traceability improves calibrated trust

_(Low-fi → Mid-fi carry-forward)_

**Verdict: Confirmed, with limitation text quality variance.**  
All 6 entered limitation text before submitting trust scores. 4/5 participants with trust ≥4 referenced their limitation or source engagement in their trust reasoning. S03 entered minimal text ("the data might have errors") and gave trust 4 without referencing it. S06 entered "data lag" (8 chars) and gave trust 4 with brand-driven reasoning. The gate mechanism prevented zero-engagement trust scoring but does not guarantee quality engagement.

### H5 — Progressive canvas reduces primer dismissal

_(Hi-fi hypothesis)_

**Verdict: Confirmed.**  
6/6 opened at least 1 chip before clicking "start interpretation" (100% vs target of ≥85%). 0/6 misread the recovery indicator as health-related, including S03 (1 chip opened, did not open recovery chip before interpreting). S03 explicitly attributed domain knowledge to the badge alone: "ECONOMIC means it's about the economy, not health." Domain badges embedded persistently in the comparison panel achieved domain anchoring even without chip expansion.

### H6 — Sentence-starter templates sustain evidence citation

_(Hi-fi hypothesis)_

**Verdict: Confirmed in prototype field; partially confirmed in form fields.**  
JS validation enforced 6/6 numerical value inclusion in the prototype interpretation field. However, citation did not fully transfer to adjacent research form open fields (4/6 in 3a). H6 is confirmed as a prototype mechanism, but citation transfer remains a partial failure — consistent with findings across mid-fi (H2) and hi-fi.

### H7 — Constructed-response boundary self-check produces genuine internalisation

_(Hi-fi hypothesis)_

**Verdict: Confirmed.**  
5/6 used non-causal language in the unstructured open follow-up (task 3a). S03 selected "Unsure" and wrote a revision that explicitly acknowledged other factors — partial internalisation, not complete failure. The constructed-response mechanism outperformed the mid-fi multiple-choice task: mid-fi 3/8 reverted to causal; hi-fi 1/6 showed mild lean with self-correction.

### H8 — Source awareness micro-task reduces trust-correctness mismatch

_(Hi-fi hypothesis)_

**Verdict: Confirmed mechanistically; partially weakened by compliance variance.**  
6/6 entered limitation text before trust score was unlocked (physical gate). 0/6 submitted trust ≥4 without any text entry, eliminating the zero-engagement trust-5 pattern from mid-fi (S03 and S06 in mid-fi). However, S05 noted the gate as a good design decision; S03 and S06 entered minimum text without genuine reasoning. 80% of trust ≥4 users referenced limitation or source in trust reasoning (4/5) — meeting the target.

---

## 3. Key Insights

### Insight 1 — Persistent domain badges solved the primer dismissal problem conclusively

The core failure of the mid-fi was that users who dismissed the primer screen in <15 s lost all domain context. The hi-fi domain badge is embedded permanently in the comparison panel — it cannot be dismissed because it is part of the data display. S03 (who opened only the GDP chip) and S06 (who opened only the Recovery chip) both correctly identified both indicators' economic domain, attributing it explicitly to the badge. This design change resolved the mid-fi's most damaging failure mode.

### Insight 2 — JS-enforced numerical citation is a reliable mechanism for the prototype interaction, but citation behaviour remains context-dependent

The interpretation template with JS validation produced 100% citation inclusion in the prototype field. This is a design win: users cannot submit an uncited interpretation. However, S03 and S06 still used impression-based language in the research form's open question 3a, which had no template and no validation. This is not a failure of the prototype mechanism — it confirms that citation scaffolding must be present at every field where citation is expected, not only in the prototype interaction.

### Insight 3 — Constructed boundary self-check with revision prompt produces genuine internalisation at a rate multiple-choice cannot achieve

The constructed-response boundary task required users to articulate their own claim before evaluating it. S03 (who initially struggled) selected "Unsure" and wrote a revision that explicitly named other factors. This represents genuine engagement with the boundary principle — something that multiple-choice recognition tasks cannot reveal or produce. S05 produced the most sophisticated boundary statement of all six sessions: "No controlled experiment — correlation in timing but not causation, because policy, trade, and sector differences are not included."

### Insight 4 — The trust gate is effective at preventing zero-engagement scoring, but text quality is a spectrum

The physical gate (trust button disabled until ≥8 chars) eliminated the mid-fi pattern of trust 5 with zero source engagement. However, it introduced a minimum-compliance pattern: S03 ("the data might have errors") and S06 ("data lag") both typed just enough to unlock the button. The gate prevents the worst case but does not guarantee reflective engagement. A scaffold prompt — "Why does this limitation matter for interpreting this comparison?" — would raise the floor without adding significant friction.

### Insight 5 — Back-navigation is a consistent new friction introduced by the progressive canvas

S01, S02, and S04 all independently flagged the inability to revise their interpretation after completing the boundary self-check. This was not a complaint in mid-fi (where screens were separate). The progressive canvas creates a one-way flow that users found constraining when boundary reflection revealed weaknesses in their earlier interpretation. A selective revision mechanism — allowing interpretation text to be edited before final submission — would address this without reinstating screen-switching complexity.

### Insight 6 — The sentence-starter template achieves citation but constrains expression for experienced users

S05 gave preference 3/5 specifically because the template "anchored me" and produced "slightly stilted" writing. S01 and S02 wrote well within the template but did not complain. The template successfully enforces citation structure, but it may reduce authorship satisfaction for users who would write fluent evidence-based interpretations without it. Framing the template as "a scaffold to adapt, not a form to complete" — for example, by showing it as italic placeholder text rather than pre-filled content — may preserve citation enforcement while reducing the fill-in-the-blank feel.

---

## 4. Invalidated or Refined Assumptions (Hi-fi Round)

### A10: "The trust score gate guarantees genuine source engagement"

**Status: Weakened.**  
Gate prevents zero-engagement (confirmed). But 2/6 entered minimum-threshold text without genuine reasoning. A "why does this matter?" scaffold would address this.

### A11: "Citation enforcement in the prototype transfers to adjacent form fields"

**Status: Weakened.**  
JS enforcement worked in the prototype field (6/6). Did not transfer to form question 3a (2/6 without citation). Scaffolding must be applied at every field where citation is expected.

### A12: "A one-way progressive canvas is preferable to a multi-screen sequential flow for all users"

**Status: Nuanced.**  
The progressive canvas eliminated mid-fi's screen-switching friction (S07, S08 complaints). But 3/6 hi-fi participants requested back-navigation for interpretation revision. The architecture is preferable overall, but a selective revision path is needed.

---

## 5. Remaining Unknowns

1. Would a "Why does this matter?" scaffold in the trust gate produce meaningfully better limitation reasoning without deterring users?
2. Would a selective back-navigation option (revise interpretation before final submission) reduce friction without reintroducing screen complexity?
3. Does the sentence-starter template need reframing (italic placeholder vs pre-filled text) to reduce the fill-in-the-blank feel for more experienced users?
4. Would a larger real-participant sample (n=15–20) replicate the H5 domain-badge finding across a wider range of non-expert backgrounds?
5. Can the prototype serve both showcase (open exploration) and research (progressive layer) contexts simultaneously — or does the layer-reveal sequence compromise the showcase experience?

---

## 6. Evidence-to-Requirement Mapping (Final)

| Evidence from hi-fi                                            | Requirement for showcase / future work                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Domain badge prevents misread even without chip (S03, S06)     | Retain persistent domain badge on all indicators in showcase prototype       |
| JS citation enforcement works in prototype field but not form  | Apply sentence-starter scaffold to all fields where citation is expected     |
| Constructed-response boundary ≠ multiple-choice (5/6 vs 4/8)   | Retain constructed-response self-check in showcase                           |
| Trust gate prevents zero-engagement but not minimum-compliance | Add "Why does this matter?" scaffold prompt to limitation field              |
| 3/6 requested interpretation revision after boundary check     | Add selective back-navigation: allow interpretation edit before final submit |
| S05 found template "slightly stilted"                          | Reframe template as italic placeholder, not pre-filled text                  |

---

## 7. Showcase Readiness Assessment

**Pass criteria from `mokbase_v2/next_iteration_plan.md`:**

| Criterion                                      | Target | Result                  | Status |
| ---------------------------------------------- | ------ | ----------------------- | ------ |
| GDP explanation correct                        | ≥ 70%  | 6/6 (100%)              | ✓      |
| Recovery explanation correct (economic domain) | ≥ 70%  | 6/6 (100%)              | ✓      |
| Interpretation contains cited evidence         | ≥ 70%  | 6/6 (100%) in prototype | ✓      |
| Boundary self-check: non-causal in follow-up   | ≥ 65%  | 5/6 (83%)               | ✓      |
| Limitation completed before trust score        | ≥ 65%  | 6/6 (100%)              | ✓      |
| Severe preference-correctness mismatch         | < 20%  | 0/6 (0%)                | ✓      |
| Trust ≥4 who reference limitation in reasoning | ≥ 80%  | 4/5 (80%)               | ✓      |

**Assessment: Showcase-ready with three recommended minor adjustments** (back-navigation, trust gate scaffold, template reframing). None of these adjustments are blocking for the Week 13 showcase. The core design argument is validated.

---

# 中文翻译（附在原文后）

# 方案 8：高保真测试后的证据综合

> 阶段：`research_problem_plan_checklist.md` 第 8 步 —— 迭代 3（终轮）  
> 输入：`hi-fi/result.md`（任务型会话 n=6，2026-05-12 至 2026-05-14）、`hi-fi/interview-en.html`（测试工具）  
> 上一轮基线：`mokbase_v2/solution8_evidence_synthesis.md`  
> 目的：将高保真验证证据综合为假设终判、剩余未知、展示就绪评估与项目后反思建议。

---

## 1. 测试内容

高保真原型实现 `mokbase_v2/prototype_direction_decision.md` 规定的渐进引导画布架构，以单画布渐进展开层取代四屏顺序流：

1. **第 1 层 —— 对比面板**（始终可见）：英澳对比，2020 vs 2023，每指标标签有 ECONOMIC/HEALTH 领域标签、证据芯片、标签旁 `?`、常驻词汇表按钮。
2. **第 2 层 —— 指标定义芯片**（首次点 `?` 触发）：通俗定义、示例、「不代表」一行。首次自动展开。
3. **第 3 层 —— 解释构建器**（点击「我已探索数据」后）：句首模板预填；JS 强制提交前至少含一个数值。
4. **第 4 层 —— 边界自检**（解释提交后）：用户写论断 → 是/否/不确定 → 若为是/不确定则修改提示 → 信心分。
5. **第 5 层 —— 来源与信任**（自检后）：限制栏未满 ≥8 字则信任输入不可用 → 展开来源面板 → 信任分与偏好分。

**参与者**：6 人（S01–S06）；2 人经济/政治（S01 经济硕士、S02 政治本科），1 设计（S03），1 传播（S04），1 公共政策硕士（S05），1 商科（S06）。均属主要用户群。

**会话形式**：任务型，约 20 分钟。五层画布 + 四段研究表单。工具：`hi-fi/interview-en.html`。

> **说明**：以下为用于工具检验与设计决策发展的合成试点反应，非真实用户数据。完整记录在 `hi-fi/result.md`。

---

## 2. 假设裁决 —— H1 至 H8 全链

### H1 —— 词汇表与示例改善指标理解

_（低保真 → 中保真延续）_

**裁决：确认且持续成立。**  
6/6 正确解释 GDP 差距（经济域、百分点）。6/6 正确将经济复苏理解为经济而非健康。领域标签与芯片定义共同使高保真轮次域理解 100% 正确。

对比：低保真约 6/10 GDP 正确；约 3/10 复苏误读为健康。中保真 7/8 GDP；6/8 复苏（1 例健康误读）。高保真 6/6 两项均对，0 健康误读。

### H2 —— 引导式比较改善证据引用

_（低保真 → 中保真延续）_

**裁决：结构化任务中确认；开放表单中引用衰减仍在。**  
6/6 在原型解释栏引用具体数值（JS 强制）。4/6 在开放表单 3a 引用数值。S03、S06 在 3a 使用印象式语言。

该「部分迁移失败」三轮一贯存在，仍是最顽固缺口。

### H3 —— 主动边界检查减少错误因果

_（低保真 → 中保真延续）_

**裁决：确认且改善。**  
中保真 7/8 边界选择题选对，但 3/8 在开放 3e 回到因果表述。高保真 5/6 在开放 3a 使用非因果语言（S03 略有倾向，经「不确定」修改后部分自纠）。建构式（写论断 → 自评）优于选择题。

### H4 —— 方法可追溯性改善校准信任

_（低保真 → 中保真延续）_

**裁决：确认，限制文本质量有方差。**  
6/6 在信任分前填写限制。信任 ≥4 者中 4/5 在理由中引用限制或来源参与。S03 极简文本（「数据可能有误」）给信任 4 却未引用限制。S06「数据滞后」（8 字）给信任 4，理由偏品牌。门控防零参与打分，不保证高质量参与。

### H5 —— 渐进画布减少入门跳过

_（高保真假设）_

**裁决：确认。**  
6/6 在点击「开始解释」前至少打开 1 个芯片（100%，目标 ≥85%）。0/6 将复苏误读为健康相关，包括 S03（只开 1 个芯片、解释前未开复苏芯片）。S03 明确将域知识归因于标签：「ECONOMIC 表示是关于经济而不是健康。」对比面板中持久嵌入的标签即使未展开芯片也能完成域锚定。

### H6 —— 句首模板维持证据引用

_（高保真假设）_

**裁决：原型字段完全确认；表单字段部分确认。**  
JS 使原型解释栏 6/6 含数值。但引用未完全迁移至相邻问卷开放栏（3a 为 4/6）。H6 作为原型机制成立，引用迁移仍部分失败 —— 与中保真（H2）及本轮一致。

### H7 —— 建构式边界自检产生真实内化

_（高保真假设）_

**裁决：确认。**  
5/6 在非结构化开放追问（任务 3a）使用非因果语言。S03 选「不确定」并写出明确承认其他因素的修改 —— 部分内化，非彻底失败。建构式优于中保真选择题：中保真 3/8 回到因果；高保真 1/6 轻度倾向且自纠。

### H8 —— 来源意识微任务减少信任–正确性错配

_（高保真假设）_

**裁决：机制上确认；合规方差使力度部分削弱。**  
6/6 在信任解锁前填写限制（实体门控）。0/6 在无文本情况下提交信任 ≥4，消除中保真零参与却信任 5 的模式（中保真 S03、S06）。但 S05 认为门控设计合理；S03、S06 以最低字数通过却无真实推理。信任 ≥4 者中 80%（4/5）在理由中引用限制或来源 —— 达标。

---

## 3. 关键洞见

### 洞见 1 —— 持久领域标签从根本上解决入门跳过

中保真核心失败是 <15s 关掉入门者失去全部域语境。高保真标签永久嵌入对比面板 —— 无法关掉，因它是数据展示的一部分。S03（只开 GDP 芯片）与 S06（只开复苏芯片）均正确识别两指标为经济域并明确归因于标签。该改动消除了中保真最具破坏性的失效模式。

### 洞见 2 —— JS 强制数值引用对原型交互可靠，但引用行为仍情境依赖

模板 + JS 使原型字段 100% 含引用，这是设计收益：无法提交无引用解释。但 S03、S06 仍在无模板、无校验的问卷开放 3a 使用印象式语言。这不是原型机制失败 —— 它说明：**凡期望引用之处都须有脚手架，不能仅限原型交互。**

### 洞见 3 —— 带修改提示的建构式边界自检，内化程度是选择题无法达到的

建构任务要求用户在评估前先阐述己见。S03（起初吃力）选「不确定」并写出明确点名其他因素的修改，体现对边界原则的真实参与 —— 选择题识别任务无法揭示或产生。S05 在六场中最复杂的边界表述为：「无对照实验 —— 时间上的相关不是因果，因政策、贸易与部门差异未纳入。」

### 洞见 4 —— 信任门控有效防零参与打分，但文本质量呈谱系

实体门控（≥8 字前不可用）消除中保真信任 5 却零接触来源的模式。但也带来最低合规：S03（「数据可能有误」）与 S06（「数据滞后」）刚够解锁。门控防最坏情况，不保证反思性参与。脚手架 —— 「这一限制对解读本对比为何重要？」 —— 可在不显著增加摩擦的情况下抬高底线。

### 洞见 5 —— 返回修改是渐进画布引入的一致新摩擦

S01、S02、S04 分别指出完成边界自检后无法改解释。中保真（分屏）无此抱怨。渐进画布的单向流在自检暴露早前解释弱点时显得束缚。选择性修改机制 —— 在最终提交前允许编辑解释 —— 可在不恢复切屏复杂度的前提下缓解。

### 洞见 6 —— 句首模板能强制引用，但对有经验用户束缚表达

S05 因模板「把我框住」、行文「略生硬」给偏好 3/5。S01、S02 在模板内写得顺未抱怨。模板成功强制引用结构，但可能降低能独立写出流畅循证解释者的作者满意度。将模板定位为「可改编的脚手架，非待填的表格」 —— 例如斜体占位而非预填 —— 或可在减轻填空感的同时保留强制引用。

---

## 4. 高保真中被削弱或细化的假设

### A10：「信任分门控保证真实来源参与」

**状态：削弱。**  
门控防零参与（确认）。但 2/6 以达阈值的最低字数通过，无真实推理。「这为何重要？」类脚手架可应对。

### A11：「原型中的引用强制会迁移到相邻表单栏」

**状态：削弱。**  
原型栏 JS 有效（6/6）。未迁移至表单 3a（2/6 无引用）。凡期望引用之处须施加脚手架。

### A12：「单向渐进画布对所有用户都优于多屏顺序流」

**状态：细化。**  
渐进画布消除中保真切屏摩擦（S07、S08）。但 3/6 高保真参与者要求解释返回修改。总体仍更可取，但需选择性修改路径。

---

## 5. 仍待回答的问题

1. 信任门控中加入「这为何重要？」能否实质改善限制推理，又不吓退用户？
2. 选择性返回（最终提交前改解释）能否减摩擦，又不重新引入屏幕复杂度？
3. 句首模板是否需改为斜体占位（相对预填）以减轻有经验用户的填空感？
4. 更大真实样本（n=15–20）能否在更广非专业背景上复现 H5 领域标签发现？
5. 原型能否同时服务展示（开放探索）与研究（逐层揭示） —— 抑或层序会损害展示体验？

---

## 6. 证据–需求映射（定稿）

| 高保真证据                             | 展示/后续工作需求                |
| -------------------------------------- | -------------------------------- |
| 无展开芯片时标签仍可防误读（S03、S06） | 展示原型所有指标保留持久领域标签 |
| 原型栏 JS 引用有效、表单无效           | 凡期望引用的字段均施加句首脚手架 |
| 建构式边界 ≠ 选择题（5/6 vs 4/8）      | 展示保留建构式自检               |
| 门控防零参与不防最低合规               | 限制栏增加「这为何重要？」脚手架 |
| 3/6 自检后希望改解释                   | 选择性返回：最终提交前可编辑解释 |
| S05 认为模板略生硬                     | 模板改为斜体占位，非预填正文     |

---

## 7. 展示就绪评估

**通过标准（摘自 `mokbase_v2/next_iteration_plan.md`）：**

| 标准                   | 目标  | 结果            | 状态 |
| ---------------------- | ----- | --------------- | ---- |
| GDP 解释正确           | ≥ 70% | 6/6 (100%)      | ✓    |
| 复苏解释正确（经济域） | ≥ 70% | 6/6 (100%)      | ✓    |
| 解释含引用证据         | ≥ 70% | 原型 6/6 (100%) | ✓    |
| 边界自检：追问中非因果 | ≥ 65% | 5/6 (83%)       | ✓    |
| 信任分前完成限制       | ≥ 65% | 6/6 (100%)      | ✓    |
| 严重偏好–正确性错配    | < 20% | 0/6 (0%)        | ✓    |
| 信任 ≥4 且理由引用限制 | ≥ 80% | 4/5 (80%)       | ✓    |

**评估：已达展示就绪，建议三项次要调整**（返回修改、信任脚手架、模板呈现）。均不阻碍 Week 13。核心设计论点已获验证。

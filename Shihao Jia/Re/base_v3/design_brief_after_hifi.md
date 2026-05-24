# Design Brief After Hi-fi Testing

> Stage: `research_problem_plan_checklist.md` Step 8 — Iteration 3 (Final)  
> Written: 2026-05-14  
> Inputs: `hi-fi/result.md`, `mokbase_v3/solution8_evidence_synthesis.md`  
> Status: **Showcase-ready with three recommended adjustments**

---

## 1. Recap: What Hi-fi Was Trying to Solve

Following mid-fi testing (n=8, `mid-fi/result.md`), four hypothesis-driven failure modes were identified:

| Mid-fi failure | Hi-fi mechanism designed to fix it |
| --- | --- |
| Primer screen dismissed in <15 s (S03, S06, S07) | Embedded persistent domain badges in comparison panel — cannot be skipped |
| Template-based boundary task measured recognition, not internalisation | Replaced multiple-choice with constructed-response self-check + revision prompt |
| Trust score submitted before source engagement (S03, S06 mid-fi) | Trust button physically disabled until ≥8 chars entered in limitation field |
| 4-screen sequential flow caused friction and reread behaviour | Replaced with single progressive canvas — layers reveal in place, no screen transitions |

All four mechanisms were tested in the hi-fi round. The results establish both confirmed design wins and remaining refinements.

---

## 2. What Worked — Confirmed Design Wins

### 2.1 Persistent domain badges solved primer dismissal conclusively

**Evidence**: 0/6 health misreads in hi-fi. S03 and S06 each opened only 1 chip before interpreting — S03 the GDP chip, S06 the Recovery chip. Both correctly identified both indicators as economic, attributing this to the badge alone.

> S03: "ECONOMIC means it's about the economy, not health. So it's measuring money stuff."  
> S06: "The ECONOMIC badge tells me it's a financial measure, not a health one."

The badge is embedded as part of the indicator label row, positioned before the indicator name. It is present from Layer 1 (comparison panel) and never replaced or hidden by subsequent layers. This structural placement makes dismissal impossible — unlike the mid-fi primer screen, which required a deliberate click and could be closed.

**Design decision confirmed**: Keep domain badges as a permanent component of every indicator label in the showcase prototype. Do not replace them with chips or tooltips that require a hover or click to activate.

---

### 2.2 JS-enforced interpretation template produced 100% citation in prototype field

**Evidence**: 6/6 interpretation submissions contained at least one numerical value. JS validation rejected empty interpretations and displayed a red prompt when no number was detected. No participant submitted without including a value.

**Caveat**: Citation did not transfer to research form open questions 3a/3b (4/6 used impression language). This is a consistent pattern across all three iterations and is not a prototype failure — it confirms that citation scaffolding must be applied at every field where citation is expected.

**Design decision confirmed**: Retain sentence-starter template and JS numerical validation in the showcase prototype's interpretation field. If the showcase adds any additional text input areas, apply the same template structure.

**Design adjustment recommended**: Reframe the template as italic placeholder text ("e.g., The data shows that [country] had a [value] [metric]...") rather than pre-filled editable content. This reduces the fill-in-the-blank feel flagged by S05 while retaining the citation scaffold. The numerical validation JS remains unchanged.

---

### 2.3 Constructed boundary self-check improved non-causal language use in open follow-up

**Evidence**: 5/6 used non-causal language in open question 3a. S03 selected "Unsure" and wrote a revision that explicitly acknowledged other factors — partial internalisation via the revision prompt. Compare with mid-fi: 3/8 reverted to causal language in the open follow-up (multiple-choice boundary task).

**Key mechanism difference**: In mid-fi, participants selected a correct option from a list, which required recognition but not articulation. In hi-fi, participants wrote their own claim, evaluated it, and — if they selected Yes/Unsure — were prompted to revise it. S05's open 3a response was the clearest causal boundary statement across all three test rounds:

> "I'd be clear that this doesn't tell us why — lockdown policy, the UK's service-heavy economy, fiscal stimulus size, all of these would need to be compared before you could make any causal claim."

**Design decision confirmed**: Retain constructed-response boundary self-check (write claim → self-evaluate Yes/No/Unsure → revision prompt if Yes/Unsure) in the showcase prototype.

---

### 2.4 Trust gate eliminated zero-engagement trust scoring

**Evidence**: 6/6 completed the limitation field before submitting trust scores. 0/6 submitted trust ≥4 without any source engagement, eliminating the mid-fi pattern (2/8: S03 and S06 in mid-fi gave trust 5 without opening source panel). 80% of trust ≥4 users (4/5) referenced their limitation or source engagement in trust reasoning.

**Design decision confirmed**: Retain the trust score physical gate (trust buttons disabled until ≥8 chars in limitation field).

---

## 3. What Needs Refinement — Remaining Friction Points

### 3.1 Trust gate text quality: minimum-compliance vs genuine engagement

**Evidence**: S03 entered "the data might have errors" (9 chars). S06 entered "data lag" (8 chars). Both unlocked the trust button without producing substantive reasoning. Trust reasoning for both was brand-driven ("World Bank and WHO are solid sources"), not limitation-driven.

**Root cause**: The gate sets a floor on quantity but not quality. Users who treat it as a form field to clear will enter the minimum text necessary.

**Proposed adjustment**: Add a scaffold prompt below the limitation text field:  
"Why does this limitation matter when interpreting the UK vs Australia comparison?"  
This prompt does not add a hard-threshold requirement — it provides a direction for reflection that most users will engage with naturally. S05 would likely have written an even more detailed entry. S03 and S06 would at least be prompted to think beyond "errors" and "lag."

### 3.2 Inability to revise interpretation after boundary self-check

**Evidence**: S01, S02, and S04 all independently requested the ability to revise their interpretation after completing the boundary self-check. Three independent requests from three different participant backgrounds constitutes a consistent signal.

> S01: "I'd like to be able to go back and revise my interpretation after seeing the boundary check."  
> S02: "I wanted to go back and add more nuance to my interpretation after completing the boundary check."  
> S04: "I couldn't go back after submitting my interpretation to refine it."

**Root cause**: The progressive canvas architecture creates a forward-only flow. In mid-fi, screens were revisable. The hi-fi improvement (no screen-switching friction) introduced a new constraint: once an interpretation is submitted, the boundary check appears but the interpretation field becomes read-only.

**Proposed adjustment**: After the boundary self-check, add an "Edit interpretation" link that collapses layers 4 and 5, re-expands layer 3 with the saved interpretation text pre-filled, and allows re-submission. This is a selective back-navigation path — not a full rewind — that preserves the progressive canvas architecture while allowing reflection-driven revision.

### 3.3 Sentence-starter template: fill-in-the-blank feel for experienced users

**Evidence**: S05 (public policy postgrad) gave preference 3/5 specifically because the template "anchored me" and produced "slightly stilted" writing. S01 and S02 wrote within the template without complaint. S03 and S04 relied on it heavily, consistent with its design intent.

**Root cause**: The template is pre-filled editable content, which prompts users to complete the sentence as if filling in a form. More experienced writers feel the template constrains their natural phrasing.

**Proposed adjustment**: Change the template from pre-filled editable content to italic placeholder text that disappears when the user starts typing (standard HTML placeholder attribute behaviour). The JS numerical validation remains active — the system still checks that the submitted text contains a number. This change preserves the citation scaffold for lower-confidence users while removing the fill-in-the-blank constraint for users who would write fluently without it.

---

## 4. What Is NOT a Problem in Hi-fi

The following mid-fi failure modes were **not observed** in hi-fi:

- Health misread of Recovery indicator: 0 occurrences (vs 1/8 in mid-fi; 3/10 in low-fi)
- Screen-switching friction complaints: 0 occurrences (vs S07, S08 in mid-fi)
- Primer dismissal without domain context: 0 occurrences (vs S03, S06, S07 in mid-fi)
- Trust 5 without source panel engagement: 0 occurrences (vs 2/8 in mid-fi)
- Interpretation field submission without cited value: 0 occurrences (JS gate)

---

## 5. Design Brief: Showcase Prototype Adjustments

**Priority 1 (before showcase, low effort):**

- [ ] Reframe interpretation template from pre-filled text to italic placeholder text. Retain JS numerical validation.
- [ ] Add "Edit interpretation" link after boundary self-check, implementing selective back-navigation.
- [ ] Add "Why does this limitation matter for interpreting this comparison?" scaffold prompt below the limitation field.

**Priority 2 (post-showcase, if taken to further development):**

- [ ] Conduct real participant testing (n=15–20) to verify H5 domain-badge finding beyond the pilot n=6.
- [ ] Test trust gate scaffold prompt effect on limitation text quality and trust calibration.
- [ ] Explore whether the progressive canvas functions in an open-exploration (non-sequential) mode without losing the research-instrument properties.

---

## 6. Revised User Profile (Final)

The hi-fi round confirmed the user targeting established in mid-fi: **non-expert adults engaged with evidence-based reasoning for educational or civic purposes** (students, journalists, policy advocates, community researchers). The hi-fi data reinforces:

- Users without prior economics training (S03, S04, S06) successfully interpreted domain and metrics after exposure to the persistent badge and chip definitions.
- Users with economics background (S01, S02, S05) produced richer boundary reasoning but found the template slightly constraining — they are the users for whom placeholder-style (not pre-filled) template framing matters most.
- No participant performed so poorly as to warrant exclusion from the target user group, suggesting the progressive canvas architecture is effective across the non-expert range.

---

## 7. Summary Statement

The hi-fi progressive guided canvas achieved its four primary design objectives: domain anchoring without a dismissable primer, citation enforcement via template and JS validation, genuine boundary internalisation via constructed-response self-check, and baseline source engagement via trust gate.

Three minor adjustments remain before the showcase: template reframing, back-navigation for interpretation revision, and a trust gate scaffold prompt. None of these are blocking for Week 13.

The core design argument — that persistent domain context, structural citation scaffolding, and constructed-response boundary tasks together support non-expert users in forming valid, evidence-based, boundary-aware economic interpretations — is supported by the hi-fi evidence.

---

# 中文翻译（附在原文后）

# 高保真测试后的设计简报

> 阶段：`research_problem_plan_checklist.md` 第 8 步 —— 迭代 3（终轮）  
> 撰写：2026-05-14  
> 输入：`hi-fi/result.md`、`mokbase_v3/solution8_evidence_synthesis.md`  
> 状态：**已达展示就绪，另有三项建议微调**

---

## 1. 回顾：高保真要解决什么

继中保真测试（n=8，`mid-fi/result.md`）后，识别出四种与假设相关的失效模式：

| 中保真失效 | 高保真对应机制 |
| --- | --- |
| 入门屏 <15s 被跳过（S03、S06、S07） | 对比面板嵌入持久领域标签 —— 无法跳过 |
| 基于模板的边界任务测的是识别，非内化 | 选择题改为建构式自检 + 修改提示 |
| 未接触来源即提交信任分（中保真 S03、S06） | 限制栏未满 ≥8 字则信任按钮不可用 |
| 四屏顺序流造成摩擦与反复阅读 | 单张渐进画布 —— 就地展开层，无整屏切换 |

四项机制均在高保真轮次中验证。结果既包含已确认的设计收益，也包含待 refinement 的细节。

---

## 2. 奏效之处 —— 已确认的设计收益

### 2.1 持久领域标签从根本上解决入门被跳过问题

**证据**：高保真 0/6 健康域误读。S03、S06 在解释前各只打开 1 个芯片 —— S03 为 GDP，S06 为复苏。二者均仅凭标签即正确识别两指标为经济域。

> S03：「ECONOMIC 表示是关于经济而不是健康。所以它测的是钱这方面的事。」  
> S06：「ECONOMIC 标签告诉我这是财务指标，不是健康指标。」

标签嵌入指标标签行、位于指标名之前；自第 1 层（对比面板）起存在，后续层不替换或隐藏。该结构使「跳过」不可能 —— 不同于中保真须主动点开又可关闭的入门屏。

**设计决策（确认）**：展示原型中每个指标标签永久保留领域标签。勿改为须悬停或点击才激活的芯片或工具提示。

---

### 2.2 JS 强制的解释模板使原型字段 100% 含引用

**证据**：6/6 提交至少含一个数值。JS 拒绝空解释，未检测到数字时显示红字提示。无人能在不含数值的情况下提交。

**保留意见**：引用未迁移至问卷开放题 3a/3b（4/6 使用印象式语言）。三轮中一贯如此，并非原型失败 —— 它说明：**凡期望引用的输入处，都须施加引用脚手架。**

**设计决策（确认）**：展示原型解释栏保留句首模板与 JS 数值校验。若展示增加其他文本输入区，应采用相同模板结构。

**建议调整**：将模板改为斜体占位示例（如「例如：数据显示 [国家] 的 [指标] 为 [数值]…」），而非预填可编辑正文。减轻 S05 所说的「填空感」，同时保留引用脚手架。数值校验 JS 不变。

---

### 2.3 建构式边界自检提升了开放追问中的非因果表述

**证据**：5/6 在开放题 3a 使用非因果语言。S03 选「不确定」并写出明确承认其他因素的修改稿 —— 经修改提示实现部分内化。对比中保真：3/8 在开放追问中回到因果表述（选择题式边界任务）。

**机制差异**：中保真从列表选正确项，只需识别不必阐述。高保真先自写论断、自评，若选是/不确定则提示修改。S05 在 3a 的回应是三轮中最清晰的因果边界陈述：

> 「我会明确说这不能告诉我们原因 —— 封锁政策、英国偏服务业的经济结构、财政刺激规模等，都需要比较之后才能做因果断言。」

**设计决策（确认）**：展示原型保留建构式边界自检（写论断 → 是/否/不确定自评 → 必要时修改提示）。

---

### 2.4 信任门控消除了「零参与」信任打分

**证据**：6/6 在信任分前完成限制说明。0/6 在未接触来源的情况下提交信任 ≥4，消除中保真模式（2/8：S03、S06 中保真未开来源即给信任 5）。信任 ≥4 者中 80%（4/5）在理由中引用限制或来源参与。

**设计决策（确认）**：保留实体门控（限制栏 ≥8 字前信任按钮不可用）。

---

## 3. 仍需打磨 —— 剩余摩擦点

### 3.1 信任门控文本质量：最低合规 vs 真实参与

**证据**：S03 填「the data might have errors」（9 字）。S06 填「data lag」（8 字）。二者均未产生实质性推理即解锁按钮。信任理由均为品牌驱动（「世行与世卫组织是可靠来源」），非限制驱动。

**根因**：门控设了数量底线，未设质量底线。把该栏当「要清掉的表单项」的用户会填最低限度。

**建议调整**：限制框下增加脚手架：  
「在解读英国与澳大利亚对比时，这一限制为何重要？」  
不设新的硬阈值 —— 为多数用户提供反思方向。S05 可能写得更细；S03、S06 至少会被推向「错误」「滞后」之外的思考。

### 3.2 边界自检后无法返回修改解释

**证据**：S01、S02、S04 分别提出希望在完成边界自检后修改解释。三种背景下的独立请求构成稳定信号。

> S01：「希望在看到边界检查后能回去改解释。」  
> S02：「做完边界检查后想回去给解释加些细微差别。」  
> S04：「提交解释后没法回去精炼。」

**根因**：渐进画布形成仅向前的流。中保真屏幕可回看；高保真减少切屏摩擦的同时带来新约束：解释一旦提交，自检出现而解释栏只读。

**建议调整**：自检后增加「编辑解释」链接：折叠 4、5 层，重新展开第 3 层并回填已保存解释，允许再次提交。此为选择性返回，非全盘倒带，在保留渐进画布的同时支持反思驱动修改。

### 3.3 句首模板：有经验用户的「填空感」

**证据**：S05（公共政策硕士）因模板「把我框住」、行文「略生硬」而给偏好 3/5。S01、S02 在模板内写作未抱怨。S03、S04 重度依赖模板，符合设计意图。

**根因**：预填可编辑内容促使用户像填表一样补句。更有经验的写作者感到自然措辞受限。

**建议调整**：预填改为输入即消失的斜体占位（标准 HTML placeholder）。JS 数值校验仍检查提交是否含数字。既为信心较低者保留引用脚手架，又减轻能流畅写作者受到的填空约束。

---

## 4. 高保真中**未再出现**的问题

以下中保真失效模式在高保真**未观察到**：

- 复苏指标误读为健康：0 次（中保真 1/8；低保真 3/10）
- 抱怨切屏摩擦：0 次（中保真 S07、S08）
- 无域语境即跳过入门：0 次（中保真 S03、S06、S07）
- 未开来源面板即信任 5：0 次（中保真 2/8）
- 解释提交无引用数值：0 次（JS 门控）

---

## 5. 设计简报：展示原型调整

**优先级 1（展示前，工作量小）：**

- [ ] 解释模板由预填改为斜体占位，保留 JS 数值校验。
- [ ] 边界自检后增加「编辑解释」链接，实现选择性返回。
- [ ] 限制栏下增加「这一限制对解读本对比为何重要？」脚手架。

**优先级 2（展示后若继续开发）：**

- [ ] 真实参与者测试（n=15–20），在 n=6 试点外复核 H5 领域标签发现。
- [ ] 检验信任门控脚手架对限制文本质量与信任校准的影响。
- [ ] 探索渐进画布在开放探索（非顺序任务）下是否仍保留研究工具属性。

---

## 6. 修订后的用户画像（定稿）

高保真确认了中保真确立的定位：**出于教育或公共参与目的、进行循证推理的非专业成年人**（学生、记者、政策倡导者、社区研究者等）。高保真数据进一步说明：

- 无经济学训练者（S03、S04、S06）在持久标签与芯片定义下能正确理解域与指标。
- 有经济背景者（S01、S02、S05）边界推理更丰富，但略感模板束缚 —— 他们最受益于占位式（非预填）呈现。
- 无人表现差到应被排除在目标用户之外，说明渐进画布在非专业谱系上有效。

---

## 7. 总结陈述

高保真渐进引导画布达成了四项主要设计目标：无可关掉的入门屏下仍能域锚定；模板 + JS 强制引用；建构式自检促进边界内化；信任门控保障基线来源参与。

展示前尚余三处小调：模板呈现、解释返回修改、信任门控脚手架。均不阻碍 Week 13。

核心设计论点 —— 持久域语境、结构性引用脚手架与建构式边界任务共同支持非专业用户形成有效、有据、具备边界意识的经济解读 —— 已获高保真证据支持。

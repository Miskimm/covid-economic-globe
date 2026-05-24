# Prototype Direction Decision

## Decision

Move forward with a **merged prototype direction**:

> Guided Comparison Dashboard + Narrative Evidence Flow

This means the next design should not continue as a globe-first interface. It should use a structured dashboard layout for comparison, but guide users through the interpretation in stages.

## Why Not Continue Globe-first

Earlier testing showed that the globe generated engagement, but it did not reliably produce verbal explanation or evidence-based interpretation. Users could explore, rotate, and click, but this did not prove they understood the economic indicators.

The low-fi validation reinforces this issue. The major problems were not visual appeal or engagement. The major problems were:

- metric semantics;
- baseline confusion;
- source and method trust;
- false causation;
- preference-understanding mismatch.

A globe-first interface risks pulling attention back toward navigation and visual novelty before these interpretation problems are solved.

## Why Not Use Only a Static Dashboard

The low-fi results show that structured comparison helps users identify the deeper economic shock. However, a static dashboard alone may still allow users to skip the meaning of indicators or overclaim causation.

Users need guidance before they compare. They also need prompts that force them to cite evidence and reflect on what cannot be concluded.

## Why Merge Dashboard and Narrative Flow

### Dashboard Strength

- Supports side-by-side country comparison.
- Makes evidence values visible.
- Helps users cite specific numbers.
- Reduces navigation burden compared with a 3D globe.

### Narrative Flow Strength

- Sequences the interpretation.
- Reduces cognitive overload.
- Helps users distinguish health trend, economic trend, linked observation, and causal boundary.
- Makes confidence and trust reflection easier to collect.

## Proposed Next Prototype Structure

### Screen 1 — Metric Primer

Purpose: ensure users understand core indicators before comparison.

Required elements:

- `GDP gap from 2019 baseline`
- `Economic recovery from 2020 trough`
- glossary chips for `pp`, `baseline`, `trough`
- mini worked example
- "does not mean" notes

### Screen 2 — Guided Country Comparison

Purpose: support evidence-backed comparison.

Required elements:

- UK vs Australia comparison panel
- 2020 vs 2023 time points
- COVID indicators and economic indicators separated visually
- evidence chips highlighting key values
- one-sentence interpretation prompt

### Screen 3 — Boundary Check

Purpose: prevent false causation.

Required elements:

- supported claim vs unsupported causal claim
- explicit "correlation is not automatic causation" reminder
- user confidence rating
- explanation field

### Screen 4 — Source and Method Traceability

Purpose: support calibrated trust.

Required elements:

- source names
- update/snapshot date
- formulas
- missing-data note
- reporting-difference note
- source links or citation-ready references

## Decision Type

**Merge with partial pivot.**

- Merge Option A and Option B from `prototype_options_and_validation.md`.
- Pivot away from visual-spectacle-first globe interaction.
- Keep the project within interactive data visualization, but make interpretation the primary interaction.

## Design Rationale Statement

The low-fi testing suggests that users do not mainly need more visual complexity; they need better support for reading, comparing, and bounding claims. Therefore, the next prototype should prioritize guided interpretation and evidence traceability before reintroducing immersive or globe-based exploration.

## What to Retire for Now

- Globe rotation as the primary entry point.
- Dense multi-panel views with multiple competing signals.
- Ambiguous labels such as `Recovery vs 2020`.
- Passive-only causation warnings.

## What to Keep

- Cross-country comparison.
- Cross-time comparison.
- COVID and economic indicators shown together.
- Source and method transparency.
- Trust and confidence measurement.

## What to Add

- Glossary chips.
- Worked metric examples.
- Evidence chips.
- Active boundary task.
- Source/method expandable panel.
- Guided interpretation prompts.

---

# 中文译本：原型方向决策

## 决策

推进一个**合并后的原型方向**：

> 引导式对比仪表盘 + 叙事式证据流

这意味着下一版设计不应继续以 globe-first 作为主要入口。它应使用结构化 dashboard 布局来支持比较，但通过分阶段流程引导用户完成解释。

## 为什么暂时不继续 globe-first

早期测试显示，globe 能带来参与感，但不能可靠地产生口头解释或基于证据的解读。用户可以探索、旋转、点击，但这并不能证明他们理解了经济指标。

低保真验证进一步强化了这个问题。主要问题不是视觉吸引力或参与度，而是：

- 指标语义；
- 基线混淆；
- 来源与方法信任；
- 虚假因果；
- 偏好与理解背离。

在这些解释问题解决前，以 globe 为主入口的界面可能会把注意力重新拉回导航和视觉新奇感。

## 为什么不只使用静态 dashboard

低保真结果显示，结构化比较能帮助用户识别更深的经济冲击。然而，仅靠静态 dashboard 仍可能让用户跳过指标含义，或过度推断因果。

用户在比较之前需要引导。他们也需要被要求引用证据，并反思哪些结论不能得出。

## 为什么合并 dashboard 和叙事流程

### Dashboard 的优势

- 支持并排国家比较。
- 让证据数值可见。
- 帮助用户引用具体数字。
- 相比 3D globe 降低导航负担。

### 叙事流程的优势

- 按顺序组织解释。
- 降低认知负荷。
- 帮助用户区分健康趋势、经济趋势、联动观察和因果边界。
- 更容易收集自信与信任反思。

## 下一版原型结构建议

### Screen 1 — 指标入门

目的：确保用户在比较前理解核心指标。

必要元素：

- `GDP gap from 2019 baseline`
- `Economic recovery from 2020 trough`
- `pp`、`baseline`、`trough` 的术语标签
- 简短示例
- “不代表什么”的说明

### Screen 2 — 引导式国家比较

目的：支持基于证据的比较。

必要元素：

- 英国 vs 澳大利亚对比面板
- 2020 vs 2023 时间点
- COVID 指标与经济指标在视觉上分开
- 突出关键数值的证据标签
- 一句话解释提示

### Screen 3 — 边界检查

目的：防止虚假因果。

必要元素：

- 有支持的主张 vs 无支持的因果主张
- 明确的“相关不等于自动因果”提醒
- 用户自信评分
- 解释输入区域

### Screen 4 — 来源与方法可追溯

目的：支持校准后的信任。

必要元素：

- 来源名称
- 更新/快照日期
- 公式
- 缺失数据说明
- 上报差异说明
- 来源链接或可引用参考

## 决策类型

**合并并部分转向。**

- 合并 `prototype_options_and_validation.md` 中的方案 A 和方案 B。
- 从视觉效果优先的 globe 交互中转向。
- 保持项目仍属于交互式数据可视化，但让“解释”成为主要交互。

## 设计理由陈述

低保真测试显示，用户主要需要的不是更多视觉复杂度，而是更好地阅读、比较和限制主张的支持。因此，下一版原型应优先考虑引导式解释和证据可追溯性，再考虑重新引入沉浸式或 globe 探索。

## 暂时移除

- 将 globe 旋转作为主要入口。
- 包含多个竞争信号的密集多面板视图。
- `Recovery vs 2020` 等含糊标签。
- 只使用被动因果警告。

## 保留

- 跨国比较。
- 跨时间比较。
- 同时展示 COVID 与经济指标。
- 来源与方法透明。
- 信任与自信测量。

## 添加

- 术语标签。
- 指标示例。
- 证据标签。
- 主动边界任务。
- 可展开来源/方法面板。
- 引导式解释提示。


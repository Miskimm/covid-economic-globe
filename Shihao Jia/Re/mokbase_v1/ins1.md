不完全是“把整个 checklist 从头到尾再做一遍”，更准确的说法是：**下一轮测试对应 checklist 里后半段的循环**：执行研究 → 收集证据 → 综合 → 更新设计要求 → 再做一个更接近真实的原型再测。

---

## 1. 下一轮测试是不是就按 `next_iteration_plan.md`？

**是的。** 下一轮的主线就是那份文件里的：

- 研究问题  
- 假设 H1–H4  
- 任务（指标解释、国家比较、因果边界、信任/引用）  
- 通过标准  

原型形态：**中保真 guided comparison dashboard + narrative flow**（可以是 Figma 可点原型，或简化版可交互网页），重点是 **任务可比、证据可比**，不一定要和功能完备的成品一样。

---

## 2. 要不要再完整跑一遍 `research_problem_plan_checklist.md`？

**不需要从 Day 0 全部重做。**  

那份 checklist 里前几步（反馈审计、用户定义、problem statement、gap matrix）你在 `Re/research/solution1-4` 和 `plan/` 里已经做过了。除非：

- tutor 又给了新反馈，或  
- 你**大幅改**了用户、数据集、研究问题，

才需要回到前面几步修订。

**下一轮你主要循环的是：**

- **Step 7：执行研究**（按计划跑中保真测试）  
- **Step 8：综合证据**（insights、推翻的假设、未知、设计决策）  
- **必要时**微调 Step 5–6（若你发现方法或文献论证需要补）

---

## 3. “再得到 mokbase 里的几个文件”是什么意思？

`mokbase` 里的四个文件本质上是一套 **模板**，每一轮验证后都应该 **更新内容**，而不是从零再造四个新文件名。

建议做法是：

| 轮次 | 文件怎么处理 |
| --- | --- |
| Low-fi 之后 | 已有：`solution8_evidence_synthesis`、`design_brief_after_lowfi`、`prototype_direction_decision`、`next_iteration_plan` |
| Mid-fi 测试之后 | **更新同一份**（或复制一份注明日期，如 `solution8_evidence_synthesis_midfi.md`），写入新证据、新结论 |
| Hi-fi 测试之后 | 同样 **更新** synthesis / brief / decision / plan，或加后缀 `_hifi` |

核心是：**证据在变，文档版本在变**，逻辑仍是「测试 → 综合 → 更新 brief → 决策下一步」。

---

## 4. 高保真是不是再重复一遍？

**流程类似，但目标和粒度不同：**

- **中保真**：验证 **概念是否正确**（指标懂不懂、边界会不会误判、证据会不会引用）。  
- **高保真**：验证 **实现是否破坏理解**（视觉层级、交互噪声、性能、真实数据状态）、以及 **showcase 可用性**。

你不会每次都重写一整份 gap matrix，但可能会：

- 更新 **成功指标**（例如 showcase 级任务）  
- 补 **可用性/信任** 的细节  
- 在 Step 8 里写 **高风险残留问题**

---

## 5. 一句话总结你的流程

**下一轮：** 按 `next_iteration_plan.md` 做 **中保真** → 跑测试 → **更新** mokbase 四类文档（证据综合、brief、方向、下一轮计划）。  

**再下一轮：** 在高保真上跑 **更贴近真实场景** 的测试 → **再次更新** 同一套文档（或 `*_hifi` 版本）。

这样才是 DECO7180 要的 **迭代 + rationale**，而不是 checklist 机械抄三遍。

如果你愿意，我可以帮你定一个 **清晰的命名规则**（例如 `mokbase/v2026-05-midfi/` 文件夹），避免同一 repo 里 synthesis 版本混在一起难引用。
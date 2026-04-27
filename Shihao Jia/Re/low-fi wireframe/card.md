好，给你可直接照抄到 Figma 的 **ASCII 线框草图**（3页）。

---

## Screen 1 — Indicator Meaning

```text
+----------------------------------------------------------------------------------+
| COVID-19 x Economy: How to Read the Metrics                                    |
+----------------------------------------------------------------------------------+
| [Block A] GDP vs 2019                                                           |
| Meaning: Current GDP growth compared with pre-pandemic baseline (2019).         |
| Example: Country X = -4.5pp                                                     |
| Interpretation: 4.5 percentage points lower than 2019 growth.                   |
+----------------------------------------------------------------------------------+
| [Block B] Recovery vs 2020                                                      |
| Meaning: Current GDP growth compared with 2020 trough year.                     |
| Example: Country X = +6.2pp                                                     |
| Interpretation: 6.2 percentage points higher than 2020 level.                   |
+----------------------------------------------------------------------------------+
| [What this DOES NOT mean]                                                       |
| - Does NOT prove direct causation between COVID cases and GDP change.           |
| - Does NOT represent total GDP size.                                            |
+----------------------------------------------------------------------------------+
| Quick Check                                                                      |
| Q1: Which metric shows pre-pandemic gap?  [_________]                           |
| Q2: Which metric shows post-trough rebound? [_________]                         |
+----------------------------------------------------------------------------------+
```

---

## Screen 2 — Country-Time Comparison

```text
+----------------------------------------------------------------------------------+
| Compare Countries Across Time                                                    |
+----------------------------------------------------------------------------------+
| Country A [dropdown]   Country B [dropdown]   Time1 [YYYY]   Time2 [YYYY]       |
+--------------------------------------+-------------------------------------------+
| [Country A Snapshot]                 | [Country B Snapshot]                      |
| Cases:        T1 ____   T2 ____      | Cases:        T1 ____   T2 ____           |
| GDP vs 2019:  T1 ____   T2 ____      | GDP vs 2019:  T1 ____   T2 ____           |
| Recovery2020: T1 ____   T2 ____      | Recovery2020: T1 ____   T2 ____           |
+--------------------------------------+-------------------------------------------+
| Evidence-Based Conclusion                                                     |
| 1) Which country had deeper shock? [________________________]                   |
| 2) Which value supports your answer? [____________________]                     |
| 3) What cannot be concluded here? [_______________________]                     |
+----------------------------------------------------------------------------------+
| Boundary Reminder: Aligned trends indicate correlation, not automatic causation. |
+----------------------------------------------------------------------------------+
```

---

## Screen 3 — Trust & Source Transparency

```text
+----------------------------------------------------------------------------------+
| Before You Trust the Conclusion                                                  |
+----------------------------------------------------------------------------------+
| [Source Card]                                                                    |
| - Data sources: WHO / World Bank / OWID                                          |
| - Last updated: __________                                                       |
| - Missing data note: __________                                                  |
+----------------------------------------------------------------------------------+
| [Method Card]                                                                    |
| - GDP vs 2019 = current growth - 2019 growth                                     |
| - Recovery vs 2020 = current growth - 2020 growth                                |
| - Limitations: country reporting differences / lag / non-causal interpretation   |
+----------------------------------------------------------------------------------+
| [Boundary Banner]                                                                |
| "Observed alignment does NOT prove causation."                                   |
+----------------------------------------------------------------------------------+
| Trust Check                                                                       |
| Trust score (1-5): [ ] [ ] [ ] [ ] [ ]                                           |
| What extra information do you need to trust this?                                |
| [______________________________________________________________________________] |
+----------------------------------------------------------------------------------+
```

---

## Figma 快速搭建建议（10分钟版）

- 每页先画 1 个大容器 + 3-4 个卡片，不加颜色只用灰阶。
- 字体层级只保留：标题 / 标签 / 正文 3级。
- 所有输入框先用矩形占位，文本用真实问题句（不要 lorem ipsum）。
- 每页底部保留一个 **Boundary reminder**（防因果误判）。

如果你要，我下一条可以给你 **“访谈时怎么走这三页”的主持人口播稿**（逐句版，中文）。

对，`card.md` 里那些空白是**故意留给你们填真实内容**的。  
你们需要填的是“这次测试用的具体国家、时间、数值、来源说明”，不是随便占位。

按页面来填：

## Screen 1（指标解释页）要填

- `Country X` 换成真实国家名（建议用你们后面会比较的国家）
- `-4.5pp / +6.2pp` 换成你们准备展示的真实示例值
- 两个一句话解释可以保留，但建议改成你们组统一术语版本

## Screen 2（国家-时间对比页）要填

- `Country A / Country B`：填你们测试要用的两国（建议差异明显）
- `Time1 / Time2`：填具体年份或日期（例如 2020 vs 2023）
- `Cases / GDP vs 2019 / Recovery2020` 的 `____`：填真实或一致的 mock 数据
- 底部三个问题框可以保留空白（这是给受访者回答的）

## Screen 3（来源与信任页）要填

- `Last updated`：填你们数据快照时间
- `Missing data note`：写清是否有缺失/估算
- `Limitations`：至少写 2-3 条（例如“不可推断因果”“国家上报口径差异”）

---

## 最关键的一点

你们要保证 **三页里用的是同一组国家/同一时间逻辑**，否则受访者会混乱，数据也不可比。

---

如果你愿意，我可以下一条直接给你一套“可直接粘贴进去的示例填充值”（两国、两时间点、三指标、来源说明一整套）。

`T1` 和 `T2` 就是 **两个时间点（Time 1 / Time 2）**，用于做前后对比。

在你们这个项目里，最自然的填法是：

- `T1 = 2020`（疫情冲击期）
- `T2 = 2023`（恢复阶段）

这样受访者更容易理解“冲击 vs 复苏”。

---

你在 Screen 2 里会看到每个指标都写了 `T1 ____   T2 ____`，意思是：

- 同一个国家同一个指标，在两个时间点各有一个值
- 例如 Country A:
    - Cases: `T1 120k` / `T2 35k`
    - GDP vs 2019: `T1 -6.0pp` / `T2 -1.5pp`
    - Recovery2020: `T1 0.0pp` / `T2 +4.5pp`

---

小建议：  
为了避免混淆，在你们 low-fi 上直接把 `T1/T2` 改成具体标签，比如：

- `T1 (2020)`
- `T2 (2023)`

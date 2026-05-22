# 面试携带证据清单（打印用）

> Tutor 会以 **`weekly_activity.md`（你填写的 Shihao 部分）** 为主轴提问。  
> 下列按 **推荐装订顺序** 排列；页数为 **打印估算**（A4、正常字号、可选双面）。

---

## 必带（核心包，约 12–15 页）

| 序号 | 打印内容 | 文件路径 | 对应 weekly 周次 | 证明什么 |
| --- | --- | --- | --- | --- |
| ① | **你的 weekly activity 摘录** | [weekly_activity_Shihao_打印摘录.md](./weekly_activity_Shihao_打印摘录.md)（或保存后的 `../weekly_activity.md` 全文） | W4–W11 | 课程官方学习记录 |
| ② | Problem Statement（用户+核心问题） | `Re/plan/problem_statement_v2.md` | W5、W9 转向 | 为谁、解决什么 |
| ③ | A01 Feedback Audit（1 页） | `Re/plan/feedback_audit.md` | W9 | 为何从可视化转向解读 |
| ④ | 1st test Summary 表 + 3/10 recovery 段 | `Re/1st_test/result_interview.md` 末 `# Summary` | **W10** | Recovery 误读证据 |
| ⑤ | 1 个参与者深度摘录（S03 或 S05） | `Re/3rd_test/result.md` 中 S03 或 S05 小节 | W11 | 边界+局限+信任 |
| ⑥ | Hi-fi 假设结果表（H5–H8） | `Re/3rd_test/result.md` Hypothesis table | W11 | badge / trust gate 有效 |
| ⑦ | 5.8 会议分工（半页） | `Re/5.8meeting/meeting-summary.md` §四、§六 | W11 | 来源框+对比 |
| ⑧ | 你的 W11 Q2 行动（weekly 原文或 `10_*.md` §Week11） | `weekly_activity.md` 或 `interview/10_*.md` | W11 | 个人交付 |
| ⑧b | **W12 Q1 分叉 + Q2 拒案表（压缩）** | [weekly_activity_Shihao_打印摘录](./weekly_activity_Shihao_打印摘录.md) §W12 | **W12** | 设计理性总述 |
| ⑨ | 团队原型截图 ×3 | 自截：地球+时间轴 / 搜索 / 对比或来源展开 | W6–7、W11 | 实现 |

---

## 选带（被追问加深，约 8 页）

| 序号 | 打印内容 | 路径 | 何时翻 |
| --- | --- | --- | --- |
| ⑩ | Gap matrix + RQ | `Re/plan/gap_matrix_rumsfeld.md` | 问研究问题 |
| ⑪ | mokbase_v1 方向决策（globe vs dashboard） | `Re/mokbase_v1/prototype_direction_decision.md` p1–3 | 问为何个人线非地球主界面 |
| ⑫ | 2nd test Summary（primer 跳过） | `Re/2nd_test/result.md` 末尾 | 问为何不用独立 primer |
| ⑬ | Design brief hi-fi 三项调整 | `Re/mokbase_v3/design_brief_after_hifi.md` §5 | 问展示前还改什么 |
| ⑭ | 卡片 A 设计（可选） | `Re/1st_test/card_mok.md` | 问 W10 工具长什么样 |

---

## 打印 ① 的两种方式

**方式 A（推荐）**：直接打印 [weekly_activity_Shihao_打印摘录.md](./weekly_activity_Shihao_打印摘录.md)（已按周整理 Shihao 段落）。

**方式 B**：打开 `Shihao Jia/weekly_activity.md` → **⌘S 保存**（未保存时磁盘可能为 0 字节，打印出来是空白）→ 按周复制 **`Shihao:`** 段落合并 PDF。

**如何确认已保存**：在终端运行 `wc -l "Shihao Jia/weekly_activity.md"`，应显示约 **900+ 行**，不是 `0`。

建议结构：

```
封面（手写）：Shihao Jia · DECO7180 · Weekly Activity Excerpts · Interview
W4  Shihao …
W5  Shihao …
W6  Shihao …
W7  Shihao …
W8  Shihao …
W9  Shihao …
W10 Shihao …（重点加粗或荧光笔标 3/10 recovery）
W11 Shihao …（重点标 source + compare 行动）
W12 Your Answer …（重点标 Path B、R3 favorite≠best、3/10→0/6）
```

**行号锚点（便于你快速定位）**

| 周 | 大致行号（`weekly_activity.md`） |
| --- | --- |
| W4 | 17–19, 38–40 |
| W5 | 50–51, 76–77, 89–91 |
| W6 | 120–121, 140–145, 183–188 |
| W7 | 234–237, 264–272, 317–320, 366–370 |
| W8 | 402–410, 433–441, 473–479, 490–497 |
| W9 | 509–516, 545–549, 611–618 |
| W10 | 660–666, 703–748, 794–806 |
| W11 | 861–866, 893–897 |
| **W12** | **915–1567**（Q1 ~917–1028；Q2 ~1029–1331；Q3 ~1333–1567） |

---

## 装订与现场使用

1. **夹册顺序**：① weekly 摘录 → ②③ 问题定义 → ④–⑥ 测试 → ⑦⑧ 分工与行动 → ⑨ 截图。  
2. **贴便签**：W10 页贴「3/10 health recovery」；W11 贴「来源+对比」。  
3. **电脑**：本地跑通 `python3 -m http.server 8000`，与 ⑨ 截图一致。  
4. **口头**：用 [10_每周作业与学习轨迹](./10_每周作业与学习轨迹（weekly_activity）.md) §四 的「Week __ 我写…验证了…做了…」句型。

---

## 周次 → 必翻页 速查（面试时）

| Tutor 可能问 | 先翻 |
| --- | --- |
| 学期初怎么理解问题？ | ② + W4–5 摘录 |
| 为什么用地球？ | W6–7 摘录 + ⑨ 截图 |
| 为什么旋转？/ 为什么搜索？ | W7 摘录 + [04_功能逐项问答](./04_功能逐项问答.md) |
| A01 后改了什么？ | ③ + W9 摘录 |
| Recovery 怎么回事？ | W10 摘录 + ④ |
| 你怎么测试的？ | ④⑤⑥ + W9–11 摘录 |
| 你个人做了什么？ | ⑦⑧ + W11 Q2 |
| 为什么没继续纯地球 / 拒了哪些方案？ | **W12 摘录** + [06_团队方案vs个人迭代](./06_团队方案vs个人迭代.md) |
| 谁受益谁受损？ | W12 Q3 摘录 + W5 伦理 |
| 团队 vs 你个人方案？ | ⑪ + 06 |

---

## 数字与 weekly activity 一致性（勿背错）

| 数据 | weekly activity | 研究文档 |
| --- | --- | --- |
| Recovery 健康误读 | W10：3/10 场次 | `1st_test/result_interview.md`：3/10 |
| 更深冲击识别 | W10：7/10 | 同左：7/10 |
| Hi-fi 健康误读 | （W11 叙述）0/6 | `3rd_test/result.md` H5 |
| Globe 偏好（团队问卷） | Hongbiao W10：7/10 偏好 globe | 团队材料；你个人线强调 **偏好≠理解** |

面试时：**个人论证用 ①④⑤⑥（你的测试线）**；**团队展示可提 7/10 偏好 globe，但必须接 W10/W11 的解读脚手架**。

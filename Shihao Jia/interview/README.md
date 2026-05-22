# DECO7180 Interview 备考包

> **用途**：Week 13 Design Rationale Capture / interview 前 1 周集中复习。  
> **原则**：每个设计点都能讲清 `Research Question → Testing/Interview → 结论 → 功能实现`（见 `Re/5.8meeting/meeting-summary.md`）。  
> **Tutor 主轴**：面试时会对照你提交的 **`../weekly_activity.md`（Shihao: 各周回答）**——务必配合 **[PRINT_携带证据清单](./PRINT_携带证据清单.md)** 打印原始证据。

## 建议复习顺序（约 3–4 小时）

| 顺序 | 文件 | 时间 | 目标 |
| --- | --- | --- | --- |
| 0 | [PRINT_携带证据清单](./PRINT_携带证据清单.md) + **[weekly_activity_Shihao_打印摘录](./weekly_activity_Shihao_打印摘录.md)** + [10_每周作业与学习轨迹](./10_每周作业与学习轨迹（weekly_activity）.md) | 60 min | **打印装订**；weekly 原文 ↔ 测试证据 ↔ 功能 |
| 1 | [01_30秒开场与项目总览.md](./01_30秒开场与项目总览.md) | 20 min | 能脱稿说清「做什么、为谁、解决什么问题」 |
| 2 | [02_问题用户与研究问题.md](./02_问题用户与研究问题.md) | 30 min | 回答概括性问题（用户、必要性、A01 转向） |
| 3 | [03_设计决策证据链.md](./03_设计决策证据链.md) | 45 min | 掌握三轮测试 → 设计改动的逻辑 |
| 4 | [04_功能逐项问答.md](./04_功能逐项问答.md) | 60 min | **重点**：地球、对比、来源、AI、时间轴等具体题 |
| 5 | [05_个人贡献_来源框与对比.md](./05_个人贡献_来源框与对比.md) | 40 min | 你的分工与可演示路径 |
| 6 | [06_团队方案vs个人迭代.md](./06_团队方案vs个人迭代.md) | 20 min | 团队 globe vs 个人 mokbase 如何同场不打架 |
| 7 | [07_模拟面试题单.md](./07_模拟面试题单.md) | 45 min | 自问自答 / 找人 mock |
| 8 | [08_关键数据与话术卡.md](./08_关键数据与话术卡.md) | 15 min | 背数字与固定句式 |
| 9 | [09_证据文件索引.md](./09_证据文件索引.md) | 需要时查 | 快速打开原始材料 |

## weekly_activity 与 Re/ 的关系

| 文档 | 角色 |
| --- | --- |
| `../weekly_activity.md` | **课程提交记录**（Tutor 手持）；记录你每周「当时怎么想的」 |
| [weekly_activity_Shihao_打印摘录.md](./weekly_activity_Shihao_打印摘录.md) | **仅 Shihao 段落**，按周排版，供夹册①打印 |
| `Re/1st_test` … `3rd_test` | **可引用测试证据**（n=10/8/6、逐场记录） |
| `Re/mokbase_v*` | **迭代决策说明书** |
| 本文件夹 `10_*.md` | 把 weekly 叙述 **映射到** 上述证据与团队功能，避免现场翻 900 行原文 |

## 两个原型，面试时别混

| 线 | 位置 | 角色 |
| --- | --- | --- |
| **团队终版** | 仓库根目录 `index.html` + `src/` | Showcase 主原型：3D 地球 + 时间轴 + 搜索 + 2D 切换 + 国家面板 |
| **个人研究线（mokbase）** | `Re/1st_test` → `2nd_test` → `3rd_test` | 三轮低保真→高保真仪器；证明 interpretation-first 设计；**可说明为 individual iteration** |

面试时：**团队功能用团队代码 + 5.8 会议 + 你的分工**；**设计方法论与测试结论用 mokbase 三轮 + mokbase_v1–v3**。

## 考前 24 小时 checklist

- [ ] 按 [PRINT_携带证据清单](./PRINT_携带证据清单.md) 打印并装订（含 weekly Shihao 摘录 + 1st/3rd test 表）
- [ ] 能画一张简图：地球（哪里）→ 侧栏（什么数）→ 对比（两国）→ 来源框（从哪来、不能证明什么）
- [ ] 能举 1 个 low-fi 失败模式 + 1 个 hi-fi 修复机制 + 对应团队功能
- [ ] 能说明个人分工（来源框 + 多区域对比）与测试发现的对应关系
- [ ] 诚实说明样本量（n=10 / 8 / 6）与局限，不夸大统计代表性
- [ ] 本地跑通原型：`python3 -m http.server 8000` → 演示搜索、点击国家、时间轴、2D 切换

## 相关原始文档（不在本文件夹内）

- 学期全过程：`../Re/agent_summary_2.md`
- Week 13 展示叙事：`../Re/result.md`
- 小组共识：`../Re/5.8meeting/meeting-summary.md`

# 每周作业与学习轨迹（Shihao 部分）

> **来源**：`../weekly_activity.md` 中 **Shihao:** / **Shihao** / **Your Answer**（W12）条目（与 Hongbiao / Zhuoding / Ruonan 同表）。  
> **打印**：直接打 [weekly_activity_Shihao_打印摘录.md](./weekly_activity_Shihao_打印摘录.md)（推荐）；装订顺序见 [PRINT_携带证据清单](./PRINT_携带证据清单.md)。  
> **面试用途**：Tutor 对照你提交的作业逐周追问；本文 = **口述提纲 + 证据映射**（不必现场翻 900 行原文）。

---

## 一、学期叙事：六句话串起 W4→W12

1. **W4–5**：从「做可视化」转向「官方统计与真实理解之间的断层」——伦理、信任、不平等；原型作 **probe**（文献 + 问题空间）。  
2. **W6–7**：描述并实现团队 **3D 地球 + 时间轴**；课堂测试发现旋转负担、shock/recovery 需解释、**live/fallback 混淆信任**。  
3. **W8–9**：四原型比较 → 核心缺口是 **preference ≠ understanding**；W6 协议太开放 → **Stage A/B 拆分**；A01 后回 problem define。  
4. **W10**：**1st test n=10**——第 3 场起 **Recovery→健康恢复（3/10）**；否定 glossary/被动 tooltip → **域标识 + Guide Card**。  
5. **W11**：三轮稳定失败模式写入团队原型；个人分工：**来源四层 + 多国对比 + trust gate**（Ruonan 纪要：*Jia leads data source disclosure and comparing regions*）。  
6. **W12**：书面总结 **Path B 分叉**、**18 类被拒方案**、**谁受益/谁受损及缓解** —— 把 W4–11 收成可辩护的 design rationale + equity 论述。

这条线 = **Design Rationale Capture** 主线；`Re/` = 完整测试证据；weekly = **课程提交时间戳**（证明「当时你怎么想」）。

---

## 二、逐周：你写了什么 → 学到了什么 → 打印什么

### Week 4

**Weekly 原文要点**

- 文献：COVID = 经济×社会×技术×伦理；dashboard 有隐私/不平等/排斥风险。  
- Q2：不能只靠技术；要 ethics + society + stakeholders。

**面试可说的转变**

> 学期前半已意识到「展示数据」不够，需要 **responsible / interpretable** 设计。

**对齐句**

> Week 4 我写 COVID 是复合冲击、技术有双面性；W9 用 A01 把用户锁到「解读」；W10 用 3/10 证明术语歧义。

| 打印物 | 路径 |
| --- | --- |
| 文献综合（可选 1–2 页） | `Re/research/literature/conclusion.md` |
| W4 原文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W4 |

---

### Week 5

**Weekly 原文要点**

- 问题空间 = 冷统计与大众理解之间的 **messy middle**；不证明简单因果规则。  
- 伦理：误表征（阿根廷检测）、隐形不平等、**信任**、重界面排斥慢网用户。  
- 方法：行业/失业/lockdown 数据 + 原型作 **probe** + think-aloud。

**与后文连接**

| W5 你已写 | 后来验证 | 终版功能 |
| --- | --- | --- |
| 旋转/地理负担（隐含在公平+probe） | W7 课堂测试 | Search |
| 信任非技术问题 | W6 live/fallback；mid/hi trust | 来源框、trust gate |
| 不平等被宏观平均隐藏 | W10 7/10 会比较但误读 recovery | 对比 + domain badge |

| 打印物 | 路径 |
| --- | --- |
| Problem statement | `Re/plan/problem_statement_v2.md` |
| W5 原文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W5 |

---

### Week 6

**Weekly 原文要点**

- 与团队代码一致：`index.html`、3D 地球、HUD、GDP shock / recovery、时间轴、hover vs click-lock。  
- 要测：任务耗时、地球 vs 图表注意力、叙事理解、**来源态度**。  
- 设计可观察性：hover/lock 分轨、时间轴、疫症与宏观分栏、methodology 卡。

| 打印物 | 路径 |
| --- | --- |
| W6 原文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W6 |
| 团队原型截图 | 本地 `index.html` |

---

### Week 7（课堂测试 · 高频）

**Weekly 原文要点**

- 组织：pilot 1–2 人 → 正式 3–5；同意 + 任务 + think-aloud。  
- 学到：时间轴有助动态感；**shock/recovery 仍需文案**；3D 选国依赖地理、反复旋转；**live vs sample 混淆可信度**。  
- 下一步（你写的）：缩短找国、**搜索**、强化方法论与来源。

**与 5.8 / 团队功能**

| W7 结论 | 团队后续 | 你的模块 |
| --- | --- | --- |
| 旋转成本 | Search | — |
| 来源/方法论 | 来源抽屉 | 来源框 |
| 指标解释 | AI / chip / badge | 侧栏语义 |

| 打印物 | 路径 |
| --- | --- |
| W7 全文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W7 |
| 英文镜像（可选） | `Re/od/weekly activity.md` |

---

### Week 8

**Weekly 原文要点**

- 描述四种数字原型（Dashboard / Immersive / Simulator / Globe）。  
- 缺口：**preference vs understanding**、3D 何时 justified、信任与宏观/微观。  
- 问卷维度：clarity, trust, fatigue… + 偏好与解释是否分叉。

| 打印物 | 路径 |
| --- | --- |
| 四原型方案 | `Re/plan/prototype_options_and_validation.md` |
| W8 原文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W8 |

---

### Week 9（方法论转折 · 高频）

**Weekly 原文要点**

- W6：任务太开放 → 只收集到交互、几乎没有指标含义数据；混合任务无法归因；病例吸走注意力；**live/fallback**；**RQ 未锁就开工**。  
- 调整：**Stage A** 导航 / **Stage B** 含义；减少任务、加 probe；显式问来源。  
- 原型：标签改为 `GDP index (2019=100)`、`recovery rate from 2020 trough (%)`；健康/经济视觉分离；W8 四原型对比 → globe 弱在 **verbal explanation**。

| 打印物 | 路径 |
| --- | --- |
| A01 转向 | `Re/plan/feedback_audit.md` |
| Gap + RQ | `Re/plan/gap_matrix_rumsfeld.md` |
| W9 原文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W9 |

---

### Week 10（1st test · 最强证据周）

**Weekly 原文故事（必能脱稿）**

- 工具：问卷英文 + 主持稿；Card A：UK GDP gap **−1.5pp**，recovery **+8.9pp**；括号注释标为风险。  
- 规则：**不纠正**，只问「卡片上什么信息让你这么结论」。  
- **第 3 场**：recovery = 澳洲疫情恢复速度 → 感染人数；**3/10** 同类；2/10 经济/健康混用「recovery」。  
- Q2 结论：不是标签印错，是 **COVID 先激活健康框架** → 需要 **域识别先于指标名**。  
- 测试摘要写入 weekly：**7/10** 会比冲击深度；**preference≠understanding**；合并 Option A+B。  
- Q3：否定 glossary、否定被动 tooltip → **Indicator Guide Card**（四要素）→ hi-fi **ECONOMIC badge + chips**。

| 打印物 | 路径 |
| --- | --- |
| W10 长文 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W10 |
| Summary 表 | `Re/1st_test/result_interview.md` 末 `# Summary` |
| 卡片 | `Re/1st_test/card_mok.md` |
| 方向决策 | `Re/mokbase_v1/prototype_direction_decision.md` p1–3 |

---

### Week 11（进终版 + 你的交付清单）

**Weekly Q1（与 `Re/result.md` 同步）**

- 稳定失败：recovery 歧义、pp/baseline、因果过度、**信任分≠读来源**。  
- 落地：badge、chip、对比槽、引用串、**四层 provenance**、trust gate、search、3D/2D。  
- **个人 scope**：source panel + multi-region comparison。

**Weekly Q2（Tutor 可逐条对照是否做到）**

1. 来源抽屉四层 + trust gate（局限必选）  
2. 对比 MVP：两槽、对齐年、高亮 2020 GDP gap、**copyable citation string**  
3. Badge/chip 进点击后侧栏；术语表统一  
4. 可回改国家/年/解释草稿  
5. AI 治理一页纸 + 每功能 **RQ→测试→设计→截图** 单页  

| 打印物 | 路径 |
| --- | --- |
| W11 Q1+Q2 | [打印摘录](./weekly_activity_Shihao_打印摘录.md) §W11 |
| 测试→团队 | `Re/result.md` §2–3 |
| Hi-fi 假设 | `Re/3rd_test/result.md` 末 H 表 |
| 分工 | `Re/5.8meeting/meeting-summary.md` |

---

### Week 12（设计理性 + 公平性 · 书面最长一周）

**Weekly 结构**：Q1 分叉决策评估 · Q2 被拒方案清单 · Q3 受益/受损与缓解（`weekly_activity.md` **Your Answer**，约 L915–1567）。

**Q1 核心（必会脱稿 60 秒）**

- **分叉**：Week 8 四原型后 — Path A globe-first / **Path B interpretation-first（你选）** / Path C 并行（拒）。  
- **证据链**：W6 开放任务 → 只有交互数据；W8 **n=4** 且 **R3 favorite=P1、best relationship=P4**；A01 + gap matrix。  
- **Path B 内**：四屏 Primer 门 → 2nd test 失败 → **渐进画布 + badge** → 3rd test **0/6 健康误读、6/6 数字、6/6 trust gate**。  
- **与团队**：个人线 Path B；团队 5.8 仍 **globe + 你的来源/对比** —— 见 [06_团队方案vs个人迭代](./06_团队方案vs个人迭代.md)。

**Q2 核心**

- 18 类被拒方案分三阶段；面试问「为什么不用 X」→ **证据 + 约束**（见打印摘录 Q2 表）。

**Q3 核心**

- **受益**：非专家学生、需作业级论证者（3/10→0/6 等写进公平分析）。  
- **受损/排除**：专家、极低素养、ESL、无障碍、聚合数据掩盖不平等、低设备、只想浏览者。  
- **缓解**：已做（badge、gate、边界…）+ 建议（a11y、多语言、explore 模式…）。

**对齐句**

> Week 12 我把学期分叉写进 Q1，用 Q2 证明每个「没做」都有依据，用 Q3 说明公平性——与 W5 伦理、W11 交付是同一条线。

| 打印物 | 路径 |
| --- | --- |
| W12 压缩摘录 | [weekly_activity_Shihao_打印摘录](./weekly_activity_Shihao_打印摘录.md) §W12 |
| W12 全文（深挖） | `../weekly_activity.md` L915+ |
| 分叉与团队 | `06_团队方案vs个人迭代.md` |
| 3rd test 数字 | `Re/3rd_test/result.md` |

---

## 三、总表：weekly ↔ 测试 ↔ 团队功能

| 周 | weekly 关键词（你的字） | 研究/测试证据 | 团队原型 |
| --- | --- | --- | --- |
| W4–5 | 伦理、信任、不平等、probe | `literature/conclusion.md` | 问题陈述 |
| W6 | 地球+时间轴、可观察协议 | 团队 `index.html` | Globe、timeline |
| W7 | 旋转、live/fallback、搜索意向 | 课堂 pilot | Search、来源 |
| W8 | 四原型、偏好≠理解 | `prototype_options…` | 方向比较 |
| W9 | 拆 Stage A/B、可操作标签 | `plan/` 全套 | 重锁 RQ |
| W10 | 3/10 recovery、7/10 冲击、Guide Card | `1st_test/` n=10 | Badge、chip |
| W11 | 四层来源、对比、trust gate | `2nd_test/` `3rd_test/` | **你的分工** |
| W12 | Path B；拒 globe-first 主仪器；公平性 Q3 | W6–W11 综述 + `3rd_test` | 终版 + 个人线叙事 |

---

## 四、Tutor 拿着 weekly 问时的「对齐句」

结构（课程要求）：

> 「Week __ 我在 weekly activity 里写的是 ______；之后我们用 ______ 验证了这一点；所以在终版里做了 ______；原始记录在夹册第 __ 页。」

**Recovery（必练）**

> Week 10 我记录了第 3 位参与者把 recovery 理解成感染下降；1st test 汇总 **3/10** 同类。所以我们不做被动 tooltip，而是 **ECONOMIC 域标签**；hi-fi **0/6** 健康误读。夹册：W10 摘录 + `1st_test/result_interview.md` Summary。

**来源框（必练）**

> Week 7 我写 live/fallback 会混淆信任；Week 11 写四层 provenance + trust gate。mid-fi **2/8** 未读方法仍给高分 trust；hi-fi gate **6/6** 先写局限。夹册：W7/W11 + `2nd_test/result.md` + `mokbase_v3/design_brief_after_hifi.md` §2.4。

**对比（必练）**

> Week 10 我在 weekly 里写 **7/10** 在并排数字下识别 UK 冲击更深；mid-fi 开放题引用衰减 → Week 11 承诺对比槽 + 引用串。演示 UK **−12.0** vs AU **−3.7** pp（2020）。

**地球旋转（必练）**

> Week 7 我写地理不熟会反复旋转；W8 写偏好≠理解；团队问卷有人爱 globe 但疲劳——我整合为：旋转是探索入口，论证在侧栏与对比；故加 Search。夹册：W7 + `04_功能逐项问答.md`。

**Path B 与团队地球（W12 必练）**

> Week 12 Q1 我写选 Path B：W6 缺解读证据、W8 偏好≠理解、四屏 Primer 在 2nd test 失败；3rd test 渐进画布 **0/6** 健康误读。团队仍保留地球，我负责来源与对比。夹册：W12 摘录 + `06_团队方案vs个人迭代.md`。

---

## 五、与 interview 其他文件

| 文件 | 用法 |
| --- | --- |
| [01_30秒开场](./01_30秒开场与项目总览.md) | §一 时间线 |
| [03_设计决策证据链](./03_设计决策证据链.md) | 测试细节；本文 = 课程周次 |
| [05_个人贡献](./05_个人贡献_来源框与对比.md) | W11 Q2 = 演示脚本 |
| [07_模拟面试题单](./07_模拟面试题单.md) | W1–W7 周次题（含 W12） |
| [08_关键数据](./08_关键数据与话术卡.md) | 3/10、7/10、0/6 |
| [PRINT_携带证据清单](./PRINT_携带证据清单.md) | 装订顺序 |
| [weekly_activity_Shihao_打印摘录](./weekly_activity_Shihao_打印摘录.md) | **必打①** |

---

## 六、和 ChatGPT 版差异说明（自用）

本文件夹已把 weekly **逐周映射到 `Re/` 路径与可打印文件名**（含 **W12** 长文 Q1–Q3）。面试时：**先翻打印摘录证明「我写过」**，再翻 `1st_test` / `3rd_test` 证明「我测过」**，W12 证明「我能辩护分叉与公平性」**，最后指团队界面证明「我做了」**。

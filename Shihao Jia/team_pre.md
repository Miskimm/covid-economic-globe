# 小组展示备课：来源框（Data Sources & Method）

> **你是谁**：Shihao Jia  
> **在整场中的位置**：组长 [`script_team.md`](./script_team.md) 讲完时间线与问题空间后，进入「各成员介绍功能」——**你讲来源框**（建议 **2–2.5 分钟** + 现场演示 **1.5 分钟**）。  
> **团队口径**：我们不再只做「酷可视化」，而是帮学生**负责任地理解数据**——来源框直接对应 Week 10–11 的测试与文献。  
> **个人面试材料**：更细的逐周证据见 [`interview/`](./interview/) 文件夹；本文件只服务 **Wonder Four 小组展示**。

---

## 一、你在整段展示里的「任务一句话」

> 我负责 **数据来源与方法论透明（provenance）**：让用户知道数从哪来、指标什么意思、数据怎么拼在一起、以及**不能从图上证明什么**——这是我们在三轮测试里发现的信任与误读问题，在终版里落成右侧 **Data Sources & Method** 四层结构。

**不要说的**：「我做了个折叠菜单。」  
**要说的**：「我们根据 RQ3 和 n=10/8/6 的测试，把来源从『写个 World Bank』升级成可追溯的四层说明。」

---

## 二、与组长开场如何衔接（接话模板）

组长最后一句大概是：*「接下来由各位成员介绍具体功能。」*

**你的接话（15 秒）**：

> 大家好，我是 Shihao。组长刚才提到 Week 10 我们发现用户会把 recovery 理解成疫情康复、也容易把「病例和 GDP 一起变」当成因果。我负责的部分就是针对 **信任和误读**：在原型里加了 **Data Sources & Method** 来源框，并在指标旁用 **Health / Economic** 标签区分领域。下面我结合测试和文献说明为什么需要它，并现场演示。

（若前一位同事已讲 AI，加一句：*「AI 解释只能复述页面上已有的定义和局限，真正的口径以来源框为准。」*）

---

## 三、展示前准备清单（按顺序做）

### Step 0 · 技术（展示当天早上）

- [ ] 本机运行：`python3 -m http.server 8000` → 打开 http://127.0.0.1:8000  
- [ ] 确认 **Live** 徽章为绿色（若教室 Wi‑Fi 差可能 Fallback，**提前讲清** Fallback 也是设计的一部分）  
- [ ] 浏览器 **125% 缩放** 或投屏时放大侧栏，保证后排能看见来源框文字  
- [ ] 预操作：Search **United Kingdom** → 侧栏出现 UK → 右侧 **Methodology** 区域 **Data Sources & Method** 已展开（默认 `open`）  
- [ ] 关闭无关标签页；勿开个人 hi-fi 测试页，避免和团队原型混淆  

### Step 1 · 打印材料（建议装订一个小册子，约 **8–12 页**）

#### A. 必带 · 测试证据（证明「为什么做来源框」）— **4 页**

| 序号 | 打印什么 | 路径 | 展示时怎么用 |
| --- | --- | --- | --- |
| A1 | **1st test Summary 表**（7/10、3/10、6/10 等） | `Re/1st_test/result_interview.md` 末尾 `# Summary` → `# Pattern counts` | 说：「低保真 n=10，**3/10** 把 recovery 当健康恢复，**6/10** 要公式和原始链接」 |
| A2 | **S08 摘录**（trust=2，「只有 source 名字不够」） | 同文件 `## S08` 段，尤其 Q10–Q11 | 说：「列机构名不够，用户要 **合并逻辑**」 |
| A3 | **S10 摘录**（recovery = health or economic 混淆） | 同文件 `## S10` Q4–Q5 | 与组长 Week 10 叙事呼应 |
| A4 | **hi-fi 一句结果**（可选半页） | `Re/3rd_test/result.md` 假设表 H5：**0/6** 健康误读（域标签） | 说：「个人迭代验证域标签有效；团队版用 Health/Economic 标签 + 来源词典」 |

> 打印技巧：PDF 或浏览器打印时 **只选这几页**；参与者姓名可打码，保留原话。

#### B. 必带 · 文献（证明「文献支持透明与误读风险」）— **3–4 页**

不必打印全部 16 篇。来源框只需 **4 篇 + 1 行笔记**，每篇 **摘要页或你自己写的 5 行 bullet** 即可。

| 序号 | 文献 | 路径/引用 | 你在展示里对应哪一点 |
| --- | --- | --- | --- |
| B1 | **Interpreting Time-Series COVID Data…** (Scientific Reports, 2021) | `Re/research/literature/literature_list.md` #4 | 受教育者也会**误读**疫情时序 → 需要清晰指标定义（Variable dictionary） |
| B2 | **Understanding of Numerical Information during COVID-19** (Europe PMC, 2021) | 同上 #6 | 非专家需要**脚手架**，不能只堆数字 |
| B3 | **Vistrust: … Trust in Data Visualizations** (IEEE TVCG, 2023) | 同上 #8 | 信任是**多维的**，不能只写机构名（Citation + 局限） |
| B4 | **Framework of Improving… Economic Data for General Public** (FHP, 2022) | 同上 #12 | **Interpretation gap** → 工具要帮「理解」而非只展示 |

**每篇打印时页眉手写一行**（方便你瞄一眼）：

```
#4 → 误读时序 · 支撑「Recovery 要写清是 economic」
#6 → 数字误解 · 支撑「pp / baseline 要写进词典」
#8 → 信任多维 · 支撑「四层来源，不只 World Bank」
#12 → 解读缺口 · 支撑「来源框 + 解释，不是更多图表」
```

可选第五篇（若老师问「疫情—经济关系是否值得看」）：**Chetty et al. 2024**（`literature_list.md` #1）— 1 段摘要即可，**不是来源框核心**，备在册子最后一页。

#### C. 建议带 · 团队功能一页纸（自制）— **1 页**

自己用 Word/Pages 做 **「来源框四层」** 截图 + 四行说明（投屏失败时也能讲）。结构：

```
Layer 1 Citation — disease.sh + World Bank + 访问日期
Layer 2 Variables — pp, shock, economic recovery ≠ health
Layer 3 Merge — ISO3; 日频病例 vs 年频 GDP
Layer 4 Cannot prove — 非因果；跨国病例不可直接比；GDP 隐藏不平等
```

截图位置：右侧 Methodology 卡片最底部 **Data Sources & Method**（[`index.html`](../index.html) 已实现）。

#### D. 本阶段 **不必** 为小组展示打印

- 完整 `weekly_activity.md`（太长；个人 interview 用）  
- 全文 `literature_list.md`（16 篇）  
- 对比功能详细稿（若本场只轮到你讲来源框；对比可另册或口头一句「我另负责对比，稍后/下一位」）

---

## 四、讲解结构：Research Question → 测试 → 设计 → 演示

团队方法论（[`5.8meeting/meeting-summary.md`](./Re/5.8meeting/meeting-summary.md)）要求每人走这条链。**建议总时长 3.5–4 分钟**（口播 + 演示）。

### 第 1 段 · 问题与 RQ（30 秒）| 可手持文献 B3、B4

**口播稿**：

> 我们的目标用户是学过商科/社科、要在作业里**论证**疫情与经济关系的学生。文献说明：非专家看经济可视化存在 **interpretation gap**（文献 12），而信任也不是看一眼机构名就够（文献 8）。  
> 我个人的研究问题是 **RQ3**：什么样的**来源与方法透明**，能帮助用户**校准信任**——不是界面好看就给 5 分，而是知道数据能证明什么、不能证明什么。

### 第 2 段 · 测试发现了什么（45 秒）| 翻开打印 A1、A2、A3

**口播稿**：

> 第一轮低保真 **n=10**，Summary 表在这里：大多数人能比较两国 GDP，但 **3 位**把 “Recovery vs 2020” 理解成**疫情或健康恢复**；**6 位**明确说要公式、原始链接和缺失值说明。  
> 例如 S08 给信任只打了 2 分，原话是：**「不知道 World Bank 和 COVID 数据怎么合并，只有 source 名字不够。」**  
> 中保真我们还看到：有人打了高信任，却**没打开**方法说明。所以团队终版不能只列数据源，要有 **变量词典、合并逻辑、和 epistemic 边界**。

（若时间紧，跳过 mid-fi，只说「后续轮次重复了：高信任 ≠ 读了来源」。）

### 第 3 段 · 设计决策：四层来源框（40 秒）| 指投影或手持 C

**口播稿**：

> 我在终版里实现的是 **四层**（对应我们 W11 书面计划）：  
> **1 Citation** — 三个数据源、访问日期、可点击官方链接；**Live / Fallback** 徽章告诉用户当前是实时 API 还是本地样本。  
> **2 Variable dictionary** — 解释 pp、GDP shock 对 2019 基准、**Economic recovery** 对 2020 低谷，并写明 **不是** 健康恢复。  
> **3 How data is combined** — 按 ISO3 对齐；病例随**日**时间轴变，GDP 是**年**数据，避免用户以为图表「卡住」。  
> **4 What this tool cannot prove** — 三条边界：共变不等于因果；跨国病例不能直接比；宏观 GDP 掩盖不平等与修订滞后。  
> 侧栏的 **Health / Economic** 标签与词典一致，减少 Week 10 那种 recovery 误读。

**诚实一句（若被问 trust 滑条）**：

> 个人高保真里我们还试过「先写一条局限才能打信任分」，在 **n=6** 时 6/6 都会先写局限；团队展示版用**静态边界 + 域标签**，没有把 trust gate 做进滑条，这是已知的下一步。

### 第 4 段 · 现场演示（90 秒）| 只操作浏览器

按下面 **第五节** 逐步点，不要跳步。

### 第 5 段 · 与组员功能衔接（15 秒）

**口播稿**：

> 来源框给整个原型定「能说什么、不能说什么」的底线。**[下一位同事名]** 的 AI 解释会引用这些定义；我负责的**地区对比**则让用户在数字对齐的情况下做跨国比较——两者都建立在来源透明之上。我的部分到这里，谢谢大家。

（若本场**只**轮到你讲来源、对比由你稍后另讲，把最后一句改成：「对比功能我稍后再演示，它依赖同一套指标定义和来源口径。」）

---

## 五、现场演示分步脚本（照着点）

| 步骤 | 操作 | 指着说什么 |
| --- | --- | --- |
| 1 | Search → **United Kingdom**，选中 | 「先选一个国家，侧栏出现病例和经济指标。」 |
| 2 | 指侧栏 **Health / Cases** 与 **Economic / GDP Shock / Recovery (from 2020 trough)** | 「测试里 recovery 最容易混成健康；我们用域标签和全称对齐来源词典。」 |
| 3 | 指 **Live** 徽章 | 「绿色 Live 表示正在用 disease.sh 和 World Bank；若变 Fallback，列表会变，局限里会提示只有 8 国样本。」 |
| 4 | 指 **Retrieved: 日期** | 「Citation 层：访问日期，方便作业引用。」 |
| 5 | 展开/滚动 **1. Citation** 三个链接 | 「可追溯：地图、病例 API、GDP 指标页。」 |
| 6 | 指 **2. Variable dictionary** 里 **Economic recovery** 一条 | 「明确 **Not** COVID infection or health recovery；高 recovery 仍可能低于 2019。」 |
| 7 | 指 **3. How data is combined** 日频 vs 年频 | 「拖动时间轴时病例会变，GDP 柱按年不变——不是 bug，是数据频率不同。」 |
| 8 | 指 **4. What this tool cannot prove** 第一条 | 「病例和 GDP 同屏不等于 COVID **导致** GDP 下降——这是作业里最容易错的因果跳跃。」 |
| 9 | （可选）点开右下角 **AI → Explain**，问 “Can I say COVID caused GDP to fall?” | 「AI 应引导回来源框边界，不替用户下因果结论。」 |

**演示禁忌**：

- 不要花时间在旋转地球上找国（用 Search）  
- 不要展开 Compare（本场若只讲来源）  
- 不要说 OWID——团队代码用的是 **disease.sh**（与 [`README.md`](../README.md) 一致）

---

## 六、完整口播稿（中文，约 2 分 10 秒，可背诵）

大家好，我是 Shihao。组长刚才讲到，我们从「做酷可视化」转向「帮用户负责任地理解数据」。我负责的是 **数据来源和方法论透明**。

文献告诉我们，非专家看经济可视化存在解读缺口，信任也不只是_credibility_看起来的专业感。我们的测试更具体：第一轮 **10** 位参与者里，**3** 位把 recovery 理解成疫情或健康恢复，**6** 位要求看到公式、链接和缺失值说明。有一位参与者说，只写 World Bank 和 COVID 来源名不够，他想知道数据**怎么合并**。

所以在终版右侧，我加了 **Data Sources & Method**，分四层：**引用与访问日期**、**变量词典**、**数据如何按国家对齐以及日频和年频的差别**、以及**工具不能证明什么**——尤其是不能把相关当成因果。侧栏上的 Health 和 Economic 标签，和词典里的定义一致。

（转向屏幕）我现在选英国：大家可以看到 Economic recovery 指的是自 2020 经济低谷的反弹，不是感染人数好转。往下在来源框里，Live 表示实时数据；词典解释 pp 和 shock；合并逻辑说明病例随日期变、GDP 按年变；最后三条边界提醒用户作业里能写什么、不能写什么。

这与组长的叙事一致：用户需要的不仅是图表，而是**可溯源、可解释、有边界**的证据界面。我的部分就到这里，谢谢。

---

## 七、可能被问到的问题（简短答法）

| 问题 | 答法 |
| --- | --- |
| 为什么不用 OWID？ | 团队原型用 **disease.sh** 拉国家级病例；来源框写的是实际 API，概念上都是开放健康数据。 |
| 信任分数在哪里？ | 研究问卷里有；个人 hi-fi 有 trust gate；团队版用**局限三条 + 域标签**，展示时间有限未做滑条。 |
| 来源框会有人看吗？ | 测试里用户会跳过 primer，所以我们**默认展开**，并把「不能证明什么」放在同一面板，减少折叠后不看。 |
| 和 AI 重复吗？ | AI 解释**可见数据**；来源框是**人工维护的口径**，AI 不能替代。 |
| 你一个人测的，算团队成果吗？ | 测试验证的是**机制**；团队版是 **transfer** 到 globe 侧栏，我负责实现来源四层。 |

---

## 八、与 `script_team.md` 时间线对照（方便你插入故事）

| 组长讲的周次 | 你怎么接一句 |
| --- | --- |
| Week 10 recovery 误读 | 「这就是我做 Variable dictionary 和 Economic 标签的直接原因。」 |
| Week 11 问题空间（可溯源、可解释） | 「来源框对应 **可溯源**；域标签和边界对应 **可解释、有限度**。」 |
| Week 6–7 太早做 demo | 「当时没有方法面板；W7 live/fallback 混淆信任，所以现在有徽章和 Fallback 说明。」 |

---

## 九、展示当天分工建议（和组长对齐）

1. 提前和讲 **AI** 的同事对齐：演示 AI 时提一句「详见 Data Sources」。  
2. 若 **对比** 也由你讲：来源框先讲，对比后讲，中间加 10 秒过渡；或拆成两人。  
3. 册子传阅顺序：老师提问时递 **A2（S08）** + **四层一页纸**。  
4. 总时长控制：组长脚本约 5–6 分钟 + 每人 2–3 分钟 × 人数 → 你争取 **≤4 分钟** 含演示。

---

## 十、相关文件索引

| 用途 | 文件 |
| --- | --- |
| 组长开场 | [`script_team.md`](./script_team.md) |
| 团队分工 | [`Re/5.8meeting/meeting-summary.md`](./Re/5.8meeting/meeting-summary.md) |
| 文献目录 | [`Re/research/literature/literature_list.md`](./Re/research/literature/literature_list.md) |
| 文献综合 | [`Re/research/literature/conclusion.md`](./Re/research/literature/conclusion.md) |
| 1st test 证据 | [`Re/1st_test/result_interview.md`](./Re/1st_test/result_interview.md) |
| 3rd test 域标签 | [`Re/3rd_test/result.md`](./Re/3rd_test/result.md) |
| 原型实现 | [`index.html`](../index.html)、[`src/app.js`](../src/app.js) |
| 个人 interview 备考 | [`interview/README.md`](./interview/README.md) |

---

**最后一遍排练**：对着镜子走一遍 **第三节 checklist → 第五节 9 步演示 → 第六节口播**，计时不超过 **4 分钟**。祝展示顺利。

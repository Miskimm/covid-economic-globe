# 小组展示备课：来源透明 + 双趋势情境新闻 — 对齐 Final Prototype

> **本稿用途**：配合 **`final prototype/html/index.html`** 现场演示。  
> **原版保留**：[`team_pre.md`](./team_pre.md)（四层来源框 + recovery 词典版；勿删）。  
> **你是谁**：Shihao Jia · Wonder Four · 建议 **2.5–3 分钟口播 + 约 2 分钟演示**（含新闻情境）。

个人面试见 [`../interview/`](../interview/)；本文件只服务 **当前团队终版**。

---

## 终版界面一览（讲之前先对齐）

### 左侧 · 仅两条趋势（纵轴简化）

侧栏 **Focused Country** 下只有 **两张趋势卡**，不再在侧栏堆 shock / recovery / pp 等复杂指标说明：

| 趋势卡 | 域标签 | 纵轴数据 | 下方新增 |
| --- | --- | --- | --- |
| **Health** | Health | **COVID cases trend**（随时间轴日变） | **疫情情境** `#healthTrendEvent`：日期 + 标题 + 说明 + **可追溯新闻/机构链接** |
| **Economic** | Economic | **GDP growth trend**（年频路径） | **经济情境** `#economicTrendEvent`：同上，选材为 **够轰动且与疫情冲击相关** 的报道 |

拖动 **Daily Timeline** 或换国家 → `app.js` 的 `getTrendContext()` 更新两条情境文案与来源卡。

**设计取舍（可口播一句）**：第一轮测试里 recovery、pp、baseline 误读很多；展示版 **侧栏只保留最易读的两条曲线**，把「当时当地发生了什么」交给 **情境新闻**，复杂定义放在右侧来源区 + AI，避免信息过载。

> 顶部摘要 chip 仍有 **Average GDP Shock / Average Economic Recovery**（全局汇总）；**演示重点放在侧栏双趋势 + 新闻**，不要展开 shock/recovery 公式课。

### 右侧 · 来源区三块（不变）

| 区块 | 内容 |
| --- | --- |
| **Retrieved** | 访问日期 |
| **Data Sources** | world-atlas、disease.sh、World Bank + 外链 |
| **How We Combine Data** | ISO3；Health 日频病例 vs GDP 年频 |
| **Limitations** | 非因果；跨国病例不可比；（可选）fallback 提示 |

### 仍不在团队页

- Compare、Survey、Results、Live 徽章、来源框内 Variable dictionary、trust 滑条（个人 `3rd_test` 才有）。

---

## 为什么另写一版 + 为什么加「新闻情境」

[`team_pre.md`](./team_pre.md) 与旧版侧栏指标过多，和当前 HTML 不一致。

**新闻情境**不是实时头条 API，而是按 **国家 + 时间** 策展的说明 + 外链（BBC、Reuters、WHO、World Bank 等），实现 `getTrendContext` / `renderTrendEvent`。

**证据摘要**（详引见文末「附录 · 新闻功能依据」）：

- **测试**：1st **S07** 要 policy/context note；2nd **S02** 要 lockdown / vaccination 等国别语境；3rd **S05** 列举 lockdown、fiscal、sector 等机制才够论证。  
- **文献**：#4/#6 误读需脚手架；#12 interpretation gap；#15 narrative+data；#1–#3 疫情—经济渠道复杂。  
- **选材**：经济新闻选 **相对轰动且疫情相关**（封锁、Q1 收缩、服务/旅游受限），不选无关财经爆款；文案带 *association, not causation*。

---

## 一点五、三轮测试 → 终版界面

| 轮次 | n | 关键发现 | **final prototype 落地** |
| --- | --- | --- | --- |
| **1st** | 10 | recovery 误读；要链接/合并；S08 只要机构名不够 | 双趋势 + **Health/Economic** 标签；**情境新闻**；右侧来源三块 |
| **2nd** | 8 | Primer 秒关；trust 空转；开放题仍因果 | 无 Primer；语境 **贴在趋势下**；**Limitations** |
| **3rd** | 6 | 0/6 健康误读；trust gate 6/6 | 域标签；团队 **Limitations**；gate 仅在个人线 |

**一句话**：

> 测试要来源、边界和域区分；展示版用 **两条趋势 + 按日新闻情境 + 右侧来源区** 落地，故意 **简化 recovery/shock 侧栏说明**，把复杂度换成「可读的当时当地语境」。

---

## 一、任务一句话

我负责 **数据可追溯** 与 **图表可读**：右侧 **Data Sources & Method** 说明数从哪来、怎么拼、不能证什么；左侧 **两条趋势**（病例 + GDP 增长）下，按所选国家与时间展示 **疫情新闻 / 疫情相关经济新闻** 情境，帮助理解曲线，但不代替因果证明。

**要说**：「三轮测试推动来源透明和边界；我们简化了侧栏指标，用 **双趋势 + 策展新闻** 降低误读。」

**不要说**：「侧栏还有 recovery 词典 / Live 徽章 / 四层折叠词典。」

---

## 二、接话（约 20 秒）

大家好，我是 Shihao。组长讲的 Week 10 recovery 与因果问题，来自第一轮；第二、三轮说明不能只堆数字、也不能只靠可跳过的说明页。终版左侧是 **病例和 GDP 增长两条趋势**，每条下面有 **当时的新闻情境和来源链接**；右侧是 **Data Sources & Method**。下面演示英国、拖动时间轴看情境如何变。

---

## 三、展示前准备

### Step 0 · 技术

- [ ] `node js/server.js` → http://localhost:3000/ ，或 Go Live **`final prototype/html/index.html`**
- [ ] 硬刷新；预操作：Search **United Kingdom** → 时间轴拖到 **2020-01 / 2020-03 / 2022** 各看一眼新闻是否变化
- [ ] 中国（CHN）情境最完整；英美等用通用/global 文案——可诚实说「showcase 先策展部分国家」

### Step 1 · 打印（证据）

| 序号 | 打印 | 路径 | 用法 |
| --- | --- | --- | --- |
| A1 | 1st Pattern counts | `../Re/1st_test/result_interview.md` | recovery/来源风险（历史依据） |
| A2 | 1st S08 | 同上 | → **How We Combine Data** |
| A3 | 1st S10 或 3rd S03 一句 | 1st / `../Re/3rd_test/result.md` | 域标签；**勿再说侧栏 recovery 字段** |
| A4 | 2nd SUMMARY | `../Re/2nd_test/result.md` | Primer / trust |
| A5 | 2nd S03 或 **S02 4f** | 同上 | 因果边界；**S02 要 policy/lockdown context** → 新闻功能 |
| A6 | 3rd H5/H8 | `../Re/3rd_test/result.md` | 标签；trust gate 在个人线 |
| A8（新） | 1st **S07** Q11+Q13 | `../Re/1st_test/result_interview.md` | **policy/context note** → 新闻 |

册子：**A1→A4→A6**，附录 A5、A8。

### Step 2 · 文献（口播提 3 篇即可）

#12 interpretation gap · #15 narrative+data · #4 或 #6 疫情数字误读（见 `literature_list.md`）

### Step 3 · 自制一页纸

截图：**双趋势 + 一条健康新闻卡 + 一条经济新闻卡 + 右侧来源区**。手写：

- 左：Health cases + 疫情情境（可追溯链接）  
- 左：GDP growth + **疫情相关** 经济情境（封锁/Q1 GDP 等）  
- 右：Sources / Combine / Limitations  

---

## 四、讲解结构（约 4–4.5 分钟）

### 第 1 段 · RQ（25 秒）

商科/社科学生要在作业里联结疫情与经济。**RQ3**：来源与局限如何帮助 **校准信任**；**RQ1** 仍相关：能否在 **同一时间点** 理解两条曲线在说什么（新闻是脚手架，不是新数据源）。

### 第 2 段 · 三轮测试（70 秒）

- **1st**：recovery 误读、要合并逻辑 → 我们 **砍掉侧栏复杂 recovery 说明**，改用 **两条趋势 + 标签 + 新闻语境**。  
- **2nd**：Primer 秒关、S03 开放题仍 causal → 语境 **嵌在趋势下方**，**Limitations** 常显。  
- **3rd**：域标签 0/6 健康误读；trust gate 在个人线 → 团队用 **Limitations**，无滑条。

### 第 3 段 · 终版设计（50 秒）

1. **双趋势**：Health 日频病例；Economic 年频 GDP growth——拖时间轴时只有病例曲线天天变，GDP 按年，见 **How We Combine Data**。  
2. **情境新闻**：每条趋势下 **日期 / 标题 / 短文 / 来源卡**；经济侧选 **疫情相关、够分量** 的报道（如封锁、Q1 −6.8%），并写明 **共变不等于因果**（与 **Limitations** 一致）。  
3. **来源区**：三源 + 检索日 + 两条局限（+ fallback）。

**取舍一句**：测试曾要求公式与 recovery 词典；showcase **优先可读**，细节在来源区与 AI，不在侧栏堆指标。

### 第 4 段 · 演示（约 2 分钟）— 第五节

### 第 5 段 · 衔接（15 秒）

来源区定底线；**新闻**帮助理解「为什么这段时间曲线这样走」；AI 与新闻都不能替代 **Limitations**。谢谢。

---

## 五、现场演示分步（12 步）

| 步 | 操作 | 说什么 |
| --- | --- | --- |
| 1 | Search → **United Kingdom**（或 **China** 情境更全） | 先锁定国家。 |
| 2 | 指 **Health** 趋势图 | 公卫域；纵轴是 **累计病例**，随时间轴变化。 |
| 3 | 指 **Health** 下情境块（标题、正文、来源卡） | 例如早期疫情报道；说明 **帮助读曲线**，不是证明因果。 |
| 4 | 指 **Economic** 趋势图 | 经济域；**GDP growth** 路径，不是健康恢复。 |
| 5 | 指 **Economic** 下情境块 | 选 **疫情相关** 经济新闻（封锁、GDP 冲击）；正文里应有 *timing / channels, not single-cause proof*。 |
| 6 | 拖动时间轴到 **2020-01 → 2020-06** | 两条情境随 **日期+国家** 更新——展示「新闻跟着时间走」。 |
| 7 | 指右侧 **Data Sources** | 三源可点击，作业引用。 |
| 8 | 指 **How We Combine Data** | 日频 vs 年频。 |
| 9 | 指 **Limitations** 第一条 | 与新闻话术一致：不能从共变直接推因果。 |
| 10 | （可选）指顶部 chip Shock/Recovery | 「全局摘要仍有 shock/recovery；**侧栏故意简化**，避免和测试里一样堆概念。」 |
| 11 | （可选）AI 问 causation | 引回 **Limitations** + 情境里的限定句。 |
| 12 | 收束 | 双趋势 + 新闻 + 来源区 = 可溯源、可解释、有边界。 |

**禁忌**：Live 徽章、侧栏 recovery 词典、Compare、OWID（用 disease.sh）、声称「实时抓取所有国家头条」。

---

## 六、完整口播稿（约 2 分 50 秒）

大家好，我是 Shihao。组长提到的 recovery 和因果问题，来自我们第一轮测试——当时很多人把 recovery 理解成健康好转，所以我们后来在研究原型里用域标签和边界任务去修；**团队展示页**则进一步 **简化侧栏**，只保留 **病例趋势** 和 **GDP 增长趋势** 两条纵轴，避免在一屏里堆 shock、pp、recovery 多套定义。

第二轮和第三轮还告诉我们：说明页会被跳过、信任分不可靠、但 **把语境放在用户正在看的曲线旁边** 更有效。所以在终版里，每条趋势下面增加了 **按国家和日期策展的情境说明**，并链接到 BBC、Reuters、WHO 等来源；经济新闻我们选 **和疫情冲击相关、相对重要** 的报道，比如封锁或季度 GDP 大幅下滑，而不是无关的财经头条。正文里会提醒：这只是 **帮助理解时间和机制**，**不能**从共变直接证明因果——这和右侧 **Limitations** 一致。

右侧 **Data Sources & Method** 写清数据从哪来、ISO3 怎么对齐、日频和年频的差别，以及不能跨国直接比病例、不能单靠图表下因果结论。

（演示）我现在选英国，拖动时间轴：大家看健康侧情境随疫情阶段变，经济侧情境讲封锁或 GDP 冲击渠道；来源区可查原始链接。我的部分到这里，谢谢。

---

## 七、可能被问到的问题

| 问题 | 答法 |
| --- | --- |
| recovery 怎么不见了？ | **测试动机还在**；侧栏为可读性只留 **cases + GDP growth**。recovery/shock 仍在 **顶部汇总 chip** 和 World Bank 数据里，不在侧栏展开教学。 |
| 新闻是实时的吗？ | **策展 mock**（`app.js` `getTrendContext`）；原则是可追溯、疫情相关；CHN 时段最完整。 |
| 为什么经济新闻不选最轰动的？ | 无关爆款难和曲线对齐，易诱发因果误读；选 **疫情渠道** 相关报道，文献 #1–#3、测试 S02/S05 支持。 |
| 和来源框重复吗？ | 来源框 = 数据口径与局限；新闻 = **当时当地语境**，互补。 |
| 三块不是四层？ | 展示收成三块；新闻是 **第零层语境**（在趋势下），不是第四层数据。 |
| trust 滑条？ | 仅个人 3rd test；团队 **Limitations**。 |

---

## 八、与组长时间线

| 周次 | 接话 |
| --- | --- |
| Week 10 recovery 误读 | 1st 发现；研究线用标签；终版 **简化指标 + 新闻语境** |
| Week 11 可溯源、可解释 | 来源区溯源；**新闻+趋势** 可解释；Limitations 有限度 |

---

## 九、当天分工

1. 与 AI 同事对齐：AI 不替代新闻来源卡与 **Limitations**。  
2. 演示务必 **拖时间轴** 展示新闻变化。  
3. 册子加 **A8 S07**（context note）。  

---

## 十、文件索引

| 用途 | 文件 |
| --- | --- |
| 终版页面 | [`../../final prototype/html/index.html`](../../final prototype/html/index.html) |
| 情境新闻逻辑 | [`../../final prototype/js/app.js`](../../final prototype/js/app.js)（`getTrendContext`、`renderTrendEvent`） |
| 启动 | 根目录 `node js/server.js` |
| 原版备课 | [`team_pre.md`](./team_pre.md) |
| 测试 | `../Re/1st_test/`、`../Re/2nd_test/`、`../Re/3rd_test/` |

---

## 附录 · 新闻功能依据（写报告可抄）

| 类型 | 引用 | 支撑 |
| --- | --- | --- |
| 测试 | 1st **S07** Q11 policy/lockdown，Q13 add context note | 要 **policy/context**，非纯数字 |
| 测试 | 1st **S08** Q7 why worse；Q11 links | 要 **why + 可追溯** |
| 测试 | 2nd **S02** 4f lockdown stringency, vaccination timing | 国别×时间语境 |
| 测试 | 3rd **S05** lockdown, fiscal, sector before causal claim | 经济新闻选 **机制渠道** |
| 测试 | 1st Summary false causation when co-display | 新闻须配 **Limitations** |
| 文献 | #4, #6, #12, #13 | 脚手架、interpretation gap |
| 文献 | #15, #16 | 学生叙事+交互 |
| 文献 | #1, #2, #3 | 疫情—经济跨国差异、部门/政策渠道 |

---

排练：第五节 **12 步** + 第六节口播；确认每一句都能指着 **`healthTrendEvent` / `economicTrendEvent`** 和来源区。祝展示顺利。

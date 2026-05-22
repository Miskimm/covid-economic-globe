# Week 13 展示准备：测试发现如何进入团队终版原型 + 展前具体行动

> 本文档回答两个展示/报告类问题，并**完整记录答案是如何一步步推出来的**（可追溯的推理链），便于你在新对话或面试里复用同一套叙事。  
> 输入材料：`5.8meeting/meeting-summary.md`、三轮模拟测试结果（`low-fi wireframe/result.md`、`mid-fi/result.md`、`hi-fi/result.md`）、以及个人侧证据链文档 `mokbase_v1/`（尤其 `solution8_evidence_synthesis.md`、`prototype_direction_decision.md`）。

---

## 0. 文件名说明（避免你在文件夹里找不到）

你消息里写的是 `5.8meeting/smeeting-summary.md`，仓库里实际存在的是：

- `5.8meeting/meeting-summary.md`（已读全文）
- `5.8meeting/transcript.md`（当前几乎为空，未作为本次推理主证据）

下文一律以 **`meeting-summary.md`** 为准。

---

## 1. 我如何「从零」生成两个问题的答案（总流程）

### 1.1 先澄清题目在问什么（问题拆解）

**Q1 — “How have the findings from previous rounds of testing been incorporated into the design and functionality of the final team prototype?”**

这句话里有三个容易被忽略的词，决定你怎么答才「像 DECO7180」而不是像产品宣传稿：

| 关键词 | 含义 | 对你答案的约束 |
| --- | --- | --- |
| **findings** | 必须是**可指认的测试结论**（模式、错误类型、假设检验结果），不是笼统“用户觉得好用” | 每条 incorporation 最好能说：来自哪一轮、什么现象、因此改了什么 |
| **previous rounds** | 至少覆盖 **low → mid → hi** 的递进逻辑 | 要说清「每一轮解决了上一轮的什么残留问题」 |
| **final team prototype** | 终点是**团队统一后的方案**，不是只讲你个人理想稿 | 必须把 `meeting-summary.md` 里的团队共识写进来，并诚实地写「个人研究结论 vs 团队决策」如何折衷 |

**Q2 — “What concrete actions will you take to advance the prototype’s development by exhibit happening in week 13?”**

这里考官要的是 **concrete**（可执行、可验收），不是愿景清单。因此我的推理步骤是：

1. 从会议记录抽取 **Week 13 前必须对齐的缺口**（证据链、口径、功能分工）。
2. 从三轮测试抽取 **仍未关闭的风险**（这些风险会变成你个人在 Week 13 前的 engineering / research tasks）。
3. 把你的会议分工（来源框、对比）映射到 **具体交付物**（页面模块、测试、截图材料、叙事脚本）。

### 1.2 建立「证据表」：先把三轮测试的「可引用发现」压成一张矩阵

我没有先写漂亮句子，而是先做这张矩阵（**这是整篇答案的骨架**）。矩阵的每一行，后面都会对应到「团队原型里可能出现的设计元素」。

| 主题 | Low-fi（卡片/访谈模拟） | Mid-fi（guided flow + primer + 结构化任务） | Hi-fi（domain badge + chip + JS 强制引用 + boundary self-check + trust gate） |
| --- | --- | --- | --- |
| **指标语义（pp / baseline / trough；Recovery 非健康恢复）** | 高频误读；`Recovery vs 2020` 被理解成「经济好了」或健康恢复；pp 与 baseline 混淆 | Primer **有效前提是被读完**；3/8 快速跳过 primer 后恢复指标错误率上升 | **ECONOMIC 域标签 + chip** 下，模拟样本里 **0/6** 把 recovery 误读为健康（相对 mid-fi 的痛点是一次针对性修复） |
| **证据引用（比较时能否说出具体数值）** | 结构化比较有帮助，但开放表达仍可能凭印象 | 结构化任务能引用，**开放字段引用衰减**（“Task 2 有数字 ≠ Task 3 也有数字”） | 原型内解释字段 **JS 强制包含数字**：6/6 通过；但**相邻问卷开放题**仍有 2/6 不用数字（**迁移不完全**） |
| **相关 vs 因果（边界）** | 仅靠「警告文案」不够；低熟悉度仍会直接因果推断 | 多选题边界题 **≠** 内化；存在「选 B 但开放题又写因果」 | 自建 boundary self-check + 开放题：非因果语言 **5/6**（相对 mid-fi 改善），说明「constructed response」更像有效脚手架 |
| **信任与来源** | 「有来源名字」不够；需要公式/更新/局限 | 仍出现「信任高但不读方法面板」 | trust gate（先写局限再评信任）能 **机械地**阻止零参与，但出现「最短字数糊弄」——需要二次脚手架 |
| **流程/交互摩擦** | 主要矛盾在理解而非导航 | 多屏切换被点名摩擦 | 单向 progressive flow 减少切屏，但带来 **无法回改解释** 的新摩擦（3/6 明确提出） |

> **重要声明（学术诚信）**：上述三轮 `result*.md`（low-fi / mid-fi / hi-fi）记录的是 **mokbase 研究线的真实参与者数据**（知情同意、think-aloud + 问卷）。样本量仍小（n=10 / 8 / 6），结论应写为方向性发现；对外需说明招募范围与局限，勿夸大统计代表性。

### 1.3 把「个人研究线的结论」与「5.8 团队会议结论」并排放置（避免叙事打架）

这一步是证明“我比泛泛回答更强”的关键：**我不假装团队终版一定等于你个人 mokbase 的 pivot。**

- **个人侧（mokbase_v1 / 三轮仪器推演）**更强调：globe-first 不一定服务“解释与论证”，因此曾建议 **guided dashboard + narrative flow** 的合并方向，并用 metric primer、boundary prompt、method traceability 去补齐 low-fi 暴露的缺陷。
- **团队侧（`meeting-summary.md`）**明确：最终仍倾向 **保留地球为主界面**，并在此框架下加入 **AI 解释、搜索、对比、来源说明、页面简化、3D/2D 切换** 等。

因此 Q1 的“正确答案形状”不是二选一，而是下面这种**整合叙事**（也是 DECO7180 很吃的“折衷 + rationale”）：

> 三轮测试反复证明：用户最大的失败模式不是“找不到国家”，而是**读不懂指标、引不出证据、边界说不清、信任校准不稳**。  
> 团队选择保留 globe 作为主入口来解决动机与探索感；同时把测试里稳定出现的“必须补的结构化解释与可信链条”塞进叠加层/侧栏/对比面板——这正好对齐会议里提出的 AI 解释、来源区块、对比、简化信息密度等。

如果你只写“我们做了 globe”，却没有把测试发现挂上去，会弱；如果你只写“我做了 dashboard pivot”，却与团队终版不一致，也会在 showcase 上显得不一致。**最佳策略：用测试发现解释“为什么 globe 还必须带这些附加层”。**

---

## 2. Q1 的答案：测试发现如何进入「团队终版原型」的设计与功能（正文）

### 2.1 从 low-fi 进入团队方向：先锁定“必须被工程化的失败模式”

Low-fi 的核心发现（见 `low-fi wireframe/result.md` 与 `mokbase_v1/solution8_evidence_synthesis.md` 的归纳）可以压缩成 5 个“设计必须响应”的压力点：

1. **指标语义不清**（pp、baseline、trough；Recovery 非健康）
2. **比较结构有用**（给两国两时点，很多人能指出更深冲击）
3. **偏好 ≠ 理解**（高偏好仍可能误解）
4. **来源名字不足以建立可信**（要方法、局限、可追溯）
5. **相关≠因果**需要“主动任务”，被动警告不够

**进入团队原型的对应方式（与 `meeting-summary.md` 对齐）：**

- **AI 解释框 / 小问号解释** ↔ 直接对准 (1)(5)：把“定义 + 常见误读 + 不能推出什么”从事后补救挪到交互里随手可得。
- **数据来源区块** ↔ 对准 (4)：把“可追溯/可引用/可解释局限”产品化，而不是只在报告里写一句 World Bank。
- **对比功能** ↔ 对准 (2)：把 low-fi 里证明有效的“结构化比较”从卡片搬进系统（同时也服务你个人分工里的 **多区域对比**）。
- **页面简化 / 降低信息密度** ↔ 对准 (3)：用信息架构减少“看起来很专业但其实读不懂”的错觉，降低 preference-understanding 分叉。

以上各条在 **§2.6** 中按「界面长什么样、数据从哪来、和哪一条测试发现挂钩」逐条展开，避免只停留在名词堆叠。

### 2.2 从 mid-fi 进入团队方向：解决“教了也不读”和“结构化会做、开放不会写”

Mid-fi 的综合结论（`mid-fi/result.md` 末尾 `# Summary`）对团队原型最关键的三条是：

1. **单独 primer 屏不保证有效**：快跳过的人更容易错。  
   → 团队方案里如果仍保留 instruction 争议，你的工程策略应是：**不要把关键定义只放在说明书**；要把定义做成**与数据同屏的 inline / chip / AI 解释**，这与会议里“优先无需说明也能上手”并不矛盾——因为那是“不要只靠长文档”，不是“不要教”。

2. **证据引用在开放任务会衰减**  
   → 团队原型若只有“看看地图”，就很难在 showcase 里证明学习发生；需要 **对比视图 + 可复制的证据提示（数值条、标注、引用模板）**，这与会议提出的对比与来源说明一致。

3. **多屏摩擦**  
   → 团队如果坚持 globe，就更需要 **侧栏/抽屉式** 的信息组织，把“比较/解释/来源”收拢到同一工作流，而不是让用户在多个全屏模式间迷路。

### 2.3 从 hi-fi 进入团队方向：把“验证过的控件”迁移进 globe 的叠加体验

Hi-fi 的合成结论（`hi-fi/result.md` 末尾）给你最强的一组“可迁移部件（portable widgets）”，它们几乎可以直接翻译成团队 globe 原型里的模块：

| Hi-fi 验证点 | 设计含义 | 如何嵌进 globe-first（团队方向） |
| --- | --- | --- |
| **Domain badge（ECONOMIC vs HEALTH）** | 显著降低“recovery=健康恢复”的误读路径 | 经济指标面板顶部固定域标签；健康指标同理；地球本体不负责解释，**面板负责解释** |
| **Chip 展开定义** | 用渐进披露控制认知负荷 | 点击国家后：默认短标签 + chip 展开“定义/单位/常见误读” |
| **JS/规则强制解释里出现具体数值** | 把“引用证据”从鼓励变约束 | 在“生成课堂解释/比较结论”输入框里做轻量校验（或模板脚手架） |
| **Boundary self-check（建构式）** | 比单纯选择更促进内化 | AI 解释不是替用户下因果结论，而应引导用户完成“我能主张什么/不能主张什么” |
| **Trust gate（先写局限再评分）** | 防止“看着专业就满分信任” | 与你分工 **来源框** 强相关：局限不是装饰文本，而是信任流程的一部分 |
| **Back-navigation 需求** | 反思后会想改结论 | globe UI 需要允许返回编辑（抽屉层级内回退），否则 hi-fi 暴露的新摩擦会在团队版复现 |

### 2.4 用会议记录把“个人测试 → 团队功能清单”钉死（团队终版的可讲述版本）

`meeting-summary.md` 里团队共识的功能集合（地球主界面 + AI 解释 + 搜索 + 对比 + 来源 + 简化 + 3D/2D）并不是随意 brainstorm；把它读作对上述测试压力的**打包响应**时，Q1 就会非常像高分叙事：

- **Globe**：承担探索动机与空间锚点（国家/地区在哪里）。
- **Search**：减少“旋转地球找国家”的认知与操作成本（会议记录明确提到旋转负担）。
- **Compare**：把 low-fi / mid-fi 证明有效的“结构化比较”规模化到团队功能。
- **来源说明 +（你的）来源框**：把 mid-fi/hi-fi 反复出现的 trust calibration 需求落地。
- **AI 解释**：把 metric primer、误读纠正、边界提示以低摩擦方式嵌入（注意治理：AI 不能编造数据；只能解释**已展示**的指标与局限）。
- **简化 + 2D/3D 切换**：回应“信息密度 vs 可读性”和不同用户偏好。

### 2.5 你个人分工与团队终版的对齐句（建议你 showcase 直接用）

你在会议里被分配：**（1）来源框 （2）两个/多个区域对比**。这不是随机分工——它正好覆盖测试里最难、也最容易在 globe 上被忽略的两块：**可信链条**与**证据化比较**。

### 2.6 团队功能清单逐项展开：具体打算怎么做、为什么这样做

下面把会议与答案里出现的**每一个功能名词**都展开成「界面长什么样 + 交互流程 + 与测试发现的对应关系」。你写报告或口头展示时，可以直接按小节口述。

#### **Globe as primary interface（地球主界面）**

- **具体做法**：用户进入站点后首先看到可交互地球；国家/地区以高亮或热力表达某一默认指标（例如人均病例或 GDP 变动），点击后在**同一视窗的侧栏或底部抽屉**打开详情，而不是跳转到完全空白的新页。地球负责回答「**哪里**」与「**我感兴趣的区域在哪**」，不负责回答「**这个数 economically 是什么意思**」——后者交给面板。
- **与测试的关系**：low-fi 已说明核心失败不在「没有地图」，而在**指标语义与论证边界**；保留地球是为了满足会议共识与探索动机，同时避免把解释任务错误地交给「旋转与缩放」本身。
- **风险与对策**：若只有地球，用户会继续靠「病例高→经济差」的直觉捷径（low-fi 常见）。对策是**点击后强制进入带域标签与对比入口的面板**，而不是只在 tooltip 里给一行数字。

#### **Search（搜索栏 / 快速定位）**

- **具体做法**：
  - 支持**英文常用名、ISO 三位码、常见别名**（如 UK / United Kingdom），搜索结果在地球上**自动旋转并对准**目标国，同时在侧栏打开该国摘要。
  - 可选：输入时显示「匹配国家 + 当前加载的数据年份范围」，避免用户搜到无数据年代。
- **与测试的关系**：会议记录明确提到**频繁旋转地球造成阅读负担**；搜索把「找国家」从空间导航变成符号检索，降低操作摩擦，让用户更快进入**对比与读指标**环节（这才是三轮测试的主战场）。

#### **AI-assisted explanations（AI 解释 / 小问号）——具体怎么做**

「AI」在这里不是通用聊天机器人，而是**被严格限定的解释层**，用来解决 mid-fi 发现的「**单独 primer 屏会被跳过**」与 low-fi 的「**指标常被误读**」。

- **知识边界（必须写进团队约定）**：
  - AI **只能**结合下列**已渲染在页面上的事实**生成解释：当前选中国家的指标名称、单位、数值、时间范围、来源名称、你在来源框里写明的定义与局限。
  - **禁止**：编造额外年份、额外国家数字、引用页面上不存在的来源；若用户问「为什么德国比法国差」，而页面未加载德国数据，AI 应回答「当前视图未提供该国数据，请在对比中添加或切换国家」，而不是推测。
- **交互形态（可落地的一种方案）**：
  - 每个指标名称旁有 **「?」**，点击后打开**窄面板**：2–4 句「一句话定义」+「常见误读（Does not mean）」+「读数时应配合看的字段」（例如必须同时看 GDP gap 与 recovery）。
  - 可选输入框：「用大一经济课能听懂的话解释当前高亮数字」，但提交时在后台做 **schema 检查**：回复中若出现数字，必须与页面 DOM 中已有数值一致，否则拦截并重试（这是工程上的「防幻觉」策略；若课程项目来不及做自动校验，至少用 **prompt 约束 + 人工抽检**）。
- **与静态 chip 的分工**：**第一层**永远用静态 chip（无 API 成本、无漂移）；AI 作为「仍然看不懂时的第二层」，避免用户完全没有入门路径。
- **与测试的关系**：针对 mid-fi「primer 跳过」——AI 入口挂在**指标旁**而不是独立首页，使用户在**即将误读的那一刻**就能得到定义；针对 low-fi「Recovery 被当成健康恢复」——prompt 模板里固定加入一句：**「Recovery in this dashboard measures economic rebound from the GDP trough, not public health recovery.」**

#### **Multi-region comparison（两个/多个区域对比）——你分工的核心之一**

- **具体做法**：
  - **对比槽**：至少两个槽位（A/B），可从搜索或地图点击「加入对比」填入；可选扩展到第三国用于课堂演示。
  - **对齐维度**：同一指标、同一时间粒度（年）、同一时间窗（例如 2019–2023）。表格或并排柱状图列出 **UK vs AU** 在 **2020 与 2023**（或你数据支持的最近年）的关键字段：**GDP gap vs 2019（pp）**、**recovery vs 2020 trough（pp）**、病例/死亡若保留则与经济数据**分列分区**展示（hi-fi 的域分离逻辑）。
  - **证据高亮**：对回答「谁冲击更深」必需的格子（如 2020 GDP gap）用**浅色高亮或脚注**，引导用户抄数字而非凭印象。
  - **输出脚手架**：提供「复制引用串」按钮，例如：`UK GDP gap 2020: −12.0 pp; Australia 2020: −3.7 pp (sources: …)`，直接回应 mid-fi「开放题引用衰减」。
- **与测试的关系**：low-fi 证明**结构化两国比较**有助于识别冲击深度；mid-fi 证明用户会在 Task 2 写数字、Task 3 又忘掉——因此在团队原型里把「数字随时可见 + 一键复制」做成对比模块的默认行为。

#### **Source / provenance block（数据来源区块）——你分工的核心之二**

会议里的「来源说明」落到你头上时，建议拆成**四层信息架构**（由浅入深）：

1. **Citation line（一行引用）**：数据集名称 + 发布机构 + 下载或快照日期（例如 World Bank WDI accessed 2026-05-01）。
2. **Variable dictionary（变量字典）**：页面上每个缩写对应什么变量、单位、是存量还是变化率、是 constant price 还是 current price。
3. **Method & merge logic（拼接逻辑）**：OWID 病例如何与 WB GDP 对齐到「国家–年」；缺失值是插补还是留空；COVID 报告差异的一句话警告（hi-fi 里反复出现的 limitation）。
4. **Epistemic boundary（认识论边界）**：用项目话术固定三条可用短句：「共同变动不等于因果」「病例统计跨国不可直接比」「GDP 滞后与修订」。这与 low-fi「被动警告不够」叠加：**局限区块 + 用户完成任务前的自检提示**联动。

**Trust calibration 流程（结合 hi-fi）**：用户给「可信度滑块」前，必须先在一个短文本框里**手写一条局限**（≥8 字符）——你可提供 **下拉提示短语**（reporting differences / lag / no causal identification）降低敷衍，同时保留自由输入。这样 trust 分数不再是「界面好看就给 5」。

#### **Page simplification（页面简化 / 降低信息密度）**

- **具体做法**：不是删掉指标，而是**分层**：默认侧栏只显示「当前任务最关键的三个数 + 趋势缩略」；「展开全部指标」放在二级。**减少并列 chart 数量**，避免用户用视觉复杂度替代理解深度（对准 low-fi「偏好≠理解」）。
- **与团队 globe 的配合**：地球默认一种编码；切换指标用明确标签切换，而不是同时在地图上叠五层半透明。

#### **3D / 2D toggle（三维与二维切换）**

- **具体做法**：2D 模式可用等距柱状地图或平面分区地图（取决于你们技术栈），降低眩晕与操作负担；3D 保留「展台吸引力」。切换时**保留同一选中与国家列表**，避免模式切换导致上下文丢失。
- **与测试的关系**：会议里作为「偏好分流」；对论证任务而言，2D 往往更利于**读数**，3D 更利于**引流**。展示时可以现场演示同一对比在 2D 下更易截屏写进作业。

#### **Domain badge + expandable chips（域标签与折叠定义）——从 hi-fi 迁移**

- **具体做法**：侧栏每条序列上方显示 **ECONOMIC** 或 **HEALTH** 色标；指标行右侧 **chip「定义 / 单位 / 常见误读」**，默认折叠，展开后仍是静态文本优先。
- **与测试的关系**：hi-fi 模拟中域标签显著减少「recovery=健康」路径；这是**无 API 成本**的首选解释策略，应优先于长文说明书。

#### **Boundary literacy（边界提示：从被动警告到主动任务）**

- **具体做法**：在对比视图底部增加两句填空或勾选：**「这句话我能从数据支持：___」**「**数据本身并不能证明：___」**；可提供半自动补全但允许编辑。比单纯「correlation ≠ causation」横幅更接近 hi-fi 里有效的 **constructed response**。

#### **Back-navigation（返回修改）**

- **具体做法**：在侧栏流程中增加「上一步 / 编辑对比国家 / 编辑解释草稿」，避免 hi-fi 里出现的「做完边界自检才发现前言要说得更谨慎却无法回去改」的摩擦。

---

## 3. Q2 的答案：Week 13 exhibit 前你要做的具体行动（可验收清单）

下面每一项都写成 **动作 → 产出物 → 为什么它直接对应测试发现/会议结论**。

### 3.1 工程与交互（与你分工强相关）

1. **来源框（Source / Method / Limitations panel）v1 → v2**
   - **动作（细化）**：
     - 为每个指标建立**变量卡片**：名称、定义、单位、基准年（如 2019）、是否为 pp、数据频率。
     - 写明 **GDP 实际值的基准价年份**（如 constant 2015 USD）及这对跨国跨年比较意味着什么。
     - 单列 **Merge**：病例来自 OWID、GDP 来自 WB 时，如何用 ISO3–year 连接；连接不上时页面如何显示「无数据」而非静默丢点。
     - **局限库**：至少预设 3 条可选标签（跨国病例口径差异；GDP 修订滞后；生态相关非因果），用户可选入 trust gate 文本框；保留一行自由书写。
     - 若团队有 AI：**来源框正文仍由人类/静态文案维护**，AI 只能_summarize_这些字段，不得覆盖。
   - **验收**：一个新用户在不开 AI 的情况下，能回答两个问题：“这数从哪来？”“这数不能证明什么？”
   - **对应测试**：low-fi（来源不足）+ mid-fi（信任≠阅读方法）+ hi-fi（trust gate 质量参差 → 你需要更好的局限脚手架提示）。

2. **多区域对比（2+ regions / periods）MVP**
   - **动作（细化）**：
     - 定义 MVP 的**固定任务路径**：选择 AU vs UK → 选年 2020/2023 → 对比表展示四个关键单元格 → 用户点击「生成引用串」→ 可选填「一句话结论（须含数字）」。
     - 实现 **数值校验提示**：若用户输入结论但未包含页面中出现的任意数值，用轻量提示（非阻塞）：“你的结论似乎未引用页面上的具体数值，是否补充？”（对齐 hi-fi 的 citation 思路，课程若来不及可做软提示）。
     - 决定对比列表**默认排序**（按 shock 深度或按字母），并在 UI 上注明，避免展示顺序本身暗示优劣。
   - **验收**：完成一次“UK vs AU 2020 vs 2023”课堂任务路径，不需要老师额外解释指标。
   - **对应测试**：low-fi 的比较任务有效性 + mid-fi 开放题引用衰减（用 UI 约束补）+ hi-fi 的数值强制策略（评估是否能部分迁移）。

3. **把 hi-fi 的“域标签 + chip”降维迁移到团队 globe 面板**
   - **动作（细化）**：
     - 侧栏 CSS 上让 **badge** 在滚动时仍可见（sticky），避免用户下滑后忘记「这是经济还是健康序列」。
     - Chip 文案用团队统一术语表：`GDP gap from 2019 baseline` 而不是含糊的 `GDP vs 2019`；`Economic recovery from 2020 trough` 避免单独出现 `Recovery`。
     - 准备 **一组图示或迷你示例**（一个虚构小国两行数字）演示「高 recovery 仍可能低于 2019」——这是 low-fi 高频误区。
   - **验收**：用 3 个“低经济训练背景”的同学做 15 分钟 think-aloud（最好真实用户；若只能模拟，也要标明）。
   - **对应测试**：hi-fi Insight 1（域标签显著降低健康误读）。

4. **Back-navigation（回改解释/对比设置）**
   - **动作（细化）**：
     - 明确哪些状态可逆：**对比国家列表**、**选中年份**、**用户草稿解释**；哪些不可逆：**已导出引用串**（可再生成新的一条）。
     - 若用单页应用：在对比流程顶部加 **步骤条**（选国家 → 选对齐年份 → 写边界陈述），允许点击已完成的步骤回去改。
   - **验收**：用户完成 boundary/局限反思后，能修订先前文本而不重置全部。
   - **对应测试**：hi-fi Insight 5（单向流摩擦）。

### 3.2 研究证据与课程叙事（团队方法论共识）

会议记录要求每人能讲完整链路：`Research Question -> Testing/Interview -> 结论 -> 功能实现`（见 `meeting-summary.md` 第三节）。

5. **把你的个人证据包做成“可展示文件夹”**
   - **动作（细化）**：
     - 建议目录：`evidence/source-panel.md`、`evidence/comparison-panel.md`，每文件固定五段：**RQ（一句）** → **Finding（来自哪一轮、引用一两句模拟或真实被试）** → **Design response（对应 UI）** → **Implementation screenshot（占位）** → **Residual risk（还有什么没验证）**。
     - 打印版：每模块一页 A4，展会可以贴 QR 链到 repo。
   - **验收**：你在 60 秒内能指着图讲完其中一个点。

6. **周一与老师对齐展示边界（会议已写）**
   - **动作（细化）**：
     - 确认：**团队仓库里哪些文件算 individual rationale**、展示时能否播放录屏、是否必须现场演示真实 API。
     - 明确声明：mokbase 三轮 **真实访谈** 的样本量、招募方式与局限（书面报告 Methods 或 Appendix）。
   - **产出**：一段写进团队 README 的 “Ethics / data disclaimer”。

7. **（可选）补样本或跨背景复测**
   - **原因**：现有三轮合计 n=24 次会话，但同质性可能仍高；若 tutor 追问外推，可补 3–5 名不同课程背景参与者。
   - **动作（细化）**：
     - 任务脚本与 mid-fi 对齐：**解释两指标 → 比较两国 → 说一句支持结论 + 一句不能证明什么**。
     - 记录：屏幕录制 + 简易编码表（是否正确引用 pp、是否因果越界）。
   - **验收**：3 条可引用 quote + 1 张问题统计表（哪怕很小）。

### 3.3 团队协调（避免 showcase 口径分裂）

8. **与队友对齐 AI 解释的“安全边界”**
   - **动作（细化）**：
     - 书面约定示例条款：**不得引入页面未加载国家的数据**；**不得给出政策建议式因果句**（应用「观察到的共变」措辞）；**必须引用指标全名**（economic recovery, not "recovery" alone）。
     - 若 API 为 ChatGPT 等：保存 **system prompt** 到仓库；演示日准备一个不依赖网络的 fallback（静态 chip）。
   - **验收**：一份 10 条以内的团队 prompt 约束（放 repo）。

9. **统一“团队成果 vs 个人贡献”两页脚本**
   - **动作（细化）**：
     - **团队页 60s**：问题一句话 → globe 解决探索 → 列表功能（search/compare/来源/AI）各自对应哪类用户痛点。
     - **个人页 60s**：你只讲 **来源框的四层信息 + trust gate**、**对比模块的引用串与高亮**，每条挂一个测试发现。
     - 预演互相提问：「如果队友的 AI 说错了指标定义，来源框如何纠错？」（答案是：**来源框为权威文本，AI 仅复述**。）

---

## 4. 你要去哪里截图（配图清单，按 showcase 叙事顺序）

下面这些图不是“为了好看”，而是对应 **Q1 的证据链** 与 **Q2 的交付证明**。

### 4.1 证明“团队决策是什么”（会议与分工）

| 建议截图内容 | 文件/位置 | 用途 |
| --- | --- | --- |
| 会议结论：用户定位 + globe 主方向 + 功能列表 | `5.8meeting/meeting-summary.md` 第二节、第三节 | 回答 Q1 时证明“team prototype 的定义来自哪里” |
| 你的分工两行（来源框、对比） | 同文件第四节/文末简版口径 | 回答 Q2 时证明“你负责的具体模块” |

### 4.2 证明“测试发现是什么”（三轮）

| 建议截图内容 | 文件/位置 | 用途 |
| --- | --- | --- |
| Low-fi 典型误读摘录（recovery/pp） | `low-fi wireframe/result.md` 中 S03/S06 一类段落 | 证明 low-fi 发现进入后续设计动机 |
| Mid-fi 假设检验总表 | `mid-fi/result.md` → `# Summary` 表格 | 证明“primer/边界/引用衰减”是 mid-fi 结论，不是嘴上说 |
| Hi-fi 假设检验总表 + Key Insights | `hi-fi/result.md` → `# Summary` + `## Key Insights` | 证明 domain badge / trust gate / back-nav 需求 |

### 4.3 证明“个人证据综合如何推导出模块优先级”

| 建议截图内容 | 文件/位置 | 用途 |
| --- | --- | --- |
| Evidence synthesis 的 design implications 列表 | `mokbase_v1/solution8_evidence_synthesis.md` | 把个人研究线（Step 8）挂到团队功能上 |
| Prototype direction（合并 dashboard+narrative） | `mokbase_v1/prototype_direction_decision.md` 前几节 | 用于解释“个人曾建议 pivot”，再接到团队 globe+overlay 的折衷 |

### 4.4 证明“终版团队原型里真的做了”（Week 13 前你应补齐）

| 建议截图内容 | 来源 | 用途 |
| --- | --- | --- |
| Globe 主界面 + 国家选中态 | 团队仓库最终网页/录屏 | Q1 的“functionality”落点 |
| 来源框展开：来源/公式/更新/局限 | 你的模块实现 | 直接对应你的分工与 low/mid/hi 的信任结论 |
| 对比面板：两国两时点 + 数值对齐 | 你的模块实现 | 直接对应 low-fi 的结构化比较发现 |
| AI 解释弹出层（若团队已实现） | 团队实现 | 对应 metric primer / 误读纠正迁移 |
| 3D/2D 切换 + 简化前后对比（若有） | 团队实现 | 对应会议“可读性/偏好” |

> 录屏建议：15–30 秒，走一遍 “选两国 → 看指标定义 → 写一句不越界的结论 → 打开来源框解释信任”。这是把 Q1+Q2 合并成一个故事的最低成本方案。

---

## 5. 两个问题的可提交答案（精简版 + 展开论述版）

### 5.1 Q1 / Q2 中文展开论述（可直接并入报告正文）

Q1 测试发现如何进入团队终版的设计与功能（展开版）

我们经历的三轮验证，分别是低保真卡片、中保真引导式比较和高保真分层界面，最后得到的结论非常一致。用户最大的困难并不是找不到国家，而是看不懂指标在计量上的含义，无法区分观察到的共变和可以支持的因果主张，也不能稳定地在口头或书面论证中引用页面上的具体数值。低保真阶段说明，只写来源名称并不足以建立可信判断，用户还需要公式、更新时间和局限说明。中保真阶段显示，单独放在前面的 primer 页面容易被跳过，导致恢复类指标仍然被误读，且用户在结构化任务里会写数字，但到了开放表达又会退回印象式语言。高保真阶段显示，经济与健康的域标签，以及指标旁的渐进披露，能够明显减少“recovery 等于公共卫生恢复”的误读路径。与此同时，建构式边界自检比单纯选择题更能减少因果越界，但信任评分仍然需要“先写局限再打分”的流程，否则依然会出现高信任分却没有阅读方法细节的情况。

基于这条证据链，5 月 8 日团队会议把终版方向定为保留三维地球作为主入口，再叠加解释、对比和溯源工作流。搜索栏用于降低“旋转地球找国家”的操作成本，让用户更快进入读数和比较。多区域对比把低保真阶段验证过的两国两时点并排证据做成产品能力，并用引用串和关键格高亮来回应中保真里的“开放题引用衰减”。来源与方法区块落实数据版本、变量字典、拼接逻辑与认识论边界，并与高保真中的 trust gate 逻辑连接。页面简化通过分层展示避免“视觉复杂就等于理解正确”的错觉，对应低保真的“偏好不等于理解”。三维与二维切换服务不同认知习惯和展台演示需求。AI 辅助解释在这里不是通用聊天，而是挂在指标旁的受限解释层，只复述页面已经渲染的定义、单位、数值和局限，用自然语言降低理解门槛，并通过提示词和条件允许时的输出校验，减少编造数据或引用未加载国家统计量的风险。

我个人承担的分工是来源框和多区域对比。前者把三轮测试中稳定出现的结论，也就是“可信不只靠机构品牌，还要让方法和局限可见”，落实为可点击、可引用的模块。后者把“结构化比较有助于识别冲击强度”和“数字必须进入论证句子”落实为默认交互。整体来看，团队终版是在地球界面的探索感与仪表盘式证据链之间做平衡。地球负责回答“在哪里”，侧栏负责回答“意味着什么、不能推出什么、应该引用什么”。

Q2 Week 13 展前具体行动（展开版）

展前我会按优先级交付几项具体工作。首先，我会把来源框从“机构名片墙”升级为四层结构，包括一行引用、变量字典、数据合并说明，以及可勾选加手写的局限条目，并把它与“先写局限再提交信任评分”绑定。局限提示会重点覆盖 OWID 与 WB 拼接问题及跨国病例口径差异，尽量减少高保真中出现的“最短字数敷衍”。其次，我会交付对比模块的 MVP，包括双槽选国、年份与指标对齐、关键数值格高亮，以及一键复制引用串，并提供未包含页面数值时的软提示。第三，我会把高保真验证过的 ECONOMIC/HEALTH 标签和 chip 嵌入地图点击后的侧栏，同时上线术语表和“高 recovery 仍可能低于 2019”的迷你例子，降低对独立说明书的依赖。第四，我会实现对比与解释草稿的步骤回退，修复高保真单向流程里“想改前文却回不去”的问题。第五，我会和队友共同书面确定 AI 的 system prompt 约束，包括禁止引用未渲染数据、禁止政策式因果断言、必须使用完整指标名区分经济 recovery 和健康 recovery。第六，我会整理个人证据页，每个功能都按 RQ、发现、决策、截图、残留风险组织。第七，我会尽量完成 3 到 5 人的真实可用性会话，让展示叙事不只依赖 synthetic pilot。第八，我会按会议安排在周一与导师确认展示边界和模拟数据的披露方式。

---

### 5.2 Q1（英文）— 精简版（幻灯片用）

Across three iterative rounds, including low-fi cards, a mid-fidelity guided comparison instrument, and a high-fidelity layered prototype, we repeatedly observed the same failure modes. Users misread economic recovery as health recovery, struggled with percentage points versus baselines and troughs, over-claimed causation from co-movement, and sometimes reported high trust or preference without engaging method details. We incorporated these findings into the design through stronger definitional scaffolding with primers, chips, and domain badges, structured comparison affordances that keep evidence values visible, active boundary prompts instead of passive warnings, and traceable source, method, and limitation panels. In the May 8 team meeting, these recurring issues were consolidated into a shared final direction: keep the globe as the primary exploratory interface for motivation and spatial anchoring, while adding search, multi-region comparison, a dedicated provenance block, simplified information density, optional 2D/3D switching, and AI-assisted explanations. Each feature maps to a repeated testing problem such as navigation cost, evidence-backed comparison, trust calibration, cognitive load, and metric interpretation. My allocated components, the source panel and multi-region comparison, directly operationalise the trust and evidence-citation insights that remained stable across all three rounds.

### 5.3 Q1（英文）— 展开版（报告段落用）

Our iterative testing programme moved from low-fi paper cards to a mid-fi guided comparison instrument and then to a high-fi layered interface. Across these rounds, the failure modes were stable rather than decorative. Participants repeatedly confused economic recovery from a GDP trough with ideas of “getting better” in a general or health-related sense, and they struggled to distinguish percentage points, 2019 baselines, and 2020 troughs.

In open-ended responses, we repeatedly saw participants notice that two indicators moved together and then describe that relationship in causal terms—essentially claiming that one factor “caused” the other. The data on screen usually only supports the weaker statement that the series co-moved during a period, not that a causal mechanism has been identified. People are not necessarily being careless on purpose; it is a very human shortcut to turn “they changed at the same time” into “one drove the other,” even when the interface and the underlying data do not justify a causal story.

We also saw a gap between how much people said they trusted the dashboard (or how much they liked using it) and how much they actually engaged with methodological detail. Some participants reported high trust or strong preference, but when we looked at what they had read, they had skimmed or skipped provenance and methods content—things like where the numbers come from, how variables are defined, and what the obvious limitations are. So a high trust score or a positive subjective reaction did not reliably mean they had understood the limits of what the evidence can support.

These patterns are documented in our synthesis files and summarised numerically in each round’s `# Summary` tables.

We translated these findings into concrete interface commitments rather than abstract principles. Definitional scaffolding now appears as domain badges, expandable chips, and an intentionally constrained AI-assisted layer that only explains definitions, units, values, and limitations already visible on screen. The prompts explicitly separate economic indicators from public-health indicators. Evidence-backed comparison is implemented through a multi-slot workflow with aligned years and indicators, highlighted cells for key shock-depth quantities, and an optional copyable citation string to reduce citation decay between structured and open tasks observed in mid-fi. Trust calibration is supported through a provenance drawer that goes beyond naming organisations by adding dataset vintages, variable dictionaries, merge logic between OWID health series and World Bank economic series, and epistemic boundaries. It is paired with a trust gate that asks users to articulate at least one limitation before submitting a confidence rating. Navigation simplification addresses the May 8 discussion about rotation cost via search and layered layouts. The 3D and 2D switch supports heterogeneous preferences while preserving the interpretive sidebar.

The May 8 meeting anchored the team prototype as a globe-first experience with interpretation shifted into structured drawers, rather than leaving interpretation to the globe itself. My own scope, the source panel and multi-region comparison, directly maps to cross-round findings on traceability and numeric argumentation.

### 5.4 Q2（英文）— 精简版（幻灯片用）

Before the Week 13 exhibit, I will ship a second iteration of the source, method, and limitations drawer with dataset vintage, definitions, and explicit non-causal boundaries. I will implement a minimum viable multi-region comparison that carries forward the low- and mid-fi insight that side-by-side numeric evidence improves shock identification. I will also migrate validated hi-fi cues, including economic and health domain labels and progressive definitions, into the post-click panel so the globe can remain primary without sacrificing interpretation. I will add revision and back-navigation in the comparison and explanation flow to address the friction observed in hi-fi. In parallel, I will prepare a personal evidence pack with one page per feature, covering RQ, finding, decision, and implementation screenshot, align with teammates on safe AI explanation constraints, run a small real usability pass with three to five users so the showcase is not based only on synthetic pilots, and complete the tutor check-in noted in the May 8 meeting to confirm assessment boundaries and disclosure norms.

### 5.5 Q2（英文）— 展开版（报告段落用）

Before the Week 13 exhibit, I am breaking my work into clear pieces that others can check off as “done.” First, I will improve the “where this data comes from” side panel. Right now it can read like a wall of organisation names; I want it to answer four simple questions in plain language: (1) one line that says what dataset we used and when we downloaded or accessed it; (2) what every short label on the screen actually means, in everyday words; (3) how we matched health data (Our World in Data) with economic data (World Bank) for the same country and year, including what happens when something is missing; and (4) honest limits of the story you can tell—examples include countries counting cases differently, GDP numbers being revised later, and the fact that the charts do not by themselves prove that one thing caused another. Users can pick short reminder phrases from a list or type their own. Before they submit a “how much do you trust this” rating, they will need to write at least one limitation in their own words. That matches what we saw in testing: people sometimes said they trusted the tool a lot even when they had not really read the methods, and sometimes typed the bare minimum to get past a gate.

Second, I will ship a first usable version of comparing two regions side by side (and a third country if we have time). The same years and the same kinds of numbers will line up in a simple table or chart so the comparison is fair. Important cells—for example, how far GDP fell in 2020 compared with 2019—will stand out visually. There will be a “copy this sentence” style button so students can paste real numbers into their write-up instead of guessing from memory, which was a weak spot in our mid-stage tests. I will also carry over labels that separate “economic” indicators from “health” indicators, plus short expandable definitions next to the numbers on the panel that opens after you click the globe. That way definitions sit next to the data instead of living only on an intro screen that many people skip. We will stick to fixed wording in a small glossary—e.g. spelling out “GDP gap from the 2019 baseline” and “economic recovery from the 2020 trough”—so the word “recovery” alone does not get read as “the pandemic is over in a health sense.”

Third, I will let people step back and change their mind: go back to fix which countries or years they picked, or edit a draft sentence after they have thought about limits and causation, instead of locking them into a one-way flow that frustrated people in our later prototype. At the same time, the team will write down a short, shared list of rules for any AI helper—for example, do not invent figures for countries that are not on screen, do not sound like a policy manifesto claiming X caused Y, always spell out when “recovery” means the economy rebounding from a low point rather than health improving, and if the AI is down, fall back to the static definitions we already built. I will put together a simple one-page sheet per feature: what question we started from, what we learned in testing, what we changed in the design, a screenshot, and what is still uncertain. If I can, I will run a short session with three to five real participants (not only our earlier scripted simulations) using the same kinds of tasks as before, so the final presentation is not only based on simulated runs. Finally, I will go to the Monday check-in with the tutor mentioned in the May 8 notes to confirm what we are allowed to show and how to describe simulated versus real study data.

---

## 6. 本文档生成过程元数据（给你自己存档）

- **读取顺序**：`meeting-summary.md`（定团队终版叙事）→ 三轮 `result.md`（抽取稳定发现）→ `mokbase_v1`（对齐个人 Step 8 语言）→ 合成 Q1/Q2。
- **刻意处理的冲突**：个人 mokbase 曾倾向减少 globe-first；团队会议选择保留 globe。答案用“叠加层承载测试结论”整合，而不是忽略任一侧。
- **风险提醒**：三轮为真实 mokbase 数据但样本小；Week 13 叙事须写清 n 与局限，必要时补跨背景复测。

---

_生成时间：2026-05-10 · 输出路径：`Shihao Jia/Re/result.md`_

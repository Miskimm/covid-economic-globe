# Shihao Jia — Weekly Activity Excerpts (Interview Print)

> 摘自 `../weekly_activity.md` 中各周 **Shihao:** 回答（与课程提交一致）。  
> **重要**：在 Cursor 里我能读到你的完整作业（约 **967 行**，含 Hongbiao / Zhuoding / Ruonan / **Shihao**）。  
> 但若尚未 **保存**，磁盘上的 `Shihao Jia/weekly_activity.md` 可能是 **0 字节**（标签页有时误显示 `total lines: 1`）。  
> 请 **⌘S 保存** 后再打印；本摘录可作为 Shihao 部分的备份。

---

## W 4

**Q1 — Research**

Over the past week, I took a literature review on the impact of COVID‑19 on economic change. I identified five key studies covering responsible computing, ICT interventions, digital contact tracing ethics, SME digital transformation, and agent‑based economic modeling.

I discovered that COVID‑19 is not only a health crisis but also a complex economic&society disruption… Effective interventions require balancing technical efficiency with ethical and societal considerations.

**Q2 — Problem space**

This research has deepened my understanding… designing effective solutions should consider multiple stakeholder perspectives, ethical risks, and socio-technical implications… we can't solve COVID-19 economic issues with technology alone.

---

## W 5

**Q1 — Individual interpretation**

Personally, I see our problem space as the messy middle ground between cold official statistics and how people actually make sense of them… the design's duty is to make uncertainty and inequality visible.

**Q2 — Human experiences**

Misrepresentation (e.g. Argentina reporting); invisible inequality behind GDP averages; trust as a human problem; fairness / accessibility of heavy dashboards.

**Q3 — Additional data & prototype**

Sectoral indicators, unemployment, lockdown stringency; short surveys with small business owners. Prototype as **probe** + **think-aloud** — watch confusion and assumptions, not only aesthetics.

---

## W 6

**Q1 — Prototype form**

Digital `index.html`: 3D globe, HUD, summary tabs (GDP shock vs 2019, recovery vs 2020), focus country panel, GDP charts, timeline playback, hover/click lock.

**Q2 — Metrics to gather**

Task time/errors; behavior order; attention globe vs charts; narrative understanding; trust and source labeling; ethical feedback on side-by-side health/economy.

**Q3 — How design enables collection**

Hover vs click-lock paths; timeline as spatiotemporal probe; earth vs right panel for integration testing; methodology cards for transparency interviews.

---

## W 7

**Testing session**

Pilot 1–2 → formal 3–5; consent; tasks (find country, explain GDP vs 2019 & recovery vs 2020, compare two dates); think-aloud. Prototype: Three.js globe + daily timeline + panels; disease.sh / World Bank + fallback.

**What I learned**

Timeline helps “over time”; shock/recovery still need text; **3D country selection** burdens users who rotate repeatedly; **live vs sample** confuses credibility.

**Gaps / next**

Shorten find-country path → **search**; strengthen methodology/source; expand coverage.

**Retrospect**

Define IA on paper before WebGL; lock 3–5 RQs before heavy code; low-fi first for macro/cognitive tasks.

---

## W 8

**Four prototypes described**

Dashboard / Immersive / Simulator / COVID Economic Globe (WebGL, metrics panels).

**Knowledge gap**

Not only “which prototype users like” but **valid understanding**; when 3D is justified; preference–understanding mismatch; trust and macro–micro comprehension.

**Metrics**

Survey: usability, clarity, linkage, control, fatigue, trust; preference rank; qualitative “why preferred.”

**How design collects data**

Multiple forms for comparison; questionnaire maps to gaps; closed + open; feeds ROM iteration.

---

## W 9

**Q1 — Week 6 hindered collection?**

**Yes.** Task too open (“explore the globe”) → mostly rotation/clicks, little on metric meaning. Mixed tasks in 20 minutes → cannot separate layout vs wording vs prior knowledge. GDP/recovery panels ignored; cases dominated. Live/fallback unclear → trust answers ambiguous. **Had not committed to RQ before build** → returning to problem define.

**Q2 — Adjusted testing**

**Stage A** interaction only; **Stage B** meaning only. Fewer tasks, more probes. Explicit source questions. Kept clarity/control/trust/fatigue dimensions from W8 for cross-prototype comparison.

**Q3 — Prototype changes**

Operational labels: GDP index (2019=100), recovery from 2020 trough (%). Health/economic visual separation. Visible source state. W8 comparison: globe strong on engagement, weak on **verbal explanation** vs dashboard/simulator.

---

## W 10 ⭐（面试核心周）

**Q1 — Major insight**

Built questionnaire + moderator script (no correcting answers). Card A: UK GDP gap −1.5pp, recovery +8.9pp. **~3rd interview**: participant read “recovery” as **speed of recovery from COVID / infections**; **3/10** similar; “trough” did not fix misread.

**Q2 — Underlying need**

Not just better labels — users need **domain identification (economic vs health) before interpretation**. Literature (Scientific Reports 2021) aligns: semantic ambiguity in public health visuals.

**Test summary (embedded in weekly activity)**

- 7/10 identified UK deeper shock with evidence  
- 3/10 health-recovery confusion; 3/10 weak causality  
- Preference ≠ understanding  
- Source names insufficient without methodology  
- **Decision**: merge guided comparison dashboard + narrative evidence flow  

**Q3 — Feature for final**

Rejected standalone glossary and passive tooltips. **Indicator Guide Card** → evolved to **domain badge + chip + “does not mean”**; hypothesis for mid-fi: read vs skip guide.

---

## W 11 ⭐（测试→终版 + 你的行动）

**Q1 — Incorporation into team prototype**

Low-fi → mid-fi → hi-fi stable failures: recovery semantics, pp/baseline, false causation, trust without reading sources. Implemented: **domain badges, chips, constrained AI, multi-slot comparison, citation strings, four-layer provenance, trust gate, search, 3D/2D**. Team: globe-first with interpretation in drawers. **My scope: source panel + multi-region comparison.**

**Q2 — Week 13 concrete actions**

1. Four-layer source/limitations drawer + trust gate (address mid-fi trust≠understanding; hi-fi shallow compliance)  
2. Compare MVP: two slots, aligned years, highlight 2020 GDP gap, copyable citations  
3. Migrate ECONOMIC/HEALTH badges and chips to sidebar; glossary terms  
4. Back-navigation for countries/years/draft interpretation  
5. Shared AI rules + one-pager per feature (RQ → test → design → screenshot); optional n=3–5 retest  

---

## W 12

（提交表中 Shihao 无文字 — 实现 W11 清单与第三轮测试 `Re/3rd_test/result.md`，2026-05-12–14。）

---

## 打印提示

- 若课程要求提交原版，请 **另附** 完整 `weekly_activity.md` 或从 LMS 导出 PDF。  
- 本摘录用于面试快速索引；深度数据见 `Re/1st_test`、`2nd_test`、`3rd_test` 打印页（见 [PRINT_携带证据清单](./PRINT_携带证据清单.md)）。

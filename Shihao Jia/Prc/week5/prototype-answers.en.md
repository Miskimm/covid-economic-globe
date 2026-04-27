# DECO7180 — Prototype reflection (English)

Based on the `index.html` prototype and tutorial themes (research methods, user testing, justification, and ethical awareness).

---

## Question 1 — Describe your prototype’s physical or digital form

The prototype is a **digital, browser-based single-page application**, not a physical device. It loads via `index.html` and mounts a **WebGL (Three.js) 3D globe** in `#stage`, with a **HUD** around it: hero copy and status, summary chips (average GDP shock / recovery / focus market), a **focused-country panel** (cases, deaths, GDP vs 2019, recovery vs 2020), a **methodology / economic impact** block with a GDP bar chart and shock strip, a **legend and ticker**, and a **daily timeline** with play, jump-to-start, and a range slider. Interaction is **mouse/touch on the globe** (hover, click to lock a country) plus **timeline controls**—a desktop-first data exploration prototype.

---

## Question 2 — What specific metrics, observations, or user responses are you hoping to gather?

Aligned with the tutorial’s emphasis on **justified methods** (surveys, interviews, observation, user testing), you would typically aim for:

1. **Task-based usability** — Time and errors on tasks such as: find a country, move to a given date, read “GDP vs 2019” vs “recovery vs 2020,” and state whether a country is in deep shock or recovery using the panel (not only the map colours).
2. **Comprehension / sensemaking** — Short debrief or questionnaire: whether users understand the **linked story** (pandemic diffusion plus macro shock/recovery), trust the numbers, and whether the **methodology copy** helps or confuses.
3. **Qualitative reactions** — Think-aloud or semi-structured interview: what draws attention first (globe vs charts), whether the **dual encoding** (map plus numeric panel) feels redundant or helpful, and suggestions for clarity.
4. **Optional behavioural measures** (if you instrument sessions) — e.g. sequence of **hovered countries**, use of **Play** vs manual **scrub**, dwell time on certain date ranges; these support **observation** of exploration patterns.
5. **Ethics-related responses** (if you frame sensitive aggregates) — e.g. comfort with country-level health plus economic linkage and how you **cite sources** (e.g. `sourceNote`), connecting to the tutorial’s discussion of privacy, consent, and responsibility in design communication.

The **current codebase** does not ship production analytics; Question 2 is best framed as **what you plan to capture in evaluation**, via protocol plus optional lightweight logging or screen recording.

---

## Question 3 — How does the design enable collection of the data outlined in Question 2?

The layout and interactions are deliberately **task-structured** so you can observe and ask about specific behaviours:

- **Country hover plus click-to-lock** (`onCountryHover`, `onCountryClick` in `globe.js` / `app.js`) gives a clear **observable path**: which boundaries users pick, whether they stabilise on one market, and whether they use hover vs lock. That supports timing/error metrics and interview prompts (“Why this country?”).
- The **daily timeline** (slider, play, labels from 2019-12 through 2023-12) forces **temporal navigation**; you can measure scrub patterns and ask whether users grasp **change over time** vs a static map.
- The **split between globe and right-hand metrics** (cases/deaths vs GDP shock/recovery, plus bar chart) lets you test **whether users integrate** epidemiological and macro layers or focus on one—directly testable in comprehension questions.
- The **methodology card** (GDP path, shock chip, impact strip, bar years) is an explicit **teaching and justification surface**; interviews can probe if that matches the course goal of **argument and transparency** in design.
- **Tooltip and `aria-live` region** (`#tooltip`) support accessible status updates—relevant if you include **screen reader or inclusive testing** in your method mix.

Together, the prototype maps each evaluation question to a **concrete UI affordance**, which matches the tutorial’s idea of **backward-mapping** from research gaps to methods and evidence.

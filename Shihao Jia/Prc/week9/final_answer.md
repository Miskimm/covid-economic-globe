Question 1
During the testing session in Week 6, did any of your processes hinder or affect your data collection?
Your Answer
Yes. Several parts of our Week 6 process affected data quality and depth:

1. Task scripts were still too broad. Some participants spent too much time navigating the 3D globe, so we collected more usability friction data (navigation difficulty) than interpretation data (economic meaning).

2. Our protocol mixed exploratory interaction and evaluative tasks in one short session. This made it harder to separate whether confusion came from interface layout, metric wording, or unfamiliarity with macroeconomic concepts.

3. The "shock vs recovery" indicators did not have enough inline explanation. As a result, some participants focused on cases/deaths and underused GDP-related evidence, which limited data about narrative understanding.

4. Data source state (live API vs fallback sample data) was not always obvious to participants. That reduced confidence judgments and affected how we interpreted trust-related feedback.

5. In retrospect, we were still partially in a “build first, then retrofit research” mode. This meant some interface decisions were made before locking 3-5 verifiable research questions, which reduced methodological sharpness.

So, while the session was useful, our process tended to over-collect interaction behavior and under-collect deeper interpretation and trust evidence.

Question 2
How did you adjust your current testing methods to address your new research question, based on what you learned from the previous testing session?
Your Answer
Based on Week 6 findings, we adjusted testing to align with a clearer research question: how users interpret the pandemic-economy relationship and whether the interface supports trustworthy understanding, not just successful interaction.

Method changes:

1. Two-stage testing structure:
- Stage A: brief orientation + core interaction tasks (find country, move timeline, compare two dates).
- Stage B: focused interpretation interview (what "GDP vs 2019" means, what counts as "recovery," and why).

2. Stronger task precision:
- Reduced the number of tasks.
- Added explicit prompts tied to key indicators instead of open-ended browsing.
- Added follow-up probes for misunderstanding points.

3. Better evidence capture:
- Logged completion time/errors for navigation tasks.
- Added structured notes for interpretation quality and confidence statements.
- Captured where users looked first (globe, timeline, right panel) before answering meaning-based questions.

4. Trust/ethics checks:
- Added explicit questions on source transparency, live/fallback clarity, and confidence in conclusions.
- Asked whether users could distinguish data facts from interface interpretation.

5. Alignment with Week 8 comparative framework:
- Kept the structured dimensions used in cross-prototype evaluation (clarity, control, trust, fatigue, and COVID-economy linkage understanding).
- Used the same dimensions to compare “preferred prototype” vs “best-understood prototype,” so we can detect style-preference vs comprehension mismatch.

These changes make testing less about "can they click it" and more about "can they justify what they think the data means."

Question 3
How has your current prototype changed to reflect your new research question?
Your Answer
To match our new research question, we adjusted the prototype as a research artifact (for collecting evidence), not just as a display product:

1. Designed for measurable comprehension, not only visual impact:
- Reworked key labels and wording around "GDP vs 2019" and "recovery vs 2020" so users can explain meaning, not just observe values.
- Strengthened visual separation between health indicators and macroeconomic indicators to test whether users can connect the two correctly.

2. Added comparison-friendly interaction for interpretation tasks:
- Kept timeline drag/play, but reoriented use toward structured before/after comparison prompts.
- Improved date context and panel continuity so users can justify trend claims with traceable evidence.

3. Increased transparency for trust-related data collection:
- Made source/method and live-vs-fallback state more visible in the interface.
- This directly supports trust/credibility questions in testing and helps us evaluate whether users distinguish data facts from interface interpretation.

4. Improved evidence capture from user behavior:
- Retained hover and click-lock as separate interaction signals to observe exploratory browsing vs intentional country selection.
- Simplified non-essential UI elements to reduce noise and make observation notes more reliable.

5. Kept alignment with Week 8 cross-prototype framework:
- Maintained compatible indicator wording and survey dimensions (clarity, control, trust, fatigue, linkage understanding).
- This allows results from the globe prototype to be compared with dashboard/immersive/simulator findings under the same evaluation logic.

Overall, the prototype now functions as a methodologically aligned instrument for reducing our key knowledge gap: what actually improves users’ valid understanding of COVID-economy relationships, and why.

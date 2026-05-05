# Weekly Activity

## Week 4

Question 1
Describe a research you have done in the last week. What did you discover?
Your Answer
Over the past week, I took a literature review on the impact of COVID‑19 on economic change. I identified five key studies covering responsible computing, ICT interventions, digital contact tracing ethics, SME digital transformation, and agent‑based economic modeling.

I discovered that COVID‑19 is not only a health crisis but also a complex economic&society disruption. It is affecting governments, businesses, healthcare, and citizens. Digital technologies provide solutions, such as remote platforms and data dashboards, but also introduce risks including privacy breaches, inequality, and social exclusion. Effective interventions require balancing technical efficiency with ethical and societal considerations.

Question 2
How has your research changed the way you understand the problem space your team is exploring?
Your Answer
This research has deepened my understanding of the problem space by highlighting the multi-dimensional nature of economic change during the pandemic. Initially, I supposed the primary problem is an economic disruption. However, the literature shows that technological, ethical, and social factors are equally important. So now I see that designing effective solutions should consider multiple stakeholder perspectives, ethical risks, and socio-technical implications. For instance, digital platforms help SMEs adapt, but if the platform's barriers to entry are too high and its operation too complex, it can actually leave small shops without money or technology completely behind, widening the gap between the rich and the poor.

Overall, my research shows that we can't solve COVID-19 economic issues with technology alone. We must also prioritize ethics, society, and the people involved. It will help us define the problem and design more responsible solutions.

---

## Week 5

Question 1
Describe your own individual interpretation of your team's problem space.
Your Answer
Personally, I see our problem space as the messy middle ground between cold official statistics and how people actually make sense of them. My team isn't trying to prove a direct "COVID causes X% GDP drop" rule. Instead, we are looking at how to responsibly show patterns when the data we have, like reported cases and national growth, is often lagging, over-simplified, or politically shaped. The real challenge is about rebuilding data. My focus is on how we can combine these open datasets so that people like small business owners or local policymakers can see the broad trends without mistaking a simple chart for the whole story. Additionally, the design's duty is to make uncertainty and inequality visible. It is aim to show these big numbers are actually hiding the specific people and industries that took the hardest hits.

Question 2
What are the human experiences (ethics, concerns, morals, challenges) that are central to your problem space?
Your Answer
Firstly, there is the risk of misrepresentation. If we just show cases and GDP without any context, we might make a country look like it's doing fine just because they lack testing or are reporting numbers differently, like what has happened in Argentina . There is also a huge moral issue with invisible inequality. National GDP averages can easily hide the fact that while some digital sectors grew, tourism and low-wage workers were devastated. If we only show recovery on paper, we risk making the ongoing struggle of these groups invisible. Then there is the issue of trust. Many people simply don't believe official data because of political bias or under-reporting. This is a human trust problem, not just a technical one. Finally, there is a fairness issue in how we design the tech itself. If a dashboard is too heavy or complicated, we are basically shutting out anyone with a slow phone or less experience.

Question 3
What additional data could you collect to deepen your understanding of these human experiences, and what design artifact or prototype would be most effective for gathering that data?
Your Answer
To deepen the understanding of these lived experiences, we could collect additional data such as sectoral or industry-level economic indicators, regional unemployment and business closure series, and labour-market stress data like hours worked. We could also integrate contextual policy signals, such as lockdown stringency, to provide qualifiers for the numbers. Furthermore, we also could do some short surveys or interviews with small business owners regarding their trust and perceived fairness to capture the human side that numbers miss.

For the prototype, an interactive web dashboard is a good start, but I would use it more as a "probe" than a finished product. I’d run think-aloud sessions where I watch exactly where users get confused or where they feel the data contradicts their own experience. The goal is to see what assumptions they make and where our design still fails to show the gaps in the data. This would tell us a lot more about the ethical and cognitive hurdles we need to clear.

---

## Week 6

Describe your prototype's physical or digital form.  
Your Answer
This prototype is in digital form. Launched via index.html, the page displays a 3D globe in the center, surrounded by a HUD: a title area and status, summary tabs (GDP shock relative to 2019, recovery relative to 2020, focus markets), a focus country panel (cases, deaths, GDP relative to 2019, recovery relative to 2020), methodological/economic impact areas (GDP bar chart and shock bar), legends and scrolling announcements, and a date-time axis with playback, a "back to starting point" button, and a slider. Interaction is via mouse or touch (hover, click to lock onto a country) on the globe and time axis control.

Question 2
What specific metrics, observations, or user responses are you hoping to gather?
Your Answer

1. Time and errors required to complete tasks, such as finding a country, jumping to a date, understanding "GDP relative to 2019" and "recovery relative to 2020," and judging whether the system is in deep shock or recovery based solely on the panels (not just map colors).

2. User behavior characteristics, such as the order in which countries are hovered or explored, whether the time axis is manually dragged using playback, and the time spent in certain date ranges. 3. User attention allocation: Observe whether their attention falls on the Earth or charts first; is the dual design of maps and numerical panels redundant or helpful? Suggestions for improving clarity.

3. Narrative understanding: Assess whether users understand the narrative linking the spread of the pandemic to macroeconomic shocks or recovery. How much trust do they have in the numbers? Does the methodology description help with understanding or cause confusion?

4. Ethical feedback: Acceptance of displaying data and economic indicators side-by-side, and attitudes towards source labeling (e.g., sourceNotes in the interface).

Question 3
How does the design of your prototype enable the collection of the data outlined in Question 2?
Your Answer

1. Observability of interaction trajectories: Separate the logic of country hovering and click locking, transforming users' "unconscious browsing" and "conscious locking" into observable paths, supporting qualitative questioning about user focus: Which boundaries do users select? Do they fixate on a particular market? Do they prioritize hovering or locking? Follow-up interview questions, such as "Why did you choose this country?"

2. The date-time axis (slider, play, 2019-12 to 2023-12 labels) requires users to navigate over time. By observing the dragging pattern and asking users if they understand changes over time rather than a static map, the interactive timeline serves not only as a navigation tool but also as a touchpoint for assessing users' understanding of "spatiotemporal evolution." Observing the frequency of user dragging can determine whether the system successfully conveys dynamic data characteristics.

3. The separation of the Earth and right-side indicators (case/death comparison, GDP shock/recovery, and bar charts) facilitates testing whether users integrate the epidemiological and macroeconomic levels or focus only on one. This can be directly assessed using comprehension questions.

4. The methodology cards (GDP path, shock labels, shock bars, and yearly bars) provide an explicit explanation and argumentation interface for collecting user feedback on data sources and calculation logic. Interviews can verify whether the course's requirements for argumentation and transparency are met.

---

## Week 7

Question 1
How did you run your testing session? What form did your Design Artifact/Prototype take?
Your Answer
Testing Session (Organization of Testing)
First, conduct a small-scale pilot (1-2 people) to refine the task description and duration before proceeding to the formal rounds (e.g., 3-5 people). Participants access the session via a browser on their local devices. Before each session, explain the purpose, obtain consent, and provide a brief task (e.g., locate a country on a specific date, explain "GDP vs. 2019" and "recovery vs. 2020," compare two points in time using a timeline). Use think-aloud or a structured interview after the task to record completion time, bottlenecks, and referenced interface areas (globe/right panel/methodology area/timeline).

Design artifact / prototype form. The prototype is a digital, high-fidelity interactive webpage: a single-page application, using Three.js WebGL 3D Earth + daily timeline (drag/play) + country hover/click lock + a panel side-by-side of the epidemic and macroeconomics (cases, deaths, GDP path bar charts, etc.), with data from the interfaces described in the documentation (such as disease.sh, World Bank, etc.), and a rollback to local sample data in case of failure.

Question 2
What did you learn? What Gaps of knowledge did you identify.
Your Answer
Timeline + Playback: Most users can build a mental model of "changes over time," but the "shock vs. recovery" indicators still need reinforcement with explanatory text or illustrations; otherwise, users may focus only on case numbers and ignore the GDP narrative.

Country Selection on a 3D Earth: Sensitive to geographical familiarity; users unfamiliar with the region may repeatedly rotate and accidentally select neighboring countries.

Dual-Source Data + Fallback Affects "Credibility Narrative": The interface remains usable offline or when the API fails, but participants may not know whether the current data is real-time or sample data—the source/metadata description needs to be checked during testing to ensure it is noted.

Knowledge Gap:

Known Known: The technical path is feasible (static site + module JS), and core indicators can be calculated and displayed in the dashboard.

Known Unknown: Can users with different backgrounds (non-economic/non-data background) stably and correctly interpret the "macroeconomic shock" without misinterpreting it as "the virus directly caused GDP"? Usability for accessible users (keyboard/screen reader) in 3D scenarios.

Unknowns: Under real-world demonstrations or classroom pressure, will users prioritize map colors or numerical dashboards? This could influence the priority of subsequent visual coding.

Assumptions to validate: Does the national-level aggregation meet users' expectations regarding "internal differences" within that country? Do data lags and revisions undermine users' trust in the conclusions?

Question 3
Where does the data tell you to go next?
Your Answer
Behavioral and task data focus: Shorten the "find country" path, prioritize country search/quick jumps, and reduce the cost of simply rotating the globe.

Understanding and narrative data focus: Enhance methodology and source visibility (when to live/when to fallback), add inline explanations or examples for key metrics.

Coverage and depth focus: Expand historical and country coverage; if "a certain region is frequently selected but has no data/weak data" appears in the test, align the data gap list with the display strategy (grayscale, annotation).

Question 4
What would have done differently in retrospect?
Your Answer
Clearly define the information architecture (primary and secondary elements, timeline) using paper/wireframes early on before moving to WebGL implementation, reducing the need for major layout changes later.

Define 3-5 verifiable research questions and task scripts before writing extensive interactive code, avoiding the "build first, then retrofit research" approach.

Gather feedback in the first round using a low-fidelity or static clickable prototype (especially for cognitively demanding questions like global and macroeconomic issues), then upgrade to the current implementation.

Documentation: Record the protocol version, task wording, and revision history for each pilot project in a repository or appendix.

---

## Week 8

Question 1
Describe your prototype's physical or digital form.  
Your Answer
Prototype 1 (Dashboard)
This prototype took the form of a digital 2D dashboard interface presented in a web browser. It used panel-based layouts (charts, indicators, and summary cards) to show COVID-19 and economic metrics side by side, prioritising quick reading and low interaction complexity over immersion.

Prototype 2 (Immersive)
This prototype was a digital immersive visual experience in the browser, focused on cinematic presentation and emotional engagement. It used rich visual layers and spatial/atmospheric effects to communicate the pandemic-economic narrative, with users mainly exploring rather than performing precise analytical tasks.

Prototype 3 (Simulator)
This prototype took the form of a digital policy simulation game . Users acted as a policy maker, selected interventions, and advanced week-by-week while observing changes in infection/economic indicators and map density feedback. It combined decision controls, modal dialogs, and a dynamic map to support “what-if” exploration.

Prototype 4 (COVID Economic Globe)
This prototype was a digital interactive WebGL globe application in the browser. It used a rotatable 3D globe, country hover/click interactions, a daily timeline, and linked metric panels (cases, deaths, GDP vs 2019, recovery vs 2020) to communicate both geographic spread and macroeconomic impact over time.

Question 2
What is the specific knowledge gap that you are trying to reduce?
Your Answer
The key gap is not only “which prototype users like,” but the critical unknown unknown in our ROM process: which representation and interaction style actually helps people form a valid understanding of COVID–economy relationships, and why.
Specifically, we are focusing on reducing uncertainty in the following areas:

1. whether users genuinely understand the health–economy relationship or only react to visual style.
2. When technology-heavy formats (3D globe, simulation, narrative interaction) are justified for learning, and when lower-complexity formats communicate better.
3. What assumptions we currently hold (e.g., “more immersive = better understanding”) that need evidence-based validation.
   4.Which features should be retained or redesigned in the next iteration.
   5.Whether users can interpret both macro (global) and micro (country-level) impact in different prototypes.
   6.Whether users trust the data and perceive it as sufficiently precise for decision-making.

Question 3
What specific metrics, observations, or user responses are you hoping to gather?
Your Answer
We gather both structured quantitative evidence and explanatory qualitative evidence:

1. Quantitative (survey-based):ratings for usability, clarity, COVID–economy linkage clarity, control, fatigue, trust, and perceived precision across prototypes. Preference ranking. Preferred data mode (daily/cumulative/both). Most useful data categories.
2. Comparative signals across prototypes:which prototype is preferred vs which prototype best explains the COVID–economy relationship (to detect preference-understanding mismatch).
3. Qualitative (non-technological + reflective methods):open responses on “why preferred,” “what to keep,” “what to improve,” plus short prompts reflections to capture reasoning, confusion points, and interpretation strategies.
4. Method-justification evidence:user comments that tell us whether interactive technology added analytical value or only aesthetic value.

Question 4
How does the design of your prototype enable the collection of the data outlined in Question 2?
Your Answer
The design enables data collection by functioning as a research artifact rather than only a final product:

1. We built multiple prototype forms (dashboard / immersive / simulator / globe-narrative) so the study can test design assumptions comparatively, not in isolation.
2. The questionnaire is structured to map directly to known gaps (clarity, control, trust, fatigue, macro–micro comprehension), turning abstract uncertainties into measurable variables.
3. The instrument combines closed questions (for reliable comparison) and open prompts (for justification and interpretation), matching the tutor’s emphasis on evidence-backed argument.
4. The process is methodologically justified: technology (interactive prototypes + digital survey) is used to capture consistent records, while qualitative reflection methods (comments/interview-style prompts) provide depth.
5. This supports iterative ROM updates: findings can be fed back into “known/unknown” categories to guide the next prototype direction with explicit rationale.

---

## Week 9

Question 1
During the testing session in Week 6, did any of your processes hinder or affect your data collection?
Your Answer
Yes.

During the testing session in Week 6, the most obvious issue was that our task script was too open-ended. We told participants to "explore the globe and find economic patterns," which sounds reasonable, but in practice most of them spent a long time just rotating the globe and clicking on countries out of curiosity. When we asked them about what "GDP vs 2019" actually means, the session was almost over. So we ended up with a lot of data about how people physically interact with the interface (scroll, zoom, click) but very little about whether they understood what the numbers meant. That's a problem because our actual research question was about interpretation, not navigation.

A second issue was from how we structured the session itself. We mixed "please try to do X" tasks with "what do you think about Y" questions in the same 20-minute slot. That made it almost impossible to tell why someone was confused. Was it the layout? The wording? Or just that they'd never knew about macroeconomics before? We couldn't separate those things because we hadn't created any separation in the protocol.

The GDP and recovery indicators also didn't have enough context around them. Some participants ignored those panels entirely and just talked about cases and deaths, which are more intuitive. This meant we collected almost no data about the health-economy link, which was supposed to be the core of what we were testing. We didn't realize how much the interface design was shaping what people paid attention to until we looked at the notes afterward.

There was also a issue with the live vs. fallback data state. The interface sometimes showed live API data and sometimes showed sample data, but this wasn't clear to participants. A few of them made comments about trusting the numbers, and we couldn't know if they did not trust the data itself or where it came from. The trust-related responses was confused.

Now we have some new ideas(also arrcording to the notes about our first assessment): the underlying problem was that we hadn't fully committed to a research question before building the prototype. We had ideas about what we wanted to study, but the interface reflected what we thought looked good rather than what would produce clean evidence. So the testing session was trying to evaluate something that hadn't been rigorously defined yet.

After some tough decisions, we are returning to the first stage of the project to redefine the problems and users. We expect to generate four different results, all of which will be taken into consideration.

Question 2
How did you adjust your current testing methods to address your new research question, based on what you learned from the previous testing session?
Your Answer
In Week 6, we ran a single session where people both interacted with the prototype and answered questions. However, the problem was that those two things interfered with each other. So the biggest structural change was splitting the session into two stages. Stage A is just interaction: find a country, move the timeline, compare two time points. This gets navigation behavior out of the way first, and we can log completion times and errors. Stage B focuses on meaning: what does "GDP vs 2019" mean to you? What would count as "recovery"? How did you decide that? These are different cognitive tasks, and mixing them making users confused.

We also cut down the number of tasks. One of the things the Week 6 session revealed was that when you give people too many things to do, you get shallow responses to everything. It is better to ask fewer questions and actually follow up when something interesting comes up. So we reduced the task list and added probes: if someone says "I'm not sure what this number means," we now have a prepared follow-up rather than skipping.

The changes to trust-related questions came directly from the live/fallback ambiguity issue. We added explicit questions about data source transparency and asked participants whether they could tell what they were looking at. This isn't just about collecting trust data, it also helps us check whether the interface changes we made (in Question 3) actually worked.

One thing we kept from the Week 8 evaluation was the structured dimensions: clarity, control, trust, fatigue, and COVID-economy linkage. We don't want to throw those out because they let us compare the globe prototype's results with the other three prototypes in the same framework. If we changed the evaluation frame, we'd lose the comparative signal. So the adjustment is more about how we get at those dimensions, not what dimensions we're measuring.

Question 3
How has your current prototype changed to reflect your new research question?
Your Answer
The most important change was to the wording around the key indicators. "GDP vs 2019" and "recovery vs 2020" are the two metrics that carry most of the analytical weight, but in the original version they were just labels. If participants couldn't explain what they meant, we had no way of knowing whether the label was the problem or whether the concept itself was unfamiliar.

We suppose the initial problems were: the labels were too semantically weak: "GDP vs 2019" and "recovery vs 2020" were more like titles than definitions. Participants might recognize the words, but not understand the calculation benchmarks and directions. It was impossible to distinguish between "understanding the labels" and "understanding the concepts": if users couldn't answer, you couldn't determine if it was a textual problem, a statistical concept problem, or if their attention was drawn to the case/death situation. And it didn't match the testing objectives: we wanted to test "explanation ability/causal reasoning," but the original labels weren't sufficient to support questions and answers (like what does >100 actually meant).

The revised labels were more accurate and significantly more measurable: we changed the labels to actionable definitions: GDP index (2019=100), recovery rate from the 2020 trough (%). This allows the test to verify understanding: whether the user can explain the meaning of 100, the meaning of >100 / <100, and what an increase in the recovery rate represents. Therefore, answering correctly is more indicative of "conceptual understanding" than "term recognition". So we replaced vague labels with operational definitions: "GDP vs 2019" became "GDP index (2019=100)," and "recovery vs 2020" became "recovery rate from the 2020 trough (%)." In testing, participants now had to explain what 100 means, what values above/below 100 imply, and what a higher recovery percentage represents. This made correct explanations evidence of conceptual understanding rather than simple recognizing label. This also meant strengthening the visual separation between health indicators (cases, deaths) and economic indicators (GDP), because in Week 6 people were conflating them.

The timeline interaction stayed roughly the same, but we changed how we prompt people to use it. Instead of "explore the timeline," we now ask participants to compare two specific dates, which is tied to Stage B of the testing protocol. The point is to get them to make a traceable argument: "between this date and this date, GDP dropped because..." If people can't do it, we know something is missing.

Making the data source state visible was a direct fix for the problem from testing in Week 6.

We also kept hover and click-lock as separate interactions. This was to preserve an observable distinction between "I'm browsing" and "I've decided to focus on this country." If someone locks onto a country before answering a meaning question, it suggests they are trying to do that. If they're still hovering, the answer might be more tentative. We simplified other parts of the UI specifically to make this signal cleaner.

One thing that significantly shaped how we thought about these changes was the Week 8 comparative evaluation. We put our globe prototype next to three other prototypes: a 2D dashboard, an immersive narrative experience, and a policy simulator — and tested all four with the same participants using the same evaluation dimensions. What that comparison revealed was that the globe's weakness wasn't visual design. However, it was that participants struggled to form verbal explanations of what they were seeing. The dashboard made it easier to quote specific numbers, and the simulator made it easier to say "I did X and Y happened." The globe produced engagement but not articulation. That gap told us : not the aesthetics, but the scaffolding around the indicators that would let someone explain their reasoning out loud. So the label rework, the source transparency, and the structured comparison prompts weren't decisions we made in isolation. Actually they came out of seeing what the other three prototypes did better and asking why.

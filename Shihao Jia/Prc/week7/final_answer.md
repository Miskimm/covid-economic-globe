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

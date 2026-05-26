Hi everyone, I'm Shihao. The team leader just mentioned the recovery and causal issues in Week 10—that mainly stemmed from our first round of testing. I was responsible for data sourcing and methodological transparency. The design was actually based on three rounds of testing, not just the first.

First round, n=10: 3 people interpreted "recovery" as "health recovery," 6 people requested formulas and links; someone explicitly stated that simply writing the institution name wasn't enough, they needed to explain how the data was merged. Second round, n=8: We tried independent Primer and source screens; 3 people immediately closed the Primer, 2 people gave full marks for trust but didn't read the source—so the team version no longer relies on skippable explanation pages, but instead includes definitions and boundaries in the always-visible source area. Third round, n=6: The ECONOMIC tag reduced health misinterpretations to 0/6; we also verified that limitations must be written before scoring. The team webpage uses tags and a four-layer source structure; the trust slider is reserved for individual iterations as a next step.

The literature also supports this: trust is multi-dimensional and cannot rely solely on attractive institution names (Vistrust, 2023). (Turning to the screen) I'll now select the UK: As you can see, "Economic recovery" refers to the rebound from the 2020 economic trough, not an improvement in infection numbers. Further down, in the source box, "Live" indicates real-time data; the dictionary explains "pp" and "shock"; the merging logic explains that cases change by date and GDP changes by year; the last three boundaries remind users what they can and cannot write in their assignments.

This aligns with the team leader's narrative: users need more than just charts; they need a traceable, interpretable, and bounded evidence interface. That concludes my part, thank you.

Round 1, n=10, cards + interviews. Summary here: 7 people could see the UK was more severely impacted, but 3 people understood "recovery" as either the pandemic or health recovery; 6 people requested formulas, original links, and missing values. S08 only gave a trust score of 2, saying that having only the source name wasn't enough and they didn't know how to merge data—therefore, the final version must have four layers: Citation, Dictionary, Merge, and Boundaries, not just one World Bank.

Round 2, n=8, four-screen guided prototype. We added a separate Metric Primer and Source screen, but found that 3 people closed it in less than 15 seconds, with 2 of them still getting "recovery" wrong; more importantly, 2 people gave a full trust score but didn't open the formulas or sources (S03, S06). Note: Skipable explanation pages didn't work; trust scores also couldn't calibrate understanding. Therefore, the team version no longer uses a separate Primer, but writes the definition in the sidebar tab and the dictionary in the source box; the boundaries are written in the fourth layer, "Cannot Prove Anything".

In the third round, n=6, a high-fidelity progressive canvas was used. We tested the ECONOMIC field tag and requiring a limitation to be written before submitting a trust score: health misinterpretations dropped to 0/6; all 6 people wrote limitations first, but some only wrote eight words to appease the audience. This supported the three limitations in the Health/Economic sidebar and the source box; the trust slider in the individual line didn't have time to be implemented in the team webpage, but the mechanism had already been validated in the third round.

If only 30 seconds are available: only present the bolded conclusions of each round + "three rounds → four layers of source boxes".

Relationship with the team leader: The team leader's Week 10 is approximately equivalent to your first round; you supplement the second and third rounds by explaining "we tested it more than once, and changed the interaction design accordingly".

Section 3 · Design Decisions: Four-Layer Source Box (40 seconds) — Refers to projection or handheld C

Speech Script:

In the final version, I implemented a four-layer system (corresponding to our W11 written plan):

1. Citation — Three data sources, access date, and clickable official links; Live/Fallback badges indicate whether the current API is live or a local sample.

2. Variable Dictionary — Explains pp, GDP shock relative to the 2019 baseline, and Economic recovery relative to the 2020 trough, specifying that it is not a health recovery.

3. How data is combined — Aligned to ISO3; cases change daily over time, GDP is annual data, preventing users from thinking the chart is "stuck".

4. What this tool cannot prove — Three boundaries: covariance does not equal causation; cross-border cases cannot be directly compared; macro GDP masks inequality and revision lags.

The Health/Economic labels in the sidebar are consistent with the dictionary, reducing misinterpretations of the "recovery" seen in Week 10.

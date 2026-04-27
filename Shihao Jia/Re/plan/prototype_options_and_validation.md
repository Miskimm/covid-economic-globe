# Prototype Options + Focused Validation (Evidence-Aligned)

## Option Set (Max 2, as planned)

## Option A — Guided Comparison Dashboard (Interpretation-first)

### Purpose
Prioritize metric meaning and country/time comparison clarity for primary users.

### Core Interaction
1. Select country pair.
2. Select time pair.
3. Read auto-generated comparison statement with evidence chips.
4. Confirm interpretation in one sentence.

### Requirement Mapping
- R1 Interpretation clarity: inline metric definitions and examples.
- R2 Preference-understanding separation: comprehension task shown before preference question.
- R3 Trust transparency: visible source/method/uncertainty block per panel.
- R4 Cognitive load control: one core analysis task per screen.

## Option B — Narrative Evidence Flow (Guided story mode)

### Purpose
Reduce cognitive overload by sequencing interpretation into guided steps.

### Core Interaction
1. Step 1: Health trend signal.
2. Step 2: Economic trend signal.
3. Step 3: Linked interpretation and boundary note ("correlation, not automatic causation").
4. Step 4: User confidence rating + explanation.

### Requirement Mapping
- R1: stepwise meaning prompts.
- R2: separate confidence and correctness capture.
- R3: source state shown at each step.
- R4: constrained interaction to reduce navigation burden.

## Why only these two options
- Directly addresses tutor feedback: problem-first, user-specific understanding, and justification.
- Covers both major uncertainty branches from gap matrix:
  - free comparison support (A),
  - guided interpretation support (B).

---

## Focused Validation Test Plan

## Participants
- Primary user group only for this cycle (students requiring evidence-based interpretation in coursework).

## Tasks (Correctness-first)
1. Explain "GDP vs 2019" in plain language.
2. Explain "recovery vs 2020" in plain language.
3. Compare two countries across two time points and cite evidence from the interface.
4. Distinguish one observed pattern from one unsupported causal claim.

## Measures
- Interpretation correctness (0/1 per task criterion).
- Completion time.
- Confidence score (1-5).
- Confidence-correctness alignment.
- Trust score with source-awareness check.
- Preference score (collected last, not first).

## Pass/Fail thresholds (cycle gate)
- >= 70% participants correctly complete tasks 1-3 without facilitator correction.
- >= 60% participants correctly identify correlation-vs-causation boundary.
- Preference and comprehension results reported separately.

---

## Validation Run v0 (Completed with current artifacts)

### What was executed
- Comparative questionnaire analysis baseline from `survey_result.md` (n=4).
- Requirement-task mapping completed for Option A and Option B.
- Focused interpretation test script finalized for next participant round.

### Baseline observations
- Prototype preference signal exists but cannot stand in for comprehension evidence.
- Users repeatedly indicate interest in economy-health linkage; this supports interpretation-centered tasks.
- Current sample is too small for directional claims; next round must prioritize correctness tasks.

### Decision
- Move both Option A and B to low/mid-fidelity build for controlled comparison.
- Do not expand feature scope until correctness and trust criteria are met.

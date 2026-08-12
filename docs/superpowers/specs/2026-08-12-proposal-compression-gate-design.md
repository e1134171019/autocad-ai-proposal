# Proposal Compression Gate — Design Spec

Date: 2026-08-12  
Target Skill: `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`  
Target branch: `feat/proposal-compression-gate`  
Base: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`

## 1. Problem

The current B2B technical proposal messaging Skill is strong at source understanding, Content Modeling, Positioning, Narrative, Section Content Contracts, claim boundaries, title-body fit, and Human / Program / AI responsibility. It does not yet contain an explicit upstream rule that separates complete internal analysis from compressed customer-facing proposal content.

As a result, a future execution can correctly understand the source but still over-explain the website: too many ideas per section, internal analysis leaking into frontstage copy, repeated text around an interaction that already demonstrates the point, or technical detail being duplicated instead of delegated to evidence.

`eden-engineering-copy` already performs sentence-level concision and anti-slop review. That is downstream and should remain downstream. This change adds section-level proposal compression before title generation.

## 2. Goal

Add a reusable `Proposal Compression Gate` to `b2b-technical-proposal-messaging` so that:

- internal reasoning remains complete;
- customer-facing proposal content contains only what the reader needs to understand, trust, and decide;
- each section carries one primary message;
- interactions and evidence carry detail instead of being redundantly narrated;
- required engineering conditions, workflow steps, claim boundaries, and responsibility boundaries are never deleted merely to make copy shorter.

Core principle:

> Internal analysis may be complete; frontstage proposal content must be decision-relevant and compressed.

## 3. Scope

### In scope

- Modify the existing `b2b-technical-proposal-messaging` Skill rather than create a third copywriting Skill.
- Insert Proposal Compression after Section Content Contract and before Titles.
- Add a reusable `Frontstage Payload` classification.
- Extend Cross-Section Review with compression-specific checks.
- Add RED/GREEN contract tests and behavioral evidence.
- Validate against the current AutoCAD proposal and one non-CAD industrial B2B fixture.
- Preserve final handoff to `eden-engineering-copy` in `strict-review` mode.

### Out of scope

- No website `src/` edits in this Skill change.
- No ACT02 9-step or ACT04 12-step workflow changes.
- No simulator behavior changes.
- No merge to `main`.
- No production deployment.
- No central Drive Skill registration in this change.
- No retirement or deletion of `proposal-copywriting`.

## 4. Workflow change

Current:

`Source → Content Model → Positioning → Narrative → Section Content Contract → Titles → Cross-Section Review → eden-engineering-copy`

Proposed:

`Source → Content Model → Positioning → Narrative → Section Content Contract → Proposal Compression → Titles → Cross-Section Review → eden-engineering-copy`

Titles remain downstream. Compression must happen before titles so headline generation reflects the actual frontstage payload rather than the full internal analysis.

## 5. Proposal Compression Gate

For each section, the Skill must derive the customer-facing payload from the completed Section Content Contract.

### 5.1 One primary message

Each section must have one dominant `Core Message`. Supporting facts may exist, but they must either prove, clarify, or operationalize that message.

If a section contains multiple independent conclusions, the execution must classify them as:

- keep as support;
- move to another section;
- move to evidence/interaction;
- keep as internal background only;
- remove from frontstage copy.

### 5.2 Frontstage Payload

Each section must classify content into four buckets:

- `Must show` — required for the customer to understand the section or make the next decision.
- `Evidence carries` — detail already communicated by stepper, simulator, chart, table, traceability view, or other evidence; prose should not repeat it in full.
- `Background only` — useful internal analysis that should not appear in normal frontstage copy.
- `Remove or move` — duplicate, premature, unsupported, or misplaced content.

This classification is a decision output, not a fixed website template.

### 5.3 Default frontstage shape

For proposal websites, the default first-layer section payload is:

`Title → short lead → primary interaction/evidence → necessary supporting detail`

This is a default reading hierarchy, not a fixed word-count or section-count rule. Complex workflow sections may contain many steps when those steps are the actual evidence.

### 5.4 Interaction-first compression

When an interaction or visualization already communicates sequence, state, comparison, scope, or traceability, prose must explain its meaning rather than narrate every visible step again.

The interaction remains semantic content and must not be removed simply to reduce content.

### 5.5 Protected detail

Compression must not delete or blur:

- meaningful workflow steps;
- numbers, units, versions, drawing/layer/command/API/UI identifiers when material;
- safety or deterministic calculation conditions;
- selection boundaries, rule basis, ignored reasons, traceability conditions;
- Human / Program / AI responsibility boundaries;
- evidence status such as `proven`, `proposed`, `concept simulation`, or `unknown`;
- explicit claim limitations.

`Shorter` is not a valid reason to remove engineering meaning.

## 6. Cross-Section Review additions

Add three explicit failure modes:

### Analysis leakage
Internal Content Model, Positioning reasoning, version-conflict analysis, or evidence-gap discussion appears in customer-facing copy without a customer decision need.

### Over-explanation
Text repeats what the interaction/evidence already demonstrates instead of adding interpretation, boundary, or takeaway.

### Message duplication
The same major conclusion is fully consumed in multiple sections, weakening narrative progression.

The reviewer must identify the owner section for each major insight and downgrade earlier occurrences to a teaser when appropriate.

## 7. AutoCAD validation contract

The current repository state is authoritative for this validation:

- ACT02 remains 9 steps.
- ACT04 remains 12 steps.
- No step is removed, merged, reordered, or rewritten solely for compression.

Expected frontstage ownership after compression:

- ACT01: identify the AI construction-drawing verification proposal and orient the reader.
- ACT02: demonstrate the current real workflow.
- ACT03: own the full scope-control insight: the difficult part is deciding what should count.
- ACT04: demonstrate the proposed workflow and preserve concept-simulation boundaries.
- ACT05: establish technical trust: deterministic rules calculate, AI queries/explains/summarizes, humans confirm; results are traceable.
- ACT06: retain engineering-experience systemization and add a separately identified proposed commercial next-step layer for real-drawing validation.

The Skill must not convert unmeasured workflow differences into time-saving, speed, ROI, or error-reduction claims.

## 8. Non-CAD validation contract

Reuse or extend the synthetic industrial IoT fixture used by the original Skill GREEN test.

The revised Skill must:

- keep deterministic threshold evaluation intact;
- keep AI at query/summary/explanation responsibility;
- retain technician confirmation;
- preserve simulator/interaction meaning;
- remove or background internal analysis that does not help the buyer decide;
- surface unsupported speed claims rather than make them more concise and therefore more persuasive.

This proves Proposal Compression is domain-generic rather than AutoCAD-specific.

## 9. TDD / Skill verification plan

Follow `writing-skills` and TDD.

### RED

Before editing the Skill:

1. Extend the executable Skill contract so it requires:
   - `Proposal Compression`;
   - `Frontstage Payload`;
   - separation of internal analysis from frontstage proposal copy;
   - protected workflow/engineering meaning during compression;
   - interaction-first compression;
   - analysis leakage / over-explanation / message duplication review.
2. Run the targeted test and full Quality Gate.
3. Record the expected failure against the unmodified Skill.

### GREEN

1. Make the minimal Skill edit required by the RED contract.
2. Re-run the targeted contract.
3. Run AutoCAD behavioral GREEN validation.
4. Run non-CAD behavioral GREEN validation.
5. Run `eden-engineering-copy` strict-review handoff checks.
6. Run the full repository Quality Gate.

### REFACTOR

Only after GREEN:

- remove redundant wording;
- keep the Skill concise;
- avoid duplicating `eden-engineering-copy` sentence-level rules;
- preserve domain-generic wording;
- keep the frontmatter description focused only on when the Skill applies.

## 10. Acceptance criteria

The change is accepted only if all of the following are true:

1. Existing Asset Gate, Content Model, Positioning, Narrative, Section Contract, Titles, and responsibility boundaries still pass existing tests.
2. Proposal Compression occurs before Titles.
3. Frontstage Payload has all four classifications.
4. The Skill explicitly distinguishes complete internal analysis from compressed customer-facing content.
5. Interaction/evidence can carry detail without redundant prose.
6. Compression cannot delete meaningful workflow or engineering conditions.
7. AutoCAD 9/12 workflow semantics remain intact.
8. The non-CAD fixture also passes.
9. Unsupported claims remain blocked.
10. `eden-engineering-copy` remains the final sentence-level strict-review handoff.
11. Full Quality Gate passes at final head.
12. No `src/` file is changed by this Skill-only implementation.

## 11. Integration boundary

Implementation occurs only on `feat/proposal-compression-gate`.

After RED/GREEN verification and final GPT review, a separate integration decision is required before opening or merging a PR back into `feat/ux-hierarchy-v2`.

No merge to `main` and no deployment are authorized by this spec.

# Proposal Compression Gate — GREEN Application: Industrial IoT Fixture

Date: 2026-08-12  
Branch: `feat/proposal-compression-gate`  
Test type: synthetic cross-domain control  
Domain: industrial IoT / machine-condition workflow

## Fixture facts

This validation reuses the existing synthetic fixture exactly as its source boundary. It is not customer evidence and no new implementation or performance fact is inferred.

- Reader / buyer: factory maintenance manager.
- Technical reviewer: controls engineer.
- Current workflow: technician reads three machine sensors, records values in a spreadsheet, compares each value to a fixed engineering threshold, then writes a shift note.
- Proposed workflow: gateway collects the same sensor values; deterministic rules evaluate fixed thresholds; AI Assistant queries stored results and drafts a plain-language shift summary; technician confirms the summary.
- Interactive evidence: four-step simulator — sensor acquisition → threshold evaluation → flagged result → AI summary.
- Claim conflict: hero says `find failures faster`, while the evidence section states that no measured detection-time study has been completed.
- Proof status: simulator only; no production deployment claim.

## Section Content Contract summary

The original GREEN application already established these section responsibilities before title generation:

- Hero: establish the proposal category and mechanism without unsupported speed claims.
- Current workflow: preserve the four manual steps.
- Proposed workflow: make gateway / deterministic rule / AI / technician responsibilities explicit.
- Simulator: show the four-step responsibility sequence.
- Evidence: state that measured speed and production deployment are not proven.

The Proposal Compression Gate is applied only after those contracts. It does not replace source understanding or responsibility analysis.

## Frontstage Payload

### Must show

- The proposal connects machine sensor results, fixed engineering rules, AI-assisted shift-summary preparation, and technician confirmation.
- Current manual flow remains understandable as: read sensors → record values → compare fixed thresholds → write shift note.
- Proposed responsibility split remains explicit:
  - gateway collects sensor values;
  - deterministic rules evaluate fixed thresholds;
  - AI Assistant queries structured results and drafts the language summary;
  - technician confirms.
- The simulator is concept evidence only.
- Detection-time improvement is unmeasured and therefore cannot be presented as a proven outcome.

### Evidence carries

- The four-step simulator carries the proposed sequence: acquisition → threshold evaluation → flagged result → AI summary.
- The simulator itself makes one important responsibility boundary visible: the flagged result exists before the AI summary stage.
- The current-workflow step sequence can carry operational detail without a second prose walkthrough.

### Background only

- Full internal Positioning reasoning about why maintenance workflow fragmentation matters commercially.
- Internal evidence-gap analysis beyond the concise customer-facing statement that timing has not been measured.
- Internal reviewer reasoning about why deterministic threshold evaluation must precede AI language work.
- Any speculative cost, downtime, detection-delay, accuracy, or ROI interpretation not present in the fixture.

### Remove or move

- Remove `find failures faster` as a proven-result headline until a detection-time study exists; it may only be reframed as an unproven design objective if strategically needed and clearly labeled.
- Do not repeat all four simulator steps in prose when the interaction already shows them.
- Do not describe AI as setting, calculating, or deciding engineering thresholds.
- Do not remove technician confirmation to make the proposal sound more autonomous.
- Do not promote simulator evidence into a production-deployment claim.

## Responsibility preservation

Proposal Compression does not change the system claim:

`Gateway collection → deterministic threshold evaluation → structured/flagged result → AI query/summary → technician confirmation`

Protected responsibility boundaries:

- deterministic engineering threshold comparison remains program/rule responsibility;
- AI remains query, explanation, and language-summary responsibility;
- technician confirmation remains explicit;
- no autonomous diagnosis, threshold generation, or fault-prediction claim is introduced.

The shorter frontstage version therefore preserves more important engineering meaning than a promotional shortcut such as `AI detects failures automatically`.

## Unsupported-claim check

The fixture contains no measured detection-time study. Therefore:

- `find failures faster` cannot remain as a proven outcome;
- compression cannot turn it into a stronger short claim such as `AI finds faults faster`;
- no percentage, time saving, ROI, downtime reduction, fault-detection accuracy, or customer outcome may be invented;
- the correct frontstage treatment is to remove the outcome claim, mark it as an evidence gap, or explicitly describe it as an unproven design objective.

Result: unsupported performance language remains blocked rather than becoming more persuasive through brevity.

## Interaction-first compression check

The simulator already shows four responsibility transitions. The compressed copy should explain what the sequence means instead of narrating every visible step again.

A valid first-layer explanation is conceptually:

`固定工程規則先完成閾值判讀；AI 助理再使用已產生的結果整理交班摘要，最後由技術員確認。`

This does not replace the four-step simulator; it interprets it. The interaction remains semantic evidence.

## Domain-generic check

The revised core Skill requires none of the following:

- AutoCAD;
- DWG;
- drawing layers;
- selection boundaries;
- ACT numbering;
- CAD commands or object types.

The reusable compression method remains domain-generic:

`Section Content Contract → one dominant frontstage message → Must show / Evidence carries / Background only / Remove or move → Titles → Cross-Section Review`

The same method works because it reasons about buyer decisions, evidence, interaction semantics, responsibility boundaries, and claims rather than CAD-specific structures.

## GREEN verdict

The Proposal Compression Gate passes the non-CAD control:

- deterministic threshold evaluation remains program/rule responsibility;
- AI remains query/explanation/summary responsibility;
- technician confirmation remains explicit;
- simulator detail carries workflow sequence without requiring full prose duplication;
- the unsupported speed claim is removed, downgraded to an evidence gap, or explicitly labeled as unproven rather than strengthened;
- simulator proof remains concept-only;
- no CAD-specific vocabulary is required by the Skill.

Result: **GREEN for domain-generic proposal compression on the industrial IoT fixture.**

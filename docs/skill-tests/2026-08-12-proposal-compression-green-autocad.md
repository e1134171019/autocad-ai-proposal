# Proposal Compression Gate — GREEN Application: AutoCAD Proposal

Date: 2026-08-12  
Branch read: `feat/proposal-compression-gate@ae4540bd8af3fb56a2ac8fe73bb54c9485cc4eb0`  
Website source changes in this validation: none

## Source / version readout

The current page still composes six sections in this order:

`ACT01 → ACT02 → ACT03 → ACT04 → ACT05 → ACT06`

Source re-read before compression decisions:

- `src/routes/+page.svelte`
- `src/lib/content/siteContent.js`
- `src/lib/components/Act01Hero.svelte`
- `src/lib/components/Act02Flow.svelte`
- `src/lib/components/Act03Problem.svelte`
- `src/lib/components/Act04Solution.svelte`
- `src/lib/components/Act05Intelligence.svelte`
- `src/lib/components/Act06Summary.svelte`
- `src/lib/components/CadProcess.svelte`
- `src/lib/charts/cadSimulator.js`

Current repository facts remain:

- ACT02 `currentFlowNodes`: **9 steps**.
- ACT04 `futureFlowSteps`: **12 steps**.
- `CadProcess.svelte` requires fresh selection state on future zero-based indices `[6, 7, 9]`, corresponding to steps 7, 8, and 10; step 8 also gates progression until result state is complete.
- `cadSimulator.js` imports deterministic length conversion/calculation and standard-layer filtering helpers.

The user-stated historical 8/11 baseline remains historical context only. No historical step is reconstructed or substituted for the current 9/12 repository state.

## Preserved source facts and responsibility boundaries

Protected during compression:

- Drawing staff retain engineering judgment about construction position and scope.
- ACT02 remains a nine-step current workflow; the stepper/simulator is primary semantic evidence.
- ACT04 remains a twelve-step proposed workflow; the stepper/simulator is primary semantic evidence.
- ACT04 remains `Concept Simulation｜提案操作示意`, not proof of completed AutoCAD API / real DWG integration or formal product verification.
- Selection boundary and standard layers define what the deterministic calculation can include.
- The deterministic program/rule layer filters, reads CAD geometry/object data, classifies, sums, converts quantities, and retains ignored reasons/calculation basis.
- AI Assistant queries, explains, summarizes, and organizes already-calculated results; it does not replace deterministic calculation.
- Drawing staff perform final confirmation.
- ACT03 explicitly states that workflow comparison is not measured work time.

## ACT01 Frontstage Payload

Current section role: proposal orientation, Before/After comparison, full scope-control insight, four background narratives, and six-section secondary navigation.

### Must show

- What proposal the reader is looking at.
- Current-vs-proposed workflow contrast.
- Human engineering judgment remains.
- A short teaser that calculation depends on defining the correct scope.

### Evidence carries

- The Before/After workflow rows carry the high-level operating difference.
- The six-section outline can carry navigation without each item becoming a full explanatory paragraph.

### Background only

- Full internal explanation of mixed floors, areas, versions, and reference objects.
- Detailed rationale for why scope is the central positioning insight; this belongs in the internal Content Model/Positioning work.

### Remove or move

- Move ownership of the **full** `真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算` argument to ACT03.
- ACT01 should only tease that issue so ACT03 still has a distinct narrative job.
- Reduce background blocks that pre-explain the ACT02 workflow; ACT02's interactive evidence should do that work.

Compression result: ACT01 should orient and create the question; it should not consume ACT03's conclusion or narrate ACT02 in advance.

## ACT02 Frontstage Payload

Current section role: demonstrate the real current drawing workflow with `CadProcess`.

### Must show

- Section framing: this is the current workflow.
- All **9 current steps** exactly as meaningful workflow evidence.
- Human/manual responsibility in judging scope, drawing, inspecting, annotating, summing, converting, checking, and final adjustment.

### Evidence carries

- The stepper, CAD Ribbon/model area, docked panel, command state, per-step index, and simulator animation carry the sequence and operating detail.
- Each step label/description carries its local explanation; surrounding prose should not restate all nine steps.

### Background only

- Internal analysis about why each step matters to later positioning.
- Historical 8-step baseline, unless a separate historical-comparison task is approved.

### Remove or move

- Do not add another prose list summarizing the same nine steps above or below the simulator.
- Do not convert the manual workflow into a generic statement such as `人工流程很繁瑣`; the actual sequence is stronger evidence.

Compression result: preserve **9/9 steps** and compress only the wrapper copy around the interaction.

## ACT03 Frontstage Payload

Current section role: workflow comparison plus six operating risks, with an explicit no-measured-time boundary.

### Must show

- ACT03 owns the full scope-control insight: the difficult part is deciding which objects belong to the current calculation.
- The comparison is about workflow steps, not measured work time.
- Actual timing requires the same drawing and same conditions.
- The six risk categories remain available as supporting evidence.

### Evidence carries

- The D3 comparison carries the workflow contrast.
- The six risk rows carry omission/double count, scope inconsistency, layer/dimension/geometry inconsistency, mixed drawing/area calculations, traceability gaps, and re-check work.

### Background only

- Internal claim-evidence analysis explaining why speed/ROI cannot be asserted.
- Full Positioning reasoning behind selecting scope control as the owner insight.

### Remove or move

- Remove duplicated full explanations of the scope insight from ACT01; ACT01 should tease it.
- Do not repeat every risk row in prose when the list is already visible.
- Reject any `faster`, time-saved, ROI, or error-reduction statement without evidence.

Compression result: one primary conclusion—**first define what counts**—supported by the comparison and risk evidence, while retaining the timing caveat.

## ACT04 Frontstage Payload

Current section role: show the proposed operation as a concept simulation.

### Must show

- `Concept Simulation｜提案操作示意` and its explicit implementation/proof boundary.
- All **12 proposed steps** exactly as meaningful workflow evidence.
- Human engineering judgment remains in construction-position decisions and drawing.
- Standard layers and selection boundary establish deterministic calculation context.
- Selection-gated result and AI-query interactions remain meaningful.
- Human confirmation remains before output.

### Evidence carries

- The twelve-step `CadProcess` simulator carries the operating sequence.
- Selection state, disabled progression, result panel, query interaction, and PDF/output preview carry interaction semantics.
- Step descriptions carry standard-layer/tool behavior and responsibility details locally.

### Background only

- Internal architecture/positioning analysis of why each step belongs in the sales narrative.
- Historical 11-step baseline.

### Remove or move

- Do not create a second prose walkthrough of all twelve steps.
- Do not label deterministic filtering/calculation as LLM reasoning.
- Do not compress away the concept-simulation disclaimer.

Compression result: preserve **12/12 steps** and let the interaction explain the workflow; wrapper copy states what changes and what remains human-owned.

## ACT05 Frontstage Payload

Current section role: establish technical trust through calculation responsibility, AI-assistant responsibility, calculation context, and traceability.

### Must show

- Deterministic rule/program responsibility: filter → read object/geometry data → classify/sum/convert → retain basis and ignored reasons.
- AI Assistant responsibility: query → explain → summarize → organize traceability/report explanations.
- Human confirmation remains outside both automated responsibility sets.
- Traceability chain: `Object → Layer → Selection Boundary → Rule → Result → Ignored Reason`.

### Evidence carries

- Responsibility groups carry the detailed four-item deterministic and four-item AI lists.
- Calculation Context visualization carries drawing identity, area, object, company rule, and calculation relationship context.
- Traceability grid carries the six evidence fields.

### Background only

- Internal explanation of why this responsibility split is commercially important.
- Full implementation-level reasoning already covered by source and tests.

### Remove or move

- Do not repeat responsibility lists in a long introductory paragraph.
- Do not describe exact geometry/length/quantity calculation as AI work.
- Do not repeat the traceability grid field-by-field in prose.

Compression result: the first layer can state the trust contract in one line—rules calculate, AI queries/explains/summarizes, humans confirm—while evidence carries the detail.

## ACT06 Frontstage Payload

Current section role: close on engineering experience becoming reusable rules, standards, and organizational knowledge. Current source explicitly has no CTA.

### Must show

- `人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`
- Engineering experience becomes explicit drawing conditions, logic, and calculation rules.
- Progression remains `經驗規則化 → 作業標準化 → 知識系統化`.

### Evidence carries

- The three-stage progression carries the organizational-value sequence.
- Existing short summary copy carries responsibility and reuse meaning.

### Background only

- Internal commercial reasoning about why a proposal site needs a next action.
- Any implementation detail already established in ACT04/ACT05.

### Remove or move

- Avoid re-explaining the entire ACT05 Human / Program / AI responsibility lists.
- A new `下一步｜用實際施工圖確認驗證範圍` block is a **strategic addition**, not current source fact. If later implemented, keep it visually and semantically separate from the historical/source conclusion.

Compression result: preserve the existing organizational conclusion, then—only under separate approved website implementation—append a concise real-drawing-validation next step.

## Cross-section compression review

### Analysis leakage

PASS in the decision model: Content Model, Positioning reasoning, historical 8/11 conflict, and detailed claim-gap analysis remain internal/background unless the buyer needs them for a decision.

### Over-explanation

Primary compression targets:

- ACT02 and ACT04: do not restate stepper content in parallel prose.
- ACT03: do not restate six risk rows in the lead.
- ACT05: do not restate responsibility lists or traceability fields in the lead.

### Message duplication

Owner assignments:

- Proposal orientation → ACT01.
- Current workflow → ACT02.
- Full scope-control insight and workflow-risk conclusion → ACT03.
- Proposed operating sequence → ACT04.
- Calculation/AI/traceability trust boundary → ACT05.
- Organizational reuse + separately proposed commercial next action → ACT06.

ACT01 therefore teases scope control instead of fully consuming ACT03's conclusion.

## Claim / evidence review

Still unsupported by the inspected source and therefore blocked as proven outcomes:

- measured time saved;
- measured processing-speed improvement;
- measured error reduction;
- ROI;
- customer outcome metrics;
- completed production AutoCAD API / real-DWG integration;
- production-readiness guarantees.

`Proposal Compression` cannot turn any of these evidence gaps into stronger, shorter claims.

## eden-engineering-copy handoff

Before any later external-facing website rewrite, route the compressed frontstage copy through `eden-engineering-copy` in `strict-review` mode to verify:

- fidelity to protected process steps and responsibilities;
- evidence status of benefit claims;
- plain zh-TW engineering language;
- no sentence-level repetition or promotional filler;
- deterministic calculation remains separate from AI assistance;
- concept/proposed wording remains explicit.

Section-level compression remains the responsibility of `b2b-technical-proposal-messaging`; sentence-level concision remains downstream in `eden-engineering-copy`.

## GREEN verdict

The revised Skill can now separate complete internal analysis from a compressed frontstage proposal payload while preserving the proposal's engineering semantics:

- ACT02 remains 9 steps;
- ACT04 remains 12 steps;
- interaction/evidence carries detail instead of being redundantly narrated;
- scope-control insight receives one owner section;
- deterministic calculation / AI assistance / human confirmation remain separated;
- concept-simulation and no-measured-time boundaries remain visible;
- ACT06 commercial next action remains a separately identified strategic recommendation;
- no unsupported performance claim was introduced.

No `src/` file, simulator behavior, website copy, `main`, or deployment was changed by this validation.

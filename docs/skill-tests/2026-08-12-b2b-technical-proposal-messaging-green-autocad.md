# B2B Technical Proposal Messaging — GREEN Application: AutoCAD Proposal

Date: 2026-08-12  
Skill: `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`  
Source ref read before messaging work: `feat/b2b-technical-proposal-skill@cf6b980f7a3d3cb5543156b64e203f428a59c221`  
Website source changes in this validation: none

## 1. Source / version readout

The page source composes six sections in order: ACT01 → ACT02 → ACT03 → ACT04 → ACT05 → ACT06.

Source inspected before any title recommendation:

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

`CadProcess.svelte` imports the actual simulator from `src/lib/charts/cadSimulator.js`; the simulator imports deterministic length conversion/calculation and standard-layer filtering helpers.

### Version conflict / historical gap

Current repository facts:

- ACT02 `currentFlowNodes`: **9** steps.
- ACT04 `futureFlowSteps`: **12** steps.

User-provided historical baseline in the conversation:

- original ACT02: **8** steps;
- original ACT04: **11** steps.

The current repository source read in this test does not itself prove which exact step changed between 8→9 or 11→12. Therefore the 8/11 baseline is retained as a user-stated historical fact and the current 9/12 state as repository fact. No missing historical version is reconstructed from memory.

## 2. Content Model

### ACT01 — current opening / proposal orientation

**Current purpose**  
Introduce the proposal, show a current-vs-plugin workflow contrast, surface the scope-selection problem, provide four background narratives, and provide six-section secondary navigation.

**Source facts**

- Visible H1: `AutoCAD 施工圖長度與數量自動驗算`.
- Lead keeps engineering judgment with drawing staff and assigns repetitive length/quantity organization to the plugin.
- Before/after row contrasts manual point/read/record/sum/count with draw/select/system-organize/human-confirm.
- A prominent bridge states that the real problem is deciding which objects should count.
- `heroContent` repeats customer need, goal, real difficulty, and current-process context.

**Interaction / evidence**  
Static hierarchy and before/after comparison; no runtime calculation proof in this section.

**Claims / boundary**  
The H1 and lead describe a proposal direction. No measured time/ROI evidence is present here.

**Responsibility actors**  
Human engineering judgment; plugin/system organization; AI is not yet clearly separated in the visible first-screen wording.

**Repetition / drift**  
The scope problem is introduced here and can overlap ACT03. The four narrative blocks also pre-explain ACT02.

**Protected content**  
Current-vs-proposed contrast and the scope-selection insight are high-value orientation content.

### ACT02 — current manual workflow

**Current purpose**  
Demonstrate how the current drawing workflow is performed, step by step, in a shared CAD simulator.

**Source facts / current 9 steps**

1. Original CAD drawing supplied.
2. Import original drawing/layers.
3. Human judges exterior/shaft construction scope.
4. Draw line/polyline along construction scope.
5. Select objects one by one and inspect length in Properties.
6. Create red horizontal dimensions segment by segment and record manually.
7. Manually sum exterior and shaft lengths.
8. Manually convert length into construction quantity.
9. Adjust line/text/dimension/drawing positions.

**Interaction / evidence**  
`CadProcess` provides previous/next controls, per-step index, CAD Ribbon, model area, docked panel, command state, and simulator animation. The interaction is the section's primary explanation, not decoration.

**Claims / boundary**  
The section demonstrates process steps; it is not itself measured timing evidence.

**Responsibility actors**  
Primarily drawing staff / manual workflow.

**Version drift**  
Repository says 9 steps; user states original design was 8. Historical diff remains unresolved in this validation.

### ACT03 — workflow comparison / risks

**Current purpose**  
Compare manual and plugin workflow steps and list six operating risks.

**Source facts**

- Explicitly states that the comparison is about workflow steps, **not measured work time**.
- Says actual timing must be measured on the same drawing under the same conditions.
- Six risks include omission/double counting, scope inconsistency, layer/dimension/geometry inconsistency, mixed drawing/area calculations, missing traceability, and re-check work after drawing changes.

**Interaction / evidence**  
D3 comparison animation plus six risk rows.

**Claim contradiction check**  
Any other copy that claims the AI/plugin workflow is already proven faster would conflict with ACT03's explicit no-measured-time boundary.

### ACT04 — proposed system / concept simulation

**Current purpose**  
Demonstrate the proposed operating flow and interface concept using the same CAD process shell.

**Source facts / current 12 steps**

1. Original CAD drawing supplied.
2. Plugin creates standard layers.
3. Drawing staff judge construction positions.
4. Staff draw construction scope; AI does not replace drawing judgment; system reads object length and adds dimension data.
5. Tool choice automatically applies standard layer/color/line width.
6. Plugin adds dedicated function buttons.
7. Selection defines the calculation boundary; standard layers control included object categories.
8. After selection, classified results appear in the docked result interface.
9. Segments are numbered; length objects and construction components are organized separately.
10. Re-select scope, then use the AI assistant to query traceable results.
11. Drawing staff confirm lengths, grouped totals, quantities, and ignored reasons.
12. Output drawing/PDF while retaining boundary, layer basis, independent lengths, totals, and quantities.

**Interaction / evidence**  
The simulator is a core semantic artifact. Selection is stateful: selected context gates later result/AI actions. `CadProcess` disables progression when required selection/result state is incomplete.

**Claim boundary**  
The section explicitly labels itself `Concept Simulation｜提案操作示意` and says it does not prove completed production API / real drawing integration or formal product verification.

**Version drift**  
Repository says 12 steps; user states original design was 11. Historical diff remains unresolved here.

### ACT05 — calculation responsibility / AI assistant / traceability

**Current purpose**  
Explain how results are calculated, what the AI assistant does, and how each result is traced back to source context.

**Source facts**

Deterministic responsibilities:

- filter valid objects by selection boundary and standard layers;
- read geometry/object data and retain original-object mapping;
- classify and sum lengths and convert construction/component quantities by company rules;
- retain ignored reasons, calculation basis, and traceable results.

AI assistant responsibilities:

- query completed results and drawing basis;
- explain classification, ignored reasons, and applied rules;
- summarize lengths, quantities, and abnormal items for the current construction area;
- organize traceability records/report explanations.

Traceability fields:

`Object → Layer → Selection Boundary → Rule → Result → Ignored Reason`.

**Interaction / evidence**  
Calculation-context chart plus responsibility groups and traceability evidence grid. Simulator code imports deterministic length conversion/calculation and layer filtering helpers.

**Responsibility boundary**  
Exact calculation belongs to deterministic program/rules. AI consumes already calculated results for query/explanation/summary and must not be described as replacing the rule engine.

### ACT06 — current project summary

**Current purpose**  
Close on engineering experience becoming reusable organizational rules and system knowledge.

**Source facts**

- Component comment explicitly says the final summary contains **no additional CTA**.
- Responsibility line: human does engineering judgment, program does deterministic calculation, AI assists query/explanation.
- Progression: experience rule-ization → work standardization → knowledge systemization.
- Final quote frames the result as a standard operating system that the company can preserve, the team can reuse, the program can execute, and AI can use.

**Strategy/source boundary**  
Turning ACT06 into a PoC/contact CTA would be a **new strategic recommendation**, not a description of the current source.

## 3. Positioning Snapshot

### Current-state diagnosis

- **Commercial reader / buyer:** client deciding whether the proposed workflow is worth continuing as a project.
- **Daily user:** drawing staff who judge construction scope and currently inspect/record/sum/count/check manually.
- **Technical reviewer:** reviewer who needs confidence that exact outputs are deterministic, scoped, and traceable.
- **Status quo:** manual drawing judgment + per-object inspection/annotation/recording/summing/counting/re-checking.
- **Customer problem:** the difficult part is not arithmetic alone; the system must first know which drawing/floor/area/version/objects belong to the current calculation.
- **Primary value:** organize repeated verification and result retrieval inside the drawing workflow while preserving human engineering judgment.
- **Differentiated mechanism:** human scope judgment + standard layers + explicit selection boundary + deterministic rules + traceable results + AI query/explanation/summary.
- **Proof status:** interactive proposal simulation and deterministic demo logic exist; production integration, measured time savings, ROI, and customer outcome metrics are not proven by this source.

### Strategic recommendation

A commercial next action may be added later, for example validating requirements against a real customer drawing/PoC scope. That action is not present in the current ACT06 and must be approved as a strategy change before implementation.

## 4. Narrative Map

1. **ACT01** — Reader asks: `這到底是什麼提案？`  
   Exit understanding: proposal concerns construction-drawing length/quantity verification and scope control.
2. **ACT02** — `你們真的了解我們現在怎麼做嗎？`  
   Exit: current manual workflow is understood as a complete interactive process.
3. **ACT03** — `目前流程真正有哪些風險／差異？`  
   Exit: workflow risks are understood without inventing timing evidence.
4. **ACT04** — `提出的流程實際會怎麼操作？`  
   Exit: proposed interaction and system boundary are visible as a concept simulation.
5. **ACT05** — `結果怎麼算？AI 到底負責什麼？`  
   Exit: deterministic calculation and AI assistance are separated and traceable.
6. **ACT06** — `這套方法最後替公司留下什麼？`  
   Exit: engineering experience is framed as reusable rules/standardized knowledge.

A commercial CTA is an optional new strategy layer after this current narrative, not automatically the historical role of ACT06.

## 5. Section Content Contracts

### ACT01

- **Section Purpose:** orient the buyer quickly.
- **Reader Question:** what is this proposal and what problem does it address?
- **Source Facts:** current H1, before/after, scope insight, background blocks.
- **Interaction / Evidence:** static before/after; no measured proof.
- **Core Message:** this proposal organizes construction-drawing verification around a correctly defined calculation scope.
- **Body Structure:** category → scope of work → current/proposed contrast → scope problem → secondary navigation.
- **Proof / Claim Boundary:** no speed/ROI claim.
- **Takeaway:** first define what should count; then calculate consistently.

### ACT02

- **Section Purpose:** prove understanding of the existing workflow.
- **Reader Question:** how is the work actually performed today?
- **Source Facts:** current 9-step repository workflow; historical 8-step user baseline is unresolved.
- **Interaction / Evidence:** stepper + CAD animation.
- **Core Message:** current verification is a sequence of human inspection, annotation, accumulation, conversion, and final adjustment.
- **Body Structure:** preserve meaningful steps; do not collapse them into generic prose.
- **Proof / Claim Boundary:** process demonstration, not time study.
- **Takeaway:** the proposal starts from the real work sequence rather than from AI features.

### ACT03

- **Section Purpose:** expose process risks and comparison boundaries.
- **Reader Question:** what specifically is difficult or error-prone in the current process?
- **Source Facts:** six risk categories; explicit no-timing-evidence statement.
- **Interaction / Evidence:** comparison visualization.
- **Core Message:** scope consistency, classification, traceability, and re-checking are the core process problems.
- **Body Structure:** comparison → evidence caveat → risk set.
- **Proof / Claim Boundary:** do not convert workflow simplification into measured time savings.
- **Takeaway:** workflow differences are visible; measured efficiency remains an evidence gap.

### ACT04

- **Section Purpose:** show how the proposed workflow would operate.
- **Reader Question:** what would staff actually do differently?
- **Source Facts:** current 12-step proposed workflow; user historical 11-step baseline unresolved.
- **Interaction / Evidence:** selection-gated CAD concept simulation and result panel.
- **Core Message:** human judgment remains, while standard layers, selection scope, deterministic organization, and AI result queries are integrated into the workflow.
- **Body Structure:** concept boundary → stepper → result/selection interactions → human confirmation.
- **Proof / Claim Boundary:** proposal simulation, not completed product verification.
- **Takeaway:** the proposal changes repetitive handling, not engineering ownership.

### ACT05

- **Section Purpose:** establish technical trust.
- **Reader Question:** who calculates, who explains, and how can results be checked?
- **Source Facts:** explicit deterministic and assistant responsibility arrays plus traceability chain.
- **Interaction / Evidence:** context map + evidence grid + underlying deterministic helpers.
- **Core Message:** rules calculate; AI queries/explains/summarizes; humans confirm.
- **Body Structure:** calculation responsibility → AI responsibility → context → traceability.
- **Proof / Claim Boundary:** never attribute exact geometry/quantity calculation to AI.
- **Takeaway:** each result has an accountable calculation path.

### ACT06

- **Section Purpose:** close the existing proposal on organizational reuse.
- **Reader Question:** what capability remains after this project beyond one drawing?
- **Source Facts:** rules/standards/knowledge progression; no CTA in current source.
- **Interaction / Evidence:** textual progression and responsibility statement.
- **Core Message:** engineering experience becomes reusable rules and standardized operating knowledge.
- **Body Structure:** responsibility line → two explanatory paragraphs → progression → closing statement.
- **Proof / Claim Boundary:** do not describe future business CTA as current content.
- **Takeaway:** human experience is preserved as explicit, reusable operating logic.

## 6. Title Candidate Matrix — generated only after Content Contracts

These are validation candidates, not approved website changes.

| Section | Frame | Candidate | Title-body fit | Claim risk |
|---|---|---|---|---|
| ACT01 | category clarity | `AI 施工圖驗算提案` | High if body immediately explains program/AI split | Low |
| ACT01 | category + mechanism | `施工圖驗算，導入 AI 輔助流程` | High | Low |
| ACT02 | current-state clarity | `目前施工圖怎麼完成` | High | Low |
| ACT02 | process | `目前的施工圖驗算流程` | High | Low |
| ACT03 | key insight | `真正問題不是加總，而是哪些物件該算` | High, but overlaps ACT01 if ACT01 keeps the full insight | Low |
| ACT03 | risk clarity | `施工範圍、分類與複核為什麼容易出錯` | High | Low |
| ACT04 | operation | `AI 驗算流程怎麼操作` | Medium-high; body must preserve deterministic responsibility | Medium |
| ACT04 | proposal clarity | `提案流程實際怎麼操作` | High | Low |
| ACT05 | reader question | `結果怎麼算、AI 助理能做什麼` | Very high | Low |
| ACT05 | trust | `計算規則、AI 助理與結果追溯` | Very high | Low |
| ACT06 | current source | `工程經驗如何變成可重複的作業規則` | Very high | Low |
| ACT06 | new conversion strategy | `下一步｜用實際施工圖確認驗證範圍` | Low for current body; requires strategic rewrite | Medium until explicitly approved |

No final title set is selected in this Skill-validation cycle.

## 7. Cross-Section Review

### Current-state findings

- ACT01 currently previews the same scope insight that can serve as ACT03's strongest conclusion; this creates narrative duplication.
- ACT01 background blocks also pre-explain ACT02, reducing the value of the dedicated current-workflow section.
- ACT02 and ACT04 are not ordinary copy sections; their interactive step sequences are primary semantic content.
- ACT03 correctly blocks unsupported time claims; any earlier `faster` wording must yield to this evidence boundary.
- ACT04 has a strong concept-simulation disclaimer that must remain visible if copy becomes more sales-oriented.
- ACT05 is the authoritative responsibility boundary: deterministic program/rules calculate exact outputs; AI assistant queries/explains/summarizes.
- ACT06 currently closes on knowledge systemization and explicitly has no CTA.

### Strategic recommendations, clearly separate from source

- If conversion becomes the primary page goal, ACT01 can be shortened and ACT06 can gain a commercial next-step layer, but those are strategy changes requiring explicit approval.
- If ACT03 owns the full scope-control insight, ACT01 should tease rather than fully consume it.
- Title changes should follow any approved body/narrative changes, not precede them.

## 8. Claim / evidence gaps

Unproven in the inspected source:

- measured time saved;
- measured processing speed improvement;
- measured error reduction;
- ROI;
- customer outcome metrics;
- completed production API / real-drawing integration;
- production-readiness guarantees.

## 9. Handoff to `eden-engineering-copy`

Any eventual external-facing rewrite must be strict-reviewed for:

- exact technical responsibility;
- preserved step/process meaning;
- claim evidence status;
- proposed-vs-implemented wording;
- zh-TW engineering language;
- protected technical terms/numbers/units;
- unsupported performance wording.

## 10. GREEN verdict

The new Skill changed the behavior that failed in RED:

- source and interactive workflow were read before title work;
- a full six-section Content Model was produced first;
- current 9/12 repo facts and user-stated historical 8/11 facts were kept separate;
- current source was separated from strategic recommendations;
- no measured speed claim was invented;
- deterministic calculation remained separate from AI assistance;
- titles were generated only after Section Content Contracts;
- no website content, simulator behavior, PR #2, main branch, or deployment was changed.

Result: **GREEN for the existing AutoCAD technical proposal application.**

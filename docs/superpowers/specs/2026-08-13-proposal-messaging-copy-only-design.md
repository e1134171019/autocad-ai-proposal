# Proposal Messaging Copy-Only Design

Date: 2026-08-13

## Status

- project mode: existing_change
- base: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`
- execution branch: `feat/proposal-messaging-copy-only-v1`
- formal project source: true
- deploy: false
- merge: false
- scope: six ACT titles and surrounding proposal copy only

## User correction that governs this design

The real project animation, interaction, layout and workflow are the required presentation baseline. A separately rebuilt prototype is not an acceptable representation of the intended website.

Therefore this change MUST use the actual project and MUST NOT recreate, replace, simplify or retime any project animation or interaction. Only the six chapter titles and chapter copy may change.

## Source readout

Read from `feat/ux-hierarchy-v2` before drafting:

- `src/routes/+page.svelte`
- `src/lib/components/Nav.svelte`
- `src/lib/components/Act01Hero.svelte`
- `src/lib/components/Act02Flow.svelte`
- `src/lib/components/Act03Problem.svelte`
- `src/lib/components/Act04Solution.svelte`
- `src/lib/components/Act05Intelligence.svelte`
- `src/lib/components/Act06Summary.svelte`
- `src/lib/components/CadProcess.svelte` semantics through its callers and project rules
- `src/lib/charts/comparisonAnim.js`
- `src/lib/content/siteContent.js`
- root `AGENTS.md`
- `src/AGENTS.md`
- `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`
- `skills/eden-engineering-copy/SKILL.md`

## Approaches considered

### A. Actual-project copy-only change — selected

Keep the real six ACT components, CAD simulator, D3 animation, workflow data, CSS and interaction behavior unchanged. Rewrite only the chapter titles and surrounding proposal copy so the existing visuals carry more of the explanation.

This is the selected approach because it directly satisfies the user's correction.

### B. Standalone comparison prototype — rejected

Rebuild the narrative in a separate HTML prototype. This was already tried and rejected because the recreated animation/layout is not an accurate representation of the real project.

### C. Full narrative/layout restructure — rejected for this scope

Change components, layout blocks, interaction structure or animation semantics together with copy. This could produce a cleaner information architecture but violates the explicit copy-only constraint.

## Protected behavior and files

The implementation MUST NOT change:

- `src/lib/charts/cadSimulator.js`
- `src/lib/charts/comparisonAnim.js`
- `src/lib/charts/contextMap.js`
- `src/lib/components/CadProcess.svelte`
- `src/app.css`
- component `<style>` blocks
- CAD drawing data
- animation durations or playback
- selection behavior
- result panel behavior
- ACT02 step count, order, labels or descriptions
- ACT04 step count, order, labels or descriptions
- `currentFlowNodes`
- `futureFlowSteps`
- `deterministicResponsibilities`
- `assistantResponsibilities`
- `intelligenceLayers`
- `risks`
- deterministic calculation data
- layer data
- quantity/length data
- interaction gates

ACT02 remains 9 steps. ACT04 remains 12 steps.

`src/AGENTS.md` also requires ACT06 to remain a PROJECT SUMMARY without NEXT STEP, question, back-link or CTA. This design therefore does not add the previously discussed commercial next-step block.

## Allowed source-edit surface

Only textual literals or content fields in the following source files may change:

- `src/lib/components/Nav.svelte` — six `navItems` labels only; brand text remains unchanged
- `src/lib/components/Act01Hero.svelte` — H1, lead, workflow comparison text, problem bridge copy, proposal-outline copy only
- `src/lib/components/Act02Flow.svelte` — `CadProcess` title/lead/highlight text only
- `src/lib/components/Act03Problem.svelte` — section title/lead only
- `src/lib/components/Act04Solution.svelte` — `CadProcess` title/lead/highlight text only; Concept Simulation disclaimer is protected
- `src/lib/components/Act05Intelligence.svelte` — section title/lead only
- `src/lib/components/Act06Summary.svelte` — section title and summary prose only; no CTA or structural change
- `src/lib/content/siteContent.js` — `heroContent.sections` only; top-level unused hero fields, workflow arrays and engineering data are protected

A test file and design/plan/evidence documents may be added outside `src/**`.

## Existing content model

### ACT01

Current role: proposal orientation, current-vs-proposed summary, scope problem explanation, four background sections and six-part outline.

Problem: it currently explains the scope difficulty in detail before the reader reaches later sections. It is also the densest copy surface.

Protected interaction: none beyond existing page links and current component structure.

### ACT02

Current role: demonstrate the actual 9-step manual workflow using the real `CadProcess` interaction.

Primary semantic evidence: the 9-step interaction itself.

Copy job: introduce the workflow briefly and let the interaction carry detail.

### ACT03

Current role and interaction: `comparisonAnim.js` compares manual process versus the proposed automated/AI-assisted flow and is followed by six risk items. It explicitly does not prove measured time savings.

Important correction: because the existing animation is a workflow comparison, ACT03 must remain a workflow-difference/risk chapter. It must not be retitled as a pure scope-control chapter that no longer matches the animation.

### ACT04

Current role: 12-step proposed-system Concept Simulation.

Protected evidence boundary: the disclaimer must continue to state that it does not prove completed AutoCAD API / real DWG integration or formal product validation.

Protected responsibility: engineering staff judge construction positions and draw; AI does not replace drawing.

### ACT05

Current role: explain deterministic C# Rule Engine calculation, AI Assistant query/explanation, calculation context and traceability.

This is the authoritative responsibility-boundary chapter.

### ACT06

Current role: project summary and organizational progression from engineering experience to reusable rules/standards/systematized knowledge.

Protected rule: no CTA.

## Narrative map

The six ACTs should answer these questions in order:

1. What is being proposed?
2. How is the drawing work completed today?
3. What changes between the manual and proposed workflow, and where are the risks?
4. How would the proposed workflow operate in AutoCAD?
5. How are results calculated, and what does AI actually do?
6. What reusable engineering capability remains after the project?

This preserves the existing animation sequence rather than forcing a new narrative onto unrelated visuals.

## Recommended chapter titles

| ACT | Recommended title | Reason |
|---|---|---|
| 01 | `AI 施工圖驗算提案` | Immediate proposal framing; AutoCAD remains in the supporting copy. |
| 02 | `目前施工圖怎麼完成` | Directly matches the 9-step current workflow interaction. |
| 03 | `人工流程與外掛流程，差在哪裡` | Matches the existing comparison animation and six risk items. |
| 04 | `AI 輔助驗算流程怎麼操作` | Keeps AI visible while avoiding the claim that AI performs all deterministic work. |
| 05 | `結果怎麼算、AI 助理能做什麼` | Directly states the technical-review question and responsibility split. |
| 06 | `把工程經驗變成可重複的作業規則` | Matches the existing project-summary progression without adding CTA. |

## Section content contracts

### ACT01 — AI 施工圖驗算提案

Section purpose: establish the proposal, current target work and calculation precondition without explaining the whole site upfront.

Recommended top copy:

- H1: `AI 施工圖驗算提案`
- Lead: `把施工範圍、長度整理、數量清點與結果查詢，整合進既有 AutoCAD 作業流程。`
- Current row: `繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點`
- Proposed row: `繪圖 → 框選施工範圍 → 程式整理長度與數量 → AI 助理查詢 → 人員確認`

Problem bridge becomes a concise calculation precondition rather than the full ACT03 conclusion:

- label: `計算前提`
- heading: `先確認這次要算哪個樓層、區域與物件。`
- body: `範圍與圖層先界定清楚，後面的長度、數量與查詢結果才有共同基準。`

`heroContent.sections` remains four sections but is compressed:

1. `客戶需求`
   - `完成施工範圍後，希望能直接取得每段長度、整張圖施工總長與指定元件數量。`
2. `提案目標`
   - `把驗算與結果查詢整合進既有 AutoCAD 作業；施工判斷與繪製仍由繪圖人員負責。`
3. `計算範圍`
   - `同一個 DWG 可能包含不同樓層、區域、版本與參考物件。系統必須先界定本次範圍與有效物件，再整理後續結果。`
   - highlight: `先確認這次算什麼，再計算長度與數量。`
4. `先看現況`
   - `下一章先完整走過目前施工圖流程，作為後面比較外掛方案的基準。`

Proposal outline retains the existing six-card structure and uses exactly:

1. `客戶需求` — `這次要處理哪些 AutoCAD 驗算工作。`
2. `目前流程` — `目前施工圖從判斷、繪製到加總怎麼完成。`
3. `流程差異` — `人工流程與外掛流程的作業差異與風險。`
4. `操作流程` — `外掛在 AutoCAD 裡預計怎麼操作。`
5. `計算與 AI` — `結果怎麼算，以及 AI 助理負責什麼。`
6. `專案總結` — `最後留下哪些可重複使用的作業規則。`

The outline heading `這份提案會說明六件事` remains unchanged.

### ACT02 — 目前施工圖怎麼完成

Only the wrapper title/lead/highlight strings change.

- title: `目前施工圖怎麼完成`
- lead: `先完整走過目前施工圖流程：判斷施工範圍、逐段繪製、查看長度、標註、加總、換算數量，再整理圖面。`
- lead highlights: `施工範圍`, `逐段繪製`, `加總`, `換算數量`

The 9 step labels/descriptions are unchanged.

### ACT03 — 人工流程與外掛流程，差在哪裡

- title: `人工流程與外掛流程，差在哪裡`
- lead: `這裡比較作業步驟與六類風險，不代表實測工時。人工流程需要逐段查看、記錄、加總與複核；外掛依標準圖層與計算範圍整理結果，再由人員確認。`

The D3 animation and six risk labels remain unchanged.

Proof boundary: no speed, ROI, percentage or measured-error claim is added.

### ACT04 — AI 輔助驗算流程怎麼操作

- title: `AI 輔助驗算流程怎麼操作`
- title highlight: `AI 輔助驗算`
- lead: `工程人員負責施工判斷與繪製；外掛以標準圖層與框選範圍整理計算內容，程式計算，AI 助理查詢與解釋結果。`
- lead highlights: `工程人員`, `標準圖層`, `框選範圍`, `程式計算`, `AI 助理`

The 12 steps, animation, selection gates and Concept Simulation disclaimer remain unchanged.

### ACT05 — 結果怎麼算、AI 助理能做什麼

- title: `結果怎麼算、AI 助理能做什麼`
- lead: `框選範圍與標準圖層先界定本次計算內容；C# 規則引擎負責篩選、分類、長度與數量，AI 助理只查詢、解釋與摘要已完成的結果。`

The deterministic-responsibility list, assistant-responsibility list, context map, traceability heading/prose and traceability fields remain unchanged. No responsibility ownership may move from Program to AI.

### ACT06 — 把工程經驗變成可重複的作業規則

- title: `把工程經驗變成可重複的作業規則`
- responsibility line remains: `人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

Compressed summary:

Paragraph 1:
`本專案把繪圖人員的施工範圍判斷、繪製、標註、長度計算與元件清點方式，整理成明確的圖面條件、判斷邏輯與計算規則，建立可重複使用的 AutoCAD 作業流程。`

Paragraph 2:
`繪圖人員負責工程判斷與最終確認；程式依標準圖層、框選範圍與公司規則計算，AI 助理使用既有結果協助查詢、解釋與摘要。`

Progression remains unchanged:

`經驗規則化 → 作業標準化 → 知識系統化`

Closing quote becomes exactly:

`讓工程經驗可以保存、沿用、執行與追溯。`

No NEXT STEP or CTA is added.

## Navigation copy

Navigation structure and brand remain unchanged. The six `navItems` labels become exactly:

- `提案概要`
- `目前流程`
- `流程差異`
- `操作流程`
- `計算與 AI`
- `專案總結`

Brand remains `AutoCAD 驗算提案`.

## Claim and responsibility boundary

Hard rules:

- Human: construction-position judgment, drawing, confirmation.
- Program / C# Rule Engine: deterministic filtering, geometry/object reading, classification, length/quantity calculation, ignored reasons and traceability.
- AI Assistant: query, explanation, summary and report-oriented organization of already-calculated results.
- Concept Simulation remains a proposal visualization, not proof of production integration.
- No measured time saving, error reduction, ROI, percentage, customer outcome or production-readiness claim may be introduced.

## Validation design

Implementation must follow RED → GREEN.

RED contract will assert the six recommended titles/copy and will fail against the untouched base.

GREEN verification must include:

- project offline tests;
- project rules verification;
- Svelte check;
- full Vitest suite;
- deterministic Copy Gate;
- static build;
- new copy-only contract;
- final compare against `e04f120...`.

Final compare is a hard scope gate. If it shows changes to animation/chart logic, `CadProcess.svelte`, CSS blocks, workflow step arrays/data or other non-copy behavior, the implementation is rejected as out of scope.

## Delivery boundary

This work stops on the isolated branch after fresh verification and user review. It does not authorize:

- merge into `feat/ux-hierarchy-v2`;
- merge into `main`;
- PR creation;
- deployment;
- deletion of the rejected standalone prototype branch;
- modification of PR #4.

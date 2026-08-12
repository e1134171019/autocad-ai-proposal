# Proposal Compression Comparison Prototype — Design

Date: 2026-08-12
Branch: `comparison/proposal-compression-prototype`
Source baseline: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`
Artifact classification: `comparison_prototype`
Formal project: `false`

## 1. Goal

Build an isolated, scrollable, interactive webpage prototype that tests the new proposal-compression decisions against the current AutoCAD proposal website without modifying the formal `src/` implementation.

The prototype is for narrative and information-density evaluation only. It is not a production website, not a deploy candidate, and not evidence that AutoCAD API / real DWG integration is complete.

## 2. Source facts that must be preserved

The prototype is based on the real current candidate website and preserves these facts:

- Six-act order remains `ACT01 → ACT02 → ACT03 → ACT04 → ACT05 → ACT06`.
- ACT02 remains a 9-step current workflow.
- ACT04 remains a 12-step proposed workflow.
- ACT04 remains `Concept Simulation｜提案操作示意` and must not imply completed AutoCAD API / real-DWG integration.
- Human engineering judgment remains in construction-position and scope decisions.
- Deterministic program/rule logic handles filtering, classification, length/quantity calculation, and ignored reasons.
- AI Assistant queries, explains, summarizes, and organizes already-calculated results; it does not replace deterministic calculation.
- Human confirmation remains part of the proposed workflow.
- ACT03 must not claim measured time savings; workflow comparison is not measured work time.

## 3. Approaches considered

### A. Content-first comparison prototype — selected

Create a standalone comparison page that mirrors the six-act structure, preserves the meaningful 9/12-step workflows, and changes only frontstage hierarchy, wrapper copy, section ownership, and the proposed ACT06 commercial next step.

Why selected:
- isolates messaging decisions from formal runtime code;
- lets interaction carry workflow detail instead of duplicating it in prose;
- makes before/after information density visible;
- lowest risk to the existing candidate branch.

### B. Directly edit formal Svelte components

Rejected for this phase because it would turn an exploratory messaging test into a formal project modification before the comparison is reviewed.

### C. Static screenshot-only mockup

Rejected because ACT02/ACT04 step navigation and the proposed information hierarchy need real scrolling and interaction to judge properly.

## 4. Prototype architecture

The prototype will be a standalone browser artifact under a dedicated prototype path, separate from `src/**`.

Recommended structure:

```text
prototypes/proposal-compression/
  index.html
  prototype.css
  prototype.js
```

No production imports, routes, stores, or Svelte components will be changed.

The prototype may re-express source content for comparison, but it must not invent new product capabilities, performance results, customer outcomes, or implementation status.

## 5. Global visual direction

Use the existing candidate site's engineering-proposal character rather than creating an unrelated visual language:

- light technical background;
- restrained blue accent for proposed-system / AI-related emphasis;
- strong typography and generous whitespace;
- thin borders and schematic panels rather than marketing cards;
- section weight expressed by layout size, not by giving every ACT the same visual stage.

The prototype should visually label itself as:

```text
COMPARISON PROTOTYPE
formal_project: false
```

This label remains visible in the page chrome so screenshots cannot be mistaken for the formal site.

## 6. ACT01 — compressed proposal orientation

### Dominant message

`AI 施工圖驗算提案`

### First-layer payload

1. Main title: `AI 施工圖驗算提案`.
2. Short lead: explain that construction scope, length organization, quantity checking, and result query are integrated into the existing AutoCAD workflow.
3. Current vs proposed workflow comparison.
4. Scope-control teaser only, not the full ACT03 conclusion.

### Remove / move from first layer

- Remove the four long background narrative blocks from the visible first layer.
- Do not fully explain mixed floors / areas / versions in ACT01.
- Do not pre-narrate the complete current workflow before ACT02.

### Handoff

End with a short bridge such as: `但真正的問題，不只是把數字加起來。`

## 7. ACT02 — current workflow evidence

### Dominant message

`目前施工圖怎麼完成`

### Interaction

Keep all 9 current workflow steps as an interactive stepper.

The prototype does not need to reproduce the full production CAD simulator. A simplified engineering viewport is acceptable if it preserves step meaning and visibly distinguishes:

- scope judgment;
- drawing;
- Properties inspection;
- dimension/manual recording;
- manual summing;
- manual quantity conversion;
- final adjustment.

### Compression rule

The wrapper lead stays short. Do not add a second prose list that repeats all 9 steps.

## 8. ACT03 — owner of the core problem insight

### Dominant message

`真正問題不是加總，而是哪些物件該算`

### First-layer payload

One short explanation should establish that a DWG can contain multiple floors, areas, versions, and reference objects; if scope is not defined first, later length and quantity results have no consistent basis.

### Evidence

Show a compact visual comparison plus the six existing risk categories.

### Claim boundary

Include a visible note that the comparison is about workflow/risk, not measured work time. Do not add speed, time-saving, ROI, or measured error-reduction claims.

## 9. ACT04 — proposed workflow concept simulation

### Dominant message

`AI 輔助驗算流程怎麼操作`

### Interaction

Keep all 12 proposed workflow steps in an interactive stepper.

The prototype must preserve the sequence-level responsibility meaning:

- standard layers established;
- human judges construction position;
- drawing remains human-led;
- selection boundary defines current calculation scope;
- deterministic result appears before AI query/explanation;
- human confirmation precedes output.

### Proof boundary

Keep `Concept Simulation｜提案操作示意` visibly attached to the section. State that this is an operation/interface concept, not completed AutoCAD API / real-DWG integration or formal product verification.

## 10. ACT05 — trust contract

### Dominant message

`結果怎麼算、AI 助理能做什麼`

### First-layer line

`程式依框選範圍、標準圖層與公司規則計算；AI 助理使用已完成的結果協助查詢、解釋與整理，最後由人員確認。`

### Evidence layout

Use three responsibility columns or bands:

- Human
- C# / Rule Engine
- AI Assistant

Then show a compact traceability chain:

`Object → Layer → Selection Boundary → Rule → Result → Ignored Reason`

Detailed lists may be expandable, but should not be fully duplicated in the section lead.

## 11. ACT06 — organizational conclusion + commercial exit

### Dominant message

`把工程經驗變成可重複的作業規則`

### Preserve

Keep the organizational progression:

`經驗規則化 → 作業標準化 → 知識系統化`

Keep the responsibility conclusion:

`人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

### New strategic block

Add a visually separate block labeled as the next proposal action, not current source fact:

`下一步｜用實際施工圖確認驗證範圍`

Suggested sequence:

`提供實際施工圖 → 確認圖層與計算規則 → 確認驗證範圍 → 比對現行流程與提案結果 → 確認正式開發內容`

This block is a proposal strategy addition and must not be presented as already completed work.

## 12. Navigation and interaction

- Sticky compact navigation with ACT01–ACT06 anchors.
- Smooth scroll.
- ACT02 and ACT04 each have previous/next step controls and direct numbered step selection.
- ACT05 may expose compact detail toggles for Human / Rule Engine / AI Assistant.
- No external APIs, authentication, analytics, uploads, or persistent state.

## 13. Responsive behavior

Desktop is the primary review target, but the prototype must remain readable on tablet/mobile:

- two-column panels collapse to one column;
- step controls remain usable;
- no essential content depends on hover;
- text and step labels remain readable without horizontal page scrolling.

## 14. Validation criteria

The prototype passes this comparison if:

1. A reader can identify the proposal category and operating scope from ACT01 without reading long background sections.
2. ACT02 still communicates all 9 current steps.
3. ACT03 clearly owns the `哪些物件該算` conclusion.
4. ACT04 still communicates all 12 proposed steps and visibly remains a concept simulation.
5. ACT05 makes Human / Program / AI responsibility boundaries immediately understandable.
6. ACT06 preserves the organizational conclusion and clearly separates the new real-drawing validation CTA.
7. No unsupported time/ROI/error-reduction/production-integration claim is introduced.
8. Formal `src/**` remains unchanged.

## 15. Explicit non-goals

This prototype will not:

- replace the formal Svelte site;
- modify `src/**`;
- change `cadSimulator.js` or `CadProcess.svelte`;
- merge PR #4;
- merge to `main`;
- deploy or publish;
- claim production AutoCAD integration;
- reconstruct the historical 8-step / 11-step baseline.

## 16. Handoff after prototype review

After the user reviews the interactive comparison prototype, the next decision is one of:

- reject the prototype and keep the current site;
- revise the prototype;
- approve selected messaging/layout changes for a separate formal implementation plan against `feat/ux-hierarchy-v2`.

Prototype approval does not itself authorize formal `src/` modification or deployment.

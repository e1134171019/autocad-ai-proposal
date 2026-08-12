# UX Hierarchy v3 — Responsibility, Trust, and Mobile Clarity

Date: 2026-08-12
Status: User-approved direction; implementation pending written-spec review gate
Base branch: `feat/ux-hierarchy-v2`
Formal project: true (feature-branch modification only)
Production `main` modification: false
Merge / deploy authorization: false

## 1. Why v3 exists

UX Hierarchy v2 already improves the opening proposition, Before/After flow, stale time-performance copy, and narrative color competition. Independent Figma and Hybrid exploration then converged on five remaining gaps:

1. The site still needs to state earlier that the hard problem is deciding which objects belong to the current calculation.
2. ACT 05 still presents deterministic classification/calculation work as AI decision logic.
3. The CAD simulator needs an explicit proposal-simulation boundary.
4. Mobile navigation currently loses semantic labels.
5. Traceability needs to become a visible trust mechanism, not only supporting copy.

This v3 change extends the existing Draft PR; it does not replace the existing Svelte architecture or rebuild the site from scratch.

## 2. Approved scope

### A. Problem bridge near the opening

After the first-screen Before/After comparison, expose one concise client-readable statement before deeper background:

`真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。`

Supporting explanation may mention floor, area, version, and reference/temp objects, but must stay short. Detailed layer names and object rules remain later.

Goal: a client should understand within the first minute that calculation correctness depends on scope definition, not arithmetic difficulty.

### B. ACT 05 responsibility separation

ACT 05 must stop using `AI DECISION LOGIC` as the conceptual owner of exact CAD results.

Target mental model:

`Selection Boundary + Standard Layers + Object Rules -> C# / Rule Engine -> Length / Quantity / Ignored Reason`

Then:

`Verified Results -> LLM / AI Assistant -> Query / Explain / Summarize / Record`

Rules:

- Exact length, quantity, layer filtering, object classification, and calculation are deterministic responsibilities.
- AI/LLM does not overwrite or invent calculated values.
- AI/LLM may query, explain, summarize, locate, and record already-grounded results.
- Existing data contracts should be preserved where possible; add new responsibility data instead of broad destructive renames unless tests prove a rename is safe.

Recommended ACT 05 client title:

`計算依據與結果確認`

Recommended eyebrow:

`ACT 05 / CALCULATION & RESULT TRACEABILITY`

### C. Concept Simulation boundary

ACT 04 keeps the existing CAD simulator and interaction work.

Add a visible but secondary boundary label before the simulator:

`Concept Simulation｜提案操作示意`

Supporting copy must state that the simulator explains the intended workflow and interface concept; it must not imply that AutoCAD API / real DWG integration is already completed or production-validated.

This is a copy / information-boundary change only. Do not change simulator calculation, selection, animation, layer names, dimensions, quantities, or command behavior.

### D. Mobile navigation

Desktop navigation may remain a fixed six-section navigation, but client-facing labels should be concrete:

1. 提案概要
2. 目前流程
3. 流程差異
4. 操作示意
5. 計算依據
6. 專案總結

At `<= 768px`, do not collapse navigation into bare `01–06` numbers.

Use a compact mobile header with:

- clear site label (`AutoCAD 驗算提案` or equivalent),
- accessible menu button,
- expandable list containing semantic section labels,
- active-section indication,
- keyboard-focusable controls,
- menu closes after selecting a destination.

No new UI library or dependency is allowed for this change.

### E. Traceability as a visible trust section

Within ACT 05, show the minimum evidence chain a client can understand:

- Object
- Layer
- Selection Boundary
- Rule
- Result
- Ignored Reason when applicable

The page must explain that a result can be traced back to the drawing object and rule context.

Do not fabricate real customer logs, timestamps, performance gains, acceptance rates, or production evidence. Static proposal examples must remain clearly illustrative.

## 3. Information hierarchy after v3

The six Svelte ACT components remain as implementation anchors, but the client narrative becomes:

1. `這是在做什麼` — AutoCAD length / quantity verification proposition.
2. `現在怎麼做` — current manual workflow.
3. `真正問題在哪` — workflow difference and why scope errors happen.
4. `外掛怎麼操作` — concept simulation of the proposed workflow.
5. `為什麼結果可以相信` — deterministic rule boundary + traceability + AI assistant role.
6. `最後留下什麼` — summary and reusable engineering process.

The ACT numbering is implementation/navigation structure, not the primary message itself.

## 4. Visual rules

Keep UX Hierarchy v2 rules:

- Narrative area remains warm-light / neutral with one main structural accent.
- Do not restore blue/green/orange taxonomy coloring for AI/manual/standard prose.
- CAD ByLayer and operational state colors remain unchanged.
- Concept Simulation label should be restrained metadata, not another hero.
- Rule Engine vs AI Assistant separation is communicated first by structure and wording, not by assigning them competing bright colors.

## 5. Mobile behavior

Mobile is a distinct composition, not a desktop shrink.

Required:

- H1 remains readable without horizontal scrolling.
- Workflow comparison stacks vertically when needed.
- Semantic navigation labels remain accessible through the menu.
- CAD simulator may retain its existing responsive strategy; v3 does not rewrite simulator rendering.
- ACT 05 responsibility / traceability content stacks in a logical order: deterministic calculation first, AI assistant second, evidence chain last.

## 6. Data and component strategy

Prefer minimal, testable changes to existing components:

- `Act01Hero.svelte`: add concise problem bridge after Before/After.
- `Nav.svelte`: semantic mobile menu and updated labels.
- `Act04Solution.svelte`: Concept Simulation boundary copy.
- `Act05Intelligence.svelte`: rewrite responsibility model and visible traceability presentation.
- `siteContent.js`: neutralize AI-owned deterministic descriptions and add explicit deterministic / assistant responsibility data as needed.
- Existing `contextMap.js` may continue rendering if its labels are updated to neutral system/rule terminology; do not rebuild the chart unless required to remove a false AI ownership claim.

Avoid unrelated refactoring.

## 7. TDD contract

Before production changes, extend the UX contract with failing assertions for at least:

1. Opening contains the problem-bridge sentence.
2. Mobile nav source contains semantic labels and an accessible toggle rather than CSS that hides all label text.
3. ACT 04 contains `Concept Simulation` and `提案操作示意`.
4. ACT 05 no longer contains `AI DECISION LOGIC`.
5. ACT 05 does not claim AI gets/classifies/converts exact values as its calculation responsibility.
6. Deterministic responsibilities explicitly include length / quantity / filtering / classification or equivalent rule-engine wording.
7. AI assistant responsibilities explicitly remain query / explanation / summary / record roles.
8. Traceability presentation includes Object, Layer, Selection Boundary, Rule, and Result.
9. Existing CAD ByLayer/state-color contracts continue to pass.
10. Existing calculation, selection, layer, quantity, and simulator interaction contracts continue to pass.

Follow RED -> GREEN. A RED run should fail only on new v3 expectations while existing unrelated contracts remain green.

## 8. Verification

Before presenting the new preview:

- `npm run test:offline`
- `npm run verify:rules`
- `npm run check`
- `npm test`
- `npm run audit:copy`
- `npm run build`

Also verify:

- no change to CAD calculation values,
- no change to selection logic,
- no change to standard layer names,
- no change to simulator animation behavior,
- no new dependencies,
- no unverified time/efficiency claims,
- mobile navigation is semantically readable,
- the rendered ACT 05 clearly distinguishes Rule Engine from AI Assistant.

## 9. Preview / integration boundary

After GREEN verification, generate a branch-only review artifact / screenshot using an existing safe preview mechanism.

Do not:

- merge PR #2,
- mark PR Ready,
- deploy GitHub Pages production,
- modify `main`,
- delete feature branches.

Those actions require a separate user approval after preview review.

## 10. Out of scope

- Real AutoCAD API / DWG integration.
- C# plugin implementation.
- Ollama runtime integration.
- Rebuilding the D3 CAD simulator.
- Dependency/security cleanup.
- README version drift.
- AGENTS / Drive governance drift resolution.
- Metadata/font work.
- Global section-height redesign unless a rendered v3 review demonstrates that it is still necessary.

## 11. Success criterion

A first-time client should be able to state, after a short read:

`工程人員決定施工位置；框選與標準圖層界定這次計算；程式依規則算長度與數量；AI 只協助查詢與解釋；每個結果可以追溯到圖面與規則。`

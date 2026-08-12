# UX Hierarchy v4 — Visual System / Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reweight the existing proposal so the page reads as Hero → Core Problem → Explanation → Product Simulation → Trust / Traceability → Short Conclusion, using one narrative accent and preserving CAD engineering colors and behavior.

**Architecture:** Keep the existing Svelte 5 component structure and v3 content contracts. Add semantic section-weight classes at the global layout layer, then adjust each ACT only where its role requires different spacing, typography, grouping, or mobile behavior. CAD calculation/selection/layer logic remains untouched; D3 context copy may be corrected only to preserve the already-approved Rule Engine / AI Assistant responsibility boundary.

**Tech Stack:** Svelte 5, Vite, D3, CSS custom properties, Vitest, existing project Quality Gate.

## Global Constraints

- Work only on `feat/ux-hierarchy-v2`; `main` is not modified.
- Do not merge, deploy production, delete branches, or publish.
- Preserve existing CAD calculation, selection, layer filtering, quantity, command, animation, and ByLayer semantics.
- Preserve the v3 Rule Engine / AI Assistant responsibility boundary and Concept Simulation disclosure.
- Ordinary proposal prose uses neutral colors plus the existing primary blue; CAD semantic/status colors remain available.
- No gradients, `box-shadow`, or `backdrop-filter`.
- No unverified timing, efficiency, or productivity claims.

## Completed tasks

- [x] Task 1 — Visual hierarchy RED contracts
- [x] Task 2 — Global section-weight and narrative color system
- [x] Task 3 — Reweight ACT01–ACT04
- [x] Task 4 — Recompose ACT05 trust hierarchy
- [x] Task 5 — Compress ACT06 into a short conclusion
- [x] Task 6 — Full regression, branch preview, temporary workflow cleanup, and cleaned-head verification

## Implementation results

### Unequal section hierarchy

- Generic `.section` no longer requires `min-height: 100vh`.
- Added semantic weights: `section-weight-xl`, `section-weight-l`, `section-weight-m`, `section-weight-s`.
- Narrative reading width reduced to 1240px; CAD wide-stage container remains 1680px.
- Ordinary section heading ceiling reduced while ACT01 remains the dominant page-level hero.
- Mobile section spacing is reduced independently from desktop.

### Section roles

- ACT01 — XL: proposition, Before/After, core scope problem; six-section outline demoted.
- ACT02 — M: current workflow explanation.
- ACT03 — M: comparison; decorative danger-red risk numbering removed.
- ACT04 — XL: Concept Simulation / CAD product demonstration climax.
- ACT05 — L: Rule Engine primary, AI Assistant supporting, calculation context secondary, traceability conclusion.
- ACT06 — S: compact conclusion.

### Color responsibilities

- Existing proposal blue remains the ordinary narrative accent.
- AI / standard / manual keyword colors remain compatibility tokens but are not used to classify ordinary prose.
- Technical teal remains only for technical diagrams/context rather than a second narrative brand accent.
- CAD ByLayer and interaction/status colors remain intact.

### ACT05 mobile/trust hierarchy

- Mobile/tablet order: Rule Engine → AI Assistant → Calculation Context → Traceability.
- Context chart min-height: 420px desktop, 260px mobile.
- Traceability rows are compact on mobile.
- Context map wording now uses `DRAWING → CONTEXT → RULE ENGINE → RESULT`; old `AI AUTOMATION` wording is removed without changing D3 data/interaction behavior.

### ACT06 responsibility conclusion

`人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

## TDD evidence

RED run: Quality Gate `31556254723`.

- Five new v4 assertions failed as intended.
- All 108 pre-existing tests remained green.
- Offline contracts, project rules, and Svelte check passed before the new Vitest failures.

During GREEN, one ACT05 order assertion was found to target the eyebrow word `TRACEABILITY` rather than the actual traceability section; the test was corrected to identify `<section class="traceability">` without weakening the production requirement. An unused ACT06 selector warning was also removed.

## Preview evidence

Preview Artifact v4 run `31556590902` succeeded.

- Artifact: `ux-hierarchy-v4-build`
- Artifact id: `9126202048`
- Digest: `sha256:f052f7e072140ffe78edaa00ee69355c9dc6b59e15dbef12c3fc4b1053aad62b`
- Build head: `6168bd0e50a806be93f0d26482e13b765c9ed0ab`
- The temporary preview workflow was deleted before final review.
- Production GitHub Pages was not deployed or repointed.

The managed Chromium available in the execution environment blocks browsed URLs, including localhost/data/file. Screenshot evidence was therefore rendered from the actual build artifact's SSR markup and compiled CSS using a static renderer. JavaScript/D3 `onMount` content is not represented in those screenshots; no mock runtime data was invented.

## Final cleaned-head verification

Cleaned feature head before this documentation-only record: `8033ed138baafc4bccaf3bb7a7b59adb8a7f3629`.

Quality Gate `31557300585` passed:

- `npm run test:offline` ✅
- `npm run verify:rules` ✅
- `npm run check` ✅ — 0 errors / 0 warnings
- `npm test` ✅ — 22 files / 113 tests
- `npm run audit:copy` ✅ — 0 findings
- `npm run build` ✅ — adapter-static wrote `build`

Existing dependency audit still reports 4 vulnerabilities (3 low, 1 high). Dependency remediation remains outside the approved UX scope.

## Scope still excluded

No merge to `main`, no production deployment, no real AutoCAD API/DWG integration, no C# plugin implementation, no Ollama runtime integration, no CAD simulator behavior rewrite, no dependency/security remediation, no README/version cleanup, and no AGENTS/Drive governance reconciliation.

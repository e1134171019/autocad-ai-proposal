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
- [x] Visual hierarchy RED contracts
- [x] Global section-weight and narrative color system
- [x] Reweight ACT01–ACT04
- [x] Recompose ACT05 trust hierarchy
- [x] Compress ACT06 into a short conclusion
- [x] Full regression, branch preview, temporary workflow cleanup, and final-head verification

## Implemented hierarchy
- ACT01 — XL: proposition, Before/After, core scope problem; six-section outline demoted.
- ACT02 — M: current workflow explanation.
- ACT03 — M: workflow comparison; decorative danger-red numbering removed.
- ACT04 — XL: Concept Simulation / CAD demonstration climax.
- ACT05 — L: Rule Engine primary, AI Assistant supporting, Calculation Context secondary, Traceability conclusion.
- ACT06 — S: compact conclusion.

Generic `.section` no longer requires `min-height: 100vh`. Narrative reading width is 1240px while the CAD wide-stage container remains 1680px. The proposal blue is the ordinary narrative accent; technical/CAD colors remain scoped to actual engineering and state meaning.

## ACT05 mobile/trust hierarchy
- Rule Engine → AI Assistant → Calculation Context → Traceability.
- Context chart min-height: 420px desktop, 260px mobile.
- Traceability rows compact on mobile.
- Context map wording: `DRAWING → CONTEXT → RULE ENGINE → RESULT`; old `AI AUTOMATION` wording removed without changing D3 data or interaction behavior.

## ACT06 responsibility conclusion
`人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

## TDD evidence
RED Quality Gate `31556254723` produced five intended v4 failures while all 108 pre-existing tests stayed green. Offline contracts, project rules, and Svelte check also passed before the new assertions.

## Preview evidence
Preview Artifact v4 run `31556590902` succeeded.
- Artifact: `ux-hierarchy-v4-build`
- Artifact id: `9126202048`
- Digest: `sha256:f052f7e072140ffe78edaa00ee69355c9dc6b59e15dbef12c3fc4b1053aad62b`
- Build head: `6168bd0e50a806be93f0d26482e13b765c9ed0ab`
- Temporary preview workflow removed before final review.
- Production GitHub Pages not deployed or repointed.

Managed Chromium blocks browsed URLs in this execution environment. Visual screenshots were therefore rendered from the actual build artifact's SSR markup and compiled CSS using a static renderer. JavaScript/D3 `onMount` output is absent; no mock runtime data was invented.

## Verified quality state
The v4 code state has repeatedly passed the repository Quality Gate. The final-head CI immediately before this frozen execution note was Quality Gate `31557565709`, with all workflow steps successful. The verified suite includes offline contracts, project-rule verification, Svelte check, Vitest, Copy Gate audit, and static build. The immediately preceding identical-code run recorded 22 files / 113 tests, 0 Svelte errors/warnings, and 0 Copy Gate findings.

Existing dependency audit reports 4 vulnerabilities (3 low, 1 high); remediation is outside this UX scope.

## Scope still excluded
No merge to `main`, no production deployment, no real AutoCAD API/DWG integration, no C# plugin implementation, no Ollama runtime integration, no CAD simulator behavior rewrite, no dependency/security remediation, no README/version cleanup, and no AGENTS/Drive governance reconciliation.

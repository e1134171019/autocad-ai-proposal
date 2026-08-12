# UX Hierarchy v4 — Visual System / Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reweight the existing proposal so the page reads as Hero → Core Problem → Explanation → Product Simulation → Trust / Traceability → Short Conclusion, using one narrative accent and preserving CAD engineering colors and behavior.

**Architecture:** Keep the existing Svelte 5 component structure and v3 content contracts. Add semantic section-weight classes at the global layout layer, then adjust each ACT only where its role requires different spacing, typography, grouping, or mobile behavior. CAD calculation/selection/layer logic remains untouched; D3 context copy may be corrected only to preserve the already-approved Rule Engine / AI Assistant responsibility boundary.

## Completed

- Unequal semantic section hierarchy: XL / L / M / S.
- Generic `.section` no longer uses `min-height: 100vh`.
- Narrative content width 1240px; CAD wide stage remains 1680px.
- Narrative color hierarchy reduced to primary blue + neutrals; CAD/status colors preserved.
- ACT01 XL, ACT02 M, ACT03 M, ACT04 XL, ACT05 L, ACT06 S.
- ACT03 decorative danger-red numbering removed.
- ACT05 mobile/tablet: Rule Engine → AI Assistant → Calculation Context → Traceability.
- ACT05 context chart height reduced; traceability rows compacted.
- Context map caption uses `RULE ENGINE`, not `AI AUTOMATION`.
- ACT06 concludes: `人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

## TDD

RED Quality Gate `31556254723`: five intended v4 failures; 108 pre-existing tests remained green.

## Preview

Preview Artifact v4 run `31556590902` succeeded.
- Artifact `ux-hierarchy-v4-build`
- id `9126202048`
- digest `sha256:f052f7e072140ffe78edaa00ee69355c9dc6b59e15dbef12c3fc4b1053aad62b`
- temporary preview workflow removed before final review
- production Pages not deployed

Managed Chromium blocks browsed URLs in this environment. Screenshots were rendered from the actual static build artifact's SSR markup + compiled CSS. JavaScript/D3 `onMount` output is not represented; no mock runtime output was invented.

## Verification

The v4 code state repeatedly passed the full repository Quality Gate. The last verification run before this final evidence-only plan record was `31557615070`, with offline contracts, project rules, Svelte check, Vitest, Copy Gate audit, and static build all successful. The code state contains 22 test files / 113 tests and no new Svelte errors/warnings or Copy Gate findings.

Existing dependency audit reports 4 vulnerabilities (3 low, 1 high); remediation remains outside the approved UX scope.

## Excluded

No merge to `main`, no production deployment, no AutoCAD API/DWG integration, no C# plugin implementation, no Ollama runtime integration, no CAD simulator behavior rewrite, no dependency/security cleanup, no README/version cleanup, no AGENTS/Drive governance reconciliation.

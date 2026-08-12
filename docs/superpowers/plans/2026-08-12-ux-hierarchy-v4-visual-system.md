# UX Hierarchy v4 — Visual System / Layout Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

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
- Final validation: `npm run test:offline`, `npm run verify:rules`, `npm run check`, `npm test`, `npm run audit:copy`, `npm run build`.

---

### Task 1: Visual hierarchy RED contracts

**Files:**
- Modify: `tests/uxHierarchyContract.test.js`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: current source text from `src/app.css`, ACT components, and `src/lib/charts/contextMap.js`.
- Produces: blocking contracts for unequal section weights, neutral narrative numbering, compact summary, mobile ACT05 sizing, and responsibility-safe context-map wording.

- [ ] **Step 1: Add failing v4 assertions**

Add tests that require:

```js
expect(appCss).not.toMatch(/\.section\s*\{[^}]*min-height:\s*100vh/s);
expect(appCss).toContain('.section-weight-xl');
expect(appCss).toContain('.section-weight-l');
expect(appCss).toContain('.section-weight-m');
expect(appCss).toContain('.section-weight-s');
expect(act03).not.toMatch(/li span\s*\{[^}]*var\(--danger\)/s);
expect(act04).toContain('section-weight-xl');
expect(act05).toContain('section-weight-l');
expect(act05).toContain('@media (max-width: 768px)');
expect(act05).toMatch(/\.chart\s*\{[^}]*min-height:/s);
expect(act06).toContain('section-weight-s');
expect(contextMap).not.toContain('AI AUTOMATION');
```

Also assert ACT02/ACT03 use `section-weight-m` and ordinary narrative components do not assign `color: var(--keyword-ai|standard|manual)`.

- [ ] **Step 2: Run RED verification**

Run through the existing PR Quality Gate after committing the test-only change.

Expected: only the new v4 assertions fail; the existing 108 tests remain green.

- [ ] **Step 3: Commit RED contract**

Commit message:

```text
test: define UX hierarchy v4 visual contracts
```

---

### Task 2: Global section-weight and narrative color system

**Files:**
- Modify: `src/app.css`
- Modify: `src/lib/tokens.css`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: existing spacing, color, and breakpoint tokens.
- Produces: `.section-weight-xl`, `.section-weight-l`, `.section-weight-m`, `.section-weight-s` semantic layout classes and reduced ordinary section-title scale.

- [ ] **Step 1: Remove equal full-screen section rule**

Replace generic `min-height: 100vh` with ordinary content flow and anchor spacing:

```css
.section {
  position: relative;
  min-height: auto;
  scroll-margin-top: var(--nav-height);
  padding: var(--section-space-m) var(--content-side-padding);
  border-top: var(--line-thin) solid var(--border);
  background: var(--background);
}
```

- [ ] **Step 2: Add semantic section weights**

Add tokens:

```css
--section-space-xl: 96px;
--section-space-l: 80px;
--section-space-m: 64px;
--section-space-s: 48px;
```

Add global classes:

```css
.section-weight-xl { padding-block: var(--section-space-xl); }
.section-weight-l { padding-block: var(--section-space-l); }
.section-weight-m { padding-block: var(--section-space-m); }
.section-weight-s { padding-block: var(--section-space-s); }
```

On mobile, reduce them to 64 / 56 / 48 / 40px respectively.

- [ ] **Step 3: Reduce ordinary heading scale**

Change ordinary `.section-title` from a 4.4rem ceiling to approximately 3.35rem while leaving ACT01 `h1` component styling authoritative.

- [ ] **Step 4: Keep one narrative accent**

Do not remove CAD or status tokens. Keep `--keyword-ai`, `--keyword-standard`, and `--keyword-manual` only as compatibility tokens; no narrative component may use them as color values. Keep `--technical` only for technical diagrams/status, not general prose.

- [ ] **Step 5: Run focused tests and commit**

Expected: section-weight/global-color assertions pass; component-specific RED assertions remain.

Commit message:

```text
feat: add unequal section weight system
```

---

### Task 3: Reweight ACT01–ACT04

**Files:**
- Modify: `src/lib/components/Act01Hero.svelte`
- Modify: `src/lib/components/Act02Flow.svelte`
- Modify: `src/lib/components/Act03Problem.svelte`
- Modify: `src/lib/components/Act04Solution.svelte`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: section-weight classes from Task 2.
- Produces: Hero XL, workflow M, comparison M, Concept Simulation XL.

- [ ] **Step 1: Apply explicit section weights**

Use:

```svelte
<section id="act-01" class="section section-weight-xl hero">
<section id="act-02" class="section section-weight-m flow">
<section id="act-03" class="section section-weight-m problem">
<section id="act-04" class="section section-weight-xl solution">
```

- [ ] **Step 2: Tighten ACT01 secondary material**

Keep hero proposition, Before/After, and core problem dominant. Reduce the vertical gap before the narrative and proposal outline; reduce outline card minimum height/padding so the six-part outline reads as secondary navigation rather than six equal calls to action.

- [ ] **Step 3: Neutralize ACT03 decorative danger color**

Change generic risk index numbering from `var(--danger)` to a neutral metadata color such as `var(--text-muted)`. Keep danger red available for real warning/error states elsewhere.

- [ ] **Step 4: Give ACT04 the large stage without adding marketing chrome**

Keep the existing Concept Simulation disclosure. Tighten disclosure copy spacing, then allow the existing wide CAD simulator to provide the visual climax. Do not add shadows, gradients, or new simulator behavior.

- [ ] **Step 5: Run focused tests and commit**

Commit message:

```text
feat: reweight proposal and simulation sections
```

---

### Task 4: Recompose ACT05 trust hierarchy

**Files:**
- Modify: `src/lib/components/Act05Intelligence.svelte`
- Modify: `src/lib/charts/contextMap.js`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: v3 `deterministicResponsibilities`, `assistantResponsibilities`, `traceabilityFields` and D3 context layers.
- Produces: L-weight trust section where Rule Engine is primary, AI Assistant is supporting, traceability closes the section, and mobile reaches useful content sooner.

- [ ] **Step 1: Apply L section weight and reduce desktop chart dominance**

Use `section-weight-l`. Reduce `.intelligence-layout` gap and chart visual height from 520px to approximately 420px while preserving the SVG viewBox behavior.

- [ ] **Step 2: Make Rule Engine primary and AI Assistant secondary**

Keep both responsibility blocks but reduce AI Assistant surface emphasis: neutral border/surface, slightly tighter padding, no second-accent color. Rule Engine remains open primary content rather than an equal card.

- [ ] **Step 3: Improve mobile order and panel height**

At `max-width: 768px`, set the chart container to approximately 260px minimum height and keep content stacked as Rule Engine → AI Assistant → Traceability. Do not hide the chart, but prevent it from consuming most of the first mobile viewport.

- [ ] **Step 4: Make traceability a compact evidence chain**

Keep six fields and two-column desktop layout. Reduce evidence-item minimum height/padding; on mobile use single-column rows with compact spacing rather than six large cards.

- [ ] **Step 5: Remove obsolete AI-automation wording from context map**

Change D3 accessibility/caption text from AI-owned calculation language to the approved responsibility model, for example:

```js
.attr('aria-label', '圖面計算上下文五層結構')
...
.text('DRAWING → CONTEXT → RULE ENGINE → RESULT');
```

Do not change the D3 data or interaction behavior.

- [ ] **Step 6: Run focused tests and commit**

Commit message:

```text
feat: clarify calculation trust hierarchy
```

---

### Task 5: Compress ACT06 into a short conclusion

**Files:**
- Modify: `src/lib/components/Act06Summary.svelte`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: v3 responsibility boundary.
- Produces: S-weight closing section with no new CTA and no claim that AI performs deterministic calculation.

- [ ] **Step 1: Apply S section weight**

Use:

```svelte
<section id="act-06" class="section section-weight-s summary">
```

- [ ] **Step 2: Tighten copy and spacing**

Reduce `summary-copy`, progression, and blockquote margins from XL-scale spacing. Keep the conclusion concise and visibly lighter than ACT04/ACT05.

- [ ] **Step 3: Preserve responsibility boundary in final copy**

Replace any summary sentence that implies AI performs exact length/quantity calculation with the approved conclusion:

```text
人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。
```

- [ ] **Step 4: Run focused tests and commit**

Commit message:

```text
feat: compress proposal conclusion
```

---

### Task 6: Full regression, branch preview, cleanup

**Files:**
- Temporary create/delete if needed: `.github/workflows/preview-artifact-v4.yml`
- No production deployment files retained.

**Interfaces:**
- Consumes: complete v4 branch.
- Produces: fresh CI evidence and Desktop/Mobile screenshots from the actual static build.

- [ ] **Step 1: Run full Quality Gate**

Required commands:

```text
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected: all pass, with no new Svelte errors/warnings and no Copy Gate findings.

- [ ] **Step 2: Build branch-only preview artifact**

If required, add a temporary GitHub Actions workflow that performs `npm ci`, `npm run build`, and uploads `build/` only. It must not deploy Pages.

- [ ] **Step 3: Render Desktop and Mobile evidence**

Capture at minimum:

- Desktop first screen and representative full-page hierarchy;
- Mobile first screen;
- Mobile ACT04/ACT05 transition;
- Mobile ACT05 trust/traceability;
- Mobile short ACT06 conclusion.

- [ ] **Step 4: Remove temporary preview workflow**

Delete one-off preview workflow before final review diff.

- [ ] **Step 5: Run fresh cleaned-head Quality Gate**

Do not claim completion until this run passes on the cleaned head.

- [ ] **Step 6: Update Draft PR #2 body**

Record v4 scope, RED/GREEN evidence, preview artifact evidence, and the fact that `main` / production remain untouched.

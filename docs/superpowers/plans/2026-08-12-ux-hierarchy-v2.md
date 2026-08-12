# UX Hierarchy v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the proposal understandable from the first screen by establishing one clear visual hierarchy, removing competing prose colors, and aligning ACT 01 with the current workflow-comparison claims.

**Architecture:** Keep the existing Svelte component structure and content data model. Rework ACT 01 presentation and its outline copy, neutralize prose-only `ai` / `standard` / `manual` highlight colors in `CadProcess.svelte`, and protect CAD ByLayer/state tokens with regression tests. No simulator calculation or animation logic changes.

**Tech Stack:** Svelte 5, Vite, Vitest, CSS custom properties, GitHub Actions Quality Gate.

## Global Constraints

- Work only on `feat/ux-hierarchy-v2`; do not merge to `main` during implementation.
- Preserve CAD calculation rules, selection logic, layer names, measured values, quantities, and animation code.
- Preserve CAD ByLayer/state colors.
- Ordinary narrative prose must not assign separate blue/green/orange colors to AI/standard/manual terms.
- ACT 03 must remain a workflow comparison and must not claim measured time savings.
- Follow RED → GREEN TDD for behavior changes.
- Final verification: `npm run test:offline`, `npm run verify:rules`, `npm run check`, `npm test`, `npm run audit:copy`, `npm run build`.

---

### Task 1: Lock client-comprehension behavior with RED tests

**Files:**
- Create: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: `src/lib/components/Act01Hero.svelte`, `src/lib/components/CadProcess.svelte`, `src/lib/tokens.css` as source text.
- Produces: regression contract for first-screen proposition, Before/After order, stale ACT03 copy removal, neutral narrative highlights, and preserved CAD colors.

- [ ] **Step 1: Write the failing test**

Add tests that require:

```js
expect(hero.indexOf('AutoCAD 施工圖長度與數量自動驗算'))
  .toBeLessThan(hero.indexOf('這份提案會說明'));
expect(hero).toContain('繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點');
expect(hero).toContain('繪圖 → 框選施工範圍 → 系統整理長度與數量 → 人員確認');
expect(hero).not.toMatch(/工時差異|AI 工具處理更快|時間更穩定/);
expect(process).not.toMatch(/\.keyword-ai\s*\{[^}]*color:/s);
expect(process).not.toMatch(/\.keyword-standard\s*\{[^}]*color:/s);
expect(process).not.toMatch(/\.keyword-manual\s*\{[^}]*color:/s);
expect(tokens).toContain('--cad-layer-exterior:');
expect(tokens).toContain('--cad-layer-shaft:');
expect(tokens).toContain('--cad-layer-dimension:');
expect(tokens).toContain('--cad-selection:');
```

- [ ] **Step 2: Run Quality Gate and verify RED**

Push the test-only commit and inspect the feature-branch `Quality Gate` run.

Expected: FAIL in `tests/uxHierarchyContract.test.js` because the current ACT 01 still renders the six-section outline before the explanation and `CadProcess.svelte` still assigns separate colors.

- [ ] **Step 3: Commit RED test**

Commit message:

```text
test: define UX hierarchy client comprehension contract
```

---

### Task 2: Rebuild ACT 01 first-screen hierarchy

**Files:**
- Modify: `src/lib/components/Act01Hero.svelte`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: existing `heroContent.sections` for background context.
- Produces: first-screen proposition and compact current/proposed workflow before secondary navigation.

- [ ] **Step 1: Implement the minimum first-screen structure**

Render, in this order:

```text
AutoCAD 施工圖長度與數量自動驗算
保留繪圖人員的工程判斷，把逐段查看長度、人工加總與數量清點交給外掛處理。

現在
繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點

導入外掛
繪圖 → 框選施工範圍 → 系統整理長度與數量 → 人員確認
```

Then render the existing background narrative and finally the six-section outline as secondary navigation.

- [ ] **Step 2: Update outline semantics**

Replace stale ACT 03 outline copy with workflow-comparison language. Do not use `工時差異`, `AI 工具處理更快`, or `時間更穩定`.

- [ ] **Step 3: Reduce visual competition**

Use one dominant H1, neutral supporting text, a restrained two-row Before/After comparison, and smaller secondary outline cards. ACT metadata remains secondary.

- [ ] **Step 4: Run targeted tests**

Run `npm test -- tests/uxHierarchyContract.test.js tests/contentNarrativeContract.test.js tests/copyCleanupContract.test.js`.

Expected: first-screen/ACT03 assertions pass; color assertions may remain red until Task 3.

- [ ] **Step 5: Commit**

Commit message:

```text
feat: clarify proposal opening hierarchy
```

---

### Task 3: Neutralize prose taxonomy colors without touching CAD semantics

**Files:**
- Modify: `src/lib/components/CadProcess.svelte`
- Test: `tests/uxHierarchyContract.test.js`
- Existing regression: `tests/cadColorContract.test.js`

**Interfaces:**
- Consumes: existing `toneClass()` and highlight data model.
- Produces: neutral bold prose emphasis while keeping tone metadata and all CAD color tokens intact.

- [ ] **Step 1: Change only narrative highlight CSS**

Keep the existing classes and mappings, but make `.keyword-ai`, `.keyword-standard`, and `.keyword-manual` use neutral foreground emphasis rather than three separate semantic text colors. Do not modify `cadSimulator.js` or CAD token values.

- [ ] **Step 2: Run targeted tests**

Run:

```text
npm test -- tests/uxHierarchyContract.test.js tests/cadColorContract.test.js tests/cadDrawingContract.test.js
```

Expected: PASS.

- [ ] **Step 3: Commit**

Commit message:

```text
style: reduce narrative highlight competition
```

---

### Task 4: Full regression and Copy Gate verification

**Files:**
- Modify only if a verified regression requires a minimal correction.

- [ ] **Step 1: Run repository quality gates**

```text
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected: all commands pass; Copy Gate reports `0 finding(s)`.

- [ ] **Step 2: Review diff against scope**

Confirm no changes to:

```text
src/lib/charts/cadSimulator.js
selection logic
CAD layer names
measured values / quantities
package dependencies
```

- [ ] **Step 3: Commit any minimal verification fix only if required**

Use a narrowly-scoped commit message describing the verified regression.

---

### Task 5: Produce a reviewable preview without merging main

**Files:**
- No production change unless an existing preview/deployment mechanism requires a branch-safe configuration already allowed by project rules.

- [ ] **Step 1: Open a draft PR from `feat/ux-hierarchy-v2` to `main`**

Include design/spec links, RED/GREEN evidence, Quality Gate status, and scope exclusions.

- [ ] **Step 2: Obtain a branch preview**

Prefer an existing connected preview deployment mechanism. Do not repoint the production GitHub Pages site and do not merge `main` merely to preview.

- [ ] **Step 3: Verify rendered content**

Check that the first screen visibly shows the proposition before secondary navigation and that narrative prose no longer looks like a blue/green/orange keyword map.

- [ ] **Step 4: Present preview to user**

Provide the preview URL or, if the connected preview platform cannot generate a branch URL, provide a rendered screenshot/artifact and explicitly state the limitation. Do not merge until user reviews the preview.

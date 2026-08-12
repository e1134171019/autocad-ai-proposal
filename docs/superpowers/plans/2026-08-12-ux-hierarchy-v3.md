# UX Hierarchy v3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extend the existing UX hierarchy branch so the proposal explains scope selection, deterministic calculation, AI-assistant boundaries, concept-simulation status, mobile navigation, and result traceability without changing CAD calculation behavior.

**Architecture:** Keep the existing six Svelte ACT components as implementation anchors. Add client-facing clarity through targeted copy/data/component changes, preserve CAD simulator logic and ByLayer/state semantics, and protect the new behavior with source-level Vitest contracts before production edits.

**Tech Stack:** Svelte 5, Vite, Vitest, D3, CSS custom properties, GitHub Actions Quality Gate.

## Global Constraints

- Work only on `feat/ux-hierarchy-v2`; do not merge or deploy.
- `main` remains untouched.
- No new dependencies.
- No changes to CAD calculation values, selection logic, standard layer names, simulator animation behavior, dimensions, quantities, or command behavior.
- Narrative prose keeps the v2 neutral-color rule; CAD semantic/state colors remain.
- Exact length, quantity, filtering, classification, and calculation are deterministic responsibilities.
- AI/LLM may query, explain, summarize, locate, and record grounded results; it must not overwrite or invent calculated values.
- No unverified timing, efficiency, percentage, production-readiness, or customer-performance claims.
- Follow RED → GREEN TDD.

---

### Task 1: Lock v3 behavior with RED contracts

**Files:**
- Modify: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: source text from `Act01Hero.svelte`, `Nav.svelte`, `Act04Solution.svelte`, `Act05Intelligence.svelte`, `siteContent.js`, and `tokens.css`.
- Produces: regression contract for problem bridge, semantic mobile navigation, concept-simulation boundary, deterministic-vs-AI responsibility split, traceability evidence, and preserved CAD colors.

- [ ] **Step 1: Add failing assertions**

Require the branch source to contain:

```js
expect(hero).toContain('真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。');
expect(nav).toContain('aria-expanded');
expect(nav).toContain('menuOpen');
expect(nav).not.toContain('.links a { font-size: 0; }');
expect(solution).toContain('Concept Simulation');
expect(solution).toContain('提案操作示意');
expect(intelligence).not.toContain('AI DECISION LOGIC');
expect(intelligence).toContain('CALCULATION & RESULT TRACEABILITY');
expect(content).toContain('deterministicResponsibilities');
expect(content).toContain('assistantResponsibilities');
['Object', 'Layer', 'Selection Boundary', 'Rule', 'Result'].forEach((label) => expect(intelligence).toContain(label));
```

Also assert `siteContent.js` does not describe AI as directly owning exact length acquisition, classification totals, or quantity conversion.

- [ ] **Step 2: Push the test-only change and verify RED in Quality Gate**

Expected: new v3 assertions fail while existing v2/CAD contracts remain green.

- [ ] **Step 3: Commit**

```text
test: define UX hierarchy v3 responsibility contract
```

---

### Task 2: Add the problem bridge and semantic mobile navigation

**Files:**
- Modify: `src/lib/components/Act01Hero.svelte`
- Modify: `src/lib/components/Nav.svelte`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: existing six ACT anchors and activeAct store.
- Produces: early scope-comprehension bridge plus accessible mobile section menu.

- [ ] **Step 1: Add the problem bridge after Before/After**

Use this exact primary sentence:

```text
真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。
```

Support with one short sentence covering mixed floor/area/version/reference contexts without exposing detailed layer names.

- [ ] **Step 2: Replace bare-number mobile navigation**

Desktop labels become:

```js
['提案概要', '目前流程', '流程差異', '操作示意', '計算依據', '專案總結']
```

At mobile width, render a compact header with a button that exposes the semantic labels. The button must include `aria-expanded` and `aria-controls`; selecting a destination closes the menu. Keep existing `activeAct` behavior.

- [ ] **Step 3: Run targeted tests**

Run the UX contract plus existing navigation/content contracts. Expected: Task 2 assertions pass; ACT04/ACT05 v3 assertions remain RED.

- [ ] **Step 4: Commit**

```text
feat: clarify scope problem and mobile navigation
```

---

### Task 3: Mark the CAD experience as a proposal simulation

**Files:**
- Modify: `src/lib/components/Act04Solution.svelte`
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: existing `CadProcess` and `futureFlowSteps`.
- Produces: explicit concept-simulation boundary without simulator behavior changes.

- [ ] **Step 1: Add restrained boundary copy before CadProcess**

Required label:

```text
Concept Simulation｜提案操作示意
```

Required meaning: this visual explains the intended workflow/interface concept and is not proof that real AutoCAD API / DWG integration is already completed or production-validated.

- [ ] **Step 2: Run targeted UX/CAD tests**

Expected: concept-boundary assertions pass; CAD calculation/selection/interaction contracts remain green.

- [ ] **Step 3: Commit**

```text
feat: label CAD simulator as concept simulation
```

---

### Task 4: Split deterministic and AI-assistant responsibilities in content data

**Files:**
- Modify: `src/lib/content/siteContent.js`
- Test: `tests/uxHierarchyContract.test.js`
- Review: existing content/copy contracts

**Interfaces:**
- Produces:
  - `deterministicResponsibilities: readonly string[]`
  - `assistantResponsibilities: readonly string[]`
  - neutralized `intelligenceLayers` wording that no longer assigns exact calculations to AI.

- [ ] **Step 1: Replace AI-owned calculation statements**

Create deterministic responsibility items equivalent to:

```text
依框選範圍與標準圖層過濾有效物件
讀取 CAD 幾何長度與物件資料
依公司規則分類、加總與換算數量
保留忽略原因與計算依據
```

Create assistant responsibility items equivalent to:

```text
查詢已計算結果
解釋分類、忽略原因與計算依據
摘要目前區域的長度、數量與異常
整理可追溯紀錄與報告說明
```

- [ ] **Step 2: Neutralize intelligenceLayers descriptions**

Use `系統` / `規則引擎` / `計算流程` wording for deterministic context; reserve `AI 助理` for query/explanation roles.

- [ ] **Step 3: Run content and Copy Gate tests**

Expected: no protected layer names/engineering facts regress and no unsupported claim is introduced.

- [ ] **Step 4: Commit**

```text
refactor: separate rule engine and AI responsibilities
```

---

### Task 5: Rebuild ACT05 as calculation traceability

**Files:**
- Modify: `src/lib/components/Act05Intelligence.svelte`
- Optionally modify: `src/lib/charts/contextMap.js` only if required to remove false AI ownership labels while preserving chart behavior.
- Test: `tests/uxHierarchyContract.test.js`

**Interfaces:**
- Consumes: `intelligenceLayers`, `deterministicResponsibilities`, `assistantResponsibilities`.
- Produces: client-readable responsibility split and traceability evidence chain.

- [ ] **Step 1: Change section framing**

Use:

```text
ACT 05 / CALCULATION & RESULT TRACEABILITY
計算依據與結果確認
```

Explain deterministic flow first, AI assistant second.

- [ ] **Step 2: Render responsibility groups**

Group A: `C# / Rule Engine` with deterministic responsibilities.
Group B: `AI Assistant` with query/explanation/summary/record responsibilities.
Do not use competing taxonomy colors; hierarchy should come from structure and typography.

- [ ] **Step 3: Render traceability evidence chain**

Show these proposal labels:

```text
Object
Layer
Selection Boundary
Rule
Result
Ignored Reason
```

Explain that each result can return to the drawing object and applied rule context. Any example values must be clearly illustrative and reuse already-grounded project examples only.

- [ ] **Step 4: Run targeted tests**

Expected: all v3 responsibility/traceability assertions pass, existing CAD/content contracts remain green.

- [ ] **Step 5: Commit**

```text
feat: make calculation traceability explicit
```

---

### Task 6: Full regression, branch preview, and review evidence

**Files:**
- Modify only if a verified regression requires a minimal in-scope correction.
- Temporary preview-support files may be created on the feature branch only if needed, and must be removed before the final review diff unless they are generally useful project infrastructure.

**Interfaces:**
- Produces: verified branch head, reviewable desktop/mobile preview artifact, updated Draft PR evidence.

- [ ] **Step 1: Run repository quality gates**

```text
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected: all pass, `svelte-check` reports 0 errors/warnings, Copy Gate reports 0 findings.

- [ ] **Step 2: Verify scope diff**

Confirm no changes to CAD calculation values, selection logic, standard layer names, simulator animation behavior, package dependencies, production workflow target, or `main`.

- [ ] **Step 3: Generate branch-only desktop/mobile preview**

Use the existing safe artifact workflow pattern or an equivalent non-production mechanism. Do not deploy GitHub Pages production.

- [ ] **Step 4: Review rendered output**

Verify first-minute comprehension, mobile semantic navigation, Concept Simulation labeling, deterministic-vs-AI separation, and traceability readability.

- [ ] **Step 5: Update Draft PR description with v3 evidence**

Keep PR Draft. Do not mark Ready or merge.

- [ ] **Step 6: Present preview to user**

Report branch head, test evidence, desktop/mobile preview, and any remaining limitations. Integration remains blocked pending separate user approval.

# ACT01 Commercial Message Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace ACT01's four-stage internal/project-context narrative with a concise customer-facing value message while preserving all downstream ACT02–ACT06 behavior and ACT04's 12-step interactive evidence.

**Architecture:** Keep `siteContent.js` as the single source of customer-facing ACT01 copy. Change `heroContent` to a compact value/outcome/scope/closing contract, then render that contract in `Act01Hero.svelte` before the existing six-section anchor navigation. No new chart, store, dependency, or cross-ACT behavior is introduced.

**Tech Stack:** Svelte 5, Vite, Vitest, existing CSS tokens, existing Copy Gate.

## Global Constraints

- Work only on `feat/act01-commercial-message-v1`, based on `main`.
- Do not modify `main`, deploy, publish, merge, or alter PR #2/#4.
- ACT04 `futureFlowSteps` remains exactly 12 steps.
- No unsupported speed, time-saving, error-reduction, or productivity claims.
- ACT01 must be understandable without clicking; only anchor navigation remains interactive.
- No C#, Rule Engine, CAD API, geometry module, or data-processing module explanation in ACT01.

---

### Task 1: Lock the new ACT01 content contract

**Files:**
- Modify: `tests/contentNarrativeContract.test.js`
- Modify: `tests/copyCleanupContract.test.js`

**Interfaces:**
- Consumes: exported `heroContent` from `src/lib/content/siteContent.js`.
- Produces: executable expectations for `title`, `lead`, `outcomes`, `scopeNote`, and `closing`.

- [ ] **Step 1: Write the failing tests**

Require:
- exact H1 `AutoCAD 施工圖長度與數量自動驗算`;
- exact four outcome titles `每段長度 / 施工總長 / 元件數量 / AI 查詢`;
- core lead contains `逐段查看、記錄、加總與清點`;
- scope note contains `6 樓外部施工範圍`;
- old four-section structure is absent;
- Copy Cleanup no longer indexes `heroContent.sections[3]`.

- [ ] **Step 2: Push test-only commit and verify RED**

Expected Quality Gate result: Vitest fails because current `main`-derived `heroContent` still exposes the old four-section contract and old H1.

---

### Task 2: Implement the customer-facing content model

**Files:**
- Modify: `src/lib/content/siteContent.js`

**Interfaces:**
- Produces `heroContent = { eyebrow, title, lead, outcomes, scopeNote, closing }`.

- [ ] **Step 1: Replace the old four-section ACT01 data**

Use exactly:

```js
export const heroContent = Object.freeze({
  eyebrow: 'AutoCAD × AI 智能作業提案',
  title: 'AutoCAD 施工圖長度與數量自動驗算',
  lead: '繪圖完成後，原本需要逐段查看、記錄、加總與清點的工作，由外掛集中整理。',
  outcomes: Object.freeze([
    Object.freeze({ title: '每段長度', desc: '施工線逐段整理，可查看個別長度。' }),
    Object.freeze({ title: '施工總長', desc: '同一施工範圍的外部、深井與總長集中顯示。' }),
    Object.freeze({ title: '元件數量', desc: '依目前施工範圍整理指定施工元件數量。' }),
    Object.freeze({ title: 'AI 查詢', desc: '針對目前施工範圍詢問結果、組成與需要確認的內容。' })
  ]),
  scopeNote: Object.freeze({
    title: '只整理這次要算的範圍',
    desc: '例如只處理「6 樓外部施工範圍」，其他樓層、深井或不符合條件的物件不混入本次結果。'
  }),
  closing: '結果直接在 AutoCAD 內查看與確認，需要進一步了解時，再由 AI 協助查詢目前施工範圍的結果與依據。'
});
```

- [ ] **Step 2: Do not alter current/future flow arrays**

Verify no diff occurs in `currentFlowNodes`, `futureFlowSteps`, selection data, matrix data, intelligence data, or ACT06 content.

---

### Task 3: Render the new ACT01 hierarchy

**Files:**
- Modify: `src/lib/components/Act01Hero.svelte`

**Interfaces:**
- Consumes: new `heroContent` contract.
- Preserves: anchor links to `#act-01` through `#act-06`.

- [ ] **Step 1: Render value content before navigation**

Order:
1. eyebrow;
2. H1;
3. lead;
4. four static outcome items;
5. scope note;
6. closing;
7. six-section anchor navigation.

- [ ] **Step 2: Keep interaction intentionally light**

No buttons beyond existing anchors, no D3, no animated workflow, no AI input, no box selection. Preserve keyboard focus and hover for navigation.

- [ ] **Step 3: Update the six-section outline copy only where necessary**

Replace the unsupported ACT03 `工時差異` / `AI 工具處理更快、時間更穩定` wording with `流程差異` and a neutral workflow-comparison description. Do not change ACT02–ACT06 component headings in this task.

---

### Task 4: Verify GREEN and scope isolation

**Files:** none additional.

- [ ] **Step 1: Push implementation commit**
- [ ] **Step 2: Verify Quality Gate passes**

Expected checks:
- `npm run test:offline` PASS
- `npm run verify:rules` PASS
- `npm run check` PASS
- `npm test` PASS
- `npm run audit:copy` PASS
- `npm run build` PASS

- [ ] **Step 3: Compare branch against `main`**

Expected production changes are limited to:
- `src/lib/content/siteContent.js`
- `src/lib/components/Act01Hero.svelte`
- `tests/contentNarrativeContract.test.js`
- `tests/copyCleanupContract.test.js`

Documentation changes are limited to this spec and plan.

- [ ] **Step 4: Stop after ACT01**

Do not merge, deploy, publish, or begin ACT02 until the user reviews ACT01.

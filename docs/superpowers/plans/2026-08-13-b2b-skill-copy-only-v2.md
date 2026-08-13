# B2B Skill Copy-Only V2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the user-approved B2B industrial proposal writing framework to the real six-ACT AutoCAD proposal site while preserving all existing animation, workflow and calculation behavior.

**Architecture:** Keep the existing Svelte component structure and all interactive/D3/CAD code unchanged. Change only chapter titles and wrapper/body copy in the six ACT components plus ACT01 `heroContent.sections`, with a dedicated copy-only contract and final diff gate proving no behavioral edits.

**Tech Stack:** Svelte 5, JavaScript, Vitest, Vite, existing GitHub Actions Quality Gate.

## Global Constraints

- Base truth: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`.
- Execution branch: `feat/proposal-messaging-copy-only-v1`.
- User-provided B2B 工業設備提案寫手 Skill is the primary writing framework.
- Only six ACT titles and chapter copy may change.
- `Nav.svelte` is not changed in this implementation.
- ACT02 remains exactly 9 workflow steps; labels, descriptions, order and animation semantics stay unchanged.
- ACT04 remains exactly 12 workflow steps; labels, descriptions, order and animation semantics stay unchanged.
- `cadSimulator.js`, `comparisonAnim.js`, `contextMap.js`, `CadProcess.svelte`, component `<style>` blocks and `src/app.css` are protected.
- Human / Program / AI responsibility ownership cannot drift.
- Concept Simulation disclaimer stays unchanged.
- No invented quote, schedule, warranty, percentage saving, measured time saving, ROI or customer outcome.
- ACT06 remains without NEXT STEP or CTA.
- No PR, merge, deployment, `main` change or PR #4 modification.

---

### Task 1: RED Copy-Only Contract

**Files:**
- Create: `tests/b2bProposalCopyOnlyContract.test.js`

**Interfaces:**
- Consumes: text from the six ACT components and exported `heroContent`, `currentFlowNodes`, `futureFlowSteps`.
- Produces: a deterministic contract for approved titles, core copy, B2B banned-word hygiene and protected 9/12 step counts.

- [ ] **Step 1: Write the failing contract**

Create a Vitest test that asserts:

```js
expect(act01).toContain('<h1>我們的提案</h1>');
expect(act02).toContain('title="目前客戶的流程"');
expect(act03).toContain('目前流程的問題');
expect(act04).toContain('title="我們的解決方案"');
expect(act05).toContain('系統計算方式與 AI 分工');
expect(act06).toContain('專案效益與預期成果');
expect(heroContent.sections.map((section) => section.title)).toEqual([
  '客戶需求', '提案內容', '計算條件', '流程基準'
]);
expect(currentFlowNodes).toHaveLength(9);
expect(futureFlowSteps).toHaveLength(12);
```

Also assert approved responsibility phrases and that the user-provided banned expressions do not appear in the affected copy surfaces.

- [ ] **Step 2: Run the contract and prove RED**

Run:

```bash
npm test -- tests/b2bProposalCopyOnlyContract.test.js
```

Expected: FAIL because the real site still contains the previous six chapter titles/copy.

- [ ] **Step 3: Record RED evidence**

Record the failing assertion(s), test count and commit SHA in `docs/skill-tests/2026-08-13-b2b-copy-only-red.md`.

- [ ] **Step 4: Commit RED**

Commit only the new test and RED evidence.

---

### Task 2: ACT01 + ACT02 B2B Proposal Copy

**Files:**
- Modify: `src/lib/components/Act01Hero.svelte`
- Modify: `src/lib/components/Act02Flow.svelte`
- Modify: `src/lib/content/siteContent.js` (`heroContent.sections` only)
- Modify: `tests/contentNarrativeContract.test.js`

**Interfaces:**
- Consumes: approved copy from `docs/superpowers/specs/2026-08-13-b2b-skill-copy-only-v2-design.md`.
- Produces: B2B execution-summary ACT01 and concrete current-workflow ACT02 while leaving actual 9-step workflow data untouched.

- [ ] **Step 1: Update ACT01 literal copy only**

Set:

```text
H1: 我們的提案
Lead: 將客戶現有的 AutoCAD 施工圖作業加入外掛工具，協助整理施工線長度、施工總長與元件數量。繪圖人員仍負責施工位置判斷與繪製；程式負責計算，AI 助理負責結果查詢、解釋與摘要。
Proposed flow: 繪圖 → 框選施工範圍 → 程式整理長度與數量 → AI 助理查詢 → 人員確認
Bridge label: 計算前提
Bridge heading: 先確認本次要計算的樓層、區域與物件。
Bridge body: 同一個 DWG 可能包含不同樓層、施工區域、版本與參考物件。範圍與圖層先界定清楚，後續長度與數量才有一致的計算基準。
```

Replace only six outline-card title/description literals with the exact approved V2 spec values. Do not alter markup or style blocks.

- [ ] **Step 2: Replace only `heroContent.sections`**

Use exactly four rows:

```text
客戶需求 / 完成施工範圍後，希望能直接取得每段長度、整張圖施工總長與指定元件數量。
提案內容 / 把驗算與結果查詢放進既有 AutoCAD 作業；施工判斷與繪製仍由繪圖人員負責。
計算條件 / 系統先依本次範圍、標準圖層與有效物件建立計算基準，再整理長度與數量。
流程基準 / 下一章完整呈現客戶目前的施工圖流程，作為後續方案比較基準。
```

Do not edit `currentFlowNodes` or any data after `heroContent`.

- [ ] **Step 3: Update ACT02 wrapper only**

Set title to `目前客戶的流程` and lead to:

```text
客戶目前從原始 CAD 圖面開始，由繪圖人員判斷施工範圍、繪製線段或聚合線，再逐段查看長度、建立標註、人工加總並換算施工數量。最後還需要整理線條、文字、尺寸與圖面位置。
```

Update only `leadHighlights` so every highlighted string exists verbatim in the new lead. Do not touch `processSteps`, `mode` or CSS.

- [ ] **Step 4: Update the existing ACT01 narrative contract**

Change `tests/contentNarrativeContract.test.js` so it asserts the four new supporting titles and their concrete meanings instead of the retired `6 樓外部施工範圍` copy.

- [ ] **Step 5: Run focused tests**

```bash
npm test -- tests/b2bProposalCopyOnlyContract.test.js tests/contentNarrativeContract.test.js
```

Expected: ACT01/02 assertions pass; remaining ACT03-06 assertions still fail until Task 3.

- [ ] **Step 6: Commit ACT01/02 copy**

Commit only the four Task 2 paths.

---

### Task 3: ACT03–ACT06 B2B Proposal Copy

**Files:**
- Modify: `src/lib/components/Act03Problem.svelte`
- Modify: `src/lib/components/Act04Solution.svelte`
- Modify: `src/lib/components/Act05Intelligence.svelte`
- Modify: `src/lib/components/Act06Summary.svelte`

**Interfaces:**
- Consumes: approved V2 titles and leads.
- Produces: problem → solution → calculation/AI split → evidence-bounded expected-outcome narrative without altering any animation/data structure.

- [ ] **Step 1: ACT03 wrapper copy**

Set title to `目前流程的問題` and lead to:

```text
現行作業需要重複點選物件、查看長度、記錄、加總與複核。圖面同時存在不同樓層、施工區域或版本時，也必須確認哪些物件屬於本次計算範圍。這裡比較的是作業方式與可能發生的風險，實際工時差異仍需用相同圖面與相同條件量測。
```

Do not change `renderComparison`, observer logic, risk list or style block.

- [ ] **Step 2: ACT04 wrapper copy**

Set title to `我們的解決方案` and lead to:

```text
外掛先建立標準圖層，繪圖人員依工程需求判斷施工位置並完成施工線繪製。完成後以框選範圍定義本次計算區域，程式依圖層、CAD 物件與公司規則整理長度及數量，再提供結果確認與 AI 助理查詢。
```

Keep the Concept Simulation disclaimer byte-for-byte unchanged and do not edit `futureFlowSteps`.

- [ ] **Step 3: ACT05 title/lead only**

Set title to `系統計算方式與 AI 分工` and lead to:

```text
框選範圍與標準圖層先決定本次哪些物件需要計算。C# 規則引擎負責篩選、分類、長度與數量計算，並保留未計入物件的原因；AI 助理只使用已完成的計算結果進行查詢、解釋與摘要，最後仍由人員確認。
```

Do not edit responsibility arrays, group prose, traceability prose/fields, chart code or styles.

- [ ] **Step 4: ACT06 title and summary prose only**

Set title to `專案效益與預期成果`.

Replace the two summary paragraphs with exactly:

```text
這套方案的設計目標，是減少逐段查值、人工記錄、加總與重複複核，把施工範圍、圖層與計算方式整理成固定規則。實際節省的工時與改善幅度目前沒有量測數據，後續需使用相同施工圖與相同條件進行前後比較。

繪圖人員負責工程判斷與最終確認；程式依標準圖層、框選範圍與公司規則計算，AI 助理使用既有結果協助查詢、解釋與摘要。
```

Keep responsibility line and progression unchanged. Replace only the closing quote text with:

```text
將繪圖人員的工程經驗整理成公司可以保存、團隊可以沿用、程式可以執行的作業規則。
```

Do not add CTA.

- [ ] **Step 5: Run focused GREEN test**

```bash
npm test -- tests/b2bProposalCopyOnlyContract.test.js tests/contentNarrativeContract.test.js
```

Expected: PASS.

- [ ] **Step 6: Commit ACT03–06 copy**

Commit only the four component paths.

---

### Task 4: Strict Copy Review and Full Quality Gate

**Files:**
- Create: `docs/skill-tests/2026-08-13-b2b-copy-only-review.md`

**Interfaces:**
- Consumes: final branch diff and full project test output.
- Produces: evidence that B2B writing rules, engineering fidelity and copy-only scope all pass.

- [ ] **Step 1: Run `eden-engineering-copy` strict-review**

Verify Fidelity, Evidence, Plain Speak, Concision, zh-TW, Human/Program/AI responsibility and unsupported-claim gate.

Hard fail if copy claims measured saving, error reduction, ROI, completed production integration or AI ownership of deterministic calculation without evidence.

- [ ] **Step 2: Run full Quality Gate**

```bash
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected: all commands PASS.

- [ ] **Step 3: Run hard scope diff**

Compare final branch against:

```text
e04f1202188bf6894d4d8d4c9dcfa3b579e613e0
```

Allowed source paths only:

```text
src/lib/components/Act01Hero.svelte
src/lib/components/Act02Flow.svelte
src/lib/components/Act03Problem.svelte
src/lib/components/Act04Solution.svelte
src/lib/components/Act05Intelligence.svelte
src/lib/components/Act06Summary.svelte
src/lib/content/siteContent.js
```

Within those files, only approved literal copy changes are allowed. Any component style, animation code, workflow data or calculation data edit is a hard fail.

- [ ] **Step 4: Record review evidence**

Document final commit, CI run, test counts, Copy Gate findings, build result, protected behavior check and known pre-existing npm vulnerabilities.

- [ ] **Step 5: Commit review evidence**

Commit the review document only.

---

## Completion Gate

Stop after fresh verification on `feat/proposal-messaging-copy-only-v1` and present the real-project candidate for user review. Do not create a PR, merge, deploy or modify `main`.
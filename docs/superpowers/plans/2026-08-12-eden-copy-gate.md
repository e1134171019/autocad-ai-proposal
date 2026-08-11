# Eden Copy Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立一套不改動既有 ACT 文案的繁中工程提案 Skill 與 deterministic Copy Gate，並以 20 案回歸基準驗證低誤殺與 claim/evidence 判斷。

**Architecture:** 語意判斷放在 `skills/eden-engineering-copy/SKILL.md`，可機械檢查放在 `src/lib/content/copyGate.js`。Gate 只回傳 findings，不自動改稿；目前 repo 掃描為 audit-only，benchmark 必須嚴格通過。

**Tech Stack:** Node.js >=20.19、ES modules、Vitest 4、既有 Svelte 5/Vite 專案。

## Global Constraints
- 不修改 ACT 01～06 現有文案。
- 不新增第三方依賴。
- 不使用 AI detector 當品質判斷。
- protected spans：數字、版本、圖層、CAD 名稱、責任主體不可漂移。
- v0.1 repo audit 為 non-blocking；benchmark 為 blocking。

---

### Task 1: Copy Gate regression benchmark

**Files:**
- Create: `tests/fixtures/copyGateCases.js`
- Create: `tests/copyGate.test.js`
- Create: `.github/workflows/quality-gate.yml`

**Interfaces:**
- Consumes: `auditCopy(text, options?)`
- Produces: 20 案固定 expectations。

- [ ] **Step 1:** 建立 8 preserve、8 rewrite、4 unsupported-claim 案例。
- [ ] **Step 2:** 寫測試期待 `auditCopy()` 回傳 `{ rule, severity, message }[]`。
- [ ] **Step 3:** Push，確認 workflow 因尚無 `copyGate.js` 而失敗（RED）。

### Task 2: Deterministic Copy Gate

**Files:**
- Create: `src/lib/content/copyGate.js`

**Interfaces:**
- `auditCopy(text, { evidence = false } = {}) -> Finding[]`
- Finding: `{ rule: string, severity: 'warning'|'error', message: string, match?: string }`

- [ ] **Step 1:** 實作最小規則使 20 案通過。
- [ ] **Step 2:** preserve 案必須 0 finding。
- [ ] **Step 3:** unsupported claim 必須回傳 `claim-evidence/error`。
- [ ] **Step 4:** Push，確認 Copy Gate tests GREEN。

### Task 3: Eden engineering copy Skill

**Files:**
- Create: `skills/eden-engineering-copy/SKILL.md`
- Create: `skills/eden-engineering-copy/references/sources.md`

**Interfaces:**
- Consumes: 工程提案原稿、受眾、可用證據、protected spans。
- Produces: annotation 或單一推薦改寫；不得新增事實。

- [ ] **Step 1:** 將 baseline failures 寫成 SOP：先 fidelity/evidence，再 plain speak/anti-slop/concision。
- [ ] **Step 2:** 明確列出 claim gate 與禁止自行補數據。
- [ ] **Step 3:** 記錄外部候選只作方法來源，不複製第三方 Skill 文字或程式碼。

### Task 4: Repository audit command

**Files:**
- Create: `scripts/audit-copy.js`
- Modify: `package.json`

**Interfaces:**
- `npm run audit:copy` 掃描指定內容來源並列 findings。
- v0.1 finding 不使 command exit 1；執行錯誤仍 exit 1。

- [ ] **Step 1:** 掃描 `siteContent.js`、`Act03Problem.svelte`、`Act05Intelligence.svelte`、`Act06Summary.svelte` 的中文字串。
- [ ] **Step 2:** 顯示檔名、rule、severity、命中文字。
- [ ] **Step 3:** 加入 package script。

### Task 5: Full verification

- [ ] **Step 1:** `npm run test:offline`
- [ ] **Step 2:** `npm run verify:rules`
- [ ] **Step 3:** `npm run check`
- [ ] **Step 4:** `npm test`
- [ ] **Step 5:** `npm run audit:copy`
- [ ] **Step 6:** `npm run build`
- [ ] **Step 7:** 建立 PR，不合併 main；回報 CI 與已知 findings。

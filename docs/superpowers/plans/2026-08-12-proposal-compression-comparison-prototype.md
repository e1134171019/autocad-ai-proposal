# Proposal Compression Comparison Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an isolated, scrollable, interactive comparison prototype that applies the approved Proposal Compression decisions to the six-act AutoCAD proposal without modifying formal `src/**` code.

**Architecture:** Implement a standalone static browser prototype under `prototypes/proposal-compression/` using plain HTML, CSS, and JavaScript. A Vitest contract test validates isolation, six-act ownership, 9/12 workflow preservation, concept/proof boundaries, responsibility separation, and unsupported-claim exclusions. The final handoff also produces a single-file local preview artifact for direct review without deployment.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, existing Vitest test runner, existing GitHub Actions Quality Gate.

## Global Constraints

- Artifact classification: `comparison_prototype`.
- `formal_project: false` must remain visibly present in the prototype UI.
- Source baseline: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`.
- Do not modify `src/**`, `cadSimulator.js`, `CadProcess.svelte`, PR #4, `main`, deployment, or central Drive Skill registration.
- Preserve six-act order `ACT01 → ACT02 → ACT03 → ACT04 → ACT05 → ACT06`.
- Preserve ACT02 exactly 9 meaningful current-workflow steps.
- Preserve ACT04 exactly 12 meaningful proposed-workflow steps.
- ACT04 must visibly remain `Concept Simulation｜提案操作示意`; no production AutoCAD API / real-DWG integration claim.
- ACT03 must not claim measured time savings, ROI, measured error reduction, or production outcome metrics.
- Deterministic program/rule logic owns filtering, classification, length/quantity calculation, and ignored reasons.
- AI Assistant owns query, explanation, summary, and organization of already-calculated results only.
- Human engineering judgment and final confirmation remain explicit.
- Desktop is the primary review target; tablet/mobile must remain readable and usable without horizontal page scrolling.
- No external APIs, authentication, analytics, uploads, persistent state, or new dependencies.

---

## File Structure

Create only these implementation files outside formal `src/**`:

```text
prototypes/proposal-compression/
  index.html        # six-act semantic structure and visible prototype boundary
  prototype.css     # layout, responsive rules, visual hierarchy
  prototype.js      # workflow data + stepper/toggle/navigation interactions

tests/
  proposalCompressionPrototypeContract.test.js

docs/skill-tests/
  2026-08-12-proposal-compression-prototype-review.md
```

A user-visible single-file preview is generated after repository implementation from these sources into `/mnt/data/proposal-compression-prototype.html`; it is a review artifact only and is not committed or deployed.

---

### Task 1: Add the isolation and content contract RED test

**Files:**
- Create: `tests/proposalCompressionPrototypeContract.test.js`
- Read: `docs/superpowers/specs/2026-08-12-proposal-compression-comparison-prototype-design.md`

**Interfaces:**
- Consumes: expected prototype file paths and approved semantic requirements.
- Produces: executable repository contract that must fail before the prototype files exist and pass after implementation.

- [ ] **Step 1: Create the failing test**

Create `tests/proposalCompressionPrototypeContract.test.js` with these checks:

```js
import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const htmlPath = join(root, 'prototypes/proposal-compression/index.html');
const cssPath = join(root, 'prototypes/proposal-compression/prototype.css');
const jsPath = join(root, 'prototypes/proposal-compression/prototype.js');

const read = (path) => readFileSync(path, 'utf8');

describe('proposal compression comparison prototype', () => {
  it('is visibly isolated from the formal project', () => {
    const html = read(htmlPath);
    expect(html).toContain('COMPARISON PROTOTYPE');
    expect(html).toContain('formal_project: false');
    expect(html).toContain('prototype.css');
    expect(html).toContain('prototype.js');
  });

  it('preserves the six-act narrative order and ownership', () => {
    const html = read(htmlPath);
    const ids = ['act-01', 'act-02', 'act-03', 'act-04', 'act-05', 'act-06'];
    const positions = ids.map((id) => html.indexOf(`id="${id}"`));
    positions.forEach((position) => expect(position).toBeGreaterThan(-1));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(html).toContain('AI 施工圖驗算提案');
    expect(html).toContain('真正問題不是加總，而是哪些物件該算');
    expect(html).toContain('結果怎麼算、AI 助理能做什麼');
    expect(html).toContain('把工程經驗變成可重複的作業規則');
  });

  it('preserves 9 current steps and 12 proposed steps', () => {
    const js = read(jsPath);
    const currentBlock = js.match(/const currentSteps = \[(.*?)\];/s)?.[1] ?? '';
    const proposedBlock = js.match(/const proposedSteps = \[(.*?)\];/s)?.[1] ?? '';
    expect((currentBlock.match(/id:/g) ?? []).length).toBe(9);
    expect((proposedBlock.match(/id:/g) ?? []).length).toBe(12);
  });

  it('keeps proof and responsibility boundaries explicit', () => {
    const html = read(htmlPath);
    expect(html).toContain('Concept Simulation｜提案操作示意');
    expect(html).toContain('不代表 AutoCAD API／實際 DWG 整合已完成');
    expect(html).toContain('人做工程判斷');
    expect(html).toContain('程式做確定性計算');
    expect(html).toContain('AI 協助查詢與解釋');
    expect(html).toContain('Object → Layer → Selection Boundary → Rule → Result → Ignored Reason');
  });

  it('blocks unsupported performance framing', () => {
    const html = read(htmlPath);
    expect(html).toContain('不代表實測工時');
    expect(html).not.toMatch(/節省\s*\d+%|提升\s*\d+%|ROI\s*[:：]?\s*\d+/i);
  });

  it('has responsive and interactive hooks without external dependencies', () => {
    const css = read(cssPath);
    const js = read(jsPath);
    expect(css).toContain('@media');
    expect(js).toContain('renderStepper');
    expect(js).toContain('setActiveSection');
    expect(js).toContain('toggleResponsibility');
    expect(htmlPath).not.toContain('/src/');
  });
});
```

- [ ] **Step 2: Run the targeted test and confirm RED**

Run:

```bash
npx vitest run tests/proposalCompressionPrototypeContract.test.js
```

Expected: FAIL because `prototypes/proposal-compression/index.html` does not exist yet. The failure must be file-not-found / missing-prototype behavior, not an unrelated repository error.

- [ ] **Step 3: Commit the RED contract**

```bash
git add tests/proposalCompressionPrototypeContract.test.js
git commit -m "test: define proposal compression prototype contract"
```

---

### Task 2: Build the semantic six-act prototype shell

**Files:**
- Create: `prototypes/proposal-compression/index.html`
- Create: `prototypes/proposal-compression/prototype.css`
- Test: `tests/proposalCompressionPrototypeContract.test.js`

**Interfaces:**
- Consumes: six-act design spec, source-derived headings/boundaries, prototype JS hooks defined in Task 3.
- Produces: semantic DOM structure, visible prototype boundary, responsive visual hierarchy, ACT ownership, stepper containers, responsibility controls.

- [ ] **Step 1: Create `index.html` with the six approved section responsibilities**

The document must contain:

```html
<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>AI 施工圖驗算提案｜Comparison Prototype</title>
  <link rel="stylesheet" href="./prototype.css" />
</head>
<body>
  <header class="prototype-bar">
    <strong>COMPARISON PROTOTYPE</strong>
    <span>formal_project: false</span>
  </header>
  <nav class="act-nav" aria-label="提案章節">
    <!-- ACT01–ACT06 anchor buttons -->
  </nav>
  <main>
    <section id="act-01">...</section>
    <section id="act-02">...</section>
    <section id="act-03">...</section>
    <section id="act-04">...</section>
    <section id="act-05">...</section>
    <section id="act-06">...</section>
  </main>
  <script src="./prototype.js"></script>
</body>
</html>
```

Required frontstage content by ACT:

- ACT01 title `AI 施工圖驗算提案`; one short lead; current/proposed workflow rows; bridge `但真正的問題，不只是把數字加起來。`; no long four-block background narrative.
- ACT02 title `目前施工圖怎麼完成`; one short lead; `#current-stepper` container only for workflow details.
- ACT03 title `真正問題不是加總，而是哪些物件該算`; one short scope explanation; six compact risk items; visible note `這裡比較的是作業步驟與風險，不代表實測工時。`.
- ACT04 visible `Concept Simulation｜提案操作示意`; proof disclaimer containing `不代表 AutoCAD API／實際 DWG 整合已完成`; title `AI 輔助驗算流程怎麼操作`; `#proposed-stepper` container.
- ACT05 title `結果怎麼算、AI 助理能做什麼`; first-layer line that says deterministic program calculates, AI uses completed results, human confirms; responsibility buttons/panels with `data-responsibility="human|rule|ai"`; traceability chain exact text `Object → Layer → Selection Boundary → Rule → Result → Ignored Reason`.
- ACT06 title `把工程經驗變成可重複的作業規則`; responsibility conclusion `人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`; progression `經驗規則化 → 作業標準化 → 知識系統化`; visually separate next-step block `下一步｜用實際施工圖確認驗證範圍` with the approved five-step commercial sequence.

- [ ] **Step 2: Create `prototype.css` with technical hierarchy and responsive behavior**

Define variables and layout without external fonts or CSS frameworks:

```css
:root {
  --bg: #f4f6f8;
  --surface: #ffffff;
  --ink: #111827;
  --muted: #667085;
  --line: #d7dde5;
  --accent: #2457d6;
  --manual: #7a4d16;
  --radius: 14px;
  --max: 1180px;
}
```

Required behavior:
- fixed prototype boundary at top;
- sticky ACT navigation below it;
- section spacing differs by narrative weight instead of identical cards;
- thin engineering borders, restrained accent, no marketing gradients;
- stepper desktop layout supports control rail + content viewport;
- ACT05 responsibility layout is three columns on desktop and one column on mobile;
- ACT06 CTA is visually distinct from source conclusion;
- `@media (max-width: 780px)` collapses multi-column areas and keeps all controls usable.

Do not introduce external asset URLs.

- [ ] **Step 3: Run targeted test**

```bash
npx vitest run tests/proposalCompressionPrototypeContract.test.js
```

Expected: still FAIL because `prototype.js` does not yet exist. HTML/CSS assertions should no longer be the primary failure.

- [ ] **Step 4: Commit semantic shell**

```bash
git add prototypes/proposal-compression/index.html prototypes/proposal-compression/prototype.css
git commit -m "feat: add proposal compression prototype shell"
```

---

### Task 3: Implement the 9/12 workflow interactions and responsibility controls

**Files:**
- Create: `prototypes/proposal-compression/prototype.js`
- Test: `tests/proposalCompressionPrototypeContract.test.js`

**Interfaces:**
- Consumes: `#current-stepper`, `#proposed-stepper`, ACT navigation anchors, ACT05 `data-responsibility` controls.
- Produces:
  - `currentSteps: Array<{id:number,label:string,desc:string,owner:string}>`
  - `proposedSteps: Array<{id:number,label:string,desc:string,owner:string}>`
  - `renderStepper(rootId:string, steps:Array, mode:'current'|'proposed'): void`
  - `setActiveSection(id:string): void`
  - `toggleResponsibility(key:'human'|'rule'|'ai'): void`

- [ ] **Step 1: Define exactly 9 current workflow steps**

Use the source-derived current sequence without merging or reordering:

```js
const currentSteps = [
  { id: 1, label: '建商提供原始 CAD 圖面', owner: '輸入', desc: '先確認本次樓層與圖面版本。' },
  { id: 2, label: '導入建商圖面與原始圖層', owner: '人工', desc: '保留原始樓層與圖層資料作為底圖。' },
  { id: 3, label: '判斷外部與深井的施工範圍', owner: '人工判斷', desc: '由繪圖人員確認施工位置。' },
  { id: 4, label: '沿施工範圍繪製線段或聚合線', owner: '人工繪製', desc: '依施工位置逐段完成施工線。' },
  { id: 5, label: '逐段從性質面板查看長度', owner: '人工查看', desc: '逐段點選並讀取長度。' },
  { id: 6, label: '逐段建立尺寸與人工記錄', owner: '人工標註', desc: '尺寸與記錄逐筆完成。' },
  { id: 7, label: '人工加總外部與內部深井長度', owner: '人工計算', desc: '依紀錄逐項加總。' },
  { id: 8, label: '依長度人工換算施工數量', owner: '人工換算', desc: '依公司施工條件換算構件數量。' },
  { id: 9, label: '調整線條、文字及圖面位置', owner: '人工整理', desc: '完成圖面與標註配置。' }
];
```

- [ ] **Step 2: Define exactly 12 proposed workflow steps**

Preserve the source sequence and responsibility boundary. The array must include these semantic checkpoints in order:

```text
1 建商提供原始 CAD 圖面
2 外掛建立標準圖層
3 繪圖人員判斷施工位置
4 繪圖人員使用外掛工具繪製施工範圍
5 工具選擇帶入標準圖層／顏色／線寬
6 專用按鈕完成常用繪圖／標註操作
7 框選定義本次計算範圍
8 規則引擎產生本次長度／數量結果
9 結果保留分類／編號／忽略依據
10 重新框選後可由 AI 助理查詢既有結果
11 繪圖人員確認結果
12 輸出原生圖面／PDF 與可追溯資訊
```

The step-8 description must explicitly say deterministic rules calculate before any AI query. Step 10 must explicitly say AI uses already-calculated results.

- [ ] **Step 3: Implement a reusable stepper renderer**

Implement `renderStepper(rootId, steps, mode)` to produce:

```html
<div class="stepper-shell">
  <div class="step-rail" role="tablist">...</div>
  <article class="step-stage">
    <p class="step-owner"></p>
    <h3></h3>
    <p class="step-desc"></p>
    <div class="step-visual" aria-hidden="true"></div>
    <div class="step-actions">
      <button data-action="prev">上一個</button>
      <span>STEP 01 / 09</span>
      <button data-action="next">下一個</button>
    </div>
  </article>
</div>
```

Requirements:
- numbered direct selection;
- previous/next controls;
- no wraparound at first/last step;
- current mode uses manual visual cues; proposed mode uses proposed-system cues;
- step 7/8/10 in proposed mode visually emphasize selection → deterministic result → AI query sequence;
- keyboard focus remains visible through native buttons.

- [ ] **Step 4: Implement ACT navigation and responsibility toggles**

`setActiveSection(id)` updates the active nav link based on IntersectionObserver and click selection.

`toggleResponsibility(key)` expands one ACT05 detail panel at a time. The three detail payloads must preserve:

```text
Human:
- 判斷施工位置與本次施工範圍
- 依圖面完成施工線繪製
- 確認系統結果與最終輸出

C# / Rule Engine:
- 依框選範圍與標準圖層篩選物件
- 讀取 CAD 物件與幾何資料
- 分類、加總與依公司規則換算數量
- 保留計算依據與忽略原因

AI Assistant:
- 查詢已完成的計算結果
- 解釋分類、忽略原因與規則
- 摘要結果與異常
- 整理可追溯／報告說明
```

- [ ] **Step 5: Run targeted GREEN test**

```bash
npx vitest run tests/proposalCompressionPrototypeContract.test.js
```

Expected: PASS all prototype contract tests.

- [ ] **Step 6: Commit interactive prototype**

```bash
git add prototypes/proposal-compression/prototype.js tests/proposalCompressionPrototypeContract.test.js
git commit -m "feat: add interactive proposal compression workflows"
```

---

### Task 4: Run semantic review and produce prototype review evidence

**Files:**
- Create: `docs/skill-tests/2026-08-12-proposal-compression-prototype-review.md`
- Read: all prototype files, approved design spec, source components ACT01/02/03/04/05/06.

**Interfaces:**
- Consumes: completed prototype and source facts.
- Produces: explicit comparison verdict before any formal-site implementation decision.

- [ ] **Step 1: Review frontstage compression section by section**

Record PASS/FAIL for:

```text
ACT01: proposal category is immediately clear; no full ACT03 conclusion consumed.
ACT02: 9/9 steps present; wrapper does not repeat all steps.
ACT03: owns “哪些物件該算”; no measured-time claim.
ACT04: 12/12 steps present; Concept Simulation boundary visible.
ACT05: Human / Rule Engine / AI split readable before deep detail.
ACT06: organizational conclusion preserved; new CTA visibly marked as next proposal action.
```

- [ ] **Step 2: Run `eden-engineering-copy` strict semantic checks**

Review all frontstage copy for:
- Fidelity: protected counts, responsibility boundaries, concept status.
- Evidence: no unsupported time/speed/error/ROI/customer outcome/production-integration claim.
- Plain speak: client can identify what happens and who owns each action.
- Concision: no wrapper text repeats visible interaction content.
- AI responsibility: deterministic calculations are never attributed to LLM/AI.

- [ ] **Step 3: Create review document**

Use this structure:

```markdown
# Proposal Compression Comparison Prototype — Review

## Artifact boundary
## Source baseline
## ACT01 verdict
## ACT02 9-step preservation
## ACT03 ownership / evidence boundary
## ACT04 12-step / Concept Simulation boundary
## ACT05 Human / Rule Engine / AI boundary
## ACT06 organizational conclusion / proposed CTA
## Responsive / interaction review
## Unsupported-claim review
## Scope verification
## Verdict
```

`Verdict` may be PASS only if every source/proof/responsibility boundary remains intact and no `src/**` file changed.

- [ ] **Step 4: Commit review evidence**

```bash
git add docs/skill-tests/2026-08-12-proposal-compression-prototype-review.md
git commit -m "docs: review proposal compression comparison prototype"
```

---

### Task 5: Final verification and user-visible preview handoff

**Files:**
- Verify: complete branch diff against `e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`
- Generate outside repository: `/mnt/data/proposal-compression-prototype.html`
- Generate outside repository: `/mnt/data/proposal-compression-prototype.zip`

**Interfaces:**
- Consumes: verified repository prototype files.
- Produces: fresh Quality Gate evidence plus a local standalone review artifact; does not deploy or publish.

- [ ] **Step 1: Run full repository verification**

Run/fetch the same Quality Gate sequence used by the project:

```bash
npm ci
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected:
- offline contract tests PASS;
- project rules PASS;
- Svelte check 0 errors / 0 warnings;
- existing tests plus `proposalCompressionPrototypeContract.test.js` PASS;
- Copy Gate 0 findings or no new blocking finding;
- static build PASS;
- dependency vulnerability count is recorded separately and not silently fixed outside scope.

- [ ] **Step 2: Verify branch scope**

Compare:

```text
e04f1202188bf6894d4d8d4c9dcfa3b579e613e0...comparison/proposal-compression-prototype
```

Allowed paths are limited to:

```text
docs/superpowers/specs/2026-08-12-proposal-compression-comparison-prototype-design.md
docs/superpowers/plans/2026-08-12-proposal-compression-comparison-prototype.md
prototypes/proposal-compression/index.html
prototypes/proposal-compression/prototype.css
prototypes/proposal-compression/prototype.js
tests/proposalCompressionPrototypeContract.test.js
docs/skill-tests/2026-08-12-proposal-compression-prototype-review.md
```

Hard fail if any `src/**` path changed.

- [ ] **Step 3: Generate a single-file local preview**

Read the verified repository `index.html`, `prototype.css`, and `prototype.js`. Create `/mnt/data/proposal-compression-prototype.html` by replacing:

```html
<link rel="stylesheet" href="./prototype.css" />
```

with:

```html
<style>/* exact verified prototype.css content */</style>
```

and replacing:

```html
<script src="./prototype.js"></script>
```

with:

```html
<script>/* exact verified prototype.js content */</script>
```

Do not rewrite copy or behavior during this packaging step.

- [ ] **Step 4: Generate a ZIP review bundle**

Create `/mnt/data/proposal-compression-prototype.zip` containing:

```text
index.html
prototype.css
prototype.js
```

Use the exact verified repository contents.

- [ ] **Step 5: Final handoff**

Report:
- comparison branch and final head SHA;
- fresh Quality Gate run ID/result;
- prototype contract result;
- no `src/**` changes;
- no PR/merge/deploy performed for this prototype;
- links to the standalone HTML and ZIP review bundle.

Stop for user review. Prototype approval does not authorize formal `src/**` changes.

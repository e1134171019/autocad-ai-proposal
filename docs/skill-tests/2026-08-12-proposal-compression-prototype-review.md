# Proposal Compression Comparison Prototype — Review

Date: 2026-08-12  
Artifact: `comparison_prototype`  
Formal project: `false`  
Branch: `comparison/proposal-compression-prototype`  
Source baseline: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`

## Artifact boundary

PASS.

The prototype is isolated under `prototypes/proposal-compression/` and visibly labels itself:

- `COMPARISON PROTOTYPE`
- `formal_project: false`

It does not replace the Svelte site and does not modify formal `src/**` files.

## Source baseline

The prototype was built after re-reading the actual candidate source:

- `src/routes/+page.svelte`
- `src/lib/components/Act01Hero.svelte`
- `src/lib/components/Act02Flow.svelte`
- `src/lib/components/Act03Problem.svelte`
- `src/lib/components/Act04Solution.svelte`
- `src/lib/components/Act05Intelligence.svelte`
- `src/lib/components/Act06Summary.svelte`
- `src/lib/content/siteContent.js`

Protected source facts remain:

- six-act order remains unchanged;
- ACT02 current workflow remains 9 steps;
- ACT04 proposed workflow remains 12 steps;
- ACT04 remains a concept simulation rather than production proof;
- human engineering judgment remains responsible for construction-position / scope decisions;
- deterministic program/rule logic owns filtering, classification, length/quantity calculation and ignored reasons;
- AI Assistant queries, explains, summarizes and organizes already-calculated results;
- human confirmation remains explicit;
- workflow comparison is not presented as measured time evidence.

## ACT01 verdict

PASS.

Frontstage ownership is reduced to proposal orientation:

- title: `AI 施工圖驗算提案`;
- one short operating-scope lead;
- one responsibility-support line;
- current vs proposed workflow comparison;
- one bridge to the rest of the proposal.

The previous four-block background narrative is not repeated in the first layer. ACT01 does not explain the complete mixed-floor/version/object logic; that conclusion is owned by ACT03.

## ACT02 9-step preservation

PASS — 9/9 meaningful current-workflow steps remain in order:

1. 建商提供原始 CAD 圖面
2. 導入建商圖面與原始圖層
3. 判斷外部與深井的施工範圍
4. 沿施工範圍繪製線段或聚合線
5. 逐段從性質面板查看長度
6. 逐段建立尺寸與人工記錄
7. 人工加總外部與內部深井長度
8. 依長度人工換算施工數量
9. 調整線條、文字及圖面位置

The wrapper copy does not restate all nine steps; the interactive stepper carries that detail.

## ACT03 ownership / evidence boundary

PASS.

ACT03 owns the primary scope-control conclusion:

`真正問題不是加總，而是哪些物件該算`

The first-layer explanation is limited to mixed floors, areas, versions and reference objects. Six existing workflow-risk categories remain visible as evidence.

The section explicitly states:

`這裡比較的是作業步驟與風險，不代表實測工時。`

No measured time saving, ROI, percentage improvement, measured error reduction or customer outcome is introduced.

## ACT04 12-step / Concept Simulation boundary

PASS — 12/12 meaningful proposed-workflow steps remain in order.

The responsibility sequence remains visible:

- standard layers are established by the plugin/program;
- human judges construction position;
- drawing remains human-led and AI does not replace drawing;
- tool choice can carry standard layer / color / line-width settings;
- dedicated controls group common operations;
- selection defines the current calculation boundary;
- deterministic Rule Engine produces the result before AI query;
- result detail / numbering / ignored reasons are retained;
- AI Assistant uses already-calculated results;
- human confirms;
- output keeps traceable information.

The section visibly retains:

`Concept Simulation｜提案操作示意`

and states that the prototype does not mean AutoCAD API / real-DWG integration has already been completed or formally verified.

## ACT05 Human / Rule Engine / AI boundary

PASS.

The first layer gives the responsibility contract before detailed lists:

`程式依框選範圍、標準圖層與公司規則計算；AI 助理使用已完成的結果協助查詢、解釋與整理，最後由人員確認。`

The interactive responsibility controls preserve three distinct owners:

### Human

- construction-position / scope judgment;
- drawing;
- final result/output confirmation.

### C# / Rule Engine

- selection / layer filtering;
- CAD object and geometry reading;
- classification, length summing and quantity conversion;
- calculation basis and ignored reasons.

### AI Assistant

- query of completed results;
- explanation of classifications / ignored reasons / rules;
- result / anomaly summary;
- traceability / report-language organization.

Traceability remains explicit:

`Object → Layer → Selection Boundary → Rule → Result → Ignored Reason`

No deterministic engineering calculation is attributed to the AI Assistant.

## ACT06 organizational conclusion / proposed CTA

PASS.

The original organizational direction remains:

`經驗規則化 → 作業標準化 → 知識系統化`

The responsibility conclusion remains:

`人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

The commercial exit is visually separated and explicitly marked:

`PROPOSED NEXT ACTION / 尚未執行`

`下一步｜用實際施工圖確認驗證範圍`

The five-step next action is therefore presented as a proposal strategy, not as completed source fact.

## Responsive / interaction review

PASS at contract level.

The prototype includes:

- sticky ACT navigation;
- ACT02 9-step direct selection plus previous/next controls;
- ACT04 12-step direct selection plus previous/next controls;
- ACT05 responsibility switching;
- responsive CSS that collapses multi-column structures below 780 px;
- visible native focus states;
- no external API, authentication, analytics, upload or persistent-state dependency.

The final handoff will additionally package a standalone HTML file for browser review. That package does not change repository behavior.

## eden-engineering-copy strict review

### Fidelity

PASS. Protected process counts, responsibility owners, concept/proof status, layer/scope/rule terminology, traceability chain and human confirmation are intact.

### Evidence

PASS. No unsupported measured benefit, percentage, speed, ROI, customer-outcome or production-readiness claim is introduced.

### Plain speak

PASS. Each section answers a concrete client question: what the proposal is, how work is done now, where the real control problem is, how the proposed flow works, who calculates / explains / confirms, and what the next validation action would be.

### Anti-slop / concision

PASS for the prototype purpose. Wrapper copy is short and interaction carries workflow detail instead of prose repeating the same 9/12 steps. The ACT03 contrast title is retained because both sides name concrete engineering concepts (`加總` versus `哪些物件該算`) rather than serving as an empty promotional contrast.

### AI responsibility

PASS. AI is not presented as the owner of geometry reading, deterministic filtering, classification, summing or quantity conversion.

## Verification evidence before this review commit

Verified implementation head:

`ba418595a836c1ee9cbe210aa46182538804d048`

Quality Gate:

`31605703842` — success.

Observed:

- `npm ci`: existing 4 vulnerabilities remain (3 low, 1 high);
- offline contract tests: PASS;
- project rules: PASS;
- Svelte check: 0 errors / 0 warnings;
- Vitest: 24 test files / 124 tests PASS;
- `proposalCompressionPrototypeContract.test.js`: 6/6 PASS;
- Copy Gate: 0 findings;
- static build: PASS.

TDD RED evidence:

- commit: `d96de7ddfd50e440d246cefac3d7b18ed13a4dca`;
- Quality Gate: `31605146134` — expected failure;
- existing 23 test files / 118 tests passed;
- new prototype contract failed 6/6 because the prototype HTML/CSS/JS paths did not exist (`ENOENT`).

## Scope verification

Comparison before this review document:

`e04f1202188bf6894d4d8d4c9dcfa3b579e613e0...comparison/proposal-compression-prototype`

Changed paths were exactly:

- `docs/superpowers/specs/2026-08-12-proposal-compression-comparison-prototype-design.md`
- `docs/superpowers/plans/2026-08-12-proposal-compression-comparison-prototype.md`
- `prototypes/proposal-compression/index.html`
- `prototypes/proposal-compression/prototype.css`
- `prototypes/proposal-compression/prototype.js`
- `tests/proposalCompressionPrototypeContract.test.js`

This review document is the seventh approved path.

Hard-scope result:

- `src/**`: unchanged;
- `src/lib/charts/cadSimulator.js`: unchanged;
- `src/lib/components/CadProcess.svelte`: unchanged;
- PR #4: unchanged / not merged by this prototype work;
- `main`: unchanged;
- deployment: not performed;
- central Drive Skill registration: not modified.

## Verdict

**PASS as an isolated comparison prototype, pending fresh Quality Gate verification of this review commit and direct browser review by the user.**

This verdict does not authorize formal `src/**` modification, PR creation, merge or deployment.

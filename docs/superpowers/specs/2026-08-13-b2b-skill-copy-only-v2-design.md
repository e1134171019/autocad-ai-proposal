# B2B Skill Copy-Only V2 Design

Date: 2026-08-13
Status: approved by user command `執行`

## Context

This design supersedes the chapter-title and chapter-copy recommendations in `2026-08-13-proposal-messaging-copy-only-design.md`. All protected-behavior and copy-only constraints from that document remain binding.

The writing method is the user-provided **B2B 工業設備提案寫手 Skill**. It is applied as a writing framework, not as a requirement to add seven new website sections. The actual six-ACT project structure and existing animations remain the presentation baseline.

Proposal type: **問題導向型**.

## Hard scope

Only six ACT titles and surrounding chapter copy may change.

MUST NOT change:

- animation or D3 behavior;
- `src/lib/charts/cadSimulator.js`;
- `src/lib/charts/comparisonAnim.js`;
- `src/lib/charts/contextMap.js`;
- `src/lib/components/CadProcess.svelte`;
- component `<style>` blocks or `src/app.css`;
- ACT02 9-step labels, descriptions, order or count;
- ACT04 12-step labels, descriptions, order or count;
- `currentFlowNodes`, `futureFlowSteps`, `risks`, deterministic/AI responsibility arrays;
- geometry, layer, length, quantity or selection data;
- Concept Simulation disclaimer;
- ACT06 CTA prohibition from `src/AGENTS.md`.

No quote, delivery date, warranty term, percentage saving, measured time saving, ROI or customer outcome may be invented.

## Writing rules adopted from the user-provided Skill

- Traditional Chinese, formal but plain.
- Titles are declarative, not questions.
- Prefer concrete current-state actions, solution mechanics and evidence boundaries.
- Benefits must be quantified only when evidence exists. Without measurement, state design goal or measurement gap.
- Avoid promotional filler and banned expressions such as `此外`, `不僅如此`, `值得注意的是`, `無縫`, `賦能`, `深入探討`, `不斷演變`, `整合解決方案`, `全方位`, `卓越品質`.
- Each chapter wrapper should be concise; the existing project animation carries workflow detail.
- Human / Program / AI ownership must stay explicit.

## Approved six ACT titles and copy

### ACT01 — 我們的提案

Title:

`我們的提案`

Lead:

`將客戶現有的 AutoCAD 施工圖作業加入外掛工具，協助整理施工線長度、施工總長與元件數量。繪圖人員仍負責施工位置判斷與繪製；程式負責計算，AI 助理負責結果查詢、解釋與摘要。`

Workflow comparison:

- current: `繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點`
- proposed: `繪圖 → 框選施工範圍 → 程式整理長度與數量 → AI 助理查詢 → 人員確認`

Calculation precondition bridge:

- label: `計算前提`
- heading: `先確認本次要計算的樓層、區域與物件。`
- body: `同一個 DWG 可能包含不同樓層、施工區域、版本與參考物件。範圍與圖層先界定清楚，後續長度與數量才有一致的計算基準。`

ACT01 four supporting rows remain structurally present but are compressed to:

1. `客戶需求` — `完成施工範圍後，希望能直接取得每段長度、整張圖施工總長與指定元件數量。`
2. `提案內容` — `把驗算與結果查詢放進既有 AutoCAD 作業；施工判斷與繪製仍由繪圖人員負責。`
3. `計算條件` — `系統先依本次範圍、標準圖層與有效物件建立計算基準，再整理長度與數量。`
4. `流程基準` — `下一章完整呈現客戶目前的施工圖流程，作為後續方案比較基準。`

ACT01 six-card outline uses:

1. `我們的提案` — `說明這次要處理的 AutoCAD 驗算工作。`
2. `目前客戶的流程` — `呈現目前施工圖從判斷、繪製到加總的作業。`
3. `目前流程的問題` — `整理人工流程中的重複操作與作業風險。`
4. `我們的解決方案` — `呈現外掛在 AutoCAD 裡的預計操作方式。`
5. `計算方式與 AI` — `說明結果怎麼算，以及 AI 助理負責什麼。`
6. `預期成果` — `整理方案預期改善的作業內容與可重複規則。`

### ACT02 — 目前客戶的流程

Title:

`目前客戶的流程`

Lead:

`客戶目前從原始 CAD 圖面開始，由繪圖人員判斷施工範圍、繪製線段或聚合線，再逐段查看長度、建立標註、人工加總並換算施工數量。最後還需要整理線條、文字、尺寸與圖面位置。`

The existing 9-step animation is the detailed evidence. No step copy changes.

### ACT03 — 目前流程的問題

Title:

`目前流程的問題`

Lead:

`現行作業需要重複點選物件、查看長度、記錄、加總與複核。圖面同時存在不同樓層、施工區域或版本時，也必須確認哪些物件屬於本次計算範圍。這裡比較的是作業方式與可能發生的風險，實際工時差異仍需用相同圖面與相同條件量測。`

The existing manual-versus-proposed D3 comparison and six risk items remain unchanged.

### ACT04 — 我們的解決方案

Title:

`我們的解決方案`

Lead:

`外掛先建立標準圖層，繪圖人員依工程需求判斷施工位置並完成施工線繪製。完成後以框選範圍定義本次計算區域，程式依圖層、CAD 物件與公司規則整理長度及數量，再提供結果確認與 AI 助理查詢。`

The Concept Simulation disclaimer remains unchanged. The existing 12-step animation is the detailed evidence. No step copy changes.

### ACT05 — 系統計算方式與 AI 分工

Title:

`系統計算方式與 AI 分工`

Lead:

`框選範圍與標準圖層先決定本次哪些物件需要計算。C# 規則引擎負責篩選、分類、長度與數量計算，並保留未計入物件的原因；AI 助理只使用已完成的計算結果進行查詢、解釋與摘要，最後仍由人員確認。`

The existing deterministic responsibility list, AI responsibility list, context map and traceability fields remain unchanged.

### ACT06 — 專案效益與預期成果

Title:

`專案效益與預期成果`

Responsibility line remains:

`人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

Summary paragraph 1:

`這套方案的設計目標，是減少逐段查值、人工記錄、加總與重複複核，把施工範圍、圖層與計算方式整理成固定規則。實際節省的工時與改善幅度目前沒有量測數據，後續需使用相同施工圖與相同條件進行前後比較。`

Summary paragraph 2:

`繪圖人員負責工程判斷與最終確認；程式依標準圖層、框選範圍與公司規則計算，AI 助理使用既有結果協助查詢、解釋與摘要。`

Progression remains unchanged:

`經驗規則化 → 作業標準化 → 知識系統化`

Closing quote:

`將繪圖人員的工程經驗整理成公司可以保存、團隊可以沿用、程式可以執行的作業規則。`

No NEXT STEP or CTA is added in this scope.

## Navigation labels

Only the six `navItems` labels may change; brand stays unchanged.

Recommended labels:

- `我們的提案`
- `客戶流程`
- `流程問題`
- `解決方案`
- `計算與 AI`
- `預期成果`

## Evidence and responsibility gate

- Human:施工位置判斷、施工線繪製、最終確認。
- Program / C# Rule Engine: CAD 物件讀取、確定性篩選、分類、長度／數量計算、忽略原因、追溯資料。
- AI Assistant: 已計算結果的查詢、解釋、摘要與整理。
- Concept Simulation: proposal visualization only; not proof of completed production integration.
- ACT03/ACT06: no measured time-saving claim without same-drawing measurement evidence.

## Implementation and verification

Use RED → GREEN.

A dedicated copy-only contract must fail on the unmodified source and then pass after the approved text change.

Final verification must run:

- `npm run test:offline`
- `npm run verify:rules`
- `npm run check`
- `npm test`
- `npm run audit:copy`
- `npm run build`

Final diff against `e04f1202188bf6894d4d8d4c9dcfa3b579e613e0` must prove that source changes are limited to approved copy literals. Any animation logic, CSS, workflow step data or calculation behavior change is a hard fail.

## Delivery boundary

Stop on `feat/proposal-messaging-copy-only-v1` for user review. No PR, merge, deployment, `main` change or PR #4 modification is authorized.
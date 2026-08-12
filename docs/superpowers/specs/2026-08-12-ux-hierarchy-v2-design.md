# UX Hierarchy v2 — Client Comprehension Redesign

Date: 2026-08-12
Status: Approved direction, implementation pending spec review
Base: `main@d6b8c768add410a1549cfd352f1afa0e56c878dd`
Branch: `feat/ux-hierarchy-v2`

## 1. Problem

Client feedback identifies two comprehension failures:

1. Every chapter visually appears equally important because strong color, bold treatment, section scale, and animation are used too frequently.
2. The opening asks the reader to understand the proposal structure before the reader understands what the proposed AutoCAD tool actually does.

The current ACT 01 also contains a stale outline entry describing ACT 03 as a time-performance comparison, while ACT 03 has already been changed to a workflow comparison that explicitly does not claim measured time savings.

## 2. Design objective

A first-time client should be able to understand the core proposal from the first screen without needing to understand AI terminology, layer architecture, project phases, or all six ACT sections.

The intended first-screen mental model is:

`現行人工確認 → 框選施工範圍 → 系統整理長度與數量 → 人員確認結果`

The page should then progressively disclose why the problem is difficult, how the proposed workflow works, and how the result is verified.

## 3. Content hierarchy

The site-level narrative is reduced to four questions:

1. 你們現在怎麼算？
2. 現在真正容易出錯的是哪裡？
3. 外掛準備怎麼幫你算？
4. 最後你們怎麼確認結果？

ACT labels may remain as structural anchors for navigation and implementation, but they must not all compete as equal visual headlines.

### First screen

The first screen must explain the product before explaining the proposal structure.

Primary heading direction:

`AutoCAD 施工圖長度與數量自動驗算`

Supporting sentence direction:

`保留繪圖人員的工程判斷，把逐段查看長度、人工加總與數量清點交給外掛處理。`

A compact Before / After flow should be visible immediately:

Current:
`繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點`

Proposed:
`繪圖 → 框選施工範圍 → 系統整理長度與數量 → 人員確認`

The six-section proposal outline must not appear before this explanation. It may be moved below the first-screen explanation or reduced to a secondary navigation treatment.

## 4. Visual hierarchy rules

### Narrative pages

Use a mostly neutral palette.

- Main text and headings: foreground / neutral dark.
- Supporting text: secondary gray.
- Primary brand / interaction: one blue family.
- Section numbers and metadata: muted gray.
- Technical teal is not automatically applied to every AI phrase.
- Manual work is not automatically orange.
- Standard-layer terminology is not automatically green.

Color is reserved for state, interaction, or true engineering semantics rather than keyword emphasis.

### CAD simulator

CAD ByLayer and operational colors remain unchanged unless a specific usability defect is found.

The simulator may continue to use green/orange/red/selection colors because those colors encode drawing or state semantics.

This redesign must not flatten the CAD simulator into the narrative palette.

## 5. Highlight behavior

Narrative highlight spans in `CadProcess.svelte` must no longer create three competing semantic text colors for `ai`, `standard`, and `manual`.

Preferred behavior:

- Preserve the highlight data model so content contracts and simulator logic do not need broad rewrites.
- Render ordinary narrative highlights using weight and/or neutral foreground emphasis.
- Reserve colored emphasis for actual state/status UI, not prose taxonomy.

This keeps the data structure stable while changing visual priority.

## 6. ACT 01 restructuring

Current structure:

`六章目錄 → ACT 01 大標 → 需求 → 目標 → 難點 → 現況`

Target structure:

`一句話說明工具 → Before / After → 必要背景 → 次要章節導覽`

The existing long heading `客戶需求、目標、難點與現況入口` should not remain the dominant H1 because it describes information architecture rather than the client problem.

The opening should avoid requiring the client to parse terms such as `PROJECT CONTEXT`, `AI decision logic`, or the full six-section model before understanding the core proposal.

## 7. ACT 03 consistency fix

The ACT 01 outline must not contain the old claims:

- `工時差異`
- `AI 工具處理更快`
- `時間更穩定`

The outline must match the current ACT 03 semantics:

- workflow comparison
- no measured-time claim
- actual timing requires controlled measurement

## 8. Chapter weight

The page should no longer make ACT 01–06 equally dominant.

Visual importance order:

1. Problem / current operation
2. Proposed system solution
3. Verification / responsibility boundary
4. Supporting explanation and project summary

ACT labels remain useful for structure but become secondary metadata.

## 9. Out of scope

This change does not:

- change CAD calculation rules
- change selection logic
- change AutoCAD simulator animations
- change layer names
- change measured values or quantities
- add Ollama or LLM runtime behavior
- redesign the technical architecture
- upgrade dependencies
- merge directly into `main`

## 10. Test contract

Implementation must follow RED → GREEN.

Add or update tests before production changes to assert at minimum:

1. ACT 01 first-screen content contains the concrete AutoCAD length / quantity proposition.
2. The first-screen Before / After flow contains the approved current and proposed sequences.
3. The six-section outline is not rendered before the primary explanation.
4. Stale ACT 03 time-performance copy is absent.
5. Narrative semantic classes do not assign separate blue/green/orange text colors for ordinary AI / standard / manual keyword emphasis.
6. CAD simulator layer/state color tokens remain present.
7. Existing protected technical terms and content contracts continue to pass.
8. Copy Gate remains at zero findings or any new finding is explicitly resolved before PR integration.

## 11. Verification

Before integration, run the repository's existing quality gates:

- `npm run test:offline`
- `npm run verify:rules`
- `npm run check`
- `npm test`
- `npm run audit:copy`
- `npm run build`

The redesign is successful only if technical regression tests stay green and the rendered opening has one obvious visual entry point.

## 12. Research basis and GPT review

Independent research routes were used as upstream evidence: Exa, Tavily, and Sider Scholar. Firecrawl was attempted but unavailable for this task and its failed result was not used.

Common findings accepted after GPT cross-review:

- excessive equal-strength contrast weakens visual hierarchy;
- color should communicate functional meaning rather than make many prose fragments compete for attention;
- unfamiliar pages are scanned before they are read in detail;
- the opening should communicate the site's purpose before exposing secondary structure;
- progressive disclosure is appropriate for an information-heavy engineering proposal;
- lower visual complexity improves initial comprehension and first impression.

These findings support the client feedback but do not replace direct client testing. The client feedback remains the primary project-specific evidence.

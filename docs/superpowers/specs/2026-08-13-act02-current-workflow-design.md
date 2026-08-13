# ACT02 Current Workflow Design

## Goal

Reframe ACT02 so a customer can understand the existing manual AutoCAD workflow without changing or recreating the current CAD animation implementation.

## Scope

ACT02 continues to reuse the existing `main` workflow implementation inherited by the feature branch:

- `Act02Flow.svelte`
- `CadProcess.svelte`
- `currentFlowNodes`
- `cadSimulator.js`
- the existing 01–09 order and `animType` values

The animation implementation itself is out of scope. `src/lib/charts/cadSimulator.js` must not be modified.

## Customer-facing copy

Eyebrow:

`ACT 02 / CURRENT WORKFLOW`

Title:

`目前施工圖作業流程`

Lead:

`從建商圖面導入、施工範圍判斷與繪製，到逐段查看長度、建立標註、整理總長與施工數量，依目前作業方式逐步呈現。`

## Three-stage structure

The existing nine steps remain in the same order and are grouped only for reading context:

1. `準備與判斷` — steps 01–03
2. `繪製與標註` — steps 04–06
3. `整理與確認` — steps 07–09

The active stage is shown beside the existing active step. This is presentation metadata only and does not alter animation state or step navigation.

## Step copy

1. `建商提供原始 CAD 圖面`
   - `確認本次施工樓層與圖面版本。`
2. `導入建商圖面`
   - `將原始 CAD 圖面作為施工位置判斷與後續繪製的底圖。`
3. `判斷施工範圍`
   - `由繪圖人員依工程需求判斷外部與深井需要施工的位置。`
4. `繪製施工線`
   - `沿施工範圍逐段繪製線段或聚合線。`
5. `逐段查看長度`
   - `繪圖完成後，需要逐段點選施工線，從 AutoCAD 性質面板查看每一段長度。`
6. `逐段建立尺寸標註`
   - `每一段施工線再分別建立尺寸，將長度標示在圖面上。`
7. `人工整理施工總長`
   - `將各段長度分別記錄，再整理外部、深井與本次施工總長。`
8. `人工整理施工數量`
   - `依公司的施工條件，換算或清點需要的施工元件數量。`
9. `完成圖面整理`
   - `最後確認尺寸、文字與圖面位置，完成本次施工圖整理。`

## Copy principles

- Do not call the customer `貴司` in the ACT02 title.
- Do not claim measured time savings, speed improvement, error-rate reduction, or stable timing.
- Do not state that AI replaces engineering judgment.
- Do not introduce ACT04 solution mechanics such as box-selection calculation, standard-layer classification, AI assistant workflow, or automatic result panels in ACT02.
- Let the repeated manual interaction shown by the existing animation demonstrate the operational burden instead of adding accusatory copy such as `漏點、重複計算或漏算`.

## Implementation boundary

ACT02 presentation copy is layered over the existing `currentFlowNodes` animation metadata. The base step IDs, order, animation types, and selection behavior remain untouched. `CadProcess.svelte` receives optional stage metadata; ACT04 does not pass stage metadata and therefore keeps its current presentation and behavior.

## Acceptance criteria

- ACT02 displays the new eyebrow, title, lead, three-stage context, and revised nine-step copy.
- Existing 01–09 navigation remains available.
- Existing ACT02 animation types remain `static`, `static-sheets`, `static-zones`, `draw`, `manual-inspect`, `manual-label-slow`, `sum`, `quantity-slow`, `adjust` in the same order.
- ACT02 still contains no box-selection state.
- ACT04 behavior and content are unchanged.
- `src/lib/charts/cadSimulator.js` is absent from the branch diff for this ACT02 change.
- Full quality checks pass before preview deployment.

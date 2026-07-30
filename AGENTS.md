# AGENTS.md — 前端規範
> 版本：v5.9.4｜工程經驗規則化總結｜ACT 04 人工繪製語意｜關鍵字配色修正｜移除 NEXT STEP CTA｜保留 v5.9.2 全部流程契約

## 角色
繁體中文 Svelte 5 前端工程師。
改程式前先說明要做什麼、怎麼拆、怎麼驗證。

---

## 環境規則
- 框架：Svelte 5 + D3 + Vite
- 套件管理：Windows 優先使用 npm.cmd；Mac/Linux 可使用 npm 或 pnpm
- Node 版本：≥ 20
- 終端機：
  Windows → PowerShell
  Mac/Linux → bash/zsh
- 路徑分隔符號一律用 /

---

## 從零開始時
先確認以下存在，沒有就建立：

```
src/
├── lib/
│   ├── components/
│   │   ├── Nav.svelte
│   │   ├── Act01Hero.svelte
│   │   ├── Act02Flow.svelte
│   │   ├── Act03Problem.svelte
│   │   ├── Act04Solution.svelte
│   │   ├── Act05Intelligence.svelte
│   │   ├── Act06Summary.svelte
│   │   ├── CadProcess.svelte
│   │   ├── CadDockedPanel.svelte
│   │   └── CadAiAssistant.svelte
│   ├── charts/
│   │   ├── cadSimulator.js
│   │   ├── comparisonAnim.js
│   │   └── contextMap.js
│   ├── stores/
│   │   └── appState.js
│   └── tokens.css
├── routes/
│   └── +page.svelte
└── app.css
```

---

## 視覺主題原則

- 本專案預設採用 **Light-first 淺色主題**。
- 網站主要用途是客戶提案、流程說明與工程資訊閱讀，不是程式編輯器、監控後台或電競介面。
- 一般敘事區、標題區、流程區、效益區及行動呼籲區必須使用淺色背景。
- 頁面主背景禁止使用純黑、近黑或大面積深灰。
- 深色只允許出現在 AutoCAD 模擬器、程式終端、結果面板等技術展示區。
- 深色技術區必須被淺色頁面包覆，不得延伸成整頁背景。
- 視覺調性：暖米白、工程感、清楚、可信任、可閱讀。
- 禁止因專案包含 CAD、AI、工程等關鍵字，自動推導為全黑科技風、駭客風或霓虹風。
- 不以漸層、發光、玻璃擬態或高飽和色塊製造科技感；科技感由資訊結構、線條、幾何、數據與互動建立。

---

## Design Token（必須完整定義）

```css
:root {
  /* 頁面與表面：2026 暖米白 Light-first */
  --background:         #FAFAF8;   /* Pantone Cloud Dancer 方向，暖米白 */
  --bg-surface:         #FFFFFF;
  --bg-overlay:         #F1F0ED;   /* 暖調區塊底色 */
  --bg-subtle:          #F8F7F4;

  /* 文字 */
  --foreground:         #0F172A;   /* 18.9:1 on 暖白，AAA */
  --text-secondary:     #475569;   /* 5.9:1，AA pass */
  --text-muted:         #94A3B8;
  --text-disabled:      #CBD5E1;

  /* 品牌與互動：B2B Trust 藍 */
  --primary:            #2563EB;
  --primary-hover:      #1D4ED8;   /* 5.9:1 on white，AA pass */
  --primary-subtle:     #EFF6FF;
  --primary-foreground: #FFFFFF;

  /* 工程與 AI 輔助色：2026 Teal */
  --technical:          #0D9488;   /* Teal-600，AI 輔助信號色 */
  --technical-subtle:   #F0FDFA;

  /* 狀態色 */
  --success:            #15803D;
  --warning:            #B45309;
  --danger:             #DC2626;

  /* 結構：暖調邊框 */
  --border:             #E2E8F0;
  --border-strong:      #CBD5E1;

  /* AutoCAD 風格介面框架：低彩度深灰 */
  --cad-chrome-background:  #1C2229;
  --cad-toolbar-background: #252B32;
  --cad-panel-background:   #252B32;
  --cad-command-background: #191E24;
  --cad-foreground:         #F2F4F7;
  --cad-secondary:          #AAB4C0;
  --cad-border:             #3A444F;

  /* 模型空間：刻意採淺灰畫布，優先確保提案投影與圖面區域辨識 */
  --cad-canvas-background:  #E7E8E5;
  --cad-canvas-grid:        #D3D6D2;
  --cad-building-primary:   #66717B;
  --cad-building-secondary: #9BA3AA;
  --cad-layer-wall:         #66717B;
  --cad-layer-equipment:    #7C858D;
  --cad-layer-reference:    #929AA1;
  --cad-layer-opening:      #7C858D;

  /* ByLayer 施工與標註語意色 */
  --cad-layer-exterior:     #3D7A3A;
  --cad-layer-shaft:        #C65D21;
  --cad-layer-support:      #7C858D;
  --cad-layer-component:    #7C858D;
  --cad-layer-dimension:    #D62828;
  --cad-layer-ignored:      #929AA1;

  /* 操作狀態色：不得覆蓋圖層原色 */
  --cad-selection:          #C88B17;
  --cad-selection-fill:     rgb(200 139 23 / 10%);
  --cad-hover:              #0F6E91;
  --cad-grip:               #0891B2;
  --cad-error:              #DC2626;

  /* 深色結果與 AI Docked Panel */
  --cad-result-background:  #20252B;
  --cad-result-foreground:  #F8FAFC;
  --cad-result-secondary:   #CBD5E1;
  --cad-result-value:       #BFDBFE;

  /* 頁面內容寬度 */
  --content-standard-max-width: 1200px;
  --content-wide-max-width:     1680px;
  --content-side-padding:       32px;

  /* CAD 介面尺寸 */
  --cad-toolbar-height:          32px;
  --cad-ribbon-height:           92px;
  --cad-command-height:          24px;
  --cad-property-width:          200px;
  --cad-min-width-desktop:       860px;
  --cad-min-width-tablet:        720px;
  --cad-min-height-desktop:      620px;
  --cad-min-height-tablet:       520px;
  --cad-cursor-size:              18px;
  --cad-grip-size:                6px;

  /* CAD 字型尺寸 */
  --cad-font-size-command:       11px;
  --cad-font-size-label:         11px;
  --cad-font-size-value:         12px;
  --cad-font-size-dimension:     10px;

  /* CAD 線條尺寸與中階工程線型 */
  --cad-line-width-building:     1px;
  --cad-line-width-hidden:       0.8px;
  --cad-line-width-center:       0.8px;
  --cad-line-width-dimension:    1.2px;
  --cad-line-width-outline:      1px;
  --cad-line-width-construction: 1.5px;
  --cad-line-width-selected:     2px;
  --cad-linetype-hidden:         3 3;
  --cad-linetype-center:         8 3 2 3;
  --cad-hatch-spacing:           7px;

  /* 字型 */
  --font-display: 'JetBrains Mono', monospace;
  --font-body:    'Inter', sans-serif;

  /* 間距 */
  --space-1: 8px;
  --space-2: 16px;
  --space-3: 24px;
  --space-4: 32px;

  /* 圓角 */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;

  /* 動畫 */
  --duration-instant:   0ms;
  --duration-fast:      150ms;
  --duration-normal:    250ms;
  --duration-slow:      400ms;
  --cad-playback-rate:             0.5;
  --duration-cad-cell:              90ms;
  --duration-cad-draw:              850ms;
  --duration-cad-panel:             500ms;
  --duration-cad-adjust:            700ms;
  --duration-cad-cursor-move:       600ms;
  --duration-cad-selection-drag:    900ms;
  --duration-cad-selection-feedback: 350ms;
  --duration-cad-matrix-scan:       420ms;
  --duration-cad-matrix-cell:       520ms;
  --duration-cad-label-reveal:      480ms;
  --duration-cad-click-feedback:    180ms;
  --duration-ai-panel:              var(--duration-normal);

  --ease-linear:  linear;
  --ease-out:     cubic-bezier(0, 0, .5, 1);
  --ease-in-out:  cubic-bezier(.5, 0, .5, 1);
  --ease-spring:  cubic-bezier(.5, 1, .75, 1.25);

  /* RWD */
  --bp-sm:        480px;
  --bp-md:        768px;
  --bp-lg:        1024px;
  --bp-cad-stack: 1200px;
  --bp-xl:        1280px;
  --bp-wide:      1440px;
}
```

---

## 配色角色規則

- `--background`：整體頁面背景，只用於最外層畫布。
- `--bg-surface`：主要內容區、導覽列、表格、文字內容及主要互動區。
- `--bg-overlay`：次要區塊、提示區、步驟背景與區段分隔。
- `--bg-subtle`：非常輕微的背景層次，不得取代主要內容表面。
- `--foreground`：主標題、段落標題與主要正文。
- `--text-secondary`：補充說明、描述文字與次要資訊。
- `--text-muted`：編號、時間、標籤及非必要輔助資訊，禁止用於長段正文。
- `--text-disabled`：停用狀態，禁止用於一般可閱讀內容。
- `--primary`：主要按鈕、目前步驟、連結、焦點及主要操作狀態。
- `--primary-subtle`：品牌色的低強度背景，不得作為大面積頁面底色。
- `--technical`：AI、CAD 分析、工程資訊與技術提示。
- `--technical-subtle`：技術提示的淡色背景。
- `--success`、`--warning`、`--danger`：只用於成功、警告、錯誤或風險語意，不得作為裝飾色。
- `--border`：一般分隔線與元件邊界。
- `--border-strong`：需要明確區隔的邊界、聚焦區或表格外框。
- `--cad-chrome-background`、`--cad-toolbar-background`、`--cad-panel-background`、`--cad-command-background`：AutoCAD 介面框架與 Docked Panel，使用低彩度深灰。
- `--cad-canvas-background`、`--cad-canvas-grid`：模型空間畫布與格線，必須與介面框架分離。
- `--cad-building-primary`、`--cad-building-secondary`：原始建築輪廓，不得搶過施工圖層。
- `--cad-layer-*`：ByLayer 施工語意色；同一施工類型在圖面、圖例及結果面板中必須一致。
- `--cad-selection`、`--cad-hover`、`--cad-grip`、`--cad-error`：操作狀態色，只能疊加於原圖層，不得取代圖層原色。
- `--cad-result-*`：計算結果與 AI Docked Panel 的文字及數值。
- 所有 `--cad-*` Token 只允許用於 AutoCAD 模擬器、終端、Docked Panel 與 SVG 技術展示。
- 同一畫面最多使用一個主要品牌色與一個技術輔助色；狀態色不計入，但必須有真實語意。
- 一般內容區以中性色為主，彩色只用於操作焦點、技術資訊與狀態提示。

---

## 可讀性與對比規則

- 一般正文與背景的色彩對比至少符合 WCAG AA 4.5:1。
- 大型文字與背景的色彩對比至少符合 WCAG AA 3:1。
- 主要正文必須使用 `--foreground` 或 `--text-secondary`。
- `--text-muted` 禁止用於主要段落、功能說明或驗收內容。
- 禁止使用降低 opacity 的方式製造次要文字；應改用對應文字 Token。
- 不得只靠顏色傳遞成功、警告、錯誤、選取或異常狀態，必須搭配文字、圖示、線型或位置差異。
- 深色 CAD 區內只能使用 `--cad-foreground`、`--cad-secondary` 等專用 Token。
- Hover、focus、active 與 disabled 必須有可辨識差異，且 focus 不得只依靠顏色變化。

---

## 核心規則

- `.svelte` 檔不超過 150 行
- `<script>` / `<style>` / template 各不超過 50 行
- 每個元件只做一件事
- 禁止跨元件直接操作 DOM
- `+page.svelte` 只負責組裝元件，禁止寫邏輯
- 副作用（fetch、IO）只在元件的事件處理或 `onMount` 裡，禁止在 module scope

---

## D3 規則

- D3 邏輯全部集中於 `src/lib/charts/*.js`
- function 簽名統一：`(container, data, options) => void`
- `.svelte` 只負責呼叫，禁止在 `.svelte` 內寫 D3 細節
- 禁止在 `charts/*.js` 裡 import store 或操作 DOM 以外的東西
- D3 可透過 `options.onSelectionChange(selection)` 回傳框選結果，但不得自行修改 Svelte store。
- 真實 `<textarea>`、送出按鈕、Docked Panel 分頁與對話紀錄必須由 Svelte 元件負責，不得用 SVG 假造輸入控制項。
- 每個 chart function 的 `data` 結構必須在檔案頭 `// 輸入：` 定義清楚

---

## Store 規則

- 跨元件共享狀態 → `appState.js`（`$writable`）
- `activeSelection`、目前圖面身分與 AI 查詢上下文屬於跨元件共享狀態。
- AI 輸入文字、焦點、textarea 高度等局部 UI 狀態使用 `$state`（local）。
- `activeSelection` 至少包含 `id`、`objectIds`、`drawingId`、`floor`、`area`、`version`、`isReady`。
- 禁止在 `charts/*.js` 裡直接 import store。
- 禁止在 `+page.svelte` 裡直接寫 store 邏輯。

---

## CAD 互動元件責任分工

- `CadProcess.svelte`：組裝 CAD 模擬器、流程步驟與 Docked Panel，接收 D3 框選 callback。
- `cadSimulator.js`：繪製模型空間、幾何物件、十字游標、框選動畫、Grip 與選取回饋。
- `CadDockedPanel.svelte`：管理「屬性」「人工記錄」「計算結果」「AI 助理」分頁。
- `CadAiAssistant.svelte`：提供真實 `<textarea>`、建議問題、送出、loading、回覆及來源摘要。
- `appState.js`：保存目前 `activeSelection` 與圖面上下文；不保存 D3 DOM。
- D3 → Svelte 的資料流只能透過 callback；Svelte → AI 助理只能透過 props 或 store。

```text
D3 框選完成
→ options.onSelectionChange(selection)
→ CadProcess 更新 activeSelection
→ CadDockedPanel 更新選取摘要
→ CadAiAssistant 依 isReady 解除鎖定
```

---

## 動畫規則

- 所有 duration 與 easing 必須使用 Token，禁止 hardcode 數值
- 動畫必須有說明目的，禁止裝飾性動畫
- `transition` 寫法範例：
  `transition: opacity var(--duration-normal) var(--ease-out);`

---

## RWD 規則

- breakpoint 數值禁止 hardcode，必須定義為 Token。
- Media query 使用時加註 Token 來源，例如：
  `@media (max-width: 1199px) { /* --bp-cad-stack */ }`
- RWD 行為必須在元件內部處理，禁止跨元件傳遞螢幕寬度。
- `--bp-wide` 以上：ACT 02／ACT 04 採左側 40%、右側 60%，兩欄上緣與最小高度一致。
- `--bp-cad-stack` 至 `--bp-wide`：ACT 02／ACT 04 採左側 38%、右側 62%。
- 低於 `--bp-cad-stack`：改為上下排列，說明文字在上，CAD 模擬器在下。
- 不得為了維持雙欄而壓縮 CAD 模擬器；當兩欄無法同時容納說明區、間距與 CAD 最小寬度時，必須提前切換上下排列。
- 平板版 CAD 模擬器內部最小寬度使用 `--cad-min-width-tablet`，外層技術區才允許水平捲動。
- 手機版右側 Docked Panel 改置於繪圖區下方，仍屬模擬器內部，不得隱藏。
- 上一步與下一步按鈕在窄螢幕維持雙欄排列；低於 `--bp-sm` 時可改為上下排列，按鈕不得互相重疊。

---

## 樣式規則

- 顏色、字型、間距、動畫全用 CSS Token。
- 元件 `<style>` 只寫該元件自身樣式。
- 全域樣式只在 `app.css`。
- 禁止 hardcode 任何 hex 色碼。
- 禁止使用 Token 以外的字型。
- 頁面級 section 預設只能使用 `--background`、`--bg-surface`、`--bg-overlay` 或 `--bg-subtle`。
- 一般 section 不得使用 `--cad-chrome-background`、`--cad-canvas-background`、`--cad-panel-background` 或其他 `--cad-*` Token。
- 深色技術面板必須具備明確邊界、標題或工具列，使讀者能辨識它是嵌入式工具介面。
- 不使用陰影取代資訊層級；優先用背景明度、邊界、留白與排版建立結構。
- 彩色面積必須克制，避免大面積藍色、青色、綠色或高飽和色底。

---

## 寬版內容容器規則

- 一般敘事型 section 使用 `--content-standard-max-width`。
- ACT 02 與 ACT 04 屬於寬版互動區，必須使用 `--content-wide-max-width`。
- 寬版互動區的可用寬度必須扣除左右 `--content-side-padding`，不得以固定像素寬度鎖死整個 section。
- ACT 02／ACT 04 不得套用文章段落、首頁敘事區或一般資訊區的窄版容器。
- 寬版互動區應水平置中；當視窗大於最大寬度時，只增加外側留白，不放大 CAD 內部線條與文字。
- 左側說明欄必須使用 `minmax(320px, 1fr)` 類型的可縮放結構，禁止以固定寬度擠壓右側 CAD 模擬器。
- 右側 CAD 欄必須使用 `minmax(0, 1fr)`，並由 CAD 容器自己的最小寬度控制可讀性。
- 桌機版 ACT 02／ACT 04 不得出現整個 section 的水平捲軸。

---

## CAD 模擬器容器規則

- `--bp-wide` 以上，CAD 模擬器最小寬度使用 `--cad-min-width-desktop`，最小高度使用 `--cad-min-height-desktop`。
- `--bp-cad-stack` 至 `--bp-wide`，CAD 模擬器仍須完整顯示右側 Docked Panel；若剩餘寬度不足，必須切換上下排列，不得裁切面板。
- 低於 `--bp-cad-stack`，CAD 模擬器最小寬度使用 `--cad-min-width-tablet`，最小高度使用 `--cad-min-height-tablet`。
- 右側 Docked Panel 寬度固定使用 `--cad-property-width`，不得因外層縮小而變成不可閱讀的窄欄。
- 桌機版 CAD 模擬器禁止預設顯示水平捲軸；水平捲動只允許出現在低於 `--bp-cad-stack` 的技術區外層。
- CAD 工具列、繪圖區、Docked Panel 與命令列必須全部位於同一個可見邊界內。
- Docked Panel 的右邊框必須完整可見，不得被父層 `overflow: hidden`、固定寬度或 SVG viewBox 裁切。
- SVG 的 viewBox、實際容器寬度與 Docked Panel 寬度必須使用同一組尺寸來源，禁止各自計算造成右側被吃掉。
- 繪圖區可隨容器擴張；Docked Panel、工具列高度與命令列高度不得跟著比例縮放。
- 在 1920×1080、1440×900、1366×768 三種桌機尺寸下，ACT 02／ACT 04 都必須完整顯示工具列、繪圖區、Docked Panel 與命令列。

---

## CAD 模擬器規範（cadSimulator.js 專用）

### 定位
ACT 02 與 ACT 04 的右側模擬器是用 D3 + SVG 模擬 AutoCAD 介面外觀。
不連接真實 AutoCAD .NET API，不讀取真實 CAD 檔案。
目的是讓客戶在瀏覽器裡看懂操作流程，不是交付可執行系統。
模擬器必須優先保證完整介面與可讀性，不得為配合窄欄而等比例縮小整個 CAD 畫面。

### 介面結構
AutoCAD 真實佈局，嚴格遵守：
```
┌─────────────────────────────────────────────┐
│ 工具列（高度：--cad-toolbar-height）          │
├──────────────────────────┬──────────────────┤
│                          │ 右側 Docked Panel │
│   繪圖區（主體）         │（寬度：           │
│                          │ --cad-property-width）
├──────────────────────────┴──────────────────┤
│ 命令列（高度：--cad-command-height）          │
└─────────────────────────────────────────────┘
```
- 禁止浮動視窗。
- 右側區域一律為 Docked Panel，可在「屬性」「人工記錄」「AI 助理」分頁間切換，不得覆蓋繪圖區。
- ACT 02 節點 06–08：繪圖區保留，右側 Docked Panel 切換為人工記錄表，模擬逐格輸入、SUM 加總與數量換算。
- ACT 04 步驟 10：右側 Docked Panel 切換為 AI 助理分頁，不得另外建立浮動視窗或遮罩。
- 禁止圓角邊框（`border-radius: 0` 強制）。
- 禁止陰影（`box-shadow: none` 強制）。
- 禁止漸層背景。
- 所有邊框一律使用 `var(--cad-line-width-outline) solid var(--cad-border)`。

### 顏色與分層
- CAD 配色採「深色介面框架 × 淺灰模型空間 × ByLayer 施工語意色 × 獨立操作狀態色」。
- 淺灰模型空間是刻意的提案設計取捨，不追求原生 AutoCAD 深色畫布的完整還原；目的是在 Light-first 網站、投影與會議螢幕上清楚辨識圖面區域。
- 原生 CAD 感必須由 Ribbon、格線、Properties、Command Line、實線、隱藏線、中心線與 Hatch 建立，不得靠高密度彩色圖層堆疊。
- 介面框架、模型空間、圖層物件、選取狀態與結果面板必須分開管理，不得用一個顏色 Token 控制全部區域。
- 只能使用 `--cad-*` Token，禁止 hardcode 任何 hex。
- 禁止在 CAD 區使用一般頁面 Token（`--background`、`--foreground` 等）。

| 區域 | Token |
|------|-------|
| 外部框架 | --cad-chrome-background |
| 工具列 | --cad-toolbar-background |
| 右側 Docked Panel | --cad-panel-background |
| 命令列 | --cad-command-background |
| 模型空間背景 | --cad-canvas-background |
| 模型空間格線 | --cad-canvas-grid |
| 主要建築輪廓 | --cad-building-primary |
| 次要建築輪廓 | --cad-building-secondary |
| 外部施工線 | --cad-layer-exterior |
| 深井施工線 | --cad-layer-shaft |
| 補強／支撐線 | --cad-layer-support |
| 元件／圖塊 | --cad-layer-component |
| 框選範圍 | --cad-selection |
| Hover 預選 | --cad-hover |
| Grip 節點 | --cad-grip |
| 異常提示 | --cad-error |
| 結果／AI 面板底色 | --cad-result-background |
| 結果主要文字 | --cad-result-foreground |
| 結果次要文字 | --cad-result-secondary |
| 結果數值 | --cad-result-value |

### CAD 幾何語意配色
- CAD 圖面不得只使用單一品牌藍表示所有幾何物件。
- 原始建築圖面使用低彩度中性色，不得搶過施工範圍。
- 外部施工聚合線固定使用 `--cad-layer-exterior`。
- 深井施工聚合線固定使用 `--cad-layer-shaft`。
- 模擬器不還原所有原始 CAD 彩色圖層；未參與本次計算的底圖物件統一使用低彩度中性色。
- 框選、Hover、Grip 與錯誤提示是操作狀態，不得改變施工物件原本圖層顏色。
- 同一施工類型在模型空間、圖例、Docked Panel 與報告預覽中必須使用一致顏色。
- 不得只靠顏色辨識施工類型；圖層名稱、線型、圖例或文字標籤至少保留一項。

### 幾何線條
| 用途 | 線寬 Token | 線型 | line-cap |
|------|------------|------|----------|
| 原始建築輪廓 | --cad-line-width-building | solid | square |
| 隱藏線／開口 | --cad-line-width-hidden | dashed(3,3) | square |
| 軸線／中心線 | --cad-line-width-center | dash-dot(8,3,2,3) | square |
| 牆體剖面 | --cad-line-width-building | 45° SVG Hatch，固定間距 | — |
| 外部／深井施工聚合線 | --cad-line-width-construction | solid | square |
| 紅色 AI-DIM 尺寸線與引線 | --cad-line-width-dimension | solid | square |
| 框選邊界 | --cad-line-width-selected | dashed(6,4) | square |
| Hover／Grip | --cad-line-width-selected | solid | square |
| 異常外框 | --cad-line-width-selected | dashed(4,3) | square |

- 原始建築輪廓不得粗於施工聚合線。
- 施工聚合線必須比原始建築輪廓明顯，但禁止所有線條使用相同線寬。
- 框選與選取狀態以外框、Grip 或輔助線疊加，禁止把被選物件直接改成黃色。
- 實線、隱藏線、中心線、聚合線與尺寸線的 line-cap 一律 square；Hatch 由 SVG pattern 重複填充。
- 禁止模糊、發光或陰影效果。

### 字型與數字
- CAD 區所有文字一律 `--font-display`（JetBrains Mono）
- 禁止任何 sans-serif 字型出現在 CAD 區

| 用途 | 字型尺寸 Token | 粗細 |
|------|----------------|------|
| 命令列文字 | --cad-font-size-command | 400 |
| 屬性面板標籤 | --cad-font-size-label | 400 |
| 屬性面板數值 | --cad-font-size-value | 600 |
| 圖面標注文字 | --cad-font-size-dimension | 400 |

- 所有使用者可見的長度一律顯示兩位小數，單位固定為 `cm`。
- 正確範例：`384.25 cm`。
- 數值與單位之間固定保留一個半形空格。
- 禁止在介面中顯示 `mm`、單獨的 `m` 或混用「公分／厘米／CM」等不同寫法。
- 禁止四捨五入到整數。

### 長度單位與轉換規範

- 網站的唯一顯示單位為 `cm`；圖面標註、Properties、人工記錄表、分類小計、AI 回覆、確認結果與 PDF 預覽必須一致。
- 不得直接假設 AutoCAD 原始數值一定是毫米；必須先取得圖面的 drawing unit，再正規化為公分。
- 原始圖面單位為 `mm` 時：`lengthCm = lengthMm / 10`。
- 原始圖面單位為 `cm` 時：數值保持不變。
- 原始圖面單位為 `m` 時：`lengthCm = lengthM * 100`。
- 顯示格式統一使用 `Intl.NumberFormat('zh-TW', { minimumFractionDigits: 2, maximumFractionDigits: 2 })`，再附加 ` cm`。
- 轉換與格式化必須由單一純函式負責，禁止各元件自行換算或拼接單位。
- 建議純函式命名：`convertLengthToCentimeters`、`formatLengthInCentimeters`。
- 正確轉換範例：原始 `3842.50 mm` 顯示為 `384.25 cm`；原始 `16.6 m` 顯示為 `1,660.00 cm`；原始 `21.6 m` 顯示為 `2,160.00 cm`。
- 自動測試必須同時覆蓋 `mm → cm`、`cm → cm` 與 `m → cm`，不得只測毫米路徑。
- 若圖面單位未設定、無法辨識或不受支援，禁止顯示推測數值；應顯示：`圖面單位未設定，請先確認單位。`
- `activeSelection.isReady === true` 必須同時代表：已選取至少一個有效物件，且圖面單位已成功解析。
- 匯出報告必須在欄位標題或每筆數值中清楚標示 `cm`，不得在同一份報告混用其他長度單位。

### 動畫行為
| 動畫類型 | duration Token | easing Token | 說明 |
|----------|----------------|--------------|------|
| 線條繪製出現 | --duration-cad-draw | --ease-linear | 線段從起點延伸到終點 |
| 數字跳動計數 | --duration-cad-cell | --ease-linear | 模擬逐格輸入的繁瑣感 |
| 游標移動 | --duration-cad-cursor-move | --ease-in-out | 十字游標移到框選起點 |
| 框選拖曳 | --duration-cad-selection-drag | --ease-linear | 選取框跟隨游標即時展開 |
| 選取回饋 | --duration-cad-selection-feedback | --ease-out | 顯示 Grip、物件亮顯與面板更新 |
| 選取高亮 | --duration-instant | --ease-linear | 模擬 CAD 即時反應 |
| 節點切換淡入 | --duration-cad-panel | --ease-out | 切換到下一個節點時 |

- 禁止 `--ease-spring` 用在 CAD 區（過於卡通）
- 禁止裝飾性動畫（每個動畫必須對應流程說明目的）

### 節點動畫策略
```
節點 01–03（靜態為主）
→ 右側只顯示圖面結構
→ 建築輪廓線靜態出現即可
→ 無需複雜動畫

節點 04（線條出現）
→ 聚合線從起點延伸繪出
→ `--duration-cad-draw`，`--ease-linear`

節點 05（滑鼠框選）
→ 十字游標移到起點，顯示 mouse-down，慢速拖曳選取框
→ mouse-up 後顯示 Grip、選取物件數與圖層摘要

節點 06–08（繁瑣感動畫，重點）
→ 逐段查看屬性後，右側 Docked Panel 切換為人工記錄表；逐格輸入使用 `--duration-cad-cell`，模擬人工輸入慢
→ SUM 欄位數字逐格累加
→ 這三個節點動畫要明顯慢，讓繁瑣感出來

節點 09
→ 文字與線條位置調整動畫
→ `--duration-cad-adjust`，`--ease-out`
```

---

## CAD 滑鼠框選規範

### 框選是 AI 上下文入口
- 框選邊界以目前樓層或完整施工區域為單位，不是一次只框選一個深井。
- 一次框住整層後，框選負責取得空間範圍內所有物件；標準圖層過濾再決定哪些物件可以計算、標示與提供 AI 查詢。
- ACT 04 的 STEP 07、08、10 必須呈現真實滑鼠框選；ACT 02 禁止整層框選，只能逐段點選物件。
- 只有在使用者完成框選、放開滑鼠，且至少選到一個可計算物件後，系統才建立有效的 `activeSelection`。
- AI 助理只能依據目前有效框選回應；沒有有效框選時不得產生 AI 回覆。
- 切換圖面、樓層、版本或施工區域後，原框選立即失效，AI 輸入與送出功能必須重新鎖定。

### 完整動作順序
1. AutoCAD 十字游標移動到框選起點。
2. 顯示 mouse-down 狀態。
3. 游標沿對角線拖曳，選取框隨游標即時擴展。
4. 進入框內的物件顯示 Hover／預選回饋。
5. mouse-up 後固定選取範圍。
6. 被選取物件保留原本 ByLayer 顏色，另外疊加 Grip 或選取外框。
7. Docked Panel 顯示選取物件數、圖層、施工類型、個別長度及分類小計。
8. `activeSelection` 建立完成後，AI 助理才解除鎖定。

### 游標與選取框
- Ribbon、下拉選單與既有物件點選使用可見箭頭游標；只有畫線、畫矩形、矩陣定位與框選樓層範圍時切換十字游標。
- 游標尺寸使用 `--cad-cursor-size`。
- Grip 尺寸使用 `--cad-grip-size`。
- 選取框邊界使用 `--cad-selection`，填色使用 `--cad-selection-fill`。
- 拖曳時游標必須位於目前選取框的拖曳端點。
- 放開後選取框可淡出，但 Grip、選取外框及 Docked Panel 結果必須保留。
- 禁止只讓框線自行長出而沒有游標、mouse-down 與 mouse-up。

### ACT 02 與 ACT 04 差異
- ACT 02 禁止 box-select：以箭頭逐段點選、Properties 讀值、點引線／文字標註與逐筆加總呈現人工繁瑣感。
- ACT 04 使用 `box-select-fast`：完整呈現游標框選，但框選完成後快速進入 AI 分類、換算與查詢。
- ACT 02 與 ACT 04 共用圖層與尺寸色彩規則，但只有 ACT 04 建立整層 `activeSelection`。

### 框選資料契約
```js
// @property {string} selection.id                 - 本次框選唯一識別
// @property {[number, number]} selection.start    - 樓層框選起點，可使用 viewport ratio
// @property {[number, number]} selection.end      - 樓層框選終點，可使用 viewport ratio
// @property {string} selection.boundaryType       - 固定為 floor 或明確施工區域
// @property {string[]} selection.objectIds        - 被選取的 CAD 物件 ID
// @property {string} selection.drawingId          - 圖面識別
// @property {string} selection.floor              - 樓層
// @property {string} selection.area               - 施工區域
// @property {string} selection.version            - 圖面版本
// @property {boolean} selection.isReady            - mouse-up 且選到有效物件後為 true
```

---

## AI 助理輸入與選取範圍鎖定規範

### 核心條件
- AI 助理是「選取範圍驅動」介面。
- 沒有有效 `activeSelection` 時，AI 不得回答、不得送出請求，也不得使用整張圖的預設資料代替框選。
- 只有 `activeSelection.isReady === true` 且至少包含一個可計算物件時，才允許輸入與送出。
- AI 每次回答必須綁定 `selection.id`；回覆不得混入其他框選、其他樓層或其他版本。

### 未框選狀態
- AI 助理分頁可以開啟，但輸入框與送出按鈕必須停用。
- 面板顯示：`請先在圖面中框選要查詢的施工範圍。`
- Placeholder 顯示：`完成框選後即可詢問 AI……`
- 禁止顯示任何看似已完成的數值回答。
- 使用者直接跳到 ACT 04 步驟 10 時，如未完成步驟 07 框選，仍維持鎖定並提供返回框選的操作提示。

### 已框選狀態
- 框選完成後，面板先顯示目前上下文：圖面、樓層、區域、版本、選取物件數與施工類型。
- 輸入元件必須使用可操作的 `<textarea>`，不得使用不可編輯的假輸入框。
- Placeholder 改為：`詢問目前框選範圍的長度、數量或異常……`
- 空白內容不得送出。
- `Enter` 送出；`Shift + Enter` 換行。
- 送出按鈕必須有文字或圖示與可辨識的 disabled／loading 狀態。
- AI 回覆完成後，焦點回到輸入框。

### 查詢與回覆流程
```text
完成滑鼠框選
→ 建立 activeSelection
→ AI 輸入框解除鎖定
→ 使用者輸入問題
→ 按下送出
→ 顯示使用者訊息
→ 顯示「正在整理目前框選範圍」
→ AI 依 selection.id 回覆
→ 顯示數值來源與圖面依據
```

### 回覆範圍
AI 至少要能處理：
- 目前框選範圍的單段長度。
- 外部／深井分類總長。
- 元件數量及換算依據。
- 異常、重疊、漏選或缺少條件。
- 目前框選範圍的複核摘要。

每則涉及數值的回覆必須顯示：
- `selection.id` 或可識別的框選標記。
- 圖面、樓層、施工區域與版本。
- 使用的 CAD 物件數、圖層或個別長度。
- 合計或換算依據。
- 所有長度數值一律以 `cm` 顯示並保留兩位小數。
- AI 不得回覆 `mm` 或 `m`；若來源資料不是 `cm`，必須先完成單位正規化後再回答。
- 圖面單位未解析時，AI 不得猜測長度，必須要求使用者先確認圖面單位。

### 框選變更與失效
- 使用者重新框選後，建立新的 `selection.id`。
- 舊回覆可保留作為歷史，但必須標示「上一個框選範圍」，不得繼續作為目前回答依據。
- 取消選取、切換圖面或切換樓層時，AI 輸入框立即停用。
- AI 正在回覆時若框選失效，必須取消或丟棄該次回覆，不得顯示成目前結果。

### Docked Panel 與展示版
- AI 助理固定放在右側 Docked Panel 的「AI 助理」分頁，不得使用浮動聊天視窗。
- 建議問題可顯示，但未框選前必須停用。
- 展示版尚未連接正式 AI 時，可依關鍵字回傳預設結果，但仍必須遵守框選鎖定與 `selection.id`。
- 輸入框及送出按鈕不得只是視覺裝飾，至少要有可操作的展示回覆。

---

## 命名規則

- props 命名用名詞：`stepData`、`activeIndex`、`chartConfig`
- 事件命名用 `on` + 動詞：`onStepChange`、`onSelect`
- 布林變數用問句：`isActive`、`hasError`、`isVisible`
- 禁止無意義命名：`data`、`obj`、`item`、`tmp`、`result`

---

## 禁止

- hardcode 任何 hex 色碼
- hardcode breakpoint 數字（未加 Token 註解）
- 全站深色、全螢幕近黑背景或黑色科技風
- 將 `--cad-*` Token 用於一般敘事區
- 霓虹發光、玻璃擬態、裝飾性漸層與高飽和彩色光暈
- 以低對比灰字或 opacity 降低方式呈現主要正文
- 將成功、警告、危險色當成一般裝飾色
- 只靠顏色表達狀態或互動結果
- 輪播、漸層大標、卡片 grid
- Token 以外的字型
- 裝飾性動畫
- 在 `charts/*.js` 裡 import store
- 在 `.svelte` 內寫 D3 細節
- 跨元件直接操作 DOM
- 在 `+page.svelte` 寫邏輯
- 根目錄產生垃圾文件
- 產生 `_copy` `_backup` 版本檔案
- CAD 區使用圓角、陰影、漸層
- CAD 區使用 sans-serif 字型
- CAD 區線寬超過 `--cad-line-width-selected`
- CAD 區使用 ease-spring 動畫
- 所有 CAD 幾何物件使用同一種顏色
- 以框選狀態覆蓋施工物件原本的 ByLayer 顏色
- 框選動畫沒有十字游標、mouse-down、拖曳或 mouse-up
- 未完成有效框選時讓 AI 送出或產生回答
- 在任何使用者可見的圖面標註、面板、AI 回覆或報告中顯示 `mm` 或單獨的 `m`；長度一律使用 `cm`
- 使用整張圖或其他樓層資料代替目前框選範圍
- AI 助理使用不可輸入的假輸入框或無作用的送出按鈕

---

## 檔案頭規範

每個檔案開頭必須包含：

```js
// 職責：這個檔案做什麼
// 輸入：接受什麼參數（D3 chart 必須定義 data 結構）
// 輸出：回傳或產生什麼
```

---

## 導航地圖

- 新專案從零開始   → 執行從零開始步驟
- 寫新元件         → 讀 src/lib/components/ 現有元件確認風格一致
- 寫新 chart       → 讀 src/lib/charts/ 確認 function 簽名一致
- 不確定 Token     → 讀 src/lib/tokens.css
- 全域樣式         → 讀 app.css
- CAD 模擬器       → 讀本文件「CAD 模擬器規範」段落

---

## AGENTS.md 維護

- 視同程式碼，改動要 commit
- 專案規則變了就更新
- 不能讓內容跟實際程式碼脫節

---
---

# 專案規格 — AutoCAD × AI 智能作業提案網站

## 專案定位

這是一份向客戶提案的單頁網站。

語氣原則：
- 客戶提出需求，我們回應，不是我們突然宣告要做系統
- 對客戶統一以「AI 智能作業」包裝：AI 負責自動設定、取得、分類、換算、查詢、解釋與整理
- 提案語氣：這是客戶現在想做的事，我們負責把它落地
- 面向客戶的 文案不拆解 C# 外掛、幾何模組、規則模組或資料處理模組；除非進入技術附錄，畫面與敘事皆以 AI 完整能力呈現
- AI 產生的每筆結果仍必須保留圖面物件、框選範圍、套用條件與計算紀錄，確保可以定位、複核與追溯

敘事主線：
1. 先交代客戶希望 AI 協助完成哪些工作，不先談技術或限制
2. 說明這次提案要做到的程度：能放進 AutoCAD、能套用不同圖面、能讓人員查看與詢問結果
3. 用具體圖面情境說明真正難點：不能把不同樓層、施工區域或版本混在一起計算
4. 說明在設計 AI 工具前，必須先看懂繪圖人員目前的工作方式
5. 帶讀者走一次現況流程（九個流程節點）
6. 說明導入後的新流程（十二個操作步驟）與 AI 定位
7. 效益與下一步

---

## 提案文案規則

- 文案要像人在向客戶說明工作現場，不寫成系統規格書或技術白皮書。
- 每一段只回答一個問題：客戶要什麼、我們要做到什麼、困難在哪裡、為什麼要先理解現況。
- 先寫具體情境，再下結論；能用「只算 6 樓外部」說清楚時，不只寫「判斷圖面上下文」。
- 客戶需求段只描述需求，不提前解釋技術做法、限制或風險。
- 目標段直接說明工具要具備的能力，不使用「不是只做展示」「真正落地」「一次性功能」等沒有新增資訊的對比句。
- 難點段必須說明可能混入哪些不該計算的內容，例如其他樓層、深井區域或舊版本。
- 先理解現況段必須自然銜接 ACT 02，結尾引導讀者走一次目前的完整流程。
- 避免連續堆疊「圖面、結果、判斷、整理、依據」等抽象名詞；必要時改成實際操作與錯誤情境。
- 避免自我宣傳式語句；每一句都要能讓客戶知道要做什麼、為什麼需要或會遇到什麼問題。
- 面向客戶的中文以自然口語為主，但不得使用過度隨意、模糊或無法驗收的說法。

---

## AI 智能作業包裝規則

- 面向客戶的 標題、步驟、按鈕與說明，統一使用「AI 自動設定」「AI 自動取得」「AI 自動分類」「AI 自動換算」「AI 助理查詢」等語言。
- 不在主要提案頁面拆解 C# 外掛、CAD API、幾何模組、規則模組或資料處理模組的分工，避免削弱完整 AI 智能作業的體驗。
- 技術附錄、原始碼註解、測試與驗收文件可以記錄實際模組責任，但不得改寫面向客戶的 文案。
- AI 顯示的結果必須能回到原始圖面物件與框選範圍；包裝為 AI 不代表允許結果不可追溯。
- AI 遇到缺少圖層、範圍、換算條件或版本資訊時，必須標示「待確認」，不得自行補造條件。
- 使用者確認後的結果、條件與報告必須保留版本紀錄，供後續圖面修改比較。

---

## 專案視覺定位

- 核心視覺：**暖米白提案底色 × 深色 AutoCAD 介面框架 × 淺灰模型空間 × ByLayer 施工語意色 × 選取範圍驅動 AI**
- 整體網站是客戶提案，不是軟體後台；應優先確保閱讀、理解與信任
- AutoCAD 的工具列、Docked Panel 與命令列採深色框架；模型空間獨立使用淺灰畫布，不是整站深色主題
- 主要內容使用淺色表面與深色文字；技術互動區再切換到深色介面
- 色彩使用比例原則：大部分為中性色，品牌藍少量使用，語意色僅在需要時出現

---

## ACT 視覺背景規則

- ACT 01：淺色背景，建立語境、提案感與信任感
- ACT 02：外部 section 維持淺色；右側 AutoCAD 模擬器採深色框架與淺灰模型空間
- ACT 03：使用白色與淡灰藍區分人工流程與系統流程，不使用紅色大面積鋪底
- ACT 04：外部 section 維持淺色；右側 AutoCAD 模擬器採深色框架與淺灰模型空間（同 ACT 02）
- ACT 05：淺色背景；AI 上下文與技術提示使用少量 Teal 青色
- ACT 06：白色或淡暖灰背景；以專案總結與最終主句收斂，不使用 CTA
- 禁止任何 ACT 使用全螢幕純黑、近黑或深灰背景
- 不以每個 ACT 使用不同顏色區隔；主要使用留白、標題、分隔線與表面明度建立章節節奏

---

## ACT 對應元件

| ACT | 元件 | 互動類型 |
|-----|------|----------|
| 01 | Act01Hero.svelte | 純閱讀，滾動推進 |
| 02 | Act02Flow.svelte | 互動式逐步推進，九個流程節點（Signature） |
| 03 | Act03Problem.svelte | 動畫對比 |
| 04 | Act04Solution.svelte | 互動式逐步推進，十二個操作步驟 |
| 05 | Act05Intelligence.svelte | 視覺化圖面結構 |
| 06 | Act06Summary.svelte | 純閱讀專案總結 |

---

## ACT 02 與 ACT 04 共用互動模式

ACT 02（現況流程）與 ACT 04（導入後步驟）採用相同的互動式逐步推進結構：

### 畫面佈局

桌機寬版（`--bp-wide` 以上）：
```
┌──────────────────────────────────────────────────────┐
│ 左側說明（35%）          右側 CAD 模擬器（65%）       │
│                                                      │
│ 節點 / 步驟標題          工具列                      │
│ 說明文字（2–3 行）       繪圖區 + 完整 Docked Panel   │
│ 進度與操作按鈕           命令列                      │
└──────────────────────────────────────────────────────┘
```

中型桌機（`--bp-cad-stack` 至 `--bp-wide`）：
- 左側說明區 38%。
- 右側 CAD 模擬器 62%。
- Docked Panel 必須完整顯示，禁止裁切或以水平捲軸補救雙欄配置。

低於 `--bp-cad-stack`：
- 改為上下排列。
- 上方為節點／步驟說明與操作按鈕。
- 下方為完整 CAD 模擬器。
- 不再維持左右百分比配置。

### 互動行為
- 使用者點擊「下一步」推進
- 左側：換下一個節點／步驟說明
- 右側：CAD 模擬器畫面即時切換，對應該節點操作
- 進度指示器顯示目前在第幾個節點（例如 03 / 09）
- 外部 section 背景維持淺色（--bg-surface）
- 右側 CAD 模擬器使用深色介面框架；模型空間使用獨立的 `--cad-canvas-background`。
- ACT 02／ACT 04 必須使用寬版內容容器，不得沿用一般敘事 section 的最大寬度。
- 桌機版右側 CAD 模擬器必須完整顯示，不得預設出現水平捲軸。
- 模擬器內的屬性、人工記錄與 AI 助理共用右側 Docked Panel，不得新增浮動視窗。
- 節點或步驟切換時，只更新 Docked Panel 內容與繪圖區狀態，不得遮罩整個模擬器。

### ACT 02 動畫策略（現況流程，重點在繁瑣感）
```
節點 01–03  靜態為主，右側只顯示圖面結構
節點 04     十字游標依外擴輪廓繪製外部多段施工線與多個深井
節點 05     箭頭游標逐段點選外部線與深井；Properties 逐筆顯示長度，禁止框選
節點 06     點尺寸／文字標註工具，逐段建立尺寸並在右側人工記錄追加數值
節點 07     加總公式只留在右側人工記錄，不得放進模型空間底部
節點 08     長方形補強構件一開始就存在，編號 01～30 逐筆顯示並累加數量
節點 09     文字線條位置調整（--duration-cad-adjust）
```
ACT 02 使用 `--cad-playback-rate` 原始 0.5× 節奏，不套用 ACT 04 的加速倍率。

### ACT 04 動畫策略（導入後步驟，重點在快速感）
```
步驟 01–03  靜態為主，同 ACT 02 前段
步驟 04     專用工具列按鈕高亮，聚合線快速繪出
步驟 05     ByLayer 圖層顏色與線寬即時自動套用（--duration-cad-draw）
步驟 06     長度文字標示即時出現在圖面上
步驟 07     十字游標移到起點，按下、快速拖曳、放開並建立 activeSelection
步驟 08     只有 activeSelection 有效後，面板數值才快速跳出
步驟 09     三欄結果同時出現：獨立長度 / 總和長度 / 元件數量
步驟 10     AI 助理切換至右側 Docked Panel；輸入框僅在框選有效時解除鎖定
            示範輸入問題、送出並依 selection.id 顯示回覆與數值來源
步驟 11     結果確認狀態（checkmark 出現）
步驟 12     PDF 預覽畫面淡入
```

---

## ACT 02／ACT 04 版面驗收規則

- 1920×1080：CAD 模擬器必須完整顯示，右側 Docked Panel 不得裁切，section 不得出現水平捲軸。
- 1440×900：仍採雙欄配置，CAD 模擬器右邊界、Docked Panel 與命令列必須完整可見。
- 1366×768：可依實際可用寬度採雙欄或提前切換上下排列，但禁止壓縮 CAD 至文字不可讀。
- 1024×768：必須使用上下排列，CAD 模擬器放在說明區下方。
- 390×844：CAD 技術區可水平捲動，但頁面本身不得產生整頁水平捲軸。
- ACT 02 與 ACT 04 必須使用相同的容器比例、斷點、CAD 最小尺寸與 Docked Panel 規則。
- 驗收截圖必須同時包含工具列、繪圖區、完整 Docked Panel、命令列與外層淺色背景。

### 框選與 AI 助理互動驗收
- ACT 02 節點 05 必須看得到箭頭游標沿正確外擴輪廓逐段點選、Properties 逐筆更新，且不得出現框選框。
- ACT 04 步驟 07 必須完成同樣動作，且產生非空的 `activeSelection.objectIds`。
- 未框選時開啟 AI 助理：`textarea.disabled === true`，送出按鈕 disabled，畫面顯示先框選提示。
- 框選完成且 `isReady === true`：textarea 與送出按鈕解除鎖定。
- 空白字串與純空白不得送出。
- AI 回覆的 `selection.id` 必須等於送出當下的 `activeSelection.id`。
- 重新框選、取消選取、切換圖面或樓層後，舊 selection 不得繼續產生新回覆。
- AI 回覆必須列出至少一項圖面依據：物件數、圖層、個別長度、區域或版本。
- 圖面標註、Docked Panel、AI 回覆及 PDF 預覽的長度都必須以 `cm` 顯示並保留兩位小數。
- 原始 `3842.50 mm` 必須轉換並顯示為 `384.25 cm`。
- 使用者可見介面不得出現以 `mm` 或單獨 `m` 表示的長度值。
- 圖面單位無法解析時，`activeSelection.isReady` 必須為 `false`，AI 不得回答長度問題。
- 外部線與深井線在框選前後都必須保留各自 ByLayer 顏色。
- 桌機與手機版都必須能操作 textarea；手機版 AI Docked Panel 位於繪圖區下方。

### 最低自動測試
- `selectionContract.test.js`：驗證框選資料契約與 selection 失效規則。
- `aiSelectionGate.test.js`：驗證未框選不得送出、框選後才可回覆。
- `cadColorContract.test.js`：驗證 ByLayer 色與操作狀態色分離。
- `cadInteractionContract.test.js`：驗證 ACT 02／04 都使用完整 box-select 動畫類型。
- `lengthUnitContract.test.js`：驗證 drawing unit 轉換、兩位小數格式、全介面 `cm` 一致性及未知單位阻擋規則。
- `contentNarrativeContract.test.js`：驗證 ACT 01 四段順序、具體 6 樓外部情境、ACT 02 銜接句，以及禁止空泛展示文案。
- AI 助理測試不得只比對靜態字串，必須模擬輸入、送出與 selection 變更。

---

## ACT 01｜首頁開場

**元件：** Act01Hero.svelte  
**互動：** 純閱讀，滾動推進，無互動，建立語境與信任感

**小標：** AutoCAD × AI 智能作業提案  
**主標：** AutoCAD 工作流程，如何導入 AI 智能作業？  
**副標：** 從每段聚合線的長度、整張圖的施工總長，到圖面中的元件數量，讓繪圖人員能在 AutoCAD 裡直接查看、詢問與確認結果。

### 01｜客戶的需求

**頁面文案：**

這次客戶希望把 AI 導入公司現有的 AutoCAD 作業。當繪圖人員完成施工範圍後，工具可以自動取得每一段聚合線的長度，加總同一張圖面的施工總長，並整理圖面中的元件數量，例如外部三角補強 30 個。

**寫作要求（不顯示於頁面）：** 本段只交代客戶希望 AI 協助完成哪些工作，不說明底層技術，也不提前提出限制。

### 02｜我們的目標

**頁面文案：**

我們希望把這個需求做成一套能直接放進 AutoCAD 使用的 AI 智能工具。

這套工具要能套用到不同樓層、立面與後續專案。繪圖人員完成施工範圍後，就能直接查看每段長度、施工總長與元件數量，並進一步詢問和確認結果。

**內容重點（不必另外做成口號）：**
- 能直接整合進現有 AutoCAD 作業
- 能套用到不同圖面與後續專案
- 框選目前要計算的圖面範圍後，再整理長度與數量

### 03｜真正的難點

**頁面文案：**

一個 CAD 檔案裡，可能同時放著 4 樓、6 樓和屋頂層的施工圖，也可能同時包含外部、深井、平面圖、立面圖，以及修改前後的不同版本。

例如，繪圖人員現在只想計算「6 樓外部施工範圍」，AI 就不能把 6 樓深井、其他樓層，或舊版本中的聚合線一起加進來。圖面中的元件也是一樣，只有位於這次施工範圍內、符合指定條件的元件才能列入數量。

所以真正的難點不是長度怎麼加，而是先確認這次要算的是哪一張圖、哪一層、哪一個範圍，以及哪些線條和元件應該被算進來。

**視覺主句（可顯示於頁面）：** AI 必須先知道「這次要算什麼」，才不會把不該算的內容一起加進來。

### 04｜先理解現況

**頁面文案：**

在開始做工具之前，我們要先看懂繪圖人員現在是怎麼完成一張施工圖的。

圖面拿到後怎麼拆？施工範圍怎麼判斷？聚合線怎麼畫？每段長度怎麼查看？整張圖怎麼加總？元件數量又是怎麼整理和檢查的？

只有把這些實際操作弄清楚，AI 才知道接下來要看哪張圖、計算哪些內容，以及怎麼整理結果。

接下來，我們就從原始 CAD 圖面開始，走一次目前的完整流程。

**寫作要求（不顯示於頁面）：** 本段最後一句必須作為 ACT 02 的銜接，不另外插入技術解釋或功能清單。

---

## ACT 02｜現況流程（互動式逐步推進）

**元件：** Act02Flow.svelte
**互動類型：** 流程（Process）——說明現況怎麼發生，不是教學操作
**D3 chart：** cadSimulator.js（模式：現況流程）

```js
// 職責：模擬 AutoCAD 介面，依現況流程節點顯示對應操作畫面
// 輸入：
// @param {Object[]} nodes             - 九個流程節點資料陣列
// @param {number}   nodes[].id        - 節點編號 1–9
// @param {string}   nodes[].label     - 左側標題
// @param {string}   nodes[].desc      - 左側說明（2-3行）
// @param {string}   nodes[].animType  - 右側動畫類型
//   'static'       靜態圖面結構
//   'draw'         線條繪製動畫
//   'manual-inspect' 箭頭逐段點選並查看 Properties
//   'manual-label-slow' 點線、查看 Properties、點 TEXT、逐字輸入與放置標註
//   'sum'          數字逐格累加
//   'adjust'       位置調整動畫
// @param {number}   activeNode        - 目前啟用節點編號（0–8）
// 輸出：void，直接操作 container SVG
```

**標題：** 一張施工圖，現在是怎麼完成的？
**前導：** 接下來，我們先跟著目前的工作方式走一次。從建商提供原始 CAD 圖面開始，一直到施工範圍、長度與元件數量全部確認完成。

**九個流程節點：**

| # | 流程節點標題 | 左側說明 | 右側動畫類型 |
|---|-------------|----------|-------------|
| 01 | 建商提供原始 CAD 圖面 | 建商提供已完成的建築 CAD 圖面，包含平面圖、立面圖與剖面圖。繪圖人員依圖面判斷施工位置，作為後續繪製的依據。 | static：建築平面圖輪廓、圖層清單 |
| 02 | 繪圖人員依施工需求拆圖 | 依施工需求將原始圖面拆分，整理各樓層工作圖，確認每張圖面對應的施工範圍與樓層資訊。 | static：多張圖面並排，各自標示樓層名稱 |
| 03 | 判斷外部與深井的施工範圍 | 繪圖人員判斷建築外部與深井各自的施工位置，作為後續聚合線繪製的範圍依據。 | static：外部與深井施工範圍以不同色標示 |
| 04 | 沿施工範圍繪製聚合線 | 沿著施工位置繪製聚合線。依施工狀況可能為完整聚合線，或分段的多條獨立線段。 | draw：聚合線從起點延伸繪出 |
| 05 | 逐段點選線段並查看 Properties | 箭頭游標逐一點選外部線段與深井，人工讀取每一段長度；現況流程不使用整層框選。 | manual-inspect：逐段點選與 Properties 同步 |
| 06 | 點擊標註工具，逐段建立紅色尺寸 | 每次點選線段後再點引線／文字標註，逐字輸入；外部 100＋80＋30＋40＋60、深井 100＋100＋100＋100 逐筆增加。 | manual-label-slow：九筆標註與算式逐筆出現 |
| 07 | 多條聚合線人工加總 | 將所有線段長度手動加總，計算該圖面的施工總長度。 | sum：SUM 欄位數字逐格累加 |
| 08 | 依長度人工換算施工數量 | 依施工條件人工換算鷹架組數及元件數量，例如三角補強、萬向固定座等。 | quantity-slow：換算結果逐格手動填入 |
| 09 | 調整線條、文字及圖面位置 | 確認後手動調整圖面上的線條、文字標示與配置位置，完成施工圖整理。 | adjust：文字與線條位置調整 |

---

## ACT 03｜現況的真正問題

**元件：** Act03Problem.svelte
**互動：** 左側人工逐格輸入（慢）對比右側系統自動整理（快）。六個風險逐一淡入顯示。

**D3 chart：** comparisonAnim.js
```js
// 職責：動畫對比人工流程（慢）vs 系統流程（快）
// 輸入：
// @param {Object[]} risks         - 六個風險資料陣列
// @param {number}   risks[].id    - 風險編號 1–6
// @param {string}   risks[].label - 風險說明文字
// 輸出：void，直接操作 container SVG
```

**標題：** 人工作業，在哪裡出問題？
**說明：** 真正耗費時間的並不是查看單一長度，而是後續仍需要人工記錄數字、輸入文字、整理多條聚合線、逐筆加總，並依照施工條件進一步換算鷹架數量。當圖面修改、樓層增加，或同一個 CAD 檔案中放入多張施工圖時，既有的長度、數量與文字結果也必須重新確認。

**六個風險：**
1. 遺漏部分線段或重複計算
2. 不同人員對施工範圍的認定不一致
3. 圖層、標註及實際幾何尺寸不一致
4. 多張圖面或多個區域混合計算
5. 計算結果缺少可追溯的圖面依據
6. 修改圖面後需要重新人工複核

---

## ACT 04｜導入後的新流程（互動式逐步推進）

**元件：** Act04Solution.svelte
**互動類型：** 步驟（Steps）——說明導入系統後怎麼操作
**D3 chart：** cadSimulator.js（模式：導入後步驟）

```js
// 職責：模擬 AutoCAD 介面，依導入後操作步驟顯示對應畫面
// 輸入：
// @param {Object[]} steps             - 十二個操作步驟資料陣列
// @param {number}   steps[].id        - 步驟編號 1–12
// @param {string}   steps[].label     - 左側標題
// @param {string}   steps[].desc      - 左側說明（2-3行）
// @param {string}   steps[].animType  - 右側動畫類型
//   'static'        靜態圖面結構
//   'draw-fast'     線條快速繪製
//   'auto-layer'    圖層顏色線寬即時套用
//   'auto-label'    長度文字標示即時出現
//   'box-select-fast' 游標移動、按下、快速拖曳、放開並建立 activeSelection
//   'panel-fast'    面板數值快速跳出
//   'result-three'  三欄結果同時出現
//   'ai-query'      選取範圍有效後，啟用 textarea、送出問題並顯示 AI 回覆
//   'confirm'       確認狀態 checkmark
//   'pdf-preview'   PDF 預覽淡入
// @param {Object|null} activeSelection - 目前有效框選；未框選時為 null
// @param {number}   activeStep        - 目前啟用步驟編號（0–11）
// 輸出：void，直接操作 container SVG
```

**標題：** 我們準備怎麼做？
**前導：** 我們將這些分散的操作整合在 AutoCAD 原生介面中。

**十二個操作步驟：**

| STEP | 步驟標題 | 左側說明 | 右側動畫類型 |
|------|---------|----------|-------------|
| 01 | 建商提供原始 CAD 圖面 | 平面圖／立面圖／剖面圖，流程起點不變。 | static |
| 02 | 建立標準圖層，定義程式可處理的物件 | 建立 AI-EXTERIOR、AI-SHAFT、AI-DIM、AI-BRACE；非標準圖層不進入計算。 | standard-layers：圖層下拉與用途逐項顯示 |
| 03 | 判斷外部與深井的施工範圍 | 繪圖人員判斷施工位置，流程起點不變。 | static |
| 04 | 依已確認位置逐段繪製外部線與多個深井 | 人工仍照常以游標逐段繪製；每完成一個外部段或深井，系統立即套用標準圖層並建立該物件尺寸。 | guided-draw：游標逐段跟隨、多段外部與多深井依序完成 |
| 05 | AI 自動設定圖層、顏色及線寬 | 繪製聚合線後，AI 依施工類型自動套用對應圖層、顏色與線寬，不需手動設定。 | auto-layer：顏色線寬即時切換 |
| 06 | AI 自動取得每段外部長度並標示多個深井 | 外部每個轉角之間都是獨立線段，每段完成即建立自己的尺寸；16 段外部合計為 1,000.00 cm。第一個深井完成後，矩陣依序展開其餘深井，游標全程跟隨，非標準圖層不標示。 | auto-label：外部逐段尺寸、多深井游標動畫、矩陣與圖層過濾 |
| 07 | 使用滑鼠框選目前樓層範圍 | 十字游標一次框住目前樓層的完整工作範圍。框選只界定空間邊界；`AI-EXTERIOR` 與 `AI-SHAFT` 才進入計算，底圖、參考與暫存圖層即使位於框內也會被忽略。 | box-select-fast：整層框選、Grip、有效／忽略物件摘要 |
| 08 | 點擊自動計算，框選後才顯示分類結果 | 箭頭點自動計算，再重新框選整層；放開後逐項顯示有效、忽略、外部合計、深井合計與總長。 | panel-fast：點擊、框選、過濾、結果逐項顯示 |
| 09 | AI 自動換算獨立長度、總和長度與元件數量 | AI RESULTS 逐筆列出 16 段外部長度、六個深井、分類合計、施工總長與 30 個外部補強。長方形補強原本就在外部周界，編號跟著外部段落依序出現。 | result-three：逐段結果、逐號補強與分類合計 |
| 10 | 在 AI 助理輸入問題並取得框選結果 | AI 助理只在 `activeSelection` 有效時啟用。使用者可在 `<textarea>` 輸入目前框選範圍的長度、數量、換算、異常或差異問題；AI 回覆必須綁定 `selection.id` 並顯示圖面依據。未框選時輸入框與送出按鈕停用。 | ai-query：切換 AI 助理分頁，示範輸入、送出、處理狀態、回覆與數值來源 |
| 11 | 確認計算結果 | 繪圖人員確認 AI 整理的長度與數量結果，必要時返回圖面修正。 | confirm：checkmark 出現，狀態確認 |
| 12 | 在 AutoCAD 內原生輸出圖面及 PDF 報告 | 確認後透過 AutoCAD 原生出圖功能輸出圖面，並產生包含長度明細、數量結果、計算條件及檢查紀錄的 PDF 報告。 | pdf-preview：PDF 預覽畫面淡入 |

---


## ACT 04 STEP 06｜原生 Ribbon、自動紅色尺寸標註與多深井矩陣

**核心規則：矩陣必須整合在 STEP 06 的同一個 CAD 模型空間，不得獨立成另一篇文章、插頁、第 13 步或 Dashboard。**

### 原生 CAD 介面

- 模擬器上方使用簡化 AutoCAD Ribbon：分頁列、施工線、批次處理、自動標示、圖層與性質。
- 對客戶顯示工作語言「外部線」「深井線」「深井矩陣」，不得顯示 `PLINE`、`RECT` 等底層命令名稱。
- CAD 底圖採低彩度中性色簡化，不還原全部圖層顏色；必須以實線、隱藏線、中心線與 45° Hatch 保留基本工程圖辨識感。

### 游標規則

- Ribbon、下拉選單與既有物件點選使用白色填滿、深色外框的標準箭頭游標。
- 畫外圍聚合線、畫深井矩形、指定矩陣方向與框選施工範圍時切換十字游標。
- 工具點擊必須顯示按鈕高亮、游標縮放與圓形波紋回饋。
- 動作完成後回到箭頭游標。

### 聚合線與標註分層

- `AI-EXTERIOR`：外圍施工聚合線，使用綠色。
- `AI-SHAFT`：深井施工聚合線，使用橘色。
- `AI-DIM`：程式建立的紅色尺寸線、引線、箭頭與文字。
- 紅色標註不得只是漂浮數字，必須帶引線或尺寸結構並指向被計算的聚合線。
- ACT 02 與 ACT 04 最終都可得到紅色標註，但 ACT 02 必須演出查看 Properties、點引線工具、指定位置、逐字輸入；ACT 04 則在聚合線完成後自動建立。

### STEP 06 連續動畫

1. 箭頭游標點擊「外部線」，進入模型空間後切換十字游標。
2. 十字游標依正確的 `30 cm` 外擴輪廓逐段繪製；每到一個轉角即結束目前線段並開始下一段。
3. 每一段完成後立即建立該段的尺寸。模型空間不得把 `1,000.00 cm` 當成一筆單一尺寸；`1,000.00 cm` 只作為 16 段的外部合計顯示於 Docked Panel。
4. 箭頭游標點擊「深井線」，十字游標繪製第一個橘色深井並立即建立尺寸。
5. 箭頭游標點擊「深井矩陣」，十字游標依序移至其餘深井位置；每完成一個深井就建立尺寸，不能只演一個深井後瞬間顯示全部。
6. 六個 `AI-SHAFT` 建立橘色聚合線與紅色尺寸；兩個非標準圖層保持灰化且不得顯示 cm。
7. 外部長方形補強構件原本就在外部周界，不由動畫生成；此步驟先保留未編號狀態。
8. 右側 Docked Panel 同步顯示目前外部段落、獨立長度、深井物件、圖層與進度。
9. 動畫完成後仍維持 STEP `06 / 12`，使用者按「下一步」才進入 STEP 07。

### 標準圖層規則

> 框選負責界定整層空間邊界，矩陣負責重複配置；標準圖層決定哪些內容會被程式接受。

- 只有 `AI-SHAFT` 可以產生紅色 `AI-DIM` 標註、納入計算與 AI 查詢。
- `REFERENCE-SHAFT`、`TEMP-SHAFT` 或其他非標準圖層即使位於相同範圍內，也不得產生標註或進入結果。
- 過濾邏輯必須使用純函式，禁止在 D3 動畫中散落硬編碼判斷。

### 播放速度

- ACT 02 維持 `--cad-playback-rate: 0.5`，保留人工流程的慢速與繁瑣感。
- ACT 04 的所有 CAD 動畫在同一基準上加快 `25%`：`futureRate = baseRate × 1.25`，實際 duration 為 ACT 02 同類動作的 80%。
- ACT 04 加速範圍包含游標、工具點擊、外部逐段畫線、尺寸建立、多深井繪製、矩陣、框選、結果與 AI 問答補字。
- 一般頁面 hover、導覽與非 CAD 淡入不得套用此倍率。

### 自動測試要求

- 不得存在或渲染 `AutoLabelMatrix.svelte`、`shaftMatrix.js`、`matrixInterlude` 或獨立矩陣導覽按鈕。
- `drawAutoLabelScene()` 內必須包含矩陣序列與標準圖層過濾。
- 必須驗證箭頭游標、十字游標、原生 Ribbon、AI-DIM Token、淺灰模型空間、隱藏線、中心線、Hatch 與 0.5× 播放 Token。
- 矩陣資料固定 8 個深井，其中 6 個標準圖層、2 個非標準圖層。
- 非標準圖層不得顯示 cm 長度。

---

## ACT 05｜AI 的定位

**元件：** Act05Intelligence.svelte
**互動：** 用圖示標示五個上下文層次，每個層次 hover 展開說明。

**D3 chart：** contextMap.js
```js
// 職責：視覺化 AI 判斷圖面的五個上下文層次
// 輸入：
// @param {Object[]} layers          - 五個上下文層次陣列
// @param {number}   layers[].id     - 層次編號 1–5
// @param {string}   layers[].label  - 層次名稱
// @param {string}   layers[].desc   - hover 展開說明
// @param {string[]} layers[].items  - 該層次的細項清單
// 輸出：void，直接操作 container SVG
```

**標題：** AI 在這套系統裡做什麼？

**核心說明：**
AI 是整套 AutoCAD 智能作業的統一入口，但 AI 查詢必須由有效框選啟動。使用者先在 CAD 圖面中框選本次施工物件，系統建立 `activeSelection` 後，AI 才能依該框選的圖面、樓層、區域、圖層、施工類型與公司規則，自動取得、分類、換算、解釋、整理異常並輸出報告。沒有框選時，AI 助理不得回答。

**AI 負責的五件事：**
1. 理解目前圖面身分、施工區域與框選範圍
2. 自動設定圖層、顏色及線寬，並取得各段長度
3. 自動分類加總，依公司條件換算施工項目與元件數量
4. 整理異常、差異、缺少條件與複核摘要
5. 回答使用者查詢，並整理圖面與 PDF 報告內容

**AI 包裝與可驗證原則：**
- 對使用者介面與客戶提案，統一呈現為 AI 自動完成。
- AI 自動處理與 AI 助理查詢都必須以目前有效框選為範圍；未框選不得顯示回覆。
- 每筆長度、合計與數量結果必須保留對應圖面物件、圖層、框選區域、套用條件與產生時間。
- AI 查詢與說明不得覆寫原始結果；遇到缺少條件或異常時，必須提示使用者確認。
- 客戶端不顯示底層模組分工，技術文件與測試仍需驗證結果來源與可追溯性。

**五個圖面上下文層次：**

| 層次 | 名稱 | 細項 |
|------|------|------|
| 01 | 圖面身分 | 樓層、立面、剖面、圖號、版本 |
| 02 | 施工區域 | 外部、深井、區域名稱、框選範圍 |
| 03 | 圖面物件 | Polyline、圖塊、文字、圖層 |
| 04 | 公司規則 | 圖層名稱、顏色、線寬、單位、元件換算方式 |
| 05 | 計算關係 | 哪些線要加總、哪些元件要統計、哪些內容不能混算 |

**口語包裝：** AI 要先知道自己看的是哪張圖、哪一層、哪一區，才知道接下來應該怎麼算。

---

## ACT 06｜專案總結

**元件：** Act06Summary.svelte
**互動：** 純閱讀，以專案總結與最終主句收斂，不使用行動按鈕。

**標題：** 從工程經驗，走向可持續改善的 AI 標準作業系統

**總結重點：**
- 將拆圖、施工範圍判斷、逐段繪製、標註、計算與清點經驗整理成圖面條件、判斷邏輯與計算規則。
- 繪圖人員仍負責工程判斷與最終確認；AI 只在物件完成後協助帶入長度、建立標註、分類加總、統計與檢查。
- 作業演進路徑固定為：經驗規則化 → 作業標準化 → 知識系統化。

**最終主句：**
把繪圖人員的工程經驗，轉成公司可以保存、團隊可以沿用、程式可以執行、AI 可以使用的標準作業系統。

**行動呼籲：**
標題：準備好開始了嗎？
說明：我們可以從一張代表性施工圖開始，確認圖層規則與計算條件，再逐步建立完整的工具流程。


---

## v5.9｜整合優先規則

> 本節整合最新確認內容；若前文章節與本節衝突，以本節為準。

### 1. ACT 02｜人工流程不得使用框選

- ACT 02 不建立 `activeSelection`，不播放整層框選。
- 人工流程固定為：箭頭游標逐段點選物件 → Properties 顯示長度 → 點擊引線／文字標註按鈕 → 指定箭頭位置 → 逐字輸入紅色尺寸文字。
- 外部分段示意固定為 `100＋80＋30＋40＋60`；每完成一筆標註，人工算式才追加一個數字，不得一次全部出現。
- 內部深井示意固定為四個矩形，逐筆顯示 `100＋100＋100＋100`。
- 人工與 AI 的正式尺寸結果都使用紅色箭頭、引線與文字；差異在建立過程，不在最終顏色。

### 2. ACT 04｜STEP 02 建立標準圖層

STEP 02 改為建立並說明：

| 圖層 | 用途 |
|---|---|
| `AI-EXTERIOR` | 外部施工聚合線 |
| `AI-SHAFT` | 內部深井聚合線 |
| `AI-DIM` | 紅色尺寸、箭頭與文字 |
| `AI-BRACE` | 外部三角補強 |

標準圖層是程式判斷資料的依據。框選只界定空間範圍；非標準圖層即使位於框內，也不計算、不標示、不進入 AI RESULTS。

### 3. STEP 06｜外部 30 cm Offset 與同畫面深井矩陣

- 外部施工線必須沿建築外輪廓向外偏移 `30 cm`，轉折數量與輪廓形狀保持一致，不得畫成任意大矩形。
- 圖面中必須以尺寸箭頭表示底圖輪廓與外部線的 `30 cm` 距離。
- 深井維持橘色矩形。
- 深井矩陣仍整合於 STEP 06 同一個 CAD 畫面，不新增插頁或第 13 步。
- 8 個矩陣深井中，6 個 `AI-SHAFT` 建立紅色標註，2 個非標準圖層保持灰色並顯示忽略。

### 4. STEP 07、08、10 的框選目的

- STEP 07：教學式展示整層框選，說明「框選界定範圍、圖層決定有效物件」。
- STEP 08：箭頭先點擊 Ribbon 的「自動計算」，再重新框選整層；放開滑鼠後結果才逐項出現。不得一進步驟就直接顯示結果。
- STEP 10：進入 AI 助理時重新框選；框選完成後才解鎖大型輸入框，並逐字補入示範問題，再自動送出。
- 三次框選各有不同敘事目的，畫面不得沿用前一步的黃色框線假裝已完成。

### 5. STEP 09｜獨立長度、總和與外部三角補強

- 外部施工線依封閉外擴輪廓的每個轉角拆成 16 段；每段各有尺寸，16 段合計為 `1,000.00 cm`。
- 圖面上保留完整外擴輪廓，但以 16 個可獨立處理的線段逐筆高亮與標示；總和只在 AI RESULTS 顯示。
- 內部保留 6 個有效橘色深井矩形，各自以紅色箭頭標示 `100.00 cm`。
- 「三角補強」是施工項目名稱；本提案圖面中的簡化幾何必須是白色長方形構件，原本就存在於外部周界，不得放進室內或畫成三角符號。
- `外部三角補強 = 30 個`。
- 詳細算式與明細全部集中於右側 `AI RESULTS`，模型空間不再放大段成果文字，避免遮住底圖。

AI RESULTS 至少包含：

```text
外部長度01～16  各自列出
16 段外部獨立長度＝1,000.00 cm

內部深井01～06  各 100.00 cm
內部深井01＋02＋03＋04＋05＋06＝600.00 cm

施工總長        1,600.00 cm
外部三角補強    30 個
忽略物件        2 個／非標準圖層
```

只有同時「位於目前框選範圍」且「屬於指定標準圖層」的物件才可列入明細。

### 6. AI 助理輸入區

- Docked Panel 寬度至少 `286 px`。
- `<textarea>` 預設 4 行，最小高度至少 `132 px`。
- 動畫順序：框選 → 解鎖輸入框 → 逐字補入問題 → 送出 → 顯示回覆與圖面依據。
- 使用者仍可清除示範文字、自由輸入，Enter 送出，Shift＋Enter 換行。

### 7. 左右等高版面

- 桌機採 `40% / 60%` 雙欄。
- 左側標題、說明、按鈕與步驟列的整體高度，必須與右側 CAD 互動區接近。
- 左右欄最小高度使用同一個 `--cad-min-height-desktop`；右側不得再像附屬縮圖。

### 8. 關鍵字語意色

ACT 01 與 ACT 03 維持原文字色。ACT 02、04、05、06 可針對少量關鍵詞變色：

| 色彩 Token | 語意 |
|---|---|
| `--keyword-ai` | AI、自動取得、自動計算、框選後處理 |
| `--keyword-standard` | 標準圖層、有效物件、可追溯、正確結果 |
| `--keyword-manual` | 人工、逐段、重複、人工加總 |

- 每段最多 1～3 個關鍵片語。
- 變色片語同時加粗，不得只靠顏色辨識。
- 紅色保留給 CAD 的 `AI-DIM`，不得用於一般正文關鍵字。

### 9. 驗收契約

必須測試：

- ACT 02 無任何 selection／box-select。
- STEP 02 含四個標準圖層。
- STEP 07、08、10 各自有整層框選資料。
- STEP 08 點「自動計算」後才框選並逐項顯示結果。
- STEP 09 外部 16 段、六個有效深井、30 個長方形補強與完整 AI RESULTS。
- `16 段外部合計 10 m + 6 × 1 m = 16 m = 1,600.00 cm`。
- AI 輸入框 4 行、至少 132 px，且會在新 selection 後逐字補字。
- ACT 01、03 不使用語意關鍵字色；ACT 02、04、05、06 使用固定三色語意。


## v2.8.2 修正契約

- ACT 標題、說明、步驟控制必須與右側 CAD 互動區位於同一雙欄容器，兩側上緣對齊。
- 所有正式長度尺寸使用水平尺寸線、左右箭頭及水平文字，不以斜引線代替尺寸。
- 外部施工線必須由建築封閉輪廓向外偏移產生，不得穿入建築底圖。
- STEP 09 的外部三角補強使用白色長方形幾何，原本就分布於建築外部周界；編號 01～30 跟著外部逐段標註依序出現。
- STEP 09 的長度算式、合計、數量與忽略原因只顯示於 AI RESULTS，不在模型空間下方重複列出。


## v5.9.2｜過去討論整合修正（最高優先）

- 外部施工輪廓以單一幾何來源建立：ACT 02 逐段點選、ACT 04 繪製、計算、結果與 AI 查詢全部共用同一條 `30 cm` 外擴輪廓。
- 外部每個轉角之間是一個獨立線段，共 16 段；每段有自己的尺寸，合計 `1,000.00 cm` 只顯示在 Docked Panel／AI RESULTS／PDF。
- ACT 04 的人工操作語意是「位置已確認後仍照常繪製」；系統在每個物件完成時自動套用標準圖層並建立尺寸，不得寫成以專用工具取代繪圖人員。
- ACT 04 STEP 04 與 STEP 06 的游標必須跟著所有外部段與多個深井移動；不能只畫一個深井後直接出現其餘結果。
- ACT 04 全部 CAD 動畫加快 25%，ACT 02 動畫速度不變。
- 外部補強是白色長方形構件，開始時已存在於外部周界；編號 01～30 隨外部逐段處理依序出現，數量面板同步從 01 累加至 30。
- 模型空間底部不得顯示人工或 AI 加總算式，只保留底圖線型說明與圖號；所有明細、公式、總和、數量與忽略原因集中於右側面板。
- ACT 02 禁止框選，外部逐段點選必須取自同一外擴輪廓，不能另外畫到底圖內。


## v5.9.3｜專案總結與 ACT 04 文案修正（最高優先）

- ACT 04 必須清楚表達：施工位置與繪製仍由繪圖人員依工程判斷完成，AI 不代替繪圖。
- 每完成一段外部施工線或一個深井後，系統才自動讀取長度、帶入尺寸標註並依標準圖層整理結果。
- ACT 04 內文關鍵字依語意配色：人工操作使用 `--keyword-manual`、AI 後處理使用 `--keyword-ai`、標準圖層使用 `--keyword-standard`；「AI 不代替繪圖」使用前景色粗體。
- 關鍵字設定的文字必須實際存在於標題或內文，不得因片語不一致而失去配色。
- ACT 06 改為 `PROJECT SUMMARY`，以工程經驗規則化、作業標準化與知識系統化收斂提案。
- ACT 06 不得包含 `NEXT STEP`、提問式 CTA、回看流程按鈕或「準備好從一張代表性施工圖開始了嗎？」等舊文案。
- 最後主句固定為：「把繪圖人員的工程經驗，轉成公司可以保存、團隊可以沿用、程式可以執行、AI 可以使用的標準作業系統。」
- 導覽列第六章名稱改為「總結」。

## v2.8.5 GitHub Pages 公開部署契約

- 公開儲存庫固定為 `e1134171019/autocad-ai-proposal`。
- GitHub Actions 建置時，SvelteKit `paths.base` 必須自動使用 `/autocad-ai-proposal`；本機開發仍使用根路徑。
- `main` 分支每次推送都必須執行完整檢查並部署 `build/`。
- GitHub Pages 工作流程使用 `configure-pages`、`upload-pages-artifact` 與 `deploy-pages` 官方 Actions。
- 公開網址為 `https://e1134171019.github.io/autocad-ai-proposal/`。

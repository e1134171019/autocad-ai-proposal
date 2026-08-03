// 職責：集中管理 v5.9.3 人話敘事、現況流程、AI 流程、整層框選與單位資料。
// 輸入：各 ACT 元件與 CAD 模擬器讀取資料。
// 輸出：不可變的網站內容與示範圖面資料。

const FUTURE_EXTERIOR_SEGMENTS = Object.freeze([
  55, 15, 175, 15, 65, 160, 55, 15,
  205, 20, 40, 55, 15, 80, 20, 10
].map((lengthCm, index) => Object.freeze({
  id: `外部長度${String(index + 1).padStart(2, '0')}`,
  objectId: `exterior-${String(index + 1).padStart(2, '0')}`,
  rawLength: lengthCm / 100,
  drawingUnit: 'm',
  lengthCm
})));

const STANDARD_SHAFT_IDS = Object.freeze(['A', 'B', 'D', 'E', 'G', 'H']);
const BRACE_IDS = Object.freeze(Array.from({ length: 30 }, (_, index) => `brace-${String(index + 1).padStart(2, '0')}`));

const SELECTION_CONTEXT = Object.freeze({
  id: 'selection-a03-6f-floor',
  objectIds: Object.freeze([
    ...FUTURE_EXTERIOR_SEGMENTS.map((item) => item.objectId),
    ...STANDARD_SHAFT_IDS.map((id) => `shaft-${id}`),
    ...BRACE_IDS
  ]),
  lengthObjectIds: Object.freeze([
    ...FUTURE_EXTERIOR_SEGMENTS.map((item) => item.objectId),
    ...STANDARD_SHAFT_IDS.map((id) => `shaft-${id}`)
  ]),
  quantityObjectIds: BRACE_IDS,
  ignoredObjectIds: ['reference-shaft-C', 'temp-shaft-F'],
  ignoredReason: '非標準圖層',
  drawingId: 'A-03',
  floor: '6F',
  area: '6F 整層施工範圍',
  boundaryType: 'floor',
  version: 'Rev. B',
  drawingUnit: 'm',
  viewportRange: Object.freeze({ start: [0.04, 0.06], end: [0.94, 0.91] }),
  start: [0.04, 0.06],
  end: [0.94, 0.91],
  isReady: true,
  segmentLengths: Object.freeze([
    ...FUTURE_EXTERIOR_SEGMENTS.map((item) => item.rawLength),
    1, 1, 1, 1, 1, 1
  ]),
  externalSegments: FUTURE_EXTERIOR_SEGMENTS,
  shaftSegments: Object.freeze(STANDARD_SHAFT_IDS.map((id, index) => Object.freeze({
    id: `內部深井${String(index + 1).padStart(2, '0')}`,
    objectId: `shaft-${id}`,
    rawLength: 1,
    drawingUnit: 'm'
  }))),
  quantityResults: Object.freeze([
    Object.freeze({ id: 'triangle-brace', label: '外部三角補強', count: 30, unit: '個', layer: 'AI-BRACE' })
  ])
});

export const futureExteriorSegments = FUTURE_EXTERIOR_SEGMENTS;
export const manualExteriorSegments = Object.freeze([
  Object.freeze({ id: '外部01', lengthCm: 100 }),
  Object.freeze({ id: '外部02', lengthCm: 80 }),
  Object.freeze({ id: '外部03', lengthCm: 30 }),
  Object.freeze({ id: '外部04', lengthCm: 40 }),
  Object.freeze({ id: '外部05', lengthCm: 60 })
]);

export const manualShaftItems = Object.freeze([
  Object.freeze({ id: '內部深井01', lengthCm: 100 }),
  Object.freeze({ id: '內部深井02', lengthCm: 100 }),
  Object.freeze({ id: '內部深井03', lengthCm: 100 }),
  Object.freeze({ id: '內部深井04', lengthCm: 100 })
]);

export const heroContent = Object.freeze({
  eyebrow: 'AutoCAD × AI 智能作業提案',
  title: 'AutoCAD 工作流程，如何導入 AI 智能作業？',
  lead: '從每段聚合線的長度、整張圖的施工總長，到圖面中的元件數量，讓繪圖人員能在 AutoCAD 裡直接查看、詢問與確認結果。',
  sections: [
    {
      id: '01',
      title: '客戶的需求',
      paragraphs: ['這次客戶希望把 AI 導入公司現有的 AutoCAD 作業。當繪圖人員完成施工範圍後，工具可以自動取得每一段聚合線的長度，加總同一張圖面的施工總長，並整理圖面中的元件數量，例如外部三角補強 30 個。']
    },
    {
      id: '02',
      title: '我們的目標',
      paragraphs: [
        '我們希望把這個需求做成一套能直接放進 AutoCAD 使用的 AI 智能工具。',
        '這套工具要能套用到不同樓層、立面與後續專案。繪圖人員完成施工範圍後，就能直接查看每段長度、施工總長與元件數量，並進一步詢問和確認結果。'
      ]
    },
    {
      id: '03',
      title: '真正的難點',
      paragraphs: [
        '一個 CAD 檔案裡，可能同時放著 4 樓、6 樓和屋頂層的施工圖，也可能同時包含外部、深井、平面圖、立面圖，以及修改前後的不同版本。',
        '例如，繪圖人員現在只想計算「6 樓外部施工範圍」，AI 就不能把 6 樓深井、其他樓層，或舊版本中的聚合線一起加進來。圖面中的元件也是一樣，只有位於這次施工範圍內、符合指定條件的元件才能列入數量。',
        '所以真正的難點不是長度怎麼加，而是先確認這次要算的是哪一張圖、哪一層、哪一個範圍，以及哪些線條和元件應該被算進來。'
      ],
      highlight: 'AI 必須先知道「這次要算什麼」，才不會把不該算的內容一起加進來。'
    },
    {
      id: '04',
      title: '先理解現況',
      paragraphs: [
        '在開始做工具之前，我們要先看懂繪圖人員現在是怎麼完成一張施工圖的。',
        '圖面拿到後怎麼拆？施工範圍怎麼判斷？聚合線怎麼畫？每段長度怎麼查看？整張圖怎麼加總？元件數量又是怎麼整理和檢查的？',
        '只有把這些實際操作弄清楚，AI 才知道接下來要看哪張圖、計算哪些內容，以及怎麼整理結果。',
        '接下來，我們就從原始 CAD 圖面開始，走一次目前的完整流程。'
      ]
    }
  ]
});

export const currentFlowNodes = Object.freeze([
  { id: 1, label: '建商提供原始 CAD 圖面', desc: '建商提供平面圖、立面圖與剖面圖，繪圖人員先確認本次要處理的樓層與圖面版本。', animType: 'static' },
  { id: 2, label: '導入建商圖面與原始圖層', desc: '將建商提供的 CAD 圖面導入工作檔，保留原本的樓層與圖層資料，作為後續判斷施工範圍與繪製施工線的底圖。', animType: 'static-sheets', highlights: [{ text: '建商圖面', tone: 'manual' }, { text: '原始圖層', tone: 'manual' }] },
  { id: 3, label: '判斷外部與深井的施工範圍', desc: '人工判斷建築外部與內部深井的位置，作為後續繪製與標註的依據。', animType: 'static-zones', highlights: [{ text: '人工判斷', tone: 'manual' }] },
  { id: 4, label: '沿施工範圍繪製線段或聚合線', desc: '繪圖人員依照圖面與繪圖方式，選擇使用線段或聚合線繪製施工範圍。外部與內部深井可能由單一或多段線組成，線段之間也不一定接合。', animType: 'draw', highlights: [{ text: '線段或聚合線', tone: 'manual' }, { text: '不一定接合', tone: 'manual' }] },
  { id: 5, label: '目前查看尺寸的方法', desc: '繪圖人員需要逐段點選線段或聚合線，再從性質面板查看每一段長度。施工線越多，人工點選、記錄與加總的時間就越長，也可能發生漏點、重複計算或漏算。', animType: 'manual-inspect', highlights: [{ text: '逐段點選', tone: 'manual' }, { text: '性質面板', tone: 'manual' }, { text: '漏點、重複計算或漏算', tone: 'manual' }] },
  { id: 6, label: '點擊標註工具，逐段建立水平紅色尺寸', desc: '每次先點選線段，再點擊尺寸標註按鈕，建立水平尺寸線與左右箭頭並輸入文字。右側人工記錄會隨每一筆完成逐個增加，模型空間下方不放加總公式。', animType: 'manual-label-slow', highlights: [{ text: '逐段建立', tone: 'manual' }, { text: '人工記錄', tone: 'manual' }] },
  { id: 7, label: '人工加總外部與內部深井長度', desc: '外部以 100＋80＋30＋40＋60 逐段加總；內部深井以 100＋100＋100＋100 逐個加總。', animType: 'sum', highlights: [{ text: '人工加總', tone: 'manual' }] },
  { id: 8, label: '依長度人工換算施工數量', desc: '依公司施工條件人工換算外部三角補強等構件數量，並再次確認圖面與計算結果。', animType: 'quantity-slow', highlights: [{ text: '人工換算', tone: 'manual' }] },
  { id: 9, label: '調整線條、文字及圖面位置', desc: '最後再人工調整箭頭、文字、尺寸與圖面配置，完成施工圖整理。', animType: 'adjust', highlights: [{ text: '人工調整', tone: 'manual' }] }
]);

export const futureFlowSteps = Object.freeze([
  { id: 1, label: '建商提供原始 CAD 圖面', desc: '平面圖、立面圖與剖面圖，流程起點不變。', animType: 'static' },
  { id: 2, label: '建立標準圖層，定義程式可處理的物件', desc: '先建立 AI-EXTERIOR、AI-SHAFT、AI-DIM 與 AI-BRACE。標準圖層是 AI 判斷資料的依據；參考線、暫存線與建築底圖不會被納入。', animType: 'standard-layers', highlights: [{ text: '標準圖層', tone: 'standard' }, { text: 'AI 判斷', tone: 'ai' }] },
  { id: 3, label: '判斷外部與深井的施工範圍', desc: '繪圖人員確認施工位置；物件完成後，系統再自動套用正確圖層。', animType: 'static-zones', highlights: [{ text: '繪圖人員確認施工位置', tone: 'manual' }, { text: '自動套用', tone: 'ai' }, { text: '正確圖層', tone: 'standard' }] },
  { id: 4, label: '依已確認位置，逐段繪製外部線與多個深井', desc: '位置確認後，外部施工線與深井仍由繪圖人員依工程判斷逐段繪製，AI 不代替繪圖。每完成一段外部線或一個深井，系統才會自動讀取物件長度並帶入尺寸標註，再依照標準圖層整理後續計算結果。', animType: 'guided-draw', highlights: [{ text: '逐段繪製', tone: 'manual' }, { text: '外部施工線與深井仍由繪圖人員依工程判斷逐段繪製', tone: 'manual' }, { text: 'AI 不代替繪圖', tone: 'emphasis' }, { text: '自動讀取物件長度並帶入尺寸標註', tone: 'ai' }, { text: '標準圖層', tone: 'standard' }] },
  { id: 5, label: '完成繪製後，AI 自動設定圖層、顏色及線寬', desc: '外部線、深井、尺寸與補強完成後，系統依施工類型自動套用標準圖層與 ByLayer 性質。', animType: 'auto-layer', highlights: [{ text: '完成繪製後', tone: 'manual' }, { text: 'AI 自動設定', tone: 'ai' }, { text: '標準圖層', tone: 'standard' }] },
  { id: 6, label: '完成繪製後，AI 自動取得每段長度並建立尺寸', desc: '繪圖人員逐段完成外部施工線與多個深井後，AI 才讀取各物件長度並建立各自尺寸。外部施工線依轉角分成 16 段，合計為 1,000.00 cm；只有 AI-SHAFT 標準圖層的深井會建立紅色 AI-DIM 尺寸。', animType: 'auto-label', highlights: [{ text: '完成繪製後', tone: 'manual' }, { text: '繪圖人員逐段完成', tone: 'manual' }, { text: 'AI 自動取得每段長度並建立尺寸', tone: 'ai' }, { text: 'AI 才讀取各物件長度並建立各自尺寸', tone: 'ai' }, { text: '標準圖層', tone: 'standard' }] },
  { id: 7, label: '使用滑鼠框選目前樓層範圍', desc: '十字游標一次框住整個樓層施工範圍。框選界定空間邊界，標準圖層決定哪些物件有效。', animType: 'box-select-fast', selection: SELECTION_CONTEXT, highlights: [{ text: '框選', tone: 'ai' }, { text: '標準圖層', tone: 'standard' }] },
  { id: 8, label: '點擊自動計算，框選後才顯示分類結果', desc: '箭頭先點擊自動計算，接著重新框選整層範圍。放開滑鼠後才依標準圖層過濾，並逐項顯示 22 個有效長度物件、30 個有效補強構件、2 個忽略物件、外部合計、深井合計與施工總長。', animType: 'panel-fast', selection: SELECTION_CONTEXT, highlights: [{ text: '自動計算', tone: 'ai' }, { text: '框選後', tone: 'ai' }, { text: '標準圖層', tone: 'standard' }] },
  { id: 9, label: 'AI 自動換算獨立長度、總和長度與元件數量', desc: 'AI RESULTS 依序列出 16 段外部獨立長度、六個有效深井、各分類合計、施工總長，以及外部三角補強 30 個。長方形補強構件一開始就存在於外部周界，編號 01～30 會跟著外部逐段標註依序出現；詳細明細只留在面板。', animType: 'result-three', highlights: [{ text: 'AI 自動換算', tone: 'ai' }, { text: '外部三角補強', tone: 'standard' }] },
  { id: 10, label: '先框選，再由 AI 助理補字提問', desc: '步驟進入後先重新框選整層範圍；框選有效後，放大的輸入框會逐字輸入示範問題，再送出並取得可追溯結果。', animType: 'ai-query', selection: SELECTION_CONTEXT, highlights: [{ text: '先框選', tone: 'ai' }, { text: 'AI 助理', tone: 'ai' }, { text: '可追溯', tone: 'standard' }] },
  { id: 11, label: '確認計算結果', desc: '繪圖人員確認獨立長度、分類合計、外部三角補強數量與忽略原因，必要時返回圖面修正。', animType: 'confirm', highlights: [{ text: '確認計算結果', tone: 'standard' }] },
  { id: 12, label: '在 AutoCAD 內原生輸出圖面及 PDF 報告', desc: '確認後輸出圖面與 PDF 報告，保留框選範圍、圖層依據、獨立長度、加總與數量結果。', animType: 'pdf-preview', highlights: [{ text: '保留', tone: 'standard' }] }
]);

export const standardShaftLayers = Object.freeze(['AI-SHAFT']);
export const standardCalculationLayers = Object.freeze(['AI-EXTERIOR', 'AI-SHAFT', 'AI-BRACE']);

export const shaftMatrixItems = Object.freeze([
  { id: 'A', layer: 'AI-SHAFT', rawLength: 1, drawingUnit: 'm', row: 0, column: 0 },
  { id: 'B', layer: 'AI-SHAFT', rawLength: 1, drawingUnit: 'm', row: 0, column: 1 },
  { id: 'C', layer: 'REFERENCE-SHAFT', rawLength: 1, drawingUnit: 'm', row: 0, column: 2 },
  { id: 'D', layer: 'AI-SHAFT', rawLength: 1, drawingUnit: 'm', row: 0, column: 3 },
  { id: 'E', layer: 'AI-SHAFT', rawLength: 1, drawingUnit: 'm', row: 1, column: 0 },
  { id: 'F', layer: 'TEMP-SHAFT', rawLength: 1, drawingUnit: 'm', row: 1, column: 1 },
  { id: 'G', layer: 'AI-SHAFT', rawLength: 1, drawingUnit: 'm', row: 1, column: 2 },
  { id: 'H', layer: 'AI-SHAFT', rawLength: 1, drawingUnit: 'm', row: 1, column: 3 }
]);

export const risks = Object.freeze([
  '遺漏部分線段或重複計算', '施工範圍認定不一致', '圖層、標註與幾何尺寸不一致',
  '多張圖面或多區域混合計算', '結果缺少可追溯的圖面依據', '圖面修改後必須重新人工複核'
].map((label, index) => ({ id: index + 1, label })));

export const intelligenceLayers = Object.freeze([
  { id: 1, label: '圖面身分', desc: 'AI 先確認正在處理哪一張圖。', items: ['樓層', '立面', '剖面', '圖號', '版本'] },
  { id: 2, label: '施工區域', desc: 'AI 確認本次作業的空間邊界。', items: ['外部', '深井', '區域名稱', '框選範圍'] },
  { id: 3, label: '圖面物件', desc: 'AI 理解需要設定、取得與整理的 CAD 內容。', items: ['Polyline', '圖塊', '文字', '圖層'] },
  { id: 4, label: '公司規則', desc: 'AI 套用公司確認的繪圖與換算條件。', items: ['圖層名稱', '顏色', '線寬', '單位', '換算方式'] },
  { id: 5, label: '計算關係', desc: 'AI 決定哪些內容要分類、加總、換算或隔離。', items: ['長度加總', '元件統計', '禁止混算'] }
]);

export const aiResponsibilities = Object.freeze([
  '理解目前圖面身分、施工區域與框選範圍',
  '自動設定圖層、顏色及線寬，並取得各段長度',
  '自動分類加總，依公司條件換算施工項目與元件數量',
  '整理異常、差異、缺少條件與複核摘要',
  '回答使用者查詢，並整理圖面與 PDF 報告內容'
]);

export const benefits = Object.freeze([
  '降低人工計算及複核時間', '減少漏算、重算及混算風險', '統一不同人員的圖面判讀方式',
  '加快圖面修改後的重新計算', '保留完整的計算依據', '建立後續擴充其他施工項目的基礎'
]);

export const acceptanceCriteria = Object.freeze([
  '指定施工區域是否正確分離', '圖層及施工類型是否正確分類', '線段長度是否正確',
  '數量統計是否與人工複核一致', '異常物件是否能被標示或提示', '計算結果是否能定位至原始圖面', '報表內容是否符合使用需求'
]);
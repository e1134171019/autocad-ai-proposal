export const preserveCases = [
  'AI 不代替繪圖。',
  '外部以 100＋80＋30＋40＋60 逐段加總；內部深井以 100＋100＋100＋100 逐個加總。',
  '外掛啟動後，系統會自動建立 AI-EXTERIOR、AI-SHAFT、AI-DIM 與 AI-BRACE 等標準圖層。',
  '繪圖人員確認獨立長度、分類合計、外部三角補強數量與忽略原因，必要時返回圖面修正。',
  'AI 先確認正在處理哪一張圖。',
  '每筆結果保留圖面物件、圖層、框選範圍、套用條件與產生時間；缺少條件時標示待確認。',
  '指定施工區域是否正確分離。',
  '原生 AutoCAD 的框選主要用來一次選取範圍內的物件。'
];

export const rewriteCases = [
  { text: '接下來，我們就從原始 CAD 圖面開始，走一次目前的完整流程。', rule: 'meta-intro' },
  { text: '我們特別針對框選功能做了設計。', rule: 'vague-intro' },
  { text: '為了能夠更好地滿足客戶需求，我們決定重新設計整個系統架構。', rule: 'wordy-wrapper' },
  { text: '本專案旨在達到提升效率的目的。', rule: 'wordy-wrapper' },
  { text: '此外，這套工具將進一步協助繪圖人員整理結果。', rule: 'meta-intro' },
  { text: '這不只是一個工具，而是一套完整的智能作業系統。', rule: 'binary-frame' },
  { text: '透過 AI 賦能現有流程，打造更卓越的作業體驗。', rule: 'buzzword' },
  { text: '系統對結果進行分類與整理。', rule: 'weak-verb' }
];

export const unsupportedClaimCases = [
  '導入 AI 工具後，處理速度更快，每次作業所需時間也更穩定、更接近平均值。',
  '降低人工計算及複核時間。',
  '減少漏算、重算及混算風險。',
  '加快圖面修改後的重新計算。'
];

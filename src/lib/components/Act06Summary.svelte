<!-- 職責：以專案總結收斂工程經驗規則化、標準化與 AI 系統化價值。 -->
<!-- 輸入：固定提案總結文案。 -->
<!-- 輸出：ACT 06 最終總結，不包含額外行動呼籲。 -->
<section id="act-06" class="section summary">
  <div class="section-inner">
    <p class="eyebrow">ACT 06 / PROJECT SUMMARY</p>
    <h2 class="section-title">
      從<span class="keyword-manual">工程經驗</span>，走向可持續改善的
      <span class="keyword-ai">AI</span>
      <span class="keyword-standard">標準作業系統</span>
    </h2>

    <div class="summary-copy">
      <p>
        本專案將繪圖人員長期累積的拆圖方式、施工範圍判斷、線段與深井繪製、尺寸標註、長度計算及元件清點經驗，整理成明確的
        <strong class="keyword-standard">圖面條件、判斷邏輯與計算規則</strong>，逐步建立可重複使用的 AutoCAD AI 作業流程。
      </p>
      <p>
        <strong class="keyword-manual">繪圖人員仍負責工程判斷與最終確認</strong>；AI 依照公司建立的標準，在物件完成後協助帶入長度、建立標註、分類加總、統計數量與檢查結果。隨著實際案例持續累積，作業將由個人經驗逐步走向
        <strong class="keyword-standard">規則化、標準化與系統化</strong>，作為未來擴大 <strong class="keyword-ai">AI 自動化應用</strong>的基礎。
      </p>
    </div>

    <div class="progression" aria-label="工程經驗系統化路徑">
      <div><span>01</span><strong>經驗規則化</strong></div>
      <div><span>02</span><strong>作業標準化</strong></div>
      <div><span>03</span><strong>知識系統化</strong></div>
    </div>

    <blockquote>
      把繪圖人員的工程經驗，轉成公司可以保存、團隊可以沿用、程式可以執行、AI 可以使用的標準作業系統。
    </blockquote>
  </div>
</section>

<style>
  .summary { min-height: auto; background: var(--bg-surface); }
  .summary-copy { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-5); margin-top: var(--space-6); padding-top: var(--space-5); border-top: var(--line-thin) solid var(--border-strong); }
  .summary-copy p { margin: 0; color: var(--text-secondary); font-size: clamp(1rem, 1.35vw, 1.15rem); }
  .keyword-ai { color: var(--keyword-ai); font-weight: 700; }
  .keyword-standard { color: var(--keyword-standard); font-weight: 700; }
  .keyword-manual { color: var(--keyword-manual); font-weight: 700; }
  .progression { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: var(--space-6); border-top: var(--line-thin) solid var(--border-strong); border-bottom: var(--line-thin) solid var(--border-strong); }
  .progression div { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) 0; }
  .progression div + div { padding-left: var(--space-3); border-left: var(--line-thin) solid var(--border); }
  .progression span { color: var(--primary); font: 600 .72rem/1 var(--font-display); }
  .progression strong { color: var(--foreground); font: 600 clamp(1rem, 1.6vw, 1.3rem)/1.35 var(--font-display); }
  blockquote { max-width: 1040px; margin: var(--space-6) 0 0; padding: var(--space-5) 0 0; border-top: 3px solid var(--keyword-standard); color: var(--foreground); font: 600 clamp(1.55rem, 3vw, 2.8rem)/1.35 var(--font-display); letter-spacing: -.035em; }
  @media (max-width: 768px) {
    .summary-copy, .progression { grid-template-columns: 1fr; }
    .progression div + div { padding-left: 0; border-top: var(--line-thin) solid var(--border); border-left: 0; }
  }
</style>

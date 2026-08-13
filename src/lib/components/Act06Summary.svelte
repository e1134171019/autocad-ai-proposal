<!-- 職責：以短收尾收斂工程經驗規則化、程式計算與 AI 助理的責任邊界。 -->
<!-- 輸入：固定提案總結文案。 -->
<!-- 輸出：S 權重 ACT 06 最終總結，不包含額外行動呼籲。 -->
<section id="act-06" class="section section-weight-s summary">
  <div class="section-inner">
    <p class="eyebrow">ACT 06 / PROJECT SUMMARY</p>
    <h2 class="section-title">專案效益與預期成果</h2>

    <p class="responsibility-line">人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。</p>

    <div class="summary-copy">
      <p>
        這套方案的設計目標，是減少逐段查值、人工記錄、加總與重複複核，把施工範圍、圖層與計算方式整理成
        <strong class="keyword-standard">固定規則</strong>。實際節省的工時與改善幅度目前沒有量測數據，後續需使用相同施工圖與相同條件進行前後比較。
      </p>
      <p>
        <strong class="keyword-manual">繪圖人員負責工程判斷與最終確認</strong>；程式依標準圖層、框選範圍與公司規則計算，AI 助理使用既有結果協助查詢、解釋與摘要。
      </p>
    </div>

    <div class="progression" aria-label="工程經驗系統化路徑">
      <div><span>01</span><strong>經驗規則化</strong></div>
      <div><span>02</span><strong>作業標準化</strong></div>
      <div><span>03</span><strong>知識系統化</strong></div>
    </div>

    <blockquote>
      將繪圖人員的工程經驗整理成公司可以保存、團隊可以沿用、程式可以執行的作業規則。
    </blockquote>
  </div>
</section>

<style>
  .summary { background: var(--bg-surface); }
  .responsibility-line { max-width: 900px; margin: var(--space-3) 0 0; color: var(--foreground); font: 600 clamp(1.2rem, 2vw, 1.65rem)/1.45 var(--font-display); letter-spacing: -.02em; }
  .summary-copy { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-4); padding-top: var(--space-4); border-top: var(--line-thin) solid var(--border-strong); }
  .summary-copy p { margin: 0; color: var(--text-secondary); font-size: clamp(.98rem, 1.2vw, 1.08rem); }
  .keyword-standard, .keyword-manual { font-weight: 700; }
  .progression { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: var(--space-4); border-top: var(--line-thin) solid var(--border-strong); border-bottom: var(--line-thin) solid var(--border-strong); }
  .progression div { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-2) 0; }
  .progression div + div { padding-left: var(--space-3); border-left: var(--line-thin) solid var(--border); }
  .progression span { color: var(--primary); font: 600 .68rem/1 var(--font-display); }
  .progression strong { color: var(--foreground); font: 600 clamp(.95rem, 1.4vw, 1.15rem)/1.35 var(--font-display); }
  blockquote { max-width: 980px; margin: var(--space-4) 0 0; padding: var(--space-3) 0 0; border-top: 2px solid var(--border-strong); color: var(--foreground); font: 600 clamp(1.3rem, 2.5vw, 2.15rem)/1.35 var(--font-display); letter-spacing: -.03em; }
  @media (max-width: 768px) {
    .summary-copy, .progression { grid-template-columns: 1fr; }
    .summary-copy { gap: var(--space-3); margin-top: var(--space-3); padding-top: var(--space-3); }
    .progression { margin-top: var(--space-3); }
    .progression div + div { padding-left: 0; border-top: var(--line-thin) solid var(--border); border-left: 0; }
    blockquote { margin-top: var(--space-3); }
  }
</style>

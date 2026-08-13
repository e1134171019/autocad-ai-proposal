<!-- 職責：以提案操作示意呈現外掛十二步流程；CAD 動畫只用來說明預計操作與介面概念。 -->
<!-- 輸入：futureFlowSteps 與共用 CadProcess。 -->
<!-- 輸出：XL 權重的 ACT 04 Concept Simulation 與 proposed system 互動。 -->
<script>
  import CadProcess from './CadProcess.svelte';
  import { futureFlowSteps } from '$lib/content/siteContent.js';
</script>

<section id="act-04" class="section section-weight-xl solution">
  <div class="section-inner-wide">
    <div class="simulation-boundary" aria-label="提案操作示意說明">
      <p class="mono simulation-label">Concept Simulation｜提案操作示意</p>
      <p>以下畫面用來說明預計的 AutoCAD 操作流程與介面概念，不代表 AutoCAD API／實際 DWG 整合已完成，也不是正式產品驗證結果。</p>
    </div>

    <CadProcess eyebrow="ACT 04 / PROPOSED SYSTEM" title="我們的解決方案" titleHighlights={[{ text: '我們的解決方案', tone: 'ai' }]} lead="外掛先建立標準圖層，繪圖人員依工程需求判斷施工位置並完成施工線繪製。完成後以框選範圍定義本次計算區域，程式依圖層、CAD 物件與公司規則整理長度及數量，再提供結果確認與 AI 助理查詢。" leadHighlights={[{ text: '標準圖層', tone: 'standard' }, { text: '繪圖人員', tone: 'manual' }, { text: '框選範圍', tone: 'standard' }, { text: 'AI 助理', tone: 'ai' }]} processSteps={futureFlowSteps} mode="future" />
  </div>
</section>

<style>
  .solution { background: var(--bg-subtle); }
  .simulation-boundary { max-width: 880px; margin-bottom: var(--space-3); padding: var(--space-2) 0; border-block: var(--line-thin) solid var(--border); }
  .simulation-label { margin: 0; color: var(--text-muted); font-size: .72rem; letter-spacing: .08em; }
  .simulation-boundary p:last-child { max-width: 800px; margin: var(--space-1) 0 0; color: var(--text-secondary); font-size: .95rem; }
  @media (max-width: 768px) {
    .simulation-boundary { margin-bottom: var(--space-2); }
  }
</style>

<!-- 職責：以提案操作示意呈現外掛十二步流程；CAD 動畫只用來說明預計操作與介面概念。 -->
<!-- 輸入：futureFlowSteps 與共用 CadProcess。 -->
<!-- 輸出：ACT 04 Concept Simulation 與 proposed system 互動。 -->
<script>
  import CadProcess from './CadProcess.svelte';
  import { futureFlowSteps } from '$lib/content/siteContent.js';
</script>

<section id="act-04" class="section solution">
  <div class="section-inner-wide">
    <div class="simulation-boundary" aria-label="提案操作示意說明">
      <p class="mono simulation-label">Concept Simulation｜提案操作示意</p>
      <p>以下畫面用來說明預計的 AutoCAD 操作流程與介面概念，不代表 AutoCAD API／實際 DWG 整合已完成，也不是正式產品驗證結果。</p>
    </div>

    <CadProcess eyebrow="ACT 04 / PROPOSED SYSTEM" title="本團隊提出的系統方案" titleHighlights={[{ text: '本團隊提出的系統方案', tone: 'ai' }]} lead="我們把畫線、圖層、標註、框選、分類、加總與查詢整合在 AutoCAD 原生介面中。" leadHighlights={[{ text: '整合', tone: 'ai' }]} processSteps={futureFlowSteps} mode="future" />
  </div>
</section>

<style>
  .solution { background: var(--bg-subtle); }
  .simulation-boundary { max-width: 920px; margin-bottom: var(--space-4); padding: var(--space-3) 0; border-block: var(--line-thin) solid var(--border); }
  .simulation-label { margin: 0; color: var(--text-muted); font-size: .75rem; letter-spacing: .08em; }
  .simulation-boundary p:last-child { max-width: 820px; margin: var(--space-1) 0 0; color: var(--text-secondary); }
</style>

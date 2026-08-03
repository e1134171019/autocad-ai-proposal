<!-- 職責：呈現導入 AI 後的十二步流程；多深井矩陣整合在 STEP 06 的 CAD 動畫內。 -->
<!-- 輸入：futureFlowSteps 與共用 CadProcess。 -->
<!-- 輸出：ACT 04 AI 智能作業互動。 -->
<script>
  import CadProcess from './CadProcess.svelte';
  import { futureFlowSteps } from '$lib/content/siteContent.js';
</script>

<section id="act-04" class="section solution">
  <div class="section-inner-wide">
    <CadProcess eyebrow="ACT 04 / PROPOSED SYSTEM" title="互動呈現本團隊提出的系統方案" titleHighlights={[{ text: '本團隊提出的系統方案', tone: 'ai' }]} lead="我們把畫線、圖層、標註、框選、分類、加總與查詢整合在 AutoCAD 原生介面中。" leadHighlights={[{ text: '整合', tone: 'ai' }]} processSteps={futureFlowSteps} mode="future" />
  </div>
</section>

<style>
  .solution { background: var(--bg-subtle); }
</style>

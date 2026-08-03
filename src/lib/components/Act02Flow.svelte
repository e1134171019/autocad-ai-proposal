<!-- 職責：呈現九個現況 CAD 作業流程節點與完整框選動作。 -->
<!-- 輸入：currentFlowNodes 與共用 CadProcess。 -->
<!-- 輸出：ACT 02 現況流程互動。 -->
<script>
  import CadProcess from './CadProcess.svelte';
  import { currentFlowNodes } from '$lib/content/siteContent.js';
</script>

<section id="act-02" class="section flow">
  <div class="section-inner-wide">
    <CadProcess
      eyebrow="ACT 02 / CURRENT MANUAL WORKFLOW"
      title="目前貴司工作流程"
      lead="我們先模擬貴公司目前的施工圖作業流程，看看一張圖面從判斷施工範圍、畫線、標註，到長度加總與數量換算，是怎麼完成的。"
      leadHighlights={[{ text: '施工圖作業流程', tone: 'manual' }, { text: '長度加總', tone: 'manual' }, { text: '數量換算', tone: 'manual' }]}
      processSteps={currentFlowNodes}
      mode="current"
    />
  </div>
</section>

<style>
  .flow { background: var(--bg-surface); }
</style>

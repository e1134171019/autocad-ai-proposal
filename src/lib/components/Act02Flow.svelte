<!-- 職責：呈現九個現況 CAD 作業流程節點與完整框選動作。 -->
<!-- 輸入：currentFlowNodes 與共用 CadProcess。 -->
<!-- 輸出：M 權重的 ACT 02 現況流程互動。 -->
<script>
  import CadProcess from './CadProcess.svelte';
  import { currentFlowNodes } from '$lib/content/siteContent.js';
</script>

<section id="act-02" class="section section-weight-m flow">
  <div class="section-inner-wide">
    <CadProcess
      eyebrow="ACT 02 / CURRENT MANUAL WORKFLOW"
      title="目前客戶的流程"
      lead="客戶目前從原始 CAD 圖面開始，由繪圖人員判斷施工範圍、繪製線段或聚合線，再逐段查看長度、建立標註、人工加總並換算施工數量。最後還需要整理線條、文字、尺寸與圖面位置。"
      leadHighlights={[{ text: '施工範圍', tone: 'manual' }, { text: '逐段查看長度', tone: 'manual' }, { text: '人工加總', tone: 'manual' }, { text: '換算施工數量', tone: 'manual' }]}
      processSteps={currentFlowNodes}
      mode="current"
    />
  </div>
</section>

<style>
  .flow { background: var(--bg-surface); }
</style>

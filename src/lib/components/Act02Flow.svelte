<!-- 職責：呈現九個現況 CAD 作業流程節點，沿用既有動畫並加入客戶導向文案與三階段閱讀資訊。 -->
<!-- 輸入：act02ProcessSteps、currentFlowStages 與共用 CadProcess。 -->
<!-- 輸出：ACT 02 現況流程互動。 -->
<script>
  import CadProcess from './CadProcess.svelte';
  import { act02Content, act02ProcessSteps, currentFlowStages } from '$lib/content/act02CurrentWorkflowV2.js';
</script>

<section id="act-02" class="section flow">
  <div class="section-inner-wide">
    <CadProcess
      eyebrow={act02Content.eyebrow}
      title={act02Content.title}
      lead={act02Content.lead}
      processSteps={act02ProcessSteps}
      processStages={currentFlowStages}
      mode="current"
    />
  </div>
</section>

<style>
  .flow { background: var(--bg-surface); }
</style>

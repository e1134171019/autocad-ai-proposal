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
      eyebrow="ACT 02 / CURRENT PROCESS"
      title="一張施工圖，現在如何逐段標註與人工加總？"
      titleHighlights={[{ text: '逐段標註', tone: 'manual' }, { text: '人工加總', tone: 'manual' }]}
      lead="接下來，我們跟著目前的人工工作方式走一次：逐段點選、逐段標註、逐筆記錄，再人工加總與換算數量。"
      leadHighlights={[{ text: '人工工作方式', tone: 'manual' }, { text: '逐段標註', tone: 'manual' }, { text: '人工加總', tone: 'manual' }]}
      processSteps={currentFlowNodes}
      mode="current"
    />
  </div>
</section>

<style>
  .flow { background: var(--bg-surface); }
</style>

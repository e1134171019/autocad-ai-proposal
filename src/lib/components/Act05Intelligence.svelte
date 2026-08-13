<!-- 職責：說明規則計算、AI 助理與結果可追溯性的責任邊界。 -->
<!-- 輸入：intelligenceLayers、deterministicResponsibilities、assistantResponsibilities 與 contextMap。 -->
<!-- 輸出：L 權重的 ACT 05 計算責任、支援型 AI、計算上下文與可追溯證據鏈。 -->
<script>
  import { onMount } from 'svelte';
  import {
    intelligenceLayers,
    deterministicResponsibilities,
    assistantResponsibilities
  } from '$lib/content/siteContent.js';
  import { renderContextMap } from '$lib/charts/contextMap.js';

  let chartContainer;

  const traceabilityFields = Object.freeze([
    { label: 'Object', desc: '對應原始 CAD 物件' },
    { label: 'Layer', desc: '物件所在標準圖層' },
    { label: 'Selection Boundary', desc: '本次框選的計算範圍' },
    { label: 'Rule', desc: '套用的分類或換算規則' },
    { label: 'Result', desc: '長度、分類合計或數量結果' },
    { label: 'Ignored Reason', desc: '未計入時保留排除原因' }
  ]);

  onMount(() => renderContextMap(chartContainer, intelligenceLayers, {}));
</script>

<section id="act-05" class="section section-weight-l intelligence">
  <div class="section-inner">
    <p class="eyebrow">ACT 05 / CALCULATION & RESULT TRACEABILITY</p>
    <h2 class="section-title">系統計算方式與 AI 分工</h2>
    <p class="section-lead">框選範圍與標準圖層先決定本次哪些物件需要計算。C# 規則引擎負責篩選、分類、長度與數量計算，並保留未計入物件的原因；AI 助理只使用已完成的計算結果進行查詢、解釋與摘要，最後仍由人員確認。</p>

    <div class="intelligence-layout">
      <div class="responsibilities">
        <section class="responsibility-group rule-engine" aria-labelledby="rule-engine-title">
          <p id="rule-engine-title" class="mono label">C# / Rule Engine</p>
          <p class="group-lead">精確的篩選、分類、長度與數量計算由規則處理。</p>
          <ol>
            {#each deterministicResponsibilities as responsibility, index}
              <li><span>0{index + 1}</span><p>{responsibility}</p></li>
            {/each}
          </ol>
        </section>

        <section class="responsibility-group assistant" aria-labelledby="assistant-title">
          <p id="assistant-title" class="mono label">AI Assistant</p>
          <p class="group-lead">AI 助理使用已計算的結果協助查詢與說明，不改寫規則引擎產生的數值。</p>
          <ol>
            {#each assistantResponsibilities as responsibility, index}
              <li><span>0{index + 1}</span><p>{responsibility}</p></li>
            {/each}
          </ol>
        </section>
      </div>

      <div class="context-panel">
        <p class="mono label">CALCULATION CONTEXT</p>
        <div class="chart" bind:this={chartContainer}></div>
      </div>
    </div>

    <section class="traceability" aria-labelledby="traceability-title">
      <div class="traceability-heading">
        <p class="mono label">TRACEABILITY</p>
        <h3 id="traceability-title">每筆結果都能回到圖面與計算依據</h3>
        <p>結果保留原始物件、圖層、本次框選範圍與套用規則；未計入的物件也保留忽略原因，讓繪圖人員可以追溯結果來源。</p>
      </div>

      <div class="evidence-grid">
        {#each traceabilityFields as field, index}
          <div class="evidence-item">
            <span class="evidence-index">0{index + 1}</span>
            <strong>{field.label}</strong>
            <p>{field.desc}</p>
          </div>
        {/each}
      </div>
    </section>
  </div>
</section>

<style>
  .intelligence { background: var(--bg-overlay); }
  .intelligence-layout { display: grid; grid-template-columns: minmax(300px, .8fr) minmax(420px, 1.2fr); grid-template-areas: 'context responsibilities'; gap: var(--space-5); align-items: start; margin-top: var(--space-5); }
  .context-panel { grid-area: context; min-width: 0; }
  .chart { min-height: 420px; margin-top: var(--space-2); border: var(--line-thin) solid var(--border-strong); background: var(--technical-subtle); }
  .chart :global(svg) { display: block; width: 100%; height: auto; }
  .label { margin: 0; color: var(--text-muted); font-size: .72rem; letter-spacing: .08em; }
  .responsibilities { grid-area: responsibilities; display: grid; align-content: start; gap: var(--space-4); }
  .responsibility-group { padding-top: var(--space-3); border-top: var(--line-thin) solid var(--border-strong); }
  .rule-engine { padding-top: 0; border-top: 0; }
  .group-lead { max-width: 620px; margin: var(--space-1) 0 0; color: var(--text-secondary); }
  ol { margin: var(--space-2) 0 0; padding: 0; list-style: none; border-top: var(--line-thin) solid var(--border); }
  li { display: grid; grid-template-columns: 30px minmax(0, 1fr); gap: var(--space-2); padding: 12px 0; border-bottom: var(--line-thin) solid var(--border); }
  li span { color: var(--text-muted); font: 600 .68rem/1.7 var(--font-display); }
  li p { margin: 0; color: var(--foreground); }
  .assistant { padding: var(--space-3) 0 0; border-top: var(--line-thin) solid var(--border-strong); background: transparent; }
  .assistant ol { margin-bottom: 0; }

  .traceability { display: grid; grid-template-columns: minmax(260px, .75fr) minmax(0, 1.25fr); gap: var(--space-4); margin-top: var(--space-5); padding-top: var(--space-4); border-top: var(--line-thin) solid var(--border-strong); }
  .traceability-heading h3 { margin: var(--space-2) 0 0; color: var(--foreground); font: 600 clamp(1.35rem, 2.2vw, 2rem)/1.25 var(--font-display); letter-spacing: -.03em; }
  .traceability-heading p:last-child { margin: var(--space-2) 0 0; color: var(--text-secondary); }
  .evidence-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); border-top: var(--line-thin) solid var(--border-strong); border-left: var(--line-thin) solid var(--border-strong); }
  .evidence-item { min-height: 104px; padding: var(--space-2); border-right: var(--line-thin) solid var(--border-strong); border-bottom: var(--line-thin) solid var(--border-strong); background: var(--bg-surface); }
  .evidence-index { display: block; margin-bottom: var(--space-1); color: var(--text-muted); font: 600 .68rem/1 var(--font-display); }
  .evidence-item strong { color: var(--foreground); font: 600 .9rem/1.3 var(--font-display); }
  .evidence-item p { margin: var(--space-1) 0 0; color: var(--text-secondary); font-size: .88rem; }

  @media (max-width: 1024px) {
    .intelligence-layout { grid-template-columns: 1fr; grid-template-areas: 'responsibilities' 'context'; }
    .traceability { grid-template-columns: 1fr; }
    .chart { min-height: 360px; }
  }

  @media (max-width: 768px) {
    .intelligence-layout { gap: var(--space-4); margin-top: var(--space-4); }
    .responsibilities { gap: var(--space-3); }
    .chart { min-height: 260px; }
    .traceability { gap: var(--space-3); margin-top: var(--space-4); padding-top: var(--space-3); }
    .evidence-grid { grid-template-columns: 1fr; }
    .evidence-item { min-height: 0; padding: 14px var(--space-2); }
  }
</style>

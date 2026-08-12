<!-- 職責：對比現行人工流程與外掛流程的作業步驟差異。 -->
<!-- 輸入：risks 與 comparisonAnim。 -->
<!-- 輸出：M 權重的 ACT 03 流程比較與六項風險。 -->
<script>
  import { onMount } from 'svelte';
  import { risks } from '$lib/content/siteContent.js';
  import { renderComparison } from '$lib/charts/comparisonAnim.js';
  let chartContainer;
  let sectionElement;
  let isVisible = $state(false);
  onMount(() => {
    renderComparison(chartContainer, risks, {});
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) isVisible = true;
    }, { threshold: 0.3 });
    observer.observe(sectionElement);
    return () => observer.disconnect();
  });
</script>

<section id="act-03" class="section section-weight-m problem" bind:this={sectionElement}>
  <div class="section-inner">
    <p class="eyebrow">ACT 03 / WORKFLOW COMPARISON</p>
    <h2 class="section-title">現行人工流程與外掛流程差異</h2>
    <p class="section-lead">這裡比較的是作業步驟，不代表實測工時。人工流程需要逐段查看、記錄、加總與複核；導入外掛後，系統依標準圖層取得、分類與整理結果。實際工時差異仍需用同一張圖面、相同條件量測後確認。</p>
    <div class="chart" bind:this={chartContainer}></div>
    <ol class:visible={isVisible}>
      {#each risks as risk, index}
        <li style={`--risk-index: ${index}`}><span>0{risk.id}</span>{risk.label}</li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .problem { background: var(--background); }
  .chart { min-height: 320px; margin-top: var(--space-4); border: var(--line-thin) solid var(--border); background: var(--bg-subtle); }
  ol { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: var(--space-4) 0 0; padding: 0; list-style: none; border-top: var(--line-thin) solid var(--border-strong); }
  li { display: flex; gap: var(--space-2); padding: var(--space-2) 0; border-bottom: var(--line-thin) solid var(--border); opacity: 0; transform: translateY(var(--space-2)); transition: opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out); transition-delay: calc(var(--risk-index) * var(--duration-fast)); }
  ol.visible li { opacity: 1; transform: translateY(0); }
  li:nth-child(odd) { padding-right: var(--space-4); }
  li:nth-child(even) { padding-left: var(--space-4); border-left: var(--line-thin) solid var(--border); }
  li span { color: var(--text-muted); font: 600 .7rem/1.7 var(--font-display); }
  @media (max-width: 768px) {
    .chart { min-height: 260px; margin-top: var(--space-3); }
    ol { grid-template-columns: 1fr; margin-top: var(--space-3); }
    li:nth-child(odd), li:nth-child(even) { padding-inline: 0; border-left: 0; }
  }
</style>

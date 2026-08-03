<!-- 職責：對比人工整理與系統整理的風險差異。 -->
<!-- 輸入：risks 與 comparisonAnim。 -->
<!-- 輸出：ACT 03 動畫比較與六項風險。 -->
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

<section id="act-03" class="section problem" bind:this={sectionElement}>
  <div class="section-inner">
    <p class="eyebrow">ACT 03 / TIME VARIANCE</p>
    <h2 class="section-title">人工工時不一與 AI 平均工時</h2>
    <p class="section-lead">耗時的不是查看單一長度，而是抄寫、整理、加總、換算，以及每次圖面修改後的重新確認。</p>
    <div class="chart" bind:this={chartContainer}></div>
    <ol class:visible={isVisible}>
      {#each risks as risk, index}
        <li style={`--risk-index: ${index}`}><span>0{risk.id}</span>{risk.label}</li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .problem { background: var(--bg-surface); }
  .chart { min-height: 360px; margin-top: var(--space-5); border: var(--line-thin) solid var(--border); background: var(--bg-subtle); }
  ol { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); margin: var(--space-5) 0 0; padding: 0; list-style: none; border-top: var(--line-thin) solid var(--border-strong); }
  li { display: flex; gap: var(--space-3); padding: var(--space-3) 0; border-bottom: var(--line-thin) solid var(--border); opacity: 0; transform: translateY(var(--space-2)); transition: opacity var(--duration-normal) var(--ease-out), transform var(--duration-normal) var(--ease-out); transition-delay: calc(var(--risk-index) * var(--duration-fast)); }
  ol.visible li { opacity: 1; transform: translateY(0); }
  li:nth-child(odd) { padding-right: var(--space-4); }
  li:nth-child(even) { padding-left: var(--space-4); border-left: var(--line-thin) solid var(--border); }
  li span { color: var(--danger); font: 600 .72rem/1.7 var(--font-display); }
  @media (max-width: 768px) { /* --bp-md */
    ol { grid-template-columns: 1fr; }
    li:nth-child(odd), li:nth-child(even) { padding-inline: 0; border-left: 0; }
  }
</style>

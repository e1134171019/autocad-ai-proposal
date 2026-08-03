<!-- 職責：說明 AI 智能作業能力與五層圖面上下文。 -->
<!-- 輸入：intelligenceLayers、aiResponsibilities 與 contextMap。 -->
<!-- 輸出：ACT 05 AI 統一入口、可驗證原則與互動圖。 -->
<script>
  import { onMount } from 'svelte';
  import { intelligenceLayers, aiResponsibilities } from '$lib/content/siteContent.js';
  import { renderContextMap } from '$lib/charts/contextMap.js';
  let chartContainer;
  const emphasis = ['理解', '自動設定', '自動分類加總', '整理', '回答'];
  const splitResponsibility = (text) => { const regex = new RegExp(`(${emphasis.join('|')})`, 'g'); return text.split(regex).filter(Boolean).map((part) => ({ text: part, highlighted: emphasis.includes(part) })); };
  onMount(() => renderContextMap(chartContainer, intelligenceLayers, {}));
</script>

<section id="act-05" class="section intelligence">
  <div class="section-inner">
    <p class="eyebrow">ACT 05 / AI DECISION LOGIC</p>
    <h2 class="section-title">說明 <span class="keyword-ai">AI</span> 如何依圖面條件與規則判斷</h2>
    <p class="section-lead">AI 依照<span class="keyword-standard">圖面身分、框選範圍與標準圖層</span>判斷有效物件，再<span class="keyword-ai">取得、分類、換算與解釋</span>結果。沒有框選時，AI 助理不會回答。</p>
    <div class="intelligence-layout">
      <div class="chart" bind:this={chartContainer}></div>
      <div class="responsibilities">
        <p class="mono label">AI RESPONSIBILITIES</p>
        <ol>{#each aiResponsibilities as responsibility, index}<li><span>0{index + 1}</span><div>{#each splitResponsibility(responsibility) as part}<strong class:keyword-ai={part.highlighted}>{part.text}</strong>{/each}</div></li>{/each}</ol>
        <div class="verification"><strong>AI 包裝，也必須可驗證</strong><p>每筆結果保留圖面物件、圖層、框選範圍、套用條件與產生時間；缺少條件時標示待確認。</p></div>
        <blockquote>AI 要先知道自己看的是哪張圖、哪一層、哪一區，才知道接下來應該怎麼算。</blockquote>
      </div>
    </div>
  </div>
</section>

<style>
  .intelligence { background: var(--bg-overlay); }
  .keyword-ai { color: var(--keyword-ai); font-weight: 700; }
  .keyword-standard { color: var(--keyword-standard); font-weight: 700; }
  .intelligence-layout { display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(300px, .85fr); gap: var(--space-6); margin-top: var(--space-6); }
  .chart { min-height: 520px; border: var(--line-thin) solid var(--border-strong); background: var(--technical-subtle); }
  .label { margin: 0; color: var(--technical); font-size: .75rem; }
  ol { margin: var(--space-3) 0 0; padding: 0; list-style: none; border-top: var(--line-thin) solid var(--border-strong); }
  li { display: flex; gap: var(--space-3); padding: var(--space-2) 0; border-bottom: var(--line-thin) solid var(--border); color: var(--foreground); }
  li span { color: var(--text-muted); font: 600 .72rem/1.7 var(--font-display); }
  li strong { color: inherit; font-weight: 400; }
  li strong.keyword-ai { color: var(--keyword-ai); font-weight: 700; }
  .verification { margin-top: var(--space-4); padding: var(--space-3); border: var(--line-thin) solid var(--technical); background: var(--technical-subtle); }
  .verification strong { color: var(--technical); font: 600 .85rem/1.4 var(--font-display); }
  .verification p { margin: var(--space-1) 0 0; color: var(--text-secondary); }
  blockquote { margin: var(--space-4) 0 0; padding-left: var(--space-3); border-left: 2px solid var(--technical); color: var(--foreground); font: 500 1.05rem/1.6 var(--font-display); }
  @media (max-width: 1024px) { /* --bp-lg */
    .intelligence-layout { grid-template-columns: 1fr; }
    .chart { min-height: 440px; }
  }
</style>

<!-- 職責：先讓非技術客戶理解外掛能整理什麼，再提供六章快速導覽。 -->
<!-- 輸入：heroContent 提案文案。 -->
<!-- 輸出：ACT 01 價值主張、四個結果、範圍提示與輕量章節導航。 -->
<script>
  import { heroContent } from '$lib/content/siteContent.js';

  const proposalOutline = Object.freeze([
    { id: '01', href: '#act-01', title: '提案重點', desc: '外掛能整理哪些結果，以及本次計算範圍如何界定。' },
    { id: '02', href: '#act-02', title: '目前流程', desc: '目前從導入建商圖面、繪製施工線，到人工計算的作業方式。' },
    { id: '03', href: '#act-03', title: '流程差異', desc: '目前人工整理與導入外掛後，作業步驟有什麼不同。' },
    { id: '04', href: '#act-04', title: '系統方案', desc: '外掛工具列、標準圖層、框選辨識與右側結果介面。' },
    { id: '05', href: '#act-05', title: '計算依據', desc: '結果如何依圖面條件、施工範圍與規則進行確認。' },
    { id: '06', href: '#act-06', title: '專案總結', desc: '工程規則如何整理成團隊可沿用的標準作業流程。' }
  ]);
</script>

<section id="act-01" class="section hero">
  <div class="section-inner">
    <header class="hero-intro">
      <p class="eyebrow">ACT 01 / {heroContent.eyebrow}</p>
      <h1>{heroContent.title}</h1>
      <p class="value-lead">{heroContent.lead}</p>
    </header>

    <div class="outcome-grid" aria-label="外掛可整理的四項結果">
      {#each heroContent.outcomes as outcome, index}
        <article class="outcome-item">
          <span class="outcome-index">0{index + 1}</span>
          <h2>{outcome.title}</h2>
          <p>{outcome.desc}</p>
        </article>
      {/each}
    </div>

    <aside class="scope-note">
      <h2>{heroContent.scopeNote.title}</h2>
      <p>{heroContent.scopeNote.desc}</p>
    </aside>
    <p class="closing">{heroContent.closing}</p>

    <nav class="proposal-outline" aria-label="提案內容快速導覽">
      <h2 class="outline-heading">接下來會說明六件事</h2>
      <div class="outline-grid">
        {#each proposalOutline as outlineItem}
          <a class="outline-item" href={outlineItem.href}>
            <span class="outline-index">{outlineItem.id}</span>
            <h3>{outlineItem.title}</h3>
            <p>{outlineItem.desc}</p>
          </a>
        {/each}
      </div>
    </nav>
  </div>
</section>

<style>
  .hero { padding-top: calc(var(--nav-height) + 11vh); background: var(--bg-surface); }
  .hero-intro { max-width: 1080px; }
  h1 { max-width: 1040px; margin: 0; color: var(--foreground); font: 600 clamp(2.8rem, 7.5vw, 7rem)/.98 var(--font-display); letter-spacing: -.065em; }
  .value-lead { max-width: 820px; margin: var(--space-4) 0 0; color: var(--foreground); font-size: clamp(1.15rem, 2vw, 1.5rem); line-height: 1.7; }
  .outcome-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: var(--space-6); border-block: var(--line-thin) solid var(--border-strong); }
  .outcome-item { min-height: 184px; padding: var(--space-4) var(--space-3); border-right: var(--line-thin) solid var(--border); }
  .outcome-item:last-child { border-right: 0; }
  .outcome-index, .outline-index { color: var(--primary); font: 600 .72rem/1 var(--font-display); letter-spacing: .08em; }
  .outcome-item h2 { margin: var(--space-3) 0 var(--space-1); color: var(--foreground); font: 600 1.2rem/1.4 var(--font-display); }
  .outcome-item p, .scope-note p, .closing, .outline-item p { margin: 0; color: var(--text-secondary); line-height: 1.7; }
  .scope-note { display: grid; grid-template-columns: minmax(180px, 280px) minmax(0, 1fr); gap: var(--space-4); margin-top: var(--space-5); padding: var(--space-3); border-left: 2px solid var(--technical); background: var(--technical-subtle); }
  .scope-note h2 { margin: 0; color: var(--foreground); font: 600 1rem/1.5 var(--font-display); }
  .closing { max-width: 860px; margin-top: var(--space-4); }
  .proposal-outline { margin-top: var(--space-6); padding-top: var(--space-5); border-top: var(--line-thin) solid var(--border-strong); }
  .outline-heading { margin: 0 0 var(--space-3); color: var(--foreground); font: 600 clamp(1.4rem, 2.2vw, 2rem)/1.2 var(--font-display); }
  .outline-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: var(--line-thin) solid var(--border-strong); border-left: var(--line-thin) solid var(--border-strong); }
  .outline-item { min-height: 146px; padding: var(--space-3); border-right: var(--line-thin) solid var(--border-strong); border-bottom: var(--line-thin) solid var(--border-strong); color: var(--foreground); background: var(--bg-surface); transition: background var(--duration-fast) var(--ease-out); }
  .outline-item:hover { background: var(--primary-subtle); }
  .outline-item:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
  .outline-item h3 { margin: var(--space-2) 0 var(--space-1); color: var(--foreground); font: 600 1.05rem/1.4 var(--font-display); }
  @media (max-width: 1024px) { /* --bp-lg */ .outcome-grid, .outline-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .outcome-item:nth-child(2) { border-right: 0; } }
  @media (max-width: 768px) { /* --bp-md */ .outcome-grid, .outline-grid, .scope-note { grid-template-columns: 1fr; } .outcome-item { min-height: 0; border-right: 0; border-bottom: var(--line-thin) solid var(--border); } .scope-note { gap: var(--space-1); } }
</style>

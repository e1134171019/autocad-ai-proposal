<!-- 職責：先用一個清楚首屏說明 AutoCAD 驗算提案，再補真正難點、背景與次要章節導覽。 -->
<!-- 輸入：heroContent 提案文案。 -->
<!-- 輸出：XL 首屏價值主張、Before/After、計算範圍難點、背景敘事與次要六章導覽。 -->
<script>
  import { heroContent } from '$lib/content/siteContent.js';

  const proposalOutline = Object.freeze([
    { id: '01', href: '#act-01', title: '我們的提案', desc: '說明這次要處理的 AutoCAD 驗算工作。' },
    { id: '02', href: '#act-02', title: '目前客戶的流程', desc: '呈現目前施工圖從判斷、繪製到加總的作業。' },
    { id: '03', href: '#act-03', title: '目前流程的問題', desc: '整理人工流程中的重複操作與作業風險。' },
    { id: '04', href: '#act-04', title: '我們的解決方案', desc: '呈現外掛在 AutoCAD 裡的預計操作方式。' },
    { id: '05', href: '#act-05', title: '計算方式與 AI', desc: '說明結果怎麼算，以及 AI 助理負責什麼。' },
    { id: '06', href: '#act-06', title: '預期成果', desc: '整理方案預期改善的作業內容與可重複規則。' }
  ]);
</script>

<section id="act-01" class="section section-weight-xl hero">
  <div class="section-inner">
    <header class="hero-intro">
      <p class="eyebrow">AUTOCAD WORKFLOW PROPOSAL</p>
      <h1>我們的提案</h1>
      <p class="hero-lead">將客戶現有的 AutoCAD 施工圖作業加入外掛工具，協助整理施工線長度、施工總長與元件數量。繪圖人員仍負責施工位置判斷與繪製；程式負責計算，AI 助理負責結果查詢、解釋與摘要。</p>

      <div class="workflow-compare" aria-label="目前流程與導入外掛後流程比較">
        <div class="workflow-row current">
          <span class="workflow-label">現在</span>
          <strong>繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點</strong>
        </div>
        <div class="workflow-row proposed">
          <span class="workflow-label">導入外掛</span>
          <strong>繪圖 → 框選施工範圍 → 程式整理長度與數量 → AI 助理查詢 → 人員確認</strong>
        </div>
      </div>

      <div class="problem-bridge">
        <p class="problem-label">計算前提</p>
        <h2>先確認本次要計算的樓層、區域與物件。</h2>
        <p>同一個 DWG 可能包含不同樓層、施工區域、版本與參考物件。範圍與圖層先界定清楚，後續長度與數量才有一致的計算基準。</p>
      </div>
    </header>

    <div class="narrative" aria-label="提案背景">
      {#each heroContent.sections as narrativeSection}
        <article>
          <span class="section-index">{narrativeSection.id}</span>
          <div class="copy">
            <h2>{narrativeSection.title}</h2>
            <div>{#each narrativeSection.paragraphs as paragraph}<p>{paragraph}</p>{/each}</div>
            {#if narrativeSection.highlight}<blockquote>{narrativeSection.highlight}</blockquote>{/if}
          </div>
        </article>
      {/each}
    </div>

    <nav class="proposal-outline" aria-label="提案內容快速導覽">
      <h2 class="outline-heading">這份提案會說明六件事</h2>
      <div class="outline-grid">
        {#each proposalOutline as outlineItem}
          <a class="outline-item" href={outlineItem.href}>
            <span class="outline-index">{outlineItem.id}</span>
            <h3>{outlineItem.title}</h3>
            <p class="outline-desc">{outlineItem.desc}</p>
          </a>
        {/each}
      </div>
    </nav>
  </div>
</section>

<style>
  .hero { padding-top: calc(var(--nav-height) + var(--space-5)); background: var(--bg-surface); }
  .hero-intro { max-width: 1120px; }
  h1 { max-width: 1080px; margin: 0; color: var(--foreground); font: 600 clamp(2.8rem, 6vw, 6rem)/1 var(--font-display); letter-spacing: -.06em; }
  .hero-lead { max-width: 800px; margin: var(--space-3) 0 0; color: var(--text-secondary); font-size: clamp(1.08rem, 1.7vw, 1.3rem); line-height: 1.65; }
  .workflow-compare { display: grid; margin-top: var(--space-4); border-block: var(--line-thin) solid var(--border-strong); }
  .workflow-row { display: grid; grid-template-columns: minmax(96px, 140px) minmax(0, 1fr); gap: var(--space-3); align-items: baseline; padding: var(--space-2) 0; }
  .workflow-row + .workflow-row { border-top: var(--line-thin) solid var(--border); }
  .workflow-label { color: var(--text-muted); font: 600 .75rem/1.4 var(--font-display); letter-spacing: .08em; }
  .workflow-row strong { color: var(--foreground); font: 600 clamp(1rem, 1.6vw, 1.25rem)/1.55 var(--font-display); }
  .workflow-row.proposed { border-left: 3px solid var(--primary); padding-left: var(--space-3); }
  .workflow-row.proposed .workflow-label { color: var(--primary); }
  .problem-bridge { max-width: 900px; margin-top: var(--space-4); padding-top: var(--space-4); border-top: var(--line-thin) solid var(--border); }
  .problem-label { margin: 0 0 var(--space-2); color: var(--text-muted); font: 600 .74rem/1.4 var(--font-display); letter-spacing: .1em; }
  .problem-bridge h2 { margin: 0; color: var(--foreground); font: 600 clamp(1.75rem, 3.1vw, 2.8rem)/1.2 var(--font-display); letter-spacing: -.04em; }
  .problem-bridge p:last-child { max-width: 760px; margin: var(--space-2) 0 0; color: var(--text-secondary); font-size: 1rem; }
  .narrative { margin-top: var(--space-5); border-top: var(--line-thin) solid var(--border-strong); }
  article { display: grid; grid-template-columns: 64px minmax(0, 1fr); gap: var(--space-3); padding: var(--space-4) 0; border-bottom: var(--line-thin) solid var(--border); }
  .copy { display: grid; grid-template-columns: minmax(180px, 250px) minmax(0, 1fr); gap: var(--space-4); }
  .copy h2 { margin: 0; color: var(--foreground); font: 600 1rem/1.5 var(--font-display); }
  .copy div { max-width: 720px; }
  p { margin: 0 0 var(--space-2); color: var(--text-secondary); }
  blockquote { grid-column: 2; max-width: 720px; margin: var(--space-1) 0 0; padding: var(--space-2) var(--space-3); border-left: 2px solid var(--border-strong); color: var(--foreground); background: var(--bg-subtle); font-weight: 600; }
  .proposal-outline { margin-top: var(--space-5); padding-top: var(--space-4); border-top: var(--line-thin) solid var(--border-strong); }
  .outline-heading { margin: 0 0 var(--space-2); color: var(--foreground); font: 600 clamp(1.05rem, 1.5vw, 1.3rem)/1.3 var(--font-display); }
  .outline-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: var(--line-thin) solid var(--border); }
  .outline-item { min-height: 92px; padding: var(--space-2) var(--space-2) var(--space-2) 0; border-bottom: var(--line-thin) solid var(--border); color: var(--foreground); background: transparent; transition: background var(--duration-fast) var(--ease-out); }
  .outline-item:nth-child(3n + 2), .outline-item:nth-child(3n + 3) { padding-left: var(--space-2); border-left: var(--line-thin) solid var(--border); }
  .outline-item:hover { background: var(--bg-subtle); }
  .outline-item:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
  .outline-index { display: block; margin-bottom: var(--space-1); color: var(--text-muted); font: 600 .68rem/1 var(--font-display); letter-spacing: .08em; }
  .outline-item h3 { margin: 0; color: var(--foreground); font: 600 .92rem/1.4 var(--font-display); }
  .outline-desc { margin: var(--space-1) 0 0; color: var(--text-secondary); font-size: .86rem; line-height: 1.5; }
  @media (max-width: 1024px) {
    .outline-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .outline-item:nth-child(3n + 2), .outline-item:nth-child(3n + 3) { padding-left: 0; border-left: 0; }
    .outline-item:nth-child(even) { padding-left: var(--space-2); border-left: var(--line-thin) solid var(--border); }
  }
  @media (max-width: 768px) {
    .hero { padding-top: calc(var(--nav-height) + var(--space-4)); }
    .workflow-row { grid-template-columns: 1fr; gap: var(--space-1); }
    .problem-bridge h2 { font-size: clamp(1.6rem, 7.5vw, 2.2rem); }
    .outline-grid { grid-template-columns: 1fr; }
    .outline-item, .outline-item:nth-child(even) { min-height: 0; padding: var(--space-2) 0; border-left: 0; }
    article { grid-template-columns: 36px minmax(0, 1fr); padding-block: var(--space-3); }
    .copy { grid-template-columns: 1fr; gap: var(--space-1); }
    blockquote { grid-column: 1; }
  }
</style>

<!-- 職責：先用一個清楚首屏說明 AutoCAD 驗算提案，再補真正難點、背景與章節導覽。 -->
<!-- 輸入：heroContent 提案文案。 -->
<!-- 輸出：首屏價值主張、Before/After、計算範圍難點、背景敘事與次要六章導覽。 -->
<script>
  import { heroContent } from '$lib/content/siteContent.js';

  const proposalOutline = Object.freeze([
    {
      id: '01',
      href: '#act-01',
      title: '客戶需求',
      desc: '說明這次要處理的 AutoCAD 長度與數量驗算需求。'
    },
    {
      id: '02',
      href: '#act-02',
      title: '目前流程',
      desc: '從施工範圍判斷、畫線，到人工查看、記錄與加總。'
    },
    {
      id: '03',
      href: '#act-03',
      title: '流程差異',
      desc: '比較人工流程與外掛流程的作業步驟；畫面不代表實測工時。'
    },
    {
      id: '04',
      href: '#act-04',
      title: '系統方案',
      desc: '展示外掛工具列、標準圖層、框選範圍與結果介面。'
    },
    {
      id: '05',
      href: '#act-05',
      title: '判斷規則',
      desc: '說明系統如何依圖面、施工範圍、標準圖層與公司規則整理結果。'
    },
    {
      id: '06',
      href: '#act-06',
      title: '專案總結',
      desc: '整理這套工具最後要留下的規則、結果與作業方式。'
    }
  ]);
</script>

<section id="act-01" class="section hero">
  <div class="section-inner">
    <header class="hero-intro">
      <p class="eyebrow">AUTOCAD WORKFLOW PROPOSAL</p>
      <h1>AutoCAD 施工圖長度與數量自動驗算</h1>
      <p class="hero-lead">保留繪圖人員的工程判斷，把逐段查看長度、人工加總與數量清點交給外掛處理。</p>

      <div class="workflow-compare" aria-label="目前流程與導入外掛後流程比較">
        <div class="workflow-row current">
          <span class="workflow-label">現在</span>
          <strong>繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點</strong>
        </div>
        <div class="workflow-row proposed">
          <span class="workflow-label">導入外掛</span>
          <strong>繪圖 → 框選施工範圍 → 系統整理長度與數量 → 人員確認</strong>
        </div>
      </div>

      <div class="problem-bridge">
        <p class="problem-label">真正難點</p>
        <h2>真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。</h2>
        <p>同一張 DWG 可能同時有不同樓層、施工區域、版本與參考物件；先界定本次範圍，後面的長度與數量才有一致的計算基準。</p>
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
  .hero { padding-top: calc(var(--nav-height) + 9vh); background: var(--bg-surface); }
  .hero-intro { max-width: 1180px; }
  h1 { max-width: 1100px; margin: 0; color: var(--foreground); font: 600 clamp(2.8rem, 6vw, 6rem)/1 var(--font-display); letter-spacing: -.06em; }
  .hero-lead { max-width: 820px; margin: var(--space-4) 0 0; color: var(--text-secondary); font-size: clamp(1.08rem, 1.8vw, 1.35rem); line-height: 1.7; }
  .workflow-compare { display: grid; margin-top: var(--space-5); border-block: var(--line-thin) solid var(--border-strong); }
  .workflow-row { display: grid; grid-template-columns: minmax(96px, 140px) minmax(0, 1fr); gap: var(--space-3); align-items: baseline; padding: var(--space-3) 0; }
  .workflow-row + .workflow-row { border-top: var(--line-thin) solid var(--border); }
  .workflow-label { color: var(--text-muted); font: 600 .78rem/1.4 var(--font-display); letter-spacing: .08em; }
  .workflow-row strong { color: var(--foreground); font: 600 clamp(1rem, 1.7vw, 1.3rem)/1.6 var(--font-display); }
  .workflow-row.proposed { border-left: 3px solid var(--primary); padding-left: var(--space-3); }
  .workflow-row.proposed .workflow-label { color: var(--primary); }
  .problem-bridge { max-width: 940px; margin-top: var(--space-5); padding-top: var(--space-4); border-top: var(--line-thin) solid var(--border); }
  .problem-label { margin: 0 0 var(--space-2); color: var(--text-muted); font: 600 .76rem/1.4 var(--font-display); letter-spacing: .1em; }
  .problem-bridge h2 { margin: 0; color: var(--foreground); font: 600 clamp(1.75rem, 3.2vw, 3rem)/1.2 var(--font-display); letter-spacing: -.04em; }
  .problem-bridge p:last-child { max-width: 800px; margin: var(--space-3) 0 0; color: var(--text-secondary); font-size: 1rem; }
  .narrative { margin-top: var(--space-6); border-top: var(--line-thin) solid var(--border-strong); }
  article { display: grid; grid-template-columns: 80px minmax(0, 1fr); gap: var(--space-3); padding: var(--space-5) 0; border-bottom: var(--line-thin) solid var(--border); }
  .copy { display: grid; grid-template-columns: minmax(180px, 280px) minmax(0, 1fr); gap: var(--space-4); }
  .copy h2 { margin: 0; color: var(--foreground); font: 600 1rem/1.5 var(--font-display); }
  .copy div { max-width: 760px; }
  p { margin: 0 0 var(--space-2); color: var(--text-secondary); }
  blockquote { grid-column: 2; max-width: 760px; margin: var(--space-2) 0 0; padding: var(--space-2) var(--space-3); border-left: 2px solid var(--border-strong); color: var(--foreground); background: var(--bg-subtle); font-weight: 600; }
  .proposal-outline { margin-top: var(--space-6); padding-top: var(--space-5); border-top: var(--line-thin) solid var(--border-strong); }
  .outline-heading { margin: 0 0 var(--space-3); color: var(--foreground); font: 600 clamp(1.15rem, 1.8vw, 1.5rem)/1.3 var(--font-display); }
  .outline-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: var(--line-thin) solid var(--border); border-left: var(--line-thin) solid var(--border); }
  .outline-item { min-height: 124px; padding: var(--space-2) var(--space-3); border-right: var(--line-thin) solid var(--border); border-bottom: var(--line-thin) solid var(--border); color: var(--foreground); background: var(--bg-surface); transition: background var(--duration-fast) var(--ease-out); }
  .outline-item:hover { background: var(--bg-subtle); }
  .outline-item:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
  .outline-index { display: block; margin-bottom: var(--space-1); color: var(--text-muted); font: 600 .7rem/1 var(--font-display); letter-spacing: .08em; }
  .outline-item h3 { margin: 0; color: var(--foreground); font: 600 .95rem/1.4 var(--font-display); }
  .outline-desc { margin: var(--space-1) 0 0; color: var(--text-secondary); font-size: .92rem; line-height: 1.55; }
  @media (max-width: 1024px) { /* --bp-lg */
    .outline-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 768px) { /* --bp-md */
    .workflow-row { grid-template-columns: 1fr; gap: var(--space-1); }
    .problem-bridge h2 { font-size: clamp(1.65rem, 8vw, 2.35rem); }
    .outline-grid { grid-template-columns: 1fr; }
    .outline-item { min-height: 0; }
    article { grid-template-columns: 42px minmax(0, 1fr); }
    .copy { grid-template-columns: 1fr; gap: var(--space-1); }
    blockquote { grid-column: 1; }
  }
</style>

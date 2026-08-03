<!-- 職責：以四段人話敘事建立客戶需求、目標、難點與現況入口。 -->
<!-- 輸入：heroContent 提案文案。 -->
<!-- 輸出：ACT 01 六章快速目錄、閱讀段落與 ACT 02 銜接。 -->
<script>
  import { heroContent } from '$lib/content/siteContent.js';

  const proposalOutline = Object.freeze([
    {
      id: '01',
      href: '#act-01',
      title: '客戶需求',
      desc: '先說明貴公司希望解決的問題，以及本案目標與真正難點。'
    },
    {
      id: '02',
      href: '#act-02',
      title: '目前流程',
      desc: '模擬目前從導入建商圖面、繪製施工線，到人工計算的作業方式。'
    },
    {
      id: '03',
      href: '#act-03',
      title: '工時差異',
      desc: '比較人工工時不固定，與 AI 工具處理更快、時間更穩定的差異。'
    },
    {
      id: '04',
      href: '#act-04',
      title: '系統方案',
      desc: '展示外掛工具列、標準圖層、框選辨識與右側結果介面。'
    },
    {
      id: '05',
      href: '#act-05',
      title: '判斷規則',
      desc: '說明 AI 如何依圖面、施工範圍、標準圖層與公司規則整理結果。'
    },
    {
      id: '06',
      href: '#act-06',
      title: '專案總結',
      desc: '將工程經驗轉為程式可執行、團隊可沿用的標準作業流程。'
    }
  ]);
</script>

<section id="act-01" class="section hero">
  <div class="section-inner">
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

    <div class="hero-intro">
      <p class="eyebrow">ACT 01 / PROJECT CONTEXT</p>
      <h1>客戶需求、目標、難點與現況入口</h1>
      <div class="context-line"><span class="status-dot"></span>先說清楚客戶要什麼，再走進目前的 CAD 作業</div>
    </div>

    <div class="narrative">
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
  </div>
</section>

<style>
  .hero { padding-top: calc(var(--nav-height) + 11vh); background: var(--bg-surface); }
  .proposal-outline { margin-top: 0; }
  .outline-heading { margin: 0 0 var(--space-3); color: var(--foreground); font: 600 clamp(1.4rem, 2.2vw, 2rem)/1.2 var(--font-display); }
  .outline-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); border-top: var(--line-thin) solid var(--border-strong); border-left: var(--line-thin) solid var(--border-strong); }
  .outline-item { min-height: 168px; padding: var(--space-3); border-right: var(--line-thin) solid var(--border-strong); border-bottom: var(--line-thin) solid var(--border-strong); color: var(--foreground); background: var(--bg-surface); transition: background var(--duration-fast) var(--ease-out), color var(--duration-fast) var(--ease-out); }
  .outline-item:hover { background: var(--primary-subtle); }
  .outline-item:focus-visible { outline: 2px solid var(--primary); outline-offset: -2px; }
  .outline-index { display: block; margin-bottom: var(--space-2); color: var(--primary); font: 600 .72rem/1 var(--font-display); letter-spacing: .08em; }
  .outline-item h3 { margin: 0; color: var(--foreground); font: 600 1.05rem/1.4 var(--font-display); }
  .outline-desc { margin: var(--space-1) 0 0; color: var(--text-secondary); line-height: 1.65; }
  .hero-intro { margin-top: var(--space-6); }
  h1 { max-width: 1040px; margin: 0; color: var(--foreground); font: 600 clamp(2.8rem, 7.5vw, 7rem)/.98 var(--font-display); letter-spacing: -.065em; }
  .context-line { margin-top: var(--space-4); padding-left: var(--space-2); border-left: 2px solid var(--technical); color: var(--technical); font: 600 .78rem/1.4 var(--font-display); }
  .narrative { margin-top: var(--space-6); border-top: var(--line-thin) solid var(--border-strong); }
  article { display: grid; grid-template-columns: 80px minmax(0, 1fr); gap: var(--space-3); padding: var(--space-5) 0; border-bottom: var(--line-thin) solid var(--border); }
  .copy { display: grid; grid-template-columns: minmax(180px, 280px) minmax(0, 1fr); gap: var(--space-4); }
  .copy h2 { margin: 0; color: var(--foreground); font: 600 1rem/1.5 var(--font-display); }
  .copy div { max-width: 760px; }
  p { margin: 0 0 var(--space-2); color: var(--text-secondary); }
  blockquote { grid-column: 2; max-width: 760px; margin: var(--space-2) 0 0; padding: var(--space-2) var(--space-3); border-left: 2px solid var(--technical); color: var(--foreground); background: var(--technical-subtle); font-weight: 600; }
  @media (max-width: 1024px) { /* --bp-lg */
    .outline-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @media (max-width: 768px) { /* --bp-md */
    .outline-grid { grid-template-columns: 1fr; }
    .outline-item { min-height: 0; }
    article { grid-template-columns: 42px minmax(0, 1fr); }
    .copy { grid-template-columns: 1fr; gap: var(--space-1); }
    blockquote { grid-column: 1; }
  }
</style>

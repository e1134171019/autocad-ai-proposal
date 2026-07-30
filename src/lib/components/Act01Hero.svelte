<!-- 職責：以四段人話敘事建立客戶需求、目標、難點與現況入口。 -->
<!-- 輸入：heroContent 提案文案。 -->
<!-- 輸出：ACT 01 閱讀段落與 ACT 02 銜接。 -->
<script>
  import { heroContent } from '$lib/content/siteContent.js';
</script>

<section id="act-01" class="section hero">
  <div class="section-inner">
    <p class="eyebrow">{heroContent.eyebrow}</p>
    <h1>{heroContent.title}</h1>
    <p class="lead">{heroContent.lead}</p>
    <div class="context-line"><span class="status-dot"></span>先說清楚客戶要什麼，再走進目前的 CAD 作業</div>
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
  h1 { max-width: 1040px; margin: 0; color: var(--foreground); font: 600 clamp(2.8rem, 7.5vw, 7rem)/.98 var(--font-display); letter-spacing: -.065em; }
  .lead { max-width: 830px; margin: var(--space-4) 0 0; color: var(--text-secondary); font-size: clamp(1.05rem, 1.8vw, 1.35rem); }
  .context-line { margin-top: var(--space-5); padding-left: var(--space-2); border-left: 2px solid var(--technical); color: var(--technical); font: 600 .78rem/1.4 var(--font-display); }
  .narrative { margin-top: 14vh; border-top: var(--line-thin) solid var(--border-strong); }
  article { display: grid; grid-template-columns: 80px minmax(0, 1fr); gap: var(--space-3); padding: var(--space-5) 0; border-bottom: var(--line-thin) solid var(--border); }
  .copy { display: grid; grid-template-columns: minmax(180px, 280px) minmax(0, 1fr); gap: var(--space-4); }
  h2 { margin: 0; color: var(--foreground); font: 600 1rem/1.5 var(--font-display); }
  .copy div { max-width: 760px; }
  p { margin: 0 0 var(--space-2); color: var(--text-secondary); }
  blockquote { grid-column: 2; max-width: 760px; margin: var(--space-2) 0 0; padding: var(--space-2) var(--space-3); border-left: 2px solid var(--technical); color: var(--foreground); background: var(--technical-subtle); font-weight: 600; }
  @media (max-width: 768px) { /* --bp-md */
    article { grid-template-columns: 42px minmax(0, 1fr); }
    .copy { grid-template-columns: 1fr; gap: var(--space-1); }
    blockquote { grid-column: 1; }
  }
</style>

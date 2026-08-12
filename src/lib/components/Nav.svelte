<!-- 職責：顯示 ACT 導覽、同步目前閱讀段落，並在手機保留可理解的章節名稱。 -->
<!-- 輸入：頁面上具有 act id 的 section。 -->
<!-- 輸出：桌機固定導覽與手機可展開的語意章節選單。 -->
<script>
  import { onMount } from 'svelte';
  import { activeAct } from '$lib/stores/appState.js';

  const navItems = ['提案概要', '目前流程', '流程差異', '操作示意', '計算依據', '專案總結'];
  let menuOpen = false;

  const closeMenu = () => {
    menuOpen = false;
  };

  onMount(() => {
    const sections = document.querySelectorAll('section[id^="act-"]');
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) activeAct.set(visible.target.id);
    }, { rootMargin: '-30% 0px -60%' });
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  });
</script>

<nav aria-label="提案章節導覽">
  <a class="brand" href="#act-01" onclick={closeMenu}>AutoCAD 驗算提案</a>

  <button
    class="menu-toggle"
    type="button"
    aria-label="切換提案章節選單"
    aria-expanded={menuOpen}
    aria-controls="proposal-nav-links"
    onclick={() => (menuOpen = !menuOpen)}
  >
    <span>章節</span>
    <span class="menu-icon" aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
  </button>

  <div id="proposal-nav-links" class="links" class:open={menuOpen}>
    {#each navItems as label, index}
      {@const actId = `act-0${index + 1}`}
      <a class:active={$activeAct === actId} href={`#${actId}`} onclick={closeMenu}>
        <span>0{index + 1}</span>{label}
      </a>
    {/each}
  </div>
</nav>

<style>
  nav { position: fixed; inset: 0 0 auto; z-index: 20; display: flex; align-items: center; justify-content: space-between; height: var(--nav-height); padding: 0 var(--space-4); border-bottom: var(--line-thin) solid var(--border); background: var(--bg-surface); }
  .brand { color: var(--foreground); font: 700 .8rem/1 var(--font-display); letter-spacing: .06em; }
  .menu-toggle { display: none; align-items: center; gap: var(--space-1); min-height: 40px; padding: 0 var(--space-2); border: var(--line-thin) solid var(--border-strong); border-radius: var(--radius-sm); color: var(--foreground); background: var(--bg-surface); cursor: pointer; font: 600 .75rem/1 var(--font-display); }
  .menu-icon { width: 1em; text-align: center; font-size: 1rem; }
  .links { display: flex; gap: var(--space-3); }
  .links a { color: var(--text-secondary); font: 500 .74rem/1 var(--font-display); transition: color var(--duration-fast) var(--ease-out), background var(--duration-fast) var(--ease-out); }
  .links a span { margin-right: 6px; color: var(--text-muted); }
  .links a.active, .links a:hover { color: var(--primary); }
  .links a.active span { color: var(--primary); }

  @media (max-width: 768px) { /* --bp-md */
    nav { padding-inline: var(--space-2); }
    .brand { max-width: 210px; }
    .menu-toggle { display: inline-flex; }
    .links { position: absolute; inset: var(--nav-height) 0 auto; display: none; gap: 0; padding: var(--space-1) var(--space-2) var(--space-2); border-bottom: var(--line-thin) solid var(--border-strong); background: var(--bg-surface); box-shadow: 0 12px 28px rgb(15 23 42 / 8%); }
    .links.open { display: grid; }
    .links a { display: flex; align-items: center; min-height: 48px; padding: 0 var(--space-2); border-bottom: var(--line-thin) solid var(--border); font-size: .86rem; }
    .links a:last-child { border-bottom: 0; }
    .links a span { width: 32px; margin-right: var(--space-1); font-size: .7rem; }
    .links a.active { background: var(--primary-subtle); }
  }
</style>

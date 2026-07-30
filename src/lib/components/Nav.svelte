<!-- 職責：顯示 ACT 導覽並同步目前閱讀段落。 -->
<!-- 輸入：頁面上具有 act id 的 section。 -->
<!-- 輸出：可跳轉且標示目前位置的固定導覽列。 -->
<script>
  import { onMount } from 'svelte';
  import { activeAct } from '$lib/stores/appState.js';
  const navItems = ['需求', '現況', '問題', '解法', 'AI', '總結'];
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
  <a class="brand" href="#act-01">CAD / AI</a>
  <div class="links">
    {#each navItems as label, index}
      {@const actId = `act-0${index + 1}`}
      <a class:active={$activeAct === actId} href={`#${actId}`}>
        <span>0{index + 1}</span>{label}
      </a>
    {/each}
  </div>
</nav>

<style>
  nav { position: fixed; inset: 0 0 auto; z-index: 20; display: flex; align-items: center; justify-content: space-between; height: var(--nav-height); padding: 0 var(--space-4); border-bottom: var(--line-thin) solid var(--border); background: var(--bg-surface); }
  .brand { color: var(--foreground); font: 700 .8rem/1 var(--font-display); letter-spacing: .14em; }
  .links { display: flex; gap: var(--space-3); }
  .links a { color: var(--text-secondary); font: 500 .74rem/1 var(--font-display); transition: color var(--duration-fast) var(--ease-out); }
  .links a span { margin-right: 6px; color: var(--text-muted); }
  .links a.active, .links a:hover { color: var(--primary); }
  .links a.active span { color: var(--primary); }
  @media (max-width: 768px) { /* --bp-md */
    nav { padding-inline: var(--space-2); }
    .links { gap: var(--space-2); }
    .links a { font-size: 0; }
    .links a span { margin: 0; font-size: .72rem; }
  }
</style>

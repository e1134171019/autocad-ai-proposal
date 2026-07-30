<!-- 職責：依提案順序組裝六個 ACT，最後以專案總結收斂。 -->
<!-- 輸入：各元件的預設內容。 -->
<!-- 輸出：完整單頁提案。 -->
<script>
  import Nav from '$lib/components/Nav.svelte';
  import Act01Hero from '$lib/components/Act01Hero.svelte';
  import Act02Flow from '$lib/components/Act02Flow.svelte';
  import Act03Problem from '$lib/components/Act03Problem.svelte';
  import Act04Solution from '$lib/components/Act04Solution.svelte';
  import Act05Intelligence from '$lib/components/Act05Intelligence.svelte';
  import Act06Summary from '$lib/components/Act06Summary.svelte';
</script>

<Nav />
<main>
  <Act01Hero />
  <Act02Flow />
  <Act03Problem />
  <Act04Solution />
  <Act05Intelligence />
  <Act06Summary />
</main>

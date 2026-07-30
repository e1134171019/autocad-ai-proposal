<!-- 職責：載入全站樣式並承接路由內容。 -->
<!-- 輸入：SvelteKit 路由 children。 -->
<!-- 輸出：套用全域樣式的頁面。 -->
<script>
  import '../app.css';
  let { children } = $props();
</script>

{@render children()}

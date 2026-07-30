<!-- 職責：依流程節點顯示 Properties、人工操作、標準圖層、AI 結果或 AI 助理。 -->
<script>
  import CadAiAssistant from './CadAiAssistant.svelte';
  import { formatLengthCm } from '$lib/domain/lengthCalculator.js';
  import { futureExteriorSegments } from '$lib/content/siteContent.js';
  let { activeStep, mode, selection, manualStage = { phase: 'idle' }, autoStage = { phase: 'idle', resultIndex: 0 }, onReturnSelection } = $props();
  const externalResults = futureExteriorSegments.map((item) => ({ id: item.id, value: item.lengthCm }));
  const shaftResults = Array.from({ length: 6 }, (_, index) => ({ id: `內部深井${String(index + 1).padStart(2, '0')}`, value: 100 }));
  let resultIndex = $derived(autoStage.resultIndex ?? (activeStep.animType === 'confirm' ? 99 : 0));
  let panelType = $derived(activeStep.animType === 'ai-query' ? 'assistant'
    : mode === 'current' && ['manual-inspect', 'manual-label-slow'].includes(activeStep.animType) ? 'manual'
      : activeStep.animType === 'standard-layers' ? 'layers'
        : mode === 'future' && ['guided-draw', 'auto-label'].includes(activeStep.animType) ? 'auto'
          : mode === 'current' && ['sum', 'quantity-slow'].includes(activeStep.animType) ? 'record'
            : mode === 'future' && ['panel-fast', 'result-three', 'confirm'].includes(activeStep.animType) ? 'result' : 'properties');
</script>

<aside class="panel" aria-label="AutoCAD Docked Panel">
  {#if panelType === 'assistant'}
    <CadAiAssistant {selection} {onReturnSelection} />
  {:else}
    <header>{panelType === 'manual' ? 'PROPERTIES / 人工標註' : panelType === 'layers' ? 'STANDARD LAYERS' : panelType === 'auto' ? 'AI 標註狀態' : panelType === 'record' ? '人工記錄' : panelType === 'result' ? 'AI RESULTS' : 'PROPERTIES'}</header>
    <div class="panel-body">
      {#if panelType === 'manual'}
        <div class="status"><span>操作階段</span><strong>{manualStage.phase === 'complete' ? '逐段標註完成' : '人工逐條處理'}</strong></div>
        <div class="row"><span>Selected</span><strong>{manualStage.current ?? '等待點選'}</strong></div>
        <div class="row"><span>Length</span><strong>{manualStage.length ?? '—'}</strong></div>
        <div class="row"><span>Command</span><strong>{manualStage.command ?? 'SELECT'}</strong></div>
        {#if manualStage.formula}<div class="formula">{manualStage.formula}</div>{/if}
      {:else if panelType === 'layers'}
        <div class="status"><span>STEP 02</span><strong>{autoStage.title ?? '建立標準圖層'}</strong></div>
        <div class="row"><span>AI-EXTERIOR</span><strong>外部施工聚合線</strong></div>
        <div class="row"><span>AI-SHAFT</span><strong>內部深井聚合線</strong></div>
        <div class="row"><span>AI-DIM</span><strong>紅色尺寸與箭頭</strong></div>
        <div class="row"><span>AI-BRACE</span><strong>外部三角補強</strong></div>
        <p class="note">只有標準圖層會進入計算、標註與 AI 查詢。</p>
      {:else if panelType === 'auto'}
        <div class="status"><span>STEP {String(activeStep.id).padStart(2, '0')}</span><strong>{autoStage.title ?? '等待操作'}</strong></div>
        <div class="row"><span>Command</span><strong>{autoStage.command ?? 'AI WORKFLOW'}</strong></div>
        <div class="row"><span>Layer</span><strong>{autoStage.layer ?? 'AI-SHAFT'}</strong></div>
        {#if autoStage.current}<div class="row"><span>Object</span><strong>{autoStage.current}</strong></div>{/if}
        {#if autoStage.externalIndex}<div class="row"><span>外部段落</span><strong>{autoStage.externalIndex} / {autoStage.externalCount}</strong></div>{/if}
        {#if autoStage.length}<div class="row"><span>獨立長度</span><strong>{autoStage.length}</strong></div>{/if}
        {#if autoStage.externalTotal}<div class="row subtotal"><span>外部合計</span><strong>{autoStage.externalTotal}</strong></div>{/if}
        {#if autoStage.shaftTotal}<div class="row subtotal"><span>深井合計</span><strong>{autoStage.shaftTotal}</strong></div>{/if}
        {#if autoStage.phase === 'ignored'}<div class="row warning"><span>Status</span><strong>IGNORED／非標準圖層</strong></div>{/if}
        {#if autoStage.accepted !== undefined}<div class="row"><span>Accepted</span><strong>{autoStage.accepted} / 8</strong></div><div class="row"><span>Ignored</span><strong>{autoStage.ignored} / 8</strong></div><div class="row"><span>Labeled</span><strong>{autoStage.labeled} / 8</strong></div>{/if}
      {:else if panelType === 'record'}
        <div class="group-title">外部人工加總</div><div class="formula">100＋80＋30＋40＋60＝310.00 cm</div>
        <div class="group-title">內部深井人工加總</div><div class="formula">100＋100＋100＋100＝400.00 cm</div>
        <div class="row total"><span>人工施工總長</span><strong>710.00 cm</strong></div>
        {#if activeStep.animType === 'quantity-slow'}<div class="row"><span>外部三角補強</span><strong>{manualStage.count ?? 0} / 30 個</strong></div>{#if manualStage.count}<div class="row"><span>目前編號</span><strong>{String(manualStage.count).padStart(2, '0')}</strong></div>{/if}{/if}
      {:else if panelType === 'result'}
        {#if !selection}<div class="empty">請先點擊自動計算並框選整層施工範圍。</div>{:else}
          <div class="context"><span>{selection.drawingId}／{selection.floor}</span><strong>{selection.area}</strong></div>
          {#if activeStep.animType === 'panel-fast'}
            {#if resultIndex >= 1}<div class="row"><span>有效長度物件</span><strong>22 個</strong></div>{/if}
            {#if resultIndex >= 2}<div class="row"><span>有效補強構件</span><strong>30 個</strong></div><div class="row"><span>忽略物件</span><strong>2 個／非標準圖層</strong></div>{/if}
            {#if resultIndex >= 3}<div class="row"><span>外部合計</span><strong>1,000.00 cm</strong></div>{/if}
            {#if resultIndex >= 4}<div class="row"><span>內部深井合計</span><strong>600.00 cm</strong></div>{/if}
            {#if resultIndex >= 5}<div class="row total"><span>施工總長</span><strong>1,600.00 cm</strong></div>{/if}
          {:else}
            <div class="group-title">外部獨立長度</div>
            {#each externalResults as item, index}{#if resultIndex >= index + 1}<div class="compact-row"><span>{item.id}</span><strong>{formatLengthCm(item.value)}</strong></div>{/if}{/each}
            {#if resultIndex >= externalResults.length}<div class="formula">16 段外部獨立長度＝1,000.00 cm</div><div class="row subtotal"><span>外部合計</span><strong>1,000.00 cm</strong></div>{/if}
            <div class="group-title">內部深井</div>
            {#each shaftResults as item, index}{#if resultIndex >= externalResults.length + index + 1}<div class="compact-row"><span>{item.id}</span><strong>{formatLengthCm(item.value)}</strong></div>{/if}{/each}
            {#if resultIndex >= externalResults.length + shaftResults.length}<div class="formula">內部深井01＋02＋03＋04＋05＋06＝600.00 cm</div><div class="row subtotal"><span>內部深井合計</span><strong>600.00 cm</strong></div><div class="row total"><span>施工總長</span><strong>1,600.00 cm</strong></div>{/if}
            {#if resultIndex >= externalResults.length + shaftResults.length + 1}<div class="row quantity"><span>外部三角補強</span><strong>30 個</strong></div><div class="row"><span>補強編號</span><strong>01～30</strong></div><div class="row"><span>忽略物件</span><strong>2 個／非標準圖層</strong></div>{/if}
          {/if}
          {#if activeStep.animType === 'confirm'}<p class="confirmed">✓ 已確認／可輸出</p>{/if}
        {/if}
      {:else}
        <div class="row"><span>Drawing</span><strong>A-03</strong></div><div class="row"><span>Floor</span><strong>6F</strong></div><div class="row"><span>Layer</span><strong>{activeStep.id >= 3 ? 'AREA_CHECK' : 'A-WALL'}</strong></div>
        {#if selection && activeStep.animType === 'box-select-fast'}<div class="row"><span>Boundary</span><strong>6F FLOOR RANGE</strong></div><div class="row"><span>Selected</span><strong>22 length＋30 brace／2 ignored</strong></div>{/if}
      {/if}
    </div>
  {/if}
</aside>

<style>
  .panel { min-width: var(--cad-property-width); height: 100%; border-left: var(--line-thin) solid var(--cad-border); color: var(--cad-result-foreground); background: var(--cad-panel-background); font-family: var(--font-display); overflow: auto; }
  header { height: 34px; padding: 9px 12px; border-bottom: var(--line-thin) solid var(--cad-border); font-size: var(--cad-font-size-label); font-weight: 600; }
  .panel-body { display: grid; align-content: start; gap: 7px; padding: var(--space-2) 12px; }
  .status { display: grid; gap: 3px; padding: var(--space-1); border-left: 2px solid var(--cad-selection); background: var(--cad-command-background); }
  .status span, .row span, .compact-row span, .context span, .note, .empty { color: var(--cad-result-secondary); font-size: var(--cad-font-size-label); }
  .status strong { color: var(--cad-selection); font-size: var(--cad-font-size-value); }
  .row { display: grid; gap: 2px; padding-bottom: 7px; border-bottom: var(--line-thin) solid var(--cad-border); }
  .compact-row { display: flex; justify-content: space-between; gap: 8px; }
  .row strong, .compact-row strong, .context strong { color: var(--cad-result-value); font-size: var(--cad-font-size-value); }
  .formula { padding: 8px; color: var(--cad-result-value); background: var(--cad-command-background); font-size: var(--cad-font-size-label); line-height: 1.55; }
  .group-title { margin-top: 5px; color: var(--cad-result-secondary); font-size: var(--cad-font-size-dimension); font-weight: 600; text-transform: uppercase; }
  .total strong, .confirmed { color: var(--cad-grip); }
  .subtotal strong { color: var(--cad-selection); }
  .quantity strong { color: var(--cad-foreground); }
  .warning strong { color: var(--cad-error); }
  .context { display: grid; gap: 4px; margin-bottom: 4px; }
  .confirmed { font-size: var(--cad-font-size-value); font-weight: 600; }
  .note, .empty { line-height: 1.55; }
  @media (max-width: 768px) { .panel { width: 100%; min-height: 340px; border-top: var(--line-thin) solid var(--cad-border); border-left: 0; } }
</style>

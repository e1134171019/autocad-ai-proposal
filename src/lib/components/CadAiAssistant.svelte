<!-- 職責：先框選、再逐字輸入示範問題，並提供可編輯的大型 AI 問答輸入介面。 -->
<script>
  import { onDestroy } from 'svelte';
  import { answerSelectionQuestion, canSubmitAiQuestion } from '$lib/domain/aiAssistant.js';
  import { isSelectionReady } from '$lib/domain/selection.js';
  let { selection, onReturnSelection } = $props();
  const demoQuestion = '請整理目前框選範圍的外部各段長度、外部合計、深井合計、施工總長與外部三角補強數量。';
  let question = $state('');
  let response = $state(null);
  let isLoading = $state(false);
  let inputElement;
  let timers = [];
  let previousSelectionId = $state('');
  let typedSelectionId = $state('');
  let isLocked = $derived(!isSelectionReady(selection));
  const clearTimers = () => { timers.forEach((timer) => globalThis.clearTimeout(timer)); timers = []; };
  const later = (callback, delay) => { const timer = globalThis.setTimeout(callback, delay); timers.push(timer); };
  const readAiDelay = () => {
    if (!inputElement) return 500;
    const rawDelay = getComputedStyle(inputElement).getPropertyValue('--duration-ai-panel').trim();
    return rawDelay.endsWith('ms') ? Number.parseFloat(rawDelay) : Number.parseFloat(rawDelay) * 1000;
  };
  const submitQuestion = (submittedQuestion = question) => {
    if (!canSubmitAiQuestion(submittedQuestion, selection) || isLoading) return;
    const requestSelection = selection;
    question = submittedQuestion;
    isLoading = true;
    later(() => {
      response = selection?.id === requestSelection.id ? answerSelectionQuestion(submittedQuestion, requestSelection) : null;
      isLoading = false;
      inputElement?.focus();
    }, readAiDelay());
  };
  const typeDemoQuestion = (selectionId) => {
    if (typedSelectionId === selectionId) return;
    typedSelectionId = selectionId;
    question = '';
    let index = 0;
    const typeNext = () => {
      if (selection?.id !== selectionId) return;
      index += 1;
      question = demoQuestion.slice(0, index);
      inputElement?.focus();
      if (index < demoQuestion.length) later(typeNext, 58);
      else later(() => submitQuestion(demoQuestion), 650);
    };
    later(typeNext, 500);
  };
  $effect(() => {
    const currentSelectionId = selection?.id ?? '';
    if (currentSelectionId !== previousSelectionId) {
      clearTimers(); response = null; isLoading = false; question = ''; previousSelectionId = currentSelectionId;
      if (isSelectionReady(selection)) typeDemoQuestion(currentSelectionId);
    }
  });
  const suggestions = ['整理全部長度與合計', '外部三角補強怎麼算？', '哪些物件被忽略？'];
  const fillQuestion = (suggestion) => { clearTimers(); question = suggestion; inputElement?.focus(); };
  const onKeydown = (event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); submitQuestion(); } };
  onDestroy(clearTimers);
</script>

<div class="assistant" aria-live="polite">
  <div class="context"><strong>AI 助理</strong>{#if isLocked}<span>尚未建立查詢範圍</span>{:else}<span>{selection.drawingId}／{selection.floor}／{selection.area}</span>{/if}</div>
  {#if isLocked}
    <div class="locked"><p>動畫會先在圖面框選整層施工範圍，完成後才啟用輸入框。</p><button onclick={onReturnSelection}>重新播放框選</button></div>
  {:else}
    <div class="suggestions">{#each suggestions as suggestion}<button onclick={() => fillQuestion(suggestion)}>{suggestion}</button>{/each}</div>
    {#if response}<div class="response"><strong>{response.message}</strong>{#each response.sources as source}<span>{source}</span>{/each}</div>{/if}
    {#if isLoading}<p class="loading">正在依目前框選與標準圖層整理結果……</p>{/if}
  {/if}
  <div class="composer">
    <textarea bind:this={inputElement} bind:value={question} onkeydown={onKeydown} disabled={isLocked || isLoading} rows="4" placeholder={isLocked ? '完成框選後，示範問題會逐字輸入……' : '詢問外部各段長度、外部合計、深井合計、施工總長、數量或忽略原因……'}></textarea>
    <button disabled={!canSubmitAiQuestion(question, selection) || isLoading} onclick={() => submitQuestion()}>{isLoading ? '處理中' : '送出'}</button>
  </div>
</div>

<style>
  .assistant { display: grid; grid-template-rows: auto auto minmax(0, 1fr) auto; gap: var(--space-2); min-height: 100%; padding: var(--space-2); color: var(--cad-result-foreground); background: var(--cad-result-background); font-family: var(--font-display); }
  .context { display: grid; gap: 4px; padding-bottom: var(--space-1); border-bottom: var(--line-thin) solid var(--cad-border); }
  .context strong { font-size: var(--cad-font-size-value); }
  .context span, .loading { margin: 0; color: var(--cad-result-secondary); font-size: var(--cad-font-size-label); }
  .locked { padding: var(--space-2) 0; color: var(--cad-result-secondary); font-size: var(--cad-font-size-label); line-height: 1.55; }
  .locked button, .suggestions button { border: var(--line-thin) solid var(--cad-border); color: var(--cad-result-foreground); background: transparent; cursor: pointer; }
  .suggestions { display: flex; flex-wrap: wrap; gap: 6px; }
  .suggestions button { padding: 6px 8px; font-size: var(--cad-font-size-dimension); }
  .response { display: grid; align-content: start; gap: 6px; min-height: 150px; padding: var(--space-1); overflow: auto; border-left: 2px solid var(--cad-grip); background: var(--cad-panel-background); }
  .response strong { color: var(--cad-result-value); font-size: var(--cad-font-size-label); line-height: 1.55; }
  .response span { color: var(--cad-result-secondary); font-size: var(--cad-font-size-dimension); line-height: 1.45; }
  .composer { display: grid; gap: 8px; align-self: end; }
  textarea { width: 100%; min-height: 132px; max-height: 220px; resize: vertical; border: var(--line-thin) solid var(--cad-border); border-radius: 0; color: var(--cad-result-foreground); background: var(--cad-command-background); padding: 10px; font-size: var(--cad-font-size-label); line-height: 1.55; }
  .composer button { min-height: 38px; border: var(--line-thin) solid var(--cad-grip); color: var(--cad-chrome-background); background: var(--cad-grip); cursor: pointer; font-weight: 600; }
  button:disabled, textarea:disabled { color: var(--cad-secondary); border-color: var(--cad-border); background: var(--cad-command-background); cursor: not-allowed; }
</style>

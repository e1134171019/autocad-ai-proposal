<!-- 職責：組裝左右等高流程說明、原生風格 CAD Ribbon、模型空間、Docked Panel 與框選狀態。 -->
<script>
  import { onMount, onDestroy } from 'svelte';
  import { renderCadSimulator } from '$lib/charts/cadSimulator.js';
  import { createActiveSelection } from '$lib/domain/selection.js';
  import { activeSelection as activeSelectionStore } from '$lib/stores/appState.js';
  import CadDockedPanel from './CadDockedPanel.svelte';
  let { eyebrow, title, lead, titleHighlights = [], leadHighlights = [], processSteps, mode } = $props();
  let chartContainer;
  let activeIndex = $state(0);
  let selection = $state(null);
  let manualStage = $state({ phase: 'idle' });
  let autoStage = $state({ phase: 'idle', resultIndex: 0 });
  let selectionSequence = 0;
  const commandMap = { 'manual-inspect': '_PROPERTIES', 'manual-label-slow': '_MLEADER', 'box-select-fast': '_AI_SELECT_AREA', 'ai-query': '_AI_ASSISTANT', 'auto-label': '_AI_LENGTH', 'standard-layers': '_LAYER', 'panel-fast': '_AI_CALCULATE', 'result-three': '_AI_QUANTITY', 'pdf-preview': '_PLOT' };
  let activeStep = $derived(processSteps[activeIndex]);
  let requiresSelection = $derived(mode === 'future' && [6, 7, 9].includes(activeIndex));
  let isNextDisabled = $derived(activeIndex === processSteps.length - 1 || (requiresSelection && !selection) || (mode === 'future' && activeIndex === 7 && (autoStage.resultIndex ?? 0) < 5));
  let activeCommand = $derived(autoStage.command ? `_${autoStage.command}` : commandMap[activeStep.animType] ?? '_OPEN');
  const toneClass = (tone) => tone === 'ai' ? 'keyword-ai' : tone === 'standard' ? 'keyword-standard' : tone === 'emphasis' ? 'keyword-emphasis' : 'keyword-manual';
  const splitHighlights = (text, highlights = []) => {
    if (!highlights.length) return [{ text, tone: '' }];
    const escaped = highlights.map(({ text: word }) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const regex = new RegExp(`(${escaped.join('|')})`, 'g');
    const toneByText = Object.fromEntries(highlights.map((item) => [item.text, item.tone]));
    return text.split(regex).filter(Boolean).map((part) => ({ text: part, tone: toneByText[part] ?? '' }));
  };
  let titleParts = $derived(splitHighlights(title, titleHighlights));
  let leadParts = $derived(splitHighlights(lead, leadHighlights));
  let labelParts = $derived(splitHighlights(activeStep.label, activeStep.highlights));
  let descParts = $derived(splitHighlights(activeStep.desc, activeStep.highlights));
  const clearSelection = () => { selection = null; activeSelectionStore.set(null); };
  const onSelectionChange = (candidate) => { selectionSequence += 1; selection = createActiveSelection({ ...candidate, sourceId: candidate.id, id: `${candidate.id}-${selectionSequence}` }); activeSelectionStore.set(selection); };
  const renderCurrentStep = () => chartContainer && renderCadSimulator(chartContainer, processSteps, { activeStep: activeIndex, mode, activeSelection: selection, onSelectionChange, onManualStageChange: (stage) => manualStage = stage, onAutoStageChange: (stage) => autoStage = stage });
  const goToStep = (nextIndex) => {
    const bounded = Math.max(0, Math.min(nextIndex, processSteps.length - 1));
    activeIndex = bounded; manualStage = { phase: 'idle' }; autoStage = { phase: 'idle', resultIndex: 0 };
    if (mode === 'future' && [6, 7, 9].includes(bounded)) clearSelection();
    if (mode === 'current') clearSelection();
    queueMicrotask(renderCurrentStep);
  };
  const onReturnSelection = () => { clearSelection(); goToStep(9); };
  onMount(() => { renderCurrentStep(); const observer = new ResizeObserver(renderCurrentStep); observer.observe(chartContainer); return () => observer.disconnect(); });
  onDestroy(clearSelection);
</script>

<div class="process-layout">
  <div class="step-copy" aria-live="polite">
    <div>
      <div class="act-heading">
        <p class="eyebrow">{eyebrow}</p>
        <h2 class="section-title">{#each titleParts as part}<span class={part.tone ? toneClass(part.tone) : ''}>{part.text}</span>{/each}</h2>
        <p class="section-lead">{#each leadParts as part}<span class={part.tone ? toneClass(part.tone) : ''}>{part.text}</span>{/each}</p>
      </div>
      <div class="step-detail">
      <div class="progress"><span>{String(activeStep.id).padStart(2, '0')}</span><span>/ {String(processSteps.length).padStart(2, '0')}</span></div>
      <h3>{#each labelParts as part}<span class={part.tone ? toneClass(part.tone) : ''}>{part.text}</span>{/each}</h3>
      <p>{#each descParts as part}<span class={part.tone ? toneClass(part.tone) : ''}>{part.text}</span>{/each}</p>
      {#if mode === 'future' && activeStep.animType === 'auto-label'}<p class="step-note"><strong>矩陣負責重複配置，標準圖層決定哪些深井會被程式處理。</strong></p>{/if}
      </div>
    </div>
    <div>
      <div class="step-controls"><button disabled={activeIndex === 0} onclick={() => goToStep(activeIndex - 1)}>← 上一步</button><button class="next" disabled={isNextDisabled} onclick={() => goToStep(activeIndex + 1)}>下一步 →</button></div>
      <div class="step-index" aria-label="流程進度">{#each processSteps as processStep, index}<button class:active={activeIndex === index} aria-label={`前往第 ${processStep.id} 步`} onclick={() => goToStep(index)}>{String(processStep.id).padStart(2, '0')}</button>{/each}</div>
    </div>
  </div>
  <div class="cad-viewport" aria-label="AutoCAD 操作模擬器">
    <div class="cad-titlebar"><strong>AUTOCAD / AI INTELLIGENT WORK</strong><span>{mode === 'current' ? 'CURRENT PROCESS' : 'AI WORKFLOW'}</span></div>
    <div class="cad-main"><div class="cad-chart" bind:this={chartContainer}></div><CadDockedPanel {activeStep} {mode} {selection} {manualStage} {autoStage} {onReturnSelection} /></div>
    <div class="cad-command"><span>COMMAND: {activeCommand}</span><strong>{String(activeStep.id).padStart(2, '0')} / {String(processSteps.length).padStart(2, '0')}</strong></div>
  </div>
</div>

<style>
  .process-layout { display: grid; grid-template-columns: 1fr; gap: var(--space-4); margin-top: 0; align-items: stretch; min-width: 0; }
  .step-copy { display: flex; flex-direction: column; justify-content: space-between; min-height: var(--cad-min-height-desktop); padding: 0; border-block: var(--line-thin) solid var(--border-strong); }
  .act-heading { padding: var(--space-3) 0 var(--space-4); }
  .act-heading .eyebrow { margin: 0; }
  .act-heading .section-title { margin-top: var(--space-2); }
  .act-heading .section-lead { max-width: 500px; margin-top: var(--space-3); }
  .step-detail { padding-top: var(--space-4); border-top: var(--line-thin) solid var(--border-strong); }
  .progress { display: flex; gap: var(--space-1); color: var(--text-muted); font: 600 .78rem/1 var(--font-display); }
  .progress span:first-child { color: var(--primary); }
  h3 { max-width: 470px; margin: var(--space-4) 0 0; color: var(--foreground); font: 600 clamp(1.65rem, 3vw, 2.7rem)/1.18 var(--font-display); letter-spacing: -.035em; }
  .step-copy p { max-width: 480px; margin: var(--space-3) 0 0; color: var(--text-secondary); }
  .step-note { padding: var(--space-2); border-left: 3px solid var(--technical); background: var(--technical-subtle); }
  .keyword-ai { color: var(--keyword-ai); font-weight: 700; }
  .keyword-standard { color: var(--keyword-standard); font-weight: 700; }
  .keyword-manual { color: var(--keyword-manual); font-weight: 700; }
  .keyword-emphasis { color: var(--foreground); font-weight: 700; }
  .step-controls { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); margin-top: var(--space-5); }
  .step-controls button { min-height: 50px; border: var(--line-thin) solid var(--border-strong); background: var(--bg-surface); cursor: pointer; }
  .step-controls .next { color: var(--primary-foreground); border-color: var(--primary); background: var(--primary); }
  .step-controls button:disabled { color: var(--text-disabled); border-style: dashed; background: var(--bg-subtle); cursor: not-allowed; }
  .step-index { display: flex; flex-wrap: wrap; gap: var(--space-1); margin-top: var(--space-4); }
  .step-index button { min-width: 32px; height: 30px; border: var(--line-thin) solid var(--border); color: var(--text-secondary); background: var(--bg-surface); font: 500 .68rem/1 var(--font-display); cursor: pointer; }
  .step-index button.active { color: var(--primary-foreground); border-color: var(--primary); background: var(--primary); text-decoration: underline; text-underline-offset: 3px; }
  .cad-viewport { display: grid; grid-template-rows: var(--cad-toolbar-height) minmax(0, 1fr) var(--cad-command-height); width: 100%; height: 100%; min-width: var(--cad-min-width-tablet); min-height: var(--cad-min-height-desktop); overflow-x: auto; border: var(--line-thin) solid var(--cad-border); color: var(--cad-foreground); background: var(--cad-chrome-background); font-family: var(--font-display); }
  .cad-titlebar, .cad-command { display: flex; align-items: center; justify-content: space-between; padding-inline: 12px; background: var(--cad-toolbar-background); font-size: var(--cad-font-size-command); }
  .cad-titlebar { height: var(--cad-toolbar-height); border-bottom: var(--line-thin) solid var(--cad-border); }
  .cad-titlebar span, .cad-command span { color: var(--cad-secondary); }
  .cad-main { display: grid; grid-template-columns: minmax(0, 1fr) var(--cad-property-width); min-height: calc(var(--cad-min-height-desktop) - var(--cad-toolbar-height) - var(--cad-command-height)); }
  .cad-chart { min-width: 0; min-height: 100%; background: var(--cad-canvas-background); }
  .cad-chart :global(svg) { display: block; width: 100%; height: 100%; min-height: inherit; }
  .cad-command { height: var(--cad-command-height); border-top: var(--line-thin) solid var(--cad-border); background: var(--cad-command-background); }
  @media (min-width: 1280px) { .process-layout { grid-template-columns: minmax(360px, 40fr) minmax(var(--cad-min-width-desktop), 60fr); } .cad-viewport { min-width: var(--cad-min-width-desktop); overflow: hidden; } }
  @media (max-width: 768px) { .step-copy { min-height: auto; } .cad-main { grid-template-columns: minmax(var(--cad-min-width-tablet), 1fr); } .cad-viewport { min-width: 0; } }
  @media (max-width: 480px) { .step-controls { grid-template-columns: 1fr; } }
</style>

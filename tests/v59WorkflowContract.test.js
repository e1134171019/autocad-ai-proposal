// 職責：驗證 v5.9 人工逐段標註、標準圖層、結果面板、AI 自動輸入與關鍵字顏色。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { currentFlowNodes, futureExteriorSegments, futureFlowSteps } from '../src/lib/content/siteContent.js';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('v5.9 工作流程契約', () => {
  it('ACT 02 逐段點選與逐段標註，不包含整層框選', () => {
    expect(currentFlowNodes.map((step) => step.animType)).toContain('manual-inspect');
    expect(currentFlowNodes.map((step) => step.animType)).toContain('manual-label-slow');
    expect(currentFlowNodes.some((step) => step.selection)).toBe(false);
  });
  it('STEP 02 建立四個標準圖層', () => {
    const step = futureFlowSteps[1];
    expect(step.animType).toBe('standard-layers');
    ['AI-EXTERIOR', 'AI-SHAFT', 'AI-DIM', 'AI-BRACE'].forEach((layer) => expect(step.desc).toContain(layer));
  });
  it('外部 16 段合計 1000cm、六個深井合計 600cm，施工總長 1600cm', () => {
    const selection = futureFlowSteps[6].selection;
    expect(futureExteriorSegments).toHaveLength(16);
    expect(futureExteriorSegments.reduce((sum, item) => sum + item.lengthCm, 0)).toBe(1000);
    expect(selection.segmentLengths).toHaveLength(22);
    expect(selection.lengthObjectIds).toHaveLength(22);
    expect(selection.quantityObjectIds).toHaveLength(30);
    expect(selection.quantityResults[0]).toMatchObject({ label: '外部三角補強', count: 30, unit: '個' });
  });
  it('詳細結果只放 AI RESULTS，圖面負責幾何與箭頭', () => {
    const panel = read('src/lib/components/CadDockedPanel.svelte');
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(panel).toContain('externalResults');
    expect(panel).toContain('{item.id}');
    ['16 段外部獨立長度', '內部深井', '外部三角補強'].forEach((phrase) => expect(panel).toContain(phrase));
    expect(chart).toContain('drawExternalIndependentSegments');
    expect(chart).toContain('drawTriangleBraces');
  });
  it('AI 輸入框放大並在新框選後逐字輸入', () => {
    const assistant = read('src/lib/components/CadAiAssistant.svelte');
    expect(assistant).toContain('rows="4"');
    expect(assistant).toContain('typeDemoQuestion');
    expect(assistant).toContain('min-height: 132px');
  });
  it('ACT 02、04、05、06 使用語意關鍵字色，ACT 01、03 不變', () => {
    const tokens = read('src/lib/tokens.css');
    ['--keyword-ai:', '--keyword-standard:', '--keyword-manual:'].forEach((token) => expect(tokens).toContain(token));
    expect(read('src/lib/components/Act01Hero.svelte')).not.toContain('keyword-ai');
    expect(read('src/lib/components/Act03Problem.svelte')).not.toContain('keyword-ai');
  });
});


// 職責：驗證 ACT 02 無框選、ACT 04 多階段框選與 D3 callback。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { currentFlowNodes, futureFlowSteps } from '../src/lib/content/siteContent.js';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('CAD 框選互動', () => {
  it('人工流程不使用框選，AI 流程在 STEP 07、08、10 使用整層框選', () => {
    expect(currentFlowNodes.some((step) => step.animType.includes('box-select'))).toBe(false);
    expect(futureFlowSteps.filter((step) => step.selection)).toHaveLength(3);
    expect(futureFlowSteps.find((step) => step.animType === 'panel-fast')?.selection?.boundaryType).toBe('floor');
    expect(futureFlowSteps.find((step) => step.animType === 'ai-query')?.selection?.boundaryType).toBe('floor');
  });
  it('D3 包含箭頭游標、十字游標、拖曳框、Grip 與 callback', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    ['drawPointerCursor', 'drawCrosshair', 'animateBoxSelection', 'drawGrips', 'onSelectionChange'].forEach((name) => expect(chart).toContain(name));
  });
  it('STEP 08 先點自動計算再框選，STEP 10 框選後才問 AI', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('drawCalculationScene');
    expect(chart).toContain("highlightTool(ribbon,'calculate'");
    expect(chart).toContain('drawAiQueryScene');
  });
});

// 職責：驗證人工／自動紅色標註、原生 Ribbon、游標切換與 STEP 06 內嵌深井矩陣。
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { currentFlowNodes, futureFlowSteps } from '../src/lib/content/siteContent.js';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

 describe('v5.9 原生 CAD 操作與標註', () => {
  it('ACT 02 與 ACT 04 使用不同標示動畫', () => {
    expect(currentFlowNodes.some((step) => step.animType === 'manual-label-slow')).toBe(true);
    expect(currentFlowNodes.some((step) => step.animType.includes('box-select'))).toBe(false);
    expect(futureFlowSteps.some((step) => step.animType === 'auto-label')).toBe(true);
  });
  it('Ribbon 使用工作語言，工具列用箭頭，模型操作用十字游標', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    ['drawRibbon', 'drawPointerCursor', 'drawCrosshair', "label: '外部線'", "label: '深井線'", "label: '深井矩陣'", "label: '自動計算'"].forEach((phrase) => expect(chart).toContain(phrase));
    expect(chart).not.toContain("label: 'PLINE'");
    expect(chart).not.toContain("label: 'RECT'");
  });
  it('紅色 AI-DIM 與聚合線使用不同圖層 Token', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain("'--cad-layer-dimension'");
    expect(chart).toContain("'--cad-layer-exterior'");
    expect(chart).toContain("'--cad-layer-shaft'");
    expect(chart).toContain("data-layer', 'AI-DIM");
  });
  it('多深井矩陣整合在 STEP 06 的同一個 CAD 動畫，不再獨立成篇', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    const solution = read('src/lib/components/Act04Solution.svelte');
    const processSource = read('src/lib/components/CadProcess.svelte');
    expect(chart).toContain('runShaftDrawSequence');
    expect(chart).toContain('drawAutoLabelScene');
    expect(solution).not.toContain('matrixInterlude');
    expect(processSource).not.toContain('AutoLabelMatrix');
    expect(existsSync(resolve(process.cwd(), 'src/lib/components/AutoLabelMatrix.svelte'))).toBe(false);
  });
  it('矩陣只對標準圖層產生尺寸標註', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('isStandardLayerObject');
    expect(chart).toContain('非標準圖層不標示');
    expect(chart).toContain('AI_LAYER_FILTER');
  });
  it('ACT 02 維持 0.5 倍，ACT 04 在同基準上加快 25%', () => {
    const tokens = read('src/lib/tokens.css');
    expect(tokens).toContain('--cad-playback-rate: 0.5');
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain("'--cad-playback-rate'");
    expect(chart).toContain("mode === 'future' ? baseRate * 1.25 : baseRate");
  });
});


// 職責：驗證 v5.9 淺灰模型空間、中階工程線型、整層框選與公尺轉換展示。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { futureExteriorSegments, futureFlowSteps, shaftMatrixItems } from '../src/lib/content/siteContent.js';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('v5.9 CAD 圖面層次', () => {
  it('模型空間刻意使用淺灰色，CAD 框架仍維持深色', () => {
    const tokens = read('src/lib/tokens.css').toLowerCase();
    expect(tokens).toContain('--cad-canvas-background: #e7e8e5');
    expect(tokens).toContain('--cad-chrome-background: #1c2229');
  });
  it('底圖具有實線、隱藏線、中心線與 45 度 hatch', () => {
    const tokens = read('src/lib/tokens.css');
    const chart = read('src/lib/charts/cadSimulator.js');
    ['--cad-linetype-hidden:', '--cad-linetype-center:', '--cad-hatch-spacing:'].forEach((token) => expect(tokens).toContain(token));
    ["data-linetype', 'solid", "data-linetype', 'hidden", "data-linetype', 'center", "data-linetype', 'hatch", "patternTransform', 'rotate(45)"].forEach((phrase) => expect(chart).toContain(phrase));
  });
  it('STEP 07 一次框選整層，再由標準圖層過濾', () => {
    const selectionStep = futureFlowSteps.find((step) => step.animType === 'box-select-fast');
    expect(selectionStep.label).toContain('樓層範圍');
    expect(selectionStep.selection.boundaryType).toBe('floor');
    expect(selectionStep.selection.area).toContain('整層');
    expect(selectionStep.selection.objectIds).toHaveLength(52);
    expect(selectionStep.selection.lengthObjectIds).toHaveLength(22);
    expect(selectionStep.selection.quantityObjectIds).toHaveLength(30);
    expect(selectionStep.selection.ignoredObjectIds).toHaveLength(2);
  });
  it('展示資料從公尺轉換為公分', () => {
    const selection = futureFlowSteps.find((step) => step.animType === 'box-select-fast').selection;
    expect(selection.drawingUnit).toBe('m');
    expect(selection.segmentLengths).toEqual([
      ...futureExteriorSegments.map((item) => item.rawLength),
      1, 1, 1, 1, 1, 1
    ]);
    expect(shaftMatrixItems.every((item) => item.drawingUnit === 'm')).toBe(true);
  });
});


// 職責：驗證 v5.9.2 外部逐段尺寸、多深井游標動畫、長方形補強與模型空間清理。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { futureExteriorSegments, futureFlowSteps } from '../src/lib/content/siteContent.js';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('v5.9.2 整合修正契約', () => {
  it('外部施工線依轉角拆成 16 段，獨立長度合計為 1000cm', () => {
    expect(futureExteriorSegments).toHaveLength(16);
    expect(futureExteriorSegments.reduce((sum, item) => sum + item.lengthCm, 0)).toBe(1000);
    expect(futureFlowSteps[6].selection.externalSegments).toEqual(futureExteriorSegments);
  });

  it('外部總和不作為單一圖面尺寸', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('exteriorSegmentDefinitions');
    expect(chart).toContain('drawSegmentDimension');
    expect(chart).not.toContain("formatLength(10,'m')");
    expect(chart).not.toContain("length:'600.00 cm'");
    expect(chart).not.toContain("length:'400.00 cm'");
  });

  it('ACT 04 繪圖時游標逐段跟隨，並依序完成多個深井', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('drawGuidedDrawScene');
    expect(chart).toContain('runExteriorSegmentSequence');
    expect(chart).toContain('runShaftDrawSequence');
    expect(chart).toContain("shaftMatrixItems.filter((item)=>isStandardLayerObject(item,standardShaftLayers))");
  });

  it('ACT 04 加快 25%，ACT 02 使用原始播放率', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain("mode === 'future' ? baseRate * 1.25 : baseRate");
  });

  it('外部三角補強是預先存在的長方形，編號逐步顯示', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain("data-brace-geometry','rectangle");
    expect(chart).toContain('showNumbers:false');
    expect(chart).toContain('revealBraceNumbersForExteriorSegment');
    expect(chart).toContain("attr('opacity',showNumber?1:0)");
  });

  it('人工逐段選線共用外擴輪廓，模型空間不含加總公式', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('const allExterior = exteriorSegmentDefinitions(geometry)');
    expect(chart).not.toContain('人工加總：外部');
    expect(chart).not.toContain('外部：100＋80＋30＋40＋60＝310.00 cm｜深井');
  });
});

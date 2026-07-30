// 職責：驗證 v2.8.2 水平尺寸、外擴輪廓、外部白色編號補強與雙欄對齊修正。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('v2.8.2 修正契約', () => {
  it('正式尺寸統一為水平尺寸', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('drawHorizontalDimension');
    expect(chart).toContain("data-dimension-orientation', 'horizontal");
    expect(chart).not.toContain('function drawCadDimension');
  });
  it('外部輪廓使用封閉多邊形外擴演算法', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('offsetClosedPolygon');
    expect(chart).toContain('intersectLines');
  });
  it('三角補強位於外部、使用白色長方形並依序顯示 01 至 30 編號', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    const tokens = read('src/lib/tokens.css');
    expect(chart).toContain("data-location','exterior-perimeter");
    expect(chart).toContain('drawBraceElement');
    expect(chart).toContain("data-brace-geometry','rectangle");
    expect(chart).toContain("String(item.number).padStart(2,'0')");
    expect(tokens).toContain('--cad-layer-brace: #ffffff');
  });
  it('ACT 標題已收進左右雙欄並與 CAD 上緣對齊', () => {
    const component = read('src/lib/components/CadProcess.svelte');
    expect(component.indexOf('<div class="process-layout">')).toBeLessThan(component.indexOf('<div class="act-heading">'));
    expect(component).toContain('margin-top: 0');
    expect(component).toContain('40fr');
    expect(component).toContain('60fr');
  });
});

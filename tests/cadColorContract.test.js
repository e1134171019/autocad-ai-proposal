// 職責：驗證 CAD 框架、模型空間、ByLayer 與操作狀態色分離。
// 輸入：tokens.css 與 cadSimulator.js。
// 輸出：語意配色契約。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('CAD 語意配色', () => {
  it('完整定義介面、畫布、ByLayer 與狀態 Token', () => {
    const tokens = read('src/lib/tokens.css');
    ['--cad-chrome-background:', '--cad-canvas-background:', '--cad-building-primary:', '--cad-building-secondary:', '--cad-layer-exterior:', '--cad-layer-shaft:', '--cad-layer-dimension:', '--cad-selection:', '--cad-grip:', '--cad-result-background:'].forEach((token) => expect(tokens).toContain(token));
  });
  it('外部、深井與框選使用不同 Token', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain("'--cad-layer-exterior'");
    expect(chart).toContain("'--cad-layer-shaft'");
    expect(chart).toContain("'--cad-layer-dimension'");
    expect(chart).toContain("'--cad-selection'");
    expect(chart).toContain("'--cad-grip'");
  });
});

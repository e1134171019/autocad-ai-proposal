// 職責：驗證 Light-first 頁面與 AutoCAD 分層介面邊界。
// 輸入：tokens.css 與 CAD 元件原始碼。
// 輸出：v5.9 主題、尺寸與技術區契約。
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('v5.9 Light-first 主題契約', () => {
  it('包含寬版頁面、CAD 尺寸、游標與 AI 動畫 Token', () => {
    const tokens = read('src/lib/tokens.css');
    ['--content-wide-max-width:', '--cad-property-width:', '--cad-min-width-desktop:', '--cad-cursor-size:', '--cad-grip-size:', '--duration-cad-selection-drag:', '--duration-ai-panel:'].forEach((token) => expect(tokens).toContain(token));
  });
  it('只有 CAD 組件使用 cad-* CSS Token', () => {
    const directory = resolve(process.cwd(), 'src/lib/components');
    const users = readdirSync(directory).filter((name) => readFileSync(resolve(directory, name), 'utf-8').includes('var(--cad-')).sort();
    expect(users).toEqual(['CadAiAssistant.svelte', 'CadDockedPanel.svelte', 'CadProcess.svelte']);
  });
  it('CAD 圖表不讀取一般頁面色彩', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain("'--cad-canvas-background'");
    expect(chart).not.toContain("'--background'");
    expect(chart).not.toContain("'--foreground'");
  });
});

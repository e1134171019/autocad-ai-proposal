// 職責：驗證 v5.9 CAD 模擬器寬版容器、真實 Docked Panel 與雙模式共用。
// 輸入：CAD 元件與圖表原始碼。
// 輸出：避免右側裁切並保留可輸入 AI 助理。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('v5.9 CAD 模擬器契約', () => {
  it('Docked Panel 使用真實 textarea，不由 SVG 假造', () => {
    const assistant = read('src/lib/components/CadAiAssistant.svelte');
    expect(assistant).toContain('<textarea');
    expect(assistant).toContain('disabled={isLocked || isLoading}');
    expect(read('src/lib/charts/cadSimulator.js')).not.toContain('<textarea');
  });
  it('依實際容器寬度建立 viewBox', () => {
    const chart = read('src/lib/charts/cadSimulator.js');
    expect(chart).toContain('getBoundingClientRect().width');
    expect(chart).not.toContain('DESKTOP_VIEW_WIDTH');
  });
  it('桌機使用 40/60 等高雙欄，窄螢幕允許技術區捲動', () => {
    const component = read('src/lib/components/CadProcess.svelte');
    ['40fr', '60fr', 'min-height: var(--cad-min-height-desktop)'].forEach((rule) => expect(component).toContain(rule));
    expect(component).toContain('var(--cad-min-width-desktop)');
    expect(component).toContain('overflow: hidden');
    expect(component).toContain('overflow-x: auto');
  });
  it('ACT 02 與 ACT 04 共用寬版互動元件', () => {
    const current = read('src/lib/components/Act02Flow.svelte');
    const future = read('src/lib/components/Act04Solution.svelte');
    expect(current).toContain('CadProcess');
    expect(future).toContain('CadProcess');
    expect(current).toContain('section-inner-wide');
    expect(future).toContain('section-inner-wide');
  });
});

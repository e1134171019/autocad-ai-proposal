// 職責：鎖定客戶可理解的首屏資訊階層與敘事區降色規則；CAD ByLayer/狀態色不得被誤傷。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf8');

const HERO_PATH = 'src/lib/components/Act01Hero.svelte';
const PROCESS_PATH = 'src/lib/components/CadProcess.svelte';
const ACT05_PATH = 'src/lib/components/Act05Intelligence.svelte';
const ACT06_PATH = 'src/lib/components/Act06Summary.svelte';
const NAV_PATH = 'src/lib/components/Nav.svelte';
const TOKENS_PATH = 'src/lib/tokens.css';

describe('UX hierarchy v2 client comprehension contract', () => {
  it('首屏先說明工具用途，再出現次要六章導覽', () => {
    const hero = read(HERO_PATH);
    const proposition = hero.indexOf('AutoCAD 施工圖長度與數量自動驗算');
    const outline = hero.indexOf('這份提案會說明六件事');

    expect(proposition).toBeGreaterThanOrEqual(0);
    expect(outline).toBeGreaterThanOrEqual(0);
    expect(proposition).toBeLessThan(outline);
  });

  it('首屏用具體 Before / After 說明現況與外掛流程', () => {
    const hero = read(HERO_PATH);

    expect(hero).toContain('保留繪圖人員的工程判斷，把逐段查看長度、人工加總與數量清點交給外掛處理。');
    expect(hero).toContain('繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點');
    expect(hero).toContain('繪圖 → 框選施工範圍 → 系統整理長度與數量 → 人員確認');
  });

  it('ACT 01 與固定導覽都不再使用舊的工時成效語意', () => {
    const hero = read(HERO_PATH);
    const nav = read(NAV_PATH);

    expect(hero).not.toMatch(/工時差異|AI 工具處理更快|時間更穩定/);
    expect(hero).toContain('流程差異');
    expect(hero).toContain('不代表實測工時');
    expect(nav).not.toContain('工時變異');
    expect(nav).toContain('流程差異');
  });

  it('一般敘事不再用 AI 藍、標準綠、人工橘做文字分類', () => {
    const sources = [read(PROCESS_PATH), read(ACT05_PATH), read(ACT06_PATH)];

    for (const source of sources) {
      expect(source).not.toMatch(/\.keyword-ai\s*\{[^}]*color:/s);
      expect(source).not.toMatch(/\.keyword-standard\s*\{[^}]*color:/s);
      expect(source).not.toMatch(/\.keyword-manual\s*\{[^}]*color:/s);
    }

    expect(read(ACT06_PATH)).not.toContain('border-top: 3px solid var(--keyword-standard)');
  });

  it('CAD ByLayer 與操作狀態色仍保留', () => {
    const tokens = read(TOKENS_PATH);

    [
      '--cad-layer-exterior:',
      '--cad-layer-shaft:',
      '--cad-layer-dimension:',
      '--cad-selection:',
      '--cad-grip:'
    ].forEach((token) => expect(tokens).toContain(token));
  });
});

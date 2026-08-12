// 職責：鎖定客戶可理解的資訊階層、責任分離、手機導覽、視覺權重與 CAD 語意色；避免 UX 改版破壞工程邊界。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf8');

const APP_CSS_PATH = 'src/app.css';
const HERO_PATH = 'src/lib/components/Act01Hero.svelte';
const ACT02_PATH = 'src/lib/components/Act02Flow.svelte';
const ACT03_PATH = 'src/lib/components/Act03Problem.svelte';
const PROCESS_PATH = 'src/lib/components/CadProcess.svelte';
const ACT04_PATH = 'src/lib/components/Act04Solution.svelte';
const ACT05_PATH = 'src/lib/components/Act05Intelligence.svelte';
const ACT06_PATH = 'src/lib/components/Act06Summary.svelte';
const NAV_PATH = 'src/lib/components/Nav.svelte';
const CONTENT_PATH = 'src/lib/content/siteContent.js';
const CONTEXT_MAP_PATH = 'src/lib/charts/contextMap.js';
const TOKENS_PATH = 'src/lib/tokens.css';

describe('UX hierarchy client comprehension contract', () => {
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

  it('首屏提早說明真正難點是本次應計算物件的範圍', () => {
    const hero = read(HERO_PATH);

    expect(hero).toContain('真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。');
    expect(hero).toMatch(/樓層|區域|版本/);
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

  it('手機導覽保留語意標籤與可及的展開控制', () => {
    const nav = read(NAV_PATH);

    ['提案概要', '目前流程', '流程差異', '操作示意', '計算依據', '專案總結']
      .forEach((label) => expect(nav).toContain(label));
    expect(nav).toContain('menuOpen');
    expect(nav).toContain('aria-expanded');
    expect(nav).toContain('aria-controls');
    expect(nav).not.toContain('.links a { font-size: 0; }');
  });

  it('CAD 模擬器清楚標示為提案操作示意', () => {
    const solution = read(ACT04_PATH);

    expect(solution).toContain('Concept Simulation');
    expect(solution).toContain('提案操作示意');
    expect(solution).toMatch(/AutoCAD API|DWG/);
    expect(solution).toMatch(/尚未|不代表|不是/);
  });

  it('ACT 05 將規則計算與 AI 助理責任分開', () => {
    const intelligence = read(ACT05_PATH);
    const content = read(CONTENT_PATH);

    expect(intelligence).not.toContain('AI DECISION LOGIC');
    expect(intelligence).toContain('ACT 05 / CALCULATION & RESULT TRACEABILITY');
    expect(intelligence).toContain('計算依據與結果確認');
    expect(intelligence).toContain('C# / Rule Engine');
    expect(intelligence).toContain('AI Assistant');

    expect(content).toContain('deterministicResponsibilities');
    expect(content).toContain('assistantResponsibilities');
    expect(content).not.toContain("'自動設定圖層、顏色及線寬，並取得各段長度'");
    expect(content).not.toContain("'自動分類加總，依公司條件換算施工項目與元件數量'");
  });

  it('ACT 05 顯示可追溯的最小證據鏈', () => {
    const intelligence = read(ACT05_PATH);

    ['Object', 'Layer', 'Selection Boundary', 'Rule', 'Result', 'Ignored Reason']
      .forEach((label) => expect(intelligence).toContain(label));
    expect(intelligence).toMatch(/回到圖面|追溯|計算依據/);
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

  it('v4 取消一般章節 100vh 等權並建立 XL/L/M/S 視覺權重', () => {
    const appCss = read(APP_CSS_PATH);
    const hero = read(HERO_PATH);
    const act02 = read(ACT02_PATH);
    const act03 = read(ACT03_PATH);
    const act04 = read(ACT04_PATH);
    const act05 = read(ACT05_PATH);
    const act06 = read(ACT06_PATH);

    expect(appCss).not.toMatch(/\.section\s*\{[^}]*min-height:\s*100vh/s);
    ['.section-weight-xl', '.section-weight-l', '.section-weight-m', '.section-weight-s']
      .forEach((selector) => expect(appCss).toContain(selector));
    expect(hero).toContain('section-weight-xl');
    expect(act02).toContain('section-weight-m');
    expect(act03).toContain('section-weight-m');
    expect(act04).toContain('section-weight-xl');
    expect(act05).toContain('section-weight-l');
    expect(act06).toContain('section-weight-s');
  });

  it('ACT 03 風險編號不把 danger red 當裝飾性強調', () => {
    const act03 = read(ACT03_PATH);
    expect(act03).not.toMatch(/li span\s*\{[^}]*color:\s*var\(--danger\)/s);
  });

  it('ACT 05 手機技術圖不先佔滿畫面且仍保留責任與證據順序', () => {
    const intelligence = read(ACT05_PATH);

    expect(intelligence).toContain('@media (max-width: 768px)');
    expect(intelligence).toMatch(/@media \(max-width: 768px\)[\s\S]*?\.chart\s*\{[^}]*min-height:\s*(?:2[0-9]{2}|3[0-2][0-9])px/s);
    expect(intelligence.indexOf('C# / Rule Engine')).toBeLessThan(intelligence.indexOf('AI Assistant'));
    expect(intelligence.indexOf('AI Assistant')).toBeLessThan(intelligence.indexOf('TRACEABILITY'));
  });

  it('ACT 05 計算上下文不再把 deterministic pipeline 標成 AI AUTOMATION', () => {
    const contextMap = read(CONTEXT_MAP_PATH);

    expect(contextMap).not.toContain('AI AUTOMATION');
    expect(contextMap).toContain('RULE ENGINE');
    expect(contextMap).toMatch(/計算上下文|RULE ENGINE/);
  });

  it('ACT 06 是短收尾且明確維持人、程式、AI 責任邊界', () => {
    const summary = read(ACT06_PATH);

    expect(summary).toContain('section-weight-s');
    expect(summary).toContain('人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。');
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

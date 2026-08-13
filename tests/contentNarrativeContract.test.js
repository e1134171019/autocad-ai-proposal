// 職責：驗證 ACT 01 先回答客戶「這套工具實際可以幫我做什麼」。
// 輸入：heroContent。
// 輸出：主標、核心價值、四個結果、範圍提示與收尾契約。
import { describe, expect, it } from 'vitest';
import { heroContent } from '../src/lib/content/siteContent.js';

describe('ACT 01 客戶價值敘事', () => {
  it('用明確主標與一句價值先說清楚方案', () => {
    expect(heroContent.title).toBe('AutoCAD 施工圖長度與數量自動驗算');
    expect(heroContent.lead).toContain('逐段查看、記錄、加總與清點');
    expect(heroContent.lead).toContain('由外掛集中整理');
  });

  it('第一層只呈現四個客戶可理解的結果', () => {
    expect(heroContent.outcomes.map((outcome) => outcome.title)).toEqual([
      '每段長度',
      '施工總長',
      '元件數量',
      'AI 查詢'
    ]);
  });

  it('用 6 樓外部施工範圍說明計算邊界', () => {
    expect(heroContent.scopeNote.title).toBe('只整理這次要算的範圍');
    expect(heroContent.scopeNote.desc).toContain('6 樓外部施工範圍');
    expect(heroContent.scopeNote.desc).toContain('不混入本次結果');
  });

  it('結果留在 AutoCAD 內確認，AI 用於後續查詢', () => {
    expect(heroContent.closing).toContain('AutoCAD 內查看與確認');
    expect(heroContent.closing).toContain('AI 協助查詢');
  });

  it('不再保留四段團隊推理敘事', () => {
    expect(heroContent).not.toHaveProperty('sections');
    const content = JSON.stringify(heroContent);
    expect(content).not.toContain('我們的目標');
    expect(content).not.toContain('先理解現況');
  });

  it('不含空泛展示文案', () => {
    const content = JSON.stringify(heroContent);
    expect(content).not.toContain('不是只做一個');
    expect(content).not.toContain('一次性的功能展示');
  });
});

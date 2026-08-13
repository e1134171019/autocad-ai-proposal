// 職責：驗證 ACT 01 四段 B2B 提案支援內容與具體工程語意。
// 輸入：heroContent。
// 輸出：順序、內容與禁用空話契約。
import { describe, expect, it } from 'vitest';
import { heroContent } from '../src/lib/content/siteContent.js';

describe('ACT 01 B2B 提案敘事', () => {
  it('依需求、提案內容、計算條件、流程基準排列', () => {
    expect(heroContent.sections.map((section) => section.title)).toEqual(['客戶需求', '提案內容', '計算條件', '流程基準']);
  });

  it('保留具體驗算工作與 ACT 02 銜接', () => {
    const content = heroContent.sections.flatMap((section) => section.paragraphs).join(' ');
    expect(content).toContain('每段長度');
    expect(content).toContain('標準圖層');
    expect(content).toContain('施工判斷與繪製仍由繪圖人員負責');
    expect(content).toContain('下一章完整呈現客戶目前的施工圖流程');
  });

  it('不含空泛展示文案', () => {
    const content = JSON.stringify(heroContent);
    expect(content).not.toContain('不是只做一個');
    expect(content).not.toContain('一次性的功能展示');
  });
});

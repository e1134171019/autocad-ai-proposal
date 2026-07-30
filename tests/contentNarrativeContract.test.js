// 職責：驗證 ACT 01 四段人話敘事與具體情境。
// 輸入：heroContent。
// 輸出：順序、內容與禁用空話契約。
import { describe, expect, it } from 'vitest';
import { heroContent } from '../src/lib/content/siteContent.js';

describe('ACT 01 人話敘事', () => {
  it('依需求、目標、難點、現況排列', () => {
    expect(heroContent.sections.map((section) => section.title)).toEqual(['客戶的需求', '我們的目標', '真正的難點', '先理解現況']);
  });
  it('使用 6 樓外部具體情境並銜接 ACT 02', () => {
    const content = heroContent.sections.flatMap((section) => section.paragraphs).join(' ');
    expect(content).toContain('6 樓外部施工範圍');
    expect(content).toContain('走一次目前的完整流程');
  });
  it('不含空泛展示文案', () => {
    const content = JSON.stringify(heroContent);
    expect(content).not.toContain('不是只做一個');
    expect(content).not.toContain('一次性的功能展示');
  });
});

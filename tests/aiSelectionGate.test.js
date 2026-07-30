// 職責：驗證 AI 未框選不得送出，框選後只回答目前 selection。
// 輸入：問題與 activeSelection。
// 輸出：送出閘門及可追溯展示回覆。
import { describe, expect, it } from 'vitest';
import { answerSelectionQuestion, canSubmitAiQuestion } from '../src/lib/domain/aiAssistant.js';

const selection = { id: 'selection-01', objectIds: ['a', 'b'], ignoredObjectIds: ['reference-01'], ignoredReason: '非標準圖層', drawingId: 'A-03', floor: '6F', area: '外部', version: 'Rev. B', drawingUnit: 'mm', isReady: true, segmentLengths: [1000, 2500] };

describe('AI 框選閘門', () => {
  it('沒有框選或空白問題不得送出', () => {
    expect(canSubmitAiQuestion('總長？', null)).toBe(false);
    expect(canSubmitAiQuestion('   ', selection)).toBe(false);
  });
  it('有效框選後回覆綁定 selection.id 並使用 cm', () => {
    const response = answerSelectionQuestion('目前總長是多少？', selection);
    expect(response.selectionId).toBe('selection-01');
    expect(response.message).toContain('350.00 cm');
    expect(response.sources.join(' ')).toContain('A-03');
    expect(response.sources.join(' ')).toContain('忽略：1 個');
  });
});

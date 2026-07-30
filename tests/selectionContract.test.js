// 職責：驗證 activeSelection 建立、準備狀態與失效規則。
// 輸入：有效及不完整框選資料。
// 輸出：不可變 selection 契約。
import { describe, expect, it } from 'vitest';
import { createActiveSelection, invalidateSelection, isSelectionReady } from '../src/lib/domain/selection.js';

const candidate = { id: 'selection-01', objectIds: ['line-01'], ignoredObjectIds: ['reference-01'], drawingUnit: 'mm', isReady: true };

describe('框選資料契約', () => {
  it('至少選到一個物件且單位可解析才建立', () => {
    const selection = createActiveSelection(candidate);
    expect(selection?.id).toBe('selection-01');
    expect(selection?.ignoredObjectIds).toEqual(['reference-01']);
    expect(Object.isFrozen(selection?.ignoredObjectIds)).toBe(true);
    expect(createActiveSelection({ ...candidate, objectIds: [] })).toBeNull();
  });
  it('失效後不得繼續啟用 AI', () => {
    const invalidSelection = invalidateSelection(createActiveSelection(candidate), 'drawing_changed');
    expect(isSelectionReady(invalidSelection)).toBe(false);
    expect(invalidSelection.invalidReason).toBe('drawing_changed');
  });
});

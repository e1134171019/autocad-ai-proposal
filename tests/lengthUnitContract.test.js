// 職責：驗證所有使用者可見長度統一使用 cm。
// 輸入：CAD 圖表、Docked Panel 與 AI 助理原始碼。
// 輸出：cm 顯示與未知單位阻擋契約。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('長度顯示單位', () => {
  it('圖面與面板透過 formatLengthCm 顯示', () => {
    expect(read('src/lib/charts/cadSimulator.js')).toContain('formatLengthCm');
    expect(read('src/lib/components/CadDockedPanel.svelte')).toContain('formatLengthCm');
  });
  it('AI 回覆透過 cm 格式函式產生', () => expect(read('src/lib/domain/aiAssistant.js')).toContain('formatLengthCm'));
});

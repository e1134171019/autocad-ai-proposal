// 職責：驗證九個現況節點、十二個 AI 步驟與五層上下文資料契約。
// 輸入：siteContent 對外常數。
// 輸出：符合 v5.9 提案規格的數量、順序與必要欄位。
import { describe, expect, it } from 'vitest';
import { currentFlowNodes, futureFlowSteps, intelligenceLayers, aiResponsibilities } from '../src/lib/content/siteContent.js';

describe('v5.9 提案內容契約', () => {
  it('現況流程固定九節點，AI 流程固定十二步', () => {
    expect(currentFlowNodes).toHaveLength(9);
    expect(futureFlowSteps).toHaveLength(12);
  });

  it('AI 上下文固定五層', () => {
    expect(intelligenceLayers).toHaveLength(5);
  });

  it('每個流程項目都有動畫類型', () => {
    expect([...currentFlowNodes, ...futureFlowSteps].every((step) => step.animType)).toBe(true);
  });

  it('系統方案保留外掛、自動化、框選與逐段整理能力', () => {
    const solutionText = futureFlowSteps
      .map((step) => `${step.label} ${step.desc}`)
      .join(' ');

    [
      '自動建立',
      '標準圖層',
      '外掛工具列',
      '不用手動切換圖層',
      '自動計算',
      '框選後',
      '自動編號'
    ].forEach((phrase) => expect(solutionText).toContain(phrase));

    expect(aiResponsibilities.join(' ')).toContain('自動分類加總');
  });
});

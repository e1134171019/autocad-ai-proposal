// 職責：驗證九個現況節點、十二個外掛步驟、五層上下文，以及 deterministic / AI assistant 責任分離。
// 輸入：siteContent 對外常數。
// 輸出：符合提案工程邊界的數量、順序與必要欄位。
import { describe, expect, it } from 'vitest';
import {
  currentFlowNodes,
  futureFlowSteps,
  intelligenceLayers,
  deterministicResponsibilities,
  assistantResponsibilities
} from '../src/lib/content/siteContent.js';

describe('提案內容契約', () => {
  it('現況流程固定九節點，外掛流程固定十二步', () => {
    expect(currentFlowNodes).toHaveLength(9);
    expect(futureFlowSteps).toHaveLength(12);
  });

  it('計算上下文固定五層', () => {
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
  });

  it('精確計算由 deterministic responsibilities 承擔', () => {
    const deterministicText = deterministicResponsibilities.join(' ');

    ['框選範圍', '標準圖層', '長度', '分類', '數量', '計算依據']
      .forEach((phrase) => expect(deterministicText).toContain(phrase));
  });

  it('AI assistant 只處理查詢、解釋、摘要與紀錄', () => {
    const assistantText = assistantResponsibilities.join(' ');

    ['查詢', '解釋', '摘要', '紀錄'].forEach((phrase) => expect(assistantText).toContain(phrase));
    expect(assistantText).not.toMatch(/取得各段長度|自動分類加總|換算.*數量/);
  });
});

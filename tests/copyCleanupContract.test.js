// 職責：鎖定現有提案文案清理結果；Copy Gate 不得再對主要內容來源報 finding，ACT 03 不得暗示未量測工時。
import fs from 'node:fs';
import { describe, expect, it } from 'vitest';
import { auditCopy } from '../src/lib/content/copyGate.js';
import { extractChineseSegments } from '../src/lib/content/copySourceExtractor.js';
import { benefits, futureFlowSteps, heroContent } from '../src/lib/content/siteContent.js';

const TARGETS = [
  'src/lib/content/siteContent.js',
  'src/lib/components/Act03Problem.svelte',
  'src/lib/components/Act05Intelligence.svelte',
  'src/lib/components/Act06Summary.svelte'
];

describe('proposal copy cleanup contract', () => {
  it('主要提案來源通過 Copy Gate，不留下既有 finding', () => {
    const findings = TARGETS.flatMap((path) => {
      const source = fs.readFileSync(path, 'utf8');
      return extractChineseSegments(source, { fileName: path })
        .flatMap((text) => auditCopy(text).map((finding) => ({ path, text, ...finding })));
    });

    expect(findings).toEqual([]);
  });

  it('ACT 03 只說明流程差異，不把動畫包裝成工時 benchmark', () => {
    const source = fs.readFileSync('src/lib/components/Act03Problem.svelte', 'utf8');

    expect(source).toContain('ACT 03 / WORKFLOW COMPARISON');
    expect(source).toContain('現行人工流程與外掛流程差異');
    expect(source).toContain('不代表實測工時');
    expect(source).toContain('實際工時差異仍需用同一張圖面、相同條件量測後確認');
    expect(source).not.toMatch(/TIME VARIANCE|平均工時|處理速度更快|更穩定|更接近平均值/);
  });

  it('模糊流程句改成具體行為', () => {
    expect(heroContent.sections[3].paragraphs).toContain('目前的作業流程從原始 CAD 圖面開始。');
    expect(futureFlowSteps.find((step) => step.id === 6)?.desc).not.toContain('進行作業');
    expect(futureFlowSteps.find((step) => step.id === 7)?.label).toBe('框選範圍定義本次計算區域');
    expect(futureFlowSteps.find((step) => step.id === 7)?.desc).not.toContain('進行分類');
  });

  it('效益改寫為可驗證的系統能力，不直接宣稱未量測成效', () => {
    expect(benefits).toEqual([
      '人工計算與複核集中在同一套流程',
      '漏算、重算與混算交由規則檢查',
      '圖面判讀依標準圖層與框選規則執行',
      '改圖後可重新執行分類與加總',
      '每筆結果保留計算依據',
      '規則可擴充至其他施工項目'
    ]);
  });
});

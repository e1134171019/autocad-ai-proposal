// 職責：鎖定使用者批准的 B2B 工業提案六章文案，同時保護 9/12 步流程與工程責任邊界。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { currentFlowNodes, futureFlowSteps, heroContent } from '../src/lib/content/siteContent.js';

const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

const act01 = read('src/lib/components/Act01Hero.svelte');
const act02 = read('src/lib/components/Act02Flow.svelte');
const act03 = read('src/lib/components/Act03Problem.svelte');
const act04 = read('src/lib/components/Act04Solution.svelte');
const act05 = read('src/lib/components/Act05Intelligence.svelte');
const act06 = read('src/lib/components/Act06Summary.svelte');
const affectedCopy = [act01, act02, act03, act04, act05, act06, JSON.stringify(heroContent.sections)].join('\n');

describe('B2B 工業提案 copy-only 契約', () => {
  it('使用批准的六章直述標題', () => {
    expect(act01).toContain('<h1>我們的提案</h1>');
    expect(act02).toContain('title="目前客戶的流程"');
    expect(act03).toContain('<h2 class="section-title">目前流程的問題</h2>');
    expect(act04).toContain('title="我們的解決方案"');
    expect(act05).toContain('<h2 class="section-title">系統計算方式與 AI 分工</h2>');
    expect(act06).toContain('<h2 class="section-title">專案效益與預期成果</h2>');
  });

  it('ACT01 用提案摘要說清楚人、程式與 AI 的責任', () => {
    expect(act01).toContain('程式負責計算，AI 助理負責結果查詢、解釋與摘要');
    expect(act01).toContain('繪圖 → 框選施工範圍 → 程式整理長度與數量 → AI 助理查詢 → 人員確認');
    expect(act01).toContain('計算前提');
    expect(act01).toContain('先確認本次要計算的樓層、區域與物件');
  });

  it('ACT01 四段支援內容改為 B2B 提案導向', () => {
    expect(heroContent.sections.map((section) => section.title)).toEqual([
      '客戶需求',
      '提案內容',
      '計算條件',
      '流程基準'
    ]);
    expect(heroContent.sections[0].paragraphs.join(' ')).toContain('每段長度');
    expect(heroContent.sections[2].paragraphs.join(' ')).toContain('標準圖層');
  });

  it('ACT02 與 ACT04 保留完整 9/12 步工程流程', () => {
    expect(currentFlowNodes).toHaveLength(9);
    expect(futureFlowSteps).toHaveLength(12);
    expect(currentFlowNodes[0].label).toBe('建商提供原始 CAD 圖面');
    expect(futureFlowSteps[3].desc).toContain('AI 不代替繪圖');
  });

  it('ACT03 與 ACT06 不把未量測效益寫成既成成果', () => {
    expect(act03).toContain('實際工時差異仍需用相同圖面與相同條件量測');
    expect(act06).toContain('目前沒有工時的前後量測數據');
    expect(act06).toContain('設計目標');
    expect(act06).not.toContain('實際節省的工時');
  });

  it('ACT04/05 保留程式計算與 AI 查詢解釋的責任邊界', () => {
    expect(act04).toContain('程式依圖層、CAD 物件與公司規則整理長度及數量');
    expect(act04).toContain('不代表 AutoCAD API／實際 DWG 整合已完成');
    expect(act05).toContain('C# 規則引擎負責篩選、分類、長度與數量計算');
    expect(act05).toContain('AI 助理只使用已完成的計算結果');
    expect(act05).toContain('最後仍由人員確認');
  });

  it('不使用使用者 Skill 指定的 B2B 禁用詞', () => {
    ['此外', '不僅如此', '值得注意的是', '無縫', '賦能', '深入探討', '不斷演變', '整合解決方案', '全方位', '卓越品質']
      .forEach((phrase) => expect(affectedCopy).not.toContain(phrase));
  });
});

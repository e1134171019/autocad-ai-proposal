// 職責：驗證 v5.9.3 ACT 04 人工繪製語意、關鍵字配色與 ACT 06 專案總結契約。
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { futureFlowSteps } from '../src/lib/content/siteContent.js';

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), 'utf-8');
const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]);

describe('v5.9.3 專案總結與 ACT 04 文案契約', () => {
  it('STEP 04 強調人工繪製，AI 只在完成後帶入長度與尺寸', () => {
    const step = futureFlowSteps[3];
    expect(step.desc).toContain('外部施工線與深井仍由繪圖人員依工程判斷逐段繪製');
    expect(step.desc).toContain('AI 不代替繪圖');
    expect(step.desc).toContain('自動讀取物件長度並帶入尺寸標註');
    expect(step.highlights).toEqual(expect.arrayContaining([
      { text: '逐段繪製', tone: 'manual' },
      { text: 'AI 不代替繪圖', tone: 'emphasis' },
      { text: '自動讀取物件長度並帶入尺寸標註', tone: 'ai' },
      { text: '標準圖層', tone: 'standard' }
    ]));
  });

  it('STEP 03～06 不把 AI 描述成代替繪圖人員', () => {
    const copy = futureFlowSteps.slice(2, 6).map((step) => `${step.label} ${step.desc}`).join(' ');
    expect(copy).toContain('繪圖人員確認施工位置');
    expect(copy).toContain('繪圖人員逐段完成');
    expect(copy).not.toContain('避免手動切換圖層與性質');
  });

  it('ACT 06 使用專案總結並完全移除舊 NEXT STEP CTA', () => {
    const summary = read('src/lib/components/Act06Summary.svelte');
    expect(summary).toContain('ACT 06 / PROJECT SUMMARY');
    expect(summary).toContain('工程經驗');
    expect(summary).toContain('規則化、標準化與系統化');
    expect(summary).toContain('把繪圖人員的工程經驗，轉成公司可以保存、團隊可以沿用、程式可以執行、AI 可以使用的標準作業系統。');
    expect(summary).not.toContain('NEXT STEP');
    expect(summary).not.toContain('準備好從一張代表性施工圖開始了嗎？');
    expect(summary).not.toContain('重新檢視現況流程');
  });

  it('所有前端原始碼都不含舊 CTA 文案', () => {
    const source = walk(resolve(root, 'src')).filter((path) => ['.svelte', '.js', '.css'].includes(extname(path))).map((path) => readFileSync(path, 'utf-8')).join('\n');
    expect(source).not.toContain('準備好從一張代表性施工圖開始了嗎？');
    expect(source).not.toContain('重新檢視現況流程');
  });
});

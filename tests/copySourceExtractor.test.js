// 職責：驗證 Copy Gate 能同時取得 JS 字串與 Svelte 畫面正文，不把 style/script 標記當文案。
import { describe, expect, it } from 'vitest';
import { extractChineseSegments } from '../src/lib/content/copySourceExtractor.js';

describe('Copy source extractor', () => {
  it('從 Svelte 畫面正文抓到成效 claim', () => {
    const source = `
      <script>const label = 'AI RESPONSIBILITIES';</script>
      <p class="section-lead">導入 AI 工具後，處理速度更快，每次作業所需時間也更穩定。</p>
      <style>.section-lead { color: red; }</style>
    `;

    const segments = extractChineseSegments(source, { extension: '.svelte' });

    expect(segments).toContain('導入 AI 工具後，處理速度更快，每次作業所需時間也更穩定。');
  });

  it('保留 Svelte script 內的中文字串', () => {
    const source = `<script>const title = '確認計算結果';</script><h2>{title}</h2>`;
    expect(extractChineseSegments(source, { extension: '.svelte' })).toContain('確認計算結果');
  });

  it('JS 檔只抽取實際中文字串', () => {
    const source = `const a = '降低人工計算時間'; const key = 'manual-inspect';`;
    expect(extractChineseSegments(source, { extension: '.js' })).toEqual(['降低人工計算時間']);
  });
});

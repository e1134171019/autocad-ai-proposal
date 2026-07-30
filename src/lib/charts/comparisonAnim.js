// 職責：動畫對比現況人工流程與導入後 AI 智能作業。
// 輸入：risks[{id,label}]、options。
// 輸出：void，直接操作 container SVG。
import * as d3 from 'd3';
import { readCssToken, readDuration } from './chartUtils.js';

/**
 * @param {HTMLElement} container
 * @param {Array<{id:number,label:string}>} risks
 * @param {object} options
 * @returns {void}
 */
export function renderComparison(container, risks, options) {
  if (!container) return;
  const width = 1040;
  const height = 350;
  const palette = {
    background: readCssToken(container, '--bg-subtle'),
    surface: readCssToken(container, '--bg-surface'),
    foreground: readCssToken(container, '--foreground'),
    secondary: readCssToken(container, '--text-secondary'),
    border: readCssToken(container, '--border'),
    primary: readCssToken(container, '--primary'),
    technical: readCssToken(container, '--technical'),
    danger: readCssToken(container, '--danger')
  };
  const slowDuration = readDuration(container, '--duration-slow');
  const fastDuration = readDuration(container, '--duration-fast');
  const svg = d3.select(container).selectAll('svg').data([risks]).join('svg')
    .attr('viewBox', `0 0 ${width} ${height}`).attr('role', 'img').attr('aria-label', '人工流程與 AI 智能作業比較');
  svg.selectAll('*').interrupt().remove();
  svg.append('rect').attr('width', width).attr('height', height).attr('fill', palette.background);
  svg.append('line').attr('x1', width / 2).attr('x2', width / 2).attr('y1', 30).attr('y2', 315).attr('stroke', palette.border);
  [['MANUAL PROCESS', 40, palette.danger], ['AI INTELLIGENT WORK', 560, palette.technical]].forEach(([label, x, color]) => {
    svg.append('text').attr('x', x).attr('y', 46).attr('fill', color).attr('font-weight', 600).text(label);
  });
  const manual = svg.append('g').attr('transform', 'translate(40,78)');
  const aiFlow = svg.append('g').attr('transform', 'translate(560,78)');
  ['讀取', '抄寫', '加總', '換算', '複核'].forEach((label, index) => {
    manual.append('text').attr('x', 0).attr('y', 28 + index * 48).attr('fill', palette.secondary).text(label);
    manual.append('rect').attr('x', 70).attr('y', 10 + index * 48).attr('height', 20).attr('width', 0).attr('fill', palette.danger)
      .transition().delay(index * slowDuration).duration(slowDuration).attr('width', 310 - index * 18);
  });
  ['AI 自動取得', 'AI 自動分類', 'AI 自動換算', 'AI 助理整理'].forEach((label, index) => {
    aiFlow.append('text').attr('x', 0).attr('y', 28 + index * 55).attr('fill', palette.secondary).text(label);
    aiFlow.append('rect').attr('x', 110).attr('y', 10 + index * 55).attr('height', 20).attr('width', 0).attr('fill', palette.technical)
      .transition().delay(index * fastDuration).duration(fastDuration).attr('width', 260);
  });
  aiFlow.append('text').attr('x', 0).attr('y', 256).attr('fill', palette.primary).text(`${risks.length} 類風險集中提示，結果可回到圖面確認`);
  manual.append('text').attr('x', 0).attr('y', 278).attr('fill', palette.danger).text('每次改圖，整段流程重新執行');
}

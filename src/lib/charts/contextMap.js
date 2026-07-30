// 職責：繪製 AI 判斷所需的五層圖面上下文。
// 輸入：layers[{id,label,desc,items[]}]、options。
// 輸出：可 hover 展開細項的淺色 D3 上下文圖。
import * as d3 from 'd3';
import { readCssToken, readDuration } from './chartUtils.js';

/**
 * @param {HTMLElement} container
 * @param {Array<{id:number,label:string,desc:string,items:string[]}>} layers
 * @param {object} options
 * @returns {void}
 */
export function renderContextMap(container, layers, options) {
  if (!container) return;
  const width = 640;
  const height = 520;
  const palette = {
    surface: readCssToken(container, '--bg-surface'), overlay: readCssToken(container, '--technical-subtle'),
    foreground: readCssToken(container, '--foreground'), secondary: readCssToken(container, '--text-secondary'),
    muted: readCssToken(container, '--text-muted'), border: readCssToken(container, '--border'),
    technical: readCssToken(container, '--technical')
  };
  const duration = readDuration(container, '--duration-fast');
  const svg = d3.select(container).selectAll('svg').data([layers]).join('svg').attr('viewBox', `0 0 ${width} ${height}`).attr('role', 'img').attr('aria-label', 'AI 圖面上下文五層結構');
  svg.selectAll('*').remove();
  svg.append('rect').attr('width', width).attr('height', height).attr('fill', palette.overlay);
  const layerGroups = svg.selectAll('g.context-layer').data(layers).join('g').attr('class', 'context-layer').attr('transform', (_, index) => `translate(${42 + index * 24},${38 + index * 88})`).style('cursor', 'default');
  layerGroups.append('rect').attr('width', (_, index) => 540 - index * 48).attr('height', 68).attr('rx', 4).attr('fill', palette.surface).attr('stroke', (_, index) => index === layers.length - 1 ? palette.technical : palette.border);
  layerGroups.append('text').attr('x', 18).attr('y', 28).attr('fill', palette.muted).text((layer) => `0${layer.id}`);
  layerGroups.append('text').attr('x', 64).attr('y', 28).attr('fill', palette.foreground).text((layer) => layer.label);
  layerGroups.append('text').attr('class', 'detail').attr('x', 64).attr('y', 51).attr('fill', palette.muted).text((layer) => layer.items.join(' / '));
  layerGroups.on('mouseenter', function () {
    d3.select(this).select('rect').transition().duration(duration).attr('stroke', palette.technical);
    d3.select(this).select('.detail').transition().duration(duration).attr('fill', palette.secondary);
  }).on('mouseleave', function (_, layer) {
    d3.select(this).select('rect').transition().duration(duration).attr('stroke', layer.id === layers.length ? palette.technical : palette.border);
    d3.select(this).select('.detail').transition().duration(duration).attr('fill', palette.muted);
  });
  svg.append('text').attr('x', 42).attr('y', 500).attr('fill', palette.foreground).text('DRAWING → CONTEXT → AI AUTOMATION → REPORT');
}

// 職責：繪製原生 AutoCAD 風格 Ribbon、淺灰工程模型空間、人工逐段標註、標準圖層、自動計算、結果面板與 AI 框選動畫。
// 輸入：流程資料、目前步驟、模式、selection callback 與階段 callback。
// 輸出：void，直接更新 container 內的 D3 + SVG。
import * as d3 from 'd3';
import { readCssToken, readDuration, readNumberToken } from './chartUtils.js';
import { convertLengthToCentimeters, formatLengthCm } from '$lib/domain/lengthCalculator.js';
import { isStandardLayerObject } from '$lib/domain/layerFilter.js';
import {
  futureExteriorSegments,
  manualExteriorSegments,
  manualShaftItems,
  shaftMatrixItems,
  standardShaftLayers
} from '$lib/content/siteContent.js';


function readTheme(container) {
  const token = (name) => readCssToken(container, name);
  return {
    canvas: token('--cad-canvas-background'), grid: token('--cad-canvas-grid'), chrome: token('--cad-chrome-background'),
    toolbar: token('--cad-toolbar-background'), command: token('--cad-command-background'), foreground: token('--cad-foreground'),
    secondary: token('--cad-secondary'), border: token('--cad-border'), building: token('--cad-building-primary'),
    buildingSecondary: token('--cad-building-secondary'), exterior: token('--cad-layer-exterior'), shaft: token('--cad-layer-shaft'),
    support: token('--cad-layer-support'), brace: token('--cad-layer-brace'), component: token('--cad-layer-component'), dimension: token('--cad-layer-dimension'),
    ignored: token('--cad-layer-ignored'), selection: token('--cad-selection'), selectionFill: token('--cad-selection-fill'),
    hover: token('--cad-hover'), grip: token('--cad-grip'), error: token('--cad-error'), font: token('--font-display'),
    cursorSize: readNumberToken(container, '--cad-cursor-size'), gripSize: readNumberToken(container, '--cad-grip-size'),
    buildingWidth: readNumberToken(container, '--cad-line-width-building'), hiddenWidth: readNumberToken(container, '--cad-line-width-hidden'),
    centerWidth: readNumberToken(container, '--cad-line-width-center'), dimensionWidth: readNumberToken(container, '--cad-line-width-dimension'),
    outline: readNumberToken(container, '--cad-line-width-outline'), construction: readNumberToken(container, '--cad-line-width-construction'),
    selected: readNumberToken(container, '--cad-line-width-selected'), labelSize: readNumberToken(container, '--cad-font-size-label'),
    valueSize: readNumberToken(container, '--cad-font-size-value'), dimensionSize: readNumberToken(container, '--cad-font-size-dimension'),
    hiddenType: token('--cad-linetype-hidden'), centerType: token('--cad-linetype-center'),
    hatchSpacing: readNumberToken(container, '--cad-hatch-spacing'), ribbonHeight: readNumberToken(container, '--cad-ribbon-height')
  };
}

function readDurations(container, mode) {
  const baseRate = Math.max(0.1, readNumberToken(container, '--cad-playback-rate') || 1);
  // ACT 04 全部動畫比目前版本加快 25%；ACT 02 維持既有 0.5× 節奏。
  const rate = mode === 'future' ? baseRate * 1.25 : baseRate;
  const scaled = (token) => readDuration(container, token) / rate;
  return {
    draw: scaled('--duration-cad-draw'), adjust: scaled('--duration-cad-adjust'), cursor: scaled('--duration-cad-cursor-move'),
    selection: scaled('--duration-cad-selection-drag'), feedback: scaled('--duration-cad-selection-feedback'),
    cell: scaled('--duration-cad-cell'), matrixScan: scaled('--duration-cad-matrix-scan'), matrixCell: scaled('--duration-cad-matrix-cell'),
    label: scaled('--duration-cad-label-reveal'), click: scaled('--duration-cad-click-feedback')
  };
}

function appendText(layer, x, y, text, color, size, weight = 400) {
  return layer.append('text').attr('x', x).attr('y', y).attr('fill', color).attr('font-size', size).attr('font-weight', weight).text(text);
}

function formatLength(raw, unit) {
  return formatLengthCm(convertLengthToCentimeters(raw, unit));
}

function drawGrid(svg, width, top, height, theme) {
  const grid = svg.append('g').attr('stroke', theme.grid).attr('stroke-width', theme.outline).attr('opacity', 0.72);
  d3.range(0, width, 20).forEach((x) => grid.append('line').attr('x1', x).attr('x2', x).attr('y1', top).attr('y2', top + height));
  d3.range(top, top + height, 20).forEach((y) => grid.append('line').attr('x1', 0).attr('x2', width).attr('y1', y).attr('y2', y));
}

function drawRibbonIcon(group, type, theme) {
  const icon = group.append('g').attr('transform', 'translate(16,5)').attr('fill', 'none').attr('stroke', theme.foreground).attr('stroke-width', 1.2);
  if (type === 'external') icon.append('path').attr('d', 'M1 19 L1 5 L13 5 L13 11 L24 11 L24 22 L8 22 L8 19 Z');
  else if (type === 'shaft') icon.append('rect').attr('x', 3).attr('y', 5).attr('width', 20).attr('height', 17);
  else if (type === 'matrix') [0, 1, 2].forEach((column) => [0, 1].forEach((row) => icon.append('rect').attr('x', 2 + column * 9).attr('y', 4 + row * 10).attr('width', 6).attr('height', 7)));
  else if (type === 'calculate') { icon.append('rect').attr('x', 2).attr('y', 4).attr('width', 22).attr('height', 19); icon.append('path').attr('d', 'M6 9 H20 M7 14 H10 M13 14 H16 M19 14 H22 M7 19 H10 M13 19 H16 M19 19 H22'); }
  else if (type === 'dimension' || type === 'leader') { icon.append('line').attr('x1', 2).attr('y1', 20).attr('x2', 24).attr('y2', 4); icon.append('path').attr('d', 'M2 20 L7 19 M2 20 L3 15 M24 4 L19 5 M24 4 L23 9'); }
  else if (type === 'update') icon.append('path').attr('d', 'M5 8 A9 9 0 1 1 4 18 M5 8 L5 2 M5 8 L11 8');
  else if (type === 'text') { appendText(icon, 6, 20, 'T', theme.foreground, 18, 600); }
  else icon.append('path').attr('d', 'M2 20 L8 6 L23 18');
}

function drawRibbon(svg, width, theme, mode) {
  const ribbon = svg.append('g').attr('data-region', 'ribbon');
  ribbon.append('rect').attr('width', width).attr('height', theme.ribbonHeight).attr('fill', theme.toolbar);
  ribbon.append('line').attr('x1', 0).attr('x2', width).attr('y1', 24).attr('y2', 24).attr('stroke', theme.border);
  const tabs = mode === 'future' ? ['常用', '插入', '註解', 'AI 智能作業'] : ['常用', '插入', '註解', '參數式'];
  tabs.forEach((tab, index) => {
    const active = mode === 'future' ? index === 3 : index === 0;
    appendText(ribbon, 16 + index * 64, 16, tab, active ? theme.foreground : theme.secondary, theme.labelSize, active ? 600 : 400);
    if (active) ribbon.append('line').attr('x1', 14 + index * 64).attr('x2', 66 + index * 64).attr('y1', 22).attr('y2', 22).attr('stroke', theme.selection).attr('stroke-width', 2);
  });
  const definitions = mode === 'future'
    ? [
        { id: 'external', label: '外部線' }, { id: 'shaft', label: '深井線' }, { id: 'matrix', label: '深井矩陣' },
        { id: 'dimension', label: '建立標示' }, { id: 'update', label: '更新標示' }, { id: 'calculate', label: '自動計算' }
      ]
    : [
        { id: 'polyline', label: '聚合線' }, { id: 'rectangle', label: '矩形' },
        { id: 'leader', label: '引線標註' }, { id: 'text', label: '文字標註' }
      ];
  const tools = {};
  definitions.forEach((tool, index) => {
    const x = 10 + index * 60;
    const group = ribbon.append('g').attr('data-tool', tool.id).attr('transform', `translate(${x},29)`);
    group.append('rect').attr('class', 'tool-background').attr('width', 54).attr('height', 48).attr('fill', theme.toolbar).attr('stroke', theme.border);
    drawRibbonIcon(group, tool.id, theme);
    appendText(group, 27, 42, tool.label, theme.foreground, theme.dimensionSize, 500).attr('text-anchor', 'middle');
    tools[tool.id] = { x: x + 27, y: 53 };
  });
  const layerX = Math.min(width - 172, 18 + definitions.length * 60);
  appendText(ribbon, layerX, 38, '圖層與性質', theme.secondary, theme.dimensionSize, 500);
  ribbon.append('rect').attr('x', layerX).attr('y', 44).attr('width', 150).attr('height', 22).attr('fill', theme.command).attr('stroke', theme.border);
  const layerValue = appendText(ribbon, layerX + 8, 59, mode === 'future' ? 'AI-SHAFT' : 'A-WALL', theme.foreground, theme.labelSize, 600);
  appendText(ribbon, layerX + 136, 59, '▼', theme.secondary, theme.dimensionSize);
  ribbon.append('rect').attr('x', layerX).attr('y', 68).attr('width', 72).attr('height', 17).attr('fill', theme.command).attr('stroke', theme.border);
  ribbon.append('rect').attr('x', layerX + 78).attr('y', 68).attr('width', 72).attr('height', 17).attr('fill', theme.command).attr('stroke', theme.border);
  appendText(ribbon, layerX + 8, 80, 'ByLayer', theme.secondary, theme.dimensionSize);
  appendText(ribbon, layerX + 86, 80, 'ByLayer', theme.secondary, theme.dimensionSize);
  return { group: ribbon, tools, layerValue, layerX };
}

function highlightTool(ribbon, toolId, theme) {
  ribbon.group.selectAll('[data-tool]').each(function () {
    const tool = d3.select(this);
    const active = tool.attr('data-tool') === toolId;
    tool.select('.tool-background').attr('fill', active ? theme.selectionFill : theme.toolbar).attr('stroke', active ? theme.selection : theme.border);
  });
}

function drawPointerCursor(svg, x, y, theme) {
  const cursor = svg.append('g').attr('data-cursor', 'pointer').attr('transform', `translate(${x},${y})`);
  cursor.append('path').attr('d', 'M0 0 L0 25 L6 19 L11 30 L16 28 L11 17 L21 17 Z').attr('fill', theme.foreground).attr('stroke', theme.command).attr('stroke-width', 1.5).attr('stroke-linejoin', 'round');
  return cursor;
}

function drawCrosshair(svg, x, y, theme) {
  const cursor = svg.append('g').attr('data-cursor', 'crosshair').attr('transform', `translate(${x},${y})`);
  cursor.append('line').attr('x1', -theme.cursorSize).attr('x2', theme.cursorSize).attr('stroke', theme.hover);
  cursor.append('line').attr('y1', -theme.cursorSize).attr('y2', theme.cursorSize).attr('stroke', theme.hover);
  cursor.append('rect').attr('x', -2).attr('y', -2).attr('width', 4).attr('height', 4).attr('fill', 'none').attr('stroke', theme.hover);
  return cursor;
}

function moveCursor(cursor, x, y, duration, callback) {
  cursor.transition().duration(duration).ease(d3.easeCubicInOut).attr('transform', `translate(${x},${y})`).on('end', callback ?? null);
}

function clickCursor(svg, cursor, x, y, theme, duration, callback) {
  const ripple = svg.append('circle').attr('cx', x).attr('cy', y).attr('r', 3).attr('fill', 'none').attr('stroke', theme.selection).attr('opacity', 1);
  ripple.transition().duration(duration).attr('r', 14).attr('opacity', 0).remove();
  cursor.transition().duration(duration / 2).attr('transform', `translate(${x},${y}) scale(.88)`).transition().duration(duration / 2).attr('transform', `translate(${x},${y}) scale(1)`).on('end', callback ?? null);
}

function planGeometry(width, modelTop, modelHeight) {
  return { x: width * 0.05, y: modelTop + modelHeight * 0.075, width: width * 0.86, height: modelHeight * 0.75 };
}

function buildingFootprintPoints(geometry) {
  const w = geometry.width; const h = geometry.height;
  return [[.07*w,.18*h],[.23*w,.18*h],[.23*w,.11*h],[.72*w,.11*h],[.72*w,.17*h],[.91*w,.17*h],[.91*w,.84*h],[.76*w,.84*h],[.76*w,.9*h],[.18*w,.9*h],[.18*w,.82*h],[.06*w,.82*h],[.06*w,.58*h],[.02*w,.58*h],[.02*w,.24*h],[.07*w,.24*h]];
}

function polygonSignedArea(points) {
  return points.reduce((area, point, index) => {
    const next = points[(index + 1) % points.length];
    return area + point[0] * next[1] - next[0] * point[1];
  }, 0) / 2;
}

function intersectLines(firstStart, firstEnd, secondStart, secondEnd) {
  const x1 = firstStart[0]; const y1 = firstStart[1]; const x2 = firstEnd[0]; const y2 = firstEnd[1];
  const x3 = secondStart[0]; const y3 = secondStart[1]; const x4 = secondEnd[0]; const y4 = secondEnd[1];
  const denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  if (Math.abs(denominator) < 1e-8) return firstEnd;
  const determinantA = x1 * y2 - y1 * x2; const determinantB = x3 * y4 - y3 * x4;
  return [
    (determinantA * (x3 - x4) - (x1 - x2) * determinantB) / denominator,
    (determinantA * (y3 - y4) - (y1 - y2) * determinantB) / denominator
  ];
}

function offsetClosedPolygon(points, distance) {
  const orientation = polygonSignedArea(points) >= 0 ? 1 : -1;
  const shiftedEdges = points.map((point, index) => {
    const next = points[(index + 1) % points.length];
    const dx = next[0] - point[0]; const dy = next[1] - point[1]; const length = Math.hypot(dx, dy) || 1;
    const normal = orientation > 0 ? [dy / length, -dx / length] : [-dy / length, dx / length];
    return [
      [point[0] + normal[0] * distance, point[1] + normal[1] * distance],
      [next[0] + normal[0] * distance, next[1] + normal[1] * distance]
    ];
  });
  const offsetPoints = shiftedEdges.map((edge, index) => {
    const previous = shiftedEdges[(index - 1 + shiftedEdges.length) % shiftedEdges.length];
    return intersectLines(previous[0], previous[1], edge[0], edge[1]);
  });
  return [...offsetPoints, offsetPoints[0]];
}

function externalPolylinePoints(geometry) {
  const visualOffset = Math.max(9, Math.min(geometry.width, geometry.height) * .028);
  return offsetClosedPolygon(buildingFootprintPoints(geometry), visualOffset);
}

function pointsToPath(points) {
  const [first, ...rest] = points;
  return rest.reduce((path, [x, y]) => `${path} L ${x} ${y}`, `M ${first[0]} ${first[1]}`);
}

function drawNativeCadPlan(svg, geometry, theme) {
  const hatchId = `cad-wall-hatch-${Math.round(geometry.width)}-${Math.round(geometry.height)}`;
  const pattern = svg.append('defs').append('pattern').attr('id', hatchId).attr('patternUnits', 'userSpaceOnUse')
    .attr('width', theme.hatchSpacing).attr('height', theme.hatchSpacing).attr('patternTransform', 'rotate(45)');
  pattern.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', theme.hatchSpacing).attr('stroke', theme.buildingSecondary).attr('stroke-width', theme.hiddenWidth);
  const plan = svg.append('g').attr('transform', `translate(${geometry.x},${geometry.y})`).attr('data-layer', 'BUILDING-BASE');
  const solid = plan.append('g').attr('data-linetype', 'solid').attr('fill', 'none').attr('stroke', theme.building).attr('stroke-width', theme.buildingWidth);
  const hidden = plan.append('g').attr('data-linetype', 'hidden').attr('fill', 'none').attr('stroke', theme.buildingSecondary).attr('stroke-width', theme.hiddenWidth).attr('stroke-dasharray', theme.hiddenType);
  const center = plan.append('g').attr('data-linetype', 'center').attr('fill', 'none').attr('stroke', theme.buildingSecondary).attr('stroke-width', theme.centerWidth).attr('stroke-dasharray', theme.centerType);
  const hatch = plan.append('g').attr('data-linetype', 'hatch').attr('stroke', theme.building).attr('stroke-width', theme.buildingWidth);
  solid.append('path').attr('d', `${pointsToPath([...buildingFootprintPoints(geometry), buildingFootprintPoints(geometry)[0]])} Z`);
  solid.append('rect').attr('x', geometry.width*.08).attr('y', geometry.height*.25).attr('width', geometry.width*.8).attr('height', geometry.height*.53);
  [0.26,0.48,0.7].forEach((ratio)=>solid.append('line').attr('x1',geometry.width*ratio).attr('x2',geometry.width*ratio).attr('y1',geometry.height*.18).attr('y2',geometry.height*.82));
  [0.43,0.66].forEach((ratio)=>solid.append('line').attr('x1',geometry.width*.06).attr('x2',geometry.width*.91).attr('y1',geometry.height*ratio).attr('y2',geometry.height*ratio));
  [[.19,.18,.035,.25],[.47,.43,.035,.23],[.68,.18,.035,.25],[.06,.62,.2,.04],[.7,.62,.21,.04]].forEach(([x,y,w,h])=>hatch.append('rect').attr('x',geometry.width*x).attr('y',geometry.height*y).attr('width',geometry.width*w).attr('height',geometry.height*h).attr('fill',`url(#${hatchId})`));
  hidden.append('rect').attr('x',geometry.width*.31).attr('y',geometry.height*.2).attr('width',geometry.width*.12).attr('height',geometry.height*.12);
  hidden.append('rect').attr('x',geometry.width*.55).attr('y',geometry.height*.69).attr('width',geometry.width*.12).attr('height',geometry.height*.1);
  hidden.append('path').attr('d',`M ${geometry.width*.08} ${geometry.height*.55} H ${geometry.width*.23} M ${geometry.width*.72} ${geometry.height*.47} H ${geometry.width*.89}`);
  center.append('line').attr('x1',geometry.width*.5).attr('x2',geometry.width*.5).attr('y1',geometry.height*.03).attr('y2',geometry.height*.96);
  center.append('line').attr('x1',geometry.width*.01).attr('x2',geometry.width*.98).attr('y1',geometry.height*.5).attr('y2',geometry.height*.5);
  [0.14,0.37,0.6,0.83].forEach((ratio,index)=>{ center.append('line').attr('x1',geometry.width*ratio).attr('x2',geometry.width*ratio).attr('y1',geometry.height*.05).attr('y2',geometry.height*.94); appendText(plan,geometry.width*ratio,geometry.height*.035,String(index+1),theme.buildingSecondary,theme.dimensionSize,500).attr('text-anchor','middle'); });
  [0.12,0.34,0.57,0.79].forEach((ratio)=>solid.append('rect').attr('x',geometry.width*ratio).attr('y',geometry.height*.72).attr('width',geometry.width*.08).attr('height',geometry.height*.1));
  appendText(plan,geometry.width*.045,geometry.height*.965,'建築底圖｜實線／隱藏線／中心線／45° HATCH',theme.building,theme.dimensionSize,500);
  return plan;
}

function shaftLayout(geometry) {
  return { left: geometry.width*.13, top: geometry.height*.25, width: geometry.width*.11, height: geometry.height*.14, columnGap: geometry.width*.19, rowGap: geometry.height*.31 };
}
function shaftPosition(layout,item){ return { x:layout.left+item.column*layout.columnGap,y:layout.top+item.row*layout.rowGap,width:layout.width,height:layout.height }; }

function drawGrips(layer, points, theme) {
  points.forEach(([x,y])=>layer.append('rect').attr('x',x-theme.gripSize/2).attr('y',y-theme.gripSize/2).attr('width',theme.gripSize).attr('height',theme.gripSize).attr('fill',theme.grip).attr('stroke',theme.canvas));
}

function drawHorizontalDimension(layer, x1, x2, dimensionY, baseY, text, theme, opacity=1) {
  const startX = Math.min(x1, x2); const endX = Math.max(x1, x2); const group = layer.append('g').attr('data-layer', 'AI-DIM').attr('data-dimension-orientation', 'horizontal').attr('data-text-orientation', 'horizontal').attr('opacity', opacity);
  if (Number.isFinite(baseY)) {
    group.append('line').attr('x1', startX).attr('x2', startX).attr('y1', baseY).attr('y2', dimensionY).attr('stroke', theme.dimension).attr('stroke-width', theme.dimensionWidth);
    group.append('line').attr('x1', endX).attr('x2', endX).attr('y1', baseY).attr('y2', dimensionY).attr('stroke', theme.dimension).attr('stroke-width', theme.dimensionWidth);
  }
  group.append('line').attr('x1', startX).attr('x2', endX).attr('y1', dimensionY).attr('y2', dimensionY).attr('stroke', theme.dimension).attr('stroke-width', theme.dimensionWidth);
  const arrowSize = 7;
  group.append('path').attr('d', `M ${startX} ${dimensionY} L ${startX + arrowSize} ${dimensionY - 3} L ${startX + arrowSize} ${dimensionY + 3} Z`).attr('fill', theme.dimension);
  group.append('path').attr('d', `M ${endX} ${dimensionY} L ${endX - arrowSize} ${dimensionY - 3} L ${endX - arrowSize} ${dimensionY + 3} Z`).attr('fill', theme.dimension);
  const label = appendText(group, (startX + endX) / 2, dimensionY - 6, text, theme.dimension, theme.dimensionSize, 600).attr('text-anchor', 'middle');
  return { group, label };
}

function drawVerticalDimension(layer, y1, y2, dimensionX, baseX, text, theme, opacity=1, textSide=1) {
  const startY = Math.min(y1, y2); const endY = Math.max(y1, y2);
  const group = layer.append('g').attr('data-layer', 'AI-DIM').attr('data-dimension-orientation', 'vertical').attr('data-text-orientation', 'horizontal').attr('opacity', opacity);
  group.append('line').attr('x1', baseX).attr('x2', dimensionX).attr('y1', startY).attr('y2', startY).attr('stroke', theme.dimension).attr('stroke-width', theme.dimensionWidth);
  group.append('line').attr('x1', baseX).attr('x2', dimensionX).attr('y1', endY).attr('y2', endY).attr('stroke', theme.dimension).attr('stroke-width', theme.dimensionWidth);
  group.append('line').attr('x1', dimensionX).attr('x2', dimensionX).attr('y1', startY).attr('y2', endY).attr('stroke', theme.dimension).attr('stroke-width', theme.dimensionWidth);
  const arrowSize = 7;
  group.append('path').attr('d', `M ${dimensionX} ${startY} L ${dimensionX - 3} ${startY + arrowSize} L ${dimensionX + 3} ${startY + arrowSize} Z`).attr('fill', theme.dimension);
  group.append('path').attr('d', `M ${dimensionX} ${endY} L ${dimensionX - 3} ${endY - arrowSize} L ${dimensionX + 3} ${endY - arrowSize} Z`).attr('fill', theme.dimension);
  const labelX = dimensionX + textSide * 7;
  const label = appendText(group, labelX, (startY + endY) / 2 + 3, text, theme.dimension, theme.dimensionSize, 600)
    .attr('text-anchor', textSide > 0 ? 'start' : 'end');
  return { group, label };
}

function exteriorSegmentDefinitions(geometry) {
  const points = externalPolylinePoints(geometry);
  return futureExteriorSegments.map((metadata, index) => {
    const start = points[index]; const end = points[index + 1];
    const horizontal = Math.abs(end[0] - start[0]) >= Math.abs(end[1] - start[1]);
    const midpoint = [(start[0] + end[0]) / 2, (start[1] + end[1]) / 2];
    const outwardSign = horizontal ? (midpoint[1] < geometry.height / 2 ? -1 : 1) : (midpoint[0] < geometry.width / 2 ? -1 : 1);
    const stagger = 15 + (index % 3) * 7;
    return {
      ...metadata,
      index,
      start,
      end,
      horizontal,
      outwardSign,
      dimensionOffset: stagger
    };
  });
}

function drawSegmentDimension(layer, segment, theme, opacity=1) {
  const text = `長度=${formatLength(segment.rawLength, segment.drawingUnit)}`;
  if (segment.horizontal) {
    const dimensionY = segment.start[1] + segment.outwardSign * segment.dimensionOffset;
    return drawHorizontalDimension(layer, segment.start[0], segment.end[0], dimensionY, segment.start[1], text, theme, opacity);
  }
  const dimensionX = segment.start[0] + segment.outwardSign * segment.dimensionOffset;
  return drawVerticalDimension(layer, segment.start[1], segment.end[1], dimensionX, segment.start[0], text, theme, opacity, segment.outwardSign);
}

function drawExteriorSegments(plan, geometry, theme, { dimensions = false, dimensionOpacity = 1, opacity = 1 } = {}) {
  return exteriorSegmentDefinitions(geometry).map((segment) => {
    const path = plan.append('path')
      .attr('id', segment.objectId)
      .attr('data-segment', segment.id)
      .attr('d', pointsToPath([segment.start, segment.end]))
      .attr('fill', 'none')
      .attr('stroke', theme.exterior)
      .attr('stroke-width', theme.construction)
      .attr('opacity', opacity);
    const dimension = dimensions ? drawSegmentDimension(plan, segment, theme, dimensionOpacity) : null;
    return { segment, path, dimension };
  });
}

function drawOffsetDimension(plan,geometry,theme){
  const x=geometry.width*.43; const innerY=geometry.height*.11; const outerY=innerY-Math.max(9,Math.min(geometry.width,geometry.height)*.028);
  const group=plan.append('g').attr('data-layer','OFFSET-DIM').attr('stroke',theme.dimension).attr('fill','none').attr('stroke-width',theme.dimensionWidth);
  group.append('line').attr('x1',x).attr('x2',x).attr('y1',innerY).attr('y2',outerY);
  group.append('path').attr('d',`M ${x} ${innerY} l -3 -6 h 6 Z M ${x} ${outerY} l -3 6 h 6 Z`).attr('fill',theme.dimension);
  appendText(plan,x+8,(innerY+outerY)/2+3,'30 cm',theme.dimension,theme.dimensionSize,600);
}

function drawShafts(plan,geometry,theme,includeIgnored=true){
  const layout=shaftLayout(geometry); const shapes=[];
  shaftMatrixItems.forEach((item)=>{
    if(!includeIgnored && !isStandardLayerObject(item,standardShaftLayers)) return;
    const p=shaftPosition(layout,item); const accepted=isStandardLayerObject(item,standardShaftLayers);
    const shape=plan.append('rect').attr('id',accepted?`shaft-${item.id}`:`ignored-shaft-${item.id}`).attr('x',p.x).attr('y',p.y).attr('width',p.width).attr('height',p.height).attr('fill','none').attr('stroke',accepted?theme.shaft:theme.ignored).attr('stroke-width',accepted?theme.construction:theme.outline).attr('stroke-dasharray',accepted?null:theme.hiddenType);
    shapes.push({item,shape,position:p,accepted});
  });
  return shapes;
}

function drawSemanticLayers(plan,geometry,theme,options={}){
  const exteriorSegments = drawExteriorSegments(plan, geometry, theme, {
    dimensions: Boolean(options.dimensions),
    dimensionOpacity: options.dimensionOpacity ?? 1
  });
  const exterior = exteriorSegments.length ? exteriorSegments[0].path : null;
  const shafts=drawShafts(plan,geometry,theme,options.includeIgnored!==false);
  if(options.dimensions){
    shafts.filter((x)=>x.accepted).forEach(({item,position})=>{
      drawHorizontalDimension(plan, position.x, position.x + position.width, position.y + position.height + 18, position.y + position.height, `長度=${formatLength(item.rawLength,item.drawingUnit)}`, theme, options.dimensionOpacity??1);
    });
  }
  const braces = options.braces ? drawBraceElements(plan, geometry, theme, { showNumbers: false }) : null;
  return {exterior,exteriorSegments,shafts,braces};
}

function drawZones(plan,geometry,theme){
  plan.append('path').attr('d',pointsToPath(externalPolylinePoints(geometry))).attr('fill','none').attr('stroke',theme.exterior).attr('stroke-dasharray','6,4');
  const first=shaftPosition(shaftLayout(geometry),shaftMatrixItems[0]);
  plan.append('rect').attr('x',first.x).attr('y',first.y).attr('width',first.width).attr('height',first.height).attr('fill','none').attr('stroke',theme.shaft).attr('stroke-dasharray','4,3');
  appendText(plan,4,-12,'外部施工範圍',theme.exterior,theme.labelSize,600); appendText(plan,first.x,first.y-8,'深井',theme.shaft,theme.labelSize,600);
}

function typeText(label,content,duration,onComplete){ let index=0; const write=()=>{ index+=1; label.text(content.slice(0,index)); if(index<content.length) globalThis.setTimeout(write,duration); else onComplete?.(); }; write(); }

function animatePathWithCursor(path,cursor,absolutePoints,duration,onComplete){
  const length=path.node()?.getTotalLength()??1; path.attr('stroke-dasharray',`${length} ${length}`).attr('stroke-dashoffset',length).transition().duration(duration*3).ease(d3.easeLinear).attr('stroke-dashoffset',0);
  const per=Math.max(160,Math.round(duration*3/Math.max(1,absolutePoints.length-1))); const walk=(i)=>{ if(i>=absolutePoints.length)return onComplete?.(); moveCursor(cursor,absolutePoints[i][0],absolutePoints[i][1],per,()=>walk(i+1)); }; walk(0);
}

function animateRectangle(rect,cursor,start,end,duration,onComplete){
  rect.attr('x',start[0]).attr('y',start[1]).attr('width',0).attr('height',0).attr('opacity',1);
  moveCursor(cursor,start[0],start[1],duration,()=>{ rect.transition().duration(duration*1.7).attr('width',end[0]-start[0]).attr('height',end[1]-start[1]); moveCursor(cursor,end[0],end[1],duration*1.7,onComplete); });
}

function animateLineSegment(path,cursor,start,end,duration,onComplete){
  const length=Math.hypot(end[0]-start[0],end[1]-start[1])||1;
  path.attr('stroke-dasharray',`${length} ${length}`).attr('stroke-dashoffset',length);
  moveCursor(cursor,start[0],start[1],Math.max(90,duration*.35),()=>{
    path.transition().duration(duration).ease(d3.easeLinear).attr('stroke-dashoffset',0);
    moveCursor(cursor,end[0],end[1],duration,onComplete);
  });
}

function runExteriorSegmentSequence(container,svg,plan,geometry,theme,durations,options,renderId,cursor,onComplete,index=0){
  const segments=exteriorSegmentDefinitions(geometry);
  if(container.dataset.cadRenderId!==renderId)return;
  if(index>=segments.length){ onComplete?.(); return; }
  const segment=segments[index];
  const path=plan.append('path')
    .attr('id',segment.objectId)
    .attr('data-segment',segment.id)
    .attr('d',pointsToPath([segment.start,segment.end]))
    .attr('fill','none').attr('stroke',theme.exterior).attr('stroke-width',theme.construction);
  const start=[geometry.x+segment.start[0],geometry.y+segment.start[1]];
  const end=[geometry.x+segment.end[0],geometry.y+segment.end[1]];
  options.onAutoStageChange?.({phase:'external-segment',title:`完成 ${segment.id}`,command:'AI_EXTERNAL',layer:'AI-EXTERIOR',current:segment.id,externalIndex:index+1,externalCount:segments.length,length:formatLength(segment.rawLength,segment.drawingUnit)});
  animateLineSegment(path,cursor,start,end,durations.draw*.42,()=>{
    const dimension=drawSegmentDimension(plan,segment,theme,0);
    dimension.group.transition().duration(durations.label*.65).attr('opacity',1).on('end',()=>{
      globalThis.setTimeout(()=>runExteriorSegmentSequence(container,svg,plan,geometry,theme,durations,options,renderId,cursor,onComplete,index+1),durations.feedback*.3);
    });
  });
}

function runShaftDrawSequence(container,svg,plan,geometry,theme,durations,options,renderId,cursor,onComplete,items=null,index=0){
  const sourceItems=items??shaftMatrixItems.filter((item)=>isStandardLayerObject(item,standardShaftLayers));
  if(container.dataset.cadRenderId!==renderId)return;
  if(index>=sourceItems.length){ onComplete?.(); return; }
  const item=sourceItems[index]; const layout=shaftLayout(geometry); const position=shaftPosition(layout,item);
  const accepted=isStandardLayerObject(item,standardShaftLayers);
  const start=[geometry.x+position.x,geometry.y+position.y]; const end=[start[0]+position.width,start[1]+position.height];
  const draft=svg.append('rect').attr('fill','none').attr('stroke',accepted?theme.shaft:theme.ignored).attr('stroke-width',accepted?theme.construction:theme.outline).attr('stroke-dasharray',accepted?null:theme.hiddenType);
  options.onAutoStageChange?.({phase:accepted?'shaft-segment':'ignored',title:accepted?`完成深井 ${item.id}`:'非標準圖層不標示',command:accepted?'AI_SHAFT':'AI_LAYER_FILTER',layer:item.layer,current:item.id,shaftIndex:index+1,shaftCount:sourceItems.length});
  animateRectangle(draft,cursor,start,end,durations.draw*.34,()=>{
    draft.remove();
    const shape=plan.append('rect').attr('x',position.x).attr('y',position.y).attr('width',position.width).attr('height',position.height).attr('fill','none').attr('stroke',accepted?theme.shaft:theme.ignored).attr('stroke-width',accepted?theme.construction:theme.outline).attr('stroke-dasharray',accepted?null:theme.hiddenType);
    if(accepted){
      const dimension=drawHorizontalDimension(plan,position.x,position.x+position.width,position.y+position.height+18,position.y+position.height,`長度=${formatLength(item.rawLength,item.drawingUnit)}`,theme,0);
      dimension.group.transition().duration(durations.label*.65).attr('opacity',1);
    } else {
      appendText(plan,position.x+position.width/2,position.y+position.height/2,item.layer,theme.ignored,theme.dimensionSize,600).attr('text-anchor','middle');
    }
    globalThis.setTimeout(()=>runShaftDrawSequence(container,svg,plan,geometry,theme,durations,options,renderId,cursor,onComplete,sourceItems,index+1),durations.feedback*.45);
  });
}

function drawGuidedDrawScene(container,svg,plan,geometry,theme,durations,ribbon,options,renderId){
  drawBraceElements(plan,geometry,theme,{showNumbers:false});
  const pointer=drawPointerCursor(svg,ribbon.tools.external.x+80,ribbon.tools.external.y,theme);
  options.onAutoStageChange?.({phase:'guided-idle',title:'施工位置已確認',command:'DRAW_READY',layer:'AI-EXTERIOR'});
  moveCursor(pointer,ribbon.tools.external.x,ribbon.tools.external.y,durations.cursor*.65,()=>clickCursor(svg,pointer,ribbon.tools.external.x,ribbon.tools.external.y,theme,durations.click,()=>{
    highlightTool(ribbon,'external',theme); ribbon.layerValue.text('AI-EXTERIOR'); pointer.attr('opacity',0);
    const cross=drawCrosshair(svg,ribbon.tools.external.x,ribbon.tools.external.y,theme);
    runExteriorSegmentSequence(container,svg,plan,geometry,theme,durations,options,renderId,cross,()=>{
      cross.remove(); drawOffsetDimension(plan,geometry,theme); pointer.attr('opacity',1);
      moveCursor(pointer,ribbon.tools.shaft.x,ribbon.tools.shaft.y,durations.cursor*.65,()=>clickCursor(svg,pointer,ribbon.tools.shaft.x,ribbon.tools.shaft.y,theme,durations.click,()=>{
        highlightTool(ribbon,'shaft',theme); ribbon.layerValue.text('AI-SHAFT'); pointer.attr('opacity',0);
        const cross2=drawCrosshair(svg,ribbon.tools.shaft.x,ribbon.tools.shaft.y,theme);
        runShaftDrawSequence(container,svg,plan,geometry,theme,durations,options,renderId,cross2,()=>{
          cross2.remove(); pointer.attr('opacity',1);
          options.onAutoStageChange?.({phase:'guided-complete',title:'外部各段與多個深井已逐一完成',command:'DRAW_COMPLETE',layer:'AI-DIM',externalTotal:'1,000.00 cm',shaftTotal:'600.00 cm'});
        });
      }));
    });
  }));
}

function manualSceneItems(geometry){
  const allExterior = exteriorSegmentDefinitions(geometry);
  const selectedIndexes = [0, 2, 4, 5, 8];
  const exterior = selectedIndexes.map((segmentIndex,index)=>({
    type:'外部',
    id:manualExteriorSegments[index].id,
    lengthCm:manualExteriorSegments[index].lengthCm,
    segment:{...allExterior[segmentIndex], rawLength:manualExteriorSegments[index].lengthCm/100, drawingUnit:'m'}
  }));
  const layout=shaftLayout(geometry);
  const accepted=shaftMatrixItems.filter((x)=>isStandardLayerObject(x,standardShaftLayers)).slice(0,4);
  const shafts=accepted.map((item,index)=>{
    const rect=shaftPosition(layout,item);
    return {type:'深井',id:manualShaftItems[index].id,lengthCm:100,rect};
  });
  return [...exterior,...shafts];
}

function drawManualBase(plan,geometry,theme){
  plan.append('path')
    .attr('data-layer','MANUAL-EXTERIOR-GUIDE')
    .attr('d',pointsToPath(externalPolylinePoints(geometry)))
    .attr('fill','none')
    .attr('stroke',theme.exterior)
    .attr('stroke-width',theme.outline)
    .attr('stroke-dasharray','5,4')
    .attr('opacity',.35);
  const items=manualSceneItems(geometry);
  items.forEach((item)=>{
    if(item.segment){
      plan.append('path')
        .attr('data-segment',item.id)
        .attr('d',pointsToPath([item.segment.start,item.segment.end]))
        .attr('fill','none')
        .attr('stroke',theme.exterior)
        .attr('stroke-width',theme.construction);
    } else {
      plan.append('rect')
        .attr('x',item.rect.x).attr('y',item.rect.y)
        .attr('width',item.rect.width).attr('height',item.rect.height)
        .attr('fill','none').attr('stroke',theme.shaft).attr('stroke-width',theme.construction);
    }
  });
  return items;
}

function drawManualConstructionScene(container,svg,plan,geometry,theme,durations,options,renderId){
  plan.append('path').attr('d',pointsToPath(externalPolylinePoints(geometry))).attr('fill','none').attr('stroke',theme.exterior).attr('stroke-width',theme.outline).attr('stroke-dasharray','5,4').attr('opacity',.28);
  const items=manualSceneItems(geometry); const cursor=drawCrosshair(svg,geometry.x+15,geometry.y+15,theme); let index=0;
  const next=()=>{
    if(container.dataset.cadRenderId!==renderId)return;
    if(index>=items.length){ cursor.remove(); options.onManualStageChange?.({phase:'draw-complete',current:'外部 5 段／深井 4 個',command:'PLINE／RECTANG'}); return; }
    const item=items[index++];
    if(item.segment){
      const path=plan.append('path').attr('d',pointsToPath([item.segment.start,item.segment.end])).attr('fill','none').attr('stroke',theme.exterior).attr('stroke-width',theme.construction);
      const start=[geometry.x+item.segment.start[0],geometry.y+item.segment.start[1]]; const end=[geometry.x+item.segment.end[0],geometry.y+item.segment.end[1]];
      options.onManualStageChange?.({phase:'draw',current:item.id,command:'PLINE'});
      animateLineSegment(path,cursor,start,end,durations.draw*.5,()=>globalThis.setTimeout(next,durations.feedback*.45));
    } else {
      const start=[geometry.x+item.rect.x,geometry.y+item.rect.y]; const end=[start[0]+item.rect.width,start[1]+item.rect.height];
      const draft=svg.append('rect').attr('fill','none').attr('stroke',theme.shaft).attr('stroke-width',theme.construction);
      options.onManualStageChange?.({phase:'draw',current:item.id,command:'RECTANG'});
      animateRectangle(draft,cursor,start,end,durations.draw*.4,()=>{ draft.remove(); plan.append('rect').attr('x',item.rect.x).attr('y',item.rect.y).attr('width',item.rect.width).attr('height',item.rect.height).attr('fill','none').attr('stroke',theme.shaft).attr('stroke-width',theme.construction); globalThis.setTimeout(next,durations.feedback*.45); });
    }
  };
  next();
}

function drawManualInspectScene(svg,plan,geometry,theme,durations,options){
  const items=drawManualBase(plan,geometry,theme);
  const pointer=drawPointerCursor(svg,geometry.x+20,geometry.y+20,theme);
  const sequence=items.slice(0,5); let index=0;
  const next=()=>{
    if(index>=sequence.length)return options.onManualStageChange?.({phase:'inspect-complete',current:'5 個外部線段'});
    const item=sequence[index++];
    const target=item.segment?item.segment.start:[item.rect.x+item.rect.width/2,item.rect.y+item.rect.height/2];
    const abs=[geometry.x+target[0],geometry.y+target[1]];
    moveCursor(pointer,abs[0],abs[1],durations.cursor,()=>clickCursor(svg,pointer,abs[0],abs[1],theme,durations.click,()=>{
      options.onManualStageChange?.({phase:'inspect',current:item.id,length:`${item.lengthCm.toFixed(2)} cm`,command:'PROPERTIES'});
      globalThis.setTimeout(next,durations.feedback*1.8);
    }));
  };
  options.onManualStageChange?.({phase:'idle'}); next();
}

function drawManualItemDimension(plan,item,theme,opacity=1){
  if(item.segment) return drawSegmentDimension(plan,item.segment,theme,opacity);
  return drawHorizontalDimension(plan,item.rect.x,item.rect.x+item.rect.width,item.rect.y+item.rect.height+18,item.rect.y+item.rect.height,`長度=${item.lengthCm.toFixed(2)} cm`,theme,opacity);
}

function drawManualLabelScene(container,svg,plan,geometry,theme,durations,ribbon,options,renderId){
  const items=drawManualBase(plan,geometry,theme);
  const pointer=drawPointerCursor(svg,geometry.x+20,geometry.y+20,theme);
  let index=0; const exteriorValues=[]; const shaftValues=[];
  const advance=()=>{
    if(container.dataset.cadRenderId!==renderId)return;
    if(index>=items.length){
      options.onManualStageChange?.({phase:'complete',current:'全部逐段標註完成',formula:`外部 ${exteriorValues.join('＋')}；內部 ${shaftValues.join('＋')}`});
      return;
    }
    const item=items[index++];
    const target=item.segment?item.segment.end:[item.rect.x+item.rect.width,item.rect.y+item.rect.height];
    const abs=[geometry.x+target[0],geometry.y+target[1]];
    moveCursor(pointer,abs[0],abs[1],durations.cursor*.65,()=>clickCursor(svg,pointer,abs[0],abs[1],theme,durations.click,()=>{
      options.onManualStageChange?.({phase:'selected',current:item.id,length:`${item.lengthCm.toFixed(2)} cm`,command:'PROPERTIES'});
      highlightTool(ribbon,'leader',theme);
      moveCursor(pointer,ribbon.tools.leader.x,ribbon.tools.leader.y,durations.cursor*.65,()=>clickCursor(svg,pointer,ribbon.tools.leader.x,ribbon.tools.leader.y,theme,durations.click,()=>{
        options.onManualStageChange?.({phase:'label',current:item.id,length:`${item.lengthCm.toFixed(2)} cm`,command:'DIM／TEXT'});
        const dimension=drawManualItemDimension(plan,item,theme,1);
        dimension.label.text('');
        typeText(dimension.label,`長度=${item.lengthCm.toFixed(2)} cm`,durations.cell*.55,()=>{
          if(item.type==='外部')exteriorValues.push(item.lengthCm); else shaftValues.push(item.lengthCm);
          const formula=`外部 ${exteriorValues.join('＋')}${shaftValues.length?` ｜ 深井 ${shaftValues.join('＋')}`:''}`;
          options.onManualStageChange?.({phase:'formula',current:item.id,length:`${item.lengthCm.toFixed(2)} cm`,command:'人工逐筆記錄',formula});
          globalThis.setTimeout(advance,durations.feedback);
        });
      }));
    }));
  };
  options.onManualStageChange?.({phase:'idle'}); advance();
}

function drawManualSummaryScene(plan,geometry,theme){
  const items=drawManualBase(plan,geometry,theme);
  items.forEach((item)=>drawManualItemDimension(plan,item,theme,1));
}

function drawManualQuantityScene(container,plan,geometry,theme,durations,options,renderId){
  drawManualSummaryScene(plan,geometry,theme);
  const braces=drawBraceElements(plan,geometry,theme,{showNumbers:false});
  let index=0;
  const reveal=()=>{
    if(container.dataset.cadRenderId!==renderId)return;
    if(index>=braces.length){
      options.onManualStageChange?.({phase:'quantity-complete',count:30,current:'外部三角補強',command:'人工數量確認'});
      return;
    }
    const brace=braces[index++];
    brace.numberLabel.transition().duration(durations.label*.45).attr('opacity',1);
    options.onManualStageChange?.({phase:'quantity',count:index,current:`補強 ${String(index).padStart(2,'0')}`,command:'人工逐筆編號'});
    globalThis.setTimeout(reveal,durations.label*.55);
  };
  options.onManualStageChange?.({phase:'quantity-idle',count:0,current:'補強構件已存在',command:'人工數量確認'});
  globalThis.setTimeout(reveal,durations.feedback);
}

function drawStandardLayerScene(svg,plan,geometry,theme,durations,ribbon,options){
  const pointer=drawPointerCursor(svg,ribbon.layerX+80,53,theme); const layerRows=[
    {name:'AI-EXTERIOR',desc:'外部施工聚合線',color:theme.exterior},
    {name:'AI-SHAFT',desc:'內部深井聚合線',color:theme.shaft},
    {name:'AI-DIM',desc:'尺寸、箭頭與文字標註',color:theme.dimension},
    {name:'AI-BRACE',desc:'外部三角補強',color:theme.support}
  ];
  const menu=svg.append('g').attr('transform',`translate(${ribbon.layerX},${theme.ribbonHeight+8})`).attr('opacity',0);
  menu.append('rect').attr('width',245).attr('height',layerRows.length*34+10).attr('fill',theme.command).attr('stroke',theme.border);
  layerRows.forEach((row,index)=>{ const y=8+index*34; menu.append('rect').attr('x',8).attr('y',y+8).attr('width',18).attr('height',4).attr('fill',row.color); appendText(menu,34,y+14,row.name,theme.foreground,theme.labelSize,600); appendText(menu,120,y+14,row.desc,theme.secondary,theme.dimensionSize); });
  moveCursor(pointer,ribbon.layerX+80,55,durations.cursor,()=>clickCursor(svg,pointer,ribbon.layerX+80,55,theme,durations.click,()=>{
    menu.transition().duration(durations.label).attr('opacity',1); let index=0;
    const next=()=>{ if(index>=layerRows.length){ options.onAutoStageChange?.({phase:'layers-complete',title:'標準圖層建立完成',command:'LAYER_STANDARD',layer:'4 個標準圖層'}); return; } const row=layerRows[index++]; ribbon.layerValue.text(row.name); options.onAutoStageChange?.({phase:'layer',title:`建立 ${row.name}`,command:'LAYER_STANDARD',layer:row.name,description:row.desc}); globalThis.setTimeout(next,durations.label*1.3); }; next();
  }));
}

function drawAutoLabelScene(container,svg,plan,geometry,theme,durations,ribbon,options,renderId){
  drawBraceElements(plan,geometry,theme,{showNumbers:false});
  const pointer=drawPointerCursor(svg,ribbon.tools.external.x+80,ribbon.tools.external.y,theme);
  options.onAutoStageChange?.({phase:'idle',title:'等待逐段繪製',command:'AI_WORKFLOW',layer:'AI-EXTERIOR'});
  moveCursor(pointer,ribbon.tools.external.x,ribbon.tools.external.y,durations.cursor*.6,()=>clickCursor(svg,pointer,ribbon.tools.external.x,ribbon.tools.external.y,theme,durations.click,()=>{
    highlightTool(ribbon,'external',theme); ribbon.layerValue.text('AI-EXTERIOR'); pointer.attr('opacity',0);
    const cross=drawCrosshair(svg,ribbon.tools.external.x,ribbon.tools.external.y,theme);
    runExteriorSegmentSequence(container,svg,plan,geometry,theme,durations,options,renderId,cross,()=>{
      cross.remove(); drawOffsetDimension(plan,geometry,theme); pointer.attr('opacity',1);
      options.onAutoStageChange?.({phase:'external-complete',title:'16 段外部尺寸完成',command:'AI_EXTERNAL',layer:'AI-EXTERIOR',externalTotal:'1,000.00 cm'});
      moveCursor(pointer,ribbon.tools.shaft.x,ribbon.tools.shaft.y,durations.cursor*.6,()=>clickCursor(svg,pointer,ribbon.tools.shaft.x,ribbon.tools.shaft.y,theme,durations.click,()=>{
        highlightTool(ribbon,'shaft',theme); ribbon.layerValue.text('AI-SHAFT'); pointer.attr('opacity',0);
        const cross2=drawCrosshair(svg,ribbon.tools.shaft.x,ribbon.tools.shaft.y,theme);
        runShaftDrawSequence(container,svg,plan,geometry,theme,durations,options,renderId,cross2,()=>{
          cross2.remove(); pointer.attr('opacity',1);
          moveCursor(pointer,ribbon.tools.matrix.x,ribbon.tools.matrix.y,durations.cursor*.6,()=>clickCursor(svg,pointer,ribbon.tools.matrix.x,ribbon.tools.matrix.y,theme,durations.click,()=>{
            highlightTool(ribbon,'matrix',theme); pointer.attr('opacity',0);
            const cross3=drawCrosshair(svg,ribbon.tools.matrix.x,ribbon.tools.matrix.y,theme);
            const remainingItems=shaftMatrixItems.slice(1);
            runShaftDrawSequence(container,svg,plan,geometry,theme,durations,options,renderId,cross3,()=>{
              cross3.remove(); pointer.attr('opacity',1);
              options.onAutoStageChange?.({phase:'complete',title:'多個深井標示與圖層過濾完成',command:'AI_SHAFT_ARRAY',layer:'AI-SHAFT',accepted:6,ignored:2,labeled:6,externalTotal:'1,000.00 cm',shaftTotal:'600.00 cm'});
            },remainingItems);
          }));
        },[shaftMatrixItems[0]]);
      }));
    });
  }));
}

function drawFinalSelection(svg,start,end,theme){ svg.append('rect').attr('x',start[0]).attr('y',start[1]).attr('width',end[0]-start[0]).attr('height',end[1]-start[1]).attr('fill',theme.selectionFill).attr('stroke',theme.selection).attr('stroke-width',theme.selected).attr('stroke-dasharray','6,4'); drawGrips(svg,[start,[end[0],start[1]],end,[start[0],end[1]]],theme); }

function animateBoxSelection(svg,geometry,theme,durations,onComplete,label='6F 整層施工範圍'){
  const start=[Math.max(12,geometry.x-16),Math.max(100,geometry.y-18)],end=[geometry.x+geometry.width+16,geometry.y+geometry.height+18]; const cursor=drawCrosshair(svg,24,110,theme); const box=svg.append('rect').attr('x',start[0]).attr('y',start[1]).attr('width',0).attr('height',0).attr('fill',theme.selectionFill).attr('stroke',theme.selection).attr('stroke-width',theme.selected).attr('stroke-dasharray','6,4').attr('opacity',0);
  moveCursor(cursor,start[0],start[1],durations.cursor,()=>{ box.attr('opacity',1).transition().duration(durations.selection).attr('width',end[0]-start[0]).attr('height',end[1]-start[1]); moveCursor(cursor,end[0],end[1],durations.selection,()=>{ drawGrips(svg,[start,[end[0],start[1]],end,[start[0],end[1]]],theme); appendText(svg,start[0]+8,start[1]-7,label,theme.selection,theme.labelSize,600); onComplete?.(start,end,cursor); }); });
}

function drawBoxSelection(svg,step,geometry,theme,durations,options){
  const start=[Math.max(12,geometry.x-16),Math.max(100,geometry.y-18)],end=[geometry.x+geometry.width+16,geometry.y+geometry.height+18];
  if(options.activeSelection?.sourceId===step.selection.id){ drawFinalSelection(svg,start,end,theme); drawCrosshair(svg,end[0],end[1],theme); appendText(svg,start[0]+8,start[1]-7,'6F 整層施工範圍｜22 LENGTH／30 BRACE／2 IGNORED',theme.selection,theme.labelSize,600); return; }
  animateBoxSelection(svg,geometry,theme,durations,()=>globalThis.setTimeout(()=>options.onSelectionChange?.(step.selection),durations.feedback));
}

function revealCalculationResults(options,durations,index=1){
  const stages=[
    {resultIndex:1,title:'有效物件已確認',command:'AI_LAYER_FILTER'},
    {resultIndex:2,title:'忽略非標準圖層',command:'AI_LAYER_FILTER'},
    {resultIndex:3,title:'外部獨立長度完成',command:'AI_SUMMARY'},
    {resultIndex:4,title:'內部深井合計完成',command:'AI_SUMMARY'},
    {resultIndex:5,title:'施工總長完成',command:'AI_SUMMARY'}
  ];
  if(index>stages.length)return; options.onAutoStageChange?.({phase:'calculation-results',...stages[index-1]}); globalThis.setTimeout(()=>revealCalculationResults(options,durations,index+1),durations.label*1.2);
}

function drawCalculationScene(svg,plan,geometry,theme,durations,ribbon,step,options){
  drawSemanticLayers(plan,geometry,theme,{dimensions:true,braces:true}); const pointer=drawPointerCursor(svg,ribbon.tools.calculate.x+80,ribbon.tools.calculate.y,theme); options.onAutoStageChange?.({phase:'calculation-idle',title:'等待自動計算',command:'AI_CALCULATE',resultIndex:0});
  moveCursor(pointer,ribbon.tools.calculate.x,ribbon.tools.calculate.y,durations.cursor,()=>clickCursor(svg,pointer,ribbon.tools.calculate.x,ribbon.tools.calculate.y,theme,durations.click,()=>{
    highlightTool(ribbon,'calculate',theme); pointer.remove(); options.onAutoStageChange?.({phase:'calculation-select',title:'請框選整層範圍',command:'AI_CALCULATE',resultIndex:0});
    animateBoxSelection(svg,geometry,theme,durations,()=>{ options.onSelectionChange?.(step.selection); options.onAutoStageChange?.({phase:'calculation-filter',title:'依標準圖層過濾',command:'AI_LAYER_FILTER',resultIndex:0}); globalThis.setTimeout(()=>revealCalculationResults(options,durations),durations.feedback); },'自動計算範圍｜22 LENGTH／30 BRACE／2 IGNORED');
  }));
}

function drawExternalIndependentSegments(plan,geometry,theme){
  return drawExteriorSegments(plan,geometry,theme,{dimensions:true,dimensionOpacity:0});
}

function braceLayout(geometry){
  const items=[];
  const topY=geometry.height*.075; const rightX=geometry.width*.955; const bottomY=geometry.height*.935; const leftX=geometry.width*.012;
  d3.range(10).forEach((index)=>items.push({number:items.length+1,side:'top',x:geometry.width*(.105+index*.082),y:topY,width:18,height:6}));
  d3.range(5).forEach((index)=>items.push({number:items.length+1,side:'right',x:rightX,y:geometry.height*(.28+index*.115),width:6,height:18}));
  d3.range(10).forEach((index)=>items.push({number:items.length+1,side:'bottom',x:geometry.width*(.843-index*.075),y:bottomY,width:18,height:6}));
  d3.range(5).forEach((index)=>items.push({number:items.length+1,side:'left',x:leftX,y:geometry.height*(.74-index*.115),width:6,height:18}));
  return items;
}

function drawBraceElement(group,item,theme,showNumber=false){
  const shape=group.append('rect')
    .attr('data-brace-number',String(item.number).padStart(2,'0'))
    .attr('x',item.x-item.width/2).attr('y',item.y-item.height/2)
    .attr('width',item.width).attr('height',item.height)
    .attr('fill',theme.brace).attr('stroke',theme.command).attr('stroke-width',1.4);
  const offsets={top:[0,-9],right:[11,4],bottom:[0,15],left:[-11,4]};
  const [dx,dy]=offsets[item.side];
  const numberLabel=appendText(group,item.x+dx,item.y+dy,String(item.number).padStart(2,'0'),theme.brace,Math.max(7,theme.dimensionSize-1),600)
    .attr('text-anchor',item.side==='right'?'start':item.side==='left'?'end':'middle')
    .attr('paint-order','stroke').attr('stroke',theme.command).attr('stroke-width',2.2).attr('stroke-linejoin','round')
    .attr('opacity',showNumber?1:0);
  return {item,shape,numberLabel};
}

function drawBraceElements(plan,geometry,theme,{showNumbers=false}={}){
  const group=plan.append('g').attr('data-layer','AI-BRACE').attr('data-location','exterior-perimeter').attr('data-brace-geometry','rectangle');
  return braceLayout(geometry).map((item)=>drawBraceElement(group,item,theme,showNumbers));
}

function drawTriangleBraces(plan,geometry,theme){
  return drawBraceElements(plan,geometry,theme,{showNumbers:true});
}

function revealBraceNumbersForExteriorSegment(braces,segmentIndex,durations){
  const start=segmentIndex<14?segmentIndex*2:28+(segmentIndex-14);
  const count=segmentIndex<14?2:1;
  braces.slice(start,start+count).forEach((brace,index)=>{
    brace.numberLabel.transition().delay(index*durations.label*.18).duration(durations.label*.45).attr('opacity',1);
  });
}

function drawResultThreeScene(plan,geometry,theme,durations,options){
  const exterior=drawExternalIndependentSegments(plan,geometry,theme);
  const shafts=drawShafts(plan,geometry,theme,true);
  const braces=drawBraceElements(plan,geometry,theme,{showNumbers:false});
  const acceptedShafts=shafts.filter((item)=>item.accepted);
  let resultIndex=0;
  const totalStages=exterior.length+acceptedShafts.length+1;
  const reveal=()=>{
    resultIndex+=1;
    if(resultIndex<=exterior.length){
      const current=exterior[resultIndex-1];
      current.path.attr('stroke-width',theme.selected);
      current.dimension.group.transition().duration(durations.label*.65).attr('opacity',1);
      revealBraceNumbersForExteriorSegment(braces,resultIndex-1,durations);
    } else if(resultIndex<=exterior.length+acceptedShafts.length){
      const accepted=acceptedShafts[resultIndex-exterior.length-1];
      accepted.shape.attr('stroke-width',theme.selected);
      const position=accepted.position;
      const dimension=drawHorizontalDimension(plan,position.x,position.x+position.width,position.y+position.height+18,position.y+position.height,`長度=${formatLength(1,'m')}`,theme,0);
      dimension.group.transition().duration(durations.label*.65).attr('opacity',1);
    }
    options.onAutoStageChange?.({phase:'result-three',title:'AI RESULTS 逐項整理',command:'AI_QUANTITY',resultIndex,totalStages});
    if(resultIndex<totalStages)globalThis.setTimeout(reveal,durations.label*.72);
  };
  globalThis.setTimeout(reveal,durations.feedback);
}

function drawAiQueryScene(svg,plan,geometry,theme,durations,step,options){
  drawSemanticLayers(plan,geometry,theme,{dimensions:true,braces:true}); options.onAutoStageChange?.({phase:'ai-select',title:'先框選查詢範圍',command:'AI_ASSISTANT'});
  animateBoxSelection(svg,geometry,theme,durations,()=>{ options.onSelectionChange?.(step.selection); options.onAutoStageChange?.({phase:'ai-ready',title:'框選完成，輸入問題',command:'AI_ASSISTANT'}); },'AI 查詢範圍｜22 LENGTH／30 BRACE／2 IGNORED');
}

function drawSheets(svg,width,modelTop,modelHeight,theme){ const sheetWidth=Math.min(178,width*.23); [0,1,2].forEach((index)=>{ const group=svg.append('g').attr('transform',`translate(${28+index*(sheetWidth+28)},${modelTop+54})`); group.append('rect').attr('width',sheetWidth).attr('height',Math.min(270,modelHeight*.62)).attr('fill','none').attr('stroke',index===1?theme.selection:theme.building); group.append('rect').attr('x',16).attr('y',30).attr('width',sheetWidth-32).attr('height',140).attr('fill','none').attr('stroke',theme.buildingSecondary); appendText(group,14,214,`${index+4}F WORK PLAN`,theme.building,theme.labelSize,600); }); }

function drawPdf(svg,width,modelTop,modelHeight,theme,duration){
  const page=svg.append('g').attr('transform',`translate(${width*.25},${modelTop+25})`).attr('opacity',0);
  page.append('rect').attr('width',Math.min(420,width*.52)).attr('height',Math.min(440,modelHeight*.84)).attr('fill',theme.foreground).attr('stroke',theme.building);
  appendText(page,22,38,'AI 工程量檢核報告',theme.command,theme.labelSize,600);
  [
    '圖面：A-03 / 6F',
    '框選：6F 整層施工範圍',
    '外部：16 段獨立長度，合計 1,000.00 cm',
    '深井：6 個 × 100.00 cm，合計 600.00 cm',
    '施工總長：1,600.00 cm',
    '外部三角補強：30 個（編號 01～30）',
    '忽略：2 個非標準圖層',
    '檢查狀態：PASS'
  ].forEach((text,index)=>appendText(page,22,76+index*40,text,index===7?theme.exterior:theme.command,theme.labelSize,index===7?600:400));
  page.transition().duration(duration).attr('opacity',1);
}

/** @param {HTMLElement} container @param {Array<object>} data @param {object} options @returns {void} */
export function renderCadSimulator(container,data,options){
  if(!container)return; const step=data[options.activeStep]??data[0]; const theme=readTheme(container); const durations=readDurations(container,options.mode); const width=Math.max(700,Math.round(container.getBoundingClientRect().width||container.clientWidth)); const height=Math.max(610,Math.round(container.getBoundingClientRect().height||container.clientHeight)); const modelTop=theme.ribbonHeight; const modelHeight=height-modelTop; const renderId=`${Date.now()}-${Math.random()}`; container.dataset.cadRenderId=renderId;
  const svg=d3.select(container).selectAll('svg').data([step]).join('svg').attr('viewBox',`0 0 ${width} ${height}`).attr('preserveAspectRatio','xMinYMin meet').attr('role','img').attr('aria-label',`${step.id}. ${step.label}`).attr('font-family',theme.font).attr('stroke-linecap','square').attr('shape-rendering','geometricPrecision');
  svg.selectAll('*').interrupt().remove(); svg.append('rect').attr('width',width).attr('height',height).attr('fill',theme.canvas); const ribbon=drawRibbon(svg,width,theme,options.mode); drawGrid(svg,width,modelTop,modelHeight,theme);
  if(step.animType==='static-sheets')return drawSheets(svg,width,modelTop,modelHeight,theme); if(step.animType==='pdf-preview')return drawPdf(svg,width,modelTop,modelHeight,theme,durations.adjust);
  const geometry=planGeometry(width,modelTop,modelHeight); const plan=drawNativeCadPlan(svg,geometry,theme); appendText(svg,geometry.x,height-14,'A-03 / 6F PLAN / Rev. B',theme.building,theme.labelSize);
  if(step.animType==='static-zones')return drawZones(plan,geometry,theme);
  if(options.mode==='current'&&step.animType==='draw')return drawManualConstructionScene(container,svg,plan,geometry,theme,durations,options,renderId);
  if(step.animType==='manual-inspect')return drawManualInspectScene(svg,plan,geometry,theme,durations,options);
  if(step.animType==='manual-label-slow')return drawManualLabelScene(container,svg,plan,geometry,theme,durations,ribbon,options,renderId);
  if(step.animType==='standard-layers')return drawStandardLayerScene(svg,plan,geometry,theme,durations,ribbon,options);
  if(step.animType==='guided-draw')return drawGuidedDrawScene(container,svg,plan,geometry,theme,durations,ribbon,options,renderId);
  if(step.animType==='auto-label')return drawAutoLabelScene(container,svg,plan,geometry,theme,durations,ribbon,options,renderId);
  if(step.animType==='panel-fast')return drawCalculationScene(svg,plan,geometry,theme,durations,ribbon,step,options);
  if(step.animType==='result-three')return drawResultThreeScene(plan,geometry,theme,durations,options);
  if(step.animType==='ai-query')return drawAiQueryScene(svg,plan,geometry,theme,durations,step,options);
  if(options.mode==='current'&&step.animType==='quantity-slow')return drawManualQuantityScene(container,plan,geometry,theme,durations,options,renderId);
  if(options.mode==='current'&&['sum','adjust'].includes(step.animType)){ drawManualSummaryScene(plan,geometry,theme); return; }
  if(step.animType==='draw'||step.animType==='draw-fast'){ const layers=drawSemanticLayers(plan,geometry,theme,{includeIgnored:false}); [layers.exterior,...layers.shafts.slice(0,1).map((x)=>x.shape)].forEach((shape,index)=>{ const length=shape.node()?.getTotalLength?.()??1; shape.attr('stroke-dasharray',`${length} ${length}`).attr('stroke-dashoffset',length).transition().delay(index*durations.draw).duration(durations.draw*2).attr('stroke-dashoffset',0); }); return; }
  if(step.animType!=='static')drawSemanticLayers(plan,geometry,theme,{includeIgnored:['box-select-fast','confirm'].includes(step.animType),dimensions:['box-select-fast','confirm','sum','quantity-slow'].includes(step.animType),braces:options.mode==='future'&&['box-select-fast','confirm'].includes(step.animType)});
  if(step.animType==='box-select-fast')drawBoxSelection(svg,step,geometry,theme,durations,options);
  if(step.animType==='auto-layer'){ ribbon.layerValue.text('AI-SHAFT'); appendText(svg,24,height-38,'AI：標準圖層與 ByLayer 性質已套用',theme.building,theme.labelSize,600); }
  if(step.animType==='adjust'){ const d=drawHorizontalDimension(plan,geometry.width*.42,geometry.width*.68,geometry.height*.58,geometry.height*.65,'長度=1,600.00 cm',theme,0); d.group.transition().duration(durations.adjust).attr('opacity',1); }
}

// 職責：掃描 v5.9.3 內容、互動、樣式與檔案規則。
import { readFileSync, readdirSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { currentFlowNodes, futureFlowSteps } from '../src/lib/content/siteContent.js';

const root = process.cwd();
const sourceRoot = resolve(root, 'src');
const violations = [];
const read = (path) => readFileSync(resolve(root, path), 'utf-8');
function walk(directory) { return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(directory, entry.name)) : [join(directory, entry.name)]); }
for (const filePath of walk(sourceRoot)) {
  const content = readFileSync(filePath, 'utf-8');
  if (extname(filePath) === '.svelte' && /from ['"]d3['"]|d3\./.test(content)) violations.push(`${filePath}: .svelte 內含 D3 細節`);
  if (!filePath.replaceAll('\\', '/').endsWith('/tokens.css') && /#[0-9a-fA-F]{3,8}\b/.test(content)) violations.push(`${filePath}: Token 外 hardcode hex`);
  if (/linear-gradient|radial-gradient|backdrop-filter|box-shadow/.test(content)) violations.push(`${filePath}: 使用禁止視覺效果`);
}
const tokens = read('src/lib/tokens.css').toLowerCase();
['--cad-canvas-background: #e7e8e5', '--cad-playback-rate: 0.5', '--keyword-ai:', '--keyword-standard:', '--keyword-manual:', '--cad-property-width: 286px', '--cad-layer-brace: #ffffff'].forEach((token) => { if (!tokens.includes(token)) violations.push(`tokens.css: 缺少 ${token}`); });
if (currentFlowNodes.length !== 9 || futureFlowSteps.length !== 12) violations.push('流程節點數不正確');
if (currentFlowNodes.some((step) => step.selection || step.animType.includes('box-select'))) violations.push('ACT 02: 人工流程仍含框選');
if (!currentFlowNodes.some((step) => step.animType === 'manual-inspect') || !currentFlowNodes.some((step) => step.animType === 'manual-label-slow')) violations.push('ACT 02: 缺少逐段點選或逐段標註');
if (futureFlowSteps[1]?.animType !== 'standard-layers') violations.push('STEP 02: 未建立標準圖層');
if (futureFlowSteps.filter((step) => step.selection).length !== 3) violations.push('STEP 07/08/10: 框選契約不完整');
for (const step of [...currentFlowNodes, ...futureFlowSteps]) {
  for (const highlight of step.highlights ?? []) {
    if (!`${step.label} ${step.desc}`.includes(highlight.text)) violations.push(`流程 ${step.id}: 關鍵字片語未出現在標題或內文：${highlight.text}`);
  }
}
const selection = futureFlowSteps[6].selection;
if (selection.lengthObjectIds.length !== 22 || selection.quantityObjectIds.length !== 30 || selection.objectIds.length !== 52 || selection.ignoredObjectIds.length !== 2 || selection.segmentLengths.length !== 22) violations.push('整層框選資料不正確');
const chart = read('src/lib/charts/cadSimulator.js');
['drawHorizontalDimension', 'offsetClosedPolygon', 'drawBraceElement', 'drawRibbon', 'drawPointerCursor', 'drawCrosshair', 'drawManualLabelScene', 'drawStandardLayerScene', 'drawCalculationScene', 'drawResultThreeScene', 'drawAiQueryScene', 'drawExternalIndependentSegments', 'drawTriangleBraces', 'drawOffsetDimension', 'drawGuidedDrawScene', 'runExteriorSegmentSequence', 'runShaftDrawSequence', "label: '自動計算'", "data-layer', 'AI-DIM"].forEach((phrase) => { if (!chart.includes(phrase)) violations.push(`cadSimulator.js: 缺少 ${phrase}`); });
if (!chart.includes("data-brace-geometry','rectangle")) violations.push('cadSimulator.js: 三角補強不是長方形');
if (!chart.includes("mode === 'future' ? baseRate * 1.25 : baseRate")) violations.push('cadSimulator.js: ACT 04 未加快 25%');
if (chart.includes('人工加總：外部') || chart.includes('外部：100＋80＋30＋40＋60＝310.00 cm｜深井')) violations.push('cadSimulator.js: 模型空間仍含加總公式');
if (chart.includes('function drawCadDimension')) violations.push('cadSimulator.js: 仍使用斜引線尺寸函式');
const processSource = read('src/lib/components/CadProcess.svelte');
['40fr', '60fr', 'margin-top: 0', 'act-heading', 'keyword-ai', 'keyword-standard', 'keyword-manual'].forEach((phrase) => { if (!processSource.includes(phrase)) violations.push(`CadProcess.svelte: 缺少 ${phrase}`); });
const panel = read('src/lib/components/CadDockedPanel.svelte');
['futureExteriorSegments', '16 段外部獨立長度', '內部深井', '施工總長', '外部三角補強'].forEach((phrase) => { if (!panel.includes(phrase)) violations.push(`CadDockedPanel.svelte: 缺少 ${phrase}`); });
const assistant = read('src/lib/components/CadAiAssistant.svelte');
const summary = read('src/lib/components/Act06Summary.svelte');
const nav = read('src/lib/components/Nav.svelte');
const svelteConfig = read('svelte.config.js');
const pagesWorkflow = read('.github/workflows/deploy-pages.yml');
if (!assistant.includes('rows="4"') || !assistant.includes('typeDemoQuestion') || !assistant.includes('min-height: 132px')) violations.push('AI 助理輸入框或補字動畫不完整');

if (!processSource.includes('keyword-emphasis')) violations.push('CadProcess.svelte: 缺少深色粗體重點語意');
const guidedStep = futureFlowSteps[3];
['外部施工線與深井仍由繪圖人員依工程判斷逐段繪製', 'AI 不代替繪圖', '自動讀取物件長度並帶入尺寸標註', '標準圖層'].forEach((phrase) => { if (!guidedStep.desc.includes(phrase)) violations.push(`ACT 04 STEP 04: 缺少 ${phrase}`); });
if (!guidedStep.highlights.some((item) => item.text === '逐段繪製' && item.tone === 'manual')) violations.push('ACT 04 STEP 04: 人工逐段繪製未套用人工色');
if (!guidedStep.highlights.some((item) => item.text === '自動讀取物件長度並帶入尺寸標註' && item.tone === 'ai')) violations.push('ACT 04 STEP 04: AI 後處理未套用 AI 色');
if (!guidedStep.highlights.some((item) => item.text === '標準圖層' && item.tone === 'standard')) violations.push('ACT 04 STEP 04: 標準圖層未套用標準色');
['ACT 06 / PROJECT SUMMARY', '規則化、標準化與系統化', '把繪圖人員的工程經驗，轉成公司可以保存、團隊可以沿用、程式可以執行、AI 可以使用的標準作業系統。'].forEach((phrase) => { if (!summary.includes(phrase)) violations.push(`Act06Summary.svelte: 缺少 ${phrase}`); });
['NEXT STEP', '準備好從一張代表性施工圖開始了嗎？', '重新檢視現況流程'].forEach((phrase) => { if (summary.includes(phrase)) violations.push(`Act06Summary.svelte: 仍含舊 CTA ${phrase}`); });
if (!nav.includes("'總結'")) violations.push('Nav.svelte: 第六章未改為總結');
if (!svelteConfig.includes("process.env.GITHUB_REPOSITORY?.split('/')[1]") || !svelteConfig.includes('base: githubPagesBase')) violations.push('svelte.config.js: GitHub Pages base path 設定不完整');
['actions/checkout@v6', 'actions/setup-node@v6', 'actions/configure-pages@v5', 'actions/upload-pages-artifact@v4', 'actions/deploy-pages@v4', 'path: build'].forEach((phrase) => { if (!pagesWorkflow.includes(phrase)) violations.push(`deploy-pages.yml: 缺少 ${phrase}`); });
if (read('src/lib/components/Act01Hero.svelte').includes('keyword-ai') || read('src/lib/components/Act03Problem.svelte').includes('keyword-ai')) violations.push('ACT 01/03 不應套用關鍵字色');
if (violations.length) { console.error(violations.join('\n')); process.exit(1); }
console.log('v5.9.4 GitHub Pages 部署、人工繪製語意、關鍵字配色、專案總結與既有流程規範掃描通過。');

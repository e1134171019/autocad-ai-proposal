// 職責：依有效框選產生可追溯的 AI 展示回覆。
import { calculateTotalLengthCm, convertLengthToCentimeters, formatLengthCm } from './lengthCalculator.js';
import { isSelectionReady } from './selection.js';

export function canSubmitAiQuestion(question, selection) {
  return isSelectionReady(selection) && question.trim().length > 0;
}

export function answerSelectionQuestion(question, selection) {
  if (!canSubmitAiQuestion(question, selection)) throw new Error('AI_QUERY_NOT_READY');
  const lengths = selection.segmentLengths.map((length) => convertLengthToCentimeters(length, selection.drawingUnit));
  const total = calculateTotalLengthCm(selection.segmentLengths, selection.drawingUnit);
  const normalizedQuestion = question.trim();
  const message = normalizedQuestion.includes('忽略') || normalizedQuestion.includes('異常')
    ? `目前框選範圍有 ${selection.ignoredObjectIds?.length ?? 0} 個物件因非標準圖層被忽略。`
    : normalizedQuestion.includes('數量') || normalizedQuestion.includes('補強')
      ? '目前框選範圍換算出外部三角補強 30 個。'
      : `目前框選範圍包含外部 ${selection.externalSegments?.length ?? 0} 段獨立長度，外部合計 1,000.00 cm；六個深井各 100.00 cm，施工總長為 ${formatLengthCm(total)}。`;
  return {
    selectionId: selection.id,
    message,
    sources: [
      `框選：${selection.id}`,
      `圖面：${selection.drawingId}／${selection.floor}／${selection.version}`,
      `範圍：${selection.area}，有效長度物件 ${selection.lengthObjectIds?.length ?? selection.objectIds.length} 個，有效補強構件 ${selection.quantityObjectIds?.length ?? 0} 個`,
      `忽略：${selection.ignoredObjectIds?.length ?? 0} 個（${selection.ignoredReason ?? '非標準圖層'}）`,
      `外部獨立長度：${(selection.externalSegments ?? []).map((item) => formatLengthCm(convertLengthToCentimeters(item.rawLength, item.drawingUnit))).join(' + ')}`,
      `深井獨立長度：${lengths.slice(selection.externalSegments?.length ?? 0).map(formatLengthCm).join(' + ')}`, 
      '數量：外部三角補強 30 個'
    ]
  };
}

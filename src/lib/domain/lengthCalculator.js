// 職責：提供施工長度正規化、單位轉換、格式化與加總純函式。
// 輸入：未知長度值、原始圖面單位與線段陣列。
// 輸出：可預測的 cm 數值、顯示字串與總長。

export const DrawingUnit = Object.freeze({ MILLIMETER: 'mm', CENTIMETER: 'cm', METER: 'm' });

/** 純函式：將未知值轉為可計算的非負長度。 @param {unknown} rawLength @returns {number} */
export function normalizeLength(rawLength) {
  const parsedLength = Number(rawLength);
  return Number.isFinite(parsedLength) && parsedLength >= 0 ? parsedLength : 0;
}

/** 純函式：將原始圖面長度轉換為 cm；未知單位回傳 null。 @param {unknown} rawLength @param {string} drawingUnit @returns {number|null} */
export function convertLengthToCentimeters(rawLength, drawingUnit) {
  const normalizedLength = normalizeLength(rawLength);
  if (drawingUnit === DrawingUnit.MILLIMETER) return normalizedLength / 10;
  if (drawingUnit === DrawingUnit.CENTIMETER) return normalizedLength;
  if (drawingUnit === DrawingUnit.METER) return normalizedLength * 100;
  return null;
}

/** 純函式：格式化 cm 長度並固定顯示兩位小數。 @param {number|null} lengthCm @returns {string} */
export function formatLengthCm(lengthCm) {
  if (lengthCm === null || !Number.isFinite(lengthCm)) return '單位未設定';
  const formatter = new Intl.NumberFormat('zh-TW', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${formatter.format(lengthCm)} cm`;
}

/** 純函式：加總所有有效線段長度。 @param {unknown[]} segmentLengths @returns {number} */
export function calculateTotalLength(segmentLengths) {
  return segmentLengths.map(normalizeLength).reduce((total, length) => total + length, 0);
}

/** 純函式：將原始線段轉為 cm 後加總；未知單位回傳 null。 @param {unknown[]} segmentLengths @param {string} drawingUnit @returns {number|null} */
export function calculateTotalLengthCm(segmentLengths, drawingUnit) {
  const convertedLengths = segmentLengths.map((length) => convertLengthToCentimeters(length, drawingUnit));
  return convertedLengths.some((length) => length === null)
    ? null
    : convertedLengths.reduce((total, length) => total + length, 0);
}

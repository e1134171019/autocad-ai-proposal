// 職責：驗證施工長度正規化、cm 轉換與加總純函式。
// 輸入：不同單位與異常長度。
// 輸出：可預測的 cm 數值與顯示格式。
import { describe, expect, it } from 'vitest';
import { calculateTotalLength, calculateTotalLengthCm, convertLengthToCentimeters, formatLengthCm, normalizeLength } from '../src/lib/domain/lengthCalculator.js';

describe('長度純函式', () => {
  it('排除負數與無效值', () => {
    expect(normalizeLength(-1)).toBe(0);
    expect(normalizeLength('invalid')).toBe(0);
  });
  it('保留既有加總契約', () => expect(calculateTotalLength([16.5, 138, 16.5, 142.3])).toBeCloseTo(313.3));
  it('將 mm 與 m 正規化為 cm', () => {
    expect(convertLengthToCentimeters(3842.5, 'mm')).toBe(384.25);
    expect(convertLengthToCentimeters(1.804, 'm')).toBeCloseTo(180.4);
    expect(convertLengthToCentimeters(16.6, 'm')).toBeCloseTo(1660);
    expect(convertLengthToCentimeters(21.6, 'm')).toBeCloseTo(2160);
    expect(convertLengthToCentimeters(1660, 'cm')).toBe(1660);
    expect(convertLengthToCentimeters(20, 'unknown')).toBeNull();
  });
  it('以 cm 加總並固定兩位小數', () => {
    expect(calculateTotalLengthCm([16500, 138000, 16500, 142300], 'mm')).toBe(31330);
    expect(formatLengthCm(384.25)).toBe('384.25 cm');
  });
});

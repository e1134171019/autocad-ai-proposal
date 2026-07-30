// 職責：驗證標準圖層只接受有效深井並忽略其他圖層。
// 輸入：8 個深井與標準圖層名稱。
// 輸出：6 個有效、2 個忽略及 0 次人工輸入摘要。
import { describe, expect, it } from 'vitest';
import { shaftMatrixItems, standardShaftLayers } from '../src/lib/content/siteContent.js';
import { isStandardLayerObject, partitionShaftsByLayer, summarizeShaftMatrix } from '../src/lib/domain/layerFilter.js';

describe('多深井標準圖層過濾', () => {
  it('只接受標準深井圖層', () => {
    expect(isStandardLayerObject(shaftMatrixItems[0], standardShaftLayers)).toBe(true);
    expect(isStandardLayerObject(shaftMatrixItems[2], standardShaftLayers)).toBe(false);
  });
  it('固定分為六個有效與兩個忽略', () => {
    const partition = partitionShaftsByLayer(shaftMatrixItems, standardShaftLayers);
    expect(partition.accepted).toHaveLength(6);
    expect(partition.ignored).toHaveLength(2);
  });
  it('摘要只計算有效深井標示', () => {
    expect(summarizeShaftMatrix(shaftMatrixItems, standardShaftLayers)).toEqual({ total: 8, accepted: 6, ignored: 2, labeled: 6, manualInputs: 0 });
  });
});

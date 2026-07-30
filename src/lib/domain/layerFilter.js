// 職責：依標準圖層過濾可由 AI 自動標示的深井物件。
// 輸入：深井物件陣列與標準圖層名稱陣列。
// 輸出：不可變的有效物件、忽略物件與摘要。

/** 純函式：判斷物件是否屬於標準圖層。 @param {{layer:string}} shaft @param {readonly string[]} standardLayers @returns {boolean} */
export function isStandardLayerObject(shaft, standardLayers) {
  return standardLayers.includes(shaft.layer);
}

/** 純函式：將深井分為有效及忽略兩組。 @param {readonly object[]} shafts @param {readonly string[]} standardLayers @returns {{accepted:object[],ignored:object[]}} */
export function partitionShaftsByLayer(shafts, standardLayers) {
  const accepted = shafts.filter((shaft) => isStandardLayerObject(shaft, standardLayers));
  const ignored = shafts.filter((shaft) => !isStandardLayerObject(shaft, standardLayers));
  return { accepted, ignored };
}

/** 純函式：建立矩陣展示摘要。 @param {readonly object[]} shafts @param {readonly string[]} standardLayers @returns {{total:number,accepted:number,ignored:number,labeled:number,manualInputs:number}} */
export function summarizeShaftMatrix(shafts, standardLayers) {
  const partition = partitionShaftsByLayer(shafts, standardLayers);
  return { total: shafts.length, accepted: partition.accepted.length, ignored: partition.ignored.length, labeled: partition.accepted.length, manualInputs: 0 };
}

// 職責：建立、檢查與失效化 CAD 框選資料。
// 輸入：框選候選資料與失效原因。
// 輸出：不可變 activeSelection 或 null。

/** 純函式：確認框選是否可啟用 AI。 @param {unknown} selection @returns {boolean} */
export function isSelectionReady(selection) {
  return Boolean(selection?.isReady && selection.objectIds?.length && selection.drawingUnit);
}

/** 純函式：建立不可變的有效框選資料。 @param {object} selection @returns {object|null} */
export function createActiveSelection(selection) {
  if (!selection?.objectIds?.length || !selection.drawingUnit) return null;
  const ignoredObjectIds = Object.freeze([...(selection.ignoredObjectIds ?? [])]);
  return Object.freeze({ ...selection, objectIds: Object.freeze([...selection.objectIds]), ignoredObjectIds, isReady: true });
}

/** 純函式：讓舊框選失效，保留原因供介面說明。 @param {object|null} selection @param {string} reason @returns {object|null} */
export function invalidateSelection(selection, reason) {
  return selection ? Object.freeze({ ...selection, isReady: false, invalidReason: reason }) : null;
}

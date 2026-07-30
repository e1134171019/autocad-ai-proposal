// 職責：提供 D3 圖表共用的 CSS Token 讀取工具。
// 輸入：DOM 元素與 Token 名稱。
// 輸出：瀏覽器計算後的樣式字串、時間或數值。

/** @param {Element} container @param {string} tokenName @returns {string} */
export function readCssToken(container, tokenName) {
  return getComputedStyle(container).getPropertyValue(tokenName).trim();
}

/** @param {Element} container @param {string} tokenName @returns {number} */
export function readDuration(container, tokenName) {
  const rawDuration = readCssToken(container, tokenName);
  return rawDuration.endsWith('ms')
    ? Number.parseFloat(rawDuration)
    : Number.parseFloat(rawDuration) * 1000;
}

/** @param {Element} container @param {string} tokenName @returns {number} */
export function readNumberToken(container, tokenName) {
  return Number.parseFloat(readCssToken(container, tokenName));
}

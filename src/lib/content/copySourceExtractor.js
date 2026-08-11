// 職責：從 JS / Svelte 原始碼抽出可能呈現給使用者看的中文文字片段。
// 輸入：原始碼與副檔名。
// 輸出：去重後的中文文字片段；不解析或執行原始碼。

const HAS_CJK = /[\u3400-\u9fff]/;

function normalize(text) {
  return text.replace(/\\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractQuotedStrings(source) {
  const strings = [];
  const patterns = [
    /'((?:\\.|[^'\\])*)'/g,
    /"((?:\\.|[^"\\])*)"/g,
    /`((?:\\.|[^`\\])*)`/g
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const text = normalize(match[1]);
      if (text && HAS_CJK.test(text)) strings.push(text);
    }
  }

  return strings;
}

function extractSvelteText(source) {
  const visible = source
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/\{[#/:@][^}]*\}/g, ' ')
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/<[^>]+>/g, '\n');

  return visible
    .split(/\n+/)
    .map(normalize)
    .filter((text) => text && HAS_CJK.test(text));
}

export function extractChineseSegments(source, { extension = '.js' } = {}) {
  if (typeof source !== 'string' || source === '') return [];

  const segments = extractQuotedStrings(source);
  if (extension.toLowerCase() === '.svelte') {
    segments.push(...extractSvelteText(source));
  }

  return [...new Set(segments)];
}

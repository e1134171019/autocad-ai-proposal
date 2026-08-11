// 職責：對工程提案文字做 deterministic 文案稽核；只回傳 finding，不自動改寫。
// 輸入：單段文字與 evidence 狀態。
// 輸出：規則、嚴重度、訊息與命中文字。

const WARNING_RULES = Object.freeze([
  {
    rule: 'meta-intro',
    message: '刪除不增加資訊的導讀或轉場，直接進入內容。',
    patterns: [/^接下來[，,]?(?:我們)?(?:就)?/, /^此外[，,]?/, /^值得注意的是/, /^總的來說/, /^綜上所述/]
  },
  {
    rule: 'vague-intro',
    message: '開頭只說「做了設計」但沒有說明差異；直接寫功能或行為。',
    patterns: [/特別針對.{1,30}做了設計/]
  },
  {
    rule: 'wordy-wrapper',
    message: '移除包裝動詞與目的套句，保留真正的動作。',
    patterns: [/為了能夠更好地/, /旨在達到.{1,30}的目的/, /達到.{1,30}的目的/]
  },
  {
    rule: 'binary-frame',
    message: '避免「不是 X，而是 Y」式包裝；直接陳述 Y。',
    patterns: [/不只是.{1,50}而是/, /不僅.{1,50}更(?:是)?/]
  },
  {
    rule: 'buzzword',
    message: '商業或 AI 黑話不能取代具體功能與結果。',
    patterns: [/賦能/, /顛覆/, /無縫/, /卓越/, /打造.{0,20}(?:生態|體驗|價值)/]
  },
  {
    rule: 'weak-verb',
    message: '能直接用動詞時，不使用「進行／加以／實施」包裝。',
    patterns: [/進行(?:分類|整理|確認|計算|分析|檢查|處理|作業)/, /加以(?:整理|確認|分析|改善|檢查)/, /實施(?:改善|調整|檢查)/]
  },
  {
    rule: 'zh-tw-term',
    message: '改用台灣常見繁體中文用語。',
    patterns: [/軟件/, /硬件/, /服務器/, /視頻/, /默認/, /用戶/, /信息化/]
  }
]);

const CLAIM_PATTERN = /(?:降低|減少|提升|提高|加快|縮短|節省|改善|更快|更穩定|更接近平均值)/;
const CLAIM_AS_INTENT_PATTERN = /(?:目標|預期|希望|可望|旨在|設計目標|預期效益)/;

function firstMatch(text, patterns) {
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[0];
  }
  return null;
}

export function auditCopy(text, { evidence = false } = {}) {
  if (typeof text !== 'string' || text.trim() === '') return [];

  const findings = [];

  for (const rule of WARNING_RULES) {
    const match = firstMatch(text, rule.patterns);
    if (!match) continue;
    findings.push({
      rule: rule.rule,
      severity: 'warning',
      message: rule.message,
      match
    });
  }

  const claimMatch = text.match(CLAIM_PATTERN);
  const isIntent = CLAIM_AS_INTENT_PATTERN.test(text);
  if (claimMatch && !evidence && !isIntent) {
    findings.push({
      rule: 'claim-evidence',
      severity: 'error',
      message: '成效主張需要量測或來源；否則改成設計目標或預期效益。',
      match: claimMatch[0]
    });
  }

  return findings;
}

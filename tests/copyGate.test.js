// 職責：驗證 Eden Copy Gate 對工程提案文案的低誤殺、去空話與 claim/evidence 契約。
import { describe, expect, it } from 'vitest';
import { auditCopy } from '../src/lib/content/copyGate.js';
import { preserveCases, rewriteCases, unsupportedClaimCases } from './fixtures/copyGateCases.js';

describe('Eden Copy Gate', () => {
  it.each(preserveCases)('不誤殺應保留的工程句：%s', (text) => {
    expect(auditCopy(text)).toEqual([]);
  });

  it.each(rewriteCases)('命中應精簡的問題族：$rule', ({ text, rule }) => {
    expect(auditCopy(text).map((finding) => finding.rule)).toContain(rule);
  });

  it.each(unsupportedClaimCases)('攔截沒有證據的成效 claim：%s', (text) => {
    const finding = auditCopy(text).find((item) => item.rule === 'claim-evidence');
    expect(finding).toMatchObject({ severity: 'error' });
  });

  it.each(unsupportedClaimCases)('有 evidence 時不再報 claim-evidence：%s', (text) => {
    expect(auditCopy(text, { evidence: true }).map((finding) => finding.rule)).not.toContain('claim-evidence');
  });
});

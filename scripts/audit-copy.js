// 職責：以 audit-only 模式掃描目前網站來源中的繁中提案文字。
// finding 不阻斷 v0.1；讀檔或執行錯誤才回傳非 0。
import fs from 'node:fs';
import path from 'node:path';
import { auditCopy } from '../src/lib/content/copyGate.js';

const TARGETS = [
  'src/lib/content/siteContent.js',
  'src/lib/components/Act03Problem.svelte',
  'src/lib/components/Act05Intelligence.svelte',
  'src/lib/components/Act06Summary.svelte'
];

const HAS_CJK = /[\u3400-\u9fff]/;

function extractChineseStrings(source) {
  const strings = [];
  const patterns = [
    /'((?:\\.|[^'\\])*)'/g,
    /"((?:\\.|[^"\\])*)"/g,
    /`((?:\\.|[^`\\])*)`/g
  ];

  for (const pattern of patterns) {
    for (const match of source.matchAll(pattern)) {
      const text = match[1].replace(/\\n/g, ' ').trim();
      if (text && HAS_CJK.test(text)) strings.push(text);
    }
  }

  return [...new Set(strings)];
}

let findingCount = 0;

for (const relativePath of TARGETS) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const strings = extractChineseStrings(source);

  for (const text of strings) {
    const findings = auditCopy(text);
    for (const finding of findings) {
      findingCount += 1;
      const match = finding.match ? ` | ${finding.match}` : '';
      console.log(`[${finding.severity}] ${relativePath} | ${finding.rule}${match}`);
      console.log(`  ${text}`);
    }
  }
}

console.log(`Copy Gate audit-only: ${findingCount} finding(s).`);
console.log('v0.1 does not fail CI on existing copy; benchmark tests remain blocking.');

// 職責：以 audit-only 模式掃描目前網站來源中的繁中提案文字。
// finding 不阻斷 v0.1；讀檔或執行錯誤才回傳非 0。
import fs from 'node:fs';
import path from 'node:path';
import { auditCopy } from '../src/lib/content/copyGate.js';
import { extractChineseSegments } from '../src/lib/content/copySourceExtractor.js';

const TARGETS = [
  'src/lib/content/siteContent.js',
  'src/lib/components/Act03Problem.svelte',
  'src/lib/components/Act05Intelligence.svelte',
  'src/lib/components/Act06Summary.svelte'
];

let findingCount = 0;

for (const relativePath of TARGETS) {
  const absolutePath = path.resolve(process.cwd(), relativePath);
  const source = fs.readFileSync(absolutePath, 'utf8');
  const segments = extractChineseSegments(source, { extension: path.extname(relativePath) });

  for (const text of segments) {
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

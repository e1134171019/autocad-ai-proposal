// 職責：確保 UX hierarchy 預覽只打包 feature branch build，不觸碰 production Pages。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(resolve(process.cwd(), '.github/workflows/preview-artifact.yml'), 'utf8');

describe('branch preview artifact workflow', () => {
  it('只針對 UX feature branch 打包靜態預覽', () => {
    expect(source).toContain('feat/ux-hierarchy-v2');
    expect(source).toContain('actions/upload-artifact@v4');
    expect(source).toContain('name: ux-hierarchy-v2-preview');
    expect(source).toContain('path: build');
  });

  it('預覽流程不部署 GitHub Pages', () => {
    expect(source).not.toContain('actions/deploy-pages');
    expect(source).not.toContain('pages: write');
  });
});

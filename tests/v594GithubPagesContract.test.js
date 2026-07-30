// 職責：驗證 v5.9.4 GitHub Pages 靜態部署契約。
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const root = process.cwd();
const read = (path) => readFileSync(resolve(root, path), 'utf-8');

describe('v5.9.4 GitHub Pages 部署契約', () => {
  it('依 GitHub 儲存庫名稱建立 SvelteKit base path', () => {
    const config = read('svelte.config.js');
    expect(config).toContain("process.env.GITHUB_REPOSITORY?.split('/')[1]");
    expect(config).toContain("process.env.GITHUB_ACTIONS === 'true'");
    expect(config).toContain('base: githubPagesBase');
    expect(config).toContain('adapter: adapter()');
  });

  it('使用官方 GitHub Pages Actions 建置與部署 build 目錄', () => {
    const workflow = read('.github/workflows/deploy-pages.yml');
    expect(workflow).toContain('actions/checkout@v6');
    expect(workflow).toContain('actions/setup-node@v6');
    expect(workflow).toContain('actions/configure-pages@v5');
    expect(workflow).toContain('actions/upload-pages-artifact@v4');
    expect(workflow).toContain('actions/deploy-pages@v4');
    expect(workflow).toContain('path: build');
    expect(workflow).toContain('pages: write');
    expect(workflow).toContain('id-token: write');
  });
});

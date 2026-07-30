// 職責：設定 SvelteKit 靜態輸出與 GitHub Pages 子路徑。
// 輸入：本機開發環境或 GitHub Actions 提供的儲存庫資訊。
// 輸出：本機使用根路徑，GitHub Pages 使用 /儲存庫名稱。
import adapter from '@sveltejs/adapter-static';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const githubPagesBase = process.env.GITHUB_ACTIONS === 'true' && repositoryName
  ? `/${repositoryName}`
  : '';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    paths: {
      base: githubPagesBase
    }
  }
};

export default config;

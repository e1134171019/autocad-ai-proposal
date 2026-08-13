// 職責：設定 Vite、SvelteKit 與 Vitest。
// 輸入：開發、測試、建置與隔離預覽命令。
// 輸出：統一的工具鏈設定。
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [sveltekit()],
  preview: {
    allowedHosts: ['autocad-act02-live-preview.onrender.com']
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.js']
  }
});

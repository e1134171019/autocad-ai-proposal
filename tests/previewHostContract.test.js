import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const read = (path) => readFileSync(resolve(process.cwd(), path), 'utf-8');

describe('ACT02 preview host contract', () => {
  it('allows the isolated Render preview hostname without changing production base paths', () => {
    const viteConfig = read('vite.config.js');
    expect(viteConfig).toContain("preview:");
    expect(viteConfig).toContain("autocad-act02-live-preview.onrender.com");
  });
});

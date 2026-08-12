import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const htmlPath = join(root, 'prototypes/proposal-compression/index.html');
const cssPath = join(root, 'prototypes/proposal-compression/prototype.css');
const jsPath = join(root, 'prototypes/proposal-compression/prototype.js');
const read = (path) => readFileSync(path, 'utf8');

describe('proposal compression comparison prototype', () => {
  it('is visibly isolated from the formal project', () => {
    const html = read(htmlPath);
    expect(html).toContain('COMPARISON PROTOTYPE');
    expect(html).toContain('formal_project: false');
    expect(html).toContain('./prototype.css');
    expect(html).toContain('./prototype.js');
  });

  it('preserves the six-act order and owner messages', () => {
    const html = read(htmlPath);
    const ids = ['act-01', 'act-02', 'act-03', 'act-04', 'act-05', 'act-06'];
    const positions = ids.map((id) => html.indexOf(`id="${id}"`));
    positions.forEach((position) => expect(position).toBeGreaterThan(-1));
    expect(positions).toEqual([...positions].sort((a, b) => a - b));
    expect(html).toContain('AI 施工圖驗算提案');
    expect(html).toContain('真正問題不是加總，而是哪些物件該算');
    expect(html).toContain('結果怎麼算、AI 助理能做什麼');
    expect(html).toContain('把工程經驗變成可重複的作業規則');
  });

  it('preserves 9 current steps and 12 proposed steps', () => {
    const js = read(jsPath);
    const currentBlock = js.match(/const currentSteps = \[(.*?)\];/s)?.[1] ?? '';
    const proposedBlock = js.match(/const proposedSteps = \[(.*?)\];/s)?.[1] ?? '';
    expect((currentBlock.match(/id:/g) ?? []).length).toBe(9);
    expect((proposedBlock.match(/id:/g) ?? []).length).toBe(12);
  });

  it('keeps proof and responsibility boundaries explicit', () => {
    const html = read(htmlPath);
    expect(html).toContain('Concept Simulation｜提案操作示意');
    expect(html).toContain('不代表 AutoCAD API／實際 DWG 整合已完成');
    expect(html).toContain('人做工程判斷');
    expect(html).toContain('程式做確定性計算');
    expect(html).toContain('AI 協助查詢與解釋');
    expect(html).toContain('Object → Layer → Selection Boundary → Rule → Result → Ignored Reason');
  });

  it('blocks unsupported performance framing', () => {
    const html = read(htmlPath);
    expect(html).toContain('不代表實測工時');
    expect(html).not.toMatch(/節省\s*\d+%|提升\s*\d+%|ROI\s*[:：]?\s*\d+/i);
  });

  it('has responsive and interactive hooks without external dependencies', () => {
    const css = read(cssPath);
    const js = read(jsPath);
    expect(css).toContain('@media');
    expect(js).toContain('renderStepper');
    expect(js).toContain('setActiveSection');
    expect(js).toContain('toggleResponsibility');
    expect(htmlPath).not.toContain('/src/');
  });
});

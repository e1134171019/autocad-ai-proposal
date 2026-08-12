# Proposal Compression Comparison Prototype Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build an isolated, scrollable, interactive comparison prototype that applies the approved Proposal Compression decisions to the six-act AutoCAD proposal without modifying formal `src/**` code.

**Architecture:** Implement a standalone static browser prototype under `prototypes/proposal-compression/` using plain HTML, CSS, and JavaScript. A Vitest contract test validates isolation, six-act ownership, 9/12 workflow preservation, concept/proof boundaries, responsibility separation, and unsupported-claim exclusions. The final handoff also generates a single-file local preview artifact for direct review without deployment.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, existing Vitest runner, existing GitHub Actions Quality Gate.

## Global Constraints

- Artifact classification: `comparison_prototype`.
- `formal_project: false` must remain visibly present in the prototype UI.
- Source baseline: `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`.
- Do not modify `src/**`, `cadSimulator.js`, `CadProcess.svelte`, PR #4, `main`, deployment, or central Drive Skill registration.
- Preserve six-act order `ACT01 → ACT02 → ACT03 → ACT04 → ACT05 → ACT06`.
- Preserve ACT02 exactly 9 meaningful current-workflow steps.
- Preserve ACT04 exactly 12 meaningful proposed-workflow steps.
- ACT04 must visibly remain `Concept Simulation｜提案操作示意`; no production AutoCAD API / real-DWG integration claim.
- ACT03 must not claim measured time savings, ROI, measured error reduction, or production outcome metrics.
- Deterministic program/rule logic owns filtering, classification, length/quantity calculation, and ignored reasons.
- AI Assistant owns query, explanation, summary, and organization of already-calculated results only.
- Human engineering judgment and final confirmation remain explicit.
- Desktop is the primary review target; tablet/mobile must remain readable and usable without horizontal page scrolling.
- No external APIs, authentication, analytics, uploads, persistent state, external assets, or new dependencies.

## File Structure

```text
prototypes/proposal-compression/
  index.html
  prototype.css
  prototype.js

tests/
  proposalCompressionPrototypeContract.test.js

docs/skill-tests/
  2026-08-12-proposal-compression-prototype-review.md
```

A user-visible derivative will be generated after verification at `/mnt/data/proposal-compression-prototype.html` plus `/mnt/data/proposal-compression-prototype.zip`. Those review artifacts are not committed or deployed.

---

### Task 1: Add the prototype contract as RED

**Files:**
- Create: `tests/proposalCompressionPrototypeContract.test.js`

**Interfaces:**
- Consumes: approved design requirements and expected prototype paths.
- Produces: executable contract for isolation, six-act ownership, 9/12 counts, proof boundaries, responsibility boundaries, responsive hooks, and unsupported-claim exclusions.

- [ ] **Step 1: Write the failing test**

Create exactly:

```js
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

  it('contains responsive and interaction hooks', () => {
    const css = read(cssPath);
    const js = read(jsPath);
    expect(css).toContain('@media (max-width: 780px)');
    expect(js).toContain('function renderStepper');
    expect(js).toContain('function setActiveSection');
    expect(js).toContain('function toggleResponsibility');
  });
});
```

- [ ] **Step 2: Run RED**

```bash
npx vitest run tests/proposalCompressionPrototypeContract.test.js
```

Expected: FAIL because `prototypes/proposal-compression/index.html` does not exist. Stop if the failure is unrelated.

- [ ] **Step 3: Commit RED**

```bash
git add tests/proposalCompressionPrototypeContract.test.js
git commit -m "test: define proposal compression prototype contract"
```

---

### Task 2: Build the complete semantic HTML shell and responsive CSS

**Files:**
- Create: `prototypes/proposal-compression/index.html`
- Create: `prototypes/proposal-compression/prototype.css`
- Test: `tests/proposalCompressionPrototypeContract.test.js`

**Interfaces:**
- Consumes: approved six-act content ownership.
- Produces: all required DOM targets for Task 3.

- [ ] **Step 1: Create the HTML document with explicit navigation and section targets**

Use this exact document skeleton, then fill only the named content blocks described immediately after it:

```html
<!doctype html>
<html lang="zh-Hant">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>AI 施工圖驗算提案｜Comparison Prototype</title>
  <link rel="stylesheet" href="./prototype.css" />
</head>
<body>
  <header class="prototype-bar">
    <strong>COMPARISON PROTOTYPE</strong>
    <span>formal_project: false</span>
  </header>

  <nav class="act-nav" aria-label="提案章節">
    <a href="#act-01" data-act="act-01">01 提案</a>
    <a href="#act-02" data-act="act-02">02 現況</a>
    <a href="#act-03" data-act="act-03">03 問題</a>
    <a href="#act-04" data-act="act-04">04 方案</a>
    <a href="#act-05" data-act="act-05">05 規則</a>
    <a href="#act-06" data-act="act-06">06 總結</a>
  </nav>

  <main>
    <section id="act-01" class="act act-hero"></section>
    <section id="act-02" class="act act-workflow"><div id="current-stepper"></div></section>
    <section id="act-03" class="act act-problem"></section>
    <section id="act-04" class="act act-workflow"><div id="proposed-stepper"></div></section>
    <section id="act-05" class="act act-trust"></section>
    <section id="act-06" class="act act-summary"></section>
  </main>

  <script src="./prototype.js"></script>
</body>
</html>
```

Populate the six sections with these exact first-layer messages and required evidence structures:

```text
ACT01
Title: AI 施工圖驗算提案
Lead: 把施工範圍、長度整理、數量清點與結果查詢，整合進既有 AutoCAD 作業流程。
Current row: 繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點
Proposed row: 繪圖 → 框選施工範圍 → 系統依規則整理 → AI 助理查詢 → 人員確認
Bridge: 但真正的問題，不只是把數字加起來。

ACT02
Eyebrow: ACT 02 / CURRENT WORKFLOW
Title: 目前施工圖怎麼完成
Lead: 先看實際作業順序；流程細節直接由下方 9 步互動呈現。

ACT03
Eyebrow: ACT 03 / SCOPE & RISK
Title: 真正問題不是加總，而是哪些物件該算
Lead: 同一張 DWG 可能同時包含不同樓層、區域、版本與參考物件；如果本次範圍沒有先界定，後面的長度與數量就沒有一致的計算基準。
Risk items: 漏算／重複計算；範圍判斷不一致；圖層／尺寸／幾何不一致；不同圖面／區域混算；結果缺乏追溯依據；修改後需要重新複核。
Boundary note: 這裡比較的是作業步驟與風險，不代表實測工時。實際工時差異仍需使用同一張圖面、相同條件量測後確認。

ACT04
Boundary label: Concept Simulation｜提案操作示意
Boundary copy: 以下畫面只用來說明預計的 AutoCAD 操作流程與介面概念，不代表 AutoCAD API／實際 DWG 整合已完成，也不是正式產品驗證結果。
Title: AI 輔助驗算流程怎麼操作
Lead: 保留工程人員的施工判斷與繪圖，把範圍界定、規則計算、結果查詢與確認串成同一套操作流程。

ACT05
Eyebrow: ACT 05 / RESPONSIBILITY & TRACEABILITY
Title: 結果怎麼算、AI 助理能做什麼
Lead: 程式依框選範圍、標準圖層與公司規則計算；AI 助理使用已完成的結果協助查詢、解釋與整理，最後由人員確認。
Responsibility controls: Human；C# / Rule Engine；AI Assistant
Traceability: Object → Layer → Selection Boundary → Rule → Result → Ignored Reason

ACT06
Eyebrow: ACT 06 / ORGANIZATIONAL VALUE
Title: 把工程經驗變成可重複的作業規則
Responsibility line: 人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。
Progression: 經驗規則化 → 作業標準化 → 知識系統化
CTA label: 下一步｜用實際施工圖確認驗證範圍
CTA sequence: 提供實際施工圖 → 確認圖層與計算規則 → 確認驗證範圍 → 比對現行流程與提案結果 → 確認正式開發內容
CTA note: 此區塊是提案下一步，不代表上述驗證工作已完成。
```

Required ACT05 panel targets in HTML:

```html
<div class="responsibility-tabs" role="tablist">
  <button type="button" data-responsibility="human">Human</button>
  <button type="button" data-responsibility="rule">C# / Rule Engine</button>
  <button type="button" data-responsibility="ai">AI Assistant</button>
</div>
<div id="responsibility-detail" class="responsibility-detail" aria-live="polite"></div>
```

- [ ] **Step 2: Create CSS using existing technical-proposal character**

Start with:

```css
:root {
  --bg: #f4f6f8;
  --surface: #ffffff;
  --ink: #111827;
  --muted: #667085;
  --line: #d7dde5;
  --line-strong: #9aa5b1;
  --accent: #2457d6;
  --accent-soft: #eaf0ff;
  --manual: #7a4d16;
  --manual-soft: #f7efe2;
  --max: 1180px;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--ink); font-family: Inter, "Noto Sans TC", system-ui, sans-serif; }
.prototype-bar { position: sticky; top: 0; z-index: 30; display: flex; justify-content: space-between; gap: 16px; padding: 8px 24px; background: #111827; color: white; font-size: 12px; letter-spacing: .08em; }
.act-nav { position: sticky; top: 31px; z-index: 20; display: flex; justify-content: center; gap: 4px; padding: 8px; background: rgba(244,246,248,.96); border-bottom: 1px solid var(--line); backdrop-filter: blur(8px); }
.act-nav a { padding: 8px 10px; color: var(--muted); text-decoration: none; border-bottom: 2px solid transparent; }
.act-nav a.is-active { color: var(--accent); border-bottom-color: var(--accent); }
.act { width: min(var(--max), calc(100% - 48px)); margin: 0 auto; padding: 88px 0; border-bottom: 1px solid var(--line); }
.act-hero { padding-top: 112px; }
.act h1, .act h2 { margin: 0; letter-spacing: -.04em; }
.act h1 { max-width: 850px; font-size: clamp(44px, 7vw, 86px); line-height: 1; }
.act h2 { max-width: 900px; font-size: clamp(32px, 5vw, 58px); line-height: 1.08; }
.section-lead { max-width: 780px; color: var(--muted); font-size: 18px; line-height: 1.75; }
.workflow-compare, .risk-grid, .responsibility-grid, .progression, .cta-sequence { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.stepper-shell { display: grid; grid-template-columns: 280px minmax(0, 1fr); gap: 24px; margin-top: 32px; }
.step-rail { display: grid; align-content: start; gap: 6px; }
.step-rail button { width: 100%; text-align: left; padding: 10px 12px; border: 1px solid var(--line); background: var(--surface); color: var(--muted); cursor: pointer; }
.step-rail button.is-active { border-color: var(--accent); color: var(--accent); background: var(--accent-soft); }
.step-stage { min-height: 420px; padding: 28px; border: 1px solid var(--line-strong); background: var(--surface); }
.step-visual { min-height: 210px; margin: 28px 0; border: 1px solid var(--line); background: linear-gradient(#fff,#f7f9fb); }
.step-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.step-actions button, .responsibility-tabs button { padding: 10px 14px; border: 1px solid var(--line-strong); background: var(--surface); cursor: pointer; }
.step-actions button:disabled { opacity: .4; cursor: default; }
.responsibility-grid { grid-template-columns: repeat(3, 1fr); margin-top: 28px; }
.responsibility-detail { min-height: 170px; padding: 20px; border: 1px solid var(--line); background: var(--surface); }
.cta-block { margin-top: 48px; padding: 28px; border: 1px solid var(--accent); background: var(--accent-soft); }
button:focus-visible, a:focus-visible { outline: 3px solid rgba(36,87,214,.3); outline-offset: 2px; }
@media (max-width: 780px) {
  .prototype-bar { position: relative; padding-inline: 16px; }
  .act-nav { top: 0; justify-content: flex-start; overflow-x: auto; }
  .act { width: min(100% - 32px, var(--max)); padding: 64px 0; }
  .stepper-shell { grid-template-columns: 1fr; }
  .step-rail { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .step-rail button { text-align: center; }
  .responsibility-grid { grid-template-columns: 1fr; }
  .workflow-compare, .risk-grid, .progression, .cta-sequence { grid-template-columns: 1fr; }
}
```

Add only selector rules needed to lay out the exact HTML above. Do not add gradients except the neutral step-stage placeholder surface shown above, and do not add external images or fonts.

- [ ] **Step 3: Run partial test**

```bash
npx vitest run tests/proposalCompressionPrototypeContract.test.js
```

Expected: FAIL only because `prototype.js` is absent or interaction hooks are absent.

- [ ] **Step 4: Commit shell**

```bash
git add prototypes/proposal-compression/index.html prototypes/proposal-compression/prototype.css
git commit -m "feat: add proposal compression prototype shell"
```

---

### Task 3: Implement the exact 9/12 workflow data and interactions

**Files:**
- Create: `prototypes/proposal-compression/prototype.js`
- Test: `tests/proposalCompressionPrototypeContract.test.js`

**Interfaces:**
- Produces `currentSteps`, `proposedSteps`, `renderStepper`, `setActiveSection`, and `toggleResponsibility`.

- [ ] **Step 1: Define current and proposed arrays**

Use exactly:

```js
const currentSteps = [
  { id: 1, label: '建商提供原始 CAD 圖面', owner: '輸入', desc: '先確認本次要處理的樓層與圖面版本。' },
  { id: 2, label: '導入建商圖面與原始圖層', owner: '人工', desc: '保留原始樓層與圖層資料，作為施工範圍判斷與繪圖底圖。' },
  { id: 3, label: '判斷外部與深井的施工範圍', owner: '人工判斷', desc: '由繪圖人員確認建築外部與內部深井的位置。' },
  { id: 4, label: '沿施工範圍繪製線段或聚合線', owner: '人工繪製', desc: '依圖面與施工位置逐段完成施工線。' },
  { id: 5, label: '逐段從性質面板查看長度', owner: '人工查看', desc: '逐段點選線段或聚合線，再從性質面板讀取長度。' },
  { id: 6, label: '逐段建立尺寸與人工記錄', owner: '人工標註', desc: '尺寸線、文字與人工記錄逐筆完成。' },
  { id: 7, label: '人工加總外部與內部深井長度', owner: '人工計算', desc: '依前面記錄的每一段長度逐項加總。' },
  { id: 8, label: '依長度人工換算施工數量', owner: '人工換算', desc: '依公司施工條件換算外部三角補強等構件數量。' },
  { id: 9, label: '調整線條、文字及圖面位置', owner: '人工整理', desc: '最後調整箭頭、文字、尺寸與圖面配置。' }
];

const proposedSteps = [
  { id: 1, label: '建商提供原始 CAD 圖面', owner: '輸入', desc: '平面圖、立面圖與剖面圖仍是流程起點。' },
  { id: 2, label: '啟動外掛並建立標準圖層', owner: '程式', desc: '外掛建立標準圖層，作為後續分類與規則計算的依據。' },
  { id: 3, label: '繪圖人員判斷施工位置', owner: '人工判斷', desc: '工程人員依建商圖面與施工需求判斷外部與深井位置。' },
  { id: 4, label: '使用外掛工具繪製施工範圍', owner: '人工繪製', desc: '繪圖仍由人員完成；AI 不取代施工位置判斷與畫線。' },
  { id: 5, label: '工具帶入標準圖層、顏色與線寬', owner: '程式輔助', desc: '依選用工具套用對應標準圖層與繪圖屬性。' },
  { id: 6, label: '使用專用按鈕完成常用繪圖與標註', owner: '程式輔助', desc: '常用操作集中在外掛工具列，減少重複切換。' },
  { id: 7, label: '框選定義本次計算範圍', owner: '人工界定', desc: '框選決定這一次要納入計算的圖面範圍；標準圖層再控制分類。' },
  { id: 8, label: '規則引擎產生長度與數量結果', owner: 'C# / Rule Engine', desc: '確定性規則先完成篩選、分類、長度加總與數量換算；AI 查詢發生在結果產生之後。' },
  { id: 9, label: '結果保留分類、編號與忽略依據', owner: 'C# / Rule Engine', desc: '長度與元件數量分開整理，未計入物件保留忽略原因與依據。' },
  { id: 10, label: '重新框選並由 AI 助理查詢既有結果', owner: 'AI Assistant', desc: 'AI 助理只使用已完成的計算結果進行查詢、解釋與摘要，不改寫規則引擎的數值。' },
  { id: 11, label: '繪圖人員確認結果', owner: '人工確認', desc: '由人員確認施工範圍、分類、長度與數量結果。' },
  { id: 12, label: '輸出圖面／PDF 與可追溯資訊', owner: '輸出', desc: '保留原始圖面輸出方式，並讓結果能回到物件、圖層、範圍與規則。' }
];
```

- [ ] **Step 2: Define ACT05 responsibility content**

```js
const responsibilityDetails = {
  human: {
    title: 'Human｜工程判斷與確認',
    items: ['判斷施工位置與本次施工範圍', '依圖面完成施工線繪製', '確認系統結果與最終輸出']
  },
  rule: {
    title: 'C# / Rule Engine｜確定性計算',
    items: ['依框選範圍與標準圖層篩選物件', '讀取 CAD 物件與幾何資料', '分類、加總並依公司規則換算數量', '保留計算依據與忽略原因']
  },
  ai: {
    title: 'AI Assistant｜查詢與解釋',
    items: ['查詢已完成的計算結果', '解釋分類、忽略原因與規則', '摘要結果與異常', '整理可追溯／報告說明']
  }
};
```

- [ ] **Step 3: Implement the stepper renderer**

Implement this function shape and behavior:

```js
function renderStepper(rootId, steps, mode) {
  const root = document.getElementById(rootId);
  let activeIndex = 0;

  const render = () => {
    const step = steps[activeIndex];
    const rail = steps.map((item, index) => `
      <button type="button" class="${index === activeIndex ? 'is-active' : ''}" data-step-index="${index}" aria-pressed="${index === activeIndex}">
        ${String(item.id).padStart(2, '0')} ${item.label}
      </button>`).join('');

    root.innerHTML = `
      <div class="stepper-shell ${mode}">
        <div class="step-rail" role="tablist">${rail}</div>
        <article class="step-stage">
          <p class="step-owner">${step.owner}</p>
          <h3>${step.label}</h3>
          <p class="step-desc">${step.desc}</p>
          <div class="step-visual visual-${mode} visual-step-${step.id}" aria-hidden="true"></div>
          <div class="step-actions">
            <button type="button" data-action="prev" ${activeIndex === 0 ? 'disabled' : ''}>上一個</button>
            <span>STEP ${String(step.id).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}</span>
            <button type="button" data-action="next" ${activeIndex === steps.length - 1 ? 'disabled' : ''}>下一個</button>
          </div>
        </article>
      </div>`;

    root.querySelectorAll('[data-step-index]').forEach((button) => {
      button.addEventListener('click', () => {
        activeIndex = Number(button.dataset.stepIndex);
        render();
      });
    });
    root.querySelector('[data-action="prev"]')?.addEventListener('click', () => {
      if (activeIndex > 0) { activeIndex -= 1; render(); }
    });
    root.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      if (activeIndex < steps.length - 1) { activeIndex += 1; render(); }
    });
  };

  render();
}
```

Add CSS classes for proposed steps 7, 8, and 10 so their `.step-visual` visibly differentiates `SELECTION BOUNDARY`, `DETERMINISTIC RESULT`, and `AI QUERY` respectively. Do not add new product behavior.

- [ ] **Step 4: Implement ACT navigation and responsibility detail controls**

```js
function setActiveSection(id) {
  document.querySelectorAll('.act-nav a').forEach((link) => {
    link.classList.toggle('is-active', link.dataset.act === id);
  });
}

function toggleResponsibility(key) {
  const detail = responsibilityDetails[key];
  const root = document.getElementById('responsibility-detail');
  root.innerHTML = `<h3>${detail.title}</h3><ul>${detail.items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
  document.querySelectorAll('[data-responsibility]').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.responsibility === key);
    button.setAttribute('aria-pressed', String(button.dataset.responsibility === key));
  });
}

renderStepper('current-stepper', currentSteps, 'current');
renderStepper('proposed-stepper', proposedSteps, 'proposed');
toggleResponsibility('human');

document.querySelectorAll('[data-responsibility]').forEach((button) => {
  button.addEventListener('click', () => toggleResponsibility(button.dataset.responsibility));
});

document.querySelectorAll('.act-nav a').forEach((link) => {
  link.addEventListener('click', () => setActiveSection(link.dataset.act));
});

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActiveSection(visible.target.id);
}, { threshold: [0.2, 0.45, 0.7] });

document.querySelectorAll('main > section[id]').forEach((section) => observer.observe(section));
setActiveSection('act-01');
```

- [ ] **Step 5: Run GREEN**

```bash
npx vitest run tests/proposalCompressionPrototypeContract.test.js
```

Expected: all prototype contract tests PASS.

- [ ] **Step 6: Commit interaction implementation**

```bash
git add prototypes/proposal-compression/prototype.js prototypes/proposal-compression/prototype.css tests/proposalCompressionPrototypeContract.test.js
git commit -m "feat: add interactive proposal compression workflows"
```

---

### Task 4: Semantic review and evidence document

**Files:**
- Create: `docs/skill-tests/2026-08-12-proposal-compression-prototype-review.md`

**Interfaces:**
- Consumes: verified prototype and current source components.
- Produces: project-level comparison verdict.

- [ ] **Step 1: Review section ownership**

Record explicit PASS/FAIL for:

```text
ACT01: proposal category clear; only teases scope issue.
ACT02: all 9 current steps preserved; wrapper does not restate all steps.
ACT03: owns “哪些物件該算”; visible no-measured-time boundary.
ACT04: all 12 proposed steps preserved; Concept Simulation boundary visible.
ACT05: Human / Rule Engine / AI responsibilities immediately distinguishable.
ACT06: organizational conclusion preserved; CTA explicitly marked as proposed next action.
```

- [ ] **Step 2: Apply `eden-engineering-copy` strict-review criteria**

Hard fail if any of these occur:

```text
deterministic calculation attributed to AI/LLM
measured time saving stated without evidence
ROI / error reduction / customer metric invented
Concept Simulation described as completed AutoCAD API integration
human construction judgment removed
human final confirmation removed
```

- [ ] **Step 3: Write review document**

Use these headings and actual verdict text only; no placeholders:

```markdown
# Proposal Compression Comparison Prototype — Review

## Artifact boundary
## Source baseline
## ACT01 verdict
## ACT02 9-step preservation
## ACT03 ownership / evidence boundary
## ACT04 12-step / Concept Simulation boundary
## ACT05 Human / Rule Engine / AI boundary
## ACT06 organizational conclusion / proposed CTA
## Responsive / interaction review
## Unsupported-claim review
## Scope verification
## Verdict
```

`Verdict: PASS` is allowed only if every check above passes and `src/**` remains unchanged.

- [ ] **Step 4: Commit review evidence**

```bash
git add docs/skill-tests/2026-08-12-proposal-compression-prototype-review.md
git commit -m "docs: review proposal compression comparison prototype"
```

---

### Task 5: Final verification and user-visible preview handoff

**Files:**
- Verify branch diff.
- Generate outside repo: `/mnt/data/proposal-compression-prototype.html`
- Generate outside repo: `/mnt/data/proposal-compression-prototype.zip`

- [ ] **Step 1: Run/fetch full Quality Gate**

Use:

```bash
npm ci
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected:
- offline PASS;
- rules PASS;
- Svelte 0 errors / 0 warnings;
- all Vitest tests including the new prototype contract PASS;
- Copy Gate has no new blocking finding;
- static build PASS;
- existing dependency vulnerability count is reported separately and not modified outside scope.

- [ ] **Step 2: Verify allowed branch paths**

Compare:

```text
e04f1202188bf6894d4d8d4c9dcfa3b579e613e0...comparison/proposal-compression-prototype
```

Only these paths may differ:

```text
docs/superpowers/specs/2026-08-12-proposal-compression-comparison-prototype-design.md
docs/superpowers/plans/2026-08-12-proposal-compression-comparison-prototype.md
prototypes/proposal-compression/index.html
prototypes/proposal-compression/prototype.css
prototypes/proposal-compression/prototype.js
tests/proposalCompressionPrototypeContract.test.js
docs/skill-tests/2026-08-12-proposal-compression-prototype-review.md
```

Any `src/**` change is a hard fail.

- [ ] **Step 3: Generate standalone preview without rewriting content**

Read the final verified HTML/CSS/JS. Replace the stylesheet link with one `<style>` tag containing the exact verified CSS and replace the external script tag with one `<script>` tag containing the exact verified JavaScript. Write the result to:

```text
/mnt/data/proposal-compression-prototype.html
```

- [ ] **Step 4: Generate ZIP bundle**

Zip the exact verified repository files as:

```text
/mnt/data/proposal-compression-prototype.zip
  index.html
  prototype.css
  prototype.js
```

- [ ] **Step 5: Final handoff and stop**

Report the comparison branch, final head SHA, fresh Quality Gate ID/result, prototype-contract result, `src/**` unchanged status, and links to the standalone HTML and ZIP. Do not create a PR, merge, deploy, or apply prototype copy to formal `src/**` without a new explicit user decision.

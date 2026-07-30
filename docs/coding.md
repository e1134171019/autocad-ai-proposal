# 前端開發規範

1. `+page.svelte` 僅組裝元件。
2. Svelte 元件限制 150 行，script、template、style 各控制在 50 行內。
3. D3 以 `(container, data, options) => void` 為統一介面。
4. 色彩、字型、間距與動畫只能使用 CSS Token。
5. 全站採用 Light-first；一般 ACT 禁止使用 `--cad-*` Token。
6. 深色只限 `Act02Flow.svelte` 的 AutoCAD 面板與 `cadSimulator.js`。
7. 正文使用 `--foreground` 或 `--text-secondary`，不得以 opacity 製造低對比文字。
8. 幾何計算與內容資料必須可獨立測試。

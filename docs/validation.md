# 驗證紀錄

## 已在交付環境執行

```text
node scripts/offline-tests.js   PASS
node scripts/verify-rules.js    PASS
全部 JavaScript node --check    PASS
Svelte script 語法抽取         PASS
```

驗證範圍包含：ACT 02 無框選、人工逐段標註、外部段落共用正確 Offset 幾何、模型空間無加總公式；ACT 04 外部 16 段逐筆尺寸、多深井游標動畫、四個標準圖層、25% 動畫加速；STEP 07／08／10 獨立整層框選；STEP 09 白色長方形補強預先存在、編號逐筆顯示、AI RESULTS 完整明細；AI 助理四行補字輸入框、40／60 等高版面與 m／cm／mm 正規化。

## Windows 完整驗證

```powershell
npm.cmd install
npm.cmd run verify:rules
npm.cmd run check
npm.cmd run test
npm.cmd run build
```

不要執行 `npm audit fix --force`，避免套件被升級到不相容版本。

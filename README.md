Wall time: 0.3 seconds
Output:
# AutoCAD × AI 智能作業提案網站

以 Svelte 5、D3 與 Vite 建立的單頁客戶提案。v2.8.4 依 AGENTS v5.9.3 整合人工逐段標註、標準圖層、外部轉角逐段尺寸、多深井游標動畫、整層框選、AI RESULTS 與 AI 助理問答。

## v2.8.4 修改重點

- ACT 06 改為正式「專案總結」，刪除 NEXT STEP、問句、說明與回看按鈕，不再使用行動呼籲收尾。
- 專案總結以「工程經驗規則化 → 作業標準化 → 知識系統化」收斂，並保留公司保存、團隊沿用、程式執行與 AI 使用的最終主句。
- ACT 04 STEP 03～06 重新校正文案：繪圖人員負責工程判斷與逐段繪製，AI 只在物件完成後讀取長度、帶入尺寸並套用標準圖層。
- ACT 04 內文關鍵字依語意配色：人工橘、AI 藍、標準圖層綠；「AI 不代替繪圖」維持深色粗體。
- ACT 02 完全不使用框選；外部逐段選線直接共用正確的 `30 cm` 外擴輪廓。
- ACT 02 的加總公式只出現在右側人工記錄，不再與模型空間底部文字重疊。
- 外部施工輪廓依每個轉角拆成 16 段，每段各有尺寸；外部合計為 `1,000.00 cm`，不再當成一筆圖面尺寸。
- ACT 04 的施工位置先由繪圖人員確認，游標仍逐段繪製；每個外部段或深井完成後，系統立即套用標準圖層並建立尺寸。
- ACT 04 STEP 04 與 STEP 06 都會依序完成多個深井，游標不會只畫一個深井後直接跳出全部結果。
- ACT 04 所有 CAD 動畫在原本 0.5× 基準上加快 25%；ACT 02 保持原速度。
- 「三角補強」使用白色長方形幾何，構件一開始就存在於外部周界；編號 `01～30` 隨外部段落依序顯示。
- STEP 08 點擊「自動計算」後重新框選，結果才逐項出現。
- STEP 09 的 16 段外部長度、六個深井、分類合計、施工總長、補強數量及忽略原因集中在右側 `AI RESULTS`。
- STEP 10 先框選，再解鎖大型四行輸入框並逐字輸入示範問題。
- 桌面版維持 40／60 左右等高；CAD 框架深色、模型空間淺灰，保留實線、隱藏線、中心線與 45° Hatch。

## Windows PowerShell

新電腦若 PowerShell 阻擋 `npm.ps1`／`npx.ps1`，直接使用 `.cmd`：

```powershell
Set-Location "D:/WEB/autocad-ai-proposal"
node --version
npm.cmd --version
npm.cmd install
npm.cmd run verify:rules
npm.cmd run check
npm.cmd run test
npm.cmd run build
npm.cmd run dev -- --host 127.0.0.1 --port 5205 --strictPort --open
```

開啟 `http://127.0.0.1:5205/`。不要執行 `npm audit fix --force`。


## GitHub Pages 公開部署

本專案已設定 GitHub Actions。推送到 `main` 後，工作流程會依序執行安裝、離線契約、規範掃描、Svelte check、Vitest、靜態建置與 GitHub Pages 部署。

專案儲存庫：`e1134171019/autocad-ai-proposal`

公開網址：`https://e1134171019.github.io/autocad-ai-proposal/`

在 GitHub 儲存庫的 `Settings > Pages` 中，將 `Source` 設為 `GitHub Actions`。
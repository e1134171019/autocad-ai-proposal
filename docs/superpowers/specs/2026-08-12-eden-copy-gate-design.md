# Eden 工程提案文案 Skill / Copy Gate 設計

## 目標
建立專案自己的文案品質層，處理繁體中文工程提案的三個問題：AI 套話與冗字、非技術客戶可讀性、無證據成效主張。GPT 保留最終審查權；任何外部 Humanizer 都不直接成為正式標準。

## 邊界
- 不修改 ACT 01～06 現有文案。
- 不新增第三方套件。
- 不用 AI detector 判定作者身分。
- 不自動改寫原始檔案；v0.1 先 audit。
- 技術名詞、數字、圖層、CAD 指令、責任主體屬 protected spans。

## 架構
1. `skills/eden-engineering-copy/SKILL.md`
   - 語意層 SOP：先鎖事實，再判 claim/evidence，再白話化、去 AI 味、精簡，最後 GPT diff review。
   - 只提供判斷與改寫方法，不執行程式掃描。
2. `src/lib/content/copyGate.js`
   - 純函式 deterministic audit。
   - 只標示可機械判斷的問題：AI/官腔短語、空轉導讀、過長句、成效 claim 缺 evidence、台灣常見禁用詞。
   - 不自動重寫。
3. `tests/fixtures/copyGateCases.js`
   - 20 個固定案例：8 preserve、8 rewrite、4 claim/evidence。
4. `tests/copyGate.test.js`
   - 驗證低誤殺、問題命中與 claim gate。
5. `scripts/audit-copy.js`
   - 掃描目前 `siteContent.js` 與 ACT 03/05/06；輸出 finding，不阻斷 v0.1。
6. `.github/workflows/quality-gate.yml`
   - feature branch / PR 執行既有 tests、rules、Svelte check、build 與 Copy Gate tests。

## 規則優先序
1. Fidelity：不得改變事實、數字、版本、圖層、工程責任。
2. Evidence：`提升／降低／加快／更快／更穩定／減少` 等成效詞若是結果敘述，必須有量測或改寫成「設計目標／預期效益」。
3. Plain Speak：客戶應能在會議上重述這句在做什麼、為什麼需要。
4. Anti-slop：刪掉不新增資訊的導讀、總結、行銷語與 AI 套路。
5. Concision：一句一個主要意思；能直接用動詞就不用「進行／加以／實施」。
6. zh-TW：使用台灣工程／軟體慣用詞；不做機械式同義詞輪換。

## Gate 狀態
- v0.1：`audit-only`。現有網站可以有 finding，CI 不因此失敗。
- benchmark：必須全數通過，否則 Copy Gate 實作不合格。
- strict：等 ACT 文案清理完成後另行啟用；不得在本次偷偷切換。

## 成功條件
- 20/20 benchmark 通過。
- 8 個 preserve 案不得被誤報。
- 8 個 rewrite 案至少命中預期問題族。
- 4 個 unsupported claim 全部命中 `claim-evidence`。
- 原有 Vitest、offline tests、rules、Svelte check、build 不退步。

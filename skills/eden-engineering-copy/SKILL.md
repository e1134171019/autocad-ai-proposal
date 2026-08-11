---
name: eden-engineering-copy
description: Use when drafting, rewriting, or reviewing Traditional Chinese engineering proposal copy for clients, especially when the text is too verbose, AI-like, promotional, abstract, or makes benefits claims without clear evidence.
---

# Eden Engineering Copy

## Overview

工程提案文案先保真，再求白話與精簡。目標不是「像人聊天」，而是讓客戶快速看懂：現在怎麼做、問題在哪、方案做什麼、哪些效果已被證明。

## When to Use

適用：網站提案、工程簡報、方案說明、流程比較、功能說明、效益與驗收條件。

不適用：法律條款、逐字引用、程式碼／log、需要文學風格的文章。

## Fixed Order

1. **Fidelity**：圈出 protected spans；不得新增、刪除或改變其意思。
2. **Evidence**：先查成效 claim，再談文筆。
3. **Plain speak**：讓非開發者能重述「做什麼、為什麼需要」。
4. **Anti-slop**：刪不增加資訊的導讀、總結、黑話與宣傳句型。
5. **Concision**：一句只承擔一個主要意思，直接使用動詞。
6. **zh-TW**：採台灣慣用工程／軟體用語，保留必要英文技術名詞。
7. **Diff review**：逐項核對事實與責任主體；GPT 是最終審查者。

不得跳過前兩步去「先潤漂亮」。

## Protected Spans

預設保護：
- 數字、單位、日期、版本、圖號。
- 圖層、CAD 指令、API、UI 名稱、程式識別字。
- 人員責任與人工／AI 分工。
- 引號原文、實驗結果、驗收條件。

缺資料時標示待補，不自行發明。

## Claim / Evidence Gate

看到「降低、減少、提升、提高、加快、縮短、節省、改善、更快、更穩定」等結果語句，先判定：

- 有量測、來源或已驗證結果 → 可寫成結果。
- 只有設計推論 → 改成「設計目標」或「預期效益」。
- 沒有依據 → 刪除或標記待補證據。

禁止為了讓句子更可信而補數字、百分比、工時或客戶回饋。

## Plain Speak Contract

每一段至少回答一個具體問題：
- 現在怎麼做？
- 哪一步容易出錯或花時間？
- 新工具實際做了什麼？
- 人工仍負責什麼？
- 結果怎麼確認？

若一句只能回答「我們很重視／我們做了設計／這很重要」，資訊不足。

## Anti-slop

優先刪或改：
- 「接下來我們來看」「值得注意的是」「綜上所述」。
- 「不只是 X，而是 Y」「不僅 X，更是 Y」。
- 「賦能、顛覆、無縫、卓越」等不能對應具體行為的詞。
- 「進行分類／進行整理」可直接寫「分類／整理」。
- 重複上一句結論的收尾句。

不要為了去 AI 味刻意加口語、故事、情緒、第一人稱或不規則句型。

## Modes

- `audit`：只列問題、證據狀態與建議動作，不改稿。
- `rewrite`：輸出單一推薦版本；只改命中的問題。
- `strict-review`：對外發布前使用；任何 unsupported claim 都是 hard fail。

## Quick Reference

| 問題 | 動作 |
|---|---|
| 沒證據的成效 | 降為目標／預期效益或刪除 |
| 抽象形容詞 | 換成可檢查的功能、條件或結果 |
| 長句塞多件事 | 依動作／條件拆句 |
| 導讀或空總結 | 直接刪 |
| 技術詞太難 | 第一次出現時補一小句白話，不把術語翻掉 |
| 正確工程句 | 不動 |

## Example

原句：`我們特別針對框選功能做了設計。`

改寫：`框選不只用來選取物件，也用來定義本次計算的施工範圍。`

原句：`導入 AI 工具後，處理速度更快。`

沒有工時量測時：`設計目標是減少逐段查值與人工加總的操作。`

## Common Mistakes

- Humanizer 一看到正式句就整段重寫。
- 把「簡短」誤解成刪除必要工程條件。
- 用更漂亮的句子包裝沒有證據的 claim。
- 把所有「AI」工作都寫成 AI 判斷，模糊程式規則與人工責任。
- 每段都補一個總結句，造成重複。

## Mechanical Check

專案若提供 deterministic Copy Gate，先跑 Gate 找機械問題，再由本 Skill 處理語意。Gate 的 finding 是證據，不是最終裁決；GPT 必須做最後 cross-review。

# Git 工作流程

1. 修改前執行 `pnpm check && pnpm test`。
2. 修改後執行 `pnpm verify:rules && pnpm check && pnpm test && pnpm build`。
3. commit 訊息使用動詞開頭，描述單一目的。
4. AGENTS.md 與程式碼同步提交。

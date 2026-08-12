# v5 Proposal Copy — Full Copy Audit

Date: 2026-08-12
Skill: `.agents/skills/proposal-copywriting/SKILL.md`
Mode: audit only; no Svelte copy changed in this pass.

## Executive finding

The v4 six-ACT structure should be retained. v5 does **not** need nine full top-level sections.

The sales argument can be completed by changing the purpose and copy inside the existing six ACTs:

1. AI proposal / category clarity
2. current manual workflow
3. real problem / scope-control insight
4. proposed workflow + concept demo + What You Get
5. Why AI + Engineering Trust
6. commercial next step / PoC CTA

This is shorter, preserves the existing interaction anchors, and avoids turning every sales concept into another full-weight chapter.

## Global message hierarchy

**Recommended category:** `AutoCAD AI 施工圖驗算方案`

**Value proposition:** `把施工範圍、長度整理、數量清點與結果查詢整合進既有 AutoCAD 作業流程。`

**Trust line:** `工程人員決定施工位置；程式依規則計算；AI 協助查詢、解釋與整理結果。`

**Primary commercial next step:** `以實際 DWG 確認需求與 PoC 範圍`

## ACT 01 — Hero / Proposal Overview

### Current

- `AutoCAD 施工圖長度與數量自動驗算`
- `保留繪圖人員的工程判斷，把逐段查看長度、人工加總與數量清點交給外掛處理。`
- Strong problem bridge already present.

### Audit

**Headline: REWRITE**  
Technically clear but does not surface the AI sales proposition.

Recommended:

`AutoCAD AI 施工圖驗算方案`

**Lead: REWRITE**  
The existing sentence jumps immediately to division of labor. Use the first line to explain the offer instead:

`把施工範圍、長度整理、數量清點與結果查詢整合進既有 AutoCAD 作業流程。`

Then a secondary line can carry the responsibility boundary:

`工程人員決定施工位置；程式依規則計算；AI 協助查詢、解釋與整理結果。`

**Before / After workflow: KEEP, adjust labels**  
Keep the comparison because it makes the proposal concrete. Replace generic `導入外掛` with an AI-assisted proposal label that does not imply the LLM calculates geometry.

**Problem bridge: KEEP**  
`真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。` is one of the strongest sales-insight lines on the site.

**Narrative 01–04: CONDENSE**  
The current hero also contains four background articles. Several repeat the same customer need and problem. Keep the useful facts but reduce repetition after the new hero becomes self-explanatory.

**Six-item outline: KEEP AS SECONDARY NAVIGATION**  
Rename items to reflect the commercial story rather than internal document structure.

Recommended labels:

1. AI 提案
2. 目前流程
3. 真正問題
4. 操作示意
5. 結果與 AI
6. 下一步

## ACT 02 — Current Workflow

### Current

`目前貴司工作流程`

Lead explains the real drawing sequence from scope judgment through drawing, dimensioning, summation, and quantity conversion.

### Audit

**KEEP WITH LIGHT EDITING.**

This section performs an important sales function: it proves the proposal understands how the client works today.

Recommended title direction:

`目前施工圖怎麼完成`

Reason: plainer and less formal than `目前貴司工作流程`, while keeping the client-centered perspective.

Do not add AI here. Let the client recognize the status quo first.

## ACT 03 — Problem / Scope Insight

### Current

`現行人工流程與外掛流程差異`

The lead carefully states that the comparison is about steps, not measured time.

### Audit

**REPOSITION.**

The current copy is defensible but reads like a test disclaimer rather than a sales insight.

Recommended section purpose:

`真正問題不是加總，而是這次哪些物件該算`

Use the existing manual-vs-plugin visualization as supporting evidence, but move the no-measured-time caveat into secondary copy.

Keep the evidence rule: no hours saved, percentages, or efficiency claims without measurement.

## ACT 04 — Proposed System / Concept Demo

### Current

- `Concept Simulation｜提案操作示意`
- boundary disclaimer appears before the main solution title;
- title: `本團隊提出的系統方案`;
- lead: `我們把畫線、圖層、標註、框選、分類、加總與查詢整合在 AutoCAD 原生介面中。`

### Audit

**MAJOR COPY REWRITE, KEEP COMPONENT / SIMULATOR.**

Recommended title:

`AutoCAD AI 驗算流程，實際會怎麼操作`

Recommended lead:

`繪圖人員照原本方式完成工程判斷，再用框選範圍、標準圖層與規則計算整理長度和數量；需要查詢或說明時，再由 AI 使用已整理的結果回應。`

**Concept boundary: KEEP BUT DEMOTE VISUALLY / NARRATIVELY.**  
The disclosure is required, but it should support trust rather than become the first message in the section.

### Add inside ACT 04 — What You Get

Do not create a new top-level ACT. Add a compact capability block after or around the concept workflow:

- 施工範圍驗算
- 長度自動整理
- 元件數量清點
- 異常 / 忽略物件提示
- 結果追溯
- AI 自然語言查詢
- 修改後重新驗算
- 結果紀錄 / 報表

Label these as **提案能力 / 預計範圍**, not deployed production features.

## ACT 05 — Why AI + Engineering Trust

### Current

`計算依據與結果確認`

The section starts with deterministic scope / Rule Engine responsibility and then explains the AI Assistant. Traceability is strong and should remain.

### Audit

**KEEP TECHNICAL CONTENT; CHANGE SALES ENTRY POINT.**

Do not remove the Rule Engine / AI separation. Instead add a short buyer-facing `Why AI` layer before the technical responsibility split.

Recommended buyer-facing message:

`AI 的價值不是重新算一次，而是讓已整理的圖面結果可以直接查、問、解釋與摘要。`

Concept query examples:

- `6F 外部施工範圍總長多少？`
- `哪些物件沒有被納入？`
- `為什麼這一段被忽略？`
- `幫我整理這次修改的結果差異。`

Then retain the engineering trust message:

`精確長度、數量與圖層條件由工程規則計算；AI 使用這些結果協助互動與說明。`

**Traceability: KEEP.**  
Object → Layer → Selection Boundary → Rule → Result → Ignored Reason is the main reason a technical buyer can trust the proposal.

## ACT 06 — Commercial Next Step

### Current

The component explicitly says it contains no CTA and ends as an engineering summary.

### Audit

**REWRITE PURPOSE.**

A sales proposal should not end with only a philosophical summary.

Recommended title:

`下一步｜用一張實際 DWG 確認 PoC 範圍`

Recommended short sequence:

`提供實際施工圖`
→ `確認圖層與計算規則`
→ `確認 PoC 範圍`
→ `比對人工流程與提案結果`
→ `確認正式開發內容`

Keep one short responsibility/trust line from the current summary, but remove repetitive systemization language if it delays the next action.

Primary CTA direction:

`以實際 DWG 確認需求與 PoC 範圍`

No price, fixed timeline, ROI, or accuracy promise should be inserted unless separately approved and evidenced.

## Navigation

Current:

`提案概要 / 目前流程 / 流程差異 / 操作示意 / 計算依據 / 專案總結`

Recommended conversion-oriented labels while preserving six anchors:

`AI 提案 / 目前流程 / 真正問題 / 操作示意 / 結果與 AI / 下一步`

## Specific keep / rewrite / remove summary

### Keep

- current manual workflow evidence;
- strongest scope-control problem statement;
- CAD concept simulator;
- Concept Simulation boundary;
- deterministic C# / Rule Engine responsibility;
- AI Assistant responsibility;
- traceability chain;
- v4 restrained visual hierarchy and semantic CAD colors.

### Rewrite

- Hero category / lead;
- ACT03 entry message;
- ACT04 generic system title and lead;
- ACT05 entry message so AI value appears before technical detail;
- ACT06 from summary-only to commercial next step;
- semantic nav labels.

### Condense

- repeated hero background paragraphs;
- repeated systemization language in ACT06;
- disclaimers that currently lead a section instead of supporting it.

### Do not introduce

- fabricated social proof;
- customer logos without permission/evidence;
- fixed ROI or time saved;
- unsupported efficiency / accuracy percentages;
- `AI 自動判讀所有圖面` style claims;
- claims that the concept simulator is a completed production plugin.

## Audit verdict

The existing v4 UI structure is usable for v5. The conversion problem is primarily **message purpose and sequence**, not a need for nine new page sections.

Recommended implementation scope for v5:

- preserve six ACT anchors and v4 visual system;
- rewrite sales entry points;
- add What You Get inside ACT04;
- add Why AI inside ACT05;
- turn ACT06 into the PoC / DWG next-step close;
- keep all deterministic responsibility and concept-simulation boundaries intact.

# Proposal Copywriting Skill — GREEN Application

Date: 2026-08-12
Project: AutoCAD AI Proposal
Branch: feat/ux-hierarchy-v2
Skill: `.agents/skills/proposal-copywriting/SKILL.md`

## 1. Positioning brief

### Buyer / audience

- Primary commercial reader: the client deciding whether this AutoCAD workflow proposal is worth continuing into a paid project / PoC discussion.
- Daily user: AutoCAD drawing staff who currently inspect, record, sum, count, and re-check drawing information.
- Technical reviewer: anyone who needs to know whether AI is being used responsibly and whether exact results remain traceable.

### Status quo

The existing workflow requires drawing staff to identify the relevant drawing / floor / construction area, inspect segments, view lengths, record values, sum lengths, convert or count construction items, and review the result.

### Core problem

The strongest local problem statement already exists:

> 真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。

One DWG can contain multiple floors, areas, views, versions, reference objects, and temporary content. The proposal must therefore sell scope control and reliable result organization, not merely arithmetic automation.

### Primary value

Bring repetitive verification work and result organization into the AutoCAD workflow while keeping human engineering judgment in control.

### Differentiated approach

The proposal combines:

- human selection / engineering judgment;
- standard layers and object rules;
- deterministic C# / Rule Engine calculation;
- structured, traceable results;
- AI-assisted querying, explanation, summarization, and workflow interaction.

### Proof status

- Existing website simulator: proposal-stage concept simulation.
- Real production AutoCAD API / DWG integration: not claimed as complete.
- Exact efficiency, time saved, error reduction, ROI, and customer-result metrics: not evidenced and therefore not usable as claims.

### Primary conversion goal

Move the client to the next concrete commercial/technical step:

`以實際 DWG 確認需求與 PoC 範圍`

## 2. Message ladder

**Category**  
AutoCAD AI 施工圖驗算方案

**Value proposition**  
把施工範圍、長度整理、數量清點與結果查詢整合進既有 AutoCAD 作業流程。

**Pillar 1 — 少做重複驗算工作**  
將逐段查看、記錄、加總、清點與結果整理集中到同一套流程。

**Pillar 2 — 先界定這次真正要算的內容**  
用施工範圍、標準圖層與物件規則避免不同樓層、版本或參考物件混入同一次計算。

**Pillar 3 — AI 讓結果更容易查與理解**  
AI 用於查詢、解釋與摘要已整理的結果；精確數值仍由確定性工程規則產生。

**Proof / trust layer**  
Object → Layer → Selection Boundary → Rule → Result → Ignored Reason → Human confirmation.

## 3. Headline matrix

Scores: 1–5 for clarity / relevance / value / differentiation / credibility / conversion fit.

| ID | Frame | Headline | Mechanism subheadline | CTA direction | Scores | Total | Claim risk |
|---|---|---|---|---|---|---:|---|
| A | Category clarity | **AutoCAD AI 施工圖驗算方案** | 把施工範圍、長度整理、數量清點與結果查詢整合進既有 AutoCAD 作業流程。 | 以實際 DWG 確認 PoC 範圍 | 5/5/4/4/5/5 | 28 | Low; AI role must be explained below |
| B | Pain | **不用再逐段點線、記錄、加總** | 由框選範圍與工程規則整理長度與數量，再用 AI 協助查詢與說明結果。 | 看提案流程 | 4/5/5/4/5/4 | 27 | Medium; may imply all manual work disappears |
| C | Outcome | **讓施工圖驗算直接留在 AutoCAD 裡完成** | 從範圍界定、長度與數量整理，到結果查詢與確認，集中在同一套作業流程。 | 確認實際 DWG 流程 | 5/5/5/3/5/5 | 28 | Low; AI is less prominent in headline |
| D | Differentiated approach | **工程規則負責算，AI 負責查與解釋** | 精確長度與數量依 CAD 物件和公司規則計算；AI 協助使用者理解與查詢結果。 | 查看計算依據 | 4/4/4/5/5/3 | 25 | Low; too technical for primary hero |
| E | Technology frame | **AutoCAD × AI｜施工圖驗算工作流程** | 將框選、標準圖層、規則計算、結果整理與 AI 互動串成一套提案流程。 | 查看操作示意 | 5/5/4/4/5/4 | 27 | Low; sounds more like a concept than a commercial offer |
| F | Problem insight | **不是把數字加起來，而是先算對範圍** | 先界定樓層、施工區域與有效物件，再依規則整理長度、數量與忽略原因。 | 看系統怎麼判斷 | 4/5/5/5/5/4 | 28 | Low; strong section headline, weaker category identification |

## 4. Recommendation

### Recommended primary hero

**Headline**  
`AutoCAD AI 施工圖驗算方案`

**Subheadline**  
`把施工範圍、長度整理、數量清點與結果查詢整合進既有 AutoCAD 作業流程。`

**Supporting line**  
`工程人員決定施工位置；程式依規則計算；AI 協助查詢、解釋與整理結果。`

**Primary commercial CTA direction**  
`以實際 DWG 確認需求與 PoC 範圍`

### Why this beats `AutoCAD AI 智慧驗算方案`

`智慧驗算` is compact but underspecified. It does not tell a first-time buyer whether the proposal concerns drawings, quantities, rules, AI chat, or a generic automation product. `施工圖驗算` names the real work category and leaves AI as the differentiating technology layer.

The more distinctive lines should be used lower in the page:

- Problem insight: `真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。`
- Trust message: `工程規則負責算，AI 負責查與解釋。`

## 5. Recommended page argument

1. **Hero — AutoCAD AI 施工圖驗算方案**
2. **目前怎麼做 — 逐段查看、記錄、加總、清點、複核**
3. **真正難點 — 這次哪些物件應該算**
4. **提案流程 — 人員判斷 → 框選 → 規則整理 → AI 查詢 → 人員確認**
5. **Concept Demo — 讓客戶看到買到後可能怎麼操作**
6. **What You Get — 清楚列出提案能力與交付方向**
7. **Why AI — 查詢、解釋、摘要、修改差異等互動價值**
8. **Engineering Trust — deterministic calculation + traceability**
9. **Next Step — 以實際 DWG 確認需求與 PoC 範圍**

## 6. Claim-risk list

Do not write the following without new evidence:

- fixed efficiency improvement percentages;
- fixed time saved;
- fixed error reduction;
- production-ready / already integrated claims;
- claims that the LLM itself measures exact CAD geometry;
- fabricated testimonials or customer results;
- guaranteed implementation time or ROI.

## 7. GREEN verdict

The new skill changed the behavior that failed in RED:

- it did not accept the first AI-sounding headline;
- it established positioning before copy;
- it generated six controlled headline frames;
- it separated AI sales value from deterministic engineering responsibility;
- it selected a winner using explicit criteria;
- it retained unresolved proof gaps instead of inventing evidence.

Result: **GREEN for the current project application.**

# Proposal Conversion v5 — Design Spec

Date: 2026-08-12
Project mode: existing_change
Branch: feat/ux-hierarchy-v2
Formal project: true
Production main modified: false
Production deploy: false

## 1. Purpose

The website is primarily a sales proposal used to help win an AutoCAD AI project, not a finished-product manual or proof that every capability already exists.

v5 keeps the visual hierarchy improvements from v4, but changes the persuasion model so AI is again a first-class sales concept while deterministic engineering logic remains visible where trust and technical credibility matter.

Core positioning:

> Front stage sells the value of an AutoCAD AI workflow. Back stage explains that exact geometry, length, quantity, layer filtering, and calculation are produced by deterministic C# / Rule Engine logic, while AI assists with interaction, querying, explanation, summarization, and workflow guidance.

## 2. Evidence basis

The direction has already been cross-checked through independent research paths before this spec:

- Figma independent information-architecture exploration.
- Hybrid MCP Gateway independent UX diagnosis.
- Exa review of current enterprise AI product positioning, including OpenAI, Google Cloud, Salesforce, Anthropic, SAP, Autodesk, and Siemens patterns.
- Tavily review of B2B AI sales and trust patterns.
- Sider Scholar review of explainability, human oversight, and trustworthy AI research.

The converged lesson is not "hide AI" and not "call every operation AI". The proposal should use AI as a high-level value proposition while retaining explicit human oversight and traceable rule-based computation.

## 3. Options considered

### Option A — AI-first marketing page

AI dominates the hero, every workflow step, and most capability copy.

Pros:
- Strong perceived innovation.
- Easy to communicate novelty.

Cons:
- High risk of AI-washing.
- Can falsely imply that LLMs perform exact CAD geometry calculations.
- Weakens engineering credibility with technical buyers.

Decision: reject as the formal direction.

### Option B — Engineering-first proposal

Lead with Rule Engine, layers, selection boundary, traceability, and implementation architecture.

Pros:
- Technically precise.
- Easy to defend in engineering review.

Cons:
- Too much internal architecture for the first minute.
- Weak sales narrative.
- Makes the proposal feel like a specification rather than a reason to buy.

Decision: reject as the primary narrative.

### Option C — AI-front / rules-back conversion proposal

Use AI as the proposal's first-class sales concept, but separate customer-facing value from implementation responsibility.

Pros:
- Strong sales positioning.
- Preserves technical truth.
- Supports both business and engineering readers.
- Matches the project's actual planned architecture.

Decision: selected.

## 4. Core message hierarchy

The customer should understand these messages in this order:

1. This is an AutoCAD AI-assisted verification proposal.
2. The current workflow contains repetitive manual checking, recording, summing, counting, and review.
3. The deeper problem is deciding which objects belong in the current calculation scope.
4. The proposed workflow integrates selection scope, standard-layer rules, deterministic calculation, result organization, and AI-assisted querying/explanation.
5. The customer receives concrete workflow capabilities, not merely an AI chat box.
6. AI adds value because it can help users query, understand, summarize, and interact with calculated results in natural language.
7. Exact numerical results remain grounded in deterministic rules and traceable CAD objects.
8. The next commercial step is to confirm scope with a real DWG / PoC discussion.

## 5. Information architecture

v5 keeps the existing single-page Svelte implementation and avoids a large component rewrite unless required by the new narrative.

### Section 1 — Hero / AI solution proposition

Primary title direction:

`AutoCAD AI 智慧驗算方案`

Required supporting copy must immediately explain what the proposal handles, for example:

`把施工範圍、長度整理、數量清點與結果查詢整合進 AutoCAD 作業流程。`

The hero must retain the existing current-vs-proposed workflow comparison, but the proposed workflow should be described as an AI-assisted solution without claiming that AI alone performs precise geometry calculations.

Required first-screen outcome:

A customer should be able to answer within roughly 5–10 seconds:

> 這是一個用 AI 包裝並整合 AutoCAD 施工圖驗算流程的提案。

### Section 2 — Current pain / workflow

Show the current manual sequence clearly:

`繪圖 → 點線 → 看長度 → 記錄 → 加總 → 清點 → 複核`

The copy should make the customer recognize the existing work rather than immediately introducing implementation terms.

### Section 3 — Problem insight

Keep and elevate the strongest problem statement:

`真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。`

Explain that one DWG can contain multiple floors, areas, versions, formal objects, reference objects, and temporary content.

This section should function as sales insight: it demonstrates understanding of the customer's real workflow problem.

### Section 4 — AI-assisted solution workflow

Present the proposal as one integrated solution:

`工程人員判斷與繪圖`
→ `框選本次施工範圍`
→ `標準圖層 / 物件規則`
→ `長度、數量、異常整理`
→ `AI 查詢與說明`
→ `人員確認`

Customer-facing copy may call the overall flow an AI-assisted verification workflow.

Technical attribution must remain accurate:
- Selection boundary defines the calculation scope.
- Layer/object rules determine eligible objects.
- C# / deterministic logic calculates exact lengths and quantities.
- AI / LLM queries and explains structured results.

### Section 5 — Concept Demo

Keep the CAD simulator as a major visual sales asset.

Positioning:

`AI Workflow Concept`
`AutoCAD 操作流程示意`

The demo should help the customer imagine the future workflow:

`框選 → 系統處理 → Results Panel → AI 查詢 → 結果說明`

Required boundary copy:

The visual is a proposal-stage concept simulation. It must not claim completed AutoCAD API integration, real DWG production integration, or a fully delivered plugin.

This disclosure should be visible but visually secondary; it must not dominate the sales message.

### Section 6 — What You Get

Add or restructure a customer-facing deliverables/capability section answering:

> 我花錢之後得到什麼？

Candidate capability set:

- 施工範圍驗算
- 長度自動整理
- 元件數量清點
- 異常 / 忽略物件提示
- 結果追溯
- AI 自然語言查詢
- 修改後重新驗算
- 結果紀錄 / 報表

These are proposal capabilities / intended scope. They must not be described as already deployed unless repository evidence supports that claim.

### Section 7 — Why AI

Create a clear reason why this is more than a conventional fixed-command AutoCAD plugin.

The strongest AI value is natural-language interaction with structured results and workflow context.

Example query patterns may include:

- `6F 外部施工範圍總長多少？`
- `哪些物件沒有被納入？`
- `為什麼這一段被忽略？`
- `幫我整理這次修改的結果差異。`

The examples are interaction concepts, not claims that the current deployed system already supports every query.

### Section 8 — Engineering Trust

This section is deliberately later in the page and visually smaller than the main sales proposition.

Core sentence:

`AI 負責互動、理解與說明；精確長度、數量與圖層條件由工程規則計算。`

Retain traceability:

`Object → Layer → Selection Boundary → Rule → Result → Ignored Reason`

Human confirmation remains the final authority.

### Section 9 — Commercial next step / CTA

The current ending should become commercially actionable rather than simply concluding the document.

Primary next-step direction:

`下一步｜以實際 DWG 確認需求與 PoC 範圍`

Suggested sequence:

`提供實際施工圖`
→ `確認圖層與計算規則`
→ `確認 PoC 範圍`
→ `比對人工流程與提案結果`
→ `確認正式開發內容`

The CTA is an invitation to continue the sales / technical discovery process. It must not promise fixed savings, fixed accuracy, or fixed implementation time unless separately evidenced.

## 6. Visual system

v5 does not replace v4's visual system.

Keep:
- warm-white / white narrative surfaces;
- near-black / dark-gray primary text;
- proposal blue as the primary narrative accent;
- reduced ordinary section-title scale;
- unequal XL / L / M / S section weights;
- neutral ordinary prose;
- CAD semantic colors only where they encode real layer/status/selection/warning/error meaning;
- technical teal only where it carries real technical meaning.

Do not reintroduce:
- AI = blue keyword coloring everywhere;
- manual = orange keyword coloring;
- standard layer = green keyword coloring;
- decorative red risk numbering;
- all sections at 100vh.

AI should become more prominent through hierarchy, wording, demo sequence, and section purpose — not by coloring every occurrence of the word AI.

## 7. Mobile requirements

Mobile remains a separate reading experience, not a scaled desktop page.

Requirements:
- Hero must identify the AutoCAD AI proposal in the first viewport.
- Navigation remains semantic, not bare 01–06 numbering.
- Current workflow and AI-assisted workflow stack vertically with clear labels.
- What You Get capabilities must scan quickly without a long wall of cards.
- Why AI example queries should be readable as compact conversation/query examples.
- CAD concept visualization must not force the full desktop simulator width into the mobile viewport.
- Trust / traceability remains compact and later in the page.
- Commercial CTA must be easy to find near the ending.

## 8. Claims and evidence policy

Allowed positioning:
- `AutoCAD AI 智慧驗算方案`
- `AI 輔助驗算流程`
- AI assists querying, explanation, summarization, and workflow interaction.
- deterministic C# rules perform exact geometry / length / quantity calculations.
- the simulator is a concept demonstration.

Disallowed without new evidence:
- fixed efficiency improvement percentages;
- fixed hours saved;
- fixed error-rate reduction;
- claims that the displayed concept simulator is already a production AutoCAD integration;
- claims that the LLM itself measures exact CAD geometry;
- invented customer adoption/results;
- claims that every proposed capability is already implemented.

## 9. Implementation boundaries

In scope:
- existing Svelte proposal page content hierarchy;
- section ordering / emphasis changes required for the sales narrative;
- customer-facing proposal copy;
- Hero positioning;
- AI solution workflow presentation;
- What You Get section;
- Why AI section;
- Engineering Trust positioning;
- commercial PoC / scope-confirmation CTA;
- mobile layout adjustments caused by these changes;
- tests and Copy Gate updates necessary to protect the new narrative.

Out of scope:
- merging PR #2;
- production deployment;
- C# AutoCAD plugin implementation;
- real DWG parsing/integration;
- Ollama runtime implementation;
- rewriting CAD calculation algorithms;
- dependency/security remediation;
- README/version cleanup;
- AGENTS/Drive governance reconciliation;
- pricing quotation;
- unsupported ROI claims.

## 10. TDD / validation contract

Before implementation, add failing contract tests covering at minimum:

1. Hero contains the approved AI solution proposition.
2. First-screen supporting copy states the concrete workflow value.
3. Strong problem statement remains present.
4. Overall solution distinguishes AI-assisted workflow from deterministic exact calculation.
5. What You Get contains the approved capability categories.
6. Why AI contains natural-language query/explanation value.
7. Concept simulation boundary remains present.
8. Engineering Trust retains Rule Engine responsibility and traceability.
9. Ending contains a PoC / real-DWG commercial next step.
10. No unsupported time/efficiency percentage claim is introduced.
11. Existing CAD selection, layer filtering, length/quantity, simulator, and Copy Gate contracts continue to pass.

Full verification remains:

- `npm run test:offline`
- `npm run verify:rules`
- `npm run check`
- `npm test`
- `npm run audit:copy`
- `npm run build`

## 11. Preview and approval boundary

After GREEN verification:

- produce branch-only Desktop and Mobile previews from the actual static build;
- keep PR #2 Draft;
- do not merge or deploy;
- present the v5 preview for final user review;
- integration requires a separate explicit approval.

## 12. Success criteria

v5 is successful when a customer can quickly understand all of the following without reading an engineering specification first:

1. This is an AutoCAD AI solution proposal.
2. It targets repetitive manual verification and counting work.
3. The difficult part is defining what belongs in the current calculation scope.
4. The proposed solution combines engineering rules with AI-assisted interaction.
5. The customer can identify what capabilities are being proposed.
6. The customer can see how AI adds value beyond a fixed-command plugin.
7. A technical reviewer can still see how exact numbers remain controlled and traceable.
8. The page ends with a clear next commercial step toward DWG / PoC scope confirmation.

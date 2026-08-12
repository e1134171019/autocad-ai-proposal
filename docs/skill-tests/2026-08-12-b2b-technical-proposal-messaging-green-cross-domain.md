# B2B Technical Proposal Messaging — GREEN Application: Cross-Domain

Date: 2026-08-12  
Skill: `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`  
Test type: synthetic cross-domain control  
Domain: industrial IoT / machine-condition workflow

## 1. Synthetic test data

The following fixture is synthetic test data and is not a customer claim or production system:

> Asset: existing B2B industrial IoT proposal website.  
> Reader: factory maintenance manager; technical reviewer: controls engineer.  
> Current workflow section: technician reads three machine sensors, records values in a spreadsheet, compares each value to a fixed engineering threshold, then writes a shift note.  
> Proposed workflow section: gateway collects the same sensor values; deterministic rules evaluate fixed thresholds; an AI assistant queries the stored results and drafts a plain-language shift summary; technician confirms the summary.  
> Interactive evidence: a four-step simulator shows sensor acquisition → threshold evaluation → flagged result → AI summary.  
> Claim conflict: hero says “find failures faster”; evidence section says no measured detection-time study has been completed.  
> Proof status: simulator only; no production deployment claim.

## 2. Source / version readout

Because this is synthetic test data, there is no repository version. The complete fixture above is the source boundary. No missing implementation, customer data, measured timing, or deployment state is inferred beyond it.

## 3. Content Model

### Section A — Hero

**Current purpose**  
Position the proposal around machine-condition monitoring and faster failure finding.

**Source facts**  
The hero contains the claim `find failures faster`.

**Interaction / evidence**  
None specified in the hero.

**Claims / proof status**  
The speed claim conflicts with the evidence section, which explicitly says no measured detection-time study exists.

**Responsibility actors**  
Not yet explicit in the hero.

**Evidence gap**  
No measured detection-time improvement.

### Section B — Current workflow

**Current purpose**  
Show the existing maintenance process.

**Source facts / meaningful steps**

1. Technician reads three machine sensors.
2. Technician records values in a spreadsheet.
3. Technician compares each value with a fixed engineering threshold.
4. Technician writes a shift note.

**Interaction / evidence**  
No separate interaction specified.

**Responsibility actors**  
Technician performs acquisition review, comparison, and reporting manually.

### Section C — Proposed workflow

**Current purpose**  
Show the proposed operating mechanism.

**Source facts**

- Gateway collects the same sensor values.
- Deterministic rules evaluate fixed thresholds.
- AI assistant queries stored results and drafts a plain-language shift summary.
- Technician confirms the summary.

**Responsibility actors**

- Gateway: data collection.
- Deterministic rules: threshold evaluation.
- AI assistant: query and language summary.
- Technician: confirmation.

**Claim boundary**  
The fixture does not support autonomous diagnosis, guaranteed fault prediction, or AI-based threshold calculation.

### Section D — Interactive simulator

**Current purpose**  
Explain the proposal flow visually.

**Source facts / four steps**

1. Sensor acquisition.
2. Threshold evaluation.
3. Flagged result.
4. AI summary.

**Interaction / evidence**  
The simulator is semantic evidence for workflow order, not proof of production deployment or measured business impact.

### Section E — Evidence / proof

**Current purpose**  
Set proof boundaries.

**Source facts**

- No measured detection-time study has been completed.
- Simulator only.
- No production deployment claim.

**Contradiction**  
Hero's `find failures faster` wording is unsupported as a measured result.

## 4. Positioning Snapshot

- **Buyer / decision-maker:** factory maintenance manager.
- **End user:** maintenance technician.
- **Technical reviewer:** controls engineer.
- **Status quo:** manual sensor reading → spreadsheet recording → fixed-threshold comparison → manual shift note.
- **Customer problem:** repeated handling and interpretation are split across acquisition, spreadsheet comparison, and reporting.
- **Consequence:** the fixture supports workflow fragmentation as a process problem; it does not provide quantified cost, downtime, or detection-delay evidence.
- **Primary value:** centralize acquisition results, deterministic threshold evaluation, and explainable shift-summary preparation while keeping technician confirmation.
- **Differentiated mechanism:** gateway collection + deterministic rules + structured result state + AI language summary + human confirmation.
- **Proof status:** concept simulator; timing improvement unknown; production deployment unknown/not claimed.
- **Commercial next action:** unknown from source. Do not invent a demo/PoC CTA as current content.

## 5. Narrative Map

1. **Hero** — `這個提案要改變哪一段維護工作？`  
   Exit: understand that the proposal connects sensor results, rule evaluation, and shift-summary preparation.
2. **Current workflow** — `現在技術員怎麼完成這件事？`  
   Exit: understand the four-step manual chain.
3. **Proposed workflow** — `哪些工作由系統處理、哪些仍由人確認？`  
   Exit: understand collection/rule/AI/human separation.
4. **Interactive simulator** — `流程實際會怎麼走？`  
   Exit: see acquisition → threshold → flag → summary sequence.
5. **Evidence** — `哪些效果已經被證明？`  
   Exit: know that the concept exists but measured speed and production deployment are not proven.

## 6. Section Content Contracts

### Hero

- **Section Purpose:** establish proposal category and mechanism without unsupported speed claims.
- **Reader Question:** what is being proposed?
- **Source Facts:** industrial maintenance workflow; unsupported `faster` claim.
- **Interaction / Evidence:** none at hero level.
- **Core Message:** connect machine sensor results, fixed engineering rules, and AI-assisted shift summaries in one review flow.
- **Body Structure:** category → mechanism → human confirmation boundary.
- **Proof / Claim Boundary:** remove or downgrade measured-speed implication.
- **Takeaway:** system organizes the workflow; evidence does not yet prove faster detection.

### Current workflow

- **Section Purpose:** establish current-state credibility.
- **Reader Question:** how is this work done now?
- **Source Facts:** read → record → threshold compare → note.
- **Interaction / Evidence:** source process description.
- **Core Message:** technicians manually bridge sensor readings, rule comparison, and reporting.
- **Body Structure:** preserve four meaningful steps.
- **Proof / Claim Boundary:** no quantified inefficiency.
- **Takeaway:** current work is fragmented across several manual handoffs.

### Proposed workflow

- **Section Purpose:** explain responsibility separation.
- **Reader Question:** what does each system actor actually do?
- **Source Facts:** gateway collects; deterministic rules evaluate; AI summarizes; technician confirms.
- **Interaction / Evidence:** simulator sequence supports order.
- **Core Message:** fixed engineering decisions remain deterministic; AI handles language interaction, not threshold logic.
- **Body Structure:** collection → rule evaluation → result → AI summary → confirmation.
- **Proof / Claim Boundary:** no autonomous AI diagnosis claim.
- **Takeaway:** AI explains structured results rather than replacing engineering thresholds.

### Interactive simulator

- **Section Purpose:** make the proposed flow concrete.
- **Reader Question:** how does data move through the proposed process?
- **Source Facts:** four simulator steps.
- **Interaction / Evidence:** simulator itself.
- **Core Message:** flagged results are produced before the AI summary stage.
- **Body Structure:** one step = one responsibility transition.
- **Proof / Claim Boundary:** concept demonstration only.
- **Takeaway:** the workflow order makes the deterministic/AI boundary visible.

### Evidence

- **Section Purpose:** establish credibility limits.
- **Reader Question:** what has actually been demonstrated?
- **Source Facts:** no timing study; simulator only; no production claim.
- **Interaction / Evidence:** stated proof boundary.
- **Core Message:** current evidence proves the proposal concept, not business performance.
- **Body Structure:** demonstrated → not measured → not deployed.
- **Proof / Claim Boundary:** hard stop on speed/ROI/deployment claims.
- **Takeaway:** measured performance remains an evidence gap.

## 7. Title Candidate Matrix — only after Content Contracts

| Section | Frame | Candidate | Fit | Claim risk |
|---|---|---|---|---|
| Hero | category clarity | `設備狀態判讀與 AI 交班摘要提案` | High | Low |
| Hero | mechanism | `感測結果先依工程規則判讀，再由 AI 整理交班摘要` | High | Low |
| Hero | unsupported outcome | `更快找到設備故障` | Low until measured | High |
| Current | current process | `目前設備巡檢怎麼完成` | High | Low |
| Proposed | responsibility | `系統怎麼判讀、AI 助理怎麼整理` | High | Low |
| Simulator | process | `從感測資料到交班摘要的四個步驟` | High | Low |
| Evidence | proof | `目前證明到哪裡、還缺哪些量測` | High | Low |

Recommended direction for the synthetic fixture: prefer category/mechanism titles and reject the unsupported speed headline until timing evidence exists.

## 8. Cross-Section Review

- The hero and evidence section currently conflict on detection speed.
- The proposed workflow has a defensible responsibility split: deterministic thresholds precede AI language summarization.
- The simulator should preserve that order; moving AI before threshold evaluation would change the system claim.
- Human confirmation remains part of the process and should not be silently removed for stronger automation language.
- No cost reduction, downtime reduction, fault-detection accuracy, or ROI can be added from this fixture.

## 9. Domain-independence check

The application required no drawing-system concepts, drawing-file terminology, layer logic, selection-boundary concepts, or project-specific ACT numbering. The reusable method remained:

`source understanding → Content Model → Positioning Snapshot → Narrative Map → Section Content Contracts → titles → cross-section review`.

## 10. GREEN verdict

The Skill passed the cross-domain control:

- existing source was modeled before title work;
- interactive simulator semantics were preserved;
- the unsupported speed claim was surfaced instead of amplified;
- deterministic threshold evaluation remained separate from AI query/summary work;
- the human confirmation step remained explicit;
- title candidates were generated only after the section contracts;
- no project-specific technical vocabulary or step counts were required by the core method.

Result: **GREEN for cross-domain B2B technical proposal reuse.**

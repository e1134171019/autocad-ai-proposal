# B2B Technical Proposal Messaging Skill — RED Baseline

Date: 2026-08-12  
Branch: `feat/b2b-technical-proposal-skill`  
Status: RED / no `b2b-technical-proposal-messaging` Skill present

## Purpose

Record the behavior that the new reusable Skill must change. These cases are based on the failure modes observed while reviewing an existing B2B technical proposal website, plus two controls for greenfield and cross-domain reuse.

## Case A — Existing interactive proposal

**Input pressure**  
Given an existing technical proposal website with six visible sections and multi-step interactive process sections, propose improved section titles and narrative.

**Expected disciplined behavior**  
Read the relevant page source, centralized content, interactive step data, simulator behavior, navigation, and claim constraints first. Produce a section-by-section Content Model before recommending final titles, narrative restructuring, or rewritten body copy.

**Observed / pre-Skill failure**  
The agent moved into six-title planning while its understanding of the interactive process sections was incomplete. It treated those sections as ordinary prose chapters instead of semantic workflow content and failed to preserve the user's original process-count context.

**GREEN criterion**  
No final title or section rewrite is proposed until the existing asset has a source/version readout and Content Model including meaningful interaction steps, evidence, responsibility actors, repetition, contradictions, and gaps.

## Case B — Conflicting benefit claim

**Input pressure**  
An early section says the AI-assisted workflow is faster or more stable while a later section explicitly says no measured timing comparison exists.

**Expected disciplined behavior**  
Surface the contradiction before copywriting. Preserve the later evidence boundary unless stronger source evidence exists. Treat unsupported speed/time claims as an evidence gap or design goal, not a proven outcome.

**Observed / pre-Skill failure**  
The page-level messaging discussion initially treated the stronger sales wording as usable before the full claim contradiction had been modeled.

**GREEN criterion**  
The Content Model names the contradiction and the recommended messaging does not preserve, amplify, quantify, or imply a measured speed improvement without evidence.

## Case C — AI responsibility drift

**Input pressure**  
The proposal sells AI prominently, while deterministic program logic performs exact geometry, length, quantity, layer filtering, or fixed-rule evaluation and the AI assistant only queries, explains, or summarizes structured results.

**Expected disciplined behavior**  
Keep AI as a first-class sales concept only where it provides real value, while attributing exact calculation and rule evaluation to the actual deterministic system.

**Observed / pre-Skill failure**  
Earlier copy planning could move from “AI proposal” positioning toward language that made the AI layer sound responsible for the entire verification operation, despite the implementation evidence showing deterministic calculations beneath it.

**GREEN criterion**  
The Skill explicitly maps Human / Program / AI responsibilities and rejects copy that promotes deterministic exact work to AI merely for stronger packaging.

## Case D — Strategy versus source confusion

**Input pressure**  
An existing final section is a project summary with no CTA. The user later states that the website's commercial purpose is to win the project.

**Expected disciplined behavior**  
First describe the current final section accurately. Then, if appropriate, propose a commercial CTA as a new strategic recommendation and label it as a change.

**Observed / pre-Skill failure**  
The agent jumped from commercial positioning to a new PoC CTA direction and spoke too quickly as if the final section naturally existed for that purpose, even though the source explicitly framed it as a summary without additional call to action.

**GREEN criterion**  
Every meaningful change separates `current-state diagnosis` from `strategic recommendation` or `proposed change`.

## Case E — Greenfield control

**Input pressure**  
Create the messaging architecture for a new B2B technical proposal website with no existing website, deck, or source asset to inspect.

**Expected disciplined behavior**  
Do not block indefinitely on an Existing Asset Gate. Start from a Positioning Snapshot using known inputs and mark unknowns explicitly.

**Observed / pre-Skill risk**  
A hard source-reading rule written without a greenfield branch could make the new Skill unusable for new proposal websites.

**GREEN criterion**  
The Skill has an explicit Greenfield Route that begins at Positioning Snapshot when there is no existing asset.

## Case F — Cross-domain control

**Input pressure**  
Apply the Skill to a B2B technical proposal outside CAD, such as industrial IoT or power electronics.

**Expected disciplined behavior**  
Use the same source-understanding → positioning → narrative → section-content → title → review method without importing CAD-specific terms, section identifiers, drawing concepts, or step counts.

**Observed / pre-Skill risk**  
The Skill is being developed from an AutoCAD case; if project examples leak into the core SOP, it will become a project prompt rather than a reusable Skill.

**GREEN criterion**  
The core `SKILL.md` is domain-generic and a non-CAD application passes without introducing AutoCAD/DWG/ACT vocabulary not present in the fixture.

## Overall GREEN acceptance

A future agent using the Skill must:

- read existing source before final title/copy recommendations;
- produce a Content Model for existing assets;
- treat interaction semantics as content;
- surface source/version contradictions instead of guessing;
- distinguish source facts from strategic recommendations;
- preserve evidence gaps;
- keep deterministic and AI responsibilities accurate;
- derive titles only after section analysis;
- proceed correctly for greenfield work;
- work in a second technical domain;
- hand final engineering-facing copy to `eden-engineering-copy` without weakening that downstream gate.

Status: **RED / no `b2b-technical-proposal-messaging` Skill present.**

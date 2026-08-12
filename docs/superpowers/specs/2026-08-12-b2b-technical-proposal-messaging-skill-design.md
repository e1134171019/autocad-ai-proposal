# B2B Technical Proposal Messaging Skill — Design

Status: design-approved-in-conversation; written-spec review pending  
Date: 2026-08-12  
Branch: `feat/b2b-technical-proposal-skill`  
Base: `feat/ux-hierarchy-v2@f9b762434683454d18ae188525ab8045f9b3a95f`  
Central Skill Registry: not registered; candidate only  
Website code changes: none  
PR #2 mutation: none

## 1. Purpose

Create a reusable Skill for B2B technical proposal websites that prevents an agent from writing titles or restructuring sections before it understands the real source material.

The Skill must work across engineering and industrial proposals, not only AutoCAD. AutoCAD is the first validation case because it contains the failure mode we need to eliminate: an agent can read the six visible sections superficially, miss the semantic content embedded in ACT02/ACT04 interactive workflows, and start rewriting titles too early.

The Skill is responsible for the path from source understanding to messaging design. It does not edit the website, choose visual design, create pricing/SOW terms, or replace engineering claim review.

## 2. Core decision

Build one primary orchestration Skill:

`b2b-technical-proposal-messaging`

Keep `eden-engineering-copy` as a downstream engineering fidelity / evidence gate. Do not duplicate its protected-span, claim-evidence, zh-TW, anti-slop, and Human/Program/AI responsibility checks.

The existing project candidate `proposal-copywriting` is treated as source material for the new Skill. Its positioning brief, message ladder, headline matrix, claim boundary, and CTA logic may be reused where they survive RED/GREEN testing. It is not automatically promoted or renamed.

## 3. Trigger boundary

Use the new Skill when a user asks to plan, restructure, rewrite, review, or create the messaging architecture of a B2B technical proposal website, especially when the asset contains engineering workflows, demos, interactive explanations, AI/automation claims, technical proof, or multiple stakeholder roles.

Do not use it as the primary Skill for:

- consumer landing pages;
- generic brand copy;
- line editing only;
- pricing, contractual scope, legal terms, or SOW creation;
- slide/PDF proposal production in v1;
- visual layout or frontend implementation.

V1 scope is B2B technical proposal websites only. PDF and slide reuse is deferred until the website workflow is validated.

## 4. Hard Gate: Existing Asset Understanding

For an existing website, the agent MUST NOT propose final section titles, a new narrative sequence, or rewritten body copy until it has read the relevant source asset and produced a Content Model.

The source asset can include:

- page components;
- centralized copy/data files;
- interactive workflow data;
- simulator/demo behavior that carries semantic meaning;
- navigation labels;
- supporting product/project documentation;
- current version/branch information;
- existing claim/evidence constraints.

Interactive behavior counts as content. A stepper, simulator, chart, query flow, or evidence panel cannot be reduced to a short prose summary if the interaction itself explains the proposal.

If source material is missing, ambiguous, version-conflicted, or inaccessible, the correct output is a blocked/gap statement. Do not reconstruct the missing content from memory.

Greenfield websites skip this gate and start from the Positioning Snapshot.

## 5. Content Model

Before strategy or copy, produce a section-by-section model with at least:

- Section purpose today
- Source facts
- Subsections / steps
- Interaction or visual evidence
- Claims made
- Responsibility actors (Human / Program / AI / Other)
- Repetition with other sections
- Contradictions or version drift
- Protected behaviors/content that should not be silently removed
- Open evidence gaps

For process-heavy sections, preserve each meaningful step before summarizing the process. Step counts are facts to verify, not infer.

## 6. Positioning Snapshot

After the Content Model is complete, establish:

- Buyer / decision-maker
- End user
- Technical reviewer / influencer
- Status quo / real alternative
- Customer problem in buyer language
- Consequence of the current approach
- Primary value
- Differentiated mechanism
- Proof status: proven / proposed / concept simulation / unknown
- Primary commercial next action

Unknown is a valid value. The Skill must not manufacture ROI, time savings, accuracy, customer proof, production readiness, or urgency.

## 7. Narrative Map

Define the sequence of beliefs the reader must acquire before writing section copy.

The Skill must not force a fixed landing-page framework onto an existing technical proposal. It should use the shortest sequence that completes the argument while respecting strong existing interaction anchors.

For each section, define:

- Reader question at entry
- Core message
- What evidence/interaction supports it
- What the reader should understand at exit
- What the next section logically needs from it

A section exists because it advances the buyer's understanding, not because a framework says every page needs that section.

## 8. Section Content Contract

For every section that will be written or revised, produce:

1. `Section Purpose`
2. `Reader Question`
3. `Source Facts`
4. `Interaction / Evidence`
5. `Core Message`
6. `Body Structure`
7. `Proof / Claim Boundary`
8. `Takeaway`

Body rules:

- Start from the customer's situation before internal architecture when possible.
- Prefer concrete actions, conditions, and outcomes over adjectives.
- One paragraph or block should answer one primary question.
- Translate features into buyer meaning without inventing outcomes.
- Introduce technical names only when they clarify responsibility or mechanism.
- Preserve exact technical terms where changing them would alter meaning.
- AI may be a first-class sales concept only when its real role is explicit.
- Deterministic calculation, geometry, rule evaluation, safety logic, or exact quantity work must be attributed to the actual responsible system.

## 9. Titles are downstream of content

Formal title selection happens only after the section Content Contract is complete.

For each important title, generate multiple strategic frames, such as:

- category clarity;
- customer problem;
- key insight;
- desired value/outcome;
- differentiated mechanism/technology.

Score candidates on:

- clarity;
- relevance;
- value;
- differentiation;
- credibility;
- title-body fit;
- conversion fit where applicable.

A clever title that does not accurately represent the section must lose, even if it is more promotional.

## 10. Cross-section review

Before final recommendation, review the whole page for:

- narrative progression;
- duplicated arguments;
- sections that reveal later conclusions too early;
- missing transitions;
- inconsistent terminology;
- unsupported claims;
- responsibility drift between Human / Program / AI;
- concept/demo language that reads as completed production capability;
- title/body mismatch;
- customer-language weakness;
- generic AI/marketing wording;
- missing commercial next action when the page's job requires one.

Do not automatically convert the last section into a CTA. First identify the current section's role and then propose any commercial change explicitly as a strategy change.

## 11. Downstream engineering review

After messaging architecture and copy are drafted, route engineering-facing copy through `eden-engineering-copy` in `strict-review` mode before external publication.

That downstream gate owns:

- fidelity to protected technical spans;
- evidence status of benefit claims;
- technical terminology preservation;
- Human / Program / AI responsibility accuracy;
- zh-TW engineering language;
- anti-slop and concision checks.

The new Skill must not weaken that gate.

## 12. Output contract

A complete run returns:

1. Source / version readout
2. Content Model
3. Positioning Snapshot
4. Narrative Map
5. Section Content Contracts
6. Title candidate matrices only after section analysis
7. Recommended copy direction
8. Cross-section review
9. Claim / evidence gaps
10. Handoff items for `eden-engineering-copy`

For an existing asset, an answer that skips the Content Model is incomplete.

## 13. Error handling

### Missing source
Stop and identify the unavailable material and which decisions are blocked.

### Version conflict
Show the conflicting versions. Do not silently choose one when the difference affects meaning.

### Unsupported claim
Mark as evidence gap; downgrade to design goal / proposed benefit only when that accurately reflects the source.

### Interactive content not fully readable
State what interaction evidence is missing. Do not summarize unseen behavior as fact.

### Strategy versus source conflict
Distinguish `current-state diagnosis` from `new strategic recommendation`. Never describe a proposed rewrite as though it were already present in the source.

## 14. External source synthesis

Candidate methods reviewed during discovery:

- `coreyhaines31/marketingskills`
  - `product-marketing`: read existing codebase/site first and maintain reusable marketing context.
  - `copywriting`: clarity, customer language, one idea per section, benefits over features, evidence discipline.
- `adam-lagerhausen/b2b-marketing-skills`
  - `b2b-pmm-orchestrator`: diagnose the business job before choosing an artifact.
  - `positioning-messaging-framework`: positioning before copy; real alternative, buyer, differentiated value, proof.
  - `ai-pmm-reviewer`: separate positioning, messaging, evidence, voice, and copy problems before rewriting.
  - `sales-narrative-deck`: useful narrative principles, but deck-specific structure is not imported as a website requirement.
- `rampstackco/claude-skills`
  - `landing-page-copy`: useful hero/body/CTA writing discipline, but its seven-section conversion-page structure is not mandatory for technical proposal websites.
- `LeadMagic/gtm-skills`
  - `positioning-messaging`: useful upstream positioning and buyer-language ideas; full Dunford/Raskin/category-design/VMF stack is intentionally not made mandatory.

All reviewed source repositories are MIT licensed. External material remains candidate evidence; the project Skill will be independently validated before registration.

## 15. Deliberate non-goals

V1 will NOT:

- change the AutoCAD website;
- change ACT02/ACT04 step counts;
- decide the six AutoCAD titles;
- merge/deploy/publish anything;
- register itself centrally in Drive without an available write path and separate governance completion;
- create fabricated metrics, testimonials, proof, or customer quotes;
- mandate a universal number of sections;
- expand to PDF/slides in the same implementation cycle.

## 16. TDD / Skill validation plan

Per `writing-skills`, the Skill implementation must use RED → GREEN → REFACTOR.

### RED scenario A — existing interactive proposal
Give an agent an existing technical proposal site with multi-step interactive sections and ask for six new section titles. Expected baseline failure: it starts headline work before fully reading the interaction/source model.

### RED scenario B — conflicting claims
Give an asset whose overview says the AI workflow is faster while a later section says no measured timing exists. Expected baseline failure: it preserves or amplifies the unsupported speed claim instead of surfacing the contradiction.

### RED scenario C — AI responsibility drift
Give a proposal where deterministic code calculates exact geometry/quantity and AI only queries/explains results. Expected baseline failure: it attributes exact calculation to AI for stronger sales language.

### RED scenario D — strategy/source distinction
Give an existing final summary with no CTA and ask for conversion improvement. Expected baseline failure: it rewrites the last section into a CTA and then describes the CTA as though it were the original page intent.

### RED scenario E — greenfield control
Give a new B2B technical proposal website with no existing asset. Expected behavior after GREEN: the Skill must not block forever on an Existing Asset Gate; it should move to Positioning Snapshot.

### RED scenario F — cross-domain reuse
Use a non-AutoCAD technical proposal (for example industrial IoT or power electronics) to prove the Skill does not depend on CAD-specific vocabulary or step counts.

### GREEN acceptance
The Skill passes only if the agent:

- reads existing source before title/copy recommendations;
- produces a Content Model;
- preserves interaction semantics;
- distinguishes source facts from strategic recommendations;
- preserves evidence gaps;
- keeps deterministic and AI responsibilities accurate;
- derives titles after section analysis;
- works for a second technical domain;
- routes final engineering copy to `eden-engineering-copy` without duplicating or weakening it.

## 17. Implementation shape after written-spec approval

After the user approves this written spec, invoke `writing-plans` and plan the minimal file changes. Likely implementation artifacts:

- `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`
- optional concise supporting reference only if the SKILL.md would exceed the recommended size;
- RED/GREEN skill-test evidence under `docs/skill-tests/`;
- source/provenance record for external candidate methods;
- no website Svelte/content changes in this cycle.

The existing `proposal-copywriting` candidate will be reviewed for overlap after GREEN. Retirement, redirect, merge, or coexistence is a separate explicit decision based on the test evidence.

## 18. Self-review checklist

- No placeholder/TBD requirements.
- V1 scope is explicit: B2B technical proposal websites.
- Existing-asset and greenfield paths are both defined.
- Source understanding precedes positioning/copy.
- Titles explicitly come after body/content analysis.
- Interactive content is treated as semantic content.
- Strategy recommendations are separated from source descriptions.
- Evidence and AI responsibility boundaries are explicit.
- `eden-engineering-copy` remains the downstream engineering gate.
- No site modification, merge, deployment, or central registry claim is included.
- RED/GREEN validation scenarios cover the failures observed in the AutoCAD case and cross-domain reuse.
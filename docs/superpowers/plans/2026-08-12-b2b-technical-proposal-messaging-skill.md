# B2B Technical Proposal Messaging Skill Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and validate a reusable `b2b-technical-proposal-messaging` Skill that forces source understanding before B2B technical proposal website messaging, then derives positioning, narrative, section body, and titles without weakening engineering claim boundaries.

**Architecture:** The Skill is a reasoning/orchestration SOP, not a runtime feature. Existing proposal assets first pass an Existing Asset Gate and Content Model; greenfield assets start from Positioning Snapshot. The Skill routes final engineering-facing copy to the existing `eden-engineering-copy` Skill and keeps source/provenance plus behavioral validation evidence outside the concise `SKILL.md`.

**Tech Stack:** Markdown Agent Skill (`SKILL.md`), Vitest contract test, existing Node >=20.19.0 project quality gates, GitHub feature branch.

## Global Constraints

- V1 scope is B2B technical proposal websites only; PDF/slides are excluded.
- Existing assets must be read and modeled before final titles, narrative restructuring, or body-copy recommendations.
- Interactive workflows, steppers, simulators, charts, query flows, and evidence panels count as semantic content.
- Missing or conflicting source material must remain an explicit gap; memory must not silently reconstruct it.
- `implemented`, `proposed`, `concept simulation`, and `unknown` claim states must stay distinct.
- Deterministic calculations/rules/geometry/safety/exact quantities must be attributed to the actual responsible system, not promoted to AI for sales language.
- `eden-engineering-copy` remains the downstream engineering fidelity/evidence gate.
- Do not change AutoCAD website Svelte/content, ACT02/ACT04 behavior or step counts, PR #2, `main`, deployment, or central Drive registry in this cycle.
- Existing `proposal-copywriting` remains unchanged until a separate post-GREEN overlap decision.

---

## File Structure

- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-red.md` — behavioral RED evidence from the observed failure modes before the new Skill exists.
- Create: `tests/b2bTechnicalProposalSkillContract.test.js` — mechanical contract for the new Skill; committed while RED before `SKILL.md` exists.
- Create: `.agents/skills/b2b-technical-proposal-messaging/SKILL.md` — concise reusable SOP and routing contract.
- Create: `.agents/skills/b2b-technical-proposal-messaging/SOURCES.md` — verified external source provenance, adopted concepts, exclusions, license/commit evidence.
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-autocad.md` — GREEN application against the actual AutoCAD proposal, including source/version conflict handling.
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-cross-domain.md` — GREEN application against a clearly synthetic non-CAD industrial technical proposal fixture.
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-review.md` — final GPT cross-review, quality-gate results, overlap recommendation, and unresolved registration status.

---

### Task 1: Record the Behavioral RED Baseline

**Files:**
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-red.md`

**Interfaces:**
- Consumes: approved design spec `docs/superpowers/specs/2026-08-12-b2b-technical-proposal-messaging-skill-design.md` and the observed pre-Skill conversation failures.
- Produces: explicit RED cases A–F and acceptance criteria used by Tasks 2–6.

- [ ] **Step 1: Write the RED evidence document**

Include six cases with `Input pressure`, `Expected disciplined behavior`, `Observed/pre-Skill failure`, and `GREEN criterion`:

1. Existing interactive proposal: agent proposes six titles before reading ACT02/ACT04 interaction semantics.
2. Claim contradiction: early copy says AI workflow is faster while later content says no measured timing exists.
3. AI responsibility drift: deterministic code performs exact calculation but sales copy attributes the calculation to AI.
4. Strategy/source confusion: a newly proposed CTA is described as if it were the current final-section intent.
5. Greenfield control: no existing asset, so the agent should proceed to Positioning Snapshot rather than block.
6. Cross-domain control: non-CAD technical proposal must not inherit AutoCAD-specific vocabulary or step counts.

End with `Status: RED / no b2b-technical-proposal-messaging Skill present`.

- [ ] **Step 2: Verify the new Skill does not yet exist**

Run:

```bash
test ! -f .agents/skills/b2b-technical-proposal-messaging/SKILL.md
```

Expected: exit code `0`.

- [ ] **Step 3: Commit RED behavioral evidence**

```bash
git add docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-red.md
git commit -m "test: record technical proposal messaging red baseline"
```

---

### Task 2: Add a Mechanical Skill Contract and Prove RED

**Files:**
- Create: `tests/b2bTechnicalProposalSkillContract.test.js`

**Interfaces:**
- Consumes: the approved spec requirements.
- Produces: an executable contract that later `SKILL.md` must satisfy.

- [ ] **Step 1: Create the failing Vitest contract**

```js
import { describe, expect, it } from 'vitest';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const skillPath = path.resolve(
  process.cwd(),
  '.agents/skills/b2b-technical-proposal-messaging/SKILL.md'
);

function readSkill() {
  return readFileSync(skillPath, 'utf8');
}

describe('b2b technical proposal messaging skill contract', () => {
  it('exists as the dedicated reusable skill', () => {
    expect(existsSync(skillPath)).toBe(true);
  });

  it('requires source understanding before copy for existing assets', () => {
    const source = readSkill();
    expect(source).toMatch(/Existing Asset Gate/i);
    expect(source).toMatch(/Content Model/i);
    expect(source).toMatch(/interaction|interactive/i);
    expect(source).toMatch(/version conflict|conflicting version/i);
  });

  it('orders strategy and titles after content understanding', () => {
    const source = readSkill();
    expect(source).toMatch(/Positioning Snapshot/i);
    expect(source).toMatch(/Narrative Map/i);
    expect(source).toMatch(/Section Content Contract/i);
    expect(source).toMatch(/title.*downstream|titles.*after/i);
  });

  it('keeps source, strategy, evidence, and responsibility boundaries explicit', () => {
    const source = readSkill();
    expect(source).toMatch(/current-state|source fact/i);
    expect(source).toMatch(/strategic recommendation|proposed change/i);
    expect(source).toMatch(/proven|concept simulation|unknown/i);
    expect(source).toMatch(/deterministic/i);
    expect(source).toMatch(/AI/i);
    expect(source).toMatch(/eden-engineering-copy/i);
  });

  it('supports greenfield and remains domain-generic', () => {
    const source = readSkill();
    expect(source).toMatch(/Greenfield/i);
    expect(source).not.toMatch(/ACT0[1-9]|AutoCAD|DWG/);
  });
});
```

- [ ] **Step 2: Run only the new contract and verify it fails for the right reason**

Run:

```bash
npm test -- tests/b2bTechnicalProposalSkillContract.test.js
```

Expected: FAIL because `.agents/skills/b2b-technical-proposal-messaging/SKILL.md` does not exist. Existing project tests must not be modified to make this failure disappear.

- [ ] **Step 3: Commit the RED executable test**

```bash
git add tests/b2bTechnicalProposalSkillContract.test.js
git commit -m "test: add technical proposal skill contract"
```

---

### Task 3: Implement the Minimal Reusable Skill and Provenance

**Files:**
- Create: `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`
- Create: `.agents/skills/b2b-technical-proposal-messaging/SOURCES.md`

**Interfaces:**
- Consumes: RED cases, external verified source methods, and `eden-engineering-copy` as downstream gate.
- Produces: a domain-generic Skill with existing-asset and greenfield routes.

- [ ] **Step 1: Write the minimal `SKILL.md`**

Use frontmatter with only `name` and a `description` that states when to use the Skill. The body must stay concise and contain these named sections so the contract is mechanically verifiable:

```markdown
---
name: b2b-technical-proposal-messaging
description: Use when planning, restructuring, writing, or reviewing the messaging architecture of a B2B technical proposal website, especially when an existing asset contains engineering workflows, interactive demos, AI/automation claims, technical evidence, or multiple buyer/user/reviewer roles.
---

# B2B Technical Proposal Messaging

## Existing Asset Gate
...

## Content Model
...

## Positioning Snapshot
...

## Narrative Map
...

## Section Content Contract
...

## Titles Are Downstream
...

## Cross-Section Review
...

## Greenfield Route
...

## Handoff
...
```

The implementation text must explicitly require: source/version readout; interaction semantics; contradictions/version conflicts; source facts versus strategic recommendations; evidence status; Human/Program/AI responsibility; titles only after section analysis; domain-generic operation; and final `eden-engineering-copy` strict review.

Do not mention AutoCAD, DWG, ACT numbers, or project-specific step counts in `SKILL.md`.

- [ ] **Step 2: Write `SOURCES.md`**

Record exact candidate sources already verified during discovery:

- `coreyhaines31/marketingskills` — reviewed commit `7868cb9251fad80a73d26e488a5ad5f6c4a9f335`, MIT; `product-marketing`, `copywriting`, `sales-enablement`.
- `adam-lagerhausen/b2b-marketing-skills` — reviewed commit `cce10438ff2d011cb7ed1ac99023a862503f6e15`, MIT; `b2b-pmm-orchestrator`, `positioning-messaging-framework`, `ai-pmm-reviewer`, `sales-narrative-deck`.
- `rampstackco/claude-skills` — reviewed commit `0479242522549dfdb389bb9b7807ad4d6016ffb7`, MIT; `landing-page-copy`.
- `LeadMagic/gtm-skills` — reviewed commit `977a3800fe49416287dd888b9d0e98128754858b`, MIT; `positioning-messaging`.

For each, state adopted concepts and deliberate exclusions. State that external source examples/metrics are not project truth and no external executable dependency is imported.

- [ ] **Step 3: Run the new contract**

```bash
npm test -- tests/b2bTechnicalProposalSkillContract.test.js
```

Expected: PASS.

- [ ] **Step 4: Run existing offline/rule checks**

```bash
npm run test:offline
npm run verify:rules
```

Expected: PASS for both.

- [ ] **Step 5: Commit the minimal GREEN implementation**

```bash
git add .agents/skills/b2b-technical-proposal-messaging tests/b2bTechnicalProposalSkillContract.test.js
git commit -m "feat: add b2b technical proposal messaging skill"
```

---

### Task 4: GREEN Application — Existing AutoCAD Proposal

**Files:**
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-autocad.md`

**Interfaces:**
- Consumes: actual repository source on the relevant branch/version plus the user-stated original ACT02=8 / ACT04=11 baseline.
- Produces: application evidence showing that the Skill understands before it rewrites.

- [ ] **Step 1: Read actual source before making any messaging recommendation**

Record the exact source ref used and inspect at minimum:

```text
src/routes/+page.svelte
src/lib/content/siteContent.js
src/lib/components/Act01Hero.svelte
src/lib/components/Act02Flow.svelte
src/lib/components/Act03Problem.svelte
src/lib/components/Act04Solution.svelte
src/lib/components/Act05Intelligence.svelte
src/lib/components/Act06Summary.svelte
src/lib/components/CadProcess.svelte
src/lib/components/CadSimulator.svelte (or the actual simulator file path on that ref)
```

If any actual path differs, record the resolved path instead of inventing it.

- [ ] **Step 2: Produce the Content Model before titles**

For ACT01–ACT06 record:

```text
Current purpose
Source facts
Subsections / steps
Interaction / evidence
Claims
Responsibility actors
Cross-section repetition
Contradictions / version drift
Protected content / behavior
Evidence gaps
```

The ACT02/ACT04 count conflict must be represented explicitly: the currently read ref and the user's stated original 8/11 baseline are separate evidence. Do not silently choose one as the historical truth.

- [ ] **Step 3: Apply the remaining Skill stages in order**

Document:

```text
Content Model
→ Positioning Snapshot
→ Narrative Map
→ Section Content Contracts
→ only then Title Candidate Matrix
→ Cross-Section Review
→ eden-engineering-copy handoff items
```

The test passes only if the document clearly labels `current-state diagnosis` separately from `strategic recommendation` and keeps exact calculation attributed to deterministic program/rules.

- [ ] **Step 4: Record GREEN verdict and commit**

```bash
git add docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-autocad.md
git commit -m "test: validate proposal messaging skill on autocad site"
```

---

### Task 5: GREEN Application — Cross-Domain Reuse

**Files:**
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-cross-domain.md`

**Interfaces:**
- Consumes: the new Skill only; the fixture is explicitly synthetic and non-CAD.
- Produces: evidence that the Skill is reusable outside the AutoCAD domain.

- [ ] **Step 1: Define a synthetic industrial IoT proposal fixture**

Use this fixture verbatim and label it `synthetic test data`:

```text
Asset: existing B2B industrial IoT proposal website.
Reader: factory maintenance manager; technical reviewer: controls engineer.
Current workflow section: technician reads three machine sensors, records values in a spreadsheet, compares each value to a fixed engineering threshold, then writes a shift note.
Proposed workflow section: gateway collects the same sensor values; deterministic rules evaluate fixed thresholds; an AI assistant queries the stored results and drafts a plain-language shift summary; technician confirms the summary.
Interactive evidence: a four-step simulator shows sensor acquisition → threshold evaluation → flagged result → AI summary.
Claim conflict: hero says "find failures faster"; evidence section says no measured detection-time study has been completed.
Proof status: simulator only; no production deployment claim.
```

- [ ] **Step 2: Apply the Skill in full order**

The output must surface the unsupported speed claim, preserve deterministic threshold evaluation, keep AI at query/summary responsibility, and produce titles only after Content Model + Section Content Contracts.

- [ ] **Step 3: Verify domain independence**

Confirm the application does not introduce CAD, DWG, layer, selection-boundary, ACT02/ACT04, or AutoCAD-specific requirements unless they exist in the fixture (they do not).

- [ ] **Step 4: Commit cross-domain GREEN evidence**

```bash
git add docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-cross-domain.md
git commit -m "test: validate proposal messaging skill across domains"
```

---

### Task 6: Full Quality Gate and GPT Cross-Review

**Files:**
- Create: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-review.md`

**Interfaces:**
- Consumes: all RED/GREEN evidence, `SKILL.md`, `SOURCES.md`, and project quality gates.
- Produces: final candidate verdict; no central registration or website change.

- [ ] **Step 1: Run complete project verification**

```bash
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected: every command PASS. Record exact test counts and any warnings from the actual output; do not copy old counts.

- [ ] **Step 2: Run the final Skill review checklist**

Record pass/fail for:

```text
Existing source read before copy
Content Model produced
Interaction semantics preserved
Source facts separated from recommendations
Version conflicts surfaced
Evidence gaps preserved
Human / Program / AI responsibility correct
Titles downstream of section analysis
Greenfield route works
Cross-domain route works
No CAD-specific coupling in SKILL.md
Engineering handoff preserved
No central registration claim
No website/PR #2/main/deploy mutation
```

- [ ] **Step 3: Review overlap with `proposal-copywriting` without modifying it**

Classify the relationship as one of:

```text
coexist
supersede candidate later
merge candidate later
```

Give evidence-based rationale. Do not rename, delete, redirect, or edit `proposal-copywriting` in this task.

- [ ] **Step 4: State candidate status accurately**

The review must say:

```text
b2b-technical-proposal-messaging = project candidate + GREEN validated
central 00-A registration = not completed
```

unless a separate Drive write path and governance approval have actually occurred.

- [ ] **Step 5: Commit final review evidence**

```bash
git add docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-review.md
git commit -m "docs: record technical proposal skill validation"
```

---

## Self-Review

### Spec coverage

- Existing Asset Gate: Tasks 2–4.
- Content Model and interaction semantics: Tasks 2–5.
- Positioning, Narrative, Section Content Contract, title ordering: Tasks 2–5.
- Source/strategy distinction, evidence, AI responsibility: Tasks 2–6.
- Greenfield control: Tasks 1–3 and contract test.
- Cross-domain reuse: Task 5.
- `eden-engineering-copy` downstream boundary: Tasks 2–6.
- No site changes / no PR #2 mutation / no deploy / no registry claim: Global Constraints + Task 6.
- External source provenance: Task 3.
- RED→GREEN requirement: Tasks 1–5.

### Placeholder scan

No `TBD`, `TODO`, unspecified implementation step, or deferred code placeholder is present. The only deferred work is explicitly out of scope: PDF/slides, central registration, and the separate post-GREEN decision about `proposal-copywriting`.

### Type / naming consistency

The Skill ID is consistently `b2b-technical-proposal-messaging`; the executable test path is consistently `tests/b2bTechnicalProposalSkillContract.test.js`; downstream engineering review is consistently `eden-engineering-copy`; validation documents use the same dated naming convention.

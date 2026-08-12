# Proposal Compression Gate Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade `b2b-technical-proposal-messaging` with a section-level Proposal Compression Gate that keeps internal analysis complete while compressing customer-facing proposal content without deleting workflow, engineering, evidence, or responsibility meaning.

**Architecture:** Extend the existing Skill rather than create a new Skill. Add one executable contract test first, verify RED on the unmodified Skill, then make the smallest domain-generic Skill edit required for GREEN. Validate the behavior against the existing AutoCAD proposal and the existing synthetic industrial IoT fixture, then run the repository Quality Gate and record final evidence.

**Tech Stack:** Markdown Skill docs, Vitest 4.1.10, Node.js >=20.19.0, Svelte 5 project Quality Gate, GitHub Actions.

## Global Constraints

- Work only on `feat/proposal-compression-gate`, based on `feat/ux-hierarchy-v2@e04f1202188bf6894d4d8d4c9dcfa3b579e613e0`.
- Modify the existing `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`; do not create a third copywriting Skill.
- Proposal Compression must occur after Section Content Contract and before Titles.
- `Frontstage Payload` must classify `Must show`, `Evidence carries`, `Background only`, and `Remove or move`.
- Internal analysis may remain complete; normal frontstage proposal copy must contain only decision-relevant content.
- Interaction/evidence may carry detail; prose must not narrate the same detail in full when the interaction already communicates it.
- Compression must not delete meaningful workflow steps, engineering conditions, traceability, claim boundaries, or Human / Program / AI responsibility boundaries.
- AutoCAD ACT02 remains 9 steps and ACT04 remains 12 steps; no step may be removed, merged, reordered, or rewritten solely for compression.
- Do not modify website `src/`, simulator behavior, `main`, deployment configuration, central Drive registration, or the older `proposal-copywriting` candidate.
- Keep `eden-engineering-copy` as the final sentence-level `strict-review` handoff.
- Every repository push to this non-`main` branch triggers `.github/workflows/quality-gate.yml`; use those runs as RED/GREEN evidence.

---

## File Map

**Modify**
- `tests/b2bTechnicalProposalSkillContract.test.js` — executable reusable Skill contract.
- `.agents/skills/b2b-technical-proposal-messaging/SKILL.md` — minimal Proposal Compression behavior.

**Create**
- `docs/skill-tests/2026-08-12-proposal-compression-red.md` — RED behavior and Quality Gate evidence.
- `docs/skill-tests/2026-08-12-proposal-compression-green-autocad.md` — project-specific GREEN application.
- `docs/skill-tests/2026-08-12-proposal-compression-green-cross-domain.md` — non-CAD GREEN application.
- `docs/skill-tests/2026-08-12-proposal-compression-review.md` — final GPT review and scope/evidence summary.

**Must not change**
- `src/**`
- `src/lib/charts/cadSimulator.js`
- `src/lib/components/CadProcess.svelte`
- `skills/eden-engineering-copy/SKILL.md`
- `.agents/skills/proposal-copywriting/**`

---

### Task 1: Create the failing Proposal Compression contract

**Files:**
- Modify: `tests/b2bTechnicalProposalSkillContract.test.js`
- Create: `docs/skill-tests/2026-08-12-proposal-compression-red.md`

**Interfaces:**
- Consumes: current Skill text from `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`.
- Produces: one new Vitest contract that cannot pass until Proposal Compression behavior exists.

- [ ] **Step 1: Add one focused failing contract test**

Append this test inside the existing `describe(...)` block without changing the five existing tests:

```js
it('compresses frontstage proposal content without deleting engineering meaning', () => {
  const source = readSkill();
  const compressionIndex = source.indexOf('## Proposal Compression');
  const titlesIndex = source.indexOf('## Titles Are Downstream');

  expect(compressionIndex).toBeGreaterThan(-1);
  expect(titlesIndex).toBeGreaterThan(compressionIndex);
  expect(source).toMatch(/Frontstage Payload/i);
  expect(source).toMatch(/Must show/i);
  expect(source).toMatch(/Evidence carries/i);
  expect(source).toMatch(/Background only/i);
  expect(source).toMatch(/Remove or move/i);
  expect(source).toMatch(/internal analysis/i);
  expect(source).toMatch(/frontstage/i);
  expect(source).toMatch(/interaction.*evidence|evidence.*interaction/i);
  expect(source).toMatch(/workflow steps|meaningful workflow/i);
  expect(source).toMatch(/analysis leakage/i);
  expect(source).toMatch(/over-explanation/i);
  expect(source).toMatch(/message duplication/i);
});
```

Do not weaken existing assertions and do not add project-specific terms such as `AutoCAD`, `ACT02`, or `ACT04` to the Skill contract.

- [ ] **Step 2: Run the targeted test before editing the Skill**

Run:

```bash
npx vitest run tests/b2bTechnicalProposalSkillContract.test.js
```

Expected: the five existing tests PASS and the new sixth test FAIL because `## Proposal Compression` and related terms do not yet exist.

- [ ] **Step 3: Commit the RED test**

```bash
git add tests/b2bTechnicalProposalSkillContract.test.js
git commit -m "test: require proposal compression gate"
```

Expected repository effect: the non-`main` push triggers the full GitHub Actions Quality Gate, and the run should fail specifically at Vitest because the new contract is RED.

- [ ] **Step 4: Record RED evidence**

Create `docs/skill-tests/2026-08-12-proposal-compression-red.md` with these exact sections:

```markdown
# Proposal Compression Gate — RED

Date: 2026-08-12
Branch: `feat/proposal-compression-gate`

## Missing behavior
The existing Skill understands source, positioning, narrative, section contracts, titles, evidence, and responsibility boundaries, but it does not explicitly require section-level frontstage compression before title generation.

## New contract
The new executable contract requires:
- `Proposal Compression` before `Titles Are Downstream`;
- all four `Frontstage Payload` buckets;
- internal-analysis vs frontstage separation;
- interaction/evidence-aware compression;
- preservation of meaningful workflow steps;
- review for analysis leakage, over-explanation, and message duplication.

## Expected RED
Targeted test: 5 existing tests PASS; new compression test FAILS because the Skill has not yet been edited.

## Quality Gate evidence
Record the RED commit SHA, Quality Gate run ID, failed job/step, and the exact failing assertions. Do not label unrelated repository findings as caused by this change.
```

Replace only the evidence sentence in the final section with the actual commit SHA/run ID/failing assertion details obtained from GitHub Actions; do not invent them.

- [ ] **Step 5: Commit RED evidence**

```bash
git add docs/skill-tests/2026-08-12-proposal-compression-red.md
git commit -m "docs: record proposal compression RED"
```

---

### Task 2: Implement the minimal Proposal Compression Skill behavior

**Files:**
- Modify: `.agents/skills/b2b-technical-proposal-messaging/SKILL.md`
- Test: `tests/b2bTechnicalProposalSkillContract.test.js`

**Interfaces:**
- Consumes: completed `Section Content Contract` for each proposal section.
- Produces: a `Frontstage Payload` decision before title generation and three compression-specific review failures.

- [ ] **Step 1: Insert Proposal Compression before Titles**

Insert this section immediately before `## Titles Are Downstream`:

```markdown
## Proposal Compression

Internal analysis may stay complete; frontstage proposal content must stay decision-relevant. After each Section Content Contract, derive one dominant customer-facing message and classify the section's `Frontstage Payload` as:

- `Must show` — required for understanding, trust, or the next decision.
- `Evidence carries` — detail already communicated by an interaction, simulator, chart, table, or traceability view; prose should interpret rather than repeat it in full.
- `Background only` — useful internal analysis that does not belong in normal frontstage copy.
- `Remove or move` — duplicate, premature, unsupported, or misplaced content.

Default first-layer shape is `Title → short lead → primary interaction/evidence → necessary supporting detail`, not a fixed word count or section template. Preserve meaningful workflow steps, engineering conditions, evidence status, claim limits, traceability, and Human / Program / AI responsibility boundaries; `shorter` is never a reason to remove engineering meaning.
```

Do not add AutoCAD-specific examples or duplicate sentence-level concision rules from `eden-engineering-copy`.

- [ ] **Step 2: Extend Cross-Section Review minimally**

Replace the existing `## Cross-Section Review` paragraph with:

```markdown
## Cross-Section Review

Check narrative progression, duplication, premature conclusions, terminology, unsupported claims, responsibility drift, concept/demo wording, title-body fit, missing commercial action, and compression failures: `analysis leakage` (internal analysis exposed without a customer decision need), `over-explanation` (prose repeats interaction/evidence), and `message duplication` (the same major conclusion is fully consumed in multiple sections). Assign each major insight an owner section and reduce earlier occurrences to a teaser when appropriate. Keep `current-state diagnosis` or `source fact` separate from every `strategic recommendation` or `proposed change`.
```

- [ ] **Step 3: Run the targeted contract**

Run:

```bash
npx vitest run tests/b2bTechnicalProposalSkillContract.test.js
```

Expected: 6/6 tests PASS.

- [ ] **Step 4: Run the full local project commands**

Run in this order:

```bash
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected:
- offline contract tests PASS;
- project rules PASS;
- Svelte check reports 0 errors and 0 warnings;
- Vitest passes all tests, including 6/6 Skill-contract tests;
- Copy Gate reports 0 findings unless an unrelated repository change has occurred;
- static build succeeds.

- [ ] **Step 5: Commit the minimal Skill change**

```bash
git add .agents/skills/b2b-technical-proposal-messaging/SKILL.md
git commit -m "feat: add proposal compression gate"
```

Expected repository effect: push-triggered Quality Gate should turn GREEN at this commit if no unrelated failure exists.

---

### Task 3: GREEN-validate the revised Skill against the AutoCAD proposal

**Files:**
- Create: `docs/skill-tests/2026-08-12-proposal-compression-green-autocad.md`
- Read only: current proposal source files already used by the original Skill GREEN validation.

**Interfaces:**
- Consumes: current `feat/proposal-compression-gate` proposal source and revised Skill.
- Produces: project-specific `Frontstage Payload` decisions that preserve ACT02 9-step and ACT04 12-step semantics.

- [ ] **Step 1: Re-read current proposal source before compression decisions**

Read at minimum:

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
src/lib/charts/cadSimulator.js
```

Record the exact branch/head readout. Confirm repository facts remain ACT02=9 and ACT04=12. If they changed, stop and re-scope instead of reusing this plan blindly.

- [ ] **Step 2: Produce a six-section compression application**

Create `docs/skill-tests/2026-08-12-proposal-compression-green-autocad.md` with these sections:

```markdown
# Proposal Compression Gate — GREEN Application: AutoCAD Proposal

## Source / version readout
## Preserved source facts and responsibility boundaries
## ACT01 Frontstage Payload
## ACT02 Frontstage Payload
## ACT03 Frontstage Payload
## ACT04 Frontstage Payload
## ACT05 Frontstage Payload
## ACT06 Frontstage Payload
## Cross-section compression review
## Claim / evidence review
## eden-engineering-copy handoff
## GREEN verdict
```

For every ACT, include all four buckets exactly: `Must show`, `Evidence carries`, `Background only`, `Remove or move`.

Required project decisions:
- ACT01 owns proposal orientation and only teases the scope problem.
- ACT02 preserves all 9 current workflow steps as semantic evidence; surrounding prose is compressed instead of the workflow.
- ACT03 owns the full scope-control insight and the no-measured-time boundary.
- ACT04 preserves all 12 proposed workflow steps, selection-gated interaction meaning, human judgment, and concept-simulation disclaimer.
- ACT05 owns deterministic calculation vs AI query/explanation/summary vs human confirmation and traceability.
- ACT06 keeps engineering-experience systemization and treats the real-drawing-validation CTA as a separate strategic addition, not historical source fact.

The GREEN verdict must explicitly state that no `src/` file was changed by this validation.

- [ ] **Step 3: Run the Skill contract after the behavioral application**

Run:

```bash
npx vitest run tests/b2bTechnicalProposalSkillContract.test.js
```

Expected: 6/6 PASS.

- [ ] **Step 4: Commit AutoCAD GREEN evidence**

```bash
git add docs/skill-tests/2026-08-12-proposal-compression-green-autocad.md
git commit -m "docs: validate proposal compression on AutoCAD proposal"
```

---

### Task 4: GREEN-validate the revised Skill outside CAD

**Files:**
- Create: `docs/skill-tests/2026-08-12-proposal-compression-green-cross-domain.md`
- Reference: `docs/skill-tests/2026-08-12-b2b-technical-proposal-messaging-green-cross-domain.md`

**Interfaces:**
- Consumes: the existing synthetic industrial IoT fixture and revised Skill.
- Produces: evidence that Proposal Compression remains domain-generic and does not weaken unsupported-claim controls.

- [ ] **Step 1: Reuse the existing synthetic IoT fixture facts without inventing new proof**

Preserve these facts:

```text
- maintenance manager / controls engineer buyer-review context;
- technician reads three sensors and records results in a spreadsheet;
- fixed engineering thresholds are deterministic;
- gateway collects sensor data;
- AI queries stored results and drafts a summary;
- technician confirms;
- simulator is concept evidence, not production deployment;
- a speed/detection-time claim lacks measured evidence.
```

- [ ] **Step 2: Create the cross-domain GREEN document**

Use this structure:

```markdown
# Proposal Compression Gate — GREEN Application: Industrial IoT Fixture

## Fixture facts
## Section Content Contract summary
## Frontstage Payload
### Must show
### Evidence carries
### Background only
### Remove or move
## Responsibility preservation
## Unsupported-claim check
## Interaction-first compression check
## Domain-generic check
## GREEN verdict
```

Required verdicts:
- deterministic threshold evaluation remains program/rule responsibility;
- AI remains query/summary/explanation only;
- technician confirmation remains explicit;
- simulator detail can carry sequence without full prose duplication;
- unsupported speed claim is removed/backgrounded or labeled as an evidence gap, never compressed into a stronger claim;
- no CAD-specific terminology is required by the Skill.

- [ ] **Step 3: Commit cross-domain GREEN evidence**

```bash
git add docs/skill-tests/2026-08-12-proposal-compression-green-cross-domain.md
git commit -m "docs: validate proposal compression cross-domain"
```

---

### Task 5: Final strict review, Quality Gate, and scope verification

**Files:**
- Create: `docs/skill-tests/2026-08-12-proposal-compression-review.md`
- Read: revised Skill, RED evidence, both GREEN evidence files, Quality Gate logs, branch diff.

**Interfaces:**
- Consumes: all Task 1-4 artifacts and final branch head.
- Produces: final project-level review evidence and a clean integration decision point.

- [ ] **Step 1: Run final full project verification at the final head**

Run:

```bash
npm ci
npm run test:offline
npm run verify:rules
npm run check
npm test
npm run audit:copy
npm run build
```

Expected:
- dependencies install successfully; record existing vulnerability count separately without changing scope;
- offline/rules/check/tests/audit/build all PASS;
- Svelte has 0 errors / 0 warnings;
- Skill contract has 6/6 PASS;
- no unsupported claim regression is introduced.

- [ ] **Step 2: Confirm the push-triggered GitHub Actions Quality Gate**

Use the workflow run for the final commit on `feat/proposal-compression-gate` and confirm every step succeeds:

```text
Install dependencies
Run offline contract tests
Verify project rules
Run Svelte check
Run Vitest
Audit proposal copy
Build static site
```

Record the final Quality Gate run ID and final head SHA in the review document.

- [ ] **Step 3: Compare branch scope against the approved base**

Compare:

```text
e04f1202188bf6894d4d8d4c9dcfa3b579e613e0...feat/proposal-compression-gate
```

Expected changed paths are limited to:

```text
.agents/skills/b2b-technical-proposal-messaging/SKILL.md
tests/b2bTechnicalProposalSkillContract.test.js
docs/superpowers/specs/2026-08-12-proposal-compression-gate-design.md
docs/superpowers/plans/2026-08-12-proposal-compression-gate.md
docs/skill-tests/2026-08-12-proposal-compression-red.md
docs/skill-tests/2026-08-12-proposal-compression-green-autocad.md
docs/skill-tests/2026-08-12-proposal-compression-green-cross-domain.md
docs/skill-tests/2026-08-12-proposal-compression-review.md
```

Hard fail if any `src/` file changed.

- [ ] **Step 4: Create the final review document**

Create `docs/skill-tests/2026-08-12-proposal-compression-review.md` with:

```markdown
# Proposal Compression Gate — Final Review

## Verdict
## Final head / Quality Gate
## RED evidence
## GREEN evidence: AutoCAD
## GREEN evidence: cross-domain
## Proposal Compression contract coverage
## eden-engineering-copy strict-review handoff
## Scope verification
## Remaining governance
```

The `Verdict` may be PASS only if:
- RED failed for the intended missing behavior;
- the revised contract is 6/6 GREEN;
- both behavioral GREEN applications satisfy the spec;
- final Quality Gate passes;
- branch diff contains no `src/` edits;
- no merge/deploy/central registration is claimed.

`Remaining governance` must state that integration back into `feat/ux-hierarchy-v2` requires a separate user decision and that `main`/deployment remain out of scope.

- [ ] **Step 5: Commit final review evidence**

```bash
git add docs/skill-tests/2026-08-12-proposal-compression-review.md
git commit -m "docs: review proposal compression gate"
```

- [ ] **Step 6: Re-run/fetch verification for the review commit itself**

Because the final review commit changes the final branch head, fetch the push-triggered Quality Gate for that review commit and confirm it also succeeds. Do not reuse the previous run as a fresh final-head result.

- [ ] **Step 7: Stop at the integration decision gate**

Do not open a PR, merge into `feat/ux-hierarchy-v2`, merge to `main`, deploy, modify central Drive registration, or retire `proposal-copywriting` without a new explicit user decision.

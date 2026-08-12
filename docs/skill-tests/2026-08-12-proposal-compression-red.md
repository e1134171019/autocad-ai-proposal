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

Targeted contract intent: the five existing tests remain green while the new compression test fails because the Skill has not yet been edited.

Observed repository Quality Gate behavior at RED commit:

- five pre-existing `b2bTechnicalProposalSkillContract` tests: PASS;
- new `compresses frontstage proposal content without deleting engineering meaning` test: FAIL;
- overall Vitest: 22 test files PASS / 1 test file FAIL; 118 tests PASS / 1 test FAIL;
- offline contract tests: PASS;
- project rules: PASS;
- Svelte check: 0 errors / 0 warnings;
- Copy Gate and build were skipped after the intentional Vitest failure.

## Quality Gate evidence

- RED commit: `99c03825d9b83b60f316d3d89c513ed6cb2be44b`
- Quality Gate run: `31595034308`
- failing job: `verify`
- failing step: `Run Vitest`
- failing assertion: `tests/b2bTechnicalProposalSkillContract.test.js:56:30`
- exact failure: `AssertionError: expected -1 to be greater than -1`
- meaning: `source.indexOf('## Proposal Compression')` returned `-1`, proving the required Skill section was absent before implementation.

This is the intended TDD RED. The failure is isolated to the new Proposal Compression contract; no unrelated repository failure was observed in the executed pre-Vitest checks.

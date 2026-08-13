# B2B Copy-Only RED Evidence

Date: 2026-08-13
Branch: `feat/proposal-messaging-copy-only-v1`
RED commit: `1173ea6675c0643f85b0a9da9b9c2d6b19c1ca68`
Quality Gate: `31665803749`
Conclusion: expected failure

## What failed

The new `tests/b2bProposalCopyOnlyContract.test.js` ran 7 tests:

- 5 failed because the real site still contained the previous chapter titles/copy.
- 2 passed before implementation:
  - ACT02/ACT04 protected workflow counts and engineering semantics remained 9/12.
  - user-provided B2B banned expressions were not present in the affected copy surfaces.

Representative failure:

`expected Act01Hero.svelte to contain <h1>我們的提案</h1>`

The source still contained:

`<h1>AutoCAD 施工圖長度與數量自動驗算</h1>`

## Baseline health before expected Vitest failure

- `npm run test:offline`: PASS
- `npm run verify:rules`: PASS
- `npm run check`: PASS, Svelte 0 errors / 0 warnings
- existing tests outside the new contract: 23 test files / 120 tests PASS
- new contract: 1 test file, 5 failed / 2 passed
- total: 24 test files, 5 failed / 120 passed out of 125 tests
- Copy Gate and build were skipped by CI after the intentional Vitest failure.

## RED validity

PASS. The failure is caused by missing approved B2B copy, not by syntax errors, dependency errors, workflow regressions or test setup failure.

No production source had been changed at this RED point.
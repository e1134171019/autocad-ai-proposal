# PR Summary — UX Hierarchy v2

## Why
Client feedback: the page treated too many chapters/colors as equal priority, and the opening was difficult to understand.

## Changes
- Put the AutoCAD length/quantity verification proposition first.
- Add a compact current-vs-plugin workflow comparison above secondary navigation.
- Move the six-section outline below the primary explanation.
- Replace stale ACT 03 timing claims with workflow-comparison language.
- Neutralize ordinary AI/standard/manual prose highlight colors while preserving CAD ByLayer/state colors.

## TDD / verification
- RED run `31546880601`: the new UX contract failed in the expected four places while existing tests stayed green.
- GREEN run `31546985899`: offline tests, rules, Svelte check, Vitest, Copy Gate, and static build all passed.

## Scope exclusions
No CAD calculation changes, no selection changes, no layer-name changes, no simulator animation changes, no dependency changes, and no merge to `main` before preview review.

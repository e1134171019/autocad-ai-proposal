# UX Hierarchy v4 — Visual System / Layout Redesign

## Status

- project_mode: existing_change
- deliverable: website
- branch: `feat/ux-hierarchy-v2`
- base: `main`
- formal_main_modified: false
- production_deploy_authorized: false
- merge_authorized: false
- design_direction_approved_by_user: true
- implementation_requires_written_spec_review: true

## Why v4 exists

UX Hierarchy v2 and v3 corrected the opening proposition, stale timing language, narrative keyword colors, mobile semantic navigation, Concept Simulation boundary, Rule Engine / AI Assistant responsibility split, and result traceability.

However, the visual system still preserves too much of the old presentation model:

- global `.section` still uses `min-height: 100vh`, so most chapters retain equal hero weight;
- section titles remain very large across the whole page;
- the narrative palette still exposes several competing semantic color families even though most keyword coloring was removed;
- cards, charts, and section spacing still make many sections feel equally important;
- mobile was improved structurally, but not yet reweighted as a complete reading experience.

Independent Figma and Hybrid exploration converged on the same higher-level principle: the page should not visually treat every chapter, term, and subsystem as a primary message.

## Core design principle

> 顏色表示狀態或工程語意；版面大小表示資訊階層。不是每個章節都要有相同舞台。

The approved v3 content and engineering responsibility model remain authoritative. v4 changes presentation hierarchy, spacing, section weight, and narrative color usage; it does not change CAD calculation behavior.

## Visual hierarchy model

The page uses differentiated section weights instead of equal full-screen chapters.

### Weight map

- Hero: XL
- Core problem: L
- Current workflow: M
- Workflow comparison: M
- Proposed / CAD Concept Simulation: XL
- Calculation / Traceability: L
- Summary: S

`XL`, `L`, `M`, and `S` are semantic layout weights, not fixed viewport heights.

### Global rule

Remove the generic `min-height: 100vh` requirement from ordinary `.section` blocks.

Only sections whose content genuinely needs a large visual stage may opt into a larger minimum height or spacing through explicit component classes.

## Color system

### Narrative UI

General proposal storytelling should use one main accent plus neutral surfaces.

- Background: warm off-white
- Surface: white / subtle neutral
- Foreground: near-black
- Secondary text: neutral gray
- Borders: light neutral gray
- Primary accent: existing proposal blue

### Narrative colors to retire from active prose semantics

The following tokens must no longer be used as independent narrative categories:

- `--keyword-ai`
- `--keyword-standard`
- `--keyword-manual`

They may remain temporarily as compatibility tokens only if existing tests/components still reference them, but ordinary proposal prose must not rely on them for meaning.

### Technical teal

`--technical` must not act as a second general-brand accent across narrative sections. It may remain for genuinely technical diagrams, calculation context, or CAD-adjacent technical states where the distinction carries information.

### CAD semantic colors

Do not neutralize real CAD meaning. Preserve ByLayer and interaction/status colors, including exterior, shaft, dimension, selection, hover, ignored/reference, warning/error, and result-state colors.

## Typography hierarchy

The page should have three dominant narrative levels:

1. one page-level hero proposition;
2. section statement / problem statement;
3. supporting explanatory text.

ACT labels, mono labels, indexes, and technical captions become secondary metadata.

### Hero

Keep the approved proposition:

`AutoCAD 施工圖長度與數量自動驗算`

The hero remains the largest typography on the site.

### Ordinary sections

Reduce ordinary `.section-title` scale so ACT02–ACT06 do not visually restart the website.

### Problem statement

The approved sentence remains a strong L-level statement:

`真正的問題不是把數字加起來，而是先確認這一次哪些物件應該算。`

It may be visually stronger than ordinary section headings, but still below the hero.

## Section redesign

### Hero / ACT01 — XL

Purpose: 5–10 second comprehension.

Keep:

- proposal title;
- one support sentence;
- current vs plugin workflow;
- core problem statement.

Reduce:

- excessive vertical dead space;
- secondary chapter outline prominence;
- unnecessary metadata weight.

The six-section outline remains secondary navigation/content, not the hero.

### ACT02 — M

Purpose: explain the current workflow without creating a second hero.

- tighter top/bottom spacing;
- smaller heading than hero;
- CAD/manual process remains readable;
- do not rebuild the simulator logic;
- supporting explanation should lead into the visual instead of competing with it.

### ACT03 — M

Purpose: compare workflow steps and risks.

- chart and risk list remain;
- compress vertical spacing;
- risk numbering should not turn every item into an alert state;
- red/danger should only indicate real warning/error meaning, not generic list numbering.

### ACT04 — XL

Purpose: product demonstration climax.

This is where the CAD Concept Simulation earns a large stage.

- `Concept Simulation｜提案操作示意` remains visible before the simulator;
- CAD simulator may use a wide/full visual container;
- narrative copy before it stays concise;
- simulator must not be represented as completed AutoCAD API / real DWG production integration.

### ACT05 — L

Purpose: trust and responsibility clarity.

Keep v3 structure:

- `C# / Rule Engine`;
- `AI Assistant`;
- traceability chain;
- calculation context visualization.

Reweight layout so the section reads as one trust section, not several equal cards.

Desktop target:

- context visualization supports the explanation;
- Rule Engine is primary responsibility block;
- AI Assistant is visibly subordinate/supporting;
- traceability is the concluding trust mechanism.

Mobile target:

- no oversized blank technical panel;
- stack Rule Engine → AI Assistant → Traceability;
- traceability entries remain readable without feeling like six equal hero cards.

### ACT06 — S

Purpose: concise final conclusion.

Reduce height and visual weight substantially.

The conclusion should reinforce:

`人做工程判斷，程式做確定性計算，AI 協助查詢與解釋。`

No new marketing-style CTA is introduced in v4.

## Card and border system

Do not use cards simply because content is important.

Use three presentation modes:

1. open text + divider for narrative content;
2. structured grid/table only for comparable evidence;
3. contained panel only for actual system/technical UI.

Avoid turning every numbered item into a boxed card.

Borders should remain thin and neutral. No decorative shadows or gradients; existing project rule prohibitions remain binding.

## Spacing system

Keep existing spacing tokens, but use them with section-weight rules:

- XL sections: largest vertical spacing;
- L sections: strong but not viewport-filling spacing;
- M sections: compact explanatory spacing;
- S sections: short closing spacing.

The implementation should prefer semantic section modifier classes over arbitrary one-off pixel values.

## Mobile redesign

Mobile must be treated as its own hierarchy, not a desktop shrink.

Required outcomes:

- hero remains understandable in first viewport;
- semantic chapter menu from v3 remains;
- ordinary section title sizes are reduced;
- section vertical spacing is materially smaller than desktop;
- CAD / technical visuals may scroll or stack, but must not cause unreadable miniaturization;
- ACT05 must avoid an empty or oversized context panel before the useful content;
- evidence rows stack cleanly;
- touch targets and visible focus behavior remain accessible.

## Navigation

Keep the v3 semantic mobile menu.

Desktop navigation remains compact and secondary; chapter numbers and labels must not compete with the hero.

No navigation architecture expansion in v4.

## Components / files expected to change

Primary visual-system scope:

- `src/app.css`
- `src/lib/tokens.css`
- `src/lib/components/Act01Hero.svelte`
- `src/lib/components/Act02Flow.svelte`
- `src/lib/components/Act03Problem.svelte`
- `src/lib/components/Act04Solution.svelte`
- `src/lib/components/Act05Intelligence.svelte`
- `src/lib/components/Act06Summary.svelte`
- `src/lib/components/Nav.svelte` only if spacing/weight adjustments are necessary
- contract tests for section weight, color semantics, and mobile hierarchy

`CadProcess.svelte` and CAD D3 modules should only change if a layout wrapper is strictly necessary; calculation, selection, layer filtering, animation semantics, and command behavior are preserved.

## Preserved behavior

Must remain unchanged:

- standard layer filtering;
- selection boundary logic;
- length calculation;
- quantity calculation;
- ignored object reasons;
- traceability data semantics;
- manual workflow semantics;
- CAD ByLayer colors and interaction state colors;
- Rule Engine / AI Assistant responsibility boundary introduced in v3;
- Concept Simulation disclosure;
- no unverified time-saving or efficiency claims.

## Prohibited scope

v4 does not authorize:

- merge to `main`;
- production deploy;
- branch deletion;
- real AutoCAD API / DWG integration;
- C# plugin work;
- Ollama integration;
- CAD simulator behavior rewrite;
- dependency/security cleanup;
- README/version cleanup;
- AGENTS/Drive governance reconciliation;
- new marketing claims;
- new external assets or paid actions.

## TDD / validation contract

Before production CSS/component changes, add RED contract tests that prove the old visual model still exists.

Minimum contracts:

1. ordinary `.section` no longer requires `min-height: 100vh`;
2. explicit section weight modifiers exist or equivalent component rules establish unequal hierarchy;
3. narrative components do not use AI/manual/standard keyword colors for ordinary prose;
4. ACT03 generic risk index does not use danger red as decorative numbering;
5. ACT04 retains Concept Simulation boundary and receives large-stage treatment;
6. ACT05 keeps Rule Engine primary, AI Assistant secondary, and traceability readable on mobile;
7. ACT06 uses compact closing treatment;
8. CAD semantic color contract remains intact;
9. existing mobile semantic navigation remains intact.

Final verification must include:

- `npm run test:offline`
- `npm run verify:rules`
- `npm run check`
- `npm test`
- `npm run audit:copy`
- `npm run build`

Then create branch-only Desktop and Mobile preview evidence. Any temporary preview workflow must be removed before final review diff.

## Success criteria

A client looking at the final page should perceive a clear visual sequence rather than six equal chapters:

`Hero → Core Problem → Explanation → Product Simulation → Trust / Traceability → Short Conclusion`

The interface should feel calmer even before reading the text because hierarchy is carried by scale, spacing, and grouping instead of many competing colors.

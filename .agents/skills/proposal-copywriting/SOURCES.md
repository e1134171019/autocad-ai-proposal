# proposal-copywriting — Source Audit

Reviewed: 2026-08-12
Status: project candidate; central Drive registry not yet writable from this chat.

## Primary external sources

### coreyhaines31/marketingskills
- Repository: `coreyhaines31/marketingskills`
- Reviewed repository head: `7868cb9251fad80a73d26e488a5ad5f6c4a9f335`
- License: MIT
- Reviewed skills:
  - `skills/copywriting/SKILL.md` — frontmatter version `2.0.1`
  - `skills/sales-enablement/SKILL.md` — frontmatter version `2.0.1`
- Adopted concepts: clarity before cleverness; customer language; benefit/outcome translation; one primary action; story arc rather than feature tour; buyer-specific emphasis; proof discipline.

### manojbajaj95/claude-gtm-plugin
- Repository: `manojbajaj95/claude-gtm-plugin`
- Reviewed repository head: `3c308fa4f7879d13d3d3df394247eabf6d26b684`
- License: MIT
- Reviewed skill: `skills/brand-messaging-and-positioning/SKILL.md`
- Adopted concepts: distinguish positioning, messaging, and value proposition; resolve clarity → relevance → value → differentiation; define alternatives and proof before copy.

### rampstackco/claude-skills
- Repository: `rampstackco/claude-skills`
- Reviewed repository head: `0479242522549dfdb389bb9b7807ad4d6016ffb7`
- License: MIT
- Reviewed skill: `skills/landing-page-copy/SKILL.md`
- Adopted concepts: hero as promise + mechanism + action; problem before solution; capability-to-benefit translation; objection handling; one conversion goal; no fabricated proof.

## Local evidence

The baseline failure is documented at:

`docs/skill-tests/2026-08-12-proposal-copywriting-baseline.md`

Observed failure: a high-stakes AI proposal headline was selected too early, before a formal positioning brief and controlled headline comparison.

## Deliberate exclusions

- No imported source text is treated as project truth.
- No external ROI/time/error-reduction examples may be reused as claims.
- No requirement to use a specific marketing framework mechanically.
- No pricing/SOW/legal workflow is included; use a separate proposal/SOW skill for those artifacts.

## Runtime / security

This skill has no executable dependency, network requirement, secret, credential, or write permission. It is a reasoning/writing SOP. External research is optional and must be cited separately when used.

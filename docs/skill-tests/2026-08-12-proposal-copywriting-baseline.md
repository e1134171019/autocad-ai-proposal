# Proposal Copywriting Skill — RED Baseline

Date: 2026-08-12
Branch: feat/ux-hierarchy-v2
Status: RED / pre-skill

## Pressure scenario

Given an existing AutoCAD proposal website whose commercial goal is to win a B2B project, propose a new hero headline and page narrative after the user says the site should use AI as part of the sales packaging.

## Expected disciplined behavior

Before selecting a headline, the agent should establish:

1. target buyer / ICP;
2. status-quo alternative;
3. customer problem in customer language;
4. primary value / outcome;
5. differentiator;
6. available proof vs. unproven claims;
7. single next-step conversion goal;
8. multiple headline / subheadline / CTA candidates with rationale.

The page narrative should then be derived from positioning rather than from the word `AI` alone.

## Observed baseline failure

Without a dedicated proposal-copywriting skill, GPT jumped directly to `AutoCAD AI 智慧驗算方案` as the preferred v5 hero direction after the commercial positioning discussion.

That response had useful instincts, but it skipped a formal positioning pass and treated one headline candidate as if it were already close to a decision. It did not first compare explicit category, audience, value, differentiation, proof, and alternative frames. It also did not generate a controlled set of headline variants for evaluation.

## Why this is a real failure

The current production-source Hero on the feature branch is still `AutoCAD 施工圖長度與數量自動驗算`. The new AI-oriented headline was therefore a proposed change, not evidence-backed existing copy.

A sales proposal headline is high-stakes copy. A candidate that sounds marketable is not enough; it must be derived from the buyer and offer model and remain claim-safe.

## GREEN criteria for the new skill

A future agent using the skill must:

- perform positioning before copy selection;
- separate category / value / differentiation / proof;
- keep AI prominent only where the offer genuinely contains AI-assisted value;
- prevent deterministic CAD calculations from being attributed to the LLM;
- produce at least 5 headline candidates using different strategic frames;
- pair each headline with a mechanism subheadline and one primary CTA direction;
- flag unsupported metrics, testimonials, guarantees, deployment claims, and fabricated proof;
- choose or recommend a winner only after comparing clarity, relevance, value, differentiation, credibility, and conversion fit.

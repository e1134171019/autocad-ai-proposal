# Method sources and review trace

`eden-engineering-copy` is an original project Skill. It does not import third-party code and does not copy third-party Skill prose. The sources below were reviewed as method references during external discovery.

| Source | Reviewed snapshot | License | Method retained |
|---|---|---|---|
| `aeopress/writing-skills.TW` | commit `1b53212feae1608651ce078c7c5c613f624b48ea`; `humanizer-tw` 1.3.0; `good-writing-tw` 1.2.0 | MIT | Taiwan zh-TW anti-overcorrection; separate de-AI and concision responsibilities; conservative technical-document editing |
| `leoluyi/skills` | commit `96b7964d6f07bbfc6995d656b44eefd258ea147f`; `humanizer-zh` 2.3.0; `plain-speak` 1.5.0 | MIT | audience-first plain language; preserve facts; flag missing substance instead of inventing it |
| `voidful/michelin` | commit `c6aded0bc9f9b43875a738d38a708e0e04c39408`; 0.2.0 | MIT (declared in SKILL frontmatter) | separate fidelity, quality, and independent validation; AI detector is not ground truth |
| `Raymondhou0917/speak-human-tw` | commit `b6f3e9fc3884e94f6c0dcf347cf99eb0c3466f52`; 1.4.0 | MIT | protected spans; annotation before rewrite; Taiwan localization; false-positive awareness |

## Deliberately not adopted

- No external Skill is a runtime dependency or formal route for this project.
- No AI-generated-text detector is used as proof of authorship or quality.
- No claimed benchmark number from an external repository is inherited as evidence for this Skill.
- No rule that requires adding personal stories, emotions, slang, or artificial irregularity is adopted.
- No automatic rewrite is allowed in the deterministic gate.

## Local evidence

The project benchmark is `tests/fixtures/copyGateCases.js`. It is the evidence for this project version, not the external repositories' benchmarks.

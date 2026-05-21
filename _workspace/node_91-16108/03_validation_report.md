# Validation report — node 91:16108

**Overall: WARN** — 14 PASS · 4 WARN · 0 FAIL (18 checks)

## Schema (9/9 PASS)
- components: required fields, type enum, props type enum, variants↔props, metadata arithmetic — all PASS
- tokens: 7-key shape, color hex format (`^#[0-9A-F]{6}$`), typography required fields, name format — all PASS

## Cross-reference
- **PASS** — every `token_refs[]` entry on every component resolves to a registered token (33 unique refs, 100% resolved).
- **WARN** — sectional components (Header, ColorTokensRecap, TypographySection, SpacingAndRadiusSection, ComponentTokenMap) point children at numeric Figma ids (91:16208 etc.) AND at pattern ids (`text-style-row`, `swatch-card`, etc.). The numeric ids are not registered as standalone components — by design, they are instances of the pattern ids. Treat numeric children refs as source pointers.

## Completeness
- **PASS** — no Figma COMPONENT / COMPONENT_SET nodes exist in the source, so 0/0 missed.
- **WARN** — 100% inferred. Expected for a token-documentation page; flagged for human review.

## Consistency (3/3 PASS)
- Variant prop keys are consistent within each component.
- No token name collisions across categories.
- **Cross-node equivalence:** the 43 tokens here are byte-identical to those extracted from 91:15743 — confirms this node duplicates the same handoff content.

## Usability
- **PASS** — 43 tokens across 4 categories.
- **WARN** — all components inferred.
- **WARN** — `get_variable_defs` returned `{}`; values were inferred from labels (point-in-time snapshot).

## Top WARNs
1. `cross-ref.children-resolved` — numeric leaf-instance ids in children unresolved (informational pointers, not real refs).
2. `completeness.inferred-ratio` + `usability.all-inferred` — 100% inferred; expected for documentation pages.
3. `usability.no-variables` — no Figma variables; inferred values are a snapshot.

## Decision
**WARN — integrate** (proceed to Stage 5, no blocking failures).

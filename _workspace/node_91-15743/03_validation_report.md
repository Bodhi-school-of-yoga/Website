# Design Extraction Validation Report — node 91:15743

## Summary
- **Overall:** WARN
- Passed: 11 | Warned: 4 | Failed: 0 | Total: 15

## Failures
None.

## Warnings

### 1. `cross-ref.children-resolved` — WARN
`TypographySection`, `ColorTokensRecap`, `SpacingAndRadiusSection`, and `ComponentTokenMap` reference leaf-instance node ids (e.g. `91:15861`, `91:15871`, …) in their `children[].ref` arrays. These ids are not registered as standalone components because they are instances of the registered pattern components (`text-style-row`, `swatch-card`, `spacing-tile`, `radius-tile`, `component-token-map-row`). The numeric refs are intentional source-pointers so the consumer can resolve back to Figma if needed. Not a structural defect, but the validator flags it because the schema can't distinguish "instance-of-pattern" from "missing component".

### 2. `completeness.inferred-ratio` — WARN
12 / 12 (100%) of extracted components have `type: "inferred"`. The threshold for WARN is >40%. **Reason:** documentation pages in Figma typically use plain FRAMEs rather than COMPONENT/COMPONENT_SET nodes. This is expected and matches the previous node (91:15377).

### 3. `usability.all-inferred` — WARN
Same root cause as #2. Recommend human review of the inferred component boundaries before treating this as a reusable component library.

### 4. `usability.no-variables` — WARN
`get_variable_defs` returned `{}`. All 43 tokens were inferred from the visible documentation labels. Values are point-in-time snapshots — re-run extraction if the Figma file gets variable bindings added later.

## Recommendations
1. Treat leaf-instance ids in `children[].ref` (e.g. `91:15861`) as informational source-pointers. The semantically correct ref is the pattern id (e.g. `text-style-row`).
2. When the Figma team adds variables to this file, re-run `token-extractor` to replace the inferred values.
3. The Figma file ships `text-teritary` (misspelled). The token name preserves this misspelling — re-extract if it gets renamed in Figma.

## All checks
| Check ID | Category | Result |
|----------|----------|--------|
| schema.components.required-fields | schema | PASS |
| schema.components.type-enum | schema | PASS |
| schema.components.props-type-enum | schema | PASS |
| schema.components.variants-imply-props | schema | PASS |
| schema.components.metadata-arithmetic | schema | PASS |
| schema.tokens.7-keys | schema | PASS |
| schema.tokens.color-hex-format | schema | PASS |
| schema.tokens.typography-required-fields | schema | PASS |
| schema.tokens.name-format | schema | PASS |
| cross-ref.token-exists | cross-reference | PASS |
| cross-ref.children-resolved | cross-reference | WARN |
| completeness.figma-components-extracted | completeness | PASS |
| completeness.inferred-ratio | completeness | WARN |
| consistency.variant-props | consistency | PASS |
| consistency.token-name-collisions | consistency | PASS |
| usability.zero-tokens | usability | PASS |
| usability.all-inferred | usability | WARN |
| usability.no-variables | usability | WARN |

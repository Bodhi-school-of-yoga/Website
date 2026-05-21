# Design Extraction Validation Report — Node 91:15377

## Summary
- **Overall:** WARN
- Passed: 11 | Warned: 3 | Failed: 0 | Total: 14

## Failures
None.

## Warnings

### 1. `schema.tokens.name-format` — WARN
Token names contain hyphens (e.g. `color/brand-primary`, `color/surface-0`). The strict
figma-validation rule states names should use "lowercase ASCII + `/` + digits only".
All names are otherwise consistent and well-formed; flagged as a format deviation, not a defect.

### 2. `completeness.inferred-ratio` — WARN
100% (16/16) of components are `type: "inferred"`, exceeding the 40% threshold.
The source node is a documentation page without explicit Figma COMPONENT or
COMPONENT_SET nodes, so inference is the only available path. Expected for this node type.

### 3. `usability.all-inferred` — WARN
All components are inferred AND all tokens are inferred from the design-context React/Tailwind
code (Figma `get_variable_defs` returned an empty object). Expected fallback behavior for a
token-documentation page that does not yet have Figma variables defined.

## Recommendations
1. Define the 15 colors as Figma variables in the source file so future extractions can use the variables endpoint and drop the design-context inference path.
2. Fix the misspelled token `color/text-teritary` → `color/text-tertiary` in Figma; current extraction preserves the typo for source fidelity.
3. Normalize Figma frame names: `Colors/brand lite` (whitespace) and `Colors/brand_dark` (underscore) → adopt one convention (hyphen).
4. Document `color/text-brand` as an explicit Figma alias of `color/brand-primary` (same hex `#009877`) so the alias becomes machine-readable.
5. If strict token-name format (no hyphens) is required, update the token-extractor SKILL or accept current kebab-case as project convention.

## All Checks
| Check ID | Category | Result |
|----------|----------|--------|
| schema.components.required-fields | schema | PASS |
| schema.components.metadata-arithmetic | schema | PASS |
| schema.tokens.required-fields | schema | PASS |
| schema.tokens.name-format | schema | WARN |
| schema.tokens.color-hex-format | schema | PASS |
| cross-ref.token-exists | cross-ref | PASS |
| cross-ref.children-ref-exists | cross-ref | PASS |
| completeness.figma-components-extracted | completeness | PASS |
| completeness.inferred-ratio | completeness | WARN |
| consistency.variant-props | consistency | PASS |
| consistency.token-mode-uniformity | consistency | PASS |
| consistency.name-collisions | consistency | PASS |
| usability.zero-components | usability | PASS |
| usability.all-inferred | usability | WARN |

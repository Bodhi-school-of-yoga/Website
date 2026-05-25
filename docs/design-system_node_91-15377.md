# Design System — Node 91:15377 ("01 — Color Tokens")

**Figma source:** `eqaofBeNUhOUISevtRfOpT`, node `91:15377`
**Extracted:** 2026-05-21 (via Figma MCP `get_design_context` — variables endpoint returned empty, so tokens inferred from React+Tailwind capture)

## Extraction Stats
| Metric | Value |
|--------|-------|
| Components extracted | 16 (1 page + 15 swatch cards) |
| Components inferred  | 16 / 16 (100%) |
| Tokens extracted     | 15 |
| Token categories     | color only |
| Modes                | default |
| Validation overall   | WARN (11 PASS / 3 WARN / 0 FAIL) |

## Validation Summary
- **Overall:** WARN
- **Warnings (3):**
  1. `schema.tokens.name-format` — token names include hyphens (e.g. `color/brand-primary`); strict spec asks for "lowercase ASCII + `/` + digits only".
  2. `completeness.inferred-ratio` — 100% of components are inferred (expected: page has no explicit Figma COMPONENT nodes).
  3. `usability.all-inferred` — both components and tokens fully inferred (expected fallback; Figma variables not yet defined).
- **Failures:** none.
- Detail: `_workspace/node_91-15377/03_validation_report.md`

## Token Catalog (15)

### Brand (4)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/brand-primary` | `#009877` | Primary CTA, links, accents |
| `color/brand-shade`   | `#8EE0CE` | Hover states, tints |
| `color/brand-lite`    | `#F0FFF8` | Light backgrounds, highlights |
| `color/brand-dark`    | `#00282C` | Dark backgrounds, footer |

### Text (5)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/text-primary`   | `#1D3E59` | Main headings & titles |
| `color/text-secondary` | `#2A2420` | Body copy, paragraphs |
| `color/text-teritary`  | `#727272` | Captions, meta, placeholders (sic) |
| `color/text-brand`     | `#009877` | Branded text, highlighted words (alias of brand-primary) |
| `color/text-inverse`   | `#FFFFFF` | Text on dark backgrounds |

### Surface (3)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/surface-0` | `#FDFDFD` | Page background |
| `color/surface-1` | `#FFFFFF` | Card background |
| `color/surface-2` | `#F7F7F7` | Subtle section background |

### Border (3)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/border-1` | `#F4F4F4` | Lightest divider |
| `color/border-2` | `#F0F0F0` | Standard card border |
| `color/border-3` | `#D2D2D2` | Stronger separator |

## Components (16)

| ID | Name | Type | Token refs |
|----|------|------|------------|
| 91:15377 | ColorTokensPage           | inferred | — (container) |
| 91:15391 | Colors/brand-primary      | inferred | `color/brand-primary` |
| 91:15396 | Colors/brand-shade        | inferred | `color/brand-shade` |
| 91:15401 | Colors/brand lite         | inferred | `color/brand-lite` |
| 91:15406 | Colors/brand_dark         | inferred | `color/brand-dark` |
| 91:15413 | Text/text-primary         | inferred | `color/text-primary` |
| 91:15418 | Text/text-secondary       | inferred | `color/text-secondary` |
| 91:15423 | Text/text-teritary        | inferred | `color/text-teritary` |
| 91:15428 | Text/text-brand           | inferred | `color/text-brand` |
| 91:15433 | Text/text-inverse         | inferred | `color/text-inverse` |
| 91:15440 | Surface/Surface-0         | inferred | `color/surface-0` |
| 91:15445 | Surface/Surface-1         | inferred | `color/surface-1` |
| 91:15450 | Surface/Surface-2         | inferred | `color/surface-2` |
| 91:15457 | Border/border-1           | inferred | `color/border-1` |
| 91:15462 | Border/border-2           | inferred | `color/border-2` |
| 91:15467 | Border/border-3           | inferred | `color/border-3` |

All 15 swatch `token_refs` resolved against the token catalog (`cross-ref.token-exists` → PASS).
All 15 children refs from `ColorTokensPage` resolve to component ids (`cross-ref.children-ref-exists` → PASS).

## Top Recommendations
1. Promote the 15 hex values to Figma variables so future extractions stop relying on design-context inference.
2. Fix the Figma typo: `text-teritary` → `text-tertiary`.
3. Normalize Figma frame names (`Colors/brand lite`, `Colors/brand_dark`) to a single hyphen convention.

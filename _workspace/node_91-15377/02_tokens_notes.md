# Token Catalog — Node 91:15377 (01 — Color Tokens)

**Source:** `01_figma_context.json` (React+Tailwind code capture).
**Variables JSON:** empty (`{}`) — no Figma variables defined; all tokens inferred from design-context.
**Modes:** `default` only.

## Statistics
- Total tokens extracted: **15**
- All tokens: category `color`
- Brand: 4 | Text: 5 | Surface: 3 | Border: 3
- Other categories (typography/spacing/radius/effect/breakpoint/other): empty

## Brand (4)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/brand-primary` | `#009877` | Primary CTA, links, accents |
| `color/brand-shade` | `#8EE0CE` | Hover states, tints |
| `color/brand-lite` | `#F0FFF8` | Light backgrounds, highlights |
| `color/brand-dark` | `#00282C` | Dark backgrounds, footer |

## Text (5)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/text-primary` | `#1D3E59` | Main headings & titles |
| `color/text-secondary` | `#2A2420` | Body copy, paragraphs |
| `color/text-teritary` | `#727272` | Captions, meta, placeholders (sic — preserved verbatim) |
| `color/text-brand` | `#009877` | Branded text, highlighted words (alias of brand-primary) |
| `color/text-inverse` | `#FFFFFF` | Text on dark backgrounds |

## Surface (3)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/surface-0` | `#FDFDFD` | Page background |
| `color/surface-1` | `#FFFFFF` | Card background |
| `color/surface-2` | `#F7F7F7` | Subtle section background |

## Border (3)
| Token | Hex | Usage |
|-------|-----|-------|
| `color/border-1` | `#F4F4F4` | Lightest divider |
| `color/border-2` | `#F0F0F0` | Standard card border |
| `color/border-3` | `#D2D2D2` | Stronger separator |

## Extraction Notes
- Source frame names with whitespace (`Colors/brand lite`) or underscores (`Colors/brand_dark`) were normalized to hyphenated slugs.
- `color/text-brand` duplicates the value of `color/brand-primary`. Recorded as a separate semantic alias rather than collapsing.
- `color/text-teritary`: typo (`teritary` vs `tertiary`) preserved to match the Figma source. Flag for design cleanup.
- All `extraction_notes` on tokens read: "inferred from design-context — no Figma variable defined".

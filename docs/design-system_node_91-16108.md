# Bodhi Design System — node 91:16108 ("03 — Spacing Scale")

**Source:** [Figma — node 91:16108](https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/?node-id=91-16108)
**Extracted:** 2026-05-21 · strategy: inference from design-context (no Figma variables)
**Validation:** WARN (14 PASS · 4 WARN · 0 FAIL)

> **Note:** Despite the title "03 — Spacing Scale", this frame's bounding box transitively contains the entire design-system handoff — Header, Color Tokens recap, Typography, Spacing Scale, Border Radius and the Component Token Map. The extracted token set is **byte-identical to node 91:15743**. Treat 91:15743 as the canonical source; this file documents the duplicate render so cross-checks are possible.

## Components (12, all inferred)
1. **DesignSystemPage/03-SpacingScale** — root documentation frame
2. **Header** — Bodhi School of Yoga branding + H1 + tagline
3. **ColorTokensRecap** — 15 swatch cards in Brand / Text / Surface / Border rows
4. **ColorSwatchCard** — 300×80 reusable swatch (sample, name, hex, usage)
5. **TypographySection** — TypefaceTile × 2 + TextStyleRow × 9
6. **TypefaceTile** — 620×100 font display, variants: Host Grotesk · DM Sans
7. **TextStyleRow** — 1280×64 type-style row, variants: H1..H5 · subtext-3..1 · mini-text
8. **SpacingAndRadiusSection** — 12 spacing tiles + 7 radius tiles
9. **SpacingTile** — 96×96, variants: xs · sm · sm+ · md · md+ · lg · xl · 2xl · 3xl · 4xl · 5xl · 6xl
10. **RadiusTile** — 160×80, variants: none · xs · sm · md · lg · xl · full
11. **ComponentTokenMap** — 8-row token-mapping table
12. **ComponentTokenMapRow** — variants: Primary Button · Ghost Button · Card · Input Field · Badge/Tag · Nav Link · Section Heading · Footer

## Tokens (43 total)

### Color (15)
| Token | Hex | Usage |
|---|---|---|
| color/brand-primary | `#009877` | Primary CTA, links, accents |
| color/brand-shade | `#8EE0CE` | Hover states, tints |
| color/brand-lite | `#F0FFF8` | Light backgrounds, highlights |
| color/brand-dark | `#00282C` | Dark backgrounds, footer |
| color/text-primary | `#1D3E59` | Main headings & titles |
| color/text-secondary | `#2A2420` | Body copy, paragraphs |
| color/text-teritary | `#727272` | Captions, meta, placeholders *(Figma misspelling)* |
| color/text-brand | `#009877` | Branded text *(alias of brand-primary)* |
| color/text-inverse | `#FFFFFF` | Text on dark backgrounds |
| color/surface-0 | `#FDFDFD` | Page background |
| color/surface-1 | `#FFFFFF` | Card background |
| color/surface-2 | `#F7F7F7` | Subtle section background |
| color/border-1 | `#F4F4F4` | Lightest divider |
| color/border-2 | `#F0F0F0` | Standard card border |
| color/border-3 | `#D2D2D2` | Stronger separator |

### Typography (9)
| Token | Font | Weight | Size / LH / LS | Usage |
|---|---|---|---|---|
| typography/h1 | Host Grotesk | 700 | 90 / 77 / 0 | Hero headlines |
| typography/h2 | Host Grotesk | 600 | 52 / 53 / −0.56 | Section headings |
| typography/h3 | Host Grotesk | 700 | 42 / 43 / −0.72 | Sub-section titles |
| typography/h4 | Host Grotesk | 700 | 36 / 42 / 0 | Card headings |
| typography/h5 | DM Sans | 600 | 24 / 23 / −0.11 | Labels |
| typography/subtext-3 | DM Sans | 600 | 20 / 25 / 0 | Lead body / intro |
| typography/subtext-2 | DM Sans | 400 | 18 / 26.25 / 0 | Descriptive body |
| typography/subtext-1 | DM Sans | 400 | 16 / 23.25 / 0.08 | Standard body, nav |
| typography/mini-text | DM Sans | 600 | 12 / 17 / 2.42 | Tags, badges, captions |

### Spacing (12) — base unit 4 px
`xs 4 · sm 8 · sm+ 12 · md 16 · md+ 20 · lg 24 · xl 32 · 2xl 40 · 3xl 48 · 4xl 64 · 5xl 80 · 6xl 96`

### Border Radius (7)
`none 0 · xs 4 · sm 8 · md 12 · lg 16 · xl 24 · full 9999`

## Component Token Map
| Component | Fill | Text | Border | Radius | Typography | States |
|---|---|---|---|---|---|---|
| Primary Button | brand-primary | text-inverse | — | radius/sm | subtext-1 SemiBold | Hover brand-shade · Disabled 40% |
| Ghost Button | transparent | text-brand | brand-primary 1px | radius/sm | subtext-1 SemiBold | Hover brand-lite bg |
| Card | surface-1 | text-secondary | border-2 1px | radius/md | H5 title · subtext-1 body | Hover surface-2 · shadow |
| Input Field | surface-1 | text-secondary | border-3 1px | radius/sm | subtext-1 Regular | Focus brand-primary border |
| Badge / Tag | brand-lite | text-brand | — | radius/full | mini-text | — |
| Nav Link | transparent | text-secondary | — | — | subtext-1 Regular | Active text-brand + underline |
| Section Heading | transparent | text-primary | — | — | H2 or H3 | — |
| Footer | brand-dark | text-inverse | — | — | subtext-1 · mini-text | — |

## Notes
- All values are **inferred** from text labels — Figma variables are unset (`get_variable_defs` → `{}`).
- Token names preserve Figma spelling quirks (`text-teritary`, `brand_dark`); they are normalized in name only (`brand-dark`, `brand-lite`, `sm-plus`, `md-plus`).
- For canonical consumption prefer [`design-system_node_91-15743.json`](./design-system_node_91-15743.json) — same content, primary extraction.

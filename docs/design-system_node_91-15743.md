# Bodhi Design System — Node 91:15743

**Source:** [Figma — 02 — Typography](https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/?node-id=91-15743)
**Extracted:** 2026-05-21
**Validation:** WARN (11 PASS / 4 WARN / 0 FAIL — all inferred + no Figma variables)

> Despite being titled "02 — Typography", this Figma page also re-states the Color tokens and adds Spacing, Border Radius, and a Component Token Map. The canonical typography reference is here.

---

## Typefaces

| Family | Role | Used by |
|--------|------|---------|
| **Host Grotesk** | Primary / display | H1, H2, H3, H4 |
| **DM Sans** | Secondary / UI body | H5, subtext-3, subtext-2, subtext-1, mini-text |

> Apply via text styles — never set font manually.

## Typography Tokens

| Token | Family | Weight | Size | Line Height | Letter Spacing | Usage |
|-------|--------|--------|------|-------------|----------------|-------|
| `typography/h1` | Host Grotesk | 700 | 90 | 77 | 0 | Hero headlines, page titles |
| `typography/h2` | Host Grotesk | 600 | 52 | 53 | -0.56 | Section headings |
| `typography/h3` | Host Grotesk | 700 | 42 | 43 | -0.72 | Sub-section titles |
| `typography/h4` | Host Grotesk | 700 | 36 | 42 | 0 | Card headings |
| `typography/h5` | DM Sans | 600 | 24 | 23 | -0.11 | Labels, small headings |
| `typography/subtext-3` | DM Sans | 600 | 20 | 25 | 0 | Lead body, intro paragraphs |
| `typography/subtext-2` | DM Sans | 400 | 18 | 26.25 | 0 | Descriptive body text |
| `typography/subtext-1` | DM Sans | 400 | 16 | 23.25 | 0.08 | Standard body, nav links |
| `typography/mini-text` | DM Sans | 600 | 12 | 17 | 2.42 | Tags, badges, captions |

## Color Tokens (recap)

### Brand
| Token | Hex | Usage |
|-------|-----|-------|
| `color/brand-primary` | `#009877` | Primary CTA, links, accents |
| `color/brand-shade` | `#8EE0CE` | Hover states, tints |
| `color/brand-lite` | `#F0FFF8` | Light backgrounds, highlights |
| `color/brand-dark` | `#00282C` | Dark backgrounds, footer |

### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `color/text-primary` | `#1D3E59` | Main headings & titles |
| `color/text-secondary` | `#2A2420` | Body copy, paragraphs |
| `color/text-teritary` | `#727272` | Captions, meta, placeholders *(Figma misspelling preserved)* |
| `color/text-brand` | `#009877` | Branded text — alias of `color/brand-primary` |
| `color/text-inverse` | `#FFFFFF` | Text on dark backgrounds |

### Surface
| Token | Hex | Usage |
|-------|-----|-------|
| `color/surface-0` | `#FDFDFD` | Page background |
| `color/surface-1` | `#FFFFFF` | Card background |
| `color/surface-2` | `#F7F7F7` | Subtle section background |

### Border
| Token | Hex | Usage |
|-------|-----|-------|
| `color/border-1` | `#F4F4F4` | Lightest divider |
| `color/border-2` | `#F0F0F0` | Standard card border |
| `color/border-3` | `#D2D2D2` | Stronger separator |

## Spacing Scale

Base unit **4px**. All values are multiples of 4. Use for padding, margin, and gap.

| Token | Value | Alias |
|-------|-------|-------|
| `spacing/xs` | 4 | xs |
| `spacing/sm` | 8 | sm |
| `spacing/sm-plus` | 12 | sm+ |
| `spacing/md` | 16 | md |
| `spacing/md-plus` | 20 | md+ |
| `spacing/lg` | 24 | lg |
| `spacing/xl` | 32 | xl |
| `spacing/2xl` | 40 | 2xl |
| `spacing/3xl` | 48 | 3xl |
| `spacing/4xl` | 64 | 4xl |
| `spacing/5xl` | 80 | 5xl |
| `spacing/6xl` | 96 | 6xl |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius/none` | 0 | Sharp elements |
| `radius/xs` | 4 | Badges, tags |
| `radius/sm` | 8 | Cards, inputs |
| `radius/md` | 12 | Modals, panels |
| `radius/lg` | 16 | Large cards |
| `radius/xl` | 24 | Hero sections |
| `radius/full` | 9999 | Pills, avatars |

## Component Token Map

| Component | Fill | Text | Border | Radius | Typography | States |
|-----------|------|------|--------|--------|------------|--------|
| Primary Button | `color/brand-primary` | `color/text-inverse` | — | `radius/sm` (8px) | `subtext-1` SemiBold | Hover: `brand-shade` · Disabled: 40% opacity |
| Ghost Button | transparent | `color/text-brand` | `brand-primary` 1px | `radius/sm` (8px) | `subtext-1` SemiBold | Hover: `brand-lite` bg |
| Card | `color/surface-1` | `color/text-secondary` | `border-2` 1px | `radius/md` (12px) | `H5` title · `subtext-1` body | Hover: `surface-2` + shadow |
| Input Field | `color/surface-1` | `color/text-secondary` | `border-3` 1px | `radius/sm` (8px) | `subtext-1` Regular | Focus: `brand-primary` border |
| Badge / Tag | `color/brand-lite` | `color/text-brand` | — | `radius/full` (999px) | `mini-text` | — |
| Nav Link | transparent | `color/text-secondary` | — | — | `subtext-1` Regular | Active: `text-brand` + underline |
| Section Heading | transparent | `color/text-primary` | — | — | `H2` or `H3` | — |
| Footer | `color/brand-dark` | `color/text-inverse` | — | — | `subtext-1` · `mini-text` | — |

---

## Caveats

- **No Figma variables.** `get_variable_defs` returned `{}`. All values were inferred from visible labels — re-extract if the Figma team adds variables.
- **All components inferred.** Figma exposes no `COMPONENT`/`COMPONENT_SET` nodes for this documentation page — every entry in `02_components.json` is pattern-matched.
- **Figma misspelling preserved.** `color/text-teritary` (not "tertiary") is the actual Figma name.
- **`radius/full = 9999`** stands in for the `∞` symbol displayed in Figma. Render as `9999px` or `999px` per existing CSS conventions.

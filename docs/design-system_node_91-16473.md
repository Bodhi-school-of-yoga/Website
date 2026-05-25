# Bodhi Design System — Node 91:16473

**Page:** 04 — Component Token Map
**Source:** [Figma file `eqaofBeNUhOUISevtRfOpT`, node 91-16473](https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=91-16473)
**Extracted:** 2026-05-21 · **Validation:** PASS (3 WARN, 0 FAIL)

## What's on this page
This is the developer-facing **reference table** that ties every Bodhi UI component back to its named design tokens. It also re-displays the color, typography, spacing, and border-radius documentation from pages 1-3 so engineers have everything in one scroll. Sections 01-03 here are duplicates of earlier pages — the unique payload is **Section 04: Component Token Map**.

## Component Token Map (7 components)

| Component | Fill | Text | Border | Radius | Typography | States |
|-----------|------|------|--------|--------|------------|--------|
| Primary Button   | `brand-primary` | `text-inverse`   | —                  | `8px`   | `subtext-1` SemiBold      | Hover: `brand-shade` · Disabled: 40% opacity |
| Ghost Button     | `transparent`   | `text-brand`     | `brand-primary 1px`| `8px`   | `subtext-1` SemiBold      | Hover: `brand-lite` background               |
| Card             | `Surface-1`     | `text-secondary` | `border-2 1px`     | `12px`  | `H5` title · `subtext-1` body | Hover: `Surface-2` + shadow              |
| Input Field      | `Surface-1`     | `text-secondary` | `border-3 1px`     | `8px`   | `subtext-1` Regular       | Focus: `brand-primary` border                |
| Badge / Tag      | `brand-lite`    | `text-brand`     | —                  | `999px` | `mini-text`               | —                                            |
| Nav Link         | `transparent`   | `text-secondary` | —                  | —       | `subtext-1` Regular       | Active: `text-brand` + underline             |
| Section Heading  | `transparent`   | `text-primary`   | —                  | —       | `H2` or `H3`              | —                                            |

## New tokens introduced on this page
- `opacity.disabled = 0.4` — for the Primary Button disabled state.
- `border-width.hairline = 1px` — implicit hairline used by Card, Input Field, Ghost Button.

## Cross-page consistency
All token names cited here (`brand-primary`, `text-inverse`, `Surface-1`, `border-2`, `H5`, `subtext-1`, etc.) resolve cleanly to tokens already defined on pages 1-3. No new color/typography tokens were introduced. This is the "binding" layer of the design system.

## Validation warnings
1. **Reference-only rows** — component geometry (padding, height, icon slots) is not specified on this page. Pull those from the actual rendered handoff pages or live design.
2. **Badge radius literal** — table says `999px` while the radius scale defines `full = 9999px`. Functionally identical for badge sizes; prefer the `full` / pill token in code.
3. **Frame bounds quirk** — Figma reports the node as 1440×688, but its children render the full multi-section document. Resolved without data loss.

## Cross-page summary
| Page | Node | Role |
|------|------|------|
| 1 | 91:15377 | Color token reference (15 swatches) |
| 2 | 91:15743 | Full handoff render (12 components + 43 tokens documented) |
| 3 | 91:16108 | Spacing scale focus (with duplicate of full handoff) |
| 4 | **91:16473** | **Component-to-token mapping table (THIS page)** |

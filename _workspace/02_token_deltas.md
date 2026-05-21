# Token Deltas — Article Card (node `1:246`)

**Sources:** `_workspace/01_figma_context.json` (inline JSX values — `01_figma_variables.json` is `{}`, no Figma variable bindings). Project token inventory: `apps/web/src/app/globals.css` + `DESIGN.md`.

## Snapshot

| | count |
|---|---|
| Used tokens (already in project) | 2 |
| Missing tokens (no close match) | 20 |
| New tokens recommended | 9 |
| Map-to-nearest (acceptable rounding) | 12 |

## Used tokens (exact matches)

| Figma value | Project token | Tailwind | Note |
|---|---|---|---|
| `#ffffff` card bg | `--color-surface-1` | `bg-surface-1` | Also `--card` (oklch 1 0 0) |
| `#009877` CTA | `--color-brand-primary` / `--color-text-brand` | `text-brand-primary` | Exact |

## Missing tokens — add new

| Proposed token | Value | Theme group | Why new |
|---|---|---|---|
| `--color-text-heading-forest` | `#2f4a3e` | Text | text-primary is slate-blue, not forest-green |
| `--color-text-meta` | `#7a6e65` | Text (optional) | text-tertiary `#727272` is acceptable substitute |
| `--color-brand-sand` | `#c8a96e` | Brand | warm token reads too orange |
| `--color-divider-forest` | `rgba(47,74,62,0.22)` | Border | tinted forest, not neutral grey |
| `--text-card-title` | 23 / 25 / 0 / 600 Instrument Sans | Typography (+ new `--font-display`) | Family not loaded |
| `--text-meta` | 14 / normal / 0.12px / 500 DM Sans | Typography | weight + tracking + family differ from body-sm |
| `--text-cta-link` | 14.27 / 22.12 / 0.09 / 500 Manrope | Typography (+ new `--font-cta`) | Family not loaded |
| `--radius-card-lg` | `1.51rem` (24.151px) | Radius | 3xl=26.4 and 2xl=21.6 both > 2px off |
| `--shadow-card` | `0 4px 48.3px 0 rgba(226,226,226,0.25)` | NEW Elevation group | DESIGN.md flags shadows undefined |

## Missing tokens — map to nearest (no new token)

| Figma value | Mapped to | Tailwind | Delta |
|---|---|---|---|
| `1.098px` borders | `1px` | `border` / `border-t` | sub-pixel |
| Border `rgba(0,0,0,0.08)` | `--color-border-2` `#F0F0F0` | `border-border-2` | ~3 ΔE |
| Radius `24.151px` | `--radius-3xl` (26.4px) | `rounded-3xl` | +2.25px (or add `--radius-card-lg`) |
| `pt 22.098px` | `--spacing-lg` (24px) | `pt-6` | +1.9px |
| `pb 24.098px` | `--spacing-lg` (24px) | `pb-6` | sub-pixel |
| `px 31.836px` | `--spacing-xl` (32px) | `px-8` | sub-pixel |
| `gap 10.1px` | `--spacing-sm-plus` (12px) | `gap-3` | +1.9px |
| Meta icon gap `5px` | `--spacing-xs` (4px) | `gap-1` | -1px |
| Meta row gap `14px` | `--spacing-md` (16px) | `gap-4` | +2px |
| Heading-meta gap `20px` | `--spacing-md-plus` (20px) | `gap-5` | exact |
| Divider top pad `16.467px` | `--spacing-md` (16px) | `pt-4` | sub-pixel |

## Top 3 most impactful missing tokens

1. **`--shadow-card`** — DESIGN.md explicitly notes no elevation tokens exist. This card's diffuse warm-grey shadow (`0 4px 48.3px rgba(226,226,226,0.25)`) defines its calm-floating feel; Tailwind's `shadow-md` (denser, blacker, 6px blur) misses the mood badly. Adding this is the start of the elevation scale.
2. **`--color-text-heading-forest` (`#2f4a3e`)** — no close hue in the palette. `--color-text-primary` (#1D3E59) is slate-blue; `--color-brand-dark` (#00282C) is too dark. The forest-green heading is the editorial signature of the Article card.
3. **`--text-card-title` font family (Instrument Sans)** — not loaded by `next/font` in `apps/web/src/app/layout.tsx`. Available faces are Host Grotesk, DM Sans, Playfair Display, Geist Mono. The title falls back to system sans without a new `next/font` binding. The same blocker applies to `--text-cta-link` (Manrope).

## Notes

- `01_figma_variables.json` is empty — the Card node uses inline raw values, not Figma variables. All deltas above derive from the JSX in `01_figma_context.json`.
- The Figma node uses many off-4px-grid values (`22.098px`, `10.1px`, `16.467px`, `1.098px`, `24.151px`, `48.3px`). DESIGN.md's "Don't use raw px spacing" rule recommends snapping to the 4px scale — most rounding deltas above are <=2px and within tolerance.
- If brand strictly requires Instrument Sans + Manrope, add both to `apps/web/src/app/layout.tsx` via `next/font/google` and bind to new theme variables (`--font-display`, `--font-cta`) under `@theme inline`.

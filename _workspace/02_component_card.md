# Card — Article variant

**Source:** Figma node `1:246` (`Article`), file `eqaofBeNUhOUISevtRfOpT`.
**Target:** `apps/web/src/components/ui/card.tsx` (existing slot API).
**Dimensions:** 413 × 375 px.

## What this card actually is

A course/program card for a yoga-studio landing page. Title → meta-row (duration / format / language) → dashed divider → CTA. **No image slot** in the Figma node — only a decorative full-bleed gradient asset (`1:247`) sitting behind the content. The user brief called this "image-top variant" but the Figma source does not include one. Flagged as a `high` severity gap for the validator to confirm.

## Chrome

| Property   | Figma                                       | Project token                              | Match     |
|------------|---------------------------------------------|--------------------------------------------|-----------|
| Background | `#FFFFFF`                                   | `bg-card`                                  | exact     |
| Border     | `1.098px rgba(0,0,0,0.08)`                  | `border border-border-1`                   | near (opaque approximation of 8% black) |
| Radius     | `24.151px`                                  | `rounded-2xl` (21.6px)                     | approx — 2.5px under |
| Shadow     | `0 4px 48.3px rgba(226,226,226,0.25)`       | `shadow-[0_4px_48px_rgba(226,226,226,0.25)]` | **gap** — no shadow scale exists |
| Padding    | `22 / 32 / 24 / 32` px                      | `pt-6 pb-6 px-8` (24px / 32px)             | near (collapsed asymmetric vertical) |

## Slots (top → bottom)

1. **decorative-gradient** (`1:247`) — full-bleed raster gradient behind everything. **Not in current Card API.** Recommend re-creating as CSS `linear-gradient(bg-warm/30 → bg-card)` or skipping; do not ship the raster.
2. **title** (`1:251`) — "Pranayama & the nervous system". Figma: Instrument Sans SemiBold 23/25 `#2f4a3e`. Project: `CardTitle` with `font-heading text-h5 font-semibold text-foreground`. Instrument Sans is not loaded → substitute DM Sans.
3. **meta-row** (`1:252`) — three icon+label pairs (4 weeks / Online / English) separated by 3px warm-clay dots. Figma: DM Sans Medium 14/0.12, `#7a6e65`. Project: `font-heading text-body-sm font-medium text-muted-foreground`. Dots: `size-[3px] rounded-full bg-warm/50`. **Gap: no meta-row slot.** Render inline `<ul>` inside `CardHeader`.
4. **divider** (`1:270`) — dashed top border, `1.098px rgba(47,74,62,0.22)`. Project: `border-t border-dashed border-foreground/20`. **Gap: `CardFooter` is solid-by-default.** Pass className override; or introduce a `divider="dashed"` prop if reused.
5. **cta** (`1:271`) — "View Program →". Figma: Manrope Medium 14/22, `#009877`. Project: `font-sans text-body-sm font-medium text-brand-primary`. Manrope is not loaded → substitute Host Grotesk.
6. **reserved-right** (`1:272`) — empty 117×23 cell on the right of the footer; future home for a badge/price. Leave empty.

## Font mapping (Figma → project)

| Figma family       | Project family             | Class          | Why |
|--------------------|----------------------------|----------------|-----|
| Instrument Sans 600 | DM Sans `var(--font-heading)` | `font-heading` | Instrument Sans not loaded; DM Sans is the project heading face (DESIGN.md canonical). |
| Manrope 500         | Host Grotesk `var(--font-sans)` | `font-sans`    | Manrope not loaded; Host Grotesk is the project default sans. |
| DM Sans 500         | DM Sans                      | `font-heading` | Exact. |

## Where the slot API needs work

- **CardFooter divider style** — currently hard-coded `border-t border-border`. Needs either a `dashed` variant or to accept a className override cleanly (current shadcn-style className merge already permits this; just document it).
- **Meta-row helper** — there is no `CardMeta` slot. Inline `<ul>` works for one variant; promote to a real slot only if more cards need it.
- **Decorative backdrop** — no `Card` variant supports a gradient/image backdrop behind content. Out of scope; treat as polish.

## Token gaps for design-validator

| Severity | Field | Issue |
|----------|-------|-------|
| **high** | image-top | User brief says "image-top variant"; Figma node has no image. Confirm correct node. |
| **med**  | chrome.shadow | No shadow scale in `globals.css`. Add `--shadow-card` token. |
| **med**  | slots.divider | `CardFooter` has no dashed-divider variant. |
| low      | chrome.radius | 24.151px → `rounded-2xl` 21.6px (~2.5px delta). |
| low      | chrome.border.color | `rgba(0,0,0,0.08)` → opaque `border-border-1`. |
| low      | slots.meta-row | No `CardMeta` slot; inline for now. |
| low      | fonts | Instrument Sans + Manrope not loaded → DM Sans / Host Grotesk substitution. |
| low      | title.color #2f4a3e | Custom deep-green not in palette → `text-foreground`. |

## Builder TL;DR

Use existing `Card` / `CardHeader` / `CardTitle` / `CardFooter`. Inline the meta-row `<ul>` inside `CardHeader`. Override `CardFooter` className for dashed top border and transparent fill. Substitute fonts via `font-heading` / `font-sans`. Skip the decorative gradient on first pass. Ship CTA color via `text-brand-primary` (NOT `text-primary` — different emerald). See `proposedJsx` in `02_component_card.json` for the full sketch.

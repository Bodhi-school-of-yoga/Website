# Figma Fetch Log — node 1:3978

- **Date:** 2026-05-22
- **File key:** `eqaofBeNUhOUISevtRfOpT`
- **Node ID:** `1:3978`
- **Figma URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-3978&m=dev
- **Auth:** OK (no `whoami` required — all four MCP tools returned data successfully).

## Artifacts written

| File | Status | Notes |
|---|---|---|
| `01_figma_metadata_node-1-3978.json` | OK | XML tree wrapped in JSON; original XML preserved verbatim in `raw_xml`. |
| `01_figma_context_node-1-3978.json` | OK | React/Tailwind reference code + 5 asset URLs. |
| `01_figma_screenshot_node-1-3978.png` | OK | 1308 x 362 PNG, ~292 KB, downloaded via curl from MCP asset URL. |
| `01_figma_variables_node-1-3978.json` | OK (empty) | `get_variable_defs` returned `{}` — no variables bound to this node. |
| `01_figma_libraries_node-1-3978.json` | OK | File has 4 community libraries subscribed (Material 3, Simple Design System, iOS 18, iOS 26). None are referenced by node 1:3978. |
| Canonical copies | OK | `01_figma_metadata.json`, `01_figma_context.json`, `01_figma_screenshot.png`, `01_figma_variables.json` written. |

## Node shape

`Frame "Frame 1171281881"` — **1308 x 362** — a horizontal "course card" layout:

- **Left half (0–447 px):** Photo (yoga class). `rounded-bl-[35px] rounded-tl-[35px]`. Asset: `imgRectangle161124081`.
- **Right half (487 px+):**
  - Title `Decoding "What is Prana?"` — Host Grotesk Bold, 40px, `#000`, tracking `-0.56px`.
  - Description (DM Sans Regular 17 / `#4b4b4b`, line-height 27px, width 597).
  - Row of 4 feature tiles (110 x 104, `rounded-[17px]`, white bg, `#e2e2e2` border, opacity 82%): "Sat & Sun" (calendar icon), "Studio" (yoga pose icon), "3 days" (clock icon), "English" (icon-park-solid:english mask group).
  - Price `₹249` — Host Grotesk Bold 30px, top-right.
  - **Button (1:4008)** — "Book spot now", 241 x 44, `bg-[#8ee0ce]`, `rounded-[23px]`, `text-[#243a42]`, DM Sans SemiBold 15.
  - "Starts in 3 days" — Host Grotesk Medium 17, bottom-right.
- **Container:** White card, `rounded-[35px]`, border `rgba(211,211,211,0.6)`.

## Prototype / interaction data — NOT FOUND

Per the downstream interaction-designer's needs, I specifically inspected the MCP responses for the following Figma prototype fields:

| Field | Found? |
|---|---|
| `reactions` | No |
| `interactions` | No |
| `prototypeStartNodeID` | No |
| `transitionNodeID` | No |
| `transitionDuration` | No |
| `transitionEasing` | No |

The Figma MCP `get_metadata` and `get_design_context` tools **do not surface prototype/reaction data** for this node. There are two possibilities:

1. **The designer did not author any prototype interactions on this node.** Most likely — the file is labeled `web-handoff` (static spec), and the node is a static card, not a flow start.
2. **The MCP intentionally elides prototype data.** The current MCP server schema returns only structural metadata (geometry, names, fills) and a rendered React reference, not the `reactions` array from the Figma REST API.

**Implication for downstream agents:** All motion / hover / click behavior for this card (button hover state, card hover-lift, tile hover, price emphasis, etc.) must be **invented by the interaction-designer / component-builder**, guided by:
- Bodhi design tokens in `apps/web/src/app/globals.css`
- The project's existing animation conventions (check `apps/web/src/components/ui/*` for patterns already in use)
- General CTA / pricing-card motion best practices (subtle scale, fade, shadow-elevation on hover; ~150–250 ms ease-out)

## Component variants / state

`get_design_context` returned a single visual state. The node is a **plain Frame**, not a Component / Component-Set, so no variant properties exist. Hover / pressed / focus-visible / disabled states for the Button (1:4008) and feature tiles are not defined in Figma.

## Assets / images (7-day TTL)

5 remote MCP asset URLs are recorded inside `01_figma_context_node-1-3978.json`:
- `imgRectangle161124081` — left-side photograph (yoga class).
- `imgVector` — calendar icon (Sat & Sun tile).
- `imgVector1` — yoga-pose icon (Studio tile).
- `imgVector2` — clock icon (3 days tile).
- `imgMaskGroup` — "En" icon (English tile).

Downstream agents must download these locally before the 7-day expiry if they're to be used in code.

## Variables

`get_variable_defs` returned `{}`. All colors, radii, font sizes are inline. Token mapping is left to the component-builder, who should map to `text-text-primary/brand/tertiary`, `bg-surface-*`, etc. per Bodhi tokens.

## Notable

- The button color `#8ee0ce` is the Bodhi mint/accent; matches existing brand usage on this site.
- Card border `rgba(211,211,211,0.6)` ≈ `border-border-subtle` in Bodhi tokens.
- Body text `#4b4b4b` ≈ `text-text-secondary`.
- Tile borders `#e2e2e2` are subtle dividers.
- Tile icons rendered as PNG/SVG via MCP asset URLs — re-export as inline SVGs (lucide/heroicons) when possible (calendar, yoga-pose, clock, language).

## Next steps for downstream agents

- **component-extractor:** Build a `CourseCard` (or `ProgramCard` extension) section component matching this layout. Consider responsive breakdown (the 1308 px width is desktop-only).
- **token-extractor:** No new tokens from variables; only inline colors found. Map to existing Bodhi tokens.
- **interaction-designer:** No Figma-defined reactions. Author motion from scratch following the patterns described above.

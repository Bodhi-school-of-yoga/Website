# Fetch Log — node 1:1516 (Standard Navbar Dropdown)

- **File key:** `eqaofBeNUhOUISevtRfOpT`
- **Node ID:** `1:1516`
- **Figma URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-1516&m=dev
- **Fetched:** 2026-05-22
- **Auth:** OK (no errors)

## MCP Calls

| Call | Status | Output |
|------|--------|--------|
| `get_metadata` | OK | `_workspace/01_figma_metadata_node-1-1516.json` |
| `get_design_context` | OK | `_workspace/01_figma_context_node-1-1516.json` |
| `get_screenshot` | OK | `_workspace/01_figma_screenshot_node-1-1516.png` (105 KB, 512x447) |
| `get_variable_defs` | OK (empty `{}`) | `_workspace/01_figma_variables_node-1-1516.json` |
| `get_libraries` | OK | `_workspace/01_figma_libraries_node-1-1516.json` |

## Node Summary

- **Type:** Dropdown menu panel ("standard navbar dropdown") — outer frame `1:1516` is **445 × 380 px**, white card with rounded corners and shadow.
- **Outer container styling:**
  - `background: #ffffff`
  - `border: 1px solid rgba(123,123,123,0.2)`
  - `border-radius: 22px`
  - `box-shadow: 0px 21px 16.6px rgba(136,136,136,0.25)`
  - Padding: `pt-23 pl-23 pb-28 pr-119` (note the asymmetric large right padding ~119px — likely intentional layout space on the right side of the dropdown card)
- **Inner column (`1:1517`):** flex column, `gap: 19px`, width `401px`.

## Item Structure (3 items, repeating)

Each item row (`1:1518`, `1:1528`, `1:1538`) is a clickable `<a>` element with:

1. **Thumbnail (left):**
   - Fixed `137 × 83 px`, `border-radius: 13px`, `border: 1px solid #e2e2e2`.
   - Contains a background image (Rectangle 161124074 / 161124075 from Figma asset CDN).
   - **Item 1 (`1:1518`) and Item 2 (`1:1528`)** also have an overlaid icon (`ic:round-laptop` 31.13px for item 1; `mdi:yoga` 36.63px for item 2) positioned absolutely over the thumbnail.
   - **Item 3 (`1:1538`)** has the same thumbnail rectangle but **no overlaid icon** in the structure (likely a Figma authoring inconsistency — could be intentional or an icon was forgotten).
2. **Text block (right):** width `198px`, flex column, `gap: 9px`.
   - **Title (`1:1524`/`1:1534`/`1:1544`):** Instrument Sans SemiBold, 22px, black `#000`, `letter-spacing: -0.51px`, line-height `35.7px`.
   - **Subtitle/Description (`1:1525`/`1:1535`/`1:1545`):** Instrument Sans Medium, 16px, gray `#4b4b4b`.
   - **Footer link (`1:1526`/`1:1536`/`1:1546`):** Instrument Sans Medium, 15px, brand green `#048d6f`.

### Item Content

| # | Title | Subtitle | Footer Link | Icon |
|---|-------|----------|-------------|------|
| 1 | **Online Courses** | "At Comfort of your home" | "9 Courses" | `ic:round-laptop` |
| 2 | **Offine - in studio** *(typo: should be "Offline")* | "We have 20+ studios " *(trailing space)* | "9 Courses" | `mdi:yoga` |
| 3 | **Pre-recorded classes** | "access anytime, anywhere" | "9 Courses" | — (none in the design) |

### Dividers

- Between items: thin horizontal lines (`1:1527`, `1:1537`) rendered as `Line 5` / `Line 6` PNG strokes spanning the 401px column width (image asset, not a CSS border).

## Variables / Tokens

- `get_variable_defs` returned `{}` — **no bound Figma variables** on this subtree. All colors and dimensions are hardcoded hex / px in the design. Mapping to Bodhi tokens has to be done manually:
  - `#000000` → `text-text-primary`
  - `#4b4b4b` → `text-text-tertiary` (verify against globals.css)
  - `#048d6f` → `text-text-brand` (Bodhi green)
  - `#e2e2e2` → `border-border-*`
  - `rgba(123,123,123,0.2)` → border on outer card
  - `#ffffff` → `bg-surface-*`

## Quirks / Observations

1. **Typos in source content:** "Offine" (should be "Offline"); trailing space in "We have 20+ studios ".
2. **All three items show identical footer text "9 Courses"** — likely placeholder copy in Figma; real data may vary per item.
3. **Item 3 (Pre-recorded classes) is missing its foreground icon** in the metadata. Either:
   - design oversight (icon was deleted), or
   - the thumbnail image alone is intended to convey the meaning.
   The reference screenshot confirms no icon on item 3 — it shows a person doing yoga only via the photo.
4. **Item 1's thumbnail image uses `object-cover` size-full**, while items 2 & 3 use **manually-cropped absolute positioning** (`left: -84.62%`, `top: -6%` etc.). The two later items also **share the same image asset** `imgRectangle161124075` cropped at different offsets — Figma is reusing a single source image with different crop windows. This may need separate images in code.
5. **Outer card has heavy right padding (119px)** — produces visible right whitespace inside the dropdown panel. Verify against the actual placement screenshot before replicating.
6. **No design variables on this node** — token mapping must be done at codegen time.
7. **Libraries:** File has Material 3, Simple Design System, iOS 18/26 community kits subscribed, but none of those components appear used inside `1:1516`.

## Files Written

- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_metadata_node-1-1516.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_context_node-1-1516.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot_node-1-1516.png`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_variables_node-1-1516.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_libraries_node-1-1516.json`

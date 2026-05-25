# Figma Fetch Log — Bodhi Desktop Home Hero

**File:** `eqaofBeNUhOUISevtRfOpT` (Bodhi landing page web handoff)
**Authenticated as:** tech@wokay.com (full seat on Wokay Design Lab)
**Date:** 2026-05-23

## Page context (clarification)

The five fetched node IDs are **not** different state-variants of the same hero block. They are different *pieces* of the hero region inside the `Homepage` frame (`1:32`, 1920x8033). The "primary" node 75:3228 in particular is the hero image, not the page parent. Mapping below.

The Homepage frame's hero band sits at y=0..~1175 and contains:
- `1:35` — background "Image" frame
- `1:37` — large decorative "बोधि" text (824x442 at x=1257, y=330) overlayed behind the photo
- `75:3228` — meditating-woman hero image (865x952 at x=1199, y=194)
- `1:83` — hero text group (eyebrow + headline + subhead at x=308, y=292..677)

Below the hero (`1:39`, y=1175) is the next "Section" containing a row of three workshop cards (1:595 / 1:603 / 1:611).

## Node-by-node ground-truth map

| Slot | Node | What it actually is | Use as ground truth for |
|------|------|---------------------|-------------------------|
| PRIMARY  | `75:3228` | Meditating-woman hero IMAGE (rounded-rectangle, 865x952, anchored top-right at x=1199, y=194). The image inside is scaled 193.99% / 105% with a -93.99% / -2.5% offset to crop the subject. | Hero **right-side image** — size, crop, position, asset URL. NOT the page parent. |
| VARIANT A | `1:85`  | Eyebrow ("बोधि  ·  The awakening") + 2-color headline ("A school for teachers and a home for seekers.") group only. | Headline + eyebrow typography & two-color treatment. |
| VARIANT B | `1:611` | "Looking for short Workshops" — one of three workshop CTA cards in the band beneath the hero text. Rounded white card 421x102 with eyebrow, title, and circular green arrow button. | Workshop-card component used **below** the hero — useful only if the hero implementation needs to anchor / align to this band. |
| VARIANT C | `1:84`  | Hero **subhead paragraph** only ("Bodhi is a yoga teacher training institute and practice studio…"), 861x99. | Subhead typography, color (rgba(71,71,71,0.71)), 22/33 sizing. |
| VARIANT D | `1:83`  | **Canonical hero text group** — wraps both 1:85 (eyebrow + headline) and 1:84 (subhead). 1059x385 frame at x=308, y=292. | **THE ground-truth hero text block.** Use this for the unified text spec. |

## Recommended ground truth for the hero rebuild

- **Hero text block**: `1:83` (combines `1:85` + `1:84`).
- **Hero image (right)**: `75:3228`.
- **Visual reference**: `01_figma_screenshot_homepage.png` shows the full landing page; the hero is the top ~1200px band.
- **Background decorative "बोधि" text**: `1:37` (not fetched in detail — additional context if needed).

## Output files

- `01_figma_metadata_parent.json` + `01_figma_context_parent.json` + `01_figma_screenshot_parent.png` — node 75:3228 (hero image asset)
- `01_figma_metadata_v1.json` + `01_figma_context_v1.json` + `01_figma_screenshot_v1.png` — node 1:85 (eyebrow + headline)
- `01_figma_metadata_v2.json` + `01_figma_context_v2.json` + `01_figma_screenshot_v2.png` — node 1:611 (workshop card)
- `01_figma_metadata_v3.json` + `01_figma_context_v3.json` + `01_figma_screenshot_v3.png` — node 1:84 (subhead)
- `01_figma_metadata_v4.json` + `01_figma_context_v4.json` + `01_figma_screenshot_v4.png` — node 1:83 (full hero text group — canonical)
- `01_figma_variables.json` — empty `{}` (no Figma variables attached to any hero node)
- `01_figma_libraries.json` — `null` (not fetched; can be re-requested if needed)
- `01_figma_screenshot_homepage.png` — full Homepage frame at 1920w (574x2400 thumbnail), useful for spatial context
- `01_figma_screenshot_hero_full.png` — empty/background-only render of `1:33` (image frame), kept for completeness; not useful on its own

## Issues / notes

1. **Variables endpoint returned `{}`.** No Figma variables are bound to any of the five nodes. All visual values (colors, sizes, spacing) are raw hex / px. The token-extractor must map these to Bodhi's local CSS tokens (`text-h*`, `text-text-*`, `bg-surface-*` in `apps/web/src/app/globals.css`). Key raw values to translate:
   - Eyebrow color `#039474` → likely `text-brand-*` token
   - Headline dark color `#1d3e59` → likely `text-text-primary` token
   - Headline brand color `#009877` → brand green
   - Subhead color `rgba(71,71,71,0.71)` → `text-text-tertiary` or equivalent
   - Workshop-card eyebrow `#00654f`, button bg `#009877`, card border `rgba(123,123,123,0.2)`, card shadow `0 28px 59.1px rgba(192,192,192,0.25)`.
2. **No libraries call was made** (skipped per instructions to keep this fast); `01_figma_libraries.json` saved as `null`. Re-fetch on request.
3. **Hero-only clipped screenshot is not directly available** from the MCP — `1:33` renders empty because it's a background-only frame and the meaningful layers (75:3228, 1:83) are siblings, not children. The combined hero rendering can be reconstructed from `01_figma_screenshot_homepage.png` (top crop) plus the individual variant screenshots.
4. **Auth OK.** No retries required.
5. **Rate limits.** All calls succeeded on first try.

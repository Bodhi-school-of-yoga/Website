# Figma Fetch Log — Testimonial Section (node 1:558)

**File:** `eqaofBeNUhOUISevtRfOpT` — Bodhi landing page web handoff
**Target node:** `1:558` (Frame 1171281840) inside `1:557` (Group 1171281832), inside top-level frame `1:32` "Homepage"
**Fetched:** 2026-05-22
**Auth:** OK (calls returned data, whoami skipped)

## MCP calls
| Call | Status | Output file |
|---|---|---|
| `get_metadata` (1:558) | OK | `01_figma_metadata_testimonial.json` |
| `get_design_context` (1:558) | OK | `01_figma_context_testimonial.json` |
| `get_variable_defs` (1:558) | OK (returned `{}`) | `01_figma_variables_testimonial.json` |
| `get_libraries` | OK | `01_figma_libraries_testimonial.json` |
| `get_screenshot` (1:558, 1600px) | OK | `01_figma_screenshot_testimonial.png` (105 KB) |
| `get_metadata` (0:1 root) | OK (large; saved to MCP cache) | siblings inspected via jq |

## Section dimensions
- Outer frame `1:558`: **1441 x 499** px, positioned at (240, 6504) on Homepage
- Header block `1:559`: 478 x 76 (centered)
- Cards row `1:562`: 1441 x 375
- Each card: **457 x 375**, with **35 px** gap between cards (3 cards visible)

## Header content
- Eyebrow `1:560` "**A Path to Wellness**" — Manrope Medium 11px, color `#009877`, tracking 2.42px, uppercase
- Heading `1:561` "**What our clients say**" — Host Grotesk Bold 52px, color `#2a2420`, tracking -0.56, line-height 53

## Card design tokens (shared)
- Background: `#ffffff` (white)
- Border: `0.998px solid #ddd`
- Border radius: `31.951px` (~32px)
- Inner content rect: 443 x 312, padding 22px x / 10px y
- Avatar: 109 x 109 px circle (`<img>` with rounded full)
- Decorative quote glyph `”`: Instrument Sans SemiBold, **150px**, color `#009877` (brand green), positioned top-right of card 2 & 3 (card 1 lacks the decorative quote in metadata — appears to be an asymmetric design choice or oversight)
- Quote text: DM Sans SemiBold 22px, color `#000000`, tracking -0.11, line-height 29.7, fontVariationSettings: `'opsz' 14`
- Cite text: Manrope Medium 13px, color `#005643` (dark green), tracking 0.52, line-height 20.15

## Testimonials (3 cards)

### Card 1 — `1:563` (Group 1171281831)
- Avatar `1:566`: https://www.figma.com/api/mcp/asset/10eaa972-a09b-4bcd-ad49-767e3e865fbc
- Quote `1:569`: "I came in to lose weight. I left able to teach a class — and a calmer person at home. The training is honest, and that's rare."
- Cite `1:571`: "— Aanya, TTC Cohort 11. Now teaching in Goa."
- Note: NO decorative quote glyph on this card in the metadata.

### Card 2 — `1:572` (Group 1171281830)
- Avatar `1:576`: https://www.figma.com/api/mcp/asset/dfccb620-1c0f-49b6-a8d3-b265c3f2464e
- Decorative quote `1:574`: "”" at (837, 51) — top-right corner
- Quote `1:579`: "The back pain workshop did more in two days than two years of physiotherapy. I've recommended Bodhi to everyone I know."
- Cite `1:581`: "— Ravi, workshop participant"

### Card 3 — `1:582` (Group 1171281829)
- Avatar `1:584`: https://www.figma.com/api/mcp/asset/2bc5a08e-fe4f-4924-9632-bb5a0f98bac2
- Decorative quote `1:589`: "”" at (1332, 55) — top-right corner
- Quote `1:586`: "I practice with Bodhi online from Berlin. Six in the morning, India time. It's the most consistent thing in my week."
- Cite `1:588`: "— Lena, online student, 2 years"

## Asset URLs (7-day expiry)
```
imgEllipse18 (Aanya):  https://www.figma.com/api/mcp/asset/10eaa972-a09b-4bcd-ad49-767e3e865fbc
imgEllipse19 (Ravi):   https://www.figma.com/api/mcp/asset/dfccb620-1c0f-49b6-a8d3-b265c3f2464e
imgEllipse20 (Lena):   https://www.figma.com/api/mcp/asset/2bc5a08e-fe4f-4924-9632-bb5a0f98bac2
```

## Sibling / variant nodes
The same testimonial section appears in **12 page variants** across the file at identical local coordinates `(240, 6504)` size `1441x499`. Each instance has the same 3 testimonials (Aanya / Ravi / Lena). Worth visiting only if you need to confirm consistency or fetch alternative parent layouts. Notable duplicates (same structure, different node IDs):

| Variant root | Parent page | Notes |
|---|---|---|
| `1:557` -> `1:558` | Homepage (1:32) | **Primary — use this one** |
| `1:1286` -> `1:1287` | Header - expanded (1:770) | identical content |
| `1:2047` -> `1:2048` | Online Courses (1:1547) | identical content |
| `1:2843` -> `1:2844` | (page after 1:1547) | identical content |
| `1:3675` -> `1:3676` | next page | identical content |
| `1:4565` -> `1:4566` | next page | identical content |
| `1:5255` -> `1:5256` | next page | identical content |
| `1:6050` -> `1:6051` | next page | identical content |
| `1:6844` -> `1:6845` | next page | identical content |
| `1:7470` -> `1:7471` | next page | identical content |
| `1:8266` -> ... | additional | identical content |
| (12 total) | | |

There are **no testimonial design variants** (no hover/dark-mode/mobile alt) — only repeated copies for different page templates.

## Variables / libraries
- `get_variable_defs` returned `{}` — testimonial section uses no Figma variables (all colors and sizes are raw values). Token mapping will need to happen manually via the design system doc.
- Subscribed libraries are generic community kits (Material 3, Simple Design System, iOS 18/26). None drive testimonial styling.

## Fonts used (raw)
- `Manrope` (Medium) — eyebrow + cite
- `Host Grotesk` (Bold) — section heading
- `DM Sans` (SemiBold) — quote body (with `opsz: 14` variation)
- `Instrument Sans` (SemiBold) — decorative `”` glyph

## Notes / warnings
- Card 1 (Aanya) is missing the large decorative `”` glyph that cards 2 & 3 have. Either design oversight or intentional asymmetry — verify with designer if shipping pixel-perfect.
- Container width is `1441px` (not 1440/1920). The Homepage frame itself is 1920px wide, so the testimonial section starts at x=240 (centered with 240px padding on each side).
- Card inner background is `rgba(255,255,255,0.05)` — essentially invisible over the white card; the visual is driven entirely by the outer rounded-rect (`#ffffff`, 0.998px border `#ddd`).
- All MCP calls succeeded on first attempt; no retries needed.

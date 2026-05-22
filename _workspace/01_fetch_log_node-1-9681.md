# Figma Fetch Log — node 1:9681

## Input
- **File key:** `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
- **Node id:** `1:9681`
- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-9681&m=dev

## Section
- **Name:** `About us`
- **Type:** Frame
- **Position on canvas:** x=14700, y=7569
- **Dimensions:** 1920 × 5446 (desktop, full long-scroll page)

## Fetch Status

| MCP call | Status | Notes |
|---|---|---|
| `get_metadata` | OK | Full XML structure captured |
| `get_design_context` | OK (truncated) | React+Tailwind tree; output hit ~25000 token cap after delivering full UI tree. All structural data extracted before truncation. |
| `get_variable_defs` | OK | 20 variables (font-size/style/family, line-height, letter-spacing, opacity, radius, color) |
| `get_libraries` | OK | 4 subscribed (Material 3, Simple Design System, iOS 18/26) — none authored by Bodhi |
| `get_screenshot` | OK | 1920×5446 → rendered 565×1600 PNG (238 KB) |

## Top-level children (10 frames/instances)

| id | name | dims | role |
|---|---|---|---|
| 1:9682 | Rectangle 161124051 | 2502×737 @ (-322,-150) | Top background tint (#f0fff8) |
| 1:9683 | Rectangle 161124058 | 1920×655 @ (0,3499) | Testimonials band bg (#fafafa) |
| 1:9684 | Group 1171281832 | 1441×499 @ (240,3562) | **Testimonials** ("What our clients say" + 3 cards) |
| 1:9718 | Mask group | 603×260 @ (659,183) | **Hero** ("About Bodhi School of Yoga" + Join CTA) |
| 1:9727 | Group 1171281805 | 1285×375 @ (321,747.68) | **Pillars** (Healing / Expert / Community) |
| 1:9753 | vision-text | 527×445 @ (295,1277) | Empty placeholder frame |
| 1:9754 | Group 1171281812 | 1337×2083 @ (292,1242) | **Vision story** (4 image-text rows + Vision/Mission cards) |
| 1:9790 | Section stats | 1920×100 @ (0,582) | **Stats** (100K+ / 20+ / 15+ / 10K+) |
| 1:9800 | Group 1171281731 | 1300×56 @ (310,20) | **Navbar instance** |
| 1:9801 | Group 1171281878 | 1920×1302 @ (0,4144) | **Footer + CTA** ("Begin where you are" + 3 mini-cards + 4-col footer) |

## Variables / tokens referenced

From `get_variable_defs`:
- **Color:** `color/White/White-1` → `#ffffff` (only one color variable found — most colors are inline hex)
- **Typography composites:**
  - `HTML to Figma/Dm sans-14/Regular` → DM Sans 14 / 400 / lh 23.8 / ls 0
  - `HTML to Figma/Dm sans-13/Medium` → DM Sans 13 / 500 / lh 21.45 / ls 0.5
- **Font:** `fontFamily/DM Sans`, styles `Regular`, `Medium`, `SemiBold`
- **Sizes:** `fontSize/11`, `13`, `14`, `22`
- **Line heights:** `lineHeight/18_15`, `21_45`, `23_8`, `28_8`, `36_3`, `48`
- **Letter spacing:** `letterSpacing/0`, `0_5`
- **Radius:** `radius/16`
- **Opacity:** `opacity/100`

## Inline hex colors found in the design context

Brand greens: `#009877` (primary), `#10aa88` (italic accent), `#27af91` (CTA pill), `#005643` (citation), `#004b3b` (small CTA button text), `#038f9f` (Vision card bg)
Mints/tints: `#f0fff8` (top bg), `#e5fff9` (footer bg), `#ebfffb` (Mission card bg), `#c7fef2` (small CTA button bg), `#8ee0ce` (navbar Enquire btn)
Neutrals: `#fafafa`, `#ffffff`, `#000000`, `#2a2420`, `#4b4b4b`, `#7a6258` (warm body), `#7b7b7b`, `#454545`, `#f2f2f2`, `#1d3e59`
Borders/strokes: `#ddd`, `#eee`, `#e1e1e1`, `rgba(126,126,126,0.18)`, `rgba(47,74,62,0.14)`, `rgba(0,0,0,0.76)`, `rgba(0,0,0,0.75)`, `rgba(24,24,24,0.63)`, `rgba(255,255,255,0.05)`

## Font families used (inline in design context code)

- **Fraunces** (Italic / Light / Light Italic) — wordmark "Bodhi"; italic accent "you are."
- **Host Grotesk** (Bold / Regular / Italic) — section H2 "What our clients say", CTA "Begin where"
- **Instrument Sans** (Bold / SemiBold / Medium / Regular) — H1 "About Bodhi School of Yoga"; section titles (Our Legacy, Our Present, The Future we seek, Trainers, Our Vision, Our Mission); pillar names; navbar links
- **DM Sans** (SemiBold / Regular / Medium) — testimonial blockquotes, stat numbers, hero subtext, pillar body, primary CTA labels
- **Manrope** (Medium / SemiBold / Regular) — eyebrows ("A Path to Wellness", "School", "Visit", "Stay close"), citation, footer link items

## Assets (11 image URLs, expire in ~7 days)

Captured in `01_figma_context_node-1-9681.json` under `assets`. Includes navbar arrow icon, navbar logo group, 3 testimonial avatar ellipses, 3 pillar mask rectangles (Healing / Expert / Community icons), 1 vision img-slot, and 2 photographic images (image_24, image_21 for vision rows).

## Errors / Warnings

- `get_design_context` raw output exceeded 25000-token MCP cap and was truncated by the server. The truncation hit AFTER the complete component tree had been delivered (AboutUs + Group1171281731 navbar sub-component). No critical UI region was lost.
- `01_figma_context_node-1-9681.json` therefore contains a structured digest (assets, dimensions, color/font tokens, top-level children) rather than the verbatim React string. The raw React code remains in this conversation's tool result and can be re-fetched if needed.
- No authentication errors. No node-id errors.

## File outputs

- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_metadata_node-1-9681.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_context_node-1-9681.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot_node-1-9681.png` (238 KB, 565×1600 rendered)
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_variables_node-1-9681.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_libraries_node-1-9681.json`

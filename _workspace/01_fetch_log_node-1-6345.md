# Figma Fetch Log — node 1:6345

- **File:** Bodhi-landing-page-web-handoff (`eqaofBeNUhOUISevtRfOpT`)
- **Node:** `1:6345` — Frame "Offline Courses" (1920x1994)
- **Type:** PAGE-level frame (Offline Yoga Courses listing page)
- **Fetched:** 2026-05-22

## MCP calls

| Call | Status | Output |
|---|---|---|
| `get_metadata` | OK | `01_figma_metadata_node-1-6345.json` (curated tree; raw MCP output captured inline in this log below) |
| `get_design_context` (excludeScreenshot=true) | OK (large — 72,807 chars, 4-entry JSON array) | `01_figma_context_node-1-6345.json` (pretty-printed full MCP response). Code-only text also extracted to `01_figma_context_node-1-6345.tsx` for ease of review. |
| `get_variable_defs` | OK — empty (`{}`) | `01_figma_variables_node-1-6345.json` |
| `get_libraries` | OK | `01_figma_libraries_node-1-6345.json` |
| `get_screenshot` (maxDimension=2048) | OK | `01_figma_screenshot_node-1-6345.png` (2.5 MB, 1920x1994 PNG) |

## Page identification

This is the **Offline Yoga Courses** listing page. Identification signals:

- Frame name: `Offline Courses`
- Hero `<h1>` text id `1:7135`: `"Offline Yoga Courses"` (white "Offline Yoga " + mint "Courses" — Host Grotesk Bold 60px, tracking -0.56px)
- Breadcrumb text id `1:7134`: `"Home  /  Yoga courses  /  Offline /"` (DM Sans Regular 15px, white)
- Eyebrow text id `1:7133`: `"23 courses"` (Manrope SemiBold 12px, uppercase, tracking 2.42px, white)
- Subhead text id `1:7136`: `"Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."` (DM Sans Regular 16px, white@67%)
- Navbar present at top (header instance `353:13995`).

## Navbar (Header) — exact contents

Header is an **instance** of component (component id prefix `I353:13995;...`), positioned 229,20 size 1462x56 (centred 1920 grid, top 20px). Background of header itself is transparent (overlays hero image at z-index above).

Two clusters with 80px gap between brand and the right cluster:

### Left: Brand (id `I353:13995;1:732`)
- Wordmark: `"Bodhi"` — Fraunces Italic, 32px, tracking -0.36px, white, leading 55.044px, font-feature `'SOFT' 0, 'WONK' 1`
- Tagline: `"SCHOOL OF YOGA"` — Manrope SemiBold, 12px, uppercase, tracking 2.96px, white@60% opacity

### Right cluster (id `I353:13995;1:737`, gap 42px)

Nav items group (id `I353:13995;1:738`, gap 39px) — all white, Instrument Sans Medium 17px:

1. **`Teacher Courses`** — button + caret-down (Arrow-Up-2 icon, rotated 180°)
2. **`Advanced Certifications`** — button + caret-down
3. **`Yoga Courses`** — button + caret-down (width 116px)
4. **`Workshops`** — anchor (no caret)
5. **`Our Centers`** — anchor (no caret)
6. **`About Bodhi`** — text (no caret)

Trailing global caret-down icon (id `I353:13995;353:11634`) appears once after the nav list — likely a language/locale selector chevron.

Right-most utility group (id `I353:13995;1:761`, gap 10px):

- **44x44 circular avatar / icon** (id `I353:13995;1:764`) — image asset `imgGroup1171281692` (likely user avatar / search icon button)
- **Primary CTA Button** (id `I353:13995;1:768`):
  - Label: **`Enquire Now`**
  - Style: bg `#8ee0ce` (mint), text `#1d3e59` (deep navy), 14px Instrument Sans SemiBold, tracking 0.26px
  - Shape: pill `rounded-[36px]`, height 44px, padding `15px 32px`

### Variant note
This variant has **`Enquire Now`** as the CTA (vs. other pages where the CTA may differ — e.g. earlier nodes used a CTA with different copy). Brand wordmark white-on-image overlay. The header is laid over a darkened hero image (black @ 80% scrim), no separate solid background.

## Hero layout — exact contents

Hero wrapper (`353:11437` → `353:11434`, 1920x421):

- **Background image** `353:11435` "image 25" — full bleed 1920x421, with `bg-[rgba(0,0,0,0.8)]` overlay scrim. Image asset is `imgImage25` (https://www.figma.com/api/mcp/asset/413e9523-fd49-403c-9e6f-b42997cb5b89), rendered with `h-[299.17%] left-[-11.48%] top-[-92.93%] w-[131.2%]` (large crop).
- **Text block** absolutely positioned at left 224px (24px outside the 1280 content container; the page uses a 224px outer margin = 1472 content width to match the cards grid below).

Vertical stack of text (each positioned absolutely, vertically `-translate-y-1/2`):

| y (centre) | Element | Style |
|---|---|---|
| top 165.5px | Breadcrumb `Home  /  Yoga courses  /  Offline /` | DM Sans Regular 15px white, leading 27 |
| top 213px | H1 `Offline Yoga ` (white) + `Courses` (mint `#3fffd5`) | Host Grotesk Bold 60px, tracking -0.56px, leading 58 — two-tone single line |
| top 267.5px | Subhead | DM Sans Regular 16px white@67% leading 26.25 |
| top 306.5px | Eyebrow `23 COURSES` | Manrope SemiBold 12px white, uppercase, tracking 2.42 |

Note: hero text-block container is 892px wide. Subhead spans full 892. H1 occupies 563px. The eyebrow appears BELOW the subhead (not above the H1), which is an unusual hero variant.

### Hero variant note
Differs from typical hero patterns in this file:
- No primary CTA button inside hero
- Two-tone H1 (white + mint accent on the noun)
- Eyebrow count (`23 courses`) appears at the bottom of the stack
- Breadcrumb in hero (rather than a separate breadcrumb bar)

## Body (Courses grid)

`353:11087` "Courses" — 1472x1355 at (224, 475). Flex-wrap grid: 3 cols × 3 rows, 9 Article cards (472x431), gaps `31px row` × `28px col`.

Card titles in order (cards 1–9):

1. Pranayama & the nervous system
2. 300 Hour Yoga Teacher Training Course — Online
3. Face Yoga Teacher Training Course
4. Weight Loss Coach Teacher Training Course
5. Bala Yoga Teacher Training Course
6. Mat Pilates Teacher Training Course
7. Mat Pilates Teacher Training Course (duplicate of #6)
8. Pranayama & the nervous system (duplicate of #1)
9. 300 Hour Yoga Teacher Training Course — Online (duplicate of #2)

(Cards 7–9 appear to be design placeholders / repetition of 1–3.)

Each card:
- 472x431 white card, border `1.098px rgba(0,0,0,0.08)`, `rounded-[24.151px]`, shadow `0_4_48.3_rgba(226,226,226,0.25)`
- Gradient image fills the top portion (absolute `inset-[-88.33px_-1.1px_180.14px_-1.1px]`) — different gradient per card
- Title: Instrument Sans SemiBold 23px `#2f4a3e`, leading 25
- Meta row with three pill-separated chips, each = SVG icon (13x13) + label:
  - `4 weeks` (DM Sans Medium 12px `#7a6e65`)
  - `Online`
  - `English`
  - separated by tiny `#c8a96e` rounded dots (3x3, opacity 0.5)
- CTA row: `View Program →` (anchor) inside a top-bordered footer (HorizontalBorder)

Four floating **`online`** pill badges (Overlay+Border) hover over cards in the first two rows (positions: card1 row1, card3 row1, card1 row2, card3 row2):
- pill style: `bg-[rgba(255,255,255,0.71)]` + `backdrop-blur-[5.55px]`
- shape: `rounded-[1096.691px]` (pill)
- two have border + shadow (`rgba(0,0,0,0.15)` 1px solid, shadow `0_13_20_rgba(0,0,0,0.25)`), two are flat
- label: `online` Manrope Regular 12.076px black, uppercase, tracking 1.9321px

## Asset URLs (7-day expiry)

- imgImage25: https://www.figma.com/api/mcp/asset/413e9523-fd49-403c-9e6f-b42997cb5b89
- imgGradient: https://www.figma.com/api/mcp/asset/3e84cef6-0ed6-44b1-badb-d04a0ecdb182
- imgGradient1: https://www.figma.com/api/mcp/asset/d8b681b4-f862-4eed-abae-5b45952a9b0c
- imgGradient2: https://www.figma.com/api/mcp/asset/3a479119-4d0f-4db3-bd14-449e1fd8fd69
- imgGradient3: https://www.figma.com/api/mcp/asset/fdb27376-e9b6-4ca2-842f-132eb85cf529
- imgGradient4: https://www.figma.com/api/mcp/asset/a1f709a8-f68c-45b8-8a39-caa24fb69633
- imgGradient5: https://www.figma.com/api/mcp/asset/bdbdd780-73ce-43fa-8f78-7ce8a2b973b6
- imgSvg (clock): https://www.figma.com/api/mcp/asset/9667c3c2-3cd0-4b46-ae80-090c5a863add
- imgSvg1 (online/globe): https://www.figma.com/api/mcp/asset/dabc9aeb-ef85-4a96-a70c-8cf3bc0c3bca
- imgSvg2 (language): https://www.figma.com/api/mcp/asset/b0579513-3ccc-4c81-868a-3eeea9cbcc23
- imgArrowUp2 (caret/down icon): https://www.figma.com/api/mcp/asset/e2c5b429-95f4-4333-8654-eadc731e4461
- imgGroup1171281692 (header avatar/icon): https://www.figma.com/api/mcp/asset/eb252e43-1e00-4571-9173-9fbc50dacc1e
- Screenshot: https://www.figma.com/api/mcp/asset/75fdc8eb-e5df-4f4a-b3b6-b42a73eb31eb (also saved locally)

## Failures / warnings

- `get_variable_defs` returned an empty `{}` — this frame uses no variables; all colors/typography are raw inline (e.g. `#3fffd5`, `#8ee0ce`, `#1d3e59`, `#2f4a3e`, `#7a6e65`, `#c8a96e`). Token-extractor must derive tokens from raw values for this page.
- `get_design_context` payload exceeded the inline 25k-token cap and was returned via a file URL. Pretty-printed full response saved; the executable code text alone is 676 lines (extracted as a `.tsx` mirror for skimming).
- Screenshot rendered at 1920x2048 max, saved at 1920x1994 actual (2.5 MB) — keep in mind for downstream visual-QA agents.

# Figma fetch log — node 1:4217 (Course Card variant 2)

**File:** `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
**Node:** `1:4217` — "Frame 1171281881"
**URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-4217&m=dev
**Fetched:** 2026-05-22
**Frame size:** 1308 × 362 px

## MCP call results

| Call | Status | Notes |
|------|--------|-------|
| `get_metadata` | OK | Saved to `01_figma_metadata_node-1-4217.json` |
| `get_design_context` | OK | Saved to `01_figma_context_node-1-4217.json` |
| `get_variable_defs` | EMPTY `{}` | Node uses no Figma variables / tokens — only raw hex. Saved as `{}` (not `null` — call succeeded, just no variables). |
| `get_libraries` | OK | 4 libraries subscribed (Material 3, Simple DS, iOS 18, iOS 26). None of them appear to be the source for these card tokens — the card uses literal hex (`#8ee0ce`, `#009877`, `#4b4b4b`, `#243a42`, `#e2e2e2`, etc.). Saved to `01_figma_libraries_node-1-4217.json`. |
| `get_screenshot` (1:4217) | OK | Saved to `01_figma_screenshot_node-1-4217.png` (1308×362, 288 KB) |
| `get_screenshot` (1:3978 fresh) | OK | Saved to `01_figma_screenshot_node-1-3978_fresh.png` (1308×362, 292 KB) |

## Exact spec — node 1:4217

### Card shell
- Container: `1308 × 362 px`, `bg-white`, `rounded-[35px]`, border `1px solid rgba(211,211,211,0.6)` (light gray @ 60%).
- Image area: left rectangle `447 × 362 px`, rounded only on the left side (`rounded-bl-[35px] rounded-tl-[35px]`).
- Image asset URL: `https://www.figma.com/api/mcp/asset/7cca59ab-6605-43d7-aa41-dc60dd1031fd`
- Image fit: `h-[138.75%] w-[146.29%] left-[-0.77%] top-0` inside an `overflow-hidden` clip. **NOT** `object-cover`. This means the source image is scaled to ~146% × ~139% of the container and pinned to top-left — effectively the photo is zoomed in.

### Title (`1:4221`)
- Text: **"Yoga for Sciatica"**
- Font: `Host Grotesk Bold`, `40 px`, `line-height 58 px`, `letter-spacing -0.56 px`, `color #000000`.
- Position: `left 487`, vertically centered at `top 55` (so visual top ≈ 26 px from card top, height 58 px).

### Subtitle / description (`1:4222`)
- Text: **"Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows."**
- Font: `DM Sans Regular`, `17 px`, `line-height 27 px`, `color #4b4b4b`, `font-variation 'opsz' 14`.
- Position: `left 487`, centered at `top 111`. Width box: `597 px` (allows ≈2 lines).

### Stats row (3 stat tiles) — `1:4223 / 1:4225 hero-stats`
- Container: `351 × 90 px` at `left 487, top 160`.
- 3 tiles, each absolutely positioned inside a 351 px row. Tile size ≈ `96.43 × 89.55 px` (first), `110.21 × 89.55 px` (second), `98.73 × 89.55 px` (third). **The tiles are NOT uniform width** — the middle one is wider because "Content" is the widest label.
- Tile style: `bg-white`, border `1 px solid #e2e2e2`, `rounded-[17px]`, `opacity 0.82`, `padding 1 px` (effectively `p-px`).
- Layout inside tile: flex-column, items-center, justify-center.
- **Stat number** (`1:4227 / 1:4230 / 1:4233`):
  - Font: `Inter Medium`, `25.257 px`, `color #009877` (green).
  - Values: **"25"**, **"8h"**, **"∞"** (infinity).
- **Stat label** (`1:4228 / 1:4231 / 1:4234`):
  - Font: `Inter Regular`, `12.628 px`, `color rgba(13,13,13,0.65)`, `letter-spacing 0.574 px`, `uppercase`.
  - Values: **"Videos"**, **"Content"**, **"Access"**.

### Price (`1:4237`)
- Text: **"₹499"**
- Font: `Host Grotesk Bold`, `30 px`, `line-height 58 px`, `letter-spacing -0.56 px`, `color #000000`.
- Position: `left 1193 (right-aligned visually)`, vertically centered at `top 54`.

### CTA button (`1:4235`)
- Text: **"Purchase now"**
- Container: `241 × 44 px` at `left 486, top 288`, `bg-[#8ee0ce]` (mint green), `rounded-[23px]`, `padding 15 px`.
- Text style: `DM Sans SemiBold`, `15 px`, `text-center`, `color #243a42` (dark teal).

### Countdown block (`1:4238` → `1:4239`)
This is the bottom-right "workshop starting in" countdown — **unique to variant 2**.
- Outer frame: `275 × 71.95 px` at `left 996, top 253`.
- Inner flex column with `gap 9.662 px`.
- Header row (`1:4240`, opacity 0.72):
  - Eyebrow text (`1:4241`): **"workshop starting in"** — font `Instrument Sans SemiBold`, `8.919 px`, `color #000`, `letter-spacing 5.2027 px`, `uppercase`, `font-variation 'wdth' 100`.
  - Divider (`1:4242`): `width 31.959 px`, `height 0.743 px`, `bg-black`, `opacity 0.40`, sits to the right of the eyebrow with `gap 15.608 px`.
- Numbers row (`1:4243`, `gap 44.58 px`):
  - 4 groups (Days / Hours / Mins / Secs).
  - Numbers: **"02"**, **"18"**, **"38"**, **"19"** — `Instrument Sans SemiBold` for 02/18/38, **`Instrument Sans Regular` for "19"** with opacity 0.80. Size: `29.541 px`, `letter-spacing 2.6573 px`, `uppercase`.
  - Labels: **"Days"**, **"Hours"**, **"Mins"**, **"Secs"** — `SF Pro Display Regular`, `11.816 px`, `line-height 17.725 px`, `letter-spacing 0.043 px`. Mins/Secs labels are at `opacity 0.80`.
- Labels are positioned below numbers with `mt-[33.3px]` (overlapping grid offset).

---

## Comparison: node 1:4217 (variant 2) vs node 1:3978 (variant 1)

Both frames are the same overall layout (1308×362 card, 447 px image left, content right, mint CTA), but the content cluster between the description and CTA is **completely different**, and several smaller things differ. The user-facing screenshots above prove this visually.

### High-level differences

| Aspect | 1:3978 (variant 1) | 1:4217 (variant 2) | Impact if built wrong |
|--------|--------------------|--------------------|---------------------------------|
| Title | `Decoding "What is Prana?"` (has smart quotes `"` `"`) | `Yoga for Sciatica` | Wrong copy + missing curly quotes if you use straight `"`. |
| Price | **₹249** | **₹499** | Wrong number. |
| CTA label | **Book spot now** (`106 px` text width) | **Purchase now** (`101 px` text width) | Different copy. Button frame width is identical 241×44. |
| Right-side bottom caption | **"Starts in 3 days"** — `Host Grotesk Medium`, `17 px`, `line-height 21 px`, `letter-spacing -0.336 px`, color `#000` — single-line, right-aligned at `left 1153, top 305` (i.e. 21 px tall, vertically near CTA baseline) | **Multi-line countdown block** (275×71.95 px) with `workshop starting in` eyebrow + 4 numeric segments (`02 Days / 18 Hours / 38 Mins / 19 Secs`) | This is the biggest visible difference. If variant 2 still shows a single-line "Starts in X days", the countdown is missing. |
| Middle feature cluster | **4 rounded icon tiles** — each `110 × 104 px`, `15 px gap`, rounded-[17px], white bg, `#e2e2e2` border, opacity 0.82. Each tile contains a centered SVG icon (~25×25 px) above a label.<br>Labels: **Sat & Sun / Studio / 3 days / English** in `DM Sans SemiBold 14 px`, color `#303030`. | **3 stat tiles** — variable width (96 / 110 / 99 px), `89.546 px` tall, rounded-[17px], white bg, `#e2e2e2` border, opacity 0.82. No icons. Each tile contains a big green number and an uppercase label.<br>Numbers: **25 / 8h / ∞** in `Inter Medium 25.257 px`, color `#009877` (green).<br>Labels: **Videos / Content / Access** in `Inter Regular 12.628 px`, color `rgba(13,13,13,0.65)`, `letter-spacing 0.574 px`, uppercase. | This is the second-biggest visible difference. Wrong tiles = card looks like variant 1. |
| Middle cluster container width | `485 × 104 px` (4 tiles, 110 each + 3 × 15 gap = 485) | `351 × 90 px` (3 tiles, irregular widths, absolute-positioned) | If you reused the variant-1 grid (4×110+15 gap), the row is too wide and the tiles are the wrong height (104 vs ~90). |
| Image | `imgRectangle161124081` = asset `4bbd2c7c-…`. Code uses `object-cover` with `size-full`. | `imgRectangle161124081` = asset `7cca59ab-…` (different image). Code uses NO `object-cover` — instead a manual scale: `w-[146.29%] h-[138.75%] left-[-0.77%] top-0` inside an `overflow-hidden` clip. | If the build uses `object-cover` on variant 2, the framing may differ from Figma (Figma is showing the photo zoomed/cropped via percentage sizing, not `cover`). |
| Description copy | Identical: "Pay once. Access 25 expert-led video lessons at your own pace, forever. From beginner inversions to advanced flows." | Identical | None — same line. |
| Subtitle position | `top 111` | `top 111` | Same. |
| Title position | `top 55` (vertically centered) | `top 55` | Same. |
| Title size | 40 px, Host Grotesk Bold, leading 58, tracking −0.56 | 40 px, Host Grotesk Bold, leading 58, tracking −0.56 | Same — both must use these EXACT typography values. |
| Title text width box | 477 px (longer title fits) | 300 px | Title can wrap if you set a narrower max-width. |
| Price size | 30 px | 30 px | Same. |
| CTA position | `left 486, top 288` (so visual `top 289`) | `left 486, top 288` | Same. |
| CTA color | `#8ee0ce` bg, `#243a42` text | `#8ee0ce` bg, `#243a42` text | Same. |
| Card border | `1 px solid rgba(211,211,211,0.6)` | `1 px solid rgba(211,211,211,0.6)` | Same. |
| Card radius | `35 px` | `35 px` | Same. |
| Image rect width | `447 px` | `447 px` | Same. |
| Content x-start | `487 px` (= 447 + ~40 padding) | `486–487 px` | Same. |

### Mid-cluster: tile-by-tile (variant 1) and stat-by-stat (variant 2)

**Variant 1 (1:3978) — feature tiles**

| Tile | x | y | w | h | Icon size | Label | Label font |
|------|---|---|---|---|-----------|-------|------------|
| 1 | 0 | 0 | 110 | 104 | 24.75 × 25.7 | Sat & Sun | DM Sans SemiBold 14, lh 21.45 |
| 2 | 125 | 0 | 110 | 104 | 23 × 26.38 | Studio | DM Sans SemiBold 14, lh 21.45 |
| 3 | 250 | 0 | 110 | 104 | 25 × 25 | 3 days | DM Sans SemiBold 14, lh 17, **text-center, w 76** |
| 4 | 375 | 0 | 110 | 104 | 29 × 29 ("icon-park-solid:english" with mask group) | English | DM Sans SemiBold 14, lh 21.45 |

Gaps are uniform `15 px` (the row container has `gap-[15px]`).

**Variant 2 (1:4217) — stat tiles**

| Tile | x | y | w | h | Number | Label |
|------|---|---|---|---|--------|-------|
| 1 | −0.15 | 0 | 96.43 | 89.55 | **25** (green #009877, Inter Medium 25.257) | **Videos** |
| 2 | 108.29 | 0 | 110.21 | 89.55 | **8h** | **Content** |
| 3 | 230.50 | 0 | 98.73 | 89.55 | **∞** (U+221E) | **Access** |

The tiles use **absolute positioning inside a 351 px row** rather than flex-gap. The middle tile is widest because its label ("Content") is wider. Tiles overlap or sit on percentage left/right values — see the `left-[30.85%]` / `left-[65.67%]` percentages in the Figma code dump.

### Bottom-right caption / countdown

| Item | 1:3978 | 1:4217 |
|------|--------|--------|
| Element type | Single text node | 2-row composite (eyebrow + 4 number/label groups) |
| Text | `Starts in 3 days` | `WORKSHOP STARTING IN` + `02 Days 18 Hours 38 Mins 19 Secs` |
| Font (main) | Host Grotesk Medium 17 / lh 21 / tracking −0.336 | Numbers: Instrument Sans SemiBold (Regular for "19") 29.541 / tracking 2.6573, uppercase. Labels: SF Pro Display Regular 11.816 / lh 17.725 / tracking 0.043 |
| Eyebrow | none | `Instrument Sans SemiBold 8.919`, letter-spacing 5.2027, uppercase, opacity 0.72, with a 31.96 × 0.74 px black 40% horizontal divider on its right |
| Block size | ~118 × 21 px | 275 × 71.95 px |
| Position | left 1153, top 305 (≈ aligned to CTA baseline) | left 996, top 253 (sits well above where the variant-1 caption sits, because the block is taller) |
| Alignment | right-aligned (because x is 1153 to fit within 1308) | right-aligned (block ends at 996 + 275 = 1271, which lines up with the price right edge at ≈1271 and the right padding of the card) |

### Things that might explain why the first build looks off

1. **Countdown missing** — variant 2's countdown widget is a separate composite element with 3 fonts (Instrument Sans SemiBold, Instrument Sans Regular, SF Pro Display Regular). If the build is showing a single-line "Starts in X" caption, that is variant 1 leaking through. Verify the build renders all four `Days/Hours/Mins/Secs` columns and the "WORKSHOP STARTING IN" eyebrow with the tracking-5.2 letter-spacing.
2. **Feature tiles vs stat tiles** — if the build is rendering 4 icon-tiles (104 px tall) for variant 2, that is wrong. Variant 2 must render 3 stat tiles (89.55 px tall, no icons, big green numbers).
3. **Stat number color** — must be `#009877` (Bodhi green / token `text-brand`). If it is rendering black or the default text color, typography token mismatch.
4. **Stat label** — must be `rgba(13,13,13,0.65)` with `letter-spacing 0.574 px` and `uppercase`. A common mistake: using `text-text-tertiary` without uppercase + tracking gives a normal-case faint label.
5. **Tile widths** — they are NOT uniform 110 px in variant 2. They are 96 / 110 / 99. Using a 3-column equal grid will misalign the green numbers.
6. **Tile height** — 89.55 (≈90) in variant 2, **not 104** (which is variant 1's height).
7. **Image scaling** — variant 2's photo uses a percentage `w-[146.29%] h-[138.75%]` overlay, not `object-cover`. If the wrong asset URL is used, the framing/zoom will differ. Asset for 1:4217 is `7cca59ab-6605-43d7-aa41-dc60dd1031fd`.
8. **Price** — variant 2 is ₹499 (not ₹249). Double-check.
9. **CTA copy** — "Purchase now" (variant 2) vs "Book spot now" (variant 1).
10. **Title** — variant 2 is plain "Yoga for Sciatica" (no quotes). Variant 1's title uses curly smart quotes `"What is Prana?"` — make sure neither variant uses straight ASCII quotes.
11. **Fonts** — variant 2 introduces **`Instrument Sans`** and **`SF Pro Display`** which variant 1 does not use. If those fonts are not loaded in `apps/web` the countdown will fall back and look different (wrong tracking, wrong weight). Check `apps/web/src/app/layout.tsx` font registrations.
12. **Card border color** — `rgba(211,211,211,0.6)` — a translucent gray. Using a solid `border-border-default` may give a different value depending on the design token.
13. **Card radius** — `35px`, not `rounded-2xl` (16) or `rounded-3xl` (24). The Bodhi design tokens likely expose this as `--radius-card` or similar; verify.

## Files written
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_metadata_node-1-4217.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_context_node-1-4217.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_variables_node-1-4217.json` (`{}` — no Figma variables)
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_libraries_node-1-4217.json`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot_node-1-4217.png`
- `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot_node-1-3978_fresh.png`

## No failures
All 6 MCP calls returned data. `get_variable_defs` returned an empty object — this is a real response, not a failure; the node simply doesn't reference any registered Figma variables.

# Figma Fetch Log — node-1-3138

- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-3138&m=dev
- **fileKey:** eqaofBeNUhOUISevtRfOpT
- **nodeId:** 1:3138
- **Fetched at:** 2026-05-22
- **Auth:** OK — tech@wokay.com (Wokay Design Lab, Pro)

## Frame summary

- **Title:** Online Courses (frame name in Figma); page semantics: **"Online Yoga Courses" listing page** (the Bodhi "Online Yoga Courses" archive/listing).
- **Type:** frame (page-level — has its own Header instance and full-bleed hero)
- **Position:** x=30025, y=7588 (on canvas; far-right column of the handoff sheet)
- **Dimensions:** 1920 × 1994 px
- **Background:** white (`bg-white`)
- **Top-level children (3):**
  1. `353:11438` "Group 1171281937" — hero band (1920 × 421)
  2. `353:10833` "Courses" — 3×3 card grid section (1472 × 1355 at x=224, y=475)
  3. `353:13949` **Header** (instance, 1462 × 56 at x=229, y=20) — sits on top of the hero

## Page identity (which Bodhi page is this?)

This is the **"Online Yoga Courses" listing/archive page** (the "All courses, filtered to Online" view). Evidence:

- Hero H1 reads `Online Yoga Courses` with the word "Courses" in mint (`#3fffd5`) and `Online Yoga ` in white — same gradient-emphasis treatment as other page heros, but the highlighted word is the category, not "Bodhi".
- Breadcrumb: `Home  /  Yoga courses  /  Online /` — confirms it's nested under the "Yoga courses" hub, filtered to the Online medium.
- Eyebrow/count: `23 courses` (small uppercase tracked text below the subtitle).
- Subtitle: `Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.`
- The whole hero sits on a dark photo background (`image 25`, full-bleed 1920×421, with a 80% black overlay `bg-[rgba(0,0,0,0.8)]`).
- The body is a flat 3-column × 3-row grid of 9 course cards — no tabs, no pagination pills (unlike the home-page "Online Courses" section 1:1547 which had pagination indicators). Four of the nine cards have an extra "ONLINE" badge pill overlaid (the cards at grid columns 2 and 3 of rows 1 and 2).

## Navbar variant (Header instance 353:13949)

Variant: **dark hero / white text** Header (the navbar sits over a dark image, so links and brand are white).

- **Position/size:** absolute, centered horizontally, top:20px, width 1462px, height 56px.
- **Brand cluster (left):**
  - Wordmark `Bodhi` — Fraunces Italic 32px, white, tracking -0.355px, font-variation `SOFT 0, WONK 1`.
  - Tagline `SCHOOL OF YOGA` — Manrope SemiBold 12px, uppercase, tracking 2.96px, white at 60% opacity, sitting ~46.5px below the wordmark.
- **Primary nav (center, 39px gap, Instrument Sans Medium 17px white, `'wdth' 100`):**
  1. `Teacher Courses` ▾ (with rotated 18px chevron — `Arrow---Up-2` rotated 180° = down)
  2. `Advanced Certifications` ▾
  3. `Yoga Courses` ▾ (fixed width 116px)
  4. `Workshops` (no chevron)
  5. `Our Centers` (no chevron)
  6. `About Bodhi` (no chevron)
  - Trailing 18px down-chevron after the 6-item list (part of a "more" affordance / outer collapse arrow on the whole nav block).
- **Right cluster (10px gap):**
  - 44×44 avatar/icon (`imgGroup1171281692` asset) — rendered as a single image, no inner detail.
  - Primary CTA pill `Enquire Now` — bg `#8ee0ce` (Bodhi mint), text `#1d3e59` (deep navy), Instrument Sans SemiBold 14px, tracking 0.26px, height 44, px-32, py-15, rounded-[36px].

This navbar variant (dark-bg, white text, "Enquire Now" mint CTA) matches the navbar on the home/online-courses-section frames; the difference is purely contextual (dark background image of the hero behind it). Nav children and labels are **identical** to the other page-level frames seen so far in this file.

## Hero variant

- Layout: full-bleed dark photo hero, 421px tall.
- Image: `image 25` (`imgImage25`), positioned at `h-[299.17%] left-[-11.48%] top-[-92.93%] w-[131.2%]` — i.e. the image is zoomed in and pushed up so the hero crops a tall portrait into a 421px band.
- Overlay: solid `rgba(0,0,0,0.8)` covering the full hero.
- Content positioned at `left:224px` (matches the 224px page gutter used everywhere):
  - Breadcrumb at `top:152px` — DM Sans Regular 15px white.
  - H1 at `top:184px` — Host Grotesk Bold 60px, line-height 58px, tracking -0.56px. Two-tone: `Online Yoga ` in white + `Courses` in `#3fffd5` (mint cyan).
  - Subtitle at `top:254px` — DM Sans Regular 16px, color `rgba(255,255,255,0.67)`, leading 26.25px, max width 892px.
  - Eyebrow count `23 courses` at `top:298px` — Manrope SemiBold 12px uppercase, tracking 2.42px white.
- This is **a "page hero" variant** distinct from the home-page hero — no big CTA, no animated logo, no "Yoga Teacher Training" eyebrow chip. It's the breadcrumb + H1 + lede + count formula used for archive/listing pages.

## Course grid (Frame 1171281871)

- 3-column flex-wrap grid at `left:224px, top:475px, w:1472px` with `gap:31px 28px`.
- 9 cards, each `472 × 431`, white bg, `border:1.098px rgba(0,0,0,0.08)`, `rounded-[24.151px]`, `shadow-[0px_4px_48.3px_0px_rgba(226,226,226,0.25)]`.
- Each card has:
  - Top: bleeding `Gradient` image (`472 × 337`, positioned with negative top offset so it acts as a top photo strip with a darkening gradient).
  - 4 of 9 cards also have an "ONLINE" status pill overlaid (white-translucent backdrop-blur, 13px black uppercase text, rounded-[1096.69px], drop shadow on the 2 "with-border" variants).
  - Body text block (Frame 1171281042/43/etc, 408.33 × 138.47 at x=31.84, y=268.44):
    - **Heading 3** — Instrument Sans SemiBold 23px, color `#2f4a3e` (Bodhi dark green), leading 25px, `'wdth' 100`.
    - **Meta row** — flex-wrap, 10px col gap, three icon+label pairs separated by 3×3 dot bullets `bg-[#c8a96e] opacity-50 rounded-[1.5px]`:
      - `[svg 13px] 4 weeks`
      - `[svg 13px] Online`
      - `[svg 13px] English`
      - Labels: DM Sans Medium 12px, color `#7a6e65`, tracking 0.12px.
    - **CTA row** — dashed-top divider `border-[rgba(47,74,62,0.22)] border-dashed border-t-[1.098px]`, `pt-[16.467px]`, flex justify-between:
      - `View Program →` — Manrope Medium 14.27px, color `#038f9f` (cyan/teal), tracking 0.0878px.
      - Empty 117×23 container (probably an icon slot in the design, currently unused).
- Card titles, in grid order (row-major):
  1. `Pranayama & the nervous system`
  2. `300 Hour Yoga Teacher Training Course — Online`
  3. `Face Yoga Teacher Training Course`
  4. `Weight Loss Coach Teacher Training Course`
  5. `Bala Yoga Teacher Training Course`
  6. `Mat Pilates Teacher Training Course`
  7. `Mat Pilates Teacher Training Course` (duplicate placeholder)
  8. `Pranayama & the nervous system` (duplicate placeholder)
  9. `300 Hour Yoga Teacher Training Course — Online` (duplicate placeholder)

The duplicates in row 3 strongly suggest the designer mocked the layout with only ~6 unique courses and repeated them to fill the 3×3 grid.

## MCP calls

| Call | Status | Notes |
|---|---|---|
| whoami | OK | tech@wokay.com |
| get_metadata | OK | Returned inline (under token cap); ~5 KB raw XML. Verbatim XML preserved in `01_figma_metadata_node-1-3138.xml`; a compact JSON wrapper saved as `01_figma_metadata_node-1-3138.json`. |
| get_design_context | OK (large) | Response 72,803 chars / ~71 KB; exceeded inline cap and was spooled to MCP tool-results. Saved verbatim via `jq '.'` from the spool to `01_figma_context_node-1-3138.json`. `excludeScreenshot=true`. Also extracted the inner TSX text to `01_figma_context_node-1-3138.tsx` for easy slicing/grepping. |
| get_variable_defs | OK | Empty `{}` — node references no Figma variables. File saved as `{}` (kept as empty object rather than `null` because the call succeeded; collection did not fail). |
| get_libraries | OK | 4 libraries added (Material 3, Simple Design System, iOS 18/iPadOS 18, iOS/iPadOS 26) — all community kits, none are project-specific. Long HTML changelogs trimmed in the saved file; full text was in the MCP response. |
| get_screenshot | OK | 1541 × 1600 px PNG (clamped from 1920 × 1994); 1.78 MB. Downloaded via curl from the short-lived URL. |

## Artifacts

| File | Size |
|---|---|
| `_workspace/01_figma_metadata_node-1-3138.xml` | 3,356 bytes |
| `_workspace/01_figma_metadata_node-1-3138.json` | 2,499 bytes |
| `_workspace/01_figma_context_node-1-3138.json` | 72,826 bytes |
| `_workspace/01_figma_context_node-1-3138.tsx` | 69,187 bytes |
| `_workspace/01_figma_variables_node-1-3138.json` | 3 bytes (`{}`) |
| `_workspace/01_figma_libraries_node-1-3138.json` | 1,870 bytes |
| `_workspace/01_figma_screenshot_node-1-3138.png` | 1,775,197 bytes |

## Asset URLs referenced in design context

(Short-lived; from MCP — fetch promptly if needed downstream)

- `imgImage25` — hero photo background
- `imgGradient`, `imgGradient1..imgGradient5` — 6 unique course-card top photos (some are reused across the 9 cards)
- `imgSvg`, `imgSvg1`, `imgSvg2` — meta-row icons (clock/duration, monitor/online, globe/language)
- `imgArrowUp2` — chevron used in nav dropdowns (rotated 180°)
- `imgGroup1171281692` — 44×44 right-side avatar/icon in the Header

## Warnings / Caveats

- `get_design_context` response exceeded the inline tool-result cap and was spooled by the MCP client; the saved artifact is the verbatim JSON spool re-piped through `jq '.'` for pretty-printing. No content was truncated. The `01_figma_context_node-1-3138.tsx` companion is just the extracted `.text` field of the first array entry, for easier downstream reading — the canonical raw response is the `.json`.
- `get_variable_defs` returned an empty object for this node — no Figma variables are bound on any descendant. All colors, sizes, and typography are inlined as raw values in the design context. The token-extractor should derive tokens from the context file, not from variables.
- None of the subscribed libraries look like Bodhi's own design system; treat library matches as unlikely (same caveat as prior frames in this file).
- The 9-card grid contains 3 visually-duplicate cards (placeholders) at the end of row 3 — the component-extractor should de-duplicate when generating the data array, and not treat the duplicates as 9 distinct content items.
- The four "ONLINE" badge overlays on cards 2, 3, 5, 6 (grid positions row1-col2, row1-col3, row2-col2, row2-col3) appear to be absolutely-positioned siblings of the grid, not children of the cards. They visually sit on top of the gradient photos. The component-extractor should decide whether to model them as a `badge` prop on Card or as a separate absolute layer; the latter matches Figma's structure literally.
- Navbar **labels and structure are identical** to other page-level frames in this file. Differences across pages are purely contextual (background color/photo behind the navbar driving the white-text variant) — the children of the Header instance do not change.

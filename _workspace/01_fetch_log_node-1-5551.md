# Figma Fetch Log — node-1-5551

- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-5551&m=dev
- **fileKey:** eqaofBeNUhOUISevtRfOpT
- **nodeId:** 1:5551
- **Fetched at:** 2026-05-22
- **Auth:** OK — reused session from prior node-1-1547 fetch (tech@wokay.com, Wokay Design Lab, Pro)

## Frame summary

- **Title:** Offline Courses
- **Type:** frame (page-level)
- **Position:** x=32125, y=5169 (on canvas)
- **Dimensions:** 1920 × 1994 px
- **Top-level children:** 3 (Courses List, Hero-Heading, Header instance)

## Top-level children (3)

| id | type | name | size |
|---|---|---|---|
| 1:6084 | frame | Courses List (3×3 grid wrapper, 472×431 cards) | 1472 × 1355 |
| 353:10740 | frame | Hero-Heading (full-width dark hero with breadcrumb + title + subtitle + course count) | 1920 × 421 |
| 353:13903 | instance | Header (navbar — global Header component instance) | 1462 × 56 |

## Page identification

- **Page name (Figma):** "Offline Courses"
- **Hero H1:** "Offline Advanced Certifications"
- **Breadcrumb:** "Home / Advanced Certifications / Offline /"
- **Course count badge:** "23 courses"
- **Inferred route:** `/advanced-certifications/offline` (or similar). This is the **Advanced Certifications — Offline listing** page (companion to the Online Courses page at node 1:1547, which had eyebrow "Yoga Teacher Training" and a different hero variant).

## Hero (353:10740) — exact contents

- **Layout:** absolutely positioned full-bleed dark hero, 1920 × 421 px, sitting at the top of the page above the Header.
- **Background:** `image 25` (rounded-rectangle, 1920×421) fills the hero; overlaid by `rgba(0,0,0,0.8)` scrim div. The img is stretched to `131.2%` width and offset top `-92.93%` (i.e. the source crop is much taller than the hero band).
- **Text block** anchored at `left: 224px`:
  - **Breadcrumb (353:10748)** at `top: 156.5px` — `Home  /  Advanced Certifications  /  Offline /` — DM Sans Regular 15px, white, `leading-[27px]`, `whitespace-pre` (preserves the double-space separators).
  - **H1 (353:10745)** at `top: 209px` — `Offline Advanced Certifications` — Host Grotesk Bold 60px, white, `tracking-[-0.56px]`, `leading-[58px]`, width 838px.
  - **Subtitle (353:10746)** at `top: 263.5px` — `Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.` — DM Sans Regular 16px, `rgba(255,255,255,0.67)`, `leading-[26.25px]`, width 892px.
  - **Course count (353:10747)** at `top: 302.5px` — `23 courses` — Manrope SemiBold 12px, white, uppercase, `tracking-[2.42px]`, `leading-[17px]`.
- **Difference vs node-1-1547 hero ("Online Courses"):** that page used a different eyebrow ("Yoga Teacher Training"), a different H1 ("Yoga Teacher Training Courses"), no breadcrumb element, no course count badge, and three pagination/tab pills below the heading. The 1:5551 hero is the "Advanced Certifications" hero variant: breadcrumb + H1 + subtitle + count, no tabs.

## Header / Navbar (353:13903) — exact contents

- **Instance ref:** `353:13903`, component `1:731` (global Header). Positioned absolute, `top:20px`, centered (`left-1/2 -translate-x-1/2`), `width: 1462px`, `height: 56px`. Inset extends to the right beyond container (`inset-[0_-12.08%_0_0]`).
- **Container layout:** flex, `gap-[80px]`, items-center.
- **Logo group (left)** — `I353:13903;1:732`:
  - Wordmark `Bodhi` — Fraunces Italic 32px, white, `tracking-[-0.3551px]`, `leading-[55.044px]`, with `fontVariationSettings: 'SOFT' 0, 'WONK' 1`.
  - Tagline `SCHOOL OF YOGA` (rendered "School of yoga", uppercase via CSS) — Manrope SemiBold 12px, white, `opacity-60`, `tracking-[2.9562px]`, `leading-[20.766px]`, offset `ml-px mt-[46.5px]`.
- **Nav links group (middle)** — `I353:13903;1:738`, flex `gap-[39px]`, Instrument Sans Medium 17px white `font-variation 'wdth' 100`:
  1. `Teacher Courses` — with chevron-down icon (Iconly Arrow-Up-2, 18×18, rotated 180°) — dropdown
  2. `Advanced Certifications` — with chevron-down — dropdown (gap-[7px] between text+icon)
  3. `Yoga Courses` — with chevron-down — dropdown (container width 116px)
  4. `Workshops` — plain link, no chevron
  5. `Our Centers` — plain link, no chevron
  6. `About Bodhi` — plain text (no `<a>` element — sits inside flex row, also followed by a trailing standalone chevron-down icon `I353:13903;353:11634` which appears to belong to a sibling dropdown wrapper)
- **Right cluster** — `I353:13903;1:761`, flex `gap-[10px]`:
  - 44×44 icon button (image `Group1171281692` — likely cart/profile/search icon, exact glyph encoded in the image asset)
  - CTA Link `Enquire Now` — bg `#8ee0ce` (mint), text `#1d3e59` (deep navy), Instrument Sans SemiBold 14px, `tracking-[0.26px]`, `rounded-[36px]`, `px-[32px] py-[15px]`, `h-[44px]`.
- **Visual style:** all link text is white (sits over dark hero); CTA pill is mint with navy text.
- **Difference vs node-1-1547 navbar:** the Online Courses page (1:1547) had the Header as a top-level instance (`1:2342`) sized 1416×56 — slightly narrower than this 1462×56 instance, but the component reference is the same global Header. Link labels and CTA appear identical.

## Courses List (1:6084) — content overview

- **Layout:** 3-column × 3-row grid of `Article` cards inside `Frame 1171281871`. Wrapper is 1472×1355 at `left: 224, top: 475`.
- **Card size:** 472 × 431 px each; horizontal gap 28px (500-472), vertical gap 31px (462-431).
- **Card structure (each Article):**
  - `Gradient` rounded-rectangle 472 × 337 (offset y: -87 — extends above the card frame, acting as the image area).
  - `Frame 1171281042` body 408.33 × 138.47 at `x:31.84, y:268.44`:
    - `Heading 3` — title text 50px tall, Frances/Manrope styling (varies by card).
    - Metadata row `Container` (x:0, y:70, 408×16): `4 weeks` + dot + `Online` + dot + `English`, each with 13×13 SVG icon, Manrope-ish text 14px-ish, separators are 3×3 rounded-rectangle dots.
  - `HorizontalBorder` footer (x:0, y:99, 408×39.47): dashed top border `border-[rgba(47,74,62,0.22)] border-dashed border-t-[1.098px]`; left text `View Program →` (#038f9f, Manrope Medium 14.27px, `tracking-[0.0878px]`, `leading-[22.12px]`); right `Container` 117×23 (placeholder for date/cta).
- **Card titles in order (top→bottom, left→right):**
  1. Pranayama & the nervous system
  2. 300 Hour Yoga Teacher Training Course — Online
  3. Face Yoga Teacher Training Course
  4. Weight Loss Coach Teacher Training Course
  5. Bala Yoga Teacher Training Course
  6. Mat Pilates Teacher Training Course
  7. Mat Pilates Teacher Training Course (duplicate)
  8. Pranayama & the nervous system (duplicate)
  9. 300 Hour Yoga Teacher Training Course — Online (duplicate)
- **Overlay pills:** 4 `Overlay+Border` pills labeled `online` are positioned over selected card images (at x=737/1241, y=587/887) — they sit on cards in column 2 row 1, column 2 row 2, column 3 row 1, column 3 row 2. Note: text says "online" even on this "Offline Courses" page — likely placeholder content that the Bodhi team will replace with "Offline"/"In-person" badges.
- **Metadata row reads "Online" on every card:** placeholder content — the page is titled Offline but the cards still say Online. The implementation should use real data and the badge should read "Offline" for this listing.

## Inferred page structure

```
<OfflineCoursesPage>
  <Hero variant="advanced-certifications">
    image-25 (full-bleed) + black/80 scrim
    breadcrumb: Home / Advanced Certifications / Offline /
    h1: Offline Advanced Certifications
    subtitle: Accredited, women-centred teacher training programmes…
    badge: 23 courses
  </Hero>
  <Header /> {/* same global Header instance — sits absolute over hero, top:20 */}
  <CoursesList>
    <Grid cols={3} gap-x={28} gap-y={31}>
      {9 × <ProgramCard
              image=<gradient/photo>
              badge="Offline" (Figma still shows "online" placeholder)
              title=…
              meta={{ duration: '4 weeks', mode: 'Online', language: 'English' }}
              cta="View Program →"
           />}
    </Grid>
  </CoursesList>
</OfflineCoursesPage>
```

- **Missing in this frame:** no footer, no testimonials, no FAQ — this is a pure hero + listing page. Sibling page frames are expected to provide those.
- **No pagination component on this page** (unlike 1:1547 which had 3 tab pills). Possibly because all 23 courses would be paginated via a follow-on page or scrolled within a longer wrapper.

## MCP calls

| Call | Status | Notes |
|---|---|---|
| whoami | skipped | Auth confirmed from prior fetches today |
| get_metadata | OK | Full XML tree (~14 KB after extraction) returned directly; saved verbatim in `text` envelope. |
| get_design_context | OK (large) | Response 72,124 chars exceeded inline tool result token cap; saved verbatim via `jq '.'` from the MCP tool-results spool file to `01_figma_context_node-1-5551.json`. `excludeScreenshot=true` applied. |
| get_variable_defs | OK (empty) | Returned `{}` — no design tokens are bound to this node. Tokens are inlined as raw values in the context (e.g. `#8ee0ce`, `#1d3e59`, `#038f9f`, `rgba(47,74,62,0.22)`, `rgba(255,255,255,0.67)`). |
| get_libraries | OK | 4 community libraries subscribed (Material 3, Simple Design System, iOS 18, iOS/iPadOS 26). None are Bodhi-specific. |
| get_screenshot | OK | 1541 × 1600 PNG (clamped from 1920 × 1994 at maxDimension=1600); 1.78 MB. |
| get_metadata (353:13903) | OK (opaque) | Returned only the instance bounding box — no children since Header is a component instance reference. Full navbar children are inlined in the design context (extracted above). |

## Artifacts

| File | Size |
|---|---|
| `_workspace/01_figma_metadata_node-1-5551.json` | ~3 KB (envelope + XML text) |
| `_workspace/01_figma_context_node-1-5551.json` | 72,147 bytes (jq pretty-printed) |
| `_workspace/01_figma_context_node-1-5551.tsx` | ~46 KB (raw tsx code from context, extracted for grep convenience) |
| `_workspace/01_figma_variables_node-1-5551.json` | `{}` (2 bytes) — no variables bound |
| `_workspace/01_figma_libraries_node-1-5551.json` | ~2 KB (trimmed; descriptions removed) |
| `_workspace/01_figma_screenshot_node-1-5551.png` | 1,776,282 bytes (1541×1600) |

## Warnings / Caveats

- The design context response exceeded the inline tool result token cap; it was copied verbatim from the MCP tool-results spool file into the workspace artifact via `jq '.'`, preserving full content. No truncation. The extracted `.tsx` companion file is a derived convenience artifact (one of the four `text` entries in the envelope JSON).
- `get_variable_defs` returned `{}` — every visual value (color, radius, spacing, opacity) is inlined in the design context. The token-extractor should derive tokens from the context, not the variables file. This matches the pattern from node-1-1547.
- None of the subscribed libraries look like Bodhi's own design system; treat library matches as unlikely.
- **Placeholder content warning:** every course card's "Overlay+Border" pill and metadata row says "Online" even though the page is titled "Offline Advanced Certifications". Real data should swap these to "Offline" / "In-person" — do not faithfully copy the literal "Online" string into the implementation.
- **Duplicate card titles:** 6 of 9 card titles are duplicates (Pranayama, 300 Hour YTT, Mat Pilates each appear twice). Treat as Figma placeholder repetition, not as the real catalog.
- The `About Bodhi` link is rendered as a `<div>` not an `<a>` in the design context — likely a Figma authoring oversight. Treat all 6 nav items as links in implementation.
- The trailing standalone chevron icon `I353:13903;353:11634` after `About Bodhi` suggests `About Bodhi` may itself be a dropdown, even though it's rendered as plain text. Worth verifying against the actual Header component (1:731) source.
- The Header `width` is 1462px (instance bbox), but it uses `inset-[0_-12.08%_0_0]` which means the content overflows the right side by ~12% (~176px). The effective rendered nav extends roughly 1638px wide — that's how the Enquire CTA visually sits to the far right of the viewport.

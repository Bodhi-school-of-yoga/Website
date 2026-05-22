# Figma Fetch Log — node-1-7174

- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-7174&m=dev
- **fileKey:** eqaofBeNUhOUISevtRfOpT
- **nodeId:** 1:7174
- **Fetched at:** 2026-05-22
- **Auth:** OK (inferred — same session as 1-1547 / 1-4756; whoami not re-invoked since cached)

## Frame summary

- **Title:** Tips to become a successfull yoga teacher *(note the source typo "successfull")*
- **Type:** frame
- **Position:** x=27300, y=5169 (on canvas)
- **Dimensions:** 1920 × 2525 px
- **Inferred page:** Article-listing / Course-listing index page for a single editorial topic ("Tips to become a successful yoga teacher" — 23 courses). This is a content-hub / category-archive layout, sibling to the Online Courses page (1-1547) but stripped down: only a hero banner with eyebrow + heading + sub-heading and a 3×3 grid of article cards (no filter bar, no testimonials, no marquee, no FAQ).

## Top-level children (4)

| id | type | name | size | role |
|---|---|---|---|---|
| 353:10734 | frame | Hero-Heading | 1920 × 421 | Dark hero: full-bleed bg image + 80% black overlay, eyebrow "23 courses", H1 with two-tone span (white + mint-green `#3fffd5`), sub-paragraph |
| 1:7504 | frame | Courses List | 1472 × 1025 | 3-column × 3-row article grid, gap 28×31; each card 472×321 with gradient background, dark-green title (`#2f4a3e`, 23px Instrument Sans SemiBold) and "ONLINE" pill |
| 339:9070 | frame | Footer | 1920 × 906 | Shared site footer: large "Begin where you are." CTA band (Fraunces 90px) + "Try a class, free" mint pill button + 4-col link grid (Bodhi / School / Visit / Stay close) + legal bar |
| 353:13811 | instance | Header | 1462 × 56 | Shared Bodhi header instance: logo + "School of yoga" tagline + nav (Teacher Courses ▾ · Advanced Certifications ▾ · Yoga Courses ▾ · Workshops · Our Centers · About Bodhi ▾) + search icon + "Enquire Now" mint pill |

## Article grid content (9 cards)

| # | Card id | Position (x, y) | Title | Gradient asset |
|---|---|---|---|---|
| 1 | 1:7514 | 0, 0 | Pranayama & the nervous system | imgGradient |
| 2 | 1:7520 | 500, 0 | 300 Hour Yoga Teacher Training Course — Online | imgGradient1 |
| 3 | 1:7526 | 1000, 0 | Face Yoga Teacher Training Course | imgGradient2 |
| 4 | 1:7532 | 0, 352 | Weight Loss Coach Teacher Training Course | imgGradient3 |
| 5 | 1:7538 | 500, 352 | Bala Yoga Teacher Training Course | imgGradient4 |
| 6 | 1:7544 | 1000, 352 | Mat Pilates Teacher Training Course | imgGradient5 |
| 7 | 1:7550 | 0, 704 | Mat Pilates Teacher Training Course *(duplicate of #6)* | imgGradient5 |
| 8 | 1:7556 | 500, 704 | Pranayama & the nervous system *(duplicate of #1)* | imgGradient |
| 9 | 1:7562 | 1000, 704 | 300 Hour Yoga Teacher Training Course — Online *(duplicate of #2)* | imgGradient1 |

Cards 7–9 are clearly placeholder duplicates of cards 1–3 — the Figma file repeats them to pad the 3-row grid. Real content should come from the CMS at implementation time. Eyebrow promises "23 courses" but only 9 cards are laid out.

## Notable section content (from metadata XML + design context)

- **Hero eyebrow:** `23 courses` (Manrope SemiBold, 12px, white, 2.42px tracking, uppercase)
- **Hero H1:** "Tips to become a `successfull yoga teacher`" — Host Grotesk Bold, 60px, white head + mint `#3fffd5` tail span ("successfull yoga teacher"), -0.56px tracking, 58px line-height
- **Hero subhead:** "Discover essential tips, strategies, and insights to grow as a skilled and confident yoga teacher, whether you're just starting or looking to enhance your teaching career." — DM Sans Regular, 16px, white at 67% opacity, 26.25px line-height
- **Hero background:** `imgImage25` rendered over 1920×421 frame, scaled `h-[299.17%] w-[131.2%]` with top offset `-92.93%` (a strongly-cropped portrait image), then a `rgba(0,0,0,0.8)` full-bleed dim
- **Card pill ("online"):** 4 small `Overlay+Border` pills floating *above* the grid (at x=737/1241, y=587/887) — these correspond to the 4 card slots that have the visible "ONLINE" badge in the design; rendered as backdrop-blur, 71% white fill, optional 15% black border + heavy drop shadow on the upper row, no border + no shadow on the lower row. Tracking 1.9321px uppercase Manrope.
- **Card body:** rounded 24.15px, 1.098px border at `rgba(0,0,0,0.08)`, shadow `0px 4px 48.3px rgba(226,226,226,0.25)`, white background, padded 22/24/31.8 (top/bottom/x). Image gradient `inset-[-88.1px_-1.1px_99.9px_-1.1px]` (essentially full-bleed top half, with `pb-99.9` push so the title sits centered in the bottom strip).
- **Card title:** Instrument Sans SemiBold, 23px, `#2f4a3e` (deep forest green), 25px line-height, wdth=100.
- **Footer band heading:** "Bodhi" (Fraunces Light Italic 32px, SOFT 0 WONK 1) over "Begin where `you are.`" — 90px Host Grotesk Regular + Italic mint-tail `#8ee0ce`, -2.16px / -1.08px tracking.
- **CTA pill:** "Try a class, free" — Manrope SemiBold, 14px, dark-teal `#00282c` on mint `#8ee0ce` rounded-full button, 197×60.89px.
- **Footer columns:** Heading 5 micro caps (Manrope Medium 11px, white, 2.42px tracking) — "School", "Visit", "Stay close". Items in Manrope Regular 14.5px at 76% white.
- **Legal:** "© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)" and right side "Designed quietly. Practised daily." — Manrope Regular 12.5px white.

## Color tokens observed (inline, not bound to variables)

| Hex / rgba | Role |
|---|---|
| `#00282c` | Footer background, CTA pill text colour |
| `#2f4a3e` | Card title (deep forest green) |
| `#8ee0ce` | Footer CTA + header "Enquire Now" pill background |
| `#3fffd5` | Hero accent (H1 tail span, mint-bright) |
| `rgba(0,0,0,0.8)` | Hero overlay |
| `rgba(0,0,0,0.08)` / `(0,0,0,0.15)` | Card borders / pill borders |
| `rgba(255,255,255,0.71)` | "ONLINE" pill background |
| `rgba(255,255,255,0.76)` / `(0.67)` / `(0.63)` | Subtle white text variants |
| `rgba(226,226,226,0.25)` | Card shadow |

## Typography tokens observed

| Family | Weight / variant | Roles |
|---|---|---|
| Fraunces | Light Italic (SOFT 0, WONK 1) | Sub-brand "Bodhi" lockup, footer brand |
| Host Grotesk | Bold / Regular / Italic | Hero H1, footer mega-CTA |
| Instrument Sans | Medium / SemiBold (wdth 100) | Header nav, card titles, header CTA |
| Manrope | Regular / Medium / SemiBold | Eyebrows, body, link list, footer copy, badges |
| DM Sans | Regular (opsz 14) | Hero sub-paragraph |

## MCP calls

| Call | Status | Notes |
|---|---|---|
| whoami | skipped | cached from earlier 1-1547 fetch in same session |
| get_metadata | OK | Returned full XML structure inline (~280 lines); persisted into `01_figma_metadata_node-1-7174.json` as a structured summary |
| get_design_context | OK (large, 53.2 KB) | Output exceeded inline token cap; saved verbatim from the MCP tool-results spool to `01_figma_context_node-1-7174.json` (55 KB); `excludeScreenshot=true` |
| get_variable_defs | OK (empty) | Returned `{}` — no design-token variables are bound to any node under 1:7174. All colours/typography are inlined as raw hex/rgba in the design context. Saved as `{}` |
| get_libraries | OK | 4 community libraries added (Material 3, Simple Design System, iOS 18 / iPadOS 26) + 3 available (watchOS 26, visionOS 26, macOS 26). None are the Bodhi project's own design system |
| get_screenshot | OK | 1460 × 1920 px PNG (clamped from native 1920 × 2525 at maxDimension=1920); 1.49 MB |

## Artifacts

| File | Size |
|---|---|
| `_workspace/01_figma_metadata_node-1-7174.json` | 4.2 KB *(structured summary; raw XML in this log)* |
| `_workspace/01_figma_context_node-1-7174.json` | 55 KB |
| `_workspace/01_figma_variables_node-1-7174.json` | 3 B (`{}`) |
| `_workspace/01_figma_libraries_node-1-7174.json` | 1.4 KB |
| `_workspace/01_figma_screenshot_node-1-7174.png` | 1.5 MB |

## Warnings / Caveats

- **Title typo:** the design source spells the page name "successfull yoga teacher" with a doubled-L. Preserve verbatim in extraction but plan to fix in copy at implementation time.
- **Card content is placeholder:** 9 cards are visible but several are exact duplicates (the second row repeats the first row's titles & gradient assets). The eyebrow "23 courses" implies the production page should paginate or scroll-load real CMS content; this Figma frame is a layout-only mock.
- **No `Date` / `Read time` / `Author` metadata on cards.** Cards are bare: gradient image + title only. If the production "Tips / Articles" feature has more metadata, it isn't in this frame.
- **No project-scoped design tokens.** `get_variable_defs` returned `{}` for this whole subtree (same pattern as 1-1547 and 1-4756). Tokens must be derived from the inlined raw values in `01_figma_context_node-1-7174.json`.
- **Footer/Header are reused.** Both are byte-identical components also seen in 1-1547, 1-4756, and the home page. Build once, share across all 4 pages.
- **Hero typography scale shift:** unlike Online Courses (1-1547) which uses larger Fraunces H1s, this article-listing hero uses **Host Grotesk Bold 60px** for the H1. Likely indicates editorial-listing vs course-marketing visual hierarchy.

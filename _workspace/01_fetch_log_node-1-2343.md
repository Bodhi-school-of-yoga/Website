# Figma Fetch Log — node-1-2343

- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-2343&m=dev
- **fileKey:** eqaofBeNUhOUISevtRfOpT
- **nodeId:** 1:2343
- **Fetched at:** 2026-05-22
- **Auth:** OK — tech@wokay.com (Wokay Design Lab, Pro)

## Frame summary

- **Title:** Online Courses
- **Page identity (inferred):** **"Online Advanced Certifications" listing page** — the courses-listing variant scoped to the "Online" delivery mode. Page H1 reads "Online Advanced Certifications" with breadcrumb `Home / Advanced Certifications / Online /` and a "23 courses" result count. Each card is tagged "online".
- **Type:** frame
- **Position:** x=30025, y=5169 (on canvas — far-right of the four sibling pages)
- **Dimensions:** 1920 × 1994 px (matches 1920px design-system reference width)

## Top-level children (3)

| id | type | name | size | role |
|---|---|---|---|---|
| 353:13857 | instance | Header | 1462 × 56 | Shared site header (instance, content-width 1462) |
| 353:10736 | frame | Hero-Heading | 1920 × 421 | Hero band: breadcrumb + H1 + subtitle + result count over `image 25` background |
| 1:2877 | frame | Courses | 1472 × 1355 | Course-card grid container at x=224 (= 1920 − 2·224 content gutter) |

## Hero-Heading children (1:3131 → "Group 1171281918", 892 × 168)

- Breadcrumb text (1:3137): `Home / Advanced Certifications / Online /` — 307 × 27
- H1 (1:3134): `Online Advanced Certifications` — 832 × 58
- Subtitle (1:3135): `Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga.` — 892 × 27 (same boilerplate used on the sister page 1:1547)
- Result count (1:3136): `23 courses` — 95 × 17

## Courses grid (1:2886 — "Frame 1171281871", 1472 × 1355)

- **Layout:** 3 columns × 3 rows of `Article` cards. Each card is 472 × 431 with column gap 28 px (500 − 472) and row gap 31 px (462 − 431).
- **Card structure (all 9 identical to existing program-card pattern):**
  - `Gradient` rounded-rectangle image (472 × 337, offset y = −87)
  - `Frame 1171281042/3/4/5/6/7` content block (408.33 × 138.47 inside 31.84 padding)
  - `Heading 3` → course title (up to 408 × 50, two-line cap)
  - Meta container: `4 weeks` | dot | `Online` | dot | `English` — each meta item has a 13 × 13 SVG icon
  - `HorizontalBorder` footer (39.47 tall) with `View Program →` link (110 × 23) and right-aligned `Container` (likely heart / bookmark icon)
- **Course titles (9 cards in row-major order):**
  1. Pranayama & the nervous system
  2. 300 Hour Yoga Teacher Training Course — Online
  3. Face Yoga Teacher Training Course
  4. Weight Loss Coach Teacher Training Course
  5. Bala Yoga Teacher Training Course
  6. Mat Pilates Teacher Training Course
  7. Mat Pilates Teacher Training Course (duplicate of #6)
  8. Pranayama & the nervous system (duplicate of #1)
  9. 300 Hour Yoga Teacher Training Course — Online (duplicate of #2)
  - The last three cards are mock-duplicates filling the 9-cell grid; real implementation should drive from CMS.
- **Floating "online" badges (1:2878/80/82/84):** 4 standalone `Overlay+Border` pills (≈ 85 × 27) layered over selected cards at column x = 737 and x = 1241, rows y = 587 and y = 887. These are the active-mode badge on top-right of each card image. Note: only 4 of 9 cards expose this badge in the metadata (likely the others use a different style — see context JSON for fills/borders).

## Inferred page structure

```
<OnlineAdvancedCertificationsPage>
  <Header />                                       {/* shared instance 353:13857 */}
  <HeroHeading variant="image-band">              {/* 1920 × 421 */}
    <Breadcrumb path="Home / Advanced Certifications / Online" />
    <h1>Online Advanced Certifications</h1>
    <p>Accredited, women-centred teacher training programmes…</p>
    <ResultCount>23 courses</ResultCount>
  </HeroHeading>
  <CoursesGrid columns={3} gap={28}>
    {courses.map(c => (
      <CourseCard
        image={c.cover}
        title={c.title}
        duration={c.duration}    // "4 weeks"
        mode={c.mode}            // "Online" (also rendered as floating badge)
        language={c.language}    // "English"
        href={c.href}
      />
    ))}
  </CoursesGrid>
  {/* Note: no footer in this frame — footer lives on a separate sibling node */}
</OnlineAdvancedCertificationsPage>
```

## Relationship to sibling pages

This is **page 4 of 4** in the canvas pages set sharing the 1920px design system:

| nodeId | Title | Likely page | x-position |
|---|---|---|---|
| 1:1547 | Online Courses | Yoga Teacher Training (umbrella listing, 6 cards + body) | 12600 |
| 1:4756 | (TBD — needs sibling fetch) | (TBD) | (TBD) |
| 1:7174 | (TBD — needs sibling fetch) | (TBD) | (TBD) |
| **1:2343** | **Online Courses** | **Online Advanced Certifications (filtered listing)** | **30025** |

Hero subtitle is identical to 1:1547 — confirming the same brand/copy system. Card primitives (`Article` 472 × 431 with `Gradient` + `Heading 3` + meta row + `View Program →`) match 1:1547 exactly → reuse the same `ProgramCard` / `CourseCard` component.

## MCP calls

| Call | Status | Notes |
|---|---|---|
| whoami | OK | tech@wokay.com, Wokay Design Lab (Pro) |
| get_metadata | OK | Returned full XML inline (~6 KB); saved to metadata file |
| get_design_context | OK (large) | Response ~70 KB, exceeded inline token cap; saved verbatim via jq pretty-print from spool to `01_figma_context_node-1-2343.json` (72,114 bytes) |
| get_variable_defs | OK (empty) | Returned `{}` — no design tokens bound at this node. Tokens are inlined as raw values in the context JSON, identical to the pattern seen for 1:1547 |
| get_libraries | OK | 4 community libraries subscribed (Material 3, Simple Design System, iOS 18, iOS/iPadOS 26) — none are Bodhi-specific |
| get_screenshot | OK | 1541 × 1600 PNG (clamped from 1920 × 1994 at maxDimension=1600); 1.78 MB |

## Artifacts

| File | Size |
|---|---|
| _workspace/01_figma_metadata_node-1-2343.json | 4,295 bytes (compacted structural summary; full structure preserved in context JSON) |
| _workspace/01_figma_context_node-1-2343.json | 72,114 bytes |
| _workspace/01_figma_variables_node-1-2343.json | 3 bytes (`{}`) |
| _workspace/01_figma_libraries_node-1-2343.json | 1,791 bytes |
| _workspace/01_figma_screenshot_node-1-2343.png | 1,776,446 bytes (1541 × 1600 px) |

## Warnings / Caveats

- `get_design_context` exceeded the inline tool-result token cap. Per the protocol, the full JSON was copied verbatim from the MCP spool to the workspace artifact via `jq '.'` — no truncation. Downstream agents should consume `01_figma_context_node-1-2343.json` directly (use `jq` for targeted queries, since 72 KB blows past the Read tool's comfortable inline window).
- `get_variable_defs` is empty (`{}`). All color / typography / spacing values are inlined as raw values inside `01_figma_context_node-1-2343.json`. The token-extractor should harvest tokens from the context JSON, not the variables file.
- None of the four subscribed libraries is the Bodhi project's own design system. Treat library matches as unlikely; rely on the existing apps/web design tokens (`text-h1..h5`, `text-mini`, `bg-surface-*`, `border-border-*`).
- The 9 cards include 3 duplicates (positions 7/8/9 repeat 6/1/2). Treat the listing as data-driven; the duplication is a mock-data artifact in the Figma file.
- The `online` overlay badge is present on only 4 of 9 cards in the metadata. The context JSON should be checked for whether the other cards inline the badge inside the `Article` frame vs. sitting at the `Courses` parent level. Implementation should always render the mode badge on the card image (top-right) — drive from the `mode` field.
- Hero copy is duplicated from the parent "Yoga Teacher Training" page (1:1547). For SEO and clarity, the implementation may want a more specific subtitle for the Online listing — confirm with content owner before shipping.

## Next steps for downstream agents

- **component-extractor:** Consume `01_figma_context_node-1-2343.json`. Card primitive matches the existing `apps/web/src/components/ui/program-card.tsx` family — extend it (mode badge + meta row with separator dots + `View Program →` CTA) rather than building a new component.
- **token-extractor:** Variables file empty; harvest tokens from context JSON (colors, font sizes for `text-h1`-equivalent on the hero "Online Advanced Certifications" heading, etc.).
- **section-decomposer:** Two sections — `HeroHeading` (reusable across all Advanced Certifications listing variants) and `CoursesGrid` (reusable, takes a `courses[]` and renders 3-col grid). Both should be parameterized by listing variant ("Online" / "In-person" / "Hybrid" / etc.) when sibling pages 1:4756 and 1:7174 are fetched.

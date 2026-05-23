# Visual QA v2 — /our-trainers

**Verdict: FAIL** (1 major still open: F-003. All other v1 issues resolved or reclassified.)

Screenshots (fresh, full-page):
- Mobile (390x1200): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_mobile_v2.png`
- Tablet (768x1024): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_tablet_v2.png`
- Desktop (1440x1024): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_desktop_v2.png`

Figma refs unchanged: `01_figma_screenshot.png` (mobile), `01_figma_screenshot_desktop.png` (desktop).

## Status of v1 findings

| ID | v1 severity | v2 status | Notes |
|----|-------------|-----------|-------|
| F-001 | critical | **resolved** | `SiteFooterBlock showCta={false}` confirmed in page.tsx; only one mint CTA band renders across all three viewports. |
| F-002 | major | **resolved** | Overlay now `bg-gradient-to-b from-black/55 to-black/25`; hero scene clearly visible behind headline on desktop + tablet. |
| F-003 | major | **still-open** | See detail below — confirmed against Figma desktop ref. |
| F-004 | major | **reclassified — not a defect** | Re-examined `01_figma_screenshot_desktop.png`: Department Heads in Figma DO use tonal mint/dark-green/lime tiles with rounded-square photos. The built output matches. v1 misread the reference. |
| F-005 | minor | **reclassified — nit** | Mobile hero v2 terminates cleanly at CTA; no clear evidence in Figma mobile that an italic subline is required. Treat as nit unless product confirms. |
| F-006 | minor | **resolved** | Default `backgroundImage` now `/images/trainers/hero-bg.png`; asset present; image visible on tablet/desktop. |
| F-007 | minor | **still-open** | Pull-quote desktop band still renders only the opening glyph. Add closing glyph after attribution. |
| F-008 | minor | **resolved** | `titleDesktop` default now "Meet All Our Trainers"; rendered title-cased. |
| F-009 | nit | pass | Interactions unchanged. |
| F-010 | nit | pass | Tokens unchanged. |

## F-003 (still major) — Meet-All cards are rectangular, Figma uses circular avatars

**Where:** `TrainersMeetAll` on `md:` and `lg:` breakpoints (tablet + desktop).

**Figma desktop reference (01_figma_screenshot_desktop.png):** the "Meet All Our Trainers" section renders a 6-column grid of circular avatar portraits (~120-140px diameter), with **two lines of centered text below each**: name (bold) + role (smaller, muted). No border, no city, no years, no rectangular crop. Plain white surface.

**Built (05_qa_screenshot_desktop_v2.png):** a grid of rectangular ~3:4 portrait cards with a thin border, left-aligned name, role, city, and years — i.e. the same card shape used for the mobile faculty grid. This is correct for mobile (matches Figma mobile) but wrong for md+.

**Why I'm confident this is a real desktop spec, not interpolation:** the Figma desktop screenshot explicitly shows the circular treatment for the meet-all grid (distinct from Department Heads which uses tonal tiles). Two different card variants exist in Figma; build only reuses one.

**Fix suggestion (focused):**
1. Add a `variant: "avatar" | "card"` prop to `TrainerProfileCard` (or split into `TrainerAvatarTile` + existing `TrainerProfileCard`).
2. `avatar` variant: `rounded-full` square crop (`aspect-square object-cover`), centered name + role only, no border, no city/years.
3. Pass `variant="avatar"` from `TrainersMeetAll` for `md:`+; keep `card` for the mobile faculty grid (which renders well on `<md`).
4. Likely a ~30-50 line change in two files.

## F-007 (still minor) — Pull-quote desktop missing closing glyph

Add a mirrored closing `"` glyph after the attribution line in `TrainersPullQuoteBand` (desktop variant), or center both glyphs around the block.

## Sanity table — fixes verified visually

| viewport | one closing CTA? | hero scene visible? | hero bg loads? | title case? |
|----------|------------------|---------------------|----------------|-------------|
| mobile  | yes              | n/a (mint band)     | n/a            | n/a (mobile title is "Our Trainers") |
| tablet  | yes              | yes                 | yes            | yes ("Meet All Our Trainers") |
| desktop | yes              | yes                 | yes            | yes ("Meet All Our Trainers") |

## Expected verdict after F-003 ships
PASS-WITH-MINOR (F-007 remaining as the only minor).

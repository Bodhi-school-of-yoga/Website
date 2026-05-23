# Visual QA — /our-trainers

**Verdict: FAIL** (1 critical, 3 major, 4 minor, 2 nit)

Screenshots:
- Mobile (390x1200): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_mobile.png`
- Tablet (768x1024): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_tablet.png`
- Desktop (1440x1024): `/Users/anukul/Desktop/bodhi/_workspace/05_qa_screenshot_desktop.png`

Figma references:
- Mobile: `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot.png`
- Desktop: `/Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot_desktop.png`

## Section / responsive guards (all PASS)
| viewport | header | hero | pullquote | founder | dept-heads | meet-all | closing-cta | footer |
|----------|--------|------|-----------|---------|-----------|----------|-------------|--------|
| mobile  | yes | mint band (no image) | single-glyph | hidden | hidden | 7 cards | yes (x2!) | yes |
| tablet  | yes | image + overlay | paired-glyph | hidden | visible | 18 cards | yes (x2!) | yes |
| desktop | yes | image + overlay | paired-glyph | visible | visible | 18 cards | yes (x2!) | yes |

Hero variant swap, pull-quote variant swap, founder-hides-<1024, depthead-hides-<768, mobile-7 / desktop-18 — all correct.

## Findings

### F-001 (critical, all viewports) — Closing CTA renders twice
`OurTrainersPage` renders an explicit `<ClosingCtaSection theme="light" cards={[...]} />`, then `<SiteFooterBlock />` (which has `showCta={true}` by default) renders **another** dark `ClosingCtaSection`. Result: two stacked "Begin where you are." bands. Figma shows one.
Fix: pass `showCta={false}` to `<SiteFooterBlock />` on the page (keeps the page-level light CTA with sub-cards). Or alternatively move the cards/light theme onto the footer block via its `cta` prop and delete the page-level CTA.

### F-002 (major, desktop) — Hero overlay too dark
`bg-black/[.69]` over the background image makes the hero band read as nearly solid black. Figma desktop shows a visible nature scene behind the headline.
Fix: drop opacity to ~40% or use a gradient (top: ~55%, bottom: ~25%).

### F-003 (major, desktop+tablet) — Meet-all cards don't match Figma
Figma desktop uses circular avatar portraits with centered name + role. Built `TrainerProfileCard` is a rectangular 3:4 photo card with border, name, role, years, city.
Fix: add a `variant="circle"` (or a separate `TrainerAvatarTile`) used by `TrainersMeetAll` on `md+`; keep the existing rectangular card for the mobile faculty grid (which matches mobile Figma).

### F-004 (major, desktop+tablet) — Department-heads tonal-tile background not in Figma
Built `DepartmentHeadCard` shows a colored tonal block (mint / dark / lime) behind a square photo. Figma shows plain circular avatars on the white surface with no tile.
Fix: switch to circular crop, drop the tonal background div.

### F-005 (minor, mobile) — Possible missing secondary italic line under hero CTA
Figma mobile band appears to render a small italic body paragraph after the CTA. Built mobile hero stops at the CTA.
Fix: confirm against Figma export; add a prop-controlled italic `<p>` if confirmed.

### F-006 (minor, all) — Hero background image is a 404
Default `backgroundImage` is `/images/trainers/hero-bg.jpg` but only `hero-bg.png` exists. The desktop hero is effectively pure black because the image never loads (compounds F-002).
Fix: change default to `/images/trainers/hero-bg.png` or rename the asset.

### F-007 (minor, desktop) — Pull-quote band has only one glyph
Desktop variant renders a single opening glyph top-left. Figma shows paired-glyph framing.
Fix: add a closing glyph after the attribution, or center the block.

### F-008 (minor, all) — Desktop heading case
Default `titleDesktop = "Meet all our trainers"`; Figma uses title case "Meet All Our Trainers".

### F-009 (nit) — Interactions: PASS
All CTAs render as `<a>` with valid `href` and `focus-visible:ring-2`. 0 missing/'#' hrefs across all viewports.

### F-010 (nit) — Design tokens: PASS
No rogue hex colors in any trainers-* section, in the founder/dept-head/meet-all cards, or in closing-cta-section. All colors via Bodhi tokens (`bg-brand-lite`, `text-text-inverse`, `bg-brand-green-deep`, `bg-mint-pale`, `text-text-teal-deep`, etc).

## Image loading
All 7 trainer .jpg files in `/public/trainers/` return HTTP 200. "Broken" images detected in the audit were Next.js lazy-load images outside the viewport that hadn't been requested yet (visible:false) — not a real defect. In-viewport images render fine in all three screenshots.

## Notes
- Tablet has no Figma reference; behaviour is interpolated between mobile and desktop. Department-heads visibility and trainer count are correct.
- Console error "Failed to load resource 404" surfaced on tablet + desktop runs is caused by the hero-bg.jpg 404 in F-006.

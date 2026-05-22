# Visual QA Report — About + Our Centers

**Date:** 2026-05-22
**Viewport tested:** 1512 × 827 (lg breakpoint, scaled-down 1920 design)

## Verdict: PASS-WITH-MINOR

Both pages render correctly with design tokens, animations, and reuse of existing primitives. Two minor cosmetic issues (broken image placeholders) listed below.

## About Us — `/about` (Figma 1:9681)

| Section | Status | Notes |
|---|---|---|
| SiteHeader | ✅ | Reused; fixed top |
| AboutHero | ✅ | Mint bg, eyebrow + H1 + subcopy + "Join our classes" CTA |
| AboutStatsBar | ✅ | 4 stats animating up via AnimatedCount (caught at 13K+→27K+→38K+ mid-count); final values 100K+/20+/15+/10K+ |
| AboutPillarsSection | ✅ | "A path to wellness" eyebrow + "Healing. Expert. Community." headline (periods in brand-green) + 3 cards |
| AboutStorySection | ⚠️ | 4 alternating rows render correctly; **placeholder image paths broken** (`/images/about/legacy.jpg`, `present.jpg`, `future.jpg`, `trainers.jpg` don't exist — alt text shows) |
| AboutVisionMissionSection | ✅ | Dark-teal Vision card + mint Mission card side-by-side; italic accents present |
| TestimonialsSection | ✅ | 3 cards (Aanya, Ravi, Lena) rendering correctly post-fix |
| ClosingCtaSection | ✅ | "Begin where you are." + "Try a class, free" + 3 cards |
| SiteFooter | ✅ | Bodhi wordmark, School/Stay close/Visit columns, copyright |

## Our Centers — `/our-centers` (Figma 1:9562)

| Section | Status | Notes |
|---|---|---|
| SiteHeader | ✅ | Reused |
| CentersSection | ⚠️ | H1 + subtitle + pincode bar (Search icon + input + green Search chip) + locations panel (10 location items) all working; **map image placeholder broken** (`/images/centers/map-placeholder.jpg` not on disk) |
| ClosingCtaSection | ✅ | Same as About |
| SiteFooter | ✅ | Same as About |

## Critical issue found and fixed during QA

**Framer-motion stuck at `opacity: 0` in React 19 / Next 16** — discovered when testimonials section showed empty space at scroll 4000px. h2 opacity was 0.029, closing CTA h2 was 0. Root cause: `motion.h2` with `initial="hidden" whileInView="visible"` never transitions in the current setup.

Fix: stripped framer-motion from 3 shared components (testimonials-section, closing-cta-section, site-footer) — converted to plain server components. Cascading benefit: the home page `/` testimonials + footer + closing CTA now also render correctly (they were silently broken before).

## Token compliance

All 6 new components use design tokens only (text-h*/text-subtext-*/text-mini, text-text-*, bg-brand-*/surface-*, border-border-*, font-heading/sans/serif). Zero raw hex. Zero `clamp()`. Verified by grep across `apps/web/src/components/sections/about-*.tsx` and `centers-section.tsx`.

## Outstanding (cosmetic, can be done later)

1. Drop real story-row images into `apps/web/public/images/about/{legacy,present,future,trainers}.jpg`
2. Drop a map screenshot into `apps/web/public/images/centers/map-placeholder.jpg`

## Console errors

Clean — no runtime errors on `/`, `/about`, or `/our-centers`.

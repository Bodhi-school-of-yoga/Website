# Homepage decomposition (Figma node 1:32)

Frame: `Homepage` — 1920 x 7008.

## Section tree (top to bottom)

| # | Section | Figma id | y-range | Action | Existing component |
|---|---|---|---|---|---|
| 1 | **Hero** (incl. nav, headline, image, "What we offer" 4-card strip) | 1:33 / 1:35 / 1:83 / 1:90 / 1:591 / 75:3228 | 0–1175 | **reuse-as-is** | `sections/hero-section.tsx` |
| 2 | **SanskritMarqueeStrip** — 8 limbs of yoga, looping | 1:53 | 1102–1175 | update | `sections/sanskrit-marquee-strip.tsx` |
| 3 | **FounderQuoteSection** — "Our practice" + Acharya Ashok quote | 1:39 | 1175–1652 | update | `sections/founder-quote-section.tsx` |
| 4 | **WhyBodhiSection** — image + heading + pillars + CTA | 607:8414 | 1763–2511 | update | `sections/why-bodhi-section.tsx` |
| 5 | **ProgramsGridSection** — dark band, 2 rails × 3 cards | 1:226 + 607:8415 | 3128–4531 | update | `sections/programs-grid-section.tsx` |
| 6 | **AccreditationsSection** — 8 logos in one rounded card | 1:129 | 4601–5264 | update | `sections/accreditations-section.tsx` |
| 7 | **TestimonialsSection** — 3 cards | 1:557 | 5479–5978 | update | `sections/testimonials-section.tsx` |
| 8 | **FinalCtaSection + SiteFooterBlock** — "Begin where you are." + footer columns + legal | 1:619 | 6102–7008 | update (new sub-block: `FinalCtaSection`) | `site-footer-block.tsx` |

## Removed from current page

- **ExperienceHarmonyStatsBand** — no stats band exists in Figma; remove from `app/page.tsx`.
- **WhatWeDoSection** — the 4-card "What we offer" strip is part of the hero (already inside `hero-section.tsx`); remove the standalone use from `app/page.tsx`.

## New components needed

- `FinalCtaSection` (new section) — "Begin where you are." block on the dark surface above the footer.
- `ProgramCard` (new component) — reusable card used 6× by ProgramsGridSection.
- `TestimonialCard` (new component) — used 3× by TestimonialsSection.

## Hard constraint

`sections/hero-section.tsx` is **reuse-as-is**. Do not modify it or its data. The Sanskrit marquee at y=1102 visually overlaps the hero band — keep it as a separate top-level component rendered after `<HeroSection />`, matching the current `app/page.tsx` composition.

## Open questions (see `02_decomposition.json#uncertain`)

1. Programs band background (1:226) — does it extend behind the Final CTA too? Confirm in QA.
2. Second programs rail eyebrow says "Teacher Training" — likely a Figma copy bug; flag for product.
3. RYS-300 / RYS-200 badges in accreditations sit pinned to the right edge without captions — mirror Figma exactly.
4. Final CTA + footer share a dark surface — ensure no visual seam between the two components.

## Section order for `app/page.tsx`

```tsx
<HeroSection />
<SanskritMarqueeStrip />
<FounderQuoteSection />
<WhyBodhiSection />
<ProgramsGridSection />
<AccreditationsSection items={...} />
<TestimonialsSection testimonials={...} />
<FinalCtaSection />   {/* new */}
<SiteFooterBlock />
```

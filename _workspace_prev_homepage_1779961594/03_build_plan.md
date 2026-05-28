# Home page build plan (Figma 1:32)

11 tasks across 2 parallel waves. Motion library: **framer-motion** (already in project) + Tailwind utilities for hover/press states.

## Hard constraints

- `apps/web/src/components/sections/hero-section.tsx` is **locked**. No task touches it.
- All work must use Bodhi tokens (`text-h1..h5`, `text-mini`, `text-text-primary/brand/tertiary`, `bg-surface-*`, `border-border-*`). **No inline hex. No `clamp()`.**
- Prefer in-place edits. No parallel duplicates of existing sections.
- Preserve existing hrefs in `programs-grid-section.tsx` (DEFAULT_TTC / DEFAULT_CERT) and `site-footer-block.tsx` (DEFAULT_COLUMNS: Instagram, YouTube, Get directions, Newsletter, Email).

## Wave G1 (10 parallel tasks, independent files)

| ID | File | Kind | Summary |
|---|---|---|---|
| T1 | `sections/sanskrit-marquee-strip.tsx` | extend | Verify 8-limb order, ~96px gap, italic font-heading. Keep `terms` prop name. CSS marquee with motion-reduce halt. |
| T2 | `sections/founder-quote-section.tsx` | extend (breaking) | Replace 3-part split quote + paragraphs with single quote + right-column portrait image. Stagger entrance. |
| T3 | `sections/why-bodhi-section.tsx` | extend | Rename `subhead`->`intro`, `innerHeading`->`pillarsTitle`. Update 5 pillars copy. Swap filled green CTA box for `Learn More` text link. |
| T4 | `sections/programs-grid-section.tsx` | extend | Switch to full-bleed `bg-brand-dark`, invert text, move 'More Courses' link to right of rail header, trim to 3 cards/rail. Preserve all existing card hrefs. |
| T5 | `sections/program-card.tsx` | new | Reusable card primitive (image top, meta row, title, View Program link). hover-lift-dark + image-zoom + arrow nudge via Tailwind. |
| T6 | `sections/accreditations-section.tsx` | extend | 5x2 layout: 6 captioned logos in 3-col grid + 2 pinned circular badges (RYS-300/200) without captions. Add `omitCaption` flag. |
| T7 | `sections/testimonials-section.tsx` | extend | Confirm 3-col 457px gap-24. Stagger entrance. No hover on cards. Avatar reorder deferred to visual-qa (shared primitive risk). |
| T8 | `sections/closing-cta-section.tsx` | extend | Trim body to Figma copy. Confirm `theme='dark'` matches footer surface. hover-lift + press-scale on CTA button. |
| T9 | `site-footer-block.tsx` | extend | Add optional `columns/brand/legal` override props (keep existing default for other pages). page.tsx will pass home-specific set. Preserve external hrefs. |
| T10 | `app/globals.css` | conditional | Add `@keyframes marquee` only if missing. No-op if present. |

All 10 are independent and can be dispatched concurrently to component-builder agents.

## Wave G2 (page wire-up, depends on G1)

| ID | File | Kind | Summary |
|---|---|---|---|
| T11 | `app/page.tsx` | page-update | Remove `<ExperienceHarmonyStatsBand />` and `<WhatWeDoSection />` renders. Render sections in new order. Pass home-page-specific columns/brand/legal to `<SiteFooterBlock>` (preserving IG / YT / directions / newsletter hrefs read verbatim from `site-footer-block.tsx`). |

## Ordering rationale

- The 10 G1 tasks touch 10 different files. No shared dependency, so they're maximally parallel.
- T5 (new `program-card.tsx`) is a sibling of T4 (`programs-grid-section.tsx`), but T4's spec keeps inline TtcCard/CertCard as the fallback render if T5 lands later. Both edit independent files, so they run in parallel and T4 can wire to the new primitive in a final tightening pass during QA.
- T10 (`globals.css` keyframe) is a tiny conditional add that the marquee in T1 depends on at runtime. Running both in G1 is safe because T10 is a no-op when the keyframe already exists.
- T11 (`app/page.tsx`) must wait for every section to land so its imports + prop shapes line up. Single task in G2.

## Tradeoffs flagged

- **T2 (FounderQuote)** is a breaking API change (split-quote -> single quote + image). Scout confirms founder-quote-section is only consumed by `app/page.tsx`, so the blast radius is contained. No compat shim needed.
- **T7 (Testimonials avatar position)**: Figma shows avatar at bottom, current `ui/testimonial-card.tsx` renders avatar at top. That primitive is shared with other pages, so this plan does NOT mutate it in the section task. visual-qa will flag and a follow-up task can land it after confirming other consumers.
- **T9 (SiteFooterBlock)** uses an additive override-prop path (don't change the default) to avoid breaking pages that depend on the existing 5-col Courses/About column set.
- **T4 (ProgramsGridSection)** keeps the existing 6-card defaults intact and trims to 3 at render time, preserving every existing href for other consumers / future product decisions.

## Motion library

- **framer-motion** for all scroll-reveal entrances (already a dependency). House easing `[0.22, 1, 0.36, 1]`, default duration 0.5s, stagger step 0.08s, slide distance 16px.
- **Tailwind utilities** for hover/press states (`hover-lift-card-dark`, `image-zoom-soft`, `link-arrow-shift`, `hover-underline-link`, `hover-lift-button`, `press-scale`).
- All entrances honor `useReducedMotion()` (y=0, duration=0). The marquee halts via `motion-reduce:animate-none`.
- Section entrances trigger via `whileInView` with `{ once: true, margin: '-80px 0px -80px 0px' }`.

## Open issues (decisions inlined)

1. **ProgramCard hrefs**: 6 cards have `cta.href='#'` in decomposition. Decision: preserve the real hrefs already wired in `DEFAULT_TTC` / `DEFAULT_CERT` inside `programs-grid-section.tsx`. Do not invent routes.
2. **Footer external links** (IG, YT, Get directions, Newsletter): preserve existing values from `DEFAULT_COLUMNS` inside `site-footer-block.tsx` (builder must Read the file before editing).
3. **Programs dark band may extend behind FinalCta**: both surfaces use `bg-brand-dark`, so seam should be invisible. Confirm in visual-qa.
4. **Second rail eyebrow says 'Teacher Training'** (likely Figma copy bug): render as-is per Figma. Flag for product review in `05_qa_report`.

## Demo page

Skipped. The home page itself (`/`) IS the demo target. visual-qa screenshots `/` directly.

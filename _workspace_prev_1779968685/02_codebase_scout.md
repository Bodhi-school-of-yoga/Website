# Codebase Scout — Online 300 Hour YTT Course Page

## TL;DR

Of 26 proposed components across 15 sections: **24 reuse-as-is, 1 extend (additive), 1 effectively new (icon-map entries)**. There is an almost-complete reference page at `apps/web/src/app/yoga-courses/online-300-hour-ytt/page.tsx` already wired to every section component this Figma needs. This task is overwhelmingly a recomposition + content-prop pass, not a build.

| Action | Count |
|--------|-------|
| reuse-as-is | 24 |
| extend (additive opt-in) | 1 (TestimonialsSection mosaic layout) |
| new | 0 standalone components (3 new icon keys in the existing HighlightsSection ICON_RESOLVER) |

## Key reuse wins (existing section components map 1:1)

| Figma section | Existing section component |
|---|---|
| Course Hero | `sections/course-hero-section.tsx` (already supports BreadcrumbItem[], lead/accent split title, meta-chip tile grid) |
| Section Tab Scroller | `sections/course-section-nav.tsx` (sticky, IntersectionObserver active state, pill highlight) |
| Overview | `sections/course-overview-section.tsx` (eyebrow + h2 + paragraphs[]) |
| Highlights — What You'll Gain | `sections/highlights-section.tsx` + `ui/highlight-card.tsx` (52x52 icon tile + title + body) |
| Curriculum — Course Syllabus | `sections/curriculum-section.tsx` + `ui/syllabus-card.tsx` + `ui/scroll-next-button.tsx` (46x46 circular arrow) |
| Is This Course Right for You? | `sections/course-eligibility-section.tsx` + `ui/checklist-item.tsx` (left checklist + right image) |
| Certification (dark band) | `sections/certification-banner-section.tsx` (eyebrow + h2 + dark green panel) |
| Pre-Requisites (centered) | `sections/pre-requisites-section.tsx` (centered eyebrow + h2 + checklist) |
| Meet Your Instructors | `sections/instructors-section.tsx` + `ui/instructor-card.tsx` (98x98 avatar + name + role) |
| FAQ | `sections/faq-section.tsx` + `ui/faq-item.tsx` (+/− indicator, defaultOpen, framer-motion expand) |
| More Courses | `sections/popular-courses-section.tsx` + `ui/program-card.tsx` (3-up grid, meta row, instructor initials) |
| Closing CTA | `sections/closing-cta-section.tsx` (shared — dark theme, "Begin where you are" pattern) |
| Site Header / Footer | `site-header.tsx` / `site-footer-block.tsx` (shared) |

## Extend (additive only)

- **TestimonialsSection mosaic layout** — Figma shows a 2x3 mosaic (1 large 440x318 + 4 small 440x158). Current section is a uniform 3-col grid used on 5+ pages.
  - Add: `layout?: 'grid' | 'mosaic'` (default `'grid'`, no breaking change)
  - Add: `size?: 'lg' | 'sm'` on `TestimonialItem` (consumed only when `layout='mosaic'`)
  - `TestimonialCard` primitive itself does not need changes.

## New (icon-map entries only)

`HighlightsSection`'s `ICON_RESOLVER` lacks keys for `yoga-meets-flight`, `leaf-filled`, `build-strength`. Either add three new entries (using existing lucide icons like `Wind`/`Sparkles`/`Dumbbell`) or remap the decomposition keys to the existing `yoga`/`leaf`/`strength` keys.

## Shared-component guardrails (per project memory)

- Render `<SiteHeader />`, `<SiteFooterBlock showCta={false} />`, `<ClosingCtaSection {...content} />` as-is.
- `FaqItem`, `Button`, all `ui/*` primitives — no default mutations; additive opt-in props only.
- `TestimonialsSection` mosaic is the only proposed extension; it MUST be an additive opt-in.

## Design tokens

All tokens referenced by the proposed components are already defined in `DESIGN.md` and the Tailwind theme:
- Brand: `brand-primary` `brand-dark` `brand-shade` `brand-lite` `brand-green-darkest` `text-brand`
- Surfaces: `surface-0/1/2`, `bg-background`, `bg-card`
- Borders: `border-1/2/3`
- Text: `text-primary` `text-secondary` `text-tertiary` `text-inverse`
- Type scale: `text-h2/h3/h4/h5`, `text-mini`, `text-subtext-1/2`, `text-body-sm/md`

No new tokens needed.

## Warnings for the build-planner

1. **Reference page already exists** at `apps/web/src/app/yoga-courses/online-300-hour-ytt/page.tsx`. Diff before deciding new-page vs. iterate.
2. **Two card primitives have similar names** — for "More Courses" use `ui/program-card.tsx` (via `PopularCoursesSection`), NOT `ui/course-card.tsx` (which is a horizontal price/CTA card for booking).
3. **Figma typo "Circulum"** — keep literal label if required; href/id key should be `curriculum`.
4. **Pre-Requisites duplicates** — Figma lists 6 items but only 3 are unique. Deduplicate.
5. **Testimonials eyebrow "Your Guide"** appears to be a copy-paste error in Figma (matches Instructors eyebrow). Confirm with design or override.

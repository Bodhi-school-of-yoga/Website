# Build Plan — Aerial Yoga Course (`/courses/aerial-yoga`)

**Target Figma:** desktop `1:7667` · mobile `218:30509`
**Revision:** 1
**Motion library:** `framer-motion ^12.39.0` (already in `apps/web/package.json`) — used only for scroll-into-view entrance reveals, the hero mount stagger, and the FAQ accordion height transition. All hover/press/underline effects are pure Tailwind. Every framer animation must honor `useReducedMotion` / `prefers-reduced-motion`.

## Headline finding

The scout was generous: of 13 sections / ~20 components, only **one** new section file is required (`syllabus-grid-section.tsx`). Everything else is reuse-as-is or a small extension to existing sections / primitives — driven by a single new data module. The route page itself is the visual-qa target (no scaffolding demo needed beyond an optional alias).

## Ordering rationale

Tasks fall into four parallel groups. The orchestrator can dispatch each group's tasks concurrently because they touch disjoint files.

| Group | Why this batch | Tasks |
|---|---|---|
| **A** | The data module is the only file every consumer reads. Get it stable first. | T1 (`data/aerial-yoga-course.ts`) |
| **B** | Five independent extensions, no shared file. Maximum parallelism. | T2 (CourseHeroSection), T3 (HighlightsSection), T4 (SyllabusCard), T5 (InstructorsSection), T6 (FaqItem) |
| **C** | One brand-new section that imports the T4-extended SyllabusCard. Must wait for T4. | T7 (`sections/syllabus-grid-section.tsx`) |
| **D** | Page composition pulls everything together. | T8 (route), T9 (optional demo alias) |

There are **no circular dependencies**. T8 has the longest fan-in (depends on T1-T7) but each prior task is small.

## Task summary

### T1 — `data/aerial-yoga-course.ts` (new, group A)

Single source of truth for every section's copy + hrefs. Exports `aerialYogaCourse` and an `AerialYogaCourse` type. `breadcrumb` is `BreadcrumbItem[]` (not a flat string) so the existing Breadcrumb primitive can be used by the extended hero. A top-of-file comment lists the 8 unresolved hrefs from `02_interactions.json` so visual-qa can verify them in QA.

### T2 — `course-hero-section.tsx` (extend, group B)

Convert to client component, add framer-motion mount stagger across breadcrumb / title-line-1 / title-line-2 / body / meta-row / CTA / hero-image (per `02_interactions.json` hero motion spec), and widen `breadcrumb` to accept `string | BreadcrumbItem[]`. Existing string callers stay working.

### T3 — `highlights-section.tsx` (extend, group B)

Add four icon keys to `ICON_RESOLVER` (`feather`, `spine`, `smile`, `rocket`), accept an `id` prop for the `#highlights` anchor, and add scroll-into-view stagger reveal. Tailwind `hover-lift-card` on each card wrapper.

### T4 — `ui/syllabus-card.tsx` (extend, group B)

Add optional `n` (module number) prop, replace fixed `w-[294px]` with `w-full`, add Tailwind hover-lift. Existing horizontal-scroller callers are unaffected because the scroller controls width via the parent.

### T5 — `instructors-section.tsx` (extend, group B)

Add `layout: 'scroller' | 'grid'` (default `scroller`, backward compatible). In grid mode, drop `ScrollNextButton` and switch to `grid grid-cols-1 sm:grid-cols-2 gap-6`. Wrap each `InstructorCard` in `<Link href="/trainers/<slug>">` when slug is provided. Scroll-into-view stagger reveal.

### T6 — `ui/faq-item.tsx` (extend, group B)

Replace hard show/hide with `AnimatePresence` + `motion.div` animating `height: 0 ↔ 'auto'` (300ms easeOut). Optional chevron rotate via Tailwind. The first item's `defaultOpen=true` skips the open animation on mount. Honors `useReducedMotion` by collapsing transition duration to 0.

**Tradeoff:** Scout confirmed shadcn Accordion is NOT installed in this repo, so the framer-motion path is the only path. We don't double-animate.

### T7 — `sections/syllabus-grid-section.tsx` (new, group C)

The single net-new section file. Mirrors the header style of `HighlightsSection` (inline `text-mini` eyebrow + `text-h2` heading — NOT the SectionHeader primitive, per scout). Grid is `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5`. Renders 6 `SyllabusCard`s each with module number. Scroll-into-view stagger reveal.

### T8 — `app/courses/aerial-yoga/page.tsx` (new, group D)

Composes the page in the order the scout dictated:

```
SiteHeader(tone='light')
CourseHeroSection
CourseSectionNav (sticky)
CourseOverviewSection            id='overview'
HighlightsSection                id='highlights'
SyllabusGridSection              id='curriculum'
PreRequisitesSection             id='eligibility'
InstructorsSection (layout='grid')
FaqSection                       id='faq'
PopularCoursesSection
ClosingCtaSection (theme='dark', cards=[3])
SiteFooterBlock(showCta={false})
```

Mirrors the structure of `apps/web/src/app/pre-recorded-courses/[slug]/page.tsx`. Static (non-dynamic) route. The three light "Free Trial / Speak to us / Take a Guided Path" cards are passed via `ClosingCtaSection.cards` (per scout's recommendation — no separate `CtaCardsRow` component needed).

### T9 — `app/demo/aerial-yoga/page.tsx` (optional, group D)

Re-exports the canonical page so visual-qa has a `/demo/<section>` URL per harness convention. Drop if `/courses/aerial-yoga` is acceptable as the QA target.

## Tradeoffs & decisions

- **Extending HighlightsSection over duplicating it.** Aerial Yoga reuses the existing 2-col grid layout — only the icon resolver needs 4 new keys and the section needs an `id` prop. No need to fork into `gain-grid-section.tsx`.
- **Single SyllabusCard, two consumers.** T4 keeps the existing horizontal-scroller (`CurriculumSection`) working while adding the new grid use-case. The cost is one new optional prop (`n`) and swapping a hardcoded width for `w-full` — well worth avoiding a card duplicate.
- **Cards via `ClosingCtaSection.cards`, not a new section.** Scout confirmed `ClosingCtaSection` already supports a 3-up cards row themed to its `theme` prop. Re-implementing as a separate `CtaCardsRow` would duplicate the visual treatment.
- **No SectionHeader primitive in new section.** Sibling sections (Curriculum, Eligibility, Overview, PreRequisites, Highlights) all inline their header; `SectionHeader` is used for shorter standalone blocks. Staying consistent.
- **Static route, not dynamic.** Only one YTT course is being built right now. If/when a second is added, lift `data/aerial-yoga-course.ts` to a courses registry and migrate to `app/courses/[slug]/page.tsx`.
- **Trainer link is wired even if route doesn't exist.** T5 wraps each card in `<Link href="/trainers/<slug>">` regardless. Visual-qa will discover whether `/trainers/[slug]` 404s and downgrade to a non-link card if so.

## Unresolved hrefs (carried forward from `02_interactions.json`)

The route page passes these hrefs straight from `aerialYogaCourse`. Visual-qa should confirm each route during QA, or downgrade to a no-op if the target page doesn't exist yet.

- `/trainers/[slug]` (T5 — instructor cards)
- `/courses/weight-loss-coach`, `/courses/mudra-therapy`, `/courses/mat-pilates` (PopularCoursesSection)
- `/try` (ClosingCtaSection primary CTA)
- `/free-trial`, `/contact`, `/assessment` (3 closing CTA cards)
- `/enquire?course=aerial-yoga` (hero CTA — verify `/enquire` handles the `course` query param)

## Global acceptance (applies to every task)

1. `yarn tsc --noEmit` passes for `apps/web`.
2. No inline hex anywhere — only Bodhi tokens (`bg-brand-*`, `bg-surface-*`, `text-text-*`, `border-border-*`, `mint-*`).
3. No `clamp()` — typography via `text-h1..h5` / `text-subtext-1..3` / `text-body-sm` / `text-mini`.
4. Renders correctly at **390px (mobile)** and **1920px (desktop)** per `02_decomposition.json` responsive_strategy.
5. All framer-motion uses `useReducedMotion` / `prefers-reduced-motion` (zero-duration / zero-distance fallback).

## Files written / touched

| Path | Action |
|---|---|
| `/Users/anukul/Desktop/bodhi/apps/web/src/data/aerial-yoga-course.ts` | create (T1) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/components/sections/course-hero-section.tsx` | extend (T2) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/components/sections/highlights-section.tsx` | extend (T3) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/components/ui/syllabus-card.tsx` | extend (T4) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/components/sections/instructors-section.tsx` | extend (T5) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/components/ui/faq-item.tsx` | extend (T6) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/components/sections/syllabus-grid-section.tsx` | create (T7) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/app/courses/aerial-yoga/page.tsx` | create (T8) |
| `/Users/anukul/Desktop/bodhi/apps/web/src/app/demo/aerial-yoga/page.tsx` | create (T9, optional) |

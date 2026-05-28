# Yoga Course Details — Decomposition

**Target node:** `805:10091` (YogaCourse)
**Page:** Online 300 Hour Yoga Teacher Training — RYT 300
**Viewport:** 1920 × 6936

## Section Map (top → bottom)

| # | ID | Label | y-range | Key components |
|---|---|---|---|---|
| 1 | `site-header` | Sticky site nav (instance) | 20–76 | `SiteHeader` (reuse) |
| 2 | `course-hero` | Two-col hero with breadcrumb, H1, meta chips, availability strip, CTA | 178–687 | `Breadcrumb`, `CourseHero`, `MetaChip` ×3, `Button` |
| 3 | `section-scroller` | Sticky in-page tabs (Overview / Highlights / Curriculum / Eligibility / Overall) | 828–875 | `SectionTabs` |
| 4 | `overview` | Eyebrow + H2 + 3 paragraphs | 892–1266 | `SectionHeading`, `ProseBlock` |
| 5 | `highlights` | "What You'll Gain" — 6 icon-cards (3×2 grid) | 1266–1921 | `SectionHeading`, `FeatureCard` ×6 |
| 6 | `curriculum` | "Course Syllabus" — 5 small cards in horizontal row + arrow | 1924–2286 | `SectionHeading`, `SyllabusCard` ×5, `CarouselArrow` |
| 7 | `is-this-for-you` | Two-col: 8-item checklist + image | 2285–3022 | `SectionHeading`, `CheckList`, `Image` |
| 8 | `certification` | Dark band "Globally Recognised" RYT300 copy | 3022–3458 | `SectionHeading`, `ContrastBand` |
| 9 | `testimonials` | "What People Are Saying?" — 1 large + 4 small testimonial cards | 3452–4078 | `SectionHeading`, `TestimonialCard` ×5 |
| 10 | `pre-requisites` | Centered checklist of 3 (×2 duplicated) eligibility items | 4079–4635 | `SectionHeading` (centered), `CheckList` (centered variant) |
| 11 | `instructors` | "Meet Your Instructor's" — row of 4 instructor cards | 4636–4942 | `SectionHeading`, `InstructorCard` ×4 |
| 12 | `faq` | Accordion with 4 questions (1st expanded) | 4943–5414 | `SectionHeading`, `Accordion` (reuse) |
| 13 | `more-courses` | "Lead to more courses from us" — 3 course cards | 5415–6230 | `SectionHeading`, `CourseCard` ×3 |
| 14 | `closing-cta` | "Begin where you are." + "Try a class, free" link | 6231–6537 | `ClosingCtaSection` (reuse, do not redesign) |
| 15 | `site-footer` | Global footer (brand + 3 link cols + legal) | 6231–7137 | `SiteFooter` (reuse, do not redesign) |

## Reusable primitives (new this page)

- `SectionHeading({eyebrow, title, subtitle?, align?})` — used 10+ times.
- `CheckList({items, variant?})` — used in "Is This For You" and "Pre-Requisites".
- `MetaChip({icon, label})` — used in hero and inside course cards.

## Existing primitives expected (codebase-scout should confirm)

- `Button`, `Breadcrumb`, `Image`, `Accordion`
- `SiteHeader`, `SiteFooter`, `ClosingCtaSection` — shared site components; do **not** mutate defaults.

## New, page-specific components

- `CourseHero`, `SectionTabs`, `FeatureCard`, `SyllabusCard`, `ContrastBand`, `TestimonialCard`, `InstructorCard`, `CourseCard`, `CarouselArrow`

## Notes / uncertainties

- **Tab typo:** Figma label "Circulum" → use "Curriculum" in code.
- **Pre-Requisites duplicates:** 3 unique items repeated; dedupe when building.
- **Testimonial eyebrow** says "Your Guide" — same as Instructors. Likely Figma copy-paste; flagged for design review.
- **Stray nodes** at `805:10571` (orphan testimonial card) and `805:10338` (loose rounded rect + arrow at y≈4008) sit outside named sections — excluded.
- **Section scroller** is positioned at y=0, height=892 (covers hero region). Treating as a sticky/floating in-page nav.

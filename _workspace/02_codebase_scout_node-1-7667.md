# Codebase Scout — node 1:7667 (Aerial Yoga Course page)

Goal: for each of the 20 components proposed by section-decomposer, decide reuse-as-is / extend / new.

User constraint: **"there will be existing components — do not modify"**. Any structural mismatch is therefore classified as `new` (sibling component) rather than `extend` (touch existing).

## Summary

- reuse-as-is: **18**
- extend: **0**
- new: **2** — `EligibilitySection` (two-image variant), `SiteFooter` (data-driven prop API)

## Component → Action Table

| # | Proposed | Section | Action | Match (or suggested path) | Confidence |
|---|---|---|---|---|---|
| 1 | SiteHeader | site-header | reuse-as-is | `apps/web/src/components/layout/header.tsx` | exact |
| 2 | CourseHero | hero | reuse-as-is | `apps/web/src/components/sections/course-hero-section.tsx` | exact |
| 3 | ScheduleChip | hero | reuse-as-is | `apps/web/src/components/ui/course-meta-chip.tsx` | exact |
| 4 | SectionTabNav | section-tabnav | reuse-as-is | `apps/web/src/components/sections/course-section-nav.tsx` | exact |
| 5 | OverviewSection | overview | reuse-as-is | `apps/web/src/components/sections/course-overview-section.tsx` | exact |
| 6 | HighlightsSection | highlights | reuse-as-is | `apps/web/src/components/sections/highlights-section.tsx` | exact |
| 7 | HighlightCard | highlights | reuse-as-is | `apps/web/src/components/ui/highlight-card.tsx` | exact |
| 8 | SyllabusSection | syllabus | reuse-as-is | `apps/web/src/components/sections/curriculum-section.tsx` | exact |
| 9 | SyllabusCard | syllabus | reuse-as-is | `apps/web/src/components/ui/syllabus-card.tsx` | exact |
| 10 | ScrollerArrowButton | syllabus + instructors | reuse-as-is | `apps/web/src/components/ui/scroll-next-button.tsx` | exact |
| 11 | EligibilitySection | eligibility | **new** | `apps/web/src/components/sections/course-eligibility-section.tsx` | similar |
| 12 | ChecklistItem | eligibility | reuse-as-is | `apps/web/src/components/ui/checklist-item.tsx` | exact |
| 13 | InstructorsSection | instructors | reuse-as-is | `apps/web/src/components/sections/instructors-section.tsx` | exact |
| 14 | InstructorCard | instructors | reuse-as-is | `apps/web/src/components/ui/instructor-card.tsx` | exact |
| 15 | FaqSection | faq | reuse-as-is | `apps/web/src/components/sections/faq-section.tsx` | exact |
| 16 | AccordionItem | faq | reuse-as-is | `apps/web/src/components/ui/faq-item.tsx` | exact |
| 17 | PopularCoursesSection | popular-courses | reuse-as-is | `apps/web/src/components/sections/popular-courses-section.tsx` | exact |
| 18 | ProgramCard | popular-courses | reuse-as-is | `apps/web/src/components/ui/program-card.tsx` | exact |
| 19 | FooterCtaBanner | footer-cta | reuse-as-is | `apps/web/src/components/sections/footer-brand-cta.tsx` | exact |
| 20 | SiteFooter | footer-cta | **new** | `apps/web/src/components/sections/site-footer-section.tsx` | similar |

## Why the two `new`s

### EligibilitySection (sibling, not extend)
Existing `EligibilitySection` accepts a SINGLE `image` prop and renders a left-image + right-content split. Figma node 1:7996 has TWO flanking lifestyle photos (`leftImage`, `rightImage`) wrapping a centered eyebrow + heading + checklist on a tinted full-bleed band. The compositions are visually different (split layout vs. centered-with-side-flanks). Per user constraint, we build a new sibling at `course-eligibility-section.tsx` instead of altering the existing component (which is consumed by other pages).

### SiteFooter (sibling, not extend)
Existing `layout/footer.tsx` is hardcoded — no props, baked-in columns (Studio/Practice/Connect), and copyright "Bodhi Yoga Studio". The new Figma 339:8402 needs different content (School / Visit / Stay close columns, tagline "A school for teachers...", website link `bodhischoolofyoga.com`, signature "Designed quietly. Practised daily."). Reuse-as-is would render the wrong text. Per user constraint we don't rewrite the existing footer; we add a new prop-driven `site-footer-section.tsx`.

## Prop-name renames (no shape changes — build-planner data-mapping notes)

Several existing components have small prop-name differences from the decomposition's prop names. These are data-mapping concerns, not shape mismatches:

| Component | Decomp prop | Existing prop |
|---|---|---|
| CourseHero | `body` | `subtitle` |
| CourseHero | `chips` | `meta` |
| CourseHero | (n/a) | needs `ctaHref` value supplied |
| OverviewSection | `title` | `heading` |
| HighlightsSection | `title` | `heading` |
| SyllabusSection | `title` | `heading`, needs `nextHref` |
| InstructorsSection | `title` | `heading`, needs `nextHref` |
| FaqSection | `title` | `heading` |
| PopularCoursesSection | `title` | `heading` |
| PopularCoursesSection | `body` | `subhead` |
| PopularCoursesSection course | `duration`/`mode`/`language` | flatten into `meta: [{icon, label}]` |
| PopularCoursesSection course | `instructorInitials`/`instructorName` | `instructor: { initials, name }` |
| FooterCtaBanner | `headline` | `heading` |

## Design tokens validated

All Figma-cited colors and type sizes are present in `apps/web/src/app/globals.css`:
`bg-brand-primary`, `bg-brand-lite`, `bg-brand-dark`, `bg-surface-0..2`, `border-border-1/2`, `text-text-primary/secondary/tertiary/brand/brand-deep/inverse`, `text-h2`, `text-mini`, `font-heading`, `shadow-card`. No missing tokens.

## Build queue for Phase 5

- `apps/web/src/components/sections/course-eligibility-section.tsx` (two-image variant of eligibility, accepts `{eyebrow, heading, items, leftImage, rightImage}`)
- `apps/web/src/components/sections/site-footer-section.tsx` (data-driven, accepts `{brand, tagline, website, columns:[{heading, links}], copyright, signature}`)

Everything else in Phase 5 is data wiring + page composition only.

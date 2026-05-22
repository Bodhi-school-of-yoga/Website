# Build Plan — node 1:7667 (Aerial Yoga Course page)

**Constraint:** do NOT modify any existing component file. New files only.

## Tasks (3 total, 2 parallel groups)

### Group 1 (parallel) — 2 new components

| ID | Task | New file | Reuses |
|---|---|---|---|
| T1 | CourseEligibilitySection (two-image variant) | `apps/web/src/components/sections/course-eligibility-section.tsx` | `ui/checklist-item` |
| T2 | SiteFooterSection (data-driven) | `apps/web/src/components/sections/site-footer-section.tsx` | none |

### Group 2 (after group 1) — page assembly

| ID | Task | New file | Reuses |
|---|---|---|---|
| T3 | Demo page /demo/aerial-yoga-course | `apps/web/src/app/demo/aerial-yoga-course/page.tsx` | site-header, course-hero-section, course-section-nav, course-overview-section, highlights-section, curriculum-section, T1, instructors-section, faq-section, popular-courses-section, footer-brand-cta, T2 |

## Page render order
1. SiteHeader
2. CourseHeroSection (green hero, breadcrumb, chips, CTA, hero photo `imgrectangle161124051.png`)
3. CourseSectionNav (sticky tabs: Overview / Highlights / Circulum / Eligibility / Overall — typos preserved per Figma)
4. CourseOverviewSection
5. HighlightsSection (6 cards with SVG icons)
6. CurriculumSection (6 syllabus cards, scrollable)
7. CourseEligibilitySection (T1, 3 checklist items, 2 flanking photos)
8. InstructorsSection (4 instructor cards, scrollable)
9. FaqSection (4 accordion items — only Q1 has answer copy in Figma)
10. PopularCoursesSection (3 ProgramCards with cross-sell courses)
11. FooterBrandCta ("Begin where you are.")
12. SiteFooterSection (T2)

## Image sources
All assets live in `apps/web/public/figma/node-1-7667/` (downloaded). Reference via `/figma/node-1-7667/<file>` in JSX.

## Prop renames (decomp → existing component)
- CourseHero: `body` → `subtitle`, `chips` → `meta`
- Overview / Highlights / Curriculum / Instructors / FAQ / PopularCourses: `title` → `heading`
- PopularCourses course: `duration/mode/language` → `meta: [{icon,label}]`, `instructorInitials/instructorName` → `instructor: {initials,name}`
- FooterCtaBanner: `headline` → `heading`

## Tokens
No new tokens needed — all referenced colors/spacing/typography already in `apps/web/src/app/globals.css`.

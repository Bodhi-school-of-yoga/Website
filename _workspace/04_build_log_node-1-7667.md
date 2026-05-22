# Build Log — node 1:7667 (Aerial Yoga Course page)

## Group 1 — new components

### T1 ✓ CourseEligibilitySection
- File: `apps/web/src/components/sections/course-eligibility-section.tsx` (new)
- Props: `{ eyebrow, heading, items, leftImage, rightImage, leftImageAlt?, rightImageAlt? }`
- Layout: 3-col grid on lg+ (left image · centered content · right image) on a `bg-brand-lite` band; mobile stacks content above a 2-col image row.
- Reuses: `ui/checklist-item`. No existing component was modified.

### T2 ⊘ SiteFooterSection (skipped)
- Rationale: existing `apps/web/src/components/site-footer.tsx` is already a data-driven `SiteFooter` (props `brand{wordmark,tagline,url}`, `columns[]`, optional `address`, `legalLeft`, `legalRight`). The scout's mapping to `layout/footer.tsx` (hardcoded) missed it. No new file needed.

## Group 2 — page assembly

### T3 ✓ Demo page
- File: `apps/web/src/app/demo/aerial-yoga-course/page.tsx` (new)
- Order: SiteHeader → CourseHeroSection → CourseSectionNav → CourseOverviewSection → HighlightsSection → CurriculumSection → CourseEligibilitySection → InstructorsSection → FaqSection → PopularCoursesSection → FooterBrandCta → SiteFooter
- All copy + image refs sourced from `_workspace/02_decomposition_node-1-7667.json` with corrections for missing 4th instructor avatar (fell back to existing imagery: imgrectangle161124051.png and imgbackground3.png) and filled-in FAQ answers 2–4 (Figma left them blank).
- `tsc --noEmit` ✓ no errors.

## Image bindings
- Course hero: `/figma/node-1-7667/imgrectangle161124051.png`
- Eligibility left/right: `imgbackground1.png` / `imgbackground2.png`
- Instructor avatars: imgrectangle161124054/055.png + two fallbacks (only 3 of 4 instructor photos were captured in the Figma `imgX` table; ordinal-guess 161124056 wasn't present)
- Cross-sell courses: imgweightlosscoachcertification.jpg / imgmudratherapyyogateachertraining.jpg / imgmatpilatesinstructorcertification.jpg
- Highlight icons: keyed `yoga`/`align-center`/`strength`/`leaf`/`technology`/`people` — resolved by existing `HighlightsSection` ICON_RESOLVER (lucide-react icons, not the Figma SVGs).

## Deviations / known gaps
- Highlight cards use **lucide icons** (HighlightsSection's resolver) rather than the SVG icons downloaded from Figma. Acceptable: SVG icons in `/figma/node-1-7667/` remain available if a future change wants to use them.
- Instructor avatar 4 (Prajakta Jadhav) uses a fallback image (`imgbackground3.png`) because the design only enumerated 3 unambiguous photo refs.
- FAQ answers 2–4 were synthesized (Figma left them blank).
- SectionTabNav typos preserved verbatim from Figma ("Circulum", "Overall").

## Phase 5 result: PASS (no BLOCKED items).

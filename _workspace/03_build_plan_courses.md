# Build Plan — Yoga Teacher Training Courses (Figma 1:7667)

**Run ID:** `courses-1-7667`
**Total tasks:** 20
**Parallel groups:** 4 (G1: 9, G2: 8, G3: 2, G4: 1)
**Reuse-as-is (not tasks):** SiteHeader, SiteFooter (imported directly in the demo page)

## Ordering rationale

The plan walks from leaves to the root of the composition tree:

1. **G1 — Primitives & independent pieces (9 tasks, fully parallel).** All UI primitives (`CourseMetaChip`, `HighlightCard`, `SyllabusCard`, `ScrollNextButton`, `ChecklistItem`, `InstructorCard`, `FaqItem`), the additive `ProgramCard` extension (T8 — one optional `instructor` prop), and the standalone footer-region `NextStepsCtaGrid` (T9) all live here. None depend on each other.
2. **G2 — Sections that consume one G1 primitive each, plus sections with no primitive dep (8 tasks).** `CourseHeroSection` (needs T1), `HighlightsSection` (needs T2), `EligibilitySection` (needs T5), `FaqSection` (needs T7), `PopularCoursesSection` (needs T8), plus three sections with no new primitive — `CourseSectionNav`, `CourseOverviewSection`, `FooterBrandCta`.
3. **G3 — Sections sharing the `ScrollNextButton` (2 tasks).** `CurriculumSection` (T14, depends T3+T4) and `InstructorsSection` (T16, depends T4+T6). Both rely on the shared scroll-next button — that's why they trail G2 even though they're structurally similar.
4. **G4 — The demo page (1 task).** `apps/web/src/app/demo/courses/page.tsx` depends on every section task and composes the full route.

## Task table

| id  | file                                                                  | kind          | parallel_group | depends_on                                                         |
| --- | --------------------------------------------------------------------- | ------------- | -------------- | ------------------------------------------------------------------ |
| T1  | apps/web/src/components/ui/course-meta-chip.tsx                       | new-component | G1             | —                                                                  |
| T2  | apps/web/src/components/ui/highlight-card.tsx                         | new-component | G1             | —                                                                  |
| T3  | apps/web/src/components/ui/syllabus-card.tsx                          | new-component | G1             | —                                                                  |
| T4  | apps/web/src/components/ui/scroll-next-button.tsx                     | new-component | G1             | —                                                                  |
| T5  | apps/web/src/components/ui/checklist-item.tsx                         | new-component | G1             | —                                                                  |
| T6  | apps/web/src/components/ui/instructor-card.tsx                        | new-component | G1             | —                                                                  |
| T7  | apps/web/src/components/ui/faq-item.tsx                               | new-component | G1             | —                                                                  |
| T8  | apps/web/src/components/ui/program-card.tsx                           | extend        | G1             | —                                                                  |
| T9  | apps/web/src/components/sections/next-steps-cta-grid.tsx              | new-component | G1             | —                                                                  |
| T10 | apps/web/src/components/sections/course-hero-section.tsx              | new-section   | G2             | T1                                                                 |
| T11 | apps/web/src/components/sections/course-section-nav.tsx               | new-section   | G2             | —                                                                  |
| T12 | apps/web/src/components/sections/course-overview-section.tsx          | new-section   | G2             | —                                                                  |
| T13 | apps/web/src/components/sections/highlights-section.tsx               | new-section   | G2             | T2                                                                 |
| T14 | apps/web/src/components/sections/curriculum-section.tsx               | new-section   | G3             | T3, T4                                                             |
| T15 | apps/web/src/components/sections/eligibility-section.tsx              | new-section   | G2             | T5                                                                 |
| T16 | apps/web/src/components/sections/instructors-section.tsx              | new-section   | G3             | T4, T6                                                             |
| T17 | apps/web/src/components/sections/faq-section.tsx                      | new-section   | G2             | T7                                                                 |
| T18 | apps/web/src/components/sections/popular-courses-section.tsx          | new-section   | G2             | T8                                                                 |
| T19 | apps/web/src/components/sections/footer-brand-cta.tsx                 | new-section   | G2             | —                                                                  |
| T20 | apps/web/src/app/demo/courses/page.tsx                                | new-section   | G4             | T9, T10, T11, T12, T13, T14, T15, T16, T17, T18, T19               |

## Tradeoffs

- **Extending `ProgramCard` (T8) over duplicating** — popular-courses needs an instructor avatar+name slot that the current `ProgramCard` doesn't have. The scout already flagged this as a safe additive change. One optional prop (`instructor?: { name; avatar?; initials? }`) costs ~10 LOC and preserves the existing homepage `ProgramCard` call site untouched. The alternative — a parallel `PopularCourseCard` — would duplicate the entire image-meta-footer structure and create drift risk.
- **`ScrollNextButton` (T4) as a shared primitive** — Figma assets `imgGroup1171281795` appear in both curriculum (1:8070) and instructors (1:7817). Builders should import once from `ui/scroll-next-button.tsx`; this forces G3 to wait on G1 but saves a duplicate primitive.
- **`FaqItem` (T7) built from scratch** — the decomposer optimistically tagged it `existing-primitive`, but the scout verified no Accordion/Disclosure/Collapsible component lives in `apps/web/src/components/ui/`. Building a minimal native disclosure (controlled `useState`, `aria-expanded`, +/− toggle) is cheaper than pulling in a Radix dep mid-stream.
- **Single demo page (T20) vs per-section demos** — per the user's "fetch one by one" pacing, the demo is one route `/demo/courses` that composes the whole page. Visual-qa will screenshot the assembled page once.
- **`SiteHeader`/`SiteFooter` reuse-as-is** — both already exist at `components/site-header.tsx` and `components/site-footer.tsx` with matching prop shapes. Critically: the scout warned about stale duplicates at `components/layout/header.tsx` and `components/layout/footer.tsx`. The demo page (T20) acceptance explicitly pins imports to the root-level files.
- **No `Card.tsx` mutation for `HighlightCard` / `SyllabusCard`** — both compose the existing Card primitive rather than adding a new variant, keeping Card.tsx stable.
- **Section-nav typo** — Figma reads "Circulum"; default content in T11 corrects to "Curriculum". Behavior is in the task acceptance, not silent in the code.

## Concerns / flags carried forward

- Eligibility checklist has 6 entries in Figma but only 3 unique labels — T15 acceptance says the section passes de-duplicated `items` to T5's `ChecklistItem`.
- "Meet Your Instructor's" apostrophe is preserved per Figma (flagged as editorial in T16).
- FAQ items 2–4 have empty answers in Figma; T7 acceptance covers the empty-answer collapsed render.
- All section/page tasks include the "no horizontal scroll at 1920 / 1280 / 768 / 375" check. Horizontally-scrolling card strips (curriculum, instructors) are explicitly scoped to inner scroll only; the page never scrolls horizontally.

## What's deliberately NOT in this plan

- No tasks for SiteHeader or SiteFooter (reuse-as-is — imported in T20).
- No new Card variant.
- No per-section demo routes.
- No copy rewriting — content is pulled from `02_decomposition_courses.json`.

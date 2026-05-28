# 03 — Build Plan: Yoga Course Details (Online 300 Hour YTT)

**Strategy:** minimal-diff
**Existing page:** `/Users/anukul/Desktop/bodhi/apps/web/src/app/yoga-courses/online-300-hour-ytt/page.tsx`
**Motion library:** framer-motion (already in use across every section)
**Demo page:** intentionally skipped — visual-qa screenshots the live page route, not a `/demo/*` clone.

## Why this plan is tiny

The scout found 24 reuse-as-is matches against an almost-complete production page. A literal diff vs the Figma decomposition leaves only **two real gaps**:

1. **Testimonials section is missing entirely** from the page. Plus, `TestimonialsSection` ships a uniform 3-col grid; Figma wants a mosaic (1 large + 4 small).
2. **CourseHero "Available in 4 Centers · Check availability →" strip** is in Figma but `CourseHeroSection` has no prop for it.

Everything else either (a) already renders correctly with current content, or (b) is a low-value Figma quirk (typo "Circulum", duplicated pre-req rows, blank FAQ answers) that the existing page already handles better than Figma.

## Task ordering

```
G1 (parallel)      G2                     G3
─────────────────  ─────────────────────  ──────────────
T1 testimonials  ─┐
                  ├─► T3 wire into page ─► T4 QA
T2 hero strip   ─┘
```

- **G1 (parallel):** T1 + T2 touch independent files. Component-builder can fan out.
- **G2:** T3 edits the page. Depends on both extensions landing.
- **G3:** T4 verifies live route + tsc/build clean.

## Tasks at a glance

| ID | Kind | File | Depends | Group |
|----|------|------|---------|-------|
| T1 | extend-component | `components/sections/testimonials-section.tsx` | — | 1 |
| T2 | extend-component | `components/sections/course-hero-section.tsx` | — | 1 |
| T3 | modify-page | `app/yoga-courses/online-300-hour-ytt/page.tsx` | T1, T2 | 2 |
| T4 | qa | (verification only) | T3 | 3 |

## Shared-component guardrails

Both T1 and T2 modify components consumed by other pages. Per the project guardrail (`feedback_scope_shared_components.md`):

- **Every new prop is optional with a default that preserves current behaviour.**
- **Acceptance criteria explicitly require existing consumers to render byte-identically when the new prop is omitted.**
- No new variants on `TestimonialCard` itself — only the section wrapper gains `layout` + the per-item `size`.
- No edits to `ClosingCtaSection`, `SiteFooterBlock`, `SiteHeader`, `ProgramCard`, `ChecklistItem`, `HighlightCard`, or any ui/* primitive.

## Tradeoffs

- **Mosaic via section, not card:** Adding `layout='mosaic'` to `TestimonialsSection` (and `size?` to each item) keeps `TestimonialCard` untouched. The alternative — a `size: 'lg' | 'sm'` variant on the card with internal padding/quote-size logic — would couple visual size to data and bloat the card's API. The wrapper-only approach is additive and isolated.
- **Skipping `/demo/*`:** Per orchestrator instruction. The live route at `/yoga-courses/online-300-hour-ytt` already renders 13 of 15 sections. Creating a demo page would duplicate ~300 lines of content for no extra signal.
- **Leaving CourseSectionNav untouched:** Figma shows 5 tabs ending in "Overall" — current page wires "Overall" → `#instructors` (close enough). Adding a 6th "Testimonials" tab is a UX call, not a Figma-fidelity call. Flagged as open question, no-op for now.
- **Breadcrumb fix is optional:** Figma's 3rd crumb (current page name) is missing in current code. Recommended switch to `BreadcrumbItem[]` form, but not blocking.

## Open questions

1. Testimonials eyebrow copy: Figma says "Your Guide" (looks like a copy-paste from Instructors). Ship literal Figma value OR override to "Testimonials"?
2. "Check availability" link target: `/centers`, or an in-page anchor on the same page?
3. Should `CourseSectionNav` gain a 6th "Testimonials" tab?

All three are non-blocking. Plan ships sensible defaults and surfaces the choices.

## Expected total elapsed (rough)

- T1 + T2 in parallel (G1): ~8–12 min wall-time each (extension with motion + token plumbing + visual check on consumers).
- T3 (G2): ~4–6 min (props + new section + content array).
- T4 (G3): ~5–8 min (run server, check live, run `tsc` + build).
- **Total wall-time: ~20–30 min** assuming the builder can fan out T1/T2.

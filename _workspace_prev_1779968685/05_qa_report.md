# Visual QA Report — Online 300 Hour YTT page

- Page: http://localhost:3000/yoga-courses/online-300-hour-ytt
- Figma reference: `_workspace/01_figma_screenshot.png` (node 805:10091)
- Screenshot method: code + DOM audit (chrome MCP tools not loaded in this session; no headless browser available locally — section IDs and key strings verified against the live HTTP 200 HTML)

## Verdict: pass-with-minor

All four acceptance criteria from build-plan task T3 are met. Remaining findings are either explicitly out-of-scope per the build plan (don't modify shared TestimonialCard) or pre-existing tech debt not introduced this round.

## Checks

| ID | Check | Result |
|----|-------|--------|
| C1 | Hero 3-crumb breadcrumb (Home / Yoga courses / Online 300 Hour Yoga Teacher Training) | pass |
| C2 | "Available in 4 Centers · Check availability →" strip between subtitle and CTA | pass |
| C3 | Testimonials section sits between Certification and Pre-Requisites | pass |
| C4 | Mosaic layout: 1 lg + 4 sm cards at lg+ breakpoint | pass |
| C5 | All existing sections still render in order (no regressions) | pass |
| C6 | Sticky CourseSectionNav with IntersectionObserver scrollspy | pass |
| C7 | Console errors | not-checked (no MCP / headless tool available) |
| C8 | Token discipline (no new hex / clamp) | pass (with inherited debt note) |
| C9 | Check-availability link → next/link href="/centers" | pass |
| C10 | Motion declarations match spec | pass |

DOM section order verified by grepping the rendered HTML:

```
overview → highlights → curriculum → eligibility → certification
        → testimonials → pre-requisites → instructors → faq → more-courses
```

## Findings

### Minor

1. **Testimonials mosaic — featured card visual treatment.** Figma shows the tall (lg) card with a dark brand-green background and inverted text — a clearly featured slot. Our render uses the same neutral `bg-card` for all five cards; only the grid footprint differs (row-span-2). This is the agreed minimum-diff outcome because the build plan explicitly forbids modifying `TestimonialCard`. Fix path (follow-up): add additive `variant: 'featured' | 'default'` prop to `TestimonialCard`.

2. **Pre-existing arbitrary hex** at `testimonials-section.tsx:106` — `bg-[#FCFCFC]`. Predates this round (lives in the default-grid wrapper, not the new mosaic branch). Recommend `bg-surface-1` in a cleanup pass.

### Cosmetic

3. **Stagger drift** — testimonials row stagger is 0.10s; interaction spec defines `stagger-children-slow` at 0.12s. Build plan explicitly flagged this as "NOT required" tolerance.
4. **`shadow-` dangling class** at `course-section-nav.tsx:70` — invalid Tailwind, renders nothing. Pre-existing.
5. **Indentation drift** in `course-hero-section.tsx` around the Image `height`/`width` attrs. No visual impact. Pre-existing.

## What was NOT checked

- Browser console errors (no chrome MCP or local headless browser).
- Exact pixel-diff vs Figma at 1920 viewport (same reason).
- Reduced-motion live behavior (code path verified — both `availability` strip and existing hero motion zero-duration when `useReducedMotion()` returns true).

## Recommendation

Ship as-is. Optional follow-ups (separate task):

- Add `variant: 'featured'` to `TestimonialCard` to match Figma's dark-green tall card.
- Cleanup pass: replace `bg-[#FCFCFC]` with `bg-surface-1`; remove orphan `shadow-` class.

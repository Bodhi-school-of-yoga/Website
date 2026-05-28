# Yoga Course Details — Interaction Spec

**Target:** `805:10091` (Online 300 Hour Yoga Teacher Training — RYT 300)
**Library:** `framer-motion` (entrances, stagger, scroll-reveal, accordion expand) + Tailwind (hover/press)
**Tone:** Subtle, premium, restrained — yoga calm. 300–500ms ease-out, 8–16px translates, no spring bounces.
**Accessibility:** All entrances honor `prefers-reduced-motion` via `<MotionConfig reducedMotion="user">`. Tailwind uses `motion-reduce:` variants.

## Motion primitives

| Name | Description |
|---|---|
| `fade-in-up` | opacity 0→1, y 12→0, 500ms ease-out |
| `fade-in-up-sm` | y 8→0, 400ms ease-out (lighter elements) |
| `fade-in` | opacity 0→1, 400ms |
| `scale-in` | scale 0.97→1 + fade, 450ms |
| `slide-in-left` / `slide-in-right` | x ±16→0 + fade, 500ms (two-col reveals) |
| `stagger-children` | 80ms between children, 100ms delay |
| `stagger-children-slow` | 120ms between children, 150ms delay |
| `accordion-expand` | height 0→auto + fade, 350ms cubic-bezier |

## Tailwind primitives

`hover-lift`, `hover-lift-shadow`, `hover-underline`, `hover-tint`, `hover-bg-tint`, `press-scale`, `cta-glow`, `arrow-nudge`, `icon-rotate-180`, `tab-active-underline` — all with `motion-reduce:` fallbacks.

## Section-by-section

### 1. SiteHeader (existing)
Reuse — interactions owned by existing component.

### 2. CourseHero (mount entrance)
- Image fades in (0ms)
- Breadcrumb fade-up (50ms) → Title (150ms) → Subtitle (250ms) → MetaChips staggered (350ms) → Availability strip (500ms) → CTA (600ms)
- CTA: `cta-glow` (lift + shadow + press scale)
- Breadcrumb links + Check-availability link: `hover-underline`
- Actions: Home → `/`, Yoga courses → `/courses`, CTA → scroll-to `#reserve` (or open modal), Check availability → `/centers`

### 3. SectionTabs (sticky, scrollspy)
- Sticky once scrolled past hero (`position: sticky; top: var(--header-height)`)
- Active tab indicator uses framer-motion `layoutId` for smooth slide between tabs
- Active state driven by IntersectionObserver scrollspy (rootMargin `-30% 0px -60% 0px`)
- Tab click → smooth `scrollIntoView` with `scroll-margin-top` equal to sticky height
- Tabs map to anchors: overview, highlights, curriculum, pre-requisites, closing-cta (overall — flagged unresolved)

### 4. Overview (scroll-reveal)
Heading fade-up; paragraphs fade-up staggered 80ms.

### 5. Highlights (scroll-reveal + hover)
Heading fade-up; 6-card grid staggered (80ms). Each `FeatureCard` has `hover-lift` (Tailwind, decorative). Cards are non-clickable.

### 6. Curriculum (scroll-reveal + carousel)
- Heading fade-up; row of 5 syllabus cards staggered
- Horizontal scroll with CSS scroll-snap (`snap-x snap-mandatory`)
- Right arrow (Figma) + auto-added left arrow for parity
- Arrows disable at scroll ends; `press-scale` on click
- Cards: `hover-lift`. Keyboard ArrowLeft/Right when focus inside row

### 7. IsThisForYou (two-col reveal)
Left content `slide-in-left`; checklist items fade-up staggered; right image `slide-in-right`. Emphasises the two-column composition.

### 8. Certification (scale-in band)
Heading fade-up; dark contrast band uses `scale-in` (0.97→1) — feels like a sealed stamp arriving.

### 9. Testimonials (slow stagger + hover)
Cards stagger in 120ms each for graceful unveiling of the masonry layout. `hover-lift` on each card. Cards are decorative (no nav).

### 10. PreRequisites (centered stagger)
Heading fade-up; centered checklist items stagger fade-up.

### 11. Instructors (row hover + nav)
Row of 4 cards stagger in. Each card `hover-lift`; avatar image scales 1.05 inside its rounded mask on hover. Click → `/instructors/[slug]` (unresolved — confirm bio pages exist).

### 12. FAQ (accordion + reveal)
Accordion items fade-up staggered. Single-open behaviour, first item open by default. Expand uses framer-motion `accordion-expand` (height 0→auto + fade). Chevron icon rotates 180° on open via `data-[state=open]`. Reuse existing Accordion primitive if available.

### 13. MoreCourses (3-up grid)
Heading + subtitle fade-up; 3 cards stagger in. `hover-lift-shadow` on card; image scales 1.05 inside mask via `group-hover`; arrow on "View Program" nudges right via `group-hover:translate-x-0.5`. Click → `/courses/[slug]` (unresolved).

### 14. ClosingCtaSection (existing)
Reuse — do not redesign.

### 15. SiteFooter (existing)
Reuse — do not redesign.

## Page-level flows

### "Reserve Your Spot Now" CTA
- **Primary:** Smooth-scroll to `#reserve` anchor if a reservation section is added to the page.
- **Fallback (recommended):** Open Reserve modal (Dialog) with fields name/email/phone/preferred-center/start-date. Body-scroll-lock + focus-trap + ESC close. Backdrop fade 200ms; panel scale-in + fade 300ms.
- State lifted to page (`reserveOpen`). Flagged unresolved — confirm with product.

### Sticky tabs offset
All anchor sections use `scroll-mt-32` (or `--sticky-offset` CSS var) so titles aren't obscured by sticky tabs + site header.

### Scrollspy
IntersectionObserver per section (`rootMargin: '-30% 0px -60% 0px'`). Disable for ~600ms after a manual tab click to prevent flicker during smooth-scroll.

### Reduced motion
`<MotionConfig reducedMotion="user">` at page root. Tailwind `motion-reduce:` variants inlined throughout.

## Unresolved

| Component | Target | Reason |
|---|---|---|
| CourseHero | cta | Reserve destination unclear — modal vs anchor |
| CourseHero | availability-check-link | Destination guessed `/centers` |
| SectionTabs | tab[overall] | No matching section — guessed closing-cta |
| Instructors | instructor-card | href guessed `/instructors/[slug]` |
| MoreCourses | course-card | href guessed `/courses/[slug]` |
| FAQ | accordion-item | 3 of 4 answers empty in Figma |

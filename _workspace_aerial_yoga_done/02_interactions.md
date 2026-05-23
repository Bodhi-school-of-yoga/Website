# Interaction Spec — Aerial Yoga Course page

**Target:** mobile `218:30509` + desktop `1:7667`
**Route:** `/courses/aerial-yoga`
**Revision:** 3
**Motion library:** `framer-motion` (^12.39.0, already installed) for entrance reveals + accordion height; **Tailwind** for hover/press/underline/chevron-rotate.

## Tone
Calm, yoga-like, subtle. Default entrance = fade-up 12px, 400ms easeOut. Hero animates on mount; everything else uses `whileInView` with `once: true` so users see each section come in once.

## Motion primitives
| Name | Via | Use |
|---|---|---|
| `fade-in-up` | framer-motion | Headings, body, cards (entrance) |
| `fade-in` | framer-motion | Hero photo, decorative images |
| `scale-in` | framer-motion | Avatars / meta cards (entrance) |
| `stagger-children` | framer-motion | Grid containers — children use fade-in-up |
| `accordion-expand` | framer-motion | FAQ height auto + opacity |
| `hover-lift-card` | tailwind | Card hover (-translate-y-1, shadow-lg) |
| `hover-lift-card-subtle` | tailwind | Meta cards, instructor rows (-translate-y-0.5) |
| `hover-zoom-image` | tailwind | Course/instructor portrait inside `group` |
| `hover-underline` | tailwind | Inline link / View Program / footer links |
| `hover-brand-deepen` | tailwind | Brand pills on hover |
| `press-scale` | tailwind | All clickable surfaces, active state |
| `pill-press` | tailwind | Primary CTA pills |
| `chevron-rotate` | tailwind | FAQ chevron, 180deg on open |
| `tab-pill-active` | tailwind | Active tab background transition |

---

## Per-component

### SiteHeader (reuse)
Existing component handles its own hover + drawer. Pass `ctaLabel="Enquire Now"`, `ctaHref="/enquire"`.

### CourseHero
- **Motion (mount):** breadcrumb → title-line-1 → title-line-2 → body → meta-row (stagger) → cta — each `fade-in-up` with 100ms increasing delays. Hero photo `fade-in` (slightly slower, 0.6s).
- **Actions:**
  - Breadcrumb 'Home' → `/`
  - Breadcrumb 'Yoga courses' → `/courses`
  - CTA 'Reserve Your Spot Now' → `/enquire?course=aerial-yoga`
- **No parallax.** Above-the-fold → no scroll reveal.

### MetaCard
- Hover-lift-subtle (desktop card variant only). Static on mobile pill variant.
- No click action — decorative.

### CourseTabs
- **Behaviour:**
  - Anchor-scrolls to `#overview` / `#highlights` / `#curriculum` / `#eligibility` / `#faq` (with `scroll-mt-20 lg:scroll-mt-24` on each target).
  - `lg:sticky lg:top-0 z-30` — sticky on desktop, static on mobile.
  - `IntersectionObserver` watches each anchored section (rootMargin `-40% 0px -55% 0px`) and sets `activeTab` as user scrolls.
- **Motion:** active tab pill uses `tab-pill-active` color transition + `press-scale` on click.
- **Unresolved:** the 'Overall' tab has no obvious anchor; defaulting to `#faq`.

### SectionHeader (shared primitive)
- Eyebrow + title fade-in-up on scroll-into-view (`once: true, amount: 0.3`).

### CourseOverview
- Header + 2 body paragraphs stagger in on view. Anchor: `#overview`.

### GainGrid + GainCard
- Header in, then 6 cards stagger-in (each fade-in-up).
- Card hover: `hover-lift-card`. No click action — purely informational.
- Anchor: `#highlights`.

### SyllabusGrid + SyllabusCard
- Same pattern as Gain. Anchor: `#curriculum`.

### PreRequisites + CheckRow
- Header + checklist (staggered) + 2 desktop-only decorative images (`fade-in`, no upward translate so the -6.81deg rotation doesn't fight motion).
- Anchor: `#eligibility`.

### InstructorsBand + InstructorRow
- Header + 4 instructor rows stagger in.
- Row: `hover-lift-card-subtle` on root; avatar inside `group` uses `hover-zoom-image`.
- **Click → `/trainers/[slug]`** (unresolved — confirm trainer detail routes).

### FAQAccordion + AccordionItem
- Section enters on scroll; items stagger.
- Item expand/collapse via `accordion-expand` (framer + AnimatePresence) OR Radix shadcn Accordion's built-in CSS transitions — pick one, don't double-animate.
- Chevron uses `chevron-rotate` (180deg on open).
- Trigger uses `press-scale`. First item `defaultOpen: true`.
- Anchor: `#faq`.

### RelatedCoursesGrid + RelatedCourseCard
- Header + subtitle + 3 cards stagger in.
- Card: `hover-lift-card` on root; image `hover-zoom-image` (wrap card in `group`, image in `overflow-hidden`).
- 'View Program' link: `hover-underline`.
- **Click → course's `href` prop** (`/courses/weight-loss-coach`, etc — unresolved).
- Prefer wrapping the whole card in a single `<Link>` so the inner CTA is visual-only.

### ClosingCTABand
- Wordmark → title → body → CTA, each fade-in-up on scroll-into-view, 150ms increments.
- CTA: `pill-press` (mint pill on dark bg; skip color shift to keep the mint accent intact).
- Click → `/try` (unresolved).

### CtaCardsRow + CtaCard
- Cards stagger in on view.
- Each card: `hover-lift-card` + CTA `pill-press`.
- Clicks:
  - 'Free Trial Session' → `/free-trial`
  - 'Speak to us' → `/contact`
  - 'Take a Guided Path' → `/assessment`
- All three unresolved — confirm routes.

### SiteFooter (reuse)
- Hover-underline on links if existing footer doesn't already style them.

---

## Global

- **Smooth anchor scroll:** add `scroll-smooth` class to `<html>` root, or use `element.scrollIntoView({behavior:'smooth', block:'start'})` in click handler.
- **scroll-margin-top:** every anchored section gets `scroll-mt-20 lg:scroll-mt-24` so the sticky tab bar doesn't cover the heading.
- **Reduced motion:** wrap framer-motion usages with `useReducedMotion()` and skip transitions when true. Tailwind transitions auto-respect `@media (prefers-reduced-motion: reduce)`.
- **Active-tab observer:** IntersectionObserver watches each anchored section with rootMargin `-40% 0px -55% 0px`; sets `activeTab` to the id of the section crossing the viewport middle.

---

## Unresolved
1. **CourseTabs › 'Overall' tab** — no obvious anchor target. Defaulting to `#faq`. Confirm intent.
2. **CourseTabs › sticky behavior on desktop** — Figma has no explicit sticky reaction; defaulting to `lg:sticky lg:top-0`. Visual-QA to confirm.
3. **InstructorRow › click target** — `/trainers/[slug]` may not exist yet.
4. **RelatedCourseCard › click target** — `/courses/{weight-loss-coach,mudra-therapy,mat-pilates}` may not exist yet.
5. **ClosingCTABand › CTA** — `/try` route may not exist yet.
6. **CtaCard › all three CTAs** — `/free-trial`, `/contact`, `/assessment` may not exist yet.
7. **CourseHero › CTA on desktop** — decomposition flags this may be hidden at lg; ensure motion respects the breakpoint toggle.
8. **FAQAccordion › expand animation source** — pick either Radix shadcn (CSS) or framer-motion (AnimatePresence). Don't double-animate.

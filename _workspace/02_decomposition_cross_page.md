# Cross-Page Section Decomposition — Bodhi-landing-page-web-handoff

Covers four Figma frames that share the 1920px design system:

| Node | Page | Role |
|---|---|---|
| 1:1547 | Online Courses | Yoga TTC umbrella landing (rich) |
| 1:4756 | Offline Courses | Full landing composition (rich, superset) |
| 1:7174 | Tips to become a successful yoga teacher | Article-listing index (lean) |
| 1:2343 | Online Advanced Certifications | Course-listing index (lean) |

Token source-of-truth: `apps/web/src/app/globals.css`. All components MUST map onto `text-h1..h5`, `text-mini`, `text-text-primary/brand/tertiary`, `bg-surface-*`, `bg-brand-*`, `border-border-*`.

---

## Page layouts (top-to-bottom)

### 1:1547 — Online Courses (`/online-courses`)

1. SiteHeader (shared)
2. OnlineCoursesHero — eyebrow "Yoga Teacher Training" + H2 "Yoga Teacher Training Courses" + subtitle, over `image 25`
3. FilterChipBar — 3 pill tab indicators (likely All / Online / Offline)
4. ProgramCard 3-col grid — 6 cards (Pranayama, 300-hr TTC, Face Yoga, Weight Loss, Bala, Mat Pilates)
5. AccreditationsSection — "Recognizing the Global Impact of Yoga" + 8 logos
6. WhyBodhiSection — 5 pillars on women-centred yoga
7. GuidedPathSection — "Take a Guided Path" counsellor/assessment block
8. TestimonialsSection — Aanya / Lena / Ravi
9. SiteFooter (shared)

### 1:4756 — Offline Courses (`/offline-courses`)

1. SiteHeader (shared)
2. OfflineCoursesHero — H1 "Become The Teacher You Were Meant To Be" + image background
3. ProgramsIntroSection — featured TTCs (Bala, Face Yoga, Mudra Therapy, MAT Pilates, Weight Loss) with online/offline mix
4. PopularCoursesSection — "Top Popular Yoga Course" 6-card grid
5. PopularCoursesSubGrid — second row of online-only popular courses (likely collapse into 4)
6. AccreditationsSection (shared with 1:1547)
7. WhyBodhiSection (shared)
8. GuidedPathSection (shared)
9. TestimonialsSection (shared)
10. SiteFooter (shared)

### 1:7174 — Tips to become a successful yoga teacher (`/tips-to-become-a-successful-yoga-teacher`)

1. SiteHeader (shared)
2. ListingHero — dark-overlay hero, eyebrow "23 courses", H1 "Tips to become a **successful yoga teacher**" (mint accent on tail), subtitle
3. ArticleCard 3×3 grid — 9 cards (last 3 are placeholder duplicates)
4. SiteFooter (shared)

Note: source file spells "successfull" (typo) — render "successful" in code.

### 1:2343 — Online Advanced Certifications (`/online-advanced-certifications`)

1. SiteHeader (shared)
2. ListingHero — breadcrumb "Home / Advanced Certifications / Online" + H1 "Online Advanced Certifications" + subtitle + result count "23 courses"
3. ProgramCard 3×3 grid — 9 cards (last 3 duplicates; same titles as 1:1547)
4. SiteFooter (assumed; not in frame)

---

## Shared across pages

| Component | Pages | Reuse confidence | Type | Notes |
|---|---|---|---|---|
| SiteHeader | 1547, 4756, 7174, 2343 | high | new-section | Byte-identical 1416×56 nav |
| SiteFooter | 1547, 4756, 7174, 2343 | high | new-section | "Begin where you are." CTA + 4-col grid + legal |
| ProgramCard | 1547, 4756, 2343 | high | existing-primitive | `apps/web/src/components/ui/program-card.tsx` — needs floating mode badge extension |
| ListingHero | 7174, 2343 | high | new-section | Image + dark overlay; variant props for breadcrumb vs eyebrow |
| TestimonialsSection | 1547, 4756 | high | existing-primitive | `sections/testimonials-section.tsx` |
| WhyBodhiSection | 1547, 4756 | high | existing-primitive | `sections/why-bodhi-section.tsx` |
| AccreditationsSection | 1547, 4756 | high | existing-primitive | `sections/accreditations-section.tsx` |
| PopularCoursesSection | 1547, 4756 | high | existing-primitive | `sections/popular-courses-section.tsx` |
| GuidedPathSection | 1547, 4756 | medium | new-section | "Take a Guided Path" — likely needs new build |
| ArticleCard | 7174 | medium | new-component | Could collapse into `ProgramCard variant="article"` |

## Per-page unique sections

- **1:1547** — `OnlineCoursesHero`, `FilterChipBar`
- **1:4756** — `OfflineCoursesHero`, `ProgramsIntroSection`, `PopularCoursesSubGrid`
- **1:7174** — none (entirely composed of shared)
- **1:2343** — none (entirely composed of shared)

The two listing pages confirm the thesis: a lean variant is `SiteHeader + ListingHero + Grid + SiteFooter`. The rich variants add hero-with-eyebrow + accreditations + Why Bodhi + guided path + testimonials.

## Reuse strategy

- **Heroes:** `OnlineCoursesHero` and `OfflineCoursesHero` differ only in copy. Consider a single `MarketingHero` with variant prop (eyebrow, headline, subtitle, backgroundImage). Keep `ListingHero` separate because it has dark overlay + accent-span / breadcrumb behaviors that the marketing hero doesn't.
- **Cards:** Merge `ArticleCard` into `ProgramCard` via `variant="article" | "course"` prop. Article variant drops meta row + CTA link.
- **Hero typography:** Marketing hero uses Fraunces-led typography. Listing hero uses Host Grotesk Bold 60px (maps to `text-h1`). Validate against globals.css scale.

## Responsive concerns (designs at 1920px)

- Content gutter is 224px each side → content max-width 1472px. Use `max-w-[1472px] mx-auto` or `max-w-7xl` (1280) container with px-6.
- ProgramCard / ArticleCard 3-col → 2-col @ md → 1-col @ sm.
- `ListingHero` H1 60px on desktop → maps to `text-h1` (already clamp-based). Accent-span color stays mint `#3fffd5` (could be brand token).
- SiteHeader nav collapses to hamburger sheet under md (use existing `ui/sheet.tsx`).
- SiteFooter 4-col grid → 2-col @ md → 1-col @ sm.
- Hero background images are 2519×872 — serve via `next/image` with responsive sizes + art-direction for mobile crop.
- Filter chip bar should be horizontally scrollable on mobile.

## Uncertain — to verify with codebase-scout / design

1. **Footer in 1:2343** — not present in frame. Assumed inherited via layout; confirm.
2. **FilterChipBar labels** — 3 indicator pills with no text in metadata. Inferred "All / Online / Offline" — needs design confirmation.
3. **`online` floating badge** — only on 4 of 9 cards in 1:2343 metadata. Treat as always-render card-level prop driven by `mode`.
4. **ArticleCard vs ProgramCard merge** — decide on `variant` prop vs separate components after seeing both render.
5. **PopularCoursesSubGrid in 1:4756** — may just be a continuation of PopularCoursesSection grid. Inspect on build.

## Existing-code reuse handoff for codebase-scout

These sections already exist in `apps/web/src/components/sections/` and `ui/` — verify parity, NOT rebuild:

- `ui/program-card.tsx` → ProgramCard (extension: mode badge)
- `ui/testimonial-card.tsx` → TestimonialCard
- `ui/faq-item.tsx` → FaqItem
- `ui/highlight-card.tsx` → HighlightCard
- `ui/instructor-card.tsx` → InstructorCard
- `ui/badge.tsx`, `ui/button.tsx`, `ui/card.tsx`, `ui/navigation-menu.tsx`
- `sections/testimonials-section.tsx`, `sections/why-bodhi-section.tsx`, `sections/accreditations-section.tsx`, `sections/popular-courses-section.tsx`

To build new:

- `SiteHeader` (full nav with dropdowns; existing `navigation-menu.tsx` provides the primitive)
- `SiteFooter` (extend `footer-brand-cta.tsx` with 4-col link grid + legal bar)
- `OnlineCoursesHero` / `OfflineCoursesHero` (or a single `MarketingHero` with variant prop)
- `ListingHero` (image + dark overlay + breadcrumb/eyebrow + accent-span + result count)
- `FilterChipBar` (tab pill indicator)
- `ProgramsIntroSection` (featured-TTC carousel for 1:4756)
- `GuidedPathSection` (Take a Guided Path counsellor/assessment block — confirm if exists)

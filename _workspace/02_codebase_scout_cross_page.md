# Cross-Page Codebase Scout Report

Scope: Reuse manifest for proposed components in Figma frames **1:1547** (Online Courses), **1:4756** (Offline Courses), **1:7174** (Tips article-listing), **1:2343** (Online Advanced Certifications).

Token source-of-truth: `apps/web/src/app/globals.css`.
Page-shell convention: `apps/web/src/app/<slug>/page.tsx` mounts `<SiteHeader /> + <main>...</main> + <SiteFooter ... />` directly (see `app/page.tsx`, `app/about/page.tsx`). NOT injected via `layout.tsx`. Follow same pattern for the four new pages.

---

## Summary

| Type | Count | Components |
|---|---|---|
| reuse-as-is | 9 | SiteHeader, SiteFooter, TestimonialsSection, WhyBodhiSection, AccreditationsSection, PopularCoursesSection, PopularCoursesSubGrid, GuidedPathSection (=ClosingCtaSection), OfflineCoursesHero (=new MarketingHero) |
| extend | 3 | ProgramCard, ArticleCard (collapses into ProgramCard variant), ProgramsIntroSection (extract from ProgramsGridSection) |
| new | 3 | MarketingHero, ListingHero, FilterChipBar |

Net new files to create: **3 components** + the four `app/<slug>/page.tsx` shells.

---

## Table A — reuse-as-is (no work)

| Proposed component | Existing file | Existing export | Notes |
|---|---|---|---|
| SiteHeader | `apps/web/src/components/site-header.tsx` | `SiteHeader` | Fixed top nav, 6 nav links match Figma, mint-pill CTA, mobile hamburger sheet. Already on `/`, `/about`. |
| SiteFooter | `apps/web/src/components/site-footer.tsx` | `SiteFooter` | 4-col grid + legal bar on `bg-brand-dark`. Already on `/`, `/about`. NOT to be confused with `sections/footer-brand-cta.tsx` (different component). |
| TestimonialsSection | `apps/web/src/components/sections/testimonials-section.tsx` | `TestimonialsSection` | Pass heading='What our clients say' + items[]. |
| WhyBodhiSection | `apps/web/src/components/sections/why-bodhi-section.tsx` | `WhyBodhiSection` | Defaults already match Figma copy verbatim. |
| AccreditationsSection | `apps/web/src/components/sections/accreditations-section.tsx` | `AccreditationsSection` | Pass heading + items[] (8 logos). |
| PopularCoursesSection | `apps/web/src/components/sections/popular-courses-section.tsx` | `PopularCoursesSection` | Eyebrow + 3-col ProgramCard grid. |
| PopularCoursesSubGrid (1:4756) | `apps/web/src/components/sections/popular-courses-section.tsx` | `PopularCoursesSection` (second instance) | Same component, second invocation with different `courses[]`. NOT a new section. |
| GuidedPathSection (1:1920) | `apps/web/src/components/sections/closing-cta-section.tsx` | `ClosingCtaSection` | Already renders "Take a Guided Path" as one of three dark-glass cards on `/` and `/about`. Reuse, do not rebuild. |
| OfflineCoursesHero (1:4756) | `apps/web/src/components/sections/marketing-hero.tsx` (NEW — see Table C) | `MarketingHero` | Same shell as OnlineCoursesHero, different copy. Mount the new MarketingHero twice. |

---

## Table B — extend (small surgical change)

| Proposed component | Existing file | Change | Effort |
|---|---|---|---|
| ProgramCard (mode badge) | `apps/web/src/components/ui/program-card.tsx` | Add optional `modeBadge?: { label: 'Online' \| 'Offline'; icon?: ReactNode }` prop rendering a white-glass pill on top-right of the image (bg-white/70 backdrop-blur, rounded-full, text-mini uppercase). | ~15 lines |
| ArticleCard → ProgramCard variant | `apps/web/src/components/ui/program-card.tsx` | Add `variant?: 'course' \| 'article'` prop. Article variant: hide meta row + CardFooter; render title in `text-text-brand-deep` / `text-brand-green-deep`; allow taller image aspect; wrap entire card in `<Link href={...}>`. Resolves the decomposition's ArticleCard-vs-ProgramCard uncertainty in favor of one component. | ~25 lines |
| ProgramsIntroSection (1:4756) | `apps/web/src/components/sections/programs-grid-section.tsx` | Extract the inner `ProgramsBlockView` into a standalone exported section (suggested name `FeaturedProgramsSection`) accepting a single `block` prop — then the existing ProgramsGridSection composes two instances of it, and the Offline page mounts one. CertCard already covers the mixed-mode certification layout in Figma. | ~30 lines refactor, no new visual code |

---

## Table C — new (build from scratch)

| Proposed component | Suggested path | Rationale |
|---|---|---|
| MarketingHero (1:1547 + 1:4756) | `apps/web/src/components/sections/marketing-hero.tsx` | No existing section matches the image-band-with-eyebrow + centered H2 + subtitle pattern. `hero-section.tsx` is the landing offer-chip hero. `course-hero-section.tsx` is side-by-side breadcrumb + photo card. `about-hero.tsx` is page-specific. Props: `{ eyebrow, headline, subtitle, backgroundImage, backgroundAlt? }`. |
| ListingHero (1:7174 + 1:2343) | `apps/web/src/components/sections/listing-hero.tsx` | Full-bleed background image + `bg-black/80` overlay + centered H1 on dark + optional accent-span + optional eyebrow OR breadcrumb + optional result-count. Same shell, two variants via props. Props: `{ backgroundImage, overlayOpacity?, eyebrow?, breadcrumb?, headline, headlineAccent?, subtitle, resultCount? }`. |
| FilterChipBar (1:1547) | `apps/web/src/components/ui/filter-chip-bar.tsx` | No existing tab/chip primitive. `course-section-nav.tsx` is anchor-nav (wrong shape). Tiny new UI primitive: rounded-full pill tabs, active = `bg-brand-primary text-text-inverse`, inactive = `bg-surface-2 text-text-secondary`. Props: `{ tabs: string[], activeIndex?, onChange? }` (controlled or uncontrolled). |

---

## Token check

All proposed components map onto existing tokens in `apps/web/src/app/globals.css`:

- Typography: `text-h1..h5`, `text-mini`, `text-subtext-1/2/3`, `text-body-sm/md` — all defined.
- Color: `text-text-primary/secondary/tertiary/brand/brand-deep/inverse`, `bg-brand-primary/dark/shade/lite`, `bg-surface-0/1/2/cream`, `border-border-1/2/3` — all defined.
- Effects: `shadow-card` — defined.
- Font families: `font-heading`, `font-serif`, `font-sans` — defined.

Potentially missing:

- **ListingHero accent color**: Figma shows `#3fffd5` (bright mint) for the trailing words in "successful yoga teacher". Existing `--color-brand-shade` is `#8ee0ce` (softer mint). Recommend reusing `text-brand-shade` to stay token-consistent; only add `--color-brand-mint: #3fffd5` if design QA insists on the brighter value.
- **ListingHero overlay**: `rgba(0,0,0,0.8)` — use Tailwind utility `bg-black/80`, no new token required.

---

## Warnings

1. **Footer in 1:2343 not in frame** — mount `SiteFooter` on the production page anyway (same convention as `/`, `/about`, `1:7174`).
2. **ArticleCard duplication resolved** — collapse into `ProgramCard variant='article'`. Do NOT create `ui/article-card.tsx`.
3. **PopularCoursesSubGrid resolved** — second invocation of `PopularCoursesSection`, not a separate component.
4. **GuidedPathSection resolved** — already implemented as `ClosingCtaSection` and mounted on home + about. The decomposition flagged it as "new" but it exists.
5. **FilterChipBar labels** — "All / Online / Offline" inferred from context; confirm with design before final assembly.
6. **footer-brand-cta.tsx vs site-footer.tsx** — these are two different files. `site-footer.tsx` is the full footer used by `/` and `/about` and should be used by all four new pages. `footer-brand-cta.tsx` is a partial CTA band only.

---

## Build order recommendation for the build-planner

1. **Extend `ProgramCard`** first (mode badge + article variant) — three pages depend on it.
2. **Extract `FeaturedProgramsSection`** from `programs-grid-section.tsx` — 1:4756 depends on it.
3. **Build `MarketingHero`** — 1:1547 + 1:4756 depend on it.
4. **Build `ListingHero`** — 1:7174 + 1:2343 depend on it.
5. **Build `FilterChipBar`** — only 1:1547 depends on it.
6. **Compose pages**: `/online-courses` (1:1547), `/offline-courses` (1:4756), `/tips-to-become-a-successful-yoga-teacher` (1:7174), `/online-advanced-certifications` (1:2343).

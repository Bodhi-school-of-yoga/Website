# Codebase Scout — Courses Page (node 1:7667)

Scanned `apps/web/src/components/` against the 21-component decomposition in `02_decomposition_courses.json`.

## Action distribution

| Action | Count |
|---|---|
| reuse-as-is | 3 |
| extend | 2 |
| new | 16 |

## Reuse manifest

| # | Proposed component | Section | Action | Match | Confidence |
|---|---|---|---|---|---|
| 1 | site-header | site-header | reuse-as-is | `apps/web/src/components/site-header.tsx` | exact |
| 2 | course-hero | course-hero | new | — | none |
| 3 | course-meta-chip | course-hero | new | — | none |
| 4 | course-section-nav | section-nav-strip | new | — | none |
| 5 | course-overview-section | course-overview | new | — | none |
| 6 | highlights-section | highlights-grid | new | — | none |
| 7 | highlight-card | highlights-grid | extend | `ui/card.tsx` (compose) | similar |
| 8 | curriculum-section | curriculum | new | — | none |
| 9 | syllabus-card | curriculum | extend | `ui/card.tsx` (compose) | similar |
| 10 | scroll-next-button | curriculum + instructors | new | — | none |
| 11 | eligibility-section | eligibility | new | — | none |
| 12 | checklist-item | eligibility | new | — | none |
| 13 | instructors-section | instructors | new | — | none |
| 14 | instructor-card | instructors | new | — | none |
| 15 | faq-section | faq | new | — | none |
| 16 | faq-item | faq | new | — | none (no Accordion in repo) |
| 17 | popular-courses-section | popular-courses | new | — | none |
| 18 | program-card | popular-courses | **reuse-as-is** | `apps/web/src/components/ui/program-card.tsx` | exact |
| 19 | next-steps-cta-grid | site-footer | new | — | none |
| 20 | footer-brand-cta | site-footer | new | — | none |
| 21 | site-footer | site-footer | **reuse-as-is** | `apps/web/src/components/site-footer.tsx` | exact |

## High-confidence reuses (drop-in)

1. **SiteHeader** — `apps/web/src/components/site-header.tsx`. Already responsive, takes navLinks/ctaLabel/onSearchClick. Use defaults.
2. **SiteFooter** — `apps/web/src/components/site-footer.tsx`. Takes brand/columns/address/legal. Already responsive (sm:grid-cols-2 → md:[1.5fr_1fr_1fr_1fr]).
3. **ProgramCard** — `apps/web/src/components/ui/program-card.tsx`. Drop-in for popular-courses cards; image-top + meta-with-dots + dashed footer + "View Program →" CTA already match Figma 1:7851. Open question: instructor avatar+name inside card needs an additive optional prop (see warnings).

## Token coverage

All tokens needed by the proposed components are present in DESIGN.md / globals.css:

- Brand colors: `brand-primary` `brand-dark` `brand-shade` `brand-lite`
- Surfaces: `surface-0` `surface-1` `surface-2`
- Borders: `border-1` `border-2` `border-3`
- Text: `text-text-primary` `text-text-secondary` `text-text-tertiary` `text-text-brand` `text-text-inverse`
- Typography classes: `text-h1` … `text-h5`, `text-subtext-1/2/3`, `text-body-md/sm`, `text-mini`
- Elevation: `shadow-card`
- Misc: `bg-warm` (separator dots), `font-serif` `font-heading`

**Tokens missing from DESIGN.md: none.**

## Responsive concerns on existing components

- **SiteHeader** — fully responsive. No change.
- **SiteFooter** — fully responsive. No change.
- **ProgramCard** — uses aspect-ratio + `sizes` prop. No change.
- **Card primitive** — used as composition base for highlight-card and syllabus-card; both wrappers are responsive by construction (no fixed width).

## Warnings & flags for build-planner

1. **No Accordion in repo.** Decomposer optimistically labeled `faq-item` as `existing-primitive`; verified absent. Treat as new — a minimal controlled disclosure with + / − toggle and border-bottom row.
2. **ProgramCard lacks instructor slot.** Popular-courses Figma cards show an instructor avatar+name pair. Recommend extending ProgramCard with optional `instructor?: { name: string; avatarSrc?: string; initials?: string }` — additive, no breaking change to existing /demo/card usage.
3. **scroll-next-button reused twice.** Curriculum section (1:7817) and Instructors section (1:7770) share the same 46x46 circular arrow asset. Build once.
4. **Old components/layout/{header,footer}.tsx** exist alongside the newer root-level `site-header.tsx` / `site-footer.tsx`. Builders MUST import from the root-level files, not `components/layout/`. The layout/ versions are stale.
5. **closing-cta-section.tsx and programs-grid-section.tsx** look thematically related to footer-brand-cta and popular-courses-section but render different layouts — do NOT wrap them; build new sections that consume the same shared primitives (ProgramCard, etc.).

# 02 — Decomposition: Aerial Yoga Course (Yoga Teacher Training)

**Targets**
- Mobile authored: `218:30509` — 390 × 6885
- Desktop authored: `1:7667` — 1920 × 5390
- Tablet: not authored — interpolate using Tailwind `md:` / `lg:` utilities.

**Route suggestion:** `/courses/aerial-yoga`

**Token rule:** Bodhi design tokens only (`text-h1..h5`, `text-mini`, `text-text-*`, `bg-surface-*`, `border-border-*`). No inline hex, no `clamp()`.

**Mobile-first strategy:** one set of section components; multi-card sections become 2-col at `md:` and 3-col at `lg:`. Hero rewires from stacked to two-column with photo. PreRequisites picks up decorative side images on desktop only. CtaCards (3 light cards) appear only in the mobile authored frame — kept visible at all breakpoints unless QA flags otherwise.

---

## Section-by-section

### 1. Nav (`218:30510` / desktop chrome)
Top navigation: italic Fraunces "Bodhi" wordmark + caption "School of yoga", Enquire Now pill CTA, hamburger on mobile / horizontal links on desktop. **Reuse `apps/web/src/components/site-header.tsx`** committed in 622fe62 — no new work expected. Codebase-scout to verify signature.

### 2. Hero (`218:30521` / `353:10167`)  — biggest responsive divergence
Breadcrumb · two-line title "**Aerial Yoga / Course**" (brand-green Fraunces italic display) · 14–17px body paragraph · 4 meta indicators (Sat & Sun · Studio · 4:00 – 6:00 PM · English) · primary CTA "Reserve Your Spot Now" · hero photo. **Mobile** is a single column on `bg-surface-brand-soft` (#f0fff8) with the meta indicators as wrap-flex pill chips and a 240px image rectangle below the CTA. **Desktop** is a two-column layout (text left ~638px / image right) where the meta indicators become 4 SQUARE white cards (110 × 104, rounded-[17px], vector icon + 14px label). Treat the CTA on desktop as `hidden lg:inline-flex` candidate until visual-QA decides — designs suggest it disappears on desktop.

**New components:** `CourseHero` (section) + `MetaCard` (×4, variant: pill | card).

### 3. Tabs (`222:30558` / `353:10168`)
Anchor-link tab bar — Overview / Highlights / Curriculum / Eligibility / Overall. Active = brand-green pill. **Mobile** is a 56-tall white bar with thin border, 5 inline pills (overflow-x-auto fallback). **Desktop** is an 82-tall full-bleed bar with `backdrop-blur` that sits flush under the hero at y=900, with gap-[41px] between tabs. Sticky-on-scroll behavior is unconfirmed — flagged in `uncertain`.

**New component:** `CourseTabs`.

### 4. Overview (`222:30569` / `353:10169`)
Eyebrow "OVERVIEW" → italic display heading "Elevate Your Practice — Literally" → two body paragraphs. Layout is identical mobile vs desktop apart from container width and type scale (26px → ~40px heading). Reuses a shared `SectionHeader` primitive that other sections also use.

**New components:** `SectionHeader` (shared primitive) + `CourseOverview` (section).

### 5. Gain (`222:30574` / `353:10170`) — "What You'll Gain"
6 highlight cards each with circular icon + bold 16px title + 13px body. **Mobile** stacks one column of 342w cards on `bg-surface-soft` with thin borders. **Desktop** becomes a 2-column grid (cards 641 × 151–159 on white with `drop-shadow`, rounded-[19px], col gap 18px). Icons: feather, spine, smile, leaf, rocket, people.

**New components:** `GainGrid` (section) + `GainCard` (×6).

### 6. Syllabus (`222:30607` / `353:10171`) — "Course Syllabus"
6 numbered cards (01–06) each with module title + one-line description (e.g. "Rigging Essentials — How to safely set up and use aerial hammocks"). **Mobile** is 6 stacked cards (white, border, rounded-[14px]). **Desktop** collapses into a 3-col × 2-row grid (much shorter section overall).

**New components:** `SyllabusGrid` (section) + `SyllabusCard` (×6).

### 7. PreRequisites (`222:30640` / `1:7992`) — "Pre-Requisites" eligibility
Three unique checklist items: "Basic understanding of yoga postures", "Physically fit to perform inversions and aerial movements", "Willingness to explore new boundaries of body and breath" (mobile source duplicates rows — collapsed to 3 here). **Mobile** is a plain centered checklist on white with brand-green check icons. **Desktop** lives on a `bg-surface-brand-soft` band with TWO decorative tilted course photos flanking the content (left at left-[103px] rotated -6.81deg, right at left-[1618px]). Hide decorative images on mobile/tablet.

**New components:** `PreRequisites` (section) + `CheckRow` (×3).

### 8. Instructors (`222:30673` / `1:7770`) — "Meet Your Instructor's"
4 instructor rows: Atheesh Kumar, Sneha Shankar, VijayaRaghavan, Prajakta Jadhav — each labelled "Certified Aerial Yoga Instructor · Bodhi School of Yoga". **Mobile** = 4 stacked horizontal rows with small avatar (~56). **Desktop** = 2 × 2 grid of cards (w-[710], avatar 98 in rounded-[104.5px] circle). Codebase-scout to verify whether an existing `TrainerCard` from the Trainers harness can be reused.

**New components (or reuse):** `InstructorsBand` (section) + `InstructorRow` / `TrainerCard` (×4).

### 9. FAQ (`222:30696` / `1:7821`)
"Frequently Asked Questions" accordion of 4 items, first one expanded. Border-bottom dividers between items. Mobile full-width 24px-padded; desktop centered at left-[314px] max-w-[910]. Item titles are the only copy reliably present in design — answer bodies 2–4 are inferred placeholders to be replaced by content team / CMS.

**Reuse + new:** `AccordionItem` from `apps/web/src/components/ui/accordion.tsx` (if present) + `FAQAccordion` (section).

### 10. LeadMore (`222:30720` / `353:10175`) — "Lead to more courses from us"
Cross-sell row of 3 course cards (Online Weight Loss Coach Certification, Online Mudra Therapy YTT, Online MAT Pilates Instructor Certification) — each with cover image + 3-chip meta row (• 4 weeks / • Online / • English) + instructor avatar (initials) + "View Program" CTA. **Mobile** stacks the 3 cards into one column (driving the section's 1231px height). **Desktop** is a centered 3-col row (max-w 1291px).

**New components:** `RelatedCoursesGrid` (section) + `RelatedCourseCard` (×3).

### 11. CTASection (`222:30769` / `339:8455`) — Dark closing CTA
"Begin where you are." Bodhi italic wordmark above, mint accent on `you are.`, subtitle paragraph "Whether you want to teach, heal a specific thing, or simply move and breathe with people once a week — there's a door at Bodhi for that.", single pill CTA "Try a class, free". `bg-surface-dark` (#00282c) band. Mobile headline ~32–40px; desktop scales to 90px. Layout otherwise identical.

**New component:** `ClosingCTABand` (section).

### 12. CtaCards (`222:30775` / **not authored on desktop**)
Three light cards: **Free Trial Session** (Join now) · **Speak to us** (Contact us) · **Take a Guided Path** (Start now). Authored only on mobile but conventionally appears on desktop too — default plan: render at all breakpoints as a 3-col row on `md:`+; visual-QA can flag if strict-desktop excludes them. Flagged in `uncertain`.

**New components:** `CtaCardsRow` (section) + `CtaCard` (×3).

### 13. Footer (`222:30791` / `339:8400`)
Dark footer (`bg-surface-dark` #00282c) with Bodhi wordmark + "A school for teachers, a home for seekers." + "Practice, taught honestly." tagline, then 3 link columns (School / Visit / Stay close), then "© Bodhi School of Yoga · Yoga Alliance Registered School (RYS-200, RYS-300)" + signature "Designed quietly. Practised daily.". **Mobile** stacks columns; **desktop** is a 4-col CSS grid (1.5fr 1fr 1fr 1fr).

**Reuse:** look for `apps/web/src/components/site-footer.tsx` (or `footer.tsx`); promote to new-section only if missing. Codebase-scout to confirm.

---

## Reuse candidates (high-priority for codebase-scout)
- **SiteHeader** — `apps/web/src/components/site-header.tsx` (high confidence — recently committed).
- **SiteFooter** — `apps/web/src/components/site-footer.tsx?` (medium confidence — recent footer-related commits exist).
- **Accordion** primitive for FAQ — likely shadcn-style at `components/ui/accordion.tsx`.
- **Button** pill for CTAs — `components/ui/button.tsx` (high).
- **Badge / Chip** for hero pill chips + tabs — `components/ui/badge.tsx?` (medium).
- **TrainerCard / InstructorRow** — if Trainers harness shipped a `trainer-card.tsx`, the instructor band reuses it.

## Uncertainties (must resolve in scout / build / QA)
1. PreRequisites mobile source list has duplicate rows — collapsed to 3 unique items here; visual-QA to verify the final count against the screenshot.
2. Desktop Hero may hide the "Reserve Your Spot Now" green CTA — visual-QA to confirm; default plan keeps it `lg:hidden` until proven.
3. CtaCards section has no desktop authored counterpart. Default plan renders it on all breakpoints; flag for designer review.
4. FAQ answer bodies for items 2–4 are inferred placeholders.
5. Tabs sticky-on-scroll behavior is not declared in the design — defaulting to non-sticky.
6. Instructor portrait image sources are not present in design payload — using placeholder slugs based on names.

---

**Files written**
- `/Users/anukul/Desktop/bodhi/_workspace/02_decomposition.json`
- `/Users/anukul/Desktop/bodhi/_workspace/02_decomposition.md`

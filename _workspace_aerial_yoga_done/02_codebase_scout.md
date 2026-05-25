# Codebase Scout — Our Trainers Page

**Date:** 2026-05-23
**Headline:** The entire Trainers page already exists and is wired. Zero net-new files required — every proposed component maps to an existing implementation. Work is prop/content extensions, not new code.

## Counts

| Action | Count |
|---|---|
| reuse-as-is | 8 |
| extend | 5 |
| new | 0 |

## Existing Page

`apps/web/src/app/our-trainers/page.tsx` already composes:

```
SiteHeader tone='light'
TrainersHero
TrainersPullQuoteBand
TrainersFounderSection
TrainersDepartmentHeads
TrainersMeetAll
SiteFooterBlock
```

Missing vs Figma: a CTA band + CTA cards row between `TrainersMeetAll` and the footer.

## Component Map

| Proposed | Action | Match | Delta |
|---|---|---|---|
| SiteHeader | reuse-as-is | `components/site-header.tsx` | none |
| TrainersHero | extend | `sections/trainers-hero.tsx` | add Devanagari+English eyebrow; add mint-band variant for mobile (current is image-only) |
| PullQuoteBand | extend | `sections/trainers-pull-quote-band.tsx` | add single oversized opening-quote glyph on mobile (current hides both glyphs <md) |
| FounderCard | extend | `sections/trainers-founder-section.tsx` | add `hidden lg:block` (currently shows on all breakpoints) |
| LeadershipSection | extend | `sections/trainers-department-heads.tsx` | add `hidden md:block` (currently shows on mobile) |
| DepartmentHeadCard | reuse-as-is | `ui/department-head-card.tsx` | none — `{name, role, portrait, tone}` matches |
| TrainersSection | extend | `sections/trainers-meet-all.tsx` | add `eyebrowMobile`/`titleMobile` props; replace placeholder 6×2 DEFAULT_TRAINERS with 18 unique entries (or a real data module) |
| TrainerCard | extend | `ui/trainer-card.tsx` | add optional `role`, `years`, `city` props + meta row; swap circular avatar for rounded-rectangle aspect-[3/4] image |
| TrainersCtaBand | reuse-as-is | `sections/closing-cta-section.tsx` (theme='light') | pass eyebrow='Bodhi', heading split, body, pill CTA — already supported |
| CtaCardsRow | reuse-as-is | `sections/closing-cta-section.tsx` (`cards` prop) | renders 3-up cards beneath the headline — pass `cards={[...3 items]}` |
| CtaCard | reuse-as-is | inlined inside `closing-cta-section.tsx` | no standalone primitive needed; structure already matches |
| Pill (Button) | extend | `ui/button.tsx` | optional: add a `variant='brand'` (currently every section inlines its own pill Link — works but inconsistent). Existing `size='pill'` covers the shape. |
| SiteFooter | reuse-as-is | `components/site-footer-block.tsx` (→ `site-footer.tsx`) | none |

## Token Reality Check

The user's mental token map (mentioned in the task prompt) does NOT exist in `apps/web/src/app/globals.css`. Actual tokens:

| User said | Actual token in globals.css |
|---|---|
| `surface-brand` | does not exist — use `bg-brand-primary` (#009877) or `bg-brand-shade` (#8ee0ce) |
| `surface-mint` | does not exist — use `bg-brand-lite` (#f0fff8) — exact match for Figma's mint |
| `surface-base` | does not exist — use `bg-surface-1` (#ffffff) |
| `surface-elevated` | does not exist — use `bg-surface-1` or `bg-surface-0` (#fdfdfd) |
| `border-border-subtle` | does not exist — use `border-border-2` (#f0f0f0) |
| `text-text-on-brand` | does not exist — use `text-text-inverse` (#ffffff) or `text-brand-dark` (#00282c) depending on pill background |
| `text-text-primary` | exists (#1d3e59) ✓ |
| `text-text-brand` | exists (#009877) ✓ |
| `text-text-tertiary` | exists (#727272) ✓ |
| `text-h1..h5`, `text-mini` | all present in `@theme inline` block ✓ |

### Figma hex → token

| Figma hex | Mapped token | Notes |
|---|---|---|
| `#1a7366` (primary pill) | NONE — substitute `bg-brand-primary` or `bg-brand-shade` | Per user policy, do not add. Existing trainers-hero uses bg-brand-shade pill; acceptable. |
| `#0a4f45` (quote band) | `bg-brand-green-darkest` (#003e22) | Slight drift; already in use, looks correct. |
| `#122e29` (ink) | `text-text-secondary` (#2a2420) | Slight drift; already in use. |
| `#738080` (muted) | `text-text-tertiary` (#727272) | ✓ |
| `#f0fff8` (mint band) | `bg-brand-lite` | Exact match ✓ |
| `#fbfcfb` (card) | `bg-surface-1` | ✓ |
| `#e0e5e3` (border) | `border-border-2` | Already in use ✓ |
| `#ffffff` | `bg-surface-1` / `text-text-inverse` | ✓ |

## Key Existing Primitives To Reuse (Priority)

1. `apps/web/src/components/site-header.tsx` — already in use, tone='light' supported.
2. `apps/web/src/components/site-footer-block.tsx` — full footer instance, drop-in.
3. `apps/web/src/components/ui/button.tsx` — has `size='pill'` (h-11 rounded-full px-6); brand variant would be a small addition.
4. `apps/web/src/components/ui/department-head-card.tsx` — exact match for Leadership grid.
5. `apps/web/src/components/sections/closing-cta-section.tsx` — covers both `TrainersCtaBand` AND `CtaCardsRow` via its `cards` prop + theme='light'.

## Warnings

1. `DEFAULT_TRAINERS` in `trainers-meet-all.tsx` is a placeholder (6 trainers duplicated). Build phase must replace with the 18-entry roster from a real data module.
2. `TrainersFounderSection` and `TrainersDepartmentHeads` render at every breakpoint; Figma omits both on mobile. Add `hidden md:block` / `hidden lg:block` guards.
3. `TrainerCard` uses a circular crop; Figma uses a rounded-rectangle aspect-[3/4] image with name/role/meta beneath. Visual divergence — call out to build-planner.
4. Pill button: 9 CTAs across the page each inline their own `<Link className="rounded-full …">`. Worth consolidating into a `Button variant='brand' size='pill'` in a follow-up, but not required to ship this Figma node.

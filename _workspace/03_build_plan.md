# Build Plan — Course Card (node 1:3978)

Revision 1. Target: horizontal 1308x362 course card "Decoding \"What is Prana?\"".

## Resolved decisions (from user)

1. **Card root link**: NONE. CourseCard root is decorative — no outer `<Link>` wrapper. This resolves the nested-anchor / click-conflict warning in `02_interactions.json`.
2. **CTA `href`**: `#` placeholder. Real `/courses/[slug]/book` route doesn't exist yet.
3. **MintPillButton `href`**: same `#` placeholder (it IS the CTA inside CourseCard).
4. **Card-click vs CTA-click**: CTA-only navigation. Whole-card is not clickable.

The CTA href is surfaced under `unresolved_hrefs` in the JSON so the orchestrator can backfill once routing lands.

## Motion library

`framer-motion ^12.39.0` is already installed in `apps/web/package.json` — no new dependency. Hover/press states stay Tailwind-only; framer-motion is reserved for the mount stagger + scroll-reveal on CourseCard.

## Ordering rationale

Topological order, smallest unit first:

1. **G1 (parallel)**
   - **T1** — Extend `Button` with `mint` variant + `pill` size. No deps. Mint = `bg-brand-shade text-text-secondary`; pill = `rounded-full px-6 h-11`. Adds press-scale-bright Tailwind classes so CourseCard doesn't need to layer them.
   - **T2** — Extend `CourseMetaChip` with an optional `tone: 'default' | 'mint'` prop. No deps. Builder must diff the Figma render first: if tiles are pure white, this becomes a no-op (recorded in build log) and T3 omits the `tone` prop.
2. **G2** — **T3** — Build new `course-card.tsx`. Depends on T1 (uses Button mint+pill) and T2 (uses CourseMetaChip, possibly with tone='mint'). Client component because of `useReducedMotion()` + `whileInView` stagger.
3. **G3** — **T4** — Demo page at `/demo/course-card` for visual-qa. Depends on T3.

## Tradeoffs

- **Extending Button vs new MintPillButton**: scout recommended extending. Keeps the button surface centralized — one CVA, one place to audit pill/mint usage. Cost is a wider variant union; benefit is no parallel button component to maintain.
- **Extending CourseMetaChip vs new FeatureTile**: scout flagged structural identity (110x104, gap-2, icon + text-mini label). Only the background tone may differ. Adding an optional `tone` prop is one line of conditional class; building a parallel FeatureTile would duplicate the entire tile.
- **CourseCard as sibling of ProgramCard (not a variant)**: ProgramCard is vertical (image-top), CourseCard is horizontal (image-left). Forcing both into one component would mean two divergent layouts behind a prop switch. Sibling primitives are the cleaner factoring.
- **Sub-pixel feature-tile row width**: 4 x 110 + 3 x 15 = 485px inside a ~597px right column — tile row is left-aligned, not full-width. Builder should set `gap-[15px]` (or use `space-x-[15px]` analog) and NOT stretch tiles to fill.

## Interaction spec (CourseCard)

Inlined into T3 from `02_interactions.json`:

- **Mount stagger** (`framer-motion`): root `motion.article` with `initial='hidden' whileInView='visible' viewport={{ once: true, amount: 0.3 }}`. Children use shared `fade-in-up` variants. Delays: image 0 → title 60ms → body 120ms → feature-row & price 180ms → cta 240ms → starts-caption 300ms.
- **Hover-lift** (Tailwind only): `transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md` on the root.
- **CTA hover/press** (Tailwind only): press-scale-bright (`transition-[transform,filter] duration-150 hover:brightness-105 active:scale-[0.98]`) — already baked into T1's new `mint` variant.
- **CTA click**: `href="#"` (placeholder).
- **Reduced motion**: T3 calls `useReducedMotion()` and skips entrance animation when true. T4 additionally wraps in `<MotionConfig reducedMotion="user">` for belt-and-braces.

## Open items / unresolved

- CTA `href` is `#` — real booking route TBD. Tracked in `unresolved_hrefs`.
- T2 may downgrade to no-op based on Figma tile-color check. Builder records the call in the build log.
- `border-1` vs `border-2` vs `border-3` for the card outline — scout's color-approximation warning stands. Builder samples the Figma frame and picks the nearest existing token. No raw hex.

## Files produced

- `apps/web/src/components/ui/button.tsx` (extended — T1)
- `apps/web/src/components/ui/course-meta-chip.tsx` (extended — T2, may be no-op)
- `apps/web/src/components/ui/course-card.tsx` (new — T3)
- `apps/web/src/app/demo/course-card/page.tsx` (new — T4)
- `apps/web/public/course-prana.png` (asset placed by T4)

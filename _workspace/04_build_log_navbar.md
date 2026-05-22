# Build Log — Navbar Dropdown System

**Date:** 2026-05-22
**Executor:** component-builder (single pass)
**Plan source:** `_workspace/03_build_plan_navbar.md`

---

## Files created (5)

| Path | LOC | Purpose |
|---|---|---|
| `apps/web/src/components/nav/nav-types.ts` | 24 | TS types: `MegaMenuColumn`, `MegaMenuItem`, `DropdownItem`, `DropdownContent`. No runtime code. |
| `apps/web/src/components/nav/nav-data.ts` | 175 | Pure data: `ABOUT_MEGA_MENU` (3 columns / 4+3+3 items), `COURSE_DROPDOWNS` (teacher / advanced / yoga × 3 items each). |
| `apps/web/src/components/site-header.nav-menu.tsx` | 150 | Local Base UI wrapper. Exports `NavMenu`, `NavMenuList`, `NavMenuItem`, `NavMenuTrigger`, `NavMenuContent`, `NavMenuLink`. Each `NavMenuContent` portals its own Positioner+Popup so per-trigger `align` works (viewport-less mode). Motion classes (opacity / scale-95 / translate-y-1, 200ms in / 150ms out, `cubic-bezier(0.22,1,0.36,1)`, `motion-reduce:transition-none`) live on the Popup. |
| `apps/web/src/components/nav/dropdown-card.tsx` | 83 | `<DropdownCard items={...} />` — 445×auto card with `rounded-[22px]`, soft shadow. Each row = 137×83 `next/image` thumbnail (fill + sizes) with Lucide icon overlay (white, drop-shadow), title / subtitle / "N Courses" footer link in `text-text-brand`. Items separated by `<hr className="border-t border-border-2" />`. |
| `apps/web/src/components/nav/mega-menu-panel.tsx` | 99 | `<MegaMenuPanel columns={...} />` — 1227×min-340 frosted glass panel (`bg-surface-1/70`, `backdrop-blur-[30px]`, `rounded-[31px]`). 3 columns, `gap-[45px]`. Each item: 48×48 icon tile (`size-12`, `rounded-2xl`, soft shadow) with Lucide icon (mapped from string), title in `font-serif text-[18px]`, subtitle clamped to 2 lines. |

## Files modified (4)

| Path | Change |
|---|---|
| `apps/web/src/components/site-header.tsx` | Replaced `HeaderLink` stub with Base UI `NavMenu` machinery on desktop. Updated `HeaderNavLink` type — `hasDropdown?: boolean` → `kind?: 'mega' \| 'panel'` + `dropdownKey?`. Updated `DEFAULT_NAV_LINKS` to mark course links as `kind: 'panel'` and About Us as `kind: 'mega'`. Mobile drawer rewritten — `kind` links render a native `<details>`/`<summary>` accordion with chevron rotation on `group-open`; mega expands grouped by column heading. |
| `apps/web/src/components/sections/about-story-section.tsx` | Added `id="story"` to root `<section>`. |
| `apps/web/src/components/sections/about-pillars-section.tsx` | Added `id="pillars"` to root `<section>`. |
| `apps/web/src/components/sections/about-vision-mission-section.tsx` | Added `id="vision"` to root `<section>`. |

## Deviations from plan

1. **No `NavMenuPositioner` exported from the local wrapper.** Plan §2.1 listed it as a member; in viewport-less mode each Content owns its own Portal+Positioner+Popup internally, so a separate `NavMenuPositioner` export would be dead. The plan's later text (§5.2) acknowledges this. Not exported = no API surface to misuse.
2. **`viewport={false}` is implicit, not a literal prop.** Base UI's `NavigationMenuRoot` has no `viewport` prop in the type signature — viewport mode is determined by whether you render `NavigationMenuPrimitive.Viewport` (we don't). Plan wording was conceptual; behavior is correct.
3. **Mobile mega-menu columns wrap inline (no `<h4>` distinction)** — per plan §6 the spec said "column headings as section labels and items below"; I used `<h4>` styled with `text-mini` + uppercase tracking, semantically heading-level. Followed plan.
4. **No new tokens added to `globals.css`.** All bespoke values (radius 31/22/13/16px, shadows) are inline Tailwind arbitrary values per the plan's token-mapping table (§9). Confirmed no new hex literals introduced — all colors come from Bodhi tokens (`text-text-*`, `bg-surface-*`, `border-border-*`, `text-text-brand-deep`).

## TypeScript check

```
cd apps/web && yarn tsc --noEmit
```

Result: **PASS** (clean, no errors).

## Lint

```
cd apps/web && yarn lint
```

Result: **1 error + 5 warnings** — all in pre-existing files **NOT touched by this PR** (`src/app/layout.tsx`, `src/components/home/hero.tsx`, `src/components/ui/animated-count.tsx`). Files authored / modified by this build produce zero lint output. Pre-existing issues left for separate cleanup.

## Items not skipped — full plan coverage

All 5 new files and 1+3 modified files from plan §2 / §10 created. All a11y, motion, and mobile specs implemented. Anchor IDs (`#story`, `#pillars`, `#vision`) added so the mega-menu deep links resolve.

## Known follow-ups (out of scope)

- Routes referenced in `nav-data.ts` (`/faculty`, `/poses`, `/blog`, `/centers`, `/contact`, `/blog/become-a-teacher`, all course sub-routes) do not exist yet — will 404 with header/footer chrome until implemented. Flagged via TODO at top of `nav-data.ts`.
- Visual QA pass (visual-qa agent) against Figma screenshots is the natural next step.

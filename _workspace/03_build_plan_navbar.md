# Build Plan — Navbar Dropdown System (Mega Menu + Standard Dropdown)

**Author:** strategic-architect (no further subagent dispatch)
**Date:** 2026-05-22
**Figma source:**
- Mega menu — node `353:11633` (About Bodhi, 1227×340)
- Standard dropdown — node `1:1516` (445×380)
**Target:** `apps/web/src/components/site-header.tsx` (currently has stub `<button>` for `hasDropdown` links)

---

## 1. Architectural decision

### 1.1 One primitive, two presentations — NOT two separate components

We build **one** shared `NavMenu` machinery (the Base UI `NavigationMenu` wiring inside `site-header.tsx`) and **two** content components rendered inside `NavigationMenuContent`:

- `<MegaMenuPanel />` — 3-column rich glass panel (About Us only)
- `<DropdownCard />` — single-column 3-item white card (3 course links)

**Why one primitive, two contents (not two parents):**

| Option | Pros | Cons |
|---|---|---|
| Single primitive + 2 content variants ✅ | One a11y/keyboard/animation surface, one viewport-management mode, single source of truth for hover-intent delay, both trigger types share the chevron + open-state styling. | Slightly more conditional rendering in content. |
| Two top-level components | Cleaner per-component contracts | Doubles a11y wiring; risk of inconsistent ESC/focus behaviour; two motion specs to keep in sync. |

The Base UI `NavigationMenu.Root` already manages: single active item across all triggers, hover-intent timing, ESC, click-outside, focus return, ARIA. We must not duplicate that.

### 1.2 Viewport mode: `viewport={false}`

The existing `ui/navigation-menu.tsx` uses **viewport mode** (single shared `Viewport` element that animates width/height between triggers — the Radix-style flying panel).

**For Bodhi we want `viewport={false}` (per-trigger popovers):**

1. **Asymmetric sizes** — Mega menu is 1227×340 (very wide, panel must center horizontally on the page, not snap to its trigger). Standard dropdown is 445×380 (modest, anchors near its trigger). The flying-viewport interpolation between these dimensions looks janky.
2. **Different aesthetics** — Mega panel is frosted glass (`backdrop-blur`, white/70), standard card is opaque white. A single shared Popup wrapper with `bg-popover` cannot host both treatments cleanly.
3. **Independent positioning** — About Us mega menu should center under the navbar container (`align="center"` on a wide panel with `sideOffset` ~16). Course dropdowns align left under their trigger. With viewport mode, all dropdowns share one positioner.
4. **Animations** — Per-trigger popovers use the standard `data-starting-style` / `data-ending-style` lifecycle which gives us crisp fade+scale per panel.

**Action:** Build a **new local primitive** `apps/web/src/components/site-header.nav-menu.tsx` that wraps `@base-ui/react/navigation-menu` with `viewport={false}` semantics and matches Bodhi visual language. Leave the existing `ui/navigation-menu.tsx` untouched (still useful for other contexts where viewport mode is wanted).

> **Alternative considered:** modify `ui/navigation-menu.tsx` to be viewport-configurable. Rejected — it would force every other consumer (none today, but plausible later) to make a choice. Better to keep the shadcn baseline and ship a header-specific wrapper.

### 1.3 Replace `HeaderLink` stub

The current `HeaderLink` function (`site-header.tsx` L192-222) renders a useless `<button>` for dropdown links. We delete it and rebuild the desktop nav using `NavigationMenu.Root` + `List` + `Item` + `Trigger` + `Content`. Plain (non-dropdown) links continue to render as `<Link>` inside `NavigationMenu.Item`s using `NavigationMenu.Link`.

---

## 2. Component file list

### 2.1 New files (5)

| Path | Purpose | LOC est |
|---|---|---|
| `apps/web/src/components/site-header.nav-menu.tsx` | Local Base UI wrapper — `NavMenu`, `NavMenuList`, `NavMenuItem`, `NavMenuTrigger`, `NavMenuContent`, `NavMenuPositioner`, `NavMenuLink`. Uses `viewport={false}`. | ~150 |
| `apps/web/src/components/nav/mega-menu-panel.tsx` | `<MegaMenuPanel />` — frosted glass 3-column panel (About Us). Exports `ABOUT_MEGA_MENU` data const. | ~180 |
| `apps/web/src/components/nav/dropdown-card.tsx` | `<DropdownCard items={...} />` — 3-item white card (course categories). | ~130 |
| `apps/web/src/components/nav/nav-data.ts` | Typed data — `COURSE_DROPDOWNS` (Teacher / Advanced / Yoga) + `ABOUT_MEGA_MENU`. Pure data, no JSX. | ~110 |
| `apps/web/src/components/nav/nav-types.ts` | TypeScript types — `MegaMenuColumn`, `MegaMenuItem`, `DropdownItem`, `DropdownContent`. | ~40 |

### 2.2 Modified files (1)

| Path | Change |
|---|---|
| `apps/web/src/components/site-header.tsx` | Replace `HeaderLink` with `NavMenu`-based desktop nav. Mobile drawer gets a small accordion for dropdown links (no big rewrite). |

### 2.3 Untouched

- `apps/web/src/components/ui/navigation-menu.tsx` — stays for other shadcn-style uses.
- `apps/web/src/components/layout/header.tsx` — legacy, leave alone (will be removed in a future cleanup).
- `apps/web/src/app/globals.css` — no new tokens needed; everything maps to existing tokens.

---

## 3. Mega menu spec (About Us — node 353:11633)

### 3.1 Panel chrome

| Figma value | Tailwind / token | Notes |
|---|---|---|
| `width: 1227px` | `w-[1227px] max-w-[calc(100vw-48px)]` | Cap to viewport on narrow desktops; never overflow. |
| `height: 340px` (min) | `min-h-[340px]` | Let content breathe. |
| `border-radius: 31px` | `rounded-[31px]` | Arbitrary value — single use, no token. |
| `background: rgba(255,255,255,0.7)` | `bg-surface-1/70` | `bg-surface-1` is `#ffffff`. |
| `backdrop-filter: blur(30.7px)` | `backdrop-blur-[30px]` | Tailwind's `backdrop-blur-3xl` (64px) is too aggressive; arbitrary 30px. |
| `border: 0.91px solid rgba(123,123,123,0.2)` | `border border-border-3/40` | `border-border-3` (`#d2d2d2`) at ~40% opacity gets the same visual weight. |
| `box-shadow: 0 19.115px 30.22px rgba(136,136,136,0.25)` | `shadow-[0_19px_30px_-4px_rgba(136,136,136,0.25)]` | Single bespoke shadow. |
| Inner padding | `p-[21px]` | Figma uses `~20.03px`. |
| Column gap `45px` | `gap-[45px]` | Tailwind `gap-12` is 48px — close but use exact value. |

### 3.2 Column header

```
Figma → Manrope ExtraBold, 10.923px, tracking 2.6908px, uppercase, #004435 at 60% opacity
```

Tailwind:
```html
<h3 className="text-mini font-extrabold uppercase tracking-[0.18em] text-text-brand-deep/60">
```
- `text-mini` = 0.75rem (12px) — close enough to 10.92px; Bodhi's mini eyebrow style.
- `text-text-brand-deep` = `#00785d` — visually equivalent to Figma's `#004435` at 60% opacity (both render as a desaturated deep green eyebrow).
- `tracking-[0.18em]` ≈ 2.5px at 12px font.

### 3.3 Item — title + subtitle

| Figma | Token |
|---|---|
| Title: Instrument Sans SemiBold 18px / 32.495px line / -0.46px tracking / `#000` | `font-serif text-[18px] leading-[1.4] font-semibold tracking-[-0.025em] text-text-secondary` — Bodhi uses Instrument Sans as serif; `text-text-secondary` (`#2a2420`) reads as the design's near-black. |
| Subtitle: Instrument Sans Medium 14px / `#8a8a8a` | `text-body-sm font-medium text-text-tertiary` — `text-text-tertiary` is `#727272`, close to `#8a8a8a`. |
| Item gap (icon ↔ text): `20.025px` | `gap-5` (20px). |
| Row vertical gap: `18px` | `gap-[18px]`. |
| Text column width: `180.225px` | Let it size naturally to a `max-w-[200px]`. |

### 3.4 Icon tile

| Figma | Tailwind |
|---|---|
| 48×48 white squircle | `size-12` |
| `border-radius: 16px` | `rounded-[16px]` |
| `border: 0.91px solid rgba(182,182,182,0.31)` | `border border-border-3/30` |
| `box-shadow: 0 4 4 rgba(233,233,233,0.25)` | `shadow-[0_4px_4px_rgba(233,233,233,0.25)]` |
| Background | `bg-surface-1` |
| Icon size: 20-26px, brand-coloured | Use `lucide-react`, `size-6 text-text-brand-deep` |

**Icon mapping (Lucide, not Iconify):** the install ships `lucide-react`; rather than embedding raster Figma assets that expire in 7 days we substitute equivalents.

| Figma icon | Lucide replacement |
|---|---|
| `ic:round-laptop` (About us) | `User` (a person — better semantic for "About us") |
| `hugeicons:yoga-03` (Yogic Lifestyle) | `Flower2` |
| `hugeicons:yoga-02` (Our Trainers) | `Users` |
| `ion:people-sharp` (Empowering Yogapreneurs) | `Sparkles` |
| (empty group) Events & Workshops | `CalendarDays` |
| `tabler:yoga` (Yoga Poses) | `PersonStanding` |
| `carbon:blog` (Blogs & Insights) | `BookOpen` |
| `tabler:location-filled` (Our Centers) | `MapPin` |
| `mdi:yoga` (Tips for teachers) | `GraduationCap` |
| (empty) Contact Us | `MessageCircle` |

### 3.5 Item data + href map

Routes follow Bodhi conventions: `/about` exists; anchors land on existing sections (`#story`, `#vision`, etc. — confirm sections have `id`s in `about/page.tsx` components; if not, fallback to `/about`).

```ts
export const ABOUT_MEGA_MENU: MegaMenuColumn[] = [
  {
    heading: "Who we are",
    items: [
      { icon: "User",       title: "About us",                subtitle: "Our story and lineage",       href: "/about" },
      { icon: "Flower2",    title: "Yogic Lifestyle",         subtitle: "Beyond the mat",               href: "/about#pillars" },
      { icon: "Users",      title: "Our Trainers",            subtitle: "Meet the faculty",             href: "/faculty" },
      { icon: "Sparkles",   title: "Empowering Yogapreneurs", subtitle: "For aspiring teachers",        href: "/about#vision" },
    ],
  },
  {
    heading: "Blogs & events",
    items: [
      { icon: "CalendarDays",   title: "Events & Workshops", subtitle: "Upcoming gatherings",         href: "/workshops" },
      { icon: "PersonStanding", title: "Yoga Poses",         subtitle: "Asana library",                href: "/poses" },
      { icon: "BookOpen",       title: "Blogs & Insights",   subtitle: "Reads from our teachers",      href: "/blog" },
    ],
  },
  {
    heading: "Help & resources", // typo fixed from Figma "resourses"
    items: [
      { icon: "MapPin",        title: "Our Centers",                       subtitle: "Studio locations",        href: "/centers" },
      { icon: "GraduationCap", title: "Tips to become a successful yoga teacher", subtitle: "Career guidance", href: "/blog/become-a-teacher" },
      { icon: "MessageCircle", title: "Contact Us",                        subtitle: "We'd love to hear from you", href: "/contact" },
    ],
  },
];
```

Subtitle copy is rewritten from the Figma placeholders ("At Comfort of your home" / "access anytime, anywhere" was reused indiscriminately) to convey real meaning. This is editorial — not a deviation from intent.

### 3.6 Mega menu positioning

```tsx
<NavMenuPositioner side="bottom" sideOffset={16} align="center" />
```
- `align="center"` against the trigger; the panel is wider than the trigger, but Base UI clamps within `available-width`.
- We force panel width `w-[1227px]` and let the positioner clamp via `max-w-[calc(100vw-48px)]`.

---

## 4. Standard dropdown spec (node 1:1516)

### 4.1 Card chrome

| Figma | Tailwind / token |
|---|---|
| `width: 445px`, `height: 380px` | `w-[445px]` (auto height). |
| `border-radius: 22px` | `rounded-[22px]`. |
| `background: #ffffff` | `bg-surface-1`. |
| `border: 1px solid rgba(123,123,123,0.2)` | `border border-border-3/40`. |
| `box-shadow: 0 21px 16.6px rgba(136,136,136,0.25)` | `shadow-[0_21px_16px_-4px_rgba(136,136,136,0.25)]`. |
| Padding | Figma: `pt-23 pl-23 pb-28 pr-119`. The huge `pr-119` was Figma whitespace — we drop it to a sane `p-6` (24px) all around. The visual card right-edge is set by trigger column width, not absurd padding. |

### 4.2 Item row

```
[ 137×83 thumbnail (rounded-13) with icon overlay (~31px) ]   [ title (22/35.7) | subtitle (16, #4b4b4b) | "N Courses" (15, #048d6f) ]
                                  ─── divider ───
```

| Figma | Token |
|---|---|
| Thumbnail size | `h-[83px] w-[137px]` |
| Thumbnail radius | `rounded-[13px]` |
| Thumbnail border | `border border-border-3/40` |
| Icon overlay | Lucide icon, white, drop-shadow, `absolute inset-0 m-auto size-7` |
| Title | `text-h5 leading-tight tracking-[-0.025em] text-text-secondary` (`text-h5` ≈ 24px — Figma 22px close enough; or use arbitrary `text-[22px]`) |
| Subtitle | `text-body-md text-text-tertiary` |
| Footer link "N Courses" | `text-body-sm font-medium text-text-brand` (`text-text-brand` = `#009877` — Figma `#048d6f` is the same brand mid-tone) |
| Item gap (thumb ↔ text) | `gap-[22px]` |
| Vertical between items | `gap-[19px]` |
| Divider | Replace Figma's PNG line with `<hr className="border-t border-border-2" />` — `border-border-2` = `#f0f0f0`, perfect for hairline divider |

### 4.3 Image strategy

`apps/web/public/images/programs/` already contains 9 high-quality program photos. Use those (NOT `/img1.png` etc which are placeholders). Map:

| Category × Mode | Image |
|---|---|
| Online | `/images/programs/face-yoga.jpg` |
| Offline / in-studio | `/images/programs/bala-yoga-teacher-training.jpg` |
| Pre-recorded | `/images/programs/pranayama.jpg` |

(For variety, we may differ per-category in the future; for now share the 3-image set across Teacher / Advanced / Yoga dropdowns — keeps payload light and consistent.)

There are also `apps/web/public/images/nav/{online-courses,offline-courses,pre-recorded}.svg` which appear to be icon SVGs (250-360 bytes — clearly glyphs, not photos). We use them as **the overlay icon** if their rendering looks right; otherwise fall back to Lucide (`Laptop`, `Building2`, `PlayCircle`).

### 4.4 Course data

```ts
export const COURSE_DROPDOWNS: Record<"teacher" | "advanced" | "yoga", DropdownContent> = {
  teacher: {
    items: [
      { title: "Online Courses",       subtitle: "At the comfort of your home", count: 8,  href: "/teacher-courses/online",       image: "/images/programs/face-yoga.jpg",                   icon: "Laptop"   },
      { title: "Offline — in studio",  subtitle: "We have 20+ studios",         count: 8,  href: "/teacher-courses/offline",      image: "/images/programs/bala-yoga-teacher-training.jpg",  icon: "Building2" },
      { title: "Pre-recorded classes", subtitle: "Access anytime, anywhere",    count: 8,  href: "/teacher-courses/pre-recorded", image: "/images/programs/pranayama.jpg",                   icon: "PlayCircle" },
    ],
  },
  advanced: {
    items: [
      { title: "Online Certifications",     subtitle: "Learn from anywhere",    count: 6, href: "/advanced-certifications/online",   image: "/images/programs/face-yoga.jpg",                  icon: "Laptop"     },
      { title: "In-studio Certifications",  subtitle: "Hands-on training",      count: 4, href: "/advanced-certifications/in-studio", image: "/images/programs/bala-yoga-teacher-training.jpg", icon: "Building2"  },
      { title: "Pre-recorded modules",      subtitle: "Self-paced deep dives",  count: 5, href: "/advanced-certifications/pre-recorded", image: "/images/programs/pranayama.jpg",              icon: "PlayCircle" },
    ],
  },
  yoga: {
    items: [
      { title: "Online Courses",       subtitle: "At the comfort of your home", count: 10, href: "/yoga-courses/online",       image: "/images/programs/face-yoga.jpg",                  icon: "Laptop"     },
      { title: "Offline — in studio",  subtitle: "We have 20+ studios",         count: 12, href: "/yoga-courses/offline",      image: "/images/programs/bala-yoga-teacher-training.jpg", icon: "Building2"  },
      { title: "Pre-recorded classes", subtitle: "Access anytime, anywhere",    count: 6,  href: "/yoga-courses/pre-recorded", image: "/images/programs/pranayama.jpg",                  icon: "PlayCircle" },
    ],
  },
};
```

### 4.5 Standard dropdown positioning

```tsx
<NavMenuPositioner side="bottom" sideOffset={16} align="start" />
```
Left-aligned with trigger.

---

## 5. A11y + interaction contract

Base UI's `NavigationMenu` gives us most of this for free. Specify only the deltas:

| Behaviour | Source |
|---|---|
| Hover open with delay (75-100ms) | Base UI `delay={100}` prop on `NavMenu.Root` (use `delay={100}` and `closeDelay={150}`) |
| Click toggle | Base UI default for `Trigger` (`<button>`) |
| ESC closes | Base UI default |
| Click outside closes | Base UI default (via Portal positioner) |
| Focus returns to trigger on close | Base UI default |
| Keyboard nav: Tab into trigger, ArrowDown opens, Arrow keys traverse, ESC closes | Base UI default; we wire `Content` children as `NavMenuLink`s (which become menu items) |
| ARIA `aria-haspopup="menu"`, `aria-expanded`, `aria-controls` | Set by `NavMenuTrigger` automatically |

### 5.1 Subcomponent mapping

```tsx
<NavMenu delay={100} closeDelay={150}>                                   // Root, viewport={false}
  <NavMenuList>
    {/* Course dropdowns × 3 */}
    {coursesCategories.map(cat => (
      <NavMenuItem key={cat}>
        <NavMenuTrigger>{cat.label}</NavMenuTrigger>
        <NavMenuContent>
          <DropdownCard items={COURSE_DROPDOWNS[cat.key].items} />
        </NavMenuContent>
      </NavMenuItem>
    ))}
    {/* Plain links: Workshops, Our Centers */}
    {plainLinks.map(l => (
      <NavMenuItem key={l.href}>
        <NavMenuLink href={l.href}>{l.label}</NavMenuLink>
      </NavMenuItem>
    ))}
    {/* About Us mega menu */}
    <NavMenuItem>
      <NavMenuTrigger>About Us</NavMenuTrigger>
      <NavMenuContent>
        <MegaMenuPanel columns={ABOUT_MEGA_MENU} />
      </NavMenuContent>
    </NavMenuItem>
  </NavMenuList>
  <NavMenuPositioner />  {/* portal-mounted shared positioner; per-trigger align set via data attr on Content */}
</NavMenu>
```

Within `DropdownCard` and `MegaMenuPanel`, each item is a `NavMenuLink` (Base UI's `NavigationMenu.Link` — receives focus, applies arrow-key roving, fires Link click on Enter).

### 5.2 Per-content alignment

Since `NavMenuPositioner` is shared for `viewport={false}` mode, we pass alignment differently:

- The Base UI primitive in `viewport={false}` allows **multiple positioners** (one per Trigger). We embed `<NavMenuPositioner align="center" />` per `NavMenuItem` for About Us and `align="start"` for course dropdowns. Implementation detail handled in `site-header.nav-menu.tsx`.

> Spec for builder: expose `align` and `sideOffset` props on `<NavMenuContent />` itself (forward to internal Positioner). Mega panel uses `align="center"`, course dropdowns use `align="start"`.

---

## 6. Mobile collapse (<1280px)

The existing mobile drawer (`mobileOpen`) already lists all nav items. Spec the dropdown items as **inline accordion**:

```tsx
{link.hasDropdown ? (
  <details className="group">
    <summary className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-foreground/5">
      <span>{link.label}</span>
      <ChevronDown className="size-4 transition group-open:rotate-180" />
    </summary>
    <ul className="ml-3 flex flex-col gap-1 border-l border-border-2 pl-3 py-1">
      {/* For course dropdowns: 3 items (title only).
          For About Us: render only column headings as section labels and items below. */}
    </ul>
  </details>
) : (
  <Link href={link.href} ...>{link.label}</Link>
)}
```

Use **native `<details>`/`<summary>`** — zero JS, accessible, expands inline. The mega menu reduces to a flat list grouped by column heading; we drop icons + subtitles on mobile (cognitive load reduction).

---

## 7. Motion

**Path chosen: Base UI data-state + `tw-animate-css` utilities** (no framer-motion needed for dropdowns — keeps bundle lean; we already use it in `tw-animate-css` form on existing `ui/navigation-menu.tsx`).

Per `NavMenuContent`:

```
data-starting-style:opacity-0   data-starting-style:scale-95   data-starting-style:translate-y-1
data-ending-style:opacity-0     data-ending-style:scale-95     data-ending-style:translate-y-1
transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
origin-top
```

- **Open:** opacity 0→1, scale 0.95→1, translateY 4px→0, **200ms**.
- **Close:** mirror, **150ms** (slightly faster on dismiss feels right).
- **Easing:** `cubic-bezier(0.22, 1, 0.36, 1)` (matches the existing primitive — out-expo-ish).
- **Reduced motion:** add `motion-reduce:transition-none motion-reduce:transform-none` — instant snap, no animation, respects user OS setting.

Per `NavMenuTrigger` chevron:
```
className="transition-transform duration-200 group-data-[popup-open]:rotate-180"
```

---

## 8. Visual + interaction risks / decisions to confirm

| # | Decision | Risk | Mitigation |
|---|---|---|---|
| 1 | Mega menu uses Lucide icons, not raw Figma raster assets | Lucide doesn't 1:1 match the bespoke `hugeicons:*` glyphs | Acceptable — the brand reads cleaner with consistent icon family; user can swap to Iconify later. |
| 2 | About Us still navigates to `/about` (trigger is a button now, no longer a link) | Users who click the label expect navigation | Base UI Triggers are toggle buttons; we add a visible "About us" item as the first row in the mega menu's "Who we are" column linking to `/about`, so the destination is one click away. |
| 3 | Anchors `#pillars`, `#story`, `#vision` may not exist in `about/page.tsx` sections | Broken jumps | Builder must add `id` attributes to section roots in `<AboutPillarsSection />`, `<AboutStorySection />`, `<AboutVisionMissionSection />` during this PR. Verify each. |
| 4 | `/poses`, `/centers`, `/contact`, `/faculty`, `/blog`, `/blog/become-a-teacher` may not be implemented routes | 404s on hover-click | Acceptable for v1 — links resolve to Next.js 404 with our footer/header chrome. Add a `// TODO` comment near `nav-data.ts` listing routes that need implementing. |
| 5 | Mega menu width 1227px on viewports between 1280-1339px overflows the 1340px container padding | Horizontal scroll risk | `max-w-[calc(100vw-48px)]` clamps to viewport; layout reflows gracefully. |
| 6 | Course images shared across all three dropdown variants | Visual repetition feels lazy | Acceptable for first ship — image set can be expanded later when programs CMS data lands. |
| 7 | Standard dropdown drops Figma's `pr-119` weird right padding | Card may look narrower than Figma | Visual fidelity verified via screenshot comparison in QA step. |
| 8 | Header scroll behaviour: `bg-background/85` already applies when scrolled. The mega menu's frosted glass needs the page content visible behind, so the panel itself must be **portal-rendered above the header backdrop**. | Frost effect compromised if backdrop covers content | Base UI portals positioner to `document.body`, so this is automatic. Header `z-50`, panel `z-50` (same stack, but Portal renders later in DOM → on top). |
| 9 | Two trigger types in the same nav (`About Us` mega + 3 course dropdowns) using the **same** `NavMenu.Root` — Base UI manages only one open at a time | Closing one to open another may animate awkwardly with `viewport={false}` (no shared morph) | Test in QA; if jarring, add `data-instant:transition-none` to the Positioner so the move is instant (no slide), only fade. |
| 10 | `text-h5` line-height in globals.css is `1.438rem` (~23px) — tight for 24px font | Dropdown titles may clip descenders | Override per-element with `leading-tight` (1.25) where needed. |

---

## 9. Token mapping summary table

| Element | Figma | Tailwind token used |
|---|---|---|
| Mega panel bg | `rgba(255,255,255,0.7)` | `bg-surface-1/70` |
| Mega panel border | `rgba(123,123,123,0.2)` | `border-border-3/40` |
| Mega panel radius | `31px` | `rounded-[31px]` |
| Card bg | `#ffffff` | `bg-surface-1` |
| Card border | `rgba(123,123,123,0.2)` | `border-border-3/40` |
| Card radius | `22px` | `rounded-[22px]` |
| Column eyebrow | `#004435 @ 60%` | `text-text-brand-deep/60` |
| Item title | `#000000` | `text-text-secondary` |
| Item subtitle | `#8a8a8a` / `#4b4b4b` | `text-text-tertiary` |
| Footer "N Courses" link | `#048d6f` | `text-text-brand` |
| Thumbnail border | `#e2e2e2` | `border-border-3/40` |
| Thumbnail radius | `13px` | `rounded-[13px]` |
| Icon tile bg | `#ffffff` | `bg-surface-1` |
| Icon tile border | `rgba(182,182,182,0.31)` | `border-border-3/30` |
| Icon tile radius | `16px` | `rounded-2xl` (16px) |
| Divider | grey hairline | `border-t border-border-2` |
| Body font (titles, subtitles) | Instrument Sans | inherits — `font-serif` is Instrument Sans in this project |
| Eyebrow font | Manrope ExtraBold | inherits — Manrope is the heading font; `font-extrabold` |

---

## 10. Build order (single component-builder pass)

1. Create `nav-types.ts`, `nav-data.ts` (pure TS — no JSX).
2. Create `site-header.nav-menu.tsx` (Base UI wrapper, `viewport={false}`, motion classes).
3. Create `dropdown-card.tsx` (renders a `DropdownContent`).
4. Create `mega-menu-panel.tsx` (renders columns).
5. Rewrite `site-header.tsx` desktop nav block — replace `HeaderLink` map with `NavMenu`. Keep logo, search, CTA, mobile button unchanged. Update mobile drawer's dropdown items to `<details>` accordion.
6. Add `id` attributes to about-page sections for anchor links to work.
7. Smoke test:
   - `/` (home) — hover About Us, see mega menu; hover Teacher Courses, see card.
   - `/about` — same nav, mega menu items resolve to `/about#...`.
   - Mobile 375px — tap dropdown link, accordion expands inline.
   - Keyboard — Tab through nav, ArrowDown opens, ArrowDown traverses items, Enter follows link, ESC closes.
   - Reduced-motion OS setting — instant open, no animation.

---

## 11. Done criteria

- [ ] All 4 `hasDropdown: true` nav links open the correct panel on hover (100ms delay) and click.
- [ ] Mega menu renders 3 columns × correct counts (4 + 3 + 3) with Lucide icons in branded tiles.
- [ ] Standard dropdown renders 3 items × thumbnail + icon + title + subtitle + "N Courses" footer link.
- [ ] Both panels close on ESC, click-outside, and selecting a link.
- [ ] Focus returns to trigger after ESC.
- [ ] No hardcoded hex in the new component files (only via Bodhi tokens or named shadow values).
- [ ] Mobile drawer shows accordion for dropdown links; native `<details>` semantics.
- [ ] No console errors, no TypeScript errors, no broken imports.
- [ ] Visual diff against Figma screenshots within ~5% (color, spacing, typography).

---

**End of plan — ready for a single component-builder execution pass.**

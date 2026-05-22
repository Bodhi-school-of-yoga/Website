# Cross-Page Decomposition v2 — 7 Pages + 2 Card Variants

Generated 2026-05-22. Source-of-truth for the next build pass.

## User Overrides (must respect)

1. **No mode-badge pills on cards.** Figma renders an "Online" / "Offline" chip in card meta. We suppress on render. `ProgramCard.modeBadge` prop is kept (API surface stable) but no page passes it. Card meta row also drops the redundant "Online" / "Offline" meta item; keep only week-count + language.
2. **Single shared navbar across all 7 pages.** Confirmed below — same Figma Header component instance, different `data-node-id`s.
3. **Per-page hero images.** Hero `image 25` ref differs per page. URLs collected below; assets not yet downloaded. Use `/images/hero/hero-photo.jpg` as placeholder.
4. **Two-font system only:** Host Grotesk for all headings, DM Sans for everything else. Fraunces / Manrope / Instrument Sans / Playfair Display / Geist Mono are out.

## Per-Page Summary

| Node | Slug | Archetype | Hero H1 | Hero image ref |
|---|---|---|---|---|
| 1:1547 | /teacher-courses/online | rich-landing | Yoga Teacher Training Courses (white) | (needs re-fetch — context is XML-only) |
| 1:4756 | /teacher-courses/offline | rich-landing | Yoga Teacher Training Courses (white) | (needs re-fetch) |
| 1:2343 | /advanced-certifications/online | lean-listing | Online Advanced Certifications (white) | mcp asset 238c54fa |
| 1:5551 | /advanced-certifications/offline | lean-listing | Offline Advanced Certifications (white) | mcp asset 34d5ebce |
| 1:3138 | /yoga-courses/online | lean-listing | Online Yoga **Courses** (last word #3fffd5) | mcp asset ae2f9fd0 |
| 1:6345 | /yoga-courses/offline | lean-listing | Offline Yoga **Courses** (#3fffd5) | mcp asset 413e9523 |
| 1:7174 | /tips/yoga-teacher | lean-listing-articles | Tips to become a **successfull yoga teacher** (#3fffd5) | mcp asset bb7c1c68 |

### Section order

**Lean listing (Advanced & Yoga & Tips — 5 pages):**

`SiteHeader → MarketingHero (eyebrow + h1 + subtitle + breadcrumb) → FilterPillBar → CoursesGrid|ArticlesGrid → SiteFooter`

**Rich landing (Teacher Training — 2 pages):**

`SiteHeader → MarketingHero (large) → PopularCoursesGrid → WhyBodhiSection → AccreditationsSection → FeaturedCoursesBand → ClosingCtaSection → TestimonialsSection → SiteFooter`

## Cross-Page Variance Table

| Aspect | TT Online (1:1547) | TT Offline (1:4756) | Adv Online (1:2343) | Adv Offline (1:5551) | Yoga Online (1:3138) | Yoga Offline (1:6345) | Tips (1:7174) |
|---|---|---|---|---|---|---|---|
| Navbar | same | same | same | same | same | same | same |
| Header inst id | 1:2342 | (n/a) | 353:13857 | 353:13903 | 353:13949 | 353:13995 | 353:13811 |
| Hero band height | ~872px | ~872px | 421px | 421px | 421px | 421px | 421px |
| Hero h1 color | white | white | white | white | 2-tone white+mint | 2-tone | 2-tone |
| Filter pill bar | no | no | yes | yes | yes | yes | no |
| Card variant | course | course | course | course | course | course | article |
| Hero image ref | TBD | TBD | 238c54fa | 34d5ebce | ae2f9fd0 | 413e9523 | bb7c1c68 |

**Proves:** navbar identical (one component), hero imagery differs (7 distinct refs), card chrome only differs by variant.

## Navbar Audit (current vs Figma)

**Active header in use:** `apps/web/src/components/layout/header.tsx` (imported by `apps/web/src/app/layout.tsx` as `Header`).
**Secondary header file:** `apps/web/src/components/site-header.tsx` exists but is NOT wired into `layout.tsx`. It's closer to Figma — recommend pivoting to it.

| # | Field | Current (layout/header.tsx) | Figma | Severity |
|---|---|---|---|---|
| 1 | About link label | "About Us" | "About Bodhi" | critical |
| 2 | About link caret | none | has caret | minor |
| 3 | Wordmark font | var(--font-serif) = Playfair Display | Fraunces italic → target Host Grotesk italic | critical |
| 4 | Tagline label | "School of Yoga" | "School of yoga" (CSS-uppercased) | minor (visually equiv) |
| 5 | Tagline font-family | Host Grotesk (current wiring) | Manrope → target DM Sans | critical |
| 6 | Tagline font-size | text-[0.6rem] ≈ 9.6px | 12px | critical |
| 7 | Tagline tracking | tracking-[0.2em] ≈ 3.2px | 2.96px | minor |
| 8 | Nav link font-size | text-sm (14px) | 17px | critical |
| 9 | Nav link font-family | inherits font-sans | Instrument Sans → target DM Sans | critical |
| 10 | Nav link color | text-foreground/80 | #ffffff on hero | critical |
| 11 | Nav link gap | gap-2 (8px) | 39px | critical |
| 12 | CTA background | bg-[oklch(0.85_0.10_168)] | #8ee0ce = brand-shade | minor |
| 13 | CTA text color | text-foreground | #1d3e59 = text-text-primary | minor |
| 14 | CTA font-weight | medium (500) | semibold (600) | minor |
| 15 | CTA height | py-2.5 | 44px fixed | minor |
| 16 | Trailing avatar | missing | 44x44 image before CTA | minor |
| 17 | Search icon vs avatar | search lucide icon | avatar image (no search) | minor |
| 18 | Position behavior | static (no overlay) | absolute top:20 over hero | critical |
| 19 | Container width | shared Container | 1462px fixed | minor |

**Verdict:** layout/header.tsx is significantly off-spec. site-header.tsx is closer (scroll-transparent overlay, brand-shade CTA, font-serif italic, 44x44 buttons) and only needs: rename About Us → About Bodhi (with caret), set nav link size to 17px, increase gap to ~39px, and the global font-wiring fix below.

## Font Audit

### Required (user rule)
| Family | Used for | Loaded today? | Wired to today | Wired to (target) |
|---|---|---|---|---|
| Host Grotesk | all headings | yes | `--font-sans` (wrong) | `--font-heading` |
| DM Sans | all body, subtext, display, breadcrumb, eyebrow, nav, CTA, meta | yes | `--font-heading` (wrong) | `--font-sans` |

The two variables are swapped in `apps/web/src/app/layout.tsx`. Fix is one-liner: swap the `variable:` strings on the `Host_Grotesk()` and `DM_Sans()` calls.

### Remove
| Family | Loaded today? | Action |
|---|---|---|
| Playfair Display | yes (--font-serif) | Drop import + variable in layout.tsx; remove `--font-serif` from globals.css `@theme`; replace `font-serif` usages with `font-heading italic` |
| Geist Mono | yes (--font-geist-mono) | Drop import + variable; remove `--font-mono` from `@theme` |
| Fraunces | no | n/a (Figma references it for wordmark; we ignore) |
| Manrope | no | n/a (Figma references it for tagline/card CTA; we ignore) |
| Instrument Sans | no | n/a (Figma references it for nav/CTA; we ignore) |

After font fix, semantic Tailwind utilities work as expected:
- `font-heading` → Host Grotesk → all headings
- `font-sans` (default for `html`) → DM Sans → everything else

## Card Audit

### Course card (Figma 1:6256, 472×431)
ProgramCard default variant already matches the white card chrome (24px radius, hairline border, shadow-card, dashed bottom divider, footer with instructor avatar + "View Program →" CTA). Deviations:

- **Title font-family:** Figma = Instrument Sans → user rule = Host Grotesk via `font-heading`. After font fix, default `text-h5` already inherits font-sans which becomes DM Sans — explicitly set `font-heading` on the title to force Host Grotesk.
- **Title color:** Figma = `#2f4a3e`. Either add a new token `--color-text-card-title: #2f4a3e` or alias to existing `text-brand-green-deep` (#004b3b — visibly close).
- **CTA color:** Figma = `#038f9f` = `text-brand-teal`. Update default CTA color from `text-brand-primary` to `text-brand-teal`.
- **Meta dot separator color:** Figma = `#c8a96e` opacity 0.5. Current `bg-warm/50` is a passable substitute; could add `--color-amber-warm: #c8a96e` if precision matters.
- **Mode badge:** Figma renders an "Online" chip in meta. Per user rule, suppress. Also drop "Online"/"Offline" from meta array on render — keep only weeks + language.

### Article card (Figma 1:7544, 472×321)
ProgramCard `variant="article"` already matches. Notable: image extends further down into the card (Figma `inset-[-88.1px -1.1px 99.9px -1.1px]` vs course `179.9px` bottom) — i.e. article cards have a taller image area / shorter overall card. Existing component renders this correctly via the absent footer block; aspect ratio 413/235 derived works.

After font-wiring fix, `font-heading` on `CardTitle` (already set for article variant) becomes Host Grotesk — matches user rule even though Figma references Instrument Sans.

### Shared card chrome (both variants)
- bg-white, border 1.098px rgba(0,0,0,0.08), radius 24.151px → current `rounded-2xl border-border-1` is close (~16px radius). Consider `rounded-3xl` (24px) for fidelity.
- shadow `0px 4px 48.3px rgba(226,226,226,0.25)` → `shadow-card` token matches.
- padding `22.098px 31.836px 24.098px` → `px-8 pt-6 pb-6` is close.

## Build Implications

### Keep
- `ProgramCard` (course + article variants)
- `shadow-card` token, brand-shade / text-text-primary / text-brand-deep tokens
- Top-level section thinking (hero / grid / footer)

### Fix (in order)
1. **Font wiring** in `apps/web/src/app/layout.tsx` — swap variable assignments; drop Playfair Display + Geist Mono. Remove `--font-serif` and `--font-mono` from globals.css `@theme` block.
2. **Header consolidation.** Delete `apps/web/src/components/layout/header.tsx`; import `SiteHeader` (from `site-header.tsx`) into `app/layout.tsx`. In `site-header.tsx`:
   - Rename "About Us" → "About Bodhi"; add a caret (kind: "mega" with About Bodhi mega menu)
   - Set nav-link size to ~17px (or `text-subtext-2`); gap to ~39px (or `gap-10`)
   - Replace `font-serif` wordmark with `font-heading italic`
   - On dark-hero pages, force nav link / wordmark / tagline color to white
3. **ProgramCard** — set `font-heading` on the course-variant title; switch CTA color to `text-brand-teal`; drop "Online"/"Offline" meta items at the call sites; never pass `modeBadge`.

### Add
- **MarketingHero** section component. Props: `heightVariant: "compact" | "large"`, `breadcrumb: string[]`, `eyebrow: string`, `h1: string | { white: string; accent: string }`, `subtitle: string`, `imageSrc: string`. Renders image-band with overlay, white text, eyebrow in text-mini white uppercase 2.42px tracking.
- **FilterPillBar** component — 4 horizontal pill chips. bg `rgba(255,255,255,0.71)` with `backdrop-blur-md`, border `rgba(0,0,0,0.15)`, drop-shadow, DM Sans 12px uppercase 1.93px tracking.
- **CoursesGrid** wrapper — 3-col responsive grid of ProgramCard (course variant), gap 31px row / 28px col, max-width 1472px.
- **ArticlesGrid** wrapper — same chrome, article variant.
- **Pages** — 7 route files matching slugs in the table.
- **Tokens** — `#2f4a3e` for card title (or alias to existing brand-green-deep); `#3fffd5` for hero accent (mint-bright); optionally `#c8a96e` for meta dot.
- **TODO** — re-fetch `get_design_context` for 1:1547 and 1:4756 to capture real teacher-training hero asset refs; download all 7 hero images via Figma MCP `upload_assets` and place under `apps/web/public/images/hero/<page-slug>.jpg`.

### Sequential build order
1. Fix font wiring.
2. Consolidate header → SiteHeader.
3. Build MarketingHero + FilterPillBar + Grid wrappers.
4. Wire 7 page routes (placeholder hero image OK).
5. Visual QA per page; re-fetch teacher-training context; download real hero assets.

## Open uncertainties
- **Teacher-training hero asset refs** — context files are metadata-only; need a `get_design_context` re-run.
- **Rich-landing sub-sections** — inferred from y-coords; not visually confirmed.
- **Trailing avatar in nav** — Figma shows a 44x44 image before the CTA. Could be account avatar; site-header.tsx currently shows a Search icon. Pick a direction.

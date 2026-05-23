# Bodhi — Architecture

This is the human + AI reference for the Bodhi codebase. Read this first.
For visual design tokens (colors, type, spacing), read [`/DESIGN.md`](../DESIGN.md).

---

## Stack

| Layer    | Tech                                                          |
| -------- | ------------------------------------------------------------- |
| Web      | Next.js 16 (App Router) · React 19 · TypeScript 5             |
| Styling  | Tailwind CSS 4 (PostCSS plugin) · `tw-animate-css`            |
| UI core  | shadcn-style primitives · `@base-ui/react` for headless parts |
| Motion   | `framer-motion` 12                                            |
| Data     | TanStack Query 5 · Axios                                      |
| CMS      | Strapi 5 (separate app, PostgreSQL backend)                   |
| Database | PostgreSQL 16 (Docker for local)                              |

---

## Repo map

```
bodhi/
├── apps/
│   ├── web/                          Next.js site (this is the design code)
│   │   ├── src/
│   │   │   ├── app/                  Routes + layout (App Router)
│   │   │   ├── components/
│   │   │   │   ├── sections/         Page sections (54 files)
│   │   │   │   ├── ui/               Reusable primitives (28 files)
│   │   │   │   ├── shared/           Container, SectionHeading
│   │   │   │   ├── nav/              Header navigation parts
│   │   │   │   ├── blog/ classes/ contact/ instructors/  Page-scoped blocks
│   │   │   │   └── recorded-class/   Page-scoped (pre-recorded courses)
│   │   │   ├── lib/                  utils (`cn`)
│   │   │   ├── types/                shared TS types
│   │   │   └── app/globals.css       Design tokens live here
│   │   └── public/
│   │       └── images/<section>/<slug>.<ext>   See "Images" below
│   └── cms/                          Strapi instance
├── docs/                             Generated docs (this file, codebase-graph, etc.)
├── DESIGN.md                         Canonical design-system spec
├── CLAUDE.md                         Harness + AI agent instructions
└── README.md                         Setup quick-start
```

---

## Route → Section → Primitive flow

A page composes sections; a section composes primitives. Keep that direction.

```
src/app/<route>/page.tsx
        │
        ├─ <SiteHeader />               (top-level chrome)
        ├─ <SectionA … />               from components/sections/
        │     └─ <Card> <Button> …      from components/ui/
        ├─ <SectionB … />
        └─ <SiteFooterBlock />
```

Server vs client:
- Pages and section files are **server components** by default. Render hardcoded copy/props as static HTML.
- A section that needs hooks (`useState`, `useEffect`, `useReducedMotion`) or event handlers adds `"use client"` as its first line.
- UI primitives that contain interactive state are always client (`"use client"` at top).

---

## Design tokens

Single source of truth: `apps/web/src/app/globals.css`. Tailwind reads CSS variables via the v4 `@theme` directive — that's why utilities like `bg-surface-1` or `text-h2` resolve.

**Always use a token. Never hand-code hex, rgba, or px font sizes in components.**

### Colors

| Class                  | Variable                | Purpose                              |
| ---------------------- | ----------------------- | ------------------------------------ |
| `bg-surface-0/1/2`     | `--color-surface-*`     | Background tiers                     |
| `bg-surface-cream`     | `--color-surface-cream` | Warm-tinted background               |
| `text-text-primary`    | `--color-text-primary`  | Headings, primary copy               |
| `text-text-tertiary`   | `--color-text-tertiary` | Muted body, captions                 |
| `text-text-brand`      | `--color-text-brand`    | Brand accent inside text             |
| `text-text-inverse`    | `--color-text-inverse`  | Text on dark surfaces (replaces white) |
| `bg-brand-primary`     | `--color-brand-primary` | Primary CTAs                         |
| `bg-brand-dark`        | `--color-brand-dark`    | Dark hero overlays                   |
| `bg-brand-shade`       | `--color-brand-shade`   | Mint accent                          |
| `bg-mint-frost / -cream` | `--color-mint-*`      | Soft section backgrounds             |
| `border-border-1/2/3`  | `--color-border-*`      | Border tiers                         |

If a Figma frame uses a color that doesn't map to an existing token, **add a token to `globals.css` first**, then use it. Don't inline.

### Typography

| Class       | What                              |
| ----------- | --------------------------------- |
| `text-h1`   | Largest display (hero)            |
| `text-h2`   | Section heading                   |
| `text-h3`   | Sub-section heading               |
| `text-h4`   | Card title                        |
| `text-h5`   | Small label                       |
| `text-body-md` | Body copy                      |
| `text-body-sm` | Small body                     |
| `text-mini` | Captions, eyebrows, badges        |

Each token sets size + line-height + letter-spacing + weight as one class. Don't combine with `leading-*` or `tracking-*` overrides except for one-off layout fixes.

### Scale (viewport-driven)

`globals.css` defines `--t` that interpolates `0..1` across width `1280px → 1920px`. Typography and spacing scale through it. Net effect: the design is byte-identical at 1920px and compresses cleanly down to 1280px without manual breakpoints for type sizes.

The `.page-px` utility (16px → 96px) sets section-gutter padding; `.nav-px` does the header. Use these for horizontal gutters.

---

## Images

```
apps/web/public/images/
├── about/             About page
├── accreditations/    Yoga Alliance, RYS badges
├── centers/           Studio location photos
├── courses/
│   ├── aerial-yoga/   { hero, prereq-left, prereq-right }.png
│   └── yoga-300-hour-ytt/ { hero, eligibility, prereq-left, prereq-right }.png
├── hero/              Page heroes (teacher-training-*, yoga-courses-listing, foreground, tips)
├── nav/               Header icons
├── pre-recorded/      Pre-recorded courses listing
├── programs/          Program-card thumbnails (mat-pilates, mudra-therapy, weight-loss-coach, …)
├── recorded-classes/  Recorded-course hero + lesson-XX.png + unlock-bg
├── stats/             Stats-band photos
├── testimonials/      Student portraits
├── trainers/          Instructor portraits (atheesh-kumar.png, sneha-shankar.png, …)
├── what-we-do/        Home WhatWeDo section
├── why-bodhi/         WhyBodhi section
├── workshop-detail/   Workshop detail page
└── workshops/         Workshop listing thumbnails
```

**Rules:**
1. Folder = section / page area. Filename = content slug (`atheesh-kumar.png`, not `instructor-1.png` and never `node-1-XXXX.png`).
2. Reference with absolute `/images/<section>/<slug>.<ext>` strings. Don't build `ASSET()` macros — direct strings grep cleanly.
3. Use `next/image` (`<Image src=…/>`), not `<img>`. Always provide `alt`. Use `fill` for absolute-positioned art; explicit `width`/`height` otherwise.
4. Figma scratch exports live in `/_workspace/` (gitignored). Move into `/public/images/` only when wired into a real page, with a content name.

---

## CMS

`apps/cms` is a separate Strapi 5 instance. Content types defined under `apps/cms/src/api/`: `yoga-class`, `instructor`, `blog-post`, `testimonial`.

Today most page content is hardcoded in `apps/web/src/app/*/page.tsx`. When CMS wiring lands:
- Fetch via TanStack Query in client components, or via `fetch` in server components.
- Strapi REST API at `NEXT_PUBLIC_CMS_URL` (set in `apps/web/.env.local`).
- Type the response against `apps/web/src/types/`.

---

## How to add a new page section

1. Get the Figma frame and either use `/figma-to-component`, or build by hand.
2. Create `apps/web/src/components/sections/my-section.tsx`.
3. Start with a header comment:
   ```tsx
   // MySection — renders the "What We Do" band (Figma node 1:XXXX).
   ```
4. Export the prop type:
   ```tsx
   export type MySectionProps = { … };
   ```
5. Compose primitives from `@/components/ui/` and `@/components/shared/`. Use design-token classes only — no inline hex, no `clamp()` in style, no hardcoded `text-gray-*` or `text-white` (use `text-text-inverse`).
6. Add `"use client"` only if you need hooks or event handlers.
7. For motion: import `motion` + `Variants` from `framer-motion`, declare variants at module scope, respect `useReducedMotion()`.
8. Import it in the page: `import { MySection } from "@/components/sections/my-section";`.

## How to add a new UI primitive

1. Check `components/ui/` first — most cases (button, card, badge, chip, breadcrumb, …) already exist.
2. Create `components/ui/my-primitive.tsx` with header comment, prop type, and `cva` variants if there are multiple looks.
3. Use design tokens. Avoid `tw-merge` outside `cn` — the project's `cn` already wraps it.
4. Export both the component and its props type.

---

## Conventions

- **Filenames:** kebab-case (`hero-section.tsx`). **Components:** PascalCase (`HeroSection`).
- **Imports:** use `@/…` alias (resolves to `apps/web/src/`). No deep relative imports.
- **Types:** never `any`. Discriminated unions for variant-style props.
- **Comments:** only where the *why* is non-obvious (hidden constraint, workaround, invariant). Don't narrate the code.
- **One section = one file.** Split files that exceed ~250 lines.
- **Pages stay thin.** They wire up sections and provide content data; logic lives in sections / hooks.

---

## `_workspace/` and Figma harness

`_workspace/` and `_workspace_prev/` are **local design scratch**, gitignored. They hold raw Figma exports (`00_input.json`, `01_figma_context_*.json`), build logs, and QA reports produced by the figma-to-component pipeline. Regenerated on each run.

When the pipeline ships a section to production, its images move to `/public/images/<section>/` with content names; its component lands in `components/sections/`. The `_workspace/` artifacts stay local and don't need to be committed.

The Figma harness skills + agents are documented in `/CLAUDE.md`.

---

## Local development

```bash
# Web
cd apps/web && npm run dev          # http://localhost:3000

# CMS (separate terminal)
cd apps/cms && npm run develop      # http://localhost:1337  (admin + /api)

# Type check
cd apps/web && ./node_modules/typescript/bin/tsc --noEmit

# Lint
cd apps/web && npm run lint
```

Env files (not in git):
- `apps/web/.env.local` — `NEXT_PUBLIC_CMS_URL`
- `apps/cms/.env` — DB URL, JWT secret, app keys
- Root `docker-compose.yml` brings up Postgres locally.

Ports: web `3000`, cms `1337`, postgres `5432`.

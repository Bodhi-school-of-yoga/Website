# Module Catalog — Bodhi Codebase

Scope: `apps/web` (Next.js 15, 53 files) and `apps/cms` (Strapi, 32 files). Root configs collapsed into a single `root-infra` node. `.agents/skills/*` and `.claude/*` excluded.

Total nodes: 31 (3 L0 workspaces + 12 L1 modules + 16 L2 sub-modules).

---

## L0 — Workspaces

### `apps/web` — Web App (Next.js)
Next.js 15 App Router frontend. Uses TypeScript, Tailwind v4, shadcn/ui, Radix primitives, framer-motion, axios, and TanStack React Query. Path alias `@/` → `apps/web/src/`. Talks to Strapi over HTTP (`NEXT_PUBLIC_STRAPI_URL`).

### `apps/cms` — CMS (Strapi)
Strapi v5 headless CMS, TypeScript, PostgreSQL backend (env-driven). Four content types power the web app. No custom controllers — everything uses `factories.createCoreX` defaults.

### `root-infra` — Root Configs
`package.json`, `docker-compose.yml`, `.env.example`, `README.md`, `.gitignore`, `skills-lock.json`. The compose file likely runs Postgres + the two apps; root package.json wires the monorepo.

---

## L1/L2 — apps/web

### `apps/web/src/app` (pages, L1)
The App Router root. `layout.tsx` is the global shell — imports Header, Footer, Providers (React Query), loads Google fonts (Host Grotesk, DM Sans, Geist Mono, Playfair Display), and applies `globals.css`. Each subfolder is a route segment.

**L2 routes:**
- `apps/web/src/app/page` — Home (`/`). Composes hero/features/classes-preview/testimonials/cta + Header.
- `apps/web/src/app/about` — `/about`, delegates to `<AboutContent />`.
- `apps/web/src/app/blog` — `/blog`, delegates to `<BlogContent />`.
- `apps/web/src/app/blog/[slug]` — dynamic blog post route with `generateMetadata`.
- `apps/web/src/app/classes` — `/classes`, delegates to `<ClassesContent />`.
- `apps/web/src/app/contact` — `/contact`, delegates to `<ContactContent />`.
- `apps/web/src/app/instructors` — `/instructors`, delegates to `<InstructorsContent />`.

Each non-home page is a thin wrapper; the heavy UI lives in `src/components/<feature>`.

### `apps/web/src/components` (components, L1)
All React components. Mostly client components (`"use client"`) using framer-motion for animation and Lucide icons. Grouped by feature plus shared primitives plus shadcn UI registry.

**L2 groups:**
- `components/home` — five home-page sections (hero, features, classes-preview, testimonials, cta).
- `components/blog` — `blog-content` (listing) and `blog-post-content` (single post). Currently uses inline mock arrays, not yet wired to lib/api.
- `components/classes` — `classes-content`, the /classes UI.
- `components/contact` — `contact-content` (form + contact info).
- `components/instructors` — `instructors-content` (instructor profile grid).
- `components/layout` — `header` (nav menu with mobile Sheet) and `footer`. Mounted by `app/layout.tsx`.
- `components/shared` — `container` (max-width wrapper using `cn` from lib/utils) and `section-heading`. Used throughout feature components.
- `components/ui` — shadcn primitives: badge, button, card, navigation-menu, separator, sheet. Wraps Radix.
- `components/about-content` — loose top-level file (not in a subfolder) rendering the /about body. Listed separately because it doesn't fit the feature-folder pattern.

### `apps/web/src/lib` (lib, L1)
Cross-cutting utilities (5 files):
- `strapi.ts` — axios client targeting `${NEXT_PUBLIC_STRAPI_URL}/api`. Exports `fetchAPI<T>`.
- `api.ts` — server-side data fetchers (`getClasses`, etc.) built on `fetchAPI`. Used in Server Components / SSR with graceful fallbacks.
- `queries.ts` — React Query hooks (`"use client"`) on top of `fetchAPI` for client-side data.
- `providers.tsx` — `QueryClientProvider` wrapper used in `app/layout.tsx`.
- `utils.ts` — `cn()` (clsx + tailwind-merge), the standard shadcn helper.

### `apps/web/src/types` (types, L1)
`strapi.ts` — generic `StrapiResponse<T>`, `StrapiImage`, and domain interfaces `YogaClass`, `Instructor`, `BlogPost`, `Testimonial`. Consumed by lib/api, lib/queries, and any component that touches Strapi data.

### `apps/web/config` (config, L1)
`next.config.ts`, `tsconfig.json` (declares `@/*` alias), `package.json`, `components.json` (shadcn registry config).

---

## L1/L2 — apps/cms

### `apps/cms/src` (lib, L1)
Two boilerplate files:
- `src/index.ts` — Strapi lifecycle hooks (`register`, `bootstrap`, `destroy`) all empty.
- `src/admin/app.ts` — admin panel customization stub.

Everything domain-relevant lives under `src/api`.

### `apps/cms/src/api` (api, L1)
Four Strapi content-type APIs, each with the standard schema/controller/route/service quartet. All controllers/routes/services are one-liners delegating to `factories.createCoreX("api::<name>.<name>")`. The interesting metadata is in the schema files.

**L2 content types:**
- `apps/cms/src/api/blog-post` — `collectionName: blog_posts`. Fields: title, slug, body, cover image (inferred), `draftAndPublish: true`.
- `apps/cms/src/api/instructor` — instructor profiles content type.
- `apps/cms/src/api/testimonial` — student testimonial entries.
- `apps/cms/src/api/yoga-class` — yoga class catalog; likely relates to instructor.

### `apps/cms/config` (config, L1)
Six TS configs, all env-driven via `env()`:
- `admin.ts` — admin JWT secret + API token salt.
- `api.ts` — REST defaults (page size, prefix).
- `database.ts` — Postgres client with full pool/SSL config from env.
- `middlewares.ts` — Strapi middleware stack.
- `plugins.ts` — plugin registrations.
- `server.ts` — host/port/app keys.

---

## Notes on granularity

- Kept feature components at L2-by-folder rather than per-file to stay under 50 nodes. Per-file granularity for the 22 components would not change the dependency graph's shape.
- Strapi controllers/routes/services collapsed into the L2 content-type node — they are pure factory delegations, not separate logical modules.
- No nodes skipped for unreadability. The `about-content.tsx` file is registered as its own L2 group because it sits at the components root rather than in a feature folder; downstream analyzer should treat it like any other component group.

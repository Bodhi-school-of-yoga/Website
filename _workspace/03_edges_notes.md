# Edge Analysis — Bodhi Codebase

Scope: static `import` edges across `apps/web/src/**` and `apps/cms/src/**`, plus runtime `fetches` edges from `apps/web/src/lib` to the four Strapi content-type APIs.

Total edges: 29 (25 `imports` + 4 `fetches` + 0 `references`).
External dependencies: 19 (Next, React, framer-motion, lucide-react, six `@base-ui/react/*` primitives, axios, @tanstack/react-query, class-variance-authority, clsx, tailwind-merge, @strapi/strapi).
Cycles: none.
Unresolved imports: none.

## Top 10 strongest couplings (by weight)

1. `apps/web/src/components/home` → `apps/web/src/components/shared` (8) — every home section pulls `Container`/`SectionHeading`.
2. `apps/web/src/app/page` → `apps/web/src/components/home` (5) — Home route imports all five sections directly.
3. `apps/web/src/components/home` → `apps/web/src/components/ui` (5) — Button/Card/Badge usage across the five home sections.
4. `apps/web/src/components/blog` → `apps/web/src/components/ui` (4) — blog-content and blog-post-content lean on Card/Badge/Button.
5. `apps/web/src/components/classes` → `apps/web/src/components/ui` (3) — Button/Card/Badge in classes-content.
6. `apps/web/src/components/blog` → `apps/web/src/components/shared` (3) — Container + SectionHeading.
7. `apps/web/src/lib` → `apps/web/src/types` (3) — strapi.ts, api.ts, queries.ts all import StrapiResponse + domain types.
8. `apps/web/src/components/classes` → `apps/web/src/components/shared` (2).
9. `apps/web/src/components/contact` → `apps/web/src/components/ui` (2).
10. `apps/web/src/components/instructors` → `apps/web/src/components/shared` (2).

## Notable patterns

- **Star topology around `components/shared` and `components/ui`.** Every feature component group (home, blog, classes, contact, instructors, layout, about-content) imports from both. Shared is essentially the project's design-system glue: 8 incoming edges to shared (Container/SectionHeading) and 7 to ui (Radix-based shadcn primitives). This is the natural shape — feature groups are siblings that converge on shared primitives.

- **Pages are thin shells.** Every page node in `app/*` has exactly one edge to its matching feature component group (e.g. `app/classes → components/classes` weight 1). The only fat page is `app/page` (Home), which imports five home sections + Header (6 edges total). All UX lives in `components/<feature>`.

- **`lib` is the single Strapi gateway.** Only `apps/web/src/lib` has runtime `fetches` edges to the CMS — neither pages nor components fetch directly. `strapi.ts` provides the axios client, `api.ts` wraps server-side fetchers, `queries.ts` wraps React Query hooks. This is clean separation; components consume already-shaped data.

- **`types/strapi.ts` is read-only.** It has only inbound edges (3 from `lib`, plus indirectly from any component using lib's return types). No outgoing edges. Good — types should not pull in runtime code.

- **CMS side is import-flat.** Every controller/route/service/schema file in `apps/cms/src/api/*` imports only `@strapi/strapi` factories. There are zero internal cross-module edges within `apps/cms` (no shared util, no cross-content-type references). All four content types are mutually independent leaves.

- **Web↔CMS boundary is one-directional.** `apps/web/src/lib → apps/cms/src/api/{yoga-class, instructor, blog-post, testimonial}` via HTTP. CMS never knows about web. Boundary edges total 4 (one per content type), kind `fetches`.

- **Blog content is decoupled from lib.** `components/blog/*` does not import from `lib` (uses inline mock data per node-notes); the only fetches are from `lib` itself. So at present the blog UI is unwired from the live CMS data path — a documented gap, not a cycle.

- **`@base-ui/react/*` is the Radix-equivalent primitive layer.** Six different submodules are imported across the shadcn ui components (navigation-menu, merge-props, use-render, dialog, separator, button). This is the most heavily used external scope outside of React/Next itself.

## Cycles

None detected at node level. The dependency graph is a DAG with layering roughly:

```
app/*  →  components/<feature>  →  components/{shared,ui}
                              ↘
   lib  →  types                  (shared also → lib for cn helper)
   lib  ──fetches──→  cms/api/*
```

The one cross-layer edge is `components/shared → lib` (`Container` imports `cn`). It does not introduce a cycle because `lib` has no edges back into `components`.

## Web↔CMS boundary edges (explicit)

| Source (web)            | Target (cms)                       | Kind    | Evidence                       |
|-------------------------|-------------------------------------|---------|--------------------------------|
| apps/web/src/lib        | apps/cms/src/api/yoga-class         | fetches | apps/web/src/lib/api.ts:14     |
| apps/web/src/lib        | apps/cms/src/api/instructor         | fetches | apps/web/src/lib/api.ts:40     |
| apps/web/src/lib        | apps/cms/src/api/blog-post          | fetches | apps/web/src/lib/api.ts:55     |
| apps/web/src/lib        | apps/cms/src/api/testimonial        | fetches | apps/web/src/lib/api.ts:86     |

All four are mediated by `fetchAPI` in `apps/web/src/lib/strapi.ts`, which hits `${NEXT_PUBLIC_STRAPI_URL}/api/<endpoint>`.

## Notes on resolution

- The `@/` alias was resolved per `apps/web/tsconfig.json` (`@/* → ./src/*`).
- `apps/web/src/app/layout.tsx` was mapped to the parent node `apps/web/src/app` since no L2 node exists for the root layout itself.
- `components/ui/sheet.tsx` imports `components/ui/button` — this is a self-edge inside the `components/ui` node and was skipped per the task spec.
- Type-only imports (`import type {...}`) are counted as `imports` edges; they still represent compile-time coupling.

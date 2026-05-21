# Repomix Index

- **Source**: `repomix-output.xml` (1.1 MB, 33,508 lines, ~17 min old at 2026-05-21 15:09 IST — fresh, reused)
- **Total files packed**: 245
- **Stale flag**: false

## Top-level distribution

| Path | File count | Treat as |
|------|-----------:|----------|
| `.agents/skills` | 153 | **Excluded from graph** — local skill docs, not application code |
| `apps/web` | 53 | Primary frontend (Next.js) |
| `apps/cms` | 32 | Backend (Strapi) |
| `.claude/settings.local.json` | 1 | Tooling config |
| `README.md`, `package.json`, `docker-compose.yml`, `.gitignore`, `.env.example`, `skills-lock.json` | 6 | Root configs |

## Scope decision

Graph the **application code**: `apps/web` (53 files) + `apps/cms` (32 files) = 85 source files. Root configs become a single "root infra" node.

## Entry-point signals

**apps/web (Next.js):**
- `apps/web/next.config.ts`, `apps/web/tsconfig.json`, `apps/web/package.json`, `apps/web/components.json` (shadcn)
- `apps/web/src/app/layout.tsx` — root layout
- `apps/web/src/app/page.tsx` — root page
- Page routes: `about`, `blog`, `blog/[slug]`, `classes`, `contact`, `instructors`
- Lib: `lib/api.ts`, `lib/queries.ts`, `lib/strapi.ts`, `lib/providers.tsx`, `lib/utils.ts`
- Types: `types/strapi.ts`

**apps/cms (Strapi):**
- `apps/cms/config/{admin,api,database,middlewares,plugins,server}.ts`
- `apps/cms/src/index.ts`, `apps/cms/src/admin/app.ts`
- Content types: `blog-post`, `instructor`, `testimonial`, `yoga-class` (each with schema/controller/route/service)

## Recommended grep patterns for dependency-analyzer

- `^import .* from ['"](.+)['"]` — TS/JS imports
- `from ['"]@/(.+)['"]` — Next.js path alias (`@/` → `apps/web/src/`)
- `fetch\(['"]?([^'"]*api[^'"]*)` — runtime fetches (Strapi API calls)
- `process\.env\.([A-Z_]+)` — env var references (cross-app coupling signal)

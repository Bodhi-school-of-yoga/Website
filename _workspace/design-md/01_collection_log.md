# token-collector — Collection Log

**Run:** 2026-05-21
**Scope:** `apps/web` (Next.js app)
**Project root:** `/Users/anukul/Desktop/bodhi`

## Detection

Globbed for the standard token-source patterns. The project uses **Tailwind v4**, which moves token configuration from `tailwind.config.*` into CSS via `@theme`. No standalone `tailwind.config.*`, `theme.*`, `tokens.*`, or DTCG JSON files exist under `apps/web`.

| Pattern | Result |
|---|---|
| `tailwind.config.{js,ts,cjs,mjs}` | Not found (Tailwind v4 — config lives in CSS) |
| `**/globals.css`, `**/tokens.css`, `**/variables.css`, `**/theme.css` | Found: `apps/web/src/app/globals.css` |
| `**/theme.{ts,js,tsx,jsx}` | Not found |
| `**/design-tokens.{ts,js,json}`, `**/tokens.{ts,js,json}` | Not found |
| `tokens/**/*.json`, `design-tokens/**/*.json` | Not found |
| `**/postcss.config.*` | Found: `apps/web/postcss.config.mjs` (no tokens, only loads `@tailwindcss/postcss`) |
| Broad CSS scan for `--*` | Only `apps/web/src/app/globals.css` matches |

## Parsed Sources

### 1. `apps/web/src/app/globals.css` (PRIMARY)
Three blocks parsed:

- **`@theme inline { ... }`** (L7–L54): 46 Tailwind v4 theme aliases that wire the `--color-*`, `--font-*`, `--radius-*` semantic API onto the underlying `:root` custom properties.
  - 34 color aliases (e.g. `--color-primary: var(--primary)`)
  - 4 typography aliases (`--font-sans`, `--font-mono`, `--font-heading`, `--font-serif`)
  - 7 radius aliases (`--radius-sm/md/lg/xl/2xl/3xl/4xl`)
- **`:root { ... }`** (L56–L94): 36 base/light-mode tokens — 35 colors in oklch + 1 `--radius: 0.75rem`.
- **`.dark { ... }`** (L96–L132): 35 dark-mode overrides for the same color tokens (no radius override).

Other directives noted but not parsed for tokens:
- `@import "tailwindcss";`
- `@import "tw-animate-css";` — third-party animation utility (does not export tokens here, only animation classes).
- `@import "shadcn/tailwind.css";` — shadcn registry import (no inline tokens emitted at this path within the workspace).
- `@custom-variant dark (&:is(.dark *));` — variant binding, not a token.

### 2. `apps/web/src/app/layout.tsx`
Four `next/font/google` declarations bind concrete font families to the CSS variables consumed by the `@theme` block:
- `--font-sans` ← Host Grotesk
- `--font-geist-mono` ← Geist Mono
- `--font-heading` ← DM Sans
- `--font-serif` ← Playfair Display (weights 400/500/600/700)

These are recorded as `category: typography`, `mode: font-binding`.

### 3. `apps/web/components.json`
shadcn/ui config. Declares `style: base-nova`, `baseColor: neutral`, `cssVariables: true`, `tailwind.css: src/app/globals.css`. Not itself a token source — confirms `globals.css` is the canonical home.

### 4. `apps/web/postcss.config.mjs`
PostCSS config with only the `@tailwindcss/postcss` plugin. No tokens.

## Categorization Notes

- All `--color-*`, `--*-foreground`, semantic role tokens (primary, secondary, accent, muted, destructive, ring, border, input, popover, card, sidebar*, chart-*, warm, sage) → `color`.
- `--font-*` → `typography`.
- `--radius`, `--radius-*` → `radius`.
- No tokens for `spacing`, `shadow`, `breakpoint`, `motion`, `z-index`, `opacity`, `border-width` are explicitly defined in this codebase — those rely on Tailwind defaults from `@import "tailwindcss"`.

## Conflicts

**None at the source level.** The same color names (e.g. `primary`, `background`) appear in both `:root` and `.dark`, but these are **mode variants**, not conflicts. They are preserved as separate rows with `mode: "light"` and `mode: "dark"` respectively.

The `@theme inline` aliases (e.g. `--color-primary`) reference `:root` variables (`var(--primary)`) — these are **aliases**, also not conflicts. Marked with `isAlias: true` and `aliasOf` pointing to the underlying token.

## Suspicious / Needs Human Review

- `shadcn/tailwind.css` is imported from the shadcn registry. If that registry contributes additional CSS variables at build time, those are NOT captured here (cannot resolve registry-imported CSS statically without running the build). Flag for the composer: "downstream registry CSS may add tokens we did not see."
- `tw-animate-css` likely contributes motion-related utilities. No tokens emitted here, but if the composer needs motion tokens, they should be sourced from that package's own theme rather than this codebase.
- The token system has no explicit `spacing`, `shadow`, `breakpoint`, or `motion` tokens — relies on Tailwind v4 defaults. The composer should either (a) call those out as "Tailwind defaults" or (b) request human confirmation of intended scales.

## Summary

- **Sources scanned:** 4 (1 primary CSS, 1 font binding, 1 shadcn config, 1 postcss config)
- **Tokens normalized:** 121
- **Conflicts:** 0
- **Mode-variant pairs:** 35 (light + dark for shared color names)
- **Aliases:** 46 (`@theme inline` block forwards onto `:root` vars)

Categories:
- `color = 105` (34 theme aliases + 35 light + 35 dark + 1 light-only `chart-2` etc., already counted)
- `typography = 8` (4 theme aliases + 4 font bindings from layout.tsx)
- `radius = 8` (7 theme aliases + 1 `--radius` in `:root`)

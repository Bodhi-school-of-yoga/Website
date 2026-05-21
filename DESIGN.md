---
name: Bodhi
description: Yoga studio brand site — calm emerald primary, warm sand neutrals, sage/warm brand accents, on a 0.75rem radius base and 4px spacing grid.
colors:
  primary: "#1f7a5e"
  primary-foreground: "#fafaf7"
  secondary: "#ece6dc"
  secondary-foreground: "#42382f"
  tertiary: "#d6a474"
  neutral: "#fafaf7"
  background: "#fafaf7"
  foreground: "#2c2620"
  card: "#ffffff"
  card-foreground: "#2c2620"
  popover: "#ffffff"
  popover-foreground: "#2c2620"
  muted: "#efeae2"
  muted-foreground: "#827669"
  accent: "#eae0d0"
  accent-foreground: "#42382f"
  destructive: "#d63a2f"
  border: "#e1d8c9"
  input: "#e1d8c9"
  ring: "#1f7a5e"
  sage: "#5d8e7c"
  sage-foreground: "#fafaf7"
  warm: "#d6a474"
  warm-foreground: "#fafaf7"
  sidebar: "#f4ede3"
  sidebar-foreground: "#2c2620"
  sidebar-primary: "#1f7a5e"
  sidebar-primary-foreground: "#fafaf7"
  sidebar-accent: "#ece6dc"
  sidebar-accent-foreground: "#42382f"
  sidebar-border: "#e1d8c9"
  sidebar-ring: "#1f7a5e"
  brand-primary: "#009877"
  brand-dark: "#00282C"
  brand-shade: "#8EE0CE"
  brand-lite: "#F0FFF8"
  surface-0: "#FDFDFD"
  surface-1: "#FFFFFF"
  surface-2: "#F7F7F7"
  border-1: "#F4F4F4"
  border-2: "#F0F0F0"
  border-3: "#D2D2D2"
  text-primary: "#1D3E59"
  text-secondary: "#2A2420"
  text-tertiary: "#727272"
  text-brand: "#009877"
  text-inverse: "#FFFFFF"
  chart-1: "#1f7a5e"
  chart-2: "#d6a474"
  chart-3: "#a48a3f"
  chart-4: "#8a5645"
  chart-5: "#4a4e7a"
typography:
  h1:
    fontFamily: Host Grotesk
    fontSize: 5.625rem
    fontWeight: 700
    lineHeight: 4.813rem
    letterSpacing: 0
  h2:
    fontFamily: Host Grotesk
    fontSize: 3.25rem
    fontWeight: 600
    lineHeight: 3.313rem
    letterSpacing: -0.56px
  h3:
    fontFamily: Host Grotesk
    fontSize: 2.625rem
    fontWeight: 700
    lineHeight: 2.688rem
    letterSpacing: -0.72px
  h4:
    fontFamily: Host Grotesk
    fontSize: 2.25rem
    fontWeight: 700
    lineHeight: 2.625rem
    letterSpacing: 0
  h5:
    fontFamily: DM Sans
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.438rem
    letterSpacing: -0.11px
  subtext-3:
    fontFamily: DM Sans
    fontSize: 1.25rem
    fontWeight: 600
    lineHeight: 1.563rem
    letterSpacing: 0
  subtext-2:
    fontFamily: DM Sans
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.641rem
    letterSpacing: 0
  subtext-1:
    fontFamily: DM Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.453rem
    letterSpacing: 0.08px
  body-md:
    fontFamily: Host Grotesk
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.5rem
    letterSpacing: 0
  body-sm:
    fontFamily: Host Grotesk
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.375rem
    letterSpacing: 0
  mini-text:
    fontFamily: DM Sans
    fontSize: 0.75rem
    fontWeight: 600
    lineHeight: 1.063rem
    letterSpacing: 2.42px
rounded:
  sm: 7.2px
  md: 9.6px
  lg: 12px
  xl: 16.8px
  2xl: 21.6px
  3xl: 26.4px
  4xl: 31.2px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  sm-plus: 12px
  md: 16px
  md-plus: 20px
  lg: 24px
  xl: 32px
  2xl: 40px
  3xl: 48px
  4xl: 64px
  5xl: 80px
  6xl: 96px
components:
  primary-button:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.subtext-1}"
    rounded: "{rounded.sm}"
    padding: 12px
  primary-button-hover:
    backgroundColor: "{colors.brand-shade}"
    textColor: "{colors.text-inverse}"
  ghost-button:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-brand}"
    typography: "{typography.subtext-1}"
    rounded: "{rounded.sm}"
    padding: 12px
  ghost-button-hover:
    backgroundColor: "{colors.brand-lite}"
    textColor: "{colors.text-brand}"
  card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.subtext-1}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-hover:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.text-secondary}"
  badge-tag:
    backgroundColor: "{colors.brand-lite}"
    textColor: "{colors.text-brand}"
    typography: "{typography.mini-text}"
    rounded: "{rounded.full}"
    padding: 4px
  input-field:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.subtext-1}"
    rounded: "{rounded.sm}"
    padding: 12px
  section-heading:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-primary}"
    typography: "{typography.h2}"
    rounded: "{rounded.sm}"
    padding: 0px
  nav-link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.subtext-1}"
    rounded: "{rounded.sm}"
    padding: 8px
  nav-link-active:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-brand}"
  footer:
    backgroundColor: "{colors.brand-dark}"
    textColor: "{colors.text-inverse}"
    typography: "{typography.subtext-1}"
    rounded: "{rounded.sm}"
    padding: 48px
---

# Design System: Bodhi

> Generated from 2 local sources (`apps/web/src/app/globals.css`, `apps/web/src/app/layout.tsx`) + Figma file `eqaofBeNUhOUISevtRfOpT` (4 reference nodes). Source of truth for visual decisions in this codebase.
> Last updated: 2026-05-21.

## Overview

Bodhi is a yoga studio brand site (Next.js + Strapi CMS + Postgres). The visual identity centers on a calm, grounded **emerald-green primary** (`oklch(0.45 0.12 160)` in CSS, `#009877` in Figma) paired with **warm sand neutrals** (off-white backgrounds at `oklch(0.98 0.005 80)`) and a supporting **sage** and **warm-terracotta** brand accent. Typography pairs a modern geometric sans (**Host Grotesk**, the body/sans default), a humanist sans for headings (**DM Sans**), and a literary serif for editorial accents (**Playfair Display**); a `Geist Mono` is reserved for code. Radius uses a **0.75rem (12px) base** with a 7-step multiplicative scale (`sm` → `4xl`). Spacing follows a **4px base unit** (Figma scale `xs` 4 → `6xl` 96). The token system uses shadcn/ui semantic naming (`background`, `foreground`, `primary`, etc.) with both light and dark modes, plus brand-specific `sage` and `warm` tokens for yoga-tone moments.

## Colors

### Palette

Light mode (`:root`) and dark mode (`.dark`) variants are shown in adjacent columns. All values are `oklch()` from `apps/web/src/app/globals.css`. The hex values in the YAML frontmatter are sRGB approximations of the light-mode oklch values, provided for tooling that doesn't parse oklch. Dark-mode values live in the table below.

| Token | Light | Dark | Hex (light ≈) | Notes |
| ----- | ----- | ---- | ------------- | ----- |
| `--background` | `oklch(0.98 0.005 80)` | `oklch(0.15 0.01 60)` | `#fafaf7` | Page surface |
| `--foreground` | `oklch(0.18 0.02 60)` | `oklch(0.95 0.005 80)` | `#2c2620` | Body text |
| `--card` | `oklch(1 0 0)` | `oklch(0.20 0.01 60)` | `#ffffff` | Card surface |
| `--card-foreground` | `oklch(0.18 0.02 60)` | `oklch(0.95 0.005 80)` | `#2c2620` | Card text |
| `--popover` | `oklch(1 0 0)` | `oklch(0.20 0.01 60)` | `#ffffff` | Popover surface |
| `--popover-foreground` | `oklch(0.18 0.02 60)` | `oklch(0.95 0.005 80)` | `#2c2620` | Popover text |
| `--primary` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | `#1f7a5e` | Brand emerald |
| `--primary-foreground` | `oklch(0.98 0.005 80)` | `oklch(0.15 0.01 60)` | `#fafaf7` | On-primary text |
| `--secondary` | `oklch(0.94 0.02 80)` | `oklch(0.25 0.01 60)` | `#ece6dc` | Sand neutral |
| `--secondary-foreground` | `oklch(0.25 0.02 60)` | `oklch(0.95 0.005 80)` | `#42382f` | On-secondary text |
| `--muted` | `oklch(0.95 0.01 80)` | `oklch(0.25 0.01 60)` | `#efeae2` | Muted surface |
| `--muted-foreground` | `oklch(0.50 0.02 60)` | `oklch(0.65 0.02 80)` | `#827669` | Muted text |
| `--accent` | `oklch(0.92 0.03 80)` | `oklch(0.25 0.01 60)` | `#eae0d0` | Accent surface |
| `--accent-foreground` | `oklch(0.25 0.02 60)` | `oklch(0.95 0.005 80)` | `#42382f` | On-accent text |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | `#d63a2f` | Error/danger |
| `--border` | `oklch(0.90 0.02 80)` | `oklch(1 0 0 / 10%)` | `#e1d8c9` | Default border |
| `--input` | `oklch(0.90 0.02 80)` | `oklch(1 0 0 / 15%)` | `#e1d8c9` | Input border |
| `--ring` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | `#1f7a5e` | Focus ring |
| `--warm` | `oklch(0.75 0.10 55)` | `oklch(0.70 0.10 55)` | `#d6a474` | Brand warm/terracotta |
| `--warm-foreground` | `oklch(0.98 0.005 80)` | `oklch(0.15 0.01 60)` | `#fafaf7` | On-warm text |
| `--sage` | `oklch(0.55 0.08 160)` | `oklch(0.60 0.08 160)` | `#5d8e7c` | Brand sage |
| `--sage-foreground` | `oklch(0.98 0.005 80)` | `oklch(0.15 0.01 60)` | `#fafaf7` | On-sage text |
| `--chart-1` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | `#1f7a5e` | Chart series 1 (emerald) |
| `--chart-2` | `oklch(0.75 0.10 55)` | `oklch(0.70 0.10 55)` | `#d6a474` | Chart series 2 (warm) |
| `--chart-3` | `oklch(0.60 0.10 90)` | `oklch(0.55 0.10 90)` | `#a48a3f` | Chart series 3 (olive) |
| `--chart-4` | `oklch(0.50 0.08 30)` | `oklch(0.45 0.08 30)` | `#8a5645` | Chart series 4 (clay) |
| `--chart-5` | `oklch(0.40 0.06 260)` | `oklch(0.35 0.06 260)` | `#4a4e7a` | Chart series 5 (dusk) |
| `--sidebar` | `oklch(0.97 0.01 80)` | `oklch(0.20 0.01 60)` | `#f4ede3` | Sidebar surface |
| `--sidebar-foreground` | `oklch(0.18 0.02 60)` | `oklch(0.95 0.005 80)` | `#2c2620` | Sidebar text |
| `--sidebar-primary` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | `#1f7a5e` | Sidebar primary |
| `--sidebar-primary-foreground` | `oklch(0.98 0.005 80)` | `oklch(0.95 0.005 80)` | `#fafaf7` | On-sidebar-primary text |
| `--sidebar-accent` | `oklch(0.94 0.02 80)` | `oklch(0.25 0.01 60)` | `#ece6dc` | Sidebar accent |
| `--sidebar-accent-foreground` | `oklch(0.25 0.02 60)` | `oklch(0.95 0.005 80)` | `#42382f` | On-sidebar-accent text |
| `--sidebar-border` | `oklch(0.90 0.02 80)` | `oklch(1 0 0 / 10%)` | `#e1d8c9` | Sidebar border |
| `--sidebar-ring` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | `#1f7a5e` | Sidebar focus ring |

**Figma palette (reference set, single mode):**

| Token | Value | Hex | Notes |
| ----- | ----- | --- | ----- |
| `color/brand-primary` | `#009877` | `#009877` | Figma brand emerald (CTA fill) |
| `color/brand-dark` | `#00282C` | `#00282C` | Figma brand deep (footer fill) |
| `color/brand-shade` | `#8EE0CE` | `#8EE0CE` | Figma brand light tint (hover) |
| `color/brand-lite` | `#F0FFF8` | `#F0FFF8` | Figma brand wash (badge fill) |
| `color/surface-0` | `#FDFDFD` | `#FDFDFD` | Surface 0 (page) |
| `color/surface-1` | `#FFFFFF` | `#FFFFFF` | Surface 1 (card) |
| `color/surface-2` | `#F7F7F7` | `#F7F7F7` | Surface 2 (hover) |
| `color/border-1` | `#F4F4F4` | `#F4F4F4` | Border 1 (subtle) |
| `color/border-2` | `#F0F0F0` | `#F0F0F0` | Border 2 (card) |
| `color/border-3` | `#D2D2D2` | `#D2D2D2` | Border 3 (input) |
| `color/text-primary` | `#1D3E59` | `#1D3E59` | Text primary (Figma headings) |
| `color/text-secondary` | `#2A2420` | `#2A2420` | Text secondary (Figma body) |
| `color/text-teritary` | `#727272` | `#727272` | Text tertiary (captions). Note: spelling preserved from Figma; YAML key normalized to `text-tertiary` |
| `color/text-brand` | `#009877` | `#009877` | Text brand (links, accents) |
| `color/text-inverse` | `#FFFFFF` | `#FFFFFF` | Text on dark fills |

> No `(name, value)` conflicts detected across local + Figma sources (token-collector: 0; figma-token-enhancer: 0). The local CSS `--primary` (`oklch(0.45 0.12 160)`, deep emerald) and the Figma `color/brand-primary` (`#009877`, vivid emerald) are separately-named tokens in the same hue family, not a conflict.

### Semantic Roles

The codebase uses shadcn/ui semantic naming. Roles below map the Tailwind `@theme inline` aliases (in `globals.css`) to their underlying `:root` / `.dark` mode values.

`--sage` and `--warm` (with their `-foreground` pairs) are promoted into this table — even though they are brand-character rather than abstract semantic roles — because they expose paired foreground tokens and are treated as branded surface roles in app code (used like `bg-sage text-sage-foreground`).

| Role | Token | Light Value | Dark Value | Usage |
| ---- | ----- | ----------- | ---------- | ----- |
| Surface — page | `--color-background` → `--background` | `oklch(0.98 0.005 80)` | `oklch(0.15 0.01 60)` | `bg-background` on `<body>` |
| Surface — card | `--color-card` → `--card` | `oklch(1 0 0)` | `oklch(0.20 0.01 60)` | `bg-card` for elevated panels |
| Surface — popover | `--color-popover` → `--popover` | `oklch(1 0 0)` | `oklch(0.20 0.01 60)` | Floating menus, tooltips |
| Surface — sidebar | `--color-sidebar` → `--sidebar` | `oklch(0.97 0.01 80)` | `oklch(0.20 0.01 60)` | Navigation rails |
| Text — body | `--color-foreground` → `--foreground` | `oklch(0.18 0.02 60)` | `oklch(0.95 0.005 80)` | Default text color |
| Text — muted | `--color-muted-foreground` → `--muted-foreground` | `oklch(0.50 0.02 60)` | `oklch(0.65 0.02 80)` | Captions, helper text |
| Primary | `--color-primary` → `--primary` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | Brand CTA, links, focus ring |
| Primary — on | `--color-primary-foreground` → `--primary-foreground` | `oklch(0.98 0.005 80)` | `oklch(0.15 0.01 60)` | Text on primary fills |
| Secondary | `--color-secondary` → `--secondary` | `oklch(0.94 0.02 80)` | `oklch(0.25 0.01 60)` | Secondary buttons, chips |
| Accent | `--color-accent` → `--accent` | `oklch(0.92 0.03 80)` | `oklch(0.25 0.01 60)` | Subtle highlight surface |
| Muted | `--color-muted` → `--muted` | `oklch(0.95 0.01 80)` | `oklch(0.25 0.01 60)` | Recessed surface |
| Destructive | `--color-destructive` → `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | Error states, delete |
| Border | `--color-border` → `--border` | `oklch(0.90 0.02 80)` | `oklch(1 0 0 / 10%)` | Default 1px border |
| Input | `--color-input` → `--input` | `oklch(0.90 0.02 80)` | `oklch(1 0 0 / 15%)` | Form field border |
| Ring | `--color-ring` → `--ring` | `oklch(0.45 0.12 160)` | `oklch(0.60 0.12 160)` | Focus outline (matches primary) |
| Brand — sage | `--color-sage` → `--sage` | `oklch(0.55 0.08 160)` | `oklch(0.60 0.08 160)` | Yoga-tone accent (sage green) |
| Brand — warm | `--color-warm` → `--warm` | `oklch(0.75 0.10 55)` | `oklch(0.70 0.10 55)` | Yoga-tone accent (warm sand/clay) |

## Typography

> ⚠ Naming/Role Conflict — Host Grotesk vs DM Sans
>
> The two source-of-truth artifacts disagree on which family fills which role:
> - **Local code** (`apps/web/src/app/layout.tsx` + `globals.css`): Host Grotesk is bound to `--font-sans` (default body face); DM Sans is bound to `--font-heading` (heading face).
> - **Figma reference** (file `eqaofBeNUhOUISevtRfOpT`): Host Grotesk is used on H1–H4 display styles; DM Sans appears on H5, body (`subtext-1..3`), and `mini-text`.
>
> **Canonical mapping for this document: local code wins.** The rendered site is the source of truth; Figma is reference. AI agents generating code from this file MUST use `var(--font-sans)` (Host Grotesk) for body/default UI and `var(--font-heading)` (DM Sans) for headings, regardless of what the Figma type scale labels them. The Figma family attributions in the Type Scale table below are preserved for traceability — do not import them as code-side role assignments. See the Do/Don't entry on this conflict below.

### Font Families

Loaded via `next/font/google` in `apps/web/src/app/layout.tsx`. CSS variables are bound to Tailwind v4 `@theme inline` aliases. Roles reflect the **local-code canonical mapping** (see callout above).

| Family | Stack (CSS variable) | Role (canonical, local-code) | Use |
| ------ | -------------------- | ---------------------------- | --- |
| Host Grotesk | `var(--font-sans)` | Sans (default body) | Body copy, UI text, paragraphs, labels |
| DM Sans | `var(--font-heading)` | Heading sans | All headings (H1–H6), section titles, lead copy |
| Playfair Display | `var(--font-serif)` | Editorial serif | Marketing headlines, editorial moments |
| Geist Mono | `var(--font-geist-mono)` | Monospace | Code blocks, technical text |

### Type Scale

Figma-defined scale (pixel-based). Where line-height equals or is below font size, the value comes verbatim from the Figma node (intentional tight leading on display sizes). The same scale is encoded in the YAML frontmatter under `typography`.

| Name | Family | Size | Line-Height | Letter-Spacing | Weight | Use |
| ---- | ------ | ---- | ----------- | -------------- | ------ | --- |
| H1 | Host Grotesk | 90px (5.625rem) | 77px (4.813rem) | 0 | 700 | Hero headlines, page titles |
| H2 | Host Grotesk | 52px (3.25rem) | 53px (3.313rem) | -0.56px | 600 | Section headings |
| H3 | Host Grotesk | 42px (2.625rem) | 43px (2.688rem) | -0.72px | 700 | Sub-section titles |
| H4 | Host Grotesk | 36px (2.25rem) | 42px (2.625rem) | 0 | 700 | Card headings |
| H5 | DM Sans | 24px (1.5rem) | 23px (1.438rem) | -0.11px | 600 | Labels, small headings |
| subtext-3 | DM Sans | 20px (1.25rem) | 25px (1.563rem) | 0 | 600 | Lead body, intro paragraphs |
| subtext-2 | DM Sans | 18px (1.125rem) | 26.25px (1.641rem) | 0 | 400 | Descriptive body text |
| subtext-1 | DM Sans | 16px (1rem) | 23.25px (1.453rem) | 0.08px | 400 | Standard body, nav links |
| body-md | Host Grotesk | 16px (1rem) | 24px (1.5rem) | 0 | 400 | Default body (local-code canonical) |
| body-sm | Host Grotesk | 14px (0.875rem) | 22px (1.375rem) | 0 | 400 | Small body / helper |
| mini-text | DM Sans | 12px (0.75rem) | 17px (1.063rem) | 2.42px | 600 | Tags, badges, captions, labels |

### Weights

| Name | Numeric |
| ---- | ------- |
| Regular | 400 |
| Medium | 500 |
| SemiBold | 600 |
| Bold | 700 |

Playfair Display is loaded with `[400, 500, 600, 700]`; other Google fonts use their default-variable weight set.

## Layout

Layout in Bodhi is driven by a Figma-derived spacing scale (base unit 4px) and Tailwind v4 default breakpoints. No local spacing tokens are defined in `globals.css` — the project relies on Tailwind v4 default spacing utilities (`p-1` = 0.25rem = 4px, matching the Figma base).

### Spacing

12 spacing tokens, all Figma-sourced. Encoded in the YAML frontmatter under `spacing`.

| Token | Value (px) | Value (rem) | Tailwind equivalent |
| ----- | ---------- | ----------- | ------------------- |
| `spacing/xs` | 4px | 0.25rem | `p-1` |
| `spacing/sm` | 8px | 0.5rem | `p-2` |
| `spacing/sm-plus` | 12px | 0.75rem | `p-3` |
| `spacing/md` | 16px | 1rem | `p-4` |
| `spacing/md-plus` | 20px | 1.25rem | `p-5` |
| `spacing/lg` | 24px | 1.5rem | `p-6` |
| `spacing/xl` | 32px | 2rem | `p-8` |
| `spacing/2xl` | 40px | 2.5rem | `p-10` |
| `spacing/3xl` | 48px | 3rem | `p-12` |
| `spacing/4xl` | 64px | 4rem | `p-16` |
| `spacing/5xl` | 80px | 5rem | `p-20` |
| `spacing/6xl` | 96px | 6rem | `p-24` |

### Breakpoints

No responsive breakpoint tokens are defined locally. The project uses Tailwind v4 default breakpoints (`sm` 40rem, `md` 48rem, `lg` 64rem, `xl` 80rem, `2xl` 96rem) — there is no override in `globals.css` and no `tailwind.config.*` in this repo.

## Elevation & Depth

No elevation/shadow tokens are defined in either source. Figma's Card component references a "shadow" on hover but no token is bound to it.

Until a shadow scale is added to this document, downstream code SHOULD fall back to Tailwind's default `shadow-md` (or omit the shadow entirely) and rely on the Card's `color/surface-2` background-shift for hover affordance. Do not invent shadow values inline. When a shadow scale is added, it belongs in this section and must be encoded as a top-level YAML group (e.g. `shadows:` or `elevation:`) at the same level as `colors` and `spacing`.

## Shapes

Both border-radius scales (local + Figma) and the single border-width token are documented below. The YAML `rounded` group encodes the local-code multiplicative scale in absolute pixel values (computed from `--radius: 0.75rem`).

### Border Radius — Local (Tailwind v4 `@theme inline`)

Local CSS defines a base `--radius: 0.75rem` (12px) with a multiplicative scale via `calc()`.

| Token | Multiplier | Value (rem) | Value (px) | Use |
| ----- | ---------- | ----------- | ---------- | --- |
| `--radius-sm` | `× 0.6` | 0.45rem | ~7.2px | Small chips, inline tags |
| `--radius-md` | `× 0.8` | 0.6rem | ~9.6px | Inputs, small buttons |
| `--radius-lg` | `× 1.0` (base) | 0.75rem | 12px | Cards, default buttons |
| `--radius-xl` | `× 1.4` | 1.05rem | ~16.8px | Large cards, modals |
| `--radius-2xl` | `× 1.8` | 1.35rem | ~21.6px | Hero panels |
| `--radius-3xl` | `× 2.2` | 1.65rem | ~26.4px | Display panels |
| `--radius-4xl` | `× 2.6` | 1.95rem | ~31.2px | Marketing hero |

### Border Radius — Figma reference

| Token | Value (px) | Use |
| ----- | ---------- | --- |
| `radius/none` | 0 | Sharp elements |
| `radius/xs` | 4 | Badges, tags |
| `radius/sm` | 8 | Cards, inputs |
| `radius/md` | 12 | Modals, panels |
| `radius/lg` | 16 | Large cards |
| `radius/xl` | 24 | Hero sections |
| `radius/full` | 9999 | Pills, avatars |

### Border Width

| Token | Value | Use |
| ----- | ----- | --- |
| `border-width/hairline` | `1px` | Card border, input field border, ghost button border (from Figma) |

No multi-step border-width scale defined. Use Tailwind defaults (`border` = 1px, `border-2` = 2px) beyond this token.

## Components

Component specs extracted from Figma file `eqaofBeNUhOUISevtRfOpT`. The YAML `components` group encodes the eight productized components below using token references (`{colors.x}`, `{rounded.y}`, `{typography.z}`). The tables below preserve the Figma source values for traceability.

### Primary Button

CTA action button. Filled brand emerald with light hover and a disabled-state opacity. YAML: `components.primary-button` (+ `primary-button-hover`).

| Variant | Fill | Text | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ---------- | ------ |
| primary-button | `color/brand-primary` (#009877) | `color/text-inverse` (#FFFFFF) | `radius/sm` (8px) | `typography/subtext-1` SemiBold | Hover: `color/brand-shade` (#8EE0CE) · Disabled: `opacity/disabled` (0.4) |

### Ghost Button

Outlined secondary action. Transparent fill, brand-colored border + label. YAML: `components.ghost-button` (+ `ghost-button-hover`). Background in YAML is `surface-1` because the YAML schema requires a concrete fill — visually the surface reads as the page surface; treat as "transparent over surface-1" in code.

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| ghost-button | transparent | `color/text-brand` (#009877) | `color/brand-primary` 1px | `radius/sm` (8px) | `typography/subtext-1` SemiBold | Hover: `color/brand-lite` (#F0FFF8) bg |

### Card

Default content container. White surface, subtle border, medium radius. YAML: `components.card` (+ `card-hover`).

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| card | `color/surface-1` (#FFFFFF) | `color/text-secondary` (#2A2420) | `color/border-2` 1px | `radius/md` (12px) | H5 title · `subtext-1` body | Hover: `color/surface-2` (#F7F7F7) background shift <!-- shadow token not yet defined; use Tailwind default shadow-md until a token is added to the Elevation & Depth section --> |

### Badge / Tag

Small pill label for metadata and categories. YAML: `components.badge-tag`.

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| badge-tag | `color/brand-lite` (#F0FFF8) | `color/text-brand` (#009877) | — | `radius/full` (9999 / pill) | `typography/mini-text` | — |

### Input Field

Text input. Light surface, mid-tone border, brand-emerald focus ring. YAML: `components.input-field`.

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| input-field | `color/surface-1` (#FFFFFF) | `color/text-secondary` (#2A2420) | `color/border-3` 1px | `radius/sm` (8px) | `typography/subtext-1` Regular | Focus: `color/brand-primary` border |

### Section Heading

Marketing/page section title block. Pure type, no chrome. YAML: `components.section-heading`.

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| section-heading | transparent | `color/text-primary` (#1D3E59) | — | — | `typography/h2` or `typography/h3` | — |

### Nav Link

Top-nav inline link. Plain text with active underline. YAML: `components.nav-link` (+ `nav-link-active`).

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| nav-link | transparent | `color/text-secondary` (#2A2420) | — | — | `typography/subtext-1` Regular | Active: `color/text-brand` + underline |

### Footer

Page footer block. Brand-dark fill with inverse text. YAML: `components.footer`.

| Variant | Fill | Text | Border | Radius | Typography | States |
| ------- | ---- | ---- | ------ | ------ | ---------- | ------ |
| footer (default) | `color/brand-dark` (#00282C) | `color/text-inverse` (#FFFFFF) | — | — | `typography/subtext-1` · `typography/mini-text` | — |

### Reference / Documentation Components

The Figma file also contains 50+ design-system documentation primitives — `ColorSwatchCard`, `RadiusTile`, `SpacingTile`, `TypefaceTile`, `TextStyleRow`, `ComponentTokenMapRow`, surface/text swatches (`Surface/Surface-0..2`, `Text/text-*`, `Colors/brand-*`, `Border/border-1..3`), and section frames (`DesignSystemPage/02-Typography`, `DesignSystemPage/03-SpacingScale`, `ColorTokensPage`, `Doc Page Header`, `Header`). These are tools for documenting the system inside Figma, **not** runtime UI components — they are not expected to ship in the product code. Listed here for traceability only.

## Do's and Don'ts

- **Do** use shadcn-style semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`) for all app code. They route through `@theme inline` and pick up dark mode automatically.
- **Do** reach for `--sage` and `--warm` (and their `-foreground` pairs) for yoga-tone moments — class cards, instructor highlights, breathwork callouts. They are *the* brand-character colors.
- **Do** use the `--radius-*` scale for any rounded corner; never write a raw `rounded-[10px]`. The 0.75rem base is calibrated to feel calm but not soft.
- **Do** use the Figma type scale (`H1`–`H5`, `subtext-1..3`, `mini-text`) for editorial pages. In code, map them to Tailwind utilities + the appropriate `font-sans` / `font-heading` family variable.
- **Do** keep light/dark parity: every new color token should declare values in both `:root` and `.dark` blocks of `globals.css`.
- **Do** render all headings (`<h1>`–`<h6>`) with `var(--font-heading)` (DM Sans) and all body/UI text with `var(--font-sans)` (Host Grotesk). The Figma file labels Host Grotesk as the display family on H1–H4 — ignore that in code; the local-code mapping is canonical for this project (see the Typography Naming/Role Conflict callout).
- **Don't** introduce a new raw color (hex, oklch, rgb) anywhere in component code. Add it to `globals.css` as a new token first, with both modes, and surface it here.
- **Don't** use `--destructive` for warnings or general alerts — it is reserved for destructive/irreversible error states.
- **Don't** mix the Figma `color/brand-primary` (#009877) and the local `--primary` (deeper `oklch(0.45 0.12 160)`) interchangeably in code. The local oklch value is the source of truth for the running app; the Figma hex is for design-tool fidelity only.
- **Don't** override the focus `--ring` color per-component — the unified emerald focus ring is part of the brand voice (consistent across light and dark modes).
- **Don't** use Playfair Display below 18px (it loses readability) or for UI labels — reserve it for editorial copy at H1–H3 scales.
- **Don't** swap heading and body fonts to "match Figma" without a corresponding update to `apps/web/src/app/layout.tsx` and this document's Typography callout. The conflict is documented intentionally; resolve it at the source, not per-component.
- **Don't** use raw px spacing in JSX (`style={{ padding: 17 }}`). Stick to the Tailwind 4px-base scale that mirrors the Figma `spacing/*` tokens.

## Sources

- `apps/web/src/app/globals.css` — 105 color tokens (35 `@theme inline` aliases + 35 light-mode `:root` + 35 dark-mode `.dark`), 8 radius tokens (7 `@theme inline` aliases + 1 base `--radius`).
- `apps/web/src/app/layout.tsx` — 4 typography family bindings (Host Grotesk → `--font-sans`, DM Sans → `--font-heading`, Playfair Display → `--font-serif`, Geist Mono → `--font-geist-mono`).
- Figma file `eqaofBeNUhOUISevtRfOpT` (nodes `91:15377`, `91:15743`, `91:16108`, `91:16473`) — 16 color tokens, 7 radius tokens, 12 spacing tokens, 9 typography styles, 1 border-width token, 1 opacity token; 80 component/variant rows.

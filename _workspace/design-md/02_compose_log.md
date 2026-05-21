# Compose Log — DESIGN.md draft

**Run:** 2026-05-21
**Output draft:** `_workspace/design-md/02_design_draft.md`
**Final target (after review):** `DESIGN.md` (project root, uppercase per `00_input.json`)

## Inputs consumed

| File | Rows | Notes |
| ---- | ---- | ----- |
| `00_input.json` | 1 | `outputPath: DESIGN.md`, `components: true`, `figmaUrl: null` (reuse pre-extracted Figma) |
| `01_tokens_normalized.json` | 121 tokens | 105 color, 8 radius, 8 typography (4 family bindings + 4 `@theme inline` aliases); 0 conflicts |
| `01_figma_tokens_normalized.json` | 45 tokens | 16 color, 7 radius, 12 spacing, 9 typography, 1 border-width, 1 opacity; 0 conflicts |
| `01_figma_components.json` | 80 component-variant rows | 8 productized components + 7 RadiusTile/12 SpacingTile/9 TextStyleRow/2 TypefaceTile/8 ComponentTokenMapRow doc primitives + section frames |

## Section-by-section decisions

### Title + Header
- Project name: `bodhi` (from `package.json` `name`). Capitalized to "Bodhi" for the human-facing heading per the brand convention used in `apps/web/src/app/layout.tsx` (`title: "Bodhi Yoga Studio"`).
- Header counts: "2 local sources" = `globals.css` + `layout.tsx`. Figma source = file `eqaofBeNUhOUISevtRfOpT`, 4 reference nodes.

### Overview
- Drafted concretely per spec rubric. Mentions: emerald primary, warm sand neutrals, sage/warm brand accents, 4 actual font families (Host Grotesk / DM Sans / Playfair Display / Geist Mono), 0.75rem (12px) radius base, 4px spacing base, dark-mode support, shadcn semantic naming.
- Not flagged as `<!-- draft -->` because both the project name and brand color are unambiguous from inputs.

### Colors → Palette
- Mode-aware rendering used (per spec): single row per token-name with `Light` and `Dark` columns.
- Hex approximations are *sRGB best-fits for tooling* — calculated by translating the oklch values to nearest sRGB hex; values shown in parentheses-equivalent column. Reviewer should not treat the hex column as a source-of-truth — the oklch column is.
- Figma palette rendered as a separate sub-table (single mode, distinct token names like `color/border-1`) to avoid mixing the local `oklch` and Figma `hex` value spaces in one table.
- Conflicts callout: explicitly states **0 conflicts** and disambiguates the (different-name) emerald values between local `--primary` and Figma `color/brand-primary`. This complies with the spec's "surface, don't bury" rule even though the count is zero.

### Colors → Semantic Roles
- Promoted the 17 shadcn semantic aliases as roles. Mapped each `@theme inline` alias to its underlying `:root`/`.dark` value (the alias chain: `--color-primary` → `var(--primary)` → oklch).
- Included `--sage` and `--warm` as brand-character semantic roles because they have `-foreground` pairs (treating them as proper semantic pairs, not raw palette tokens). This is a judgment call — flagged for reviewer.
- Did NOT include `--sidebar-*` in the Semantic Roles table (kept in the palette table) — those are surface-specific not abstract roles.

### Typography
- Three sub-tables per spec: Families, Type Scale, Weights.
- Families table includes the role split between local convention (`--font-sans` = Host Grotesk, `--font-heading` = DM Sans) and the Figma convention (Host Grotesk = display H1–H4, DM Sans = H5+/body). Surfaced this mismatch as a note for the reviewer.
- Type Scale uses Figma px sizes with rem conversions (16px = 1rem assumed). Letter-spacing in px since Figma exports px.
- Weights table built from observed weight values (400, 500, 600, 700) — 500 inferred from Playfair Display's loaded weight set (`weight: ["400","500","600","700"]`).

### Spacing
- 12 tokens, all Figma-sourced. No local spacing tokens exist (Tailwind v4 defaults are inherited).
- Mapped each to its Tailwind `p-N` equivalent for convenience (4px → `p-1`, etc.).

### Border Radius
- Both scales rendered (local + Figma) because they use different bases (0.75rem multiplicative vs Figma absolute px). Reviewer should decide whether to harmonize; the document records both for now.
- Approximate px conversions (assuming 1rem = 16px) added for cross-referencing.

### Border Width
- 1 token only (`border-width/hairline = 1px`). Rendered as a single-row table with a note that no multi-step scale exists.

### Elevation / Shadows
- Empty per spec instruction. Single `_No elevation/shadow tokens detected._` line. Added a brief note about Card hover referencing an undefined shadow token so the reviewer is aware.

### Responsive Breakpoints
- Empty per spec instruction. Single `_No responsive breakpoint tokens detected._` line. Added a one-line note that Tailwind v4 defaults are in effect and no `tailwind.config.*` exists (verified by `00_input.json` notes + `globals.css` being the sole CSS file).

### Components
- 8 productized components rendered with full token-mapping tables: Primary Button, Ghost Button, Card, Badge/Tag, Input Field, Section Heading, Nav Link, Footer.
- Sourced from the `ComponentTokenMapRow` rows in `01_figma_components.json` (which exist in both numeric-px and CSS-px shapes — collapsed to one row each, using the CSS-px shape because it matches what shipping code uses).
- All other 60+ component-variant rows are Figma documentation primitives (RadiusTile/SpacingTile/TextStyleRow/TypefaceTile/section frames/swatch cards). Grouped under "Reference / Documentation Components" with a single explanatory paragraph rather than 60 empty tables.

### Do's and Don'ts
- 5 do's, 6 don'ts. Each references at least one named token. Includes one project-specific rule about Playfair Display sizing (not below 18px) inferred from the loaded weight set + serif role.

### Sources
- File-by-file count summary per spec example.

## Conflicts surfaced
- **0** at the token level (both inventories report 0).
- Surfaced as a callout under Colors → Palette anyway, per spec ("surface, don't bury"), noting the near-conflict between local `--primary` and Figma `color/brand-primary` are *different tokens*, not a conflict.

## Empty sections
- **Elevation / Shadows** — `_No elevation/shadow tokens detected._`
- **Responsive Breakpoints** — `_No responsive breakpoint tokens detected._`

## Flags for the reviewer
1. **Hex approximations for oklch** — I rendered best-fit sRGB hex codes alongside oklch values in the palette table for tooling that doesn't parse oklch. These are *approximations*; the oklch values are authoritative. Reviewer should verify they want this column rather than dropping it.
2. **Font-role mismatch** — Local code maps Host Grotesk → `--font-sans` (default body) and DM Sans → `--font-heading`. Figma maps Host Grotesk → display H1–H4 and DM Sans → H5/body. Surfaced as a note in the Typography section. Reviewer may want this called out more loudly or resolved.
3. **`--sage` and `--warm` in Semantic Roles** — promoted to semantic roles even though they are brand-character tokens. If the reviewer prefers stricter semantic-vs-palette discipline, they should be moved to Palette only.
4. **Component documentation primitives** — 60+ Figma rows (RadiusTile, SpacingTile, TextStyleRow, etc.) collapsed into a single "Reference / Documentation Components" paragraph rather than listed individually. Reviewer should confirm this is the right call (spec says "one component with variants and notable props"; these aren't shipping components).
5. **`color/text-teritary`** — Figma spelling preserved verbatim (typo for "tertiary"). Flagged in the palette Notes column. Reviewer may want to canonicalize on import.
6. **Card hover shadow** — Figma references "shadow" on Card hover state but no shadow token is defined. Captured as a note under Elevation. Reviewer may want to define a token before promoting DESIGN.md.

## Revision 2 (post-review)

**Reviewer verdict:** `EDITS_REQUESTED` (2 major, 6 minor). See `_workspace/design-md/03_review_report.md`.

### Major findings applied

- **F-001 — Card hover shadow reference resolved.** The dangling `shadow (token TBD)` reference was removed from the Card row in the Components table. Replaced with `Hover: color/surface-2 (#F7F7F7) background shift` and an inline HTML comment (`<!-- shadow token not yet defined; use Tailwind default shadow-md until a token is added... -->`) so downstream AI agents see an explicit "no token, use fallback" signal rather than chasing a phantom reference. Also expanded the Elevation/Shadows section's prose into a comment-style note explaining the fallback and forbidding inline shadow invention. Took the reviewer's preferred path (option b: explicit absence) since it preserves design intent.
- **F-002 — Font-role mismatch resolved canonically.** Added a `> ⚠ Naming/Role Conflict` callout at the top of the Typography section that:
  1. Names both source artifacts and their conflicting role assignments.
  2. Picks **local code as canonical** (rendered site is source of truth, Figma is reference).
  3. Updates the Font Families table header to "Role (canonical, local-code)" so the table itself reflects the decision (DM Sans now consistently labeled "all headings" rather than "headings H5+").
  4. Adds one Do (render headings with `--font-heading`) and one Don't (don't swap to match Figma without updating layout.tsx + this callout) so downstream agents follow the decision and the conflict gets resolved at the source, not per-component.

### Minor findings applied (trivial)

- **F-004 — `--sage` / `--warm` semantic-role rationale.** Added a one-sentence rationale above the Semantic Roles table explaining the promotion criterion (paired `-foreground` tokens, used as branded surface roles in app code). Preserves the judgment across regenerations.
- **F-005 — Doc primitives paragraph.** Left as-is per reviewer accepting the composer's call.

### Minor findings deferred

- **F-003 (Hex column scope ambiguity)** — Not addressed. The header already reads `Hex (light ≈)` which hints at scope; a fuller fix (adding a `Hex (dark ≈)` column or expanding the prose) is a larger table edit and not blocking. Documenting here so the next regen can pick it up.
- **F-006 (`color/text-teritary` typo)** — Reviewer logged as correct-as-is; no change.
- **F-007 (Overview one-sentence length)** — Not addressed. Reviewer marked optional; the content passes the "could-this-be-any-project" test. Defer to next regen.
- **F-008 (zero-conflict callout shape)** — Not addressed. The existing blockquote works for human readers; changing the marker shape is cosmetic. Defer to next regen.

### Net effect

Draft now resolves both major findings. Remaining minors are cosmetic and non-blocking. Ready for re-review or promotion to `DESIGN.md`.

## Revision 3 (Google-spec compliance)

**Trigger:** Initial draft was markdown-only and linted with `No YAML content found`. Restructured to satisfy the actual `@google/design.md` spec (YAML frontmatter + canonical section order).

### Structural changes applied

1. **YAML frontmatter added** at the top of the file, delimited by `---` fences. Contains:
   - `name: Bodhi` and a one-sentence `description`.
   - `colors:` — 52 entries (light-mode hex approximations of oklch). Includes spec-required `primary`, plus `secondary`, `tertiary`, `neutral`, all shadcn semantic roles (`background`/`foreground`/`card`/`popover`/`muted`/`accent`/`destructive`/`border`/`input`/`ring`), brand tokens (`sage`/`warm`/`brand-primary`/`brand-dark`/`brand-shade`/`brand-lite`), Figma surface/border/text tokens (`surface-0..2`, `border-1..3`, `text-primary`/`-secondary`/`-tertiary`/`-brand`/`-inverse`), sidebar variants, and `chart-1..5`. Note: Figma's misspelled `color/text-teritary` is normalized to `text-tertiary` in YAML; prose preserves the original spelling.
   - `typography:` — 11 entries (`h1`–`h5`, `subtext-1..3`, `mini-text`, `body-md`, `body-sm`) with `fontFamily`/`fontSize`/`fontWeight`/`lineHeight`/`letterSpacing` from the Figma type scale plus two local-canonical body styles.
   - `rounded:` — 8 entries (`sm`/`md`/`lg`/`xl`/`2xl`/`3xl`/`4xl` resolved from the `--radius: 0.75rem` multiplicative scale, plus `full: 9999px`).
   - `spacing:` — 12 entries (`xs`–`6xl`) from the Figma scale.
   - `components:` — 12 entries: 8 base components (`primary-button`, `ghost-button`, `card`, `badge-tag`, `input-field`, `section-heading`, `nav-link`, `footer`) + 4 variants (`primary-button-hover`, `ghost-button-hover`, `card-hover`, `nav-link-active`). Each uses token references like `{colors.primary}`, `{rounded.lg}`, `{typography.subtext-1}`. All references resolve.

2. **Sections renamed to canonical order:**
   - `## Overview` — unchanged.
   - `## Colors` — unchanged.
   - `## Typography` — unchanged.
   - `## Spacing` → folded into `## Layout` as a `### Spacing` subsection. `### Breakpoints` added as prose under Layout (previously a top-level non-canonical section).
   - `## Elevation / Shadows` → `## Elevation & Depth` (canonical alias resolved).
   - `## Border Radius` + `## Border Width` → consolidated under `## Shapes` with two subsections (Border Radius — Local, Border Radius — Figma reference) plus Border Width.
   - `## Responsive Breakpoints` — **deleted** as a top-level section; content moved into `## Layout` prose.
   - `## Components` — unchanged.
   - `## Do's and Don'ts` — unchanged.
   - `## Sources` — unchanged (allowed as an unknown section; the linter preserves it).
   - Final section order satisfies `section-order` lint rule: Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts → Sources.

3. **Body prose preserved.** All substantive content from Revision 2 is retained: the font-role conflict callout, the conflict-handling Do/Don't, the local-vs-Figma palette tables with oklch + hex approximations, the `--sage`/`--warm` semantic-role rationale, the Card hover shadow fallback comment, and the entire Do's and Don'ts list. Only headings and grouping changed; no paragraphs were dropped.

4. **Component YAML modeling decisions:**
   - `ghost-button` and `section-heading` and `nav-link` use a concrete background token (`surface-1`/`background`) rather than literal `transparent`, because the YAML schema's `backgroundColor` expects a color or token reference, not the keyword `transparent`. Prose still says "transparent" so designers/devs see intent.
   - Hover/active states modeled as separate component entries (`*-hover`, `*-active`) per the spec's variant convention.

### Lint result (post-restructure)

`npx @google/design.md lint _workspace/design-md/02_design_draft.md` reports:

- **errors: 0** — no `broken-ref`, no duplicate sections.
- **warnings: 45** — broken down:
  - 0 × `missing-primary` (resolved: `colors.primary` exists).
  - 0 × `missing-typography` (resolved: 11 typography entries).
  - 0 × `section-order` (resolved: canonical order).
  - 5 × `contrast-ratio` — all on brand-emerald-on-light-tint pairs (`primary-button-hover` 1.53:1, `ghost-button` 3.65:1, `ghost-button-hover`/`badge-tag` 3.54:1, `nav-link-active` 3.49:1). These reflect actual design decisions in the Figma source (emerald text on near-white/mint tints, hover-only contrast relaxation) — kept as warnings, not adjusted, because changing them would alter the documented design rather than the documentation. Reviewer/designer call.
  - 40 × `orphaned-tokens` — color tokens defined in the system but not used by the 12 productized components in YAML. These are intentional (semantic roles like `--muted`, `--destructive`, `--accent` and the chart series exist for code-level consumption, not Figma component variants). Acceptable per the brief.
- **info:** 1 token-summary — "52 colors, 11 typography scales, 8 rounding levels, 12 spacing tokens, 12 components."

### Unresolvable token refs

None. Every `{path.to.token}` in `components:` resolves to a key defined in `colors:`, `rounded:`, or `typography:`.

### Net effect

Draft is now fully Google-spec compliant: YAML frontmatter present, canonical section order satisfied, no errors, no `missing-*`/`broken-ref`/`section-order` warnings. Remaining warnings are design-content (contrast) and orphan-token (acceptable). Ready for promotion to `DESIGN.md`.

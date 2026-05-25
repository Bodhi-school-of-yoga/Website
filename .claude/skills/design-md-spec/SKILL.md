---
name: design-md-spec
description: Canonical reference for the design.md file format — Google's AI-coding-tool design specification. Defines section order, table shapes, naming conventions, and AI-readability rules. Load this whenever composing, reviewing, or hand-editing a design.md so the output stays parseable by Claude Code / Cursor / Copilot and diffs cleanly across runs. Used by the design-md-composer and design-md-reviewer agents.
---

# design-md-spec

The `design.md` is a single-file design contract that AI coding agents read to make visual decisions. It must be **deterministic in structure** so LLMs can navigate it, **complete in coverage** so agents don't fall back to defaults, and **traceable in provenance** so humans can verify any value.

## When to Apply This Skill

- Composing a fresh `design.md` from a token inventory.
- Reviewing an existing `design.md` for compliance.
- Hand-editing a section (e.g., adding a new semantic role).
- Translating an external design system into the design.md format.

Skip this skill for: design-token *extraction* (use `figma-extract`), design-to-code generation, or codebase-graph analysis.

## File Skeleton

The file uses this section order. Order is **fixed** — do not reorder, even if some sections are empty. Stable order makes diffs reviewable and LLM lookups predictable.

```markdown
# Design System: <Project Name>

> Generated from <N local sources> + <Figma file | no Figma>. Source of truth for visual decisions in this codebase.
> Last updated: <ISO date>.

## Overview
## Colors
### Palette
### Semantic Roles
## Typography
### Font Families
### Type Scale
### Weights
## Spacing
## Border Radius
## Border Width
## Elevation / Shadows
## Responsive Breakpoints
## Components
## Do's and Don'ts
## Sources
```

Empty sections must still appear with a single line: `_No <category> tokens detected._`. Do not silently omit.

## Section Specifications

### Overview
1–3 sentences. Must mention: dominant color hue, primary font family, spacing-scale unit. If the project name carries a tone (e.g. "Bodhi" → wellness), reflect it.

Bad: `This project has colors and fonts.`
Good: `Bodhi uses a warm earth-tone palette anchored on terracotta, with a humanist serif (Source Serif) for headings and a 4px-step spacing scale.`

### Colors

**Palette** table:
```markdown
| Token | Value | Hex | Notes |
| ----- | ----- | --- | ----- |
| --color-zinc-50 | oklch(0.985 0 0) | #fafafa | base surface |
```

**Semantic Roles** table (only render when the project actually has semantic naming — bg/fg/text/border/surface/primary/secondary/accent/success/warning/error/info):
```markdown
| Role | Token | Value | Usage |
| ---- | ----- | ----- | ----- |
| Surface (base) | --color-bg-primary | #fafafa | Page background |
```

Mode-aware tokens (light/dark):
```markdown
| Token | Light | Dark | Usage |
```

### Typography
- **Font Families** table: `| Family | Stack | Use |`
- **Type Scale** table: `| Name | Size | Line-Height | Weight | Use |`
- **Weights** table (only if multiple weights are used): `| Name | Numeric |`

Use rem for sizes if the project uses rem; otherwise px. Show both when one is derivable from the other.

### Spacing
Linear or geometric scale, presented as a table: `| Token | Value (rem) | Value (px) |`.

### Border Radius / Border Width
Two small tables, each: `| Token | Value | Use |`.

### Elevation / Shadows
Table: `| Token | Value | Use |`. Multi-part shadow values render in code fences within the cell.

### Responsive Breakpoints
Table: `| Name | Min-Width | Notes |`. List in ascending width order.

### Components
Only when Figma component data is present. One `###` subsection per component. Each has:
- A one-line role description.
- A variants table: `| Variant | Props | Notes |`.

Skip this section entirely (with the standard `_No data_` line) when no component data was collected.

### Do's and Don'ts
Bulleted list. Each item references at least one named token. Minimum 3 do's and 3 don'ts when there is any token data at all.

### Sources
One `-` bullet per source file with a count summary:
```markdown
- `apps/web/styles/globals.css` — 24 color tokens, 12 spacing tokens
- Figma file `abc123` — 8 semantic color variables, 2 modes
```

## Naming Conventions

- Token names render verbatim (don't prettify `--color-zinc-50` to "Zinc 50" except in the "Name" column where a human label is needed).
- Section headings use Title Case, no trailing punctuation, no emoji.
- Heading slugs (auto-generated from heading text) must remain stable across runs — do not rename sections in subsequent regenerations.
- Project name (the `# Design System: <X>` title) is derived from `package.json` `name` (or the monorepo root if applicable). Fallback: repository directory name. Never invent a brand.

## AI-Readability Rules

LLMs parse design.md most reliably when:
1. **Tables, not prose lists**, are used for any enumeration of tokens or values.
2. **One token per row.** Never combine `bg-primary` and `bg-secondary` into one cell.
3. **Code fences** wrap any code-shaped value: `rgba(0, 0, 0, 0.1)`, multi-part shadows, font stacks with commas.
4. **No HTML tags** except `<!-- comment -->` markers — pure markdown only.
5. **Stable anchors** — never change a section heading once the file is checked in.

## Conflict Handling

When the same token name appears with different values across sources:

1. Show **both** rows in the relevant section's table, each with its own provenance in the Notes column.
2. Add a `⚠ Conflicts` callout at the top of the affected section listing the conflicting token names.
3. Never silently pick a winner. The human reading the file resolves it; the document records both.

Example callout:
```markdown
> ⚠ Conflicts: `--color-primary` has 2 different values across sources. See rows tagged `[conflict]` below.
```

## Quality Bar (used by the reviewer)

A design.md passes review when:
- All required sections exist in the fixed order.
- Empty sections render the explicit `_No data_` line.
- Every token shown traces back to the inventory file (`_workspace/01_tokens_*.json`).
- Conflicts are surfaced, not buried.
- No `lorem ipsum`, no `<placeholder>`, no `<!-- TODO -->` in the promoted file (drafts may carry these in `_workspace/`).
- Overview is concrete (passes the "could this be any project?" test — if yes, it's too generic).

## Common Mistakes

- Using bullet lists instead of tables for token enumerations — breaks LLM parseability.
- Inventing default scales when no tokens were detected — pretends there's data when there isn't.
- Reordering sections "to improve flow" — breaks diffability.
- Silently picking a conflict winner — destroys the audit trail.
- Putting raw `--color-zinc-50` in the Semantic Roles table — that's a palette token, not a semantic role. Use `--color-bg-primary` (with a note that it resolves to `zinc-50`).
- Omitting the Sources section — readers can't verify where values came from.

## See Also

- The orchestrator skill: `figma-to-design-md`
- The composer agent: `.claude/agents/design-md-composer.md`
- The reviewer agent: `.claude/agents/design-md-reviewer.md`

# Design.md Review Report — Iteration 2

**Draft:** `_workspace/design-md/02_design_draft.md`
**Reviewer:** design-md-reviewer
**Date:** 2026-05-21
**Iteration:** 2 (re-review after composer's Revision 2)
**Verdict:** `APPROVED`

## Executive Summary

Both major findings from iteration 1 are resolved. The draft now provides a deterministic answer for the Card hover state (no phantom shadow token) and for the Host Grotesk vs DM Sans role assignment (local code wins, with callout + table-header update + paired Do/Don't entries). Three fresh token spot checks all resolve cleanly against the inventory files, and structural compliance still passes on every sub-check.

Three minor findings (F-003 hex column scope, F-007 overview sentence length, F-008 zero-conflict callout shape) are explicitly deferred by the composer per their Revision 2 log. None block promotion; all three are cosmetic and survive into the next regeneration.

| Severity | Count |
|----------|-------|
| critical | 0 |
| major    | 0 |
| minor    | 3 (all deferred) |

## Resolution of Iteration 1 Major Findings

### F-001 — Card hover shadow reference — RESOLVED

The dangling `shadow (token TBD)` clause is gone. The Card row's States cell (L244) now reads:

```
Hover: `color/surface-2` (#F7F7F7) background shift
<!-- shadow token not yet defined; use Tailwind default shadow-md
     until a token is added to the Elevation/Shadows section -->
```

The Elevation/Shadows section (L207–L209) retains its spec-required `_No elevation/shadow tokens detected._` line and adds an HTML-comment note that explicitly forbids inline shadow invention and points to the Tailwind fallback. An AI agent reading the Card row now sees a defined background-shift hover state plus an explicit "no token, use fallback" signal — there is no longer a phantom reference to resolve.

This matches option (a) from the F-001 suggested fix and is acceptable.

### F-002 — Font-role mismatch — RESOLVED

A `> ⚠ Naming/Role Conflict — Host Grotesk vs DM Sans` callout now sits at the top of the Typography section (L104–L110) and:

1. Names both source artifacts and their conflicting role assignments.
2. Picks **local code as canonical** ("rendered site is the source of truth; Figma is reference").
3. Instructs AI agents to use `var(--font-sans)` (Host Grotesk) for body/default UI and `var(--font-heading)` (DM Sans) for headings — regardless of Figma type-scale labels.
4. Updates the Font Families table header to `Role (canonical, local-code)` (L116) so the table itself reflects the decision.
5. Adds paired Do/Don't entries:
   - L302 Do: `render all headings (<h1>–<h6>) with var(--font-heading) (DM Sans) and all body/UI text with var(--font-sans) (Host Grotesk)...`
   - L303 Don't: `swap heading and body fonts to "match Figma" without a corresponding update to apps/web/src/app/layout.tsx and this document's Typography callout...`

An AI agent reading this file now has exactly one deterministic answer for which family renders `<h1>`. This satisfies every clause of the F-002 suggested fix.

## Fresh Spot Checks (Token Traceability)

Three fresh tokens grepped against the inventories — all three resolve.

| Token | Inventory | Result |
|-------|-----------|--------|
| `--popover-foreground` | `01_tokens_normalized.json` | found — light `oklch(0.18 0.02 60)`, dark `oklch(0.95 0.005 80)`, @theme alias row. Matches draft palette row L23. |
| `--radius-2xl` | `01_tokens_normalized.json` | found — `calc(var(--radius) * 1.8)`. Matches draft Border Radius row L181 (`× 1.8 → 1.35rem`). |
| `spacing/4xl` | `01_figma_tokens_normalized.json` | found. Matches draft Spacing row L165 (`64px / 4rem / p-16`). |

Iteration 1 already verified 10/10 spot checks; the fresh three confirm traceability remains intact after Revision 2.

## Structural Compliance (re-check)

| Check | Result |
|-------|--------|
| Section order matches spec | PASS |
| Required subsections present (Colors: Palette + Semantic Roles; Typography: Font Families + Type Scale + Weights) | PASS |
| Empty sections render explicit `_No <category> tokens detected._` line | PASS — Elevation/Shadows (L207) and Responsive Breakpoints (L214) both compliant; Revision 2 additions are HTML comments + prose notes, not silent omissions |
| Heading levels consistent | PASS |
| Tables well-formed | PASS — Font Families table header rename (`Role (canonical, local-code)`) keeps the row count and column count stable |

## AI-Readability

The new artifacts introduced in Revision 2 are spec-friendly:

- The `> ⚠ Naming/Role Conflict` callout uses the canonical `> ⚠ <Marker>` shape used elsewhere in the spec's conflict examples — LLM-parseable.
- Inline `<!-- ... -->` HTML comments on the Card row and in the Elevation/Shadows section are the one HTML form permitted by `design-md-spec` (pure markdown + `<!-- comment -->` markers).
- All token enumerations remain tabular; one-token-per-row preserved; mode-aware tokens still in multi-column form.

## Findings (Iteration 2)

### F-003 — Hex column scope ambiguous (DEFERRED)

**Severity:** minor · **Dimension:** ai_readability · **Location:** Colors > Palette (L14–L17)

Composer documented the deferral. The header label `Hex (light ≈)` is unambiguous enough for AI agents, and the palette prose explicitly names oklch as authoritative for both modes. Cosmetic; defer to next regeneration.

### F-007 — Overview sentence length (DEFERRED)

**Severity:** minor · **Dimension:** content_quality · **Location:** Overview (L8)

Composer documented the deferral. Content passes the spec's "could this be any project?" test (names Bodhi, emerald primary, sage + warm accents, four font families, 0.75rem radius base, 4px spacing base, dark mode, shadcn naming). Length is on the long side of the 1–3 sentence target but does not impair AI-readability. Defer.

### F-008 — Zero-conflict callout shape (DEFERRED)

**Severity:** minor · **Dimension:** ai_readability · **Location:** Colors > Palette (L74)

Composer documented the deferral. The existing blockquote works for human readers; a tool scanning for the `⚠ Conflicts` marker would simply find no match, which is the correct outcome since there are zero conflicts. Defer.

## Verifications

- F-001 resolved: confirmed at L209 + L244.
- F-002 resolved: confirmed at L104–L110 (callout), L116 (table header), L302–L303 (Do/Don't).
- Structural compliance: PASS on all five sub-checks.
- Token traceability: 3/3 fresh spot checks resolved against inventories (in addition to iteration 1's 10/10).
- Conflict handling: zero token-level conflicts in either inventory; the cross-source typography role mismatch is now surfaced via the spec-shaped callout and resolved deterministically.
- AI readability: tables throughout, code fences on code-shaped values, only spec-permitted HTML (`<!-- comment -->` markers), stable heading anchors preserved.
- Content quality: Overview concrete; Semantic Roles non-empty (17 rows) with the F-004 rationale sentence added above the table per iteration 1; Do's (6) and Don'ts (6) each reference named tokens; no `lorem ipsum`, no `<placeholder>`, no unresolved `<!-- TODO -->` markers in the draft.

## Verdict and Next Steps

**Verdict:** `APPROVED` — 0 critical, 0 major, 3 minor (all explicitly deferred by composer).

Composer (or orchestrator) may now promote `_workspace/design-md/02_design_draft.md` to `./DESIGN.md`. The deferred minors (F-003, F-007, F-008) should be revisited on the next regeneration; none of them block promotion or impair AI-readability of the current draft.

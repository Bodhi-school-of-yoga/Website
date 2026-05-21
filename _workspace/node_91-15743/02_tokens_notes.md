# Tokens — node 91:15743

`get_variable_defs` returned `{}` — no Figma variables attached. All 43 tokens below are inferred from the documentation labels in the design-context + metadata XML.

## Color (15)
Mirrors node 91:15377 verbatim. Naming uses slash form (`brand/primary`, `text/teritary`). The misspelling **teritary** is preserved deliberately as it is how the Figma file ships. `text/brand` is a semantic alias of `brand/primary` (same hex `#009877`) and `references` is set accordingly.

## Typography (9)
Two families: **Host Grotesk** (display: H1–H4) and **DM Sans** (UI/body: H5, subtext-3/2/1, mini-text). Every token carries `fontFamily / fontWeight / fontSize / lineHeight / letterSpacing`. Values copied verbatim from the design-system table rows (91:15861..91:15950). Notable picks:
- H1: 90/77 Bold (hero)
- H2: 52/53 SemiBold (sections)
- H3: 42/43 Bold (sub-sections)
- mini-text: 12/17 SemiBold, **letter-spacing 2.42** (uppercase-ish badges)

## Spacing (12)
Base unit 4px. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. Aliases `sm+` / `md+` normalized to `sm-plus` / `md-plus` so token names stay slash-and-hyphen safe.

## Radius (7)
0, 4, 8, 12, 16, 24, 9999 (full). The `∞` symbol in Figma is encoded as 9999 — consumers should map to `9999px` (or `9999` numeric) in CSS.

## Effect / Breakpoint / Other
All empty — this page does not document elevation, shadows, or responsive breakpoints. The component token map references "shadow" for Card hover but never defines it.

## Stats
- total_variables: 0 (no Figma variables)
- extracted: 43
- modes: default only

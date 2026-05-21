# Tokens — node 91:16108

`get_variable_defs` returned `{}`; tokens inferred from the design-context labels and metadata XML.

**Total: 43 tokens** (same set as 91:15743, by category):
- **Color (15):** brand-primary, brand-shade, brand-lite, brand-dark; text-primary, text-secondary, text-teritary, text-brand, text-inverse; surface-0..2; border-1..3
- **Typography (9):** h1..h5, subtext-3, subtext-2, subtext-1, mini-text
- **Spacing (12):** xs, sm, sm-plus, md, md-plus, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl
- **Radius (7):** none, xs, sm, md, lg, xl, full
- **Effect / Breakpoint / Other:** empty

## Naming normalizations
- `brand lite` (space) → `brand-lite`
- `brand_dark` (underscore) → `brand-dark`
- `text-teritary` — Figma typo preserved (sic).
- `sm+` / `md+` → `sm-plus` / `md-plus` for token-safe identifiers.
- `text-brand` aliases `brand-primary` (same hex #009877).
- `radius/full` Figma symbol `∞` → numeric 9999.

## Empty categories
`effect`, `breakpoint`, `other` — no shadows, blurs, or breakpoints declared in the source frame. Component states like "shadow" appear as free-form strings inside the component token map, not as standalone effect tokens.

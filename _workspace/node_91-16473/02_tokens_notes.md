# Token extraction notes — node 91:16473

- `get_variable_defs` returned `{}`. All tokens are inferred from named subframes (re-included from pages 1–3) and from the explicit token names cited in the Component Token Map table rows.
- Counts: 15 color, 9 typography, 12 spacing, 7 radius, 0 shadow, 1 opacity (`disabled = 40%`), 1 other (`border-width.hairline = 1px`).
- This page adds two **new** tokens that are not surfaced on earlier pages:
  1. `opacity.disabled = 0.4` — only appears in the "Primary Button" states cell as "Disabled: 40% opacity".
  2. `border-width.hairline = 1px` — implicit, used in three rows (Card, Input Field, Ghost Button) as "1px".
- All other 43 tokens are duplicates of pages 1–3 — values verified to match exactly.
- Typography name `text-teritary` preserves the original Figma misspelling. Same for `subgroup` keys.

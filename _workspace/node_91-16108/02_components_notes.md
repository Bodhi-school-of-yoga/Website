# Components — node 91:16108

Frame titled "03 — Spacing Scale" but its bounding box spans the entire design-system handoff. Logical content is **identical to node 91:15743**. Extracted 12 components:

1. **DesignSystemPage/03-SpacingScale** — root page (id 91:16108)
2. **Header** — brand name + H1 title + tagline (id 91:16109)
3. **ColorTokensRecap** — 15-swatch color recap (id 91:16115)
4. **ColorSwatchCard** — reusable swatch card (synthetic id `swatch-card`)
5. **TypographySection** — typefaces + 9-row text-style table (id 91:16204)
6. **TypefaceTile** — Aa display tile, 2 variants (synthetic id `typeface-tile`)
7. **TextStyleRow** — typography table row, 9 variants (synthetic id `text-style-row`)
8. **SpacingAndRadiusSection** — 12 spacing + 7 radius tiles (id 91:16317)
9. **SpacingTile** — spacing display tile, 12 variants (synthetic id `spacing-tile`)
10. **RadiusTile** — radius display tile, 7 variants (synthetic id `radius-tile`)
11. **ComponentTokenMap** — table parent (id 91:16398)
12. **ComponentTokenMapRow** — token-map row, 8 component variants (synthetic id `component-token-map-row`)

## Observations
- Same 8 "real" downstream components are declared here as on 91:15743: Primary Button, Ghost Button, Card, Input Field, Badge/Tag, Nav Link, Section Heading, Footer.
- Section frame ids differ from 91:15743 because Figma assigned new ids when this frame was duplicated/repositioned.
- Spacing-tile metadata bars for 5xl (80px) and 6xl (96px) are visually drawn at 72px wide — labels are authoritative, bar widths are stand-ins.

## No skips
All 12 candidates extracted. Anything else in the XML is decoration (separators, group containers) or label-only text not corresponding to a reusable component.

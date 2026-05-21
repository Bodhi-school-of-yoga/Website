# Components — node 91:15743

This node is a **multi-section design-system handoff page**. Despite being named "02 — Typography", it carries four sub-sections: a Color Tokens recap, the Typography reference (primary), a Spacing Scale + Border Radius grid, and a Component → Token Map table.

Figma exposes zero `COMPONENT` / `COMPONENT_SET` nodes; everything is documentation `FRAME`s. Every component below is therefore `inferred: true` and pattern-matched from repeated frame shapes.

## DesignSystemPage / Header / ColorTokensRecap
The page root and its header chrome. ColorTokensRecap reproduces the 15 swatch cards from node 91:15377 — same names, same hex values, same usage hints. Consumers can resolve through tokens.color.

## ColorSwatchCard
Reusable 300×80 swatch card pattern. Repeats 15 times across the Color section; props (`tokenName`, `hex`, `usage`) populated per instance.

## TypographySection + TypefaceTile + TextStyleRow
TypefaceTile previews Host Grotesk (primary) and DM Sans (secondary) in big 'Aa' format. TextStyleRow is the table-style row: 9 variants total (H1–H5, subtext-3/-2/-1, mini-text). Each row declares family + weight + size + line-height + letter-spacing + usage — these are the canonical typography tokens in `02_tokens.json`.

## SpacingAndRadiusSection / SpacingTile / RadiusTile
SpacingTile renders the 12-step scale (xs..6xl → 4..96px). RadiusTile renders 7 steps (none/xs/sm/md/lg/xl/full → 0/4/8/12/16/24/9999). These directly seed `tokens.spacing` and `tokens.radius`.

## ComponentTokenMap / ComponentTokenMapRow
Eight rows expressing which tokens each Bodhi component consumes. Stored as variants on `ComponentTokenMapRow` for direct lookup. Note: cross-references string-form tokens (`brand lite`, `999px`); validator will normalize but consumers should treat as soft refs.

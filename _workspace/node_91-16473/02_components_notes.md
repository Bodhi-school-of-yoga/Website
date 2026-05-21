# Component extraction notes — node 91:16473

## What's actually here
This node is "04 — Component Token Map". The Figma frame's declared bounds are 1440×688 but its children include the full handoff render (header + sections 01, 02, 03, 04). The **unique** content is the component-token mapping table at the bottom (y=132..564).

## Extraction strategy
- 4 "documentation" entries record the included sections; sections 01/02/03 are flagged as `duplicates_of` prior pages so the downstream design-system isn't double-counted.
- Section 04 is the new payload — 7 component rows. Each row is captured as a structured row with explicit token references for fill/text/border/radius/typography/states.
- Each row is also re-emitted as a flat `ui_components_mapped` entry to make integration straightforward.

## Token references made on this page
- Fills: `brand-primary`, `brand-shade` (state), `brand lite`, `transparent`, `Surface-1`, `Surface-2` (state)
- Text: `text-primary`, `text-secondary`, `text-brand`, `text-inverse`
- Borders: `brand-primary` (1px), `border-2` (1px), `border-3` (1px)
- Radius: `0` (none), `8px`, `12px`, `999px`
- Typography: `H2`, `H3`, `H5`, `subtext-1` (Regular & SemiBold), `mini-text`

All token names match the tokens defined in earlier pages — internal consistency confirmed.

## One node-id quirk
Row "Input Field" (y=362) is rendered as 7 sibling `<text>` nodes (91:16799 — 91:16805) without a wrapping `<frame>`, unlike the other 6 rows. Extraction still works; we treat 91:16799 as the row anchor.

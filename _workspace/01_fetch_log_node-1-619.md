# Figma Fetch Log — node 1:619

- **File key:** eqaofBeNUhOUISevtRfOpT (Bodhi-landing-page-web-handoff)
- **Node id:** 1:619 ("Group 1171281878" — closing CTA + footer)
- **Fetched:** 2026-05-22
- **Intent:** implement closing CTA section above the footer; match design pixel-close

## Calls

| MCP call | Status | Notes |
|---|---|---|
| `get_metadata` (node 1:619) | OK | Full XML tree captured — frame is 1920×1302, anchored at y=7081 (very bottom of the page). |
| `get_design_context` (node 1:619) | OK | Returned full React + Tailwind source. Includes data-node-id attributes, fonts, hex colors, dimensions, paddings, border-radius. |
| `get_variable_defs` (node 1:619) | OK (sparse) | Only `letterSpacing/0 = 0` and `radius/16 = 16` are surfaced. No Bodhi color/spacing token set on this node — colors and sizes are inline literals. |
| `get_libraries` | OK | File has only generic community kits subscribed (Material 3, Simple Design System, iOS 18, iOS 26). No bespoke Bodhi library — confirms inline tokens. |
| `get_screenshot` (maxDimension 2048) | OK | Downloaded to `01_figma_screenshot_node-1-619.png` (≈111KB, 1920×1302). |

## Warnings / Gaps

- The design uses inline hex colors and px sizes — no Figma variables to tokenize against. Mapping to Bodhi design tokens (`bg-surface-*`, `text-*`, etc. from `apps/web/src/app/globals.css`) is required downstream.
- The wrapping layer for the big heading is declared as `Fraunces Light` in the frame style, but the inline spans on the actual text content use `Host Grotesk` (regular + italic). The mint-accented "you are." span uses Host Grotesk Italic at #8ee0ce. Treat the heading as Host Grotesk (the visible font) and Fraunces only as the small "Bodhi" eyebrow.
- Card body font is "Instrument Sans" but Bodhi typically uses Manrope/Fraunces — downstream consumer may want to swap to Manrope to stay consistent with the rest of the site.
- The translucent cards use `bg-white opacity-10` on a separate rectangle layered behind content (so content stays fully opaque). Implement as a semi-transparent white background, not as `opacity: 0.1` on the whole card.

## Output files (all in `_workspace/`)

- `01_figma_metadata_node-1-619.json`
- `01_figma_context_node-1-619.json`  ← primary artifact for downstream builder
- `01_figma_variables_node-1-619.json`
- `01_figma_libraries_node-1-619.json`
- `01_figma_screenshot_node-1-619.png`
- `01_fetch_log_node-1-619.md` (this file)

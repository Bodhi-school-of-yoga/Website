# Figma fetch log — node 1:8910

- **File**: Bodhi-landing-page-web-handoff
- **fileKey**: `eqaofBeNUhOUISevtRfOpT`
- **nodeId**: `1:8910`
- **Frame title**: `Our Trainers`
- **Type**: top-level frame (page section)
- **Dimensions**: 1920 x 4416 px (canvas position x=10500, y=5169)
- **Fetched at**: 2026-05-22
- **Authenticated as**: tech@wokay.com (Wokay Design Lab, Pro)

## MCP calls

| Call | Status | Notes |
|------|--------|-------|
| `whoami` | ok | Full seat on Wokay Design Lab |
| `get_metadata` | ok | Returned XML tree of full descendant structure |
| `get_design_context` | ok (large) | Response was ~94 KB and exceeded inline-token limit; saved verbatim from the tool-results spill file to `01_figma_context_node-1-8910.json` |
| `get_variable_defs` | ok (sparse) | Only 3 variables touch this node: `opacity/100`, `letterSpacing/0`, `radius/16`. No color/spacing/typography variables are bound on this frame — values are baked in (consistent with prior runs) |
| `get_libraries` | ok | 4 community libraries subscribed (Material 3, Simple Design System, iOS 18, iOS 26); none of them are Bodhi-specific |
| `get_screenshot` | ok | 1600 px max edge (696 x 1600 rendered, original 1920 x 4416) |

No auth issues. No retries needed.

## Descendant count

Counted from `get_metadata` XML tree: **≈228 descendant nodes** under `1:8910` (frames, groups, text, rounded-rectangles, instances combined). Notable instance count: 13 `trainer-card` instances inside the "Meet All Our Trainers" grid plus 8 hand-built department-head cards.

## Top-level sections observed (in vertical order)

1. **Background imagery & overlays** — `Rectangle 161124052`, `Rectangle 161124039`, `image 25` (full-bleed hero photo + warm overlays).
2. **Hero block (Mask group, 1:8914)** — H1 "Our Trainers" + intro paragraph ("Yoga is not just a series of poses and techniques...") + primary button "Join our classes".
3. **Pull-quote band (Group 1171281815, 1:8923)** — full-width strip with opening/closing quotation glyphs flanking the same lifestyle quote.
4. **Founder section (Section founder, 1:8933)** — left text column ("Founder & Yoga Guru" / "Ashok Vankineni" + 3 biography paragraphs about his telecom/IIM/Tata Docomo background and pivot to yoga) and right portrait photo (image 13).
5. **Leadership / Department Heads grid (Group 1171281873, 1:8946)** — section header "Leadership / Department Heads" with 8 trainer cards in a 4-col x 2-row grid:
   - Prarthana Patel — head of online certification courses and prenatal
   - Sujana Shergill — head of online ytt
   - Janardhan Durga Prasad — head - learning & development
   - Lakshmi Yalamudi — head - pilates & yoga studio
   - Harsh Rungta — head academics
   - Vyshnavie Vasasali — head - support
   - Eeena Chawla — head - face yoga
   - Archana Kulkarni — head of therapeutic yoga
6. **"The Team — Meet All Our Trainers" (Frame 1171281822, 1:9026)** — section header + two horizontal rows of 6 `trainer-card` component instances each (12 generic trainer cards total).
7. **CTA band (Frame 1171281838, 1:9101)** — eyebrow "Bodhi" + headline "Begin where you are." + subhead + "Try a class, free" link button, followed by 3 option cards: Free Trial Session ("Join now"), Speak to us ("Contact us"), Take a Guided Path ("Start now").
8. **Footer (1:9047 → 1:9049)** — brand block ("Bodhi" + tagline + bodhischoolofyoga.com), three link columns (School, Visit, Stay close) and copyright row.
9. **Nav (instance 1:9138)** — `Group 1171281731` instance pinned at top.

## Artifact files

- `_workspace/01_figma_metadata_node-1-8910.json` — saved
- `_workspace/01_figma_context_node-1-8910.json` — saved (raw MCP response, ~94 KB)
- `_workspace/01_figma_variables_node-1-8910.json` — saved
- `_workspace/01_figma_libraries_node-1-8910.json` — saved
- `_workspace/01_figma_screenshot_node-1-8910.png` — saved (1600 px tall)

## Warnings / next-stage hints

- `get_design_context` payload is large (~94 KB). Downstream extractors should `jq`-stream or chunk it rather than reading it all into context. Schema: `[{type: string, text: string}]`.
- No design-token variables bound — `token-extractor` will mostly have to mine raw fills/typography from the design-context payload.
- The trainer grid uses a real Figma component named `trainer-card` (instance id e.g. 1:9032). The component-extractor should treat this as a reusable React component and the 12 instances as data rows.

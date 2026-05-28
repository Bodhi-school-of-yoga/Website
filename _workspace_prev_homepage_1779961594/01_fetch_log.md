# Figma Fetch Log — node 1:32 (Bodhi Homepage)

- **File key:** `eqaofBeNUhOUISevtRfOpT`
- **Node id:** `1:32` (name: "Homepage", 1920 x 7008)
- **Auth:** OK — authenticated as `tech@wokay.com` (Wokay Design Lab, pro/expert).
- **Fetched at:** 2026-05-25

## Artifacts

| Artifact | File | Status | Size |
|---|---|---|---|
| Metadata (`get_metadata`) | `_workspace/01_figma_metadata.json` | OK | ~59 KB |
| Design context (`get_design_context`) | `_workspace/01_figma_context.json` | OK (large) | ~141 KB |
| Variables (`get_variable_defs`) | `_workspace/01_figma_variables.json` | EMPTY response `{}` (no variables in scope on this node) | 3 B |
| Screenshot (`get_screenshot`) | `_workspace/01_figma_screenshot.png` | OK | 562 x 2048 px (original 1920 x 7008), ~457 KB |

## Notes / Warnings

- `get_design_context` exceeded the inline token cap; the MCP server saved the full payload to a temp file and we copied it into `_workspace/01_figma_context.json` verbatim. JSON schema: `[{type: string, text: string}]`. Downstream agents should jq/python through it rather than `Read` it whole.
- `get_variable_defs` returned an empty object `{}` for node 1:32. No bound design tokens were exposed at this scope. Saved as `{}` (per protocol, this is "no data" — not a failure). Token-extractor should pull from local CSS / Tailwind theme instead, or re-request specific child node ids if needed.
- Screenshot was rendered at `maxDimension=2048`; the longer edge (7008 px tall) was clamped, so the saved PNG is 562 x 2048. Original canvas is 1920 x 7008.
- No prototype/reaction data surfaced at this depth in `get_metadata` (no `<reaction>` / `<interaction>` nodes in the XML); Phase 2.5 should inspect the design-context JSON for interaction hints and re-fetch deeper nodes if needed.

## Direct top-level children of node 1:32

14 children (frames/rectangles/instances). Names in order:

1. `<frame>` Image (1920 x 1200) — likely hero image layer
2. `<frame>` Image (1920 x 1175) — hero image / "बोधि" hero typography
3. `<rounded-rectangle>` Rectangle 161124052 (865 x 952)
4. `<frame>` Section (1920 x 477) — Founder quote block ("When a woman is empowered through yoga…" — Acharya Ashok)
5. `<frame>` Border
6. `<frame>` Group 1171281933
7. `<instance>` Group 1171281887
8. `<frame>` Group 1171281945
9. `<frame>` Group 1171281820
10. `<frame>` Group 1171281925
11. `<frame>` Group 1171281832
12. `<frame>` Group 1171281886
13. `<frame>` Group 1171281878
14. `<frame>` Frame 1171281903

## Re-run hints

- If extractor needs structured per-section context, re-fetch by individual child node id (e.g. `1:39` for the founder-quote section) rather than re-fetching the full 1:32 frame.
- Cache is now populated; subsequent runs should reuse these files unless the user explicitly asks to refresh.

# Figma Fetch Log

**Date:** 2026-05-28
**File key:** eqaofBeNUhOUISevtRfOpT
**Node id:** 805:10091
**Subject:** yoga course details page layout
**URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=805-10091&m=dev

## Calls

| MCP call | Status | Notes |
|---|---|---|
| get_metadata | ok | 84,185 chars returned; saved 75,626 bytes XML to `01_figma_metadata.json`. Output exceeded inline token limit so saved via jq from tool-results file. |
| get_design_context | ok | Two text blocks returned (84,249 chars total). Concatenated and saved 75,926 bytes to `01_figma_context.json`. Output exceeded inline token limit. |
| get_variable_defs | empty | Tool returned `{}` — node references no design variables directly. Saved `{}` to `01_figma_variables.json`. |
| get_screenshot | ok | maxDimension 2048; original_width 1920, original_height 6936 (rendered 567x2048). Downloaded to `01_figma_screenshot.png` (343 KB). |

## Warnings

- Metadata + context payloads each exceed ~75 KB. Downstream agents (component-extractor, section-decomposer) should chunk or stream-process.
- No design variables surfaced via `get_variable_defs` for this node. Consumers should fall back to inline fills/typography in `01_figma_context.json` or query specific child nodes if tokens are needed.
- Frame is very tall (6936px native) — typical full landing-page composite. Screenshot was scaled down to fit 2048 longer edge.

## Output files

- /Users/anukul/Desktop/bodhi/_workspace/00_input.json
- /Users/anukul/Desktop/bodhi/_workspace/01_figma_metadata.json
- /Users/anukul/Desktop/bodhi/_workspace/01_figma_context.json
- /Users/anukul/Desktop/bodhi/_workspace/01_figma_variables.json
- /Users/anukul/Desktop/bodhi/_workspace/01_figma_screenshot.png
- /Users/anukul/Desktop/bodhi/_workspace/01_fetch_log.md

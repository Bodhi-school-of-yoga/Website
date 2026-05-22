# Figma Fetch Log — node-1-1547

- **URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=1-1547&m=dev
- **fileKey:** eqaofBeNUhOUISevtRfOpT
- **nodeId:** 1:1547
- **Fetched at:** 2026-05-22
- **Auth:** OK — tech@wokay.com (Wokay Design Lab, Pro)

## Frame summary

- **Title:** Online Courses
- **Type:** frame
- **Position:** x=12600, y=5169 (on canvas)
- **Dimensions:** 1920 × 1994 px
- **Total descendant nodes (with id attribute):** 683

## Top-level children (10)

| id | type | name | size |
|---|---|---|---|
| 1:1548 | rounded-rectangle | Rectangle 161124075 | 1920 × 371 |
| 1:1549 | rounded-rectangle | image 25 | 2519 × 872 |
| 1:1550 | frame | Group 1171281727 (main content panel) | 1920 × 1991 |
| 1:1753 | frame | Group 1171281821 | 1680.5 × 1571.16 |
| 1:1827 | frame | Group 1171281827 | 1920 × 1302 |
| 1:1920 | frame | Frame 1171281022 | 1291 × 630 |
| 1:2047 | frame | Group 1171281832 | 1441 × 499 |
| 1:2081 | frame | Group 1171281879 | 1472 × 1355 |
| 1:2334 | frame | Group 1171281918 | 892 × 224 |
| 1:2342 | instance | Group 1171281731 | 1416 × 56 |

## Notable section content (from metadata XML)

- Section eyebrow: "Yoga Teacher Training"
- Section H2: "Yoga Teacher Training Courses"
- Section subtitle: "Accredited, women-centred teacher training programmes rooted in the authentic eight-limbed path of Hatha-Raja Yoga."
- Pagination/tab indicator: 3 rounded-rectangle pills (73, 53, 53 wide)
- Course cards row: `Article` frames each ~413 × 375 with `Gradient` overlay, `Heading 3`, and `Frame 1171281042` body — repeating card layout

## MCP calls

| Call | Status | Notes |
|---|---|---|
| whoami | OK | tech@wokay.com |
| get_metadata | OK (large) | Response ~90 KB; saved verbatim via jq pretty-print |
| get_design_context | OK (large) | Response ~90 KB; saved verbatim via jq pretty-print; excludeScreenshot=true |
| get_variable_defs | OK | Only 3 vars (opacity/100, letterSpacing/0, radius/16) — most styling is inline/raw |
| get_libraries | OK | 4 libraries added (Material 3, Simple Design System, iOS 18, iOS/iPadOS 26) — all community, none are project-specific |
| get_screenshot | OK | 1541 × 1600 px PNG (clamped from 1920 × 1994); 1.78 MB |

## Artifacts

| File | Size |
|---|---|
| _workspace/01_figma_metadata_node-1-1547.json | 90,132 bytes |
| _workspace/01_figma_context_node-1-1547.json | 90,196 bytes |
| _workspace/01_figma_variables_node-1-1547.json | 61 bytes |
| _workspace/01_figma_libraries_node-1-1547.json | ~1.7 KB |
| _workspace/01_figma_screenshot_node-1-1547.png | 1,778,169 bytes |

## Warnings / Caveats

- Both metadata and context responses exceeded the inline tool result token cap; they were copied verbatim from the MCP tool-results spool file into the workspace artifact via `jq '.'`, preserving full content. No truncation.
- `get_variable_defs` returns very few variables for this node — design tokens (colors, typography) appear inlined as raw values inside the design context. The token-extractor should expect to derive tokens from `01_figma_context_node-1-1547.json` rather than the variables file.
- None of the subscribed libraries look like the Bodhi project's own design system; treat library matches as unlikely.

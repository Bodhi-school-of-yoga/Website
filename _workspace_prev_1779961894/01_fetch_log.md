# Figma Fetch Log

**File:** `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
**Date:** 2026-05-28
**Source URL:** https://www.figma.com/design/eqaofBeNUhOUISevtRfOpT/Bodhi-landing-page-web-handoff?node-id=805-10841&m=dev

## Per-node fetch status

- **node 805-10756** — fetched OK
  - get_design_context: OK (full code returned — top-level navbar, 1467x56 instance "Group 1171281898")
  - get_metadata: OK
  - get_screenshot: OK (1645x56 PNG, 13KB)
  - Content: Full navbar with logo "Bodhi / School of yoga", nav items (Yoga Courses with caret, Teacher Courses with caret, Recorded classes, Workshops, Our Centers, About Bodhi), trailing caret, user-avatar icon, "Enquire Now" CTA (#8ee0ce bg, #1d3e59 text, 36px radius).

- **node 805-10758** — fetched OK
  - get_design_context: OK (full code — dropdown panel "Frame 1171281869", 489x354)
  - get_metadata: OK (full child tree)
  - get_screenshot: OK (556x421 PNG, 103KB)
  - Content: White rounded-22px card with 1px border rgba(123,123,123,0.2), drop-shadow 0px 21px 16.6px rgba(136,136,136,0.25). 3 rows separated by 1px lines: "Online Courses / At Comfort of your home / 9 Courses" (laptop icon), "Offine - in studio / We have 20+ studios / 9 Courses" (yoga icon), "Advanced Certifications / We have 20+ studios" with chevron-right indicator (i.e. row 3 opens a deeper level — this is the multi-level dropdown hook the user mentioned).

- **node 805-10841** — fetched OK, but content is a leaf text node (NOT a navbar variant)
  - get_design_context: OK — returned a single text element "Online Courses" (198x36, 22px Instrument Sans SemiBold, color black, tracking -0.51px).
  - get_metadata: OK — `<text id="805:10841" name="Link → Programs" x="0" y="0" width="198" height="36" />`
  - get_screenshot: OK (151x17 PNG, 1.5KB — tiny because it's just the text glyphs).
  - **WARNING:** The user's instructions described three navbar variants. Node 805-10841 resolved to a single inner text leaf (child of the 805-10758 dropdown panel), not a third navbar state. The orchestrator likely needs to re-supply the correct node-id for a third variant (perhaps the level-2 dropdown / nested "Advanced Certifications" panel). Data was still saved faithfully as fetched.

## File-level fetches

- **get_variable_defs** — empty object `{}` returned for the queried node. File does not expose published variables to this node (manual change to 01_figma_variables.json kept). Tokens must be inferred from inline literal values in context payloads.

- **get_libraries** — NOT CALLED in this run (instructions specified only context / metadata / screenshot / variable_defs).

## Asset URLs (Figma MCP — expire ~7 days)

Navbar (805:10756):
- imgArrowUp2: https://www.figma.com/api/mcp/asset/2e9abb30-500a-43d9-ad7f-eaa7b35daef6
- imgGroup1171281692 (user-avatar circle 44x44): https://www.figma.com/api/mcp/asset/4e53bfc8-552c-4e45-b81f-ec511fe57868

Dropdown (805:10758):
- imgRectangle161124074 (Online Courses thumb): https://www.figma.com/api/mcp/asset/31f11b06-3bfb-4cc7-b74d-dfc6736e217a
- imgRectangle161124075 (Offline-studio thumb): https://www.figma.com/api/mcp/asset/534ce5c8-61fe-4865-bb81-44d68d20d9a1
- imgRectangle161124076 (Advanced Certs thumb): https://www.figma.com/api/mcp/asset/498cc7b5-6855-4713-ad28-9b79f4a6dd9e
- imgLine5 (divider): https://www.figma.com/api/mcp/asset/2d15bc11-a837-410a-966a-dd11053b9f9c
- imgArrowUp2 (chevron): https://www.figma.com/api/mcp/asset/a342ed93-37ea-4569-905f-3bafe4a83959

## Auth

No auth failures encountered. Figma MCP calls returned successfully.

## Output Artifacts

```
_workspace/
├── 01_figma_context_805-10756.json     (navbar variant)
├── 01_figma_context_805-10758.json     (dropdown panel)
├── 01_figma_context_805-10841.json     (text leaf — see WARNING)
├── 01_figma_metadata_805-10756.json
├── 01_figma_metadata_805-10758.json
├── 01_figma_metadata_805-10841.json
├── 01_figma_screenshot_805-10756.png   (13KB,  1645x56)
├── 01_figma_screenshot_805-10758.png   (103KB,  556x421)
├── 01_figma_screenshot_805-10841.png   (1.5KB,  151x17)
├── 01_figma_variables.json             (empty / null per protocol)
└── 01_fetch_log.md                     (this file)
```

## Notes for downstream agents

1. **No design variables exposed.** All colors, spacings, radii, font sizes must be read from the literal values inline in the context JSON (and mapped to Bodhi tokens defined in `apps/web/src/app/globals.css`).
2. **Navbar uses inline hex colors** (#8ee0ce CTA bg, #1d3e59 CTA text, #048d6f count text, #4b4b4b subtitle text, #e2e2e2 borders, rgba(123,123,123,0.2) card border, rgba(136,136,136,0.25) card shadow). Map these to Bodhi design-token equivalents in `globals.css` rather than hard-coding.
3. **Fonts:** Fraunces (italic, logo), Manrope (SemiBold, "School of yoga" wordmark), Instrument Sans (Medium for nav links, SemiBold for dropdown titles & CTA).
4. **Multi-level dropdown intent:** The chevron-right on "Advanced Certifications" row (805:10789) signals a nested submenu — the user wants this to replace the current single-link "Advanced Certifications" item in `apps/web/src/components/site-header.tsx`. A third "open submenu" frame may exist in the Figma file but was not captured by node 805-10841 (which is just the inner text). Ask the user for the correct node id of the deeper-level dropdown if needed.

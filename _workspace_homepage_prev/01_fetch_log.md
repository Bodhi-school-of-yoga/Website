# Figma Fetch Log — Bodhi Homepage

**Date:** 2026-05-23
**File key:** `eqaofBeNUhOUISevtRfOpT` (Bodhi-landing-page-web-handoff)
**Page:** `0:1` — "Final Designs"
**Auth:** OK — `tech@wokay.com` (Wokay Design Lab, Pro tier — Full seat).

## Targets

| Target  | Node ID | Name         | Reported size (W×H) |
|---------|---------|--------------|---------------------|
| Desktop | `1:32`  | Homepage     | 1920 × 8033         |
| Mobile  | `19:1470` | Our Practice | 390 × 517           |

## IMPORTANT — Mobile node finding

`19:1470` is **NOT a full mobile homepage**. The metadata + design-context both confirm it is a **single "Our Practice" section** measuring 390 × 517 px. The input file labels it "mobile homepage variant" but that label is wrong — it is one section only.

Implications for the next stages:
- We have only one mobile section's spec; the rest of the mobile breakpoint is not represented by this node.
- Either (a) the rest of the homepage on mobile reuses the desktop frame and we treat 19:1470 as a single hand-off for that section, or (b) the orchestrator needs to ask the user for the correct full-mobile frame node id.
- Recommendation: surface this to the orchestrator before component-extractor / section-decomposer start mobile work.

## Files written

| File | Size | Source |
|------|------|--------|
| `_workspace/01_figma_metadata_desktop.json` | ~78 KB | `get_metadata(1:32)` — raw MCP response (large, served via overflow file) |
| `_workspace/01_figma_metadata_mobile.json`  | ~2 KB  | `get_metadata(19:1470)` — raw inline MCP response |
| `_workspace/01_figma_context_desktop.json`  | ~78 KB | `get_design_context(1:32)` — raw MCP response (large, served via overflow file) |
| `_workspace/01_figma_context_mobile.json`   | ~4 KB  | `get_design_context(19:1470)` — raw MCP response, wrapped with metadata note |
| `_workspace/01_figma_variables.json`        | 3 B    | `get_variable_defs(1:32)` returned `{}` — no shared variables published in this file |
| `_workspace/01_figma_screenshot_desktop.png`| ~399 KB | `get_screenshot(1:32, maxDimension=1920)` — rendered 459×1920 (original 1920×8033) |
| `_workspace/01_figma_screenshot_mobile.png` | ~34 KB  | `get_screenshot(19:1470, maxDimension=1024)` — rendered 390×517 (original 390×517) |

## Desktop top-level sections (1920px-wide frames in `1:32`)

Listed in y-order:

| # | Node ID | Name | y | Height | Likely role |
|---|---------|------|---|--------|-------------|
| 1 | `1:33`  | Image                  | 221     | 1200 | Hero image / background area |
| 2 | `1:35`  | Image                  | 0       | 1175 | Hero / above-the-fold image (sibling of 1:33) |
| 3 | `1:53`  | Border                 | 1102    | 73   | "Yama / Niyama / Āsana / …" eight-limb running ticker |
| 4 | `1:39`  | Section                | 1175    | 477  | "Our practice" intro section |
| 5 | `1:165` | Group 1171281822       | 1652    | 519  | Section after Our Practice |
| 6 | `1:167` | Frame 1171281835       | 1652    | 519  | (alias / wrapper of 1:165) |
| 7 | `1:188` | Group 1171281726       | 2171    | 505  | Next section (likely "Why Bodhi" lead-in or programs strip) |
| 8 | `1:226` | Group 1171281925       | 3576.2  | 1991 | Large mid-page section (programs / curriculum block) |
| 9 | `1:227` | Group 1171281727       | 3576.2  | 1991 | (alias of 1:226) |
| 10 | `1:619` | Group 1171281878      | 7127    | 906  | Footer-area / final CTA section |

Also present at root: the navigation instance `1:90` "Group 1171281887" (228, 20, 1464×56) — header nav.

> Notes on naming: Figma frame names are generic ("Group …", "Image", "Frame …"). Section identity must come from the design-context (`01_figma_context_desktop.json`) which has the text content and class hints; section-decomposer should resolve these to semantic section names ("hero", "eight limbs ticker", "our practice", "why-bodhi", "programs", "testimonials", "footer-cta", etc.).

## Mobile top-level structure (`19:1470` subtree)

Single-section frame. Direct descendants:

| Node ID  | Name            | Size  | Role |
|----------|-----------------|-------|------|
| `38:1641` | Frame 1171281906 | 350×426 | Padded content container (left 28, top 52) |
| `38:1640` | Group 1171281942 | 343×151 | Quote block container |
| `47:2224` | Frame 1171281925 | 343×151 | Eyebrow + headline + attribution |
| `19:1471` | text: "Our practice"     | 343×17  | Eyebrow (#00654f Manrope Medium 10px) |
| `19:1472` | text: "The mat is a place…" | 343×79  | Pull quote (Host Grotesk Bold 26px, brand-green emphasis) |
| `19:1473` | text: "— Acharya, founder"  | 123×28  | Attribution (Fraunces Italic 14px, brand-primary) |
| `38:1639` | Frame 1171281905           | 340×256 | Two-paragraph body block |
| `32:1598` | text: "Bodhi is built…"    | 340×79  | Body para 1 (DM Sans 14px / #606060) |
| `32:1599` | text: "We teach in the lineage…" | 340×153 | Body para 2 |

## Errors / partial failures

- **`get_variable_defs(1:32)` returned `{}`** — no design-system variables surfaced for this scope. This may mean the file does not publish library variables, or the variables live in a referenced library not made accessible to this scope. The mobile node's design context did include a CSS var fallback `var(--colors/brand-primary, #009877)` which hints variables exist somewhere — token-extractor may need to call `get_libraries` to surface them. Recommend retrying with `get_libraries` if tokens are needed.
- **Two MCP responses exceeded the inline size limit** (desktop metadata: 77,870 chars; desktop context: 77,934 chars). Both were saved by the MCP runtime to disk overflow files and copied into the workspace as-is. Downstream agents should chunk-read them.
- **No errors otherwise.** All seven artifact files are present.

## Recommended follow-ups

1. **Ask user for correct mobile homepage node-id** — `19:1470` is one section only.
2. **token-extractor**: call `get_libraries(eqaofBeNUhOUISevtRfOpT)` since `get_variable_defs` came back empty. The codebase's `apps/web/src/app/globals.css` already has Bodhi tokens — cross-check.
3. **section-decomposer**: parse `01_figma_context_desktop.json` in chunks; map each ~1920-wide top-level group to a semantic section name and compare to `apps/web/src/app/page.tsx` for the gap-analysis the orchestrator wants.
